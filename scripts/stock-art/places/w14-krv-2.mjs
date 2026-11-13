// Wave 14, Vietnam: Nha Trang and Cam Ranh — the city stamp, two day scenes and the place's own landmarks, sea life and
// foods; the Po Nagar towers only as buildings (no deity), no theme park, no cable car, no mud bath, no basket boats,
// no bird's nests, no bánh căn (Đà Lạt has it), no generic reef or island-hopping boat
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NT = { k1: '#0277BD', k2: '#E65100', k3: '#E1F5FE' };
const CITY = 'vn-nhatrang', DIR = 'vn/nhatrang';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a Cham brick tower: a tall body with a dark arched door, then smaller and smaller tiers, a round tip (x = middle, y = foot, s = size)
const cham = (x, y, s, fill = '#C1694F') => R(x - 24 * s, y - 70 * s, 48 * s, 70 * s, fill, 0, 4) + P(`M${x - 9 * s} ${y}v${-26 * s}a${9 * s} ${12 * s} 0 0 1 ${18 * s} 0v${26 * s}z`, '#4E342E', 3)
  + P(`M${x - 30 * s} ${y - 70 * s}h${60 * s}l-6 ${-8 * s}h${-48 * s}z`, '#A1522E', 3) + R(x - 18 * s, y - 100 * s, 36 * s, 22 * s, fill, 0, 3.5) + R(x - 12 * s, y - 120 * s, 24 * s, 20 * s, fill, 0, 3)
  + P(`M${x - 8 * s} ${y - 120 * s}c0-12 ${4 * s}-${18 * s} ${8 * s}-${22 * s} ${4 * s} ${4 * s} ${8 * s} ${10 * s} ${8 * s} ${22 * s}z`, fill, 3);
// a palm tree (x = foot, s = size)
const palm = (x, y, s = 1) => Lc(`M${x} ${y}c${4 * s}-${30 * s} ${2 * s}-${54 * s} ${-6 * s}-${76 * s}`, '#8D6E63', 6 * s)
  + [[-34, 6], [-26, -14], [26, -12], [34, 8], [4, -26]].map(([dx, dy]) => P(`M${x - 6 * s} ${y - 76 * s}q${dx * 0.5 * s} ${(dy - 14) * s} ${dx * s} ${dy * s}q${-dx * 0.4 * s} ${-10 * s} ${-dx * s} ${-dy * s}z`, '#43A047', 3)).join('');
const foam = (x, y, w = 40, c = '#E1F5FE') => Lc(`M${x} ${y}q${w / 8} -5 ${w / 4} 0t${w / 4} 0t${w / 4} 0t${w / 4} 0`, c, 3);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับญาจาง', 'Nha Trang stamp'), kw: ['nha trang', 'ญาจาง', 'po nagar', 'ปอนาการ์', 'cham tower', 'ปราสาทจาม', 'nha trang bay', 'อ่าวญาจาง'],
    // the red-brick Po Nagar tower on its hill, the blue sea and a small island behind it, a sun
    svg: cityStamp('nt-st', { name: 'NHA TRANG', sub: 'KHANH HOA · VIETNAM', ...NT, emblem: C(132, 70, 9, '#FFCA28', 2.5) + R(52, 114, 96, 18, '#4FC3F7', 6, 2.5) + P('M118 116c4-10 12-14 22-12s14 6 16 12z', '#66BB6A', 2.5)
      + P('M54 140c10-14 30-20 46-20s36 6 46 20z', '#8BC34A', 2.5) + cham(88, 126, 0.55) + Lc('M58 122q6-4 12 0t12 0', '#E1F5FE', 2) }) },

  D('bay', 'ชายหาดยาวของอ่าวญาจาง', 'The long beach of Nha Trang Bay', ['nha trang beach', 'หาดญาจาง', 'tran phu beach', 'หาดเจิ่นฟู', 'nha trang bay', 'อ่าวญาจาง', 'seaside promenade', 'ถนนเลียบชายหาด', 'islands in the bay', 'เกาะในอ่าว'],
    // a curving pale beach with palm trees and umbrellas, tall hotels along the shore, a turquoise bay with green islands, a child with a bucket on the sand
    scene('nt-d1', '#B3E5FC', C(60, 50, 16, '#FFF59D', 3) + P('M118 96c10-16 30-22 52-18 16 4 26 10 30 18z', '#66BB6A') + P('M180 98c8-10 24-14 40-10l24 10z', '#81C784')
      + R(-4, 96, 248, 70, '#26C6DA') + foam(20, 120, 50) + foam(140, 132, 60)
      + [[14, 60, 26], [44, 44, 22], [70, 70, 20]].map(([x, h, w]) => R(x, 160 - h - 40, w, h, '#FFF8E1', 2, 3) + Lc(`M${x + w / 2} ${120 - h}v${h - 6}`, '#90CAF9', 4)).join('')
      + P('M-4 160c60-14 160-6 248 10v80H-4z', '#FFE0B2') + palm(30, 210, 0.9) + palm(206, 214, 0.85)
      + Lc('M150 214v-40', '#8D6E63', 3) + P('M124 176c6-14 46-14 52 0z', '#EF5350') + Lc('M134 176c4-8 10-12 16-12M166 176c-4-8-10-12-16-12', INK, 2)
      + C(96, 196, 11, '#FFE0B2', 3) + R(88, 206, 16, 18, '#FFCA28', 4, 3) + face(96, 196, 0.25) + P('M110 214l10 0-2 12h-6z', '#42A5F5', 2.5))),

  D('cairiver', 'ปราสาทปอนาการ์เหนือปากแม่น้ำก๊าย', 'The Po Nagar towers above the Cái River mouth', ['po nagar towers', 'ปราสาทปอนาการ์', 'cai river', 'แม่น้ำก๊าย', 'xom bong bridge', 'สะพานโสมบง', 'blue fishing boats', 'เรือประมงสีฟ้า', 'cham towers on a hill', 'ปราสาทจามบนเนินเขา'],
    // an orange evening sky, three red-brick Cham towers on a green hill on the left, a long low bridge over the river mouth, blue fishing boats moored below
    scene('nt-d2', '#FFCC80', C(186, 74, 22, '#FF7043', 3) + P('M-4 150c20-40 50-60 90-62 30 0 50 20 60 62z', '#7CB342')
      + cham(40, 104, 0.42) + cham(70, 98, 0.5) + cham(98, 106, 0.38) + R(-4, 150, 248, 100, '#4FC3F7')
      + R(96, 138, 148, 10, '#ECEFF1', 2) + [112, 140, 168, 196, 224].map((x) => R(x - 3, 148, 6, 14, '#CFD8DC', 0, 2.5)).join('')
      + [[46, 196, 1], [120, 214, 0.9], [184, 192, 0.8]].map(([x, y, s]) => P(`M${x - 34 * s} ${y}h${68 * s}l${-10 * s} ${16 * s}h${-48 * s}z`, '#1E88E5') + R(x - 10 * s, y - 14 * s, 20 * s, 14 * s, '#FFFFFF', 2, 2.5) + Lc(`M${x - 34 * s} ${y + 4}h${68 * s}`, '#EF5350', 3)).join('')
      + foam(10, 176, 40) + foam(150, 232, 50) + face(70, 76, 0.24))),

  L('ponagar', 'ปราสาทปอนาการ์', 'The Po Nagar Cham towers', ['po nagar', 'ปอนาการ์', 'thap ba', 'ทับบา', 'cham towers', 'ปราสาทจาม', 'red brick tower', 'หอคอยอิฐแดง', 'hilltop towers', 'ปราสาทบนเขา'], nm('หาประตูโค้งสีเข้มที่ฐานปราสาท', 'Find the dark arched doorway at the foot of the tower'),
    // a tall red-brick Cham tower in stepped tiers with a round tip and a dark arched door, a smaller tower beside it, brick stairs up the hill
    P('M10 218c30-24 70-34 110-34s80 10 110 34z', '#8BC34A') + cham(150, 196, 0.7, '#D07A55') + cham(96, 196, 1.15) + face(96, 146, 0.5)
    + [0, 1, 2, 3].map((k) => R(78 - k * 6, 196 + k * 6, 36 + k * 12, 6, '#BCAAA4', 0, 2.5)).join('')
    + Lc('M80 150h32M80 166h32', '#A1522E', 2)),

  L('mandapa', 'เสาอิฐแปดเหลี่ยมของศาลาปอนาการ์', 'The tall brick pillars of the Po Nagar hall', ['po nagar pillars', 'เสาปอนาการ์', 'mandapa hall', 'ศาลามณฑป', 'octagonal pillars', 'เสาแปดเหลี่ยม', 'cham ruins', 'ซากโบราณจาม', 'rows of columns', 'แถวเสาหิน'], nm('หาเสาต้นที่สั้นที่สุด', 'Find the shortest pillar'),
    // two rows of tall octagonal red-brick pillars standing on a low brick platform with no roof, one pillar shorter than the rest, a blue sky behind
    R(14, 190, 212, 24, '#BCAAA4', 3) + Lc('M14 202h212', '#A1887F', 2)
    + [[40, 72], [80, 60], [120, 64], [160, 60], [200, 72]].map(([x, h], k) => R(x - 10, 190 - h - 20, 20, h + 20, '#E59A79', 2) + Lc(`M${x} ${172 - h}v${h + 16}`, '#C1694F', 2)).join('')
    + [[60, 120], [100, 110], [140, 52], [180, 120]].map(([x, h]) => R(x - 12, 196 - h, 24, h, '#D07A55', 2) + Lc(`M${x} ${200 - h}v${h - 8}`, '#A1522E', 2) + R(x - 15, 192 - h, 30, 8, '#C1694F', 2, 3)).join('')
    + face(140, 162, 0.38)),

  L('honchong', 'โขดหินฮอนจง กับรอยมือยักษ์', 'Hòn Chồng rocks and the giant\'s handprint', ['hon chong', 'ฮอนจง', 'giant\'s handprint', 'รอยมือยักษ์', 'stacked boulders', 'โขดหินซ้อน', 'husband and wife rocks', 'หินผัวหินเมีย', 'rocky cape', 'แหลมหิน'], nm('หารอยมือใหญ่บนก้อนหิน', 'Find the big handprint on the rock'),
    // a pile of big round grey-brown boulders on the shore, the top one balanced on the others with a large hand-shaped dent on its face, waves splashing at the foot
    R(4, 186, 232, 40, '#4FC3F7', 12) + P('M20 196c0-30 20-44 50-40 24 4 34 20 30 40z', '#A1887F') + P('M150 196c0-26 16-38 40-36 22 2 34 18 30 36z', '#BCAAA4')
    + P('M70 168c-4-36 22-60 58-58 34 2 54 28 46 60-6 22-30 30-54 30-30 0-48-12-50-32z', '#BCAAA4') + E(96, 186, 40, 16, '#A1887F')
    + E(124, 78, 44, 36, '#D7CCC8')
    + P('M110 92c-4-10-2-20 2-22s6 6 6 14l0-24c0-6 8-6 8 0l0 22 2-24c0-6 8-6 8 0l0 24 4-16c2-6 8-4 8 2l-4 22 6-6c4-4 10 0 6 6l-10 12c-6 8-28 8-36-10z', '#A1887F', 3)
    + face(126, 140, 0.48) + foam(20, 212, 60) + foam(150, 214, 60) + P('M36 186l-8-10 14 2M200 182l10-12 4 14', 'none', 3)),

  L('tramhuong', 'หอคอยตรัมเฮืองรูปดอกบัวตูม', 'Trầm Hương Tower, the lotus bud by the beach', ['tram huong tower', 'หอคอยตรัมเฮือง', 'agarwood tower', 'หอไม้กฤษณา', 'lotus bud tower', 'หอคอยดอกบัวตูม', 'seafront square', 'ลานริมทะเล', 'beach promenade', 'ทางเดินเลียบหาด'], nm('หากลีบบัวที่ล้อมฐานหอคอย', 'Find the petals wrapped round the bottom of the tower'),
    // a white tower shaped like a closed lotus bud on a stem, wide green-and-white petals wrapped round its base, a round plaza and two palms
    E(120, 210, 104, 14, '#FFE0B2') + palm(30, 208, 0.75) + palm(212, 208, 0.7)
    + P('M120 30c-22 30-30 62-28 96h56c2-34-6-66-28-96z', '#FFFFFF') + Lc('M120 34v90M108 60c-4 22-4 44-2 64M132 60c4 22 4 44 2 64', '#E0E0E0', 3)
    + P('M76 184c-8-30 0-56 26-66 4 26 2 50-6 66z', '#A5D6A7') + P('M164 184c8-30 0-56-26-66-4 26-2 50 6 66z', '#A5D6A7')
    + P('M94 190c-6-30 6-58 26-70 20 12 32 40 26 70z', '#E8F5E9') + R(84, 186, 72, 14, '#BDBDBD', 4) + face(120, 156, 0.45) + C(120, 26, 5, '#FFCA28', 2.5)),

  L('cathedral', 'วิหารหินบนเนินเขาแห่งญาจาง', 'The grey stone cathedral on its little hill', ['nha trang cathedral', 'วิหารญาจาง', 'stone cathedral', 'วิหารหิน', 'mountain church', 'โบสถ์บนเขา', 'gothic bell tower', 'หอระฆังโกธิค', 'winding steps', 'ทางขึ้นคดเคี้ยว'], nm('หาหน้าต่างกลมสีสวยด้านหน้าโบสถ์', 'Find the round coloured window on the front'),
    // a grey stone Gothic church with a tall square bell tower and pointed spire at the front, a round rose window, pointed windows, on a rocky green hill with zigzag steps
    P('M8 222c20-30 60-44 112-44s92 14 112 44z', '#7CB342') + Lc('M120 222l-30-14 44-12-30-12', '#FFF8E1', 6)
    + R(54, 108, 132, 74, '#B0BEC5') + P('M48 112l72-30 72 30z', '#78909C') + R(96, 54, 48, 128, '#CFD8DC') + P('M94 56l26-42 26 42z', '#90A4AE') + C(120, 12, 4, '#FFCA28', 2)
    + C(120, 90, 13, '#4FC3F7', 3.5) + Lc('M107 90h26M120 77v26', '#FFCA28', 2) + P('M108 182v-26a12 14 0 0 1 24 0v26z', '#5D4037')
    + [66, 160].map((x) => P(`M${x} 170v-28a7 9 0 0 1 14 0v28z`, '#81D4FA', 3)).join('') + face(120, 132, 0.42)),

  L('bunsua', 'บุ๋นซื้อ ก๋วยเตี๋ยวแมงกะพรุนกับลูกชิ้นปลา', 'Bún sứa, noodle soup with jellyfish and fish cake', ['bun sua', 'บุ๋นซื้อ', 'jellyfish noodles', 'ก๋วยเตี๋ยวแมงกะพรุน', 'fish cake', 'ลูกชิ้นปลาแผ่น', 'bun cha ca', 'บุ๋นจ๋าก๋า', 'clear fish broth', 'น้ำซุปปลาใส'], nm('หาแมงกะพรุนใสๆ ในชาม', 'Find the clear jellyfish pieces in the bowl'),
    // a blue-rimmed bowl of clear broth with white rice noodles, slices of golden fish cake, see-through jellyfish strips, green dill and red chilli, chopsticks across
    P('M24 110h192c-4 56-44 92-96 92s-92-36-96-92z', '#FFFFFF') + Lc('M30 138q90 22 180 0', '#1E88E5', 5) + E(120, 110, 96, 22, '#FFF3C4')
    + Lc('M46 112q20-6 40 0t40 0t40 0t40 0M52 104q20-6 40 0t40 0t40 0', '#FFFFFF', 4)
    + [[72, 102], [104, 96], [160, 102]].map(([x, y]) => E(x, y, 15, 9, '#E0A44A', 3) + Lc(`M${x - 8} ${y}h16`, '#C17D2E', 2)).join('')
    + [[132, 110], [188, 108], [56, 116]].map(([x, y]) => P(`M${x - 12} ${y}c4-10 20-10 24 0-8 6-16 6-24 0z`, '#E1F5FE', 2.5)).join('')
    + Lc('M90 116l8-6M100 118l8-8M178 96l6-6', '#43A047', 3) + C(146, 96, 4, '#E53935', 2) + C(194, 98, 4, '#E53935', 2)
    + Lc('M150 60l72 40M160 52l70 42', '#A1887F', 6) + face(120, 158, 0.5)),

  L('lobster', 'กุ้งมังกรเกาะบิ่ญบา', 'A painted spiny lobster from Bình Ba island', ['binh ba lobster', 'กุ้งมังกรบิ่ญบา', 'spiny lobster', 'กุ้งมังกรหนาม', 'painted lobster', 'กุ้งมังกรเจ็ดสี', 'lobster island', 'เกาะกุ้งมังกร', 'long antennae', 'หนวดยาว'], nm('หาหนวดยาวสองเส้นของกุ้งมังกร', 'Find the lobster\'s two very long feelers'),
    // a spiny lobster seen from above with a blue-green shell spotted with white and orange bands, two very long curving antennae, banded legs and a fan tail, smiling
    Lc('M104 86C70 50 40 30 14 30M136 86c34-36 64-56 90-56', '#E65100', 6) + Lc('M108 84c-14-16-20-30-18-44M132 84c14-16 20-30 18-44', '#FFB74D', 4)
    + [-1, 1].map((s) => [0, 1, 2, 3].map((k) => Lc(`M${120 + s * 26} ${112 + k * 14}l${s * 30} ${-6 + k * 8}l${s * 8} 14`, '#26A69A', 4)).join('')).join('')
    + E(120, 120, 30, 40, '#26A69A') + [[110, 104], [130, 104], [120, 122], [106, 138], [134, 138]].map(([x, y]) => C(x, y, 4, '#E0F2F1', 0)).join('')
    + [0, 1, 2, 3].map((k) => R(98 + k * 2, 158 + k * 12, 44 - k * 4, 12, k % 2 ? '#26A69A' : '#4DB6AC', 4, 3.5)).join('') + Lc('M100 170h40M104 182h32', '#FFB74D', 2.5)
    + P('M104 206c-14 4-22 14-20 24 14 0 26-6 36-14 10 8 22 14 36 14 2-10-6-20-20-24z', '#4DB6AC') + face(120, 100, 0.48)),

  L('banhhoi', 'บั๋นฮ้อย เส้นขนมจีนสานเป็นแผ่น', 'Bánh hỏi, little woven mats of rice noodles', ['banh hoi', 'บั๋นฮ้อย', 'woven rice vermicelli', 'เส้นหมี่สานเป็นแผ่น', 'scallion oil', 'น้ำมันต้นหอม', 'banana leaf plate', 'ใบตองรองจาน', 'roast pork slices', 'หมูย่างหั่นชิ้น'], nm('หาแผ่นเส้นหมี่ที่สานเป็นตาราง', 'Find the noodle mats woven like little grids'),
    // a banana leaf on a plate with six little square mats of fine white woven rice noodles, each dotted with green scallion oil, a few roast pork slices and a dipping sauce bowl
    E(120, 166, 106, 42, '#FFFFFF') + P('M30 164c20-40 140-50 180-6-30 26-150 34-180 6z', '#66BB6A') + Lc('M40 162c50-10 110-12 160-6', '#388E3C', 2.5)
    + [[66, 140], [104, 134], [142, 136], [80, 170], [118, 166], [156, 166]].map(([x, y]) => R(x - 16, y - 12, 32, 24, '#FFFDF5', 4, 3)
      + Lc(`M${x - 12} ${y - 4}h24M${x - 12} ${y + 4}h24M${x - 6} ${y - 10}v20M${x + 6} ${y - 10}v20`, '#E0D6C8', 1.5) + C(x - 6, y - 4, 2.5, '#7CB342', 0) + C(x + 5, y + 4, 2.5, '#7CB342', 0)).join('')
    + E(196, 116, 22, 12, '#FFFFFF') + E(196, 114, 16, 6, '#FF8A65', 2.5) + P('M170 186c6-6 20-6 26 0l-4 8h-18z', '#C0784A', 3) + face(118, 166, 0.3)),

  L('nemnuong', 'แหนมเนืองนิญฮหว่าแบบห่อเอง', 'Ninh Hòa nem nướng to roll yourself', ['nem nuong', 'แหนมเนือง', 'ninh hoa', 'นิญฮหว่า', 'grilled pork rolls', 'หมูย่างห่อแผ่นแป้ง', 'rice paper', 'แผ่นแป้งเวียดนาม', 'orange dipping sauce', 'น้ำจิ้มสีส้ม'], nm('หาถ้วยน้ำจิ้มสีส้ม', 'Find the little bowl of orange sauce'),
    // a round rice paper sheet with a roll being made on it: pink-brown grilled pork pieces, green herbs, crispy yellow stick, cucumber; a stack of round rice papers and an orange sauce bowl beside
    E(100, 160, 84, 50, '#FFF8E1', 3) + Lc('M30 150q70 20 140 0M34 170q66 18 132 0', '#F0E1C0', 2)
    + [[72, 150], [96, 146], [120, 150]].map(([x, y]) => E(x, y, 13, 8, '#C9725A', 3) + Lc(`M${x - 6} ${y - 2}l4 4M${x + 2} ${y - 3}l4 4`, '#8D3E2A', 2)).join('')
    + P('M58 168c10-12 30-14 44-6-10 10-30 14-44 6z', '#7CB342') + P('M106 170c8-10 24-12 36-4-8 8-24 10-36 4z', '#9CCC65') + R(70, 176, 70, 8, '#FFCA28', 4, 2.5) + R(124, 158, 30, 8, '#C5E1A5', 3, 2.5)
    + [0, 1, 2].map((k) => E(190, 92 - k * 6, 34, 12, '#FFFDF5', 3)).join('') + P('M170 160h44c0 22-10 32-22 32s-22-10-22-32z', '#FFFFFF') + E(192, 160, 22, 6, '#FF7043', 3)
    + face(96, 128, 0.4)),

  L('bone', 'บ่อเน่ เนื้อสเต๊กบนกระทะเหล็กรูปวัว', 'Bò né, sizzling beef on a cow-shaped iron pan', ['bo ne', 'บ่อเน่', 'sizzling beef', 'เนื้อกระทะร้อน', 'cow-shaped pan', 'กระทะรูปวัว', 'vietnamese breakfast', 'อาหารเช้าเวียดนาม', 'fried egg and pate', 'ไข่ดาวกับปาเต'], nm('หาหูวัวสองข้างของกระทะ', 'Find the two cow ears on the pan'),
    // a black iron pan shaped like a cow's head with ears and horns on a wooden board, a beef steak, a sunny fried egg, pâté and onion rings sizzling on it, steam
    R(18, 184, 204, 22, '#A1887F', 8) + P('M42 92l-18-12 8 26zM198 92l18-12-8 26z', '#37474F') + P('M60 84l-6-22 18 12zM180 84l6-22-18 12z', '#ECEFF1', 3)
    + P('M46 96c0-14 12-22 30-22h88c18 0 30 8 30 22v54c0 26-34 42-74 42s-74-16-74-42z', '#37474F') + P('M58 104c0-10 8-16 20-16h84c12 0 20 6 20 16v44c0 20-28 32-62 32s-62-12-62-32z', '#263238', 3)
    + P('M70 112c10-8 34-10 46 0 6 8 2 26-14 30-18 4-34-4-36-14z', '#8D4A2B') + E(140, 124, 26, 22, '#FFFFFF') + C(140, 122, 10, '#FFB300', 3)
    + E(104, 160, 16, 8, '#D7A27A', 3) + C(146, 162, 9, 'none', 3) + C(160, 156, 7, 'none', 3) + face(120, 92, 0.36)
    + Lc('M84 60c-6-10 6-14 0-24M156 60c-6-10 6-14 0-24', '#B0BEC5', 3)),

  L('whaleskeleton', 'โครงกระดูกวาฬในพิพิธภัณฑ์สมุทรศาสตร์', 'The big whale skeleton at the Oceanographic Museum', ['whale skeleton', 'โครงกระดูกวาฬ', 'oceanographic museum', 'พิพิธภัณฑ์สมุทรศาสตร์', 'institute of oceanography', 'สถาบันสมุทรศาสตร์', 'humpback whale bones', 'กระดูกวาฬหลังค่อม', 'sea science', 'วิทยาศาสตร์ทะเล'], nm('หาซี่โครงโค้งๆ ของวาฬ', 'Find the whale\'s curved ribs'),
    // a long whale skeleton hanging in a pale yellow hall: a big smiling skull, a curved spine of small bones, rows of curved ribs, two flipper bones and a tail
    R(8, 30, 224, 190, '#FFF3C4', 14) + [40, 120, 200].map((x) => P(`M${x - 20} 220v-60a20 24 0 0 1 40 0v60z`, '#FFE082', 3)).join('') + R(8, 208, 224, 12, '#D7CCC8', 4, 3)
    + Lc('M40 40v24M200 40v24', '#8D6E63', 2.5)
    + P('M20 84c0-16 18-24 44-22l26 4c4 14 0 26-10 30l-30 2c-20 0-30-6-30-14z', '#FFFDF5') + C(70, 78, 4, INK, 0) + E(62, 88, 5, 3, '#FF8FA3', 0)
    + `<path d="M90 76c40-8 80-6 130 6" fill="none" stroke="${INK}" stroke-width="9" stroke-dasharray="7 4"/><path d="M90 76c40-8 80-6 130 6" fill="none" stroke="#FFFDF5" stroke-width="5" stroke-dasharray="7 4"/>`
    + [100, 118, 136, 154, 172].map((x, k) => { const d = `M${x} 74c-8 18-6 36 4 ${52 - k * 6}`; return Lc(d, INK, 12) + Lc(d, '#FFFDF5', 6); }).join('')
    + P('M108 116c-6 14-18 24-30 26 4-12 14-22 26-28z', '#FFFDF5') + P('M206 82l20-14 2 30z', '#FFFDF5')),

  L('butterflyfish', 'ปลาผีเสื้อแถวเกาะฮอนมุน', 'A butterflyfish at Hòn Mun', ['butterflyfish', 'ปลาผีเสื้อ', 'hon mun', 'เกาะฮอนมุน', 'marine park', 'อุทยานทางทะเล', 'eye spot fish', 'ปลาจุดตาปลอม', 'snorkelling', 'ดำน้ำตื้น'], nm('หาจุดดำกลมที่หางปลาแกล้งทำเป็นตา', 'Find the black spot near its tail that looks like an eye'),
    // a flat round yellow-and-white butterflyfish with a pointy snout, black bands through its eye, a black eye spot near its tail, swimming past a branch of pink coral
    P('M150 220c-6-30 4-60 18-80M168 180c14-8 26-6 36 4M160 160c-14-10-26-8-34 2', 'none', 10) + Lc('M150 220c-6-30 4-60 18-80M168 180c14-8 26-6 36 4M160 160c-14-10-26-8-34 2', '#F48FB1', 6)
    + P('M58 110c0-40 30-66 66-66 40 0 66 30 66 66s-26 66-66 66c-36 0-66-26-66-66z', '#FFF59D') + P('M190 110l30-22v44z', '#FFEB3B')
    + P('M58 110l-26-8 0 16z', '#FFE082') + Lc('M80 56c-8 36-8 72 0 108', '#37474F', 9) + Lc('M126 44c-6 44-6 88 0 132M160 52c-4 36-4 80 0 116', '#FFCA28', 5)
    + C(170, 132, 9, INK, 3) + C(170, 132, 3, '#FFFFFF', 0) + C(78, 100, 9, '#FFFFFF', 3) + C(78, 101, 5, INK, 0) + C(76, 99, 2, '#FFFFFF', 0) + E(84, 120, 6, 4, '#FF8FA3', 0)
    + P('M68 124q6 5 12 0', 'none', 3) + C(30, 60, 6, '#E1F5FE', 2) + C(42, 40, 4, '#E1F5FE', 2)),

  L('mandarinfish', 'ปลาแมนดารินลายสีรุ้ง', 'A rainbow-patterned mandarinfish', ['mandarinfish', 'ปลาแมนดาริน', 'dragonet', 'ปลามังกรน้อย', 'rainbow fish', 'ปลาสีรุ้ง', 'coral reef at dusk', 'แนวปะการังยามเย็น', 'nha trang reef', 'แนวปะการังญาจาง'], nm('หาลายเส้นสีส้มหยักๆ บนตัวปลา', 'Find the wiggly orange lines on the fish'),
    // a small round-headed blue fish covered in wiggly orange stripes, big fan fins edged in blue and orange, big round eyes, sitting on a rock with tiny bubbles above
    P('M24 210c20-24 60-34 96-30 40 4 80 14 100 30z', '#B39DDB') + P('M150 132c30-26 60-24 74-4-16 10-40 16-74 14z', '#FF7043') + P('M84 104c-8-34 10-58 34-62 4 22-6 46-18 62z', '#29B6F6')
    + E(110, 136, 70, 40, '#1E88E5') + Lc('M60 120q12 10 24 0t24 0t24 0M54 140q12 10 24 0t24 0t24 0t24 0M64 158q12 10 24 0t24 0t24 0', '#FF9800', 4)
    + P('M80 168c-10 14-24 22-40 20 6-14 18-22 34-26z', '#29B6F6') + C(64, 110, 13, '#FFFFFF', 3) + C(66, 112, 7, INK, 0) + C(64, 108, 2.5, '#FFFFFF', 0)
    + E(52, 132, 6, 4, '#FF8FA3', 0) + P('M48 142q6 6 12 2', 'none', 3) + C(40, 60, 6, '#E1F5FE', 2) + C(56, 40, 4, '#E1F5FE', 2)),

  L('moray', 'ปลาไหลมอเรย์โผล่จากซอกหิน', 'A moray eel peeking out of the rocks', ['moray eel', 'ปลาไหลมอเรย์', 'eel in the rocks', 'ปลาไหลในซอกหิน', 'reef animals', 'สัตว์แนวปะการัง', 'diving spot', 'จุดดำน้ำ', 'spotted eel', 'ปลาไหลลายจุด'], nm('หาปากของปลาไหลที่อ้าออก', 'Find the eel\'s open mouth'),
    // a spotted yellow-green moray eel curving up out of a hole between rounded rocks, its mouth open in a friendly "o", big eyes, a little cleaner shrimp on the rock
    P('M14 220c4-50 30-80 70-80 30 0 40 30 34 80z', '#90A4AE') + P('M118 220c-4-46 20-70 54-70 34 0 54 26 54 70z', '#B0BEC5') + E(114, 214, 26, 14, '#37474F')
    + P('M100 214c-6-50 0-100 30-130 18-18 48-16 60 2 10 18 2 40-20 44-18 4-30 18-32 40-2 16 0 32 4 44z', '#C0CA33')
    + [[134, 92], [160, 82], [118, 140], [112, 180], [150, 104], [126, 116], [104, 200]].map(([x, y]) => C(x, y, 4, '#558B2F', 0)).join('')
    + C(168, 92, 7, '#FFFFFF', 3) + C(169, 93, 3.5, INK, 0) + E(190, 104, 9, 7, '#E53935', 3) + E(160, 108, 6, 4, '#FF8FA3', 0)
    + P('M200 152c8-6 18-4 20 2-6 4-14 4-20-2z', '#FF7043', 2.5) + Lc('M216 150l10-10M218 152l12-4', '#FF7043', 2) + C(196, 60, 5, '#E1F5FE', 2)),

  L('muidoi', 'แหลมมุยโด่ย จุดตะวันออกสุดของเวียดนาม', 'Mũi Đôi, the most easterly point of Vietnam', ['mui doi', 'แหลมมุยโด่ย', 'easternmost point', 'จุดตะวันออกสุด', 'first sunrise', 'พระอาทิตย์ขึ้นก่อนใคร', 'van phong bay', 'อ่าววันฟอง', 'rocky cape hike', 'เดินป่าขึ้นแหลมหิน'], nm('หาหลักหินเล็กๆ บนยอดแหลม', 'Find the little stone marker on the tip of the cape'),
    // a jagged rocky cape sticking out into the sea, a small square stone marker post on its tip, a big orange sun rising out of the sea beyond, a child waving on the rocks
    C(170, 112, 34, '#FF8A65') + P('M12 112h216v74c0 20-14 32-34 32H46c-20 0-34-12-34-32z', '#4FC3F7') + Lc('M150 124h44M158 136h28', '#FFCCBC', 3)
    + P('M12 200c0-30 10-52 30-62l18 8 20-22 22 14 16-10 18 22 14 6 8 10c-30 16-60 40-90 58l-28 0c-16 0-28-10-28-24z', '#A1887F')
    + P('M60 150l12-8 10 16-16 4zM98 144l12 4-6 14zM40 176l14-6 4 14z', '#8D6E63', 3)
    + R(122, 128, 14, 24, '#ECEFF1', 2) + P('M118 128h22l-4-8h-14z', '#CFD8DC', 3)
    + C(80, 102, 11, '#FFE0B2', 3) + R(72, 112, 16, 18, '#FFCA28', 4, 3) + Lc('M88 114l12-14', '#FFE0B2', 4) + face(80, 102, 0.25) + foam(150, 168, 50) + foam(150, 196, 50)),

  L('chuoinuong', 'จุ๋ยเนื้อง กล้วยห่อข้าวเหนียวย่าง', 'Chuối nướng, grilled banana in sticky rice', ['chuoi nuong', 'จุ๋ยเนื้อง', 'grilled banana', 'กล้วยย่าง', 'sticky rice wrap', 'ข้าวเหนียวห่อกล้วย', 'coconut sauce', 'น้ำกะทิราด', 'roasted peanuts', 'ถั่วลิสงคั่ว'], nm('หากล้วยสีเหลืองข้างในที่ผ่าครึ่ง', 'Find the yellow banana inside the cut piece'),
    // two charred banana-leaf parcels on a little grill, one cut open showing white sticky rice round a yellow banana, drizzled with white coconut sauce and crushed peanuts
    R(26, 172, 188, 10, '#424242', 4) + Lc('M40 182v26M200 182v26', '#424242', 6) + E(120, 186, 80, 8, '#FF7043', 0)
    + P('M30 148c0-14 10-22 26-22h70c14 0 20 10 18 22-2 12-10 20-24 20H52c-14 0-22-8-22-20z', '#6D8B3A') + Lc('M52 132l-6 32M84 130l-4 36M116 132l-4 32', '#3E5A1E', 3)
    + P('M120 118c0-16 14-28 36-28h20c22 0 36 12 36 28s-14 28-36 28h-20c-22 0-36-12-36-28z', '#FFFFFF') + P('M140 118c0-8 10-14 24-14h12c14 0 22 6 22 14s-8 14-22 14h-12c-14 0-24-6-24-14z', '#FFD54F')
    + Lc('M126 104c10 8 20 22 22 40M168 92c4 10 0 20 10 30M196 104c-4 12-2 22 6 30', '#FFF8E1', 5) + [[150, 96], [176, 100], [196, 116], [132, 128]].map(([x, y]) => R(x - 3, y - 3, 6, 6, '#C68B4A', 1, 1.5)).join('')
    + face(170, 118, 0.38)),

  L('grasshopper', 'ตั๊กแตนสานจากใบมะพร้าว', 'A grasshopper woven from a coconut leaf', ['coconut leaf grasshopper', 'ตั๊กแตนใบมะพร้าว', 'woven toy', 'ของเล่นสาน', 'beach seller', 'คนขายของริมหาด', 'palm leaf craft', 'งานสานใบปาล์ม', 'green grasshopper', 'ตั๊กแตนสีเขียว'], nm('หาขายาวๆ สองข้างที่พับเป็นมุม', 'Find the two long folded back legs'),
    // a cute green grasshopper made of folded coconut-leaf strips: a long woven body with criss-cross weave, a round head with big eyes, long antennae and folded back legs, on a stick
    Lc('M120 230v-56', '#A1887F', 6) + Lc('M96 128l-40-50 40 74M150 130l44-50-36 76', '#7CB342', 8) + Lc('M96 128l-40-50 40 74M150 130l44-50-36 76', '#AED581', 3)
    + P('M60 150c0-20 30-32 70-32s70 12 70 32-30 32-70 32-70-12-70-32z', '#9CCC65') + Lc('M84 124l20 52M112 120l20 60M140 120l20 58M168 124l18 48', '#689F38', 3) + Lc('M70 140l120 28M70 160l120-24', '#C5E1A5', 3)
    + C(52, 140, 24, '#AED581') + C(44, 132, 7, '#FFFFFF', 3) + C(44, 133, 3.5, INK, 0) + E(56, 152, 6, 4, '#FF8FA3', 0) + P('M36 150q6 5 12 0', 'none', 3)
    + Lc('M44 116c-6-26-20-40-34-44M58 116c2-30 12-46 26-52', '#558B2F', 3) + Lc('M84 178l-12 30M104 180l-4 30', '#7CB342', 5)),
];

export default {
  places: {
    'vn-nhatrang': { country: 'vn', wave: 3, name: nm('ญาจาง', 'Nha Trang'), tz: 'Asia/Ho_Chi_Minh', ll: [12.24, 109.19], alias: ['nha trang', 'ญาจาง', 'นาตรัง', 'CXR', 'cam ranh', 'กามรัญ', 'khanh hoa', 'khánh hòa', 'po nagar', 'hon chong', 'binh ba'], colors: NT },
  },
  items,
};
