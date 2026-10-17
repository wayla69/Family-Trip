// Import the Harbour Hop app export into the bookshelf (Handoff §5).
//   node scripts/import-harbour-hop.mjs <folder> --url https://<domain> [--apply]
// <folder> holds moments.json (or .jsonl), visits.json, days.json and assets/<32-hex>.jpg (as saved by ArtifactData / Artifact read).
// Without --apply it is a dry run: counts per type, before/after book stats, invalid rows — nothing is written.
// The family code is read from $FAMILY_CODE (or asked for), never from the command line.
import archiver from 'archiver';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';

const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith('--'));
const url = (args[args.indexOf('--url') + 1] || '').replace(/\/$/, '');
const apply = args.includes('--apply');
if (!dir || !fs.existsSync(dir) || !url.startsWith('http')) { console.error('usage: node scripts/import-harbour-hop.mjs <folder> --url https://<domain> [--apply]'); process.exit(2); }
let code = process.env.FAMILY_CODE;
if (!code) { const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); code = await rl.question('Family code: '); rl.close(); }

const zip = await new Promise((res, rej) => {
  const a = archiver('zip', { zlib: { level: 1 } }); const parts = [];
  a.on('data', (d) => parts.push(d)); a.on('end', () => res(Buffer.concat(parts))); a.on('error', rej);
  for (const f of ['moments.json', 'moments.jsonl', 'visits.json', 'days.json']) if (fs.existsSync(path.join(dir, f))) a.file(path.join(dir, f), { name: f });
  if (fs.existsSync(path.join(dir, 'assets'))) a.directory(path.join(dir, 'assets'), 'assets');
  a.finalize();
});
const login = await fetch(url + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code, name: 'Import' }) });
if (!login.ok) { console.error('login failed:', login.status); process.exit(1); }
const cookie = login.headers.get('set-cookie').split(';')[0];
const r = await fetch(`${url}/api/b/import/harbour-hop${apply ? '' : '?dry=1'}`, { method: 'POST', headers: { 'x-mb': '1', cookie, 'content-type': 'application/zip' }, body: zip });
const out = await r.json();
if (!r.ok) { console.error('import failed:', r.status, out.error); process.exit(1); }
console.log(apply ? 'IMPORTED' : 'DRY RUN — nothing written (add --apply)');
console.log('read      ', out.read);
console.log('new rows  ', out.imported, ' already there:', out.existing);
console.log('book stats', 'before', out.before, '→ after', out.after);
if (out.invalid.length) { console.log(`invalid (${out.invalid.length}):`); out.invalid.forEach((x) => console.log('  ', x.id, '—', x.error)); }
console.log('Compare "after" with the cover of the book in the Harbour Hop app (photos / quotes / firsts / places). Keep the source data until they match.');
