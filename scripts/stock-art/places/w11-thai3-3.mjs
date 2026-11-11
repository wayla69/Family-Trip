// Wave 11, Thailand (north): Nan, Pua, Bo Kluea, Sapan and Doi Samer Dao — the city stamp, two day scenes and the place's own
// landmarks, foods, crafts and mountain wonders; temples only as buildings (no figures, no murals with people)
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NN = { k1: '#8E2C48', k2: '#C99A2E', k3: '#FBEFF3' };
const CITY = 'th-nan', DIR = 'th/nan';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// Wat Phumin seen corner-on: a cross-shaped hall, a stacked roof in the middle and a gabled porch on each side (x = centre, b = base, s = size)
const phumin = (x, b, s, sw) => R(x - 46 * s, b - 34 * s, 92 * s, 34 * s, '#FFFFFF', 0, sw) + R(x - 20 * s, b - 46 * s, 40 * s, 46 * s, '#FFF8E1', 0, sw)
  + P(`M${x - 60 * s} ${b - 30 * s}l${22 * s}-${22 * s}h${76 * s}l${22 * s} ${22 * s}z`, '#C62828', sw) + P(`M${x - 30 * s} ${b - 44 * s}l${30 * s}-${30 * s} ${30 * s} ${30 * s}z`, '#B71C1C', sw)
  + P(`M${x - 20 * s} ${b - 72 * s}l${20 * s}-${22 * s} ${20 * s} ${22 * s}z`, '#C62828', sw) + Lc(`M${x} ${b - 94 * s}v-${12 * s}`, '#FFCA28', 3) + Lc(`M${x - 30 * s} ${b - 44 * s}h${60 * s}M${x - 20 * s} ${b - 72 * s}h${40 * s}`, '#FFCA28', 3)
  + P(`M${x - 10 * s} ${b}v-${20 * s}c0-${10 * s} ${20 * s}-${10 * s} ${20 * s} 0v${20 * s}z`, '#6D4C41', sw);
const hill = (d, fill) => P(d, fill);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับน่าน', 'Nan stamp'), kw: ['nan province', 'จังหวัดน่าน', 'เมืองน่าน', 'wat phumin', 'วัดภูมินทร์', 'bo kluea', 'บ่อเกลือ'],
    // the cross-shaped Wat Phumin hall with its stacked red roofs and golden ridges
    svg: cityStamp('nan-st', { name: 'NAN', sub: 'PUA · BO KLUEA · THAILAND', ...NN, emblem: phumin(100, 134, 0.85, 2.5) + R(52, 134, 96, 6, '#E0E0E0', 0, 2) }) },

  D('oldtown', 'เมืองเก่าน่านริมแม่น้ำ', 'Old Nan town by its river', ['nan old town', 'เมืองเก่าน่าน', 'nan river', 'แม่น้ำน่าน', 'wat phumin', 'วัดภูมินทร์', 'slow town', 'เมืองเก่าเงียบสงบ', 'cycling the old town', 'ปั่นจักรยานชมเมือง'],
    // Wat Phumin's cross-shaped hall among trees, green hills behind, the wide calm Nan river in front with a quiet sandy bank
    scene('nan-d1', '#E1F5FE', hill('M-4 120c40-30 80-40 120-20s80-40 128-10v40H-4z', '#A5D6A7') + hill('M-4 140c50-20 100-10 140-24s70 4 108 0v40H-4z', '#81C784')
      + phumin(118, 172, 1.1) + C(40, 150, 22, '#43A047') + C(204, 150, 24, '#43A047') + R(-4, 170, 248, 14, '#E6CFA0') + P('M-4 184h248v70H-4z', '#4FC3F7')
      + Lc('M30 204h40M140 214h50M90 230h30', '#E1F5FE', 3) + face(118, 150, 0.32))),

  D('samerdao', 'หน้าผาทุ่งหญ้าดอยเสมอดาวยามเย็น', 'Doi Samer Dao\'s grassy cliff at golden sunset', ['doi samer dao', 'ดอยเสมอดาว', 'grassy cliff', 'ลานหญ้าหน้าผา', 'golden sunset', 'พระอาทิตย์ตก', 'mountain ridges', 'ทิวเขา', 'si nan national park', 'อุทยานแห่งชาติศรีน่าน'],
    // a bare grassy cliff edge with one lone tree, layers of blue and purple hill ridges stepping away below, a big golden sun setting in an orange sky
    scene('nan-d2', '#FFCC80', P('M-4 60h248v40H-4z', '#FFE0B2', 0) + C(160, 100, 26, '#FFD54F') + P('M-4 110c40-20 70-6 100-16s70-14 100 0 30 6 48 2v30H-4z', '#B39DDB')
      + P('M-4 132c30-14 70-2 110-14s70-4 90 4 30 2 48-2v30H-4z', '#7E57C2') + P('M-4 156c40-12 70 0 110-8s60-6 90 2 30 2 48 0v30H-4z', '#5E35B1')
      + P('M-4 170c50-6 100-30 150-26 30 2 60 14 98 30v76H-4z', '#9CCC65') + P('M146 144c30 2 60 14 98 30v6c-36-16-66-26-98-30z', '#C5E1A5', 0) + Lc('M30 186l-4-8M60 180l2-8M110 190l3-8M200 196l4-8', '#558B2F', 3)
      + Lc('M64 176c-2-20 0-36 4-50', '#6D4C41', 6) + C(68, 116, 18, '#558B2F') + C(52, 126, 12, '#689F38') + C(84, 126, 12, '#689F38') + face(160, 98, 0.32))),

  L('phumin', 'วัดภูมินทร์โบสถ์จตุรมุข', 'Wat Phumin, the four-sided temple hall', ['wat phumin', 'วัดภูมินทร์', 'four-sided temple', 'โบสถ์จตุรมุข', 'cross-shaped hall', 'วิหารทรงจัตุรมุข', 'naga stairs', 'บันไดนาค', 'nan old town', 'เมืองเก่าน่าน'], nm('หาประตูที่หันออกไปทั้งสี่ทิศ', 'Find the doors facing out on every side'),
    // the cross-shaped white hall with its stacked red roofs and golden ridges, a porch on each side and long wavy naga-snake balustrades running down the front steps (building only)
    phumin(120, 184, 1.7) + Lc('M28 214c20-10 30-30 48-30M212 214c-20-10-30-30-48-30', '#2E7D32', 9) + Lc('M28 214c20-10 30-30 48-30M212 214c-20-10-30-30-48-30', '#81C784', 3)
    + R(88, 184, 64, 10, '#E0E0E0', 0) + R(80, 194, 80, 10, '#EEEEEE', 0) + R(72, 204, 96, 10, '#E0E0E0', 0) + face(120, 140, 0.45)),

  L('chaehaeng', 'พระธาตุแช่แห้งสีทอง', 'The golden stupa of Phra That Chae Haeng', ['phra that chae haeng', 'พระธาตุแช่แห้ง', 'golden stupa', 'เจดีย์สีทอง', 'hilltop temple', 'วัดบนเนิน', 'lanna style', 'ศิลปะล้านนา', 'nan', 'น่าน'], nm('หาฉัตรเล็กๆ บนยอดเจดีย์สีทอง', 'Find the little tiered umbrella on top of the golden stupa'),
    // a tall golden Lanna stupa on a stepped square base, a bell with ringed tiers narrowing up to a slim spire and a small tiered umbrella, on a green hill
    P('M10 216c40-30 180-30 220 0z', '#9CCC65') + R(60, 176, 120, 22, '#FFD54F') + R(74, 156, 92, 20, '#FFCA28') + R(86, 138, 68, 18, '#FFD54F')
    + P('M90 138c0-26 14-40 30-40s30 14 30 40z', '#FFCA28') + [0, 1, 2, 3].map((k) => R(110 - k * 0 + k * 2, 84 - k * 12, 20 - k * 4, 12, '#FFD54F', 4)).join('') + P('M116 40l4-24 4 24z', '#FFCA28')
    + [0, 1, 2].map((k) => Lc(`M${110 + k * 3} ${30 - k * 6}h${20 - k * 6}`, '#F9A825', 3)).join('') + Lc('M120 16v-8', INK, 2) + face(120, 122, 0.4)
    + P('M120 6l3 6-3 0-3 0z', '#FFF59D', 0)),

  L('saltwell', 'บ่อเกลือภูเขาที่บ่อเกลือ', 'The mountain salt wells of Bo Kluea', ['bo kluea', 'บ่อเกลือ', 'mountain salt', 'เกลือภูเขา', 'salt well', 'บ่อน้ำเกลือ', 'boiling brine', 'ต้มน้ำเกลือ', 'local salt', 'เกลือสินเธาว์'], nm('หากองเกลือสีขาวในตะกร้า', 'Find the pile of white salt in the basket'),
    // a square wooden salt well with a long bamboo pole and bucket for lifting brine, a little shed where a big pan of salt water boils over a wood fire, a basket heaped with white salt
    R(20, 140, 60, 50, '#A1887F') + Lc('M20 158h60M20 174h60', '#8D6E63', 2.5) + Lc('M50 140V60', '#8D6E63', 6) + Lc('M14 80l90-30', '#C0A060', 6) + Lc('M100 52v50', INK, 2) + P('M90 100h20l-3 18h-14z', '#4FC3F7')
    + P('M110 80l50-30 50 30z', '#6D4C41') + Lc('M118 80v100M202 80v100', '#8D6E63', 5) + P('M120 140h80l-6 16h-68z', '#78909C') + E(160, 140, 40, 6, '#B3E5FC', 2.5)
    + [[140, 168], [160, 172], [180, 168]].map(([x, y]) => P(`M${x - 8} ${y + 10}c0-10 4-18 8-24 4 6 8 14 8 24z`, '#FF7043', 2)).join('') + Lc('M146 124c-4-10 4-14 0-24M174 124c-4-10 4-14 0-24', '#CFD8DC', 3)
    + P('M80 210h70l-8-24H88z', '#D7A86E') + P('M86 190c4-20 54-20 58 0z', '#FFFFFF') + face(115, 200, 0.3)),

  L('sapan', 'หมู่บ้านสะปันริมลำธาร', 'Sapan village by its clear stream', ['sapan village', 'บ้านสะปัน', 'mountain village', 'หมู่บ้านในหุบเขา', 'clear stream', 'ลำธารใส', 'bo kluea', 'บ่อเกลือ', 'quiet getaway', 'พักผ่อนเงียบๆ'], nm('หาก้อนหินกลมๆ ใต้น้ำใส', 'Find the round stones under the clear water'),
    // a few wooden houses on stilts with grey roofs under layered green mountains, a clear stream with round stones in front, rice-paddy green
    R(10, 30, 220, 180, '#E1F5FE', 36) + hill('M10 110c40-60 80-60 110-30s50-50 110-10v40H10z', '#81C784') + hill('M10 130c50-30 100-30 130-10s60-20 90-10v30H10z', '#66BB6A')
    + [[60, 120], [116, 116], [172, 122]].map(([x, y]) => R(x - 18, y, 36, 20, '#D7A86E') + P(`M${x - 24} ${y + 2}l24-16 24 16z`, '#78909C') + Lc(`M${x - 14} ${y + 20}v14M${x + 14} ${y + 20}v14`, '#8D6E63', 3)).join('')
    + P('M10 150h220v20H10z', '#AED581') + P('M10 168c60-8 160-8 220 0v12c0 16-14 30-30 30H40c-16 0-30-14-30-30z', '#80DEEA')
    + [[50, 186], [90, 196], [140, 190], [184, 184], [116, 204]].map(([x, y]) => E(x, y, 10, 6, '#B0BEC5', 2.5)).join('') + face(116, 126, 0.3)),

  L('racingboat', 'เรือแข่งน่านหัวพญานาคจอดพัก', 'Nan\'s long boats with dragon-snake prows at rest', ['nan long boats', 'เรือแข่งเมืองน่าน', 'naga prow', 'หัวเรือพญานาค', 'boat shed', 'โรงเก็บเรือ', 'painted boat', 'เรือทาสี', 'nan river', 'แม่น้ำน่าน'], nm('หาหัวเรือรูปพญานาคที่ชูคอสูง', 'Find the boat\'s tall painted dragon-snake head'),
    // a long slim wooden racing boat resting on trestles under a shed roof, its tall painted naga-head prow curving up at one end and a curly tail at the other
    P('M10 60l110-36 110 36z', '#8D6E63') + Lc('M24 60v140M216 60v140', '#6D4C41', 6) + [60, 120, 180].map((x) => R(x - 8, 170, 16, 30, '#A1887F', 2)).join('')
    + P('M30 150h170c-10 16-30 22-70 22s-80-6-100-22z', '#2E7D32') + Lc('M40 156h150', '#FFCA28', 4) + [60, 90, 120, 150, 180].map((x) => C(x, 164, 3, '#E53935', 0)).join('')
    + P('M184 152c14-24 16-56 8-80h18c10 26 6 60-10 80z', '#E53935') + P('M190 74c-2-16 10-26 24-24 12 2 18 12 16 22l-14 4 10 8c-8 8-22 6-30 0z', '#E53935') + P('M196 54c-6-12-2-22 8-26 0 10 4 16 10 22', '#FFCA28', 2.5)
    + C(214, 64, 4, '#FFFFFF', 2) + C(215, 64, 1.8, INK, 0) + Lc('M196 96c4 14 4 30-2 46', '#FFCA28', 4) + P('M30 150c-14-6-18-20-8-28 6 6 4 14 12 18', '#FFCA28') + face(120, 140, 0.3)),

  L('tailueloom', 'ผ้าทอไทลื้อบนกี่', 'Tai Lue cloth on the loom', ['tai lue weaving', 'ผ้าทอไทลื้อ', 'loom', 'กี่ทอผ้า', 'nam lai pattern', 'ลายน้ำไหล', 'handwoven cloth', 'ผ้าทอมือ', 'pua', 'ปัว'], nm('หาลายน้ำไหลซิกแซกบนผ้า', 'Find the flowing-water zigzags woven into the cloth'),
    // a wooden hand loom with a half-woven cloth in bright Tai Lue stripes and flowing-water zigzags, threads stretched behind and a wooden shuttle
    R(20, 40, 12, 170, '#8D6E63', 3) + R(208, 40, 12, 170, '#8D6E63', 3) + R(20, 40, 200, 12, '#A1887F', 3) + Array.from({ length: 12 }, (_, k) => Lc(`M${46 + k * 14} 52v50`, '#FFE0B2', 1.8)).join('')
    + R(40, 100, 160, 90, '#C62828') + Lc('M40 116h160M40 174h160', '#FFCA28', 6) + Lc('M40 146l16-12 16 12 16-12 16 12 16-12 16 12 16-12 16 12 16-12 16 12', '#29B6F6', 5) + Lc('M40 160l16-12 16 12 16-12 16 12 16-12 16 12 16-12 16 12 16-12 16 12', '#FFFFFF', 3)
    + R(32, 96, 176, 8, '#6D4C41', 3) + P('M70 206h100l-14 14H84z', '#D7A86E') + face(120, 126, 0.3)),

  L('somseethong', 'ส้มสีทองเมืองน่าน', 'A golden Nan orange', ['nan orange', 'ส้มสีทอง', 'som see thong', 'ส้มเขียวหวานน่าน', 'citrus orchard', 'สวนส้ม', 'sweet orange', 'ส้มหวาน', 'nan fruit', 'ผลไม้น่าน'], nm('หาเปลือกส้มสีเขียวปนทอง', 'Find the green-and-gold skin of the orange'),
    // a big round orange with green-gold skin, two leaves on the stem, and beside it a peeled one with bright orange segments
    C(90, 130, 62, '#C0CA33') + P('M50 100c20-30 60-36 90-14-30-6-60 0-90 14z', '#FFD54F', 0) + Lc('M90 68v-14', '#6D4C41', 5) + P('M92 58c20-20 44-14 50-4-20 8-36 10-50 4z', '#43A047') + face(90, 132, 0.6)
    + C(182, 178, 34, '#C0CA33') + C(182, 178, 27, '#FFA726', 2.5) + [0, 45, 90, 135].map((a) => { const r = a * Math.PI / 180, dx = Math.cos(r) * 26, dy = Math.sin(r) * 26; return Lc(`M${(182 - dx).toFixed(1)} ${(178 - dy).toFixed(1)}L${(182 + dx).toFixed(1)} ${(178 + dy).toFixed(1)}`, '#FFE0B2', 2.5); }).join('') + C(182, 178, 5, '#FFF3E0', 2)),

  L('chomphuphukha', 'ต้นชมพูภูคาบานสะพรั่ง', 'The pink chomphu phu kha tree in bloom', ['chomphu phu kha', 'ชมพูภูคา', 'rare tree', 'พันธุ์ไม้หายาก', 'pink blossoms', 'ดอกสีชมพู', 'doi phu kha', 'ดอยภูคา', 'pua', 'ปัว'], nm('หาช่อดอกสีชมพูที่ห้อยระย้า', 'Find the hanging bunches of pink flowers'),
    // a rare mountain tree on a green hillside covered in long hanging bunches of soft pink flowers, a few petals falling
    P('M20 210c40-24 160-24 200 0z', '#9CCC65') + Lc('M120 210v-80M120 150l-34-34M120 140l36-30', '#6D4C41', 8)
    + [[80, 90, 40], [130, 70, 46], [170, 100, 36], [100, 120, 30], [150, 126, 28]].map(([x, y, r]) => C(x, y, r, '#A5D6A7')).join('')
    + [[70, 96], [96, 76], [124, 60], [150, 80], [176, 104], [104, 126], [144, 128], [84, 116]].map(([x, y]) => [0, 1, 2].map((k) => C(x, y + k * 8, 6 - k, '#F48FB1', 2)).join('')).join('')
    + [[40, 150], [196, 160], [60, 186]].map(([x, y]) => E(x, y, 5, 3, '#F8BBD0', 1.5)).join('') + face(120, 176, 0.3)),

  L('taopalm', 'ต้นเต่าร้างยักษ์', 'A giant fishtail palm', ['giant fishtail palm', 'ต้นเต่าร้างยักษ์', 'caryota', 'tao rang yak', 'doi phu kha', 'ดอยภูคา', 'mountain forest', 'ป่าบนดอย', 'rare palm', 'ปาล์มหายาก'], nm('หาใบที่หยักเหมือนหางปลา', 'Find the leaves shaped like little fish tails'),
    // a tall smooth palm trunk with huge arching fronds made of many fishtail-shaped leaflets, long strings of round fruits hanging down
    R(112, 90, 16, 130, '#8D6E63', 6) + Lc('M114 120h12M114 160h12M114 196h12', '#6D4C41', 2)
    + [[-1, 30], [1, 30], [-1, 70], [1, 70]].map(([s, d]) => { const ex = 120 + s * (40 + d), ey = 70 + d * 0.6; return Lc(`M120 90Q${120 + s * 30} 30 ${ex} ${ey}`, '#558B2F', 4) + [0.35, 0.55, 0.75, 0.95].map((t) => { const x = 120 + s * (40 + d) * t, y = 90 - 50 * Math.sin(t * Math.PI) * 0.8 + (ey - 90) * t; return P(`M${x.toFixed(1)} ${y.toFixed(1)}l${s * 6} 16 ${s * 8}-10z`, '#7CB342', 2); }).join(''); }).join('')
    + [[100, 96], [140, 96]].map(([x, y]) => Lc(`M${x} ${y}v60`, '#8D6E63', 2) + [0, 1, 2, 3, 4].map((k) => C(x + (k % 2 ? 3 : -3), y + 10 + k * 11, 4, '#AD1457', 1.5)).join('')).join('') + face(120, 180, 0.3)),

  L('nanmuseum', 'หอคำ พิพิธภัณฑ์น่าน', 'The old palace that is now Nan National Museum', ['nan national museum', 'พิพิธภัณฑสถานแห่งชาติน่าน', 'hor kham', 'หอคำ', 'old palace', 'วังเก่าเจ้าผู้ครองนคร', 'white building', 'อาคารสีขาว', 'nan old town', 'เมืองเก่าน่าน'], nm('หาหลังคาสีแดงสองชั้นซ้อนกัน', 'Find the red roof stacked in two layers'),
    // a white two-storey colonial-style palace with a red two-tiered hipped roof, arched windows along both floors and wide front steps, trees beside
    C(30, 160, 22, '#66BB6A') + C(210, 160, 22, '#66BB6A') + R(40, 110, 160, 90, '#FFFFFF') + P('M30 112l20-30h140l20 30z', '#C62828') + P('M70 82l14-20h72l14 20z', '#B71C1C') + Lc('M30 112h180', INK, 3)
    + [60, 90, 150, 180].map((x) => P(`M${x - 8} 150v-22c0-10 16-10 16 0v22zM${x - 8} 192v-22c0-10 16-10 16 0v22z`, '#4FC3F7', 2.5)).join('') + P('M106 200v-34c0-14 28-14 28 0v34z', '#8D6E63')
    + R(90, 200, 60, 8, '#E0E0E0', 0, 2.5) + R(80, 208, 80, 8, '#EEEEEE', 0, 2.5) + face(120, 136, 0.35)),

  L('kapok', 'ดอกงิ้วแดงบนกิ่งโล่ง', 'Red kapok flowers on bare branches', ['red kapok', 'ดอกงิ้ว', 'cotton tree', 'ต้นงิ้ว', 'red flowers', 'ดอกไม้สีแดง', 'cool season', 'หน้าหนาว', 'nam ngiao', 'น้ำเงี้ยว'], nm('หาดอกงิ้วห้ากลีบสีแดงสด', 'Find the bright red five-petal flowers'),
    // bare grey-brown branches against the sky with big cup-shaped red five-petal flowers and yellow stamens, one flower fallen below
    Lc('M120 224V120M120 150L60 90M120 130L180 70M120 170L190 140M80 110L50 60M160 90l10-40', '#8D6E63', 7)
    + [[60, 88], [50, 58], [180, 68], [170, 44], [190, 140], [100, 110], [146, 104], [124, 120]].map(([x, y]) => [0, 72, 144, 216, 288].map((a) => { const r = a * Math.PI / 180; return E(x + Math.cos(r) * 9, y + Math.sin(r) * 9, 7, 7, '#E53935', 2); }).join('') + C(x, y, 5, '#FFCA28', 1.5)).join('')
    + [0, 72, 144, 216, 288].map((a) => { const r = a * Math.PI / 180; return E(80 + Math.cos(r) * 13, 210 + Math.sin(r) * 6, 10, 6, '#EF5350', 2); }).join('') + C(80, 210, 6, '#FFCA28', 2) + face(120, 190, 0.3)),

  L('makwaen', 'มะแขว่นพริกไทยภูเขา', 'Makwaen, the mountain pepper', ['makwaen', 'มะแขว่น', 'mountain pepper', 'พริกไทยภูเขา', 'prickly ash', 'zanthoxylum', 'northern spice', 'เครื่องเทศเหนือ', 'nan', 'น่าน'], nm('หาเมล็ดดำเล็กๆ ที่โผล่จากผลที่แตก', 'Find the tiny black seeds peeking from the split berries'),
    // a sprig of makwaen with feathery leaflets and clusters of little red-pink berries, a few split open showing shiny black seeds, a tiny dish of the spice
    Lc('M40 210C80 160 110 110 170 40', '#8D6E63', 5) + [[70, 170, -1], [96, 130, 1], [124, 96, -1], [150, 64, 1]].map(([x, y, s]) => [0, 1, 2].map((k) => E(x + s * (16 + k * 12), y - 6 + k * 4, 9, 4, '#66BB6A', 2)).join('')).join('')
    + [[110, 150], [140, 116], [86, 186]].map(([x, y]) => [[0, 0], [10, -4], [6, 8], [-8, 6], [16, 6]].map(([dx, dy], k) => C(x + dx, y + dy, 6, '#E53935', 2) + (k === 1 ? C(x + dx, y + dy, 2.5, INK, 0) : '')).join('')).join('')
    + E(186, 200, 30, 10, '#FFFFFF') + E(186, 196, 22, 6, '#8D6E63', 2) + face(140, 160, 0.3)),

  L('namngiao', 'ขนมเส้นน้ำเงี้ยว', 'Khanom sen nam ngiao noodle soup', ['nam ngiao', 'น้ำเงี้ยว', 'khanom sen', 'ขนมเส้น', 'tomato noodle soup', 'ก๋วยเตี๋ยวน้ำมะเขือเทศ', 'northern noodles', 'อาหารเหนือ', 'dried kapok flowers', 'ดอกงิ้วแห้ง'], nm('หาลูกมะเขือเทศลอยในน้ำแกงสีส้มแดง', 'Find the cherry tomatoes floating in the red-orange soup'),
    // a deep bowl of red-orange tomato broth with white rice noodles, little cherry tomatoes and minced pork, crispy dried chillies and bean sprouts beside on a plate
    P('M30 110h150c0 50-30 80-75 80s-75-30-75-80z', '#FFFFFF') + E(105, 110, 75, 16, '#FF7043') + Lc('M50 110c14-6 24 6 38 0s24 6 38 0 22 6 34 0', '#FFF8E1', 3)
    + [[70, 106], [130, 108], [104, 102]].map(([x, y]) => C(x, y, 7, '#E53935', 2)).join('') + C(150, 104, 4, '#8D6E63', 1.5) + C(84, 112, 4, '#8D6E63', 1.5) + face(105, 150, 0.4)
    + E(186, 186, 40, 12, '#FFFFFF') + Lc('M166 180l12 4M176 176l14 6', '#F5F5F5', 4) + P('M196 170c6 4 10 10 8 18', '#B71C1C', 3) + P('M206 172c6 4 8 10 6 16', '#C62828', 3)),

  L('ricepounder', 'ครกกระเดื่องพลังน้ำ', 'A water-powered rice pounder', ['water rice pounder', 'ครกกระเดื่องน้ำ', 'rice pounding', 'ตำข้าว', 'bamboo pipe', 'รางไม้ไผ่', 'village life', 'วิถีชาวบ้าน', 'sapan village', 'บ้านสะปัน'], nm('หารางไม้ไผ่ที่ปล่อยน้ำลงถังไม้', 'Find the bamboo pipe pouring water into the wooden scoop'),
    // a long wooden beam on a post: a bamboo pipe pours stream water into the scoop at one end, which tips it down so the pestle at the other end rises and thumps into a wooden mortar of rice
    Lc('M10 46h70', '#9CCC65', 10) + Lc('M10 46h70', '#C5E1A5', 4) + Lc('M80 46c6 6 6 18 2 30', '#4FC3F7', 5) + P('M60 90h46l-8 30H66z', '#A1887F')
    + Lc('M80 110L210 70', '#8D6E63', 10) + R(130, 92, 14, 120, '#6D4C41', 3) + C(137, 90, 6, '#FFCA28', 2) + R(198, 70, 14, 50, '#8D6E63', 4)
    + P('M180 160h50l-6 50h-38z', '#A1887F') + E(205, 160, 25, 6, '#FFF8E1', 2.5) + P('M20 210c40-10 90-10 120 0z', '#4FC3F7') + face(205, 182, 0.3)),

  L('lueehouse', 'เรือนไทลื้อหลังคาทรงสูง', 'A Tai Lue wooden house with a tall sweeping roof', ['tai lue house', 'เรือนไทลื้อ', 'wooden house', 'บ้านไม้', 'ban nong bua', 'บ้านหนองบัว', 'stilt house', 'บ้านใต้ถุนสูง', 'village', 'หมู่บ้าน'], nm('หาบันไดไม้ที่พาขึ้นไปบนบ้าน', 'Find the wooden ladder up into the house'),
    // a dark wooden house raised on posts with a huge steep tiled roof sweeping low over a small veranda, a wooden ladder, a big clay water jar underneath
    P('M30 100L120 30l90 70-14 6L120 50 44 106z', '#795548') + P('M44 104L120 46l76 58v4H44z', '#8D6E63') + R(60, 104, 120, 50, '#A1887F') + Lc('M60 120h120M60 136h120', '#8D6E63', 2)
    + R(80, 112, 24, 30, '#5D4037', 2) + R(140, 112, 22, 20, '#FFE082', 2) + [64, 100, 140, 176].map((x) => Lc(`M${x} 154v56`, '#6D4C41', 6)).join('') + Lc('M196 150l20 60M206 150l20 60M200 166h18M206 186h18', '#A1887F', 4)
    + E(120, 196, 18, 16, '#BF6B3C') + Lc('M108 184h24', '#8D6E63', 3) + P('M20 212h200v8H20z', '#9CCC65') + face(120, 80, 0.35)),
  L('khaonoi', 'มองเมืองน่านจากดอยเขาน้อย', 'Nan town seen from the hill at sunset', ['phra that khao noi', 'พระธาตุเขาน้อย', 'hilltop viewpoint', 'จุดชมวิวบนเนิน', 'town view', 'วิวเมือง', 'sunset', 'พระอาทิตย์ตก', 'nan valley', 'หุบเขาน่าน'], nm('หาแม่น้ำที่คดเคี้ยวผ่านเมืองข้างล่าง', 'Find the river winding through the town below'),
    // a railing on a hilltop terrace looking down at a little town of red roofs in a green valley, a winding river, misty blue hills and an orange sunset
    R(16, 24, 208, 190, '#FFCC80', 34) + C(170, 70, 18, '#FFF176') + P('M16 96c40-26 80-26 110-10s60-20 98-6v30H16z', '#9FA8DA') + P('M16 112h208v70H16z', '#9CCC65')
    + Lc('M30 176c30-30 70-10 90-30s50-20 104-26', '#4FC3F7', 8) + [[50, 130], [76, 140], [104, 126], [140, 150], [166, 134], [190, 146], [120, 160]].map(([x, y]) => R(x - 7, y, 14, 8, '#FFF8E1', 0, 2) + P(`M${x - 9} ${y}l9-7 9 7z`, '#E53935', 2)).join('')
    + P('M16 182h208v8c0 14-12 24-24 24H40c-12 0-24-10-24-24z', '#BCAAA4') + Lc('M16 182h208', '#8D6E63', 5) + [40, 90, 150, 200].map((x) => Lc(`M${x} 182v24`, '#8D6E63', 4)).join('') + face(170, 68, 0.3)),
  L('sipanton', 'วิหารสีทองวัดศรีพันต้น', 'The all-gold hall of Wat Si Panton', ['wat si panton', 'วัดศรีพันต้น', 'golden temple hall', 'วิหารสีทอง', 'gilded gables', 'หน้าบันปิดทอง', 'nan old town', 'เมืองเก่าน่าน', 'temple architecture', 'สถาปัตยกรรมวัด'], nm('หาหลังคาที่ซ้อนกันสามชั้นสีทองอร่าม', 'Find the three golden roofs stacked one over another'),
    // a long temple hall seen from the front, every wall, pillar and three-tiered roof covered in shining gold, red panels and white steps, sparkles round it (building only)
    R(40, 120, 160, 70, '#FFD54F') + [56, 88, 152, 184].map((x) => R(x - 6, 120, 12, 70, '#FFB300', 0, 2.5)).join('') + R(100, 132, 40, 58, '#C62828', 2, 3) + Lc('M120 132v58', '#FFD54F', 3)
    + P('M24 124l34-34h124l34 34z', '#FFCA28') + P('M50 92l30-30h80l30 30z', '#FFB300') + P('M80 64l40-40 40 40z', '#FFCA28') + Lc('M120 24v-14', '#FFB300', 4)
    + Lc('M24 124l-8-10M216 124l8-10M50 92l-8-10M190 92l8-10M80 64l-6-10M160 64l6-10', '#FFB300', 4) + P('M106 64l14-16 14 16z', '#C62828', 2.5)
    + R(84, 190, 72, 8, '#FFFFFF', 0, 2.5) + R(76, 198, 88, 8, '#F5F5F5', 0, 2.5) + R(68, 206, 104, 8, '#FFFFFF', 0, 2.5)
    + [[20, 70], [218, 64], [30, 180], [212, 176]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, '#FFF59D', 2)).join('') + face(120, 104, 0.35)),
];

export default {
  places: {
    'th-nan': { country: 'th', wave: 3, home: true, name: nm('น่าน ปัว และบ่อเกลือ', 'Nan, Pua and Bo Kluea'), tz: 'Asia/Bangkok', ll: [18.78, 100.78], alias: ['nan province', 'จังหวัดน่าน', 'เมืองน่าน', 'NNT', 'nan old town', 'pua', 'ปัว', 'bo kluea', 'บ่อเกลือ', 'sapan village', 'บ้านสะปัน', 'doi samer dao', 'ดอยเสมอดาว'], colors: NN },
  },
  items,
};
