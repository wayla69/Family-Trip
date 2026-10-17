// Production verification (HANDOFF task 3) against a running deploy. Uploads one test memory + photo and deletes it again.
//   BASE=https://<domain> CODE=<FAMILY_CODE> VIEW_TOKEN=<token> node test/verify-prod.mjs
// THROTTLE=1 also sends 11 wrong codes to prove the 429 throttle — this locks out YOUR IP for 10 minutes, so run it last / from another network.
import sharp from 'sharp';
import crypto from 'node:crypto';

const BASE = (process.env.BASE || 'http://localhost:3000').replace(/\/$/, '');
const CODE = process.env.CODE || '';
const VIEW = process.env.VIEW_TOKEN || '';
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
const login = (code) => fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code, name: 'verify' }) });

ok((await (await fetch(BASE + '/healthz')).text()) === 'ok', '/healthz ok');
ok((await fetch(BASE + '/api/b/state')).status === 401, 'state needs login (401)');
ok((await login('definitely-wrong-' + crypto.randomBytes(4).toString('hex'))).status === 401, 'wrong code → 401');

const r = await login(CODE);
ok(r.status === 200, 'login with family code');
const setc = r.headers.get('set-cookie') || '';
ok(/HttpOnly/i.test(setc) && /SameSite=Lax/i.test(setc), 'cookie HttpOnly + SameSite');
if (BASE.startsWith('https://')) ok(/Secure/i.test(setc), 'cookie Secure on https');
const ck = setc.split(';')[0];
const H = { 'x-mb': '1', cookie: ck };

// ≥5 MB JPEG with GPS/EXIF → stored copy must have none
const pid = 'ph-verify-' + crypto.randomBytes(4).toString('hex'), TRIP = 'hk-macau-2026';
const noise = crypto.randomBytes(4000 * 3000 * 3);
const big = await sharp(noise, { raw: { width: 4000, height: 3000, channels: 3 } })
  .withExif({ IFD0: { Make: 'VerifyCam', Model: 'GPS-Test' }, IFD3: { GPSLatitudeRef: 'N', GPSLatitude: '22/1 18/1 0/1', GPSLongitudeRef: 'E', GPSLongitude: '114/1 10/1 0/1' } })
  .jpeg({ quality: 92 }).toBuffer();
ok(big.length >= 5e6 && (await sharp(big).metadata()).exif, `test JPEG ${(big.length / 1e6).toFixed(1)} MB with EXIF/GPS`);
const up = await fetch(`${BASE}/api/b/media/${pid}?trip=${TRIP}&day=0`, { method: 'PUT', headers: { ...H, 'content-type': 'image/jpeg' }, body: big });
ok(up.status === 200, 'upload ≥5 MB JPEG (' + up.status + ')');
const full = Buffer.from(await (await fetch(`${BASE}/media/${pid}`, { headers: { cookie: ck } })).arrayBuffer());
const thumb = Buffer.from(await (await fetch(`${BASE}/media/${pid}/t`, { headers: { cookie: ck } })).arrayBuffer());
const fm = await sharp(full).metadata(), tm = await sharp(thumb).metadata();
ok(fm.width === 2560 && tm.width === 520, `full ${fm.width}px + thumb ${tm.width}px served`);
ok(!fm.exif && !tm.exif && !full.includes('GPS-Test') && !full.includes('VerifyCam'), 'no EXIF/GPS in stored full + thumb');
ok((await fetch(`${BASE}/media/${pid}`)).status === 401, 'image needs login');

// export zip contains the photo
const zip = Buffer.from(await (await fetch(BASE + '/api/export.zip', { headers: { cookie: ck } })).arrayBuffer());
ok(zip.subarray(0, 2).toString() === 'PK' && zip.includes('backup.json') && zip.includes(`photos/${pid}.jpg`), `export.zip has data + photo (${(zip.length / 1e6).toFixed(1)} MB)`);

// viewer link: read-only
if (VIEW) {
  const v = await fetch(BASE + '/v/' + VIEW, { redirect: 'manual' });
  const vck = (v.headers.get('set-cookie') || '').split(';')[0];
  ok(v.status === 302 && vck, 'viewer link gives a session');
  ok((await fetch(BASE + '/api/b/state', { headers: { cookie: vck } })).status === 200, 'viewer can read');
  ok((await fetch(BASE + '/api/b/entries/q-verify-0001', { method: 'PUT', headers: { 'x-mb': '1', cookie: vck, 'content-type': 'application/json' }, body: JSON.stringify({ trip: TRIP, day: 0, kind: 'quote', child: 'mimi', text: 'x' }) })).status === 403, 'viewer write → 403');
  ok((await fetch(BASE + '/v/wrong-' + crypto.randomBytes(4).toString('hex'))).status === 404, 'wrong viewer token → 404');
}

// clean up the test photo (row + stored files)
ok((await fetch(BASE + '/api/b/media/' + pid, { method: 'DELETE', headers: H })).status === 200 && (await fetch(`${BASE}/media/${pid}`, { headers: { cookie: ck } })).status === 404, 'test photo removed');

if (process.env.THROTTLE === '1') {
  let last = 0;
  for (let i = 0; i < 11; i++) last = (await login('wrong-' + i)).status;
  ok(last === 429, 'throttled after 10 wrong codes (429)');
}
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
