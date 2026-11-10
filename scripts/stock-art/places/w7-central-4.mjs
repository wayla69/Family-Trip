// Wave 7 (central Europe, part 4): Bled, Ljubljana and the Julian Alps, Hamburg, Cologne and the Rhine valley
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (si/bled/landmark-predjama.v1.svg → si-bled.landmark.predjama)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const wins = (x, y, n, dx, w, h, fill = '#B3E5FC') => Array.from({ length: n }, (_, k) => R(x + k * dx, y, w, h, fill, 1, 1.5)).join('');
const tree = (x, y, s = 1, c = '#43A047') => g(x, y, s, C(0, -16, 16, c, 2.5) + R(-3, 0, 6, 10, '#6D4C41', 0, 2));
const fir = (x, y, s = 1, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', c, 2) + R(-3, 0, 6, 6, '#6D4C41', 0, 1.5));
const bricks = (x, y, w, h, c = '#5D2A1E') => Array.from({ length: Math.floor(h / 10) }, (_, k) => Lc(`M${x} ${y + 10 + k * 10}h${w}`, c, 1.5)).join('');
// a little gnome helper with a pointed red cap (Cologne's Heinzelmännchen)
const gnome = (x, y, s, coat) => g(x, y, s, P('M-10 0l3-22h14l3 22z', coat, 2.5) + C(0, -30, 9, '#FFE0BD', 2.5) + P('M-10-34l10-26 10 26z', '#E53935', 2.5) + P('M-8-26c0 14 16 14 16 0', '#FFFFFF', 2) + face(0, -31, 0.2, 'none'));

const items = [
  // ---------- Bled, Ljubljana and the Julian Alps
  L('si/bled/landmark-predjama.v1.svg', 'ปราสาทเปรดยามาในปากถ้ำ', 'Predjama Castle built into a cave', ['predjama castle', 'ปราสาทเปรดยามา', 'predjamski grad', 'castle in a cave', 'ปราสาทในถ้ำ', 'cliff castle', 'ปราสาทหน้าผา', 'karst', 'คาสต์', 'near postojna'], 'หาปราสาทที่ซ่อนตัวอยู่ในปากถ้ำกลางหน้าผา', 'Find the castle tucked into the mouth of a cave in the cliff',
    // a tall white castle front with a red roof squeezed into the dark mouth of a cave halfway up an enormous grey cliff, a winding road and green trees at the foot
    sky('#E3F2FD') + P('M10 244V20c0-14 220-14 220 0v224z', '#9E9E9E', 3) + Lc('M30 50c20 10 30 0 40 10M170 40c10 14 30 10 40 20M30 200c20-6 30 4 40-4M180 210c14-8 26 0 36-6', '#757575', 3)
      + P('M60 150c-6-60 20-110 60-112s70 46 64 112z', '#37474F', 3)
      + R(78, 80, 84, 80, '#FFFFFF', 0, 3) + P('M72 80l48-26 48 26z', '#E53935', 3) + wins(88, 92, 4, 18, 9, 14, '#90A4AE') + wins(88, 118, 4, 18, 9, 14, '#90A4AE') + R(144, 60, 20, 100, '#F5F5F5', 0, 3) + P('M140 60l14-16 14 16z', '#E53935', 2.5)
      + R(70, 160, 100, 14, '#BDBDBD', 0, 3) + P('M-4 244V200c40-10 70 0 100 20s100 4 148-10v34z', '#7CB342', 3) + Lc('M100 244c10-20 30-30 60-40', '#D7CCC8', 8)
      + [[30, 226], [200, 222]].map(([x, y]) => tree(x, y, 1.2, '#558B2F')).join('') + face(110, 140, 0.32)),
  L('si/bled/landmark-triplebridge.v1.svg', 'สะพานสามสายแห่งลูบลิยานา', 'Ljubljana\'s Triple Bridge', ['triple bridge', 'สะพานสามสาย', 'tromostovje', 'ljubljanica river', 'แม่น้ำลูบลยานิตซา', 'white balustrades', 'ราวลูกกรงสีขาว', 'old town ljubljana', 'เมืองเก่าลูบลิยานา', 'riverside cafés'], 'หาสะพานสามสายที่แผ่ออกจากจุดเดียวกัน', 'Find the three bridges fanning out from the same spot',
    // three white stone bridges with rows of chunky balusters fanning out from one point across a green river, pastel houses and a café umbrella on the far bank
    sky('#FFF8E1') + [[-4, 50, '#FFCCBC'], [46, 46, '#FFF59D'], [150, 48, '#B3E5FC'], [198, 50, '#C8E6C9']].map(([x, w, c]) => R(x, 50, w, 80, c, 0, 3) + P(`M${x - 4} 50l${w / 2 + 4}-24 ${w / 2 + 4} 24z`, '#E64A19', 3) + wins(x + 8, 64, 3, 13, 8, 12, '#FFFFFF')).join('') + R(92, 60, 58, 70, '#F8BBD0', 0, 3) + wins(100, 76, 3, 16, 8, 14, '#FFFFFF')
      + P('M-4 130h248v114H-4z', '#4DB6AC', 3) + Lc('M20 150h50M170 156h50M30 226h40', '#B2DFDB', 3)
      + [[-40, 'M120 236L20 140'], [0, 'M120 236V136'], [40, 'M120 236L220 140']].map(([a, d]) => g(120, 236, 1, R(-10, -110, 20, 110, '#F5F5F5', 0, 3) + Array.from({ length: 5 }, (_, k) => R(-12, -100 + k * 20, 4, 12, '#E0E0E0', 2, 1.5) + R(8, -100 + k * 20, 4, 12, '#E0E0E0', 2, 1.5)).join(''), a)).join('')
      + kid(120, 220, '#E53935', 0.9) + face(120, 92, 0.3)),
  L('si/bled/landmark-vintgar.v1.svg', 'ทางเดินไม้ในหุบผาวินท์การ์', 'The wooden walkway through Vintgar Gorge', ['vintgar gorge', 'หุบผาวินท์การ์', 'soteska vintgar', 'wooden walkway', 'ทางเดินไม้เลียบผา', 'emerald river', 'แม่น้ำสีมรกต', 'radovna river', 'แม่น้ำราดอฟนา', 'gorge walk'], 'หาทางเดินไม้ที่เกาะติดผนังหินเหนือน้ำสีเขียวใส', 'Find the wooden walkway clinging to the rock above the clear green water',
    // a narrow gorge with steep mossy rock walls, a wooden plank walkway with a railing bolted along the left wall, clear emerald water rushing over pale stones below, a child walking
    sky('#E8F5E9') + P('M-4-4h90c-10 50 10 90-6 140s0 70-10 108H-4z', '#78909C', 3) + P('M244-4H160c14 40-6 90 10 130s0 80 10 118h64z', '#78909C', 3)
      + [[20, 30], [40, 90], [200, 50], [220, 120], [190, 180]].map(([x, y]) => P(`M${x - 14} ${y}c4-12 24-12 28 0z`, '#7CB342', 2)).join('')
      + P('M74 244c10-60 20-100 46-130s40 70 50 130z', '#26A69A', 3) + Lc('M100 200c6-6 14-6 20 0M120 160c6-6 12-6 16 0M130 226c6-6 14-6 20 0', '#E0F2F1', 3) + [[96, 230], [150, 220], [112, 180]].map(([x, y]) => E(x, y, 6, 4, '#B0BEC5', 1.5)).join('')
      + R(-4, 140, 92, 10, '#A1673F', 0, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${4 + k * 16} 140v-22`, '#8D6E63', 3)).join('') + Lc('M-4 118h90', '#8D6E63', 3) + Array.from({ length: 3 }, (_, k) => Lc(`M${20 + k * 28} 150l-16 26`, '#6D4C41', 3)).join('')
      + kid(50, 140, '#FFCA28', 0.9)),
  L('si/bled/landmark-piran.v1.svg', 'เมืองปิรานบนแหลมยื่นลงทะเล', 'Piran on its little peninsula', ['piran', 'ปิราน', 'piran peninsula', 'แหลมปิราน', 'adriatic sea', 'ทะเลเอเดรียติก', 'red roofs', 'หลังคาแดง', 'slovenian coast', 'ชายฝั่งสโลวีเนีย'], 'หาเมืองหลังคาแดงที่อยู่ปลายแหลมยื่นลงไปในทะเล', 'Find the red-roofed town sitting on the tip of land poking into the sea',
    // a narrow tongue of land poking into a deep blue sea, packed with cream houses and red roofs, a tall slim bell tower near the tip, a stone wall on the hill behind, sailboats
    sky('#E1F5FE') + P('M-4 244V120h248v124z', '#1E88E5', 0) + Lc('M20 200c10-4 20 4 30 0M180 220c10-4 20 4 30 0', '#90CAF9', 3)
      + P('M-4 110c40-20 70-10 90 0s40 30 60 40 60 10 80 40c-40 10-90 10-130 0s-70-20-100-30z', '#FFF8E1', 3)
      + [[10, 112], [34, 108], [58, 112], [80, 118], [104, 128], [128, 140], [152, 148], [176, 156], [200, 168]].map(([x, y], k) => R(x, y, 20, 18, k % 2 ? '#FFE0B2' : '#FFF8E1', 0, 2) + P(`M${x - 2} ${y}l12-10 12 10z`, '#E64A19', 2) + R(x + 7, y + 6, 6, 6, '#90CAF9', 1, 1)).join('')
      + R(140, 70, 14, 72, '#F5F5F5', 0, 3) + P('M138 70l9-22 9 22z', '#E64A19', 2.5) + R(143, 80, 8, 10, '#90A4AE', 3, 1.5)
      + P('M-4 100l30-30h50l20 14', 'none', 3) + Lc('M-4 96l30-28h50l20 14', '#BCAAA4', 6)
      + [[60, 196], [210, 120]].map(([x, y]) => P(`M${x - 14} ${y}h28l-4 6h-20z`, '#FFFFFF', 2.5) + Lc(`M${x} ${y}v-24`, INK, 2) + P(`M${x + 2} ${y - 22}l12 18h-12z`, '#FFFFFF', 2)).join('') + face(60, 130, 0.25)),
  L('si/bled/landmark-triglav.v1.svg', 'ยอดเขาตรีกลัฟและหอโลหะอัลยาช', 'Mount Triglav and its little metal hut', ['triglav', 'ตรีกลัฟ', 'mount triglav', 'ยอดเขาตรีกลัฟ', 'aljaž tower', 'aljaz tower', 'หออัลยาช', 'three-headed mountain', 'ภูเขาสามยอด', 'julian alps'], 'หาหอโลหะทรงกระบอกเล็กๆ บนยอดเขาสูงสุด', 'Find the little round metal hut standing on the very top of the mountain',
    // a three-headed limestone mountain with snow patches, on its highest middle peak a tiny round metal tower with a pointed cap, a little line of climbers on the ridge, green valley below
    sky('#E3F2FD') + P('M-4 200l50-80 30 30 44-100 50 80 24-20 50 60v34H-4z', '#B0BEC5', 3) + P('M108 54l-14 30 12-4 8 10 10-12 8 6z', '#FFFFFF', 2) + P('M40 132l-12 18 10-2 6 4z', '#FFFFFF', 2) + P('M196 130l-8 14 8 0 6 4z', '#FFFFFF', 2)
      + P('M-4 244V190c80-20 160-20 248 0v54z', '#7CB342', 3) + [[20, 222], [220, 224], [60, 232]].map(([x, y]) => fir(x, y, 0.9)).join('')
      + R(114, 28, 12, 22, '#B0BEC5', 0, 2.5) + P('M112 28l8-10 8 10z', '#90A4AE', 2.5) + Lc('M120 18v-8', INK, 2) + R(117, 36, 6, 6, '#455A64', 1, 1.5)
      + [[96, 92], [86, 104], [76, 116]].map(([x, y], k) => g(x, y, 0.5, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', ['#E53935', '#FFCA28', '#1E88E5'][k], 2))).join('') + face(140, 120, 0.3)),
  L('si/bled/landmark-velikaplanina.v1.svg', 'กระท่อมคนเลี้ยงวัวบนเวลิกาพลานินา', 'The herders\' huts of Velika Planina', ['velika planina', 'เวลิกาพลานินา', 'herders huts', 'กระท่อมคนเลี้ยงวัว', 'shingle roofs', 'หลังคาไม้แผ่น', 'alpine pasture', 'ทุ่งหญ้าบนเขา', 'kamnik alps', 'oval huts'], 'หากระท่อมที่หลังคาไม้ลาดยาวลงมาเกือบถึงพื้น', 'Find the huts whose wooden roofs slope almost all the way down to the grass',
    // round-topped wooden herders' huts with huge dark shingle roofs sloping almost to the ground, a tiny low wall of logs showing underneath, on a wide rolling green pasture with a cow, mountains far away
    sky('#E1F5FE') + P('M-4 110l50-30 40 20 50-40 60 40 48-20v40H-4z', '#CFD8DC', 3) + P('M-4 244V110c80-20 160-20 248 0v134z', '#8BC34A', 3)
      + [[60, 150, 1], [150, 136, 0.8], [196, 170, 0.9]].map(([x, y, s]) => g(x, y, s, R(-40, 10, 80, 16, '#A1673F', 0, 3) + Array.from({ length: 3 }, (_, k) => Lc(`M-40 ${14 + k * 5}h80`, '#6D4C41', 1.5)).join('') + P('M-50 14c0-50 30-74 50-74s50 24 50 74z', '#5D4037', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${-42 + k * 4} ${4 - k * 10}c${18 - k * 2}-6 ${66 - k * 8}-6 ${84 - k * 8} 0`, '#4E342E', 2)).join('') + P('M-6 26v-10h12v10z', '#3E2723', 2) + Lc('M0-60v-8', INK, 3))).join('')
      + g(110, 222, 1, E(0, -16, 22, 12, '#FFFFFF') + C(20, -24, 6, '#5D4037', 0) + C(-8, -14, 5, '#5D4037', 0) + Lc('M-16-6v12M-6-4v12M8-4v12M16-6v12', '#FFFFFF', 5) + E(26, -20, 9, 8, '#FFFFFF') + E(30, -16, 5, 4, '#FFAB91', 1.5) + Lc('M22-28l-4-6M30-28l4-6', INK, 2) + face(26, -22, 0.16, 'none')) + face(60, 136, 0.35)),

  // ---------- Hamburg (with the Elbe and Blankenese)
  L('de/hamburg/landmark-landungsbruecken.v1.svg', 'ท่าเรือลันดุงส์บรึคเคิน', 'The St Pauli Landungsbrücken piers', ['landungsbrücken', 'landungsbrucken', 'ท่าเรือลันดุงส์บรึคเคิน', 'st pauli piers', 'ท่าเรือเซนต์เพาลี', 'green domes', 'โดมสีเขียว', 'clock tower', 'หอนาฬิกา', 'harbour'], 'หาหอนาฬิกาที่มีโดมสีเขียวข้างท่าเรือลอยน้ำ', 'Find the clock tower with green domes next to the floating piers',
    // a long stone harbour building with a row of green copper domes and a tall clock tower, floating pontoon piers with gangways in front, a little harbour boat on the water
    sky('#E3F2FD') + R(-4, 90, 248, 60, '#D7CCC8', 0, 3) + wins(4, 104, 15, 16, 8, 14, '#90A4AE') + Array.from({ length: 5 }, (_, k) => P(`M${6 + k * 50} 90c0-24 30-24 30 0z`, '#4DB6AC', 3)).join('')
      + R(150, 30, 34, 60, '#D7CCC8', 0, 3) + P('M146 30c0-24 42-24 42 0z', '#4DB6AC', 3) + C(167, 50, 11, '#FFFFFF', 2.5) + Lc('M167 50v-7M167 50l5 3', INK, 2) + Lc('M167 6v-6', INK, 3)
      + P('M-4 150h248v94H-4z', '#5C9BD5', 3) + R(10, 168, 220, 14, '#90A4AE', 2, 3) + [40, 110, 180].map((x) => Lc(`M${x} 150l10 18`, '#455A64', 4)).join('')
      + g(80, 214, 1, P('M-40 0h80l-8 14h-64z', '#FFFFFF', 3) + R(-24, -16, 44, 16, '#FFFFFF', 3, 2.5) + wins(-20, -12, 4, 10, 6, 6) + Lc('M-40 6h80', '#E53935', 3)) + Lc('M150 214c10-4 20 4 30 0M190 226c10-4 20 4 30 0', '#E1F5FE', 3) + face(120, 120, 0.3)),
  L('de/hamburg/landmark-elbtunnel.v1.svg', 'อุโมงค์เอลเบอเก่าใต้แม่น้ำ', 'The old Elbe Tunnel under the river', ['old elbe tunnel', 'อุโมงค์เอลเบอเก่า', 'st. pauli elbtunnel', 'alter elbtunnel', 'tiled tunnel', 'อุโมงค์กระเบื้อง', 'under the river', 'ใต้แม่น้ำ', 'cycling', 'car lifts'], 'หาอุโมงค์กระเบื้องขาวที่ทอดยาวอยู่ใต้แม่น้ำ', 'Find the white-tiled tunnel running deep under the river',
    // a cutaway view: the river with a ship on top, and deep below it a round tunnel tube lined with white and beige tiles and little lamps, a child cycling and another walking through it
    sky('#E1F5FE') + P('M-4 40h248v60H-4z', '#5C9BD5', 3) + g(150, 40, 1, P('M-40 0h80l-6-14h-68z', '#E53935', 2.5) + R(-20, -30, 30, 16, '#FFFFFF', 2, 2.5) + R(14, -40, 8, 26, '#212121', 1, 2)) + P('M-4 100h248v144H-4z', '#8D6E63', 3) + Lc('M20 116c20 6 40-6 60 0M150 120c20 6 40-6 60 0', '#6D4C41', 3)
      + C(120, 186, 70, '#F5F0E1', 4) + Array.from({ length: 5 }, (_, r) => Array.from({ length: 6 }, (_, k) => R(66 + k * 18 + (r % 2) * 9, 132 + r * 16, 16, 14, (k + r) % 3 ? '#FFFFFF' : '#E8D9B8', 2, 1)).join('')).join('')
      + C(120, 186, 70, 'none', 4) + C(120, 186, 40, '#FFF8E1', 3) + [[120, 126], [70, 160], [170, 160]].map(([x, y]) => C(x, y, 4, '#FFEB3B', 1.5)).join('') + P('M50 226h140', 'none', 3) + Lc('M54 230h132', '#BDBDBD', 6)
      + g(96, 222, 1, C(-10, 0, 8, 'none', 2.5) + C(10, 0, 8, 'none', 2.5) + Lc('M-10 0l8-12h10l2 12', '#1E88E5', 2.5) + C(0, -26, 7, '#FFE0BD', 2) + P('M-4-18l6 2 2 8', '#FFCA28', 5) + face(0, -24, 0.2)) + kid(150, 230, '#43A047', 0.9)),
  L('de/hamburg/landmark-containerport.v1.svg', 'ท่าเรือตู้คอนเทนเนอร์และเครนยักษ์', 'The container port and its giant cranes', ['container port', 'ท่าเรือตู้คอนเทนเนอร์', 'gantry cranes', 'เครนยักษ์', 'container ship', 'เรือตู้คอนเทนเนอร์', 'port of hamburg', 'ท่าเรือฮัมบวร์ก', 'harbour tour', 'colourful containers'], 'หาเครนยักษ์ที่กำลังยกตู้คอนเทนเนอร์สีส้มขึ้นเรือ', 'Find the giant crane lifting an orange container onto the ship',
    // two huge blue gantry cranes with long arms over a big ship stacked with containers in red, blue, green and yellow, one crane lifting an orange container on cables
    sky('#E3F2FD') + P('M-4 190h248v54H-4z', '#5C9BD5', 3)
      + P('M10 190h220l-14 30H24z', '#37474F', 3) + Lc('M14 200h212', '#E53935', 4) + R(180, 140, 34, 50, '#FFFFFF', 2, 3) + wins(186, 146, 3, 9, 6, 6)
      + Array.from({ length: 3 }, (_, r) => Array.from({ length: 7 }, (_, k) => R(24 + k * 22, 172 - r * 16, 20, 14, ['#E53935', '#1E88E5', '#43A047', '#FFCA28', '#8E24AA'][(k + r * 2) % 5], 1, 2)).join('')).join('')
      + [[50, 1], [130, 1]].map(([x]) => Lc(`M${x} 190V40M${x + 30} 190V40`, '#1565C0', 6) + Lc(`M${x - 6} 52h120M${x} 120h30M${x} 80l30 20`, '#1565C0', 5) + R(x + 6, 40, 20, 14, '#1565C0', 1, 2.5)).join('')
      + Lc('M150 52v54M158 52v54', INK, 1.5) + R(140, 106, 28, 16, '#FF7043', 1, 2.5) + Lc('M146 106v16M154 106v16M162 106v16', '#BF360C', 1.5) + face(154, 112, 0.18)),
  L('de/hamburg/landmark-fischbroetchen.v1.svg', 'ขนมปังสอดปลาฟิชเบรอทเชินริมท่าเรือ', 'A Fischbrötchen fish roll by the harbour', ['fischbrötchen', 'fischbroetchen', 'ฟิชเบรอทเชิน', 'fish roll', 'ขนมปังสอดปลา', 'herring sandwich', 'ปลาเฮร์ริง', 'fish market', 'harbour snack', 'ของว่างริมท่าเรือ'], 'หาปลาเฮร์ริงสีเงินที่ยื่นออกมาจากขนมปังก้อนกลม', 'Find the silver fish poking out of the crusty bread roll',
    // a crusty round bread roll split open with a shiny silver herring fillet, rings of red onion, lettuce and a slice of pickle poking out, a seagull eyeing it, harbour cranes far behind
    sky('#E3F2FD') + P('M-4 150h248v94H-4z', '#5C9BD5', 0) + Lc('M30 70v80M30 76h50M150 60v90M150 66h60', '#90A4AE', 4)
      + P('M30 160c0-50 180-50 180 0z', '#D9A066') + Lc('M70 128l10-10M110 120l10-10M150 126l10-10', '#B57A3C', 3)
      + P('M24 168c40-10 152-10 196 0l-4 6H28z', '#7CB342', 2.5) + P('M14 172c20-14 60-16 120-12s70 4 86 10c-20 8-60 10-110 8-40-2-80-2-96-6z', '#CFD8DC', 3) + Lc('M40 172c30-4 80-4 120 0', '#90A4AE', 2) + P('M14 172l-14-10 2 22z', '#CFD8DC', 2.5)
      + [[70, 180], [110, 182], [150, 180]].map(([x, y]) => E(x, y, 12, 5, 'none', 0) + Lc(`M${x - 12} ${y}c0-6 24-6 24 0s-24 6-24 0`, '#AB47BC', 3)).join('') + E(186, 180, 12, 6, '#9CCC65', 2.5)
      + P('M30 186h180c0 30-180 30-180 0z', '#D9A066') + face(120, 140, 0.4)
      + g(204, 92, 1, E(0, 0, 18, 10, '#FFFFFF') + C(14, -10, 8, '#FFFFFF') + P('M20-10l10 2-10 4z', '#FFB300', 1.5) + P('M-6-4c-10-14-20-14-24-10 10 2 16 8 18 14z', '#CFD8DC', 2) + C(16, -12, 1.5, INK, 0))),
  L('de/hamburg/landmark-chilehaus.v1.svg', 'ตึกชิเลเฮาส์ที่แหลมเหมือนหัวเรือ', 'The Chilehaus, shaped like a ship\'s bow', ['chilehaus', 'ชิเลเฮาส์', 'ship-shaped building', 'ตึกรูปหัวเรือ', 'brick expressionism', 'ตึกอิฐสีเข้ม', 'kontorhaus district', 'unesco', 'pointed corner', 'มุมแหลม'], 'หามุมตึกที่แหลมเหมือนหัวเรือกำลังแล่นมา', 'Find the sharp corner of the building pointing out like the front of a ship',
    // a big dark-brown brick office block seen from its corner, coming to a sharp point like the bow of a ship, its top floors stepping back like decks, rows of white-framed windows
    sky('#E1F5FE') + P('M120 40L10 70v150h110z', '#6D3B2A', 3) + P('M120 40l110 30v150H120z', '#5D3122', 3)
      + P('M120 28L30 52v18l90-30 90 30V52z', '#7A4632', 3) + P('M120 16L50 36v16l70-24 70 24V36z', '#86503A', 3)
      + Array.from({ length: 7 }, (_, r) => Array.from({ length: 5 }, (_, k) => P(`M${24 + k * 19} ${86 + r * 18 - k * 5}l12-3v10l-12 3z`, '#FFF8E1', 1.5) + P(`M${126 + k * 19} ${74 + r * 18 + k * 5}l12 3v10l-12-3z`, '#FFF8E1', 1.5)).join('')).join('')
      + Lc('M120 40v180', '#3E1F14', 4) + P('M-4 220h248v24H-4z', '#BDBDBD', 3) + P('M100 220v-16c0-10 16-10 16 0v16zM124 220v-16c0-10 16-10 16 0v16z', '#3E2723', 2.5) + face(120, 30, 0.22)),
  L('de/hamburg/landmark-blankenese.v1.svg', 'หมู่บ้านบันไดบลังเคอเนเซริมแม่น้ำเอลเบอ', 'The staircase village of Blankenese', ['blankenese', 'บลังเคอเนเซ', 'staircase quarter', 'treppenviertel', 'หมู่บ้านบันได', 'elbe river', 'แม่น้ำเอลเบอ', 'hillside village', 'หมู่บ้านบนเนิน', 'white houses'], 'หาบันไดเล็กๆ ที่คดเคี้ยวขึ้นเนินระหว่างบ้าน', 'Find the little stairways zigzagging up the hill between the houses',
    // a steep green hillside covered with little white houses with red and thatched roofs, white stairways zigzagging between them down to the wide river, a big ship gliding past
    sky('#E3F2FD') + P('M-4 244V20c60 10 140 60 248 140v84z', '#7CB342', 3) + P('M-4 244V190c80 0 160 10 248 20v34z', '#5C9BD5', 3) + Lc('M20 220h50M140 226h60', '#E1F5FE', 3)
      + [[20, 50, '#E53935'], [60, 70, '#8D6E63'], [30, 110, '#E53935'], [90, 100, '#E53935'], [70, 140, '#8D6E63'], [130, 130, '#E53935'], [20, 160, '#8D6E63'], [110, 170, '#E53935'], [170, 160, '#8D6E63']].map(([x, y, c]) => R(x, y, 26, 18, '#FFFFFF', 0, 2.5) + P(`M${x - 3} ${y}l16-12 16 12z`, c, 2.5) + R(x + 9, y + 6, 8, 8, '#90CAF9', 1, 1.5)).join('')
      + Lc('M52 40v20h-10v20h20v24h-10v30h20v20h-14v26M100 80v20h10v20h-14v30h20v20', '#FFFFFF', 5) + Lc('M52 40v20h-10v20h20v24h-10v30h20v20h-14v26M100 80v20h10v20h-14v30h20v20', '#BDBDBD', 1.5)
      + g(170, 206, 1, P('M-50 0h100l-10 14h-80z', '#455A64', 3) + R(-40, -14, 30, 14, '#E53935', 1, 2) + R(-8, -14, 30, 14, '#1E88E5', 1, 2) + R(26, -26, 14, 26, '#FFFFFF', 1, 2.5)) + face(143, 140, 0.18)),

  // ---------- Cologne, Düsseldorf and the Rhine valley
  L('de/cologne/landmark-karneval.v1.svg', 'ขบวนคาร์นิวัลโคโลญโยนลูกอม', 'The Cologne carnival parade throwing sweets', ['cologne carnival', 'คาร์นิวัลโคโลญ', 'kölner karneval', 'koelner karneval', 'rosenmontag', 'kamelle', 'โยนลูกอม', 'parade float', 'รถขบวนแห่', 'confetti'], 'หาลูกอมและดอกไม้ที่ถูกโยนลงมาจากรถขบวนแห่', 'Find the sweets and flowers being thrown down from the parade float',
    // a bright parade float decorated with balloons and a big smiling sun, a child in a red-and-white clown costume on top throwing wrapped sweets and little flowers to children with open bags below, confetti everywhere
    sky('#FFF8E1') + P('M-4 220h248v24H-4z', '#BDBDBD', 3)
      + R(30, 130, 180, 60, '#1E88E5', 6, 3) + Lc('M30 150h180', '#FFFFFF', 4) + Lc('M30 170h180', '#FFCA28', 4) + [60, 180].map((x) => C(x, 200, 14, '#37474F', 3) + C(x, 200, 4, '#B0BEC5', 1.5)).join('')
      + C(170, 96, 26, '#FFCA28', 3) + Array.from({ length: 8 }, (_, k) => g(170, 96, 1, P('M0-30l5 8h-10z', '#FF9800', 2), k * 45)).join('') + face(170, 98, 0.35)
      + g(90, 130, 1, P('M-14 0v-30h28v30z', '#E53935') + Lc('M-14-20h28M-14-10h28', '#FFFFFF', 4) + C(0, -42, 11, '#FFE0BD') + P('M-10-50l10-24 10 24z', '#FFFFFF') + C(0, -74, 4, '#E53935') + C(0, -36, 3, '#E53935', 0) + Lc('M-14-24l-14-20M14-24l18-24', '#E53935', 6) + face(0, -42, 0.26, 'o'))
      + [[124, 76, '#E53935'], [140, 44, '#43A047'], [60, 70, '#AB47BC']].map(([x, y, c]) => E(x, y, 7, 5, c, 2) + P(`M${x - 7} ${y}l-6-4v8zM${x + 7} ${y}l6-4v8z`, c, 1.5)).join('') + [[30, 100], [210, 40]].map(([x, y]) => C(x, y, 6, '#EC407A', 2) + C(x, y, 2, '#FFEB3B', 0)).join('')
      + Array.from({ length: 16 }, (_, k) => R(8 + (k * 47) % 228, 10 + (k * 29) % 110, 5, 5, ['#E53935', '#43A047', '#1E88E5', '#FFCA28'][k % 4], 1, 0)).join('')
      + kid(20, 236, '#FFCA28', 0.9) + kid(222, 236, '#43A047', 0.9)),
  L('de/cologne/landmark-maeuseturm.v1.svg', 'หอคอยหนูกลางแม่น้ำไรน์ที่บิงเงิน', 'The Mouse Tower in the Rhine at Bingen', ['mouse tower', 'หอคอยหนู', 'mäuseturm', 'maeuseturm', 'bingen', 'บิงเงิน', 'tower on an island', 'หอคอยบนเกาะ', 'rhine valley', 'หุบเขาไรน์'], 'หาหอคอยสีเหลืองบนเกาะเล็กกลางแม่น้ำ', 'Find the yellow tower standing on a tiny island in the river',
    // a slim yellow tower with a red-trimmed battlement top and a little corner turret on a tiny rocky island in the middle of the wide river, steep green hills and a castle ruin on the bank, two cute mice on the rocks
    sky('#E3F2FD') + P('M-4 120c30-60 80-80 130-50s80-20 118 0v50H-4z', '#7CB342', 3) + R(170, 54, 30, 22, '#BCAAA4', 0, 2.5) + Lc('M170 54v-6h6v6M182 54v-6h6v6M194 54v-6h6v6', INK, 2)
      + P('M-4 120h248v124H-4z', '#5C9BD5', 3) + Lc('M20 150h40M170 160h50M30 220h50M160 226h50', '#E1F5FE', 3)
      + P('M70 200c6-20 20-26 50-26s46 6 52 26z', '#9E9E9E', 3)
      + R(100, 70, 40, 106, '#FFD54F', 0, 3) + R(96, 60, 48, 14, '#FFD54F', 0, 3) + Array.from({ length: 4 }, (_, k) => R(96 + k * 13, 50, 9, 10, '#E53935', 0, 2.5)).join('') + R(136, 40, 16, 40, '#FFD54F', 0, 3) + P('M134 40l10-14 10 14z', '#E53935', 2.5)
      + R(112, 90, 14, 20, '#5D4037', 7, 2) + R(112, 130, 14, 20, '#5D4037', 7, 2)
      + [[84, 182, 1], [158, 184, -1]].map(([x, y, d]) => g(x, y, 1, E(0, 0, 10, 7, '#9E9E9E', 2.5) + C(d * 8, -6, 5, '#9E9E9E', 2) + C(d * 6, -11, 3, '#FFAB91', 1.5) + Lc(`M${-d * 10} 2c${-d * 8} 0 ${-d * 10} 6 ${-d * 14} 2`, INK, 2) + C(d * 10, -6, 1.2, INK, 0))).join('')),
  L('de/cologne/landmark-drachenburg.v1.svg', 'วังดราเคินบวร์กบนเนินดราเคินเฟลส์', 'Drachenburg Castle on the Drachenfels', ['drachenburg castle', 'วังดราเคินบวร์ก', 'schloss drachenburg', 'drachenfels', 'ดราเคินเฟลส์', 'dragon rock', 'ผาหินมังกร', 'königswinter', 'seven mountains', 'near bonn'], 'หาวังยอดแหลมที่อยู่ใต้ซากปราสาทบนยอดเขา', 'Find the pointy-roofed palace sitting below the old castle ruin on the hilltop',
    // a fanciful cream palace with many pointed towers and a tall spire halfway up a wooded hill, the broken stone stump of an old castle on the rocky summit above, the Rhine at the foot
    sky('#FFF3E0') + P('M-4 244V140c40-30 70-90 110-110s60 10 80 40 40 50 58 70v104z', '#558B2F', 3) + P('M96 38c4-10 14-14 24-12 6 2 8 8 6 14z', '#9E9E9E', 3) + P('M100 34V14h8v8h6V12h8v22', '#BDBDBD', 3)
      + [[30, 170], [200, 160], [220, 190]].map(([x, y]) => tree(x, y, 1.2, '#33691E')).join('')
      + R(80, 110, 90, 60, '#FFF8E1', 0, 3) + wins(90, 126, 4, 20, 10, 16, '#90A4AE') + [[80, 90, 22], [148, 96, 22]].map(([x, y, w]) => R(x, y, w, 80 - (y - 90), '#FFF8E1', 0, 3) + P(`M${x - 3} ${y}l${w / 2 + 3}-26 ${w / 2 + 3} 26z`, '#5D4037', 3)).join('')
      + R(112, 60, 20, 50, '#FFF8E1', 0, 3) + P('M108 60l14-40 14 40z', '#5D4037', 3) + R(117, 72, 10, 14, '#90A4AE', 5, 1.5)
      + P('M-4 244V200c80 10 160 6 248-6v50z', '#5C9BD5', 3) + Lc('M30 224h50M150 226h50', '#E1F5FE', 3) + face(125, 150, 0.3)),
  L('de/cologne/landmark-kranhaeuser.v1.svg', 'ตึกเครนสามหลังริมท่าเรือไรเนาอูฮาเฟิน', 'The three Crane Houses on the Rheinauhafen', ['kranhäuser', 'kranhaeuser', 'ตึกเครน', 'crane houses', 'ตึกรูปเครน', 'rheinauhafen', 'ไรเนาอูฮาเฟิน', 'modern buildings', 'ตึกสมัยใหม่', 'rhine harbour'], 'หาตึกสามหลังที่หน้าตาเหมือนเครนคว่ำ', 'Find the three buildings shaped like upside-down cranes',
    // three tall glassy buildings each shaped like an upside-down L, like harbour cranes, their long top arms reaching out over the river promenade, an old red harbour crane beside them
    sky('#E3F2FD') + P('M-4 180h248v64H-4z', '#5C9BD5', 3) + P('M-4 170h248v10H-4z', '#BDBDBD', 3) + Lc('M20 210h50M150 220h60', '#E1F5FE', 3)
      + [[20], [92], [164]].map(([x]) => R(x, 60, 20, 110, '#B0BEC5', 0, 3) + Array.from({ length: 8 }, (_, k) => Lc(`M${x} ${74 + k * 12}h20`, '#78909C', 2)).join('') + R(x, 40, 60, 26, '#ECEFF1', 0, 3) + Lc(`M${x} 52h60M${x + 20} 40v26M${x + 40} 40v26`, '#90A4AE', 2) + Lc(`M${x + 6} 60v110M${x + 14} 60v110`, '#E1F5FE', 1.5)).join('')
      + g(226, 170, 1, Lc('M-6 0V-60M6 0V-60', '#C62828', 4) + Lc('M-8-60h-30M-38-60v20', '#C62828', 4) + R(-10, -70, 20, 12, '#C62828', 1, 2.5)) + kid(70, 170, '#FFCA28', 0.8) + face(110, 52, 0.22)),
  L('de/cologne/landmark-radschlaeger.v1.svg', 'เด็กตีลังกาเรดชเลเกอร์แห่งดึสเซลดอร์ฟ', 'Düsseldorf\'s cartwheeling children', ['radschläger', 'radschlaeger', 'เรดชเลเกอร์', 'cartwheel', 'ตีลังกาล้อเกวียน', 'düsseldorf', 'ดึสเซลดอร์ฟ', 'old town', 'เมืองเก่า', 'cartwheel contest'], 'หาเด็กที่กำลังตีลังกาแบบล้อเกวียนกลางถนน', 'Find the child doing a cartwheel in the middle of the street',
    // a child doing a cartwheel upside-down with arms and legs spread like a star, a curved motion arc behind, on the cobbles of an old town square with narrow gabled houses and another child clapping
    sky('#E1F5FE') + [[-4, 56, '#FFF59D'], [52, 50, '#FFCCBC'], [140, 50, '#C8E6C9'], [190, 54, '#B3E5FC']].map(([x, w, c]) => R(x, 50, w, 120, c, 0, 3) + P(`M${x - 3} 50l${w / 2 + 3}-28 ${w / 2 + 3} 28z`, '#5D4037', 3) + wins(x + 8, 70, 2, w / 2 - 4, 12, 16, '#FFFFFF') + wins(x + 8, 110, 2, w / 2 - 4, 12, 16, '#FFFFFF')).join('') + R(102, 70, 38, 100, '#FFFFFF', 0, 3) + P('M100 70l21-22 21 22z', '#5D4037', 3)
      + P('M-4 170h248v74H-4z', '#BDBDBD', 3) + Array.from({ length: 12 }, (_, k) => E(10 + k * 20, 206 + (k % 2) * 10, 8, 4, '#9E9E9E', 1.5)).join('')
      + Lc('M60 200c10-50 90-70 130-30', '#FFFFFF', 4) + P('M188 166l6 12-12 0z', '#FFFFFF', 2)
      + g(120, 150, 1, Lc('M-6 8l-26 24M6 8l26 24', '#FFE0BD', 7) + Lc('M-8-14l-24-28M8-14l24-28', '#1E88E5', 8) + R(-12, -16, 24, 26, '#E53935', 6) + C(0, 24, 12, '#FFE0BD') + P('M-10 30c4 8 16 8 20 0', '#6D4C41', 2) + face(0, 22, 0.28, 'o'), 20)
      + g(214, 236, 1, C(0, -24, 9, '#FFE0BD', 2) + P('M-9 6v-18h18v18z', '#AB47BC', 2) + Lc('M-6-6l6-8M6-6l-6-8', '#FFE0BD', 3) + face(0, -22, 0.22, 'o'))),
];

export default { places: {}, items };
