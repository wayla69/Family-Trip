// Wave 8, Japan part 1: Tokyo, Osaka, Kyoto, Hokkaido, Fukuoka, Okinawa, Takayama & Nagoya — new landmarks
// Shrines and temples appear only as buildings, with no figures (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (jp/tokyo/landmark-sumo.v1.svg → jp-tokyo.landmark.sumo)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +v.toFixed(1);
// a maple leaf (five points) centred on x, y
const maple = (x, y, s, c, sw = 2) => g(x, y, s, P('M0-20l5 9 9-4-2 10 9 2-8 7 3 8-10-3-6 9-6-9-10 3 3-8-8-7 9-2-2-10 9 4z', c, sw) + Lc('M0 18v8', '#8D6E63', 2));
// a five-point star
const star = (x, y, r, c, sw = 0) => P('M' + ring(10, (k) => { const a = (-90 + k * 36) * Math.PI / 180, rr = k % 2 ? r * 0.45 : r; return `${f1(x + rr * Math.cos(a))} ${f1(y + rr * Math.sin(a))}${k < 9 ? 'L' : ''}`; }) + 'z', c, sw);

const items = [
  // ---------- Tokyo
  L('jp/tokyo/landmark-tokyostation.v1.svg', 'อาคารอิฐแดงสถานีโตเกียว ฝั่งมารุโนะอุจิ', 'The red-brick Marunouchi building of Tokyo Station', ['tokyo station', 'สถานีโตเกียว', 'marunouchi', 'มารุโนะอุจิ', 'red brick station', 'สถานีอิฐแดง', 'station domes', 'โดมสถานี', 'marunouchi exit', 'ทางออกมารุโนะอุจิ'], 'หาโดมสีเทาสองลูกที่ปลายสองข้างของตึกอิฐแดง', 'Find the two grey domes at the ends of the red-brick building',
    // a long red-brick station front striped with white stone bands, rows of windows, a grey octagonal dome at each end and a taller middle, a forecourt where a child waves
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#CFD8DC', 0, 0) + Lc('M-4 200h248', '#B0BEC5', 3)
      + R(10, 118, 220, 80, '#C0573E') + R(92, 100, 56, 98, '#C0573E') + Lc('M10 140h220M10 168h220M92 118h56', '#FFF3E0', 4)
      + ring(10, (k) => R(18 + k * 21.5, 146, 9, 16, '#90CAF9', 2, 2)) + ring(10, (k) => R(18 + k * 21.5, 174, 9, 16, '#90CAF9', 2, 2))
      + [40, 200].map((x) => R(x - 26, 96, 52, 26, '#C0573E') + Lc(`M${x - 26} 108h52`, '#FFF3E0', 4) + P(`M${x - 30} 96c0-34 60-34 60 0z`, '#546E7A') + Lc(`M${x - 18} 90c2-14 34-14 36 0`, '#78909C', 3) + Lc(`M${x} 66v-12`, '#37474F', 4) + C(x, 52, 4, '#FFD54F', 2)).join('')
      + P('M86 100l34-22 34 22z', '#546E7A') + R(108, 168, 24, 30, '#5D4037', 10, 2.5)
      + face(120, 122, 0.45) + kid(176, 226, '#FF7043')),
  L('jp/tokyo/landmark-sumo.v1.svg', 'ซูโม่ที่สนามเรียวโงกุ โคคุงิคัง', 'Sumo at the Ryōgoku Kokugikan', ['sumo', 'ซูโม่', 'ryogoku', 'ryōgoku', 'เรียวโงกุ', 'kokugikan', 'โคคุงิคัง', 'dohyo', 'สังเวียนซูโม่', 'sumo tournament'], 'หาพู่สี่สีที่ห้อยอยู่ที่มุมหลังคาเหนือสังเวียน', 'Find the four coloured tassels hanging from the roof over the ring',
    // a raised square clay ring with a straw circle on top, a shrine-style roof hanging over it with a purple drape and four tassels (green, red, white, black), a round friendly wrestler stamping one leg up
    P('M18 214l20-44h164l20 44z', '#D7B98E') + P('M38 170h164', 'none') + E(120, 184, 70, 12, 'none') + Lc('M50 184a70 12 0 1 0 140 0a70 12 0 1 0-140 0', '#C8A16B', 6) + Lc('M30 200h180', '#BCA07A', 3)
      + P('M30 54l90-30 90 30-14 10H44z', '#6D4C41') + R(40, 62, 160, 14, '#7E57C2') + ring(5, (k) => P(`M${48 + k * 32} 76q16 14 32 0`, '#9575CD', 2))
      + [[44, '#43A047'], [196, '#E53935']].map(([x, c]) => Lc(`M${x} 76v20`, c, 4) + E(x, 104, 6, 10, c, 2)).join('')
      + g(120, 150, 1, E(0, 0, 34, 30, '#FFE0BD', 3) + R(-34, 6, 68, 16, '#283593', 6, 3) + Lc('M-6 22v14M6 22v14', '#283593', 4)
        + C(0, -38, 18, '#FFE0BD', 3) + E(0, -58, 9, 6, '#212121', 2) + C(0, -52, 2.5, '#212121', 0) + face(0, -38, 0.42)
        + P('M-26 18l-14 14h-10', 'none') + E(-44, 34, 10, 6, '#FFE0BD', 2.5) + P('M24 6l26-30', 'none') + Lc('M24 4l26-30', '#FFE0BD', 14) + E(54, -30, 10, 6, '#FFE0BD', 2.5))),
  L('jp/tokyo/landmark-monja.v1.svg', 'มอนจายากิ ย่านสึกิชิมะ', 'Monjayaki on the griddle in Tsukishima', ['monjayaki', 'monja', 'มอนจายากิ', 'มอนจา', 'tsukishima', 'สึกิชิมะ', 'monja street', 'ถนนมอนจา', 'teppan griddle', 'little spatula'], 'หาไม้พายเหล็กอันจิ๋วที่วางอยู่ข้างกระทะ', 'Find the tiny metal spatula beside the griddle',
    // a black iron griddle on a table, a ring wall of chopped cabbage with runny golden batter poured in the middle, a cup of batter waiting, two tiny spatulas
    R(10, 150, 220, 70, '#A1673F', 10) + R(22, 70, 196, 120, '#37474F', 14) + R(30, 78, 180, 104, '#455A64', 10, 3)
      + P('M66 130c0-30 40-44 72-34 30 8 36 40 16 58-20 18-80 16-88-24z', '#C5E1A5') + ring(9, (k) => Lc(`M${78 + k * 9} ${108 + (k % 3) * 10}l6-4`, '#7CB342', 3))
      + P('M84 130c4-16 30-24 48-16 16 8 12 30-6 36-18 6-44 0-42-20z', '#F2C14E') + E(104, 128, 4, 2, '#FFE082', 0) + E(120, 140, 5, 2, '#FFE082', 0)
      + g(186, 120, 1, R(-10, -8, 20, 8, '#B0BEC5', 2, 2) + Lc('M0-8l-6-26', '#8D6E63', 4), 20) + g(52, 160, 1, R(-8, -6, 16, 6, '#B0BEC5', 2, 2) + Lc('M0-6l4-22', '#8D6E63', 4), -10)
      + g(196, 196, 1, P('M-22-26h44l-6 40h-32z', '#FFFFFF') + E(0, -26, 22, 6, '#C5E1A5') + face(0, -4, 0.38))),
  L('jp/tokyo/landmark-tamagoyaki.v1.svg', 'ไข่หวานม้วนเสียบไม้ ตลาดนอกสึกิจิ', 'Tamagoyaki on a stick at the Tsukiji outer market', ['tamagoyaki', 'ทามาโกยากิ', 'ไข่หวาน', 'rolled omelette', 'ไข่ม้วน', 'tsukiji outer market', 'ตลาดนอกสึกิจิ', 'tsukiji', 'สึกิจิ', 'square pan'], 'หาลายม้วนเป็นชั้นๆ ที่ปลายก้อนไข่', 'Find the swirl of rolled layers at the end of the egg block',
    // a square copper omelette pan with a golden block rolling in it, and a thick slice of rolled omelette on a wooden stick with its spiral layers showing
    g(84, 94, 1, R(-62, -42, 124, 84, '#D4874B', 10) + R(-54, -34, 108, 68, '#B26A36', 6, 3) + R(-36, -18, 72, 36, '#FFD54F', 8, 3) + Lc('M-22-18v36M-6-18v36M10-18v36', '#F9A825', 2.5) + Lc('M62 0h56', '#6D4C41', 10), -8)
      + Lc('M150 228l10-80', '#E6C27A', 7)
      + g(162, 128, 1, R(-36, -34, 72, 62, '#FFD54F', 12, 4) + P('M-36-10h72', 'none') + Lc('M-14-18c-12 0-12 18 0 18s16-12 6-22-26 0-26 14 14 24 30 18', '#F9A825', 3)
        + R(-36, -34, 72, 10, '#F4C542', 6, 3) + face(10, 6, 0.42)) + ring(3, (k) => Lc(`M${110 + k * 12} 60q-6-10 0-20`, '#B0BEC5', 3))),

  // ---------- Osaka
  L('jp/osaka/landmark-momijitempura.v1.svg', 'โมมิจิเทมปุระ ใบเมเปิลทอดที่มิโนโอะ', 'Momiji tempura, fried maple leaves at Minoo', ['momiji tempura', 'โมมิจิเทมปุระ', 'fried maple leaves', 'ใบเมเปิลทอด', 'minoo', 'minoh', 'มิโนโอะ', 'minoo park', 'สวนมิโนโอะ', 'autumn leaves'], 'หาใบเมเปิลสีแดงที่ถูกชุบแป้งทอดจนกรอบ', 'Find the red maple leaves coated in crispy batter',
    // a striped paper cone holding maple leaves fried in golden batter with their red edges peeping out, loose red and orange leaves falling round it
    maple(42, 48, 0.9, '#E53935') + maple(198, 70, 0.8, '#FB8C00') + maple(204, 176, 0.7, '#E53935') + maple(34, 168, 0.75, '#FFB300')
      + [[96, 80, -20], [124, 66, 8], [150, 86, 28], [112, 100, -4]].map(([x, y, r]) => g(x, y, 1.3, P('M0-20l5 9 9-4-2 10 9 2-8 7 3 8-10-3-6 9-6-9-10 3 3-8-8-7 9-2-2-10 9 4z', '#E53935', 2) + P('M0-14l3 7 6-2-1 7 6 2-6 5 2 5-7-2-3 6-4-6-7 2 2-5-6-5 6-2-1-7 6 2z', '#F6C25B', 0) + ring(4, (k) => C(-4 + k * 3, -4 + (k % 2) * 6, 1.4, '#D9952E', 0)), r)).join('')
      + P('M70 112h100l-50 112z', '#FFFFFF') + Lc('M84 130h72M96 156h48M108 182h24', '#EF9A9A', 6) + face(120, 136, 0.42)),
  L('jp/osaka/landmark-harukas.v1.svg', 'ตึกอาเบโนะฮารุคัส', 'The Abeno Harukas tower', ['abeno harukas', 'อาเบโนะฮารุคัส', 'harukas 300', 'ฮารุคัส 300', 'tennoji', 'เทนโนจิ', 'tall building', 'ตึกสูง', 'observation deck', 'จุดชมวิว'], 'หาตึกที่มีกล่องแก้วซ้อนกันสามชั้นและเยื้องกันเป็นขั้นบันได', 'Find the tower made of three glass boxes stacked off-centre like steps',
    // a very tall glass tower made of three stacked blocks that step back on one side, an open frame crown on top, a tiny train and trees at its foot
    sky('#E1F5FE') + C(194, 44, 16, '#FFF59D', 2.5) + R(-4, 216, 248, 28, '#A5D6A7', 0, 0)
      + R(62, 140, 116, 78, '#81D4FA') + R(62, 76, 96, 66, '#4FC3F7') + R(62, 22, 76, 56, '#29B6F6')
      + ring(6, (k) => Lc(`M${74 + k * 18} 144v70`, '#E1F5FE', 3)) + ring(5, (k) => Lc(`M${74 + k * 18} 80v58`, '#E1F5FE', 3)) + ring(4, (k) => Lc(`M${74 + k * 18} 34v40`, '#E1F5FE', 3))
      + R(70, 6, 60, 18, 'none') + Lc('M70 22V6h60v16M90 6v16M110 6v16', '#78909C', 4)
      + face(110, 112, 0.5) + R(14, 200, 40, 16, '#FF8A65', 6) + C(24, 218, 4, '#455A64', 2) + C(44, 218, 4, '#455A64', 2) + C(206, 206, 12, '#66BB6A') + kid(224, 232, '#FFCA28', 0.8)),
  L('jp/osaka/landmark-chuokokaido.v1.svg', 'หอประชุมกลางโอซาก้า เกาะนากาโนชิมะ', 'Osaka City Central Public Hall on Nakanoshima', ['osaka central public hall', 'chuo kokaido', 'หอประชุมกลางโอซาก้า', 'nakanoshima', 'นากาโนชิมะ', 'red brick hall', 'ตึกอิฐแดง', 'yodoyabashi', 'river island', 'เกาะกลางแม่น้ำ'], 'หาหน้าต่างโค้งครึ่งวงกลมบานใหญ่ตรงกลางตึก', 'Find the big half-moon window in the middle of the building',
    // a red-brick hall with a huge round-arched front under a curved green-copper roof, little green domes on corner towers, a river with a stone bank in front
    sky('#FFF8E1') + R(-4, 200, 248, 44, '#4FC3F7', 0, 0) + Lc('M20 216h40M150 226h50', '#B3E5FC', 3) + R(-4, 190, 248, 12, '#BCAAA4', 0, 2.5)
      + R(30, 100, 180, 90, '#C1583F') + Lc('M30 150h180', '#FFF3E0', 4) + ring(4, (k) => R(38 + k * 12 + (k > 1 ? 112 : 0), 156, 8, 24, '#FFF3E0', 2, 2))
      + P('M76 190V112c0-40 88-40 88 0v78z', '#D5694E') + P('M88 150c0-34 64-34 64 0z', '#90CAF9') + Lc('M120 118v32M98 132l44 0', '#E1F5FE', 3) + P('M70 104c0-56 100-56 100 0z', '#4DB6AC')
      + [[30, 22], [210, 22]].map(([x]) => R(x - 12, 76, 24, 34, '#C1583F') + P(`M${x - 14} 78c0-22 28-22 28 0z`, '#4DB6AC') + Lc(`M${x} 56v-8`, '#37474F', 3)).join('')
      + R(104, 166, 32, 24, '#5D4037', 6, 2.5) + face(120, 136, 0.38)),
  L('jp/osaka/landmark-cheesecake.v1.svg', 'ชีสเค้กเนื้อนุ่มเด้งดึ๋งของโอซาก้า', 'Osaka\'s wobbly fluffy cheesecake', ['jiggly cheesecake', 'ชีสเค้กดึ๋งดึ๋ง', 'fluffy cheesecake', 'ชีสเค้กนุ่ม', 'japanese cheesecake', 'ชีสเค้กญี่ปุ่น', 'namba sweets', 'ขนมนัมบะ', 'fresh from the oven', 'อบใหม่ๆ'], 'หาเส้นสั่นๆ ข้างเค้กที่บอกว่ามันกำลังเด้ง', 'Find the wiggly lines that show the cake is wobbling',
    // a tall round golden cheesecake on a paper base wobbling on a plate, its top browned, a little stamp mark on top, wiggle lines either side, a curl of steam
    E(120, 196, 96, 20, '#ECEFF1') + E(120, 192, 80, 14, '#FFFFFF', 3)
      + P('M50 110c0-18 140-18 140 0v66c0 18-140 18-140 0z', '#FFE08A') + E(120, 110, 70, 18, '#D99A3E') + E(120, 108, 54, 11, '#C9832E', 0)
      + P('M50 168c0 14 140 14 140 0v10c0 18-140 18-140 0z', '#FFFFFF', 3) + C(120, 107, 7, '#B97026', 0)
      + Lc('M30 124q-8 10 0 20t0 20M210 124q8 10 0 20t0 20M18 132q-6 8 0 16M222 132q6 8 0 16', '#FFB74D', 4)
      + Lc('M104 80q-8-12 0-24M136 78q-8-12 0-24', '#B0BEC5', 4) + face(120, 146, 0.6)),
  L('jp/osaka/landmark-ikayaki.v1.svg', 'อิกะยากิ แพนเค้กปลาหมึกแบบโอซาก้า', 'Osaka ikayaki, a pressed squid pancake', ['ikayaki', 'อิกะยากิ', 'squid pancake', 'แพนเค้กปลาหมึก', 'pressed squid', 'ปลาหมึกอัด', 'hanshin', 'umeda', 'อุเมดะ', 'osaka street food'], 'หาแผ่นเหล็กร้อนสองแผ่นที่ประกบกันจนมีไอพุ่งออกมา', 'Find the two hot iron plates pressing together with steam puffing out',
    // a two-plate iron press with a long handle squeezing out steam, and a thin golden pancake folded in white paper with a squid tentacle peeping from the edge
    g(76, 104, 1, R(-56, 20, 112, 22, '#546E7A', 6) + R(-56, -8, 112, 22, '#78909C', 6) + Lc('M50-2l50-40', '#5D4037', 9) + R(-62, 42, 124, 14, '#37474F', 4)
      + Lc('M-30-16q-6-12 0-24M0-16q-6-12 0-24M30-16q-6-12 0-24', '#B0BEC5', 4), -6)
      + g(156, 172, 1, P('M-46-34c30-8 70-4 92 6l-12 62c-26-8-58-10-84-4z', '#F2C14E') + ring(5, (k) => C(-30 + k * 16, -14 + (k % 2) * 16, 4, '#E09A4A', 0))
        + P('M-30 22q-10 14 6 16q2 8 10 4', '#EF9A9A', 3) + P('M-54-6l56 4 52 6-6 46-54-6-56-2z', '#FFFFFF') + face(0, 14, 0.45))),

  // ---------- Kyoto
  L('jp/kyoto/landmark-ginkakuji.v1.svg', 'วัดกินคาคุจิ ศาลาเงินกับกองทรายรูปกรวย', 'Ginkaku-ji, the Silver Pavilion and its sand cone', ['ginkakuji', 'ginkaku-ji', 'กินคาคุจิ', 'silver pavilion', 'ศาลาเงิน', 'kogetsudai', 'sand cone', 'กองทรายรูปกรวย', 'ginshadan', 'higashiyama'], 'หากองทรายขาวที่ตัดยอดแบนเหมือนภูเขาเล็กๆ', 'Find the white sand heap with a flat top like a little mountain',
    // a two-storey dark wooden pavilion with a bird finial on its roof among pines, a flat-topped white sand cone and a sea of raked sand with wave lines in front
    sky('#E8F5E9') + E(40, 70, 40, 30, '#2E7D32') + E(206, 60, 36, 28, '#388E3C') + R(-4, 150, 248, 94, '#F5F5F5', 0, 0)
      + ring(5, (k) => Lc(`M-4 ${166 + k * 16}q30-8 60 0t60 0 60 0 60 0 60 0`, '#CFD8DC', 3))
      + g(150, 92, 1, R(-40, 20, 80, 42, '#6D4C41') + P('M-56 22l16-16h80l16 16z', '#37474F') + R(-26, -20, 52, 28, '#795548') + P('M-38-18l12-14h52l12 14z', '#37474F')
        + R(-30, 30, 14, 24, '#FFF8E1', 0, 2) + R(16, 30, 14, 24, '#FFF8E1', 0, 2) + P('M0-32l-6-10 6 2 6-2z', '#B0BEC5', 2) + face(0, 40, 0.36))
      + P('M30 206l20-46h40l20 46z', '#FFFFFF') + Lc('M40 186h60M48 170h44', '#E0E0E0', 2.5) + E(70, 160, 20, 4, '#FAFAFA', 2.5)),
  L('jp/kyoto/landmark-byodoin.v1.svg', 'วัดเบียวโดอิน หอหงส์ไฟที่อุจิ', 'Byōdō-in\'s Phoenix Hall at Uji', ['byodoin', 'byōdō-in', 'เบียวโดอิน', 'phoenix hall', 'หอหงส์ไฟ', 'hoodo', 'uji', 'อุจิ', 'ten yen coin', 'เหรียญ 10 เยน'], 'หานกหงส์ไฟสีทองสองตัวบนสันหลังคา', 'Find the two golden phoenix birds on the roof ridge',
    // a red-and-white hall with long winged corridors on both sides, small corner turrets, two golden birds on the middle roof, all reflected in a still pond
    sky('#FFF3E0') + R(-4, 150, 248, 94, '#81D4FA', 0, 0) + Lc('M30 196h50M150 210h60M90 226h40', '#E1F5FE', 3)
      + [-1, 1].map((d) => R(120 + d * 52 - (d < 0 ? 64 : 0), 120, 64, 26, '#FFF8E1') + P(`M${120 + d * 40} 116h${d * 78}l${d * 8} 8h${-d * 94}z`, '#455A64') + ring(3, (k) => Lc(`M${120 + d * (60 + k * 20)} 124v22`, '#E53935', 4))
        + R(120 + d * 108 - 10, 96, 20, 50, '#FFF8E1') + P(`M${120 + d * 108 - 16} 98l16-14 16 14z`, '#455A64')).join('')
      + R(90, 90, 60, 56, '#FFF8E1') + ring(4, (k) => Lc(`M${96 + k * 16} 98v48`, '#E53935', 5)) + P('M74 92l12-22h68l12 22z', '#455A64') + P('M88 70l10-14h44l10 14z', '#546E7A')
      + [104, 136].map((x) => P(`M${x} 56l-6-12 8 4 6-6 2 10z`, '#FFD54F', 2)).join('') + face(120, 118, 0.36)
      + P('M50 160h140l-10 20H60z', '#FFCCBC', 0) + P('M88 160l12 20h40l12-20z', '#B0BEC5', 0)),
  L('jp/kyoto/landmark-yatsuhashi.v1.svg', 'ขนมยัตสึฮาชิ แป้งนุ่มพับสามเหลี่ยมของเกียวโต', 'Yatsuhashi, Kyoto\'s folded cinnamon sweets', ['yatsuhashi', 'ยัตสึฮาชิ', 'nama yatsuhashi', 'นามะยัตสึฮาชิ', 'cinnamon', 'อบเชย', 'red bean', 'ถั่วแดง', 'kyoto souvenir', 'ของฝากเกียวโต'], 'หาขนมสามเหลี่ยมที่พับไว้จนเห็นไส้ถั่วแดง', 'Find the folded triangle showing its red bean filling',
    // a box of soft triangles folded over red bean paste in cinnamon brown, matcha green and sakura pink, two baked crisp curved ones beside it
    R(20, 120, 150, 96, '#FFF3E0', 10) + R(28, 128, 134, 80, '#FFE0B2', 6, 2.5)
      + [[60, 168, '#C9A27A'], [100, 168, '#9CCC65'], [140, 168, '#F8BBD0']].map(([x, y, c]) => P(`M${x - 22} ${y + 20}L${x} ${y - 24}L${x + 22} ${y + 20}z`, c) + E(x, y + 8, 7, 5, '#8D3B38', 0) + P(`M${x - 22} ${y + 20}L${x + 4} ${y - 8}L${x + 22} ${y + 20}`, 'none')).join('')
      + face(100, 178, 0.32)
      + [[194, 94, -10], [200, 150, 14]].map(([x, y, r]) => g(x, y, 1, P('M-26 10c10-24 42-24 52 0l-6 6c-10-16-30-16-40 0z', '#D8A35A'), r)).join('')
      + P('M60 100c0-24 24-34 34-24', 'none') + Lc('M40 92l20-36M60 92l20-36', '#8D6E63', 4)),
  L('jp/kyoto/landmark-kawadoko.v1.svg', 'ลานนั่งกินข้าวเหนือลำธารที่คิบุเนะ', 'Kawadoko, dining over the stream at Kibune', ['kawadoko', 'คาวาโดโกะ', 'kibune', 'คิบุเนะ', 'river dining', 'กินข้าวเหนือลำธาร', 'summer platform', 'ลานไม้เหนือน้ำ', 'kifune', 'cool summer'], 'หาเบาะนั่งที่วางอยู่บนลานไม้เหนือน้ำไหล', 'Find the cushions on the wooden deck above the running water',
    // a low wooden deck on stilts right over a rushing stream, red cushions and a low table with a bowl, a bamboo blind, maple trees all round, white water splashing round stones below
    sky('#C8E6C9') + E(30, 50, 44, 36, '#43A047') + E(210, 44, 40, 34, '#2E7D32') + maple(70, 34, 0.7, '#7CB342', 0) + maple(186, 90, 0.6, '#9CCC65', 0)
      + R(-4, 172, 248, 72, '#4FC3F7', 0, 0) + ring(4, (k) => E(30 + k * 60, 210 + (k % 2) * 16, 18, 9, '#90A4AE')) + Lc('M10 188q20-8 40 0t40 0M120 196q20-8 40 0t40 0', '#FFFFFF', 4)
      + ring(5, (k) => Lc(`M${30 + k * 45} 150v40`, '#6D4C41', 6)) + R(14, 132, 212, 20, '#A1673F', 3) + Lc('M14 142h212', '#8D5524', 2.5)
      + R(96, 110, 52, 22, '#8D5524', 3) + E(122, 108, 12, 6, '#FFFFFF', 2.5) + [[68], [176]].map(([x]) => R(x - 16, 120, 32, 12, '#E53935', 4)).join('')
      + R(20, 70, 70, 50, '#E6C27A', 0, 3) + ring(6, (k) => Lc(`M20 ${78 + k * 8}h70`, '#C9A15A', 2)) + face(122, 120, 0.3) + kid(176, 120, '#26A69A', 0.85)),
  L('jp/kyoto/landmark-tobiishi.v1.svg', 'หินกระโดดรูปเต่าที่แม่น้ำคาโมะ', 'The turtle stepping stones on the Kamo River', ['kamogawa', 'kamo river', 'แม่น้ำคาโมะ', 'stepping stones', 'หินกระโดดข้ามน้ำ', 'turtle stones', 'หินรูปเต่า', 'demachiyanagi', 'เดมาจิยานางิ', 'kamogawa delta'], 'หาหินรูปเต่าที่มีหัวและขาสี่ขา', 'Find the stone shaped like a turtle with a head and four legs',
    // a shallow river with a row of turtle-shaped stones crossing it, one plover-shaped stone, a child hopping from one shell to the next, grassy banks with a willow
    R(-4, -4, 248, 60, '#A5D6A7', 0, 0) + R(-4, 190, 248, 54, '#A5D6A7', 0, 0) + R(-4, 56, 248, 136, '#4FC3F7', 0, 0)
      + Lc('M20 80q20-6 40 0M150 92q20-6 40 0M30 170q20-6 40 0M170 176q20-6 40 0', '#B3E5FC', 4) + Lc('M210 20c-10 20-4 40-10 60M222 16c-6 20 0 40-6 56', '#7CB342', 3)
      + [[46, 168, -10], [104, 136, 4], [190, 82, -8]].map(([x, y, r]) => g(x, y, 1, E(-26, 0, 8, 6, '#9E9E9E') + E(14, -12, 7, 5, '#9E9E9E') + E(14, 12, 7, 5, '#9E9E9E') + E(-14, -12, 7, 5, '#9E9E9E') + E(-14, 12, 7, 5, '#9E9E9E') + E(0, 0, 24, 16, '#BDBDBD') + Lc('M-12-8l24 16M-12 8l24-16', '#9E9E9E', 2.5) + C(30, 0, 8, '#BDBDBD', 3), r)).join('')
      + g(158, 104, 1, E(0, 0, 20, 12, '#BDBDBD') + C(20, -8, 8, '#BDBDBD') + P('M27-8l8 2-8 2z', '#9E9E9E', 2) + P('M-20 0l-10-8v14z', '#BDBDBD'))
      + face(104, 136, 0.28) + kid(104, 118, '#FF7043', 0.9)),

  // ---------- Hokkaido
  L('jp/hokkaido/landmark-soupcurry.v1.svg', 'ซุปแกงกะหรี่ของซัปโปโร', 'Sapporo soup curry', ['soup curry', 'ซุปแกงกะหรี่', 'sapporo soup curry', 'ซุปแกงกะหรี่ซัปโปโร', 'curry soup', 'แกงกะหรี่น้ำ', 'whole vegetables', 'ผักชิ้นใหญ่', 'chicken leg', 'น่องไก่'], 'หาน่องไก่ทั้งน่องที่จุ่มอยู่ในซุป', 'Find the whole chicken leg sitting in the soup',
    // a wide bowl of thin orange curry soup with big whole pieces standing up: a chicken leg, a half carrot, a pumpkin wedge, okra, half a boiled egg, broccoli; a plate of rice with a lemon slice
    E(184, 196, 46, 18, '#FFFFFF') + E(184, 188, 32, 14, '#FFFFFF', 3) + P('M196 180l14 4-4 8z', '#FFF176', 2.5)
      + P('M18 120h160c0 50-36 86-80 86s-80-36-80-86z', '#FFFFFF') + E(98, 120, 80, 18, '#F57C00') + E(98, 120, 72, 13, '#FB8C00', 0)
      + P('M40 116c-6-30 14-42 30-32 6 4 6 16-2 22z', '#C68642') + C(36, 90, 6, '#F5F5F5', 2.5)
      + P('M78 116l10-50 10 4-8 46z', '#FF7043') + P('M110 116c4-22 30-28 40-12z', '#FFB74D') + Lc('M110 116c4-22 30-28 40-12', '#43A047', 4)
      + E(152, 112, 12, 9, '#FFFFFF') + C(152, 112, 5, '#FFC107', 0) + C(64, 104, 9, '#43A047') + C(56, 98, 6, '#66BB6A') + P('M120 92l26-18 4 6-26 18z', '#7CB342')
      + face(98, 162, 0.55)),
  L('jp/hokkaido/landmark-shimaenaga.v1.svg', 'นกชิมะเอนางะ นกหิมะตัวกลมของฮอกไกโด', 'The shima-enaga, Hokkaido\'s little snow-white bird', ['shima enaga', 'ชิมะเอนางะ', 'long-tailed tit', 'นกหางยาว', 'snow fairy', 'ภูตหิมะ', 'white bird', 'นกสีขาว', 'hokkaido bird', 'winter forest'], 'หานกกลมปุ๊กลุกสีขาวที่มีหางยาวยื่นออกมา', 'Find the round fluffy white bird with a long tail',
    // a round fluffy white bird with tiny dark eyes, a little beak, pinkish-brown wing patches and a long dark tail, perched on a snowy branch with frost flakes falling
    Lc('M10 174c50-10 120-4 220-22', '#6D4C41', 8) + Lc('M150 162l30-24', '#6D4C41', 5) + P('M30 168c30-10 70-8 110-14 4-6 30-8 40-8', '#FFFFFF', 3)
      + P('M168 128l60 40-8 8-60-34z', '#4E342E') + Lc('M172 132l52 36', '#8D6E63', 2.5)
      + C(120, 116, 50, '#FFFFFF', 4) + P('M150 104c16 8 22 30 10 46-14-6-20-30-10-46z', '#D7A9A0') + P('M84 120c-10 12-6 32 6 40', '#F5F5F5', 3)
      + Lc('M100 152l-4 16M126 160l2 14', '#4E342E', 4)
      + C(100, 108, 4.5, '#212121', 0) + C(126, 108, 4.5, '#212121', 0) + P('M110 116l4 5 4-5z', '#424242', 2) + E(88, 118, 7, 4, '#FF8FA3', 0) + E(138, 118, 7, 4, '#FF8FA3', 0)
      + ring(6, (k) => P(`M${20 + k * 38} ${30 + (k % 3) * 22}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, '#B3E5FC', 0))),
  L('jp/hokkaido/landmark-yubarimelon.v1.svg', 'เมลอนยูบาริ', 'A Yūbari king melon', ['yubari melon', 'yūbari king', 'เมลอนยูบาริ', 'melon', 'เมลอน', 'cantaloupe', 'แคนตาลูป', 'yubari', 'ยูบาริ', 'hokkaido fruit'], 'หาลายตาข่ายบนเปลือกเมลอนและขั้วรูปตัวที', 'Find the net pattern on the melon skin and its T-shaped stem',
    // a round melon covered in a raised net pattern with a T-shaped stem on top, and a fat slice beside it showing juicy orange flesh
    C(96, 128, 72, '#C5E1A5', 4) + ring(6, (k) => Lc(`M${42 + k * 22} 74c-14 30-14 80 6 112`, '#F1F8E9', 3)) + ring(5, (k) => Lc(`M30 ${92 + k * 18}c30 6 100 6 132-4`, '#F1F8E9', 3))
      + Lc('M96 58v-20M80 38h32', '#7CB342', 6) + face(96, 134, 0.6)
      + g(186, 176, 1, P('M-46 0c0-34 92-34 92 0z', '#FFA726') + P('M-46 0c0-34 92-34 92 0', '#AED581') + P('M-38 0c0-26 76-26 76 0z', '#FFB74D', 0) + E(0, -6, 18, 6, '#FFE0B2', 0) + Lc('M-46 0h92', '#9CCC65', 5))),
  L('jp/hokkaido/landmark-taushubetsu.v1.svg', 'สะพานโค้งเก่าทาอุชุเบ็ตสึในทะเลสาบ', 'The old Taushubetsu arch bridge in the lake', ['taushubetsu bridge', 'สะพานทาอุชุเบ็ตสึ', 'concrete arch bridge', 'สะพานโค้งคอนกรีต', 'lake nukabira', 'ทะเลสาบนุคาบิระ', 'kamishihoro', 'phantom bridge', 'สะพานลับ', 'old railway bridge'], 'หาโค้งสะพานที่ครึ่งหนึ่งจมอยู่ในน้ำ', 'Find the bridge arches half under the water',
    // a row of grey concrete arches standing in a calm lake with their reflections making full circles, pine-covered hills and a far mountain behind
    sky('#E1F5FE') + P('M-4 100l60-40 50 30 50-44 90 54v24H-4z', '#B0BEC5', 3) + P('M-4 112c40-20 80-6 120-16s80-12 128 4v24H-4z', '#2E7D32')
      + ring(9, (k) => P(`M${-4 + k * 30} 120l8-16 8 16z`, '#1B5E20', 0))
      + R(-4, 128, 248, 116, '#81D4FA', 0, 0)
      + ring(5, (k) => { const x = 10 + k * 46; return P(`M${x} 128v-28h46v28h-6c0-22-34-22-34 0z`, '#B0BEC5') + P(`M${x} 128v28h46v-28h-6c0 22-34 22-34 0z`, '#CFD8DC', 0) + P(`M${x + 6} 128c0 22 34 22 34 0`, '#B3E5FC', 0); })
      + Lc('M6 100h232', '#90A4AE', 4) + Lc('M30 176h40M150 196h50', '#E1F5FE', 3) + face(102, 112, 0.34)),
  L('jp/hokkaido/landmark-patchwork.v1.svg', 'เนินเขาผ้าปะหลากสีที่บิเอ', 'Biei\'s patchwork hills and a lone tree', ['biei', 'บิเอ', 'patchwork road', 'ถนนผ้าปะ', 'patchwork hills', 'เนินเขาผ้าปะ', 'farm fields', 'ทุ่งนาไร่', 'lone tree', 'rolling hills'], 'หาต้นไม้ต้นเดียวที่ยืนอยู่บนยอดเนิน', 'Find the single tree standing on top of the hill',
    // gently rolling hills cut into stripes of yellow wheat, green potatoes, brown earth and white buckwheat, a single tall tree on the top, a red-roofed barn and a little car on the road
    sky('#E3F2FD') + C(40, 40, 14, '#FFF59D', 2.5) + E(170, 46, 26, 10, '#FFFFFF', 2.5)
      + P('M-4 130c50-40 120-50 160-30s60 10 88 0v148H-4z', '#AED581')
      + Lc('M-4 150c50-36 120-44 160-26s60 12 88 2', '#FFE082', 14) + Lc('M-4 176c60-30 120-40 170-22s50 10 78 0', '#A1887F', 14) + Lc('M-4 202c70-24 130-30 180-16s40 8 68 0', '#81C784', 14) + Lc('M-4 228c70-20 140-24 248-14', '#FFFFFF', 14)
      + Lc('M136 104v-52', '#6D4C41', 6) + E(136, 56, 16, 30, '#388E3C') + R(30, 108, 30, 20, '#FFFFFF', 0, 2.5) + P('M26 110l19-14 19 14z', '#E53935', 2.5)
      + face(136, 58, 0.3) + R(176, 214, 26, 12, '#FF7043', 4, 2.5)),

  // ---------- Fukuoka
  L('jp/fukuoka/landmark-ohoripark.v1.svg', 'สวนโอโฮริ ศาลาลอยน้ำกับสะพานต่อเกาะ', 'Ōhori Park, its island bridges and floating pavilion', ['ohori park', 'ōhori park', 'สวนโอโฮริ', 'ukimido', 'floating pavilion', 'ศาลาลอยน้ำ', 'island bridges', 'สะพานเชื่อมเกาะ', 'pond walk', 'เดินรอบบึง'], 'หาศาลาหกเหลี่ยมหลังคาแดงที่ตั้งอยู่บนน้ำ', 'Find the six-sided red-roofed pavilion standing on the water',
    // a wide pond with a chain of little green islands joined by arched bridges, a red-roofed hexagonal pavilion standing in the water, a jogger kid on the path
    sky('#E8F5E9') + R(-4, 70, 248, 150, '#4FC3F7', 0, 0) + R(-4, 210, 248, 34, '#C5E1A5', 0, 0) + Lc('M30 120h40M150 186h50M70 170h30', '#B3E5FC', 3)
      + [[40, 96, 30], [120, 104, 26], [200, 94, 30]].map(([x, y, r]) => E(x, y, r, 12, '#81C784') + E(x - 8, y - 10, 10, 10, '#43A047') + E(x + 10, y - 8, 9, 8, '#2E7D32')).join('')
      + [[80], [160]].map(([x]) => P(`M${x - 18} 100q18-18 36 0`, 'none') + Lc(`M${x - 18} 100q18-18 36 0`, '#E53935', 5) + Lc(`M${x - 18} 94q18-18 36 0`, '#FFFFFF', 2.5)).join('')
      + g(118, 166, 1, R(-24, 0, 48, 10, '#A1673F', 2) + ring(4, (k) => Lc(`M${-18 + k * 12} 10v16`, '#6D4C41', 4)) + ring(3, (k) => Lc(`M${-16 + k * 16} 0v-22`, '#E53935', 4)) + P('M-34-20l34-20 34 20z', '#C62828') + face(0, -6, 0.3))
      + kid(40, 230, '#FFCA28', 0.85)),
  L('jp/fukuoka/landmark-acros.v1.svg', 'ตึกอะครอส ฟุกุโอกะ สวนขั้นบันไดบนหลังคา', 'ACROS Fukuoka and its step garden', ['acros fukuoka', 'อะครอสฟุกุโอกะ', 'step garden', 'สวนขั้นบันได', 'green building', 'ตึกต้นไม้', 'tenjin central park', 'สวนเท็นจิน', 'tenjin', 'เท็นจิน'], 'หาต้นไม้ที่ปลูกอยู่บนขั้นบันไดหลังคาตึก', 'Find the trees growing on the building\'s stepped roof',
    // a building whose one side steps down in terraces like a hill, every step covered in bushy trees, a glass front on the other side, a park lawn with a child in front
    sky('#E1F5FE') + R(-4, 200, 248, 44, '#AED581', 0, 0)
      + P('M30 200V176h28v-22h28v-22h28v-22h28v-22h28V66h40v134z', '#B0BEC5')
      + ring(6, (k) => { const x = 44 + k * 28, y = 172 - k * 22; return E(x, y, 18, 10, '#43A047') + E(x + 10, y - 4, 10, 8, '#66BB6A'); })
      + R(196, 66, 34, 134, '#81D4FA') + ring(6, (k) => Lc(`M196 ${82 + k * 20}h34`, '#E1F5FE', 3)) + Lc('M213 66v134', '#E1F5FE', 3)
      + face(150, 176, 0.42) + kid(40, 228, '#FF7043')),
  L('jp/fukuoka/landmark-yamakasa.v1.svg', 'ยามาคาซะ แบกเกี้ยววิ่งในเทศกาลฮากาตะกิอง', 'The running floats of Hakata Gion Yamakasa', ['hakata gion yamakasa', 'ฮากาตะกิองยามาคาซะ', 'yamakasa', 'ยามาคาซะ', 'running float', 'แบกเกี้ยววิ่ง', 'festival float', 'happi coat', 'เสื้อฮัปปิ', 'summer festival'], 'หาน้ำที่สาดใส่คนแบกเกี้ยวให้เย็นสบาย', 'Find the water splashing onto the float carriers to cool them down',
    // a wooden float on long poles topped with a tall decorated scene of rocks, waves and pine, three runners in happi coats under the poles, water splashing from a bucket
    R(-4, 208, 248, 36, '#BCAAA4', 0, 0) + Lc('M14 170h200', '#8D6E63', 8) + Lc('M14 182h200', '#8D6E63', 8)
      + R(70, 150, 90, 28, '#6D4C41', 2) + R(80, 118, 70, 34, '#E53935', 2) + Lc('M80 128h70', '#FFD54F', 4)
      + P('M84 118l12-40 16 14 14-34 12 26 10-10 2 44z', '#78909C') + P('M88 104q10-10 20 0t20 0 20 0', '#4FC3F7', 3) + E(126, 62, 12, 8, '#2E7D32') + Lc('M126 70v20', '#5D4037', 3)
      + [[40, '#1565C0'], [116, '#E53935'], [192, '#1565C0']].map(([x, c]) => g(x, 214, 1, C(0, -48, 9, '#FFE0BD', 2) + Lc('M-9-50h18', '#FFFFFF', 4) + P('M-12-38h24l4 30h-32z', c, 2.5) + Lc('M-6-8v16M6-8v16', '#FFE0BD', 5) + face(0, -46, 0.24))).join('')
      + g(212, 60, 1, P('M-12-10h24l-4 20h-16z', '#8D6E63') + Lc('M-8 10c-10 20-30 30-40 50M0 12c-6 22-20 36-30 50', '#4FC3F7', 4), -20) + face(115, 136, 0.3)),
  L('jp/fukuoka/landmark-gomasaba.v1.svg', 'โกมะซาบะ ปลาซาบะสดราดซอสงา', 'Goma saba, Fukuoka\'s mackerel with sesame sauce', ['goma saba', 'โกมะซาบะ', 'sesame mackerel', 'ปลาซาบะงา', 'saba', 'ซาบะ', 'sesame sauce', 'ซอสงา', 'hakata food', 'อาหารฮากาตะ'], 'หาเม็ดงาที่โรยอยู่บนชิ้นปลา', 'Find the sesame seeds sprinkled on the fish slices',
    // a round blue-patterned bowl with shiny slices of mackerel (silver-blue skin, pink flesh) fanned out in a creamy sesame sauce, topped with green onion, sesame seeds and a strip of nori
    E(120, 170, 96, 34, '#FFFFFF') + P('M24 170c0 40 192 40 192 0', '#FFFFFF') + Lc('M40 192q20 10 40 4M100 202q20 4 40 0M160 196q20-2 40-8', '#1E88E5', 3)
      + E(120, 162, 80, 22, '#E6C89A') + ring(5, (k) => g(68 + k * 26, 152 + (k % 2) * 6, 1, P('M-14 10c0-16 10-24 24-26 4 10 0 24-10 28z', '#F48FB1') + Lc('M-12 6c2-12 10-18 20-20', '#78909C', 4), -20 + k * 8))
      + ring(14, (k) => E(70 + (k * 37) % 100, 140 + (k * 13) % 26, 2.2, 1.3, '#FFF8E1', 0)) + ring(6, (k) => C(84 + k * 14, 140 - (k % 2) * 4, 3, '#7CB342', 1.5))
      + P('M110 120l26-8 4 12-26 8z', '#263238', 2.5) + face(120, 186, 0.4) + Lc('M190 110l30-60M200 114l30-60', '#8D6E63', 4)),
  L('jp/fukuoka/landmark-kinin.v1.svg', 'ตราทองคำโบราณจากเกาะชิกาโนชิมะ', 'The ancient gold seal from Shikanoshima', ['gold seal', 'ตราทองคำ', 'kin-in', 'kinin', 'คินอิน', 'shikanoshima', 'ชิกาโนชิมะ', 'fukuoka city museum', 'พิพิธภัณฑ์เมืองฟุกุโอกะ', 'national treasure'], 'หางูตัวเล็กที่ขดอยู่บนหัวตราทองคำ', 'Find the little snake coiled on top of the gold seal',
    // a small square gold seal on a red velvet cushion under a glass case, a curled snake as its handle, a plain square face showing below, sparkles round it
    R(30, 30, 180, 170, '#E1F5FE', 14) + R(30, 30, 180, 170, 'none', 14) + Lc('M50 50l30-14M60 70l40-20', '#FFFFFF', 4)
      + R(40, 170, 160, 30, '#8D6E63', 6) + P('M56 170c0-24 128-24 128 0z', '#C62828') + Lc('M74 160h92', '#E57373', 3)
      + R(84, 118, 72, 36, '#FFC107') + R(84, 146, 72, 10, '#FFA000', 0, 3)
      + P('M92 118c0-24 20-34 34-26 14 8 8 22-4 20-10-2-8-12 0-12', '#FFD54F', 4) + Lc('M92 118c0-24 20-34 34-26 14 8 8 22-4 20-10-2-8-12 0-12', '#FFC107', 6) + C(138, 96, 8, '#FFC107') + C(141, 94, 1.6, '#212121', 0)
      + face(120, 132, 0.36) + star(182, 64, 9, '#FFF59D', 2) + star(56, 104, 7, '#FFF59D', 2)),

  // ---------- Okinawa
  L('jp/okinawa/landmark-satandagi.v1.svg', 'ซาตาอันดากี โดนัทลูกกลมของโอกินาว่า', 'Sātā andāgī, Okinawa\'s round doughnuts', ['sata andagi', 'sātā andāgī', 'ซาตาอันดากี', 'okinawan doughnut', 'โดนัทโอกินาว่า', 'fried dough balls', 'แป้งทอดลูกกลม', 'kokusai street', 'ถนนโคคุไซ', 'brown sugar'], 'หารอยแตกบนโดนัทที่ดูเหมือนรอยยิ้ม', 'Find the crack on the doughnut that looks like a smile',
    // a woven basket lined with paper holding round golden-brown fried dough balls, each with a cracked open top like a smile, one bitten showing its yellow crumb
    P('M24 150h192l-20 66H44z', '#C08A4E') + ring(5, (k) => Lc(`M${40 + k * 36} 154l-6 60`, '#A06B35', 3)) + Lc('M36 176h168M42 198h156', '#A06B35', 3) + P('M30 152l20-12h140l20 12z', '#FFFFFF')
      + [[66, 126], [120, 120], [174, 126], [92, 92], [148, 90]].map(([x, y], k) => C(x, y, 28, k === 4 ? '#E09A4A' : '#C97B2E') + P(`M${x - 16} ${y - 12}q16 10 32 0`, '#FFD180', 3) + (k === 4 ? P(`M${x + 8} ${y + 26}c12-8 18-22 18-34 0 0-14-4-18 8z`, '#FFE082', 2.5) : '')).join('')
      + face(120, 126, 0.42)),
  L('jp/okinawa/landmark-kariyushi.v1.svg', 'เสื้อคาริยูชิลายดอกไม้ของโอกินาว่า', 'A kariyushi shirt, Okinawa\'s flowery summer shirt', ['kariyushi', 'คาริยูชิ', 'kariyushi shirt', 'เสื้อคาริยูชิ', 'okinawan shirt', 'เสื้อโอกินาว่า', 'hibiscus print', 'ลายดอกชบา', 'summer wear', 'island shirt'], 'หาดอกชบาสีแดงบนเสื้อเชิ้ต', 'Find the red hibiscus flowers on the shirt',
    // a short-sleeved open-collar shirt in sea blue covered with red hibiscus, white flowers and green leaves, a row of buttons, hanging on a wooden hanger
    Lc('M120 30v16', '#8D6E63', 4) + P('M110 30c0-12 20-12 20 0', 'none') + Lc('M60 62l60-16 60 16', '#8D6E63', 6)
      + P('M78 56l-58 34 20 40 30-14v100h100V116l30 14 20-40-58-34c-10 14-42 14-52 0z', '#4FC3F7')
      + P('M98 56l22 34 22-34', '#29B6F6') + Lc('M120 90v126', '#0288D1', 3) + ring(4, (k) => C(126, 108 + k * 26, 3, '#FFFFFF', 1.5))
      + [[70, 140], [160, 120], [100, 190], [168, 186], [42, 100]].map(([x, y]) => ring(5, (k) => { const a = k * 72 * Math.PI / 180; return C(x + 8 * Math.cos(a), y + 8 * Math.sin(a), 6, '#E53935', 0); }) + C(x, y, 3, '#FFEB3B', 0) + P(`M${x + 6} ${y + 10}q10 6 16 0q-6-10-16 0z`, '#43A047', 0)).join('')
      + [[140, 150], [82, 104], [198, 104]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 0)).join('') + face(146, 158, 0.38)),
  L('jp/okinawa/landmark-kuina.v1.svg', 'นกยันบารุคุยนะ นกที่บินไม่ได้แห่งป่าโอกินาว่า', 'The Okinawa rail, the bird of the Yanbaru forest that cannot fly', ['okinawa rail', 'นกยันบารุคุยนะ', 'yanbaru kuina', 'ยันบารุคุยนะ', 'yanbaru', 'ป่ายันบารุ', 'flightless bird', 'นกที่บินไม่ได้', 'kunigami', 'rare bird'], 'หาจะงอยปากสีแดงกับขาแดงๆ ของนก', 'Find the bird\'s red beak and red legs',
    // a plump dark olive bird running on the forest floor, its belly barred black and white, a bright red beak and red legs, big ferns behind and a road sign shape without words
    R(-4, 196, 248, 48, '#8D6E63', 0, 0) + [[30, 120, -30], [210, 110, 30], [180, 150, 50]].map(([x, y, r]) => g(x, y, 1, Lc('M0 80c0-40 0-60 0-80', '#2E7D32', 4) + ring(5, (k) => E(-12, 70 - k * 14, 14, 5, '#43A047', 0) + E(12, 64 - k * 14, 14, 5, '#66BB6A', 0)), r)).join('')
      + g(118, 132, 1, P('M-50 6c0-30 30-44 60-36l26-10c10-2 18 10 10 18l-8 6c6 30-30 56-70 46-14-4-20-12-18-24z', '#5D5A3C') + P('M-46 18c10 22 50 30 80 6-14 30-60 34-80-6z', '#FFFFFF')
        + ring(6, (k) => Lc(`M${-38 + k * 12} ${22 + (k % 2) * 4}l6 12`, '#212121', 3)) + P('M30-36l34-4-30 14z', '#E53935') + C(28, -36, 5, '#FFFFFF', 2) + C(28, -36, 2.4, '#212121', 0)
        + Lc('M-6 50l-10 30M14 48l12 30', '#E53935', 5) + Lc('M-24 80h14M20 78h14', '#E53935', 4) + E(8, -26, 6, 4, '#FF8FA3', 0))),
  L('jp/okinawa/landmark-umibudo.v1.svg', 'อุมิบุโดะ สาหร่ายพวงองุ่นทะเล', 'Umibudō, Okinawa\'s sea grapes', ['umibudo', 'umibudō', 'อุมิบุโดะ', 'sea grapes', 'สาหร่ายพวงองุ่น', 'green caviar', 'คาเวียร์เขียว', 'seaweed', 'สาหร่ายทะเล', 'ponzu'], 'หาเม็ดกลมสีเขียวเล็กๆ ที่เรียงเป็นพวงเหมือนองุ่น', 'Find the tiny green beads growing in bunches like grapes',
    // a blue glass bowl heaped with sprigs of sea grapes, each stem crowded with shiny tiny green bubbles, a little dish of ponzu sauce and chopsticks beside it
    P('M28 134h150c0 44-34 72-75 72s-75-28-75-72z', '#4FC3F7') + E(103, 134, 75, 16, '#81D4FA') + Lc('M40 156q30 10 60 0', '#E1F5FE', 4)
      + [[60, 128, -30], [86, 120, -10], [112, 118, 8], [138, 122, 26], [100, 128, 0]].map(([x, y, r]) => g(x, y, 1, Lc('M0 10v-50', '#7CB342', 3) + ring(9, (k) => C((k % 2 ? 5 : -5), -2 - k * 5, 5, k % 3 ? '#8BC34A' : '#9CCC65', 1.5)), r)).join('')
      + E(196, 176, 26, 10, '#FFFFFF') + E(196, 172, 18, 6, '#8D5524', 0) + Lc('M168 150l50-60M178 154l50-60', '#D7A86E', 4) + face(103, 176, 0.42)),
  L('jp/okinawa/landmark-hoshizuna.v1.svg', 'ทรายดาวบนเกาะทาเกโทมิ', 'The star sand of Taketomi Island', ['star sand', 'ทรายดาว', 'hoshizuna', 'โฮชิซึนะ', 'taketomi', 'ทาเกโทมิ', 'kaiji beach', 'หาดไคจิ', 'magnifying glass', 'แว่นขยาย'], 'หาเม็ดทรายรูปดาวในแว่นขยาย', 'Find the star-shaped grains of sand in the magnifying glass',
    // a sandy beach with turquoise sea, a big magnifying glass over the sand showing that every grain is a tiny star, a little bottle of star sand beside it
    R(-4, -4, 248, 80, '#4DD0E1', 0, 0) + Lc('M20 40h40M140 30h50', '#E0F7FA', 3) + P('M-4 76c60-10 180-10 248 0v170H-4z', '#FFE9B8', 0) + Lc('M-4 76c60-10 180-10 248 0', '#FFFFFF', 5)
      + ring(18, (k) => C(20 + (k * 53) % 210, 100 + (k * 29) % 130, 1.6, '#E0B97A', 0))
      + C(110, 140, 56, '#FFF3D6', 6) + ring(9, (k) => star(80 + (k % 3) * 30, 112 + Math.floor(k / 3) * 28, 9, ['#FFCC80', '#FFE0B2', '#FFAB91'][k % 3], 1.5))
      + Lc('M150 180l40 40', '#8D6E63', 12) + C(110, 140, 56, 'none', 6) + face(110, 152, 0.3)
      + g(204, 112, 1, R(-14, -20, 28, 40, '#E1F5FE', 8) + R(-14, 0, 28, 20, '#FFE0B2', 0, 0) + R(-14, -20, 28, 40, 'none', 8) + R(-8, -32, 16, 12, '#A1887F', 2))),

  // ---------- Takayama, Shirakawa-go and Nagoya
  L('jp/takayama/landmark-hidagyusushi.v1.svg', 'ซูชิเนื้อฮิดะบนข้าวเกรียบ ย่านซันมาจิ', 'Hida beef sushi on a rice cracker in Sanmachi', ['hida beef sushi', 'ซูชิเนื้อฮิดะ', 'hida beef', 'เนื้อฮิดะ', 'hidagyu', 'ฮิดะกิว', 'sanmachi', 'ซันมาจิ', 'rice cracker plate', 'ข้าวเกรียบรองซูชิ'], 'หาข้าวเกรียบกลมที่ใช้แทนจานรองซูชิ', 'Find the round rice cracker used as a plate under the sushi',
    // a hand holding a round brown rice cracker as a plate, two pieces of sushi topped with pink seared beef and a dab of ginger on it, a lane of dark wooden houses behind
    sky('#FFF8E1') + R(-4, 30, 248, 110, '#5D4037', 0, 0) + ring(5, (k) => Lc(`M${10 + k * 50} 40v100`, '#3E2723', 4)) + P('M-4 30h248l-10-16H6z', '#455A64', 0) + ring(5, (k) => R(20 + k * 50, 60, 24, 34, '#FFE082', 0, 2.5))
      + E(120, 176, 84, 34, '#C68642') + ring(10, (k) => C(60 + (k * 31) % 120, 164 + (k * 17) % 24, 2, '#A1673F', 0)) + E(120, 172, 84, 34, 'none')
      + [[94, 160], [146, 160]].map(([x, y]) => E(x, y + 6, 24, 12, '#FFFFFF') + P(`M${x - 28} ${y + 2}c10-18 46-18 56 0-6 8-50 8-56 0z`, '#E57373') + Lc(`M${x - 18} ${y - 4}l10-4M${x + 4} ${y - 6}l10 2`, '#C62828', 2.5) + E(x, y - 10, 6, 3, '#FFAB91', 1.5)).join('')
      + P('M196 196c20 6 36 22 44 40h-40c-8-14-12-26-4-40z', '#FFE0BD') + face(120, 194, 0.36)),
  L('jp/takayama/landmark-oasis21.v1.svg', 'หลังคาแก้วโอเอซิส 21 ที่ซาคาเอะ นาโกย่า', 'The glass water roof of Oasis 21 in Sakae, Nagoya', ['oasis 21', 'โอเอซิส 21', 'water spaceship', 'ยานอวกาศน้ำ', 'sakae', 'ซาคาเอะ', 'glass roof', 'หลังคาแก้ว', 'nagoya', 'water on the roof'], 'หาน้ำสีฟ้าที่อยู่บนหลังคาแก้วรูปไข่', 'Find the blue water lying on top of the oval glass roof',
    // a huge flat oval glass roof held up high on slim legs, a shallow pool of blue water on top with people walking round its rim, a green sunken park below
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#AED581', 0, 0) + E(120, 210, 90, 16, '#9CCC65', 0)
      + ring(6, (k) => Lc(`M${40 + k * 32} 190l${(k - 2.5) * 4} -80`, '#90A4AE', 5))
      + E(120, 96, 116, 24, '#B3E5FC') + E(120, 92, 112, 18, '#4FC3F7') + Lc('M40 92q20-6 40 0t40 0 40 0', '#E1F5FE', 3) + E(120, 100, 116, 24, 'none')
      + kid(60, 86, '#FFCA28', 0.6) + kid(180, 86, '#FF7043', 0.6) + face(120, 104, 0.34) + ring(5, (k) => E(56 + k * 32, 214, 10, 6, '#66BB6A'))),
  L('jp/takayama/landmark-jinya.v1.svg', 'ทาคายามะจินยะ ที่ว่าการเมืองยุคเอโดะ', 'Takayama Jinya, the old government house', ['takayama jinya', 'ทาคายามะจินยะ', 'jinya', 'จินยะ', 'government house', 'ที่ว่าการเก่า', 'edo period', 'ยุคเอโดะ', 'wooden gate', 'jinya morning market'], 'หาประตูไม้ใหญ่ที่มีหลังคากระเบื้องหนาๆ', 'Find the big wooden gate under its heavy tiled roof',
    // a wide wooden gatehouse with heavy grey tiled roofs, open double doors showing a gravel yard, white plaster walls on both sides with dark wood bands, a stone forecourt
    sky('#E8EAF6') + R(-4, 198, 248, 46, '#D7CCC8', 0, 0) + ring(6, (k) => Lc(`M${k * 44} 210l20 30`, '#BCAAA4', 2.5))
      + [10, 166].map((x) => R(x, 120, 64, 78, '#FAFAFA') + R(x, 176, 64, 22, '#5D4037', 0, 3) + P(`M${x - 6} 122l8-14h60l8 14z`, '#607D8B')).join('')
      + R(72, 110, 96, 90, '#8D6E63') + R(96, 136, 48, 64, '#EFEBE9', 0, 3) + R(84, 136, 14, 64, '#6D4C41') + R(142, 136, 14, 64, '#6D4C41')
      + P('M54 114l24-34h84l24 34z', '#546E7A') + Lc('M64 104h112M74 92h92', '#78909C', 3) + P('M100 80l20-14 20 14z', '#455A64')
      + face(120, 124, 0.36) + kid(120, 216, '#26A69A', 0.8)),
  L('jp/takayama/landmark-taishoike.v1.svg', 'บึงไทโชที่คามิโคจิ', 'Taishō Pond at Kamikōchi', ['taisho pond', 'taishō-ike', 'บึงไทโช', 'kamikochi', 'kamikōchi', 'คามิโคจิ', 'mount yakedake', 'ภูเขายาเกะดาเกะ', 'japanese alps', 'เทือกเขาแอลป์ญี่ปุ่น'], 'หาตอไม้แห้งที่ยืนอยู่กลางน้ำ', 'Find the bare tree trunks standing in the water',
    // a still blue-green pond with bare silver tree trunks standing in it, a volcano with a puff of steam behind, wisps of morning mist across the water, reflections below
    sky('#E1F5FE') + P('M20 120l70-80 30 18 30-10 70 72z', '#90A4AE') + P('M78 54l12-14 30 18 4-4 6 10-20 4z', '#FFFFFF', 0) + Lc('M100 36q-6-10 4-16t2-14', '#ECEFF1', 4)
      + P('M-4 120c40-14 80-6 120-8s90 4 128-4v20H-4z', '#2E7D32') + R(-4, 126, 248, 118, '#4DB6AC', 0, 0)
      + P('M20 126l70 70 30-12 30 8 70-66z', '#80CBC4', 0)
      + [[50, 70], [92, 90], [150, 60], [196, 84]].map(([x, h]) => Lc(`M${x} 196v-${h}`, '#CFD8DC', 6) + Lc(`M${x} ${196 - h + 20}l-10-12M${x} ${196 - h + 34}l12-10`, '#CFD8DC', 3) + Lc(`M${x} 196v24`, '#B2DFDB', 6)).join('')
      + Lc('M10 160q30-8 60 0t60 0M120 176q30-8 60 0t60 0', '#FFFFFF', 5) + face(120, 214, 0.34)),
  L('jp/takayama/landmark-warousoku.v1.svg', 'เทียนญี่ปุ่นวาโรโซกุแห่งฮิดะฟุรุคาวะ', 'Warōsoku, the painted candles of Hida-Furukawa', ['warosoku', 'warōsoku', 'วาโรโซกุ', 'japanese candles', 'เทียนญี่ปุ่น', 'hida furukawa', 'ฮิดะฟุรุคาวะ', 'painted candles', 'เทียนวาดลาย', 'candle maker'], 'หาดอกคามีเลียสีแดงที่วาดอยู่บนเทียน', 'Find the red camellia painted on the candle',
    // three tall candles that widen towards the top, the middle one painted with a red camellia and green leaves, each with a soft flame, standing in brass holders on a wooden counter
    R(-4, 200, 248, 44, '#A1673F', 0, 0) + Lc('M-4 206h248', '#8D5524', 3)
      + [[66, 0.8, '#FFF8E1'], [120, 1, '#FFFFFF'], [174, 0.8, '#FFCDD2']].map(([x, s, c]) => g(x, 200, s, R(-16, -10, 32, 10, '#FFC107', 2) + P('M-10-10l-16-130h52l-16 130z', c) + Lc('M0-140v-12', '#5D4037', 3) + P('M0-152c-10-12-4-26 0-34 4 8 10 22 0 34z', '#FFB300', 2.5) + P('M0-156c-4-6-2-12 0-16 2 4 4 10 0 16z', '#FFF59D', 0))).join('')
      + ring(5, (k) => { const a = k * 72 * Math.PI / 180; return C(120 + 9 * Math.cos(a), 116 + 9 * Math.sin(a), 8, '#E53935', 2); }) + C(120, 116, 5, '#FFEB3B', 2)
      + P('M106 136q-10 8-4 18 10-4 4-18zM134 136q10 8 4 18-10-4-4-18z', '#43A047', 2) + face(120, 170, 0.34)),
];

export default { places: {}, items };
