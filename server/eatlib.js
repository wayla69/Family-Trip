'use strict';
// The family's library of places to eat (owner, Nov 2026: "ร้านอาหารด้วย แนวเดียวกับเล่มฮ่องกงและออสเตรเลีย ทำเป็นคลัง" → "คลังเติมเอง").
// One row a place, in the shape of a book's "where to eat" row (name, tag, what, why, where, pr, hours, q) under the town it is in.
// It fills itself: every book the family has (the bundled ones and the ones it makes) gives its places, and for a town with none the
// helper writes a list once, checked on the web (only the town's name is sent), kept with the day it was checked. The planner shows a
// route's towns from here and writes them into the new book instead of asking the helper to think of places again.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const one = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, n);
const norm = (x) => String(x || '').normalize('NFKC').toLowerCase().replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
const i18n = (x, n) => (x && typeof x === 'object' ? { th: one(x.th || x.en, n), en: one(x.en || x.th, n) } : { th: one(x, n), en: one(x, n) });
const KEEP = { zh: 80, tag: 60, tk: 12, what: 400, why: 400, where: 200, pr: 160, hours: 200, q: 200, note: 200 };   // a row's own fields and their bounds
const KINDS = [{ th: 'ร้านอาหาร', en: 'Restaurants' }, { th: 'ศูนย์อาหารและของกินเร็ว', en: 'Food courts & quick bites' }, { th: 'คาเฟ่ ขนม ของหวาน', en: 'Cafés & sweets' }];
const short = (n) => ({ th: String(n.th || n.en || '').split(/\s*และ/)[0].trim(), en: String(n.en || n.th || '').split(/ and | & /)[0].trim() });

// one row's fields, cleaned: a text is kept as it is written (bilingual or plain), never a day's "pick" (that belongs to its book)
function rowOf(x) {
  const out = {};
  for (const [k, n] of Object.entries(KEEP)) {
    const v = x && x[k];
    if (v && typeof v === 'object' && (v.th || v.en)) out[k] = i18n(v, n);
    else if (typeof v === 'string' && v.trim()) out[k] = one(v, n);
  }
  if (x && x.tour) out.tour = true;
  return out;
}

// the town a book's group of places belongs to: the library city its words name most (the area's own name first, then the places'
// map addresses), else the head of the area's name ("Jervis Bay · Days 2–4" → "Jervis Bay")
function townOf(g, cities) {
  const area = (g.area && (g.area.en || g.area.th)) || '', head = area.split(/\s+[·—–]\s+|\s+-\s+/)[0].trim() || 'Places to eat';
  const text = ` ${area} `.toLowerCase(), qs = ` ${(g.items || []).map((x) => x.q || '').join(' | ')} `.toLowerCase();
  let best = null;
  for (const c of cities) {
    const k = c.en.toLowerCase(); if (k.length < 4) continue;
    const re = new RegExp(`(^|[^a-z])${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`, 'g');
    const n = (text.match(re) || []).length * 50 + (qs.match(re) || []).length;
    if (n > 0 && (!best || n > best.n)) best = { n, c };
  }
  const items = (g.items || []).length;
  if (best && (best.n >= 50 || best.n >= Math.max(2, items * 0.4))) return best.c;
  const th = ((g.area && g.area.th) || '').split(/\s+[·—–]\s+|\s+-\s+/)[0].trim();
  return { en: head, th: th || head };
}
// the library's cities by their short names (no countries: "Japan" in a map address says nothing about the town)
const citiesOf = (index) => Object.entries((index && index.places) || {}).filter(([id, p]) => id !== p.country && p.name).map(([, p]) => short(p.name)).filter((c) => c.en);

// a book's "where to eat" → library rows (a place named twice in one town is one row: the first)
function rowsOfBook(rest, index) {
  const cities = citiesOf(index), out = [], seen = new Set();
  for (const g of (rest && Array.isArray(rest.groups) ? rest.groups : [])) {
    const t = townOf(g, cities), tkey = norm(t.en);
    for (const x of g.items || []) {
      const name = one(x && x.name, 120), nkey = norm(name);
      if (!name || !nkey || !tkey || seen.has(`${tkey}:${nkey}`)) continue;
      seen.add(`${tkey}:${nkey}`);
      out.push({ town: one(t.en, 80), town_th: one(t.th || t.en, 80), tkey, nkey, area: i18n(g.area || t, 160), kind: [0, 1, 2].includes(x.kind) ? x.kind : [0, 1, 2].includes(g.kind) ? g.kind : 0, name, row: rowOf(x) });
    }
  }
  return out;
}

const idOf = (family, tkey, nkey) => crypto.createHash('sha1').update(`${family}:${tkey}:${nkey}`).digest('hex').slice(0, 20);
// rows into the table: a place the parents took out stays out (gone); what the helper checked on the web wins over a book's row,
// a book's row over the app's built-in list (src 'starter') — never the other way round
async function put(pool, family, rows, src, trip, extra = {}) {
  if (!rows.length) return 0;
  const list = rows.map((r) => ({ ...r, id: idOf(family, r.tkey, r.nkey), st: r.st || '', url: r.url || '', checked: r.checked || extra.checked || null }));
  const res = await pool.query(`INSERT INTO eat_lib (id, family_id, town, town_th, tkey, nkey, area, kind, name, row, src, trip, st, url, checked)
    SELECT x.id, $1, x.town, x.town_th, x.tkey, x.nkey, x.area, x.kind, x.name, x.row, $2, $3, x.st, x.url, x.checked::date
    FROM jsonb_to_recordset($4::jsonb) AS x(id text, town text, town_th text, tkey text, nkey text, area jsonb, kind int, name text, row jsonb, st text, url text, checked text)
    ON CONFLICT (family_id, tkey, nkey) DO UPDATE SET town = EXCLUDED.town, town_th = EXCLUDED.town_th, area = EXCLUDED.area, kind = EXCLUDED.kind, row = EXCLUDED.row, trip = EXCLUDED.trip,
      src = EXCLUDED.src, st = CASE WHEN EXCLUDED.src = 'book' THEN eat_lib.st ELSE EXCLUDED.st END, url = CASE WHEN EXCLUDED.src = 'helper' THEN EXCLUDED.url ELSE eat_lib.url END,
      checked = CASE WHEN EXCLUDED.src = 'book' THEN eat_lib.checked ELSE EXCLUDED.checked END
    WHERE NOT eat_lib.gone AND (CASE eat_lib.src WHEN 'helper' THEN 2 WHEN 'book' THEN 1 ELSE 0 END) <= (CASE EXCLUDED.src WHEN 'helper' THEN 2 WHEN 'book' THEN 1 ELSE 0 END)`,
  [family, src, trip || null, JSON.stringify(list)]);
  return res.rowCount;
}
// every book's places, on boot and after a book is saved
async function syncBooks(pool, family, index) {
  const trips = (await pool.query("SELECT id, info->'restaurants' AS r FROM trips WHERE family_id=$1 AND jsonb_typeof(info->'restaurants') = 'object' ORDER BY date_from", [family])).rows;
  let n = 0;
  for (const t of trips) n += await put(pool, family, rowsOfBook(t.r, index), 'book', t.id);
  return n;
}

// ---------- the app's built-in list (server/eats/<cc>-<n>.json, owner Nov 2026: "เพิ่มร้านอาหารให้ครบทุกประเทศ เอาแบบลึกๆ"): places for
// every city of the picture library, written ahead and not checked on the day — the page says so ("check before you go"). Read into
// the family's library once per version of the files (settings eat_starter = their hash); scripts/eats-lint.mjs checks the files.
const EATS_DIR = path.join(__dirname, 'eats');
function starterFiles() { try { return fs.readdirSync(EATS_DIR).filter((f) => /^[a-z]{2}-\d+\.json$/.test(f)).sort(); } catch (_) { return []; } }
function starterRows(file, index) {
  let j; try { j = JSON.parse(fs.readFileSync(path.join(EATS_DIR, file), 'utf8')); } catch (_) { return []; }
  const rows = [], seen = new Set();
  for (const t of Array.isArray(j.towns) ? j.towns : []) {
    const p = index && index.places && index.places[t.place]; if (!p || !p.name) continue;
    const n = short(p.name), town = { en: n.en.split(',')[0].trim(), th: (n.en.includes(',') ? n.th.split(/[,\s]/)[0] : n.th).trim() || n.en }, tkey = norm(town.en);
    for (const x of Array.isArray(t.places) ? t.places : []) {
      const name = one(x && x.name, 120), nkey = norm(name);
      if (!name || !nkey || seen.has(`${tkey}:${nkey}`)) continue;
      seen.add(`${tkey}:${nkey}`);
      const ok = /^20\d\d-(0[1-9]|1[0-2])$/.test(x.ok || '') ? x.ok : '';   // the month a web search confirmed it open
      rows.push({ town: town.en, town_th: town.th, tkey, nkey, area: i18n(x.area || town, 160), kind: [0, 1, 2].includes(x.kind) ? x.kind : 0, name, row: rowOf(x), st: ok ? 'open' : '', checked: ok ? `${ok}-01` : null });
    }
  }
  return rows;
}
async function syncStarter(pool, family, index) {
  if (process.env.EATS_STARTER === '0') return 0;   // a server that wants only its own books' places (the tests of the library itself)
  const files = starterFiles(); if (!files.length) return 0;
  const h = crypto.createHash('sha1'); for (const f of files) h.update(f).update(fs.readFileSync(path.join(EATS_DIR, f)));
  const ver = `${family}:${h.digest('hex')}`;
  const was = (await pool.query("SELECT value FROM settings WHERE key='eat_starter'")).rows[0];
  if (was && was.value === ver) return 0;
  let n = 0;
  for (const f of files) n += await put(pool, family, starterRows(f, index), 'starter', null);
  await pool.query("INSERT INTO settings (key, value) VALUES ('eat_starter', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value", [ver]);
  return n;
}
// which country a town of the library is in (by the picture library's city of the same name), for the page's groups
function countryOf(index) {
  const m = new Map();
  for (const [id, p] of Object.entries((index && index.places) || {})) if (id !== p.country && p.name) { const c = index.places[p.country]; m.set(norm(short(p.name).en.split(',')[0]), { cc: p.country, th: (c && c.name && c.name.th) || p.country, en: (c && c.name && c.name.en) || p.country }); }
  return m;
}

const out = (r) => ({ id: r.id, town: r.town, town_th: r.town_th, tkey: r.tkey, area: r.area, kind: r.kind, name: r.name, src: r.src, trip: r.trip || '', st: r.st || '', url: r.url || '',
  checked: r.checked ? new Date(r.checked).toISOString().slice(0, 10) : '', ...r.row });
const all = async (pool, family) => (await pool.query('SELECT * FROM eat_lib WHERE family_id=$1 AND NOT gone ORDER BY town, kind, created_at, name', [family])).rows;
// the towns of the library, with how many places each holds and when the helper last checked one
function towns(rows) {
  const by = new Map();
  for (const r of rows) {
    const t = by.get(r.tkey) || { tkey: r.tkey, town: r.town, town_th: r.town_th, n: 0, own: 0, checked: '' };
    t.n++; if (r.src !== 'starter') t.own++; const c = r.checked ? new Date(r.checked).toISOString().slice(0, 10) : ''; if (c > t.checked) t.checked = c;
    by.set(r.tkey, t);
  }
  return [...by.values()].sort((a, b) => b.n - a.n || a.town.localeCompare(b.town));
}
// the places for a town a route names: the town's own rows, and rows of another town whose area or map address names it
// (a book's "Studio City" group is in Macau by its addresses). A name of three letters or fewer never matches inside other words.
function forTown(rows, names) {
  const keys = names.map(norm).filter((k) => k.length >= 2), words = names.map((n) => String(n || '').toLowerCase().trim()).filter((w) => w.length >= 4);
  return rows.filter((r) => keys.includes(r.tkey) || words.some((w) => `${r.town} ${r.town_th} ${(r.area && (r.area.en + ' ' + r.area.th)) || ''} ${(r.row && r.row.q) || ''}`.toLowerCase().includes(w)));
}

// ---------- the helper fills a town (one call with the API's web search tool; only the town's name and country are sent)
const SEARCHES = Math.max(1, Math.min(10, parseInt(process.env.EATLIB_SEARCHES, 10) || 6));
const SYS = 'You find places to eat for families travelling with small children, using web search to make sure each place exists and is open for business now. '
  + 'Long-running, well-liked places locals use, easy with a toddler at an early dinner; a food court or a family chain is fine. Leave out any place you find closed. '
  + 'Every text is {"th": "…", "en": "…"}: natural Thai a Thai parent says, British English. Answer with JSON only, no prose, no code fence.';
const user = (town, where, have) => `Town: ${town}${where ? ` (${where})` : ''}.
${have.length ? `Already in our list (do not repeat): ${have.slice(0, 60).join(', ')}.\n` : ''}Find 10–12 places to eat: mostly restaurants (kind 0), two or three food courts or quick bites (kind 1), two or three cafés, bakeries or sweets (kind 2), spread over the areas visitors stay in and the main sights.
Return {"places":[{"name": "as on its sign, in Latin letters", "zh": "the name in the local script, or \\"\\"", "kind": 0|1|2, "area": {"th","en"} (the district, a few words), "tag": {"th","en"} (the kind of food, 1–3 words),
"what": {"th","en"} (one line: the food and what it is known for), "why": {"th","en"} (one line: why it is easy with small children), "pr": {"th","en"} (a typical spend per adult as a range with ≈ in the local currency),
"hours": {"th","en"} (usual opening hours in a few words, or "check before you go"), "q": "a full Google Maps query: name, district, town", "st": "open"|"unsure", "url": "the best source you used, or \\"\\""}]}.`;
function cleanFill(ans, town) {
  const t = { en: one(town.en, 80), th: one(town.th || town.en, 80) }, tkey = norm(t.en), seen = new Set();
  return (Array.isArray(ans && ans.places) ? ans.places : []).slice(0, 14).map((x) => {
    const name = one(x && x.name, 120), nkey = norm(name);
    if (!name || !nkey || seen.has(nkey)) return null;
    seen.add(nkey);
    const url = /^https?:\/\/[^\s"<>]{3,300}$/.test(String(x.url || '')) ? String(x.url) : '';
    return { town: t.en, town_th: t.th, tkey, nkey, area: i18n(x.area && (x.area.en || x.area.th) ? x.area : t, 160), kind: [0, 1, 2].includes(x.kind) ? x.kind : 0, name,
      row: rowOf({ ...x, q: x.q || `${name}, ${t.en}` }), st: x.st === 'open' ? 'open' : 'unsure', url };
  }).filter(Boolean);
}
async function fill({ client, model, town, where, have = [], take, onUsage }) {
  if (take && !(await take())) throw Object.assign(new Error('limit'), { code: 'limit' });
  const messages = [{ role: 'user', content: user(one(town.en, 80), one(where, 80), have) }];
  let msg;
  for (let round = 0; round < 4; round++) {   // a long search turn may pause and is carried on
    msg = await client.messages.stream({ model, max_tokens: 16000, system: SYS, messages, tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: SEARCHES }] }).finalMessage();
    if (onUsage) { try { onUsage(msg.usage || {}); } catch (_) { /* counting never breaks a search */ } }
    if (msg.stop_reason !== 'pause_turn') break;
    messages.push({ role: 'assistant', content: msg.content });
  }
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refused'), { code: 'refusal' });
  const t = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('').replace(/```(?:json)?/g, '').trim();
  let ans; try { ans = JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1)); } catch (_) { throw Object.assign(new Error('eatlib json'), { code: 'json' }); }
  const rows = cleanFill(ans, town);
  if (!rows.length) throw Object.assign(new Error('no places'), { code: 'json' });
  return rows;
}

// the library's rows of a route's towns → a book's "where to eat" (a group a town, each place its own kind; at most `per` a town:
// the ones the helper checked first, then the family's own books')
const rank = (p) => (p.st === 'open' ? 3 : p.src === 'book' ? 2 : p.src === 'helper' ? 1 : 0);   // checked open first, then our own books', the helper's unsure ones, the built-in list
function groupsFor(byTown, per = 12) {
  const groups = byTown.filter((t) => t.places.length).map((t) => ({ area: { th: t.th || t.en, en: t.en },
    items: [...t.places].filter((p) => p.st !== 'closed').sort((a, b) => rank(b) - rank(a)).slice(0, per).map((p) => ({ name: p.name, kind: p.kind, ...rowOf(p) })) }));
  return groups.length ? { lede: { th: 'ร้านจากคลังของครอบครัว: ร้านในเล่มก่อนๆ และร้านที่ผู้ช่วยหาและเช็กกับเว็บ · ราคาและเวลาเปิดเปลี่ยนได้ เช็กซ้ำก่อนไป', en: 'From the family’s library: places from our earlier books and ones the helper found and checked on the web. Hours and prices change — check before you go.' }, kinds: KINDS, groups } : null;
}

module.exports = { rowsOfBook, syncBooks, syncStarter, starterRows, starterFiles, countryOf, put, all, out, towns, forTown, fill, cleanFill, groupsFor, norm, KINDS };
