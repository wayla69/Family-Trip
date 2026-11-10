// Wave 7 (central Europe, part 3): Poland, Kraków (with Gdańsk, Malbork and Ojców), Slovakia, Bratislava and the High Tatras, Slovenia
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (pl/krakow/landmark-hejnal.v1.svg → pl-krakow.landmark.hejnal)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture)
const F = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const wins = (x, y, n, dx, w, h, fill = '#B3E5FC') => Array.from({ length: n }, (_, k) => R(x + k * dx, y, w, h, fill, 1, 1.5)).join('');
const tree = (x, y, s = 1, c = '#43A047') => g(x, y, s, C(0, -16, 16, c, 2.5) + R(-3, 0, 6, 10, '#6D4C41', 0, 2));
const fir = (x, y, s = 1, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', c, 2) + R(-3, 0, 6, 6, '#6D4C41', 0, 1.5));
const bricks = (x, y, w, h, c = '#8D3B2B') => Array.from({ length: Math.floor(h / 10) }, (_, k) => Lc(`M${x} ${y + 10 + k * 10}h${w}`, c, 1.5)).join('');

const items = [
  // ---------- Poland
  F('pl', 'food', 'zurek', 'ซุปจูเร็กในชามขนมปัง', 'Żurek sour rye soup in a bread bowl', ['zurek', 'żurek', 'จูเร็ก', 'sour rye soup', 'ซุปข้าวไรย์เปรี้ยว', 'bread bowl', 'ชามขนมปัง', 'boiled egg', 'ไข่ต้ม', 'polish soup'],
    // a round crusty loaf hollowed out as a bowl, filled with creamy white soup, half a boiled egg and slices of sausage floating, steam rising, on a wooden board
    R(30, 190, 180, 20, '#A1673F', 8) + P('M40 130c0 50 36 72 80 72s80-22 80-72z', '#C68642') + Lc('M60 170c10 8 20 10 30 10M150 176c10-4 18-10 24-18', '#8D5524', 3)
      + E(120, 130, 82, 22, '#C68642') + E(120, 130, 70, 16, '#FFF8E1', 2.5)
      + E(100, 128, 15, 9, '#FFFFFF', 2) + C(100, 128, 6, '#FFC107', 1.5) + [[134, 124], [150, 134], [122, 138]].map(([x, y]) => E(x, y, 8, 5, '#C0603A', 2) + C(x, y, 2, '#FFCDD2', 0)).join('') + C(80, 134, 2, '#43A047', 0) + C(160, 124, 2, '#43A047', 0)
      + Lc('M90 96c-6-10 6-14 0-24M120 92c-6-10 6-14 0-24M150 96c-6-10 6-14 0-24', '#BDBDBD', 3) + face(120, 176, 0.4)),
  F('pl', 'culture', 'wycinanki', 'วือชีนันกี ศิลปะตัดกระดาษสีโปแลนด์', 'Wycinanki, Polish paper cut-outs', ['wycinanki', 'วือชีนันกี', 'paper cutting', 'ศิลปะตัดกระดาษ', 'folk art', 'ศิลปะพื้นบ้าน', 'paper rooster', 'ไก่กระดาษ', 'kurpie', 'łowicz'],
    // a round layered paper cut-out in bright colours: a black outer ring of zigzag teeth, then green leaves, red and pink petals, a yellow and blue centre, with two little paper roosters at the sides
    C(120, 112, 84, '#212121') + Array.from({ length: 24 }, (_, k) => g(120, 112, 1, P('M-6-82l6-12 6 12z', '#212121', 0), k * 15)).join('') + C(120, 112, 72, '#FFFFFF', 2)
      + Array.from({ length: 8 }, (_, k) => g(120, 112, 1, P('M0-30c14-10 16-30 0-40-16 10-14 30 0 40z', '#43A047', 2), k * 45)).join('')
      + Array.from({ length: 8 }, (_, k) => g(120, 112, 1, P('M0-12c10-6 12-20 0-26-12 6-10 20 0 26z', k % 2 ? '#E53935' : '#EC407A', 2), k * 45 + 22.5)).join('') + C(120, 112, 14, '#FFCA28', 2) + C(120, 112, 6, '#1E88E5', 1.5)
      + [[34, 1], [206, -1]].map(([x, d]) => g(x, 206, 1, P(`M0 0c${-d * 4}-14 ${d * 2}-26 ${d * 14}-30l${d * 6}-10 ${d * 2} 10c${d * 8} 4 ${d * 8} 18 ${-d * 2} 26z`, '#E53935', 2.5) + P(`M${-d * 2}-4c${-d * 14} 0 ${-d * 22}-14 ${-d * 18}-26 ${d * 8} 4 ${d * 12} 14 ${d * 18} 22z`, '#1E88E5', 2.5) + C(d * 14, -26, 2, INK, 0) + Lc(`M0 0v10M${d * 6} 0v10`, INK, 2))).join('')
      + face(120, 110, 0.32)),
  F('pl', 'culture', 'lowicz', 'กระโปรงลายทางหลากสีแบบวอวิช', 'A Łowicz folk costume with its rainbow stripes', ['łowicz', 'lowicz', 'วอวิช', 'folk costume', 'ชุดพื้นเมืองโปแลนด์', 'striped skirt', 'กระโปรงลายทาง', 'pasiak', 'polish folk dance', 'embroidered vest'],
    // a smiling girl in a wide skirt of bright vertical stripes in orange, green, purple and yellow, a black velvet vest embroidered with flowers, a white blouse with puffed sleeves and a ribbon in her hair
    P('M50 216c6-50 30-80 70-80s64 30 70 80z', '#FF7043')
      + Array.from({ length: 9 }, (_, k) => Lc(`M${66 + k * 14} 150c${(k - 4) * 2} 20 ${(k - 4) * 6} 46 ${(k - 4) * 8} 64`, ['#43A047', '#7B1FA2', '#FFCA28', '#1E88E5'][k % 4], 6)).join('') + P('M50 216c6-50 30-80 70-80s64 30 70 80z', 'none')
      + P('M84 150c0-30 14-46 36-46s36 16 36 46z', '#FFFFFF') + P('M98 150l4-40h36l4 40z', '#212121') + [[112, 126], [128, 126], [120, 140]].map(([x, y]) => C(x, y, 4, '#E53935', 1.5) + C(x, y, 1.5, '#FFCA28', 0)).join('')
      + C(120, 80, 26, '#FFE0BD') + P('M94 76c0-26 52-26 52 0-6-10-16-14-26-14s-20 4-26 14z', '#F4C27A') + Lc('M144 70c10 10 12 26 8 40M96 70c-10 10-12 26-8 40', '#F4C27A', 6) + C(146, 64, 7, '#E53935', 2) + face(120, 84, 0.45)),
  F('pl', 'culture', 'pisanki', 'ไข่ปีซันกีลวดลายพื้นบ้าน', 'Pisanki, painted folk eggs', ['pisanki', 'ปีซันกี', 'painted eggs', 'ไข่ระบายสี', 'wax-resist eggs', 'ไข่ลวดลายขี้ผึ้ง', 'polish easter', 'อีสเตอร์โปแลนด์', 'folk patterns', 'basket'],
    // a woven basket holding four eggs painted with bright folk patterns: zigzags, dots, wavy lines and little flowers in red, blue, yellow and green, one big egg standing in front with a face
    P('M30 150h180l-16 60H46z', '#C68642') + Array.from({ length: 4 }, (_, k) => Lc(`M36 ${160 + k * 13}h168`, '#8D5524', 2)).join('') + P('M40 150c0-70 160-70 160 0', 'none', 6)
      + [[70, 132, '#1E88E5'], [104, 124, '#FFCA28'], [140, 126, '#43A047'], [172, 134, '#AB47BC']].map(([x, y, c], k) => E(x, y, 18, 24, c, 2.5) + (k % 2 ? Lc(`M${x - 16} ${y}l6-6 6 6 6-6 6 6 6-6`, '#FFFFFF', 2) : Lc(`M${x - 17} ${y - 4}c6-6 12 6 18 0s12 6 16 0`, '#FFFFFF', 2)) + C(x, y + 12, 3, '#FFFFFF', 0)).join('')
      + E(120, 186, 32, 42, '#E53935', 3) + Lc('M90 174h60M90 200h60', '#FFFFFF', 3) + Array.from({ length: 6 }, (_, k) => C(98 + k * 9, 187, 2.5, '#FFCA28', 0)).join('') + Lc('M100 160l6-6 6 6 6-6 6 6 6-6 6 6', '#FFFFFF', 2) + face(120, 212, 0.32)),
  F('pl', 'culture', 'amber', 'อำพันทะเลบอลติกบนหาดทราย', 'Baltic amber on the beach', ['baltic amber', 'อำพันบอลติก', 'amber', 'อำพัน', 'bursztyn', 'amber necklace', 'สร้อยอำพัน', 'gdańsk', 'gdansk', 'baltic sea'],
    // golden see-through lumps of amber glowing on the sand by little Baltic waves, the biggest one with a tiny ant caught inside, an amber bead necklace beside it
    P('M10 110c40-10 80 6 110 0s70-10 110 0v20H10z', '#4FC3F7') + Lc('M20 124c30-8 60 6 90 0s60-8 110 0', '#FFFFFF', 3) + P('M10 130h220v80c0 10-10 16-20 16H30c-10 0-20-6-20-16z', '#FFE0B2')
      + P('M70 196c-24 0-30-30-16-50s50-26 66-10 18 44-6 56c-14 6-30 4-44 4z', '#FFA000') + P('M70 156c10-10 26-12 34-6', 'none', 3) + E(98, 176, 4, 3, '#5D4037', 0) + E(106, 176, 4, 3, '#5D4037', 0) + Lc('M94 172l-4-4M102 172l2-5M110 176l4-3M96 180l-4 4M104 180l2 4', '#5D4037', 1.5)
      + [[160, 180, 16, '#FFB300'], [196, 166, 11, '#FF8F00'], [184, 204, 9, '#FFCA28']].map(([x, y, r, c]) => P(`M${x - r} ${y}c0-${r} ${r * 2}-${r * 1.2} ${r * 2} 0s-${r * 0.6} ${r} -${r} ${r}-${r}-${r * 0.4}-${r}-${r}z`, c, 2.5)).join('')
      + Lc('M30 150c10 20 30 30 50 26', INK, 1.5) + Array.from({ length: 6 }, (_, k) => C(32 + k * 9, 154 + k * 4 - (k > 3 ? (k - 3) * 6 : 0), 4, '#FFB300', 1.5)).join('') + face(78, 168, 0.35)),

  // ---------- Kraków and further afield (Gdańsk, Malbork, Ojców)
  L('pl/krakow/landmark-obwarzanek.v1.svg', 'รถเข็นขายขนมปังวงโอบวาจาแน็ก', 'An obwarzanek cart, Kraków\'s bread rings', ['obwarzanek', 'โอบวาจาแน็ก', 'bread rings', 'ขนมปังวงแหวน', 'blue street cart', 'รถเข็นสีฟ้า', 'poppy seeds', 'เมล็ดป๊อปปี้', 'sesame', 'krakow snack'], 'หาขนมปังวงแหวนที่ร้อยเรียงในรถเข็นสีฟ้า', 'Find the bread rings stacked up inside the little blue cart',
    // a little blue street cart with a glass case, golden twisted bread rings stacked on upright sticks inside, some sprinkled with poppy seeds and sesame, wheels and a red umbrella on top
    sky('#FFF8E1') + P('M-4 200h248v44H-4z', '#BDBDBD', 3) + Lc('M120 52V30', INK, 3) + P('M60 52c0-30 120-30 120 0z', '#E53935', 3) + Lc('M80 52c0-16 20-24 40-26M160 52c0-16-20-24-40-26', '#FFFFFF', 2)
      + R(54, 60, 132, 100, '#B3E5FC', 6, 3) + R(54, 150, 132, 40, '#1E88E5', 4, 3) + Lc('M186 170h30', '#455A64', 4)
      + [86, 120, 154].map((x) => Lc(`M${x} 64v90`, '#8D6E63', 3) + Array.from({ length: 4 }, (_, k) => g(x, 80 + k * 20, 1, E(0, 0, 16, 7, '#E0A040') + E(0, 0, 8, 3, '#B3E5FC') + [[-10, -3], [8, -3], [-8, 4]].map(([dx, dy]) => C(dx, dy, 1.2, k % 2 ? '#37474F' : '#FFF8E1', 0)).join(''))).join('')).join('')
      + [76, 164].map((x) => C(x, 196, 14, '#37474F', 3) + C(x, 196, 4, '#B0BEC5', 1.5)).join('') + face(120, 170, 0.35)),
  L('pl/krakow/landmark-barbican.v1.svg', 'บาร์บิคันทรงกลมแห่งคราคูฟ', 'The round Barbican of Kraków', ['krakow barbican', 'barbakan', 'บาร์บิคัน', 'round gatehouse', 'ป้อมประตูทรงกลม', 'red brick', 'อิฐแดง', 'seven turrets', 'ป้อมเจ็ดยอด', 'florian gate'], 'หาหลังคายอดแหลมเล็กๆ เจ็ดอันบนป้อมกลม', 'Find the seven little pointed roofs around the top of the round fort',
    // a fat round red-brick fort with rows of small slit windows, a ring of seven little pointed turret roofs around its top, a gate passage and a bridge over a grassy moat, trees of the park behind
    sky('#E8F5E9') + [[16, 110], [224, 104]].map(([x, y]) => tree(x, y, 1.6, '#558B2F')).join('') + P('M-4 190h248v54H-4z', '#7CB342', 3)
      + P('M36 196V96c0-14 168-14 168 0v100z', '#C0573E', 3) + bricks(36, 96, 168, 100, '#8D3B2B') + E(120, 96, 84, 12, '#B5543A', 3)
      + [[44, 88], [70, 82], [96, 80], [120, 80], [144, 80], [170, 82], [196, 88]].map(([x, y]) => R(x - 7, y - 10, 14, 14, '#C0573E', 0, 2.5) + P(`M${x - 9} ${y - 10}l9-22 9 22z`, '#455A64', 2.5)).join('')
      + Array.from({ length: 12 }, (_, k) => R(48 + (k % 6) * 26, 116 + Math.floor(k / 6) * 30, 5, 14, '#3E2723', 1, 1.5)).join('')
      + P('M98 196v-26c0-14 44-14 44 0v26z', '#3E2723', 3) + P('M92 196h56l12 48H80z', '#BCAAA4', 3) + face(120, 150, 0.35)),
  L('pl/krakow/landmark-gdanskcrane.v1.svg', 'ปั้นจั่นไม้ยักษ์ริมแม่น้ำที่กดานสก์', 'The old wooden port crane of Gdańsk', ['gdańsk crane', 'gdansk crane', 'ปั้นจั่นกดานสก์', 'żuraw', 'zuraw', 'medieval crane', 'ปั้นจั่นยุคกลาง', 'motława river', 'treadwheel', 'gdańsk'], 'หาล้อไม้ยักษ์ข้างในที่คนเดินเหยียบเพื่อยกของ', 'Find the giant wooden wheels inside that people walked in to lift the cargo',
    // a medieval port crane: a tall dark wooden box overhanging the river between two round red-brick towers, big treadwheels showing inside, a rope and hook lowering a barrel onto a little boat
    sky('#E3F2FD') + P('M-4 180h248v64H-4z', '#4FC3F7', 3) + Lc('M20 210h40M170 220h50', '#E1F5FE', 3)
      + [[30, 40], [182, 40]].map(([x, w]) => R(x, 80, w, 100, '#C0573E', 0, 3) + bricks(x, 80, w, 100, '#8D3B2B') + P(`M${x - 4} 80l${w / 2 + 4}-30 ${w / 2 + 4} 30z`, '#455A64', 3) + R(x + 14, 100, 12, 18, '#3E2723', 6, 2)).join('')
      + P('M70 180V70h88l14 20v90z', '#5D4037', 3) + P('M64 70l50-46 50 46z', '#3E2723', 3) + P('M158 70h30l-16 20h-14z', '#6D4C41', 3)
      + [[96, 112], [134, 112]].map(([x, y]) => C(x, y, 22, '#A1673F', 3) + C(x, y, 6, '#5D4037', 2) + Array.from({ length: 6 }, (_, k) => g(x, y, 1, Lc('M0 6V20', '#5D4037', 2.5), k * 60)).join('')).join('')
      + Lc('M180 90v70', INK, 2) + P('M174 160h12l-2 6c4 2 4 8 0 10', 'none', 2.5) + R(170, 168, 20, 20, '#8D6E63', 4, 2.5) + Lc('M170 174h20M170 182h20', '#5D4037', 1.5)
      + P('M150 200h70c-4 12-14 16-30 16h-30z', '#FFFFFF', 3) + Lc('M156 204h60', '#E53935', 3) + face(115, 150, 0.3)),
  L('pl/krakow/landmark-malbork.v1.svg', 'ปราสาทมัลบอร์กอิฐแดงริมแม่น้ำ', 'Malbork, the great red-brick castle', ['malbork castle', 'ปราสาทมัลบอร์ก', 'zamek w malborku', 'red brick castle', 'ปราสาทอิฐแดง', 'biggest brick castle', 'ปราสาทอิฐใหญ่ที่สุด', 'nogat river', 'แม่น้ำโนกัต', 'day trip from gdańsk'], 'หาปราสาทอิฐแดงที่ยาวเรียงตามริมแม่น้ำ', 'Find the long red-brick castle stretching along the riverbank',
    // a huge castle of red brick stretching along a river: steep dark roofs, a tall square tower with a pointed cap, stepped gables, many arched windows, its reflection rippling in the water
    sky('#FFF3E0') + P('M-4 190h248v54H-4z', '#4FC3F7', 3) + '<g opacity=".35">' + R(10, 190, 220, 30, '#C0573E', 0, 0) + '</g>' + Lc('M30 214h50M150 226h60', '#E1F5FE', 3)
      + R(10, 110, 220, 80, '#C0573E', 0, 3) + bricks(10, 110, 220, 80, '#8D3B2B') + P('M6 110l14-26h200l14 26z', '#5D4037', 3)
      + [[30, 84], [190, 84]].map(([x, y]) => P(`M${x - 18} ${y}v-14h6v-10h6v-10h12v10h6v10h6v14z`, '#C0573E', 3)).join('')
      + R(102, 30, 36, 80, '#C0573E', 0, 3) + bricks(102, 30, 36, 80, '#8D3B2B') + P('M98 30l22-26 22 26z', '#5D4037', 3) + R(112, 46, 16, 20, '#3E2723', 8, 2)
      + Array.from({ length: 10 }, (_, k) => P(`M${20 + k * 21} 160v-20c0-8 12-8 12 0v20z`, '#FFE0B2', 2)).join('') + P('M-4 186h248v6H-4z', '#7CB342', 2.5) + face(120, 132, 0.35)),
  L('pl/krakow/landmark-maczuga.v1.svg', 'แท่งหินกระบองเฮอร์คิวลีสที่โอยตุฟ', 'The Club of Hercules rock in Ojców', ['club of hercules', 'กระบองเฮอร์คิวลีส', 'maczuga herkulesa', 'ojców national park', 'อุทยานโอยตุฟ', 'limestone pillar', 'เสาหินปูน', 'pieskowa skała', 'castle on the rock', 'day trip from krakow'], 'หาแท่งหินที่ใหญ่ข้างบนแต่เล็กข้างล่างเหมือนกระบอง', 'Find the rock pillar that is fat at the top and thin at the bottom like a club',
    // a tall white limestone pillar shaped like a giant club, thin at its base and bulging at the top, standing in a green valley among beech trees, a little castle with a tower on the cliff behind
    sky('#E1F5FE') + P('M140 110c0-30 20-50 50-50s58 20 58 50v20h-108z', '#D7CCC8', 3) + R(176, 40, 22, 40, '#FFF8E1', 0, 2.5) + P('M172 40l15-16 15 16z', '#E64A19', 2.5) + R(150, 66, 40, 24, '#FFF8E1', 0, 2.5)
      + P('M-4 244V150c80-20 160-20 248 0v94z', '#7CB342', 3) + [[20, 170], [212, 176], [176, 196]].map(([x, y]) => tree(x, y, 1.4, '#689F38')).join('')
      + P('M100 214c2-26 0-50-8-80-12-30-14-70 16-90 30-12 56 6 54 40-2 30-16 54-24 80-6 20-4 36-2 50z', '#CBBFA8', 3) + Lc('M104 64c8 8 10 22 4 34M146 70c-4 16-10 28-14 36M114 150c4 14 4 30 2 44M98 110c6 4 12 4 18 0', '#9E937E', 3)
      + [[96, 44], [116, 34], [140, 40], [156, 56]].map(([x, y]) => C(x, y, 9, '#7CB342', 2.5)).join('') + g(128, 30, 1, Lc('M0 0v-12', '#6D4C41', 3) + C(0, -18, 9, '#558B2F', 2.5))
      + kid(66, 224, '#FFCA28') + face(124, 80, 0.4)),

  // ---------- Slovakia
  F('sk', 'food', 'lokse', 'ลกเช แผ่นแป้งมันฝรั่งม้วนไส้ป๊อปปี้', 'Lokše, rolled potato flatbreads', ['lokse', 'lokše', 'ลกเช', 'potato flatbread', 'แผ่นแป้งมันฝรั่ง', 'poppy seed filling', 'ไส้เมล็ดป๊อปปี้', 'rolled pancake', 'แป้งม้วน', 'slovak food'],
    // three thin speckled potato flatbreads rolled up on a plate, the ends showing a dark poppy-seed spiral, one unrolled flat beside them, a little pot of plum jam
    E(120, 170, 100, 34, '#FFFFFF') + E(120, 168, 86, 26, '#ECEFF1', 2) + P('M40 156c20-14 60-16 80-8l-6 30c-26 4-52 0-72-8z', '#FFE0B2', 2.5) + [[56, 160], [72, 166], [92, 158]].map(([x, y]) => C(x, y, 2.5, '#D7A86E', 0)).join('')
      + [[110, 150], [140, 160], [170, 150]].map(([x, y]) => g(x, y, 1, R(-14, -40, 28, 50, '#FFE0B2', 12) + Lc('M-8-30v36M8-30v36', '#F0C995', 2) + C(0, -40, 14, '#FFE0B2', 2.5) + P('M0-40c0-4 6-4 6 0s-10 8-12 0 10-14 18-6', 'none', 3) + Lc('M0-40c0-4 6-4 6 0s-10 8-12 0 10-14 18-6', '#37474F', 2.5) + C(-4, -10, 2, '#D7A86E', 0))).join('')
      + P('M188 120h30v24c0 6-30 6-30 0z', '#FFFFFF', 2.5) + E(203, 120, 15, 4, '#6A1B9A', 2) + face(140, 136, 0.3)),
  F('sk', 'food', 'korbaciky', 'โคร์บาชีกี ชีสเส้นถักเปีย', 'Korbáčiky, braided string cheese', ['korbaciky', 'korbáčiky', 'โคร์บาชีกี', 'string cheese', 'ชีสเส้น', 'braided cheese', 'ชีสถักเปีย', 'smoked cheese', 'oravský korbáčik', 'slovak cheese'],
    // a bundle of long thin strings of cheese braided like little whips, some pale cream and some smoked golden-brown, tied together at one end with a knot, on a wooden board
    R(20, 170, 200, 30, '#A1673F', 8) + Lc('M30 186h180', '#8D5524', 2)
      + [[124, '#FFF3C4'], [140, '#D99A4E'], [156, '#FFF3C4'], [172, '#D99A4E']].map(([y, c], j) => Array.from({ length: 10 }, (_, k) => g(72 + k * 14, y - 4 - k * 3, 1, E(0, 0, 10, 5, c, 2.5), k % 2 ? 35 : -35)).join('')).join('')
      + Lc('M200 118c10 2 16 10 14 20M200 132c10 4 14 14 10 22', '#E8D7A0', 3)
      + C(62, 140, 18, '#D99A4E', 3) + P('M52 128c6 8 14 8 20 0', 'none', 2.5) + face(62, 142, 0.32)),
  F('sk', 'transport', 'forestrail', 'รถไฟป่าเชียร์นีฮรอนสายเล็ก', 'The little Čierny Hron forest railway', ['čierny hron railway', 'cierny hron', 'รถไฟป่าเชียร์นีฮรอน', 'forest railway', 'รถไฟป่า', 'narrow gauge', 'รางแคบ', 'steam engine', 'หัวรถจักรไอน้ำ', 'čiernohronská železnica'],
    // a tiny green steam engine with a tall funnel puffing white smoke, pulling an open wooden carriage of waving children and a wagon of logs along a narrow track through a fir forest
    [[24, 120], [70, 112], [176, 110], [222, 118]].map(([x, y]) => fir(x, y, 1.8)).join('') + P('M10 196h220', 'none', 0) + Lc('M10 200h220', '#6D4C41', 4) + Array.from({ length: 11 }, (_, k) => Lc(`M${16 + k * 20} 194v12`, '#8D6E63', 4)).join('')
      + R(150, 146, 70, 40, '#2E7D32', 4) + R(190, 120, 30, 28, '#2E7D32', 3) + R(194, 126, 22, 14, '#E1F5FE', 2, 2) + R(186, 114, 38, 8, '#212121', 2) + R(158, 118, 14, 28, '#212121', 2) + R(154, 112, 22, 8, '#212121', 2) + C(146, 170, 8, '#FFC107', 2.5)
      + [[160, 98, 10], [146, 80, 14], [124, 66, 16]].map(([x, y, r]) => C(x, y, r, '#FFFFFF', 2.5)).join('') + [166, 206].map((x) => C(x, 192, 10, '#E53935', 3)).join('') + face(204, 166, 0.3)
      + R(76, 156, 66, 30, '#A1673F', 3) + Lc('M76 142v14M142 142v14M72 142h74', '#5D4037', 3) + kid(96, 162, '#FFCA28', 0.8) + kid(122, 162, '#1E88E5', 0.8) + [90, 128].map((x) => C(x, 192, 9, '#455A64', 3)).join('')
      + R(14, 170, 56, 16, '#5D4037', 2) + [[22, 160], [40, 160], [58, 160], [30, 148], [50, 148]].map(([x, y]) => C(x, y, 9, '#D7A86E', 2.5) + C(x, y, 3, '#A1673F', 0)).join('') + [26, 58].map((x) => C(x, 192, 8, '#455A64', 3)).join('')),
  F('sk', 'culture', 'supolie', 'ตุ๊กตาใบข้าวโพดชูโปลีเย', 'Šúpolie corn-husk dolls', ['šúpolie', 'supolie', 'ชูโปลีเย', 'corn husk dolls', 'ตุ๊กตาใบข้าวโพด', 'folk craft', 'งานฝีมือพื้นบ้าน', 'straw dolls', 'ตุ๊กตาฟาง', 'slovak handicraft'],
    // two dolls folded from pale golden corn husks: a girl with a wide pleated skirt and a headscarf holding a little basket, and a boy with a hat, both with gentle smiles
    E(120, 216, 90, 10, '#EFEBE9')
      + g(80, 214, 1, P('M-34 0c4-40 14-70 34-74 20 4 30 34 34 74z', '#F3DEB0') + Array.from({ length: 6 }, (_, k) => Lc(`M${-22 + k * 9} -4c0-20 2-40 ${(k - 2.5) * 2}-60`, '#D9BC80', 2)).join('') + C(0, -88, 15, '#F3DEB0') + P('M-17-90c0-20 34-20 34 0-4 10-8 16-17 18-9-2-13-8-17-18z', '#E9CF96') + Lc('M-14-60l-18 20M14-60l18 18', '#E9CF96', 7) + P('M24-44h16l-2 14h-12z', '#C68642', 2) + face(0, -84, 0.3))
      + g(160, 214, 1, P('M-20 0l4-46h32l4 46z', '#E9CF96') + Lc('M-6 0v-40M6 0v-40', '#D9BC80', 2) + R(-22, -76, 44, 32, '#F3DEB0', 8) + C(0, -92, 15, '#F3DEB0') + E(0, -104, 22, 5, '#D9BC80') + P('M-12-104c0-14 24-14 24 0z', '#D9BC80') + Lc('M-20-66l-10 22M20-66l10 22', '#E9CF96', 7) + face(0, -90, 0.3))),

  // ---------- Bratislava and the High Tatras (with Spiš, Slovak Paradise and Bojnice)
  L('sk/bratislava/landmark-bluechurch.v1.svg', 'โบสถ์สีฟ้าแห่งบราติสลาวา', 'The Blue Church of Bratislava', ['blue church', 'โบสถ์สีฟ้า', 'modrý kostolík', 'modry kostolik', 'church of st elizabeth', 'โบสถ์เซนต์เอลิซาเบธ', 'art nouveau', 'อาร์ตนูโว', 'blue tiles', 'กระเบื้องสีฟ้า'], 'หาโบสถ์ทาสีฟ้าทั้งหลังเหมือนเค้กครีม', 'Find the church painted all over in sky blue like an iced cake',
    // a small round-edged church painted pale sky blue with darker blue glazed roof tiles, a round bell tower with a little blue dome, wavy ornaments like icing, an arched door
    sky('#FFF8E1') + P('M-4 210h248v34H-4z', '#BDBDBD', 3)
      + R(40, 110, 120, 100, '#90CAF9', 6, 3) + P('M34 110c10-30 122-30 132 0z', '#1E88E5', 3) + Lc('M40 128c10 8 20 8 30 0s20 8 30 0 20 8 30 0 20 8 30 0', '#FFFFFF', 3)
      + P('M80 210v-50c0-24 40-24 40 0v50z', '#1565C0', 3) + C(100, 172, 4, '#FFC107', 2) + P('M50 180v-30c0-8 12-8 12 0v30zM138 180v-30c0-8 12-8 12 0v30z', '#E3F2FD', 2)
      + R(160, 70, 44, 140, '#90CAF9', 10, 3) + P('M156 70c0-34 52-34 52 0z', '#1E88E5', 3) + C(182, 30, 5, '#FFC107', 2) + Lc('M182 35v-12', INK, 2)
      + R(172, 90, 20, 26, '#E3F2FD', 10, 2) + Lc('M160 130c8 6 14 6 22 0s14 6 22 0', '#FFFFFF', 3) + Array.from({ length: 5 }, (_, k) => C(170 + (k % 2) * 24, 150 + k * 10, 3, '#FFFFFF', 0)).join('') + face(100, 140, 0.35)),
  L('sk/bratislava/landmark-devin.v1.svg', 'ซากปราสาทเดวีนบนผาเหนือแม่น้ำสองสาย', 'Devín Castle ruins above two rivers', ['devín castle', 'devin castle', 'ปราสาทเดวีน', 'castle ruins', 'ซากปราสาท', 'maiden tower', 'หอคอยหญิงสาว', 'danube and morava', 'แม่น้ำดานูบกับโมราวา', 'river meeting'], 'หาหอคอยเล็กที่ตั้งอยู่บนยอดแท่งหินแยกจากปราสาท', 'Find the little tower standing all alone on its own rock pillar',
    // the broken stone walls of a castle ruin on a high rocky crag where two rivers meet, a tiny tower perched on a separate thin rock pillar in front, green hills around
    sky('#E1F5FE') + P('M-4 160c40-10 80 10 120 0s80-6 128 6v78H-4z', '#4FC3F7', 3) + Lc('M120 170c20 20 40 40 50 74', '#81D4FA', 8) + Lc('M30 200h50M180 214h40', '#E1F5FE', 3)
      + P('M90 170c0-40 10-80 40-100s70-10 90 20 20 60 24 80z', '#A1887F', 3) + Lc('M120 120l14 6M160 100l10 16M190 140l14-6', '#8D6E63', 3)
      + P('M126 76V44h12v10h10V40h14v14h8v-8h12v30z', '#D7CCC8', 3) + R(140, 60, 8, 10, '#5D4037', 2, 1.5) + R(164, 60, 8, 10, '#5D4037', 2, 1.5) + Lc('M184 76v-14h10v16', INK, 3)
      + P('M60 170c2-30-4-50 0-74h22c4 24-2 44 0 74z', '#A1887F', 3) + R(60, 66, 22, 30, '#ECEFF1', 0, 3) + P('M58 66l13-14 13 14z', '#D7CCC8', 2.5) + R(68, 74, 6, 10, '#5D4037', 2, 1.5)
      + P('M-4 120c20-10 60-10 70 10v40H-4z', '#7CB342', 3) + face(160, 104, 0.3)),
  L('sk/bratislava/landmark-spis.v1.svg', 'ซากปราสาทสปิชสีขาวบนเนินเขา', 'Spiš Castle, the great white ruin on the hill', ['spiš castle', 'spis castle', 'ปราสาทสปิช', 'spišský hrad', 'castle ruins', 'ซากปราสาท', 'unesco', 'white walls', 'กำแพงสีขาว', 'eastern slovakia'], 'หาหอคอยกลมที่ยืนสูงอยู่บนยอดสุดของซากปราสาท', 'Find the round tower standing at the very top of the ruins',
    // huge pale ruins spreading over the top of a long bare green hill: rings of white walls stepping down the slope, a tall round tower on the summit, golden fields below
    sky('#E3F2FD') + P('M-4 244V150c40-60 100-110 150-110s70 40 98 80v124z', '#9CCC65', 3) + P('M-4 200c60-10 120-6 248 10v34H-4z', '#FFD54F', 3) + Lc('M20 222c30-4 60-2 80 0M140 226c30 0 60 0 90 4', '#FFB300', 3)
      + P('M30 160V136h20v8h12v-8h20v10l30-6V110h18v10h10V96h40v30l20 6v20l20 8', '#ECEFF1', 3) + P('M30 160h174', 'none', 3)
      + P('M30 160V136h20v8h12v-8h20v10l30-6V110h18v10h10V96h40v30l20 6v20l20 8v12H30z', '#ECEFF1', 3)
      + Array.from({ length: 6 }, (_, k) => R(40 + k * 26, 140 + (k % 2) * 4, 5, 10, '#78909C', 1, 1.5)).join('')
      + R(130, 40, 26, 60, '#F5F5F5', 4, 3) + Lc('M130 48h26M136 40v-6h6v6M144 40v-6h6v6', INK, 2.5) + R(138, 60, 10, 14, '#78909C', 4, 1.5) + face(143, 86, 0.2)),
  L('sk/bratislava/landmark-slovakparadise.v1.svg', 'บันไดเหล็กปีนหุบผาในสโลวักพาราไดซ์', 'The ladders through the gorges of Slovak Paradise', ['slovak paradise', 'สโลวักพาราไดซ์', 'slovenský raj', 'slovensky raj', 'gorge ladders', 'บันไดเหล็กในหุบผา', 'suchá belá', 'chain steps', 'บันไดโซ่', 'hiking'], 'หาบันไดเหล็กที่พาดขึ้นไปตามหน้าผาเหนือลำธาร', 'Find the metal ladder climbing up the rock beside the stream',
    // a narrow green-walled rocky gorge with a little stream at the bottom, a tall metal ladder against the rock, metal step plates bolted along the wall with a chain, a child in a helmet climbing
    sky('#E8F5E9') + P('M-4-4h100c-10 40 0 80-10 130s-6 90 0 118H-4z', '#78909C', 3) + P('M244-4H150c10 50 0 90 6 130s-6 80 0 118h88z', '#90A4AE', 3)
      + [[30, 40], [10, 110], [200, 60], [226, 150]].map(([x, y]) => P(`M${x - 10} ${y}c4-12 16-12 20 0z`, '#558B2F', 2)).join('')
      + P('M86 244c10-20 20-30 34-30s30 10 36 30z', '#4FC3F7', 3) + Lc('M100 236c8-4 20-4 30 0', '#E1F5FE', 3)
      + Lc('M110 220L130 40M136 220L156 40', '#B0BEC5', 5) + Array.from({ length: 11 }, (_, k) => Lc(`M${110 + k * 1.8 * 10 / 10 + 0} ${210 - k * 17}h26`, '#B0BEC5', 4)).join('')
      + [[82, 120], [74, 100], [70, 80]].map(([x, y]) => R(x - 12, y, 18, 5, '#B0BEC5', 1, 2)).join('') + Lc('M60 130c4-20 8-30 10-50', '#78909C', 2)
      + g(140, 130, 1, C(0, -20, 8, '#FFE0BD', 2) + P('M-9-22c0-10 18-10 18 0z', '#FFC107', 2) + P('M-8 4v-16h16v16z', '#E53935', 2) + Lc('M-8-8l-6-6M8-8l6-8', '#FFE0BD', 3) + face(0, -18, 0.22))),
  L('sk/bratislava/landmark-porter.v1.svg', 'คนแบกของขึ้นกระท่อมบนเทือกเขาตาตรา', 'A Tatra hut porter with his tall load', ['tatra porter', 'คนแบกของตาตรา', 'nosič', 'nosic', 'mountain hut', 'กระท่อมบนเขา', 'chata', 'téryho chata', 'carrying frame', 'โครงไม้แบกหลัง'], 'หาโครงไม้บนหลังที่วางของซ้อนสูงกว่าหัวคน', 'Find the wooden carrying frame stacked with boxes higher than the man\'s head',
    // a strong mountain porter walking up a rocky path with a wooden carrying frame on his back piled very high with boxes and crates, a stone mountain hut with a red roof at the top, jagged peaks
    sky('#E3F2FD') + P('M-4 100l40-50 30 30 40-60 40 50 30-30 68 50v20H-4z', '#B0BEC5', 3) + P('M106 20l-10 18 8-2 6 6 6-8z', '#FFFFFF', 0) + P('M-4 244V110c80-10 160-6 248 10v124z', '#A1887F', 3)
      + R(170, 70, 50, 34, '#9E9E9E', 0, 3) + P('M164 70l31-20 31 20z', '#E53935', 3) + R(188, 84, 12, 20, '#5D4037', 1, 2)
      + Lc('M40 244c30-30 60-50 90-70s40-40 70-70', '#D7CCC8', 14) + [[40, 160], [200, 200], [150, 140]].map(([x, y]) => E(x, y, 12, 7, '#8D8D7A', 2)).join('')
      + g(96, 200, 1, Lc('M-6 0l-4-30M8 0l2-30', '#455A64', 9) + P('M-12-30h24l-2-34h-20z', '#2E7D32') + C(0, -76, 11, '#FFE0BD') + P('M-11-80c0-10 22-10 22 0z', '#E53935')
        + R(-38, -118, 30, 84, '#A1673F', 2) + [['#FFCA28', -112], ['#90CAF9', -96], ['#EF9A9A', -80], ['#FFFFFF', -64], ['#C5E1A5', -50]].map(([c, y]) => R(-40, y, 34, 15, c, 2, 2.5)).join('') + R(-36, -140, 26, 22, '#FFE082', 2, 2.5)
        + Lc('M10-58l12 30', '#FFE0BD', 5) + Lc('M22-28v32', '#8D6E63', 3) + face(2, -74, 0.28))),
  L('sk/bratislava/landmark-bojnice.v1.svg', 'ปราสาทบอยนิตเซเหมือนในเทพนิยาย', 'Bojnice, the fairytale castle', ['bojnice castle', 'ปราสาทบอยนิตเซ', 'bojnický zámok', 'fairytale castle', 'ปราสาทเทพนิยาย', 'pointed spires', 'ยอดแหลมหลายยอด', 'ghost festival', 'castle moat', 'central slovakia'], 'หายอดหลังคาแหลมสีเขียวหลายยอดที่เหมือนปราสาทในนิทาน', 'Find all the pointy green roofs that look like a castle from a storybook',
    // a cream-coloured romantic castle on a wooded hill crowded with pointed turrets and steep dark-green roofs of different heights, a tall slim tower in the middle, a moat bridge in front
    sky('#FFF3E0') + P('M-4 244V180c60-30 180-30 248 0v64z', '#558B2F', 3) + [[20, 200], [220, 200]].map(([x, y]) => tree(x, y, 1.4, '#33691E')).join('')
      + R(40, 110, 160, 80, '#FFF8E1', 0, 3) + wins(50, 124, 8, 19, 9, 14, '#90A4AE') + wins(50, 152, 8, 19, 9, 14, '#90A4AE')
      + [[40, 90, 26, 40], [70, 100, 22, 30], [148, 96, 24, 34], [176, 88, 26, 42]].map(([x, y, w, h]) => R(x, y, w, 110 - y + 80, '#FFF8E1', 0, 3) + P(`M${x - 4} ${y}l${w / 2 + 4}-${h} ${w / 2 + 4} ${h}z`, '#2E7D32', 3) + R(x + w / 2 - 3, y + 8, 6, 10, '#90A4AE', 2, 1.5)).join('')
      + R(108, 60, 24, 130, '#FFF8E1', 0, 3) + P('M104 60l16-50 16 50z', '#2E7D32', 3) + R(115, 72, 10, 14, '#90A4AE', 4, 1.5) + Lc('M120 10V0', INK, 3)
      + P('M106 190v-24c0-14 28-14 28 0v24z', '#6D4C41', 3) + P('M100 190h40l8 30H92z', '#BCAAA4', 3)
      + face(120, 102, 0.25)),

  // ---------- Slovenia
  F('si', 'food', 'potica', 'โปตีตซา เค้กม้วนวอลนัต', 'Potica, the walnut swirl cake', ['potica', 'โปตีตซา', 'nut roll', 'เค้กม้วนวอลนัต', 'walnut cake', 'เค้กวอลนัต', 'swirl bread', 'ขนมปังลายก้นหอย', 'slovenian holiday cake', 'tarragon potica'],
    // a ring-shaped golden cake baked in a fluted tin with a slice cut out and lying in front showing its tight brown walnut spiral, walnuts beside it
    E(120, 196, 104, 18, '#FFFFFF') + P('M30 150c0-60 180-60 180 0v20c0 20-40 30-90 30s-90-10-90-30z', '#E0A040') + Array.from({ length: 9 }, (_, k) => Lc(`M${40 + k * 20} 128c${(k - 4) * 1} 20 ${(k - 4) * 2} 40 ${(k - 4) * 2} 60`, '#C17F2A', 2)).join('') + E(120, 118, 26, 9, '#FFF8E1', 2.5)
      + P('M44 160c10-6 30-8 40 0', 'none', 0) + g(150, 186, 1, R(-30, -26, 60, 44, '#FFE0B2', 8) + P('M-2-4c0-6 8-6 8 0s-12 10-16 0 12-18 24-8-6 26-28 20-26-12', 'none', 3) + Lc('M-2-4c0-6 8-6 8 0s-12 10-16 0 12-18 24-8-6 26-28 20-26-12', '#6D4C41', 4) + face(0, 10, 0.25, 'none'))
      + [[46, 196], [70, 204]].map(([x, y]) => C(x, y, 11, '#C68642', 2.5) + Lc(`M${x} ${y - 10}v20M${x - 8} ${y - 4}c4 4 4 8 0 12M${x + 8} ${y - 4}c-4 4-4 8 0 12`, '#8D5524', 1.5)).join('') + face(120, 156, 0.4)),
  F('si', 'culture', 'kurent', 'คูเรนต์ ตัวขนฟูประจำงานคาร์นิวัลพทุย', 'A Kurent, the shaggy carnival creature of Ptuj', ['kurent', 'คูเรนต์', 'kurentovanje', 'ptuj carnival', 'คาร์นิวัลพทุย', 'shaggy costume', 'ชุดขนแกะฟู', 'cowbells', 'กระดิ่งวัว', 'chasing winter away'],
    // a round shaggy creature costume of white sheepskin from head to knees, a friendly mask with a long red tongue, little horns with coloured ribbons, five big cowbells on a belt, red socks
    Lc('M96 214v-20M144 214v-20', '#E53935', 10) + E(120, 214, 40, 6, '#212121', 0)
      + P('M60 196c-10-40-4-110 20-140 14-16 66-16 80 0 24 30 30 100 20 140-20 10-100 10-120 0z', '#F5F5F5')
      + Array.from({ length: 16 }, (_, k) => P(`M${66 + (k % 8) * 15} ${88 + Math.floor(k / 8) * 60}c-6 10-6 20 0 30`, 'none', 2.5)).join('')
      + R(62, 150, 116, 8, '#5D4037', 2) + [72, 94, 116, 138, 160].map((x) => P(`M${x} 156h16l4 22h-24z`, '#FFC107', 2.5)).join('')
      + P('M92 80c0-22 56-22 56 0v14c0 10-10 16-28 16s-28-6-28-16z', '#8D6E63') + R(104, 76, 10, 6, '#FFFFFF', 3, 1.5) + R(126, 76, 10, 6, '#FFFFFF', 3, 1.5) + C(109, 79, 2, INK, 0) + C(131, 79, 2, INK, 0) + P('M114 94c0 14 4 24 6 30 2-6 6-16 6-30z', '#E53935', 2.5) + E(98, 90, 6, 3.5, '#FF8FA3', 0) + E(142, 90, 6, 3.5, '#FF8FA3', 0)
      + P('M94 64c-10-10-12-26-6-34 4 10 10 18 16 24zM146 64c10-10 12-26 6-34-4 10-10 18-16 24z', '#FFF8E1', 2.5)
      + [[88, 34, '#E53935'], [92, 26, '#1E88E5'], [152, 34, '#43A047'], [148, 26, '#FFCA28']].map(([x, y, c]) => Lc(`M${x} ${y}c${x < 120 ? -10 : 10} -4 ${x < 120 ? -16 : 16} 4 ${x < 120 ? -22 : 22} 0`, c, 4)).join('')),
  F('si', 'culture', 'lace', 'ลูกไม้กระสวยแห่งอีดรียา', 'Idrija bobbin lace', ['idrija lace', 'ลูกไม้อีดรียา', 'bobbin lace', 'ลูกไม้กระสวย', 'čipka', 'cipka', 'lace pillow', 'หมอนถักลูกไม้', 'wooden bobbins', 'แกนไม้กระสวย'],
    // a round lace pillow with pins, a white lace pattern of loops and flowers growing on it, many little wooden bobbins on threads fanned out at the bottom
    E(120, 200, 104, 14, '#EFEBE9') + C(120, 120, 86, '#4FC3F7') + C(120, 120, 86, 'none', 5)
      + C(120, 110, 48, '#FFFFFF', 2.5) + Array.from({ length: 10 }, (_, k) => g(120, 110, 1, P('M0-48c10-4 16 4 12 12-8 2-12-4-12-12z', '#FFFFFF', 2), k * 36)).join('') + C(120, 110, 20, '#B3E5FC', 2) + Array.from({ length: 6 }, (_, k) => g(120, 110, 1, P('M0-6c6-6 12-2 10 6-6 2-10 0-10-6z', '#FFFFFF', 1.5), k * 60)).join('')
      + Array.from({ length: 8 }, (_, k) => C(120 + Math.cos(k * 0.785) * 60, 110 + Math.sin(k * 0.785) * 60, 2, '#E53935', 0)).join('')
      + Array.from({ length: 8 }, (_, k) => Lc(`M${110 + k * 3} 158l${-56 + k * 16} 36`, '#FFFFFF', 1.5) + g(54 + k * 19, 196, 1, R(-4, 0, 8, 26, '#C68642', 4) + E(0, 4, 5, 6, '#A1673F', 2))).join('') + face(120, 108, 0.3)),
];

export default { places: {}, items };
