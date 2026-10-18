// PIN login throttle: 10 wrong tries per device, 30 wrong tries in 10 min family-wide (the PIN may be short).
// Devices are simulated with X-Forwarded-For (trust proxy = 1: the last hop is trusted — on Railway that's its own proxy).
const { BASE, CODE } = process.env;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('pin login');
const login = (code, ip, name) => fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json', 'x-forwarded-for': ip }, body: JSON.stringify({ code, ...(name !== undefined ? { name } : {}) }) });

const r0 = await login(CODE, '10.0.0.1');
ok(r0.status === 200, 'correct PIN signs in, no name needed');
const me = await (await fetch(BASE + '/api/b/state', { headers: { cookie: r0.headers.get('set-cookie').split(';')[0] } })).json();
ok(me.me.name === 'Family' && me.me.role === 'editor', 'name defaults to "Family"');
ok(/Max-Age=34560000/.test(r0.headers.get('set-cookie')), 'session lasts 400 days — the PIN is rarely asked again');

// relatives' read-only PIN (VIEW_PIN): same pad, viewer session with their own name; writes refused
const rv = await login('835911', '10.0.0.9', 'คุณยาย');
const vck = rv.headers.get('set-cookie').split(';')[0], vme = await (await fetch(BASE + '/api/b/state', { headers: { cookie: vck } })).json();
ok(rv.status === 200 && (await rv.json()).role === 'viewer' && vme.me.role === 'viewer' && vme.me.name === 'คุณยาย', 'view-only PIN signs a relative in as viewer, with their name');
ok((await fetch(BASE + '/api/b/entries/v-pin-0001', { method: 'PUT', headers: { 'x-mb': '1', cookie: vck, 'content-type': 'application/json' }, body: JSON.stringify({ trip: 'hk-macau-2026', day: 0, kind: 'quote', child: 'mimi', text: 'x' }) })).status === 403, 'a view-only PIN session cannot write');
ok((await (await fetch(BASE + '/api/b/state', { headers: { cookie: (await login('835911', '10.0.0.10')).headers.get('set-cookie').split(';')[0] } })).json()).me.name === 'Guest', 'a relative who types no name shows as Guest');

let s = 0; for (let i = 0; i < 10; i++) s = (await login('000000', '10.0.0.2')).status;
ok(s === 401, '10 wrong PINs from one device → 401 each');
ok((await login(CODE, '10.0.0.2')).status === 429, '11th try from that device is blocked, even with the right PIN');
ok((await login(CODE, '10.0.0.3')).status === 200, 'another device is not affected by one device’s lock');

for (let i = 0; i < 20; i++) await login('111111', `10.1.0.${i}`);   // 10 + 20 = 30 wrong tries from 21 devices
ok((await login(CODE, '10.2.0.1')).status === 429, '30 wrong tries family-wide → new logins paused for everyone');
const still = await fetch(BASE + '/api/b/state', { headers: { cookie: r0.headers.get('set-cookie').split(';')[0] } });
ok(still.status === 200, 'phones already signed in keep working during the pause');

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
