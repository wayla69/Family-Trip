#!/usr/bin/env node
// Scaffold a new book (seed) from the owner's Trip Operations Manual — docs/NEW-BOOK.md, format 2.
//   npm run new-book -- --slug=japan-2028 --from=2028-03-10 --to=2028-03-20 --tz=Asia/Tokyo \
//     --title-th="The Sakura Hop · ญี่ปุ่น" --title-en="The Sakura Hop · Japan" --kicker="THE SAKURA HOP · EXPEDITION …" \
//     --accent=#1F3A5F --flag=🇯🇵 --place-th=ญี่ปุ่น --place-en=Japan [--kids=mimi,mika] [--force]
// Writes server/seeds/<slug>.json with every section present (TODO markers where the manual's content goes) and prints a checklist.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true]; }));
const need = (k) => { if (!args[k]) { console.error(`missing --${k}`); process.exit(1); } return args[k]; };
const slug = need('slug'), from = need('from'), to = need('to');
if (!/^[a-z0-9-]{2,60}$/.test(slug)) { console.error('slug: a-z 0-9 - only'); process.exit(1); }
const d0 = new Date(from + 'T00:00:00Z'), d1 = new Date(to + 'T00:00:00Z');
if (isNaN(d0) || isNaN(d1) || d1 < d0 || (d1 - d0) / 864e5 > 60) { console.error('dates: YYYY-MM-DD, end after start, 60 days max'); process.exit(1); }
const out = path.join(root, 'server', 'seeds', `${slug}.json`);
if (fs.existsSync(out) && !args.force) { console.error(`${out} exists — pass --force to overwrite`); process.exit(1); }

const kids = String(args.kids || 'mimi,mika').split(',').map((s) => s.trim()).filter(Boolean);
const KID = { mimi: { name_th: 'มีมี่', name_en: 'Mimi', emoji: '👧', birth: '2023-05' }, mika: { name_th: 'มีก้า', name_en: 'Mika', emoji: '👶', birth: '2025-03' } };
const ageAt = (ym) => { if (!ym) return null; const [y, m] = ym.split('-').map(Number); const months = (d0.getUTCFullYear() - y) * 12 + (d0.getUTCMonth() + 1 - m); const yrs = Math.floor(months / 12), half = months % 12 >= 6; return { th: `${yrs}${half ? ' ขวบครึ่ง' : ' ขวบ'}`, en: `${yrs}${half ? '½' : ''}` }; };
const i18n = (th, en) => ({ th, en });
const TODO = (what) => i18n(`TODO ${what}`, `TODO ${what}`);
const days = [];
for (let i = 0, d = new Date(d0); d <= d1; i++, d = new Date(d.getTime() + 864e5)) {
  days.push({
    index: i, date: d.toISOString().slice(0, 10), emoji: '📍', gradient: [args.accent || '#1F3A5F', '#D9E2EC'],
    title: TODO(`day ${i + 1} title`), sleep: TODO('where we sleep (or Home)'),
    planned: [{ key: `TODO-stop-${i + 1}`, kind: 'place', en: 'TODO stop', th: 'TODO จุดแวะ' }, { key: `TODO-meal-${i + 1}`, kind: 'food', en: 'TODO meal', th: 'TODO มื้ออาหาร', meal: 'Lunch' }],
    wx: TODO('weather line'),
    moving: TODO('how we move today'), pick: TODO('local pick'), planB: TODO('plan B'), money: TODO('money today — prices only'),
    plan: [{ t: '09:00', th: 'TODO', en: 'TODO' }], tips: [],
    stay: { name: 'TODO stay', addr: 'TODO public address', q: 'TODO maps query' }, route: '', eat: [], learn: [], quiz: [],
  });
}
const seed = {
  format: 2,
  slug, status: 'upcoming',
  title: i18n(args['title-th'] || `TODO · ${slug}`, args['title-en'] || `TODO · ${slug}`),
  sub: i18n('TODO บรรทัดรอง', 'TODO subtitle'),
  date_from: from, date_to: to, timezone: args.tz || 'Asia/Bangkok',
  destinations: [args['place-en'] || 'TODO'],
  children: kids.map((k) => ({ slug: k, name_th: (KID[k] || {}).name_th || k, name_en: (KID[k] || {}).name_en || k, emoji: (KID[k] || {}).emoji || '🧒', age_at_trip: ageAt((KID[k] || {}).birth) || TODO('age') })),
  theme: { kicker: args.kicker || 'TODO KICKER', badge: '📖', accent: args.accent || '#1F3A5F', accent2: '#C8402B', ink: '#1F2A3A', muted: '#6D7480', panel: '#F7F2EA', rule: '#E8EBEA', pick: '#FBEDE9', info: '#EAF0F7', calm: '#E8F4F0', warn: '#FBF0E4', accentDark: '#8FB0E0', display: 'sans', art: `/art/${slug}/day-{n}.svg`, places: [{ flag: args.flag || '🏳️', th: args['place-th'] || 'TODO', en: args['place-en'] || 'TODO' }] },
  days,
  firsts_catalog: [{ key: 'plane', emoji: '✈️', label: i18n('ขึ้นเครื่องบิน', 'Flew on a plane') }],
  moods: ['😄', '🥰', '🤩', '😋', '😴', '😢'],
  stamp: { text: ['TODO', 'TODO', String(d0.getUTCFullYear())] },
  cover: { emoji: '📖' },
  notes: 'Seed only: no booking numbers, passports, confirmations or real costs (keep them out of the bookshelf).',
  info: {
    emergency: [{ label: TODO('all emergencies'), tel: 'TODO', main: true }], lost: TODO('if a child is lost'),
    stays: [{ base: TODO('area'), prop: TODO('property'), ci: TODO('check-in'), co: TODO('check-out'), n: 1, why: TODO('why we chose it'), addr: 'TODO public address', q: 'TODO maps query' }],
    guide: [{ title: TODO('key fact'), sub: TODO('short line'), text: TODO('why it shapes the plan') }],
    prices: { head: TODO('entry prices'), cols: [i18n('รายการ', 'Item'), i18n('ผู้ใหญ่', 'Adult'), i18n('เด็ก', 'Children'), i18n('เกณฑ์ฟรี', 'Free cut-off'), i18n('หมายเหตุ', 'Note')], rows: [] },
    pack: [{ group: i18n('ของมีมี่และมีก้า', 'Mimi and Mika'), items: [TODO('item')] }],
    general: [], wild: [],
  },
  passport: {
    code: `TODO-${d0.getUTCFullYear()}-{KID}`,
    guides: [{ key: 'guide1', art: '/art/guides/TODO1.svg', name: TODO('guide 1'), hello: TODO('hello from guide 1, use {name}') }, { key: 'guide2', art: '/art/guides/TODO2.svg', name: TODO('guide 2'), hello: TODO('hello from guide 2') }],
    greeting: i18n('สวัสดี {name}!', 'Hello, {name}!'),
    days: days.map((d, i) => ({ title: TODO(`mission title day ${i + 1}`), stamp: 'TODO', facts: [TODO('fact')], spot: [{ k: 'spot1', e: '🔍', th: 'TODO', en: 'TODO' }], acc: args.accent || '#1F3A5F', tint: '#F3F6FA' })),
    lists: [
      { key: 'words', e: '🗣️', said: true, title: TODO('say it like a local'), sub: TODO('sub'), groups: [{ items: [{ k: 'hello', e: '👋', th: 'TODO', en: 'TODO', note: TODO('meaning'), speak: { text: 'TODO', lang: 'en-GB' } }] }] },
      { key: 'food', e: '🍽️', yum: true, title: TODO('tasting card'), sub: TODO('sub'), groups: [{ items: [{ k: 'dish1', e: '🍜', th: 'TODO', en: 'TODO' }] }] },
      { key: 'master', e: '🧭', title: TODO('Master Explorer'), sub: TODO('sub'), goal: 10, goalText: TODO('goal text'), certificate: true, groups: [{ title: i18n('เจอแล้ว', 'Spotted'), e: '👀', items: [{ k: 'm1', e: '⭐', th: 'TODO', en: 'TODO' }] }] },
    ],
    certificate: { title: TODO('certificate title'), text: TODO('certificate text'), bye: TODO('goodbye line') },
    style: { crest: '/art/crest/TODO.svg', ink: args.accent || '#1F3A5F', hi: '#E05A7A', bgA: '#FBF1DA', bgB: '#E3EEF9', gold: '#E9D9A0', title: 'Adventure Passport', hl: 'Passport', sub: TODO('cover line, use {name}'), places: TODO('places line') },
    pins: { title: i18n('เราไปไหนบ้าง', 'Where we go'), sub: TODO('sub'), items: [{ e: '📍', th: 'TODO', en: 'TODO', days: i18n('วันที่ 1', 'Day 1') }] },
    colour: `/art/${slug}/day-{n}.svg`,
    countdown: { doors: Array.from({ length: 14 }, (_, n) => ({ e: '🎁', th: `TODO ประตู ${n + 1}`, en: `TODO door ${n + 1}` })), pack: { title: i18n('ช่วยจัดกระเป๋าหน่อย! ใส่อะไรแล้วแตะเลย', 'Help me pack! Tap each thing you put in'), items: [{ k: 'toy', e: '🧸', th: 'ตุ๊กตาตัวโปรด', en: 'My cuddly toy' }] } },
    map: { title: i18n('แผนที่การผจญภัย', 'Our adventure map'), sea: TODO('sea / ocean name'), stops: [{ k: 'start', e: '✈️', th: 'TODO', en: 'TODO', x: 20, y: 50 }], days: days.map(() => ['start']) },
  },
};
fs.writeFileSync(out, JSON.stringify(seed, null, 1) + '\n');
console.log(`wrote ${path.relative(root, out)} — ${days.length} days, format 2\n`);
console.log(`checklist:
  [ ] fill every TODO from the manual (docs/NEW-BOOK.md §2) — no bookings, PNRs, confirmations, costs, passport data
  [ ] day art: public/art/${slug}/day-1..${days.length}.svg (+ colouring pages, guides, crest) and add each to ART in public/sw.js, bump mbs-vN
  [ ] planned[].key are check-in keys: never rename after the trip starts
  [ ] test/bookshelf.mjs: extend the privacy regex with this trip's booking references
  [ ] npm test → screenshots (390/320/1440, light+dark) → PR → green CI → squash-merge`);
