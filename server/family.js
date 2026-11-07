// The family's own profile: the app's name and the children as they want them drawn — so a family on its own instance never
// sees Mimi and Mika. The drawings stay the two hand-drawn characters (a girl with her wagon, a toddler) recoloured from each
// child's "look": base template + skin, hair and top colours. Everything that names the children (prompts, push texts, the
// kicker under the app's name) is built here from the children table, with ages from birth_ym.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const D = require('../scripts/lib/book-defaults.mjs');   // ageAt: "3 ขวบครึ่ง" / "3½" at a date

const ART = path.join(__dirname, '..', 'public', 'art', 'kids');
const BASES = { girl: 'mimi', boy: 'mika' };   // which drawing a look is made from
const OUTFITS = ['adventure'];
// colour roles in the templates (both drawings share the skin and outline colours; hair, top and the circle differ)
const ROLES = {
  mimi: { face: '#F8DCC6', hands: '#F3CDB2', hair: '#2E211B', top: '#E53935', bg: '#FFE3EC', bow: '#FF6F91' },
  mika: { face: '#F8DCC6', hands: '#F3CDB2', hair: '#3B2A22', top: '#A8D5C2', bg: '#DDF3EA' },
};
const SKINS = { light: ['#F8DCC6', '#F3CDB2'], warm: ['#EFC9A6', '#E6B990'], tan: ['#D9A776', '#CC9666'], deep: ['#A86B46', '#9A5F3C'] };
const HAIRS = { dark: '#2E211B', black: '#1C1A1F', brown: '#6B4423', chestnut: '#8B5A2B', auburn: '#A0452A', blonde: '#D9B55A' };
const TOPS = { red: '#E53935', blue: '#2F8BFF', green: '#3BAA6E', yellow: '#F2B32B', purple: '#8E5BE0', pink: '#FF6FA3', teal: '#26A69A', orange: '#FF8A3D', mint: '#A8D5C2' };
const PALETTE = { bases: Object.keys(BASES), skins: Object.keys(SKINS), hairs: Object.keys(HAIRS), tops: Object.keys(TOPS) };

// a pastel of the top colour for the circle behind the face
const pastel = (hex) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * 0.22 + 255 * 0.78).toString(16).padStart(2, '0')).join('').toUpperCase();

// a stored look is only ever one of the palette's choices
function cleanLook(l) {
  if (!l || typeof l !== 'object') return null;
  const pick = (v, set, dflt) => (typeof v === 'string' && set[v] ? v : dflt);
  return { base: pick(l.base, BASES, 'girl'), skin: pick(l.skin, SKINS, 'light'), hair: pick(l.hair, HAIRS, 'dark'), top: pick(l.top, TOPS, 'red') };
}
const lookVersion = (look) => (look ? crypto.createHash('sha1').update(JSON.stringify(cleanLook(look))).digest('hex').slice(0, 8) : '');

const templates = new Map();
const template = (base, outfit, full) => {
  const f = `${base}${outfit ? '-' + outfit : ''}${full ? '-full' : ''}.svg`;
  if (!templates.has(f)) templates.set(f, fs.readFileSync(path.join(ART, f), 'utf8'));
  return templates.get(f);
};
// the drawing of a child with a look: the template with its colour roles swapped (case-insensitively, whole hex values only)
function renderKid({ slug, look, outfit, full }) {
  const lk = cleanLook(look); if (!lk) return null;
  const base = BASES[lk.base], roles = ROLES[base], o = OUTFITS.includes(outfit) ? outfit : '';
  const map = new Map([[roles.face, SKINS[lk.skin][0]], [roles.hands, SKINS[lk.skin][1]], [roles.hair, HAIRS[lk.hair]]]);
  if (!o) { map.set(roles.top, TOPS[lk.top]); map.set(roles.bg, pastel(TOPS[lk.top])); }   // an outfit keeps its own clothes and backdrop
  if (roles.bow) map.set(roles.bow, TOPS[lk.top === 'pink' ? 'purple' : 'pink']);
  let svg = template(base, o, full).replace(/#[0-9A-Fa-f]{6}\b/g, (hex) => map.get(hex.toUpperCase()) || hex);
  return svg.replace(new RegExp(`k${base}(a?)\\b`, 'g'), `k${slug.replace(/[^a-z0-9]/g, '')}$1`);   // clipPath ids must not collide on a page
}

// ---- words: who the children are, for prompts and texts
const and = (lang, spaced) => (lang === 'en' ? ' and ' : spaced ? ' และ' : 'และ');
const names = (kids, lang) => {
  const ns = kids.map((k) => (lang === 'en' ? k.name_en : k.name_th)).filter(Boolean);
  return ns.length <= 1 ? ns.join('') : ns.slice(0, -1).join(lang === 'en' ? ', ' : ' ') + and(lang) + ns[ns.length - 1];
};
const ageOf = (k, at) => (k.birth_ym ? D.ageAt(at || new Date(), k.birth_ym) : null);
// "Mimi (3) and Mika (1½)" / "มีมี่ (3 ขวบ) และมีก้า (1 ขวบครึ่ง)"; with no children at all a neutral phrase
function who(kids, lang, at) {
  if (!kids.length) return lang === 'en' ? 'the children' : 'เด็กๆ';
  const parts = kids.map((k) => { const a = ageOf(k, at); const n = lang === 'en' ? k.name_en : k.name_th; return a ? `${n} (${lang === 'en' ? a.en : a.th})` : n; });
  return parts.length === 1 ? parts[0] : parts.slice(0, -1).join(lang === 'en' ? ', ' : ' ') + and(lang, true) + parts[parts.length - 1];
}
// everything a prompt may need, in both languages at once
function kidsFor(kids, at) {
  const first = kids[0] || null;
  return {
    n: kids.length,
    who: { en: who(kids, 'en', at), th: who(kids, 'th', at) },
    names: { en: names(kids, 'en'), th: names(kids, 'th') },
    first: first ? { en: first.name_en, th: first.name_th, age: ageOf(first, at) } : null,
    pairs: kids.length ? kids.map((k) => `${k.name_en} (${k.name_th})`).join(' and ') : 'The children',
  };
}
// the profile as the app shows it: stored values first, else the product name LifeBook (the kicker names the children)
function profile(stored, kids) {
  const p = stored && typeof stored === 'object' ? stored : {};
  const ini = kids.map((k) => (k.name_en || '?')[0].toUpperCase()).join('');
  const app = { th: (p.app && p.app.th) || 'LifeBook', en: (p.app && p.app.en) || 'LifeBook' };
  const kicker = { th: (p.kicker && p.kicker.th) || (kids.length ? `ของ${names(kids, 'th')}` : 'สมุดความทรงจำของครอบครัว'), en: (p.kicker && p.kicker.en) || (kids.length ? kids.map((k) => k.name_en).join(' & ') : 'Our family memory books') };
  return { app, kicker, custom: { app: p.app || null, kicker: p.kicker || null } };   // custom = what the parents typed (the form edits that, the rest is built)
}
const clip = (s, n) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, n);
// what PUT /api/b/family may store
function cleanProfile(b) {
  const p = b && typeof b === 'object' ? b : {}, i18n = (o) => (o && typeof o === 'object' ? { th: clip(o.th, 40), en: clip(o.en, 40) } : { th: '', en: '' });
  const app = i18n(p.app), kicker = i18n(p.kicker);
  return { app: app.th || app.en ? app : undefined, kicker: kicker.th || kicker.en ? kicker : undefined };
}
const slugOf = (s) => String(s || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 20);
function cleanKid(k, i) {
  const name_en = clip(k.name_en, 40), name_th = clip(k.name_th, 40) || name_en;
  if (!name_en) return null;
  const slug = /^[a-z0-9-]{2,20}$/.test(k.slug || '') ? k.slug : slugOf(name_en) || `kid${i + 1}`;
  return { slug, name_th, name_en, emoji: clip(k.emoji, 8) || '🧒', birth_ym: /^\d{4}-(0[1-9]|1[0-2])$/.test(k.birth_ym || '') ? k.birth_ym : null, look: cleanLook(k.look), color: TOPS[(cleanLook(k.look) || {}).top] || '#8B3DFF' };
}
// the children rows as a seed's "children" (names, emoji, age at the trip's first day) — an imported book is about this family's kids
const seedChildren = (kids, dateFrom) => kids.map((k) => ({ slug: k.slug, name_th: k.name_th, name_en: k.name_en, emoji: k.emoji || '🧒', age_at_trip: ageOf(k, dateFrom ? new Date(dateFrom + 'T00:00:00Z') : null) || { th: '', en: '' } }));

module.exports = { PALETTE, OUTFITS, cleanLook, lookVersion, renderKid, kidsFor, profile, cleanProfile, cleanKid, seedChildren, names };
