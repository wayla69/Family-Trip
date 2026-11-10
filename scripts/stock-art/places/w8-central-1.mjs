// Wave 8 (central Europe, part 1): Germany, Munich, around Neuschwanstein, Austria, Vienna, Hallstatt and the Salzkammergut
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SCOPE = { 'de-neuschwanstein': 'p-neuschwanstein' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); const s = `${cc}-${city}`; return `${SCOPE[s] || s}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const F = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const wins = (x, y, n, dx, w, h, fill = '#B3E5FC') => Array.from({ length: n }, (_, k) => R(x + k * dx, y, w, h, fill, 1, 1.5)).join('');
const fir = (x, y, s = 1, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', c, 2) + R(-3, 0, 6, 6, '#6D4C41', 0, 1.5));
const tree = (x, y, s = 1, c = '#43A047') => g(x, y, s, C(0, -16, 16, c, 2.5) + R(-3, 0, 6, 10, '#6D4C41', 0, 2));

const items = [
  // ---------- Germany
  F('de', 'culture', 'schultuete', 'ชูลทือเทอ กรวยของขวัญวันแรกที่โรงเรียน', 'The Schultüte, the first-day-of-school cone', ['schultüte', 'schultuete', 'ชูลทือเทอ', 'school cone', 'กรวยวันเปิดเรียน', 'first day of school', 'วันแรกที่โรงเรียน', 'einschulung', 'sweets cone', 'กรวยขนม'],
    // a child with a satchel on their back hugging a tall paper cone almost as big as them, striped and starry, tied at the top with a ribbon and tissue paper, sweets peeking out
    P('M120 40l-48 168h96z', '#FF7043') + Lc('M108 82l-12 42M132 82l12 42M100 150l-8 40M140 150l8 40', '#FFCA28', 6) + [[120, 110], [104, 170], [138, 172]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 1-5 4 2 7-6-4-6 4 2-7-5-4 6-1z`, '#FFFFFF', 1.5)).join('')
      + P('M96 50c4-26 44-26 48 0l-8 8h-32z', '#81D4FA', 2.5) + Lc('M100 56h40', '#E53935', 5) + P('M120 56l-14 12M120 56l14 12', 'none', 3) + C(108, 30, 6, '#EC407A', 2) + C(130, 28, 6, '#66BB6A', 2) + R(117, 18, 6, 14, '#FFEB3B', 2, 2)
      + g(176, 214, 1, R(-18, -40, 30, 34, '#1E88E5', 6, 2.5) + C(0, -52, 14, '#FFE0BD', 2.5) + P('M-14-58c4-14 24-14 28 0z', '#6D4C41', 2) + R(-12, -6, 24, 10, '#E53935', 2, 2) + face(0, -50, 0.3)) + Lc('M162 182l-26-14', '#FFE0BD', 6) + face(120, 140, 0.45)),
  F('de', 'culture', 'schrebergarten', 'สวนแปลงเล็กชเรเบอร์การ์เทินกับกระท่อมจิ๋ว', 'A Schrebergarten allotment with its tiny summer hut', ['schrebergarten', 'ชเรเบอร์การ์เทิน', 'allotment garden', 'สวนแปลงเช่า', 'kleingarten', 'garden hut', 'กระท่อมในสวน', 'vegetable patch', 'แปลงผัก', 'watering can'],
    // a little wooden summer hut with a striped awning in a fenced garden plot, rows of cabbages and tall sunflowers, a red watering can, a picket fence across the front
    P('M10 150h220v66H10z', '#AED581', 2.5) + R(120, 84, 80, 70, '#FFCC80', 0, 3) + P('M112 86l48-30 48 30z', '#E53935', 3) + R(150, 112, 22, 42, '#8D6E63', 2, 2.5) + R(128, 100, 16, 16, '#B3E5FC', 1, 2) + P('M120 120h-30l-6 14h36z', '#FFFFFF', 2.5) + Lc('M96 120l-4 14M108 120l-2 14', '#43A047', 4)
      + [40, 64].map((x) => Lc(`M${x} 178v-90`, '#558B2F', 3) + C(x, 82, 14, '#FFCA28', 2.5) + C(x, 82, 6, '#6D4C41', 0)).join('')
      + [[30, 192], [56, 196], [82, 192], [108, 196]].map(([x, y]) => C(x, y, 10, '#9CCC65', 2) + Lc(`M${x - 6} ${y}h12`, '#689F38', 2)).join('')
      + Array.from({ length: 12 }, (_, k) => P(`M${14 + k * 18} 226v-20l5-6 5 6v20z`, '#FFFFFF', 2)).join('') + Lc('M10 214h220', INK, 2.5)
      + g(200, 188, 1, P('M-12 0h20l-2 18h-16z', '#E53935', 2.5) + Lc('M8 4l14-8', '#E53935', 4) + P('M-10 0c0-10 16-10 16 0', 'none', 2.5)) + face(160, 132, 0.3)),
  F('de', 'food', 'rotegruetze', 'โรเทอกรึทเซอ เยลลีเบอร์รีแดงราดซอสวานิลลา', 'Rote Grütze, red berry pudding with vanilla sauce', ['rote grütze', 'rote gruetze', 'โรเทอกรึทเซอ', 'red berry pudding', 'พุดดิ้งเบอร์รีแดง', 'vanilla sauce', 'ซอสวานิลลา', 'north german dessert', 'redcurrants', 'ของหวานเยอรมันเหนือ'],
    // a glass bowl of glossy dark red berry pudding full of whole cherries, redcurrants and raspberries, a pour of pale yellow vanilla sauce from a little jug, a spoon
    P('M44 110h152c0 60-30 92-76 92s-76-32-76-92z', '#E1F5FE', 3) + P('M50 118h140c-2 50-28 76-70 76s-68-26-70-76z', '#B71C1C', 2.5)
      + [[80, 140], [104, 160], [134, 150], [158, 136], [118, 178], [90, 170]].map(([x, y], k) => C(x, y, k % 2 ? 7 : 5, k % 3 ? '#E53935' : '#880E4F', 1.5)).join('')
      + P('M86 120c10 20 40 24 60 6', '#FFF59D', 2.5) + g(184, 70, 1, P('M-16 0h24l4 30h-32z', '#FFFFFF', 2.5) + P('M8 4c10 0 12 14 2 16', 'none', 2.5) + P('M-16 2l-10 10', 'none', 3), -30) + Lc('M162 88c-6 10-10 20-14 30', '#FFF59D', 5)
      + E(120, 208, 50, 6, '#B3E5FC', 2) + face(120, 150, 0.4)),

  // ---------- Munich
  L('de/munich/landmark-flaucher.v1.svg', 'หาดกรวดฟลาวเคอร์ริมแม่น้ำอีซาร์', 'The gravel beaches of the Isar at the Flaucher', ['flaucher', 'ฟลาวเคอร์', 'isar river beach', 'หาดกรวดแม่น้ำอีซาร์', 'gravel islands', 'เกาะกรวด', 'paddling', 'เล่นน้ำตื้น', 'isarauen', 'river picnic'], 'หาเด็กที่กำลังวางหินซ้อนเป็นหอบนเกาะกรวด', 'Find the child stacking pebbles into a tower on the gravel island',
    // a wide shallow turquoise river split by pale gravel islands, a child building a pebble tower, another paddling, a family picnic blanket, tall poplar trees on the banks
    sky('#E3F2FD') + P('M-4 80h248v60H-4z', '#81C784', 0) + [[20, 88], [60, 82], [190, 86], [226, 90]].map(([x, y]) => g(x, y, 1, E(0, -20, 10, 26, '#388E3C', 2) + R(-2, 4, 4, 10, '#6D4C41', 0, 1.5))).join('')
      + P('M-4 110h248v134H-4z', '#4DD0E1', 3) + Lc('M20 130h40M150 124h50M30 230h60', '#B2EBF2', 3)
      + P('M30 170c20-26 140-30 180-8 10 20-30 36-90 36s-100-8-90-28z', '#E0E0E0', 3) + [[60, 176], [90, 186], [150, 182], [180, 172], [118, 168]].map(([x, y]) => E(x, y, 6, 4, '#BDBDBD', 1.5)).join('')
      + g(96, 172, 1, E(0, 0, 12, 6, '#90A4AE', 2) + E(0, -9, 9, 5, '#B0BEC5', 2) + E(0, -17, 6, 4, '#CFD8DC', 2) + C(0, -25, 4, '#ECEFF1', 2))
      + kid(124, 184, '#FB8C00') + R(150, 160, 44, 20, '#E57373', 2, 2.5) + Lc('M150 170h44M172 160v20', '#FFFFFF', 2) + g(206, 228, 1, C(0, -16, 8, '#FFE0BD', 2) + Lc('M-12-2c8 6 16 6 24 0', '#4DD0E1', 3) + face(0, -14, 0.22, 'o')) + face(120, 196, 0.3)),
  L('de/munich/landmark-bavaria.v1.svg', 'รูปปั้นบาวาเรียยักษ์กับสิงโตที่เทเรซีนวีเซอ', 'The giant Bavaria statue and her lion above the Theresienwiese', ['bavaria statue', 'รูปปั้นบาวาเรีย', 'ruhmeshalle', 'hall of fame colonnade', 'theresienwiese', 'เทเรซีนวีเซอ', 'climb inside the statue', 'ปีนขึ้นในหัวรูปปั้น', 'bronze lion', 'สิงโตสำริด'], 'หาหน้าต่างเล็กๆ บนหัวรูปปั้นที่คนแอบมองออกมา', 'Find the little windows in the statue\'s head where people peek out',
    // a huge green-bronze woman in a long robe holding up a leaf wreath, a bronze lion sitting beside her, standing on a tall stone base in front of a long columned hall; tiny faces in the head windows; a staircase and lawn below
    sky('#FFF8E1') + R(10, 150, 220, 34, '#EFEBE9', 0, 3) + [24, 46, 68, 172, 194, 216].map((x) => R(x - 4, 156, 8, 26, '#FFFFFF', 0, 2)).join('') + P('M4 150l8-10h216l8 10z', '#D7CCC8', 2.5)
      + R(92, 132, 56, 56, '#BCAAA4', 0, 3) + P('M-4 188h248v56H-4z', '#9CCC65', 3) + Array.from({ length: 4 }, (_, k) => R(100 - k * 6, 188 + k * 8, 40 + k * 12, 8, '#E0E0E0', 0, 2)).join('')
      + P('M100 132c0-40 6-70 20-80s24 40 22 80z', '#B07A4A', 3) + C(120, 40, 14, '#B07A4A', 3) + P('M106 34c4-12 24-12 28 0', '#8D5A30', 2.5) + Lc('M110 60c-10-10-14-26-12-40', '#B07A4A', 8) + C(96, 16, 12, 'none', 4) + Lc('M90 12l-6-4M102 10l4-6M88 22l-6 2', '#66BB6A', 3)
      + R(114, 38, 5, 4, '#FFF59D', 1, 1) + R(122, 38, 5, 4, '#FFF59D', 1, 1)
      + g(158, 126, 1, E(0, 0, 18, 10, '#B07A4A', 3) + C(-4, -16, 11, '#8D5A30', 3) + C(-4, -16, 6, '#B07A4A', 0) + Lc('M14 0c8-4 10-12 6-18', '#B07A4A', 3)) + kid(60, 236, '#E53935') + face(120, 92, 0.3)),
  L('de/munich/landmark-steckerlfisch.v1.svg', 'ปลาเสียบไม้ย่างชเตคเคิลฟิช', 'Steckerlfisch, fish grilled on sticks', ['steckerlfisch', 'ชเตคเคิลฟิช', 'fish on a stick', 'ปลาเสียบไม้ย่าง', 'grilled mackerel', 'ปลาแมคเคอเรลย่าง', 'charcoal grill', 'beer garden food', 'อาหารในสวนเบียร์', 'bavarian snack'], 'หาปลาที่ยืนเรียงเสียบไม้รอบเตาถ่าน', 'Find the fish standing in a row on sticks round the glowing coals',
    // a long low charcoal grill with glowing orange coals, five whole fish on wooden sticks leaning over it in a row, one held up by a child on a paper plate, little curls of smoke
    sky('#FFF3E0') + R(20, 150, 200, 30, '#5D4037', 3, 3) + R(28, 144, 184, 12, '#FF7043', 3, 2) + [[44, 148], [80, 146], [116, 148], [152, 146], [190, 148]].map(([x, y]) => C(x, y, 4, '#FFCA28', 0)).join('') + R(30, 180, 8, 40, '#5D4037', 0, 2.5) + R(202, 180, 8, 40, '#5D4037', 0, 2.5)
      + [40, 76, 112, 148, 184].map((x) => Lc(`M${x + 6} 150l-14-96`, '#A1887F', 3) + g(x - 2, 96, 1, E(0, 0, 9, 26, '#90A4AE', 2.5) + P('M-8 24l8 12 8-12z', '#78909C', 2) + C(0, -16, 2.5, INK, 0) + Lc('M-6 -6c4 4 8 4 12 0M-6 4c4 4 8 4 12 0', '#FFB74D', 2), -8)).join('')
      + Lc('M60 50c-6-10 6-14 0-24M130 48c-6-10 6-14 0-24M196 52c-6-10 6-14 0-24', '#B0BEC5', 3)
      + kid(120, 232, '#43A047') + E(146, 206, 14, 4, '#FFFFFF', 2) + g(146, 196, 1, E(0, 0, 18, 6, '#B0BEC5', 2) + C(-12, -1, 2, INK, 0)) + face(120, 168, 0.3)),
  L('de/munich/landmark-radi.v1.svg', 'หัวไชเท้าราดีหั่นเกลียวแบบมิวนิก', 'A Radi, the big white radish cut into a spiral', ['radi', 'ราดี', 'bavarian radish', 'หัวไชเท้าบาวาเรีย', 'spiral cut radish', 'หัวไชเท้าหั่นเกลียว', 'radish with salt', 'brotzeit', 'บรอทไซท์', 'beer garden snack'], 'หาหัวไชเท้าที่ยืดออกเป็นเกลียวยาวเหมือนสปริง', 'Find the radish stretched out into a long spiral like a spring',
    // a big white radish with green leaves, cut into one long spiral that hangs down in springy coils, a little pile of salt on a wooden board, a blue-and-white chequered napkin, a pretzel at the side
    R(20, 188, 200, 24, '#A1673F', 8, 3) + P('M20 188l30-20h140l30 20z', '#E3F2FD', 2.5) + Lc('M40 180l20-12M70 180l20-12M100 180l20-12M130 180l20-12M160 180l20-12', '#64B5F6', 6)
      + [-24, -6, 12, 28].map((a) => g(120, 54, 1, P('M0 0c-10-16-8-34 4-40 8 10 6 28-4 40z', '#66BB6A', 2.5), a)).join('')
      + E(120, 70, 22, 18, '#FFFFFF', 3) + Array.from({ length: 6 }, (_, k) => E(120 + (k % 2 ? 4 : -4), 92 + k * 15, 20 - k * 1.5, 8, '#FFFFFF', 2.5)).join('') + P('M114 176c4 6 8 6 12 0', 'none', 2.5)
      + P('M164 194c0-10 20-10 20 0z', '#FFFFFF', 2) + [[170, 190], [176, 186], [180, 192]].map(([x, y]) => C(x, y, 1.5, '#B0BEC5', 0)).join('')
      + g(58, 188, 0.8, P('M-26 0c0-30 52-30 52 0-6 14-18 8-26-6-8 14-20 20-26 6z', '#A1673F', 4) + C(-10, -12, 2, '#FFFFFF', 0) + C(12, -10, 2, '#FFFFFF', 0)) + face(120, 70, 0.4)),
  L('de/munich/landmark-leberkaes.v1.svg', 'ขนมปังไส้เลเบอร์แคสแผ่นหนาแบบมิวนิก', 'A Leberkässemmel, Munich\'s thick meat-loaf roll', ['leberkäse', 'leberkaese', 'เลเบอร์แคส', 'leberkässemmel', 'meat loaf roll', 'ขนมปังไส้มีตโลฟ', 'sweet mustard', 'มัสตาร์ดหวาน', 'bavarian snack', 'semmel'], 'หาแผ่นเนื้อหนาๆ สีชมพูที่ยื่นออกมานอกขนมปัง', 'Find the thick pink slice poking out of the round roll',
    // a crusty round bread roll cut open with a thick slice of pink baked meat loaf with a brown crust inside, sticking out on both sides, a squiggle of brown sweet mustard, on a paper napkin
    P('M30 196l20-30h140l20 30z', '#FFFFFF', 2.5) + E(120, 162, 76, 20, '#D7A86E', 3)
      + P('M30 138h180l-6 20H36z', '#F48FB1', 3) + Lc('M32 140h176', '#8D5524', 4) + Lc('M36 156h168', '#8D5524', 3) + [[60, 148], [100, 146], [150, 148], [184, 146]].map(([x, y]) => C(x, y, 2, '#EC407A', 0)).join('')
      + P('M50 136c0-46 140-46 140 0z', '#D7A86E', 3) + Lc('M80 104c10-6 18-6 26 0M126 100c10-6 18-6 26 0M100 88c10-4 20-4 30 0', '#A1673F', 3)
      + Lc('M60 140c10 6 20-6 30 0s20-6 30 0 20-6 30 0 20-6 30 0', '#8D6E63', 4) + face(120, 116, 0.4)),

  // ---------- around Neuschwanstein (Füssen, Linderhof, Oberammergau, the Allgäu)
  L('de/neuschwanstein/landmark-swantap.v1.svg', 'ก๊อกน้ำรูปหงส์เงินในปราสาทนอยชวานสไตน์', 'The silver swan tap inside Neuschwanstein', ['swan tap', 'ก๊อกน้ำรูปหงส์', 'silver swan', 'หงส์เงิน', 'swan washstand', 'อ่างล้างหน้ารูปหงส์', 'castle bedroom', 'ห้องนอนในปราสาท', 'king ludwig swans', 'castle interior'], 'หาหงส์เงินที่มีน้ำไหลออกจากปาก', 'Find the silver swan with water pouring from its beak',
    // a carved wooden washstand with a marble basin; above it a shiny silver swan with curved neck and spread wings, water falling from its beak into the basin; painted wall with blue swans behind
    sky('#E8EAF6') + [[40, 50], [196, 60], [36, 150]].map(([x, y]) => g(x, y, 0.6, P('M-14 6c0-10 12-12 20-6 2-10 2-18-4-22 10 2 14 14 8 28z', '#7986CB', 2))).join('')
      + R(40, 160, 160, 70, '#8D6E63', 4, 3) + R(52, 176, 56, 46, '#A1887F', 3, 2.5) + R(132, 176, 56, 46, '#A1887F', 3, 2.5) + P('M44 150h152l-10 18H54z', '#ECEFF1', 3) + E(120, 152, 50, 8, '#B3E5FC', 2)
      + g(120, 76, 1, P('M-36 22c-10-24 6-36 22-30-6 10-2 20 10 26z', '#CFD8DC', 3) + P('M36 22c10-24-6-36-22-30 6 10 2 20-10 26z', '#CFD8DC', 3) + E(0, 26, 22, 14, '#ECEFF1', 3) + P('M6 16c10-14 10-34-4-40-10-4-18 6-14 14', 'none', 0) + Lc('M8 18c12-18 6-40-10-38-10 2-10 14-4 16', '#ECEFF1', 9) + Lc('M8 18c12-18 6-40-10-38-10 2-10 14-4 16', INK, 2) + P('M-6 -6l-10 4 8 4z', '#FFB300', 2) + C(-2, -12, 2, INK, 0))
      + Lc('M104 74c-4 20-2 50 4 74', '#4FC3F7', 4) + face(120, 196, 0.35)),
  L('de/neuschwanstein/landmark-moorishkiosk.v1.svg', 'ศาลามัวร์สีทองในสวนพระราชวังลินเดอร์ฮอฟ', 'The golden Moorish Kiosk in the Linderhof park', ['moorish kiosk', 'ศาลามัวร์', 'linderhof', 'ลินเดอร์ฮอฟ', 'linderhof palace park', 'golden dome', 'โดมทอง', 'peacock throne', 'บัลลังก์นกยูง', 'garden pavilion'], 'หาโดมสีทองที่มีพระจันทร์เสี้ยวเล็กๆ อยู่บนยอด', 'Find the golden dome with a tiny crescent on top',
    // a small square pavilion of cream and pink walls with pointed horseshoe arches, a big golden onion-shaped dome with a tiny crescent finial, four little corner domes, in a garden with clipped bushes and a path
    sky('#E3F2FD') + P('M-4 170h248v74H-4z', '#9CCC65', 0) + P('M100 244l10-74h20l10 74z', '#FFE0B2', 2.5)
      + R(56, 104, 128, 70, '#FFF3E0', 0, 3) + [70, 104, 138].map((x) => P(`M${x} 174v-34c0-18 32-18 32 0v34z`, '#F48FB1', 2.5) + P(`M${x + 6} 174v-30c0-12 20-12 20 0v30z`, '#7B1FA2', 2)).join('')
      + Lc('M56 110h128', '#FFB300', 4) + [[56], [184]].map(([x]) => R(x - 8, 92, 16, 16, '#FFF3E0', 0, 2.5) + P(`M${x - 9} 92c0-16 18-16 18 0z`, '#FFC107', 2.5)).join('')
      + P('M78 104c0-30 18-46 42-56 24 10 42 26 42 56z', '#FFC107', 3) + Lc('M120 48v-14', INK, 2.5) + P('M114 30c4-8 12-8 14-2-6-2-10 0-14 2z', '#FFC107', 2) + Lc('M98 82c6-14 14-22 22-26M142 82c-6-14-14-22-22-26', '#FFE082', 3)
      + [[20, 180], [220, 180]].map(([x, y]) => C(x, y, 16, '#388E3C', 2.5)).join('') + face(120, 84, 0.35)),
  L('de/neuschwanstein/landmark-lueftlmalerei.v1.svg', 'บ้านวาดภาพนิทานลึฟท์ลมาเลอไรที่โอเบอร์อัมเมอร์เกา', 'A house painted with a fairy tale in Oberammergau', ['lüftlmalerei', 'lueftlmalerei', 'ลึฟท์ลมาเลอไร', 'painted house', 'บ้านวาดภาพ', 'oberammergau', 'โอเบอร์อัมเมอร์เกา', 'fairy tale mural', 'ภาพนิทานบนผนัง', 'hansel and gretel house'], 'หาภาพนิทานเด็กสองคนกับบ้านขนมที่วาดอยู่บนผนัง', 'Find the fairy-tale picture of two children and a sweet house painted on the wall',
    // a white Bavarian house with a wide roof and wooden balcony; its wall painted like a picture book: a gingerbread house in a forest, two little children holding hands, painted window frames and flower boxes
    sky('#E1F5FE') + P('M-4 120l40-50 30 30 40-40 40 40 40-30 58 40v40H-4z', '#B0BEC5', 3) + P('M-4 200h248v44H-4z', '#9CCC65', 3)
      + R(36, 80, 168, 130, '#FFFDE7', 0, 3) + P('M24 84l96-56 96 56z', '#8D6E63', 3) + R(36, 96, 168, 10, '#A1673F', 0, 2.5) + Lc('M40 106v8M60 106v8M80 106v8M100 106v8M120 106v8M140 106v8M160 106v8M180 106v8M200 106v8', '#A1673F', 3)
      + [[54, 64], [168, 64]].map(([x, y]) => R(x, y, 18, 16, '#B3E5FC', 1, 2) + R(x - 3, y - 3, 24, 22, 'none', 2, 2)).join('')
      + R(56, 126, 128, 70, '#C8E6C9', 3, 2.5) + [[70, 186], [170, 186]].map(([x, y]) => g(x, y, 0.55, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', '#2E7D32', 2))).join('')
      + R(102, 150, 36, 30, '#A1673F', 0, 2.5) + P('M96 150l24-18 24 18z', '#F48FB1', 2.5) + [[108, 162, '#E53935'], [130, 162, '#FFCA28'], [118, 172, '#42A5F5']].map(([x, y, c]) => C(x, y, 4, c, 1.5)).join('')
      + g(82, 180, 0.7, C(0, -20, 7, '#FFE0BD', 2) + P('M-7 4v-16h14v16z', '#1E88E5', 2)) + g(94, 180, 0.7, C(0, -20, 7, '#FFE0BD', 2) + P('M-8 4l2-16h12l2 16z', '#E53935', 2))
      + R(58, 200, 30, 8, '#E53935', 2, 2) + R(152, 200, 30, 8, '#E53935', 2, 2) + face(120, 116, 0.25)),
  L('de/neuschwanstein/landmark-fingerhakeln.v1.svg', 'กีฬาดึงนิ้วฟิงเกอร์ฮาเคลินแบบบาวาเรีย', 'Fingerhakeln, the Bavarian finger tug-of-war', ['fingerhakeln', 'ฟิงเกอร์ฮาเคิลน์', 'finger wrestling', 'ดึงนิ้ว', 'finger tug of war', 'ชักเย่อนิ้ว', 'bavarian folk sport', 'กีฬาพื้นบ้านบาวาเรีย', 'leather strap', 'village festival'], 'หาสายหนังเล็กๆ ที่คล้องนิ้วกลางของทั้งสองคน', 'Find the little leather loop hooked round both players\' middle fingers',
    // two children in leather shorts and braces sitting at either end of a heavy wooden table, each with one finger hooked into the same little leather loop, pulling hard, cheeks puffed, a judge's hand raised
    sky('#FFF8E1') + R(-4, 150, 248, 94, '#D7CCC8', 0, 0) + R(40, 120, 160, 16, '#A1673F', 2, 3) + R(52, 136, 10, 60, '#8D6E63', 0, 2.5) + R(178, 136, 10, 60, '#8D6E63', 0, 2.5)
      + [[30, 1, '#2E7D32'], [210, -1, '#1565C0']].map(([x, d, c]) => g(x, 106, 1, R(-16, 0, 32, 40, '#FFFFFF', 4, 2.5) + Lc('M-10 0v40M10 0v40', '#5D4037', 4) + P('M-18 40h36v26h-36z', '#6D4C41', 2.5) + C(0, -18, 16, '#FFE0BD', 2.5) + P('M-16-24c2-14 30-14 32 0z', '#5D4037', 2) + face(0, -16, 0.32, 'o'))).join('')
      + Lc('M46 118c20 0 40 4 60 6M194 118c-20 0-40 4-60 6', '#FFE0BD', 8) + E(120, 124, 14, 7, 'none', 0) + P('M104 120c6-8 26-8 32 0s-26 8-32 0z', 'none', 3) + Lc('M104 120c6-8 26-8 32 0s-26 8-32 0', '#8D5524', 4)
      + Lc('M86 104l-8-6M154 104l8-6', INK, 2) + g(120, 60, 1, Lc('M0 30v-26', '#FFE0BD', 7) + C(0, 0, 8, '#FFE0BD', 2))),
  L('de/neuschwanstein/landmark-kaesspatzen.v1.svg', 'เคสชปัตเซินเส้นชีสกับหอมเจียวแบบอัลกอยเออร์', 'Allgäu Kässpatzen, cheesy noodles with crispy onions', ['kässpatzen', 'kaesspatzen', 'เคสชปัตเซิน', 'cheese spaetzle', 'สเปตเซิลชีส', 'allgäu', 'อัลกอย', 'crispy onions', 'หอมเจียว', 'mountain hut food'], 'หาเส้นชีสยืดยาวที่ติดส้อมขึ้นมา', 'Find the long stretchy cheese string pulled up by the fork',
    // a black iron pan full of little wiggly golden egg noodles melted together with cheese, topped with crispy brown fried onion rings and chives, a fork lifting a long string of cheese
    E(120, 160, 92, 44, '#37474F', 3) + Lc('M210 160h28', '#37474F', 10) + E(120, 154, 80, 34, '#FFE082', 2.5)
      + Array.from({ length: 14 }, (_, k) => Lc(`M${60 + (k % 7) * 18} ${140 + Math.floor(k / 7) * 18}c4-4 8 4 12 0`, '#FFB300', 3)).join('')
      + [[70, 144], [100, 136], [134, 140], [160, 150], [90, 162], [146, 166]].map(([x, y]) => E(x, y, 9, 5, 'none', 0) + Lc(`M${x - 9} ${y}a9 5 0 1 0 18 0a9 5 0 1 0-18 0`, '#8D5524', 3)).join('')
      + [[110, 152], [124, 158], [80, 154]].map(([x, y]) => Lc(`M${x} ${y}l6-4`, '#43A047', 3)).join('')
      + Lc('M150 146c10-30 20-60 26-90', '#FFE082', 4) + g(176, 52, 1, R(-3, -40, 6, 30, '#B0BEC5', 2, 2) + P('M-10-10h20l-2 14h-16z', '#B0BEC5', 2) + Lc('M-6 4v8M0 4v8M6 4v8', '#B0BEC5', 3), 10) + face(110, 150, 0.35)),

  // ---------- Austria
  F('at', 'food', 'kaiserschmarrn', 'ไกเซอร์ชมาร์น แพนเค้กฉีกโรยน้ำตาล', 'Kaiserschmarrn, torn fluffy pancake', ['kaiserschmarrn', 'ไกเซอร์ชมาร์น', 'torn pancake', 'แพนเค้กฉีก', 'icing sugar', 'น้ำตาลไอซิ่ง', 'plum compote', 'แยมพลัม', 'austrian dessert', 'mountain hut'],
    // a black pan of golden fluffy pancake torn into rough pieces, dusted with white icing sugar and dotted with raisins, a little bowl of dark plum compote beside it
    E(110, 150, 90, 46, '#37474F', 3) + Lc('M196 136l36-16', '#37474F', 10) + E(110, 146, 78, 36, '#5D4037', 0)
      + [[70, 140, 18], [100, 128, 20], [132, 136, 18], [150, 156, 16], [84, 162, 18], [116, 160, 18], [58, 156, 12]].map(([x, y, r], k) => P(`M${x - r} ${y}l${r * 0.4}-${r * 0.7} ${r * 0.9} ${r * 0.1} ${r * 0.7} ${r * 0.6}-${r * 0.3} ${r * 0.7}-${r} ${r * 0.1}z`, k % 2 ? '#FFCA28' : '#FFB300', 2.5)).join('')
      + [[76, 132], [112, 122], [140, 146], [94, 156], [122, 166], [62, 150], [158, 160]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('') + [[90, 140], [126, 150], [104, 168]].map(([x, y]) => C(x, y, 3, '#4E342E', 1)).join('')
      + g(196, 196, 1, E(0, 0, 26, 12, '#FFFFFF', 2.5) + E(0, -4, 20, 7, '#6A1B9A', 2) + C(-6, -6, 3, '#4A148C', 0)) + face(108, 142, 0.35)),
  F('at', 'food', 'germknoedel', 'เกร์มเคอเดล ซาลาเปายักษ์ไส้แยมพลัมโรยป๊อปปี้', 'Germknödel, a big yeast dumpling with plum jam and poppy seeds', ['germknödel', 'germknoedel', 'เกร์มเคอเดล', 'yeast dumpling', 'ซาลาเปาออสเตรีย', 'poppy seeds', 'เมล็ดป๊อปปี้', 'plum jam', 'แยมพลัม', 'vanilla sauce'],
    // a big round white fluffy dumpling sitting in a pool of pale vanilla sauce in a deep plate, sprinkled on top with grey-black poppy seeds and sugar, a dark plum jam peeking from a little split
    E(120, 178, 96, 30, '#FFFFFF', 3) + E(120, 172, 78, 20, '#FFF59D', 2.5) + C(120, 124, 54, '#FAFAFA', 3)
      + P('M88 98c10-20 54-20 64 0 0 10-10 10-32 10s-32 0-32-10z', '#546E7A', 2) + Array.from({ length: 14 }, (_, k) => C(94 + (k * 11) % 54, 92 + (k * 7) % 14, 1.6, '#263238', 0)).join('') + [[104, 96], [128, 100], [140, 94]].map(([x, y]) => C(x, y, 2, '#FFFFFF', 0)).join('')
      + P('M140 150c6-6 14-6 18 2-6 4-12 4-18-2z', '#6A1B9A', 2) + face(120, 132, 0.4)),
  F('at', 'animal', 'chough', 'นกแอลไพน์ชัฟปากเหลืองบนยอดเขา', 'An Alpine chough on a mountain summit', ['alpine chough', 'นกแอลไพน์ชัฟ', 'alpendohle', 'black mountain bird', 'นกดำปากเหลือง', 'yellow beak', 'summit bird', 'นกบนยอดเขา', 'red legs', 'austrian alps'],
    // a glossy black bird with a bright yellow curved beak and red legs perched on a rock at a summit, eyeing a crumb of bread, snowy peaks and a blue sky behind
    P('M10 160l40-40 30 20 40-50 40 40 30-20 40 50z', '#ECEFF1', 2.5) + P('M110 90l10-0 10 10-10-2-10 4z', '#FFFFFF', 0) + P('M40 200c10-40 60-50 100-40s70 20 80 40z', '#90A4AE', 3)
      + g(118, 132, 1, E(0, 0, 34, 24, '#263238', 3) + P('M-26-6c-14 10-28 30-34 40 16-4 30-14 40-26z', '#37474F', 2.5) + C(30, -22, 18, '#263238', 3) + P('M44-22l18 2-16 8z', '#FFCA28', 2.5) + C(34, -26, 4, '#FFFFFF', 0) + C(35, -26, 2, INK, 0) + Lc('M-6 22v20M8 22v20', '#E53935', 4) + Lc('M-12 42h12M4 42h12', '#E53935', 3))
      + g(178, 168, 1, P('M-10 0c0-8 20-8 20 0z', '#D7A86E', 2))),
  F('at', 'culture', 'trachtenhut', 'หมวกชาวทีโรลประดับขนนกและเข็มกลัด', 'A Tyrolean hat with a feather and pins', ['tyrolean hat', 'หมวกทีโรล', 'trachtenhut', 'feather hat', 'หมวกขนนก', 'hat pins', 'เข็มกลัดหมวก', 'alpine hat', 'tracht', 'ชุดพื้นเมืองออสเตรีย'],
    // a green felt hat with a narrow brim and a twisted cord band, a tall brush of grey-brown hair and a pheasant feather tucked in at the side, little shiny enamel pins of flowers and mountains on the band
    E(120, 170, 96, 22, '#2E7D32', 3) + P('M58 166c0-60 18-90 62-90s62 30 62 90z', '#388E3C', 3) + P('M90 82c10 10 50 10 60 0', 'none', 3)
      + R(58, 148, 124, 16, '#1B5E20', 3, 2.5) + Lc('M60 156c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0', '#FFCA28', 3)
      + [[84, 156, '#E53935'], [108, 156, '#FFFFFF'], [132, 156, '#42A5F5']].map(([x, y, c]) => C(x, y, 6, c, 2)).join('')
      + g(164, 146, 1, P('M0 0c-6-30-2-60 12-80 4 20 2 50-12 80z', '#8D6E63', 2.5) + Lc('M4-10c2-20 4-40 8-60', '#5D4037', 2), 14) + g(170, 150, 1, Array.from({ length: 7 }, (_, k) => Lc(`M0 0l${-10 + k * 4} -40`, '#9E9E9E', 3)).join('') + R(-6, -6, 12, 10, '#FFC107', 2, 2)) + face(110, 118, 0.4)),

  // ---------- Vienna
  L('at/vienna/landmark-kaffeehaus.v1.svg', 'ร้านกาแฟเวียนนาแบบดั้งเดิม', 'A Viennese coffee house', ['viennese coffee house', 'ร้านกาแฟเวียนนา', 'kaffeehaus', 'คาเฟ่เฮาส์', 'melange', 'เมลังจ์', 'marble table', 'โต๊ะหินอ่อน', 'bentwood chair', 'newspaper holder'], 'หาหนังสือพิมพ์ที่หนีบอยู่บนไม้ยาว', 'Find the newspaper clipped on a long wooden holder',
    // a cosy coffee house corner: a round white marble table on an iron foot, a curly bentwood chair, a silver tray with a cup of milky coffee and a glass of water, a newspaper on a long wooden holder, a red velvet bench and big round mirror
    sky('#FFF3E0') + R(-4, 120, 248, 70, '#C62828', 6, 3) + Lc('M30 130v50M80 130v50M130 130v50M180 130v50M230 130v50', '#B71C1C', 3) + C(120, 60, 40, '#E0F7FA', 4) + C(120, 60, 32, 'none', 2)
      + P('M-4 190h248v54H-4z', '#8D6E63', 3) + Lc('M40 190l-20 54M100 190l-6 54M160 190l6 54M220 190l20 54', '#6D4C41', 2)
      + E(116, 160, 54, 12, '#FAFAFA', 3) + R(110, 170, 12, 44, '#37474F', 0, 2.5) + E(116, 216, 26, 6, '#37474F', 2.5)
      + R(80, 148, 46, 6, '#CFD8DC', 3, 2) + P('M90 132h18l-2 16h-14z', '#FFFFFF', 2.5) + E(99, 132, 9, 3, '#D7A86E', 1.5) + P('M108 136c6 0 6 8 0 8', 'none', 2.5) + R(112, 128, 10, 20, '#E1F5FE', 2, 2)
      + g(198, 172, 1, P('M-14 50v-58c0-24 28-24 28 0v14', 'none', 4) + R(-16, 0, 32, 8, '#A1673F', 3, 2.5) + Lc('M-12 8l-4 42M12 8l4 42', '#5D4037', 4))
      + g(150, 140, 1, Lc('M-6 0h64', '#8D6E63', 5) + R(4, -2, 44, 34, '#FFFFFF', 0, 2) + Lc('M10 8h32M10 14h32M10 20h20', '#9E9E9E', 2), -8) + face(120, 60, 0.4)),
  L('at/vienna/landmark-enzis.v1.svg', 'เก้าอี้นั่งเล่นเอนซีสีสดในลานมิวเซียมควาร์เทียร์', 'The bright Enzi lounge seats in the MuseumsQuartier courtyard', ['museumsquartier', 'มิวเซียมควาร์เทียร์', 'enzi', 'เอนซี', 'lounge furniture', 'เก้าอี้นั่งเล่นในลาน', 'courtyard', 'ลานกลางแจ้ง', 'mq vienna', 'colourful seats'], 'หาเก้าอี้ยักษ์ทรงโค้งที่มีเด็กนอนเอนอยู่', 'Find the giant curved seat with a child lying back on it',
    // a wide stone courtyard with long low museum buildings, a white cube museum on one side, big chunky curved lounge seats in pink, lime and blue scattered about, a child lying on one, another climbing
    sky('#E1F5FE') + R(10, 70, 90, 90, '#FFFFFF', 0, 3) + R(150, 60, 80, 100, '#455A64', 0, 3) + R(-4, 100, 248, 60, '#FFF3E0', 0, 3) + wins(14, 110, 15, 16, 8, 14)
      + P('M-4 160h248v84H-4z', '#E0E0E0', 3) + Lc('M-4 190h248M60 160l-20 84M180 160l20 84', '#BDBDBD', 2)
      + [[60, 210, '#F06292', 0], [150, 196, '#AED581', 10], [110, 232, '#4FC3F7', -6]].map(([x, y, c, r]) => g(x, y, 1, P('M-40 0c0-14 10-20 26-14l40 14c12 4 14 14 14 20h-80z', c, 3) + P('M-40 0c0 6 0 14 2 20h76', 'none', 2.5), r)).join('')
      + g(54, 196, 1, C(-18, -14, 8, '#FFE0BD', 2) + P('M-10-14l30 6-4 8-28-6z', '#FFCA28', 2) + face(-18, -12, 0.22), -12) + kid(172, 186, '#7E57C2') + face(120, 132, 0.3)),
  L('at/vienna/landmark-secession.v1.svg', 'อาคารเซเซสชันกับโดมใบลอเรลสีทอง', 'The Secession building and its golden leaf dome', ['secession building', 'อาคารเซเซสชัน', 'golden cabbage', 'กะหล่ำทอง', 'golden dome of leaves', 'โดมใบไม้สีทอง', 'art nouveau', 'อาร์ตนูโว', 'jugendstil', 'karlsplatz'], 'หาโดมกลมที่ทำจากใบไม้สีทองเป็นพันใบ', 'Find the round dome made of thousands of golden leaves',
    // a clean white cube building with plain walls and a dark doorway, four stubby pillars, on top a big round open globe of golden laurel leaves; little golden owls on the front wall, a tree beside it
    sky('#E3F2FD') + P('M-4 196h248v48H-4z', '#BDBDBD', 3) + R(40, 104, 160, 92, '#FFFFFF', 0, 3) + R(70, 90, 100, 20, '#FFFFFF', 0, 3)
      + [76, 98, 142, 164].map((x) => R(x - 6, 54, 12, 40, '#FFFFFF', 0, 2.5)).join('') + R(98, 150, 44, 46, '#37474F', 2, 3) + P('M92 150h56l-6-12h-44z', '#FFC107', 2.5)
      + C(120, 58, 42, '#FFC107', 3) + Array.from({ length: 16 }, (_, k) => g(120, 58, 1, E(0, -30, 6, 10, '#FFB300', 1.5), k * 22.5)).join('') + Array.from({ length: 8 }, (_, k) => g(120, 58, 1, E(0, -16, 5, 8, '#FFD54F', 1.5), k * 45)).join('')
      + [[56, 126], [184, 126]].map(([x, y]) => g(x, y, 1, E(0, 0, 8, 10, '#FFC107', 2) + C(-3, -3, 2, INK, 0) + C(3, -3, 2, INK, 0))).join('') + g(220, 196, 1, C(0, -24, 18, '#66BB6A', 2.5) + R(-3, -8, 6, 8, '#6D4C41', 0, 2)) + face(120, 126, 0.4)),
  L('at/vienna/landmark-snowglobe.v1.svg', 'ลูกแก้วหิมะเวียนนา บ้านเกิดของลูกแก้วหิมะ', 'A Viennese snow globe, where snow globes began', ['snow globe', 'ลูกแก้วหิมะ', 'schneekugel', 'ชเนคูเกิล', 'snow globe workshop', 'โรงงานลูกแก้วหิมะ', 'glass dome', 'ลูกแก้ว', 'souvenir', 'shake the snow'], 'หาเกล็ดหิมะที่ลอยวนอยู่ในลูกแก้ว', 'Find the snowflakes swirling round inside the glass ball',
    // a big clear glass ball on a dark wooden base, inside a tiny white palace and a little round wheel and fir trees on snowy ground, white flakes swirling, a child's hands shaking it
    C(120, 106, 80, '#E1F5FE', 3) + P('M44 128c20 18 132 18 152 0v20c-20 18-132 18-152 0z', '#FFFFFF', 0) + P('M48 140c30 14 114 14 144 0', '#FFFFFF', 2.5)
      + R(72, 104, 64, 34, '#FFF59D', 0, 2.5) + P('M68 104l36-18 36 18z', '#4DB6AC', 2.5) + wins(78, 112, 4, 15, 7, 10) + C(166, 104, 18, 'none', 3) + Lc('M166 86v36M148 104h36', INK, 2) + R(162, 120, 8, 18, '#90A4AE', 0, 2)
      + fir(54, 136, 0.6) + fir(190, 140, 0.5) + Array.from({ length: 16 }, (_, k) => C(60 + (k * 37) % 120, 44 + (k * 23) % 60, 3, '#FFFFFF', 1)).join('')
      + P('M50 172h140l12 34H38z', '#5D4037', 3) + R(30, 206, 180, 14, '#4E342E', 4, 3) + E(70, 196, 8, 4, '#FFC107', 1.5) + face(104, 122, 0.25)),
  L('at/vienna/landmark-musicstairs.v1.svg', 'บันไดเปียโนที่บ้านแห่งดนตรีเวียนนา', 'The piano staircase at Vienna\'s House of Music', ['haus der musik', 'บ้านแห่งดนตรี', 'house of music', 'piano stairs', 'บันไดเปียโน', 'musical staircase', 'บันไดมีเสียงดนตรี', 'sound museum', 'พิพิธภัณฑ์เสียง', 'interactive music museum'], 'หาขั้นบันไดที่เป็นแป้นเปียโนขาวดำ', 'Find the steps that are black and white piano keys',
    // a staircase whose steps are giant piano keys, white with black keys between, lit up where a child steps, musical notes floating up, a big treble clef on the wall
    sky('#EDE7F6') + P('M30 30c40-10 30 60 0 50s20-80 40-40', 'none', 0) + Lc('M190 40c-14 0-14 20 0 20s14-30-4-40v80c0 10-12 10-12 0', '#7E57C2', 5)
      + Array.from({ length: 7 }, (_, k) => R(10 + k * 24, 212 - k * 22, 230 - k * 24, 24, k === 3 ? '#FFF59D' : '#FFFFFF', 2, 2.5)).join('')
      + Array.from({ length: 7 }, (_, k) => R(10 + k * 24, 212 - k * 22, 14, 14, '#212121', 1, 1.5)).join('')
      + kid(96, 134, '#E53935') + [[60, 90], [86, 70], [120, 84], [140, 56]].map(([x, y], k) => g(x, y, 1, E(0, 0, 6, 5, k % 2 ? '#7E57C2' : '#EC407A', 1.5) + Lc('M5 0v-18', INK, 2.5))).join('') + face(170, 150, 0.3)),

  // ---------- Hallstatt and the Salzkammergut
  L('at/hallstatt/landmark-espalier.v1.svg', 'ต้นแพร์ดัดแนบผนังบ้านฮัลล์สตัทท์', 'A pear tree trained flat against a Hallstatt house', ['espalier', 'ต้นไม้ดัดแนบผนัง', 'pear tree on the wall', 'ต้นแพร์บนผนังบ้าน', 'spalierobst', 'stacked firewood', 'ฟืนกองเรียง', 'hallstatt house', 'บ้านฮัลล์สตัทท์', 'flower balcony'], 'หาลูกแพร์สีเหลืองที่ห้อยอยู่บนกิ่งที่แนบผนัง', 'Find the yellow pears hanging on the branches pressed flat to the wall',
    // a pastel house wall with green shutters, a pear tree trained flat against it with branches spread like a candelabra and yellow pears; neat stacked logs of firewood under the window; geraniums on the balcony
    sky('#E1F5FE') + R(10, 30, 220, 200, '#FFE0B2', 0, 3) + P('M0 34l120-40 120 40z', '#6D4C41', 3) + P('M-4 228h248v16H-4z', '#9E9E9E', 3)
      + [[30, 54], [170, 54]].map(([x, y]) => R(x, y, 40, 40, '#B3E5FC', 2, 2.5) + R(x - 12, y, 12, 40, '#43A047', 0, 2) + R(x + 40, y, 12, 40, '#43A047', 0, 2)).join('') + R(20, 98, 200, 8, '#8D6E63', 0, 2) + [40, 60, 180, 200].map((x) => C(x, 96, 6, '#E53935', 1.5)).join('')
      + Lc('M120 226V110', '#6D4C41', 7) + [130, 160, 190].map((y) => Lc(`M120 ${y}h-44v-14M120 ${y}h44v-14`, '#6D4C41', 5)).join('') + [[80, 130], [160, 130], [80, 160], [160, 160], [76, 190], [164, 190], [120, 108]].map(([x, y]) => C(x, y, 7, '#81C784', 1.5)).join('')
      + [[96, 136], [146, 138], [92, 196], [150, 168]].map(([x, y]) => P(`M${x} ${y - 10}c-8 6-8 18 0 18s8-12 0-18z`, '#FFEB3B', 2)).join('')
      + g(28, 228, 1, Array.from({ length: 6 }, (_, k) => C((k % 3) * 14, -8 - Math.floor(k / 3) * 14, 7, '#D7A86E', 2)).join('')) + face(120, 92, 0.35)),
  L('at/hallstatt/landmark-kaiservilla.v1.svg', 'ไกเซอร์วิลลาสีเหลืองที่บาดอิชล์', 'The yellow Kaiservilla in Bad Ischl', ['kaiservilla', 'ไกเซอร์วิลลา', 'bad ischl', 'บาดอิชล์', 'imperial villa', 'วิลลาของจักรพรรดิ', 'summer villa', 'วิลลาฤดูร้อน', 'salzkammergut', 'villa park'], 'หาวิลลาสีเหลืองที่สร้างเป็นรูปตัวอีเมื่อมองจากบน', 'Find the long yellow villa with its two wings and white columns',
    // a long creamy-yellow villa with a white-columned porch in the middle and two side wings, green shutters, a tidy lawn with flower beds and a round fountain, forested hills behind
    sky('#E3F2FD') + P('M-4 120c40-40 90-50 130-30s80-20 118 0v30H-4z', '#558B2F', 3) + P('M-4 170h248v74H-4z', '#9CCC65', 0)
      + R(10, 110, 70, 60, '#FFE082', 0, 3) + R(160, 110, 70, 60, '#FFE082', 0, 3) + R(70, 96, 100, 74, '#FFE082', 0, 3) + P('M64 96l56-24 56 24z', '#B0BEC5', 3) + P('M4 110l38-14 38 14zM156 110l38-14 38 14z', '#B0BEC5', 2.5)
      + [18, 46].map((x) => R(x, 122, 14, 18, '#43A047', 1, 2)).join('') + [176, 204].map((x) => R(x, 122, 14, 18, '#43A047', 1, 2)).join('') + wins(84, 104, 5, 16, 8, 14)
      + R(92, 130, 56, 8, '#FFFFFF', 0, 2) + [98, 112, 128, 142].map((x) => R(x - 3, 138, 6, 32, '#FFFFFF', 0, 2)).join('') + P('M112 170v-18c0-8 16-8 16 0v18z', '#8D6E63', 2)
      + E(120, 206, 30, 10, '#81D4FA', 3) + Lc('M120 204v-18', '#B3E5FC', 4) + [[50, 196, '#EC407A'], [190, 196, '#FFCA28']].map(([x, y, c]) => E(x, y, 26, 8, c, 2)).join('') + face(120, 116, 0.3)),
  L('at/hallstatt/landmark-goiserer.v1.svg', 'รองเท้าเดินเขากอยเซอเรอร์ทำมือจากบาดกอยเซิร์น', 'Goiserer, the handmade mountain boots of Bad Goisern', ['goiserer', 'กอยเซอเรอร์', 'bad goisern', 'บาดกอยเซิร์น', 'mountain boots', 'รองเท้าเดินเขา', 'handmade shoes', 'รองเท้าทำมือ', 'shoemaker', 'ช่างทำรองเท้า'], 'หารองเท้าที่มีเชือกผูกสีแดงและพื้นรองเท้าเย็บรอบ', 'Find the boot with red laces and its sole stitched all round',
    // a sturdy brown leather mountain boot with a high cuff, red laces criss-crossing through brass hooks, a thick sole stitched with a white seam, on a cobbler's bench with a little hammer and a wooden shoe last
    R(14, 190, 212, 18, '#A1673F', 4, 3) + R(24, 208, 12, 26, '#8D6E63', 0, 2.5) + R(204, 208, 12, 26, '#8D6E63', 0, 2.5)
      + P('M60 186V66c0-10 6-16 16-16h46c10 0 14 6 14 16v54c30 4 60 18 70 40v26z', '#8D5524', 3) + P('M54 186h158v10H54z', '#3E2723', 3) + Lc('M58 182h150', '#FFFFFF', 2) + Lc('M62 182h4M74 182h4M86 182h4M98 182h4M110 182h4M122 182h4M134 182h4M146 182h4M158 182h4M170 182h4M182 182h4M194 182h4', '#3E2723', 2)
      + Array.from({ length: 6 }, (_, k) => C(86, 68 + k * 16, 3, '#FFC107', 1.5) + C(120, 68 + k * 16, 3, '#FFC107', 1.5)).join('') + Array.from({ length: 5 }, (_, k) => Lc(`M86 ${68 + k * 16}l34 16M120 ${68 + k * 16}l-34 16`, '#E53935', 3)).join('') + R(56, 50, 84, 12, '#6D4C41', 3, 2.5)
      + g(36, 176, 1, R(-4, -30, 8, 30, '#A1887F', 2, 2) + R(-12, -38, 24, 10, '#9E9E9E', 2, 2), -20) + face(166, 160, 0.3)),
  L('at/hallstatt/landmark-gloeckler.v1.svg', 'ขบวนกล็อคเลอร์สวมหมวกโคมยักษ์ที่เอเบนเซ', 'The Glöckler run with giant glowing hats in Ebensee', ['glöcklerlauf', 'gloecklerlauf', 'กล็อคเลอร์', 'ebensee', 'เอเบนเซ', 'glowing hats', 'หมวกเรืองแสง', 'twelfth night', 'คืนที่สิบสองหลังคริสต์มาส', 'salzkammergut custom'], 'หาหมวกรูปดาวที่ส่องแสงสีต่างๆ อยู่บนหัว', 'Find the star-shaped hat glowing with coloured light',
    // night snow; two runners in white clothes with bells at their belts, wearing huge glowing paper hats shaped like a star and a house, lit from inside with coloured patterns; stars above
    sky('#1A237E') + Array.from({ length: 10 }, (_, k) => C(14 + k * 23, 14 + (k * 17) % 30, 2, '#FFF59D', 0)).join('') + P('M-4 200c60-10 180-10 248 0v44H-4z', '#E8EAF6', 3)
      + g(74, 200, 1, R(-14, -60, 28, 60, '#FFFFFF', 4, 2.5) + Lc('M-14-20h28', '#B0BEC5', 3) + [-10, 0, 10].map((x) => C(x, -14, 5, '#FFC107', 1.5)).join('') + C(0, -70, 10, '#FFE0BD', 2) + face(0, -70, 0.22, 'o')
        + P('M0-150l14 30 32 4-24 22 6 32-28-16-28 16 6-32-24-22 32-4z', '#FFF59D', 3) + C(0, -112, 10, '#E53935', 2) + Lc('M-20-112h40M0-132v40', '#42A5F5', 3))
      + g(170, 206, 1, R(-14, -60, 28, 60, '#FFFFFF', 4, 2.5) + [-10, 0, 10].map((x) => C(x, -14, 5, '#FFC107', 1.5)).join('') + C(0, -70, 10, '#FFE0BD', 2) + face(0, -70, 0.22)
        + P('M-34-82v-44l34-28 34 28v44z', '#FFECB3', 3) + R(-12, -116, 24, 22, '#EC407A', 2, 2) + C(-20, -132, 5, '#66BB6A', 1.5) + C(20, -132, 5, '#42A5F5', 1.5))),
  L('at/hallstatt/landmark-sleepinggreek.v1.svg', 'ภูเขาหญิงกรีกนอนหลับเหนือทะเลสาบเทราน์เซ', 'The Sleeping Greek Woman mountain above the Traunsee', ['sleeping greek woman', 'ภูเขาหญิงกรีกนอนหลับ', 'schlafende griechin', 'traunsee', 'ทะเลสาบเทราน์เซ', 'traunstein', 'เทราน์ชไตน์', 'gmunden', 'กมุนเดิน', 'mountain silhouette'], 'หาเนินเขาที่มีจมูกกับคางเหมือนคนนอนหงาย', 'Find the ridge with a nose and chin like a lady lying on her back',
    // a long ridge of mountain shaped like a sleeping face looking up: forehead, nose, lips and chin, with long hair of forest trailing away; a calm blue lake below with a little sailing boat; a sleepy 'zzz' cloud
    sky('#FFF3E0') + P('M-4 150V120c20-6 30-14 40-24 8-8 14-10 18-6 6-12 14-14 18-4 6 2 8 8 4 12 10 0 14 6 8 12 8 2 10 10 2 14 20 4 60-10 90-30 30-10 50 0 68 20v40z', '#8D6E63', 3)
      + P('M140 106c20-10 40-10 60 6s30 30 44 34', 'none', 0) + Lc('M150 104c20-8 40-4 56 10', '#689F38', 6) + Lc('M30 118c4-4 10-4 14 0', INK, 2.5)
      + P('M-4 150h248v94H-4z', '#4FC3F7', 3) + Lc('M20 180h40M140 200h60M70 220h50', '#E1F5FE', 3)
      + g(150, 176, 1, P('M-20 0h40l-6 10h-28z', '#FFFFFF', 2.5) + Lc('M0 0v-36', INK, 2.5) + P('M2-34l18 30H2z', '#E53935', 2))
      + g(176, 50, 1, P('M-30 10c-8 0-10-16 4-16 2-12 22-12 26 0 12-4 20 6 14 16z', '#FFFFFF', 2.5)) + Lc('M176 40h10l-10 10h10', '#7986CB', 2.5)),
];

export default { places: {}, items };
