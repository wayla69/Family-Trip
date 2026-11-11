// Wave 13, Thailand (deep south): Hat Yai and Songkhla — the city stamp, two day scenes and the place's own landmarks,
// foods and crafts; the Samila mermaid drawn as a generic cute mermaid on a rock (no likeness of the 1966 statue), the chedis
// only as buildings, the Nora costume on its stand (no dancer)
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const HY = { k1: '#0E7490', k2: '#E07A1F', k3: '#E6F7FA' };
const CITY = 'th-hatyai', DIR = 'th/hatyai';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a seaside pine: a thin trunk and three stacked dark-green tiers (x = foot, s = size)
const pine = (x, y, s = 1) => Lc(`M${x} ${y}v${-60 * s}`, '#795548', 4 * s) + [0, 1, 2].map((k) => P(`M${x - (18 - k * 4) * s} ${y - (24 + k * 16) * s}l${(18 - k * 4) * s} ${-22 * s} ${(18 - k * 4) * s} ${22 * s}z`, '#2E7D32', 3)).join('');
// a wavy line of sea foam
const foam = (x, y, w = 40, c = '#E1F5FE') => Lc(`M${x} ${y}q${w / 8} -5 ${w / 4} 0t${w / 4} 0t${w / 4} 0t${w / 4} 0`, c, 3);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับหาดใหญ่และสงขลา', 'Hat Yai and Songkhla stamp'), kw: ['hat yai', 'หาดใหญ่', 'songkhla', 'สงขลา', 'samila beach', 'หาดสมิหลา', 'mermaid tail', 'หางนางเงือก'],
    // a mermaid's teal tail flipping up out of the waves beside a round rock, the sun over the sea
    svg: cityStamp('hy-st', { name: 'HAT YAI', sub: 'SONGKHLA · THAILAND', ...HY, emblem: C(130, 74, 10, '#FFCA28', 2.5) + P('M60 132c4-16 16-24 30-24s26 8 30 24z', '#B0BEC5', 3)
      + Lc('M108 128c4-12 4-22 0-32', '#26A69A', 10) + P('M106 98c-14-2-22-10-24-22 10 4 18 6 24 12 6-6 14-8 24-12-2 12-10 20-24 22z', '#4DB6AC', 2.5)
      + R(56, 128, 88, 16, '#4FC3F7', 6, 2.5) + Lc('M60 136q6-4 12 0t12 0t12 0t12 0t12 0t12 0', '#E1F5FE', 2) }) },

  D('samila', 'หาดสมิหลากับเกาะหนูเกาะแมว', 'Samila Beach and the Cat and Rat Islands', ['samila beach', 'หาดสมิหลา', 'cat and rat islands', 'เกาะหนูเกาะแมว', 'songkhla beach', 'ชายหาดสงขลา', 'seaside pines', 'ต้นสนริมหาด', 'mermaid rock', 'นางเงือกทอง'],
    // a long white beach under seaside pines, the little rat island and the bigger cat island (with ears) out at sea, a tiny mermaid on a rock
    scene('hy-d1', '#B3E5FC', C(196, 54, 18, '#FFF59D', 3) + R(-4, 118, 248, 60, '#4FC3F7')
      + P('M44 126c4-10 12-16 24-16 8 0 16 4 20 16z', '#9CCC65') + C(56, 112, 6, '#9CCC65')
      + P('M110 126c2-16 12-26 26-26l2-12 10 10h10l10-10 2 12c12 4 20 14 22 26z', '#7CB342') + face(150, 112, 0.28, 'w')
      + foam(20, 146) + foam(150, 156) + P('M-4 170c60-14 180-14 248 0v80H-4z', '#FFE0B2') + pine(22, 200, 1.05) + pine(52, 214, 0.9)
      + P('M146 204c4-18 18-26 36-24s28 10 30 24z', '#90A4AE') + E(182, 172, 6, 9, '#FFCC80', 2.5) + C(182, 154, 8, '#FFCC80', 2.5) + P('M174 152c0-10 16-12 16 0l2 14-4-2z', '#F06292', 2.5)
      + P('M178 180c-6 6-10 12-22 14l4 4-10 2', '#26A69A', 4) + face(120, 220, 0.3))),

  D('lake', 'ทะเลสาบสงขลายามเย็น', 'Songkhla Lake at sunset', ['songkhla lake', 'ทะเลสาบสงขลา', 'lift nets', 'ยอยักษ์', 'tinsulanonda bridge', 'สะพานติณสูลานนท์', 'koh yor', 'เกาะยอ', 'lake sunset', 'พระอาทิตย์ตกทะเลสาบ'],
    // an orange sky over the wide calm lake, the long low bridge across it, a tall square lift net on bamboo poles and a hut on stilts in front
    scene('hy-d2', '#FFCC80', C(150, 112, 26, '#FF7043', 3) + P('M-4 116c40-20 80-24 110-10 30-18 70-20 138-6v20H-4z', '#8D6E63')
      + R(-4, 120, 248, 130, '#7986CB') + P('M-4 132q124-32 248 0v8q-124-30-248 0z', '#ECEFF1') + [20, 60, 100, 140, 180, 220].map((x) => R(x - 3, 126 - (x > 60 && x < 180 ? 8 : 0), 6, 14, '#CFD8DC', 0, 2)).join('')
      + Lc('M20 160q20-6 40 0M150 176q20-6 40 0', '#C5CAE9', 3) + R(18, 168, 46, 28, '#D7A86E') + P('M12 170l28-20 28 20z', '#A1887F') + Lc('M24 196v30M58 196v30', '#6D4C41', 4)
      + Lc('M62 180L176 104', '#A1887F', 5) + Lc('M176 104l-40 70M176 104l50 76M176 104l-14 96M176 104l22 96', '#BCAAA4', 4) + P('M136 174l26 26 36 0 28-20z', '#FFFFFF', 2.5)
      + face(182, 190, 0.3))),

  L('mermaid', 'นางเงือกน้อยบนโขดหิน', 'A little mermaid on the rocks by the sea', ['mermaid', 'นางเงือก', 'samila mermaid', 'นางเงือกหาดสมิหลา', 'golden mermaid', 'นางเงือกทอง', 'rocks by the sea', 'โขดหินริมทะเล', 'mermaid tail', 'หางปลา'], nm('หาหางปลาสีเขียวของนางเงือก', 'Find the mermaid\'s green fish tail'),
    // a smiling girl-mermaid with long pink hair and a shell top, sitting on a grey rock, her teal tail curling down to a big fin, waves below
    P('M30 216c6-40 40-58 86-58s80 18 90 58z', '#90A4AE') + P('M106 158c-12 30-32 42-60 40l-12-14-4 22 24 4c34 4 60-16 72-48z', '#26A69A')
    + [[70, 186], [84, 180], [98, 172]].map(([x, y]) => P(`M${x - 5} ${y}q5 6 10 0`, 'none', 2.5)).join('')
    + P('M90 92c-8 30-6 54 4 68l14-8c-8-16-10-36-6-58zM150 92c8 30 6 54-4 68l-14-8c8-16 10-36 6-58z', '#F06292')
    + E(120, 136, 22, 26, '#FFCC80') + C(120, 86, 30, '#FFCC80') + P('M88 92c-6-40 18-54 32-54s40 14 32 54c-6-14-12-22-16-26-10 8-28 10-44 0-2 8-2 16-4 26z', '#F06292')
    + P('M100 124c0-8 14-8 14 0zM126 124c0-8 14-8 14 0z', '#FFF59D', 2.5) + C(150, 48, 7, '#FFCA28', 2.5) + face(120, 92, 0.55)
    + foam(20, 222, 60, '#4FC3F7') + foam(160, 222, 60, '#4FC3F7')),

  L('catrat', 'เกาะหนูกับเกาะแมว', 'The Cat Island and the Rat Island', ['cat island', 'เกาะแมว', 'rat island', 'เกาะหนู', 'koh nu koh maeo', 'เกาะหนูเกาะแมว', 'samila sea', 'ทะเลสมิหลา', 'island legend', 'ตำนานเกาะ'], nm('หาเกาะที่มีหูแหลมเหมือนแมว', 'Find the island with pointy cat ears'),
    // two green islands in a blue sea: a small round one with a rat's ear, nose and tail, a bigger one with two pointy cat ears and whiskers
    E(120, 178, 112, 34, '#4FC3F7') + P('M118 168c2-38 24-62 54-62s50 24 54 62z', '#8BC34A') + P('M140 118l4-28 20 18zM204 118l-4-28-20 18z', '#8BC34A')
    + face(172, 136, 0.5, 'w') + Lc('M132 146h-14M134 154l-14 4M212 146h14M210 154l14 4', INK, 2.5)
    + P('M16 170c2-22 18-38 40-38 20 0 36 12 48 34l6 4z', '#AED581') + C(48, 130, 11, '#AED581') + C(48, 130, 5, '#F8BBD0', 0) + C(76, 148, 4, INK, 0) + C(108, 166, 4, '#F48FB1', 2)
    + Lc('M18 168c-12 8-8 22 6 24', '#689F38', 4) + foam(30, 196, 50) + foam(140, 200, 50)),

  L('tangkuan', 'เจดีย์บนเขาตังกวน', 'The white chedi on Tang Kuan hill', ['tang kuan hill', 'เขาตังกวน', 'hilltop chedi', 'เจดีย์บนยอดเขา', 'songkhla view', 'ชมวิวเมืองสงขลา', 'hill steps', 'บันไดขึ้นเขา', 'red pavilion', 'ศาลาบนเขา'], nm('หาบันไดซิกแซกที่ขึ้นไปบนยอดเขา', 'Find the zigzag steps up the hill'),
    // a round green hill with zigzag steps climbing it, a small white bell chedi with a slim white spire on top, a little red-roofed pavilion on the slope
    P('M8 216c30-84 70-130 112-130s82 46 112 130z', '#7CB342') + Lc('M120 216l-34-22 40-20-30-18 30-16', '#FFF8E1', 7)
    + R(96, 76, 48, 12, '#FAFAFA') + P('M100 76c0-22 8-32 20-32s20 10 20 32z', '#FFFFFF') + R(112, 36, 16, 8, '#FFFFFF', 0, 3) + P('M114 36l6-24 6 24z', '#FFFFFF') + C(120, 13, 3, '#FFCA28', 2)
    + face(120, 60, 0.35) + R(160, 132, 34, 20, '#FFF3E0') + P('M152 134l25-18 25 18z', '#D84315') + Lc('M166 152v12M188 152v12', '#6D4C41', 3) + C(48, 176, 16, '#388E3C') + C(196, 186, 14, '#388E3C')),

  L('museum', 'พิพิธภัณฑ์สถานแห่งชาติสงขลา', 'Songkhla National Museum, the old Chinese mansion', ['songkhla national museum', 'พิพิธภัณฑ์สถานแห่งชาติสงขลา', 'chinese mansion', 'คฤหาสน์จีน', 'curved roof ridge', 'หลังคาจีน', 'old governor house', 'จวนเจ้าเมือง', 'museum courtyard', 'ลานพิพิธภัณฑ์'], nm('หาปลายหลังคาที่งอนขึ้นเหมือนหางนก', 'Find the roof ends curling up like a swallow\'s tail'),
    // a long white two-storey Chinese-style mansion, a red tiled roof whose ridge ends curl up, a smaller roof on top, rows of brown shuttered windows, an arched door
    R(26, 112, 188, 92, '#FFF8E1') + P('M16 114l22-30h164l22 30z', '#E64A19') + P('M30 86c-8-2-12-10-10-18l10 10zM210 86c8-2 12-10 10-18l-10 10z', '#E64A19', 3)
    + P('M78 84l14-22h56l14 22z', '#E64A19') + P('M86 64c-6-2-8-8-6-14l8 8zM154 64c6-2 8-8 6-14l-8 8z', '#E64A19', 3)
    + [44, 74, 154, 184].map((x) => R(x - 9, 124, 18, 24, '#8D6E63', 2, 3) + R(x - 9, 164, 18, 26, '#8D6E63', 2, 3)).join('') + Lc('M26 156h188', '#BCAAA4', 3)
    + P('M104 204v-34c0-12 32-12 32 0v34z', '#6D4C41') + face(120, 136, 0.45) + R(10, 204, 220, 12, '#E0E0E0', 4)),

  L('oldhouse', 'บ้านจีนเก่าถนนนครใน', 'The old Chinese houses of Nakhon Nai Road', ['nakhon nai road', 'ถนนนครใน', 'nakhon nok road', 'ถนนนครนอก', 'songkhla old town', 'เมืองเก่าสงขลา', 'old chinese house', 'บ้านจีนโบราณ', 'wooden folding doors', 'ประตูบานเฟี้ยม'], nm('หาโคมแดงที่แขวนหน้าบ้าน', 'Find the red lantern hanging by the door'),
    // two narrow old two-storey houses side by side, one with a curly wave-shaped gable wall, teal wooden folding doors, shutters upstairs, a red lantern, a bit of bare brick
    P('M20 210V92c10-12 20-22 30-10 10-12 20-12 30 0 10-10 20-10 30 2v126z', '#FFE0B2') + R(120, 96, 100, 114, '#FFF59D') + P('M114 98l56-26 56 26z', '#A1522E')
    + [[30, 104], [64, 104], [134, 110], [178, 110]].map(([x, y]) => R(x, y, 26, 30, '#26A69A', 2, 3) + Lc(`M${x + 13} ${y}v30`, INK, 2)).join('')
    + [[30, 156], [64, 156]].map(([x, y]) => R(x, y, 26, 54, '#4DB6AC', 0, 3) + Lc(`M${x + 9} ${y}v54M${x + 17} ${y}v54`, INK, 2)).join('') + R(140, 156, 56, 54, '#00897B', 0)
    + Lc('M154 156v54M168 156v54M182 156v54', INK, 2) + R(196, 140, 18, 12, '#C1694F', 0, 2) + Lc('M100 144v8', INK, 2) + E(100, 160, 9, 11, '#E53935') + Lc('M95 160h10', '#FFCA28', 2.5)
    + face(168, 128, 0.4) + R(8, 210, 224, 8, '#BDBDBD', 3)),

  L('lakebridge', 'สะพานติณสูลานนท์ข้ามทะเลสาบ', 'The long Tinsulanonda bridge over Songkhla Lake', ['tinsulanonda bridge', 'สะพานติณสูลานนท์', 'longest concrete bridge', 'สะพานคอนกรีตยาว', 'koh yor bridge', 'สะพานไปเกาะยอ', 'songkhla lake', 'ทะเลสาบสงขลา', 'bridge over the lake', 'สะพานข้ามทะเลสาบ'], nm('หารถคันเล็กที่วิ่งข้ามสะพาน', 'Find the little car driving over the bridge'),
    // a long pale concrete bridge rising in a gentle hump over blue water on many square piers, lamp posts along it, a small red car with a face on top
    R(4, 150, 232, 60, '#4FC3F7', 18) + [24, 58, 92, 128, 162, 196].map((x) => R(x - 5, 150 - (x > 50 && x < 190 ? 22 : 10), 10, 52, '#CFD8DC', 0, 3)).join('')
    + P('M6 146q114-56 228 0v12q-114-54-228 0z', '#ECEFF1') + [40, 80, 160, 200].map((x) => Lc(`M${x} ${x < 120 ? 140 - (x - 6) * 0.3 : 140 - (234 - x) * 0.3}v-18`, INK, 3)).join('')
    + [[40, 112], [80, 104], [160, 104], [200, 112]].map(([x, y]) => C(x, y, 4, '#FFF59D', 2)).join('') + R(104, 98, 34, 18, '#E53935', 6) + C(112, 118, 5, INK, 0) + C(130, 118, 5, INK, 0)
    + R(112, 90, 18, 10, '#B3E5FC', 3, 2.5) + face(121, 104, 0.25) + foam(30, 186, 50) + foam(150, 194, 50)),

  L('liftnet', 'ยอยักษ์ในทะเลสาบสงขลา', 'A giant lift net on Songkhla Lake', ['lift net', 'ยอ', 'giant lift net', 'ยอยักษ์', 'lake fishing', 'จับปลาในทะเลสาบ', 'bamboo poles', 'ไม้ไผ่', 'fishing hut on stilts', 'ขนำกลางน้ำ'], nm('หาปลาตัวเล็กที่กระโดดอยู่ในตาข่าย', 'Find the little fish jumping in the net'),
    // a hut on stilts over the water, a long lever pole rising from it to four curved bamboo arms that hold up a big square net dripping water, a fish in the net
    R(4, 170, 232, 50, '#4DD0E1', 16) + R(14, 112, 54, 38, '#D7A86E') + P('M6 114l34-26 34 26z', '#A1887F') + R(32, 124, 16, 26, '#6D4C41', 0, 2.5) + Lc('M22 150v40M60 150v40', '#6D4C41', 5)
    + Lc('M66 136L170 58', '#A1887F', 6) + Lc('M170 58c-30 10-50 40-58 84M170 58c30 10 50 40 58 84M170 58c-10 20-20 50-24 98M170 58c12 22 18 50 18 98', '#BCAAA4', 4)
    + P('M112 142l34 14h42l40-14-36 26h-46z', '#FFFFFF', 3) + Lc('M126 150l10 14M146 156v12M168 156v12M188 156l-8 12M210 150l-10 14', '#B0BEC5', 2)
    + P('M150 138c6-10 20-10 26 0-6 10-20 10-26 0zM176 138l8-6v12z', '#FFB74D', 2.5) + C(156, 136, 2, INK, 0) + Lc('M112 172v10M228 172v10', '#81D4FA', 3) + face(40, 106, 0.3)),

  L('nairaeng', 'หัวนายแรง หินที่ทรงตัวบนหน้าผา', 'Hua Nai Raeng, the boulder balancing on the cliff', ['hua nai raeng', 'หัวนายแรง', 'khao seng', 'เขาเก็งเส็ง', 'balancing rock', 'หินทรงตัว', 'rock on the cliff edge', 'หินริมหน้าผา', 'boulder legend', 'ตำนานก้อนหิน'], nm('หาก้อนหินกลมที่เกือบจะกลิ้งตกทะเล', 'Find the round rock that nearly rolls into the sea'),
    // a tall brown rocky cliff on the right dropping to the sea, a big round boulder perched right on its edge, the sea and foam below on the left
    R(4, 176, 232, 44, '#4FC3F7', 16) + P('M92 220V150l20-30 40-10 50 6 30 20v84z', '#A1887F') + Lc('M120 140l14 20M170 130l-6 30M200 150l10 24', '#8D6E63', 3)
    + P('M120 118l10-8', 'none', 3) + C(118, 82, 34, '#BDBDBD') + P('M98 70c6-8 14-10 22-8', 'none', 3) + face(118, 82, 0.5, 'o')
    + foam(10, 196, 60) + foam(20, 210, 60) + C(200, 100, 14, '#43A047') + C(220, 106, 10, '#66BB6A') + C(40, 60, 12, '#FFF59D', 3)),

  L('folklore', 'สถาบันทักษิณคดีศึกษา เกาะยอ', 'The Thaksin Folklore Museum on Koh Yor', ['thaksin folklore museum', 'สถาบันทักษิณคดีศึกษา', 'koh yor', 'เกาะยอ', 'southern thai houses', 'เรือนไทยปักษ์ใต้', 'lookout tower', 'หอชมวิว', 'folk museum', 'พิพิธภัณฑ์พื้นบ้าน'], nm('หาหอคอยสูงที่มองเห็นทะเลสาบ', 'Find the tall tower looking over the lake'),
    // a green hillside with two southern-style houses with tall steep roofs and curved gable boards, a slim three-tier lookout tower beside them, the lake below
    R(4, 186, 232, 32, '#80DEEA', 12) + P('M4 196c40-30 120-44 232-20v20H4z', '#9CCC65')
    + [[54, 150], [110, 160]].map(([x, y]) => R(x - 24, y, 48, 30, '#FFF8E1') + P(`M${x - 30} ${y + 2}L${x} ${y - 40}L${x + 30} ${y + 2}z`, '#8D6E63') + P(`M${x - 10} ${y - 14}h20l-10-14z`, '#FFE0B2', 2.5) + R(x - 7, y + 10, 14, 20, '#6D4C41', 0, 2.5)).join('')
    + [0, 1, 2].map((k) => R(162 + k * 4, 172 - k * 40, 34 - k * 8, 40, '#FFFFFF') + P(`M${156 + k * 4} ${174 - k * 40}h${46 - k * 8}l-${23 - k * 4}-12z`, '#D84315')).join('')
    + P('M172 84l7-26 7 26z', '#D84315') + face(179, 110, 0.32) + face(54, 170, 0.3)),

  L('triphop', 'พระมหาเจดีย์ไตรภพไตรมงคล หาดใหญ่', 'Hat Yai\'s white chedi with a silver top', ['phra maha chedi tri phop tri mongkhon', 'พระมหาเจดีย์ไตรภพไตรมงคล', 'hat yai chedi', 'เจดีย์หาดใหญ่', 'silver spire', 'ยอดเงินแวววาว', 'stepped white chedi', 'เจดีย์ขาวซ้อนชั้น', 'small spires', 'ยอดเจดีย์เล็ก'], nm('หายอดสีเงินที่ส่องแสงวิบวับ', 'Find the shiny silver top that sparkles'),
    // a tall white chedi on three stepped square terraces, each corner topped with a little spire, a slim stepped tower and a shining silver pinnacle with sparkles
    R(24, 186, 192, 26, '#FAFAFA') + R(48, 156, 144, 30, '#FFFFFF') + R(72, 126, 96, 30, '#FAFAFA')
    + [[30, 186], [204, 186], [54, 156], [180, 156], [78, 126], [156, 126]].map(([x, y]) => P(`M${x - 6} ${y}l6-18 6 18z`, '#FFFFFF', 3)).join('')
    + P('M92 126c0-22 12-34 28-34s28 12 28 34z', '#FFFFFF') + R(106, 74, 28, 18, '#FFFFFF') + P('M110 74l10-50 10 50z', '#CFD8DC') + C(120, 22, 5, '#ECEFF1', 2.5)
    + P('M146 36l3-8 3 8 8 3-8 3-3 8-3-8-8-3zM86 48l2-6 2 6 6 2-6 2-2 6-2-6-6-2z', '#FFF59D', 2) + face(120, 140, 0.45) + R(96, 194, 48, 18, '#B0BEC5', 0, 3)),

  L('friedchicken', 'ไก่ทอดหาดใหญ่โรยหอมเจียว', 'Hat Yai fried chicken under crispy shallots', ['hat yai fried chicken', 'ไก่ทอดหาดใหญ่', 'crispy shallots', 'หอมเจียว', 'sticky rice', 'ข้าวเหนียว', 'fried chicken legs', 'น่องไก่ทอด', 'southern breakfast', 'อาหารเช้าปักษ์ใต้'], nm('หาหอมเจียวกรอบที่โรยอยู่บนไก่', 'Find the crispy fried shallots sprinkled on the chicken'),
    // a white plate of golden fried chicken legs with little bones, buried under a heap of orange crispy shallot curls, a small woven basket of sticky rice beside it
    E(100, 172, 90, 34, '#FFFFFF') + [[60, 150, -20], [104, 140, 0], [142, 152, 20]].map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})">` + E(x, y, 26, 20, '#E0A030') + R(x - 4, y - 38, 8, 22, '#FFF8E1', 4, 3) + C(x - 5, y - 40, 5, '#FFF8E1', 2.5) + C(x + 5, y - 40, 5, '#FFF8E1', 2.5) + '</g>').join('')
    + P('M44 150c10-26 40-34 60-30 24-4 50 6 62 30-40 10-82 10-122 0z', '#FFB74D', 3) + Array.from({ length: 18 }, (_, k) => Lc(`M${54 + (k * 37) % 100} ${128 + (k * 13) % 20}q5-6 10 0`, k % 2 ? '#E65100' : '#BF360C', 3)).join('') + face(104, 150, 0.4)
    + P('M178 196l-10-50h52l-10 50z', '#D7A86E') + Lc('M172 160h44M174 176h40', '#A1887F', 2.5) + E(194, 146, 26, 10, '#FFFFFF', 3)),

  L('khuakling', 'คั่วกลิ้งกับผักเหนาะ', 'Khua kling, the fiery dry curry with fresh greens', ['khua kling', 'คั่วกลิ้ง', 'dry curry', 'แกงแห้ง', 'kaffir lime leaves', 'ใบมะกรูดซอย', 'fresh side vegetables', 'ผักเหนาะ', 'southern food', 'อาหารปักษ์ใต้'], nm('หาใบมะกรูดสีเขียวที่ซอยเป็นเส้น', 'Find the thin green lime-leaf strips on top'),
    // a round plate heaped with crumbly orange-brown curried mince, thin green lime-leaf strips and red chillies on top, cucumber slices and long beans beside it
    E(100, 170, 88, 38, '#FFFFFF') + P('M36 168c4-34 34-50 64-50s60 16 64 50c-30 10-98 10-128 0z', '#C1662B')
    + Array.from({ length: 18 }, (_, k) => C(48 + (k * 29) % 108, 132 + (k * 11) % 32, 3, '#8D3B12', 0)).join('')
    + Lc('M60 140l14-6M96 128l14 4M124 146l14-8M80 156l12 2M140 132l10 6', '#43A047', 3) + P('M108 146c6-6 16-6 20 2-6-2-12 0-20-2z', '#E53935', 2.5) + face(100, 150, 0.4)
    + [[192, 140], [208, 162], [188, 184]].map(([x, y]) => C(x, y, 15, '#C5E1A5') + C(x, y, 9, '#F1F8E9', 2) + C(x, y, 2, '#9CCC65', 0)).join('') + Lc('M164 214c20-10 44-14 66-10M166 222c22-8 44-10 64-6', '#7CB342', 5)),

  L('khainokkrata', 'ขนมไข่นกกระทาร้อนๆ', 'Khanom khai nok krata, golden sweet potato balls', ['khanom khai nok krata', 'ขนมไข่นกกระทา', 'sweet potato balls', 'ขนมมันทอด', 'fried snack', 'ขนมทอด', 'paper bag snack', 'ขนมถุงกระดาษ', 'street snack', 'ขนมข้างทาง'], nm('หาลูกกลมๆ ที่เสียบไม้อยู่สามลูก', 'Find the three balls on one stick'),
    // a striped paper cone overflowing with round golden fried balls, and a bamboo stick with three more balls threaded on it
    P('M60 120l40 100 40-100z', '#FFF8E1') + Lc('M72 150h56M80 170h40M88 190h24', '#E57373', 4)
    + [[72, 112], [96, 106], [120, 112], [84, 90], [110, 88], [98, 70]].map(([x, y]) => C(x, y, 15, '#FFB300') + P(`M${x - 8} ${y - 6}q4-4 8-4`, 'none', 2.5)).join('') + face(98, 72, 0.32)
    + Lc('M158 220L204 52', '#D7A86E', 5) + [[176, 152], [186, 116], [196, 80]].map(([x, y]) => C(x, y, 16, '#FFA000')).join('') + face(186, 116, 0.32)),

  L('nora', 'ชุดมโนราห์บนขาตั้ง', 'A Nora dancer\'s beaded costume and tall crown', ['nora dance costume', 'ชุดมโนราห์', 'beaded collar', 'ลูกปัดมโนราห์', 'tall golden crown', 'เทริด', 'curved fingernails', 'เล็บมโนราห์', 'southern folk dance', 'รำโนรา'], nm('หาเล็บยาวโค้งสีทองที่วางอยู่ข้างๆ', 'Find the long curly golden fingernails beside it'),
    // a costume on a wooden stand: a tall pointed golden crown on top, a colourful beaded bib in a diamond net with tassels, two curved golden bird-tail wings at the hips; curved golden fingernails beside
    Lc('M110 216v-30M84 216h52', '#8D6E63', 6) + P('M110 20l-16 44h32z', '#FFCA28') + R(90, 62, 40, 12, '#FFB300', 3) + C(110, 40, 4, '#E53935', 2)
    + P('M72 80h76l-8 70H80z', '#E53935') + Lc('M78 90l60 52M142 90l-60 52M76 116l66 0M110 80v70', '#FFEB3B', 3)
    + [84, 96, 108, 120, 132].map((x) => Lc(`M${x} 150v16`, '#43A047', 3) + C(x, 168, 3, '#FFEB3B', 2)).join('') + face(110, 104, 0.4)
    + P('M80 150c-24 6-40 0-46-18 12 8 26 10 40 4zM140 150c24 6 40 0 46-18-12 8-26 10-40 4z', '#FFCA28')
    + [[176, 186], [190, 192], [204, 196]].map(([x, y]) => P(`M${x} ${y}c-2-20 4-36 18-44-4 14-8 28-10 44z`, '#FFCA28', 2.5)).join('')),

  L('morningglory', 'ผักบุ้งทะเลบนหาดทราย', 'Beach morning glory creeping over the sand', ['beach morning glory', 'ผักบุ้งทะเล', 'goat\'s foot creeper', 'ใบรูปตีนแพะ', 'purple seaside flower', 'ดอกไม้สีม่วงริมหาด', 'creeping vine', 'เถาเลื้อยบนทราย', 'sand dunes', 'เนินทราย'], nm('หาใบที่เป็นรูปตีนแพะสองแฉก', 'Find a leaf shaped like a goat\'s split hoof'),
    // pale sand, a long green runner vine with two-lobed goat's-foot leaves, three pink-purple trumpet flowers with pale centres, a strip of sea behind
    R(4, 70, 232, 30, '#4FC3F7', 12) + P('M4 96c60-10 170-10 232 0v120H4z', '#FFE0B2') + Lc('M10 190c40-20 60 10 100-20s70-10 120-40', '#689F38', 5)
    + [[40, 178], [86, 186], [128, 158], [196, 138]].map(([x, y]) => P(`M${x} ${y}c-14-4-18-20-6-26 4 6 6 10 6 14 0-4 2-8 6-14 12 6 8 22-6 26z`, '#7CB342', 3)).join('')
    + [[62, 150, 0.9], [150, 128, 1.1], [210, 176, 0.8]].map(([x, y, s]) => C(x, y, 24 * s, '#CE93D8') + C(x, y, 9 * s, '#F8BBD0', 2.5) + Lc(`M${x} ${y - 22 * s}v12M${x - 20 * s} ${y + 10 * s}l10-4M${x + 20 * s} ${y + 10 * s}l-10-4`, '#AB47BC', 2)).join('')
    + face(150, 128, 0.35)),

  L('ghostcrab', 'ปูลมบนหาดสมิหลา', 'A ghost crab with tall eyes on the beach', ['ghost crab', 'ปูลม', 'sand crab', 'ปูทราย', 'crab holes in the sand', 'รูปูบนหาด', 'stalk eyes', 'ตายาวเหมือนกล้องส่อง', 'evening beach', 'ชายหาดยามเย็น'], nm('หาตาสองข้างที่ยืดสูงขึ้นไป', 'Find the two eyes standing up on tall stalks'),
    // a pale sandy crab with a square shell, two tall stalk eyes with big black eyes, legs running sideways, its round hole and tiny sand balls behind
    P('M4 170c60-10 170-10 232 0v50H4z', '#FFE0B2') + E(196, 188, 18, 8, '#8D6E63') + [[150, 196], [164, 204], [176, 198], [214, 204], [226, 196]].map(([x, y]) => C(x, y, 4, '#FFCC80', 2)).join('')
    + [-1, 1].map((s) => [0, 1, 2].map((k) => P(`M${110 + s * 40} ${138 + k * 12}l${s * 24} ${-6 + k * 10}l${s * 10} 18`, 'none', 5)).join('')).join('')
    + R(66, 110, 88, 58, '#FFF3E0', 20) + P('M70 116c-20-10-30-26-24-40 14 4 24 14 26 28zM150 116c20-10 30-26 24-40-14 4-24 14-26 28z', '#FFE0B2')
    + Lc('M94 112V60M126 112V60', INK, 4) + C(94, 54, 10, INK, 0) + C(126, 54, 10, INK, 0) + C(91, 51, 3, '#fff', 0) + C(123, 51, 3, '#fff', 0)
    + E(84, 146, 7, 4.5, '#FF8FA3', 0) + E(136, 146, 7, 4.5, '#FF8FA3', 0) + P('M102 146q8 8 16 0', 'none', 3.5)),

  L('platodkhamin', 'ปลาทอดขมิ้นกระเทียมกรอบ', 'Turmeric fried fish with crispy garlic', ['pla tod khamin', 'ปลาทอดขมิ้น', 'turmeric fish', 'ปลาขมิ้น', 'crispy garlic', 'กระเทียมเจียว', 'southern fried fish', 'ปลาทอดปักษ์ใต้', 'rice and lime', 'ข้าวสวยกับมะนาว'], nm('หากระเทียมเจียวกรอบที่โรยบนปลา', 'Find the crispy garlic bits sprinkled on the fish'),
    // an oval plate with a whole golden-yellow turmeric fried fish, crispy garlic bits on top, a lime wedge and cucumber, a smiling mound of white rice beside
    E(110, 160, 104, 40, '#FFFFFF') + P('M30 160c20-28 60-36 100-28l30-20-4 30 4 30-30-18c-40 8-80 0-100-14z', '#FBC02D') + C(48, 154, 5, INK, 0)
    + Lc('M70 146l6 20M90 142l6 22M110 142l6 22', '#F57F17', 3) + Array.from({ length: 14 }, (_, k) => C(56 + (k * 23) % 92, 142 + (k * 7) % 16, 3, '#FFF3E0', 1.5)).join('')
    + P('M184 152c0-10 10-16 22-10l-4 16z', '#C0CA33', 2.5) + C(194, 182, 10, '#C5E1A5', 2.5) + E(190, 212, 34, 12, '#90CAF9') + P('M160 206c0-26 60-26 60 0z', '#FFFFFF') + face(190, 194, 0.3)),
];

export default {
  places: {
    'th-hatyai': { country: 'th', wave: 3, home: true, name: nm('หาดใหญ่และสงขลา', 'Hat Yai and Songkhla'), tz: 'Asia/Bangkok', ll: [7.01, 100.47], alias: ['hat yai', 'หาดใหญ่', 'HDY', 'songkhla', 'สงขลา', 'samila', 'สมิหลา', 'koh yor', 'เกาะยอ', 'khao seng', 'เก็งเส็ง'], colors: HY },
  },
  items,
};
