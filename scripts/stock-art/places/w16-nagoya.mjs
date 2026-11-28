// Wave 16: Nagoya (+ Aichi: Arimatsu, Tokoname, Okazaki, Inuyama's Meiji Mura) — the castle town of the golden fish,
// the trains of the SCMaglev park, the port aquarium and the city's own "Nagoya meshi" (tebasaki, miso katsu, ogura toast).
// Already drawn inside jp-takayama (Nagoya was an alias there until wave 16), so not drawn again: Nagoya Castle and its golden
// fish, hitsumabushi, the science museum's silver ball, Oasis 21, miso nikomi udon, kishimen, Inuyama Castle, fake food.
// Skipped as repeats or bans: Atsuta Shrine and Ōsu Kannon (religious), the maglev train (Shanghai has one), the MIRAI TV tower
// (Berlin, Tashkent), the Spiral Towers (Shanghai Tower, Singapore's Helix), the Higashiyama greenhouse (Kew, Vienna, Chicago),
// uirō (Hakone), Tokoname's beckoning cat (jp.culture.maneki), ankake spaghetti (Yokohama's Napolitan), the Toyota loom
// (Lyon's Jacquard), Ghibli Park and Legoland (brands and characters), tenmusu (jp.food.onigiri).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NA = { k1: '#A87400', k2: '#37474F', k3: '#FFF8E1' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `jp-nagoya.landmark.${slug}`, cat: 'landmark', file: `jp/nagoya/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// sesame seeds / crumbs: little dots without an outline
const dots = (pts, c, r = 2) => pts.map(([x, y]) => E(x, y, r, r * 0.7, c, 0)).join('');
// a wave line
const wave = (x, y, c = '#E1F5FE') => Lc(`M${x} ${y}c5-5 10 5 15 0s10 5 15 0`, c, 4);

const items = [
  { id: 'jp-nagoya.stamp', cat: 'stamp', file: 'jp/nagoya/stamp.v1.svg', name: nm('ตราประทับนาโกย่า', 'Nagoya stamp'), kw: ['nagoya', 'นาโกย่า', 'shachihoko', 'ชาจิโฮโกะ', 'golden fish', 'ปลาทอง', 'castle roof', 'หลังคาปราสาท', 'aichi', 'ไอจิ'],
    // a golden shachihoko — the tiger-headed fish of Nagoya's castle roof — standing on its head with its tail curled up, on a green roof ridge
    svg: cityStamp('jna-st', { name: 'NAGOYA', sub: 'JAPAN', ...NA, emblem: P('M54 132h92l-8 12H62z', '#607D8B') + R(60, 124, 80, 9, '#78909C')
      + P('M76 124c-6-14 0-28 14-32 14-4 22-14 22-28-6-2-10-8-8-14 8 2 12 6 14 10 2-8 8-12 14-12-2 6-4 12-10 16 4 22-8 42-28 50-6 2-10 6-8 10z', '#FFC107')
      + P('M104 98c6-6 8-14 8-22', 'none') + P('M96 92l-4-10 8 4zM108 82l-2-10 8 6z', '#FFB300', 2.5) + E(84, 116, 10, 7, '#FFE082', 2.5)
      + Lc('M88 104c4 2 8 2 12-2M94 112c4 2 8 0 10-4', '#FFE082', 2.5) + face(84, 112, 0.24, 'o') }) },
  { id: 'jp-nagoya.day.station', cat: 'day', file: 'jp/nagoya/day-station.v1.svg', name: nm('ตึกแฝดเหนือสถานีนาโกย่า', 'The twin towers over Nagoya Station'), kw: ['nagoya station', 'สถานีนาโกย่า', 'jr central towers', 'ตึกเจอาร์เซ็นทรัล', 'meieki', 'เมเอกิ', 'twin towers', 'ตึกแฝด', 'shinkansen', 'ชินคันเซ็น', 'nagoya', 'นาโกย่า', 'city', 'เมือง'],
    // the two round-cornered towers of JR Central Towers standing on the station, a tall slab tower beside them, a white bullet train with a blue stripe gliding out on the viaduct below
    svg: scene('jna-d1', '#BBDEFB', C(46, 56, 15, '#FFF59D', 0) + R(18, 120, 34, 90, '#B0BEC5') + R(190, 110, 40, 100, '#CFD8DC')
      + R(70, 40, 40, 140, '#E3F2FD', 18) + R(116, 58, 38, 122, '#ECEFF1', 19) + R(160, 70, 30, 110, '#B3E5FC') + P('M160 70l30-14v14z', '#90CAF9')
      + Lc('M78 62h24M78 78h24M78 94h24M78 110h24M78 126h24M124 78h22M124 94h22M124 110h22M124 126h22M166 86h18M166 102h18M166 118h18M166 134h18', '#90A4AE', 3)
      + R(56, 140, 112, 40, '#FFFFFF') + Lc('M66 156h92', '#90CAF9', 6) + R(-4, 180, 248, 10, '#9E9E9E') + R(-4, 190, 248, 60, '#A5D6A7')
      + [30, 90, 150, 210].map((x) => R(x, 190, 8, 20, '#BDBDBD', 0, 3)).join('')
      + P('M-10 160h150c30 0 50 10 62 20H-10z', '#FFFFFF') + Lc('M-10 174h204', '#1565C0', 5) + R(10, 164, 100, 7, '#90CAF9', 2, 2.5) + P('M150 162c16 1 30 6 40 14h-36z', '#455A64', 2.5) + face(176, 186, 0.22, 'none')
      + C(214, 214, 10, '#66BB6A') + C(26, 216, 10, '#66BB6A')) },
  { id: 'jp-nagoya.day.gardenpier', cat: 'day', file: 'jp/nagoya/day-gardenpier.v1.svg', name: nm('ท่าเรือนาโกย่าที่การ์เดนเพียร์', "Nagoya's port at Garden Pier"), kw: ['garden pier', 'การ์เดนเพียร์', 'port of nagoya', 'ท่าเรือนาโกย่า', 'meiko triton', 'สะพานเมโกไทรทัน', 'red white blue bridges', 'สะพานแดงขาวน้ำเงิน', 'harbour', 'ท่าเรือ', 'aquarium', 'พิพิธภัณฑ์สัตว์น้ำ', 'nagoya', 'นาโกย่า'],
    // a wide harbour: far away three long bridges in red, white and blue, the aquarium's white wave-roofed halls on the quay, a smiling tugboat and seagulls
    svg: scene('jna-d2', '#B3E5FC', C(190, 52, 15, '#FFE082', 0)
      + [[10, '#E53935'], [86, '#FFFFFF'], [162, '#1E88E5']].map(([x, c]) => R(x, 96, 76, 5, c, 0, 2.5) + P(`M${x + 34} 101l4-28 4 28z`, c, 2.5) + Lc(`M${x + 38} 76l-30 20M${x + 38} 76l30 20M${x + 38} 84l-18 12M${x + 38} 84l18 12`, '#90A4AE', 1.5)).join('')
      + R(-4, 104, 248, 150, '#4FC3F7') + R(-4, 124, 150, 40, '#CFD8DC')
      + P('M10 124v-14c14-12 28-12 42 0s28 12 42 0 28-12 42 0v14z', '#FFFFFF') + R(14, 110, 120, 14, '#FFFFFF', 0, 0) + Lc('M24 118h20M60 118h20M96 118h20', '#81D4FA', 4)
      + P('M150 196h66l-8 14h-52z', '#FF7043') + R(162, 178, 30, 18, '#FFFFFF') + R(184, 166, 8, 12, '#FFCA28', 0, 3) + C(170, 186, 3, '#81D4FA', 2) + face(180, 200, 0.2, 'none')
      + Lc('M40 70q6-6 12 0q6-6 12 0M120 56q5-5 10 0q5-5 10 0', INK, 3) + wave(20, 190) + wave(80, 214) + wave(30, 230)) },

  L('doctoryellow', 'ดอกเตอร์เยลโล ชินคันเซ็นสีเหลืองที่พิพิธภัณฑ์รถไฟ', 'Doctor Yellow, the yellow bullet train at the SCMaglev and Railway Park', ['doctor yellow', 'ดอกเตอร์เยลโล', 'yellow shinkansen', 'ชินคันเซ็นสีเหลือง', 'scmaglev and railway park', 'พิพิธภัณฑ์รถไฟ scmaglev', 'railway museum', 'พิพิธภัณฑ์รถไฟ', 'kinjo futo', 'คินโจฟูโตะ', 'inspection train', 'รถไฟตรวจราง'], 'หาแถบสีฟ้าที่วิ่งตลอดรถไฟสีเหลือง', 'Find the blue stripe running along the yellow train',
    // a bright yellow bullet train with a long duck-bill nose and one blue stripe, standing on rails inside the museum hall, a smiling face on its nose
    bg('#E8EAF6') + low(176, '#CFD8DC') + frame + Lc('M40 60l40-30h80l40 30', '#C5CAE9', 6)
      + P('M24 110h112c40 0 68 22 82 54l-4 8H24z', '#FFEB3B') + R(32, 122, 88, 16, '#90CAF9', 4, 3) + Lc('M54 122v16M76 122v16M98 122v16', '#E3F2FD', 2.5)
      + P('M138 120c20 2 36 14 46 30h-40z', '#455A64', 3) + Lc('M24 158h196', '#1565C0', 7)
      + R(34, 172, 44, 12, '#616161', 3) + R(132, 172, 44, 12, '#616161', 3) + [44, 68, 142, 166].map((x) => C(x, 186, 7, '#424242', 3)).join('')
      + Lc('M20 196h200', '#9E9E9E', 4) + face(186, 144, 0.36)),
  L('orca', 'วาฬเพชฌฆาตกระโดดที่พิพิธภัณฑ์สัตว์น้ำท่าเรือนาโกย่า', 'An orca leaping at the Port of Nagoya Public Aquarium', ['port of nagoya public aquarium', 'พิพิธภัณฑ์สัตว์น้ำท่าเรือนาโกย่า', 'nagoya aquarium', 'อควาเรียมนาโกย่า', 'orca', 'วาฬเพชฌฆาต', 'killer whale', 'orca show', 'โชว์วาฬ', 'big splash', 'น้ำกระจาย'], 'หาจุดขาวรูปไข่ข้างตาวาฬ', 'Find the white oval patch beside the orca’s eye',
    // a black and white orca jumping out of a blue pool in a happy arc, a white belly, a tall fin, a big splash of water drops under it
    bg('#E1F5FE') + low(158, '#29B6F6') + frame + Lc('M16 158h208', '#E1F5FE', 4)
      + P('M34 150c18-44 70-74 124-70 30 2 50 18 54 36-14 10-40 10-58 4-34 8-74 22-104 36z', '#263238')
      + P('M60 146c30-14 64-26 100-30 16 0 30 2 40 0-6 8-24 10-42 6-32 6-66 16-98 26z', '#FFFFFF', 3)
      + P('M118 86l2-40 28 40z', '#263238') + P('M120 128c-2 12-12 22-24 24 4-10 10-18 24-24z', '#263238', 3) + P('M38 148l-22-16 4 26-12 16 30-10z', '#263238')
      + E(176, 100, 11, 5, '#FFFFFF', 2.5) + C(186, 106, 3.5, INK, 0) + E(192, 114, 6, 3.5, '#FF8FA3', 0) + Lc('M200 116q6 4 10 0', '#FFFFFF', 3)
      + [[60, 176, 7], [84, 166, 9], [44, 190, 6], [110, 182, 6], [150, 172, 5]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2.5)).join('') + wave(160, 196) + wave(40, 208)),
  L('fujiship', 'เรือสำรวจขั้วโลกใต้ฟูจิที่การ์เดนเพียร์', 'The Antarctic research ship Fuji at Garden Pier', ['antarctic research ship fuji', 'เรือสำรวจขั้วโลกใต้ฟูจิ', 'fuji ship', 'เรือฟูจิ', 'museum ship', 'เรือพิพิธภัณฑ์', 'antarctica', 'ทวีปแอนตาร์กติกา', 'garden pier', 'การ์เดนเพียร์', 'penguin', 'เพนกวิน', 'orange ship', 'เรือสีส้ม'], 'หาเพนกวินตัวเล็กที่ยืนบนท่าเรือ', 'Find the little penguin standing on the pier',
    // a long orange ship with white decks, a mast and a little helicopter on its back deck, tied up at the grey pier, a small smiling penguin waving from the pier
    bg('#E1F5FE') + low(150, '#4FC3F7') + frame + C(60, 50, 12, '#FFF59D', 0)
      + P('M24 120h188l-16 34H44z', '#FF7043') + Lc('M34 132h168', '#FFFFFF', 4) + R(74, 92, 76, 28, '#FFFFFF') + R(92, 72, 44, 20, '#FFFFFF') + Lc('M114 72V40M104 50h20', INK, 3)
      + [82, 98, 114, 130].map((x) => R(x, 100, 9, 8, '#90CAF9', 0, 2.5)).join('') + R(140, 80, 10, 12, '#FFCA28', 0, 3)
      + E(178, 110, 16, 8, '#FFA726', 3) + Lc('M160 100h36M178 100v4M190 112l12 2', INK, 3) + Lc('M30 116h40', '#FFFFFF', 3)
      + R(16, 174, 120, 20, '#9E9E9E', 0, 3) + Lc('M40 174v20M80 174v20M120 174v20', '#757575', 3)
      + E(170, 192, 16, 22, '#37474F') + E(170, 198, 10, 15, '#FFFFFF', 0) + P('M166 182l4 6 4-6z', '#FFB300', 2) + P('M154 188l-10-10 4 14z', '#37474F', 3) + E(162, 214, 6, 3, '#FFB300', 2) + E(178, 214, 6, 3, '#FFB300', 2) + face(170, 178, 0.24, 'none')),
  L('palacetiger', 'เสือบนประตูทองในพระราชวังฮมมารุ ปราสาทนาโกย่า', 'The tigers on the golden doors of the Hommaru Palace', ['hommaru palace', 'พระราชวังฮมมารุ', 'honmaru goten', 'ฮมมารุโกเต็น', 'golden sliding doors', 'ประตูบานเลื่อนสีทอง', 'tiger painting', 'ภาพวาดเสือ', 'bamboo', 'ต้นไผ่', 'nagoya castle', 'ปราสาทนาโกย่า'], 'หาเสือที่แอบมองออกมาจากกอไผ่', 'Find the tiger peeping out of the bamboo',
    // three golden sliding doors under a dark wooden beam, painted with green bamboo, a round friendly tiger peeping out between the stalks, a tatami floor in front
    R(20, 30, 200, 12, '#6D4C41') + R(28, 42, 184, 148, '#FFD54F') + Lc('M89 42v148M151 42v148', '#C79A1E', 4) + C(84, 118, 4, '#8D6E63', 2) + C(156, 118, 4, '#8D6E63', 2)
      + ol('M44 190V52M66 190V60M184 190V54M200 190V66', '#66BB6A', 6) + Lc('M40 92h8M62 122h8M180 100h8M196 136h8', INK, 3)
      + P('M48 80c14-6 22-2 26 4-10 2-18 0-26-4zM66 110c-12-8-22-6-26 0 10 2 18 2 26 0zM188 84c12-6 20-2 24 4-10 2-16 0-24-4zM184 128c-12-6-20-4-24 2 10 2 16 2 24-2z', '#43A047', 2.5)
      + E(120, 166, 42, 22, '#FFA726') + C(96, 104, 10, '#FFA726') + C(144, 104, 10, '#FFA726') + C(96, 104, 4, '#FFCCBC', 0) + C(144, 104, 4, '#FFCCBC', 0) + C(120, 130, 30, '#FFA726')
      + Lc('M112 104l3 10M128 104l-3 10M120 101v11M92 128h8M140 128h8M92 138l8-2M148 138l-8-2', INK, 3.5) + E(120, 142, 14, 9, '#FFF3E0', 2.5) + E(120, 136, 4, 3, INK, 0)
      + Lc('M96 168l6 8M138 168l6 8', INK, 3) + E(94, 186, 12, 7, '#FFA726', 3) + E(146, 186, 12, 7, '#FFA726', 3) + face(120, 126, 0.42, 'w')
      + R(20, 190, 200, 18, '#C5E1A5') + Lc('M20 199h200M70 190v18M170 190v18', '#9CCC65', 3)),
  L('noritake', 'ปล่องเตาเผาอิฐแดงที่สวนโนริตาเกะ', 'The red-brick kiln chimneys of Noritake Garden', ['noritake garden', 'สวนโนริตาเกะ', 'noritake', 'โนริตาเกะ', 'kiln chimneys', 'ปล่องเตาเผา', 'red brick', 'อิฐแดง', 'porcelain plate', 'จานกระเบื้อง', 'tableware', 'เครื่องถ้วยชาม'], 'หาจานขาวขอบฟ้าที่ยิ้มอยู่บนสนามหญ้า', 'Find the white plate with a blue rim smiling on the lawn',
    // six old red-brick chimneys of different heights standing in a green lawn with trees, and in front a big white porcelain plate with a blue rim and little flowers, smiling
    bg('#E3F2FD') + low(166, '#A5D6A7') + frame + C(196, 150, 16, '#66BB6A') + C(30, 156, 12, '#66BB6A')
      + [[40, 74], [64, 50], [88, 88], [112, 40], [136, 70], [160, 58]].map(([x, y]) => R(x, y, 18, 170 - y, '#C0552F') + R(x - 3, y, 24, 9, '#8D3B1F', 0, 3) + Lc(`M${x} ${y + 28}h18M${x} ${y + 48}h18M${x + 9} ${y + 28}v20`, '#E58A60', 2)).join('')
      + E(150, 190, 52, 18, '#1E88E5') + E(150, 189, 44, 14, '#FFFFFF', 0) + E(150, 190, 52, 18, 'none')
      + [[118, 190], [182, 190], [150, 178]].map(([x, y]) => C(x, y, 3, '#F48FB1', 0)).join('') + face(150, 187, 0.3)),
  L('arimatsu', 'ผ้ามัดย้อมชิโบริคราม ในเมืองเก่าอาริมัตสึ', 'Indigo shibori cloths drying in old Arimatsu', ['arimatsu', 'อาริมัตสึ', 'arimatsu shibori', 'ผ้าชิโบริอาริมัตสึ', 'shibori', 'ชิโบริ', 'tie-dyed cloth', 'ผ้ามัดย้อม', 'indigo', 'สีคราม', 'old merchant street', 'ถนนพ่อค้าเก่า', 'tokaido', 'โทไกโด'], 'หาผ้าผืนกลางที่มีจุดขาวเต็มไปหมด', 'Find the middle cloth covered in white dots',
    // an old merchant house with a dark tiled roof and white plaster walls, a bamboo pole in front with three long cloths hanging: indigo with white dots, indigo with white rings, pink with white stripes
    bg('#FFFDE7') + low(196, '#BCAAA4') + frame + P('M22 74l30-24h136l30 24z', '#546E7A') + R(32, 74, 176, 122, '#ECEFF1') + Lc('M32 100h176', '#5D4037', 5)
      + Lc('M44 120v76M196 120v76', '#5D4037', 4) + ol('M26 58h188', '#C8A165', 5)
      + R(44, 62, 42, 112, '#283593', 3) + R(100, 62, 42, 120, '#1A237E', 3) + R(156, 62, 42, 106, '#F06292', 3)
      + [70, 90, 110, 130, 150].map((y) => Lc(`M52 ${y}a4 4 0 1 0 8 0a4 4 0 1 0-8 0M70 ${y + 10}a4 4 0 1 0 8 0a4 4 0 1 0-8 0`, '#C5CAE9', 2.5)).join('')
      + [[108, 74], [124, 74], [116, 86], [108, 98], [124, 98], [108, 150], [124, 150], [116, 162], [108, 172], [124, 172]].map(([x, y]) => C(x + 4, y, 3.5, '#FFFFFF', 0)).join('')
      + Lc('M160 80h34M160 100h34M160 120h34M160 140h34M160 160h34', '#FCE4EC', 4) + face(121, 124, 0.34)),
  L('dokanzaka', 'ทางลาดดินเผาโดกันซากะ เมืองโทโคนาเมะ', 'Dokanzaka, the clay-pipe lane of Tokoname', ['dokanzaka', 'โดกันซากะ', 'tokoname', 'โทโคนาเมะ', 'pottery footpath', 'ทางเดินเครื่องปั้นดินเผา', 'clay pipes', 'ท่อดินเผา', 'shochu bottles', 'ขวดเหล้าดินเผา', 'pottery town', 'เมืองเครื่องปั้นดินเผา'], 'หาท่อดินกลมที่ยิ้มอยู่ในกำแพง', 'Find the round clay pipe smiling in the wall',
    // a narrow lane climbing up a hill, its left wall built of round brown clay pipes stacked end-on, its right bank covered with rows of old clay bottles, a brick chimney at the top
    bg('#E3F2FD') + frame + R(150, 30, 18, 60, '#C0552F') + R(147, 30, 24, 8, '#8D3B1F', 0, 3) + P('M16 120c40-30 90-40 208-56v40H16z', '#A5D6A7', 0)
      + P('M90 224l40-140h26l-14 140z', '#D7CCC8') + Lc('M128 112h22M122 140h24M116 168h26M110 196h28', '#BCAAA4', 3)
      + [[30, 116], [54, 112], [78, 108], [26, 140], [50, 136], [74, 132], [30, 164], [54, 160], [78, 156], [34, 188], [58, 184], [82, 180], [40, 208], [64, 206]].map(([x, y]) => C(x, y, 11, '#A1887F', 3) + C(x, y, 5.5, '#5D4037', 0)).join('')
      + [[172, 102], [188, 100], [204, 98], [168, 128], [184, 126], [200, 124], [166, 154], [182, 152], [198, 150], [162, 180], [178, 178], [194, 176], [160, 204], [176, 202]].map(([x, y]) => P(`M${x - 6} ${y + 10}v-10q0-6 4-8v-4h4v4q4 2 4 8v10z`, '#8D6E63', 2.5)).join('')
      + C(54, 160, 11, '#BCAAA4', 3) + C(54, 160, 5.5, '#795548', 0) + face(54, 158, 0.24)),
  L('meijimura', 'ทางเข้าโรงแรมอิมพีเรียลหลังเก่าในเมจิมูระ', 'The old Imperial Hotel entrance at Meiji Mura', ['meiji mura', 'เมจิมูระ', 'museum meiji mura', 'พิพิธภัณฑ์เมจิมูระ', 'imperial hotel', 'โรงแรมอิมพีเรียล', 'yellow brick', 'อิฐเหลือง', 'open-air museum', 'พิพิธภัณฑ์กลางแจ้ง', 'inuyama', 'อินุยามะ', 'reflecting pool', 'สระน้ำหน้าอาคาร'], 'หาสระน้ำสีฟ้าหน้าอาคารอิฐเหลือง', 'Find the blue pool in front of the yellow-brick hall',
    // a low wide hall of yellow brick and carved grey stone with flat jutting roofs in layers, a taller central block with tall stone piers, a long blue pool in front and two round bushes
    bg('#FFF8E1') + low(176, '#C5E1A5') + frame
      + R(24, 112, 60, 56, '#E8C47F') + R(156, 112, 60, 56, '#E8C47F') + R(18, 104, 72, 9, '#A1887F', 0, 3) + R(150, 104, 72, 9, '#A1887F', 0, 3)
      + R(84, 76, 72, 92, '#F0D08F') + R(76, 66, 88, 11, '#A1887F', 0, 3) + R(92, 54, 56, 12, '#BCAAA4', 0, 3)
      + Lc('M96 80v88M144 80v88', '#90A4AE', 7) + [34, 56, 166, 188].map((x) => R(x, 124, 14, 24, '#6D4C41', 0, 2.5)).join('') + Lc('M24 154h60M156 154h60M84 150h72', '#C9A35B', 3)
      + E(120, 196, 78, 13, '#4FC3F7') + Lc('M80 196h20M136 198h18', '#E1F5FE', 3) + C(34, 180, 11, '#66BB6A') + C(206, 180, 11, '#66BB6A') + face(120, 116, 0.4)),
  L('hatchomiso', 'ถังไม้ยักษ์ของมิโซะฮัตโจ เมืองโอคาซากิ', 'The giant Hatchō miso barrels of Okazaki', ['hatcho miso', 'มิโซะฮัตโจ', 'okazaki', 'โอคาซากิ', 'miso barrel', 'ถังมิโซะ', 'cedar barrel', 'ถังไม้ซีดาร์', 'stone pyramid', 'กองหินบนถัง', 'red miso', 'มิโซะแดง', 'miso brewery', 'โรงหมักมิโซะ'], 'หาภูเขาก้อนหินที่ซ้อนอยู่บนถัง', 'Find the mountain of stones piled on the barrel',
    // a huge wooden barrel held by bamboo hoops, a perfect cone of grey river stones piled on its lid, a second smaller barrel behind, a smiling face on the big one
    bg('#FFF3E0') + low(204, '#BCAAA4') + frame
      + R(150, 132, 62, 72, '#C8A165', 6) + Lc('M160 132v72M174 132v72M188 132v72M202 132v72', '#A1887F', 2.5) + ol('M150 150h62M150 182h62', '#8D6E63', 4)
      + [[166, 124], [182, 124], [198, 124], [174, 112], [190, 112], [182, 100]].map(([x, y]) => E(x, y, 9, 6.5, '#B0BEC5', 2.5)).join('')
      + R(34, 116, 112, 92, '#D4AE72', 8) + Lc('M50 116v92M68 116v92M86 116v92M104 116v92M122 116v92', '#A1887F', 2.5) + ol('M34 134h112M34 168h112M34 196h112', '#8D6E63', 5)
      + [44, 62, 80, 98, 116, 134].map((x) => E(x, 108, 10, 7, '#90A4AE', 2.5)).join('') + [53, 71, 89, 107, 125].map((x) => E(x, 95, 10, 7, '#B0BEC5', 2.5)).join('')
      + [62, 80, 98, 116].map((x) => E(x, 82, 10, 7, '#CFD8DC', 2.5)).join('') + [71, 89, 107].map((x) => E(x, 69, 10, 7, '#90A4AE', 2.5)).join('') + E(80, 56, 10, 7, '#B0BEC5', 2.5) + E(98, 56, 10, 7, '#CFD8DC', 2.5) + E(89, 44, 9, 6.5, '#90A4AE', 2.5)
      + face(90, 150, 0.4)),
  L('tokugawaen', 'น้ำตกหินกับสระปลาคาร์ปในสวนโทกูงาวะเอ็น', 'The rock waterfall and carp pond of Tokugawaen', ['tokugawaen', 'โทกูงาวะเอ็น', 'tokugawa garden', 'สวนโทกูงาวะ', 'japanese garden', 'สวนญี่ปุ่น', 'rock waterfall', 'น้ำตกหิน', 'carp pond', 'สระปลาคาร์ป', 'red maple', 'เมเปิลแดง', 'stepping stones', 'หินก้าวเดิน'], 'หาปลาคาร์ปสีส้มที่ว่ายอยู่ใต้น้ำตก', 'Find the orange carp swimming below the waterfall',
    // grey rocks piled up in steps with white water falling down them in three drops into a round green pond, a red maple on one side, stepping stones and an orange carp smiling in the water
    bg('#E8F5E9') + frame + C(186, 66, 26, '#E53935') + C(166, 84, 18, '#EF5350') + Lc('M182 120V86', '#6D4C41', 6)
      + P('M30 140c0-40 20-70 50-80 20-6 36 4 44 20 10 8 12 30 10 60z', '#9E9E9E') + P('M48 100c10-6 24-6 30 2M60 70c8-4 18-2 22 4M94 112c6-4 16-2 20 4', 'none')
      + P('M74 66h14v26h12v24h12v26H74z', '#E1F5FE', 3) + Lc('M80 70v20M88 96v18M98 120v20', '#81D4FA', 3)
      + E(118, 176, 98, 36, '#80CBC4') + E(118, 178, 86, 28, '#4DB6AC', 0) + Lc('M84 150c8-4 16 4 24 0s16 4 24 0', '#FFFFFF', 3)
      + [[178, 150], [196, 166], [204, 186]].map(([x, y]) => E(x, y, 10, 6, '#BDBDBD', 2.5)).join('')
      + P('M108 184c10-10 30-10 38 0-8 10-28 10-38 0zM108 184l-12-8v16z', '#FF7043', 3) + C(118, 182, 3, '#FFFFFF', 0) + face(132, 182, 0.2, 'none')),
  L('goldclock', 'นาฬิกาทองที่สถานีนาโกย่า', 'The Golden Clock at Nagoya Station', ['golden clock', 'นาฬิกาทอง', 'kin no tokei', 'คินโนโทเกะ', 'nagoya station', 'สถานีนาโกย่า', 'meeting place', 'จุดนัดพบ', 'gold tower clock', 'หอนาฬิกาสีทอง', 'meieki', 'เมเอกิ'], 'หาเข็มนาฬิกาบนเสาสีทอง', 'Find the clock hands on top of the golden pillar',
    // a tall slender golden pillar on a round base in the station hall, a round white clock at its top with two hands, little sparkles round it
    bg('#ECEFF1') + low(194, '#CFD8DC') + frame + Lc('M40 40v120M200 40v120', '#B0BEC5', 6) + Lc('M16 160h208', '#B0BEC5', 3)
      + E(120, 200, 34, 9, '#FFB300') + P('M104 198l6-110h20l6 110z', '#FFCA28') + Lc('M114 108v80M126 108v80', '#FFE082', 3)
      + C(120, 66, 28, '#FFC107') + C(120, 66, 20, '#FFFDE7', 3) + Lc('M120 66V52M120 66l10 6', INK, 3.5) + Lc('M120 49v2M137 66h-2M120 83v-2M103 66h2', INK, 2.5)
      + P('M64 70l3-8 3 8 8 3-8 3-3 8-3-8-8-3zM172 110l3-8 3 8 8 3-8 3-3 8-3-8-8-3z', '#FFF176', 2) + face(120, 150, 0.3)),
  L('tebasaki', 'เทบาซากิ ปีกไก่ทอดของนาโกย่า', 'Tebasaki, Nagoya’s peppery chicken wings', ['tebasaki', 'เทบาซากิ', 'chicken wings', 'ปีกไก่ทอด', 'nagoya meshi', 'อาหารนาโกย่า', 'sesame', 'งา', 'sweet soy glaze', 'ซอสโชยุหวาน', 'izakaya snack', 'กับแกล้มอิซากายะ'], 'หาเม็ดงาขาวบนปีกไก่', 'Find the white sesame seeds on the wings',
    // a white plate heaped with glossy brown V-shaped chicken wing tips sprinkled with white sesame and black pepper, a lettuce leaf and a lemon wedge, the front wing smiling
    E(120, 166, 100, 40, '#FFFFFF') + E(120, 160, 84, 28, '#F5F5F5', 0) + P('M40 150c10-24 30-30 48-24-8 16-26 26-48 24z', '#9CCC65', 3) + P('M196 148l-28-12 6 26z', '#FFF176', 3)
      + ol('M60 140l26-30 40 8', '#A0522D', 18) + ol('M110 132l26-34 44 10', '#B5651D', 18) + ol('M70 168l34-32 60 14', '#C0702A', 24)
      + dots([[76, 120], [92, 116], [120, 118], [134, 106], [152, 108], [168, 110], [96, 148], [108, 140], [134, 146], [150, 150]], '#FFFDE7', 2.2) + dots([[84, 124], [144, 112], [120, 150], [160, 146]], INK, 1.6)
      + face(112, 146, 0.3) + Lc('M100 70c-6 10 6 16 0 26M140 66c-6 10 6 16 0 26', '#CFD8DC', 3)),
  L('misokatsu', 'มิโซะคัตสึ หมูทอดราดซอสมิโซะแดง', 'Miso katsu, pork cutlet in red miso sauce', ['miso katsu', 'มิโซะคัตสึ', 'misokatsu', 'pork cutlet', 'หมูทอด', 'red miso sauce', 'ซอสมิโซะแดง', 'shredded cabbage', 'กะหล่ำปลีซอย', 'nagoya meshi', 'อาหารนาโกย่า', 'sesame', 'งา'], 'หาซอสสีน้ำตาลเข้มที่ราดบนหมูทอด', 'Find the dark brown sauce poured over the cutlet',
    // a long plate with a mound of pale green shredded cabbage and a golden pork cutlet cut into thick slices, glossy dark miso sauce poured over the top half, sesame on the sauce
    E(120, 170, 102, 34, '#FFFFFF') + P('M150 160c0-26 20-42 44-38 16 4 22 22 16 38z', '#DCEDC8') + Lc('M162 150l20-16M172 154l24-18M186 156l16-14', '#AED581', 2.5)
      + [[40, -4], [66, -2], [92, 0], [118, 2], [144, 4]].map(([x, r]) => g(x, 146, 1, R(-12, -24, 24, 48, '#E8A64B', 6) + R(-8, -20, 16, 40, '#F6C77A', 4, 0) + dots([[-3, 4], [3, 12], [-2, 18]], '#FFE9B8', 1.8), r)).join('')
      + P('M24 132c10-14 24-18 40-16 20-6 46-4 64 0 16 0 26 4 34 10-4 10-10 6-14 16-6-8-10 0-16-8-8 10-14 0-22 6-6-8-12 0-20-6-8 8-16 0-22 4-8-6-14 4-22-2-6 4-14 0-22-4z', '#6D2E18')
      + dots([[44, 124], [62, 120], [80, 122], [100, 120], [118, 124], [136, 126], [72, 132], [110, 132]], '#FFFDE7', 2) + face(96, 156, 0.3)),
  L('oguratoast', 'โอกุระโทสต์ ขนมปังทาถั่วแดงกับเนย ชุดมอร์นิ่งของนาโกย่า', 'Ogura toast, Nagoya’s breakfast toast with sweet red beans', ['ogura toast', 'โอกุระโทสต์', 'red bean toast', 'ขนมปังถั่วแดง', 'anko', 'อังโกะ', 'butter', 'เนย', 'nagoya morning', 'ชุดมอร์นิ่งนาโกย่า', 'boiled egg', 'ไข่ต้ม', 'coffee shop breakfast', 'อาหารเช้าร้านกาแฟ'], 'หาก้อนเนยสีเหลืองข้างถั่วแดง', 'Find the yellow butter next to the red beans',
    // a thick slice of golden toast, half spread with dark purple-red sweet bean paste and a square of butter, the other half smiling, a boiled egg in an egg cup and a cup of coffee beside it
    E(120, 196, 100, 14, '#ECEFF1', 0) + R(28, 92, 120, 104, '#C98B3C', 20) + R(36, 100, 104, 88, '#FFE0A3', 14, 0)
      + P('M36 112c0-6 6-12 12-12h44c4 12 0 22 8 30-4 14 4 26-4 38 4 10-2 16-6 20H50c-8 0-14-6-14-14z', '#7B3F52') + dots([[52, 120], [70, 112], [62, 140], [80, 156], [54, 168], [84, 132]], '#A15C70', 3)
      + R(56, 134, 22, 16, '#FFF59D', 3, 3) + face(118, 140, 0.32)
      + R(160, 176, 32, 20, '#FFFFFF', 4) + E(176, 176, 16, 5, '#FFFFFF') + E(176, 158, 13, 17, '#FFFDE7')
      + P('M168 98h40l-4 40c-1 6-6 10-12 10h-8c-6 0-11-4-12-10z', '#FFFFFF') + E(188, 98, 20, 5, '#6D4C41') + P('M207 106c12 0 12 20 0 20', 'none') + Lc('M180 74c-6 8 6 12 0 20M194 70c-6 8 6 12 0 20', '#CFD8DC', 3)),
  L('ebifry', 'เอบิฟุไร กุ้งทอดตัวโตของนาโกย่า', 'Ebi fry, Nagoya’s big fried prawns', ['ebi fry', 'เอบิฟุไร', 'ebi furai', 'fried prawns', 'กุ้งทอด', 'breaded prawns', 'กุ้งชุบเกล็ดขนมปัง', 'tartar sauce', 'ซอสทาร์ทาร์', 'nagoya meshi', 'อาหารนาโกย่า', 'lemon', 'มะนาวเหลือง'], 'หาหางกุ้งสีแดงสองหางที่ชี้ขึ้นฟ้า', 'Find the two red prawn tails pointing at the sky',
    // two long golden breaded prawns leaning on a mound of cabbage with their red tails pointing up, a little bowl of white tartar sauce and a lemon wedge, both prawns smiling
    E(120, 196, 96, 18, '#FFFFFF') + P('M44 186c0-24 18-36 36-32 14 4 20 18 16 32z', '#DCEDC8')
      + g(110, 140, 1, P('M-18 52c-6-30 0-70 10-90 8-8 20-6 22 4 4 26 2 60-4 86z', '#F0A93B') + P('M-8-38l-14-24 12 6 6-12 6 12 10-6-10 24z', '#E53935', 3) + dots([[-6, -10], [2, 6], [-4, 24], [4, 38], [-10, 40], [6, -24]], '#FFE0A3', 2.5) + face(-2, 4, 0.24), -12)
      + g(156, 140, 1, P('M-18 52c-6-30 0-70 10-90 8-8 20-6 22 4 4 26 2 60-4 86z', '#E8A030') + P('M-8-38l-14-24 12 6 6-12 6 12 10-6-10 24z', '#EF5350', 3) + dots([[-6, -10], [2, 6], [-4, 24], [4, 38], [-10, 40], [6, -24]], '#FFE0A3', 2.5) + face(-2, 4, 0.24), 10)
      + E(196, 182, 20, 10, '#FFFFFF') + E(196, 178, 14, 5, '#FFFDE7', 0) + dots([[190, 178], [200, 177]], '#81C784', 1.8) + P('M30 150l26 10-22 14z', '#FFF176', 3)),
  L('kaerumanju', 'คาเอรุมันจู ขนมนึ่งรูปกบของนาโกย่า', 'Kaeru manjū, Nagoya’s little frog buns', ['kaeru manju', 'คาเอรุมันจู', 'frog buns', 'ขนมรูปกบ', 'frog manju', 'มันจูกบ', 'steamed buns', 'ขนมนึ่ง', 'sweet bean filling', 'ไส้ถั่วหวาน', 'nagoya sweets', 'ขนมนาโกย่า', 'souvenir', 'ของฝาก'], 'หากบสีชมพูที่อยู่ท้ายแถว', 'Find the pink frog at the end of the row',
    // four round steamed buns shaped like sitting frogs in green, white, brown and pink on a wooden tray, each with two round eyes on top and a happy face
    R(20, 160, 200, 30, '#C8A165', 8) + Lc('M30 176h180', '#A1887F', 3)
      + [[52, 140, '#AED581'], [100, 132, '#FFFFFF'], [148, 140, '#BCAAA4'], [192, 136, '#F8BBD0']].map(([x, y, c]) => E(x, y, 24, 20, c) + C(x - 11, y - 18, 7, c) + C(x + 11, y - 18, 7, c)
        + C(x - 11, y - 19, 3, INK, 0) + C(x + 11, y - 19, 3, INK, 0) + E(x - 15, y + 4, 5, 3, '#FF8FA3', 0) + E(x + 15, y + 4, 5, 3, '#FF8FA3', 0) + Lc(`M${x - 8} ${y + 2}q8 7 16 0`, INK, 3)).join('')),
  L('oyakodon', 'โอยาโกะดงไก่นาโกย่าโคชิน', 'Nagoya Cochin oyakodon, chicken and egg on rice', ['nagoya cochin', 'ไก่นาโกย่าโคชิน', 'oyakodon', 'โอยาโกะดง', 'chicken and egg rice bowl', 'ข้าวหน้าไก่ไข่', 'golden egg', 'ไข่ทอง', 'nagoya meshi', 'อาหารนาโกย่า', 'brown hen', 'แม่ไก่สีน้ำตาล'], 'หาแม่ไก่สีน้ำตาลที่ยืนข้างชาม', 'Find the brown hen standing by the bowl',
    // a blue-patterned rice bowl topped with soft golden egg, chunks of chicken and green leaves, an orange yolk in the middle, and a plump brown Nagoya Cochin hen with a red comb smiling beside it
    P('M24 120h136c0 44-30 72-68 72s-68-28-68-72z', '#FFFFFF') + Lc('M40 146c12 8 24 8 36 0s24-8 36 0 24 8 32 2', '#1E88E5', 3) + E(92, 120, 68, 16, '#FFFDE7')
      + P('M32 118c6-22 32-32 60-32s54 10 60 32c-20 8-100 8-120 0z', '#FFD54F') + [[60, 106], [96, 100], [124, 110], [78, 116]].map(([x, y]) => R(x - 9, y - 6, 18, 12, '#D7A86E', 4, 2.5)).join('')
      + C(102, 112, 9, '#FF9800', 2.5) + P('M66 98c6-6 12-6 14 0-6 2-10 2-14 0zM132 100c6-6 12-6 14 0-6 2-10 2-14 0z', '#66BB6A', 2)
      + E(190, 168, 30, 26, '#8D6E63') + P('M176 152c-6-6-4-14 2-14 2-6 10-6 12 0 6-2 10 4 6 10z', '#E53935', 3) + P('M168 168l-12 4 12 4z', '#FFB300', 2.5)
      + P('M200 160c10 2 16 10 14 22-8-2-14-10-14-22z', '#6D4C41', 3) + Lc('M182 194v12M198 194v12', '#FFB300', 4) + face(184, 164, 0.26)),
];

export default {
  places: {
    'jp-nagoya': { country: 'jp', wave: 3, name: nm('นาโกย่า', 'Nagoya'), tz: 'Asia/Tokyo', ll: [35.17, 136.88], alias: ['nagoya', 'นาโกย่า', '名古屋', 'NGO', 'centrair', 'aichi', 'ไอจิ', 'sakae', 'ซาคาเอะ', 'arimatsu', 'อาริมัตสึ', 'tokoname', 'โทโคนาเมะ', 'okazaki', 'โอคาซากิ', 'inuyama', 'อินุยามะ', 'meiji mura', 'เมจิมูระ', 'ghibli park', 'จิบลิพาร์ก'], colors: NA },
  },
  items,
};
