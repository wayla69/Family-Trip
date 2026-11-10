// Wave 9, the north (part 3): Helsinki, Edinburgh and Scotland, the Cotswolds, Estonia, Tallinn
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const X = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const pine = (x, y, s) => g(x, y, s, P('M0-40l14 22h-7l11 18H-18l11-18h-7z', '#2E7D32', 2.5) + R(-3, 0, 6, 8, '#6D4C41', 0, 2));
const water = (y, c = '#4FC3F7') => P(`M-4 ${y}h248v${244 - y}H-4z`, c, 0);
const waves = (pts, c = '#E1F5FE') => pts.map(([x, y]) => Lc(`M${x} ${y}q6-5 12 0t12 0`, c, 2.5)).join('');
const lawn = (y, c = '#9CCC65') => P(`M-4 ${y}h248v${244 - y}H-4z`, c, 0) + Lc(`M-4 ${y}h248`, INK, 3);
const stones = (pts, c = '#BCAAA4') => pts.map(([x, y]) => E(x, y, 12, 6, c, 2)).join('');

const items = [
  // ---------- Helsinki
  L('fi/helsinki/landmark-kiasma.v1.svg', 'พิพิธภัณฑ์ศิลปะคีอาสมา ตึกโค้งสีเงิน', 'Kiasma, the curving silver art museum', ['kiasma', 'คีอาสมา', 'museum of contemporary art', 'พิพิธภัณฑ์ศิลปะร่วมสมัย', 'curved building', 'ตึกโค้ง', 'mannerheimintie', 'มันเนอร์ไฮมินตี', 'zinc roof', 'art for kids'], 'หาหลังคาสีเงินที่โค้งงอเหมือนกล้วย', 'Find the silver roof that bends like a banana',
    // a long building whose shiny silver roof sweeps up and curls over at one end like a bent banana, a tall glass wall at the curved end and a grassy slope with kids in front
    sky('#E3F2FD') + P('M14 190V120c0-30 40-40 120-40 50 0 80-20 92-56 10 30 6 70-10 90-10 14-20 16-20 30v46z', '#CFD8DC', 3.5)
    + Lc('M30 118c30-20 100-26 140-28M40 140c40-16 100-20 140-20', '#B0BEC5', 2) + P('M196 144v46h-60v-46c20 4 44 4 60 0z', '#90CAF9', 3) + Lc('M156 146v44M176 146v44', '#BBDEFB', 2)
    + R(20, 150, 112, 40, '#B3E5FC', 2, 3) + Lc('M48 150v40M76 150v40M104 150v40', '#E3F2FD', 2) + face(96, 112, 0.42)
    + lawn(190) + kid(60, 222, '#E53935', 0.85) + kid(170, 222, '#FFCA28', 0.85)),
  L('fi/helsinki/landmark-nationalmuseum.v1.svg', 'พิพิธภัณฑ์แห่งชาติฟินแลนด์กับหอคอยหิน', 'The National Museum of Finland and its stone tower', ['national museum of finland', 'พิพิธภัณฑ์แห่งชาติฟินแลนด์', 'kansallismuseo', 'คันซัลลิสมูเซโอ', 'stone tower', 'หอคอยหิน', 'national romantic', 'สถาปัตยกรรมโรแมนติกแห่งชาติ', 'finnish history', 'granite castle'], 'หาหอคอยสูงที่หลังคาแหลมเหมือนดินสอ', 'Find the tall tower with a roof like a sharpened pencil',
    // a chunky grey granite building like a small castle, steep red-tiled roofs, round arched windows and one tall square stone tower with a very sharp pointed copper-green roof
    sky('#FFF8E1') + R(94, 46, 52, 140, '#9E9E9E', 2, 3.5) + P('M90 48l30-44 30 44z', '#4DB6AC', 3.5) + Lc('M120 4V-4', INK, 3) + R(110, 66, 20, 26, '#FFF8E1', 10, 2.5) + R(110, 104, 20, 26, '#FFF8E1', 10, 2.5)
    + R(14, 116, 80, 74, '#A1887F', 2, 3.5) + P('M8 118l46-40 46 40z', '#C0603A', 3.5) + R(146, 110, 84, 80, '#A1887F', 2, 3.5) + P('M140 112l46-42 46 42z', '#C0603A', 3.5)
    + [[28, 140], [60, 140], [162, 136], [196, 136]].map(([x, y]) => R(x, y, 18, 26, '#FFF8E1', 9, 2.5)).join('') + R(104, 150, 32, 40, '#5D4037', 16, 3)
    + Lc('M14 132h80M146 128h84', '#8D6E63', 2) + face(120, 136, 0.3) + lawn(190) + kid(60, 222, '#7E57C2', 0.85) + kid(186, 222, '#26A69A', 0.85)),
  L('fi/helsinki/landmark-pohjola.v1.svg', 'ประตูหินตึกโปห์ยอลากับหน้าภูตแกะสลัก', 'The Pohjola building’s stone door and its carved goblin faces', ['pohjola building', 'ตึกโปห์ยอลา', 'pohjolan talo', 'carved stone faces', 'หน้าภูตแกะสลักหิน', 'aleksanterinkatu', 'อะเลกซันเตรินกาตู', 'national romantic', 'goblin carvings', 'rough granite'], 'หาหน้าภูตตัวเล็กที่ซ่อนอยู่รอบประตู', 'Find the little goblin faces hiding round the door',
    // a big round-arched doorway in a wall of rough brown-grey granite blocks, little carved goblin and troll faces peeping out of the stones round the arch, carved pine trees on the pillars
    sky('#ECEFF1') + R(-4, -4, 248, 248, '#8D8378', 0, 0)
    + [[0, 10, 60], [64, 10, 56], [124, 10, 64], [192, 10, 52], [0, 46, 40], [44, 46, 70], [196, 46, 48], [0, 82, 30], [210, 82, 34], [0, 118, 26], [214, 118, 30], [0, 154, 28], [212, 154, 32], [0, 190, 30], [210, 190, 34]].map(([x, y, w]) => R(x, y, w, 32, '#A1958A', 8, 2.5)).join('')
    + P('M34 244V130c0-60 40-96 86-96s86 36 86 96v114z', '#6D6259', 3.5) + P('M56 244V136c0-46 28-74 64-74s64 28 64 74v108z', '#3E2723', 3.5) + R(70, 120, 100, 124, '#5D4037', 4, 3) + Lc('M120 120v124', INK, 2.5) + C(110, 186, 4, '#FFCA28', 2) + C(130, 186, 4, '#FFCA28', 2)
    + [[60, 70], [120, 40], [180, 70], [40, 130], [200, 130]].map(([x, y], i) => g(x, y, 1, C(0, 0, 13, '#B6AA9C', 2.5) + P('M-12-6l-6-10 10 4M12-6l6-10-10 4', '#B6AA9C', 2) + face(0, 0, 0.24, i % 2 ? 'o' : 'smile'))).join('')
    + [[44, 210], [196, 210]].map(([x, y]) => P(`M${x} ${y - 40}l12 20h-6l10 18h-32l10-18h-6z`, '#8D8378', 2.5)).join('')),
  L('fi/helsinki/landmark-porvoo.v1.svg', 'โรงเก็บของสีแดงริมแม่น้ำเมืองปอร์วู', 'The red riverside storehouses of Porvoo', ['porvoo', 'ปอร์วู', 'red storehouses', 'โกดังไม้สีแดง', 'porvoo river', 'แม่น้ำปอร์วู', 'old town porvoo', 'เมืองเก่าปอร์วู', 'day trip from helsinki', 'wooden houses'], 'หาบ้านไม้สีแดงที่ยืนเรียงริมน้ำ', 'Find the red wooden houses lined up along the river',
    // a row of tall narrow ox-blood red wooden storehouses with steep roofs standing shoulder to shoulder along a calm river, their reflections wobbling in the water, a wooden bridge at the side
    sky('#E3F2FD') + P('M-4 70c60-20 140-30 248-10v40H-4z', '#81C784', 3) + water(140, '#4FC3F7')
    + [[6, 44], [52, 40], [94, 46], [142, 42], [186, 46]].map(([x, w], i) => R(x, 76 - i % 2 * 8, w, 66 + i % 2 * 8, '#A63A2B', 1, 3.5) + P(`M${x - 4} ${78 - i % 2 * 8}l${w / 2 + 4} -26 ${w / 2 + 4} 26z`, '#7B2A1E', 3) + R(x + w / 2 - 7, 100, 14, 18, '#FFFFFF', 1, 2.5) + Lc(`M${x + 6} ${86}v50`, '#8B2F22', 2)).join('')
    + [[6, 44], [52, 40], [94, 46], [142, 42], [186, 46]].map(([x, w]) => R(x + 4, 150, w - 8, 30, '#E57373', 0, 0)).join('') + waves([[20, 186], [100, 196], [170, 184]]) + R(-4, 140, 248, 4, '#3E2723', 0, 0)
    + face(74, 120, 0.26) + P('M-4 214c30-16 70-16 100 0', 'none', 4) + Lc('M10 206v20M40 200v24M70 202v22', '#8D6E63', 3)),
  L('fi/helsinki/landmark-mattolaituri.v1.svg', 'แพลอยซักพรมริมทะเลแบบฟินแลนด์', 'Washing rugs by the sea on a carpet pier', ['carpet washing pier', 'แพซักพรม', 'mattolaituri', 'มัตโตไลตูรี', 'rag rug', 'พรมผ้าทอ', 'scrubbing brush', 'แปรงขัด', 'finnish summer', 'seaside tradition'], 'หาพรมลายทางที่ตากอยู่บนราว', 'Find the striped rugs drying on the rails',
    // a wooden pier over the sea with a long washing table and an old hand-cranked wringer, a grown-up scrubbing a striped rag rug with a big brush, more stripy rugs hanging to dry on wooden rails
    sky('#E1F5FE') + water(150, '#4FC3F7') + waves([[20, 214], [120, 226], [190, 210]])
    + R(-4, 150, 248, 20, '#C8A165', 2, 3.5) + [20, 80, 140, 200].map((x) => R(x - 4, 170, 8, 50, '#8D6E63', 1, 2.5)).join('')
    + Lc('M120 150V70M224 150V70M116 72h112', '#8D6E63', 4) + [[134, '#E53935', '#FFCA28'], [168, '#1E88E5', '#FFFFFF'], [200, '#43A047', '#F06292']].map(([x, a, b]) => R(x - 12, 72, 24, 66, a, 2, 3) + Lc(`M${x - 12} 88h24M${x - 12} 104h24M${x - 12} 120h24`, b, 5)).join('')
    + R(14, 118, 96, 10, '#A1887F', 2, 3) + R(18, 128, 6, 22, '#8D6E63', 1, 2) + R(100, 128, 6, 22, '#8D6E63', 1, 2) + R(24, 106, 70, 12, '#7E57C2', 2, 2.5) + Lc('M30 106v12M44 106v12M58 106v12M72 106v12M86 106v12', '#FFF59D', 3)
    + g(66, 86, 1, R(-12, -12, 24, 26, '#FF7043', 6, 3) + C(0, -24, 11, '#FFE0BD', 3) + P('M-11-28c2-10 20-10 22 0z', '#FFFFFF', 2) + face(0, -22, 0.24) + Lc('M8 0l10 16', '#FFE0BD', 5) + R(10, 14, 22, 8, '#A1887F', 3, 2))
    + face(112, 162, 0.3)),
  L('fi/helsinki/landmark-hvittrask.v1.svg', 'บ้านริมทะเลสาบฮวิตแทรสก์ บ้านหินกับซุงหลังคาชัน', 'Hvitträsk, the stone-and-log house by the lake', ['hvittrask', 'ฮวิตแทรสก์', 'hvitträsk', 'architects home', 'บ้านสถาปนิก', 'lakeside villa', 'วิลลาริมทะเลสาบ', 'kirkkonummi', 'เคิร์กโกนุมมี', 'national romantic house'], 'หาหอคอยเล็กที่มีหลังคาแหลมบนบ้านซุง', 'Find the little pointed tower on the log house',
    // a storybook house on a rocky hill above a forest lake: a rough stone ground floor, dark log walls above, very steep shingle roofs and a little round tower, pine trees around
    sky('#FFF3E0') + water(170, '#64B5F6') + waves([[30, 200], [150, 214]]) + P('M-4 176c40-20 100-30 160-24 40 4 70 14 88 26v-10H-4z', '#8D8378', 3)
    + pine(24, 160, 1.1) + pine(220, 162, 1.2) + pine(200, 150, 0.8)
    + R(44, 120, 140, 44, '#A1958A', 2, 3.5) + [[52, 128, 30], [88, 128, 40], [134, 128, 40], [52, 144, 46], [104, 144, 70]].map(([x, y, w]) => R(x, y, w, 12, '#B6AA9C', 4, 2)).join('')
    + R(50, 80, 128, 42, '#5D4037', 2, 3.5) + Lc('M50 92h128M50 104h128M50 116h128', '#4E342E', 2) + P('M40 82l42-48 42 48z', '#795548', 3.5) + P('M110 82l40-40 40 40z', '#795548', 3.5)
    + R(170, 70, 26, 94, '#A1958A', 13, 3.5) + P('M166 72l17-34 17 34z', '#795548', 3) + [[66, 92], [138, 92], [178, 96]].map(([x, y]) => R(x, y, 14, 18, '#FFE082', 2, 2.5)).join('') + face(110, 104, 0.3)),
  L('fi/helsinki/landmark-manul.v1.svg', 'แมวพัลลาสขนฟูที่สวนสัตว์เกาะกอร์เกอาซาริ', 'The fluffy Pallas’s cat at Korkeasaari Zoo', ['korkeasaari zoo', 'สวนสัตว์กอร์เกอาซาริ', 'helsinki zoo', 'สวนสัตว์เฮลซิงกิ', 'pallas cat', 'แมวพัลลาส', 'manul', 'มานูล', 'zoo island', 'grumpy cat'], 'หาแมวขนฟูที่หน้าบึ้งแต่น่ารัก', 'Find the fluffy cat with the grumpy-cute face',
    // a very fluffy round grey wild cat with tiny flat ears, a wide face with stripes on its cheeks and round eyes, lying on a big rock with its thick ringed tail curled round, pine trees behind
    sky('#E8F5E9') + pine(30, 120, 1.2) + pine(210, 116, 1.3) + P('M-4 150h248v94H-4z', '#A5D6A7', 0)
    + P('M30 214c0-40 30-60 90-60s90 20 90 60z', '#90A4AE', 3.5) + Lc('M70 180c20-6 40-6 60 0', '#78909C', 2)
    + g(120, 150, 1, E(14, 14, 56, 30, '#B0A99F', 3.5) + P('M60 24c24 4 34 20 20 30-6 4-16 2-22-2', '#B0A99F', 3) + Lc('M66 30l-4 10M74 34l-6 8', INK, 2.5)
      + E(-30, -10, 38, 30, '#BDB5AA', 3.5) + E(-56, -16, 7, 5, '#BDB5AA', 2.5) + E(-4, -16, 7, 5, '#BDB5AA', 2.5) + E(-30, 2, 18, 10, '#ECEFF1', 0)
      + C(-42, -10, 7, '#FFF59D', 2) + C(-18, -10, 7, '#FFF59D', 2) + C(-42, -10, 3.5, INK, 0) + C(-18, -10, 3.5, INK, 0) + P('M-34 0l4 4 4-4z', '#F48FB1', 1.5) + P('M-34 8q4 3 8 0', 'none', 2)
      + Lc('M-60-2l-8 2M-60 4l-8 4M0-2l8 2M0 4l8 4', INK, 2) + Lc('M-36-34v8M-30-36v8M-24-34v8', '#8D8378', 2.5) + Lc('M30 0v20M44-2v22', '#8D8378', 3))),

  // ---------- Edinburgh and Scotland
  L('gb/edinburgh/landmark-falkirkwheel.v1.svg', 'ฟอลเคิร์กวีล ลิฟต์ยกเรือหมุนได้', 'The Falkirk Wheel, the turning boat lift', ['falkirk wheel', 'ฟอลเคิร์กวีล', 'boat lift', 'ลิฟต์ยกเรือ', 'rotating lift', 'ลิฟต์หมุน', 'union canal', 'คลองยูเนียน', 'forth and clyde canal', 'canal boats'], 'หาแขนโค้งสองข้างที่หมุนยกเรือขึ้นลง', 'Find the two curved arms that turn to lift the boats',
    // a giant steel wheel shaped like two curved hooked blades joined at a hub, a water-filled gondola at each end carrying a little boat, a canal aqueduct running off the top on concrete pillars, a basin of water below
    sky('#E1F5FE') + water(190, '#4FC3F7') + waves([[20, 214], [170, 222]])
    + R(150, 40, 94, 14, '#B0BEC5', 2, 3) + [176, 214].map((x) => R(x - 6, 54, 12, 30, '#CFD8DC', 6, 2.5)).join('') + Lc('M154 46h88', '#4FC3F7', 4)
    + R(152, 112, 18, 80, '#B0BEC5', 3, 3) + g(110, 118, 1, P('M-10-10C-50-30-60-70-30-90c4 18 20 30 40 34 0 20-10 34-20 46z', '#CFD8DC', 3.5) + P('M10 10C50 30 60 70 30 90c-4-18-20-30-40-34 0-20 10-34 20-46z', '#CFD8DC', 3.5) + C(0, 0, 16, '#90A4AE', 3.5) + Lc('M0 0h50', '#90A4AE', 8) + C(0, 0, 16, '#90A4AE', 3.5) + face(0, -1, 0.24)
      + [[-26, -78], [26, 78]].map(([x, y]) => g(x, y, 1, R(-30, -10, 60, 20, '#4FC3F7', 4, 3) + P('M-14-10l4-10h20l4 10z', '#E53935', 2.5))).join(''))
    + R(28, 186, 160, 10, '#90A4AE', 2, 3) + kid(210, 186, '#43A047', 0.8)),
  L('gb/edinburgh/landmark-storr.v1.svg', 'เสาหินโอลด์แมนออฟสตอร์บนเกาะสกาย', 'The Old Man of Storr on the Isle of Skye', ['old man of storr', 'หินโอลด์แมนออฟสตอร์', 'isle of skye', 'เกาะสกาย', 'rock pinnacle', 'เสาหินยักษ์', 'trotternish', 'ทรอตเตอร์นิช', 'skye hike', 'portree'], 'หาเสาหินที่สูงที่สุดเหมือนตาแก่ยืนอยู่', 'Find the tallest rock pillar standing like an old man',
    // a tall thin lumpy rock pinnacle standing on a steep green hillside beside smaller jagged spires and a dark cliff, a path winding up, the sea and little islands far below
    sky('#E8EAF6') + water(180, '#7986CB') + E(40, 186, 24, 6, '#9FA8DA', 2) + E(210, 190, 18, 5, '#9FA8DA', 2)
    + P('M160 30l84-6v120l-60 20z', '#546E7A', 3.5) + Lc('M190 50l-4 80M216 40l2 90', '#455A64', 2)
    + P('M-4 244V150c50-20 140-30 248-10v104z', '#7CB342', 3.5) + P('M90 150c4-50 0-90 10-120 12-8 22-2 22 8 4 30 2 70 6 112z', '#78909C', 3.5) + Lc('M102 60l-2 40M112 80l2 40', '#607D8B', 2)
    + P('M138 146l6-40 8 6 4 34z', '#78909C', 3) + P('M60 152l8-30 10 28z', '#78909C', 3) + face(110, 100, 0.3)
    + P('M30 244c20-30 50-40 60-80', 'none', 3).replace('fill="none"', 'fill="none" stroke-dasharray="6 6"') + kid(52, 214, '#E53935', 0.8)),
  L('gb/edinburgh/landmark-haggis.v1.svg', 'แฮกกิสกับมันบดสีส้มและสีขาว', 'Haggis, neeps and tatties', ['haggis', 'แฮกกิส', 'neeps and tatties', 'มันบดกับเทอร์นิป', 'scottish dinner', 'อาหารสกอตแลนด์', 'burns night', 'คืนเบิร์นส์', 'turnip mash', 'scottish food'], 'หาก้อนแฮกกิสกลมที่ผูกเชือกไว้', 'Find the round haggis tied up with string',
    // a round plump brown haggis tied at the top on a tartan-rimmed plate, a scoop of bright orange turnip mash and a scoop of fluffy white mashed potato beside it, a jug of gravy
    E(120, 180, 106, 30, '#FFFFFF', 3) + E(120, 180, 106, 30, 'none', 0) + P('M18 180c0 20 204 20 204 0', 'none', 0) + E(120, 178, 92, 22, '#F1F8E9', 0) + Lc('M30 192l20-6M190 192l-20-6', '#1E88E5', 4) + Lc('M40 198l16-6M200 196l-16-6', '#E53935', 3)
    + g(116, 134, 1, P('M-46 30c-10-40 10-70 46-70s56 30 46 70c-10 14-82 14-92 0z', '#7B4A2A', 3.5) + E(-14, -20, 14, 8, '#9C6A45', 0) + P('M-6-40c-6-10 0-18 6-14 6-4 12 4 6 14z', '#7B4A2A', 3) + Lc('M-10-36h20', '#E0C9A6', 4) + face(0, 0, 0.42))
    + g(56, 166, 1, P('M-24 10c-4-20 6-30 24-30s28 10 24 30z', '#FF9800', 3) + Lc('M-12-6c4-4 10-4 14 0', '#FFB74D', 3))
    + g(182, 164, 1, P('M-24 12c-6-22 4-32 24-32s30 10 24 32z', '#FFFDE7', 3) + Lc('M-10-8c4-6 12-6 16 0M-14 4c4-4 8-4 12 0', '#FFF59D', 3) + R(-4, -26, 8, 8, '#FFCA28', 2, 1.5))),
  L('gb/edinburgh/landmark-swilcan.v1.svg', 'สะพานหินสวิลแคนในสนามกอล์ฟเซนต์แอนดรูส์', 'The little Swilcan Bridge at St Andrews', ['swilcan bridge', 'สะพานสวิลแคน', 'st andrews', 'เซนต์แอนดรูส์', 'old course', 'สนามกอล์ฟเก่า', 'home of golf', 'บ้านเกิดกอล์ฟ', 'golf course', 'west sands beach'], 'หาสะพานหินเล็กๆ ที่ข้ามลำธาร', 'Find the tiny stone bridge over the stream',
    // a tiny humped stone footbridge over a narrow stream on smooth green golf turf, a red flag on the green behind, a white golf ball on the grass and a grey stone clubhouse in the distance
    sky('#E3F2FD') + R(120, 60, 110, 54, '#B0BEC5', 2, 3) + P('M114 62l20-18h82l20 18z', '#78909C', 3) + [[134, 76], [160, 76], [186, 76], [210, 76]].map(([x, y]) => R(x, y, 12, 18, '#ECEFF1', 6, 2)).join('')
    + lawn(110, '#8BC34A') + Lc('M30 150c40-10 140-10 200 0', '#9CCC65', 6)
    + Lc('M60 106V48', INK, 3) + P('M60 50l26 8-26 8z', '#E53935', 2.5) + E(60, 108, 12, 4, '#689F38', 2)
    + P('M-4 206c60-16 80-30 120-30s70 14 128 6v14c-58 8-88-6-128-6s-60 14-120 30z', '#4FC3F7', 3)
    + P('M70 202c6-40 94-40 100 0h-16c-6-24-62-24-68 0z', '#A1958A', 3.5) + Lc('M88 186l6 8M108 176v10M132 176v10M150 186l-6 8', '#8D8378', 2) + face(120, 172, 0.26)
    + C(190, 150, 6, '#FFFFFF', 2.5) + kid(36, 166, '#7E57C2', 0.85)),
  L('gb/edinburgh/landmark-heartmidlothian.v1.svg', 'หัวใจหินกลางถนนรอยัลไมล์', 'The Heart of Midlothian in the Royal Mile cobbles', ['heart of midlothian', 'หัวใจมิดโลเธียน', 'royal mile', 'ถนนรอยัลไมล์', 'heart in the cobbles', 'หัวใจบนพื้นหิน', 'parliament square', 'ลานพาร์เลียเมนต์', 'old town edinburgh', 'cobbled heart'], 'หารูปหัวใจที่ปูด้วยก้อนหินบนพื้นถนน', 'Find the heart made of stones in the street',
    // a heart shape laid in pale granite setts among the dark cobbles of a street, the tall old grey stone houses of the Royal Mile rising on both sides, a child pointing down at it
    sky('#ECEFF1') + R(-4, 20, 64, 130, '#90A4AE', 2, 3.5) + R(180, 10, 68, 140, '#A1887F', 2, 3.5) + P('M-8 22l36-26 36 26z', '#607D8B', 3) + P('M176 12l36-26 36 26z', '#6D4C41', 3)
    + [[10, 40], [34, 40], [10, 80], [34, 80], [10, 120], [190, 34], [216, 34], [190, 74], [216, 74], [190, 114], [216, 114]].map(([x, y]) => R(x, y, 14, 22, '#FFF8E1', 2, 2)).join('')
    + P('M-4 150h248v94H-4z', '#78909C', 0) + Lc('M-4 150h248', INK, 3)
    + [0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5, 6, 7].map((c) => R(c * 32 + (r % 2) * 16 - 8, 156 + r * 22, 28, 18, '#90A4AE', 4, 1.5)).join('')).join('')
    + P('M120 232c-40-24-56-40-56-58 0-14 10-22 22-22 14 0 26 8 34 20 8-12 20-20 34-20 12 0 22 8 22 22 0 18-16 34-56 58z', '#ECEFF1', 3.5) + P('M120 216c-24-14-36-26-36-38 0-8 6-12 12-12 10 0 18 8 24 16 6-8 14-16 24-16 6 0 12 4 12 12 0 12-12 24-36 38z', '#F48FB1', 2.5)
    + face(120, 190, 0.3) + g(56, 150, 1, R(-10, -14, 20, 24, '#43A047', 5, 2.5) + C(0, -24, 10, '#FFE0BD', 2.5) + face(0, -22, 0.22) + Lc('M8-6l20 14', '#FFE0BD', 4))),

  // ---------- The Cotswolds
  L('gb/cotswolds/landmark-royalcrescent.v1.svg', 'แถวบ้านโค้งรอยัลเครสเซนต์ที่เมืองบาธ', 'The Royal Crescent in Bath', ['royal crescent', 'รอยัลเครสเซนต์', 'bath', 'เมืองบาธ', 'georgian terrace', 'บ้านแถวจอร์เจียน', 'curved row of houses', 'บ้านแถวโค้ง', 'honey stone', 'royal victoria park'], 'หาบ้านแถวยาวที่โค้งเป็นรูปพระจันทร์เสี้ยว', 'Find the long row of houses curving like a crescent moon',
    // a long sweeping curved terrace of honey-coloured stone houses with rows of tall columns and many windows, bending round a wide green lawn like a crescent moon
    sky('#FFF8E1') + P('M-4 70c80 40 168 40 248 0v86c-80 40-168 40-248 0z', '#E9C984', 3.5) + P('M-4 70c80 40 168 40 248 0v-10c-80 40-168 40-248 0z', '#D7B46A', 3)
    + Array.from({ length: 13 }, (_, k) => { const x = 6 + k * 19, d = 20 * Math.sin(Math.PI * (x + 4) / 248); return R(x - 2, 84 + d, 4, 64, '#FFF3D6', 1, 1.5) + R(x + 5, 92 + d, 8, 12, '#B3E5FC', 1, 1.5) + R(x + 5, 116 + d, 8, 14, '#B3E5FC', 1, 1.5); }).join('')
    + face(120, 140, 0.3) + P('M-4 156c80 40 168 40 248 0v88H-4z', '#9CCC65', 3) + kid(80, 220, '#E53935', 0.85) + kid(150, 222, '#1E88E5', 0.85)),
  L('gb/cotswolds/landmark-sallylunn.v1.svg', 'ขนมปังแซลลีลันน์ก้อนโตในบ้านเก่าที่บาธ', 'A giant Sally Lunn bun at the old house in Bath', ['sally lunn bun', 'ขนมปังแซลลีลันน์', 'sally lunns', 'บ้านแซลลีลันน์', 'bath bun', 'ขนมปังบาธ', 'oldest house in bath', 'บ้านเก่าที่สุดในบาธ', 'tea room', 'brioche bun'], 'หาขนมปังก้อนโตที่ผ่าครึ่งทาเนย', 'Find the huge bun cut in half and buttered',
    // a narrow old honey-stone house with a bay window and a sloping roof, and in front a plate with a huge soft round bun split in half, one half spread with butter and strawberry jam
    sky('#FCE4EC') + R(56, 30, 128, 160, '#E9C984', 2, 3.5) + P('M50 34l70-28 70 28z', '#8D6E63', 3.5) + P('M80 60h80v40H80z', '#FFFFFF', 3) + R(86, 66, 68, 28, '#B3E5FC', 1, 2) + Lc('M108 66v28M132 66v28', '#FFFFFF', 3) + R(104, 120, 32, 50, '#2E7D32', 2, 3)
    + E(120, 206, 100, 18, '#FFFFFF', 3) + g(84, 186, 1, P('M-36 0c0-30 16-44 36-44s36 14 36 44z', '#E8A94E', 3.5) + E(-8, -28, 12, 6, '#F5C77E', 0) + Lc('M-36 0h72', INK, 3) + face(0, -14, 0.34))
    + g(160, 190, 1, E(0, 0, 38, 12, '#FFF3D6', 3.5) + E(-6, -2, 20, 6, '#FFEE58', 2) + E(12, 0, 12, 5, '#E53935', 2))),
  L('gb/cotswolds/landmark-stowdoor.v1.svg', 'ประตูไม้ระหว่างต้นยูโบราณที่สโตว์', 'The old door between two yew trees at Stow-on-the-Wold', ['yew tree door', 'ประตูต้นยู', 'stow-on-the-wold', 'สโตว์ออนเดอะโวลด์', 'st edwards north door', 'ประตูโบสถ์เก่า', 'ancient yews', 'ต้นยูโบราณ', 'fairy tale door', 'cotswold village'], 'หาประตูไม้ที่ต้นไม้สองต้นโอบไว้', 'Find the wooden door hugged by two trees',
    // an old arched wooden door in a honey-coloured stone wall, two ancient gnarled yew trees growing right up against it on either side with twisty trunks and dark green tops, a little stone step
    sky('#E8F5E9') + R(-4, 30, 248, 190, '#E2C27E', 0, 3.5) + [[10, 50], [60, 44], [160, 52], [200, 40], [20, 100], [190, 100], [30, 160], [196, 150]].map(([x, y]) => R(x, y, 34, 14, '#D7B46A', 3, 1.5)).join('')
    + P('M90 220v-90c0-30 60-30 60 0v90z', '#E9C984', 3.5) + P('M98 220v-86c0-22 44-22 44 0v86z', '#6D4C41', 3) + Lc('M112 120v100M128 120v100M98 160h44M98 190h44', '#5D4037', 2) + C(134, 176, 3, '#FFCA28', 1.5) + R(84, 218, 72, 10, '#BCAAA4', 2, 3)
    + [[66, 1], [174, -1]].map(([x, f]) => P(`M${x - 14} 228c4-40-6-70 4-110 6-20 4-40 10-60h8c6 20 4 40 10 60 10 40 0 70 4 110z`, '#795548', 3.5) + Lc(`M${x - 4} 210c4-30 0-60 6-90M${x + 6} 200c-2-30 4-50 0-80`, '#5D4037', 2) + C(x + f * 10, 34, 34, '#2E7D32', 3.5) + C(x - f * 16, 60, 24, '#388E3C', 3)).join('')
    + face(120, 168, 0.24)),
  L('gb/cotswolds/landmark-radcliffecamera.v1.svg', 'ห้องสมุดทรงกลมแรดคลิฟฟ์คาเมราที่ออกซ์ฟอร์ด', 'The round Radcliffe Camera in Oxford', ['radcliffe camera', 'แรดคลิฟฟ์คาเมรา', 'oxford university', 'มหาวิทยาลัยออกซ์ฟอร์ด', 'round library', 'ห้องสมุดทรงกลม', 'dreaming spires', 'บอดเลียน', 'radcliffe square', 'domed reading room'], 'หาโดมกลมบนตึกทรงกระบอก', 'Find the round dome on the drum-shaped building',
    // a round honey-stone building like a drum on a heavy base, pairs of columns all round it, a big grey-green dome on top with a little lantern, a cobbled square and lawn in front
    sky('#E3F2FD') + R(34, 150, 172, 40, '#D7B46A', 2, 3.5) + [52, 84, 120, 156, 188].map((x) => R(x - 8, 160, 16, 24, '#8D6E63', 8, 2.5)).join('')
    + R(48, 86, 144, 66, '#E9C984', 3, 3.5) + [56, 76, 98, 120, 142, 164, 184].map((x) => R(x - 3, 92, 6, 56, '#FFF3D6', 1, 2)).join('') + Lc('M48 98h144', '#C9A65A', 2)
    + P('M52 88c0-60 136-60 136 0z', '#90A4AE', 3.5) + Lc('M84 88c0-30 10-46 36-50M156 88c0-30-10-46-36-50', '#78909C', 2) + R(110, 26, 20, 16, '#E9C984', 2, 3) + P('M108 28l12-12 12 12z', '#90A4AE', 2.5) + R(46, 82, 148, 8, '#C9A65A', 2, 3)
    + face(120, 66, 0.34) + P('M-4 190h248v54H-4z', '#BCAAA4', 0) + Lc('M-4 190h248', INK, 3) + kid(30, 222, '#E53935', 0.85) + kid(212, 222, '#43A047', 0.85)),
  L('gb/cotswolds/landmark-campdenhall.v1.svg', 'ศาลาตลาดหินโค้งที่ชิปปิงแคมป์เดน', 'The arched stone Market Hall at Chipping Campden', ['chipping campden', 'ชิปปิงแคมป์เดน', 'market hall', 'ศาลาตลาด', 'stone arches', 'ซุ้มโค้งหิน', 'high street', 'ถนนสายหลัก', 'wool town', 'cotswold way'], 'หาซุ้มโค้งหินที่ลอดผ่านได้', 'Find the stone arches you can walk through',
    // an open honey-stone hall standing on rows of round arches with no walls, three pointed gables on its stone-tiled roof, a child running through the arches across the worn floor
    sky('#FFF3E0') + P('M18 100l30-40 30 40zM90 100l30-40 30 40zM162 100l30-40 30 40z', '#E9C984', 3.5) + P('M12 104l12-30h192l12 30z', '#A1887F', 3.5) + Lc('M30 92h180M24 82h192', '#8D6E63', 2)
    + R(16, 104, 208, 92, '#E9C984', 2, 3.5) + [40, 88, 152, 200].map((x) => P(`M${x - 20} 196v-50c0-28 40-28 40 0v50z`, '#6D4C41', 3)).join('') + R(18, 192, 204, 8, '#D7B46A', 2, 3)
    + [[48, 78], [120, 78], [192, 78]].map(([x, y]) => R(x - 6, y, 12, 14, '#FFF3D6', 6, 2)).join('') + face(120, 124, 0.3) + kid(152, 196, '#FFCA28', 0.85) + P('M-4 200h248v44H-4z', '#BCAAA4', 0)),

  // ---------- Estonia
  X('ee', 'food', 'mulgipuder', 'มุลกีปูเดอร์ มันฝรั่งบดกับข้าวบาร์เลย์', 'Mulgipuder, potato and barley mash', ['mulgipuder', 'มุลกีปูเดอร์', 'mulgi porridge', 'โจ๊กมุลกี', 'potato and barley', 'มันฝรั่งกับข้าวบาร์เลย์', 'bacon and onion sauce', 'ซอสหัวหอมเบคอน', 'estonian comfort food', 'mulgimaa'],
    // a deep earthenware bowl of creamy pale potato and barley mash with little grains showing, a golden pool of fried onion and bacon sauce in a dip on top and a sprig of dill
    E(120, 198, 92, 12, '#D7CCC8', 0) + P('M30 124c0 50 30 76 90 76s90-26 90-76z', '#B85C38', 3.5) + Lc('M44 150c30 18 122 18 152 0', '#FFCC80', 4)
    + E(120, 124, 90, 24, '#F3E9D2', 3.5) + P('M60 120c10-20 30-24 50-18 20-10 46-6 62 10', 'none', 0) + [[70, 118], [84, 130], [150, 116], [170, 126], [96, 112], [140, 132], [184, 120], [60, 128]].map(([x, y]) => E(x, y, 3, 2, '#E0D2B4', 1)).join('')
    + P('M94 122c6-12 46-12 52 0 4 10-46 14-52 0z', '#E8A94E', 2.5) + [[108, 118], [120, 122], [132, 118]].map(([x, y]) => R(x - 3, y - 2, 7, 5, '#C0603A', 1, 1.5)).join('')
    + Lc('M150 104c8-8 14-10 22-10M160 100l2-8M168 96l4-6', '#43A047', 2.5) + face(120, 162, 0.45)),
  X('ee', 'culture', 'juniperknife', 'มีดทาเนยไม้จูนิเปอร์หอมๆ จากเกาะซาเรมา', 'Juniper wood butter knives from Saaremaa', ['juniper wood', 'ไม้จูนิเปอร์', 'butter knife', 'มีดทาเนยไม้', 'saaremaa crafts', 'งานไม้ซาเรมา', 'juniper berries', 'ลูกจูนิเปอร์', 'wooden spoon', 'estonian souvenir'],
    // two pale wooden butter knives and a little spoon carved from juniper, their wavy golden-brown grain showing, lying beside a sprig of prickly juniper with dusty blue berries
    g(92, 120, 1, P('M-14-80c10-6 22 0 22 10l-4 70h-14z', '#F2D7A6', 3.5) + R(-11, 0, 18, 70, '#E8C68F', 8, 3.5) + Lc('M-6-70c4 20-2 40 2 60M2-60c-2 20 4 40 0 54M-4 10c4 20-2 40 2 54', '#C69257', 2) + face(-2, 34, 0.24), -14)
    + g(140, 124, 1, P('M-12-74c10-6 20 0 20 10l-4 62h-12z', '#F5DEB3', 3.5) + R(-10, -2, 16, 66, '#E8C68F', 8, 3.5) + Lc('M-4-64c4 18-2 36 2 54M-2 8c4 18-2 34 2 48', '#C69257', 2), 10)
    + g(186, 132, 1, E(0, -50, 16, 22, '#F2D7A6', 3.5) + E(0, -50, 10, 15, '#E8C68F', 0) + R(-5, -30, 10, 76, '#F2D7A6', 5, 3.5) + Lc('M0-24v62', '#C69257', 2), 16)
    + g(70, 206, 1, Lc('M-40 0h90', '#6D4C41', 3) + Array.from({ length: 9 }, (_, k) => Lc(`M${-34 + k * 10} 0l-6 ${k % 2 ? -12 : 12}`, '#558B2F', 3)).join('') + [[-20, -8], [0, 8], [24, -6], [40, 6]].map(([x, y]) => C(x, y, 5, '#5C6BC0', 2) + C(x - 1, y - 2, 1.5, '#C5CAE9', 0)).join(''))),
  X('ee', 'culture', 'setusolg', 'เข็มกลัดเงินทรงโดมของชาวเซตู', 'A Seto silver breast brooch', ['seto silver', 'เครื่องเงินเซตู', 'sõlg', 'เซิลก์', 'silver brooch', 'เข็มกลัดเงิน', 'setomaa', 'เซโตมา', 'folk jewellery', 'เครื่องประดับพื้นบ้าน'],
    // a huge round shining silver brooch with a raised dome in the middle and a ring of little bumps and engraved lines, hanging silver coins and chains dangling below it on a red cloth
    R(30, 24, 180, 196, '#C62828', 16, 3.5) + Lc('M40 40h160M40 204h160', '#FFCA28', 4)
    + C(120, 100, 64, '#E0E0E0', 3.5) + C(120, 100, 52, '#F5F5F5', 2.5) + Array.from({ length: 16 }, (_, k) => { const a = k / 16 * Math.PI * 2; return C(120 + 58 * Math.cos(a), 100 + 58 * Math.sin(a), 3.5, '#BDBDBD', 1.5); }).join('')
    + Array.from({ length: 12 }, (_, k) => { const a = k / 12 * Math.PI * 2; return Lc(`M${(120 + 26 * Math.cos(a)).toFixed(1)} ${(100 + 26 * Math.sin(a)).toFixed(1)}L${(120 + 46 * Math.cos(a)).toFixed(1)} ${(100 + 46 * Math.sin(a)).toFixed(1)}`, '#9E9E9E', 2); }).join('')
    + C(120, 100, 24, '#EEEEEE', 3) + E(112, 92, 8, 5, '#FFFFFF', 0) + face(120, 100, 0.34)
    + [84, 108, 132, 156].map((x, i) => Lc(`M${x} 160v${16 + (i % 2) * 10}`, '#BDBDBD', 2.5) + C(x, 182 + (i % 2) * 10, 9, '#E0E0E0', 2.5) + C(x, 182 + (i % 2) * 10, 4, 'none', 1.5)).join('')),
  X('ee', 'transport', 'haabjas', 'เรือขุดฮาบยัสในป่าน้ำท่วมโซมา', 'A haabjas dugout canoe in Soomaa’s flooded forest', ['haabjas', 'ฮาบยัส', 'dugout canoe', 'เรือขุด', 'soomaa', 'อุทยานโซมา', 'fifth season', 'ฤดูที่ห้า', 'flooded forest', 'aspen log boat'],
    // a long slim canoe hollowed out of a single aspen log gliding between birch trees standing in flood water, a paddler sitting in it and the trees reflected in the still water
    sky('#E8F5E9') + water(130, '#80CBC4') + Lc('M20 170q10-5 20 0M150 160q10-5 20 0M60 210q10-5 20 0', '#E0F2F1', 2.5)
    + [[24, 1], [70, 0.8], [190, 1], [224, 0.7]].map(([x, s]) => R(x - 5 * s, 20, 10 * s, 120, '#FAFAFA', 0, 2.5) + Lc(`M${x - 5 * s} 50h${4 * s}M${x} 80h${5 * s}M${x - 5 * s} 110h${4 * s}`, INK, 2) + C(x, 24, 26 * s, '#AED581', 3) + R(x - 4 * s, 140, 8 * s, 30, '#B2DFDB', 0, 0)).join('')
    + g(122, 176, 1, P('M-80-6c40 10 120 10 160 0-8 16-30 22-80 22s-72-6-80-22z', '#A1887F', 3.5) + P('M-74-4c40 8 108 8 148 0', 'none', 2.5) + Lc('M-50 4c30 4 70 4 100 0', '#8D6E63', 2)
      + R(-10, -34, 22, 30, '#FB8C00', 6, 3) + C(0, -46, 11, '#FFE0BD', 3) + P('M-11-50c2-10 20-10 22 0z', '#1E88E5', 2.5) + face(0, -44, 0.24) + Lc('M30-40l-30 52', '#8D6E63', 4) + E(-2, 16, 6, 12, '#8D6E63', 2.5) + face(-44, 6, 0.24))),

  // ---------- Tallinn
  L('ee/tallinn/landmark-threesisters.v1.svg', 'บ้านพ่อค้าสามพี่น้องในเมืองเก่าทาลลินน์', 'The Three Sisters, the merchant houses of Tallinn', ['three sisters', 'บ้านสามพี่น้อง', 'kolm õde', 'โคล์มเออเด', 'merchant houses', 'บ้านพ่อค้า', 'pikk street', 'ถนนปิกก์', 'stepped gables', 'hanseatic houses'], 'นับบ้านสามหลังที่ติดกันเหมือนพี่น้อง', 'Count the three houses standing together like sisters',
    // three tall white merchant houses joined side by side, each with a stepped triangle gable, rows of small windows and a big arched wooden door, the middle one a little taller
    sky('#E3F2FD') + [[18, 70, 0, '#FFFFFF'], [86, 70, -16, '#FFF8E1'], [154, 70, 0, '#FFFFFF']].map(([x, w, d, c]) => R(x, 90 + d, w, 130 - d, c, 1, 3.5) + P(`M${x} ${90 + d}h10v-10h10v-12h10v-14h10v14h10v12h10v10h10z`, c, 3.5)
      + [0, 1].map((r) => [0, 1, 2].map((k) => R(x + 8 + k * 20, 108 + d + r * 28, 12, 16, '#90CAF9', 1, 2)).join('')).join('') + R(x + 18, 170, 34, 50, '#6D4C41', 17, 3) + Lc(`M${x + 35} 172v48`, '#4E342E', 2) + R(x + 30, 60 + d, 10, 12, '#90CAF9', 1, 2)).join('')
    + face(120, 92, 0.24) + P('M-4 220h248v24H-4z', '#BCAAA4', 0) + Lc('M-4 220h248', INK, 3)),
  L('ee/tallinn/landmark-pirita.v1.svg', 'ซากผนังสำนักนางชีปีริตาริมทะเล', 'The tall ruined gable of Pirita Convent', ['pirita convent', 'สำนักนางชีปีริตา', 'st brigitta convent', 'ซากสำนักนางชีเซนต์บริจิตตา', 'pirita', 'ปีริตา', 'convent ruins', 'ซากปรักหักพัง', 'medieval ruin', 'pirita beach'], 'หาผนังหินสูงที่มีช่องหน้าต่างแต่ไม่มีหลังคา', 'Find the tall stone wall with windows but no roof',
    // a huge pointed gable wall of grey limestone standing alone with tall empty window openings, lower broken walls with arches beside it on the grass, the sky showing through
    sky('#E1F5FE') + lawn(180, '#9CCC65')
    + P('M60 182V90l60-70 60 70v92z', '#B0BEC5', 3.5) + [[78, 100], [110, 86], [142, 100]].map(([x, y]) => P(`M${x} ${y + 60}v-40c0-14 20-14 20 0v40z`, '#E1F5FE', 3)).join('') + P('M112 54c0-10 16-10 16 0v14h-16z', '#E1F5FE', 2.5) + Lc('M70 120h100M66 150h108', '#90A4AE', 2)
    + P('M-4 182v-50h30l6 14 10-8 10 10v34zM180 182v-60l16 10 12-8 14 12 22-4v50z', '#B0BEC5', 3.5) + P('M190 182v-28c0-12 22-12 22 0v28z', '#E1F5FE', 2.5)
    + face(120, 168, 0.3) + kid(60, 214, '#E53935', 0.85) + kid(176, 216, '#FFCA28', 0.85)),
  L('ee/tallinn/landmark-shortleg.v1.svg', 'ประตูหอคอยถนนลือฮิเกยัลก์ ทางขาสั้นขึ้นทูมเปีย', 'The Short Leg gate tower up to Toompea', ['short leg', 'ถนนขาสั้น', 'lühike jalg', 'ลือฮิเกยัลก์', 'gate tower', 'หอประตู', 'toompea hill', 'เนินทูมเปีย', 'steep lane', 'old town steps'], 'หาประตูไม้ใหญ่ใต้หอคอยที่ถนนขึ้นเนิน', 'Find the big wooden gate under the tower where the lane climbs the hill',
    // a steep narrow cobbled lane with steps climbing up to a stone gate tower with a red pointed roof and a heavy wooden door, old houses squeezed on both sides
    sky('#FFF8E1') + R(84, 40, 72, 120, '#ECEFF1', 2, 3.5) + P('M78 42l42-34 42 34z', '#C62828', 3.5) + R(110, 58, 20, 22, '#90CAF9', 10, 2.5) + P('M96 160v-46c0-26 48-26 48 0v46z', '#6D4C41', 3.5) + Lc('M120 114v46M96 136h48', '#4E342E', 2)
    + R(-4, 60, 76, 180, '#FFE082', 2, 3.5) + P('M-8 62l38-30 46 30z', '#8D6E63', 3) + R(168, 50, 76, 190, '#FFCCBC', 2, 3.5) + P('M164 52l40-30 44 30z', '#6D4C41', 3) + [[14, 90], [40, 90], [14, 140], [182, 80], [210, 80], [182, 130], [210, 130]].map(([x, y]) => R(x, y, 16, 22, '#B3E5FC', 1, 2)).join('')
    + P('M72 244l20-84h56l20 84z', '#A1887F', 3) + [176, 192, 208, 224].map((y) => Lc(`M${92 - (y - 160) * 0.24} ${y}H${148 + (y - 160) * 0.24}`, '#8D6E63', 2.5)).join('') + face(120, 92, 0.26) + kid(124, 224, '#43A047', 0.85)),
  L('ee/tallinn/landmark-almonds.v1.svg', 'รถเข็นขายอัลมอนด์คั่วอบเชยแบบยุคกลาง', 'Cinnamon roasted almonds from a medieval cart', ['roasted almonds', 'อัลมอนด์คั่ว', 'cinnamon almonds', 'อัลมอนด์อบเชย', 'medieval costume', 'ชุดยุคกลาง', 'old town street seller', 'แม่ค้าเมืองเก่า', 'town hall square', 'sugared nuts'], 'หากระทะทองแดงที่คั่วอัลมอนด์', 'Find the copper pan roasting the almonds',
    // a little wooden cart with a striped awning and a round copper pan of glossy roasted almonds, a seller in a long medieval dress and white cap scooping almonds into paper cones
    R(-4, -4, 248, 248, '#FFF3E0', 0, 0) + P('M40 70h150l-10 24H50z', '#C62828', 3) + Lc('M70 70l-6 24M100 70l-4 24M130 70v24M160 70l4 24', '#FFFFFF', 6) + Lc('M48 94V150M182 94V150', '#8D6E63', 4)
    + R(36, 150, 158, 46, '#A1887F', 4, 3.5) + Lc('M40 166h150', '#8D6E63', 2) + C(70, 206, 14, '#6D4C41', 3) + C(160, 206, 14, '#6D4C41', 3)
    + E(110, 146, 46, 12, '#D4793A', 3.5) + Array.from({ length: 12 }, (_, k) => E(80 + (k % 6) * 12, 140 + Math.floor(k / 6) * 6, 6, 4, '#8D4E1A', 1.5)).join('') + Lc('M90 128c-2-8 4-10 2-16M118 126c-2-8 4-10 2-16', '#ECEFF1', 2)
    + g(206, 160, 1, P('M-22 46l8-56h28l8 56z', '#2E7D32', 3) + R(-12, -10, 24, 20, '#FFFFFF', 4, 2.5) + C(0, -22, 12, '#FFE0BD', 3) + P('M-14-26c0-12 28-12 28 0v-4c-4-10-24-10-28 0z', '#FFFFFF', 2.5) + face(0, -20, 0.26) + Lc('M-12 0l-16-8', '#FFE0BD', 5))
    + g(172, 140, 1, P('M-8-14h16l-8 26z', '#FFF8E1', 2.5) + C(-3, -14, 3, '#8D4E1A', 1) + C(3, -15, 3, '#8D4E1A', 1)) + face(118, 176, 0.3)),
  L('ee/tallinn/landmark-katariina.v1.svg', 'ทางเดินคาทาริอินาคาอิก ซอยช่างฝีมือ', 'St Catherine’s Passage, the lane of craft workshops', ['st catherines passage', 'ทางเดินคาทาริอินา', 'katariina käik', 'คาทาริอินาคาอิก', 'craft workshops', 'ร้านงานฝีมือ', 'glass blowing', 'เป่าแก้ว', 'medieval lane', 'old town alley'], 'หาคานโค้งที่พาดข้ามซอยแคบ', 'Find the arches stretching across the narrow lane',
    // a narrow cobbled lane between tall stone walls with flying arches bridging across overhead, little workshop signs shaped like a pot, a hat and a glass vase hanging out, a lantern glowing
    sky('#E8EAF6') + R(-4, -4, 82, 248, '#B6AA9C', 0, 3.5) + R(162, -4, 82, 248, '#A1958A', 0, 3.5)
    + [40, 110].map((y) => P(`M78 ${y}h84v20c-20-8-64-8-84 0z`, '#B6AA9C', 3)).join('') + P('M78 0h84', 'none', 0)
    + P('M78 244l20-200h44l20 200z', '#90A4AE', 0) + [140, 170, 200, 226].map((y) => Lc(`M${98 - (y - 44) * 0.1} ${y}H${142 + (y - 44) * 0.1}`, '#78909C', 2)).join('')
    + [[66, 70], [66, 150]].map(([x, y]) => Lc(`M${x} ${y}h18`, INK, 3)).join('') + g(86, 84, 1, P('M-10 0c-4-14 24-14 20 0 4 14-24 14-20 0z', '#4FC3F7', 2.5) + R(-4, -12, 8, 6, '#4FC3F7', 1, 2)) + g(86, 162, 1, P('M-12 4c0-10 6-14 12-14s12 4 12 14zM-16 4h32', '#6D4C41', 2.5))
    + Lc('M174 120h-18', INK, 3) + g(152, 134, 1, R(-8, -12, 16, 22, '#FFE082', 3, 2.5) + P('M-10-12l10-8 10 8z', '#37474F', 2)) + R(20, 160, 40, 60, '#6D4C41', 20, 3) + R(180, 150, 40, 70, '#5D4037', 20, 3)
    + face(120, 60, 0.24) + kid(124, 214, '#E53935', 0.85)),
];

export default { places: {}, items };
