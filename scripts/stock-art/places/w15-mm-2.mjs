// Wave 15, Myanmar: Yangon (and its day trips to Bago, Thanlyin and the Golden Rock) — the city stamp, two day scenes and seventeen
// landmarks: the golden stupas only as buildings, colonial streets, the circle train, lakes, tea shops (no Buddha images, no markets)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const YG = { k1: '#B8860B', k2: '#C62828', k3: '#FFF8E1' };
const CITY = 'mm-yangon', DIR = 'mm/yangon';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const GOLD = '#F4C430', GOLD2 = '#C9971C';

// the Shwedagon's own outline: a wide terrace, the great bell, the stacked turban bands, the lotus, the slim bud and the jewelled umbrella on top
// (x = middle, b = base, s = scale, sw = stroke)
const sdg = (x, b, s, sw) => g(x, b, s, R(-46, -12, 92, 12, GOLD2, 0, sw) + R(-38, -22, 76, 10, GOLD, 0, sw)
  + P('M-34 -22c0-26 14-40 34-48 20 8 34 22 34 48z', GOLD, sw)
  + [0, 1, 2].map((k) => R(-(18 - k * 4), -(78 + k * 8), 36 - k * 8, 8, k % 2 ? GOLD2 : GOLD, 2, sw)).join('')
  + P('M-10 -94c2-10 18-10 20 0z', GOLD, sw) + P('M-6 -98c0-16 4-30 6-42 2 12 6 26 6 42z', GOLD, sw)
  + P('M-8 -138l8-6 8 6z', '#FFFFFF', sw) + C(0, -148, 3.5, '#E1F5FE', sw));
// a Burmese tiered roof (pyatthat): n shrinking tiers with flicked-up eaves and a thin golden finial
const pyat = (x, b, w, n, h, col, sw) => Array.from({ length: n }, (_, k) => { const wk = w * (1 - k / (n + 1)), y = b - k * h; return P(`M${x - wk / 2 - 6} ${y}q4 0 8-${h}h${wk - 4}q4 ${h} 8 ${h}z`, col, sw); }).join('')
  + Lc(`M${x} ${b - n * h}v-${h * 1.6}`, GOLD2, 3) + C(x, b - n * h - h * 1.6, 2.5, GOLD, 1.5);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับย่างกุ้ง', 'Yangon stamp'), kw: ['yangon', 'ย่างกุ้ง', 'rangoon', 'shwedagon', 'ชเวดากอง', 'golden stupa', 'เจดีย์ทอง'],
    // the great golden Shwedagon stupa standing on its hill (the building only)
    svg: cityStamp('ygn-st', { name: 'YANGON', sub: 'MYANMAR', ...YG, emblem: P('M52 140c14-16 32-22 48-22s34 6 48 22z', '#81C784', 2.5) + sdg(100, 124, 0.56, 2.5) }) },

  D('shwedagon', 'เจดีย์ชเวดากองยามเย็น', 'The Shwedagon at dusk', ['shwedagon', 'ชเวดากอง', 'shwedagon pagoda', 'พระมหาเจดีย์ชเวดากอง', 'golden stupa', 'เจดีย์ทองคำ', 'sunset', 'ยามเย็น', 'kandawgyi lake', 'ทะเลสาบกันดอจี'],
    // the giant golden stupa glowing on its green hill against a peach and lilac evening sky, smaller white and gold spires round it, the lake below with a golden reflection
    scene('ygn-d1', '#FFCC80', P('M-4 0h248v60H-4z', '#B39DDB', 0) + P('M-4 56h248v40H-4z', '#F8BBD0', 0) + C(46, 66, 12, '#FFF59D', 0)
      + P('M-4 160c40-40 80-56 124-56s84 16 128 56z', '#66BB6A') + [[62, 136, '#FFFFFF'], [86, 126, GOLD], [154, 126, GOLD], [178, 136, '#FFFFFF']].map(([x, y, c]) => P(`M${x - 8} ${y}c0-12 4-16 8-26 4 10 8 14 8 26z`, c, 3)).join('')
      + sdg(120, 128, 0.75) + P('M-4 160h248v90H-4z', '#5C6BC0') + P('M104 166h32l-6 40h-20z', '#FFD54F', 0) + Lc('M110 216h20M114 226h12', '#FFD54F', 3) + Lc('M20 180c20-4 40 4 60 0M160 196c20-4 40 4 60 0', '#9FA8DA', 3))),
  D('downtown', 'ถนนเก่าใจกลางย่างกุ้ง', 'The old streets of downtown Yangon', ['downtown yangon', 'ใจกลางย่างกุ้ง', 'sule pagoda', 'เจดีย์สุเล', 'colonial buildings', 'ตึกยุคอาณานิคม', 'roundabout', 'วงเวียน', 'city bus', 'รถเมล์'],
    // a little golden stupa on its roundabout at the end of a wide street, pastel colonial buildings with balconies on both sides, a red bus, trees and crows on a wire
    scene('ygn-d2', '#B3E5FC', P('M70 250L110 120h20l40 130z', '#90A4AE', 0) + Lc('M120 140v100', '#FFFFFF', 3)
      + [[-4, 50, 90, '#FFCC80'], [26, 70, 70, '#F48FB1']].map(([x, y, w, c]) => R(x, y, 44, 200, c) + Array.from({ length: 4 }, (_, r) => R(x + 8, y + 16 + r * 34, 26, 18, '#FFFFFF', 3, 2.5) + Lc(`M${x + 4} ${y + 38 + r * 34}h36`, '#5D4037', 3)).join('')).join('')
      + [[170, 70, '#A5D6A7'], [200, 50, '#CE93D8']].map(([x, y, c]) => R(x, y, 44, 200, c) + Array.from({ length: 4 }, (_, r) => R(x + 10, y + 16 + r * 34, 26, 18, '#FFFFFF', 3, 2.5) + Lc(`M${x + 4} ${y + 38 + r * 34}h36`, '#5D4037', 3)).join('')).join('')
      + E(120, 132, 26, 8, '#81C784') + P(`M106 130c0-14 6-22 14-28 8 6 14 14 14 28z`, GOLD) + P('M116 104c0-10 2-18 4-26 2 8 4 16 4 26z', GOLD) + Lc('M-4 40c80 20 168 20 248 0', INK, 2) + [[60, 46], [80, 49], [168, 47]].map(([x, y]) => E(x, y - 4, 6, 5, INK, 0) + P(`M${x + 4} ${y - 6}l6-1-5 4z`, INK, 0)).join('')
      + R(84, 174, 72, 40, '#E53935', 8) + Array.from({ length: 4 }, (_, k) => R(90 + k * 16, 182, 12, 12, '#E3F2FD', 2, 2.5)).join('') + R(84, 200, 72, 6, '#FFFFFF', 0, 0) + [[98, 216], [142, 216]].map(([x, y]) => C(x, y, 8, INK)).join(''))),

  L('circletrain', 'รถไฟวงแหวนย่างกุ้ง', 'The Yangon Circle Line train', ['circle line', 'รถไฟวงแหวน', 'circle train', 'รถไฟสายวงกลม', 'local train', 'รถไฟท้องถิ่น', 'rice fields', 'ทุ่งนา', 'vegetable baskets', 'ตะกร้าผัก'], nm('หาตะกร้าผักที่วางอยู่ตรงประตูรถไฟ', 'Find the basket of greens by the open train door'),
    // an old blue-and-cream carriage with wide-open doors and windows full of waving children, a basket of green vegetables at the door, rolling past rice fields
    P('M0 196h240v16H0z', '#A5D6A7', 0) + Lc('M0 204h240', '#795548', 4) + Array.from({ length: 9 }, (_, k) => Lc(`M${8 + k * 28} 198v12`, '#8D6E63', 4)).join('')
      + R(14, 96, 212, 92, '#1E88E5', 10) + R(14, 154, 212, 16, '#FFF3D6', 0) + P('M14 104c0-14 8-20 20-20h172c12 0 20 6 20 20z', '#90A4AE')
      + [34, 72, 150, 188].map((x) => R(x, 108, 26, 30, '#FFF8E1', 4, 3)).join('') + R(108, 104, 28, 66, '#4E342E', 3)
      + [[47, 124, '#C98B5A'], [163, 124, '#FFE0BD'], [201, 124, '#C98B5A']].map(([x, y, c]) => C(x, y, 9, c, 2.5)).join('') + P('M206 112l10-10', 'none', 3)
      + P('M110 158c0-12 24-12 24 0v12h-24z', '#A1673F') + [[114, 150], [122, 146], [130, 150]].map(([x, y]) => C(x, y, 6, '#66BB6A', 2)).join('')
      + [[50, 192], [96, 192], [148, 192], [194, 192]].map(([x, y]) => C(x, y, 9, '#455A64', 2.5)).join('') + face(84, 134, 0.4)),
  L('karaweik', 'การะเวกบนทะเลสาบกันดอจี', 'Karaweik Hall on Kandawgyi Lake', ['karaweik', 'การะเวก', 'karaweik palace', 'หอการะเวก', 'kandawgyi lake', 'ทะเลสาบกันดอจี', 'golden barge', 'เรือทอง', 'royal barge shape', 'buffet dinner'], nm('หาหัวนกสองตัวที่หัวเรือทองคำ', 'Find the two golden bird heads at the front of the barge'),
    // a long golden building shaped like a pair of royal barges floating on the lake, two big bird heads curling up at the bow, a tall tiered roof in the middle
    P('M0 176h240v40H0z', '#4FC3F7') + Lc('M20 196c20-6 40 6 60 0M150 204c20-6 40 6 60 0', '#B3E5FC', 3)
      + P('M30 170c30 18 150 18 182 0l-6-26H38z', GOLD) + Lc('M40 160c40 10 130 10 168 0', '#E53935', 4) + [[60, 152], [90, 152], [150, 152], [180, 152]].map(([x, y]) => R(x - 7, y - 26, 14, 18, '#FFF8E1', 3, 2.5)).join('')
      + R(70, 112, 100, 14, '#E53935', 0) + pyat(120, 112, 70, 5, 12, GOLD)
      + P('M30 168c-14-14-14-50 4-66 14-12 32-4 30 10-2 12-16 10-14 0', 'none', 12).replace('fill="none" stroke-width="12"', `fill="none" stroke="${GOLD}" stroke-width="12"`) + Lc('M30 168c-14-14-14-50 4-66 14-12 32-4 30 10', INK, 2.5) + P('M50 104l14 4-12 6z', '#FF7043', 2) + C(44, 104, 2.5, INK, 0)
      + P('M212 170c12-10 18-30 10-48', 'none', 10).replace('fill="none" stroke-width="10"', `fill="none" stroke="${GOLD}" stroke-width="10"`) + Lc('M212 170c12-10 18-30 10-48', INK, 2.5) + face(120, 160, 0.45)),
  L('cityhall', 'ศาลาว่าการนครย่างกุ้ง', 'Yangon City Hall', ['city hall', 'ศาลาว่าการเมือง', 'yangon city hall', 'ศาลาว่าการย่างกุ้ง', 'tiered roof', 'หลังคาซ้อนชั้น', 'colonial building', 'ตึกเก่า', 'maha bandula road', 'ถนนมหาพันธุละ'], nm('หาหลังคาซ้อนชั้นสีเขียวบนตึกสีครีม', 'Find the green stacked roof on top of the cream building'),
    // a long cream building with blue-green window frames, little peacock-blue domes on the corners and a Burmese stacked roof rising over the middle entrance
    R(14, 110, 212, 100, '#FFF3D6') + R(14, 200, 212, 10, '#D7CCC8', 0) + Lc('M14 128h212', '#26A69A', 4)
      + Array.from({ length: 2 }, (_, r) => Array.from({ length: 8 }, (_, k) => (k === 3 || k === 4 ? '' : R(24 + k * 25, 140 + r * 30, 14, 20, '#4DB6AC', 6, 2.5)))).flat().join('')
      + R(92, 136, 56, 74, '#FFF8E1') + P('M104 210v-34c0-20 32-20 32 0v34z', '#26A69A') + pyat(120, 110, 70, 4, 14, '#26A69A')
      + [24, 216].map((x) => R(x - 12, 92, 24, 18, '#FFF8E1') + P(`M${x - 14} 92c0-16 28-16 28 0z`, '#00897B') + Lc(`M${x} 76v-6`, GOLD2, 3)).join('') + face(120, 160, 0.4)),
  L('secretariat', 'อาคารสำนักเลขาธิการ', 'The red-brick Secretariat', ['secretariat', 'อาคารสำนักเลขาธิการ', 'ministers building', 'อาคารรัฐมนตรี', 'red brick', 'อิฐแดง', 'colonial architecture', 'สถาปัตยกรรมอาณานิคม', 'heritage walk', 'เดินชมเมืองเก่า'], nm('หาโดมกลมบนตึกอิฐสีแดงยาวๆ', 'Find the round dome on top of the long red-brick building'),
    // a long low red-brick palace with white stripes, rows of arched windows, a round dome on a little tower in the middle and green lawns in front
    P('M0 200h240v20H0z', '#9CCC65') + R(10, 120, 220, 80, '#C0533A') + [140, 168].map((y) => Lc(`M10 ${y}h220`, '#FFFFFF', 4)).join('')
      + Array.from({ length: 2 }, (_, r) => Array.from({ length: 9 }, (_, k) => (k === 4 ? '' : P(`M${20 + k * 24} ${158 + r * 28}v-10c0-8 12-8 12 0v10z`, '#FFF3E0', 2.5)))).flat().join('')
      + R(98, 80, 44, 120, '#C0533A') + Lc('M98 100h44', '#FFFFFF', 4) + P('M96 80c0-30 48-30 48 0z', '#B0BEC5') + Lc('M120 50v-12', INK, 3) + C(120, 36, 3, GOLD, 2) + P('M108 200v-30c0-14 24-14 24 0v30z', '#FFF3E0')
      + [16, 224].map((x) => R(x - 8, 104, 16, 16, '#C0533A') + P(`M${x - 10} 104l10-12 10 12z`, '#8D3B2A')).join('') + face(120, 122, 0.4)),
  L('highcourt', 'ศาลสูงกับหอนาฬิกา', 'The old High Court clock tower', ['high court', 'ศาลสูง', 'clock tower', 'หอนาฬิกา', 'red and white brick', 'อิฐแดงขาว', 'colonial', 'ยุคอาณานิคม', 'maha bandula park', 'สวนมหาพันธุละ'], nm('หานาฬิกาบนหอคอยลายทางแดงขาว', 'Find the clock on the red and white striped tower'),
    // a tall red-brick tower striped with white bands, a big clock face, a pointed dome and little turrets, with long two-storey wings on each side
    R(14, 140, 76, 70, '#D9603F') + R(150, 140, 76, 70, '#D9603F') + [160, 184].map((y) => Lc(`M14 ${y}h76M150 ${y}h76`, '#FFFFFF', 4)).join('') + [24, 44, 64, 160, 180, 200].map((x) => P(`M${x} 176v-14c0-8 12-8 12 0v14z`, '#FFF3E0', 2.5) + P(`M${x} 204v-14c0-8 12-8 12 0v14z`, '#FFF3E0', 2.5)).join('')
      + R(90, 60, 60, 150, '#D9603F') + [80, 104, 172, 196].map((y) => Lc(`M90 ${y}h60`, '#FFFFFF', 5)).join('') + P('M86 60c4-30 20-46 34-50 14 4 30 20 34 50z', '#E0E0E0') + [88, 152].map((x) => P(`M${x - 8} 62l8-20 8 20z`, '#FFFFFF')).join('')
      + C(120, 136, 24, '#FFFFFF') + Lc('M120 136v-14M120 136l10 6', INK, 3) + P('M108 210v-20c0-10 24-10 24 0v20z', '#5D4037') + face(120, 140, 0.32, 'none')),
  L('inyalake', 'ทะเลสาบอินยายามเย็น', 'Inya Lake at sunset', ['inya lake', 'ทะเลสาบอินยา', 'lakeside walk', 'เดินเล่นริมทะเลสาบ', 'sunset', 'พระอาทิตย์ตก', 'sailing boats', 'เรือใบ', 'evening breeze', 'ลมเย็น'], nm('หาเรือใบลำเล็กสองลำกลางทะเลสาบ', 'Find the two little sailing boats out on the lake'),
    // a big orange sun sinking over a wide calm lake, two little sailing dinghies, a promenade with old lamp posts and a bench under a palm tree
    C(120, 96, 40, '#FFB74D') + P('M0 110h240v70H0z', '#7986CB') + P('M96 112h48l-10 40h-28z', '#FFCC80', 0) + Lc('M100 128h40M106 142h28', '#FFE0B2', 3)
      + [[60, 140, '#FFFFFF'], [180, 130, '#FFEB3B']].map(([x, y, c]) => P(`M${x - 18} ${y}h36l-6 8h-24z`, '#8D6E63', 2.5) + P(`M${x} ${y - 4}v-34l20 30z`, c, 2.5) + P(`M${x - 2} ${y - 6}l-14-2 14-22z`, c, 2.5)).join('')
      + P('M0 180h240v40H0z', '#BCAAA4') + Lc('M0 182h240', '#8D6E63', 4) + [30, 210].map((x) => Lc(`M${x} 182v-50`, '#455A64', 4) + C(x, 128, 8, '#FFF59D', 2.5)).join('')
      + R(130, 172, 40, 8, '#8D6E63', 2) + Lc('M134 180v10M166 180v10', '#5D4037', 3) + Lc('M90 182c-2-30 4-50 10-60', '#8D6E63', 6) + [[-40], [0], [40], [80]].map(([a]) => g(100, 122, 1, P('M0 0c10-6 26-6 34 4-14 0-24 0-34-4z', '#43A047', 2.5), a - 20)).join('') + face(120, 92, 0.6)),
  L('boardwalk', 'ทางเดินไม้สักริมกันดอจี', 'The teak boardwalk of Kandawgyi', ['kandawgyi', 'กันดอจี', 'boardwalk', 'ทางเดินไม้', 'teak walkway', 'สะพานไม้สัก', 'lake walk', 'เดินรอบทะเลสาบ', 'water lilies', 'บัวสาย'], nm('หาทางเดินไม้ที่เลี้ยวไปเลี้ยวมาบนน้ำ', 'Find the wooden walkway zigzagging over the water'),
    // a zigzag teak boardwalk with railings running across the water, pink water lilies on round pads, a tiny golden spire on the far shore
    P('M0 70h240v150H0z', '#4DB6AC') + P('M0 70c40-10 80-6 120-2s80 6 120-2', '#81C784', 3) + P('M174 66c0-8 2-12 4-20 2 8 4 12 4 20z', GOLD, 2)
      + P('M20 210l60-50 40 30 60-60 40 20v14l-40-20-60 60-40-30-60 50z', '#C8913A') + Lc('M20 200l60-50 40 30 60-60 40 20', '#8D5524', 3) + [[30, 196], [60, 172], [100, 172], [140, 176], [170, 146], [204, 146]].map(([x, y]) => Lc(`M${x} ${y}v20`, '#8D5524', 3)).join('')
      + [[50, 120], [150, 196], [210, 200], [30, 150]].map(([x, y]) => E(x, y, 16, 8, '#66BB6A', 2.5) + P(`M${x - 6} ${y - 4}l6-10 6 10z`, '#F48FB1', 2)).join('') + face(120, 196, 0.38)),
  L('teashop', 'ร้านน้ำชาริมทางแบบพม่า', 'A Yangon pavement tea shop', ['tea shop', 'ร้านน้ำชา', 'laphet yay', 'ชานมพม่า', 'low stools', 'เก้าอี้เตี้ย', 'palata', 'ปาลาตา', 'breakfast', 'อาหารเช้า'], nm('หาเก้าอี้พลาสติกตัวจิ๋วรอบโต๊ะเตี้ย', 'Find the tiny plastic stools round the low table'),
    // a low blue table with little glasses of milky tea on saucers and a plate of flaky palata, tiny red and green plastic stools round it, a tall kettle with a smile
    R(40, 150, 160, 12, '#29B6F6', 4) + Lc('M54 162v36M186 162v36', '#0277BD', 6)
      + [[30, 196, '#E53935'], [120, 206, '#43A047'], [210, 196, '#FFCA28']].map(([x, y, c]) => R(x - 18, y - 22, 36, 8, c, 3) + Lc(`M${x - 14} ${y - 14}l-4 22M${x + 14} ${y - 14}l4 22`, c, 5)).join('')
      + [[74, 134], [112, 134]].map(([x, y]) => E(x, y + 14, 16, 5, '#FFFFFF', 2.5) + P(`M${x - 10} ${y - 10}h20l-3 24h-14z`, '#D7A86E') + Lc(`M${x - 9} ${y - 2}h18`, '#FFF3E0', 2)).join('')
      + E(158, 146, 26, 6, '#FFFFFF', 2.5) + P('M138 144c4-12 36-12 40 0z', '#F2C46D') + Lc('M146 138c6 4 18 4 24 0', '#C8862F', 2)
      + P('M170 120c-4-30 0-60 10-70h30c10 10 14 40 10 70z', '#B0BEC5') + P('M176 52c4-14 34-14 38 0z', '#90A4AE') + C(195, 36, 5, '#455A64', 2) + Lc('M170 70c-16-4-26 6-30 18', '#90A4AE', 6) + P('M222 70c14 4 14 30 0 36', 'none', 5) + face(195, 92, 0.5)),
  L('bandula', 'อนุสาวรีย์เอกราชในสวนมหาพันธุละ', 'The Independence Monument in Maha Bandula Garden', ['independence monument', 'อนุสาวรีย์เอกราช', 'maha bandula garden', 'สวนมหาพันธุละ', 'obelisk', 'เสาโอเบลิสก์', 'city park', 'สวนสาธารณะ', 'flower beds', 'แปลงดอกไม้'], nm('หาเสาสูงสีขาวที่มีเสาเล็กห้าต้นล้อมรอบ', 'Find the tall white pillar with five small pillars round it'),
    // a tall white obelisk on a round stepped base ringed by five smaller white pillars, flower beds and a lawn, a little golden spire peeping behind the trees
    P('M10 196h220v20H10z', '#9CCC65') + [[30, 150], [214, 156]].map(([x, y]) => C(x, y, 26, '#43A047') + Lc(`M${x} ${y + 20}v24`, '#795548', 6)).join('') + P('M196 120c0-14 4-20 8-34 4 14 8 20 8 34z', GOLD, 3)
      + E(120, 192, 76, 12, '#E0E0E0') + E(120, 184, 60, 9, '#F5F5F5') + P('M110 182V60l10-26 10 26v122z', '#FFFFFF') + Lc('M110 80h20', '#E0E0E0', 3)
      + [[66, 180], [88, 172], [152, 172], [174, 180]].map(([x, y]) => R(x - 6, y - 40, 12, 40, '#FFFFFF') + P(`M${x - 6} ${y - 40}l6-8 6 8z`, '#FFFFFF')).join('')
      + [[40, 204, '#E53935'], [70, 210, '#FFCA28'], [170, 210, '#EC407A'], [200, 204, '#AB47BC']].map(([x, y, c]) => C(x, y, 5, c, 2)).join('') + face(120, 150, 0.35)),
  L('station', 'สถานีรถไฟกลางย่างกุ้ง', 'Yangon Central Railway Station', ['yangon central station', 'สถานีรถไฟกลางย่างกุ้ง', 'railway station', 'สถานีรถไฟ', 'tiered roofs', 'หลังคาซ้อนชั้น', 'mandalay train', 'รถไฟไปมัณฑะเลย์', 'platform', 'ชานชาลา'], nm('หาหลังคาแหลมซ้อนชั้นสามยอดบนสถานี', 'Find the three pointed stacked roofs on the station'),
    // a long cream station with arched doors and a row of windows, three Burmese stacked roofs in deep red rising along the top, a clock in the middle
    R(10, 128, 220, 80, '#FFF3D6') + R(10, 200, 220, 10, '#BCAAA4', 0) + Lc('M10 146h220', '#8D3B2A', 4)
      + [24, 52, 80, 148, 176, 204].map((x) => P(`M${x} 200v-30c0-10 16-10 16 0v30z`, '#8D6E63', 2.5)).join('') + P('M96 200v-36c0-20 48-20 48 0v36z', '#5D4037')
      + pyat(120, 128, 90, 4, 14, '#B23A2A') + pyat(40, 128, 50, 3, 12, '#B23A2A') + pyat(200, 128, 50, 3, 12, '#B23A2A') + C(120, 158, 9, '#FFFFFF', 2.5) + Lc('M120 158v-5M120 158l4 2', INK, 2) + face(120, 178, 0.35)),
  L('phonestall', 'แผงโทรศัพท์ริมทางเท้า', 'A pavement telephone stall', ['phone stall', 'แผงโทรศัพท์', 'street phone', 'โทรศัพท์ริมทาง', 'landline telephone', 'โทรศัพท์บ้าน', 'sidewalk', 'ทางเท้า', 'old yangon', 'ย่างกุ้งเก่า'], nm('หาโทรศัพท์บ้านสามเครื่องบนโต๊ะใต้ร่ม', 'Find the three old telephones on the table under the umbrella'),
    // a little table on the pavement under a striped umbrella with three chunky coloured telephones and their curly cords, a stool beside it
    P('M0 210h240v14H0z', '#BDBDBD') + Lc('M120 60v100', '#8D6E63', 5) + P('M40 64c20-40 140-40 160 0z', '#FFFFFF') + [0, 1, 2, 3].map((k) => P(`M${40 + k * 40} 64c${k === 0 ? 4 : 6}-${k === 0 || k === 3 ? 20 : 30} ${k < 2 ? 34 : 34}-${k === 0 || k === 3 ? 30 : 34} 40 0z`, k % 2 ? '#FFFFFF' : '#E53935', 2.5)).join('')
      + R(40, 148, 160, 12, '#8D6E63', 3) + Lc('M54 160v50M186 160v50', '#6D4C41', 6)
      + [[70, '#FFCA28'], [120, '#26A69A'], [170, '#EC407A']].map(([x, c]) => P(`M${x - 22} 148l6-18h32l6 18z`, c) + P(`M${x - 24} 124c0-10 48-10 48 0v6h-48z`, c) + C(x, 140, 6, '#FFFFFF', 2) + Lc(`M${x + 22} 146c10 6 0 12 10 18s-2 12 6 18`, INK, 2)).join('')
      + R(196, 186, 30, 8, '#29B6F6', 3) + Lc('M200 194l-2 16M222 194l2 16', '#29B6F6', 4) + face(120, 136, 0.3)),
  L('goldenrock', 'พระธาตุอินทร์แขวน ก้อนหินทองบนหน้าผา', 'The Golden Rock of Kyaiktiyo', ['golden rock', 'พระธาตุอินทร์แขวน', 'kyaiktiyo', 'ไจทีโย', 'balancing boulder', 'หินทรงตัว', 'mountain top', 'ยอดเขา', 'gold leaf', 'แผ่นทอง', 'day trip'], nm('หาก้อนหินทองที่เกาะอยู่ริมหน้าผาแทบจะหล่น', 'Find the golden boulder perched right on the edge of the cliff'),
    // a huge round golden boulder balancing on the very edge of a grey cliff with a tiny golden spire on its top, clouds and green hills far below
    [[40, 196], [196, 200]].map(([x, y]) => P(`M${x - 40} ${y + 20}c10-24 70-24 80 0z`, '#A5D6A7')).join('') + [[30, 150], [200, 170]].map(([x, y]) => P(`M${x - 26} ${y}c-10 0-10-14 0-14 2-10 16-12 22-4 6-8 22-6 22 6 10 0 10 12 0 12z`, '#FFFFFF', 3)).join('')
      + P('M60 216c0-40 10-80 30-90h70l-6 90z', '#90A4AE') + Lc('M100 140l-6 30M140 150l4 40', '#78909C', 3)
      + E(150, 96, 52, 46, GOLD) + P('M110 80c10-16 30-24 46-20', 'none', 4).replace('fill="none" stroke-width="4"', 'fill="none" stroke="#FFF59D" stroke-width="4"') + P('M144 52c0-12 4-18 6-28 2 10 6 16 6 28z', GOLD, 3) + Lc('M150 24v-8', INK, 2.5) + face(150, 100, 0.65)),
  L('nangyithoke', 'นันจีโต่ะ ยำเส้นใหญ่ย่างกุ้ง', 'Nan gyi thoke, Yangon’s thick-noodle salad', ['nan gyi thoke', 'นันจีโต่ะ', 'thick rice noodles', 'เส้นขนมจีนเส้นใหญ่', 'noodle salad', 'ยำเส้น', 'chicken curry', 'แกงไก่', 'chickpea flour', 'แป้งถั่วลูกไก่', 'breakfast', 'อาหารเช้า'], nm('หาเส้นก๋วยเตี๋ยวอ้วนกลมที่คลุกกับแกงไก่สีส้ม', 'Find the fat round noodles mixed with orange chicken curry'),
    // a plate of fat round rice noodles tossed with orange chicken curry and toasted chickpea flour, two egg halves, crispy fried onions and a lime, a little bowl of clear soup beside it
    E(110, 186, 98, 24, '#E0E0E0', 0) + E(110, 172, 94, 28, '#FFFFFF') + E(110, 168, 80, 20, '#29B6F6', 0) + E(110, 166, 74, 18, '#FFFFFF', 0)
      + P('M48 162c4-40 120-40 124 0-20 14-104 14-124 0z', '#F5D28A') + Array.from({ length: 7 }, (_, k) => Lc(`M${58 + k * 15} ${160 - (k % 2) * 6}c6-14 14-14 20-4`, '#FFF3D6', 7) + Lc(`M${58 + k * 15} ${160 - (k % 2) * 6}c6-14 14-14 20-4`, '#D7A86E', 1.5)).join('')
      + [[78, 140], [104, 128], [136, 140], [120, 152]].map(([x, y]) => E(x, y, 9, 6, '#E8742F', 2)).join('') + Array.from({ length: 10 }, (_, k) => C(64 + (k * 37) % 92, 132 + (k * 13) % 24, 2.2, '#C8862F', 0)).join('')
      + [[86, 124], [130, 120]].map(([x, y]) => E(x, y, 12, 9, '#FFFFFF', 2.5) + C(x, y, 5, '#FFCA28', 0)).join('') + [[100, 112], [116, 108], [146, 128]].map(([x, y]) => Lc(`M${x} ${y}q4-4 8 0`, '#8D5524', 3)).join('') + P('M160 118l18-8 4 14z', '#C0CA33', 2.5)
      + E(200, 110, 24, 10, '#FFFFFF', 2.5) + E(200, 106, 17, 5, '#FFE082', 0) + C(196, 106, 2, '#43A047', 0) + C(204, 107, 2, '#43A047', 0) + face(110, 154, 0.5)),
  L('balconybasket', 'ตะกร้าห้อยเชือกจากระเบียง', 'The basket on a string from the balcony', ['balcony basket', 'ตะกร้าห้อยเชือก', 'string and clip', 'เชือกกับหนีบ', 'newspaper delivery', 'ส่งหนังสือพิมพ์', 'old apartments', 'ตึกแถวเก่า', 'downtown street', 'ถนนกลางเมือง'], nm('หาตะกร้าที่ห้อยเชือกลงมาจากระเบียงชั้นบน', 'Find the basket hanging down on a string from the top balcony'),
    // a tall old pastel building with wooden balconies, a long string dangling from the top balcony with a little basket and a clip holding a newspaper, a child below reaching up
    R(40, 20, 120, 200, '#FFCC80') + Array.from({ length: 3 }, (_, r) => R(52, 34 + r * 60, 96, 30, '#FFF3E0', 3, 3) + Lc(`M44 ${70 + r * 60}h112`, '#6D4C41', 4) + Array.from({ length: 6 }, (_, k) => Lc(`M${52 + k * 18} ${70 + r * 60}v-10`, '#6D4C41', 2.5)).join('')).join('')
      + Lc('M150 70c4 30 10 60 20 96', INK, 2) + P('M156 166h28l-4 22h-20z', '#D7A86E') + Lc('M160 174h20M162 182h16', '#A1673F', 2) + R(162, 150, 16, 14, '#FFFFFF', 0, 2) + Lc('M165 154h10M165 159h10', '#9E9E9E', 1.5) + R(168, 144, 6, 8, '#E53935', 1, 1.5)
      + C(206, 172, 11, '#C98B5A', 2.5) + R(196, 182, 20, 26, '#29B6F6', 5, 2.5) + Lc('M210 182l8-20', '#C98B5A', 5) + face(170, 178, 0.28)),
  L('stmarys', 'อาสนวิหารเซนต์แมรี่อิฐแดง', 'St Mary’s red-brick cathedral', ['st mary\'s cathedral', 'อาสนวิหารเซนต์แมรี่', 'cathedral', 'โบสถ์ใหญ่', 'red brick church', 'โบสถ์อิฐแดง', 'gothic spire', 'ยอดแหลม', 'bo aung kyaw street', 'heritage building'], nm('หายอดแหลมสูงบนโบสถ์อิฐสีแดง', 'Find the tall pointed spire on the red-brick church'),
    // a red-brick church building with white trim, a tall square tower ending in a slim pointed spire, a round rose window and tall arched windows (the building only)
    P('M10 206h220v14H10z', '#9CCC65') + R(30, 120, 180, 86, '#C0533A') + P('M24 122l96-40 96 40z', '#8D3B2A') + [52, 80, 160, 188].map((x) => P(`M${x - 7} 190v-36c0-10 14-10 14 0v36z`, '#90CAF9', 2.5) + Lc(`M${x - 7} 172h14`, '#FFFFFF', 2)).join('')
      + R(98, 60, 44, 146, '#C0533A') + [86, 132].map((y) => Lc(`M98 ${y}h44`, '#FFFFFF', 4)).join('') + P('M96 60l24-50 24 50z', '#8D3B2A') + Lc('M120 10V0M114 4h12', INK, 3)
      + C(120, 112, 12, '#FFCA28', 2.5) + [0, 45, 90, 135].map((a) => g(120, 112, 1, Lc('M-10 0h20', '#E53935', 2), a)).join('') + P('M108 206v-30c0-16 24-16 24 0v30z', '#5D4037') + face(120, 150, 0.32)),
  L('yele', 'เจดีย์เยเลกลางแม่น้ำที่จ๊อกตัน', 'Ye Le Pagoda on its river island', ['ye le pagoda', 'เจดีย์เยเล', 'kyauktan', 'จ๊อกตัน', 'island pagoda', 'เจดีย์กลางน้ำ', 'river island', 'เกาะกลางแม่น้ำ', 'little boats', 'thanlyin'], nm('หาเกาะเล็กๆ ที่มีเจดีย์ทองอยู่กลางแม่น้ำ', 'Find the tiny island with a golden spire in the middle of the river'),
    // a small round island covered in white halls and one golden spire sitting in a wide brown river, a little wooden boat with a striped canopy rowing over to it
    P('M0 140h240v80H0z', '#BCAAA4') + Lc('M10 170c20-6 40 6 60 0M170 190c20-6 40 6 60 0', '#D7CCC8', 3) + E(120, 148, 70, 16, '#E0E0E0') + R(70, 120, 100, 28, '#FFFFFF') + [80, 152].map((x) => P(`M${x - 12} 120l12-14 12 14z`, '#E53935', 2.5)).join('')
      + P('M100 122c0-24 10-36 20-44 10 8 20 20 20 44z', GOLD) + P('M114 80c0-16 4-30 6-44 2 14 6 28 6 44z', GOLD) + R(112, 94, 16, 6, GOLD2, 2, 2) + Lc('M120 36v-10', INK, 2.5)
      + P('M30 198h60c-6 12-14 16-30 16s-24-4-30-16z', '#8D6E63') + P('M40 198c0-16 40-16 40 0z', '#FFCA28', 2.5) + Lc('M48 190h24', '#E53935', 3) + Lc('M90 196l20 12', '#6D4C41', 3) + face(120, 106, 0.35)),
  L('kanbawza', 'พระราชวังกัมโพชธานีที่พะโค', 'Kanbawzathadi Palace in Bago', ['kanbawzathadi palace', 'พระราชวังกัมโพชธานี', 'bago', 'พะโค', 'hongsawadi', 'หงสาวดี', 'golden palace', 'พระราชวังทอง', 'tiered roofs', 'หลังคาซ้อนเจ็ดชั้น'], nm('หาหลังคาทองซ้อนเจ็ดชั้นบนวังสีแดง', 'Find the golden roof stacked seven layers high on the red palace'),
    // a red-and-gold wooden palace hall raised on posts with wide steps, a spire of seven stacked golden roofs rising from the middle, little gold roofs on the wings
    P('M10 204h220v16H10z', '#E0C9A6') + R(24, 150, 192, 40, '#C62828') + Array.from({ length: 9 }, (_, k) => Lc(`M${32 + k * 22} 190v14`, '#8D3B2A', 6)).join('') + Lc('M24 160h192', GOLD, 4)
      + Array.from({ length: 8 }, (_, k) => R(34 + k * 22, 166, 12, 18, '#FFD54F', 2, 2)).join('') + P('M96 204l8-14h32l8 14z', '#BCAAA4', 2.5)
      + [[50, 150], [190, 150]].map(([x, b]) => pyat(x, b, 60, 2, 12, GOLD)).join('') + pyat(120, 150, 92, 7, 12, GOLD) + face(120, 178, 0.35)),
];

export default {
  places: {
    'mm-yangon': { country: 'mm', wave: 3, name: nm('ย่างกุ้งและพะโค', 'Yangon and Bago'), tz: 'Asia/Yangon', ll: [16.8, 96.15], alias: ['yangon', 'ย่างกุ้ง', 'rangoon', 'shwedagon', 'ชเวดากอง', 'bago', 'พะโค', 'หงสาวดี', 'golden rock', 'kyaiktiyo', 'ไจทีโย', 'พระธาตุอินทร์แขวน', 'thanlyin', 'RGN'], colors: YG },
  },
  items,
};
