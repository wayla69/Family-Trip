// Wave 8, Japan group part 4: the Philippines (the country, Boracay, Bohol & Cebu)
import { P, R, C, E, Lc, g, face, free } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (ph/bohol/landmark-otap.v1.svg → ph-bohol.landmark.otap)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const palm = (x, y, h, lean = 1) => Lc(`M${x} ${y}c${4 * lean} -${h / 2} ${-2 * lean} -${h * 0.8} ${8 * lean} -${h}`, '#6D4C41', 5)
  + [-30, -14, 4, 20, 34].map((dx) => Lc(`M${x + 8 * lean} ${y - h}q${dx / 2} -14 ${dx} ${Math.abs(dx) < 10 ? -14 : 6}`, '#2E7D32', 5)).join('');

const items = [
  // ---------- The Philippines (the country)
  K('ph.food.adobo', 'อะโดโบ ไก่ตุ๋นซีอิ๊วน้ำส้มสายชูของฟิลิปปินส์', 'Adobo, the Philippines\' soy and vinegar stew', ['adobo', 'อะโดโบ', 'chicken adobo', 'ไก่อะโดโบ', 'filipino stew', 'สตูฟิลิปปินส์', 'soy and vinegar', 'ซีอิ๊วน้ำส้มสายชู', 'bay leaf', 'garlic rice'],
    // a clay pot of glossy dark brown chicken pieces in sauce with bay leaves, whole garlic cloves and peppercorns, a mound of white rice on a plate beside it, steam rising
    P('M20 120h140c0 50-30 82-70 82s-70-32-70-82z', '#A1673F') + E(90, 120, 70, 16, '#8D5524') + E(90, 122, 62, 11, '#4E2A1A', 0) + Lc('M14 120h-8M166 120h8', '#A1673F', 8)
      + [[60, 114], [92, 108], [122, 116]].map(([x, y]) => P(`M${x - 16} ${y + 6}c0-16 30-20 32-4 2 8-6 12-16 12s-16-2-16-8z`, '#7B3F1E') + E(x - 2, y - 2, 6, 3, '#A0602F', 0)).join('')
      + [[76, 102, -30], [138, 106, 30]].map(([x, y, r]) => g(x, y, 1, P('M0 0c6-10 22-10 26 0-6 8-20 8-26 0z', '#689F38', 2), r)).join('') + ring(3, (k) => E(104 + k * 10, 122, 4, 5, '#FFF8E1', 1.5)) + ring(5, (k) => C(56 + k * 14, 126 + (k % 2) * 3, 1.8, '#212121', 0))
      + Lc('M60 86q-8-12 0-24M100 82q-8-12 0-24', '#B0BEC5', 4)
      + E(190, 190, 40, 14, '#FFFFFF') + P('M160 184c0-30 60-30 60 0z', '#FAFAFA') + ring(6, (k) => E(170 + k * 8, 172 + (k % 2) * 6, 3, 2, '#E0E0E0', 1)) + face(90, 160, 0.44)),
  K('ph.food.taho', 'ตาโฮ เต้าหู้นิ่มราดน้ำเชื่อมกับสาคู', 'Taho, warm silken tofu with syrup and sago', ['taho', 'ตาโฮ', 'silken tofu', 'เต้าหู้นิ่ม', 'arnibal syrup', 'น้ำเชื่อมน้ำตาลทรายแดง', 'sago pearls', 'สาคู', 'magtataho', 'morning snack'],
    // a shoulder pole with two shiny aluminium buckets hanging from it, and in front a clear cup of white silken tofu topped with brown syrup and round sago pearls, a little spoon
    Lc('M10 60q110-20 220 0', '#C9A15A', 7) + [[46], [194]].map(([x]) => Lc(`M${x - 18} 58l-6 40M${x + 18} 58l6 40`, '#8D6E63', 2.5) + P(`M${x - 30} 100h60l-6 70h-48z`, '#CFD8DC') + E(x, 100, 30, 8, '#B0BEC5') + Lc(`M${x - 28} 124h56M${x - 26} 150h52`, '#ECEFF1', 3)).join('')
      + g(120, 196, 1, P('M-34-50h68l-8 70h-52z', '#F1F8FF') + P('M-30-24h60l-6 44h-48z', '#FFFDF5', 0) + P('M-32-42h64l-2 18h-60z', '#A0602F', 0) + ring(6, (k) => C(-20 + k * 8, -36 + (k % 2) * 6, 4, '#E8D9C0', 1.5)) + P('M-34-50h68l-8 70h-52z', 'none') + face(0, 0, 0.4) + Lc('M14-50l14-30', '#FF7043', 4))),
  K('ph.culture.bahaykubo', 'บาไฮกูโบ บ้านกระท่อมไม้ไผ่หลังคาจากของฟิลิปปินส์', 'A bahay kubo, the Filipino nipa hut', ['bahay kubo', 'บาไฮกูโบ', 'nipa hut', 'กระท่อมจาก', 'bamboo house', 'บ้านไม้ไผ่', 'stilt house', 'บ้านใต้ถุนสูง', 'filipino village', 'vegetable garden'],
    // a small square hut of woven bamboo on stilts with a steep thatched nipa roof, a window propped open with a stick, a bamboo ladder, vegetables growing round it (squash, eggplant, beans)
    sky('#E8F5E9') + R(-4, 190, 248, 54, '#A5D6A7', 0, 0)
      + ring(4, (k) => Lc(`M${66 + k * 36} 150v50`, '#8D6E63', 6)) + R(56, 98, 128, 56, '#E6C27A') + ring(6, (k) => Lc(`M56 ${106 + k * 8}h128`, '#C9A15A', 2)) + ring(8, (k) => Lc(`M${64 + k * 16} 98v56`, '#D4AE62', 2))
      + P('M36 102l84-66 84 66z', '#B08D57') + ring(5, (k) => Lc(`M${56 + k * 16} ${90 - k * 3}l16-12`, '#8D6E3F', 2.5)) + R(130, 112, 34, 26, '#5D4037', 0, 2.5) + P('M130 112l-6-16h46l-6 16z', '#D4AE62') + Lc('M136 112l-8 12', '#6D4C41', 3)
      + R(80, 116, 26, 38, '#6D4C41', 0, 2.5) + Lc('M84 154l-10 40M102 154l-6 40M78 166h22M76 180h22', '#A1673F', 3)
      + C(30, 196, 14, '#FFB74D') + E(210, 200, 8, 16, '#7E57C2') + Lc('M196 190c4-20 10-30 20-40', '#43A047', 3) + C(46, 214, 8, '#E53935') + face(120, 130, 0.36)),
  K('ph.culture.yoyo', 'โยโย่ของเล่นไม้ของฟิลิปปินส์', 'A wooden yo-yo, a Filipino toy', ['yo-yo', 'yoyo', 'โยโย่', 'wooden toy', 'ของเล่นไม้', 'filipino toy', 'ของเล่นฟิลิปปินส์', 'string toy', 'laruan', 'spinning toy'],
    // a child's hand at the top letting a round wooden yo-yo spin down its string, the yo-yo painted in red, yellow and blue rings with a little face, curved spin lines round it, a second yo-yo resting below
    g(120, 40, 1, P('M-20 0c0-18 40-18 40 0v10c0 10-40 10-40 0z', '#FFE0BD') + Lc('M-14-2v-10M-4-4v-12M6-4v-12M14-2v-8', '#FFE0BD', 6)) + Lc('M120 50v70', '#424242', 2.5)
      + C(120, 146, 34, '#E53935', 4) + C(120, 146, 24, '#FFC107', 0) + C(120, 146, 13, '#1E88E5', 0) + C(120, 146, 4, '#5D4037', 0) + face(120, 140, 0.3)
      + Lc('M76 120q-10 26 0 52M164 120q10 26 0 52M66 128q-6 18 0 36M174 128q6 18 0 36', '#90CAF9', 3)
      + g(184, 206, 1, E(0, 0, 26, 12, '#43A047') + E(0, -4, 26, 12, '#81C784') + C(0, -4, 6, '#FFEB3B', 2))),

  // ---------- Boracay
  L('ph/boracay/landmark-mermaid.v1.svg', 'เรียนว่ายน้ำแบบนางเงือกที่โบราไกย์', 'A mermaid swimming class at Boracay', ['mermaid class', 'เรียนว่ายน้ำนางเงือก', 'mermaid tail', 'หางนางเงือก', 'mermaid swim', 'ว่ายน้ำแบบนางเงือก', 'swimming lesson', 'บทเรียนว่ายน้ำ', 'clear water', 'boracay activity'], 'หาหางปลาสีรุ้งที่เด็กสวมอยู่', 'Find the rainbow fish tail the child is wearing',
    // a child in a shimmering mermaid tail swimming underwater through clear turquoise water, bubbles rising, little fish and the sandy floor with shells
    sky('#4DD0E1') + Lc('M-4 30q30-10 60 0t60 0 60 0 60 0 60 0', '#B2EBF2', 6) + R(-4, 206, 248, 38, '#FFE9B8', 0, 0) + E(40, 212, 10, 6, '#F8BBD0', 2) + E(200, 216, 8, 5, '#FFFFFF', 2)
      + g(120, 124, 1, P('M-20-4c30-10 60-6 80 10 10 8 26 4 34-6l4 26c-12 6-26 4-36-6-20 12-50 14-82-2z', '#26C6DA') + ring(5, (k) => P(`M${-8 + k * 14} 0q6 8 0 16`, 'none', 0) + Lc(`M${-8 + k * 14} 2q6 8 0 14`, '#80DEEA', 2.5))
        + P('M98 2l22-20-4 26 10 22-26-8z', '#AB47BC') + Lc('M100 4l14-10M104 14l14 4', '#CE93D8', 2.5)
        + C(-40, -6, 16, '#FFE0BD', 3) + P('M-56-12c0-20 30-24 36-4-6-4-26 4-36 4z', '#5D4037') + Lc('M-56-6c-10 6-14 16-10 24', '#5D4037', 6) + Lc('M-26 8l-20 20M-24 0l-34-18', '#FFE0BD', 6) + face(-40, -4, 0.3) + R(-30, -10, 16, 14, '#F48FB1', 4, 2))
      + ring(5, (k) => C(66 + (k % 2) * 6, 90 - k * 14, 3 + (k % 2) * 2, '#E0F7FA', 2)) + g(196, 72, 1, E(0, 0, 12, 7, '#FFB300') + P('M-12 0l-8-6v12z', '#FFB300', 2) + C(5, -1, 1.6, '#212121', 0))),
  L('ph/boracay/landmark-hairbraids.v1.svg', 'ถักเปียลูกปัดริมหาดโบราไกย์', 'Beaded beach braids on Boracay', ['hair braiding', 'ถักเปีย', 'beach braids', 'ถักผมริมหาด', 'beaded braids', 'เปียลูกปัด', 'cornrows', 'white beach', 'หาดทรายขาว', 'beach souvenir'], 'หาลูกปัดสีๆ ที่ปลายเปียแต่ละเส้น', 'Find the coloured beads at the end of each braid',
    // a child seen from behind sitting on the sand under a beach umbrella, hair in many thin braids each ending in bright beads, a little tray of beads and hair ties beside, the sea behind
    sky('#B3E5FC') + R(-4, 110, 248, 40, '#4FC3F7', 0, 0) + R(-4, 146, 248, 98, '#FFF3D6', 0, 0)
      + Lc('M190 220V60', '#8D6E63', 4) + P('M130 70c10-30 110-30 120 0z', '#FF7043') + ring(3, (k) => P(`M${130 + k * 40} 70q20-30 40 0`, '#FFCC80', 0))
      + g(100, 190, 1, P('M-34 50c0-40 10-60 34-60s34 20 34 60z', '#FFCA28') + C(0, -26, 30, '#5D4037', 4)
        + ring(8, (k) => { const x = -26 + k * 7.5, ex = Math.round(x * 1.3); return Lc(`M${x} -30Q${x + (k % 2 ? 3 : -3)} -6 ${ex} 14`, '#4E342E', 4) + C(ex, 18, 4.5, ['#E53935', '#1E88E5', '#FFEB3B', '#43A047', '#EC407A'][k % 5], 1.5); }) + E(-30, -22, 6, 9, '#FFE0BD', 2.5) + E(30, -22, 6, 9, '#FFE0BD', 2.5))
      + g(176, 222, 1, R(-26, -10, 52, 16, '#A1673F', 4) + ring(6, (k) => C(-18 + k * 7, -10, 3.5, ['#E53935', '#1E88E5', '#FFEB3B', '#43A047', '#EC407A', '#AB47BC'][k], 1.5)) + face(0, 0, 0.26))),
  L('ph/boracay/landmark-mountluho.v1.svg', 'จุดชมวิวยอดเขาลูโฮ เห็นทะเลสองฝั่งของเกาะ', 'Mount Luho lookout, with the sea on both sides of the island', ['mount luho', 'ภูเขาลูโฮ', 'luho view deck', 'จุดชมวิวลูโฮ', 'highest point', 'จุดสูงสุดของเกาะ', 'island view', 'วิวทั้งเกาะ', 'lookout tower', 'หอชมวิว'], 'หาหอชมวิวเล็กๆ บนยอดเขาที่มีทะเลอยู่ทั้งสองข้าง', 'Find the little lookout tower on the hill with sea on both sides',
    // a slim green island seen from above at an angle, a hill in its middle topped by a wooden lookout tower, white beaches on both edges, turquoise sea all round, a child with binoculars on the deck
    sky('#4DD0E1') + Lc('M10 40q20-6 40 0M180 50q20-6 40 0M20 210q20-6 40 0', '#B2EBF2', 3)
      + P('M70 240c-10-60 0-140 30-200 20-30 50-20 60 10 20 60 20 140 10 190z', '#FFF3D6') + P('M80 236c-8-56 0-130 26-186 16-26 40-18 48 8 18 58 18 130 8 178z', '#66BB6A')
      + P('M90 170c10-40 30-60 40-60s30 20 36 60z', '#43A047') + ring(4, (k) => C(94 + k * 14, 200 + (k % 2) * 8, 8, '#2E7D32')) + palm(84, 120, 40) + palm(158, 90, 36, -1)
      + g(130, 104, 1, Lc('M-14 40l6-40M14 40l-6-40M-12 20h24', '#8D6E63', 4) + R(-20, -6, 40, 10, '#A1673F', 2) + P('M-24-6l24-20 24 20z', '#C62828') + kid(4, -8, '#FFCA28', 0.7) + Lc('M8-24l10-4', '#212121', 3))
      + face(124, 160, 0.3)),
  L('ph/boracay/landmark-etrike.v1.svg', 'รถสามล้อไฟฟ้าอีไทรค์ของโบราไกย์', 'A Boracay e-trike, the island\'s electric tricycle', ['e-trike', 'อีไทรค์', 'electric tricycle', 'สามล้อไฟฟ้า', 'boracay transport', 'รถโดยสารโบราไกย์', 'tricycle', 'trike', 'island ride', 'main road'], 'หาล้อสามล้อของรถคันเล็กสีเขียว', 'Find the three wheels of the little green ride',
    // a cute green electric tricycle with a rounded cab roof, open sides with bench seats, a big headlight face at the front and three wheels, palm trees along the road
    sky('#E1F5FE') + R(-4, 190, 248, 54, '#BDBDBD', 0, 0) + Lc('M-4 214h40M70 214h40M140 214h40M210 214h40', '#FFFFFF', 4) + palm(30, 190, 110) + palm(214, 190, 100, -1)
      + P('M50 180V100c0-20 20-30 50-30h60c20 0 30 14 30 30v80z', '#43A047') + P('M40 100c10-34 140-38 160-4z', '#2E7D32') + R(64, 104, 46, 50, '#E8F5E9', 6, 3) + R(118, 104, 46, 50, '#E8F5E9', 6, 3)
      + R(70, 130, 34, 10, '#FFCA28', 3, 2) + R(124, 130, 34, 10, '#FFCA28', 3, 2) + kid(140, 128, '#FF7043', 0.7)
      + R(176, 110, 22, 50, '#66BB6A', 6) + C(196, 128, 10, '#FFF59D', 3) + Lc('M50 172h150', '#1B5E20', 4)
      + [[74], [176]].map(([x]) => C(x, 186, 18, '#37474F', 4) + C(x, 186, 7, '#B0BEC5', 0)).join('') + C(130, 190, 14, '#37474F', 4)
      + face(88, 130, 0.36)),

  // ---------- Bohol and Cebu
  L('ph/bohol/landmark-hinagdanan.v1.svg', 'ถ้ำฮินักดานันกับสระน้ำใสในถ้ำ', 'Hinagdanan Cave and its clear underground pool', ['hinagdanan cave', 'ถ้ำฮินักดานัน', 'cave pool', 'สระในถ้ำ', 'panglao', 'ปังเลา', 'dauis', 'stalactites', 'หินย้อย', 'cave swim'], 'หาแสงอาทิตย์ที่ส่องลงมาจากรูบนเพดานถ้ำ', 'Find the sunbeam shining down through the hole in the cave roof',
    // the inside of a dark cave with stalactites hanging from the roof, a round hole letting a beam of sunlight fall onto a clear blue pool, a wooden ladder down, a child floating in the water
    sky('#4E342E') + P('M-4-4h248v60c-20 10-30 30-50 30s-20-20-40-20-20 16-40 16-30-20-50-20-30 30-68 20z', '#3E2723') + ring(7, (k) => P(`M${14 + k * 34} ${60 + (k % 2) * 16}l8 30 8-30z`, '#6D4C41', 2.5))
      + E(130, 20, 22, 10, '#FFF59D') + P('M112 22l-34 150h110l-36-150z', '#FFF9C4', 0)
      + E(120, 190, 106, 40, '#29B6F6') + E(120, 186, 90, 30, '#4FC3F7', 0) + P('M90 160l20 14h30l20-14z', '#B3E5FC', 0) + Lc('M60 196q20-6 40 0M140 206q20-6 40 0', '#E1F5FE', 3)
      + Lc('M30 90l14 110M56 90l14 110M34 120h26M38 150h26M42 180h26', '#A1673F', 4)
      + g(136, 180, 1, E(0, 6, 22, 7, '#FF7043', 3) + C(0, -4, 9, '#FFE0BD', 2.5) + face(0, -4, 0.24)) + face(120, 210, 0.3)),
  L('ph/bohol/landmark-mahogany.v1.svg', 'อุโมงค์ป่ามะฮอกกานีปลูกที่บีลาร์', 'The mahogany forest tunnel at Bilar', ['bilar man-made forest', 'ป่าปลูกบีลาร์', 'mahogany forest', 'ป่ามะฮอกกานี', 'bilar', 'บีลาร์', 'tree tunnel', 'อุโมงค์ต้นไม้', 'loboc road', 'forest drive'], 'หาต้นไม้สูงตรงที่โค้งเข้าหากันเหนือถนน', 'Find the tall straight trees leaning together over the road',
    // a straight road running between rows of very tall straight red-brown mahogany trunks whose dark green tops meet overhead like a tunnel, dappled light on the road, a small car driving through
    sky('#1B5E20') + P('M-4 70c40-40 80-50 124-50s90 10 128 50V-4H-4z', '#2E7D32') + ring(6, (k) => C(10 + k * 44, 30 + (k % 2) * 16, 30, '#388E3C'))
      + P('M100 244l14-170h12l14 170z', '#9E9E9E') + R(-4, 200, 248, 44, '#558B2F', 0, 0) + P('M84 244l30-170h12l30 170z', '#9E9E9E') + Lc('M120 90v20M120 130v24M120 176v30', '#FFFFFF', 3)
      + ring(5, (k) => { const x = 10 + k * 18, w = 14 - k * 2; return R(x, 40 + k * 8, w, 200 - k * 10, '#8D4F33', 0, 3); })
      + ring(5, (k) => { const x = 214 - k * 18, w = 14 - k * 2; return R(x - w, 40 + k * 8, w, 200 - k * 10, '#8D4F33', 0, 3); })
      + ring(5, (k) => E(100 + (k % 2) * 30, 120 + k * 22, 8, 3, '#FFF59D', 0)) + g(120, 200, 1, R(-18, -14, 36, 22, '#E53935', 6) + R(-12, -10, 24, 8, '#E1F5FE', 2, 2) + C(-10, 8, 5, '#212121', 2) + C(10, 8, 5, '#212121', 2) + face(0, 0, 0.2))),
  L('ph/bohol/landmark-peanutkisses.v1.svg', 'พีนัทคิสเซส คุกกี้ถั่วรูปเนินช็อกโกแลตของโบโฮล', 'Peanut kisses, Bohol\'s Chocolate Hills cookies', ['peanut kisses', 'พีนัทคิสเซส', 'peanut cookies', 'คุกกี้ถั่ว', 'bohol pasalubong', 'ของฝากโบโฮล', 'chocolate hills shape', 'รูปเนินช็อกโกแลต', 'meringue', 'peanut'], 'หาคุกกี้ทรงเนินเขาเล็กๆ ที่มีถั่วติดอยู่', 'Find the little hill-shaped cookies with peanut bits',
    // a row of little cone-shaped peanut meringue cookies shaped like the Chocolate Hills on a tray, peanut bits on them, two whole peanuts in their shells and the real brown hills far behind
    sky('#E3F2FD') + ring(5, (k) => E(16 + k * 52, 96, 30, 22, '#A1887F', 3)) + R(-4, 100, 248, 30, '#9CCC65', 0, 0)
      + R(10, 150, 220, 56, '#FFFFFF', 10) + R(10, 196, 220, 10, '#ECEFF1', 4, 3)
      + ring(5, (k) => { const x = 36 + k * 42; return P(`M${x - 18} 186c0-22 10-36 18-40 8 4 18 18 18 40z`, '#D9A066') + ring(3, (j) => E(x - 6 + j * 6, 172 + (j % 2) * 8, 2.5, 1.6, '#8D5524', 0)); })
      + face(120, 176, 0.32)
      + [[46, 226, 10], [196, 228, -10]].map(([x, y, r]) => g(x, y, 1, P('M-16 0c0-10 10-12 16-6 6-6 16-4 16 6s-10 12-16 6c-6 6-16 4-16-6z', '#E6C27A') + Lc('M-10-2h4M6-2h4', '#C9A15A', 2), r)).join('')),
  L('ph/bohol/landmark-otap.v1.svg', 'โอตัป ขนมปังกรอบเป็นชั้นรูปวงรีของเซบู', 'Otap, Cebu\'s flaky oval biscuits', ['otap', 'โอตัป', 'cebu otap', 'ขนมโอตัปเซบู', 'puff pastry biscuit', 'ขนมปังกรอบ', 'flaky layers', 'เนื้อกรอบเป็นชั้น', 'cebu pasalubong', 'ของฝากเซบู'], 'หาเกล็ดน้ำตาลที่เคลือบอยู่บนขนมรูปวงรี', 'Find the sugar sparkles on the oval biscuits',
    // a stack of thin oval puff-pastry biscuits with crinkly flaky edges and a sugar glaze, one snapped in half showing its many layers, crumbs around, a paper wrapper underneath
    P('M20 170l30-40h150l20 40z', '#FFF8E1') + Lc('M40 150h170', '#E57373', 3)
      + ring(4, (k) => E(116, 160 - k * 14, 74, 22, ['#E8B04B', '#F2C14E', '#E8B04B', '#F6D08A'][k])) + ring(10, (k) => C(60 + k * 12, 112 - (k % 2) * 6, 2, '#FFFFFF', 0)) + Lc('M48 110c20 8 40-4 60 4s40-6 76 2', '#D9952E', 2.5)
      + g(196, 86, 1, P('M-34 0c0-16 30-22 46-16l-8 34c-20 0-38-6-38-18z', '#F2C14E') + ring(4, (k) => Lc(`M${2 - k * 2} ${-14 + k * 7}l-6 0`, '#D9952E', 2)), -10)
      + ring(5, (k) => C(40 + k * 40, 200 + (k % 2) * 6, 3, '#E8B04B', 1.5)) + face(116, 116, 0.38)),
  L('ph/bohol/landmark-canyoneering.v1.svg', 'แคนยอนเนียริงในลำธารสีฟ้าที่บาเดียน เซบู', 'Canyoneering down the turquoise river at Badian, Cebu', ['canyoneering', 'แคนยอนเนียริง', 'badian', 'บาเดียน', 'kawasan', 'คาวาซาน', 'turquoise river', 'ลำธารสีฟ้า', 'canyon jump', 'life jacket'], 'หาเด็กใส่หมวกกันน็อกและเสื้อชูชีพที่ลอยตามน้ำ', 'Find the child in a helmet and life jacket floating down the river',
    // a narrow canyon with mossy rock walls and ferns, bright turquoise water running between them, a child in a red helmet and orange life jacket floating on their back, another standing on a rock ready to jump
    sky('#E8F5E9') + P('M-4-4h80c-10 60 10 120-10 248H-4z', '#8D6E63') + P('M244-4h-80c10 60-10 120 10 248h70z', '#8D6E63') + Lc('M20 40c10 4 20 0 30 6M196 60c10 4 20 0 30 6M14 140c10 4 20 0 30 6', '#689F38', 6)
      + ring(4, (k) => P(`M${70 - (k % 2) * 4} ${30 + k * 50}q-20 -10 -24 6`, '#43A047', 4) + P(`M${170 + (k % 2) * 4} ${40 + k * 50}q20 -10 24 6`, '#43A047', 4))
      + P('M70 -4h100c-14 60 10 120-6 248H76c-12-120 10-180-6-248z', '#26C6DA') + Lc('M90 60q20-6 40 0M100 120q20-6 40 0M90 190q20-6 40 0', '#B2EBF2', 4)
      + g(116, 150, 1, E(0, 0, 26, 12, '#FF9800', 3) + C(-26, -2, 9, '#FFE0BD', 2.5) + P('M-34-4c0-12 16-12 16 0z', '#E53935', 2) + Lc('M22 0l20 6M18-8l18-10', '#FFE0BD', 5) + face(-26, -1, 0.22), -10)
      + g(196, 108, 1, E(0, 30, 20, 8, '#757575') + kid(0, 26, '#FF9800', 0.9) + P('M-8 -2c0-10 16-10 16 0z', '#E53935', 2))),
];

export default { places: {}, items };
