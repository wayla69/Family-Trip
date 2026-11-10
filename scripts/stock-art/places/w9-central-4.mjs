// Wave 9 (central Europe, part 4): Bratislava and the High Tatras, Slovenia, Bled and Ljubljana, Hamburg, Cologne and the Rhine and Moselle
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const F = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const wins = (x, y, n, dx, w, h, fill = '#B3E5FC') => Array.from({ length: n }, (_, k) => R(x + k * dx, y, w, h, fill, 1, 1.5)).join('');
const fir = (x, y, s = 1, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', c, 2) + R(-3, 0, 6, 6, '#6D4C41', 0, 1.5));
const tree = (x, y, s = 1, c = '#43A047') => g(x, y, s, C(0, -16, 16, c, 2.5) + R(-3, 0, 6, 10, '#6D4C41', 0, 2));

const items = [
  // ---------- Bratislava and the High Tatras
  L('sk/bratislava/landmark-radiopyramid.v1.svg', 'อาคารวิทยุสโลวักรูปพีระมิดกลับหัว', 'The upside-down pyramid of Slovak Radio', ['slovak radio building', 'อาคารวิทยุสโลวัก', 'upside-down pyramid', 'พีระมิดกลับหัว', 'inverted pyramid', 'slovenský rozhlas', 'brutalist building', 'อาคารแปลกตา', 'mýtna street', 'radio tower'], 'หาพีระมิดที่ยืนเอายอดแหลมลงพื้น', 'Find the pyramid standing on its point',
    // a huge brown steel pyramid standing on its tip so its wide top is in the air, a grid of windows on its sloping sides, a little radio mast on top, small trees and a child pointing up
    sky('#E3F2FD') + P('M-4 206h248v38H-4z', '#BDBDBD', 3) + tree(30, 200, 1.1) + tree(212, 200, 1.1)
      + P('M30 50h180l-80 150h-20z', '#8D6E63', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${44 + k * 9} ${74 + k * 22}h${152 - k * 18}`, '#5D4037', 2.5)).join('') + Lc('M120 50v150M70 50l45 150M170 50l-45 150', '#6D4C41', 2)
      + R(110, 196, 20, 10, '#616161', 1, 2) + Lc('M120 50V18M110 30h20M114 40h12', INK, 2.5) + C(120, 16, 3, '#E53935', 1.5) + kid(70, 232, '#E53935') + face(120, 92, 0.32)),
  L('sk/bratislava/landmark-danubiana.v1.svg', 'พิพิธภัณฑ์ศิลปะดานูเบียนาบนแหลมกลางแม่น้ำดานูบ', 'Danubiana, the art museum on a peninsula in the Danube', ['danubiana', 'ดานูเบียนา', 'art museum on the danube', 'พิพิธภัณฑ์ศิลปะกลางแม่น้ำ', 'meulensteen museum', 'čunovo', 'ชูโนโว', 'ship shaped building', 'อาคารรูปเรือ', 'sculpture garden'], 'หาอาคารที่หน้าตาเหมือนหัวเรือยื่นลงน้ำ', 'Find the building shaped like a ship\'s bow poking into the water',
    // a low white modern building shaped like the bow of a ship at the very tip of a green peninsula, glass windows along its side, the wide Danube on both sides, a footpath and little trees
    sky('#E1F5FE') + P('M-4 120h248v124H-4z', '#4FC3F7', 3) + Lc('M20 210h40M180 220h40M30 140h30', '#B3E5FC', 3) + P('M-4 150c60-10 150-6 200 10 20 6 30 14 40 20-60 10-180 14-240 6z', '#9CCC65', 3)
      + P('M40 160v-40h110l50 30-10 10z', '#FFFFFF', 3) + Lc('M40 140h130', '#90A4AE', 2) + wins(50, 126, 6, 18, 12, 10) + tree(20, 160, 0.9) + tree(60, 172, 0.7)
      + face(110, 146, 0.25)),
  L('sk/bratislava/landmark-gazebo.v1.svg', 'ยอดหอคอยโบสถ์ที่กลายเป็นศาลาในสวนยานกาคราลยา', 'The church spire top that became a gazebo in Janko Kráľ Park', ['sad janka kráľa', 'สวนยานกาคราลยา', 'janko kral park', 'gothic gazebo', 'ศาลาโกธิก', 'old spire top', 'ยอดหอคอยเก่า', 'petržalka', 'เปตร์ชัลกา', 'oldest public park'], 'หายอดหอคอยหินลายลูกไม้ที่ตั้งอยู่บนพื้นหญ้า', 'Find the lacy stone spire top sitting on the grass',
    // the lacy stone top of an old gothic tower sitting on the ground in a leafy park like a little open summerhouse: pointed arches, tiny pinnacles, a pointed roof; children sitting inside, big old trees around
    sky('#E8F5E9') + P('M-4 190h248v54H-4z', '#9CCC65', 3) + tree(24, 186, 1.8) + tree(214, 186, 1.8, '#66BB6A')
      + E(120, 192, 50, 10, '#E0E0E0', 3) + [80, 104, 136, 160].map((x) => R(x - 5, 110, 10, 82, '#ECEFF1', 2, 2.5)).join('') + Array.from({ length: 3 }, (_, k) => P(`M${86 + k * 24} 192v-56c0-16 18-16 18 0v56z`, 'none', 0) + Lc(`M${86 + k * 24} 150c0-20 18-20 18 0`, '#B0BEC5', 3)).join('')
      + P('M72 112h96l-8-10H80z', '#ECEFF1', 3) + P('M82 102l38-80 38 80z', '#CFD8DC', 3) + Lc('M96 84h48M106 62h28M120 22v-8', '#90A4AE', 2) + [80, 160].map((x) => P(`M${x - 5} 102l5-20 5 20z`, '#CFD8DC', 2)).join('')
      + kid(106, 190, '#E53935', 0.8) + kid(134, 190, '#1E88E5', 0.8) + face(120, 86, 0.22)),
  L('sk/bratislava/landmark-fishermensgate.v1.svg', 'พื้นกระจกประตูชาวประมงที่มองเห็นกำแพงเก่าใต้ถนน', 'The glass floor showing the old Fishermen\'s Gate under the street', ['fishermen\'s gate', 'ประตูชาวประมง', 'rybárska brána', 'glass floor', 'พื้นกระจก', 'hidden ruins', 'ซากเก่าใต้ถนน', 'old town bratislava', 'เมืองเก่าบราติสลาวา', 'look down'], 'หาก้อนหินเก่าที่อยู่ใต้กระจกบนพื้น', 'Find the old stones under the glass in the pavement',
    // a paved old-town square with a big glass window set into the pavement; looking down through it you see the ancient stone arch and steps of the buried gate; children kneeling and peering in
    sky('#FFF8E1') + R(-4, 60, 248, 184, '#D7CCC8', 0, 0) + Array.from({ length: 8 }, (_, k) => Lc(`M-4 ${70 + k * 24}h248`, '#BCAAA4', 2)).join('') + R(-4, -4, 248, 64, '#FFE0B2', 0, 3) + wins(10, 14, 8, 30, 14, 20)
      + R(50, 100, 140, 100, '#5D4037', 6, 3) + R(56, 106, 128, 88, '#8D6E63', 4, 2) + P('M80 194v-50c0-30 80-30 80 0v50z', '#A1887F', 3) + P('M92 194v-46c0-20 56-20 56 0v46z', '#4E342E', 2)
      + Array.from({ length: 4 }, (_, k) => R(96 + k * 4, 176 - k * 8, 48 - k * 8, 8, '#BCAAA4', 0, 1.5)).join('') + R(56, 106, 128, 88, 'none', 4, 0) + Lc('M60 110l30 30M150 110l20 20', '#FFFFFF', 3)
      + g(40, 230, 1, C(0, -24, 10, '#FFE0BD', 2) + P('M-10 0l-4-14h24l4 14z', '#43A047', 2) + face(0, -22, 0.24, 'o')) + g(204, 230, 1, C(0, -24, 10, '#FFE0BD', 2) + P('M-10 0l-4-14h24l4 14z', '#FB8C00', 2) + face(0, -22, 0.24))),
  // ---------- Slovenia
  F('si', 'culture', 'neanderthalflute', 'ขลุ่ยกระดูกนีแอนเดอร์ทัลจากถ้ำดิวเยบาเบ', 'The Neanderthal bone flute from Divje Babe cave', ['divje babe flute', 'ขลุ่ยดิวเยบาเบ', 'neanderthal flute', 'ขลุ่ยนีแอนเดอร์ทัล', 'oldest musical instrument', 'เครื่องดนตรีเก่าแก่ที่สุด', 'bone flute', 'ขลุ่ยกระดูก', 'national museum ljubljana', 'cave find'],
    // an ancient brown bone with round holes lying on a velvet cushion inside a glass museum case with a spotlight; little music notes floating from it; a cave mouth drawn behind
    sky('#ECEFF1') + P('M-4 120c20-60 60-90 124-90s104 30 128 90z', '#A1887F', 3) + P('M60 120c10-40 40-60 60-60s50 20 60 60z', '#5D4037', 2.5)
      + R(30, 120, 180, 100, '#E3F2FD', 6, 3) + R(40, 180, 160, 30, '#7E57C2', 4, 2.5) + Lc('M50 126l20 30M80 126l10 16', '#FFFFFF', 3)
      + g(120, 176, 1, P('M-60 6c-10-4-10-16 0-18l110-6c10 0 14 14 4 20z', '#D7A86E', 3) + [-30, -6, 18].map((x) => E(x, -4, 6, 4, '#5D4037', 1.5)).join(''), -6)
      + [[160, 90], [180, 70], [70, 80]].map(([x, y]) => C(x, y, 5, INK, 0) + Lc(`M${x + 4} ${y}v-18l8 4`, INK, 2.5)).join('') + face(110, 172, 0.28)),
  F('si', 'culture', 'krpan', 'มาร์ติน คร์ปัน ชายร่างยักษ์จากนิทานกับม้าตัวเล็กขนเกลือ', 'Martin Krpan, the folk-tale strongman, and his little salt mare', ['martin krpan', 'มาร์ติน คร์ปัน', 'slovenian folk tale', 'นิทานพื้นบ้านสโลวีเนีย', 'strongman', 'ชายร่างยักษ์', 'little mare', 'ม้าตัวเล็ก', 'salt carrier', 'carries a horse'],
    // a huge good-natured man in a peasant hat and waistcoat carrying a little brown mare under one arm through the snow, sacks of salt on its back, a tiny coach waiting on the road
    sky('#E3F2FD') + P('M-4 190h248v54H-4z', '#FFFFFF', 3) + [[30, 40], [200, 60], [150, 20], [60, 110]].map(([x, y]) => C(x, y, 3, '#FFFFFF', 1)).join('')
      + g(110, 206, 1, Lc('M-14-60v60M14-60v60', '#5D4037', 12) + E(-16, 2, 14, 6, '#3E2723', 2) + E(16, 2, 14, 6, '#3E2723', 2) + P('M-34-60c-6-60 10-90 34-90s40 30 34 90z', '#ECEFF1', 3) + P('M-26-120h52v60h-52z', '#C62828', 2.5)
        + C(0, -166, 20, '#FFE0BD', 3) + P('M-30-176h60l-8-6c-6-18-38-18-44 0z', '#3E2723', 2.5) + Lc('M-14-152c8 8 20 8 28 0', '#8D6E63', 6) + face(0, -162, 0.36))
      + g(170, 120, 0.7, E(0, 0, 40, 20, '#A1673F', 3) + P('M32-8l16-24 12 8-6 22z', '#A1673F', 3) + C(50, -22, 2.5, INK, 0) + Lc('M-26 16v26M-12 18v26M14 18v26M28 16v26', '#8D5524', 8) + R(-24, -30, 20, 18, '#FFFFFF', 4, 2.5) + R(2, -30, 20, 18, '#FFFFFF', 4, 2.5) + Lc('M-40-6c-10 6-12 16-8 24', '#5D4037', 5))
      + Lc('M136 92l14 30', '#FFE0BD', 10) + face(170, 116, 0.2)),
  F('si', 'transport', 'cartrain', 'รถไฟขนรถยนต์ลอดอุโมงค์โบฮินย์', 'The Bohinj car train through the mountain tunnel', ['bohinj car train', 'รถไฟขนรถยนต์โบฮินย์', 'car shuttle train', 'รถไฟพารถยนต์', 'bohinj tunnel', 'อุโมงค์โบฮินย์', 'bohinjska bistrica', 'most na soči', 'flat wagons', 'mountain railway'],
    // a blue diesel locomotive pulling flat open wagons carrying little colourful cars with families waving from the windows, heading into a stone tunnel mouth in a green mountain
    sky('#E1F5FE') + P('M100 200c0-90 40-160 80-160s70 60 70 160z', '#43A047', 3) + P('M150 200v-50c0-30 60-30 60 0v50z', '#212121', 3) + Lc('M150 150c0-30 60-30 60 0', '#9E9E9E', 6)
      + P('M-4 200h248v44H-4z', '#9CCC65', 3) + Lc('M-4 214h248M-4 224h248', '#616161', 3)
      + g(150, 196, 1, R(-4, -40, 44, 34, '#1E88E5', 6, 3) + R(4, -34, 14, 12, '#E3F2FD', 2, 2) + C(8, 0, 7, INK, 0) + C(30, 0, 7, INK, 0))
      + [[30, '#E53935'], [92, '#FDD835']].map(([x, c]) => R(x - 26, 190, 56, 6, '#8D6E63', 0, 2.5) + C(x - 14, 200, 6, INK, 0) + C(x + 18, 200, 6, INK, 0) + P(`M${x - 22} 190v-14c2-10 8-14 16-14h20c8 0 12 6 14 14v14z`, c, 2.5) + R(x - 12, 166, 12, 10, '#E3F2FD', 2, 1.5) + R(x + 4, 166, 12, 10, '#E3F2FD', 2, 1.5) + C(x - 6, 172, 3, '#FFE0BD', 1)).join('') + face(170, 180, 0.2)),

  // ---------- Bled, Ljubljana and the Julian Alps
  L('si/bled/landmark-zelenci.v1.svg', 'บ่อน้ำพุสีเขียวมรกตเซเลนต์ซีที่กรันสกากอรา', 'Zelenci, the emerald spring pools near Kranjska Gora', ['zelenci', 'เซเลนต์ซี', 'emerald spring', 'บ่อน้ำพุมรกต', 'source of the sava', 'ต้นแม่น้ำซาวา', 'kranjska gora', 'กรันสกากอรา', 'wooden boardwalk', 'nature reserve'], 'หาฟองน้ำที่ผุดขึ้นมาจากพื้นบ่อ', 'Find the bubbles rising up from the bottom of the pool',
    // a still pool of bright emerald and turquoise water with sandy patches where springs bubble up from the bottom, a wooden lookout tower and boardwalk at the edge, fir forest and a peak reflected
    sky('#E1F5FE') + P('M60 110l60-80 60 80z', '#B0BEC5', 3) + P('M100 58l20-28 20 28-10-4-10 8-10-8z', '#FFFFFF', 2) + fir(20, 120, 1.1) + fir(46, 116, 0.9) + fir(200, 118, 1) + fir(226, 122, 1.1)
      + P('M-4 120h248v124H-4z', '#81C784', 3) + E(120, 180, 104, 46, '#00BFA5', 3) + E(110, 176, 70, 28, '#4DD0E1', 0) + [[90, 170], [130, 186], [150, 166]].map(([x, y]) => E(x, y, 12, 6, '#FFF59D', 2)).join('')
      + [[90, 160], [96, 150], [130, 176], [134, 164], [150, 156]].map(([x, y]) => C(x, y, 3, '#E0F7FA', 1.5)).join('') + P('M60 150l-10 20 10 20 10-20z', '#00897B', 0)
      + R(180, 150, 50, 8, '#A1673F', 0, 2.5) + R(200, 110, 30, 40, '#A1673F', 0, 3) + P('M196 112l19-16 19 16z', '#6D4C41', 2.5) + Lc('M184 158v20M226 158v20', '#6D4C41', 3) + kid(212, 150, '#E53935', 0.7) + face(110, 190, 0.3)),
  L('si/bled/landmark-robba.v1.svg', 'น้ำพุร็อบบาแห่งแม่น้ำสามสายในลูบลิยานา', 'The Robba Fountain of the three rivers in Ljubljana', ['robba fountain', 'น้ำพุร็อบบา', 'fountain of three carniolan rivers', 'น้ำพุแม่น้ำสามสาย', 'mestni trg', 'จัตุรัสเมสต์นี', 'obelisk fountain', 'น้ำพุเสาโอเบลิสก์', 'ljubljana old town', 'baroque fountain'], 'หาเหยือกสามใบที่เทน้ำออกมา', 'Find the three jugs pouring out water',
    // a tall white stone obelisk rising from a shell-shaped basin; at its foot three stone river figures each tipping a big jug so water flows out, little dolphins spouting, the old town hall behind
    sky('#E3F2FD') + R(-4, 50, 248, 150, '#FFE0B2', 0, 3) + wins(10, 70, 8, 30, 14, 20) + wins(10, 116, 8, 30, 14, 20) + P('M-4 200h248v44H-4z', '#BDBDBD', 3)
      + P('M50 200c0-20 30-26 70-26s70 6 70 26z', '#ECEFF1', 3) + E(120, 186, 64, 12, '#4FC3F7', 2.5)
      + P('M110 150l4-130h12l4 130z', '#FFFFFF', 3) + R(104, 140, 32, 20, '#ECEFF1', 0, 3) + C(120, 20, 4, '#FFC107', 1.5)
      + [[80, 170, -1], [120, 176, 0], [160, 170, 1]].map(([x, y, d]) => g(x, y, 1, C(0, -20, 8, '#ECEFF1', 2) + P('M-10 0c0-10 4-14 10-14s10 4 10 14z', '#ECEFF1', 2) + P(`M${d * 6 - 8} -12l${d * 6 + 6}-6 ${d * 4 + 6} 10z`, '#BDBDBD', 2) + Lc(`M${d * 10} -6c${d * 8} 4 ${d * 10} 10 ${d * 12} 16`, '#4FC3F7', 4) + face(0, -18, 0.18))).join('')),
  L('si/bled/landmark-cobblersbridge.v1.svg', 'สะพานช่างทำรองเท้าของเพลชนิกกับเสาและโคมไฟ', 'Plečnik\'s Cobblers\' Bridge with its columns and lamps', ['cobblers bridge', 'สะพานช่างทำรองเท้า', 'čevljarski most', 'shoemakers bridge', 'plečnik', 'เพลชนิก', 'ljubljanica river', 'แม่น้ำลูบลิยานิตซา', 'bridge like a square', 'columns on a bridge'], 'หาเสากลมที่มีลูกบอลอยู่บนยอด', 'Find the round columns with balls on top',
    // a wide pale stone bridge across a green river, its edges lined with a balustrade and tall slim columns topped with stone balls and old lamps, people strolling across as if in a little square
    sky('#E1F5FE') + R(-4, 70, 60, 110, '#FFCC80', 0, 3) + R(184, 76, 60, 104, '#C5E1A5', 0, 3) + wins(4, 84, 3, 16, 10, 14) + wins(192, 90, 3, 16, 10, 14) + P('M-4 170h248v74H-4z', '#4DB6AC', 3) + Lc('M30 214h40M160 226h50', '#B2DFDB', 3)
      + R(-4, 150, 248, 26, '#ECEFF1', 0, 3) + P('M40 176c10-20 50-20 60 0M140 176c10-20 50-20 60 0', 'none', 0) + Lc('M40 176c10-16 50-16 60 0M140 176c10-16 50-16 60 0', '#BDBDBD', 4) + Array.from({ length: 13 }, (_, k) => R(4 + k * 18, 132, 6, 18, '#ECEFF1', 2, 1.5)).join('') + Lc('M-4 132h248', '#BDBDBD', 4)
      + [30, 90, 150, 210].map((x, k) => R(x - 5, k % 2 ? 60 : 80, 10, k % 2 ? 72 : 52, '#FFFFFF', 3, 2.5) + C(x, k % 2 ? 54 : 74, 8, k % 2 ? '#FFF59D' : '#ECEFF1', 2.5)).join('')
      + kid(60, 150, '#E53935', 0.8) + kid(178, 150, '#1E88E5', 0.8) + face(120, 162, 0.22)),
  L('si/bled/landmark-trnovo.v1.svg', 'สะพานตร์โนโวที่มีต้นเบิร์ชปลูกอยู่บนสะพาน', 'Trnovo Bridge with birch trees growing on it', ['trnovo bridge', 'สะพานตร์โนโว', 'trnovski most', 'birch trees on a bridge', 'ต้นเบิร์ชบนสะพาน', 'plečnik', 'เพลชนิก', 'gradaščica', 'stone pyramids', 'ljubljana bridges'], 'หาต้นเบิร์ชลำต้นขาวที่ขึ้นอยู่บนสะพาน', 'Find the white birch trees growing right on the bridge',
    // a wide low stone bridge over a little river with two rows of slender white-trunked birch trees growing on it, small stone pyramids at its corners, a church facade behind, ducks on the water
    sky('#E8F5E9') + R(70, 40, 100, 100, '#FFF3E0', 0, 3) + P('M64 42l56-26 56 26z', '#E57373', 3) + P('M110 140v-30c0-12 20-12 20 0v30z', '#8D6E63', 2) + C(120, 70, 9, '#B3E5FC', 2)
      + P('M-4 176h248v68H-4z', '#4FC3F7', 3) + R(-4, 150, 248, 26, '#ECEFF1', 0, 3) + P('M50 176c10-14 40-14 50 0M140 176c10-14 40-14 50 0', 'none', 0) + Lc('M50 176c10-12 40-12 50 0M140 176c10-12 40-12 50 0', '#BDBDBD', 4)
      + [[10, 150], [230, 150]].map(([x, y]) => P(`M${x - 10} ${y}l10-30 10 30z`, '#ECEFF1', 2.5)).join('')
      + [40, 80, 160, 200].map((x) => R(x - 3, 90, 6, 60, '#FAFAFA', 1, 2) + Lc(`M${x - 3} 110h3M${x} 128h3`, INK, 1.5) + E(x, 84, 16, 26, '#9CCC65', 2.5)).join('')
      + [[60, 220], [90, 226]].map(([x, y]) => E(x, y, 9, 5, '#8D6E63', 1.5) + C(x + 7, y - 5, 4, '#2E7D32', 1.5)).join('') + face(120, 162, 0.22)),
  L('si/bled/landmark-neboticnik.v1.svg', 'ตึกระฟ้าเนบอติชนิกที่มีคาเฟ่บนดาดฟ้าในลูบลิยานา', 'Nebotičnik, Ljubljana\'s old skyscraper with a rooftop café', ['nebotičnik', 'neboticnik', 'เนบอติชนิก', 'ljubljana skyscraper', 'ตึกระฟ้าลูบลิยานา', 'rooftop cafe', 'คาเฟ่บนดาดฟ้า', 'art deco tower', 'ตึกอาร์ตเดโค', 'city view'], 'หาร่มสีแดงบนระเบียงชั้นบนสุด', 'Find the red umbrellas on the top-floor terrace',
    // a tall slim cream art deco tower with rows of windows, a stepped top with a round columned terrace where red café umbrellas stand, a little flagpole without a flag, small buildings around
    sky('#E3F2FD') + P('M-4 206h248v38H-4z', '#BDBDBD', 3) + R(10, 130, 60, 76, '#FFCC80', 0, 3) + R(170, 140, 64, 66, '#C5E1A5', 0, 3) + wins(18, 140, 3, 18, 10, 12) + wins(178, 150, 3, 18, 10, 12)
      + R(84, 60, 72, 146, '#FFF8E1', 0, 3) + Array.from({ length: 8 }, (_, k) => wins(92, 70 + k * 16, 4, 16, 10, 10)).join('') + R(110, 186, 20, 20, '#5D4037', 0, 2)
      + R(92, 40, 56, 20, '#FFF8E1', 0, 3) + [98, 112, 128, 142].map((x) => Lc(`M${x} 40v20`, '#D7CCC8', 3)).join('') + P('M88 40h64l-8-8h-48z', '#D7CCC8', 2.5)
      + [[104, 32], [136, 32]].map(([x, y]) => P(`M${x - 10} ${y}c2-10 18-10 20 0z`, '#E53935', 2) + Lc(`M${x} ${y}v8`, INK, 1.5)).join('') + Lc('M120 24V6', INK, 2) + face(120, 166, 0.26)),

  // ---------- Hamburg and the north
  L('de/hamburg/landmark-heather.v1.svg', 'ทุ่งดอกเฮเทอร์สีม่วงลือเนอบวร์กเกอร์ไฮเดอ', 'The purple heather of the Lüneburg Heath', ['lüneburg heath', 'ลือเนอบวร์กเกอร์ไฮเดอ', 'lüneburger heide', 'heather bloom', 'ดอกเฮเทอร์บาน', 'purple heath', 'ทุ่งสีม่วง', 'juniper bushes', 'ต้นจูนิเปอร์', 'horse drawn wagon ride'], 'หาพุ่มจูนิเปอร์สีเขียวเข้มที่ยืนอยู่กลางทุ่งม่วง', 'Find the dark green juniper bushes standing in the purple heath',
    // rolling low hills carpeted in tiny purple heather flowers, tall dark green pointed juniper bushes dotted about, a sandy path, a little wooden cart with children, birches at the edge, a pale sky
    sky('#F3E5F5') + P('M-4 120c60-30 120-30 248 0v124H-4z', '#BA68C8', 3) + P('M-4 170c80-30 160-20 248 10v64H-4z', '#AB47BC', 3) + Array.from({ length: 20 }, (_, k) => C(8 + (k * 37) % 232, 140 + (k * 23) % 96, 2.5, '#E1BEE7', 0)).join('')
      + Lc('M40 244c20-50 60-80 120-110', '#FFE0B2', 12) + Lc('M40 244c20-50 60-80 120-110', '#D7A86E', 2)
      + [[30, 150, 1.2], [190, 160, 1], [210, 128, 0.8], [130, 120, 0.7]].map(([x, y, s]) => g(x, y, s, P('M0-50c-14 16-16 40-8 50h16c8-10 6-34-8-50z', '#1B5E20', 2.5))).join('')
      + g(110, 186, 1, R(-24, -16, 48, 16, '#A1673F', 2, 2.5) + C(-14, 4, 8, '#5D4037', 2) + C(14, 4, 8, '#5D4037', 2) + kid(-10, -14, '#E53935', 0.6) + kid(8, -14, '#FFCA28', 0.6)) + face(150, 140, 0.28)),
  L('de/hamburg/landmark-prunkpforte.v1.svg', 'ประตูไม้แกะลายพรุงค์พฟอร์เทอแห่งอัลเทสลันด์', 'A carved Prunkpforte farm gate in the Altes Land', ['prunkpforte', 'พรุงค์พฟอร์เทอ', 'altes land', 'อัลเทสลันด์', 'carved farm gate', 'ประตูฟาร์มแกะสลัก', 'white painted gate', 'ประตูไม้สีขาว', 'apple country', 'elbe marshes'], 'หาลายพระอาทิตย์ที่แกะไว้บนซุ้มประตู', 'Find the carved sunburst on top of the gate',
    // a grand white wooden gateway with a big arch for wagons and a small door for people, its top carved with a sunburst and curls, painted in white and green, a red brick half-timbered farmhouse behind and blossom trees
    sky('#E8F5E9') + P('M-4 196h248v48H-4z', '#9CCC65', 3) + R(140, 90, 100, 106, '#C0583D', 0, 3) + Lc('M140 120h100M140 150h100M170 90v106M210 90v106', '#FFFFFF', 3) + P('M134 92l56-46 56 46z', '#5D4037', 3)
      + R(20, 90, 14, 106, '#FFFFFF', 0, 3) + R(110, 90, 14, 106, '#FFFFFF', 0, 3) + P('M20 92c0-50 104-50 104 0z', '#FFFFFF', 3) + P('M50 82c0-26 44-26 44 0z', '#81C784', 2.5) + Array.from({ length: 7 }, (_, k) => Lc(`M72 82l${Math.round(-26 * Math.cos(k * Math.PI / 6))} ${Math.round(-26 * Math.sin(k * Math.PI / 6))}`, '#43A047', 2)).join('')
      + P('M34 196v-80c0-20 76-20 76 0v80z', '#43A047', 3) + Lc('M72 108v88M38 150h68', '#FFFFFF', 3) + Lc('M40 120l64 60M104 120l-64 60', '#FFFFFF', 2)
      + [[200, 70], [16, 70]].map(([x, y]) => C(x, y, 18, '#F8BBD0', 2.5)).join('') + face(72, 66, 0.22)),
  L('de/hamburg/landmark-rathaus.v1.svg', 'ศาลาว่าการฮัมบวร์กกับหอคอยหลังคาทองแดงสีเขียว', 'Hamburg City Hall and its green copper tower', ['hamburg rathaus', 'ศาลาว่าการฮัมบวร์ก', 'city hall', 'ศาลาว่าการเมือง', 'rathausmarkt', 'จัตุรัสราทเฮาส์', 'green copper roof', 'หลังคาทองแดงเขียว', 'alster arcades', 'sandstone palace'], 'หาหอนาฬิกาสูงตรงกลางที่ยอดสีเขียว', 'Find the tall middle tower with its green top',
    // a long grand sandstone building with many tall windows and a steep green copper roof dotted with dormers, a very tall central tower with a green spire, a square with pigeons and children in front
    sky('#E3F2FD') + P('M-4 200h248v44H-4z', '#D7CCC8', 3) + R(10, 110, 220, 90, '#E8D5B0', 0, 3) + P('M4 112l20-24h192l20 24z', '#4DB6AC', 3) + Array.from({ length: 6 }, (_, k) => P(`M${36 + k * 32} 100l6-10 6 10z`, '#80CBC4', 1.5)).join('')
      + Array.from({ length: 2 }, (_, r) => wins(20, 122 + r * 34, 10, 21, 10, 22)).join('') + R(100, 166, 40, 34, '#8D6E63', 0, 2.5)
      + R(102, 40, 36, 90, '#E8D5B0', 0, 3) + C(120, 70, 10, '#FFF8E1', 2.5) + Lc('M120 70v-6M120 70l4 3', INK, 2) + P('M98 42l22-36 22 36z', '#4DB6AC', 3) + Lc('M120 6V-2', INK, 2)
      + [[50, 222], [180, 226]].map(([x, y]) => g(x, y, 1, E(0, 0, 9, 6, '#B0BEC5', 2) + C(7, -6, 4, '#B0BEC5', 1.5) + P('M11-6l4 1-4 2z', '#FFB300', 1))).join('') + kid(84, 232, '#E53935', 0.8) + face(120, 104, 0.24)),

  // ---------- Cologne, the Rhine and the Moselle
  L('de/cologne/landmark-pfalzgrafenstein.v1.svg', 'ปราสาทพฟัลซ์กราเฟินชไตน์กลางแม่น้ำไรน์ที่เคาบ์', 'Pfalzgrafenstein, the toll castle on an island in the Rhine', ['pfalzgrafenstein', 'พฟัลซ์กราเฟินชไตน์', 'castle in the river', 'ปราสาทกลางแม่น้ำ', 'kaub', 'เคาบ์', 'toll castle', 'ปราสาทเก็บภาษีเรือ', 'island castle', 'middle rhine'], 'หาปราสาทที่หน้าตาเหมือนเรือลอยกลางแม่น้ำ', 'Find the castle shaped like a ship floating in the river',
    // a white castle shaped like a stone ship sitting on a rock in the middle of the river, a pentagon tower with a dark baroque cap, red-roofed turrets, the river flowing around, vineyard hills on both banks
    sky('#E1F5FE') + P('M-4 120c40-40 70-50 100-20v40H-4z', '#7CB342', 3) + P('M244 110c-40-40-80-40-110-10v40h110z', '#7CB342', 3) + Lc('M10 110l20-10M30 120l20-10M190 104l20-8M200 116l20-8', '#558B2F', 3)
      + P('M-4 130h248v114H-4z', '#4FC3F7', 3) + Lc('M20 210h50M170 220h50M20 150h30', '#B3E5FC', 3)
      + P('M40 180l20-40h130l20 40-80 12z', '#ECEFF1', 3) + Lc('M60 150h130', '#BDBDBD', 2) + wins(70, 156, 7, 16, 8, 8, '#90A4AE')
      + R(100, 70, 40, 80, '#FFFFFF', 0, 3) + P('M96 72c0-20 10-26 24-34 14 8 24 14 24 34z', '#37474F', 3) + Lc('M120 38V24', INK, 2) + R(112, 90, 16, 18, '#90A4AE', 2, 2)
      + [[64, 126], [182, 126]].map(([x, y]) => R(x - 9, y, 18, 24, '#FFFFFF', 0, 2.5) + P(`M${x - 12} ${y}l12-18 12 18z`, '#E53935', 2.5)).join('') + face(120, 132, 0.25)),
  L('de/cologne/landmark-himmelunaed.v1.svg', 'ฮิมเมิลอุนแอด สวรรค์และโลก มันบดกับแอปเปิลแบบโคโลญ', 'Himmel un Ääd, Cologne\'s heaven and earth of apple and potato', ['himmel un ääd', 'himmel und erde', 'ฮิมเมิลอุนแอด', 'heaven and earth', 'สวรรค์และโลก', 'mashed potato and apple', 'มันบดกับแอปเปิล', 'fried onions', 'หอมเจียว', 'cologne dish'], 'หาแอปเปิลกวนที่วางคู่กับมันบด', 'Find the apple sauce sitting next to the mashed potato',
    // a plate with a cloud-like mound of mashed potato (the earth) beside a pool of golden apple sauce (heaven), crispy fried onion rings on top, two slices of dark pudding, a whole red apple and a potato beside
    E(120, 160, 100, 46, '#FFFFFF', 3) + P('M50 160c-6-30 20-40 40-34 10-16 40-16 46 2 20-4 30 20 16 34-30 10-80 10-102-2z', '#FFF3C4', 3) + Lc('M70 146c10-6 20 0 30-4M96 132c8-2 14 2 20 0', '#E6C77A', 2.5)
      + E(162, 166, 30, 16, '#FFD54F', 2.5) + E(156, 162, 12, 6, '#FFE082', 0)
      + [[86, 128], [104, 122], [120, 132]].map(([x, y]) => E(x, y, 9, 5, 'none', 0) + Lc(`M${x - 9} ${y}a9 5 0 1 0 18 0a9 5 0 1 0-18 0`, '#A1673F', 3)).join('')
      + [[90, 186], [118, 190]].map(([x, y]) => E(x, y, 14, 9, '#4E342E', 2.5) + C(x - 4, y - 2, 1.5, '#FFFFFF', 0)).join('')
      + g(44, 96, 1, C(0, 0, 18, '#E53935', 2.5) + Lc('M0-18l2-8', '#5D4037', 3) + P('M2-22c6-8 14-8 16-4-6 4-10 4-16 4z', '#43A047', 1.5)) + g(206, 100, 1, E(0, 0, 20, 14, '#C68B4A', 2.5) + C(-6, -4, 1.5, '#8D5524', 0) + C(6, 4, 1.5, '#8D5524', 0)) + face(94, 150, 0.32)),
  L('de/cologne/landmark-spitzhaeuschen.v1.svg', 'บ้านปลายแหลมชปิทซ์เฮาส์เชินที่แบร์นคาสเทิล', 'The Spitzhäuschen, the house that\'s wider at the top, in Bernkastel', ['spitzhäuschen', 'spitzhaeuschen', 'ชปิทซ์เฮาส์เชิน', 'bernkastel-kues', 'แบร์นคาสเทิล', 'pointy house', 'บ้านปลายแหลม', 'narrow at the bottom', 'ฐานแคบกว่าหลังคา', 'moselle town'], 'หาบ้านที่ชั้นบนกว้างกว่าชั้นล่าง', 'Find the house that is wider upstairs than downstairs',
    // a tiny tall half-timbered house with a very narrow ground floor that bulges out wider on the upper floor under a steep pointed slate roof, squeezed between two ordinary houses on a cobbled corner
    sky('#E3F2FD') + R(-4, 200, 248, 44, '#BDBDBD', 0, 3) + R(10, 90, 70, 110, '#FFE0B2', 0, 3) + P('M4 92l41-34 41 34z', '#5D4037', 3) + R(160, 96, 74, 104, '#C5E1A5', 0, 3) + P('M154 98l43-34 43 34z', '#5D4037', 3) + wins(20, 110, 2, 30, 18, 20) + wins(170, 116, 2, 32, 18, 20)
      + P('M106 200v-80h28v80z', '#FFF8E1', 3) + P('M92 120l14-6h28l14 6v50l-14-12h-28l-14 12z', '#FFF8E1', 3) + Lc('M92 120h56M106 114v44M134 114v44M92 120l14 30M148 120l-14 30', '#6D4C41', 3) + Lc('M106 200v-80h28v80', '#6D4C41', 3)
      + P('M86 122l34-96 34 96z', '#455A64', 3) + R(112, 128, 16, 16, '#B3E5FC', 1, 2) + R(112, 176, 16, 24, '#6D4C41', 2, 2) + Lc('M100 80h40M108 56h24', '#37474F', 2) + face(120, 158, 0.24)),
  L('de/cologne/landmark-portanigra.v1.svg', 'ประตูดำปอร์ตานิกราของชาวโรมันที่เทรียร์', 'The Porta Nigra, the black Roman gate of Trier', ['porta nigra', 'ปอร์ตานิกรา', 'trier', 'เทรียร์', 'roman gate', 'ประตูโรมัน', 'black gate', 'ประตูดำ', 'oldest city in germany', 'moselle'], 'หาซุ้มโค้งเล็กๆ หลายชั้นบนกำแพงหินสีเข้ม', 'Find the rows of little arches on the dark stone wall',
    // a huge dark grey-black Roman stone gate with two big arched passages and rows and rows of little arched windows, one side taller like a tower, big blocks of stone, a sunny square with children in front
    sky('#FFF8E1') + P('M-4 200h248v44H-4z', '#D7CCC8', 3)
      + R(30, 70, 180, 130, '#616161', 0, 3) + R(150, 40, 60, 160, '#616161', 0, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M30 ${90 + k * 18}h180`, '#424242', 1.5)).join('')
      + Array.from({ length: 2 }, (_, r) => Array.from({ length: 8 }, (_, k) => P(`M${38 + k * 21} ${110 - r * 26}v-12c0-8 14-8 14 0v12z`, '#9E9E9E', 1.5)).join('')).join('') + Array.from({ length: 3 }, (_, k) => P(`M${158 + k * 17} 58v-10c0-6 12-6 12 0v10z`, '#9E9E9E', 1.5)).join('')
      + [64, 120].map((x) => P(`M${x - 22} 200v-44c0-28 44-28 44 0v44z`, '#3E2723', 3)).join('') + kid(170, 230, '#E53935') + kid(196, 230, '#1E88E5') + face(176, 160, 0.3)),
];

export default { places: {}, items };
