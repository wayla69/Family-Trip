// Wave 14, Vietnam: Huế — the city stamp, two day scenes and the place's own landmarks, foods and crafts; buildings only
// (no religious figures, no real emperors), no Ngọ Môn gate and no bún bò Huế (the Vietnam set has both), no dragon boats,
// no conical hats or áo dài (drawn elsewhere), no fish traps or pomelos (other cities have them)
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const HU = { k1: '#6A1B9A', k2: '#C69214', k3: '#F3E5F5' };
const CITY = 'vn-hue', DIR = 'vn/hue';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a Huế roof: yellow (royal) or dark tiles with a curled ridge end at each side (cx = middle, y = eave line, w = half width, h = height)
const roof = (cx, y, w, h, fill = '#FBC02D', sw) => P(`M${cx - w} ${y}L${cx - w * 0.7} ${y - h}H${cx + w * 0.7}L${cx + w} ${y}z`, fill, sw)
  + P(`M${cx - w * 0.7} ${y - h}c-6 0-10-6-8-12 4 2 8 6 8 12zM${cx + w * 0.7} ${y - h}c6 0 10-6 8-12-4 2-8 6-8 12z`, fill, 3) + Lc(`M${cx - w * 0.68} ${y - h}h${w * 1.36}`, INK, 3);
// the octagonal Thiên Mụ tower: seven tiers getting smaller, an arched niche in each, a gourd tip (x = middle, y = foot, s = size)
const tower = (x, y, s) => Array.from({ length: 7 }, (_, k) => { const w = (26 - k * 2.6) * s, h = 18 * s, yy = y - k * h; return R(x - w, yy - h, w * 2, h, '#FFF3E0', 0, 3) + P(`M${x - w - 4 * s} ${yy - h}h${w * 2 + 8 * s}l-3 ${-3 * s}h${-w * 2 - 2 * s}z`, '#8D6E63', 2.5) + P(`M${x - 3.5 * s} ${yy}v${-9 * s}a${3.5 * s} ${4 * s} 0 0 1 ${7 * s} 0v${9 * s}z`, '#5D4037', 0); }).join('')
  + C(x, y - 130 * s, 6 * s, '#C69214', 3) + C(x, y - 140 * s, 4 * s, '#C69214', 2.5) + Lc(`M${x} ${y - 144 * s}v${-8 * s}`, INK, 3);
const foam = (x, y, w = 40, c = '#E1F5FE') => Lc(`M${x} ${y}q${w / 8} -5 ${w / 4} 0t${w / 4} 0t${w / 4} 0t${w / 4} 0`, c, 3);
// a lotus flower (x, y = middle, s = size)
const lotus = (x, y, s = 1) => P(`M${x} ${y + 8 * s}c${-14 * s} 0 ${-20 * s}-${10 * s} ${-18 * s}-${20 * s} ${8 * s} 0 ${14 * s} ${6 * s} ${18 * s} ${20 * s}z`, '#F48FB1', 2.5)
  + P(`M${x} ${y + 8 * s}c${14 * s} 0 ${20 * s}-${10 * s} ${18 * s}-${20 * s}-${8 * s} 0-${14 * s} ${6 * s}-${18 * s} ${20 * s}z`, '#F48FB1', 2.5) + P(`M${x} ${y + 8 * s}c${-8 * s}-${8 * s}-${8 * s}-${20 * s} 0-${28 * s} ${8 * s} ${8 * s} ${8 * s} ${20 * s} 0 ${28 * s}z`, '#F8BBD0', 2.5);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับเว้', 'Huế stamp'), kw: ['hue city', 'เมืองเว้', 'thien mu', 'เทียนมู่', 'octagonal tower', 'หอแปดเหลี่ยม', 'perfume river', 'แม่น้ำหอม'],
    // the seven-tier Thiên Mụ tower standing on the bank of the Perfume River, a purple hill behind
    svg: cityStamp('hu-st', { name: 'HUE', sub: 'PERFUME RIVER · VIETNAM', ...HU, emblem: P('M54 118c14-20 30-28 46-28s34 8 46 28z', '#CE93D8', 2.5) + R(52, 122, 96, 18, '#4FC3F7', 6, 2.5)
      + Lc('M58 130q6-4 12 0t12 0t12 0t12 0t12 0t12 0t12 0', '#E1F5FE', 2) + tower(100, 124, 0.48) }) },

  D('perfumeriver', 'แม่น้ำหอมยามเย็นที่เว้', 'The Perfume River at dusk in Huế', ['perfume river', 'แม่น้ำหอม', 'song huong', 'ซงเฮือง', 'hue riverside', 'ริมแม่น้ำเว้', 'thien mu on the bank', 'เทียนมู่ริมแม่น้ำ', 'green hills', 'เนินเขาเขียว'],
    // a lilac dusk sky, the wide river curving away between soft green hills, the slim seven-tier tower on the left bank with pine trees, a pale moon
    scene('hu-d1', '#E1BEE7', C(186, 56, 14, '#FFF8E1', 3) + P('M-4 112c40-26 90-34 130-18 30-20 80-24 118-6v40H-4z', '#81C784') + P('M-4 132c50-16 120-18 248 0v20H-4z', '#66BB6A')
      + P('M-4 250V170c60-14 110-28 150-40 34-10 70-12 98-8v128z', '#7986CB') + P('M60 250c20-40 60-80 120-108l64-14v122z', '#9FA8DA', 0) + foam(120, 184, 50, '#E8EAF6') + foam(60, 220, 60, '#E8EAF6')
      + P('M-4 170c30-4 60-14 80-30v-14H-4z', '#7CB342') + tower(48, 150, 0.6) + face(48, 126, 0.22)
      + [[86, 144], [100, 140]].map(([x, y]) => Lc(`M${x} ${y}v-14`, '#6D4C41', 3) + P(`M${x - 10} ${y - 12}l10-18 10 18z`, '#2E7D32', 2.5)).join(''))),

  D('citadel', 'พระราชวังไท้ฮหว่าในพระราชวังหลวงเว้', 'Thái Hòa Palace in the Imperial City of Huế', ['imperial city', 'นครจักรพรรดิ', 'hue citadel', 'พระราชวังหลวงเว้', 'thai hoa palace', 'พระที่นั่งไท้ฮหว่า', 'lotus moat', 'สระบัว', 'yellow roof tiles', 'หลังคากระเบื้องเหลือง'],
    // a blue sky, the long palace with double yellow-tiled roofs and red pillars on a stone terrace, a lotus pond with pink flowers in front, old trees on each side
    scene('hu-d2', '#B3E5FC', C(52, 50, 14, '#FFF59D', 3) + C(18, 110, 26, '#558B2F') + C(222, 108, 24, '#558B2F')
      + R(30, 126, 180, 14, '#D7CCC8', 2) + R(42, 92, 156, 34, '#C62828') + [58, 86, 114, 142, 170].map((x) => R(x, 98, 12, 28, '#FFE082', 0, 2.5)).join('')
      + roof(120, 96, 92, 18) + roof(120, 74, 60, 18) + face(120, 112, 0.3) + R(-4, 140, 248, 110, '#4FC3F7')
      + [[40, 168], [86, 190], [150, 172], [196, 196]].map(([x, y]) => E(x + 12, y + 10, 18, 7, '#43A047', 2.5) + lotus(x, y, 0.7)).join('') + foam(40, 220, 40) + foam(130, 228, 50))),

  L('thienmu', 'หอเจ็ดชั้นของวัดเทียนมู่', 'The seven-tier tower of Thiên Mụ', ['thien mu', 'เทียนมู่', 'phuoc duyen tower', 'หอเฟื้อกซวีน', 'seven tiers', 'เจ็ดชั้น', 'octagonal tower', 'หอแปดเหลี่ยม', 'riverbank hill', 'เนินริมแม่น้ำ'], nm('หาลูกน้ำเต้าสีทองบนยอดหอ', 'Find the golden gourd on the very top'),
    // a tall slim tower of seven pale tiers, each a little smaller with a brown eave and a dark arched niche, a golden gourd tip, on a stone terrace with steps, two pines
    R(54, 196, 132, 16, '#BCAAA4', 3) + R(76, 210, 88, 10, '#D7CCC8', 2) + tower(120, 196, 1.08) + face(120, 156, 0.38)
    + [[40, 206], [200, 206]].map(([x, y]) => Lc(`M${x} ${y}v-40`, '#6D4C41', 5) + P(`M${x - 22} ${y - 30}l22-34 22 34zM${x - 18} ${y - 54}l18-28 18 28z`, '#2E7D32')).join('')),

  L('khaidinh', 'สุสานจักรพรรดิไคดิ่ญ', 'The grey hilltop tomb of Khải Định', ['khai dinh tomb', 'สุสานไคดิ่ญ', 'royal tomb', 'สุสานหลวง', 'dragon stair rails', 'ราวบันไดมังกร', 'grey stone stairway', 'บันไดหินสีเทา', 'ung lang', 'อึ๋งลัง'], nm('หามังกรที่เลื้อยลงมาตามราวบันได', 'Find the dragons sliding down the stair rails'),
    // a long wide grey stairway climbing to an ornate dark-grey building with curled roofs on top of a hill, two long green-grey dragons curving down the stair rails
    P('M8 222c20-60 60-100 112-100s92 40 112 100z', '#9CCC65') + P('M84 222l14-90h44l14 90z', '#CFD8DC') + Array.from({ length: 8 }, (_, k) => Lc(`M${86 + k * 1.6} ${212 - k * 11}h${68 - k * 3.2}`, '#90A4AE', 2.5)).join('')
    + R(80, 82, 80, 44, '#90A4AE') + P('M106 126v-24a14 14 0 0 1 28 0v24z', '#455A64') + roof(120, 84, 52, 18, '#607D8B') + roof(120, 58, 30, 14, '#607D8B')
    + [-1, 1].map((d) => P(`M${120 + d * 48} 220c${d * 10}-30 ${-d * 4}-50 ${d * 8}-80`, 'none', 10) + Lc(`M${120 + d * 48} 220c${d * 10}-30 ${-d * 4}-50 ${d * 8}-80`, '#80CBC4', 6)
      + C(120 + d * 56, 136, 10, '#80CBC4') + C(120 + d * 58, 133, 2.5, INK, 0) + P(`M${120 + d * 52} 128l${d * 2}-10 ${d * 8} 8z`, '#80CBC4', 2.5)).join('') + face(120, 100, 0.38)),

  L('tuduc', 'ศาลาซุงเคียมเหนือทะเลสาบบัว สุสานตือดึ๊ก', 'The lake pavilion at the tomb of Tự Đức', ['tu duc tomb', 'สุสานตือดึ๊ก', 'xung khiem pavilion', 'ศาลาซุงเคียม', 'lotus lake', 'ทะเลสาบบัว', 'pavilion on stilts', 'ศาลาบนเสา', 'frangipani tree', 'ต้นลีลาวดี'], nm('หาดอกลีลาวดีสีขาวบนต้นไม้', 'Find the white frangipani flowers on the tree'),
    // a small wooden pavilion with a dark curled roof on stilts over a still green lake with lotus leaves and flowers, a frangipani tree leaning over from the bank
    E(120, 188, 112, 34, '#80CBC4') + R(64, 118, 112, 18, '#FFE0B2', 2) + [76, 100, 140, 164].map((x) => Lc(`M${x} 136v46`, '#6D4C41', 6)).join('')
    + R(80, 90, 80, 28, '#8D6E63') + R(92, 96, 56, 18, '#FFF8E1', 2, 3) + roof(120, 92, 66, 26, '#5D4037') + face(120, 106, 0.34)
    + [[50, 196, 0.7], [190, 192, 0.6]].map(([x, y, s]) => E(x + 10, y + 8, 20, 7, '#43A047', 2.5) + lotus(x, y, s)).join('') + E(120, 214, 24, 7, '#43A047', 2.5)
    + Lc('M222 150c-10-30-24-48-46-60', '#8D6E63', 7) + [[180, 82], [200, 96], [214, 76]].map(([x, y]) => C(x, y, 14, '#66BB6A')).join('')
    + [[184, 76], [206, 90], [214, 70]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 2) + C(x, y, 2, '#FFCA28', 0)).join('')),

  L('hienlam', 'ศาลาเฮี้ยนเลิมกับกระถางสำริดยักษ์', 'Hiển Lâm pavilion and the great bronze urns', ['hien lam pavilion', 'ศาลาเฮี้ยนเลิม', 'nine dynastic urns', 'กระถางสำริดเก้าใบ', 'bronze urns', 'กระถางสำริด', 'imperial city courtyard', 'ลานในพระราชวัง', 'three-tier pavilion', 'ศาลาสามชั้น'], nm('หาหูจับของกระถางสำริด', 'Find the handles on the bronze urns'),
    // a three-tier red pavilion with yellow roofs at the back, three big round bronze urns on short legs with handles and a lid in front on the stone courtyard
    R(16, 200, 208, 18, '#D7CCC8', 3) + R(80, 106, 80, 46, '#C62828') + roof(120, 108, 58, 16) + R(90, 76, 60, 18, '#C62828') + roof(120, 78, 44, 14) + R(98, 48, 44, 16, '#C62828') + roof(120, 50, 32, 12)
    + [96, 120, 144].map((x) => R(x - 5, 116, 10, 36, '#FFE082', 0, 2.5)).join('')
    + [[50, 1], [120, 1.15], [190, 1]].map(([x, s]) => Lc(`M${x - 18 * s} 200l-4 ${-10 * s}M${x + 18 * s} 200l4 ${-10 * s}`, '#6D5B2B', 5) + E(x, 172 * 1, 28 * s, 26 * s, '#A0782C')
      + R(x - 22 * s, 140 - 6 * s, 44 * s, 10, '#8A6420', 3, 3) + P(`M${x - 34 * s} ${154}c-8-6-8-16 0-18M${x + 34 * s} ${154}c8-6 8-16 0-18`, 'none', 4)
      + P(`M${x - 16 * s} ${134 - 6 * s}c0-12 ${32 * s}-12 ${32 * s} 0z`, '#A0782C', 3) + Lc(`M${x - 18 * s} 168h${36 * s}`, '#C9A24A', 3)).join('') + face(120, 176, 0.42)),

  L('truongtien', 'สะพานเจื่องเตี๋ยนยามค่ำคืน', 'The Trường Tiền bridge lit up at night', ['truong tien bridge', 'สะพานเจื่องเตี๋ยน', 'six steel arches', 'โครงเหล็กโค้งหกช่วง', 'colour-changing lights', 'ไฟเปลี่ยนสี', 'perfume river', 'แม่น้ำหอม', 'night walk', 'เดินเล่นยามค่ำ'], nm('หาโค้งสะพานที่เป็นสีชมพู', 'Find the pink arch of the bridge'),
    // a dark blue night, a long bridge of six shallow steel arches across the river, each arch glowing a different colour, their reflections wobbling in the water, stars
    R(6, 40, 228, 176, '#283593', 18) + [[30, 60], [80, 52], [200, 64], [170, 48]].map(([x, y]) => C(x, y, 3, '#FFF59D', 0)).join('') + C(204, 86, 10, '#FFF8E1', 3)
    + R(6, 150, 228, 66, '#3949AB', 0, 0) + R(10, 132, 220, 8, '#B0BEC5', 2, 3)
    + ['#F06292', '#BA68C8', '#4FC3F7', '#81C784', '#FFD54F', '#FF8A65'].map((c, k) => { const x = 14 + k * 36; return P(`M${x} 132q18-34 36 0`, 'none', 9) + Lc(`M${x} 132q18-34 36 0`, c, 5)
      + Lc(`M${x + 4} 132l8-16M${x + 14} 132l4-20M${x + 22} 132l-4-20M${x + 32} 132l-8-16`, c, 2.5) + Lc(`M${x + 6} ${168 + (k % 2) * 6}q12 4 24 0`, c, 4); }).join('')
    + [24, 60, 96, 132, 168, 204].map((x) => R(x - 3, 140, 6, 14, '#90A4AE', 0, 2.5)).join('') + face(122, 120, 0.32)),

  L('anhien', 'บ้านสวนอานเฮียน', 'An Hiên, a Huế garden house', ['an hien garden house', 'บ้านสวนอานเฮียน', 'nha vuon', 'เญ่าเวือน', 'garden house', 'บ้านสวน', 'screen wall', 'กำแพงบังตา', 'fruit trees and fish pond', 'ต้นผลไม้กับบ่อปลา'], nm('หากำแพงเตี้ยๆ ที่ตั้งบังหน้าบ้าน', 'Find the little wall standing in front of the house'),
    // a low wooden house with a tiled roof among fruit trees, a short decorated screen wall in front, a round fish pond with a goldfish, an arched gate covered in flowers
    C(36, 92, 28, '#66BB6A') + C(206, 88, 26, '#7CB342') + [[30, 86], [44, 98], [200, 80], [214, 96]].map(([x, y]) => C(x, y, 4, '#FFB300', 2)).join('') + Lc('M36 118v30M206 112v36', '#6D4C41', 6)
    + R(62, 104, 116, 46, '#D7A86E') + [80, 104, 136, 160].map((x) => R(x - 7, 116, 14, 34, '#8D6E63', 1, 3)).join('') + roof(120, 106, 74, 30, '#795548') + face(120, 120, 0.34)
    + R(96, 158, 48, 30, '#FFF8E1', 3) + R(92, 154, 56, 8, '#A1887F', 3, 3) + C(120, 174, 7, '#CE93D8', 2.5)
    + E(60, 202, 40, 14, '#4FC3F7') + P('M52 200c4-6 12-6 16 0-4 6-12 6-16 0zM68 200l6-4v8z', '#FF7043', 2.5)
    + P('M170 218v-30a22 22 0 0 1 44 0v30', 'none', 7) + [[172, 196], [182, 172], [200, 168], [212, 190]].map(([x, y]) => C(x, y, 5, '#F06292', 2)).join('')),

  L('andinh', 'พระราชวังอานดิ่ญแบบตะวันตก', 'An Định Palace, the Western-style royal villa', ['an dinh palace', 'พระราชวังอานดิ่ญ', 'european-style palace', 'วังแบบยุโรป', 'painted walls', 'ผนังวาดลาย', 'ornate facade', 'ซุ้มประดับลวดลาย', 'an cuu river', 'แม่น้ำอานกู๋'], nm('หาหน้าต่างโค้งชั้นบนที่มีระเบียง', 'Find the arched window with a balcony upstairs'),
    // a pale peach two-storey villa with white columns, arched windows, a little balcony, a decorated crest on the top, a grand front staircase and a gate pillar on each side
    R(20, 206, 200, 12, '#D7CCC8', 3) + R(44, 92, 152, 114, '#FFCCBC') + R(36, 86, 168, 10, '#FFFFFF', 2, 3) + R(40, 146, 160, 8, '#FFFFFF', 2, 3)
    + P('M92 86c0-30 56-30 56 0z', '#FFCCBC') + P('M104 86c0-16 32-16 32 0z', '#81D4FA', 3) + C(120, 52, 6, '#FFCA28', 2.5)
    + [56, 84, 156, 184].map((x) => P(`M${x - 8} 136v-22a8 10 0 0 1 16 0v22z`, '#81D4FA', 3) + P(`M${x - 8} 196v-22a8 10 0 0 1 16 0v22z`, '#81D4FA', 3)).join('')
    + [70, 170].map((x) => R(x - 3, 96, 6, 110, '#FFFFFF', 0, 2.5)).join('') + P('M104 136v-24a16 18 0 0 1 32 0v24z', '#81D4FA', 3) + R(98, 136, 44, 8, '#FFFFFF', 2, 2.5)
    + Lc('M100 136v-6M108 136v-6M116 136v-6M124 136v-6M132 136v-6M140 136v-6', INK, 2) + P('M106 206v-28a14 16 0 0 1 28 0v28z', '#8D6E63')
    + [0, 1, 2].map((k) => R(96 - k * 6, 206 + k * 4, 48 + k * 12, 4, '#ECEFF1', 0, 2)).join('') + R(10, 150, 16, 60, '#ECEFF1', 2) + R(214, 150, 16, 60, '#ECEFF1', 2) + face(120, 116, 0.32)),

  L('theatre', 'โรงละครหลวงเสวียตถิเดือง', 'Duyệt Thị Đường, the royal theatre', ['duyet thi duong', 'เสวียตถิเดือง', 'royal theatre', 'โรงละครหลวง', 'court performance', 'การแสดงในราชสำนัก', 'red and gold stage', 'เวทีแดงทอง', 'nha nhac court music', 'ดนตรีราชสำนักญาญัก'], nm('หาพัดสีทองสองเล่มบนเวที', 'Find the two golden fans on the stage'),
    // a red-and-gold stage inside the old theatre: carved red pillars, a gold frame, a painted backdrop of a blue sea and a red sun, purple curtains tied back, two golden fans on the stage floor
    R(14, 30, 212, 190, '#8D2A1E', 10) + R(36, 52, 168, 122, '#C69214') + R(48, 62, 144, 104, '#E3F2FD') + C(150, 96, 16, '#EF5350', 3) + P('M48 132c30-14 60-14 90 0s40 14 54 6v28H48z', '#64B5F6', 3)
    + P('M48 62h30c-4 30-12 64-30 82zM192 62h-30c4 30 12 64 30 82z', '#8E24AA') + Lc('M54 124l18-6M186 124l-18-6', '#FFCA28', 3)
    + R(28, 46, 12, 154, '#C62828', 0, 3) + R(200, 46, 12, 154, '#C62828', 0, 3) + Lc('M34 70v110M206 70v110', '#FFCA28', 2.5)
    + R(20, 174, 200, 26, '#A1522E', 3) + [[90, 186], [150, 186]].map(([x, y]) => P(`M${x} ${y}l-22-12a24 24 0 0 1 44 0z`, '#FFCA28') + Lc(`M${x} ${y}l-14-14M${x} ${y}v-16M${x} ${y}l14-14`, '#C69214', 2)).join('')
    + face(120, 110, 0.4)),

  L('langco', 'อ่าวลังโกใต้ภูเขาเขียว', 'Lăng Cô bay under the green mountains', ['lang co bay', 'อ่าวลังโก', 'lang co beach', 'หาดลังโก', 'curved white beach', 'หาดทรายขาวโค้ง', 'lagoon behind the beach', 'ทะเลสาบหลังหาด', 'bach ma mountains', 'ภูเขาบั๊กหม่า'], nm('หาเกาะหินเล็กๆ ปลายหาด', 'Find the little rock island at the end of the beach'),
    // tall green mountains wrapping round a half-moon bay of turquoise water and a curving white beach, a calm lagoon behind, a tiny rock island, a palm
    P('M8 140c20-70 60-110 100-110 30 0 46 30 60 50 16-14 34-14 64 4v56z', '#43A047') + P('M60 130c20-40 50-60 80-50 20 6 40 24 50 50z', '#66BB6A')
    + R(8, 132, 224, 20, '#80CBC4', 6) + P('M8 150c40-6 180-6 224 0v12c-60 30-160 30-224 0z', '#FFF8E1') + P('M8 164c60 26 160 28 224 0v26c0 16-12 28-28 28H36c-16 0-28-12-28-28z', '#26C6DA')
    + foam(40, 188, 50) + foam(140, 196, 50) + P('M196 186c2-12 10-18 20-16 8 2 10 10 10 16z', '#8D6E63') + face(120, 86, 0.4)
    + Lc('M34 166c2-20 0-34-6-46', '#8D6E63', 4) + [[-18, 4], [18, 2], [0, -14]].map(([dx, dy]) => P(`M28 120q${dx / 2} ${dy - 10} ${dx} ${dy}q${-dx / 3} -6 ${-dx} ${-dy}z`, '#2E7D32', 2.5)).join('')),

  L('banhbeo', 'บั๋นแบ่ว ขนมถ้วยจิ๋วโรยกุ้ง', 'Bánh bèo, tiny steamed rice cakes in little saucers', ['banh beo', 'บั๋นแบ่ว', 'little saucers', 'ถ้วยจิ๋ว', 'steamed rice cakes', 'ขนมแป้งนึ่ง', 'shrimp floss topping', 'กุ้งป่นโรยหน้า', 'crispy pork rind', 'แคบหมูกรอบ'], nm('หากุ้งป่นสีส้มบนขนมแต่ละถ้วย', 'Find the orange shrimp floss on each little cake'),
    // a big round tray holding nine tiny white saucers, each with a soft white rice cake topped with orange shrimp floss, a crispy cracklin and green onion, a little spoon and fish sauce bowl
    E(112, 150, 100, 66, '#A1887F') + E(112, 146, 92, 60, '#BCAAA4', 3)
    + [[66, 120], [112, 112], [158, 120], [56, 154], [102, 150], [148, 154], [76, 186], [122, 186], [168, 180]].map(([x, y]) => E(x, y, 20, 13, '#FFFFFF') + E(x, y - 1, 14, 8, '#FFFDF5', 2)
      + C(x - 3, y - 2, 5, '#FF8A65', 0) + C(x + 4, y, 4, '#FF7043', 0) + R(x + 2, y - 6, 6, 4, '#FFE082', 1, 1.5) + C(x - 6, y + 3, 1.8, '#43A047', 0)).join('')
    + E(206, 92, 20, 12, '#FFFFFF') + E(206, 90, 14, 6, '#FFB74D', 2.5) + P('M196 196l30-30c4-4 10 2 6 6l-30 30z', '#ECEFF1', 3) + face(102, 150, 0.26)),

  L('comhen', 'เกิมเฮ้น ข้าวคลุกหอยกาบจิ๋ว', 'Cơm hến, rice with tiny baby clams', ['com hen', 'เกิมเฮ้น', 'baby clam rice', 'ข้าวหอยกาบจิ๋ว', 'hen clams', 'หอยเฮ้น', 'peanuts and herbs', 'ถั่วกับผักสมุนไพร', 'crispy rice crackers', 'ข้าวเกรียบกรอบ'], nm('หาเปลือกหอยจิ๋วข้างชาม', 'Find the tiny clam shells by the bowl'),
    // a bowl of rice piled with tiny brown baby clams, roasted peanuts, green herbs, red chilli and crispy cracker pieces, a few little clam shells and a cracker beside it
    P('M38 124h164c-4 46-36 76-82 76s-78-30-82-76z', '#4FC3F7') + Lc('M44 146q76 18 152 0', '#FFFFFF', 4) + P('M48 124c4-30 34-44 72-44s68 14 72 44z', '#FFFDF5')
    + [[80, 104], [96, 96], [112, 104], [128, 94], [144, 104], [160, 110], [104, 114], [136, 114]].map(([x, y]) => E(x, y, 6, 4, '#8D6E63', 2)).join('')
    + [[88, 112], [122, 106], [150, 96]].map(([x, y]) => E(x, y, 4, 3, '#FFCC80', 1.5)).join('') + Lc('M72 116l10-8M164 98l10-6M118 90l4-8', '#43A047', 3) + C(100, 90, 3.5, '#E53935', 1.5)
    + P('M128 82l20-14 10 16z', '#FFF3C4', 2.5) + face(120, 158, 0.48)
    + [[36, 206], [60, 214], [196, 208]].map(([x, y]) => P(`M${x - 9} ${y}c0-10 18-10 18 0z`, '#BCAAA4', 2.5) + Lc(`M${x - 4} ${y}l-2-6M${x + 4} ${y}l2-6`, '#8D6E63', 1.5)).join('')
    + P('M168 222c6-14 30-18 46-8-8 12-30 16-46 8z', '#FFF3C4')),

  L('mexung', 'แหม่ซึง ขนมถั่วงาเหนียวหนึบ', 'Mè xửng, chewy sesame and peanut sweets', ['me xung', 'แหม่ซึง', 'sesame candy', 'ขนมงา', 'peanut sweets', 'ขนมถั่ว', 'chewy squares', 'ขนมเหนียวสี่เหลี่ยม', 'hue gift box', 'ของฝากเว้'], nm('หาเมล็ดงาเล็กๆ บนขนม', 'Find the little sesame seeds on the sweets'),
    // a red gift box with its lid off showing rows of square chewy golden sweets dotted with sesame and peanuts, two wrapped in clear paper with twisted ends in front
    P('M30 96l20-16h140l20 16v100H30z', '#C62828') + R(42, 96, 156, 92, '#FFF3E0', 2, 3)
    + Array.from({ length: 6 }, (_, k) => { const x = 50 + (k % 3) * 50, y = 104 + Math.floor(k / 3) * 40; return R(x, y, 40, 32, '#E0A44A', 5, 3)
      + [[8, 8], [24, 10], [14, 20], [30, 24], [10, 26]].map(([dx, dy]) => E(x + dx, y + dy, 2.5, 1.5, '#FFF8E1', 0)).join('') + E(x + 20, y + 14, 4, 3, '#B0703A', 1.5); }).join('')
    + P('M24 58l20-12h152l20 12-6 10H30z', '#8E24AA') + Lc('M120 46v22', '#FFCA28', 5)
    + [[70, 212], [170, 212]].map(([x, y]) => R(x - 20, y - 12, 40, 24, '#E0A44A', 5) + P(`M${x - 20} ${y - 8}l-14-6v28l14-6zM${x + 20} ${y - 8}l14-6v28l-14-6z`, '#E1F5FE', 2.5)).join('') + face(100, 158, 0.36)),

  L('phoenix', 'นกฟีนิกซ์แกะสลักจากผักในสำรับหลวง', 'A phoenix carved from vegetables for a royal feast', ['royal cuisine', 'อาหารชาววัง', 'carved vegetable phoenix', 'นกฟีนิกซ์แกะสลักผัก', 'hue royal banquet', 'สำรับเลี้ยงหลวงเว้', 'carrot and cucumber', 'แครอทกับแตงกวา', 'fancy dish', 'จานประดิษฐ์'], nm('หาขนนกหางที่ทำจากแตงกวา', 'Find the tail feathers made of cucumber slices'),
    // a big round plate with a proud orange phoenix carved from carrot: a long curving neck, a crest of three curls, wings up, a huge sweeping tail of green cucumber feathers, radish flowers round it
    E(120, 190, 106, 30, '#FFFFFF') + E(120, 188, 90, 20, '#F3E5F5', 2)
    + [[96, -120], [70, -132], [40, -136], [112, -96]].map(([dx, dy]) => { const d = `M108 182c${dx * 0.3} ${dy * 0.2} ${dx * 0.7} ${dy * 0.7} ${dx} ${dy}c-12 6-16 20 -${dx * 0.6} ${-dy * 0.4}`; return P(d + 'z', '#9CCC65') + Lc(`M110 180l${dx * 0.85} ${dy * 0.85}`, '#558B2F', 2.5) + C(108 + dx, 182 + dy, 7, '#FFCA28', 2.5); }).join('')
    + P('M40 184c0-26 24-42 56-40 22 2 34 14 34 30-26 16-62 20-90 10z', '#FF8A3D') + P('M66 150c-14-20-12-44 6-58 12 10 14 34 6 58z', '#FFB74D')
    + Lc('M90 150c-6-30 4-56 -14-76', '#FF8A3D', 14) + C(70, 68, 16, '#FF8A3D') + Lc('M66 54c-6-14 0-24 10-26M72 52c2-14 12-20 22-18M60 58c-12-6-16-16-10-24', '#E53935', 4)
    + P('M54 70l-16 4 16 6z', '#FFCA28', 3) + C(68, 66, 3.5, INK, 0) + E(76, 74, 4, 2.5, '#FF8FA3', 0) + Lc('M54 168c14-8 32-10 48-4M60 178c14-6 30-6 44 0', '#E65100', 3)
    + [[40, 202], [196, 200], [176, 210]].map(([x, y]) => C(x, y, 8, '#F8BBD0', 2.5) + C(x, y, 3, '#FFFFFF', 0)).join('')),

  L('thanhtien', 'ดอกบัวกระดาษหมู่บ้านแทงเตียน', 'The bright paper lotus flowers of Thanh Tiên village', ['thanh tien paper flowers', 'ดอกไม้กระดาษแทงเตียน', 'paper lotus', 'ดอกบัวกระดาษ', 'craft village', 'หมู่บ้านหัตถกรรม', 'colourful paper petals', 'กลีบกระดาษหลากสี', 'bamboo stems', 'ก้านไม้ไผ่'], nm('หาดอกบัวกระดาษสีเหลือง', 'Find the yellow paper lotus'),
    // a round woven bamboo tray of bright paper lotus flowers in pink, yellow, red and purple with pointed layered petals on bamboo stems, curls of paper scraps around
    E(120, 196, 100, 24, '#D4A35A') + Lc('M30 196q90 20 180 0M40 206q80 16 160 0', '#A1752E', 2.5)
    + [[66, 150, '#F06292', '#F8BBD0'], [120, 132, '#FFCA28', '#FFF59D'], [174, 150, '#AB47BC', '#E1BEE7'], [92, 178, '#EF5350', '#FFCDD2'], [150, 180, '#26A69A', '#B2DFDB']].map(([x, y, a, b]) =>
      P(`M${x} ${y + 18}c-26-2-34-18-30-32 10 2 20 10 30 32 10-22 20-30 30-32 4 14-4 30-30 32z`, a) + P(`M${x} ${y + 16}c-12-10-14-28-6-40 6 4 8 10 6 40 0 0 2-30 6-40 8 12 6 30-6 40z`, b, 3)
      + P(`M${x} ${y + 14}c-6-12-6-26 0-36 6 10 6 24 0 36z`, a, 3)).join('')
    + Lc('M120 116v-18M66 134v-16M174 134v-16', '#8D6E63', 3) + face(120, 140, 0.32) + Lc('M20 120c10-10 20 0 10 10M214 112c-12-8-22 4-10 12', '#F06292', 3)),

  L('lotusseeds', 'ฝักบัวสดจากทะเลสาบติ่ญเติม', 'Fresh lotus seed pods from Tịnh Tâm lake', ['lotus seeds', 'เม็ดบัว', 'lotus pods', 'ฝักบัว', 'tinh tam lake', 'ทะเลสาบติ่ญเติม', 'hue lotus', 'บัวเว้', 'pink lotus flower', 'ดอกบัวชมพู'], nm('หาเม็ดบัวที่โผล่ออกมาจากรูฝักบัว', 'Find the seeds peeking out of the holes in the pod'),
    // a big flat green lotus pod with round holes and green seeds peeking out, smiling, a second pod on a stem, a pink lotus flower and a big round leaf behind, a few shelled white seeds
    P('M30 140c-10-60 50-110 110-96 50 12 80 60 66 100-30-10-60-30-80-40-30 10-60 30-96 36z', '#81C784') + Lc('M120 92l-60 24M120 92l40-30M120 92l70 20', '#4CAF50', 2.5)
    + Lc('M120 230v-80M184 230c0-30 10-50 20-70', '#689F38', 6) + lotus(196, 140, 1)
    + P('M70 150c0-30 22-50 50-50s50 20 50 50c0 8-22 14-50 14s-50-6-50-14z', '#9CCC65') + E(120, 152, 50, 14, '#AED581')
    + [[96, 150], [120, 146], [144, 150], [108, 158], [132, 158], [120, 154]].slice(0, 5).map(([x, y]) => E(x, y, 7, 4.5, '#558B2F', 2) + E(x, y - 1, 4, 2.5, '#C5E1A5', 0)).join('') + face(120, 126, 0.48)
    + [[40, 206], [56, 214], [72, 206]].map(([x, y]) => E(x, y, 8, 6, '#FFFDF5', 2.5)).join('')),

  L('dragonrobe', 'ฉลองพระองค์ลายมังกรสีเหลือง', 'The yellow dragon robe of the Huế court', ['dragon robe', 'เสื้อลายมังกร', 'long bao', 'ลองเบ่า', 'imperial yellow', 'สีเหลืองจักรพรรดิ', 'embroidered dragon', 'มังกรปักไหม', 'royal antiquities museum', 'พิพิธภัณฑ์โบราณวัตถุหลวง'], nm('หามังกรสีเขียวที่ปักอยู่บนเสื้อ', 'Find the green dragon sewn on the robe'),
    // a golden-yellow robe hung on a wooden stand: very wide bell sleeves hanging down, a round collar, a long flared body, an embroidered green dragon curling on the front, cloud swirls, rainbow wave stripes at the hem
    Lc('M24 46h192M120 46v-18', '#6D4C41', 7) + Lc('M120 222v8M84 230h72', '#6D4C41', 7)
    + P('M30 52c30-4 60-4 74 0h32c14-4 44-4 74 0l-6 92c-14 6-30 6-42 0l-8-50v128H86V94l-8 50c-12 6-28 6-42 0z', '#FBC02D') + P('M104 52c2 14 30 14 32 0', 'none', 4)
    + Lc('M36 132c14 4 28 4 40-2M164 130c12 6 26 6 40 2', '#42A5F5', 5)
    + [0, 1, 2].map((k) => Lc(`M88 ${214 - k * 7}h64`, ['#42A5F5', '#EF5350', '#66BB6A'][k], 5)).join('')
    + Lc('M104 184c-12-12 0-26 14-20s24-6 18-20-24-8-20-24', '#2E7D32', 9) + Lc('M104 184c-12-12 0-26 14-20s24-6 18-20-24-8-20-24', '#81C784', 4)
    + C(118, 92, 8, '#81C784', 3) + C(116, 90, 2, INK, 0) + P('M112 84l-4-8 8 4zM122 84l2-8 4 6z', '#81C784', 2)
    + [[56, 90], [184, 90], [146, 170]].map(([x, y]) => Lc(`M${x - 8} ${y}c0-8 8-8 8 0s8 8 8 0`, '#E65100', 3)).join('') + face(140, 128, 0.32)),

  L('ngubinh', 'เนินเขางือบิ่ญ ฉากบังตาของพระราชวัง', 'Ngự Bình, the flat-topped hill that screens the palace', ['ngu binh hill', 'เนินเขางือบิ่ญ', 'king\'s screen', 'ฉากบังตาของกษัตริย์', 'flat-topped hill', 'ภูเขายอดตัด', 'pine-covered hill', 'เนินต้นสน', 'view over hue', 'ชมวิวเมืองเว้'], nm('หายอดเขาที่แบนราบเหมือนโต๊ะ', 'Find the hilltop that is flat like a table'),
    // a green hill with a perfectly flat top shaped like a folding screen, dark pines on its slopes, a little lookout hut on top, a calm river curving in front
    P('M14 186c20-20 40-60 60-96h92c20 36 40 76 60 96z', '#7CB342') + R(70, 84, 100, 10, '#8BC34A', 3) + R(110, 66, 22, 18, '#FFE0B2', 0, 3) + P('M104 68l17-12 17 12z', '#795548')
    + [[52, 160], [80, 140], [112, 166], [150, 140], [184, 164], [96, 112], [138, 110]].map(([x, y]) => Lc(`M${x} ${y}v12`, '#6D4C41', 3) + P(`M${x - 9} ${y + 2}l9-18 9 18z`, '#2E7D32', 2.5)).join('')
    + P('M10 186c60 10 160 10 220 0v14c0 12-10 20-22 20H32c-12 0-22-8-22-20z', '#4FC3F7') + foam(40, 204, 50) + foam(140, 206, 50) + face(120, 120, 0.42)),
];

export default {
  places: {
    'vn-hue': { country: 'vn', wave: 3, name: nm('เว้', 'Huế'), tz: 'Asia/Ho_Chi_Minh', ll: [16.46, 107.59], alias: ['hue city', 'เมืองเว้', 'huế', 'HUI', 'perfume river', 'แม่น้ำหอม', 'Hue', 'thua thien', 'thừa thiên', 'thien mu', 'lang co', 'lăng cô'], colors: HU },
  },
  items,
};
