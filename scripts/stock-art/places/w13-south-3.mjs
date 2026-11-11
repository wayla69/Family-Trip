// Wave 13, Thailand (deep south): Trang and its islands — the city stamp, two day scenes and the place's own landmarks:
// the famous Trang breakfast (roast pork, the ring cake, pa thong ko), Kantang at the end of the line, the Andaman islands
// and the sea animals around Koh Ngai, Koh Mook, Koh Kradan and Koh Libong
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const TR = { k1: '#C2185B', k2: '#2E7D32', k3: '#FFF3E0' };
const CITY = 'th-trang', DIR = 'th/trang';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a limestone island: steep grey sides, a cap of jungle (x = centre, b = waterline, w = half width, h = height)
const karst = (x, b, w, h) => P(`M${x - w} ${b}c${w * 0.1}-${h * 0.6} ${w * 0.2}-${h * 0.9} ${w * 0.5}-${h}h${w}c${w * 0.3} ${h * 0.1} ${w * 0.4} ${h * 0.4} ${w * 0.5} ${h}z`, '#B0BEC5')
  + P(`M${x - w * 0.55} ${b - h + 4}c${w * 0.2}-${h * 0.25} ${w * 0.9}-${h * 0.3} ${w * 1.1} 0z`, '#43A047');
const waves = (x, y, n = 3, c = '#E1F5FE') => Lc(`M${x} ${y}` + 'q5-4 10 0t10 0'.repeat(n), c, 3);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับตรัง', 'Trang stamp'), kw: ['trang', 'ตรัง', 'trang cake', 'เค้กเมืองตรัง', 'trang islands', 'ทะเลตรัง', 'koh mook', 'เกาะมุก'],
    // the famous Trang ring cake with a hole in the middle, a slice cut out, a little limestone island behind
    svg: cityStamp('tr-st', { name: 'TRANG', sub: 'ANDAMAN · THAILAND', ...TR, emblem: P('M112 96c2-20 8-30 16-34h12c6 6 8 20 8 34z', '#B0BEC5', 2.5) + P('M118 66c6-6 18-6 24 0z', '#43A047', 2.5)
      + E(92, 126, 34, 10, '#FFFFFF', 2.5) + P('M60 120c0-26 64-26 64 0v-2c0 12-64 12-64 2z', '#A1522E', 3) + R(60, 106, 64, 16, '#A1522E', 0, 0) + E(92, 106, 32, 10, '#C77C48', 3) + E(92, 106, 9, 3.5, '#FFF7F2', 2.5)
      + P('M92 106l20-6v16l-20 6z', '#FFE082', 2.5) }) },

  D('islands', 'ทะเลตรัง เกาะไหง เกาะมุก เกาะกระดาน', 'The islands of the Trang sea', ['trang islands', 'ทะเลตรัง', 'koh ngai', 'เกาะไหง', 'koh mook', 'เกาะมุก', 'koh kradan', 'เกาะกระดาน', 'island hopping', 'เที่ยวเกาะ', 'andaman sea', 'ทะเลอันดามัน'],
    // a sunny sea dotted with tall limestone islands capped in jungle, white beaches at their feet, a small boat in clear turquoise water
    scene('tr-d1', '#B3E5FC', C(60, 54, 16, '#FFF59D', 3) + R(-4, 118, 248, 130, '#29B6F6') + karst(70, 132, 34, 54) + karst(170, 128, 44, 74) + karst(220, 124, 18, 30)
      + E(170, 134, 52, 8, '#FFF8E1') + E(70, 136, 40, 7, '#FFF8E1') + P('M-4 170c60-10 180-10 248 0v80H-4z', '#4DD0E1')
      + P('M90 190h64l-8 14h-48z', '#FFFFFF') + Lc('M104 190v-24', '#8D6E63', 4) + face(122, 196, 0.25) + waves(30, 214) + waves(170, 220) + face(170, 96, 0.3))),

  D('breakfast', 'มื้อเช้าเมืองตรัง', 'A Trang breakfast morning', ['trang breakfast', 'อาหารเช้าเมืองตรัง', 'morning tea shop', 'ร้านน้ำชาตอนเช้า', 'roast pork and dim sum', 'หมูย่างกับติ่มซำ', 'round marble table', 'โต๊ะหินอ่อนกลม', 'trang town', 'ตัวเมืองตรัง'],
    // an old shophouse tea shop open to the street in the morning sun: a hanging roast pork, a stack of bamboo steamers, a round table with cake and dough sticks
    scene('tr-d2', '#FFE0B2', C(196, 46, 14, '#FFF59D', 3) + R(20, 40, 200, 160, '#FFF8E1') + P('M10 44l110-30 110 30z', '#C62828') + R(30, 64, 180, 16, '#C2185B') + Lc('M60 72h120', '#FFE082', 3)
      + Lc('M60 80v14', INK, 3) + R(40, 94, 40, 48, '#FFCCBC', 4) + R(40, 94, 40, 12, '#B33A1E', 4) + Lc('M40 124h40', '#FFF8E1', 4) + [0, 1, 2].map((k) => R(152, 120 - k * 18, 44, 18, '#D7A86E', 4)).join('')
      + E(110, 176, 64, 16, '#ECEFF1') + R(104, 190, 12, 40, '#BDBDBD') + P('M80 170c0-14 30-14 30 0z', '#A1522E') + Lc('M124 164l26 8M126 172l26 8', '#E0A030', 6)
      + face(110, 110, 0.4))),

  L('mooyang', 'หมูย่างเมืองตรัง', 'Trang roast pork with crackling skin', ['moo yang trang', 'หมูย่างเมืองตรัง', 'crispy roast pork', 'หมูย่างหนังกรอบ', 'crackling skin', 'หนังกรอบ', 'trang breakfast', 'อาหารเช้าตรัง', 'chopsticks', 'ตะเกียบ'], nm('หาหนังหมูสีแดงที่กรอบพองเป็นเม็ด', 'Find the bubbly red-brown crackling skin'),
    // a white plate of chunky roast pork pieces in a row, each with a bubbly red-brown crackling top, pale meat and a layer of fat, a pair of chopsticks resting on the plate
    P('M14 170c20-30 190-30 212 0-20 30-192 30-212 0z', '#81C784') + E(120, 170, 92, 26, '#FFFFFF') + [[60, 156], [120, 150], [180, 156]].map(([x, y]) => R(x - 28, y - 22, 56, 46, '#FFCCBC', 6) + R(x - 28, y + 2, 56, 8, '#FFF8E1', 0, 2.5)
      + R(x - 30, y - 34, 60, 16, '#B33A1E', 6) + [-18, -6, 6, 18].map((d) => C(x + d, y - 30, 3.5, '#E65100', 1.5)).join('')).join('')
    + face(120, 156, 0.4) + Lc('M150 214L226 96M160 218L232 104', '#8D6E63', 5)),

  L('ringcake', 'เค้กเมืองตรังมีรูตรงกลาง', 'The Trang ring cake with a hole in the middle', ['trang cake', 'เค้กเมืองตรัง', 'ring sponge cake', 'เค้กมีรู', 'cake with a hole', 'เค้กรูตรงกลาง', 'trang souvenir', 'ของฝากตรัง', 'soft yellow crumb', 'เนื้อเค้กนุ่มสีเหลือง'], nm('หารูกลมตรงกลางเค้ก', 'Find the round hole in the middle of the cake'),
    // a tall golden-brown ring cake on a paper-lined board with a slice cut out showing soft yellow inside, the round hole in the middle, a loose slice in front
    R(20, 168, 200, 24, '#FFFFFF', 8) + P('M40 170V108c0-30 160-30 160 0v62c0 24-160 24-160 0z', '#A1522E') + E(120, 108, 80, 24, '#C77C48')
    + E(120, 106, 22, 8, '#FFF7F2', 3) + P('M120 114l60 12v64l-60-10z', '#FFE082', 3) + Lc('M126 126l46 8M126 146l46 8', '#FFD54F', 2)
    + face(80, 146, 0.45) + P('M164 200l40-14 18 20-40 12z', '#FFE082') + P('M164 200l40-14 0-8-40 14z', '#A1522E', 3)),

  L('patongko', 'ปาท่องโก๋กับสังขยาใบเตย', 'Pa thong ko dough sticks with pandan custard', ['pa thong ko', 'ปาท่องโก๋', 'chinese dough sticks', 'แป้งทอดคู่', 'pandan custard dip', 'สังขยาใบเตย', 'trang breakfast', 'อาหารเช้าตรัง', 'morning snack', 'ของว่างตอนเช้า'], nm('หาปาท่องโก๋ที่ติดกันเป็นคู่', 'Find the dough sticks stuck together in a pair'),
    // three pairs of puffy golden fried dough sticks joined down the middle, criss-crossed on a plate, a small bowl of bright green pandan custard to dip
    E(100, 160, 90, 34, '#FFFFFF') + [[-20, 70, 136], [0, 100, 146], [16, 130, 136]].map(([r, x, y]) => `<g transform="rotate(${r} ${x} ${y})">` + R(x - 14, y - 46, 14, 92, '#F5A623', 7) + R(x, y - 46, 14, 92, '#F5A623', 7)
      + Lc(`M${x - 7} ${y - 30}v60M${x + 7} ${y - 30}v60`, '#E08A10', 2) + '</g>').join('') + face(100, 140, 0.4)
    + E(196, 186, 30, 12, '#FFFFFF') + P('M168 180c0-14 56-14 56 0z', '#8BC34A') + face(196, 172, 0.25)),

  L('kantang', 'สถานีรถไฟกันตัง สุดปลายทาง', 'Kantang station at the very end of the line', ['kantang railway station', 'สถานีรถไฟกันตัง', 'end of the line', 'สุดปลายทางรถไฟ', 'old wooden station', 'สถานีไม้เก่า', 'buffer stop', 'ที่กั้นปลายราง', 'kantang town', 'เมืองกันตัง'], nm('หาที่กั้นสีแดงตรงปลายรางรถไฟ', 'Find the red stop at the end of the rails'),
    // a small yellow wooden station with a brown tiled gable roof and white trim, green shutters, a platform, the rails running in and ending at a red-and-white buffer
    R(60, 100, 120, 70, '#FFE082') + P('M48 104l72-44 72 44z', '#8D6E63') + P('M108 84h24l-12-12z', '#FFFFFF', 2.5) + [78, 150].map((x) => R(x - 10, 116, 20, 26, '#43A047', 2, 3) + Lc(`M${x} 116v26`, INK, 2)).join('')
    + R(108, 120, 24, 50, '#6D4C41', 2) + face(120, 104, 0.3) + R(20, 170, 200, 12, '#BDBDBD', 2) + Lc('M10 204h190M10 218h190', '#8D6E63', 4) + [20, 50, 80, 110, 140, 170].map((x) => R(x, 198, 10, 26, '#A1887F', 2, 2)).join('')
    + R(200, 192, 26, 30, '#E53935', 3) + Lc('M204 202h18M204 212h18', '#FFFFFF', 3)),

  L('ratsadahouse', 'บ้านพระยารัษฎาฯ ที่กันตัง', 'Phraya Ratsada\'s old wooden house in Kantang', ['phraya ratsadanupradit house', 'จวนพระยารัษฎานุประดิษฐ์', 'kantang old house', 'บ้านเก่ากันตัง', 'wooden house museum', 'พิพิธภัณฑ์บ้านไม้', 'veranda', 'ระเบียงบ้าน', 'trang history', 'ประวัติศาสตร์ตรัง'], nm('หาระเบียงไม้ที่ล้อมรอบชั้นบน', 'Find the wooden veranda round the top floor'),
    // a two-storey teak-brown wooden house on a raised base, a wide hipped roof, an upstairs veranda with a white railing running round it, tall windows and a central stair
    R(26, 178, 188, 22, '#E0E0E0') + R(40, 126, 160, 52, '#A1887F') + R(30, 120, 180, 8, '#8D6E63') + R(40, 76, 160, 44, '#BCAAA4') + P('M24 80l40-36h112l40 36z', '#6D4C41')
    + Lc('M30 120h180', INK, 3) + [44, 64, 84, 104, 124, 144, 164, 184, 204].map((x) => Lc(`M${x} 104v16`, '#FFFFFF', 3)).join('') + Lc('M30 104h180', '#FFFFFF', 4)
    + [64, 96, 144, 176].map((x) => R(x - 8, 136, 16, 30, '#4E342E', 2, 3)).join('') + R(104, 140, 32, 38, '#5D4037') + P('M100 200l8-22h24l8 22z', '#BDBDBD', 3) + face(120, 92, 0.38)),

  L('kohmeng', 'เกาะเม็งหน้าหาดปากเมง', 'Koh Meng, the tall rock island off Pak Meng beach', ['pak meng beach', 'หาดปากเมง', 'koh meng', 'เกาะเม็ง', 'limestone island', 'เกาะหินปูน', 'sunset over the sea', 'พระอาทิตย์ตกทะเล', 'beach casuarinas', 'สนทะเลริมหาด'], nm('หาเกาะหินสูงที่พระอาทิตย์กำลังตกข้างๆ', 'Find the tall rock island with the sun setting beside it'),
    // an orange sky, a tall steep-sided limestone island standing alone in the sea with a green cap, the sun half sunk beside it, a sandy beach in front
    R(10, 40, 220, 120, '#FFCC80', 20) + C(176, 138, 22, '#FF7043', 3) + R(10, 138, 220, 40, '#5C6BC0') + karst(100, 150, 40, 110) + face(100, 104, 0.45)
    + waves(30, 160, 3, '#C5CAE9') + waves(160, 164, 3, '#C5CAE9') + P('M10 176c60-12 160-12 220 0v28H10z', '#FFE0B2') + Lc('M210 200c-4-30 0-50 6-66', '#795548', 4) + C(216, 128, 10, '#2E7D32')),

  L('hoichaktin', 'หอยชักตีนลวกจิ้ม', 'Hoi chak teen, the shells that kick out a claw', ['hoi chak teen', 'หอยชักตีน', 'dog conch', 'หอยสังข์ชักตีน', 'seashell snack', 'หอยลวก', 'pull out with a toothpick', 'จิ้มไม้ดึงออกมา', 'andaman seafood', 'อาหารทะเลอันดามัน'], nm('หาขาหอยที่โค้งเหมือนเคียวยื่นออกมา', 'Find the curved claw foot poking out of a shell'),
    // a pile of cream-and-brown spiral conch shells on a plate, one tipped up with its curved sickle claw foot sticking out, a toothpick and a dish of red chilli dip
    E(110, 172, 96, 32, '#FFFFFF') + [[56, 152, -20], [100, 140, 10], [146, 154, 30]].map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})">` + P(`M${x - 24} ${y + 10}c-4-24 10-38 24-40 14-2 26 8 28 22-4 14-20 22-52 18z`, '#FFE0B2')
      + Lc(`M${x - 10} ${y - 20}l8 8 8-6 6 8`, '#A1887F', 3) + P(`M${x + 2} ${y + 14}c-8-6-20-4-24 4`, 'none', 2.5) + '</g>').join('') + P('M112 150c4-26 30-40 50-30-20 0-34 12-38 32z', '#4E342E') + face(100, 140, 0.35)
    + Lc('M180 92L130 140', '#D7A86E', 3) + E(196, 196, 22, 9, '#FFFFFF') + E(196, 193, 16, 5, '#E53935', 2.5)),

  L('nipa', 'ลูกจากเชื่อมหวาน จากต้นจาก', 'Luk jak, the sweet jelly seeds of the nipa palm', ['nipa palm fruit', 'ลูกจาก', 'nipa palm', 'ต้นจาก', 'sweet palm seeds', 'ลูกจากเชื่อม', 'mangrove palm', 'ปาล์มป่าชายเลน', 'kantang mangroves', 'ป่าชายเลนกันตัง'], nm('หาเมล็ดใสๆ ในถ้วยหวาน', 'Find the clear jelly seeds in the sweet cup'),
    // a big round brown nipa fruit head made of many angular segments on a stalk, one segment cut open showing white jelly flesh, and a glass cup of the sweet clear seeds in syrup
    Lc('M72 216V150', '#6D4C41', 6) + C(72, 104, 54, '#8D6E63') + Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; const x = 72 + Math.cos(a) * 36, y = 104 + Math.sin(a) * 36; return P(`M${x.toFixed(1)} ${(y - 12).toFixed(1)}l10 10-10 10-10-10z`, '#A1887F', 2.5); }).join('')
    + C(72, 104, 14, '#A1887F', 3) + face(72, 98, 0.45) + P('M128 120l26-6 8 22-26 6z', '#795548') + E(146, 126, 10, 6, '#FFFFFF', 2.5)
    + P('M154 150h64l-8 64h-48z', '#E1F5FE') + Lc('M158 172h56', '#B3E5FC', 3) + [[170, 186], [186, 196], [200, 184], [178, 202], [196, 204]].map(([x, y]) => E(x, y, 8, 6, '#FFFDE7', 2)).join('')),

  L('curlew', 'นกอีก๋อยปากโค้งบนหาดเลน', 'A curlew with its long curved beak on the mudflat', ['far eastern curlew', 'นกอีก๋อยตะโพกสีน้ำตาล', 'curlew', 'นกอีก๋อย', 'koh libong mudflats', 'หาดเลนเกาะลิบง', 'migrating shorebird', 'นกชายเลนอพยพ', 'long curved beak', 'ปากยาวโค้ง'], nm('หาปากยาวโค้งลงที่จิ้มลงในเลน', 'Find the long curved beak poking into the mud'),
    // a speckled brown shorebird on tall thin grey legs, a very long down-curved beak reaching to the shiny mud, little crab holes and its reflection in a puddle
    P('M10 190c60-12 160-12 220 0v28H10z', '#A1887F') + E(80, 206, 40, 6, '#B3E5FC', 2.5) + Lc('M100 176v-36M120 176v-36', '#78909C', 4) + Lc('M94 176h12M114 176h12', '#78909C', 4)
    + P('M70 110c10-34 60-40 90-16l40 6-40 14c-20 26-70 30-90-4z', '#C8A07A') + [[96, 104], [112, 112], [128, 104], [120, 124], [104, 122]].map(([x, y]) => C(x, y, 3, '#8D6E63', 0)).join('')
    + C(66, 88, 20, '#C8A07A') + Lc('M50 92c-16 10-24 40-20 86', '#5D4037', 5) + C(64, 82, 4, INK, 0) + C(63, 80, 1.5, '#fff', 0) + E(72, 92, 5, 3, '#FF8FA3', 0) + C(160, 196, 4, '#5D4037', 0) + C(190, 200, 4, '#5D4037', 0)),

  L('cuttlefish', 'หมึกกระดองยิ้มแป้นใต้ทะเล', 'A cuttlefish rippling its fins', ['cuttlefish', 'หมึกกระดอง', 'colour-changing sea animal', 'สัตว์ทะเลเปลี่ยนสี', 'rippling fins', 'ครีบพลิ้ว', 'koh ngai reef', 'แนวปะการังเกาะไหง', 'snorkelling', 'ดำน้ำตื้น'], nm('หาครีบที่พลิ้วเป็นคลื่นรอบตัว', 'Find the wavy fin running all round its body'),
    // a plump oval cuttlefish in soft pink with a wavy frilled fin all round it, short arms in front, big eyes with a wavy W pupil, little spots, bubbles
    E(130, 116, 74, 44, '#F8BBD0')
    + Lc('M64 80c10-6 16 6 26 0s16 6 26 0 16 6 26 0 16 6 26 0 16 6 26 0M64 152c10 6 16-6 26 0s16-6 26 0 16-6 26 0 16-6 26 0 16-6 26 0', '#F48FB1', 6)
    + E(130, 116, 66, 36, '#F48FB1') + [[150, 102], [176, 120], [160, 132], [190, 104]].map(([x, y]) => C(x, y, 4, '#EC407A', 0)).join('')
    + [-14, -6, 2, 10, 18].map((d) => Lc(`M60 ${116 + d}c-14 ${d * 0.4}-26 ${d * 0.8}-36 ${d * 1.4}`, '#F48FB1', 7)).join('') + C(84, 104, 12, '#FFFFFF') + Lc('M78 104q3-4 6 0t6 0', INK, 3)
    + E(98, 126, 7, 4.5, '#FF8FA3', 0) + P('M104 112q6 5 12 0', 'none', 3) + [[200, 60, 5], [212, 44, 4], [30, 70, 4]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2)).join('')),

  L('clearwater', 'เรือที่เหมือนลอยกลางอากาศ เกาะกระดาน', 'The boat that seems to float in the air at Koh Kradan', ['koh kradan', 'เกาะกระดาน', 'crystal clear water', 'น้ำใสแจ๋ว', 'floating boat', 'เรือลอยกลางอากาศ', 'boat shadow on the sand', 'เงาเรือบนพื้นทราย', 'clearest sea', 'ทะเลใสที่สุด'], nm('หาเงาของเรือที่อยู่บนพื้นทราย', 'Find the boat\'s shadow on the sandy sea floor'),
    // a see-through pale turquoise sea over cream sand, a little wooden boat at the top that seems to hang in the air, its dark shadow on the sand far below, starry ripples
    R(10, 30, 220, 186, '#B2EBF2', 22) + P('M10 150c60-10 160-10 220 0v66H10z', '#FFF3E0') + E(124, 186, 66, 10, '#4DB6AC', 0)
    + P('M50 92c20 14 120 14 150 0l-12 24H66z', '#FFB74D') + Lc('M54 96c30 10 110 10 142-2', '#E65100', 3) + Lc('M90 92V54', '#8D6E63', 4) + P('M92 56l40 30H92z', '#FFFFFF', 3)
    + face(130, 104, 0.32) + Lc('M30 60l10 4M190 50l10-4M40 140h14M180 136h16', '#FFFFFF', 3) + [[60, 170], [170, 166], [200, 196]].map(([x, y]) => C(x, y, 4, '#FFCC80', 2)).join('')),

  L('puffer', 'ปลาปักเป้าพองลมกลมดิ๊ก', 'A puffer fish blown up round as a ball', ['puffer fish', 'ปลาปักเป้า', 'blown up like a ball', 'พองตัวกลมดิ๊ก', 'spiky fish', 'ปลามีหนาม', 'look but do not touch', 'ดูอย่าจับ', 'andaman reef', 'แนวปะการังอันดามัน'], nm('หาหนามเล็กๆ รอบตัวปลา', 'Find the little spikes all over the fish'),
    // a fish puffed up into a big round ball, pale yellow with brown spots and little spikes all round, tiny fins and tail, a round surprised mouth, bubbles
    Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2; const x = 116 + Math.cos(a) * 72, y = 120 + Math.sin(a) * 72; return Lc(`M${(116 + Math.cos(a) * 62).toFixed(1)} ${(120 + Math.sin(a) * 62).toFixed(1)}L${x.toFixed(1)} ${y.toFixed(1)}`, INK, 4); }).join('')
    + C(116, 120, 66, '#FFF59D') + E(116, 154, 48, 24, '#FFFDE7', 0) + [[86, 86], [140, 82], [160, 110], [72, 112], [150, 140]].map(([x, y]) => C(x, y, 5, '#A1887F', 0)).join('')
    + P('M182 120l34-22v44z', '#FFF59D') + P('M120 186l-6 20 20-8z', '#FFF59D', 3) + face(108, 118, 0.7, 'o') + [[30, 60, 6], [40, 40, 4], [210, 190, 5]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2)).join('')),

  L('jellyfish', 'แมงกะพรุนพระจันทร์ ดูอย่าจับ', 'A moon jellyfish drifting by', ['moon jellyfish', 'แมงกะพรุนพระจันทร์', 'jellyfish', 'แมงกะพรุน', 'drifting in the sea', 'ลอยตามน้ำ', 'look but do not touch', 'ดูอย่าจับ', 'trang sea', 'ทะเลตรัง'], nm('หาวงกลมสี่วงบนหัวแมงกะพรุน', 'Find the four rings on top of the jellyfish'),
    // a see-through pale lilac bell with four pink rings on top, a frilly edge, long wavy thin tentacles and frilly arms hanging down, bubbles around it
    P('M50 110c0-50 30-76 70-76s70 26 70 76c-14 8-22-6-34 2s-24-8-36 0-24-8-36 0-20-10-34-2z', '#E1BEE7') + [[94, 76], [146, 76], [104, 100], [136, 100]].map(([x, y]) => C(x, y, 11, 'none', 3) + C(x, y, 8, '#F48FB1', 0)).join('')
    + face(120, 60, 0.38) + [70, 96, 144, 170].map((x) => Lc(`M${x} 112c-8 20 8 40 0 60s8 30 0 50`, '#CE93D8', 2.5)).join('')
    + [108, 132].map((x) => Lc(`M${x} 112c10 20-10 40 2 70`, '#BA68C8', 8)).join('') + [[30, 40, 5], [206, 150, 6], [214, 130, 3]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2)).join('')),

  L('lukniang', 'ลูกเนียงทั้งฝัก ผักเหนาะปักษ์ใต้', 'Luk niang, the big round beans of the south', ['luk niang', 'ลูกเนียง', 'djenkol beans', 'เนียง', 'southern side vegetable', 'ผักเหนาะ', 'eat with curry', 'กินกับแกงใต้', 'jungle bean pods', 'ฝักถั่วป่า'], nm('หาเมล็ดกลมสีน้ำตาลที่หลุดออกมาจากฝัก', 'Find the round brown beans out of their pod'),
    // a twisted dark purple-brown bean pod split open with fat round beans in a row, a few peeled ones pale yellow, on a green leaf
    P('M20 170c40-30 140-50 200-40-40 30-140 60-200 40z', '#7CB342') + Lc('M30 168c60-12 120-24 180-34', '#558B2F', 3)
    + P('M30 120c30-30 120-60 180-40-10 10-20 14-30 14-50 0-100 30-150 26z', '#5D4037') + [[64, 110], [98, 98], [132, 90], [166, 84]].map(([x, y]) => C(x, y, 15, '#8D6E63')).join('') + face(98, 98, 0.3)
    + [[80, 156], [120, 150], [160, 140]].map(([x, y]) => C(x, y, 15, '#FFF59D')).join('') + face(120, 150, 0.3)),

  L('cowrie', 'เปลือกหอยเบี้ยลายเสือมันวาว', 'A shiny tiger cowrie shell on the sand', ['tiger cowrie', 'หอยเบี้ยลายเสือ', 'cowrie shell', 'หอยเบี้ย', 'shiny spotted shell', 'เปลือกหอยมันวาว', 'shell on the beach', 'เปลือกหอยบนหาด', 'leave it on the beach', 'เก็บไว้ที่ชายหาด'], nm('หาร่องฟันเล็กๆ ใต้เปลือกหอย', 'Find the little toothy slit under the shell'),
    // a big glossy dome-shaped cowrie shell, cream with brown leopard spots and a white shine, the underside slit with tiny teeth, a smaller one turned over beside it, on pale sand
    P('M10 176c60-10 160-10 220 0v36H10z', '#FFE0B2') + E(110, 130, 82, 54, '#FFF3E0') + [[70, 110], [96, 96], [130, 98], [158, 116], [84, 140], [120, 128], [150, 148], [110, 160], [60, 146]].map(([x, y]) => C(x, y, 7, '#8D6E63', 0)).join('')
    + E(90, 100, 22, 8, '#FFFFFF', 0) + face(110, 132, 0.5)
    + E(196, 188, 30, 16, '#FFF8E1') + Lc('M172 188h48', '#6D4C41', 4) + Lc('M178 184v8M186 184v8M194 184v8M202 184v8M210 184v8', '#6D4C41', 1.5)),

  L('oilpalm', 'ทะลายปาล์มน้ำมันสีส้มแดง', 'An oil palm bunch, red and orange', ['oil palm', 'ปาล์มน้ำมัน', 'palm fruit bunch', 'ทะลายปาล์ม', 'southern plantation', 'สวนปาล์มภาคใต้', 'red and orange fruits', 'ผลปาล์มสีส้มแดง', 'palm tree rows', 'แถวต้นปาล์ม'], nm('หาผลปาล์มสีส้มที่เบียดกันเป็นทะลาย', 'Find the orange fruits packed into one big bunch'),
    // a short stout palm with arching fronds behind, and a big heavy bunch of shiny red-to-orange fruits packed tight together with spiky bits poking out in front
    R(40, 70, 26, 140, '#8D6E63', 6) + [[-60, 10], [-30, -30], [30, -30], [60, 10]].map(([dx, dy]) => Lc(`M53 70q${dx * 0.5} ${dy - 20} ${dx} ${dy + 20}`, '#43A047', 8)).join('')
    + E(140, 150, 62, 56, '#BF360C') + Array.from({ length: 18 }, (_, k) => C(98 + (k % 6) * 17, 112 + Math.floor(k / 6) * 26 + (k % 2) * 8, 10, k % 3 ? '#FF7043' : '#E53935', 2)).join('')
    + [[82, 120], [198, 130], [92, 186], [192, 180]].map(([x, y]) => Lc(`M${x} ${y}l${x < 140 ? -10 : 10} -4`, '#5D4037', 3)).join('') + face(140, 146, 0.45)),
  L('songhong', 'ทะเลสองห้องบนเขา', 'Thale Song Hong, the two-room lake in the hills', ['thale song hong', 'ทะเลสองห้อง', 'two-room lake', 'ทะเลสาบสองห้อง', 'lake in the hills', 'ทะเลสาบบนเขา', 'wooden pavilion', 'ศาลาไม้ริมน้ำ', 'huai yot', 'ห้วยยอด'], nm('หาทางแคบๆ ที่เชื่อมทะเลสาบสองห้อง', 'Find the narrow neck joining the two rooms of the lake'),
    // green forest hills round a lake shaped like two round rooms joined by a narrow neck, a little wooden pavilion on stilts at the edge, lily pads
    P('M10 200c0-80 40-140 110-140s110 60 110 140z', '#558B2F') + E(80, 140, 52, 36, '#4DD0E1') + E(164, 150, 46, 32, '#4DD0E1') + R(120, 138, 20, 18, '#4DD0E1', 0, 0)
    + Lc('M120 138h20M120 156h20', INK, 5) + R(60, 176, 40, 20, '#D7A86E') + P('M54 178l26-16 26 16z', '#8D6E63') + Lc('M66 196v14M94 196v14', '#6D4C41', 4)
    + [[150, 142], [178, 158], [60, 130]].map(([x, y]) => E(x, y, 9, 5, '#7CB342', 2)).join('') + face(80, 136, 0.4) + face(164, 146, 0.35, 'w')),
];

export default {
  places: {
    'th-trang': { country: 'th', wave: 3, home: true, name: nm('ตรังและหมู่เกาะ', 'Trang and its islands'), tz: 'Asia/Bangkok', ll: [7.56, 99.61], alias: ['trang', 'ตรัง', 'TST', 'koh mook', 'เกาะมุก', 'koh kradan', 'เกาะกระดาน', 'koh ngai', 'เกาะไหง', 'kantang', 'กันตัง', 'pak meng', 'ปากเมง', 'koh libong', 'เกาะลิบง'], colors: TR },
  },
  items,
};
