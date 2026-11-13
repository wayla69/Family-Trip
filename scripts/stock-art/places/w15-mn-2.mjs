// Wave 15, group mn (2 of 3): Ulaanbaatar and Gorkhi-Terelj — the city's own buildings (temples and the palace only as
// buildings, no statues of real people, no war memorial) and the granite valley of Terelj; gers only inside the day scenes
// (docs/STOCK-ART.md §8)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const L = (key, th, en, kw, sth, sen, svg) => ({ id: `mn-ulaanbaatar.landmark.${key}`, cat: 'landmark', file: `mn/ulaanbaatar/landmark-${key}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (key, th, en, kw, sky, svg) => ({ id: `mn-ulaanbaatar.day.${key}`, cat: 'day', file: `mn/ulaanbaatar/day-${key}.v1.svg`, name: nm(th, en), kw, svg: scene(`mnub-${key}`, sky, svg) });
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
// a Siberian larch: a narrow cone of soft green tufts on a thin trunk (x, foot y, height)
const larch = (x, y, h, fill = '#558B2F') => Lc(`M${x} ${y}v-${h}`, '#6D4C41', 3) + P(`M${x} ${y - h - 6}c${h * 0.18} ${h * 0.3} ${h * 0.26} ${h * 0.6} ${h * 0.22} ${h * 0.86}h-${h * 0.44}c-${h * 0.04}-${h * 0.26} ${h * 0.04}-${h * 0.56} ${h * 0.22}-${h * 0.86}z`, fill, 2.5);
// a white ger with an orange door and a little stove pipe (day scenes only)
const ger = (x, y, s = 1) => g(x, y, s, P('M-26 0v-16c0-4 4-6 8-6h36c4 0 8 2 8 6V0z', '#FFFFFF', 3) + P('M-30-20c8-12 20-18 30-18s22 6 30 18z', '#FFFFFF', 3) + Lc('M-26-12h52', '#1E88E5', 3) + R(-6, -14, 12, 14, '#FF8F00', 1, 2.5) + Lc('M10-34v-10', '#90A4AE', 3));
const UB = { k1: '#1565C0', k2: '#C62828', k3: '#E3F2FD' };

const items = [
  { id: 'mn-ulaanbaatar.stamp', cat: 'stamp', file: 'mn/ulaanbaatar/stamp.v1.svg', name: nm('ตราประทับอูลานบาตอร์', 'Ulaanbaatar stamp'), kw: ['ulaanbaatar', 'อูลานบาตอร์', 'terelj', 'เทเรลจ์', 'turtle rock', 'หินเต่า'],
    // Turtle Rock, the granite boulder shaped like a giant turtle, on green grass with one larch beside it
    svg: cityStamp('mnub-st', { name: 'ULAANBAATAR', sub: 'MONGOLIA', ...UB, emblem: P('M50 126c20-6 80-6 100 0v12H50z', '#9CCC65', 0) + P('M66 126c0-34 18-50 40-50s38 16 38 50z', '#B0A79A') + Lc('M84 96l10 12-8 14M108 84v20l14 14M128 100l-6 18', '#8D8378', 2.5)
      + P('M66 112c-12 0-18-12-12-20 8-6 18-2 20 8z', '#B0A79A') + E(78, 128, 8, 4, '#9E9488', 2.5) + E(132, 128, 8, 4, '#9E9488', 2.5) + face(60, 100, 0.16, 'none') + larch(146, 126, 34) }) },
  D('terelj', 'หุบเขาเทเรลจ์', 'The Terelj valley', ['gorkhi-terelj', 'กอร์คี-เทเรลจ์', 'terelj national park', 'อุทยานเทเรลจ์', 'ger camp', 'แคมป์เกอร์', 'granite rocks', 'หินแกรนิต', 'ulaanbaatar day trip', 'เที่ยวนอกอูลานบาตอร์'], '#BBDEFB',
    // a wide green valley ringed by rounded granite tors and larch-covered slopes, a winding river, three white gers in a row by the water
    P('M-4 120c20-30 50-40 70-30 14-24 40-26 54-8 20-20 50-18 64 2 22-16 44-10 60 10v40H-4z', '#B0A79A') + ring(5, (k) => larch(18 + k * 50, 128, 34 + (k % 2) * 8, '#689F38')) + P('M-4 128c80-10 160-10 248 0v120H-4z', '#9CCC65')
      + P('M150 250c-20-40 30-60 10-90-8-14 20-26 40-30h10c-24 6-40 16-32 30 20 30-30 50-8 90z', '#4FC3F7', 3) + ring(3, (k) => ger(60 + k * 42, 176 + (k % 2) * 4, 0.9)) + ring(8, (k) => Lc(`M${20 + k * 26} ${214 + (k % 3) * 6}l4-10`, '#7CB342', 3))
      + P('M30 70c0-8 14-10 18-4 6-6 20-4 20 4z', '#FFFFFF', 3) + C(196, 52, 14, '#FFE082', 3)),
  D('city', 'อูลานบาตอร์ เมืองหลวงกลางหุบเขา', 'Ulaanbaatar in its mountain bowl', ['ulaanbaatar', 'อูลานบาตอร์', 'ulan bator', 'capital city', 'เมืองหลวง', 'city skyline', 'ตึกสูง', 'bogd khan mountain', 'เขาบ็อกด์ข่าน', 'blue sky tower'], '#90CAF9',
    // the capital in a bowl of green hills: the sail-shaped blue glass tower, apartment blocks, a river with willows, little houses with bright roofs on the slopes, forested Bogd Khan mountain behind
    P('M-4 110c40-40 90-50 130-30 40-30 90-20 118 10v30H-4z', '#558B2F') + ring(7, (k) => C(20 + k * 34, 104 - (k % 3) * 8, 10, '#33691E', 2.5)) + P('M-4 120c40-20 90-20 248 0v130H-4z', '#C5E1A5')
      + ring(6, (k) => g(150 + (k % 3) * 28, 128 + Math.floor(k / 3) * 14, 1, R(-8, -8, 16, 10, '#FFF8E1', 0, 2.5) + P('M-10-8l10-8 10 8z', ['#E53935', '#43A047', '#1E88E5'][k % 3], 2.5)))
      + ring(4, (k) => R(14 + k * 26, 120 - (k % 2) * 16, 22, 70 + (k % 2) * 16, ['#FFE0B2', '#FFCCBC', '#F8BBD0', '#FFF9C4'][k], 0) + ring(6, (j) => R(18 + k * 26 + (j % 2) * 9, 130 - (k % 2) * 16 + Math.floor(j / 2) * 18, 6, 8, '#64B5F6', 0, 1.5)))
      + P('M120 190V70c24 10 34 50 30 120z', '#4FC3F7') + Lc('M126 80c14 14 18 60 18 108', '#B3E5FC', 3) + P('M-4 200c80-12 160-12 248 0v50H-4z', '#81D4FA') + ring(4, (k) => P(`M${30 + k * 60} 200c-10-20 0-36 8-40 8 4 18 20 8 40z`, '#9CCC65', 2.5))),
  L('turtlerock', 'หินเต่า เมลคี ฮาด', 'Turtle Rock, Melkhii Khad', ['turtle rock', 'หินเต่า', 'melkhii khad', 'เมลคี ฮาด', 'granite boulder', 'ก้อนหินแกรนิต', 'terelj', 'เทเรลจ์', 'photo stop'], 'หาก้อนหินยักษ์ที่หน้าตาเหมือนเต่า', 'Find the giant rock that looks like a turtle',
    // a giant grey granite boulder shaped like a turtle: a high domed shell with cracks, a head rock poking out to the left, stubby rock feet, a tiny child waving at the bottom for scale
    P('M-4 204c80-12 168-12 248 0v24H-4z', '#9CCC65') + P('M64 200c-6-74 30-120 86-120s82 50 76 120z', '#B5ABA0') + Lc('M110 100l20 30-16 36 10 30M160 90l-6 40 26 30-8 38M196 120l-18 40', '#8D8378', 3)
      + P('M70 154c-24 4-46-6-50-24-4-18 12-30 30-26 18 4 26 20 28 34z', '#B5ABA0') + E(92, 204, 16, 8, '#9E9488') + E(206, 204, 16, 8, '#9E9488') + face(44, 128, 0.42) + kid(132, 206, '#E53935', 0.8)),
  L('readingrock', 'หินชายชราอ่านหนังสือ', 'The Old Man Reading a Book rock', ['reading old man rock', 'หินชายชราอ่านหนังสือ', 'old man reading rock', 'rock shapes', 'หินรูปร่างแปลก', 'granite', 'หินแกรนิต', 'terelj', 'เทเรลจ์', 'hiking', 'เดินป่า'],
    'หาก้อนหินที่เหมือนคุณตาก้มอ่านหนังสือ', 'Find the rock that looks like a grandpa bent over a book',
    // a tall granite tower of stacked rounded blocks topped by a "head", leaning over a flat slab of rock held open like a book, larches round its foot
    P('M-4 208c80-10 168-10 248 0v20H-4z', '#9CCC65') + P('M92 206c-8-50 0-90 14-116h44c12 30 14 70 6 116z', '#B5ABA0') + Lc('M100 150h52M104 118h44', '#8D8378', 3) + C(126, 74, 26, '#C2B8AD') + P('M108 54c10-10 26-10 36 0', '#9E9488', 3)
      + g(74, 136, 1, P('M-34 0l34-16 34 16-34 16z', '#E0D8CE') + Lc('M0-16v32', '#8D8378', 3), -10) + face(126, 76, 0.4, 'none') + Lc('M118 92c4 4 12 4 16 0', INK, 3) + larch(30, 206, 60) + larch(204, 206, 70) + larch(222, 206, 46)),
  L('ariyabal', 'วัดอารียาบาลบนเนินเขา', 'Aryapala temple on its hillside stairs', ['aryapala', 'อารียาบาล', 'ariyabal', 'meditation centre', 'ศูนย์ปฏิบัติธรรม', '108 steps', 'บันได 108 ขั้น', 'terelj', 'เทเรลจ์', 'hillside view'],
    'หาบันไดยาวที่ขึ้นไปถึงวัดบนเขา', 'Find the long stairway that climbs up to the temple on the hill',
    // a white temple hall with a dark red and gold roof high on a rocky forested slope, a long wooden stairway zigzagging up to it with a little bridge at the bottom
    P('M-4 212c30-60 60-120 100-150 30-20 80-20 110 10 14 14 24 40 38 60v80H-4z', '#7CB342') + ring(5, (k) => larch(14 + k * 22, 200 - k * 20, 30)) + ring(3, (k) => E(170 + k * 20, 150 + k * 20, 16, 10, '#B5ABA0', 2.5))
      + R(110, 54, 70, 34, '#FFFFFF') + P('M102 56l43-22 43 22z', '#8E2424') + P('M128 40l17-10 17 10z', '#FFC107', 2.5) + ring(4, (k) => R(118 + k * 16, 64, 8, 14, '#C62828', 1, 2)) + Lc('M145 26v-8', '#FFC107', 3)
      + Lc('M140 90l-40 30 40 30-40 30 30 24', '#A1673F', 7) + Lc('M140 90l-40 30 40 30-40 30 30 24', '#FFE0B2', 2) + P('M116 206h60', 'none', 5) + Lc('M110 214c20-8 50-8 70 0', '#A1673F', 5) + face(145, 74, 0.32)),
  L('pasqueflower', 'ดอกยาร์กูยบานรับฤดูใบไม้ผลิ', 'Pasqueflowers, the first flowers of spring', ['pasqueflower', 'ดอกพาสก์', 'yargui', 'ยาร์กูย', 'spring flowers', 'ดอกไม้ฤดูใบไม้ผลิ', 'wildflowers', 'ดอกไม้ป่า', 'steppe', 'ทุ่งหญ้า'],
    'หาดอกไม้สีม่วงขนนุ่มที่โผล่จากหิมะ', 'Find the fluffy purple flowers peeping out of the snow',
    // three fuzzy purple cup-shaped flowers with bright yellow centres on silky hairy stems, poking up through patches of last snow and dry brown grass
    P('M-4 200c60-14 120-14 248 0v30H-4z', '#D7CCC8') + ring(3, (k) => E(40 + k * 80, 206, 34, 10, '#FFFFFF', 3)) + ring(10, (k) => Lc(`M${14 + k * 24} 206l${k % 2 ? 6 : -6} -18`, '#BCAAA4', 3))
      + [[70, 120, 1], [130, 90, 1.2], [186, 128, 0.9]].map(([x, y, s]) => Lc(`M${x} ${y + 30 * s}V206`, '#9E9D24', 5) + Lc(`M${x - 6} ${y + 60 * s}l-10 -10M${x + 6} ${y + 70 * s}l10 -10`, '#C5CAE9', 2) + g(x, y, s, P('M-26-10c-4 26 8 40 26 40s30-14 26-40c-8 6-14 6-18-8-4 10-12 10-16 0-4 14-10 14-18 8z', '#9575CD') + ring(5, (k) => C(-12 + k * 6, -6, 3.5, '#FFD54F', 1.5)) + Lc('M-18 2c4 12 8 18 18 20', '#D1C4E9', 2.5))).join('') + face(130, 108, 0.45)),
  L('stove', 'เตาเหล็กกลางเกอร์', 'The iron stove in the middle of a ger', ['ger stove', 'เตาในเกอร์', 'iron stove', 'เตาเหล็ก', 'ger camp', 'แคมป์เกอร์', 'kettle', 'กาน้ำ', 'cosy night', 'คืนอบอุ่น'],
    'หาเตาเหล็กที่มีปล่องควันยาวขึ้นไปบนหลังคา', 'Find the iron stove with a long chimney going up to the roof',
    // a black iron box stove on little legs with an orange fire glowing through its door, a tall pipe rising up, a kettle steaming on top, a basket of firewood beside it
    E(110, 216, 90, 10, '#D7CCC8', 0) + R(64, 120, 92, 74, '#37474F', 8) + R(80, 140, 40, 34, '#FF7043', 6, 3) + P('M90 168c0-14 10-16 10-26 6 10 12 14 10 26z', '#FFCA28', 2) + Lc('M64 132h92', '#546E7A', 3) + [[72, 204], [148, 204]].map(([x, y]) => Lc(`M${x} 194v12`, INK, 5)).join('')
      + R(130, 20, 14, 100, '#607D8B', 2) + Lc('M130 50h14M130 80h14', '#455A64', 2) + P('M82 120c-2-16 6-26 22-26s24 10 22 26z', '#FFB300') + P('M126 104c10-4 14 2 18 8', 'none', 4) + Lc('M90 96c4-10 20-10 24 0', INK, 4) + ring(3, (k) => Lc(`M${96 + k * 10} 84c-6-8 6-12 0-22`, '#B0BEC5', 3))
      + P('M170 214l6-40h44l6 40z', '#A1673F') + ring(3, (k) => R(176 + k * 12, 160 - (k % 2) * 6, 10, 26, '#8D6E63', 3, 2)) + face(110, 108, 0.4)),
  L('paintedchest', 'หีบไม้ลายสีส้มในเกอร์', 'A painted orange chest in the ger', ['painted chest', 'หีบไม้ทาสี', 'painted furniture', 'เฟอร์นิเจอร์ลายวาด', 'ger camp', 'แคมป์เกอร์', 'folk patterns', 'ลายพื้นเมือง', 'handicraft', 'งานฝีมือ'],
    'หาหีบไม้สีส้มที่มีลายหมุนๆ สีฟ้ากับเขียว', 'Find the orange chest painted with blue and green swirls',
    // a low wooden chest on short legs painted bright orange, its front framed in blue with curling cloud swirls and a round knot pattern, a small bowl on top
    R(40, 100, 160, 100, '#FF8F00', 8) + R(52, 112, 136, 76, '#FFB74D', 6, 3) + Lc('M52 112h136v76H52z', '#1E88E5', 4) + C(120, 150, 20, '#4FC3F7', 3) + Lc('M108 150a12 12 0 0 1 24 0a6 6 0 0 1-12 0', '#1565C0', 3)
      + ring(2, (k) => Lc(k ? 'M146 136c10-10 26-4 22 8-4 8-14 4-12-2M150 170c10 6 24 2 22-10' : 'M94 136c-10-10-26-4-22 8 4 8 14 4 12-2M90 170c-10 6-24 2-22-10', '#43A047', 4)) + [[50, 200], [190, 200]].map(([x, y]) => R(x - 8, y, 16, 14, '#A1673F', 3)).join('')
      + E(120, 98, 30, 6, '#FFFFFF', 3) + P('M92 96c0-16 56-16 56 0z', '#ECEFF1') + Lc('M100 88h40', '#1E88E5', 3) + face(120, 140, 0.42)),
  L('manzushir', 'กระทะยักษ์ที่ซากวัดมันซูชีร์', 'The giant cauldron at the Manzushir ruins', ['manzushir', 'มันซูชีร์', 'monastery ruins', 'ซากวัด', 'giant cauldron', 'กระทะยักษ์', 'bogd khan mountain', 'เขาบ็อกด์ข่าน', 'forest walk', 'เดินป่า'],
    'หากระทะเหล็กใบใหญ่ยักษ์ในป่า', 'Find the huge iron cooking pot in the forest',
    // an enormous old bronze cooking cauldron on stone legs in a forest clearing, low stone wall ruins and steps behind it, larches all round, a child peeking over the rim
    ring(5, (k) => larch(16 + k * 52, 120, 70 + (k % 2) * 16, '#689F38')) + P('M-4 120h248v108H-4z', '#AED581') + R(20, 96, 70, 30, '#BCAAA4') + R(150, 92, 76, 34, '#BCAAA4') + Lc('M20 110h70M150 106h76', '#A1887F', 3) + ring(3, (k) => R(104 + k * 4, 112 - k * 8, 34 - k * 8, 8, '#D7CCC8', 0, 2.5))
      + [[70, 216], [170, 216], [120, 224]].map(([x, y]) => R(x - 8, y - 30, 16, 32, '#9E9E9E', 4)).join('') + P('M40 140h160c0 50-36 80-80 80s-80-30-80-80z', '#8D6E63') + E(120, 140, 80, 14, '#5D4037') + Lc('M54 160h132', '#795548', 3)
      + kid(120, 136, '#1E88E5', 0.8) + face(120, 176, 0.5)),
  L('gandan', 'วัดกานดาน', 'Gandan Monastery', ['gandan', 'กานดาน', 'gandantegchinlen', 'monastery', 'วัด', 'temple hall', 'วิหาร', 'old buildings', 'อาคารโบราณ', 'ulaanbaatar sights'],
    'หาอาคารสีขาวสูงที่มีหลังคาสีทองกับเขียว', 'Find the tall white building with gold and green roofs',
    // a tall white temple hall with rows of small red windows and a tiered green-and-gold roof with upturned corners, a wide stone yard in front (the building only)
    R(10, 196, 220, 20, '#E0D8CE') + R(56, 90, 128, 108, '#FFFFFF') + ring(9, (k) => R(66 + (k % 3) * 40, 104 + Math.floor(k / 3) * 30, 20, 18, '#C62828', 2, 2.5)) + R(104, 168, 32, 30, '#8E2424', 2)
      + P('M40 92c20-6 36-14 50-26h60c14 12 30 20 50 26z', '#2E7D32') + Lc('M40 92c-6-2-10-6-12-12M200 92c6-2 10-6 12-12', INK, 4) + P('M80 64c14-4 24-10 32-20h16c8 10 18 16 32 20z', '#FFC107') + R(108, 30, 24, 16, '#FFFFFF') + P('M100 32l20-14 20 14z', '#2E7D32') + C(120, 14, 5, '#FFC107', 2.5) + face(120, 140, 0.4)),
  L('winterpalace', 'ประตูแห่งสันติภาพ วังฤดูหนาวบ็อกด์ข่าน', 'The Gate of Peace at the Bogd Khan Winter Palace', ['bogd khan palace', 'วังบ็อกด์ข่าน', 'winter palace', 'วังฤดูหนาว', 'gate of peace', 'ประตูแห่งสันติภาพ', 'palace museum', 'พิพิธภัณฑ์วัง', 'carved gate', 'ประตูแกะสลัก'],
    'หาประตูไม้สีแดงที่มีหลังคาสีเขียวซ้อนกัน', 'Find the red wooden gate with green roofs stacked up',
    // a wooden gate of red pillars and painted beams under three stacked green-tiled roofs with curling corners, built without a single nail
    R(10, 206, 220, 12, '#E0D8CE') + [44, 84, 156, 196].map((x) => R(x - 6, 120, 12, 88, '#C62828')).join('') + R(36, 110, 168, 14, '#1E88E5') + ring(10, (k) => C(46 + k * 16, 117, 3, '#FFCA28', 0)) + R(90, 180, 60, 28, '#8E2424', 0, 3)
      + P('M14 112c30-8 52-20 66-36h80c14 16 36 28 66 36z', '#2E7D32') + Lc('M14 112c-6-2-8-8-8-14M226 112c6-2 8-8 8-14', INK, 4) + R(60, 66, 120, 12, '#C62828') + P('M44 70c24-6 40-16 52-28h48c12 12 28 22 52 28z', '#43A047')
      + R(96, 36, 48, 10, '#C62828') + P('M84 40c14-4 24-12 30-20h12c6 8 16 16 30 20z', '#66BB6A') + C(120, 14, 5, '#FFCA28', 2.5) + face(120, 156, 0.42)),
  L('bluesky', 'ตึกบลูสกาย', 'The Blue Sky Tower', ['blue sky tower', 'ตึกบลูสกาย', 'sail tower', 'ตึกรูปใบเรือ', 'glass tower', 'ตึกกระจก', 'city centre', 'ใจกลางเมือง', 'modern building', 'ตึกทันสมัย'],
    'หาตึกกระจกสีฟ้าที่โค้งเหมือนใบเรือ', 'Find the blue glass tower curved like a sail',
    // a tall shiny blue glass tower shaped like a curved ship's sail, its glass lines sweeping up, little white clouds reflected in it, a low square block at its foot
    R(20, 196, 200, 20, '#CFD8DC') + R(60, 170, 120, 28, '#ECEFF1') + ring(6, (k) => R(68 + k * 18, 178, 10, 12, '#90CAF9', 1, 2))
      + P('M90 172V30c50 20 80 70 70 142z', '#42A5F5') + ring(7, (k) => Lc(`M90 ${50 + k * 18}c${20 + k * 3} 6 ${40 + k * 4} ${16 + k * 2} ${60 + k * 1.5} ${30 + k * 2}`, '#90CAF9', 2.5)) + Lc('M96 40c30 20 50 50 54 120', '#E3F2FD', 4)
      + P('M106 96c0-6 10-8 12-2 4-4 12-2 12 2z', '#FFFFFF', 2) + face(120, 140, 0.45)),
  L('opera', 'โรงละครโอเปราและบัลเลต์อูลานบาตอร์', 'The pink Opera and Ballet Theatre', ['opera and ballet theatre', 'โรงละครโอเปราและบัลเลต์', 'ballet', 'บัลเลต์', 'opera house', 'โรงอุปรากร', 'pink building', 'ตึกสีชมพู', 'evening show', 'การแสดงตอนค่ำ'],
    'หาตึกสีชมพูที่มีเสาสีขาวเรียงกัน', 'Find the pink building with a row of white columns',
    // a salmon-pink theatre with a wide front of tall white columns, a triangle roof on top with a round window, steps up to the doors, a little ballet shoe ribbon on the steps
    R(10, 204, 220, 14, '#E0D8CE') + ring(3, (k) => R(40 - k * 8, 188 + k * 6, 160 + k * 16, 6, '#ECEFF1', 0, 2.5)) + R(30, 84, 180, 104, '#F4A79A') + P('M24 86l96-46 96 46z', '#F8BBB0') + C(120, 68, 10, '#B3E5FC', 3)
      + ring(6, (k) => R(52 + k * 26, 96, 12, 92, '#FFFFFF', 2, 3) + R(48 + k * 26, 92, 20, 6, '#FFFFFF', 1, 2.5)) + R(30, 84, 180, 10, '#FFFFFF', 0, 3) + Lc('M150 206c10-6 22-6 26 0', '#F06292', 3) + face(120, 124, 0.38)),
  L('gerdistrict', 'บ้านหลังคาสีสดบนเนินเขา', 'Bright roofs of the hillside neighbourhoods', ['ger district', 'ย่านเกอร์', 'hillside houses', 'บ้านบนเนินเขา', 'colourful roofs', 'หลังคาหลากสี', 'wooden fences', 'รั้วไม้', 'city view', 'วิวเมือง'],
    'หาบ้านหลังคาสีแดง เขียว ฟ้า เรียงกันบนเนิน', 'Find the houses with red, green and blue roofs up the hill',
    // a green hillside covered in little square houses with bright red, green and blue tin roofs, each in a yard with a wooden fence, steps winding up between them
    P('M-4 210c40-70 100-130 160-150 30-8 60 0 88 10v150H-4z', '#C5E1A5') + Lc('M40 210c30-30 50-60 90-80s50-40 70-60', '#E0D8CE', 6)
      + [[30, 190], [70, 176], [104, 196], [86, 140], [126, 150], [150, 112], [112, 110], [184, 94], [176, 140], [210, 120]].map(([x, y], k) => R(x - 18, y - 6, 36, 22, '#E0C9A6', 0, 2) + Lc(`M${x - 18} ${y + 16}h36`, '#8D6E63', 3) + R(x - 9, y - 10, 18, 14, '#FFF8E1', 0, 2.5) + P(`M${x - 12} ${y - 10}l12-10 12 10z`, ['#E53935', '#43A047', '#1E88E5', '#FFB300'][k % 4], 2.5) + R(x - 3, y - 6, 6, 6, '#64B5F6', 0, 1.5)).join('') + face(126, 146, 0.25)),
  L('station', 'สถานีรถไฟอูลานบาตอร์', 'Ulaanbaatar railway station', ['railway station', 'สถานีรถไฟ', 'train station', 'สถานีรถไฟ', 'sleeper train', 'รถไฟนอน', 'platform', 'ชานชาลา', 'trans-mongolian', 'ทรานส์มองโกเลีย'],
    'หาตึกสถานีสีเหลืองอ่อนที่มีนาฬิกาตรงกลาง', 'Find the pale yellow station with a clock in the middle',
    // a long pale-yellow station building with white trim and tall arched windows, a raised middle part with a round clock and a little spire, a green train carriage at the platform
    R(10, 186, 220, 30, '#B0BEC5') + Lc('M10 200h220', '#78909C', 3) + R(20, 100, 200, 80, '#FFF59D') + R(20, 96, 200, 8, '#FFFFFF', 0, 3) + R(84, 60, 72, 120, '#FFF176') + P('M80 62l40-24 40 24z', '#4DB6AC') + Lc('M120 38v-14', INK, 3) + C(120, 22, 4, '#FFCA28', 2)
      + C(120, 82, 12, '#FFFFFF', 3) + Lc('M120 82v-7M120 82l5 3', INK, 2.5) + [30, 56, 164, 190].map((x) => P(`M${x} 170v-40c0-12 16-12 16 0v40z`, '#90CAF9', 2.5)).join('') + P('M108 180v-40c0-16 24-16 24 0v40z', '#8D6E63')
      + R(150, 196, 80, 30, '#2E7D32', 4) + ring(3, (k) => R(160 + k * 22, 202, 14, 10, '#B3E5FC', 1, 2)) + face(120, 116, 0.32)),
  L('chipmunk', 'ชิปมังก์ไซบีเรียบนก้อนหิน', 'A Siberian chipmunk on the rocks', ['siberian chipmunk', 'ชิปมังก์ไซบีเรีย', 'chipmunk', 'ชิปมังก์', 'pine nuts', 'เมล็ดสน', 'forest animal', 'สัตว์ป่า', 'terelj', 'เทเรลจ์'],
    'หาชิปมังก์ลายทางที่ถือเมล็ดสน', 'Find the stripy chipmunk holding a pine nut',
    // a little striped chipmunk sitting up on a granite rock, cheeks stuffed, holding a pine nut, its fluffy tail curled up behind, a pine cone at its feet
    P('M20 222c10-40 40-56 100-56s90 16 100 56z', '#B5ABA0') + Lc('M60 200c30-10 70-10 110 0', '#9E9488', 3) + Lc('M150 170c50-6 64-60 40-100', '#C68B59', 14) + Lc('M150 170c50-6 64-60 40-100', '#5D4037', 3)
      + E(120, 138, 34, 40, '#D9A066') + E(120, 140, 22, 28, '#FFE0B2', 0) + Lc('M94 112c-4 16-4 36 2 52M146 112c4 16 4 36-2 52', '#5D4037', 4) + C(98, 66, 10, '#C68B59') + C(142, 66, 10, '#C68B59') + E(120, 86, 32, 28, '#D9A066') + E(102, 96, 12, 10, '#FFE0B2', 0) + E(138, 96, 12, 10, '#FFE0B2', 0)
      + Lc('M104 78l-10-4M136 78l10-4', '#5D4037', 3) + E(120, 156, 10, 8, '#8D6E63', 2.5) + Lc('M114 152l12 0', '#5D4037', 2) + C(109, 152, 6, '#E8B47A') + C(131, 152, 6, '#E8B47A') + E(84, 172, 16, 10, '#8D6E63') + Lc('M72 170h24M76 164h16', '#5D4037', 2) + face(120, 84, 0.5, 'none')),
  L('cashmere', 'เสื้อแคชเมียร์นุ่มๆ', 'Soft cashmere jumpers', ['cashmere', 'แคชเมียร์', 'cashmere jumper', 'เสื้อไหมพรม', 'wool shop', 'ร้านขนสัตว์', 'souvenir', 'ของฝาก', 'warm clothes', 'เสื้อกันหนาว'],
    'หากองเสื้อไหมพรมสีพาสเทลที่พับไว้', 'Find the pile of folded pastel jumpers',
    // a tall stack of softly folded jumpers in pastel pink, cream, sky blue and mint, a fluffy ball of raw wool and a knitted scarf trailing down
    ring(5, (k) => R(50 + (k % 2) * 6, 192 - k * 30, 120, 28, ['#F8BBD0', '#FFF8E1', '#B3E5FC', '#C8E6C9', '#E1BEE7'][k], 12) + Lc(`M${60 + (k % 2) * 6} ${206 - k * 30}h100`, '#FFFFFF', 2) + ring(4, (j) => Lc(`M${80 + j * 20 + (k % 2) * 6} ${198 - k * 30}v10`, '#FFFFFF', 1.5)))
      + Lc('M170 70c12 30 10 70 0 100s10 40 26 44', '#FF8A65', 14) + Lc('M170 70c12 30 10 70 0 100s10 40 26 44', INK, 2) + ring(4, (k) => Lc(`M${186 + k * 4} 212l2 12`, '#FF8A65', 3))
      + C(44, 206, 24, '#FAF3E8') + Lc('M28 200c10-8 22-8 30 4M32 214c10-6 20-6 28 0', '#E0D3B8', 2.5) + face(110, 108, 0.4)),
  L('scramble', 'ปีนป่ายก้อนหินแกรนิตเทเรลจ์', 'Scrambling up the granite boulders', ['rock scrambling', 'ปีนก้อนหิน', 'granite boulders', 'ก้อนหินแกรนิต', 'climbing', 'ปีนป่าย', 'terelj', 'เทเรลจ์', 'family hike', 'เดินป่ากับครอบครัว'],
    'หาเด็กๆ ที่ปีนขึ้นไปยืนบนก้อนหินกลม', 'Find the children who climbed up on the round rocks',
    // a heap of big smooth round grey boulders stacked like dumplings, one child standing on top with arms up, another climbing up the side, a grown-up hand-hold rope-free path of dents
    P('M-4 212c80-10 168-10 248 0v20H-4z', '#9CCC65') + E(70, 180, 56, 36, '#B5ABA0') + E(170, 182, 52, 34, '#C2B8AD') + E(120, 124, 52, 40, '#B5ABA0') + E(132, 72, 30, 22, '#C2B8AD')
      + Lc('M100 110c10-4 20-4 30 2M60 170c14-6 26-4 34 2M156 170c10-4 22-4 30 2', '#9E9488', 3) + g(132, 50, 1, Lc('M-10-14l-6-12M10-14l6-12', INK, 3) + kid(0, 0, '#FFB300')) + g(84, 132, 1, kid(0, 0, '#E53935'), -24) + Lc('M90 124l12-18', INK, 3) + face(70, 182, 0.35, 'none')),
  L('tuul', 'โยนหินเลียงน้ำที่แม่น้ำโทล', 'Skipping stones on the Tuul River', ['tuul river', 'แม่น้ำโทล', 'skipping stones', 'โยนหินเลียงน้ำ', 'riverside picnic', 'ปิกนิกริมน้ำ', 'willows', 'ต้นหลิว', 'pebbles', 'ก้อนกรวด'],
    'หาก้อนหินที่กระโดดบนผิวน้ำเป็นวงๆ', 'Find the stone bouncing across the water in rings',
    // a wide shallow river with pebbly banks and willow trees, a child throwing a flat stone that skips across leaving three rings of ripples
    P('M-4 120c80-10 168-10 248 0v60c-80 10-168 10-248 0z', '#4FC3F7') + P('M-4 180c80 10 168 10 248 0v40H-4z', '#D7CCC8') + ring(9, (k) => E(16 + k * 26, 200 + (k % 2) * 8, 8, 5, ['#BCAAA4', '#A1887F', '#ECEFF1'][k % 3], 2))
      + ring(3, (k) => E(110 + k * 36, 150 - k * 6, 12 + k * 2, 4 + k, 'none', 3).replace('fill="none"', 'fill="none" stroke="#E1F5FE"')) + E(218, 132, 7, 3, '#90A4AE', 2) + Lc('M70 150c20-30 60-40 140-20', '#FFFFFF', 2).replace('stroke-width="2"', 'stroke-width="2" stroke-dasharray="4 6"')
      + ring(2, (k) => Lc(`M${20 + k * 190} 120v-50`, '#6D4C41', 5) + ring(5, (j) => Lc(`M${20 + k * 190} ${70 + j * 6}c${-14 + j * 7} 10 ${-16 + j * 8} 30 ${-12 + j * 6} 44`, '#9CCC65', 3)))
      + g(60, 200, 1.1, Lc('M10-14l14-16', INK, 3) + kid(0, 0, '#1E88E5'))),
];

export default {
  places: {
    'mn-ulaanbaatar': { country: 'mn', wave: 3, name: nm('อูลานบาตอร์และเทเรลจ์', 'Ulaanbaatar and Terelj'), tz: 'Asia/Ulaanbaatar', ll: [47.92, 106.92], alias: ['ulaanbaatar', 'อูลานบาตอร์', 'ulan bator', 'ulaan baatar', 'อูลานบาตาร์', 'terelj', 'เทเรลจ์', 'gorkhi-terelj', 'กอร์คี-เทเรลจ์', 'UBN', 'ULN'], colors: UB },
  },
  items,
};
