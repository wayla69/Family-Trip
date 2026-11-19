/* The styles the family can like — one vocabulary for the app and the server (docs/PLACES-ECOSYSTEM.md, ADR-15; owner, Nov 2026:
   "ร้านอาหารและสถานที่ท่องเที่ยว ให้เลือกแนวที่ชอบได้"). A classic script: on the phone it puts its names on the page's global scope
   (loaded before core.js); on the server `require('../public/tags.js')` returns the same table.
   Each row is [key, emoji, Thai, English, a pattern read from a place's own words]. A place's styles are only ever READ from what its
   row says (its tag, what, why, kind) — never guessed — so a card and a filter can be trusted. */
(function (root) {
  // what kind of food — read from a place to eat's tag, what and why (both languages)
  const TASTE_FOOD = [
    ['local', '🏮', 'ร้านดั้งเดิมของท้องถิ่น', 'Local classics', /\b(local (classic|favourite|institution|staple)|institution|since (18|19|20)\d\d|family[- ]run|old[- ]school|traditional|historic|decades?)\b|ดั้งเดิม|เก่าแก่|ตั้งแต่ปี|ท้องถิ่น|ครอบครัว/i],
    ['noodle', '🍜', 'เส้น', 'Noodles', /noodles?|ramen|udon|soba|pho\b|laksa|pasta|spaghetti|dumplings?|wonton|ก๋วยเตี๋ยว|ราเมง|อุด้ง|โซบะ|เฝอ|พาสต้า|บะหมี่|เกี๊ยว/i],
    ['rice', '🍚', 'ข้าว', 'Rice dishes', /\brice\b|biryani|paella|risotto|donburi|\bdon\b|curry|nasi|bibimbap|onigiri|ข้าว|แกง/i],
    ['seafood', '🦐', 'ซีฟู้ด', 'Seafood', /seafood|fish|prawns?|shrimps?|crab|lobster|oysters?|mussels?|clams?|squid|sushi|sashimi|ซีฟู้ด|อาหารทะเล|ปลา|กุ้ง|ปู|หอย|ซูชิ/i],
    ['grill', '🍢', 'ปิ้งย่าง', 'Grill and BBQ', /grill|bbq|barbecue|barbeque|kebabs?|yakitori|yakiniku|steak|roast|rotisserie|skewers?|asado|churrasco|satay|ปิ้ง|ย่าง|บาร์บีคิว|สเต๊ก|เคบับ/i],
    ['sweet', '🍰', 'คาเฟ่และของหวาน', 'Cafés and sweets', /caf[eé]|bakery|bakeries|pastr(y|ies)|cakes?|ice[- ]cream|gelato|desserts?|sweets?|patisserie|crepes?|pancakes?|waffles?|doughnuts?|chocolate|tea ?house|คาเฟ่|ขนม|ไอศกรีม|เค้ก|เบเกอรี่|ของหวาน|ร้านชา/i],
    ['court', '🏪', 'ศูนย์อาหารและตลาด', 'Food courts and markets', /food (court|hall|hub|market)|hawker|market|night market|stalls?|street food|ศูนย์อาหาร|ฟู้ดคอร์ท|ตลาด|แผงลอย|สตรีทฟู้ด/i],
    ['buffet', '🍱', 'บุฟเฟต์', 'Buffets', /buffet|all[- ]you[- ]can[- ]eat|บุฟเฟต์/i],
    ['veg', '🥗', 'มีเมนูผัก/มังสวิรัติ', 'Vegetarian-friendly', /vegetarian|vegan|plant[- ]based|meat[- ]free|มังสวิรัติ|วีแกน|อาหารเจ/i],
    ['halal', '🌙', 'ฮาลาล', 'Halal', /halal|ฮาลาล/i],
    ['familiar', '🍕', 'อาหารที่เด็กคุ้น', 'Familiar food', /pizza|burgers?|fried chicken|chips|fries|sandwich(es)?|pancakes?|spaghetti|western|พิซซ่า|เบอร์เกอร์|ไก่ทอด|เฟรนช์ฟรายส์|แซนด์วิช/i],
  ];
  // what kind of outing (the planner's likes, kept as they were so old plans still read)
  const TASTE_OUT = [
    ['animals', '🐘', 'สัตว์', 'Animals', /\bzoo|safari|wildlife|animals?|petting|bird park|sanctuary|สวนสัตว์|ซาฟารี|สัตว์/i],
    ['aquarium', '🐠', 'อควาเรียม', 'Aquariums', /aquarium|sea life|oceanarium|อควาเรียม|พิพิธภัณฑ์สัตว์น้ำ/i],
    ['sea', '🏖️', 'ทะเล', 'The sea', /beach|seaside|coast|snorkel|bay\b|lagoon|island|ชายหาด|ทะเล|เกาะ|ดำน้ำ/i],
    ['nature', '🌲', 'ธรรมชาติ', 'Nature', /nature|forest|national park|waterfall|lake|mountain|hike|trail|garden|botanic|gorge|valley|ธรรมชาติ|ป่า|น้ำตก|ทะเลสาบ|ภูเขา|อุทยาน|สวนพฤกษ/i],
    ['park', '🎢', 'สวนสนุก', 'Theme parks', /theme park|amusement|disney|universal|legoland|water park|rides?\b|roller ?coaster|สวนสนุก|สวนน้ำ|เครื่องเล่น/i],
    ['play', '🎈', 'สนามเด็กเล่น', 'Playgrounds', /playground|play (centre|center|area|space)|soft play|indoor play|kids'? (zone|club)|สนามเด็กเล่น|ลานเด็กเล่น|ห้องเด็กเล่น/i],
    ['museum', '🔬', 'พิพิธภัณฑ์เด็ก', 'Kids’ museums', /museum|science (centre|center)|discovery|hands[- ]on|planetarium|exhibition|gallery|พิพิธภัณฑ์|ศูนย์วิทยาศาสตร์|ท้องฟ้าจำลอง/i],
    ['train', '🚂', 'รถไฟ', 'Trains', /train|railway|tram|cable car|gondola|ferry|boat (ride|trip)|monorail|steam|funicular|รถไฟ|รถราง|กระเช้า|เรือ/i],
    ['snow', '❄️', 'หิมะ', 'Snow', /snow|ski|sledg|igloo|ice (rink|skating)|glacier|หิมะ|สกี|ลานน้ำแข็ง|ธารน้ำแข็ง/i],
    ['farm', '🍓', 'ฟาร์ม', 'Farms', /farm|orchard|fruit picking|strawberr|dairy|pick your own|ฟาร์ม|เก็บผลไม้|สวนผลไม้|สตรอว์เบอร์รี/i],
    ['food', '🍜', 'ของกิน', 'Food', /food (tour|street|market)|street food|night market|tasting|cooking class|ของกิน|ตลาดกลางคืน|สตรีทฟู้ด/i],
    ['shop', '🛍️', 'ช้อปปิ้ง', 'Shopping', /shopping|mall|outlet|department store|arcade|ช้อปปิ้ง|ห้าง|เอาต์เล็ต/i],
    ['culture', '⛩️', 'วัดและวัฒนธรรม', 'Culture', /temple|shrine|church|cathedral|mosque|palace|castle|old town|heritage|historic|fort|ruins?|วัด|ศาลเจ้า|โบสถ์|พระราชวัง|ปราสาท|เมืองเก่า|โบราณ/i],
    ['onsen', '♨️', 'ออนเซ็น', 'Hot springs', /onsen|hot spring|thermal|spa town|ออนเซ็น|น้ำพุร้อน/i],
    ['views', '🗼', 'จุดชมวิว', 'Views', /view ?point|lookout|observation|observatory|tower|skyline|panorama|จุดชมวิว|หอคอย|ชมวิว/i],
    ['show', '🎭', 'การแสดง', 'Shows', /\bshows?\b|parade|performance|theatre|theater|puppet|circus|musical|light show|การแสดง|ขบวนพาเหรด|ละคร|หุ่นกระบอก/i],
  ];
  // what the family needs on the day (the planner's needs, kept as they were)
  const TASTE_NEED = [
    ['pram', '👶', 'ใช้รถเข็น', 'A pram'], ['nap', '😴', 'งีบกลางวัน', 'A midday nap'], ['walk', '🚶', 'เดินน้อย', 'Little walking'],
    ['drive', '🚗', 'ไม่นั่งรถนาน', 'No long drives'], ['mild', '🥣', 'อาหารไม่เผ็ด', 'Mild food'], ['crowd', '🌿', 'เลี่ยงคนแน่น', 'Avoid crowds'],
    ['early', '🌙', 'นอนเร็ว', 'Early nights'],
  ];
  const textOf = (x) => ['tag', 'what', 'why', 'name', 'area'].map((k) => { const v = x && x[k]; return v && typeof v === 'object' ? `${v.en || ''} ${v.th || ''}` : String(v || ''); }).join(' ');
  // the styles a place to eat says it has (a kind 2 row — a café or sweets — is a café whatever its words)
  const foodStylesOf = (x) => { const s = textOf(x); const out = TASTE_FOOD.filter((k) => k[4].test(s)).map((k) => k[0]); if (x && x.kind === 2 && !out.includes('sweet')) out.push('sweet'); return out; };
  const outStylesOf = (x) => { const s = textOf(x); return TASTE_OUT.filter((k) => k[4].test(s)).map((k) => k[0]); };
  const keys = (list) => list.map((k) => k[0]);
  const pick = (v, list, n) => [...new Set((Array.isArray(v) ? v : []).map(String).filter((k) => keys(list).includes(k)))].slice(0, n || 40);
  // what the server keeps: {food: {like, avoid}, out: {like, avoid}, needs, kids: {slug: [style keys]}} — a style is never both liked and avoided
  function cleanTaste(t) {
    const o = t && typeof t === 'object' ? t : {}, side = (v, list) => { const like = pick(v && v.like, list), avoid = pick(v && v.avoid, list).filter((k) => !like.includes(k)); return { like, avoid }; };
    const kids = {};
    if (o.kids && typeof o.kids === 'object') for (const [slug, v] of Object.entries(o.kids).slice(0, 8)) if (/^[a-z0-9-]{2,20}$/.test(slug)) { const ks = [...pick(v, TASTE_OUT), ...pick(v, TASTE_FOOD)]; if (ks.length) kids[slug] = ks.slice(0, 20); }
    return { food: side(o.food, TASTE_FOOD), out: side(o.out, TASTE_OUT), needs: pick(o.needs, TASTE_NEED), kids };
  }
  const tasteEmpty = (t) => !t || (!t.food.like.length && !t.food.avoid.length && !t.out.like.length && !t.out.avoid.length && !t.needs.length && !Object.keys(t.kids).length);
  // how well a place fits the family: 1 = it has a liked style and no avoided one, -1 = it has an avoided one, 0 = nothing either way
  function tasteFit(styles, side) {
    if (!side) return 0;
    if (styles.some((k) => side.avoid.includes(k))) return -1;
    return styles.some((k) => side.like.includes(k)) ? 1 : 0;
  }
  // the taste in words for the helper (names never — a child is "child 1", "child 2")
  function tasteWords(t, kidSlugs) {
    const c = cleanTaste(t), w = (list, ks) => ks.map((k) => (list.find((x) => x[0] === k) || [])[3]).filter(Boolean).join(', ');
    const out = [];
    if (c.out.like.length) out.push(`Outings we love: ${w(TASTE_OUT, c.out.like)}.`);
    if (c.out.avoid.length) out.push(`Outings we skip: ${w(TASTE_OUT, c.out.avoid)}.`);
    if (c.food.like.length) out.push(`Food we love: ${w(TASTE_FOOD, c.food.like)}.`);
    if (c.food.avoid.length) out.push(`Food we avoid: ${w(TASTE_FOOD, c.food.avoid)}.`);
    if (c.needs.length) out.push(`Always allow for: ${w(TASTE_NEED, c.needs)}.`);
    (kidSlugs || Object.keys(c.kids)).forEach((s, i) => { const ks = c.kids[s]; if (ks && ks.length) out.push(`Child ${i + 1} especially loves: ${[w(TASTE_OUT, ks.filter((k) => keys(TASTE_OUT).includes(k))), w(TASTE_FOOD, ks.filter((k) => keys(TASTE_FOOD).includes(k)))].filter(Boolean).join(', ')}.`); });
    return out.join(' ');
  }
  const api = { TASTE_FOOD, TASTE_OUT, TASTE_NEED, foodStylesOf, outStylesOf, cleanTaste, tasteEmpty, tasteFit, tasteWords };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else Object.assign(root, api);
})(typeof self !== 'undefined' ? self : this);
