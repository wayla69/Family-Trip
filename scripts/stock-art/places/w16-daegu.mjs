// Wave 16, Korea: Daegu — the city stamp, two day scenes (Seomun night market, the azalea hills of Biseulsan) and the city's
// own landmarks and foods: the 83 Tower, the Line 3 sky monorail, the Ayang railway bridge, Suseong Lake's music fountain,
// the herbal medicine market, the governor's hall, The ARC, Apsan at night, the stamping football ground, Seomun's silk,
// E-World's winter lights and Daegu's own dishes. No temples or Buddha images (Palgongsan's Donghwasa and Gatbawi are left
// out), no beer (the Chimac festival is left out), no real people (the Kim Gwang-seok street is left out), no club logos.
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const DG = { k1: '#C62828', k2: '#1565C0', k3: '#FFF1E6' };
const CITY = 'kr-daegu', DIR = 'kr/daegu';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a Daegu hanok roof: a long ridge, the eaves sweeping up at both tips (cx = middle, y = eave line, w = half width, h = height)
const hroof = (cx, y, w, h, fill = '#4E5B66', sw) => P(`M${cx - w} ${y - h * 0.5}C${cx - w * 0.8} ${y + 2} ${cx - w * 0.6} ${y} ${cx - w * 0.5} ${y}H${cx + w * 0.5}C${cx + w * 0.6} ${y} ${cx + w * 0.8} ${y + 2} ${cx + w} ${y - h * 0.5}C${cx + w * 0.8} ${y - h * 0.7} ${cx + w * 0.6} ${y - h} ${cx + w * 0.45} ${y - h}H${cx - w * 0.45}C${cx - w * 0.6} ${y - h} ${cx - w * 0.8} ${y - h * 0.7} ${cx - w} ${y - h * 0.5}z`, fill, sw);
// a little child in a padded winter jacket and a bobble hat (x = middle, y = head, s = scale)
const tot = (x, y, s, coat, hat) => P(`M${x - 15 * s} ${y + 50 * s}l${3 * s} ${-34 * s}h${24 * s}l${3 * s} ${34 * s}z`, coat, 3) + R(x - 12 * s, y + 48 * s, 9 * s, 10 * s, '#5C6BC0', 3, 2.5) + R(x + 3 * s, y + 48 * s, 9 * s, 10 * s, '#5C6BC0', 3, 2.5)
  + C(x, y, 14 * s, '#FFE0B2', 3) + P(`M${x - 15 * s} ${y - 3 * s}c0-18 30-18 30 0z`, hat, 3) + C(x, y - 15 * s, 5 * s, '#FFFFFF', 2.5) + face(x, y + 3 * s, 0.3 * s);
// a scalloped flower blob (azalea, blossom cloud): n round petals on a ring
const bloom = (x, y, r, fill, n = 5) => Array.from({ length: n }, (_, k) => { const a = (k / n) * Math.PI * 2; return C(x + Math.cos(a) * r * 0.6, y + Math.sin(a) * r * 0.6, r * 0.55, fill, 2.5); }).join('') + C(x, y, r * 0.3, '#FFF59D', 2);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับแทกู', 'Daegu stamp'), kw: ['daegu', 'แทกู', '83 tower', 'หอคอย 83 ทาวเวอร์', 'duryu park', 'สวนทูรยู', 'cherry blossoms', 'ดอกซากุระ', 'daegu apples', 'แอปเปิลแทกู'],
    // the slim 83 Tower with its round blue lookout pod and spire rising out of pink cherry-blossom clouds, a red apple at its foot
    svg: cityStamp('dg-st', { name: 'DAEGU', sub: 'SOUTH KOREA', ...DG, emblem: R(96, 58, 8, 22, '#ECEFF1', 3, 2.5) + P('M92 146l4-62h8l4 62z', '#ECEFF1') + R(88, 74, 24, 10, '#1565C0', 4)
      + E(100, 90, 20, 8, '#90CAF9') + Lc('M84 90h32', '#E3F2FD', 2) + C(100, 54, 4, '#C62828', 2.5)
      + bloom(76, 134, 16, '#F8BBD0', 6) + bloom(124, 136, 15, '#F48FB1', 6) + C(128, 114, 8, '#E53935', 2.5) + P('M128 106c2-6 8-8 12-6-2 6-8 8-12 6z', '#66BB6A', 2) }) },

  D('seomun', 'ตลาดกลางคืนซอมุน', 'Seomun Night Market', ['seomun night market', 'ตลาดกลางคืนซอมุน', 'seomun market', 'ตลาดซอมุน', 'street food stalls', 'แผงอาหารข้างทาง', 'night market', 'ตลาดกลางคืน', 'daegu night', 'แทกูยามค่ำ'],
    // a deep blue night sky with a moon, a string of round glowing lanterns, a row of food stalls with red-and-white striped awnings and a steaming pan, a child in a bobble hat
    scene('dg-d1', '#3949AB', C(196, 54, 16, '#FFF59D', 3) + C(204, 48, 12, '#3949AB', 0) + Lc('M-4 64q60 28 124 6t124 4', '#FFFFFF', 2)
      + [[20, 72, '#FFCA28'], [56, 82, '#FF7043'], [96, 80, '#FFCA28'], [136, 70, '#FF7043'], [176, 70, '#FFCA28'], [214, 74, '#FF7043']].map(([x, y, c]) => C(x, y + 12, 10, c, 3) + Lc(`M${x} ${y}v2`, INK, 3)).join('')
      + R(-4, 188, 248, 60, '#5D4037') + [[10, '#E53935'], [86, '#1E88E5'], [162, '#E53935']].map(([x, c]) => R(x, 140, 70, 54, '#FFF3E0', 0, 3)
        + P(`M${x - 6} 142l8-24h54l8 24z`, '#FFFFFF') + Lc(`M${x + 8} 120l-4 20M${x + 26} 120l-2 20M${x + 44} 120l2 20M${x + 62} 120l4 20`, c, 6) + R(x + 6, 166, 58, 12, '#FFCC80', 2, 2.5)).join('')
      + E(120, 162, 24, 7, '#37474F') + Array.from({ length: 4 }, (_, k) => E(108 + k * 8, 159, 4, 2.5, '#FFB74D', 1.5)).join('') + Lc('M112 148c-6-8 6-12 0-20M128 148c-6-8 6-12 0-20', '#E3F2FD', 3)
      + face(45, 160, 0.32) + tot(120, 188, 0.5, '#EC407A', '#FFCA28'))),

  D('biseulsan', 'ทุ่งดอกอาซาเลียบนภูเขาพีซึลซาน', 'Pink azalea hills on Biseulsan', ['biseulsan', 'ภูเขาพีซึลซาน', 'azalea fields', 'ทุ่งดอกอาซาเลีย', 'jindallae', 'ดอกชินดัลแร', 'spring hike', 'เดินเขาหน้าใบไม้ผลิ', 'pink mountain', 'ภูเขาสีชมพู', 'dalseong', 'ทัลซอง'],
    // a pale blue sky, a rocky grey summit, whole slopes covered in round pink and magenta azalea bushes, a wooden boardwalk zigzagging up through them
    scene('dg-d2', '#B3E5FC', C(52, 52, 16, '#FFF59D', 3) + P('M-4 150c40-30 70-60 100-80l14-10 12 8 12-6c30 20 70 50 110 80v100H-4z', '#9CCC65')
      + P('M96 70l14-10 12 8 12-6 10 18c-14 6-34 8-48 0z', '#B0BEC5') + Lc('M112 68l4 10M128 70l-2 10', '#78909C', 2.5)
      + [[30, 152, 16, '#F06292'], [62, 130, 14, '#EC407A'], [150, 116, 13, '#F48FB1'], [186, 140, 16, '#EC407A'], [214, 166, 14, '#F06292'], [20, 196, 18, '#F48FB1'], [70, 176, 16, '#F06292'], [170, 186, 18, '#F48FB1'], [216, 214, 16, '#EC407A'], [110, 214, 16, '#EC407A']]
        .map(([x, y, r, c]) => bloom(x, y, r, c, 6)).join('')
      + P('M116 246l-4-28 30-12-24-16 22-14-14-12 10-10h10l-6 12 16 12-22 14 24 16-30 12 4 28z', '#D7A86E') + face(196, 140, 0.32))),

  L('tower83', 'หอคอย 83 ทาวเวอร์กับดอกซากุระ', 'The 83 Tower among the cherry blossoms', ['83 tower', 'หอคอย 83 ทาวเวอร์', 'woobang tower', 'หอคอยอูบัง', 'duryu park', 'สวนทูรยู', 'cherry blossoms', 'ดอกซากุระ', 'observation tower', 'หอคอยชมวิว'], nm('หาลูกบอลชมวิวสีฟ้าบนยอดหอคอย', 'Find the round blue lookout near the top of the tower'),
    // a tall slim white tower on a wide foot, a round blue lookout pod with a row of windows near the top and a thin red-tipped spire, fluffy pink cherry trees on both sides
    R(114, 14, 12, 30, '#ECEFF1', 4) + C(120, 12, 6, '#E53935', 3) + P('M108 200l6-120h12l6 120z', '#FAFAFA') + P('M92 214c8-10 18-16 28-16s20 6 28 16z', '#CFD8DC')
    + R(98, 40, 44, 14, '#1565C0', 6) + E(120, 66, 34, 16, '#90CAF9') + Array.from({ length: 5 }, (_, k) => R(96 + k * 10, 60, 7, 8, '#E3F2FD', 2, 2.5)).join('') + face(120, 112, 0.42)
    + [[52, 156], [188, 156]].map(([x, y]) => Lc(`M${x} ${y + 26}v34`, '#6D4C41', 8) + bloom(x, y, 46, '#F8BBD0', 7)).join('') + C(40, 214, 6, '#F8BBD0', 2) + C(198, 220, 6, '#F8BBD0', 2)),

  L('monorail', 'รถไฟฟ้าโมโนเรลสาย 3 ลอยฟ้า', 'The Line 3 sky monorail', ['daegu metro line 3', 'รถไฟฟ้าสาย 3', 'sky rail', 'รถไฟลอยฟ้า', 'monorail', 'โมโนเรล', 'frosted windows', 'กระจกขุ่นอัตโนมัติ', 'seomun market station', 'สถานีตลาดซอมุน'], nm('หาหน้าต่างที่เปลี่ยนเป็นสีขาวขุ่นเองได้', 'Find the windows that turn frosty white by themselves'),
    // a short white monorail train with a pale green stripe riding on top of a single concrete beam held up by T-shaped pillars, half its windows clear blue and half frosty white, a block of flats behind
    R(150, 34, 70, 100, '#FFE0B2', 2) + Array.from({ length: 6 }, (_, k) => R(160 + (k % 2) * 30, 46 + Math.floor(k / 2) * 28, 20, 16, '#FFF8E1', 2, 2.5)).join('')
    + R(10, 154, 220, 18, '#CFD8DC', 3) + [50, 170].map((x) => R(x - 9, 172, 18, 52, '#B0BEC5', 2) + R(x - 22, 168, 44, 10, '#B0BEC5', 3, 3)).join('')
    + P('M22 154v-42c0-22 14-34 36-34h132c14 0 22 8 22 20v56z', '#FAFAFA') + R(22, 132, 190, 10, '#9CCC65', 0, 3)
    + [[40, '#4FC3F7'], [80, '#4FC3F7'], [120, '#ECEFF1'], [160, '#ECEFF1']].map(([x, c]) => R(x, 92, 30, 28, c, 5, 3)).join('')
    + [[126, 100], [140, 108], [170, 98], [182, 110]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('') + R(194, 96, 14, 32, '#90CAF9', 4, 3) + face(66, 108, 0.36)),

  L('ayanggyo', 'สะพานรถไฟเก่าอายังกโย', 'Ayanggyo, the old railway bridge walk', ['ayanggyo', 'อายังกโย', 'ayang railway bridge', 'สะพานรถไฟอายัง', 'ayang gichatgil', 'ทางเดินรถไฟอายัง', 'geumho river', 'แม่น้ำคึมโฮ', 'glass floor', 'พื้นกระจก'], nm('หาพื้นกระจกที่มองเห็นแม่น้ำข้างล่าง', 'Find the glass floor where you can see the river below'),
    // a long walkway bridge on round pillars over a blue river, a little glass box room in the middle with a see-through floor panel above the water, railings and lamps
    R(4, 186, 232, 40, '#4FC3F7', 16) + Lc('M20 206q10-6 20 0t20 0M150 210q10-6 20 0t20 0', '#E1F5FE', 3)
    + [30, 76, 164, 210].map((x) => R(x - 8, 132, 16, 62, '#D7CCC8', 3)).join('') + R(8, 116, 224, 18, '#A1887F', 3)
    + Lc('M12 116V96M232 116V96', '#5D4037', 4) + Lc('M12 100H84M156 100H232', '#5D4037', 4) + [30, 52, 188, 210].map((x) => Lc(`M${x} 116v-16`, '#5D4037', 3)).join('')
    + R(84, 62, 72, 56, '#B3E5FC', 6) + Lc('M108 62v56M132 62v56', '#E1F5FE', 3) + R(80, 54, 80, 10, '#546E7A', 4) + R(92, 120, 56, 10, '#81D4FA', 3, 3) + Lc('M104 122l-6 6M120 122l-6 6M136 122l-6 6', '#E1F5FE', 2)
    + C(30, 84, 6, '#FFEB3B', 3) + Lc('M30 90v26', '#5D4037', 3) + C(210, 84, 6, '#FFEB3B', 3) + Lc('M210 90v26', '#5D4037', 3) + face(120, 88, 0.42)),

  L('fountain', 'น้ำพุดนตรีที่ทะเลสาบซูซอง', 'The music fountain on Suseong Lake', ['suseong lake', 'ทะเลสาบซูซอง', 'music fountain', 'น้ำพุดนตรี', 'fountain show', 'โชว์น้ำพุ', 'lake at night', 'ทะเลสาบยามค่ำ', 'dancing water', 'น้ำเต้นตามเพลง'], nm('หาสายน้ำสีม่วงที่พุ่งสูงที่สุด', 'Find the tallest purple jet of water'),
    // a wide dark lake, a long floating fountain bar with a fan of water jets lit pink, yellow, blue and one tall purple jet in the middle, musical notes floating up
    E(120, 196, 112, 28, '#3F51B5') + R(36, 176, 168, 14, '#455A64', 7) + Lc('M30 214q14-6 28 0t28 0M150 212q14-6 28 0t28 0', '#9FA8DA', 3)
    + [[52, 120, '#F48FB1'], [78, 96, '#FFEB3B'], [162, 96, '#FFEB3B'], [188, 120, '#F48FB1']].map(([x, top, c]) => P(`M${x - 8} 176C${x - 10} ${top + 30} ${x - 6} ${top} ${x} ${top}S${x + 10} ${top + 30} ${x + 8} 176z`, c)).join('')
    + [[100, 70, '#81D4FA'], [140, 70, '#81D4FA']].map(([x, top, c]) => P(`M${x - 9} 176C${x - 12} ${top + 40} ${x - 7} ${top} ${x} ${top}S${x + 12} ${top + 40} ${x + 9} 176z`, c)).join('')
    + P('M106 176C102 110 112 34 120 34S138 110 134 176z', '#B39DDB') + C(120, 30, 10, '#E1BEE7', 3) + face(120, 132, 0.42)
    + P('M30 56v24a7 6 0 1 1-4-5V56l14-4v6z', INK, 0) + P('M200 46v22a7 6 0 1 1-4-5V46z', INK, 0)),

  L('yangnyeongsi', 'ตลาดสมุนไพรยังนย็องชี', 'Yangnyeongsi herbal medicine market', ['yangnyeongsi', 'ยังนย็องชี', 'herbal medicine market', 'ตลาดสมุนไพร', 'korean herbs', 'สมุนไพรเกาหลี', 'ginseng', 'โสม', 'jujubes', 'พุทราจีนแดง', 'oldest herb market', 'ตลาดสมุนไพรเก่าแก่ที่สุด'], nm('หารากโสมที่มีหน้ายิ้ม', 'Find the ginseng root with a smiling face'),
    // three open burlap sacks with rolled-down tops full of red jujubes, pale root slices and green leaves, a bundle of dried herbs hanging above, a chubby smiling ginseng root standing in front
    Lc('M40 30H200', '#8D6E63', 5) + [70, 120, 170].map((x, k) => Lc(`M${x} 30v14`, '#8D6E63', 3) + P(`M${x - 14} 44h28l-6 34h-16z`, ['#AED581', '#C5A572', '#81C784'][k]) + Lc(`M${x - 8} 48l-2 26M${x + 8} 48l2 26`, '#689F38', 2.5)).join('')
    + [[52, '#E53935'], [120, '#FFF3E0'], [188, '#7CB342']].map(([x, c], k) => P(`M${x - 34} 196l6-74h56l6 74z`, '#D7B98E') + R(x - 32, 112, 64, 14, '#C49A6C', 5, 3)
      + Array.from({ length: 6 }, (_, j) => (k === 0 ? E(x - 20 + (j % 3) * 20, 106 - Math.floor(j / 3) * 8, 7, 5, c, 2.5) : k === 1 ? C(x - 20 + (j % 3) * 20, 106 - Math.floor(j / 3) * 8, 7, c, 2.5) : P(`M${x - 26 + (j % 3) * 20} ${108 - Math.floor(j / 3) * 8}q6-12 12 0q-6 6-12 0z`, c, 2.5))).join('')).join('')
    + P('M104 222l6-28c-12-4-16-20-8-34 6-10 20-12 28 0 8 14 4 30-8 34l6 28-8 2-6-22-4 22z', '#FFE0B2') + Lc('M112 160c-4-16 6-22 4-34M126 160c4-14 14-18 18-28', '#66BB6A', 4) + face(120, 178, 0.38)),

  L('gamyeong', 'สวนคย็องซังคัมย็อง ศาลาว่าการเมืองเก่า', 'Gyeongsang-gamyeong Park, the old governor\'s hall', ['gyeongsang-gamyeong park', 'สวนคย็องซังคัมย็อง', 'seonhwadang', 'ซอนฮวาดัง', 'governor\'s office', 'ที่ว่าการเจ้าเมือง', 'joseon dynasty', 'สมัยโชซอน', 'downtown park', 'สวนกลางเมือง'], nm('หาเสาไม้สีแดงหกต้นหน้าอาคาร', 'Find the six red wooden pillars at the front of the hall'),
    // a long single-storey hall with a big grey tiled roof sweeping up at the tips, six red pillars and lattice doors on a stone base, a broad old zelkova tree on one side, a round flower bed in front
    R(30, 160, 160, 20, '#D7CCC8', 3) + Lc('M30 170h160', '#A1887F', 2) + R(40, 108, 140, 52, '#FFF8E1', 0, 3)
    + [46, 72, 98, 122, 148, 174].map((x) => R(x - 4, 108, 8, 52, '#C62828', 0, 2.5)).join('') + [59, 85, 135, 161].map((x) => R(x - 9, 116, 18, 30, '#BCAAA4', 2, 2.5)).join('')
    + R(36, 100, 148, 8, '#26A69A', 0, 2.5) + hroof(110, 102, 92, 40) + Lc('M50 72h120', '#37474F', 3) + face(110, 128, 0.36)
    + Lc('M212 186v-60M212 150l-16-18M212 140l14-16', '#6D4C41', 9) + C(202, 108, 20, '#66BB6A') + C(222, 100, 18, '#43A047') + C(212, 80, 18, '#66BB6A')
    + E(110, 206, 64, 14, '#8D6E63') + [70, 92, 114, 136, 156].map((x, k) => C(x, 202, 7, ['#F06292', '#FFCA28', '#BA68C8', '#FF7043', '#F06292'][k], 2.5)).join('')),

  L('thearc', 'ดิอาร์ก อาคารรูปวงน้ำริมแม่น้ำนักทง', 'The ARC by the Nakdong River', ['the arc', 'ดิอาร์ก', 'gangjeong goryeong weir', 'ฝายคังจองโครย็อง', 'nakdong river', 'แม่น้ำนักทง', 'river culture museum', 'พิพิธภัณฑ์วัฒนธรรมแม่น้ำ', 'ripple building', 'อาคารรูปวงน้ำ'], nm('หาเส้นโค้งเหมือนวงน้ำบนหลังคา', 'Find the curves like water ripples on the roof'),
    // a low smooth white dome like a stone skipping on water, ringed with curved ripple lines and a blue glass band round its foot, the river weir with its gates beside it, blue water below
    R(4, 178, 232, 48, '#4FC3F7', 18) + R(150, 150, 86, 30, '#CFD8DC', 3) + [162, 184, 206, 226].map((x) => R(x - 6, 154, 12, 22, '#78909C', 2, 2.5)).join('')
    + P('M18 172c4-60 48-96 104-96s96 30 100 70c-4 14-30 26-100 26z', '#FAFAFA') + P('M24 172c30 8 70 10 100 8s60-8 70-18c2 8 0 14-4 18-34 10-140 12-166-8z', '#4FC3F7')
    + Lc('M40 140c20-34 50-50 82-50s56 12 70 32M60 128c16-20 36-30 62-30s42 8 54 20M84 116c10-8 22-12 38-12s28 4 36 10', '#B0BEC5', 3)
    + face(116, 142, 0.5) + Lc('M30 202q12-6 24 0t24 0M130 206q12-6 24 0t24 0', '#E1F5FE', 3)),

  L('apsan', 'จุดชมวิวบนภูเขาอัปซานยามค่ำ', 'Apsan Observatory at night', ['apsan park', 'สวนอัปซาน', 'apsan observatory', 'จุดชมวิวอัปซาน', 'night view', 'วิวกลางคืน', 'city lights', 'ไฟเมือง', 'mountain lookout', 'จุดชมวิวบนเขา'], nm('หาพระจันทร์เสี้ยวเหนือภูเขา', 'Find the crescent moon above the mountain'),
    // a dark green mountain with a round wooden lookout deck and railing on its top, below it a dark blue city full of little yellow window lights, a crescent moon and stars
    P('M210 42a20 20 0 1 1-24-24 16 16 0 1 0 24 24z', '#FFF59D') + P('M40 40l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z', '#FFEB3B', 2.5) + C(84, 30, 3, '#FFEB3B', 2)
    + P('M10 150c30-20 60-60 90-80h40c30 20 60 60 90 80z', '#2E7D32') + R(88, 54, 64, 16, '#A1887F', 4) + Lc('M92 54V40M148 54V40M92 42h56M110 54V42M130 54V42', '#5D4037', 3) + face(120, 104, 0.45)
    + R(10, 150, 220, 70, '#283593', 6) + [[22, 166, 22, 40], [50, 178, 26, 30], [84, 160, 24, 48], [114, 172, 30, 36], [150, 162, 22, 46], [178, 176, 24, 32], [206, 168, 18, 40]].map(([x, y, w, h]) => R(x, y, w, h, '#3949AB', 2, 2.5)
      + Array.from({ length: 4 }, (_, k) => R(x + 4 + (k % 2) * (w / 2), y + 6 + Math.floor(k / 2) * 12, 5, 5, '#FFEB3B', 0, 0)).join('')).join('')),

  L('football', 'สนามฟุตบอลที่แฟนๆ กระทืบเท้าดังตึงตัง', 'The football ground where fans stamp their feet', ['dgb daegu bank park', 'สนามดีจีบีแทกูแบงก์พาร์ก', 'im bank park', 'สนามไอเอ็มแบงก์พาร์ก', 'daepark', 'แดพาร์ก', 'football stadium', 'สนามฟุตบอล', 'stamping floor', 'พื้นกระทืบเท้า', 'daegu fc', 'ทีมแทกูเอฟซี'], nm('หารองเท้าที่กระทืบพื้นดังตึง', 'Find the shoe stamping on the floor'),
    // a small cosy stadium seen from the pitch: sky-blue stands in steps close to the grass, a curved roof over them, a smiling ball on the green pitch, a sneaker stamping with "boom" lines
    P('M14 140V70c40-24 172-24 212 0v70z', '#B0BEC5') + P('M8 74c40-34 184-34 224 0l-6 8c-40-28-172-28-212 0z', '#ECEFF1')
    + Array.from({ length: 4 }, (_, k) => R(20, 82 + k * 14, 200, 12, k % 2 ? '#81D4FA' : '#4FC3F7', 3, 2.5)).join('') + R(14, 138, 212, 10, '#CFD8DC', 0, 3)
    + P('M4 226l20-78h192l20 78z', '#66BB6A') + Lc('M120 148v78M40 226l10-40h140l10 40', '#E8F5E9', 3) + C(120, 194, 26, '#FFFFFF') + P('M120 180l10 7-4 12h-12l-4-12z', INK, 0) + face(120, 202, 0.36)
    + P('M164 214c0-16 10-24 22-22l26 10c10 4 12 12 10 16z', '#FFFFFF') + R(162, 214, 62, 8, '#1E88E5', 4, 3) + Lc('M178 196l4 6M190 198l2 6M202 202l0 6', '#1E88E5', 2.5)
    + Lc('M156 200l-12-6M154 214l-14 0M232 204l6-6', '#FFCA28', 4)),

  L('silk', 'ม้วนผ้าไหมสีสดที่ตลาดซอมุน', 'Rolls of bright silk at Seomun Market', ['seomun market', 'ตลาดซอมุน', 'silk fabric', 'ผ้าไหม', 'hanbok cloth', 'ผ้าตัดฮันบก', 'fabric rolls', 'ม้วนผ้า', 'textile city', 'เมืองสิ่งทอ'], nm('หาผ้าสีชมพูที่คลี่ยาวออกมาเป็นคลื่น', 'Find the pink cloth unrolling in a wave'),
    // a wooden shelf stacked with round-ended rolls of silk in pink, yellow, mint, sky blue and violet, one pink roll unrolling in a long wave down to the floor
    R(20, 40, 200, 10, '#A1887F', 3) + R(20, 112, 200, 10, '#A1887F', 3) + R(20, 184, 200, 10, '#A1887F', 3) + R(20, 40, 10, 164, '#8D6E63', 3) + R(210, 40, 10, 164, '#8D6E63', 3)
    + [[54, 82, '#FFEB3B'], [96, 82, '#80CBC4'], [138, 82, '#B39DDB'], [180, 82, '#90CAF9'], [76, 154, '#90CAF9'], [118, 154, '#FFCC80'], [160, 154, '#A5D6A7']].map(([x, y, c]) => C(x, y, 20, c) + C(x, y, 12, c, 2.5) + C(x, y, 4, '#FFFFFF', 2)).join('')
    + C(46, 150, 18, '#F48FB1') + C(46, 150, 6, '#FFFFFF', 2) + P('M46 132c40 0 40 26 20 48s-10 40 30 40c30 0 40-10 60-10v18H44c-20 0-30-18-14-36 14-16 30-30 16-60z', '#F8BBD0')
    + Lc('M70 190q20 8 40 0', '#F06292', 3) + face(96, 82, 0.42)),

  L('starlight', 'อุโมงค์ไฟฤดูหนาวที่อีเวิลด์', 'E-World\'s winter light tunnel', ['e-world', 'อีเวิลด์', 'starlight festival', 'เทศกาลสตาร์ไลต์', 'light tunnel', 'อุโมงค์ไฟ', 'winter lights', 'ไฟประดับหน้าหนาว', 'christmas lights', 'ไฟคริสต์มาส'], nm('หาตุ๊กตาหิมะที่ทำจากไฟ', 'Find the snowman made of lights'),
    // a row of round arches getting smaller into the distance, each dotted with coloured bulbs, a path under them, a snowman made of white lights at the side, snowflakes
    [[120, 210, 104, 116, '#FFCA28'], [120, 196, 78, 88, '#F48FB1'], [120, 184, 56, 64, '#81D4FA'], [120, 174, 36, 42, '#A5D6A7']].map(([cx, b, w, h, c]) =>
      `<path d="M${cx - w} ${b}v${-h * 0.4}a${w} ${h * 0.6} 0 0 1 ${w * 2} 0v${h * 0.4}" fill="none" stroke="${INK}" stroke-width="9"/><path d="M${cx - w} ${b}v${-h * 0.4}a${w} ${h * 0.6} 0 0 1 ${w * 2} 0v${h * 0.4}" fill="none" stroke="${c}" stroke-width="5" stroke-dasharray="1 9"/>`).join('')
    + P('M80 226l24-52h32l24 52z', '#E1D5F5') + C(196, 184, 22, '#FFFFFF') + C(196, 150, 16, '#FFFFFF') + C(196, 128, 4, '#FF7043', 2) + face(196, 148, 0.34)
    + [[40, 40], [200, 56], [120, 28]].map(([x, y]) => Lc(`M${x - 9} ${y}h18M${x} ${y - 9}v18M${x - 6} ${y - 6}l12 12M${x + 6} ${y - 6}l-12 12`, '#90CAF9', 3)).join('')),

  L('napjakmandu', 'นัปจักมันดู เกี๊ยวแผ่นแบนของแทกู', 'Napjak mandu, Daegu\'s flat dumplings', ['napjak mandu', 'นัปจักมันดู', 'flat dumplings', 'เกี๊ยวแผ่นแบน', 'pan-fried dumplings', 'เกี๊ยวทอดกระทะ', 'daegu food', 'อาหารแทกู', 'spring onion', 'ต้นหอม'], nm('หาต้นหอมสีเขียวที่โรยบนเกี๊ยว', 'Find the green spring onion sprinkled on the dumplings'),
    // a round plate of thin flat half-moon dumplings, golden at the edges and fanned out in a row, sprinkled with red chilli flakes and green spring onion, a little dish of soy sauce
    E(120, 150, 104, 52, '#FFFFFF') + E(120, 150, 90, 42, '#E3F2FD', 2)
    + [[70, 156, -20], [104, 150, -6], [138, 150, 6], [172, 156, 20]].map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})">${P(`M${x - 28} ${y + 8}c0-26 12-40 28-40s28 14 28 40z`, '#FFE7B0')}${Lc(`M${x - 24} ${y + 6}c2-18 12-30 24-30`, '#F5B04C', 3)}</g>`).join('')
    + [[66, 142], [98, 132], [132, 136], [166, 142], [84, 150], [150, 152]].map(([x, y], k) => (k % 2 ? R(x - 4, y - 2, 8, 4, '#66BB6A', 1, 1.5) : R(x - 3, y - 2, 6, 3, '#E53935', 1, 0))).join('')
    + E(196, 92, 24, 10, '#FFFFFF') + E(196, 90, 16, 6, '#6D4C41', 2) + face(104, 160, 0.4)),

  L('jjimgalbi', 'ชิมคัลบี ซี่โครงตุ๋นเผ็ดดงอินดง', 'Dongin-dong jjimgalbi, spicy braised ribs', ['jjimgalbi', 'ชิมคัลบี', 'dongin-dong', 'ดงอินดง', 'spicy braised ribs', 'ซี่โครงตุ๋นเผ็ด', 'beef ribs', 'ซี่โครงวัว', 'beef', 'เนื้อวัว', 'dented pot', 'หม้ออะลูมิเนียมบุบ', 'garlic', 'กระเทียม'], nm('หากองกระเทียมสับสีขาวบนยอด', 'Find the heap of white chopped garlic on top'),
    // a dented silver aluminium bowl with a wobbly rim, full of red spicy sauce with brown rib pieces and white bone tips poking out, a heap of chopped garlic on top, steam rising
    P('M30 116c10 4 20-4 30 0s20 4 30 0 20-4 30 0 20 4 30 0 20-4 30 0 20 4 30 0c-4 60-40 98-90 98s-86-38-90-98z', '#CFD8DC') + Lc('M60 150l10 12M170 150l-10 14M120 190l4-10', '#90A4AE', 3)
    + E(120, 118, 90, 20, '#E53935') + [[76, 112], [110, 104], [150, 110], [94, 124], [140, 126]].map(([x, y]) => E(x, y, 16, 9, '#8D3B22', 2.5) + R(x + 10, y - 10, 14, 7, '#FFF8E1', 3, 2.5)).join('')
    + P('M100 108c4-14 12-18 20-18s16 4 20 18z', '#FFFDE7') + [108, 118, 128].map((x) => C(x, 100, 3, '#FFF59D', 1.5)).join('') + face(120, 166, 0.5)
    + Lc('M80 74c-8-10 8-16 0-26M120 70c-8-10 8-16 0-26M160 74c-8-10 8-16 0-26', '#B0BEC5', 3)),

  L('makchang', 'มักชังย่างบนเตาถ่าน', 'Grilled makchang on the charcoal grill', ['makchang', 'มักชัง', 'grilled intestines', 'ไส้ย่าง', 'pork', 'เนื้อหมู', 'beef', 'เนื้อวัว', 'charcoal grill', 'เตาถ่าน', 'doenjang dip', 'น้ำจิ้มเต้าเจี้ยว', 'daegu barbecue', 'บาร์บีคิวแทกู'], nm('หาพริกเขียวในถ้วยน้ำจิ้ม', 'Find the green chilli in the dipping sauce'),
    // a round grill with a criss-cross wire top over glowing orange coals, golden-brown round curls of makchang sizzling on it, a little bowl of brown bean dip with chopped green chilli
    E(110, 140, 92, 46, '#37474F') + E(110, 134, 80, 36, '#FF8A65') + Lc('M48 116l100 46M74 104l100 46M30 140l80 36M46 104l-16 30M90 102l-40 66M134 104l-40 70M168 116l-30 60', '#455A64', 3)
    + [[70, 122], [104, 114], [140, 120], [86, 146], [124, 146], [160, 140]].map(([x, y]) => E(x, y, 15, 11, '#C47A3A') + E(x, y, 6, 4, '#8D4A1E', 2.5)).join('')
    + face(104, 130, 0.36) + E(196, 196, 30, 14, '#FFFFFF') + E(196, 192, 22, 8, '#A1662F', 2.5) + [184, 196, 208].map((x) => C(x, 191, 3, '#66BB6A', 1.5)).join('')
    + Lc('M70 84c-8-10 8-16 0-26M110 80c-8-10 8-16 0-26M150 84c-8-10 8-16 0-26', '#B0BEC5', 3)),

  L('cornbread', 'ขนมปังข้าวโพดของแทกู', 'Daegu\'s corn bread', ['corn bread', 'ขนมปังข้าวโพด', 'tongokssu ppang', 'ทงอกซูปัง', 'samsong bakery', 'ร้านเบเกอรีซัมซง', 'soboro crust', 'ขนมปังหน้าเม็ดกรอบ', 'sweet corn', 'ข้าวโพดหวาน', 'bakery', 'เบเกอรี'], nm('หาเม็ดข้าวโพดสีเหลืองในขนมปัง', 'Find the yellow corn kernels inside the bread'),
    // a round loaf with a bumpy golden crumble crust, one half cut open to show soft bread packed with yellow corn kernels, a whole cob of corn with green leaves beside it
    P('M24 170c0-60 40-96 86-96s86 36 86 96z', '#F5B04C') + [[66, 104], [92, 90], [120, 86], [148, 94], [170, 110], [50, 126], [182, 132]].map(([x, y]) => C(x, y, 7, '#FFCC80', 2.5)).join('')
    + E(110, 172, 86, 22, '#FFF3C4') + Array.from({ length: 10 }, (_, k) => E(52 + (k % 5) * 28, 166 + Math.floor(k / 5) * 12, 6, 4, '#FFD54F', 2)).join('') + face(110, 128, 0.55)
    + `<g transform="rotate(-30 200 120)">${E(200, 120, 14, 40, '#FFD54F')}${Lc('M192 90v60M200 84v72M208 90v60', '#F9A825', 2)}${P('M186 150c-10-20-8-50 6-60-2 30 0 50 8 70z', '#81C784')}${P('M214 150c10-20 8-50-6-60 2 30 0 50-8 70z', '#66BB6A')}</g>`),

  L('kalguksu', 'คัลกุกซูเส้นตัดมือที่ตลาดซอมุน', 'Hand-cut kalguksu at Seomun Market', ['kalguksu', 'คัลกุกซู', 'hand-cut noodles', 'บะหมี่ตัดมือ', 'noodle soup', 'ก๋วยเตี๋ยวน้ำ', 'seomun market food', 'อาหารตลาดซอมุน', 'nureun guksu', 'นูรึนกุกซู', 'zucchini', 'บวบเกาหลี'], nm('หาไม้นวดแป้งบนเขียง', 'Find the rolling pin on the board'),
    // a big bowl of clear soup with thick flat noodles, green zucchini slices, dark seaweed strips and sesame, a wooden board behind with a sheet of rolled-out dough and a rolling pin
    R(118, 34, 108, 70, '#D7A86E', 8) + R(128, 42, 70, 50, '#FFF8E1', 6, 3) + Lc('M140 48v40M152 48v40M164 48v40M176 48v40', '#E0D6C8', 2) + R(150, 82, 74, 12, '#A1887F', 6) + C(150, 88, 5, '#8D6E63', 2.5) + C(224, 88, 5, '#8D6E63', 2.5)
    + P('M20 128h184c-4 52-40 86-92 86s-88-34-92-86z', '#FFFFFF') + Lc('M40 152c40 10 104 10 144 0', '#90CAF9', 3) + E(112, 128, 92, 20, '#FFF3C4')
    + Lc('M40 128c12-8 24 8 36 0s24 8 36 0 24 8 36 0 24 8 36 0', '#FFF8E1', 7) + Lc('M48 134c12-6 24 6 36 0s24 6 36 0 24 6 36 0', '#F5E6B8', 5)
    + [[66, 122], [150, 124]].map(([x, y]) => C(x, y, 10, '#AED581', 2.5) + C(x, y, 4, '#F1F8E9', 1.5)).join('') + Lc('M100 120l20 8M120 118l18 8', '#37474F', 4) + face(112, 172, 0.5)),

  L('yakiudon', 'ยากิอุด้งผัดเผ็ดแบบแทกู', 'Daegu yaki udon, spicy stir-fried noodles', ['yaki udon', 'ยากิอุด้ง', 'spicy stir-fried udon', 'อุด้งผัดเผ็ด', 'squid', 'ปลาหมึก', 'daegu ten tastes', 'สิบรสชาติของแทกู', 'chinese-korean food', 'อาหารจีนสไตล์เกาหลี'], nm('หาวงปลาหมึกสีขาวในเส้นอุด้ง', 'Find the white squid rings in the noodles'),
    // a wide oval plate heaped with thick glossy red-orange udon noodles, white squid rings, green cabbage and onion slices, a curl of steam on top
    E(120, 160, 108, 46, '#FFFFFF') + E(120, 160, 94, 36, '#FFF3E0', 2)
    + P('M36 156c10-40 50-60 84-60s74 20 84 60c-30 16-138 16-168 0z', '#E8743B')
    + Lc('M50 146c14-14 28 6 42-8s28 6 42-8 28 6 42-8M60 126c14-12 26 6 40-6s26 6 40-6 26 6 36-4M54 160c18-8 34 6 52-2s34 6 52-2 26 2 32 0', '#C2501F', 4)
    + [[78, 132], [152, 140], [112, 116]].map(([x, y]) => E(x, y, 11, 8, '#FFFFFF', 3) + E(x, y, 5, 3, '#E8743B', 2)).join('')
    + P('M124 140q12-10 26-2-12 10-26 2z', '#9CCC65', 2.5) + P('M60 152q10-12 24-6-10 12-24 6z', '#AED581', 2.5) + Lc('M168 128q6-10 14-6M92 154q8-6 14 0', '#FFF8E1', 3)
    + face(120, 150, 0.4) + Lc('M100 86c-8-10 8-16 0-26M140 86c-8-10 8-16 0-26', '#B0BEC5', 3)),
];

export default {
  places: {
    'kr-daegu': { country: 'kr', wave: 3, name: nm('แทกู', 'Daegu'), tz: 'Asia/Seoul', ll: [35.87, 128.6], alias: ['daegu', 'แทกู', 'แดกู', 'TAE', 'dongseongno', 'ทงซองโน', 'seomun market', 'ตลาดซอมุน', 'suseong lake', 'ทะเลสาบซูซอง', 'e-world', 'อีเวิลด์', '83 tower', 'apsan', 'อัปซาน', 'palgongsan', 'พัลกงซาน', 'biseulsan', 'พีซึลซาน'], colors: DG },
  },
  items,
};
