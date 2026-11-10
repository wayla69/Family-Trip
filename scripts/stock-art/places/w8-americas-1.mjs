// Wave 8, the Americas (1): the United States (country layer), New York, California, Orlando, Hawaii, Canada (country layer), Vancouver — one new idea per picture
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (us/newyork/landmark-flatiron.v1.svg → us-newyork.landmark.flatiron; us/orlando/… → p-orlando…)
const SCOPE = { 'us-orlando': 'p-orlando', 'us-yellowstone': 'p-yellowstone' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture): free-standing on a transparent ground
const K = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const band = (d, colour, w) => Lc(d, INK, w + 5) + Lc(d, colour, w);
const palm = (x, y, h) => Lc(`M${x} ${y}c4-${h * 0.4}-2-${h * 0.7} 4-${h}`, '#6D4C41', 5) + [-26, -12, 0, 14, 28].map((dx) => Lc(`M${x + 4} ${y - h}q${dx * 0.6}-10 ${dx} ${8 - Math.abs(dx) * 0.1}`, '#2E7D32', 4)).join('');
const steam = (x, y) => Lc(`M${x} ${y}c-6-8 6-14 0-22M${x + 14} ${y + 2}c-6-8 6-14 0-22`, '#B0BEC5', 3);

const items = [
  // ---------- the United States (country layer)
  K('us', 'food', 'smores', 'สมอร์ขนมปิ้งรอบกองไฟ', 'S\'mores by the campfire', ['smores', "s'mores", 'สมอร์', 'toasted marshmallow', 'มาร์ชเมลโลว์ปิ้ง', 'graham cracker', 'แครกเกอร์', 'campfire', 'กองไฟ', 'camping treat'],
    // a toasted golden marshmallow with a smiling face squashed between two square graham crackers with a melting square of chocolate, a second marshmallow on a stick over little campfire flames
    g(0, 0, 1, Lc('M150 30l-60 70', '#A1673F', 5) + E(158, 24, 14, 11, '#FFE0B2', 3) + E(162, 20, 6, 4, '#D7A15A', 0)
      + P('M168 214c-10-20 2-34 12-46 2 12 10 14 10 26 6-6 6-14 4-20 12 10 16 24 8 40z', '#FF7043', 3) + P('M176 212c-4-10 2-16 6-22 2 8 8 10 6 22z', '#FFD54F', 2) + Lc('M150 218l60-8M156 208l52 12', '#6D4C41', 6))
      + g(92, 140, 1, R(-58, 30, 116, 26, '#D7A15A', 6, 3.5) + [-36, 0, 36].map((x) => C(x, 43, 2.5, '#A1673F', 0)).join('') + Lc('M-56 43h112', '#A1673F', 1.5)
        + R(-44, 18, 88, 14, '#5D4037', 3, 3) + P('M-30 32c0 12 6 14 6 4M10 32c0 16 8 18 8 4', '#5D4037', 2.5)
        + P('M-50 18c-6-34 16-50 50-50s56 16 50 50z', '#FFF8E1', 3.5) + P('M-40-14c10-12 30-16 46-14', 'none', 0) + E(-6, -24, 24, 6, '#F3C27A', 0) + face(0, -4, 0.55)
        + R(-58, -58, 116, 26, '#D7A15A', 6, 3.5) + [-36, 0, 36].map((x) => C(x, -45, 2.5, '#A1673F', 0)).join('') + Lc('M-56-45h112', '#A1673F', 1.5))),
  K('us', 'food', 'applepie', 'พายแอปเปิลหน้าตาข่าย', 'Apple pie with a lattice top', ['apple pie', 'พายแอปเปิล', 'lattice crust', 'แป้งพายลายตาข่าย', 'cinnamon apples', 'แอปเปิลอบอบเชย', 'vanilla ice cream', 'ไอศกรีมวานิลลา', 'thanksgiving', 'dessert'],
    // a round golden pie in a dish seen from a little above, a woven lattice of pastry strips, one slice pulled out showing chunks of apple, a scoop of vanilla ice cream on the slice, steam curls, a face on the pie
    E(110, 150, 92, 44, '#90CAF9', 3.5) + E(110, 140, 82, 38, '#E8A657', 3.5) + E(110, 136, 70, 30, '#C77B30', 0)
      + [-54, -30, -6, 18, 42].map((x) => Lc(`M${110 + x} ${110 - Math.abs(x) * 0.1}c4 20 4 40 0 56`, '#F6C77E', 8)).join('') + [118, 134, 150].map((y) => Lc(`M44 ${y}c40 4 90 4 132 0`, '#F6C77E', 8)).join('')
      + face(104, 134, 0.42) + steam(80, 96) + steam(130, 92)
      + g(178, 196, 1, P('M-40 10l40-46 40 46z', '#F6C77E', 3.5) + P('M-34 8l34-38 34 38z', '#FFF3C4', 2) + [[-14, 0], [8, -6], [-2, -16], [16, 4]].map(([x, y]) => R(x - 5, y - 4, 10, 8, '#FFE082', 2, 1.5)).join('') + R(-42, 8, 84, 10, '#E8A657', 4, 3)
        + P('M-6-34c-14-2-16-20 0-24s22 8 18 18c-2 6-8 8-18 6z', '#FFFDE7', 3) + C(0, -48, 2, '#5D4037', 0))),
  K('us', 'culture', 'lemonadestand', 'ซุ้มขายน้ำมะนาวของเด็กๆ', 'A kids\' lemonade stand', ['lemonade stand', 'ซุ้มน้ำมะนาว', 'lemonade', 'น้ำมะนาว', 'summer', 'หน้าร้อน', 'front yard', 'หน้าบ้าน', 'kids business', 'pitcher of lemonade'],
    // a little wooden stand with a yellow-and-white striped awning on two posts, a big glass pitcher of yellow lemonade with lemon slices and ice, paper cups in a row, a smiling lemon, a child behind the counter
    R(40, 64, 8, 150, '#A1673F', 2, 3) + R(192, 64, 8, 150, '#A1673F', 2, 3) + P('M26 66h188l-10 28H36z', '#FFEB3B', 3.5) + [0, 1, 2, 3, 4].map((k) => P(`M${44 + k * 34} 66h17l-2 28h-16z`, '#FFFFFF', 0)).join('') + P('M36 94q12 12 24 0 12 12 24 0 12 12 24 0 12 12 24 0 12 12 24 0 12 12 24 0 12 12 24 0', '#FFEB3B', 3)
      + kid(120, 140, '#1E88E5', 1.3)
      + R(30, 150, 180, 70, '#FFCC80', 4, 3.5) + Lc('M30 172h180M30 196h180', '#E0A060', 2) + R(26, 142, 188, 12, '#D7A15A', 3, 3)
      + P('M62 142v-40c0-6 4-8 10-8h22c6 0 10 2 10 8v40z', '#FFF59D', 3.5) + P('M104 104c12 0 14 22 0 26', 'none') + R(66, 106, 34, 10, '#FFFFFF', 3, 0) + C(76, 126, 7, '#FFEB3B', 2) + C(92, 118, 6, '#FFEB3B', 2) + R(78, 98, 10, 8, '#E1F5FE', 1, 1.5)
      + [140, 158, 176].map((x) => P(`M${x} 142l2-16h12l2 16z`, '#FFFFFF', 2.5)).join('') + g(194, 128, 1, E(0, 0, 13, 11, '#FFEB3B', 3) + face(0, -2, 0.24))),
  // ---------- New York
  L('us/newyork/landmark-flatiron.v1.svg', 'ตึกแฟลตไอออนรูปเตารีด', 'The Flatiron Building, shaped like an iron', ['flatiron building', 'ตึกแฟลตไอออน', 'madison square', 'เมดิสันสแควร์', 'triangle building', 'ตึกสามเหลี่ยม', 'fifth avenue', 'ฟิฟท์อเวนิว', 'broadway', 'wedge-shaped skyscraper'], 'หาปลายตึกที่บางเฉียบเหมือนหัวเตารีด', 'Find the super-thin tip of the building, pointed like an iron',
    // a pale stone skyscraper seen from its sharp corner where two avenues meet, rows of windows on both slanting sides, a rounded thin tip, a little cornice crown, cars on the two diverging streets, a face on the tip
    sky('#FFE0B2') + P('M-4 206l124-14 124 14v38H-4z', '#90A4AE', 0) + Lc('M120 196l-90 48M120 196l90 48', '#FFFFFF', 3)
      + P('M120 196L44 176V40l76 10z', '#F5E6CF', 3.5) + P('M120 196l76-20V40l-76 10z', '#E8D2B0', 3.5) + P('M38 40l82 8 82-8-6-12-76 8-76-8z', '#D7B98E', 3)
      + Array.from({ length: 7 }, (_, r) => [0, 1, 2].map((k) => P(`M${56 + k * 20} ${64 + r * 16 + k * 2}h10v9h-10z`, '#5C6BC0', 1.5) + P(`M${176 - k * 20} ${64 + r * 16 + k * 2}h-10v9h10z`, '#3F51B5', 1.5)).join('')).join('')
      + R(115, 48, 10, 148, '#FFF3E0', 4, 3) + face(120, 120, 0.3)
      + g(52, 222, 1, R(-14, -6, 28, 12, '#FDD835', 3, 2) + C(-8, 6, 3, INK, 0) + C(8, 6, 3, INK, 0)) + g(196, 224, 1, R(-14, -6, 28, 12, '#E53935', 3, 2) + C(-8, 6, 3, INK, 0) + C(8, 6, 3, INK, 0))),
  L('us/newyork/landmark-guggenheim.v1.svg', 'พิพิธภัณฑ์กุกเกนไฮม์ทรงเกลียววน', 'The spiral Guggenheim Museum', ['guggenheim museum', 'พิพิธภัณฑ์กุกเกนไฮม์', 'spiral museum', 'พิพิธภัณฑ์ทรงเกลียว', 'upper east side', 'อัปเปอร์อีสต์ไซด์', 'museum mile', 'มิวเซียมไมล์', 'fifth avenue', 'spiral ramp'], 'หาตึกสีขาวที่เป็นวงซ้อนกันกว้างขึ้นเรื่อยๆ ข้างบน', 'Find the white building of rings that get wider as they go up',
    // a round white building made of stacked bands that grow wider towards the top like an upside-down wedding cake, thin dark window strips between the bands, a glass dome peeking on top, a lower block beside it, trees and a child on the pavement
    sky('#C5E1F5') + R(170, 70, 70, 140, '#ECEFF1', 0, 3) + [0, 1, 2, 3].map((r) => Lc(`M176 ${90 + r * 28}h58`, '#90A4AE', 3)).join('') + E(24, 160, 26, 30, '#66BB6A', 3) + Lc('M24 190v24', '#6D4C41', 4)
      + [0, 1, 2, 3].map((k) => { const w = 92 + k * 16, y = 190 - k * 30; return P(`M${120 - w / 2} ${y - 22}h${w}c4 0 6 6 4 12l-6 10H${120 - w / 2 + 2}l-6-10c-2-6 0-12 4-12z`, '#FFFFFF', 3.5) + Lc(`M${120 - w / 2 + 4} ${y + 2}h${w - 8}`, '#455A64', 3); }).join('')
      + P('M90 98c0-22 60-22 60 0z', '#B3E5FC', 3) + Lc('M110 82v16M130 82v16', '#90A4AE', 1.5) + R(66, 190, 108, 22, '#ECEFF1', 2, 3) + R(108, 196, 24, 16, '#5D4037', 2, 2)
      + face(120, 138, 0.42) + P('M-4 212h248v32H-4z', '#B0BEC5', 3) + kid(56, 232, '#E53935', 0.85)),
  L('us/newyork/landmark-bagel.v1.svg', 'เบเกิลนิวยอร์กทาครีมชีส', 'A New York bagel with cream cheese', ['bagel', 'เบเกิล', 'cream cheese', 'ครีมชีส', 'everything bagel', 'เบเกิลโรยงา', 'deli breakfast', 'อาหารเช้าร้านเดลี่', 'bagel shop', 'sesame seeds'], 'หาเบเกิลครึ่งล่างที่ทาครีมชีสหนาๆ', 'Find the bottom half of the bagel spread with thick cream cheese',
    // a shiny brown bagel sliced in half: the top half tilted open with sesame seeds and a smiling face, the bottom half spread thick with white cream cheese, a paper deli bag behind and a cup of orange juice
    P('M150 36h66l8 150h-82z', '#E8D2B0', 3.5) + P('M150 36l10 14h48l8-14', '#D7B98E', 3) + R(28, 118, 32, 52, '#FFB74D', 4, 3) + R(28, 118, 32, 12, '#FFFFFF', 3, 3) + Lc('M48 130l8-30', '#E53935', 4)
      + g(118, 172, 1, E(0, 0, 76, 34, '#C7843C', 3.5) + E(0, -8, 70, 28, '#FFFDF5', 3) + P('M-58-10c10 6 20-4 30 2s20-6 30 0 20-6 30 0 18-4 26 2', 'none', 2) + E(0, -10, 16, 7, '#C7843C', 3))
      + g(118, 104, 1, P('M-72 14c0-38 34-56 72-56s72 18 72 56c-10 10-30 14-72 14s-62-4-72-14z', '#C7843C', 3.5) + E(-2, -24, 50, 14, '#E2A35C', 0) + E(0, 6, 14, 6, '#8D5524', 2)
        + Array.from({ length: 16 }, (_, k) => E(-56 + (k * 37) % 112, -30 + (k * 13) % 34, 3.2, 1.8, k % 3 ? '#FFF8E1' : '#3E2723', 0)).join('') + face(0, -6, 0.42, 'o'))),
  L('us/newyork/landmark-hydrant.v1.svg', 'หัวดับเพลิงฉีดน้ำเล่นหน้าบ้านหินสีน้ำตาล', 'Splashing at an open fire hydrant by the brownstones', ['fire hydrant', 'หัวดับเพลิง', 'brownstone', 'บ้านหินสีน้ำตาล', 'stoop', 'บันไดหน้าบ้าน', 'summer splash', 'เล่นน้ำหน้าร้อน', 'brooklyn street', 'sprinkler cap'], 'หาสายน้ำที่พุ่งเป็นโค้งออกมาจากหัวดับเพลิงสีแดง', 'Find the arch of water shooting out of the red fire hydrant',
    // a row of brown townhouses with tall front steps (stoops) and black railings, a red fire hydrant on the pavement spraying a big curved fan of water, two children splashing in it, a sunny sky
    sky('#FFF3C4') + C(206, 30, 16, '#FFD54F', 0) + R(-4, 30, 248, 160, '#8D5A3B', 0, 3) + Lc('M80 30v160M164 30v160', '#6D3E25', 3)
      + [20, 104, 188].map((x) => [0, 1].map((r) => R(x - 12, 46 + r * 44, 18, 28, '#FFF3C4', 2, 2.5) + R(x + 12, 46 + r * 44, 18, 28, '#FFF3C4', 2, 2.5)).join('')).join('')
      + [0, 1, 2, 3].map((k) => R(118 - k * 8, 148 + k * 12, 50 + k * 16, 12, '#A1673F', 0, 2.5)).join('') + R(150, 116, 26, 34, '#4E342E', 3, 2.5) + Lc('M118 148l-24 48M168 148l24 48', INK, 3)
      + P('M-4 196h248v48H-4z', '#B0BEC5', 3) + Lc('M-4 206h248', '#90A4AE', 2)
      + g(52, 206, 1, R(-9, -26, 18, 28, '#E53935', 4, 3) + P('M-12-26h24l-4-8h-16z', '#E53935', 2.5) + R(-16, -18, 8, 8, '#E53935', 2, 2) + R(8, -18, 8, 8, '#C62828', 2, 2) + face(0, -10, 0.2, 'none'))
      + [0, 1, 2, 3, 4].map((k) => Lc(`M64 186Q${110 + k * 10} ${90 + k * 8} ${140 + k * 16} ${200 + k * 6}`, '#4FC3F7', 4)).join('') + [[140, 140], [170, 150], [196, 162]].map(([x, y]) => C(x, y, 3.5, '#B3E5FC', 1.5)).join('')
      + kid(150, 230, '#43A047', 0.9) + kid(196, 232, '#FFB300', 0.8)),
  L('us/newyork/landmark-blackwhitecookie.v1.svg', 'คุกกี้ขาวดำนิวยอร์ก', 'A New York black-and-white cookie', ['black and white cookie', 'คุกกี้ขาวดำ', 'half moon cookie', 'คุกกี้ฮาล์ฟมูน', 'deli cookie', 'คุกกี้ร้านเดลี่', 'vanilla and chocolate icing', 'ไอซิ่งวานิลลาและช็อกโกแลต', 'bakery', 'big soft cookie'], 'หาคุกกี้ที่ครึ่งหนึ่งสีขาว อีกครึ่งสีช็อกโกแลต', 'Find the cookie that is half white and half chocolate',
    // a big round soft cookie seen from above, its top iced exactly half in white vanilla and half in dark chocolate, a soft cake edge peeking out, a smiling face across the middle, crumbs and a glass of milk beside it
    R(176, 132, 40, 74, '#FFFFFF', 6, 3.5) + R(180, 150, 32, 52, '#E3F2FD', 4, 0) + Lc('M184 126l10-24', '#90CAF9', 5)
      + C(104, 126, 82, '#F3C27A', 3.5) + P('M104 50a76 76 0 0 0 0 152z', '#FFFDF5', 3) + P('M104 50a76 76 0 0 1 0 152z', '#4E342E', 3) + P('M118 70c20 6 36 22 40 40', 'none', 0) + Lc('M126 70c16 8 28 20 34 36', '#7B5E57', 3)
      + face(104, 120, 0.7, 'none') + P('M96 134q8 8 16 0', 'none', 3) + [[30, 214], [44, 222], [168, 220], [60, 210]].map(([x, y]) => C(x, y, 3.5, '#F3C27A', 2)).join('')),
  // ---------- California
  L('us/california/landmark-griffith.v1.svg', 'หอดูดาวกริฟฟิทบนเนินเขา', 'Griffith Observatory on the hill', ['griffith observatory', 'หอดูดาวกริฟฟิท', 'griffith park', 'สวนกริฟฟิท', 'telescope dome', 'โดมกล้องดูดาว', 'planetarium', 'ท้องฟ้าจำลอง', 'mount hollywood', 'city lights view'], 'หาโดมสีเขียวสามลูกบนตึกสีขาว', 'Find the three green domes on the white building',
    // a white art-deco building on a brown hilltop at dusk with a big copper-green dome in the middle and two smaller green domes at the ends, a long terrace, the twinkling city grid far below, stars and a crescent moon
    sky('#5C6BC0') + [[30, 30], [70, 18], [190, 26], [214, 60], [40, 70], [150, 14]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('') + P('M200 32a14 14 0 1 0 10 20 11 11 0 1 1-10-20z', '#FFF59D', 2)
      + P('M-4 200h248v44H-4z', '#3949AB', 0) + Array.from({ length: 24 }, (_, k) => C(8 + (k * 41) % 228, 206 + (k * 7) % 30, 2, k % 2 ? '#FFD54F' : '#FFF8E1', 0)).join('')
      + P('M-4 200c40-60 80-70 124-70s90 20 128 66z', '#A1887F', 3.5) + Lc('M30 186c20-10 40-12 60-10M150 170c20 0 40 8 60 20', '#8D6E63', 3)
      + R(48, 120, 144, 30, '#FFFDF5', 2, 3.5) + R(40, 146, 160, 10, '#ECEFF1', 2, 3) + [70, 90, 150, 170].map((x) => R(x - 4, 126, 8, 18, '#5C6BC0', 1, 1.5)).join('')
      + R(94, 98, 52, 26, '#FFFDF5', 0, 3) + P('M92 100a28 28 0 0 1 56 0z', '#4DB6AC', 3.5) + Lc('M120 72v-6', INK, 3) + P('M44 122a14 14 0 0 1 28 0z', '#4DB6AC', 3) + P('M168 122a14 14 0 0 1 28 0z', '#4DB6AC', 3)
      + face(120, 132, 0.3)),
  L('us/california/landmark-joshuatree.v1.svg', 'ต้นโจชัวในทะเลทรายโมฮาวี', 'A Joshua tree in the Mojave Desert', ['joshua tree', 'ต้นโจชัว', 'joshua tree national park', 'อุทยานโจชัวทรี', 'mojave desert', 'ทะเลทรายโมฮาวี', 'boulder piles', 'กองหินกลมยักษ์', 'desert sunset', 'yucca tree'], 'หาต้นไม้ที่มีพุ่มใบแหลมเหมือนพู่กันอยู่ปลายกิ่ง', 'Find the tree with spiky pompoms of leaves at the ends of its arms',
    // a shaggy Joshua tree with a fuzzy trunk and crooked arms each ending in a spiky green pompom, giant rounded granite boulders piled up behind, a peach-and-lilac sunset, a small lizard on a rock
    sky('#FFCCBC') + P('M-4-4h248v70c-80 20-170 20-248 0z', '#CE93D8', 0) + C(188, 94, 22, '#FFB74D', 0)
      + [[16, 150, 30], [52, 132, 26], [34, 112, 20], [206, 156, 32], [176, 140, 22], [230, 126, 20]].map(([x, y, r]) => E(x, y, r, r * 0.8, '#E0B48A', 3)).join('')
      + P('M-4 170c60-8 180-8 248 0v74H-4z', '#F2D1A0', 3) + Lc('M30 196l4-6M60 214l4-6M180 206l4-6', '#A1887F', 2)
      + band('M116 222c-4-40 2-70 0-100', '#8D6E63', 14) + band('M116 160c-20-10-30-30-34-56', '#8D6E63', 10) + band('M118 140c18-8 34-26 38-52', '#8D6E63', 10) + band('M116 124c-2-20 4-34 10-46', '#8D6E63', 9)
      + [[82, 100], [156, 84], [126, 74]].map(([x, y]) => Array.from({ length: 9 }, (_, k) => { const a = k * 40 * Math.PI / 180; return Lc(`M${x} ${y}l${(Math.cos(a) * 20).toFixed(1)} ${(Math.sin(a) * 18 - 4).toFixed(1)}`, '#558B2F', 5); }).join('') + C(x, y, 8, '#7CB342', 2.5)).join('')
      + face(116, 186, 0.35) + g(200, 132, 1, E(0, 0, 12, 4, '#8D6E63', 2) + Lc('M10 0c6 0 10 4 14 2', '#8D6E63', 3) + C(-8, -2, 1.5, INK, 0))),
  L('us/california/landmark-labrea.v1.svg', 'แมมมอธในบ่อน้ำมันดินลาเบรีย', 'The mammoths at the La Brea Tar Pits', ['la brea tar pits', 'บ่อน้ำมันดินลาเบรีย', 'mammoth', 'แมมมอธ', 'ice age fossils', 'ฟอสซิลยุคน้ำแข็ง', 'tar bubbles', 'ฟองน้ำมันดิน', 'hancock park', 'museum'], 'หาฟองดำๆ ที่ผุดขึ้นมาในบ่อ', 'Find the black bubbles popping up in the pond',
    // a dark shiny pond of sticky tar with round bubbles rising, a big woolly mammoth with curling tusks standing knee-deep in it, a baby mammoth waiting on the grassy bank, palm trees and city towers behind
    sky('#B3E5FC') + R(150, 60, 30, 90, '#CFD8DC', 0, 3) + R(184, 80, 26, 70, '#B0BEC5', 0, 3) + palm(30, 150, 70) + palm(226, 150, 60)
      + P('M-4 140h248v104H-4z', '#8BC34A', 3) + E(110, 190, 108, 40, '#263238', 3.5) + [[40, 196, 6], [176, 206, 5], [70, 218, 4], [150, 184, 4]].map(([x, y, r]) => C(x, y, r, '#455A64', 2)).join('') + Lc('M30 180c30-6 50-4 70 0', '#546E7A', 2.5)
      + g(110, 168, 1, E(0, 0, 50, 34, '#8D6E63', 3.5) + Lc('M-30 24v16M-12 28v12M12 28v12M32 24v16', '#6D4C41', 12) + C(44, -20, 26, '#8D6E63', 3.5) + band('M58-4c8 20 2 40-10 46', '#8D6E63', 10)
        + P('M50 2c20 6 34-4 34-18', 'none', 4) + P('M50 2c20 6 34-4 34-18', '#FFF8E1', 0) + Lc('M50 2c20 6 34-4 34-18', '#FFF8E1', 5) + Lc('M34 4c14 10 30 6 34-6', '#FFF8E1', 5) + face(40, -26, 0.38, 'none') + Lc('M-20-30c8-8 18-8 26 0M10-34c6-6 14-6 20 0', '#6D4C41', 3))
      + g(206, 168, 0.55, E(0, 0, 40, 28, '#A1887F', 3.5) + Lc('M-24 20v18M-8 22v16M8 22v16M24 20v18', '#8D6E63', 10) + C(34, -14, 22, '#A1887F', 3.5) + band('M46 0c6 16 0 30-8 34', '#A1887F', 8) + face(30, -18, 0.5))),
  L('us/california/landmark-monolake.v1.svg', 'หอคอยหินทูฟาในทะเลสาบโมโน', 'The tufa towers of Mono Lake', ['mono lake', 'ทะเลสาบโมโน', 'tufa towers', 'หอคอยหินทูฟา', 'salt lake', 'ทะเลสาบน้ำเค็ม', 'eastern sierra', 'เซียร์ราตะวันออก', 'lee vining', 'california gulls'], 'หาแท่งหินปุ่มๆ ที่โผล่ขึ้นมาจากน้ำ', 'Find the knobbly stone towers poking up out of the water',
    // a calm blue lake with knobbly cream-coloured lumpy rock towers rising out of the water and standing on the shore, their reflections below, a snowy mountain range behind, white gulls flying, a child on the sandy shore
    sky('#E1F5FE') + P('M-4 110l40-40 30 26 36-46 40 44 30-30 40 34 32-20v40H-4z', '#B0BEC5', 3) + P('M100 50l12-14 14 16-12 4zM168 74l10-10 12 12z', '#FFFFFF', 0)
      + P('M-4 120h248v80H-4z', '#4FC3F7', 3) + Lc('M14 150h40M150 170h50M90 136h30', '#B3E5FC', 3)
      + [[60, 150, 54, 26], [112, 140, 72, 30], [168, 156, 46, 24], [200, 146, 34, 18]].map(([x, base, h, w]) => P(`M${x - w / 2} ${base}c2-${h * 0.3}-4-${h * 0.5} 2-${h * 0.7}s${w * 0.2}-${h * 0.3} ${w * 0.4}-${h * 0.3} 6 ${h * 0.2} ${w * 0.3} ${h * 0.4}-2 ${h * 0.4} ${w * 0.3} ${h * 0.6}z`, '#F3E5C8', 3.5)
        + C(x - w * 0.15, base - h * 0.5, w * 0.16, '#E6D3AE', 2) + C(x + w * 0.18, base - h * 0.25, w * 0.14, '#E6D3AE', 2) + C(x - w * 0.2, base - h * 0.15, w * 0.12, '#E6D3AE', 2) + C(x + w * 0.05, base - h * 0.75, w * 0.12, '#E6D3AE', 2) + E(x, base + 8, w * 0.5, 4, '#81D4FA', 0)).join('')
      + face(112, 116, 0.3) + P('M-4 196c60-8 180-8 248 0v48H-4z', '#E8D5A8', 3) + kid(40, 230, '#E53935', 0.85)
      + [[60, 40], [170, 30]].map(([x, y]) => Lc(`M${x - 10} ${y}q5-6 10 0q5-6 10 0`, INK, 3)).join('')),
  L('us/california/landmark-fortunecookie.v1.svg', 'คุกกี้เสี่ยงทายจากไชนาทาวน์', 'Fortune cookies from Chinatown', ['fortune cookie', 'คุกกี้เสี่ยงทาย', 'chinatown', 'ไชนาทาวน์', 'fortune cookie factory', 'โรงทำคุกกี้เสี่ยงทาย', 'ross alley', 'รอสส์แอลลีย์', 'paper fortune', 'golden cookie'], 'หากระดาษแผ่นเล็กที่โผล่ออกมาจากคุกกี้', 'Find the little paper slip poking out of the cookie',
    // two golden folded fortune cookies, the big one with a smiling face and a blank white paper slip sticking out, the small one broken open with its slip lying beside it, on a red plate with a gold rim
    E(120, 178, 100, 34, '#E53935', 3.5) + E(120, 172, 86, 26, '#EF5350', 0) + Lc('M30 180c40 24 140 24 180 0', '#FFD54F', 3)
      + g(100, 140, 1, P('M-64 20c-6-40 24-70 64-70s70 30 64 70c-18-8-30-10-34-30-10 18-20 26-30 30-10-4-20-12-30-30-4 20-16 22-34 30z', '#F6C77E', 3.5) + P('M-30-10c-4 20-16 22-34 30', 'none', 0) + Lc('M0 20c-6-16-6-40 0-60', '#D7A15A', 3)
        + P('M48 -8l40-20 6 12-40 20z', '#FFFFFF', 3) + Lc('M58-10l26-12M60-4l20-10', '#B0BEC5', 2) + face(-24, -10, 0.4))
      + g(182, 160, 0.6, P('M-50 10c-4-30 20-50 44-48l-4 40c-14 0-28 4-40 8z', '#F6C77E', 3.5) + P('M50 10c4-30-20-50-44-48l4 40c14 0 28 4 40 8z', '#F6C77E', 3.5)) + P('M150 196l60-6 2 10-60 6z', '#FFFFFF', 2.5)),
  // ---------- Orlando
  L('us/orlando/landmark-keylimepie.v1.svg', 'พายคีย์ไลม์ของฟลอริดา', 'A slice of Florida key lime pie', ['key lime pie', 'พายคีย์ไลม์', 'florida dessert', 'ของหวานฟลอริดา', 'lime custard', 'คัสตาร์ดมะนาว', 'graham cracker crust', 'ฐานแครกเกอร์', 'whipped cream', 'lime slice'], 'หาแว่นมะนาวสีเขียวที่วางบนวิปครีม', 'Find the green lime slice sitting on the whipped cream',
    // a tall wedge of pale yellow-green lime pie on a plate, a golden crumbly crust underneath, a swirl of whipped cream on top with a green lime slice, a smiling face on the filling, two whole little limes beside
    E(120, 196, 100, 24, '#E1F5FE', 3.5) + g(118, 150, 1, P('M-80 40l80-100 84 100z', '#F0F4C3', 3.5) + P('M-80 40h164v16H-80z', '#D7A15A', 3.5) + P('M84 40l-84-100v16l84 100z', '#E6EE9C', 3) + Lc('M-70 48h150', '#A1673F', 2)
      + P('M-14-62c-10-12 4-26 14-18 10-10 26 0 16 14 10 6 4 20-10 18-12 4-28-2-20-14z', '#FFFFFF', 3) + E(4, -82, 16, 7, '#8BC34A', 3) + E(4, -82, 11, 4, '#DCEDC8', 0) + Lc('M-6-82h20M4-88v12', '#8BC34A', 1.5)
      + face(4, 6, 0.48)) + [[40, 210], [196, 208]].map(([x, y]) => E(x, y, 16, 12, '#7CB342', 3) + Lc(`M${x - 6} ${y - 4}l6 2`, '#C5E1A5', 2.5)).join('')),
  L('us/orlando/landmark-cubano.v1.svg', 'แซนด์วิชคิวบาโนของฟลอริดา', 'A Florida Cuban sandwich', ['cuban sandwich', 'แซนด์วิชคิวบาโน', 'cubano', 'คิวบาโน', 'pressed sandwich', 'แซนด์วิชกดร้อน', 'ham and roast pork', 'แฮมและหมูอบ', 'pickles and mustard', 'cuban bakery'], 'หาแตงกวาดองสีเขียวที่ซ่อนอยู่ในแซนด์วิช', 'Find the green pickles hidden in the sandwich',
    // a long flat pressed sandwich cut on the slant, the front half showing its layers: crisp golden bread with grill stripes, pink ham, brown roast pork, melted yellow cheese dripping, green pickle slices and a line of mustard, a smiling face on the bread
    E(120, 200, 104, 20, '#E1F5FE', 3.5)
      + [[150, 112, 0.8], [96, 150, 1]].map(([x, y, s], i) => g(x, y, s, P('M-80-30c0-14 10-20 30-20h100c20 0 30 6 30 20v8H-80z', '#E8B05A', 3.5) + Lc('M-60-38l16 10M-30-40l16 10M0-40l16 10M30-40l16 10', '#B8762E', 3)
        + R(-80, -22, 160, 10, '#F48FB1', 0, 2.5) + R(-80, -12, 160, 10, '#A1673F', 0, 2.5) + R(-80, -2, 160, 8, '#FFD54F', 0, 2.5) + P('M-40 6c2 10 8 10 8 0M20 6c2 12 8 12 8 0', '#FFD54F', 2)
        + [-50, -10, 30].map((x) => E(x, -17, 9, 4, '#7CB342', 2)).join('') + Lc('M-76-24h152', '#FBC02D', 2.5)
        + P('M-80 6h160v14c0 10-10 14-30 14H-50c-20 0-30-4-30-14z', '#E8B05A', 3.5) + Lc('M-60 26l16-10M-20 26l16-10M20 26l16-10', '#B8762E', 3) + (i ? face(0, 24, 0.3) : ''))).join('')),
  L('us/orlando/landmark-indoorskydive.v1.svg', 'บินลอยตัวในอุโมงค์ลม', 'Floating in an indoor skydiving tunnel', ['indoor skydiving', 'สกายไดฟ์ในร่ม', 'wind tunnel', 'อุโมงค์ลม', 'body flight', 'บินลอยตัว', 'international drive', 'อินเตอร์เนชันแนลไดรฟ์', 'goggles and flight suit', 'kids flying'], 'หาเด็กที่ลอยตัวกางแขนอยู่กลางอุโมงค์กระจก', 'Find the child floating with arms spread in the middle of the glass tube',
    // a tall round glass tube with a mesh floor, wavy white arrows of wind blowing up from below, a child in a blue flight suit and big goggles floating belly-down with arms and legs spread, a coach in red holding on beside the door
    sky('#E8EAF6') + R(48, 0, 144, 244, '#B3E5FC', 0, 3.5) + Lc('M60 0v244M180 0v244', '#E1F5FE', 6) + P('M48 200h144v44H48z', '#90A4AE', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${60 + k * 24} 200v40`, '#607D8B', 2)).join('')
      + [64, 96, 144, 176].map((x) => Lc(`M${x} 190c-6-20 6-40 0-60s6-40 0-60`, '#FFFFFF', 3) + P(`M${x - 6} 74l6-10 6 10`, 'none', 3)).join('')
      + g(120, 110, 1, E(0, 0, 40, 16, '#1E88E5', 3.5) + Lc('M-34-4l-26-20M34-4l26-20M-30 8l-24 22M30 8l24 22', '#1E88E5', 9) + C(-62, -26, 6, '#FFE0BD', 2) + C(62, -26, 6, '#FFE0BD', 2)
        + C(0, -24, 16, '#FFE0BD', 3) + R(-14, -32, 28, 10, '#FFEB3B', 4, 2.5) + C(-6, -27, 3, '#4FC3F7', 0) + C(6, -27, 3, '#4FC3F7', 0) + P('M-8-16q8 6 16 0', 'none', 2.5) + P('M-16-38c4-10 28-10 32 0z', '#E53935', 2.5))
      + g(214, 196, 1, R(-14, -40, 26, 46, '#E53935', 8, 3) + C(0, -52, 11, '#FFE0BD', 3) + face(0, -52, 0.25))),
  L('us/orlando/landmark-boktower.v1.svg', 'หอระฆังบ็อกในสวนบนเนินเขา', 'Bok Tower, the singing tower in the gardens', ['bok tower gardens', 'สวนบ็อกทาวเวอร์', 'singing tower', 'หอคอยร้องเพลง', 'carillon bells', 'ระฆังคาริลลอน', 'lake wales', 'เลกเวลส์', 'reflecting pool', 'iron mountain'], 'หาประตูสีทองที่โคนหอคอย', 'Find the golden door at the foot of the tower',
    // a tall pink-and-grey marble tower with tall arched bell openings filled with blue lace patterns near the top, a golden door at the bottom, a long reflecting pool in front with the tower's pink reflection, palms and azalea bushes in flower
    sky('#E1F5FE') + palm(26, 170, 70) + palm(218, 170, 64)
      + P('M86 170V48l10-14h48l10 14v122z', '#F8BBD0', 3.5) + Lc('M86 70h68M86 140h68', '#B0BEC5', 4) + [96, 120, 144].map((x) => Lc(`M${x} 70v70`, '#E1BEE7', 2)).join('')
      + [104, 136].map((x) => P(`M${x - 9} 66V44a9 9 0 0 1 18 0v22z`, '#5C6BC0', 2.5) + Lc(`M${x - 6} 50h12M${x - 6} 58h12M${x} 38v28`, '#BBDEFB', 1.5)).join('') + P('M90 34l30-14 30 14z', '#B0BEC5', 3)
      + P('M110 170v-18a10 10 0 0 1 20 0v18z', '#FFD54F', 3) + face(120, 110, 0.36)
      + P('M-4 170h248v74H-4z', '#81C784', 3) + R(76, 180, 88, 54, '#4FC3F7', 6, 3) + P('M100 184h40v40h-40z', '#F8BBD0', 0) + Lc('M100 184h40', '#F48FB1', 2)
      + [[36, 196], [204, 196], [44, 226], [196, 226]].map(([x, y]) => C(x, y, 14, '#66BB6A', 3) + C(x - 4, y - 4, 3.5, '#EC407A', 0) + C(x + 5, y + 2, 3.5, '#EC407A', 0)).join('')),
  L('us/orlando/landmark-panther.v1.svg', 'เสือฟลอริดาแพนเทอร์ในป่าปาล์ม', 'A Florida panther in the palmettos', ['florida panther', 'เสือฟลอริดาแพนเทอร์', 'big cat', 'แมวป่าตัวใหญ่', 'saw palmetto', 'ปาล์มพุ่ม', 'wildlife rescue', 'สัตว์ป่าหายาก', 'everglades', 'cougar'], 'หาหางยาวปลายดำของเสือที่ห้อยลงมาจากท่อนไม้', 'Find the panther\'s long black-tipped tail hanging off the log',
    // a sleek tawny Florida panther with a pale muzzle, round ears and a long black-tipped tail lying relaxed on a mossy fallen log, fan-shaped palmetto leaves all around, Spanish moss hanging from an oak branch above
    sky('#E8F5E9') + Lc('M-4 30c60-10 120 10 248-6', '#6D4C41', 10) + [30, 80, 150, 200].map((x) => Lc(`M${x} 30c-4 20 4 30 0 44`, '#B0BEC5', 3)).join('')
      + [[20, 220], [214, 214], [60, 236], [180, 236]].map(([x, y]) => [-50, -25, 0, 25, 50].map((a) => Lc(`M${x} ${y}l${(Math.sin(a * Math.PI / 180) * 34).toFixed(1)} ${(-Math.cos(a * Math.PI / 180) * 40).toFixed(1)}`, '#558B2F', 6)).join('')).join('')
      + P('M10 170c60-12 160-12 220 0v18c-60 10-160 10-220 0z', '#8D6E63', 3.5) + Lc('M40 176c20-4 40-4 60 0M140 176c20-2 40 0 60 2', '#6D4C41', 2.5) + E(60, 170, 20, 4, '#9CCC65', 0)
      + g(120, 150, 1, E(0, 0, 60, 20, '#D7A15A', 3.5) + E(0, 10, 44, 8, '#F3D3A0', 0) + Lc('M54 4c20 10 26 30 22 50', '#D7A15A', 9) + Lc('M75 46c2 6 2 10 0 12', INK, 9)
        + Lc('M-40 16l-22 8M-16 18l-20 8', '#D7A15A', 10) + C(-62, -12, 22, '#D7A15A', 3.5) + P('M-80-28l-2-14 12 6zM-46-30l4-14-12 6z', '#D7A15A', 2.5) + E(-64, -2, 12, 8, '#F3D3A0', 0) + face(-62, -14, 0.36, 'w'))),
  // ---------- Hawaii
  L('us/hawaii/landmark-rainboweucalyptus.v1.svg', 'ต้นยูคาลิปตัสสีรุ้งบนถนนสู่ฮานา', 'The rainbow eucalyptus trees on the Road to Hāna', ['rainbow eucalyptus', 'ยูคาลิปตัสสีรุ้ง', 'road to hana', 'ถนนสู่ฮานา', 'maui', 'เมาวี', 'colourful bark', 'เปลือกไม้หลากสี', 'keanae arboretum', 'rainforest drive'], 'หาลำต้นที่มีลายเขียว ส้ม ม่วง ฟ้า', 'Find the tree trunk striped green, orange, purple and blue',
    // three tall smooth tree trunks with long streaks of green, orange, purple, blue and red bark, a lush green canopy above, ferns at their feet and a winding road with a little red car
    sky('#C8E6C9') + E(40, 30, 70, 44, '#43A047', 3) + E(190, 26, 80, 46, '#2E7D32', 3) + E(120, 10, 60, 30, '#388E3C', 3)
      + [[46, 26], [120, 32], [192, 28]].map(([x, w], i) => P(`M${x - w / 2} 244c4-60 6-130 4-200h${w - 6}c-2 70 0 140 4 200z`, '#AED581', 3.5)
        + ['#FF8A65', '#7E57C2', '#42A5F5', '#E53935', '#26A69A'].map((c, k) => Lc(`M${x - w / 2 + 5 + k * (w / 5)} ${60 + ((k + i) % 3) * 20}c${k % 2 ? 4 : -3} 40 ${k % 2 ? -3 : 4} 80 ${k % 2 ? 2 : -2} 150`, c, 4.5)).join('')).join('')
      + face(120, 120, 0.36) + P('M-4 244c30-30 90-40 120-30s60 10 128-6v36z', '#90A4AE', 0) + g(180, 228, 0.8, R(-14, -6, 28, 12, '#E53935', 3, 2) + C(-8, 6, 3, INK, 0) + C(8, 6, 3, INK, 0))
      + [[16, 236], [86, 240]].map(([x, y]) => [-1, 0, 1].map((j) => Lc(`M${x} ${y}q${j * 10}-14 ${j * 18}-18`, '#2E7D32', 4)).join('')).join('')),
  L('us/hawaii/landmark-musubi.v1.svg', 'ข้าวปั้นมูซูบิฮาวาย', 'A Hawaiian musubi rice block', ['musubi', 'มูซูบิ', 'rice block', 'ข้าวปั้นสี่เหลี่ยม', 'luncheon meat', 'หมูแฮมกระป๋อง', 'seaweed wrap', 'สาหร่ายพัน', 'convenience store snack', 'local food'], 'หาแถบสาหร่ายสีดำที่พันรอบข้าวปั้น', 'Find the black seaweed band wrapped round the rice block',
    // a chunky white rectangular block of rice with a thick slice of pink glazed meat on top, a wide band of dark green seaweed wrapped round its middle, a smiling face on the rice, a second musubi in its clear wrapper behind
    g(180, 112, 0.6, R(-50, -20, 100, 52, '#FFFFFF', 8, 3.5) + R(-50, -34, 100, 18, '#F48FB1', 6, 3) + R(-16, -34, 32, 66, '#263238', 2, 3) + P('M-60-44h120v84H-60z', 'none', 0) + Lc('M-60-44h120v84H-60z', '#90CAF9', 3))
      + g(108, 148, 1, R(-70, -26, 140, 70, '#FFFFFF', 10, 3.5) + Array.from({ length: 10 }, (_, k) => E(-58 + (k * 29) % 116, -12 + (k * 13) % 50, 5, 3, '#ECEFF1', 0)).join('')
        + R(-70, -48, 140, 26, '#F48FB1', 8, 3.5) + Lc('M-60-40h40M0-44h50', '#F8BBD0', 3) + Lc('M-56-24c30-6 80-6 112 0', '#C2185B', 2.5)
        + R(-22, -48, 44, 92, '#263238', 2, 3.5) + Lc('M-14-40v80M0-40v80M14-40v80', '#37474F', 1.5) + face(-46, 12, 0.36) + face(46, 12, 0.36, 'none'))),
  L('us/hawaii/landmark-konacoffee.v1.svg', 'ไร่กาแฟโคนาบนเชิงภูเขาไฟ', 'A Kona coffee farm on the volcano slope', ['kona coffee', 'กาแฟโคนา', 'coffee farm', 'ไร่กาแฟ', 'coffee cherries', 'ผลกาแฟสุกสีแดง', 'big island', 'เกาะบิ๊กไอแลนด์', 'hualalai slope', 'coffee picking'], 'หาผลกาแฟสีแดงสดที่เกาะอยู่ตามกิ่ง', 'Find the bright red coffee cherries along the branches',
    // a sloping green farm of rounded coffee bushes in rows under a big dark volcano, one big branch in front heavy with clusters of shiny red and green coffee cherries and glossy leaves, a woven basket of red cherries with a face
    sky('#FFF8E1') + P('M-4 120c60-80 150-100 248-40v40H-4z', '#6D4C41', 3) + P('M100 54c20-6 40-6 60 4', '#FFFFFF', 3)
      + P('M-4 110c80-10 170-20 248-10v144H-4z', '#9CCC65', 3) + [[20, 130], [70, 124], [120, 120], [170, 118], [220, 116], [40, 158], [100, 152], [160, 150], [214, 148]].map(([x, y]) => E(x, y, 22, 14, '#558B2F', 2.5)).join('')
      + band('M-4 186c50-10 100-14 150-30', '#6D4C41', 6) + [[20, 182], [60, 174], [100, 166], [136, 158]].map(([x, y], k) => E(x + 6, y - 14, 14, 6, '#2E7D32', 2) + E(x - 2, y + 12, 13, 6, '#2E7D32', 2) + [0, 1, 2, 3].map((j) => C(x - 4 + j * 6, y + (j % 2 ? -4 : 4), 5, (j + k) % 4 === 3 ? '#8BC34A' : '#D32F2F', 2)).join('')).join('')
      + g(192, 210, 1, P('M-34-14h68l-8 34h-52z', '#C8A165', 3.5) + Lc('M-30-2h60M-28 10h56', '#A1673F', 2) + [-20, -8, 4, 16, -14, 10].map((x, k) => C(x, -16 - (k > 3 ? 8 : 0), 6, '#D32F2F', 2)).join('') + face(0, 4, 0.3))),
  L('us/hawaii/landmark-shrimptruck.v1.svg', 'รถขายกุ้งกระเทียมที่นอร์ธชอร์', 'A garlic shrimp truck on the North Shore', ['shrimp truck', 'รถขายกุ้ง', 'garlic shrimp', 'กุ้งกระเทียม', 'north shore', 'นอร์ธชอร์', 'kahuku', 'คาฮูคู', 'haleiwa', 'plate lunch'], 'หาจานกุ้งกระเทียมกับข้าวสองก้อน', 'Find the plate of garlic shrimp with two scoops of rice',
    // a white food truck covered in colourful doodles of waves, flowers and suns, a service window with a striped awning, a picnic table in front with a paper plate of orange garlic shrimp and two round scoops of rice, palm trees
    sky('#B3E5FC') + palm(214, 170, 90) + P('M-4 170h248v74H-4z', '#E8D5A8', 3)
      + R(14, 70, 176, 110, '#FFFFFF', 12, 3.5) + R(130, 56, 60, 20, '#FFFFFF', 6, 3) + P('M44 90c10-10 20 10 30 0s20 10 30 0', 'none', 0) + Lc('M24 160c10-10 20 10 30 0s20 10 30 0', '#29B6F6', 4)
      + [[30, 90], [160, 150]].map(([x, y]) => C(x, y, 8, '#FFD54F', 2) + Lc(`M${x - 14} ${y}h-6M${x + 14} ${y}h6M${x} ${y - 14}v-6`, '#FFB300', 3)).join('') + [[176, 92], [36, 128]].map(([x, y]) => [0, 72, 144, 216, 288].map((a) => C(x + Math.cos(a * Math.PI / 180) * 7, y + Math.sin(a * Math.PI / 180) * 7, 5, '#EC407A', 0)).join('') + C(x, y, 3, '#FFEB3B', 0)).join('')
      + R(64, 94, 84, 46, '#4E342E', 4, 3) + P('M58 94h96l-6-16H64z', '#E53935', 3) + [0, 1, 2].map((k) => P(`M${72 + k * 26} 78h13l1 16h-14z`, '#FFFFFF', 0)).join('') + face(106, 116, 0.3)
      + [52, 160].map((x) => C(x, 182, 12, INK, 0) + C(x, 182, 5, '#B0BEC5', 0)).join('') + R(40, 200, 130, 12, '#A1673F', 3, 3) + Lc('M60 212v26M150 212v26', '#A1673F', 5)
      + g(104, 194, 1, E(0, 0, 40, 10, '#FFFFFF', 3) + C(-18, -6, 10, '#FFFFFF', 2.5) + C(0, -8, 10, '#FFFFFF', 2.5) + [12, 22, 30].map((x) => P(`M${x - 6}-4c0-10 12-12 12-2-4-2-8 0-8 4z`, '#FF7043', 2)).join(''))),
  L('us/hawaii/landmark-chickens.v1.svg', 'ไก่ป่าเดินเล่นบนเกาะคาวาอี', 'The wild chickens of Kauaʻi', ['wild chickens', 'ไก่ป่า', 'kauai', 'เกาะคาวาอี', 'rooster', 'ไก่ตัวผู้', 'hen and chicks', 'แม่ไก่กับลูกเจี๊ยบ', 'beach park', 'free roaming chickens'], 'หาลูกเจี๊ยบสีเหลืองที่เดินตามแม่ไก่', 'Find the yellow chicks following the mother hen',
    // a proud colourful rooster with a red comb, golden neck feathers and a sweeping green-and-black tail standing on a beach, a brown hen walking beside it with three fluffy yellow chicks in a line, palm trees and a turquoise sea
    sky('#B3E5FC') + P('M-4 120h248v40H-4z', '#26C6DA', 0) + palm(30, 150, 80) + P('M-4 150c60-10 180-10 248 0v94H-4z', '#F3DFB0', 3)
      + g(86, 150, 1, E(0, 10, 32, 24, '#D84315', 3.5) + P('M24-6c20-40 50-30 54-6-14-10-30-6-34 6z', '#2E7D32', 3) + P('M28 4c26-20 46-6 44 12-10-10-26-8-36 0z', '#263238', 3) + P('M-20-6c-6-20 0-36 10-40 10 6 14 20 8 40z', '#FFB300', 3)
        + C(-12, -40, 13, '#FFB300', 3) + P('M-22-52c2-8 8-6 8 0 2-8 10-6 8 2 4-4 8 0 4 6z', '#E53935', 2.5) + P('M-26-40l-10 4 10 3z', '#FFEB3B', 2) + E(-24, -30, 3, 5, '#E53935', 1.5) + C(-14, -42, 2.5, INK, 0)
        + Lc('M-6 32v20M8 32v20', '#FFA000', 3.5))
      + g(160, 186, 1, E(0, 0, 26, 18, '#A1673F', 3.5) + C(-22, -14, 10, '#A1673F', 3) + P('M-30-20c2-6 6-4 6 0z', '#E53935', 2) + P('M-32-14l-8 3 8 3z', '#FFEB3B', 2) + C(-24, -16, 2, INK, 0) + Lc('M-4 16v12M8 16v12', '#FFA000', 3) + face(2, -2, 0.26, 'none'))
      + [196, 216, 234].map((x, k) => g(x, 214 + (k % 2) * 4, 1, E(0, 0, 9, 8, '#FFEB3B', 2.5) + P('M-10-2l-5 2 5 2z', '#FFA000', 1.5) + C(-4, -2, 1.5, INK, 0))).join('')),
  // ---------- Canada (country layer)
  K('ca', 'animal', 'loon', 'นกลูนบนทะเลสาบแคนาดา', 'A common loon on a Canadian lake', ['common loon', 'นกลูน', 'loon call', 'เสียงร้องนกลูน', 'northern lake', 'ทะเลสาบทางเหนือ', 'cottage country', 'บ้านพักริมทะเลสาบ', 'chick riding on its back', 'diving bird'],
    // a black-and-white checkered loon with a dark green head, a white striped necklace and a red eye floating on calm blue water, a fluffy grey chick riding on its back, ripples and two little pines on the far shore
    E(120, 182, 110, 26, '#4FC3F7', 3) + Lc('M30 186h50M150 196h60', '#B3E5FC', 3) + [30, 206].map((x) => P(`M${x} 110l16 34h-32z`, '#2E7D32', 2.5) + P(`M${x} 96l12 22h-24z`, '#2E7D32', 2.5)).join('')
      + g(120, 160, 1, P('M-70 10c0-24 30-36 70-36s80 6 80 26c0 18-40 26-80 26s-70-4-70-16z', '#263238', 3.5) + Array.from({ length: 12 }, (_, k) => R(-46 + (k % 6) * 14, -12 + Math.floor(k / 6) * 12, 6, 5, '#FFFFFF', 1, 0)).join('')
        + E(0, 22, 60, 6, '#ECEFF1', 0) + Lc('M60-10c10-20 12-40 6-56', '#263238', 18) + C(64, -66, 20, '#1B5E20', 3.5) + P('M82-64l28 4-28 6z', '#37474F', 2.5) + C(70, -70, 4, '#E53935', 1.5) + C(70, -70, 1.5, INK, 0)
        + Lc('M56-36l16 2M54-28l16 2', '#FFFFFF', 2.5) + E(52, -60, 6, 3.5, '#FF8FA3', 0)
        + g(-24, -30, 1, E(0, 0, 22, 16, '#90A4AE', 3) + C(16, -12, 11, '#90A4AE', 3) + P('M26-12l8 2-8 3z', '#455A64', 1.5) + face(16, -14, 0.24, 'none')))),
  K('ca', 'food', 'nanaimo', 'นาไนโมบาร์ขนมสามชั้น', 'A Nanaimo bar, three layers', ['nanaimo bar', 'นาไนโมบาร์', 'no-bake bar', 'ขนมไม่ต้องอบ', 'custard layer', 'ชั้นคัสตาร์ด', 'chocolate top', 'ท็อปช็อกโกแลต', 'british columbia', 'coconut crumb base'],
    // a square bar seen at a slant showing three thick layers: a dark crumbly chocolate-coconut base, a fat pale yellow custard middle with a smiling face, and a shiny chocolate top, a second bar behind it on a plate
    E(120, 196, 104, 22, '#E1F5FE', 3.5) + g(176, 124, 0.62, P('M-50-20l50-20 50 20v60l-50 20-50-20z', '#FFE082', 3.5) + P('M-50-20l50-20 50 20-50 20z', '#4E342E', 3))
      + g(102, 140, 1, P('M-60 20l60 22 60-22v24l-60 22-60-22z', '#5D4037', 3.5) + Array.from({ length: 8 }, (_, k) => C(-50 + k * 14, 36 + (k % 2) * 8, 2.5, '#D7CCC8', 0)).join('')
        + P('M-60-20l60 22 60-22v40l-60 22-60-22z', '#FFE082', 3.5) + P('M-60-20l60-22 60 22-60 22z', '#4E342E', 3.5) + P('M-40-20l40-14', '#795548', 0) + Lc('M-30-22l30-10M10-30l20 6', '#8D6E63', 3)
        + P('M-60-20v-6l60-22 60 22v6', 'none', 3) + face(-28, 12, 0.32) + face(30, 12, 0.32, 'none'))),
  K('ca', 'culture', 'curling', 'กีฬาเคิร์ลลิงบนลานน้ำแข็ง', 'Curling on the ice', ['curling', 'เคิร์ลลิง', 'curling stone', 'หินเคิร์ลลิง', 'curling broom', 'ไม้กวาดเคิร์ลลิง', 'the house', 'เป้าวงกลม', 'winter sport', 'bonspiel'],
    // a round grey granite curling stone with a red handle and a smiling face sliding on pale blue ice towards a target of red, white and blue rings, two brooms sweeping in front of it, little ice sparkles
    E(120, 170, 116, 50, '#E3F2FD', 3) + g(170, 150, 1, E(0, 0, 52, 22, '#1E88E5', 3) + E(0, 0, 38, 16, '#FFFFFF', 2.5) + E(0, 0, 24, 10, '#E53935', 2.5) + E(0, 0, 10, 4, '#FFFFFF', 2))
      + g(76, 168, 1, E(0, 12, 44, 14, '#78909C', 3.5) + P('M-44 10c0-24 20-32 44-32s44 8 44 32z', '#B0BEC5', 3.5) + Lc('M-42 2h84', '#FFEB3B', 4) + face(0, -6, 0.36)
        + P('M-14-22v-12h40v8', '#E53935', 7) + Lc('M-14-22v-12h40v8', INK, 2))
      + [[118, 120, -20], [148, 116, 18]].map(([x, y, r]) => g(x, y, 1, Lc('M0-70v60', '#A1673F', 5) + R(-16, -12, 32, 14, '#E53935', 4, 3) + Lc('M-12 4v6M-4 4v6M4 4v6M12 4v6', INK, 2), r)).join('')
      + [[40, 212], [210, 200], [120, 214]].map(([x, y]) => Lc(`M${x - 5} ${y}h10M${x} ${y - 5}v10`, '#FFFFFF', 2.5)).join('')),
  K('ca', 'food', 'tourtiere', 'ตูร์ติแยร์พายเนื้อของควิเบก', 'Tourtière, a Québec meat pie', ['tourtiere', 'tourtière', 'ตูร์ติแยร์', 'meat pie', 'พายเนื้อ', 'quebec christmas', 'คริสต์มาสควิเบก', 'flaky pastry', 'แป้งพายกรอบ', 'reveillon'],
    // a deep golden double-crust pie in a dish with a crimped edge, pastry leaves on top and a maple-leaf vent cut in the middle with a little steam, one slice taken out showing the brown spiced meat filling, a smiling face on the crust
    E(118, 156, 96, 46, '#B39DDB', 3.5) + E(118, 146, 86, 40, '#E8A657', 3.5) + Array.from({ length: 18 }, (_, k) => { const a = k * 20 * Math.PI / 180; return C(118 + Math.cos(a) * 82, 146 + Math.sin(a) * 37, 6, '#F6C77E', 2); }).join('')
      + P('M118 146l60-26c8 14 8 30 4 46z', '#6D4C41', 3) + [[150, 140], [166, 150], [160, 132]].map(([x, y]) => C(x, y, 4, '#8D6E63', 1.5)).join('')
      + P('M110 118l4 6 6-4-2 7 7 1-6 4 3 6-7-2-3 7-3-7-7 2 3-6-6-4 7-1-2-7 6 4z', '#C77B30', 2) + steam(108, 104)
      + [[70, 128, -30], [80, 168, 20]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 14, 6, '#F6C77E', 2.5) + Lc('M-10 0h20', '#C77B30', 1.5), r)).join('') + face(110, 156, 0.36)),
  // ---------- Vancouver
  L('ca/vancouver/landmark-driftwood.v1.svg', 'ป้อมไม้ลอยน้ำบนหาดอิงลิชเบย์', 'A driftwood fort on English Bay beach', ['english bay', 'อิงลิชเบย์', 'driftwood logs', 'ซุงลอยน้ำ', 'log fort', 'ป้อมไม้ซุง', 'kitsilano beach', 'หาดคิตซิลาโน', 'sunset beach', 'beach logs'], 'หาป้อมเล็กๆ ที่เด็กๆ สร้างจากท่อนไม้ซุง', 'Find the little fort the children built from logs',
    // a sandy beach lined with big silver-grey driftwood logs lying in rows, a little fort of short logs leaned against a big log with a dark doorway, a child playing beside it, the sea and blue mountains behind under a peach sunset
    sky('#FFE0B2') + C(170, 70, 22, '#FFB74D', 0) + P('M-4 100l40-30 30 20 40-34 40 30 34-20 64 34v20H-4z', '#7986CB', 3) + P('M-4 110h248v40H-4z', '#4FC3F7', 3) + Lc('M150 124h50M30 136h40', '#FFE0B2', 3)
      + P('M-4 146c60-6 180-6 248 0v98H-4z', '#F3DFB0', 3)
      + [[-10, 170, 110], [130, 166, 120], [-10, 206, 90], [160, 214, 90]].map(([x, y, w]) => R(x, y, w, 16, '#BCAAA4', 8, 3) + C(x + w - 6, y + 8, 5, '#D7CCC8', 2) + Lc(`M${x + 10} ${y + 6}h${w * 0.5}`, '#A1887F', 2)).join('')
      + g(120, 214, 1, R(-50, -16, 100, 14, '#BCAAA4', 7, 3) + [-36, -18, 0, 18, 36].map((x) => P(`M${x - 6} 22l${-10 + x * 0.1}-46h12l${10 - x * 0.1} 46z`, x % 36 ? '#A1887F' : '#BCAAA4', 3)).join('') + R(-14, 0, 28, 22, '#4E342E', 3, 2.5) + face(0, 12, 0.18, 'none'))
      + kid(70, 240, '#E53935', 0.8)),
  L('ca/vancouver/landmark-kitspool.v1.svg', 'สระน้ำทะเลคิตซิลาโนริมอ่าว', 'Kitsilano Pool, the long saltwater pool by the sea', ['kitsilano pool', 'สระคิตซิลาโน', 'saltwater pool', 'สระน้ำทะเล', 'outdoor pool', 'สระว่ายน้ำกลางแจ้ง', 'kits beach', 'หาดคิตส์', 'summer swim', 'longest pool'], 'หาเก้าอี้สูงของไลฟ์การ์ดข้างสระ', 'Find the lifeguard\'s tall chair beside the pool',
    // a very long bright turquoise outdoor pool with lane ropes running along the edge of the sea, swimmers' heads bobbing, a tall white lifeguard chair, the city towers and snowy mountains across the water
    sky('#E1F5FE') + P('M-4 80l40-30 40 24 50-40 50 34 40-20 28 20v20H-4z', '#90A4AE', 3) + P('M110 38l14-6 12 10z', '#FFFFFF', 0) + [20, 40, 60, 180, 200].map((x, k) => R(x, 70 - k % 3 * 10, 16, 30 + k % 3 * 10, '#CFD8DC', 0, 2)).join('')
      + P('M-4 100h248v40H-4z', '#1E88E5', 3) + P('M-4 140h248v104H-4z', '#ECEFF1', 3)
      + P('M10 150h220l-12 74H22z', '#26C6DA', 3.5) + [168, 186, 204].map((y) => Lc(`M${16 + (y - 150) * 0.15} ${y}h${206 - (y - 150) * 0.3}`, '#FFEB3B', 2.5)).join('')
      + [[50, 162, '#E53935'], [110, 178, '#FFB300'], [170, 196, '#7E57C2'], [80, 210, '#43A047']].map(([x, y, c]) => C(x, y, 7, c, 2.5) + Lc(`M${x - 14} ${y + 4}q6-6 10 0`, '#FFFFFF', 2)).join('')
      + g(212, 150, 1, Lc('M-10 0l6-50M10 0l-6-50M-8-20h16', '#FFFFFF', 5) + Lc('M-10 0l6-50M10 0l-6-50', INK, 1.5) + R(-12, -58, 24, 10, '#E53935', 2, 2.5) + C(0, -68, 7, '#FFE0BD', 2) + face(0, -68, 0.16, 'none'))
      + face(120, 196, 0.3)),
  L('ca/vancouver/landmark-polarbearswim.v1.svg', 'วิ่งลงทะเลเย็นเฉียบวันปีใหม่', 'The New Year\'s Day polar bear swim', ['polar bear swim', 'โพลาร์แบร์สวิม', 'new years day', 'วันปีใหม่', 'english bay', 'อิงลิชเบย์', 'icy sea dip', 'ลงทะเลน้ำเย็น', 'fancy dress', 'winter swim'], 'หาคนใส่หมวกไหมพรมสีแดงที่วิ่งลงน้ำ', 'Find the swimmer in the red woolly hat running into the water',
    // a crowd of happy people in swimsuits, woolly hats and silly costumes running into a cold grey-blue sea with big white splashes, snow on the mountains behind, a family wrapped in towels cheering on the beach
    sky('#ECEFF1') + P('M-4 90l50-40 40 30 50-40 50 34 54-20v36H-4z', '#B0BEC5', 3) + P('M30 66l16-14 14 12zM120 48l16-12 12 12z', '#FFFFFF', 0)
      + P('M-4 100h248v70H-4z', '#78909C', 3) + Lc('M20 120h40M160 130h50', '#CFD8DC', 3) + P('M-4 166c60-8 180-8 248 0v78H-4z', '#D7CCC8', 3)
      + [[60, 150, '#E53935', '#29B6F6'], [96, 144, '#FFB300', '#EC407A'], [134, 150, '#43A047', '#FFEB3B'], [172, 142, '#7E57C2', '#FF7043']].map(([x, y, hat, suit]) => g(x, y, 1, Lc('M-6 14l-6 16M6 14l8 14', '#FFE0BD', 5) + Lc('M-8-4l-12-14M8-4l12-14', '#FFE0BD', 5) + R(-10, -6, 20, 22, suit, 6, 2.5) + C(0, -16, 9, '#FFE0BD', 2.5) + P('M-9-18c0-14 18-14 18 0z', hat, 2) + C(0, -32, 3, '#FFFFFF', 1.5) + face(0, -14, 0.2, 'o'))).join('')
      + [[40, 168], [118, 170], [196, 166]].map(([x, y]) => Lc(`M${x - 14} ${y}l-8-16M${x} ${y - 4}v-20M${x + 14} ${y}l8-16`, '#FFFFFF', 4)).join('')
      + [[40, 218, '#FFCDD2'], [80, 222, '#BBDEFB']].map(([x, y, c]) => g(x, y, 1, P('M-14 16v-24c0-8 28-8 28 0v24z', c, 2.5) + C(0, -12, 8, '#FFE0BD', 2) + face(0, -12, 0.18))).join('')),
];

export default { places: {}, items };
