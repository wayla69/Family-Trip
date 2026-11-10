// Wave 9, south (1): Italy — the country layer, Rome, Venice, Florence and Tuscany, Milan, the Amalfi Coast, the Dolomites, Sicily, the Cinque Terre
import { P, R, C, E, Lc, g, face, free, scene, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (it/rome/landmark-trajan.v1.svg → it-rome.landmark.trajan)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture: <cc>.<cat>.<key> in <cc>/<cat>-<key>.v1.svg
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const cloud = (x, y, s = 1) => g(x, y, s, P('M-24 6c-10 0-10-14 0-14 2-10 18-12 22-4 6-8 22-4 20 6 10 0 10 12 0 12z', '#FFFFFF', 2));
const cypress = (x, y, h = 60) => P(`M${x} ${y - h}c10 20 10 ${h - 10} 0 ${h}c-10-10-10-${h - 20} 0-${h}z`, '#2E7D32', 2);
const pine = (x, y, s = 1) => g(x, y, s, Lc('M0 0v-34', '#6D4C41', 4) + P('M-26-34c0-14 52-14 52 0z', '#388E3C', 2));
const leaf = (x, y, r, c = '#43A047', s = 1) => g(x, y, s, P('M0 0c6-12 22-14 30-10-6 12-20 16-30 10z', c, 2), r);
const plate = (y = 196, w = 92) => E(120, y, w, w * 0.22, '#E3F2FD') + E(120, y - 4, w * 0.78, w * 0.14, '#FFFFFF', 2);

const items = [
  // ---------- Italy, the country
  K('it', 'food', 'bruschetta', 'บรูสเกตต้าหน้ามะเขือเทศ', 'Bruschetta with tomato and basil', ['bruschetta', 'บรูสเกตต้า', 'toasted bread', 'ขนมปังปิ้ง', 'diced tomato', 'มะเขือเทศหั่นเต๋า', 'basil', 'ใบโหระพา', 'olive oil', 'garlic bread', 'antipasto', 'อาหารเรียกน้ำย่อย'],
    // two oval slices of grilled country bread with dark grill stripes, heaped with little red tomato cubes and green basil leaves, a drop of olive oil, on a wooden board
    R(28, 150, 184, 46, '#C68B59', 14) + C(196, 172, 6, '#A0703F', 2)
      + [[86, 128, -8], [158, 136, 8]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 50, 30, '#E8B36A') + E(0, -4, 42, 22, '#F6D69A', 2.5) + Lc('M-30-14l14 22M-12-20l14 26M8-20l14 24', '#B9814A', 3)
        + [[-22, -8], [-8, -14], [6, -8], [20, -12], [-14, 4], [2, 2], [18, 2]].map(([a, b]) => R(a - 5, b - 5, 10, 10, '#E53935', 2, 2)).join('') + leaf(-6, -20, -30, '#43A047', 0.7), r)).join('')
      + E(150, 118, 5, 3, '#FFD54F', 0) + face(86, 150, 0.36)),
  K('it', 'food', 'pannacotta', 'พันนาค็อตตาราดซอสเบอร์รี่', 'Panna cotta with berry sauce', ['panna cotta', 'พันนาค็อตตา', 'cream pudding', 'พุดดิ้งครีม', 'wobbly dessert', 'ขนมดุ๊กดิ๊ก', 'berry sauce', 'ซอสเบอร์รี่', 'raspberries', 'ราสเบอร์รี่', 'piedmont'],
    // a tall white wobbly dome of panna cotta on a plate, glossy red berry sauce running down its sides, raspberries and a mint leaf on the plate, wobble lines beside it
    plate(198, 96) + P('M66 186c-4-50 8-104 54-104s58 54 54 104z', '#FFFDF5') + P('M76 100c16-22 72-22 88 0-4 14-12 6-18 20-6-14-14-6-20 6-6-14-14-10-18 2-6-12-14-6-18 4-4-10-10-8-14-32z', '#D81B60', 3)
      + P('M84 96c10-8 22-10 30-8', 'none', 2) + E(150, 128, 4, 10, '#FFFFFF', 0) + face(120, 150, 0.48)
      + [[46, 188], [194, 186], [182, 198]].map(([x, y]) => C(x, y, 10, '#E53935', 2.5) + C(x - 3, y - 3, 2, '#FF8A80', 0)).join('') + leaf(52, 176, -60, '#66BB6A', 0.6)
      + Lc('M34 110c-6 8-6 18 0 26M206 110c6 8 6 18 0 26', INK, 3)),
  K('it', 'animal', 'hoopoe', 'นกกะรางหัวขวาน', 'A hoopoe with its crest up', ['hoopoe', 'upupa', 'นกกะรางหัวขวาน', 'crest', 'หงอนพัด', 'striped wings', 'ปีกลาย', 'italian countryside', 'ชนบทอิตาลี', 'olive grove bird', 'นกในสวนมะกอก'],
    // a pinky-orange bird with a big fan crest of feathers tipped in black, black-and-white zebra-striped wings and tail, a long thin curved beak, standing on an olive branch
    Lc('M24 196c50-6 120-2 196-10', '#6D4C41', 8) + leaf(60, 196, 20, '#7CB342', 0.7) + leaf(170, 190, -150, '#7CB342', 0.7) + E(196, 180, 6, 8, '#558B2F', 2)
      + [-60, -40, -20, 0, 20, 40].map((r) => g(108, 84, 1, P('M-7 0c-4-30 0-50 7-56 7 6 11 26 7 56z', '#F4A261', 2.5) + P('M-5-44c2-8 8-8 10 0l-2-12h-6z', INK, 0), r)).join('')
      + P('M150 150l50 26-4 10-50-18z', '#FFFFFF', 3) + Lc('M162 156l-4 12M176 162l-4 12M190 170l-4 10', INK, 5)
      + E(122, 140, 46, 36, '#F4A261') + P('M114 130c20-6 46 0 56 18-20 12-44 12-56-18z', '#FFFFFF', 3) + Lc('M128 132l-4 18M144 136l-6 18M158 142l-6 14', INK, 6)
      + C(100, 98, 26, '#F4A261') + P('M76 102c-20 4-40 14-58 32', 'none', 5) + P('M76 102c-20 4-40 14-58 32', 'none', 2.5).replace('fill="none"', 'fill="none" stroke="#5D4037"')
      + Lc('M110 176v18M128 176v18', '#5D4037', 4) + face(98, 98, 0.36)),
  K('it', 'culture', 'mandolin', 'แมนโดลินแบบเนเปิลส์', 'The Neapolitan mandolin', ['mandolin', 'mandolino', 'แมนโดลิน', 'neapolitan music', 'ดนตรีเนเปิลส์', 'round back', 'หลังโค้งกลม', 'strings', 'เครื่องสาย', 'serenade', 'เพลงขับกล่อม', 'italian folk music'],
    // a mandolin standing tilted: a pear-shaped body with a deeply rounded striped wooden back peeking out, a round sound hole with a ring, a tortoiseshell guard, a short neck and a little bent peg head, strings, a red ribbon
    g(118, 140, 0.76, P('M-46 40c-20-30-10-80 26-96h40c36 16 46 66 26 96-14 22-78 22-92 0z', '#8D5524') + P('M-36 40c-16-28-6-74 24-88h24c30 14 40 60 24 88-12 18-60 18-72 0z', '#F3D9A4', 3)
      + C(0, -6, 16, '#4E342E', 3) + C(0, -6, 22, 'none', 2) + P('M14 14c10 10 20 12 26 4l-8 22c-10 4-18 0-22-8z', '#A0522D', 2) + R(-12, 38, 24, 8, '#4E342E', 2, 2)
      + R(-8, -130, 16, 76, '#6D4C41', 3, 3) + Lc('M-5-128v172M0-128v172M5-128v172', '#ECEFF1', 1.2) + P('M-12-150h24l-4 22h-16z', '#5D4037', 3)
      + [-144, -136].map((y) => C(-16, y, 4, '#FFD54F', 2) + C(16, y, 4, '#FFD54F', 2)).join('') + face(0, 22, 0.32), -16)
      + P('M168 90c14-6 30 0 34 10-12 0-22 6-30 14z', '#E53935', 2.5) + Lc('M170 100c4 20 0 40-10 54M176 98c12 16 16 34 12 50', '#E53935', 4)),

  // ---------- Rome
  L('it/rome/landmark-trajan.v1.svg', 'เสาตรายันลายเกลียว', "Trajan's Column and its spiral story", ['trajan\'s column', 'colonna traiana', 'เสาตรายัน', 'spiral column', 'เสาลายเกลียว', 'carved story band', 'ภาพสลักวนรอบเสา', 'trajan\'s market', 'ตลาดตรายัน', 'imperial forums', 'via dei fori imperiali'], 'หาแถบภาพสลักที่วนเป็นเกลียวรอบเสาสูง', 'Find the carved band that winds round and round the tall column',
    // a tall marble column on a square base with a little door, wrapped from top to bottom by a winding band of carving, a small viewing platform on top; red-brick curved market halls and an umbrella pine behind
    sky('#BBDEFB') + cloud(54, 46, 0.8) + P('M150 120c20-24 70-24 94 0v124H150z', '#C47A55', 3) + [168, 196, 224].map((x) => P(`M${x - 8} 150v-14c0-10 16-10 16 0v14z`, '#8D4A2F', 2)).join('') + pine(32, 140, 1.1)
      + R(-4, 200, 248, 44, '#E8DCC4', 0, 3) + R(82, 168, 76, 40, '#EFE6D2', 2, 3) + R(110, 182, 20, 26, '#8D6E63', 3, 2.5)
      + R(100, 30, 40, 140, '#FAF3E3', 2, 3) + Array.from({ length: 7 }, (_, k) => P(`M100 ${44 + k * 18}L140 ${32 + k * 18}`, 'none', 2.5) + P(`M100 ${52 + k * 18}L140 ${40 + k * 18}`, 'none', 1.5).replace('fill="none"', 'fill="none" stroke="#C9B48E"')).join('')
      + R(92, 22, 56, 10, '#EAD9B8', 2, 3) + R(108, 8, 24, 14, '#EAD9B8', 2, 2.5) + Lc('M108 8h24', '#BCAAA4', 2) + face(120, 186, 0.28)),
  L('it/rome/landmark-testaccio.v1.svg', 'เนินเขาเศษไหโบราณมอนเตเตสตัชโช', 'Monte Testaccio, the hill of broken pots', ['monte testaccio', 'มอนเตเตสตัชโช', 'testaccio', 'เตสตัชโช', 'hill of broken pots', 'เนินเศษไห', 'amphora shards', 'เศษไหโบราณ', 'ancient olive oil jars', 'โถน้ำมันมะกอกโบราณ', 'pyramid of cestius'], 'หาเศษไหสีส้มที่โผล่ออกมาจากข้างเนินเขา', 'Find the orange pot pieces poking out of the side of the hill',
    // a round grassy hill sliced open on one side to show it is made of thousands of stacked orange pot pieces, a whole two-handled amphora with a face sitting on top next to a cross-free flagpole-less summit tree, a child pointing
    sky('#FFE0B2') + C(194, 50, 18, '#FFF59D', 2) + R(-4, 196, 248, 48, '#AED581', 0, 3)
      + P('M10 200c20-90 70-130 112-130s92 40 112 130z', '#9CCC65') + P('M30 200c10-50 40-80 70-90l20 90z', '#E8A27A', 3)
      + [[46, 186, 20], [64, 176, -10], [82, 186, 30], [58, 160, 0], [78, 160, -20], [92, 140, 10], [96, 170, 40], [70, 140, 20], [86, 120, -10], [104, 190, -30]].map(([x, y, r]) => g(x, y, 1, P('M-10-4c4-6 16-6 20 0l-2 8c-6 2-12 2-16 0z', '#D9663A', 2), r)).join('')
      + g(140, 60, 1, P('M-10-6c-14 8-18 30-8 44 4 6 32 6 36 0 10-14 6-36-8-44v-8h-20z', '#D9663A') + Lc('M-10-10c-10-4-14 6-6 12M10-10c10-4 14 6 6 12', INK, 3) + R(-12, -18, 24, 6, '#C9714A', 2, 2.5) + face(0, 14, 0.3))
      + pine(196, 96, 0.8) + kid(200, 214, '#29B6F6', 1.4) + Lc('M188 180l-18-12', INK, 3)),
  L('it/rome/landmark-coppede.v1.svg', 'ย่านโคปเปเดบ้านเทพนิยาย', 'The fairy-tale Coppedè quarter', ['quartiere coppedè', 'coppede', 'ย่านโคปเปเด', 'fairy-tale houses', 'บ้านเหมือนเทพนิยาย', 'giant chandelier', 'โคมระย้ายักษ์', 'arch gateway', 'ซุ้มประตู', 'piazza mincio', 'art nouveau'], 'หาโคมระย้าเหล็กดัดยักษ์ที่ห้อยอยู่ใต้ซุ้มประตู', 'Find the giant iron chandelier hanging under the arch',
    // a big stone archway joining two fanciful buildings with turrets, striped stone and painted friezes; a huge wrought-iron chandelier hangs from chains in the middle of the arch
    sky('#C5CAE9') + R(-4, 200, 248, 44, '#BDBDBD', 0, 3)
      + [[14, 60, '#F5E6C8'], [170, 50, '#F8D7C4']].map(([x, y, c]) => R(x, y, 56, 150, c, 0, 3) + Lc(`M${x} ${y + 30}h56M${x} ${y + 60}h56`, '#C9714A', 3) + R(x + 12, y + 72, 14, 22, '#5C6BC0', 7, 2.5) + R(x + 32, y + 72, 14, 22, '#5C6BC0', 7, 2.5) + P(`M${x - 4} ${y}l32-34 32 34z`, '#8D6E63', 3) + C(x + 28, y + 12, 8, '#FFD54F', 2.5)).join('')
      + R(70, 40, 100, 34, '#EFD9B4', 0, 3) + P('M70 200V96c0-30 100-30 100 0v104h-12V100c0-20-76-20-76 0v100z', '#E6C79C', 3) + Lc('M76 56h88', '#C9714A', 3) + [92, 120, 148].map((x) => C(x, 64, 4, '#E53935', 2)).join('')
      + Lc('M120 86v34', INK, 2.5) + g(120, 136, 1, P('M-34 0h68l-10 24h-48z', '#37474F', 3) + Lc('M-30 0c0-14 60-14 60 0M0-16v-6', '#37474F', 3) + [-24, -8, 8, 24].map((x) => C(x, -4, 4, '#FFE082', 2)).join('') + C(0, 30, 6, '#37474F', 2.5) + face(0, 8, 0.24))),
  L('it/rome/landmark-tiberina.v1.svg', 'เกาะติเบรีนาทรงเรือกลางแม่น้ำ', 'Tiber Island, the island shaped like a ship', ['tiber island', 'isola tiberina', 'เกาะติเบรีนา', 'boat-shaped island', 'เกาะทรงเรือ', 'ponte fabricio', 'สะพานโรมันโบราณ', 'river tiber', 'แม่น้ำไทเบอร์', 'ghetto', 'trastevere bridge'], 'หาเกาะที่หัวแหลมเหมือนหัวเรือกลางแม่น้ำ', 'Find the island with a pointed end like the front of a boat',
    // a long island in the green river with a stone ship's-prow tip, a cluster of ochre and pink buildings and a little bell tower on it, an old stone two-arched bridge joining it to the bank, plane trees on the embankments
    sky('#B3E5FC') + R(-4, 70, 248, 40, '#C8B99A', 0, 3) + [24, 70, 200].map((x) => C(x, 70, 18, '#7CB342', 2.5)).join('') + R(-4, 106, 248, 138, '#80CBC4', 0, 3)
      + P('M30 170c30-34 120-40 196-26l14 20c-70 24-160 24-210 6z', '#E8DCC4', 3) + P('M30 170l-20-6 22-8z', '#D7C9AE', 3)
      + R(80, 120, 40, 36, '#F2C38B', 0, 3) + R(120, 112, 46, 44, '#F8BBD0', 0, 3) + R(166, 126, 34, 30, '#FFE0B2', 0, 3) + R(132, 84, 16, 28, '#F2C38B', 0, 3) + P('M130 84l10-12 10 12z', '#C9714A', 2.5)
      + [[90, 130], [104, 130], [132, 124], [150, 124], [176, 136]].map(([x, y]) => R(x, y, 8, 12, '#5D4037', 2, 1.5)).join('')
      + g(206, 160, 1, P('M-40 30V0h80v30h-10c0-24-26-24-26 0h-8c0-24-26-24-26 0z', '#D7C29A', 3))
      + Lc('M20 210c14-4 28 4 42 0M150 222c14-4 28 4 42 0', '#E0F2F1', 3) + face(104, 160, 0.3)),
  L('it/rome/landmark-santivo.v1.svg', 'ยอดเกลียวของซานติโวอัลลาซาเปียนซา', "The corkscrew top of Sant'Ivo alla Sapienza", ["sant'ivo alla sapienza", 'sant ivo', 'ซานติโว', 'corkscrew spire', 'ยอดเกลียว', 'borromini', 'baroque', 'บาโรก', 'palazzo della sapienza', 'courtyard', 'ลานกลางอาคาร'], 'หายอดหอคอยที่บิดเป็นเกลียวเหมือนที่เปิดขวด', 'Find the tower top that twists round like a corkscrew',
    // a pale baroque courtyard front curving inward with two storeys of arches, a six-lobed drum with a stepped dome, and on top a white spiral lantern that winds up like a corkscrew to a little iron crown
    sky('#E1F5FE') + R(-4, 210, 248, 34, '#D7CCC8', 0, 3)
      + P('M20 210V150c40 14 160 14 200 0v60z', '#FFF3E0', 3) + [40, 72, 104, 136, 168, 200].map((x) => P(`M${x - 10} 210v-26c0-14 20-14 20 0v26z`, '#BCAAA4', 2.5)).join('') + Lc('M20 178c40 12 160 12 200 0', '#D7CCC8', 3)
      + P('M64 152c0-30 112-30 112 0z', '#FFF8E1', 3) + R(84, 110, 72, 36, '#FFF8E1', 0, 3) + [96, 120, 144].map((x) => R(x - 5, 118, 10, 20, '#BCAAA4', 5, 2)).join('') + P('M80 112c0-14 80-14 80 0z', '#EFEBE9', 3)
      + P('M104 98h32l-4-12h-24z', '#FFF8E1', 3) + P('M108 86l12-60 12 60z', '#FFFDF7', 3) + Lc('M106 80l26-10M110 66l20-8M113 52l15-6M116 40l9-4', INK, 3)
      + Lc('M120 26v-12', INK, 3) + P('M112 14l8-8 8 8-8 4z', '#FFD54F', 2) + face(120, 130, 0.3)),

  // ---------- Venice
  L('it/venice/landmark-bovolo.v1.svg', 'บันไดเวียนนอกตึกสกาลาคอนตารินีเดลโบโวโล', 'The snail staircase of the Scala Contarini del Bovolo', ['scala contarini del bovolo', 'bovolo', 'สกาลาโบโวโล', 'snail staircase', 'บันไดหอยทาก', 'spiral staircase tower', 'หอบันไดเวียน', 'white arches', 'ซุ้มโค้งสีขาว', 'hidden courtyard', 'ลานลับ'], 'หาหอคอยกลมที่มีซุ้มโค้งสีขาววนขึ้นไปเหมือนเปลือกหอยทาก', 'Find the round tower with white arches winding up like a snail shell',
    // a round red-brick tower wrapped in a spiral of little white arches that climb round it to a domed top, a child waving from the top, a courtyard garden with a stone wellhead-free hedge and pots below
    sky('#FFE0B2') + R(-4, 30, 60, 214, '#F2C38B', 0, 3) + R(186, 50, 62, 194, '#F8BBD0', 0, 3) + R(-4, 210, 248, 34, '#C5E1A5', 0, 3)
      + R(80, 60, 80, 152, '#D9663A', 2, 3) + Array.from({ length: 6 }, (_, k) => { const y = 196 - k * 24; return [0, 1, 2, 3].map((j) => P(`M${82 + j * 19 + (k % 2) * 4} ${y - 4 - j * 5}v-12c0-8 14-8 14 0v12z`, '#FFFFFF', 2)).join('') + Lc(`M80 ${y + 2}L160 ${y - 22}`, '#ECEFF1', 3); }).join('')
      + P('M74 62c0-30 92-30 92 0z', '#B0BEC5', 3) + C(120, 30, 5, '#FFD54F', 2) + kid(144, 54, '#FFCA28', 0.9)
      + [30, 210].map((x) => P(`M${x - 12} 226h24l-4 14h-16z`, '#E07B39', 2.5) + C(x, 218, 10, '#66BB6A', 2.5)).join('') + face(120, 180, 0.3)),
  L('it/venice/landmark-paline.v1.svg', 'เสาผูกเรือลายทางริมคลองเวนิส', 'The striped mooring poles on a Venice canal', ['paline', 'pali da casada', 'เสาผูกเรือ', 'striped poles', 'เสาลายทาง', 'mooring posts', 'ท่าจอดเรือหน้าบ้าน', 'palazzo water gate', 'ประตูน้ำหน้าวัง', 'canal', 'คลองเวนิส'], 'หาเสาไม้ลายทางเหมือนลูกกวาดที่ปักอยู่ในคลอง', 'Find the candy-striped wooden poles standing in the canal',
    // the water gate of an old pink palazzo with pointed windows, three tall poles painted in spirals of red-and-white and blue-and-yellow with gold knobs on top standing in the green canal, ripples and reflections
    sky('#B3E5FC') + R(-4, 20, 160, 160, '#F8BBD0', 0, 3) + [24, 64, 104].map((x) => P(`M${x} 80v-24c0-10 8-18 12-22 4 4 12 12 12 22v24z`, '#5D4037', 2.5)).join('') + R(-4, 92, 160, 10, '#FFFFFF', 0, 2.5)
      + P('M40 180v-50c0-20 52-20 52 0v50z', '#3E2723', 3) + R(-4, 178, 248, 66, '#4DB6AC', 0, 3)
      + [[130, '#E53935', '#FFFFFF'], [168, '#1E88E5', '#FFEB3B'], [204, '#E53935', '#FFFFFF']].map(([x, a, b]) => R(x - 7, 70, 14, 150, b, 3, 3) + [0, 1, 2, 3, 4, 5].map((k) => P(`M${x - 7} ${84 + k * 24}l14-10v12l-14 10z`, a, 0)).join('') + C(x, 64, 9, '#FFD54F', 3)).join('')
      + Lc('M20 200c14-4 28 4 42 0M100 226c14-4 28 4 42 0', '#B2DFDB', 3) + face(168, 120, 0.26)),
  L('it/venice/landmark-cadoro.v1.svg', 'วังกาโดโรหน้าตึกฉลุลายลูกไม้', "The Ca' d'Oro and its lace-like front", ["ca' d'oro", 'ca d oro', 'กาโดโร', 'golden house', 'บ้านทองคำ', 'gothic tracery', 'ลายฉลุโกธิก', 'grand canal palace', 'วังริมคลองใหญ่', 'loggia', 'ระเบียงซุ้มโค้ง'], 'หาหน้าต่างฉลุลายเป็นรูปดอกไม้สี่กลีบเรียงกันบนตึก', 'Find the windows cut into little four-petal flower shapes',
    // a pale pink-and-white gothic palace by the canal: a ground-floor porch of arches at the water, two upper loggias of slender pointed arches topped by rows of round four-petal openings, a spiky white roof edge, gold touches
    sky('#FFF3E0') + R(-4, 196, 248, 48, '#4DB6AC', 0, 3)
      + R(30, 40, 180, 160, '#FCE4EC', 0, 3) + Array.from({ length: 9 }, (_, k) => P(`M${34 + k * 20} 40l6-14 6 14z`, '#FFFFFF', 2)).join('')
      + [76, 134].map((y) => Array.from({ length: 6 }, (_, k) => P(`M${44 + k * 18} ${y + 36}v-20c0-10 6-16 7-18 1 2 7 8 7 18v20z`, '#5D4037', 2) + C(51 + k * 18, y, 6, '#FFFFFF', 2) + C(51 + k * 18, y, 2.5, '#5D4037', 0)).join('') + Lc(`M40 ${y + 40}h110`, '#FFD54F', 3)).join('')
      + R(156, 60, 44, 120, '#F8BBD0', 0, 3) + R(166, 76, 24, 34, '#5D4037', 10, 2.5) + R(166, 128, 24, 34, '#5D4037', 10, 2.5)
      + [56, 96, 136].map((x) => P(`M${x - 14} 200v-20c0-12 28-12 28 0v20z`, '#3E2723', 2.5)).join('') + Lc('M20 214c14-4 28 4 42 0M150 226c14-4 28 4 42 0', '#B2DFDB', 3) + face(178, 168, 0.26)),
  L('it/venice/landmark-mori.v1.svg', 'หุ่นทองแดงสองตนตีระฆังบนหอนาฬิกา', 'The two bronze bell-strikers on the clock tower', ['torre dell\'orologio', 'clock tower', 'หอนาฬิกา', 'mori', 'bell strikers', 'หุ่นตีระฆัง', 'bronze giants', 'หุ่นทองแดง', 'blue and gold clock', 'นาฬิกาสีน้ำเงินทอง', 'piazza san marco'], 'หาหุ่นสีเข้มสองตนที่ถือค้อนตีระฆังใบใหญ่', 'Find the two dark figures with hammers striking the big bell',
    // the top of a clock tower: a big round bell on a stand, two dark bronze shepherd figures in sheepskin with long hammers raised on either side of it, below them a blue face with gold stars and a gold sun hand, white marble edges
    sky('#BBDEFB') + R(40, 130, 160, 120, '#ECEFF1', 0, 3) + C(120, 186, 46, '#1565C0', 3) + C(120, 186, 32, '#0D47A1', 2.5) + [[100, 168], [140, 170], [112, 206], [134, 204], [92, 190], [150, 192]].map(([x, y]) => P(`M${x} ${y - 4}l1.5 3 3 1-3 1-1.5 3-1.5-3-3-1 3-1z`, '#FFD54F', 0)).join('') + Lc('M120 186l20-16', '#FFD54F', 4) + C(120, 186, 6, '#FFD54F', 2)
      + R(30, 120, 180, 12, '#FAFAFA', 0, 3) + R(66, 108, 108, 12, '#FAFAFA', 0, 3) + Lc('M120 60v-14', INK, 3)
      + P('M96 100c0-40 48-40 48 0z', '#C9A227') + R(92, 98, 56, 8, '#B08A1E', 2, 2.5) + C(120, 42, 6, '#C9A227', 2.5)
      + [[70, 1], [170, -1]].map(([x, d]) => g(x, 106, 1, R(-12, -40, 24, 40, '#4E5B4A', 4) + C(0, -52, 12, '#4E5B4A') + Lc(`M${6 * d}-36l${22 * d}-28`, '#6D4C41', 4) + R(16 * d - 6, -74, 12, 10, '#6D4C41', 2, 2) + face(0, -52, 0.22)).replace(/<path class="f" d="([^"]+)" fill="none" stroke-width="([^"]+)"\/>/, '<path class="f" d="$1" fill="none" stroke="#FFFFFF" stroke-width="$2"/>')).join('')),
  L('it/venice/landmark-baicoli.v1.svg', 'ขนมปังกรอบไบโคลีในกระป๋องสีเหลือง', 'Baicoli, the thin Venetian biscuits in their tin', ['baicoli', 'ไบโคลี', 'venetian biscuits', 'ขนมปังกรอบเวนิส', 'yellow tin', 'กระป๋องสีเหลือง', 'dunk in hot chocolate', 'จิ้มช็อกโกแลตร้อน', 'pasticceria', 'sailors biscuits', 'ขนมของกะลาสี'], 'หาขนมแผ่นบางรูปวงรีที่จุ่มลงในถ้วยช็อกโกแลต', 'Find the thin oval biscuit dipping into the cup of chocolate',
    // a square yellow tin with its lid propped open, filled with stacked thin oval golden biscuits, one biscuit dipping into a little cup of hot chocolate beside it, crumbs
    E(120, 204, 96, 18, '#E3F2FD') + g(96, 140, 1, R(-56, -40, 112, 92, '#FFCA28', 8) + R(-56, -40, 112, 16, '#FFB300', 6, 3) + Lc('M-46 10h92M-46 30h92', '#FFB300', 3) + face(0, 18, 0.4)
      + P('M-56-40l10-50h112l-10 50z', '#FFE082', 3) + [-36, -14, 8, 30].map((x) => E(x, -46, 12, 22, '#F6D69A', 2.5)).join(''))
      + g(188, 168, 1, P('M-26-20h52l-6 40h-40z', '#FFFFFF', 3) + E(0, -20, 26, 6, '#6D4C41', 2.5) + P('M26-12c12 0 12 18 0 18', 'none', 3) + E(0, 26, 32, 6, '#FFFFFF', 2.5))
      + g(176, 128, 1, E(0, 0, 10, 26, '#F6D69A', 2.5), -30) + C(150, 196, 2.5, '#E8B36A', 0) + C(40, 200, 2.5, '#E8B36A', 0)),

  // ---------- Florence and Tuscany
  L('it/florence/landmark-baptistery.v1.svg', 'หอศีลจุ่มแปดเหลี่ยมและประตูทองคำ', 'The eight-sided Baptistery and its golden doors', ['baptistery of san giovanni', 'battistero', 'หอศีลจุ่ม', 'gates of paradise', 'ประตูทองคำ', 'octagon', 'อาคารแปดเหลี่ยม', 'green and white marble', 'หินอ่อนเขียวขาว', 'piazza del duomo', 'bronze doors'], 'หาประตูสีทองที่แบ่งเป็นช่องสี่เหลี่ยมสิบช่อง', 'Find the golden doors divided into ten square panels',
    // an eight-sided building striped in white and dark green marble with a low pyramid roof and a small lantern on top; in front, a pair of big golden doors made of ten square panels
    sky('#E3F2FD') + R(-4, 206, 248, 38, '#E0E0E0', 0, 3)
      + P('M30 206V94l40-20h100l40 20v112z', '#FAFAFA', 3) + Lc('M70 74v132M170 74v132M30 130h180M30 170h180', '#2E7D32', 4) + [50, 190].map((x) => P(`M${x - 8} 124v-20c0-8 16-8 16 0v20z`, '#2E7D32', 2)).join('')
      + P('M40 92l30-40h100l30 40z', '#FFFFFF', 3) + Lc('M80 52l-20 40M160 52l20 40', '#2E7D32', 3) + R(108, 30, 24, 22, '#FAFAFA', 0, 3) + P('M104 32l16-14 16 14z', '#ECEFF1', 3)
      + R(84, 104, 72, 102, '#FFD54F', 4, 3) + Lc('M120 104v102', '#C9A227', 3) + [0, 1, 2, 3, 4].map((k) => R(90, 110 + k * 19, 24, 15, '#FFE082', 2, 2) + R(126, 110 + k * 19, 24, 15, '#FFE082', 2, 2)).join('') + face(120, 92, 0.28)),
  L('it/florence/landmark-lampredotto.v1.svg', 'แซนด์วิชลัมเปรดอตโตจากรถเข็นริมทาง', 'A lampredotto sandwich from a street cart', ['lampredotto', 'ลัมเปรดอตโต', 'tripe sandwich', 'แซนด์วิชเครื่องใน', 'street food cart', 'รถเข็นอาหาร', 'salsa verde', 'ซอสเขียว', 'florentine street food', 'อาหารริมทางฟลอเรนซ์', 'round bun'], 'หาขนมปังก้อนกลมที่มีซอสสีเขียวไหลเยิ้ม', 'Find the round bun dripping with green sauce',
    // a little white street-food van with a striped awning and steaming pot in the window behind, in front a fat round bun cut open and stuffed with dark meat, dripping bright green sauce and red chilli oil, on paper
    sky('#FFF8E1') + R(-4, 200, 248, 44, '#BDBDBD', 0, 3)
      + g(120, 70, 0.72, R(-90, -30, 180, 92, '#FFFFFF', 10) + P('M-96-30l10-26h172l10 26z', '#43A047', 3) + Lc('M-70-56l-6 26M-40-56l-4 26M-10-56v26M20-56l2 26M50-56l4 26M80-56l6 26', '#FFFFFF', 6)
        + R(-70, -16, 90, 44, '#B3E5FC', 4, 3) + R(-50, 0, 40, 26, '#90A4AE', 4, 2.5) + Lc('M-40-6c-4-8 4-12 0-20M-24-6c-4-8 4-12 0-20', '#CFD8DC', 2.5) + C(-60, 72, 14, '#37474F', 3) + C(60, 72, 14, '#37474F', 3))
      + g(120, 172, 1.3, P('M-62 0c0-30 124-30 124 0z', '#E8B36A') + P('M-60 4c10 4 110 4 120 0l-4 10h-112z', '#6D4C41', 3) + P('M-56 10c14 10 98 10 112 0 4 24-28 34-56 34s-60-10-56-34z', '#E8B36A', 3) + P('M-40 4c0 14 6 20 4 30M22 6c2 10-2 18 0 26', '#7CB342', 5) + C(-20, 8, 4, '#E53935', 2) + face(0, -14, 0.36))),
  L('it/florence/landmark-carrara.v1.svg', 'เหมืองหินอ่อนขาวแห่งการ์รารา', 'The white marble quarries of Carrara', ['carrara', 'การ์รารา', 'marble quarry', 'เหมืองหินอ่อน', 'white marble mountains', 'ภูเขาหินอ่อนขาว', 'apuan alps', 'เทือกเขาอาปวน', 'marble block', 'ก้อนหินอ่อน', 'colonnata'], 'หาก้อนหินอ่อนสีขาวบนหลังรถบรรทุก', 'Find the white marble block riding on the back of the truck',
    // pale grey-white mountains cut into giant square steps by the quarries, a zigzag dusty road, a small yellow truck carrying a huge white marble block with a face down the road, green trees at the foot
    sky('#B3E5FC') + P('M-4 150l60-100 50 40 44-70 96 120v104H-4z', '#ECEFF1', 3) + P('M140 50l16 30h24l14 30h20', 'none', 3) + P('M56 50l20 34h20l10 20h20', 'none', 3)
      + R(150, 80, 30, 30, '#FFFFFF', 0, 2.5) + R(180, 110, 30, 30, '#FFFFFF', 0, 2.5) + R(70, 84, 26, 26, '#FFFFFF', 0, 2.5) + R(96, 104, 30, 28, '#FFFFFF', 0, 2.5)
      + Lc('M210 150l-120 20 100 18-150 22', '#BCAAA4', 10) + Lc('M210 150l-120 20 100 18-150 22', '#D7CCC8', 5)
      + R(-4, 210, 248, 34, '#9CCC65', 0, 3) + [20, 216].map((x) => C(x, 212, 14, '#43A047', 2.5)).join('')
      + g(118, 196, 1, R(-44, -12, 64, 22, '#FFCA28', 3) + R(20, -22, 26, 32, '#FFCA28', 4) + R(28, -16, 12, 10, '#B3E5FC', 2, 2) + C(-30, 12, 8, '#37474F', 2.5) + C(30, 12, 8, '#37474F', 2.5) + R(-40, -50, 52, 38, '#FFFFFF', 3, 3) + Lc('M-30-40l10 8M-8-46l6 12', '#E0E0E0', 2) + face(-14, -32, 0.3))),
  L('it/florence/landmark-monteriggioni.v1.svg', 'มอนเตริจโจนี เมืองมงกุฎหอคอยบนเนิน', 'Monteriggioni, the crown of towers on a hill', ['monteriggioni', 'มอนเตริจโจนี', 'walled village', 'หมู่บ้านในกำแพง', 'ring of towers', 'วงหอคอย', 'crown on a hill', 'มงกุฎบนเนิน', 'via francigena', 'medieval castle village', 'chianti'], 'หาหอคอยสี่เหลี่ยมที่เรียงเป็นวงรอบเนินเหมือนมงกุฎ', 'Find the square towers standing in a ring round the hill like a crown',
    // a round green hill in the Tuscan countryside wearing a ring of stone wall with many square towers like a crown, red roofs peeking inside, cypresses and rows of vines on the slopes below
    sky('#FFE0B2') + cloud(196, 40, 0.8) + P('M-4 170c50-30 80-30 124-30s90 10 124 30v74H-4z', '#AED581', 3)
      + P('M30 160c10-40 50-60 90-60s80 20 90 60z', '#9CCC65', 3) + E(120, 112, 82, 20, '#D7C29A', 3) + [100, 130, 150].map((x) => P(`M${x - 12} 106l12-10 12 10z`, '#D9663A', 2)).join('')
      + [[46, 112], [66, 104], [92, 100], [120, 98], [148, 100], [174, 104], [194, 112], [72, 120], [104, 124], [136, 124], [168, 120]].map(([x, y]) => R(x - 7, y - 26, 14, 26, '#E8D6B0', 0, 2.5) + R(x - 9, y - 30, 18, 6, '#D7C29A', 0, 2)).join('')
      + cypress(24, 200, 52) + cypress(214, 196, 48) + Array.from({ length: 4 }, (_, k) => Lc(`M${60 + k * 34} 236l10-50`, '#7CB342', 4)).join('') + face(120, 140, 0.32)),
  L('it/florence/landmark-irisgarden.v1.svg', 'สวนดอกไอริสแห่งฟลอเรนซ์', 'The iris garden of Florence', ['giardino dell\'iris', 'iris garden', 'สวนดอกไอริส', 'purple irises', 'ไอริสสีม่วง', 'giglio', 'symbol of florence', 'สัญลักษณ์ฟลอเรนซ์', 'piazzale michelangelo', 'spring flowers', 'ดอกไม้ฤดูใบไม้ผลิ'], 'หาดอกไอริสสีม่วงตัวโตที่ยิ้มให้เมือง', 'Find the big purple iris smiling at the city',
    // three tall purple irises with frilly drooping petals and yellow beards in the front, sword-like leaves, a terraced slope of more irises and an olive tree, and far below the red dome of the city
    sky('#E1F5FE') + P('M-4 118c60-10 180-10 248 0v20H-4z', '#FFE0B2', 2.5) + P('M150 118c0-24 36-24 36 0z', '#E07B39', 2.5) + R(138, 98, 8, 20, '#FFE0B2', 0, 2)
      + P('M-4 128c80 10 180 10 248 0v116H-4z', '#9CCC65', 3) + Lc('M-4 160c80 8 180 8 248 0', '#7CB342', 3)
      + [[30, 150], [60, 146], [196, 150], [216, 152]].map(([x, y]) => C(x, y, 6, '#9575CD', 2)).join('')
      + [[60, 210, 0.8], [120, 196, 1.1], [184, 212, 0.8]].map(([x, y, s]) => g(x, y, s, Lc('M0 30v-80', '#558B2F', 5) + P('M-4 30c-20-30-20-60-12-80 6 30 14 50 12 80z', '#66BB6A', 2) + P('M4 30c20-30 20-60 12-80-6 30-14 50-12 80z', '#66BB6A', 2)
        + P('M0-56c-30 0-36 26-24 40 8-12 18-18 24-22 6 4 16 10 24 22 12-14 6-40-24-40z', '#7E57C2', 2.5) + P('M0-58c-12-14-6-36 0-40 6 4 12 26 0 40z', '#9575CD', 2.5) + Lc('M-12-40l8 4M12-40l-8 4', '#FFD54F', 4) + (s > 1 ? face(0, -66, 0.22) : ''))).join('')),

  // ---------- Milan
  L('it/milan/landmark-polentaeosei.v1.svg', 'ขนมโปเลนตาเอโอเซย์แห่งแบร์กาโม', 'Polenta e osei, Bergamo\'s little-birds cake', ['polenta e osei', 'โปเลนตาเอโอเซย์', 'bergamo', 'แบร์กาโม', 'yellow dome cake', 'เค้กโดมสีเหลือง', 'marzipan birds', 'นกช็อกโกแลตจิ๋ว', 'città alta', 'pasticceria', 'sweet polenta'], 'หานกช็อกโกแลตตัวจิ๋วที่เกาะอยู่บนโดมเค้กสีเหลือง', 'Find the tiny chocolate birds sitting on the yellow dome cake',
    // a shiny yellow dome cake covered in sparkly sugar crystals on a white doily plate, three little brown chocolate birds perched on top with tiny beaks
    plate(198, 96) + P('M44 190c0-66 34-104 76-104s76 38 76 104z', '#FFD54F') + Array.from({ length: 12 }, (_, k) => C(60 + (k % 6) * 24, 130 + Math.floor(k / 6) * 30 + (k % 2) * 8, 2.5, '#FFF59D', 0)).join('') + E(84, 118, 8, 16, '#FFF59D', 0)
      + [[94, 90, -14], [120, 80, 0], [148, 90, 14]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 14, 10, '#6D4C41') + C(10, -8, 7, '#6D4C41') + P('M16-8l8 2-8 3z', '#FFB300', 1.5) + C(11, -10, 1.5, '#FFFFFF', 0) + P('M-12-2l-10-6 4 10z', '#5D4037', 2), r)).join('') + face(120, 150, 0.46)),
  L('it/milan/landmark-panzerotto.v1.svg', 'ปันเซรอตโตทอดไส้ชีสยืด', 'A fried panzerotto with stretchy cheese', ['panzerotto', 'panzerotti', 'ปันเซรอตโต', 'fried dough pocket', 'แป้งทอดไส้ชีส', 'mozzarella and tomato', 'มอซซาเรลลากับมะเขือเทศ', 'stretchy cheese', 'ชีสยืด', 'duomo street snack', 'ของว่างข้างดูโอโม'], 'หาชีสยาวยืดที่ห้อยออกมาจากแป้งทอดรูปพระจันทร์ครึ่งซีก', 'Find the long stretchy cheese hanging out of the half-moon pastry',
    // a big golden half-moon fried pastry in a paper wrap with crimped edges, one corner bitten open with a long string of white cheese stretching away and red tomato inside, bubbles on the crust
    g(116, 132, 1, P('M-84 30c0-70 40-100 84-100s84 30 84 100z', '#E8A33A') + Array.from({ length: 9 }, (_, k) => C(-72 + k * 18, 30, 6, '#D98A2B', 2)).join('') + [[-40, -20], [20, -36], [44, 0], [-10, 4]].map(([x, y]) => C(x, y, 4, '#F6C46A', 1.5)).join('')
      + P('M44-50c20 6 34 30 34 50-14 4-30-4-36-20s-8-24 2-30z', '#E53935', 3) + face(-12, -6, 0.42))
      + Lc('M188 96c14 10 20 34 14 58', '#FFF8E1', 9) + Lc('M188 96c14 10 20 34 14 58', INK, 2).replace('stroke-width="2"', 'stroke-width="2" opacity=".3"')
      + P('M30 160h172l-16 50H46z', '#FFFFFF', 3) + Lc('M50 172h132M60 190h112', '#E0E0E0', 2.5)),
  L('it/milan/landmark-castelvecchio.v1.svg', 'สะพานกาสเตลเวกกิโอปลายใบเสมาหางนกนางแอ่น', 'The swallowtail battlements of the Castelvecchio bridge', ['castelvecchio bridge', 'ponte scaligero', 'สะพานกาสเตลเวกกิโอ', 'verona', 'เวโรนา', 'swallowtail battlements', 'ใบเสมาหางนกนางแอ่น', 'red brick bridge', 'สะพานอิฐแดง', 'adige river', 'แม่น้ำอาดีเจ'], 'หาใบเสมาบนสะพานที่เว้าเป็นรูปหางนกนางแอ่น', 'Find the battlements on the bridge shaped like swallow tails',
    // a red-brick bridge with three big arches of different sizes over a green river, its walls topped by a row of M-shaped swallowtail battlements, a square tower at one end, cypress on the bank
    sky('#E1F5FE') + cloud(60, 40, 0.8) + R(-4, 150, 248, 94, '#4DB6AC', 0, 3) + cypress(26, 140, 60)
      + P('M10 150V100h220v50h-30c0-40-50-40-50 0h-8c0-30-40-30-40 0h-8c0-50-70-50-70 0z', '#C0573A', 3)
      + Array.from({ length: 11 }, (_, k) => P(`M${14 + k * 20} 100v-14l4 6 4-6v14z`, '#C0573A', 2.5)).join('') + Lc('M10 112h220', '#9E3F26', 2.5)
      + R(176, 40, 44, 62, '#B0482E', 0, 3) + [182, 198, 214].map((x) => P(`M${x - 4} 40v-14l4 6 4-6v14z`, '#B0482E', 2.5)).join('') + R(192, 60, 12, 20, '#4E342E', 6, 2)
      + Lc('M30 200c14-4 28 4 42 0M150 216c14-4 28 4 42 0', '#B2DFDB', 3) + face(84, 124, 0.3)),
  L('it/milan/landmark-santacaterina.v1.svg', 'อารามซานตากาเตรีนาเกาะหน้าผาริมทะเลสาบ', 'Santa Caterina del Sasso, clinging to the cliff over Lake Maggiore', ['santa caterina del sasso', 'ซานตากาเตรีนาเดลซัสโซ', 'lake maggiore', 'ทะเลสาบมัจโจเร', 'cliff hermitage', 'อารามบนหน้าผา', 'building on a cliff', 'ตึกเกาะผา', 'leggiuno', 'lakeside steps', 'บันไดริมทะเลสาบ'], 'หาตึกสีขาวที่เกาะอยู่กลางหน้าผาเหนือน้ำ', 'Find the white buildings hanging on the cliff above the water',
    // a steep grey rock cliff dropping into a blue lake, a row of white and cream buildings with arched porches and a small square bell tower stuck halfway up it, steps zigzagging down to a tiny jetty, green trees on top
    sky('#E1F5FE') + P('M-4 120h248v124H-4z', '#64B5F6', 3) + P('M140 20h104v190H170c-10-30-30-60-30-90z', '#9E9E9E', 3) + P('M150 60l20 10M160 160l30 6', 'none', 2.5)
      + [180, 210, 236].map((x) => C(x, 22, 16, '#43A047', 2.5)).join('') + P('M-4 96c30-10 60-8 90 0v30H-4z', '#81C784', 3)
      + R(100, 84, 70, 46, '#FFF8E1', 0, 3) + [110, 130, 150].map((x) => P(`M${x} 130v-18c0-8 12-8 12 0v18z`, '#8D6E63', 2.5)).join('') + P('M96 86h78l-8-10h-62z', '#C9714A', 3)
      + R(150, 40, 20, 46, '#FFF8E1', 0, 3) + P('M148 40l12-14 12 14z', '#C9714A', 2.5) + R(156, 50, 8, 12, '#8D6E63', 4, 2)
      + Lc('M134 130l-14 14 18 12-16 14', '#D7CCC8', 5) + R(100, 172, 50, 6, '#8D6E63', 0, 2.5) + Lc('M20 160c14-4 28 4 42 0M40 206c14-4 28 4 42 0', '#BBDEFB', 3) + face(134, 108, 0.26)),
  L('it/milan/landmark-michetta.v1.svg', 'ขนมปังมิเก็ตตาทรงดอกกุหลาบ', 'The michetta, Milan\'s rose-shaped bread roll', ['michetta', 'มิเก็ตตา', 'rosetta bread', 'ขนมปังดอกกุหลาบ', 'hollow bread roll', 'ขนมปังกลวง', 'milanese bakery', 'ร้านขนมปังมิลาน', 'panino', 'sandwich roll', 'breakfast bread'], 'หาขนมปังที่พองเป็นห้ากลีบเหมือนดอกกุหลาบ', 'Find the puffy roll with five petals like a rose',
    // a puffy round golden roll with five swollen lobes around a little knob like a rose, a second roll cut open showing it is hollow inside, in a little wicker basket with a checked cloth
    P('M30 170h180l-14 50H44z', '#C68B59') + Lc('M40 186h160M46 204h148', '#A0703F', 3) + P('M44 168c20-14 40-6 60-14 20 10 40 2 60 12 16-6 30 0 40 4', '#E53935', 3)
      + g(96, 120, 1, [0, 72, 144, 216, 288].map((a) => g(0, 0, 1, E(0, -30, 26, 32, '#E8A33A', 3), a)).join('') + C(0, 0, 18, '#D98A2B', 3) + C(0, 0, 6, '#C27A20', 2) + face(0, 30, 0.34))
      + g(178, 140, 1, P('M-34 0c0-30 68-30 68 0z', '#E8A33A') + E(0, 2, 30, 10, '#FFF3D6', 3) + E(0, 4, 18, 5, '#F6D69A', 0))),

  // ---------- The Amalfi Coast and Naples
  L('it/amalfi/landmark-delizia.v1.svg', 'เค้กโดมครีมมะนาวเดลิเซียอัลลีโมเน', 'Delizia al limone, the lemon cream dome cake', ['delizia al limone', 'เดลิเซียอัลลีโมเน', 'lemon cream cake', 'เค้กครีมมะนาว', 'dome sponge', 'เค้กโดม', 'amalfi lemons', 'มะนาวอมาลฟี', 'pasticceria', 'sorrento dessert', 'ขนมหวานซอร์เรนโต'], 'หาเค้กโดมสีเหลืองนวลที่มีเปลือกมะนาวบิดอยู่ข้างบน', 'Find the pale yellow dome cake with a twist of lemon peel on top',
    // a small round dome cake coated in pale yellow lemon cream with a swirl of cream and a curl of lemon peel on top, on a blue-and-white painted plate, a lemon with two leaves beside it
    E(110, 200, 92, 20, '#E3F2FD') + E(110, 194, 74, 14, '#FFFFFF', 3) + Lc('M50 194c20 8 100 8 120 0', '#1E88E5', 3)
      + P('M54 188c0-70 30-96 56-96s56 26 56 96z', '#FFF59D') + P('M60 150c20 10 80 10 100 0', 'none', 2) + P('M96 96c-6-10 6-18 14-12 8-8 22 0 14 12z', '#FFFDE7', 3) + P('M110 84c10-10 24-8 28 2-10-4-18 0-22 6z', '#FFD600', 2.5) + face(110, 150, 0.46)
      + g(196, 170, 1, E(0, 0, 26, 20, '#FFEB3B') + P('M26-2l8-2-6 6z', '#FBC02D', 2) + leaf(-6, -16, -120, '#43A047', 0.8) + leaf(4, -18, -60, '#66BB6A', 0.7))),
  L('it/amalfi/landmark-cameo.v1.svg', 'การแกะเปลือกหอยเป็นเครื่องประดับคาเมโอ', 'Carving a shell cameo', ['cameo', 'คาเมโอ', 'shell carving', 'แกะสลักเปลือกหอย', 'torre del greco', 'ตอร์เรเดลเกรโก', 'conch shell', 'เปลือกหอยสังข์', 'jewellery craft', 'งานเครื่องประดับ', 'naples craft'], 'หาดอกไม้สีขาวที่แกะนูนอยู่บนเปลือกหอยสีส้ม', 'Find the white flower carved standing out of the orange shell',
    // an oval cameo in a gold frame: a raised white flower and leaves carved out of peachy-orange shell; beside it a big pink conch shell and a little carving tool
    g(96, 116, 1, E(0, 0, 60, 76, '#FFD54F') + E(0, 0, 50, 66, '#F4A261', 3) + [0, 72, 144, 216, 288].map((a) => g(0, -6, 1, E(0, -18, 12, 18, '#FFF8F0', 2.5), a)).join('') + C(0, -6, 9, '#FFF8F0', 2.5) + leaf(-4, 22, 110, '#FFF8F0', 0.9) + leaf(4, 22, 70, '#FFF8F0', 0.9)
      + Array.from({ length: 8 }, (_, k) => C(56 * Math.cos(k * Math.PI / 4), 70 * Math.sin(k * Math.PI / 4), 4, '#FFE082', 1.5)).join('') + face(0, 50, 0.3))
      + g(186, 172, 1, P('M-40 20c-10-30 10-60 40-60 26 0 44 20 40 40-4 16-20 30-40 30-14 0-34-2-40-10z', '#F8BBD0') + P('M-20 10c10-20 30-26 46-14', 'none', 2.5) + P('M-4 26c10-14 22-16 30-10', 'none', 2.5) + C(30, -20, 6, '#F48FB1', 2))
      + g(168, 76, 1, R(-4, -40, 8, 60, '#8D6E63', 2, 2.5) + P('M-4 20h8l-4 14z', '#B0BEC5', 2), 30)),
  L('it/amalfi/landmark-pastiera.v1.svg', 'ทาร์ตปาสเตียราแห่งเนเปิลส์', 'Pastiera, the Neapolitan lattice tart', ['pastiera', 'pastiera napoletana', 'ปาสเตียรา', 'lattice tart', 'ทาร์ตลายตาราง', 'ricotta and wheat', 'ริคอตตาและข้าวสาลี', 'orange blossom', 'ดอกส้ม', 'naples spring cake', 'ขนมฤดูใบไม้ผลินาโปลี'], 'หาแถบแป้งที่ไขว้กันเป็นตารางบนหน้าทาร์ต', 'Find the strips of pastry crossing in a diamond pattern on top',
    // a round golden tart in a tin with crimped edge, the top crossed by strips of pastry in a diamond lattice, dusted with icing sugar, a slice cut out showing creamy filling, white orange blossoms beside
    E(120, 204, 96, 18, '#E3F2FD') + E(120, 162, 92, 34, '#90A4AE') + E(120, 152, 86, 30, '#E8A33A') + E(120, 150, 74, 24, '#F6D69A', 2.5)
      + [-40, -14, 12, 38].map((x) => Lc(`M${120 + x - 20} ${132}l40 38`, '#D98A2B', 6) + Lc(`M${120 + x + 20} ${132}l-40 38`, '#D98A2B', 6)).join('')
      + P('M160 140l36 6 0 18-36-6z', '#FFF3D6', 3) + Array.from({ length: 10 }, (_, k) => C(70 + k * 10, 140 + (k % 3) * 6, 1.8, '#FFFFFF', 0)).join('') + face(110, 152, 0.36)
      + [[46, 94], [70, 78], [186, 88]].map(([x, y]) => [0, 72, 144, 216, 288].map((a) => g(x, y, 1, E(0, -8, 5, 8, '#FFFFFF', 2), a)).join('') + C(x, y, 3, '#FFD54F', 1.5)).join('') + leaf(90, 84, -20, '#43A047', 0.8)),
  L('it/amalfi/landmark-gnocchi.v1.svg', 'นอกกีอัลลาซอร์เรนตีนาในถ้วยดินเผา', 'Gnocchi alla sorrentina in a clay dish', ['gnocchi alla sorrentina', 'gnocchi', 'นอกกี', 'potato dumplings', 'แป้งมันฝรั่ง', 'tomato sauce', 'ซอสมะเขือเทศ', 'melted mozzarella', 'มอซซาเรลลาละลาย', 'clay dish', 'ถ้วยดินเผา'], 'หาเนื้อชีสที่ละลายเป็นฟองบนก้อนนอกกี', 'Find the bubbling melted cheese on the little potato pillows',
    // a small round terracotta dish with two handles, filled with little ridged potato pillows in red tomato sauce, blobs of bubbling melted white cheese with brown spots, a basil leaf on top, steam
    E(120, 200, 96, 18, '#E3F2FD') + g(120, 150, 1, E(0, 10, 92, 40, '#C9714A') + E(-94, 0, 14, 8, '#B85E3A', 2.5) + E(94, 0, 14, 8, '#B85E3A', 2.5) + E(0, 0, 80, 28, '#E53935', 3)
      + [[-50, -2], [-24, -10], [4, -6], [30, -12], [54, -2], [-36, 12], [-6, 14], [24, 12], [48, 14]].map(([x, y]) => E(x, y, 11, 8, '#F6D69A', 2) + Lc(`M${x - 5} ${y - 2}h10M${x - 5} ${y + 2}h10`, '#D7B07A', 1.2)).join('')
      + [[-30, -4, 18], [16, 0, 22], [44, -8, 14]].map(([x, y, r]) => E(x, y, r, r * 0.55, '#FFFDF5', 2.5) + C(x + 4, y - 2, 2.5, '#C68B59', 0)).join('') + leaf(-6, -16, -20, '#43A047', 0.8) + face(0, 32, 0.32))
      + Lc('M90 96c-6-10 4-16 0-26M120 92c-6-10 4-16 0-26M150 96c-6-10 4-16 0-26', '#CFD8DC', 3)),
  L('it/amalfi/landmark-cavecanem.v1.svg', 'ภาพโมเสกสุนัขเฝ้าบ้านที่ปอมเปอี', "Pompeii's mosaic guard dog", ['cave canem', 'beware of the dog', 'ระวังสุนัข', 'pompeii mosaic', 'โมเสกปอมเปอี', 'house of the tragic poet', 'mosaic floor', 'พื้นโมเสก', 'roman guard dog', 'สุนัขเฝ้าบ้านโรมัน', 'tesserae'], 'หาสุนัขสีดำที่ทำจากกระเบื้องชิ้นเล็กๆ บนพื้น', 'Find the black dog made of tiny tiles on the floor',
    // a square floor mosaic panel with a border of little black-and-white squares, inside a black dog in a red collar on a chain, standing alert but friendly on a cream tiled background
    R(24, 30, 192, 180, '#FFF8E1', 4) + Array.from({ length: 12 }, (_, k) => R(28 + k * 16, 34, 8, 8, INK, 0, 0) + R(28 + k * 16, 198, 8, 8, INK, 0, 0)).join('') + Array.from({ length: 10 }, (_, k) => R(28, 50 + k * 15, 8, 8, INK, 0, 0) + R(204, 50 + k * 15, 8, 8, INK, 0, 0)).join('')
      + Array.from({ length: 6 }, (_, k) => Lc(`M44 ${62 + k * 22}h152`, '#F0E3C2', 1.5)).join('')
      + g(118, 128, 1, P('M-60 20c0-20 10-30 30-32h44c10-14 22-24 34-20l10-14 4 18c10 6 14 14 10 22l-16 4-6 20h-10v-14h-46l-6 36h-10l-2-24-10 24h-10l4-30c-10 0-16-4-20-10z', '#37474F', 3) + Lc('M-60 22c-14-4-20-14-18-24', '#37474F', 6)
        + Lc('M28-8c4 8 10 12 18 12', '#E53935', 5) + Lc('M46 4c10 14 20 20 40 22', '#8D6E63', 2.5) + C(46, -18, 3, '#FFFFFF', 0) + P('M54-26c4 6 4 10 0 14', 'none', 2))),

  // ---------- The Dolomites
  { id: 'it-dolomites.day.enrosadira', cat: 'day', file: 'it/dolomites/day-enrosadira.v1.svg', name: nm('ยอดเขาเรืองสีชมพูยามเย็น เอนโรซาดีรา', 'Enrosadira, the pink glow on the peaks at sunset'), kw: ['enrosadira', 'เอนโรซาดีรา', 'alpenglow', 'แสงสีชมพูบนยอดเขา', 'pink mountains', 'ภูเขาสีชมพู', 'sunset in the dolomites', 'พระอาทิตย์ตกโดโลไมต์', 'rosengarten', 'catinaccio', 'evening hike', 'เดินเขายามเย็น'],
    // jagged pale rock towers glowing pink and orange in the last sun under a lilac sky with a first star, dark green meadows and fir trees below, a wooden hay hut with a lit window
    svg: scene('idol-d9', '#B39DDB', C(186, 50, 4, '#FFFDE7', 0) + C(60, 40, 3, '#FFFDE7', 0)
      + P('M-4 160l20-60 10 10 14-60 12 40 16-70 14 60 12-30 18 50 16-80 14 70 12-20 16 40 14-50 20 70 12 30v40H-4z', '#FF8A80') + P('M30 120l10-40M76 90l8-30M150 110l10-60', 'none', 2.5) + P('M10 160l40-30 40 20 40-26 50 30 60-20v40H10z', '#F48FB1', 0)
      + P('M-4 170c60-20 140-20 248 0v74H-4z', '#2E7D32') + P('M-4 200c60-14 140-14 248 0v44H-4z', '#388E3C', 3)
      + [[30, 180], [50, 190], [200, 184], [220, 194]].map(([x, y]) => P(`M${x} ${y - 30}l11 30h-22z`, '#1B5E20', 2)).join('')
      + g(130, 196, 1, R(-22, -18, 44, 26, '#8D6E63', 0, 3) + P('M-28-18l28-20 28 20z', '#6D4C41', 3) + R(-8, -10, 12, 10, '#FFD54F', 2, 2))) },
  L('it/dolomites/landmark-resia.v1.svg', 'หอระฆังโผล่กลางทะเลสาบเรเซีย', 'The bell tower standing in Lake Resia', ['lake resia', 'lago di resia', 'reschensee', 'ทะเลสาบเรเซีย', 'curon', 'sunken village', 'หมู่บ้านใต้น้ำ', 'tower in the lake', 'หอคอยกลางทะเลสาบ', 'val venosta', 'south tyrol lake'], 'หาหอระฆังที่ยืนโผล่ขึ้นมากลางน้ำ', 'Find the bell tower sticking up out of the water',
    // an old stone bell tower with a pointed roof standing alone in the middle of a turquoise lake, the water up to its knees, snowy mountains and a green shore behind, a little rowing-free ripple ring round it
    sky('#E1F5FE') + P('M-4 120l50-70 40 40 40-60 60 70 58-30v60H-4z', '#B0BEC5', 3) + P('M46 50l14 20-10 4zM126 30l16 24-12 2zM186 60l14 14-10 2z', '#FFFFFF', 2) + P('M-4 120c60-10 180-10 248 0v12H-4z', '#81C784', 3)
      + R(-4, 130, 248, 114, '#4DD0E1', 0, 3) + g(120, 186, 1, R(-18, -104, 36, 108, '#EFE6D2', 0, 3) + P('M-22-104l22-50 22 50z', '#78909C', 3) + R(-8, -88, 16, 20, '#5D4037', 8, 2.5) + Lc('M-18-50h36', '#D7C9AE', 2) + face(0, -30, 0.3))
      + E(120, 192, 40, 8, 'none', 3) + E(120, 196, 64, 14, 'none', 2) + Lc('M20 200c14-4 28 4 42 0M170 220c14-4 28 4 42 0', '#E0F7FA', 3)),
  L('it/dolomites/landmark-bivacco.v1.svg', 'ที่พักฉุกเฉินสีแดงบนสันเขา', 'A little red bivouac hut on a ridge', ['bivacco', 'bivouac', 'ที่พักฉุกเฉินบนเขา', 'red mountain shelter', 'กระท่อมแดงบนเขา', 'high ridge', 'สันเขาสูง', 'alpine hiking', 'เดินเขาสูง', 'mountain refuge', 'climbers hut'], 'หากล่องสีแดงที่มีหน้าต่างกลมตั้งอยู่บนยอดหิน', 'Find the red box hut with a round window sitting on the rocks',
    // a small red barrel-roofed metal hut with a round window and a door perched on top of grey jagged rocks, peaks and clouds around, a hiker with poles walking up to it
    sky('#B3E5FC') + cloud(44, 60, 0.9) + cloud(200, 100, 0.7) + P('M150 120l30-60 30 40 34-20v100H150z', '#CFD8DC', 3)
      + P('M10 244l40-110 30 30 40-40 40 50 30-20 54 90z', '#9E9E9E', 3) + P('M50 134l10 30M120 114l-6 34', 'none', 2.5)
      + g(116, 106, 1, P('M-40 10v-36c0-20 80-20 80 0v36z', '#E53935') + C(-14, -12, 9, '#B3E5FC', 3) + R(10, -16, 18, 26, '#B71C1C', 2, 2.5) + Lc('M-40-20h80', '#C62828', 2) + R(-46, 8, 92, 8, '#757575', 2, 2.5))
      + face(100, 104, 0.3) + kid(186, 200, '#FFB300', 1.3) + Lc('M198 192l8 20M174 192l-6 20', '#6D4C41', 3)),
  L('it/dolomites/landmark-bletterbach.v1.svg', 'รอยเท้าไดโนเสาร์ในหุบเขาเบล็ตเทอร์บัค', 'Dinosaur footprints in the Bletterbach gorge', ['bletterbach', 'เบล็ตเทอร์บัค', 'dinosaur footprints', 'รอยเท้าไดโนเสาร์', 'gorge', 'หุบเขาลึก', 'rock layers', 'ชั้นหิน', 'geopark', 'จีโอพาร์ก', 'aldein'], 'หารอยเท้าสามนิ้วที่ประทับอยู่บนแผ่นหิน', 'Find the three-toed footprints pressed into the rock slab',
    // a canyon wall of red, cream and grey rock stripes, in front a tilted slab with a line of big three-toed dinosaur footprints, a child with a magnifying glass looking at them
    sky('#FFE0B2') + P('M-4 30h248v130H-4z', '#E57373', 3) + Lc('M-4 60c60 6 140-6 248 4M-4 90c60 6 140-6 248 4M-4 120c60 6 140-6 248 4', '#FFF3E0', 8) + Lc('M-4 140c60 4 140-6 248 2', '#B0BEC5', 8)
      + P('M-4 170l60-24 188 20v78H-4z', '#D7CCC8', 3)
      + [[40, 200, -10], [90, 182, 10], [140, 206, -10]].map(([x, y, r]) => g(x, y, 1.5, E(0, 4, 12, 14, '#6D4C41', 2.5) + [-14, 0, 14].map((t) => g(0, -6, 1, E(0, -14, 5, 10, '#6D4C41', 2.5), t * 2)).join(''), r)).join('')
      + kid(196, 214, '#43A047', 1.4) + g(176, 186, 1, C(0, 0, 12, '#E3F2FD', 3) + Lc('M8 8l12 12', '#6D4C41', 5)) + face(120, 104, 0.3)),
  L('it/dolomites/landmark-tirtlen.v1.svg', 'ขนมทอดเทิร์ทเลินไส้ผักโขม', 'Tirtlen, the round fried pastries of South Tyrol', ['tirtlen', 'tirtl', 'เทิร์ทเลิน', 'fried pastries', 'แป้งทอดไส้', 'spinach and ricotta', 'ผักโขมและริคอตตา', 'sauerkraut filling', 'ไส้กะหล่ำดอง', 'south tyrol food', 'อาหารทิโรลใต้', 'törggelen'], 'หาแป้งทอดแผ่นกลมที่ถูกตัดออกให้เห็นไส้สีเขียว', 'Find the round fried pastry cut open to show its green filling',
    // three round flat fried pastries with bubbly golden crusts and fork-pressed edges on a wooden board, one cut in half showing a green spinach filling, a sprig of chive and a little cup of sauerkraut
    R(26, 150, 188, 50, '#C68B59', 14) + C(204, 174, 6, '#A0703F', 2)
      + [[70, 120], [150, 106]].map(([x, y]) => g(x, y, 1, E(0, 0, 44, 30, '#E8A33A') + E(0, 0, 36, 22, '#F6C46A', 2) + [[-14, -6], [10, 6], [16, -10], [-6, 10]].map(([a, b]) => C(a, b, 3.5, '#E8A33A', 1.5)).join(''))).join('')
      + g(110, 172, 1, P('M-46 0c0-20 20-30 46-30s46 10 46 30z', '#E8A33A') + P('M-40 0c0-14 16-22 40-22s40 8 40 22z', '#66BB6A', 3) + C(-14, -6, 3, '#FFFDF5', 0) + C(12, -10, 3, '#FFFDF5', 0))
      + face(150, 104, 0.32) + g(196, 120, 1, P('M-18-10h36l-4 24h-28z', '#FFFFFF', 3) + Lc('M-12-8c4-6 8 4 12-4s8 2 12-4', '#E6EE9C', 4))),

  // ---------- Sicily
  L('it/sicily/landmark-bronte.v1.svg', 'พิสตาชิโอแห่งบรอนเตบนลาวาเอตนา', 'The pistachios of Bronte on Etna\'s lava', ['bronte pistachios', 'pistacchio di bronte', 'พิสตาชิโอบรอนเต', 'green pistachio', 'พิสตาชิโอเขียว', 'pistachio tree', 'ต้นพิสตาชิโอ', 'black lava field', 'ทุ่งลาวาดำ', 'etna slopes', 'pistachio cream'], 'หาพวงพิสตาชิโอเปลือกสีชมพูที่ห้อยจากกิ่ง', 'Find the bunch of pink-shelled pistachios hanging from the branch',
    // a smoking volcano far behind, a gnarled little tree growing out of black lava rocks, in front a big branch with a bunch of pistachios in rosy-pink husks, one cracked open to show the bright green nut, a jar of green cream
    sky('#FFE0B2') + P('M60 120l50-70h20l50 70z', '#8D6E63', 3) + Lc('M120 46c-8-10 8-16 0-26', '#BDBDBD', 6) + R(-4, 120, 248, 124, '#455A64', 0, 3)
      + [[30, 150], [70, 170], [200, 160], [180, 214]].map(([x, y]) => E(x, y, 22, 10, '#37474F', 2.5)).join('')
      + g(120, 110, 1, Lc('M-80-30c30 10 60 0 90 10', '#6D4C41', 8) + leaf(-60, -34, -100, '#7CB342', 0.9) + leaf(-20, -26, -60, '#7CB342', 0.9)
        + [[0, 0], [16, 4], [-12, 12], [6, 18], [24, 20], [-4, 32], [14, 34]].map(([x, y]) => E(x, y, 9, 12, '#F48FB1', 2.5)).join(''))
      + g(70, 196, 1, E(0, 0, 18, 24, '#F8BBD0') + E(0, 4, 10, 16, '#9CCC65', 2.5) + face(0, 4, 0.22))
      + g(178, 196, 1, R(-22, -26, 44, 50, '#C5E1A5', 6) + R(-24, -34, 48, 12, '#FFD54F', 3, 2.5) + face(0, 0, 0.3))),
  L('it/sicily/landmark-arethusa.v1.svg', 'น้ำพุอาเรตูซาและต้นปาปิรุส', 'The Fountain of Arethusa and its papyrus', ['fountain of arethusa', 'fonte aretusa', 'น้ำพุอาเรตูซา', 'papyrus plants', 'ต้นปาปิรุส', 'ortigia', 'ออร์ตีเจีย', 'freshwater pool by the sea', 'สระน้ำจืดริมทะเล', 'syracuse', 'grey mullet fish'], 'หาต้นปาปิรุสหัวฟูเหมือนพู่ในสระน้ำ', 'Find the papyrus plants with fluffy mop heads growing in the pool',
    // a round pool sunk below a stone wall with railings, tall papyrus stalks with round mop heads growing out of the water, fish swimming, the blue sea and a palm tree beyond the wall
    sky('#B3E5FC') + R(-4, 60, 248, 40, '#42A5F5', 0, 3) + Lc('M10 80c14-4 28 4 42 0', '#BBDEFB', 3)
      + P('M-4 100h248v144H-4z', '#E8DCC4', 3) + Lc('M-4 100h248', '#BCAAA4', 3) + Array.from({ length: 12 }, (_, k) => Lc(`M${6 + k * 20} 86v14`, '#455A64', 2)).join('') + Lc('M-4 86h248', '#455A64', 3)
      + E(120, 186, 104, 46, '#4DB6AC', 3) + E(120, 186, 104, 46, 'none', 0)
      + [[60, 180, 90], [86, 190, 110], [150, 186, 100], [176, 176, 84], [118, 196, 120]].map(([x, y, h]) => Lc(`M${x} ${y}L${x + (x - 120) / 10} ${y - h}`, '#558B2F', 3) + g(x + (x - 120) / 10, y - h, 1, Array.from({ length: 7 }, (_, k) => Lc(`M0 0l${(16 * Math.cos(-Math.PI + k * Math.PI / 6)).toFixed(1)} ${(16 * Math.sin(-Math.PI + k * Math.PI / 6)).toFixed(1)}`, '#7CB342', 3)).join(''))).join('')
      + [[90, 214, 1], [154, 216, -1]].map(([x, y, d]) => g(x, y, 1, E(0, 0, 14, 6, '#B0BEC5', 2) + P(`M${-14 * d} 0l${-8 * d}-6v12z`, '#B0BEC5', 2) + C(8 * d, -1, 1.5, INK, 0))).join('') + face(150, 128, 0.3)),
  L('it/sicily/landmark-mondello.v1.svg', 'ศาลาลิเบอร์ตีกลางทะเลที่มอนเดลโล', 'The Liberty-style pier pavilion of Mondello', ['mondello', 'มอนเดลโล', 'liberty pavilion', 'ศาลากลางทะเล', 'antico stabilimento balneare', 'art nouveau pier', 'ศาลาบนเสาในทะเล', 'monte pellegrino', 'turquoise sea', 'ทะเลสีเทอร์ควอยซ์', 'palermo beach'], 'หาศาลาสีครีมที่ตั้งอยู่บนเสากลางทะเลสีฟ้า', 'Find the cream pavilion standing on legs in the turquoise sea',
    // a curly cream-and-yellow art nouveau pavilion with little domes and frilly arches standing on stilts in turquoise water, a wooden walkway to the white sand beach, a big rocky headland behind
    sky('#E1F5FE') + P('M100 120c20-80 80-90 144-80v80z', '#A1887F', 3) + R(-4, 116, 248, 128, '#4DD0E1', 0, 3) + P('M-4 200c40-6 80-4 110 10v34H-4z', '#FFF3D6', 3)
      + Lc('M70 206l40-40', '#8D6E63', 7) + g(150, 140, 1, [-56, -28, 0, 28, 56].map((x) => Lc(`M${x} 0v34`, '#8D6E63', 4)).join('') + R(-70, -46, 140, 46, '#FFF3D6', 0, 3) + [-48, -16, 16, 48].map((x) => P(`M${x - 12} 0v-22c0-14 24-14 24 0v22z`, '#4DB6AC', 2.5)).join('')
        + P('M-76-46h152l-8-8h-136z', '#FFD54F', 3) + [-54, 0, 54].map((x) => P(`M${x - 14} -54c0-24 28-24 28 0z`, '#FFE082', 3) + Lc(`M${x} -78v-8`, INK, 2.5)).join('') + face(0, -24, 0.3))
      + Lc('M20 150c14-4 28 4 42 0M170 200c14-4 28 4 42 0', '#E0F7FA', 3)),
  L('it/sicily/landmark-capers.v1.svg', 'ต้นเคเปอร์งอกจากกำแพงหิน', 'A caper bush growing out of an old stone wall', ['capers', 'capperi', 'เคเปอร์', 'caper flower', 'ดอกเคเปอร์', 'pantelleria', 'salina', 'aeolian islands', 'หมู่เกาะเอโอเลียน', 'stone wall plant', 'ต้นไม้บนกำแพงหิน', 'pickled buds'], 'หาดอกเคเปอร์สีขาวชมพูที่มีเกสรยาวสีม่วง', 'Find the pink-white caper flower with long purple whiskers',
    // a sunny old wall of stacked stones with a round caper bush spilling out of it, round green leaves, a big white-pink flower with long purple stamens, round green buds, and a little jar of pickled capers in front
    sky('#FFF8E1') + R(-4, 30, 248, 180, '#E0C9A6', 0, 0) + [[0, 40], [60, 40], [120, 40], [180, 40], [30, 80], [90, 80], [150, 80], [210, 80], [0, 120], [60, 120], [180, 120], [30, 160], [210, 160]].map(([x, y]) => R(x, y, 58, 38, '#D7C29A', 6, 2.5)).join('') + R(-4, 200, 248, 44, '#C5E1A5', 0, 3)
      + [[80, 120], [104, 104], [130, 120], [150, 100], [92, 146], [140, 150], [64, 140]].map(([x, y]) => C(x, y, 14, '#7CB342', 2.5)).join('')
      + g(118, 128, 1, [0, 90, 180, 270].map((a) => g(0, 0, 1, E(0, -18, 14, 18, '#FCE4EC', 2.5), a)).join('') + Array.from({ length: 7 }, (_, k) => Lc(`M0 0l${(32 * Math.cos(-2.6 + k * 0.35)).toFixed(1)} ${(32 * Math.sin(-2.6 + k * 0.35)).toFixed(1)}`, '#8E24AA', 2)).join('') + face(0, 4, 0.26))
      + [[170, 130], [60, 108], [176, 156]].map(([x, y]) => C(x, y, 6, '#9CCC65', 2)).join('')
      + g(196, 200, 1, R(-18, -24, 36, 40, '#E8F5E9', 6) + R(-20, -30, 40, 10, '#C62828', 3, 2.5) + [[-8, -6], [6, -2], [-4, 8], [8, 10]].map(([x, y]) => C(x, y, 4, '#689F38', 1.5)).join(''))),

  // ---------- The Cinque Terre
  L('it/cinqueterre/landmark-biketunnel.v1.svg', 'ทางจักรยานในอุโมงค์รถไฟเก่าริมทะเล', 'The cycle path through the old railway tunnels by the sea', ['levanto bike path', 'pista ciclabile', 'ทางจักรยาน', 'old railway tunnel', 'อุโมงค์รถไฟเก่า', 'bonassola', 'framura', 'sea windows', 'ช่องหน้าต่างเห็นทะเล', 'cycling by the sea', 'ปั่นจักรยานริมทะเล'], 'หาช่องหน้าต่างในอุโมงค์ที่มองเห็นทะเลสีฟ้า', 'Find the window in the tunnel wall where you can see the blue sea',
    // inside a long stone tunnel with lamps, a big arched opening in its side showing the bright blue sea and a rock, the tunnel's far end glowing, a family riding bikes along the smooth path towards us
    R(-4, -4, 248, 248, '#8D7B68', 0, 0) + P('M20 244V90c0-90 200-90 200 0v154z', '#BCAAA4', 3) + E(120, 110, 24, 30, '#FFF59D', 3)
      + P('M30 180V120c0-30 50-30 50 0v60z', '#4FC3F7', 3) + R(30, 150, 50, 30, '#1E88E5', 0, 0) + P('M54 150c4-10 14-10 18 0z', '#8D6E63', 2) + Lc('M30 150h50', INK, 3) + C(64, 130, 6, '#FFF59D', 2)
      + P('M80 244l30-104h20l30 104z', '#90A4AE', 3) + Lc('M120 150v90', '#FFFFFF', 3).replace('stroke-width="3"', 'stroke-width="3" stroke-dasharray="8 10"')
      + [[146, 80], [180, 98]].map(([x, y]) => C(x, y, 5, '#FFE082', 2)).join('')
      + g(140, 208, 1, C(-16, 14, 12, 'none', 3) + C(16, 14, 12, 'none', 3) + Lc('M-16 14l12-18h16l4 18M0-4l-4-10', INK, 3) + C(-2, -30, 8, '#FFE0BD', 2) + P('M-8-22h12l2 16h-14z', '#E53935', 2) + face(-2, -30, 0.2))
      + g(184, 220, 0.7, C(-16, 14, 12, 'none', 3) + C(16, 14, 12, 'none', 3) + Lc('M-16 14l12-18h16l4 18', INK, 3) + C(-2, -30, 8, '#FFE0BD', 2) + P('M-8-22h12l2 16h-14z', '#43A047', 2) + face(-2, -30, 0.2))),
  L('it/cinqueterre/landmark-sanfruttuoso.v1.svg', 'อารามซานฟรุตตูโอโซในอ่าวเล็ก', 'The abbey of San Fruttuoso in its tiny cove', ['san fruttuoso', 'ซานฟรุตตูโอโซ', 'abbey in a cove', 'อารามในอ่าว', 'portofino park', 'อุทยานปอร์โตฟิโน', 'pebble beach', 'หาดกรวด', 'reached only by boat or path', 'camogli', 'doria tower'], 'หาอารามหลังเล็กที่ซ่อนอยู่หลังหาดกรวดในอ่าว', 'Find the little abbey hiding behind the pebble beach in the cove',
    // a tiny cove between steep wooded hills, a pebble beach, and right behind it a stone abbey with arched porches on the water, a grey eight-sided dome tower, and a square watchtower on the slope above
    sky('#E1F5FE') + P('M-4 60c40-20 70 20 90 60v80H-4z', '#388E3C', 3) + P('M244 50c-50-10-80 30-96 70v80h96z', '#2E7D32', 3) + [[20, 80], [40, 100], [200, 76], [220, 100]].map(([x, y]) => C(x, y, 12, '#43A047', 2)).join('')
      + R(-4, 190, 248, 54, '#29B6F6', 0, 3) + P('M50 194c30-10 110-10 140 0v10H50z', '#E0E0E0', 3)
      + g(120, 150, 1, R(-50, -30, 100, 44, '#EFE6D2', 0, 3) + [-34, -12, 10, 32].map((x) => P(`M${x - 8} 14v-18c0-10 16-10 16 0v18z`, '#8D6E63', 2.5)).join('') + R(-14, -64, 28, 34, '#EFE6D2', 0, 3) + P('M-18-64c0-22 36-22 36 0z', '#90A4AE', 3) + Lc('M0-82v-8', INK, 2.5) + face(0, -46, 0.24))
      + R(184, 84, 22, 34, '#D7C29A', 0, 3) + R(182, 80, 26, 6, '#BCAAA4', 0, 2.5) + Lc('M20 214c14-4 28 4 42 0M160 226c14-4 28 4 42 0', '#E1F5FE', 3)),
  L('it/cinqueterre/landmark-trompeloeil.v1.svg', 'หน้าต่างวาดหลอกตาบนบ้านลิกูเรีย', 'The painted pretend windows of Liguria', ['trompe l\'oeil', 'trompe-l\'œil', 'ภาพวาดหลอกตา', 'painted windows', 'หน้าต่างวาด', 'ligurian facades', 'หน้าบ้านลิกูเรีย', 'fake shutters', 'บานเกล็ดปลอม', 'portofino', 'camogli', 'painted houses'], 'หาหน้าต่างที่ไม่ใช่ของจริง แต่เป็นภาพวาดบนผนัง', 'Find the window that is not real but painted on the wall',
    // a tall pink Ligurian house: two real windows with green shutters, and two painted pretend ones drawn flat with painted shutters and a painted lady-free flower pot, painted stone corners, a painter on a ladder adding the last shutter
    sky('#B3E5FC') + R(30, 20, 150, 224, '#F8BBD0', 0, 3) + [[30, 20], [30, 60], [30, 100], [30, 140], [164, 20], [164, 60], [164, 100], [164, 140]].map(([x, y]) => R(x, y, 16, 20, '#FFE0B2', 0, 1.5)).join('') + Lc('M30 186h150', '#F48FB1', 3)
      + [[56, 50, 1], [120, 50, 0], [56, 120, 0], [120, 120, 1]].map(([x, y, real]) => real
        ? R(x, y, 34, 44, '#37474F', 2, 3) + R(x - 14, y, 12, 44, '#2E7D32', 2, 2.5) + R(x + 36, y, 12, 44, '#2E7D32', 2, 2.5)
        : R(x, y, 34, 44, '#90A4AE', 0, 0) + R(x - 14, y, 12, 44, '#81C784', 0, 0) + R(x + 36, y, 12, 44, '#81C784', 0, 0) + Lc(`M${x + 17} ${y}v44M${x} ${y + 22}h34`, '#ECEFF1', 2)).join('')
      + R(130, 168, 20, 12, '#E07B39', 0, 0) + C(140, 162, 8, '#E53935', 0) + P('M66 244v-40c0-16 24-16 24 0v40z', '#6D4C41', 3)
      + Lc('M210 244l-20-110M232 244l-20-110M198 200h24M194 170h24', '#8D6E63', 3) + kid(206, 150, '#FFFFFF', 1.2) + Lc('M198 136l-26-6', '#6D4C41', 3) + C(170, 130, 4, '#81C784', 1.5) + face(73, 90, 0.26)),
  L('it/cinqueterre/landmark-pansoti.v1.svg', 'พาสต้าปันโซตีราดซอสวอลนัต', 'Pansoti with walnut sauce', ['pansoti', 'ปันโซตี', 'triangle pasta', 'พาสต้าสามเหลี่ยม', 'walnut sauce', 'ซอสวอลนัต', 'salsa di noci', 'wild herbs filling', 'ไส้ผักป่า', 'ligurian pasta', 'พาสต้าลิกูเรีย'], 'หาพาสต้ารูปสามเหลี่ยมพุงป่องราดซอสสีครีม', 'Find the plump triangle pasta under the creamy sauce',
    // a white plate of plump triangular pasta pillows with pinched edges, coated in pale creamy walnut sauce, walnut halves scattered round, a few green herb leaves
    plate(186, 104) + E(120, 172, 76, 28, '#F3E5C8', 3)
      + [[84, 156, -10], [120, 148, 6], [156, 158, 16], [100, 178, 26], [140, 180, -18]].map(([x, y, r]) => g(x, y, 1, P('M-20 12l20-30 20 30z', '#FFE9A8', 3) + Lc('M-16 8l16-24 16 24', '#E8C77A', 2), r)).join('')
      + [[70, 172], [168, 170], [126, 164]].map(([x, y]) => C(x, y, 3, '#FFFDF5', 0)).join('') + leaf(108, 140, -40, '#43A047', 0.6) + leaf(150, 140, -150, '#43A047', 0.6) + face(120, 152, 0.3)
      + [[40, 108], [200, 110], [190, 80]].map(([x, y]) => g(x, y, 1, E(0, 0, 16, 12, '#C68B59') + Lc('M0-10v20M-8-6c4 4 4 8 0 12M8-6c-4 4-4 8 0 12', '#8D5524', 2))).join('')),
  L('it/cinqueterre/landmark-castagnaccio.v1.svg', 'ขนมกัสตันญัชโชจากแป้งเกาลัด', 'Castagnaccio, the chestnut flour cake', ['castagnaccio', 'กัสตันญัชโช', 'chestnut flour cake', 'เค้กแป้งเกาลัด', 'pine nuts', 'เมล็ดสน', 'rosemary', 'โรสแมรี', 'autumn treat', 'ขนมฤดูใบไม้ร่วง', 'chestnuts', 'เกาลัด'], 'หาเมล็ดสนสีขาวและใบโรสแมรีบนเค้กสีน้ำตาล', 'Find the pine nuts and rosemary leaves on top of the brown cake',
    // a round copper pan holding a flat dark brown cake with a crinkly cracked top, sprinkled with pale pine nuts, raisins and rosemary needles, a slice lifted out, whole chestnuts in prickly cases beside it
    E(110, 200, 96, 18, '#E3F2FD') + E(110, 168, 88, 30, '#D9844A') + E(110, 160, 80, 26, '#8D5524', 3) + Lc('M60 160c10-6 20 4 30-2s20 4 30-2 20 4 30-2', '#6D3F18', 2)
      + [[70, 156], [90, 150], [116, 152], [140, 156], [156, 164], [84, 168], [130, 168], [104, 162]].map(([x, y], k) => (k % 3 === 2 ? C(x, y, 3.5, '#4E342E', 1.5) : E(x, y, 5, 3, '#FFF3D6', 1.5))).join('')
      + Lc('M76 150l10 4M96 166l10-4M134 150l8 6M150 156l8-4', '#33691E', 2.5) + face(108, 160, 0.3)
      + g(194, 112, 1, C(0, 0, 22, '#9CCC65') + Array.from({ length: 10 }, (_, k) => Lc(`M${(22 * Math.cos(k * 0.63)).toFixed(1)} ${(22 * Math.sin(k * 0.63)).toFixed(1)}l${(8 * Math.cos(k * 0.63)).toFixed(1)} ${(8 * Math.sin(k * 0.63)).toFixed(1)}`, '#7CB342', 2)).join('') + E(0, 4, 12, 10, '#8D5524', 2.5) + E(-2, 0, 4, 2, '#FFF3D6', 0))
      + g(196, 170, 1, P('M-16 8c0-14 8-22 16-22s16 8 16 22z', '#8D5524') + R(-16, 6, 32, 6, '#D7B07A', 2, 2))),
];

export default { places: {}, items };
