'use strict';
// Import from the Harbour Hop app (Claude Artifact) — docs/handoff/Memory_Bookshelf_Handoff.md §3, §5.
// Input zip: moments.json|moments.jsonl, visits.json, days.json, assets/<32-hex>.(jpg|jpeg|png|webp|heic).
// Idempotent (source ids kept as external_id, deterministic ids), invalid rows reported one by one, dry-run = same work in a rolled-back transaction.
const fs = require('fs');
const yauzl = require('yauzl');
const sharp = require('sharp');
const IMG = require('./images');
const { FAMILY } = require('./bookshelf');

const KINDS = ['photo', 'quote', 'mood', 'fav', 'note', 'first', 'story'];
const WHO = ['mimi', 'mika', 'both'];
const ASSET_RE = /^[0-9a-f]{32}$/;
const SRC_ID_RE = /^[A-Za-z0-9_.:-]{1,80}$/;

// Accept the shapes an export may come in: [doc], [{id, data}], {id: doc}, or JSON lines.
function docs(text) {
  const t = text.trim(); if (!t) return [];
  let v;
  try { v = JSON.parse(t); } catch (_) { v = t.split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)); }
  if (v && !Array.isArray(v) && typeof v === 'object') v = Array.isArray(v.docs) ? v.docs : Object.entries(v).map(([id, d]) => ({ id, ...d }));
  return v.map((x) => (x && x.data && typeof x.data === 'object' ? { id: x.id, ...x.data } : x));
}

// moments.schema.json, by hand (no extra dependency)
function invalid(m) {
  if (!m || typeof m !== 'object') return 'not an object';
  if (!SRC_ID_RE.test(String(m.id || ''))) return 'missing/odd id';
  if (m.trip !== 'hk2026') return 'trip must be "hk2026"';
  if (!KINDS.includes(m.k)) return `unknown k "${m.k}"`;
  if (!Number.isInteger(m.at)) return 'at must be epoch ms';
  if (m.d !== undefined && !(Number.isInteger(m.d) && m.d >= -1 && m.d <= 5)) return 'd out of range';
  if (m.who !== undefined && !WHO.includes(m.who)) return `unknown who "${m.who}"`;
  if (m.lang !== undefined && !['th', 'en'].includes(m.lang)) return 'lang';
  const need = { photo: ['d', 'img'], quote: ['d', 'who', 'text'], mood: ['d', 'who', 'e'], fav: ['d', 'text'], note: ['d', 'text'], first: ['key', 'who'], story: ['text'] }[m.k];
  const miss = need.filter((f) => m[f] === undefined || m[f] === null);
  if (miss.length) return `missing ${miss.join(', ')}`;
  if (m.k === 'photo' && !ASSET_RE.test(m.img)) return 'img must be a 32-hex asset id';
  if (['quote', 'fav', 'note', 'story'].includes(m.k) && typeof m.text !== 'string') return 'text must be a string';
  if (m.k !== 'story' && m.d === -1) return 'only stories may use d = -1';
  return null;
}

async function readZip(file) {
  const z = await new Promise((ok, no) => yauzl.open(file, { lazyEntries: true, autoClose: false }, (e, x) => (e ? no(Object.assign(new Error('not a zip file'), { status: 400 })) : ok(x))));
  const entries = {};
  await new Promise((ok, no) => { z.on('entry', (e) => { entries[e.fileName.replace(/^.*?(moments\.jsonl?|visits\.json|days\.json|assets\/.*)$/, '$1')] = e; z.readEntry(); }); z.on('end', ok); z.on('error', no); z.readEntry(); });
  const read = (e, max) => new Promise((ok, no) => {
    if (e.uncompressedSize > max) return no(new Error('entry too large'));
    z.openReadStream(e, (err, s) => { if (err) return no(err); const p = []; s.on('data', (d) => p.push(d)); s.on('end', () => ok(Buffer.concat(p))); s.on('error', no); });
  });
  return { z, entries, read };
}

async function run(file, pool, media, { dry }) {
  const { z, entries, read } = await readZip(file);
  try {
    const text = async (n) => (entries[n] ? (await read(entries[n], 50e6)).toString('utf8') : '');
    let moments, visits, days;
    try {
      moments = docs((await text('moments.json')) || (await text('moments.jsonl')));
      visits = docs(await text('visits.json'));
      days = docs(await text('days.json'));
    } catch (e) { throw Object.assign(new Error('could not parse JSON: ' + e.message), { status: 400 }); }
    if (!moments.length && !visits.length) throw Object.assign(new Error('no moments.json / visits.json in the zip'), { status: 400 });
    const assets = {};
    for (const [n, e] of Object.entries(entries)) { const m = /^assets\/([0-9a-f]{32})\.[a-z]+$/i.exec(n); if (m) assets[m[1].toLowerCase()] = e; }

    const trip = (await pool.query("SELECT id FROM trips WHERE family_id=$1 AND (legacy_id='hk2026' OR slug='hk-macau-2026')", [FAMILY])).rows[0];
    if (!trip) throw Object.assign(new Error('trip hk-macau-2026 not found'), { status: 409 });
    const T = trip.id;
    const report = { dry, trip: T, read: {}, imported: {}, existing: 0, invalid: [], photos: { stored: 0, missing: [] } };
    const stats = async (c) => (await c.query(`SELECT
      (SELECT count(*) FROM media WHERE trip_id=$1)::int photos,
      (SELECT count(*) FROM entries WHERE trip_id=$1 AND kind='quote')::int quotes,
      (SELECT count(*) FROM entries WHERE trip_id=$1 AND kind='first')::int firsts,
      (SELECT count(*) FROM places WHERE trip_id=$1)::int places`, [T])).rows[0];

    const ok = [];
    for (const m of moments) {
      const why = invalid(m);
      if (why) { report.invalid.push({ id: m && m.id, error: why }); continue; }
      report.read[m.k] = (report.read[m.k] || 0) + 1;
      ok.push(m);
    }
    report.read.visit = visits.length; report.read.day = days.length;

    // photos: decode (dry) or process + store (apply) before the transaction; already-imported ones are skipped
    const photoReady = new Set();
    for (const m of ok.filter((x) => x.k === 'photo')) {
      const id = 'hh-' + m.id;
      const e = assets[m.img];
      if (!e) { report.photos.missing.push(m.img); report.invalid.push({ id: m.id, error: `asset ${m.img} not in zip` }); continue; }
      if ((await pool.query('SELECT 1 FROM media WHERE id=$1', [id])).rowCount) { photoReady.add(m.id); continue; }
      const buf = await read(e, 60e6);
      try {
        if (dry) await sharp(buf).metadata();
        else {
          const img = await IMG.processImage(buf);
          await media.put(`p/${T}/${id}.jpg`, img.full); await media.put(`t/${T}/${id}.jpg`, img.thumb);
          m._w = img.w; m._h = img.h; m._bytes = img.full.length; report.photos.stored++;
        }
        photoReady.add(m.id);
      } catch (err) { report.invalid.push({ id: m.id, error: 'unreadable image' }); }
    }

    const c = await pool.connect();
    try {
      await c.query('BEGIN');
      report.before = await stats(c);
      const count = (k, r) => { if (r.rowCount) report.imported[k] = (report.imported[k] || 0) + 1; else report.existing++; };
      const at = (ms) => new Date(ms);
      for (const m of ok) {
        const day = m.d === -1 || m.d === undefined ? null : m.d;
        if (m.k === 'photo') {
          if (!photoReady.has(m.id)) continue;
          const id = 'hh-' + m.id;
          count('photo', await c.query(`INSERT INTO media (id, family_id, trip_id, day_index, storage_key, bytes, width, height, caption, highlight, taken_at, created_by, external_id)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'Harbour Hop',$12) ON CONFLICT DO NOTHING`,
          [id, FAMILY, T, day, `p/${T}/${id}.jpg`, m._bytes || 0, m._w || 0, m._h || 0, String(m.text || '').slice(0, 500), !!m.hi, at(m.at), m.id]));
          continue;
        }
        // same ids the app itself uses, so later edits in the bookshelf merge with imported rows
        const id = { mood: `${T}.mood.d${day}.${m.who}`, fav: `${T}.fav.d${day}`, note: `${T}.note.d${day}`,
          first: m.key === 'custom' ? `hh-${m.id}` : `${T}.first.${m.key}.${m.who}`, story: day === null ? `${T}.story.all` : `${T}.story.d${day}` }[m.k] || `hh-${m.id}`;
        count(m.k, await c.query(`INSERT INTO entries (id, family_id, trip_id, day_index, kind, child, text, mood, first_key, lang, highlight, occurred_at, created_by, external_id)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'Harbour Hop',$13) ON CONFLICT DO NOTHING`,
        [id, FAMILY, T, day, m.k, m.who || null, String(m.text || '').slice(0, 8000), m.e || null, m.k === 'first' ? m.key : null, m.lang || null, !!m.hi, at(m.at), m.id]));
      }
      for (const v of visits) {
        const name = { en: String(v.en || v.th || '').slice(0, 120), th: String(v.th || v.en || '').slice(0, 120), ...(v.zh ? { zh: String(v.zh).slice(0, 120) } : {}) };
        if (!name.en || !Number.isInteger(v.d) || v.d < 0 || v.d > 5 || !SRC_ID_RE.test(String(v.id || ''))) { report.invalid.push({ id: v.id, error: 'visit needs id, name and d 0–5' }); continue; }
        count('visit', await c.query(`INSERT INTO places (id, family_id, trip_id, day_index, key, kind, name, visited_at, created_by, external_id)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'Harbour Hop',$9) ON CONFLICT DO NOTHING`,
        [`${T}:${name.en}`.slice(0, 200), FAMILY, T, v.d, name.en, v.kind === 'r' ? 'food' : 'place', name, at(Number.isInteger(v.at) ? v.at : Date.now()), v.id]));
      }
      for (const d of days) {
        const i = /^d([0-5])$/.exec(String(d.id || '')); if (!i || !d.done) continue;
        count('day_done', await c.query('UPDATE trip_days SET done_at = $3 WHERE trip_id=$1 AND day_index=$2 AND done_at IS NULL', [T, +i[1], at(Number.isInteger(d.at) ? d.at : Date.now())]));
      }
      report.after = await stats(c);
      await c.query(dry ? 'ROLLBACK' : 'COMMIT');
    } catch (e) { await c.query('ROLLBACK').catch(() => {}); throw e; } finally { c.release(); }
    return report;
  } finally { z.close(); }
}

module.exports = { run, invalid, docs };
