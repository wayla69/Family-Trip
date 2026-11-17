#!/usr/bin/env node
/* The restore drill (owner, Nov 2026: "ซ้อมกู้ข้อมูลจริง"): a real backup, restored into a fresh server, then every row and file of the
   backup looked for on it — the books and their days, every entry, check-in, heart, review and spending line, the children, the
   family's emoji; every photo with its thumbnail, every clip with its poster, every voice memo, every book's film and drawn pictures.
   The Backup workflow runs it on each backup before the zip is encrypted (.github/workflows/backup.yml); test/backup.mjs runs it too.
   It prints counts only — never a name, a text or an id (the workflow's log is public).

   node scripts/restore-drill.mjs <backup.zip>      env DRILL_BASE = the fresh server, DRILL_CODE = its family code */
import fs from 'node:fs';
import { Readable } from 'node:stream';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const yauzl = createRequire(import.meta.url)('yauzl');

// the backup's own list of what it holds: backup.json and the names of its files
export function readBackup(src) {
  const open = (cb) => (Buffer.isBuffer(src) ? yauzl.fromBuffer(src, { lazyEntries: true }, cb) : yauzl.open(src, { lazyEntries: true }, cb));
  return new Promise((res, rej) => open((e, z) => {
    if (e) return rej(e);
    const entries = new Set(); let backup = null;
    z.on('error', rej);
    z.on('entry', (en) => {
      entries.add(en.fileName);
      if (en.fileName !== 'backup.json') return z.readEntry();
      z.openReadStream(en, (e2, s) => { if (e2) return rej(e2); const p = []; s.on('data', (d) => p.push(d)); s.on('end', () => { backup = JSON.parse(Buffer.concat(p).toString('utf8')); z.readEntry(); }); });
    });
    z.on('end', () => (backup ? res({ backup, entries }) : rej(new Error('backup.json missing'))));
    z.readEntry();
  }));
}

/* What the backup holds, looked for on the server it was restored into. → { lines: ['books 3/3', …], problems: ['photos 41/42', …] } */
export async function verify({ base, cookie, backup, entries }) {
  const get = (u, h = {}) => fetch(base + u, { headers: { cookie, ...h } });
  const st = await (await get('/api/b/state')).json();
  const T = backup.tables || {}, lines = [], problems = [];
  const tally = (label, want, have) => { const line = `${label} ${have}/${want}`; lines.push(line); if (have < want) problems.push(line); };
  const ids = (list, k = 'id') => new Set((list || []).map((x) => x[k]));
  const has = (label, rows, set, k = 'id') => tally(label, (rows || []).length, (rows || []).filter((r) => set.has(r[k])).length);
  has('books', T.trips, ids(st.trips));
  { const days = new Set((st.trips || []).flatMap((t) => (t.days || []).map((d) => `${t.id}#${d.day_index}`)));
    tally('days', (T.trip_days || []).length, (T.trip_days || []).filter((d) => days.has(`${d.trip_id}#${d.day_index}`)).length); }
  has('entries', T.entries, ids(st.entries));
  has('check-ins', T.places, ids(st.places));
  has('hearts', T.hearts, ids(st.hearts));
  has('reviews', T.reviews, ids(st.reviews));
  has('spending', T.spend, ids(st.spend));
  has('children', T.children, ids(st.children, 'slug'), 'slug');
  has('emoji', (T.emoji || []).filter((e) => !String(e.file || '').startsWith('stock:')), ids(st.emoji));   // the country packs come from the picture library, not the family: the state shows them only while their pictures exist
  // the files: each one the zip carries must come back from the restored server
  const okAt = async (u) => { try { const r = await get(u, { range: 'bytes=0-15' }); return r.status === 200 || r.status === 206; } catch (_) { return false; } };
  const kinds = { photos: [0, 0], thumbnails: [0, 0], clips: [0, 0], posters: [0, 0], voices: [0, 0], films: [0, 0], pictures: [0, 0], 'emoji pictures': [0, 0] };
  const count = async (k, u) => { kinds[k][0]++; if (await okAt(u)) kinds[k][1]++; };
  for (const m of T.media || []) {
    const id = encodeURIComponent(m.id), mime = String(m.mime || '');
    if (mime.startsWith('video/') && entries.has(`videos/${m.id}.mp4`)) { await count('clips', `/media/${id}`); await count('posters', `/media/${id}/t`); }
    else if (mime.startsWith('audio/') && [...entries].some((e) => e.startsWith(`audio/${m.id}.`))) await count('voices', `/media/${id}`);
    else if (entries.has(`photos/${m.id}.jpg`)) { await count('photos', `/media/${id}`); await count('thumbnails', `/media/${id}/t`); }
  }
  for (const t of T.trips || []) {
    const v = String((t.reel || {}).v || ''); if (v && entries.has(`reels/${t.id}.mp4`)) await count('films', `/media/reel/${encodeURIComponent(t.id)}?v=${v}`);
    const av = String((t.theme || {}).artV || ''); if (av && entries.has(`art/${t.id}/day-1.svg`)) await count('pictures', `/media/art/${encodeURIComponent(t.id)}/day-1.svg?v=${av}`);
  }
  for (const e of T.emoji || []) if (e.storage_key && entries.has(`emoji/${e.id}.png`)) await count('emoji pictures', `/media/emoji/${encodeURIComponent(e.id)}.png`);
  for (const [k, [want, have]] of Object.entries(kinds)) if (want) tally(k, want, have);
  return { lines, problems };
}

async function main() {
  const file = process.argv[2], base = String(process.env.DRILL_BASE || '').replace(/\/$/, ''), code = process.env.DRILL_CODE;
  if (!file || !base || !code) { console.error('usage: DRILL_BASE=… DRILL_CODE=… node scripts/restore-drill.mjs <backup.zip>'); process.exit(2); }
  const { backup, entries } = await readBackup(file);
  if (!backup.complete) { console.error('the backup says it is not complete'); process.exit(1); }
  const lg = await fetch(base + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code, name: 'Drill' }) });
  if (!lg.ok) { console.error('could not sign in to the drill server:', lg.status); process.exit(1); }
  const cookie = lg.headers.get('set-cookie').split(';')[0];
  const t0 = Date.now();
  // streamed, not read into memory: a real backup with every full-size photo can be gigabytes
  const imp = await fetch(base + '/api/import', { method: 'POST', headers: { 'x-mb': '1', cookie, 'content-type': 'application/zip', 'content-length': String(fs.statSync(file).size) }, body: Readable.toWeb(fs.createReadStream(file)), duplex: 'half' });
  const r = await imp.json().catch(() => ({}));
  if (!imp.ok || !r.ok) { console.error('the restore failed:', imp.status, r.error || ''); process.exit(1); }
  console.log(`restored in ${Math.round((Date.now() - t0) / 1000)} s`);
  const { lines, problems } = await verify({ base, cookie, backup, entries });
  for (const l of lines) console.log('  ' + l);
  if (problems.length) { console.error(`RESTORE DRILL FAILED — missing after a restore: ${problems.join(' · ')}`); process.exit(1); }
  console.log('restore drill: everything in the backup came back');
}
if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) main().catch((e) => { console.error('restore drill:', e.message); process.exit(1); });
