// Wave 16: Shenzhen — the young city on the bay next to Hong Kong: the Ping An tower over Futian, the Civic Centre's wing roof,
// the Spring Cocoon and the crystal stadium, the old liner at Shekou, Bao'an's honeycomb terminal, the Hakka walled houses and
// qilin dance, Wutong Mountain's azaleas, Huaqiangbei's gadgets, green electric buses, delivery drones, Shajing oysters.
// Skipped as repeats or bans: Window of the World, Splendid China and Happy Valley (theme parks, copies of foreign landmarks),
// the Shenzhen Bay Bridge (Boston and Bangkok have a cable-stayed bridge), the black-faced spoonbill (Taiwan), the mangroves
// (Langkawi), drone light shows (Busan), Dafen's painters (Hua Hin's artist village, Montmartre), Yantian's container port
// (Hamburg), Nan'ao sea urchins (Phú Quốc), stuffed tofu (Guilin), Lianhuashan's kites (Bali), lychees (Siem Reap), the Bay
// ferris wheel (London, Singapore), Jiaochangwei's colourful houses (Burano and many more), Dapeng Fortress (a fort), dim sum
// and egg tarts (Hong Kong, Macau), the statue on Lianhuashan (a real person).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SZ = { k1: '#C2185B', k2: '#00838F', k3: '#FCE4EC' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `cn-shenzhen.landmark.${slug}`, cat: 'landmark', file: `cn/shenzhen/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// a bougainvillea bush: magenta blossoms on a green mound (the city flower)
const bougain = (x, y, s = 1) => g(x, y, s, E(0, 4, 20, 10, '#66BB6A', 3) + [[-12, -2], [0, -8], [12, -2], [-5, 4], [7, 4]].map(([a, b]) => C(a, b, 6, '#EC407A', 2.5)).join(''));
// a little tower block with rows of windows
const block = (x, y, w, h, c, wc = '#E3F2FD') => R(x, y, w, h, c) + Lc(Array.from({ length: Math.floor((h - 8) / 12) }, (_, r) => `M${x + 5} ${y + 9 + r * 12}h${w - 10}`).join(''), wc, 3);

const items = [
  { id: 'cn-shenzhen.stamp', cat: 'stamp', file: 'cn/shenzhen/stamp.v1.svg', name: nm('ตราประทับเซินเจิ้น', 'Shenzhen stamp'), kw: ['shenzhen', 'เซินเจิ้น', 'ping an tower', 'ตึกผิงอัน', 'bougainvillea', 'ดอกเฟื่องฟ้า', 'shenzhen bay', 'อ่าวเซินเจิ้น', 'guangdong', 'กวางตุ้ง'],
    // the needle of the Ping An tower rising over the blue bay, lower towers beside it, magenta bougainvillea (the city flower) in both corners
    svg: cityStamp('csz-st', { name: 'SHENZHEN', sub: 'CHINA', ...SZ, emblem: P('M48 110h104a52 52 0 0 1-104 0z', '#80DEEA', 0) + Lc('M62 124h14M118 132h18M90 140h12', '#E0F7FA', 2.5)
      + R(70, 84, 14, 26, '#B3E5FC', 0, 3) + R(116, 78, 14, 32, '#C5CAE9', 0, 3) + P('M90 110l3-50 7-14 7 14 3 50z', '#ECEFF1') + Lc('M100 46V30', INK, 3) + Lc('M96 64l-2 46M104 64l2 46', '#90A4AE', 2)
      + [[60, 66], [68, 76], [56, 80], [140, 66], [132, 76], [144, 80]].map(([x, y]) => C(x, y, 5.5, '#EC407A', 2.5)).join('') + face(100, 86, 0.26, 'none') }) },

  { id: 'cn-shenzhen.day.futian', cat: 'day', file: 'cn/shenzhen/day-futian.v1.svg', name: nm('ตึกระฟ้าย่านฝูเถียนยามเย็น', 'The Futian skyline lighting up at dusk'), kw: ['futian', 'ฝูเถียน', 'shenzhen skyline', 'ตึกระฟ้าเซินเจิ้น', 'light show', 'การแสดงแสงไฟ', 'lianhuashan', 'เขาเหลียนฮวา', 'lotus hill', 'cbd', 'ย่านธุรกิจ', 'dusk', 'ยามเย็น'],
    // a lavender evening sky, a row of towers glowing in stripes of pink, yellow and blue with the tall Ping An needle in the middle, the green Lotus Hill and its little pavilion in front
    svg: scene('csz-d1', '#D1C4E9', C(42, 92, 14, '#FFE082', 0) + [[70, 50], [178, 42], [204, 76]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('')
      + block(22, 114, 28, 96, '#90CAF9') + block(54, 92, 26, 118, '#B39DDB', '#FFF59D') + block(84, 104, 20, 106, '#80CBC4') + block(140, 86, 24, 124, '#F48FB1', '#FFF59D') + block(168, 106, 28, 104, '#FFF59D', '#FFB74D') + block(200, 122, 30, 88, '#A5D6A7')
      + P('M106 210l4-142 10-30 10 30 4 142z', '#ECEFF1') + Lc('M120 38V18', INK, 4) + Lc('M112 76l-2 134M128 76l2 134', '#B0BEC5', 3) + Lc('M110 100h20M110 124h20M109 148h22', '#EC407A', 4)
      + P('M-4 206c40-44 100-48 140-24 40-20 80-16 108 4v70H-4z', '#81C784') + R(52, 164, 22, 12, '#FFFFFF', 0, 3) + P('M46 166l17-12 17 12z', '#E53935', 3)
      + bougain(166, 204, 1) + face(120, 168, 0.28, 'none')) },
  { id: 'cn-shenzhen.day.shenzhenbay', cat: 'day', file: 'cn/shenzhen/day-shenzhenbay.v1.svg', name: nm('ทางเดินริมน้ำในสวนอ่าวเซินเจิ้น', 'The seaside path of Shenzhen Bay Park'), kw: ['shenzhen bay park', 'สวนอ่าวเซินเจิ้น', 'shenzhen bay', 'อ่าวเซินเจิ้น', 'seaside promenade', 'ทางเดินริมทะเล', 'cycling path', 'ทางจักรยาน', 'birds', 'นก', 'bougainvillea', 'ดอกเฟื่องฟ้า'],
    // a calm grey-blue bay with soft hills on the far shore and birds overhead, a wide curving seawall path with a railing, a child riding a bike past bougainvillea bushes
    svg: scene('csz-d2', '#B3E5FC', C(190, 58, 15, '#FFF59D', 0) + Lc('M50 58q6-6 12 0q6-6 12 0M88 44q5-5 10 0q5-5 10 0M150 76q5-5 10 0q5-5 10 0', INK, 3)
      + P('M-4 112c30-18 64-18 92-6 30-16 74-18 104-2 22-8 40-6 52 2v24H-4z', '#90A4AE') + R(-4, 126, 248, 60, '#4FC3F7') + Lc('M24 146c10-5 20 5 30 0M150 140c10-5 20 5 30 0M90 162c10-5 20 5 30 0', '#E1F5FE', 4)
      + P('M-4 182c80-16 170-16 248 0v74H-4z', '#E0E0E0') + Lc('M-4 182c80-16 170-16 248 0', '#78909C', 4) + Lc('M20 176v-12M60 172v-12M100 170v-12M140 170v-12M180 172v-12M220 176v-12M16 166c80-14 160-14 210 0', '#78909C', 3)
      + P('M-4 214c80-10 170-10 248 0v42H-4z', '#A5D6A7') + bougain(36, 214, 1.1) + bougain(206, 214, 1.1)
      + C(100, 206, 13, 'none') + C(146, 206, 13, 'none') + Lc('M100 206l16-22h22l8 22M116 184l12 22', '#E53935', 4) + Lc('M136 184l-4-8h-8', INK, 3)
      + C(124, 158, 10, '#FFE0B2') + P('M114 154c2-10 18-12 20 0z', '#FFB300') + Lc('M124 168l2 14M126 172l12 10', '#29B6F6', 5) + face(124, 158, 0.2, 'none')) },
  { id: 'cn-shenzhen.day.dameisha', cat: 'day', file: 'cn/shenzhen/day-dameisha.v1.svg', name: nm('หาดต้าเหมยซาระหว่างเนินเขาเขียว', 'Dameisha beach between green hills'), kw: ['dameisha', 'ต้าเหมยซา', 'dameisha beach', 'หาดต้าเหมยซา', 'xiaomeisha', 'เสี่ยวเหมยซา', 'yantian', 'เหยียนเถียน', 'sandcastle', 'ปราสาททราย', 'beach umbrellas', 'ร่มชายหาด'],
    // a long curve of golden sand between two green hills, the blue sea with little waves, striped beach umbrellas, a smiling sandcastle with a flag
    svg: scene('csz-d3', '#E1F5FE', C(56, 56, 16, '#FFE082', 0) + P('M-4 96c26-22 56-24 84 0v40H-4z', '#66BB6A') + P('M244 88c-30-20-70-18-96 8v40h96z', '#81C784') + P('M70 120c16-14 40-14 56 0z', '#A5D6A7')
      + R(-4, 118, 248, 52, '#29B6F6') + Lc('M20 136c10-5 20 5 30 0M120 130c10-5 20 5 30 0M180 148c10-5 20 5 30 0M70 154c10-5 20 5 30 0', '#E1F5FE', 4)
      + P('M-4 170c60-14 180-14 248 0v86H-4z', '#FFE0B2') + Lc('M-4 170c60-14 180-14 248 0', '#FFFFFF', 5)
      + [[46, 168, '#E53935'], [186, 170, '#1E88E5']].map(([x, y, c]) => Lc(`M${x} ${y}v34`, INK, 4) + P(`M${x - 26} ${y}q26-24 52 0z`, c) + Lc(`M${x - 9} ${y - 12}q9-10 18 0`, '#FFFFFF', 4)).join('')
      + R(98, 196, 44, 22, '#FFCC80') + R(106, 180, 28, 16, '#FFCC80') + Lc('M98 196h8M134 196h8M120 180v-16', INK, 3) + P('M120 164l14 5-14 5z', '#EC407A', 2.5) + face(120, 206, 0.28) ) },

  L('pingan', 'ตึกผิงอันไฟแนนซ์เซ็นเตอร์ ตึกที่สูงที่สุดของเซินเจิ้น', 'Ping An Finance Centre, Shenzhen’s tallest tower', ['ping an finance centre', 'ตึกผิงอันไฟแนนซ์เซ็นเตอร์', 'ping an tower', 'ตึกผิงอัน', 'tallest tower', 'ตึกที่สูงที่สุด', 'skyscraper', 'ตึกระฟ้า', 'futian', 'ฝูเถียน', 'spire', 'ยอดแหลม'], 'หายอดแหลมบนหัวตึกที่สูงที่สุด', 'Find the pointed spire on top of the tallest tower',
    // a tall pale stone-grey tower narrowing slightly to a stepped crown and a needle spire, silver ribs running up its corners, two smaller glass towers beside it and green trees below
    bg('#E3F2FD') + low(200, '#A5D6A7') + frame + block(30, 120, 38, 80, '#B3E5FC') + block(172, 104, 38, 96, '#C5CAE9')
      + P('M86 200l6-130h56l6 130z', '#ECEFF1') + P('M92 70l8-16h40l8 16z', '#CFD8DC') + P('M100 54l20-24 20 24z', '#B0BEC5') + Lc('M120 30V12', INK, 4)
      + Lc('M100 76l-4 124M120 72v128M140 76l4 124', '#90A4AE', 3) + Lc('M92 100h56M91 124h58M90 148h60M89 172h62', '#BBDEFB', 2.5)
      + [[40, 206], [72, 210], [168, 210], [200, 206]].map(([x, y]) => C(x, y, 10, '#66BB6A', 3)).join('') + face(120, 128, 0.42)),
  L('civicwings', 'ศูนย์ราชการเซินเจิ้นกับหลังคารูปปีกนกยักษ์', 'Shenzhen Civic Centre and its giant wing roof', ['shenzhen civic centre', 'ศูนย์ราชการเซินเจิ้น', 'civic center', 'wing roof', 'หลังคารูปปีก', 'great roc wings', 'ปีกนกยักษ์', 'citizens square', 'ลานพลเมือง', 'futian', 'ฝูเถียน'], 'หาปีกหลังคาทั้งสองข้างที่โค้งเหมือนนกกางปีก', 'Find the two roof wings curving like a bird spreading them',
    // a long low pale building under a huge wavy grey roof grid that dips in the middle like a bird's two spread wings, a taller block in the centre, a wide square with fountains in front
    bg('#FFF8E1') + low(186, '#E0E0E0') + frame + R(36, 124, 168, 50, '#FFFFFF') + R(98, 104, 44, 70, '#E3F2FD') + Lc('M106 116h28M106 130h28M106 144h28', '#90CAF9', 3)
      + Lc('M48 124v50M66 124v50M84 124v50M156 124v50M174 124v50M192 124v50', '#CFD8DC', 3)
      + P('M18 114c26-36 66-40 102-10 36-30 76-26 102 10l-8 10c-26-30-62-32-94-6-32-26-68-24-94 6z', '#90A4AE') + Lc('M40 98l6 14M62 88l2 16M84 88l-2 16M104 98l-4 10M136 98l4 10M156 88l2 16M178 88l-2 16M200 98l-6 14', '#ECEFF1', 2.5)
      + R(30, 174, 180, 10, '#BDBDBD', 0, 3) + E(76, 204, 22, 7, '#81D4FA', 3) + E(164, 204, 22, 7, '#81D4FA', 3) + Lc('M76 202v-12M70 194l6-6 6 6M164 202v-12M158 194l6-6 6 6', '#4FC3F7', 3)
      + face(120, 150, 0.4)),
  L('springcocoon', 'สนามกีฬาอ่าวเซินเจิ้น รังไหมแห่งฤดูใบไม้ผลิ', 'Shenzhen Bay Sports Centre, the Spring Cocoon', ['shenzhen bay sports centre', 'สนามกีฬาอ่าวเซินเจิ้น', 'spring cocoon', 'รังไหมฤดูใบไม้ผลิ', 'chunjian', 'ชุนเจี่ยน', 'white lattice', 'โครงตาข่ายสีขาว', 'stadium', 'สนามกีฬา', 'houhai', 'โฮ่วไห่'], 'หาตาข่ายสีขาวที่ห่อสนามไว้เหมือนรังไหม', 'Find the white net wrapping the stadium like a cocoon',
    // a big round white shell made of a criss-cross lattice like a silkworm cocoon, a smaller shell beside it, sitting at the edge of the blue bay
    bg('#E1F5FE') + low(160, '#4FC3F7') + frame + R(16, 176, 208, 18, '#E0E0E0', 0, 0) + low(194, '#A5D6A7')
      + P('M150 180c0-30 18-50 40-50s34 20 34 50z', '#FFFFFF') + Lc('M160 180c4-24 16-40 30-44M200 180c-2-22-6-36-14-44M176 136c10 8 24 22 30 44M156 152c14 4 40 10 64 12', '#B0BEC5', 2.5)
      + P('M24 180c0-52 40-86 86-86s82 34 82 86z', '#FFFFFF') + Lc('M40 180c10-44 34-72 64-84M74 180c4-44 16-70 30-82M146 180c-6-44-22-70-40-84M178 180c-10-40-30-66-56-80M44 146c40-8 92-8 132 0M60 120c30-8 70-8 100 0', '#B0BEC5', 3)
      + face(108, 150, 0.42)),
  L('universiade', 'ศูนย์กีฬายูนิเวอร์ซิเอดเซินเจิ้น สนามคริสตัล', 'The crystal stadium of the Universiade Sports Centre', ['universiade sports centre', 'ศูนย์กีฬายูนิเวอร์ซิเอด', 'crystal stadium', 'สนามคริสตัล', 'longgang', 'หลงกั่ง', 'faceted roof', 'หลังคาเหลี่ยมเพชร', 'stadium', 'สนามกีฬา', 'sports park', 'สวนกีฬา'], 'หาเหลี่ยมคริสตัลสีม่วงบนหลังคา', 'Find the purple crystal faces on the roof',
    // a wide oval stadium whose walls and roof are made of shining triangular crystal faces in pale blue and lilac, an open top, green hills and a lake in front
    bg('#EDE7F6') + P('M16 120c40-30 90-30 120-10 30-20 70-20 88 0v40H16z', '#A5D6A7', 0) + low(184, '#81D4FA') + frame
      + P('M24 176l12-44 40-26h88l40 26 12 44z', '#B3E5FC') + P('M36 132l40-26 14 30zM76 106h88l-30 30H90zM164 106l40 26-50 4z', '#D1C4E9')
      + Lc('M36 132l18 44M90 136l-36 40M90 136l30 40M134 136l-14 40M134 136l52 40M154 136l50-4M204 132l-18 44M36 132l54 4', '#90A4AE', 2.5)
      + E(120, 112, 34, 7, '#7E57C2', 3) + R(20, 176, 200, 8, '#B0BEC5', 0, 3) + Lc('M40 202c10-5 20 5 30 0M150 206c10-5 20 5 30 0', '#E1F5FE', 4) + face(120, 156, 0.4)),
  L('minghua', 'เรือหมิงหัวที่ซีเวิลด์เสอโข่ว', 'The Minghua ship at Shekou Sea World', ['minghua ship', 'เรือหมิงหัว', 'sea world shekou', 'ซีเวิลด์เสอโข่ว', 'shekou', 'เสอโข่ว', 'old cruise ship', 'เรือสำราญเก่า', 'ship on land', 'เรือบนบก', 'plaza fountain', 'น้ำพุกลางลาน'], 'หาปล่องควันสีเหลืองบนเรือที่จอดอยู่บนบก', 'Find the yellow funnel on the ship that sits on land',
    // an old white ocean liner with a blue stripe and round portholes resting in a shallow pool in the middle of a plaza, a yellow funnel, flags along a line, palm trees on each side
    bg('#FFF3E0') + low(186, '#FFE0B2') + frame + E(120, 186, 98, 10, '#81D4FA', 3)
      + P('M28 150l16 32h156l18-32z', '#FFFFFF') + Lc('M34 162h172', '#1E88E5', 5) + [70, 94, 118, 142, 166].map((x) => C(x, 172, 4, '#90CAF9', 2.5)).join('')
      + R(58, 124, 118, 26, '#FFFFFF') + R(78, 102, 76, 22, '#FFFFFF') + Lc('M66 136h102M86 112h60', '#90CAF9', 4) + R(130, 70, 18, 32, '#FFB300') + R(130, 70, 18, 8, '#5D4037', 0, 3)
      + Lc('M44 150L96 96l34-26M148 76l52 74', INK, 2) + [[62, 132, '#E53935'], [80, 113, '#FFB300'], [168, 112, '#43A047'], [184, 130, '#1E88E5']].map(([x, y, c]) => P(`M${x} ${y}l6-2-2 8z`, c, 2)).join('')
      + Lc('M40 206c2-20 0-36 4-50', '#8D6E63', 6) + P('M44 156c-12-10-22-10-26-4 10-2 18 0 26 4zM44 156c8-14 18-16 24-10-10 2-16 4-24 10z', '#43A047', 3)
      + Lc('M200 206c-2-20 0-36-4-50', '#8D6E63', 6) + P('M196 156c12-10 22-10 26-4-10-2-18 0-26 4zM196 156c-8-14-18-16-24-10 10 2 16 4 24 10z', '#43A047', 3) + face(120, 134, 0.34)),
  L('baoan', 'อาคารผู้โดยสารรังผึ้งของสนามบินเป่าอัน', 'Bao’an Airport’s honeycomb terminal', ['shenzhen baoan airport', 'สนามบินเป่าอันเซินเจิ้น', 'baoan airport', 'สนามบินเป่าอัน', 'terminal 3', 'อาคารผู้โดยสาร 3', 'honeycomb roof', 'หลังคารังผึ้ง', 'manta ray', 'กระเบนราหู', 'airport', 'สนามบิน'], 'หาช่องหกเหลี่ยมบนหลังคาอาคาร', 'Find the six-sided holes in the terminal roof',
    // a long low white terminal curving like a manta ray, its skin full of rows of hexagon windows, a smiling plane rolling past on the grey runway in front
    bg('#E3F2FD') + low(176, '#B0BEC5') + frame + Lc('M30 210h40M100 210h40M170 210h40', '#FFFFFF', 4)
      + P('M18 160c16-34 58-52 102-52s86 18 102 52z', '#FFFFFF') + R(28, 160, 184, 14, '#90A4AE')
      + [[60, 140], [84, 130], [108, 124], [132, 124], [156, 130], [180, 140], [72, 150], [96, 144], [120, 142], [144, 144], [168, 150]].map(([x, y]) => P(`M${x - 6} ${y}l3-5h6l3 5-3 5h-6z`, '#81D4FA', 2)).join('')
      + P('M70 196c0-6 10-10 40-10h40c12 0 20 4 20 10s-8 10-20 10h-60c-12 0-20-4-20-10z', '#FFFFFF') + P('M104 196l-26-20h12l34 20z', '#90CAF9', 3) + P('M74 192l-8-14h8l10 14z', '#EC407A', 3)
      + Lc('M150 192h10', '#90CAF9', 4) + face(128, 196, 0.24, 'none')),
  L('hakkahouse', 'บ้านล้อมกำแพงชาวฮากกาเฮ่อหูซินจวี', 'The Hakka walled house of Hehu Xinju', ['hehu xinju', 'เฮ่อหูซินจวี', 'hakka walled house', 'บ้านล้อมกำแพงชาวฮากกา', 'hakka enclosure', 'หมู่บ้านล้อมกำแพง', 'corner towers', 'หอมุม', 'half-moon pond', 'สระรูปครึ่งวงกลม', 'longgang', 'หลงกั่ง', 'dawanshiju', 'ต้าว่านซื่อจวี'], 'หาสระน้ำรูปพระจันทร์ครึ่งดวงหน้าบ้าน', 'Find the half-moon pond in front of the house',
    // a wide grey-and-white walled house of the Hakka with a tall square tower at each front corner under stepped dark roofs, a big wooden gate in the middle, a half-moon pond in front
    bg('#F1F8E9') + low(196, '#C5E1A5') + frame + R(40, 110, 160, 64, '#F5F5F5') + R(40, 102, 160, 10, '#78909C', 0, 3) + Lc('M40 124h160', '#CFD8DC', 3)
      + R(22, 70, 34, 104, '#FFFFFF') + R(184, 70, 34, 104, '#FFFFFF') + P('M16 74l23-18 23 18z', '#546E7A') + P('M178 74l23-18 23 18z', '#546E7A') + Lc('M22 92h34M184 92h34', '#90A4AE', 3)
      + R(32, 102, 12, 12, '#5D4037', 0, 2.5) + R(196, 102, 12, 12, '#5D4037', 0, 2.5) + [70, 160].map((x) => R(x, 132, 10, 10, '#5D4037', 0, 2.5)).join('')
      + R(98, 128, 44, 46, '#E0E0E0') + P('M90 130l30-16 30 16z', '#546E7A') + R(108, 140, 24, 34, '#A1887F', 2) + Lc('M120 140v34', '#6D4C41', 2.5)
      + R(28, 174, 184, 12, '#D7CCC8', 0, 3) + P('M54 192h132a66 30 0 0 1-132 0z', '#4FC3F7') + Lc('M90 202c8-4 16 4 24 0M130 200c8-4 16 4 24 0', '#E1F5FE', 3) + face(120, 156, 0.32)),
  L('wutong', 'ภูเขาอู๋ถงกับดอกอาซาเลียสีชมพู', 'Wutong Mountain and its pink azaleas', ['wutong mountain', 'ภูเขาอู๋ถง', 'wutongshan', 'อู๋ถงซาน', 'highest peak', 'ยอดเขาสูงที่สุด', 'pink azaleas', 'ดอกอาซาเลียสีชมพู', 'mountain path', 'ทางเดินขึ้นเขา', 'mist', 'หมอก'], 'หาดอกไม้สีชมพูข้างทางขึ้นยอดเขา', 'Find the pink flowers beside the path to the top',
    // a big green mountain peak rising out of soft white mist, layers of blue hills behind, a stone step path winding up to a smiling rock at the top, pink azalea trees beside it
    bg('#E8F5E9') + P('M16 120c30-30 60-30 84-10 30-24 70-30 124 0v40H16z', '#B3E5FC', 0) + P('M16 150c40-60 80-100 104-104 30 4 70 50 104 104v74H16z', '#66BB6A', 0) + frame
      + Lc('M16 160c30-10 50 0 70-6M150 168c24-8 44-4 74 2', '#FFFFFF', 8)
      + Lc('M120 66c-14 16 10 26-8 40s14 22-6 36 16 22-6 36 10 20-4 40', '#D7CCC8', 9) + Lc('M112 112h12M108 148h14M110 184h14', '#A1887F', 3)
      + E(120, 60, 18, 12, '#BDBDBD') + face(120, 58, 0.26, 'none')
      + [[64, 130], [170, 128], [56, 186], [182, 188]].map(([x, y]) => Lc(`M${x} ${y + 26}v-16`, '#6D4C41', 5) + [[-10, 0], [0, -8], [10, 0], [-4, 8], [6, 8]].map(([a, b]) => C(x + a, y + b, 6, '#F48FB1', 2.5)).join('')).join('')),
  L('huaqiangbei', 'ตลาดอิเล็กทรอนิกส์หัวเฉียงเป่ย', 'Huaqiangbei electronics market', ['huaqiangbei', 'หัวเฉียงเป่ย', 'electronics market', 'ตลาดอิเล็กทรอนิกส์', 'gadgets', 'อุปกรณ์ไฟฟ้า', 'circuit board', 'แผงวงจร', 'little robot', 'หุ่นยนต์ตัวเล็ก', 'led lights', 'ไฟแอลอีดี'], 'หาหุ่นยนต์ตัวเล็กที่โบกมืออยู่บนเคาน์เตอร์', 'Find the little robot waving on the counter',
    // a busy little market stall: shelves of colourful boxes and coiled cables, a string of LED lights, a green circuit board, and a smiling little robot waving from the counter
    bg('#FFFDE7') + frame + R(30, 40, 180, 82, '#FFE0B2') + Lc('M30 80h180', '#A1887F', 4)
      + [[36, 50, '#EF5350'], [62, 50, '#42A5F5'], [88, 50, '#66BB6A'], [154, 50, '#AB47BC'], [180, 50, '#FFCA28']].map(([x, y, c]) => R(x, y, 22, 24, c, 3, 3)).join('')
      + [[50, 100, '#EF5350'], [80, 100, '#29B6F6'], [170, 100, '#66BB6A']].map(([x, y, c]) => C(x, y, 12, 'none', 3) + Lc(`M${x - 8} ${y}a8 8 0 1 1 16 0a5 5 0 1 1-10 0`, c, 4)).join('')
      + Lc('M30 34c30 12 60 12 90 0s60-12 90 0', INK, 2) + [44, 66, 88, 110, 132, 154, 176, 198].map((x, k) => C(x, 38 + (k % 2) * 4, 4, ['#FF4081', '#FFEB3B', '#00E5FF', '#76FF03'][k % 4], 2)).join('')
      + R(20, 160, 200, 40, '#8D6E63') + R(20, 152, 200, 10, '#A1887F')
      + R(144, 128, 60, 28, '#43A047', 3) + Lc('M150 136h20v12h14M188 134v16M160 152h-6', '#FFD54F', 2.5) + R(172, 132, 10, 10, INK, 0, 0)
      + R(74, 104, 46, 36, '#B0BEC5', 8) + Lc('M97 104V92', INK, 3) + C(97, 89, 4, '#FF4081', 2.5) + R(78, 140, 38, 14, '#90A4AE', 4) + ol('M120 116l14-14', '#B0BEC5', 5) + ol('M74 120l-10 14', '#B0BEC5', 5)
      + face(97, 120, 0.4)),
  L('electricbus', 'รถเมล์ไฟฟ้าสีเขียวของเซินเจิ้นกำลังชาร์จไฟ', 'Shenzhen’s green electric bus charging up', ['electric bus', 'รถเมล์ไฟฟ้า', 'shenzhen bus', 'รถเมล์เซินเจิ้น', 'charging post', 'ที่ชาร์จไฟ', 'clean air', 'อากาศสะอาด', 'electric taxi', 'แท็กซี่ไฟฟ้า', 'green bus', 'รถเมล์สีเขียว'], 'หาสายชาร์จที่ต่อจากรถเมล์ไปยังเสา', 'Find the charging cable from the bus to the post',
    // a bright green city bus with big windows and a smiling front, a cable curving from its side to a white charging post marked with a yellow lightning bolt, a tree behind
    bg('#E0F7FA') + low(184, '#B0BEC5') + frame + C(52, 70, 22, '#81C784', 3) + R(48, 88, 8, 30, '#8D6E63', 0, 3)
      + R(22, 108, 152, 70, '#43A047', 14) + R(22, 160, 152, 18, '#2E7D32', 0, 4) + [34, 64, 94, 124].map((x) => R(x, 118, 24, 26, '#E0F7FA', 4, 3)).join('') + R(150, 118, 18, 42, '#B2EBF2', 3, 3)
      + C(54, 182, 13, '#455A64', 4) + C(54, 182, 5, '#CFD8DC', 3) + C(140, 182, 13, '#455A64', 4) + C(140, 182, 5, '#CFD8DC', 3)
      + R(192, 100, 26, 82, '#FFFFFF', 6) + P('M207 112l-8 16h7l-4 14 12-18h-7l4-12z', '#FFEB3B', 2.5) + ol('M174 152c8 0 10 14 18 10', '#455A64', 4) + face(96, 152, 0.3)),
  L('dronedelivery', 'โดรนส่งอาหารบินมาส่งในสวน', 'A delivery drone bringing lunch to the park', ['delivery drone', 'โดรนส่งของ', 'drone delivery', 'โดรนส่งอาหาร', 'lunch box', 'กล่องข้าว', 'landing pad', 'จุดลงจอด', 'talent park', 'สวนทาเลนต์', 'shenzhen bay', 'อ่าวเซินเจิ้น'], 'หากล่องข้าวที่ห้อยอยู่ใต้โดรน', 'Find the lunch box hanging under the drone',
    // a little four-rotor drone with a smiling face flying over a green park with a box of lunch hanging under it, heading for a tall delivery kiosk with a round landing pad on top, towers in the distance
    bg('#E3F2FD') + block(30, 120, 26, 70, '#C5CAE9') + block(60, 104, 22, 86, '#B3E5FC') + low(180, '#A5D6A7') + frame
      + R(162, 112, 40, 80, '#FFFFFF', 4) + R(170, 136, 24, 30, '#81D4FA', 3, 3) + E(182, 108, 30, 8, '#FFB300') + Lc('M170 108h24', INK, 3)
      + Lc('M70 66h80', INK, 5) + E(70, 60, 20, 5, '#B0BEC5', 3) + E(150, 60, 20, 5, '#B0BEC5', 3) + Lc('M70 66v-6M150 66v-6', INK, 4)
      + R(92, 62, 36, 20, '#FFFFFF', 8) + face(110, 70, 0.28, 'none') + Lc('M100 82l-4 18M120 82l4 18', INK, 2.5)
      + R(88, 100, 44, 30, '#FF7043', 4) + Lc('M110 100v30M88 112h44', '#FFE0B2', 3) + face(110, 118, 0.26)
      + [[40, 208], [128, 206]].map(([x, y]) => C(x, y, 10, '#66BB6A', 3)).join('') + Lc('M52 52c8-6 14-6 18 0M152 44c6-4 12-4 16 0', '#B0BEC5', 3)),
  L('qilin', 'การเชิดกิเลนของชาวฮากกา', 'The Hakka qilin dance', ['qilin dance', 'การเชิดกิเลน', 'hakka qilin', 'กิเลนฮากกา', 'qilin', 'กิเลน', 'bantian', 'ป่านเถียน', 'festival', 'เทศกาล', 'drum', 'กลอง'], 'หาเขาเดียวบนหัวกิเลน', 'Find the single horn on the qilin’s head',
    // a big friendly qilin dance head with one golden horn, big round eyes under bushy brows, a wide red smile, a fluffy white beard and a long red cloth body with gold scales waving behind, a small red drum beside it
    P('M120 120c40-10 80 0 100 30-10 26-40 34-70 28z', '#E53935') + Lc('M150 146c10-6 20-6 30 0M170 132c10-4 20-2 28 4', '#FFD54F', 4)
      + P('M50 120c0-40 30-64 70-64s70 24 70 64c0 34-30 56-70 56s-70-22-70-56z', '#43A047') + P('M70 130c0-24 22-40 50-40s50 16 50 40-22 38-50 38-50-14-50-38z', '#FFF59D')
      + P('M114 58l6-30 6 30z', '#FFCA28') + [[62, 76], [84, 62], [156, 62], [178, 76]].map(([x, y]) => C(x, y, 7, '#FF7043', 3)).join('')
      + P('M80 166c10 22 24 32 40 32s30-10 40-32c-12 6-26 10-40 10s-28-4-40-10z', '#FFFFFF') + Lc('M96 182l-4 12M120 188v12M144 182l4 12', '#E0E0E0', 2.5)
      + Lc('M78 92q14-10 28 0M134 92q14-10 28 0', INK, 4) + C(94, 112, 15, '#FFFFFF') + C(146, 112, 15, '#FFFFFF') + C(96, 114, 7, INK, 0) + C(148, 114, 7, INK, 0) + C(99, 110, 2.5, '#FFFFFF', 0) + C(151, 110, 2.5, '#FFFFFF', 0)
      + P('M96 138q24 26 48 0z', '#E53935') + E(76, 136, 9, 5, '#FF8FA3', 0) + E(164, 136, 9, 5, '#FF8FA3', 0)
      + E(42, 196, 22, 8, '#E53935') + R(20, 176, 44, 20, '#E53935') + E(42, 176, 22, 8, '#FFE0B2') + Lc('M28 168l14-14M56 168l-10-14', '#8D6E63', 3)),
  L('hakkahat', 'หมวกเหลียงเม่าของชาวฮากกา', 'The Hakka cool hat with its cloth fringe', ['hakka cool hat', 'หมวกเหลียงเม่า', 'liangmao', 'เหลียงเม่า', 'hakka hat', 'หมวกชาวฮากกา', 'straw hat', 'หมวกสาน', 'cloth fringe', 'ชายผ้ารอบหมวก', 'sun hat', 'หมวกกันแดด'], 'หารูกลมตรงกลางหมวก', 'Find the round hole in the middle of the hat',
    // a flat round woven straw hat with a round hole in the middle and a dark blue pleated cloth curtain hanging all around its rim, two little ribbons, sitting on a stool
    R(78, 196, 84, 10, '#A1887F', 3) + Lc('M90 206v14M150 206v14', '#8D6E63', 6)
      + P('M28 118v50c12 8 24 8 36 0 12 8 24 8 36 0 12 8 24 8 40 0 12 8 24 8 36 0 12 8 24 8 36 0v-50z', '#3949AB') + Lc('M46 132v38M82 138v34M120 140v34M158 138v34M194 132v38', '#5C6BC0', 3)
      + E(120, 118, 96, 28, '#F2D38A') + Lc('M44 112c40-12 112-12 152 0M42 124c40 12 116 12 156 0M70 100l-12 32M100 94l-6 46M140 94l6 46M170 100l12 32', '#D4A85A', 2.5)
      + E(120, 112, 26, 9, '#FFF8E1') + E(120, 112, 18, 6, '#8D6E63', 3) + Lc('M190 128c10 10 12 22 6 34M200 124c14 8 18 20 14 32', '#EC407A', 4)
      + face(120, 150, 0.42)),
  L('saltchicken', 'ไก่อบเกลือแบบฮากกา', 'Hakka salt-baked chicken', ['salt-baked chicken', 'ไก่อบเกลือ', 'hakka chicken', 'ไก่ฮากกา', 'yanju ji', 'เหยียนจวีจี', 'clay pot', 'หม้อดิน', 'coarse salt', 'เกลือเม็ดหยาบ', 'ginger dip', 'น้ำจิ้มขิง'], 'หาห่อกระดาษที่โผล่ขึ้นจากกองเกลือ', 'Find the paper parcel peeking out of the salt',
    // a dark clay pot heaped with white coarse salt, a paper-wrapped chicken parcel peeking out of the salt, and in front a plate of golden chicken pieces with a little dish of ginger dip
    P('M30 96h104l-8 66c-2 10-10 16-20 16H58c-10 0-18-6-20-16z', '#8D6E63') + E(82, 96, 54, 12, '#6D4C41') + P('M34 96c10-14 30-20 48-18s40 4 50 18z', '#FFFFFF')
      + [[46, 90], [58, 86], [70, 92], [96, 88], [110, 92], [122, 90]].map(([x, y]) => C(x, y, 3, '#ECEFF1', 1.5)).join('')
      + P('M62 88c-2-20 6-36 20-40 14 4 22 20 20 40z', '#FFF3E0') + Lc('M72 62l10 8 10-8M82 48v40', '#E0C9A6', 2.5) + face(82, 72, 0.3)
      + E(150, 186, 66, 20, '#FFFFFF') + E(150, 184, 54, 14, '#FAFAFA', 2.5)
      + [[-30, 0], [-10, -6], [10, -6], [30, 0]].map(([dx, dy]) => g(150 + dx, 178 + dy, 1, R(-12, -9, 24, 18, '#FFD54F', 6, 3) + Lc('M-8-3h16', '#FFF59D', 3), dx / 4)).join('')
      + E(196, 128, 22, 9, '#FFFFFF') + E(196, 126, 15, 5, '#FFE082', 0) + [[188, 126], [196, 124], [204, 127]].map(([x, y]) => C(x, y, 2, '#FFB300', 0)).join('')),
  L('squab', 'ลูกนกพิราบย่างกวงหมิง', 'Guangming roast squab', ['guangming squab', 'ลูกนกพิราบย่างกวงหมิง', 'roast squab', 'ลูกนกพิราบย่าง', 'roast pigeon', 'นกพิราบย่าง', 'guangming', 'กวงหมิง', 'crispy skin', 'หนังกรอบ', 'lemon wedge', 'มะนาวเหลือง'], 'หามะนาวซีกข้างจาน', 'Find the lemon wedge beside the plate',
    // a small glossy mahogany-brown roast bird sitting on a round white plate, its crispy skin shining, a lemon wedge and a few crunchy prawn crackers beside it, a little dish of salt and pepper
    E(120, 168, 92, 28, '#FFFFFF') + E(120, 166, 78, 20, '#FAFAFA', 2.5)
      + E(118, 136, 50, 34, '#A1562B') + C(80, 116, 18, '#A1562B') + Lc('M100 118c10-8 30-8 40 0', '#D4884E', 4) + Lc('M150 150l18 6M146 158l16 10', '#8B4513', 5)
      + C(64, 118, 4, '#FFB74D', 2) + face(118, 140, 0.38)
      + P('M168 176l34-14c4 10 0 20-10 24z', '#FFF176') + Lc('M172 176l22-8', '#FBC02D', 2)
      + [[40, 176], [56, 186]].map(([x, y]) => E(x, y, 13, 7, '#FFCCBC', 2.5)).join('') + E(196, 118, 16, 7, '#FFFFFF') + E(196, 116, 10, 3, '#BCAAA4', 0)),
  L('goldenoysters', 'หอยนางรมตากแห้งสีทองของซาจิ่ง', 'Shajing’s golden sun-dried oysters', ['shajing oysters', 'หอยนางรมซาจิ่ง', 'golden oysters', 'หอยนางรมสีทอง', 'dried oysters', 'หอยนางรมตากแห้ง', 'shajing', 'ซาจิ่ง', 'bamboo rack', 'ราวไม้ไผ่', 'baoan', 'เป่าอัน'], 'หาหอยตัวใหญ่ที่ยิ้มอยู่ข้างราวตาก', 'Find the big smiling oyster beside the drying rack',
    // golden oysters threaded on strings drying in the sun on a bamboo rack by the sea, a big rough grey oyster shell open in front with a smiling pearly inside
    bg('#FFF8E1') + C(186, 52, 18, '#FFE082', 3) + low(130, '#4FC3F7') + low(170, '#FFE0B2') + frame
      + Lc('M34 160V60M206 160V60M30 64h180', '#A1887F', 6) + Lc('M34 160V60M206 160V60M30 64h180', '#D7B98A', 2)
      + [64, 98, 132, 166].map((x) => Lc(`M${x} 64v60`, INK, 2) + [80, 98, 116].map((y) => E(x, y, 9, 7, '#FFB74D', 2.5)).join('')).join('')
      + P('M70 196c-6-24 16-40 50-40s58 14 52 40c-8 14-30 20-52 20s-44-6-50-20z', '#90A4AE') + E(120, 188, 40, 16, '#ECEFF1', 3) + E(120, 188, 26, 10, '#FFFDE7', 0)
      + Lc('M76 176c10 4 20 0 30 4M140 172c10 4 20 2 28 6', '#B0BEC5', 3) + face(120, 184, 0.3)),
];

export default {
  places: {
    'cn-shenzhen': { country: 'cn', wave: 3, name: nm('เซินเจิ้น', 'Shenzhen'), tz: 'Asia/Shanghai', ll: [22.54, 114.06], alias: ['shenzhen', 'เซินเจิ้น', '深圳', 'SZX', 'futian', 'ฝูเถียน', 'luohu', 'หลอหู', 'lo wu', 'shekou', 'เสอโข่ว', 'dameisha', 'ต้าเหมยซา', 'xiaomeisha', 'dapeng', 'ต้าเผิง', 'huaqiangbei', 'หัวเฉียงเป่ย', 'wutong mountain', 'yantian'], colors: SZ },
  },
  items,
};
