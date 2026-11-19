// Passkeys (server/passkey.js, migration 0037): a parent adds this phone on #/devices, then signs in with it — Face ID or a fingerprint,
// played here by Chromium's virtual authenticator — without the family code; the server keeps only the public key; removing it closes
// that way in. Its own group (no other suite changes the family code under it).
import { chromium } from 'playwright';
import fs from 'node:fs';
const { BASE, CODE } = process.env;
const exe = process.env.CHROME || (fs.existsSync(chromium.executablePath()) ? undefined : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('passkey');
const post = (u, b, h = {}) => fetch(BASE + u, { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json', ...h }, body: JSON.stringify(b || {}) });

// before any passkey: the sign-in page offers none, a sign-in asks for none, a stranger cannot add one
ok((await (await fetch(BASE + '/api/brand')).json()).passkey === false && (await post('/api/passkey/login/options')).status === 404
  && [401, 403].includes((await post('/api/passkey/register/options')).status), 'passkey: none yet — nothing offered, and adding one needs a parent signed in');

const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('WebAuthn.enable');
const { authenticatorId } = await cdp.send('WebAuthn.addVirtualAuthenticator', { options: { protocol: 'ctap2', transport: 'internal', hasResidentKey: true, hasUserVerification: true, isUserVerified: true, automaticPresenceSimulation: true } });
await page.goto(BASE + '/#/'); await page.waitForSelector('#lf');
await page.fill('#lname', 'แม่'); await page.fill('#lcode', CODE); await page.keyboard.press('Enter'); await page.waitForSelector('.shelf');
await page.goto(BASE + '/#/devices'); await page.waitForSelector('.pkcard [data-a="pkadd"]');
await page.click('.pkcard [data-a="pkadd"]');
await page.waitForFunction(() => document.querySelectorAll('.pkcard .pks li').length === 1, null, { timeout: 10000 }).catch(() => {});
const creds = (await cdp.send('WebAuthn.getCredentials', { authenticatorId })).credentials;
const shown = await page.evaluate(() => (document.querySelector('.pkcard .pks') || {}).textContent || '');
ok(creds.length === 1 && creds[0].isResidentCredential && /แม่/.test(shown), `passkey: a parent adds this phone — the phone holds the key, the list names who added it (${creds.length} · ${shown.replace(/\s+/g, ' ').slice(0, 80)})`);
ok((await (await fetch(BASE + '/api/brand')).json()).passkey === true, 'passkey: the sign-in page now offers it');

// sign out, then in again with the passkey — no code typed
await page.goto(BASE + '/#/'); await page.waitForSelector('.setout [data-a="logout"]');
await page.click('.setout [data-a="logout"]'); await page.click('.setout [data-a="logout"]');
await page.waitForSelector('#lf .pkbtn', { timeout: 10000 });
await page.click('#lf .pkbtn');
await page.waitForSelector('.shelf', { timeout: 10000 }).catch(() => {});
const me = await page.evaluate(async () => (await (await fetch('/api/b/state?lite=1', { credentials: 'same-origin' })).json()).me);
ok(me && me.role === 'editor' && (await page.locator('.shelf').count()) === 1, `passkey: the phone signs a parent in with the fingerprint or face alone (${JSON.stringify(me)})`);
const used = await page.evaluate(async () => (await (await fetch('/api/b/passkeys', { credentials: 'same-origin' })).json()).list);
ok(used.length === 1 && used[0].used && !JSON.stringify(used).includes('public'), 'passkey: the list says when it was last used, and never hands out a key');

// a made-up answer is refused; a second phone with no key cannot sign in
const bad = await post('/api/passkey/login', { response: { id: 'A'.repeat(43), rawId: 'A'.repeat(43), type: 'public-key', response: { clientDataJSON: 'e30', authenticatorData: 'AA', signature: 'AA' } } });
ok(bad.status === 401, 'passkey: a key the family never added is refused');

// removed: that way in is closed
await page.goto(BASE + '/#/devices'); await page.waitForSelector('.pkcard [data-a="pkdel"]');
await page.click('.pkcard [data-a="pkdel"]'); await page.click('.pkcard [data-a="pkdel"]');
await page.waitForFunction(() => !document.querySelector('.pkcard .pks li'), null, { timeout: 8000 }).catch(() => {});
ok((await (await fetch(BASE + '/api/brand')).json()).passkey === false && (await post('/api/passkey/login/options')).status === 404, 'passkey: removed — the sign-in page no longer offers it');
await browser.close();
console.log(failures ? `${failures} failed` : 'passkey: all passed');
process.exit(failures ? 1 : 0);
