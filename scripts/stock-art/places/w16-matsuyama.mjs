// Wave 16: Matsuyama (Ehime, Shikoku) — the castle on Katsuyama hill, Dōgo Onsen's old wooden bathhouse and the white heron
// of its legend, the Botchan train and clock, Ehime's mikan (juice from a tap), tai-meshi, and the Shimanami Kaidō's start at
// Imabari (towels, the Kurushima bridges and whirlpools), Uchiko's wooden theatre and Shimonada's seaside station.
// Skipped as repeats or bans: Ishite-ji and the 88-temple pilgrimage (religious), Botchan dango (jp.food.dango is the same
// three balls on a stick), the castle ropeway car (cable cars elsewhere; the one-seat lift is drawn instead), Tobe Zoo.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const MY = { k1: '#E8711A', k2: '#00838F', k3: '#FFF3E0' };
const CITY = 'jp-matsuyama', DIR = 'jp/matsuyama';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// steam curls over x positions
const steam = (xs, y, c = '#ECEFF1') => Lc(xs.map((x) => `M${x} ${y}c-6-8 6-14 0-24`).join(''), c, 3.5);
// a Japanese castle roof tier: a dark grey roof with up-curled eave ends (cx = middle, y = eave line, w = half width)
const jroof = (cx, y, w, h, fill = '#546E7A', sw) => P(`M${cx - w} ${y}q${w * 0.2} -2 ${w * 0.32} ${-h}h${w * 1.36}q${w * 0.12} ${h} ${w * 0.32} ${h}z`, fill, sw);
// a mikan: an orange ball with a little green leaf on top
const mikan = (x, y, r, sw = 3) => C(x, y, r, '#FB8C00', sw) + C(x - r * 0.35, y - r * 0.35, r * 0.18, '#FFB74D', 0) + P(`M${x} ${y - r}c${r * 0.2} ${-r * 0.5} ${r * 0.7} ${-r * 0.6} ${r * 0.9} ${-r * 0.4}c${-r * 0.3} ${r * 0.4} ${-r * 0.6} ${r * 0.5} ${-r * 0.9} ${r * 0.4}z`, '#43A047', sw * 0.8);
// a little house: cream wall, grey roof
const hut = (x, y, c, s = 1) => g(x, y, s, R(-7, -5, 14, 10, '#FFF8E1', 0, 2.5) + P('M-9-5l9-7 9 7z', c, 2.5));
// the castle keep of Matsuyama: a stone base, white walls, three dark roofs, golden tips
const keep = (x, y, s) => g(x, y, s, P('M-34 40l6-26h56l6 26z', '#BCAAA4') + Lc('M-30 30h60M-14 14v16M8 14v16M-4 30v10M18 30v10', '#A1887F', 2)
  + R(-24, -4, 48, 18, '#FFFFFF') + jroof(0, -4, 32, 8) + R(-18, -20, 36, 16, '#FFFFFF') + jroof(0, -20, 26, 8) + R(-12, -34, 24, 14, '#FFFFFF') + jroof(0, -34, 20, 8)
  + P('M-10-42l-4-6 6 2zM10-42l4-6-6 2z', '#FFCA28', 2) + R(-14, 0, 6, 8, '#455A64', 0, 2) + R(8, 0, 6, 8, '#455A64', 0, 2) + R(-4, -16, 8, 8, '#455A64', 0, 2));

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับมัตสึยามะ', 'Matsuyama stamp'), kw: ['matsuyama', 'มัตสึยามะ', 'ehime', 'เอฮิเมะ', 'matsuyama castle', 'ปราสาทมัตสึยามะ', 'mikan', 'ส้มมิกัง', 'shikoku', 'ชิโกกุ'],
    // the white castle keep on its green hill with a big smiling mikan rising behind it like a sun
    svg: cityStamp('jmy-st', { name: 'MATSUYAMA', sub: 'EHIME · JAPAN', ...MY, emblem: mikan(124, 76, 20, 2.5) + face(124, 78, 0.34)
      + P('M48 132c14-26 34-38 52-38s40 12 52 38z', '#81C784', 0) + g(90, 104, 0.62, P('M-34 40l6-26h56l6 26z', '#BCAAA4') + R(-24, -4, 48, 18, '#FFFFFF') + jroof(0, -4, 32, 8) + R(-18, -20, 36, 16, '#FFFFFF') + jroof(0, -20, 26, 8) + R(-12, -34, 24, 14, '#FFFFFF') + jroof(0, -34, 20, 8))
      + Lc('M58 140h84', '#A5D6A7', 3) }) },

  D('dogo', 'อาคารเก่าของโดโกะออนเซ็นยามเย็น', 'The old wooden bathhouse of Dōgo Onsen at dusk', ['dogo onsen', 'โดโกะออนเซ็น', 'dogo onsen honkan', 'โดโกะออนเซ็นฮนกัง', 'old bathhouse', 'โรงอาบน้ำเก่า', 'hot spring', 'น้ำพุร้อน', 'wooden building', 'อาคารไม้', 'paper lanterns', 'โคมกระดาษ'],
    // a peach evening sky, a wide three-storey wooden bathhouse with layered grey roofs, sliding paper windows glowing yellow, a small turret on top with red glass and a white heron, steam rising, round lanterns in front
    scene('jmy-d1', '#FFCCBC', C(52, 58, 14, '#FFF59D', 3) + R(-4, 196, 248, 60, '#BCAAA4')
      + R(34, 150, 172, 48, '#A1887F') + [46, 72, 150, 176].map((x) => R(x, 160, 18, 24, '#FFF59D', 0, 3)).join('') + P('M20 154l18-18h164l18 18z', '#607D8B')
      + R(98, 158, 44, 40, '#FFE0B2', 0, 3) + Lc('M112 158v20M128 158v20', '#FFB74D', 2.5)
      + R(50, 112, 140, 26, '#8D6E63') + [60, 86, 112, 138, 164].map((x) => R(x, 117, 16, 16, '#FFF59D', 0, 3)).join('') + P('M36 116l16-16h136l16 16z', '#546E7A')
      + R(70, 80, 100, 22, '#8D6E63') + [80, 104, 128, 150].map((x) => R(x, 84, 12, 14, '#FFF59D', 0, 3)).join('') + P('M58 84l14-14h96l14 14z', '#607D8B')
      + R(104, 50, 32, 22, '#795548') + R(110, 54, 9, 12, '#EF5350', 0, 2.5) + R(121, 54, 9, 12, '#EF5350', 0, 2.5) + P('M96 54l24-16 24 16z', '#546E7A')
      + P('M118 36c-2-8 4-14 10-12l6-6-2 8c4 4 2 10-4 10z', '#FFFFFF', 2.5) + Lc('M126 36v4', INK, 2)
      + [[30, 172], [210, 172]].map(([x, y]) => Lc(`M${x} ${y - 14}v-8`, INK, 2) + E(x, y, 9, 12, '#FF7043', 3) + Lc(`M${x - 9} ${y}h18`, '#FFCCBC', 2)).join('')
      + steam([24, 216], 150, '#FFFFFF') + face(120, 182, 0.36))),

  D('shimanami', 'ปั่นจักรยานบนเส้นทางชิมานามิไคโด', 'Cycling the Shimanami Kaidō over the Kurushima bridges', ['shimanami kaido', 'ชิมานามิไคโด', 'cycling road', 'เส้นทางปั่นจักรยาน', 'kurushima kaikyo bridge', 'สะพานคุรุชิมะไคเคียว', 'suspension bridge', 'สะพานแขวน', 'seto inland sea', 'ทะเลเซโตะใน', 'islands', 'หมู่เกาะ', 'imabari', 'อิมาบาริ'],
    // a long white suspension bridge with three pairs of tall towers hopping across a blue sea between green islands, a blue line painted on the road in front and two smiling bicycles setting off
    scene('jmy-d2', '#B3E5FC', C(186, 52, 15, '#FFF59D', 3) + P('M-4 122h248v70H-4z', '#4FC3F7') + E(40, 124, 40, 14, '#81C784') + E(214, 122, 34, 12, '#66BB6A') + E(124, 126, 20, 8, '#A5D6A7')
      + [42, 120, 198].map((x) => R(x - 4, 62, 8, 52, '#FFFFFF', 0, 3) + Lc(`M${x - 4} 78h8M${x - 4} 94h8`, '#B0BEC5', 2)).join('')
      + Lc('M-4 100Q20 112 42 64Q81 116 120 64Q159 116 198 64Q222 112 244 100', '#FFFFFF', 3.5) + Lc('M62 92v20M81 98v14M100 92v20M140 92v20M159 98v14M178 92v20', '#ECEFF1', 1.5)
      + R(-4, 112, 248, 7, '#FFFFFF', 0, 3)
      + Lc('M30 140c10-5 20 5 30 0M150 146c10-5 20 5 30 0', '#E1F5FE', 4) + P('M-4 192l248-18v80H-4z', '#BDBDBD') + Lc('M-4 214l248-20', '#1E88E5', 5)
      + [[86, 206, '#FF7043'], [146, 200, '#26A69A']].map(([x, y, c]) => C(x - 14, y, 10, '#FFFFFF', 3) + C(x + 14, y, 10, '#FFFFFF', 3) + Lc(`M${x - 14} ${y}l10-16h14l4 16M${x - 4} ${y - 16}l4 16M${x + 6} ${y - 20}h8`, c, 4)).join('')
      + face(86, 206, 0.18, 'none') + face(146, 200, 0.18, 'none') + face(186, 54, 0.26))),

  D('castlehill', 'ปราสาทมัตสึยามะบนเขาคัตสึยามะกลางเมือง', 'Matsuyama Castle on Katsuyama hill above the town', ['matsuyama castle', 'ปราสาทมัตสึยามะ', 'katsuyama', 'เขาคัตสึยามะ', 'castle on a hill', 'ปราสาทบนเขา', 'tram', 'รถราง', 'iyotetsu', 'อิโยเท็ตสึ', 'matsuyama', 'มัตสึยามะ'],
    // a round green wooded hill in the middle of the town with the white castle keep on its top, little houses at its foot and an orange tram running along the street in front
    scene('jmy-d3', '#E1F5FE', C(52, 54, 14, '#FFF59D', 3) + P('M24 160c20-70 50-96 96-96s76 26 96 96z', '#66BB6A') + C(70, 136, 14, '#43A047', 3) + C(170, 132, 16, '#43A047', 3) + C(130, 112, 12, '#388E3C', 3)
      + keep(120, 46, 0.78)
      + [[16, 168, '#90A4AE'], [42, 164, '#E57373'], [200, 166, '#90A4AE'], [224, 168, '#E57373'], [78, 170, '#78909C'], [164, 170, '#78909C']].map(([x, y, c]) => hut(x, y, c, 1.3)).join('')
      + R(-4, 182, 248, 74, '#BDBDBD') + Lc('M-4 214h248M-4 222h248', '#8D6E63', 3)
      + R(60, 168, 124, 42, '#FF8A3D', 10) + R(60, 196, 124, 10, '#FFFFFF', 0, 3) + [72, 98, 124, 150].map((x) => R(x, 176, 18, 14, '#E1F5FE', 2, 3)).join('') + Lc('M120 168v-12l-12-6', INK, 3)
      + C(84, 214, 6, '#455A64') + C(160, 214, 6, '#455A64') + face(122, 200, 0.24, 'none'))),

  L('chairlift', 'ลิฟต์เก้าอี้เดี่ยวขึ้นปราสาทมัตสึยามะ', 'The one-seat chairlift up to Matsuyama Castle', ['chairlift', 'ลิฟต์เก้าอี้', 'single seat lift', 'เก้าอี้นั่งเดี่ยว', 'matsuyama castle ropeway', 'กระเช้าปราสาทมัตสึยามะ', 'castle hill', 'เนินปราสาท', 'up the hill', 'ขึ้นเขา'], 'หาเก้าอี้ตัวเดียวที่ห้อยอยู่บนสายเคเบิล', 'Find the single chair hanging from the cable',
    // a green slope rising to the castle keep at the top right, a cable strung between two poles and one open chair hanging from it carrying a smiling mikan
    bg('#E3F2FD') + P('M16 214L224 70v124a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#81C784', 0) + frame + keep(182, 68, 0.7)
      + R(46, 150, 7, 64, '#90A4AE', 0, 3) + R(164, 76, 7, 56, '#90A4AE', 0, 3) + Lc('M28 158L210 74', INK, 3)
      + Lc('M110 120v26', INK, 3) + P('M96 146h30v6c0 6-4 10-10 10H96z', '#FFCA28') + Lc('M96 146v-12', INK, 3) + R(92, 162, 28, 6, '#FFB300', 2, 3)
      + mikan(110, 134, 13) + face(110, 136, 0.3) + C(60, 196, 10, '#43A047', 3) + C(150, 170, 12, '#43A047', 3)),

  L('botchantrain', 'รถไฟบตจังเรตชะ รถไฟไอน้ำจำลองบนถนน', 'The Botchan Ressha, a little steam-style train in the streets', ['botchan train', 'รถไฟบตจัง', 'botchan ressha', 'บตจังเรตชะ', 'little steam train', 'รถไฟไอน้ำคันเล็ก', 'tram tracks', 'รางรถราง', 'dogo onsen station', 'สถานีโดโกะออนเซ็น'], 'หาปล่องควันสูงบนหัวรถไฟสีเขียว', 'Find the tall chimney on the green engine',
    // a small dark-green steam engine with a tall funnel, a red buffer beam and gold trim, pulling one little yellow wooden coach, puffs of white steam on top
    E(124, 196, 100, 10, '#ECEFF1', 0) + Lc('M20 190h200', '#8D6E63', 4)
      + R(118, 110, 92, 66, '#FFCA28', 6) + R(112, 102, 104, 12, '#795548', 4) + [128, 152, 176].map((x) => R(x, 122, 18, 20, '#E1F5FE', 2, 3)).join('') + Lc('M118 156h92', '#A1887F', 3)
      + R(28, 120, 62, 52, '#2E7D32', 6) + R(64, 100, 40, 72, '#388E3C', 4) + R(60, 94, 48, 10, '#1B5E20', 3) + R(68, 106, 32, 22, '#E1F5FE', 2, 3)
      + R(36, 76, 14, 44, '#263238', 3) + R(30, 70, 26, 10, '#263238', 3) + Lc('M28 146h62', '#FFCA28', 3) + R(18, 160, 16, 12, '#E53935', 2, 3)
      + C(48, 182, 13, '#455A64') + C(82, 182, 13, '#455A64') + C(140, 182, 10, '#455A64') + C(190, 182, 10, '#455A64') + Lc('M48 182h34', '#FFCA28', 3)
      + C(44, 56, 12, '#FFFFFF') + C(62, 42, 15, '#FFFFFF') + C(86, 30, 12, '#FFFFFF') + face(58, 138, 0.32)),

  L('karakuriclock', 'นาฬิกากลบตจังที่หน้าสถานีโดโกะออนเซ็น', 'The Botchan karakuri clock at Dōgo Onsen station', ['botchan karakuri clock', 'นาฬิกากลบตจัง', 'karakuri clock', 'นาฬิกากล', 'clock tower', 'หอนาฬิกา', 'dogo', 'โดโกะ', 'moving dolls', 'ตุ๊กตาขยับได้'], 'หาตุ๊กตาตัวเล็กที่โผล่ออกมาจากกลางหอนาฬิกา', 'Find the little dolls popping out of the middle of the clock',
    // a tall wooden clock tower in the style of the bathhouse: a stone base, a middle floor lifted up to show three little round dolls, a big round clock face smiling, a turret roof with a gold tip
    E(120, 214, 60, 8, '#ECEFF1', 0) + R(76, 182, 88, 30, '#BCAAA4', 3) + Lc('M76 196h88M100 182v14M140 182v14M120 196v16', '#A1887F', 2.5)
      + R(82, 136, 76, 46, '#8D6E63', 3) + R(90, 144, 60, 30, '#FFF8E1', 3) + [[104, '#EF5350'], [120, '#42A5F5'], [136, '#FFCA28']].map(([x, c]) => R(x - 6, 158, 12, 16, c, 4, 2.5) + C(x, 152, 7, '#FFE0B2', 2.5) + C(x - 2, 151, 1.4, INK, 0) + C(x + 2, 151, 1.4, INK, 0)).join('')
      + Lc('M84 132v-8M156 132v-8', '#8D6E63', 4) + R(78, 124, 84, 12, '#795548', 3)
      + R(84, 76, 72, 48, '#8D6E63', 3) + C(120, 100, 21, '#FFFFFF') + Lc('M120 100v-13M120 100l9 5', INK, 3) + [0, 90, 180, 270].map((a) => g(120, 100, 1, Lc('M0-17v3', INK, 2.5), a)).join('')
      + P('M70 80l20-20h60l20 20z', '#546E7A') + R(106, 42, 28, 18, '#8D6E63', 0, 3) + P('M98 46l22-16 22 16z', '#546E7A') + Lc('M120 30v-8', '#FFCA28', 4)
      + face(120, 104, 0.34)),

  L('heron', 'นกกระสาขาวแช่ขาในน้ำพุร้อนโดโกะ', 'The white heron of Dōgo, warming its leg in the hot spring', ['white heron', 'นกกระสาขาว', 'heron legend', 'ตำนานนกกระสา', 'dogo onsen', 'โดโกะออนเซ็น', 'hot spring', 'น้ำพุร้อน', 'healing spring', 'น้ำพุรักษาขา', 'steam', 'ไอน้ำ'], 'หาขาข้างหนึ่งของนกที่แช่อยู่ในน้ำอุ่น', 'Find the bird’s one leg dipped in the warm water',
    // a round white heron with a long neck and yellow beak standing on one leg among grey rocks, its other foot dipped in a small steaming spring pool
    E(120, 190, 78, 24, '#A1887F') + E(118, 186, 62, 16, '#80DEEA') + Lc('M84 186c10-4 20 4 30 0M128 190c10-4 20 4 30 0', '#E0F7FA', 3)
      + E(52, 176, 18, 12, '#90A4AE') + E(190, 178, 20, 13, '#90A4AE') + E(176, 194, 14, 9, '#B0BEC5')
      + Lc('M118 150l-6 36', '#FFB300', 4) + Lc('M136 150l6 18l-10 6', '#FFB300', 4)
      + P('M86 118c0-26 26-40 52-30 22 8 24 38 8 56-18 18-58 10-60-26z', '#FFFFFF') + ol('M150 104c14-6 20-30 12-52', '#FFFFFF', 10)
      + C(160, 48, 13, '#FFFFFF') + P('M172 46l24 4-24 6z', '#FFCA28', 3) + Lc('M156 36c-6-10-16-12-24-8', INK, 3)
      + Lc('M96 116c14 8 30 8 40 2', '#CFD8DC', 3)
      + steam([70, 104, 168], 168) + face(162, 48, 0.24)),

  L('footbath', 'บ่อแช่เท้าน้ำพุร้อนกลางย่านโดโกะ', 'A hot-spring foot bath in Dōgo', ['foot bath', 'บ่อแช่เท้า', 'ashiyu', 'อาชิยุ', 'dogo onsen', 'โดโกะออนเซ็น', 'warm water', 'น้ำอุ่น', 'wooden roof', 'หลังคาไม้', 'rest your feet', 'พักเท้า'], 'หาเท้าเล็กๆ สี่ข้างที่แช่อยู่ในน้ำอุ่น', 'Find the four little feet in the warm water',
    // a small wooden roof on posts over a round stone tub of steaming blue water, a stone rim to sit on and four little bare feet dangling in the water
    E(120, 206, 92, 12, '#ECEFF1', 0) + R(36, 70, 8, 110, '#8D6E63', 0, 3) + R(196, 70, 8, 110, '#8D6E63', 0, 3) + P('M18 76l36-36h132l36 36z', '#5D4037') + Lc('M40 60h160', '#795548', 3)
      + E(120, 172, 86, 30, '#BDBDBD') + E(120, 166, 70, 20, '#4DD0E1') + Lc('M74 166c10-4 20 4 30 0M136 170c10-4 20 4 30 0', '#E0F7FA', 3)
      + [[82, '#FFE0B2'], [100, '#FFE0B2'], [140, '#FFCCBC'], [158, '#FFCCBC']].map(([x, c]) => R(x - 5, 144, 10, 22, c, 4, 2.5) + E(x, 168, 8, 6, c, 2.5) + [-4, 0, 4].map((d) => C(x + d, 174, 1.8, c, 1.5)).join('')).join('')
      + Lc('M70 150c20-6 30-6 40 0M130 150c20-6 30-6 40 0', '#FFFFFF', 2)
      + steam([96, 120, 146], 128) + face(120, 186, 0.36)),

  L('mikan', 'ส้มมิกังของจังหวัดเอฮิเมะ', 'Ehime mikan, little sweet mandarins', ['mikan', 'ส้มมิกัง', 'ehime mikan', 'ส้มเอฮิเมะ', 'mandarin orange', 'ส้มแมนดาริน', 'iyokan', 'อิโยกัง', 'peeled segments', 'กลีบส้ม', 'basket', 'ตะกร้า'], 'หากลีบส้มที่แกะแล้วข้างตะกร้า', 'Find the peeled segments beside the basket',
    // a woven bamboo basket full of shiny orange mikan with green leaves, the middle one smiling, and one peeled mikan in front opened into a star of juicy segments
    E(118, 208, 96, 10, '#ECEFF1', 0) + P('M40 132h140l-14 64H54z', '#D7A86E') + Lc('M46 150h128M50 168h120M54 186h112M74 132l4 64M102 132l2 64M130 132v64M158 132l-4 64', '#B5834A', 2.5)
      + mikan(70, 118, 22) + mikan(150, 118, 22) + mikan(110, 104, 27) + face(110, 108, 0.42)
      + [0, 60, 120, 180, 240, 300].map((a) => g(188, 186, 1, E(0, -12, 7, 12, '#FFB74D', 2.5), a)).join('') + C(188, 186, 5, '#FFF3E0', 2)
      + P('M168 196c4 10 36 10 40 0', '#FB8C00', 2.5)),

  L('mikantap', 'น้ำส้มมิกังไหลออกจากก๊อก', 'Mikan juice flowing from a tap', ['mikan juice', 'น้ำส้มมิกัง', 'juice tap', 'ก๊อกน้ำส้ม', 'orange juice faucet', 'ก๊อกน้ำผลไม้', 'ehime', 'เอฮิเมะ', 'matsuyama airport', 'สนามบินมัตสึยามะ', 'glass of juice', 'แก้วน้ำผลไม้'], 'หาก๊อกที่มีน้ำส้มไหลออกมา', 'Find the tap pouring orange juice',
    // a shiny silver tap on a wall pipe with an orange mikan-shaped handle, a stream of bright orange juice pouring into a smiling glass below
    E(124, 212, 50, 8, '#ECEFF1', 0) + R(20, 40, 18, 40, '#B0BEC5', 3) + R(36, 48, 70, 22, '#CFD8DC', 6) + P('M100 48h20c14 0 24 10 24 24v18h-22V72h-22z', '#CFD8DC') + R(118, 88, 28, 8, '#B0BEC5', 2, 3)
      + mikan(70, 34, 14) + Lc('M70 48v-2', INK, 3) + Lc('M132 96v58', '#FFA726', 10) + Lc('M130 100v50', '#FFE0B2', 2)
      + P('M92 146h80l-8 64h-64z', '#E3F2FD') + P('M96 162h72l-6 44h-60z', '#FFA726') + E(132, 162, 36, 5, '#FFB74D', 2)
      + C(150, 180, 3, '#FFE0B2', 0) + C(114, 192, 2.5, '#FFE0B2', 0) + face(132, 182, 0.34)),

  L('taimeshi', 'ไทเมชิ ข้าวหุงกับปลาไทในหม้อดิน', 'Tai-meshi, rice cooked with a whole sea bream in a clay pot', ['tai-meshi', 'ไทเมชิ', 'taimeshi', 'ข้าวปลาไท', 'sea bream rice', 'ข้าวหุงปลาไท', 'red sea bream', 'ปลาไทแดง', 'clay pot', 'หม้อดิน', 'donabe', 'โดนาเบะ'], 'หาปลาสีแดงตัวโตที่นอนอยู่บนข้าว', 'Find the big red fish lying on the rice',
    // a dark brown clay pot with its lid set aside, full of white rice with a whole pink-red sea bream lying on top, green herbs sprinkled, steam curling up
    E(120, 200, 98, 12, '#ECEFF1', 0) + P('M30 122h150c0 46-30 74-75 74s-75-28-75-74z', '#6D4C41') + Lc('M40 144h130', '#8D6E63', 3) + R(18, 116, 16, 12, '#5D4037', 4, 3) + R(176, 116, 16, 12, '#5D4037', 4, 3)
      + E(105, 122, 76, 18, '#FFFFFF') + P('M52 118c10-20 40-28 70-22l18-12-2 18 2 18-18-10c-30 6-60-2-70 8z', '#EF5350') + Lc('M80 104c4 8 4 16 0 22M96 100c4 8 4 18 0 24', '#E57373', 2.5) + C(64, 112, 3, INK, 0)
      + [[78, 128], [112, 126], [136, 130], [92, 132]].map(([x, y]) => E(x, y, 3, 2, '#66BB6A', 0)).join('')
      + E(204, 176, 30, 10, '#5D4037') + C(204, 168, 6, '#6D4C41', 2.5) + steam([70, 106, 140], 88) + face(105, 160, 0.4)),

  L('jakoten', 'จาโกเท็น ทอดมันปลาแผ่นของเอฮิเมะ', 'Jakoten, Ehime’s fried fish patties', ['jakoten', 'จาโกเท็น', 'fried fish patty', 'ทอดมันปลา', 'fish paste', 'เนื้อปลาบด', 'uwajima', 'อุวาจิมะ', 'yawatahama', 'ยาวาตาฮามะ', 'small fish', 'ปลาตัวเล็ก'], 'หาจุดเล็กๆ บนแผ่นปลาทอด', 'Find the little specks on the fried patty',
    // a blue-and-white plate with two flat golden-brown fried patties speckled with little dark bits, the front one smiling, a slice of lemon and a dab of green on the side
    E(120, 150, 96, 54, '#FFFFFF') + E(120, 150, 82, 42, '#E3F2FD', 3) + Lc('M48 150c10-30 50-40 72-40s62 10 72 40', '#90CAF9', 2)
      + g(96, 132, 1, E(0, 0, 42, 22, '#C68642', 3) + E(-4, -4, 32, 14, '#D49A56', 0), -12) + g(132, 160, 1, E(0, 0, 46, 24, '#C68642', 3) + E(-4, -4, 36, 15, '#D49A56', 0), 6)
      + [[82, 126], [100, 136], [112, 126], [76, 138], [114, 154], [150, 158], [128, 172], [148, 172], [160, 150]].map(([x, y]) => C(x, y, 2.2, '#5D4037', 0)).join('')
      + C(182, 128, 13, '#FFF176', 3) + Lc('M172 128h20M182 118v20', '#FBC02D', 1.5) + E(62, 170, 11, 7, '#7CB342', 2.5) + face(132, 162, 0.38)),

  L('ichirokutart', 'อิจิโรคุทาร์ต เค้กม้วนไส้ถั่วแดงกลิ่นส้มยูซุ', 'Ichiroku tart, a sponge roll with yuzu bean paste', ['ichiroku tart', 'อิจิโรคุทาร์ต', 'matsuyama tart', 'ทาร์ตมัตสึยามะ', 'sponge roll', 'เค้กม้วน', 'bean paste', 'ไส้ถั่วแดง', 'yuzu', 'ส้มยูซุ', 'souvenir sweet', 'ขนมของฝาก'], 'หาเกลียวสีน้ำตาลเข้มในเค้กชิ้นที่ตัดแล้ว', 'Find the dark brown swirl in the cut slice',
    // a long golden sponge-cake log lying on a plate and two round slices standing in front showing the dark red-brown bean paste spiral inside, a little yuzu beside
    E(120, 196, 100, 12, '#ECEFF1', 0) + P('M40 110h120a24 24 0 0 1 0 48H40z', '#FFCA28') + E(40, 134, 14, 24, '#FFE082') + Lc('M70 112v44M100 112v44M130 112v44', '#FFB300', 2)
      + C(92, 172, 26, '#FFE082') + Lc('M92 172m-4 0a4 4 0 1 1 8 0a9 9 0 1 1-17 0a14 14 0 1 1 28 0a19 19 0 1 1-38 0', '#6D2E22', 4)
      + C(150, 176, 22, '#FFE082') + Lc('M150 176m-3 0a3 3 0 1 1 6 0a8 8 0 1 1-15 0a12 12 0 1 1 24 0a16 16 0 1 1-32 0', '#6D2E22', 3.5)
      + C(196, 104, 14, '#FDD835', 3) + P('M196 90c4-8 12-8 14-4-6 2-10 4-14 4z', '#43A047', 2) + face(100, 134, 0.36)),

  L('nabeyakiudon', 'นาเบยากิอุด้งหม้ออะลูมิเนียมแบบมัตสึยามะ', 'Matsuyama nabeyaki udon in a little aluminium pot', ['nabeyaki udon', 'นาเบยากิอุด้ง', 'aluminium pot', 'หม้ออะลูมิเนียม', 'sweet broth', 'น้ำซุปหวาน', 'udon noodles', 'เส้นอุด้ง', 'fried tofu', 'เต้าหู้ทอด', 'matsuyama', 'มัตสึยามะ'], 'หาไข่สีเหลืองตรงกลางหม้อ', 'Find the yellow egg in the middle of the pot',
    // a golden aluminium pot with a long straight handle, soft white udon in a brown broth, a fried tofu pocket, a pink-swirl fish cake, beef slices, an egg yolk and green onion on top
    E(116, 200, 96, 12, '#ECEFF1', 0) + ol('M184 128l42-24', '#E0C068', 8) + P('M26 120h160c0 44-30 72-80 72s-80-28-80-72z', '#E8C870') + Lc('M38 142h136', '#D4AF37', 3)
      + E(106, 120, 80, 18, '#A1662F') + Lc('M44 118c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0', '#FFF8E1', 4) + Lc('M50 126c10-5 20 5 30 0s20 5 30 0 20 5 30 0 20 5 24 0', '#FFF8E1', 4)
      + R(58, 98, 30, 18, '#E0A040', 4, 3) + C(124, 108, 12, '#FFFFFF', 3) + Lc('M118 108a6 6 0 1 1 6 6', '#F06292', 2.5) + E(156, 112, 16, 8, '#8D5A3C', 3)
      + C(102, 104, 9, '#FFB300', 3) + [[84, 118], [140, 120], [70, 112], [150, 104]].map(([x, y]) => C(x, y, 3.5, '#7CB342', 1.5)).join('') + steam([80, 112, 144], 84) + face(106, 160, 0.4)),

  L('imabaritowel', 'ผ้าขนหนูอิมาบาริ ผ้านุ่มฟูของเมืองอิมาบาริ', 'Imabari towels, soft and fluffy', ['imabari towel', 'ผ้าขนหนูอิมาบาริ', 'towels', 'ผ้าขนหนู', 'fluffy', 'นุ่มฟู', 'imabari', 'อิมาบาริ', 'cotton', 'ผ้าฝ้าย', 'folded stack', 'ผ้าพับซ้อนกัน'], 'หาผ้าผืนบนสุดที่ยิ้มอยู่', 'Find the smiling towel on top',
    // a neat stack of four folded fluffy towels in pastel pink, mint, sky blue and cream with soft wavy edges, the top one smiling with a little tag, a small rubber duck beside
    E(116, 206, 90, 10, '#ECEFF1', 0) + [[176, '#FFF3C4'], [148, '#B3E5FC'], [120, '#C8E6C9'], [92, '#F8BBD0']].map(([y, c]) => R(40, y, 150, 28, c, 12) + Lc(`M50 ${y + 22}q10-4 20 0t20 0t20 0t20 0t20 0t20 0t10 0`, '#FFFFFF', 2.5)).join('')
      + R(156, 96, 18, 22, '#FFFFFF', 2, 2.5) + Lc('M160 104h10M160 110h8', '#90A4AE', 2) + face(110, 104, 0.36)
      + E(212, 194, 14, 10, '#FFEB3B', 3) + C(214, 178, 9, '#FFEB3B', 3) + P('M222 178l8 2-8 3z', '#FB8C00', 2) + C(216, 176, 1.6, INK, 0)),

  L('uchikoza', 'โรงละครคาบูกิอุจิโกะซะ อาคารไม้เก่า', 'Uchiko-za, the old wooden kabuki theatre of Uchiko', ['uchiko-za', 'อุจิโกะซะ', 'uchiko', 'อุจิโกะ', 'kabuki theatre', 'โรงละครคาบูกิ', 'wooden theatre', 'โรงละครไม้', 'old town', 'เมืองเก่า', 'banners', 'ธงผ้า'], 'หาธงผ้าหลากสีที่ตั้งเรียงหน้าโรงละคร', 'Find the colourful banners standing in front of the theatre',
    // a big two-storey wooden theatre with a grey tiled roof and a curved gable over the door, a row of red lanterns under the eaves, tall coloured banners standing on poles in front
    bg('#FFF8E1') + low(190, '#D7CCC8') + frame + R(46, 104, 148, 86, '#A1887F') + P('M30 108l22-34h136l22 34z', '#607D8B') + P('M96 76q24-30 48 0z', '#546E7A')
      + R(60, 118, 120, 20, '#FFFDF5', 0, 3) + Lc('M80 118v20M100 118v20M120 118v20M140 118v20M160 118v20', '#A1887F', 2) + P('M100 190v-34h40v34z', '#5D4037')
      + [70, 94, 146, 170].map((x) => E(x, 150, 7, 9, '#E53935', 2.5)).join('') + Lc('M60 142h120', INK, 2)
      + [[30, '#E53935'], [44, '#1E88E5'], [196, '#FFB300'], [210, '#43A047']].map(([x, c]) => Lc(`M${x} 196v-96`, INK, 2.5) + R(x, 104, 10, 70, c, 0, 2.5)).join('') + face(120, 92, 0.3)),

  L('shimonada', 'สถานีชิโมนาดะริมทะเลยามพระอาทิตย์ตก', 'Shimonada station by the sea at sunset', ['shimonada station', 'สถานีชิโมนาดะ', 'seaside station', 'สถานีริมทะเล', 'one platform', 'ชานชาลาเดียว', 'sunset', 'พระอาทิตย์ตก', 'seto inland sea', 'ทะเลเซโตะใน', 'little bench', 'ม้านั่งตัวเล็ก'], 'หาม้านั่งตัวเล็กที่หันหน้าออกทะเล', 'Find the little bench facing the sea',
    // a pink-and-orange sunset sky over a calm sea, a smiling sun touching the water, a short concrete platform along the shore with a little wooden shelter roof, one bench and a station sign
    bg('#FFCCBC') + P('M16 118h208v40H16z', '#FFB74D', 0) + C(120, 116, 22, '#FFEE58') + P('M16 120h208v56H16z', '#4FC3F7', 0) + Lc('M90 134h60M100 146h40M108 158h24', '#FFF59D', 3) + face(120, 106, 0.32)
      + low(176, '#BDBDBD') + frame + Lc('M16 176h208', INK, 3) + Lc('M16 204h208M16 212h208', '#8D6E63', 3)
      + R(150, 120, 6, 56, '#8D6E63', 0, 3) + R(196, 120, 6, 56, '#8D6E63', 0, 3) + P('M140 124l10-12h56l10 12z', '#795548') + R(158, 154, 36, 8, '#FFCA28', 2, 3) + Lc('M162 162v12M190 162v12', INK, 3)
      + Lc('M58 176v-34', INK, 3) + R(36, 128, 44, 16, '#FFFFFF', 3, 3) + Lc('M44 136h28', '#1E88E5', 3)),

  L('tobeware', 'ชามเครื่องเคลือบโทเบะลายครามสีฟ้า', 'Tobe ware, thick white porcelain with blue patterns', ['tobe ware', 'เครื่องเคลือบโทเบะ', 'tobeyaki', 'โทเบะยากิ', 'blue and white porcelain', 'เครื่องเคลือบขาวคราม', 'thick bowl', 'ชามหนา', 'tobe', 'โทเบะ', 'pottery village', 'หมู่บ้านเครื่องปั้น'], 'หาลายเถาวัลย์สีฟ้าที่ม้วนรอบชาม', 'Find the curly blue vine painted round the bowl',
    // a big thick white bowl painted with curly indigo vines and a band at the rim, a matching little cup beside it, both smiling
    E(120, 206, 96, 10, '#ECEFF1', 0) + P('M30 104h132c0 52-28 92-66 92s-66-40-66-92z', '#FFFFFF') + E(96, 104, 66, 14, '#FAFAFA') + E(96, 104, 54, 9, '#E3F2FD', 2.5)
      + Lc('M40 120c56 10 76 10 112 0', '#1E3A8A', 4) + Lc('M48 140c10-10 20 10 30 0s20 10 30 0 20 10 30 0M60 164c10-8 18 8 26 0s18 8 26 0 18 8 26 0', '#3949AB', 3)
      + [[52, 152], [84, 152], [116, 152], [70, 176], [104, 176]].map(([x, y]) => C(x, y, 3, '#3949AB', 0)).join('') + R(76, 192, 40, 8, '#FFFFFF', 3, 3)
      + P('M168 140h46l-6 54h-34z', '#FFFFFF') + Lc('M170 152h42', '#1E3A8A', 3) + Lc('M176 170c6-6 12 6 18 0s10 6 14 0', '#3949AB', 2.5)
      + face(96, 148, 0.4) + face(191, 178, 0.24)),

  L('kurushimatide', 'เรือชมน้ำวนช่องแคบคุรุชิมะใต้สะพาน', 'A boat in the Kurushima Strait whirlpools under the bridge', ['kurushima strait', 'ช่องแคบคุรุชิมะ', 'whirlpools', 'น้ำวน', 'tidal current', 'กระแสน้ำขึ้นลง', 'sightseeing boat', 'เรือชมวิว', 'kurushima kaikyo bridge', 'สะพานคุรุชิมะไคเคียว', 'imabari', 'อิมาบาริ'], 'หาน้ำวนรูปก้นหอยข้างเรือ', 'Find the spiral whirlpool next to the boat',
    // the white towers and deck of the big bridge across the top, a deep blue strait below swirling with spiral whirlpools, a small red-and-white sightseeing boat bobbing through them
    bg('#B3E5FC') + low(96, '#1E88E5') + frame + R(16, 74, 208, 8, '#FFFFFF', 0, 3) + R(54, 30, 6, 46, '#FFFFFF', 0, 3) + R(180, 30, 6, 46, '#FFFFFF', 0, 3)
      + Lc('M16 52q20 20 41-20q40 50 79 30q30 20 47-30q20 30 41 20', '#FFFFFF', 3)
      + [[60, 130], [182, 128], [92, 188], [170, 192]].map(([x, y]) => Lc(`M${x} ${y}m-3 0a3 3 0 1 1 6 0a8 8 0 1 1-15 0a13 13 0 1 1 26 0`, '#BBDEFB', 3.5)).join('')
      + P('M74 160h96l-14 22H90z', '#FFFFFF') + Lc('M80 168h82', '#E53935', 4) + R(100, 138, 40, 22, '#FFFFFF', 4) + R(106, 142, 10, 8, '#90CAF9', 0, 2.5) + R(124, 142, 10, 8, '#90CAF9', 0, 2.5)
      + Lc('M120 138v-12', INK, 3) + P('M120 126h14l-14 6z', '#E53935', 2) + face(122, 168, 0.22, 'none')),
];

export default {
  places: {
    [CITY]: { country: 'jp', wave: 3, name: nm('มัตสึยามะ', 'Matsuyama'), tz: 'Asia/Tokyo', ll: [33.84, 132.77], alias: ['matsuyama', 'มัตสึยามะ', '松山市', 'MYJ', 'ehime', 'เอฮิเมะ', '愛媛', 'dogo onsen', 'dōgo onsen', 'โดโกะออนเซ็น', '道後温泉', 'shimanami kaido', 'shimanami kaidō', 'shimanami', 'ชิมานามิ', 'imabari', 'อิมาบาริ', 'uchiko', 'อุจิโกะ', 'shimonada', 'ชิโมนาดะ', 'uwajima', 'อุวาจิมะ'], colors: MY },
  },
  items,
};
