// Wave 9, Asia part 1: Singapore (the country and the city), Indonesia and Bali, Malaysia and Kuala Lumpur, the Maldives and its atolls.
// Mosques and the museum stand as buildings only, with no face on a house of prayer; no flags, no brands, no letters.
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (sg/singapore/landmark-helix.v1.svg → sg-singapore.landmark.helix)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const palm = (x, y, s = 1) => g(x, y, s, P('M0 0c-2-30 2-50 8-70', 'none') + Lc('M0 0c-2-30 2-50 8-70', '#8D6E63', 6) + ring(5, (k) => g(8, -70, 1, P('M0 0c10-6 26-4 36 6-12-2-24-2-36-6z', '#43A047', 2.5), k * 72)));
// a wavy sine strand for the Helix Bridge
const sinePath = (y0, a, ph) => 'M' + Array.from({ length: 25 }, (_, k) => `${(-4 + k * 10.3).toFixed(1)} ${(y0 + Math.sin(k * 0.62 + ph) * a).toFixed(1)}`).join('L');

const items = [
  // ---------- Singapore, the country
  K('sg.food.carrotcake', 'ไชเท้าก้วยผัดไข่ ทั้งแบบขาวและแบบดำ', 'Chai tow kway, fried carrot cake in white and black', ['carrot cake', 'แครอทเค้กสิงคโปร์', 'chai tow kway', 'ไชเท้าก้วย', 'radish cake', 'ขนมหัวผักกาด', 'fried with egg', 'ผัดกับไข่', 'sweet black sauce', 'ซีอิ๊วดำหวาน', 'hawker breakfast', 'อาหารเช้าฮอว์กเกอร์'],
    // a round plate split in two halves: on the left pale cubes of radish cake fried with yellow egg and green spring onion, on the right glossy dark brown cubes in sweet black sauce, a metal spatula resting on the rim, one cube with a face
    E(120, 140, 100, 70, '#FFFFFF', 4) + E(120, 140, 84, 56, '#E3F2FD', 2.5)
      + ring(7, (k) => R(52 + (k % 4) * 16, 112 + Math.floor(k / 4) * 22 + (k % 2) * 6, 14, 12, k % 2 ? '#FFF8E1' : '#FFE082', 3, 2))
      + ring(7, (k) => R(130 + (k % 4) * 16, 112 + Math.floor(k / 4) * 22 + (k % 2) * 6, 14, 12, k % 2 ? '#5D4037' : '#795548', 3, 2))
      + ring(5, (k) => C(64 + k * 12, 168 - (k % 2) * 6, 3, '#66BB6A', 0)) + Lc('M120 92v96', '#B0BEC5', 2)
      + g(120, 140, 1, R(-14, -12, 28, 24, '#FFF8E1', 5, 3) + face(0, -2, 0.3))
      + g(196, 72, 1, R(-22, -12, 44, 24, '#B0BEC5', 3, 3) + Lc('M0 12l30 34', '#6D4C41', 7), 20)),
  K('sg.animal.horseshoecrab', 'แมงดาทะเลบนหาดเลนป่าชายเลน', 'A horseshoe crab on the mangrove mudflat', ['horseshoe crab', 'แมงดาทะเล', 'living fossil', 'ฟอสซิลมีชีวิต', 'mangrove mudflat', 'หาดเลนป่าชายเลน', 'chek jawa', 'เชกจาวา', 'pulau ubin', 'เกาะอูบิน', 'long spiky tail', 'หางแหลมยาว'],
    // a brown-green horseshoe crab seen from above: a wide horseshoe-shaped dome at the front, a smaller hinged back plate with little side spines and a long straight spiky tail, a sweet face on the dome, on grey mud with ripples
    E(120, 196, 104, 30, '#A1887F', 0) + Lc('M30 212c20-6 40 6 60 0M150 214c20-6 40 6 60 0', '#8D6E63', 2.5)
      + Lc('M120 166v66', '#6D4C41', 7) + Lc('M120 166v66', '#A1887F', 3)
      + P('M82 118h76l-8 36-30 18-30-18z', '#8D8048', 3.5) + ring(3, (k) => Lc(`M${84 + k * 3} ${126 + k * 10}l-10 2M${156 - k * 3} ${126 + k * 10}l10 2`, INK, 2.5))
      + P('M30 120c0-56 40-86 90-86s90 30 90 86c-20-8-40-4-50 2h-80c-10-6-30-10-50-2z', '#A39B52', 3.5)
      + P('M60 110c8-40 32-58 60-58s52 18 60 58', 'none', 2.5) + C(84, 70, 4, INK, 0) + C(156, 70, 4, INK, 0) + face(120, 92, 0.55)),
  K('sg.culture.tingkat', 'ปิ่นโตเคลือบลายดอกไม้แบบเปอรานากัน', 'A tingkat, the flowery enamel tiffin carrier', ['tingkat', 'ติงกัต', 'tiffin carrier', 'ปิ่นโต', 'enamel', 'เคลือบสี', 'peranakan', 'เปอรานากัน', 'nyonya food', 'อาหารย่าหยา', 'lunch to share', 'ข้าวกล่องไปแบ่งกัน'],
    // three round enamel food tiers stacked in a metal frame with a carrying handle on top, pink, mint and pink, each painted with little flowers, the middle tier smiling
    Lc('M72 64v136M168 64v136', '#90A4AE', 6) + P('M72 64c0-40 96-40 96 0', 'none', 0) + Lc('M72 64c0-40 96-40 96 0', '#90A4AE', 7) + Lc('M72 64c0-40 96-40 96 0', INK, 0)
      + ring(3, (k) => { const y = 82 + k * 42; const c = k === 1 ? '#80CBC4' : '#F48FB1'; return R(64, y, 112, 40, c, 10, 3.5) + Lc(`M64 ${y + 6}h112`, '#FFFFFF', 3) + (k === 1 ? '' : ring(3, (j) => g(88 + j * 32, y + 22, 1, ring(5, (p) => C(Math.cos(p * 1.26) * 5, Math.sin(p * 1.26) * 5, 3.2, '#FFF59D', 0)) + C(0, 0, 2.5, '#E53935', 0)))); })
      + E(120, 82, 56, 8, '#F8BBD0', 3) + C(120, 76, 6, '#90A4AE', 2.5) + face(120, 140, 0.55)
      + Lc('M64 210h112', '#90A4AE', 6)),

  // ---------- Singapore, the city
  L('sg/singapore/landmark-helix.v1.svg', 'สะพานเฮลิกซ์ที่บิดเป็นเกลียวเหมือนดีเอ็นเอ', 'The Helix Bridge that twists like DNA', ['helix bridge', 'สะพานเฮลิกซ์', 'double helix', 'เกลียวคู่', 'dna bridge', 'สะพานดีเอ็นเอ', 'bayfront walk', 'ทางเดินริมอ่าว', 'footbridge lights', 'ไฟบนสะพานคนเดิน', 'viewing pods', 'จุดชมวิวบนสะพาน'], 'หาเกลียวสองเส้นที่พันกันเหมือนเชือก', 'Find the two spirals twisting round each other',
    // an evening sky, the bay below, a long footbridge seen from the side: a pink strand and a teal strand weaving over and under each other, little steel rings joining them, the deck with children walking across, lights on the water
    sky('#5C6BC0') + C(196, 40, 14, '#FFF9C4', 0) + R(-4, 160, 248, 84, '#283593', 0, 0) + Lc('M-4 160h248', INK, 3)
      + ring(5, (k) => Lc(`M${10 + k * 52} 190h22`, '#FFD54F', 3))
      + ring(13, (k) => Lc(`M${-4 + k * 20.6} ${100 + Math.sin(k * 1.24) * 26}L${-4 + k * 20.6} ${100 - Math.sin(k * 1.24) * 26}`, '#CFD8DC', 2))
      + Lc(sinePath(100, 26, 0), '#4DD0E1', 6) + Lc(sinePath(100, -26, 0), '#F06292', 6)
      + R(-4, 128, 248, 10, '#90A4AE', 0, 3) + ring(4, (k) => R(20 + k * 64, 138, 8, 30, '#78909C', 0, 2.5))
      + kid(70, 126, '#FFCA28', 0.8) + kid(150, 126, '#66BB6A', 0.8)),
  L('sg/singapore/landmark-fortcanning.v1.svg', 'มองขึ้นไปในอุโมงค์ต้นไม้ที่ฟอร์ตแคนนิง', 'Looking up the tree tunnel at Fort Canning', ['fort canning', 'ฟอร์ตแคนนิง', 'tree tunnel', 'อุโมงค์ต้นไม้', 'spiral staircase', 'บันไดวน', 'looking up', 'มองขึ้นข้างบน', 'fort canning park', 'สวนฟอร์ตแคนนิง', 'green circle of leaves', 'วงใบไม้สีเขียว'], 'หาท้องฟ้าวงกลมเล็กๆ ตรงกลาง', 'Find the little round sky in the middle',
    // looking straight up from the bottom of a round brick shaft: a brick ring, a spiral of stairs and railing climbing round, a ring of green leaves at the top and a small circle of blue sky with a bird in it
    sky('#8D6E63') + C(120, 120, 108, '#BCAAA4', 4) + ring(12, (k) => Lc(`M${(120 + Math.cos(k * 0.52) * 84).toFixed(1)} ${(120 + Math.sin(k * 0.52) * 84).toFixed(1)}L${(120 + Math.cos(k * 0.52) * 108).toFixed(1)} ${(120 + Math.sin(k * 0.52) * 108).toFixed(1)}`, '#8D6E63', 2.5))
      + C(120, 120, 84, '#ECEFF1', 3.5) + ring(18, (k) => Lc(`M${(120 + Math.cos(k * 0.35) * 62).toFixed(1)} ${(120 + Math.sin(k * 0.35) * 62).toFixed(1)}L${(120 + Math.cos(k * 0.35 + 0.2) * 84).toFixed(1)} ${(120 + Math.sin(k * 0.35 + 0.2) * 84).toFixed(1)}`, '#90A4AE', 2.5))
      + C(120, 120, 62, '#43A047', 3.5) + ring(10, (k) => C(120 + Math.cos(k * 0.63) * 50, 120 + Math.sin(k * 0.63) * 50, 14, k % 2 ? '#66BB6A' : '#7CB342', 2.5))
      + C(120, 120, 32, '#81D4FA', 3.5) + P('M108 118c4-6 8-6 12 0 4-6 8-6 12 0', 'none', 2.5) + face(120, 128, 0.24, 'none')),
  L('sg/singapore/landmark-buangkok.v1.svg', 'กัมปงลอรองบวงก๊ก หมู่บ้านไม้แห่งสุดท้าย', 'Kampong Lorong Buangkok, the last wooden village', ['kampong lorong buangkok', 'กัมปงลอรองบวงก๊ก', 'last kampong', 'หมู่บ้านดั้งเดิมแห่งสุดท้าย', 'zinc roof', 'หลังคาสังกะสี', 'wooden house', 'บ้านไม้', 'kampong chickens', 'ไก่บ้าน', 'old singapore', 'สิงคโปร์สมัยก่อน'], 'หาไก่ที่เดินอยู่หน้าบ้าน', 'Find the hen walking in front of the house',
    // a pale sky, a wooden house painted mint with a sloping silver zinc roof, raised on short legs, a blue door and window shutters, a banana plant and a coconut tree, a dirt path and a hen with chicks
    sky('#E1F5FE') + palm(208, 160, 1) + R(-4, 160, 248, 84, '#AED581', 0, 0) + P('M90 244c10-40 20-70 40-84h20c-10 20-16 50-12 84z', '#D7B98E', 0)
      + R(40, 110, 130, 56, '#A5D6A7', 0, 3.5) + ring(4, (k) => R(48 + k * 32, 166, 6, 14, '#6D4C41', 0, 2))
      + P('M26 112l60-40h66l32 40z', '#CFD8DC', 3.5) + ring(5, (k) => Lc(`M${66 + k * 20} ${76 + k * 2}l-10 34`, '#90A4AE', 2))
      + R(70, 126, 24, 40, '#42A5F5', 0, 3) + R(116, 124, 34, 22, '#FFF8E1', 0, 3) + Lc('M133 124v22', INK, 2.5) + face(110, 152, 0.3)
      + g(28, 160, 1, Lc('M0 0v-40', '#7CB342', 6) + P('M0-40c-20-10-28 0-30 10 10-2 20-4 30-10zM0-36c20-14 30-4 30 6-10-2-20-2-30-6z', '#8BC34A', 2.5))
      + g(156, 210, 1, E(0, 0, 16, 12, '#FFF8E1', 2.5) + C(14, -10, 7, '#FFF8E1', 2.5) + P('M14-18l3-5 3 5z', '#E53935', 1.5) + P('M21-10l6 2-6 2z', '#FFB300', 1.5) + C(15, -11, 1.5, INK, 0))
      + ring(2, (k) => C(186 + k * 14, 220, 6, '#FFEB3B', 2))),
  L('sg/singapore/landmark-pinnacle.v1.svg', 'สะพานลอยฟ้าเชื่อมตึกแฟลตพินนาเคิลแอทดักซ์ตัน', 'The sky bridges joining the Pinnacle@Duxton flats', ['pinnacle at duxton', 'พินนาเคิลแอทดักซ์ตัน', 'hdb flats', 'แฟลตเอชดีบี', 'sky garden', 'สวนลอยฟ้า', 'sky bridge', 'สะพานลอยฟ้า', 'public housing', 'บ้านการเคหะ', 'tanjong pagar', 'ตันจงปาการ์'], 'หาสวนต้นไม้บนสะพานที่สูงมาก', 'Find the trees growing on the bridge way up high',
    // five tall pale flat towers in a row with neat window grids, two long sky bridges joining them, one in the middle and one at the very top, both with little green trees and a child waving from the top one
    sky('#B3E5FC') + R(-4, 214, 248, 30, '#B0BEC5', 0, 0)
      + ring(5, (k) => R(10 + k * 46, 30 + (k % 2) * 8, 38, 186, ['#FFF8E1', '#ECEFF1', '#FFF3E0', '#ECEFF1', '#FFF8E1'][k], 0, 3) + ring(6, (j) => Lc(`M${14 + k * 46} ${60 + j * 26 + (k % 2) * 8}h30`, '#90A4AE', 2)))
      + R(4, 120, 232, 12, '#B0BEC5', 0, 3) + R(4, 26, 232, 12, '#B0BEC5', 0, 3)
      + ring(6, (k) => C(18 + k * 42, 112, 8, '#66BB6A', 2.5) + C(18 + k * 42, 18, 8, '#43A047', 2.5))
      + kid(140, 22, '#E53935', 0.7) + face(83, 180, 0.35)),
  L('sg/singapore/landmark-eastcoast.v1.svg', 'ปิ้งย่างและปั่นจักรยานที่อีสต์โคสต์พาร์ก', 'Barbecue pits and bikes at East Coast Park', ['east coast park', 'อีสต์โคสต์พาร์ก', 'bbq pit', 'เตาบาร์บีคิว', 'cycling path', 'ทางจักรยาน', 'ships at anchor', 'เรือจอดทอดสมอ', 'family picnic', 'ปิกนิกครอบครัว', 'chicken wings', 'ปีกไก่ย่าง'], 'หาเรือลำใหญ่ที่จอดอยู่กลางทะเล', 'Find the big ships waiting far out at sea',
    // a sunny shore with big cargo ships waiting on the horizon, a casuarina tree, a round concrete barbecue pit with a grill and chicken wings, smoke curling, and a bicycle on the path in front
    sky('#B3E5FC') + R(-4, 92, 248, 50, '#4FC3F7', 0, 0) + Lc('M-4 92h248', INK, 3)
      + g(50, 86, 1, R(-26, -6, 52, 10, '#EF5350', 0, 2.5) + R(-16, -18, 24, 12, '#FFCA28', 0, 2)) + g(176, 88, 0.8, R(-30, -6, 60, 10, '#5C6BC0', 0, 2.5) + R(-8, -20, 26, 14, '#FFFFFF', 0, 2))
      + R(-4, 140, 248, 104, '#FFE0B2', 0, 0) + Lc('M-4 140h248', INK, 3) + R(-4, 210, 248, 20, '#B0BEC5', 0, 2.5)
      + g(36, 200, 1, Lc('M0 0v-70', '#6D4C41', 6) + P('M-26-60c4-20 48-20 52 0-6-6-12 0-26-4-14 4-20-2-26 4z', '#558B2F', 3))
      + E(130, 180, 46, 14, '#BDBDBD', 3) + P('M84 180v18c0 8 92 8 92 0v-18', '#9E9E9E', 3) + E(130, 178, 38, 10, '#5D4037', 2.5) + ring(4, (k) => Lc(`M${100 + k * 20} 170v16`, '#90A4AE', 2))
      + ring(3, (k) => E(108 + k * 22, 176, 8, 5, '#FF8A65', 2)) + Lc('M110 160c-6-10 6-14 0-24M140 158c-6-10 6-14 0-24', '#ECEFF1', 4) + face(130, 194, 0.3)
      + g(196, 218, 1, C(-18, 0, 11, 'none', 3) + C(18, 0, 11, 'none', 3) + Lc('M-18 0l12-16h20l4 16M-6-16l-4-6M14-16v-8', '#26A69A', 3))),

  // ---------- Indonesia, the country
  K('id.food.bakso', 'บักโซ ซุปลูกชิ้นเนื้อจากรถเข็น', 'Bakso, meatball soup from the street cart', ['bakso', 'บักโซ', 'meatball soup', 'ซุปลูกชิ้น', 'gerobak cart', 'รถเข็นเกอโรบัก', 'tofu and noodles', 'เต้าหู้และเส้น', 'sambal', 'ซัมบัล', 'street food', 'อาหารริมทาง'],
    // a deep white bowl with a green rim, clear broth, glass noodles, three big round brown meatballs (the biggest one smiling), fried tofu, spring onion, a china spoon and a little dish of red sambal beside
    P('M28 110h184c0 60-40 96-92 96s-92-36-92-96z', '#FFFFFF', 4) + Lc('M32 124h176', '#66BB6A', 4) + E(120, 110, 92, 18, '#FFE082', 3.5)
      + Lc('M50 110c20-8 40 8 60 0s40 8 60-2', '#FFF8E1', 3) + C(86, 94, 22, '#8D6E63', 3.5) + C(150, 98, 18, '#795548', 3.5) + C(120, 80, 26, '#A1887F', 3.5) + face(120, 78, 0.45)
      + R(46, 96, 20, 14, '#FFB74D', 3, 2.5) + ring(5, (k) => C(66 + k * 22, 108 - (k % 2) * 4, 3, '#43A047', 0))
      + g(196, 70, 1, P('M-8-30c0-8 16-8 16 0v28c0 6-16 6-16 0z', '#FFFFFF', 3), 30) + E(52, 216, 22, 9, '#FFFFFF', 3) + E(52, 213, 14, 4, '#E53935', 0)),
  K('id.food.tempe', 'เทมเป้ ถั่วเหลืองหมักห่อใบตอง', 'Tempeh, soybean cakes wrapped in banana leaf', ['tempeh', 'เทมเป้', 'tempe goreng', 'เทมเป้ทอด', 'fermented soybean', 'ถั่วเหลืองหมัก', 'banana leaf wrap', 'ห่อใบตอง', 'java', 'ชวา', 'crispy slices', 'แผ่นทอดกรอบ'],
    // an opened banana-leaf parcel showing a pale cream block of tempeh dotted with soybeans, smiling, and beside it three golden fried slices on a little plate
    P('M20 130l60-70 100 10 40 70-60 60-110-10z', '#7CB342', 4) + Lc('M30 132l170 6', '#558B2F', 2.5)
      + R(62, 92, 110, 66, '#FFF8E1', 10, 3.5) + ring(12, (k) => E(76 + (k % 6) * 17, 106 + Math.floor(k / 6) * 34 + (k % 2) * 6, 5, 4, '#E6C38F', 1.5)) + face(117, 126, 0.5)
      + E(176, 206, 46, 12, '#FFFFFF', 3) + ring(3, (k) => g(150 + k * 24, 196, 1, R(-12, -8, 24, 16, '#E0A040', 4, 2.5) + C(-4, -2, 2, '#A1673F', 0) + C(4, 3, 2, '#A1673F', 0), -10 + k * 10))),
  K('id.animal.cendrawasih', 'นกการเวกสวรรค์แห่งปาปัว', 'A bird of paradise from Papua', ['bird of paradise', 'นกการเวก', 'cendrawasih', 'เจินดราวาซิห์', 'papua', 'ปาปัว', 'raja ampat', 'ราจาอัมพัต', 'golden plumes', 'ขนพู่สีทอง', 'courtship dance', 'เต้นอวดคู่'],
    // a bird with a yellow head, an emerald green throat and a brown body perched on a branch, two great sprays of golden-yellow plumes spilling from its sides and two long thin tail wires curling down, a kawaii face
    Lc('M20 170c60-10 140-6 200 6', '#6D4C41', 8)
      + ring(2, (s) => ring(3, (j) => { const k = 2 - j; return P(`M120 128c${(s ? 1 : -1) * (30 + k * 16)} 10 ${(s ? 1 : -1) * (70 + k * 14)} ${40 + k * 10} ${(s ? 1 : -1) * (50 + k * 18)} ${80 + k * 6}c${(s ? -1 : 1) * 20} -10 ${(s ? -1 : 1) * 40} -40 ${(s ? -1 : 1) * (50 + k * 18)} -${80 + k * 6}z`, ["#FFB300", "#FFD54F", "#FFE082"][k], 2.5); }))
      + Lc('M118 150c-10 40-40 50-50 70M126 150c10 40 40 50 52 70', INK, 2.5)
      + E(120, 120, 30, 34, '#8D6E63', 3.5) + E(120, 112, 18, 18, '#26A69A', 0) + C(120, 82, 24, '#FFEE58', 3.5) + face(120, 82, 0.4) + P('M116 92l4 8 4-8z', '#B0BEC5', 1.5)),
  K('id.culture.tongkonan', 'บ้านตงโกนันหลังคาโค้งเหมือนเรือของชาวโตราจา', 'Tongkonan, the Toraja house with a boat-shaped roof', ['tongkonan', 'ตงโกนัน', 'toraja', 'โตราจา', 'sulawesi', 'สุลาเวสี', 'boat-shaped roof', 'หลังคาทรงเรือ', 'carved wooden house', 'บ้านไม้แกะสลัก', 'rice barn', 'ยุ้งข้าว'],
    // a wooden house high on stilts, its walls carved and painted in red, black, yellow and white triangles and spirals, under a huge dark roof that sweeps up at both ends like a boat, a smiling face on the wall
    P('M8 62c30 30 60 40 112 40s82-10 112-40c-10 30-20 44-30 50H38c-10-6-20-20-30-50z', '#4E342E', 4) + Lc('M30 84c30 14 60 18 90 18s60-4 90-18', '#795548', 2.5)
      + R(52, 112, 136, 54, '#C62828', 0, 3.5) + ring(8, (k) => P(`M${52 + k * 17} 112l8.5 14 8.5-14z`, '#212121', 1.5) + P(`M${52 + k * 17} 166l8.5-14 8.5 14z`, '#FFCA28', 1.5))
      + ring(3, (k) => P(`M${84 + k * 36} 140c0-8 10-8 10 0s-14 8-14-2`, 'none', 0) + Lc(`M${80 + k * 36} 140c0-8 10-8 10 0s-14 8-14-2`, '#FFFFFF', 2.5)) + face(120, 136, 0.4)
      + ring(5, (k) => R(60 + k * 28, 166, 8, 46, '#6D4C41', 0, 2.5)) + Lc('M40 212h160', '#8D6E63', 4)),

  // ---------- Bali
  L('id/bali/landmark-yellowbridge.v1.svg', 'สะพานเหลืองข้ามช่องแคบระหว่างเกาะเลมโบงันกับเจนิงกัน', 'The yellow bridge between Lembongan and Ceningan', ['yellow bridge', 'สะพานเหลือง', 'nusa lembongan', 'นูซาเลมโบงัน', 'nusa ceningan', 'นูซาเจนิงกัน', 'scooter crossing', 'ขี่สกู๊ตเตอร์ข้ามสะพาน', 'seaweed farms', 'ฟาร์มสาหร่าย', 'turquoise strait', 'ช่องแคบสีฟ้าคราม'], 'หาสะพานสีเหลืองกับสกู๊ตเตอร์', 'Find the yellow bridge and the scooter on it',
    // a turquoise strait between two green islands, a long narrow footbridge on posts with bright yellow railings, a family on a scooter crossing, square seaweed plots marked with stakes in the shallow water below
    sky('#E1F5FE') + P('M-4 100c20-20 40-20 60 0v40H-4z', '#7CB342', 3) + P('M244 96c-20-20-40-20-60 0v44h60z', '#7CB342', 3) + R(-4, 120, 248, 124, '#4DD0E1', 0, 0) + Lc('M-4 120h248', INK, 3)
      + ring(4, (k) => R(20 + k * 54, 170, 40, 40, '#26C6DA', 0, 2) + ring(3, (j) => Lc(`M${24 + k * 54 + j * 14} 170v40`, '#7CB342', 2)))
      + R(40, 112, 160, 8, '#FFF59D', 0, 3) + ring(6, (k) => R(48 + k * 28, 120, 6, 30, '#90A4AE', 0, 2))
      + Lc('M40 98h160', '#FFD600', 5) + ring(9, (k) => Lc(`M${40 + k * 20} 98v14`, '#FFD600', 4))
      + g(110, 112, 1, C(-14, -4, 6, '#424242', 2) + C(14, -4, 6, '#424242', 2) + P('M-16-8l6-12h20l8 12z', '#E53935', 2.5) + kid(-2, -12, '#29B6F6', 0.6) + kid(10, -12, '#FFCA28', 0.5))),
  L('id/bali/landmark-padangpadang.v1.svg', 'บันไดลงหาดปาดังปาดังผ่านซอกหิน', 'The rock-crack stairs down to Padang Padang beach', ['padang padang', 'หาดปาดังปาดัง', 'rock crevice', 'ซอกหิน', 'stairs to the beach', 'บันไดลงหาด', 'hidden cove', 'อ่าวลับ', 'bukit peninsula', 'คาบสมุทรบูกิต', 'white sand', 'ทรายขาว'], 'หาทางเดินแคบๆ ระหว่างหินสองก้อน', 'Find the narrow way between the two rocks',
    // two tall grey rock walls almost touching, a narrow stone staircase squeezing down between them, and through the gap a bright slice of blue sea, white sand and a surfer's wave, a child stepping down
    sky('#81D4FA') + R(-4, 120, 248, 60, '#29B6F6', 0, 0) + Lc('M90 140c10-8 20-8 30 0s20 8 30 0', '#FFFFFF', 3) + R(-4, 170, 248, 74, '#FFF3E0', 0, 0)
      + P('M-4-4h108c-6 40 4 80-4 120-6 40-2 80-10 128H-4z', '#9E9E9E', 3.5) + P('M244-4H140c8 40-2 80 6 120 6 40 2 80 10 128h88z', '#BDBDBD', 3.5)
      + ring(6, (k) => R(100 + k * 2, 140 + k * 16, 40 - k * 2, 8, '#D7CCC8', 0, 2.5))
      + ring(4, (k) => C(30 + k * 10, 40 + k * 46, 7, '#558B2F', 2) + C(214 - k * 8, 60 + k * 40, 7, '#7CB342', 2)) + face(50, 120, 0.4, 'none')
      + kid(122, 168, '#FF7043', 0.9)),
  L('id/bali/landmark-celuk.v1.svg', 'ช่างเงินหมู่บ้านเจลุกทำเครื่องประดับลายเส้น', 'The silversmiths of Celuk village', ['celuk', 'เจลุก', 'silversmith', 'ช่างเงิน', 'silver jewellery', 'เครื่องประดับเงิน', 'filigree', 'ลายฉลุเส้นเงิน', 'tiny silver dots', 'ลายเม็ดเงิน', 'gianyar', 'เกียนยาร์'], 'หาค้อนเล็กๆ ของช่างเงิน', 'Find the silversmith’s tiny hammer',
    // a wooden workbench seen close up: a wide silver cuff bracelet covered in swirls and tiny dots with a happy face, a silver ring with a curl, a small hammer, pliers and a little anvil, coils of silver wire
    sky('#FFF8E1') + R(-4, 150, 248, 94, '#C68B59', 0, 3) + Lc('M-4 180h248M-4 214h248', '#A1673F', 2)
      + g(110, 120, 1, P('M-60-10c0-30 120-30 120 0v40c0-30-120-30-120 0z', '#ECEFF1', 3.5) + E(0, 30, 60, 20, '#CFD8DC', 3) + ring(4, (k) => P(`M${-44 + k * 26} 0c6-8 14 0 6 6s-12-2-6-6`, 'none', 2)) + ring(9, (k) => C(-48 + k * 12, 16, 2, '#B0BEC5', 0)) + face(0, 4, 0.35))
      + g(196, 196, 1, R(-16, -6, 32, 14, '#78909C', 3, 3) + R(-8, 8, 16, 14, '#78909C', 0, 3))
      + g(46, 200, 1, R(-30, -6, 34, 12, '#9E9E9E', 3, 2.5) + Lc('M4 0h34', '#8D6E63', 6), -20)
      + g(196, 110, 1, C(0, 0, 18, 'none', 0) + Lc('M0-18a18 18 0 1 1-1 0', '#CFD8DC', 6) + C(0, -20, 6, '#ECEFF1', 2.5))
      + ring(3, (k) => C(150 + k * 10, 208, 6 - k, 'none', 2))),
  L('id/bali/landmark-seminyak.v1.svg', 'บีนแบ็กกับร่มสีสดดูพระอาทิตย์ตกที่หาดเซมินยัก', 'Beanbags and bright umbrellas at a Seminyak sunset', ['seminyak', 'เซมินยัก', 'double six beach', 'หาดดับเบิลซิกซ์', 'beanbags', 'บีนแบ็ก', 'beach umbrellas', 'ร่มชายหาด', 'sunset on the sand', 'พระอาทิตย์ตกริมทราย', 'petitenget', 'เปอติเตงเกต'], 'หาบีนแบ็กที่มีเด็กนั่งอยู่', 'Find the beanbag with a child sitting on it',
    // a pink and orange sunset with the sun half in the sea, a row of rainbow-striped umbrellas on the sand, plump coloured beanbags beneath them, a string of little lights, a child relaxing in a beanbag
    sky('#FFAB91') + C(120, 116, 34, '#FFEB3B', 3) + R(-4, 116, 248, 40, '#7986CB', 0, 0) + Lc('M-4 116h248', INK, 3) + R(-4, 152, 248, 92, '#FFE0B2', 0, 0) + Lc('M-4 152h248', INK, 3)
      + Lc('M-4 40c40 20 80 24 124 20s84-10 124-30', '#5D4037', 2) + ring(8, (k) => C(16 + k * 30, 48 + Math.sin(k) * 4, 4, ['#FFEB3B', '#FF80AB', '#80DEEA'][k % 3], 1.5))
      + ring(3, (k) => g(40 + k * 80, 150, 1, Lc('M0 0v40', INK, 3) + P('M-32 0c0-26 64-26 64 0z', ['#EF5350', '#29B6F6', '#AB47BC'][k], 3) + Lc('M-10-20l2 20M10-20l-2 20', '#FFFFFF', 4)))
      + ring(3, (k) => P(`M${20 + k * 80} 220c-4-24 40-28 44 0z`, ['#FFCA28', '#66BB6A', '#FF7043'][k], 3))
      + kid(122, 206, '#FFFFFF', 1) + face(42, 214, 0.25)),

  // ---------- Malaysia, the country
  K('my.food.ketupat', 'เกอตูปัต ข้าวอัดในใบมะพร้าวสาน', 'Ketupat, rice cooked in woven palm-leaf cases', ['ketupat', 'เกอตูปัต', 'woven palm leaf', 'ใบมะพร้าวสาน', 'compressed rice', 'ข้าวอัด', 'open house', 'งานเปิดบ้าน', 'rendang', 'เรินดัง', 'with satay', 'กินกับสะเต๊ะ'],
    // three diamond-shaped pouches woven from pale green palm leaf in a checked weave, their leaf tails trailing, and one cut in half showing the pressed white rice, which smiles
    ring(2, (k) => g(70 + k * 100, 90, 1, P('M0-40l40 40-40 40-40-40z', '#C5E1A5', 3.5) + Lc('M-20-20l40 40M-20 20l40-40M0-40v80', '#9CCC65', 2) + Lc('M0-40c10-20 20-24 30-26M0-40c-6-16-4-26 0-34', '#8BC34A', 4), k ? 10 : -10))
      + g(120, 172, 1, P('M-44-6l44-34 44 34-44 34z', '#C5E1A5', 3.5) + P('M-34-4l34-26 34 26-34 26z', '#FFFFFF', 3) + ring(3, (k) => Lc(`M${-22 + k * 22} -10v14`, '#ECEFF1', 2)) + face(0, -4, 0.32))),
  K('my.food.bahulu', 'กุยห์บาฮูลู ขนมไข่รูปปลาและดอกไม้', 'Kuih bahulu, little egg cakes shaped like fish and flowers', ['kuih bahulu', 'กุยห์บาฮูลู', 'egg sponge cake', 'ขนมไข่', 'fish shape', 'รูปปลา', 'flower mould', 'พิมพ์ดอกไม้', 'brass mould', 'พิมพ์ทองเหลือง', 'festive treats', 'ขนมเทศกาล'],
    // a dark brass baking mould with flower-shaped and fish-shaped hollows, three golden sponge cakes lifted out in front, a scalloped flower cake with a face and a little fish cake with scales
    R(30, 40, 180, 90, '#6D4C41', 14, 4) + ring(3, (k) => g(66 + k * 54, 70, 1, ring(8, (p) => C(Math.cos(p * 0.785) * 14, Math.sin(p * 0.785) * 14, 8, '#4E342E', 0)) + C(0, 0, 14, '#4E342E', 0)))
      + ring(3, (k) => g(66 + k * 54, 108, 1, E(0, 0, 18, 9, '#4E342E', 0) + P('M16 0l10-8v16z', '#4E342E', 0)))
      + g(84, 180, 1, ring(8, (p) => C(Math.cos(p * 0.785) * 22, Math.sin(p * 0.785) * 22, 12, '#FFB74D', 3)) + C(0, 0, 24, '#FFB74D', 0) + face(0, -2, 0.42))
      + g(170, 186, 1, E(0, 0, 32, 18, '#FFA726', 3) + P('M28 0l18-14v28z', '#FFA726', 3) + Lc('M-6-10c6 4 6 16 0 20M6-10c6 4 6 16 0 20', '#E65100', 2) + C(-18, -4, 3, INK, 0))),
  K('my.animal.binturong', 'บินตุรง หมีขอหางยาวที่ตัวหอมเหมือนป๊อปคอร์น', 'A binturong, the bearcat that smells of popcorn', ['binturong', 'บินตุรง', 'bearcat', 'หมีขอ', 'popcorn smell', 'กลิ่นป๊อปคอร์น', 'gripping tail', 'หางจับกิ่งไม้', 'rainforest canopy', 'เรือนยอดป่าฝน', 'taman negara', 'ทามันเนอการา'],
    // a shaggy black binturong lying along a thick branch, long bushy tail curled round the wood, tufted ears, long white whiskers, a sleepy smiling face, a few popcorn puffs floating by
    Lc('M10 150c60 6 160 0 220-14', '#8D6E63', 14) + Lc('M10 150c60 6 160 0 220-14', INK, 0)
      + P('M60 144c-10-30 10-56 60-56s76 20 74 50z', '#424242', 3.5) + P('M60 140c-30 10-40 30-24 40 14 8 30-4 30-16', 'none', 0) + Lc('M66 142c-30 6-40 28-24 40 12 8 26-2 28-12', '#424242', 14) + Lc('M66 142c-30 6-40 28-24 40 12 8 26-2 28-12', INK, 0)
      + C(184, 108, 30, '#616161', 3.5) + P('M164 86l-6-20 14 10zM204 86l6-20-14 10z', '#616161', 3) + E(196, 118, 12, 9, '#9E9E9E', 2.5) + C(204, 116, 3, INK, 0)
      + Lc('M196 122l30-4M196 126l30 4M190 124l-26 6', '#FFFFFF', 1.5) + face(180, 104, 0.4)
      + ring(3, (k) => g(40 + k * 40, 50 + (k % 2) * 16, 1, C(-4, 0, 6, '#FFF8E1', 2) + C(4, -2, 6, '#FFF8E1', 2) + C(0, 4, 6, '#FFF59D', 2)))),
  K('my.culture.bungatelur', 'บุหงาเตอลูร์ ไข่ประดับดอกไม้ของงานแต่งมลายู', 'Bunga telur, the egg flowers of a Malay wedding', ['bunga telur', 'บุหงาเตอลูร์', 'egg flowers', 'ไข่ประดับดอกไม้', 'malay wedding', 'งานแต่งงานมลายู', 'wedding gift', 'ของชำร่วย', 'paper flowers', 'ดอกไม้กระดาษ', 'pulut kuning', 'ข้าวเหนียวเหลือง'],
    // a golden pot full of yellow sticky rice with tall thin stems rising like a bouquet, each stem holding a little cup with a decorated egg and a pink paper flower, the middle egg bigger and smiling
    P('M70 170h100l-12 50H82z', '#FFC107', 3.5) + E(120, 170, 50, 10, '#FFEB3B', 3)
      + ring(5, (k) => { const a = -1.1 + k * 0.55, x = 120 + Math.sin(a) * 80, y = 168 - Math.cos(a) * 110; return Lc(`M120 168L${x.toFixed(1)} ${y.toFixed(1)}`, '#7CB342', 3) + g(x, y, 1, P('M-12 0h24l-4 12h-16z', '#E91E63', 2.5) + E(0, -8, 9, 11, '#FFF8E1', 2.5) + ring(5, (p) => C(Math.cos(p * 1.26) * 14, -18 + Math.sin(p * 1.26) * 8, 5, '#F48FB1', 1.5))); })
      + g(120, 104, 1, E(0, 0, 16, 20, '#FFF8E1', 3) + face(0, 2, 0.28))),

  // ---------- Kuala Lumpur
  L('my/kualalumpur/landmark-kwaichaihong.v1.svg', 'ตรอกไควจายฮองกับภาพวาดผนังเมืองเก่า', 'Kwai Chai Hong, the little lane of old-time wall paintings', ['kwai chai hong', 'ไควจายฮอง', 'mural lane', 'ตรอกภาพวาด', 'chinatown kl', 'ไชนาทาวน์กัวลาลัมเปอร์', 'old shophouses', 'ตึกแถวเก่า', 'wall paintings', 'ภาพวาดบนผนัง', 'jalan sultan', 'ถนนสุลต่าน'], 'หาภาพวาดเด็กปั่นจักรยานบนกำแพง', 'Find the painted child riding a bicycle on the wall',
    // a narrow back lane between old shophouses, wooden window shutters and pipes, the walls painted with an old-days scene of a child on a bicycle and a grandpa on a stool, a string of round lights overhead, a small arched footbridge at the entrance
    sky('#FFF3E0') + P('M-4-4h80l30 150H-4z', '#FFCC80', 3.5) + P('M244-4h-80l-30 150h114z', '#A5D6A7', 3.5) + P('M76-4h88l-30 150h-28z', '#FFF8E1', 0)
      + R(-4, 146, 248, 98, '#BCAAA4', 0, 0) + Lc('M-4 146h248', INK, 3)
      + R(14, 40, 30, 36, '#4DB6AC', 0, 3) + Lc('M29 40v36', INK, 2) + R(196, 40, 30, 36, '#E57373', 0, 3) + Lc('M211 40v36', INK, 2)
      + g(40, 120, 1, C(-12, 10, 8, 'none', 2.5) + C(12, 10, 8, 'none', 2.5) + Lc('M-12 10l8-12h12l4 12', '#1E88E5', 2.5) + C(0, -12, 5, '#FFE0BD', 2) + Lc('M0-8v8', '#E53935', 4) + face(0, -12, 0.12))
      + g(200, 118, 1, R(-8, 4, 16, 16, '#8D6E63', 0, 2) + C(0, -12, 6, '#FFE0BD', 2) + P('M-7 4v-10h14v10z', '#FFFFFF', 2) + face(0, -12, 0.14))
      + Lc('M-4 20c60 20 120 20 248 0', INK, 1.5) + ring(7, (k) => C(20 + k * 32, 26 + Math.sin(k * 0.45) * 8, 5, '#FFEB3B', 1.5))
      + P('M60 214c20-26 100-26 120 0', 'none', 0) + Lc('M60 214c20-26 100-26 120 0', '#C62828', 7) + Lc('M60 214c20-26 100-26 120 0', INK, 0) + kid(120, 196, '#29B6F6', 0.8)),
  L('my/kualalumpur/landmark-muziumnegara.v1.svg', 'พิพิธภัณฑ์แห่งชาติใต้หลังคามลายูทรงสูง', 'Muzium Negara, the national museum under a tall Malay roof', ['muzium negara', 'มูเซียมเนอการา', 'national museum', 'พิพิธภัณฑ์แห่งชาติมาเลเซีย', 'malay roof', 'หลังคาทรงมลายู', 'mosaic murals', 'ภาพโมเสก', 'history of malaysia', 'ประวัติศาสตร์มาเลเซีย', 'jalan damansara', 'ถนนดามันซารา'], 'หาภาพโมเสกสองแผ่นหน้าอาคาร', 'Find the two big mosaic pictures on the front',
    // a long cream building with a row of square pillars, two big mosaic panels in blue, green and gold on its face, and above it a tall steep roof in tiers that curves up at the ends, wide steps and two children
    sky('#E3F2FD') + R(-4, 200, 248, 44, '#CFD8DC', 0, 0)
      + P('M20 110l40-50h120l40 50z', '#6D4C41', 3.5) + P('M60 60l20-34h80l20 34z', '#8D6E63', 3.5) + P('M8 112c0-8 6-10 12-2M232 112c0-8-6-10-12-2', 'none', 3)
      + Lc('M60 60c-6-6-12-8-18-4M180 60c6-6 12-8 18-4M80 26c-4-6-10-8-14-4M160 26c4-6 10-8 14-4', '#6D4C41', 4)
      + R(26, 110, 188, 90, '#FFF8E1', 0, 3.5) + ring(2, (k) => R(42 + k * 108, 124, 48, 50, '#4FC3F7', 0, 3) + ring(4, (j) => R(46 + k * 108 + (j % 2) * 20, 128 + Math.floor(j / 2) * 22, 18, 20, ['#FFCA28', '#66BB6A', '#26A69A', '#FFB74D'][j], 0, 1.5)))
      + ring(4, (k) => R(100 + k * 12, 120, 6, 80, '#ECEFF1', 0, 2)) + face(120, 92, 0.4)
      + ring(3, (k) => R(60 - k * 8, 200 + k * 10, 120 + k * 16, 10, '#E0E0E0', 0, 2)) + kid(40, 232, '#EF5350', 0.8) + kid(204, 232, '#FFCA28', 0.8)),
  L('my/kualalumpur/landmark-masjidnegara.v1.svg', 'มัสยิดเนอการากับหลังคาทรงร่มรูปดาว', 'Masjid Negara and its star-shaped umbrella roof', ['masjid negara', 'มัสยิดเนอการา', 'national mosque', 'มัสยิดแห่งชาติ', 'umbrella roof', 'หลังคาทรงร่ม', 'eighteen-point star', 'ดาวสิบแปดแฉก', 'slender minaret', 'หออะซานเพรียว', 'reflecting pools', 'สระสะท้อนเงา'], 'หาหลังคาที่พับเหมือนร่มกาง', 'Find the roof folded like an open umbrella',
    // a low white building under a wide turquoise roof folded like a half-open umbrella, its edge zigzagging, a tall slender white minaret with a folded pointed top beside it, still pools reflecting in front, two children walking by (the building only)
    sky('#E1F5FE') + R(-4, 190, 248, 54, '#80DEEA', 0, 0) + Lc('M-4 190h248', INK, 3) + Lc('M30 210h100M60 226h120', '#E0F7FA', 3)
      + R(30, 146, 150, 44, '#FFFFFF', 0, 3.5) + ring(7, (k) => R(38 + k * 20, 156, 10, 34, '#B2EBF2', 0, 2))
      + P('M20 150' + ring(10, () => 'l8.5-10l8.5 10') + 'L105 90z', '#26A69A', 3.5) + Lc('M105 90l-60 56M105 90l-20 56M105 90l20 56M105 90l60 56', '#00897B', 2) + Lc('M105 90v-14', INK, 3)
      + R(198, 50, 14, 140, '#FFFFFF', 0, 3.5) + P('M194 50l11-30 11 30z', '#26A69A', 3) + Lc('M198 80h14M198 120h14', '#B2EBF2', 3)
      + kid(66, 210, '#FFCA28', 0.8) + kid(160, 212, '#AB47BC', 0.8)),
  L('my/kualalumpur/landmark-riveroflife.v1.svg', 'สายน้ำแห่งชีวิตเรืองแสงสีฟ้ายามค่ำ', 'The River of Life glowing blue at night', ['river of life', 'ริเวอร์ออฟไลฟ์', 'blue pool', 'บลูพูล', 'klang and gombak', 'แม่น้ำกลังกับกอมบัก', 'where two rivers meet', 'จุดบรรจบแม่น้ำ', 'misty bubblers', 'ม่านหมอกน้ำ', 'night lights', 'ไฟยามค่ำ'], 'หาหมอกสีขาวลอยบนแม่น้ำสีฟ้า', 'Find the white mist floating on the blue river',
    // a dark night sky with stars, two blue-glowing rivers joining into one, puffs of white mist rising from the water, lit palm trees and a stepped stone bank with lamps, children watching from the walkway
    sky('#1A237E') + ring(6, (k) => C(20 + k * 40, 24 + (k % 2) * 14, 2, '#FFF59D', 0)) + ring(3, (k) => R(20 + k * 70, 40 + (k % 2) * 10, 30, 70, '#3949AB', 0, 2) + ring(3, (j) => R(26 + k * 70, 50 + j * 18, 6, 6, '#FFEE58', 0, 0)))
      + P('M-4 150c40 0 70 10 124 20 50-10 80-20 124-20v94H-4z', '#29B6F6', 3) + P('M-4 120c40 10 90 30 124 50 34-20 84-40 124-50v30c-40 0-70 10-124 20-54-10-84-20-124-20z', '#4FC3F7', 3)
      + Lc('M30 190c30-6 60 6 90 0s60-6 90 0', '#B3E5FC', 3) + ring(5, (k) => g(40 + k * 40, 170 + (k % 2) * 12, 1, C(-6, 0, 8, '#FFFFFF', 0) + C(4, -6, 9, '#FFFFFF', 0) + C(10, 2, 7, '#FFFFFF', 0)))
      + R(-4, 216, 248, 28, '#90A4AE', 0, 3) + palm(26, 118, 0.7) + palm(214, 118, 0.7) + ring(3, (k) => Lc(`M${70 + k * 50} 216v-20`, INK, 3) + C(70 + k * 50, 194, 5, '#FFEB3B', 2))
      + kid(96, 236, '#FFCA28', 0.8) + kid(150, 236, '#EF5350', 0.8)),
  L('my/kualalumpur/landmark-islamicarts.v1.svg', 'พิพิธภัณฑ์ศิลปะอิสลามกับโดมกระเบื้องสีฟ้า', 'The Islamic Arts Museum and its turquoise tile domes', ['islamic arts museum', 'พิพิธภัณฑ์ศิลปะอิสลาม', 'turquoise dome', 'โดมสีฟ้าเทอร์ควอยซ์', 'tile patterns', 'ลายกระเบื้อง', 'star patterns', 'ลายดาว', 'model buildings', 'โมเดลอาคาร', 'perdana gardens', 'สวนเปอร์ดานา'], 'หาลายดาวบนกระเบื้องหน้าอาคาร', 'Find the star pattern on the tiles at the front',
    // a white cube-shaped museum with a big low turquoise dome and two smaller ones, a band of blue tiles with eight-pointed stars across its face, a tall arched doorway, children on the plaza
    sky('#FFF8E1') + R(-4, 196, 248, 48, '#E0E0E0', 0, 0)
      + P('M70 74c0-40 100-40 100 0z', '#4DD0E1', 3.5) + ring(5, (k) => Lc(`M${84 + k * 18} 74c0-20 4-30 4-34`, '#00ACC1', 2)) + P('M24 98c0-24 44-24 44 0zM172 98c0-24 44-24 44 0z', '#26C6DA', 3)
      + R(24, 96, 192, 100, '#FFFFFF', 0, 3.5) + R(24, 104, 192, 22, '#1E88E5', 0, 3)
      + ring(6, (k) => g(40 + k * 32, 115, 1, R(-7, -7, 14, 14, '#FFFFFF', 0, 0) + g(0, 0, 1, R(-7, -7, 14, 14, '#FFFFFF', 0, 0), 45) + C(0, 0, 3, '#FFCA28', 0)))
      + P('M100 196v-40c0-26 40-26 40 0v40z', '#0277BD', 3) + face(120, 168, 0.3)
      + kid(56, 228, '#66BB6A', 0.8) + kid(188, 228, '#FF7043', 0.8)),

  // ---------- The Maldives, the country
  K('mv.food.breadfruit', 'สาเกลูกโตกับสาเกทอดกรอบ', 'Breadfruit and its crispy chips', ['breadfruit', 'สาเก', 'banbukeyo', 'บันบุเกโย', 'breadfruit chips', 'สาเกทอดกรอบ', 'island tree', 'ต้นไม้บนเกาะ', 'short eats', 'ของว่างมัลดีฟส์', 'curry with breadfruit', 'แกงสาเก'],
    // a big round green breadfruit with a bumpy patterned skin, a short stalk and a large lobed leaf, smiling, beside a bowl heaped with thin golden chips
    g(178, 52, 1, P('M0 0c-30-10-40-40-20-50 4 14 16 14 18 2 10 10 24 6 22-8 18 12 18 40-20 56z', '#43A047', 3), 20)
      + C(96, 108, 64, '#9CCC65', 4) + ring(12, (k) => C(96 + Math.cos(k * 0.52) * 42, 108 + Math.sin(k * 0.52) * 42, 6, '#C5E1A5', 2)) + Lc('M118 48l16-14', '#6D4C41', 6) + face(96, 106, 0.6)
      + P('M138 190h88c0 22-18 36-44 36s-44-14-44-36z', '#FFFFFF', 3.5) + ring(6, (k) => E(150 + (k % 3) * 22, 182 - Math.floor(k / 3) * 12, 14, 8, k % 2 ? '#FFD54F' : '#FFCA28', 2))),
  K('mv.food.kashikeyo', 'ลูกเตยทะเลสุกสีส้ม ผลไม้ของเกาะ', 'Kashikeyo, the orange screwpine fruit of the islands', ['kashikeyo', 'กาชิเกโย', 'screwpine fruit', 'ลูกเตยทะเล', 'pandanus', 'เตยทะเล', 'orange keys', 'กลีบผลสีส้ม', 'island fruit', 'ผลไม้บนเกาะ', 'sweet chewy bites', 'เคี้ยวหวานๆ'],
    // a big round pandanus fruit made of many wedge-shaped keys, orange at the tips and green at the base, hanging under a tuft of long spiky leaves, two loose keys in front, the fruit smiling
    ring(7, (k) => Lc(`M120 40l${-90 + k * 30} ${-10 + Math.abs(k - 3) * 10}`, '#689F38', 7) + Lc(`M120 40l${-90 + k * 30} ${-10 + Math.abs(k - 3) * 10}`, INK, 0)) + Lc('M120 40v24', '#8D6E63', 8)
      + C(120, 126, 64, '#FF8F00', 4) + ring(14, (k) => { const a = k * 0.449; return P(`M${(120 + Math.cos(a) * 64).toFixed(1)} ${(126 + Math.sin(a) * 64).toFixed(1)}L${(120 + Math.cos(a) * 38).toFixed(1)} ${(126 + Math.sin(a) * 38).toFixed(1)}`, 'none', 2); }) + C(120, 126, 38, '#FFB300', 2.5)
      + face(120, 122, 0.55) + ring(2, (k) => g(70 + k * 100, 214, 1, P('M-10-14h20l-4 28h-12z', '#FF8F00', 2.5) + R(-8, 4, 16, 10, '#9CCC65', 0, 2), k ? 20 : -20))),
  K('mv.animal.wrasse', 'ปลานโปเลียนตัวใหญ่หน้าผากโหนก', 'A big humphead Napoleon wrasse', ['napoleon wrasse', 'ปลานโปเลียน', 'humphead wrasse', 'ปลาหัวโหนก', 'big blue-green fish', 'ปลาตัวโตสีเขียวฟ้า', 'reef snorkel', 'ดำน้ำตื้นแนวปะการัง', 'thick lips', 'ปากหนา', 'gentle giant', 'ยักษ์ใจดี'],
    // a huge friendly blue-green fish swimming left, a big bump on its forehead, thick lips, wavy squiggle lines round its eye, a fan tail and soft fins, bubbles rising
    P('M50 120c0-44 30-74 60-78 20-6 34 0 40 10 30 4 50 30 54 66-4 40-40 60-90 60-40 0-64-24-64-58z', '#26A69A', 4)
      + P('M200 118l30-30v66z', '#4DB6AC', 3.5) + P('M120 162c10 20 30 30 44 26-10-10-14-20-14-30z', '#4DB6AC', 3) + P('M120 76c10-20 30-28 50-24-10 8-16 18-18 30z', '#4DB6AC', 3)
      + P('M50 128c-10 0-16 6-12 12 6 6 14 2 18-4', '#80CBC4', 3) + ring(4, (k) => Lc(`M${130 + k * 14} 100c4 10 4 30 0 46`, '#00897B', 2))
      + Lc('M64 96c6-4 6 4 12 0M64 108c6-4 6 4 12 0', '#FFCA28', 2.5) + face(92, 112, 0.5)
      + ring(3, (k) => C(30 - k * 4, 90 - k * 26, 5 + k * 2, 'none', 2.5))),
  K('mv.culture.kunaa', 'ทุนดูกูนา เสื่อกกทอลายของมัลดีฟส์', 'Thundu kunaa, the patterned reed mats of the Maldives', ['thundu kunaa', 'ทุนดูกูนา', 'reed mat', 'เสื่อกก', 'gaafu dhaalu', 'กาฟูดาลู', 'mat making', 'สานเสื่อ', 'natural dyes', 'สีย้อมธรรมชาติ', 'island craft', 'งานฝีมือบนเกาะ'],
    // a long reed mat half unrolled across the ground, woven with bands of black, brown and golden zigzags and diamonds, the rolled end facing us with a smiling spiral
    P('M20 120h170v86H20z', '#F5DEB3', 3.5) + ring(3, (k) => R(20, 132 + k * 26, 170, 12, ['#3E2723', '#8D6E63', '#FFB300'][k], 0, 1.5))
      + ring(9, (k) => P(`M${24 + k * 18} 150l9-8 9 8-9 8z`, '#FFF8E1', 1.5))
      + Lc('M20 120v86', INK, 3) + C(196, 163, 44, '#F5DEB3', 4) + P('M196 163m-30 0a30 30 0 1 0 60 0a24 24 0 1 0-48 0a18 18 0 1 0 36 0', 'none', 2.5) + face(196, 160, 0.4)),

  // ---------- The Maldives atolls
  L('mv/atolls/landmark-submarine.v1.svg', 'นั่งเรือดำน้ำลงไปดูปลาที่แนวปะการัง', 'A submarine ride down to the reef', ['submarine ride', 'นั่งเรือดำน้ำ', 'tourist submarine', 'เรือดำน้ำท่องเที่ยว', 'porthole windows', 'หน้าต่างกลม', 'reef fish', 'ปลาแนวปะการัง', 'deep under the sea', 'ใต้ทะเลลึก', 'stay dry underwater', 'ใต้น้ำแต่ตัวไม่เปียก'], 'หาหน้าต่างกลมที่มีเด็กมองออกมา', 'Find the round window with a child looking out',
    // deep blue water with light rays, a fat yellow-orange submarine with a little tower on top, a propeller and round porthole windows with children's faces peeking out, striped fish and a turtle-free coral floor below
    sky('#0277BD') + ring(3, (k) => P(`M${40 + k * 70} -4l20 0-40 120z`, '#4FC3F7', 0)) + R(-4, 200, 248, 44, '#FFE0B2', 0, 0) + Lc('M-4 200c30-6 60 6 90 0s70 6 154-2', INK, 3)
      + ring(4, (k) => g(30 + k * 60, 204, 1, P('M0 0c-6-16 4-26 0-36M0 0c8-10 18-12 20-24', 'none', 0) + Lc('M0 0c-6-16 4-26 0-36M0 0c8-10 18-12 20-24', ['#FF7043', '#AB47BC', '#EC407A', '#FFCA28'][k], 6)))
      + P('M40 120c0-30 30-40 80-40s84 10 84 40-34 40-84 40-80-10-80-40z', '#FFB300', 4) + R(100, 58, 40, 26, '#FFB300', 8, 3.5) + Lc('M120 58v-16h14', INK, 3)
      + g(214, 120, 1, P('M0-14l14-6v40l-14-6z', '#90A4AE', 3)) + ring(3, (k) => C(76 + k * 44, 120, 15, '#B3E5FC', 3.5) + face(76 + k * 44, 118, 0.22))
      + ring(3, (k) => g(40 + k * 80, 40 + (k % 2) * 140, 1, E(0, 0, 14, 8, '#FFEB3B', 2.5) + P('M12 0l10-8v16z', '#FFEB3B', 2) + Lc('M-2-8v16', INK, 2) + C(-8, -2, 2, INK, 0)))),
  L('mv/atolls/landmark-villaslide.v1.svg', 'สไลเดอร์จากบ้านพักกลางน้ำลงทะเลสาบ', 'The slide from the water villa into the lagoon', ['villa slide', 'สไลเดอร์บ้านพัก', 'water slide', 'สไลเดอร์น้ำ', 'splash into the lagoon', 'ไถลตูมลงลากูน', 'overwater villa', 'บ้านพักกลางน้ำ', 'villa deck', 'ระเบียงบ้านพัก', 'turquoise lagoon', 'ลากูนสีฟ้าคราม'], 'หาเด็กที่กำลังไถลลงน้ำ', 'Find the child sliding down into the water',
    // a thatched water villa on stilts over a turquoise lagoon, a curving blue slide running from its deck down into the water, a child halfway down with arms up, a big splash at the bottom
    sky('#B3E5FC') + R(-4, 150, 248, 94, '#4DD0E1', 0, 0) + Lc('M-4 150h248', INK, 3) + Lc('M20 190c20-6 40 6 60 0M150 214c20-6 40 6 60 0', '#E0F7FA', 3)
      + ring(4, (k) => R(26 + k * 30, 120, 7, 50, '#8D6E63', 0, 2.5)) + R(14, 110, 120, 12, '#C68B59', 0, 3) + R(30, 70, 90, 40, '#FFF8E1', 0, 3) + P('M14 74l60-40 60 40z', '#D7B98E', 3.5) + ring(5, (k) => Lc(`M${40 + k * 14} ${54 - (k % 3)}l-4 16`, '#A1887F', 2))
      + R(56, 80, 22, 30, '#80DEEA', 0, 2.5) + face(98, 90, 0.3)
      + P('M126 112c40 0 60 10 70 40l-18 0c-10-20-26-26-52-26z', '#29B6F6', 3.5)
      + kid(166, 124, '#FF7043', 0.9) + Lc('M156 112l-6-8M176 112l6-8', '#FFE0BD', 3)
      + ring(5, (k) => C(186 + Math.cos(k * 0.8 - 2.6) * 24, 152 + Math.sin(k * 0.8 - 2.6) * 18, 6, '#FFFFFF', 2))),
  L('mv/atolls/landmark-hukurumiskiy.v1.svg', 'มัสยิดฮุกุรูมิสกีที่สร้างจากหินปะการังในมาเล', 'Hukuru Miskiy, the coral-stone mosque of Malé', ['hukuru miskiy', 'ฮุกุรูมิสกี', 'old friday mosque', 'มัสยิดวันศุกร์เก่า', 'coral stone', 'หินปะการัง', 'carved stone blocks', 'บล็อกหินแกะลาย', 'round minaret', 'หออะซานทรงกลม', 'old malé', 'มาเลเมืองเก่า'], 'หาหอสีขาวทรงกลมข้างอาคาร', 'Find the round white tower beside the building',
    // a low long building of cream coral-stone blocks carved with bands of tiny patterns, a wide sloping roof of grey tiles, and beside it a round white stepped tower with a little cap, a palm and a sandy courtyard (the building only)
    sky('#E1F5FE') + R(-4, 190, 248, 54, '#FFF3E0', 0, 0) + Lc('M-4 190h248', INK, 3)
      + R(20, 116, 150, 74, '#FFE0B2', 0, 3.5) + ring(2, (k) => R(20, 128 + k * 30, 150, 10, '#FFCC80', 0, 2) + ring(10, (j) => C(28 + j * 15, 133 + k * 30, 2.5, '#E6A65D', 0)))
      + ring(3, (k) => R(40 + k * 44, 150, 18, 40, '#8D6E63', 0, 2.5))
      + P('M8 118l30-34h114l30 34z', '#90A4AE', 3.5) + ring(5, (k) => Lc(`M${48 + k * 24} 86l-6 30`, '#78909C', 2))
      + R(186, 80, 30, 110, '#FFFFFF', 0, 3.5) + R(182, 116, 38, 8, '#ECEFF1', 0, 2.5) + R(182, 150, 38, 8, '#ECEFF1', 0, 2.5) + P('M186 80c0-20 30-20 30 0z', '#FFFFFF', 3)
      + palm(-2, 190, 0.7) + kid(176, 224, '#29B6F6', 0.8)),
  L('mv/atolls/landmark-buggy.v1.svg', 'นั่งรถบักกี้ไปรอบเกาะรีสอร์ต', 'A buggy ride round the resort island', ['resort buggy', 'รถบักกี้รีสอร์ต', 'golf cart', 'รถกอล์ฟ', 'sandy path', 'ทางทราย', 'ride round the island', 'นั่งรถรอบเกาะ', 'palm trees', 'ต้นมะพร้าว', 'arrival with luggage', 'มาถึงพร้อมกระเป๋า'], 'หากระเป๋าเดินทางท้ายรถ', 'Find the suitcase on the back of the buggy',
    // a white sandy path winding between palm trees, a little white buggy with a striped canopy, a smiling front, a family riding and a suitcase strapped on the back, the lagoon glinting behind
    sky('#B3E5FC') + R(-4, 110, 248, 30, '#4DD0E1', 0, 0) + R(-4, 136, 248, 108, '#FFF8E1', 0, 0) + Lc('M-4 136h248', INK, 3) + P('M-4 200c60-20 180-10 248-30v74H-4z', '#FFE0B2', 0)
      + palm(24, 160, 0.9) + palm(220, 150, 0.8)
      + g(120, 186, 1, R(-56, -54, 112, 10, '#26A69A', 4, 3) + Lc('M-40-44l0 40M44-44l0 40', INK, 3) + P('M-64-4h128v20c0 6-4 10-10 10h-108c-6 0-10-4-10-10z', '#FFFFFF', 3.5)
        + C(-40, 28, 12, '#424242', 3) + C(40, 28, 12, '#424242', 3) + R(54, -24, 22, 26, '#EF5350', 4, 3) + face(-66, 6, 0.25)
        + kid(-20, -6, '#FFCA28', 0.8) + kid(10, -6, '#AB47BC', 0.8))),
  L('mv/atolls/landmark-gardeneels.v1.svg', 'ปลาไหลสวนโผล่หัวจากพื้นทรายใต้ทะเล', 'Garden eels poking up from the sand', ['garden eels', 'ปลาไหลสวน', 'sandy sea floor', 'พื้นทรายใต้ทะเล', 'snorkelling', 'ดำน้ำตื้น', 'peeking out', 'โผล่หัวออกมา', 'reef edge', 'ขอบแนวปะการัง', 'spotted eels', 'ปลาไหลลายจุด'], 'หาปลาไหลที่ยิ้มอยู่', 'Find the eel that is smiling',
    // clear blue water above a pale sandy floor, a little field of thin spotted eels standing up out of their holes and swaying all the same way like grass, two of them with tiny faces, a snorkeller's flippers at the top
    sky('#4FC3F7') + R(-4, 170, 248, 74, '#FFE0B2', 0, 0) + Lc('M-4 170c40-6 80 6 120 0s80-6 128 0', INK, 3)
      + ring(7, (k) => { const x = 24 + k * 32, h = 50 + (k % 3) * 16; return E(x, 176 + (k % 2) * 14, 8, 3, '#A1887F', 0) + Lc(`M${x} ${176 + (k % 2) * 14}c-4-${h / 2} 10-${h / 2} 6-${h}`, k % 2 ? '#ECEFF1' : '#FFF8E1', 9) + Lc(`M${x} ${176 + (k % 2) * 14}c-4-${h / 2} 10-${h / 2} 6-${h}`, INK, 0) + C(x + 6, 176 + (k % 2) * 14 - h, 2.5, INK, 0); })
      + g(88, 112, 1, face(0, 0, 0.16)) + g(184, 106, 1, face(0, 0, 0.16))
      + g(120, 20, 1, P('M-30 0l-10 20h20zM30 0l10 20h-20z', '#FFCA28', 3) + R(-26, -20, 52, 20, '#29B6F6', 6, 3))),
];

export default { places: {}, items };
