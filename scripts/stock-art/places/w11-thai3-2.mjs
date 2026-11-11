// Wave 11, Thailand (south): Nakhon Si Thammarat, Khiriwong, Khanom and Sichon — the city stamp, two day scenes and the place's
// own landmarks, fruits, foods and crafts; the great stupa only as a building, the shadow puppet a comic clown (no deity)
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NS = { k1: '#B23A48', k2: '#C9962B', k3: '#FFF1E6' };
const CITY = 'th-nakhonsi', DIR = 'th/nakhonsi';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// the great white bell stupa with its golden spire (x = centre, b = base line, s = size)
const stupa = (x, b, s, sw) => R(x - 40 * s, b - 22 * s, 80 * s, 22 * s, '#F5F5F5', 0, sw) + P(`M${x - 34 * s} ${b - 22 * s}c0-30 ${14 * s}-50 ${34 * s}-50s${34 * s} 20 ${34 * s} 50z`, '#FFFFFF', sw)
  + R(x - 14 * s, b - 82 * s, 28 * s, 10 * s, '#FFFFFF', 0, sw) + P(`M${x - 10 * s} ${b - 82 * s}L${x} ${b - 150 * s}L${x + 10 * s} ${b - 82 * s}z`, '#FFCA28', sw)
  + [0, 1, 2, 3].map((k) => Lc(`M${x - (8 - k * 1.6) * s} ${b - (92 + k * 12) * s}h${(16 - k * 3.2) * s}`, '#F9A825', 2)).join('');
const palm = (x, y, s = 1) => Lc(`M${x} ${y}c${4 * s}-${20 * s} 0-${40 * s} ${-4 * s}-${56 * s}`, '#8D6E63', 5 * s) + [[-26, 4], [-18, -10], [20, -10], [26, 6], [0, -16]].map(([dx, dy]) => P(`M${x - 4 * s} ${y - 56 * s}q${dx * 0.6 * s} ${(dy - 10) * s} ${dx * s} ${(dy + 6) * s}`, 'none', 0) + Lc(`M${x - 4 * s} ${y - 56 * s}q${dx * 0.6 * s} ${(dy - 12) * s} ${dx * s} ${(dy + 8) * s}`, '#43A047', 6 * s)).join('');

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับนครศรีธรรมราช', 'Nakhon Si Thammarat stamp'), kw: ['nakhon si thammarat', 'นครศรีธรรมราช', 'khiriwong', 'คีรีวง', 'khanom beach', 'ขนอม'],
    // the great white bell stupa with its tall golden spire
    svg: cityStamp('nst-st', { name: 'NAKHON SI', sub: 'THAMMARAT · THAILAND', ...NS, emblem: R(64, 128, 72, 10, '#E0E0E0', 0, 2.5) + R(74, 116, 52, 12, '#FFFFFF', 0, 2.5) + P('M78 116c0-22 10-32 22-32s22 10 22 32z', '#FFFFFF', 3) + R(92, 78, 16, 6, '#FFFFFF', 0, 2) + P('M94 78l6-30 6 30z', '#FFCA28', 2.5) + C(70, 72, 7, '#FFCA28', 2) }) },

  D('oldcity', 'เมืองเก่านครกับพระธาตุสีขาว', 'The old city and its great white stupa', ['nakhon si thammarat old city', 'เมืองเก่านครศรีธรรมราช', 'wat phra mahathat', 'วัดพระมหาธาตุ', 'city wall', 'กำแพงเมือง', 'temple town', 'เมืองพระธาตุ', 'southern thailand', 'ภาคใต้'],
    // the white stupa with its golden spire rising over low red roofs, coconut palms and the old brick city wall in front
    scene('nst-d1', '#FFE0B2', C(196, 60, 18, '#FFF59D', 3) + stupa(110, 170, 0.95) + palm(30, 180, 1.1) + palm(200, 176)
      + [[50, 160], [150, 166], [180, 168]].map(([x, y]) => R(x - 20, y, 40, 26, '#FFF8E1') + P(`M${x - 26} ${y + 2}l26-16 26 16z`, '#D84315')).join('')
      + R(-4, 186, 248, 60, '#C1694F') + [10, 50, 90, 130, 170, 210].map((x) => R(x, 178, 16, 10, '#C1694F')).join('') + Lc('M-4 206h248M-4 226h248', '#A1522E', 3) + face(110, 132, 0.35))),

  D('khiriwong', 'หมู่บ้านคีรีวงกับสวนผลไม้', 'Khiriwong village and its fruit orchards', ['khiriwong village', 'หมู่บ้านคีรีวง', 'khao luang', 'เขาหลวง', 'mountain stream', 'ลำธารบนเขา', 'fruit orchards', 'สวนผลไม้', 'clean air village', 'หมู่บ้านอากาศดี'],
    // a green valley under the big Khao Luang mountain, a clear stream over round stones, wooden houses, orchard trees heavy with fruit
    scene('nst-d2', '#B3E5FC', P('M-4 120l70-70 50 30 50-50 78 70v40H-4z', '#7CB342') + P('M100 54c20-6 40 4 50 14', 'none', 0) + P('M90 52c20-14 50-10 70 6-20 4-50 4-70-6z', '#FFFFFF', 3)
      + P('M-4 120c60-10 180-10 248 0v130H-4z', '#9CCC65') + [[40, 130, '#C0CA33'], [196, 126, '#8D6E63']].map(([x, y, c]) => C(x, y, 22, '#43A047') + [[-8, 4], [8, -2], [2, 12]].map(([dx, dy]) => C(x + dx, y + dy, 4, c, 2)).join('')).join('')
      + [[96, 140], [146, 136]].map(([x, y]) => R(x - 16, y, 32, 22, '#D7A86E') + P(`M${x - 22} ${y + 2}l22-14 22 14z`, '#8D6E63') + R(x - 4, y + 8, 8, 14, '#6D4C41', 0, 2)).join('')
      + P('M70 250c10-40 50-50 60-80l24 4c-14 30-46 40-56 76z', '#4FC3F7') + [[96, 214], [120, 192], [84, 236]].map(([x, y]) => E(x, y, 8, 5, '#B0BEC5', 2.5)).join('') + face(120, 92, 0.35))),

  L('mahathat', 'พระบรมธาตุเจดีย์นครศรีธรรมราช', 'The great stupa of Wat Phra Mahathat', ['wat phra mahathat', 'วัดพระมหาธาตุวรมหาวิหาร', 'phra borommathat chedi', 'พระบรมธาตุเจดีย์', 'golden spire', 'ยอดทองคำ', 'white stupa', 'เจดีย์สีขาว', 'world heritage', 'มรดกโลก'], nm('หายอดเจดีย์สีทองที่สูงเสียดฟ้า', 'Find the tall golden spire reaching up to the sky'),
    // the huge bell-shaped white stupa on its square base, the tall shining gold spire, a cloister wall with little stupas round it (building only)
    R(14, 196, 212, 22, '#FFF8E1', 0) + Lc('M14 196h212', INK, 4) + [36, 72, 168, 204].map((x) => R(x - 9, 176, 18, 20, '#FFFFFF', 0, 3) + P(`M${x - 7} 176c0-12 7-18 7-24 0 6 7 12 7 24z`, '#FFFFFF', 3) + Lc(`M${x} 152v-8`, '#FFCA28', 3)).join('')
    + stupa(120, 196, 1.2) + R(72, 158, 96, 8, '#FFCA28', 0, 3) + face(120, 136, 0.45)),

  L('nangtalung', 'หนังตะลุงตัวตลก', 'A nang talung shadow-puppet clown', ['nang talung', 'หนังตะลุง', 'shadow puppet', 'หุ่นเงา', 'puppet clown', 'ตัวตลกหนังตะลุง', 'leather puppet', 'หนังวัวฉลุ', 'southern folk show', 'การแสดงพื้นบ้านปักษ์ใต้'], nm('หาไม้ที่ใช้ขยับแขนของตัวหนัง', 'Find the stick that moves the puppet\'s arm'),
    // a glowing white cloth screen with a frame, a flat dark leather clown puppet with a round belly, a pointing hinged arm on a thin stick, cut-out dots on its body
    R(20, 20, 200, 170, '#FFF8E1', 8) + R(20, 20, 200, 12, '#C62828', 0) + Lc('M40 190v30M200 190v30', '#8D6E63', 6)
    + C(116, 76, 24, '#5D4037') + E(116, 132, 32, 36, '#5D4037') + R(100, 166, 12, 28, '#5D4037', 4) + R(122, 166, 12, 28, '#5D4037', 4) + P('M96 56c4-14 30-16 40 0-8-4-30-4-40 0z', '#3E2723')
    + [[104, 126], [128, 126], [116, 146]].map(([x, y]) => C(x, y, 4, '#FFE0B2', 0)).join('') + Lc('M144 110l26-14 18 4', '#5D4037', 7) + C(188, 100, 4, '#5D4037', 0)
    + Lc('M188 100l14 110M116 168l4 50', '#A1887F', 3) + C(108, 72, 3, '#FFF8E1', 0) + C(126, 72, 3, '#FFF8E1', 0) + P('M108 86q8 6 16 0', 'none', 0) + Lc('M108 86q8 6 16 0', '#FFF8E1', 2.5) + E(98, 82, 4, 2.5, '#FF8FA3', 0) + E(134, 82, 4, 2.5, '#FF8FA3', 0)),

  L('champedak', 'จำปาดะผ่าซีก', 'A champedak cut open', ['champedak', 'จำปาดะ', 'jackfruit cousin', 'ขนุนจำปาดะ', 'fried champedak', 'จำปาดะทอด', 'southern fruit', 'ผลไม้ใต้', 'khiriwong', 'คีรีวง'], nm('หาเนื้อสีส้มเหลืองในลูกจำปาดะ', 'Find the orange-yellow fruit pods inside'),
    // a long knobbly green-yellow champedak, and its other half opened to show the soft orange-yellow pods inside
    E(80, 120, 46, 70, '#C0CA33') + Array.from({ length: 16 }, (_, k) => C(56 + (k % 4) * 16, 70 + Math.floor(k / 4) * 26, 4, '#9E9D24', 1.5)).join('') + Lc('M80 50v-24', '#6D4C41', 6) + face(80, 120, 0.4)
    + E(170, 140, 46, 66, '#C0CA33') + E(170, 140, 36, 56, '#FFF9C4', 2.5) + [[156, 108], [184, 108], [156, 140], [184, 140], [156, 172], [184, 172]].map(([x, y]) => E(x, y, 12, 14, '#FFA726', 2.5)).join('')),

  L('mafai', 'มะไฟออกลูกตามลำต้น', 'Burmese grapes growing on the trunk', ['burmese grape', 'มะไฟ', 'fruit on the trunk', 'ผลไม้ออกตามลำต้น', 'baccaurea', 'orchard', 'สวนผลไม้', 'khiriwong', 'คีรีวง'], nm('หาลูกมะไฟที่ห้อยติดลำต้นไม้', 'Find the round fruits hanging right on the tree trunk'),
    // a thick tree trunk under a leafy top with long strings of round yellow-orange fruits growing straight from the bark
    C(70, 46, 34, '#66BB6A') + C(120, 30, 36, '#43A047') + C(170, 46, 34, '#66BB6A') + R(98, 50, 44, 176, '#8D6E63', 10) + Lc('M110 80v40M130 150v40', '#6D4C41', 3)
    + [[92, 100, -1], [148, 90, 1], [92, 160, -1], [148, 150, 1]].map(([x, y, s]) => Lc(`M${x} ${y}c${s * 10} 10 ${s * 14} 30 ${s * 14} 50`, '#7CB342', 3) + [0, 1, 2, 3].map((k) => C(x + s * (8 + k * 2), y + 12 + k * 12, 8, '#FFB300', 2.5)).join('')).join('') + face(120, 116, 0.35)),

  L('sato', 'ฝักสะตอเขียวปั๊ด', 'Green sato bean pods', ['sato', 'สะตอ', 'stink beans', 'ถั่วสะตอ', 'parkia', 'southern vegetable', 'ผักใต้', 'stir-fried sato', 'ผัดสะตอ'], nm('หาเมล็ดสะตอสีเขียวในฝักที่แกะแล้ว', 'Find the green beans inside the opened pod'),
    // three long twisting flat green pods with bumps where the beans sit, tied together, and one split pod showing its bright green beans
    [[60, 0], [96, 1], [132, 2]].map(([x, k]) => P(`M${x} 40c20 40-10 80 10 160h18c-20-80 10-120-10-160z`, k === 1 ? '#7CB342' : '#8BC34A') + [0, 1, 2, 3, 4].map((j) => C(x + 9 + (j % 2 ? -3 : 4), 70 + j * 28, 5, '#9CCC65', 2)).join('')).join('')
    + R(56, 120, 104, 12, '#D7A86E', 4) + face(106, 160, 0.3) + P('M170 70h40v130h-40z', '#AED581') + [0, 1, 2, 3, 4].map((j) => E(190, 88 + j * 24, 12, 9, '#33691E', 2.5)).join('')),

  L('nielloware', 'ถมนครชามดำลายทอง', 'A nielloware bowl, black and gold', ['nielloware', 'เครื่องถม', 'khrueang thom', 'ถมนคร', 'black and gold', 'ลายทองบนพื้นดำ', 'silver craft', 'งานเงิน', 'local craft', 'หัตถกรรม'], nm('หาลายดอกไม้สีทองบนพื้นดำ', 'Find the gold flower pattern on the shiny black'),
    // a shiny black bowl on a footed stand, with gold flower and leaf patterns round it and a gold rim, a little sparkle
    P('M40 90h160c0 50-36 80-80 80s-80-30-80-80z', '#263238') + E(120, 90, 80, 12, '#FFD54F') + E(120, 90, 66, 7, '#37474F', 2) + R(98, 168, 44, 16, '#263238', 2) + E(120, 196, 50, 12, '#263238') + Lc('M80 196h80', '#FFD54F', 3)
    + [[74, 118], [120, 130], [166, 118]].map(([x, y]) => [0, 72, 144, 216, 288].map((a) => E(x + Math.cos(a * Math.PI / 180) * 7, y + Math.sin(a * Math.PI / 180) * 7, 5, 5, '#FFD54F', 0)).join('') + C(x, y, 3, '#FFA000', 0)).join('')
    + Lc('M84 138c10 8 18 8 22 0M134 138c10 8 18 8 22 0', '#FFD54F', 2.5) + P('M190 50l4 10 10 4-10 4-4 10-4-10-10-4 10-4z', '#FFF59D', 2) + face(120, 150, 0.3)),

  L('citygate', 'ประตูชัยเหนือกำแพงเมืองเก่า', 'The old city wall and its north gate', ['city wall', 'กำแพงเมืองนครศรีธรรมราช', 'old city gate', 'ประตูชัยเหนือ', 'red brick', 'อิฐแดง', 'old town', 'เมืองเก่า', 'history walk', 'เดินชมเมือง'], nm('หาซุ้มประตูโค้งในกำแพงอิฐ', 'Find the arched gateway in the brick wall'),
    // a thick red-brick city wall with square battlements, a tall gate in the middle with a tiered roof and an arched opening, grass in front
    R(10, 110, 220, 90, '#C1694F') + [16, 46, 166, 196].map((x) => R(x, 96, 20, 16, '#C1694F')).join('') + R(76, 70, 88, 130, '#D84315')
    + P('M66 72l54-36 54 36z', '#6D4C41') + P('M82 50l38-28 38 28z', '#8D6E63') + Lc('M120 22v-12', '#FFCA28', 4) + P('M96 200v-60c0-32 48-32 48 0v60z', '#4E342E')
    + [[20, 130], [50, 150], [180, 132], [200, 160], [30, 176], [190, 182]].map(([x, y]) => Lc(`M${x} ${y}h18`, '#A1522E', 3)).join('') + P('M4 200h232v14H4z', '#9CCC65') + face(120, 112, 0.4)),

  L('khanomjeen', 'ขนมจีนแกงใต้กับผักเหนาะ', 'Southern khanom jeen curry noodles and fresh greens', ['khanom jeen', 'ขนมจีน', 'rice noodles', 'เส้นขนมจีน', 'southern curry', 'แกงไตปลา', 'fresh vegetables', 'ผักเหนาะ', 'southern breakfast', 'อาหารเช้าปักษ์ใต้'], nm('หาตะกร้าผักสดข้างจานขนมจีน', 'Find the basket of fresh greens next to the noodles'),
    // a plate with round nests of fine white rice noodles, a bowl of yellow-orange curry, a basket of fresh long beans, cucumber and leaves
    E(90, 150, 76, 44, '#FFFFFF') + [[62, 140], [96, 132], [80, 162], [114, 158]].map(([x, y]) => E(x, y, 18, 12, '#FAFAFA', 2.5) + Lc(`M${x - 12} ${y - 2}c6 4 18 4 24 0M${x - 10} ${y + 4}c6 3 14 3 20 0`, '#E0E0E0', 2)).join('')
    + E(84, 90, 32, 12, '#FB8C00') + P('M52 90c0 24 64 24 64 0', '#FFFFFF', 4) + face(84, 104, 0.25)
    + P('M150 120h72l-8 60h-56z', '#D7A86E') + Lc('M154 140h64M156 160h60', '#A1887F', 2) + Lc('M160 120l20-50M172 120l18-44M186 120l14-40', '#7CB342', 4) + E(206, 112, 12, 7, '#AED581') + C(166, 110, 8, '#66BB6A', 2.5)),

  L('khanomla', 'ขนมลาเส้นฝอยทอง', 'Khanom la, the lacy golden sweet', ['khanom la', 'ขนมลา', 'lacy sweet', 'ขนมเส้นฝอย', 'tenth month festival', 'ประเพณีสารทเดือนสิบ', 'rice flour net', 'แป้งข้าวเจ้า', 'nakhon souvenir', 'ของฝากเมืองนคร'], nm('หาเส้นขนมบางๆ ที่สานกันเป็นตาข่าย', 'Find the thin sweet threads woven into a net'),
    // folded squares of khanom la made of fine golden criss-cross threads stacked on a plate, a coconut shell cup with holes dripping thin batter lines
    E(110, 190, 90, 20, '#FFFFFF') + [[70, 150], [110, 160], [150, 150], [90, 120], [130, 120]].map(([x, y]) => R(x - 26, y - 18, 52, 36, '#FFCA28', 6) + Lc(`M${x - 22} ${y - 10}l40 24M${x - 22} ${y + 6}l30-20M${x - 6} ${y - 14}l26 26M${x + 18} ${y - 14}l-36 30`, '#F57F17', 2)).join('')
    + face(110, 156, 0.3) + E(186, 50, 26, 18, '#8D6E63') + [176, 186, 196].map((x) => Lc(`M${x} 68c-4 14 4 20 0 34`, '#FFE082', 2)).join('')),

  L('yanlipao', 'กระเป๋าย่านลิเภา', 'A woven yan lipao fern-vine handbag', ['yan lipao', 'ย่านลิเภา', 'fern vine basketry', 'เครื่องจักสานย่านลิเภา', 'woven handbag', 'กระเป๋าสาน', 'local craft', 'หัตถกรรมพื้นบ้าน', 'fine weaving', 'งานสานละเอียด'], nm('หาลายสานสีทองบนกระเป๋าสีน้ำตาลเข้ม', 'Find the golden woven pattern on the dark brown bag'),
    // a neat oval handbag tightly woven from dark brown fern vine with a gold zigzag band, a brass clasp and a stiff round handle
    P('M70 74c0-50 100-50 100 0', 'none', 0) + Lc('M76 90c0-56 88-56 88 0', '#5D4037', 8) + P('M40 90h160l-14 110c-2 10-10 14-20 14H74c-10 0-18-4-20-14z', '#6D4C41')
    + Array.from({ length: 9 }, (_, k) => Lc(`M${50 + k * 16} 92l-4 116`, '#4E342E', 1.5)).join('') + Lc('M44 130h152', '#4E342E', 1.5) + Lc('M46 150l12 10 12-10 12 10 12-10 12 10 12-10 12 10 12-10 12 10 12-10 12 10 12-10', '#FFCA28', 3)
    + R(108, 84, 24, 14, '#FFD54F', 3, 2.5) + face(120, 178, 0.35)),

  L('naturaldye', 'ผ้ามัดย้อมสีธรรมชาติลายใบไม้', 'Cloth dyed with leaves and natural colours', ['natural dye', 'ผ้าย้อมสีธรรมชาติ', 'leaf print cloth', 'ผ้าพิมพ์ลายใบไม้', 'khiriwong', 'คีรีวง', 'eco print', 'อีโค่ปริ้นท์', 'community craft', 'งานฝีมือชุมชน'], nm('หาลายใบไม้ที่พิมพ์ติดอยู่บนผ้า', 'Find the leaf shapes printed on the cloth'),
    // three lengths of cloth in soft natural colours (ochre, rusty pink, indigo) hanging from a bamboo pole, printed with leaf shapes, pegs on top
    Lc('M14 40h212', '#C0A060', 7) + Lc('M14 40l-4 180M226 40l4 180', '#A1887F', 5)
    + [[50, '#FFCC80'], [120, '#F48FB1'], [190, '#7986CB']].map(([x, c], k) => P(`M${x - 30} 40h60v${150 - k * 10}c-10 6-20 6-30 0s-20-6-30 0z`, c) + R(x - 6, 32, 12, 16, '#FFFFFF', 3, 2.5)
      + [[-12, 80], [10, 110], [-8, 140]].map(([dx, y]) => P(`M${x + dx} ${y + 14}c-10-6-10-22 0-28 10 6 10 22 0 28z`, 'none', 2) + Lc(`M${x + dx} ${y + 14}v-26`, INK, 1.5)).join('')).join('') + face(120, 66, 0.3)),

  L('khanombeach', 'หาดขนอมกับดงมะพร้าว', 'Khanom\'s quiet beach and coconut grove', ['khanom beach', 'หาดขนอม', 'coconut grove', 'ดงมะพร้าว', 'quiet beach', 'ชายหาดเงียบสงบ', 'gulf of thailand', 'อ่าวไทย', 'sea breeze', 'ลมทะเล'], nm('หามะพร้าวลูกโตที่หล่นอยู่บนทราย', 'Find the big coconut lying on the sand'),
    // a curved pale sandy beach, a calm turquoise sea with a small island, several leaning coconut palms, a fallen coconut with a face
    P('M10 110h220v50H10z', '#4DD0E1') + E(170, 110, 26, 8, '#81C784') + Lc('M30 130h30M120 140h40', '#E0F7FA', 3) + P('M10 156c60-12 160-8 220 4v40c0 10-10 20-20 20H30c-10 0-20-10-20-20z', '#FFE0B2')
    + palm(46, 196, 1.3) + palm(88, 186, 1.05) + palm(196, 190, 1.15) + C(140, 194, 14, '#8D6E63') + face(140, 192, 0.25)),

  L('khaoluang', 'ยอดเขาหลวงยามรุ่งอรุณ', 'Khao Luang peak at dawn', ['khao luang', 'เขาหลวง', 'highest peak in the south', 'ยอดเขาสูงสุดภาคใต้', 'sunrise', 'พระอาทิตย์ขึ้น', 'mossy forest', 'ป่ามอส', 'mountain hike', 'เดินขึ้นเขา'], nm('หาพระอาทิตย์ที่โผล่ขึ้นข้างยอดเขา', 'Find the sun peeping up beside the peak'),
    // a big rounded mountain against a pink and gold dawn sky, the sun peeping up, a collar of white cloud, mossy little trees on the ridge
    R(20, 30, 200, 180, '#FFCCBC', 40) + C(170, 80, 22, '#FFD54F') + P('M20 190l60-110 30 20 40-40 70 130z', '#5C8D3E') + P('M80 80l30 20 40-40 20 40c-30 0-60 0-90-20z', '#7CB342', 0)
    + P('M24 150c20-14 40-6 60-10s40-16 70-6 40 4 62 2v20H24z', '#FFFFFF') + [[100, 96], [118, 88], [136, 74], [156, 84]].map(([x, y]) => C(x, y, 7, '#2E7D32', 2)).join('') + P('M20 190h200v4c0 8-8 16-16 16H36c-8 0-16-8-16-16z', '#33691E') + face(110, 128, 0.35)),

  L('treefern', 'ป่าเฟิร์นต้นยักษ์', 'A forest of giant tree ferns', ['tree ferns', 'เฟิร์นต้น', 'krung ching', 'กรุงชิง', 'ancient plants', 'พืชดึกดำบรรพ์', 'rainforest trail', 'เส้นทางเดินป่า', 'khao luang national park', 'อุทยานแห่งชาติเขาหลวง'], nm('หาใบเฟิร์นที่กางเหมือนร่มบนยอดต้น', 'Find the fern leaves spreading like umbrellas on top'),
    // three tall thin furry tree-fern trunks each topped with a spreading crown of lacy fronds like an umbrella, a curled baby frond, a little trail
    [[60, 200, 120], [130, 206, 160], [190, 200, 100]].map(([x, b, h]) => R(x - 7, b - h, 14, h, '#6D4C41', 6) + Lc(`M${x - 5} ${b - h + 20}h10M${x - 5} ${b - h + 50}h10`, '#4E342E', 2)
      + [-60, -30, 0, 30, 60].map((a) => { const r = a * Math.PI / 180, dx = Math.sin(r) * 50, dy = -Math.cos(r) * 22 + 14; return Lc(`M${x} ${b - h}q${(dx * 0.6).toFixed(1)} ${(dy - 18).toFixed(1)} ${dx.toFixed(1)} ${dy.toFixed(1)}`, '#43A047', 9) + Lc(`M${x} ${b - h}q${(dx * 0.6).toFixed(1)} ${(dy - 18).toFixed(1)} ${dx.toFixed(1)} ${dy.toFixed(1)}`, '#81C784', 3); }).join('')).join('')
    + P('M20 210c60-10 140-10 200 0v10H20z', '#7CB342') + Lc('M100 196c-6-14 6-24 14-16 4 6-2 10-6 6', '#66BB6A', 4) + face(130, 120, 0.3)),
  L('krajood', 'เสื่อกระจูดลายทางสีสด', 'A striped krajood sedge mat', ['krajood', 'กระจูด', 'sedge mat', 'เสื่อกระจูด', 'woven mat', 'เสื่อสาน', 'pak phanang', 'ปากพนัง', 'wetland craft', 'งานสานจากพืชน้ำ'], nm('หาลายตารางสีชมพูกับสีเขียวบนเสื่อ', 'Find the pink and green checks woven into the mat'),
    // a long sedge mat half rolled up, woven in a checked pattern of natural straw, pink and green stripes, a few tall sedge stems standing beside it
    P('M30 200l40-110h150l-40 110z', '#E6CFA0') + [0, 1, 2, 3, 4].map((k) => Lc(`M${42 + k * 6} ${172 - k * 16}h${140 - k * 0}`, k % 2 ? '#66BB6A' : '#EC407A', 5)).join('')
    + [0, 1, 2, 3, 4, 5].map((k) => Lc(`M${86 + k * 22} 92l-38 106`, '#C8A165', 2)).join('') + E(50, 196, 22, 20, '#E6CFA0') + E(50, 196, 12, 10, '#C8A165', 2)
    + Lc('M206 210c-2-50 0-100 4-150M218 210c0-50 2-90 6-130M194 210c-4-40-4-80 0-110', '#8BC34A', 4) + face(132, 140, 0.4)),

  L('khaokha', 'โบราณสถานเขาคาบนยอดเนิน', 'The ancient brick ruins on Khao Kha hill', ['khao kha', 'โบราณสถานเขาคา', 'ancient ruins', 'โบราณสถาน', 'brick base', 'ฐานอิฐโบราณ', 'hilltop', 'ยอดเนิน', 'sichon', 'สิชล'], nm('หาบันไดอิฐที่พาขึ้นไปบนเนิน', 'Find the brick steps leading up the hill'),
    // a green hill topped with the low square brick bases of a 1,000-year-old site, a short broken brick tower, brick steps winding up and big shady trees
    P('M10 210c30-60 70-90 110-90s80 30 110 90z', '#9CCC65') + C(36, 156, 22, '#43A047') + C(206, 160, 20, '#43A047')
    + R(70, 110, 100, 18, '#C1694F') + R(84, 96, 72, 14, '#D84315') + R(102, 54, 36, 42, '#C1694F') + P('M102 54l6-10 10 6 8-12 12 16z', '#C1694F')
    + Lc('M106 66h28M106 80h28M76 120h88M90 104h60', '#A1522E', 2.5) + P('M106 210l6-20h16l6 20zM112 190l4-16h8l4 16zM116 174l2-12h4l2 12z', '#E57373', 2.5) + face(120, 118, 0.35)),

  L('orchidmantis', 'ตั๊กแตนกล้วยไม้สีชมพู', 'A pink orchid mantis', ['orchid mantis', 'ตั๊กแตนกล้วยไม้', 'mantis', 'ตั๊กแตนตำข้าว', 'insect camouflage', 'แมลงพรางตัว', 'khao luang', 'เขาหลวง', 'rainforest insect', 'แมลงป่าดิบ'], nm('หาตั๊กแตนที่ทำตัวเหมือนกลีบดอกไม้', 'Find the mantis pretending to be a flower'),
    // a pale pink and white mantis whose legs look like round petals, perched on a pink orchid, folded front arms and a triangle head with big eyes
    Lc('M40 220c20-40 30-80 70-110', '#7CB342', 6) + [[56, 150], [80, 172]].map(([x, y]) => E(x, y, 24, 14, '#F48FB1')).join('') + C(70, 160, 7, '#FFEB3B', 2)
    + E(140, 140, 22, 40, '#FCE4EC') + [[110, 150, -1], [170, 150, 1], [114, 180, -1], [166, 180, 1]].map(([x, y, s]) => E(x, y, 16, 10, '#F8BBD0') + Lc(`M${x - s * 10} ${y + 6}l${-s * 10} 14`, '#F48FB1', 3)).join('')
    + P('M140 100c-20 0-26-24-14-32h28c12 8 6 32-14 32z', '#FCE4EC') + C(130, 76, 6, '#F06292', 2) + C(150, 76, 6, '#F06292', 2) + C(130, 76, 2, INK, 0) + C(150, 76, 2, INK, 0)
    + Lc('M134 70c-6-14-14-20-24-24M146 70c6-14 14-20 24-24', INK, 2) + Lc('M132 112l-10 14 10 10M148 112l10 14-10 10', '#F48FB1', 5) + P('M136 88q4 4 8 0', 'none', 2.5)),
];

export default {
  places: {
    'th-nakhonsi': { country: 'th', wave: 3, home: true, name: nm('นครศรีธรรมราชและขนอม', 'Nakhon Si Thammarat and Khanom'), tz: 'Asia/Bangkok', ll: [8.43, 99.96], alias: ['nakhon si thammarat', 'นครศรีธรรมราช', 'NST', 'khiriwong', 'คีรีวง', 'khanom beach', 'ขนอม', 'sichon', 'สิชล'], colors: NS },
  },
  items,
};
