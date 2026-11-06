#!/usr/bin/env node
// Many families, one book each on its own Railway service: the owner's view across all of them.
//   node scripts/fleet.mjs check  [--registry=families.json]   health (/healthz?full=1), the live mbs-vN against main's, login wall
//   node scripts/fleet.mjs backup [--registry=families.json] [--out=backups]   one backup.zip per family that has a backup token
// The registry is a JSON file that lives on the owner's computer, never in the repo (.gitignore: families*.json):
//   [{ "name": "smith", "url": "https://smith.up.railway.app", "token": "<BACKUP_TOKEN of that service, optional>" }, …]
// scripts/provision.mjs appends a line to it for every family it creates. Nothing here writes to a family's site.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flags = Object.fromEntries(argv.filter((a) => a.startsWith('--')).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return [m[1], m[2] === undefined ? true : m[2]]; }));
const cmd = argv.find((a) => !a.startsWith('--'));
const REG = path.resolve(flags.registry || process.env.FAMILIES_FILE || 'families.json');
if (!['check', 'backup'].includes(cmd)) { console.error('usage: fleet.mjs check|backup [--registry=families.json] [--out=backups]'); process.exit(1); }
if (!fs.existsSync(REG)) { console.error(`no registry at ${REG} — see the header of this script`); process.exit(1); }
const fams = JSON.parse(fs.readFileSync(REG, 'utf8')).filter((f) => f && f.name && f.url);
const want = (fs.readFileSync(path.join(root, 'public/sw.js'), 'utf8').match(/mbs-v\d+/) || ['?'])[0];
const get = async (url, opt = {}) => { try { return await fetch(url, { signal: AbortSignal.timeout(20000), ...opt }); } catch (e) { return { status: 0, text: async () => '', arrayBuffer: async () => new ArrayBuffer(0), err: e.message }; } };
let bad = 0;

if (cmd === 'check') {
  console.log(`main ships ${want} · ${fams.length} famil${fams.length === 1 ? 'y' : 'ies'}`);
  for (const f of fams) {
    const b = f.url.replace(/\/+$/, '');
    const [h, s, a] = await Promise.all([get(`${b}/healthz?full=1`), get(`${b}/sw.js`), get(`${b}/api/b/state`)]);
    const live = ((await s.text()).match(/mbs-v\d+/) || ['?'])[0];
    const ok = h.status === 200 && s.status === 200 && a.status === 401 && live === want;
    if (!ok) bad++;
    console.log(`${ok ? '✅' : '❌'} ${f.name.padEnd(14)} health ${h.status} · app ${s.status} ${live}${live !== want ? ' (behind)' : ''} · login wall ${a.status === 401 ? 'ok' : a.status}${h.err ? ` · ${h.err}` : ''}`);
  }
  process.exit(bad ? 1 : 0);
}

if (cmd === 'backup') {
  const out = path.resolve(flags.out || 'backups'); fs.mkdirSync(out, { recursive: true });
  const day = new Date().toISOString().slice(0, 10);
  for (const f of fams) {
    if (!f.token) { console.log(`⏭️  ${f.name}: no backup token in the registry`); continue; }
    const r = await get(`${f.url.replace(/\/+$/, '')}/api/backup.zip`, { headers: { authorization: `Bearer ${f.token.trim()}` } });
    if (r.status !== 200) { bad++; console.log(`❌ ${f.name}: ${r.status}${r.err ? ' ' + r.err : ''}`); continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    const file = path.join(out, `${f.name}-${day}.zip`); fs.writeFileSync(file, buf);
    console.log(`✅ ${f.name}: ${(buf.length / 1048576).toFixed(1)} MB → ${file}`);
  }
  process.exit(bad ? 1 : 0);
}
