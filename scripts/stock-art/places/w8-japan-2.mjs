// Wave 8, Japan part 2: Hiroshima & Kobe, Kanazawa, Hakone, Tohoku — and Vietnam (the country, Da Nang & Hoi An, Hanoi)
// Shrines and temples appear only as buildings, with no figures (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (jp/kanazawa/landmark-temari.v1.svg → jp-kanazawa.landmark.temari)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +v.toFixed(1);
const petals = (x, y, n, r, pr, c) => ring(n, (k) => { const a = k * 2 * Math.PI / n; return C(f1(x + r * Math.cos(a)), f1(y + r * Math.sin(a)), pr, c, 0); });

const items = [
  // ---------- Hiroshima, Miyajima and Kobe
  L('jp/hiroshima/landmark-kobebeef.v1.svg', 'เนื้อโกเบย่างบนกระทะเหล็กเทปปันยากิ', 'Kobe beef on the teppanyaki grill', ['kobe beef', 'เนื้อโกเบ', 'teppanyaki', 'เทปปันยากิ', 'wagyu', 'วากิว', 'marbled beef', 'เนื้อลายหินอ่อน', 'sannomiya', 'ซันโนมิยะ'], 'หาลายไขมันสีขาวเป็นเส้นๆ บนชิ้นเนื้อ', 'Find the white marbling lines in the beef',
    // a shiny steel hotplate with a thick marbled steak and little cubes beside it, golden garlic chips, two chef's spatulas crossed above, a tall white chef's hat at the back
    R(10, 120, 220, 100, '#90A4AE', 12) + R(20, 128, 200, 84, '#B0BEC5', 8, 3) + Lc('M30 140h40M150 200h50', '#ECEFF1', 3)
      + g(100, 168, 1, P('M-46-14c10-14 70-16 92-4 8 10 6 28-6 34-30 8-74 6-86-6-6-8-6-16 0-24z', '#E57373') + Lc('M-34-6c14 4 24-6 40 0s20-4 30 2M-30 10c14-4 30 4 44-2', '#FFF3E0', 3) + face(0, 2, 0.36))
      + ring(4, (k) => R(160 + (k % 2) * 22, 150 + Math.floor(k / 2) * 22, 18, 18, '#C46A5F', 3, 2.5)) + ring(5, (k) => C(46 + k * 10, 196 - (k % 2) * 6, 4, '#FFD54F', 1.5))
      + g(120, 80, 1, R(-30, -8, 18, 40, '#CFD8DC', 3) + Lc('M-21 32v30', '#5D4037', 6), -30) + g(150, 80, 1, R(-9, -8, 18, 40, '#CFD8DC', 3) + Lc('M0 32v30', '#5D4037', 6), 30)
      + g(44, 70, 1, R(-16, 0, 32, 30, '#FFFFFF') + C(-12, -6, 12, '#FFFFFF') + C(4, -12, 14, '#FFFFFF') + C(16, -4, 10, '#FFFFFF'))),
  L('jp/hiroshima/landmark-ondospiral.v1.svg', 'สะพานแดงอนโดกับทางวนก้นหอยที่คุเระ', 'The red Ondo Bridge and its spiral ramp at Kure', ['ondo bridge', 'สะพานอนโด', 'ondo ohashi', 'onto no seto', 'ช่องแคบอนโด', 'spiral ramp', 'ทางวนก้นหอย', 'loop road', 'kure', 'คุเระ'], 'หาถนนที่วนเป็นวงกลมซ้อนกันสองชั้นก่อนขึ้นสะพาน', 'Find the road that loops round twice before it climbs onto the bridge',
    // a bright red arch bridge over a narrow blue strait, its road reaching the shore through a tall double spiral loop on stilts, a tiny car on the loop, green hills
    sky('#E1F5FE') + P('M-4 120c30-30 70-36 100-24v148H-4z', '#81C784') + P('M150 110c30-16 70-14 94 0v134h-94z', '#66BB6A') + R(90, 150, 70, 94, '#29B6F6', 0, 0)
      + Lc('M102 196h40M110 218h30', '#B3E5FC', 3)
      + Lc('M98 140c20-50 120-50 140 0', '#E53935', 7) + Lc('M80 140h168', '#E53935', 6) + ring(6, (k) => Lc(`M${120 + k * 18} ${140 - [10, 24, 30, 30, 24, 10][k]}v${[10, 24, 30, 30, 24, 10][k]}`, '#E53935', 3))
      + E(56, 160, 40, 14, 'none') + Lc('M16 160a40 14 0 1 0 80 0a40 14 0 1 0-80 0', '#E53935', 7) + Lc('M16 140a40 14 0 1 0 80 0a40 14 0 1 0-80 0', '#EF5350', 7) + Lc('M96 140h-16', '#E53935', 6)
      + ring(4, (k) => Lc(`M${24 + k * 22} 168v52`, '#B0BEC5', 5)) + R(40, 128, 14, 8, '#FFCA28', 3, 2) + face(170, 128, 0.32)),
  L('jp/hiroshima/landmark-tsukemen.v1.svg', 'สึเกะเมงเผ็ดแบบฮิโรชิม่า', 'Hiroshima tsukemen, cold noodles dipped in spicy red sauce', ['hiroshima tsukemen', 'สึเกะเมงฮิโรชิม่า', 'tsukemen', 'สึเกะเมง', 'dipping noodles', 'บะหมี่จิ้ม', 'spicy red sauce', 'ซอสแดงเผ็ด', 'cold noodles', 'boiled cabbage'], 'หาถ้วยซอสสีแดงเผ็ดที่ใช้จุ่มเส้น', 'Find the cup of spicy red sauce for dipping the noodles',
    // a wide plate of cold noodles topped with boiled cabbage, sliced cucumber, spring onion and slices of pork, a small bowl of fiery red sesame-chilli sauce beside it, chopsticks lifting noodles into it
    E(96, 160, 86, 40, '#FFFFFF') + E(96, 154, 72, 30, '#ECEFF1', 3) + ring(9, (k) => Lc(`M${40 + k * 12} ${146 + (k % 3) * 6}c10 6 16-6 26 0`, '#F6D58A', 5))
      + P('M60 140c6-14 30-16 40-2-10 8-30 8-40 2z', '#C5E1A5') + ring(4, (k) => C(118 + k * 12, 140 - (k % 2) * 4, 7, '#DCEDC8', 2) + C(118 + k * 12, 140 - (k % 2) * 4, 3, '#9CCC65', 0)) + ring(3, (k) => P(`M${70 + k * 18} 164c4-10 20-10 22 0-6 6-16 6-22 0z`, '#E8B4A0', 2.5))
      + ring(6, (k) => C(84 + k * 7, 128 + (k % 2) * 4, 2.5, '#7CB342', 0))
      + g(190, 168, 1, P('M-30-8h60c0 24-14 38-30 38s-30-14-30-38z', '#FFFFFF') + E(0, -8, 30, 9, '#D32F2F') + ring(5, (k) => C(-16 + k * 8, -9 + (k % 2) * 2, 1.8, '#FFF8E1', 0)) + face(0, 14, 0.34))
      + Lc('M150 70l40 84M164 66l30 88', '#D7A86E', 4) + Lc('M188 120c-2 14 4 24 0 34', '#F6D58A', 4) + Lc('M60 96q-6-10 0-20M84 96q-6-10 0-20', '#B3E5FC', 3)),
  L('jp/hiroshima/landmark-rokkoshidare.v1.svg', 'หอชมวิวรกโกะชิดาเระบนเขารกโกะ', 'The Rokko Shidare Observatory on Mount Rokko', ['rokko shidare observatory', 'หอชมวิวรกโกะชิดาเระ', 'mount rokko', 'rokkosan', 'ภูเขารกโกะ', 'kobe night view', 'วิวกลางคืนโกเบ', 'lattice dome', 'โดมไม้ระแนง', 'tree of ice'], 'หาโดมไม้สานลายตารางบนยอดเขา', 'Find the woven lattice dome on the mountain top',
    // an egg-shaped dome woven from a criss-cross wooden lattice standing on a mountain top at dusk, a viewing deck round it, the city lights of the harbour twinkling below
    sky('#3949AB') + ring(6, (k) => C(20 + k * 40, 24 + (k % 2) * 18, 2.5, '#FFF59D', 0)) + C(206, 40, 12, '#FFF9C4', 2.5)
      + P('M-4 160c40-40 90-60 124-60s90 20 128 60v84H-4z', '#2E3B6E') + R(-4, 196, 248, 48, '#1A237E', 0, 0) + ring(16, (k) => C(10 + k * 15, 208 + (k % 3) * 10, 2.6, ['#FFD54F', '#FFF59D', '#FF8A65'][k % 3], 0))
      + R(64, 106, 112, 10, '#8D6E63', 2) + P('M80 108c-10-50 10-90 40-90s50 40 40 90z', '#ECEFF1')
      + ring(5, (k) => Lc(`M${78 + k * 12} 106c-4-40 12-70 ${32 - k * 6}-82`, '#B0BEC5', 2.5)) + ring(5, (k) => Lc(`M${162 - k * 12} 106c4-40-12-70-${32 - k * 6}-82`, '#B0BEC5', 2.5))
      + face(120, 76, 0.36)),

  // ---------- Kanazawa
  L('jp/kanazawa/landmark-museum21.v1.svg', 'พิพิธภัณฑ์ศิลปะร่วมสมัยศตวรรษที่ 21 อาคารแก้วทรงกลม', 'The round glass building of the 21st Century Museum', ['21st century museum', 'พิพิธภัณฑ์ศตวรรษที่ 21', '21st century museum of contemporary art', 'kanazawa 21', 'round museum', 'อาคารทรงกลม', 'glass walls', 'ผนังกระจก', 'museum lawn', 'สนามหญ้า'], 'หากล่องสี่เหลี่ยมที่โผล่ขึ้นมาจากหลังคาวงกลม', 'Find the boxes poking up through the round roof',
    // a low round building with all-glass walls under a flat white disc roof, several white boxes of different heights poking up through it, a wide green lawn with children running
    sky('#E3F2FD') + R(-4, 170, 248, 74, '#9CCC65', 0, 0)
      + E(120, 150, 104, 26, '#B3E5FC') + P('M16 150v20c0 30 208 30 208 0v-20', '#81D4FA') + ring(9, (k) => Lc(`M${30 + k * 22} ${158 + Math.abs(4 - k) * 0}v22`, '#E1F5FE', 2.5))
      + E(120, 148, 108, 24, '#FFFFFF') + R(60, 104, 34, 44, '#FFFFFF') + R(100, 84, 30, 64, '#F5F5F5') + R(138, 112, 44, 36, '#FFFFFF') + R(84, 126, 20, 22, '#ECEFF1')
      + face(120, 166, 0.36) + kid(40, 220, '#FF7043') + kid(196, 226, '#FFCA28')),
  L('jp/kanazawa/landmark-ninjadera.v1.svg', 'วัดนินจามโยริวจิกับบันไดลับใต้พื้น', 'Myōryū-ji, the ninja temple and its hidden stairs', ['ninja temple', 'วัดนินจา', 'ninja-dera', 'นินจาเดระ', 'myoryuji', 'myōryū-ji', 'มโยริวจิ', 'hidden stairs', 'บันไดลับ', 'secret trapdoor'], 'หาฝาไม้ที่เปิดออกจากพื้นและมีบันไดซ่อนอยู่ข้างใต้', 'Find the floorboard lifted open with a hidden staircase under it',
    // a cut-away of an old wooden building: a tatami room with a sliding door, one floorboard lifted to show a steep hidden staircase going down, a child peeking in, a little secret window high up
    P('M10 60l110-40 110 40z', '#546E7A') + R(20, 60, 200, 170, '#A1673F') + R(30, 70, 180, 70, '#FFF8E1', 0, 3) + Lc('M120 70v70', '#A1673F', 4)
      + ring(3, (k) => Lc(`M30 ${86 + k * 18}h88`, '#D7CCC8', 2)) + R(176, 76, 24, 16, '#5D4037', 2, 2.5)
      + R(30, 140, 180, 12, '#8D6E63', 0, 3) + R(30, 152, 180, 70, '#4E342E', 0, 3)
      + g(74, 140, 1, R(0, -36, 44, 10, '#BCAAA4', 2), -40) + ring(5, (k) => R(64 + k * 14, 156 + k * 12, 20, 6, '#D7A86E', 1, 2))
      + kid(150, 138, '#26A69A', 0.9) + face(120, 194, 0.36)),
  L('jp/kanazawa/landmark-jibuni.v1.svg', 'จิบุนิ สตูเป็ดของคานาซาวะ', 'Jibuni, Kanazawa\'s duck stew', ['jibuni', 'จิบุนิ', 'duck stew', 'สตูเป็ด', 'kaga cuisine', 'อาหารคางะ', 'sudare-fu', 'wheat gluten', 'แป้งหมี่กึง', 'lacquer bowl'], 'หาแผ่นแป้งที่มีลายเส้นเหมือนม่านไม้ไผ่', 'Find the flat gluten piece with stripes like a bamboo blind',
    // a red-and-black lacquer bowl with a lid leaning on it, slices of duck in thick brown gravy, a striped sheet of wheat gluten, a shiitake, green leaves and a dab of wasabi on top
    g(186, 92, 1, P('M-40 10c0-30 80-30 80 0z', '#B71C1C') + E(0, 10, 40, 8, '#212121') + C(0, -18, 6, '#B71C1C', 3), 20)
      + P('M24 120h160c0 54-36 84-80 84s-80-30-80-84z', '#B71C1C') + E(104, 120, 80, 18, '#212121') + E(104, 122, 70, 13, '#8D5524', 0)
      + R(56, 104, 40, 24, '#F5DEB3', 3) + ring(4, (k) => Lc(`M${62 + k * 9} 106v20`, '#D7B98E', 2.5))
      + [[118, 112], [146, 118]].map(([x, y]) => P(`M${x - 16} ${y}c4-12 28-12 32 0-8 8-24 8-32 0z`, '#A1665E')).join('')
      + E(100, 102, 14, 8, '#6D4C41') + E(132, 100, 12, 6, '#43A047') + C(118, 98, 5, '#AED581', 2) + Lc('M40 150q64 20 128 0', '#FFC107', 3) + face(104, 168, 0.42)),
  L('jp/kanazawa/landmark-temari.v1.svg', 'ลูกบอลด้ายปักคางะเทมาริ', 'Kaga temari, the embroidered thread balls', ['kaga temari', 'คางะเทมาริ', 'temari', 'เทมาริ', 'thread ball', 'ลูกบอลด้าย', 'embroidered ball', 'ลูกบอลปัก', 'kanazawa crafts', 'งานฝีมือคานาซาวะ'], 'หาลายดาวแฉกที่ปักด้วยด้ายหลายสีบนลูกบอล', 'Find the star pattern sewn in many colours on the ball',
    // three round balls wound in thread and stitched with bright geometric star and band patterns, sitting in a low wooden tray, a loose thread with a needle
    R(20, 186, 200, 24, '#A1673F', 8)
      + [[66, 150, 46, '#C62828', '#FFD54F'], [168, 156, 40, '#1565C0', '#F48FB1'], [120, 92, 40, '#FFFFFF', '#43A047']].map(([x, y, r, c, d]) => C(x, y, r, c, 4)
        + ring(8, (k) => { const a = k * Math.PI / 4; return Lc(`M${x} ${y}L${f1(x + r * 0.95 * Math.cos(a))} ${f1(y + r * 0.95 * Math.sin(a))}`, d, 3); })
        + ring(8, (k) => { const a = k * Math.PI / 4 + Math.PI / 8; return P(`M${x} ${y}L${f1(x + r * 0.6 * Math.cos(a - 0.3))} ${f1(y + r * 0.6 * Math.sin(a - 0.3))}L${f1(x + r * 0.85 * Math.cos(a))} ${f1(y + r * 0.85 * Math.sin(a))}L${f1(x + r * 0.6 * Math.cos(a + 0.3))} ${f1(y + r * 0.6 * Math.sin(a + 0.3))}z`, '#FFF59D', 0); })
        + C(x, y, 7, d, 2.5)).join('')
      + face(66, 166, 0.4) + Lc('M200 110c10-20 30-20 34 0', '#E91E63', 3) + Lc('M230 96l-8 24', '#90A4AE', 3)),
  L('jp/kanazawa/landmark-shinmon.v1.svg', 'ประตูชินมงกระจกสีของศาลเจ้าโอยามะ', 'The stained-glass Shinmon gate of Oyama Shrine', ['oyama shrine', 'ศาลเจ้าโอยามะ', 'shinmon gate', 'ประตูชินมง', 'stained glass gate', 'ประตูกระจกสี', 'oyama jinja', 'three-storey gate', 'ประตูสามชั้น', 'old lighthouse gate'], 'หากระจกสีที่ชั้นบนสุดของประตู', 'Find the coloured glass windows on the very top of the gate',
    // a tall three-storey gate: a stone base with three round arches, a white middle storey, a top storey of red, blue and yellow glass panes under a little copper roof and spike
    sky('#FFF8E1') + R(-4, 210, 248, 34, '#BCAAA4', 0, 0)
      + R(46, 140, 148, 72, '#CFD8DC') + ring(3, (k) => P(`M${62 + k * 42} 212v-36c0-20 28-20 28 0v36z`, '#5D4037')) + Lc('M46 152h148', '#B0BEC5', 3)
      + R(66, 98, 108, 44, '#FFFFFF') + P('M56 100l10-10h108l10 10z', '#4DB6AC') + ring(4, (k) => R(78 + k * 24, 108, 14, 24, '#FFF3E0', 0, 2.5))
      + R(86, 54, 68, 38, '#FFFFFF') + ring(6, (k) => R(90 + (k % 3) * 20, 58 + Math.floor(k / 3) * 16, 18, 14, ['#E53935', '#1E88E5', '#FFC107'][(k + Math.floor(k / 3)) % 3], 0, 2))
      + P('M78 56l14-14h56l14 14z', '#4DB6AC') + Lc('M120 42V20', '#455A64', 3) + C(120, 18, 3, '#FFD54F', 2) + face(120, 182, 0.34)),

  // ---------- Hakone
  L('jp/hakone/landmark-amazakechaya.v1.svg', 'ร้านน้ำชาอามาซาเกะจายะบนถนนโบราณฮาโกเน่', 'Amazake-chaya, the old teahouse on the Hakone road', ['amazake chaya', 'อามาซาเกะจายะ', 'amazake', 'อามาซาเกะ', 'sweet rice drink', 'เครื่องดื่มข้าวหวาน', 'old tokaido', 'ถนนโทไกโดเก่า', 'thatched teahouse', 'ร้านน้ำชาหลังคาฟาง'], 'หาถ้วยเครื่องดื่มสีขาวที่มีไอลอยขึ้นมา', 'Find the cup of white drink with steam rising from it',
    // a low thatched teahouse with a hanging cloth curtain at the door, a wooden bench outside, cedar trees behind, and a big cup of steaming white amazake in front
    sky('#E8F5E9') + ring(4, (k) => P(`M${10 + k * 64} 120l20-80 20 80z`, '#2E7D32')) + R(-4, 184, 248, 60, '#BCAAA4', 0, 0)
      + R(30, 110, 150, 76, '#8D6E63') + P('M14 116c20-46 162-46 182 0z', '#C9A15A') + ring(6, (k) => Lc(`M${40 + k * 24} 82l-4 30`, '#A88445', 2.5))
      + R(70, 128, 60, 58, '#3E2723') + ring(3, (k) => R(72 + k * 20, 128, 16, 26, '#1565C0', 0, 2)) + R(142, 132, 28, 28, '#FFF8E1', 0, 2.5)
      + R(140, 170, 80, 10, '#D7A86E', 2) + Lc('M150 180v14M210 180v14', '#8D6E63', 4)
      + g(60, 206, 1, P('M-20-20h40l-4 26h-32z', '#ECEFF1') + E(0, -20, 20, 5, '#FFFDE7') + face(0, -6, 0.34) + Lc('M-6-30q-6-8 0-16M6-30q-6-8 0-16', '#B0BEC5', 3))),
  L('jp/hakone/landmark-ekiden.v1.svg', 'วิ่งผลัดฮาโกเน่เอกิเด็นขึ้นภูเขา', 'The Hakone Ekiden relay up the mountain', ['hakone ekiden', 'ฮาโกเน่เอกิเด็น', 'ekiden', 'เอกิเด็น', 'relay race', 'วิ่งผลัด', 'tasuki sash', 'สายสะพาย', 'new year race', 'แข่งวิ่งปีใหม่'], 'หาสายสะพายที่นักวิ่งกำลังส่งต่อกัน', 'Find the sash being handed from one runner to the next',
    // a road zigzagging up a mountain, two runners in team vests at the hand-over, one passing a coloured sash to the other, a small crowd with little flags on the side
    sky('#E3F2FD') + P('M-4 120l70-60 60 30 50-50 68 60v144H-4z', '#81C784') + Lc('M240 230c-80-10-120-30-60-60s20-50-40-60-50-30-10-50', '#ECEFF1', 18) + Lc('M240 230c-80-10-120-30-60-60s20-50-40-60-50-30-10-50', '#B0BEC5', 2)
      + [[70, 196, '#1565C0', -10], [128, 192, '#E53935', 10]].map(([x, y, c, r]) => g(x, y, 1, C(0, -46, 10, '#FFE0BD', 2.5) + P('M-12-34h24v26h-24z', c, 2.5) + Lc('M-6-8l-8 20M6-8l10 18', '#FFE0BD', 5) + Lc('M-12-30l-12 14M12-30l12 10', '#FFE0BD', 5) + face(0, -46, 0.26), r)).join('')
      + Lc('M76 166c10-10 26-14 40-6', '#FFC107', 6) + Lc('M58 166l20-32', '#FFC107', 5)
      + ring(5, (k) => g(160 + k * 14, 222, 0.6, C(0, -20, 8, '#FFE0BD', 2) + R(-8, -12, 16, 14, ['#FF7043', '#26A69A', '#FFCA28'][k % 3], 2, 2) + Lc('M8-20l8-14', '#8D6E63', 2) + R(14, -40, 12, 8, '#FFFFFF', 0, 2)))),
  L('jp/hakone/landmark-umeboshi.v1.svg', 'บ๊วยดองอุเมะโบชิของโอดาวาระ', 'Odawara umeboshi, sour pickled plums', ['umeboshi', 'อุเมะโบชิ', 'pickled plum', 'บ๊วยดอง', 'odawara', 'โอดาวาระ', 'sour plum', 'บ๊วยเปรี้ยว', 'red shiso', 'ใบชิโสะแดง'], 'หาบ๊วยดองที่ทำหน้าเปรี้ยวจี๊ด', 'Find the pickled plum pulling a super-sour face',
    // a round pottery jar with its lid off full of wrinkled red pickled plums and purple shiso leaves, one big plum in front making a puckered sour face, a little white plum blossom
    P('M30 96h120c10 0 16 10 14 20l-10 80c-2 12-12 18-24 18H50c-12 0-22-6-24-18l-10-80c-2-10 4-20 14-20z', '#A1887F') + Lc('M24 130h132', '#8D6E63', 3) + E(90, 96, 62, 14, '#5D4037')
      + ring(6, (k) => C(48 + k * 17, 90 - (k % 2) * 8, 13, '#C62828', 2.5)) + ring(3, (k) => P(`M${54 + k * 34} 80c10-14 26-10 30 4-14 6-24 4-30-4z`, '#8E24AA', 2))
      + g(178, 176, 1, C(0, 0, 40, '#D32F2F', 4) + Lc('M-24-14q6 6 0 12M20-20q-4 8 2 14M-8 22q8 4 16 0', '#B71C1C', 2.5) + Lc('M-18-8l8 4M18-8l-8 4', '#212121', 3.5) + E(0, 14, 5, 6, '#7F0000', 2) + E(-22, 6, 6, 3.5, '#FF8FA3', 0) + E(22, 6, 6, 3.5, '#FF8FA3', 0))
      + petals(196, 60, 5, 9, 8, '#FFFFFF') + C(196, 60, 4, '#FFD54F', 2) + ring(5, (k) => { const a = k * 2 * Math.PI / 5; return C(f1(196 + 9 * Math.cos(a)), f1(60 + 9 * Math.sin(a)), 8, 'none', 2); })),
  L('jp/hakone/landmark-onsenmanju.v1.svg', 'ขนมมันจูนึ่งร้อนๆ ย่านฮาโกเน่ยูโมโตะ', 'Steamed onsen manjū in Hakone-Yumoto', ['onsen manju', 'onsen manjū', 'ออนเซ็นมันจู', 'steamed bun', 'ขนมนึ่ง', 'hakone yumoto', 'ฮาโกเน่ยูโมโตะ', 'brown sugar bun', 'ขนมน้ำตาลทรายแดง', 'red bean'], 'หาขนมกลมสีน้ำตาลที่วางอยู่ในเข่งนึ่งไม้', 'Find the round brown buns sitting in the wooden steamer',
    // a round wooden steaming basket with its lid tilted, small round brown buns inside with steam billowing up, one bun broken open showing the red bean inside
    P('M24 130h180v50c0 12-10 20-22 20H46c-12 0-22-8-22-20z', '#D7A86E') + Lc('M24 160h180', '#A1673F', 3) + E(114, 130, 90, 18, '#EFD9A8')
      + [[64, 124], [104, 122], [144, 124], [84, 110], [124, 108], [164, 112]].map(([x, y]) => E(x, y, 20, 13, '#8D5524', 3) + E(x - 4, y - 5, 7, 3, '#A1673F', 0)).join('')
      + g(120, 54, 1, P('M-70 20c0-26 140-26 140 0z', '#D7A86E') + Lc('M-60 14h120', '#A1673F', 3), -8) + ring(3, (k) => Lc(`M${80 + k * 34} 96q-10-12 0-24t0-24`, '#ECEFF1', 6))
      + g(208, 196, 1, P('M-24 10c0-24 22-28 24-14 2-14 24-10 24 14z', '#8D5524') + E(0, 4, 12, 7, '#6A1B1A', 0)) + face(114, 176, 0.4)),
  L('jp/hakone/landmark-odawaracastle.v1.svg', 'ปราสาทโอดาวาระกับดอกซากุระ', 'Odawara Castle in cherry blossom', ['odawara castle', 'ปราสาทโอดาวาระ', 'odawara', 'โอดาวาระ', 'castle keep', 'หอปราสาท', 'cherry blossom', 'ดอกซากุระ', 'castle park', 'moat'], 'หาสะพานไม้สีแดงที่ข้ามคูน้ำไปหาปราสาท', 'Find the red wooden bridge crossing the moat to the castle',
    // a white castle keep with three dark-tiled roofs on a sloping stone base, pink cherry trees either side, a red wooden bridge over a green moat in front
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#80CBC4', 0, 0) + Lc('M20 222h40M170 228h40', '#B2DFDB', 3)
      + P('M50 170l12-40h116l12 40z', '#B0BEC5') + ring(4, (k) => Lc(`M${60 + k * 4} ${160 - k * 8}h${120 - k * 8}`, '#90A4AE', 2))
      + R(76, 102, 88, 32, '#FFFFFF') + P('M64 106l16-14h80l16 14z', '#37474F') + R(88, 70, 64, 26, '#FFFFFF') + P('M78 74l14-12h56l14 12z', '#37474F') + R(98, 44, 44, 22, '#FFFFFF') + P('M88 48l16-16h32l16 16z', '#37474F')
      + ring(3, (k) => R(88 + k * 24, 110, 12, 14, '#455A64', 0, 2)) + P('M98 32l-6-8M142 32l6-8', '#FFD54F', 3)
      + [[24, 160], [216, 160]].map(([x, y]) => Lc(`M${x} ${y + 40}v-30`, '#6D4C41', 6) + C(x, y, 26, '#F8BBD0') + C(x - 14, y + 6, 14, '#F48FB1') + C(x + 12, y - 10, 12, '#FCE4EC')).join('')
      + P('M84 196q36-20 72 0', 'none') + Lc('M84 196q36-20 72 0', '#E53935', 7) + ring(3, (k) => Lc(`M${98 + k * 22} 190v14`, '#C62828', 3)) + face(120, 116, 0.32)),

  // ---------- Tohoku
  L('jp/tohoku/landmark-gyutan.v1.svg', 'กิวตัน ลิ้นวัวย่างของเซนได', 'Gyūtan, Sendai\'s grilled beef tongue', ['gyutan', 'gyūtan', 'กิวตัน', 'beef tongue', 'ลิ้นวัวย่าง', 'sendai food', 'อาหารเซนได', 'barley rice', 'ข้าวบาร์เลย์', 'oxtail soup'], 'หารอยตะแกรงย่างบนชิ้นเนื้อ', 'Find the grill marks on the slices of meat',
    // a square tray with slices of grilled beef tongue fanned out with dark grill lines, a bowl of barley rice, a little bowl of clear soup with green onion, pickled cabbage and a green chilli
    R(14, 100, 212, 120, '#3E2723', 12) + R(22, 108, 196, 104, '#5D4037', 8, 2.5)
      + E(84, 156, 54, 32, '#FFFFFF') + ring(4, (k) => g(56 + k * 18, 152 + (k % 2) * 6, 1, E(0, 0, 18, 26, '#C08D79', 3) + Lc('M-12-12l20 10M-14 2l22 10', '#6D4C41', 3), -20)) + P('M108 130c10-6 20 0 22 10l-8 12z', '#81C784', 2.5)
      + C(172, 136, 26, '#FFFFFF') + ring(10, (k) => E(156 + (k % 4) * 10, 128 + Math.floor(k / 4) * 9, 4, 2.5, '#F5DEB3', 1.5))
      + C(178, 186, 20, '#B71C1C') + C(178, 186, 15, '#FFE0B2', 0) + ring(4, (k) => C(170 + k * 5, 184 - (k % 2) * 4, 2.4, '#7CB342', 0))
      + Lc('M40 70q10-12 0-24M64 72q10-12 0-24', '#B0BEC5', 4) + face(84, 186, 0.34)),
  L('jp/tohoku/landmark-zunda.v1.svg', 'ซุนดะโมจิ โมจิราดถั่วแระบดสีเขียว', 'Zunda mochi with sweet green edamame paste', ['zunda mochi', 'ซุนดะโมจิ', 'zunda', 'ซุนดะ', 'edamame paste', 'ถั่วแระบด', 'green bean paste', 'ถั่วเขียวบด', 'sendai sweets', 'ขนมเซนได'], 'หาฝักถั่วแระสีเขียวที่วางข้างจาน', 'Find the green edamame pods beside the plate',
    // a small round plate with soft white rice cakes smothered in bright green mashed edamame paste with whole beans showing, edamame pods and a wooden pick beside it
    E(110, 160, 96, 34, '#FFF8E1') + E(110, 154, 80, 26, '#FFFFFF', 3)
      + [[80, 140], [130, 136], [104, 122]].map(([x, y]) => E(x, y, 30, 18, '#FFFFFF') + P(`M${x - 30} ${y}c4-22 56-22 60 0-6 10-54 10-60 0z`, '#9CCC65') + ring(3, (k) => E(x - 12 + k * 12, y - 6 + (k % 2) * 4, 4, 3, '#7CB342', 1.5))).join('')
      + face(104, 134, 0.4)
      + [[196, 92, 30], [178, 70, -20]].map(([x, y, r]) => g(x, y, 1, P('M-28 0c0-12 56-12 56 0s-56 12-56 0z', '#AED581') + C(-14, 0, 6, '#9CCC65', 2) + C(0, 0, 6, '#9CCC65', 2) + C(14, 0, 6, '#9CCC65', 2), r)).join('')
      + Lc('M30 210l50-30', '#D7A86E', 4)),
  L('jp/tohoku/landmark-kiritanpo.v1.svg', 'คิริทันโปะ ข้าวเสียบไม้ย่างไฟของอาคิตะ', 'Kiritanpo, Akita\'s grilled rice sticks', ['kiritanpo', 'คิริทันโปะ', 'akita', 'อาคิตะ', 'grilled rice sticks', 'ข้าวเสียบไม้ย่าง', 'irori hearth', 'เตาผิงอิโรริ', 'cedar skewers', 'kiritanpo nabe'], 'หาแท่งข้าวที่ปักรอบเตาไฟเป็นวงกลม', 'Find the rice sticks stuck in a circle round the fire',
    // a square sunken hearth of ash with glowing coals in the middle, tubes of mashed rice on cedar sticks stuck in the ash leaning towards the fire, toasted brown spots, a pot hook hanging above
    R(14, 120, 212, 104, '#8D6E63', 6) + R(30, 136, 180, 72, '#BDBDBD', 4, 3) + ring(5, (k) => C(96 + k * 12, 172 + (k % 2) * 6, 7, ['#FF7043', '#FFB300'][k % 2], 2))
      + P('M110 160c-6-14 4-24 10-30 4 10 12 18 6 30z', '#FFB300', 2)
      + [-60, -38, -16, 16, 38, 60].map((d, k) => g(120 + d, 166, 1, Lc('M0 30V-50', '#D7A86E', 4) + R(-8, -60, 16, 50, '#FFF8E1', 8, 3) + C(-2, -46, 2.5, '#C68642', 0) + C(3, -30, 3, '#C68642', 0) + C(-3, -20, 2, '#C68642', 0), d * 0.4)).join('')
      + Lc('M120 0v86', '#5D4037', 4) + Lc('M108 86h24', '#5D4037', 4) + face(120, 196, 0.32)),
  L('jp/tohoku/landmark-nanbutekki.v1.svg', 'กาเหล็กหล่อนัมบุเท็กกิแห่งโมริโอกะ', 'A Nanbu tekki cast-iron kettle from Morioka', ['nanbu tekki', 'นัมบุเท็กกิ', 'cast iron kettle', 'กาเหล็กหล่อ', 'tetsubin', 'เท็ตสึบิน', 'morioka', 'โมริโอกะ', 'iwate crafts', 'arare pattern'], 'หาปุ่มเล็กๆ ทั่วตัวกาเหล็กสีดำ', 'Find the little bumps all over the black iron kettle',
    // a round black cast-iron kettle covered in rows of small raised dots, an arched iron handle, a short spout puffing steam, sitting on a wooden trivet
    R(40, 196, 160, 18, '#A1673F', 6) + P('M44 140c0-50 152-50 152 0 0 34-34 56-76 56s-76-22-76-56z', '#37474F')
      + ring(4, (k) => ring(9 - (k === 0 ? 2 : 0), (j) => C(62 + j * 15 + (k === 0 ? 15 : 0) + (k % 2) * 7, 126 + k * 16, 3.6, '#546E7A', 1.5)))
      + E(120, 100, 40, 10, '#263238') + C(120, 92, 8, '#455A64') + P('M190 140c18-6 30-20 34-36l8 4c-4 22-18 38-36 42z', '#37474F')
      + Lc('M64 112c0-70 112-70 112 0', '#455A64', 8) + Lc('M226 90q-8-12 0-24t0-24', '#B0BEC5', 4) + face(120, 166, 0.42)),
  L('jp/tohoku/landmark-akabeko.v1.svg', 'อะคะเบโกะ ตุ๊กตาวัวแดงหัวผงกของไอซุ', 'Akabeko, the nodding red cow toy of Aizu', ['akabeko', 'อะคะเบโกะ', 'red cow', 'วัวแดง', 'nodding toy', 'ของเล่นหัวผงก', 'aizu', 'aizuwakamatsu', 'ไอซุวากามัตสึ', 'papier-mache'], 'หาหัววัวที่ผงกขึ้นลงได้', 'Find the cow\'s head that bobs up and down',
    // a round red papier-mache cow with black and gold dots painted on its back, a separate head on a spring tilted mid-nod with motion lines, little black horns, standing on short legs
    E(120, 216, 80, 10, '#E0E0E0', 0)
      + R(64, 176, 14, 34, '#C62828', 4) + R(152, 176, 14, 34, '#C62828', 4) + R(84, 180, 14, 30, '#C62828', 4) + R(134, 180, 14, 30, '#C62828', 4)
      + E(116, 154, 66, 38, '#E53935') + ring(5, (k) => C(84 + k * 16, 140 + (k % 2) * 14, 6, k % 2 ? '#212121' : '#FFC107', 2)) + Lc('M54 152l-14 20', '#212121', 4)
      + g(188, 120, 1, E(0, 0, 32, 28, '#E53935') + P('M-20-24l-8-14M20-24l8-14', 'none') + Lc('M-18-22l-6-14M18-22l6-14', '#212121', 5) + E(0, 14, 18, 10, '#FFFFFF', 3) + C(-6, 14, 2.4, '#212121', 0) + C(6, 14, 2.4, '#212121', 0) + face(0, -6, 0.42), 14)
      + Lc('M222 92q8 10 4 20M226 136q8 8 2 18', '#FF8A65', 3)),

  // ---------- Vietnam (the country)
  K('vn.food.banhchung', 'บั๊ญจึง ขนมข้าวเหนียวห่อใบตองสี่เหลี่ยมวันตรุษเต็ด', 'Bánh chưng, the square sticky rice cake for Tết', ['banh chung', 'bánh chưng', 'บั๊ญจึง', 'tet', 'tết', 'เต็ด', 'lunar new year', 'ตรุษญวน', 'sticky rice cake', 'ขนมข้าวเหนียว'],
    // a square cake wrapped in green dong leaves and tied with pale bamboo strips, one quarter cut open showing green-tinted sticky rice, a yellow mung bean layer and pork in the middle
    P('M40 70h120l30 30v100H70l-30-30z', '#2E7D32') + P('M40 70h120v100H40z', '#43A047') + P('M160 70l30 30v100l-30-30z', '#2E7D32')
      + Lc('M40 104h120l30 30M40 136h120l30 30M86 70v100l30 30M120 70v100l30 30', '#E6D3A3', 5)
      + face(84, 130, 0.5)
      + g(176, 186, 1, R(-30, -30, 52, 52, '#C5E1A5') + R(-22, -22, 36, 36, '#FFD54F', 0, 2.5) + R(-12, -12, 16, 16, '#BC8A7E', 2, 2) + P('M-30-30h52v6h-52z', '#2E7D32', 2))),
  K('vn.culture.danbau', 'ด่านเบ๋า พิณสายเดียวของเวียดนาม', 'The đàn bầu, Vietnam\'s one-string zither', ['dan bau', 'đàn bầu', 'ด่านเบ๋า', 'monochord', 'พิณสายเดียว', 'one-string zither', 'vietnamese music', 'ดนตรีเวียดนาม', 'traditional instrument', 'เครื่องดนตรีพื้นบ้าน'],
    // a long wooden box zither with one shining string, a curved flexible rod with a small gourd standing up at one end, music notes floating above
    g(120, 150, 1, P('M-100 0h200l-6 30h-188z', '#A1673F') + R(-100, -10, 200, 12, '#C68642', 4) + Lc('M-84-6h162', '#FFFFFF', 2) + C(-90, -4, 4, '#FFD54F', 2)
      + Lc('M80-6c0-40-12-60-20-80', '#5D4037', 5) + E(76, -40, 12, 16, '#FFB74D') + E(76, -54, 5, 5, '#FFB74D', 2) + face(0, 14, 0.42), -8)
      + [[40, 60], [84, 44], [130, 64]].map(([x, y]) => C(x, y, 7, '#5C6BC0', 2) + Lc(`M${x + 6} ${y}v-24l12 6`, '#5C6BC0', 3)).join('')),
  K('vn.food.che', 'แจ ขนมหวานสามสีในแก้ว', 'Chè ba màu, the three-colour sweet drink', ['che', 'chè', 'แจ', 'che ba mau', 'chè ba màu', 'three-colour dessert', 'ขนมหวานสามสี', 'coconut milk', 'กะทิ', 'pandan jelly'],
    // a tall glass with layers of red beans, green pandan jelly strands, yellow mung bean paste and white coconut milk, crushed ice on top and a long spoon
    P('M70 50h100l-12 170H82z', '#E1F5FE') + P('M80 170h80l-4 50H84z', '#B23B3B', 0) + ring(6, (k) => C(88 + k * 12, 196 + (k % 2) * 10, 5, '#8E2B2B', 0))
      + P('M76 120h88l-4 50H80z', '#9CCC65', 0) + ring(6, (k) => Lc(`M${84 + k * 13} 124c4 14-4 30 2 42`, '#7CB342', 4))
      + P('M74 92h92l-2 28H76z', '#FFD54F', 0) + P('M72 66h96l-2 26H74z', '#FFFFFF', 0) + ring(5, (k) => P(`M${76 + k * 18} 64l8-14 10 12z`, '#E1F5FE', 2))
      + P('M70 50h100l-12 170H82z', 'none') + Lc('M150 30l-20 150', '#B0BEC5', 6) + E(150, 28, 8, 5, '#B0BEC5', 2.5) + face(120, 144, 0.46)),
  // ---------- Da Nang & Hoi An
  L('vn/danang/landmark-caolau.v1.svg', 'กาวเหลา ก๋วยเตี๋ยวเส้นเหนียวของฮอยอัน', 'Cao lầu, Hội An\'s chewy noodles', ['cao lau', 'cao lầu', 'กาวเหลา', 'hoi an noodles', 'ก๋วยเตี๋ยวฮอยอัน', 'chewy noodles', 'เส้นเหนียว', 'char siu pork', 'หมูแดง', 'crispy croutons'], 'หาแผ่นแป้งกรอบสี่เหลี่ยมที่โรยอยู่บนเส้น', 'Find the crispy square crackers sprinkled on the noodles',
    // a blue-patterned bowl of thick yellow noodles with only a little broth, slices of pork, fresh herbs and bean sprouts, crispy square crackers on top, a little dish of chilli
    P('M20 120h184c0 50-40 84-92 84s-92-34-92-84z', '#FFFFFF') + Lc('M38 156q20 10 40 2M100 166q20 4 40 0M150 158q20-4 36-12', '#1E88E5', 3)
      + E(112, 120, 92, 20, '#8D6E63') + ring(8, (k) => Lc(`M${40 + k * 20} 122c6-10 12 6 18-4`, '#FFD54F', 6))
      + [[76, 112], [104, 106], [132, 110]].map(([x, y]) => P(`M${x - 14} ${y + 6}c4-14 24-14 28 0z`, '#C1583F') + Lc(`M${x - 10} ${y + 2}h20`, '#FFCCBC', 2)).join('')
      + ring(4, (k) => g(150 + k * 12, 102 + (k % 2) * 8, 1, R(-7, -7, 14, 14, '#E8B04B', 2, 2), k * 20)) + P('M44 110c10-18 26-18 30 0z', '#66BB6A') + P('M164 118c6-16 22-18 28-2z', '#43A047')
      + E(210, 196, 18, 7, '#FFFFFF') + E(210, 194, 12, 4, '#E53935', 0) + face(112, 166, 0.45)),
  L('vn/danang/landmark-whiterose.v1.svg', 'บั๊ญบ๋าวบั๊ญหวัก ขนมจีบกุหลาบขาวของฮอยอัน', 'White rose dumplings of Hội An', ['white rose dumplings', 'ขนมจีบกุหลาบขาว', 'banh bao banh vac', 'bánh bao bánh vạc', 'บั๊ญบ๋าวบั๊ญหวัก', 'shrimp dumplings', 'ขนมจีบกุ้ง', 'crispy shallots', 'hoi an specialty'], 'หาไส้กุ้งสีชมพูตรงกลางกลีบแป้งสีขาว', 'Find the pink shrimp filling in the middle of the white petals',
    // a round plate of see-through white dumplings pinched into rose shapes, pink shrimp filling in each centre, sprinkled with crispy golden shallots, a bowl of dipping sauce with chilli
    E(110, 150, 98, 50, '#FFFFFF') + E(110, 146, 86, 42, '#E8F5E9', 3)
      + [[66, 140], [110, 128], [154, 140], [88, 168], [134, 168]].map(([x, y]) => P(`M${x - 22} ${y}c0-14 10-20 22-20s22 6 22 20c0 10-10 16-22 16s-22-6-22-16z`, '#FAFAFA') + P(`M${x - 14} ${y - 4}q14-10 28 0`, 'none') + C(x, y, 8, '#F8A5A5', 2.5) + ring(3, (k) => C(x - 10 + k * 10, y + 10, 2.4, '#D9952E', 0))).join('')
      + E(206, 82, 26, 12, '#FFFFFF') + E(206, 80, 18, 7, '#E8A33D', 0) + C(200, 78, 2.5, '#E53935', 0) + C(212, 80, 2.5, '#E53935', 0) + face(110, 160, 0.28)),
  L('vn/danang/landmark-haivan.v1.svg', 'ช่องเขาไห่เวิน ถนนคดเคี้ยวเหนือทะเล', 'The Hải Vân Pass, the winding road above the sea', ['hai van pass', 'hải vân pass', 'ช่องเขาไห่เวิน', 'hai van gate', 'ประตูไห่เวิน', 'mountain pass', 'ถนนข้ามเขา', 'motorbike ride', 'ขี่มอเตอร์ไซค์', 'coastal road'], 'หาประตูเมืองเก่าบนยอดช่องเขา', 'Find the old stone gate at the top of the pass',
    // a green mountain dropping into a blue sea, a road winding in loops up its side, an old stone gateway with a little roof at the top, a scooter on the road and clouds drifting below the summit
    sky('#E1F5FE') + R(-4, 150, 248, 94, '#29B6F6', 0, 0) + Lc('M20 200h40M150 220h60', '#B3E5FC', 3)
      + P('M-4 244V120c40-40 70-70 120-80 40 20 80 60 128 120v84z', '#66BB6A') + P('M60 180c20-40 30-60 56-80 30 30 60 60 80 100z', '#43A047', 0)
      + Lc('M240 236c-60 4-150-10-120-40s100-10 70-40-110-10-90-40 50-20 30-44', '#ECEFF1', 10) + Lc('M240 236c-60 4-150-10-120-40s100-10 70-40-110-10-90-40 50-20 30-44', '#B0BEC5', 1.5)
      + g(116, 46, 1, R(-22, -16, 44, 28, '#BCAAA4') + P('M-8 12v-12c0-10 16-10 16 0v12z', '#5D4037') + P('M-28-14l28-14 28 14z', '#6D4C41') + face(0, -6, 0.24))
      + E(40, 96, 26, 8, '#FFFFFF', 2.5) + E(200, 80, 22, 7, '#FFFFFF', 2.5) + g(152, 164, 0.7, C(-10, 8, 6, '#424242', 2) + C(10, 8, 6, '#424242', 2) + P('M-12 4h22l-6-12h-10z', '#E53935', 2) + C(0, -16, 6, '#FFE0BD', 2))),
  L('vn/danang/landmark-fujianhall.v1.svg', 'ประตูสมาคมฮกเกี้ยน ฮอยอัน', 'The gate of the Fujian Assembly Hall in Hội An', ['fujian assembly hall', 'สมาคมฮกเกี้ยน', 'phuc kien', 'phúc kiến', 'ฟุกเกียน', 'assembly hall gate', 'ประตูสมาคม', 'green tiled roof', 'หลังคากระเบื้องเขียว', 'hoi an old town'], 'หาหลังคากระเบื้องสีเขียวที่ปลายงอนขึ้นเป็นเกลียว', 'Find the green tiled roofs with tips that curl up',
    // a bright triple gate with yellow walls, red pillars and three tiers of green glazed tile roofs with curling tips, round doors, potted bonsai trees either side
    sky('#FFF8E1') + R(-4, 206, 248, 38, '#D7CCC8', 0, 0)
      + R(30, 130, 180, 78, '#FFD54F') + ring(4, (k) => R(42 + k * 48 + (k > 1 ? 4 : 0), 130, 12, 78, '#C62828', 0, 3))
      + P('M96 208v-40c0-30 48-30 48 0v40z', '#5D4037') + C(66, 168, 12, '#5D4037') + C(174, 168, 12, '#5D4037')
      + P('M14 134c20 0 30-12 106-12s86 12 106 12l-14-22H28z', '#43A047') + Lc('M14 134q-4-14 6-18M226 134q4-14-6-18', '#2E7D32', 5)
      + R(66, 92, 108, 22, '#FFD54F') + P('M48 96c16 0 24-10 72-10s56 10 72 10l-12-18H60z', '#43A047') + Lc('M48 96q-4-12 6-16M192 96q4-12-6-16', '#2E7D32', 5)
      + P('M94 64h52l10 14H84z', '#43A047') + Lc('M110 60h20', '#FFC107', 5) + face(120, 104, 0.32)
      + [[18], [222]].map(([x]) => R(x - 12, 186, 24, 20, '#8D6E63', 3) + C(x, 176, 12, '#2E7D32')).join('')),
  L('vn/danang/landmark-kimbong.v1.svg', 'หมู่บ้านช่างไม้กิมโบ่ง ต่อเรือไม้ริมแม่น้ำ', 'Kim Bồng carpentry village and its wooden boats', ['kim bong', 'kim bồng', 'กิมโบ่ง', 'carpentry village', 'หมู่บ้านช่างไม้', 'boat building', 'ต่อเรือไม้', 'cam kim island', 'เกาะกามกิม', 'wood carving'], 'หาเรือไม้ลำใหม่ที่ยังวางอยู่บนขาตั้ง', 'Find the new wooden boat still sitting on its stand',
    // a half-built wooden boat on trestles on the riverbank, its ribs showing at one end, planks and a mallet nearby, curly wood shavings, painted eyes on the bow, the river and palms behind
    sky('#E8F5E9') + R(-4, 120, 248, 40, '#4FC3F7', 0, 0) + R(-4, 156, 248, 88, '#D7B98E', 0, 0) + Lc('M20 136h40M150 140h40', '#B3E5FC', 3)
      + Lc('M210 120c4-30-2-50 6-80', '#6D4C41', 5) + ring(4, (k) => Lc(`M216 40q${-30 + k * 20} -10 ${-34 + k * 22} 14`, '#2E7D32', 5))
      + [[60], [170]].map(([x]) => Lc(`M${x - 14} 200l14-30 14 30`, '#8D6E63', 5)).join('')
      + P('M20 150c30 30 170 30 196 0l-8 22c-30 14-150 14-180 0z', '#C68642') + P('M20 150h196l-8 22c-30 14-150 14-180 0z', '#D7A86E') + ring(4, (k) => Lc(`M${150 + k * 14} 150c-2 10 0 22 4 30`, '#8D5524', 3))
      + C(42, 160, 5, '#FFFFFF', 2) + C(42, 160, 2.4, '#212121', 0) + Lc('M26 156h170', '#E53935', 3)
      + R(30, 210, 70, 10, '#C68642', 2) + g(140, 218, 1, R(-14, -8, 28, 14, '#8D6E63', 3) + Lc('M0 6v22', '#5D4037', 4), -20) + ring(4, (k) => P(`M${170 + k * 12} 222c-6-6 0-12 6-6s0 10-6 6`, '#F5DEB3', 2))
      + face(110, 166, 0.36)),

  // ---------- Hanoi and Halong Bay
  L('vn/hanoi/landmark-flowerbike.v1.svg', 'จักรยานขายดอกไม้ในย่านเมืองเก่าฮานอย', 'A flower-seller\'s bicycle in Hanoi\'s Old Quarter', ['flower bicycle', 'จักรยานขายดอกไม้', 'hanoi old quarter', 'ย่านเมืองเก่าฮานอย', 'flower seller', 'แม่ค้าดอกไม้', 'peonies', 'ดอกโบตั๋น', 'yellow wall', 'ผนังสีเหลือง'], 'หาตะกร้าดอกไม้ที่ล้นออกมาจากท้ายจักรยาน', 'Find the baskets of flowers overflowing from the back of the bicycle',
    // an old black bicycle parked by a mustard-yellow wall, a big basket on the back overflowing with pink peonies, white daisies and lotus buds, a conical hat hanging on the handlebar
    sky('#F6C85F') + ring(3, (k) => R(20 + k * 76, 30, 40, 60, '#4CAF50', 0, 3)) + R(-4, 196, 248, 48, '#BDBDBD', 0, 0)
      + C(56, 190, 30, 'none', 5) + C(180, 190, 30, 'none', 5) + Lc('M56 190l40-52h60l24 52M96 138l-6-20M80 118h20M156 138l-20 52', '#37474F', 5) + C(136, 190, 6, '#37474F', 0)
      + P('M130 136h80l-8 30h-64z', '#C68642') + ring(4, (k) => Lc(`M${140 + k * 18} 138l-2 26`, '#A1673F', 2.5))
      + [[136, 116, '#F48FB1'], [160, 104, '#EC407A'], [186, 112, '#F8BBD0'], [206, 124, '#F48FB1']].map(([x, y, c]) => C(x, y, 14, c) + C(x, y, 6, '#FCE4EC', 2)).join('')
      + [[148, 130], [196, 136]].map(([x, y]) => C(x, y, 8, '#FFFFFF', 2) + C(x, y, 3, '#FFD54F', 0)).join('') + P('M172 96c-4-10 4-20 8-22 4 4 10 12 2 22z', '#F06292', 2)
      + g(84, 128, 1, P('M-22 6l22-22 22 22z', '#F5DEB3') + Lc('M-8 6l-4 16', '#8D6E63', 2)) + face(170, 150, 0.32)),
  L('vn/hanoi/landmark-chaca.v1.svg', 'จ๊าก๋าหล่าหว่อง ปลาขมิ้นผัดผักชีลาวของฮานอย', 'Chả cá Lã Vọng, Hanoi\'s turmeric fish with dill', ['cha ca', 'chả cá', 'จ๊าก๋า', 'cha ca la vong', 'chả cá lã vọng', 'turmeric fish', 'ปลาขมิ้น', 'dill', 'ผักชีลาว', 'sizzling pan'], 'หาผักชีลาวสีเขียวที่กองอยู่บนปลาสีเหลือง', 'Find the green dill piled on the yellow fish',
    // a small pan sizzling on a little charcoal stove, chunks of turmeric-yellow fish with a heap of fresh green dill and spring onion on top, a bowl of rice noodles, peanuts and chopsticks
    R(30, 160, 110, 50, '#6D4C41', 8) + ring(3, (k) => C(56 + k * 30, 168, 8, '#FF7043', 2))
      + E(86, 140, 70, 18, '#37474F') + Lc('M156 140h60', '#37474F', 8) + E(86, 136, 60, 12, '#FFB300', 0)
      + ring(5, (k) => E(52 + k * 17, 132 + (k % 2) * 6, 10, 7, '#FFCA28', 2)) + ring(9, (k) => Lc(`M${48 + k * 9} 128l${(k % 2 ? 6 : -6)} -18`, '#7CB342', 3)) + ring(4, (k) => Lc(`M${60 + k * 16} 120l4-16`, '#43A047', 4))
      + Lc('M60 104q-6-10 0-20M110 104q-6-10 0-20', '#B0BEC5', 3)
      + g(186, 196, 1, E(0, 0, 36, 14, '#FFFFFF') + E(0, -4, 28, 8, '#F5F5F5', 0) + Lc('M-20-6c6 4 10-4 16 0s10-4 16 0', '#E0E0E0', 2)) + ring(5, (k) => E(170 + k * 8, 160 - (k % 2) * 4, 3, 2, '#D7A86E', 1.5))
      + face(86, 186, 0.36)),
  L('vn/hanoi/landmark-com.v1.svg', 'ก๊อม ข้าวเม่าเขียวห่อใบบัวของฮานอย', 'Cốm, Hanoi\'s green young rice in a lotus leaf', ['com', 'cốm', 'ก๊อม', 'green rice flakes', 'ข้าวเม่าเขียว', 'young rice', 'ข้าวอ่อน', 'lotus leaf wrap', 'ห่อใบบัว', 'hanoi autumn'], 'หาเกล็ดข้าวสีเขียวในห่อใบบัว', 'Find the green rice flakes in the lotus-leaf parcel',
    // an open round lotus leaf holding a heap of bright green flattened rice flakes, tied with a strand of straw, a stalk of rice grains and a pink lotus bud beside it
    P('M20 150c10-50 70-66 100-66s90 16 100 66c-30 30-170 30-200 0z', '#66BB6A') + ring(6, (k) => Lc(`M120 156L${30 + k * 36} ${108 + Math.abs(2.5 - k) * 10}`, '#43A047', 2.5))
      + P('M50 140c10-30 50-40 70-40s60 10 70 40c-30 16-110 16-140 0z', '#AED581') + ring(16, (k) => E(66 + (k * 23) % 110, 116 + (k * 11) % 26, 5, 2.5, k % 2 ? '#9CCC65' : '#C5E1A5', 1.5))
      + Lc('M30 166c40 20 140 20 180 0', '#E6C27A', 4) + face(120, 172, 0.42)
      + g(200, 70, 1, Lc('M0 40C0 10 6-10 14-30', '#7CB342', 3) + ring(6, (k) => E(6 + k * 2, 20 - k * 8, 3, 5, '#FFD54F', 1.5)))
      + g(40, 70, 1, Lc('M0 50V10', '#43A047', 4) + P('M0 10c-14-10-12-30 0-40 12 10 14 30 0 40z', '#F48FB1'))),
  L('vn/hanoi/landmark-hangmua.v1.svg', 'จุดชมวิวถ้ำมัว นิญบิ่ญ', 'The Hang Múa lookout above Ninh Bình', ['hang mua', 'hang múa', 'ถ้ำมัว', 'mua cave', 'ninh binh', 'ninh bình', 'นิญบิ่ญ', 'lookout', 'จุดชมวิว', 'stone steps'], 'หาบันไดหินที่ไต่ขึ้นไปถึงศาลาบนยอดเขา', 'Find the stone stairs climbing to the little pavilion at the top',
    // a steep green limestone peak with a zigzag stone staircase climbing to a tiny pavilion on the top, more karst peaks behind, a winding river through golden rice fields below
    sky('#E3F2FD') + P('M140 130l20-60 20 30 20-50 30 80z', '#A5D6A7') + P('M-4 120l20-40 20 20 16-30 20 50z', '#A5D6A7')
      + R(-4, 150, 248, 94, '#E6C65A', 0, 0) + Lc('M-4 190c40-20 80 20 130 0s80-20 118 0', '#4FC3F7', 14) + ring(6, (k) => Lc(`M${k * 44} 160l20 16`, '#C9A846', 2.5))
      + P('M40 170c10-60 30-120 60-140 30 20 40 80 50 140z', '#66BB6A') + P('M70 120c6-30 20-60 30-80 10 20 20 50 24 80z', '#43A047', 0)
      + Lc('M70 168l20-14-14-12 22-14-14-14 20-16-10-14 16-14', '#ECEFF1', 6) + Lc('M70 168l20-14-14-12 22-14-14-14 20-16-10-14 16-14', '#9E9E9E', 1.5)
      + g(100, 34, 1, R(-8, -2, 16, 12, '#BCAAA4', 0, 2.5) + P('M-14-2l14-12 14 12z', '#8D6E63', 2.5)) + face(98, 140, 0.32)),
  L('vn/hanoi/landmark-banhtom.v1.svg', 'บั๊ญโต๋ม ทอดมันกุ้งริมทะเลสาบตะวันตก', 'Bánh tôm, shrimp fritters by West Lake', ['banh tom', 'bánh tôm', 'บั๊ญโต๋ม', 'shrimp fritters', 'กุ้งทอด', 'west lake', 'ho tay', 'hồ tây', 'ทะเลสาบตะวันตก', 'sweet potato fritters'], 'หากุ้งสีแดงทั้งตัวที่ติดอยู่บนแผ่นทอด', 'Find the whole red shrimp sitting on top of the fritter',
    // golden lacy fritters of sweet potato strands each topped with a whole red shrimp, on a plate with lettuce and herbs, a bowl of dipping sauce, the lake and a little pagoda roof far behind
    sky('#E1F5FE') + R(-4, 70, 248, 40, '#4FC3F7', 0, 0) + g(200, 74, 1, R(-6, -14, 12, 14, '#BCAAA4', 0, 2) + P('M-12-14l12-10 12 10z', '#8D6E63', 2)) + R(-4, 106, 248, 138, '#FFF8E1', 0, 0)
      + E(110, 176, 96, 40, '#FFFFFF') + P('M30 170c10-20 30-20 40-6M150 160c10-16 30-14 38 2', '#81C784', 3)
      + [[80, 166], [140, 160]].map(([x, y]) => C(x, y, 34, '#E8A33D') + ring(10, (k) => Lc(`M${x - 26 + (k * 7) % 52} ${y - 20 + (k * 13) % 40}l8 4`, '#FFD180', 3))
        + P(`M${x - 18} ${y - 4}c4-20 30-24 36-6-6 10-16 4-18-4`, '#E53935', 3) + Lc(`M${x + 16} ${y - 12}l10-10M${x + 16} ${y - 8}l12-4`, '#E53935', 2)).join('')
      + E(206, 206, 22, 9, '#FFFFFF') + E(206, 204, 15, 5, '#F2A65A', 0) + face(80, 180, 0.36)),
];

export default { places: {}, items };
