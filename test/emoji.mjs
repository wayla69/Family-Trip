// The family's emoji library (table emoji, server/emoji.js): the bundled set seeded once, in the state with its pictures;
// parents add their own (a picture shrunk to 160 px PNG, the emoji it stands for, a name) and delete any; relatives may only
// look; a deleted bundled one stays deleted until "bring back the original set"; the family's own pictures go in the backup.
import { createRequire } from 'node:module';
import yauzl from 'yauzl';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const BASE = process.env.BASE, CODE = process.env.CODE;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('emoji');
const jar = (r) => (r.headers.get('set-cookie') || '').split(';')[0];
const ck = jar(await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'แม่' }) }));
const vck = (await fetch(BASE + '/v/grandma', { redirect: 'manual' })).headers.get('set-cookie').split(';')[0];
const state = async (c = ck) => (await fetch(BASE + '/api/b/state', { headers: { cookie: c } })).json();
const put = (id, qs, body, c = ck) => fetch(`${BASE}/api/b/emoji/${id}?${new URLSearchParams(qs)}`, { method: 'PUT', headers: { 'x-mb': '1', cookie: c, 'content-type': 'image/png' }, body });
const del = (id, c = ck) => fetch(`${BASE}/api/b/emoji/${id}`, { method: 'DELETE', headers: { 'x-mb': '1', cookie: c } });
const png = await sharp({ create: { width: 600, height: 400, channels: 4, background: { r: 200, g: 120, b: 40, alpha: 1 } } }).png().toBuffer();

// ---- the bundled set, seeded once, every picture there
let s = await state();
ok(Array.isArray(s.emoji) && s.emoji.length === 71 && s.emoji.every((e) => e.ch && e.th && e.en && /^\/art\/emoji\/[a-z-]+\.webp$/.test(e.src)), 'state: the 71 bundled emoji, each with its emoji, Thai and English name and picture');
ok((await Promise.all(s.emoji.map((e) => fetch(BASE + e.src).then((r) => r.ok)))).every(Boolean), 'every bundled picture is served');
ok((await state(vck)).emoji.length === 71, 'relatives see the library too (it draws their hearts)');

// ---- relatives may not change it; bad input is refused
ok((await put('my-kanga', { ch: '🦘', th: 'จิงโจ้', en: 'Kangaroo' }, png, vck)).status === 403, 'a relative cannot add an emoji');
ok((await del('heart', vck)).status === 403, 'a relative cannot delete one');
ok((await put('my-kanga', { ch: '🦘', th: 'จิงโจ้', en: 'Kangaroo' }, Buffer.alloc(0))).status === 400, 'a new emoji needs a picture');
ok((await put('my-kanga', { ch: 'abc', th: 'x', en: 'x' }, png)).status === 400, 'letters are not an emoji');
ok((await put('my-kanga', { ch: '🦘', th: '', en: '' }, png)).status === 400, 'an emoji needs a name');
ok((await put('my-kanga', { ch: '🦘', th: 'จิงโจ้', en: 'Kangaroo' }, Buffer.from('not a picture'))).status === 400, 'a file that is not a picture is refused');
ok((await put('my-heart', { ch: '💗', th: 'หัวใจ', en: 'Heart' }, png)).status === 409, 'an emoji that already has a picture is refused (409)');
ok((await put('My Bad', { ch: '🦘', th: 'x', en: 'x' }, png)).status === 404 || (await put('x', { ch: '🦘', th: 'x', en: 'x' }, png)).status === 400, 'a bad id is refused');

// ---- the parents add their own
const r = await put('my-kanga', { ch: '🦘', th: 'จิงโจ้', en: 'Kangaroo' }, png);
const added = r.status === 200 ? await r.json() : {};
ok(r.status === 200 && added.ch === '🦘' && /^\/media\/emoji\/my-kanga\.png\?v=\d+$/.test(added.src), 'added: the answer names its picture url');
const pic = await fetch(BASE + added.src, { headers: { cookie: ck } });
const meta = pic.ok ? await sharp(Buffer.from(await pic.arrayBuffer())).metadata() : {};
ok(pic.ok && meta.format === 'png' && meta.width === 160 && meta.height === 160, 'the picture is a 160 px PNG');
ok((await fetch(BASE + added.src)).status === 401, 'the picture is not public');
ok((await fetch(BASE + added.src, { headers: { cookie: vck } })).ok, 'relatives can see it');
s = await state();
ok(s.emoji.length === 72 && s.emoji[71].id === 'my-kanga' && s.emoji[71].th === 'จิงโจ้', 'state: the new one comes last');
ok((await put('my-kanga', { ch: '🦘', th: 'จิงโจ้น้อย', en: 'Joey' }, Buffer.alloc(0))).status === 200 && (await state()).emoji.find((e) => e.id === 'my-kanga').en === 'Joey', 'renaming keeps the picture');

// ---- in the backup, with its picture
{
  const zip = Buffer.from(await (await fetch(BASE + '/api/export.zip', { headers: { cookie: ck } })).arrayBuffer());
  const names = await new Promise((res, rej) => yauzl.fromBuffer(zip, { lazyEntries: true }, (e, z) => { if (e) return rej(e); const n = []; z.on('entry', (x) => { n.push(x.fileName); z.readEntry(); }); z.on('end', () => res(n)); z.readEntry(); }));
  ok(names.includes('emoji/my-kanga.png') && !names.some((n) => n.startsWith('emoji/heart')), 'backup: the family\'s own picture is in the zip (the bundled ones come with the app)');
}

// ---- delete: a bundled one stays deleted until the original set is brought back; the family's own takes its picture with it
ok((await del('heart')).status === 200 && !(await state()).emoji.some((e) => e.id === 'heart'), 'a bundled one can be deleted');
const back = await (await fetch(BASE + '/api/b/emoji/defaults', { method: 'POST', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'application/json' }, body: '{}' })).json();
ok(back.added === 1 && (await state()).emoji.some((e) => e.id === 'heart'), '"bring back the original set" puts back only what is missing');
ok((await del('my-kanga')).status === 200 && !(await state()).emoji.some((e) => e.id === 'my-kanga'), 'the family\'s own can be deleted');
ok((await fetch(BASE + added.src, { headers: { cookie: ck } })).status === 404, '… and its picture goes with it');

// ---- the later packs reach a family seeded before them; a picture the parents deleted stays deleted
{
  const { Pool } = require('pg'); const EMOJI = require('../server/emoji.js');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const fam = (await pool.query('SELECT id FROM families LIMIT 1')).rows[0].id;
  const second = EMOJI.DEFAULTS.slice(24).map((d) => d[0]);
  // as on a server seeded before the second pack: only the first 24, no 'emoji_offered' yet — the later packs (10 + 37) come on the next boot
  await pool.query('DELETE FROM emoji WHERE family_id=$1 AND id = ANY($2)', [fam, second]);
  await pool.query("DELETE FROM settings WHERE key='emoji_offered'");
  const added = await EMOJI.seed(pool, fam);
  const ids = (await pool.query('SELECT id FROM emoji WHERE family_id=$1', [fam])).rows.map((r) => r.id);
  ok(added === 47 && second.every((id) => ids.includes(id)), 'a family seeded before the later packs gets their 47 on the next boot');
  await pool.query("DELETE FROM emoji WHERE family_id=$1 AND id='yummy'", [fam]);
  ok(await EMOJI.seed(pool, fam) === 0 && !(await pool.query("SELECT 1 FROM emoji WHERE family_id=$1 AND id='yummy'", [fam])).rowCount, 'a bundled picture the parents deleted is not put back by the next boot');
  ok((await state()).emoji.some((e) => e.ch === '😋') === false && (await state()).emoji.some((e) => e.ch === '🤩' && e.src === '/art/emoji/excited.webp'), 'the state follows: 🤩 drawn by the new picture, 😋 gone after its delete');
  // the stock library's country pack (docs/STOCK-ART.md §5.8): no Japan book → no Japan pictures; the Tokyo sample brings them,
  // an emoji the family already draws keeps its picture, a deleted one stays deleted
  const H = { 'x-mb': '1', cookie: ck, 'content-type': 'application/json' };
  ok(!(await state()).emoji.some((e) => /^\/stock\//.test(e.src)), 'no Japan book yet → no stock pictures in the library');
  ok((await fetch(BASE + '/api/b/sample', { method: 'POST', headers: H, body: '{}' })).status === 200, 'the Tokyo sample book is made');
  let st = await state();
  const sushi = st.emoji.find((e) => e.ch === '🍣'), tower = st.emoji.find((e) => e.ch === '🗼');
  ok(sushi && /^\/stock\/jp\/food-sushi\.v\d+\.svg$/.test(sushi.src) && tower && /^\/stock\/jp\/tokyo\//.test(tower.src) && sushi.th === 'ซูชิ'
    && st.emoji.find((e) => e.ch === '🚕').src === '/art/emoji/taxi.webp', 'a Japan book brings the Japan pack (sushi, Tokyo Tower…) — the family\'s own taxi keeps its picture');
  ok((await fetch(BASE + sushi.src)).ok, 'a pack picture is served');
  await del(sushi.id);
  await fetch(BASE + '/api/b/trips/sakura-hop-2028', { method: 'DELETE', headers: { 'x-mb': '1', cookie: ck } });
  await fetch(BASE + '/api/b/sample', { method: 'POST', headers: H, body: '{}' });
  await EMOJI.seed(pool, fam);
  st = await state();
  ok(!st.emoji.some((e) => e.ch === '🍣') && st.emoji.some((e) => e.ch === '🗼'), 'a pack picture the parents deleted stays deleted (a new Japan book or a reboot does not bring it back)');
  await fetch(BASE + '/api/b/trips/sakura-hop-2028', { method: 'DELETE', headers: { 'x-mb': '1', cookie: ck } });
  await pool.end();
}

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
