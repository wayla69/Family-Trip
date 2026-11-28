// Wave 16: Sendai and Matsushima (Miyagi) — the "city of trees" with its zelkova avenues, and the pine-island bay beside it.
// Sendai was an alias of jp-tohoku; it is its own place now (the Tohoku pictures of Matsushima's islands, Tanabata, gyūtan and
// zunda stay with Tohoku, so they are not drawn again here). Drawn for Sendai: Jōzenji-dōri, a Matsushima cruise with the gulls,
// Aoba Castle's corner turret, Godaidō and Fukuura's red bridges, Kanrantei, the Mediatheque, the Pageant of Starlight, the sparrow
// dance, the loop bus, Akiu Ōtaki, the Hirose River, a Tsutsumi clay doll, the jazz festival; Hagi no Tsuki, hiyashi chūka, seri nabe,
// anago-don and harako-meshi.
// Skipped as repeats or bans: the statue of Date Masamune and Zuihōden (a real person and his tomb), Zuiganji, Ōsaki Hachimangū and the
// Sendai Daikannon (religious), the coast after 2011 (no earthquake or tsunami subjects), sasa-kamaboko (Hakone's fish cake),
// Matsushima oysters (Ston's oysters), the fox village at Zaō (Tohoku keeps Zaō), the aquarium and the zoo (drawn in many cities).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SD = { k1: '#1F4E8C', k2: '#2E7D32', k3: '#E8F5E9' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `jp-sendai.landmark.${slug}`, cat: 'landmark', file: `jp/sendai/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a zelkova crown: three soft green puffs on a brown trunk
const keyaki = (x, y, s, c = '#66BB6A') => g(x, y, s, R(-4, 0, 8, 34, '#8D6E63', 0, 3) + C(-14, -6, 16, c) + C(14, -6, 16, c) + C(0, -18, 18, c));
// a twisty Matsushima pine on a rock
const pine = (x, y, s) => g(x, y, s, Lc('M0 0c-2-8 4-14 0-22', '#6D4C41', 4) + E(-6, -22, 12, 5, '#2E7D32', 2.5) + E(6, -28, 10, 4, '#388E3C', 2.5));
const waves = (d) => Lc(d, '#E1F5FE', 4);

const items = [
  { id: 'jp-sendai.stamp', cat: 'stamp', file: 'jp/sendai/stamp.v1.svg', name: nm('ตราประทับเซนได', 'Sendai stamp'), kw: ['sendai', 'เซนได', 'city of trees', 'เมืองแห่งต้นไม้', 'zelkova', 'ต้นเคยากิ', 'miyagi', 'มิยางิ', 'sparrow', 'นกกระจอก'],
    // a big smiling zelkova tree on a green mound, a little sparrow hopping on the grass beside it
    svg: cityStamp('jsd-st', { name: 'SENDAI', sub: 'JAPAN', ...SD, emblem: P('M54 132c14-12 30-16 46-16s32 4 46 16z', '#A5D6A7', 0) + R(95, 98, 10, 26, '#8D6E63')
      + C(80, 92, 17, '#66BB6A') + C(120, 92, 17, '#66BB6A') + C(100, 76, 20, '#81C784') + face(100, 86, 0.32)
      + E(134, 124, 9, 7, '#A1887F', 3) + C(127, 118, 5.5, '#BCAAA4', 3) + P('M121 118l-5 2 5 1z', '#FFB300', 2) + Lc('M142 122l7-3', '#6D4C41', 3) + Lc('M132 131v4M136 131v4', '#6D4C41', 2) }) },

  { id: 'jp-sendai.day.jozenji', cat: 'day', file: 'jp/sendai/day-jozenji.v1.svg', name: nm('อุโมงค์ต้นเคยากิบนถนนโจเซ็นจิ', 'The green tunnel of zelkova trees on Jōzenji-dōri'), kw: ['jozenji dori', 'jozenji street', 'ถนนโจเซ็นจิ', 'zelkova avenue', 'ถนนต้นเคยากิ', 'green tunnel', 'อุโมงค์ต้นไม้', 'city of trees', 'เมืองแห่งต้นไม้', 'sendai', 'เซนได', 'promenade', 'ทางเดินกลางถนน'],
    // an avenue running into the distance under four rows of big zelkova crowns that meet overhead, a path down the middle with a bench, a little smiling bus, tall buildings at the far end
    svg: scene('jsd-d1', '#E3F2FD', R(86, 70, 22, 50, '#B0BEC5') + R(110, 60, 18, 60, '#CFD8DC') + R(130, 74, 24, 46, '#B0BEC5') + Lc('M92 80h10M92 92h10M114 72h10M114 86h10M136 86h12M136 98h12', '#ECEFF1', 3)
      + P('M-4 250L104 118h32L244 250z', '#9E9E9E') + P('M64 250L112 118h16L176 250z', '#C5E1A5') + Lc('M120 130v12M120 158v16M120 194v22', '#FFFFFF', 3)
      + [[22, 128, 1.9], [218, 128, 1.9], [62, 116, 1.25], [178, 116, 1.25], [90, 108, 0.8], [150, 108, 0.8]].map(([x, y, s]) => keyaki(x, y, s, '#66BB6A')).join('')
      + C(-6, 40, 40, '#81C784') + C(246, 40, 40, '#81C784') + C(120, 2, 44, '#81C784') + C(60, 14, 34, '#66BB6A') + C(180, 14, 34, '#66BB6A')
      + R(104, 196, 32, 8, '#A1887F', 2, 3) + Lc('M108 204v10M132 204v10', '#6D4C41', 3)
      + R(28, 186, 46, 28, '#FFB300', 6) + R(34, 192, 12, 9, '#E3F2FD', 2, 2.5) + R(52, 192, 12, 9, '#E3F2FD', 2, 2.5) + C(38, 216, 5, INK, 0) + C(66, 216, 5, INK, 0) + face(52, 206, 0.24, 'none')) },
  { id: 'jp-sendai.day.matsushimacruise', cat: 'day', file: 'jp/sendai/day-matsushimacruise.v1.svg', name: nm('ล่องเรือชมอ่าวมัตสึชิมะกับฝูงนกนางนวล', 'A Matsushima Bay cruise with the seagulls'), kw: ['matsushima', 'มัตสึชิมะ', 'matsushima bay cruise', 'ล่องเรืออ่าวมัตสึชิมะ', 'sightseeing boat', 'เรือนำเที่ยว', 'seagulls', 'นกนางนวล', 'feeding gulls', 'ให้อาหารนกนางนวล', 'shrimp crackers', 'ข้าวเกรียบกุ้ง'],
    // a white sightseeing boat with a smiling face on the blue bay, seagulls swooping round it to catch little orange shrimp crackers, small pine islands behind
    svg: scene('jsd-d2', '#E1F5FE', P('M-4 126h248v130H-4z', '#4FC3F7') + E(40, 126, 26, 12, '#BCAAA4') + E(204, 128, 22, 10, '#BCAAA4') + E(150, 124, 12, 6, '#BCAAA4')
      + pine(34, 118, 0.9) + pine(50, 120, 0.7) + pine(204, 120, 0.85) + pine(150, 120, 0.55)
      + P('M48 170h148l-18 30H64z', '#FFFFFF') + R(70, 146, 104, 24, '#FFFFFF', 4) + R(96, 130, 54, 16, '#1E88E5', 3) + Lc('M80 158h12M100 158h12M120 158h12M140 158h12M160 158h8', '#90CAF9', 5)
      + Lc('M56 182h132', '#1E88E5', 4) + face(122, 188, 0.3, 'none')
      + [[70, 82, 1], [130, 66, 1.1], [190, 92, 0.9], [168, 46, 0.8], [40, 104, 0.8]].map(([x, y, s]) => g(x, y, s, P('M-18 0q9-10 18 0q9-10 18 0', '#FFFFFF', 3) + E(0, 2, 5, 3, '#FFFFFF', 2.5) + P('M5 1l5 1-5 2z', '#FFB300', 1.5))).join('')
      + [[86, 100], [110, 92], [150, 104], [176, 112]].map(([x, y]) => R(x, y, 8, 4, '#FFB74D', 2, 2)).join('')
      + waves('M20 214c10-5 20 5 30 0M160 216c10-5 20 5 30 0M96 228c10-5 20 5 30 0')) },

  L('aobacastle', 'กำแพงหินและป้อมมุมของปราสาทอาโอบะ', 'The stone walls and corner turret of Aoba Castle', ['aoba castle', 'ปราสาทอาโอบะ', 'sendai castle', 'ปราสาทเซนได', 'aobajo', 'อาโอบะโจ', 'wakimayagura', 'ป้อมวากิยางุระ', 'stone wall', 'กำแพงหิน', 'castle ruins', 'ซากปราสาท'], 'หาป้อมสีขาวที่ตั้งอยู่บนกำแพงหินสูง', 'Find the white turret standing on the tall stone wall',
    // a tall curved wall of big fitted stones with a white two-storey corner turret on top, dark grey tiled roofs with turned-up corners, green pines on the hill
    bg('#E8F5E9') + low(196, '#A5D6A7') + frame + C(44, 70, 18, '#66BB6A') + C(200, 64, 20, '#66BB6A')
      + P('M40 196q20-60 32-92h96q12 32 32 92z', '#BDBDBD') + Lc('M56 160h128M48 180h144M64 140h112M68 120h104M90 104v16M130 104v16M80 120v20M120 120v20M160 120v20M70 140v20M110 140v20M150 140v20M60 160v20M100 160v20M140 160v20M180 160v20', '#9E9E9E', 3)
      + R(84, 70, 72, 34, '#FFFFFF') + P('M74 72l14-14h64l14 14z', '#546E7A') + R(96, 42, 48, 18, '#FFFFFF') + P('M88 44l10-12h44l10 12z', '#546E7A')
      + R(90, 80, 10, 12, '#455A64', 0, 2.5) + R(140, 80, 10, 12, '#455A64', 0, 2.5) + R(114, 48, 12, 8, '#455A64', 0, 2.5) + face(120, 84, 0.3)),
  L('godaido', 'ศาลาโกไดโดบนเกาะหินกับสะพานแดงมีช่อง', 'Godaidō, the little hall on its rock with gappy red bridges', ['godaido', 'โกไดโด', 'matsushima godaido', 'โกไดโดมัตสึชิมะ', 'sukashi bridge', 'สะพานสุกาชิ', 'red bridge with gaps', 'สะพานแดงมีช่อง', 'rock island', 'เกาะหิน', 'matsushima', 'มัตสึชิมะ'], 'หาช่องว่างระหว่างแผ่นไม้บนสะพานแดง', 'Find the gaps between the boards on the red bridge',
    // a small dark wooden hall with a big swooping grey roof on a grey rock islet, two short red bridges with gaps between their planks leading from the shore, a twisty pine and the blue sea
    bg('#E1F5FE') + low(140, '#4FC3F7') + frame + P('M16 152q40 2 46 72H46a30 30 0 0 1-30-30z', '#A5D6A7', 0)
      + P('M96 166c-10-14 0-40 30-44 30 2 46 20 40 44z', '#B0BEC5') + R(110, 112, 44, 30, '#8D6E63') + R(125, 130, 14, 12, '#5D4037', 2, 3) + P('M96 114q36-30 72 0q-36-8-72 0z', '#607D8B') + Lc('M132 94v-8', INK, 3)
      + g(76, 170, 1, [-30, -18, -6, 6, 18].map((x) => R(x, -4, 9, 8, '#E53935', 1.5, 2.5)).join('') + Lc('M-32-18h62', '#E53935', 4) + Lc('M-30-18v14M-6-18v14M18-18v14', '#C62828', 3), -14)
      + E(204, 176, 18, 8, '#B0BEC5') + g(184, 168, 1, [-14, -3, 8].map((x) => R(x, -3, 8, 6, '#E53935', 1.5, 2.5)).join('') + Lc('M-16-14h34', '#E53935', 3.5) + Lc('M-14-14v11M16-14v11', '#C62828', 3), 8)
      + pine(206, 172, 1) + face(132, 121, 0.22, 'none') + waves('M30 214c10-5 20 5 30 0M110 200c10-5 20 5 30 0M170 210c10-5 20 5 30 0')),
  L('fukuura', 'สะพานแดงยาวไปเกาะฟุกุอุระ', 'The long red bridge to Fukuura Island', ['fukuura bridge', 'สะพานฟุกุอุระ', 'fukuurajima', 'เกาะฟุกุอุระ', 'fukuura island', 'deaibashi', 'สะพานแห่งการพบกัน', 'long red bridge', 'สะพานแดงยาว', 'matsushima', 'มัตสึชิมะ'], 'นับเสาใต้สะพานแดงที่ยาวไปถึงเกาะ', 'Count the legs under the long red bridge to the island',
    // a long low red footbridge on many thin legs crossing the bay from the left shore to a round green island full of pines, a smiling sun
    bg('#FFF8E1') + low(132, '#4FC3F7') + frame + C(190, 52, 16, '#FFE082') + face(190, 52, 0.26)
      + P('M16 120h40l14 30H16z', '#A5D6A7') + E(186, 136, 40, 20, '#81C784') + pine(170, 126, 1) + pine(190, 120, 1.1) + pine(206, 130, 0.8)
      + Lc('M70 152v28M88 150v30M106 148v32M124 146v34M142 146v34M160 148v30', '#C62828', 4)
      + P('M56 150q60-12 108-4v6q-48-8-108 4z', '#E53935') + Lc('M58 142q60-12 106-4', '#E53935', 4) + Lc('M66 142v8M84 140v8M102 138v8M120 136v8M138 136v8M156 138v8', '#E53935', 3)
      + waves('M30 200c10-5 20 5 30 0M100 206c10-5 20 5 30 0M170 196c10-5 20 5 30 0')),
  L('kanrantei', 'ชาเขียวมัตฉะที่ศาลาคันรันเต', 'A bowl of matcha at the Kanrantei pavilion', ['kanrantei', 'คันรันเต', 'tea pavilion', 'ศาลาน้ำชา', 'matcha', 'มัตฉะ', 'green tea', 'ชาเขียว', 'japanese sweet', 'ขนมญี่ปุ่น', 'bay view', 'วิวอ่าว', 'matsushima', 'มัตสึชิมะ'], 'หาขนมชิ้นเล็กสีชมพูข้างถ้วยชา', 'Find the little pink sweet beside the tea bowl',
    // the old wooden tea pavilion on a green cliff above the bay, in front a smiling bowl of frothy green matcha on a tray and a little pink sweet
    bg('#E1F5FE') + P('M16 104h208v40H16z', '#4FC3F7', 0) + frame + P('M110 104c10-30 50-40 114-36v36z', '#81C784') + R(146, 66, 54, 22, '#A1887F') + P('M138 68l18-16h34l18 16z', '#546E7A') + Lc('M156 70v18M172 70v18M188 70v18', '#6D4C41', 3)
      + R(34, 164, 172, 40, '#BCAAA4', 8) + P('M70 136h84q-4 44-42 44t-42-44z', '#37474F') + E(112, 138, 42, 10, '#7CB342') + E(108, 136, 18, 4, '#C5E1A5', 0)
      + face(112, 156, 0.34, 'none') + Lc('M104 170q8 5 16 0', '#ECEFF1', 3) + P('M164 172q16-16 30 0z', '#F48FB1') + E(179, 172, 16, 5, '#FFFFFF', 3) + Lc('M196 160l14 10', '#C8A165', 4)),
  L('mediatheque', 'ห้องสมุดกล่องแก้วเซนไดมีเดียเทค', 'The glass box of Sendai Mediatheque', ['sendai mediatheque', 'เซนไดมีเดียเทค', 'mediatheque', 'มีเดียเทค', 'glass building', 'อาคารกระจก', 'wavy tubes', 'ท่อโค้งพลิ้ว', 'library', 'ห้องสมุด', 'jozenji', 'โจเซ็นจิ'], 'หาท่อสีขาวที่บิดโค้งอยู่ในตึกกระจก', 'Find the white twisty tubes inside the glass building',
    // a square glass building with thin floor slabs, white lattice tubes that wiggle up through all the floors, zelkova trees in front
    bg('#E3F2FD') + low(196, '#C5E1A5') + frame + R(44, 44, 152, 150, '#B3E5FC') + Lc('M44 80h152M44 116h152M44 152h152', '#ECEFF1', 6)
      + Lc('M74 46c-8 30 10 60 0 92s8 40 0 56M120 46c10 34-10 62 0 96s-8 34 0 52M168 46c-8 28 10 58 0 90s8 42 0 58', '#FFFFFF', 12) + Lc('M74 46c-8 30 10 60 0 92s8 40 0 56M120 46c10 34-10 62 0 96s-8 34 0 52M168 46c-8 28 10 58 0 90s8 42 0 58', '#90A4AE', 2.5)
      + face(144, 98, 0.3) + keyaki(34, 176, 0.9) + keyaki(206, 176, 0.9)),
  L('pageant', 'ต้นไม้ประดับไฟงานเพเจนต์ออฟสตาร์ไลต์', 'The trees of lights at the Pageant of Starlight', ['pageant of starlight', 'เพเจนต์ออฟสตาร์ไลต์', 'sendai hikari no pageant', 'ฮิการิโนะเพเจนต์', 'winter illumination', 'ไฟประดับฤดูหนาว', 'trees of lights', 'ต้นไม้ประดับไฟ', 'jozenji dori', 'ถนนโจเซ็นจิ', 'december', 'ธันวาคม'], 'หาดาวดวงใหญ่เหนือต้นไม้ประดับไฟ', 'Find the big star above the trees of lights',
    // a night sky, three bare zelkova trees along the avenue, every branch covered in little warm orange lights, a big smiling star above
    bg('#283593') + low(184, '#5C6BC0') + frame + P('M194 30l6 13 14 2-10 10 3 14-13-7-13 7 3-14-10-10 14-2z', '#FFF59D') + face(194, 50, 0.2, 'none')
      + [[66, 1], [120, 1.15], [174, 1]].map(([x, s]) => g(x, 184, s, Lc('M0 0v-56M0-30l-22-24M0-38l20-22M0-50l-8-18M-16-46l-10-6M14-52l10-6', '#6D4C41', 5)
        + [[-26, -54], [-20, -48], [-12, -60], [-8, -70], [0, -62], [2, -74], [10, -66], [18, -58], [24, -64], [-4, -40], [6, -46], [-14, -34], [14, -40], [0, -24]].map(([dx, dy]) => C(dx, dy, 3.4, '#FFB74D', 0)).join(''))).join('')
      + R(16, 192, 208, 10, '#3949AB', 0, 0) + [[40, 210], [96, 214], [150, 208], [200, 212]].map(([x, y]) => C(x, y, 3, '#FFE082', 0)).join('')),
  L('suzumeodori', 'นกกระจอกเต้นรำถือพัดสุซุเมะโอโดริ', 'Sparrows doing the Suzume Odori fan dance', ['suzume odori', 'สุซุเมะโอโดริ', 'sparrow dance', 'ระบำนกกระจอก', 'aoba festival', 'เทศกาลอาโอบะ', 'fan dance', 'ระบำพัด', 'happi coat', 'เสื้อฮัปปิ', 'sendai festival', 'เทศกาลเซนได'], 'หาพัดสองสีที่นกกระจอกถืออยู่', 'Find the two-coloured fans the sparrows are holding',
    // two round smiling sparrows in red and blue happi coats hopping in a dance, each holding up open folding fans, a paper lantern hanging above
    Lc('M60 30h120', '#6D4C41', 3) + Lc('M120 30v8', INK, 3) + E(120, 52, 14, 16, '#FFFFFF') + Lc('M108 46h24M108 58h24', '#E53935', 3)
      + [[72, 150, '#E53935', -10], [168, 150, '#1E88E5', 10]].map(([x, y, c, r]) => g(x, y, 1, E(0, 6, 34, 36, '#A1887F') + E(0, -24, 24, 20, '#8D6E63') + P('M-24 -4h48v28q-24 12-48 0z', c) + Lc('M-8-4v26M8-4v26', '#FFFFFF', 3)
        + E(0, -18, 14, 8, '#FFFFFF', 0) + P('M-4-18l4 5 4-5z', '#FFB300', 2) + face(0, -26, 0.3, 'none') + Lc('M-12 44v8M12 44v8', '#6D4C41', 3), r)).join('')
      + [[40, 112, -30, '#FFD54F', '#E53935'], [104, 112, 20, '#FFD54F', '#1E88E5'], [136, 112, -20, '#FFD54F', '#E53935'], [200, 112, 30, '#FFD54F', '#1E88E5']].map(([x, y, r, a, b]) => g(x, y, 1, P('M0 10L-20-14a26 26 0 0 1 40 0z', a) + P('M0 10L-10-20a26 26 0 0 1 20 0z', b, 2.5), r)).join('')),
  L('loople', 'รถบัสเที่ยวรอบเมืองลูเพิลเซนได', 'Loople Sendai, the retro sightseeing loop bus', ['loople sendai', 'ลูเพิลเซนได', 'loople bus', 'รถบัสลูเพิล', 'sightseeing bus', 'รถบัสนำเที่ยว', 'retro bus', 'รถบัสย้อนยุค', 'city loop', 'วนรอบเมือง', 'sendai', 'เซนได'], 'หาไฟหน้ากลมสองดวงของรถบัส', 'Find the two round headlights on the bus',
    // an old-fashioned dark green bus with a cream band, a rounded roof, a row of windows, two round headlights and a smiling face, on a road lined with trees
    bg('#E8F5E9') + low(182, '#BDBDBD') + frame + keyaki(46, 92, 1) + keyaki(196, 88, 1.1)
      + P('M34 178v-56q0-28 30-28h112q30 0 30 28v56z', '#2E7D32') + R(34, 140, 172, 14, '#FFF3E0', 0, 3)
      + [52, 82, 112, 142].map((x) => R(x, 104, 24, 26, '#E3F2FD', 4, 3)).join('') + R(172, 104, 24, 26, '#E3F2FD', 4, 3)
      + C(188, 164, 7, '#FFF59D', 3) + C(52, 164, 7, '#FFF59D', 3) + C(70, 180, 14, '#455A64') + C(170, 180, 14, '#455A64') + C(70, 180, 5, '#B0BEC5', 2) + C(170, 180, 5, '#B0BEC5', 2)
      + face(120, 164, 0.32)),
  L('akiuotaki', 'น้ำตกใหญ่อากิอุโอตากิในฤดูใบไม้แดง', 'Akiu Ōtaki, the wide waterfall in autumn', ['akiu otaki', 'น้ำตกอากิอุ', 'akiu great falls', 'น้ำตกใหญ่อากิอุ', 'akiu', 'อากิอุ', 'waterfall', 'น้ำตก', 'autumn leaves', 'ใบไม้แดง', 'maple', 'เมเปิล'], 'หาใบเมเปิลสีแดงที่ลอยอยู่ในแอ่งน้ำ', 'Find the red maple leaf floating in the pool',
    // a broad curtain of white water pouring over a brown cliff into a round blue pool, red and orange maple trees on both sides, a smiling rock in the pool
    bg('#FFF3E0') + low(168, '#81D4FA') + frame + P('M16 60h70v120H16z', '#8D6E63', 0) + P('M154 60h70v120h-70z', '#8D6E63', 0)
      + P('M78 52h84v124H78z', '#FFFFFF') + Lc('M90 56v110M104 56v116M118 56v114M132 56v116M148 56v110', '#B3E5FC', 3) + E(120, 176, 54, 12, '#FFFFFF')
      + C(36, 70, 22, '#E64A19') + C(56, 52, 18, '#FF8A65') + C(204, 70, 22, '#FFA000') + C(184, 50, 18, '#E64A19') + C(30, 118, 16, '#FFB74D') + C(210, 120, 16, '#FF7043')
      + E(178, 196, 22, 14, '#9E9E9E') + face(178, 194, 0.28) + P('M70 200l6-8 6 8-6-2z', '#E53935', 2.5) + waves('M40 210c8-4 16 4 24 0M100 214c8-4 16 4 24 0')),
  L('hirose', 'แม่น้ำฮิโรเสะใสไหลผ่านกลางเมือง', 'The clear Hirose River running through the city', ['hirose river', 'แม่น้ำฮิโรเสะ', 'hirosegawa', 'ฮิโรเสะงาวะ', 'clear river', 'แม่น้ำใส', 'river pebbles', 'หินกรวดริมน้ำ', 'ayu fish', 'ปลาอายุ', 'sendai', 'เซนได'], 'หาปลาตัวเล็กที่กระโดดขึ้นจากน้ำ', 'Find the little fish jumping out of the water',
    // a winding clear river with grey pebble banks, green trees and city towers behind, a small silver ayu fish leaping with a smile
    bg('#E3F2FD') + R(56, 50, 24, 50, '#B0BEC5') + R(84, 38, 22, 62, '#CFD8DC') + R(150, 54, 26, 46, '#B0BEC5') + frame
      + P('M16 92c50-10 150-10 208 0v28H16z', '#81C784') + P('M16 120h208v74a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#CFD8DC', 0)
      + P('M90 120c-10 30 30 50 10 104h70c20-40-40-70-20-104z', '#4FC3F7') + [[40, 150], [58, 190], [196, 148], [210, 186], [180, 204], [34, 206]].map(([x, y]) => E(x, y, 9, 6, '#ECEFF1', 2.5)).join('')
      + g(130, 166, 1, P('M-24 0q24-18 44 0q-20 18-44 0z', '#B0BEC5') + P('M20 0l12-10v20z', '#B0BEC5') + face(-6, -2, 0.22, 'none'), -20) + Lc('M100 196c6-3 12 3 18 0M140 210c6-3 12 3 18 0', '#E1F5FE', 3)),
  L('tsutsumi', 'ตุ๊กตาดินเผาสึสึมิรูปกระต่าย', 'A Tsutsumi clay doll of a rabbit', ['tsutsumi doll', 'ตุ๊กตาสึสึมิ', 'tsutsumi ningyo', 'สึสึมินิงเงียว', 'clay doll', 'ตุ๊กตาดินเผา', 'painted rabbit', 'กระต่ายลายสี', 'sendai craft', 'งานฝีมือเซนได', 'zodiac doll', 'ตุ๊กตานักษัตร'], 'หาลายดอกไม้สีแดงบนหลังกระต่าย', 'Find the red flower pattern on the rabbit’s back',
    // a chubby white clay rabbit sitting on a little green base, long ears with pink insides, painted red flowers and green leaves on its back, a gentle smile
    E(120, 200, 70, 14, '#81C784') + E(120, 150, 58, 50, '#FFFFFF') + E(98, 70, 12, 34, '#FFFFFF') + E(140, 70, 12, 34, '#FFFFFF') + E(98, 72, 5, 24, '#F8BBD0', 0) + E(140, 72, 5, 24, '#F8BBD0', 0)
      + C(120, 112, 34, '#FFFFFF') + face(120, 112, 0.42) + [[86, 160], [150, 156], [116, 176]].map(([x, y]) => C(x, y, 8, '#E53935', 2.5) + C(x, y, 3, '#FFD54F', 0) + E(x + 12, y + 4, 6, 3, '#43A047', 2)).join('')
      + Lc('M72 136q-10 20 2 40', '#1E88E5', 3)),
  L('jazzfest', 'แซกโซโฟนกับดับเบิลเบสในงานแจ๊สริมถนนโจเซ็นจิ', 'A saxophone and a double bass at the Jōzenji Street Jazz Festival', ['jozenji jazz festival', 'งานแจ๊สถนนโจเซ็นจิ', 'street jazz', 'แจ๊สริมถนน', 'saxophone', 'แซกโซโฟน', 'double bass', 'ดับเบิลเบส', 'street music', 'ดนตรีข้างถนน', 'september', 'กันยายน'], 'หาตัวโน้ตที่ลอยออกมาจากแซกโซโฟน', 'Find the music notes floating out of the saxophone',
    // a smiling golden saxophone and a brown double bass leaning together on the pavement under zelkova leaves, music notes floating up
    C(40, 40, 26, '#81C784') + C(80, 26, 22, '#66BB6A') + C(200, 36, 26, '#81C784') + C(164, 24, 20, '#66BB6A') + R(28, 196, 184, 12, '#BDBDBD', 4)
      + E(162, 160, 30, 38, '#A1887F') + E(162, 112, 22, 24, '#A1887F') + R(158, 46, 8, 70, '#5D4037') + Lc('M156 160c4-6 10-6 14 0M156 120c4-6 10-6 14 0', '#5D4037', 3) + Lc('M162 46v150', '#ECEFF1', 1.5) + R(158, 196, 8, 6, '#5D4037', 1, 2)
      + P('M80 60h14v86q0 34 26 34 18 0 20-22l14 4q-2 34-34 34-40 0-40-50z', '#FFCA28') + P('M140 148l6-14 24 6-6 14z', '#FFCA28') + R(74, 52, 26, 10, '#FFB300', 3)
      + [[96, 92], [96, 116], [96, 140]].map(([x, y]) => C(x, y, 5, '#FFF8E1', 2.5)).join('') + face(110, 172, 0.3)
      + P('M50 110v-22l14-4v22', 'none', 3) + C(46, 112, 5, INK, 0) + C(60, 108, 5, INK, 0) + P('M36 148v-18', 'none', 3) + C(32, 150, 5, INK, 0)),

  L('haginotsuki', 'ฮางิโนะซึกิ เค้กไส้คัสตาร์ดรูปพระจันทร์', 'Hagi no Tsuki, the full-moon custard cake', ['hagi no tsuki', 'ฮางิโนะซึกิ', 'custard cake', 'เค้กไส้คัสตาร์ด', 'moon cake of sendai', 'ขนมพระจันทร์เซนได', 'sponge with custard', 'สปันจ์ไส้ครีม', 'bush clover', 'ดอกฮางิ', 'sendai souvenir', 'ของฝากเซนได'], 'หาไส้ครีมสีเหลืองในเค้กที่ผ่าครึ่ง', 'Find the yellow custard inside the cake cut in half',
    // a round golden sponge cake like a full moon with a smile, beside it a half cut open to show the yellow custard, a sprig of pink bush clover
    E(120, 196, 96, 14, '#E1BEE7') + C(92, 140, 50, '#FFCC80') + C(92, 140, 50, 'none') + E(76, 120, 12, 6, '#FFE0B2', 0) + face(92, 142, 0.5)
      + P('M150 186a40 40 0 0 1 0-80z', '#FFCC80') + P('M150 176a30 30 0 0 1 0-60z', '#FFEB3B', 2.5) + Lc('M150 106v80', INK, 4)
      + Lc('M176 104c10-20 16-40 30-56', '#6D4C41', 3) + [[184, 84], [194, 70], [204, 56], [180, 100], [198, 80], [208, 64]].map(([x, y]) => E(x, y, 4, 6, '#CE93D8', 2)).join('') + E(186, 94, 6, 3, '#81C784', 2) + E(198, 64, 6, 3, '#81C784', 2)),
  L('hiyashichuka', 'ฮิยาชิชูกะ บะหมี่เย็นที่เกิดในเซนได', 'Hiyashi chūka, the cold noodles first made in Sendai', ['hiyashi chuka', 'hiyashi chūka', 'ฮิยาชิชูกะ', 'cold ramen', 'ราเมนเย็น', 'cold noodles', 'บะหมี่เย็น', 'summer noodles', 'บะหมี่หน้าร้อน', 'egg strips', 'ไข่ฝอย', 'sendai', 'เซนได'], 'หาไข่ฝอยสีเหลืองบนบะหมี่', 'Find the yellow egg strips on the noodles',
    // a round white plate of yellow noodles with toppings laid out like a clock: yellow egg strips, green cucumber, pink ham, red tomato, a dab of mustard on the rim
    E(120, 140, 96, 64, '#FFFFFF') + E(120, 140, 80, 50, '#E3F2FD', 0) + E(120, 140, 66, 40, '#FFE082')
      + Lc('M70 136q50-20 100 0M72 150q48-18 96 0M80 124q40-14 80 0', '#FFCA28', 3)
      + Lc('M84 116l20 12M90 110l20 12M96 106l18 12', '#FFEB3B', 6) + Lc('M136 108l22 12M142 104l20 12M148 102l18 10', '#7CB342', 6) + Lc('M136 108l22 12M142 104l20 12', '#C5E1A5', 2)
      + [[86, 160], [100, 168], [116, 172]].map(([x, y]) => R(x - 7, y - 4, 14, 8, '#F8BBD0', 2, 2.5)).join('') + P('M144 160l20 0-10 16z', '#E53935') + P('M162 148l16 6-12 12z', '#E53935')
      + C(196, 110, 7, '#FDD835', 2.5) + face(120, 140, 0.32, 'none')),
  L('serinabe', 'เซรินาเบะ หม้อไฟผักเซริทั้งรากของเซนได', 'Seri nabe, the Japanese parsley hotpot with the roots on', ['seri nabe', 'เซรินาเบะ', 'japanese parsley', 'ผักเซริ', 'parsley hotpot', 'หม้อไฟผักเซริ', 'with roots', 'กินทั้งราก', 'duck slices', 'เนื้อเป็ด', 'winter food', 'อาหารหน้าหนาว', 'sendai', 'เซนได'], 'หารากสีขาวยาวๆ ของผักในหม้อ', 'Find the long white roots of the greens in the pot',
    // a round dark iron pot of clear broth on a little stove, bunches of bright green parsley with long white roots hanging over the rim, slices of duck, steam curling up
    R(70, 194, 100, 14, '#8D6E63', 4) + P('M44 132h152q-6 64-76 64t-76-64z', '#455A64') + E(120, 132, 76, 16, '#FFE0B2') + E(120, 132, 64, 11, '#FFF3E0', 0)
      + [[86, 126, -20], [118, 120, 0], [150, 126, 20]].map(([x, y, r]) => g(x, y, 1, Lc('M0 0v-22M0-10l-8-14M0-12l8-14', '#43A047', 4) + E(-8, -26, 6, 4, '#66BB6A', 2) + E(8, -28, 6, 4, '#66BB6A', 2) + E(0, -24, 5, 4, '#81C784', 2), r)).join('')
      + Lc('M60 130c-6 14-2 26-8 36M66 130c-2 14 4 24 0 34M176 130c6 14 2 26 8 36', '#FFFDE7', 4) + Lc('M60 130c-6 14-2 26-8 36M176 130c6 14 2 26 8 36', '#BCAAA4', 1.5)
      + [[104, 136], [136, 138]].map(([x, y]) => E(x, y, 12, 5, '#F8BBD0', 2.5)).join('') + face(120, 166, 0.34)
      + Lc('M90 84c-6-10 6-16 0-26M150 84c-6-10 6-16 0-26', '#CFD8DC', 4)),
  L('anagodon', 'อานาโกะดง ข้าวหน้าปลาไหลทะเลของมัตสึชิมะ', 'Anago-don, Matsushima’s conger eel rice bowl', ['anago don', 'anagodon', 'อานาโกะดง', 'conger eel', 'ปลาไหลทะเล', 'anago', 'อานาโกะ', 'eel rice bowl', 'ข้าวหน้าปลาไหล', 'sweet soy glaze', 'ซอสหวาน', 'matsushima', 'มัตสึชิมะ'], 'หาปลาไหลยาวที่โผล่ออกนอกชาม', 'Find the long eel poking out over the edge of the bowl',
    // a deep blue and white rice bowl, long glossy brown grilled eel strips laid across the rice and poking out over the edge, a green leaf on top, its lid set aside
    E(178, 82, 40, 14, '#1565C0') + E(178, 76, 14, 5, '#90CAF9', 2.5) + P('M34 132h172q-10 70-86 70t-86-70z', '#1565C0') + Lc('M54 158q66 22 132 0M70 180q50 14 100 0', '#90CAF9', 4)
      + E(120, 132, 86, 18, '#FFFFFF') + [[-6, 118, 0], [8, 132, 4], [-2, 146, -3]].map(([dx, y, r]) => g(120 + dx, y, 1, R(-78, -6, 140, 13, '#8D5524', 6) + Lc('M-70 0h124', '#B5651D', 2), r)).join('')
      + E(132, 112, 10, 5, '#7CB342', 2.5) + face(120, 168, 0.34)),
  L('harakomeshi', 'ฮาราโกะเมชิ ข้าวหน้าแซลมอนกับไข่ปลาสีส้มในกล่องไม้', 'Harako-meshi, salmon and roe rice in a round wooden box', ['harako meshi', 'harakomeshi', 'ฮาราโกะเมชิ', 'salmon rice', 'ข้าวแซลมอน', 'salmon roe', 'ไข่ปลาแซลมอน', 'ikura', 'อิกุระ', 'wappa box', 'กล่องไม้วัปปะ', 'watari', 'วาตาริ', 'miyagi', 'มิยางิ'], 'หาไข่ปลาสีส้มเม็ดกลมๆ บนข้าว', 'Find the shiny round orange fish eggs on the rice',
    // a round bentwood box of pale cedar with a bark band, golden rice inside, pink slices of salmon round the edge and a heap of shiny orange roe in the middle
    P('M32 120v44q0 34 88 34t88-34v-44z', '#E6C79C') + Lc('M32 150q88 30 176 0', '#A1887F', 8) + Lc('M60 132v52M100 136v56M140 136v56M180 132v52', '#D7B98A', 2)
      + E(120, 120, 88, 26, '#E6C79C') + E(120, 120, 78, 20, '#FFE082') + [[64, 118, -20], [92, 108, -8], [148, 108, 8], [176, 118, 20], [120, 132, 0]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 16, 8, '#FF8A65', 2.5) + Lc('M-8-2l6 4M2-4l6 4', '#FFCCBC', 2), r)).join('')
      + [[110, 116], [120, 112], [130, 116], [115, 122], [125, 122], [120, 118]].map(([x, y]) => C(x, y, 5, '#FF6F00', 2) + C(x - 1.5, y - 1.5, 1.5, '#FFE0B2', 0)).join('')
      + face(120, 170, 0.34) + E(104, 104, 6, 3, '#7CB342', 2)),
];

export default {
  places: {
    'jp-sendai': { country: 'jp', wave: 3, name: nm('เซนไดและมัตสึชิมะ', 'Sendai and Matsushima'), tz: 'Asia/Tokyo', ll: [38.26, 140.87], alias: ['sendai', 'เซนได', 'เซ็นได', '仙台', 'SDJ', 'matsushima', 'มัตสึชิมะ', '松島', 'shiogama', 'ชิโอกามะ', '塩竈', 'akiu', 'อากิอุ', '秋保', 'sakunami', 'ซากุนามิ', 'jozenji', 'โจเซ็นจิ', 'aoba castle', 'ปราสาทอาโอบะ'], colors: SD },
  },
  items,
};
