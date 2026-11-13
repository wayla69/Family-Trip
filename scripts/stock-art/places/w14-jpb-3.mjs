// Wave 14, group jpb 3: Jeonju (+ Maisan, Daedunsan, Imsil, Byeonsan) — the hanok village's sea of curved roofs, Jeondong
// Cathedral, Omokdae, the Gyeonggijeon gate, the home of pansori and round fans. Buildings only, no portraits (Gyeonggijeon
// keeps a king's portrait: only its gate is drawn). Skipped as repeats or bans: bibimbap (Korea's stone-bowl one), makgeolli
// and moju (alcohol), choco pie (a brand), the Nambu night market, Jaman mural village (Gamcheon), hanji paper making (Bhutan
// and Laos), Pungnammun (Seoul's south gate), hanbok rental (Gyeongju), the lotus pond (many), jegichagi (Beijing's jianzi),
// yeot taffy (Istanbul, Canada), the Gochang dolmens (Ireland).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const JJ = { k1: '#00695C', k2: '#C62828', k3: '#FFF8E1' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `kr-jeonju.landmark.${slug}`, cat: 'landmark', file: `kr/jeonju/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// a Korean tiled roof: the eave sags in the middle and lifts at both tips, a ridge on top
const roof = (x, y, w, h, c = '#546E7A', sw) => P(`M${x - w} ${y - 8}Q${x} ${y + 6} ${x + w} ${y - 8}L${x + w * 0.62} ${y - h}H${x - w * 0.62}z`, c, sw);
// a hanok: white wall, brown posts, its roof
const hanok = (x, y, w, c, sw = 3) => R(x - w * 0.7, y, w * 1.4, w * 0.6, '#FFF8E1', 0, sw) + Lc(`M${x - w * 0.7} ${y}v${w * 0.6}M${x} ${y}v${w * 0.6}M${x + w * 0.7} ${y}v${w * 0.6}`, '#8D6E63', 2.5) + roof(x, y + 4, w, w * 0.55, c, sw);
// a child in hanbok: round head with a black bob, a short jacket, a wide skirt
const kid = (x, y, s, top, skirt) => g(x, y, s, P('M-26 40c4-30 12-46 26-46s22 16 26 46z', skirt) + P('M-16-4c2-10 8-14 16-14s14 4 16 14l-4 14h-24z', top) + Lc('M-6-12l6 10 6-10', '#E53935', 3)
  + C(0, -34, 18, '#FFE0B2') + P('M-18-36c0-14 8-20 18-20s18 6 18 20c-6-6-12-8-18-8s-12 2-18 8z', '#3E2723') + face(0, -32, 0.34));

const items = [
  { id: 'kr-jeonju.stamp', cat: 'stamp', file: 'kr/jeonju/stamp.v1.svg', name: nm('ตราประทับช็อนจู', 'Jeonju stamp'), kw: ['jeonju', 'ช็อนจู', 'jeonju hanok village', 'หมู่บ้านฮันอกช็อนจู', 'hanok', 'บ้านฮันอก', 'curved roof', 'หลังคาโค้ง', 'jeollabuk-do', 'ช็อลลาเหนือ'],
    // a little hanok house with a curved grey tiled roof, a lattice door and a round fan with a red-blue-yellow swirl behind it
    svg: cityStamp('kjj-st', { name: 'JEONJU', sub: 'KOREA', ...JJ, emblem: C(126, 72, 16, '#FFFFFF') + P('M126 56a16 16 0 0 1 0 32 8 8 0 0 1 0-16 8 8 0 0 0 0-16z', '#E53935', 2.5) + P('M126 56a16 16 0 0 0 0 32', '#1E88E5', 0) + Lc('M126 88v18', '#8D6E63', 4)
      + R(64, 104, 72, 34, '#FFF8E1') + Lc('M64 104v34M100 104v34M136 104v34', '#8D6E63', 3) + R(108, 112, 20, 20, '#FFFFFF', 0, 2.5) + Lc('M118 112v20M108 122h20', '#A1887F', 1.5) + roof(100, 108, 50, 30, '#546E7A') + Lc('M70 79h60', '#37474F', 4)
      + R(56, 138, 88, 6, '#BCAAA4', 0, 2.5) + face(82, 122, 0.3) }) },
  { id: 'kr-jeonju.day.roofs', cat: 'day', file: 'kr/jeonju/day-roofs.v1.svg', name: nm('ทะเลหลังคาฮันอกของหมู่บ้านช็อนจู', 'The sea of hanok roofs in Jeonju Hanok Village'), kw: ['jeonju hanok village', 'หมู่บ้านฮันอกช็อนจู', 'jeonju', 'ช็อนจู', 'hanok roofs', 'หลังคาบ้านฮันอก', 'traditional houses', 'บ้านแบบดั้งเดิม', 'view from the hill', 'วิวจากเนินเขา', 'evening', 'ยามเย็น'],
    // rows and rows of curved grey tiled roofs over white walls seen from a hill at golden evening, a few green trees between them and soft hills far away
    svg: scene('kjj-d1', '#FFE0B2', C(186, 54, 18, '#FFB74D', 0) + P('M-4 100c40-24 90-30 130-16 40-14 80-12 118 4v40H-4z', '#B0BEC5', 0)
      + [[116, [20, 92, 164, 236], 30], [162, [-12, 60, 132, 204], 36], [212, [24, 100, 176], 42]].map(([y, xs, w], r) => xs.map((x, k) => (k === 1 && r === 0 ? C(x, y - 4, 20, '#66BB6A') : hanok(x, y, w, r % 2 ? '#607D8B' : '#546E7A', 3))).join('')).join('')
      + face(100, 228, 0.34)) },
  { id: 'kr-jeonju.day.stream', cat: 'day', file: 'kr/jeonju/day-stream.v1.svg', name: nm('ลำธารช็อนจูช็อนกับสะพานมีหลังคา', 'The Jeonjucheon stream and its roofed bridge'), kw: ['jeonjucheon', 'ลำธารช็อนจูช็อน', 'namcheongyo', 'สะพานนัมช็อนกโย', 'roofed bridge', 'สะพานมีหลังคา', 'hanbyeokdang', 'ศาลาฮันบย็อกดัง', 'pavilion on the cliff', 'ศาลาบนหน้าผา', 'jeonju', 'ช็อนจู'],
    // a stream running across the picture, a long roofed pavilion bridge on round stone arches on the right, a small pavilion perched on a green rocky cliff on the left
    svg: scene('kjj-d2', '#B3E5FC', P('M-4 110c40-20 100-26 160-14s70 4 88 0v50H-4z', '#A5D6A7') + P('M-4 160h248v100H-4z', '#4FC3F7') + Lc('M20 200c10-5 20 5 30 0M80 220c10-5 20 5 30 0', '#E1F5FE', 4)
      + P('M-4 60c30 0 50 20 56 50s10 60 6 90H-4z', '#8D7B6B') + P('M-4 60c30 0 50 20 56 50-20-10-40-14-60-12z', '#66BB6A') + R(8, 88, 34, 22, 'none', 0, 3) + Lc('M12 88v22M38 88v22', '#C62828', 4) + roof(25, 90, 26, 16, '#546E7A') + R(4, 108, 42, 6, '#D7CCC8', 0, 3)
      + P('M84 160v-30h156v30h-14a18 18 0 0 0-36 0h-14a18 18 0 0 0-36 0h-14a18 18 0 0 0-36 0z', '#BDBDBD') + R(88, 116, 152, 14, '#FFF8E1', 0, 3) + Lc('M96 116v14M126 116v14M156 116v14M186 116v14M216 116v14', '#C62828', 3)
      + P('M74 122Q160 132 250 122L234 92H90z', '#546E7A') + Lc('M92 92h142', '#37474F', 5) + face(150, 146, 0.3)) },

  L('jeondong', 'มหาวิหารช็อนดง อิฐแดงกับโดมสีเขียว', 'Jeondong Cathedral, red brick with green domes', ['jeondong cathedral', 'มหาวิหารช็อนดง', 'red brick church', 'โบสถ์อิฐแดง', 'byzantine domes', 'โดมแบบไบแซนไทน์', 'romanesque arches', 'ซุ้มโค้งแบบโรมาเนสก์', 'jeonju landmark', 'แลนด์มาร์กช็อนจู'], 'หาโดมสีเขียวสามโดมบนยอดหอคอย', 'Find the three green domes on the towers',
    // a red-brick church front with grey stone bands, a tall central bell tower and two side towers each topped by a round grey-green dome, round-arched windows and doors
    bg('#E3F2FD') + low(196, '#C5E1A5') + frame + R(56, 116, 128, 80, '#C0583A') + R(62, 96, 26, 100, '#C0583A') + R(152, 96, 26, 100, '#C0583A') + R(96, 72, 48, 124, '#C0583A')
      + P('M62 98c0-16 6-24 13-24s13 8 13 24z', '#78A096') + P('M152 98c0-16 6-24 13-24s13 8 13 24z', '#78A096') + P('M96 74c0-22 12-32 24-32s24 10 24 32z', '#78A096') + Lc('M75 74v-10M165 74v-10M120 42V28', INK, 3)
      + Lc('M56 136h128M62 116h26M152 116h26M96 104h48', '#E0E0E0', 4) + [[66, 150], [156, 150]].map(([x, y]) => P(`M${x} ${y + 24}v-18a9 9 0 0 1 18 0v18z`, '#5D4037')).join('')
      + P('M108 196v-26a12 12 0 0 1 24 0v26z', '#5D4037') + P('M110 96v-6a10 10 0 0 1 20 0v6z', '#FFF8E1') + Lc('M60 180h4M70 166h6M168 178h6M100 186h4M140 158h4', '#A84630', 2) + face(120, 134, 0.36)),
  L('omokdae', 'ศาลาโอมกแดบนเนินเขา', 'Omokdae pavilion on its hill', ['omokdae', 'ศาลาโอมกแด', 'pavilion', 'ศาลา', 'hilltop pavilion', 'ศาลาบนเนิน', 'red pillars', 'เสาแดง', 'view over hanok village', 'จุดชมวิวหมู่บ้านฮันอก', 'stone steps', 'บันไดหิน'], 'หาบันไดหินที่ขึ้นไปหาศาลา', 'Find the stone steps up to the pavilion',
    // an open wooden pavilion with red pillars and a grey curved roof painted green underneath, standing on a stone base on a green hill, stone steps winding up between trees
    bg('#FFF8E1') + P('M16 150c30-24 60-34 104-34s80 10 104 34v74H16z', '#9CCC65', 0) + frame + Lc('M150 224c-10-20 0-40-20-60s-6-24-10-38', '#E0E0E0', 14) + Lc('M138 200h22M134 182h18M128 164h18M122 146h16', '#BDBDBD', 2)
      + R(58, 120, 124, 12, '#BCAAA4') + R(64, 104, 112, 6, '#8D6E63', 0, 3) + Lc('M72 76v44M104 76v44M136 76v44M168 76v44', '#C62828', 6) + R(64, 70, 112, 10, '#26A69A', 0, 3) + Lc('M70 75h100', '#FFCA28', 2)
      + roof(120, 76, 74, 34) + Lc('M76 42h88', '#37474F', 5) + [[34, 150], [206, 150], [40, 196], [196, 196]].map(([x, y]) => C(x, y, 16, '#558B2F', 3)).join('') + face(120, 126, 0.3, 'none') + face(120, 92, 0.34)),
  L('gyeonggijeon', 'ประตูใหญ่ของคย็องกีจ็อน', 'The red gate of Gyeonggijeon', ['gyeonggijeon', 'คย็องกีจ็อน', 'gyeonggijeon gate', 'ประตูคย็องกีจ็อน', 'three-door gate', 'ประตูสามบาน', 'red doors', 'ประตูสีแดง', 'taegeuk circles', 'วงกลมแทกึก', 'bamboo', 'ไผ่'], 'หาวงกลมสีแดงฟ้าบนบานประตู', 'Find the red and blue circles on the doors',
    // a gate building with three red doors each painted with a red-and-blue swirl circle, the middle roof raised above the two side roofs, thin green bamboo behind
    bg('#E8F5E9') + Lc('M30 30v150M44 40v140M196 30v150M210 40v140', '#81C784', 4) + low(186, '#D7CCC8') + frame
      + R(40, 126, 160, 60, '#FFF8E1') + [[64, 140], [120, 132], [176, 140]].map(([x, y]) => R(x - 18, y, 36, 186 - y, '#C62828', 0, 3) + C(x, y + (186 - y) / 2, 10, '#E53935', 2.5) + P(`M${x - 10} ${y + (186 - y) / 2}a10 10 0 0 0 20 0 5 5 0 0 1-10 0 5 5 0 0 0-10 0z`, '#1E88E5', 0) + Lc(`M${x} ${y}v${186 - y}`, '#8E1B1B', 2)).join('')
      + roof(64, 130, 40, 20) + roof(176, 130, 40, 20) + R(92, 112, 56, 20, '#FFF8E1', 0, 3) + roof(120, 114, 44, 26) + Lc('M94 88h52', '#37474F', 5) + face(120, 122, 0.3)),
  L('gaeksa', 'แกกซา เรือนรับรองแขกเก่าของช็อนจู', 'Gaeksa, Jeonju’s old guest hall', ['gaeksa', 'แกกซา', 'pungpaejigwan', 'พุงแพจีกวัน', 'guest house hall', 'เรือนรับรองแขก', 'old government building', 'อาคารราชการเก่า', 'big signboard', 'ป้ายใหญ่', 'wooden hall', 'อาคารไม้'], 'หาป้ายใหญ่สีเขียวใต้ชายคา', 'Find the big green signboard under the eaves',
    // a long wooden hall on a high stone platform, its middle roof raised above two lower wing roofs, a big blank green signboard with a gold border under the middle eaves, stone steps
    bg('#E1F5FE') + low(196, '#D7CCC8') + frame + R(26, 168, 188, 18, '#BDBDBD') + R(100, 186, 40, 6, '#E0E0E0', 0, 3) + R(108, 192, 24, 6, '#EEEEEE', 0, 3)
      + R(32, 130, 176, 38, '#FFF3E0') + Lc('M44 130v38M70 130v38M96 130v38M144 130v38M170 130v38M196 130v38', '#8D6E63', 4) + [[56, 140], [82, 140], [156, 140], [182, 140]].map(([x, y]) => R(x - 7, y, 14, 20, '#FFFFFF', 0, 2.5)).join('')
      + roof(52, 134, 38, 22, '#607D8B') + roof(188, 134, 38, 22, '#607D8B') + R(84, 116, 72, 14, '#FFF3E0', 0, 3) + roof(120, 118, 58, 34) + Lc('M88 84h64', '#37474F', 5)
      + R(98, 104, 44, 22, '#2E7D32', 2, 3) + R(102, 108, 36, 14, 'none', 0, 2) + Lc('M102 108h36v14h-36z', '#FFCA28', 2) + face(120, 152, 0.36)),
  L('taegeukfan', 'พัดกลมแทกึกซ็อนของช็อนจู', 'A taegeukseon, Jeonju’s round swirl fan', ['taegeukseon', 'แทกึกซ็อน', 'round fan', 'พัดกลม', 'jeonju fan', 'พัดช็อนจู', 'taegeuk swirl', 'ลายวนแทกึก', 'hanji paper', 'กระดาษฮันจี', 'craft', 'งานฝีมือ'], 'หาลายวนสามสีบนพัด', 'Find the three-colour swirl on the fan',
    // a big round paper fan on a long wooden handle, painted with a three-colour red, blue and yellow swirl, fine bamboo ribs fanning out and a red tassel hanging from the handle
    C(120, 98, 70, '#FFFFFF') + Lc('M120 98l0-68M120 98l48-48M120 98l68 0M120 98l48 48M120 98l-48-48M120 98l-68 0M120 98l-48 48', '#ECEFF1', 2)
      + g(120, 98, 1, P('M0-56a56 56 0 0 1 48.5 28 28 28 0 0 0-48.5 0 28 28 0 0 1 0-28z', '#E53935', 3) + P('M48.5-28a56 56 0 0 1-48.5 84 28 28 0 0 0 0-56 28 28 0 0 1 48.5-28z', '#1E88E5', 3) + P('M0 56a56 56 0 0 1 0-112 28 28 0 0 0 0 56 28 28 0 0 1 0 56z', '#FDD835', 3), 30)
      + C(120, 98, 70, 'none') + R(114, 166, 12, 52, '#8D6E63', 4) + C(120, 222, 5, '#FFCA28', 2.5) + Lc('M120 226c-6 6-6 12-2 16M120 226c6 6 6 12 2 16', '#E53935', 4) + face(92, 132, 0.3)),
  L('maisan', 'ภูเขามาอีซันรูปหูม้ากับเจดีย์หินกองซ้อน', 'Maisan, the horse-ear mountain, and its piled stone towers', ['maisan', 'ภูเขามาอีซัน', 'horse ear mountain', 'ภูเขาหูม้า', 'tapsa', 'วัดทับซา', 'stacked stone towers', 'หอหินกองซ้อน', 'twin peaks', 'ยอดเขาคู่', 'jinan', 'ชีนัน'], 'หาหอหินที่กองซ้อนกันเป็นยอดแหลม', 'Find the stone towers piled up into points',
    // two tall rounded rock peaks standing side by side like a horse's ears, trees at their feet, a blue lake in front and three little pointed towers of piled stones on the shore
    bg('#E3F2FD') + P('M50 170c-4-50 6-110 30-128 18 16 26 60 22 128zM132 170c-2-46 10-96 34-110 16 14 22 56 16 110z', '#A1887F') + Lc('M64 120c6-20 12-40 18-54M146 120c6-20 10-36 16-46', '#8D6E63', 3)
      + P('M76 50c4 10 10 20 14 32M158 66c4 8 8 16 10 26', 'none') + P('M16 158c40-10 80-12 104-12s70 2 104 12v20H16z', '#66BB6A', 0) + low(176, '#4FC3F7') + frame
      + [[40, 176, 1], [64, 180, 0.8], [196, 178, 0.9]].map(([x, y, s]) => g(x, y, s, E(0, -6, 16, 6, '#BDBDBD', 3) + E(0, -16, 12, 5, '#CFD8DC', 3) + E(0, -25, 9, 4, '#BDBDBD', 3) + E(0, -33, 6, 3, '#CFD8DC', 3) + P('M-3-36l3-10 3 10z', '#BDBDBD', 3))).join('')
      + Lc('M100 200c10-4 20 4 30 0M150 210c10-4 20 4 30 0', '#E1F5FE', 4) + face(78, 120, 0.32) + face(162, 120, 0.3)),
  L('samseon', 'บันไดเหล็กแดงสัมซ็อนที่ภูเขาแดดุนซัน', 'The steep red Samseon stairway on Daedunsan', ['daedunsan', 'ภูเขาแดดุนซัน', 'samseon stairs', 'บันไดสัมซ็อน', 'steep stairway', 'บันไดชัน', 'granite peaks', 'ยอดหินแกรนิต', 'autumn leaves', 'ใบไม้เปลี่ยนสี', 'mountain climb', 'ปีนเขา'], 'หาบันไดสีแดงที่ชันมาก', 'Find the very steep red stairway',
    // two tall pale granite rock spires with autumn trees, a narrow red iron stairway climbing very steeply up the gap from one rock to the other
    bg('#E8EAF6') + P('M30 224c-4-60 10-150 40-170 24 20 30 110 26 170zM144 224c-6-70 6-150 34-176 30 26 38 110 30 176z', '#D7CCC8') + Lc('M52 110c4 20 4 40 2 60M170 100c4 24 6 50 2 80', '#BCAAA4', 3)
      + [[30, 84, '#E53935'], [100, 60, '#FFA726'], [214, 70, '#E53935'], [20, 150, '#FFB300'], [216, 150, '#FF7043'], [104, 210, '#E53935']].map(([x, y, c]) => C(x, y, 14, c, 3)).join('') + frame
      + P('M92 200l60-130h10l-60 130z', '#E53935') + Lc('M96 190l60-130M106 192l60-130', '#B71C1C', 3) + Lc('M100 184h10M106 170h10M112 156h10M118 142h10M124 128h10M130 114h10M136 100h10M142 86h10', '#FFCDD2', 3) + face(60, 160, 0.4)),
  L('imsilcheese', 'ชีสยืดของหมู่บ้านชีสอิมชิล', 'Stretchy cheese from Imsil Cheese Village', ['imsil cheese', 'ชีสอิมชิล', 'imsil cheese village', 'หมู่บ้านชีสอิมชิล', 'mozzarella', 'มอซซาเรลลา', 'stretchy cheese', 'ชีสยืด', 'cheese making', 'ทำชีส', 'cheese pizza', 'พิซซ่าชีส'], 'หาเส้นชีสที่ยืดยาวจากพิซซ่า', 'Find the long cheese string pulled from the pizza',
    // a soft white ball of fresh cheese on a wooden board with a long ribbon of it being stretched up, and a pizza slice beside it pulling long strings of melted cheese
    E(110, 196, 90, 18, '#D7A86E') + Lc('M30 200c50 8 110 8 160 0', '#C8955A', 3) + C(80, 168, 32, '#FFFDF5') + E(70, 156, 10, 6, '#FFFFFF', 0) + face(80, 170, 0.42)
      + ol('M104 152c20-20 10-50 30-70s14-24 8-34', '#FFFDF5', 10) + ol('M142 48l8-30M136 46l4-28M148 50l12-28', '#B0BEC5', 3) + P('M144 196l46-84c14 8 26 20 32 34z', '#FFB74D') + P('M152 182l38-68c10 6 20 14 26 24z', '#FFE082', 0)
      + [[176, 150], [194, 136], [184, 172]].map(([x, y]) => C(x, y, 6, '#E53935', 2.5)).join('') + ol('M196 130c-6-20 2-36-6-52M206 136c4-18 0-30 6-44', '#FFF59D', 4)),
  L('pansori', 'พันโซรี การร้องเล่าเรื่องกับกลองบุก', 'Pansori, a story sung to the beat of a barrel drum', ['pansori', 'พันโซรี', 'story singing', 'การร้องเล่าเรื่อง', 'buk drum', 'กลองบุก', 'korean traditional music', 'ดนตรีพื้นเมืองเกาหลี', 'straw mat', 'เสื่อฟาง', 'jeonju sori festival', 'เทศกาลโซรีช็อนจู'], 'หากลองบุกที่วางอยู่บนเสื่อ', 'Find the barrel drum on the mat',
    // a child storyteller in a white jacket and jade skirt singing with a folded fan raised high, a fat round barrel drum with a stick on the straw mat beside her
    E(120, 204, 96, 16, '#E6CF8B') + Lc('M40 204h160M50 198h140M50 210h140', '#C8AE6A', 2) + kid(88, 150, 1.25, '#FFFFFF', '#26A69A') + ol('M118 130l10-24', '#FFE0B2', 6) + P('M128 106l-26-30a40 40 0 0 1 52-4z', '#FFF8E1', 3) + Lc('M128 106l-18-30M128 106l-4-38M128 106l10-36M128 106l20-30', '#D7CCC8', 1.5)
      + Lc('M64 134c-10 6-14 16-12 26', '#FFE0B2', 8) + E(170, 168, 28, 26, '#C62828') + E(158, 168, 9, 24, '#E57373', 3) + Lc('M178 146v44M190 150v36', '#8E1B1B', 2) + ol('M196 140l20-26', '#D7B48A', 4)),
  L('tteokgalbi', 'ต็อกกัลบี เนื้อซี่โครงสับย่าง', 'Tteokgalbi, grilled patties of minced short rib', ['tteokgalbi', 'ต็อกกัลบี', 'grilled short rib patties', 'เนื้อซี่โครงสับย่าง', 'pine nuts', 'เมล็ดสน', 'korean bbq', 'บาร์บีคิวเกาหลี', 'jeonju street food', 'อาหารริมทางช็อนจู'], 'หาเมล็ดสนเล็กๆ บนเนื้อย่าง', 'Find the little pine nuts on the patties',
    // three glossy brown rounded-square patties of grilled minced beef with grill stripes on a white plate with lettuce, sprinkled with pine nuts and green onion
    E(120, 160, 104, 42, '#FFFFFF') + E(120, 158, 92, 34, '#FAFAFA', 3) + P('M34 158c10-24 30-30 50-24-4 12-20 26-50 24zM206 158c-10-24-30-30-50-24 4 12 20 26 50 24z', '#9CCC65')
      + [[76, 150, -8], [120, 140, 0], [164, 150, 8]].map(([x, y, r]) => g(x, y, 1, R(-26, -18, 52, 36, '#8D4E2A', 12) + Lc('M-16-14l-6 28M-2-14l-6 28M12-14l-6 28', '#5D2E14', 3) + [[-10, -6], [6, -2], [14, 8]].map(([a, b]) => E(a, b, 3, 2, '#FFF3D6', 1.5)).join('') + Lc('M-14 6l4-2M2 10l4-2', '#7CB342', 3), r)).join('')
      + face(120, 140, 0.34)),
  L('hanokstay', 'นอนบนพื้นอุ่นในบ้านฮันอก', 'Sleeping on the warm floor of a hanok guesthouse', ['hanok stay', 'นอนบ้านฮันอก', 'ondol floor', 'พื้นอุ่นอนดล', 'yo mattress', 'ฟูกนอนพื้น', 'lattice paper door', 'ประตูกระดาษลายตาราง', 'hanok guesthouse', 'เกสต์เฮาส์ฮันอก', 'traditional room', 'ห้องแบบดั้งเดิม'], 'หาประตูกระดาษลายตาราง', 'Find the lattice paper door',
    // a cosy hanok room: a warm yellow oiled-paper floor, a sliding door of white paper on a wooden lattice, a soft mattress with a bright patchwork quilt and a smiling pillow, a low table
    bg('#FFF8E1') + low(150, '#F2C46C') + frame + R(28, 32, 90, 112, '#FFFFFF') + Lc('M58 32v112M88 32v112M28 60h90M28 88h90M28 116h90', '#A1887F', 3) + R(132, 40, 80, 104, '#EFE3CF', 0, 3)
      + P('M46 196l30-38h130l-14 38z', '#FFFFFF') + P('M76 158h66l-14 38H46z', '#E57373') + P('M142 158h64l-14 38h-64z', '#4DB6AC') + Lc('M110 158l-14 38M174 158l-14 38', '#FFCA28', 3)
      + E(196, 152, 22, 12, '#FFF59D') + face(196, 150, 0.28) + R(150, 112, 50, 8, '#8D6E63', 3) + Lc('M156 120v14M194 120v14', '#8D6E63', 4)),
  L('hwajeon', 'ฮวาจ็อน ขนมแป้งข้าวแปะดอกอะซาเลีย', 'Hwajeon, rice cakes topped with azalea petals', ['hwajeon', 'ฮวาจ็อน', 'flower rice cake', 'ขนมแป้งข้าวดอกไม้', 'azalea petals', 'กลีบดอกอะซาเลีย', 'spring sweet', 'ขนมฤดูใบไม้ผลิ', 'honey', 'น้ำผึ้ง', 'pan-fried', 'จี่ในกระทะ'], 'หากลีบดอกไม้สีชมพูบนขนม', 'Find the pink flower petals on the cakes',
    // a dark pan of little round white rice cakes, each with a pink azalea flower and two green leaves pressed on top, a little bowl of golden honey
    E(110, 150, 92, 52, '#455A64') + E(110, 146, 82, 44, '#607D8B', 0) + ol('M196 138l30-14', '#5D4037', 6)
      + [[70, 130], [112, 122], [152, 134], [86, 166], [132, 168]].map(([x, y]) => E(x, y, 22, 14, '#FFFDF5') + [0, 72, 144, 216, 288].map((a) => g(x, y - 1, 1, E(0, -6, 4, 6, '#F06292', 1.5), a)).join('') + C(x, y - 1, 2.5, '#FFEB3B', 0) + E(x + 12, y + 3, 5, 2.5, '#66BB6A', 0)).join('')
      + P('M176 196h40c0 12-8 18-20 18s-20-6-20-18z', '#FFFFFF') + E(196, 196, 20, 5, '#FFB300') + face(112, 124, 0.26)),
  L('sago', 'ช็อนจูซาโก หอเก็บบันทึกหลวงสองชั้น', 'Jeonju Sago, the two-storey royal archive', ['jeonju sago', 'ช็อนจูซาโก', 'royal archive', 'หอเก็บบันทึกหลวง', 'annals of the joseon dynasty', 'บันทึกราชวงศ์โชซ็อน', 'two-storey wooden hall', 'อาคารไม้สองชั้น', 'raised on pillars', 'ยกพื้นบนเสา', 'gyeonggijeon grounds', 'ในบริเวณคย็องกีจ็อน'], 'หาเสาแดงใต้ชั้นบนที่ยกสูง', 'Find the red pillars under the raised upper floor',
    // a wooden hall raised high on a row of red pillars over an open ground floor, its closed upper storey with latticed windows under a big grey curved roof, a low wall and a pine beside it
    bg('#E8F5E9') + low(190, '#D7CCC8') + frame + R(40, 182, 160, 10, '#BDBDBD', 0, 3) + Lc('M60 182v-62M93 182v-62M127 182v-62M160 182v-62M180 182v-62', '#C62828', 6) + R(52, 176, 136, 6, '#E0E0E0', 0, 2.5)
      + R(48, 108, 144, 14, '#8D6E63') + R(54, 72, 132, 36, '#F3E1C0') + Lc('M54 72v36M98 72v36M142 72v36M186 72v36', '#8D6E63', 4) + [[76, 80], [164, 80]].map(([x, y]) => R(x - 12, y, 24, 20, '#FFFFFF', 0, 2.5) + Lc(`M${x} ${y}v20M${x - 12} ${y + 10}h24M${x - 6} ${y}v20M${x + 6} ${y}v20`, '#A1887F', 1.5)).join('')
      + roof(120, 76, 86, 38) + Lc('M74 40h92', '#37474F', 5) + Lc('M206 190v-50', '#6D4C41', 6) + P('M184 150c10-14 34-14 44 0-14 6-30 6-44 0zM190 132c8-12 26-12 34 0-12 5-22 5-34 0z', '#2E7D32') + face(120, 92, 0.38)),
  L('dancheong', 'ทันช็อง ลายสีใต้ชายคา', 'Dancheong, the painted colours under the eaves', ['dancheong', 'ทันช็อง', 'painted eaves', 'ชายคาทาสี', 'rafter ends', 'ปลายกลอนหลังคา', 'green red blue patterns', 'ลายเขียวแดงน้ำเงิน', 'flower patterns', 'ลายดอกไม้', 'hanok roof', 'หลังคาฮันอก'], 'หาปลายกลอนรูปดอกไม้สีส้ม', 'Find the orange flower on a rafter end',
    // looking up under a grey tiled roof: rows of round rafter ends and beams painted jade green with red, blue, white and orange flower patterns
    bg('#E1F5FE') + P('M16 30h208v40c-60 14-150 14-208 0z', '#546E7A', 0) + Lc('M16 52c60 12 150 12 208 0', '#37474F', 4) + frame
      + [30, 58, 86, 114, 142, 170, 198].map((x) => C(x + 6, 90, 12, '#26A69A') + C(x + 6, 90, 7, '#FFFFFF', 0) + C(x + 6, 90, 4, x === 114 ? '#FF7043' : '#E53935', 0)).join('')
      + R(20, 108, 200, 26, '#26A69A') + [44, 92, 140, 188].map((x) => g(x, 121, 1, [0, 60, 120, 180, 240, 300].map((a) => g(0, 0, 1, E(0, -6, 3.5, 6, '#FFFFFF', 1.5), a)).join('') + C(0, 0, 3, '#FF7043', 1.5))).join('') + Lc('M20 112h200M20 130h200', '#E53935', 3)
      + R(20, 140, 200, 22, '#1E88E5') + Lc('M30 151h20M70 151h20M110 151h20M150 151h20M190 151h20', '#FFF59D', 4) + R(20, 168, 200, 16, '#C62828') + Lc('M20 194h200', '#26A69A', 10) + face(120, 92, 0.24, 'none') + face(68, 151, 0.3)),
  L('chaeseokgang', 'ผาแชซ็อกกังที่ซ้อนเป็นชั้นเหมือนหนังสือ', 'Chaeseokgang, the cliffs stacked like books at Byeonsan', ['chaeseokgang', 'ผาแชซ็อกกัง', 'byeonsan peninsula', 'คาบสมุทรพย็อนซัน', 'layered cliffs', 'หน้าผาเป็นชั้น', 'stacked like books', 'ซ้อนเหมือนหนังสือ', 'rocky shore', 'ชายฝั่งหิน', 'buan', 'พูอัน'], 'หาชั้นหินที่ซ้อนกันเหมือนกองหนังสือ', 'Find the rock layers stacked like a pile of books',
    // a sea cliff made of hundreds of thin flat rock layers stacked like a pile of books in browns and greys, a flat rocky shelf at its foot and blue sea washing in
    bg('#FFE0B2') + C(190, 60, 16, '#FFB74D', 0) + low(160, '#4FC3F7') + frame + P('M16 60c30-6 60-4 90 6 20 6 30 30 36 60l8 50H16z', '#A1887F')
      + Array.from({ length: 13 }, (_, k) => Lc(`M16 ${70 + k * 8}c40 ${-2 + (k % 3)} 80 ${(k % 2) * 4} ${110 + k * 2.4} 0`, k % 2 ? '#8D6E63' : '#BCAAA4', 3)).join('') + P('M16 176h150c10 0 20 6 24 12H16z', '#8D7B6B')
      + Lc('M30 206c10-5 20 5 30 0M140 206c10-5 20 5 30 0', '#E1F5FE', 4) + face(78, 128, 0.42)),
  L('hyanggyo', 'ช็อนจูฮยังกโยกับต้นแปะก๊วยยักษ์', 'Jeonju Hyanggyo and its giant ginkgo trees', ['jeonju hyanggyo', 'ช็อนจูฮยังกโย', 'confucian school', 'โรงเรียนขงจื๊อโบราณ', 'old school hall', 'อาคารเรียนเก่า', 'giant ginkgo', 'ต้นแปะก๊วยยักษ์', 'yellow leaves', 'ใบไม้สีเหลือง', 'autumn', 'ฤดูใบไม้ร่วง'], 'หาใบแปะก๊วยรูปพัดสีเหลืองบนพื้น', 'Find a yellow fan-shaped leaf on the ground',
    // an old school hall with red pillars and a grey roof in a courtyard, two huge golden ginkgo trees in front of it and a carpet of yellow fan-shaped leaves on the ground
    bg('#E3F2FD') + low(184, '#FFE082') + frame + R(70, 122, 100, 40, '#FFF3E0') + Lc('M80 122v40M110 122v40M130 122v40M160 122v40', '#C62828', 4) + roof(120, 126, 66, 30) + Lc('M84 98h72', '#37474F', 5) + R(62, 162, 116, 10, '#BDBDBD', 0, 3)
      + [[40, 120], [200, 120]].map(([x, y]) => R(x - 6, y + 20, 12, 60, '#6D4C41', 0, 3) + C(x, y - 6, 32, '#FFD54F') + C(x - 18, y + 10, 18, '#FFCA28') + C(x + 18, y + 10, 18, '#FFCA28')).join('')
      + [[60, 200], [96, 210], [140, 196], [176, 208], [120, 216], [30, 210]].map(([x, y], k) => g(x, y, 1, P('M0 0l-9-10c4-4 14-4 18 0z', '#FFC107', 2), k * 40)).join('') + face(120, 144, 0.34)),
  L('kongnamulgukbap', 'คงนามุลกุกบับ ซุปถั่วงอกกับข้าวในหม้อดิน', 'Kongnamul gukbap, bean sprout soup with rice in a clay pot', ['kongnamul gukbap', 'คงนามุลกุกบับ', 'bean sprout soup', 'ซุปถั่วงอก', 'clay pot', 'หม้อดินทุกแพกี', 'soft egg', 'ไข่ลวก', 'jeonju breakfast', 'อาหารเช้าช็อนจู', 'seaweed', 'สาหร่าย'], 'หาไข่ลวกในถ้วยเล็กข้างหม้อ', 'Find the soft egg in the little cup by the pot',
    // a black clay pot of steaming clear soup heaped with yellow-headed bean sprouts and green onion, a small white cup beside it with a soft egg and a few seaweed flakes
    P('M38 120h132c0 50-22 80-66 80s-66-30-66-80z', '#37474F') + E(104, 120, 66, 14, '#FFF8E1') + Lc('M44 132c20 6 100 6 120 0', '#546E7A', 3)
      + Array.from({ length: 11 }, (_, k) => { const x = 60 + k * 9; return Lc(`M${x} 120c${-4 + (k % 3) * 4}-10 ${(k % 2) * 6}-20 ${2 - (k % 2) * 4}-28`, '#FFFDF5', 3) + C(x + 2 - (k % 2) * 4, 92 + (k % 3) * 2, 3.5, '#FFEB3B', 1.5); }).join('')
      + [[72, 114], [128, 112], [100, 116]].map(([x, y]) => C(x, y, 4, '#7CB342', 1.5)).join('') + Lc('M80 70c-6-10 6-16 0-26M120 66c-6-10 6-16 0-26', '#CFD8DC', 4)
      + P('M168 166h50c0 20-10 30-25 30s-25-10-25-30z', '#FFFFFF') + E(193, 166, 25, 6, '#FFF8E1') + C(193, 166, 8, '#FFC107', 2) + P('M176 162l6-4M206 160l4 4', '#263238', 3) + face(104, 160, 0.46)),
];

export default {
  places: {
    'kr-jeonju': { country: 'kr', wave: 3, name: nm('ช็อนจู', 'Jeonju'), tz: 'Asia/Seoul', ll: [35.82, 127.15], alias: ['jeonju', 'ช็อนจู', 'จอนจู', '전주', 'jeonju hanok village', 'หมู่บ้านฮันอกช็อนจู', 'maisan', 'มาอีซัน', 'daedunsan', 'แดดุนซัน', 'imsil', 'อิมชิล', 'byeonsan', 'พย็อนซัน', 'jeollabuk-do', 'jeonbuk'], colors: JJ },
  },
  items,
};
