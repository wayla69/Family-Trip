'use strict';
// Full backup (all family tables + full-size photos from the bucket) and idempotent restore (docs/ADR.md ADR-9).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { ZipArchive } = require('archiver');   // archiver 8: ESM-only, one class per format (Node 22 loads it with require)
const yauzl = require('yauzl');
const sharp = require('sharp');
const ART = require('./bookart');
const IMG = require('./images');
const { FAMILY, AUDIO_EXT } = require('./bookshelf');
const EMOJI = require('./emoji');

// restore order follows foreign keys
const TABLES = ['children', 'trips', 'trip_days', 'firsts_catalog', 'entries', 'media', 'places', 'hearts', 'reviews', 'spend', 'emoji'];
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
  const z = new ZipArchive({ zlib: { level: 1 } });
  z.on('error', () => res.end());
  z.pipe(res);
  z.append(JSON.stringify(b), { name: 'backup.json' });
  for (const m of b.tables.media) {   // one photo (or voice memo) in memory at a time
    const buf = await media.get(m.storage_key);
    if (buf) z.append(buf, { name: String(m.mime || '').startsWith('audio/') ? `audio/${m.id}.${AUDIO_EXT[m.mime] || 'webm'}` : `photos/${m.id}.jpg` });
  }
  for (const k of b.tables.children || []) {   // each child's character drawn from a photo (server/avatar.js), full figure and face
    const ids = new Set([k.avatar, ...(Array.isArray(k.avatars) ? k.avatars.map((d) => d && d.id) : [])].filter(Boolean));
    for (const id of ids) for (const kind of ['full', 'face']) { const buf = await media.get(`k/${k.slug}/${id}-${kind}.png`); if (buf) z.append(buf, { name: `kids/${k.slug}-${id}-${kind}.png` }); }
  }
  for (const t of b.tables.trips || []) {   // a book's pictures drawn by the helper (server/bookart.js): day circles + crest, so a restore keeps them
    const v = String((t.theme || {}).artV || ''); if (!ART.V_RE.test(v)) continue;
    const n = (b.tables.trip_days || []).filter((d) => d.trip_id === t.id).length;
    for (const f of [...Array.from({ length: n }, (_, i) => `day-${i + 1}.svg`), 'crest.svg', 'guide-1.svg', 'guide-2.svg']) { const buf = await media.get(`d/${t.id}/${v}/${f}`); if (buf) z.append(buf, { name: `art/${t.id}/${f}` }); }
  }
  for (const e of b.tables.emoji || []) {   // the family's own emoji pictures (the bundled ones come with the app)
    if (!e.storage_key) continue;
    const buf = await media.get(e.storage_key); if (buf) z.append(buf, { name: `emoji/${e.id}.png` });
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
    const res = { rows: {}, photos: 0, photosSkipped: 0, audio: 0 };
    // photos and voice memos first (async, outside the transaction)
    const isAudio = (m) => String(m.mime || '').startsWith('audio/') && !!AUDIO_EXT[m.mime];
    const entryOf = (m) => (isAudio(m) ? `audio/${m.id}.${AUDIO_EXT[m.mime]}` : `photos/${m.id}.jpg`);
    const mediaRows = (b.tables.media || []).filter((m) => ID_RE.test(String(m.id)) && SLUG_RE.test(String(m.trip_id)) && out[entryOf(m)]);
    for (const m of mediaRows) {
      if (isAudio(m)) {   // kept as recorded; the key is rebuilt, never read from the file
        m.storage_key = `a/${m.trip_id}/${m.id}.${AUDIO_EXT[m.mime]}`;
        if (await media.get(m.storage_key)) { res.photosSkipped++; continue; }
        await media.put(m.storage_key, await readEntry(z, out[entryOf(m)], 10e6), m.mime);
        res.audio++; continue;
      }
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
    // the children's drawn characters: keys rebuilt from a checked slug and id, written only when missing, and only real PNGs
    for (const t of b.tables.trips || []) {   // the helper's drawn pictures of a book (a trip id is a slug; a file name is day-<n>.png or crest.png)
      const v = String((t.theme || {}).artV || '');
      if (!SLUG_RE.test(String(t.id)) || !ART.V_RE.test(v)) continue;   // the restored row names the version its urls carry
      for (const name of Object.keys(out).filter((x) => x.startsWith(`art/${t.id}/`))) {
        const f = name.slice(`art/${t.id}/`.length), key = `d/${t.id}/${v}/${f}`;
        if (!/^(day-\d{1,2}|crest|guide-[12])\.svg$/.test(f) || (await media.get(key))) continue;
        const buf = await readEntry(z, out[name], 1e6);
        const svg = ART.svgOf(buf.toString('utf8'));   // checked again on the way in: one safe <svg>, nothing that runs or loads
        if (svg) await media.put(key, Buffer.from(svg), 'image/svg+xml');
      }
    }
    for (const k of b.tables.children || []) {
      const okId = (id) => /^[0-9a-f]{12}$/.test(String(id || ''));
      if (!SLUG_RE.test(String(k.slug))) { k.avatar = null; k.avatars = []; continue; }
      if (!okId(k.avatar)) k.avatar = null;
      k.avatars = (Array.isArray(k.avatars) ? k.avatars : []).filter((d) => d && okId(d.id) && /^\d{4}-\d{2}-\d{2}$/.test(String(d.at || ''))).map((d) => ({ id: d.id, at: d.at, age_m: Number.isInteger(d.age_m) ? d.age_m : null }));
      for (const [id, kind] of [...new Set([k.avatar, ...k.avatars.map((d) => d.id)].filter(Boolean))].flatMap((i) => [[i, 'full'], [i, 'face']])) {
        const e = out[`kids/${k.slug}-${id}-${kind}.png`], key = `k/${k.slug}/${id}-${kind}.png`;
        if (!e || (await media.get(key))) continue;
        const buf = await readEntry(z, e, 10e6);
        if ((await sharp(buf).metadata()).format === 'png') await media.put(key, buf, 'image/png');
      }
    }
    // the family's own emoji pictures: the key rebuilt from a checked id, written only when missing, only real PNGs;
    // a row whose picture did not come along (and has no bundled one) is left out
    const emojiRows = [];
    for (const e of Array.isArray(b.tables.emoji) ? b.tables.emoji : []) {
      if (!e || !EMOJI.ID_RE.test(String(e.id)) || !EMOJI.isEmoji(String(e.ch || ''))) continue;
      if (e.storage_key) {
        e.storage_key = EMOJI.keyOf(e.id); e.file = null;
        const ent = out[`emoji/${e.id}.png`];
        if (!(await media.get(e.storage_key))) {
          if (!ent) continue;
          const buf = await readEntry(z, ent, 5e6);
          if ((await sharp(buf).metadata()).format !== 'png') continue;
          await media.put(e.storage_key, buf, 'image/png');
        }
      } else if (!/^[a-z0-9-]{2,40}$/.test(String(e.file || ''))) continue;
      emojiRows.push(e);
    }
    b.tables.emoji = emojiRows;
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
