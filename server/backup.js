'use strict';
// Full backup (raw tables + full-size photos) and idempotent restore from a backup/export zip.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const archiver = require('archiver');
const yauzl = require('yauzl');
const sharp = require('sharp');
const { db, DATA_DIR } = require('./db');
const IMG = require('./images');

const TABLES = ['kids', 'trips_extra', 'memories', 'photos', 'checkins', 'stories', 'tripkid', 'letters'];   // FK order: memories before photos
const ID_RE = /^[A-Za-z0-9_-]{4,48}$/;
const cols = (t) => db.prepare(`PRAGMA table_info(${t})`).all().map((c) => c.name);

// user = null → everything (machine backup with BACKUP_TOKEN); user → sealed letters of other authors are left out
function dump(user) {
  const today = new Date().toISOString().slice(0, 10);
  const tables = {};
  for (const t of TABLES) tables[t] = db.prepare(`SELECT * FROM ${t}`).all();
  if (user) tables.letters = tables.letters.filter((l) => l.open_at <= today || l.uid === user.uid);
  return { format: 'memory-book-backup', version: 1, at: Date.now(), complete: !user, tables };
}

function sendZip(res, user, extra) {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="memory-book-${user ? 'export' : 'backup'}-${new Date().toISOString().slice(0, 10)}.zip"`);
  res.setHeader('Cache-Control', 'no-store');
  const z = archiver('zip', { zlib: { level: 1 } });
  z.on('error', () => res.end());
  z.pipe(res);
  for (const [name, data] of Object.entries(extra || {})) z.append(data, { name });
  z.append(JSON.stringify(dump(user)), { name: 'backup.json' });
  for (const p of db.prepare('SELECT id FROM photos').all()) {
    const f = IMG.fileFull(p.id); if (fs.existsSync(f)) z.file(f, { name: 'photos/' + p.id + '.jpg' });
  }
  z.finalize();
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
  await new Promise((ok, no) => {
    z.on('entry', (e) => { out[e.fileName] = e; z.readEntry(); });
    z.on('end', ok); z.on('error', no); z.readEntry();
  });
  return { z, out };
}

// Restore: INSERT OR IGNORE everywhere (never overwrites newer data), photo files written only when missing.
async function importZip(file) {
  const { z, out } = await entries(file);
  try {
    if (!out['backup.json']) throw Object.assign(new Error('backup.json missing (export made before backups were added)'), { status: 400 });
    const b = JSON.parse((await readEntry(z, out['backup.json'], 200e6)).toString('utf8'));
    if (b.format !== 'memory-book-backup' || !b.tables) throw Object.assign(new Error('not a Memory Book backup'), { status: 400 });
    const res = { rows: {}, photos: 0, photosSkipped: 0 };
    const photoRows = (b.tables.photos || []).filter((p) => ID_RE.test(String(p.id)) && out['photos/' + p.id + '.jpg']);
    // write photo files first (outside the transaction: async), then all rows in one transaction
    for (const p of photoRows) {
      if (fs.existsSync(IMG.fileFull(p.id))) { res.photosSkipped++; continue; }
      const buf = await readEntry(z, out['photos/' + p.id + '.jpg'], 60e6);
      const meta = await sharp(buf).metadata();
      if (meta.format !== 'jpeg' || meta.exif) await IMG.saveImage(p.id, buf);   // foreign/unstripped file → normal pipeline
      else {
        await fs.promises.writeFile(IMG.fileFull(p.id), buf);
        await sharp(buf).resize({ width: 520, height: 520, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true }).toFile(IMG.fileThumb(p.id));
      }
      res.photos++;
    }
    const okPhotos = new Set(photoRows.map((p) => p.id));
    db.transaction(() => {
      for (const t of TABLES) {
        const allowed = cols(t);
        let rows = Array.isArray(b.tables[t]) ? b.tables[t] : [];
        if (t === 'photos') rows = rows.filter((p) => okPhotos.has(p.id));
        let n = 0;
        for (const r of rows) {
          if (!r || typeof r !== 'object') continue;
          const ks = allowed.filter((k) => k in r && (r[k] === null || ['string', 'number'].includes(typeof r[k])));
          if (!ks.length) continue;
          if (t === 'photos' && !db.prepare('SELECT 1 FROM memories WHERE id=?').get(r.mem)) continue;
          n += db.prepare(`INSERT OR IGNORE INTO ${t} (${ks.join(',')}) VALUES (${ks.map(() => '?').join(',')})`).run(...ks.map((k) => r[k])).changes;
        }
        res.rows[t] = n;
      }
    })();
    return res;
  } finally { z.close(); }
}

// Stream the request body to a temp file on the volume (backups can be GBs of photos).
function receive(req, max) {
  const dir = path.join(DATA_DIR, 'tmp'); fs.mkdirSync(dir, { recursive: true });
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
