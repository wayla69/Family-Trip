// Wave 13, Thailand (north): Sukhothai and Si Satchanalai — the city stamp, two day scenes and the old capital's own ruins
// (drawn as buildings only: never a Buddha image or any figure), its writing, its pottery, cloth, gold and noodles
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SK = { k1: '#9C5B2E', k2: '#3E8E7E', k3: '#FFF3E6' };
const CITY = 'th-sukhothai', DIR = 'th/sukhothai';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// the Sukhothai lotus-bud chedi: three laterite steps, a tall square body, then the closed lotus bud and its spire (x = centre, b = base, s = size)
const bud = (x, b, s, sw) => R(x - 30 * s, b - 12 * s, 60 * s, 12 * s, '#C98B5A', 0, sw) + R(x - 24 * s, b - 22 * s, 48 * s, 10 * s, '#D8A070', 0, sw) + R(x - 18 * s, b - 30 * s, 36 * s, 8 * s, '#C98B5A', 0, sw)
  + R(x - 14 * s, b - 64 * s, 28 * s, 34 * s, '#E0D6C8', 0, sw) + Lc(`M${x - 7 * s} ${b - 30 * s}v-${30 * s}M${x + 7 * s} ${b - 30 * s}v-${30 * s}`, '#BCAAA4', 2)
  + P(`M${x - 16 * s} ${b - 64 * s}c0-${14 * s} ${4 * s}-${26 * s} ${16 * s}-${34 * s}c${12 * s} ${8 * s} ${16 * s} ${20 * s} ${16 * s} ${34 * s}z`, '#EFE6D8', sw)
  + P(`M${x - 5 * s} ${b - 96 * s}l${5 * s}-${28 * s} ${5 * s} ${28 * s}z`, '#D7CCC8', sw) + Lc(`M${x - 7 * s} ${b - 104 * s}h${14 * s}M${x - 5 * s} ${b - 112 * s}h${10 * s}`, '#A1887F', 2);
// a laterite column, rough-edged (x = centre, b = base, h = height)
const col = (x, b, h, w = 10) => R(x - w / 2, b - h, w, h, '#B5714A', 2) + Lc(`M${x - w / 2} ${b - h * 0.4}h${w}M${x - w / 2} ${b - h * 0.75}h${w}`, '#8D4E2C', 2);
const tree = (x, b, s) => Lc(`M${x} ${b}v-${30 * s}`, '#6D4C41', 5) + C(x, b - 40 * s, 18 * s, '#43A047') + C(x - 14 * s, b - 30 * s, 12 * s, '#66BB6A') + C(x + 14 * s, b - 30 * s, 12 * s, '#66BB6A');

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับสุโขทัย', 'Sukhothai stamp'), kw: ['sukhothai', 'สุโขทัย', 'sukhothai historical park', 'อุทยานประวัติศาสตร์สุโขทัย', 'lotus bud chedi', 'เจดีย์ทรงดอกบัวตูม', 'old capital', 'ราชธานีเก่า'],
    // the lotus-bud chedi of Wat Mahathat between two laterite columns, the moat's ripples below
    svg: cityStamp('skt-st', { name: 'SUKHOTHAI', sub: 'SI SATCHANALAI · THAILAND', ...SK, emblem: bud(100, 134, 0.8, 2.5) + col(64, 134, 34, 8) + col(136, 134, 34, 8) + Lc('M58 142c14-4 28 4 42 0s28-4 42 0', '#4FC3F7', 3) }) },

  D('historicalpark', 'อุทยานประวัติศาสตร์สุโขทัยยามเย็น', 'Sukhothai Historical Park at sunset', ['sukhothai historical park', 'อุทยานประวัติศาสตร์สุโขทัย', 'old city', 'เมืองเก่าสุโขทัย', 'ancient ruins', 'โบราณสถาน', 'moat pond', 'สระน้ำ', 'sunset', 'พระอาทิตย์ตก'],
    // the lotus-bud chedi rising over rows of laterite columns and brick bases, big rain trees on each side, an orange sunset, a still moat pond with lily pads in front
    scene('skt-d1', '#FFCC80', P('M-4 60h248v30H-4z', '#FFE0B2', 0) + C(178, 92, 22, '#FFD54F') + P('M-4 132c60-10 120-10 248 0v20H-4z', '#C5A880')
      + tree(30, 140, 1.3) + tree(212, 140, 1.2) + bud(120, 142, 1.05) + [64, 82, 158, 176].map((x) => col(x, 144, 30)).join('')
      + R(-4, 142, 248, 16, '#D8A070') + P('M-4 158h248v90H-4z', '#4FC3F7') + [[50, 184], [86, 200], [168, 190], [200, 206]].map(([x, y]) => E(x, y, 12, 5, '#66BB6A', 2.5)).join('')
      + Lc('M100 176h40M120 214h40', '#B3E5FC', 3) + face(178, 90, 0.3))),

  D('sisatchanalai', 'ศรีสัชนาลัยริมแม่น้ำยม', 'Si Satchanalai\'s ruins by the Yom River', ['si satchanalai', 'ศรีสัชนาลัย', 'si satchanalai historical park', 'อุทยานประวัติศาสตร์ศรีสัชนาลัย', 'yom river', 'แม่น้ำยม', 'ruins in the forest', 'โบราณสถานกลางป่า', 'quiet old town', 'เมืองเก่าเงียบสงบ'],
    // a green hill with a round bell chedi on top, brick ruins and laterite walls half-hidden among tall trees, the brown Yom River curling past in front, a soft blue sky
    scene('skt-d2', '#E1F5FE', P('M40 120c20-40 50-54 80-54s60 14 80 54z', '#81C784') + P('M104 72c0-14 7-22 16-26 9 4 16 12 16 26z', '#EFE6D8') + R(102, 72, 36, 8, '#C98B5A') + Lc('M120 46v-12', '#A1887F', 3)
      + P('M-4 118c60-8 180-8 248 0v40H-4z', '#A5D6A7') + tree(30, 150, 1.2) + tree(206, 150, 1.3) + tree(150, 148, 0.9)
      + R(64, 126, 46, 24, '#B5714A') + Lc('M64 136h46', '#8D4E2C', 2) + col(122, 150, 28) + col(136, 150, 22) + R(160, 132, 26, 18, '#C98B5A')
      + P('M-4 162c70-14 140 6 248-6v90H-4z', '#B98A55') + Lc('M30 186c40-6 80 4 120-2s50-4 80 0', '#D7B98A', 3) + face(120, 66, 0.28))),

  L('mahathat', 'เจดีย์ดอกบัวตูมวัดมหาธาตุ', 'The lotus-bud chedi of Wat Mahathat', ['wat mahathat sukhothai', 'วัดมหาธาตุ สุโขทัย', 'lotus bud chedi', 'เจดีย์ทรงพุ่มข้าวบิณฑ์', 'laterite columns', 'เสาศิลาแลง', 'ancient temple', 'วัดโบราณ', 'historical park', 'อุทยานประวัติศาสตร์'], nm('หายอดเจดีย์ที่เหมือนดอกบัวยังไม่บาน', 'Find the top shaped like a lotus that has not opened yet'),
    // the tall lotus-bud chedi on its stepped laterite base, rows of rough laterite columns standing in front where a great hall once stood, grass and a little lotus pond (building only)
    P('M10 214c40-16 180-16 220 0z', '#9CCC65') + bud(120, 184, 1.7) + [30, 54, 186, 210].map((x, k) => col(x, 196, k % 3 ? 54 : 66, 14)).join('')
    + R(70, 184, 100, 12, '#D8A070') + E(60, 212, 24, 6, '#4FC3F7', 2.5) + E(52, 210, 6, 3, '#66BB6A', 2) + face(120, 106, 0.4)),

  L('sichum', 'มณฑปวัดศรีชุมกับประตูช่องแคบ', 'The great square walls of Wat Si Chum', ['wat si chum', 'วัดศรีชุม', 'mondop', 'มณฑป', 'tall narrow doorway', 'ช่องประตูแคบสูง', 'secret stairway', 'ทางเดินลับในกำแพง', 'brick walls', 'กำแพงอิฐ'], nm('หาช่องประตูที่สูงและแคบมาก', 'Find the very tall, very narrow doorway'),
    // a huge roofless square building of thick old brick walls, one very tall and very narrow dark doorway in the middle, a tree's branches leaning over the top, a little stairway slit drawn inside the wall (building only)
    P('M10 214c40-14 180-14 220 0z', '#9CCC65') + R(46, 64, 148, 140, '#C98B5A') + R(46, 64, 148, 14, '#B5714A')
    + Array.from({ length: 8 }, (_, k) => Lc(`M46 ${92 + k * 14}h148`, '#B5714A', 2)).join('') + P('M110 204V100c0-10 20-10 20 0v104z', '#3E2723')
    + Lc('M62 190l16-20M62 170l16-20M62 150l16-20', '#EFE6D8', 2.5) + tree(200, 90, 1.2) + R(30, 200, 180, 10, '#D8A070') + face(84, 116, 0.36)),

  L('sasi', 'เจดีย์วัดสระศรีกลางสระน้ำ', 'Wat Sa Si\'s bell chedi on its island', ['wat sa si', 'วัดสระศรี', 'island temple', 'วัดกลางน้ำ', 'bell-shaped chedi', 'เจดีย์ทรงระฆัง', 'pond reflection', 'เงาในสระ', 'wooden footbridge', 'สะพานไม้'], nm('หาสะพานไม้ที่ทอดไปยังเกาะ', 'Find the wooden bridge leading to the island'),
    // a round white bell-shaped chedi with a slim spire on a small green island in a blue pond, its reflection below, a low wooden footbridge reaching it from the left
    R(14, 140, 212, 74, '#4FC3F7', 30) + E(140, 142, 60, 14, '#81C784') + R(110, 120, 60, 16, '#E0D6C8') + P('M116 120c0-30 10-46 24-50 14 4 24 20 24 50z', '#FFFFFF')
    + R(132, 60, 16, 10, '#E0D6C8') + P('M134 60l6-34 6 34z', '#E0D6C8') + Lc('M134 46h12M136 38h8', '#BCAAA4', 2)
    + P('M120 166c4 20 12 30 20 34 8-4 16-14 20-34z', '#B3E5FC', 0) + R(22, 146, 76, 8, '#A1887F') + Lc('M34 154v14M58 154v14M84 154v14', '#6D4C41', 4) + Lc('M30 196h40M170 192h40', '#B3E5FC', 3)
    + face(140, 102, 0.34)),

  L('sisawai', 'ปรางค์สามองค์วัดศรีสวาย', 'The three corn-cob towers of Wat Si Sawai', ['wat si sawai', 'วัดศรีสวาย', 'three prangs', 'ปรางค์สามองค์', 'khmer style towers', 'ปรางค์แบบขอม', 'stucco', 'ลายปูนปั้น', 'moat', 'คูน้ำ'], nm('หายอดที่สูงที่สุดตรงกลาง', 'Find the tallest tower in the middle'),
    // three rounded, corn-cob-shaped stone towers in a row on a laterite platform, the middle one tallest, each banded with rings of stucco, a narrow moat in front (buildings only)
    R(20, 176, 200, 20, '#B5714A') + Lc('M20 186h200', '#8D4E2C', 2) + R(10, 196, 220, 14, '#4FC3F7', 4)
    + [[60, 0.8], [180, 0.8], [120, 1.05]].map(([x, s]) => R(x - 22 * s, 176 - 40 * s, 44 * s, 40 * s, '#D7CCC8') + P(`M${x - 22 * s} ${176 - 40 * s}c0-50 ${10 * s}-80 ${22 * s}-96c${12 * s} ${16 * s} ${22 * s} ${46 * s} ${22 * s} ${96 * s}z`, '#E0D6C8')
      + [0.3, 0.55, 0.78].map((f) => Lc(`M${x - 22 * s * (1 - f * 0.7)} ${176 - 40 * s - 96 * s * f}h${44 * s * (1 - f * 0.7)}`, '#A1887F', 2.5)).join('') + P(`M${x - 6 * s} ${176 - 40 * s}v-${18 * s}h${12 * s}v${18 * s}z`, '#5D4037', 2.5)).join('')
    + face(120, 110, 0.34)),

  L('saphanhin', 'ทางเดินแผ่นหินชนวนขึ้นวัดสะพานหิน', 'The slate path up the hill of Wat Saphan Hin', ['wat saphan hin', 'วัดสะพานหิน', 'slate path', 'ทางเดินหินชนวน', 'hill walk', 'เดินขึ้นเขา', 'stone slabs', 'แผ่นหิน', 'view over sukhothai', 'มองเห็นเมืองเก่า'], nm('หาแผ่นหินที่เรียงเป็นทางขึ้นเขา', 'Find the flat stones that make a path up the hill'),
    // a forested green hill with a zigzag path of flat grey slate slabs climbing to a small brick ruin with two columns at the top, little trees along the way (no figures)
    R(14, 26, 212, 188, '#E1F5FE', 34) + P('M14 214c30-90 70-150 106-160s80 70 106 160z', '#81C784')
    + R(98, 52, 44, 16, '#C98B5A') + col(108, 52, 18, 8) + col(132, 52, 18, 8)
    + [[118, 76], [110, 92], [124, 108], [112, 124], [100, 140], [116, 156], [130, 172], [118, 190], [104, 206]].map(([x, y]) => P(`M${x - 14} ${y}l4-8h22l4 8z`, '#90A4AE', 3)).join('')
    + [[60, 160], [176, 150], [80, 196], [184, 196]].map(([x, y]) => tree(x, y, 0.7)).join('') + face(120, 60, 0.26)),

  L('inscription', 'ศิลาจารึกหลักที่หนึ่ง', 'The old stone pillar with the first Thai writing', ['ramkhamhaeng inscription', 'ศิลาจารึกพ่อขุนรามคำแหง', 'stone inscription', 'ศิลาจารึก', 'thai alphabet', 'ลายสือไทย', 'first thai letters', 'อักษรไทยยุคแรก', 'ramkhamhaeng museum', 'พิพิธภัณฑ์รามคำแหง'], nm('หาตัวอักษรเล็กๆ ที่สลักไว้บนหิน', 'Find the tiny letters carved into the stone'),
    // a grey four-sided stone pillar with a rounded pointed top on a low red stand, every face covered in rows of little carved squiggles like old letters, a soft glow round it
    C(120, 110, 90, '#FFF3E0', 0) + R(76, 194, 88, 18, '#C62828') + R(70, 190, 100, 8, '#E53935')
    + P('M86 190V70c0-20 16-38 34-46 18 8 34 26 34 46v120z', '#90A4AE') + P('M120 24v166', 'none') + P('M120 24c18 8 34 26 34 46v120h-34z', '#B0BEC5', 0) + Lc('M120 30v160', INK, 3)
    + Array.from({ length: 9 }, (_, k) => Lc(`M92 ${84 + k * 12}c4-4 6 4 10 0s6 4 10 0M126 ${84 + k * 12}c4-4 6 4 10 0s6 4 10 0q4-6 8 0`, '#546E7A', 2)).join('')
    + face(120, 60, 0.32)),

  L('bell', 'ระฆังหน้าประตูวังสมัยพ่อขุน', 'The bell at the palace gate anyone could ring', ['petition bell', 'ระฆังหน้าประตูวัง', 'ring the bell', 'สั่นกระดิ่ง', 'sukhothai story', 'เรื่องเล่าสุโขทัย', 'old palace gate', 'ประตูวังโบราณ', 'stone inscription story', 'เรื่องจากศิลาจารึก'], nm('หาไม้ตีระฆังที่ห้อยอยู่', 'Find the little wooden striker hanging beside it'),
    // a big round bronze bell hanging from a sturdy wooden frame with a little tiled roof, a wooden striker on a cord beside it, a brick gateway and a step behind
    R(30, 80, 180, 120, '#C98B5A') + Lc('M30 110h180M30 140h180M30 170h180', '#B5714A', 2) + P('M90 200v-70c0-20 60-20 60 0v70z', '#5D4037')
    + Lc('M60 210V60M180 210V60', '#8D6E63', 9) + Lc('M50 64h140', '#8D6E63', 9) + P('M40 64l20-24h120l20 24z', '#C62828')
    + Lc('M120 64v16', INK, 3) + P('M92 140c0-34 12-56 28-56s28 22 28 56c-14 6-42 6-56 0z', '#E0A040') + Lc('M96 128h48', '#B7791F', 3) + C(120, 146, 6, '#B7791F')
    + Lc('M160 64v50', INK, 2) + R(154, 114, 12, 30, '#A1887F', 4) + R(40, 206, 160, 8, '#E0D6C8') + face(120, 112, 0.36)),

  L('fishrice', 'ในน้ำมีปลา ในนามีข้าว', 'Fish in the water, rice in the fields', ['in the water there is fish', 'ในน้ำมีปลา', 'in the fields there is rice', 'ในนามีข้าว', 'sukhothai saying', 'คำจารึกสุโขทัย', 'rice field', 'ทุ่งนา', 'fish pond', 'บ่อปลา'], nm('หาปลาที่แอบอยู่ใต้ต้นข้าว', 'Find the fish hiding under the rice plants'),
    // a cut-away picture: golden-green rice plants growing in a flooded paddy, their stems going down into clear blue water where three plump fish swim, a mango tree and a bright sun above
    R(14, 26, 212, 190, '#E1F5FE', 34) + C(184, 60, 18, '#FFD54F') + tree(54, 108, 1) + E(46, 72, 4, 6, '#FFA726', 2) + E(64, 80, 4, 6, '#FFA726', 2)
    + R(14, 104, 212, 14, '#8D6E63', 0) + R(14, 118, 212, 98, '#4FC3F7', 0)
    + Array.from({ length: 8 }, (_, k) => Lc(`M${40 + k * 22} 150V88`, '#7CB342', 3) + P(`M${40 + k * 22} 90c-6-10-2-20 4-24 2 8 2 16-4 24z`, '#FFD54F', 2)).join('')
    + [[70, 172, 1], [150, 160, -1], [180, 196, 1]].map(([x, y, d]) => g(x, y, 1, E(0, 0, 18, 10, '#FF8A65') + P(`M${-d * 16} 0l${-d * 12}-10v20z`, '#FF7043') + C(d * 9, -2, 2.5, INK, 0))).join('')
    + face(184, 58, 0.3)),

  L('chetthaeo', 'เจดีย์เจ็ดแถว ศรีสัชนาลัย', 'The seven rows of little chedis at Si Satchanalai', ['wat chedi chet thaeo', 'วัดเจดีย์เจ็ดแถว', 'many small chedis', 'เจดีย์เล็กหลายองค์', 'si satchanalai', 'ศรีสัชนาลัย', 'different shapes', 'รูปทรงต่างกัน', 'ancient city', 'เมืองโบราณ'], nm('หาเจดีย์ที่หน้าตาไม่เหมือนองค์อื่น', 'Find the chedi that looks different from the rest'),
    // rows of little old chedis of many shapes — bells, lotus buds, square towers with tiny roofs — standing behind one another on brick bases, one bigger lotus-bud chedi in the middle (buildings only)
    P('M10 214c40-14 180-14 220 0z', '#9CCC65') + [[34, 120], [80, 112], [160, 112], [206, 120]].map(([x, b]) => R(x - 12, b - 22, 24, 22, '#C98B5A') + P(`M${x - 12} ${b - 22}c0-14 6-22 12-26 6 4 12 12 12 26z`, '#E0D6C8') + Lc(`M${x} ${b - 48}v-10`, '#A1887F', 3)).join('')
    + bud(120, 150, 1) + [[30, 186, 0], [70, 180, 1], [170, 180, 0], [210, 186, 1]].map(([x, b, sq]) => R(x - 16, b - 14, 32, 14, '#D8A070')
      + (sq ? R(x - 10, b - 40, 20, 26, '#E0D6C8') + P(`M${x - 14} ${b - 40}l14-14 14 14z`, '#B5714A') : P(`M${x - 12} ${b - 14}c0-22 6-32 12-36 6 4 12 14 12 36z`, '#FFFFFF') + Lc(`M${x} ${b - 50}v-12`, '#A1887F', 3))).join('')
    + face(120, 72, 0.3)),

  L('nangphaya', 'ลายปูนปั้นวัดนางพญา', 'The lace-like stucco wall of Wat Nang Phaya', ['wat nang phaya', 'วัดนางพญา', 'stucco decoration', 'ลายปูนปั้น', 'lace pattern', 'ลายลูกไม้', 'laterite wall', 'กำแพงศิลาแลง', 'si satchanalai', 'ศรีสัชนาลัย'], nm('หาลายดอกไม้ที่ฉลุเหมือนลูกไม้', 'Find the flower pattern that looks like lace'),
    // a section of old laterite wall with tall slit windows, its face covered in creamy stucco carved into lacy flowers, swirls and little diamonds (building only)
    R(20, 40, 200, 170, '#B5714A', 6) + R(36, 56, 168, 120, '#EFE0C8', 4)
    + [[64, 86], [120, 86], [176, 86], [92, 132], [148, 132]].map(([x, y]) => C(x, y, 18, '#F5E9D6', 3) + [0, 1, 2, 3, 4, 5].map((k) => g(x, y, 1, E(0, -9, 4, 8, '#E0C9A6', 2), k * 60)).join('') + C(x, y, 4, '#C98B5A', 2)).join('')
    + [[92, 86], [148, 86], [64, 132], [176, 132], [120, 132]].map(([x, y]) => P(`M${x} ${y - 10}l8 10-8 10-8-10z`, '#E0C9A6', 2.5)).join('')
    + Lc('M40 112c20-8 30 8 50 0s30 8 50 0 30 8 50 0', '#C98B5A', 2.5) + [44, 196].map((x) => R(x - 6, 180, 12, 26, '#3E2723', 2)).join('') + face(120, 160, 0.3)),

  L('phanomphloeng', 'บันไดศิลาแลงขึ้นวัดเขาพนมเพลิง', 'The laterite stairway to the hilltop chedi of Khao Phanom Phloeng', ['wat khao phanom phloeng', 'วัดเขาพนมเพลิง', 'laterite stairs', 'บันไดศิลาแลง', 'hilltop chedi', 'เจดีย์บนยอดเขา', 'si satchanalai', 'ศรีสัชนาลัย', 'climb', 'เดินขึ้นบันได'], nm('หาบันไดที่ขึ้นไปถึงยอดเขา', 'Find the steps all the way up to the top'),
    // a steep wooded hill with a long, straight laterite stairway climbing to a round bell chedi on the summit, trees on both sides
    R(14, 26, 212, 188, '#FFF8E1', 34) + P('M14 214c20-70 60-140 106-150s86 80 106 150z', '#66BB6A') + P('M104 66c0-22 8-34 16-38 8 4 16 16 16 38z', '#E0D6C8') + R(98, 66, 44, 10, '#C98B5A') + Lc('M120 28v-12', '#A1887F', 3)
    + P('M104 214l10-138h12l10 138z', '#B5714A') + Array.from({ length: 12 }, (_, k) => Lc(`M${105 + k * 0.8} ${200 - k * 11}h${30 - k * 1.6}`, '#8D4E2C', 2)).join('')
    + [[60, 170], [84, 120], [160, 124], [186, 176], [40, 206], [200, 208]].map(([x, y]) => tree(x, y, 0.6)).join('') + face(120, 50, 0.24)),

  L('celadon', 'จานสังคโลกเคลือบเขียวลายปลา', 'A sea-green Sangkhalok celadon plate with a fish', ['sangkhalok', 'สังคโลก', 'celadon', 'เครื่องเคลือบสีเขียว', 'fish plate', 'จานลายปลา', 'sukhothai pottery', 'เครื่องปั้นสุโขทัย', 'ancient ceramics', 'เซรามิกโบราณ'], nm('หาปลาที่วาดอยู่กลางจาน', 'Find the fish drawn in the middle of the plate'),
    // a big round sea-green glazed plate with a fluted rim, a dark-brown painted fish swimming among water weeds in its middle, a small round green covered jar beside it
    C(110, 120, 92, '#A5D6C3') + C(110, 120, 70, '#C8E6D9', 3) + Array.from({ length: 16 }, (_, k) => g(110, 120, 1, Lc('M0 -74v-14', '#7FB8A2', 2.5), k * 22.5)).join('')
    + g(110, 118, 1, E(0, 0, 34, 16, '#5D4037') + P('M30 0l18-14v28z', '#5D4037') + C(-20, -3, 4, '#C8E6D9', 0) + Lc('M-6 -12c6 8 6 16 0 24M8 -12c6 8 6 16 0 24', '#C8E6D9', 2))
    + Lc('M70 160c6-12-6-20 0-30M150 160c6-12-6-20 0-30', '#6D8F80', 3)
    + E(196, 196, 26, 22, '#A5D6C3') + P('M176 180c4-12 36-12 40 0z', '#8CC7AF') + C(196, 168, 5, '#8CC7AF') + face(196, 196, 0.3)),

  L('noodles', 'ก๋วยเตี๋ยวสุโขทัย', 'Sukhothai noodles with long beans and peanuts', ['kuay tiew sukhothai', 'ก๋วยเตี๋ยวสุโขทัย', 'sukhothai noodles', 'ก๋วยเตี๋ยวต้นตำรับ', 'long beans', 'ถั่วฝักยาว', 'crushed peanuts', 'ถั่วลิสงป่น', 'sweet pork', 'หมูแดง'], nm('หาถั่วฝักยาวที่หั่นเป็นวงเล็กๆ', 'Find the long beans cut into little rings'),
    // a white bowl with a blue rim full of thin rice noodles, topped with red barbecue pork slices, little green rings of long bean, crushed peanuts, crispy pork bits and a lime wedge, a spoon leaning in
    P('M30 116h180c0 56-40 84-90 84s-90-28-90-84z', '#FFFFFF') + Lc('M40 132h160', '#1E88E5', 4) + E(120, 116, 90, 20, '#FFF3E0')
    + Lc('M50 116c20-6 30 6 50 0s30 6 50 0 30 6 40 0', '#FFF8E1', 4) + [[80, 108], [104, 104], [128, 110]].map(([x, y]) => P(`M${x - 12} ${y}h24l-4 10h-16z`, '#E53935', 2.5)).join('')
    + [[150, 108], [162, 118], [70, 120], [96, 122], [140, 122]].map(([x, y]) => C(x, y, 5, '#7CB342', 2) + C(x, y, 2, '#C5E1A5', 0)).join('')
    + [[90, 116], [116, 120], [176, 112], [60, 110]].map(([x, y]) => C(x, y, 2.5, '#D7A86E', 0)).join('') + P('M170 100c10-14 26-10 30 2z', '#C5E1A5')
    + Lc('M186 104l30-40', '#B0BEC5', 6) + face(120, 160, 0.42)),

  L('teenchok', 'ผ้าซิ่นตีนจกหาดเสี้ยว', 'A Hat Siao sarong with its woven teen chok hem', ['teen chok', 'ซิ่นตีนจก', 'hat siao', 'หาดเสี้ยว', 'thai phuan weaving', 'ผ้าทอไทพวน', 'woven pattern', 'ลายทอมือ', 'si satchanalai', 'ศรีสัชนาลัย'], nm('หาลายสี่เหลี่ยมข้าวหลามตัดตรงชายผ้า', 'Find the diamond pattern along the bottom'),
    // a folded tube skirt: a striped yellow-and-red top, a dark middle with thin stripes, and a wide hem band full of tiny woven diamonds and hooks in red, yellow and green
    P('M40 40h160l10 160H30z', '#FFCA28') + Array.from({ length: 6 }, (_, k) => Lc(`M${39 - k * 0.5} ${56 + k * 8}h${162 + k}`, k % 2 ? '#E53935' : '#FFE082', 3)).join('')
    + P('M37 100h166l3 40H34z', '#5D4037') + Lc('M35 112h170M35 126h170', '#8D6E63', 2) + P('M34 140h172l4 60H30z', '#C62828')
    + Array.from({ length: 8 }, (_, k) => P(`M${46 + k * 21} 170l10-14 10 14-10 14z`, '#FFCA28', 2) + C(56 + k * 21, 170, 3, '#43A047', 1.5)).join('')
    + Lc('M32 150h176M30 190h180', '#FFCA28', 3) + face(120, 74, 0.34)),

  L('goldjewel', 'เครื่องประดับทองโบราณศรีสัชนาลัย', 'Si Satchanalai\'s old-style hand-made gold', ['ancient style gold', 'ทองโบราณ', 'si satchanalai gold', 'ทองศรีสัชนาลัย', 'gold bracelet', 'กำไลทอง', 'granulated beads', 'เม็ดทองไข่ปลา', 'goldsmith craft', 'งานช่างทอง'], nm('หาเม็ดทองกลมเล็กๆ บนกำไล', 'Find the tiny gold beads on the bracelet'),
    // a round red cushion holding a thick gold bangle studded with rows of tiny gold beads, and a gold chain necklace with a lotus-flower pendant draped beside it, sparkles round them
    E(120, 170, 96, 34, '#C62828') + E(120, 166, 84, 26, '#E53935', 0) + E(98, 140, 46, 22, 'none', 0) + Lc('M54 140a44 20 0 1 0 88 0a44 20 0 1 0-88 0', '#FFC107', 12) + Lc('M54 140a44 20 0 1 0 88 0a44 20 0 1 0-88 0', INK, 2)
    + Array.from({ length: 10 }, (_, k) => C(98 + 44 * Math.cos(k * 0.628), 140 + 20 * Math.sin(k * 0.628), 3.5, '#FFE082', 1.5)).join('')
    + Lc('M150 100c10 40 40 60 60 70', '#FFC107', 4) + Lc('M150 100c-6 30 10 60 30 76', '#FFC107', 4) + P('M184 176c-8 10-8 20 0 26 8-6 8-16 0-26z', '#FFC107') + P('M184 182c-10 4-14 12-12 20 8 0 12-8 12-20zM184 182c10 4 14 12 12 20-8 0-12-8-12-20z', '#FFB300', 2)
    + [[40, 80], [200, 70], [130, 60]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, '#FFF59D', 2)).join('') + face(98, 192, 0.34)),

  L('khaoluang', 'ยอดเขาหลวง อุทยานรามคำแหง', 'Khao Luang\'s peaks in Ramkhamhaeng National Park', ['khao luang sukhothai', 'เขาหลวงสุโขทัย', 'ramkhamhaeng national park', 'อุทยานแห่งชาติรามคำแหง', 'mountain hike', 'เดินป่าขึ้นเขา', 'jagged peaks', 'ยอดเขาหยัก', 'forest trail', 'เส้นทางเดินป่า'], nm('หาเส้นทางเดินที่ซิกแซกขึ้นภูเขา', 'Find the trail zigzagging up the mountain'),
    // a big jagged mountain ridge with several rocky peaks above a green forest, a dotted zigzag trail climbing it, a little wooden sign post with no words at its foot, pink morning sky
    R(14, 26, 212, 188, '#F8BBD0', 34) + P('M14 170l30-60 20 20 30-70 20 40 26-50 30 60 20-24 36 84v40H14z', '#78909C') + P('M94 60l-10 22 12-4 6 10zM146 50l-8 20 10-2z', '#ECEFF1', 2.5)
    + P('M14 170c40-20 80-10 110-20s70 0 102 10v54H14z', '#43A047') + [[40, 176], [70, 168], [170, 170], [204, 180]].map(([x, y]) => C(x, y, 14, '#2E7D32')).join('')
    + Lc('M110 200l30-24-24-20 26-22-18-22 20-24', '#FFFFFF', 4) + Lc('M110 200l30-24-24-20 26-22-18-22 20-24', INK, 0.1) + Lc('M90 210v-26', '#8D6E63', 4) + R(76, 176, 30, 12, '#D7B46A', 2, 2.5) + face(146, 76, 0.28)),

  L('potduang', 'เงินพดด้วงโบราณ', 'Pot duang, the old curled silver money', ['pot duang', 'เงินพดด้วง', 'bullet money', 'เงินโบราณ', 'ancient siamese money', 'เงินตราสยามโบราณ', 'silver', 'เงินแท้', 'ramkhamhaeng museum', 'พิพิธภัณฑ์รามคำแหง'], nm('หาตราเล็กๆ ที่ประทับอยู่บนเม็ดเงิน', 'Find the tiny stamped mark on a silver piece'),
    // a little wooden dish holding a heap of round, curled-up silver pieces like rolled-up bugs, each with a small stamped mark, one big piece in front showing its curled ends and stamp
    E(120, 180, 90, 22, '#8D6E63') + P('M30 176c0 20 40 32 90 32s90-12 90-32', '#A1887F')
    + [[70, 160], [100, 154], [130, 156], [160, 160], [86, 140], [116, 136], [146, 140], [102, 120], [132, 122]].map(([x, y]) => C(x, y, 16, '#CFD8DC') + Lc(`M${x - 6} ${y + 14}c0-6 12-6 12 0`, '#90A4AE', 2.5) + C(x, y - 4, 4, 'none', 2)).join('')
    + C(120, 70, 34, '#ECEFF1') + P('M102 96c0-12 36-12 36 0', '#CFD8DC') + Lc('M106 98c4 6 24 6 28 0', '#90A4AE', 2.5) + P('M110 52l10-10 10 10-10 10z', 'none', 2.5) + C(120, 52, 3, INK, 0)
    + face(120, 72, 0.36)),
];

export default {
  places: {
    'th-sukhothai': { country: 'th', wave: 3, home: true, name: nm('สุโขทัยและศรีสัชนาลัย', 'Sukhothai and Si Satchanalai'), tz: 'Asia/Bangkok', ll: [17.02, 99.7], alias: ['sukhothai', 'สุโขทัย', 'THS', 'si satchanalai', 'ศรีสัชนาลัย', 'sawankhalok', 'สวรรคโลก', 'hat siao', 'หาดเสี้ยว'], colors: SK },
  },
  items,
};
