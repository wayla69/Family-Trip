// The family profile: /api/brand before login (app name + drawings, never a child's name), PUT /api/b/family (profile, a third
// child with a look, order, a used child that cannot be removed), the recoloured drawings at /art/kids/<slug>[-outfit][-full].svg,
// the state's family block, the manifest's name, and the prompts naming this family's children.
import { createRequire } from 'node:module';
const BASE = process.env.BASE, CODE = process.env.CODE;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('family');
const jar = (r) => (r.headers.get('set-cookie') || '').split(';')[0];
const lg = await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'แม่' }) });
const ck = jar(lg), H = { 'x-mb': '1', cookie: ck, 'content-type': 'application/json' };
const state = async () => (await fetch(BASE + '/api/b/state', { headers: { cookie: ck } })).json();

// ---- before login: the brand, with no names
{
  const b = await (await fetch(BASE + '/api/brand')).json();
  ok(b.app.en === 'MM Memory' && b.kicker.th === 'ของมีมี่และมีก้า' && b.kicker.en === 'Mimi & Mika', `brand: the app name from the kids' initials and the kicker from their names (${b.app.en} · ${b.kicker.th})`);
  ok(JSON.stringify(b.kids) === JSON.stringify([{ slug: 'mimi', v: '' }, { slug: 'mika', v: '' }]) && !JSON.stringify(b).includes('name_'), 'brand: the drawings by slug only, no names, no birth months');
  const m = await (await fetch(BASE + '/manifest.webmanifest')).json();
  ok(m.name === 'MM Memory' && m.short_name === 'MM Memory' && m.icons.length === 3, 'the manifest carries the app name');
}
// ---- the state
{
  const s = await state();
  ok(s.family && s.family.app.th === 'MM Memory' && s.children.length === 2 && s.children[0].look === null && s.children[0].v === '', 'state: the family block, the children with their (empty) look');
  ok((await fetch(BASE + '/art/kids/mimi.svg')).headers.get('content-type').includes('svg') && (await (await fetch(BASE + '/art/kids/mimi.svg')).text()).includes('kmimi'), 'Mimi with no look is the static drawing');
  ok((await fetch(BASE + '/art/kids/nobody.svg')).status === 200 && (await (await fetch(BASE + '/art/kids/nobody.svg')).text()).includes('<!doctype html'), 'an unknown kid falls through to the app shell like any other path');
}
// ---- an entry for Mimi, so she cannot be removed later
const T = (await state()).trips[0].id;
await fetch(BASE + `/api/b/entries/${T}.mood.d0.mimi`, { method: 'PUT', headers: H, body: JSON.stringify({ trip: T, day: 0, kind: 'mood', child: 'mimi', mood: '😄' }) });
// ---- save a profile: a name, a third child with a look, Mika's look, a new order
const kids = [
  { slug: 'mika', name_th: 'มีก้า', name_en: 'Mika', emoji: '👶', birth_ym: '2025-05', look: { base: 'boy', skin: 'warm', hair: 'brown', top: 'blue' } },
  { slug: 'mimi', name_th: 'มีมี่', name_en: 'Mimi', emoji: '👧', birth_ym: '2023-11' },
  { name_th: 'นอรา', name_en: 'Nora Jane', emoji: '🧒', birth_ym: '2021-02', look: { base: 'girl', skin: 'tan', hair: 'blonde', top: 'purple', bogus: 1 } },
];
{
  const r = await fetch(BASE + '/api/b/family', { method: 'PUT', headers: H, body: JSON.stringify({ profile: { app: { th: 'บ้านเรา', en: 'Our House' }, kicker: { th: '', en: '' } }, children: kids }) });
  const j = await r.json();
  ok(r.ok && j.children.map((k) => k.slug).join() === 'mika,mimi,nora-jane' && j.family.app.en === 'Our House' && j.family.kicker.th === 'ของมีก้า มีมี่และนอรา', `PUT family: the order, the new child's slug from her English name, the kicker rebuilt from the names (${j.family.kicker.th})`);
  ok(j.children[2].look && j.children[2].look.base === 'girl' && j.children[2].look.bogus === undefined && j.children[2].v.length === 8 && j.children[0].v.length === 8 && j.children[1].v === '', 'looks are cleaned to the palette and versioned; Mimi keeps the original drawing');
  const s = await state();
  ok(s.family.app.en === 'Our House' && s.children.length === 3 && s.children[0].slug === 'mika' && s.children[0].color === '#2F8BFF' && s.children[2].birth_ym === '2021-02', 'state: the profile and the children as saved, the colour from the top');
  const b = await (await fetch(BASE + '/api/brand')).json();
  ok(b.app.th === 'บ้านเรา' && b.kids.length === 3 && b.kids[2].slug === 'nora-jane' && (await (await fetch(BASE + '/manifest.webmanifest')).json()).name === 'Our House', 'brand and manifest follow the profile');
}
// ---- the drawings
{
  const svg = await (await fetch(BASE + '/art/kids/nora-jane.svg')).text();
  ok(svg.startsWith('<svg') && svg.includes('#8E5BE0') && svg.includes('#D9B55A') && svg.includes('#D9A776') && !svg.includes('#E53935') && !svg.includes('#2E211B') && !svg.includes('kmimi') && svg.includes('knorajane'), 'Nora: the girl drawing in purple, blonde, tan — no red, no dark hair, her own clip id');
  const full = await (await fetch(BASE + '/art/kids/nora-jane-full.svg')).text(), adv = await (await fetch(BASE + '/art/kids/nora-jane-adventure.svg')).text();
  ok(full.includes('#8E5BE0') && full.length > svg.length && adv.includes('#D2BA82') && adv.includes('#D9B55A') && !adv.includes('#8E5BE0'), 'the full figure is recoloured too; the adventure outfit keeps its clothes but takes her hair');
  const mika = await (await fetch(BASE + '/art/kids/mika.svg')).text();
  ok(mika.includes('#2F8BFF') && mika.includes('#6B4423') && !mika.includes('#A8D5C2') && !mika.includes('#3B2A22'), 'Mika with a look: the toddler drawing in blue with brown hair');
  const hdr = await fetch(BASE + '/art/kids/mika-full.svg?v=abc');
  ok(hdr.headers.get('cache-control').includes('max-age=604800') && hdr.headers.get('content-type').includes('svg'), 'a drawing is cacheable for a week (the app versions the url)');
  const prev = await fetch(BASE + '/art/kids/x-full.svg?look=' + encodeURIComponent(JSON.stringify({ base: 'boy', top: 'orange' })), { headers: { cookie: ck } });
  ok(prev.ok && (await prev.text()).includes('#FF8A3D') && prev.headers.get('cache-control') === 'no-store', 'an editor previews an unsaved look');
  ok((await fetch(BASE + '/art/kids/x-full.svg?look=' + encodeURIComponent('{"top":"orange"}'))).headers.get('content-type').includes('html'), 'a preview without a login is not rendered');
}
// ---- the prompts name this family's children
{
  const S = createRequire(import.meta.url)('../server/story.js'), F = createRequire(import.meta.url)('../server/family.js');
  const k = F.kidsFor([{ name_en: 'Nora Jane', name_th: 'นอรา', birth_ym: '2021-02' }, { name_en: 'Mika', name_th: 'มีก้า', birth_ym: '2025-05' }], new Date('2026-12-05T00:00:00Z'));
  const story = S.prompt({ lang: 'en', mode: 'story', kids: k }), th = S.prompt({ lang: 'th', mode: 'letter', kids: k });
  ok(story.includes('starring Nora Jane (5½) and Mika (1½)') && th.includes('ถึงนอราและมีก้า') && !/Mimi|มีมี่/.test(story + th), 'the story and letter prompts name the family, with ages at the trip');
  ok(S.prompt({ lang: 'th', mode: 'talk' }).includes('ถามเด็กๆ') && S.askPrompt('en', k).includes('Nora Jane (5½) and Mika (1½)'), 'a prompt with no children named stays neutral; the guide knows the children');
}
// ---- a child with memories cannot be removed; bad input
{
  const r = await fetch(BASE + '/api/b/family', { method: 'PUT', headers: H, body: JSON.stringify({ profile: {}, children: kids.slice(0, 1) }) });
  ok(r.status === 409 && (await r.json()).slug === 'mimi' && (await state()).children.length === 3, 'removing Mimi (she has a mood recorded) is refused and nothing changes');
  const r2 = await fetch(BASE + '/api/b/family', { method: 'PUT', headers: H, body: JSON.stringify({ profile: {}, children: [...kids, { name_en: 'Nora Jane' }] }) });
  ok(r2.status === 400, 'two children with the same slug are refused');
  const r3 = await fetch(BASE + '/api/b/family', { method: 'PUT', headers: H, body: JSON.stringify({ profile: {}, children: kids.map((k, i) => (i === 1 ? { ...k, birth_ym: '' } : k)) }) });
  ok(r3.status === 400 && (await r3.json()).error === 'birth', 'every child needs a month and year of birth');
  const vck = jar(await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: process.env.VIEW_PIN || '835911', name: 'ยาย' }) }));
  ok((await fetch(BASE + '/api/b/family', { method: 'PUT', headers: { ...H, cookie: vck }, body: '{}' })).status === 403, 'a viewer cannot change the family');
}
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
