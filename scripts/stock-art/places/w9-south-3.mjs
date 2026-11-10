// Wave 9, south (3): Greece — the country layer, Santorini and the Cyclades, Athens; Croatia — the country layer, Dubrovnik and Split, Plitvice and Zagreb; Malta — the country layer, Valletta and Gozo
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (gr/athens/landmark-sounion.v1.svg → gr-athens.landmark.sounion)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture: <cc>.<cat>.<key> in <cc>/<cat>-<key>.v1.svg
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const cloud = (x, y, s = 1) => g(x, y, s, P('M-24 6c-10 0-10-14 0-14 2-10 18-12 22-4 6-8 22-4 20 6 10 0 10 12 0 12z', '#FFFFFF', 2));
const waves = (y, c = '#B3E5FC') => Lc(`M20 ${y}c14-4 28 4 42 0M150 ${y + 14}c14-4 28 4 42 0`, c, 2.5);
const leaf = (x, y, r, c = '#43A047', s = 1) => g(x, y, s, P('M0 0c6-12 22-14 30-10-6 12-20 16-30 10z', c, 2), r);
const plate = (y = 196, w = 92) => E(120, y, w, w * 0.22, '#E3F2FD') + E(120, y - 4, w * 0.78, w * 0.14, '#FFFFFF', 2);
const olive = (x, y, s = 1) => g(x, y, s, Lc('M0 0c-2-14 2-24 0-34', '#8D6E63', 5) + E(-12, -40, 16, 10, '#9CCC65', 2) + E(12, -44, 16, 10, '#9CCC65', 2) + E(0, -54, 14, 9, '#AED581', 2));

const items = [
  // ---------- Greece, the country
  K('gr', 'food', 'moussaka', 'มูซากาชั้นมะเขือม่วงหน้าเบชาเมล', 'Moussaka with its creamy top', ['moussaka', 'มูซากา', 'aubergine layers', 'ชั้นมะเขือม่วง', 'béchamel top', 'หน้าซอสเบชาเมล', 'minced meat sauce', 'ซอสเนื้อสับ', 'oven dish', 'อาหารอบ', 'greek taverna', 'ทาเวอร์นากรีก'],
    // a tall square slice of moussaka on a plate showing layers: purple-edged aubergine slices, red meat sauce, potato, and a thick puffy golden-brown custard top with brown spots; a sprig of parsley
    plate(196, 92) + g(120, 132, 1, R(-50, -50, 100, 106, '#F6D69A', 6) + R(-50, -50, 100, 30, '#FFE9A8', 6, 3) + [[-30, -42], [6, -46], [30, -38], [-10, -32]].map(([x, y]) => C(x, y, 4, '#C68B59', 0)).join('')
      + R(-50, -20, 100, 16, '#C0392B', 0, 2.5) + R(-50, -4, 100, 14, '#7B1FA2', 0, 2.5) + Lc('M-46 3h92', '#CE93D8', 2) + R(-50, 10, 100, 16, '#C0392B', 0, 2.5) + R(-50, 26, 100, 14, '#7B1FA2', 0, 2.5) + R(-50, 40, 100, 16, '#FFE082', 0, 2.5)
      + face(0, -34, 0.34)) + leaf(176, 176, -30, '#43A047', 0.7)),
  K('gr', 'culture', 'sponges', 'ฟองน้ำทะเลธรรมชาติจากเกาะคาลิมนอส', 'Natural sea sponges from Kalymnos', ['sea sponges', 'ฟองน้ำทะเล', 'natural sponge', 'ฟองน้ำธรรมชาติ', 'kalymnos', 'คาลิมนอส', 'sponge divers', 'นักดำน้ำหาฟองน้ำ', 'symi', 'harbour shop', 'ร้านริมท่าเรือ'],
    // a wicker basket heaped with round golden-brown natural sponges full of holes, one big sponge in front with a smiling face, the blue sea and a white harbour wall behind
    sky('#B3E5FC') + R(-4, 90, 248, 50, '#1E88E5', 0, 3) + waves(104, '#BBDEFB') + R(-4, 140, 248, 104, '#FFFFFF', 0, 3) + Lc('M-4 170h248', '#ECEFF1', 2)
      + P('M40 150h140l-14 70H54z', '#D7B07A', 3) + Lc('M46 170h128M50 190h120M52 208h116M80 150l-6 70M110 150v70M140 150l6 70', '#B08A5A', 2)
      + [[66, 140, 20], [96, 128, 24], [134, 132, 22], [162, 142, 18]].map(([x, y, r]) => C(x, y, r, '#E8B04A', 3) + [[-6, -6], [6, 0], [-2, 8], [8, -10]].map(([a, b]) => C(x + a * r / 20, y + b * r / 20, 2.5, '#B07A20', 0)).join('')).join('')
      + g(184, 196, 1, C(0, 0, 30, '#F2C46D', 3) + [[-16, -14], [16, -16], [-20, 10], [20, 12], [0, -22]].map(([a, b]) => E(a, b, 4, 3, '#C08A2E', 0)).join('') + face(0, 2, 0.4))),

  // ---------- Santorini and the Cyclades
  L('gr/santorini/landmark-portara.v1.svg', 'ประตูหินอ่อนยักษ์ปอร์ตาราแห่งนักซอส', 'The Portara, the giant marble doorway of Naxos', ['portara', 'ปอร์ตารา', 'naxos', 'นักซอส', 'giant doorway', 'ประตูหินยักษ์', 'temple of apollo ruins', 'ซากวิหารโบราณ', 'palatia islet', 'sunset gate', 'ประตูชมพระอาทิตย์ตก'], 'หาประตูหินอ่อนบานใหญ่ที่ยืนอยู่บนเกาะเล็กไม่มีกำแพง', 'Find the huge marble doorway standing on the islet with no walls',
    // a huge stand-alone marble doorway made of four big blocks on a rocky islet joined to the shore by a stone path, the setting sun glowing right through it, the sea, white houses of the town on the hill across
    sky('#FFCC80') + C(120, 120, 26, '#FFF176', 2.5) + R(-4, 140, 248, 104, '#4FC3F7', 0, 3) + Lc('M80 152h80M60 170h120', '#FFE082', 3)
      + P('M150 140c10-40 40-50 94-50v50z', '#E0C9A6', 3) + [[170, 110], [190, 104], [210, 108], [228, 100], [196, 122]].map(([x, y]) => R(x - 8, y - 8, 16, 14, '#FFFFFF', 1, 2)).join('')
      + P('M50 190c10-20 130-20 140 0z', '#BCAAA4', 3) + Lc('M10 196h50', '#BCAAA4', 8)
      + R(70, 76, 20, 110, '#FAF3E3', 0, 3) + R(150, 76, 20, 110, '#FAF3E3', 0, 3) + R(62, 60, 116, 20, '#FAF3E3', 0, 3) + Lc('M80 90v80M160 90v80', '#E0D4BC', 2)
      + face(120, 70, 0.32) + waves(214, '#E1F5FE')),
  L('gr/santorini/landmark-sarakiniko.v1.svg', 'หาดหินขาวเหมือนดวงจันทร์ที่ซาราคินิโก', 'Sarakiniko, the white moon rocks of Milos', ['sarakiniko', 'ซาราคินิโก', 'milos', 'มิลอส', 'white volcanic rocks', 'หินภูเขาไฟสีขาว', 'moon landscape', 'เหมือนบนดวงจันทร์', 'cliff jumping', 'กระโดดน้ำ', 'cyclades beach'], 'หาหินสีขาวที่เป็นลอนเหมือนพื้นผิวดวงจันทร์', 'Find the smooth white wavy rocks that look like the moon',
    // smooth wavy bone-white rocks curving down around a narrow inlet of bright turquoise water, a child jumping in with a splash, a deep blue sea and sky beyond
    sky('#90CAF9') + R(-4, 60, 248, 40, '#1565C0', 0, 3)
      + P('M-4 90c30-10 50 10 70 0s30-20 54 0v154H-4z', '#FAFAFA', 3) + P('M244 90c-30-10-50 10-70 0s-30-14-40 0v154h110z', '#F5F5F5', 3)
      + P('M110 100c4 40-8 80-20 144h80c-16-60-30-100-26-144z', '#26C6DA', 3) + Lc('M-4 130c30-10 60 0 90-10M-4 170c30-10 60 4 84-8M244 130c-30-10-60 0-88-8M244 180c-30-10-56 0-80-8', '#E0E0E0', 3)
      + C(30, 110, 6, '#E0E0E0', 2) + C(200, 150, 8, '#E0E0E0', 2)
      + kid(140, 130, '#E53935', 1.3) + Lc('M132 110l-8-12M148 110l8-12', '#FFE0BD', 3) + Lc('M110 200c-6-10 0-16 8-14M136 200c6-10 0-16-8-14', '#E0F7FA', 3) + face(50, 210, 0.36)),
  L('gr/santorini/landmark-syrmata.v1.svg', 'บ้านโรงเก็บเรือประตูหลากสีที่หมู่บ้านคลิมา', 'The boat-garage houses with painted doors at Klima', ['syrmata', 'ซีร์มาตา', 'klima', 'คลิมา', 'milos', 'boat houses', 'บ้านโรงเรือ', 'colourful doors', 'ประตูหลากสี', 'fishermen\'s houses', 'บ้านชาวประมง', 'water\'s edge'], 'หาประตูบานใหญ่หลากสีที่เปิดลงไปในทะเลเลย', 'Find the big colourful doors that open right onto the sea',
    // a row of little white houses right at the water's edge, each with a big arched painted door at sea level for a boat (red, blue, green, yellow) and a balcony with matching railings above, the calm sea in front
    sky('#B3E5FC') + P('M-4 70c40-20 100-30 160-20s70 10 88 20v40H-4z', '#D7CCC8', 3) + R(-4, 160, 248, 84, '#4DD0E1', 0, 3)
      + [[6, '#E53935'], [64, '#1E88E5'], [122, '#43A047'], [180, '#FFB300']].map(([x, c]) => R(x, 90, 56, 74, '#FFFFFF', 0, 3) + P(`M${x + 10} 164v-24c0-16 36-16 36 0v24z`, c, 3) + Lc(`M${x + 28} 130v34`, '#FFFFFF', 2) + R(x + 6, 100, 18, 16, c, 2, 2.5) + Lc(`M${x + 2} 124h52M${x + 8} 124v-8M${x + 20} 124v-8M${x + 32} 124v-8M${x + 44} 124v-8`, c, 2.5)).join('')
      + g(150, 196, 1, P('M-30 0h60l-10 12h-40z', '#FFFFFF', 3) + Lc('M-30 0h60', '#1E88E5', 3)) + waves(214, '#E0F7FA') + face(92, 104, 0.24)),
  L('gr/santorini/landmark-aubergine.v1.svg', 'มะเขือม่วงขาวแห่งซานโตรินี', 'The white aubergines of Santorini', ['white aubergine', 'white eggplant', 'มะเขือขาว', 'santorini produce', 'ผักซานโตรินี', 'volcanic soil', 'ดินภูเขาไฟ', 'melitzanes', 'local farm', 'ไร่ท้องถิ่น', 'imam bayildi-free'], 'หามะเขือลูกกลมสีขาวที่มีหมวกสีเขียว', 'Find the round white aubergines wearing green caps',
    // three plump round creamy-white aubergines with green star caps, one big with a face, growing low from a leafy plant on dark volcanic soil, a white cave house far behind
    sky('#E1F5FE') + R(150, 50, 70, 40, '#FFFFFF', 4, 3) + P('M178 90v-16c0-10 14-10 14 0v16z', '#1E88E5', 2.5) + R(-4, 120, 248, 124, '#5D4037', 0, 3) + Lc('M20 150c20-4 40 4 60 0M140 220c20-4 40 4 60 0', '#4E342E', 3)
      + [[40, 110, -40], [190, 130, 220], [70, 150, 20], [170, 104, -150]].map(([x, y, r]) => leaf(x, y, r, '#558B2F', 1.4)).join('')
      + [[64, 186, 0.8], [178, 182, 0.8], [118, 170, 1.1]].map(([x, y, s]) => g(x, y, s, E(0, 0, 36, 32, '#FFFDF2') + E(-10, -10, 10, 8, '#FFFFFF', 0) + P('M-14-30l14 10 14-10-4 14 10 4-20 2-20-2 10-4z', '#43A047', 2.5) + Lc('M0-30v-12', '#558B2F', 4) + (s > 1 ? face(0, 6, 0.4) : ''))).join('')),
  L('gr/santorini/landmark-melitinia.v1.svg', 'ขนมเมลิตีเนียรูปดาวไส้ชีสหวาน', 'Melitinia, the star-shaped sweet cheese pastries', ['melitinia', 'เมลิตีเนีย', 'sweet cheese pastries', 'ขนมไส้ชีสหวาน', 'star-shaped', 'รูปดาว', 'mastic', 'santorini bakery', 'ร้านขนมซานโตรินี', 'easter treat', 'cyclades sweets'], 'หาขนมรูปดาวที่มีขอบแป้งจีบเป็นแฉก', 'Find the little star pastries with pinched pointy edges',
    // a blue-rimmed white plate of little pastries shaped like stars with pinched pointed edges and puffy golden-white cheese centres dusted with cinnamon, one big in the middle with a face
    plate(194, 100) + Lc('M50 190c20 8 120 8 140 0', '#1E88E5', 3)
      + [[70, 162, 0.8], [170, 162, 0.8], [90, 186, 0.7], [152, 188, 0.7], [120, 150, 1.2]].map(([x, y, s]) => g(x, y, s, Array.from({ length: 6 }, (_, k) => g(0, 0, 1, P('M-8-14l8-14 8 14z', '#F6E7C1', 2.5), k * 60)).join('') + C(0, 0, 18, '#FFF3D6', 2.5) + C(0, 0, 12, '#F6D69A', 0) + C(-5, -3, 1.5, '#8D5524', 0) + C(5, 2, 1.5, '#8D5524', 0) + (s > 1 ? face(0, 2, 0.28) : ''), s > 1 ? 0 : 15)).join('')),

  // ---------- Athens
  L('gr/athens/landmark-periptero.v1.svg', 'ซุ้มขายของปีริปเตโรหัวมุมถนนเอเธนส์', 'A periptero, the little Athens street kiosk', ['periptero', 'ปีริปเตโร', 'street kiosk', 'ซุ้มขายของริมถนน', 'snacks and cold drinks', 'ขนมและน้ำเย็น', 'newspapers', 'หนังสือพิมพ์', 'corner shop', 'ร้านหัวมุม', 'athens street life'], 'หาซุ้มเล็กๆ ที่มีขนมห้อยเต็มรอบหลังคา', 'Find the tiny booth with snacks hanging all round under its roof',
    // a small box-shaped kiosk with a wide flat roof overhang, packed all over with hanging snack bags, magazines in rows, a fridge of cold drinks beside it, a shopkeeper's face in the little window, a pavement and a bitter orange tree
    sky('#E1F5FE') + R(-4, 200, 248, 44, '#BDBDBD', 0, 3) + Lc('M190 200c-2-20 2-40 0-60', '#6D4C41', 5) + C(196, 120, 26, '#43A047', 2.5) + [[186, 112], [206, 126], [194, 134]].map(([x, y]) => C(x, y, 4, '#FF9800', 1.5)).join('')
      + R(40, 70, 100, 130, '#2E7D32', 2, 3) + P('M24 70h132l-8-18H32z', '#1B5E20', 3)
      + [52, 72, 92, 112, 132].map((x, k) => R(x - 7, 74, 14, 18, ['#E53935', '#FFCA28', '#29B6F6', '#AB47BC', '#FF7043'][k], 2, 2)).join('')
      + R(66, 100, 48, 34, '#FFF8E1', 2, 3) + C(90, 118, 10, '#FFE0BD', 2) + face(90, 117, 0.2)
      + Array.from({ length: 8 }, (_, k) => R(50 + (k % 4) * 21, 144 + Math.floor(k / 4) * 26, 18, 22, ['#FFFFFF', '#FFE082', '#B3E5FC', '#F8BBD0'][k % 4], 1, 2)).join('')
      + R(146, 110, 36, 90, '#ECEFF1', 4, 3) + R(150, 116, 28, 76, '#B3E5FC', 2, 2.5) + [130, 150, 170].map((y) => Lc(`M150 ${y}h28`, '#ECEFF1', 2) + R(154, y - 12, 8, 12, '#E53935', 2, 1.5) + R(166, y - 12, 8, 12, '#43A047', 2, 1.5)).join('') + face(90, 186, 0.3)),
  L('gr/athens/landmark-snfcc.v1.svg', 'หลังคาลอยของศูนย์วัฒนธรรมมูลนิธิสตาฟรอส นีอาร์คอส', 'The floating roof of the Stavros Niarchos cultural centre', ['stavros niarchos foundation cultural center', 'snfcc', 'ศูนย์วัฒนธรรมสตาฟรอสนีอาร์คอส', 'floating solar roof', 'หลังคาลอยโซลาร์เซลล์', 'park on a hill', 'สวนบนเนิน', 'canal', 'คลองน้ำ', 'faliro', 'ฟาลีโร', 'lighthouse-free terrace'], 'หาหลังคาแบนบางๆ ที่ลอยอยู่เหนือเนินหญ้า', 'Find the thin flat roof floating above the grassy hill',
    // a gently sloping green park hill rising to a glass building, above it a huge thin flat roof covered in solar panels resting on very thin pillars so it seems to float, a long straight canal in front with a child walking along it
    sky('#B3E5FC') + P('M-4 120h248v124H-4z', '#81C784', 3) + P('M-4 180l200-60 48 0v124H-4z', '#9CCC65', 3)
      + R(140, 86, 90, 40, '#B3E5FC', 0, 3) + Lc('M160 86v40M180 86v40M200 86v40', '#E1F5FE', 2) + [[150, 60], [176, 60], [202, 60], [226, 60]].map(([x, y]) => Lc(`M${x} ${y}v26`, INK, 2)).join('')
      + P('M60 56l184-8v10l-184 8z', '#ECEFF1', 3) + Array.from({ length: 10 }, (_, k) => Lc(`M${74 + k * 17} ${55 - k * 0.7}v6`, '#1565C0', 2)).join('')
      + Array.from({ length: 6 }, (_, k) => C(30 + k * 26, 150 - k * 8, 10, '#43A047', 2)).join('') + P('M-4 220h248v14H-4z', '#4FC3F7', 3) + Lc('M20 227h40M150 227h40', '#E1F5FE', 2)
      + kid(60, 214, '#FF7043', 1.1) + face(160, 166, 0.32)),
  L('gr/athens/landmark-corinthcanal.v1.svg', 'คลองคอรินธ์ ช่องน้ำแคบระหว่างหน้าผาตรง', 'The Corinth Canal between its straight cliffs', ['corinth canal', 'คลองคอรินธ์', 'narrow canal', 'คลองแคบ', 'steep cliffs', 'หน้าผาชัน', 'isthmus', 'คอคอด', 'bridge over the canal', 'สะพานข้ามคลอง', 'peloponnese', 'เพโลพอนนีส'], 'หาเรือลำจิ๋วที่แล่นอยู่ก้นช่องหน้าผาลึก', 'Find the tiny boat sailing at the bottom of the deep cliff slot',
    // looking down a very deep, very narrow straight-sided canal cut through layered sandy-yellow rock, a strip of blue water at the bottom with a tiny boat and its white wake, a slim bridge crossing high above, green land on top
    sky('#E1F5FE') + R(-4, 30, 248, 30, '#9CCC65', 0, 3)
      + P('M-4 60h104l-8 184H-4z', '#E8C07A', 3) + P('M244 60H140l8 184h96z', '#DDB06A', 3) + Lc('M-4 100h100M-4 140h98M-4 180h96M244 100H144M244 140H146M244 180H148', '#C99A4A', 2.5)
      + P('M100 60h40l8 184H92z', '#90CAF9', 0) + P('M98 120h44l6 124H92z', '#1E88E5', 3)
      + g(120, 200, 1, P('M-10 0h20l-4 8h-12z', '#FFFFFF', 2.5) + R(-4, -8, 8, 8, '#E53935', 1, 2) + Lc('M-4 10l-6 30M4 10l6 30', '#E3F2FD', 2.5))
      + R(60, 80, 120, 10, '#B0BEC5', 1, 3) + Lc('M70 80v-10h100v10', '#78909C', 2.5) + Lc('M78 80v-10M96 80v-10M114 80v-10M132 80v-10M150 80v-10', '#78909C', 1.5) + face(40, 150, 0.34)),
  L('gr/athens/landmark-stoa.v1.svg', 'สโตอาแห่งแอตตาลอส ระเบียงเสาสองชั้นในอโกราโบราณ', 'The Stoa of Attalos, the two-storey colonnade in the Ancient Agora', ['stoa of attalos', 'สโตอาแห่งแอตตาลอส', 'ancient agora', 'อโกราโบราณ', 'colonnade', 'ระเบียงเสา', 'two-storey arcade', 'ระเบียงสองชั้น', 'agora museum', 'พิพิธภัณฑ์อโกรา', 'thiseio'], 'หาระเบียงยาวที่มีเสาเรียงกันสองชั้น', 'Find the long porch with two rows of columns, one on top of the other',
    // a long two-storey stone building with a red-tiled roof, a row of plain columns below and a row of slimmer columns above, people-free shady porch, olive trees and a low ruined wall in front, the Acropolis rock-free blue sky
    sky('#BBDEFB') + cloud(200, 36, 0.8) + R(-4, 180, 248, 64, '#D7CCA1', 0, 3)
      + P('M14 74l12-20h200l12 20z', '#D9663A', 3) + R(18, 74, 214, 110, '#F5ECD8', 0, 3) + R(18, 124, 214, 8, '#E8DCC4', 0, 2.5) + R(18, 74, 214, 8, '#E8DCC4', 0, 2.5)
      + Array.from({ length: 10 }, (_, k) => R(28 + k * 21, 84, 7, 40, '#FFFDF7', 2, 2) + R(26 + k * 21, 134, 11, 50, '#FFFDF7', 1, 2.5)).join('')
      + olive(24, 230, 1) + olive(214, 232, 0.9) + R(70, 204, 90, 14, '#E8DCC4', 2, 2.5) + face(126, 156, 0.3)),

  // ---------- Croatia, the country
  K('hr', 'food', 'soparnik', 'โซปาร์นิก พายแผ่นบางไส้ผักชาร์ด', 'Soparnik, the thin chard pie of Dalmatia', ['soparnik', 'โซปาร์นิก', 'swiss chard pie', 'พายผักชาร์ด', 'poljica', 'dalmatia', 'ดัลเมเชีย', 'baked under embers', 'อบใต้ถ่าน', 'garlic and olive oil', 'กระเทียมและน้ำมันมะกอก', 'diamond slices'],
    // a huge thin round pie on a wooden peel, cut into diamond slices, a slice lifted to show the dark green chard filling, brushed with oil and scattered with chopped garlic, an open hearth with glowing embers behind
    R(-4, 30, 248, 70, '#6D4C41', 0, 0) + [[40, 80], [90, 74], [150, 80], [200, 74]].map(([x, y]) => E(x, y, 22, 8, '#FF7043', 2)).join('') + R(-4, 92, 248, 8, '#4E342E', 0, 2.5)
      + Lc('M200 170l40-20', '#A0703F', 10) + E(110, 168, 100, 44, '#C68B59', 3)
      + E(110, 164, 90, 38, '#F2C46D', 3) + Lc('M40 150l140 30M60 186l120-44M30 168h160M70 132l80 66M150 132l-80 66', '#D99A40', 2)
      + g(170, 120, 1, P('M-30 0l30-14 30 14-30 14z', '#F2C46D', 3) + P('M-24 2l24-10 24 10-24 8z', '#2E7D32', 0)) + [[80, 156], [120, 176], [136, 152], [94, 180]].map(([x, y]) => R(x - 2, y - 2, 4, 4, '#FFFFFF', 1, 1)).join('') + face(100, 164, 0.4)),
  K('hr', 'food', 'paskisir', 'ชีสแห่งเกาะปาก', 'Paški sir, the sheep\'s cheese of Pag island', ['paški sir', 'pag cheese', 'ชีสปาก', 'pag island', 'เกาะปาก', 'hard sheep cheese', 'ชีสนมแกะ', 'sage', 'ใบเสจ', 'salty island grass', 'หญ้าเค็มบนเกาะ', 'stone walls'],
    // a round wheel of pale golden cheese with a darker rind and a wedge cut out, a few small cubes, sprigs of grey-green sage, and the bare white rocky island with criss-crossing stone walls behind
    sky('#E1F5FE') + P('M-4 90c40-20 80-14 120-4s80-10 124 0v40H-4z', '#ECEFF1', 3) + Lc('M20 104l40 16M80 96l-10 30M140 100l30 20M200 96l-10 30', '#B0BEC5', 3) + R(-4, 126, 248, 118, '#D7CCC8', 0, 3)
      + g(100, 170, 1, E(0, 20, 76, 22, '#D9A441') + R(-76, -10, 152, 30, '#D9A441', 0, 0) + P('M-76-10v30M76-10v30', 'none', 3) + E(0, -10, 76, 22, '#FFE9A8', 3) + P('M0-10l60-14c10 6 16 10 16 14v30l-76-30z', '#FFF3C4', 3)
        + [[-30, -14], [-10, -2], [20, -16]].map(([x, y]) => C(x, y, 2.5, '#F6D69A', 0)).join('') + face(-24, 10, 0.4))
      + [[190, 196], [212, 210]].map(([x, y]) => R(x - 10, y - 10, 20, 18, '#FFE9A8', 2, 2.5)).join('') + g(196, 150, 1, Lc('M0 30v-40', '#689F38', 3) + [[-10, -10, -60], [10, -4, -120], [-8, 10, -40], [8, 16, -140]].map(([x, y, r]) => leaf(x, y, r, '#9CB89A', 0.6)).join(''))),
  K('hr', 'culture', 'tamburica', 'ทัมบูริตซา เครื่องสายพื้นบ้านโครเอเชีย', 'The tamburica, Croatia\'s little folk lute', ['tamburica', 'ทัมบูริตซา', 'folk lute', 'เครื่องสายพื้นบ้าน', 'slavonia', 'สลาโวเนีย', 'plectrum', 'ปิ๊ก', 'folk band', 'วงดนตรีพื้นบ้าน', 'croatian folk music', 'ดนตรีพื้นบ้านโครเอเชีย'],
    // a small pear-shaped wooden string instrument with a long thin neck and many frets, a painted ring of red flowers round its sound hole, a red ribbon tied to its head, a little plectrum beside it, musical notes floating
    g(118, 130, 1, P('M-36 60c-20-30-12-70 14-84 6-4 10-10 10-16h24c0 6 4 12 10 16 26 14 34 54 14 84-14 18-58 18-72 0z', '#E8B36A') + C(0, 10, 12, '#5D4037', 3) + [0, 60, 120, 180, 240, 300].map((a) => g(0, 10, 1, C(0, -20, 5, '#E53935', 2), a)).join('')
      + R(-6, -120, 12, 98, '#8D5524', 2, 3) + Lc('M-6-110h12M-6-96h12M-6-82h12M-6-68h12M-6-54h12M-6-40h12', '#FFE082', 1.5) + Lc('M-3-118v176M3-118v176', '#ECEFF1', 1.2) + P('M-10-140h20l-2 22h-16z', '#6D4C41', 3) + R(-12, 54, 24, 6, '#4E342E', 2, 2) + face(0, 38, 0.32), 14)
      + Lc('M96 20c-14 4-22 14-20 24M98 20c10 10 10 22 2 30', '#E53935', 4) + P('M170 190l14-10 6 16z', '#FFB300', 2.5)
      + [[54, 70], [190, 60], [196, 110]].map(([x, y]) => C(x, y, 6, INK, 0) + Lc(`M${x + 5} ${y}v-20l8 4`, INK, 2.5)).join('')),
  K('hr', 'food', 'rabcake', 'เค้กราบสกาทอร์ตาทรงเกลียวหอย', 'Rapska torta, the spiral almond cake of Rab', ['rapska torta', 'rab cake', 'เค้กราบ', 'rab island', 'เกาะราบ', 'almond cake', 'เค้กอัลมอนด์', 'spiral pastry', 'แป้งขดเป็นเกลียว', 'cut-out pattern', 'ลายฉลุแป้ง', 'dalmatian sweet'],
    // a round flat cake on a plate with a lacy cut-out pastry top curling into a snail spiral of pastry ribbon, pale golden with darker edges, dusted with sugar, almonds beside it
    plate(196, 100) + g(116, 150, 1, E(0, 6, 76, 32, '#E8A33A') + E(0, 0, 72, 28, '#F6D69A', 3)
      + Lc('M0 0c10-2 14 6 8 10s-22 2-24-8 12-20 28-18 32 12 30 26-20 24-42 22-46-16-44-32', '#E8A33A', 6) + Lc('M0 0c10-2 14 6 8 10s-22 2-24-8 12-20 28-18 32 12 30 26-20 24-42 22-46-16-44-32', INK, 1.5)
      + Array.from({ length: 10 }, (_, k) => C(-60 + k * 13, -4 + (k % 2) * 10, 1.6, '#FFFFFF', 0)).join('') + face(-38, 8, 0.26))
      + [[196, 120], [210, 136], [188, 140]].map(([x, y]) => g(x, y, 1, E(0, 0, 9, 6, '#C68B59', 2) + Lc('M-4-1h6', '#A0703F', 1.5), 30)).join('')),

  // ---------- Dubrovnik and Split
  L('hr/dubrovnik/landmark-orangepeel.v1.svg', 'เปลือกส้มเชื่อมอารันซินีแห่งดูบรอฟนิก', 'Arancini, Dubrovnik\'s candied orange peel', ['arancini', 'arancini dubrovnik', 'อารันซินี', 'candied orange peel', 'เปลือกส้มเชื่อม', 'bitter orange', 'ส้มรสขม', 'sugared sweets', 'ขนมคลุกน้ำตาล', 'dubrovnik sweet', 'ของหวานดูบรอฟนิก', 'konavle'], 'หาเปลือกส้มเป็นเส้นๆ ที่คลุกน้ำตาลวิบวับ', 'Find the sparkly sugared strips of orange peel',
    // a small blue-and-white bowl heaped with curly strips of orange peel glittering with sugar, a few strips on the table, a whole orange with a leaf and a little spiral of peel unwinding from it
    E(116, 204, 96, 16, '#FFF3E0') + g(100, 160, 1, P('M-56-10c0 30 24 46 56 46s56-16 56-46z', '#FFFFFF') + Lc('M-50 6c30 12 70 12 100 0', '#1E88E5', 3) + E(0, -10, 56, 14, '#E3F2FD', 3)
      + [[-36, -26, -30], [-16, -34, 20], [6, -30, -10], [26, -26, 40], [-20, -18, 70], [14, -18, -50], [36, -16, 10], [-4, -40, 80]].map(([x, y, r]) => g(x, y, 1, P('M-4-14c8 4 8 24 0 28-6-4-6-24 0-28z', '#FB8C00', 2) + C(0, -4, 1.4, '#FFFFFF', 0) + C(0, 6, 1.4, '#FFFFFF', 0), r)).join('') + face(0, 18, 0.36))
      + g(190, 128, 1, C(0, 0, 26, '#FB8C00') + leaf(-2, -24, -70, '#388E3C', 0.8) + E(-8, -8, 6, 4, '#FFB74D', 0) + Lc('M20 14c12 6 14 18 6 26s-20 4-18 16', '#FB8C00', 6))
      + [[52, 206, 30], [150, 210, -40]].map(([x, y, r]) => g(x, y, 1, P('M-4-12c8 4 8 20 0 24-6-4-6-20 0-24z', '#FB8C00', 2), r)).join('')),
  L('hr/dubrovnik/landmark-karaka.v1.svg', 'เรือการากาไม้จำลองแห่งดูบรอฟนิก', 'The Karaka, Dubrovnik\'s old wooden sailing ship', ['karaka', 'การากา', 'carrack', 'เรือใบโบราณ', 'ragusa merchant ship', 'เรือสินค้ารากูซา', 'wooden sailing ship', 'เรือไม้ใบเรือ', 'old port', 'ท่าเรือเก่า', 'elaphiti islands trip'], 'หาเรือไม้ท้ายสูงที่มีใบเรือสี่เหลี่ยมป่องลม', 'Find the high-backed wooden ship with puffed-up square sails',
    // a round-bellied wooden ship with a tall stern castle and a raised front, three masts with puffy cream square sails striped in red, little pennants flying, round portholes with a face, the city walls and orange roofs behind, blue sea
    sky('#B3E5FC') + R(-4, 120, 248, 30, '#E8DCC4', 0, 3) + Array.from({ length: 8 }, (_, k) => R(k * 32 - 4, 112, 14, 8, '#E8DCC4', 0, 2.5)).join('') + [[30, 106], [90, 100], [190, 104]].map(([x, y]) => P(`M${x - 16} ${y + 14}l16-12 16 12z`, '#E07B39', 2.5)).join('')
      + R(-4, 150, 248, 94, '#1E88E5', 0, 3)
      + g(120, 176, 1, P('M-90-20h180c-4 30-30 50-90 50s-86-20-90-50z', '#8D5524') + P('M50-20v-30h44l-4 30z', '#A0703F', 3) + P('M-90-20l-10-20h30l4 20z', '#A0703F', 3) + Lc('M-84-8h170', '#6D3F18', 3) + [-50, -20, 10].map((x) => C(x, 4, 5, '#FFD54F', 2)).join('')
        + [[-50, 110, 34], [0, 140, 40], [60, 100, 28]].map(([x, h, w]) => Lc(`M${x}-20v-${h}`, '#6D4C41', 4) + P(`M${x - w}-${h - 14}c${w * 0.4}-10 ${w * 1.6}-10 ${w * 2} 0l-4 ${h * 0.4}c-${w * 0.5} 8-${w * 1.4} 8-${w * 1.9} 0z`, '#FFF8E1', 2.5) + Lc(`M${x - w + 4}-${h - 30}h${w * 2 - 8}`, '#E53935', 4) + P(`M${x}-${h}l16 4-16 6z`, '#E53935', 2)).join('') + face(40, 0, 0.32))
      + waves(220, '#BBDEFB')),
  L('hr/dubrovnik/landmark-maskeron.v1.svg', 'หน้าหินมาสเกรอนที่เด็กๆ พยายามยืนทรงตัว', 'The stone face on the wall you try to balance on', ['maskeron', 'มาสเกรอน', 'stone face', 'หน้าคนหิน', 'balance challenge', 'ท้าทรงตัว', 'franciscan monastery wall', 'กำแพงอารามฟรานซิสกัน', 'stradun', 'old town game', 'เกมในเมืองเก่า'], 'หาหน้าคนหินที่ยื่นออกมาจากกำแพงเตี้ยๆ ใกล้พื้น', 'Find the stone face sticking out of the wall just above the ground',
    // a big old wall of pale stone blocks, low down a carved stone head sticking out like a little shelf, a child balancing on it with arms out wide and face to the wall, wobble lines, the shiny stone street below
    sky('#FFF8E1') + R(-4, -4, 248, 200, '#EFE6D2', 0, 0) + Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => R(c * 52 - 30 + (r % 2) * 26, r * 40, 50, 38, '#E8DCC4', 3, 2.5)).join('')).join('') + R(-4, 196, 248, 48, '#ECEFF1', 0, 3) + Lc('M20 214h60M140 226h70', '#FFFFFF', 3)
      + g(110, 178, 1, P('M-22 0c0-20 8-28 22-28s22 8 22 28l-4 10h-36z', '#D7CCC8', 3) + P('M-14-6c4-2 8-2 10 0M4-6c4-2 8-2 10 0', 'none', 2.5) + P('M-4 0l4 6 4-6', 'none', 2.5) + P('M-10 4c6 4 14 4 20 0', 'none', 2.5) + E(-14, 2, 5, 3, '#FF8FA3', 0))
      + g(110, 150, 1.6, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#29B6F6', 2) + Lc('M-8-8l-18-6M8-8l18-6', '#FFE0BD', 3) + Lc('M-4 4v12M4 4v12', INK, 2.5) + C(0, -24, 7, '#5D4037', 0))
      + Lc('M60 120c-6 6-6 14 0 20M160 120c6 6 6 14 0 20', INK, 3)),
  L('hr/dubrovnik/landmark-rupe.v1.svg', 'บ่อเก็บเมล็ดพืชยักษ์ในหินที่พิพิธภัณฑ์รูเป', 'The giant grain pits carved in the rock at Rupe', ['rupe', 'รูเป', 'grain pits', 'บ่อเก็บเมล็ดพืช', 'granary museum', 'พิพิธภัณฑ์ยุ้งฉาง', 'ethnographic museum', 'พิพิธภัณฑ์ชาติพันธุ์', 'carved in rock', 'แกะในหิน', 'old town dubrovnik'], 'หาบ่อรูปขวดยักษ์ที่ขุดลึกลงไปในหิน', 'Find the giant bottle-shaped pits dug deep into the rock',
    // a cutaway view: a stone building on top, and below its floor three huge bottle-shaped pits hollowed out of the rock, filled with golden grain, round stone lids, a ladder going down into one and a child peeking in
    sky('#E1F5FE') + R(30, 20, 180, 60, '#EFE6D2', 0, 3) + P('M24 22l96-20 96 20z', '#E07B39', 3) + [60, 100, 140, 180].map((x) => R(x - 8, 36, 16, 22, '#5D4037', 6, 2)).join('')
      + R(-4, 80, 248, 164, '#C9B48E', 0, 3) + Lc('M-4 80h248', INK, 3)
      + [[50, 1], [120, 1.2], [190, 1]].map(([x, s]) => g(x, 80, s, R(-8, -4, 16, 10, '#9E9E9E', 3, 2.5) + P('M-6 6c-30 20-34 90 6 100s36-80 6-100z', '#8D6E63', 3) + P('M-26 50c4-10 46-10 50 0 0 40-12 54-24 54s-28-12-26-54z', '#FFCA28', 2.5) + [[-10, 70], [6, 64], [-4, 86], [10, 84]].map(([a, b]) => C(a, b, 2, '#E8A33A', 0)).join(''))).join('')
      + Lc('M110 80l-4 60M126 80l4 60M108 96h20M108 112h20M108 128h20', '#6D4C41', 3) + kid(160, 78, '#E53935', 1.1) + face(120, 166, 0.3)),
  L('hr/dubrovnik/landmark-picigin.v1.svg', 'เกมปิซิกินตีลูกบอลในน้ำตื้นที่หาดบัชวิเซ', 'Picigin, the splashy ball game in the shallows of Split', ['picigin', 'ปิซิกิน', 'bačvice', 'bacvice', 'หาดบัชวิเซ', 'split', 'สปลิต', 'shallow water ball game', 'เกมตีบอลในน้ำตื้น', 'keep the ball up', 'ห้ามบอลตกน้ำ', 'sandy beach'], 'หาลูกบอลเล็กๆ ที่ลอยอยู่กลางอากาศเหนือน้ำตื้น', 'Find the little ball flying in the air over the shallow water',
    // ankle-deep turquoise water on a sandy beach, three children in a circle leaping and diving to keep a small ball in the air with flat hands, big splashes, a palm-lined shore and the town behind
    sky('#B3E5FC') + R(-4, 70, 248, 30, '#FFE0B2', 0, 3) + [[20, 70], [200, 70]].map(([x]) => Lc(`M${x} 74c2-14-2-24 2-34`, '#8D6E63', 4) + P(`M${x - 18} 40c10-10 26-10 36 0-12 0-24 4-36 0z`, '#43A047', 2)).join('') + R(60, 46, 120, 26, '#FFF8E1', 0, 2.5)
      + R(-4, 96, 248, 148, '#4DD0E1', 0, 3) + Lc('M10 130c14-4 28 4 42 0M180 120c14-4 28 4 42 0', '#E0F7FA', 3)
      + C(126, 64, 9, '#FFFFFF', 2.5) + C(126, 64, 3, '#FF7043', 0)
      + [[64, 180, -20, '#E53935'], [176, 176, 20, '#FFCA28'], [120, 214, 0, '#7E57C2']].map(([x, y, r, c]) => g(x, y, 1.6, C(0, -22, 8, '#FFE0BD', 2) + P('M-8 2v-16h16v16z', c, 2) + Lc('M-8-12l-10-18M8-12l10-18', '#FFE0BD', 3) + face(0, -22, 0.2), r) + Lc(`M${x - 24} ${y + 10}c-8-10 0-18 8-16M${x + 24} ${y + 10}c8-10 0-18-8-16`, '#E0F7FA', 3)).join('')),

  // ---------- Plitvice and Zagreb
  L('hr/plitvice/landmark-stmarkroof.v1.svg', 'หลังคากระเบื้องลายตราของโบสถ์เซนต์มาร์กแห่งซาเกร็บ', 'The patterned tile roof of St Mark\'s in Zagreb', ['st mark\'s church', 'crkva svetog marka', 'โบสถ์เซนต์มาร์ก', 'tiled roof', 'หลังคากระเบื้องลาย', 'coat of arms roof', 'ตราบนหลังคา', 'upper town', 'gornji grad', 'เมืองบน', 'zagreb'], 'หาหลังคาที่ปูกระเบื้องเป็นตราหมากรุกแดงขาว', 'Find the roof tiled with a red-and-white checked shield',
    // a small old church seen from the side with a steep roof of glazed tiles making two big pictures: a red-and-white checkerboard shield and a white castle on red, a squat bell tower with a green spire-free cap, a cobbled square
    sky('#E1F5FE') + R(-4, 196, 248, 48, '#BDBDBD', 0, 3) + Lc('M20 214h40M100 226h50M180 212h40', '#9E9E9E', 2)
      + R(30, 134, 170, 64, '#EFE6D2', 0, 3) + [60, 110, 160].map((x) => P(`M${x - 8} 180v-26c0-12 16-12 16 0v26z`, '#5D4037', 2.5)).join('')
      + P('M24 136l40-80h104l40 80z', '#1B5E20', 3) + Lc('M50 110h132M38 124h156M62 80h108M74 66h84', '#2E7D32', 2)
      + g(84, 102, 1, P('M-22-26h44v24c0 16-10 26-22 30-12-4-22-14-22-30z', '#FFFFFF', 3) + [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => ((r + c) % 2 ? '' : R(-22 + c * 11, -26 + r * 11, 11, 11, '#E53935', 0, 0))).join('')).join('') + P('M-22-26h44v24c0 16-10 26-22 30-12-4-22-14-22-30z', 'none', 3))
      + g(150, 102, 1, P('M-22-26h44v24c0 16-10 26-22 30-12-4-22-14-22-30z', '#E53935', 3) + P('M-14 10v-20h6v-6h4v6h8v-6h4v6h6v20z', '#FFFFFF', 2) + P('M-4 10v-8c0-6 8-6 8 0v8z', '#E53935', 1.5))
      + R(200, 70, 32, 128, '#EFE6D2', 0, 3) + P('M196 72c0-20 40-20 40 0z', '#43A047', 3) + R(208, 90, 16, 22, '#5D4037', 8, 2) + face(216, 140, 0.26)),
  L('hr/plitvice/landmark-lamplighter.v1.svg', 'คนจุดตะเกียงแก๊สตอนพลบค่ำในซาเกร็บ', 'The lamplighter of Zagreb\'s Upper Town', ['lamplighter', 'nažigač', 'คนจุดตะเกียง', 'gas lamps', 'ตะเกียงแก๊ส', 'upper town', 'gornji grad', 'เมืองบน', 'dusk', 'พลบค่ำ', 'zagreb street', 'ถนนซาเกร็บ'], 'หาไม้ยาวที่ยื่นขึ้นไปจุดไฟในโคมถนน', 'Find the long pole reaching up to light the street lamp',
    // a lilac dusk street of old pastel houses, an old iron street lamp just lit with a warm glow, a lamplighter in a cap and coat reaching up to it with a long pole, a second lamp still dark further down, first star in the sky
    sky('#9FA8DA') + C(200, 30, 3, '#FFFDE7', 0) + C(40, 50, 2.5, '#FFFDE7', 0) + R(-4, 70, 90, 140, '#F8BBD0', 0, 3) + R(150, 60, 98, 150, '#FFE0B2', 0, 3) + [[14, 100], [50, 100], [14, 150], [50, 150], [170, 90], [210, 90], [170, 140], [210, 140]].map(([x, y]) => R(x, y, 18, 26, '#5C6BC0', 2, 2)).join('')
      + R(-4, 206, 248, 38, '#9E9E9E', 0, 3) + Lc('M20 222h40M120 230h50', '#757575', 2)
      + g(110, 206, 1, Lc('M0 0v-120', '#37474F', 6) + R(-10, -4, 20, 8, '#37474F', 2, 2) + P('M-14-120h28l-4-26h-20z', '#FFF59D', 3) + P('M-18-146h36l-18-14z', '#37474F', 3) + C(0, -134, 24, '#FFF59D', 0).replace('fill=', 'opacity=".4" fill='))
      + g(206, 206, 0.6, Lc('M0 0v-120', '#37474F', 6) + P('M-14-120h28l-4-26h-20z', '#CFD8DC', 3) + P('M-18-146h36l-18-14z', '#37474F', 3))
      + g(160, 204, 1.4, C(0, -26, 8, '#FFE0BD', 2) + P('M-10-34h20l-2-6h-16z', '#455A64', 2) + P('M-10 4v-22h20v22z', '#5D4037', 2) + Lc('M-4 4v12M4 4v12', INK, 2.5) + Lc('M-8-14l-14-14', '#FFE0BD', 3) + face(0, -26, 0.2))
      + Lc('M140 166l-26-80', '#8D6E63', 3) + C(114, 84, 4, '#FF7043', 1.5)),
  L('hr/plitvice/landmark-sundew.v1.svg', 'หยาดน้ำค้างพืชกินแมลงในพรุพลิตวิเซ', 'A sundew, the sticky little plant of the Plitvice bogs', ['sundew', 'drosera', 'หยาดน้ำค้าง', 'carnivorous plant', 'พืชกินแมลง', 'sticky drops', 'หยดเหนียว', 'peat bog', 'พรุ', 'čorkova uvala', 'mossy wetland', 'พื้นที่ชุ่มน้ำมีมอส'], 'หาใบกลมที่มีขนสีแดงและหยดน้ำใสวาวที่ปลาย', 'Find the round leaves with red hairs and shiny drops on the tips',
    // a cushion of bright green moss with a little rosette of round spoon-shaped leaves covered in red hairs each tipped with a glistening clear drop, a thin stalk with tiny white flowers rising from the middle
    sky('#E8F5E9') + E(120, 200, 110, 40, '#7CB342', 3) + [[30, 186], [60, 176], [180, 178], [214, 190]].map(([x, y]) => C(x, y, 10, '#8BC34A', 2)).join('')
      + Lc('M120 170c-4-40 4-80 0-120', '#558B2F', 3) + [[120, 50], [114, 62], [126, 72]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 2)).join('')
      + [-160, -115, -70, -25, 20, 65, 110, 155].map((a) => g(120, 172, 1, Lc('M0 0h40', '#7CB342', 3) + C(52, 0, 14, '#C62828', 2.5) + [-45, 0, 45].map((t) => Lc(`M${(52 + 14 * Math.cos(t * Math.PI / 180)).toFixed(1)} ${(14 * Math.sin(t * Math.PI / 180)).toFixed(1)}l${(8 * Math.cos(t * Math.PI / 180)).toFixed(1)} ${(8 * Math.sin(t * Math.PI / 180)).toFixed(1)}`, '#E53935', 1.5) + C(52 + 23 * Math.cos(t * Math.PI / 180), 23 * Math.sin(t * Math.PI / 180), 2.2, '#E1F5FE', 1)).join(''), a)).join('')
      + C(120, 172, 16, '#8BC34A', 2.5) + face(120, 170, 0.28)),
  L('hr/plitvice/landmark-stagbeetle.v1.svg', 'ด้วงคีมใหญ่บนขอนต้นบีช', 'A stag beetle on a beech log', ['stag beetle', 'ด้วงคีม', 'lucanus', 'big jaws', 'เขี้ยวใหญ่', 'beech forest', 'ป่าบีช', 'old log', 'ขอนไม้เก่า', 'forest insect', 'แมลงในป่า', 'plitvice woods'], 'หาด้วงตัวใหญ่ที่มีเขี้ยวเหมือนเขากวาง', 'Find the big beetle with jaws like deer antlers',
    // a big shiny dark-brown beetle with long reddish antler-like jaws, a round shell with a shine line, six little legs, standing on a mossy beech log with a few beech leaves and a small mushroom
    sky('#F1F8E9') + R(10, 170, 220, 40, '#A1887F', 20, 3) + E(220, 190, 14, 20, '#D7CCC8', 3) + E(220, 190, 7, 10, 'none', 2) + P('M30 172c20-10 50-10 70 0', '#8BC34A', 3) + g(46, 172, 1, P('M-8 0v-12h16v12z', '#FFF8E1', 2) + P('M-16-12c0-14 32-14 32 0z', '#E53935', 2.5))
      + [[30, 120, 30], [196, 130, 150]].map(([x, y, r]) => leaf(x, y, r, '#9CCC65', 1.2)).join('')
      + g(130, 136, 1, [-1, 1].map((d) => Lc(`M${18 * d} -10l${14 * d} 10M${22 * d} 4l${16 * d} 12M${18 * d} 18l${12 * d} 16`, INK, 3)).join('')
        + E(0, 14, 30, 30, '#4E342E') + Lc('M0-14v58', '#3E2723', 2) + P('M-14 0c2-10 8-14 12-14', 'none', 2.5).replace('fill="none"', 'fill="none" stroke="#A1887F"') + E(0, -24, 20, 12, '#5D4037', 3)
        + P('M-12-32c-14-10-20-26-12-40 2 10 10 14 16 10-8 8-4 18 2 24z', '#A0522D', 2.5) + P('M12-32c14-10 20-26 12-40-2 10-10 14-16 10 8 8 4 18-2 24z', '#A0522D', 2.5) + face(0, -26, 0.28).replace(/fill="#22213A"/g, 'fill="#FFFFFF"'))),
  L('hr/plitvice/landmark-degenia.v1.svg', 'ดอกเดเจเนียแห่งเทือกเขาเวเลบิต', 'Degenia, the silver flower found only on Velebit', ['degenia velebitica', 'degenia', 'ดอกเดเจเนีย', 'velebit mountain', 'เทือกเขาเวเลบิต', 'rare flower', 'ดอกไม้หายาก', 'grows only in croatia', 'มีแค่ในโครเอเชีย', 'limestone rocks', 'หินปูน', 'zavižan botanical garden'], 'หาดอกไม้สีเหลืองสี่กลีบกับใบสีเงินที่ขึ้นจากซอกหิน', 'Find the yellow four-petal flowers and silver leaves growing from a crack in the rock',
    // a cushion of silvery-grey narrow leaves growing out of a crack in pale limestone rocks, with stems of bright yellow four-petal flowers, blue Velebit mountains and the sea far behind
    sky('#E1F5FE') + P('M-4 90l40-30 40 20 50-40 50 30 68-10v40H-4z', '#7986CB', 3) + R(-4, 100, 248, 20, '#64B5F6', 0, 3)
      + P('M-4 244V140c30-20 70-14 100 0 30-20 80-24 148-8v112z', '#ECEFF1', 3) + Lc('M110 150l10 40-6 54M40 170l20 30M190 160l-10 40', '#B0BEC5', 3)
      + Array.from({ length: 9 }, (_, k) => g(118, 190, 1, E(0, -22, 6, 24, '#B0BEC5', 2), -80 + k * 20)).join('')
      + [[86, 120, -20], [118, 100, 0], [152, 116, 20], [100, 140, -10], [140, 138, 14]].map(([x, y, r]) => Lc(`M118 176L${x} ${y}`, '#9E9D24', 2.5) + g(x, y, 1, [0, 90, 180, 270].map((a) => g(0, 0, 1, E(0, -7, 5, 7, '#FFEB3B', 2), a + 45)).join('') + C(0, 0, 3, '#F9A825', 1.5), r)).join('')
      + face(118, 186, 0.28)),

  // ---------- Malta, the country
  K('mt', 'culture', 'ghonnella', 'ฆอนเนลลา ผ้าคลุมหัวสีดำแบบมอลตา', 'The għonnella, Malta\'s old black hooded cape', ['għonnella', 'ghonnella', 'ฆอนเนลลา', 'black hooded cape', 'ผ้าคลุมสีดำมีฮูด', 'stiff hood', 'ฮูดแข็งโค้ง', 'maltese costume', 'ชุดดั้งเดิมมอลตา', 'old valletta', 'วัลเลตตาสมัยก่อน'],
    // a lady in an old-fashioned black silk cape whose stiffened hood curves out over her head like a big scoop, held open with one hand, a pale dress underneath, a limestone wall and a green wooden balcony behind
    sky('#FFF8E1') + R(-4, 20, 248, 200, '#F2D9A8', 0, 0) + Lc('M-4 80h248M-4 140h248M60 20v60M140 80v60M200 20v60M40 140v80', '#E0C38A', 2) + R(150, 40, 80, 50, '#2E7D32', 2, 3) + Lc('M160 40v50M180 40v50M200 40v50M220 40v50', '#1B5E20', 2) + R(-4, 210, 248, 34, '#BCAAA4', 0, 3)
      + g(104, 150, 1, P('M-30 70c4-40 10-60 30-60s26 20 30 60z', '#F5F5F5') + C(0, -6, 16, '#FFE0BD', 2.5) + face(0, -4, 0.32)
        + P('M-50 80c-6-60 0-120 30-140 40-14 80 0 86 30-30-14-54-6-60 10-10 20-14 60-10 100z', '#263238', 3) + P('M-20-60c30-10 66 0 76 26', 'none', 2.5).replace('fill="none"', 'fill="none" stroke="#546E7A"') + Lc('M46-30l10 20', '#FFE0BD', 5))),
  K('mt', 'culture', 'ganutell', 'ดอกไม้ลวดพันไหมกานูเตลล์', 'Ganutell, Maltese flowers of wire and silk thread', ['ganutell', 'กานูเตลล์', 'wire and silk flowers', 'ดอกไม้ลวดพันไหม', 'maltese craft', 'งานฝีมือมอลตา', 'shiny thread', 'ด้ายมันวาว', 'handmade flowers', 'ดอกไม้ทำมือ', 'ta\' qali crafts village'],
    // a little vase holding three shiny flowers made of twisted wire wrapped in bright silk thread — open petals outlined in loops with thread stripes inside — spools of coloured thread and a coil of wire beside it
    E(120, 210, 96, 14, '#ECEFF1') + g(100, 170, 1, P('M-24 40c-10-20-10-40 0-50h48c10 10 10 30 0 50z', '#4FC3F7') + E(0, -10, 24, 6, '#81D4FA', 3) + face(0, 18, 0.3))
      + [[70, 80, '#E91E63', -16], [110, 60, '#FFB300', 0], [146, 88, '#7E57C2', 18]].map(([x, y, c, r]) => Lc(`M100 160L${x} ${y}`, '#43A047', 3) + g(x, y, 1, [0, 60, 120, 180, 240, 300].map((a) => g(0, 0, 1, P('M0-4c-10-10-10-24 0-26 10 2 10 16 0 26z', c, 2.5) + Lc('M-3-10v-10M3-10v-10', '#FFFFFF', 1.2), a)).join('') + C(0, 0, 5, '#FFF59D', 2), r)).join('')
      + [[180, 196, '#E91E63'], [204, 186, '#29B6F6']].map(([x, y, c]) => R(x - 9, y - 14, 18, 26, c, 2, 2.5) + R(x - 12, y - 18, 24, 6, '#D7B07A', 2, 2) + R(x - 12, y + 12, 24, 6, '#D7B07A', 2, 2)).join('') + Lc('M30 200c0-10 16-10 16 0s-16 10-16 0 16-14 24-8', '#B0BEC5', 2.5)),
  K('mt', 'food', 'figolla', 'ฟิกอลลา ขนมอัลมอนด์รูปผีเสื้อแต่งไอซิ่ง', 'A figolla, the iced almond pastry shape', ['figolla', 'figolli', 'ฟิกอลลา', 'almond pastry', 'ขนมไส้อัลมอนด์', 'iced biscuit', 'คุกกี้แต่งไอซิ่ง', 'butterfly shape', 'รูปผีเสื้อ', 'maltese spring treat', 'ขนมฤดูใบไม้ผลิมอลตา', 'coloured icing'],
    // a big butterfly-shaped pastry covered in pale pink icing with bright piped patterns in yellow, blue and green, tiny sugar balls along its edges, on a doily plate, a little heart-shaped one beside it
    plate(204, 100) + g(110, 128, 1, [-1, 1].map((d) => P(`M0 0c${-20 * d}-40 ${-70 * d}-60 ${-80 * d}-30s${20 * d} 40 ${80 * d} 30c${-60 * d} 10 ${-70 * d} 40 ${-50 * d} 56s${40 * d} 0 ${50 * d}-56z`, '#F8BBD0', 3) + C(-50 * d, -26, 12, '#FFF59D', 2.5) + C(-36 * d, 34, 9, '#81D4FA', 2.5) + Lc(`M${-20 * d}-10l${-30 * d}-20M${-16 * d} 10l${-24 * d} 18`, '#66BB6A', 3)).join('')
      + E(0, 6, 10, 34, '#FFE082', 3) + Lc('M-4-28l-10-20M4-28l10-20', INK, 2.5) + face(0, -2, 0.22))
      + g(200, 178, 1, P('M0 18c-30-18-26-40-12-40 6 0 10 4 12 8 2-4 6-8 12-8 14 0 18 22-12 40z', '#FFFFFF', 3) + C(-8, -8, 2, '#E91E63', 0) + C(8, -8, 2, '#29B6F6', 0) + C(0, 4, 2, '#FFB300', 0))),

  // ---------- Valletta and Gozo
  L('mt/valletta/landmark-ghardalam.v1.svg', 'ถ้ำฆาร์ดาลัมกับกระดูกฮิปโปแคระ', 'Għar Dalam, the cave of the dwarf hippos', ['għar dalam', 'ghar dalam', 'ถ้ำฆาร์ดาลัม', 'cave of darkness', 'ถ้ำแห่งความมืด', 'dwarf hippo bones', 'กระดูกฮิปโปแคระ', 'ice age animals', 'สัตว์ยุคน้ำแข็ง', 'birżebbuġa', 'museum cave'], 'หากะโหลกฮิปโปตัวเล็กในตู้กระจกหน้าปากถ้ำ', 'Find the little hippo skull in the glass case by the cave mouth',
    // the wide dark mouth of a limestone cave with a wooden walkway going in, and in front a glass case holding a small round hippo skull with stubby teeth and a few bones, a curious child looking in
    sky('#E1F5FE') + P('M-4 244V60c60-40 180-40 248 0v184z', '#D7B98C', 3) + P('M30 200c0-80 40-120 90-120s90 40 90 120z', '#4E342E', 3) + P('M50 190c10-50 40-80 70-80s60 30 70 80z', '#3E2723', 0)
      + Lc('M80 200l30-60h20l30 60', '#A1887F', 6) + R(-4, 200, 248, 44, '#E0C9A6', 0, 3)
      + g(70, 196, 1, R(-40, -50, 80, 50, '#E1F5FE', 4) + Lc('M-30-44l14 14M10-46l20 20', '#FFFFFF', 3) + R(-46, 0, 92, 14, '#8D6E63', 2, 3)
        + P('M-26-6c0-20 14-30 30-30s24 10 22 22c-4 10-14 8-20 8z', '#FFF8E1', 2.5) + C(0, -24, 4, INK, 0) + [-18, -10].map((x) => R(x, -10, 4, 6, '#FFF8E1', 1, 1.5)).join('') + Lc('M12-8h16M14-2h12', '#FFF8E1', 4))
      + kid(160, 226, '#43A047', 1.5) + Lc('M146 200l-16-10', '#FFE0BD', 3) + face(120, 64, 0.3)),
  L('mt/valletta/landmark-cartruts.v1.svg', 'ร่องล้อเกวียนโบราณบนลานหินมิสราห์ฆาร์ฮ์ดิน', 'The mysterious ancient cart ruts on the rocks', ['cart ruts', 'ร่องล้อเกวียนโบราณ', 'clapham junction', 'misraħ għar il-kbir', 'มิสราห์ฆาร์ฮ์ดิน', 'ancient grooves', 'ร่องหินโบราณ', 'limestone plateau', 'ลานหินปูน', 'dingli', 'mystery tracks'], 'หาร่องคู่ขนานยาวๆ ที่ตัดกันไปมาบนพื้นหิน', 'Find the long pairs of grooves crossing each other on the rock',
    // a wide pale limestone plateau scored with several pairs of deep parallel grooves curving and crossing like railway tracks, a child walking along inside one groove, low wild thyme bushes, the sea on the horizon
    sky('#B3E5FC') + R(-4, 80, 248, 20, '#42A5F5', 0, 3) + P('M-4 96h248v148H-4z', '#E8DCC4', 3)
      + [[-4, 200, 244, 120], [20, 244, 200, 104], [-4, 140, 244, 236]].map(([x1, y1, x2, y2]) => Lc(`M${x1} ${y1}Q120 ${(y1 + y2) / 2 - 20} ${x2} ${y2}`, '#A1887F', 7) + Lc(`M${x1} ${y1 + 22}Q120 ${(y1 + y2) / 2 + 2} ${x2} ${y2 + 22}`, '#A1887F', 7)).join('')
      + [[30, 120], [200, 150], [60, 228], [214, 214]].map(([x, y]) => C(x, y, 10, '#9C8CB0', 2) + C(x + 8, y + 4, 6, '#81C784', 1.5)).join('')
      + kid(130, 172, '#FF7043', 1.4) + face(90, 214, 0.3)),
  L('mt/valletta/landmark-stpeterspool.v1.svg', 'สระธรรมชาติเซนต์ปีเตอร์บนโขดหินริมทะเล', 'St Peter\'s Pool, the natural rock swimming pool', ['st peter\'s pool', 'il-għar ta\' san pietru', 'สระเซนต์ปีเตอร์', 'natural pool', 'สระธรรมชาติ', 'rock jumping', 'กระโดดจากโขดหิน', 'flat limestone ledges', 'ลานหินแบน', 'marsaxlokk', 'deep blue water', 'น้ำทะเลสีน้ำเงินเข้ม'], 'หาเด็กที่กำลังกระโดดลงน้ำสีน้ำเงินจากหินแบนๆ', 'Find the child jumping from the flat rocks into the deep blue water',
    // flat honey-coloured limestone ledges curving round a deep round cove of clear blue water, a metal ladder down the side, towels laid out on the rock, a child mid-jump with arms up, a splash ring below
    sky('#B3E5FC') + R(-4, 30, 248, 40, '#1E88E5', 0, 3) + P('M-4 70h248v174H-4z', '#E8C88A', 3) + Lc('M-4 96h248', '#D7B06A', 2)
      + P('M50 110c0-10 140-10 140 0 10 60 0 110-70 120-70-10-80-60-70-120z', '#1565C0', 3) + P('M70 120c20-6 80-6 100 0', '#42A5F5', 0) + E(120, 200, 26, 8, 'none', 2.5) + E(120, 200, 40, 12, 'none', 2)
      + Lc('M184 120v40M196 120v40M184 132h12M184 146h12', '#B0BEC5', 3) + [[22, 150, '#E53935'], [214, 200, '#FFCA28']].map(([x, y, c]) => R(x - 14, y - 22, 28, 44, c, 3, 2.5) + Lc(`M${x - 14} ${y - 8}h28M${x - 14} ${y + 6}h28`, '#FFFFFF', 3)).join('')
      + g(120, 128, 1.5, C(0, -22, 8, '#FFE0BD', 2) + P('M-8 2v-16h16v16z', '#7E57C2', 2) + Lc('M-8-12l-8-16M8-12l8-16', '#FFE0BD', 3) + Lc('M-4 2l-4 12M4 2l4 12', '#FFE0BD', 3) + face(0, -22, 0.2))),
  L('mt/valletta/landmark-barrakka.v1.svg', 'ซุ้มโค้งของสวนอัปเปอร์บาร์รักกาเหนืออ่าวแกรนด์ฮาร์เบอร์', 'The arches of the Upper Barrakka Gardens over the harbour', ['upper barrakka gardens', 'อัปเปอร์บาร์รักกา', 'arched terrace', 'ระเบียงซุ้มโค้ง', 'grand harbour view', 'วิวอ่าวแกรนด์ฮาร์เบอร์', 'three cities', 'สามเมือง', 'garden fountain', 'น้ำพุในสวน', 'valletta viewpoint'], 'หาซุ้มโค้งหินที่ทำเป็นกรอบรูปให้วิวอ่าวข้างล่าง', 'Find the stone arches that frame the harbour view like windows',
    // looking out through a row of tall honey-stone arches on a garden terrace: through them the blue harbour and the old fortified towns on the far shore, a round fountain basin and potted palms in the garden
    sky('#B3E5FC') + R(-4, 70, 248, 70, '#1E88E5', 0, 3) + P('M-4 90c40-10 80-6 120-14 40 4 80 0 128 10v20H-4z', '#E8C88A', 3) + [[30, 80], [80, 74], [150, 72], [200, 80]].map(([x, y]) => R(x - 10, y - 14, 20, 16, '#F2D9A8', 0, 2)).join('') + Lc('M20 120c14-4 28 4 42 0M150 126c14-4 28 4 42 0', '#BBDEFB', 3)
      + R(-4, -4, 248, 34, '#E8C88A', 0, 3) + [[-4, 18], [76, 18], [156, 18], [236, 18]].map(([x, w]) => R(x - 4, 30, w + 8, 120, '#E8C88A', 0, 3)).join('') + [24, 104, 184].map((x) => P(`M${x - 10} 30h72c0 0-4 30-36 30s-36-30-36-30z`, '#E8C88A', 0)).join('')
      + [24, 104, 184].map((x) => P(`M${x - 10} 150V64c0-24 72-24 72 0`, 'none', 3)).join('')
      + R(-4, 150, 248, 94, '#D7CCC8', 0, 3) + E(120, 196, 50, 16, '#B0BEC5', 3) + E(120, 192, 40, 10, '#4FC3F7', 2.5) + Lc('M120 190c-2-14 2-20 0-26', '#E1F5FE', 3)
      + [[30, 216], [210, 216]].map(([x, y]) => P(`M${x - 12} ${y}h24l-4 20h-16z`, '#C9714A', 2.5) + [-50, -10, 30].map((r) => g(x, y - 2, 1, P('M0 0c4-14 18-20 26-16-8 4-16 10-26 16z', '#43A047', 2), r - 60)).join('')).join('') + face(120, 176, 0.3)),
  L('mt/valletta/landmark-girna.v1.svg', 'กระท่อมหินกลมกีร์นาในทุ่งมอลตา', 'A girna, the round dry-stone field hut', ['girna', 'ġirna', 'กีร์นา', 'dry-stone hut', 'กระท่อมหินแห้ง', 'corbelled roof', 'หลังคาหินเรียงซ้อน', 'maltese countryside', 'ชนบทมอลตา', 'rubble walls', 'กำแพงหินเรียง', 'farmers shelter'], 'หากระท่อมหินกลมที่มีหลังคาเป็นโดมหินซ้อนกัน', 'Find the round stone hut with a roof of stacked stones like a beehive',
    // a round squat hut built of stacked stones with a beehive-shaped stone roof and a low square doorway, in a terraced field edged by dry-stone walls, red poppy-free wild fennel, a blue sky
    sky('#BBDEFB') + cloud(190, 40, 0.8) + P('M-4 120c60-14 180-14 248 0v124H-4z', '#C5A86A', 3) + Lc('M-4 150c60-8 180-8 248 0', '#B08F50', 3) + R(-4, 196, 248, 48, '#AED581', 0, 3)
      + g(120, 196, 1, P('M-60 0v-50c0-50 120-50 120 0v50z', '#E0C9A6') + Array.from({ length: 5 }, (_, r) => Array.from({ length: 6 - r }, (_, c) => E(-50 + r * 10 + c * 20, -10 - r * 18, 10, 7, '#D7B98C', 2)).join('')).join('') + P('M-60 0v-50c0-50 120-50 120 0v50z', 'none', 3)
        + R(-14, -36, 28, 36, '#4E342E', 2, 3) + R(-18, -40, 36, 6, '#BCAAA4', 1, 2.5) + face(0, -66, 0.3))
      + [[-4, 214], [180, 214]].map(([x, y]) => Array.from({ length: 4 }, (_, k) => E(x + 12 + k * 18, y, 9, 6, '#BCAAA4', 2)).join('')).join('')
      + [[30, 190], [210, 186]].map(([x, y]) => Lc(`M${x} ${y}v-30M${x - 8} ${y}l-6-26M${x + 8} ${y}l6-26`, '#7CB342', 2.5) + C(x, y - 32, 5, '#FFEB3B', 1.5)).join('')),
];

export default { places: {}, items };
