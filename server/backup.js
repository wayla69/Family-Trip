'use strict';
// Full backup (all family tables + full-size photos from the bucket) and idempotent restore (docs/ADR.md ADR-9).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const archiver = require('archiver');
const yauzl = require('yauzl');
const sharp = require('sharp');
const IMG = require('./images');
const { FAMILY } = require('./bookshelf');

// restore order follows foreign keys
const TABLES = ['children', 'trips', 'trip_days', 'firsts_catalog', 'entries', 'media', 'places', 'hearts', 'reviews', 'spend'];
const ID_RE = /^[A-Za-z0-9_.:-]{4,80}$/;
const SLUG_RE = /^[a-z0-9-]{2,60}$/;
const thumbKey = (k) => k.replace(/^p\//, 't/');
const familyScoped = (t) => !['trip_days', 'firsts_catalog'].includes(t);

async function dump(pool) {
  const tables = {};
  for (const t of TABLES) {
    tables[t] = (await pool.query(familyScoped(t) ? `SELECT * FROM ${t} WHERE family_id=$1` : `SELECT x.* FROM ${t} x JOIN trips p ON p.id=x.trip_id WHERE p.family_id=$1`, [FAMILY])).rows;
  }
  return { format: 'memory-bookshelf-backup', version: 1, at: Date.now(), complete: true, family: FAMILY, tables };
}

async function sendZip(res, pool, media) {
  const b = await dump(pool);
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="memory-bookshelf-${new Date().toISOString().slice(0, 10)}.zip"`);
  res.setHeader('Cache-Control', 'no-store');
  const z = archiver('zip', { zlib: { level: 1 } });
  z.on('error', () => res.end());
  z.pipe(res);
  z.append(JSON.stringify(b), { name: 'backup.json' });
  for (const m of b.tables.media) {   // one photo in memory at a time
    const buf = await media.get(m.storage_key);
    if (buf) z.append(buf, { name: `photos/${m.id}.jpg` });
  }
  await z.finalize();
}

const openZip = (file) => new Promise((ok, no) => yauzl.open(file, { lazyEntries: true, autoClose: false },
  (e, z) => (e ? no(Object.assign(new Error('not a zip file'), { status: 400 })) : ok(z))));
const readEntry = (z, entry, max) => new Promise((ok, no) => {
  if (entry.uncompressedSize > max) return no(new Error('entry too large'));
  z.openReadStream(entry, (e, s) => {
    if (e) return no(e);
    const parts = []; let n = 0;
    s.on('data', (d) => { n += d.length; if (n > max) s.destroy(new Error('entry too large')); else parts.push(d); });
    s.on('end', () => ok(Buffer.concat(parts))); s.on('error', no);
  });
});
async function entries(file) {
  const z = await openZip(file);
  const out = {};
  await new Promise((ok, no) => { z.on('entry', (e) => { out[e.fileName] = e; z.readEntry(); }); z.on('end', ok); z.on('error', no); z.readEntry(); });
  return { z, out };
}

// Restore: ON CONFLICT DO NOTHING everywhere (never overwrites), photo objects written only when missing.
async function importZip(file, pool, media) {
  const { z, out } = await entries(file);
  try {
    if (!out['backup.json']) throw Object.assign(new Error('backup.json missing'), { status: 400 });
    const b = JSON.parse((await readEntry(z, out['backup.json'], 200e6)).toString('utf8'));
    if (b.format !== 'memory-bookshelf-backup' || !b.tables) throw Object.assign(new Error('not a Memory Bookshelf backup'), { status: 400 });
    const res = { rows: {}, photos: 0, photosSkipped: 0 };
    // photos first (async, outside the transaction)
    const mediaRows = (b.tables.media || []).filter((m) => ID_RE.test(String(m.id)) && SLUG_RE.test(String(m.trip_id)) && out[`photos/${m.id}.jpg`]);
    for (const m of mediaRows) {
      m.storage_key = `p/${m.trip_id}/${m.id}.jpg`;   // never trust a key from the file
      if (await media.get(m.storage_key)) { res.photosSkipped++; continue; }
      const buf = await readEntry(z, out[`photos/${m.id}.jpg`], 60e6);
      const meta = await sharp(buf).metadata();
      if (meta.format !== 'jpeg' || meta.exif) {   // foreign or unstripped file → normal pipeline
        const img = await IMG.processImage(buf);
        await media.put(m.storage_key, img.full); await media.put(thumbKey(m.storage_key), img.thumb);
      } else {
        await media.put(m.storage_key, buf);
        await media.put(thumbKey(m.storage_key), await sharp(buf).resize({ width: 520, height: 520, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true }).toBuffer());
      }
      res.photos++;
    }
    const okMedia = new Set(mediaRows.map((m) => m.id));
    const c = await pool.connect();
    try {
      await c.query('BEGIN');
      await c.query('INSERT INTO families (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING', [FAMILY, 'Family']);
      for (const t of TABLES) {
        const cols = (await c.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name=$1", [t])).rows;
        const jsonb = new Set(cols.filter((x) => x.data_type === 'jsonb').map((x) => x.column_name));
        let rows = Array.isArray(b.tables[t]) ? b.tables[t] : [];
        if (t === 'media') rows = rows.filter((m) => okMedia.has(m.id));
        let n = 0;
        for (const r of rows) {
          if (!r || typeof r !== 'object') continue;
          if (familyScoped(t)) r.family_id = FAMILY;   // a backup always restores into this family
          const ks = cols.map((x) => x.column_name).filter((k) => k in r);
          if (!ks.length) continue;
          const vals = ks.map((k) => (jsonb.has(k) && r[k] !== null ? JSON.stringify(r[k]) : r[k]));
          await c.query('SAVEPOINT r');
          try {
            // days already exist from the seeds on a fresh server: still bring back their Done marks
            const onConflict = t === 'trip_days' && ks.includes('done_at')
              ? 'ON CONFLICT (trip_id, day_index) DO UPDATE SET done_at = EXCLUDED.done_at WHERE trip_days.done_at IS NULL AND EXCLUDED.done_at IS NOT NULL'
              : 'ON CONFLICT DO NOTHING';
            n += (await c.query(`INSERT INTO ${t} (${ks.join(',')}) VALUES (${ks.map((_, i) => '$' + (i + 1)).join(',')}) ${onConflict}`, vals)).rowCount;
            await c.query('RELEASE SAVEPOINT r');
          } catch (e) { await c.query('ROLLBACK TO SAVEPOINT r'); }   // a broken row (e.g. missing trip) is skipped, not fatal
        }
        res.rows[t] = n;
      }
      await c.query('COMMIT');
    } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
    return res;
  } finally { z.close(); }
}

// Stream the request body to a temp file (backups can be GBs of photos).
function receive(req, dataDir, max) {
  const dir = path.join(dataDir, 'tmp'); fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'import-' + crypto.randomBytes(6).toString('hex') + '.zip');
  return new Promise((ok, no) => {
    let n = 0; const w = fs.createWriteStream(file);
    const fail = (e) => { w.destroy(); fs.rm(file, { force: true }, () => no(e)); };
    req.on('data', (d) => { n += d.length; if (n > max) { req.unpipe(w); req.resume(); fail(Object.assign(new Error('too large'), { status: 413 })); } });
    req.on('error', fail); w.on('error', fail);
    w.on('finish', () => ok(file));
    req.pipe(w);
  });
}

module.exports = { dump, sendZip, importZip, receive };
