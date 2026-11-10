// Wave 9, East Asia part 2: Taiwan (the country layer, Taipei, Central Taiwan, Tainan and Kaohsiung, Hualien and Taitung)
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const K = (file, th, en, kw, svg) => { const [cc, base] = file.split('/'); const [cat, ...rest] = base.replace(/\.v\d+\.svg$/, '').split('-'); return { id: `${cc}.${cat}.${rest.join('-')}`, cat, file, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const range = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
// a southern Chinese roof with swallowtail ridge ends
const swallow = (x, y, w, c = '#C62828') => P(`M${x - w / 2} ${y}h${w}l-10-14H${x - w / 2 + 10}z`, c, 3) + P(`M${x - w / 2 + 6} ${y - 14}c-4-6-10-12-16-14 8 0 14 4 18 8M${x + w / 2 - 6} ${y - 14}c4-6 10-12 16-14-8 0-14 4-18 8`, c, 3);

const items = [
  // ---------- Taiwan, the country layer
  K('tw/food-guabao.v1.svg', 'กัวเปาซาลาเปาพับไส้หมูสามชั้น', 'Gua bao, the folded bun with pork belly', ['gua bao', 'กัวเปา', 'pork belly bun', 'ซาลาเปาหมูสามชั้น', 'taiwanese burger', 'เบอร์เกอร์ไต้หวัน', 'peanut powder', 'ผงถั่วลิสง', 'pickled greens', 'coriander'],
    // a soft white folded steamed bun holding a slab of braised pork belly, green pickled mustard greens, sprinkled peanut powder and a sprig of coriander
    E(120, 196, 90, 14, '#FFE0B2', 3) + P('M30 160c0-50 40-80 90-80s90 30 90 80c-30 20-150 20-180 0z', '#FFFDF7', 4) + P('M44 150c20-30 132-30 152 0', '#7B3F1E', 3) + Lc('M54 144c20-14 112-14 132 0', '#F3C79E', 3)
      + P('M50 136c14-20 40-20 50-6 14-14 40-14 50 0 10-12 30-10 40 4', '#558B2F', 3) + range(12, (k) => C(60 + k * 10, 120 - (k % 3) * 4, 2.5, '#E0B26E', 0)) + P('M140 112c4-14 16-18 22-12-8 2-14 6-16 14z', '#43A047', 2) + P('M150 104c10-8 20-4 22 4-8-4-14-4-22-4z', '#66BB6A', 2)
      + P('M30 160c30 40 150 40 180 0', '#FFFDF7', 4) + face(120, 172, 0.45)),
  K('tw/food-stinkytofu.v1.svg', 'เต้าหู้เหม็นทอดกับผักดอง', 'Fried stinky tofu with pickled cabbage', ['stinky tofu', 'เต้าหู้เหม็น', 'chou doufu', 'โช่วโต้วฟู', 'fried tofu', 'เต้าหู้ทอด', 'taiwanese pickled cabbage', 'ผักกาดดองไต้หวัน', 'night snack', 'garlic chilli sauce'],
    // a paper boat tray of four golden puffy fried tofu cubes with crisp holes, a pile of pale pickled cabbage and red chilli on top, wavy stink lines drawn as cartoon green swirls, a skewer stick
    P('M24 150h192l-20 56H44z', '#FFF3E0', 4) + Lc('M40 170h160', '#FFCC80', 3)
      + range(4, (k) => g(54 + k * 44, 136, 1, R(-20, -20, 40, 36, '#E0A040', 6, 3.5) + range(4, (j) => C(-10 + (j % 2) * 18, -10 + Math.floor(j / 2) * 16, 2.5, '#B87333', 0)), -8 + k * 5))
      + P('M60 110c20-14 100-14 120 0-10 10-110 10-120 0z', '#F1F8E9', 3) + range(6, (k) => Lc(`M${72 + k * 16} 108l8-6`, '#C5E1A5', 2.5)) + range(4, (k) => C(84 + k * 22, 104, 3.5, '#E53935', 1.5))
      + range(3, (k) => Lc(`M${70 + k * 50} 86c-10-10 10-14 0-26s10-16 0-24`, '#9CCC65', 3)) + Lc('M184 120l40-60', '#D7B88A', 4) + face(120, 184, 0.45, 'o')),
  K('tw/food-oysteromelette.v1.svg', 'ออส่วนไข่เจียวหอยนางรมไต้หวัน', 'Taiwanese oyster omelette', ['oyster omelette', 'ออส่วน', 'o-a-chian', 'โออาเจียน', 'oyster pancake', 'หอยทอดไต้หวัน', 'sweet potato starch', 'แป้งมันเทศ', 'pink sauce', 'night stall'],
    // a round oval plate of a gooey omelette with shiny plump oysters and green leaves, a sweet pink sauce zigzagged on top, the iron griddle behind with another one cooking
    R(20, 40, 200, 40, '#37474F', 6, 4) + E(70, 60, 30, 12, '#FFE082', 2.5) + E(160, 60, 30, 12, '#FFE082', 2.5) + Lc('M60 34c-4-8 4-12 0-20M160 34c-4-8 4-12 0-20', '#ECEFF1', 3)
      + E(120, 156, 100, 50, '#FFFFFF', 4) + E(120, 152, 82, 38, '#FFF59D', 3) + range(5, (k) => E(78 + k * 20, 146 + (k % 2) * 12, 9, 6, '#B0BEC5', 2.5)) + range(4, (k) => P(`M${88 + k * 22} 134c6-6 14-6 16 0-6 4-12 4-16 0z`, '#66BB6A', 2))
      + Lc('M56 138l20 16 20-18 20 18 20-18 20 18 20-16', '#F06292', 5) + face(120, 172, 0.4)),
  K('tw/transport-garbagetruck.v1.svg', 'รถขยะไต้หวันที่เปิดเพลงเรียกคน', 'The Taiwan rubbish truck that plays music', ['garbage truck music', 'รถขยะเปิดเพลง', 'rubbish truck', 'รถเก็บขยะ', 'fur elise', 'เพลงเฟอร์เอลิเซ่', 'recycling truck', 'รถรีไซเคิล', 'neighbours waiting', 'evening rubbish run'],
    // a yellow rubbish truck with a smiling cab and a little loudspeaker on top sending out music notes, a white recycling truck behind, a child holding a rubbish bag running to it
    R(-4, 196, 248, 48, '#BDBDBD', 0, 3) + R(20, 100, 120, 80, '#FDD835', 8, 4) + P('M140 120h40c16 0 24 12 24 30v30h-64z', '#FFEE58', 4) + R(150, 128, 34, 22, '#E1F5FE', 3, 2.5)
      + C(50, 188, 14, '#424242', 3.5) + C(170, 188, 14, '#424242', 3.5) + C(50, 188, 5, '#BDBDBD', 0) + C(170, 188, 5, '#BDBDBD', 0) + range(3, (k) => Lc(`M${36 + k * 30} 120v40`, '#F9A825', 3))
      + P('M160 100l14-10v28l-14-10z', '#90A4AE', 3) + R(150, 100, 10, 8, '#90A4AE', 1, 2.5)
      + P('M188 70v-22l12-4v20', 'none', 3) + C(186, 72, 4, INK, 0) + C(198, 66, 4, INK, 0) + P('M214 56v-16', 'none', 3) + C(212, 58, 4, INK, 0) + Lc('M214 40c4 2 8 2 8 8', INK, 3)
      + g(214, 222, 1, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#42A5F5', 2) + face(0, -18, 0.22) + C(-16, -2, 8, '#43A047', 2)) + face(184, 160, 0.3)),

  // ---------- Taipei
  L('tw/taipei/landmark-grandhotel.v1.svg', 'โรงแรมแกรนด์โฮเต็ลไทเปทรงวังจีน', 'The palace-style Grand Hotel on the hill', ['grand hotel taipei', 'แกรนด์โฮเต็ลไทเป', 'yuanshan', 'หยวนซาน', 'red palace hotel', 'โรงแรมทรงวังจีน', 'golden roof', 'หลังคาสีทอง', 'jiantan', 'red pillars'], 'หาหลังคาสีส้มทองหลายชั้นที่อยู่บนยอดเนิน', 'Find the golden-orange roofs stacked on top of the hill',
    // a big red-pillared hotel built like a Chinese palace on a green hill, a huge orange-gold tiled roof on top of rows of red columns, smaller roofs at each wing, trees around
    sky('#E3F2FD') + P('M-4 244V180c60-30 190-30 248 0v64z', '#66BB6A', 0) + R(20, 130, 200, 54, '#FFF8E1', 0, 3.5) + range(10, (k) => R(26 + k * 20, 136, 8, 46, '#C62828', 0, 2))
      + P('M6 132h228l-16-22H22z', '#FF8F00', 4) + R(66, 84, 108, 26, '#FFF8E1', 0, 3) + range(5, (k) => R(74 + k * 21, 88, 8, 22, '#C62828', 0, 2)) + P('M50 86h140l-16-24H66z', '#FFA000', 4) + P('M58 62c-6-6-10-14-12-20M182 62c6-6 10-14 12-20', 'none', 3)
      + range(4, (k) => C(14 + k * 72, 200, 16, '#2E7D32', 3)) + face(120, 156, 0.35)),
  L('tw/taipei/landmark-bopiliao.v1.svg', 'ทางเดินอาเขตอิฐแดงพอผีเหลียว', 'The red-brick arcades of Bopiliao old street', ['bopiliao', 'พอผีเหลียว', 'bopiliao historic block', 'ย่านเก่าพอผีเหลียว', 'red brick arcade', 'ทางเดินใต้อาคารอิฐแดง', 'wanhua', 'ว่านหัว', 'old shophouses', 'qing dynasty street'], 'หาซุ้มโค้งอิฐแดงที่เรียงกันเป็นทางเดิน', 'Find the row of red-brick arches you walk under',
    // a row of old two-storey red-brick shophouses with round arched arcades at street level, wooden shutters upstairs, a stone-paved lane, a child walking under the arches
    sky('#FFF3E0') + R(-4, 200, 248, 44, '#D7CCC8', 0, 3) + range(8, (k) => Lc(`M${k * 32} 200l-6 44`, '#BCAAA4', 2))
      + R(10, 50, 220, 150, '#C1663E', 0, 4) + range(4, (k) => P(`M${18 + k * 54} 200v-50c0-24 42-24 42 0v50z`, '#5D2E1E', 3)) + range(4, (k) => R(24 + k * 54, 72, 30, 34, '#8D6E63', 2, 3) + Lc(`M${39 + k * 54} 72v34`, '#5D4037', 2))
      + Lc('M10 120h220', '#8E3B2A', 4) + P('M4 50h232l-8-12H12z', '#6D4C41', 3) + range(10, (k) => Lc(`M${14 + k * 22} 136h10M${20 + k * 22} 44h8`, '#E07A50', 2)) + kid(120, 196, '#26A69A') + face(120, 90, 0.3)),
  L('tw/taipei/landmark-linfamilygarden.v1.svg', 'สวนตระกูลหลินที่ป่านเฉียว', 'The Lin Family Garden in Banqiao', ['lin family garden', 'สวนตระกูลหลิน', 'lin ben yuan', 'หลินเปิ่นหยวน', 'banqiao', 'ป่านเฉียว', 'chinese garden', 'สวนจีน', 'moon window', 'fish pond'], 'หาหน้าต่างรูปทรงแปลกๆ บนกำแพงขาวในสวน', 'Find the funny-shaped windows in the white garden wall',
    // a classical garden with a white wall pierced by a round window, a vase-shaped window and a leaf-shaped window, a little pavilion on a rock hill over a pond with orange fish
    sky('#E8F5E9') + R(-4, 160, 248, 84, '#4FC3F7', 0, 0) + R(-4, 70, 248, 90, '#FFFDF7', 0, 4) + P('M-4 70h248l-6-10H2z', '#455A64', 3)
      + C(40, 112, 22, '#A5D6A7', 3.5) + P('M106 132c-10 0-12-14-4-20-6-6-4-20 10-20h16c14 0 16 14 10 20 8 6 6 20-4 20z', '#A5D6A7', 3.5) + P('M196 92c18 8 18 34 0 42-18-8-18-34 0-42z', '#A5D6A7', 3.5)
      + P('M150 190c10-30 50-30 70 0z', '#9E9E9E', 3) + range(3, (k) => R(166 + k * 14, 150, 4, 22, '#C62828', 0, 2)) + swallow(186, 152, 58, '#6D4C41')
      + range(3, (k) => g(40 + k * 40, 200 + (k % 2) * 14, 1, E(0, 0, 10, 5, '#FF7043', 2) + P('M9 0l7-5v10z', '#FF7043', 2))) + face(120, 112, 0.3)),
  L('tw/taipei/landmark-fortsandomingo.v1.svg', 'ป้อมซานโตโดมิงโกสีแดงที่ตั้นสุ่ย', 'The red Fort San Domingo at Tamsui', ['fort san domingo', 'ป้อมซานโตโดมิงโก', 'hongmaocheng', 'หงเหมาเฉิง', 'tamsui', 'ตั้นสุ่ย', 'red fort', 'ป้อมสีแดง', 'old consulate', 'brick verandas'], 'หาบ้านอิฐแดงที่มีระเบียงโค้งอยู่ข้างป้อมสี่เหลี่ยม', 'Find the red-brick house with arched verandas beside the square fort',
    // a square red fort with a flat battlemented top, beside it a red-brick house with two floors of arched verandas, a green lawn and banyan tree, the river behind
    sky('#E1F5FE') + R(-4, 120, 248, 30, '#4FC3F7', 0, 0) + R(-4, 190, 248, 54, '#9CCC65', 0, 0)
      + R(20, 70, 90, 120, '#D84315', 0, 4) + range(5, (k) => R(20 + k * 19, 58, 12, 14, '#D84315', 0, 3)) + R(50, 150, 30, 40, '#4E342E', 0, 3) + range(2, (k) => R(36 + k * 44, 96, 14, 20, '#4E342E', 1, 2.5))
      + R(116, 100, 104, 90, '#E57352', 0, 4) + range(2, (r) => range(4, (k) => P(`M${122 + k * 25} ${140 + r * 44}v-26c0-12 18-12 18 0v26z`, '#FFF3E0', 2.5))) + P('M110 100h116l-12-16h-92z', '#8D6E63', 3)
      + C(226, 150, 18, '#2E7D32', 3) + face(64, 120, 0.35)),
  L('tw/taipei/landmark-scallionpancake.v1.svg', 'แผ่นแป้งต้นหอมทอดชงโหยวปิ่ง', 'Cong you bing, the flaky scallion pancake', ['scallion pancake', 'แป้งทอดต้นหอม', 'cong you bing', 'ชงโหยวปิ่ง', 'flaky flatbread', 'แป้งพันชั้น', 'egg pancake', 'ใส่ไข่', 'yongkang street', 'street breakfast'], 'หาเส้นสีเขียวของต้นหอมที่ซ่อนในแป้งเป็นชั้นๆ', 'Find the green bits of spring onion hiding in the flaky layers',
    // a big round flaky golden pancake on a griddle with a spiral of layers and green spring onion flecks, one slice pulled out on a spatula showing the layers, a paper bag
    E(120, 150, 104, 30, '#37474F', 4) + C(100, 130, 64, '#E8B04A', 4) + range(4, (k) => C(100, 130, 54 - k * 13, 'none', 2)) + range(14, (k) => { const a = k * 2.2; return E(100 + Math.cos(a) * (14 + k * 3), 130 + Math.sin(a) * (14 + k * 3), 3, 1.6, '#43A047', 0); })
      + P('M100 130l64-20 0 40z', '#FFE082', 0) + g(186, 110, 1, P('M-24-14l40 6v26l-40 4z', '#E8B04A', 3) + range(3, (k) => Lc(`M-22 ${-6 + k * 8}h36`, '#FFF3E0', 2)) + Lc('M16 4h40', '#9E9E9E', 6), -6)
      + R(18, 186, 50, 44, '#FFF3E0', 2, 3) + face(100, 136, 0.45)),

  // ---------- Central Taiwan
  L('tw/central/landmark-oxtonguecake.v1.svg', 'ขนมลิ้นวัวลู่กัง', 'Lukang ox-tongue cakes', ['ox tongue cake', 'ขนมลิ้นวัว', 'niu she bing', 'หนิวเสอปิ่ง', 'lukang', 'ลู่กัง', 'flaky pastry', 'ขนมเปี๊ยะแบน', 'maltose filling', 'old bakery'], 'หาขนมยาวรีแบนๆ ที่หน้าตาเหมือนลิ้น', 'Find the long flat pastries shaped like a tongue',
    // a woven bamboo tray with long flat oval pastries, golden and flaky, one broken to show a sticky filling, a baker’s rolling pin
    E(120, 150, 104, 58, '#D7B88A', 4) + E(120, 150, 92, 48, '#E8CFA0', 2) + range(5, (k) => Lc(`M${40 + k * 40} 104v92`, '#C9A66B', 2))
      + [[84, 130, -16], [150, 128, 12], [96, 172, 8], [160, 172, -10]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 32, 13, '#F2C46D', 3.5) + Lc('M-22 0h44', '#E0A040', 2.5) + range(3, (k) => C(-14 + k * 14, -6, 1.5, '#FFF8E1', 0)), r)).join('')
      + g(196, 70, 1, R(-34, -8, 68, 16, '#D7B88A', 8, 3) + R(-46, -4, 14, 8, '#A1887F', 3, 2.5) + R(32, -4, 14, 8, '#A1887F', 3, 2.5), -20) + face(120, 150, 0.35)),
  L('tw/central/landmark-jijistation.v1.svg', 'สถานีรถไฟไม้จี๋จี๋', 'The wooden Jiji railway station', ['jiji station', 'สถานีจี๋จี๋', 'jiji branch line', 'ทางรถไฟสายจี๋จี๋', 'wooden station', 'สถานีไม้', 'nantou', 'หนานโถว', 'camphor tree tunnel', 'little train'], 'หาสถานีไม้หลังคาจั่วที่มีรถไฟคันเล็กจอดอยู่', 'Find the gabled wooden station with the little train waiting',
    // a small Japanese-era wooden station with a grey gabled roof and white walls with dark timber frames, a little blue and white train at the platform, camphor trees behind
    sky('#E8F5E9') + range(4, (k) => C(20 + k * 68, 70, 34, '#388E3C', 3)) + R(-4, 180, 248, 64, '#BDBDBD', 0, 3) + Lc('M-4 214h248M-4 232h248', '#6D4C41', 3)
      + R(36, 106, 120, 74, '#FFF8E1', 0, 4) + range(5, (k) => Lc(`M${36 + k * 30} 106v74`, '#5D4037', 3)) + Lc('M36 140h120', '#5D4037', 3) + P('M24 108l72-42 72 42z', '#607D8B', 4) + P('M70 108l26-18 26 18z', '#FFF8E1', 3) + R(84, 146, 24, 34, '#8D6E63', 1, 3)
      + R(160, 170, 84, 36, '#1E88E5', 6, 3.5) + R(160, 170, 84, 10, '#FFFFFF', 4, 2) + range(3, (k) => R(168 + k * 24, 184, 16, 12, '#E1F5FE', 2, 2)) + face(96, 126, 0.35)),
  L('tw/central/landmark-checheng.v1.svg', 'หมู่บ้านทำไม้เชอเฉิงกับบ่อเก็บซุง', 'Checheng, the old timber town and its log pond', ['checheng', 'เชอเฉิง', 'timber village', 'หมู่บ้านทำไม้', 'log pond', 'บ่อเก็บซุง', 'wooden barrels', 'ถังไม้', 'jiji line terminus', 'old sawmill'], 'หาท่อนซุงใหญ่ที่ลอยอยู่ในบ่อน้ำ', 'Find the big logs floating in the pond',
    // a calm pond with big round logs floating, a long wooden sawmill building with a black roof behind, green hills, a little wooden barrel and lunch box on the deck
    sky('#E8F5E9') + P('M-4 100c60-40 150-50 248-10v40H-4z', '#81C784', 0) + R(20, 90, 200, 50, '#8D6E63', 0, 4) + P('M10 92h220l-20-24H30z', '#37474F', 4) + range(6, (k) => R(32 + k * 32, 104, 20, 24, '#5D4037', 1, 2))
      + R(-4, 140, 248, 104, '#4DB6AC', 0, 0) + Lc('M20 210c14-4 22 4 36 0M150 226c14-4 22 4 36 0', '#B2DFDB', 3)
      + [[60, 170], [130, 162], [180, 190], [80, 206]].map(([x, y]) => R(x - 34, y - 9, 68, 18, '#A1673F', 9, 3) + C(x + 34, y, 9, '#E0B26E', 2.5) + C(x + 34, y, 4, 'none', 1.5)).join('') + face(130, 162, 0.25)),
  L('tw/central/landmark-fenqihubento.v1.svg', 'ข้าวกล่องรถไฟเฟิ่นฉี่หู', 'The Fenqihu railway lunch box', ['fenqihu', 'เฟิ่นฉี่หู', 'railway bento', 'ข้าวกล่องรถไฟ', 'alishan forest railway', 'รถไฟป่าอาลีซาน', 'wooden lunch box', 'กล่องข้าวไม้', 'braised pork', 'mountain station'], 'หากล่องข้าวกลมสีเงินที่มีไข่พะโล้กับหมูวางอยู่บนข้าว', 'Find the round tin lunch box with a soy egg and pork on the rice',
    // a round steel lunch box opened on a station bench, rice topped with a braised egg, a pork chop, pickles and greens, a red and orange mountain train in the misty forest behind
    sky('#ECEFF1') + range(5, (k) => P(`M${-4 + k * 52} 110l24-60 24 60z`, '#4E6B5A', 3)) + R(130, 92, 100, 34, '#E64A19', 6, 3.5) + range(3, (k) => R(140 + k * 28, 100, 18, 12, '#FFF3E0', 2, 2)) + Lc('M-4 128h248', '#6D4C41', 3)
      + R(-4, 190, 248, 54, '#A1887F', 0, 3) + E(110, 174, 82, 22, '#B0BEC5', 4) + P('M28 174v14c0 14 164 14 164 0v-14', '#90A4AE', 4) + E(110, 172, 72, 17, '#FFFFFF', 2)
      + R(64, 160, 50, 18, '#8D4E1A', 5, 2.5) + E(134, 164, 14, 11, '#A0522D', 2.5) + E(134, 162, 7, 5, '#FFB300', 0) + range(4, (k) => E(156 + (k % 2) * 10, 168 + Math.floor(k / 2) * 6, 5, 3, '#FDD835', 1.5)) + P('M80 182c8-6 20-6 28 0', '#43A047', 2.5)
      + face(110, 196, 0.35)),
  L('tw/central/landmark-snakekiln.v1.svg', 'เตามังกรยาวเผาเครื่องปั้นที่สุ่ยหลี่', 'The long snake kiln of Shuili', ['snake kiln', 'เตางู', 'shuili', 'สุ่ยหลี่', 'dragon kiln', 'เตามังกร', 'pottery village', 'หมู่บ้านเครื่องปั้น', 'clay jars', 'wood-fired kiln'], 'หาเตาเผายาวๆ ที่ไต่ขึ้นเนินเหมือนงูตัวใหญ่', 'Find the long kiln climbing the slope like a giant snake',
    // a long low brick kiln with a rounded roof running up a slope like a snake, little stoking holes along its side with orange glow, a chimney at the top, clay jars lined up in front
    sky('#FFF8E1') + P('M-4 244V200L244 90v154z', '#C5E1A5', 0) + P('M10 206c50-20 140-60 196-92l10 18c-56 32-146 72-196 92z', '#C1663E', 4) + P('M10 206c50-20 140-60 196-92', 'none', 3)
      + range(6, (k) => C(36 + k * 30, 204 - k * 14, 4, '#FFB74D', 2)) + R(204, 70, 18, 46, '#8D6E63', 0, 3.5) + Lc('M212 62c-6-10 6-14 0-24', '#BDBDBD', 4)
      + range(4, (k) => g(30 + k * 34, 236, 1, P('M-12 0c-4-12 0-22 6-26h12c6 4 10 14 6 26z', ['#8D6E63', '#A1887F', '#6D4C41', '#BCAAA4'][k], 3) + R(-7, -32, 14, 6, '#795548', 2, 2))) + g(48, 212, 1, C(0, 0, 4, '#FF7043', 0)) + face(110, 176, 0.3)),

  // ---------- Tainan and Kaohsiung
  L('tw/south/landmark-confucius.v1.svg', 'ศาลขงจื๊อไถหนานกับกำแพงแดง', 'The red walls of the Tainan Confucius Temple', ['tainan confucius temple', 'ศาลขงจื๊อไถหนาน', 'first academy', 'สำนักศึกษาแห่งแรก', 'red walls', 'กำแพงแดง', 'banyan tree', 'ต้นไทร', 'courtyard', 'gate of learning'], 'หาต้นไทรใหญ่ที่แผ่ร่มเงาข้างกำแพงแดง', 'Find the big banyan tree shading the red wall',
    // a low red-walled hall with a curved swallowtail roof and a round gate, a big banyan tree with hanging roots beside it, a grassy courtyard and a child with a school bag
    sky('#FFF8E1') + R(-4, 190, 248, 54, '#A5D6A7', 0, 0) + R(10, 120, 170, 70, '#D84315', 0, 4) + C(95, 162, 22, '#5D2E1E', 3) + P('M73 190v-28h44v28z', '#5D2E1E', 0)
      + swallow(95, 122, 190, '#455A64') + range(4, (k) => R(24 + k * 40, 134, 18, 14, '#FFB74D', 2, 2))
      + Lc('M210 190c-4-40 4-70-4-100', '#6D4C41', 8) + C(206, 76, 36, '#2E7D32', 3.5) + range(5, (k) => Lc(`M${184 + k * 10} 92v${30 + (k % 2) * 16}`, '#8D6E63', 2)) + kid(150, 214, '#42A5F5') + face(95, 140, 0.3)),
  L('tw/south/landmark-beefsoup.v1.svg', 'ซุปเนื้อสดยามเช้าของไถหนาน', 'Tainan fresh beef soup for breakfast', ['tainan beef soup', 'ซุปเนื้อไถหนาน', 'niu rou tang', 'หนิวโร่วทัง', 'fresh beef broth', 'น้ำซุปเนื้อสด', 'breakfast soup', 'ซุปมื้อเช้า', 'ginger slivers', 'early morning'], 'หาเนื้อสีชมพูบางๆ ที่สุกด้วยน้ำซุปร้อนที่ราดลงไป', 'Find the thin pink beef slices cooking in the hot broth being poured in',
    // a white bowl with thin pink slices of beef, a ladle pouring steaming clear broth over them so they turn pale, ginger slivers on a dish, a bowl of rice beside it and the rising sun
    sky('#FFF3E0') + C(206, 40, 18, '#FFCC80', 3) + R(-4, 200, 248, 44, '#BCAAA4', 0, 3) + P('M30 140h140c0 40-30 64-70 64s-70-24-70-64z', '#FFFFFF', 4) + E(100, 140, 70, 16, '#FFF8E1', 3)
      + range(5, (k) => E(66 + k * 17, 140 + (k % 2) * 3, 12, 6, k % 2 ? '#F48FB1' : '#F8BBD0', 2)) + g(146, 84, 1, E(0, 0, 22, 12, '#90A4AE', 3) + Lc('M18-4l40-34', '#78909C', 5), 20) + Lc('M138 96c-4 14-10 26-20 36', '#FFE0B2', 5)
      + Lc('M80 112c-4-10 4-14 0-24M110 106c-4-10 4-14 0-24', '#ECEFF1', 3) + E(200, 186, 26, 12, '#FFFFFF', 3) + range(5, (k) => Lc(`M${186 + k * 6} 184l4-6`, '#FFB74D', 2)) + face(100, 176, 0.4)),
  L('tw/south/landmark-pier2.v1.svg', 'โกดังศิลปะพีเออร์ทูริมท่าเรือเกาสง', 'The Pier-2 art warehouses in Kaohsiung', ['pier-2 art center', 'พีเออร์ทูอาร์ตเซ็นเตอร์', 'pier 2', 'ท่าเรือ 2', 'old warehouses', 'โกดังเก่า', 'kaohsiung harbour', 'ท่าเรือเกาสง', 'old railway tracks', 'harbour art park'], 'หาโกดังที่ทาสีสดๆ ข้างรางรถไฟเก่า', 'Find the brightly painted warehouses beside the old railway tracks',
    // a row of old harbour warehouses with arched roofs painted bright colours, old rusty rail tracks in the grass in front, a little park bench and a bicycle
    sky('#E1F5FE') + R(-4, 160, 248, 84, '#AED581', 0, 0) + range(3, (k) => R(10 + k * 76, 92, 70, 68, ['#FFB74D', '#4FC3F7', '#F48FB1'][k], 0, 3.5) + P(`M${6 + k * 76} 94c10-26 68-26 78 0z`, ['#EF6C00', '#0288D1', '#D81B60'][k], 3.5) + R(28 + k * 76, 122, 34, 38, '#ECEFF1', 2, 2.5) + Lc(`M${28 + k * 76} 134h34M${28 + k * 76} 146h34`, '#B0BEC5', 2))
      + Lc('M-4 196l248-6M-4 220l248-6', '#8D6E63', 4) + range(10, (k) => Lc(`M${8 + k * 24} 194l2 26`, '#A1887F', 3))
      + g(180, 236, 1, C(-14, 0, 8, 'none', 3) + C(14, 0, 8, 'none', 3) + Lc('M-14 0l8-14h16l4 14M-4-14l-2-6', '#E53935', 3)) + face(121, 112, 0.3)),
  L('tw/south/landmark-chimei.v1.svg', 'พิพิธภัณฑ์ฉีเหม่ยทรงวังยุโรปกับสระน้ำ', 'The palace-style Chimei Museum and its long pool', ['chimei museum', 'พิพิธภัณฑ์ฉีเหม่ย', 'tainan metropolitan park', 'สวนสาธารณะไถหนาน', 'white palace', 'อาคารสีขาวทรงวัง', 'dome', 'โดม', 'long reflecting pool', 'violins and art'], 'หาโดมสีเขียวบนตึกขาวที่สะท้อนในสระน้ำ', 'Find the green dome on the white building reflected in the pool',
    // a grand white museum with columns and a green copper dome, wings either side, a long reflecting pool in front with the dome mirrored in it, a path leading to it
    sky('#E3F2FD') + R(-4, 150, 248, 94, '#C5E1A5', 0, 0) + R(20, 100, 200, 50, '#FFFDF7', 0, 4) + range(8, (k) => R(32 + k * 24, 108, 8, 42, '#ECEFF1', 0, 2)) + P('M86 100h68l-34-22z', '#FFFDF7', 3)
      + P('M96 78c0-30 48-30 48 0z', '#4DB6AC', 4) + R(116, 40, 8, 10, '#4DB6AC', 1, 2.5) + R(98, 76, 44, 6, '#FFFDF7', 0, 2.5)
      + P('M60 166h120l20 70H40z', '#4FC3F7', 3.5) + P('M100 176c0 20 40 20 40 0z', '#80CBC4', 2) + Lc('M80 210h80', '#B3E5FC', 3) + range(3, (k) => C(14 + k * 100, 180 + (k % 2) * 10, 12, '#66BB6A', 2.5)) + face(120, 128, 0.35)),
  L('tw/south/landmark-milkfish.v1.svg', 'ข้าวต้มปลานวลจันทร์ไถหนาน', 'Tainan milkfish congee', ['milkfish', 'ปลานวลจันทร์', 'shi mu yu', 'สือมู่อวี๋', 'milkfish congee', 'ข้าวต้มปลา', 'tainan breakfast', 'อาหารเช้าไถหนาน', 'fish belly soup', 'fish ponds'], 'หาปลาเงินตัวยาวที่ว่ายในบ่อหลังชามข้าวต้ม', 'Find the long silver fish swimming in the pond behind the bowl',
    // a bowl of rice congee with a fan of milkfish belly, sesame and fried shallots, a silver milkfish leaping from a square fish pond with a paddle-wheel aerator behind
    sky('#E1F5FE') + R(-4, 70, 248, 60, '#4DB6AC', 0, 3) + g(190, 96, 1, R(-14, -8, 28, 16, '#FFCA28', 2, 2.5) + range(4, (k) => Lc(`M${-12 + k * 8} 8l-4 10`, '#90A4AE', 3)))
      + g(70, 70, 1, P('M-34 0c14-16 44-16 58 0-14 16-44 16-58 0zM24 0l16-12v24z', '#CFD8DC', 3) + C(-22, -2, 3, INK, 0) + Lc('M-10-4c6-2 14-2 20 0', '#90A4AE', 2), -20)
      + P('M30 150h180c0 46-40 74-90 74s-90-28-90-74z', '#FFFFFF', 4) + E(120, 150, 90, 18, '#FFF8E1', 3) + P('M80 146c10-14 70-14 80 0-10 10-70 10-80 0z', '#ECEFF1', 2.5) + range(4, (k) => Lc(`M${92 + k * 12} 140v12`, '#B0BEC5', 2))
      + range(8, (k) => C(70 + k * 14, 154 - (k % 2) * 4, 2.5, '#A1673F', 0)) + range(3, (k) => P(`M${140 + k * 10} 142l4-4 4 4z`, '#7CB342', 1.5)) + face(120, 190, 0.4)),

  // ---------- Hualien and Taitung
  L('tw/hualien/landmark-pinegarden.v1.svg', 'บ้านไม้สวนสนฮัวเหลียนบนเนินริมทะเล', 'The Hualien Pine Garden house on the hill by the sea', ['pine garden', 'สวนสนฮัวเหลียน', 'songyuan bieguan', 'ซงหยวนเปี๋ยกว่าน', 'old pine trees', 'ต้นสนเก่า', 'wooden villa', 'บ้านไม้ยุคญี่ปุ่น', 'harbour view', 'meilun river mouth'], 'หาต้นสนเก่าที่บิดเบี้ยวรอบบ้านไม้หลังเล็ก', 'Find the twisted old pines round the little wooden house',
    // a two-storey white-and-wood colonial villa with verandas on a hill, surrounded by old twisted Ryukyu pines, the blue sea and a harbour wall far behind
    sky('#E1F5FE') + P('M-4 110h248v40H-4z', '#1E88E5', 0) + Lc('M150 120h80', '#ECEFF1', 4) + P('M-4 244V150c60-20 190-20 248 0v94z', '#9CCC65', 0)
      + R(60, 120, 120, 70, '#FFFDF7', 0, 4) + Lc('M60 154h120', '#8D6E63', 4) + range(6, (k) => R(66 + k * 19, 126, 10, 22, '#A1887F', 1, 2) + R(66 + k * 19, 160, 10, 24, '#A1887F', 1, 2)) + P('M50 122h140l-16-20H66z', '#78909C', 4)
      + [[30, 150, -10], [208, 146, 12], [40, 70, 0]].map(([x, y, r]) => g(x, y, 1, Lc('M0 50c-6-20 8-30 0-50', '#6D4C41', 7) + E(-6, 0, 30, 12, '#2E7D32', 3) + E(12, -16, 22, 9, '#388E3C', 3), r)).join('') + face(120, 172, 0.3)),
  L('tw/hualien/landmark-flyingfish.v1.svg', 'ปลานกตากแห้งบนราวที่เกาะหลานอวี่', 'Flying fish drying on racks on Orchid Island', ['flying fish', 'ปลานก', 'orchid island', 'เกาะหลานอวี่', 'lanyu', 'หลานอวี่', 'drying racks', 'ราวตากปลา', 'fish season', 'island coast'], 'หาปลาที่มีครีบใหญ่เหมือนปีกห้อยอยู่บนราว', 'Find the fish with big wing-like fins hanging on the rack',
    // a wooden rack by the sea with rows of flying fish hanging to dry, their big wing fins spread, one flying fish leaping over the waves behind, green volcanic island hill
    sky('#E1F5FE') + P('M-4 120c40-60 100-70 150-40l20 40z', '#43A047', 3) + P('M-4 120h248v124H-4z', '#1E88E5', 0) + Lc('M20 140c14-4 22 4 36 0M170 150c14-4 22 4 36 0', '#90CAF9', 3)
      + g(190, 100, 1, P('M-18 0c8-8 26-8 32 0-6 8-24 8-32 0zM14 0l10-8v16z', '#90CAF9', 2.5) + P('M-6-2l-6-20 16 14zM-6 2l-6 20 16-14z', '#E3F2FD', 2.5) + C(-12, -1, 2, INK, 0), -14)
      + R(20, 150, 8, 80, '#8D6E63', 0, 3) + R(200, 150, 8, 80, '#8D6E63', 0, 3) + Lc('M16 160h196M16 196h196', '#6D4C41', 4)
      + range(2, (r) => range(6, (k) => g(44 + k * 30, 176 + r * 36, 1, P('M-5-14c-4 6-4 18 0 28h10c4-10 4-22 0-28z', '#B0BEC5', 2.5) + P('M-5-4l-10 10 10 2zM5-4l10 10-10 2z', '#ECEFF1', 2)))) + face(114, 232, 0.3)),
  L('tw/hualien/landmark-liyulake.v1.svg', 'ทะเลสาบหลี่อวี๋กับทางจักรยานรอบน้ำ', 'Liyu Lake and the bike path round it', ['liyu lake', 'ทะเลสาบหลี่อวี๋', 'carp lake', 'ทะเลสาบปลาไน', 'hualien lake', 'ทะเลสาบฮัวเหลียน', 'lakeside cycling', 'ปั่นจักรยานรอบทะเลสาบ', 'fireflies', 'misty mountains'], 'หาปลาไนที่กระโดดอยู่กลางทะเลสาบ', 'Find the carp jumping up in the middle of the lake',
    // a long green lake between misty forested mountains, a carp jumping out of the water, a lakeside path with a child cycling, fireflies on the reeds at the edge
    sky('#E8F5E9') + P('M-4 120l60-70 50 50 50-60 88 80z', '#558B2F', 4) + P('M-4 120c40-20 210-20 248 0v60H-4z', '#4DB6AC', 0) + Lc('M30 150c14-4 22 4 36 0M150 160c14-4 22 4 36 0', '#B2DFDB', 3)
      + g(120, 136, 1, P('M-22 0c10-12 32-12 40 0-8 12-30 12-40 0zM18 0l12-10v20z', '#FF8A65', 3) + C(-14, -2, 2, INK, 0) + Lc('M-30 18c4-6 8-6 12 0M20 18c4-6 8-6 12 0', '#B2DFDB', 2.5), -30)
      + R(-4, 180, 248, 64, '#AED581', 0, 0) + Lc('M-4 196h248', '#D7CCC8', 10)
      + g(150, 194, 1, C(-14, 4, 9, 'none', 3) + C(14, 4, 9, 'none', 3) + Lc('M-14 4l8-14h16l4 14', '#1E88E5', 3) + C(0, -30, 7, '#FFE0BD', 2) + P('M-6-22h12v12h-12z', '#E53935', 2) + face(0, -30, 0.18))
      + range(5, (k) => Lc(`M${20 + k * 8} 240v-30`, '#7CB342', 3) + C(22 + k * 8, 206 + (k % 2) * 10, 2.5, '#FFF59D', 0)) + face(140, 92, 0.3)),
  L('tw/hualien/landmark-lintianshan.v1.svg', 'หมู่บ้านไม้หลินเถียนซานกับรถลากซุง', 'Lintianshan, the old forestry village and its log trolleys', ['lintianshan', 'หลินเถียนซาน', 'forestry village', 'หมู่บ้านป่าไม้', 'wooden houses', 'บ้านไม้', 'log trolley', 'รถรางขนซุง', 'fenglin', 'เฟิ่งหลิน'], 'หารถรางคันเล็กที่ขนท่อนซุงบนรางแคบๆ', 'Find the little trolley carrying logs on the narrow track',
    // rows of small dark wooden houses with black roofs on a hillside, a narrow-gauge track in front with a tiny trolley loaded with logs, tall forest behind
    sky('#ECEFF1') + range(6, (k) => P(`M${-10 + k * 46} 100l22-60 22 60z`, '#33691E', 3)) + R(-4, 100, 248, 144, '#AED581', 0, 0)
      + range(3, (k) => R(14 + k * 76, 108, 62, 52, '#5D4037', 0, 3.5) + P(`M${8 + k * 76} 110l37-26 37 26z`, '#263238', 3.5) + R(30 + k * 76, 124, 16, 14, '#FFF59D', 1, 2) + range(4, (j) => Lc(`M${14 + k * 76} ${120 + j * 10}h62`, '#3E2723', 1.5)))
      + Lc('M-4 200h248M-4 214h248', '#6D4C41', 3) + range(12, (k) => Lc(`M${k * 22} 196v22`, '#8D6E63', 3)) + g(120, 190, 1, R(-36, -6, 72, 10, '#455A64', 2, 3) + C(-24, 8, 7, '#37474F', 2.5) + C(24, 8, 7, '#37474F', 2.5) + range(3, (k) => R(-36, -18 - k * 0, 72, 12, '#A1673F', 6, 3)) + C(36, -12, 6, '#E0B26E', 2.5)) + face(45, 144, 0.3)),
  L('tw/hualien/landmark-fengtianjade.v1.svg', 'หยกไต้หวันจากเฟิงเถียน', 'Taiwan jade from Fengtian', ['taiwan jade', 'หยกไต้หวัน', 'fengtian', 'เฟิงเถียน', 'nephrite', 'หยกเนฟไฟรต์', 'green stone', 'หินสีเขียว', 'jade carving', 'cat’s eye jade'], 'หาก้อนหยกสีเขียวที่ขัดจนเงาวาว', 'Find the green jade stone polished until it shines',
    // a big rough grey boulder cut open to show deep green jade inside, a polished green jade bead bracelet and a small smooth jade pebble beside it on a cloth
    R(20, 170, 200, 40, '#F8BBD0', 6, 3) + P('M30 176c-6-50 20-90 70-96 50 0 80 40 76 96z', '#9E9E9E', 4) + P('M60 176c4-36 20-62 50-64 30 2 46 30 44 64z', '#2E7D32', 3.5) + P('M80 140c6-12 16-18 26-18', '#A5D6A7', 4) + range(4, (k) => C(40 + k * 40, 120 + (k % 2) * 30, 3, '#757575', 0))
      + range(10, (k) => { const a = k / 10 * Math.PI * 2; return C(186 + Math.cos(a) * 22, 132 + Math.sin(a) * 22, 7, k % 2 ? '#66BB6A' : '#43A047', 2); }) + E(196, 190, 14, 9, '#81C784', 3) + Lc('M190 186l6-2', '#E8F5E9', 2) + face(110, 156, 0.4)),
];

export default { places: {}, items };
