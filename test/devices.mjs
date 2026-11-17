// The phones signed in and the family code (server/devices.js, server/auth.js, migration 0033): the parents see every phone, sign a lost
// one out at once, sign out every other phone (cookies older than the list too), and change the family code without signing anyone out.
import crypto from 'node:crypto';
const { BASE, CODE } = process.env;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('devices');
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const SAMSUNG = 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36';
const login = async (code, name, ua, ip) => { const r = await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json', 'user-agent': ua || 'test', 'x-forwarded-for': ip || '10.9.0.1' }, body: JSON.stringify({ code, name }) }); return { status: r.status, ck: r.ok ? r.headers.get('set-cookie').split(';')[0] : null }; };
const H = (ck) => ({ 'x-mb': '1', cookie: ck, 'content-type': 'application/json' });
const state = async (ck) => (await fetch(BASE + '/api/b/state?lite=1', { headers: { cookie: ck } })).status;
const list = async (ck) => (await (await fetch(BASE + '/api/b/devices', { headers: { cookie: ck } })).json());

const mum = await login(CODE, 'แม่', IPHONE, '10.9.0.2'), dad = await login(CODE, 'พ่อ', SAMSUNG, '10.9.0.3'), gran = await login('835911', 'ยาย', IPHONE, '10.9.0.4');
const l1 = await list(mum.ck), names = l1.list.map((x) => `${x.name}|${x.role}|${x.device}|${x.me}`);
ok(names.includes('แม่|editor|iphone safari|true') && names.includes('พ่อ|editor|android samsung|false') && names.includes('ยาย|viewer|iphone safari|false') && !JSON.stringify(l1).includes('Mozilla'),
  `devices: every phone signed in — who, parent or relative, the kind of phone in two words (never the browser string); this phone marked (${names.join(', ')})`);
ok((await fetch(BASE + '/api/b/devices', { headers: { cookie: gran.ck } })).status === 403, 'devices: a relative cannot see the list');
// a lost phone: signed out at once
const dadUid = l1.list.find((x) => x.name === 'พ่อ').uid;
const out = await fetch(`${BASE}/api/b/devices/${dadUid}/out`, { method: 'POST', headers: H(mum.ck) });
ok(out.ok && await state(dad.ck) === 401 && await state(mum.ck) === 200 && !(await list(mum.ck)).list.some((x) => x.uid === dadUid), 'devices: "sign out" — that phone is a stranger at once, the others carry on');
// the family code: the old one is needed; phones signed in stay; the new one signs in, the old one no longer
const bad = await fetch(BASE + '/api/b/family/code', { method: 'PUT', headers: H(mum.ck), body: JSON.stringify({ old: '000000', code: '445566' }) });
const taken = await fetch(BASE + '/api/b/family/code', { method: 'PUT', headers: H(mum.ck), body: JSON.stringify({ old: CODE, code: '835911' }) });
const chg = await fetch(BASE + '/api/b/family/code', { method: 'PUT', headers: H(mum.ck), body: JSON.stringify({ old: CODE, code: '445566' }) });
const brand = await (await fetch(BASE + '/api/brand')).json();
ok(bad.status === 403 && taken.status === 409 && chg.ok && await state(mum.ck) === 200 && await state(gran.ck) === 200 && (await login('445566', 'แม่ใหม่', IPHONE, '10.9.0.5')).status === 200 && (await login(CODE, 'x', IPHONE, '10.9.0.6')).status === 401 && brand.pin.lens.includes(6),
  `family code: the current code is asked, a relatives' code refused, phones signed in stay, the new code signs in and the old one no longer (${[bad.status, taken.status, chg.status].join(' ')})`);
// sign out every other phone — a cookie made before the list existed (no row of its own) stops too
const sign = (p) => crypto.createHmac('sha256', 'test-secret').update(p).digest('base64url');
const p0 = ['editor', Buffer.from('Old phone').toString('base64url'), 'abcdef012345', Math.floor(Date.now() / 1000) + 400 * 24 * 3600 - 60].join('.'), legacy = `mb=${p0}.${sign(p0)}`;
const before = await state(legacy);
const all = await (await fetch(BASE + '/api/b/devices/out-others', { method: 'POST', headers: H(mum.ck) })).json();
ok(before === 200 && all.out >= 2 && await state(legacy) === 401 && await state(gran.ck) === 401 && await state(mum.ck) === 200, `devices: "sign out every other phone" — the listed ones and an older cookie stop, this phone stays (${all.out} out)`);
// signing out from the phone itself takes its row off the list
const again = await login('445566', 'พ่อ', SAMSUNG, '10.9.0.7');
await fetch(BASE + '/api/logout', { method: 'POST', headers: { cookie: again.ck } });
ok(!(await list(mum.ck)).list.some((x) => x.name === 'พ่อ'), 'devices: a phone that signs itself out leaves the list');
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
