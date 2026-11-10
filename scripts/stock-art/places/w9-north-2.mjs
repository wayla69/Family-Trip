// Wave 9, the north (part 2): Norway, Tromsø, Bergen and the fjords, Iceland, Reykjavík, Denmark, Copenhagen
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const X = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const water = (y, c = '#4FC3F7') => P(`M-4 ${y}h248v${244 - y}H-4z`, c, 0);
const waves = (pts, c = '#E1F5FE') => pts.map(([x, y]) => Lc(`M${x} ${y}q6-5 12 0t12 0`, c, 2.5)).join('');
// a white icing zigzag across a ring of the kransekake (half-width w at height y)
const zig = (w, y) => { const n = Math.max(3, Math.round(w / 8)); return Array.from({ length: n }, (_, j) => `${j ? 'L' : 'M'}${(120 - w + 6 + j * (2 * w - 12) / (n - 1)).toFixed(1)} ${y - 2 + (j % 2) * 5}`).join(''); };
const plate = (y = 186) => E(120, y, 104, 24, '#FFFFFF', 3) + E(120, y - 2, 88, 16, '#F1F8E9', 0);

const items = [
  // ---------- Norway
  X('no', 'food', 'krumkake', 'ครุมกาเคอ ขนมกรวยกรอบลายนูนใส่ครีม', 'Krumkake, crisp rolled cones with cream', ['krumkake', 'ครุมกาเคอ', 'waffle cone cookie', 'คุกกี้กรวย', 'christmas biscuits', 'ขนมคริสต์มาส', 'whipped cream', 'วิปครีม', 'norwegian christmas', 'krumkake iron'],
    // a thin round golden wafer pressed with a flower pattern being rolled round a wooden cone, and a finished rolled cone lying on a plate with whipped cream and berries spilling from its open end
    g(84, 78, 1, C(0, 0, 44, '#F2C27B', 3.5) + [0, 60, 120, 180, 240, 300].map((a) => E(0, -18, 7, 14, 'none', 2).replace('<ellipse', `<ellipse transform="rotate(${a})"`).replace('fill="none" stroke-width="2"', 'fill="none" stroke="#C98A2E" stroke-width="2"')).join('') + C(0, 0, 6, '#E9B04F', 2) + C(0, 0, 36, 'none', 1.5)
      + P('M-52 30L38-10c8 2 10 10 6 16L-50 38z', '#C8A165', 3) + R(36, -14, 22, 10, '#A1887F', 4, 2.5))
    + E(120, 200, 100, 20, '#FFFFFF', 3) + E(120, 198, 84, 13, '#F1F8E9', 0)
    + g(116, 172, 1, P('M-66 6L40-28c10 8 12 40 0 50z', '#E9B04F', 3.5) + Lc('M-40-2l4 20M-14-12l4 30M12-20l2 38M-56 4l94-18M-50 12l90-6', '#C98A2E', 2) + E(40, -3, 10, 25, '#F5C77E', 3)
      + P('M42-30c14-10 34 0 30 16 14 6 8 28-6 26 2 14-24 14-26 2-10-6-8-20 2-24-6-12 0-20 0-20z', '#FFFFFF', 3) + C(62, -18, 5, '#E53935', 2) + C(70, 4, 5, '#E53935', 2) + face(-10, 2, 0.3))),
  X('no', 'food', 'rommegrot', 'รึมเมเกรอต โจ๊กครีมเปรี้ยวกับเนยละลาย', 'Rømmegrøt, sour cream porridge with a pool of butter', ['rommegrot', 'รึมเมเกรอต', 'rømmegrøt', 'sour cream porridge', 'โจ๊กครีมเปรี้ยว', 'cinnamon sugar', 'อบเชยกับน้ำตาล', 'melted butter', 'เนยละลาย', 'norwegian porridge'],
    // a wooden bowl of thick creamy white porridge with a golden pool of melted butter in the middle, cinnamon and sugar sprinkled over it, a carved wooden spoon resting on the rim
    E(120, 196, 90, 14, '#D7CCC8', 0) + P('M28 120c0 56 36 80 92 80s92-24 92-80z', '#A1673F', 3.5) + Lc('M40 150c20 20 140 20 160 0', '#8D5232', 2)
    + E(120, 120, 92, 24, '#FFF8E1', 3.5) + P('M96 118c4-12 44-12 48 0 4 10-44 14-48 0z', '#FFCA28', 2.5) + E(116, 114, 8, 3, '#FFF59D', 0)
    + [[70, 116], [80, 128], [160, 112], [170, 126], [150, 130], [92, 132], [60, 124], [180, 118]].map(([x, y], i) => C(x, y, 2.2, i % 2 ? '#A0522D' : '#FFFFFF', i % 2 ? 0 : 1)).join('')
    + face(120, 160, 0.45) + g(186, 94, 1, E(0, 0, 12, 18, '#D7A86E', 3) + R(-4, 14, 8, 60, '#D7A86E', 4, 3) + E(0, -2, 6, 10, '#C69257', 0), -40)),
  X('no', 'food', 'kransekake', 'ครานเซกาเคอ หอคอยวงแหวนเค้กอัลมอนด์', 'Kransekake, the tower of almond rings', ['kransekake', 'ครานเซกาเคอ', 'ring cake tower', 'เค้กวงแหวนซ้อน', 'almond rings', 'วงแหวนอัลมอนด์', 'celebration cake', 'เค้กงานฉลอง', 'syttende mai', 'wedding cake norway'],
    // a tall cone made of stacked golden almond rings getting smaller to the top, each ring piped with a white icing zigzag, little paper crackers and sweets tucked around it
    E(120, 204, 96, 14, '#FFFFFF', 3)
    + Array.from({ length: 9 }, (_, k) => { const y = 192 - k * 17, w = 78 - k * 8; return E(120, y, w, 9, '#D99A48', 3) + Lc(zig(w, y), '#FFFFFF', 2.5); }).join('')
    + C(120, 40, 7, '#E53935', 2.5) + face(120, 158, 0.36)
    + [[40, 196, '#EC407A'], [200, 196, '#42A5F5'], [60, 170, '#FFCA28'], [182, 168, '#66BB6A']].map(([x, y, c]) => g(x, y, 1, R(-10, -5, 20, 10, c, 4, 2) + P('M-10 0l-7-6v12zM10 0l7-6v12z', c, 2))).join('')),
  X('no', 'culture', 'matpakke', 'มัตปัคเคอ ข้าวกล่องแซนด์วิชคั่นกระดาษ', 'A matpakke, sandwiches stacked with paper between', ['matpakke', 'มัตปัคเคอ', 'packed lunch', 'ข้าวกล่อง', 'open sandwiches', 'แซนด์วิชหน้าเปิด', 'brown cheese', 'ชีสสีน้ำตาล', 'lunch paper', 'school lunch norway'],
    // an open blue lunch box holding a neat stack of open sandwiches, each slice topped with brown cheese and separated by a sheet of white paper, an apple and a little cheese slicer beside it
    R(30, 112, 150, 92, '#42A5F5', 10, 3.5) + P('M30 112l12-58h126l12 58', '#90CAF9', 3) + R(40, 120, 130, 76, '#E3F2FD', 6, 2.5)
    + [0, 1, 2].map((k) => { const y = 176 - k * 22; return R(54, y, 102, 16, '#C9935A', 4, 3) + R(58, y - 6, 94, 8, '#B5651D', 2, 2.5) + P(`M50 ${y - 6}h110l-6-6H56z`, '#FFFFFF', 2); }).join('')
    + face(105, 160, 0.36)
    + g(204, 172, 1, C(0, 0, 20, '#E53935', 3.5) + Lc('M0-18c0-8 4-12 8-14', '#6D4C41', 3) + E(8, -26, 7, 4, '#66BB6A', 2) + E(-7, -7, 5, 3, '#EF9A9A', 0))
    + g(206, 108, 1, P('M-14-12h28l-4 14h-20z', '#CFD8DC', 3) + Lc('M-8-6h16', INK, 2) + R(-3, 2, 6, 36, '#8D6E63', 3, 2.5), 10)),

  // ---------- Tromsø
  L('no/tromso/landmark-okshornan.v1.svg', 'ยอดเขาฟันปีศาจโอกส์ฮอร์นานบนเกาะเซนยา', 'Okshornan, the Devil’s Teeth of Senja', ['okshornan', 'ยอดเขาโอกส์ฮอร์นาน', 'devils teeth', 'ฟันปีศาจ', 'tungeneset', 'ทุงเงเนเซต', 'senja', 'เกาะเซนยา', 'jagged peaks', 'ยอดเขาแหลมๆ'], 'นับยอดเขาแหลมเหมือนซี่ฟัน', 'Count the sharp peaks like a row of teeth',
    // a row of very sharp jagged mountain peaks like pointy teeth rising straight out of the sea, a curving wooden boardwalk with railings over smooth rocks in front
    sky('#FCE4EC') + C(60, 54, 16, '#FFE082', 2.5) + water(140, '#4FC3F7') + waves([[30, 160], [160, 152], [200, 172]])
    + P('M60 144l14-60 10 30 12-58 10 44 12-62 12 50 10-36 12 46 10-28 14 74z', '#78909C', 3.5) + P('M96 60l6 24-8-6zM120 50l6 30-10-8zM74 84l4 18-8-6z', '#FFFFFF', 2) + face(130, 116, 0.36)
    + P('M-4 190c40-16 90-20 150-12 40 6 70 20 98 40v26H-4z', '#A1887F', 3) + P('M20 214c40-30 100-38 160-18l-4 10c-56-18-110-12-150 16z', '#C8A165', 3)
    + [40, 80, 120, 160].map((x) => Lc(`M${x} ${210 - (x - 20) * 0.12}v-18`, '#6D4C41', 3)).join('') + Lc('M30 194c40-24 100-30 150-16', '#6D4C41', 3) + kid(110, 196, '#E53935', 0.8)),
  L('no/tromso/landmark-codtongues.v1.svg', 'เด็กๆ ตัดลิ้นปลาคอดหาเงินค่าขนม', 'Children cutting cod tongues for pocket money', ['cod tongues', 'ลิ้นปลาคอด', 'tungeskjæring', 'ตัดลิ้นปลา', 'skrei', 'ปลาสเครย์', 'lofoten winter', 'ฤดูหนาวโลโฟเทน', 'fishing village', 'pocket money'], 'หาถังที่เต็มไปด้วยลิ้นปลาเล็กๆ', 'Find the bucket full of little fish tongues',
    // a child in a warm hat and rubber apron at a wooden crate of big grey cod heads on a snowy quay, holding up a little cod tongue on a spike, a bucket of tongues beside and a red fishing shed behind
    sky('#BBDEFB') + R(150, 60, 90, 90, '#C62828', 2, 3.5) + P('M144 62l50-34 50 34z', '#37474F', 3) + R(176, 96, 28, 54, '#5D4037', 2, 3) + P('M-4 150h248v94H-4z', '#ECEFF1', 0) + Lc('M-4 150h248', INK, 3)
    + R(20, 150, 120, 50, '#A1887F', 3, 3.5) + Lc('M24 170h112M24 186h112', '#8D6E63', 2)
    + [[42, 146], [74, 140], [106, 146], [58, 128], [92, 126]].map(([x, y]) => g(x, y, 1, P('M-16 8c-4-14 4-22 16-22s20 8 18 22c-4 6-30 6-34 0z', '#90A4AE', 3) + C(-6, -4, 3.5, '#FFFFFF', 2) + C(-6, -4, 1.5, INK, 0) + P('M4 6c4-4 10-4 12 0', 'none', 2))).join('')
    + g(174, 196, 1, R(-14, -26, 28, 40, '#FFCA28', 6, 3) + C(0, -40, 13, '#FFE0BD', 3) + P('M-13-44c0-16 26-16 26 0z', '#1E88E5', 2.5) + C(0, -60, 5, '#FFFFFF', 2) + face(0, -38, 0.28) + Lc('M-12-18l-16-22', '#FFE0BD', 5) + Lc('M-28-40v-20', INK, 2.5) + E(-28, -56, 6, 4, '#F8BBD0', 2))
    + g(214, 214, 1, P('M-14-14h28l-4 26h-20z', '#80CBC4', 3) + E(0, -14, 14, 4, '#F8BBD0', 2.5))),
  L('no/tromso/landmark-snowplough.v1.svg', 'รถไถหิมะคันใหญ่ในเมืองทรอมโซ', 'A giant snow plough clearing the streets', ['snow plough', 'รถไถหิมะ', 'snow clearing', 'กวาดหิมะ', 'deep snow', 'หิมะหนา', 'polar winter', 'ฤดูหนาวขั้วโลก', 'snowbanks', 'กองหิมะสูง'], 'หาใบมีดสีเหลืองที่ดันหิมะเป็นคลื่น', 'Find the yellow blade pushing a wave of snow',
    // a big orange truck with flashing lights and a wide angled yellow blade throwing a curling wave of snow to the side, snowbanks taller than a child, a dark blue polar sky with stars
    sky('#283593') + [[30, 30], [80, 50], [190, 28], [214, 70], [130, 24]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('') + P('M-4 140c40-20 60-10 80-14 30-6 50 4 70 0 40-8 70-2 98-10v128H-4z', '#FFFFFF', 3)
    + R(-4, 196, 248, 48, '#ECEFF1', 0, 0)
    + g(140, 170, 1, R(-20, -50, 70, 52, '#FB8C00', 6, 3.5) + R(-12, -42, 30, 22, '#B3E5FC', 3, 2.5) + R(22, -70, 26, 22, '#FB8C00', 4, 3) + R(-26, 0, 80, 12, '#455A64', 3, 3) + C(-8, 14, 13, '#263238', 3) + C(36, 14, 13, '#263238', 3)
      + R(-6, -58, 14, 8, '#FFEB3B', 3, 2) + Lc('M-6-66l-6-6M8-66l6-6', '#FFEB3B', 3) + face(22, -26, 0.3))
    + P('M118 150l-40 30 6 14 46-24z', '#FDD835', 3.5) + P('M78 180c-20-8-30-30-20-50 10 6 14 14 12 26 12-16 24-20 34-14-10 8-12 20-10 30z', '#FFFFFF', 3) + [[56, 120], [70, 106], [44, 140]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 2)).join('')
    + kid(26, 196, '#E53935', 0.85)),
  L('no/tromso/landmark-seedvault.v1.svg', 'คลังเมล็ดพันธุ์โลกในภูเขาน้ำแข็งสวาลบาร์', 'The Svalbard Global Seed Vault in the frozen mountain', ['svalbard global seed vault', 'คลังเมล็ดพันธุ์โลก', 'doomsday vault', 'ห้องนิรภัยเมล็ดพันธุ์', 'longyearbyen', 'ลองเยียร์เบียน', 'seeds of the world', 'เมล็ดพันธุ์ทั่วโลก', 'permafrost', 'arctic archipelago'], 'หาประตูคอนกรีตที่โผล่ออกมาจากภูเขาหิมะ', 'Find the concrete doorway sticking out of the snowy mountain',
    // a narrow grey concrete wedge sticking out of a snowy mountainside, its top edge glowing turquoise, a little metal door at the front, a path in the snow and a sprouting seed floating in a bubble
    sky('#B3E5FC') + P('M-4 150l60-90 70 50 60-70 58 70v134H-4z', '#FFFFFF', 3.5) + P('M56 60l14 30-14-10-10 14zM186 40l14 24-12-6-8 12z', '#CFD8DC', 2)
    + P('M70 176l60-90 50 6-20 84z', '#B0BEC5', 3.5) + P('M130 86l50 6-4 16-50-6z', '#4DD0E1', 3) + Lc('M136 94l36 4', '#E0F7FA', 3) + R(140, 140, 22, 32, '#78909C', 3, 3) + C(156, 156, 2, INK, 0)
    + face(114, 140, 0.34) + P('M-4 190c60-16 160-16 248 0v54H-4z', '#FFFFFF', 3) + Lc('M150 190l-30 50', '#E1F5FE', 6)
    + g(56, 108, 1, C(0, 0, 22, '#E8F5E9', 3) + E(0, 8, 9, 6, '#A1673F', 2.5) + Lc('M0 4v-14', '#43A047', 3) + E(-7, -12, 7, 4, '#66BB6A', 2) + E(7, -14, 7, 4, '#66BB6A', 2))
    + kid(100, 214, '#7E57C2', 0.85)),
  // ---------- Bergen and the fjords
  L('no/bergen/landmark-balestrand.v1.svg', 'วิลลาไม้สไตล์มังกรที่บาเลสตรันด์', 'The dragon-style wooden villas of Balestrand', ['balestrand', 'บาเลสตรันด์', 'dragon style', 'สไตล์มังกร', 'dragestil', 'wooden villa', 'วิลลาไม้', 'sognefjord', 'ซองเนฟยอร์ด', 'carved dragon heads'], 'หาหัวมังกรไม้ที่ปลายหลังคา', 'Find the carved dragon heads at the roof ends',
    // a pale yellow wooden villa with steep criss-cross gables and fretwork balconies, little carved dragon heads curling up at each roof end, standing on a green shore by the fjord
    sky('#E1F5FE') + P('M-4 120l60-40 50 30 60-50 78 56v28H-4z', '#81C784', 3) + water(150, '#4FC3F7') + waves([[20, 180], [160, 200]])
    + P('M40 170V100h150v70z', '#FFF59D', 3.5) + P('M30 104l50-60 50 60z', '#C62828', 3.5) + P('M110 104l46-44 46 44z', '#C62828', 3.5)
    + P('M30 104c-10-4-14-14-8-20 4 6 8 8 14 6M202 104c10-4 14-14 8-20-4 6-8 8-14 6M80 44c-4-10 2-18 10-18-2 6 0 10 4 12M156 60c-4-10 2-18 10-18-2 6 0 10 4 12', '#43A047', 3)
    + [[50, 116], [92, 116], [140, 116], [174, 116]].map(([x, y]) => R(x, y, 18, 24, '#B3E5FC', 2, 2.5) + Lc(`M${x + 9} ${y}v24`, '#FFFFFF', 2)).join('') + R(40, 146, 150, 8, '#FFFFFF', 2, 2.5) + [50, 70, 90, 110, 130, 150, 170].map((x) => Lc(`M${x} 146v8`, INK, 1.5)).join('')
    + Lc('M60 80l20 20 20-20M136 78l20 18 20-18', '#FFFFFF', 3) + face(80, 76, 0.26) + P('M-4 170h248v6H-4z', '#A5D6A7', 0)),
  L('no/bergen/landmark-kjeasen.v1.svg', 'ฟาร์มเกยอาเซนบนหิ้งหน้าผาเหนือฟยอร์ด', 'Kjeåsen, the farm on a cliff ledge above the fjord', ['kjeasen', 'ฟาร์มเกยอาเซน', 'kjeåsen farm', 'cliff farm', 'ฟาร์มบนหน้าผา', 'eidfjord', 'ไอด์ฟยอร์ด', 'hardangerfjord', 'ฮาร์ดังเงอร์ฟยอร์ด', 'mountain farm'], 'หาบ้านหลังจิ๋วบนหิ้งหินสูงๆ', 'Find the tiny houses on the high rock ledge',
    // a huge sheer grey cliff dropping into a blue fjord, halfway up a little green ledge with a red farmhouse, a white house and a barn, a zigzag path climbing up to it
    sky('#E3F2FD') + water(196, '#29B6F6') + waves([[40, 214], [160, 226]])
    + P('M-4 200L20 40l60-20 60 30 40-10 64 30v130z', '#90A4AE', 3.5) + Lc('M40 60l-6 120M120 50l4 140M190 70l-4 120', '#78909C', 2)
    + P('M70 112c20-8 80-8 104 0l-4 14c-30-6-70-6-96 0z', '#8BC34A', 3) + R(92, 90, 22, 18, '#C62828', 1, 2.5) + P('M90 92l13-10 13 10z', '#455A64', 2) + R(128, 92, 18, 16, '#FFFFFF', 1, 2.5) + P('M126 94l11-8 11 8z', '#455A64', 2) + R(154, 96, 16, 14, '#8D6E63', 1, 2.5)
    + P('M60 196l30-20-20-14 30-14-20-12 30-10', 'none', 2.5) + face(120, 150, 0.4) + kid(82, 200, '#FFCA28', 0.6)),
  L('no/bergen/landmark-haarteigen.v1.svg', 'ภูเขาหมวกฮอร์ไทเกนบนที่ราบสูงฮาร์ดังเงอร์วิดดา', 'Hårteigen, the hat-shaped mountain on Hardangervidda', ['harteigen', 'ภูเขาฮอร์ไทเกน', 'hårteigen', 'hat mountain', 'ภูเขารูปหมวก', 'hardangervidda', 'ที่ราบสูงฮาร์ดังเงอร์วิดดา', 'mountain plateau', 'ที่ราบบนเขา', 'tarns'], 'หาภูเขาที่หน้าตาเหมือนหมวกใบใหญ่', 'Find the mountain that looks like a giant hat',
    // a wide flat brown-green plateau dotted with small blue tarns and snow patches, and in the middle one lonely steep-sided flat-topped mountain shaped like a top hat with snow on its brim
    sky('#FFF8E1') + P('M-4 140c60-6 180-6 248 0v104H-4z', '#A5B57A', 3)
    + P('M70 142l14-70h72l14 70z', '#78909C', 3.5) + P('M84 72c10-6 62-6 72 0', '#FFFFFF', 3) + P('M60 144c20-10 100-10 120 0', '#FFFFFF', 3) + Lc('M100 80l-4 56M140 80l4 56', '#607D8B', 2) + face(120, 108, 0.4)
    + [[40, 176, 24], [170, 190, 30], [90, 210, 18], [214, 160, 14]].map(([x, y, w]) => E(x, y, w, w * 0.3, '#4FC3F7', 2.5)).join('') + [[20, 156], [130, 168], [200, 220]].map(([x, y]) => E(x, y, 12, 4, '#FFFFFF', 2)).join('')
    + kid(60, 214, '#E53935', 0.8) + kid(132, 226, '#1E88E5', 0.8)),
  L('no/bergen/landmark-kontiki.v1.svg', 'แพคอนติกิ แพไม้บัลซาข้ามมหาสมุทร', 'The Kon-Tiki balsa raft', ['kon-tiki museum', 'พิพิธภัณฑ์คอนติกิ', 'balsa raft', 'แพไม้บัลซา', 'bygdoy', 'บิกเดอย', 'ocean raft', 'แพข้ามมหาสมุทร', 'oslo museum', 'museum peninsula'], 'หาแพไม้ท่อนใหญ่ที่มีใบเรือสี่เหลี่ยม', 'Find the log raft with the square sail',
    // a raft of big round balsa logs tied side by side, a little bamboo hut with a leaf roof on it and a tall square sail with a sun painted on it, rolling on blue ocean waves
    sky('#E1F5FE') + water(170, '#29B6F6') + waves([[20, 200], [110, 222], [180, 206]])
    + Lc('M120 156V30M100 40l20-10 20 10', '#8D6E63', 5) + R(76, 40, 88, 80, '#FFE0B2', 2, 3.5) + C(120, 80, 20, '#FF7043', 3) + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => Lc(`M${(120 + 24 * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(80 + 24 * Math.sin(a * Math.PI / 180)).toFixed(1)}l${(8 * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(8 * Math.sin(a * Math.PI / 180)).toFixed(1)}`, '#FF7043', 3)).join('')
    + R(150, 130, 50, 30, '#D7B98E', 2, 3) + P('M144 132l31-22 31 22z', '#9CCC65', 3) + Lc('M162 130v30M182 130v30', '#A1887F', 2)
    + [40, 64, 88, 112, 136, 160, 184, 208].map((x) => R(x - 12, 156, 24, 22, '#D7A86E', 11, 3)).join('') + Lc('M28 167h192', '#8D6E63', 2) + face(120, 80, 0.32) + kid(80, 156, '#43A047', 0.8)),
  // ---------- Iceland
  X('is', 'animal', 'sheepdog', 'สุนัขเลี้ยงแกะไอซ์แลนด์ หางม้วนขนปุย', 'An Icelandic sheepdog with its curly tail', ['icelandic sheepdog', 'สุนัขเลี้ยงแกะไอซ์แลนด์', 'icelandic dog', 'หมาไอซ์แลนด์', 'curly tail', 'หางม้วน', 'fluffy dog', 'หมาขนปุย', 'farm dog', 'spitz'],
    // a fluffy cream-and-tan spitz dog with pointy ears, a white chest ruff and a thick tail curled up over its back, standing happily on a mossy rock
    E(120, 206, 96, 14, '#8BC34A', 3) + P('M50 206c0-20 4-26 10-26h120c6 0 10 6 10 26z', '#9E9E9E', 3)
    + g(124, 150, 1, P('M-46-6c0-22 20-30 46-30s40 6 44 24c2 18-6 30-12 34v22h-14v-18h-36v18h-14v-20c-10-4-14-16-14-30z', '#E7B97B', 3.5)
      + P('M30-26c22-14 34 0 26 14-6 10-20 8-22-2 10 2 12-8 4-10', '#F5DEB3', 3) + R(-40, 16, 12, 24, '#E7B97B', 5, 3) + R(-24, 16, 12, 24, '#E7B97B', 5, 3)
      + g(-48, -34, 1, P('M-26 0c0-18 10-28 26-28s26 10 26 28c0 16-12 24-26 24S-26 16-26 0z', '#E7B97B', 3.5) + P('M-22-14l-4-24 16 12zM22-14l4-24-16 12z', '#E7B97B', 3) + P('M-18-14l-2-12 8 6zM18-14l2-12-8 6z', '#F8BBD0', 0) + P('M-14 8c4 14 24 14 28 0-6-8-22-8-28 0z', '#FFFFFF', 0) + E(0, 6, 5, 4, INK, 0) + face(0, -4, 0.38, 'none') + P('M-5 14q5 5 10 0', 'none', 2))
      + P('M-36-10c6 14 6 26 0 34 14 0 20-14 18-28z', '#FFFFFF', 2.5))),
  X('is', 'food', 'flatkaka', 'ฟลัตกากาขนมปังแผ่นไหม้กับเนื้อแกะรมควัน', 'Flatkaka with smoked lamb', ['flatkaka', 'ฟลัตกากา', 'icelandic flatbread', 'ขนมปังแผ่นไอซ์แลนด์', 'hangikjot', 'ฮังกิกเยิต', 'smoked lamb', 'เนื้อแกะรมควัน', 'rye flatbread', 'charred spots'],
    // a round thin rye flatbread freckled with dark scorch spots from the griddle, buttered and topped with folded pink slices of smoked lamb, a second flatbread stacked behind
    E(120, 190, 104, 22, '#FFFFFF', 3) + E(126, 118, 82, 40, '#B07B4A', 3) + E(114, 140, 88, 46, '#C08A55', 3.5)
    + [[70, 130], [96, 118], [140, 120], [168, 138], [82, 160], [120, 168], [158, 160], [104, 142], [138, 146]].map(([x, y], i) => E(x, y, 6 + (i % 3), 4, '#5D3A1A', 0)).join('')
    + [[92, 128, -10], [124, 136, 6], [150, 124, -4]].map(([x, y, r]) => g(x, y, 1, P('M-22 0c4-12 40-12 44 0-4 10-40 10-44 0z', '#F4A6A6', 2.5) + Lc('M-16 0h32', '#FCE4EC', 2) + P('M-22 0c2 6 6 8 10 8', 'none', 1.5), r)).join('')
    + face(116, 166, 0.4)),
  X('is', 'food', 'hjonabandssaela', 'เค้ก "ชีวิตคู่แสนสุข" ข้าวโอ๊ตกับแยมรูบาร์บ', 'Hjónabandssæla, the “happy marriage” oat and rhubarb cake', ['happy marriage cake', 'เค้กชีวิตคู่แสนสุข', 'hjonabandssaela', 'โยนาบันด์ไซลา', 'rhubarb jam', 'แยมรูบาร์บ', 'oat crumble cake', 'เค้กข้าวโอ๊ต', 'icelandic coffee cake', 'kaffi'],
    // a square slice of crumbly golden oat cake with a thick layer of shiny pink rhubarb jam in the middle and a crumbly oat top, a rhubarb stalk with a big leaf beside the plate
    E(116, 190, 96, 22, '#FFFFFF', 3) + E(116, 188, 80, 14, '#FFF3E0', 0)
    + R(50, 150, 132, 32, '#E0A85C', 4, 3.5) + R(50, 128, 132, 22, '#D81B60', 2, 3) + E(80, 136, 14, 4, '#F48FB1', 0)
    + P('M48 130c6-14 14-4 22-12s14 6 22-4 16 6 24-4 16 8 24-2 16 6 22-2 14 6 20 4v20H48z', '#F2C27B', 3) + [[64, 120], [96, 116], [130, 118], [160, 120], [80, 112]].map(([x, y]) => C(x, y, 3, '#FFE0B2', 1.5)).join('')
    + face(116, 166, 0.4) + Lc('M200 210l10-90', '#E57373', 6) + Lc('M200 210l10-90', INK, 1.5) + P('M210 120c-20-10-30-34-14-46 4-14 26-14 30 2 18 4 18 30 2 40z', '#66BB6A', 3) + Lc('M210 120c0-16 4-28 8-38', '#388E3C', 2)),
  X('is', 'transport', 'onelanebridge', 'สะพานเลนเดียวบนถนนวงแหวน', 'A one-lane bridge on the Ring Road', ['one lane bridge', 'สะพานเลนเดียว', 'single lane bridge', 'สะพานแคบ', 'ring road', 'ถนนวงแหวน', 'route 1', 'ทางหลวงหมายเลขหนึ่ง', 'glacial river', 'icelandic road trip'],
    // a long narrow steel girder bridge just wide enough for one car over a milky blue glacial river, a little car crossing, another car waiting politely at the end beside a triangle warning sign
    sky('#E0F7FA') + P('M-4 120l40-30 40 20 50-36 50 30 68-14v30H-4z', '#B0BEC5', 3) + P('M-4 150h248v94H-4z', '#5D4037', 0) + P('M-4 160c60 10 180 10 248 0v84H-4z', '#80DEEA', 3) + Lc('M30 190q10-6 20 0t20 0M150 200q10-6 20 0t20 0', '#E0F7FA', 3)
    + R(20, 132, 200, 14, '#B0BEC5', 2, 3.5) + Lc('M20 120h200M20 120v12M60 120v12M100 120v12M140 120v12M180 120v12M220 120v12M20 132l40-12M60 132l40-12M100 132l40-12M140 132l40-12M180 132l40-12', INK, 2.5)
    + [60, 120, 180].map((x) => R(x - 6, 146, 12, 40, '#90A4AE', 2, 3)).join('')
    + g(110, 124, 1, P('M-22 6v-12c0-6 4-8 8-8h6l6-8h16l8 8h4c4 0 6 2 6 8v12z', '#E53935', 3) + R(-2, -12, 10, 6, '#B3E5FC', 1, 1.5) + C(-12, 8, 5, INK, 0) + C(16, 8, 5, INK, 0) + face(4, -2, 0.2))
    + g(228, 124, 0.8, P('M-22 6v-12c0-6 4-8 8-8h6l6-8h16l8 8h4c4 0 6 2 6 8v12z', '#FFCA28', 3) + C(-12, 8, 5, INK, 0) + C(16, 8, 5, INK, 0))
    + g(206, 96, 1, Lc('M0 30v-20', INK, 3) + P('M-14 10l14-24 14 24z', '#FFFFFF', 3) + P('M-14 10l14-24 14 24z', 'none', 0) + Lc('M-4 6l2-10M4 6l-2-10', INK, 2) + P('M-16 12l16-28 16 28z', 'none', 2).replace('stroke-width="2"', 'stroke="#E53935" stroke-width="3"'))),

  // ---------- Reykjavík
  L('is/reykjavik/landmark-hofdi.v1.svg', 'บ้านขาวเฮิฟดีริมอ่าวเรคยาวิก', 'Höfði, the white wooden house by the bay', ['hofdi house', 'บ้านเฮิฟดี', 'höfði', 'white wooden house', 'บ้านไม้สีขาว', 'faxafloi bay', 'อ่าวฟักซาฟลอย', 'esja mountain', 'ภูเขาเอสยา', 'borgartun'], 'หาหน้าต่างหลังคาเล็กๆ บนบ้านสีขาว', 'Find the little dormer windows on the white house',
    // a neat white wooden house with a grey roof, dormer windows and a small porch on a green lawn by the sea, a long flat-topped mountain across the water
    sky('#E3F2FD') + P('M-4 110c40-20 90-30 140-28 50 2 80 14 108 26v12H-4z', '#78909C', 3) + P('M90 84c20-6 50-6 70 0', '#FFFFFF', 2.5) + water(118, '#64B5F6') + waves([[20, 134], [190, 130]])
    + P('M-4 150h248v94H-4z', '#81C784', 0) + Lc('M-4 150h248', INK, 3)
    + R(50, 104, 140, 76, '#FFFFFF', 2, 3.5) + P('M40 106l30-36h100l30 36z', '#607D8B', 3.5) + [[82, 76], [142, 76]].map(([x, y]) => R(x, y, 16, 16, '#FFFFFF', 2, 2.5) + P(`M${x - 2} ${y}l10-8 10 8z`, '#607D8B', 2) + R(x + 4, y + 4, 8, 8, '#B3E5FC', 1, 1.5)).join('')
    + [[62, 118], [92, 118], [132, 118], [162, 118], [62, 148], [162, 148]].map(([x, y]) => R(x, y, 16, 20, '#B3E5FC', 1, 2.5)).join('') + R(104, 142, 32, 38, '#FFFFFF', 2, 3) + P('M100 144l20-14 20 14z', '#607D8B', 2.5) + R(112, 150, 16, 30, '#8D6E63', 2, 2.5)
    + face(120, 116, 0.3) + kid(30, 196, '#E53935', 0.85) + kid(214, 200, '#FFCA28', 0.85)),
  L('is/reykjavik/landmark-tjornin.v1.svg', 'ให้อาหารนกที่บ่อน้ำเชอร์นินกลางเมือง', 'Feeding the birds at Tjörnin, the town pond', ['tjornin', 'บ่อน้ำเชอร์นิน', 'tjörnin pond', 'city pond', 'บ่อน้ำกลางเมือง', 'feeding ducks', 'ให้อาหารเป็ด', 'reykjavik city hall', 'ศาลาว่าการเรคยาวิก', 'greylag geese'], 'หาเด็กที่โยนขนมปังให้นก', 'Find the child throwing bread to the birds',
    // a calm pond with a low modern city hall standing on pillars in the water, brightly painted houses with red and green roofs along the far shore, geese and ducks paddling towards a child with bread
    sky('#FFF8E1') + [[10, '#E57373', '#C62828'], [46, '#FFF176', '#2E7D32'], [82, '#90CAF9', '#C62828'], [196, '#A5D6A7', '#1565C0']].map(([x, c, r]) => R(x, 66, 32, 40, c, 1, 3) + P(`M${x - 4} 68l20-18 20 18z`, r, 3) + R(x + 10, 80, 10, 12, '#FFFFFF', 1, 2)).join('')
    + R(116, 74, 76, 30, '#ECEFF1', 2, 3) + R(116, 70, 76, 8, '#CFD8DC', 2, 2.5) + Lc('M130 78v26M150 78v26M170 78v26', '#B0BEC5', 2) + [126, 146, 166, 186].map((x) => R(x - 3, 104, 6, 14, '#90A4AE', 1, 2)).join('')
    + water(106, '#4FC3F7') + Lc('M120 122q10-5 20 0t20 0M30 130q10-5 20 0', '#E1F5FE', 2.5) + P('M-4 196c60-10 180-10 248 0v48H-4z', '#81C784', 3)
    + [[60, 160, '#90A4AE'], [104, 172, '#795548'], [150, 150, '#90A4AE']].map(([x, y, c]) => g(x, y, 1, E(0, 0, 18, 10, c, 2.5) + C(12, -12, 7, c, 2.5) + Lc('M12-6v6', c, 4) + P('M18-13l8 2-8 3z', '#FF9800', 2) + C(13, -14, 1.5, INK, 0))).join('')
    + g(200, 214, 1, R(-10, -14, 20, 22, '#26A69A', 5, 2.5) + C(0, -24, 10, '#FFE0BD', 2.5) + face(0, -22, 0.22) + Lc('M-10-8l-16-10', '#FFE0BD', 4) + E(-30, -20, 6, 4, '#E0A458', 2)) + [[170, 186], [180, 176]].map(([x, y]) => C(x, y, 2.5, '#E0A458', 1)).join('')
    + face(154, 92, 0.24)),
  L('is/reykjavik/landmark-almannagja.v1.svg', 'เดินในหุบเขาแยกอัลมันนาเกียที่ทิงเวลลีร์', 'Walking through the Almannagjá rift at Þingvellir', ['almannagja', 'หุบแยกอัลมันนาเกีย', 'almannagjá', 'thingvellir', 'อุทยานทิงเวลลีร์', 'continental rift', 'รอยแยกเปลือกโลก', 'plate boundary', 'ระหว่างสองทวีป', 'canyon path'], 'หาทางเดินระหว่างกำแพงหินสองฝั่ง', 'Find the path between the two rock walls',
    // a path running between two tall dark lava cliffs, the left wall sheer and the right wall lower and cracked, moss on the ledges and small people walking through, a green plain beyond
    sky('#E3F2FD') + P('M80 140l40-10 40 10v104H80z', '#A5D6A7', 0)
    + P('M-4 -4h96l-4 248H-4z', '#455A64', 3.5) + [[20, 40], [50, 80], [30, 130], [60, 170]].map(([x, y]) => Lc(`M${x} ${y}h30`, '#37474F', 2.5)).join('') + [[10, 60], [40, 110], [70, 150]].map(([x, y]) => E(x, y, 10, 4, '#7CB342', 2)).join('')
    + P('M244 60l-80 20 10 164h70z', '#546E7A', 3.5) + Lc('M190 100l6 40M210 140l-4 50', '#37474F', 2.5) + E(200, 82, 12, 4, '#7CB342', 2)
    + P('M88 244l20-104h20l40 104z', '#BCAAA4', 3) + Lc('M110 160l-4 20M130 200l-6 30', '#A1887F', 2) + face(48, 96, 0.4)
    + kid(118, 200, '#E53935', 0.8) + kid(132, 168, '#1E88E5', 0.6) + kid(124, 146, '#FFCA28', 0.45)),
  L('is/reykjavik/landmark-hellisheidi.v1.svg', 'ท่อไอน้ำร้อนโรงไฟฟ้าใต้พิภพเฮลลิสเฮย์ดี', 'The steaming pipes of the Hellisheiði geothermal plant', ['hellisheidi', 'เฮลลิสเฮย์ดี', 'geothermal power plant', 'โรงไฟฟ้าความร้อนใต้พิภพ', 'steam pipes', 'ท่อไอน้ำ', 'hengill', 'เฮงกิล', 'clean energy', 'พลังงานสะอาด'], 'หาท่อเงินที่โค้งข้ามทุ่งมอส', 'Find the silver pipes looping over the mossy fields',
    // long shiny silver pipes snaking and looping over green moss-covered lava fields, big white clouds of steam puffing from tall vents and a low grey power station building behind
    sky('#ECEFF1') + P('M-4 120h248v124H-4z', '#9CCC65', 0) + Lc('M-4 120h248', INK, 3) + [[30, 150], [90, 210], [180, 160], [210, 220], [50, 230]].map(([x, y]) => E(x, y, 18, 7, '#7CB342', 2)).join('')
    + R(130, 84, 90, 38, '#CFD8DC', 2, 3.5) + R(150, 70, 30, 16, '#B0BEC5', 2, 3)
    + [[60, 60], [100, 40], [196, 44]].map(([x, y]) => R(x - 6, y + 30, 12, 50, '#90A4AE', 2, 3) + P(`M${x - 18} ${y + 30}c-14-4-14-24 0-26 0-16 24-20 30-6 14-6 26 10 14 22 6 10-6 16-14 12-8 6-24 4-30-2z`, '#FFFFFF', 3)).join('')
    + Lc('M-4 180h60c16 0 16-24 32-24s16 24 32 24h124', '#B0BEC5', 10) + Lc('M-4 180h60c16 0 16-24 32-24s16 24 32 24h124', INK, 1.5) + Lc('M-4 206h40c14 0 14-20 28-20s14 20 28 20h152', '#CFD8DC', 9) + Lc('M-4 206h40c14 0 14-20 28-20s14 20 28 20h152', INK, 1.5)
    + [40, 140, 200].map((x) => R(x - 4, 184, 8, 16, '#78909C', 1, 2)).join('') + face(176, 102, 0.3)),
  L('is/reykjavik/landmark-asmundarsafn.v1.svg', 'พิพิธภัณฑ์อัสมุนดูร์ ตึกขาวโดมกับยอดแหลม', 'Ásmundarsafn, the white domes and pyramid', ['asmundarsafn', 'พิพิธภัณฑ์อัสมุนดูร์', 'ásmundarsafn', 'sculpture museum', 'พิพิธภัณฑ์ประติมากรรม', 'white dome', 'โดมสีขาว', 'laugardalur', 'เลาการ์ดาลูร์', 'sculpture garden'], 'หาโดมกลมกับยอดแหลมสีขาว', 'Find the round dome and the white pointed roof',
    // a white house with a round igloo-like dome on one side and a tall pointed pyramid roof on the other, joined by a curved white wall, on a green lawn under a blue sky
    sky('#BBDEFB') + P('M-4 176h248v68H-4z', '#81C784', 0) + Lc('M-4 176h248', INK, 3)
    + P('M24 178c0-60 80-60 80 0z', '#FAFAFA', 3.5) + Lc('M40 140c10-6 40-6 50 0M34 160h60', '#E0E0E0', 2) + R(56, 154, 16, 24, '#B3E5FC', 8, 2.5)
    + P('M136 178V100l30-60 30 60v78z', '#FAFAFA', 3.5) + Lc('M166 40v138', '#E0E0E0', 2) + R(156, 128, 20, 24, '#B3E5FC', 2, 2.5)
    + P('M100 178v-30c10-10 26-10 36 0v30z', '#ECEFF1', 3) + face(64, 128, 0.32) + kid(120, 206, '#E53935', 0.85) + kid(210, 206, '#7E57C2', 0.85)),

  // ---------- Denmark
  X('dk', 'food', 'aebleskiver', 'เอเบิลสกีเวอร์ ขนมลูกกลมในกระทะหลุม', 'Æbleskiver, round pancake puffs in their dimpled pan', ['aebleskiver', 'เอเบิลสกีเวอร์', 'æbleskiver', 'pancake balls', 'แพนเค้กลูกกลม', 'christmas treat', 'ขนมคริสต์มาส', 'powdered sugar and jam', 'น้ำตาลไอซิ่งกับแยม', 'cast iron pan'],
    // a heavy black pan with seven round dimples, golden puffy round pancake balls sitting in them, one being turned with a knitting needle, a little bowl of jam and a dusting of icing sugar
    g(110, 140, 1, C(0, 0, 74, '#37474F', 3.5) + Lc('M70 0h70', '#263238', 12) + Lc('M70 0h70', INK, 2)
      + [[0, 0], [0, -44], [38, -22], [38, 22], [0, 44], [-38, 22], [-38, -22]].map(([x, y], i) => C(x, y, 20, '#263238', 2.5) + (i === 3 ? '' : C(x, y - 2, 17, '#E3A24A', 3) + E(x - 5, y - 8, 6, 3, '#F5C77E', 0) + C(x + 4, y - 6, 1.5, '#FFFFFF', 0))).join('') + E(38, 22, 16, 12, '#FFE9B0', 2.5) + face(0, 2, 0.26))
    + Lc('M148 162l40-60', '#90A4AE', 3) + g(52, 210, 1, P('M-20-6c0 16 40 16 40 0z', '#FFFFFF', 3) + E(0, -6, 20, 6, '#C62828', 2.5))),
  X('dk', 'food', 'hindbaersnitter', 'ฮินแบร์สนิตเตอร์ ขนมชั้นแยมราสป์เบอร์รีโรยเม็ดสี', 'Hindbærsnitter, raspberry slices with sprinkles', ['hindbaersnitter', 'ฮินแบร์สนิตเตอร์', 'raspberry slice', 'ขนมแยมราสป์เบอร์รี', 'shortbread with jam', 'ชอร์ตเบรดไส้แยม', 'sprinkles', 'เม็ดน้ำตาลสี', 'danish bakery', 'konditori'],
    // two neat rectangular slices of crumbly shortbread sandwiched with red raspberry jam, white icing on top scattered with colourful sugar sprinkles, on a little plate
    E(120, 184, 100, 22, '#FFFFFF', 3) + E(120, 182, 84, 14, '#FFEBEE', 0)
    + [[86, 150, -8], [152, 142, 8]].map(([x, y, r], i) => g(x, y, 1, R(-36, 4, 72, 14, '#F3C98B', 3, 3) + R(-36, -4, 72, 9, '#C2185B', 2, 2.5) + R(-36, -18, 72, 14, '#F3C98B', 3, 3) + R(-38, -26, 76, 10, '#FFFFFF', 4, 3)
      + [[-28, -22, '#E53935'], [-16, -20, '#1E88E5'], [-4, -23, '#FFCA28'], [8, -21, '#43A047'], [20, -23, '#AB47BC'], [30, -20, '#FF7043']].map(([a, b, c]) => R(a, b, 5, 2.5, c, 1, 0)).join('') + (i === 0 ? face(0, 10, 0.28) : face(0, 10, 0.26, 'o')), r)).join('')),
  X('dk', 'culture', 'roundchurch', 'โบสถ์ทรงกลมสีขาวบนเกาะบอร์นโฮล์ม', 'A white round church on Bornholm', ['bornholm round church', 'โบสถ์ทรงกลมบอร์นโฮล์ม', 'østerlars', 'เออสเตอร์ลาร์ส', 'round church', 'โบสถ์กลม', 'bornholm', 'เกาะบอร์นโฮล์ม', 'whitewashed', 'black cone roof'],
    // a chunky round whitewashed building with thick sloping buttresses round its foot, a tall black cone-shaped roof and a little round turret on top, among yellow fields
    sky('#E3F2FD') + P('M-4 170c50-10 190-10 248 0v74H-4z', '#FFE082', 3) + Lc('M20 200l60-8M150 196l70 8', '#FBC02D', 2.5)
    + P('M58 190v-90h124v90z', '#FFFFFF', 3.5) + P('M58 100c0 10 124 10 124 0', 'none', 2)
    + [[56, 190], [100, 196], [140, 196], [184, 190]].map(([x, y]) => P(`M${x - 8} ${y}l6-46h12l6 46z`, '#F5F5F5', 3)).join('')
    + P('M52 102l68-62 68 62c-30 10-106 10-136 0z', '#37474F', 3.5) + R(110, 18, 20, 26, '#FFFFFF', 3, 3) + P('M106 20l14-14 14 14z', '#37474F', 3) + [[86, 128], [150, 128]].map(([x, y]) => R(x - 5, y, 10, 18, '#90A4AE', 5, 2.5)).join('') + R(108, 150, 24, 40, '#8D6E63', 12, 3)
    + face(120, 122, 0.38)),
  X('dk', 'culture', 'nisse', 'นิสเซอ ภูตตัวจิ๋วหมวกแดงของคริสต์มาสเดนมาร์ก', 'A nisse, the little Christmas elf in the attic', ['nisse', 'นิสเซอ', 'christmas elf', 'ภูตคริสต์มาส', 'red pointed hat', 'หมวกแดงแหลม', 'julenisse', 'จูเลอนิสเซอ', 'rice porridge', 'danish christmas'],
    // a small round-bellied elf with a long red pointed hat, a fluffy grey beard and grey clothes, sitting on a wooden beam in the attic beside a bowl of rice porridge with a pat of butter
    R(20, 172, 200, 18, '#A1887F', 3, 3) + Lc('M30 181h180', '#8D6E63', 2)
    + g(110, 140, 1, P('M-28 34c-4-30 4-46 28-46s32 16 28 46z', '#9E9E9E', 3.5) + R(-26, 30, 18, 12, '#424242', 4, 2.5) + R(8, 30, 18, 12, '#424242', 4, 2.5)
      + C(0, -26, 18, '#FFE0BD', 3) + P('M-18-14c-2 26 10 38 18 38s20-12 18-38c-6 6-30 6-36 0z', '#ECEFF1', 3) + C(0, -20, 4, '#FF8A80', 1.5)
      + P('M-22-34c0-20 10-36 24-42 20-8 40 4 46 22-12-8-24-8-32 0 6 4 8 10 4 20z', '#E53935', 3.5) + C(48, -54, 6, '#FFFFFF', 2.5) + face(0, -30, 0.26, 'none'))
    + g(176, 160, 1, P('M-22-6c0 18 44 18 44 0z', '#FFFFFF', 3) + E(0, -6, 22, 6, '#FFF8E1', 2.5) + R(-4, -12, 8, 5, '#FFCA28', 1, 1.5) + Lc('M14-8l12-20', '#A1887F', 4))),

  // ---------- Copenhagen
  L('dk/copenhagen/landmark-amalienborg.v1.svg', 'ลานแปดเหลี่ยมกับวังสี่หลังแห่งอามาเลียนบอร์ก', 'Amalienborg, four palaces round an eight-sided square', ['amalienborg', 'วังอามาเลียนบอร์ก', 'royal palaces', 'วังหลวง', 'octagonal square', 'ลานแปดเหลี่ยม', 'four palaces', 'วังสี่หลัง', 'frederiksstaden', 'sentry box'], 'หาตู้ยามลายทางหน้าวัง', 'Find the striped sentry box in front of the palace',
    // a wide cobbled square with matching pale rococo palaces facing each other across it, each with a green copper roof and a little pediment, a red-and-white striped sentry box by a gate
    sky('#FFF3E0') + P('M-4 150h248v94H-4z', '#D7CCC8', 0) + [[30, 180], [80, 200], [140, 186], [200, 206], [60, 226], [170, 230]].map(([x, y]) => E(x, y, 12, 5, '#BCAAA4', 2)).join('') + Lc('M-4 150h248', INK, 3)
    + [[-4, 70, 92], [148, 70, 96]].map(([x, y, w]) => R(x, y, w, 80, '#F5E6C8', 2, 3.5) + P(`M${x - 4} ${y}l10-20h${w - 12}l10 20z`, '#4DB6AC', 3) + [0, 1, 2].map((k) => R(x + 10 + k * (w - 20) / 3, y + 16, 14, 22, '#B3E5FC', 2, 2) + R(x + 10 + k * (w - 20) / 3, y + 48, 14, 22, '#B3E5FC', 2, 2)).join('')).join('')
    + R(90, 90, 60, 60, '#F5E6C8', 2, 3.5) + P('M86 92l34-24 34 24z', '#F5E6C8', 3) + P('M86 90l4-10h60l4 10', '#4DB6AC', 3) + R(110, 114, 20, 36, '#8D6E63', 10, 3) + face(120, 104, 0.26)
    + g(176, 196, 1, P('M-14 20v-46l14-12 14 12v46z', '#FFFFFF', 3) + Lc('M-10-22v40M-2-30v48M6-30v48M14-22v40', '#E53935', 4) + P('M-14 20v-46l14-12 14 12v46z', 'none', 3))
    + kid(60, 214, '#1E88E5', 0.85)),
  L('dk/copenhagen/landmark-dragonfountain.v1.svg', 'น้ำพุมังกรกับวัวที่ลานศาลาว่าการ', 'The Dragon Fountain on City Hall Square', ['dragon fountain', 'น้ำพุมังกร', 'dragespringvandet', 'ดรากสปริงวานเนต', 'city hall square', 'ลานศาลาว่าการ', 'rådhuspladsen', 'bull and dragon', 'วัวกับมังกร'], 'หามังกรที่พ่นน้ำในอ่างน้ำพุ', 'Find the dragon spouting water in the fountain',
    // a round stone fountain basin with a big bronze-green dragon and a muscly bull on a rock in the middle, water spurting up and splashing round them, the red-brick city hall behind
    sky('#E1F5FE') + R(20, 30, 200, 120, '#C0603A', 2, 3.5) + [40, 70, 100, 130, 160, 190].map((x) => R(x, 56, 14, 26, '#FFF8E1', 6, 2)).join('') + Lc('M20 100h200', '#9C4530', 2)
    + E(120, 196, 104, 26, '#B0BEC5', 3.5) + E(120, 190, 90, 16, '#4FC3F7', 3)
    + P('M90 186c-6-24 10-34 30-34s36 10 30 34z', '#8D6E63', 3)
    + g(100, 150, 1, P('M-24 6c0-14 10-20 24-20s22 6 24 18c-6 4-10 4-12 0h-24c-4 6-10 6-12 2z', '#4DB6AC', 3) + P('M-20-6c-10-8-12-22-2-28 10 2 12 14 6 22', '#4DB6AC', 3) + P('M-26-26l-8-10M-16-36l2-10', 'none', 2.5) + C(-22, -30, 2, INK, 0) + P('M6-14l6-12 6 12 6-12 4 12', '#26A69A', 2.5))
    + g(150, 152, 1, P('M-20 6c0-12 8-18 20-18s20 6 20 18c-4 4-36 4-40 0z', '#A1673F', 3) + C(18, -10, 10, '#A1673F', 3) + P('M22-18c4-6 10-6 12-2M14-18c-2-6 0-10 4-10', 'none', 2.5) + face(18, -10, 0.16, 'none'))
    + Lc('M78 126c-10-20-10-40 0-56M78 126c10-30 30-40 50-36M174 126c10-20 14-36 4-50', '#B3E5FC', 4) + [[70, 64], [130, 86], [176, 70], [60, 100]].map(([x, y]) => C(x, y, 4, '#E1F5FE', 2)).join('') + face(120, 204, 0.3)),
  L('dk/copenhagen/landmark-nyboder.v1.svg', 'บ้านแถวสีเหลืองมัสตาร์ดแห่งนีบอเดอร์', 'The mustard-yellow terraced houses of Nyboder', ['nyboder', 'นีบอเดอร์', 'yellow row houses', 'บ้านแถวสีเหลือง', 'naval houses', 'บ้านทหารเรือ', 'terraced houses', 'บ้านแถว', 'red tile roofs', 'hollyhocks'], 'หาบ้านแถวสีเหลืองที่หน้าตาเหมือนกันหมด', 'Find the row of yellow houses that all look the same',
    // a long row of low two-storey mustard-yellow houses with red tiled roofs and white window frames stretching down a quiet lane, tall pink hollyhocks by the doors and a child with a scooter
    sky('#E3F2FD') + P('M-4 70l20-26h220l8 26z', '#D84315', 3.5) + R(-4, 70, 248, 110, '#F2B33D', 0, 3.5)
    + [0, 1, 2, 3].map((k) => { const x = 8 + k * 60; return R(x, 84, 18, 22, '#FFFFFF', 1, 2.5) + R(x + 3, 87, 12, 16, '#90CAF9', 0, 0) + R(x + 30, 84, 18, 22, '#FFFFFF', 1, 2.5) + R(x + 33, 87, 12, 16, '#90CAF9', 0, 0) + R(x + 2, 130, 16, 50, '#2E7D32', 2, 2.5) + R(x + 30, 128, 18, 22, '#FFFFFF', 1, 2.5) + Lc(`M${x + 54} 70v110`, '#E09B22', 2); }).join('')
    + P('M-4 180h248v64H-4z', '#BCAAA4', 0) + Lc('M-4 180h248', INK, 3)
    + [[24, 178], [84, 178], [144, 178]].map(([x, y]) => Lc(`M${x} ${y}v-36`, '#66BB6A', 3) + [0, 1, 2].map((k) => C(x + (k % 2 ? 3 : -3), y - 12 - k * 10, 5, '#F06292', 1.5)).join('')).join('')
    + face(100, 112, 0.3) + kid(200, 214, '#7E57C2', 0.9) + Lc('M186 230h30M210 230l-4-30', INK, 3)),
  L('dk/copenhagen/landmark-kalvebod.v1.svg', 'ทางเดินไม้คลื่นคัลเวบอดริมท่าเรือ', 'Kalvebod Bølge, the zigzag wooden harbour walk', ['kalvebod waves', 'ทางเดินคลื่นคัลเวบอด', 'kalvebod bølge', 'harbour boardwalk', 'ทางเดินไม้ริมท่าเรือ', 'zigzag pier', 'สะพานไม้ซิกแซก', 'harbour front', 'ริมท่าเรือ', 'sit by the water'], 'หาทางเดินไม้ที่หักขึ้นลงเป็นซิกแซก', 'Find the wooden walkway that zigzags up and down',
    // a wooden walkway sticking out over the harbour in sharp zigzags that rise and dip like waves, people sitting on its edge dangling their feet, glass office buildings behind
    sky('#E8EAF6') + R(-4, 40, 90, 90, '#90CAF9', 2, 3) + R(84, 60, 80, 70, '#B0BEC5', 2, 3) + R(164, 30, 80, 100, '#B3E5FC', 2, 3) + Lc('M10 40v90M40 40v90M70 40v90M180 30v100M210 30v100', '#E3F2FD', 2) + P('M-4 130h248v12H-4z', '#CFD8DC', 3)
    + water(142, '#4FC3F7') + waves([[30, 214], [150, 224], [200, 206]])
    + P('M-4 170l40-14 30 20 44-28 40 22 40-18 54 14v14l-54-12-40 18-40-22-44 28-30-20-40 14z', '#C8A165', 3.5) + [36, 66, 110, 150, 190].map((x) => Lc(`M${x} ${x === 66 || x === 150 ? 190 : 172}v24`, '#8D6E63', 3)).join('')
    + face(110, 166, 0.3) + kid(50, 160, '#E53935', 0.75) + kid(150, 166, '#FFCA28', 0.75) + kid(196, 154, '#26A69A', 0.75)),
];

export default { places: {}, items };
