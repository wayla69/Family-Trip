// South Korea + Seoul — each picture drawn for its own subject (docs/STOCK-ART.md §3.1, owner: distinctive, never repeated)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const K = { k1: '#C8102E', k2: '#0047A0', k3: '#FCE4EC' };
const nm = (th, en) => ({ th, en });

// the rose of Sharon (mugunghwa), the national flower: five pink petals, a red heart
const mugunghwa = (cx, cy, s) => g(cx, cy, s, [0, 72, 144, 216, 288].map((a) => g(0, 0, 1, P('M0 0c-14-10-16-34 0-42 16 8 14 32 0 42z', '#F8BBD0', 3), a)).join('') + C(0, 0, 9, '#C8102E', 3) + Lc('M0 0v-16', '#FFD54A', 3));
// the taegeuk: red over blue
const taegeuk = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0047A0"/>` + P(`M${cx - r} ${cy}a${r} ${r} 0 0 1 ${2 * r} 0a${r / 2} ${r / 2} 0 0 1 ${-r} 0a${r / 2} ${r / 2} 0 0 0 ${-r} 0z`, '#CD2E3A');
// a trigram: three bars (b = broken)
const bar = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="6" fill="${INK}" stroke="none"/>`;
const tri = (x, y, rot, bars) => g(x, y, 1, bars.map((b, i) => (b ? bar(-15, -13 + i * 10, 13) + bar(2, -13 + i * 10, 13) : bar(-15, -13 + i * 10, 30))).join(''), rot);

const items = [
  { id: 'kr.stamp', cat: 'stamp', file: 'kr/stamp.v1.svg', name: nm('ตราประทับเกาหลี', 'Korea stamp'), kw: ['korea', 'เกาหลี', 'south korea'],
    svg: countryStamp({ name: 'KOREA', ...K, emblem: mugunghwa(100, 92, 1.25) }) },
  { id: 'kr.flag', ch: '🇰🇷', cat: 'flag', file: 'kr/flag.v1.svg', name: nm('ธงเกาหลีใต้', 'Flag of South Korea'), kw: ['korea', 'เกาหลี', 'flag', 'ธง', 'taegukgi'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4-0-12-42 0s-86-12-126 0z', '#FFFFFF')
      + taegeuk(128, 94, 22) + tri(84, 62, -33, [0, 0, 0]) + tri(172, 126, -33, [1, 1, 1]) + tri(172, 62, 33, [1, 0, 1]) + tri(84, 126, 33, [0, 1, 0])) },
  { id: 'kr.hello', ch: '🙋', cat: 'hello', file: 'kr/hello.v1.svg', name: nm('อันยองฮาเซโย สวัสดี', 'Annyeonghaseyo, hello'), kw: ['annyeong', 'อันยอง', 'hello', 'สวัสดี', 'hanbok', 'ฮันบก'],
    // a child in hanbok: a rainbow-sleeved jacket (saekdong), a big full skirt, a hair ribbon
    svg: free(P('M48 214c4-60 30-96 72-96s68 36 72 96z', '#F48FB1') + P('M86 122l34 30 34-30-6-12H92z', '#FFF59D')
      + [0, 1, 2, 3, 4].map((i) => R(48 + i * 7, 128 + i * 2, 8, 34, ['#E4573D', '#FFD54A', '#81C784', '#64B5F6', '#BA68C8'][i], 2, 2.5)).join('')
      + Lc('M120 150l-16 26M120 150l16 26', '#E4573D', 5) + C(120, 76, 40, '#FFE0BD') + P('M80 74c0-32 20-44 40-44s40 12 40 44c-8-14-24-20-40-20s-32 6-40 20z', '#3E2723')
      + P('M160 60c14-6 24 0 22 10-10 2-18-2-22-10z', '#E4573D') + P('M188 140c14-18 18-40 12-58l14-4c8 24 2 50-14 70z', '#FFE0BD') + C(206, 76, 12, '#FFE0BD') + face(120, 82, 0.75)) },
  { id: 'kr.food.tteokbokki', cat: 'food', file: 'kr/food-tteokbokki.v1.svg', name: nm('ต็อกบกกี', 'Tteokbokki'), kw: ['tteokbokki', 'ต็อกบกกี', 'rice cake', 'ต๊อก', 'myeongdong', 'street food'], colour: true,
    // a shallow black pan of fat white rice cakes in red sauce, one fish cake, a toothpick
    svg: free(E(120, 150, 100, 42, '#37474F') + E(120, 142, 86, 32, '#E53935') + [[70, 132, -20], [104, 150, 10], [140, 128, -8], [168, 150, 18], [96, 124, 30]].map(([x, y, r]) => g(x, y, 1, R(-22, -9, 44, 18, '#FFFDF7', 9, 4), r)).join('')
      + P('M126 158c10-8 30-8 40 2-4 10-30 12-40-2z', '#FFCC80', 4) + Lc('M150 120l30-76', '#C8A26B', 5) + face(120, 172, 0.55)) },
  { id: 'kr.food.kimbap', cat: 'food', file: 'kr/food-kimbap.v1.svg', name: nm('คิมบับ', 'Kimbap'), kw: ['kimbap', 'gimbap', 'คิมบับ', 'ข้าวห่อสาหร่าย', 'picnic', 'ปิกนิก'], colour: true,
    // three round slices showing the filling (yellow pickle, green spinach, orange carrot, pink ham)
    svg: free([[70, 150], [170, 150], [120, 92]].map(([x, y]) => C(x, y, 46, '#263238') + C(x, y, 38, '#FFFDF7') + R(x - 6, y - 16, 12, 12, '#FFD54A', 2, 3) + R(x - 20, y - 4, 12, 12, '#7CB342', 2, 3) + R(x + 8, y - 4, 12, 12, '#FF8A65', 2, 3) + R(x - 6, y + 8, 12, 10, '#F48FB1', 2, 3)).join('') + face(120, 112, 0.5, 'none')) },
  { id: 'kr.food.bingsu', cat: 'food', file: 'kr/food-bingsu.v1.svg', name: nm('บิงซู', 'Bingsu'), kw: ['bingsu', 'บิงซู', 'shaved ice', 'น้ำแข็งไส', 'dessert', 'ของหวาน'], colour: true,
    // a snowy mountain of milk ice in a glass bowl, red beans and a rice cake on top, a strawberry
    svg: free(P('M50 150h140l-14 50H64z', '#E3F2FD') + P('M44 150c0-70 40-110 76-110s76 40 76 110z', '#FFFDF7') + P('M86 70c10-12 58-12 68 0-6 12-62 12-68 0z', '#8D3B2F')
      + R(104, 40, 32, 22, '#F8BBD0', 8, 4) + P('M150 44c10-8 22-2 20 10-8 10-20 6-20-10z', '#E53935', 4) + face(120, 118, 0.8)) },
  { id: 'kr.food.chicken', cat: 'food', file: 'kr/food-chicken.v1.svg', name: nm('ไก่ทอดเกาหลี', 'Korean fried chicken'), kw: ['chicken', 'ไก่ทอด', 'chimaek', 'yangnyeom', 'ยังนยอม'], colour: true,
    // a glossy red-glazed drumstick with sesame seeds, beside a crispy golden one, in a paper box
    svg: free(P('M40 200l14-70h132l14 70z', '#FFF3E0') + Lc('M54 150h132', '#E4573D', 6)
      + P('M70 140c-20-40 0-80 40-80 30 0 44 30 30 60l-20 30z', '#E9A64C') + R(110, 136, 14, 30, '#FFFDF7', 7, 4)
      + P('M130 136c-10-36 10-70 44-66 26 4 36 34 22 58l-26 18z', '#C62828') + R(166, 132, 14, 30, '#FFFDF7', 7, 4)
      + [[150, 96], [164, 110], [176, 92]].map(([x, y]) => E(x, y, 3, 2, '#FFFDF7', 0)).join('') + face(104, 104, 0.45) + face(166, 104, 0.45, 'o')) },
  { id: 'kr.animal.magpie', ch: '🐦', cat: 'animal', file: 'kr/animal-magpie.v1.svg', name: nm('นกกางเขนเกาหลี', 'Korean magpie'), kw: ['magpie', 'นกกางเขน', 'kkachi', 'bird', 'นก'], colour: true,
    // black head and back, white belly, the long blue-green tail
    svg: free(P('M150 130l80 50-10 14-84-40z', '#26A69A') + E(110, 130, 62, 48, '#FFFDF7') + P('M58 112c10-40 60-56 96-30l10 30c-30-10-70 0-106 0z', INK) + C(70, 90, 34, INK)
      + P('M36 90l-20 6 20 6z', '#455A64') + P('M84 150c30 0 56-10 70-26', 'none', 5) + Lc('M100 176l-6 26M120 176l6 26', INK, 5) + face(70, 88, 0.45).replace(/fill="#22213A"/g, 'fill="#FFFDF7"')) },
  { id: 'kr.animal.jindo', ch: '🐕', alt: ['🐶'], cat: 'animal', file: 'kr/animal-jindo.v1.svg', name: nm('หมาจินโด', 'Jindo dog'), kw: ['jindo', 'จินโด', 'dog', 'หมา', 'puppy'], colour: true,
    // a cream-white dog with pricked triangle ears and the tail curled up over its back
    svg: free(P('M166 128c40-20 50 30 18 36', 'none', 14).replace('fill="none"', 'fill="none" stroke="#FFF3E0"') + P('M166 128c40-20 50 30 18 36', 'none', 5)
      + E(130, 160, 64, 42, '#FFF3E0') + R(86, 180, 20, 34, '#FFF3E0', 8) + R(150, 180, 20, 34, '#FFF3E0', 8)
      + P('M50 70l10-46 26 34zM120 70l-10-46-26 34z', '#FFF3E0') + P('M58 60l4-22 12 16zM112 60l-4-22-12 16z', '#F8BBD0', 3) + C(86, 96, 46, '#FFF3E0') + E(86, 118, 18, 12, '#FFFFFF') + E(86, 112, 7, 5, INK) + face(86, 96, 0.7)) },
  { id: 'kr.transport.ktx', ch: '🚅', cat: 'transport', file: 'kr/transport-ktx.v1.svg', name: nm('รถไฟความเร็วสูง KTX', 'KTX train'), kw: ['ktx', 'รถไฟความเร็วสูง', 'korail', 'busan', 'ปูซาน', 'train'], colour: true,
    // a long white-and-grey bullet nose with a blue swoosh and a slanted windscreen
    svg: free(P('M14 170V116c0-18 12-30 32-30h96c50 0 84 30 92 70v14z', '#F5F5F5') + P('M152 92c36 6 62 26 70 52h-58z', '#90A4AE') + Lc('M14 150c60 0 120-6 214-6', '#0047A0', 9)
      + [30, 66, 102].map((x) => R(x, 102, 26, 22, '#BFD9F2', 5, 4)).join('') + P('M6 186h228') + C(54, 178, 9, '#5F6B7A') + C(160, 178, 9, '#5F6B7A') + face(186, 126, 0.5)) },
  { id: 'kr.culture.hahoe', cat: 'culture', file: 'kr/culture-hahoe.v1.svg', name: nm('หน้ากากฮาฮเว', 'Hahoe mask'), kw: ['hahoe', 'ฮาฮเว', 'mask', 'หน้ากาก', 'andong', 'folk'], colour: true,
    // the laughing wooden mask: crescent eyes, a big grin with the loose jaw, round cheeks
    svg: free(P('M50 90c0-50 30-70 70-70s70 20 70 70c0 30-10 50-20 60H70c-10-10-20-30-20-60z', '#E2B676') + P('M70 150c10 40 90 40 100 0z', '#E2B676')
      + P('M70 78c10-12 26-12 34 0M136 78c8-12 24-12 34 0', 'none', 6) + P('M68 120c16 22 88 22 104 0', 'none', 6) + P('M120 86l-6 20h12z', '#C8A26B', 4)
      + E(66, 104, 12, 8, '#FF8FA3', 0) + E(174, 104, 12, 8, '#FF8FA3', 0) + Lc('M60 46c20-10 40-14 60-14', '#8D6E63', 4)) },
  { id: 'kr.culture.onggi', cat: 'culture', file: 'kr/culture-onggi.v1.svg', name: nm('โอ่งกิมจิ', 'Kimchi jar'), kw: ['kimchi', 'กิมจิ', 'onggi', 'โอ่ง', 'jar'], colour: true,
    // the round brown earthenware jar with its lid, a cabbage leaf peeking out
    svg: free(P('M60 70c-30 40-30 110 0 140h120c30-30 30-100 0-140z', '#795548') + E(120, 70, 64, 14, '#6D4C41') + P('M80 56c0-20 80-20 80 0z', '#8D6E63') + C(120, 40, 8, '#6D4C41')
      + P('M150 64c20-30 50-20 46 0-14 10-34 8-46 0z', '#C5E1A5', 4) + Lc('M70 120c30 8 70 8 100 0', '#A1887F', 4) + face(120, 150, 0.9)) },
  // ---------- Seoul
  { id: 'kr-seoul.stamp', cat: 'stamp', file: 'kr/seoul/stamp.v1.svg', name: nm('ตราประทับโซล', 'Seoul stamp'), kw: ['seoul', 'โซล'],
    svg: cityStamp('kse-st', { name: 'SEOUL', sub: 'KOREA', ...K, emblem: P('M52 140c20-24 40-30 48-30s28 6 48 30z', '#81C784') + R(97, 60, 6, 50, '#FFFDF7') + E(100, 74, 12, 6, '#C8102E') + P('M100 60v-12') + mugunghwa(70, 128, 0.35) }) },
  { id: 'kr-seoul.day.palace', cat: 'day', file: 'kr/seoul/day-palace.v1.svg', name: nm('พระราชวังคย็องบก', 'Gyeongbokgung palace'), kw: ['seoul', 'โซล', 'gyeongbokgung', 'คย็องบก', 'palace', 'พระราชวัง', 'gwanghwamun', 'hanbok'],
    // Gwanghwamun under Bugaksan: a stone base with three arches, two-tier green-and-red roof, the mountain behind
    svg: scene('kse-d1', '#E3F2FD', P('M-4 150c40-70 90-90 124-90s90 30 124 80v20H-4z', '#7CB342') + P('M70 90c20-30 40-36 50-36', 'none', 4)
      + R(36, 142, 168, 58, '#CFD8DC') + [70, 120, 170].map((x) => P(`M${x - 14} 200v-26c0-18 28-18 28 0v26z`, '#5D4037')).join('')
      + R(56, 116, 128, 26, '#E57373') + P('M30 120q90-34 180 0l-10 8H40z', '#43A047') + R(80, 92, 80, 20, '#E57373') + P('M62 96q58-28 116 0l-8 8H70z', '#43A047')
      + P('M-4 200h248v44H-4z', '#D7CCC8') + face(120, 156, 0.45, 'none')) },
  { id: 'kr-seoul.day.hanriver', cat: 'day', file: 'kr/seoul/day-hanriver.v1.svg', name: nm('แม่น้ำฮันยามค่ำ', 'Han River at night'), kw: ['han river', 'แม่น้ำฮัน', 'banpo', 'บันโพ', 'rainbow fountain', 'น้ำพุสายรุ้ง', 'yeouido', 'night'],
    // the Banpo bridge at night throwing rainbow arcs of water into the river, a crescent moon, the city lights
    svg: scene('kse-d2', '#283593', P('M190 40a20 20 0 1 0 14 34 16 16 0 1 1-14-34z', '#FFF59D') + [[30, 50], [70, 30], [150, 60], [110, 40]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('')
      + [[10, 90, 40], [54, 70, 30], [90, 100, 26], [150, 80, 30], [190, 96, 40]].map(([x, h, w]) => R(x, 150 - h, w, h, '#3949AB')).join('') + [[18, 70], [64, 90], [160, 80], [200, 64]].map(([x, y]) => R(x, y, 6, 6, '#FFD54A', 1, 0)).join('')
      + R(-4, 150, 248, 14, '#9FA8DA') + [40, 100, 160, 220].map((x) => R(x - 4, 164, 8, 30, '#9FA8DA', 0, 4)).join('')
      + ['#E57373', '#FFD54A', '#81C784', '#64B5F6'].map((c, i) => Lc(`M${30 + i * 50} 166c0 20 12 34 24 40`, c, 6)).join('')
      + P('M-4 196c30-6 60-6 90 0s60 6 90 0 50-6 68 0v50H-4z', '#1A237E')) },
  { id: 'kr-seoul.landmark.ntower', ch: '🗼', cat: 'landmark', file: 'kr/seoul/landmark-ntower.v1.svg', name: nm('เอ็นโซลทาวเวอร์', 'N Seoul Tower'), kw: ['n seoul tower', 'namsan', 'นัมซาน', 'โซลทาวเวอร์', 'seoul tower', 'love locks'], colour: true, spot: nm('หาหอคอยบนยอดเขา', 'Find the tower on the hill'),
    // the white needle on Namsan hill, its round observation deck, and the fence of love locks
    svg: free(P('M20 222c30-50 60-66 100-66s70 16 100 66z', '#81C784') + P('M110 160l4-110h12l4 110z', '#FFFDF7') + E(120, 62, 22, 12, '#B0BEC5') + R(108, 44, 24, 12, '#FFFDF7', 3) + P('M120 44V12') + C(120, 12, 4, '#E53935')
      + Lc('M30 214h180', INK, 4) + [44, 66, 88, 152, 174, 196].map((x, i) => C(x, 206, 6, ['#F48FB1', '#FFD54A', '#64B5F6', '#E57373', '#81C784', '#BA68C8'][i], 3)).join('') + face(120, 122, 0.4)) },
  { id: 'kr-seoul.landmark.myeongdong', cat: 'landmark', file: 'kr/seoul/landmark-myeongdong.v1.svg', name: nm('รถเข็นของกินเมียงดง', 'Myeongdong food stall'), kw: ['myeongdong', 'เมียงดง', 'street food', 'ของกินข้างทาง', 'night market', 'ตลาดกลางคืน', 'hotteok', 'ฮอตต็อก'], colour: true, spot: nm('หารถเข็นขายของกิน', 'Find a food cart'),
    // a street-food cart under an orange awning: skewers of fish cake, a griddle of hotteok pancakes, a steaming pot
    svg: free(R(30, 120, 180, 80, '#FFB74D', 8) + P('M20 70h200l-14 30H34z', '#FF7043') + Lc('M40 70l-6 30M80 70l-4 30M120 70v30M160 70l4 30M200 70l6 30', '#FFF3E0', 5)
      + R(40, 104, 90, 16, '#455A64', 4) + [58, 84, 110].map((x) => E(x, 104, 11, 6, '#D7A86E')).join('') + P('M150 104h44v16h-44z', '#90A4AE') + Lc('M160 96c-4-8 4-14 0-22M182 96c-4-8 4-14 0-22', '#B0BEC5', 4)
      + Lc('M28 120V60M212 120V60', '#8D6E63', 6) + C(60, 210, 12, '#5F6B7A') + C(180, 210, 12, '#5F6B7A') + face(120, 156, 0.8)) },
  { id: 'kr-seoul.landmark.bukchon', cat: 'landmark', file: 'kr/seoul/landmark-bukchon.v1.svg', name: nm('หมู่บ้านบุกชอนฮันอก', 'Bukchon hanok village'), kw: ['bukchon', 'บุกชอน', 'hanok', 'ฮันอก', 'traditional house', 'บ้านเกาหลี'], colour: true, spot: nm('หาหลังคากระเบื้องโค้งๆ', 'Find the curvy tiled roofs'),
    // a sloping lane of hanok: dark curved tile roofs, white walls with wooden lattice, a stone stair
    svg: free([[30, 120, 96], [104, 98, 110]].map(([x, y, w]) => R(x + 6, y, w - 12, 60, '#FFF8E1') + P(`M${x - 6} ${y + 4}q${w / 2 + 6}-30 ${w + 12} 0l-6 10H${x}z`, '#455A64') + R(x + 20, y + 16, 24, 24, '#D7A86E', 2, 3) + Lc(`M${x + 32} ${y + 16}v24M${x + 20} ${y + 28}h24`, '#8D6E63', 3)).join('')
      + P('M20 220l60-40h160v40z', '#BCAAA4') + Lc('M60 210h40M80 196h40M100 184h40', INK, 4) + face(160, 132, 0.5)) },
  { id: 'kr-seoul.landmark.lotteworld', cat: 'landmark', file: 'kr/seoul/landmark-lotteworld.v1.svg', name: nm('ล็อตเต้เวิลด์ทาวเวอร์', 'Lotte World Tower'), kw: ['lotte world tower', 'ล็อตเต้เวิลด์ทาวเวอร์', 'jamsil', 'จัมชิล', 'seoul sky', 'lotte world'], colour: true, spot: nm('หาตึกที่สูงที่สุดในโซล', 'Find the tallest building in Seoul'),
    // the tall tapered glass tower with the split crown, a lake at its foot
    svg: free(P('M90 210L112 14h16l22 196z', '#B3E5FC') + P('M112 14l8 40 8-40', 'none', 4) + Lc('M100 120h40M96 160h48M106 80h28', '#81D4FA', 4)
      + E(120, 214, 100, 12, '#64B5F6') + face(120, 150, 0.55)) },
  { id: 'kr-seoul.landmark.guard', cat: 'landmark', file: 'kr/seoul/landmark-guard.v1.svg', name: nm('ทหารยามวังโบราณ', 'Royal gate guard'), kw: ['royal guard', 'ทหารยาม', 'sumunjang', 'changing of the guard', 'เปลี่ยนเวร', 'gyeongbokgung'], colour: true, spot: nm('หาทหารยามชุดแดง', 'Find the guard in red'),
    // a gatekeeper in the red robe with the black wide-brim hat and its feather, holding a flag pole
    svg: free(P('M70 220c0-60 20-100 50-100s50 40 50 100z', '#E53935') + Lc('M84 170h72', '#FFD54A', 6) + C(120, 92, 32, '#FFE0BD')
      + E(120, 66, 56, 10, INK) + P('M96 64c0-24 48-24 48 0z', INK) + P('M150 50c16-20 34-14 30 0z', '#B3E5FC', 4)
      + Lc('M186 220V40', '#8D6E63', 6) + P('M186 44h34l-10 14 10 14h-34z', '#0047A0') + face(120, 96, 0.6)) },
];
export default {
  places: {
    kr: { country: 'kr', wave: 1, name: nm('เกาหลีใต้', 'South Korea'), tz: 'Asia/Seoul', alias: ['korea', 'south korea', 'เกาหลี', '한국'], colors: K },
    'kr-seoul': { country: 'kr', wave: 1, name: nm('โซล', 'Seoul'), tz: 'Asia/Seoul', ll: [37.57, 126.98], alias: ['seoul', 'โซล', '서울', 'myeongdong', 'เมียงดง', 'hongdae', 'ฮงแด', 'gangnam', 'คังนัม', 'insadong', 'jamsil', 'itaewon'], colors: K },
  },
  items,
};
