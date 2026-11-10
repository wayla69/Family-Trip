// Wave 9 (mixed group, part 2): Peru (Cusco, Machu Picchu, Titicaca and Lima), Brazil (Rio) and Argentina (Buenos Aires, Iguazú, Patagonia)
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (pe/cusco/landmark-humantay.v1.svg → pe-cusco.landmark.humantay)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport): pe/food-papas.v1.svg → pe.food.papas
const K = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const tree = (x, y, s, c) => g(x, y, s, R(-3, 0, 6, 16, '#795548', 0, 2) + C(0, -8, 14, c, 2.5));
const palm = (x, y, s) => g(x, y, s, Lc('M0 0c2-20 4-40 0-60', '#8D6E63', 6) + [[-30, -6], [-16, -24], [16, -24], [30, -6]].map(([dx, dy]) => P(`M0-60q${dx / 2} ${dy - 10} ${dx} ${dy}`, 'none', 3)).join('') + P('M0-60c-10-6-24-4-30 6M0-60c10-6 24-4 30 6M0-60c-4-10-16-16-24-14M0-60c4-10 16-16 24-14', 'none', 3));
const cactus = (x, y, s) => g(x, y, s, P('M-6 0v-44a6 6 0 0 1 12 0v44z', '#66BB6A', 2.5) + P('M-6-20h-8v-12a4 4 0 0 1 8 0zM6-26h8v-12a4 4 0 0 0-8 0z', '#66BB6A', 2));

const items = [
  // ---------- Peru
  K('pe', 'food', 'papas', 'มันฝรั่งพื้นเมืองหลากสีของเทือกเขาแอนดีส', 'Native Andean potatoes of every colour', ['native potatoes', 'มันฝรั่งพื้นเมือง', 'papas nativas', 'andean potatoes', 'มันฝรั่งแอนดีส', 'purple potato', 'มันฝรั่งม่วง', 'potato park', 'chuño', 'home of the potato'],
    // a woven basket spilling a heap of knobbly potatoes in purple, yellow, red, pink-speckled and blue-black, one round yellow potato in front smiling
    P('M40 120h160l-18 84H58z', '#C8A165', 3.5) + [0, 1, 2, 3].map((k) => Lc(`M${46 + k * 3} ${136 + k * 18}h${148 - k * 6}`, '#8D6E63', 3)).join('') + R(34, 112, 172, 14, '#A1673F', 7, 3)
      + [[66, 100, 22, 16, '#6A1B9A'], [104, 92, 20, 18, '#E53935'], [142, 96, 24, 16, '#FBC02D'], [180, 104, 18, 14, '#37474F'], [86, 76, 18, 14, '#EC407A'], [126, 70, 20, 14, '#8E24AA'], [162, 78, 16, 13, '#FF8A65']].map(([x, y, rx, ry, c]) => E(x, y, rx, ry, c, 3) + C(x - rx / 3, y - 2, 2, '#FFFFFF', 0) + C(x + rx / 3, y + 3, 2, INK, 0)).join('')
      + E(60, 214, 26, 20, '#FFD54F', 3.5) + E(196, 216, 22, 14, '#7B1FA2', 3) + [[188, 212], [200, 220], [204, 210]].map(([x, y]) => C(x, y, 2.5, '#F8BBD0', 0)).join('') + face(60, 210, 0.3)),
  K('pe', 'food', 'lomosaltado', 'โลโมซัลตาโด เนื้อผัดกับมันทอด', 'Lomo saltado, stir-fried beef with chips', ['lomo saltado', 'โลโมซัลตาโด', 'stir fried beef', 'เนื้อผัด', 'chifa', 'ชีฟา', 'chips and rice', 'มันทอดกับข้าว', 'wok flame', 'peruvian main'],
    // a flaming black wok tossing beef strips, red onion and tomato wedges up in the air, below a plate with a dome of white rice, golden chips and the stir-fry, green coriander on top
    g(170, 70, 1, P('M-46 0c0 30 92 30 92 0z', '#37474F', 3.5) + Lc('M46 0l30-10', '#5D4037', 6) + P('M-30 32c-8-16 4-18 0-30M0 36c-6-14 6-20 0-34M28 32c-6-14 4-18 0-30', '#FF7043', 3)
      + [[-24, -24, '#8D4A2B'], [4, -36, '#E53935'], [26, -20, '#8D4A2B'], [-6, -16, '#AB47BC']].map(([x, y, c]) => R(x, y, 18, 8, c, 3, 2)).join(''), -10)
      + E(110, 174, 104, 40, '#FFFFFF', 3.5) + P('M34 172c0-34 60-34 60 0z', '#FFFFFF', 3) + face(64, 160, 0.26)
      + [[104, 150, -20], [118, 146, 10], [132, 152, -6], [190, 162, 14], [178, 150, -24]].map(([x, y, r]) => g(x, y, 1, R(-4, -18, 8, 34, '#FFCA28', 2, 2.5), r)).join('')
      + [[120, 178, '#8D4A2B'], [146, 168, '#8D4A2B'], [160, 186, '#E53935'], [138, 190, '#AB47BC'], [176, 178, '#8D4A2B']].map(([x, y, c]) => R(x - 9, y - 4, 18, 8, c, 3, 2)).join('')
      + [[130, 166], [168, 192]].map(([x, y]) => P(`M${x} ${y}l6-6 3 7z`, '#43A047', 1.5)).join('')),
  K('pe', 'animal', 'cuy', 'หนูตะเภาขนฟูของเปรู', 'A fluffy Peruvian guinea pig', ['guinea pig', 'หนูตะเภา', 'cuy', 'กุย', 'cavy', 'peruvian guinea pig', 'andean pet', 'สัตว์เลี้ยงแอนดีส', 'fluffy rosettes', 'ขนฟู'],
    // a round fluffy guinea pig with swirly rosettes of ginger, white and brown fur, tiny round ears and pink feet, sitting on a little striped woven blanket nibbling a green leaf
    R(26, 176, 188, 36, '#E53935', 8, 3) + [186, 196].map((y) => Lc(`M30 ${y}h180`, y === 186 ? '#FFCA28' : '#1E88E5', 4)).join('')
      + E(120, 140, 82, 54, '#FFF3E0', 4) + P('M50 130c4-40 50-50 70-30-10 30-40 50-70 30z', '#E59A4E', 3) + P('M140 104c30-10 60 10 58 40-20 6-50-10-58-40z', '#8D5A3B', 3)
      + [[80, 116], [160, 128], [110, 172]].map(([x, y]) => Lc(`M${x} ${y}c6-8 14 0 8 6s-10 0-6-4`, '#B0794A', 2.5)).join('')
      + E(70, 98, 12, 9, '#F8BBD0', 3) + E(162, 92, 12, 9, '#F8BBD0', 3) + E(120, 140, 8, 6, '#F48FB1', 2.5) + face(120, 122, 0.5, 'w')
      + [[80, 190], [160, 190]].map(([x, y]) => E(x, y, 10, 6, '#F8BBD0', 2.5)).join('') + g(120, 164, 1, P('M0 0c-14-10-10-24 4-24 10 6 8 18-4 24z', '#66BB6A', 2.5))),
  K('pe', 'culture', 'cajon', 'คาฮอน กลองกล่องของเปรู', 'The cajón, Peru\'s box drum', ['cajón', 'cajon', 'คาฮอน', 'box drum', 'กลองกล่อง', 'afro-peruvian', 'แอฟโฟร-เปรู', 'música criolla', 'percussion', 'เครื่องเคาะจังหวะ'],
    // a child sitting on top of a tall wooden box drum leaning back, slapping its dark front panel with both hands, a round sound hole on the side, sound lines bouncing out
    R(-4, 214, 248, 26, '#D7CCC8', 0, 0) + P('M70 100h100v116H70z', '#C68B59', 3.5) + P('M70 100l12-12h100l-12 12zM170 100l12-12v116l-12 12z', '#A1673F', 3)
      + R(80, 110, 80, 96, '#5D4037', 2, 3) + E(176, 150, 4, 12, INK, 0) + [[86, 116], [154, 116], [86, 198], [154, 198]].map(([x, y]) => C(x, y, 2.5, '#FFCA28', 0)).join('') + face(120, 164, 0.4)
      + g(120, 88, 1, C(0, -30, 14, '#FFE0BD', 2.5) + P('M-14-38c2-12 26-12 28 0-8-4-20-4-28 0z', '#4E342E', 2) + P('M-14 0v-18h28v18z', '#FF7043', 2.5) + face(0, -30, 0.3, 'o'))
      + Lc('M108 76l-20 40M132 76l20 40', '#FFE0BD', 7) + Lc('M108 76l-20 40M132 76l20 40', INK, 1.5)
      + Lc('M44 130c-8 10-8 22 0 32M30 122c-12 16-12 32 0 48M196 130c8 10 8 22 0 32M210 122c12 16 12 32 0 48', INK, 3)),

  // ---------- Cusco, Machu Picchu, Titicaca and Lima
  L('pe/cusco/landmark-humantay.v1.svg', 'ทะเลสาบฮูมันไตสีฟ้าคราม', 'Humantay, the turquoise lake under the snow peak', ['humantay lake', 'ทะเลสาบฮูมันไต', 'laguna humantay', 'turquoise lake', 'ทะเลสาบสีฟ้าคราม', 'salkantay', 'ซัลกันไต', 'mountain lake', 'stone cairns', 'กองหิน'],
    'หาทะเลสาบสีฟ้าครามใต้ยอดเขาหิมะ', 'Find the turquoise lake under the snowy peak',
    // a bright turquoise lake in a bowl of grey stony slopes under a tall white snow-capped peak, little piles of balanced stones on the shore, a hiker with a walking stick
    R(-4, -4, 248, 248, '#E3F2FD', 0, 0) + P('M10 140L120 20l110 120z', '#90A4AE', 3.5) + P('M64 90L120 20l56 70c-12-8-20 6-30-2s-18 8-28 0-18 8-28 0-10 0-14 2z', '#FFFFFF', 3)
      + P('M-4 120c40 0 60 20 80 20h88c20 0 40-20 80-20v124H-4z', '#A1887F', 3) + E(120, 168, 82, 30, '#26C6DA', 3.5) + E(120, 162, 60, 16, '#4DD0E1', 0)
      + [[30, 214], [204, 210]].map(([x, y]) => E(x, y, 14, 7, '#BDBDBD', 2.5) + E(x, y - 11, 10, 5, '#CFD8DC', 2.5) + E(x, y - 20, 6, 4, '#E0E0E0', 2)).join('')
      + kid(76, 226, '#E53935') + Lc('M88 206l6 22', '#8D6E63', 3) + face(120, 172, 0.3)),
  L('pe/cusco/landmark-qorikancha.v1.svg', 'กำแพงหินโค้งแห่งกอริกันชา', 'The curved Inca wall of Qorikancha', ['qorikancha', 'koricancha', 'กอริกันชา', 'temple of the sun', 'วิหารพระอาทิตย์', 'santo domingo', 'curved inca wall', 'กำแพงโค้งอินคา', 'golden enclosure', 'inca stonework'],
    'หากำแพงหินโค้งที่มีตึกขาวตั้งอยู่ข้างบน', 'Find the curved stone wall with a white building sitting on top',
    // a perfectly fitted curved wall of grey Inca stones bending round like a ship's bow, a white colonial building with a bell tower and red roof standing on top of it, a green lawn in front
    R(-4, 196, 248, 44, '#8BC34A', 0, 0) + R(110, 30, 36, 60, '#FFFFFF', 0, 3) + P('M106 30l22-18 22 18z', '#C0503A', 3) + P('M120 70v-16a8 8 0 0 1 16 0v16z', '#5D4037', 2)
      + R(40, 66, 170, 50, '#FFFFFF', 0, 3.5) + P('M34 66l20-14h140l22 14z', '#C0503A', 3) + [64, 92, 168, 190].map((x) => R(x, 80, 10, 16, '#90A4AE', 1, 2)).join('')
      + P('M24 196c0-50 10-70 30-80h160c-8 20-8 60 0 80z', '#B0BEC5', 3.5)
      + [[44, 126, 40], [86, 126, 50], [138, 126, 72], [34, 150, 52], [88, 150, 64], [154, 150, 54], [30, 174, 62], [94, 174, 70], [166, 174, 44]].map(([x, y, w]) => R(x, y, w - 4, 22, '#CFD8DC', 6, 2.5)).join('')
      + face(130, 160, 0.3)),
  L('pe/cusco/landmark-vistadome.v1.svg', 'รถไฟหลังคากระจกไปมาชูปิกชู', 'The glass-roofed train to Machu Picchu', ['machu picchu train', 'รถไฟไปมาชูปิกชู', 'vistadome', 'วิสตาโดม', 'glass roof train', 'รถไฟหลังคากระจก', 'urubamba river', 'แม่น้ำอูรูบัมบา', 'ollantaytambo station', 'sacred valley train'],
    'หารถไฟสีฟ้าที่มีหลังคาเป็นกระจกมองเห็นภูเขา', 'Find the blue train with a glass roof for looking up at the mountains',
    // a blue and yellow train with glass windows curving up over its roof running beside a rushing river in a green valley, steep green mountains and a snowy peak above
    R(-4, -4, 248, 248, '#E3F2FD', 0, 0) + P('M-4 120l40-80 30 50 30-60 40 70 40-40 68 60z', '#558B2F', 3) + P('M114 30l16 30-12-4-8 8-6-10z', '#FFFFFF', 2.5)
      + R(-4, 120, 248, 60, '#9CCC65', 0, 0) + P('M-4 196c60-10 180-10 248 0v48H-4z', '#4FC3F7', 3) + Lc('M20 214c20-6 30 6 50 0M140 220c20-6 30 6 50 0', '#FFFFFF', 3)
      + Lc('M-4 182h248', '#6D4C41', 4)
      + P('M14 176v-46c0-16 10-22 24-22h170c12 0 22 6 22 18v50z', '#1565C0', 3.5) + P('M38 108c4-14 14-18 26-18h134c14 0 20 6 22 18z', '#B3E5FC', 3)
      + [70, 110, 150, 190].map((x) => Lc(`M${x} 90v18`, '#1565C0', 3)).join('') + [46, 86, 126, 166].map((x) => R(x, 120, 30, 22, '#B3E5FC', 3, 2.5)).join('')
      + Lc('M14 152h216', '#FFCA28', 6) + [50, 90, 170, 210].map((x) => C(x, 178, 8, '#37474F', 2.5)).join('') + face(30, 130, 0.26)),
  L('pe/cusco/landmark-yavari.v1.svg', 'เรือกลไฟยาวารีบนทะเลสาบติติกากา', 'The Yavari, the old steamship on Lake Titicaca', ['yavari', 'ยาวารี', 'steamship', 'เรือกลไฟ', 'puno bay', 'อ่าวปูโน', 'iron ship', 'เรือเหล็ก', 'carried by mules', 'oldest ship on titicaca'],
    'หาเรือเหล็กสีดำที่เคยถูกล่อแบกขึ้นภูเขาทีละชิ้น', 'Find the black iron ship that mules once carried up the mountains in pieces',
    // a little black iron steamship with a red underside, a white cabin and one tall funnel puffing smoke on the blue lake, green reeds in front, and a small mule carrying a crate on the shore
    R(-4, -4, 248, 248, '#E1F5FE', 0, 0) + P('M-4 90c40-16 70-10 100-2s70-14 148 2v40H-4z', '#A1887F', 3) + R(-4, 126, 248, 120, '#1E88E5', 0, 0)
      + P('M30 136h180l-16 34H44z', '#263238', 3.5) + P('M38 158h164l-8 12H46z', '#C62828', 0) + [70, 100, 130, 160].map((x) => C(x, 148, 5, '#FFF59D', 2)).join('')
      + R(70, 104, 90, 32, '#FFFFFF', 3, 3) + [80, 100, 120, 140].map((x) => R(x, 112, 12, 12, '#4FC3F7', 2, 2)).join('') + R(100, 64, 16, 40, '#FFCA28', 2, 3) + R(98, 60, 20, 8, '#263238', 2, 2.5)
      + Lc('M108 56c-10-12 10-18 0-32M118 50c-6-10 6-16 0-28', '#CFD8DC', 6) + Lc('M40 136V98l20 38M200 136V100', INK, 2.5)
      + [20, 32, 44, 196, 208, 220].map((x) => Lc(`M${x} 236c0-20 4-30 ${x % 2 ? 6 : -6}-44`, '#7CB342', 4)).join('')
      + g(200, 84, 0.8, E(0, 0, 20, 12, '#8D6E63', 2.5) + C(22, -10, 8, '#8D6E63', 2.5) + P('M26-18l4-12M18-16l0-12', '#8D6E63', 2.5) + Lc('M-12 10v16M12 10v16', INK, 3) + R(-14, -24, 24, 14, '#D7A86E', 2, 2.5))
      + face(120, 150, 0.3)),
  L('pe/cusco/landmark-incatrail.v1.svg', 'บันไดหินบนเส้นทางอินคาเทรล', 'The stone stairs of the Inca Trail', ['inca trail', 'อินคาเทรล', 'camino inca', 'stone stairs', 'บันไดหิน', 'cloud forest', 'ป่าเมฆ', 'wiñay wayna', 'dead woman\'s pass', 'trekking'],
    'หาบันไดหินที่คดเคี้ยวขึ้นไปในหมอก', 'Find the stone stairs winding up into the clouds',
    // old stone steps zigzagging up a steep green slope into white mist, two little hikers with backpacks climbing, pink orchids and ferns beside the path
    R(-4, -4, 248, 248, '#E8F5E9', 0, 0) + P('M-4 60c40 20 80-20 120 0s80-30 128 0v184H-4z', '#66BB6A', 3)
      + P('M80 244l40-60-50-40 60-40-30-40 40-20', 'none', 0) + P('M60 244l40-56-46-40 56-44-26-38 40-22h22l-30 22 26 38-56 44 46 40-36 56z', '#BCAAA4', 3)
      + [[84, 224], [92, 206], [70, 160], [86, 150], [100, 118], [112, 104], [94, 74], [108, 64]].map(([x, y]) => Lc(`M${x - 14} ${y}h28`, '#8D6E63', 2.5)).join('')
      + P('M-4 40c30-16 60 6 90-6s60-16 90 0 50-4 68 0v-50H-4z', '#FFFFFF', 3)
      + g(96, 196, 1, kid(0, 0, '#FF7043') + R(6, -22, 10, 16, '#1E88E5', 3, 2)) + g(84, 112, 0.8, kid(0, 0, '#FFCA28') + R(6, -22, 10, 16, '#43A047', 3, 2))
      + [[180, 160], [196, 196], [30, 186]].map(([x, y]) => [0, 120, 240].map((r) => g(x, y, 1, E(0, -7, 5, 8, '#EC407A', 2), r)).join('') + C(x, y, 3, '#FFEB3B', 1.5)).join('')
      + [[160, 210], [40, 120]].map(([x, y]) => Lc(`M${x} ${y}c-4-20 4-30 14-36M${x + 4} ${y - 12}l-8-4M${x + 8} ${y - 22}l-8-4`, '#2E7D32', 3)).join('') + face(170, 120, 0.3, 'none')),

  // ---------- Brazil
  K('br', 'food', 'tapioca', 'ตาปิโอกาแผ่นพับไส้ชีสมะพร้าว', 'Tapioca, the folded cassava crêpe', ['tapioca', 'ตาปิโอกา', 'beiju', 'cassava crepe', 'แป้งมันสำปะหลัง', 'coconut and cheese', 'มะพร้าวกับชีส', 'nordeste breakfast', 'อาหารเช้าบราซิล', 'gluten free'],
    // a snow-white half-moon crêpe made from cassava starch on a hot black pan, folded over a filling of melting cheese and shredded coconut, a little pile of white starch and a sieve beside
    R(170, 134, 64, 14, '#5D4037', 6, 3) + C(110, 140, 82, '#37474F', 3.5) + C(110, 140, 68, '#455A64', 0)
      + P('M48 150a62 62 0 0 1 124 0z', '#FFFFFF', 3.5) + [[70, 142], [82, 130], [98, 138], [114, 128], [130, 140], [146, 132], [158, 144]].map(([x, y]) => C(x, y, 2, '#E0E0E0', 0)).join('')
      + P('M50 150h120c-6 10-20 14-30 10s-20 6-30 0-20 6-30 0-24 2-30-10z', '#FFE082', 3) + Lc('M66 158c4 6 2 10 0 14M140 160c4 6 2 10 0 14', '#FFD54F', 4)
      + E(50, 214, 30, 12, '#FFFFFF', 3) + P('M30 212c4-14 36-14 40 0z', '#FAFAFA', 2.5) + face(110, 128, 0.36)),
  K('br', 'food', 'quindim', 'กินจิง ขนมไข่แดงมะพร้าว', 'Quindim, the shiny yellow coconut custard', ['quindim', 'กินจิง', 'coconut custard', 'คัสตาร์ดมะพร้าว', 'egg yolk sweet', 'ขนมไข่แดง', 'bahia sweet', 'ขนมบาเยีย', 'glossy yellow', 'brazilian dessert'],
    // a small dome of glossing bright yellow custard turned out of its mould with a golden coconut layer at the bottom, sitting in a paper cup with crimped edges, two more behind
    [[60, 100, 0.7], [180, 100, 0.7], [120, 140, 1.2]].map(([x, y, s]) => g(x, y, s, P('M-46 20l8 34h76l8-34z', '#F8BBD0', 3) + [-36, -24, -12, 0, 12, 24, 36].map((dx) => Lc(`M${dx} 22l${dx / 10} 30`, '#F48FB1', 2)).join('')
      + P('M-40 22c0-50 80-50 80 0z', '#FFD600', 3.5) + P('M-40 22c10 6 70 6 80 0v-6c-10 6-70 6-80 0z', '#E0A800', 2.5) + E(-14, -6, 10, 5, '#FFFDE7', 0)
      + (s > 1 ? face(0, 0, 0.32) : ''))).join('')),
  K('br', 'culture', 'frevo', 'ร่มจิ๋วหลากสีของการเต้นเฟรโว', 'The little rainbow umbrella of frevo dancing', ['frevo', 'เฟรโว', 'frevo umbrella', 'ร่มเฟรโว', 'recife', 'เรซิเฟ', 'olinda', 'โอลินดา', 'pernambuco dance', 'dance umbrella'],
    // a child leaping high in a frilly costume with one knee up, holding up a tiny umbrella striped red, yellow, green and blue, little motion lines and confetti around
    g(120, 64, 1, [['#E53935', -70], ['#FFCA28', -35], ['#43A047', 0], ['#1E88E5', 35], ['#E53935', 70]].map(([c, a]) => g(0, 0, 1, P('M0 0L-12-34a36 36 0 0 1 24 0z', c, 3), a)).join('') + Lc('M0 0v30', INK, 3), 0)
      + g(124, 156, 1, C(0, -40, 16, '#C68B59', 3) + P('M-16-48c4-14 28-14 32 0-10-4-22-4-32 0z', '#3E2723', 2) + face(0, -40, 0.34, 'o')
        + P('M-18-20h36l6 34h-48z', '#FF7043', 3) + P('M-26 14c10 6 42 6 52 0l-4 10c-10 4-34 4-44 0z', '#FFEB3B', 2.5)
        + Lc('M-4 24l-14 28M10 24l20 4 4 24', '#C68B59', 7) + Lc('M14-16c-4-20-8-40-10-58', '#C68B59', 6) + Lc('M-16-14l-24 14', '#C68B59', 6))
      + [[40, 120], [200, 140], [50, 200], [190, 70]].map(([x, y]) => R(x, y, 8, 8, '#AB47BC', 1, 1.5)).join('') + Lc('M60 170h-24M64 184h-20', INK, 3)),
  K('br', 'culture', 'bumbameuboi', 'วัวระบำบุมบาเมวบอย', 'Bumba-meu-boi, the dancing festival ox', ['bumba meu boi', 'บุมบาเมวบอย', 'boi bumbá', 'dancing ox', 'วัวระบำ', 'são luís', 'parintins', 'ปารินชินส์', 'folk festival', 'ribbons'],
    // a big festival ox costume with a black velvet body sewn all over with bright beaded flowers and stars, colourful ribbons hanging round the skirt, curvy horns, a dancer's legs showing underneath
    R(-4, 218, 248, 22, '#FFE0B2', 0, 0) + Lc('M96 196v26M146 196v26', '#C68B59', 8) + Lc('M96 196v26M146 196v26', INK, 1.5)
      + P('M50 120c0-40 140-40 140 0v40c0 12-140 12-140 0z', '#212121', 3.5)
      + Array.from({ length: 12 }, (_, k) => Lc(`M${56 + k * 12} 166v${24 + (k % 3) * 8}`, ['#E53935', '#FFCA28', '#43A047', '#1E88E5'][k % 4], 5)).join('')
      + [[86, 116, '#E91E63'], [120, 104, '#FFEB3B'], [154, 116, '#00BCD4'], [104, 140, '#FF9800'], [140, 140, '#8BC34A']].map(([x, y, c]) => [0, 72, 144, 216, 288].map((r) => g(x, y, 1, C(0, -6, 4, c, 1.5), r)).join('') + C(x, y, 3, '#FFFFFF', 1)).join('')
      + g(42, 104, 1, E(0, 0, 26, 22, '#212121', 3.5) + E(-14, 10, 10, 8, '#F8BBD0', 2.5) + P('M-10-18c-12-14-18-22-14-34M10-20c6-16 16-22 28-20', 'none', 5) + Lc('M-10-18c-12-14-18-22-14-34M10-20c6-16 16-22 28-20', '#FFF8E1', 2) + P('M0-26l4 8 8 1-6 5 2 8-8-4-8 4 2-8-6-5 8-1z', '#FFCA28', 1.5) + face(0, -2, 0.36))),

  // ---------- Rio de Janeiro
  L('br/rio/landmark-niteroi.v1.svg', 'พิพิธภัณฑ์จานบินแห่งนีเตรอย', 'The flying-saucer museum of Niterói', ['niterói', 'niteroi', 'นีเตรอย', 'mac niterói', 'contemporary art museum', 'พิพิธภัณฑ์ศิลปะร่วมสมัย', 'flying saucer', 'จานบิน', 'red ramp', 'boa viagem'],
    'หาตึกรูปจานบินที่มีทางลาดสีแดงคดเคี้ยว', 'Find the flying-saucer building with a winding red ramp',
    // a white flying-saucer shaped museum with a dark band of windows standing on a single short stem in a round reflecting pool, a long curling red ramp leading up to it, the bay behind
    R(-4, -4, 248, 248, '#E1F5FE', 0, 0) + R(-4, 120, 248, 80, '#29B6F6', 0, 0) + P('M140 120c10-30 40-34 60 0z', '#66BB6A', 3) + Lc('M10 150c20-6 30 6 50 0', '#FFFFFF', 3)
      + P('M-4 190c60-20 188-20 248 0v54H-4z', '#A1887F', 3) + E(120, 180, 66, 14, '#81D4FA', 3)
      + R(108, 132, 24, 48, '#FFFFFF', 0, 3) + P('M40 112c0-24 160-24 160 0c-10 22-150 22-160 0z', '#FFFFFF', 3.5) + P('M48 104c10-12 134-12 144 0-10 8-134 8-144 0z', '#455A64', 2.5)
      + P('M70 84c12-24 88-24 100 0', '#FFFFFF', 3.5) + P('M40 112c0 10 8 14 16 16', 'none', 3)
      + P('M200 228c-40 0-70-10-60-30s50-10 30-42c-6-10-20-14-30-18', 'none', 0) + Lc('M210 230c-40 0-76-10-64-32s48-10 30-42c-6-10-16-14-26-16', '#E53935', 10) + Lc('M210 230c-40 0-76-10-64-32s48-10 30-42c-6-10-16-14-26-16', INK, 1.5)
      + face(120, 120, 0.3)),
  L('br/rio/landmark-pedradosal.v1.svg', 'วงซัมบาบนลานหินเปดราดูซาล', 'The samba circle on the Pedra do Sal rock', ['pedra do sal', 'เปดราดูซาล', 'roda de samba', 'วงซัมบา', 'samba circle', 'pandeiro', 'แพนเดโร', 'little africa', 'saúde', 'live samba'],
    'หากลองแทมบูรีนที่ยิ้มอยู่กลางวงซัมบา', 'Find the smiling tambourine in the middle of the samba circle',
    // a big smooth grey rock with old steps carved into its slope, a string of light bulbs above, a table in front with a pandeiro tambourine, a little four-string guitar and a shaker
    R(-4, -4, 248, 248, '#3949AB', 0, 0) + P('M-4 160c20-70 90-120 170-120 40 0 70 20 78 40v80z', '#9E9E9E', 3.5)
      + [[30, 150], [44, 136], [58, 122], [72, 110], [86, 98]].map(([x, y]) => P(`M${x} ${y}h20v10h-20z`, '#BDBDBD', 2.5)).join('')
      + Lc('M-4 40c60 30 180 30 248 0', INK, 2) + [20, 60, 100, 140, 180, 220].map((x, k) => C(x, 52 + Math.sin(k) * 6 + (x > 40 && x < 200 ? 10 : 0), 6, '#FFEB3B', 2)).join('')
      + R(-4, 168, 248, 76, '#8D6E63', 0, 0) + R(30, 172, 180, 12, '#A1673F', 3, 3) + Lc('M50 184v50M190 184v50', '#6D4C41', 5)
      + g(120, 150, 1, C(0, 0, 32, '#FFE0B2', 3.5) + C(0, 0, 32, 'none', 0) + [0, 60, 120, 180, 240, 300].map((r) => g(0, 0, 1, E(0, -32, 6, 3, '#FFCA28', 2), r)).join('') + face(0, -2, 0.42))
      + g(60, 148, 1, E(0, 10, 16, 18, '#C68B59', 3) + C(0, 6, 5, INK, 0) + R(-3, -46, 6, 44, '#6D4C41', 2, 2), -30) + g(184, 152, 1, E(0, 0, 9, 16, '#43A047', 3) + R(-3, 14, 6, 12, '#6D4C41', 1, 2))),
  L('br/rio/landmark-paqueta.v1.svg', 'ต้นเบาบับมาเรียกอร์ดาบนเกาะปาเกตา', 'The fat baobab of Paquetá Island', ['paquetá', 'paqueta', 'ปาเกตา', 'paquetá island', 'เกาะปาเกตา', 'baobab', 'ต้นเบาบับ', 'maria gorda', 'no cars island', 'bicycles'],
    'หาต้นไม้ลำต้นอ้วนกลมที่คนเรียกว่ามาเรียอ้วน', 'Find the tree with a big round tummy people call Fat Maria',
    // a huge round-bellied baobab tree with a thick smooth trunk and a small tuft of spreading branches, standing near a sandy beach on a car-free island, a bicycle leaning against it, the bay behind
    R(-4, -4, 248, 248, '#E1F5FE', 0, 0) + R(-4, 120, 248, 40, '#4FC3F7', 0, 0) + P('M180 124c10-20 40-24 60 0z', '#81C784', 2.5)
      + P('M-4 160c60-14 188-14 248 0v84H-4z', '#FFE0B2', 3)
      + P('M80 190c-30-20-30-90 10-110h50c40 20 40 90 10 110z', '#A1887F', 3.5) + Lc('M100 100c-6 20-6 60 4 84M140 110c6 20 4 50-4 72', '#8D6E63', 2.5)
      + P('M92 82c-10-20-30-30-50-30M104 80c-4-24-12-40-24-52M120 80V30M136 80c4-24 12-40 24-52M148 82c10-20 30-30 50-30', 'none', 6)
      + [[40, 50], [80, 26], [120, 26], [160, 26], [200, 50]].map(([x, y]) => E(x, y, 22, 10, '#7CB342', 3)).join('') + face(120, 140, 0.4)
      + g(186, 206, 1, C(-20, 0, 14, 'none', 3) + C(20, 0, 14, 'none', 3) + Lc('M-20 0l12-20h22l6 20M-8-20l-4-8h8M14-20l4-6', '#E53935', 3))),
  L('br/rio/landmark-vistachinesa.v1.svg', 'ศาลาจีนวิสตาชิเนซาในป่าชีจูกา', 'The Chinese pavilion of Vista Chinesa in the Tijuca forest', ['vista chinesa', 'วิสตาชิเนซา', 'chinese pavilion', 'ศาลาจีน', 'tijuca forest', 'ป่าชีจูกา', 'viewpoint', 'จุดชมวิว', 'lagoa view', 'tea growers'],
    'หาศาลาหลังคางอนสีเขียวที่มองเห็นทะเลสาบและทะเล', 'Find the green curly-roofed pavilion looking over the lagoon and the sea',
    // a little open pavilion with a curly green Chinese-style roof on bamboo-like columns, perched on a rail above the jungle, below it the city, a lagoon and the ocean far away
    R(-4, -4, 248, 248, '#E1F5FE', 0, 0) + R(-4, 120, 248, 40, '#4FC3F7', 0, 0) + E(80, 168, 50, 14, '#29B6F6', 3) + [[140, 150], [170, 156], [196, 150], [116, 156]].map(([x, y]) => R(x, y, 10, 18, '#ECEFF1', 1, 2)).join('')
      + P('M-4 176c60-10 180-10 248 0v68H-4z', '#2E7D32', 3) + [[20, 200], [60, 210], [180, 206], [220, 196]].map(([x, y]) => C(x, y, 18, '#43A047', 2.5)).join('')
      + R(30, 176, 180, 10, '#F5F0E6', 2, 3) + [44, 70, 96, 144, 170, 196].map((x) => Lc(`M${x} 186v12`, INK, 2.5)).join('')
      + [70, 170].map((x) => R(x - 6, 92, 12, 86, '#F5F0E6', 0, 3) + Lc(`M${x - 6} 116h12M${x - 6} 142h12`, '#A1887F', 2)).join('')
      + P('M36 92c20 0 30-10 40-30h88c10 20 20 30 40 30c-4 8-18 10-30 4h-108c-12 6-26 4-30-4z', '#43A047', 3.5) + P('M90 62c4-14 10-20 30-24 20 4 26 10 30 24z', '#66BB6A', 3) + C(120, 32, 5, '#FFCA28', 2)
      + face(120, 80, 0.3)),

  // ---------- Argentina
  K('ar', 'food', 'asado', 'อาซาโดย่างบนกากบาทเหล็กรอบกองไฟ', 'Asado al asador, meat roasting on iron crosses round the fire', ['asado', 'อาซาโด', 'asado al asador', 'cordero patagónico', 'iron cross', 'กากบาทเหล็ก', 'open fire', 'ย่างรอบกองไฟ', 'argentine barbecue', 'บาร์บีคิวอาร์เจนตินา'],
    // two iron crosses leaning over a glowing wood fire with big golden-brown roasts spread out on them, orange embers on the ground, smoke curling up
    R(-4, 206, 248, 34, '#A1887F', 0, 0)
      + [[78, -12], [164, 12]].map(([x, r]) => g(x, 120, 1, Lc('M0 90V-80M-40-30h80', '#455A64', 6) + P('M-34-60c-6 30-4 70 10 90h48c14-20 16-60 10-90z', '#B5651D', 3.5) + Lc('M-20-40h40M-24-10h48M-20 18h40', '#8D4A2B', 3) + E(-12, -46, 8, 4, '#E8A45A', 0), r)).join('')
      + P('M90 214c-6-30 10-34 14-54 10 16 6 24 16 30 4-20 14-26 22-30-4 20 10 30 0 54z', '#FF7043', 3) + P('M106 214c0-16 8-20 14-30 6 10 10 18 6 30z', '#FFCA28', 2.5)
      + Lc('M80 216l80-6M86 206l70 8', '#6D4C41', 6) + [[60, 222], [180, 224], [120, 228]].map(([x, y]) => C(x, y, 5, '#FF5722', 2)).join('')
      + Lc('M70 40c-8-12 8-18 0-30M168 44c-8-12 8-18 0-30', '#CFD8DC', 5) + face(122, 202, 0.28)),
  K('ar', 'transport', 'trenalasnubes', 'รถไฟสู่ก้อนเมฆบนสะพานลาโปลโบรียา', 'The Train to the Clouds on its high viaduct', ['tren a las nubes', 'train to the clouds', 'รถไฟสู่ก้อนเมฆ', 'la polvorilla viaduct', 'สะพานลาโปลโบรียา', 'salta', 'ซัลตา', 'high railway', 'รถไฟที่สูงที่สุด', 'andes train'],
    // a red train crossing a tall curved steel trestle bridge high over a dry pink valley in the Andes, white fluffy clouds around it, cacti on the slopes
    R(-4, -4, 248, 248, '#E3F2FD', 0, 0) + P('M-4 140l50-40 40 30 60-60 50 50 48-20v144H-4z', '#D7A88A', 3)
      + [[40, 60], [180, 40], [210, 100]].map(([x, y]) => E(x, y, 26, 12, '#FFFFFF', 3) + C(x - 8, y - 8, 10, '#FFFFFF', 0)).join('')
      + Lc('M10 120c60 16 160 16 220 0', '#78909C', 7)
      + [30, 60, 90, 120, 150, 180, 210].map((x) => { const y = 120 + 16 * (1 - Math.pow((x - 120) / 110, 2)) * 0.8; return P(`M${x - 6} ${y}l-6 ${236 - y}h24l-6-${236 - y}z`, 'none', 2.5) + Lc(`M${x - 10} ${y + 30}l20 30M${x + 10} ${y + 30}l-20 30M${x - 12} ${y + 80}l24 30M${x + 12} ${y + 80}l-24 30`, '#90A4AE', 2); }).join('')
      + g(120, 112, 1, [-60, -24, 12].map((x) => R(x, -26, 34, 26, '#C62828', 4, 3) + R(x + 6, -20, 10, 8, '#FFF59D', 1, 1.5) + R(x + 18, -20, 10, 8, '#FFF59D', 1, 1.5)).join('') + R(48, -30, 30, 30, '#B71C1C', 6, 3) + face(64, -16, 0.24))
      + cactus(26, 214, 0.8) + cactus(214, 206, 0.9)),
  K('ar', 'culture', 'bombo', 'กลองบอมโบเลกูเอโร', 'The bombo legüero, the big folk drum', ['bombo legüero', 'bombo leguero', 'บอมโบเลกูเอโร', 'folk drum', 'กลองพื้นเมือง', 'santiago del estero', 'chacarera', 'ชาการาเรรา', 'log drum', 'folklore'],
    // a big round drum carved from a hollow log, laced up and down with a zigzag rope, its skins still fluffy with brown-and-white hair at the edges, one plain stick and one soft-headed stick crossed over it
    E(120, 76, 74, 22, '#F5E6C8', 3.5) + P('M46 76v100c0 30 148 30 148 0V76', '#A1673F', 3.5) + E(120, 76, 74, 22, '#F5E6C8', 3.5)
      + Lc('M50 80c4 8 10 10 18 10M190 80c-4 8-10 10-18 10', '#6D4C41', 4) + E(120, 176, 74, 22, 'none', 0)
      + Lc('M56 92l20 80 20-80 20 80 20-80 20 80 20-80 10 50', '#FFF8E1', 4) + Lc('M56 92l20 80 20-80 20 80 20-80 20 80 20-80 10 50', INK, 1.5)
      + [[60, 72], [90, 62], [150, 62], [180, 72], [70, 86]].map(([x, y]) => P(`M${x} ${y}l4-8 4 8 4-6`, 'none', 2)).join('')
      + Lc('M70 40l90 50', '#8D5524', 6) + Lc('M180 30l-80 56', '#8D5524', 6) + C(180, 30, 10, '#FFF3E0', 3) + face(120, 140, 0.4)),
  K('ar', 'food', 'humita', 'อูมิตา ข้าวโพดบดห่อในเปลือก', 'Humita, sweet corn paste wrapped in its husk', ['humita', 'อูมิตา', 'humita en chala', 'corn husk parcel', 'ห่อเปลือกข้าวโพด', 'sweet corn paste', 'ข้าวโพดบด', 'northwest argentina', 'salta food', 'tucumán'],
    // three neat parcels of pale green corn husk tied up with thin husk strips, one opened on a plate showing creamy yellow corn paste with a sprig of basil
    [[60, 90, -12], [140, 76, 10]].map(([x, y, r]) => g(x, y, 1, P('M-34 0c0-30 68-30 68 0v14c0 30-68 30-68 0z', '#C5E1A5', 3) + Lc('M-34 8h68', '#8BC34A', 4) + Lc('M-34 8h68', INK, 1.5) + Lc('M-20-20v40M0-24v46M20-20v40', '#AED581', 2) + P('M30 8l18-8-4 12z', '#C5E1A5', 2), r)).join('')
      + E(120, 180, 96, 34, '#FFFFFF', 3.5) + P('M44 176c0-30 34-44 76-44s76 14 76 44c-20 20-132 20-152 0z', '#AED581', 3) + P('M64 170c0-20 26-28 56-28s56 8 56 28c-16 12-96 12-112 0z', '#FFE082', 3)
      + [[96, 152], [118, 148], [142, 154]].map(([x, y]) => C(x, y, 3, '#FFCA28', 1.5)).join('') + P('M150 140c6-8 16-6 16 2-8 4-12 2-16-2z', '#43A047', 2) + face(120, 158, 0.32)),

  // ---------- Buenos Aires and Iguazú
  L('ar/buenosaires/landmark-casarosada.v1.svg', 'กาซาโรซาดา ทำเนียบสีชมพู', 'The Casa Rosada, the pink house', ['casa rosada', 'กาซาโรซาดา', 'pink house', 'บ้านสีชมพู', 'plaza de mayo', 'จัตุรัสมาโย', 'pink palace', 'วังสีชมพู', 'government house', 'balcony'],
    'หาตึกสีชมพูที่มีประตูโค้งใหญ่ตรงกลาง', 'Find the pink palace with a big arch in the middle',
    // a long pale pink palace with rows of tall windows, a big round-topped arch in the middle under a pediment, a famous balcony on the side, palm trees and the square in front
    R(-4, 200, 248, 40, '#E0E0E0', 0, 0) + R(20, 88, 200, 114, '#F8BBD0', 0, 3.5) + R(14, 80, 212, 12, '#F48FB1', 2, 3)
      + [[36, 100], [60, 100], [160, 100], [184, 100], [36, 150], [60, 150], [160, 150], [184, 150]].map(([x, y]) => P(`M${x} ${y + 34}v-26a10 10 0 0 1 20 0v26z`, '#FFF3E0', 2.5)).join('')
      + R(30, 136, 52, 8, '#F48FB1', 1, 2.5) + [36, 46, 56, 66, 76].map((x) => Lc(`M${x} 136v-8`, INK, 2)).join('') + Lc('M30 128h52', INK, 2.5)
      + R(92, 70, 56, 132, '#F48FB1', 0, 3.5) + P('M86 72L120 40l34 32z', '#F8BBD0', 3) + C(120, 58, 6, '#FFFFFF', 2) + P('M100 202v-46a20 20 0 0 1 40 0v46z', '#8D5524', 3)
      + Lc('M120 156v46', INK, 2) + face(120, 106, 0.32)),
  L('ar/buenosaires/landmark-aripuca.v1.svg', 'อาริปูกา บ้านซุงยักษ์ในป่าอีกวาซู', 'La Aripuca, the giant log trap house of Iguazú', ['la aripuca', 'อาริปูกา', 'giant log house', 'บ้านซุงยักษ์', 'bird trap shape', 'puerto iguazú', 'ปวยร์โตอีกวาซู', 'rainforest trees', 'wooden pyramid', 'misiones'],
    'หาบ้านที่ทำจากซุงยักษ์วางซ้อนกันเป็นพีระมิด', 'Find the house made of giant logs stacked into a pyramid',
    // a huge pyramid made of giant logs stacked in a crisscross square pattern getting smaller towards the top, jungle trees all round, a tiny visitor at the bottom for size
    R(-4, -4, 248, 248, '#E8F5E9', 0, 0) + [[16, 150], [226, 140], [40, 120], [200, 116]].map(([x, y]) => tree(x, y, 1.6, '#2E7D32')).join('') + R(-4, 200, 248, 44, '#A1887F', 0, 0)
      + Array.from({ length: 8 }, (_, k) => { const w = 180 - k * 20, x = 120 - w / 2, y = 196 - k * 20; return R(x, y - 12, w, 12, k % 2 ? '#8D5524' : '#A1673F', 6, 3) + C(x + 6, y - 6, 5, '#D7A86E', 2) + C(x + w - 6, y - 6, 5, '#D7A86E', 2); }).join('')
      + kid(56, 222, '#FFCA28', 0.7) + face(120, 150, 0.32)),
  L('ar/buenosaires/landmark-sanignacio.v1.svg', 'ซากโบสถ์หินทรายแดงซานอิกนาซิโอมินี', 'The red sandstone ruins of San Ignacio Miní', ['san ignacio miní', 'san ignacio mini', 'ซานอิกนาซิโอมินี', 'jesuit mission ruins', 'ซากคณะมิชชัน', 'red sandstone', 'หินทรายแดง', 'misiones', 'มิซิโอเนส', 'jungle ruins'],
    'หากำแพงหินสีแดงที่มีต้นไม้งอกออกมา', 'Find the red stone wall with a tree growing out of it',
    // a tall broken facade of red sandstone with an empty arched doorway, carved swirls on its pillars, grass and a small tree growing out of the top, jungle green behind
    R(-4, -4, 248, 248, '#E8F5E9', 0, 0) + P('M-4 120c40-20 80 0 120-10s80-20 128 0v134H-4z', '#66BB6A', 0) + R(-4, 204, 248, 40, '#8BC34A', 0, 0)
      + P('M50 206V90l14-20 20 10 14-30h44l12 24 18-12 18 30v114z', '#C0603A', 3.5)
      + P('M96 206v-70a24 24 0 0 1 48 0v70z', '#4E342E', 3) + [64, 166].map((x) => R(x - 8, 100, 16, 106, '#D07856', 0, 2.5) + Lc(`M${x - 4} 120c8 0 8 10 0 10s-8 10 0 10`, '#8E3B2B', 2.5)).join('')
      + [[80, 160], [150, 120], [110, 100]].map(([x, y]) => R(x, y, 16, 10, '#B5523A', 1, 2)).join('') + Lc('M50 110h140', '#8E3B2B', 2)
      + Lc('M120 50c0-10-4-20 0-30', '#795548', 4) + C(120, 18, 14, '#43A047', 2.5) + [[62, 72], [180, 82]].map(([x, y]) => P(`M${x} ${y}c-4-8 4-12 8-6`, '#7CB342', 3)).join('') + face(120, 92, 0.26)),
  L('ar/buenosaires/landmark-kavanagh.v1.svg', 'ตึกคาวานัคแบบอาร์ตเดโค', 'The stepped art deco Kavanagh Building', ['kavanagh building', 'ตึกคาวานัค', 'edificio kavanagh', 'art deco', 'อาร์ตเดโค', 'retiro', 'เรตีโร', 'plaza san martín', 'stepped skyscraper', 'ตึกระฟ้าขั้นบันได'],
    'หาตึกสูงสีครีมที่เป็นขั้นบันไดเหมือนเค้กแต่งงาน', 'Find the tall cream tower that steps in like a wedding cake',
    // a tall cream skyscraper built in steps that get narrower towards the top, rows of small windows, a slim tower on top, a leafy plaza with jacaranda trees at its foot
    R(-4, 206, 248, 40, '#C5E1A5', 0, 0)
      + [[50, 206, 140, 80], [64, 126, 112, 40], [78, 86, 84, 30], [92, 56, 56, 26], [106, 30, 28, 26]].map(([x, y, w, h]) => R(x, y - h, w, h, '#FFF3E0', 0, 3.5)
        + Array.from({ length: Math.floor((w - 8) / 14) }, (_, k) => Array.from({ length: Math.floor(h / 14) }, (_, j) => R(x + 6 + k * 14, y - h + 4 + j * 14, 6, 8, '#81D4FA', 0, 1.5)).join('')).join('')).join('')
      + Lc('M120 4v-10', INK, 3) + [[22, 196], [218, 200]].map(([x, y]) => tree(x, y, 1.2, '#BA68C8')).join('') + face(120, 170, 0.32)),

  // ---------- Patagonia
  L('ar/patagonia/landmark-chocolaterama.v1.svg', 'ช็อกโกแลตกิ่งไม้ของบาริโลเช', 'Bariloche\'s chocolate twigs', ['chocolate en rama', 'ช็อกโกแลตกิ่งไม้', 'bariloche chocolate', 'ช็อกโกแลตบาริโลเช', 'calle mitre', 'chocolate street', 'ถนนช็อกโกแลต', 'chocolate twigs', 'hot chocolate', 'submarino'],
    'หาช็อกโกแลตที่หน้าตาเหมือนกิ่งไม้กองโต', 'Find the chocolate that looks like a pile of little twigs',
    // a little wooden crate heaped with knobbly chocolate pieces shaped like twigs and branches, some dark and some milky, a tall glass of hot milk with a chocolate bar sinking into it
    P('M28 140h130l-10 70H38z', '#C68B59', 3.5) + Lc('M32 162h122M34 186h118', '#A1673F', 3)
      + Array.from({ length: 11 }, (_, k) => { const x = 40 + (k % 6) * 20, y = 132 - Math.floor(k / 6) * 16, r = (k * 37) % 60 - 30; return g(x, y, 1, P('M-14 0c6-4 10 2 14-2s8-6 14 0c-4 4-8 2-14 6s-8 0-14-4z', k % 3 ? '#5D4037' : '#8D6E63', 2.5) + Lc('M0 0l4-10', k % 3 ? '#5D4037' : '#8D6E63', 4), r); }).join('')
      + P('M174 80h44l-6 130h-32z', '#FFFFFF', 3.5) + P('M176 104h40l-5 104h-30z', '#FFF8E1', 0) + R(186, 66, 20, 50, '#5D4037', 2, 3) + Lc('M186 82h20M186 98h20', '#3E2723', 2)
      + Lc('M184 60c-6-10 6-14 0-24M206 60c-6-10 6-14 0-24', '#CFD8DC', 4) + face(93, 178, 0.34)),
  L('ar/patagonia/landmark-araucaria.v1.svg', 'ต้นอาราอูคาเรียกับเมล็ดปีญอน', 'The monkey puzzle tree and its pine nuts', ['araucaria', 'อาราอูคาเรีย', 'monkey puzzle tree', 'ต้นมังกี้พัซเซิล', 'pehuén', 'เปอเวน', 'piñones', 'เมล็ดปีญอน', 'neuquén', 'umbrella tree'],
    'หาต้นไม้ทรงร่มที่กิ่งเป็นเกล็ดแหลมๆ', 'Find the umbrella-shaped tree with spiky scaly branches',
    // a tall bare trunk topped by an umbrella of curving spiky green branches like ropes of scales, a big round green cone and a pile of fat brown pine nuts at its foot
    R(-4, -4, 248, 248, '#E3F2FD', 0, 0) + P('M-4 190c60-16 188-16 248 0v54H-4z', '#C5E1A5', 3) + R(110, 80, 20, 120, '#8D6E63', 2, 3.5) + Lc('M114 110h12M114 140h12M114 170h12', '#6D4C41', 2)
      + [[-80, 20], [-56, -10], [-26, -26], [0, -34], [26, -26], [56, -10], [80, 20]].map(([dx, dy]) => Lc(`M120 80q${dx / 2} ${dy - 20} ${dx} ${dy}`, '#2E7D32', 10) + P(`M120 80q${dx / 2} ${dy - 20} ${dx} ${dy}`, 'none', 2) + Lc(`M120 80q${dx / 2} ${dy - 20} ${dx} ${dy}`, '#66BB6A', 3).replace('stroke-width="3"', 'stroke-width="3" stroke-dasharray="3 5"')).join('')
      + g(170, 196, 1, C(0, 0, 22, '#7CB342', 3) + [[-8, -8], [8, -8], [0, 4], [-10, 8], [10, 8]].map(([x, y]) => P(`M${x - 4} ${y}l4-5 4 5-4 5z`, '#558B2F', 1.5)).join('') + face(0, -2, 0.3))
      + [[56, 214], [72, 220], [64, 206], [84, 212]].map(([x, y]) => E(x, y, 9, 5, '#A1673F', 2.5)).join('')),
  L('ar/patagonia/landmark-dinoeggs.v1.svg', 'รังไข่ไดโนเสาร์คอยาวแห่งปาตาโกเนีย', 'A nest of giant dinosaur eggs in Patagonia', ['dinosaur eggs', 'ไข่ไดโนเสาร์', 'titanosaur nest', 'รังไททาโนซอร์', 'auca mahuevo', 'neuquén', 'เนวเกน', 'fossil eggs', 'ไข่ฟอสซิล', 'baby dinosaur'],
    'หาลูกไดโนเสาร์คอยาวที่โผล่หัวออกมาจากไข่', 'Find the baby long-neck dinosaur peeking out of its egg',
    // a hollow in red desert sandstone holding a clutch of round speckled dinosaur eggs, one cracked open with a baby long-necked dinosaur peeking out, a little brush and magnifying glass beside
    R(-4, -4, 248, 248, '#FFE0B2', 0, 0) + P('M-4 120c40-20 80-10 120-20s80 0 128 10v134H-4z', '#D9825B', 3) + Lc('M-4 150c60-10 120 6 248-6M-4 180c60 10 140-6 248 4', '#C0603A', 3)
      + E(120, 180, 90, 36, '#B5523A', 3.5)
      + [[70, 176], [100, 186], [146, 186], [170, 172], [86, 160], [124, 162]].map(([x, y]) => C(x, y, 18, '#F5EBDC', 3) + C(x - 6, y - 4, 2.5, '#BCAAA4', 0) + C(x + 5, y + 5, 2, '#BCAAA4', 0)).join('')
      + g(156, 150, 1, P('M-20 10c0-20 10-30 20-30s20 10 20 30z', '#F5EBDC', 3) + P('M-20 10l6-6 6 6 6-6 6 6 6-6 6 6', 'none', 2.5) + P('M-6 4c0-30 4-60 14-70 10-6 20 0 18 10-2 8-12 6-16 14-4 16-2 30-2 46z', '#81C784', 3) + face(14, -60, 0.2))
      + g(36, 222, 1, R(-4, -24, 8, 22, '#8D6E63', 2, 2) + R(-8, -4, 16, 12, '#FFCA28', 2, 2)) + g(210, 216, 1, C(0, 0, 12, '#E1F5FE', 3) + Lc('M8 8l12 12', '#5D4037', 5))),
  L('ar/patagonia/landmark-ruta40.v1.svg', 'ถนนรูตา 40 กับป้ายระวังกวานาโก', 'Ruta 40 and its guanaco crossing sign', ['ruta 40', 'รูตา 40', 'route 40', 'ถนนสาย 40', 'guanaco crossing', 'ป้ายระวังกวานาโก', 'patagonian steppe', 'ทุ่งหญ้าปาตาโกเนีย', 'road trip', 'empty road'],
    'หาป้ายสีเหลืองรูปกวานาโกข้างถนนยาว', 'Find the yellow sign with a guanaco on it beside the long road',
    // a long straight road narrowing to a dot at the horizon across dry golden steppe, snowy mountains far away, a yellow diamond road sign with a black guanaco shape on it, tufts of grass
    R(-4, -4, 248, 248, '#E3F2FD', 0, 0) + P('M-4 110l40-26 30 14 40-30 36 26 30-18 72 34z', '#CFD8DC', 3) + P('M70 92l10-8 10 8M128 72l12-8 10 8', 'none', 3)
      + R(-4, 110, 248, 134, '#E6C77A', 0, 0) + Lc('M-4 110h248', INK, 3) + P('M114 110h12l70 134H44z', '#616161', 3) + Lc('M120 124v10M120 150v16M120 186v24M120 224v20', '#FFEB3B', 4)
      + Lc('M190 230v-80', '#90A4AE', 5) + g(190, 128, 1, P('M0-34l34 34-34 34-34-34z', '#FFD600', 3.5)
        + P('M-14 10v-10c0-6 4-8 10-8h10l4-14c0-4 6-4 6 0l-2 14v18h-4v-10h-14v10z', INK, 0))
      + [[30, 150], [60, 200], [20, 220], [170, 180], [226, 160]].map(([x, y]) => Lc(`M${x - 6} ${y}l-4-10M${x} ${y}v-12M${x + 6} ${y}l4-10`, '#A1887F', 2.5)).join('')
      + C(40, 40, 18, '#FFD54F', 3) + face(40, 38, 0.22)),
];

export default { places: {}, items };
