// Wave 9, the north (part 4): Ireland, Dublin and the west coast, Sweden, Stockholm, York and Yorkshire, the Lake District
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const X = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const water = (y, c = '#4FC3F7') => P(`M-4 ${y}h248v${244 - y}H-4z`, c, 0);
const waves = (pts, c = '#E1F5FE') => pts.map(([x, y]) => Lc(`M${x} ${y}q6-5 12 0t12 0`, c, 2.5)).join('');
const lawn = (y, c = '#9CCC65') => P(`M-4 ${y}h248v${244 - y}H-4z`, c, 0) + Lc(`M-4 ${y}h248`, INK, 3);
const tree = (x, y, s, c = '#66BB6A') => g(x, y, s, R(-3, -6, 6, 20, '#6D4C41', 1, 2) + C(0, -18, 16, c, 2.5));

const items = [
  // ---------- Ireland
  X('ie', 'culture', 'roadbowling', 'โยนลูกเหล็กไปตามถนนชนบท โรดโบว์ลิง', 'Road bowling down a country lane', ['road bowling', 'โรดโบว์ลิง', 'long bullets', 'ลองบุลเล็ต', 'iron ball', 'ลูกเหล็ก', 'country road game', 'เกมบนถนนชนบท', 'county cork', 'armagh'],
    // a grown-up mid-throw swinging a small heavy iron ball underarm down a winding country lane between green hedges, a friend ahead holding up a hand to show the line and a tuft of grass marking the spot
    sky('#E8F5E9') + P('M-4 120c60-14 180-14 248 0v124H-4z', '#81C784', 3) + P('M86 244c10-50 30-90 60-124h20c-20 34-30 74-30 124z', '#BCAAA4', 3)
    + [[20, 130], [60, 124], [196, 128], [228, 132]].map(([x, y]) => C(x, y, 16, '#43A047', 2.5)).join('')
    + g(168, 118, 0.6, R(-10, -14, 20, 26, '#1E88E5', 5, 3) + C(0, -26, 10, '#FFE0BD', 3) + face(0, -24, 0.24) + Lc('M8-10l10-18', '#FFE0BD', 5))
    + g(72, 196, 1, Lc('M-6 22l-14 24M6 22l12 24', '#455A64', 8) + R(-14, -16, 28, 40, '#E53935', 7, 3) + C(0, -30, 13, '#FFE0BD', 3) + P('M-13-34c2-12 24-12 26 0z', '#5D4037', 2.5) + face(2, -28, 0.28) + Lc('M12-6c16 10 26 22 34 30', '#FFE0BD', 6))
    + C(122, 228, 8, '#455A64', 3) + E(119, 225, 3, 2, '#90A4AE', 0) + Lc('M100 224c6 2 10 4 14 4', '#ECEFF1', 2.5) + P('M150 140l4-10 4 10z', '#2E7D32', 2)),
  X('ie', 'animal', 'natterjack', 'คางคกแนตเทอร์แจ็กลายเส้นเหลือง', 'A natterjack toad with its yellow stripe', ['natterjack toad', 'คางคกแนตเทอร์แจ็ก', 'toad', 'คางคก', 'yellow stripe', 'ลายเส้นสีเหลือง', 'sand dunes', 'เนินทราย', 'county kerry', 'rare irish animal'],
    // a plump little olive-green toad covered in warty bumps with a thin bright yellow stripe down its back, sitting on a sandy dune beside spiky marram grass, singing with a puffed-up throat
    E(120, 204, 100, 16, '#F3E0A8', 3) + Lc('M190 200l-8-40M196 200l6-44M204 202l14-36M40 200l-4-36M46 200l8-34', '#9CCC65', 3)
    + g(118, 160, 1, P('M-60 30c-6-30 10-60 50-64 40-4 66 16 72 40 4 18-4 28-14 30z', '#8D9A4A', 3.5) + Lc('M-50 6c24-22 70-30 104-10', '#FFEB3B', 4)
      + [[-40, 20], [-20, -4], [10, -14], [30, 10], [-28, 30], [44, 0], [0, 20], [20, 26]].map(([x, y]) => C(x, y, 4, '#6B7A35', 1.5)).join('')
      + P('M-62 34c-10 10-16 14-20 8M-30 40c-4 8 4 10 8 4M44 34c6 8 14 8 18 2M60 34c8 0 14-4 16-10', 'none', 3) + C(54, -12, 10, '#8D9A4A', 3) + C(54, -12, 4.5, '#FFB300', 2) + C(54, -12, 2, INK, 0)
      + E(70, 18, 12, 10, '#FFF59D', 2.5) + face(58, 2, 0.26, 'none') + Lc('M80 -2c6-4 10-4 14 0M82 8c6-2 10 0 12 4', '#FFCA28', 2.5))),
  X('ie', 'culture', 'tinwhistle', 'ขลุ่ยดีบุกทินวิสเซิลกับโน้ตดนตรีไอริช', 'A tin whistle playing an Irish jig', ['tin whistle', 'ขลุ่ยดีบุก', 'penny whistle', 'ขลุ่ยเพนนี', 'irish music', 'ดนตรีไอริช', 'trad session', 'วงดนตรีพื้นบ้าน', 'jig and reel', 'six holes'],
    // a long shiny silver whistle with a green plastic mouthpiece and six round finger holes lying across, little musical notes and a curly trail of sound bouncing out of it
    g(118, 128, 1, R(-90, -10, 180, 20, '#CFD8DC', 9, 3.5) + Lc('M-84-4h170', '#FFFFFF', 3) + P('M-90-10h-22c-8 0-12 6-10 10l8 10h24z', '#2E7D32', 3) + R(-82, -6, 10, 6, '#1B5E20', 1, 1.5)
      + [-36, -16, 4, 32, 52, 72].map((x) => C(x, 0, 5, '#37474F', 2)).join('') + E(96, 0, 6, 10, '#B0BEC5', 3) + face(-56, 0, 0.26), -18)
    + [[60, 64, '#E53935'], [100, 44, '#1E88E5'], [176, 54, '#FFCA28'], [196, 100, '#43A047']].map(([x, y, c], i) => g(x, y, 1, E(0, 10, 8, 6, c, 2.5) + Lc('M7 9V-14', INK, 3) + (i % 2 ? Lc('M7-14c6 2 10 6 10 12', INK, 3) : ''))).join('')
    + Lc('M196 140c10 10 4 24-8 22s-10-18 4-18', '#90A4AE', 2.5)),

  // ---------- Dublin and the west coast
  L('ie/ireland/landmark-harpbridge.v1.svg', 'สะพานซามูเอลเบ็กเก็ตต์รูปพิณบนแม่น้ำลิฟฟีย์', 'The harp-shaped Samuel Beckett Bridge', ['samuel beckett bridge', 'สะพานซามูเอลเบ็กเก็ตต์', 'harp bridge', 'สะพานรูปพิณ', 'river liffey', 'แม่น้ำลิฟฟีย์', 'dublin docklands', 'ด็อกแลนด์ดับลิน', 'cable bridge', 'swing bridge'], 'หาสะพานที่หน้าตาเหมือนพิณนอนตะแคง', 'Find the bridge that looks like a harp lying on its side',
    // a white bridge across a river with one tall curved white pylon leaning back like the frame of a harp, many thin cables fanning down from it to the deck like harp strings
    sky('#E3F2FD') + R(-4, 120, 60, 40, '#B0BEC5', 2, 3) + R(184, 110, 60, 50, '#CFD8DC', 2, 3) + water(156, '#4FC3F7') + waves([[30, 200], [140, 216], [190, 196]])
    + R(-4, 152, 248, 12, '#ECEFF1', 2, 3.5)
    + Array.from({ length: 11 }, (_, k) => { const t = k / 10, px = 120 + 70 * t - 40 * t * t, py = 40 + 100 * t * t; return Lc(`M${px.toFixed(1)} ${py.toFixed(1)}L${(20 + k * 10).toFixed(1)} 152`, '#90A4AE', 1.8); }).join('')
    + P('M118 152c-4-50 0-90 4-112 20 4 50 30 60 70 6 22 2 32-6 42h-8c6-10 8-20 4-36-8-30-28-52-42-60-2 22-4 58 0 96z', '#FAFAFA', 3.5) + face(140, 110, 0.26)
    + kid(70, 152, '#43A047', 0.7) + kid(210, 152, '#FB8C00', 0.7)),
  L('ie/ireland/landmark-benbulbin.v1.svg', 'ภูเขาโต๊ะเบนบัลเบนในสลายโก', 'Benbulbin, the table-top mountain of Sligo', ['benbulbin', 'ภูเขาเบนบัลเบน', 'ben bulben', 'table mountain', 'ภูเขายอดตัด', 'sligo', 'สลายโก', 'yeats country', 'flat top mountain', 'ภูเขายอดแบน'], 'หาภูเขาที่ยอดแบนเหมือนโต๊ะและข้างเป็นริ้ว', 'Find the flat-topped mountain with stripy sides',
    // a huge flat-topped mountain with a long level top and steep sides furrowed into many vertical ridges, green fields with stone walls and a white cottage in front, a cloud drifting by
    sky('#E3F2FD') + P('M30 50c10-10 30-10 34 0 10-4 20 0 20 8H24c0-6 2-8 6-8z', '#FFFFFF', 2.5)
    + P('M-4 160L40 80c30-6 120-8 160-4 20 10 30 40 44 84z', '#7CB342', 3.5) + Array.from({ length: 14 }, (_, k) => Lc(`M${48 + k * 11} 82l${-4 + (k % 3) * 2} ${40 + (k % 4) * 8}`, '#558B2F', 2)).join('') + Lc('M40 80c30-6 120-8 160-4', '#AED581', 4)
    + lawn(160, '#9CCC65') + Lc('M-4 196c60-10 120-6 248 0M100 160l-10 84', '#A1887F', 3) + R(150, 176, 40, 24, '#FFFFFF', 2, 3) + P('M146 178l24-14 24 14z', '#8D6E63', 3) + R(164, 186, 10, 14, '#E53935', 1, 2)
    + face(120, 120, 0.4) + kid(60, 226, '#1E88E5', 0.85)),
  L('ie/ireland/landmark-spanisharch.v1.svg', 'ประตูโค้งสแปนิชอาร์ชริมแม่น้ำที่กอลเวย์', 'The Spanish Arch by the river in Galway', ['spanish arch', 'ประตูโค้งสแปนิชอาร์ช', 'galway city walls', 'กำแพงเมืองกอลเวย์', 'river corrib', 'แม่น้ำคอร์ริบ', 'the long walk', 'เดอะลองวอล์ก', 'galway bay', 'quay street'], 'หาซุ้มประตูหินโค้งในกำแพงเก่า', 'Find the stone arches in the old wall',
    // a chunky old grey stone wall pierced by two round-topped arches, grass growing on top, the wide river running past with a row of brightly painted houses along the far quay
    sky('#FFF8E1') + [[-4, '#E57373'], [30, '#FFF176'], [64, '#81D4FA'], [98, '#CE93D8'], [132, '#A5D6A7'], [166, '#FFCC80'], [200, '#F48FB1']].map(([x, c]) => R(x, 50, 34, 50, c, 1, 2.5) + R(x + 8, 62, 8, 10, '#FFFFFF', 1, 1.5) + R(x + 20, 62, 8, 10, '#FFFFFF', 1, 1.5)).join('') + water(100, '#4FC3F7') + waves([[30, 112], [170, 116]])
    + R(20, 120, 200, 100, '#A1958A', 3, 3.5) + P('M20 120c20-10 60-6 80-10s60 4 120 10', '#7CB342', 3) + [[30, 150, 40], [150, 140, 50], [180, 190, 30]].map(([x, y, w]) => R(x, y, w, 14, '#B6AA9C', 4, 2)).join('')
    + P('M60 220v-50c0-30 50-30 50 0v50zM130 220v-50c0-30 50-30 50 0v50z', '#4E342E', 3.5) + face(120, 150, 0.3) + lawn(220, '#BCAAA4') + kid(84, 220, '#E53935', 0.8)),
  L('ie/ireland/landmark-salthill.v1.svg', 'เดินเลียบโปรมาเนดซอลต์ฮิลล์แล้วเตะกำแพงตอนท้าย', 'Walking the Salthill Prom and kicking the wall at the end', ['salthill promenade', 'ทางเดินริมทะเลซอลต์ฮิลล์', 'kick the wall', 'เตะกำแพง', 'galway bay', 'อ่าวกอลเวย์', 'blackrock diving tower', 'หอกระโดดน้ำแบล็กร็อก', 'seaside walk', 'the prom'], 'หาเด็กที่ยกเท้าแตะกำแพงตอนท้ายทาง', 'Find the child tapping the wall with a foot at the end of the walk',
    // a long seaside promenade curving along the bay with railings and lamp posts, at its end a low stone wall with a child kicking it with a big grin, a tall green diving tower standing in the sea
    sky('#E1F5FE') + water(100, '#4FC3F7') + waves([[30, 130], [100, 120], [70, 160]]) + P('M140 40l40-4 40 4v70h-80z', 'none', 0)
    + R(130, 60, 40, 60, '#4DB6AC', 2, 3.5) + R(126, 54, 48, 10, '#26A69A', 2, 3) + Lc('M138 76h24M138 92h24M138 108h24', '#FFFFFF', 2) + R(140, 118, 20, 30, '#B0BEC5', 1, 2.5)
    + P('M-4 180l244-40v104H-4z', '#CFD8DC', 3.5) + Lc('M-4 172l244-40', '#78909C', 3) + [30, 90, 150].map((x) => Lc(`M${x} ${176 - x / 6}V${150 - x / 6}`, '#455A64', 3) + C(x, 146 - x / 6, 5, '#FFF59D', 2)).join('')
    + R(186, 130, 54, 30, '#A1958A', 3, 3.5) + Lc('M190 144h46', '#8D8378', 2) + face(214, 146, 0.24)
    + g(166, 184, 1, Lc('M-4 14l-8 26', '#1565C0', 8) + Lc('M4 14l18 4', '#1565C0', 8) + E(26, 18, 6, 5, '#E53935', 2.5) + R(-12, -18, 24, 34, '#FFCA28', 7, 3) + C(0, -30, 12, '#FFE0BD', 3) + face(0, -28, 0.28, 'o') + Lc('M-12-8l-14 10M12-8l12-14', '#FFE0BD', 5))),
  L('ie/ireland/landmark-shandon.v1.svg', 'หอระฆังชานดอนกับใบพัดลมรูปปลาแซลมอนทอง', 'The Shandon Bells tower and its golden salmon', ['shandon bells', 'หอระฆังชานดอน', 'shandon tower', 'หอคอยชานดอน', 'golden salmon', 'ปลาแซลมอนทอง', 'cork city', 'เมืองคอร์ก', 'ring the bells', 'ตีระฆัง'], 'หาปลาแซลมอนสีทองบนยอดหอคอย', 'Find the golden salmon on the top of the tower',
    // a tall tower built in stacked shrinking blocks like a pepper pot, two sides red stone and two sides white stone, a round clock on each stage and a golden salmon weathervane on the very top
    sky('#FFF3E0') + [[70, 100, 120], [86, 68, 70], [96, 48, 46], [104, 32, 26]].map(([x, w, y]) => R(x, y, w, (y === 120 ? 112 : y === 70 ? 50 : y === 46 ? 24 : 16), '#ECEFF1', 2, 3.5) + R(x, y, w / 2, (y === 120 ? 112 : y === 70 ? 50 : y === 46 ? 24 : 16), '#C0603A', 2, 3.5)).join('')
    + P('M100 46l20-26 20 26z', '#78909C', 3) + Lc('M120 20V8', INK, 3) + g(120, 4, 1, P('M-16 0c8-8 22-8 28 0-6 8-20 8-28 0z', '#FFCA28', 2.5) + P('M12 0l8-6v12z', '#FFCA28', 2.5) + C(-10, -1, 1.5, INK, 0))
    + C(120, 94, 13, '#FFFFFF', 3) + Lc('M120 94v-8M120 94l6 3', INK, 2.5) + R(104, 180, 32, 52, '#5D4037', 16, 3) + R(108, 136, 24, 30, '#FFF8E1', 12, 2.5)
    + face(98, 200, 0.26) + lawn(232, '#BCAAA4') + kid(50, 232, '#43A047', 0.85) + kid(190, 232, '#E91E63', 0.85)),

  // ---------- Sweden
  X('se', 'food', 'smorgastarta', 'สเมอร์กัสทอร์ตา เค้กแซนด์วิชแต่งกุ้งกับแตงกวา', 'Smörgåstårta, the sandwich cake', ['smorgastarta', 'สเมอร์กัสทอร์ตา', 'smörgåstårta', 'sandwich cake', 'เค้กแซนด์วิช', 'prawns and cucumber', 'กุ้งกับแตงกวา', 'swedish party food', 'อาหารงานเลี้ยงสวีเดน', 'savoury cake'],
    // a tall square cake made of bread layers and creamy fillings, covered in white cream cheese and decorated on top with pink prawns, cucumber slices, lemon wedges, egg halves and dill
    E(120, 196, 104, 18, '#FFFFFF', 3) + R(40, 100, 160, 90, '#FFFDF5', 6, 3.5) + Lc('M40 124h160M40 150h160M40 172h160', '#F2C27B', 4) + Lc('M40 136h160M40 162h160', '#AED581', 3)
    + P('M36 100c0-14 168-14 168 0v8c-30 6-138 6-168 0z', '#FFFFFF', 3) + R(40, 96, 160, 10, '#FFFFFF', 4, 0)
    + [[60, 92], [100, 88], [140, 88], [180, 92]].map(([x, y]) => C(x, y, 10, '#C5E1A5', 2.5) + C(x, y, 5, '#F1F8E9', 0)).join('')
    + [[80, 82], [120, 80], [160, 82]].map(([x, y]) => P(`M${x - 12} ${y}c0-14 24-14 24 0-6-4-12 0-12 4 0-4-6-8-12-4z`, '#FF8A65', 2.5)).join('') + [[50, 106], [190, 106]].map(([x, y]) => E(x, y, 9, 6, '#FFFFFF', 2) + C(x, y, 4, '#FFCA28', 0)).join('')
    + P('M112 66l8-12 8 12z', '#FFF176', 2.5) + Lc('M96 72l-4-10M100 72l2-10M144 72l4-10', '#43A047', 2.5) + face(120, 142, 0.42)),
  X('se', 'food', 'polkagris', 'ลูกกวาดโพลกากริสแท่งลายแดงขาวจากเกรนนา', 'Polkagris, the red-and-white peppermint rock from Gränna', ['polkagris', 'โพลกากริส', 'granna', 'เกรนนา', 'peppermint stick', 'ลูกกวาดเปปเปอร์มินต์', 'striped candy', 'ลูกกวาดลายทาง', 'candy maker', 'sweet shop'],
    // a glass jar holding a bunch of twisted red-and-white striped peppermint sticks, one giant swirl lollipop of the same stripes leaning beside it and a few little pieces scattered
    P('M70 100h80v100c0 10-80 10-80 0z', '#E1F5FE', 3.5) + R(64, 92, 92, 12, '#B3E5FC', 4, 3)
    + [[86, -6], [104, 2], [122, -2], [140, 8]].map(([x, r]) => g(x, 140, 1, R(-6, -90, 12, 150, '#FFFFFF', 6, 3) + Array.from({ length: 9 }, (_, k) => Lc(`M-6 ${-80 + k * 16}l12-8`, '#E53935', 4)).join(''), r)).join('')
    + face(110, 170, 0.36)
    + g(190, 120, 1, Lc('M0 20v90', '#FFFFFF', 8) + Lc('M0 20v90', INK, 1.5) + C(0, 0, 32, '#FFFFFF', 3.5) + Lc('M0 0c6 0 8 6 4 10-6 6-16 2-16-6 0-12 14-18 24-12 14 8 12 30-4 34-20 4-32-14-28-30', '#E53935', 5))
    + [[40, 206], [60, 214], [170, 214]].map(([x, y]) => R(x - 8, y - 4, 16, 8, '#FFFFFF', 4, 2) + Lc(`M${x - 4} ${y - 4}l4 8M${x + 2} ${y - 4}l4 8`, '#E53935', 2.5)).join('')),
  X('se', 'culture', 'julbock', 'แพะฟางจูลบ็อกตัวโตผูกโบแดง', 'The big straw Yule goat with red ribbons', ['yule goat', 'แพะฟางคริสต์มาส', 'julbock', 'จูลบ็อก', 'gavle goat', 'แพะฟางแยฟเลอ', 'straw goat', 'แพะฟาง', 'swedish christmas', 'คริสต์มาสสวีเดน'],
    // a big goat made of bundled golden straw standing in the snow, its long curled horns and legs tied with bright red ribbons, a string of little warm lights strung beside it
    E(120, 210, 104, 14, '#FFFFFF', 3) + Lc('M14 40c60 20 150 20 212 0', INK, 2) + [30, 60, 90, 120, 150, 180, 210].map((x) => C(x, 40 + 13 * Math.sin(Math.PI * (x - 14) / 212) * 1.4, 5, '#FFEB3B', 2)).join('')
    + g(110, 140, 1, R(-56, -20, 112, 40, '#F2C94C', 18, 3.5) + Lc('M-46-8h92M-46 4h92', '#D4A72C', 2) + [-40, 40].map((x) => Lc(`M${x}-20v40`, '#E53935', 6)).join('')
      + [-44, -24, 24, 44].map((x) => R(x - 6, 18, 12, 52, '#F2C94C', 5, 3) + Lc(`M${x - 6} 40h12`, '#E53935', 5)).join('')
      + g(62, -36, 1, R(-14, -6, 22, 50, '#F2C94C', 10, 3.5).replace('<rect', '<rect transform="rotate(30)"') + E(16, -8, 22, 16, '#F2C94C', 3.5) + P('M8-20c-6-24 10-40 30-34-14 4-20 14-16 30', '#F2C94C', 3) + P('M20-22c4-22 24-30 38-20-14 0-22 8-24 22', '#F2C94C', 3) + Lc('M4-14h20', '#E53935', 5) + P('M34 0l6 14-10-4z', '#F2C94C', 2.5) + face(18, -8, 0.26))
      + P('M-56-4c-16-4-22-16-14-22', 'none', 3))),

  // ---------- Stockholm
  L('se/stockholm/landmark-nordiska.v1.svg', 'พิพิธภัณฑ์นอร์ดิสกาหลังใหญ่เหมือนปราสาท', 'The castle-like Nordic Museum', ['nordic museum', 'พิพิธภัณฑ์นอร์ดิก', 'nordiska museet', 'นอร์ดิสกามูเซต', 'swedish folk life', 'วิถีชีวิตชาวสวีเดน', 'djurgarden canal', 'คลองยูร์กอร์เดน', 'museum palace', 'children’s playhouse'], 'หาหอคอยกลางที่สูงที่สุดของตึก', 'Find the tall tower in the middle of the building',
    // a huge grand museum like a castle with lots of stepped gables, a tall central tower topped with a green copper spire, rows of windows, standing beside a canal with a little bridge
    sky('#E3F2FD') + water(186, '#4FC3F7') + waves([[30, 210], [170, 220]])
    + R(10, 90, 220, 96, '#E9DCC2', 2, 3.5) + [[10, 40], [56, 30], [154, 30], [190, 40]].map(([x, w]) => P(`M${x} 90h${w}l-6-12h-6v-10h-6v-10h${-(w - 36)}v10h-6v10h-6z`, '#E9DCC2', 3)).join('')
    + R(96, 40, 48, 146, '#E9DCC2', 2, 3.5) + P('M92 42l28-36 28 36z', '#4DB6AC', 3.5) + Lc('M120 6V-4', INK, 3) + R(110, 56, 20, 26, '#90CAF9', 10, 2.5)
    + [[22, 104], [46, 104], [70, 104], [158, 104], [182, 104], [206, 104], [22, 140], [46, 140], [70, 140], [158, 140], [182, 140], [206, 140]].map(([x, y]) => R(x - 6, y, 12, 20, '#90CAF9', 2, 2)).join('') + R(106, 140, 28, 46, '#5D4037', 14, 3)
    + face(120, 112, 0.28) + P('M170 188c10-12 50-12 60 0', 'none', 4)),
  L('se/stockholm/landmark-montelius.v1.svg', 'ทางเดินริมผามอนเตลิอุสวีเกนชมวิวเมือง', 'The Monteliusvägen cliff path and its view', ['monteliusvagen', 'ทางเดินมอนเตลิอุสวีเกน', 'monteliusvägen', 'sodermalm', 'เซอเดอร์มาล์ม', 'cliff top walk', 'ทางเดินบนหน้าผา', 'riddarfjarden view', 'วิวริดดาร์ฟแยร์เดน', 'best city view'], 'หาม้านั่งไม้ริมทางเดินบนหน้าผา', 'Find the wooden bench on the cliff path',
    // a winding gravel path along the top of a rocky cliff with a wooden fence and a bench, flowers and a tree, below it a wide blue bay with islands of old buildings and spires far across the water
    sky('#E3F2FD') + water(110, '#4FC3F7') + P('M100 110v-16h20v-20l6-10 6 10v20h30v-10h30v26z', '#B0BEC5', 3) + R(30, 96, 50, 14, '#CFD8DC', 1, 2.5)
    + P('M-4 140c40-20 120-20 168-10 30 6 60 4 80 0v114H-4z', '#8D8378', 3.5) + P('M-4 150c50-14 140-14 248-4v20c-100-8-190-4-248 6z', '#E2C27E', 3)
    + Lc('M-4 144c50-14 140-14 248-4', '#8D6E63', 3) + [10, 50, 90, 130, 170, 210].map((x) => Lc(`M${x} ${142 - x * 0.02}v-14`, '#8D6E63', 3)).join('') + Lc('M-4 132c50-14 140-14 248-4', '#8D6E63', 3)
    + g(100, 172, 1, R(-24, -12, 48, 8, '#A1887F', 2, 2.5) + R(-24, -22, 48, 6, '#A1887F', 2, 2.5) + Lc('M-20-4v12M20-4v12', '#6D4C41', 3)) + tree(200, 160, 1.1)
    + [[30, 200], [50, 210], [150, 206], [170, 214]].map(([x, y]) => C(x, y, 5, '#F06292', 1.5)).join('') + face(120, 210, 0.3) + kid(60, 174, '#E53935', 0.8) + kid(150, 172, '#FFCA28', 0.8)),
  L('se/stockholm/landmark-riddarholmen.v1.svg', 'ยอดเหล็กหล่อฉลุของโบสถ์ริดดาร์โฮล์มเมน', 'The lacy cast-iron spire of Riddarholmen', ['riddarholmen church', 'โบสถ์ริดดาร์โฮล์มเมน', 'riddarholmskyrkan', 'ริดดาร์โฮล์มส์ชีร์กาน', 'cast iron spire', 'ยอดเหล็กหล่อ', 'openwork spire', 'ยอดแหลมฉลุ', 'riddarholmen island', 'royal burial church'], 'หายอดแหลมสีดำที่มองทะลุได้เหมือนลูกไม้', 'Find the black spire you can see through like lace',
    // a red-brick building with stepped gables and a square tower, topped by a tall black see-through iron spire made of criss-cross lattice like lace, the sky showing through it
    sky('#FCE4EC') + R(30, 130, 180, 80, '#B5543A', 2, 3.5) + P('M30 130h20v-10h20v-10h20v20zM150 130h20v-10h20v-10h20v20z', '#B5543A', 3)
    + R(94, 100, 52, 110, '#C0603A', 2, 3.5) + [[46, 150], [70, 150], [160, 150], [184, 150]].map(([x, y]) => R(x, y, 12, 30, '#FFF8E1', 6, 2)).join('') + R(110, 120, 20, 30, '#FFF8E1', 10, 2.5)
    + P('M96 100l24-90 24 90z', 'none', 3.5) + Array.from({ length: 6 }, (_, k) => { const y = 94 - k * 14, w = 22 - k * 3.6; return Lc(`M${120 - w} ${y}h${2 * w}M${120 - w} ${y}l${w * 0.9} -14M${120 + w} ${y}l${-w * 0.9} -14`, '#37474F', 2.5); }).join('') + Lc('M120 10V100', '#37474F', 2.5) + C(120, 8, 4, '#FFCA28', 2)
    + face(120, 180, 0.3) + lawn(210, '#BCAAA4') + kid(60, 234, '#7E57C2', 0.85)),
  L('se/stockholm/landmark-skeppsholmcrown.v1.svg', 'มงกุฎทองบนสะพานสเคปส์โฮล์มส์บรูน', 'The golden crown on Skeppsholmen Bridge', ['skeppsholmen bridge', 'สะพานสเคปส์โฮล์มส์บรูน', 'skeppsholmsbron', 'golden crown', 'มงกุฎทอง', 'skeppsholmen', 'เกาะสเคปส์โฮล์มเมน', 'iron bridge', 'สะพานเหล็ก', 'stockholm harbour'], 'หามงกุฎทองตรงกลางราวสะพาน', 'Find the golden crown in the middle of the bridge railing',
    // a low iron bridge with dark blue patterned railings crossing the water, a shining golden crown standing on top of the railing in the middle, old-fashioned lamp posts and kids walking across
    sky('#E1F5FE') + water(140, '#4FC3F7') + waves([[20, 200], [140, 214], [190, 190]])
    + P('M-4 150c80-20 168-20 248 0v16c-80-20-168-20-248 0z', '#90A4AE', 3.5) + Lc('M-4 122c80-20 168-20 248 0', '#1A3A6B', 4) + Array.from({ length: 13 }, (_, k) => { const x = k * 20, y = 122 - 20 * Math.sin(Math.PI * (x + 4) / 248) * 0.8; return Lc(`M${x} ${y + 2}v26`, '#1A3A6B', 3) + C(x + 10, y + 16, 5, 'none', 2); }).join('')
    + [40, 200].map((x) => Lc(`M${x} 140V70`, '#1A3A6B', 4) + R(x - 8, 58, 16, 16, '#FFF59D', 3, 2.5) + P(`M${x - 10} 58l10-8 10 8z`, '#1A3A6B', 2)).join('')
    + g(120, 92, 1, P('M-26 14l-6-30 14 12 18-22 18 22 14-12-6 30z', '#FFCA28', 3.5) + R(-28, 12, 56, 10, '#FFB300', 3, 3) + [[-14, 16], [0, 16], [14, 16]].map(([x, y]) => C(x, y, 3, '#E53935', 1.5)).join('') + C(0, -40, 5, '#FFCA28', 2.5) + Lc('M0-34v-12M-6-40h12', '#FFCA28', 3) + face(0, 0, 0.26))
    + kid(80, 128, '#E53935', 0.7) + kid(166, 128, '#43A047', 0.7)),

  // ---------- York and Yorkshire
  L('gb/york/landmark-rhubarb.v1.svg', 'โรงเรือนมืดปลูกรูบาร์บใต้แสงเทียน', 'Forced rhubarb growing by candlelight in the dark sheds', ['rhubarb triangle', 'สามเหลี่ยมรูบาร์บ', 'forced rhubarb', 'รูบาร์บปลูกในที่มืด', 'forcing sheds', 'โรงเรือนมืด', 'candlelight harvest', 'เก็บเกี่ยวใต้แสงเทียน', 'wakefield', 'pink rhubarb'], 'หารูบาร์บสีชมพูที่ยืดตัวในความมืด', 'Find the pink rhubarb stretching up in the dark',
    // inside a long dark shed, rows of tall slender pink rhubarb stalks with small crinkly yellow leaves rising from the soil, lit by a glowing candle held by a grower, wooden beams overhead
    sky('#263238') + P('M-4 40l124-34 124 34', 'none', 4) + Lc('M-4 40l124-34 124 34M60 22v222M180 22v222', '#4E342E', 4)
    + P('M-4 200h248v44H-4z', '#5D4037', 0) + Lc('M-4 200h248', INK, 3)
    + [[24, 1], [56, 0.9], [92, 1.1], [150, 1], [186, 0.9], [218, 1]].map(([x, s]) => g(x, 200, s, Lc('M-6 0c-2-40-6-70-10-96M0 0c0-40 2-80 4-110M6 0c2-40 8-70 12-90', '#F06292', 5) + Lc('M-6 0c-2-40-6-70-10-96M0 0c0-40 2-80 4-110M6 0c2-40 8-70 12-90', INK, 1.2)
      + E(-16, -100, 9, 6, '#FFF176', 2) + E(4, -116, 10, 6, '#FFF176', 2) + E(18, -94, 8, 5, '#FFF176', 2))).join('')
    + g(122, 196, 1, R(-12, -14, 24, 30, '#455A64', 6, 3) + C(0, -26, 11, '#FFE0BD', 3) + P('M-11-30c2-10 20-10 22 0z', '#8D6E63', 2.5) + face(0, -24, 0.24) + Lc('M10-6l12-8', '#FFE0BD', 5) + R(20, -22, 8, 12, '#FFFDE7', 1, 2) + P('M24-30c-4-4 0-10 0-10 4 4 4 8 0 10z', '#FFCA28', 1.5) + C(24, -32, 16, '#FFF59D', 0).replace('fill="#FFF59D"', 'fill="#FFF59D" opacity=".35"'))),
  L('gb/york/landmark-whalebone.v1.svg', 'ซุ้มกระดูกขากรรไกรวาฬบนหน้าผาวิตบี', 'The whalebone arch on the cliff at Whitby', ['whalebone arch', 'ซุ้มกระดูกวาฬ', 'whale jawbone', 'กระดูกขากรรไกรวาฬ', 'west cliff whitby', 'หน้าผาตะวันตกวิตบี', 'whaling history', 'ประวัติล่าวาฬ', 'harbour view', '199 steps view'], 'หาซุ้มโค้งสีขาวที่ทำจากกระดูกวาฬ', 'Find the tall white arch made of whale bones',
    // two huge curved white jawbones meeting at the top to make a tall pointed arch on a grassy clifftop, through it the harbour with red-roofed houses on the far hill and the sea
    sky('#E3F2FD') + water(120, '#4FC3F7') + P('M120 120c20-20 60-36 124-36v36z', '#81C784', 3) + [[150, 100], [174, 96], [198, 92], [222, 90]].map(([x, y]) => R(x, y, 18, 14, '#FFF8E1', 1, 2) + P(`M${x - 2} ${y}l11-8 11 8z`, '#D84315', 2)).join('')
    + waves([[30, 150], [90, 160]]) + P('M-4 180c60-20 180-20 248 0v64H-4z', '#7CB342', 3.5)
    + P('M70 186C60 120 80 50 118 30c-24 30-34 90-28 156z', '#FFFDF5', 3.5) + P('M170 186C180 120 160 50 122 30c24 30 34 90 28 156z', '#FFFDF5', 3.5) + Lc('M84 150c-4-40 6-80 26-104M156 150c4-40-6-80-26-104', '#E0D6C6', 2)
    + face(98, 110, 0.24) + kid(120, 214, '#E53935', 0.85)),
  L('gb/york/landmark-parkin.v1.svg', 'พาร์กินเค้กขิงข้าวโอ๊ตเหนียวหนึบของยอร์กเชียร์', 'Yorkshire parkin, the sticky ginger oat cake', ['yorkshire parkin', 'พาร์กินยอร์กเชียร์', 'parkin', 'พาร์กิน', 'ginger cake', 'เค้กขิง', 'oat and treacle', 'ข้าวโอ๊ตกับกากน้ำตาล', 'bonfire night', 'คืนกองไฟ'], 'หาเค้กสี่เหลี่ยมสีน้ำตาลเข้มเหนียวๆ', 'Find the dark sticky squares of cake',
    // squares of dark brown sticky ginger and oat cake with a shiny glossy top piled on a plate, a little ginger root beside them and a sparkler fizzing in the evening sky
    sky('#283593') + [[30, 30], [200, 40], [170, 20], [60, 70]].map(([x, y]) => C(x, y, 2, '#FFF59D', 0)).join('')
    + g(186, 80, 1, Lc('M0 60L-10 0', '#90A4AE', 3) + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => Lc(`M-10 0l${(14 * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(14 * Math.sin(a * Math.PI / 180)).toFixed(1)}`, '#FFCA28', 3)).join('') + C(-10, 0, 4, '#FFF59D', 1.5))
    + E(116, 192, 100, 22, '#FFFFFF', 3) + E(116, 190, 84, 14, '#E8EAF6', 0)
    + [[80, 170], [140, 172], [110, 136]].map(([x, y], i) => g(x, y, 1, R(-30, -20, 60, 40, '#5D3A1A', 6, 3.5) + R(-30, -20, 60, 10, '#3E2116', 6, 3) + E(-12, -16, 10, 3, '#8D6E63', 0) + [[-14, 4], [8, 10], [16, -2], [-4, 12]].map(([a, b]) => E(a, b, 3, 1.5, '#8D6E63', 0)).join('') + (i === 2 ? face(0, 4, 0.3) : ''))).join('')
    + g(40, 200, 1, P('M-14 0c-4-10 6-14 10-8 4-8 14-6 14 2 8 0 8 10 0 10h-20c-6 0-8-4-4-4z', '#E0C38C', 2.5))),
  L('gb/york/landmark-roseberry.v1.svg', 'เนินโรสเบอร์รีท็อปปิงยอดแหว่ง', 'Roseberry Topping, the hill with a bite out of it', ['roseberry topping', 'เนินโรสเบอร์รีท็อปปิง', 'north york moors', 'ทุ่งนอร์ทยอร์กมัวร์', 'great ayton', 'เกรตแอยตัน', 'half cone hill', 'เนินยอดแหว่ง', 'hill walk', 'cleveland hills'], 'หาเนินเขาที่ด้านหนึ่งแหว่งเหมือนโดนกัด', 'Find the hill with one side bitten off',
    // a pointed hill like a cone with one side broken away into a steep rocky cliff, a path zigzagging up the green side, patchwork fields with hedges below and walkers on the path
    sky('#FFF8E1') + P('M20 170c30-30 60-120 104-130 10 20 18 26 20 40l8 50c20 20 40 30 92 40z', '#7CB342', 3.5) + P('M124 40c10 20 18 26 20 40l8 50-24-10-14-30z', '#A1887F', 3) + Lc('M130 70l6 20M136 104l4 14', '#8D6E63', 2)
    + P('M50 170c20-20 40-30 30-50 20-10 30-30 30-50', 'none', 2.5).replace('fill="none"', 'fill="none" stroke-dasharray="5 5"')
    + P('M-4 170h248v74H-4z', '#AED581', 0) + Lc('M-4 170h248M-4 206h248M60 170l-10 74M160 170l20 74', '#558B2F', 3)
    + face(90, 128, 0.32) + kid(78, 118, '#E53935', 0.55) + kid(104, 80, '#1E88E5', 0.5) + kid(30, 200, '#FFCA28', 0.8)),
  L('gb/york/landmark-studleyroyal.v1.svg', 'บ่อน้ำรูปพระจันทร์ในสวนน้ำสตัดลีย์รอยัล', 'The moon ponds of the Studley Royal Water Garden', ['studley royal water garden', 'สวนน้ำสตัดลีย์รอยัล', 'moon ponds', 'บ่อน้ำรูปพระจันทร์', 'fountains abbey', 'ฟาวน์เทนส์แอบบีย์', 'temple of piety', 'ศาลาเสาขาว', 'national trust garden', 'ripon'], 'หาบ่อน้ำรูปพระจันทร์ครึ่งเสี้ยว', 'Find the pond shaped like a crescent moon',
    // smooth green lawns with a round pond in the middle and two crescent-moon shaped ponds hugging it, a little white garden pavilion with columns at the end, tall trees all round
    sky('#E8F5E9') + tree(20, 90, 1.4, '#43A047') + tree(220, 92, 1.3, '#388E3C') + tree(60, 76, 1, '#66BB6A') + lawn(100, '#9CCC65')
    + R(90, 54, 60, 40, '#FFFFFF', 2, 3.5) + P('M84 56l36-22 36 22z', '#ECEFF1', 3) + [100, 114, 128, 142].map((x) => R(x - 3, 62, 6, 32, '#ECEFF1', 1, 2)).join('')
    + E(120, 168, 40, 26, '#4FC3F7', 3.5) + P('M60 140c-24 20-24 50 0 66-12-20-12-46 0-66z', '#4FC3F7', 3.5).replace('M60 140c-24 20-24 50 0 66-12-20-12-46 0-66z', 'M70 134c-30 18-30 50 0 70-8-24-8-46 0-70z') + P('M170 134c30 18 30 50 0 70 8-24 8-46 0-70z', '#4FC3F7', 3.5)
    + Lc('M110 160q5-4 10 0t10 0', '#E1F5FE', 2.5) + face(120, 166, 0.3) + kid(30, 226, '#E53935', 0.85) + kid(212, 226, '#7E57C2', 0.85)),

  // ---------- The Lake District
  L('gb/lakes/landmark-honister.v1.svg', 'เหมืองหินชนวนฮอนิสเตอร์กับการผ่าหินเป็นแผ่น', 'Splitting slate at the Honister Slate Mine', ['honister slate mine', 'เหมืองหินชนวนฮอนิสเตอร์', 'honister pass', 'ช่องเขาฮอนิสเตอร์', 'splitting slate', 'ผ่าหินชนวน', 'green slate', 'หินชนวนสีเขียว', 'mine tour', 'ทัวร์เหมือง'], 'หาแผ่นหินบางๆ ที่ช่างผ่าออกมา', 'Find the thin sheets of stone the miner splits off',
    // a dark mine tunnel entrance in a grey-green slate mountainside with a little rail track running out, a miner in a yellow helmet tapping a chisel to split a block into thin sheets, stacks of slates beside
    sky('#ECEFF1') + P('M-4 150L60 40l70 40 50-50 64 70v100H-4z', '#78909C', 3.5) + [[40, 90], [120, 100], [180, 70], [200, 120]].map(([x, y]) => Lc(`M${x} ${y}l30 6`, '#607D8B', 2.5)).join('')
    + P('M90 180v-50c0-30 60-30 60 0v50z', '#263238', 3.5) + Lc('M80 196l20-16M160 196l-20-16M100 186h40', '#8D6E63', 3) + lawn(180, '#A1887F')
    + g(60, 200, 1, R(-18, -8, 36, 22, '#607D8B', 2, 3) + Lc('M-18 2h36', '#455A64', 2)) + g(196, 210, 1, [0, 1, 2, 3].map((k) => R(-20, -6 - k * 6, 40, 6, '#546E7A', 1, 2)).join(''))
    + g(122, 214, 1, R(-12, -18, 24, 26, '#E65100', 6, 3) + C(0, -30, 11, '#FFE0BD', 3) + P('M-13-32c0-14 26-14 26 0z', '#FFEB3B', 2.5) + face(0, -28, 0.24) + Lc('M-10-10l-24 0M10-10l20-4', '#FFE0BD', 5) + Lc('M-34-10l-6-8', '#90A4AE', 3))
    + face(120, 150, 0.3)),
  L('gb/lakes/landmark-ashness.v1.svg', 'สะพานหินโค้งแอชเนสเหนือเดอร์เวนต์วอเตอร์', 'Ashness Bridge above Derwentwater', ['ashness bridge', 'สะพานแอชเนส', 'packhorse bridge', 'สะพานม้าต่าง', 'derwentwater', 'ทะเลสาบเดอร์เวนต์วอเตอร์', 'skiddaw', 'ภูเขาสกิดดอว์', 'stone bridge', 'mountain stream'], 'หาสะพานหินโค้งเล็กๆ เหนือลำธาร', 'Find the little humped stone bridge over the stream',
    // a little humped dry-stone bridge carrying a narrow lane over a tumbling mountain stream, a long lake below and a big rounded mountain behind, bracken-covered slopes either side
    sky('#E3F2FD') + P('M-4 100c40-50 100-70 160-60 40 6 70 30 88 60z', '#8D9A6A', 3.5) + P('M-4 110c80-10 168-10 248 0v20H-4z', '#4FC3F7', 3)
    + P('M-4 130c40 0 80 10 120 0s80-10 128 0v114H-4z', '#C77B3E', 3.5)
    + P('M120 244c-10-30-20-50-10-70 6-12 20-16 10-30', '#4FC3F7', 0) + Lc('M110 244c-10-30-16-56-4-72M134 244c-6-30-4-56 4-72', '#E1F5FE', 3)
    + P('M50 186c20-44 120-44 140 0v14H50z', '#A1958A', 3.5) + P('M96 200c0-24 48-24 48 0z', '#37474F', 3) + Lc('M60 172c30-26 90-26 120 0', '#8D8378', 2) + [[70, 178], [90, 166], [150, 166], [170, 178]].map(([x, y]) => R(x - 6, y - 4, 12, 7, '#B6AA9C', 2, 1.5)).join('')
    + face(120, 162, 0.24) + kid(160, 156, '#E53935', 0.7)),
  L('gb/lakes/landmark-stridingedge.v1.svg', 'เดินบนสันเขาแคบสไตรดิงเอดจ์ขึ้นเฮลเวลลิน', 'Walking the narrow Striding Edge up Helvellyn', ['striding edge', 'สันเขาสไตรดิงเอดจ์', 'helvellyn', 'ยอดเขาเฮลเวลลิน', 'knife edge ridge', 'สันเขาคมมีด', 'red tarn', 'ทะเลสาบเรดทาร์น', 'scramble', 'fell walk'], 'หาคนที่เดินเรียงแถวบนสันเขาแคบๆ', 'Find the walkers in a line along the narrow ridge',
    // a thin jagged rocky ridge like a saw blade curving up to a big rounded summit, a line of walkers balancing along its top, a round blue tarn deep in the valley below
    sky('#E8EAF6') + P('M140 60c30-20 70-14 104 4v120H120z', '#8D9A6A', 3.5)
    + P('M-4 150l20-20 10 6 12-14 10 8 12-16 10 10 14-14 12 8 12-12 14 10 12-16 14 10 16-30 28 0v140H-4z', '#90A4AE', 3.5) + P('M-4 150l20-20 10 6 12-14 10 8 12-16 10 10 14-14 12 8 12-12 14 10 12-16 14 10', 'none', 0)
    + E(180, 190, 36, 12, '#29B6F6', 3) + P('M-4 190c40-10 80-6 120 10v44H-4z', '#7CB342', 3)
    + [[40, 124, '#E53935'], [82, 112, '#FFCA28'], [124, 104, '#1E88E5'], [150, 92, '#43A047']].map(([x, y, c]) => kid(x, y, c, 0.6)).join('') + face(190, 120, 0.34)),
  L('gb/lakes/landmark-trigpoint.v1.svg', 'หลักหมุดสามเหลี่ยมบนยอดสกาเฟลล์ไพก์', 'Touching the trig point on Scafell Pike', ['trig point', 'หลักหมุดสามเหลี่ยม', 'triangulation pillar', 'หลักหมุดสำรวจ', 'scafell pike', 'ยอดสกาเฟลล์ไพก์', 'highest mountain in england', 'ภูเขาสูงที่สุดในอังกฤษ', 'summit cairn', 'peak bagging'], 'หาเสาคอนกรีตสีขาวบนยอดเขา', 'Find the white concrete pillar on the summit',
    // a short square white concrete pillar with a small brass plate on top standing among grey boulders on a mountain summit, a child reaching up to touch it, misty peaks and a lake far below
    sky('#E3F2FD') + P('M-4 150l40-30 40 20 50-40 50 30 68-20v40H-4z', '#B0BEC5', 3) + E(60, 150, 30, 6, '#64B5F6', 2) + P('M150 60c10-8 30-8 36 0 10-2 18 4 14 10h-56c-4-4 0-10 6-10z', '#FFFFFF', 2.5)
    + P('M-4 244V180c60-30 180-40 248-10v74z', '#90A4AE', 3.5) + [[30, 196], [70, 186], [180, 190], [210, 206], [140, 214], [50, 224]].map(([x, y]) => E(x, y, 16, 10, '#B0BEC5', 2.5)).join('')
    + P('M100 196l4-70h32l4 70z', '#FAFAFA', 3.5) + R(102, 120, 36, 8, '#ECEFF1', 2, 3) + C(120, 120, 5, '#FFCA28', 2) + Lc('M108 150h24', '#E0E0E0', 2) + face(120, 162, 0.3)
    + g(168, 212, 1, R(-10, -16, 20, 26, '#E53935', 5, 3) + C(0, -28, 10, '#FFE0BD', 3) + P('M-10-32c2-10 18-10 20 0z', '#1E88E5', 2.5) + face(0, -26, 0.22) + Lc('M-8-8l-18-26', '#FFE0BD', 5))),
  L('gb/lakes/landmark-gurning.v1.svg', 'ประกวดทำหน้าตลกผ่านปลอกคอม้าที่เอเกรอมอนต์', 'Gurning through a horse collar at Egremont Crab Fair', ['gurning', 'ประกวดทำหน้าตลก', 'egremont crab fair', 'งานเอเกรอมอนต์แครบแฟร์', 'funny faces', 'หน้าตลก', 'horse collar', 'ปลอกคอม้า', 'crab apples', 'oldest fair'], 'หาหน้าตลกที่โผล่ผ่านปลอกคอม้า', 'Find the funny face poking through the horse collar',
    // a grown-up pulling the silliest face, tongue out and eyes crossed, poking their head through a big padded horse collar, a basket of little red crab apples and bunting above
    sky('#FFF8E1') + Lc('M-4 30c60 24 188 24 248 0', INK, 2) + [20, 60, 100, 140, 180, 220].map((x, i) => { const y = 30 + 18 * Math.sin(Math.PI * (x + 4) / 248); return P(`M${x - 9} ${y}h18l-9 16z`, ['#E53935', '#FFCA28', '#1E88E5'][i % 3], 2); }).join('')
    + R(60, 176, 120, 68, '#5C6BC0', 14, 3.5)
    + P('M70 120c0-56 30-76 50-76s50 20 50 76c0 30-20 52-50 52s-50-22-50-52z', '#6D4C41', 4) + P('M84 122c0-40 20-60 36-60s36 20 36 60c0 22-14 38-36 38s-36-16-36-38z', '#FFE0BD', 3)
    + C(104, 104, 8, '#FFFFFF', 2.5) + C(134, 104, 8, '#FFFFFF', 2.5) + C(108, 106, 3.5, INK, 0) + C(130, 106, 3.5, INK, 0) + P('M98 132c10 10 34 10 44-4', 'none', 3) + P('M118 136c0 12 10 14 12 2', '#F06292', 2.5) + E(96, 122, 6, 4, '#FF8FA3', 0) + E(144, 122, 6, 4, '#FF8FA3', 0)
    + P('M77 120c0-48 26-68 43-68s43 20 43 68', 'none', 2).replace('fill="none" stroke-width="2"', 'fill="none" stroke="#D7B98E" stroke-width="2.5" stroke-dasharray="5 4"')
    + Lc('M64 168c-10-40-6-80 8-104M176 168c10-40 6-80-8-104', '#FFCA28', 6) + Lc('M64 168c-10-40-6-80 8-104M176 168c10-40 6-80-8-104', INK, 1.5) + C(72, 60, 7, '#FFCA28', 2.5) + C(168, 60, 7, '#FFCA28', 2.5)
    + P('M100 74c6-10 16-12 20-6 6-8 18-4 20 6-12-4-28-4-40 0z', '#FFB74D', 2.5)
    + g(206, 210, 1, P('M-24-10h48l-6 28h-36z', '#A1887F', 3) + [[-12, -14], [0, -18], [12, -14], [-6, -24], [8, -24]].map(([x, y]) => C(x, y, 6, '#D32F2F', 2)).join(''))),
];

export default { places: {}, items };
