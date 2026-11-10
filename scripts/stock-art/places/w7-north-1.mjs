// Wave 7, the north (part 1): London, Amsterdam, Finland, Lapland, Norway, Tromsø, Bergen and the fjords
import { P, R, C, E, Lc, g, face, free, scene, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SCOPE = { 'fi-lapland': 'p-lapland' };
// the id follows the file name (fi/lapland/landmark-snowmobile.v1.svg → p-lapland.landmark.snowmobile)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): no background, its own halo
const X = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const pine = (x, y, s, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18H-18l11-18h-7z', c, 2.5) + R(-3, 0, 6, 8, '#6D4C41', 0, 2));
const snowPine = (x, y, s) => g(x, y, s, P('M0-40l14 22h-7l11 18H-18l11-18h-7z', '#2E7D32', 2.5) + P('M0-40l7 11h-7l-7-1zM-7-18h14l3 5h-20z', '#FFFFFF', 0) + R(-3, 0, 6, 8, '#6D4C41', 0, 2));

const items = [
  // ---------- London
  L('gb/london/landmark-kewpalmhouse.v1.svg', 'เรือนกระจกต้นปาล์มที่สวนคิว', 'The Palm House glasshouse at Kew Gardens', ['kew gardens', 'สวนคิว', 'palm house', 'เรือนกระจกปาล์ม', 'glasshouse', 'เรือนกระจก', 'botanic garden', 'สวนพฤกษศาสตร์', 'tropical plants', 'ต้นไม้เมืองร้อน'], 'หาต้นปาล์มที่อยู่ในบ้านกระจกโค้งๆ', 'Find the palm tree growing inside the curvy glass house',
    // a long Victorian glasshouse of curved white iron ribs: a tall rounded middle and two lower wings, palm fronds pressing on the glass, a round pond in front with a child
    sky('#E3F2FD') + P('M-4 168h248v76H-4z', '#7CB342', 0)
      + P('M14 172v-32c0-34 64-34 64 0v32z', '#B2EBF2', 3) + P('M162 172v-32c0-34 64-34 64 0v32z', '#B2EBF2', 3) + P('M74 172V96c0-56 92-56 92 0v76z', '#B2EBF2', 3)
      + [[28, 116], [46, 108], [64, 116]].map(([x, y]) => Lc(`M${x} 172V${y + 14}`, '#FFFFFF', 2)).join('') + [[176, 116], [194, 108], [212, 116]].map(([x, y]) => Lc(`M${x} 172V${y + 14}`, '#FFFFFF', 2)).join('')
      + [92, 108, 132, 148].map((x) => Lc(`M${x} 172V${x < 120 ? 66 + (x - 92) * 0.3 : 66 + (148 - x) * 0.3}`, '#FFFFFF', 2)).join('') + Lc('M78 110h84M18 150h56M166 150h56', '#FFFFFF', 2)
      + R(112, 34, 16, 18, '#B2EBF2', 2, 2.5) + P('M110 34l10-10 10 10z', '#FFFFFF', 2)
      + [[96, 112, -1], [146, 104, 1], [40, 142, -1], [200, 142, 1]].map(([x, y, d]) => Lc(`M${x} 172c0-20 ${d * 4}-40 0-${172 - y}`, '#6D4C41', 4) + [-30, -12, 8, 26].map((a) => Lc(`M${x} ${y}q${a * 0.6} -8 ${a} 10`, '#2E7D32', 4)).join('')).join('')
      + E(120, 204, 70, 14, '#4FC3F7', 3) + Lc('M80 204h24M132 206h28', '#FFFFFF', 2) + kid(200, 226, '#E53935') + face(120, 140, 0.4)),

  // ---------- Amsterdam
  L('nl/amsterdam/landmark-magerebrug.v1.svg', 'สะพานยกสีขาวมาเคอเบรอค', 'The white Skinny Bridge lifting over the Amstel', ['magere brug', 'มาเคอเบรอค', 'skinny bridge', 'สะพานผอม', 'drawbridge', 'สะพานยก', 'amstel river', 'แม่น้ำอัมสเตล', 'bridge lifting', 'boat passing'], 'หาสะพานสองแผ่นที่ยกขึ้นให้เรือลอดผ่าน', 'Find the two halves of the bridge lifted up to let a boat pass',
    // a white wooden double drawbridge with its two halves raised like a pair of arms, tall white frames with beams overhead strung with little lights, a small boat sliding under it on the river
    sky('#FFE0B2') + P('M-4 150h248v94H-4z', '#4FC3F7', 0) + Lc('M20 200h40M150 214h50M90 230h30', '#E1F5FE', 3) + R(-4, 140, 64, 14, '#A1887F', 0, 2.5) + R(180, 140, 64, 14, '#A1887F', 0, 2.5)
      + [[20, 60], [160, 220]].map(([a, b]) => Lc(`M${a + 6} 140V64M${b - 6} 140V64`, '#FFFFFF', 7) + Lc(`M${a + 6} 140V64M${b - 6} 140V64`, INK, 1.5) + R(a - 4, 52, b - a + 8, 12, '#FFFFFF', 2, 2.5) + Lc(`M${a + 6} 100L${(a + b) / 2} 64L${b - 6} 100`, '#FFFFFF', 4)).join('')
      + P('M60 140L100 84l8 6-38 56z', '#FFFFFF', 2.5) + P('M180 140L140 84l-8 6 38 56z', '#FFFFFF', 2.5) + Lc('M66 136L102 88M174 136L138 88', '#B0BEC5', 1.5)
      + Array.from({ length: 12 }, (_, k) => C(k < 6 ? 18 + k * 8.4 : 162 + (k - 6) * 11.6, 58, 2, '#FFEB3B', 0.8)).join('')
      + g(120, 176, 1, P('M-44-6h88l-10 18h-68z', '#1E88E5', 2.5) + R(-20, -20, 34, 14, '#FFFFFF', 3, 2) + R(-14, -16, 8, 6, '#B3E5FC', 1, 1) + R(0, -16, 8, 6, '#B3E5FC', 1, 1) + face(0, 2, 0.3)) + kid(214, 140, '#FB8C00', 0.9)),
  L('nl/amsterdam/landmark-nemo.v1.svg', 'พิพิธภัณฑ์วิทยาศาสตร์นีโมรูปหัวเรือสีเขียว', 'NEMO, the green ship-shaped science museum', ['nemo science museum', 'พิพิธภัณฑ์วิทยาศาสตร์นีโม', 'science museum', 'พิพิธภัณฑ์วิทยาศาสตร์', 'green building', 'ตึกสีเขียว', 'rooftop steps', 'บันไดบนหลังคา', 'oosterdok', 'experiments', 'ทดลองวิทยาศาสตร์'], 'หาบันไดบนหลังคาที่เด็กๆ เดินขึ้นไปนั่งเล่นได้', 'Find the giant steps on the sloping roof where children climb up and sit',
    // a huge copper-green building rising out of the harbour like the bow of a ship, its sloping roof a giant staircase with children climbing it, round windows, a bubble and a cog for science
    sky('#E1F5FE') + P('M-4 182h248v62H-4z', '#29B6F6', 0) + Lc('M14 206h40M120 220h60M190 200h40', '#E1F5FE', 3)
      + P('M12 182V138L208 46l20 26-14 110z', '#26A69A', 3.5) + Array.from({ length: 8 }, (_, k) => P(`M${24 + k * 24} ${132 - k * 11.4}h24v-11.4`, 'none', 2)).join('') + P('M208 46l20 26', 'none', 3)
      + [[46, 160], [86, 160], [126, 160], [166, 160]].map(([x, y]) => C(x, y, 9, '#B2EBF2', 2.5)).join('') + R(184, 120, 20, 24, '#B2EBF2', 2, 2.5)
      + kid(92, 112, '#FFCA28', 0.8) + kid(150, 84, '#E53935', 0.8) + g(46, 80, 1, C(0, 0, 14, '#FFFFFF', 2.5) + Array.from({ length: 6 }, (_, k) => R(-3, -20, 6, 8, '#FFFFFF', 1, 2).replace('<rect', `<rect transform="rotate(${k * 60})"`)).join('') + C(0, 0, 5, '#FFCA28', 2))
      + C(24, 52, 9, '#E1F5FE', 2) + C(34, 34, 5, '#E1F5FE', 2) + face(110, 162, 0.35)),

  // ---------- Finland
  X('fi', 'food', 'karelianpie', 'คาเรเลียนพายแป้งไรย์ไส้ข้าว', 'Karelian pies with egg butter', ['karelian pie', 'คาเรเลียนพาย', 'karjalanpiirakka', 'คาร์ยาลันปีรักกา', 'rice pasty', 'พายไส้ข้าว', 'rye crust', 'แป้งไรย์', 'egg butter', 'เนยผสมไข่', 'finnish food'],
    // three little oval pies with thin rye crusts pinched into wavy edges, filled with golden-topped rice porridge, the middle one wearing a dollop of chopped egg butter, on a wooden board
    R(18, 150, 204, 34, '#C8A165', 10) + Lc('M30 168h180', '#A1673F', 2)
      + [[64, 124, -10], [176, 124, 10], [120, 138, 0]].map(([x, y, r]) => g(x, y, 1, P('M-46 0c0-30 92-30 92 0s-92 30-92 0z', '#8D5524', 3) + P('M-40 0l6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8', 'none', 2.5) + E(0, 0, 32, 12, '#FFF3C4', 2.5) + [[-14, -2], [6, 3], [18, -4]].map(([dx, dy]) => E(dx, dy, 6, 3, '#E9A64C', 0)).join(''), r)).join('')
      + g(120, 126, 1, P('M-20 4c-4-16 10-24 20-24s24 8 20 24z', '#FFFDE7', 2.5) + [[-8, -6], [6, -10], [10, 0], [-2, 2]].map(([x, y]) => C(x, y, 3.5, '#FFD54F', 1.2)).join('') + Lc('M-4-14l3-3', '#43A047', 2))
      + face(120, 146, 0.4)),

  // ---------- Lapland
  L('fi/lapland/landmark-snowmobile.v1.svg', 'นั่งสโนว์โมบิลตะลุยหิมะ', 'A snowmobile ride through the snow', ['snowmobile', 'สโนว์โมบิล', 'snowmobile safari', 'ซาฟารีสโนว์โมบิล', 'moottorikelkka', 'snow trail', 'ทางหิมะ', 'helmet', 'หมวกกันน็อก', 'frozen forest'], 'หาสกีอันเล็กข้างหน้ากับสายพานยางข้างหลังรถ', 'Find the little skis at the front and the rubber track at the back',
    // a red snowmobile with front skis and a rubber track zooming over deep snow, a child in a helmet riding it, snow spraying behind, snowy spruces and a pink winter dusk
    sky('#F8BBD0') + C(190, 70, 16, '#FFE082', 0) + P('M-4 150c60-20 140-20 248 0v94H-4z', '#FFFFFF', 3) + snowPine(30, 150, 1.2) + snowPine(60, 146, 0.9) + snowPine(210, 150, 1.3) + snowPine(180, 146, 0.8)
      + Lc('M-4 214c50-6 90-16 140-30', '#B3E5FC', 6) + g(122, 178, 1, P('M-60 12h40l2 8h-48z', '#90A4AE', 2.5) + P('M-62 22c-6 0-8-8-2-8h12', '#90A4AE', 0) + Lc('M-62 22c-8 0-10-10-2-10', INK, 3)
        + R(4, 6, 58, 14, '#37474F', 6, 2.5) + [12, 24, 36, 48].map((x) => C(x + 4, 13, 3.5, '#90A4AE', 1.5)).join('') + P('M-46 8c0-16 14-26 34-26h64c8 0 12 8 10 16l-6 12H-46z', '#E53935', 3) + P('M-24-18l-10-18 16 2 6 16z', '#B3E5FC', 2.5)
        + R(6, -24, 40, 8, '#263238', 3, 2) + g(24, -40, 1, C(0, -6, 13, '#1E88E5', 2.5) + P('M-9-8h18v8h-18z', '#FFE0BD', 1.5) + face(0, -4, 0.18)) + face(10, -2, 0.3))
      + [[196, 192], [210, 178], [222, 196]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 2)).join('')),
  L('fi/lapland/landmark-snowcastle.v1.svg', 'ปราสาทหิมะแห่งเคมิ', 'The SnowCastle of Kemi', ['snowcastle', 'ปราสาทหิมะ', 'lumilinna', 'ลูมิลินนา', 'kemi', 'เคมิ', 'snow hotel', 'โรงแรมหิมะ', 'ice sculptures', 'รูปปั้นน้ำแข็ง'], 'หาประตูทางเข้าโค้งที่ทำจากก้อนหิมะ', 'Find the arched doorway built out of snow blocks',
    // a castle built entirely of snow: chunky white walls and round towers with snow battlements, glowing blue ice windows and an arched doorway, a starry dark blue sky, a child at the door
    sky('#1A237E') + Array.from({ length: 14 }, (_, k) => C((k * 67) % 240, 12 + ((k * 31) % 60), k % 3 ? 1.4 : 2.2, '#FFF59D', 0)).join('') + P('M-4 196c80-8 160-8 248 0v48H-4z', '#E3F2FD', 0)
      + [[40, 84], [200, 84]].map(([x, y]) => R(x - 26, y, 52, 116, '#FFFFFF', 4, 3) + Array.from({ length: 4 }, (_, k) => R(x - 26 + k * 14, y - 12, 10, 14, '#FFFFFF', 2, 2.5)).join('') + R(x - 8, y + 28, 16, 22, '#4FC3F7', 8, 2.5)).join('')
      + R(66, 110, 108, 90, '#F5FBFF', 0, 3) + Array.from({ length: 7 }, (_, k) => R(66 + k * 16, 98, 12, 14, '#F5FBFF', 2, 2.5)).join('') + Lc('M70 134h100M70 160h100', '#BBDEFB', 2) + Lc('M94 110v24M146 110v24M80 134v26M120 134v26M160 134v26', '#BBDEFB', 2)
      + P('M100 200v-34c0-28 40-28 40 0v34z', '#29B6F6', 3) + P('M108 200v-30c0-18 24-18 24 0v30z', '#B3E5FC', 0) + [[86, 118], [154, 118]].map(([x, y]) => R(x - 7, y, 14, 18, '#4FC3F7', 7, 2.5)).join('')
      + kid(194, 228, '#E53935') + face(120, 124, 0.3)),
  L('fi/lapland/landmark-icefishing.v1.svg', 'ตกปลาในรูน้ำแข็งบนทะเลสาบ', 'Ice fishing through a hole in a frozen lake', ['ice fishing', 'ตกปลาน้ำแข็ง', 'pilkki', 'ปิลกิ', 'frozen lake', 'ทะเลสาบน้ำแข็ง', 'ice hole', 'รูน้ำแข็ง', 'ice drill', 'สว่านเจาะน้ำแข็ง', 'perch'], 'หาปลาตัวเล็กที่ติดเบ็ดขึ้นมาจากรูน้ำแข็ง', 'Find the little fish coming up out of the hole in the ice',
    // a wide frozen lake under a pale sky, a round hole drilled in the ice showing dark water, a child on a little stool holding a tiny fishing rod with a striped fish on the line, a big hand drill standing in the snow
    sky('#E1F5FE') + P('M-4 96c40-14 80-14 120-4s90-12 128 0v20H-4z', '#2E7D32', 0) + [20, 50, 160, 200, 228].map((x, k) => snowPine(x, 104, 0.6 + (k % 2) * 0.2)).join('') + P('M-4 108h248v136H-4z', '#E3F2FD', 0) + Lc('M10 140h60M150 130h70M30 230h50', '#B3E5FC', 3)
      + E(96, 196, 34, 12, '#0D47A1', 3) + E(96, 194, 26, 7, '#1565C0', 0) + Lc('M150 150L98 172v24', '#5D4037', 3) + Lc('M98 172v26', INK, 1.2)
      + g(98, 168, 1, P('M-12 0c6-8 18-8 24 0-6 8-18 8-24 0z', '#FFCA28', 2.5) + P('M12 0l8-6v12z', '#FFCA28', 2) + Lc('M-4-5v10M4-5v10', '#43A047', 2.5) + C(-6, -1, 1.5, INK, 0))
      + R(146, 196, 32, 8, '#8D6E63', 2, 2.5) + Lc('M150 204v14M174 204v14', '#5D4037', 3) + g(162, 196, 1.3, C(0, -20, 8, '#FFE0BD', 2) + P('M-11-24c0-12 22-12 22 0z', '#E53935', 2) + C(0, -34, 3.5, '#FFFFFF', 1.5) + P('M-8 4v-16h16v16z', '#1E88E5', 2) + face(0, -18, 0.22))
      + g(212, 190, 1, Lc('M0 30V-34M-12-34h24', '#78909C', 4) + P('M-4 30l4 10 4-10z', '#90A4AE', 2) + Lc('M-4 0l8 6-8 6 8 6', '#B0BEC5', 2)) + face(96, 214, 0)),
  L('fi/lapland/landmark-amethystmine.v1.svg', 'เหมืองอะเมทิสต์ที่ลุสโต', 'The amethyst mine at Luosto', ['amethyst mine', 'เหมืองอะเมทิสต์', 'lampivaara', 'ลัมปิวาระ', 'luosto', 'ลุสโต', 'purple gemstone', 'อัญมณีสีม่วง', 'dig your own amethyst', 'ขุดหาอะเมทิสต์', 'headlamp'], 'หาก้อนผลึกสีม่วงในมือเด็ก', 'Find the purple crystal in the child\'s hand',
    // inside a rocky mine on a fell, wooden beams holding up the roof, a big cluster of pointed purple crystals in the rock wall, a child with a headlamp holding up a shiny amethyst, a little bucket and pick
    sky('#4E342E') + P('M20 244V90c0-60 200-60 200 0v154z', '#8D6E63', 3) + Lc('M40 120c20 10 40-6 60 4M150 100c20 6 40-4 56 6M44 190c30-6 40 8 70 0', '#6D4C41', 3)
      + Lc('M36 244V96M204 244V96', '#A1673F', 9) + Lc('M30 98h180', '#A1673F', 9) + Lc('M36 244V96M204 244V96M30 98h180', INK, 1.5)
      + g(76, 150, 1, [[-16, 10, -20], [0, 0, 0], [16, 8, 18], [-6, 18, -8], [10, 20, 10]].map(([x, y, r]) => g(x, y, 1, P('M-7 14v-20l7-12 7 12v20z', ['#9C27B0', '#BA68C8', '#7B1FA2', '#CE93D8', '#AB47BC'][Math.abs(x) % 5], 2.5) + Lc('M0-16v28', '#E1BEE7', 1.5), r)).join(''))
      + P('M-4 220c80-10 160-10 248 0v24H-4z', '#5D4037', 0) + g(150, 226, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-10-22c0-12 20-12 20 0z', '#FFCA28', 2) + C(0, -28, 3, '#FFF59D', 1) + P('M-8 4v-16h16v16z', '#43A047', 2) + face(0, -18, 0.22))
      + P('M138 104l12 82h-24z', '#FFF59D', 0).replace('/>', ' opacity=".35"/>') + g(170, 186, 1, P('M-6 8v-12l6-10 6 10v12z', '#BA68C8', 2) + P('M-10-8l-4-4M10-8l4-4M0-18v-6', 'none', 2))
      + P('M190 220l-4-20h24l-4 20z', '#90A4AE', 2.5) + C(198, 200, 5, '#BA68C8', 1.5) + face(76, 186, 0)),
  L('fi/lapland/landmark-lassothrow.v1.svg', 'โยนบ่วงคล้องเขากวางแบบชาวซามี', 'Lasso throwing at antlers, the Sámi way', ['lasso throwing', 'โยนบ่วงบาศ', 'suopunki', 'ซูโอปุงกิ', 'sámi lasso', 'บ่วงบาศชาวซามี', 'antlers', 'เขากวาง', 'reindeer farm', 'ฟาร์มเรนเดียร์', 'herder skills'], 'หาบ่วงเชือกที่กำลังลอยไปคล้องเขาบนเสา', 'Find the rope loop flying through the air towards the antlers on the post',
    // on snowy ground a pair of antlers fixed on a wooden post, a child in a blue tunic with red and yellow bands and a four-pointed hat throwing a rope loop that sails through the air towards them
    sky('#B3E5FC') + P('M-4 100c40-30 90-30 130-8s80-20 118-6v40H-4z', '#ECEFF1', 2.5) + [180, 206, 230].map((x) => pine(x, 120, 0.6, '#1B5E20')).join('') + P('M-4 150h248v94H-4z', '#FFFFFF', 0)
      + g(186, 140, 1.25, Lc('M0 76V0', INK, 9) + Lc('M0 76V0', '#8D6E63', 6) + Lc('M0 0c-12-8-20-24-16-40M-8-14c-10 0-16-6-18-14M-14-30c-6-4-8-10-6-14M0 0c12-8 20-24 16-40M8-14c10 0 16-6 18-14M14-30c6-4 8-10 6-14', INK, 9) + Lc('M0 0c-12-8-20-24-16-40M-8-14c-10 0-16-6-18-14M-14-30c-6-4-8-10-6-14M0 0c12-8 20-24 16-40M8-14c10 0 16-6 18-14M14-30c6-4 8-10 6-14', '#EFE2C8', 5))
      + Lc('M90 168C100 80 140 62 160 100', '#FBC02D', 4) + Lc('M160 112a26 12 0 1 0 52 0a26 12 0 1 0-52 0', INK, 7) + Lc('M160 112a26 12 0 1 0 52 0a26 12 0 1 0-52 0', '#FFEB3B', 4)
      + g(70, 210, 1.4, C(0, -24, 9, '#FFE0BD', 2) + P('M-10-28c2-10 18-10 20 0l6-8-2 10z', '#1565C0', 2) + R(-11, -30, 22, 4, '#E53935', 1, 1.5) + P('M-12 14l3-26h18l3 26z', '#1565C0', 2) + Lc('M-11 8h22', '#E53935', 3) + Lc('M-10 12h20', '#FFCA28', 2) + Lc('M8-8l10-18', '#FFE0BD', 3) + face(0, -22, 0.22))),

  // ---------- Norway
  X('no', 'transport', 'vikingship', 'เรือไวกิ้งหัวม้วนก้นหอย', 'A Viking longship with a curled prow', ['viking ship', 'เรือไวกิ้ง', 'longship', 'เรือยาว', 'vikingskip', 'วิกิงสกิป', 'oseberg ship', 'เรือโอเซเบิร์ก', 'square sail', 'ใบเรือลายทาง', 'oars', 'ไม้พาย'],
    // a long wooden ship with a tall prow and stern each curling into a spiral, a big square sail in red and white stripes, a row of oars dipping into blue waves, a little face on the hull
    P('M10 196c30-8 60 8 110 0s80-8 110 0v24H10z', '#4FC3F7') + Lc('M24 212c20-6 40 6 60 0M140 214c20-6 40 6 60 0', '#E1F5FE', 3)
      + Array.from({ length: 6 }, (_, k) => Lc(`M${66 + k * 22} 170l-8 30`, '#8D6E63', 4)).join('') + Lc('M120 158V36', '#6D4C41', 6) + R(64, 46, 112, 94, '#FFFFFF', 4, 3) + [0, 2, 4].map((k) => R(64 + k * 22.4, 46, 22.4, 94, '#E53935', 0, 0)).join('') + R(64, 46, 112, 94, 'none', 4, 3) + Lc('M58 46h124', '#8D6E63', 5)
      + P('M24 150c20 30 172 30 192 0l-6-6c-30 20-150 20-180 0z', '#A1673F', 3) + P('M30 146C10 100 4 60 26 50c18-8 28 10 18 20-8 8-18 0-12-6', '#A1673F', 0) + Lc('M34 150C10 100 4 60 26 50c18-8 28 10 18 20-8 8-18 0-12-6', INK, 10) + Lc('M34 150C10 100 4 60 26 50c18-8 28 10 18 20-8 8-18 0-12-6', '#A1673F', 5)
      + Lc('M206 150c24-50 30-90 8-100-18-8-28 10-18 20 8 8 18 0 12-6', INK, 10) + Lc('M206 150c24-50 30-90 8-100-18-8-28 10-18 20 8 8 18 0 12-6', '#A1673F', 5) + Lc('M40 160c40 12 120 12 160 0', '#6D4C41', 2.5) + face(120, 162, 0.35)),
  X('no', 'culture', 'troll', 'โทรลล์จมูกโตในป่านอร์เวย์', 'A big-nosed troll from the Norwegian woods', ['troll', 'โทรลล์', 'norwegian troll', 'โทรลล์นอร์เวย์', 'folk tale', 'นิทานพื้นบ้าน', 'mossy forest', 'ป่ามอส', 'big nose', 'จมูกโต', 'troll figure'],
    // a friendly round troll with a huge potato nose, shaggy hair with a pine sprig, a cow-like tail with a tuft, wearing a patched tunic, standing beside a mossy rock and a red mushroom
    E(120, 214, 84, 10, '#A5D6A7', 0) + P('M30 214c-6-30 10-50 34-48s30 30 26 48z', '#90A4AE', 3) + P('M36 180c10-8 30-10 44 0', 'none', 0) + Lc('M38 182c10-6 30-8 40 0', '#7CB342', 6)
      + P('M196 214c0-10 2-24 2-24h8s2 14 2 24z', '#FFFDE7', 2.5) + P('M182 192c0-18 40-18 40 0z', '#E53935', 3) + C(194, 184, 3, '#FFFFFF', 0) + C(210, 186, 3, '#FFFFFF', 0)
      + P('M146 186c30 0 40-20 34-36', 'none', 0) + Lc('M146 190c30 0 42-20 36-40', INK, 7) + Lc('M146 190c30 0 42-20 36-40', '#8D6E63', 3.5) + P('M176 150c4-12 14-10 14 0-4 4-10 6-14 0z', '#5D4037', 2.5)
      + P('M84 214v-24h22v24zM126 214v-24h22v24z', '#6D4C41', 3) + P('M74 196c-6-60 10-100 42-100s50 40 42 100z', '#7CB342', 3) + R(92, 150, 16, 14, '#FFCA28', 2, 2) + R(126, 170, 14, 12, '#4FC3F7', 2, 2)
      + P('M78 84l-14-14 4 20zM154 84l14-14-4 20z', '#C5E1A5', 3) + C(116, 84, 38, '#C5E1A5', 3) + P('M72 76c-14-20-4-50 18-54-2 8 4 10 8 4 4-10 14-14 24-10-4 6 0 10 8 6 12-2 24 14 22 30 8 6 10 18 6 24-6-10-16-18-26-18-10-8-30-8-40 0-10 0-16 8-20 18z', '#6D4C41', 3) + Lc('M112 24l4-16M112 18l-8-6M116 12l8-4', '#2E7D32', 3)
      + face(116, 80, 0.5, 'none') + P('M104 84c0-12 24-12 24 0 4 16 0 32-12 32s-16-16-12-32z', '#E8A598', 3) + Lc('M100 120q16 6 32 0', INK, 3) + R(108, 120, 6, 6, '#FFFFFF', 1, 2) + R(118, 120, 6, 6, '#FFFFFF', 1, 2)),
  X('no', 'food', 'cloudberries', 'คลาวด์เบอร์รีสีส้มกับครีม', 'Cloudberries with whipped cream', ['cloudberries', 'คลาวด์เบอร์รี', 'multer', 'มุลเตอร์', 'multekrem', 'มุลเตครีม', 'arctic berries', 'เบอร์รีขั้วโลก', 'whipped cream', 'วิปครีม', 'mountain bog'],
    // a glass bowl of golden-orange cloudberries, each a bumpy little cluster of round beads, on a cloud of whipped cream, a cloudberry plant with a crinkly round leaf and one berry with a face
    P('M44 120h132c-6 50-30 76-66 76s-60-26-66-76z', '#E1F5FE', 3) + R(92, 196, 36, 8, '#E1F5FE', 2, 2.5) + P('M50 122c10-20 30-26 44-18 10-14 34-14 44 0 16-6 34 2 36 18z', '#FFFFFF', 3)
      + [[74, 108], [104, 96], [134, 104], [160, 116], [118, 118]].map(([x, y]) => [[0, 0], [-7, -3], [7, -3], [-4, 6], [4, 6], [0, -9]].map(([dx, dy]) => C(x + dx, y + dy, 5.5, '#FFA726', 2)).join('') + C(x, y - 11, 3, '#8D6E63', 0)).join('')
      + g(192, 150, 1, Lc('M0 50c0-20 6-36 10-50', '#558B2F', 4) + P('M10 0c-24-4-34 14-22 26 4-8 14-8 16 2 6-8 18-6 20 2 8-12 6-30-14-30z', '#7CB342', 3) + Lc('M10 2v20', '#33691E', 1.5))
      + g(196, 112, 1, [[0, 0], [-8, -4], [8, -4], [-5, 7], [5, 7], [0, -11]].map(([dx, dy]) => C(dx, dy, 6.5, '#FFB74D', 2)).join('') + face(0, 0, 0.32)) + face(110, 158, 0.4)),

  // ---------- Tromsø
  L('no/tromso/landmark-arcticcathedral.v1.svg', 'โบสถ์อาร์กติกรูปสามเหลี่ยมซ้อน', 'The triangle-stacked Arctic Cathedral', ['arctic cathedral', 'โบสถ์อาร์กติก', 'ishavskatedralen', 'อิสฮาฟสกาเตดราเลน', 'triangle church', 'โบสถ์สามเหลี่ยม', 'tromsdalen', 'ทรอมส์ดาเลน', 'white church', 'glass mosaic window'], 'หาหน้าต่างกระจกสีรูปสามเหลี่ยมใหญ่ด้านหน้า', 'Find the big triangle of coloured glass on the front',
    // a white church built of stacked triangles that get smaller towards the back, a huge triangular window of coloured glass strips on the front, snowy mountains behind and a pale arctic sky
    sky('#E1F5FE') + P('M-4 150L50 70l40 50 40-70 60 80 54-40v100H-4z', '#B0BEC5', 3) + P('M38 88l12-18 12 15zM118 70l12-20 16 21zM180 98l10-8 10 8z', '#FFFFFF', 0) + P('M-4 190h248v54H-4z', '#FFFFFF', 0)
      + [[0, 0], [12, -8], [24, -16], [36, -24]].reverse().map(([d, h]) => P(`M${66 + d} 196L${120 + d * 0.3} ${70 + h}L${174 + d * 0.2} 196z`, d ? '#ECEFF1' : '#FFFFFF', 3)).join('')
      + P('M70 196L120 70l50 126z', '#FFFFFF', 3) + P('M96 196L120 120l24 76z', '#4FC3F7', 3) + Lc('M104 196l8-48M114 196l4-62M126 196l-4-62M136 196l-8-48', '#FFFFFF', 2) + P('M110 172h20l3 10h-26z', '#FFCA28', 0) + P('M101 186h38l3 10h-44z', '#E53935', 0) + P('M115 150h10l3 10h-16z', '#AB47BC', 0)
      + R(100, 196, 40, 6, '#90A4AE', 0, 2) + kid(200, 228, '#E53935') + face(120, 100, 0.28)),
  L('no/tromso/landmark-tromsobridge.v1.svg', 'สะพานทรอมโซสูงโค้งข้ามช่องแคบ', 'The high, humped Tromsø Bridge', ['tromsø bridge', 'สะพานทรอมโซ', 'tromsøbrua', 'ทรอมโซบรูอา', 'cantilever bridge', 'สะพานคานยื่น', 'tromsøysundet', 'ช่องแคบทรอมโซ', 'walk across the bridge', 'เดินข้ามสะพาน'], 'หาเสาสูงผอมๆ ที่ยกสะพานขึ้นกลางน้ำ', 'Find the tall thin legs holding the bridge high above the water',
    // a long concrete bridge climbing in a gentle hump high over a blue sound on tall slim legs, street lamps along it, a tiny bus crossing, snowy mountains behind, a child waving from the shore
    sky('#E3F2FD') + P('M-4 120l40-40 30 26 46-50 50 46 34-30 48 40v40H-4z', '#90A4AE', 3) + P('M24 92l12-12 10 9zM104 66l12-10 14 12zM190 86l10-10 12 10z', '#FFFFFF', 0) + P('M-4 150h248v94H-4z', '#1E88E5', 0)
      + Lc('M-4 174C60 120 180 120 244 174', '#ECEFF1', 12) + Lc('M-4 168C60 114 180 114 244 168M-4 180C60 126 180 126 244 180', INK, 3)
      + [[40, 150], [80, 133], [120, 128], [160, 133], [200, 150]].map(([x, y]) => R(x - 5, y + 6, 10, 240 - y, '#CFD8DC', 0, 3) + Lc(`M${x} ${y - 8}v-14`, '#78909C', 2) + C(x, y - 24, 3, '#FFEB3B', 1.5)).join('')
      + g(96, 126, 1, R(-14, -10, 28, 12, '#FFCA28', 3, 2.5) + R(-10, -7, 6, 5, '#B3E5FC', 1, 1) + R(0, -7, 6, 5, '#B3E5FC', 1, 1), -9) + Lc('M14 214h40M140 224h50', '#90CAF9', 3) + P('M180 244c10-20 40-26 64-24v24z', '#ECEFF1', 2.5) + kid(212, 230, '#FB8C00') + face(120, 208, 0.3)),
  L('no/tromso/landmark-midnightsun.v1.svg', 'พระอาทิตย์เที่ยงคืนที่หาดซอมมาร์เออ', 'The midnight sun on Sommarøy beach', ['midnight sun', 'พระอาทิตย์เที่ยงคืน', 'midnattssol', 'มิดนัตส์โซล', 'sommarøy', 'ซอมมาร์เออ', 'white sand beach', 'หาดทรายขาว', 'summer night', 'คืนที่ไม่มืด', 'pyjamas'], 'หาเด็กใส่ชุดนอนที่ยังเล่นทรายตอนพระอาทิตย์ยังไม่ตก', 'Find the child in pyjamas still playing on the beach while the sun stays up',
    // a white sand beach with turquoise water and little rocky islets, a big sun sitting low but never setting, a clock post with both hands on twelve, a child in striped pyjamas with a bucket and spade
    sky('#FFE0B2') + C(150, 92, 28, '#FFB300', 0) + P('M-4 120h248v60H-4z', '#26C6DA', 0) + Lc('M124 132h52M134 144h32', '#FFF59D', 3) + P('M20 124c6-14 24-20 40-6zM186 122c8-10 22-12 32 0z', '#78909C', 2.5)
      + P('M-4 176c60-10 160-14 248-4v76H-4z', '#FFFDE7', 0) + Lc('M-4 178c60-10 160-14 248-4', '#80DEEA', 4)
      + g(52, 170, 1, Lc('M0 60V0', '#5D4037', 4) + C(0, -12, 16, '#FFFFFF', 3) + Lc('M0-12v-12M0-12v-10', INK, 3) + C(0, -12, 2, INK, 0))
      + g(148, 222, 1.5, C(0, -20, 8, '#FFE0BD', 2) + P('M-9 6v-18h18v18z', '#90CAF9', 2) + Lc('M-8-6h16M-8 0h16', '#FFFFFF', 2) + face(0, -18, 0.22)) + P('M178 222l4-14h16l4 14z', '#E53935', 2.5) + Lc('M184 208c0-8 12-8 12 0', INK, 2) + Lc('M168 230l-6-14', '#FFCA28', 3)),
  L('no/tromso/landmark-stockfish.v1.svg', 'ราวตากปลาค็อดแห้งริมฟยอร์ด', 'Stockfish drying on wooden racks', ['stockfish', 'ปลาค็อดตากแห้ง', 'tørrfisk', 'เทิร์รฟิสก์', 'drying racks', 'ราวตากปลา', 'hjell', 'เยลล์', 'cod', 'ปลาค็อด', 'fishing village'], 'หาปลาที่ห้อยเป็นคู่ๆ บนราวไม้', 'Find the fish hanging in pairs on the wooden racks',
    // tall wooden A-frame racks on a shore with rows of cod hanging in pairs to dry in the wind, a red fisherman's cabin on stilts by the water, snowy mountains behind
    sky('#E3F2FD') + P('M-4 120l50-60 40 40 50-56 60 60 48-30v60H-4z', '#78909C', 3) + P('M36 72l10-12 12 13zM126 54l10-10 13 13z', '#FFFFFF', 0) + P('M-4 150h248v26H-4z', '#1E88E5', 0) + P('M-4 170h248v74H-4z', '#ECEFF1', 0)
      + g(196, 148, 1, R(-22, -20, 44, 30, '#C62828', 0, 3) + P('M-28-20l28-18 28 18z', '#37474F', 3) + R(-6, -10, 12, 12, '#FFF59D', 1, 2) + Lc('M-16 10v20M16 10v20', '#5D4037', 4))
      + [40, 110].map((x) => Lc(`M${x} 230L${x + 20} 120M${x + 60} 230L${x + 40} 120`, '#8D6E63', 6) + Lc(`M${x} 230L${x + 20} 120M${x + 60} 230L${x + 40} 120`, INK, 1.2)).join('') + Lc('M30 126h150M36 170h140', '#A1673F', 6) + Lc('M30 126h150M36 170h140', INK, 1.2)
      + [[48, 126], [72, 126], [96, 126], [120, 126], [144, 126], [168, 126], [56, 170], [84, 170], [112, 170], [140, 170], [164, 170]].map(([x, y]) => [-5, 5].map((d) => P(`M${x + d - 3} ${y + 36}l3-6 3 6z`, '#A1887F', 1.8) + E(x + d, y + 16, 5, 15, '#D7CCC8', 1.8) + C(x + d - 1, y + 24, 1.2, INK, 0)).join('')).join('')
      + face(108, 214, 0.35)),
  L('no/tromso/landmark-planetarium.v1.svg', 'โดมดูดาวของศูนย์วิทยาศาสตร์ทรอมโซ', 'The star dome at Tromsø\'s science centre', ['planetarium', 'ท้องฟ้าจำลอง', 'science centre', 'ศูนย์วิทยาศาสตร์', 'nordnorsk vitensenter', 'นูร์นอร์สก์ วิเตนเซนเตอร์', 'star dome', 'โดมดวงดาว', 'planets', 'ดาวเคราะห์', 'space show'], 'หาดาวเสาร์ที่มีวงแหวนบนเพดานโดม', 'Find Saturn with its ring on the dome ceiling',
    // looking up inside a dark round dome: stars, a ringed planet, a red planet and a shooting star across the ceiling, a row of children leaning back in their seats along the bottom
    sky('#0D1B4A') + P('M-4 244V120C-4 30 244 30 244 120v124z', '#1A237E', 0) + Lc('M8 200C20 70 220 70 232 200', '#283593', 3)
      + Array.from({ length: 24 }, (_, k) => C((k * 47 + 13) % 230 + 5, 40 + ((k * 37) % 120), k % 4 ? 1.5 : 2.6, '#FFFFFF', 0)).join('')
      + g(80, 90, 1, C(0, 0, 20, '#FFCC80', 3) + Lc('M-12-6h24M-14 6h28', '#FFA726', 2.5) + E(0, 0, 36, 9, 'none', 0) + Lc('M-34 4c20 10 48 2 68-8', '#FFE082', 4)) + C(168, 76, 13, '#EF5350', 3) + C(164, 72, 3, '#C62828', 0) + C(140, 130, 8, '#4FC3F7', 2.5)
      + Lc('M190 40l-30 20', '#FFF59D', 3) + C(190, 40, 4, '#FFFFFF', 0)
      + P('M-4 196h248v48H-4z', '#311B92', 0) + [30, 80, 130, 180, 226].map((x, k) => g(x, 214, 1, R(-18, -12, 36, 30, '#5E35B1', 6, 2.5) + C(0, -14, 10, '#FFE0BD', 2) + P('M-10-18c0-10 20-10 20 0', ['#5D4037', '#FFCA28', '#212121', '#8D6E63', '#E65100'][k], 2) + face(0, -14, 0.25, 'o'))).join('')),
  { id: 'no-tromso.day.polarnight', cat: 'day', file: 'no/tromso/day-polarnight.v1.svg', name: nm('กลางวันสีฟ้าครามของคืนขั้วโลก', 'The blue midday of the polar night'), kw: ['polar night', 'คืนขั้วโลก', 'mørketid', 'เมอร์เกติด', 'blue hour', 'แสงสีฟ้า', 'no sunrise', 'ไม่มีพระอาทิตย์', 'headlamp', 'ไฟฉายคาดหัว', 'kick sled street'],
    // at noon in midwinter the sun never rises: a deep blue sky with a pink and gold glow on the mountain rim, wooden houses with glowing windows in the snow, a child with a headlamp pulling a little sledge
    svg: scene('trm-pn', '#283593', P('M-4 150c20-40 50-60 80-40s40-40 70-30 60 30 98 40v40H-4z', '#5C6BC0', 3) + Lc('M-4 152c40-10 90-10 140 0s80-6 108-4', '#F8BBD0', 6) + Lc('M-4 160c40-8 90-8 140 0s80-4 108-2', '#FFE082', 3)
      + Array.from({ length: 10 }, (_, k) => C((k * 53) % 220 + 10, 36 + ((k * 29) % 60), 1.6, '#FFFFFF', 0)).join('')
      + [[40, '#C62828'], [96, '#FFCA28'], [156, '#1E88E5']].map(([x, c]) => R(x - 22, 150, 44, 34, c, 0, 3) + P(`M${x - 28} 150l28-20 28 20z`, '#FFFFFF', 3) + R(x - 12, 160, 10, 10, '#FFEE58', 1, 2) + R(x + 4, 160, 10, 10, '#FFEE58', 1, 2)).join('')
      + P('M-4 182c80-8 160-8 248 0v62H-4z', '#E8EAF6', 0) + Lc('M206 184v-60', '#455A64', 3) + C(206, 122, 6, '#FFF59D', 2) + P('M200 184l6-60 6 60z', '#FFF59D', 0).replace('/>', ' opacity=".25"/>')
      + g(118, 222, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-9-22c0-12 18-12 18 0z', '#E53935', 2) + C(0, -27, 3, '#FFF59D', 1.5) + P('M-8 4v-16h16v16z', '#43A047', 2) + face(0, -18, 0.22)) + Lc('M110 216l-30 6', INK, 2) + R(52, 218, 30, 8, '#A1673F', 2, 2.5)
      + P('M118 194l-60-20v24z', '#FFF59D', 0).replace('/>', ' opacity=".35"/>')) },

  // ---------- Bergen and the fjords
  L('no/bergen/landmark-trolltunga.v1.svg', 'โขดหินลิ้นโทรลล์', 'Trolltunga, the troll\'s tongue rock', ['trolltunga', 'ทรอลล์ทุงกา', 'troll\'s tongue', 'ลิ้นโทรลล์', 'cliff hike', 'เดินป่าหน้าผา', 'ringedalsvatnet', 'ริงเกดัลส์วาทเนต', 'odda', 'rock ledge', 'หินยื่น'], 'หาหินแผ่นยาวที่ยื่นออกไปกลางอากาศเหมือนลิ้น', 'Find the long flat rock sticking out into the air like a tongue',
    // a long thin ledge of grey rock sticking straight out from a cliff high above a winding blue lake far below, a child at the tip with arms up, mountains with snow patches all around
    sky('#BBDEFB') + P('M-4 120l40-30 40 20 50-40 60 40 58-20v60H-4z', '#90A4AE', 3) + P('M30 96l8-6 10 6zM122 76l12-8 14 10z', '#FFFFFF', 0) + P('M-4 150c40-10 80 10 120 0s80 0 128-6v100H-4z', '#7CB342', 3)
      + P('M60 244c10-40 40-60 70-70s60-10 100-20v90z', '#558B2F', 0) + Lc('M80 244c10-30 40-50 70-60s40-10 94-20', '#29B6F6', 12) + Lc('M80 244c10-30 40-50 70-60s40-10 94-20', INK, 1.5)
      + P('M-4 244V100c20-6 50 0 60 10l90 6c4 0 6 6 2 8l-70 8c-12 2-20 10-24 22l-10 90z', '#78909C', 3.5) + Lc('M60 112l84 6', '#B0BEC5', 3) + Lc('M8 150c10 6 20 4 30 0M14 190c8 4 18 4 26 0', '#607D8B', 3)
      + g(132, 112, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#E53935', 2) + Lc('M-8-10l-8-12M8-10l8-12', '#FFE0BD', 3) + face(0, -18, 0.22)) + face(60, 160, 0)),
  L('no/bergen/landmark-laerdaltunnel.v1.svg', 'ถ้ำแสงสีฟ้าในอุโมงค์แลร์ดาล', 'The glowing blue cave in the Lærdal Tunnel', ['lærdal tunnel', 'อุโมงค์แลร์ดาล', 'laerdal tunnel', 'longest road tunnel', 'อุโมงค์ถนนยาวที่สุด', 'blue light cave', 'ถ้ำแสงสีฟ้า', 'road trip', 'ขับรถ', 'aurland'], 'หาแสงสีเหลืองที่เรืองอยู่ตามขอบล่างของถ้ำสีฟ้า', 'Find the yellow glow along the bottom of the blue cave',
    // inside a long rock tunnel a great cave opens up lit in glowing blue with a band of yellow light along its foot, the road curving through it and a little car with its headlights on
    sky('#263238') + P('M-4 244V70C40 0 200 0 244 70v174z', '#37474F', 0) + P('M14 200V96C40 30 200 30 226 96v104z', '#1E88E5', 3) + P('M30 196V110C56 56 184 56 210 110v86z', '#64B5F6', 0) + P('M54 192v-60c20-36 112-36 132 0v60z', '#BBDEFB', 0)
      + Lc('M18 186c60 10 144 10 204 0', '#FFD54F', 10) + Lc('M30 178c60 8 120 8 180 0', '#FFF59D', 4) + Lc('M40 100c20-16 50-26 80-26M150 80c20 6 40 16 52 30', '#0D47A1', 3)
      + P('M70 244l30-50h40l30 50z', '#455A64', 0) + Lc('M120 200v8M120 216v10M120 234v10', '#FFFFFF', 3)
      + g(150, 220, 1, R(-22, -16, 44, 22, '#E53935', 6, 3) + P('M-14-16l6-12h18l6 12z', '#B3E5FC', 2.5) + C(-12, 8, 6, '#263238', 2) + C(12, 8, 6, '#263238', 2) + C(-18, -4, 3, '#FFF59D', 1.5) + C(18, -4, 3, '#FFF59D', 1.5) + face(0, -6, 0.25)) + face(120, 130, 0)),
  L('no/bergen/landmark-bergenhus.v1.svg', 'ห้องโถงฮอกุนกับหอโรเซนแครนซ์', 'Haakon\'s Hall and the Rosenkrantz Tower', ['bergenhus fortress', 'ป้อมแบร์เกนฮุส', 'haakon\'s hall', 'ห้องโถงฮอกุน', 'håkonshallen', 'rosenkrantz tower', 'หอโรเซนแครนซ์', 'stepped gable', 'หน้าจั่วขั้นบันได', 'medieval hall'], 'หาหน้าจั่วที่เป็นขั้นบันไดของห้องโถงหิน', 'Find the stepped gable on the end of the stone hall',
    // a tall grey stone medieval hall with a steep roof and stepped gables at both ends, a row of narrow arched windows, a square tower with a pointed roof beside it, green lawn and the harbour behind
    sky('#E3F2FD') + P('M-4 160h248v20H-4z', '#4FC3F7', 0) + P('M-4 176h248v68H-4z', '#7CB342', 0)
      + g(70, 0, 1, P('M-50 190V100l8-6v-8l8-6v-8l8-6v-8l8-6v-8h8l8 6v8l8 6v8l8 6v8l8 6v8l8 6v90z', '#B0BEC5', 3) + [-30, -10, 10, 30].map((x) => P(`M${x - 5} 160v-22c0-8 10-8 10 0v22z`, '#37474F', 2)).join('') + P('M-8 190v-20c0-10 16-10 16 0v20z', '#6D4C41', 2.5) + Lc('M-50 130h100', '#90A4AE', 2) + face(0, 116, 0.3))
      + P('M120 190v-60h100v60z', '#CFD8DC', 3) + P('M120 130l50-30 50 30z', '#455A64', 3) + Lc('M140 150h60M140 170h60', '#90A4AE', 1.5)
      + g(188, 0, 1, R(-22, 70, 44, 120, '#ECEFF1', 0, 3) + P('M-28 70l28-46 28 46z', '#37474F', 3) + R(-6, 92, 12, 16, '#37474F', 6, 2) + R(-6, 130, 12, 16, '#37474F', 6, 2) + Lc('M0 24v-12', INK, 2) + C(0, 10, 3, '#FFCA28', 1.5))
      + kid(120, 226, '#1E88E5')),
  L('no/bergen/landmark-atlanticroad.v1.svg', 'ถนนแอตแลนติกโค้งข้ามเกาะเล็กเกาะน้อย', 'The Atlantic Road hopping over little islands', ['atlantic road', 'ถนนแอตแลนติก', 'atlanterhavsveien', 'แอตแลนเทอร์ฮาฟสเวเอิน', 'storseisundet bridge', 'สะพานสตอร์เซซุนเดต', 'curving bridge', 'สะพานโค้งบิด', 'road trip', 'ขับรถเลียบทะเล'], 'หาสะพานที่โค้งสูงขึ้นแล้วบิดตัวกลางทะเล', 'Find the bridge that curves up high and twists over the sea',
    // a grey road bridge rising steeply in a twisting curve over a stormy blue sea, low rocky islets linked by the road, waves splashing white, a little yellow car driving up the bridge
    sky('#B0BEC5') + P('M-4 70c30-10 50 4 80-4s60-12 90 0 50 6 78-2v20H-4z', '#ECEFF1', 0) + P('M-4 130h248v114H-4z', '#1565C0', 0)
      + [[30, 170, 40], [200, 160, 46], [120, 222, 34]].map(([x, y, w]) => P(`M${x - w} ${y + 4}c10-14 ${w * 2 - 20}-14 ${w * 2} 0z`, '#8D6E63', 2.5) + P(`M${x - w + 6} ${y}c10-6 ${w * 2 - 30}-6 ${w * 2 - 12} 0`, 'none', 0)).join('')
      + Lc('M-4 172c30-4 40 0 50-2', '#78909C', 10) + Lc('M50 172C80 168 100 80 140 84s50 70 74 76', '#546E7A', 12) + Lc('M50 166C80 162 100 74 140 78s50 70 74 76M50 178C80 174 100 86 140 90s52 70 74 76', INK, 2.5) + `<path d="M50 172C80 168 100 80 140 84s50 70 74 76" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="6 6"/>` + Lc('M214 160c14 2 22 2 30 0', '#78909C', 10)
      + [[96, 128], [118, 96], [162, 104], [186, 140]].map(([x, y]) => Lc(`M${x} ${y + 8}V${y + 70}`, '#90A4AE', 6) + Lc(`M${x} ${y + 8}V${y + 70}`, INK, 1.2)).join('')
      + g(112, 98, 1.5, R(-12, -9, 24, 12, '#FFCA28', 3, 2.5) + R(-6, -14, 12, 6, '#B3E5FC', 1, 1.5) + C(-6, 4, 3.5, INK, 0) + C(6, 4, 3.5, INK, 0), -40)
      + [[70, 190], [150, 200], [220, 186]].map(([x, y]) => P(`M${x - 12} ${y}c4-10 8-14 12-14s8 4 12 14`, '#FFFFFF', 2.5)).join('') + face(140, 110, 0)),
  L('no/bergen/landmark-hardangerorchard.v1.svg', 'สวนแอปเปิลออกดอกริมฟยอร์ดฮาร์ดังเงอร์', 'Apple orchards in blossom by the Hardanger fjord', ['hardanger', 'ฮาร์ดังเงอร์', 'hardangerfjord', 'ฟยอร์ดฮาร์ดังเงอร์', 'apple blossom', 'ดอกแอปเปิล', 'orchard', 'สวนผลไม้', 'apple juice', 'น้ำแอปเปิล', 'fruit farm'], 'หาต้นแอปเปิลที่ดอกสีชมพูบานเต็มต้น', 'Find the apple trees covered in pink and white flowers',
    // rows of little apple trees covered in pink and white blossom on a green slope above a deep blue fjord, steep snow-topped mountains on the far side, a child with a basket of red apples
    sky('#E1F5FE') + P('M-4 110l40-50 40 30 40-50 50 50 40-30 38 30v30H-4z', '#78909C', 3) + P('M28 70l8-10 10 8zM110 50l10-10 12 10zM196 66l8-6 10 8z', '#FFFFFF', 0) + P('M-4 108h248v34H-4z', '#1565C0', 0) + Lc('M20 124h40M140 120h60', '#64B5F6', 3)
      + P('M-4 140c80-10 160 0 248-14v118H-4z', '#8BC34A', 0) + Lc('M-4 186c80-10 160 0 248-14M-4 222c80-10 160 0 248-14', '#7CB342', 4)
      + [[30, 158], [80, 154], [130, 152], [180, 146], [222, 142], [50, 196], [104, 194], [160, 188], [210, 182]].map(([x, y]) => Lc(`M${x} ${y + 14}v-12`, '#6D4C41', 4) + C(x, y - 4, 15, '#F8BBD0', 2.5) + [[-6, -6], [6, -2], [0, 6], [-8, 4], [8, -9]].map(([dx, dy]) => C(x + dx, y - 4 + dy, 2.5, '#FFFFFF', 0)).join('')).join('')
      + kid(132, 236, '#FFCA28') + P('M146 236l2-14h24l2 14z', '#A1673F', 2.5) + [[154, 220], [164, 218]].map(([x, y]) => C(x, y, 5, '#E53935', 2)).join('') + face(104, 196, 0.22)),
  L('no/bergen/landmark-raincity.v1.svg', 'กระโดดแอ่งน้ำในเมืองฝนแบร์เกน', 'Puddle jumping in rainy Bergen', ['rainy bergen', 'เมืองฝนแบร์เกน', 'rain city', 'เมืองที่ฝนตกบ่อย', 'regnbyen', 'เรกน์บีเอิน', 'puddle jumping', 'กระโดดแอ่งน้ำ', 'raincoat', 'เสื้อกันฝน', 'umbrella', 'rain boots'], 'หาเด็กใส่รองเท้าบูตที่กำลังกระโดดลงแอ่งน้ำ', 'Find the child in rain boots jumping into the puddle',
    // a grey rainy sky with slanting rain over white wooden houses on a green hillside, a cobbled street with a big puddle, a child in a yellow raincoat and red boots splashing, a friend under a blue umbrella
    sky('#B0BEC5') + P('M-4 40c20-20 50-20 70 0 20-24 60-24 80 0 20-20 60-20 98 0v-44H-4z', '#ECEFF1', 3) + P('M-4 130c60-60 160-80 248-60v70H-4z', '#689F38', 3)
      + [[40, 112, '#FFFFFF'], [80, 100, '#FFF59D'], [130, 92, '#FFFFFF'], [180, 86, '#FFCDD2'], [214, 84, '#FFFFFF']].map(([x, y, c]) => R(x - 12, y, 24, 18, c, 0, 2.5) + P(`M${x - 15} ${y}l15-11 15 11z`, '#455A64', 2.5) + R(x - 4, y + 6, 8, 7, '#90CAF9', 1, 1.5)).join('')
      + P('M-4 150h248v94H-4z', '#90A4AE', 0) + Array.from({ length: 8 }, (_, k) => Lc(`M${k * 32} 164h20M${16 + k * 32} 184h20`, '#78909C', 2)).join('') + E(104, 220, 56, 14, '#4FC3F7', 3)
      + Array.from({ length: 18 }, (_, k) => Lc(`M${(k * 41) % 240} ${50 + ((k * 23) % 100)}l-6 12`, '#E1F5FE', 2.5)).join('')
      + g(104, 196, 1.3, C(0, -20, 8, '#FFE0BD', 2) + P('M-10-22c0-12 20-12 20 0l2 4h-24z', '#FFCA28', 2) + P('M-10 6l2-18h16l2 18z', '#FFCA28', 2) + R(-9, 6, 7, 8, '#E53935', 1, 1.5) + R(2, 6, 7, 8, '#E53935', 1, 1.5) + face(0, -18, 0.22))
      + [[70, 208], [138, 206], [84, 196], [126, 194]].map(([x, y]) => C(x, y, 3, '#B3E5FC', 1.5)).join('')
      + g(196, 220, 1.1, Lc('M0-6v-34', INK, 2.5) + P('M-26-38c0-24 52-24 52 0-8-6-18-6-26 0-8-6-18-6-26 0z', '#1E88E5', 2.5) + C(0, -16, 8, '#FFE0BD', 2) + P('M-8 8v-14h16v14z', '#E53935', 2) + face(0, -14, 0.22))),
];

export default { places: {}, items };
