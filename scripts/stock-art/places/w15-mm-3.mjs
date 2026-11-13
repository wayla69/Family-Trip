// Wave 15, Myanmar: Bagan and Inle Lake (with Mount Popa, Salay and Kalaw) — the city stamp, two day scenes and seventeen landmarks:
// the temples only as buildings (no Buddha images, no balloons over Bagan), the lake's own boats, gardens, crafts, fish and food
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const BG = { k1: '#A0522D', k2: '#1565C0', k3: '#FFF0E0' };
const CITY = 'mm-bagan', DIR = 'mm/bagan';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const GOLD = '#F4C430', BRICK = '#B5653A', BRICK2 = '#8D4A2A';

// a little Bagan brick temple: a square body with an arched door, a stepped roof and a bell-shaped top (x = middle, b = base, s = scale)
const tmpl = (x, b, s, c = BRICK, sw) => g(x, b, s, R(-26, -36, 52, 36, c, 0, sw) + P('M-8 0v-18c0-10 16-10 16 0v18z', '#5D4037', sw) + R(-20, -46, 40, 10, c, 0, sw) + R(-14, -54, 28, 8, c, 0, sw) + P('M-12 -54c0-14 6-20 12-30 6 10 12 16 12 30z', c, sw) + Lc('M0 -84v-8', INK, 2));
// the leg-rowers' tall cone of bamboo hoops wrapped in netting
const cone = (x, b, s, sw) => g(x, b, s, P('M-22 0L0 -96 22 0z', '#FFF8E1', sw) + [0, 1, 2, 3].map((k) => Lc(`M${-22 + k * 5.5} ${-k * 24}h${44 - k * 11}`, '#A1673F', 3)).join('') + Lc('M-11 -48L0 0M11 -48L0 0M0 -96v96', '#BCAAA4', 1.5) + Lc('M0 -96v-10', '#A1673F', 3));
// a long flat Inle boat seen from the side
const boat = (x, b, w, c = '#6D4C41', sw) => P(`M${x - w / 2} ${b - 10}h${w}c-6 10-14 14-26 14h-${w - 52}c-12 0-20-4-26-14z`, c, sw);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับพุกามและอินเล', 'Bagan and Inle stamp'), kw: ['bagan', 'พุกาม', 'inle lake', 'ทะเลสาบอินเล', 'temples', 'วัดโบราณ', 'fishing net', 'ข้อนจับปลา'],
    // a brick Bagan temple under the morning sun, and an Inle boat with its tall cone net on the water in front
    svg: cityStamp('bgn-st', { name: 'BAGAN · INLE', sub: 'MYANMAR', ...BG, emblem: C(130, 66, 11, '#FFB74D', 2) + tmpl(80, 120, 0.9, BRICK, 3) + Lc('M50 132c10-4 20 4 30 0s20-4 30 0 20 4 40 0', '#4FC3F7', 3) + cone(128, 118, 0.55, 3) + boat(126, 126, 56, '#6D4C41', 2.5) }) },

  D('plain', 'ทุ่งเจดีย์พุกามยามเช้า', 'The temple plain of Bagan at sunrise', ['bagan', 'พุกาม', 'temple plain', 'ทุ่งเจดีย์', 'sunrise', 'พระอาทิตย์ขึ้น', 'old bagan', 'พุกามเก่า', 'brick temples', 'วัดอิฐ', 'misty morning', 'หมอกยามเช้า'],
    // a soft orange dawn over a wide flat plain dotted with dozens of brick temples and spires, toddy palms and low morning mist between them
    scene('bgn-d1', '#FFE0B2', C(160, 90, 24, '#FFB74D', 0) + P('M-4 70h248v18H-4z', '#FFCCBC', 0) + P('M-4 150c60-10 180-10 248 0v100H-4z', '#C5A572')
      + [[30, 142, 0.5], [70, 136, 0.42], [196, 140, 0.48], [150, 134, 0.36], [104, 132, 0.34]].map(([x, b, s]) => tmpl(x, b, s, '#C98B5A')).join('')
      + R(-4, 130, 248, 14, '#FFF3E0', 0) + [[54, 196, 0.9], [176, 192, 0.8]].map(([x, b, s]) => tmpl(x, b, s)).join('') + tmpl(120, 214, 1.1, BRICK2)
      + [[18, 200], [214, 206]].map(([x, y]) => Lc(`M${x} ${y}v-50`, '#795548', 4) + [-60, -20, 20, 60].map((a) => g(x, y - 52, 1, P('M0 0c6-8 20-10 26-4-8 4-18 6-26 4z', '#43A047', 2), a - 90)).join('')).join(''))),
  D('inlevillage', 'หมู่บ้านบ้านไม้ยกสูงกลางทะเลสาบอินเล', 'The stilt villages of Inle Lake', ['inle lake', 'ทะเลสาบอินเล', 'stilt houses', 'บ้านไม้ยกสูง', 'floating village', 'หมู่บ้านลอยน้ำ', 'shan hills', 'เทือกเขาไทใหญ่', 'boat trip', 'นั่งเรือเที่ยว', 'nyaungshwe', 'ญองชเว'],
    // wooden houses with thatched roofs on tall stilts over the blue lake, green floating garden strips, a boat with a cone net, misty blue hills behind
    scene('bgn-d2', '#B3E5FC', P('M-4 110l50-40 40 24 50-44 60 40 48-24v44H-4z', '#7986CB') + P('M-4 110h248v140H-4z', '#4FC3F7')
      + [[24, 112], [76, 106], [176, 108]].map(([x, b]) => R(x, b - 30, 44, 26, '#A1673F') + P(`M${x - 6} ${b - 30}l28-20 28 20z`, '#D7A86E') + R(x + 16, b - 22, 12, 14, '#4E342E', 0, 2.5) + [6, 22, 38].map((dx) => Lc(`M${x + dx} ${b - 4}v24`, '#6D4C41', 4)).join('')).join('')
      + [[-4, 150, 100], [140, 160, 110]].map(([x, y, w]) => R(x, y, w, 12, '#7CB342', 6) + Array.from({ length: 4 }, (_, k) => C(x + 14 + k * (w / 4), y + 2, 4, '#E53935', 1.5)).join('')).join('')
      + Lc('M20 186c20-6 40 6 60 0M160 210c20-6 40 6 60 0', '#B3E5FC', 3) + cone(130, 196, 0.6) + boat(126, 202, 110))),

  L('ananda', 'วัดอานันดา', 'Ananda Temple', ['ananda temple', 'วัดอานันดา', 'ananda pahto', 'อานันดาปาโท', 'white temple', 'วัดสีขาว', 'golden spire', 'ยอดทอง', 'old bagan', 'พุกามเก่า'], nm('หายอดทองแหลมบนวัดสีขาวที่มีซุ้มประตูทุกด้าน', 'Find the golden pointed top on the white temple with doorways on every side'),
    // a great white temple with flame-arched porches, three stepped terraces with little spires at the corners and a tall golden corncob-shaped spire on top
    P('M8 206h224v14H8z', '#E0C9A6') + R(30, 140, 180, 66, '#FFFFFF') + [[60], [180]].map(([x]) => R(x - 18, 150, 36, 56, '#FFFFFF') + P(`M${x - 22} 150c0-20 10-30 22-40 12 10 22 20 22 40z`, '#FFFFFF') + P(`M${x - 8} 206v-30c0-12 16-12 16 0v30z`, '#5D4037')).join('')
      + R(100, 150, 40, 56, '#FFFFFF') + P('M94 150c0-24 12-36 26-48 14 12 26 24 26 48z', '#FFFFFF') + P('M110 206v-34c0-14 20-14 20 0v34z', '#5D4037')
      + [[44, 112], [52, 92], [62, 74]].map(([x, y], k) => R(x + k * 6, y + 16, 240 - 2 * (x + k * 6), 12, '#FFF8E1') + [x + k * 6 + 4, 236 - x - k * 6].map((cx) => P(`M${cx - 6} ${y + 16}c0-8 3-12 6-18 3 6 6 10 6 18z`, GOLD, 2.5)).join('')).join('')
      + P('M98 90c-2-30 10-60 22-74 12 14 24 44 22 74z', GOLD) + [40, 56, 72].map((y) => Lc(`M${104 + (y - 40) * 0.2} ${y}h${32 - (y - 40) * 0.4}`, '#C9971C', 3)).join('') + Lc('M120 16V4', INK, 3) + C(120, 4, 3, '#FFFFFF', 2) + face(120, 178, 0.4)),
  L('dhammayangyi', 'วัดธรรมะยางจี วัดอิฐที่ใหญ่ที่สุด', 'Dhammayangyi, the biggest brick temple', ['dhammayangyi', 'ธรรมะยางจี', 'brick temple', 'วัดอิฐ', 'biggest temple', 'วัดใหญ่ที่สุด', 'stepped terraces', 'ชั้นลดหลั่น', 'bagan plain', 'ทุ่งพุกาม'], nm('หาวัดอิฐก้อนใหญ่ที่เป็นชั้นๆ เหมือนพีระมิด', 'Find the huge brick temple built in steps like a pyramid'),
    // a huge dark-red brick temple rising in wide stepped terraces like a pyramid, arched doorways at the bottom, its top stump flat, green trees at its feet
    P('M4 210h232v12H4z', '#C5A572') + [[16, 168, 208, 42], [36, 136, 168, 32], [54, 110, 132, 26], [72, 88, 96, 22], [88, 70, 64, 18]].map(([x, y, w, h], k) => R(x, y, w, h, k % 2 ? BRICK : BRICK2) + Lc(`M${x + 4} ${y + h / 2}h${w - 8}`, '#6D3A20', 2)).join('')
      + R(104, 54, 32, 16, BRICK) + [44, 88, 152, 196].map((x) => P(`M${x - 9} 210v-22c0-12 18-12 18 0v22z`, '#4E342E', 2.5)).join('') + P('M106 210v-30c0-16 28-16 28 0v30z', '#4E342E')
      + [[8, 200], [232, 200]].map(([x, y]) => C(x, y, 16, '#66BB6A')).join('') + face(120, 150, 0.45)),
  L('bupaya', 'เจดีย์บูพยาริมแม่น้ำอิรวดี', 'Bupaya, the gourd stupa on the Irrawaddy', ['bupaya', 'บูพยา', 'gourd-shaped stupa', 'เจดีย์ทรงน้ำเต้า', 'irrawaddy', 'อิรวดี', 'river view', 'วิวแม่น้ำ', 'sunset spot', 'จุดชมพระอาทิตย์ตก'], nm('หาเจดีย์ทองรูปน้ำเต้าริมแม่น้ำ', 'Find the golden stupa shaped like a gourd by the river'),
    // a round golden stupa shaped like a fat bottle gourd on white crenellated terraces at the top of a riverbank, the wide brown Irrawaddy below with a little boat
    P('M0 176h240v44H0z', '#BCAAA4') + Lc('M20 196c20-6 40 6 60 0M150 206c20-6 40 6 60 0', '#D7CCC8', 3) + P('M170 190h40l-6 8h-28z', '#6D4C41', 2.5)
      + P('M40 176c0-20 10-40 30-44h100c20 4 30 24 30 44z', '#C5A572') + R(60, 132, 120, 14, '#FFFFFF') + Array.from({ length: 8 }, (_, k) => R(62 + k * 15, 124, 9, 8, '#FFFFFF', 0, 2.5)).join('') + R(76, 112, 88, 20, '#FFFFFF')
      + P('M86 112c-14-30 4-62 34-62s48 32 34 62z', GOLD) + P('M104 54c0-12 6-18 16-24 10 6 16 12 16 24z', GOLD) + Lc('M120 30V14', '#C9971C', 4) + C(120, 12, 3, '#FFFFFF', 2) + face(120, 84, 0.6)),
  L('shwesandaw', 'เจดีย์ชเวซานดอ บันไดชมพระอาทิตย์ตก', 'Shwesandaw and its steep terraces', ['shwesandaw', 'ชเวซานดอ', 'terraces', 'ลานชั้น', 'steep stairs', 'บันไดชัน', 'sunset view', 'ชมพระอาทิตย์ตก', 'white stupa', 'เจดีย์ขาว'], nm('หาบันไดชันตรงกลางที่ขึ้นไปถึงยอด', 'Find the steep staircase climbing up the middle to the top'),
    // a white stupa on five steep square terraces, a narrow staircase running straight up the middle of each, a bell and golden spire on top, a tiny child waving from a terrace
    P('M4 210h232v12H4z', '#C5A572') + [[20, 182, 200, 28], [38, 156, 164, 26], [56, 132, 128, 24], [72, 110, 96, 22], [86, 90, 68, 20]].map(([x, y, w, h]) => R(x, y, w, h, '#FAFAFA') + Lc(`M${x + 2} ${y + 4}h${w - 4}`, '#E0E0E0', 2)).join('')
      + P('M110 210L114 90h12l4 120z', '#E0E0E0', 2.5) + Array.from({ length: 12 }, (_, k) => Lc(`M${112 + k * 0.4} ${200 - k * 10}h${16 - k * 0.8}`, '#BDBDBD', 2)).join('')
      + P('M94 90c0-22 12-32 26-40 14 8 26 18 26 40z', '#FFFFFF') + P('M114 52c0-14 3-22 6-34 3 12 6 20 6 34z', GOLD) + Lc('M120 18V8', INK, 2.5)
      + C(170, 122, 7, '#C98B5A', 2) + R(165, 128, 10, 10, '#FF7043', 3, 2) + Lc('M176 122l8-8', '#C98B5A', 3) + face(120, 72, 0.35)),
  L('shwezigon', 'เจดีย์ชเวสิกอง', 'The Shwezigon stupa', ['shwezigon', 'ชเวสิกอง', 'golden stupa', 'เจดีย์ทอง', 'nyaung-u', 'ญองอู', 'glazed plaques', 'แผ่นกระเบื้องเคลือบ', 'bell-shaped', 'ทรงระฆัง'], nm('หาแผ่นกระเบื้องสีเขียวเรียงรอบฐานเจดีย์ทอง', 'Find the green glazed tiles in a row round the golden base'),
    // a wide golden bell-shaped stupa on three golden square terraces lined with little green glazed plaques, a small stupa at each corner and stairs up the front
    P('M4 210h232v12H4z', '#E0C9A6') + [[18, 178, 204, 32], [36, 150, 168, 28], [54, 126, 132, 24]].map(([x, y, w, h]) => R(x, y, w, h, GOLD) + Array.from({ length: Math.floor(w / 18) }, (_, k) => R(x + 6 + k * 18, y + h / 2 - 4, 10, 8, '#4DB6AC', 1, 2)).join('') + [x + 6, x + w - 6].map((cx) => P(`M${cx - 6} ${y}c0-8 3-12 6-18 3 6 6 10 6 18z`, GOLD, 2.5)).join('')).join('')
      + P('M108 210l4-84h16l4 84z', '#FFE082', 2.5) + P('M64 126c0-40 28-60 56-70 28 10 56 30 56 70z', GOLD) + [0, 1, 2].map((k) => R(108 - k * -3 + k * 0, 46 - k * 8, 24 - k * 6, 8, k % 2 ? '#C9971C' : GOLD, 2, 2.5)).join('')
      + P('M114 30c0-10 3-16 6-26 3 10 6 16 6 26z', GOLD) + face(120, 100, 0.55)),
  L('tharabar', 'ประตูทาราบาร์ ประตูเมืองพุกามเก่า', 'Tharabar Gate of Old Bagan', ['tharabar gate', 'ประตูทาราบาร์', 'city gate', 'ประตูเมือง', 'old bagan', 'พุกามเก่า', 'brick wall', 'กำแพงอิฐ', 'moat', 'คูเมือง'], nm('หาซุ้มหลังคาเล็กสองหลังข้างประตูอิฐ', 'Find the two little roofed niches beside the brick gateway'),
    // a thick old brick city wall with a wide opening in the middle, a small white niche with a tiered red roof built into the wall on each side, a dusty road through it
    P('M0 200h240v20H0z', '#C5A572') + P('M100 220l8-20h24l8 20z', '#E0C9A6', 0) + R(10, 110, 84, 90, BRICK) + R(146, 110, 84, 90, BRICK) + Array.from({ length: 4 }, (_, r) => Lc(`M10 ${126 + r * 20}h84M146 ${126 + r * 20}h84`, BRICK2, 2)).join('')
      + Lc('M10 110l6-10 8 6 10-8 12 8 10-6 14 6 10-6 14 10M146 110l10-8 12 6 10-6 14 8 10-6 12 6 6-4', '#7CB342', 4)
      + [[52], [188]].map(([x]) => R(x - 16, 140, 32, 40, '#FFFFFF') + P(`M${x - 24} 140l24-14 24 14z`, '#C62828') + P(`M${x - 16} 126l16-10 16 10z`, '#C62828') + Lc(`M${x} 116v-8`, GOLD, 3) + R(x - 8, 152, 16, 22, '#FFE082', 2, 2)).join('')
      + [[20, 200], [228, 204]].map(([x, y]) => C(x, y, 8, '#9CCC65', 2)).join('') + face(120, 170, 0.35)),
  L('popa', 'ภูเขาโปปากับวัดบนยอดเขาตองกะลาด', 'Mount Popa and the temple on Taung Kalat', ['mount popa', 'ภูเขาโปปา', 'taung kalat', 'ตองกะลาด', 'volcanic plug', 'ภูเขาไฟเก่า', '777 steps', 'บันได 777 ขั้น', 'hilltop monastery', 'วัดบนยอดเขา'], nm('หาวัดสีขาวทองบนยอดเขาหินที่ตั้งชันขึ้นมา', 'Find the white and gold temple on top of the steep rock tower'),
    // a steep round rock tower rising from green forest with white buildings and golden spires crowded on its top, a long covered stairway zigzagging up its side, a big green mountain behind
    P('M100 120c20-60 80-80 140-60v150H100z', '#81C784') + [[20, 200], [70, 206], [200, 204]].map(([x, y]) => C(x, y, 22, '#43A047')).join('')
      + P('M70 210c-2-50 6-110 20-136h60c14 26 22 86 20 136z', '#A1887F') + Lc('M84 120c10 10 14 40 8 70M156 110c-8 20-8 50 0 80', '#8D6E63', 3)
      + Lc('M100 208c24-8 40-16 26-30s-30-16-8-30 30-18 8-32', '#FFF3E0', 9) + Lc('M100 208c24-8 40-16 26-30s-30-16-8-30 30-18 8-32', '#C62828', 2.5)
      + R(88, 56, 64, 20, '#FFFFFF') + [[96, 56], [120, 50], [144, 56]].map(([x, y]) => P(`M${x - 8} ${y}c0-12 4-18 8-30 4 12 8 18 8 30z`, GOLD, 2.5)).join('') + Lc('M120 20v-8', INK, 2.5) + face(120, 160, 0.45)),
  L('salay', 'วัดไม้สักโยโซนที่ซะเล', 'The carved teak monastery of Salay', ['salay', 'ซะเล', 'yoke sone kyaung', 'วัดโยโซน', 'teak monastery', 'วัดไม้สัก', 'wood carving', 'งานแกะสลักไม้', 'stilts', 'เสาไม้สูง'], nm('หาลายแกะสลักไม้ตามระเบียงของวัดไม้', 'Find the carved wooden panels all along the balcony'),
    // a dark teak monastery hall raised high on rows of wooden posts, a long balcony of carved panels, layered wooden roofs climbing to a spire in the middle, a wooden stair up the front
    P('M4 210h232v12H4z', '#C5A572') + Array.from({ length: 9 }, (_, k) => Lc(`M${24 + k * 24} 210v-46`, '#4E342E', 7)).join('') + R(12, 120, 216, 44, '#6D4C41') + R(12, 154, 216, 12, '#5D4037', 0)
      + Array.from({ length: 9 }, (_, k) => R(18 + k * 23.5, 128, 18, 20, '#8D6E63', 3, 2.5) + C(27 + k * 23.5, 138, 4, '#D7A86E', 1.5)).join('')
      + P('M4 122l20-24h192l20 24z', '#5D4037') + P('M44 98l16-20h120l16 20z', '#4E342E') + P('M80 78l14-18h52l14 18z', '#5D4037') + P('M100 60l20-24 20 24z', '#4E342E') + Lc('M120 36v-14', GOLD, 3)
      + P('M60 210l30-44h14l-30 44z', '#8D6E63', 2.5) + face(120, 104, 0.32, 'none').replace(/fill="#22213A" stroke="none"/g, 'fill="#FFE0B2" stroke="none"')),

  L('legrower', 'เรือหาปลาของชาวอินเลกับข้องรูปกรวย', 'An Inle fishing boat with its cone net', ['leg rowing', 'พายเรือด้วยขา', 'cone net', 'ข้องรูปกรวย', 'inle fishing boat', 'เรือหาปลาอินเล', 'bamboo net', 'ตาข่ายไม้ไผ่', 'calm lake', 'ทะเลสาบเงียบสงบ'], nm('หาข้องจับปลารูปกรวยสูงๆ ที่ตั้งอยู่บนเรือ', 'Find the tall cone-shaped fishing net standing up in the boat'),
    // a long flat wooden fishing boat on the glassy lake carrying a tall cone of bamboo hoops wrapped in netting, a long oar resting across it, ripples and two little fish below
    P('M0 150h240v70H0z', '#4FC3F7') + Lc('M10 186c20-6 40 6 60 0M160 200c20-6 40 6 60 0M60 210c20-6 40 6 60 0', '#B3E5FC', 3)
      + cone(120, 146, 1.15) + boat(120, 156, 196) + Lc('M30 120l170 40', '#A1673F', 5) + P('M196 152l20 6-4 14-20-6z', '#A1673F', 2.5)
      + [[50, 196], [190, 180]].map(([x, y]) => P(`M${x - 10} ${y}c6-8 16-8 20 0-4 6-16 6-20 0zM${x + 10} ${y}l8-6v12z`, '#FFB74D', 2)).join('') + face(110, 160, 0.4)),
  L('floatinggarden', 'สวนมะเขือเทศลอยน้ำ', 'The floating tomato gardens of Inle', ['floating gardens', 'สวนลอยน้ำ', 'tomato gardens', 'สวนมะเขือเทศ', 'bamboo poles', 'ไม้ไผ่ปัก', 'lake farming', 'เกษตรบนทะเลสาบ', 'canoe', 'เรือแคนู'], nm('หามะเขือเทศสีแดงบนแปลงที่ลอยอยู่บนน้ำ', 'Find the red tomatoes growing on the beds floating on the water'),
    // long green strips of floating garden held in place by bamboo poles, tomato plants on little frames heavy with red tomatoes, a narrow canoe gliding between the rows
    P('M0 90h240v130H0z', '#4FC3F7') + [[0, 104, 240], [0, 150, 240], [0, 196, 240]].map(([x, y, w], r) => R(x - 4, y, w + 8, 14, '#6D8B3A', 6) + Array.from({ length: 7 }, (_, k) => { const cx = 20 + k * 34 + (r % 2) * 16; return Lc(`M${cx} ${y + 2}v-26M${cx - 6} ${y - 18}l12 8`, '#8D6E63', 2.5) + P(`M${cx - 10} ${y - 10}c4-10 16-10 20 0`, '#66BB6A', 2) + C(cx - 4, y - 4, 4.5, '#E53935', 1.8) + C(cx + 5, y - 2, 4, '#EF5350', 1.8); }).join('')
        + Lc(`M${10 + r * 60} ${y + 16}v-40`, '#C8A86B', 3)).join('') + boat(150, 140, 80, '#8D6E63') + face(150, 136, 0.28)),
  L('lotusthread', 'ทอผ้าจากใยก้านบัวที่อินปอโข่ง', 'Pulling silk from lotus stems at Inpawkhon', ['lotus silk', 'ผ้าใยบัว', 'lotus stems', 'ก้านบัว', 'inpawkhon', 'อินปอโข่ง', 'weaving village', 'หมู่บ้านทอผ้า', 'hand spun thread', 'ด้ายปั่นมือ'], nm('หาด้ายบางๆ ที่ดึงออกมาจากก้านบัวที่หัก', 'Find the fine threads stretching out of the snapped lotus stem'),
    // a green lotus stem snapped in two with dozens of fine white threads stretching between the halves, a wooden spool of creamy lotus thread, a pink lotus flower and pad beside them
    E(120, 196, 100, 14, '#B2DFDB', 0) + E(54, 186, 42, 16, '#66BB6A') + Lc('M54 186l-18-10', '#388E3C', 2.5) + P('M44 150c-10-20 0-34 10-40 10 6 20 20 10 40z', '#F48FB1') + P('M30 152c-6-14 4-26 14-22 6 10 4 20-4 24zM78 152c6-14-4-26-14-22-6 10-4 20 4 24z', '#F8BBD0', 2.5)
      + g(110, 112, 1, R(-50, -6, 44, 12, '#7CB342', 6), -14) + g(170, 98, 1, R(-4, -6, 44, 12, '#7CB342', 6), -14)
      + Array.from({ length: 6 }, (_, k) => Lc(`M${110 - 4} ${108 + k * 2}c20 ${-6 + k} 40 ${-14 + k} ${64} ${-24 + k * 0.8}`, '#BCAAA4', 1.6)).join('')
      + R(160, 140, 46, 60, '#FFF3D6', 6) + R(154, 134, 58, 10, '#A1673F', 4) + R(154, 196, 58, 10, '#A1673F', 4) + Array.from({ length: 5 }, (_, k) => Lc(`M162 ${150 + k * 9}h42`, '#E8D5A8', 2)).join('') + face(183, 168, 0.42)),
  L('indein', 'ป่าเจดีย์เก่าที่อินเดง', 'The forest of old stupas at Indein', ['indein', 'อินเดง', 'shwe inn thein', 'ชเวอินเตง', 'ancient stupas', 'เจดีย์โบราณ', 'ruins', 'ซากโบราณ', 'overgrown', 'ต้นไม้ขึ้นคลุม'], nm('หาต้นไม้เล็กๆ ที่งอกบนยอดเจดีย์เก่า', 'Find the little plant growing out of the top of an old stupa'),
    // a crowd of old crumbling stupas in brick and faded white plaster standing close together, some leaning, little plants and ferns growing from their tops and cracks, tall trees behind
    [[30, 120], [210, 116]].map(([x, y]) => C(x, y, 34, '#388E3C')).join('') + P('M4 206h232v14H4z', '#8D6E63')
      + [[36, 206, 0.9, BRICK, -4], [80, 206, 1.1, '#E0D6C8', 2], [120, 206, 1.3, BRICK2, 0], [162, 206, 1.05, '#D7CCC8', -3], [204, 206, 0.85, BRICK, 5]].map(([x, b, s, c, r]) => g(x, b, s, R(-20, -26, 40, 26, c) + R(-14, -40, 28, 14, c) + P('M-12 -40c0-16 6-24 12-34 6 10 12 18 12 34z', c) + Lc('M0 -74v-10', INK, 2) + Lc('M-12 -16l6 6M8 -30l4 6', '#6D3A20', 2), r)).join('')
      + [[80, 104], [162, 112], [36, 128]].map(([x, y]) => Lc(`M${x} ${y}v-10`, '#43A047', 2.5) + E(x - 5, y - 10, 6, 3, '#66BB6A', 1.5) + E(x + 5, y - 13, 6, 3, '#66BB6A', 1.5)).join('') + face(120, 176, 0.42)),
  L('maingthauk', 'สะพานไม้ยาวที่ไหม่งต็อก', 'The long wooden bridge at Maing Thauk', ['maing thauk', 'ไหม่งต็อก', 'wooden bridge', 'สะพานไม้', 'long footbridge', 'สะพานทางเดินยาว', 'bridge on stilts', 'สะพานบนเสา', 'sunset walk', 'เดินเล่นยามเย็น'], nm('หาสะพานไม้ยาวที่ทอดไปถึงบ้านกลางน้ำ', 'Find the long wooden bridge stretching out to the house on the water'),
    // a long narrow wooden footbridge on thin posts running far out across the lake to a little stilt house, its reflection in the still water, hills behind
    P('M0 90l60-30 50 20 60-36 70 30v20H0z', '#9FA8DA') + P('M0 96h240v124H0z', '#81D4FA') + R(150, 84, 40, 22, '#A1673F') + P('M144 84l26-16 26 16z', '#D7A86E') + [154, 170, 186].map((x) => Lc(`M${x} 106v14`, '#6D4C41', 3)).join('')
      + P('M10 214L150 110h8L40 220z', '#C8913A') + Array.from({ length: 10 }, (_, k) => { const t = k / 9, x1 = 10 + t * 140, y1 = 214 - t * 104, x2 = 40 + t * 118; return Lc(`M${x1.toFixed(1)} ${y1.toFixed(1)}v${(22 - t * 16).toFixed(1)}M${x2.toFixed(1)} ${(220 - t * 110).toFixed(1)}v${(22 - t * 16).toFixed(1)}`, '#6D4C41', 3 - t * 1.5); }).join('')
      + Lc('M10 200L150 102M40 206L158 102', '#8D5524', 2.5) + Lc('M60 140c20-4 40 4 60 0M180 160c20-4 40 4 60 0', '#E1F5FE', 3) + face(60, 196, 0.35)),
  L('sawbwa', 'ปลาซอบวา ปลาตัวจิ๋วแห่งอินเล', 'The sawbwa barb, Inle’s tiny fish', ['sawbwa barb', 'ปลาซอบวา', 'inle fish', 'ปลาอินเล', 'tiny fish', 'ปลาตัวจิ๋ว', 'red fins', 'ครีบแดง', 'lake life', 'สัตว์ในทะเลสาบ'], nm('หาปลาตัวสีเงินที่มีจมูกและครีบสีแดง', 'Find the silver-blue fish with a red nose and red fins'),
    // a little silvery-blue fish with a bright red snout and red-tipped fins swimming among wavy green water weeds, two smaller friends and bubbles
    [[30, 210], [70, 214], [190, 212], [214, 206]].map(([x, y]) => Lc(`M${x} ${y}c-10-20 10-40 0-60s10-30 0-50`, '#66BB6A', 6)).join('')
      + g(120, 120, 1, P('M-60 0c20-34 80-34 100 0-20 34-80 34-100 0z', '#B3D4E8') + P('M40 0l30-24v48z', '#E53935') + P('M-10 -26l14-18 16 16z', '#E53935', 2.5) + P('M-6 26l12 14 12-14z', '#E53935', 2.5) + P('M-60 0c4-8 10-12 16-12v24c-6 0-12-4-16-12z', '#E53935', 2.5) + Lc('M-30 4c20 6 50 6 64 0', '#FFFFFF', 3) + face(-24, -4, 0.55))
      + [[50, 60, 0.4], [196, 70, 0.35]].map(([x, y, s]) => g(x, y, s, P('M-60 0c20-34 80-34 100 0-20 34-80 34-100 0z', '#B3D4E8') + P('M40 0l30-24v48z', '#E53935') + C(-34, -4, 5, INK, 0))).join('')
      + [[150, 70, 6], [160, 54, 4], [100, 46, 5]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2)).join('')),
  L('htaminjin', 'ข้าวยำมะเขือเทศไทใหญ่', 'Htamin jin, Shan tomato rice balls', ['htamin jin', 'ทะมินจิน', 'sour rice', 'ข้าวยำ', 'tomato rice', 'ข้าวมะเขือเทศ', 'shan food', 'อาหารไทใหญ่', 'rice balls', 'ข้าวปั้น', 'crispy garlic', 'กระเทียมเจียว'],
    nm('หาข้าวปั้นสีส้มบนใบตอง', 'Find the orange rice balls sitting on the banana leaf'),
    // two round balls of rice mashed with tomato and fish, orange and glossy, on a banana leaf with crispy garlic, a dried red chilli, spring onions and a wedge of garlic cloves
    P('M14 186c50-40 160-40 212 0-50 20-162 20-212 0z', '#7CB342') + Lc('M30 182c50-16 130-16 180 0', '#558B2F', 2)
      + [[90, 150, 36], [152, 156, 30]].map(([x, y, r]) => C(x, y, r, '#F08A4B') + Array.from({ length: 7 }, (_, k) => C(x - r / 2 + (k * 13) % r, y - r / 2 + (k * 17) % r, 2.6, '#FFE0B2', 0)).join('')).join('')
      + [[80, 116], [98, 118], [150, 124]].map(([x, y]) => E(x, y, 5, 3, '#FFE082', 1.5)).join('') + P('M180 176c10-8 26-10 34-4-8 2-22 6-34 4z', '#C62828', 2.5) + Lc('M40 178c8-6 16-12 26-14M48 182c8-6 18-10 28-10', '#43A047', 3)
      + face(90, 152, 0.55)),
  L('kalawtrek', 'เดินป่าจากกะลอไปอินเล', 'The hill trek from Kalaw to Inle', ['kalaw', 'กะลอ', 'trek', 'เดินป่า', 'red earth', 'ดินแดง', 'hill farms', 'ไร่บนเขา', 'shan hills', 'เทือกเขาไทใหญ่', 'trail', 'เส้นทางเดิน'], nm('หาเส้นทางดินสีแดงที่คดเคี้ยวผ่านไร่', 'Find the red earth path winding through the fields'),
    // rolling hills in a patchwork of green and gold fields, a red earth path winding up through them, two children with backpacks walking along it, a small wooden house on the hill
    P('M0 100c40-30 90-30 130-10s80 10 110-10v130H0z', '#AED581') + P('M0 140c50-30 100-20 140 0s70 0 100-14v94H0z', '#FFD54F') + P('M0 180c60-20 120-10 180 6s50 4 60-4v38H0z', '#81C784')
      + Lc('M40 100l40 20M150 110l40-14M60 160l50-10M160 160l50 6', '#689F38', 2.5) + R(170, 70, 30, 20, '#A1673F') + P('M164 70l21-14 21 14z', '#D7A86E')
      + P('M70 220c10-30 50-30 60-56s40-30 50-70', 'none', 14).replace('fill="none" stroke-width="14"', 'fill="none" stroke="#C1694F" stroke-width="14"') + Lc('M70 220c10-30 50-30 60-56s40-30 50-70', INK, 1.5)
      + [[104, 178, '#C98B5A', '#29B6F6', '#FF7043'], [136, 146, '#FFE0BD', '#AB47BC', '#FFCA28']].map(([x, y, sk, c, bp]) => R(x - 12, y - 4, 10, 18, bp, 3, 2) + R(x - 6, y - 6, 14, 20, c, 4, 2.5) + C(x, y - 16, 9, sk, 2.5) + Lc(`M${x - 3} ${y + 14}v8M${x + 5} ${y + 14}v8`, INK, 3)).join('') + face(185, 84, 0.25)),
  L('schoolboat', 'เด็กๆ นั่งเรือไปโรงเรียนกลางทะเลสาบ', 'Going to school by boat on Inle Lake', ['school boat', 'เรือไปโรงเรียน', 'school by boat', 'นั่งเรือไปโรงเรียน', 'canoe', 'เรือแคนู', 'paddling', 'พายเรือ', 'lake school', 'โรงเรียนกลางน้ำ'], nm('หาเด็กๆ ในชุดนักเรียนเสื้อขาวในเรือ', 'Find the children in white school shirts sitting in the boat'),
    // a narrow wooden canoe with three children in white shirts and green school longyis, one paddling, gliding past a stilt school house with a little flag-less bell tower
    P('M0 130h240v90H0z', '#4FC3F7') + R(150, 60, 70, 40, '#FFF3E0') + P('M144 60l41-24 41 24z', '#C62828') + R(160, 72, 14, 14, '#90CAF9', 2, 2.5) + R(194, 72, 14, 14, '#90CAF9', 2, 2.5) + [158, 186, 214].map((x) => Lc(`M${x} 100v34`, '#6D4C41', 4)).join('')
      + Lc('M20 150c20-6 40 6 60 0M150 200c20-6 40 6 60 0', '#B3E5FC', 3)
      + [[60, 158, '#C98B5A'], [94, 156, '#FFE0BD'], [128, 158, '#C98B5A']].map(([x, y, s]) => R(x - 10, y - 2, 20, 18, '#FFFFFF', 5, 2.5) + C(x, y - 12, 10, s, 2.5) + P(`M${x - 10} ${y - 16}c0-12 20-12 20 0z`, INK, 0)).join('')
      + Lc('M140 150l28 34', '#A1673F', 4) + P('M164 180l10 14 6-4-8-14z', '#A1673F', 2) + boat(94, 182, 150, '#2E7D32') + Lc('M30 180h128', '#1B5E20', 3) + face(94, 188, 0.3)),
];

export default {
  places: {
    'mm-bagan': { country: 'mm', wave: 3, name: nm('พุกามและทะเลสาบอินเล', 'Bagan and Inle Lake'), tz: 'Asia/Yangon', ll: [21.17, 94.86], alias: ['bagan', 'พุกาม', 'inle lake', 'ทะเลสาบอินเล', 'inle', 'อินเล', 'nyaung-u', 'nyaungshwe', 'ญองชเว', 'mount popa', 'ภูเขาโปปา', 'kalaw', 'taunggyi', 'ตองยี', 'NYU', 'HEH'], colors: BG },
  },
  items,
};
