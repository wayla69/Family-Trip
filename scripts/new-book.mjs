#!/usr/bin/env node
// Scaffold a new book (seed) from the owner's Trip Operations Manual — docs/NEW-BOOK.md, format 2.
//   npm run new-book -- --slug=japan-2028 --from=2028-03-10 --to=2028-03-20 --tz=Asia/Tokyo \
//     --title-th="The Sakura Hop · ญี่ปุ่น" --title-en="The Sakura Hop · Japan" --kicker="THE SAKURA HOP · EXPEDITION …" \
//     --accent=#1F3A5F --flag=🇯🇵 --place-th=ญี่ปุ่น --place-en=Japan [--kids=mimi,mika] [--force]
// Writes server/seeds/<slug>.json with every section present (TODO markers where the manual's content goes) and prints a checklist.
// When the plan already exists as JSON (an artifact's plan.json), use scripts/plan-to-seed.mjs instead — docs/PLAN-TO-BOOK.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from './lib/book-defaults.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true]; }));
const need = (k) => { if (!args[k]) { console.error(`missing --${k}`); process.exit(1); } return args[k]; };
const slug = need('slug'), from = need('from'), to = need('to');
if (!/^[a-z0-9-]{2,60}$/.test(slug)) { console.error('slug: a-z 0-9 - only'); process.exit(1); }
const d0 = D.parseDay(from), d1 = D.parseDay(to);
if (!d0 || !d1 || d1 < d0 || (d1 - d0) / 864e5 > 60) { console.error('dates: YYYY-MM-DD, end after start, 60 days max'); process.exit(1); }
const out = path.join(root, 'server', 'seeds', `${slug}.json`);
if (fs.existsSync(out) && !args.force) { console.error(`${out} exists — pass --force to overwrite`); process.exit(1); }

const kids = String(args.kids || 'mimi,mika').split(',').map((s) => s.trim()).filter(Boolean);
const { i18n, TODO } = D;
const accent = args.accent || '#1F3A5F', placeTh = args['place-th'] || 'TODO', placeEn = args['place-en'] || 'TODO';
const days = D.datesBetween(d0, d1).map((date, i) => ({
  ...D.dayBase(i, date, accent),
  title: TODO(`day ${i + 1} title`), sleep: TODO('where we sleep (or Home)'),
  planned: [{ key: `TODO-stop-${i + 1}`, kind: 'place', q: 'TODO full maps query: name, street, town', en: 'TODO stop', th: 'TODO จุดแวะ' }, { key: `TODO-meal-${i + 1}`, kind: 'food', q: 'TODO full maps query', en: 'TODO meal', th: 'TODO มื้ออาหาร', meal: 'Lunch' }],
  wx: TODO('weather line'),
  moving: TODO('how we move today'), pick: TODO('local pick'), planB: TODO('plan B'), money: TODO('money today — prices only'),
  plan: [{ t: '09:00', th: 'TODO', en: 'TODO' }], tips: [],
  legs: [{ from: 'TODO', to: 'TODO', by: TODO('how (taxi 20 min, MTR…)'), min: 0, url: 'https://www.google.com/maps/dir/?api=1&origin=TODO&destination=TODO&travelmode=transit' }],
  picks: [], food: [],   // picks: [{meal{th,en}, name, what{th,en}, pr, q, alt{name,pr,q}}] · food: [{stop{th,en}, items[{name, tag, what, note, pr, q, pick?}]}]
  stay: { name: 'TODO stay', addr: 'TODO public address', q: 'TODO maps query' }, route: '', eat: [], learn: [], quiz: [],
}));
const seed = {
  format: 2,
  slug, status: 'upcoming',
  title: i18n(args['title-th'] || `TODO · ${slug}`, args['title-en'] || `TODO · ${slug}`),
  sub: i18n('TODO บรรทัดรอง', 'TODO subtitle'),
  date_from: from, date_to: to, timezone: args.tz || 'Asia/Bangkok',
  destinations: [placeEn],
  children: D.children(kids, d0),
  theme: D.theme({ slug, accent, kicker: args.kicker, flag: args.flag, placeTh, placeEn }),
  days,
  firsts_catalog: D.FIRSTS,
  moods: D.MOODS,
  stamp: { text: [placeEn.toUpperCase(), 'TODO', D.rangeText(d0, d1)], awarded_when: 'all days marked done OR trip end date passed' },
  cover: { emoji: '📖', gradient: [accent, '#C8402B'] },
  notes: D.NOTES,
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
    days: days.map((d, i) => ({ title: TODO(`mission title day ${i + 1}`), stamp: 'TODO', facts: [TODO('fact')], spot: [{ k: 'spot1', e: '🔍', th: 'TODO', en: 'TODO' }], acc: accent, tint: '#F3F6FA' })),
    lists: [
      { key: 'words', e: '🗣️', said: true, title: TODO('say it like a local'), sub: TODO('sub'), groups: [{ items: [{ k: 'hello', e: '👋', th: 'TODO', en: 'TODO', note: TODO('meaning'), speak: { text: 'TODO', lang: 'en-GB' } }] }] },
      { key: 'food', e: '🍽️', yum: true, title: TODO('tasting card'), sub: TODO('sub'), groups: [{ items: [{ k: 'dish1', e: '🍜', th: 'TODO', en: 'TODO' }] }] },
      { key: 'master', e: '🧭', title: TODO('Master Explorer'), sub: TODO('sub'), goal: 10, goalText: TODO('goal text'), certificate: true, groups: [{ title: i18n('เจอแล้ว', 'Spotted'), e: '👀', items: [{ k: 'm1', e: '⭐', th: 'TODO', en: 'TODO' }] }] },
    ],
    certificate: { title: TODO('certificate title'), text: TODO('certificate text'), bye: TODO('goodbye line') },
    style: D.passportStyle({ slug, accent, placeTh: args['place-th'], placeEn: args['place-en'] }),
    pins: { title: i18n('เราไปไหนบ้าง', 'Where we go'), sub: TODO('sub'), items: [{ e: '📍', th: 'TODO', en: 'TODO', days: i18n('วันที่ 1', 'Day 1') }] },
    colour: `/art/${slug}/day-{n}.svg`,
    countdown: { doors: D.doors(placeTh, placeEn), pack: D.PACK },
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
  [ ] npm run plan-to-seed -- --check server/seeds/${slug}.json   (privacy scan + sanity) → npm test → screenshots (390/320/1440, light+dark) → PR → green CI → squash-merge`);
