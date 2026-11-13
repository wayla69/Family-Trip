// Wave 14, Japan: Yokohama and Kamakura — the city stamp, two day scenes and seventeen landmarks of the port city, the old
// samurai capital and Enoshima (buildings, trains, foods and crafts; no Buddha image, no statues, no Ferris wheel, no brands)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const YK = { k1: '#1E5AA8', k2: '#C0392B', k3: '#EAF3FB' };
const CITY = 'jp-yokohama', DIR = 'jp/yokohama';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });

// the Red Brick Warehouse: a long brick block, rows of white-trimmed arched windows, iron balconies and two little gables
// (x = left, b = base, w = width, s = scale)
const brick = (x, b, w, s, sw) => {
  const h = 60 * s;
  let o = R(x, b - h, w, h, '#C0533A', 0, sw) + P(`M${x - 4 * s} ${b - h}h${w + 8 * s}l-${6 * s}-${8 * s}h-${w - 4 * s}z`, '#8D3B2A', sw);
  for (const gx of [x + w * 0.3, x + w * 0.7]) o += P(`M${gx - 12 * s} ${b - h - 6 * s}l${12 * s}-${12 * s} ${12 * s} ${12 * s}z`, '#C0533A', sw);
  for (let r = 0; r < 3; r++) for (let k = 0; k < Math.floor(w / (16 * s)); k++) {
    const wx = x + 6 * s + k * 16 * s, wy = b - h + 8 * s + r * 18 * s;
    o += P(`M${wx} ${wy + 12 * s}v-${8 * s}a${4 * s} ${4 * s} 0 0 1 ${8 * s} 0v${8 * s}z`, '#FFF3E0', 0);
  }
  return o + Lc(`M${x} ${b - h + 22 * s}h${w}M${x} ${b - h + 40 * s}h${w}`, '#37474F', 2.5);
};
// a big red Chinese-style gate: two red pillars, a painted beam band and two tiers of green tiled roof with flicked-up ends
const chGate = (x, b, w, s, sw) => R(x - w / 2, b - 70 * s, 10 * s, 70 * s, '#D32F2F', 0, sw) + R(x + w / 2 - 10 * s, b - 70 * s, 10 * s, 70 * s, '#D32F2F', 0, sw)
  + R(x - w / 2 - 4 * s, b - 86 * s, w + 8 * s, 16 * s, '#1E88E5', 0, sw) + Lc(`M${x - w / 2 + 6 * s} ${b - 78 * s}h${w - 12 * s}`, '#FFD54F', 3)
  + P(`M${x - w / 2 - 18 * s} ${b - 86 * s}q${8 * s} -${4 * s} ${14 * s}-${14 * s}h${w + 8 * s}q${6 * s} ${10 * s} ${14 * s} ${14 * s}z`, '#2E7D32', sw)
  + R(x - w / 4, b - 112 * s, w / 2, 12 * s, '#D32F2F', 0, sw)
  + P(`M${x - w / 4 - 14 * s} ${b - 112 * s}q${6 * s}-${4 * s} ${10 * s}-${12 * s}h${w / 2 + 8 * s}q${4 * s} ${8 * s} ${10 * s} ${12 * s}z`, '#2E7D32', sw);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับโยโกฮาม่า', 'Yokohama stamp'), kw: ['yokohama', 'โยโกฮาม่า', 'red brick warehouse', 'โกดังอิฐแดง', 'harbour', 'ท่าเรือ', 'minato mirai', 'มินาโตะมิไร'],
    // the Red Brick Warehouse on the harbour with two little waves under it and a seagull above
    svg: cityStamp('ykh-st', { name: 'YOKOHAMA', sub: 'KAMAKURA · JAPAN', ...YK, emblem: brick(62, 124, 76, 0.55, 2.5) + Lc('M58 134c12-4 24 4 36 0s24-4 36 0s12 4 12 0', '#4FC3F7', 3) + Lc('M70 142c10-3 20 3 30 0s20-3 30 0', '#4FC3F7', 2.5) + P('M82 70q6-6 12 0q6-6 12 0', 'none', 2.5) }) },

  D('minatomirai', 'อ่าวมินาโตะมิไรกับตึกสูงริมน้ำ', 'The Minato Mirai waterfront in Yokohama', ['minato mirai', 'มินาโตะมิไร', 'yokohama bay', 'อ่าวโยโกฮาม่า', 'landmark tower', 'แลนด์มาร์กทาวเวอร์', 'sail-shaped hotel', 'โรงแรมรูปใบเรือ', 'waterfront', 'ริมอ่าว'],
    // the tall tapering Landmark Tower, three stepped Queen's Square towers and the white half-moon sail hotel by the blue bay, a little boat and gulls
    scene('ykh-d1', '#BFE3FF', P('M-4 150h248v100H-4z', '#4FC3F7', 0)
      + P('M50 160L60 46h26l10 114z', '#ECEFF1') + R(64, 38, 18, 10, '#B0BEC5', 0, 3) + Lc('M66 70h16M65 90h18M64 110h20M63 130h22', '#90CAF9', 3)
      + [[104, 96, 18], [124, 84, 18], [144, 104, 18]].map(([x, y, w]) => R(x, y, w, 160 - y, '#CFD8DC', 0) + Lc(`M${x + 4} ${y + 12}v${140 - y}`, '#90CAF9', 2.5)).join('')
      + P('M168 160V100q42 6 46 60z', '#FFFFFF') + Lc('M174 112q24 6 30 40', '#B3E5FC', 3)
      + Lc('M20 176h40M120 186h60M60 204h70', '#E1F5FE', 3) + P('M140 196h40l-6 10h-28z', '#FFFFFF', 3) + Lc('M160 196v-14', '#455A64', 3) + P('M161 184l12 8h-12z', '#E53935', 2)
      + P('M30 60q5-5 10 0q5-5 10 0M180 50q4-4 8 0q4-4 8 0', 'none', 3) + face(73, 140, 0.3))),

  D('wakamiya', 'ถนนวากามิยะโอจิสู่ศาลเจ้าในคามาคุระ', 'Kamakura\'s cherry-lined road to the hillside shrine', ['kamakura', 'คามาคุระ', 'wakamiya oji', 'วากามิยะโอจิ', 'dankazura', 'ทางเดินดันคาซูระ', 'tsurugaoka hachimangu', 'ศาลเจ้าสึรุงาโอกะฮาจิมังกู', 'cherry blossom path', 'ทางเดินซากุระ'],
    // a big red gate framing a raised path lined with pink cherry trees, running to a red shrine hall on stone steps against green wooded hills
    scene('ykh-d2', '#FFF3E0', P('M-4 110c40-34 80-40 124-30s80-10 124 14v60H-4z', '#66BB6A', 0) + P('M-4 128c60-20 120-24 248 0v40H-4z', '#81C784')
      + R(96, 84, 48, 22, '#E53935', 0, 3) + P('M88 86l8-12h48l8 12z', '#2E7D32', 3) + [0, 1, 2, 3].map((k) => R(100 - k * 6, 106 + k * 6, 40 + k * 12, 6, '#BDBDBD', 0, 2.5)).join('')
      + P('M108 132h24l40 120H68z', '#D7CCC8') + [[96, 140, 10], [146, 140, 10], [84, 168, 16], [158, 168, 16], [66, 206, 24], [176, 206, 24]].map(([x, y, r]) => Lc(`M${x} ${y + r}v${r * 0.6}`, '#6D4C41', 4) + C(x, y, r, '#F8BBD0', 3)).join('')
      + R(28, 60, 16, 190, '#E53935', 0) + R(196, 60, 16, 190, '#E53935', 0) + P('M6 44q114 -14 228 0l-4 14q-110 -10 -220 0z', '#263238') + R(18, 64, 204, 12, '#E53935', 0) + face(120, 92, 0.24))),

  L('redbrick', 'โกดังอิฐแดงริมอ่าวโยโกฮาม่า', 'The Red Brick Warehouse on Yokohama Bay', ['red brick warehouse', 'โกดังอิฐแดง', 'aka renga soko', 'อากะเร็งกะโซโกะ', 'shinko pier', 'ท่าเรือชินโค', 'old warehouse', 'โกดังเก่า', 'arched windows', 'หน้าต่างโค้ง'], nm('หาหน้าต่างโค้งเล็กๆ เรียงกันเป็นแถว', 'Find the rows of little arched windows'),
    // two long red-brick warehouses with rows of white arched windows, iron balcony lines and little gables, a paved square and the bay in front
    R(16, 176, 208, 34, '#4FC3F7', 14) + brick(22, 150, 96, 1) + brick(126, 160, 92, 0.9) + R(16, 150, 208, 26, '#E0E0E0', 0) + Lc('M30 162h180', '#BDBDBD', 3)
    + Lc('M40 192h40M120 198h60', '#E1F5FE', 3) + face(70, 120, 0.4)),

  L('chinatown', 'ประตูไชน่าทาวน์โยโกฮาม่า', 'A painted gate of Yokohama Chinatown', ['chinatown', 'ไชน่าทาวน์', 'chukagai', 'ชูคากาอิ', 'zenrinmon', 'ประตูเซ็นรินมง', 'red gate', 'ประตูแดง', 'chinese gate', 'ซุ้มประตูจีน'], nm('หาหลังคาสีเขียวสองชั้นบนประตู', 'Find the two green roofs on the gate'),
    // a tall red Chinese gate with a blue-and-gold painted beam and two tiers of green tiled roofs, red paper lanterns hanging along a lane behind
    Lc('M20 70q40 14 80 0M140 70q40 14 80 0', '#6D4C41', 2.5) + [[40, 78], [76, 76], [164, 76], [200, 78]].map(([x, y]) => E(x, y + 8, 9, 11, '#E53935', 2.5) + Lc(`M${x} ${y + 19}v6`, '#FFC107', 3)).join('')
    + R(14, 206, 212, 12, '#BCAAA4', 6) + chGate(120, 206, 120, 1.25) + face(120, 140, 0.45)),

  L('enoshima', 'เกาะเอโนชิมะกับสะพานยาว', 'Enoshima island and its long bridge', ['enoshima', 'เอโนชิมะ', 'benten bridge', 'สะพานเบ็นเท็น', 'island', 'เกาะ', 'shonan coast', 'ชายฝั่งโชนัน', 'sagami bay', 'อ่าวซากามิ'], nm('หาสะพานยาวที่พาเดินไปถึงเกาะ', 'Find the long bridge that walks you to the island'),
    // a round green island humped with trees and a small red gate on its shore, a long low bridge on many legs running to it from the sand, waves and a sailing dinghy
    R(14, 140, 212, 74, '#4FC3F7', 30) + P('M110 150c0-60 30-86 60-86s56 30 56 86z', '#66BB6A') + [[138, 96], [166, 80], [196, 98], [150, 122], [190, 124]].map(([x, y]) => C(x, y, 14, '#43A047', 3)).join('')
    + Lc('M118 150v-14M132 150v-14', '#E53935', 3) + Lc('M114 136h22', '#E53935', 4)
    + P('M14 196q30-12 60-8v12H14z', '#FFE0B2') + Lc('M30 186L118 150', '#9E9E9E', 6) + Lc('M44 184v14M64 176v14M84 168v14M104 160v12', '#9E9E9E', 4)
    + P('M40 150h26l-6 8H44z', '#FFFFFF', 3) + Lc('M53 150v-24', '#5D4037', 3) + P('M54 128l14 18H54z', '#FFFFFF', 2.5)
    + Lc('M130 180h40M150 196h50', '#E1F5FE', 3) + face(168, 116, 0.42)),

  L('sankeien', 'เจดีย์สามชั้นบนเนินที่สวนซังเคเอ็น', 'The three-storey pagoda on the hill at Sankeien', ['sankeien', 'สวนซังเคเอ็น', 'three-storey pagoda', 'เจดีย์สามชั้น', 'old tomyoji pagoda', 'เจดีย์โทเมียวจิ', 'japanese garden', 'สวนญี่ปุ่น', 'pond', 'สระน้ำ'], nm('หาหลังคาที่ซ้อนกันสามชั้น', 'Find the three stacked roofs'),
    // a slim dark-wood three-storey pagoda with grey tiled roofs and a bronze spire on a green wooded hill, a pond with a little red arched bridge below
    P('M20 170c20-60 60-80 100-80s80 20 100 80z', '#81C784') + [[48, 140], [196, 140], [70, 118], [176, 116]].map(([x, y]) => C(x, y, 16, '#43A047', 3)).join('')
    + [0, 1, 2].map((k) => R(108 + k * 2, 132 - k * 30, 24 - k * 4, 20, '#8D6E63', 0, 3) + P(`M${92 + k * 4} ${132 - k * 30}l${8}-${10}h${40 - k * 8}l${8} ${10}z`, '#546E7A', 3)).join('')
    + Lc('M120 52v-26', '#A1887F', 4) + [32, 38, 44].map((y) => Lc(`M115 ${y}h10`, '#A1887F', 3)).join('')
    + R(16, 170, 208, 44, '#4FC3F7', 20) + Lc('M70 184q50-24 100 0', '#D84315', 6)
    + Lc('M40 202h30M150 204h40', '#E1F5FE', 3) + face(120, 108, 0.3)),

  L('hikawamaru', 'เรือฮิกาวะมารุจอดที่สวนยามาชิตะ', 'The old liner Hikawa Maru at Yamashita Park', ['hikawa maru', 'เรือฮิกาวะมารุ', 'ocean liner', 'เรือโดยสารเดินสมุทร', 'yamashita park', 'สวนยามาชิตะ', 'museum ship', 'เรือพิพิธภัณฑ์', 'signal flags', 'ธงสัญญาณ'], nm('หาธงสีๆ ที่ขึงจากเสากระโดง', 'Find the bright flags strung from the masts'),
    // a long ocean liner with a black hull, white decks with round portholes and one black funnel with a white band and two red stripes, a string of signal flags over it
    R(14, 178, 212, 36, '#4FC3F7', 16) + P('M18 150h204l-14 34H34z', '#263238') + R(30, 150, 180, 6, '#E53935', 0, 0)
    + R(48, 124, 140, 26, '#FFFFFF') + R(70, 106, 92, 18, '#FFFFFF') + [60, 80, 100, 120, 140, 160, 176].map((x) => C(x, 137, 4, '#90CAF9', 2)).join('')
    + R(108, 74, 26, 32, '#212121') + R(108, 84, 26, 12, '#FFFFFF', 0, 0) + Lc('M108 88h26M108 93h26', '#E53935', 2.5)
    + Lc('M40 150V70M200 150V76', '#5D4037', 4) + Lc('M40 72L108 70M134 72L200 78', '#455A64', 2)
    + [[52, 71, '#FFC107'], [66, 71, '#E53935'], [80, 70, '#1E88E5'], [94, 70, '#43A047'], [148, 73, '#E53935'], [162, 74, '#FFC107'], [176, 75, '#1E88E5'], [190, 76, '#43A047']].map(([x, y, c]) => P(`M${x - 5} ${y}h10l-5 10z`, c, 2)).join('')
    + Lc('M30 198h40M140 202h50', '#E1F5FE', 3) + face(150, 112, 0.26)),

  L('osanbashi', 'ดาดฟ้าไม้ลอนคลื่นของท่าเรือโอซังบาชิ', 'The wavy wooden deck of Osanbashi Pier', ['osanbashi pier', 'ท่าเรือโอซังบาชิ', 'whale\'s back', 'หลังวาฬ', 'wooden deck', 'ดาดฟ้าไม้', 'cruise terminal', 'ท่าเรือสำราญ', 'grass roof', 'หลังคาหญ้า'], nm('หาเนินไม้ที่โค้งขึ้นลงเหมือนหลังวาฬ', 'Find the wooden humps that roll like a whale\'s back'),
    // a long pier roof that rolls up and down in wooden-slatted humps with green lawn patches, little benches, sea all round and a gull
    R(14, 120, 212, 96, '#4FC3F7', 30) + P('M20 170c20-40 50-40 70-10s40-46 70-30 40 30 60 10v40H20z', '#D7A86E')
    + Lc('M30 168c14-24 34-28 52-6M100 152c12-22 34-24 52-6M164 160c10-14 26-14 40-6', '#A1887F', 2.5)
    + P('M60 150c8-12 18-14 26-6l-6 10z', '#7CB342', 3) + P('M124 132c10-10 20-10 28-2l-8 10z', '#7CB342', 3)
    + R(20, 180, 200, 12, '#8D6E63', 0) + Lc('M38 192v18M98 192v18M158 192v18M206 192v18', '#6D4C41', 5)
    + P('M180 90q6-6 12 0q6-6 12 0', 'none', 3) + Lc('M30 214h40M120 214h50', '#E1F5FE', 3) + face(120, 156, 0.36)),

  L('shirasudon', 'ข้าวหน้าปลาข้าวสารชิราสึด้ง', 'Shirasu-don, a rice bowl heaped with tiny whitebait', ['shirasu don', 'ชิราสึด้ง', 'whitebait', 'ปลาข้าวสาร', 'shirasu', 'ชิราสึ', 'rice bowl', 'ข้าวหน้า', 'seaside lunch', 'มื้อกลางวันริมทะเล'], nm('หาตาดำจุดเล็กๆ ของปลาตัวจิ๋ว', 'Find the tiny black eyes of the little fish'),
    // a deep blue-patterned bowl heaped with a fluffy white mound of tiny whitebait (each a little curl with a dot eye), a raw egg yolk on top, green shiso and spring onion
    P('M36 120h168c0 56-40 92-84 92s-84-36-84-92z', '#1565C0') + Lc('M52 150q20 12 40 0t40 0t40 0', '#BBDEFB', 4) + R(32, 112, 176, 12, '#1E88E5', 6)
    + P('M44 118c10-40 50-56 76-56s66 16 76 56z', '#FFF8E1')
    + [[70, 102], [92, 88], [116, 80], [140, 88], [164, 102], [82, 110], [128, 104], [150, 112], [104, 106], [180, 112], [60, 114]].map(([x, y]) => P(`M${x - 8} ${y}q8 -7 16 0q-8 4 -16 0z`, '#FFFFFF', 2) + C(x - 5, y - 1.5, 1.6, '#22213A', 0)).join('')
    + C(120, 92, 13, '#FFB300') + P('M150 70c8-14 26-14 30 0-8 6-22 6-30 0z', '#43A047', 3) + C(70, 92, 4, '#9CCC65', 2) + C(80, 86, 4, '#9CCC65', 2)
    + face(120, 162, 0.48)),

  L('threetowers', 'หอคอยคิง ควีน แจ็กแห่งโยโกฮาม่า', 'Yokohama\'s three old towers: King, Queen and Jack', ['king queen jack', 'คิง ควีน แจ็ก', 'yokohama customs', 'ด่านศุลกากรโยโกฮาม่า', 'kanagawa prefectural office', 'ศาลากลางคานางาวะ', 'port opening memorial hall', 'หอที่ระลึกเปิดท่าเรือ', 'clock tower', 'หอนาฬิกา'], nm('หาโดมสีเขียวของหอควีน', 'Find the green dome of the Queen tower'),
    // three old towers side by side: a beige tower with a Japanese pyramid roof (King), a white tower with a green onion dome (Queen) and a red-brick clock tower with a little dome (Jack)
    R(14, 196, 212, 14, '#BDBDBD', 6)
    + R(26, 120, 54, 76, '#E6D3A3') + R(34, 70, 38, 50, '#E6D3A3') + P('M30 72l23-34 23 34z', '#5D4037') + Lc('M53 38v-12', '#5D4037', 3) + R(46, 82, 14, 18, '#FFF8E1', 0, 3)
    + R(94, 130, 52, 66, '#FFFFFF') + R(104, 76, 32, 54, '#FFFFFF') + P('M102 78c0-26 18-28 18-44 0 16 18 18 18 44z', '#26A69A') + C(120, 30, 3, '#FFC107', 2.5) + R(112, 90, 16, 20, '#B3E5FC', 0, 3)
    + R(160, 128, 54, 68, '#C0533A') + R(170, 70, 34, 58, '#C0533A') + P('M168 72c0-16 36-16 36 0z', '#78909C') + Lc('M186 58v-10', '#5D4037', 3) + C(187, 90, 10, '#FFF8E1', 3) + Lc('M187 84v6l4 3', '#22213A', 2.5)
    + [36, 56, 104, 124, 170, 190].map((x) => R(x, 150, 10, 16, '#FFF8E1', 0, 2.5)).join('') + face(53, 104, 0.24) + face(120, 116, 0.24) + face(187, 112, 0.24)),

  L('yamate', 'บ้านฝรั่งเก่าบนเนินยามาเตะ', 'An old Western house on the Yamate Bluff', ['yamate', 'ยามาเตะ', 'the bluff', 'เนินเดอะบลัฟ', 'western-style house', 'บ้านสไตล์ตะวันตก', 'rose garden', 'สวนกุหลาบ', 'harbor view park', 'สวนชมวิวท่าเรือ'], nm('หาบานเกล็ดหน้าต่างสีเขียว', 'Find the green window shutters'),
    // a white wooden clapboard house with green shutters, a grey slate roof, a red chimney and a porch, pink rose bushes along a white picket fence
    R(46, 104, 148, 92, '#FFFFFF') + Lc('M46 120h148M46 136h148M46 152h148M46 168h148M46 184h148', '#E0E0E0', 2) + P('M36 106l84-56 84 56z', '#78909C')
    + R(150, 52, 14, 30, '#C0533A') + [[60, 116], [154, 116], [60, 156], [154, 156]].map(([x, y]) => R(x, y, 26, 26, '#B3E5FC', 0, 3) + R(x - 9, y, 8, 26, '#2E7D32', 0, 2.5) + R(x + 27, y, 8, 26, '#2E7D32', 0, 2.5)).join('')
    + R(104, 150, 32, 46, '#8D6E63') + P('M96 150h48l-4-10h-40z', '#FFFFFF', 3)
    + [26, 46, 66, 86, 154, 174, 194, 214].map((x) => P(`M${x - 6} 214v-20l6-6 6 6v20z`, '#FFFFFF', 2.5)).join('') + Lc('M18 202h204', '#FFFFFF', 0)
    + [[34, 188], [70, 192], [168, 190], [204, 188]].map(([x, y]) => C(x, y, 12, '#66BB6A', 3) + C(x - 4, y - 3, 4, '#F06292', 2) + C(x + 5, y + 2, 4, '#F06292', 2)).join('') + face(120, 84, 0.36)),

  L('napolitan', 'สปาเกตตีนาโปลิตันซอสมะเขือเทศ', 'Spaghetti Napolitan, Yokohama\'s ketchup pasta', ['napolitan', 'นาโปลิตัน', 'ketchup spaghetti', 'สปาเกตตีซอสมะเขือเทศ', 'hotel new grand', 'โรงแรมนิวแกรนด์', 'yoshoku', 'อาหารโยโชคุ', 'sausage and pepper', 'ไส้กรอกกับพริกหยวก'], nm('หาวงพริกหยวกสีเขียว', 'Find the green pepper rings'),
    // an oval white plate piled with orange ketchup spaghetti swirls, slices of pink sausage, green pepper rings and onion, a fork stuck in the top
    E(120, 160, 98, 52, '#FFFFFF') + E(120, 160, 82, 40, '#F5F5F5', 0)
    + P('M50 150c10-40 40-56 70-56s60 16 70 56c-20 14-120 14-140 0z', '#FF8A3D')
    + Lc('M60 140c20-14 40 8 60-6s40 6 64-4M66 124c18-10 36 6 54-4s34 4 48-2M80 110c14-8 28 4 42-2s24 2 30 0', '#FFB74D', 4)
    + [[80, 132], [140, 120], [110, 142], [160, 140]].map(([x, y]) => E(x, y, 10, 6, '#F48FB1', 2.5)).join('')
    + [[100, 116], [154, 108], [72, 146]].map(([x, y]) => E(x, y, 8, 5, 'none', 3) + E(x, y, 8, 5, '#66BB6A', 0) + E(x, y, 4, 2, '#FF8A3D', 0)).join('')
    + Lc('M134 100L176 40', '#B0BEC5', 6) + Lc('M170 44l-4-14M176 46l-2-14M182 48l0-14', '#B0BEC5', 3) + face(120, 180, 0.42)),

  L('marinetower', 'หอมารีนทาวเวอร์โยโกฮาม่า', 'Yokohama Marine Tower', ['marine tower', 'มารีนทาวเวอร์', 'yamashita park', 'สวนยามาชิตะ', 'lattice tower', 'หอโครงเหล็ก', 'observation deck', 'จุดชมวิว', 'harbour view', 'วิวท่าเรือ'], nm('หาลายตาข่ายบนตัวหอ', 'Find the criss-cross net on the tower'),
    // a slim ten-sided lattice tower flaring out at the bottom, silver-white with criss-cross bars, a round glass observation deck near the top and a red tip, a tiny green park at its foot
    P('M70 206c20-20 32-60 38-150h24c6 90 18 130 38 150z', '#ECEFF1')
    + Lc('M80 200L126 80M160 200L114 80M92 170L122 110M148 170L118 110', '#B0BEC5', 2.5)
    + R(96, 40, 48, 18, '#4FC3F7') + Lc('M100 49h40', '#E1F5FE', 2.5) + R(102, 30, 36, 10, '#ECEFF1') + Lc('M120 30V12', '#E53935', 5) + C(120, 10, 4, '#E53935', 2)
    + P('M30 214c20-14 40-14 60-6s40-8 60 0 40-8 60 6z', '#81C784') + C(40, 196, 12, '#66BB6A', 3) + C(200, 196, 12, '#66BB6A', 3) + face(120, 124, 0.3)),

  L('enoden', 'รถไฟเอโนเด็นผ่านทางข้ามริมทะเล', 'The little Enoden train at a seaside crossing', ['enoden', 'รถไฟเอโนเด็น', 'enoshima electric railway', 'รถไฟฟ้าเอโนชิมะ', 'level crossing', 'ทางข้ามรถไฟ', 'kamakura koko mae', 'สถานีคามาคุระโคโคมาเอะ', 'seaside train', 'รถไฟริมทะเล'], nm('หาไม้กั้นลายดำเหลือง', 'Find the black-and-yellow crossing bar'),
    // a cream-and-green two-car tram-like train rolling past a level crossing with a black-and-yellow striped barrier and a red lamp, the blue sea and an island behind
    R(14, 92, 212, 46, '#4FC3F7', 0) + P('M160 92c6-20 18-26 30-26s22 8 26 26z', '#66BB6A') + R(14, 138, 212, 10, '#BCAAA4', 0)
    + R(36, 98, 150, 48, '#2E7D32', 10) + R(36, 98, 150, 16, '#FFF8E1', 8) + [48, 74, 100, 126, 152].map((x) => R(x, 104, 18, 14, '#B3E5FC', 3, 2.5)).join('') + Lc('M110 98v48', '#22213A', 3)
    + C(56, 148, 8, '#455A64') + C(90, 148, 8, '#455A64') + C(132, 148, 8, '#455A64') + C(166, 148, 8, '#455A64') + Lc('M14 156h212', '#6D4C41', 6) + R(14, 160, 212, 54, '#E0E0E0', 0)
    + Lc('M206 214V100', '#9E9E9E', 5) + P('M196 102h20l-10 -14z', '#FFC107', 3) + C(206, 116, 7, '#E53935', 2.5)
    + R(120, 170, 86, 10, '#FFC107', 4) + Lc('M132 170v10M152 170v10M172 170v10M192 170v10', '#22213A', 6) + face(80, 126, 0.3)),

  L('meigetsuin', 'หน้าต่างวงกลมที่วัดเมเก็ตสึอิน', 'The round window of Meigetsu-in', ['meigetsu-in', 'วัดเมเก็ตสึอิน', 'round window', 'หน้าต่างวงกลม', 'window of enlightenment', 'หน้าต่างแห่งการรู้แจ้ง', 'autumn leaves', 'ใบไม้แดง', 'kita-kamakura', 'คิตะคามาคุระ'], nm('หาใบเมเปิลสีแดงหลังหน้าต่างกลม', 'Find the red maple leaves through the round window'),
    // a cream plaster wall with a big perfectly round window looking out on a garden of red and orange maple trees, tatami mats and a dark wood floor edge in front
    R(16, 22, 208, 152, '#F3E5C8') + Lc('M16 38h208', '#6D4C41', 5) + C(120, 100, 64, '#A5D6A7')
    + C(96, 76, 22, '#E53935', 3) + C(140, 70, 20, '#FF7043', 3) + C(150, 118, 20, '#E53935', 3) + C(98, 126, 18, '#FFA726', 3) + Lc('M120 164V110M120 120l-16-20M120 130l18-16', '#6D4C41', 4)
    + C(120, 100, 64, 'none', 6) + R(16, 174, 208, 40, '#C5E1A5') + Lc('M16 194h208M86 174v40M154 174v40', '#8D6E63', 3) + face(120, 196, 0.3)),

  L('kamakurabori', 'ถาดแกะสลักลงรักแดงคามาคุระโบริ', 'A Kamakura-bori tray carved with a peony', ['kamakura-bori', 'คามาคุระโบริ', 'carved lacquer', 'เครื่องเขินแกะสลัก', 'red lacquer tray', 'ถาดลงรักแดง', 'peony carving', 'ลายดอกโบตั๋น', 'woodcraft', 'งานไม้'], nm('หาดอกโบตั๋นที่แกะนูนขึ้นมา', 'Find the peony flower standing out of the wood'),
    // a round deep-red lacquered wooden tray with a raised carved peony and two leaves in the middle, darker red worn edges, a small matching round box beside it
    C(110, 120, 88, '#B71C1C') + C(110, 120, 74, '#C62828', 3) + [0, 60, 120, 180, 240, 300].map((a) => g(110, 116, 1, P('M0 0c-10-18-4-32 0-34 4 2 10 16 0 34z', '#E53935', 3), a)).join('') + C(110, 116, 10, '#8E1B1B', 3)
    + P('M70 150c-20-6-30-18-30-30 16 2 28 12 30 30z', '#7F1D1D', 3) + P('M150 150c20-6 30-18 30-30-16 2-28 12-30 30z', '#7F1D1D', 3)
    + E(196, 196, 30, 12, '#8E1B1B') + R(166, 170, 60, 26, '#B71C1C', 0) + E(196, 170, 30, 12, '#C62828') + face(110, 172, 0.36)),

  L('iekei', 'ราเม็งอิเอเคแบบโยโกฮาม่า', 'Yokohama iekei ramen with three seaweed sheets', ['iekei ramen', 'ราเม็งอิเอเค', 'yokohama ramen', 'ราเม็งโยโกฮาม่า', 'pork and soy broth', 'น้ำซุปกระดูกหมูโชยุ', 'nori sheets', 'สาหร่ายแผ่น', 'spinach', 'ผักโขม'], nm('หาสาหร่ายสามแผ่นที่ยืนเรียงกัน', 'Find the three seaweed sheets standing in a row'),
    // a wide bowl of creamy brown soup with three tall black seaweed sheets standing at the back, a heap of green spinach, a round slice of pork and thick yellow noodles peeking through
    R(70, 46, 26, 70, '#263238', 3) + R(100, 40, 26, 74, '#263238', 3) + R(130, 46, 26, 70, '#263238', 3)
    + P('M24 112h192c0 60-44 96-96 96s-96-36-96-96z', '#FFFFFF') + Lc('M44 146h152', '#E53935', 5) + Lc('M60 170h120', '#E53935', 4)
    + E(120, 112, 96, 18, '#C8935A') + E(120, 112, 84, 13, '#D9A86C', 0)
    + Lc('M60 112q10-6 20 0t20 0M150 116q10-6 20 0', '#FFE082', 4) + C(160, 108, 16, '#E0B48C', 3) + C(160, 108, 7, '#F3D1B0', 0)
    + P('M84 104c4-12 18-14 26-4-2 10-18 12-26 4z', '#2E7D32', 3) + P('M98 112c8-8 20-6 22 4-6 6-18 6-22-4z', '#43A047', 3) + face(120, 170, 0.42)),

  L('bell', 'ระฆังใหญ่ในหอระฆังวัดเอ็งคาคุจิ', 'The great bell in its belfry at Engaku-ji', ['engaku-ji', 'วัดเอ็งคาคุจิ', 'ogane', 'ระฆังโอกาเนะ', 'temple bell', 'ระฆังวัด', 'belfry', 'หอระฆัง', 'wooden striker', 'ไม้ตีระฆัง'], nm('หาท่อนไม้ที่แขวนไว้ตีระฆัง', 'Find the hanging log that rings the bell'),
    // a big green-bronze bell with raised bumps and bands hanging under a small wooden belfry with a curved grey roof, a wooden striker log on two ropes beside it, stone base
    P('M24 70q96-34 192 0l-10 12q-86-24-172 0z', '#546E7A') + R(40, 80, 160, 10, '#8D6E63') + Lc('M52 90v116M188 90v116', '#6D4C41', 8)
    + Lc('M120 90v12', '#5D4037', 5) + P('M88 110c0-8 14-12 32-12s32 4 32 12l6 76H82z', '#5E8C7A')
    + [[96, 120], [108, 120], [132, 120], [144, 120], [96, 132], [108, 132], [132, 132], [144, 132]].map(([x, y]) => C(x, y, 3, '#7FB59F', 2)).join('') + Lc('M84 150h72M82 180h76', '#476B5D', 3)
    + Lc('M164 96v40M188 96v40', '#A1887F', 2.5) + R(156, 134, 44, 14, '#D7A86E', 7) + R(40, 196, 160, 18, '#BDBDBD', 4) + face(120, 158, 0.4)),

  L('okapi', 'โอคาพีที่สวนสัตว์ซูราเซีย', 'An okapi at Zoorasia zoo', ['okapi', 'โอคาพี', 'zoorasia', 'สวนสัตว์ซูราเซีย', 'striped legs', 'ขาลายทาง', 'yokohama zoo', 'สวนสัตว์โยโกฮาม่า', 'forest giraffe', 'ยีราฟป่า'], nm('หาลายทางขาวดำที่ขาหลัง', 'Find the black-and-white stripes on the back legs'),
    // a chocolate-brown okapi standing sideways with big ears, a pale face, a long neck and zebra-like black-and-white stripes on its back legs, leafy branches in front of its nose
    E(124, 136, 56, 30, '#6D4C41') + Lc('M84 150v54M100 154v50', '#6D4C41', 12) + Lc('M150 154v50M166 150v54', '#FFFFFF', 12) + Lc('M144 162h12M144 176h12M144 190h12M160 162h12M160 176h12M160 190h12', '#22213A', 4)
    + P('M176 128c14 6 14 20 14 30', 'none', 4) + P('M80 120c-8-26-12-48-6-64l22 4c2 18 4 40 4 60z', '#6D4C41')
    + E(78, 54, 22, 18, '#A1887F') + E(72, 60, 18, 13, '#EFEBE9', 0) + P('M84 40c4-16 16-22 22-16-2 10-12 16-22 16z', '#8D6E63') + P('M66 40c-10-12-24-12-26-4 6 6 18 8 26 4z', '#8D6E63') + Lc('M74 38v-8M86 38v-8', '#5D4037', 4) + E(58, 62, 6, 5, '#5D4037', 0)
    + Lc('M30 70l-14-18', '#558B2F', 4) + P('M20 62c-6-10-2-18 6-18 4 8 2 14-6 18zM32 54c-2-10 4-16 12-14 0 8-4 14-12 14z', '#7CB342', 2.5) + face(76, 54, 0.3, 'none')),
];

export default {
  places: {
    'jp-yokohama': { country: 'jp', wave: 3, name: nm('โยโกฮาม่าและคามาคุระ', 'Yokohama and Kamakura'), tz: 'Asia/Tokyo', ll: [35.44, 139.64], alias: ['yokohama', 'โยโกฮาม่า', '横浜', 'Kamakura', 'เมืองคามาคุระ', '鎌倉', 'enoshima', 'เอโนชิมะ', 'minato mirai', 'minatomirai', 'มินาโตะมิไร', 'shonan', 'โชนัน', 'enoden', 'เอโนเด็น'], colors: YK },
  },
  items,
};
