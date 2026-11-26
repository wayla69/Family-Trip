// Wave 17: Miyazaki (the city, Aoshima, Udo, the Nichinan coast, Sun Messe, Obi, Takachiho, Cape Toi) — the sunny south coast:
// Aoshima's devil's washboard and torii bridge, Udo's sea-cave shrine and the lucky stones thrown at the turtle rock, the Sun Messe
// moai above the sea, Phoenix palms, Obi's castle gate and its eat-and-walk fish cakes, the Takachiho gorge boat, Cape Toi's
// free-ranging horses, and the food: chicken nanban, mango, hyuganatsu, kumquat, Miyazaki beef, charcoal-grilled chicken, cold hiyajiru.
// Skipped as repeats or bans: Kumamoto's own Takachiho day scene (here only the boat under Manai Falls, close up), Kirishima (Kagoshima's),
// the deity of the Udo and Aoshima shrines (no gods), Seagaia's Ocean Dome (closed), a lighthouse at Cape Toi (Okinawa, Kochi have one),
// riding the horses (riding animals), shochu (alcohol).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const MZ = { k1: '#E8590C', k2: '#00897B', k3: '#FFF3E0' };
const CITY = 'jp-miyazaki', DIR = 'jp/miyazaki';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// a Phoenix palm: a curved trunk and a crown of drooping fronds (x, y = foot, s = scale)
const palm = (x, y, s = 1) => g(x, y, s, ol('M0 0c6-20-4-40 2-62', '#8D6E63', 7)
  + [-165, -125, -85, -45, -5, 25].map((r) => g(2, -62, 1, P('M0 0q22-24 50 2q-26-6-50-2z', '#43A047', 2.5), r)).join('') + C(2, -62, 5, '#6D4C41', 2.5));
// a moai statue: a tall stone head with a brow ridge, a long nose and a smile
const moai = (x, y, s = 1, c = '#A8A29A') => g(x, y, s, P('M-15 0V-46Q-16-66 0-68Q16-66 15-46V0Z', c, 3.5) + P('M-13 -50h26', 'none', 3) + P('M-3 -48l-3 14h12l-3-14', '#8F8A82', 2.5) + C(-7, -50, 2.2, INK, 0) + C(7, -50, 2.2, INK, 0) + Lc('M-6 -26q6 4 12 0', INK, 2.5));
const wave = (y, c = '#B3E5FC') => P(`M-4 ${y}q15-10 30 0t30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0v${244 - y}H-4z`, c, 3);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับมิยาซากิ', 'Miyazaki stamp'), kw: ['miyazaki', 'มิยาซากิ', 'aoshima', 'อาโอชิมะ', 'nichinan coast', 'ชายฝั่งนิชินัน', 'phoenix palm', 'ต้นปาล์มฟีนิกซ์', 'hyuga sea', 'ทะเลฮิวงะ', 'kyushu', 'คิวชู'],
    // a smiling orange sun rising over a blue sea, a Phoenix palm on a sandy point with a little vermilion torii on the sandbar beside it
    svg: cityStamp('mz-st', { name: 'MIYAZAKI', sub: 'SUNNY COAST · JAPAN', ...MZ, emblem: C(100, 100, 22, '#FFB300', 3) + Lc('M100 68v-8M76 76l-5-5M124 76l5-5M66 100h-8M134 100h8', '#FB8C00', 3)
      + R(48, 104, 104, 40, '#4FC3F7', 0, 0) + Lc('M58 114h16M112 120h22M76 130h14', '#E1F5FE', 2.5) + P('M46 142c22-14 56-14 108 0v6H46z', '#FFE082', 2.5)
      + palm(76, 142, 0.5) + R(114, 120, 3.5, 18, '#E53935', 0, 1.5) + R(130, 120, 3.5, 18, '#E53935', 0, 1.5) + R(110, 116, 28, 4, '#E53935', 0, 1.5) + face(100, 94, 0.3) }) },

  D('aoshima', 'เกาะอาโอชิมะ สะพานทอริอิ และหินกระดานซักผ้า', 'Aoshima island, the torii bridge and the devil’s washboard', ['aoshima', 'อาโอชิมะ', '青島', 'devils washboard', 'หินกระดานซักผ้าปีศาจ', 'torii bridge', 'สะพานทอริอิ', 'betel palm', 'ปาล์มหมาก', 'sandbar', 'สันทราย', 'low tide', 'น้ำลง'],
    // the little round island thick with palms joined to the beach by a short bridge with a red torii, the ridged washboard rocks in front and wide blue sea
    scene('mz-d1', '#E1F5FE', wave(100, '#4FC3F7') + Lc('M20 112h26M170 120h30M90 108h24', '#E1F5FE', 3)
      + E(120, 96, 52, 26, '#66BB6A') + palm(100, 98, 0.8) + palm(130, 96, 0.7) + palm(150, 100, 0.6) + P('M70 106q50 14 100 0v10H70z', '#FFE082', 2.5)
      + R(30, 126, 40, 8, '#FFE082', 0, 0) + R(54, 100, 4, 22, '#E53935', 0, 2.5) + R(70, 100, 4, 22, '#E53935', 0, 2.5) + R(50, 96, 28, 5, '#E53935', 0, 2.5)
      + P('M-4 150c40-14 100-20 140-6s80 4 108-4v110H-4z', '#FFE082') + P('M-4 178c60-18 140-22 248 0v70H-4z', '#B0A59A')
      + [0, 1, 2, 3, 4].map((k) => P(`M${-4 + k * 6} ${176 + k * 12}l${100 + k * 10} -${8 + k * 2}`, 'none', 4)).join('') + Lc('M30 210l150-18M20 226l190-20', '#8D8378', 3) + face(120, 80, 0.45))),
  D('udo', 'ศาลเจ้าในถ้ำริมทะเลที่อูโดะและเต่าหิน', 'The sea-cave shrine at Udo and the turtle rock', ['udo shrine', 'ศาลเจ้าอูโดะ', '鵜戸神宮', 'udo jingu', 'sea cave', 'ถ้ำริมทะเล', 'turtle rock', 'หินเต่า', 'unsui stones', 'หินนำโชค', 'nichinan coast', 'ชายฝั่งนิชินัน', 'cliff', 'หน้าผา'],
    // a cliff by the sea with a wide cave mouth holding a small vermilion shrine hall, a path of steps down to the water, the turtle-shaped rock with a hollow on its back and little stones in the air
    scene('mz-d2', '#E0F7FA', wave(150, '#29B6F6') + P('M-4 40c40-12 90-8 130 6 40 14 80 6 118-10v100H-4z', '#8D8378') + P('M60 150V96q0-34 50-34t50 34v54z', '#5D4F44', 3.5)
      + R(86, 112, 48, 38, '#E53935', 0, 3) + P('M80 114q30-22 60 0z', '#455A64', 3) + R(104, 130, 12, 20, '#FFF8E1', 0, 2.5)
      + P('M40 150l30 30M54 150l30 30', 'none', 3) + E(180, 176, 40, 22, '#A1887F') + C(150, 170, 15, '#A1887F') + P('M176 160a10 6 0 0 1 20 0', '#6D4C41', 2.5) + face(150, 168, 0.3)
      + [[170, 128], [190, 110], [208, 126]].map(([x, y]) => C(x, y, 5, '#FFE082', 2.5)).join('') + Lc('M20 200l70-10M110 214l90-10', '#E1F5FE', 3))),
  D('nichinan', 'รูปปั้นโมอายซันเมสเซ่ริมทะเลนิชินัน', 'The Sun Messe moai above the Nichinan sea', ['sun messe nichinan', 'ซันเมสเซ่นิชินัน', 'moai', 'โมอาย', 'easter island', 'เกาะอีสเตอร์', 'nichinan', 'นิชินัน', '日南', 'phoenix palm', 'ปาล์มฟีนิกซ์', 'hill by the sea', 'เนินริมทะเล'],
    // seven stone moai standing on a green hill in a row, the biggest in the middle, with palms and the wide blue Hyuga sea behind
    scene('mz-d3', '#E1F5FE', wave(92, '#4FC3F7') + Lc('M20 104h24M150 100h36', '#E1F5FE', 3) + P('M-4 120c50-30 150-30 248 0v130H-4z', '#81C784') + P('M-4 150c60-20 140-20 248 0v100H-4z', '#66BB6A')
      + palm(30, 138, 0.8) + palm(212, 138, 0.8) + [[56, 150, 0.7], [84, 144, 0.85], [150, 144, 0.85], [182, 150, 0.7]].map(([x, y, s]) => moai(x, y, s)).join('')
      + moai(120, 160, 1.3, '#B5AFA6') + P('M0 228c60-14 180-14 248 0v20H0z', '#43A047', 0))),
  D('obi', 'ปราสาทเมืองโอบิและคลองปลาคาร์ป', 'The castle town of Obi and its carp canal', ['obi castle', 'ปราสาทโอบิ', '飫肥', 'obi town', 'เมืองโอบิ', 'obi cedar', 'ซุกิโอบิ', 'samurai town', 'เมืองซามูไร', 'stone wall', 'กำแพงหิน', 'koi canal', 'คลองปลาคาร์ป'],
    // an old street of white walls and tiled gates lined with tall green cedars, a stone-edged canal with orange carp running down the middle, a paper lantern hanging at the gate
    scene('mz-d4', '#E8F5E9', P('M-4 60h248v120H-4z', '#FFF8E1', 0) + R(10, 70, 70, 100, '#FFFFFF') + R(160, 70, 74, 100, '#FFFFFF') + P('M0 70h90l-6-14H6zM150 70h96l-8-14h-80z', '#546E7A', 3)
      + R(36, 110, 22, 60, '#8D6E63', 0, 3) + R(178, 110, 22, 60, '#8D6E63', 0, 3) + Lc('M58 110l0 -8', INK, 2.5)
      + [[18, 150], [96, 140], [150, 140], [226, 150]].map(([x, h]) => P(`M${x} ${h + 30}l-14 0l8-26l-6 0l10-30l-6 0l12-34l12 34l-6 0l10 30l-6 0l8 26z`, '#2E7D32', 3)).join('')
      + P('M70 250l30-90h40l30 90z', '#BCAAA4') + P('M96 250l14-70h20l14 70z', '#4DD0E1', 3) + g(118, 220, 1, E(0, 0, 11, 5, '#FF8A65', 2.5) + P('M10 0l7-5v10z', '#FF8A65', 2.5) + C(-5, -1, 1.5, INK, 0))
      + Lc('M112 90v12', INK, 3) + E(112, 112, 9, 11, '#E53935', 3) + face(112, 110, 0.22, 'none'))),

  // the little rowing boat under Manai Falls: a green gorge, a thin waterfall dropping from a notch, a white rowing boat with a smile on its bow
  L('takachiho', 'เรือพายใต้น้ำตกมานาอิในหุบเขาทาคาจิโฮ', 'A rowing boat under Manai Falls in the gorge', ['takachiho', 'ทาคาจิโฮ', 'takachiho gorge', 'หุบเขาทาคาจิโฮ', 'manai falls', 'น้ำตกมานาอิ', 'rowing boat', 'เรือพาย', 'waterfall', 'น้ำตก', 'basalt cliffs', 'หน้าผาหินบะซอลต์'], 'หาเรือพายที่ลอยอยู่ใต้น้ำตก', 'Find the little rowing boat under the waterfall',
    P('M20 30h60l-6 130H26z', '#6D5D50', 3.5) + P('M160 30h60l-12 130h-54z', '#6D5D50', 3.5) + P('M20 30c10-8 50-8 60 0M160 30c10-8 50-8 60 0', '#43A047', 3)
    + R(96, 30, 14, 100, '#E1F5FE', 6, 3) + Lc('M103 40v80', '#FFFFFF', 3) + E(103, 134, 20, 6, '#FFFFFF', 2.5)
    + P('M20 150q50-10 100 0t100 0v50q-50 14-100 0t-100 0z', '#26A69A', 3.5) + P('M60 176h60l-8 18H68z', '#FFFFFF', 3) + Lc('M90 176l-6 -18', INK, 3) + P('M124 176l10 -6v10z', '#FFFFFF', 2.5) + face(90, 184, 0.25, 'none') + Lc('M70 198q20 6 40 0M150 192h30', '#B2DFDB', 2.5)),
  // a plate of crisp golden chicken nanban pieces under white tartar sauce and a sprinkle of green, with shredded cabbage and a lemon wedge
  L('nanban', 'ไก่ทอดนันบังราดซอสทาร์ทาร์', 'Chicken nanban with tartar sauce', ['chicken nanban', 'ไก่นันบัง', 'tartar sauce', 'ซอสทาร์ทาร์', 'fried chicken', 'ไก่ทอด', 'miyazaki food', 'อาหารมิยาซากิ', 'sweet vinegar', 'ซอสเปรี้ยวหวาน', 'local dish', 'อาหารพื้นเมือง'], 'หาไก่นันบังชิ้นที่ยิ้ม', 'Find the smiling piece of chicken nanban',
    E(120, 150, 94, 52, '#FFFFFF') + E(120, 150, 70, 36, '#FFF8E1', 2.5) + P('M50 138c10-22 30-14 40 0z', '#9CCC65', 2.5) + P('M150 138c10-20 30-14 40 0z', '#AED581', 2.5)
    + E(92, 136, 38, 24, '#F9A825') + E(150, 140, 34, 22, '#FBC02D') + P('M64 130c8-14 32-18 56-8 6 6 0 12-8 12-14-6-30-4-44 4z', '#FFFFFF', 2.5) + P('M128 130c8-12 28-14 44-4 4 6-2 12-10 10-10-4-22-2-30 4z', '#FFFFFF', 2.5)
    + [[80, 124], [100, 120], [140, 128], [160, 126]].map(([x, y]) => C(x, y, 2.2, '#7CB342', 0)).join('') + face(92, 144, 0.5)
    + P('M170 176l22-14a20 20 0 0 1 0 28z', '#FFF176', 2.5) + Lc('M176 176l12-8', '#FFFFFF', 2)),
  // Miyazaki's "egg of the sun" mango, deep red going to gold, on its stem with a green leaf and a little sun above it
  L('mango', 'มะม่วงไข่ดวงอาทิตย์ของมิยาซากิ', 'A Miyazaki sun-egg mango', ['miyazaki mango', 'มะม่วงมิยาซากิ', 'taiyo no tamago', 'ไข่ดวงอาทิตย์', 'mango', 'มะม่วง', 'red mango', 'มะม่วงสีแดง', 'fruit', 'ผลไม้', 'gift fruit', 'ผลไม้ของขวัญ'], 'หามะม่วงสีแดงที่ยิ้ม', 'Find the red mango with a smile',
    C(200, 40, 16, '#FFB300', 3) + Lc('M200 14v-6M178 22l-5-5M222 22l5-5M226 40h6', '#FB8C00', 3)
    + P('M120 44c-40 4-76 40-70 92 6 48 46 68 76 64 44-4 66-44 60-84-6-40-30-70-66-72z', '#E53935', 4) + P('M126 44c30 6 56 34 60 70-10-10-30-22-60-22z', '#FFB300', 0) + P('M120 44c-40 4-76 40-70 92 6 48 46 68 76 64 44-4 66-44 60-84-6-40-30-70-66-72z', 'none', 4)
    + P('M70 90c4-14 14-22 28-26', 'none', 3) + Lc('M120 44q-2-14 6-22', '#6D4C41', 6) + P('M126 26c14-16 36-10 40 4-16 6-34 6-40-4z', '#43A047', 3) + face(112, 130, 0.65)),
  // a hyuganatsu citrus, round and pale yellow, with its leaf and a cut half beside it showing white pith and juicy segments
  L('hyuganatsu', 'ส้มฮิวงะนัตสึสีเหลืองอ่อน', 'The pale-yellow hyuganatsu citrus', ['hyuganatsu', 'ฮิวงะนัตสึ', '日向夏', 'citrus', 'ส้ม', 'summer orange', 'ส้มฤดูร้อน', 'white pith', 'เปลือกขาว', 'fruit', 'ผลไม้', 'miyazaki fruit', 'ผลไม้มิยาซากิ'], 'หาส้มลูกกลมที่ยิ้ม', 'Find the round yellow citrus with a smile',
    C(92, 130, 56, '#FFEB3B') + P('M76 100c10-14 28-20 44-16', 'none', 3) + Lc('M92 74q0-12 6-18', '#6D4C41', 5) + P('M98 60c14-16 36-12 40 4-14 8-32 8-40-4z', '#43A047', 3) + face(90, 134, 0.6)
    + C(176, 164, 38, '#FFF9C4') + C(176, 164, 30, '#FFF59D', 2.5) + [0, 1, 2, 3, 4, 5].map((k) => g(176, 164, 1, P('M0 0l-9-26a28 28 0 0 1 18 0z', '#FFEE58', 2), k * 60)).join('')),
  // a plump kumquat pair on a twig with leaves, glowing orange, one with a face
  L('kumquat', 'คัมควอตลูกส้มจิ๋วสีส้มสด', 'A pair of little orange kumquats', ['kumquat', 'คัมควอต', 'tamatama', 'ทามาทามะ', 'little citrus', 'ส้มจิ๋ว', 'winter fruit', 'ผลไม้หน้าหนาว', 'miyazaki kumquat', 'คัมควอตมิยาซากิ', 'orange fruit', 'ผลไม้สีส้ม'], 'หาส้มจิ๋วที่ยิ้ม', 'Find the little orange fruit with a smile',
    Lc('M40 70q70-30 160 6', '#8D6E63', 6) + P('M60 62c-4-26 16-40 34-34-4 20-16 34-34 34z', '#43A047', 3) + P('M150 70c-2-26 20-40 36-30-6 20-20 32-36 30z', '#66BB6A', 3)
    + E(92, 140, 40, 46, '#FB8C00') + E(170, 150, 32, 38, '#FFA726') + C(92, 98, 5, '#6D4C41', 2) + C(170, 116, 4, '#6D4C41', 2) + face(92, 142, 0.6) + face(170, 152, 0.45, 'none') + Lc('M88 96l8 0M166 114l8 0', '#33691E', 2.5)),
  // a thick slice of finely marbled Miyazaki beef sizzling on a small iron plate, white marbling like snow-flakes in deep red, a wisp of steam, a face
  L('beef', 'เนื้อวัวมิยาซากิลายหินอ่อนบนจานร้อน', 'Marbled Miyazaki beef on a hot plate', ['miyazaki beef', 'เนื้อวัวมิยาซากิ', 'wagyu', 'วากิว', 'marbled beef', 'เนื้อลายหินอ่อน', 'sizzling plate', 'จานร้อน', 'steak', 'สเต๊ก', 'beef', 'เนื้อวัว'], 'หาเนื้อชิ้นที่ยิ้ม', 'Find the slice of beef with a smile',
    E(120, 164, 96, 40, '#455A64') + E(120, 158, 84, 32, '#607D8B', 2.5) + P('M48 150c4-36 40-46 74-42 44 2 68 20 66 44-4 20-30 28-66 28-44 0-76-8-74-30z', '#C62828', 4)
    + Lc('M70 140q16-10 30 0M108 128q20-6 34 6M130 156q14-6 28 2M80 164q16-6 30 2', '#FFCDD2', 4) + Lc('M60 150q8 4 14 0', '#FFEBEE', 3)
    + Lc('M90 96q-8-12 0-22M122 92q-8-12 0-22M154 98q-8-12 0-22', '#CFD8DC', 3.5) + face(120, 156, 0.6)),
  // a Phoenix palm of the Nichinan coast on a sandy bank by the sea, a round smiling coconut-like crown base and an orange sun low behind
  L('phoenixpalm', 'ต้นปาล์มฟีนิกซ์ริมชายฝั่งนิชินัน', 'A Phoenix palm on the Nichinan coast', ['phoenix palm', 'ปาล์มฟีนิกซ์', 'phoenix canariensis', 'palm tree', 'ต้นปาล์ม', 'nichinan coast', 'ชายฝั่งนิชินัน', 'southern japan', 'ญี่ปุ่นตอนใต้', 'seaside', 'ริมทะเล', 'tropical look', 'บรรยากาศเมืองร้อน'], 'หาต้นปาล์มที่ยิ้ม', 'Find the palm tree with a smile',
    C(190, 70, 24, '#FFB300', 3) + P('M20 190c40-22 120-22 200 0v30H20z', '#FFE082', 3.5) + Lc('M30 186q30-6 60 0', '#FFD54F', 3)
    + ol('M110 196c12-40-8-80 6-124', '#8D6E63', 18) + [-170, -130, -90, -50, -10, 25].map((r) => g(116, 72, 1.9, P('M0 0q22-24 50 2q-26-6-50-2z', '#43A047', 2), r)).join('') + C(116, 74, 12, '#6D4C41', 3) + face(112, 140, 0.7, 'none') + Lc('M104 150q8 8 16 0', INK, 3)),
  // a moai statue in warm grey stone, huge, smiling gently, with a flower garland of pink hibiscus at its base and the sea behind
  L('moai', 'โมอายยิ้มที่ซันเมสเซ่นิชินัน', 'A smiling moai at Sun Messe Nichinan', ['moai', 'โมอาย', 'sun messe', 'ซันเมสเซ่', 'stone statue', 'รูปปั้นหิน', 'easter island statue', 'รูปปั้นเกาะอีสเตอร์', 'nichinan', 'นิชินัน', 'seaside hill', 'เนินริมทะเล'], 'หาโมอายที่ยิ้ม', 'Find the moai with a smile',
    P('M-4 190c60-14 180-14 248 0v40H-4z', '#81C784', 3) + moai(120, 196, 2.5, '#B5AFA6') + Lc('M96 196h48', '#9E9E9E', 3)
    + [[84, 204], [104, 208], [136, 208], [156, 204]].map(([x, y]) => C(x, y, 7, '#F06292', 2.5) + C(x, y, 2.5, '#FFEB3B', 0)).join('')),
  // the turtle rock: a smiling turtle-shaped boulder in the sea with a round hollow on its shell, little clay lucky stones flying towards it and one landing in
  L('turtlerock', 'ก้อนหินเต่ากับก้อนหินนำโชคที่อูโดะ', 'The turtle rock and the lucky stones of Udo', ['turtle rock', 'หินเต่า', 'lucky stones', 'หินนำโชค', 'unsui', 'อุนซุย', 'udo', 'อูโดะ', 'throw stones', 'โยนก้อนหิน', 'shell hollow', 'รอยบุ๋มบนกระดอง', 'make a wish', 'อธิษฐาน'], 'หาก้อนหินที่ลอยเข้าไปในรอยบุ๋ม', 'Find the stone that lands in the hollow',
    wave(150, '#4FC3F7') + E(130, 150, 70, 38, '#A1887F') + P('M60 150a70 52 0 0 1 140 0z', '#8D7B70', 3.5) + E(122, 112, 18, 9, '#5D4F44', 3) + C(62, 142, 22, '#A1887F') + face(60, 140, 0.4)
    + P('M176 160l22 14-6 10-18-8z', '#8D7B70', 2.5) + [[40, 70], [62, 52], [86, 62], [108, 88]].map(([x, y], k) => C(x, y, 7 - k * 0.6, '#FFE082', 2.5)).join('') + Lc('M30 190h40M120 200h60', '#E1F5FE', 3.5)),
  // the devil's washboard: a ridged rock shelf of Aoshima wading out to the waves, a tiny orange crab smiling on the top ledge
  L('washboard', 'หินกระดานซักผ้าที่ชายหาดอาโอชิมะ', 'The ridged washboard rocks of Aoshima', ['devils washboard', 'หินกระดานซักผ้า', 'washboard rocks', 'หินลอนคลื่น', 'aoshima', 'อาโอชิมะ', 'wave cut rock', 'หินที่คลื่นกัดเซาะ', 'low tide', 'น้ำลง', 'crab', 'ปู', 'tide pool', 'แอ่งน้ำทะเล'], 'หาปูส้มที่ยิ้มบนหินลอน', 'Find the orange crab smiling on the ridges',
    P('M10 130c40-36 160-36 220 0l-10 70c-60 22-140 22-200 0z', '#A99A8C', 4) + [0, 1, 2, 3, 4, 5].map((k) => P(`M${24 + k * 4} ${200 - k * 12}c50 ${-8} 110 ${-8} ${170 - k * 8} 0`, 'none', 4)).join('')
    + P('M0 212q30-14 60 0t60 0 60 0 60 0v30H0z', '#4FC3F7', 3.5) + Lc('M30 224h30M130 228h40', '#E1F5FE', 3)
    + E(122, 112, 20, 14, '#FF7043') + P('M104 104l-12-12 6-4 10 12zM140 104l12-12-6-4-10 12z', '#FF7043', 3) + C(102, 94, 5, '#FF7043', 2.5) + C(142, 94, 5, '#FF7043', 2.5) + Lc('M106 124l-8 8M138 124l8 8', '#FF7043', 3) + face(122, 112, 0.4, 'none')),
  // Obi's fried fish cake ("obi-ten", a sweet golden oval) on a paper tray with a bamboo pick, and the strip of tickets for the eat-and-walk tour tucked beside it
  L('obiten', 'โอบิเท็นปลาทอดกับตั๋วเดินกินในเมืองโอบิ', 'Obi-ten fried fish cake and the eat-and-walk tickets', ['obi ten', 'โอบิเท็น', 'obi-ten', 'fried fish cake', 'เค้กปลาทอด', 'eat and walk', 'เดินกิน', 'tickets', 'ตั๋ว', 'obi', 'โอบิ', 'street snack', 'ขนมริมทาง', 'tempura', 'เทมปุระ'], 'หาเค้กปลาทอดที่ยิ้ม', 'Find the fried fish cake with a smile',
    P('M36 150h110l-10 50H46z', '#FFF8E1', 3.5) + Lc('M46 164h92M50 180h84', '#FFE0B2', 2.5) + E(92, 140, 54, 30, '#F9A825') + E(92, 134, 46, 22, '#FFCA28', 2.5) + Lc('M60 130q12-8 24 0M96 126q14-6 26 2', '#FFE082', 3) + face(92, 140, 0.55)
    + Lc('M130 100l38-38', '#D7B98E', 5) + C(170, 60, 5, '#D7B98E', 2.5) + [0, 1, 2].map((k) => g(170 + k * 6, 150 + k * 4, 1, R(0, 0, 44, 22, ['#FFD54F', '#F48FB1', '#80DEEA'][k], 3, 2.5) + Lc('M8 6h28M8 14h18', '#8D6E63', 2), -8 + k * 8)).join('')),
  // the Obi castle gate: a big tiled gate of dark wood and white plaster with a stone base, two tall cedars and a paper lantern, a carp-shaped flag
  L('obigate', 'ประตูปราสาทโอบิและต้นซุกิ', 'The gate of Obi Castle and its cedars', ['obi castle', 'ปราสาทโอบิ', 'otemon gate', 'ประตูโอเตมง', 'wooden gate', 'ประตูไม้', 'obi cedar', 'ซุกิโอบิ', 'castle gate', 'ประตูปราสาท', 'samurai town', 'เมืองซามูไร', 'stone base', 'ฐานหิน'], 'หาโคมกระดาษที่ยิ้ม', 'Find the paper lantern with a smile',
    P('M10 210V100l20-30V210z', '#2E7D32', 3) + P('M230 210V100l-20-30V210z', '#2E7D32', 3) + R(36, 170, 168, 40, '#B0A59A', 0, 3.5) + Lc('M36 190h168M80 170v40M130 170v40M170 170v40', '#8D8378', 2.5)
    + R(52, 110, 136, 60, '#FFFFFF', 0, 3.5) + R(52, 110, 12, 60, '#6D4C41', 0, 3) + R(176, 110, 12, 60, '#6D4C41', 0, 3) + R(98, 120, 44, 50, '#6D4C41', 0, 3) + Lc('M120 120v50', INK, 3)
    + P('M36 112q84-40 168 0l-14 -16H50z', '#455A64', 3.5) + P('M60 90q60-30 120 0l-10-14H70z', '#546E7A', 3.5) + Lc('M120 54v-14', INK, 3.5)
    + Lc('M120 124v10', INK, 3) + E(120, 144, 12, 15, '#E53935', 3) + face(120, 142, 0.28, 'none')),
  // the free-ranging horses of Cape Toi: a brown mare with a white blaze and her foal on a green clifftop, grazing, sea and sky behind (nobody riding)
  L('toihorses', 'ม้าป่าแหลมโทอิกับลูกม้า', 'The free-ranging horses of Cape Toi', ['cape toi', 'แหลมโทอิ', 'toimisaki', 'misaki horse', 'ม้ามิซากิ', 'wild horse', 'ม้าป่า', 'foal', 'ลูกม้า', 'grazing', 'กินหญ้า', 'cliff top', 'ยอดหน้าผา', 'nankyushu', 'คิวชูใต้'], 'หาลูกม้าตัวเล็ก', 'Find the little foal',
    P('M-4 170c60-20 180-20 248 0v70H-4z', '#81C784', 3.5) + wave(210, '#4FC3F7') + P('M40 140c-8-20 8-40 40-40h72c30 0 48 14 46 38v6H44z', '#8D5524', 3.5)
    + [58, 76, 150, 172].map((x) => R(x, 140, 9, 40, '#6D3F1B', 3, 3)).join('') + P('M44 112c-14-4-20-20-12-32l18-14c10 0 16 6 14 18l-6 24z', '#8D5524', 3.5) + P('M42 70c-2-14 8-20 14-14', '#3E2415', 3) + Lc('M60 80v26', '#3E2415', 6) + Lc('M216 128q16 16 6 40', '#3E2415', 7)
    + P('M30 90q6-12 14-10l-2 14z', '#FFFFFF', 2.5) + face(46, 90, 0.28, 'none') + E(126, 158, 38, 22, '#A06A3A') + P('M154 150c12-8 26 0 28 12', '#A06A3A', 3) + R(112, 168, 7, 26, '#6D3F1B', 3, 2.5) + R(134, 168, 7, 26, '#6D3F1B', 3, 2.5)),
  // a charcoal-grilled jidori chicken skewer pair on a little round hibachi with glowing coals and a flame, one chunk with a smile
  L('sumibiyaki', 'ไก่ย่างถ่านเนื้อแน่นแบบมิยาซากิ', 'Charcoal-grilled chicken, Miyazaki style', ['sumibiyaki', 'สึมิบิยากิ', 'charcoal grilled chicken', 'ไก่ย่างถ่าน', 'jidori', 'ไก่จิโดริ', 'hibachi', 'ฮิบาจิ', 'skewer', 'ไม้เสียบ', 'grilled', 'ย่าง', 'local chicken', 'ไก่พื้นเมือง'], 'หาไก่ชิ้นที่ยิ้ม', 'Find the chunk of chicken with a smile',
    P('M40 170h160l-14 44H54z', '#546E7A', 3.5) + E(120, 170, 80, 14, '#37474F') + [0, 1, 2, 3, 4].map((k) => C(70 + k * 25, 168, 9, '#FF7043', 2.5)).join('')
    + P('M104 160q-12-24 0-40 6 12 10 6 6-14 12 8 8-4 6 8 8 18-4 14-16 14z', '#FFCA28', 3) + P('M112 156q-6-12 0-22 6 8 14 0 6 10 0 22z', '#FF7043', 0)
    + Lc('M30 104l180-34', '#D7B98E', 4.5) + Lc('M30 124l180-34', '#D7B98E', 4.5) + [[62, 108], [100, 100], [138, 94], [176, 86]].map(([x, y]) => E(x, y, 15, 14, '#C08A52', 3)).join('') + E(100, 100, 17, 15, '#D9A066', 3) + face(100, 100, 0.34, 'none') + Lc('M94 106q6 6 12 0', INK, 2.5)),
  // hiyajiru, the cold sesame-miso soup over rice: a blue-and-white bowl, creamy brown soup with thin cucumber slices, tofu, sesame and ice, a smiley bowl
  L('hiyajiru', 'ฮิยะจิรุ ซุปมิโสะเย็นกับข้าวและแตงกวา', 'Hiyajiru, the cold miso soup over rice', ['hiyajiru', 'ฮิยะจิรุ', 'cold miso soup', 'ซุปมิโสะเย็น', 'cucumber', 'แตงกวา', 'sesame', 'งา', 'tofu', 'เต้าหู้', 'cold soup over rice', 'ซุปเย็นราดข้าว', 'summer dish', 'อาหารหน้าร้อน'], 'หาชามที่ยิ้ม', 'Find the bowl with a smile',
    P('M24 110h192c0 56-30 96-96 96S24 166 24 110z', '#FFFFFF', 4) + P('M44 168q76 22 152 0', 'none', 3) + Lc('M56 138q64 16 128 0', '#42A5F5', 4) + E(120, 110, 96, 24, '#BCA38A', 4)
    + E(120, 110, 84, 17, '#D7BF9F', 2.5) + [[78, 108], [102, 102], [132, 108], [154, 104]].map(([x, y]) => E(x, y, 11, 5, '#9CCC65', 2)).join('') + [[96, 114], [120, 108]].map(([x, y]) => R(x, y, 12, 9, '#FFF8E1', 2, 2)).join('')
    + [[110, 100], [140, 114], [88, 118]].map(([x, y]) => C(x, y, 1.6, '#6D4C41', 0)).join('') + P('M112 92l10-8 12 6-6 10z', '#E1F5FE', 2.5) + face(120, 160, 0.55)),
];

export default {
  places: {
    'jp-miyazaki': { country: 'jp', wave: 3, name: nm('มิยาซากิ', 'Miyazaki'), tz: 'Asia/Tokyo', ll: [31.91, 131.42],
      alias: ['miyazaki', 'มิยาซากิ', '宮崎', 'aoshima', 'อาโอชิมะ', '青島', 'udo shrine', 'udo jingu', 'ศาลเจ้าอูโดะ', '鵜戸神宮', 'nichinan', 'นิชินัน', '日南', 'sun messe nichinan', 'sun messe', 'ซันเมสเซ่', 'サンメッセ日南', 'obi castle', 'obi town', 'โอบิ', '飫肥',
        'manai falls', '高千穂峡', 'cape toi', 'toimisaki', 'แหลมโทอิ', '都井岬', 'miyazaki jingu', 'miyazaki shrine', 'nobeoka', 'โนเบโอกะ', 'hyuga', 'ฮิวงะ', 'phoenix seagaia', 'seagaia'],
      colors: MZ },
  },
  items,
};
