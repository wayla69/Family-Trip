// Wave 16: Hangzhou — West Lake and its causeways, the Leifeng Pagoda, the Broken Bridge in snow, Three Pools Mirroring the Moon,
// the Longjing tea hills, the Xixi wetland, Feilai Feng above Lingyin as a landscape only, the Grand Canal's Gongchen Bridge,
// the "big lotus" stadium, Dongpo pork, beggar's chicken, Longjing shrimp, lotus-root starch, the black paper fan.
// Skipped as repeats or bans: the Qiantang tidal bore (Mont-Saint-Michel has a bore), the koi of Flower Harbour (Japan's koi),
// the Quyuan lotus pond (Taiwan's lotus pond), Hefang Street's sugar painting (Chengdu), the silk umbrella (Taiwan's paper umbrella),
// silkworms (Siem Reap's silk farm), the statues and carvings of Lingyin and Feilai Feng (religious images), Songcheng (theme park).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const HZ = { k1: '#00796B', k2: '#C2185B', k3: '#E0F2F1' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `cn-hangzhou.landmark.${slug}`, cat: 'landmark', file: `cn/hangzhou/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// ripples on water
const rip = (pts, c = '#E0F7FA') => Lc(pts.map(([x, y]) => `M${x} ${y}c6-4 12 4 18 0s12 4 18 0`).join(''), c, 3);
// a Jiangnan house: white wall, dark grey roof
const jn = (x, y, s = 1) => g(x, y, s, R(-9, -6, 18, 12, '#FFFFFF', 0, 2.5) + P('M-12-6l3-6h18l3 6z', '#455A64', 2.5) + R(-2, -1, 4, 7, '#6D4C41', 0, 1.5));
// a willow: a trunk and drooping green strands
const willow = (x, y, s = 1) => g(x, y, s, Lc('M0 0c2-16-2-30 4-46', '#6D4C41', 6) + P('M-18-38c4-18 40-22 44 0z', '#9CCC65', 2.5)
  + Lc('M-14-36c-2 12-2 24 0 34M-4-40c0 14 0 28 2 40M8-40c2 14 4 26 4 38M20-36c2 10 4 20 2 30', '#7CB342', 2.5));

const items = [
  { id: 'cn-hangzhou.stamp', cat: 'stamp', file: 'cn/hangzhou/stamp.v1.svg', name: nm('ตราประทับหางโจว', 'Hangzhou stamp'), kw: ['hangzhou', 'หางโจว', 'west lake', 'ทะเลสาบซีหู', 'three pools mirroring the moon', 'สามสระสะท้อนจันทร์', 'stone lanterns', 'เจดีย์หินกลางน้ำ', 'zhejiang', 'เจ้อเจียง'],
    // the three little stone lanterns of Three Pools Mirroring the Moon standing in the lake, a round smiling moon above and its light on the water
    svg: cityStamp('chz-st', { name: 'HANGZHOU', sub: 'CHINA', ...HZ, emblem: C(100, 64, 12, '#FFF59D') + face(100, 64, 0.28, 'none')
      + P('M48 104h104a52 52 0 0 1-104 0z', '#80CBC4', 0) + Lc('M90 116h20M84 128h32M92 140h16', '#FFF9C4', 3)
      + [74, 100, 126].map((x) => g(x, 110, 1.15, R(-3, -6, 6, 12, '#90A4AE', 0, 2.5) + C(0, -16, 10, '#CFD8DC') + C(0, -16, 3, '#FFF59D', 0) + P('M-7-25l7-8 7 8z', '#78909C', 2.5))).join('') }) },
  { id: 'cn-hangzhou.day.westlake', cat: 'day', file: 'cn/hangzhou/day-westlake.v1.svg', name: nm('ทะเลสาบซีหูกับคันดินกลางน้ำ', 'West Lake with its causeway and soft green hills'), kw: ['west lake', 'ทะเลสาบซีหู', 'xihu', 'ซีหู', 'hangzhou', 'หางโจว', 'lake hills', 'ภูเขารอบทะเลสาบ', 'boat on the lake', 'เรือในทะเลสาบ', 'willow', 'ต้นหลิว'],
    // a wide calm lake ringed with soft green hills, a slim pagoda on the far ridge, a long green causeway with a white arched bridge, a willow in front and a smiling boat
    svg: scene('chz-d1', '#E0F7FA', C(60, 52, 16, '#FFE082', 0) + P('M-4 120c30-36 60-44 90-28 30-26 70-30 100-10 24-12 44-8 58 6v40H-4z', '#A5D6A7')
      + R(146, 64, 8, 28, '#FFCC80', 0, 3) + P('M143 64l7-14 7 14z', '#8D6E63', 3) + P('M-4 128c40-18 80-16 120-6 40-14 80-12 128 4v20H-4z', '#81C784')
      + R(-4, 134, 248, 120, '#4DD0E1') + P('M-4 160c60-6 120-6 248 0v8c-120-6-188-6-248 0z', '#66BB6A', 3) + ol('M98 162q22-24 44 0', '#ECEFF1', 6)
      + [[16, 154], [44, 152], [70, 151], [170, 151], [196, 152], [226, 154]].map(([x, y]) => C(x, y, 8, '#43A047', 2.5)).join('')
      + g(158, 202, 1, P('M-38-2h76l-10 14h-56z', '#A1887F') + R(-20, -18, 40, 16, '#FFFFFF', 3) + P('M-26-18h52l-6-8h-40z', '#E57373', 3)) + face(158, 192, 0.22, 'none')
      + willow(30, 214, 1.5) + rip([[70, 186], [110, 222], [190, 230]])) },
  { id: 'cn-hangzhou.day.longjing', cat: 'day', file: 'cn/hangzhou/day-longjing.v1.svg', name: nm('ไร่ชาหลงจิ่งบนเนินเขา', 'The Longjing tea hills, row after row of green bushes'), kw: ['longjing', 'หลงจิ่ง', 'dragon well tea', 'ชาบ่อมังกร', 'tea fields', 'ไร่ชา', 'tea terraces', 'ไร่ชาขั้นบันได', 'meijiawu', 'เหมยเจียอู', 'green tea', 'ชาเขียว'],
    // rounded hills combed into rows of bright tea bushes, mist between the far hills, a white village house with a dark roof, one smiling bush
    svg: scene('chz-d2', '#F1F8E9', C(192, 52, 14, '#FFF59D', 0) + P('M-4 92c40-30 90-40 130-20 40-24 80-20 118 0v40H-4z', '#C5E1A5') + Lc('M24 96h56M146 90h64', '#FFFFFF', 7)
      + [[116, '#66BB6A'], [138, '#43A047'], [160, '#7CB342'], [182, '#388E3C'], [204, '#66BB6A'], [226, '#2E7D32']].map(([y, c], k) => P(`M-8 ${y + (k % 2) * 4}` + 'q10-16 20 0'.repeat(13) + 'v40H-8z', c)).join('')
      + jn(70, 106, 1.4) + jn(96, 110, 1.1) + face(118, 196, 0.3)) },
  { id: 'cn-hangzhou.day.xixi', cat: 'day', file: 'cn/hangzhou/day-xixi.v1.svg', name: nm('เรือลำเล็กในพื้นที่ชุ่มน้ำซีซี', 'A little boat in the Xixi wetland'), kw: ['xixi wetland', 'พื้นที่ชุ่มน้ำซีซี', 'xixi', 'wetland', 'พื้นที่ชุ่มน้ำ', 'persimmon tree', 'ต้นพลับ', 'egret', 'นกยาง', 'reeds', 'ต้นกก', 'boat ride', 'นั่งเรือ'],
    // winding water between grassy banks, a wooden pavilion on stilts, reeds, a persimmon tree full of orange fruit, a white egret and a little covered boat
    svg: scene('chz-d3', '#FFF8E1', P('M-4 110c50-10 100-6 140 0 40-8 70-6 108 2v40H-4z', '#C5E1A5') + P('M-4 140c60-14 120 10 180-4 30-6 50-4 68 0v120H-4z', '#80DEEA')
      + P('M146 150c20-12 70-12 98 0v22c-30 6-74 6-98-6z', '#AED581') + Lc('M196 152c-2-30 4-50 0-78', '#6D4C41', 6) + C(196, 72, 32, '#8BC34A')
      + [[180, 62], [204, 52], [214, 78], [184, 86], [200, 96]].map(([x, y]) => C(x, y, 6, '#FF8F00', 2.5)).join('')
      + R(38, 110, 46, 24, '#FFE0B2') + P('M30 112l32-16 32 16z', '#5D4037') + Lc('M44 134v16M78 134v16', '#8D6E63', 3)
      + Lc('M18 150v-44M26 150v-52M108 146v-38M116 146v-30', '#A1887F', 3) + [[18, 104], [26, 96], [108, 106], [116, 114]].map(([x, y]) => E(x, y, 3, 7, '#D7CCC8', 2)).join('')
      + g(118, 198, 1, P('M-42-4c20 10 64 10 84 0l-8 14c-20 6-48 6-68 0z', '#8D6E63') + P('M-22-6c0-20 44-20 44 0z', '#A1887F')) + face(118, 204, 0.24, 'none')
      + E(54, 178, 12, 7, '#FFFFFF') + ol('M62 174c6-10 4-18 10-22', '#FFFFFF', 4) + C(74, 152, 4, '#FFFFFF', 2.5) + P('M77 151l9 2-9 2z', '#FFCA28', 2) + Lc('M50 185v12M57 185v12', INK, 2.5)
      + rip([[150, 222], [20, 214]])) },

  L('leifeng', 'เจดีย์เหลยเฟิงยามเย็น', 'The Leifeng Pagoda at sunset', ['leifeng pagoda', 'เจดีย์เหลยเฟิง', 'leifeng', 'เหลยเฟิง', 'sunset over the lake', 'พระอาทิตย์ตกริมทะเลสาบ', 'octagonal pagoda', 'เจดีย์แปดเหลี่ยม', 'white snake legend', 'ตำนานนางพญางูขาว'], 'หาหลังคาชั้นบนสุดที่เล็กที่สุด', 'Find the smallest roof at the very top',
    // a five-storey eight-sided pagoda with golden walls and brown curling roofs on a green hill, an orange sunset sun behind, the lake below shining gold
    bg('#FFE0B2') + C(176, 62, 18, '#FFAB91', 0) + P('M16 156c40-28 168-28 208 0v20H16z', '#81C784', 0) + low(172, '#4DB6AC') + frame
    + [0, 1, 2, 3, 4].map((k) => { const w = 76 - k * 11, y = 132 - k * 22; return R(120 - w / 2 + 8, y + 4, w - 16, 18, '#FFCC80') + R(116, y + 8, 8, 10, '#8D4F2A', 0, 2) + P(`M${120 - w / 2} ${y + 6}l${w * 0.16}-10h${w * 0.68}l${w * 0.16} 10z`, '#8D4F2A'); }).join('')
    + Lc('M120 34V22', INK, 4) + C(120, 20, 4, '#FFCA28', 2.5) + R(78, 150, 84, 8, '#A1887F', 0, 3) + face(120, 140, 0.34)
    + Lc('M100 186h40M92 200h56M106 212h28', '#FFE082', 4)),
  L('brokenbridge', 'สะพานต้วนเฉียวในวันหิมะตก', 'The Broken Bridge in the snow', ['broken bridge', 'สะพานต้วนเฉียว', 'duanqiao', 'ต้วนเฉียว', 'lingering snow', 'หิมะที่ยังเหลือ', 'stone arch bridge', 'สะพานหินโค้ง', 'winter west lake', 'ซีหูหน้าหนาว', 'bai causeway', 'คันดินไป๋ตี'], 'หาครึ่งสะพานที่หิมะละลายแล้ว', 'Find the half of the bridge where the snow has melted',
    // a low stone arch bridge over the lake, its left half still white with snow and its right half bare grey stone, a little red pavilion with a snowy roof, snowflakes falling
    bg('#E3F2FD') + low(160, '#80CBC4') + frame + P('M16 160c34-46 174-46 208 0v6H16z', '#BDBDBD') + P('M92 166a28 26 0 0 1 56 0z', '#80CBC4')
    + P('M14 162c17-26 54-40 106-40v18c-46 0-82 9-102 30z', '#FFFFFF')
    + R(188, 112, 24, 24, '#E57373') + P('M182 114l18-14 18 14z', '#455A64') + P('M186 108l14-10 14 10c-10-3-18-3-28 0z', '#FFFFFF', 2.5) + R(196, 122, 8, 14, '#5D4037', 0, 2)
    + [[40, 50], [80, 36], [130, 56], [170, 42], [210, 72], [60, 90], [150, 88]].map(([x, y]) => C(x, y, 4, '#FFFFFF', 2)).join('')
    + rip([[50, 196], [140, 206]]) + face(120, 132, 0.36)),
  L('sudi', 'คันดินซูตีกับต้นหลิวและต้นท้อ', 'The Su Causeway lined with willows and peach blossom', ['su causeway', 'คันดินซูตี', 'sudi', 'ซูตี', 'spring dawn', 'เช้าฤดูใบไม้ผลิ', 'peach blossom', 'ดอกท้อ', 'willow trees', 'ต้นหลิว', 'walk across the lake', 'เดินข้ามทะเลสาบ'], 'หาต้นท้อสีชมพูที่อยู่ใกล้ที่สุด', 'Find the pink peach tree closest to you',
    // a path running away across the lake, green willows and pink peach trees taking turns on both sides and getting smaller, a white arched bridge at the far end
    bg('#E0F7FA') + low(110, '#4DD0E1') + frame + P('M88 226l26-118h12l26 118z', '#D7CCC8') + P('M70 226l40-118h4l-26 118zM170 226l-40-118h-4l26 118z', '#81C784', 0)
    + ol('M104 110q16-16 32 0', '#FFFFFF', 5)
    + [[64, 214, 1.25, 0], [86, 168, 0.95, 1], [100, 136, 0.7, 0], [176, 214, 1.25, 1], [154, 168, 0.95, 0], [140, 136, 0.7, 1]].map(([x, y, s, p]) => p
      ? g(x, y, s, Lc('M0 0v-40', '#6D4C41', 6) + C(0, -48, 20, '#F8BBD0') + [[-8, -56], [8, -52], [-2, -40], [10, -42]].map(([a, b]) => C(a, b, 4, '#F06292', 0)).join(''))
      : willow(x, y, s)).join('') + face(120, 196, 0.36)),
  L('rowboat', 'เรือพายหลังคาสีแดงในทะเลสาบซีหู', 'A West Lake rowing boat with a red canopy', ['west lake boat', 'เรือทะเลสาบซีหู', 'rowing boat', 'เรือพาย', 'hand rowed boat', 'เรือพายมือ', 'canopy boat', 'เรือมีหลังคา', 'boat ride', 'นั่งเรือ'], 'หาโคมแดงที่แขวนใต้หลังคาเรือ', 'Find the red lantern hanging under the canopy',
    // a wooden pleasure boat with a curved red canopy on four posts, two red lanterns hanging under it, a bench with cushions, a long oar at the back, ripples around
    E(120, 196, 100, 16, '#80DEEA', 0) + P('M26 160c40 22 148 22 188 0l-16 26c-40 14-116 14-156 0z', '#A1887F') + Lc('M44 174c40 10 112 10 152 0', '#8D6E63', 3)
    + Lc('M66 162v-44M174 162v-44M96 166v-48M144 166v-48', '#6D4C41', 4) + P('M52 120c26-24 110-24 136 0l-8 8c-34-18-86-18-120 0z', '#C62828')
    + R(80, 146, 80, 14, '#FFCC80', 4) + E(96, 146, 10, 5, '#F48FB1', 2.5) + E(144, 146, 10, 5, '#F48FB1', 2.5)
    + [84, 156].map((x) => Lc(`M${x} 122v8`, INK, 2) + E(x, 138, 7, 9, '#E53935', 2.5) + Lc(`M${x - 4} 146v4M${x + 4} 146v4`, '#FFCA28', 2)).join('')
    + ol('M200 150l26 44', '#8D6E63', 5) + E(228, 198, 6, 10, '#8D6E63', 2.5) + face(120, 176, 0.4) + rip([[30, 204], [150, 210]])),
  L('feilaifeng', 'ยอดเขาเฟยไหลเฟิงใกล้หลิงอิ่น', 'Feilai Feng, the knobbly rock hill near Lingyin', ['feilai feng', 'เฟยไหลเฟิง', 'peak that flew from afar', 'ยอดเขาที่บินมา', 'lingyin', 'หลิงอิ่น', 'limestone hill', 'เขาหินปูน', 'caves', 'ถ้ำ', 'forest stream', 'ลำธารในป่า'], 'หาปากถ้ำโค้งที่เชิงเขา', 'Find the arched cave mouth at the foot of the hill',
    // a lumpy grey limestone hill full of caves and holes with green trees growing on top, a clear stream in front crossed by a little stone bridge, tall trees at the sides
    bg('#E8F5E9') + low(184, '#A5D6A7') + frame + P('M40 184c-4-40 10-70 30-82 6-26 28-40 50-36 22-12 50 0 56 22 22 10 30 50 24 96z', '#B0BEC5')
    + C(84, 92, 14, '#66BB6A') + C(112, 70, 16, '#43A047') + C(146, 80, 14, '#66BB6A') + C(172, 110, 12, '#43A047')
    + P('M66 184v-22a14 16 0 0 1 28 0v22z', '#455A64') + E(162, 140, 7, 9, '#546E7A') + E(118, 112, 5, 6, '#546E7A') + Lc('M100 140c10-6 18 0 24-8M140 168c10 4 20-2 28 4M140 104c8 4 16 0 20 6M60 134c8-4 14 2 20-2', '#90A4AE', 3)
    + P('M16 196c40-8 80 8 120 0s60-6 88 2v14H16z', '#4FC3F7', 0) + ol('M92 202q28-20 56 0', '#BDBDBD', 6)
    + Lc('M28 184v-50M212 184v-56', '#6D4C41', 5) + C(28, 126, 14, '#2E7D32') + C(212, 120, 16, '#388E3C') + face(124, 152, 0.34)),
  L('orioles', 'นกขมิ้นร้องเพลงในดงหลิว', 'An oriole singing in the willows', ['orioles singing in the willows', 'นกขมิ้นร้องเพลงในดงหลิว', 'liulang wenying', 'หลิวล่างเหวินอิง', 'oriole', 'นกขมิ้น', 'willow branches', 'กิ่งหลิว', 'birdsong', 'เสียงนกร้อง'], 'หาตัวโน้ตที่ลอยออกจากปากนก', 'Find the music notes floating from the bird’s beak',
    // a bright yellow oriole with a black eye stripe and black wings singing on a willow branch, long green willow strands hanging around it, music notes in the air
    ol('M20 70c60 10 120 6 200-10', '#8D6E63', 6) + Lc('M40 72c-2 40 4 80 0 130M70 76c4 30 0 70 6 110M170 66c-4 40 4 80-2 126M200 62c2 30-2 70 4 100', '#7CB342', 3)
    + [[40, 110], [42, 150], [72, 120], [74, 160], [168, 110], [170, 150], [202, 100], [200, 140]].map(([x, y]) => E(x, y, 4, 9, '#9CCC65', 2)).join('')
    + E(118, 116, 34, 26, '#FFD600') + P('M100 112c10 20 30 30 50 26-8-20-26-30-50-26z', INK, 0) + P('M84 120l-26 14 30-2z', '#FFD600') + C(140, 92, 20, '#FFD600')
    + Lc('M128 88l22-2', INK, 5) + P('M158 92l14 3-14 5z', '#F06292', 2.5) + C(140, 89, 3.5, '#FFFFFF', 0) + Lc('M110 140l-4 14M124 140l2 14', INK, 3)
    + P('M180 70v-22l14-4v22', 'none', 3) + C(176, 72, 5, INK, 0) + C(190, 68, 5, INK, 0) + P('M206 106v-16', 'none', 3) + C(202, 108, 4, INK, 0)
    + E(130, 104, 6, 4, '#FF8FA3', 0)),
  L('gongchen', 'สะพานก่งเฉินข้ามคลองต้ายุ่นเหอ', 'Gongchen Bridge over the Grand Canal', ['gongchen bridge', 'สะพานก่งเฉิน', 'grand canal', 'คลองต้ายุ่นเหอ', 'beijing hangzhou canal', 'คลองปักกิ่งหางโจว', 'three arch bridge', 'สะพานสามโค้ง', 'canal barge', 'เรือขนของในคลอง'], 'หาเรือขนของที่ลอดใต้โค้งกลาง', 'Find the barge passing under the big middle arch',
    // a long humped stone bridge with one tall arch in the middle and two smaller ones, white houses with dark roofs on the banks, a low barge with crates sliding under the big arch
    bg('#E1F5FE') + jn(34, 120, 1.3) + jn(58, 124, 1.1) + jn(188, 122, 1.2) + jn(210, 118, 1.3) + low(156, '#4FC3F7') + frame
    + P('M16 160c50-6 64-62 104-64 40 2 54 58 104 64v10H16z', '#BCAAA4') + Lc('M36 156h20M182 156h20M104 104h32M76 130l8-6M164 130l-8-6', '#A1887F', 3)
    + P('M96 170v-20a24 30 0 0 1 48 0v20z', '#4FC3F7') + P('M48 170a14 14 0 0 1 28 0zM164 170a14 14 0 0 1 28 0z', '#4FC3F7')
    + g(120, 186, 1, P('M-46-8h92l-8 14h-76z', '#8D6E63') + R(-32, -22, 22, 14, '#FFB74D', 0, 2.5) + R(-8, -20, 20, 12, '#E57373', 0, 2.5) + R(14, -22, 18, 14, '#FFB74D', 0, 2.5))
    + face(120, 118, 0.32) + rip([[30, 206], [170, 212]])),
  L('biglotus', 'สนามกีฬาดอกบัวใหญ่ของหางโจว', 'Hangzhou’s “big lotus” stadium', ['hangzhou olympic sports centre', 'ศูนย์กีฬาโอลิมปิกหางโจว', 'big lotus', 'ดอกบัวใหญ่', 'lotus stadium', 'สนามกีฬารูปดอกบัว', 'asian games', 'เอเชียนเกมส์', 'qiantang river', 'แม่น้ำเฉียนถัง'], 'หากลีบดอกบัวที่สูงที่สุดตรงกลาง', 'Find the tallest petal in the middle',
    // a huge round stadium made of silvery white petals like a lotus flower opening, a back row of pale pink petals, standing by the blue river with its reflection
    E(120, 190, 104, 18, '#4FC3F7', 0) + E(120, 168, 92, 16, '#B0BEC5')
    + [-60, -36, -12, 12, 36, 60].map((dx) => { const h = 46 - Math.abs(dx) / 2; return P(`M${120 + dx - 14} 166Q${120 + dx - 14} ${120 - h} ${120 + dx} ${108 - h}Q${120 + dx + 14} ${120 - h} ${120 + dx + 14} 166z`, '#F8BBD0', 3); }).join('')
    + [-72, -48, -24, 0, 24, 48, 72].map((dx) => { const h = 40 - Math.abs(dx) / 2; return P(`M${120 + dx - 14} 172Q${120 + dx - 14} ${132 - h} ${120 + dx} ${120 - h}Q${120 + dx + 14} ${132 - h} ${120 + dx + 14} 172z`, '#ECEFF1') + Lc(`M${120 + dx} ${124 - h}v40`, '#CFD8DC', 2); }).join('')
    + face(120, 150, 0.36) + Lc('M70 198h30M140 196h34', '#E1F5FE', 4)),
  L('fountain', 'น้ำพุดนตรีกลางทะเลสาบซีหูยามค่ำ', 'The West Lake musical fountain at night', ['musical fountain', 'น้ำพุดนตรี', 'west lake fountain', 'น้ำพุทะเลสาบซีหู', 'night show', 'การแสดงยามค่ำ', 'coloured water jets', 'สายน้ำหลากสี', 'lakeside at night', 'ริมทะเลสาบตอนกลางคืน'], 'หาสายน้ำสีชมพูที่พุ่งสูง', 'Find the tall pink water jet',
    // a dark blue night over the lake, arcs of water lit blue, pink and gold rising from the water, one tall jet in the middle, a smiling moon and music notes
    bg('#283593') + P('M16 150c40-14 80-10 110-2 40-12 70-10 98 0v20H16z', '#1A237E', 0) + low(160, '#3949AB') + frame + C(188, 50, 14, '#FFF59D') + face(188, 50, 0.3, 'none')
    + ol('M120 166V60', '#F48FB1', 8) + ol('M120 166c-10-40-30-64-54-70', '#4FC3F7', 6) + ol('M120 166c10-40 30-64 54-70', '#4FC3F7', 6)
    + ol('M120 166c-20-24-46-34-74-30', '#FFD54F', 5) + ol('M120 166c20-24 46-34 74-30', '#FFD54F', 5) + C(120, 56, 9, '#F8BBD0', 2.5)
    + [[60, 92], [180, 92], [44, 134], [196, 134]].map(([x, y]) => C(x, y, 5, '#E1F5FE', 2)).join('') + E(120, 168, 30, 6, '#7986CB', 2.5)
    + P('M44 60v-18l12-4v18', 'none', 3) + C(40, 62, 4.5, '#FFF59D', 2) + C(52, 58, 4.5, '#FFF59D', 2) + Lc('M80 196h80M96 210h48', '#9FA8DA', 3)),
  L('longjingtea', 'ชาเขียวหลงจิ่งในแก้วใส', 'Longjing green tea in a clear glass', ['longjing tea', 'ชาหลงจิ่ง', 'dragon well tea', 'ชาบ่อมังกร', 'green tea', 'ชาเขียว', 'tea leaves standing', 'ใบชาตั้งในแก้ว', 'glass of tea', 'ชาในแก้ว'], 'หาใบชาที่ยืนตรงอยู่ในแก้ว', 'Find the tea leaf standing up in the glass',
    // a tall clear glass of pale green-gold tea with whole tea leaves standing upright and floating, steam curling up, a little dish of flat dry leaves beside it
    E(120, 206, 60, 8, '#E0E0E0', 0) + P('M82 60h76l-8 144H90z', '#E0F7FA') + P('M86 90h68l-6 112H92z', '#DCE775')
    + [[104, 150, -10], [120, 132, 4], [136, 160, 12], [112, 180, -4], [130, 110, -8]].map(([x, y, a]) => g(x, y, 1, E(0, 0, 5, 14, '#66BB6A', 2.5) + Lc('M0-12v24', '#AED581', 1.5), a)).join('')
    + Lc('M102 46c-6-10 6-16 0-26M138 46c-6-10 6-16 0-26', '#CFD8DC', 4) + Lc('M90 66v120', '#FFFFFF', 4)
    + E(186, 196, 26, 9, '#FFFFFF') + [[176, 190], [188, 188], [198, 192]].map(([x, y]) => g(x, y, 1, E(0, 0, 8, 3, '#9E9D24', 2), -15)).join('') + face(120, 122, 0.36, 'o')),
  L('teabasket', 'ตะกร้าเก็บใบชาสดหลงจิ่ง', 'A bamboo basket of freshly picked tea buds', ['tea picking', 'เก็บใบชา', 'tea basket', 'ตะกร้าใส่ใบชา', 'bamboo basket', 'ตะกร้าไม้ไผ่', 'fresh tea buds', 'ยอดชาสด', 'one bud two leaves', 'หนึ่งยอดสองใบ', 'longjing village', 'หมู่บ้านหลงจิ่ง'], 'หายอดชาที่มีใบเล็กสองใบ', 'Find the tea bud with its two little leaves',
    // a round woven bamboo basket with a carrying cord, heaped with bright green tea buds, one big sprig of a bud and two leaves on top, a few leaves fallen in front
    E(120, 208, 70, 10, '#E0E0E0', 0) + ol('M62 114c-12-104 128-104 116 0', '#A1887F', 3) + P('M60 110h120l-12 92H72z', '#E8C07A') + Lc('M64 132h112M67 156h106M70 180h100', '#C99A50', 3) + Lc('M84 110l6 92M108 110l2 92M132 110l-2 92M156 110l-6 92', '#C99A50', 2.5)
    + E(120, 110, 62, 12, '#D4A65A') + P('M66 108c6-28 34-42 54-42s48 14 54 42z', '#7CB342')
    + [[86, 92], [104, 80], [124, 76], [144, 84], [160, 96], [98, 100], [138, 100]].map(([x, y], k) => g(x, y, 1, E(0, 0, 6, 11, k % 2 ? '#9CCC65' : '#8BC34A', 2.5), k * 25 - 60)).join('')
    + g(122, 54, 1, Lc('M0 26v-20', '#558B2F', 4) + E(0, -6, 5, 12, '#C5E1A5', 2.5) + g(-10, 10, 1, E(0, 0, 6, 12, '#8BC34A', 2.5), -50) + g(10, 12, 1, E(0, 0, 6, 12, '#8BC34A', 2.5), 50))
    + g(196, 200, 1, E(0, 0, 6, 11, '#8BC34A', 2.5), 70) + face(120, 160, 0.42)),
  L('dongpo', 'หมูตงพัว หมูสามชั้นตุ๋นซีอิ๊ว', 'Dongpo pork, braised pork belly in a little clay pot', ['dongpo pork', 'หมูตงพัว', 'dongpo rou', 'หมูตงปอ', 'braised pork belly', 'หมูสามชั้นตุ๋น', 'clay pot', 'หม้อดินเผา', 'tied with string', 'มัดเชือก', 'hangzhou dish', 'อาหารหางโจว'], 'หาเชือกที่มัดหมูเป็นรูปกากบาท', 'Find the string tied in a cross around the pork',
    // a little brown clay pot with its lid leaning beside it, inside a glossy red-brown cube of pork belly showing its layers, tied with a string cross, a sprig of green bok choy, steam
    P('M48 120h144c0 50-30 80-72 80s-72-30-72-80z', '#A1663A') + Lc('M60 150c30 8 90 8 120 0', '#8B5530', 3) + E(120, 120, 72, 14, '#6D3F1E')
    + R(84, 76, 72, 56, '#FFE0B2', 8) + R(84, 76, 72, 20, '#B5452A', 8) + Lc('M88 110h64M88 122h64', '#C77B54', 5) + Lc('M120 76v56M84 104h72', '#FFF8E1', 3)
    + g(184, 112, 1, E(0, 0, 18, 9, '#66BB6A', 2.5) + Lc('M-14 0h20', '#C5E1A5', 2), -30) + E(204, 176, 26, 10, '#A1663A') + C(204, 168, 5, '#6D3F1E', 2.5)
    + Lc('M100 60c-6-10 6-16 0-26M140 60c-6-10 6-16 0-26', '#CFD8DC', 4) + face(120, 92, 0.32)),
  L('beggarschicken', 'ไก่ขอทาน ไก่ห่อใบบัวอบในดิน', 'Beggar’s chicken, baked in lotus leaves and clay', ['beggars chicken', 'ไก่ขอทาน', 'jiaohua ji', 'เจียวฮวาจี', 'lotus leaf', 'ใบบัว', 'baked in clay', 'อบในดินเหนียว', 'crack it open', 'ทุบเปลือกดิน', 'roast chicken', 'ไก่อบ'], 'หาค้อนไม้ที่ใช้ทุบเปลือกดิน', 'Find the little wooden hammer for cracking the clay',
    // a round parcel of baked brown clay cracked open on a plate, green lotus leaves folded back inside it showing a golden chicken, a small wooden mallet resting beside
    E(110, 190, 92, 18, '#FFFFFF') + P('M34 168c-6-40 24-74 76-74s82 34 76 74c-24 18-128 18-152 0z', '#A1887F')
    + P('M54 160c0-32 24-52 56-52s56 20 56 52c-20 10-92 10-112 0z', '#66BB6A') + Lc('M110 110v48M80 120l18 36M140 120l-18 36', '#A5D6A7', 2.5)
    + P('M72 150c4-22 20-32 38-32s34 10 38 32c-18 8-58 8-76 0z', '#FFB74D') + Lc('M84 132l-8-10M136 132l8-10', '#FFB74D', 7) + P('M44 132l12 6-4 12zM176 134l-12 4 6 12z', '#8D6E63', 2.5)
    + ol('M190 140l30-32', '#C8A165', 5) + R(208, 92, 26, 18, '#A1887F', 4, 3) + face(110, 140, 0.32)),
  L('longjingshrimp', 'กุ้งผัดใบชาหลงจิ่ง', 'Longjing shrimp, river shrimp stir-fried with tea leaves', ['longjing shrimp', 'กุ้งผัดชาหลงจิ่ง', 'longjing xiaren', 'หลงจิ่งเซียเหริน', 'tea leaf shrimp', 'กุ้งผัดใบชา', 'river shrimp', 'กุ้งแม่น้ำ', 'green tea leaves', 'ใบชาเขียว', 'white plate', 'จานขาว'], 'หาใบชาสีเขียวที่วางอยู่ระหว่างกุ้ง', 'Find the green tea leaves between the shrimps',
    // a round white plate with a blue rim heaped with small curled white-pink shrimps, bright green tea leaves scattered among them, the biggest shrimp in front smiling
    E(120, 140, 100, 64, '#FFFFFF') + E(120, 140, 86, 52, '#FAFAFA', 3) + E(120, 140, 92, 58, 'none', 0) + Lc('M30 150c10 30 50 50 90 50s80-20 90-50', '#64B5F6', 3)
    + [[82, 116, 0], [118, 104, 30], [154, 118, -20], [92, 150, 40], [150, 152, 10], [70, 136, -30], [170, 138, 60]].map(([x, y, a]) => g(x, y, 1, ol('M-10 6a12 12 0 1 1 14 4', '#FFCCBC', 7) + C(4, -6, 2, '#E64A19', 0), a)).join('')
    + [[104, 128, -20], [136, 132, 40], [118, 160, 10], [80, 164, 70], [164, 106, -50], [132, 92, 20]].map(([x, y, a]) => g(x, y, 1, E(0, 0, 4, 10, '#43A047', 2.5), a)).join('')
    + g(120, 176, 1.5, ol('M-12 4a14 14 0 1 1 16 6', '#FFAB91', 8)) + face(116, 172, 0.3, 'none')),
  L('oufen', 'แป้งรากบัวซีหูกับดอกหอมหมื่นลี้', 'West Lake lotus-root starch pudding with osmanthus', ['lotus root starch', 'แป้งรากบัว', 'west lake ou fen', 'โอ่วเฝินซีหู', 'osmanthus', 'ดอกหอมหมื่นลี้', 'sweet pudding', 'ขนมหวานเนื้อใส', 'goji berries', 'เก๋ากี้', 'lotus root', 'รากบัว'], 'หารากบัวแผ่นที่มีรูกลมๆ', 'Find the lotus root slice with the round holes',
    // a blue-and-white bowl of glossy clear pinkish lotus-root pudding sprinkled with tiny yellow osmanthus flowers, red goji berries and raisins, a spoon, a lotus root slice with its holes beside it
    P('M36 116h148c0 48-32 78-74 78s-74-30-74-78z', '#FFFFFF') + Lc('M50 146c20 10 40 10 60 0s40-10 60 0', '#1E88E5', 3) + E(110, 116, 74, 16, '#F8BBD0')
    + E(96, 112, 30, 7, '#FCE4EC', 0) + [[80, 112], [96, 108], [112, 116], [128, 110], [146, 114], [104, 120], [136, 120]].map(([x, y]) => C(x, y, 2.5, '#FFCA28', 1.2)).join('')
    + [[88, 118], [122, 106], [150, 120]].map(([x, y]) => E(x, y, 3.5, 2.5, '#E53935', 1.5)).join('') + [[72, 116], [140, 108]].map(([x, y]) => E(x, y, 3.5, 2.5, '#6D4C41', 1.5)).join('')
    + ol('M142 108l40-56', '#ECEFF1', 4) + E(186, 46, 7, 10, '#ECEFF1', 3) + C(194, 184, 22, '#FFF3E0') + [[194, 184, 5], [182, 178, 4], [206, 178, 4], [186, 194, 4], [202, 194, 4]].map(([x, y, r]) => C(x, y, r, '#FFFFFF', 2)).join('')
    + face(110, 160, 0.38)),
  L('fan', 'พัดกระดาษสีดำของหางโจว', 'A Hangzhou black paper fan painted with West Lake', ['hangzhou fan', 'พัดหางโจว', 'black paper fan', 'พัดกระดาษสีดำ', 'wangxingji', 'หวังซิงจี้', 'folding fan', 'พัดพับ', 'painted fan', 'พัดวาดภาพ', 'tassel', 'พู่ห้อย'], 'หาเจดีย์เล็กๆ ที่วาดอยู่บนพัด', 'Find the little pagoda painted on the fan',
    // a folding fan opened wide, black paper with a painted gold sun, a white arched bridge and a tiny pagoda on a hill, brown bamboo ribs meeting at the bottom, a red tassel
    P('M120 190L28 110a130 130 0 0 1 184 0z', '#37474F') + P('M120 190L60 138a84 84 0 0 1 120 0z', '#8D6E63')
    + Lc('M120 190L44 92M120 190L74 72M120 190L104 64M120 190L136 64M120 190L166 72M120 190L196 92', '#546E7A', 2)
    + C(170, 88, 9, '#FFCA28', 2.5) + P('M60 112c20-18 40-20 60-6 16-12 36-12 56 4', 'none', 3) + ol('M80 112q14-14 28 0', '#FFFFFF', 3)
    + R(140, 84, 6, 18, '#FFE082', 0, 2) + P('M138 84l5-8 5 8z', '#FFE082', 2) + Lc('M120 190v14', INK, 3) + C(120, 190, 6, '#C8A165', 3)
    + P('M114 206h12l-2 22h-8z', '#E53935', 2.5) + face(120, 152, 0.34)),
];

export default {
  places: {
    'cn-hangzhou': { country: 'cn', wave: 3, name: nm('หางโจว', 'Hangzhou'), tz: 'Asia/Shanghai', ll: [30.27, 120.15], alias: ['hangzhou', 'หางโจว', '杭州', 'HGH', 'xihu', 'ซีหู', '西湖', 'leifeng pagoda', 'เจดีย์เหลยเฟิง', 'lingyin', 'หลิงอิ่น', 'feilai feng', 'longjing', 'หลงจิ่ง', '龙井', 'xixi wetland', 'พื้นที่ชุ่มน้ำซีซี', 'su causeway', 'gongchen bridge'], colors: HZ },
  },
  items,
};
