// Wave 12, Uzbekistan — the country layer: stamp, flag, hello, two guides, foods, crafts, music, an animal and a ride.
// Mosques and madrasas appear only in the city files, as buildings; no writing, no people but cute generic children.
import { P, R, C, E, Lc, g, face, free, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const G = (cc, key, th, en, hth, hen, kw, svg) => ({ id: `${cc}.guide.${key}`, cat: 'guide', file: `${cc}/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });
const I = (cat, slug, th, en, kw, svg) => ({ id: `uz.${cat}.${slug}`, cat, file: `uz/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const UZ = { k1: '#0099B5', k2: '#1EB53A', k3: '#E0F7FA' };
const flagShape = 'M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z';
const wave = 'c40-12 84 12 126 0s28-4 42 0';
const pole = Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A');
const band = (k, n, fill) => `<path d="M44 ${38 + (k + 0.5) * (112 / n)}${wave}" stroke="${fill}" stroke-width="${(112 / n + 1).toFixed(1)}" fill="none" stroke-linecap="butt"/>`;
const ring = (n, cx, cy, r, fn) => Array.from({ length: n }, (_, k) => { const a = (k / n) * Math.PI * 2; return fn(cx + Math.cos(a) * r, cy + Math.sin(a) * r, k, a); }).join('');

const items = [
  { id: 'uz.stamp', cat: 'stamp', file: 'uz/stamp.v1.svg', name: nm('ตราประทับอุซเบกิสถาน', 'Uzbekistan stamp'), kw: ['uzbekistan', 'อุซเบกิสถาน', 'uzbek', 'อุซเบก'],
    // an eight-pointed blue tile star with a turquoise middle and a little white flower, like the tiles on the old domes
    svg: countryStamp({ name: 'UZBEKISTAN', size: 14, ...UZ, emblem: g(100, 86, 1, R(-36, -36, 72, 72, '#1565C0', 6, 3)) + g(100, 86, 1, R(-36, -36, 72, 72, '#1565C0', 6, 3), 45) + C(100, 86, 26, '#4DD0E1', 3)
      + ring(6, 100, 86, 11, (x, y) => C(x, y, 7, '#FFFFFF', 2)) + C(100, 86, 6, '#FFCA28', 2) + ring(8, 100, 86, 42, (x, y) => C(x, y, 3, '#FFCA28', 0)) }) },
  { id: 'uz.flag', ch: '🇺🇿', cat: 'flag', file: 'uz/flag.v1.svg', name: nm('ธงอุซเบกิสถาน', 'Flag of Uzbekistan'), kw: ['uzbekistan', 'อุซเบกิสถาน', 'flag', 'ธง'],
    // blue, white and green bands parted by thin red lines, a white crescent and twelve small white stars in the blue
    svg: free(pole + P(flagShape, '#FFFFFF') + band(0, 3, '#0099B5') + band(2, 3, '#1EB53A') + Lc(`M44 ${38 + 112 / 3}${wave}`, '#CE1126', 4) + Lc(`M44 ${38 + 224 / 3}${wave}`, '#CE1126', 4)
      + '<path d="M70 46a10 10 0 1 0 0 20a8 8 0 1 1 0-20z" fill="#FFFFFF" stroke="none"/>'
      + [[92, 46], [102, 46], [112, 46], [82, 55], [92, 55], [102, 55], [112, 55], [82, 64], [92, 64], [102, 64], [112, 64], [122, 64]].map(([x, y]) => C(x, y + (x - 80) * 0.04, 2.2, '#FFFFFF', 0)).join('') + P(flagShape, 'none')) },
  { id: 'uz.hello', cat: 'hello', file: 'uz/hello.v1.svg', name: nm('สลาม สวัสดี', 'Salom, hello'), kw: ['salom', 'สลาม', 'hello', 'สวัสดี', 'uzbek language', 'ภาษาอุซเบก', 'doppi', 'หมวกดอปปี', 'chapan', 'ชาปัน'],
    // a child in a striped chapan robe and a black square doppi cap with white pepper-pod patterns, waving hello
    svg: free(P('M78 214c0-40 18-60 42-60s42 20 42 60z', '#1E88E5') + [88, 100, 140, 152].map((x) => Lc(`M${x} ${172 - Math.abs(x - 120) / 6}v42`, ['#43A047', '#FFCA28'][x % 2 ? 1 : 0], 4)).join('') + P('M112 156l8 50 8-50z', '#FFFFFF', 3)
      + C(120, 116, 30, '#E8B27D') + P('M90 108c0-16 14-26 30-26s30 10 30 26c-8-8-18-10-30-10s-22 2-30 10z', INK)
      + P('M92 96l4-24h48l4 24c-16-4-40-4-56 0z', INK) + [[104, 86, -20], [120, 82, 0], [136, 86, 20]].map(([x, y, r]) => g(x, y, 1, P('M0-7c6 2 6 10 0 14-2-4-2-10 0-14z', '#FFFFFF', 0), r)).join('')
      + P('M156 160c10-16 16-34 14-50l14 2c2 18-4 40-16 54z', '#1E88E5') + C(178, 104, 11, '#E8B27D') + face(120, 122, 0.55)) },
  G('uz', 'jeyran', 'จัยรัน', 'Jeyran', 'สลาม {name}! จัยรันพาเที่ยวอุซเบกิสถานเอง', 'Salom, {name}! Jeyran will show you Uzbekistan', ['goitered gazelle', 'ละมั่งจัยรัน', 'gazelle', 'ละมั่ง', 'desert', 'ทะเลทราย', 'kyzylkum'],
    // a goitered gazelle fawn face-on: a sandy face with a white stripe down the nose, big dark eyes, long ears and black ringed lyre-shaped horns
    Lc('M96 70c-14-20-10-44 4-58M144 70c14-20 10-44-4-58', '#4E342E', 9) + [[88, 50], [90, 34], [152, 50], [150, 34]].map(([x, y]) => Lc(`M${x - 5} ${y}h10`, '#A1887F', 2.5)).join('')
      + [[58, 104, -30], [182, 104, 30]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 30, 13, '#D7A86E') + E(0, 0, 20, 6, '#F8BBD0', 0), r)).join('')
      + P('M70 110c0-34 22-50 50-50s50 16 50 50c0 44-22 90-50 90s-50-46-50-90z', '#D7A86E') + P('M112 70h16l4 110h-24z', '#FFF8E1', 0) + E(120, 186, 18, 13, '#5D4037')
      + [[96, 116], [144, 116]].map(([x, y]) => E(x, y, 10, 12, INK) + C(x + 3, y - 4, 3.5, '#FFFFFF', 0) + Lc(`M${x} ${y + 12}l${(x - 120) / 8} 30`, '#8D6E63', 3)).join('') + [[82, 140], [158, 140]].map(([x, y]) => E(x, y, 9, 5, '#FF8FA3', 0)).join('')),
  G('uz', 'asal', 'อาซัล', 'Asal', 'อาซัลบินเร็วจี๋ พา {name} ไปดูโดมสีฟ้า', 'Asal the bee-eater zips ahead to show {name} the blue domes', ['bee-eater', 'นกจาบคา', 'european bee-eater', 'bird', 'นก', 'colourful bird'],
    // a bee-eater chick: a chestnut cap, a black mask stripe, a bright yellow throat, a turquoise chest and a long thin curved black beak
    Lc('M60 150c-20 10-26 30-20 46M160 150c20 10 26 30 20 46', '#7CB342', 14) + E(110, 140, 70, 64, '#26C6DA') + P('M40 130c0-50 34-80 72-80s66 24 70 66c-30-14-112-16-142 14z', '#A0522D') + P('M60 104c10-20 40-30 60-26-20 4-40 14-50 30z', '#FFD54F', 0)
      + E(110, 172, 42, 22, '#FFEB3B') + Lc('M70 188c26 10 54 10 80 0', INK, 4) + Lc('M48 130c40-10 92-10 132 0', INK, 16) + [[92, 128], [140, 128]].map(([x, y]) => C(x, y, 7, '#FFFFFF', 0) + C(x + 1, y, 3.5, '#C62828', 0)).join('')
      + P('M178 124c22-2 44 8 58 24-20-8-40-10-58-6z', INK) + [[76, 152], [148, 152]].map(([x, y]) => E(x, y, 9, 5, '#FF8FA3', 0)).join('')),
  I('food', 'plov', 'ข้าวผัดพลอฟในกระทะคาซาน', 'Plov in a kazan', ['plov', 'พลอฟ', 'osh', 'kazan', 'กระทะคาซาน', 'rice', 'ข้าว', 'carrots', 'แครอท', 'uzbek food', 'อาหารอุซเบก'],
    // a big black cast-iron kazan over a little fire, heaped with golden rice and orange carrot strips, a whole garlic bulb and chickpeas on top
    [70, 100, 130, 160].map((x, k) => P(`M${x} 224c-8-10-4-22 6-30 4 10 12 14 6 30z`, ['#FF7043', '#FFCA28'][k % 2], 2.5)).join('') + P('M30 116h180c0 50-40 84-90 84s-90-34-90-84z', '#37474F') + [[26, 120], [214, 120]].map(([x, y]) => E(x, y, 10, 6, '#37474F')).join('')
      + P('M36 118c10-40 52-56 84-56s74 16 84 56z', '#FFD54F') + Array.from({ length: 11 }, (_, k) => g(56 + k * 13, 96 + Math.abs(5 - k) * 3, 1, R(-2.5, -9, 5, 18, '#FB8C00', 2, 0), (k % 3 - 1) * 30)).join('')
      + [[84, 104], [158, 106], [100, 92], [140, 92]].map(([x, y]) => C(x, y, 4.5, '#E0C080', 1.5)).join('') + P('M106 82c-6-16 4-26 14-30 10 4 20 14 14 30z', '#FFF8E1', 3) + Lc('M120 52v-8', '#7CB342', 3) + face(120, 156, 0.5).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  I('food', 'non', 'ขนมปังนอนกับตราปั๊มชิคิช', 'Non bread and its chekich stamp', ['non', 'ขนมปังนอน', 'lepyoshka', 'flatbread', 'ขนมปังแผ่นกลม', 'chekich', 'ตราปั๊มขนมปัง', 'tandoor bread', 'samarkand non'],
    // a big round golden non loaf with a puffy rim and a flat middle pricked in rings of dots, a wooden chekich stamp with little pins beside it
    E(110, 132, 92, 82, '#E0A050') + E(110, 132, 56, 48, '#F4C27A', 3) + ring(12, 110, 132, 40, (x, y) => C(x, y, 3, '#B5722A', 0)) + ring(8, 110, 132, 26, (x, y) => C(x, y, 3, '#B5722A', 0)) + C(110, 132, 6, '#B5722A', 0)
      + ring(18, 110, 132, 72, (x, y, k) => (k % 2 ? E(x, y, 2.5, 1.5, INK, 0) : E(x, y, 2.5, 1.5, '#FFF8E1', 0)))
      + g(196, 184, 1, R(-6, -46, 12, 40, '#A1673F', 5) + E(0, -4, 22, 10, '#8D6E63') + Array.from({ length: 5 }, (_, k) => Lc(`M${-14 + k * 7} 6v8`, '#90A4AE', 2.5)).join(''), -20) + face(110, 98, 0.45)),
  I('food', 'samsa', 'ซัมซาอบจากเตาตันดีร์', 'Samsa from the tandir oven', ['samsa', 'ซัมซา', 'tandir', 'เตาตันดีร์', 'tandoor', 'เตาดิน', 'pastry', 'พายเนื้อ', 'sesame', 'งา', 'street snack'],
    // a round clay tandir oven glowing at its mouth, and in front a tray of puffy golden triangle samsa sprinkled with sesame seeds
    P('M40 160c0-70 30-110 80-110s80 40 80 110z', '#D7A86E') + Lc('M60 120c30-8 90-8 120 0M54 146c30-8 102-8 132 0', '#BC8A55', 3) + E(120, 58, 26, 9, '#FF7043') + P('M110 50c-2-14 8-20 6-30 8 6 12 16 6 30z', '#FFCA28', 2.5)
      + R(28, 160, 184, 18, '#8D6E63', 6) + [[70, 156], [120, 152], [170, 156]].map(([x, y]) => P(`M${x - 28} ${y}c4-30 18-42 28-46 10 4 24 16 28 46-18 6-38 6-56 0z`, '#F2B45C') + Lc(`M${x - 16} ${y - 18}c10 4 22 4 32 0`, '#D08A30', 2) + [[-8, -26], [4, -30], [10, -20], [-2, -16]].map(([dx, dy]) => E(x + dx, y + dy, 2, 1.2, '#FFFDE7', 0)).join('')).join('') + face(120, 132, 0.4)),
  I('food', 'lagman', 'บะหมี่ลักมันดึงมือ', 'Hand-pulled lagman noodles', ['lagman', 'ลักมัน', 'hand-pulled noodles', 'บะหมี่ดึงมือ', 'noodle soup', 'ก๋วยเตี๋ยวน้ำ', 'peppers', 'พริกหวาน', 'uzbek food'],
    // a deep white bowl of thick noodles under a red sauce of peppers and tomato, one long noodle pulled up high in a loop above it
    Lc('M218 6l-48 64', '#90A4AE', 7) + [-8, 0, 8].map((d) => Lc(`M${170 + d} 70l-10 14`, '#90A4AE', 3)).join('') + [140, 152, 164].map((x) => Lc(`M${x} 80c-10 8 6 14-4 20s6 10-2 16 4 8-2 12`, INK, 10) + Lc(`M${x} 80c-10 8 6 14-4 20s6 10-2 16 4 8-2 12`, '#FFF3C4', 6)).join('')
      + P('M34 120h172c0 52-38 86-86 86s-86-34-86-86z', '#FFFFFF') + Lc('M44 150c40 8 112 8 152 0', '#29B6F6', 4) + E(120, 120, 86, 18, '#E57373')
      + Array.from({ length: 5 }, (_, k) => Lc(`M${60 + k * 22} 112c6 6 12 6 16 0`, '#FFF3C4', 5)).join('') + [[76, 116, '#43A047'], [104, 110, '#FFCA28'], [150, 114, '#43A047'], [170, 120, '#8D6E63'], [128, 124, '#FFCA28']].map(([x, y, c]) => R(x - 6, y - 4, 12, 8, c, 2, 2)).join('') + face(120, 168, 0.45)),
  I('food', 'melons', 'แตงหวานกับองุ่นอุซเบก', 'Uzbek melons and grapes', ['melon', 'แตงหวาน', 'mirzachul melon', 'แตงหวานอุซเบก', 'grapes', 'องุ่น', 'summer fruit', 'ผลไม้หน้าร้อน', 'harvest'],
    // two long yellow torpedo melons with green netting on a striped cloth, one slice cut open, a bunch of green grapes and a bunch of purple ones
    R(16, 176, 208, 26, '#E53935', 6) + [36, 76, 116, 156, 196].map((x) => R(x - 6, 176, 12, 26, '#FFFFFF', 0, 0)).join('') + R(16, 176, 208, 26, 'none', 6)
      + g(92, 140, 1, E(0, 0, 62, 32, '#FFE066') + Lc('M-50-8c30 10 70 10 100 0M-54 8c34 10 74 10 108 0M-30-28c-4 20-4 40 0 56M10-30c4 20 4 40 0 60', '#9CCC65', 2), -14)
      + P('M150 170c0-26 30-36 50-30z', '#FFF59D') + P('M150 170c10-18 30-26 50-30', '#9CCC65', 3)
      + [[176, 92], [188, 92], [182, 102], [170, 102], [194, 102], [176, 112], [188, 112], [182, 122]].map(([x, y]) => C(x, y, 7, '#AED581', 2)).join('') + Lc('M182 84v-12', '#6D4C41', 3)
      + [[40, 120], [52, 120], [46, 130], [34, 130], [58, 130], [46, 140]].map(([x, y]) => C(x, y, 7, '#7E57C2', 2)).join('') + Lc('M46 112v-12', '#6D4C41', 3) + face(92, 140, 0.45)),
  I('food', 'navat', 'น้ำตาลกรวดนาวัตกับชา', 'Navat sugar crystals for tea', ['navat', 'นาวัต', 'crystal sugar', 'น้ำตาลกรวด', 'rock sugar', 'sweets', 'ขนมหวาน', 'tea', 'ชา', 'uzbek sweets'],
    // a big amber cluster of rock-sugar crystals grown on cotton strings, a few loose pieces, a little round tea bowl beside
    Array.from({ length: 4 }, (_, k) => Lc(`M${84 + k * 20} 40v130`, '#FFFFFF', 2.5)).join('') + R(70, 34, 100, 10, '#A1673F', 3)
      + [[90, 90, 10], [110, 120, -12], [130, 84, 18], [150, 116, -6], [96, 150, 24], [140, 152, -20], [118, 70, 4]].map(([x, y, r]) => g(x, y, 1, P('M-14 0l8-18h14l8 18-8 18H-6z', '#FFB74D') + Lc('M-6-18l6 18-6 18', '#FFE0B2', 2), r)).join('')
      + [[40, 200], [62, 206]].map(([x, y]) => g(x, y, 1, P('M-8 0l5-10h7l5 10-5 10h-7z', '#FFB74D', 2.5))).join('') + P('M160 188h50c0 20-10 30-25 30s-25-10-25-30z', '#FFFFFF') + Lc('M164 196h42', '#1E88E5', 3) + face(120, 116, 0.45)),
  I('food', 'driedfruit', 'แอปริคอตตากแห้งกับลูกเกด', 'Dried apricots and raisins', ['dried apricots', 'แอปริคอตแห้ง', 'raisins', 'ลูกเกด', 'dried fruit', 'ผลไม้แห้ง', 'almonds', 'อัลมอนด์', 'snack', 'ของฝาก'],
    // a woven round basket heaped with flat orange dried apricots, a pile of golden and dark raisins and a few almonds on a cloth in front
    P('M30 120h180l-14 70H44z', '#C8A165') + Array.from({ length: 4 }, (_, k) => Lc(`M${36 + k * 2} ${134 + k * 14}h${168 - k * 4}`, '#A1814B', 3)).join('') + Lc('M28 120h184', '#A1814B', 6)
      + [[60, 110], [90, 100], [120, 94], [150, 100], [180, 110], [76, 86], [106, 80], [138, 80], [164, 88], [122, 64]].map(([x, y], k) => g(x, y, 1, E(0, 0, 16, 11, '#FF9800') + Lc('M-8-2c4 4 12 4 16 0', '#E65100', 2), (k % 3 - 1) * 20)).join('')
      + Array.from({ length: 10 }, (_, k) => E(40 + (k % 5) * 9, 210 - Math.floor(k / 5) * 7, 5, 4, k % 2 ? '#C49A2C' : '#5D4037', 1.5)).join('')
      + [[170, 208, 20], [192, 204, -20], [182, 216, 0]].map(([x, y, r]) => g(x, y, 1, P('M-10 0c4-8 16-8 20 0-4 6-16 6-20 0z', '#D7A86E', 2), r)).join('') + face(120, 92, 0.4)),
  I('culture', 'choynak', 'กาน้ำชาลายฝ้ายกับถ้วยพิยาลา', 'A cotton-pattern teapot and piala bowls', ['choynak', 'กาน้ำชา', 'teapot', 'piala', 'ถ้วยพิยาลา', 'green tea', 'ชาเขียว', 'cotton pattern', 'ลายฝ้าย', 'choyxona', 'ร้านน้ำชา'],
    // a round white teapot with the blue cotton-boll pattern and gold rims, steam from its spout, two little handle-less piala bowls in front
    Lc('M60 72c-6-10 6-16 0-26M48 80c-6-10 6-16 0-26', '#B0BEC5', 3) + P('M74 116c-14-4-20-24-24-36l12-4c6 12 12 24 20 26z', '#FFFFFF') + Lc('M162 108c26-6 30 34 4 42', INK, 14) + Lc('M162 108c26-6 30 34 4 42', '#FFFFFF', 6)
      + E(120, 130, 50, 44, '#FFFFFF') + Lc('M74 150h92', '#FFC107', 3) + E(120, 88, 28, 7, '#FFC107') + E(120, 82, 8, 6, '#FFFFFF', 3)
      + [[100, 116, -20], [140, 116, 20], [120, 104, 0]].map(([x, y, r]) => g(x, y, 1, P('M0 8c-6-2-8-12 0-16 8 4 6 14 0 16z', '#1565C0', 2) + C(-6, -2, 3.5, '#FFFFFF', 1.5) + C(6, -2, 3.5, '#FFFFFF', 1.5) + C(0, -8, 3.5, '#FFFFFF', 1.5), r)).join('')
      + [[50, 202], [190, 202]].map(([x, y]) => P(`M${x - 22} ${y - 18}h44c0 14-10 22-22 22s-22-8-22-22z`, '#FFFFFF') + Lc(`M${x - 20} ${y - 12}h40`, '#1565C0', 3) + E(x, y - 18, 22, 4, '#C5A05A', 2)).join('') + face(120, 136, 0.5)),
  I('culture', 'suzani', 'ผ้าปักซูซานี', 'A suzani embroidery', ['suzani', 'ซูซานี', 'embroidery', 'ผ้าปัก', 'wall hanging', 'ผ้าแขวนผนัง', 'bukhara', 'needlework', 'ของฝาก', 'souvenir'],
    // a cream cloth hung from a pole, stitched with big round red sun flowers ringed in pink, green curling vines and leaves, tassels at the bottom
    Lc('M18 30h204', '#8D6E63', 7) + R(30, 32, 180, 170, '#FFF8E1', 4) + R(38, 40, 164, 154, 'none', 2, 2.5)
      + [[80, 82, 26], [160, 82, 26], [120, 150, 30]].map(([x, y, r]) => C(x, y, r, '#E53935', 3) + ring(10, x, y, r - 7, (a, b) => C(a, b, 4, '#F48FB1', 0)) + C(x, y, r * 0.38, '#AD1457', 2.5) + C(x, y, r * 0.15, '#FFCA28', 0)).join('')
      + Lc('M50 130c20 10 30-10 50 0M140 130c20-10 30 10 50 0M60 176c10-14 20-10 26-4M154 172c10-6 20-10 26 4', '#43A047', 3) + [[56, 126], [104, 128], [186, 126], [70, 172], [170, 176]].map(([x, y]) => E(x, y, 6, 3.5, '#66BB6A', 1.5)).join('')
      + Array.from({ length: 9 }, (_, k) => Lc(`M${40 + k * 20} 202v14`, ['#E53935', '#1E88E5', '#FFCA28'][k % 3], 4)).join('') + face(120, 150, 0.4)),
  I('culture', 'doira', 'กลองโดอิรา', 'A doira frame drum', ['doira', 'โดอิรา', 'frame drum', 'กลองแบน', 'tambourine', 'แทมบูรีน', 'music', 'ดนตรี', 'dance', 'เต้นรำ'],
    // a big round frame drum with a painted wooden rim, a pale skin and a ring of small metal rings jingling inside the rim
    C(120, 120, 92, '#A1673F') + Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2; return C(120 + Math.cos(a) * 86, 120 + Math.sin(a) * 86, 3.5, ['#FFCA28', '#43A047'][k % 2], 0); }).join('') + C(120, 120, 78, '#FFF3D6', 3)
      + ring(24, 120, 120, 70, (x, y) => C(x, y, 5, 'none', 2.5).replace('fill="none"', 'fill="none" stroke="#9E9E9E"')) + C(120, 120, 22, 'none', 2).replace('fill="none"', 'fill="none" stroke="#E0C9A6"')
      + Lc('M196 50l14-10M206 62l16-4M44 196l-14 10', '#FFCA28', 3) + face(120, 116, 0.8)),
  I('culture', 'rishtan', 'จานเซรามิกสีฟ้าริชตัน', 'A blue Rishtan ceramic plate', ['rishtan', 'ริชตัน', 'ceramic plate', 'จานเซรามิก', 'lagan', 'ลากัน', 'pottery', 'เครื่องปั้นดินเผา', 'turquoise', 'สีฟ้าเทอร์ควอยซ์', 'fergana'],
    // a big round plate glazed deep turquoise-blue with a white ring of swirling leaves, little almond shapes round the rim and a flower in the middle
    E(120, 126, 100, 94, '#1565C0') + E(120, 122, 92, 86, '#29B6F6', 3) + ring(14, 120, 122, 78, (x, y, k, a) => g(x, y, 1, P('M-7 0c4-6 10-6 14 0-4 6-10 6-14 0z', '#FFFFFF', 0), (a * 180) / Math.PI + 90)) + C(120, 122, 60, '#E1F5FE', 3)
      + ring(6, 120, 122, 38, (x, y, k, a) => g(x, y, 1, P('M0-14c12 4 12 22 0 28-12-6-12-24 0-28z', '#0288D1', 2), (a * 180) / Math.PI + 90)) + C(120, 122, 22, '#1565C0', 2.5) + face(120, 118, 0.55).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  I('culture', 'karnay', 'แตรยาวคาร์นัย', 'Long karnay trumpets', ['karnay', 'คาร์นัย', 'long trumpet', 'แตรยาว', 'surnay', 'ซูร์นัย', 'brass', 'ทองเหลือง', 'wedding music', 'festival', 'navruz', 'นาวรูซ'],
    // two very long thin brass trumpets crossing like an X with wide flared bells, a short wooden surnay pipe in front and musical notes floating up
    [[-1, '#FFC107'], [1, '#FFB300']].map(([s, c]) => g(120, 140, 1, Lc('M0 90V-100', c, 9) + P('M-6-100c-4-10-20-22-24-34h60c-4 12-20 24-24 34z', c) + R(-7, 60, 14, 12, '#E65100', 3, 2.5) + Lc('M0 90V-100', INK, 1.5), s * 26)).join('')
      + g(120, 190, 1, P('M-8-30h16l10 40h-36z', '#8D6E63') + Array.from({ length: 4 }, (_, k) => C(0, -22 + k * 8, 2.5, INK, 0)).join(''))
      + [[40, 120], [196, 110], [60, 70]].map(([x, y]) => E(x, y, 7, 5, INK) + Lc(`M${x + 6} ${y}v-22l10 4`, INK, 3)).join('') + face(120, 146, 0.4)),
  I('culture', 'ikat', 'ผ้าอัตลัสลายอิกัต', 'Atlas ikat cloth', ['ikat', 'อิกัต', 'atlas', 'ผ้าอัตลัส', 'abrband', 'margilan', 'มาร์กิลัน', 'cloud pattern', 'ลายเมฆ', 'textile', 'ผ้าทอ'],
    // two lengths of cloth hung over a line, woven in the fuzzy-edged ikat pattern of zigzag pink, yellow and green clouds
    Lc('M10 40h220', '#8D6E63', 4) + [[30, '#E91E63', '#FFEB3B', '#00897B'], [126, '#3949AB', '#FF7043', '#FFEB3B']].map(([x, a, b, c]) => R(x, 40, 84, 170, a, 3)
      + Array.from({ length: 4 }, (_, k) => P(`M${x + 42} ${54 + k * 40}l-8 6 6 4-10 8 12 4-8 6 8 4 8-4-8-6 12-4-10-8 6-4z`, b, 2)).join('')
      + Array.from({ length: 3 }, (_, k) => P(`M${x} ${74 + k * 40}l8 4-4 6 8 4-6 6 6 4-12 0z M${x + 84} ${74 + k * 40}l-8 4 4 6-8 4 6 6-6 4 12 0z`, c, 2)).join('')
      + Lc(`M${x} 210v8M${x + 20} 210v8M${x + 42} 210v8M${x + 64} 210v8M${x + 84} 210v8`, a, 3)).join('') + [[48, 36], [192, 36]].map(([x, y]) => R(x - 4, y - 6, 8, 14, '#FFCA28', 2, 2)).join('') + face(72, 126, 0.35)),
  I('animal', 'markhor', 'แพะมาร์ค็อร์เขาเกลียว', 'A markhor with corkscrew horns', ['markhor', 'มาร์ค็อร์', 'wild goat', 'แพะภูเขา', 'corkscrew horns', 'เขาเกลียว', 'kugitang', 'mountains', 'ภูเขา', 'wildlife'],
    // a wild mountain goat standing on a rock, its two long horns twisting up like corkscrews, a long shaggy beard and mane down its chest
    P('M20 222c10-30 40-40 90-40s96 6 110 40z', '#90A4AE') + E(140, 140, 54, 30, '#BCAAA4') + [[106, 160], [124, 164], [160, 164], [178, 160]].map(([x, y]) => R(x - 5, y, 10, 30, '#BCAAA4', 3) + R(x - 5, y + 24, 10, 6, INK, 2, 0)).join('')
      + P('M96 120c-10 30-6 60 10 80 8-20 10-50 6-76z', '#ECEFF1') + E(84, 104, 26, 20, '#BCAAA4') + P('M70 116c-4 20 2 34 10 40 6-10 8-24 4-36z', '#ECEFF1') + [[72, 90, -1], [96, 90, 1]].map(([x, y, s]) => Array.from({ length: 9 }, (_, j) => { const k = 8 - j; return g(x + s * k * 4, y - k * 9, 1, E(0, 0, 11 - k * 0.8, 5, k % 2 ? '#A1887F' : '#6D4C41', 2.5), s * -25); }).join('')).join('')
      + Lc('M190 120l14-10', '#BCAAA4', 6) + face(84, 104, 0.35, 'none') + E(70, 112, 4, 3, INK)),
  I('transport', 'damas', 'รถตู้จิ๋วดามัส', 'A tiny Damas minivan', ['damas', 'ดามัส', 'minivan', 'รถตู้', 'marshrutka', 'มาร์ชรุตกา', 'taxi van', 'รถแท็กซี่', 'ride', 'นั่งรถ'],
    // a tiny boxy white minivan with round headlights, a sliding side door, a roof rack piled with a bundle and a melon
    R(40, 76, 160, 106, '#FFFFFF', 18) + R(52, 88, 40, 30, '#B3E5FC', 6, 3) + R(100, 88, 40, 30, '#B3E5FC', 6, 3) + R(148, 88, 40, 30, '#B3E5FC', 6, 3) + Lc('M144 120v58', INK, 3) + Lc('M40 140h160', '#29B6F6', 6)
      + [[52, 158], [188, 158]].map(([x, y]) => C(x, y, 8, '#FFF59D', 2.5)).join('') + Lc('M54 74V64h132v10', '#757575', 4) + R(70, 46, 50, 18, '#7E57C2', 4) + E(150, 54, 22, 12, '#FFE066') + Lc('M134 52c10 4 22 4 32 0', '#9CCC65', 2)
      + [[76, 186], [164, 186]].map(([x, y]) => C(x, y, 18, INK) + C(x, y, 7, '#B0BEC5', 0)).join('') + face(120, 152, 0.4)),
];

export default {
  places: {
    uz: { country: 'uz', wave: 3, name: nm('อุซเบกิสถาน', 'Uzbekistan'), tz: 'Asia/Tashkent', alias: ['uzbekistan', 'อุซเบกิสถาน', 'uzbek', 'อุซเบก'], colors: UZ },
  },
  items,
};
