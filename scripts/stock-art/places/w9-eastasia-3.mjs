// Wave 9, East Asia part 3: Hong Kong, Macau, the China country layer, Beijing and Shanghai
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const K = (file, th, en, kw, svg) => { const [cc, base] = file.split('/'); const [cat, ...rest] = base.replace(/\.v\d+\.svg$/, '').split('-'); return { id: `${cc}.${cat}.${rest.join('-')}`, cat, file, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const range = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
// a Chinese hip roof with upturned eaves
const croof = (x, y, w, c = '#FFA000') => P(`M${x - w / 2 - 10} ${y}c8-2 14-6 18-14h${w - 16}c4 8 10 12 18 14z`, c, 3.5);

const items = [
  // ---------- Hong Kong, the country layer
  K('hk/food-cheungfun.v1.svg', 'ก๋วยเตี๋ยวหลอดเชิงฝั่นราดซีอิ๊วหวาน', 'Cheung fun, rice noodle rolls with sweet soy', ['cheung fun', 'เชิงฝั่น', 'rice noodle roll', 'ก๋วยเตี๋ยวหลอด', 'chee cheong fun', 'ชีเชิงฝั่น', 'sweet soy sauce', 'ซีอิ๊วหวาน', 'sesame', 'dim sum'],
    // a plate of four smooth white rolled rice sheets cut into pieces, glossy sweet soy sauce poured over, sesame seeds and peanut sauce, a pair of chopsticks
    E(120, 150, 100, 44, '#FFFFFF', 4) + E(120, 146, 86, 34, '#E3F2FD', 2)
      + range(4, (k) => g(66 + k * 36, 144 - (k % 2) * 6, 1, R(-16, -22, 32, 44, '#FAFAFA', 14, 3.5) + Lc('M-12-10c8 4 16 4 24 0M-12 4c8 4 16 4 24 0', '#E0E0E0', 2), -8 + k * 6))
      + P('M50 160c30 10 110 10 140 0', '#8D4E1A', 0) + Lc('M54 128c20 10 40-6 60 4s40-8 70 6', '#6D3B16', 5) + range(10, (k) => E(60 + k * 13, 132 + (k % 3) * 8, 2, 1.2, '#FFF8E1', 0)) + Lc('M70 120c10-6 20 6 30 0', '#FFB74D', 4)
      + Lc('M186 90l40-58M196 94l38-56', '#D7B88A', 5) + face(120, 178, 0.4)),
  K('hk/food-claypotrice.v1.svg', 'ข้าวอบหม้อดินฮ่องกง', 'Hong Kong claypot rice', ['claypot rice', 'ข้าวหม้อดิน', 'bo zai fan', 'ปอไจ๋ฝั่น', 'chinese sausage rice', 'ข้าวกุนเชียง', 'crispy rice crust', 'ข้าวตังก้นหม้อ', 'winter dish', 'temple street'],
    // a dark brown clay pot with a handle on a little charcoal stove, the lid off showing rice topped with sliced Chinese sausage, a fried egg and a green vegetable, sweet soy being poured
    R(56, 176, 128, 40, '#455A64', 6, 4) + range(4, (k) => C(76 + k * 28, 196, 6, '#FF7043', 2))
      + P('M44 116h152c0 40-30 62-76 62s-76-22-76-62z', '#6D4C41', 4) + E(120, 116, 76, 16, '#5D4037', 3) + E(120, 116, 66, 11, '#FFF8E1', 2) + Lc('M196 120h32', '#6D4C41', 8)
      + range(5, (k) => E(84 + k * 14, 114 + (k % 2) * 2, 7, 4, '#C62828', 2)) + P('M128 104c0-8 24-8 24 0s-24 8-24 0z', '#FFFFFF', 2) + C(140, 104, 4, '#FFB300', 0) + P('M70 108c8-6 16-4 20 2', '#43A047', 3)
      + g(64, 54, 1, P('M-12-20h20l6 30h-30z', '#8D6E63', 3) + Lc('M-6 10l10 30', '#6D3B16', 4), -20) + E(190, 70, 30, 6, '#5D4037', 3) + C(190, 62, 6, '#5D4037', 2.5) + face(120, 150, 0.45)),
  K('hk/culture-redwhiteblue.v1.svg', 'ถุงลายตารางแดงขาวน้ำเงินของฮ่องกง', 'The red-white-blue striped bag of Hong Kong', ['red white blue bag', 'ถุงแดงขาวน้ำเงิน', 'hung baak laam', 'หงปากหลาม', 'striped canvas', 'ผ้าใบลายตาราง', 'hong kong symbol', 'สัญลักษณ์ฮ่องกง', 'carry bag', 'moving house'],
    // a big square zip-up carry bag of nylon canvas with red, white and blue stripes in a grid, two handles, bulging full, a little smiling face on its side
    P('M36 90h168l10 120H26z', '#FFFFFF', 4) + range(4, (k) => R(32 + k * 46, 92, 16, 116, k % 2 ? '#1E3A8A' : '#C62828', 0, 0)) + range(3, (k) => R(30, 106 + k * 36, 180, 12, k % 2 ? '#C62828' : '#1E3A8A', 0, 0))
      + P('M36 90h168l10 120H26z', 'none', 4) + Lc('M40 98h160', '#9E9E9E', 3) + P('M74 92c0-40 30-48 30-4M136 92c0-44 30-36 30 0', 'none', 6) + R(96, 136, 48, 34, '#FFFFFF', 8, 3) + face(120, 148, 0.5)),
  K('hk/animal-newt.v1.svg', 'ซาลาแมนเดอร์นิวต์ฮ่องกง', 'The Hong Kong newt', ['hong kong newt', 'นิวต์ฮ่องกง', 'paramesotriton', 'ซาลาแมนเดอร์ฮ่องกง', 'mountain stream', 'ลำธารบนเขา', 'orange spots', 'จุดสีส้ม', 'tai mo shan', 'country park'],
    // a dark brown newt with a ridge down its back and a bright orange spotted belly peeking out, sitting on a mossy stone in a clear stream
    E(120, 196, 100, 18, '#4FC3F7', 0) + P('M40 194c10-30 150-30 164 0z', '#78909C', 4) + P('M50 186c20-10 130-10 140 0', '#8BC34A', 3)
      + P('M50 150c20-30 100-40 140-14 20 0 34 10 34 20-10 6-20 6-30 4-40 10-110 14-144-10z', '#5D4037', 4) + Lc('M60 140c30-14 80-20 120-8', '#3E2723', 3) + P('M58 154c30 14 90 14 130 2', '#FF7043', 3)
      + range(5, (k) => C(76 + k * 22, 164 - (k % 2) * 2, 3.5, '#FFAB40', 0)) + Lc('M80 160l-14 20M150 162l10 18M100 150l-20-16M170 146l14-14', '#5D4037', 6) + P('M54 150c-20-4-34 4-40 14 10 0 24-2 40-8', '#5D4037', 3.5)
      + face(204, 150, 0.35)),

  // ---------- Hong Kong city
  L('hk/hongkong/landmark-bambooscaffold.v1.svg', 'นั่งร้านไม้ไผ่บนตึกสูงฮ่องกง', 'Bamboo scaffolding on a Hong Kong tower', ['bamboo scaffolding', 'นั่งร้านไม้ไผ่', 'scaffold workers', 'ช่างนั่งร้าน', 'tied with nylon strips', 'มัดด้วยเชือกไนลอน', 'building site', 'ไซต์ก่อสร้าง', 'green safety net', 'tower block'], 'หาเสาไม้ไผ่ที่มัดกันเป็นตารางสูงขึ้นไปบนตึก', 'Find the bamboo poles tied into a tall grid up the building',
    // a tall tower block with a grid of yellow bamboo poles lashed to its front, black ties at the joints, a worker in a helmet on it, part of it covered with a green net
    sky('#E1F5FE') + R(50, 20, 140, 224, '#CFD8DC', 0, 4) + range(5, (r) => range(4, (k) => R(62 + k * 32, 30 + r * 42, 22, 26, '#90A4AE', 1, 2)))
      + range(6, (k) => Lc(`M${40 + k * 32} 244V10`, '#E0B26E', 5)) + range(7, (k) => Lc(`M32 ${20 + k * 34}h176`, '#D4A050', 4)) + range(6, (k) => range(7, (r) => C(40 + k * 32, 20 + r * 34, 2.5, INK, 0)))
      + R(136, 120, 70, 124, '#66BB6A', 0, 3) + range(4, (k) => Lc(`M136 ${140 + k * 28}h70`, '#43A047', 2))
      + g(106, 120, 1, C(0, -16, 8, '#FFE0BD', 2.5) + P('M-10-20c0-10 20-10 20 0z', '#FDD835', 2.5) + P('M-8 4v-12h16v12z', '#1E88E5', 2) + face(0, -14, 0.2))),
  L('hk/hongkong/landmark-wongtaisin.v1.svg', 'อาคารวัดหวังต้าเซียนหลังคาทองแดงแดง', 'The red and gold halls of Wong Tai Sin', ['wong tai sin temple', 'วัดหวังต้าเซียน', 'sik sik yuen', 'ซิกซิกหยวน', 'red pillars', 'เสาแดง', 'golden roof', 'หลังคาทอง', 'kowloon temple', 'nine dragon wall'], 'หาหลังคาสีทองกับเสาแดงที่อยู่หน้าตึกสูง', 'Find the golden roof and red pillars in front of the tall flats',
    // a temple hall with a shining golden tiled roof and bright red pillars on a white stone terrace with balustrades, tall residential blocks of Kowloon behind
    sky('#E3F2FD') + range(4, (k) => R(10 + k * 58, 30 + (k % 2) * 20, 46, 140, '#ECEFF1', 0, 3) + range(5, (r) => Lc(`M${16 + k * 58} ${50 + (k % 2) * 20 + r * 22}h34`, '#B0BEC5', 3)))
      + R(10, 180, 220, 20, '#FFFFFF', 0, 3.5) + range(11, (k) => Lc(`M${18 + k * 20} 180v20`, '#BDBDBD', 2)) + R(-4, 200, 248, 44, '#E0E0E0', 0, 3)
      + R(46, 120, 148, 60, '#FFF3E0', 0, 3.5) + range(6, (k) => R(52 + k * 26, 124, 10, 56, '#D32F2F', 0, 2.5)) + croof(120, 120, 172, '#FFC107') + P('M50 106c20-8 120-8 140 0', '#FFB300', 3) + croof(120, 98, 120, '#FFC107')
      + face(120, 154, 0.35)),
  L('hk/hongkong/landmark-taikwun.v1.svg', 'ลานอิฐแดงของไท่ควนในย่านเซ็นทรัล', 'The red-brick parade ground of Tai Kwun, Central', ['tai kwun', 'ไท่ควน', 'centre for heritage and arts', 'ศูนย์มรดกและศิลปะ', 'old police station', 'สถานีตำรวจเก่า', 'parade ground', 'ลานกว้าง', 'central', 'big mango tree'], 'หาต้นมะม่วงใหญ่กลางลานหน้าตึกอิฐที่มีระเบียง', 'Find the big mango tree in the yard in front of the verandas',
    // an old red-and-white brick building with two floors of white arched verandas around a square yard, a big mango tree in the middle, people sitting under it
    sky('#E1F5FE') + R(-4, 196, 248, 48, '#BCAAA4', 0, 3) + R(10, 60, 220, 136, '#C1663E', 0, 4) + range(2, (r) => range(7, (k) => P(`M${18 + k * 30} ${120 + r * 64}v-28c0-14 22-14 22 0v28z`, '#FFFFFF', 3) + Lc(`M${18 + k * 30} ${120 + r * 64}h22`, '#ECEFF1', 2)))
      + Lc('M10 126h220', '#FFFFFF', 6) + P('M4 60h232l-10-14H14z', '#6D4C41', 3) + Lc('M120 220c-4-30 4-40 0-60', '#5D4037', 9) + C(120, 150, 34, '#2E7D32', 4) + C(104, 140, 18, '#43A047', 2.5) + range(3, (k) => E(110 + k * 12, 164, 4, 6, '#FFB300', 1.5))
      + kid(70, 222, '#E53935', 0.9) + kid(176, 222, '#FFCA28', 0.9) + face(120, 92, 0.3)),
  L('hk/hongkong/landmark-peaktower.v1.svg', 'อาคารพีคทาวเวอร์ทรงกระทะบนยอดเขา', 'The wok-shaped Peak Tower on Victoria Peak', ['peak tower', 'พีคทาวเวอร์', 'wok-shaped building', 'ตึกทรงกระทะ', 'victoria peak', 'ยอดเขาวิกตอเรีย', 'sky terrace 428', 'สกายเทอเรซ', 'the peak', 'harbour view'], 'หาตึกที่หลังคาโค้งเหมือนกระทะยักษ์', 'Find the building whose roof curves up like a giant wok',
    // a building with a big bowl-shaped roof curving up at both ends like a wok, set on a narrower base, on a green hilltop above a cluster of skyscrapers and the harbour
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#4FC3F7', 0, 0) + range(7, (k) => R(10 + k * 32, 150 - (k % 3) * 24, 24, 60 + (k % 3) * 24, ['#B0BEC5', '#90A4AE', '#CFD8DC'][k % 3], 0, 2.5))
      + P('M-4 160c40-40 80-60 124-62 50 2 90 26 124 62v20H-4z', '#66BB6A', 4) + R(80, 70, 80, 40, '#ECEFF1', 0, 3.5) + range(4, (k) => R(88 + k * 18, 78, 10, 24, '#4FC3F7', 1, 2))
      + P('M20 30c30 30 60 40 100 40s70-10 100-40c4 10 0 30-10 40-20 16-50 22-90 22s-70-6-90-22c-10-10-14-30-10-40z', '#78909C', 4) + Lc('M30 48c26 20 54 26 90 26s64-6 90-26', '#B0BEC5', 3) + face(120, 86, 0.35)),
  L('hk/hongkong/landmark-ladderstreet.v1.svg', 'ถนนบันไดหินพอตทิงเจอร์', 'Pottinger Street, the stone ladder street', ['pottinger street', 'ถนนพอตทิงเจอร์', 'ladder street', 'ถนนบันได', 'stone slab steps', 'บันไดหินแผ่น', 'sheung wan', 'เซิงหว่าน', 'little stalls', 'central hillside'], 'หาบันไดหินลาดชันที่มีแผงขายของเล็กๆ ทั้งสองข้าง', 'Find the steep stone steps with tiny stalls on both sides',
    // a steep street of rough granite steps climbing between old buildings, tiny stalls with striped awnings and hanging ribbons on both sides, a child climbing
    sky('#FFF8E1') + R(-4, -4, 60, 248, '#FFCC80', 0, 3) + R(184, -4, 60, 248, '#B3E5FC', 0, 3) + range(4, (k) => R(10, 20 + k * 50, 30, 30, '#FFF3E0', 2, 2) + R(198, 20 + k * 50, 30, 30, '#E1F5FE', 2, 2))
      + P('M56 244L96 10h48l40 234z', '#BDBDBD', 4) + range(14, (k) => Lc(`M${60 + k * 2.8} ${232 - k * 16}h${120 - k * 5.6}`, '#9E9E9E', 2.5)) + range(6, (k) => C(84 + (k * 17) % 70, 210 - k * 30, 2.5, '#757575', 0))
      + [[56, 140, '#E53935', 1], [184, 170, '#1E88E5', -1], [56, 70, '#43A047', 1], [184, 90, '#FB8C00', -1]].map(([x, y, c, d]) => P(`M${x} ${y}h${d * 34}l${d * 6} 14h${-d * 40}z`, c, 2.5) + R(d > 0 ? x : x - 32, y + 14, 32, 22, '#FFF8E1', 1, 2)).join('')
      + kid(120, 190, '#7E57C2', 0.9) + face(120, 110, 0.3)),

  // ---------- Macau, the country layer
  K('mo/food-peanutcandy.v1.svg', 'ขนมตุ้บตั้บถั่วลิสงมาเก๊า', 'Macau peanut candy', ['macau peanut candy', 'ขนมถั่วตัดมาเก๊า', 'peanut brittle', 'ถั่วตัด', 'sesame candy', 'งาตัด', 'candy shop', 'ร้านขนมมาเก๊า', 'taipa', 'gift box'],
    // a stack of crunchy rectangular peanut candy bars full of whole peanuts, a few sesame slices, on an open red gift box
    R(30, 150, 180, 56, '#E53935', 8, 4) + R(40, 158, 160, 40, '#FFCDD2', 4, 2)
      + [[60, 140, -6], [120, 130, 4], [178, 142, 8], [96, 104, -4], [150, 100, 6]].map(([x, y, r], k) => g(x, y, 1, R(-30, -14, 60, 28, k > 3 ? '#F5E6C8' : '#E0A040', 5, 3.5) + range(6, (j) => E(-20 + (j % 3) * 20, -6 + Math.floor(j / 2) % 2 * 12, 6, 4, k > 3 ? '#212121' : '#F3D9A4', 1.5)), r)).join('')
      + face(120, 180, 0.4)),
  K('mo/food-batatada.v1.svg', 'บาตาตาดาเค้กมันฝรั่งมาเก๊า', 'Batatada, Macanese sweet potato cake', ['batatada', 'บาตาตาดา', 'macanese potato cake', 'เค้กมันฝรั่งมาเก๊า', 'macanese dessert', 'ขนมมาเก๊ออน', 'coconut', 'มะพร้าว', 'golden crust', 'family recipe'],
    // a square golden cake with a dark caramel top and crisp edges in a baking tin, one square cut out and lifted on a cake server showing a dense yellow inside dotted with coconut
    P('M30 120h150l30 30H60z', '#90A4AE', 4) + P('M36 124h140l22 22H58z', '#8D4E1A', 3) + range(4, (k) => Lc(`M${60 + k * 30} 126l20 20`, '#6D3B16', 2)) + R(60, 150, 150, 40, '#90A4AE', 2, 4) + R(64, 150, 142, 30, '#FFCA28', 0, 2)
      + P('M30 120v40l30 30v-40z', '#78909C', 4) + g(70, 80, 1, R(-22, -16, 44, 34, '#FFCA28', 3, 3.5) + R(-22, -16, 44, 8, '#8D4E1A', 2, 2.5) + range(5, (k) => C(-14 + k * 7, 2 + (k % 2) * 7, 1.8, '#FFF8E1', 0)) + Lc('M0 18l50 40', '#B0BEC5', 6), -8) + face(134, 168, 0.4)),
  K('mo/food-porkknuckle.v1.svg', 'ขาหมูต้มน้ำส้มสายชูขิงแบบกวางตุ้ง', 'Pork knuckle in sweet ginger vinegar', ['ginger vinegar pork knuckle', 'ขาหมูน้ำส้มขิง', 'zhu jiao jiang', 'จูก๊กเกียง', 'sweet black vinegar', 'น้ำส้มสายชูดำหวาน', 'boiled eggs', 'ไข่ต้ม', 'cantonese stew', 'ginger chunks'],
    // a brown clay pot of dark glossy vinegar stew with chunks of pork knuckle, whole brown-stained boiled eggs and knobs of ginger, steam rising
    P('M30 116h180c0 56-40 92-90 92s-90-36-90-92z', '#795548', 4) + E(120, 116, 90, 22, '#5D4037', 3) + E(120, 116, 80, 16, '#3E2723', 2) + Lc('M30 120h-14M210 120h14', '#795548', 10)
      + [[84, 110], [140, 114]].map(([x, y]) => E(x, y, 14, 10, '#A1673F', 2.5) + E(x - 2, y - 3, 5, 3, '#C08A5C', 0)).join('') + range(3, (k) => P(`M${100 + k * 22} ${118 - (k % 2) * 8}c0-10 16-12 18-2-2 8-14 10-18 2z`, '#6D3B16', 2.5)) + range(3, (k) => R(66 + k * 50, 104 + (k % 2) * 8, 12, 8, '#FFE082', 3, 2))
      + Lc('M80 90c-4-10 4-14 0-24M120 86c-4-10 4-14 0-24M160 90c-4-10 4-14 0-24', '#ECEFF1', 3) + face(120, 166, 0.5)),
  K('mo/culture-mahjong.v1.svg', 'ไพ่นกกระจอกมาเก๊าบนโต๊ะ', 'Mahjong tiles on a Macau table', ['mahjong', 'ไพ่นกกระจอก', 'mahjong tiles', 'ตัวไพ่นกกระจอก', 'clacking tiles', 'เสียงไพ่กระทบกัน', 'family game', 'เกมครอบครัว', 'green table', 'cantonese game'],
    // a green square game table with a wall of ivory mahjong tiles, a few standing up showing circles and bamboo sticks drawn as dots and lines, two dice
    R(20, 110, 200, 110, '#2E7D32', 10, 4) + R(30, 120, 180, 90, '#388E3C', 6, 2)
      + range(8, (k) => R(36 + k * 21, 128, 18, 14, '#FFF8E1', 3, 2.5) + R(36 + k * 21, 140, 18, 6, '#26A69A', 2, 2))
      + range(4, (k) => g(64 + k * 38, 176, 1, R(-15, -20, 30, 40, '#FFFDF7', 4, 3.5) + R(-15, 16, 30, 6, '#26A69A', 2, 2.5) + [C(0, 0, 9, 'none', 2.5) + C(0, 0, 4, '#E53935', 0), Lc('M-6-12v20M0-12v20M6-12v20', '#43A047', 3), C(-6, -8, 3.5, '#1E88E5', 0) + C(6, 8, 3.5, '#1E88E5', 0) + C(0, 0, 3.5, '#E53935', 0), P('M-8-10h16M0-10v20M-8 10l16-6', 'none', 2.5)][k], -6 + k * 4))
      + R(170, 70, 22, 22, '#FFFFFF', 4, 3) + C(176, 76, 2.5, '#E53935', 0) + C(186, 86, 2.5, INK, 0) + R(196, 86, 20, 20, '#FFFFFF', 4, 3) + C(206, 96, 3, '#E53935', 0) + face(64, 178, 0.25)),
  K('mo/food-duckrice.v1.svg', 'ข้าวอบเป็ดแบบโปรตุเกสในมาเก๊า', 'Arroz de pato, baked duck rice', ['arroz de pato', 'อาร์โรซเดปาโต', 'duck rice', 'ข้าวอบเป็ด', 'portuguese duck rice', 'ข้าวเป็ดโปรตุเกส', 'macanese restaurant', 'ร้านอาหารมาเก๊ออน', 'chouriço slices', 'oven baked'],
    // a round clay oven dish of golden baked rice with shredded duck, slices of red sausage arranged in a ring and a crisp brown top, a wooden spoon
    E(120, 150, 100, 46, '#C1663E', 4) + E(120, 144, 88, 36, '#E8A848', 3) + range(14, (k) => C(50 + (k * 37) % 140, 128 + (k * 13) % 30, 3, '#D08A30', 0))
      + range(8, (k) => { const a = k / 8 * Math.PI * 2; return C(120 + Math.cos(a) * 54, 144 + Math.sin(a) * 20, 9, '#C62828', 2.5) + C(120 + Math.cos(a) * 54 - 2, 142 + Math.sin(a) * 20, 2, '#FFCDD2', 0); })
      + range(4, (k) => Lc(`M${100 + k * 10} ${136 + (k % 2) * 6}l8-4`, '#8D4E1A', 3)) + P('M60 120c-4 0-10-4-10-8', 'none', 0) + Lc('M190 100l40-50', '#A1673F', 6) + E(186, 108, 12, 7, '#A1673F', 3) + face(120, 178, 0.4)),

  // ---------- Macau city
  L('mo/macau/landmark-loukau.v1.svg', 'บ้านตระกูลหลูเกาและลานกลางบ้าน', 'The Lou Kau Mansion and its courtyard', ['lou kau mansion', 'บ้านหลูเกา', 'lou kau', 'หลูเกา', 'grey brick house', 'บ้านอิฐเทา', 'stained glass', 'กระจกสี', 'old merchant house', 'courtyard'], 'หาหน้าต่างกระจกสีที่ประดับอยู่บนชั้นบนของลานบ้าน', 'Find the coloured glass windows round the top of the courtyard',
    // the inside of a grey-brick Chinese merchant house, a tall open courtyard with wooden balconies, coloured glass window panels in red, blue and yellow, carved screens and hanging lamps
    sky('#E1F5FE') + R(10, 20, 220, 210, '#9E9E9E', 0, 4) + range(10, (k) => Lc(`M10 ${36 + k * 20}h220`, '#8A8A8A', 1.5)) + R(60, 40, 120, 190, '#FFF8E1', 0, 3)
      + R(60, 100, 120, 10, '#6D4C41', 0, 3) + range(6, (k) => Lc(`M${66 + k * 20} 110v-24`, '#6D4C41', 3)) + range(4, (k) => R(66 + k * 28, 46, 24, 34, ['#E57373', '#64B5F6', '#FFD54F', '#81C784'][k], 1, 2.5) + Lc(`M${66 + k * 28} 63h24M${78 + k * 28} 46v34`, '#4E342E', 1.5))
      + R(80, 130, 80, 60, '#A1673F', 2, 3) + range(3, (r) => range(4, (k) => R(86 + k * 18, 136 + r * 18, 14, 14, 'none', 2))) + P('M100 230v-30c0-14 40-14 40 0v30z', '#4E342E', 3)
      + [70, 170].map((x) => Lc(`M${x} 110v14`, INK, 2) + E(x, 132, 8, 10, '#E53935', 2.5)).join('')),
  L('mo/macau/landmark-dompedro.v1.svg', 'โรงละครดอมเปโดรที่ห้าสีเขียวอ่อน', 'The mint-green Dom Pedro V Theatre', ['dom pedro v theatre', 'โรงละครดอมเปโดรที่ห้า', 'teatro dom pedro', 'เตอาตรูดอมเปดรู', 'western theatre', 'โรงละครตะวันตก', 'st augustine square', 'จัตุรัสเซนต์ออกัสติน', 'green columns', 'neoclassical'], 'หาเสาสีขาวคู่ที่เรียงอยู่หน้าตึกสีเขียวอ่อน', 'Find the pairs of white columns on the front of the pale green building',
    // a neoclassical theatre painted pale mint green with a triangular pediment, four pairs of white columns at the front porch, arched windows, a little paved square with wave-pattern stones
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#ECEFF1', 0, 3) + Lc('M-4 210c20-8 40 8 60 0s40 8 60 0 40 8 60 0 40 8 70 0M-4 230c20-8 40 8 60 0s40 8 60 0 40 8 60 0 40 8 70 0', '#455A64', 2)
      + R(30, 90, 180, 106, '#A5D6A7', 0, 4) + P('M50 92l70-36 70 36z', '#C8E6C9', 4) + C(120, 78, 8, '#FFFFFF', 2.5)
      + range(4, (k) => R(52 + k * 38, 96, 8, 100, '#FFFFFF', 0, 2.5) + R(64 + k * 38, 96, 8, 100, '#FFFFFF', 0, 2.5)) + range(3, (k) => P(`M${82 + k * 38} 196v-30c0-10 16-10 16 0v30z`, '#4E342E', 2.5)) + R(42, 92, 156, 8, '#FFFFFF', 0, 3)
      + face(120, 140, 0.3)),
  L('mo/macau/landmark-nathcha.v1.svg', 'ศาลเจ้าน้าจาตัวเล็กข้างกำแพงเก่า', 'The little Na Tcha Temple by the old city wall', ['na tcha temple', 'ศาลเจ้าน้าจา', 'nezha temple', 'ศาลเจ้านาจา', 'old city wall', 'กำแพงเมืองเก่า', 'tiny temple', 'ศาลเจ้าเล็ก', 'world heritage', 'behind st paul’s'], 'หากำแพงดินเก่าสีเทาข้างศาลเจ้าหลังจิ๋ว', 'Find the old grey earth wall beside the tiny temple',
    // a tiny single-room Chinese temple with a grey tiled roof and green ridge, open front with red doors, next to a crumbling piece of old rammed-earth city wall, steps and a tree
    sky('#FFF8E1') + R(-4, 196, 248, 48, '#D7CCC8', 0, 3) + P('M140 196V96c10-6 30-6 40-2l10 8 30-4 24 6v92z', '#A1887F', 4) + range(5, (k) => Lc(`M140 ${116 + k * 16}h104`, '#8D6E63', 1.5)) + P('M196 110l10 20-6 10', 'none', 2)
      + R(40, 120, 96, 76, '#FFF3E0', 0, 4) + R(64, 140, 48, 56, '#C62828', 1, 3) + Lc('M88 140v56', '#8E1B1B', 2) + C(82, 170, 2.5, '#FFD54F', 0) + C(94, 170, 2.5, '#FFD54F', 0)
      + P('M28 122h120l-14-18H42z', '#78909C', 4) + Lc('M40 104c20-6 76-6 96 0', '#43A047', 4) + P('M40 104c-4-6-8-10-12-12M136 104c4-6 8-10 12-12', 'none', 3)
      + C(20, 120, 20, '#66BB6A', 3) + Lc('M20 140v56', '#6D4C41', 5) + face(88, 128, 0.25)),
  L('mo/macau/landmark-pawnshop.v1.svg', 'หอเก็บของโรงรับจำนำเก่าเต็กเซ่งออน', 'The tall strongroom tower of the old Tak Seng On pawnshop', ['tak seng on pawnshop', 'โรงรับจำนำเต็กเซ่งออน', 'old pawnshop', 'โรงรับจำนำเก่า', 'storage tower', 'หอเก็บของ', 'avenida de almeida ribeiro', 'ถนนซานมาลู', 'thick stone walls', 'museum'], 'หาหอสูงที่มีหน้าต่างเล็กนิดเดียวไว้กันขโมย', 'Find the tall tower with only tiny windows to keep thieves out',
    // a tall narrow grey stone tower with tiny barred windows and a flat roof, joined to a low shophouse with a wooden counter window at the front, a wooden ladder-like shelf inside
    sky('#E3F2FD') + R(-4, 210, 248, 34, '#BDBDBD', 0, 3) + R(110, 24, 76, 186, '#90A4AE', 0, 4) + range(6, (k) => R(140, 40 + k * 28, 14, 10, '#37474F', 1, 2) + Lc(`M145 ${40 + k * 28}v10M149 ${40 + k * 28}v10`, '#90A4AE', 1.5))
      + range(8, (k) => Lc(`M110 ${50 + k * 22}h76`, '#78909C', 1.5)) + P('M104 24h88v-10h-88z', '#607D8B', 3)
      + R(20, 120, 94, 90, '#FFF8E1', 0, 4) + P('M12 122h106l-10-14H22z', '#455A64', 3) + R(32, 140, 70, 40, '#5D4037', 2, 3) + range(4, (k) => Lc(`M${40 + k * 16} 140v40`, '#A1887F', 3)) + R(30, 180, 74, 10, '#8D6E63', 1, 3)
      + kid(204, 236, '#FFCA28', 0.9) + face(148, 200, 0.3)),
  L('mo/macau/landmark-loulimieoc.v1.svg', 'สวนหลูเหลียนอวี๋กับศาลาในบึงบัว', 'Lou Lim Ieoc Garden and its lotus pond pavilion', ['lou lim ieoc garden', 'สวนหลูเหลียนอวี๋', 'chinese garden', 'สวนจีน', 'lotus pond', 'บึงบัว', 'nine-turn bridge', 'สะพานเก้าโค้ง', 'yellow pavilion', 'rockery'], 'หาศาลาสีเหลืองที่ยื่นลงในบึงบัว', 'Find the yellow pavilion reaching out over the lotus pond',
    // a yellow Western-style pavilion with white columns at the edge of a lotus pond, big round lotus leaves and pink flowers, a rockery with holes and a little bamboo grove
    sky('#E8F5E9') + R(-4, 140, 248, 104, '#4DB6AC', 0, 0) + R(110, 80, 120, 60, '#FFD54F', 0, 4) + range(5, (k) => R(118 + k * 22, 86, 8, 54, '#FFFFFF', 0, 2)) + P('M102 82h136l-12-16H114z', '#8D6E63', 3.5) + R(106, 140, 128, 10, '#BDBDBD', 1, 3)
      + range(6, (k) => E(30 + (k % 3) * 60, 180 + Math.floor(k / 3) * 34, 26, 10, '#66BB6A', 3) + Lc(`M${30 + (k % 3) * 60} 180l-10-6`, '#2E7D32', 2)) + [[56, 160], [150, 200]].map(([x, y]) => P(`M${x} ${y}c-10-10-6-22 0-26 6 4 10 16 0 26z`, '#F48FB1', 2.5) + P(`M${x} ${y}c-14-4-16-14-12-20 6 2 10 10 12 20zM${x} ${y}c14-4 16-14 12-20-6 2-10 10-12 20z`, '#F8BBD0', 2)).join('')
      + P('M10 140c-6-30 4-60 30-70 24 6 34 40 26 70z', '#9E9E9E', 3.5) + C(30, 104, 6, '#BDBDBD', 2) + C(44, 124, 5, '#BDBDBD', 2) + face(170, 114, 0.3)),

  // ---------- China, the country layer
  K('cn/culture-knot.v1.svg', 'เงื่อนจีนสีแดงพู่ห้อย', 'The red Chinese knot with its tassel', ['chinese knot', 'เงื่อนจีน', 'zhongguo jie', 'จงกั๋วเจี๋ย', 'red cord', 'เชือกแดง', 'tassel', 'พู่', 'good luck knot', 'new year decoration'],
    // a red cord tied into a square lattice knot with looped petals at its edges, a bead above, a long red tassel hanging below
    Lc('M120 14v34', '#C62828', 5) + C(120, 52, 9, '#FFC107', 3)
      + g(120, 110, 1, P('M-40 0l40-40 40 40-40 40z', '#E53935', 5) + range(3, (k) => Lc(`M${-26 + k * 13} ${-14 - k * 13}l40 40`, '#B71C1C', 3) + Lc(`M${26 - k * 13} ${-14 - k * 13}l-40 40`, '#B71C1C', 3)) + [[-40, 0], [40, 0], [0, -40], [0, 40]].map(([x, y]) => C(x * 1.25, y * 1.25, 11, 'none', 5)).join('') + face(0, 0, 0.35))
      + C(120, 176, 8, '#FFC107', 3) + P('M106 184h28l8 46h-44z', '#E53935', 3.5) + range(5, (k) => Lc(`M${106 + k * 7} 190l${-2 + k} 38`, '#B71C1C', 2))),
  K('cn/culture-abacus.v1.svg', 'ลูกคิดจีน', 'The Chinese abacus', ['abacus', 'ลูกคิด', 'suanpan', 'ซ่วนผาน', 'counting beads', 'ลูกคิดนับเลข', 'old shop counter', 'ร้านค้าเก่า', 'maths', 'wooden frame'],
    // a dark wooden abacus frame with a crossbar, rows of round red and yellow beads on rods, two beads above the bar and five below on each rod, some slid up
    R(24, 60, 192, 130, '#6D4C41', 8, 5) + R(36, 72, 168, 106, '#FFF3E0', 2, 3) + Lc('M36 104h168', '#6D4C41', 6)
      + range(7, (k) => Lc(`M${52 + k * 23} 72v106`, '#8D6E63', 2.5) + range(2, (j) => E(52 + k * 23, 82 + j * 10 + (k % 3 === 0 ? 0 : 0), 10, 5, '#E53935', 2.5)) + range(5, (j) => E(52 + k * 23, (k % 2 ? 114 : 130) + j * 10, 10, 5, '#FFC107', 2.5)))
      + face(120, 210, 0.5)),
  K('cn/culture-xiangqi.v1.svg', 'หมากรุกจีนเซียงฉี', 'Xiangqi, Chinese chess', ['xiangqi', 'เซียงฉี', 'chinese chess', 'หมากรุกจีน', 'round pieces', 'ตัวหมากกลม', 'river in the middle', 'แม่น้ำกลางกระดาน', 'park game', 'เกมในสวนสาธารณะ'],
    // a square paper board with a grid of lines and the river gap in the middle, round wooden disc pieces with red and black rims sitting on the line crossings, one being moved
    R(26, 40, 188, 170, '#FFE0B2', 4, 4) + range(8, (k) => Lc(`M${42 + k * 22} 56v62M${42 + k * 22} 132v62`, '#8D6E63', 2)) + range(5, (k) => Lc(`M42 ${56 + k * 15.5}h154M42 ${132 + k * 15.5}h154`, '#8D6E63', 2)) + Lc('M42 118v14M196 118v14', '#8D6E63', 2) + Lc('M60 125h120', '#4FC3F7', 4)
      + [[64, 56, 1], [108, 56, 1], [152, 71, 1], [64, 194, 0], [130, 178, 0], [174, 194, 0], [86, 102, 1]].map(([x, y, red]) => C(x, y, 11, '#FFF8E1', 3) + C(x, y, 7, 'none', 2.5).replace('stroke-width', `stroke="${red ? '#E53935' : INK}" stroke-width`)).join('')
      + g(160, 140, 1, C(0, 0, 13, '#FFF8E1', 3.5) + C(0, 0, 8, '#E53935', 0) + face(0, -1, 0.25))),
  K('cn/culture-erhu.v1.svg', 'ซอเอ้อร์หูจีนสองสาย', 'The erhu, the two-string Chinese fiddle', ['erhu', 'เอ้อร์หู', 'chinese fiddle', 'ซอจีน', 'two strings', 'สองสาย', 'bow', 'คันชัก', 'snakeskin drum', 'traditional music'],
    // an erhu standing upright: a long dark wooden neck with two tuning pegs at the top, a small hexagonal sound box at the bottom, two thin strings and a horsehair bow passing between them
    Lc('M120 30v150', '#5D4037', 7) + P('M114 30c0-14 12-14 12 0', '#5D4037', 3) + R(126, 46, 20, 7, '#8D6E63', 3, 2.5) + R(126, 64, 20, 7, '#8D6E63', 3, 2.5)
      + P('M98 176h44l8 14-8 14H98l-8-14z', '#8D4E1A', 4) + E(120, 190, 14, 10, '#FFF8E1', 2.5) + Lc('M118 40v144M122 40v144', '#FFD54F', 1.5) + R(114, 168, 12, 6, '#FFF8E1', 1, 1.5)
      + Lc('M40 150l170-30', '#A1673F', 4) + Lc('M44 154l166-30', '#FFFDF7', 2) + P('M36 146l8 12-4 4z', '#A1673F', 2.5) + face(120, 196, 0.25)),

  // ---------- Beijing
  L('cn/beijing/landmark-jingshan.v1.svg', 'ศาลาวั่นชุนบนเนินจิ่งซานมองพระราชวังต้องห้าม', 'Wanchun Pavilion on Jingshan hill above the palace roofs', ['jingshan park', 'สวนจิ่งซาน', 'coal hill', 'เนินเขาถ่านหิน', 'wanchun pavilion', 'ศาลาวั่นชุน', 'golden roofs view', 'วิวหลังคาทอง', 'hilltop', 'peony garden'], 'หาศาลาบนยอดเนินที่มองเห็นหลังคาสีทองเรียงยาว', 'Find the pavilion on the hilltop that looks down on rows of golden roofs',
    // a square three-tier golden pavilion on top of a tree-covered hill, below it a sea of golden palace roofs stretching away, a child pointing from the steps
    sky('#E3F2FD') + range(5, (k) => P(`M${-10 + k * 52} 236l26-14h26l26 14z`, '#FFB300', 3)) + range(5, (k) => R(-4 + k * 52, 236, 48, 8, '#C62828', 0, 2))
      + P('M10 224c30-60 60-110 110-112 50 2 80 52 110 112z', '#66BB6A', 4) + range(6, (k) => C(40 + k * 32, 196 - Math.abs(k - 2.5) * 16, 12, '#43A047', 2.5))
      + R(96, 86, 48, 26, '#C62828', 0, 3) + croof(120, 86, 76) + R(104, 64, 32, 10, '#C62828', 0, 2.5) + croof(120, 66, 56) + R(110, 46, 20, 8, '#C62828', 0, 2.5) + croof(120, 48, 38) + C(120, 30, 5, '#FFC107', 2.5)
      + kid(72, 172, '#1E88E5', 0.8) + face(120, 100, 0.25)),
  L('cn/beijing/landmark-zhajiangmian.v1.svg', 'บะหมี่จ้าเจี้ยงซอสถั่วเหลืองหมักปักกิ่ง', 'Zhajiangmian, noodles with black bean sauce', ['zhajiangmian', 'จ้าเจี้ยงเมี่ยน', 'fried sauce noodles', 'บะหมี่ซอสผัด', 'black bean sauce', 'ซอสเต้าเจี้ยวดำ', 'cucumber strips', 'แตงกวาซอย', 'old beijing noodles', 'hand-pulled noodles'], 'หาผักซอยหลายสีที่วางเรียงรอบชามก่อนคลุก', 'Find the little piles of sliced vegetables round the bowl before mixing',
    // a big bowl of thick white noodles with a mound of dark brown pork and bean sauce on top, little piles of cucumber, radish, bean sprouts, soybeans and celery arranged round it in small dishes
    E(120, 130, 70, 18, '#FFFFFF', 4) + P('M50 130c0 40 30 60 70 60s70-20 70-60', '#FFFFFF', 4) + E(120, 130, 62, 13, '#FFF3E0', 2) + range(8, (k) => Lc(`M${70 + k * 14} 132c4-10-4-14 2-24`, '#FFE0B2', 3)) + P('M96 120c4-20 44-20 48 0z', '#4E342E', 3) + range(4, (k) => C(106 + k * 9, 114, 2.5, '#6D4C41', 0))
      + [[30, 70, '#7CB342', 'M-8-2h16M-8 2h16'], [90, 46, '#F8BBD0', 'M-6 0h12'], [150, 46, '#FFF9C4', 'M-8-3l6 6M0-3l6 6'], [210, 70, '#81C784', 'M-4-4l2 2M4 0l2 2'], [40, 208, '#AED581', 'M-8 0h16'], [200, 208, '#FFAB91', 'M-6-2h12']].map(([x, y, c, d]) => E(x, y, 22, 12, '#ECEFF1', 3) + E(x, y - 2, 14, 6, c, 2)).join('')
      + Lc('M164 92l50-60M172 96l48-58', '#A1673F', 5) + face(120, 162, 0.4)),
  L('cn/beijing/landmark-ludagunr.v1.svg', 'ขนมลูต่ากุ้นเอ๋อร์ข้าวเหนียวคลุกถั่ว', 'Lüdagunr, the rolling donkey sticky rice rolls', ['ludagunr', 'ลูต่ากุ้นเอ๋อร์', 'donkey rolling', 'ลาคลุกฝุ่น', 'sticky rice roll', 'ข้าวเหนียวม้วน', 'soybean flour', 'ผงถั่วเหลือง', 'red bean paste', 'old beijing snack'], 'หาผงสีเหลืองที่โรยบนข้าวเหนียวม้วนเหมือนฝุ่น', 'Find the yellow powder dusted on the rolls like dust',
    // a plate of sliced sticky rice rolls showing a red bean spiral inside, all coated in golden soybean flour, a little heap of the flour and a spoon, flour dust floating
    E(120, 160, 100, 36, '#FFFFFF', 4) + E(120, 156, 86, 26, '#E8F5E9', 2)
      + range(5, (k) => g(56 + k * 32, 148 - (k % 2) * 8, 1, C(0, 0, 16, '#E6C35C', 3.5) + P('M0 0c0-6 8-6 8 0s-12 10-14 0 6-14 16-10', '#8E3B3B', 3) + range(4, (j) => C(-10 + j * 6, -12 + (j % 2) * 3, 1.5, '#F3D9A4', 0))))
      + P('M160 108c4-16 30-16 34 0z', '#E6C35C', 3) + Lc('M190 100l30-40', '#B0BEC5', 4) + range(8, (k) => C(40 + k * 22, 90 + (k * 17) % 30, 2, '#F3D9A4', 0)) + face(120, 184, 0.4)),
  L('cn/beijing/landmark-lamatemple.v1.svg', 'ประตูซุ้มหลายชั้นของวัดลามะยงเหอกง', 'The painted arch gates of Yonghegong', ['yonghegong', 'ยงเหอกง', 'lama temple', 'วัดลามะ', 'painted archway', 'ซุ้มประตูไม้ทาสี', 'paifang', 'ไผฟาง', 'courtyards', 'dongcheng'], 'หาซุ้มประตูไม้สามช่องที่มีหลังคาเล็กๆ ซ้อนกัน', 'Find the three-opening wooden archway with little roofs on top',
    // a tall three-bay painted wooden archway (paifang) with red posts, blue and green painted beams and three little yellow tiled roofs on top, a long red temple wall behind
    sky('#E3F2FD') + R(-4, 150, 248, 50, '#C62828', 0, 3) + P('M-4 150h248l-6-10H2z', '#FFB300', 3) + R(-4, 200, 248, 44, '#E0E0E0', 0, 3)
      + range(4, (k) => R(40 + k * 50, 92, 10, 108, '#D32F2F', 0, 3) + R(36 + k * 50, 194, 18, 8, '#9E9E9E', 1, 2))
      + R(40, 92, 160, 18, '#1E88E5', 0, 3) + range(8, (k) => R(44 + k * 20, 96, 12, 10, k % 2 ? '#43A047' : '#FFD54F', 1, 1.5)) + R(54, 70, 132, 22, '#43A047', 0, 3)
      + croof(120, 58, 70, '#FFC107') + croof(52, 70, 40, '#FFC107') + croof(188, 70, 40, '#FFC107') + R(96, 58, 48, 12, '#C62828', 0, 2.5) + face(120, 166, 0.3)),

  // ---------- Shanghai
  L('cn/shanghai/landmark-jingan.v1.svg', 'วัดจิ้งอานหลังคาทองกลางตึกสูง', 'Jing’an Temple’s golden roofs among the towers', ['jing’an temple', 'วัดจิ้งอาน', 'jingan', 'จิ้งอาน', 'golden roofs', 'หลังคาสีทอง', 'nanjing west road', 'ถนนหนานจิงตะวันตก', 'temple in the city', 'skyscrapers'], 'หาหลังคาสีทองที่อยู่ระหว่างตึกกระจกสูง', 'Find the golden roofs squeezed between the tall glass towers',
    // a temple with shining gold roofs and pale yellow walls, a small golden-roofed pagoda tower, squeezed between tall blue glass skyscrapers, a busy road in front
    sky('#E3F2FD') + R(-4, 210, 248, 34, '#9E9E9E', 0, 3) + Lc('M10 226h30M80 226h30M150 226h30', '#FFFFFF', 3)
      + R(-4, 20, 56, 190, '#90CAF9', 0, 3.5) + R(188, 30, 56, 180, '#64B5F6', 0, 3.5) + range(7, (k) => Lc(`M-4 ${40 + k * 24}h56M188 ${50 + k * 22}h56`, '#E3F2FD', 2))
      + R(60, 150, 120, 60, '#FFF59D', 0, 4) + range(4, (k) => R(70 + k * 28, 166, 16, 26, '#C62828', 2, 2)) + croof(120, 150, 138, '#FFC107')
      + R(104, 100, 32, 30, '#FFF59D', 0, 3) + croof(120, 104, 54, '#FFC107') + R(108, 78, 24, 14, '#FFF59D', 0, 2.5) + croof(120, 80, 42, '#FFC107') + Lc('M120 66v-16', '#FFB300', 4) + face(120, 194, 0.3)),
  L('cn/shanghai/landmark-naturalhistory.v1.svg', 'พิพิธภัณฑ์ประวัติศาสตร์ธรรมชาติเซี่ยงไฮ้ทรงเปลือกหอยทาก', 'The snail-shell Shanghai Natural History Museum', ['shanghai natural history museum', 'พิพิธภัณฑ์ประวัติศาสตร์ธรรมชาติเซี่ยงไฮ้', 'nautilus building', 'ตึกทรงเปลือกหอย', 'jing’an sculpture park', 'สวนประติมากรรมจิ้งอาน', 'dinosaur skeletons', 'โครงกระดูกไดโนเสาร์', 'green roof', 'cell wall'], 'หาตึกที่หมุนวนขึ้นเหมือนเปลือกหอยทาก', 'Find the building that spirals up like a snail shell',
    // a big building curling round in a spiral like a snail shell, its roof covered in grass, a wall of cell-like glass panes on one side, an oval pond in the middle, a dinosaur skeleton outline inside a window
    sky('#E1F5FE') + R(-4, 190, 248, 54, '#AED581', 0, 0)
      + P('M20 190c0-70 50-120 110-120s100 40 100 90c0 20-6 30-10 30H20z', '#A5D6A7', 4) + P('M60 190c0-44 30-76 70-76s64 26 64 56v20z', '#CFD8DC', 3.5) + P('M96 190c0-22 16-40 36-40s30 14 30 30v10z', '#4FC3F7', 3)
      + range(5, (k) => P(`M${70 + k * 24} ${140 - (k % 2) * 6}l12-8 12 8-12 8z`, '#E1F5FE', 2)) + range(4, (k) => Lc(`M${30 + k * 50} 150c10-10 20-10 30 0`, '#7CB342', 2.5))
      + g(132, 170, 0.6, Lc('M-20 6c10-16 30-16 40-4l14-10M-14 6v10M14 6v10', INK, 4) + C(36, -10, 5, 'none', 3)) + face(130, 106, 0.3)),
  L('cn/shanghai/landmark-lujiazuibridge.v1.svg', 'สะพานคนเดินวงกลมลู่เจียจุ่ย', 'The round skywalk of Lujiazui', ['lujiazui skywalk', 'สะพานลอยวงกลมลู่เจียจุ่ย', 'circular pedestrian bridge', 'สะพานคนเดินวงกลม', 'pudong', 'ผู่ตง', 'elevated walkway', 'ทางเดินยกระดับ', 'roundabout in the sky', 'skyscrapers'], 'หาสะพานที่เป็นวงกลมใหญ่ลอยอยู่เหนือถนน', 'Find the bridge that makes a big ring in the air over the roads',
    // a big round ring-shaped walkway on pillars high above a crossroads with cars, people walking round it, skyscrapers on every side
    sky('#E3F2FD') + range(6, (k) => R(-4 + k * 42, 10 + (k % 3) * 20, 36, 140, ['#90A4AE', '#B0BEC5', '#CFD8DC'][k % 3], 0, 3)) + R(-4, 150, 248, 94, '#9E9E9E', 0, 0) + Lc('M120 150v94M-4 196h248', '#FFFFFF', 3)
      + range(4, (k) => R(52 + k * 42, 160, 8, 50, '#ECEFF1', 0, 3)) + E(120, 160, 100, 30, 'none', 0) + E(120, 160, 100, 30, '#ECEFF1', 4) + E(120, 160, 82, 20, '#9E9E9E', 3) + Lc('M30 160c10 18 170 18 180 0', '#4FC3F7', 3)
      + range(4, (k) => g(48 + k * 48, 150 + (k % 2) * 16, 0.55, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', ['#E53935', '#FFCA28', '#26A69A', '#7E57C2'][k], 2)))
      + R(30, 216, 26, 14, '#E53935', 4, 2.5) + R(170, 220, 26, 14, '#FFCA28', 4, 2.5) + face(120, 116, 0.3)),
  L('cn/shanghai/landmark-powerstation.v1.svg', 'ปล่องไฟโรงไฟฟ้าเก่าที่กลายเป็นหอศิลป์', 'The old power station chimney that became an art museum', ['power station of art', 'หอศิลป์โรงไฟฟ้า', 'chimney thermometer', 'ปล่องไฟเทอร์โมมิเตอร์', 'huangpu riverside', 'ริมแม่น้ำหวงผู่', 'old power plant', 'โรงไฟฟ้าเก่า', 'contemporary art', 'expo park'], 'หาเส้นไฟสีแดงบนปล่องไฟสูงที่บอกอุณหภูมิ', 'Find the red light up the tall chimney that tells the temperature',
    // a long low brick-and-glass hall by the river with one tall round chimney rising from it, a red thermometer line of light running up the chimney, the river in front
    sky('#E1F5FE') + R(-4, 190, 248, 54, '#4FC3F7', 0, 0) + Lc('M20 210c14-4 22 4 36 0M150 220c14-4 22 4 36 0', '#B3E5FC', 3)
      + R(20, 130, 200, 60, '#B0BEC5', 0, 4) + range(8, (k) => R(28 + k * 24, 140, 18, 40, '#E3F2FD', 1, 2)) + P('M14 132h212l-10-14H24z', '#78909C', 3.5)
      + P('M146 130V24h30v106z', '#A1887F', 4) + range(6, (k) => Lc(`M146 ${40 + k * 16}h30`, '#8D6E63', 1.5)) + R(156, 34, 10, 90, '#FFFFFF', 4, 2.5) + R(158, 70, 6, 52, '#E53935', 3, 0) + C(161, 124, 8, '#E53935', 2.5)
      + range(5, (k) => Lc(`M146 ${44 + k * 14}h-6`, INK, 2)) + face(80, 160, 0.3)),
  L('cn/shanghai/landmark-moller.v1.svg', 'บ้านโมลเลอร์ปราสาทเทพนิยายเซี่ยงไฮ้', 'The fairy-tale Moller Villa', ['moller villa', 'บ้านโมลเลอร์', 'fairy-tale castle house', 'บ้านปราสาทเทพนิยาย', 'shaanxi south road', 'ถนนส่านซีใต้', 'pointed towers', 'หอยอดแหลม', 'norwegian style', 'garden villa'], 'หายอดหลังคาแหลมๆ หลายอันที่ชี้ขึ้นฟ้าเหมือนปราสาท', 'Find the many pointy roof tops reaching up like a castle',
    // a cream villa with brown timber trim and many steep pointed spires and gables of different heights, a round tower with a cone roof, a green lawn and flower beds
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#AED581', 0, 0)
      + R(40, 110, 150, 86, '#FFF3E0', 0, 4) + range(5, (k) => R(52 + k * 28, 128, 14, 22, '#8D6E63', 1, 2) + R(52 + k * 28, 164, 14, 22, '#8D6E63', 1, 2))
      + P('M36 112l26-50 26 50z', '#A1673F', 3.5) + P('M84 112l30-70 30 70z', '#8D4E1A', 3.5) + P('M140 112l26-46 26 46z', '#A1673F', 3.5)
      + R(178, 90, 34, 106, '#FFE0B2', 0, 3.5) + P('M172 92l23-62 23 62z', '#6D3B16', 3.5) + range(3, (k) => R(188, 110 + k * 26, 14, 14, '#8D6E63', 1, 2)) + Lc('M114 42v-20M195 30v-16', INK, 3)
      + range(5, (k) => C(30 + k * 44, 206, 6, ['#F06292', '#FFD54F', '#BA68C8'][k % 3], 2)) + face(110, 176, 0.3)),
];

export default { places: {}, items };
