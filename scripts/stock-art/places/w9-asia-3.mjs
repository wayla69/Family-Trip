// Wave 9, Asia part 3: Bhutan (the country and Paro, Thimphu and Punakha), Sri Lanka (the country and the hill country) and Sabah in Borneo.
// Temples stand as buildings only, with no face on them; no deities, no prayer flags, no masks, no letters (the stamps in the museum are pictures only).
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (bt/paro/landmark-haa.v1.svg → bt-paro.landmark.haa)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
// a Bhutanese building: whitewashed walls, a red-brown band under a wide two-tier roof (no face: temples stay plain)
const bhutanHouse = (x, y, w, h, wall, roof) => g(x, y, 1, R(-w / 2, -h, w, h, wall, 0, 3.5) + R(-w / 2, -h, w, 10, '#8D3B25', 0, 2.5)
  + P(`M${-w / 2 - 14} ${-h}l14-14h${w}l14 14z`, roof, 3) + P(`M${-w / 4} ${-h - 14}l8-12h${w / 2 - 16}l8 12z`, roof, 3) + R(-8, -h - 34, 16, 8, '#FFC107', 2, 2));

const items = [
  // ---------- Bhutan, the country
  K('bt.food.hoentay', 'โฮนเต เกี๊ยวแป้งบักวีตของหุบเขาฮา', 'Hoentay, buckwheat dumplings from the Haa valley', ['hoentay', 'โฮนเต', 'buckwheat dumplings', 'เกี๊ยวแป้งบักวีต', 'haa valley', 'หุบเขาฮา', 'turnip greens', 'ผักใบเทอร์นิป', 'cheese filling', 'ไส้ชีส', 'new year treat', 'ของกินปีใหม่'],
    // a wooden plate of plump half-moon dumplings in grey-brown buckwheat dough with pinched frilly edges, one cut open to show a bright green filling of greens and cheese, the front one smiling, a little bowl of red chilli paste
    E(120, 160, 104, 46, '#C68B59', 4) + E(120, 154, 92, 36, '#D7A86E', 2)
      + ring(3, (k) => g(70 + k * 50, 132 + (k % 2) * 8, 1, P('M-24 8c0-24 48-24 48 0z', '#A1887F', 3) + Lc('M-20 2l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4', '#8D6E63', 2)))
      + g(118, 172, 1.2, P('M-24 8c0-24 48-24 48 0z', '#BCAAA4', 3) + face(0, 0, 0.26))
      + g(178, 170, 1, P('M-22 6c0-22 44-22 44 0z', '#A1887F', 3) + P('M-16 6c0-14 32-14 32 0z', '#7CB342', 2) + ring(3, (k) => C(-8 + k * 8, 2, 2, '#FFF8E1', 0)))
      + g(196, 90, 1, P('M-18 0h36c0 14-8 20-18 20s-18-6-18-20z', '#FFFFFF', 3) + E(0, 0, 18, 5, '#E53935', 2))),
  K('bt.food.khabzey', 'คับเซ ขนมแป้งทอดบิดเกลียว', 'Khabzey, crunchy twisted fried biscuits', ['khabzey', 'คับเซ', 'fried biscuits', 'ขนมแป้งทอด', 'twisted strips', 'แป้งบิดเกลียว', 'new year snack', 'ขนมปีใหม่', 'with butter tea', 'กินกับชาเนย', 'crunchy', 'กรอบ'],
    // a low round bamboo tray piled with long golden strips of fried dough, each with a slit in the middle and one end pulled through so it twists, a few loose ones in front, the biggest smiling
    E(120, 170, 104, 34, '#D4A055', 4) + ring(5, (k) => Lc(`M${30 + k * 45} 150l-10 40`, '#A1673F', 2))
      + ring(5, (k) => g(56 + k * 32, 140 - (k % 2) * 14, 1, P('M-10-30h20v60h-20z', '#FFB74D', 3) + P('M-3-18h6v36h-6z', '#E65100', 2) + Lc('M-10-30c10 8 10 16 0 24', '#FF9800', 3), -20 + k * 10))
      + g(120, 196, 1, g(0, 0, 1, P('M-34-10h68v20h-68z', '#FFB74D', 3) + P('M-20-3h40v6h-40z', '#E65100', 2), 0) + face(0, -1, 0.26))),
  K('bt.animal.mahseer', 'ปลามาห์เซียร์ทองในแม่น้ำภูฏาน', 'A golden mahseer in a Bhutanese river', ['golden mahseer', 'ปลามาห์เซียร์ทอง', 'tiger of the river', 'เสือแห่งสายน้ำ', 'big shiny scales', 'เกล็ดใหญ่เป็นเงา', 'clear mountain river', 'แม่น้ำภูเขาใส', 'manas river', 'แม่น้ำมานัส', 'protected fish', 'ปลาที่ได้รับการคุ้มครอง'],
    // a big golden fish leaping in an arc out of a rushing turquoise river, large round scales in rows, orange-red fins and tail, two little whiskers, smooth river stones below and splashes
    P('M10 200c40-10 70 10 110 0s70-10 110 0v30H10z', '#4DD0E1', 3.5) + ring(4, (k) => E(40 + k * 50, 214, 18, 9, '#B0BEC5', 2.5))
      + g(120, 120, 1, P('M-80 10c10-40 50-56 90-50 30 6 50 24 56 40-20 20-60 30-100 24-20-2-36-6-46-14z', '#FFC107', 4)
        + P('M66 0l30-24v52z', '#FF7043', 3.5) + P('M-10-38c10-16 26-20 40-14l-10 16z', '#FF7043', 3) + P('M0 26c4 14 16 20 26 18l-8-16z', '#FF7043', 3)
        + ring(8, (k) => P(`M${-30 + (k % 4) * 20} ${-12 + Math.floor(k / 4) * 18}c6 4 6 12 0 16`, 'none', 2)) + Lc('M-76 14l-12 6M-74 18l-10 10', INK, 2) + face(-56, 0, 0.36), -12)
      + ring(4, (k) => C(40 + k * 50, 192 - (k % 2) * 12, 6, '#E0F7FA', 2))),
  // ---------- Paro, Thimphu and Punakha
  L('bt/paro/landmark-library.v1.svg', 'หนังสือเล่มยักษ์ในหอสมุดแห่งชาติที่ทิมพู', 'The giant book in Thimphu’s National Library', ['national library', 'หอสมุดแห่งชาติภูฏาน', 'giant book', 'หนังสือเล่มยักษ์', 'huge picture pages', 'หน้าภาพขนาดใหญ่', 'old wooden shelves', 'ชั้นไม้เก่า', 'painted beams', 'คานไม้ทาสี', 'kawajangsa', 'คาวาจังซา'], 'หาเด็กที่ตัวเล็กกว่าหนังสือ', 'Find the child who is smaller than the book',
    // inside a room with painted red and green beams, a huge book standing open on a wooden stand, its pages showing a picture of snowy mountains, a valley and flowers (no letters), a child beside it looking up, shelves of wrapped old books behind
    sky('#FFF3E0') + R(-4, -4, 248, 30, '#8D3B25', 0, 3) + ring(6, (k) => R(-4 + k * 42, 14, 20, 12, ['#43A047', '#FFC107', '#1E88E5'][k % 3], 0, 2))
      + ring(2, (k) => R(-4 + k * 200, 40, 48, 160, '#A1673F', 0, 3) + ring(4, (j) => R(2 + k * 200, 50 + j * 36, 36, 24, ['#E53935', '#FFCA28', '#26A69A', '#FF7043'][(j + k) % 4], 3, 2)))
      + R(-4, 200, 248, 44, '#C68B59', 0, 0) + Lc('M-4 200h248', INK, 3)
      + P('M74 200l10-30h72l10 30z', '#6D4C41', 3) + P('M54 172l66-14 66 14v-110l-66 14-66-14z', '#FFFDF7', 4) + Lc('M120 76v96', INK, 3)
      + P('M62 140l20-36 14 20 10-14 8 30z', '#90A4AE', 2.5) + P('M78 112l4-8 4 6z', '#FFFFFF', 0) + ring(3, (k) => C(140 + k * 14, 128 - (k % 2) * 10, 6, ['#F48FB1', '#FFEB3B', '#CE93D8'][k], 2)) + Lc('M136 150h40', '#7CB342', 4)
      + kid(206, 232, '#29B6F6', 1)),
  L('bt/paro/landmark-postalmuseum.v1.svg', 'แสตมป์แปลกๆ ในพิพิธภัณฑ์ไปรษณีย์ภูฏาน', 'The funny stamps of the Bhutan Postal Museum', ['postal museum', 'พิพิธภัณฑ์ไปรษณีย์', 'postage stamps', 'แสตมป์', '3d stamps', 'แสตมป์สามมิติ', 'record stamp', 'แสตมป์แผ่นเสียง', 'send a postcard', 'ส่งโปสการ์ด', 'your face on a stamp', 'แสตมป์รูปหน้าตัวเอง'], 'หาแสตมป์กลมที่เป็นแผ่นเสียง', 'Find the round stamp that is a record',
    // a museum wall with big framed stamps with zigzag perforated edges: a round black record stamp, a mountain stamp, a flower stamp and a stamp of a smiling child, a red post box below with a postcard going in
    sky('#FFF8E1') + R(-4, 196, 248, 48, '#C68B59', 0, 0) + Lc('M-4 196h248', INK, 3)
      + C(64, 66, 40, '#212121', 3.5) + C(64, 66, 26, 'none', 0) + Lc('M38 66a26 26 0 0 1 52 0', '#616161', 2) + C(64, 66, 10, '#FFCA28', 2.5)
      + ring(3, (k) => { const x = 140 + (k % 2) * 56, y = 46 + Math.floor(k / 2) * 76; return R(x - 24, y - 30, 48, 60, '#FFFFFF', 0, 3) + ring(6, (j) => C(x - 24, y - 26 + j * 10, 2.5, '#FFF8E1', 0) + C(x + 24, y - 26 + j * 10, 2.5, '#FFF8E1', 0))
        + R(x - 18, y - 24, 36, 46, ['#B3E5FC', '#F8BBD0', '#FFF9C4'][k], 0, 2) + (k === 0 ? P(`M${x - 16} ${y + 18}l14-26 8 12 6-8 6 22z`, '#78909C', 2) : k === 1 ? ring(5, (p) => C(x + Math.cos(p * 1.26) * 8, y + Math.sin(p * 1.26) * 8, 5, '#EC407A', 1.5)) + C(x, y, 4, '#FFEB3B', 1.5) : C(x, y - 2, 12, '#FFE0BD', 2) + face(x, y - 2, 0.28)); })
      + R(30, 140, 50, 70, '#E53935', 8, 3.5) + R(40, 156, 30, 6, '#3E2723', 2, 0) + R(44, 140, 24, 18, '#FFF8E1', 0, 2.5) + face(55, 188, 0.3) + kid(130, 230, '#FFCA28', 0.9)),
  L('bt/paro/landmark-haa.v1.svg', 'วัดขาวกับวัดดำแห่งหุบเขาฮา', 'The white temple and the black temple of Haa', ['haa valley', 'หุบเขาฮา', 'lhakhang karpo', 'ลาคังคาร์โป', 'lhakhang nagpo', 'ลาคังนักโป', 'white temple', 'วัดสีขาว', 'black temple', 'วัดสีดำ', 'three sibling hills', 'เนินเขาสามพี่น้อง'], 'หาวัดสีขาวและวัดสีดำ', 'Find the white temple and the black temple',
    // a wide green valley with three pointed green hills side by side behind, a stream, and two Bhutanese temples standing apart on the grass: one with white walls, one with dark charcoal walls, both with red bands and golden roof tips (buildings only)
    sky('#B3E5FC') + ring(3, (k) => P(`M${10 + k * 76} 130l38-64 38 64z`, ['#66BB6A', '#43A047', '#7CB342'][k], 3)) + R(-4, 128, 248, 116, '#AED581', 0, 0) + Lc('M-4 128h248', INK, 3)
      + Lc('M-4 230c40-10 80 6 124-4s80-20 124-10', '#4FC3F7', 8) + Lc('M-4 230c40-10 80 6 124-4s80-20 124-10', INK, 0)
      + bhutanHouse(66, 200, 70, 56, '#FFFFFF', '#5D4037') + bhutanHouse(178, 196, 64, 52, '#424242', '#5D4037')
      + ring(2, (k) => R(56 + k * 112, 168, 18, 16, '#FFF8E1', 0, 2)) + kid(122, 218, '#E53935', 0.8)),
  L('bt/paro/landmark-tachogchain.v1.svg', 'สะพานโซ่เหล็กข้ามแม่น้ำไปวัดทาโชก', 'The iron chain bridge to Tachog Lhakhang', ['tachog lhakhang', 'วัดทาโชก', 'iron chain bridge', 'สะพานโซ่เหล็ก', 'paro chhu', 'แม่น้ำปาโรชู', 'chain links', 'ห่วงโซ่', 'bridge gate houses', 'ซุ้มประตูหัวสะพาน', 'river crossing', 'เดินข้ามแม่น้ำ'], 'หาห่วงโซ่เหล็กที่ต่อกันเป็นสะพาน', 'Find the iron links joining into a bridge',
    // a fast blue-green river between grassy banks, a little white gate house with a red band and a small roof on each side, between them a footbridge hanging from big dark iron chain links, a wire-mesh floor, a child crossing and holding on
    sky('#E1F5FE') + P('M-4 80l50-40 40 30 50-50 40 40 68-20v60H-4z', '#81C784', 3) + R(-4, 130, 248, 114, '#26C6DA', 0, 0) + Lc('M30 190c20-6 40 6 60 0M140 210c20-6 40 6 60 0', '#E0F7FA', 3)
      + R(-4, 120, 60, 124, '#9CCC65', 0, 3) + R(184, 120, 60, 124, '#9CCC65', 0, 3)
      + ring(2, (k) => g(26 + k * 188, 128, 1, R(-18, -40, 36, 40, '#FFFFFF', 0, 3) + R(-18, -40, 36, 8, '#8D3B25', 0, 2) + P('M-26-40l8-12h36l8 12z', '#5D4037', 3) + R(-8, -24, 16, 24, '#3E2723', 0, 2)))
      + Lc('M44 96c40 40 112 40 152 0', '#B0BEC5', 3) + ring(11, (k) => { const t = k / 10, x = 44 + t * 152, y = 96 + 4 * 30 * t * (1 - t); return E(x, y, 7, 4, 'none', 3); })
      + Lc('M44 112c40 40 112 40 152 0', '#607D8B', 4) + ring(9, (k) => { const t = (k + 1) / 10, x = 44 + t * 152, y = 112 + 4 * 30 * t * (1 - t); return Lc(`M${x.toFixed(1)} ${(y - 16).toFixed(1)}v16`, '#90A4AE', 1.5); })
      + kid(120, 136, '#FF7043', 0.9)),
  L('bt/paro/landmark-kyichu.v1.svg', 'วัดคิชูหลังคาทองที่เก่าแก่ที่สุดของหุบเขา', 'Kyichu Lhakhang and its golden roof, one of the oldest temples', ['kyichu lhakhang', 'วัดคิชู', 'golden roof', 'หลังคาสีทอง', 'oldest temple', 'วัดเก่าแก่ที่สุด', 'whitewashed walls', 'กำแพงขาว', 'stone courtyard', 'ลานหิน', 'rice fields around', 'ทุ่งนารอบวัด'], 'หาหลังคาสีทองที่ส่องประกาย', 'Find the shining golden roof',
    // a small whitewashed temple with a deep red band under its eaves, a square tower in the middle topped by a stacked golden roof that shines, a stone courtyard wall, rice fields and blue hills around, two children at the gate (the building only)
    sky('#E3F2FD') + P('M-4 100l60-30 60 20 60-30 68 30v20H-4z', '#7986CB', 3) + R(-4, 110, 248, 134, '#C5E1A5', 0, 0) + ring(4, (k) => Lc(`M-4 ${200 + k * 12}h248`, '#9CCC65', 2))
      + R(30, 160, 180, 40, '#ECEFF1', 0, 3.5) + R(110, 176, 20, 24, '#6D4C41', 0, 2.5)
      + R(56, 110, 128, 50, '#FFFFFF', 0, 3.5) + R(56, 110, 128, 12, '#8D3B25', 0, 2.5) + P('M40 112l16-16h128l16 16z', '#5D4037', 3)
      + R(98, 66, 44, 32, '#FFFFFF', 0, 3) + R(98, 66, 44, 8, '#8D3B25', 0, 2) + P('M88 68l10-12h44l10 12z', '#FFC107', 3) + P('M100 56l8-10h24l8 10z', '#FFC107', 3) + P('M112 46l8-14 8 14z', '#FFC107', 3)
      + ring(3, (k) => P(`M${126 + k * 4} ${40 + k * 10}l2-6 2 6 6 2-6 2-2 6-2-6-6-2z`, '#FFFFFF', 1.2))
      + kid(96, 220, '#29B6F6', 0.8) + kid(144, 220, '#FFCA28', 0.8)),
  L('bt/paro/landmark-parotown.v1.svg', 'หน้าร้านไม้ทาสีลายเมฆบนถนนสายหลักของเมือง', 'The painted wooden shopfronts on the main street', ['main street', 'ถนนสายหลัก', 'painted shopfronts', 'หน้าร้านทาสี', 'wooden windows', 'หน้าต่างไม้', 'cloud patterns', 'ลายเมฆ', 'handicraft shops', 'ร้านงานฝีมือ', 'town stroll', 'เดินเล่นในเมือง'], 'หาลายเมฆสีฟ้าบนกรอบหน้าต่าง', 'Find the blue cloud pattern on a window frame',
    // a row of two-storey white houses with wooden upper floors, the window frames painted with blue clouds, orange flowers and green swirls, sloping roofs with gaps under them, shop counters below with colourful bowls and folded cloth, children walking past
    sky('#B3E5FC') + R(-4, 200, 248, 44, '#BCAAA4', 0, 0) + Lc('M-4 200h248', INK, 3)
      + ring(2, (k) => { const x = 10 + k * 116; return R(x, 80, 104, 120, '#FFFFFF', 0, 3.5) + P(`M${x - 10} 82l12-24h${104}l12 24z`, '#90A4AE', 3) + R(x, 80, 104, 40, '#A1673F', 0, 3)
        + ring(2, (j) => R(x + 10 + j * 50, 88, 34, 24, '#FFF3E0', 0, 2.5) + P(`M${x + 12 + j * 50} 112c4-6 10-6 14 0 4-6 10-6 14 0`, 'none', 0) + Lc(`M${x + 12 + j * 50} 110c4-6 10-6 14 0s10-6 14 0`, '#1E88E5', 2.5) + C(x + 27 + j * 50, 94, 3, '#FF7043', 1.5))
        + R(x + 8, 140, 88, 46, '#4E342E', 0, 3) + R(x + 8, 172, 88, 14, '#8D6E63', 0, 2.5) + ring(3, (j) => P(`M${x + 18 + j * 26} 172c0-10 16-10 16 0z`, ['#FFC107', '#EF5350', '#26A69A'][j], 2)); })
      + Lc('M10 128c10-6 14 6 24 0s14 6 24 0M126 128c10-6 14 6 24 0s14 6 24 0', '#43A047', 2.5) + kid(70, 230, '#E53935', 0.8) + kid(170, 230, '#FFCA28', 0.8)),

  // ---------- Sri Lanka, the country
  K('lk.food.lamprais', 'ลัมไพรส์ ข้าวกับแกงห่อใบตองอบ', 'Lamprais, rice and curries baked in a banana leaf', ['lamprais', 'ลัมไพรส์', 'banana leaf parcel', 'ห่อใบตอง', 'baked rice', 'ข้าวอบ', 'frikkadel meatballs', 'ลูกชิ้นฟริกคาเดล', 'burgher dish', 'อาหารชาวเบอร์เกอร์', 'sunday lunch', 'มื้อกลางวันวันอาทิตย์'],
    // a banana-leaf parcel unfolded on the table, inside a mound of golden rice, a dark curry, half a boiled egg that smiles, two round meatballs, a purple aubergine pickle and red chilli sambol, the leaf corners curling up
    P('M10 130l50-70 120 0 50 70-50 70H60z', '#7CB342', 4) + Lc('M30 130h180', '#558B2F', 2) + P('M40 130l30-50h100l30 50-30 50H70z', '#9CCC65', 2.5)
      + P('M70 130c0-30 30-40 50-40s50 10 50 40c-30 14-70 14-100 0z', '#FFE082', 3) + ring(10, (k) => Lc(`M${84 + (k % 5) * 14} ${110 + Math.floor(k / 5) * 12}l5-2`, '#FFCA28', 2))
      + E(84, 156, 20, 12, '#8D4E2A', 3) + ring(2, (k) => C(148 + k * 20, 158, 10, '#795548', 3)) + E(110, 172, 14, 8, '#7B1FA2', 2.5) + E(160, 104, 14, 9, '#E53935', 2.5)
      + g(120, 128, 1, E(0, 0, 16, 12, '#FFFFFF', 3) + C(0, 0, 7, '#FFCA28', 0) + face(0, -2, 0.2))),
  K('lk.food.kokis', 'โกกิส ขนมดอกไม้กรอบทอดจากพิมพ์เหล็ก', 'Kokis, crisp flower cookies fried on an iron mould', ['kokis', 'โกกิส', 'new year sweets', 'ขนมวันปีใหม่', 'avurudu table', 'สำรับอวูรูดู', 'iron mould', 'พิมพ์เหล็ก', 'crisp rice flour', 'แป้งข้าวกรอบ', 'coconut milk batter', 'แป้งผสมกะทิ'],
    // three golden lacy cookies shaped like flower wheels with cut-out petals on a plate, the middle one smiling, and the iron flower mould on its long handle dipped in a bowl of batter
    E(110, 180, 100, 30, '#FFFFFF', 4)
      + ring(3, (k) => g(56 + k * 54, 154 - (k === 1 ? 14 : 0), k === 1 ? 1.15 : 0.95, C(0, 0, 26, '#FFB74D', 3) + ring(6, (p) => E(Math.cos(p * 1.047) * 15, Math.sin(p * 1.047) * 15, 6, 4, '#FFF8E1', 2)) + C(0, 0, 6, '#FFF8E1', 2) + (k === 1 ? face(0, 0, 0.22, 'none') : '')))
      + g(190, 96, 1, P('M-24 0h48c0 20-10 30-24 30s-24-10-24-30z', '#ECEFF1', 3.5) + E(0, 0, 24, 7, '#FFF3E0', 3) + Lc('M-6 -4l-30-70', '#616161', 4) + g(-4, 0, 1, C(0, 0, 10, '#9E9E9E', 2.5) + ring(5, (p) => C(Math.cos(p * 1.26) * 6, Math.sin(p * 1.26) * 6, 2, '#FFF3E0', 0))))),
  K('lk.animal.frogmouth', 'นกปากกบศรีลังกาที่แกล้งทำเป็นกิ่งไม้', 'The Sri Lanka frogmouth that pretends to be a branch', ['sri lanka frogmouth', 'นกปากกบศรีลังกา', 'frogmouth', 'นกปากกบ', 'camouflage', 'พรางตัว', 'wide flat beak', 'ปากกว้างแบน', 'night bird', 'นกกลางคืน', 'sinharaja forest', 'ป่าสิงหราชา'],
    // a fluffy rust-brown bird sitting on a branch, mottled like bark, with a very wide flat beak, big round yellow eyes, little feather tufts over the beak, wings speckled with white dots, a smiling look
    Lc('M10 196c60-10 160-6 220 4', '#6D4C41', 12) + Lc('M10 196c60-10 160-6 220 4', INK, 0) + Lc('M160 196l30-30', '#6D4C41', 6)
      + P('M70 190c-14-40-10-100 50-110 60 10 64 70 50 110z', '#A0522D', 4) + ring(8, (k) => C(84 + (k % 4) * 20, 140 + Math.floor(k / 4) * 20, 3, '#FFF3E0', 0)) + Lc('M90 180l-6 14M140 180l6 14', INK, 3)
      + C(96, 108, 14, '#FFEB3B', 3) + C(144, 108, 14, '#FFEB3B', 3) + C(96, 108, 6, INK, 0) + C(144, 108, 6, INK, 0)
      + P('M86 124c10 10 58 10 68 0-8 14-60 14-68 0z', '#D7A86E', 3) + Lc('M110 120l-10-14M130 120l10-14', '#FFF3E0', 2.5) + E(80, 126, 7, 4, '#FF8FA3', 0) + E(160, 126, 7, 4, '#FF8FA3', 0)),
  K('lk.culture.kanamutti', 'กานามุตตี เกมปิดตาตีหม้อดินในวันปีใหม่', 'Kana mutti, the blindfold pot-breaking game of the new year', ['kana mutti', 'กานามุตตี', 'pot breaking', 'ตีหม้อดิน', 'blindfold game', 'เกมปิดตา', 'new year games', 'เกมวันปีใหม่ศรีลังกา', 'clay pots', 'หม้อดินเผา', 'long stick', 'ไม้ยาว'],
    // a rope strung between two posts with three round clay pots hanging from it, a blindfolded child below swinging a long stick, one pot cracked with water drops falling out, the other pots smiling
    Lc('M20 210h200', '#7CB342', 4) + Lc('M24 210V40M216 210V40', '#8D6E63', 7) + Lc('M24 50c60 20 132 20 192 0', INK, 2.5)
      + ring(3, (k) => { const x = 66 + k * 54, y = 74 + (k === 1 ? 6 : 0); return Lc(`M${x} ${y - 16}v-10`, INK, 2) + P(`M${x - 18} ${y}c0-14 36-14 36 0 4 18-6 28-18 28s-22-10-18-28z`, '#D2691E', 3) + E(x, y - 4, 10, 4, '#A0522D', 2) + (k === 2 ? Lc(`M${x - 4} ${y + 4}l6 8-4 8`, INK, 2) + ring(3, (j) => E(x - 6 + j * 6, y + 40 + j * 8, 2.5, 4, '#4FC3F7', 0)) : face(x, y + 10, 0.24)); })
      + g(110, 196, 1.3, C(0, -20, 8, '#FFE0BD', 2) + R(-9, -24, 18, 6, '#E53935', 2, 1.5) + P('M-8 4v-16h16v16z', '#FFCA28', 2) + P('M-4-14q4 4 8 0', 'none', 1.5))
      + Lc('M120 182l50-72', '#8D6E63', 5)),

  // ---------- Kandy, Ella and Sigiriya
  L('lk/hills/landmark-knuckles.v1.svg', 'เทือกเขานัคเคิลส์ยอดเรียงเหมือนข้อนิ้วในสายหมอก', 'The Knuckles range, peaks like knuckles in the mist', ['knuckles range', 'เทือกเขานัคเคิลส์', 'dumbara hills', 'เขาดุมบารา', 'misty peaks', 'ยอดเขาในสายหมอก', 'cloud forest hike', 'เดินป่าในป่าเมฆ', 'meemure village', 'หมู่บ้านมีมูเร', 'fist-shaped mountains', 'ภูเขารูปกำปั้น'], 'หายอดเขาห้ายอดที่เรียงเหมือนนิ้วมือ', 'Find the five peaks lined up like knuckles',
    // a soft green sky, a mountain ridge with five rounded bumps in a row like the knuckles of a fist, bands of white mist across it, a trail winding through grassland in front with a child hiker and a little stream
    sky('#E8F5E9') + P('M-4 150c10-50 30-60 44-40 8-50 30-60 44-30 10-50 34-56 44-24 10-46 36-50 44-20 12-46 40-40 48 0l20 64H-4z', '#558B2F', 3.5)
      + ring(5, (k) => P(`M${18 + k * 44} ${100 - (k === 2 ? 10 : 0)}c6-8 14-8 20 0`, 'none', 2.5))
      + ring(2, (k) => g(60 + k * 100, 130 + k * 10, 1, E(0, 0, 50, 10, '#FFFFFF', 2.5) + E(20, -6, 26, 8, '#FFFFFF', 0)))
      + R(-4, 170, 248, 74, '#AED581', 0, 0) + Lc('M-4 170h248', INK, 3) + Lc('M120 244c-10-30 30-40 10-74', '#D7B98E', 10) + Lc('M120 244c-10-30 30-40 10-74', INK, 0)
      + Lc('M200 244c-20-20 10-40-10-74', '#4FC3F7', 5) + kid(116, 212, '#FF7043', 1)),
  L('lk/hills/landmark-embekke.v1.svg', 'เสาไม้แกะสลักที่ศาลาเอ็มเบ็กเก', 'The carved wooden pillars of Embekke', ['embekke', 'เอ็มเบ็กเก', 'wood carvings', 'งานแกะสลักไม้', 'carved pillars', 'เสาไม้แกะลาย', 'swans and flowers', 'หงส์และดอกไม้', 'kandyan craft', 'งานช่างแคนดี้', 'drummers hall', 'ศาลากลองเก่า'], 'หาหงส์ที่แกะอยู่บนเสาไม้', 'Find the swan carved on a pillar',
    // an open hall with a tiled roof held up by a row of dark wooden pillars, each pillar with square carved panels: a swan, a flower, a knot and a horse, a stone floor and children looking (the hall only)
    sky('#FFF8E1') + P('M-4 70l40-50h168l40 50z', '#BF6F4A', 3.5) + ring(6, (k) => Lc(`M${40 + k * 32} 24l-8 44`, '#A0522D', 2)) + R(-4, 70, 248, 12, '#5D4037', 0, 3)
      + R(-4, 200, 248, 44, '#BCAAA4', 0, 0) + Lc('M-4 200h248', INK, 3)
      + ring(4, (k) => { const x = 30 + k * 60; return R(x - 14, 82, 28, 118, '#6D4C41', 0, 3.5) + R(x - 10, 100, 20, 22, '#8D6E63', 0, 2) + R(x - 10, 150, 20, 22, '#8D6E63', 0, 2)
        + (k % 2 ? P(`M${x - 6} ${118}c0-8 10-8 10-14 0-4-4-4-4 0`, 'none', 2) + C(x, 160, 6, 'none', 2) + Lc(`M${x - 6} 160h12M${x} 154v12`, INK, 1.5) : ring(4, (p) => C(x + Math.cos(p * 1.57) * 5, 111 + Math.sin(p * 1.57) * 5, 3, 'none', 1.5)) + P(`M${x - 6} 166l4-10 8 2 0 8z`, 'none', 1.5)); })
      + kid(90, 230, '#29B6F6', 0.8) + kid(150, 230, '#EF5350', 0.8)),
  L('lk/hills/landmark-sigiriyagardens.v1.svg', 'สวนน้ำโบราณใต้ผาสิงโตสิกิริยา', 'The ancient water gardens below Sigiriya', ['sigiriya water gardens', 'สวนน้ำโบราณสิกิริยา', 'ancient fountains', 'น้ำพุโบราณ', 'symmetrical pools', 'สระน้ำสมมาตร', 'boulder garden', 'สวนหินก้อนใหญ่', 'moat', 'คูเมือง', 'royal pleasure garden', 'สวนหลวงโบราณ'], 'หาน้ำพุเล็กๆ ที่พุ่งขึ้นจากพื้น', 'Find the little fountains bubbling up from the ground',
    // the great flat-topped rock far behind in the haze, in front long rectangular pools edged with low stone walls set out in a mirror pattern, a straight path between them, little round fountains spurting up, frangipani trees and children on the path
    sky('#FFF3E0') + P('M90 110c0-50 6-70 30-74s30 24 30 74z', '#A1887F', 3) + Lc('M96 60c10-4 30-4 48 0', '#8D6E63', 2) + R(-4, 108, 248, 136, '#C5E1A5', 0, 0) + Lc('M-4 108h248', INK, 3)
      + P('M110 244l4-136h12l4 136z', '#E0C9A6', 2.5)
      + ring(2, (k) => R(k ? 140 : 20, 132, 80, 30, '#4FC3F7', 0, 3.5) + R(k ? 140 : 20, 182, 80, 34, '#4FC3F7', 0, 3.5))
      + ring(4, (k) => { const x = k < 2 ? 40 + k * 40 : 160 + (k - 2) * 40; return C(x, 199, 6, '#90A4AE', 2) + Lc(`M${x} 194c-4-8 4-14 0-22`, '#E1F5FE', 3); })
      + ring(2, (k) => g(k ? 214 : 26, 120, 1, Lc('M0 0v-16', '#6D4C41', 4) + ring(5, (p) => C(Math.cos(p * 1.26) * 10, -22 + Math.sin(p * 1.26) * 6, 5, '#FFFFFF', 1.5)) + C(0, -22, 3, '#FFCA28', 0)))
      + kid(120, 176, '#FFCA28', 0.8)),
  L('lk/hills/landmark-vegetablefarms.v1.svg', 'แปลงแครอทกับต้นกระเทียมบนเนินเขาเมืองหนาว', 'The carrot and leek terraces of the cool hills', ['vegetable terraces', 'แปลงผักขั้นบันได', 'carrots', 'แครอท', 'leeks', 'ต้นกระเทียม', 'cabbages', 'กะหล่ำปลี', 'cool hill farms', 'ไร่บนเขาเย็น', 'up-country vegetables', 'ผักเมืองหนาว'], 'หาแครอทที่ถูกดึงขึ้นมาจากดิน', 'Find the carrot pulled up out of the soil',
    // curving terraces of dark soil on a cool green hillside, neat rows of feathery carrot tops, tall leeks and round cabbages, a misty hill behind, and in front a big orange carrot just pulled up with its green top and a smiling face
    sky('#E0F2F1') + P('M-4 90c40-30 100-40 140-20s80 10 108 0v40H-4z', '#A5D6A7', 2.5)
      + ring(4, (k) => P(`M-4 ${100 + k * 30}c80 ${-10 + k * 2} 160 ${10 - k * 2} 248 0v30c-88 10-168-10-248 0z`, k % 2 ? '#6D4C41' : '#5D4037', 3))
      + ring(9, (k) => Lc(`M${10 + k * 26} 104c0-10 6-14 4-20M${14 + k * 26} 104c2-8 8-10 10-14`, '#7CB342', 2.5))
      + ring(8, (k) => Lc(`M${20 + k * 28} 156v-26`, '#C5E1A5', 6) + Lc(`M${20 + k * 28} 134l-6-12M${20 + k * 28} 134l6-12`, '#558B2F', 3))
      + ring(5, (k) => C(30 + k * 46, 190, 12, '#AED581', 2.5) + C(30 + k * 46, 190, 6, '#DCEDC8', 1.5))
      + g(170, 214, 1.1, P('M-16-14c0-6 32-6 32 0l-12 44c-2 6-6 6-8 0z', '#FF9800', 3) + Lc('M-8-4h8M2 6h8M-4 16h6', '#E65100', 2) + Lc('M0-14c-6-14-14-20-18-22M0-14c0-14 4-22 2-30M0-14c6-12 14-16 20-18', '#43A047', 4) + face(0, -2, 0.24))),

  // ---------- Sabah, Borneo
  L('my/borneo/landmark-gongvillage.v1.svg', 'หมู่บ้านทำฆ้องซูมังกัปที่กูดัต', 'The gong-making village of Sumangkap', ['gong village', 'หมู่บ้านทำฆ้อง', 'sumangkap', 'ซูมังกัป', 'kudat', 'กูดัต', 'brass gongs', 'ฆ้องทองเหลือง', 'giant gong', 'ฆ้องยักษ์', 'hammering metal', 'ตีขึ้นรูปโลหะ'], 'หาฆ้องยักษ์ที่ใหญ่กว่าเด็ก', 'Find the giant gong bigger than the child',
    // a village workshop under a thatched roof, a huge round brass gong with a raised knob hanging from a wooden frame and smiling, a row of smaller gongs on a rack, a child hitting the big one with a padded stick, sound rings spreading
    sky('#FFF8E1') + P('M-4 40l60-36h128l60 36z', '#D7B98E', 3.5) + ring(8, (k) => Lc(`M${8 + k * 30} 38l6-28`, '#A1887F', 2)) + R(-4, 200, 248, 44, '#C68B59', 0, 0) + Lc('M-4 200h248', INK, 3)
      + Lc('M30 200V60h120v140', '#6D4C41', 7) + Lc('M30 60h120', INK, 0) + Lc('M90 60v14', INK, 2.5)
      + C(90, 132, 56, '#FFC107', 4) + C(90, 132, 44, 'none', 2) + C(90, 132, 14, '#FFB300', 3) + face(90, 104, 0.4)
      + ring(3, (k) => C(186 + (k % 2) * 30, 80 + k * 42, 16, '#FFCA28', 3) + C(186 + (k % 2) * 30, 80 + k * 42, 5, '#FFB300', 2))
      + Lc('M162 160c10 10 10 30 0 40M176 150c16 16 16 46 0 62', '#FF8F00', 3) + kid(160, 230, '#29B6F6', 1) + Lc('M152 216l-26-40', '#8D6E63', 4) + C(124, 172, 7, '#E53935', 2.5)),
  L('my/borneo/landmark-nightwalk.v1.svg', 'เดินป่ากลางคืนส่องหาแมลงกิ่งไม้ยักษ์', 'A night jungle walk to find a giant stick insect', ['night walk', 'เดินป่ากลางคืน', 'stick insect', 'แมลงกิ่งไม้', 'torch light', 'ไฟฉาย', 'rainforest at night', 'ป่าฝนยามค่ำ', 'danum valley', 'หุบเขาดานุม', 'glowing mushrooms', 'เห็ดเรืองแสง'], 'หาแมลงที่หน้าตาเหมือนกิ่งไม้', 'Find the insect that looks like a twig',
    // a dark blue-green rainforest at night with big leaves and stars between them, a child with a headlamp shining a yellow beam onto a branch where a long thin green stick insect with spindly legs sits, tiny glowing green mushrooms on a log
    sky('#0D3B36') + ring(5, (k) => C(20 + k * 50, 20 + (k % 2) * 12, 2, '#FFF59D', 0)) + ring(5, (k) => P(`M${-10 + k * 56} 140c-10-40 10-80 30-90 10 30 0 70-30 90z`, '#1B5E20', 2.5))
      + P('M52 200l140-96v40z', '#FFF59D', 0) + Lc('M100 106l140-10', '#5D4037', 7)
      + g(160, 92, 1.5, Lc('M-34 0h68', '#CDDC39', 7) + Lc('M-34 0h68', INK, 0) + Lc('M-20 0l-8 14M-6 0l-4 16M10 0l4 16M24 0l8 14M-20 0l-10-12M24 0l10-12', '#AFB42B', 3) + Lc('M34 0l14-10M34 0l16-2', '#AFB42B', 2) + face(28, -4, 0.14, 'none'))
      + R(-4, 210, 248, 34, '#3E2723', 0, 0) + R(110, 200, 100, 14, '#6D4C41', 6, 3) + ring(3, (k) => P(`M${130 + k * 26} 200c0-10 14-10 14 0z`, '#B2FF59', 2))
      + g(46, 214, 1.2, C(0, -20, 8, '#FFE0BD', 2) + R(-8, -28, 16, 4, '#424242', 0, 1.5) + C(6, -27, 3, '#FFEB3B', 1.5) + P('M-8 4v-16h16v16z', '#FF7043', 2) + face(0, -18, 0.22))),
  L('my/borneo/landmark-tagal.v1.svg', 'ปลาตอดเท้าในแม่น้ำระบบตากัล', 'The tagal river where fish nibble your feet', ['tagal river', 'แม่น้ำตากัล', 'fish nibbling feet', 'ปลาตอดเท้า', 'kampung luanti', 'กัมปงลูอันตี', 'river fish', 'ปลาแม่น้ำ', 'ikan pelian', 'ปลาเปเลียน', 'ranau', 'รานาว'], 'หาปลาที่มาตอดนิ้วเท้า', 'Find the fish nibbling the toes',
    // a clear jungle river over round stones, two children sitting on a big flat rock dangling their feet in the water, a crowd of grey-green fish swirling round their toes, ripples and giggles, trees on the far bank
    sky('#C8E6C9') + ring(5, (k) => C(10 + k * 56, 60, 30, '#43A047', 2.5)) + R(-4, 90, 248, 154, '#4DD0E1', 0, 0) + Lc('M-4 90h248', INK, 3)
      + ring(6, (k) => E(20 + k * 44, 226 - (k % 2) * 10, 16, 8, '#B0BEC5', 2)) + P('M40 130c0-20 160-20 160 0v14H40z', '#9E9E9E', 3.5)
      + kid(90, 130, '#FFCA28', 1) + kid(150, 130, '#EF5350', 1) + Lc('M86 140v26M96 140v24M146 140v26M156 140v24', '#FFE0BD', 5)
      + ring(10, (k) => g(70 + (k % 5) * 26, 172 + Math.floor(k / 5) * 18, 1, E(0, 0, 9, 4, '#78909C', 2) + P('M8 0l6-4v8z', '#78909C', 1.5) + C(-5, -1, 1.2, INK, 0), (k % 3) * 30 - 30))
      + Lc('M70 166c10-4 20 4 30 0M140 166c10-4 20 4 30 0', '#E0F7FA', 2.5)),
  L('my/borneo/landmark-lansaran.v1.svg', 'ลันซารัน พื้นไม้กระเด้งของชาวมูรุต', 'The lansaran, the bouncy dance floor of the Murut', ['lansaran', 'ลันซารัน', 'murut', 'ชาวมูรุต', 'bouncy floor', 'พื้นไม้กระเด้ง', 'springy poles', 'ไม้ยืดหยุ่น', 'jump for the prize', 'กระโดดคว้ารางวัล', 'tenom', 'เตนม'], 'หาถุงรางวัลที่แขวนจากหลังคา', 'Find the prize hanging from the roof',
    // inside a longhouse hall, a raised wooden floor resting on bent springy poles, two children jumping high on it with motion lines, a little cloth bag of sweets hanging from a roof beam just above their reach
    sky('#FFF3E0') + P('M-4 40l124-44 124 44z', '#D7B98E', 3.5) + R(-4, 38, 248, 10, '#8D6E63', 0, 3) + Lc('M120 48v34', INK, 2)
      + g(120, 92, 1, P('M-12-8c0-6 24-6 24 0l4 18c0 8-32 8-32 0z', '#E53935', 3) + Lc('M-8-8l-4-6M8-8l4-6', INK, 2) + face(0, 4, 0.18))
      + R(-4, 210, 248, 34, '#A1887F', 0, 0) + ring(5, (k) => Lc(`M${20 + k * 50} 210c10-14 20-14 30 0`, '#6D4C41', 4))
      + R(10, 176, 220, 16, '#C68B59', 0, 3.5) + ring(10, (k) => Lc(`M${18 + k * 22} 176v16`, '#A1673F', 1.5)) + Lc('M10 192c40 14 180 14 220 0', '#8D6E63', 4)
      + kid(90, 136, '#29B6F6', 1.1) + kid(150, 128, '#FFCA28', 1.1) + Lc('M84 160v12M96 160v12M144 152v12M156 152v12', '#FFE0BD', 4)
      + Lc('M70 150v20M110 150v20M130 140v20M170 140v20', '#BDBDBD', 2)),
  L('my/borneo/landmark-siung.v1.svg', 'หมวกซีอุงสานลายของชาวกาดาซันดูซุน', 'The siung, the patterned woven hat of the Kadazan Dusun', ['siung hat', 'หมวกซีอุง', 'kadazan dusun', 'ชาวกาดาซันดูซุน', 'woven bamboo hat', 'หมวกไม้ไผ่สาน', 'geometric patterns', 'ลายเรขาคณิต', 'rattan craft', 'งานหวาย', 'cultural village', 'หมู่บ้านวัฒนธรรม'], 'หาลายสามเหลี่ยมสีแดงบนหมวก', 'Find the red triangles on the hat',
    // a smiling child wearing a big pointed woven hat with a little knob on top, its brim patterned in rings of red, black and yellow triangles, and beside it a weaver's half-made hat on a stand with loose strips of bamboo
    sky('#FFF8E1') + R(-4, 200, 248, 44, '#C68B59', 0, 0) + Lc('M-4 200h248', INK, 3)
      + P('M64 236v-40c0-14 10-22 36-22s36 8 36 22v40z', '#212121', 3.5) + Lc('M70 200h60', '#FFC107', 4) + C(100, 150, 26, '#FFE0BD', 3.5) + face(100, 154, 0.44)
      + P('M24 132l76-80 76 80c-40 14-112 14-152 0z', '#F5DEB3', 4) + C(100, 52, 6, '#8D6E63', 2.5)
      + ring(8, (k) => P(`M${40 + k * 16} 128l8-14 8 14z`, k % 2 ? '#212121' : '#E53935', 1.5)) + ring(5, (k) => P(`M${62 + k * 16} 106l8-12 8 12z`, k % 2 ? '#FFC107' : '#E53935', 1.5)) + ring(3, (k) => P(`M${78 + k * 16} 86l8-10 8 10z`, '#212121', 1.5))
      + g(196, 170, 1, Lc('M0 30v-30', '#6D4C41', 5) + P('M-30 0l30-36 30 36c-20 6-40 6-60 0z', '#FFF3E0', 3) + ring(3, (k) => Lc(`M${-14 + k * 14} -20l-6 22`, '#D7B98E', 2)) + Lc('M30 0l14 16M26 4l10 20', '#D7B98E', 3))),
];

export default { places: {}, items };
