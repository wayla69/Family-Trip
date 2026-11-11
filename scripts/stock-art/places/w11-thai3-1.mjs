// Wave 11, Thailand (south): Surat Thani, Cheow Lan lake and Khao Sok — the city stamp, two day scenes and the place's own
// landmarks, foods and jungle creatures; temples only as buildings, no figures (docs/STOCK-ART.md §8)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const ST = { k1: '#1B7F5E', k2: '#0E7C86', k3: '#E0F5EC' };
const CITY = 'th-suratthani', DIR = 'th/suratthani';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a limestone tower: steep sides, a rounded top
const karst = (x, base, w, h, fill, sw) => P(`M${x - w} ${base}C${x - w * 1.05} ${base - h * 0.55} ${x - w * 0.7} ${base - h} ${x - w * 0.1} ${base - h}S${x + w * 1.05} ${base - h * 0.6} ${x + w} ${base}z`, fill, sw);
const tuft = (x, y, s = 1) => C(x - 7 * s, y, 7 * s, '#43A047', 2) + C(x + 6 * s, y - 2 * s, 8 * s, '#66BB6A', 2) + C(x, y - 7 * s, 6 * s, '#81C784', 2);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับสุราษฎร์ธานี', 'Surat Thani stamp'), kw: ['surat thani', 'สุราษฎร์ธานี', 'khao sok', 'เขาสก', 'cheow lan', 'เชี่ยวหลาน'],
    // three limestone towers rising from green lake water under a little sun
    svg: cityStamp('srt-st', { name: 'SURAT THANI', sub: 'KHAO SOK · THAILAND', ...ST, emblem: C(130, 72, 9, '#FFCA28', 2.5) + karst(72, 124, 14, 52, '#66BB6A', 3) + karst(100, 124, 16, 66, '#43A047', 3) + karst(128, 124, 12, 44, '#81C784', 3) + P('M50 122c16-5 32 4 50 0s34 5 50 0v16H50z', '#26A69A', 3) + Lc('M66 132h14M104 134h16', '#B2DFDB', 2.5) }) },

  D('cheowlan', 'ทะเลสาบเชี่ยวหลานกับเขาหินปูน', 'Cheow Lan lake and its limestone towers', ['cheow lan lake', 'เขื่อนเชี่ยวหลาน', 'ratchaprapha', 'รัชชประภา', 'limestone karsts', 'เขาหินปูน', 'emerald lake', 'ทะเลสาบสีเขียวมรกต', 'guilin of thailand', 'กุ้ยหลินเมืองไทย'],
    // pale far towers, green near towers with tufts of jungle on top, emerald water with their reflections, a band of morning mist
    scene('srt-d1', '#B3E5FC', C(180, 56, 16, '#FFF59D', 3) + karst(40, 140, 26, 70, '#A5D6A7') + karst(110, 140, 22, 84, '#A5D6A7') + karst(200, 140, 30, 64, '#A5D6A7')
      + P('M-4 118c40-8 80 6 124-2s80-6 128 2v10H-4z', '#FFFFFF', 0) + karst(76, 150, 24, 92, '#66BB6A') + karst(160, 150, 28, 76, '#43A047') + tuft(74, 62) + tuft(160, 78)
      + P('M-4 148h248v100H-4z', '#26A69A') + P('M56 150c4 30 10 40 20 44 10-4 16-14 22-44z', '#4DB6AC', 0) + P('M134 150c4 24 12 34 26 36 14-2 22-12 26-36z', '#4DB6AC', 0)
      + Lc('M30 176h30M120 196h40M180 168h30', '#B2DFDB', 3) + face(76, 108, 0.45))),

  D('khaosok', 'ป่าดิบเขาสกกับต้นไม้ยักษ์', 'Khao Sok rainforest and a giant tree', ['khao sok national park', 'อุทยานแห่งชาติเขาสก', 'rainforest', 'ป่าดิบชื้น', 'giant tree', 'ต้นไม้ยักษ์', 'jungle trek', 'เดินป่า', 'buttress roots', 'รากพูพอน'],
    // a huge rainforest tree with wide buttress roots, vines and a high round canopy, a little earth trail winding past ferns
    scene('srt-d2', '#C8E6C9', C(40, 60, 34, '#81C784') + C(200, 56, 36, '#66BB6A') + C(60, 30, 30, '#A5D6A7') + C(180, 26, 30, '#A5D6A7')
      + P('M104 220V80h32v140z', '#8D6E63') + P('M104 190c-10 10-24 22-40 30h40zM136 190c10 10 24 22 40 30h-40z', '#795548') + C(120, 52, 44, '#43A047') + C(84, 70, 26, '#66BB6A') + C(158, 68, 28, '#66BB6A')
      + Lc('M92 80c-4 30 4 50-2 80M150 82c6 24-2 46 4 70', '#7CB342', 3) + P('M-4 206c60-10 120 0 248-8v50H-4z', '#558B2F') + P('M120 248c10-20 50-30 70-50l10 4c-18 22-56 30-66 46z', '#D7A86E', 2.5)
      + [[30, 196], [210, 192], [60, 210]].map(([x, y]) => P(`M${x} ${y}c-14-6-20-18-18-26 6 8 12 14 18 26zM${x} ${y}c14-6 20-18 18-26-6 8-12 14-18 26z`, '#9CCC65', 2)).join('') + face(120, 130, 0.4))),

  L('samkloe', 'เขาสามเกลอกลางเขื่อน', 'The Three Friends rocks in the lake', ['khao sam kloe', 'เขาสามเกลอ', 'three friends rocks', 'หินสามก้อน', 'cheow lan', 'เชี่ยวหลาน', 'limestone pillars', 'เสาหินปูน', 'lake boat trip', 'นั่งเรือชมเขื่อน'], nm('หาเขาหินสามลูกที่ยืนเรียงกันกลางน้ำ', 'Find the three rock towers standing together in the water'),
    // three tall rounded limestone pillars of different heights side by side in green water, trees on their tops, each with a little smile
    karst(70, 186, 24, 120, '#BDBDBD') + karst(122, 186, 26, 150, '#CFD8DC') + karst(172, 186, 22, 106, '#B0BEC5') + Lc('M60 100c4 20 0 40 6 60M118 80c-4 30 4 60-2 90M176 110c4 20-2 40 4 60', '#90A4AE', 3)
    + tuft(70, 66, 1.1) + tuft(122, 36, 1.2) + tuft(172, 80) + P('M20 184c50-6 150-6 200 0v30c-50 8-150 8-200 0z', '#26A69A') + Lc('M44 200h26M110 204h30M170 198h24', '#B2DFDB', 3)
    + face(70, 140, 0.35) + face(122, 120, 0.4) + face(172, 150, 0.35)),

  L('drownedforest', 'ตอไม้ยืนต้นกลางทะเลสาบ', 'The drowned forest of the lake', ['drowned forest', 'ป่าจมน้ำ', 'dead tree trunks', 'ตอไม้กลางน้ำ', 'cheow lan', 'เชี่ยวหลาน', 'egret', 'นกยาง', 'reservoir', 'อ่างเก็บน้ำ'], nm('หานกยางสีขาวที่เกาะบนตอไม้กลางน้ำ', 'Find the white egret perched on a tree trunk in the lake'),
    // silver-grey bare tree trunks with broken branches standing up out of calm green water, a white egret on the tallest
    P('M16 160c60-8 150-8 208 0v44c-60 10-150 10-208 0z', '#4DB6AC') + karst(196, 162, 20, 60, '#A5D6A7')
    + [[62, 160, 70], [118, 164, 110], [160, 162, 54], [36, 166, 40]].map(([x, y, h]) => P(`M${x - 6} ${y}V${y - h}l4-8 4 8 4-4v${h + 4}z`, '#ECEFF1') + Lc(`M${x} ${y - h * 0.6}l-14-12M${x + 4} ${y - h * 0.4}l12-10`, '#CFD8DC', 4) + E(x, y + 8, 14, 3, '#80CBC4', 0)).join('')
    + E(120, 44, 12, 9, '#FFFFFF') + P('M128 42c6-10 4-20-2-24 10 0 14 10 12 20z', '#FFFFFF', 2.5) + P('M134 18l14 2-12 4z', '#FFCA28', 2) + Lc('M116 52v8M122 52v8', INK, 2) + C(134, 22, 1.8, INK, 0)
    + Lc('M40 190h24M140 184h30', '#B2DFDB', 3) + face(118, 110, 0.32)),

  L('ratchaprapha', 'สันเขื่อนรัชชประภา', 'Ratchaprapha Dam', ['ratchaprapha dam', 'เขื่อนรัชชประภา', 'dam', 'เขื่อน', 'viewpoint', 'จุดชมวิว', 'lake', 'ทะเลสาบ', 'hydro power', 'ไฟฟ้าพลังน้ำ'], nm('หาสันเขื่อนยาวที่กั้นน้ำไว้', 'Find the long dam wall holding back the lake'),
    // a long curved concrete dam wall with a road and lamps on top, the high green lake behind it with limestone peaks, the river valley below
    karst(56, 108, 20, 56, '#81C784') + karst(110, 108, 24, 76, '#66BB6A') + karst(176, 108, 22, 50, '#81C784') + P('M14 104c70-10 140-10 212 0v22H14z', '#26A69A')
    + P('M14 124c70-10 140-10 212 0l-24 66H38z', '#CFD8DC') + P('M10 120c70-12 150-12 220 0v8c-70-12-150-12-220 0z', '#90A4AE', 3) + [50, 90, 130, 170, 210].map((x) => Lc(`M${x} ${118 - (x === 130 || x === 90 ? 4 : 0)}v-14`, INK, 2.5) + C(x, 102, 4, '#FFEE58', 2)).join('')
    + R(108, 150, 24, 40, '#4FC3F7', 3, 3) + P('M36 190h168c-10 14-30 24-84 24s-74-10-84-24z', '#A5D6A7') + Lc('M120 190c-6 10 6 18 0 24', '#4FC3F7', 5) + face(120, 156, 0.5)),

  L('treefrog', 'กบบินแห่งเขาสก', 'A Khao Sok flying frog', ['flying frog', 'กบบิน', 'tree frog', 'กบต้นไม้', 'khao sok', 'เขาสก', 'rainforest', 'ป่าดิบชื้น', 'night walk', 'ส่องสัตว์กลางคืน'], nm('หาเท้าพังผืดสีส้มของเจ้ากบ', 'Find the frog\'s big orange webbed feet'),
    // a bright green tree frog with big round eyes and wide orange webbed toes sitting on a large rainforest leaf
    P('M30 150c40-60 130-80 190-40-30 50-120 80-190 40z', '#7CB342') + Lc('M40 150c50-20 100-30 170-40', '#558B2F', 3)
    + E(122, 126, 54, 34, '#66BB6A') + C(92, 92, 20, '#66BB6A') + C(152, 92, 20, '#66BB6A') + C(92, 90, 12, '#FFB300', 2.5) + C(152, 90, 12, '#FFB300', 2.5) + R(88, 82, 8, 16, INK, 4, 0) + R(148, 82, 8, 16, INK, 4, 0)
    + [[70, 150, -1], [174, 150, 1], [86, 160, -1], [158, 160, 1]].map(([x, y, s]) => P(`M${x} ${y}l${s * 18} 10 ${s * 4} 8-${s * 14}-4-${s * 10} 6-${s * 2}-12z`, '#FF8A65', 2.5)).join('')
    + E(98, 132, 7, 4.5, '#FF8FA3', 0) + E(146, 132, 7, 4.5, '#FF8FA3', 0) + P('M108 130q14 10 28 0', 'none', 3.5)),

  L('lanternbug', 'แมลงงวงช้าง', 'A lantern bug with its long nose', ['lantern bug', 'แมลงงวงช้าง', 'lanternfly', 'pyrops', 'insect', 'แมลง', 'rainforest', 'ป่าดิบ', 'tree trunk', 'ลำต้นไม้'], nm('หาจมูกยาวสีแดงที่งอนขึ้นของแมลง', 'Find the bug\'s long red nose curling up'),
    // a cute lantern bug on a tree trunk: a long upturned red snout, green wings dotted yellow, bright yellow hind wings peeking out
    R(20, 20, 60, 210, '#A1887F', 14) + Lc('M40 40v40M58 110v50M36 180v30', '#8D6E63', 3)
    + P('M104 120c30-30 80-30 110 0-20 60-90 70-110 0z', '#FFCA28') + P('M100 118c20-24 70-30 104-6-10 50-80 60-104 6z', '#43A047')
    + [[130, 110], [150, 124], [170, 108], [184, 128], [146, 98]].map(([x, y]) => C(x, y, 5, '#FFF176', 1.5)).join('') + E(92, 124, 22, 18, '#26A69A')
    + P('M74 118c-14-20-14-50 0-70 6-6 14-4 12 4-10 20-8 40 2 58z', '#E53935') + C(78, 124, 4, INK, 0) + E(86, 134, 5, 3, '#FF8FA3', 0) + Lc('M96 140l-6 16M110 140l4 16', INK, 3)),

  L('argus', 'นกแว่นสีน้ำตาลรำแพน', 'A great argus showing its spotted wings', ['great argus', 'นกหว้า', 'argus pheasant', 'ไก่ฟ้า', 'eye spots', 'ลายจุดตา', 'rainforest bird', 'นกป่าดิบ', 'khao sok', 'เขาสก'], nm('หาลายจุดกลมๆ เหมือนดวงตาบนปีก', 'Find the round eye spots on the big wings'),
    // a great argus pheasant fanning its huge brown wings into a round shield covered in golden eye spots, its small blue head peeking out
    P('M20 170C20 80 80 30 120 30s100 50 100 140z', '#A1887F') + [40, 70, 100, 140, 170, 200].map((x) => Lc(`M120 172L${x} ${x < 120 ? 60 + (120 - x) * 0.6 : 60 + (x - 120) * 0.6}`, '#8D6E63', 3)).join('')
    + [[54, 120], [74, 86], [104, 66], [140, 66], [170, 86], [188, 120], [80, 130], [160, 130], [120, 100]].map(([x, y]) => C(x, y, 9, '#FFD54F', 2) + C(x, y, 4, '#6D4C41', 0)).join('')
    + E(120, 176, 30, 20, '#795548') + C(120, 146, 14, '#5C9BD5') + C(120, 140, 3, INK, 0) + P('M118 150l2 6 2-6z', '#FFCA28', 1.5) + E(110, 150, 4, 3, '#FF8FA3', 0) + E(130, 150, 4, 3, '#FF8FA3', 0)
    + Lc('M110 196v20M130 196v20', '#E57373', 4) + Lc('M100 216h20M122 216h20', '#E57373', 3)),

  L('glowfungi', 'เห็ดเรืองแสงในป่ายามค่ำ', 'Glowing mushrooms on a log at night', ['glowing mushrooms', 'เห็ดเรืองแสง', 'bioluminescent', 'night walk', 'เดินป่ากลางคืน', 'jungle at night', 'ป่ายามค่ำคืน', 'fungi', 'เห็ด'], nm('หาเห็ดสีเขียวที่ส่องแสงบนขอนไม้', 'Find the green mushrooms glowing on the log'),
    // a dark night circle with stars, a mossy fallen log and a cluster of little mushrooms glowing pale green, soft glow rings around them
    C(120, 120, 100, '#283593') + [[60, 60], [170, 50], [190, 96], [96, 40]].map(([x, y]) => P(`M${x} ${y - 6}l2 4 4 2-4 2-2 4-2-4-4-2 4-2z`, '#FFF59D', 0)).join('') + C(60, 82, 10, '#FFF9C4', 2.5)
    + C(120, 150, 70, '#C6FF00', 0).replace('/>', ' opacity=".18"/>') + C(120, 150, 44, '#C6FF00', 0).replace('/>', ' opacity=".25"/>')
    + R(30, 170, 180, 34, '#6D4C41', 17) + C(196, 187, 12, '#A1887F', 2.5) + Lc('M60 176c20-6 40 4 60-2', '#7CB342', 4)
    + [[82, 170, 18], [110, 170, 26], [140, 170, 20], [164, 170, 14]].map(([x, y, h]) => R(x - 3, y - h, 6, h, '#E6EE9C', 2, 2) + P(`M${x - 12} ${y - h}c0-12 24-12 24 0z`, '#B2FF59', 2.5)).join('') + face(110, 156, 0.25)),

  L('bananaflower', 'ปลีกล้วยป่าห้อยลงมา', 'A wild banana flower hanging down', ['wild banana', 'กล้วยป่า', 'banana flower', 'ปลีกล้วย', 'banana blossom', 'หัวปลี', 'rainforest plants', 'พืชป่าดิบ', 'jungle', 'ป่า'], nm('หาปลีสีม่วงแดงที่ห้อยลงมา', 'Find the purple-red flower bud hanging down'),
    // a big torn banana leaf, a curving stalk with a row of small green bananas and a big purple-red flower bud hanging below
    P('M30 30c50-10 80 20 70 80-40 0-80-30-70-80z', '#66BB6A') + Lc('M38 36c20 20 40 44 58 70', '#388E3C', 3) + P('M210 20c-50 0-80 30-70 80 40-6 76-30 70-80z', '#81C784') + Lc('M204 26c-20 20-40 44-58 70', '#388E3C', 3)
    + Lc('M120 10c0 40 6 70 8 96', '#7CB342', 7) + [0, 1, 2, 3].map((k) => P(`M${108 + k * 6} ${80 + k * 10}c-10-4-14-12-12-20l14 14z`, '#AED581', 2)).join('')
    + P('M128 104c-24 10-30 50-12 90 4 8 12 8 16 0 18-40 16-80-4-90z', '#AD1457') + Lc('M118 140c4 10 10 10 16 0M116 166c6 8 12 8 18 0', '#880E4F', 2.5) + face(124, 132, 0.3)),

  L('saltedegg', 'ไข่เค็มไชยาไข่แดงสีส้ม', 'Chaiya salted eggs with red-orange yolks', ['chaiya salted eggs', 'ไข่เค็มไชยา', 'salted duck eggs', 'ไข่เค็ม', 'red yolk', 'ไข่แดงสีส้ม', 'chaiya', 'ไชยา', 'souvenir', 'ของฝาก'], nm('หาไข่แดงสีส้มเข้มในไข่ที่ผ่าครึ่ง', 'Find the deep orange yolk in the egg cut in half'),
    // eggs coated in red-brown soil and rice husk in a small woven basket, and one egg cut in half with a deep red-orange yolk and a happy face
    P('M30 150h110l-10 50H40z', '#D7A86E') + Lc('M34 166h102M38 184h94', '#A1887F', 2.5) + [[54, 140], [84, 134], [114, 142], [70, 120], [100, 116]].map(([x, y]) => E(x, y, 18, 22, '#8D4E3A') + [[-6, -6], [4, 4], [6, -10]].map(([dx, dy]) => Lc(`M${x + dx} ${y + dy}l4 2`, '#D7A86E', 2)).join('')).join('')
    + E(176, 160, 44, 38, '#FFFFFF') + E(176, 160, 44, 38, 'none') + C(178, 160, 22, '#F4511E') + face(178, 158, 0.38)),

  L('chaiyachedi', 'พระบรมธาตุไชยา', 'Phra Borommathat Chaiya', ['phra borommathat chaiya', 'พระบรมธาตุไชยา', 'srivijaya', 'ศรีวิชัย', 'ancient stupa', 'เจดีย์โบราณ', 'chaiya', 'ไชยา', 'temple building', 'วัด'], nm('หาเจดีย์องค์เล็กๆ ที่มุมของแต่ละชั้น', 'Find the little towers on the corners of every tier'),
    // an old Srivijaya-style brick-grey stupa: a square base with arched niches, stacked square tiers each with tiny corner towers, a golden tip
    R(40, 170, 160, 30, '#BCAAA4') + R(60, 120, 120, 50, '#D7CCC8') + [80, 120, 160].map((x) => P(`M${x - 10} 170v-26c0-14 20-14 20 0v26z`, '#8D6E63', 2.5)).join('')
    + R(76, 90, 88, 30, '#BCAAA4') + R(92, 64, 56, 26, '#D7CCC8') + R(104, 44, 32, 20, '#BCAAA4')
    + [[60, 120, 9], [180, 120, 9], [76, 90, 7], [164, 90, 7], [92, 64, 6], [148, 64, 6]].map(([x, y, s]) => P(`M${x - s} ${y}c0-${s * 2} ${s} -${s * 3} ${s} -${s * 4}c0 ${s} ${s} ${s * 2} ${s} ${s * 4}z`, '#D7CCC8', 2.5)).join('')
    + P('M112 44c0-10 4-20 8-34 4 14 8 24 8 34z', '#FFCA28') + C(120, 10, 3, '#FFCA28', 2) + R(30, 198, 180, 10, '#A1887F', 3) + face(120, 140, 0.4)),

  L('tapidusk', 'แม่น้ำตาปียามเย็น', 'The Tapi river at dusk', ['tapi river', 'แม่น้ำตาปี', 'riverside', 'ริมแม่น้ำ', 'sunset', 'พระอาทิตย์ตก', 'ko lamphu', 'เกาะลำพู', 'evening walk', 'เดินเล่นยามเย็น'], nm('หาเกาะต้นไม้เล็กๆ กลางแม่น้ำ', 'Find the little tree island in the middle of the river'),
    // a wide calm river glowing orange and pink at sunset, a little tree-covered island in the middle, a riverside rail with round lamps in front
    R(16, 30, 208, 160, '#FFCCBC', 30) + P('M16 70h208v40H16z', '#FFAB91', 0) + C(120, 112, 26, '#FFB74D') + P('M16 112h208v78c0 16-14 30-30 30H46c-16 0-30-14-30-30z', '#7E57C2')
    + Lc('M90 130h60M100 146h40', '#FFB74D', 4) + E(176, 116, 34, 8, '#6D4C41') + C(166, 104, 12, '#43A047', 2.5) + C(184, 100, 14, '#66BB6A', 2.5)
    + P('M16 186h208v4c0 16-14 30-30 30H46c-16 0-30-14-30-30z', '#BCAAA4') + Lc('M16 186h208', '#8D6E63', 5) + [40, 200].map((x) => Lc(`M${x} 186v-46`, INK, 3) + C(x, 134, 8, '#FFF59D', 2.5)).join('') + face(120, 108, 0.32)),

  L('pitviper', 'งูเขียวหางไหม้ขดบนกิ่ง', 'A green pit viper curled on a branch', ['green pit viper', 'งูเขียวหางไหม้', 'snake', 'งู', 'look but never touch', 'ดูได้แต่ห้ามจับ', 'night walk', 'ส่องสัตว์กลางคืน', 'rainforest', 'ป่าดิบชื้น'], nm('หาปลายหางสีแดงของงูเขียว', 'Find the green snake\'s rusty red tail tip'),
    // a bright green snake with a pale belly stripe coiled in loops on a mossy branch, its rusty red tail tip hanging down, big golden eyes and a shy smile
    Lc('M10 150C60 140 160 150 230 120', '#8D6E63', 12) + Lc('M40 146c10-4 20-4 30 0M150 140c10-4 20-4 30-2', '#7CB342', 4)
    + E(120, 136, 54, 18, '#43A047') + E(118, 118, 44, 16, '#66BB6A') + E(116, 100, 34, 14, '#43A047') + Lc('M80 138c26 8 54 8 82 0M82 120c24 6 50 6 74 0', '#C5E1A5', 3)
    + P('M170 140c10 10 12 30 4 44', 'none', 0) + Lc('M168 140c12 12 14 30 6 46', '#43A047', 10) + Lc('M176 172c2 6 0 12-2 16', '#D84315', 8)
    + P('M90 96c-6-26 6-44 30-44 22 0 30 16 26 30-4 10-16 16-30 16z', '#66BB6A') + C(106, 70, 7, '#FFD54F', 2) + C(132, 70, 7, '#FFD54F', 2) + R(104, 66, 4, 9, INK, 2, 0) + R(130, 66, 4, 9, INK, 2, 0)
    + E(100, 82, 5, 3, '#FF8FA3', 0) + E(140, 82, 5, 3, '#FF8FA3', 0) + P('M114 84q5 4 10 0', 'none', 2.5)),

  L('torchginger', 'ดอกดาหลาสีแดงสด', 'A torch ginger flower', ['torch ginger', 'ดาหลา', 'ginger flower', 'ดอกขิงป่า', 'red flower', 'ดอกไม้สีแดง', 'southern garden', 'สวนปักษ์ใต้', 'rainforest plants', 'พืชป่าดิบ'], nm('หากลีบสีแดงที่ซ้อนกันเหมือนคบเพลิง', 'Find the red petals layered like a torch'),
    // a tall stem rising from long green leaves, topped with a big waxy pink-red torch-shaped flower of layered petals with a white edge
    [[-1, 40], [1, 30], [-1, 70], [1, 76]].map(([s, h]) => P(`M120 220c${s * 30}-${h} ${s * 70}-${h + 30} ${s * 100}-${h + 20}c${-s * 40} 10 ${-s * 70} 30 ${-s * 100} ${h + 20}z`, '#66BB6A')).join('')
    + Lc('M120 220V100', '#7CB342', 7) + [[0, 50], [1, 40], [2, 30]].map(([k, w]) => [-1, 1].map((s) => P(`M120 ${110 - k * 14}c${s * w} -6 ${s * (w + 10)} -26 ${s * 6} -40`, '#EC407A')).join('')).join('')
    + P('M108 98c-4-30 4-50 12-60 8 10 16 30 12 60z', '#D81B60') + Lc('M78 104c8-10 20-14 30-12M162 104c-8-10-20-14-30-12', '#FFFFFF', 2) + face(120, 84, 0.3)),

  L('nighttrain', 'รถไฟนอนสายใต้ถึงพุนพิน', 'The southern sleeper train arriving at Phun Phin', ['sleeper train', 'รถไฟตู้นอน', 'night train south', 'รถไฟสายใต้', 'phun phin station', 'สถานีรถไฟพุนพิน', 'bunk beds', 'เตียงนอนบนรถไฟ', 'overnight journey', 'นั่งรถไฟข้ามคืน'], nm('หาม่านเตียงนอนในหน้าต่างรถไฟ', 'Find the bunk-bed curtains in the train windows'),
    // a chubby blue-and-white sleeper carriage behind a red engine with a round smiling front, upper and lower bunk windows with little curtains, the moon above
    C(196, 40, 16, '#FFF59D') + Lc('M10 196h220', '#8D6E63', 6) + Array.from({ length: 8 }, (_, k) => R(16 + k * 28, 198, 14, 8, '#A1887F', 0, 2)).join('')
    + R(14, 100, 130, 84, '#1E88E5', 14) + R(14, 140, 130, 10, '#FFFFFF', 0, 0) + [[34, 112], [80, 112], [34, 156], [80, 156]].map(([x, y]) => R(x - 12, y, 40, 20, '#FFF8E1', 4, 3) + P(`M${x - 10} ${y + 2}h16c-4 8-10 12-16 14z`, '#EF9A9A', 2)).join('')
    + R(148, 92, 80, 92, '#E53935', 16) + R(160, 104, 56, 30, '#B3E5FC', 8, 3) + [40, 110, 176, 210].map((x) => C(x, 188, 10, '#455A64')).join('') + face(188, 156, 0.45)),

  L('leafumbrella', 'ใบบอนยักษ์แทนร่มกันฝน', 'A giant leaf for an umbrella in the rain', ['giant leaf umbrella', 'ใบบอนกันฝน', 'elephant ear plant', 'ต้นบอนยักษ์', 'rainy season', 'หน้าฝน', 'jungle rain', 'ฝนตกในป่า', 'khao sok', 'เขาสก'], nm('หาหยดน้ำฝนที่กลิ้งลงจากใบไม้', 'Find the raindrops rolling off the big leaf'),
    // a huge heart-shaped green elephant-ear leaf held up like an umbrella on its long stalk, raindrops falling and rolling off its edges, a puddle below
    [[40, 30], [90, 20], [160, 24], [200, 40], [60, 70], [190, 80]].map(([x, y]) => P(`M${x} ${y}c-4 6-6 10-6 13 0 4 3 6 6 6s6-2 6-6c0-3-2-7-6-13z`, '#4FC3F7', 2)).join('')
    + P('M120 66C60 60 20 100 28 140c30-10 60-16 92-6 32-10 62-4 92 6 8-40-32-80-92-74z', '#43A047') + Lc('M120 70v62M120 90l-50 26M120 90l50 26M120 110l-70 24M120 110l70 24', '#A5D6A7', 3)
    + Lc('M120 134c0 30-4 54 0 80', '#7CB342', 8) + E(120, 216, 56, 10, '#81D4FA') + [[34, 150], [208, 152]].map(([x, y]) => P(`M${x} ${y}c-4 6-6 10-6 13 0 4 3 6 6 6s6-2 6-6c0-3-2-7-6-13z`, '#4FC3F7', 2)).join('') + face(120, 104, 0.45)),

  L('broadbill', 'นกพญาปากกว้างสีดำเหลือง', 'A black-and-yellow broadbill', ['black-and-yellow broadbill', 'นกพญาปากกว้างท้องสีเหลือง', 'broadbill', 'นกพญาปากกว้าง', 'birdwatching', 'ดูนก', 'rainforest bird', 'นกป่าดิบ', 'khao sok', 'เขาสก'], nm('หาจะงอยปากสีฟ้าอ่อนที่กว้างมาก', 'Find the bird\'s wide pale-blue beak'),
    // a round little bird with a black head and a white collar, a pink chest, black wings streaked yellow and a wide pale-blue beak, on a mossy twig
    Lc('M20 186c60-10 140-10 200-20', '#8D6E63', 8) + E(124, 128, 52, 54, '#212121') + E(116, 146, 32, 34, '#F8BBD0') + P('M148 110c24 10 34 40 24 66-10-20-20-40-24-66z', '#212121')
    + Lc('M152 126l12 28M160 120l12 26', '#FFEB3B', 4) + Lc('M84 104c20 10 40 10 60 0', '#FFFFFF', 6) + C(110, 86, 9, '#FFF59D', 2) + C(110, 86, 4, INK, 0)
    + P('M70 92c-10 4-16 12-10 18 10 2 20-2 28-8z', '#81D4FA') + E(124, 104, 6, 4, '#FF8FA3', 0) + Lc('M112 180v12M132 180v12', '#90A4AE', 4)),

  L('trogon', 'นกขุนแผนท้ายทอยแดง', 'A red-naped trogon', ['red-naped trogon', 'นกขุนแผนท้ายทอยแดง', 'trogon', 'นกขุนแผน', 'birdwatching', 'ดูนก', 'colourful bird', 'นกสีสวย', 'rainforest', 'ป่าดิบชื้น'], nm('หาหางยาวที่มีลายขาวดำเป็นขั้นๆ', 'Find the long tail with black-and-white steps'),
    // an upright bird with a dark red head, a red nape patch, a blue eye ring, a bright crimson belly and a long square tail barred black and white hanging below its branch
    Lc('M30 120h180', '#8D6E63', 8) + R(108, 120, 24, 96, '#FFFFFF', 4) + [130, 150, 170, 190].map((y) => R(108, y, 24, 8, INK, 0, 0)).join('')
    + E(120, 96, 30, 40, '#C62828') + P('M100 76c0 30 4 50 20 62-30-4-40-34-20-62z', '#8D6E63') + C(120, 52, 24, '#4E342E') + P('M136 40c10 4 14 12 10 20', '#E53935', 3)
    + C(110, 50, 8, '#64B5F6', 2) + C(110, 50, 3.5, INK, 0) + P('M96 58l-14 4 14 6z', '#90A4AE', 2) + E(124, 62, 5, 3, '#FF8FA3', 0)),
];

export default {
  places: {
    'th-suratthani': { country: 'th', wave: 3, home: true, name: nm('สุราษฎร์ธานีและเขาสก', 'Surat Thani and Khao Sok'), tz: 'Asia/Bangkok', ll: [8.96, 98.8], alias: ['surat thani', 'สุราษฎร์ธานี', 'URT', 'khao sok', 'เขาสก', 'cheow lan', 'เชี่ยวหลาน', 'ratchaprapha', 'รัชชประภา', 'chaiya', 'ไชยา'], colors: ST },
  },
  items,
};
