// Wave 8, Asia part 3: Bhutan (the country and Paro, Thimphu and Punakha), Sri Lanka (the country and the hill country) and
// Sabah in Borneo. No deities, Buddha images, prayer flags, prayer wheels or rituals: chortens and ruins as buildings only, with no face on them.
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (bt/paro/landmark-dochula.v1.svg → bt-paro.landmark.dochula)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const peak = (x, y, w, h) => P(`M${x - w} ${y}L${x} ${y - h}L${x + w} ${y}z`, '#90A4AE', 3) + P(`M${x - w * 0.36} ${y - h * 0.64}L${x} ${y - h}L${x + w * 0.36} ${y - h * 0.64}l-${w * 0.12} 8-${w * 0.12}-8-${w * 0.12} 8z`, '#FFFFFF', 2.5);
// a little white chorten: a square base, a red band, a rounded body and a gold tip
const chorten = (x, y, s) => g(x, y, s, P('M-10 0v-12h20V0zM-8-16c0-12 16-12 16 0z', '#FFFFFF', 2) + R(-10, -16, 20, 4, '#C62828', 0, 1.5) + Lc('M0-24v-6', '#FFC107', 3));
const cow = (x, y, s, d = 1) => g(x, y, s, R(-24, -16, 48, 26, '#FFFFFF', 10, 2.5) + P('M-10-16c4 8 14 8 16 0z', INK, 0) + E(12, 0, 7, 6, INK, 0) + Lc('M-16 10v12M14 10v12', INK, 4)
  + g(26 * d, -14, 1, C(0, 0, 11, '#FFFFFF', 2.5) + E(4 * d, 6, 8, 5, '#F8BBD0', 2) + C(-4, -2, 1.8, INK, 0) + C(4, -2, 1.8, INK, 0) + Lc('M-8-8l-6-4M8-8l6-4', '#BCAAA4', 3)));

const items = [
  // ---------- Bhutan (the country)
  K('bt.food.chugo', 'ชูโกชีสจามรีแห้งร้อยเป็นพวง', 'Chugo, dried yak cheese on a string', ['chugo', 'ชูโก', 'dried cheese', 'ชีสแห้ง', 'yak cheese', 'ชีสนมจามรี', 'chewy snack', 'ขนมเคี้ยวหนึบ', 'string of cubes', 'พวงก้อนชีส'],
    // three long strings of hard little white-and-cream cheese cubes hanging from a wooden peg like a necklace, one big cube at the bottom with a happy face
    Lc('M30 30h180', '#8D6E63', 8) + [[60, 6], [120, 8], [180, 6]].map(([x, n]) => Lc(`M${x} 30v${n * 22 + 6}`, '#C62828', 2.5) + ring(n, (k) => R(x - 10, 40 + k * 22, 20, 18, k % 2 ? '#FFF8E1' : '#FFF3C4', 4, 2.5))).join('')
      + g(120, 228, 1, R(-18, -16, 36, 30, '#FFF8E1', 6, 3) + face(0, -2, 0.36)) + Lc('M120 214v-10', '#C62828', 2.5)),
  K('bt.food.zow', 'โซวข้าวแดงพองในตะกร้าไม้ไผ่', 'Zow, puffed red rice in a bamboo basket', ['zow', 'โซว', 'puffed rice', 'ข้าวพอง', 'red rice', 'ข้าวแดง', 'bangchung basket', 'ตะกร้าบังชุง', 'butter and sugar', 'เนยกับน้ำตาล'],
    // a round woven bamboo basket with a lid set aside, full of crunchy puffed red and pink rice grains glistening with butter, a little butter pat on top with a smiling face
    g(176, 84, 1, E(0, 0, 40, 14, '#D4A055') + ring(4, (k) => Lc(`M${-30 + k * 20} -8l6 16`, '#A1673F', 2)) + Lc('M-36-2h72', '#C62828', 2.5), -14)
      + P('M30 140c0 50 30 76 90 76s90-26 90-76z', '#D4A055') + ring(5, (k) => Lc(`M${40 + k * 4} ${150 + k * 12}c40 ${10 - k} 120 ${10 - k} ${160 - k * 8} 0`, '#A1673F', 2)) + Lc('M40 156h160', '#C62828', 3)
      + E(120, 140, 90, 22, '#A1673F') + ring(26, (k) => E(42 + (k % 9) * 19 + (k > 17 ? 8 : 0), 130 + Math.floor(k / 9) * 8 - (k % 2) * 3, 5, 3.5, ['#E57373', '#F8BBD0', '#EF9A9A'][k % 3], 1.5))
      + R(104, 106, 32, 20, '#FFF59D', 5, 2.5) + face(120, 116, 0.25) + face(120, 184, 0.5)),
  K('bt.culture.dapa', 'ดาปาชามไม้กลึงมีฝาของภูฏาน', 'Dapa, Bhutan’s turned wooden bowls', ['dapa', 'ดาปา', 'wooden bowl', 'ชามไม้', 'woodturning', 'งานกลึงไม้', 'trashiyangtse', 'ทาชิยังเซ', 'lacquered wood', 'ไม้เคลือบแล็กเกอร์'],
    // two round wooden bowls with domed lids, turned from swirly-grained wood and shining with lacquer, the big one smiling, a smaller one with its lid off showing the rim, swirl rings on the wood
    g(86, 150, 1, P('M-60 0c0 40 26 60 60 60s60-20 60-60z', '#B5651D') + P('M-62 0c0-40 30-56 62-56s62 16 62 56z', '#C77A2A') + R(-12, -66, 24, 12, '#A0522D', 5, 2.5) + R(-64, -4, 128, 8, '#8D4A1E', 4, 2.5)
      + ring(3, (k) => Lc(`M${-40 + k * 8} ${-14 - k * 10}c20-8 ${50 - k * 16} -8 ${80 - k * 16} 0`, '#E0A060', 2)) + Lc('M-40 24c20 10 60 10 80 0', '#E0A060', 2) + face(0, 26, 0.45))
      + g(186, 178, 1, P('M-38 0c0 28 16 40 38 40s38-12 38-40z', '#B5651D') + E(0, 0, 38, 9, '#8D4A1E') + E(0, 0, 30, 5, '#5D2E0E', 0) + Lc('M-24 18c12 8 36 8 48 0', '#E0A060', 2))
      + g(196, 108, 0.7, P('M-62 0c0-40 30-56 62-56s62 16 62 56z', '#C77A2A') + R(-12, -66, 24, 12, '#A0522D', 5, 2.5) + Lc('M-30-20c20-8 40-8 60 0', '#E0A060', 2.5), 14)),
  K('bt.animal.dhokhi', 'โดคีสุนัขภูเขาขนฟูของภูฏาน', 'A Bhutanese mountain dog', ['bhutanese mountain dog', 'สุนัขภูเขาภูฏาน', 'dhokhi apso', 'โดคีอัปโซ', 'fluffy dog', 'สุนัขขนฟู', 'sleepy street dog', 'สุนัขนอนกลางวัน', 'himalayan dog', 'สุนัขหิมาลัย'],
    // a big fluffy black-and-tan dog sitting proudly, a thick mane round its neck, tan eyebrows and legs, a bushy tail curled over its back, a little red woven collar and a happy face
    E(120, 216, 80, 10, '#C5E1A5', 0) + P('M180 160c30-10 40-40 20-60-10 20-24 26-36 22z', '#37474F') + Lc('M196 120c6 10 6 20 0 30', '#795548', 3)
      + P('M70 210c-10-40 0-90 40-100 40-6 70 20 72 60 2 20-4 34-10 40z', '#37474F') + R(80, 180, 20, 34, '#A1673F', 8, 3) + R(126, 180, 20, 34, '#A1673F', 8, 3)
      + ring(7, (k) => P(`M${76 + k * 14} 128l7-14 7 14z`, '#455A64', 2)) + C(116, 92, 42, '#37474F') + P('M78 70l-6-30 26 16zM154 70l6-30-26 16z', '#37474F')
      + E(116, 110, 22, 16, '#A1673F', 2.5) + E(116, 100, 8, 6, INK, 0) + E(98, 76, 6, 4, '#A1673F', 0) + E(134, 76, 6, 4, '#A1673F', 0)
      + Lc('M84 132c20 10 44 10 64 0', '#C62828', 6) + C(116, 140, 5, '#FFC107', 2) + face(116, 86, 0.6)),

  // ---------- Paro, Thimphu and Punakha
  L('bt/paro/landmark-dochula.v1.svg', 'ช่องเขาโดชูลากับเจดีย์ขาว 108 องค์', 'Dochula Pass and its 108 little white chortens', ['dochula pass', 'ช่องเขาโดชูลา', '108 chortens', 'เจดีย์ 108 องค์', 'druk wangyal', 'ดรุกวังยัล', 'himalaya view', 'วิวหิมาลัย', 'mountain pass', 'ช่องเขา'], 'หาเจดีย์ขาวเล็กๆ ที่เรียงเป็นชั้นบนเนิน', 'Find the rows of little white chortens on the hill',
    // a round green hilltop on a mountain pass covered in tidy rings of small white chortens with red bands and gold tips, a long row of snowy Himalayan peaks on the horizon, a child on the path (buildings only)
    sky('#BBDEFB') + peak(30, 110, 40, 60) + peak(90, 110, 46, 76) + peak(160, 110, 50, 70) + peak(220, 110, 40, 56) + P('M-4 110h248v134H-4z', '#7CB342', 0)
      + P('M-4 244c10-60 60-110 124-110s114 50 124 110z', '#9CCC65', 3.5)
      + [[170, 5, 0.95], [198, 6, 1.15], [230, 6, 1.4]].map(([y, n, s]) => ring(n, (k) => chorten(120 + (k - (n - 1) / 2) * 27 * s, y, s))).join('')
      + Lc('M-4 128c40-6 60 4 90 0', '#FFFFFF', 4) + kid(24, 236, '#FF7043')),
  L('bt/paro/landmark-lamperi.v1.svg', 'ป่าโรโดเดนดรอนบานที่สวนพฤกษศาสตร์หลวงลัมเปรี', 'The flowering rhododendron forest of Lamperi', ['rhododendron', 'โรโดเดนดรอน', 'royal botanical park', 'อุทยานพฤกษศาสตร์หลวง', 'lamperi', 'ลัมเปรี', 'spring flowers', 'ดอกไม้ฤดูใบไม้ผลิ', 'mossy forest', 'ป่ามอส'], 'หาช่อดอกไม้สีแดงก้อนกลมใหญ่', 'Find the big round clusters of red flowers',
    // a misty mountain forest of twisted mossy trees covered in big round clusters of red, pink and white rhododendron flowers, petals on the path, a child holding up a fallen flower
    sky('#ECEFF1') + Lc('M-4 60c60-10 120 6 248-4', '#FFFFFF', 8) + P('M-4 200h248v44H-4z', '#8BC34A', 0) + Lc('M-4 200h248', INK, 3)
      + [[40, 200, 1], [130, 200, 1.2], [210, 200, 0.9]].map(([x, y, s]) => g(x, y, s, Lc('M0 0c4-30-8-50 0-80M0-50c10-10 20-14 30-14M0-60c-12-8-20-10-30-8', '#6D4C41', 7) + Lc('M-2-20c2-10 0-20 2-30', '#9CCC65', 3)
        + [[-30, -70, '#E53935'], [30, -66, '#F06292'], [0, -96, '#E53935'], [-16, -110, '#FFFFFF'], [20, -104, '#F48FB1']].map(([x2, y2, c]) => C(x2, y2, 17, '#2E7D32', 2.5) + ring(3, (k) => C(x2 - 7 + k * 7, y2 - 4 - (k % 2) * 6, 8, c, 2))).join(''))).join('')
      + ring(6, (k) => E(20 + k * 38, 214 + (k % 2) * 10, 4, 3, '#EF5350', 1.5)) + face(130, 90, 0.4)
      + g(90, 236, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#5C6BC0', 2) + face(0, -18, 0.22) + Lc('M8-10l8-16', '#FFE0BD', 3) + C(18, -30, 7, '#E53935', 2))),
  L('bt/paro/landmark-rammedearth.v1.svg', 'การสร้างบ้านด้วยการกระทุ้งดินแบบภูฏาน', 'Building a rammed-earth house the Bhutanese way', ['rammed earth', 'ผนังดินอัด', 'house building', 'การสร้างบ้าน', 'wooden formwork', 'แบบหล่อไม้', 'simply bhutan', 'ซิมพลีภูฏาน', 'pounding songs', 'เพลงกระทุ้งดิน'], 'หาไม้กระทุ้งยาวที่ใช้ตำดิน', 'Find the long wooden poles that pound the earth',
    // a thick wall of brown earth growing inside a wooden box of planks held by poles and ropes, two children on top pounding the earth with long wooden rammers, finished wall below with layer lines, a white farmhouse window beside it
    sky('#E3F2FD') + P('M-4 200h248v44H-4z', '#A5D6A7', 0) + Lc('M-4 200h248', INK, 3)
      + R(150, 70, 80, 130, '#FFFFFF', 0, 3) + R(166, 96, 48, 34, '#8D4A2B', 0, 2.5) + ring(3, (k) => R(170 + k * 14, 100, 10, 26, '#FFCA28', 0, 1.5)) + P('M140 72l50-30 50 30z', '#78909C', 3)
      + R(20, 140, 120, 60, '#C68B59', 0, 3) + ring(4, (k) => Lc(`M20 ${152 + k * 12}h120`, '#A86B3C', 2))
      + R(14, 94, 132, 48, '#D7A86E', 0, 3) + ring(3, (k) => Lc(`M14 ${106 + k * 12}h132`, '#B9873E', 2)) + Lc('M14 84v120M146 84v120', '#6D4C41', 6) + Lc('M10 100l140 0', '#FFF3E0', 2)
      + [[50, 'o', '#E53935'], [104, 'smile', '#1E88E5']].map(([x, m, c]) => g(x, 94, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', c, 2) + face(0, -18, 0.22, m) + Lc('M10-28v44', '#8D6E63', 4) + R(4, 14, 12, 8, '#6D4C41', 2, 2))).join('')
      + ring(4, (k) => Lc(`M${40 + k * 22} 90l-4-6M${44 + k * 22} 90l4-6`, '#8D6E63', 2)) + face(80, 168, 0.36)),
  L('bt/paro/landmark-gangtey.v1.svg', 'ไร่มันฝรั่งในหุบเขากังเตย์', 'The potato fields of the Gangtey valley', ['gangtey', 'กังเตย์', 'phobjikha valley', 'หุบเขาโพบจิคา', 'potato fields', 'ไร่มันฝรั่ง', 'glacial valley', 'หุบเขาธารน้ำแข็ง', 'farm stay', 'พักฟาร์ม'], 'หามันฝรั่งที่เด็กถืออยู่', 'Find the potato the child is holding up',
    // a wide flat green valley between pine-covered hills, neat brown rows of potato plants with little white flowers, a white farmhouse with a wooden roof weighted by stones, a child holding up a big potato
    sky('#E3F2FD') + P('M-4 120l40-40 30 20 40-34 50 30 40-26 48 30v40H-4z', '#2E7D32', 3) + ring(8, (k) => P(`M${10 + k * 30} 120l8-20 8 20z`, '#1B5E20', 2))
      + P('M-4 124h248v120H-4z', '#AED581', 0) + Lc('M-4 124h248', INK, 3)
      + ring(5, (k) => P(`M-4 ${150 + k * 20}h248v10H-4z`, '#8D6E63', 0) + ring(7, (j) => C(14 + j * 34 + (k % 2) * 16, 148 + k * 20, 6, '#66BB6A', 2)))
      + R(150, 100, 60, 34, '#FFFFFF', 0, 3) + R(162, 108, 14, 12, '#8D4A2B', 0, 2) + R(186, 108, 14, 12, '#8D4A2B', 0, 2) + P('M144 102l36-18 36 18z', '#A1887F', 3) + ring(3, (k) => C(164 + k * 16, 92, 3, '#90A4AE', 1.5))
      + g(70, 232, 1.3, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#AB47BC', 2) + face(0, -18, 0.22, 'o') + Lc('M8-8l8-14', '#FFE0BD', 3) + E(20, -28, 11, 8, '#C9A27A', 2) + C(16, -30, 1.4, '#8D6E63', 0) + C(24, -26, 1.4, '#8D6E63', 0))),

  // ---------- Sri Lanka (the country)
  K('lk.food.kiribath', 'กิริบัทข้าวมันกะทิตัดชิ้นข้าวหลามตัด', 'Kiribath, milk rice cut in diamonds', ['kiribath', 'กิริบัท', 'milk rice', 'ข้าวมันกะทิ', 'lunu miris', 'ลูนูมิริส', 'new year breakfast', 'อาหารเช้าวันปีใหม่', 'coconut milk', 'กะทิ'],
    // a banana leaf with neat white diamond-shaped pieces of coconut milk rice, one diamond in front with a happy face, a little heap of bright red onion-chilli relish beside them
    P('M10 150c40-60 180-70 220-20-30 60-180 80-220 20z', '#66BB6A') + Lc('M20 150c60-24 140-34 200-24', '#2E7D32', 2.5)
      + [[70, 132], [110, 126], [150, 124], [90, 156], [130, 152]].map(([x, y]) => P(`M${x} ${y - 16}l20 16-20 16-20-16z`, '#FFFDF5', 2.5) + Lc(`M${x - 8} ${y - 4}l6-4`, '#E0E0E0', 2)).join('')
      + g(110, 196, 1.4, P('M0-22l28 22-28 22-28-22z', '#FFFDF5', 3) + face(0, 0, 0.32)) + P('M168 168c0-16 40-16 40 0s-40 14-40 0z', '#E53935', 2.5) + ring(5, (k) => C(174 + k * 7, 166 + (k % 2) * 4, 2.5, '#FFCDD2', 0))),
  K('lk.food.woodapple', 'มะตูมนิลน้ำมะขวิดศรีลังกา', 'A wood apple and its thick brown juice', ['wood apple', 'มะขวิด', 'divul', 'ดิวุล', 'fruit juice', 'น้ำผลไม้', 'hard shell fruit', 'ผลไม้เปลือกแข็ง', 'roadside drink', 'เครื่องดื่มข้างทาง'],
    // a round wood apple with a hard grey-brown shell cracked in half showing sticky brown pulp with little seeds, beside it a tall glass of thick brown wood apple juice with a straw, a whole fruit smiling
    g(60, 170, 1, C(0, 0, 40, '#A1887F') + ring(5, (k) => C(-20 + k * 10, -16 + (k % 2) * 30, 2.5, '#8D6E63', 0)) + face(0, 4, 0.5))
      + g(132, 196, 1, P('M-34 0a34 34 0 0 1 68 0z', '#BCAAA4') + P('M-28 0a28 28 0 0 1 56 0z', '#8D5A2B', 0) + ring(6, (k) => E(-18 + k * 7, -10 - (k % 2) * 8, 2, 3, '#FFF3E0', 0)) + Lc('M-34 0h68', INK, 3))
      + P('M170 70h48l-6 136h-36z', '#E3F2FD', 3) + P('M173 100h42l-5 102h-32z', '#8D5A2B', 0) + Lc('M174 100h40', INK, 2.5) + Lc('M206 110l14-60', '#29B6F6', 4) + E(194, 214, 26, 5, '#E0E0E0', 0)),
  K('lk.animal.junglefowl', 'ไก่ป่าศรีลังกานกประจำชาติ', 'The Sri Lanka junglefowl', ['sri lanka junglefowl', 'ไก่ป่าศรีลังกา', 'national bird', 'นกประจำชาติ', 'wild rooster', 'ไก่ป่า', 'yala', 'ยาลา', 'forest floor', 'พื้นป่า'],
    // a proud wild rooster with a bright orange-gold neck and body, purple-black wings and a long curved dark tail, a red comb with a yellow spot in the middle, red wattles, standing on the forest floor with fallen leaves
    E(120, 214, 84, 10, '#C5E1A5', 0) + ring(4, (k) => E(40 + k * 50, 212, 8, 4, ['#FFB74D', '#A1887F'][k % 2], 1.5))
      + P('M90 130c-30-20-60-10-70 20 20-10 30-4 40 4-20 4-30 20-30 36 20-20 40-24 60-20z', '#311B92') + Lc('M50 140c-10 10-16 20-14 32', '#7E57C2', 3)
      + E(120, 150, 46, 32, '#EF6C00') + P('M96 140c20-16 50-16 66 4-20 20-50 20-66-4z', '#4A148C', 2.5) + Lc('M110 180v28M134 180v28', '#FFB74D', 4) + Lc('M104 208h12M128 208h12', '#FFB74D', 3)
      + P('M140 132c-6-30 4-50 24-52 14 0 20 14 16 30l-10 30z', '#FFA000') + ring(4, (k) => Lc(`M${148 + k * 6} ${100 + k * 8}l-6 10`, '#E65100', 2))
      + P('M156 80c-4-10 2-16 6-10 2-10 10-10 10 0 4-8 12-4 8 6z', '#E53935', 2.5) + C(168, 74, 3, '#FFEB3B', 0) + P('M184 92l14 4-14 4z', '#FFD54F', 2.5) + E(176, 110, 5, 9, '#E53935', 2)
      + C(172, 90, 3.5, INK, 0) + E(166, 100, 5, 3, '#FF8FA3', 0)),
  K('lk.culture.cinnamon', 'การลอกเปลือกอบเชยซีลอน', 'Peeling Ceylon cinnamon', ['ceylon cinnamon', 'อบเชยซีลอน', 'cinnamon quills', 'แท่งอบเชย', 'cinnamon peeling', 'ลอกเปลือกอบเชย', 'spice', 'เครื่องเทศ', 'cinnamon sticks', 'ไม้อบเชย'],
    // a bundle of long thin golden-brown cinnamon quills tied with string, a fresh green stick with its bark curling off as a long ribbon under a little brass peeler, glossy cinnamon leaves, the bundle smiling
    E(120, 214, 96, 10, '#E0E0E0', 0) + ring(5, (k) => g(60 + k * 2, 140, 1, R(-50, -4 + k * 9 - 18, 100, 9, '#C68642', 4, 2) + E(-50, k * 9 - 13.5, 3, 4.5, '#8D5A2B', 1.5), -30 + k * 2))
      + Lc('M36 156l60-40', '#E53935', 4) + face(70, 130, 0.36)
      + Lc('M130 200l90-40', '#7CB342', 9) + Lc('M130 200l90-40', '#33691E', 2) + Lc('M180 178c-10 10-20 16-30 20s-20 14-14 26', '#C68642', 7) + Lc('M180 178c-10 10-20 16-30 20s-20 14-14 26', '#8D5A2B', 2)
      + g(190, 170, 1, R(-6, -26, 12, 22, '#FFC107', 3, 2.5) + R(-4, -40, 8, 16, '#6D4C41', 3, 2), 20)
      + [[176, 82, 20], [204, 104, -20]].map(([x, y, r]) => g(x, y, 1, P('M0 30c-16-14-16-46 0-60 16 14 16 46 0 60z', '#43A047', 2.5) + Lc('M0 28v-54', '#A5D6A7', 2), r)).join('')),

  // ---------- Kandy, Ella and Sigiriya
  L('lk/hills/landmark-pidurangala.v1.svg', 'ยอดหินปิดุรังคละที่มองเห็นสิกิริยา', 'The top of Pidurangala Rock looking at Sigiriya', ['pidurangala', 'ปิดุรังคละ', 'rock climb', 'ปีนหิน', 'sunrise view', 'วิวพระอาทิตย์ขึ้น', 'boulder top', 'บนก้อนหินยักษ์', 'jungle view', 'วิวป่าเขียว'], 'หาเด็กสองคนที่ยืนบนยอดหิน', 'Find the two children standing on the rock top',
    // a big smooth grey boulder top in the foreground with two children waving, a sea of green jungle below and, far away in the morning haze, a small flat-topped rock rising out of the trees, the sun coming up
    sky('#FFE0B2') + C(60, 70, 22, '#FFCA28', 0) + P('M-4 150c30-10 60 4 90-4s70 6 100-4 40 4 58 0v40H-4z', '#81C784', 0) + ring(8, (k) => C(10 + k * 32, 152 + (k % 2) * 6, 14, '#66BB6A', 2))
      + P('M160 150c0-30 4-46 10-50h28c6 4 8 20 8 50z', '#A1887F', 3) + Lc('M170 106h26', '#558B2F', 3)
      + P('M-4 244c0-50 20-80 70-90 50-8 110-6 150 10 20 10 28 40 28 80z', '#9E9E9E', 3.5) + Lc('M30 200c20-10 40-12 60-10M140 196c20 0 40 6 54 16', '#757575', 2.5)
      + face(110, 206, 0.45) + g(90, 162, 1.3, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#E53935', 2) + face(0, -18, 0.22) + Lc('M8-8l8-16', '#FFE0BD', 3))
      + g(130, 162, 1.3, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#1E88E5', 2) + face(0, -18, 0.22, 'o') + Lc('M-8-8l-8-16', '#FFE0BD', 3))),
  L('lk/hills/landmark-zipline.v1.svg', 'โหนสลิงข้ามหุบเขาที่เอลลา', 'Flying down the zipline in Ella', ['zipline', 'ซิปไลน์', 'flying ravana', 'ฟลายอิ้งราวณะ', 'ella', 'เอลลา', 'valley ride', 'โหนข้ามหุบเขา', 'adventure park', 'สวนผจญภัย'], 'หาเด็กที่ห้อยโหนสายสลิงอยู่', 'Find the child flying along the wire',
    // a long steel wire slanting down across a deep green valley between forested hills, a child in a helmet and harness flying down it with arms out and wind lines, a little wooden launch tower at the top
    sky('#B3E5FC') + P('M-4 120c30-40 70-60 100-20 30-30 70-20 90 10 20-14 40-10 58 0v134H-4z', '#558B2F', 3) + P('M-4 170c40-20 80-10 120 10s80 0 128-10v74H-4z', '#7CB342', 3) + Lc('M60 210c30-10 60-6 120 8', '#4FC3F7', 6)
      + R(14, 40, 30, 60, '#A1673F', 0, 3) + P('M8 42l22-16 22 16z', '#6D4C41', 3) + Lc('M44 54L240 170', '#78909C', 3)
      + g(132, 118, 1.3, Lc('M0-30v14', INK, 2) + C(0, -32, 4, '#B0BEC5', 2) + C(0, -8, 9, '#FFE0BD', 2) + P('M-9-12c0-10 18-10 18 0z', '#FF7043', 2) + R(-9, 2, 18, 18, '#FFCA28', 3, 2) + Lc('M-9 6l-16-8M9 6l16-8', '#FFE0BD', 3.5) + Lc('M-4 20l-4 14M4 20l4 14', '#5C6BC0', 4) + face(0, -6, 0.22, 'o'), 30)
      + Lc('M100 96h-30M104 108h-40M110 120h-26', '#FFFFFF', 3)),
  L('lk/hills/landmark-cookingclass.v1.svg', 'เรียนทำแกงศรีลังกาในหม้อดินกับที่ขูดมะพร้าว', 'A Sri Lankan curry class with clay pots and a coconut scraper', ['cooking class', 'คลาสทำอาหาร', 'rice and curry', 'ข้าวกับแกง', 'clay pots', 'หม้อดิน', 'coconut scraper', 'ที่ขูดมะพร้าว', 'village kitchen', 'ครัวหมู่บ้าน'], 'หาเก้าอี้ขูดมะพร้าวที่เด็กนั่งอยู่', 'Find the coconut-scraper stool the child sits on',
    // an open village kitchen: three round clay pots of yellow, red and green curry bubbling on a wood fire hearth, a child sitting on a low wooden coconut-scraper stool grating a half coconut into a bowl
    sky('#FFF3E0') + R(-4, 30, 248, 14, '#8D6E63', 0, 3) + Lc('M30 44v60M210 44v60', '#8D6E63', 6)
      + R(20, 140, 200, 30, '#BCAAA4', 6, 3) + ring(4, (k) => P(`M${40 + k * 50} 140c-6-12 4-18 0-30 10 8 14 18 6 30z`, '#FF7043', 2))
      + [[60, '#FFCA28'], [120, '#E53935'], [180, '#7CB342']].map(([x, c]) => P(`M${x - 26} 112c0 20 10 30 26 30s26-10 26-30z`, '#C1693C', 3) + E(x, 112, 26, 7, c, 2.5) + C(x - 8, 110, 3, '#FFF8E1', 1) + Lc(`M${x} 96c-4-8 4-12 0-20`, '#B0BEC5', 2.5)).join('')
      + P('M-4 190h248v54H-4z', '#D7A86E', 0) + Lc('M-4 190h248', INK, 3)
      + g(150, 226, 1, R(-40, -10, 80, 10, '#8D6E63', 3, 2.5) + Lc('M-30 0v16M30 0v16', '#6D4C41', 5) + Lc('M40-6l18-12', '#6D4C41', 5) + P('M54-22l8-6 4 8z', '#B0BEC5', 2) + P('M50-18a14 14 0 0 1 28 0z', '#FFFFFF', 2.5) + P('M48-18h32c0 6-32 6-32 0z', '#6D4C41', 2) + E(66, 6, 14, 6, '#ECEFF1', 2) + ring(4, (k) => C(60 + k * 4, 4, 1.6, '#FFFFFF', 0)))
      + g(126, 210, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#26A69A', 2) + face(0, -18, 0.22) + Lc('M8-6l18-6', '#FFE0BD', 3)) + face(120, 158, 0.3)),
  L('lk/hills/landmark-littleengland.v1.svg', 'บ้านสไตล์อังกฤษกับสวนดอกไม้ที่นูวาราเอลิยา', 'Little England, the Tudor-style houses of Nuwara Eliya', ['nuwara eliya', 'นูวาราเอลิยา', 'little england', 'ลิตเติลอิงแลนด์', 'tudor house', 'บ้านสไตล์ทิวดอร์', 'flower garden', 'สวนดอกไม้', 'cool hills', 'เมืองบนเขาอากาศเย็น'], 'หาคานไม้สีดำบนผนังบ้านสีขาว', 'Find the black wooden beams on the white walls',
    // a cosy white Tudor-style house with black criss-cross timber beams, steep red roofs and tall chimneys, a bright flower garden of roses and marigolds with a little picket fence, misty green hills behind, a child at the gate
    sky('#E8F5E9') + P('M-4 100c40-30 80-30 120-10s90-20 128 0v40H-4z', '#81C784', 0) + Lc('M-4 96c60 6 120-6 248 2', '#FFFFFF', 5)
      + R(40, 110, 160, 84, '#FFFFFF', 0, 3) + Lc('M40 140h160M80 110v84M120 110v84M160 110v84M40 110l40 30M80 110l-40 30M160 110l40 30M200 110l-40 30', '#3E2723', 4)
      + P('M28 112l52-50 52 50z', '#C62828', 3) + P('M112 112l52-50 52 50z', '#C62828', 3) + R(62, 40, 14, 30, '#A1887F', 0, 2.5) + R(170, 40, 14, 30, '#A1887F', 0, 2.5)
      + R(52, 150, 20, 20, '#B3E5FC', 0, 2.5) + R(168, 150, 20, 20, '#B3E5FC', 0, 2.5) + R(108, 154, 24, 40, '#5D4037', 0, 2.5)
      + P('M-4 194h248v50H-4z', '#9CCC65', 0) + Lc('M-4 194h248', INK, 3) + ring(8, (k) => C(14 + k * 30, 206 + (k % 2) * 8, 7, ['#E91E63', '#FFA000', '#F06292', '#FFEB3B'][k % 4], 2))
      + ring(9, (k) => Lc(`M${8 + k * 12} 244v-22`, '#FFFFFF', 4)) + Lc('M4 230h108', '#FFFFFF', 3) + kid(150, 238, '#7E57C2')),
  L('lk/hills/landmark-polonnaruwa.v1.svg', 'ปั่นจักรยานชมซากพระราชวังโปลอนนารุวะ', 'Cycling round the ruined palace of Polonnaruwa', ['polonnaruwa', 'โปลอนนารุวะ', 'ancient city', 'เมืองโบราณ', 'royal palace ruins', 'ซากพระราชวัง', 'cycling', 'ปั่นจักรยาน', 'brick walls', 'กำแพงอิฐ'], 'หาเด็กที่ปั่นจักรยานผ่านกำแพงอิฐ', 'Find the child cycling past the old brick walls',
    // tall crumbling red-brick walls of an old palace with rows of square beam holes, broken tops with grass growing, a grassy park with big shady trees, a child riding a bicycle on the path in front (ruins only)
    sky('#FFF8E1') + C(30, 130, 34, '#66BB6A', 3) + C(216, 120, 30, '#43A047', 3) + P('M-4 190h248v54H-4z', '#9CCC65', 0) + P('M-4 214h248v14H-4z', '#E0C9A6', 0) + Lc('M-4 190h248', INK, 3)
      + P('M50 190V70l14-8 10 10 12-6 10 8v116z', '#C1693C', 3) + P('M110 190V56l12-6 8 8 14-4 10 10v126z', '#B5552C', 3) + P('M170 190v-80l10-6 12 8 12-4v82z', '#C1693C', 3)
      + ring(12, (k) => R(56 + (k % 4) * 10 + (k > 7 ? 120 : k > 3 ? 60 : 0) - (k > 7 ? 2 : 0), 90 + Math.floor((k % 4) / 2) * 0 + (k % 2) * 30, 6, 6, '#5D2E0E', 0, 0))
      + ring(5, (k) => Lc(`M${54 + k * 30} ${k % 2 ? 60 : 70}l4-8 4 8`, '#7CB342', 2.5)) + ring(4, (k) => Lc(`M50 ${100 + k * 22}h44M110 ${90 + k * 22}h54`, '#A3402A', 1.5))
      + g(120, 220, 1, C(-20, 0, 12, 'none', 3) + C(20, 0, 12, 'none', 3) + Lc('M-20 0l12-18h22l6 18M-8-18l-4-6', INK, 3) + C(0, -40, 8, '#FFE0BD', 2) + P('M-8-16v-16h16v16z', '#FFCA28', 2) + face(0, -38, 0.22) + Lc('M6-30l12 8', '#FFE0BD', 3))
      + face(137, 160, 0.3)),

  // ---------- Sabah, Borneo
  L('my/borneo/landmark-rafflesia.v1.svg', 'ดอกบัวผุดราฟเฟิลเซียดอกไม้ที่ใหญ่ที่สุดในโลก', 'The giant rafflesia flower in the rainforest', ['rafflesia', 'ราฟเฟิลเซีย', 'bua phut', 'บัวผุด', 'biggest flower', 'ดอกไม้ที่ใหญ่ที่สุด', 'poring', 'โปริง', 'rainforest floor', 'พื้นป่าฝน'], 'หาจุดขาวๆ บนกลีบดอกสีแดง', 'Find the white spots on the red petals',
    // an enormous five-petalled rust-red flower lying on the leafy rainforest floor, its petals covered in pale warty spots, a deep round open bowl in the middle with spikes inside, a small child beside it for size
    sky('#E8F5E9') + ring(5, (k) => Lc(`M${10 + k * 52} -4c10 40 0 80 6 120`, '#A5D6A7', 6)) + P('M-4 130h248v114H-4z', '#8D6E63', 0) + ring(8, (k) => E(16 + k * 30, 140 + (k % 3) * 34, 12, 5, '#7CB342', 2))
      + ring(5, (k) => g(110, 170, 1, P('M-36-26c-12-56 84-56 72 0-8 24-64 24-72 0z', '#C62828', 3) + ring(4, (j) => C(-18 + j * 12, -50 + (j % 2) * 10, 4.5, '#FFCDD2', 1.5)), k * 72 + 36))
      + C(110, 170, 32, '#8E1E1E', 3) + C(110, 170, 22, '#4A0E0E', 2.5) + ring(8, (k) => Lc(`M${110 + Math.cos(k * 0.785) * 8} ${170 + Math.sin(k * 0.785) * 8}l${Math.cos(k * 0.785) * 8} ${Math.sin(k * 0.785) * 8}`, '#FFCDD2', 2.5))
      + face(110, 124, 0.35) + kid(212, 236, '#FFCA28')),
  L('my/borneo/landmark-barracuda.v1.svg', 'พายุหมุนฝูงปลาสากที่เกาะสิปาดัน', 'The barracuda tornado at Sipadan', ['sipadan', 'สิปาดัน', 'barracuda tornado', 'พายุหมุนปลาสาก', 'barracuda', 'ปลาสาก', 'diving', 'ดำน้ำ', 'semporna', 'เซมปอร์นา'], 'หาฝูงปลาที่ว่ายวนเป็นเกลียว', 'Find the fish swirling round in a spiral',
    // deep blue water lit from above, a huge spinning column of silver barracudas swimming round in a spiral like a tornado, a child diver with a mask and bubbles watching from the side, coral at the bottom
    sky('#1565C0') + ring(4, (k) => Lc(`M${40 + k * 50} -4l-20 90`, '#42A5F5', 10)) + P('M-4 220c40-14 80 0 120-6s80-8 128 4v26H-4z', '#FFB74D', 0)
      + ring(18, (k) => { const t = k / 17, y = 30 + t * 180, r = 60 - t * 34, x = 110 + Math.sin(k * 1.3) * r, d = Math.cos(k * 1.3) > 0 ? 1 : -1; return g(x, y, 1, P(`M${-18 * d} 0c${10 * d}-6 ${28 * d}-6 ${36 * d} 0-${8 * d} 6-${26 * d} 6-${36 * d} 0zM${-18 * d} 0l-${8 * d}-6v12z`, '#CFD8DC', 2) + C(12 * d, -1, 1.6, INK, 0)); })
      + P('M150 220c-6-14 4-24 0-36M160 218c6-10 12-14 10-26', 'none', 0) + Lc('M150 220c-6-14 4-24 0-36M160 218c6-10 12-14 10-26', '#F06292', 4) + face(110, 120, 0.4)
      + g(200, 150, 1.2, E(0, 0, 9, 24, '#FFE0BD', 2) + C(0, -28, 10, '#FFE0BD', 2) + R(-12, -34, 24, 10, '#FFCA28', 4, 2) + R(-8, -10, 16, 28, '#26A69A', 4, 2) + face(0, -24, 0.22, 'o') + ring(3, (k) => C(-6 - k * 4, -48 - k * 12, 3 + k, '#E1F5FE', 1.5)))),
  L('my/borneo/landmark-gomantong.v1.svg', 'ถ้ำโกมันตงกับรังนกนางแอ่น', 'Gomantong Cave and its swiftlet nests', ['gomantong caves', 'ถ้ำโกมันตง', 'swiftlets', 'นกนางแอ่นกินรัง', 'birds nest', 'รังนก', 'rattan ladders', 'บันไดหวาย', 'sandakan', 'ซันดากัน'], 'หาบันไดหวายที่ห้อยลงมาจากเพดานถ้ำ', 'Find the rattan ladders hanging from the cave roof',
    // looking up inside a huge dark cave with a bright opening high in the roof letting in a beam of light, long rattan rope ladders hanging down, little cup-shaped white nests on the rock wall, swiftlets darting through the light, a child with a torch on the boardwalk
    sky('#3E2723') + P('M-4 -4h248v60c-30 20-70 20-100 0-40-20-80 0-148 20z', '#5D4037', 0) + E(150, 30, 34, 18, '#FFF59D', 3) + P('M130 40l-40 200h120l-30-200z', '#FFF59D', 0) + Lc('M130 40l-40 200M170 40l30 200', '#FFE082', 2)
      + P('M-4 40c20 60 10 140 20 204H-4zM244 60c-20 60-10 120-16 184h16z', '#4E342E', 3)
      + [[60, 40, 160], [92, 30, 170]].map(([x, y, h]) => Lc(`M${x} ${y}v${h}M${x + 12} ${y}v${h}`, '#C9A27A', 3) + ring(Math.floor(h / 18), (k) => Lc(`M${x} ${y + 12 + k * 18}h12`, '#C9A27A', 3))).join('')
      + ring(6, (k) => P(`M${20 + (k % 2) * 10} ${70 + k * 22}c0 8 14 8 14 0z`, '#FFFDE7', 2) + P(`M${210 - (k % 2) * 8} ${90 + k * 20}c0 8 14 8 14 0z`, '#FFFDE7', 2))
      + [[140, 80], [170, 110], [120, 130], [160, 60]].map(([x, y]) => P(`M${x - 10} ${y - 4}l10 4 10-4-6 6h-8z`, '#212121', 1.5)).join('')
      + R(-4, 214, 248, 10, '#8D6E63', 0, 2.5) + g(164, 212, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#FF7043', 2) + face(0, -18, 0.22, 'o') + R(8, -14, 12, 6, '#FFCA28', 2, 1.5))),
  L('my/borneo/landmark-poring.v1.svg', 'สะพานแขวนบนยอดไม้ที่โปริง', 'The Poring canopy walkway in the treetops', ['poring', 'โปริง', 'canopy walkway', 'สะพานเดินบนยอดไม้', 'rope bridge', 'สะพานเชือก', 'kinabalu park', 'อุทยานคินาบาลู', 'rainforest giants', 'ต้นไม้ยักษ์ป่าฝน'], 'หาสะพานเชือกที่ห้อยระหว่างต้นไม้ยักษ์', 'Find the rope bridge hanging between the giant trees',
    // two enormous rainforest trees with buttress roots rising out of the frame, a narrow plank-and-rope walkway sagging between them high above the forest, safety nets on the sides, a child walking across holding the ropes
    sky('#C8E6C9') + ring(6, (k) => C(10 + k * 46, 230, 34, ['#43A047', '#66BB6A'][k % 2], 3))
      + [[30, -1], [210, 1]].map(([x, d]) => R(x - 14, -4, 28, 210, '#8D6E63', 0, 3) + P(`M${x - 14} 206c-10 20-24 30-34 34h96c-10-4-24-14-34-34z`, '#8D6E63', 3) + C(x + d * 6, 20, 34, '#2E7D32', 3) + R(x - 22, 106, 44, 8, '#A1673F', 0, 2.5)).join('')
      + Lc('M44 110c40 30 112 30 152 0', '#8D6E63', 7) + ring(9, (k) => { const x = 54 + k * 16, y = 110 + Math.sin(((k + 0.5) / 9.5) * Math.PI) * 22; return Lc(`M${x.toFixed(1)} ${y.toFixed(1)}v-26`, '#A1887F', 2); })
      + Lc('M44 84c40 30 112 30 152 0', '#A1887F', 3) + Lc('M44 110c40 30 112 30 152 0', '#D7A86E', 3)
      + g(120, 130, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#FFCA28', 2) + face(0, -18, 0.22) + Lc('M-8-8l-10-12M8-8l10-12', '#FFE0BD', 3)) + face(120, 196, 0.4)),
  L('my/borneo/landmark-desafarm.v1.svg', 'ฟาร์มโคนมบนเนินเขาที่คุนดาซัง', 'The hillside dairy farm in Kundasang', ['desa dairy farm', 'ฟาร์มโคนมเดซา', 'kundasang', 'คุนดาซัง', 'dairy cows', 'วัวนม', 'fresh milk', 'นมสด', 'new zealand of sabah', 'นิวซีแลนด์แห่งซาบาห์'], 'หาวัวลายขาวดำบนเนินเขียว', 'Find the black-and-white cows on the green slope',
    // rolling bright green pasture on a cool hillside with black-and-white dairy cows grazing, a red barn and a white fence, a craggy grey mountain top far behind in the clouds, a child holding a bottle of milk
    sky('#E3F2FD') + P('M60 90l30-40 14 10 16-24 14 18 18-10 28 46z', '#78909C', 3) + Lc('M30 84c60-10 120 10 200-6', '#FFFFFF', 7)
      + P('M-4 110c60-20 140-20 248 6v128H-4z', '#8BC34A', 3) + P('M-4 160c60-30 160-30 248 0v84H-4z', '#9CCC65', 0)
      + R(170, 96, 50, 34, '#C62828', 0, 3) + P('M164 98l31-20 31 20z', '#8D2F2F', 3) + R(186, 110, 18, 20, '#FFFFFF', 0, 2) + Lc('M186 110l18 20M204 110l-18 20', '#C62828', 2)
      + Lc('M-4 150h120M10 140v20M40 140v20M70 140v20M100 140v20', '#FFFFFF', 4)
      + cow(70, 186, 1, 1) + cow(160, 170, 0.8, -1) + face(120, 220, 0.3)
      + g(214, 236, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#29B6F6', 2) + face(0, -18, 0.22) + R(-20, -24, 10, 20, '#FFFFFF', 3, 2) + R(-18, -28, 6, 5, '#29B6F6', 1, 1.5))),
];

export default { places: {}, items };
