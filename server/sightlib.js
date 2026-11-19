'use strict';
// The library of things to do (docs/PLACES-ECOSYSTEM.md E2, docs/SIGHTS.md; owner, Nov 2026: "คลังข้อมูลให้ลึกขึ้น … สถานที่ท่องเที่ยว ให้เลือก
// แนวที่ชอบได้"). One row a sight under its town: what it is, for which ages, how long, indoors or out, the pram, the price, booking, a map
// query — and the page that confirmed it this month (every built-in row is checked on the web before it ships: `ok` + `src`).
// The built-in files (server/sights/<cc>-<n>.json) are read into the family's table once per version of the files (settings
// sight_starter); a sight the parents take out stays out (gone), a sight they would love to go to is kept (wish). The planner and Today
// read it so the helper does not have to think of places again (E4, E5).
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const TAGS = require('../public/tags.js');

const one = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, n);
const norm = (x) => String(x || '').normalize('NFKC').toLowerCase().replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
const i18n = (x, n) => (x && typeof x === 'object' ? { th: one(x.th || x.en, n), en: one(x.en || x.th, n) } : { th: one(x, n), en: one(x, n) });
const short = (n) => ({ th: String(n.th || n.en || '').split(/\s*และ/)[0].trim(), en: String(n.en || n.th || '').split(/ and | & /)[0].trim() });
// the kinds of sight (docs/SIGHTS.md) and the outing style each one is (public/tags.js TASTE_OUT) — a sight's styles are its kind's plus
// what its own words say
const KINDS = {
  themepark: ['park', '🎢', 'สวนสนุก', 'Theme park'], zoo: ['animals', '🦒', 'สวนสัตว์', 'Zoo'], aquarium: ['aquarium', '🐠', 'อควาเรียม', 'Aquarium'],
  museumkid: ['museum', '🔬', 'พิพิธภัณฑ์เด็ก', 'Hands-on museum'], museum: ['museum', '🏛️', 'พิพิธภัณฑ์', 'Museum'], park: ['nature', '🌳', 'สวนสาธารณะ', 'Park'],
  play: ['play', '🛝', 'ที่เล่นของเด็ก', 'Play'], beach: ['sea', '🏖️', 'ชายหาด', 'Beach'], nature: ['nature', '🌲', 'ธรรมชาติ', 'Nature'],
  views: ['views', '🗼', 'จุดชมวิว', 'Views'], culture: ['culture', '⛩️', 'วัดและวัง', 'Culture'], oldtown: ['culture', '🏘️', 'ย่านเก่า', 'Old town'],
  market: ['food', '🏮', 'ตลาด', 'Market'], show: ['show', '🎭', 'การแสดง', 'Show'], farm: ['farm', '🍓', 'ฟาร์ม', 'Farm'],
  onsen: ['onsen', '♨️', 'ออนเซ็น', 'Hot spring'], ride: ['train', '🚡', 'นั่งรถ เรือ กระเช้า', 'A ride'], shop: ['shop', '🛍️', 'ช้อปปิ้ง', 'Shopping'],
};
const RE = { io: ['in', 'out', 'both'], pram: ['yes', 'part', 'no'], book: ['none', 'rec', 'req'] };

// one built-in row → the table's row (bounded, both languages); the landmark picture of the same place when the picture library has one
function rowOf(x, art) {
  const ages = Array.isArray(x.ages) && x.ages.length === 4 && x.ages.every((a) => [0, 1, 2].includes(a)) ? x.ages : [1, 1, 1, 1];
  const r = {
    name: i18n(x.name, 120), local: one(x.local, 80), kind: KINDS[x.kind] ? x.kind : 'park', area: i18n(x.area, 120),
    what: i18n(x.what, 240), why: i18n(x.why, 240), tip: x.tip ? i18n(x.tip, 240) : null, ages,
    hrs: Math.max(0.5, Math.min(10, +x.hrs || 2)), io: RE.io.includes(x.io) ? x.io : 'out', pram: RE.pram.includes(x.pram) ? x.pram : 'part',
    price: i18n(x.price, 160), book: RE.book.includes(x.book) ? x.book : 'none', q: one(x.q, 200), ok: one(x.ok, 7), src: one(x.src, 300),
  };
  const st = TAGS.outStylesOf({ name: r.name, what: r.what, why: r.why }); const k = KINDS[r.kind][0];
  r.styles = [...new Set([k, ...st])].slice(0, 6);
  if (art) r.art = art;
  return r;
}
// the picture library's landmark of this place whose keywords the sight's name holds (a whole keyword of 4 letters or more)
function artOf(place, name, index) {
  const nm = ` ${String(name.en || '').toLowerCase()} ${String(name.th || '')} `;
  for (const it of (index && index.items) || []) {
    if (it.cat !== 'landmark' || !it.ok || it.withdrawn || !String(it.id).startsWith(place + '.')) continue;
    if ((it.kw || []).some((k) => String(k).length >= 4 && nm.includes(String(k).toLowerCase()))) return it.id;
  }
  return '';
}

const DIR = path.join(__dirname, 'sights');
function starterFiles() { try { return fs.readdirSync(DIR).filter((f) => /^[a-z]{2}-\d+\.json$/.test(f)).sort(); } catch (_) { return []; } }
// the town a place id names in the library ("Tokyo", "โตเกียว"; "Hokkaido, Sapporo" → "Hokkaido")
function townOfPlace(p) { const n = short(p.name); return { en: n.en.split(',')[0].trim(), th: (n.en.includes(',') ? n.th.split(/[,\s]/)[0] : n.th).trim() || n.en }; }
function starterRows(file, index, url) {
  let j; try { j = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8')); } catch (_) { return []; }
  const rows = [], seen = new Set();
  for (const t of Array.isArray(j.towns) ? j.towns : []) {
    const p = index && index.places && index.places[t.place]; if (!p || !p.name) continue;
    const town = townOfPlace(p), tkey = norm(town.en);
    for (const x of Array.isArray(t.sights) ? t.sights : []) {
      if (!x || !x.name || !/^20\d\d-(0[1-9]|1[0-2])$/.test(x.ok || '') || !/^https:\/\//.test(x.src || '')) continue;   // never a row without its web check
      const name = one(x.name.en, 120), nkey = norm(name);
      if (!nkey || seen.has(`${tkey}:${nkey}`)) continue;
      seen.add(`${tkey}:${nkey}`);
      const art = artOf(t.place, x.name, index);
      rows.push({ place: t.place, town: town.en, town_th: town.th, tkey, nkey, kind: KINDS[x.kind] ? x.kind : 'park', name, row: rowOf(x, art && url ? url(art) : ''), url: one(x.src, 300), checked: `${x.ok}-01` });
    }
  }
  return rows;
}

const idOf = (family, tkey, nkey) => crypto.createHash('sha1').update(`sight:${family}:${tkey}:${nkey}`).digest('hex').slice(0, 20);
async function put(pool, family, rows, src) {
  if (!rows.length) return 0;
  const list = rows.map((r) => ({ ...r, id: idOf(family, r.tkey, r.nkey) }));
  const res = await pool.query(`INSERT INTO sight_lib (id, family_id, place, town, town_th, tkey, nkey, kind, name, row, src, url, checked)
    SELECT x.id, $1, x.place, x.town, x.town_th, x.tkey, x.nkey, x.kind, x.name, x.row, $2, x.url, x.checked::date
    FROM jsonb_to_recordset($3::jsonb) AS x(id text, place text, town text, town_th text, tkey text, nkey text, kind text, name text, row jsonb, url text, checked text)
    ON CONFLICT (family_id, tkey, nkey) DO UPDATE SET place = EXCLUDED.place, town = EXCLUDED.town, town_th = EXCLUDED.town_th, kind = EXCLUDED.kind, row = EXCLUDED.row,
      url = EXCLUDED.url, checked = EXCLUDED.checked
    WHERE NOT sight_lib.gone AND sight_lib.src = EXCLUDED.src`, [family, src, JSON.stringify(list)]);
  return res.rowCount;
}
// the built-in files into the family's table, once per version of the files; a built-in sight the files no longer hold leaves the
// library (a later check found it closed) — never a mark the parents made (gone or wish keeps the row)
async function syncStarter(pool, family, index, url) {
  if (process.env.SIGHTS_STARTER === '0') return 0;
  const files = starterFiles(); if (!files.length) return 0;
  const h = crypto.createHash('sha1'); for (const f of files) h.update(f).update(fs.readFileSync(path.join(DIR, f)));
  const ver = `${family}:${h.digest('hex')}`;
  const was = (await pool.query("SELECT value FROM settings WHERE key='sight_starter'")).rows[0];
  if (was && was.value === ver) return 0;
  let n = 0; const keep = [];
  for (const f of files) { const rows = starterRows(f, index, url); for (const r of rows) keep.push(idOf(family, r.tkey, r.nkey)); n += await put(pool, family, rows, 'starter'); }
  if (keep.length) await pool.query("DELETE FROM sight_lib WHERE family_id=$1 AND src='starter' AND NOT gone AND NOT wish AND NOT (id = ANY($2::text[]))", [family, keep]);
  await pool.query("INSERT INTO settings (key, value) VALUES ('sight_starter', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value", [ver]);
  return n;
}

const out = (r) => ({ id: r.id, place: r.place, town: r.town, town_th: r.town_th, tkey: r.tkey, src: r.src, url: r.url || '', wish: !!r.wish,
  checked: r.checked ? new Date(r.checked).toISOString().slice(0, 10) : '', ...r.row, kind: r.kind });
const all = async (pool, family) => (await pool.query('SELECT * FROM sight_lib WHERE family_id=$1 AND NOT gone ORDER BY town, created_at, name', [family])).rows;
function towns(rows) {
  const by = new Map();
  for (const r of rows) { const t = by.get(r.tkey) || { tkey: r.tkey, place: r.place, town: r.town, town_th: r.town_th, n: 0, wish: 0, indoor: 0 }; t.n++; if (r.wish) t.wish++; if (r.row && r.row.io !== 'out') t.indoor++; by.set(r.tkey, t); }
  return [...by.values()].sort((a, b) => b.n - a.n || a.town.localeCompare(b.town));
}
// the sights of a town a route names: by the town's key, or by the place id
const forTown = (rows, names) => { const keys = names.map(norm).filter((k) => k.length >= 2); return rows.filter((r) => keys.includes(r.tkey) || names.includes(r.place)); };
// how well a sight suits the family: the youngest child's age band (0–2 · 3–5 · 6–9 · 10+), the outing styles they love or skip,
// the needs (a pram needs `pram` not `no`; little walking prefers short visits). -9 = not for the youngest at all.
const band = (y) => (y == null ? 1 : y < 3 ? 0 : y < 6 ? 1 : y < 10 ? 2 : 3);
function fitOf(r, taste, youngest) {
  const ages = r.ages || [1, 1, 1, 1], a = ages[band(youngest)];
  if (a === 0) return -9;
  let s = a;
  const t = TAGS.cleanTaste(taste), f = TAGS.tasteFit(r.styles || [], t.out);
  s += f * 2;
  if (t.needs.includes('pram') && r.pram === 'no') s -= 2;
  if (t.needs.includes('walk') && r.hrs > 4) s -= 1;
  return s;
}

module.exports = { KINDS, rowOf, artOf, starterRows, starterFiles, syncStarter, put, all, out, towns, forTown, fitOf, idOf, norm, band };
