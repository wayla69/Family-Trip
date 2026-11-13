// Wave 14, group jpb 2: Kumamoto, Aso and Takachiho — the black castle on its curved stone walls, the great Aso caldera
// (Kusasenri's grass and pond, the steaming Nakadake crater, Komezuka's rice-heap hill), Takachiho gorge, Tsūjun Bridge.
// Skipped as repeats or bans: Kumamon and every mascot, horses and basashi, hot springs (Kurokawa), the ropeway, waterfalls
// (Manai falls), boats in the gorge, kagura masks (shrine dance), dekopon (Jeju's hallabong), the banpeiyu pomelo (Guilin),
// dolphins of Amakusa, the SL Hitoyoshi steam train, red cows, Mifune's dinosaurs, Kumamoto ramen (too many noodles).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const KM = { k1: '#37474F', k2: '#2E7D32', k3: '#F1F8E9' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `jp-kumamoto.landmark.${slug}`, cat: 'landmark', file: `jp/kumamoto/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
const puff = (x, y, s) => g(x, y, s, P('M-20 6c-10 0-14-12-4-16 0-12 16-16 22-8 6-10 22-8 22 4 10 0 12 14 2 18z', '#FFFFFF', 3));

const items = [
  { id: 'jp-kumamoto.stamp', cat: 'stamp', file: 'jp/kumamoto/stamp.v1.svg', name: nm('ตราประทับคุมาโมโตะและอะโซะ', 'Kumamoto and Aso stamp'), kw: ['kumamoto', 'คุมาโมโตะ', 'kumamoto castle', 'ปราสาทคุมาโมโตะ', 'aso', 'อะโซะ', 'black castle', 'ปราสาทสีดำ', 'kyushu', 'คิวชู'],
    // the black keep of Kumamoto Castle with white trim and golden roof fish, standing on its curved grey stone walls
    svg: cityStamp('jkm-st', { name: 'KUMAMOTO', sub: 'ASO', ...KM, emblem: P('M60 146c10-8 14-22 14-40h52c0 18 4 32 14 40z', '#BDBDBD') + Lc('M72 120h56M68 132h64', '#9E9E9E', 2.5)
      + R(74, 92, 52, 14, '#37474F') + P('M64 94c10-2 16-6 20-12h32c4 6 10 10 20 12z', '#607D8B') + R(84, 72, 32, 10, '#37474F') + P('M76 74c8-2 12-6 14-10h20c2 4 6 8 14 10z', '#607D8B')
      + R(92, 56, 16, 8, '#37474F', 0, 2.5) + P('M86 58l14-10 14 10z', '#607D8B') + C(92, 50, 3, '#FFCA28', 2) + C(108, 50, 3, '#FFCA28', 2) + Lc('M76 96h48M86 75h28', '#ECEFF1', 2) + face(100, 128, 0.3) }) },
  { id: 'jp-kumamoto.day.kusasenri', cat: 'day', file: 'jp/kumamoto/day-kusasenri.v1.svg', name: nm('ทุ่งหญ้าคุซะเซ็นริกับภูเขาไฟอะโซะ', 'The Kusasenri grassland under Mount Aso'), kw: ['kusasenri', 'คุซะเซ็นริ', 'mount aso', 'ภูเขาไฟอะโซะ', 'aso caldera', 'แอ่งภูเขาไฟอะโซะ', 'grassland', 'ทุ่งหญ้า', 'pond', 'บ่อน้ำ', 'eboshidake', 'เอะโบชิดาเกะ', 'kumamoto', 'คุมาโมโตะ'],
    // a wide green grass bowl with a round blue pond in the middle, the rounded green Eboshidake on the right and the flat brown Nakadake crater puffing white steam behind
    svg: scene('jkm-d1', '#B3E5FC', P('M20 120c20-30 40-46 64-46h40c24 0 40 18 56 46z', '#A1887F') + P('M84 74c6-6 34-6 40 0', 'none') + puff(104, 54, 1.1) + puff(128, 34, 0.8)
      + P('M130 122c16-44 36-62 56-62s40 18 58 62z', '#7CB342') + P('M-4 120c80-14 170-14 248 0v130H-4z', '#9CCC65') + P('M-4 150c60-10 120-6 180 4s50 0 68-4v100H-4z', '#AED581', 0)
      + E(118, 168, 56, 18, '#4FC3F7') + Lc('M90 166c10-4 18 4 28 0M128 172c10-4 18 4 28 0', '#E1F5FE', 3) + Lc('M30 210c20-18 50-28 80-30M150 214c20-12 40-16 70-16', '#C5E1A5', 5)
      + [[40, 140], [200, 146], [20, 190], [214, 190]].map(([x, y]) => Lc(`M${x} ${y}l-4-10M${x + 6} ${y}l0-12M${x + 12} ${y}l4-10`, '#689F38', 3)).join('') + face(118, 164, 0.36)) },
  { id: 'jp-kumamoto.day.takachiho', cat: 'day', file: 'jp/kumamoto/day-takachiho.v1.svg', name: nm('หุบเขาทาคาชิโฮกับผาเสาหินบะซอลต์', 'Takachiho Gorge and its basalt cliffs'), kw: ['takachiho gorge', 'หุบเขาทาคาชิโฮ', 'takachiho', 'ทาคาชิโฮ', 'basalt cliffs', 'หน้าผาหินบะซอลต์', 'emerald river', 'แม่น้ำสีเขียวมรกต', 'stone arch bridge', 'สะพานหินโค้ง', 'gorge walk', 'ทางเดินเลียบหุบเขา'],
    // two steep cliffs of grey-brown rock columns covered in green moss and maple trees, a narrow emerald river far below and a high stone arch bridge across the top
    svg: scene('jkm-d2', '#E8F5E9', P('M84 30h72l-4 230H88z', '#4E7D5A', 0) + P('M-4 30h100c-8 40 6 80-4 120s8 60 2 110H-4z', '#8D7B6B') + P('M244 30H144c8 40-6 80 4 120s-8 60-2 110h98z', '#7D6B5C')
      + Lc('M20 70v170M44 80v160M68 90v150M172 90v150M196 80v160M220 70v170', '#6D5D4E', 3) + P('M90 200c10-4 50-4 60 0l8 56H82z', '#26A69A') + Lc('M100 216c8-3 14 3 22 0M118 236c8-3 14 3 22 0', '#B2DFDB', 3)
      + P('M-4 50c30-14 70-18 100-10v-24H-4zM244 50c-30-14-70-18-100-10v-24h100z', '#689F38', 0) + [[14, 36, '#E53935'], [52, 30, '#FF7043'], [188, 32, '#E53935'], [226, 38, '#FFA726']].map(([x, y, c]) => C(x, y, 14, c, 3)).join('')
      + P('M30 62h180v12l-34 54a56 46 0 0 0-112 0L30 74z', '#BCAAA4') + Lc('M30 70h180M64 62v8M96 62v8M144 62v8M176 62v8', '#A1887F', 2.5) + face(120, 92, 0.3) + face(120, 228, 0.26, 'none')) },

  L('castle', 'ปราสาทคุมาโมโตะ ปราสาทสีดำบนกำแพงหินโค้ง', 'Kumamoto Castle, the black castle on curved stone walls', ['kumamoto castle', 'ปราสาทคุมาโมโตะ', 'black castle', 'ปราสาทสีดำ', 'musha-gaeshi', 'มุชะกาเอชิ', 'curved stone walls', 'กำแพงหินโค้ง', 'castle keep', 'หอปราสาท', 'golden roof fish', 'ปลาทองบนหลังคา'], 'หาปลาทองสองตัวบนหลังคาสูงสุด', 'Find the two golden fish on the very top roof',
    // a tall keep with black walls, white trim and grey roofs in three tiers, golden fish on top, standing on a grey stone base whose walls curve out at the bottom like a fan
    bg('#E3F2FD') + low(196, '#A5D6A7') + frame + P('M40 204c18-14 26-42 28-76h104c2 34 10 62 28 76z', '#BDBDBD') + Lc('M66 146h108M60 166h120M52 186h136M90 128v18M130 128v18M80 146v20M120 146v20M160 146v20', '#9E9E9E', 3)
      + R(66, 104, 108, 26, '#37474F') + Lc('M66 108h108', '#ECEFF1', 3) + [78, 98, 132, 152].map((x) => R(x, 114, 10, 10, '#ECEFF1', 0, 2.5)).join('')
      + P('M50 106c14-2 24-8 30-16h80c6 8 16 14 30 16z', '#607D8B') + R(80, 72, 80, 20, '#37474F') + Lc('M80 76h80', '#ECEFF1', 3)
      + P('M64 74c12-2 20-6 24-14h64c4 8 12 12 24 14z', '#607D8B') + R(96, 46, 48, 16, '#37474F') + P('M86 48c10-2 16-8 20-16h28c4 8 10 14 20 16z', '#607D8B')
      + P('M98 32c-6-2-8-8-6-12 4 2 8 6 8 10zM142 32c6-2 8-8 6-12-4 2-8 6-8 10z', '#FFCA28', 2.5) + face(120, 168, 0.44)),
  L('nakadake', 'ปล่องภูเขาไฟนากาดาเกะ', 'The steaming Nakadake crater of Mount Aso', ['nakadake crater', 'ปล่องภูเขาไฟนากาดาเกะ', 'mount aso', 'ภูเขาไฟอะโซะ', 'active volcano', 'ภูเขาไฟมีพลัง', 'crater lake', 'ทะเลสาบในปล่องภูเขาไฟ', 'volcano steam', 'ไอน้ำจากภูเขาไฟ', 'shelter', 'หลุมหลบภัย'], 'หาหลุมหลบภัยรูปโดมบนขอบปล่อง', 'Find the little dome shelter on the crater rim',
    // a deep grey crater with layered rocky walls, a milky turquoise lake at the bottom, big white steam clouds rolling up, and a little concrete dome shelter on the rim
    bg('#B3E5FC') + P('M16 120c40-8 70-10 104-10s70 2 104 10v104H16z', '#A1887F', 0) + frame + P('M30 132c20 50 50 76 90 76s70-26 90-76c-30 10-60 14-90 14s-60-4-90-14z', '#8D6E63')
      + Lc('M44 150c24 14 50 20 76 20s52-6 76-20M60 176c18 10 40 14 60 14s42-4 60-14', '#6D4C41', 3) + E(120, 186, 44, 14, '#80DEEA') + Lc('M100 184c8-3 14 3 22 0', '#E0F7FA', 3)
      + puff(118, 150, 1.3) + puff(96, 112, 1.5) + puff(140, 80, 1.7) + puff(108, 52, 1.2)
      + P('M168 122c0-14 10-22 20-22s20 8 20 22z', '#ECEFF1') + R(180, 112, 16, 10, '#455A64', 3) + face(118, 186, 0.3)),
  L('komezuka', 'เนินโคเมะซึกะ ภูเขากองข้าว', 'Komezuka, the rice-heap hill', ['komezuka', 'โคเมะซึกะ', 'rice heap hill', 'ภูเขากองข้าว', 'grassy cone', 'เนินหญ้ารูปกรวย', 'small volcano', 'ภูเขาไฟเล็ก', 'aso grassland', 'ทุ่งหญ้าอะโซะ', 'dent on top', 'ยอดบุ๋ม'], 'หารอยบุ๋มบนยอดเนินที่เหมือนมีคนตักข้าวไป', 'Find the dent on top where someone scooped some rice',
    // a perfectly round soft green cone of a hill with a little scooped dent on its top, striped grass slopes, fluffy clouds and low green grassland around it
    bg('#E1F5FE') + puff(60, 56, 1) + puff(184, 46, 0.9) + low(170, '#C5E1A5') + frame + P('M34 186c34-8 52-92 86-92s52 84 86 92z', '#8BC34A')
      + P('M104 100c6 10 26 10 32 0-4-4-10-6-16-6s-12 2-16 6z', '#689F38') + Lc('M72 160c16-30 30-46 40-56M98 176c6-30 12-52 16-70M168 160c-16-30-30-46-40-56M142 176c-6-30-12-52-16-70', '#9CCC65', 4) + face(120, 150, 0.46)),
  L('suizenji', 'ฟูจิจำลองในสวนซุยเซ็นจิ', 'The little Mount Fuji of Suizenji Garden', ['suizenji garden', 'สวนซุยเซ็นจิ', 'suizenji jojuen', 'ซุยเซ็นจิโจจุเอ็น', 'little mount fuji', 'ภูเขาฟูจิจำลอง', 'japanese garden', 'สวนญี่ปุ่น', 'spring-fed pond', 'สระน้ำพุใส', 'pine trees', 'ต้นสน'], 'หาต้นสนเตี้ยๆ ข้างภูเขาฟูจิจำลอง', 'Find the low pine tree beside the little Fuji',
    // a neat grassy mound shaped like a tiny Mount Fuji, clipped smooth, beside a clear pond with stepping stones, round clipped bushes and two low spreading pine trees
    bg('#FFFDE7') + low(150, '#4FC3F7') + frame + P('M50 154c24-6 50-60 70-60s46 54 70 60z', '#9CCC65') + P('M104 104c4-6 10-10 16-10s12 4 16 10c-10 4-22 4-32 0z', '#C5E1A5', 3)
      + [[34, 150], [206, 150]].map(([x, y]) => E(x, y, 20, 12, '#558B2F')).join('') + R(170, 120, 6, 22, '#6D4C41', 0, 3) + P('M150 122c10-12 40-12 50 0-16 6-34 6-50 0z', '#33691E') + P('M158 108c8-10 28-10 36 0-12 5-24 5-36 0z', '#33691E')
      + Lc('M60 184c10-4 20 4 30 0M140 196c10-4 20 4 30 0', '#E1F5FE', 4) + [[70, 168], [96, 176], [124, 170], [150, 178]].map(([x, y]) => E(x, y, 12, 6, '#ECEFF1', 3)).join('') + face(120, 130, 0.42)),
  L('karashirenkon', 'คาราชิเร็งคอน รากบัวยัดมัสตาร์ด', 'Karashi renkon, lotus root filled with mustard', ['karashi renkon', 'คาราชิเร็งคอน', 'mustard lotus root', 'รากบัวยัดมัสตาร์ด', 'lotus root', 'รากบัว', 'yellow batter', 'แป้งทอดสีเหลือง', 'spicy mustard', 'มัสตาร์ดเผ็ด'], 'หารูในรากบัวที่มีมัสตาร์ดสีเหลือง', 'Find the holes filled with yellow mustard',
    // a fried lotus root log in golden batter and three thick round slices in front, every hole of the root filled with bright yellow mustard
    E(120, 200, 92, 12, '#ECEFF1', 0) + P('M60 78h120a18 34 0 0 1 0 68H60z', '#F4C542') + E(60, 112, 18, 34, '#F9E3A3') + [[60, 96], [52, 110], [68, 110], [60, 126]].map(([x, y]) => E(x, y, 4, 6, '#FFD600', 2)).join('')
      + [[60, 168], [120, 176], [180, 166]].map(([x, y], k) => C(x, y, 30, '#F4C542') + C(x, y, 24, '#FFF3D6', 0) + [0, 60, 120, 180, 240, 300].map((a) => C(x + 15 * Math.cos(a * Math.PI / 180), y + 15 * Math.sin(a * Math.PI / 180), 5.5, '#FFD600', 2)).join('') + (k === 1 ? '' : C(x, y, 5, '#FFD600', 2))).join('')
      + face(120, 176, 0.32)),
  L('ikinaridango', 'อิคินาริดังโงะ ขนมนึ่งมันหวานกับถั่วแดง', 'Ikinari dango, steamed buns of sweet potato and red bean', ['ikinari dango', 'อิคินาริดังโงะ', 'sweet potato bun', 'ขนมนึ่งมันหวาน', 'red bean paste', 'ถั่วแดงกวน', 'steamed snack', 'ขนมนึ่ง', 'kumamoto snack', 'ของว่างคุมาโมโตะ'], 'หาแผ่นมันหวานสีส้มในขนมที่ผ่าครึ่ง', 'Find the orange slice of sweet potato in the cut bun',
    // two flat round steamed buns of soft white dough on a bamboo leaf, one cut open showing a thick round slice of orange sweet potato on a layer of dark red bean paste
    P('M30 196c30-26 150-26 180 0-40 14-140 14-180 0z', '#9CCC65') + Lc('M40 194c40-12 120-12 160 0', '#C5E1A5', 3) + P('M44 168c0-30 26-44 50-44s50 14 50 44c0 14-100 14-100 0z', '#FFF8E1') + face(94, 152, 0.4)
      + P('M128 182c0-26 20-40 42-40s42 14 42 40z', '#FFF8E1') + P('M136 182c0-18 14-30 34-30s34 12 34 30z', '#FFB74D') + P('M140 182c0-10 12-18 30-18s30 8 30 18z', '#6D3B3B', 3) + Lc('M150 162c10-4 20-4 30 0', '#FFE0B2', 3)),
  L('tsujun', 'สะพานสึจุนพ่นน้ำ', 'Tsūjun Bridge spouting water from its sides', ['tsujun bridge', 'สะพานสึจุน', 'stone aqueduct bridge', 'สะพานส่งน้ำหิน', 'water spout', 'น้ำพุ่งจากสะพาน', 'stone arch', 'สะพานหินโค้ง', 'yamato town', 'เมืองยามาโตะ', 'rice field water', 'น้ำเข้านา'], 'หาน้ำที่พุ่งออกมาจากกลางสะพาน', 'Find the water shooting out of the middle of the bridge',
    // a big single stone arch bridge over a green valley, two great white-blue arcs of water spraying out of both sides of its middle and falling into the trees below
    bg('#E1F5FE') + low(150, '#81C784') + frame + P('M16 200c30-8 60-10 104-10s74 2 104 10v24H16z', '#4DB6AC', 0)
      + P('M24 96h192v100h-20a76 56 0 0 0-152 0H24z', '#BCAAA4') + Lc('M24 112h192M24 128h70M146 128h70M60 96v16M100 96v16M140 96v16M180 96v16M40 112v16M80 112v16M160 112v16M200 112v16', '#A1887F', 3) + R(20, 88, 200, 10, '#A5D6A7', 0, 3)
      + C(108, 126, 4, '#5D4037', 0) + C(132, 126, 4, '#5D4037', 0) + ol('M106 126c-34-6-62 14-76 70M134 126c34-6 62 14 76 70', '#B3E5FC', 9) + ol('M106 126c-24 0-44 20-50 66M134 126c24 0 44 20 50 66', '#E1F5FE', 4)
      + [[28, 206], [44, 212], [196, 212], [212, 206], [120, 210]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 2)).join('') + face(120, 108, 0.3)),
  L('asoromon', 'ประตูหอสองชั้นของศาลเจ้าอะโซะ', 'The two-storey tower gate of Aso Shrine', ['aso shrine', 'ศาลเจ้าอะโซะ', 'romon', 'โรมง', 'tower gate', 'ประตูหอ', 'wooden gate', 'ประตูไม้', 'curved gable', 'หน้าจั่วโค้ง', 'karahafu', 'คาราฮาฟุ'], 'หาหน้าจั่วโค้งเป็นคลื่นเหนือทางเข้า', 'Find the wavy curved gable over the way in',
    // a big unpainted wooden gate of two storeys with heavy dark grey roofs, the lower roof crowned at the front by a wavy curved gable, a white wall either side
    bg('#FFF8E1') + low(196, '#D7CCC8') + frame + R(24, 150, 50, 46, '#FAFAFA') + R(166, 150, 50, 46, '#FAFAFA') + P('M20 152h58l-6-8H26zM162 152h58l-6-8h-46z', '#546E7A', 3)
      + R(78, 136, 84, 60, '#D7B48A') + R(102, 150, 36, 46, '#8D6E63') + Lc('M90 136v60M150 136v60', '#A1887F', 4)
      + P('M50 140c20-4 34-14 40-24h60c6 10 20 20 40 24z', '#546E7A') + P('M96 118c4-10 14-16 24-16s20 6 24 16c-6 4-16 2-24-6-8 8-18 10-24 6z', '#455A64') + R(88, 84, 64, 22, '#D7B48A') + Lc('M88 94h64', '#A1887F', 3)
      + P('M56 88c20-4 34-14 40-28h48c6 14 20 24 40 28z', '#546E7A') + Lc('M96 60h48', '#37474F', 5) + face(120, 172, 0.34)),
  L('nagashisomen', 'นางาชิโซเม็ง เส้นหมี่ไหลในรางไม้ไผ่', 'Nagashi sōmen, noodles sliding down a bamboo chute', ['nagashi somen', 'นางาชิโซเม็ง', 'flowing noodles', 'เส้นไหล', 'bamboo chute', 'รางไม้ไผ่', 'catch with chopsticks', 'คีบด้วยตะเกียบ', 'cold noodles', 'เส้นเย็น', 'summer', 'หน้าร้อน'], 'หาตะเกียบที่กำลังคีบเส้นจากรางไผ่', 'Find the chopsticks catching noodles from the bamboo',
    // a long split bamboo pipe sloping down with water and white noodles sliding along it, chopsticks picking some up, a little bowl of dipping sauce below
    R(176, 60, 8, 60, '#8D6E63', 0, 3) + R(58, 132, 8, 70, '#8D6E63', 0, 3) + P('M30 152l176-104 10 16-176 104z', '#A5D6A7') + P('M36 158l174-102 4 6-174 102z', '#4FC3F7', 0)
      + Lc('M60 140l40-24M110 112l30-18M150 90l34-20', '#FFFFFF', 4) + Lc('M70 144l40-24M124 112l30-18', '#FFFFFF', 3) + Lc('M34 162l178-104', '#81C784', 3)
      + ol('M124 160l-14-58M138 158l-8-56', '#D7B48A', 3) + Lc('M112 108c4 10 10 14 18 14', '#FFFFFF', 3)
      + P('M140 186h64c0 18-14 28-32 28s-32-10-32-28z', '#1E88E5') + E(172, 186, 32, 7, '#8D6E63') + face(172, 200, 0.34)),
  L('igusa', 'ต้นกกอิกุสะกับเสื่อทาทามิ', 'Igusa rush and a new tatami mat', ['igusa', 'อิกุสะ', 'tatami', 'ทาทามิ', 'rush grass', 'ต้นกก', 'tatami mat', 'เสื่อทาทามิ', 'yatsushiro', 'ยัตสึชิโระ', 'woven mat', 'เสื่อทอ'], 'หาขอบผ้าสีดำของเสื่อทาทามิ', 'Find the black cloth edge of the tatami mat',
    // a new pale green tatami mat lying at a slant with fine woven lines and black cloth borders, a tied bundle of tall green rush stalks standing behind it
    Lc('M150 30l-4 120M160 28l-2 122M170 32v118M180 28l2 122M190 34l4 116M140 36l-6 114', '#7CB342', 5) + R(132, 110, 70, 12, '#C8A165', 3)
      + P('M24 166l110-60 92 54-110 60z', '#C5E1A5') + P('M24 166l110-60 8 5-110 60zM116 220l110-60-8-5-110 60z', '#263238', 3)
      + Lc('M44 162l100-56M56 168l100-56M68 174l100-56M80 180l100-56M92 186l100-56M104 192l100-56', '#AED581', 2) + P('M24 166v8l92 54v-8z', '#9CCC65') + P('M116 228l110-60v-8l-110 60z', '#8BC34A') + face(124, 164, 0.4)),
  L('taipien', 'ไทเพียน ซุปวุ้นเส้นของคุมาโมโตะ', 'Taipien, Kumamoto’s glass noodle soup', ['taipien', 'ไทเพียน', 'glass noodle soup', 'ซุปวุ้นเส้น', 'fried egg', 'ไข่ต้มทอด', 'clear broth', 'น้ำซุปใส', 'kumamoto chinatown dish', 'อาหารจีนแบบคุมาโมโตะ', 'seafood and vegetables', 'อาหารทะเลกับผัก'], 'หาไข่ทอดสีน้ำตาลครึ่งฟองในชาม', 'Find the half fried egg in the bowl',
    // a red-rimmed bowl of clear golden soup, chopsticks lifting a tangle of shiny see-through glass noodles, half a deep-fried brown egg and greens on the side
    P('M30 124h180c0 46-40 78-90 78s-90-32-90-78z', '#FFFFFF') + Lc('M34 134h172', '#E53935', 5) + E(120, 124, 90, 18, '#FFE082') + E(150, 120, 26, 12, '#FFFFFF', 0) + Lc('M140 118c6-6 12 6 18 0s12 6 18 0', '#FFFDE7', 3)
      + E(76, 120, 22, 14, '#A1683A') + E(76, 118, 13, 8, '#FFFFFF', 0) + C(76, 118, 6, '#FFC107', 0) + P('M106 118c6-6 16-8 24-2-8 6-18 6-24 2z', '#7CB342', 2.5) + C(178, 126, 6, '#FFFFFF', 2.5)
      + Lc('M118 120c-4-20 4-40-4-64M128 120c4-22-4-42 6-64M124 120c-2-24 6-42 2-66M134 118c6-18 0-36 8-58', '#E0F2F1', 3) + Lc('M110 60c10-4 30-6 38 0', '#B2DFDB', 3)
      + ol('M104 56l70-30M108 64l72-28', '#D7B48A', 3) + face(120, 166, 0.46)),
  L('sensuikyo', 'ดอกอะซาเลียบานเต็มเขาที่เซ็นซุยเกียว', 'Azaleas covering the slopes of Sensuikyo', ['sensuikyo', 'เซ็นซุยเกียว', 'azaleas', 'ดอกอะซาเลีย', 'miyama kirishima', 'มิยามะคิริชิมะ', 'pink mountain', 'ภูเขาสีชมพู', 'aso spring flowers', 'ดอกไม้ฤดูใบไม้ผลิอะโซะ', 'mountain walk', 'เดินเขา'], 'หาพุ่มดอกไม้ที่ยิ้มอยู่บนทางลาด', 'Find the smiling flower bush on the slope',
    // a rocky volcanic peak in the back, its whole slope covered in round bushes of pink and purple azalea flowers, a little winding path through them
    bg('#E1F5FE') + P('M30 120c24-40 50-70 80-70s60 36 100 70z', '#A1887F', 0) + low(110, '#9CCC65') + frame + Lc('M60 224c20-30 60-40 70-70s40-30 60-40', '#E8DCC0', 10)
      + [[40, 128], [80, 120], [130, 126], [176, 118], [210, 130], [30, 168], [70, 160], [160, 158], [200, 172], [44, 204], [100, 198], [176, 204]].map(([x, y], k) => C(x, y, 18, k % 3 ? '#F06292' : '#BA68C8', 3) + C(x - 6, y - 6, 3, '#FCE4EC', 0) + C(x + 6, y - 2, 3, '#FCE4EC', 0) + C(x - 2, y + 7, 3, '#FCE4EC', 0)).join('')
      + C(120, 172, 22, '#EC407A', 3) + face(120, 172, 0.34)),
  L('guruguru', 'ฮิโตโมจิกุรุกุรุ ต้นหอมพันเป็นเกลียว', 'Hitomoji guruguru, spring onions wound into a spiral', ['hitomoji guruguru', 'ฮิโตโมจิกุรุกุรุ', 'spring onion spiral', 'ต้นหอมพันเกลียว', 'miso dip', 'จิ้มมิโสะ', 'kumamoto home food', 'อาหารบ้านคุมาโมโตะ', 'green onion', 'ต้นหอม'], 'หาต้นหอมที่พันเป็นเกลียวยิ้มอยู่', 'Find the smiling spiral of spring onion',
    // a plate with three short bundles of boiled spring onion, each white stem with its green leaves wound round it in a tight spiral, a little dish of yellow miso dip
    E(120, 172, 100, 34, '#FFFFFF') + E(120, 170, 86, 26, '#FAFAFA', 3) + E(186, 152, 20, 10, '#FFFFFF', 3) + E(186, 150, 13, 5, '#E6B85C', 0)
      + [[70, 158], [110, 166], [150, 158]].map(([x, y]) => R(x - 9, y - 56, 18, 56, '#F1F8E9', 8) + Lc(`M${x - 9} ${y - 50}l18 8M${x - 9} ${y - 38}l18 8M${x - 9} ${y - 26}l18 8M${x - 9} ${y - 14}l18 8`, '#66BB6A', 6) + P(`M${x - 3} ${y - 56}c-4-10 0-16 6-18 0 8-2 12-6 18z`, '#43A047', 2.5)).join('')
      + face(110, 132, 0.28)),
  L('takachihorail', 'รถรางเปิดประทุนบนสะพานรถไฟสูงทาคาชิโฮ', 'The open-air railway cart over the high Takachiho bridge', ['takachiho amaterasu railway', 'รถไฟอามาเทราสึทาคาชิโฮ', 'super cart', 'รถรางเปิดประทุน', 'high railway bridge', 'สะพานรถไฟสูง', 'old railway line', 'ทางรถไฟเก่า', 'gorge view', 'วิวหุบเขา'], 'หารถรางคันเล็กบนสะพานสูง', 'Find the little open cart on the high bridge',
    // a tall grey concrete arch bridge over a deep green valley, a little bright yellow open cart with a red roof and smiling passengers rolling across the top
    bg('#E1F5FE') + P('M16 150c20-10 34-34 40-80l-40-10zM224 150c-20-10-34-34-40-80l40-10z', '#689F38', 0) + low(186, '#81C784') + frame + P('M16 212c40-6 70-6 104-6s64 0 104 6v12H16z', '#4DB6AC', 0)
      + Lc('M60 112v60M80 112v30M100 112v14M140 112v14M160 112v30M180 112v60', '#B0BEC5', 5) + ol('M36 218C48 150 82 122 120 120s72 30 84 98', '#CFD8DC', 10) + R(20, 100, 200, 12, '#CFD8DC', 0, 4) + Lc('M20 98h200', '#78909C', 4)
      + R(92, 76, 56, 20, '#FFD54F', 4) + R(88, 60, 64, 6, '#E53935', 3) + Lc('M94 66v10M146 66v10', INK, 3) + C(104, 98, 5, INK, 0) + C(136, 98, 5, INK, 0)
      + [[108, 74], [124, 74]].map(([x, y]) => C(x, y, 6, '#FFE0B2', 2.5)).join('') + face(120, 86, 0.24) + puff(184, 44, 0.8)),
  L('amakusabridge', 'สะพานเท็มมงสะพานแรกของห้าสะพานอามากุสะ', 'Tenmon Bridge, the first of the Five Bridges of Amakusa', ['amakusa five bridges', 'ห้าสะพานอามากุสะ', 'tenmon bridge', 'สะพานเท็มมง', 'amakusa', 'อามากุสะ', 'island bridges', 'สะพานข้ามเกาะ', 'blue steel bridge', 'สะพานเหล็กสีฟ้า', 'sunset sea', 'ทะเลยามเย็น'], 'หาโครงเหล็กสีฟ้าเป็นรูปสามเหลี่ยม', 'Find the blue steel triangles of the bridge',
    // a pale blue steel bridge with a lattice of triangles on top hopping between two green islands over the sea, an orange sunset and more little islands far away
    bg('#FFE0B2') + C(180, 70, 22, '#FFB74D', 0) + low(140, '#4FC3F7') + frame + E(60, 106, 22, 6, '#81C784', 0) + E(196, 110, 16, 5, '#81C784', 0)
      + P('M16 150c10-20 30-30 50-28 10 0 16 10 18 28zM224 150c-10-20-30-30-50-28-10 0-16 10-18 28z', '#66BB6A') + R(36, 140, 168, 8, '#90CAF9', 0, 4)
      + P('M76 140c10-30 30-42 44-42s34 12 44 42', 'none') + Lc('M76 140c10-30 30-42 44-42s34 12 44 42', '#64B5F6', 6) + Lc('M84 124l12 16 10-30 14 30 14-30 10 30 12-16M92 112l10 0M138 112h10', '#64B5F6', 4)
      + Lc('M90 148v30M150 148v30', '#90CAF9', 6) + Lc('M30 196c10-5 20 5 30 0M170 200c10-5 20 5 30 0M100 214c10-5 20 5 30 0', '#E1F5FE', 4) + face(120, 118, 0.3) + face(180, 72, 0.3, 'none')),
  L('higoshobu', 'ดอกไอริสฮิโงะหน้าแบน', 'Higo irises with their wide flat flowers', ['higo iris', 'ไอริสฮิโงะ', 'higo shobu', 'ฮิโงะโชบุ', 'japanese iris', 'ไอริสญี่ปุ่น', 'purple flowers', 'ดอกไม้สีม่วง', 'early summer garden', 'สวนต้นหน้าร้อน', 'kumamoto flower', 'ดอกไม้คุมาโมโตะ'], 'หาดอกไอริสสีขาวท่ามกลางดอกสีม่วง', 'Find the white iris among the purple ones',
    // three big flat iris flowers on tall stalks, two deep purple and one white, each with three wide drooping petals and yellow marks, long sword-like leaves around them
    Lc('M70 210V128M120 210V100M172 210V132', '#558B2F', 5) + P('M40 214c4-40 10-70 22-100 0 40 0 70-10 100zM196 214c-4-40-10-70-22-96 0 40 0 70 10 96zM100 214c-6-30-6-60 0-90 4 30 6 60 4 90zM140 214c6-30 6-56 0-84-4 28-6 56-4 84z', '#7CB342')
      + [[70, 120, '#7E57C2', '#B39DDB'], [172, 124, '#5E35B1', '#9575CD'], [120, 90, '#FFFFFF', '#EDE7F6']].map(([x, y, c, c2]) => g(x, y, 1, P('M0 0c-18-4-34 6-36 20 14 2 28-4 36-20z', c) + P('M0 0c18-4 34 6 36 20-14 2-28-4-36-20z', c) + P('M0 0c-6 16-4 32 0 40 4-8 6-24 0-40z', c) + P('M0 0c-8-10-6-22 0-26 6 4 8 16 0 26z', c2, 3) + Lc('M-14 8l-8 4M14 8l8 4', '#FFD54F', 4))).join('')
      + face(120, 102, 0.3)),
  L('nekodake', 'เนโกะดาเกะ ยอดเขาหยักรูปหูแมว', 'Nekodake, the jagged cat-ear peak of Aso', ['nekodake', 'เนโกะดาเกะ', 'cat mountain', 'ภูเขาแมว', 'jagged peak', 'ยอดเขาหยัก', 'aso five peaks', 'ห้ายอดเขาอะโซะ', 'rocky ridge', 'สันเขาหิน', 'mount aso', 'ภูเขาไฟอะโซะ'], 'หายอดเขาสองยอดที่ดูเหมือนหูแมว', 'Find the two peaks that look like cat ears',
    // a jagged grey-brown rocky mountain whose two tallest spikes stand up like a cat's ears, a smiling face on the rock, green forest slopes and the grassy caldera floor below
    bg('#E8EAF6') + low(176, '#AED581') + frame + P('M24 186c14-30 24-60 36-80l10 14 10-52 18 34 14-8 18 6 14-34 12 48 10-12 12 34 24 50z', '#8D7B6B')
      + P('M64 116l10 12 10-48 14 30M140 74l12 44 10-8', 'none') + P('M80 74l8 22-14-4zM154 66l-4 24 14-6z', '#F8BBD0', 0) + P('M24 186c30-24 60-32 96-32s66 8 96 32z', '#558B2F') + [[44, 176], [74, 166], [170, 166], [200, 178]].map(([x, y]) => C(x, y, 10, '#33691E', 3)).join('')
      + Lc('M108 128l-16-2M108 134l-16 4M132 128l16-2M132 134l16 4', '#5D4E40', 2.5) + face(120, 122, 0.4, 'w')),
];

export default {
  places: {
    'jp-kumamoto': { country: 'jp', wave: 3, name: nm('คุมาโมโตะและอะโซะ', 'Kumamoto and Aso'), tz: 'Asia/Tokyo', ll: [32.80, 130.71], alias: ['kumamoto', 'คุมาโมโตะ', '熊本', 'KMJ', 'aso', 'อะโซะ', 'อาโซะ', 'mount aso', 'takachiho', 'ทาคาชิโฮ', 'amakusa', 'อามากุสะ', 'kurokawa onsen', 'คุโรกาวะ', 'yatsushiro', 'ยัตสึชิโระ'], colors: KM },
  },
  items,
};
