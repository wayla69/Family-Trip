// What every new book gets unless its plan says otherwise — shared by scripts/new-book.mjs (scaffold) and scripts/plan-to-seed.mjs (converter).
// docs/NEW-BOOK.md · docs/PLAN-TO-BOOK.md. Nothing here may hold a booking reference, a cost or a real name.
export const i18n = (th, en) => ({ th, en });
export const TODO = (what) => i18n(`TODO ${what}`, `TODO ${what}`);

export const KID = {
  mimi: { name_th: 'มีมี่', name_en: 'Mimi', emoji: '👧', birth: '2023-05' },
  mika: { name_th: 'มีก้า', name_en: 'Mika', emoji: '👶', birth: '2025-03' },
};

// ---- dates (all UTC midnight; the trip's own timezone only matters at run time)
export const parseDay = (s) => { if (!/^\d{4}-\d{2}-\d{2}$/.test(s || '')) return null; const d = new Date(s + 'T00:00:00Z'); return isNaN(d) ? null : d; };
export const addDays = (d, n) => new Date(d.getTime() + n * 864e5);
export const ymd = (d) => d.toISOString().slice(0, 10);
export const datesBetween = (d0, d1) => { const out = []; for (let d = d0; d <= d1; d = addDays(d, 1)) out.push(ymd(d)); return out; };
const TH_DOW = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'], TH_MON = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const EN_DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], EN_MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const fmtTh = (d) => `${TH_DOW[d.getUTCDay()]} ${d.getUTCDate()} ${TH_MON[d.getUTCMonth()]}`;
export const fmtEn = (d) => `${EN_DOW[d.getUTCDay()]} ${d.getUTCDate()} ${EN_MON[d.getUTCMonth()]}`;
// "5–10 DEC 2026" / "28 MAR – 2 APR 2027" — the stamp's date line
export const rangeText = (d0, d1) => {
  const m0 = EN_MON[d0.getUTCMonth()].toUpperCase(), m1 = EN_MON[d1.getUTCMonth()].toUpperCase();
  return m0 === m1 && d0.getUTCFullYear() === d1.getUTCFullYear() ? `${d0.getUTCDate()}–${d1.getUTCDate()} ${m1} ${d1.getUTCFullYear()}` : `${d0.getUTCDate()} ${m0} – ${d1.getUTCDate()} ${m1} ${d1.getUTCFullYear()}`;
};

// ---- children: slugs → rows with ages at the trip's first day ("3 ขวบครึ่ง" / "3½")
export const ageAt = (d0, ym) => {
  if (!ym) return null;
  const [y, m] = ym.split('-').map(Number);
  const months = (d0.getUTCFullYear() - y) * 12 + (d0.getUTCMonth() + 1 - m);
  const yrs = Math.floor(months / 12), half = months % 12 >= 6;
  return { th: `${yrs}${half ? ' ขวบครึ่ง' : ' ขวบ'}`, en: `${yrs}${half ? '½' : ''}` };
};
export const children = (kids, d0) => kids.map((k) => {
  if (typeof k === 'object') return { emoji: '🧒', ...k, age_at_trip: k.age_at_trip || ageAt(d0, k.birth) || TODO('age') };
  const b = KID[k] || {};
  return { slug: k, name_th: b.name_th || k, name_en: b.name_en || k, emoji: b.emoji || '🧒', age_at_trip: ageAt(d0, b.birth) || TODO('age') };
});

// ---- look: DESIGN.md tokens around one accent
export const theme = ({ slug, accent = '#1F3A5F', accent2 = '#C8402B', display = 'sans', kicker = 'TODO KICKER', badge = '📖', flag = '🏳️', placeTh = 'TODO', placeEn = 'TODO', places }) => ({
  kicker, badge, accent, accent2, ink: '#1F2A3A', muted: '#6D7480', panel: '#F7F2EA', rule: '#E8EBEA', pick: '#FBEDE9', info: '#EAF0F7', calm: '#E8F4F0', warn: '#FBF0E4', accentDark: '#8FB0E0', display,
  art: `/art/${slug}/day-{n}.svg`, places: places || [{ flag, th: placeTh, en: placeEn }],
});
export const passportStyle = ({ slug, accent = '#1F3A5F', placeTh, placeEn }) => ({
  crest: `/art/crest/${slug}.svg`, ink: accent, hi: '#E05A7A', bgA: '#FBF1DA', bgB: '#E3EEF9', gold: '#E9D9A0', title: 'Adventure Passport', hl: 'Passport',
  sub: i18n('พาสปอร์ตนักผจญภัยของ {name}', "{name}'s adventure passport"), places: placeTh ? i18n(placeTh, placeEn) : TODO('places line'),
});
export const dayBase = (i, date, accent = '#1F3A5F') => ({ index: i, date, emoji: '📍', gradient: [accent, '#D9E2EC'] });

export const MOODS = ['😄', '🥰', '🤩', '😋', '😴', '😢'];
export const FIRSTS = [
  { key: 'plane', emoji: '✈️', label: i18n('นั่งเครื่องบิน', 'A flight') },
  { key: 'hotel', emoji: '🏨', label: i18n('นอนที่ใหม่', 'A night somewhere new') },
  { key: 'train', emoji: '🚆', label: i18n('นั่งรถไฟ', 'A train ride') },
  { key: 'boat', emoji: '⛴️', label: i18n('นั่งเรือ', 'A boat ride') },
  { key: 'sea', emoji: '🌊', label: i18n('เห็นทะเล', 'Seeing the sea') },
  { key: 'animal', emoji: '🐾', label: i18n('เจอสัตว์ตัวใหม่', 'Meeting a new animal') },
  { key: 'food', emoji: '🍜', label: i18n('ลองอาหารใหม่', 'Trying a new food') },
  { key: 'word', emoji: '🗣️', label: i18n('พูดคำในภาษาใหม่', 'A word in a new language') },
  { key: 'playground', emoji: '🛝', label: i18n('สนามเด็กเล่นต่างประเทศ', 'A playground abroad') },
  { key: 'friend', emoji: '🤝', label: i18n('เพื่อนใหม่', 'A new friend') },
];
export const PACK = {
  title: i18n('ช่วยจัดกระเป๋าหน่อย! ใส่อะไรแล้วแตะเลย', 'Help me pack! Tap each thing you put in'),
  items: [
    { k: 'toy', e: '🧸', th: 'ตุ๊กตาตัวโปรด', en: 'My cuddly toy' }, { k: 'toothbrush', e: '🪥', th: 'แปรงสีฟัน', en: 'Toothbrush' },
    { k: 'pyjamas', e: '🌙', th: 'ชุดนอน', en: 'Pyjamas' }, { k: 'jacket', e: '🧥', th: 'เสื้อแจ็กเก็ต', en: 'Jacket' },
    { k: 'socks', e: '🧦', th: 'ถุงเท้า', en: 'Socks' }, { k: 'shoes', e: '👟', th: 'รองเท้าเดินสบาย', en: 'Comfy shoes' },
    { k: 'hat', e: '🧢', th: 'หมวก', en: 'Hat' }, { k: 'crayons', e: '🖍️', th: 'สีเทียน', en: 'Crayons' },
    { k: 'book', e: '📖', th: 'นิทานหนึ่งเล่ม', en: 'A story book' }, { k: 'passport', e: '🛂', th: 'พาสปอร์ตนักผจญภัย', en: 'My adventure passport' },
  ],
};
// 14 countdown doors that fit any trip; a plan's own doors replace them from the front (door 1 first), the rest stay in place
export const doors = (placeTh = 'ที่นั่น', placeEn = 'there') => [
  { e: '🎒', th: `สวัสดี {name}! อีก 14 วันเราจะไป${placeTh}กันนะ!`, en: `Hi {name}! In 14 sleeps we go to ${placeEn}!` },
  { e: '✈️', th: 'เราจะนั่งเครื่องบินลำใหญ่ขึ้นไปเหนือก้อนเมฆ ลองทำเสียงเครื่องบินกัน: วี้ววว!', en: "We'll ride a big plane above the clouds. Can you make a plane noise? Wheeee!" },
  { e: '🧸', th: 'เลือกตุ๊กตาหนึ่งตัวที่จะไปด้วยกัน ตัวไหนดีนะ?', en: 'Pick one cuddly friend to come along. Which one?' },
  { e: '🗺️', th: `${placeTh}อยู่ไกลแค่ไหนนะ? ลองหาบนลูกโลกกับคุณพ่อคุณแม่สิ`, en: `How far away is ${placeEn}? Find it on the globe with Mum and Dad.` },
  { e: '🌤️', th: 'อากาศที่นั่นเป็นยังไงนะ? เราจะใส่อะไรดี?', en: "What's the weather like there? What shall we wear?" },
  { e: '🍽️', th: `ที่${placeTh}มีของอร่อยรอเราอยู่ หนูกล้าลองของใหม่ไหม?`, en: `Yummy food is waiting in ${placeEn}. Will you try something new?` },
  { e: '🗣️', th: 'มาหัดพูดคำทักทายของที่นั่นกัน พูดตามคุณแม่นะ', en: "Let's learn how to say hello there. Repeat after Mum!" },
  { e: '📷', th: 'หนูอยากถ่ายรูปอะไรมากที่สุด?', en: 'What do you want to take a photo of most?' },
  { e: '🎨', th: `วาดรูปสิ่งที่หนูคิดว่าจะเจอที่${placeTh}สิ`, en: `Draw what you think you'll see in ${placeEn}.` },
  { e: '🛏️', th: 'เราจะไปนอนที่ใหม่ หนูอยากเอาผ้าห่มผืนไหนไปด้วย?', en: "We'll sleep somewhere new. Which blanket comes along?" },
  { e: '🎵', th: 'ร้องเพลงเดินทางกัน! เพลงไหนที่หนูชอบที่สุด?', en: 'A travelling song! Which one is your favourite?' },
  { e: '🧳', th: 'ช่วยคุณแม่จัดกระเป๋าหน่อย แตะของที่ใส่แล้วในหน้าถัดไปนะ', en: 'Help Mum pack — tick what goes in on the next page.' },
  { e: '🌙', th: 'พรุ่งนี้แล้ว! คืนนี้นอนเร็วหน่อยนะนักผจญภัย', en: 'Tomorrow! Early to bed tonight, little explorer.' },
  { e: '🚀', th: 'วันนี้แล้ว! ไปกันเลย {name}!', en: "Today's the day! Let's go, {name}!" },
];
export const NOTES = 'Seed only: no booking numbers, passports, confirmations or real costs (keep them out of the bookshelf).';
export const isHome = (s) => !s || /^(บ้าน|home)$/i.test(((s.en || s.th || s) + '').trim());
export const kebab = (s) => String(s || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
