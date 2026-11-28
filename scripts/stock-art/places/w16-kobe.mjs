// Wave 16: Kobe (+ Himeji, Arima, Akashi, Awaji) — the port city between Mount Rokko and the sea, until now a side alias of Hiroshima.
// Himeji goes with Kobe: it is in Hyogo, 35 minutes from Kobe by JR, and families visit it from Kobe and Osaka.
// New subjects only: the BE KOBE sign, the Fish Dance, the Uroko House, Luminarie, Nunobiki Falls, the Port Liner, Akashi's octopus,
// akashiyaki, Arima's spring-water wafers, Himeji's ekisoba, oden and almond toast, Kobe pudding, the Suma orca, Awaji onions,
// miso gyoza, the Rokko music box museum.
// Skipped because Hiroshima's pictures already draw them: Port Tower, the Weathercock House, Kobe beef, the Rokko Shidare Observatory,
// sobameshi, the Maritime Museum, Himeji Castle. Skipped as repeats or bans: Nankinmachi (Singapore's Chinatown), the brick warehouses
// (Yokohama), Mount Maya's night view (Hakodate), Arima's hot springs, the Harborland wheel, Ikuta shrine, the earthquake memorial,
// Rokko's mountain pasture (sheep are drawn in the Cotswolds and Zermatt), Akashi's meridian clock (London's meridian).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const KB = { k1: '#00838F', k2: '#D84315', k3: '#E0F7FA' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `jp-kobe.landmark.${slug}`, cat: 'landmark', file: `jp/kobe/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// little waves
const waves = (pts, c = '#E1F5FE') => Lc(pts.map(([x, y]) => `M${x} ${y}c8-4 16 4 24 0`).join(''), c, 4);

const items = [
  { id: 'jp-kobe.stamp', cat: 'stamp', file: 'jp/kobe/stamp.v1.svg', name: nm('ตราประทับโกเบและฮิเมจิ', 'Kobe and Himeji stamp'), kw: ['kobe', 'โกเบ', 'himeji', 'ฮิเมจิ', 'port city', 'เมืองท่า', 'mount rokko', 'ภูเขารกโกะ', 'anchor', 'สมอเรือ', 'hyogo', 'เฮียวโงะ'],
    // the green mountain above the harbour with Kobe's big glowing anchor on its slope, the blue sea below with a little boat
    svg: cityStamp('jkb-st', { name: 'KOBE', sub: 'HIMEJI · JAPAN', ...KB, emblem: P('M48 112c12-34 30-52 52-52s40 18 52 52z', '#81C784', 0) + P('M48 112c16-18 30-24 44-20-14 6-26 12-44 20z', '#66BB6A', 0)
      + C(100, 70, 4.5, 'none') + Lc('M100 75v24M92 81h16', '#FFD54F', 3.5) + Lc('M88 92q12 14 24 0', '#FFD54F', 3.5) + Lc('M88 92l-3-5M112 92l3-5', '#FFD54F', 3)
      + P('M48 112h104a52 52 0 0 1-104 0z', '#4FC3F7', 0) + P('M84 124h32l-5 8H89z', '#FFFFFF') + R(96, 116, 8, 8, '#E53935', 0, 2.5)
      + Lc('M60 136c6-3 12 3 18 0M122 140c6-3 12 3 18 0', '#E1F5FE', 2.5) + face(124, 98, 0.26, 'none') }) },
  { id: 'jp-kobe.day.harbour', cat: 'day', file: 'jp/kobe/day-harbour.v1.svg', name: nm('โกเบระหว่างภูเขารกโกะกับทะเล', 'Kobe between Mount Rokko and the sea'), kw: ['kobe', 'โกเบ', 'kobe harbour', 'ท่าเรือโกเบ', 'mount rokko', 'ภูเขารกโกะ', 'harborland', 'ฮาร์เบอร์แลนด์', 'meriken park', 'สวนเมริเก็น', 'port city', 'เมืองท่า', 'ferry', 'เรือเฟอร์รี'],
    // the long green ridge of Mount Rokko behind a thin strip of colourful buildings, the red hourglass tower and a green park on the quay, a smiling ferry on the blue harbour
    svg: scene('jkb-d1', '#B3E5FC', C(52, 52, 16, '#FFE082', 0) + P('M-4 112c26-36 56-52 90-40 28-26 64-32 96-14 22-8 44-4 62 8v50H-4z', '#66BB6A') + P('M-4 124c40-20 80-22 120-12 40-12 90-10 128 4v20H-4z', '#81C784')
      + [[4, 120, 18, 24, '#FFFFFF'], [24, 112, 14, 32, '#FFCC80'], [40, 124, 20, 20, '#90CAF9'], [62, 116, 14, 28, '#FFFFFF'], [78, 108, 16, 36, '#CE93D8'], [96, 122, 20, 22, '#FFF59D'],
        [184, 118, 16, 26, '#FFFFFF'], [202, 110, 14, 34, '#90CAF9'], [218, 122, 22, 22, '#FFCC80']].map(([x, y, w, h, c]) => R(x, y, w, h, c, 0, 3)).join('')
      + P('M126 146q8-22 0-50h18q-8 28 0 50z', '#E53935') + Lc('M128 112h14M128 128h14', '#FFCDD2', 2.5) + R(132, 88, 6, 8, '#E53935', 0, 3)
      + R(150, 126, 14, 18, '#FFF59D', 0, 3) + C(172, 136, 9, '#43A047', 3) + R(170, 136, 4, 10, '#8D6E63', 0, 2)
      + R(-4, 144, 248, 10, '#BDBDBD', 0, 3) + R(-4, 154, 248, 100, '#29B6F6')
      + P('M70 196h84l-12 18H82z', '#FFFFFF') + R(84, 180, 54, 16, '#FFFFFF', 4) + R(122, 168, 9, 12, '#00838F', 0, 3) + Lc('M92 188h8M106 188h8M120 188h8', '#90CAF9', 3) + face(112, 204, 0.24, 'none')
      + waves([[20, 172], [180, 176], [30, 222], [170, 218]])) },
  { id: 'jp-kobe.day.akashibridge', cat: 'day', file: 'jp/kobe/day-akashibridge.v1.svg', name: nm('สะพานอากาชิไคเกียวข้ามไปเกาะอาวาจิ', 'The Akashi Kaikyō Bridge to Awaji Island'), kw: ['akashi kaikyo bridge', 'สะพานอากาชิไคเกียว', 'akashi strait', 'ช่องแคบอากาชิ', 'suspension bridge', 'สะพานแขวน', 'awaji island', 'เกาะอาวาจิ', 'maiko', 'ไมโกะ', 'sunset', 'พระอาทิตย์ตก', 'akashi', 'อากาชิ'],
    // a long white suspension bridge with two tall towers and swooping cables across the strait to green Awaji Island, an orange sunset, a little ship sailing under the deck
    svg: scene('jkb-d2', '#FFE0B2', C(120, 96, 26, '#FFB74D', 0) + P('M-4 70h248v10H-4z', '#FFCC80', 0) + P('M150 140c20-18 50-24 94-20v24h-94z', '#81C784')
      + R(-4, 140, 248, 120, '#4FC3F7') + Lc('M110 152h20M100 160h40', '#FFE0B2', 3)
      + R(64, 52, 10, 92, '#FFFFFF') + R(166, 52, 10, 92, '#FFFFFF') + Lc('M64 72h10M64 96h10M64 120h10M166 72h10M166 96h10M166 120h10', '#B0BEC5', 3)
      + ol('M-4 112Q34 92 69 54Q120 158 171 54Q206 92 244 112', '#ECEFF1', 3)
      + Lc('M86 79v53M103 94v38M120 100v32M137 94v38M154 79v53M20 98v34M44 80v52M196 80v52M220 98v34', '#B0BEC5', 2)
      + R(-4, 132, 248, 9, '#ECEFF1', 0, 3)
      + P('M80 188h72l-10 14H90z', '#FFFFFF') + R(96, 176, 36, 12, '#E53935', 3) + Lc('M104 182h6M116 182h6', '#FFCDD2', 2.5) + face(116, 194, 0.22, 'none')
      + waves([[20, 172], [176, 180], [40, 214], [160, 218]])) },

  L('bekobe', 'ป้าย BE KOBE ริมท่าเรือ', 'The BE KOBE sign by the harbour', ['be kobe', 'บีโกเบ', 'be kobe sign', 'ป้ายบีโกเบ', 'meriken park', 'สวนเมริเก็น', 'harbour sign', 'ป้ายริมท่าเรือ', 'white letters', 'ตัวอักษรสีขาว', 'photo spot', 'จุดถ่ายรูป'], 'หาตัว O ที่ยิ้มอยู่ในป้าย', 'Find the smiling O in the sign',
    // big white letters B E K O B E standing on a pale stone base by the sea, the O smiling, a seagull flying over the blue water
    bg('#E1F5FE') + P('M16 110h208v40H16z', '#4FC3F7', 0) + low(150, '#CFD8DC') + frame + R(24, 150, 192, 14, '#ECEFF1', 4)
      + g(120, 122, 0.82, ol('M-110-25v50M-110-25h10a11 11 0 0 1 0 23h-10M-110-2h12a13 13 0 0 1 0 27h-12', '#FFFFFF', 9)
        + ol('M-76-25v50M-76-25h18M-76 0h15M-76 25h18', '#FFFFFF', 9) + ol('M-34-25v50M-12-25l-22 26 22 24', '#FFFFFF', 9)
        + ol('M4 0a13 25 0 1 0 26 0a13 25 0 1 0-26 0', '#FFFFFF', 9) + ol('M46-25v50M46-25h10a11 11 0 0 1 0 23h-10M46-2h12a13 13 0 0 1 0 27h-12', '#FFFFFF', 9)
        + ol('M82-25v50M82-25h18M82 0h15M82 25h18', '#FFFFFF', 9))
      + face(134, 120, 0.2, 'none') + Lc('M120 133q4 3 8 0', INK, 2.5)
      + Lc('M150 52q8-8 14 0q6-8 14 0', INK, 4) + waves([[30, 132], [170, 136]]) + E(70, 190, 10, 4, '#B0BEC5', 0) + E(170, 196, 12, 4, '#B0BEC5', 0)),
  L('fishdance', 'ประติมากรรมปลาเต้นรำ ฟิชแดนซ์', 'Fish Dance, the giant leaping fish by the harbour', ['fish dance', 'ฟิชแดนซ์', 'fish sculpture', 'ประติมากรรมปลา', 'giant fish', 'ปลายักษ์', 'meriken park', 'สวนเมริเก็น', 'kobe harbour', 'ท่าเรือโกเบ', 'net pattern', 'ลายตาข่าย'], 'หาตาของปลายักษ์ที่กำลังกระโดด', 'Find the eye of the giant leaping fish',
    // a huge fish made of criss-crossed metal net arching up out of the waves on a concrete base, its tail flicked down, a smiling face at its head
    bg('#E3F2FD') + low(176, '#4FC3F7') + frame + R(78, 172, 70, 18, '#BDBDBD', 3)
      + P('M58 176C62 120 110 72 176 62c-6 44-48 92-104 116z', '#BCAAA4') + P('M60 176l-24 2 14-18-8-24 22 18z', '#A1887F')
      + Lc('M74 160l60-70M92 162l58-76M110 154l46-56M78 136l52 34M90 116l50 34M108 98l46 32M128 84l34 22', '#8D6E63', 2.2)
      + P('M176 62c-10 2-18 8-22 16 8 2 16-2 22-16z', '#D7CCC8') + C(152, 86, 6, '#FFFFFF', 2.5) + C(153, 86, 3, INK, 0) + face(140, 104, 0.26, 'w')
      + waves([[26, 196], [150, 202], [90, 212]])),
  L('uroko', 'บ้านเกล็ดปลาอุโรโกะ ย่านคิตาโนะ', 'The Uroko House, the fish-scale house of Kitano', ['uroko house', 'บ้านอุโรโกะ', 'uroko no ie', 'อุโรโกะโนะอิเอะ', 'fish-scale house', 'บ้านเกล็ดปลา', 'kitano ijinkan', 'คิตาโนะอิจินคัง', 'western houses', 'บ้านฝรั่งเก่า', 'bronze boar', 'หมูป่าทองแดง'], 'หาจมูกสีทองของหมูป่าหน้าบ้าน', 'Find the shiny gold nose of the boar in front of the house',
    // an old Western house with two round towers and cone roofs, its walls covered in pale green slates like fish scales, and a little bronze boar statue in front whose nose shines gold
    bg('#FFF8E1') + low(184, '#C5E1A5') + frame + R(70, 98, 100, 86, '#B2DFDB') + P('M64 100l56-32 56 32z', '#6D4C41')
      + R(36, 90, 36, 94, '#B2DFDB') + P('M32 92l22-38 22 38z', '#5D4037') + R(168, 90, 36, 94, '#B2DFDB') + P('M164 92l22-38 22 38z', '#5D4037')
      + Lc([104, 118, 132, 146, 160, 174].map((y) => `M40 ${y}` + 'q4 6 8 0'.repeat(4) + `M74 ${y}` + 'q4 6 8 0'.repeat(12) + `M172 ${y}` + 'q4 6 8 0'.repeat(4)).join(''), '#80CBC4', 2)
      + R(48, 112, 12, 18, '#FFFFFF', 4, 3) + R(180, 112, 12, 18, '#FFFFFF', 4, 3) + R(84, 110, 16, 20, '#FFFFFF', 3, 3) + R(140, 110, 16, 20, '#FFFFFF', 3, 3) + P('M108 184v-26q12-12 24 0v26z', '#8D6E63')
      + g(66, 196, 1, E(0, 0, 20, 11, '#8D6E63') + R(-14, 6, 6, 9, '#8D6E63', 2, 3) + R(8, 6, 6, 9, '#8D6E63', 2, 3) + E(20, -2, 6, 5, '#A1887F', 3) + C(24, -2, 2.6, '#FFD54F', 2) + P('M10-10l4-6 4 6z', '#8D6E63', 2.5))
      + face(120, 140, 0.36)),
  L('luminarie', 'เทศกาลไฟโกเบลูมินาริเอ', 'Kobe Luminarie, the arches of light', ['kobe luminarie', 'โกเบลูมินาริเอ', 'luminarie', 'ลูมินาริเอ', 'light festival', 'เทศกาลไฟ', 'arches of light', 'ซุ้มไฟ', 'winter lights', 'ไฟฤดูหนาว', 'night walk', 'เดินชมไฟกลางคืน'], 'หาวงกลมไฟสีชมพูบนยอดซุ้ม', 'Find the pink circle of lights at the top of the arch',
    // at night, a tall glowing arch of golden lights over the street with a smaller orange arch behind it, coloured bulbs along the edges, a pink rose window on top and stars
    bg('#283593') + low(196, '#5C6BC0') + frame
      + P('M80 196v-58q40-42 80 0v58h-12v-54q-28-30-56 0v54z', '#FFB74D') + P('M40 196V112q80-82 160 0v84h-18v-80q-62-60-124 0v80z', '#FFD54F')
      + [[50, 150], [52, 126], [64, 102], [84, 84], [156, 84], [176, 102], [188, 126], [190, 150], [50, 176], [190, 176]].map(([x, y], i) => C(x, y, 4, ['#F48FB1', '#80DEEA', '#FFFFFF'][i % 3], 2)).join('')
      + C(120, 72, 14, '#F48FB1', 3) + C(120, 72, 6, '#FFFFFF', 0) + Lc('M120 58v-8M106 72h-8M134 72h8', '#FFE082', 2.5)
      + [[34, 40], [206, 44], [180, 30], [52, 64]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('') + face(120, 170, 0.34)),
  L('nunobiki', 'น้ำตกนูโนบิกิ', 'Nunobiki Falls', ['nunobiki falls', 'น้ำตกนูโนบิกิ', 'nunobiki no taki', 'นูโนบิกิโนะทากิ', 'ontaki', 'โอนทากิ', 'shin-kobe', 'ชินโกเบ', 'waterfall', 'น้ำตก', 'forest walk', 'เดินป่า'], 'หาน้ำตกที่ไหลลงบันไดหินสามชั้น', 'Find the waterfall tumbling down three rock steps',
    // a white waterfall spilling down a grey rock cliff in three steps in a green forest into a round blue pool, red maple leaves on the trees, a smiling rock by the pool
    bg('#E8F5E9') + frame + C(40, 60, 26, '#66BB6A', 0) + C(200, 64, 28, '#43A047', 0) + C(52, 104, 22, '#81C784', 0) + C(192, 110, 22, '#81C784', 0)
      + P('M36 150V64q10-22 40-26h88q30 4 40 26v86z', '#90A4AE') + Lc('M60 84h40M140 84h40M70 118h34M136 118h34', '#78909C', 3) + P('M108 40h24l4 44h-4l6 34h-4l4 32h-36l4-32h-4l6-34h-4z', '#FFFFFF') + Lc('M120 42v40M116 88v28M124 88v28', '#B3E5FC', 3)
      + low(150, '#4FC3F7') + E(120, 168, 70, 18, '#81D4FA') + Lc('M90 164c8-4 16 4 24 0M128 172c8-4 16 4 24 0', '#E1F5FE', 3) + frame
      + E(176, 184, 22, 14, '#B0BEC5') + face(176, 182, 0.28) + E(58, 188, 14, 9, '#B0BEC5')
      + [[34, 52], [208, 54], [56, 98], [186, 104]].map(([x, y]) => P(`M${x} ${y - 7}l3 5 6-1-3 5 4 4-6 1-1 6-3-4-3 4-1-6-6-1 4-4-3-5 6 1z`, '#E53935', 1.5)).join('')),
  L('portliner', 'รถไฟไร้คนขับพอร์ตไลเนอร์', 'The driverless Port Liner train', ['port liner', 'พอร์ตไลเนอร์', 'driverless train', 'รถไฟไร้คนขับ', 'automated train', 'รถไฟอัตโนมัติ', 'port island', 'เกาะพอร์ตไอส์แลนด์', 'kobe airport', 'สนามบินโกเบ', 'front seat', 'ที่นั่งหน้าสุด'], 'หาที่นั่งหน้าสุดที่ไม่มีคนขับ', 'Find the very front seat with no driver',
    // a little white train with a blue stripe gliding along a raised grey track on round pillars, its big front window showing an empty driver's seat, tall buildings of Port Island behind
    bg('#E3F2FD') + frame + R(30, 74, 26, 70, '#B0BEC5', 0, 3) + R(184, 62, 28, 82, '#CFD8DC', 0, 3) + R(156, 90, 22, 54, '#B0BEC5', 0, 3)
      + Lc('M36 86h14M36 100h14M36 114h14M190 76h16M190 92h16M190 108h16M190 124h16', '#ECEFF1', 3)
      + R(16, 148, 208, 12, '#9E9E9E', 0, 4) + R(56, 160, 18, 48, '#BDBDBD', 0, 4) + R(166, 160, 18, 48, '#BDBDBD', 0, 4)
      + P('M30 148v-40q0-14 14-14h112v54z', '#FFFFFF') + P('M156 148V94h20q30 0 34 40v14z', '#FFFFFF') + R(30, 128, 180, 8, '#1E88E5', 0, 3)
      + R(42, 104, 22, 16, '#BBDEFB', 3, 3) + R(72, 104, 22, 16, '#BBDEFB', 3, 3) + R(102, 104, 22, 16, '#BBDEFB', 3, 3) + P('M174 102h6q20 2 24 24h-30z', '#BBDEFB', 3)
      + R(178, 112, 8, 14, '#FF8A65', 2, 2.5) + C(70, 148, 6, '#616161', 3) + C(130, 148, 6, '#616161', 3) + C(184, 148, 6, '#616161', 3) + face(112, 140, 0.24, 'none')),
  L('akashitako', 'ปลาหมึกยักษ์อากาชิในไหดินเผา', 'An Akashi octopus in its clay pot', ['akashi octopus', 'ปลาหมึกยักษ์อากาชิ', 'akashi tako', 'อากาชิทาโกะ', 'octopus pot', 'ไหดักปลาหมึก', 'takotsubo', 'ทาโกะสึโบะ', 'akashi strait', 'ช่องแคบอากาชิ', 'sea floor', 'ใต้ทะเล'], 'หาหนวดปลาหมึกที่ม้วนออกมานอกไห', 'Find the octopus arm curling out of the pot',
    // under the sea, a round brown clay pot lying on its side on the sand, a pink-red octopus peeking out of its mouth with a big smile and curly arms, bubbles going up
    bg('#B2EBF2') + low(176, '#FFE0B2') + frame + Lc('M40 60c4 20-4 40 0 60M200 70c-4 20 4 36 0 54', '#4DB6AC', 6)
      + g(98, 150, 1, E(0, 0, 50, 38, '#A1665E') + Lc('M-30-30q30 12 60 0M-40 10q40 14 80 0', '#8D4F47', 3), -10) + E(146, 140, 12, 22, '#5D4037')
      + ol('M150 156c14 10 30 8 34 20s-8 18-14 10M140 160c4 18 20 24 22 34s-12 10-12 2M156 136c18-6 32 0 38 12', '#F06292', 7)
      + E(154, 110, 28, 26, '#F06292') + face(156, 110, 0.36, 'o') + [[60, 78], [70, 60], [176, 66], [168, 48]].map(([x, y]) => C(x, y, 5, '#E0F7FA', 2.5)).join('')),
  L('akashiyaki', 'อากาชิยากิ จิ้มน้ำซุปดาชิ', 'Akashiyaki, egg dumplings dipped in dashi', ['akashiyaki', 'อากาชิยากิ', 'tamagoyaki of akashi', 'ทามาโกะยากิอากาชิ', 'egg dumplings', 'ขนมไข่ลูกกลม', 'dashi broth', 'น้ำซุปดาชิ', 'octopus inside', 'มีปลาหมึกข้างใน', 'wooden board', 'ถาดไม้'], 'หาลูกกลมที่กำลังจุ่มลงในถ้วยน้ำซุป', 'Find the dumpling being dipped into the bowl of broth',
    // a tilted red wooden board with rows of soft puffy golden egg dumplings (no sauce), a bowl of clear dashi with a green leaf beside it, chopsticks dipping one dumpling
    g(96, 150, 1, R(-76, -40, 152, 80, '#C62828', 8) + R(-70, -34, 140, 68, '#E57373', 6, 0)
      + [-50, -18, 14, 46].flatMap((x) => [-14, 14].map((y) => C(x, y, 13, '#FFCA28', 3) + E(x - 4, y - 5, 5, 3, '#FFF59D', 0))).join(''), -8)
      + P('M150 168h70c0 26-16 38-35 38s-35-12-35-38z', '#FFFFFF') + E(185, 168, 35, 9, '#FFE082') + P('M176 164c4-6 10-6 14 0-4 4-10 4-14 0z', '#66BB6A', 2)
      + Lc('M150 64l38 92M164 60l30 94', '#A1887F', 5) + C(190, 156, 12, '#FFCA28', 3) + face(94, 150, 0.34) + Lc('M180 128c-4-8 4-12 0-20M196 130c-4-8 4-12 0-20', '#CFD8DC', 3)),
  L('tansansenbei', 'ทันซันเซมเบ ขนมแผ่นกรอบจากน้ำแร่อาริมะ', "Tansan senbei, Arima's spring-water wafers", ['tansan senbei', 'ทันซันเซมเบ', 'carbonated crackers', 'ขนมแผ่นกรอบน้ำแร่', 'arima onsen', 'อาริมะออนเซ็น', 'thin wafers', 'ขนมแผ่นบาง', 'souvenir', 'ของฝาก', 'sparkling spring water', 'น้ำแร่โซดา'], 'หาลายตารางบนขนมแผ่นกลม', 'Find the criss-cross pattern on the round wafer',
    // a tall stack of thin round cream wafers leaning beside an open blue tin, and one big wafer in front with a criss-cross pattern and a happy face, little fizzy bubbles floating up
    R(30, 92, 64, 104, '#42A5F5', 6) + R(30, 92, 64, 16, '#1E88E5', 6) + Lc('M40 130h44M40 150h44', '#90CAF9', 3)
      + [0, 1, 2, 3, 4, 5].map((i) => E(62, 92 - i * 7, 26, 7, '#FFF3D6', 3)).join('')
      + C(146, 150, 54, '#FFF3D6') + C(146, 150, 46, 'none', 2.5) + Lc('M112 126l68 48M106 146l64 46M124 110l66 46M180 126l-68 48M186 146l-64 46M168 110l-66 46', '#E8C99A', 2.2)
      + face(146, 150, 0.42) + [[110, 70], [128, 52], [150, 72], [176, 50], [192, 80]].map(([x, y]) => C(x, y, 5, '#E1F5FE', 2.5)).join('')),
  L('ekisoba', 'เอกิโซบะ บะหมี่ชานชาลาสถานีฮิเมจิ', 'Ekisoba, the station noodles of Himeji', ['ekisoba', 'เอกิโซบะ', 'himeji ekisoba', 'เอกิโซบะฮิเมจิ', 'himeji station', 'สถานีฮิเมจิ', 'station platform', 'ชานชาลา', 'yellow noodles', 'เส้นบะหมี่สีเหลือง', 'dashi soup', 'น้ำซุปดาชิ'], 'หาเส้นบะหมี่สีเหลืองที่ตะเกียบคีบขึ้นมา', 'Find the yellow noodles lifted by the chopsticks',
    // a big bowl of dark dashi soup with curly yellow noodles, a triangle of fried tofu, a pink-swirl fish cake, crunchy tempura bits and green onion, chopsticks lifting noodles up, a yellow platform edge underneath
    R(16, 198, 208, 12, '#FFD54F', 3) + Lc('M30 204h20M70 204h20M110 204h20M150 204h20M190 204h20', '#FFF59D', 3)
      + P('M34 120h172c0 48-38 76-86 76s-86-28-86-76z', '#FFFFFF') + Lc('M48 146h144', '#1565C0', 4) + E(120, 120, 86, 18, '#A1887F')
      + Lc('M64 120c8-8 14 8 22 0s14 8 22 0 14 8 22 0M82 112c8-8 14 8 22 0s14 8 22 0', '#FFE082', 4)
      + P('M140 104l34 4-18 22z', '#E0A040') + C(78, 118, 10, '#FFFFFF') + Lc('M72 118q6-8 12 0', '#F06292', 2.5)
      + [[100, 124], [108, 128], [118, 122], [158, 126]].map(([x, y]) => C(x, y, 3, '#FFCC80', 1.5)).join('') + [[126, 112], [132, 116], [60, 128]].map(([x, y]) => C(x, y, 3, '#66BB6A', 1.5)).join('')
      + Lc('M116 26l14 82M132 24l8 84', '#A1887F', 5) + Lc('M126 104c-6-14 8-20 0-32s8-18 2-30M134 104c-4-14 8-20 2-32', '#FFE082', 3.5) + face(120, 164, 0.42)),
  L('himejioden', 'โอเด้งฮิเมจิกับซอสโชยุขิง', 'Himeji oden with ginger soy sauce', ['himeji oden', 'โอเด้งฮิเมจิ', 'oden', 'โอเด้ง', 'ginger soy sauce', 'ซอสโชยุขิง', 'shoga joyu', 'โชงะโจยุ', 'daikon radish', 'หัวไชเท้า', 'boiled egg', 'ไข่ต้ม'], 'หาถ้วยซอสที่มีขิงขูดกองอยู่', 'Find the little dish of sauce with grated ginger on top',
    // a shallow square pot of golden broth holding a thick round daikon slice, a boiled egg, a grey jelly triangle and a fish cake on a skewer, and a small dish of soy sauce with a heap of grated ginger
    R(28, 100, 140, 100, '#8D6E63', 12) + R(38, 110, 120, 80, '#FFCC80', 8, 0)
      + E(72, 160, 26, 18, '#FFF8E1') + E(72, 156, 26, 14, '#FFFDE7', 2.5) + E(124, 156, 18, 22, '#FFFFFF') + E(124, 162, 10, 9, '#FFCA28', 2)
      + P('M54 124l30-6-10 26z', '#90A4AE') + C(66, 126, 1.5, INK, 0) + C(74, 130, 1.5, INK, 0)
      + Lc('M110 82l40 64', '#D7CCC8', 4) + g(134, 116, 1, R(-14, -9, 28, 18, '#FFE0B2', 4), 58) + face(124, 148, 0.28)
      + E(190, 178, 30, 12, '#FFFFFF') + E(190, 174, 22, 7, '#6D4C41', 0) + P('M180 172c2-10 18-10 20 0z', '#FFF59D', 2.5) + Lc('M188 166v4M194 166v4', '#FBC02D', 2)
      + Lc('M70 76c-6 10 6 16 0 26M100 70c-6 10 6 16 0 26', '#CFD8DC', 3)),
  L('kobepudding', 'พุดดิ้งโกเบ', 'Kobe pudding', ['kobe pudding', 'พุดดิ้งโกเบ', 'custard pudding', 'พุดดิ้งคัสตาร์ด', 'purin', 'ปูริน', 'caramel sauce', 'ซอสคาราเมล', 'kobe sweets', 'ขนมหวานโกเบ', 'souvenir', 'ของฝาก'], 'หาซอสคาราเมลที่ไหลลงมาข้างพุดดิ้ง', 'Find the caramel sauce running down the pudding',
    // a wobbly yellow custard pudding turned out on a white plate, shiny brown caramel on top dripping down its sides, a cherry and a little cream swirl, a small spoon beside it
    E(110, 192, 86, 18, '#FFFFFF') + E(110, 190, 70, 12, '#F5F5F5', 2.5)
      + P('M62 186l12-82q36-14 72 0l12 82q-48 14-96 0z', '#FFE082') + P('M74 104q36-14 72 0l2 14c-6 10-10-2-16 6-4 6-8-6-14 2-6 8-10-4-16 2-6 6-10-4-16 0-6 6-8-6-14 0z', '#8D4E27')
      + E(110, 102, 36, 8, '#A0612E') + P('M100 96c0-10 20-10 20 0z', '#FFFFFF') + C(118, 84, 8, '#E53935', 2.5) + Lc('M118 76q4-10 12-12', '#5D4037', 2.5)
      + E(84, 120, 4, 10, '#FFF8E1', 0) + face(110, 152, 0.42) + g(196, 160, 1, E(0, -26, 9, 13, '#E0E0E0') + R(-3, -14, 6, 46, '#E0E0E0', 3), 14)),
  L('almondtoast', 'ขนมปังปิ้งอัลมอนด์ของฮิเมจิ', 'Himeji almond toast', ['almond toast', 'ขนมปังปิ้งอัลมอนด์', 'himeji almond toast', 'ขนมปังอัลมอนด์ฮิเมจิ', 'morning set', 'ชุดอาหารเช้า', 'kissaten', 'ร้านกาแฟเก่า', 'almond butter', 'เนยอัลมอนด์', 'thick toast', 'ขนมปังแผ่นหนา'], 'หาเกล็ดอัลมอนด์บนขนมปังปิ้ง', 'Find the almond flakes on the toast',
    // a thick slice of golden toast spread with pale almond butter and sprinkled with almond flakes, cut in half on a round plate, a cup of warm milk beside it
    E(104, 180, 90, 26, '#FFFFFF') + E(104, 178, 76, 18, '#FAFAFA', 2.5)
      + g(84, 140, 1, P('M-46 38v-62c0-22 16-30 46-30s46 8 46 30v62z', '#E0A040') + P('M-38 34v-56c0-16 12-22 38-22s38 6 38 22v56z', '#FFE0A8', 0)
        + [[-20, -20], [6, -24], [-26, 4], [0, -4], [22, -8], [-8, 20], [18, 18]].map(([x, y]) => E(x, y, 6, 3, '#F5DEB3', 2)).join(''), -6)
      + g(140, 158, 1, R(-30, -16, 60, 30, '#E0A040', 6) + R(-26, -12, 52, 20, '#FFE0A8', 4, 0) + E(-8, -2, 5, 2.5, '#F5DEB3', 1.5) + E(10, 0, 5, 2.5, '#F5DEB3', 1.5), 8)
      + R(166, 82, 44, 54, '#FFFFFF', 6) + E(188, 84, 22, 6, '#FFF8E1') + Lc('M210 96c14 0 14 26 0 26', INK, 4) + Lc('M180 70c-4-8 4-12 0-20M196 70c-4-8 4-12 0-20', '#CFD8DC', 3)
      + face(84, 140, 0.38)),
  L('sumaorca', 'วาฬเพชฌฆาตที่โกเบสุมะซีเวิลด์', 'The orca of Kobe Suma Sea World', ['kobe suma sea world', 'โกเบสุมะซีเวิลด์', 'orca', 'วาฬเพชฌฆาต', 'killer whale', 'ออร์กา', 'suma', 'สุมะ', 'aquarium', 'พิพิธภัณฑ์สัตว์น้ำ', 'big splash', 'น้ำกระจาย'], 'หาจุดสีขาวเหนือตาของวาฬ', 'Find the white patch above the whale’s eye',
    // a friendly black-and-white orca leaping in an arc out of a blue pool, a big white splash below and drops flying, the pool's edge in front
    bg('#E1F5FE') + low(168, '#29B6F6') + frame
      + P('M40 160C50 100 110 56 170 66c20 4 28 18 24 30-40-6-84 14-112 72z', '#263238') + P('M96 128c20-22 50-34 82-32-30 10-56 28-74 54z', '#FFFFFF')
      + P('M120 74l10-30 14 26z', '#263238') + P('M42 160l-20 10 10-22-6-20 18 16z', '#263238') + P('M100 118l-14 24 22-12z', '#263238')
      + E(160, 78, 12, 6, '#FFFFFF', 2.5) + C(170, 86, 3, '#FFFFFF', 0) + face(172, 90, 0.26)
      + P('M24 172c10-20 20-6 26-22 6 14 14 2 20 20z', '#FFFFFF') + [[30, 136], [62, 138], [20, 150]].map(([x, y]) => C(x, y, 4, '#B3E5FC', 2)).join('')
      + R(16, 196, 208, 10, '#ECEFF1', 0, 3) + waves([[100, 182], [160, 186]])),
  L('awajionion', 'หัวหอมหวานเกาะอาวาจิ', "Awaji Island's sweet onions", ['awaji onion', 'หอมหัวใหญ่อาวาจิ', 'awaji island', 'เกาะอาวาจิ', 'sweet onion', 'หอมหวาน', 'tamanegi', 'ทามะเนงิ', 'onion farm', 'ไร่หอม', 'onion soup', 'ซุปหัวหอม'], 'หาหัวหอมที่ผ่าครึ่งจนเห็นวงซ้อนกัน', 'Find the onion cut in half showing its rings',
    // a wooden crate of round golden onions with dry green tops, the biggest one smiling in front, and one cut in half beside it showing its white rings
    R(30, 140, 150, 64, '#BC8A5F', 4) + Lc('M30 162h150M30 184h150', '#8D6E63', 3)
      + [[56, 134], [92, 128], [128, 132], [160, 136]].map(([x, y]) => E(x, y, 20, 18, '#E8A33D') + Lc(`M${x} ${y - 18}l-4-16M${x} ${y - 18}l6-14`, '#9CCC65', 3.5)).join('')
      + E(104, 176, 40, 36, '#F0B54A') + Lc('M84 150q20 26 0 52M124 150q-20 26 0 52M104 140v72', '#C98A2C', 2) + Lc('M104 140l-6-22M104 140l8-20', '#8BC34A', 4) + face(104, 178, 0.42)
      + E(184, 190, 32, 22, '#FFFDE7') + E(184, 192, 22, 15, 'none', 2) + E(184, 194, 12, 8, 'none', 2) + P('M152 188c0-20 64-20 64 0', '#F0B54A', 3)),
  L('misogyoza', 'เกี๊ยวซ่าโกเบจิ้มซอสมิโซะ', 'Kobe gyoza with miso dipping sauce', ['kobe gyoza', 'เกี๊ยวซ่าโกเบ', 'miso sauce', 'ซอสมิโซะ', 'misodare', 'มิโซะดาเระ', 'pan-fried dumplings', 'เกี๊ยวซ่าทอด', 'motomachi', 'โมโตมาจิ', 'crispy wing', 'แป้งกรอบ'], 'หาถ้วยซอสมิโซะสีน้ำตาลแดง', 'Find the little dish of red-brown miso sauce',
    // a black iron pan of golden pan-fried dumplings in a row joined by a lacy crispy wing, a small round dish of thick red-brown miso sauce, chopsticks resting on top
    E(104, 150, 92, 52, '#37474F') + E(104, 146, 82, 44, '#546E7A', 0) + E(104, 146, 74, 34, '#F3D38C', 2)
      + [[58, 140], [84, 146], [110, 148], [136, 146], [158, 140]].map(([x, y]) => g(x, y, 1, P('M-12 10c-4-18 4-30 12-30s16 12 12 30z', '#FFF3D6') + Lc('M-6-14q2 4 0 8M0-18q2 4 0 8M6-14q2 4 0 8', '#E0C08A', 2) + P('M-12 10h24c-4 6-20 6-24 0z', '#D9963A', 2.5))).join('')
      + face(110, 146, 0.26, 'none') + E(190, 196, 28, 12, '#FFFFFF') + E(190, 193, 20, 7, '#8E3B1F', 0) + Lc('M176 190c4-2 8 2 12 0', '#B8572F', 2)
      + Lc('M150 70l70 16M146 82l72 14', '#A1887F', 5)),
  L('musicbox', 'พิพิธภัณฑ์กล่องดนตรีบนเขารกโกะ', 'The music box museum on Mount Rokko', ['music box', 'กล่องดนตรี', 'hall of halls rokko', 'ฮอลออฟฮอลส์รกโกะ', 'music box museum', 'พิพิธภัณฑ์กล่องดนตรี', 'rokko garden terrace', 'รกโกะการ์เดนเทอร์เรซ', 'mount rokko', 'ภูเขารกโกะ', 'antique music', 'ดนตรีโบราณ'], 'หากระบอกโลหะที่มีหนามเล็กๆ ในกล่อง', 'Find the little spiky metal drum inside the box',
    // an old wooden music box with its lid open, a shiny metal drum with tiny pins and a golden comb inside, a little crank on the side, music notes floating out
    P('M44 100l18-52h120l-18 52z', '#A1665E') + P('M54 92l12-36h104l-12 36z', '#E57373', 0)
      + R(40, 100, 132, 80, '#8D4F47', 6) + R(50, 108, 112, 40, '#5D4037', 4) + R(60, 114, 70, 22, '#CFD8DC', 8)
      + [[68, 118], [76, 128], [84, 120], [92, 130], [100, 118], [108, 126], [118, 120], [124, 130]].map(([x, y]) => C(x, y, 1.8, '#607D8B', 0)).join('')
      + R(134, 112, 22, 30, '#FFD54F', 2, 2.5) + Lc('M138 116v22M144 116v22M150 116v22', '#F9A825', 2) + face(106, 160, 0.38)
      + Lc('M172 132h14v22', INK, 5) + C(186, 158, 6, '#FFD54F', 3)
      + ol('M184 64v-24l14-4v22', '#7E57C2', 3) + E(180, 64, 6, 5, '#7E57C2', 2.5) + E(194, 60, 6, 5, '#7E57C2', 2.5) + ol('M210 96V78', '#26A69A', 3) + E(206, 97, 6, 5, '#26A69A', 2.5)),
];

export default {
  places: {
    'jp-kobe': { country: 'jp', wave: 3, name: nm('โกเบและฮิเมจิ', 'Kobe and Himeji'), tz: 'Asia/Tokyo', ll: [34.69, 135.19], alias: ['kobe', 'โกเบ', '神戸', 'UKB', 'sannomiya', 'ซันโนมิยะ', 'harborland', 'ฮาร์เบอร์แลนด์', 'meriken park', 'kitano ijinkan', 'mount rokko', 'rokkosan', 'รกโกะ', 'arima onsen', 'อาริมะ', 'akashi', 'อากาชิ', 'awaji island', 'เกาะอาวาจิ', 'himeji', 'ฮิเมจิ', '姫路', 'hyogo', 'เฮียวโงะ'], colors: KB },
  },
  items,
};
