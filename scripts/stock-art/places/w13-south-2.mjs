// Wave 13, Thailand (deep south): Satun, Koh Lipe and Tarutao — the city stamp, two day scenes and the place's own landmarks:
// the Adang and Tarutao islands, Satun's buildings and geopark fossil, the reef animals of the marine park and two Satun dishes
// (no people: the Chao Ley are not drawn)
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const LP = { k1: '#00838F', k2: '#EC407A', k3: '#E0F7FA' };
const CITY = 'th-lipe', DIR = 'th/lipe';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const palm = (x, y, s = 1, lean = 8) => Lc(`M${x} ${y}q${lean * s} ${-30 * s} ${lean * 1.6 * s} ${-60 * s}`, '#8D6E63', 5 * s)
  + [[-26, 6], [-16, -12], [18, -12], [26, 8]].map(([dx, dy]) => Lc(`M${x + lean * 1.6 * s} ${y - 60 * s}q${dx * 0.5 * s} ${(dy - 12) * s} ${dx * s} ${(dy + 6) * s}`, '#43A047', 6 * s)).join('');
// rising bubbles under water
const bub = (pts) => pts.map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2)).join('');

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับสตูลและเกาะหลีเป๊ะ', 'Satun and Koh Lipe stamp'), kw: ['satun', 'สตูล', 'koh lipe', 'เกาะหลีเป๊ะ', 'tarutao', 'ตะรุเตา', 'koh adang', 'เกาะอาดัง'],
    // a little round island with a white beach and a palm, the sun coming up behind it over clear turquoise water
    svg: cityStamp('lp-st', { name: 'KOH LIPE', sub: 'SATUN · THAILAND', ...LP, emblem: C(100, 104, 22, '#FFB74D', 2.5) + R(56, 110, 88, 30, '#4DD0E1', 6, 2.5)
      + P('M66 122c8-14 26-20 42-18s26 8 30 18z', '#FFF3E0', 2.5) + P('M78 116c4-8 14-12 26-10 10 2 16 6 18 10z', '#7CB342', 2.5) + Lc('M96 108c2-10 4-18 10-24', '#8D6E63', 3.5)
      + Lc('M106 84c-6-6-14-6-18-2M106 84c6-6 14-6 18-2M106 84c-2-8 2-14 8-16', '#43A047', 3.5) + Lc('M64 132q8-4 16 0t16 0t16 0t16 0', '#E0F7FA', 2) }) },

  D('sunrise', 'หาดซันไรส์ เกาะหลีเป๊ะ', 'Sunrise Beach on Koh Lipe', ['sunrise beach', 'หาดซันไรส์', 'koh lipe beach', 'ชายหาดเกาะหลีเป๊ะ', 'clear turquoise water', 'น้ำทะเลใส', 'koh adang across the water', 'เกาะอาดังฝั่งตรงข้าม', 'white sand', 'ทรายขาว'],
    // a curving bay of white sand, see-through turquoise shallows turning blue, the tall green hills of Koh Adang across the channel, the sun coming up, a palm
    scene('lp-d1', '#FFE0B2', C(70, 70, 20, '#FFB74D', 3) + P('M90 120c20-50 50-70 80-70s50 30 74 60v14H90z', '#558B2F') + P('M120 100c10-20 26-30 40-30', 'none', 3)
      + R(-4, 118, 248, 50, '#29B6F6') + P('M-4 150c80-10 170-6 248 4v24H-4z', '#80DEEA') + P('M-4 176c60-16 150-18 248 0v70H-4z', '#FFFDE7')
      + Lc('M30 162q10-4 20 0t20 0M150 166q10-4 20 0t20 0', '#E0F7FA', 3) + palm(200, 220, 1.1, -10) + face(110, 200, 0.35))),

  D('tarutao', 'หาดยาวไร้ผู้คนบนเกาะตะรุเตา', 'Tarutao\'s long empty beach', ['tarutao national park', 'อุทยานแห่งชาติตะรุเตา', 'ao pante', 'อ่าวพันเตมะละกา', 'long empty beach', 'หาดยาวเงียบสงบ', 'jungle mountains', 'ภูเขาป่าดิบ', 'footprints in the sand', 'รอยเท้าบนทราย'],
    // a long sweep of empty pale sand curving away, deep green forested mountains behind, a stream winding out to sea, little footprints across the sand
    scene('lp-d2', '#B3E5FC', P('M-4 120l40-40 30 20 40-50 50 40 40-20 48 40v30H-4z', '#2E7D32') + P('M-4 120c40-14 90-14 248-6v20H-4z', '#43A047')
      + R(-4, 130, 248, 30, '#4FC3F7') + P('M-4 160c80-30 170-36 248-30v120H-4z', '#FFF3E0') + P('M150 140c-10 20 10 30-10 60l14 4c16-30-4-40 8-64z', '#81D4FA', 2.5)
      + [[40, 220], [56, 210], [72, 202], [88, 194], [104, 188]].map(([x, y], k) => E(x, y + (k % 2) * 6, 4, 6, '#D7CCC8', 0)).join('') + face(70, 100, 0.3)
      + C(196, 60, 10, '#FFFFFF', 0) + C(210, 56, 14, '#FFFFFF', 0) + C(226, 62, 10, '#FFFFFF', 0))),

  L('chado', 'จุดชมวิวผาชะโด เกาะอาดัง', 'Chado Cliff, the lookout on Koh Adang', ['chado cliff', 'ผาชะโด', 'koh adang viewpoint', 'จุดชมวิวเกาะอาดัง', 'see-through sea', 'ทะเลใสมองเห็นพื้น', 'view of koh lipe', 'มองเห็นเกาะหลีเป๊ะ', 'rocky lookout', 'หินบนยอดผา'], nm('หาเกาะเล็กที่มีหาดทรายขาวล้อมรอบ', 'Find the little island ringed with white sand'),
    // big grey lookout rocks in front, far below a wide turquoise-to-blue sea, a small island with a ring of white beach and green hills, a boat's wake
    R(10, 30, 220, 150, '#29B6F6', 20) + P('M10 120c60-20 160-20 220 0v60H10z', '#4DD0E1') + E(150, 96, 52, 22, '#FFF8E1') + P('M106 96c6-20 26-30 44-30s38 12 44 30z', '#7CB342')
    + face(150, 82, 0.35) + Lc('M40 70q20 6 40 2', '#E1F5FE', 3) + P('M74 64l8-6 4 8z', '#FFFFFF', 2)
    + P('M4 216c4-30 20-50 46-56 20-4 36 4 48 16 14-10 34-10 48 2 16-14 46-14 60 0 20 4 30 20 30 38z', '#9E9E9E') + Lc('M60 186l12 14M150 180l-8 16', '#757575', 3)),

  L('hinngam', 'หินลายสวยบนเกาะหินงาม', 'The striped pebbles of Koh Hin Ngam', ['koh hin ngam', 'เกาะหินงาม', 'striped stones', 'หินลาย', 'smooth black pebbles', 'หินกลมสีดำ', 'stone beach', 'หาดหิน', 'leave the stones behind', 'ห้ามเก็บหินกลับบ้าน'], nm('หาหินก้อนที่มีลายขาวสามเส้น', 'Find the stone with three white stripes'),
    // a pile of smooth round dark stones, each with white bands around it, some smiling, on a pale beach at the water's edge
    R(10, 70, 220, 40, '#4FC3F7', 14) + P('M10 104c70-10 150-10 220 0v100H10z', '#ECEFF1')
    + [[60, 170, 36, 22, 2], [130, 178, 40, 24, 3], [196, 170, 28, 18, 1], [96, 134, 30, 19, 2], [160, 140, 26, 16, 1], [124, 104, 24, 15, 1]].map(([x, y, rx, ry, n]) => E(x, y, rx, ry, '#455A64')
      + Array.from({ length: n }, (_, k) => Lc(`M${x - rx * 0.8 + k * 10} ${y - ry * 0.6}q${rx * 0.3} ${ry} ${rx * 0.3 + 6} ${ry * 1.2}`, '#FFFFFF', 3)).join('')).join('')
    + face(130, 176, 0.45) + face(96, 132, 0.3)),

  L('trilobite', 'ฟอสซิลไทรโลไบต์ อุทยานธรณีสตูล', 'A trilobite fossil from the Satun Geopark', ['trilobite fossil', 'ฟอสซิลไทรโลไบต์', 'satun geopark', 'อุทยานธรณีโลกสตูล', '500 million years old', 'อายุห้าร้อยล้านปี', 'ancient sea creature', 'สัตว์ทะเลโบราณ', 'unesco geopark', 'อุทยานธรณียูเนสโก'], nm('หาลำตัวที่แบ่งเป็นสามแถว', 'Find the body split into three long rows'),
    // a flat grey stone slab with a big brown trilobite pressed in it: a half-moon head, a ridged body in three lobes and a little tail; a magnifying glass beside
    P('M16 200l20-150 160-20 30 160z', '#B0BEC5') + Lc('M40 80l20 10M190 60l-10 14M60 190l14-10', '#90A4AE', 3)
    + P('M70 78c10-24 70-24 80 0z', '#A1887F') + R(76, 78, 68, 76, '#A1887F', 10) + P('M90 154c6 16 34 16 40 0z', '#A1887F')
    + Lc('M100 80v74M120 80v74', '#6D4C41', 3) + [94, 106, 118, 130, 142].map((y) => Lc(`M78 ${y}h64`, '#6D4C41', 2.5)).join('') + face(110, 66, 0.3)
    + C(184, 168, 24, '#E1F5FE', 4) + Lc('M200 186l22 24', '#5D4037', 9)),

  L('kuden', 'คฤหาสน์กูเด็น พิพิธภัณฑ์สตูล', 'Ku Den Mansion, the old museum house of Satun', ['ku den mansion', 'คฤหาสน์กูเด็น', 'satun national museum', 'พิพิธภัณฑสถานแห่งชาติสตูล', 'colonial mansion', 'อาคารแบบยุโรป', 'arched windows', 'หน้าต่างโค้ง', 'satun town', 'ตัวเมืองสตูล'], nm('หาหน้าต่างโค้งเรียงกันชั้นบน', 'Find the row of arched windows upstairs'),
    // a pale-yellow two-storey mansion with a low hipped red roof, a row of tall arched shuttered windows upstairs, a pillared front porch with its own little roof
    R(26, 96, 188, 108, '#FFF59D') + P('M18 98l30-30h144l30 30z', '#C62828') + Lc('M26 148h188', '#FBC02D', 4)
    + [46, 82, 158, 194].map((x) => P(`M${x - 11} 140v-24c0-14 22-14 22 0v24z`, '#4DB6AC', 3) + R(x - 11, 160, 22, 30, '#4DB6AC', 0, 3)).join('')
    + R(92, 116, 56, 88, '#FFFDE7') + P('M84 120l36-22 36 22z', '#C62828') + [100, 140].map((x) => R(x - 4, 150, 8, 54, '#FFFFFF', 0, 3)).join('')
    + P('M108 204v-30c0-14 24-14 24 0v30z', '#6D4C41') + face(120, 136, 0.4) + R(10, 204, 220, 12, '#E0E0E0', 4)),

  L('mambang', 'มัสยิดกลางจังหวัดสตูล', 'Satun Central Mosque and its pool', ['satun central mosque', 'มัสยิดกลางจังหวัดสตูล', 'mambang mosque', 'มัสยิดมำบัง', 'big dome', 'โดมใหญ่', 'tall minaret', 'หออะซาน', 'reflecting pool', 'สระน้ำหน้ามัสยิด'], nm('หาหอสูงชะลูดข้างโดม', 'Find the tall slim tower beside the dome'),
    // a white square hall with arched doorways, a big rounded teal dome on top, a slim tall white minaret with a little dome at its tip, a blue pool in front
    R(30, 110, 130, 80, '#FFFFFF') + P('M44 112c0-44 102-44 102 0z', '#26A69A') + Lc('M95 70v-14', INK, 3) + C(95, 52, 4, '#FFCA28', 2)
    + [52, 78, 104, 130].map((x) => P(`M${x} 190v-30c0-12 18-12 18 0v30z`, '#80CBC4', 3)).join('') + R(170, 70, 22, 120, '#FFFFFF') + R(166, 110, 30, 8, '#FFFFFF', 0, 3)
    + P('M170 70c0-18 22-18 22 0z', '#26A69A') + Lc('M181 52v-12', INK, 3) + face(95, 140, 0.45) + R(20, 196, 200, 20, '#81D4FA', 8) + Lc('M40 206h30M120 206h40', '#E1F5FE', 3)),

  L('softcoral', 'ปะการังอ่อนหลากสีที่กองหินจาบัง', 'The rainbow soft corals of the Jabang rock', ['jabang pinnacle', 'กองหินจาบัง', 'soft coral', 'ปะการังอ่อน', 'snorkelling', 'ดำน้ำตื้น', 'colourful reef', 'แนวปะการังหลากสี', 'tiny reef fish', 'ปลาเล็กในแนวปะการัง'], nm('หาปลาตัวเล็กสีส้มที่ว่ายผ่านปะการัง', 'Find the little orange fish swimming by the coral'),
    // a blue underwater rock pinnacle covered in puffy soft corals: pink, purple, orange and yellow tree-like tufts, small fish and bubbles
    R(10, 20, 220, 196, '#4FC3F7', 24) + P('M50 216c10-60 30-120 70-150 40 30 60 90 70 150z', '#78909C')
    + [[86, 150, '#F48FB1'], [150, 140, '#CE93D8'], [104, 100, '#FFB74D'], [134, 92, '#FFF176'], [74, 196, '#BA68C8'], [166, 190, '#FF8A65'], [120, 170, '#F06292']].map(([x, y, c]) => C(x - 10, y, 13, c) + C(x + 10, y, 13, c) + C(x, y - 10, 14, c) + Lc(`M${x} ${y + 6}v12`, '#E1BEE7', 4)).join('')
    + P('M180 60c8-8 20-8 26 0-6 8-18 8-26 0zM206 60l8-6v12z', '#FF7043', 2.5) + P('M34 110c6-6 14-6 20 0-6 6-14 6-20 0zM54 110l6-4v8z', '#FFEB3B', 2.5)
    + bub([[200, 30, 5], [210, 44, 3], [40, 60, 4]]) + face(120, 132, 0.4)),

  L('moorishidol', 'ปลาโนรีครีบยาว', 'A Moorish idol with its long streamer fin', ['moorish idol', 'ปลาโนรีครีบยาว', 'banded reef fish', 'ปลาลายแถบ', 'long trailing fin', 'ครีบยาวเป็นสาย', 'coral reef fish', 'ปลาแนวปะการัง', 'snorkelling', 'ดำน้ำตื้น'], nm('หาครีบที่ยาวเหมือนริบบิ้น', 'Find the fin as long as a ribbon'),
    // a tall flat disc-shaped fish striped white, black and yellow, a long pointy snout, a tall back fin trailing a long white streamer
    P('M78 120c0-40 30-64 72-64 36 0 60 30 60 64s-24 64-60 64c-42 0-72-24-72-64z', '#FFFFFF') + P('M110 66c10 20 12 90 0 112l26 4c10-36 10-82 0-118z', '#263238')
    + P('M168 66c10 20 12 90 0 112l20-12c6-26 6-62 0-90z', '#FDD835') + P('M78 120c-14-4-26-2-34 4 8 6 20 6 34 4z', '#FDD835') + P('M200 120l24-18v36z', '#263238')
    + P('M132 58c10-30 40-46 80-40-30 6-56 20-70 46z', '#FFFFFF') + E(150, 152, 12, 6, '#FDD835', 2.5) + C(94, 104, 6, INK, 0) + C(92, 102, 2, '#fff', 0) + E(102, 118, 6, 4, '#FF8FA3', 0)
    + P('M48 124q6 4 10 0', 'none', 3)),

  L('boxfish', 'ปลาปักเป้ากล่องสีเหลือง', 'A yellow boxfish, a fish shaped like a box', ['yellow boxfish', 'ปลาปักเป้ากล่อง', 'cube fish', 'ปลาทรงกล่อง', 'spotted fish', 'ปลาจุด', 'reef fish', 'ปลาแนวปะการัง', 'snorkelling', 'ดำน้ำตื้น'], nm('หาจุดดำเล็กๆ บนตัวปลา', 'Find the little black spots on the fish'),
    // a bright yellow fish shaped like a rounded box, black spots ringed in white, tiny fluttering fins and tail, big round eyes and pink cheeks, bubbles
    R(48, 70, 130, 100, '#FFEB3B', 34) + P('M178 120l30-26v52z', '#FFEB3B') + P('M96 172c6 12 20 16 30 10l-6-12z', '#FFEB3B', 3) + P('M110 70c4-14 18-18 28-10l-8 12z', '#FFEB3B', 3)
    + [[140, 92], [160, 112], [140, 140], [112, 150], [80, 140]].map(([x, y]) => C(x, y, 6, INK, 0) + C(x, y, 9, 'none', 2)).join('') + face(90, 104, 0.6, 'o') + bub([[30, 70, 6], [24, 50, 4], [36, 34, 3]])),

  L('seakrait', 'งูสมิงทะเลลายปล้อง', 'A banded sea krait resting on a rock', ['banded sea krait', 'งูสมิงทะเลปากเหลือง', 'sea snake', 'งูทะเล', 'paddle tail', 'หางแบนเหมือนใบพาย', 'look but do not touch', 'ดูอย่าจับ', 'island rocks', 'โขดหินริมเกาะ'], nm('หาหางแบนเหมือนใบพาย', 'Find the tail as flat as a paddle'),
    // a coiled blue-grey and black ringed sea snake on a rock, a yellow nose and a sleepy smile, its flat paddle tail lifted, water below
    R(10, 186, 220, 30, '#4FC3F7', 12) + P('M20 200c10-30 40-44 100-44s90 14 100 44z', '#A1887F')
    + Lc('M70 168c-24-10-24-40 10-46 40-8 90 0 100 20 8 16-10 30-40 30', INK, 26) + Lc('M70 168c-24-10-24-40 10-46 40-8 90 0 100 20 8 16-10 30-40 30', '#90A4AE', 20)
    + Lc('M70 168c-24-10-24-40 10-46 40-8 90 0 100 20 8 16-10 30-40 30', INK, 20).replace('/>', ' stroke-dasharray="10 14"/>') + P('M140 172c10 0 20-8 22-16l10 10-14 14z', '#90A4AE')
    + E(76, 110, 24, 18, '#90A4AE') + E(56, 114, 8, 7, '#FFEB3B', 2.5) + face(80, 106, 0.38)),

  L('thaleban', 'ทะเลสาบกลางป่า อุทยานทะเลบัน', 'The forest lake of Thale Ban', ['thale ban national park', 'อุทยานแห่งชาติทะเลบัน', 'lake in the forest', 'ทะเลสาบกลางป่า', 'wooden walkway', 'สะพานไม้', 'jungle hills', 'เขาป่าดิบ', 'still green water', 'น้ำสีเขียวนิ่ง'], nm('หาสะพานไม้ที่ทอดข้ามทะเลสาบ', 'Find the wooden walkway across the lake'),
    // a ring of rounded jungle hills round a calm green lake, the hills mirrored in it, tall swamp trees standing in the water, a wooden walkway across on posts
    P('M10 120c10-40 30-60 56-60 16-20 46-24 64-6 20-20 60-16 74 10 16 0 26 20 26 56z', '#2E7D32') + E(120, 160, 110, 50, '#80CBC4')
    + Lc('M30 140c40 14 140 14 180 0', '#4DB6AC', 6) + [[60, 150], [180, 150]].map(([x, y]) => Lc(`M${x} ${y + 20}V${y - 30}`, '#6D4C41', 5) + C(x, y - 40, 16, '#43A047')).join('')
    + P('M14 192l100-18h112v12H114l-100 18z', '#D7A86E') + [40, 80, 130, 180, 214].map((x) => Lc(`M${x} ${x < 110 ? 196 - (x - 14) * 0.18 : 186}v18`, '#6D4C41', 4)).join('') + face(120, 150, 0.4)),

  L('khaomok', 'ข้าวหมกไก่สตูล', 'Khao mok gai, golden spiced rice with chicken', ['khao mok gai', 'ข้าวหมกไก่', 'yellow spiced rice', 'ข้าวขมิ้น', 'thai muslim food', 'อาหารมุสลิม', 'green dipping sauce', 'น้ำจิ้มเขียว', 'crispy shallots', 'หอมเจียว'], nm('หาถ้วยน้ำจิ้มสีเขียว', 'Find the little bowl of green dipping sauce'),
    // a plate with a dome of golden turmeric rice, a fried chicken leg leaning on it, crispy shallots on top, cucumber slices and a small bowl of green sauce
    E(110, 172, 96, 36, '#FFFFFF') + P('M44 166c0-50 40-70 70-70s70 20 70 70z', '#FFCA28') + Array.from({ length: 14 }, (_, k) => C(60 + (k * 31) % 110, 112 + (k * 17) % 46, 2.5, '#F9A825', 0)).join('')
    + E(148, 150, 30, 20, '#BF6A2B') + R(170, 118, 8, 26, '#FFF8E1', 4, 3) + Lc('M86 108q4-4 8 0M102 104q4-4 8 0M118 108q4-4 8 0', '#8D3B12', 3) + face(96, 136, 0.45)
    + [[40, 190], [62, 198]].map(([x, y]) => C(x, y, 11, '#C5E1A5') + C(x, y, 6, '#F1F8E9', 2)).join('') + E(196, 196, 24, 10, '#FFFFFF') + E(196, 192, 18, 6, '#8BC34A', 2.5)),

  L('oxtail', 'ซุปหางวัวแบบมุสลิม', 'Sup hang wua, Thai Muslim oxtail soup', ['oxtail soup', 'ซุปหางวัว', 'thai muslim soup', 'ซุปมุสลิม', 'tomato and potato', 'มะเขือเทศและมันฝรั่ง', 'fresh coriander', 'ผักชี', 'southern soup', 'ซุปปักษ์ใต้'], nm('หาชิ้นมะเขือเทศสีแดงในซุป', 'Find the red tomato pieces in the soup'),
    // a deep blue-rimmed bowl of clear golden soup with chunks of oxtail, red tomato wedges, potato cubes, green coriander and spring onion, steam rising
    P('M30 120h180c-4 50-40 84-90 84S34 170 30 120z', '#FFFFFF') + R(84, 200, 72, 12, '#FFFFFF', 4) + Lc('M36 140h168', '#1E88E5', 5)
    + E(120, 120, 90, 18, '#FFD54F') + [[86, 116], [140, 114]].map(([x, y]) => E(x, y, 16, 10, '#8D6E63') + C(x, y, 5, '#FFF3E0', 2)).join('')
    + P('M108 122l10-12 10 12z', '#E53935', 2.5) + P('M160 124l8-12 10 10z', '#E53935', 2.5) + R(56, 116, 12, 10, '#FFE082', 2, 2.5) + R(120, 124, 12, 10, '#FFE082', 2, 2.5)
    + Lc('M70 110l8-4M150 108l10 2M116 108l4-6', '#43A047', 3) + Lc('M90 84c-8-12 8-16 0-30M120 80c-8-12 8-16 0-30M150 84c-8-12 8-16 0-30', '#CFD8DC', 4) + face(120, 166, 0.45)),

  L('frigatebird', 'นกโจรสลัดคอแดงพองลม', 'A frigatebird puffing up its red throat', ['frigatebird', 'นกโจรสลัด', 'red throat pouch', 'ถุงคอสีแดง', 'sea bird', 'นกทะเล', 'long pointed wings', 'ปีกยาวแหลม', 'island cliffs', 'เกาะกลางทะเล'], nm('หาลูกโป่งสีแดงที่คอของนก', 'Find the red balloon on the bird\'s throat'),
    // a black seabird with long angled wings spread wide, a forked tail, a hooked grey beak and a big round red balloon of a throat pouch
    P('M120 120c-30-10-60-40-108-44 30 20 50 40 70 60zM120 120c30-10 60-40 108-44-30 20-50 40-70 60z', '#37474F') + E(120, 128, 26, 30, '#263238')
    + P('M108 154l-10 46 18-24 4 24 4-24 18 24-10-46z', '#263238') + C(120, 156, 22, '#E53935') + Lc('M110 146q10-8 20 0', '#FF8A80', 3)
    + C(120, 94, 20, '#37474F') + P('M120 100l30 6c4 0 4 6-2 6l-28-2z', '#B0BEC5', 3) + C(114, 90, 4, '#fff', 0) + C(114, 90, 2.5, INK, 0) + E(124, 100, 5, 3, '#FF8FA3', 0)),

  L('prasathin', 'ปราสาทหินพันยอด เกาะเขาใหญ่', 'Prasat Hin Phan Yot, the rock castle of a thousand spires', ['prasat hin phan yot', 'ปราสาทหินพันยอด', 'koh khao yai', 'เกาะเขาใหญ่', 'rock castle', 'ปราสาทหิน', 'pointy sea rocks', 'หินยอดแหลม', 'kayak around the rocks', 'พายเรือรอบเกาะ'], nm('หาช่องหินที่ดูเหมือนประตูปราสาท', 'Find the gap in the rock that looks like a castle door'),
    // a cluster of grey limestone rocks rising from green-blue sea in many pointy spires like castle towers, a dark arched gap like a door at the waterline
    R(10, 176, 220, 40, '#4DB6AC', 14) + P('M30 186l10-60 14 20 10-60 16 40 12-70 14 50 14-36 12 46 16-30 10 50 14-26 8 76z', '#90A4AE')
    + Lc('M60 130l6 30M98 100l4 40M142 120l-4 30M178 140l4 30', '#78909C', 3) + P('M106 186v-20c0-16 26-16 26 0v20z', '#455A64') + face(118, 130, 0.4)
    + Lc('M30 196q10-4 20 0t20 0M150 200q10-4 20 0t20 0', '#E0F2F1', 3)),

  L('treeworms', 'หนอนต้นคริสต์มาสบนปะการัง', 'Christmas tree worms on the coral', ['christmas tree worms', 'หนอนต้นคริสต์มาส', 'spiral feathery worms', 'หนอนพู่ขนเกลียว', 'brain coral', 'ปะการังสมอง', 'tiny reef animals', 'สัตว์เล็กในแนวปะการัง', 'snorkelling', 'ดำน้ำตื้น'], nm('หาหนอนที่เป็นรูปต้นไม้เกลียวสีแดง', 'Find the red spiral worm shaped like a tree'),
    // a round wavy-patterned brain coral, little spiral cone tufts in red, blue, yellow and orange sticking out of it like tiny Christmas trees, bubbles above
    P('M20 210c0-60 44-96 100-96s100 36 100 96z', '#BCAAA4') + Lc('M40 196c20-10 20-30 40-30s20 20 40 20 20-26 40-26 20 20 40 20M56 160c14-8 30-8 40 4s30 10 44-2 30-10 40 0', '#8D6E63', 3)
    + [[60, 150, '#E53935'], [110, 120, '#1E88E5'], [160, 140, '#FDD835'], [196, 176, '#FF7043'], [84, 192, '#AB47BC']].map(([x, y, c]) => P(`M${x - 16} ${y}L${x} ${y - 44}L${x + 16} ${y}z`, c)
      + [0, 1, 2].map((k) => Lc(`M${x - 12 + k * 4} ${y - 8 - k * 12}l${24 - k * 8} ${-6}`, '#FFFFFF', 2.5)).join('')).join('')
    + face(110, 104, 0.32) + bub([[150, 50, 6], [160, 32, 4], [80, 60, 4]])),

  L('goby', 'ปลาบู่กับกุ้งดีดขันเพื่อนรัก', 'A goby and its shrimp friend sharing a burrow', ['shrimp goby', 'ปลาบู่กุ้ง', 'pistol shrimp', 'กุ้งดีดขัน', 'best friends of the sea', 'เพื่อนซี้ใต้ทะเล', 'sand burrow', 'รูใต้ทราย', 'snorkelling', 'ดำน้ำตื้น'], nm('หากุ้งที่กำลังขุดทรายออกจากรู', 'Find the shrimp pushing sand out of the hole'),
    // pale sand under blue water with a round burrow hole; a spotted tan goby resting at the doorway on guard and a pink-and-white shrimp with a big claw shovelling sand beside it
    R(10, 30, 220, 186, '#81D4FA', 24) + P('M10 150c70-12 150-12 220 0v66H10z', '#FFE0B2') + E(120, 160, 28, 10, '#5D4037')
    + P('M60 134c0-20 20-30 50-30 20 0 30 10 36 20l-20 12c-20 8-50 8-66-2z', '#D7CCC8') + P('M60 132l-22-14v32z', '#D7CCC8') + [[84, 120], [100, 116], [116, 122]].map(([x, y]) => C(x, y, 4, '#FFB74D', 0)).join('') + face(122, 120, 0.32)
    + P('M150 170c8-16 30-20 48-10l14 14c-16 10-46 10-62-4z', '#F8BBD0') + Lc('M160 162v16M172 160v18M184 162v16', '#FFFFFF', 3) + C(206, 166, 12, '#F48FB1') + C(198, 158, 3, INK, 0)
    + Lc('M206 158c10-20 20-26 24-30M200 158c4-20 4-30 0-40', '#F48FB1', 2) + Lc('M146 176l-16 4', '#F8BBD0', 5) + [[132, 184], [138, 190], [128, 192]].map(([x, y]) => C(x, y, 2.5, '#FFCC80', 1)).join('')),

  L('angelfish', 'ปลาสินสมุทรวงฟ้า', 'An emperor angelfish with its blue rings', ['emperor angelfish', 'ปลาสินสมุทรจักรพรรดิ', 'angelfish', 'ปลาสินสมุทร', 'blue and yellow stripes', 'ลายฟ้าเหลือง', 'reef fish', 'ปลาแนวปะการัง', 'koh lipe reef', 'แนวปะการังเกาะหลีเป๊ะ'], nm('หาลายสีเหลืองที่โค้งไปตามตัวปลา', 'Find the yellow stripes curving along the fish'),
    // a round flat fish striped in curving yellow and deep blue lines, a black eye mask with a pale blue rim, a yellow tail, a little coral at the bottom
    E(120, 116, 74, 62, '#1565C0') + [0, 1, 2, 3, 4].map((k) => Lc(`M${84 + k * 18} ${64 + k * 2}q30 ${50} 0 ${106 - k * 4}`, '#FFEB3B', 5)).join('') + P('M190 116l30-28v56z', '#FFEB3B')
    + P('M58 80c10 12 12 60 0 72l20 0c10-20 10-52 0-72z', '#263238') + Lc('M80 80c8 20 8 52 0 72', '#90CAF9', 4) + C(66, 110, 6, '#fff', 0) + C(66, 110, 3.5, INK, 0)
    + E(60, 128, 6, 4, '#FF8FA3', 0) + P('M46 126q6 4 10 0', 'none', 3) + C(60, 210, 10, '#FF8A65') + C(78, 206, 12, '#FFAB91') + C(184, 210, 10, '#F48FB1')),
];

export default {
  places: {
    'th-lipe': { country: 'th', wave: 3, home: true, name: nm('สตูลและเกาะหลีเป๊ะ', 'Satun and Koh Lipe'), tz: 'Asia/Bangkok', ll: [6.49, 99.3], alias: ['koh lipe', 'เกาะหลีเป๊ะ', 'satun', 'สตูล', 'tarutao', 'ตะรุเตา', 'pak bara', 'ปากบารา', 'koh adang', 'เกาะอาดัง', 'thale ban', 'koh bulon', 'เกาะบุโหลน'], colors: LP },
  },
  items,
};
