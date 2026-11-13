// Wave 14, group jpb 1: Nagasaki (+ Sasebo, Hirado, Shimabara) — the harbour city of the Dutch and Chinese traders:
// Glover House, Ōura church as a building only, the Spectacles Bridge, Gunkanjima, fan-shaped Dejima, castella, champon.
// Skipped as repeats or bans: the Peace Park (war), Huis Ten Bosch (theme park), Mount Inasa's night view (Hakodate has one),
// the Megami cable-stayed bridge (Boston and Bangkok have one), kakuni manjū (Taiwan's gua bao), the hata kite (Bali's kite),
// Chinatown (Singapore), the flying fish of Gotō (Orchid Island), pearl farms (Phú Quốc), the penguin aquarium, hot springs.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NG = { k1: '#C62828', k2: '#1565C0', k3: '#FFF3E0' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `jp-nagasaki.landmark.${slug}`, cat: 'landmark', file: `jp/nagasaki/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// a little house: white wall, coloured roof
const hut = (x, y, c, s = 1) => g(x, y, s, R(-7, -5, 14, 10, '#FFFFFF', 0, 2.5) + P('M-9-5l9-7 9 7z', c, 2.5));

const items = [
  { id: 'jp-nagasaki.stamp', cat: 'stamp', file: 'jp/nagasaki/stamp.v1.svg', name: nm('ตราประทับนางาซากิ', 'Nagasaki stamp'), kw: ['nagasaki', 'นางาซากิ', 'spectacles bridge', 'สะพานแว่นตา', 'meganebashi', 'harbour city', 'เมืองท่า', 'kyushu', 'คิวชู'],
    // the two stone arches of the Spectacles Bridge reflected in the river as a pair of round glasses, little houses on the green hill behind
    svg: cityStamp('jng-st', { name: 'NAGASAKI', sub: 'JAPAN', ...NG, emblem: P('M50 92c10-24 30-34 50-34s40 10 50 34z', '#A5D6A7', 0) + hut(76, 78, '#E53935', 0.9) + hut(100, 68, '#1E88E5', 0.9) + hut(124, 78, '#FFB300', 0.9)
      + P('M48 104h104a52 52 0 0 1-104 0z', '#90CAF9', 0) + P('M56 104V90q44-12 88 0v14h-9a13 13 0 0 0-26 0h-18a13 13 0 0 0-26 0z', '#BCAAA4') + Lc('M65 104a13 13 0 0 0 26 0M109 104a13 13 0 0 0 26 0', '#E3F2FD', 3.5)
      + Lc('M60 120h12M128 126h14', '#E3F2FD', 2.5) + face(100, 93, 0.3, 'none') }) },
  { id: 'jp-nagasaki.day.harbour', cat: 'day', file: 'jp/nagasaki/day-harbour.v1.svg', name: nm('เมืองท่านางาซากิบนเนินเขา', "Nagasaki's harbour city climbing the hills"), kw: ['nagasaki', 'นางาซากิ', 'nagasaki harbour', 'ท่าเรือนางาซากิ', 'houses on the hills', 'บ้านบนเนินเขา', 'port city', 'เมืองท่า', 'slopes', 'ทางลาดชัน', 'bay', 'อ่าว'],
    // a long deep bay between two green hills covered with little colourful houses, a smiling ship in the middle of the harbour, the sun over the far ridge
    svg: scene('jng-d1', '#BBDEFB', C(184, 50, 16, '#FFE082', 0) + P('M-4 100c40-30 80-34 124-20 40-18 90-14 128 8v60H-4z', '#A5D6A7') + P('M-4 140h248v110H-4z', '#4FC3F7')
      + P('M-4 70c40 0 80 30 110 80v4H-4z', '#81C784') + P('M244 74c-40 6-76 36-100 76v4h100z', '#66BB6A')
      + [[8, 90, '#E53935'], [28, 92, '#1E88E5'], [18, 112, '#FFB300'], [44, 106, '#8E24AA'], [36, 130, '#1E88E5'], [62, 122, '#E53935'], [58, 144, '#FFB300'], [84, 138, '#43A047'],
        [204, 96, '#1E88E5'], [224, 90, '#E53935'], [186, 114, '#FFB300'], [212, 114, '#8E24AA'], [170, 132, '#E53935'], [196, 132, '#1E88E5'], [222, 130, '#FFB300']].map(([x, y, c]) => hut(x, y, c, 1.1)).join('')
      + P('M86 178h70l-10 16H96z', '#FFFFFF') + R(100, 164, 36, 14, '#FFFFFF', 3) + R(126, 152, 8, 12, '#E53935', 0, 3) + Lc('M104 170h6M116 170h6', '#90CAF9', 3) + face(121, 184, 0.24, 'none')
      + Lc('M30 210c10-5 20 5 30 0M170 206c10-5 20 5 30 0M110 222c10-5 20 5 30 0', '#E1F5FE', 4)) },
  { id: 'jp-nagasaki.day.meganebashi', cat: 'day', file: 'jp/nagasaki/day-meganebashi.v1.svg', name: nm('สะพานแว่นตาเหนือแม่น้ำนากาชิมะ', 'The Spectacles Bridge over the Nakashima River'), kw: ['spectacles bridge', 'สะพานแว่นตา', 'meganebashi', 'เมกาเนะบาชิ', 'nakashima river', 'แม่น้ำนากาชิมะ', 'stone arch bridge', 'สะพานหินโค้ง', 'reflection', 'เงาสะท้อน', 'nagasaki', 'นางาซากิ'],
    // a stone bridge with two round arches whose reflections in the still river close them into a pair of glasses, stone embankments, stepping stones, pink blossom trees
    svg: scene('jng-d2', '#E1F5FE', C(30, 74, 30, '#F8BBD0', 0) + C(66, 62, 24, '#F48FB1', 0) + C(214, 70, 30, '#F8BBD0', 0) + C(178, 60, 22, '#F48FB1', 0)
      + R(-4, 96, 248, 40, '#BDBDBD') + Lc('M-4 116h248M30 96v20M80 96v20M140 96v20M200 96v20M54 116v20M110 116v20M170 116v20M226 116v20', '#9E9E9E', 3)
      + R(-4, 136, 248, 120, '#4FC3F7') + Lc('M44 136a32 32 0 0 0 64 0M132 136a32 32 0 0 0 64 0', '#E1F5FE', 6)
      + P('M20 136V100q100-24 200 0v36h-24a32 32 0 0 0-64 0h-24a32 32 0 0 0-64 0z', '#D7CCC8') + Lc('M30 112h12M60 100v8M178 100v8M198 112h12', '#A1887F', 3)
      + [[48, 196], [92, 206], [138, 200], [184, 210]].map(([x, y]) => E(x, y, 13, 6, '#ECEFF1', 3)).join('') + E(70, 222, 9, 4, '#FF8A65', 0) + E(160, 186, 9, 4, '#FFB74D', 0) + face(120, 114, 0.42)) },

  L('glover', 'บ้านโกลเวอร์ในสวนโกลเวอร์', 'The Glover House in Glover Garden', ['glover house', 'บ้านโกลเวอร์', 'glover garden', 'สวนโกลเวอร์', 'western-style house', 'บ้านแบบตะวันตก', 'veranda', 'ระเบียง', 'minamiyamate', 'มินามิยามาเตะ'], 'หาระเบียงยาวกับต้นปาล์มข้างบ้าน', 'Find the long veranda and the palm tree by the house',
    // an old one-storey Western house with a wide grey-green tiled roof, a white veranda on slim posts, green French doors and a lattice under the floor, a palm and flower beds, the harbour behind
    bg('#E3F2FD') + P('M16 124h208v30H16z', '#64B5F6', 0) + low(176, '#A5D6A7') + frame
      + R(150, 68, 10, 24, '#BCAAA4', 0, 3) + P('M44 114l76-42 76 42z', '#6D8B74') + R(56, 114, 128, 56, '#FFFDF5')
      + R(64, 126, 16, 32, '#81C784', 2, 3) + R(160, 126, 16, 32, '#81C784', 2, 3) + Lc('M72 126v32M168 126v32', '#C8E6C9', 2)
      + R(88, 114, 6, 56, '#FFFFFF', 0, 3) + R(146, 114, 6, 56, '#FFFFFF', 0, 3) + R(50, 170, 140, 10, '#E8F5E9', 0, 3) + Lc('M60 170l10 10M80 170l10 10M100 170l10 10M120 170l10 10M140 170l10 10M160 170l10 10', '#A5D6A7', 2)
      + Lc('M36 196c4-30 2-56 8-84', '#8D6E63', 7) + Lc('M36 196c4-30 2-56 8-84', '#A1887F', 3) + P('M44 112c-16-14-30-14-36-6 12-2 24 0 36 6zM44 112c10-18 24-20 32-14-12 2-22 6-32 14zM44 112c-4-20 4-30 14-32-6 8-10 20-14 32z', '#43A047', 3)
      + [[70, 190, '#F48FB1'], [92, 194, '#FFD54F'], [150, 192, '#F48FB1'], [174, 188, '#FFD54F'], [198, 194, '#F48FB1']].map(([x, y, c]) => C(x, y, 6, c, 2.5)).join('') + face(120, 138, 0.42)),
  L('oura', 'โบสถ์โออุระ อาคารไม้สีขาว', 'Ōura Church, the white Gothic church', ['oura church', 'โบสถ์โออุระ', 'oura tenshudo', 'โออุระเท็นชุโด', 'gothic church', 'โบสถ์แบบโกธิก', 'pointed windows', 'หน้าต่างโค้งแหลม', 'white church', 'โบสถ์สีขาว'], 'หาหน้าต่างโค้งแหลมสีฟ้าบนหอคอย', 'Find the pointed blue window on the tower',
    // a small white church with a grey gable roof, a central tower with a tall eight-sided grey spire, pointed blue windows, a brown arched door at the top of a few steps
    bg('#FFF8E1') + low(188, '#C5E1A5') + frame + P('M54 116l66-42 66 42z', '#90A4AE') + R(62, 114, 116, 74, '#FFFFFF')
      + P('M72 160v-22q8-14 16 0v22zM152 160v-22q8-14 16 0v22z', '#90CAF9') + R(98, 84, 44, 104, '#FFFFFF') + P('M98 86l22-50 22 50z', '#78909C') + Lc('M120 22v14M115 28h10', INK, 3)
      + P('M112 112v-10q8-14 16 0v10z', '#90CAF9') + P('M108 188v-24q12-16 24 0v24z', '#8D6E63') + R(90, 188, 60, 8, '#E0E0E0', 0, 3) + R(98, 196, 44, 8, '#EEEEEE', 0, 3) + face(120, 134, 0.36)),
  L('gunkanjima', 'เกาะกุนคันจิมะ เกาะเรือรบ', 'Gunkanjima, the battleship island', ['gunkanjima', 'กุนคันจิมะ', 'hashima island', 'เกาะฮาชิมะ', 'battleship island', 'เกาะเรือรบ', 'abandoned island', 'เกาะร้าง', 'coal mine island', 'เกาะเหมืองถ่านหิน'], 'หาปล่องไฟสูงบนเกาะที่หน้าตาเหมือนเรือรบ', 'Find the tall chimney on the island that looks like a ship',
    // a long grey island walled in concrete like the hull of a ship, packed with stacked blocks of old flats full of little windows, one tall chimney, the sea around it
    bg('#B3E5FC') + low(150, '#4FC3F7') + frame + R(130, 52, 9, 48, '#A1887F', 0, 3)
      + R(54, 98, 30, 50, '#BDBDBD') + R(84, 80, 38, 68, '#D7CCC8') + R(122, 100, 28, 48, '#BDBDBD') + R(150, 88, 36, 60, '#CFD8DC')
      + [[58, 104, 3, 5], [88, 86, 4, 7], [126, 106, 3, 5], [154, 94, 4, 6]].map(([x0, y0, cx, cy]) => Lc(Array.from({ length: cy }, (_, r) => `M${x0} ${y0 + 2 + r * 8}` + 'h4m4 0'.repeat(cx)).join(''), '#546E7A', 4)).join('')
      + C(184, 90, 8, '#81C784', 2.5) + C(56, 98, 6, '#81C784', 2.5)
      + P('M22 162l28-20h152l14 20-14 16H42z', '#9E9E9E') + Lc('M40 170h160', '#BDBDBD', 3) + face(120, 158, 0.38)
      + Lc('M30 196c10-5 20 5 30 0M150 204c10-5 20 5 30 0M90 214c10-5 20 5 30 0', '#E1F5FE', 4)),
  L('dejima', 'เกาะเดจิมะรูปพัด', 'Dejima, the fan-shaped island', ['dejima', 'เดจิมะ', 'fan-shaped island', 'เกาะรูปพัด', 'dutch trading island', 'เกาะการค้าของชาวดัตช์', 'old warehouses', 'โกดังเก่า', 'little bridge', 'สะพานเล็ก'], 'หาสะพานเล็กๆ ที่ต่อเกาะรูปพัดกับฝั่ง', 'Find the little bridge from the fan-shaped island to the shore',
    // seen from above: a sandy island shaped like an open fan in blue water, rows of white storehouses with dark roofs along it, a small stone bridge to the green shore
    bg('#81D4FA') + low(196, '#C5E1A5') + frame + R(110, 150, 20, 48, '#BCAAA4', 0, 3)
      + P('M32 156Q120 20 208 156L186 178Q120 120 54 178Z', '#F5E6C8')
      + [0.12, 0.25, 0.37, 0.63, 0.75, 0.88].map((t) => { const x = (1 - t) ** 2 * 43 + 2 * t * (1 - t) * 120 + t * t * 197; const y = (1 - t) ** 2 * 167 + 2 * t * (1 - t) * 70 + t * t * 167; return g(x, y - 6, 1.15, R(-8, -4, 16, 10, '#FFFFFF', 0, 2.5) + P('M-10-4l3-6h14l3 6z', '#5D4037', 2.5)); }).join('')
      + Lc('M40 60c8-4 16 4 24 0M170 56c8-4 16 4 24 0M196 100c8-4 16 4 24 0', '#E1F5FE', 4) + face(120, 118, 0.36)),
  L('castella', 'เค้กคาสเทลลา', 'Castella, Nagasaki’s honey sponge cake', ['castella', 'คาสเทลลา', 'kasutera', 'คาซุเทระ', 'sponge cake', 'เค้กฟองน้ำ', 'honey cake', 'เค้กน้ำผึ้ง', 'brown crust', 'ขอบสีน้ำตาล', 'coarse sugar', 'น้ำตาลเม็ด'], 'หาเม็ดน้ำตาลใต้ชิ้นเค้ก', 'Find the sugar crystals under the slice',
    // a long golden block of cake with a dark brown top crust, and one thick slice standing in front showing its soft yellow inside and white sugar crystals along the bottom
    E(126, 196, 98, 14, '#ECEFF1', 0) + P('M70 96l126-26 24 14-126 26z', '#6D4C41') + P('M94 110l126-26v44l-126 26z', '#FFCA28') + P('M70 96l24 14v44l-24-14z', '#FFD54F')
      + Lc('M94 154l126-26', '#FFFFFF', 4) + R(30, 140, 66, 64, '#FFE082', 4) + R(30, 140, 66, 12, '#6D4C41', 4) + R(30, 196, 66, 8, '#FFFFFF', 0, 3)
      + [[38, 192], [48, 190], [58, 193], [70, 190], [82, 192], [88, 189]].map(([x, y]) => R(x, y, 4, 4, '#FFFFFF', 0, 1.5)).join('') + face(63, 170, 0.4)),
  L('champon', 'จัมปงนางาซากิ', 'Nagasaki champon, noodles under a heap of seafood and vegetables', ['champon', 'จัมปง', 'nagasaki champon', 'จัมปงนางาซากิ', 'thick noodles', 'เส้นหนา', 'milky soup', 'น้ำซุปขาวขุ่น', 'seafood', 'อาหารทะเล', 'cabbage', 'กะหล่ำปลี'], 'หากุ้งตัวสีส้มบนกองผัก', 'Find the orange prawn on top of the vegetables',
    // a big bowl of milky white soup piled high with cabbage, bean sprouts, pink-edged fish cake, prawns, squid rings, corn and wood-ear mushroom, thick yellow noodles peeking out
    P('M30 122h180c0 50-40 82-90 82s-90-32-90-82z', '#FFFFFF') + Lc('M44 150c20 10 40 10 60 0s40-10 60 0 24 6 32 4', '#1E88E5', 3) + E(120, 122, 90, 20, '#FFF8E1')
      + Lc('M50 122c10-6 20 6 30 0M160 124c10-6 20 6 30 0', '#FFE082', 5) + P('M60 120c8-30 40-46 60-46s52 16 60 46z', '#DCEDC8')
      + E(86, 100, 18, 10, '#C5E1A5', 3) + E(150, 98, 20, 10, '#AED581', 3) + Lc('M100 92l8 18M110 88l2 20M124 90l-4 18M134 94l-8 16', '#FFFDE7', 3)
      + E(120, 82, 13, 8, '#FFFFFF', 3) + Lc('M108 80q12-10 24 0', '#F06292', 3) + C(160, 112, 7, '#FFFFFF', 3) + C(160, 112, 3, '#FFF8E1', 0) + C(78, 116, 6, '#FFFFFF', 3)
      + ol('M90 78a10 10 0 1 1 10 10', '#FF7043', 6) + ol('M148 78a9 9 0 1 0-9 9', '#FF7043', 6) + [[104, 112], [112, 114], [120, 110], [128, 114]].map(([x, y]) => C(x, y, 3.5, '#FFD54F', 1.5)).join('')
      + P('M64 110c4-8 14-8 18 0-6 4-12 4-18 0z', '#4E342E', 2) + P('M168 108c4-8 14-8 18 0-6 4-12 4-18 0z', '#4E342E', 2) + Lc('M150 34c-6 10 6 16 0 26M170 40c-6 10 6 16 0 26', '#CFD8DC', 3)
      + face(120, 166, 0.46)),
  L('torukorice', 'โทรุโกะไรซ์ อาหารสามอย่างในจานเดียว', 'Toruko rice, three dishes on one plate', ['toruko rice', 'โทรุโกะไรซ์', 'turkish rice', 'ข้าวตุรกี', 'pilaf', 'ข้าวผัดพิลาฟ', 'napolitan spaghetti', 'สปาเกตตีนาโปลิตัน', 'tonkatsu', 'หมูทอดทงคัตสึ', 'one plate', 'จานเดียว'], 'หาหมูทอดชิ้นใหญ่ที่ราดซอสสีน้ำตาล', 'Find the big pork cutlet with brown sauce',
    // a big oval plate with a dome of yellow pilaf with peas, a pile of orange napolitan spaghetti, and a golden breaded pork cutlet with a stripe of brown sauce in front
    E(120, 150, 104, 60, '#FFFFFF') + E(120, 150, 90, 48, '#FAFAFA', 3) + P('M42 146c0-28 20-40 40-40s40 14 38 40z', '#FFD54F')
      + [[60, 126, '#66BB6A'], [78, 120, '#E53935'], [94, 130, '#66BB6A'], [70, 138, '#FF8A65'], [100, 118, '#66BB6A']].map(([x, y, c]) => C(x, y, 3.5, c, 1.5)).join('')
      + E(162, 132, 38, 22, '#F4511E') + Lc('M130 124c6-8 12 8 18 0s12 8 18 0 12 8 18 0M128 134c6-8 12 8 18 0s12 8 18 0 12 8 18 0M134 144c6-8 12 8 18 0s12 8 18 0 12 8 14 0M144 114c6-6 12 6 18 0s10 6 12 2', '#FFE0B2', 3)
      + g(120, 170, 1, R(-46, -18, 92, 34, '#E0A040', 10) + Lc('M-22-18v34M2-18v34M26-18v34', '#B87A2A', 3) + Lc('M-40-8c20-8 40 4 80-6', '#5D4037', 6), -4) + face(118, 176, 0.36)),
  L('kunchiwhale', 'ขบวนวาฬพ่นน้ำในเทศกาลนางาซากิคุนจิ', 'The spouting whale float of Nagasaki Kunchi', ['nagasaki kunchi', 'นางาซากิคุนจิ', 'kunchi festival', 'เทศกาลคุนจิ', 'whale float', 'ขบวนแห่วาฬ', 'kujira no shiofuki', 'วาฬพ่นน้ำ', 'autumn festival', 'เทศกาลฤดูใบไม้ร่วง', 'parade float', 'รถแห่'], 'หาน้ำที่พุ่งออกจากหัววาฬ', 'Find the water spouting from the whale’s head',
    // a festival float on wooden wheels with a red-and-white striped skirt and blue waves on top, a big friendly dark whale riding the waves with water spouting high from its head
    R(40, 186, 160, 20, '#FFFFFF', 0, 4) + [52, 76, 100, 124, 148, 172].map((x) => R(x, 186, 12, 20, '#E53935', 0, 0)).join('') + R(40, 186, 160, 20, 'none', 0, 4)
      + C(70, 212, 10, '#6D4C41', 4) + C(170, 212, 10, '#6D4C41', 4) + R(34, 176, 172, 12, '#8D6E63', 3)
      + P('M56 150c-16-8-24-26-18-40 6 8 16 10 22 8-2 10 0 22 8 28z', '#455A64') + P('M56 168c0-42 40-66 92-58 36 6 52 30 44 58z', '#546E7A') + Lc('M122 160h58M126 151h52', '#B0BEC5', 3)
      + P('M38 178c10-12 20-12 30 0s20-12 30 0 20-12 30 0 20-12 30 0 20-12 30 0 20-12 34 0z', '#4FC3F7') + C(144, 132, 8, '#FFFFFF', 0) + C(172, 132, 8, '#FFFFFF', 0)
      + ol('M160 104c0-22-14-36-32-42M160 104c0-24 12-38 30-42M160 104V54', '#81D4FA', 5) + [[124, 58], [196, 58], [160, 44], [140, 46], [182, 46]].map(([x, y]) => C(x, y, 4, '#B3E5FC', 2)).join('')
      + face(158, 132, 0.5)),
  L('sofukuji', 'ประตูมังกรวังสีแดงของวัดโซฟุคุจิ', 'The red Dragon Palace gate of Sōfuku-ji', ['sofukuji', 'โซฟุคุจิ', 'ryugumon', 'ประตูริวงูมง', 'dragon palace gate', 'ประตูวังมังกร', 'chinese style gate', 'ประตูแบบจีน', 'vermilion', 'สีแดงชาด', 'curved roof', 'หลังคาโค้งงอน'], 'หาหลังคาสีแดงสองชั้นที่ปลายงอนขึ้น', 'Find the two red roofs with turned-up corners',
    // a Chinese-style gate: a pale plastered base with an arched doorway, a red lower roof, a red upper storey with round yellow windows, and a red top roof whose corners curl up
    bg('#FFF8E1') + low(196, '#D7CCC8') + frame + R(54, 128, 132, 68, '#FAFAFA') + P('M102 196v-28q18-24 36 0v28z', '#5D4037')
      + P('M36 134c14-2 22-10 26-20h116c4 10 12 18 26 20z', '#C62828') + R(74, 88, 92, 26, '#E53935') + C(98, 101, 6, '#FFCA28', 2.5) + C(142, 101, 6, '#FFCA28', 2.5) + R(114, 92, 12, 18, '#FFCA28', 2, 2.5)
      + P('M44 92c16-2 28-12 32-26h88c4 14 16 24 32 26z', '#C62828') + R(78, 58, 84, 10, '#B71C1C', 3) + P('M78 62c-8 0-14-6-16-14 8 2 14 6 16 10zM162 62c8 0 14-6 16-14-8 2-14 6-16 10z', '#C62828', 3)
      + Lc('M60 196v-62M180 196v-62', '#E0E0E0', 3) + face(120, 150, 0.4)),
  L('orandazaka', 'เนินออรันดะซากะ ทางหินขึ้นเขา', 'Oranda-zaka, the Dutch Slope', ['oranda-zaka', 'ออรันดะซากะ', 'dutch slope', 'เนินชาวดัตช์', 'hollander slope', 'stone paved slope', 'ทางลาดปูหิน', 'wooden western houses', 'บ้านไม้แบบตะวันตก', 'old street lamp', 'เสาไฟเก่า'], 'หาเสาไฟเก่าข้างทางลาดปูหิน', 'Find the old street lamp beside the stone slope',
    // a stone-paved lane climbing up the hill between stone walls, a mint-green clapboard house with a red roof on the left, a cream house on the right, an old street lamp
    bg('#E3F2FD') + low(150, '#A5D6A7') + frame + R(22, 90, 72, 70, '#C8E6C9') + P('M14 92l44-32 44 32z', '#E57373') + Lc('M22 104h72M22 116h72M22 128h72M22 140h72M22 152h72', '#A5D6A7', 2)
      + R(34, 102, 16, 22, '#FFFFFF', 0, 3) + R(66, 102, 16, 22, '#FFFFFF', 0, 3) + R(158, 104, 62, 62, '#FFF9C4') + P('M150 106l40-28 38 28z', '#90A4AE') + R(170, 116, 14, 20, '#FFFFFF', 0, 3) + R(196, 116, 14, 20, '#FFFFFF', 0, 3)
      + P('M70 224l42-108h16l42 108z', '#BDBDBD') + Lc('M80 200h80M88 180h64M96 162h48M102 146h36M108 132h24', '#9E9E9E', 3) + Lc('M100 224l12-30M140 224l-12-30M120 200v-24', '#9E9E9E', 2)
      + P('M16 182l76-14-22 56H16z', '#D7CCC8') + P('M224 186l-76-18 22 56h54z', '#D7CCC8') + Lc('M22 196h58M22 212h52M164 200h56M170 214h50M44 180v16M60 196v16M190 182v18M200 200v14', '#BCAAA4', 3)
      + Lc('M190 172v-44', INK, 4) + R(182, 112, 16, 16, '#FFF59D', 3) + P('M180 112l10-8 10 8z', INK, 0) + face(58, 132, 0.34)),
  L('chirinchirin', 'ไอศกรีมชิรินชิรินรูปดอกกุหลาบ', 'Chirin chirin ice cream shaped like a rose', ['chirin chirin ice', 'ไอศกรีมชิรินชิริน', 'rose-shaped ice cream', 'ไอศกรีมรูปดอกกุหลาบ', 'ice cream cone', 'ไอศกรีมโคน', 'street cart', 'รถเข็น', 'little bell', 'กระดิ่ง'], 'หากระดิ่งใบเล็กข้างโคนไอศกรีม', 'Find the little bell next to the cone',
    // a crunchy cone holding soft ice cream piped into a rose of pale yellow and pink petals, a little golden hand bell beside it
    P('M94 138l26 80 26-80z', '#E8B76A') + Lc('M104 150l26 30M98 140l36 42M128 146l-20 34M140 142l-30 50', '#C99A50', 2.5)
      + C(120, 108, 42, '#FFF59D') + [0, 45, 90, 135, 180, 225, 270, 315].map((a, k) => g(120, 108, 1, E(0, -27, 14, 16, k % 2 ? '#F8BBD0' : '#FFF59D', 3), a)).join('')
      + [20, 92, 164, 236, 308].map((a, k) => g(120, 108, 1, E(0, -13, 10, 11, k % 2 ? '#FFF59D' : '#F48FB1', 3), a)).join('') + C(120, 108, 6, '#F48FB1', 3)
      + P('M176 178c0-16 8-24 18-24s18 8 18 24z', '#FFCA28') + R(190, 142, 8, 12, '#8D6E63', 2, 3) + C(194, 182, 4, '#FFCA28', 2.5) + Lc('M172 150c-4-4-4-10 0-14M216 150c4-4 4-10 0-14', '#FFB300', 3)
      + face(120, 160, 0.36)),
  L('milkshake', 'มิลก์เชกนางาซากิที่ต้องกินด้วยช้อน', 'Nagasaki milkshake, eaten with a spoon', ['nagasaki milkshake', 'มิลก์เชกนางาซากิ', 'milkshake', 'มิลก์เชก', 'eaten with a spoon', 'กินด้วยช้อน', 'crushed ice', 'น้ำแข็งบด', 'cafe dessert', 'ของหวานในคาเฟ่'], 'หาช้อนที่ปักอยู่ในแก้ว', 'Find the spoon standing in the glass',
    // a tall glass full of a frosty pale-yellow milky crushed-ice shake heaped above the rim, a long spoon standing in it, a cherry on top, a blue saucer underneath
    E(120, 208, 58, 10, '#BBDEFB') + P('M78 74h84l-10 132H88z', '#E3F2FD') + P('M82 98h76l-8 104H90z', '#FFF8E1')
      + [[96, 120], [128, 112], [112, 186], [140, 176], [100, 156], [144, 140]].map(([x, y]) => C(x, y, 3, '#FFFFFF', 0)).join('') + P('M74 78c0-14 12-24 22-18 4-12 22-14 28-4 8-10 26-6 26 6 12-2 18 10 14 18z', '#FFF8E1')
      + ol('M138 70l30-54', '#CFD8DC', 4) + E(170, 12, 6, 9, '#CFD8DC', 3) + C(110, 54, 9, '#E53935') + Lc('M110 46c2-10 8-16 16-18', '#6D4C41', 3) + face(120, 150, 0.44)),
  L('biwa', 'ลูกปีปาโมงิ ผลไม้สีส้มของนางาซากิ', 'Mogi loquats, Nagasaki’s orange fruit', ['loquat', 'ลูกปีปา', 'biwa', 'บิวะ', 'mogi biwa', 'ปีปาโมงิ', 'orange fruit', 'ผลไม้สีส้ม', 'big brown seeds', 'เมล็ดใหญ่สีน้ำตาล', 'early summer fruit', 'ผลไม้ต้นหน้าร้อน'], 'หาเมล็ดสีน้ำตาลใหญ่ในลูกที่ผ่าครึ่ง', 'Find the big brown seeds in the cut fruit',
    // a branch with long dark green leaves holding a bunch of oval orange loquats, the middle one smiling, and one cut in half in front showing two big shiny brown seeds
    Lc('M40 40c40 10 70 30 80 60', '#6D4C41', 6) + P('M44 46c10-24 40-40 70-36-12 22-40 36-70 36z', '#2E7D32') + P('M96 60c30-20 70-20 100-4-30 18-70 18-100 4z', '#388E3C') + P('M30 84c-6-26 4-50 26-62 4 24-6 48-26 62z', '#43A047')
      + Lc('M50 44c20-12 40-22 60-30M100 60h90', '#81C784', 2) + E(94, 116, 18, 22, '#FFB74D') + E(148, 116, 18, 22, '#FFA726') + E(120, 132, 22, 26, '#FFB74D') + [[94, 138], [148, 138], [120, 158]].map(([x, y]) => C(x, y, 2.5, '#6D4C41', 0)).join('')
      + E(116, 196, 40, 22, '#FFA726') + E(116, 196, 32, 16, '#FFE0B2', 0) + E(104, 196, 9, 11, '#6D4C41', 2.5) + E(128, 196, 9, 11, '#5D4037', 2.5) + C(101, 191, 2, '#FFFFFF', 0) + C(125, 191, 2, '#FFFFFF', 0)
      + face(120, 130, 0.34)),
  L('hirado', 'สถานีการค้าดัตช์ที่ฮิราโดะ', 'The Dutch trading house at Hirado', ['hirado', 'ฮิราโดะ', 'dutch trading post', 'สถานีการค้าดัตช์', 'hirado oranda shokan', 'ฮิราโดะโอรันดะโชกัง', 'stone warehouse', 'โกดังหิน', 'old port', 'ท่าเรือเก่า'], 'หาประตูโค้งตรงกลางโกดังสีขาว', 'Find the arched door in the middle of the white storehouse',
    // a long white storehouse with a grey tiled roof and small dark windows on a stone base by the quay, steps going down to the sea, a green hill behind
    bg('#E1F5FE') + P('M16 120c40-40 90-50 130-30 30-20 60-16 78 0v40H16z', '#A5D6A7', 0) + low(172, '#4FC3F7') + frame
      + R(30, 148, 180, 28, '#BCAAA4') + Lc('M30 160h180M60 148v12M100 148v12M140 148v12M180 148v12M80 160v16M120 160v16M160 160v16', '#A1887F', 2.5)
      + R(36, 104, 168, 44, '#FFFFFF') + P('M26 106l14-26h160l14 26z', '#78909C') + Lc('M44 92h152', '#90A4AE', 3)
      + [48, 72, 156, 180].map((x) => R(x, 114, 12, 12, '#5D4037', 0, 2.5)).join('') + P('M106 148v-22q14-18 28 0v22z', '#8D6E63') + R(108, 176, 24, 8, '#BCAAA4', 0, 3) + R(112, 184, 16, 8, '#BCAAA4', 0, 3)
      + Lc('M36 204c10-5 20 5 30 0M160 200c10-5 20 5 30 0', '#E1F5FE', 4) + face(120, 112, 0.32)),
  L('kanzarashi', 'คันซาราชิ ขนมแป้งข้าวในน้ำเชื่อมใสของชิมาบาระ', 'Kanzarashi, Shimabara’s rice balls in clear syrup', ['kanzarashi', 'คันซาราชิ', 'shimabara', 'ชิมาบาระ', 'rice flour balls', 'ขนมแป้งข้าวเหนียวลูกกลม', 'clear syrup', 'น้ำเชื่อมใส', 'spring water', 'น้ำพุใส', 'summer sweet', 'ของหวานหน้าร้อน'], 'หาก้อนแป้งขาวที่ยิ้มอยู่ในน้ำเชื่อม', 'Find the smiling white ball in the syrup',
    // a clear glass bowl of golden syrup with little white rice-flour balls floating in it, the biggest one smiling, a wooden spoon resting on the rim
    P('M40 120h160c0 46-36 74-80 74s-80-28-80-74z', '#E1F5FE') + E(120, 120, 80, 14, '#FFF3C4') + P('M56 136c10 26 34 44 64 44s54-18 64-44z', '#FFECB3', 0)
      + [[72, 118, 11], [96, 128, 12], [148, 126, 12], [170, 116, 10], [86, 156, 10], [150, 158, 10], [118, 164, 9]].map(([x, y, r]) => C(x, y, r, '#FFFFFF', 3)).join('') + C(122, 116, 17, '#FFFFFF', 3)
      + Lc('M56 132c6 14 14 24 24 30', '#FFFFFF', 4) + ol('M168 106l40-46', '#C8A165', 5) + E(212, 54, 8, 11, '#C8A165', 3) + face(122, 114, 0.32)),
  L('shippoku', 'ชิปโปคุ อาหารชุดบนโต๊ะกลมสีแดง', 'Shippoku, a feast on a round red table', ['shippoku', 'ชิปโปคุ', 'shippoku ryori', 'อาหารชิปโปคุ', 'round table', 'โต๊ะกลม', 'red lacquer table', 'โต๊ะแล็กเกอร์สีแดง', 'japanese chinese dutch food', 'อาหารผสมญี่ปุ่นจีนดัตช์', 'shared dishes', 'อาหารแบ่งกัน'], 'หาชามซุปที่ยิ้มอยู่กลางโต๊ะ', 'Find the smiling soup bowl in the middle of the table',
    // a round red lacquer table with many little colourful dishes all around it and a big smiling soup bowl in the middle, chopsticks laid at the edge
    R(54, 170, 12, 40, '#8E1B1B', 0, 4) + R(174, 170, 12, 40, '#8E1B1B', 0, 4) + P('M22 128v16c0 30 44 54 98 54s98-24 98-54v-16z', '#8E1B1B') + E(120, 128, 98, 52, '#C62828') + E(120, 128, 86, 42, '#D84343', 0)
      + [[0, '#FFB74D'], [52, '#81C784'], [104, '#F48FB1'], [180, '#FFD54F'], [232, '#4FC3F7'], [284, '#A1887F']].map(([a, c]) => { const x = 120 + 66 * Math.cos(a * Math.PI / 180); const y = 128 + 32 * Math.sin(a * Math.PI / 180); return E(x, y, 15, 8, '#FFFFFF', 3) + E(x, y - 1, 9, 4, c, 0); }).join('')
      + E(120, 124, 26, 14, '#FFFFFF') + E(120, 120, 20, 8, '#FFE0B2', 0) + Lc('M160 168l30-8M162 174l30-8', '#FFCA28', 3) + face(120, 128, 0.32)),
  L('lemonsteak', 'สเต๊กเลมอนของซาเซโบะบนกระทะเหล็ก', 'Sasebo lemon steak on a sizzling iron plate', ['lemon steak', 'สเต๊กเลมอน', 'sasebo', 'ซาเซโบะ', 'sizzling plate', 'กระทะเหล็กร้อน', 'thin beef slices', 'เนื้อหั่นบาง', 'lemon slices', 'มะนาวเหลืองฝาน', 'soy lemon sauce', 'ซอสโชยุเลมอน'], 'หามะนาวแผ่นกลมบนเนื้อ', 'Find the round lemon slices on the beef',
    // a black oval iron plate on a wooden board, thin slices of beef fanned out in a glossy brown sauce, three round lemon slices on top and steam curling up
    E(120, 160, 104, 48, '#A1887F') + E(120, 150, 88, 38, '#455A64') + E(120, 148, 78, 30, '#6D4C41', 0)
      + [[-44, 0], [-22, -4], [0, -6], [22, -4], [44, 0]].map(([dx, dy]) => g(120 + dx, 148 + dy, 1, E(0, 0, 20, 13, '#C17A63', 3), dx / 3)).join('')
      + [[86, 140], [120, 132], [154, 140]].map(([x, y]) => C(x, y, 12, '#FFF176', 3) + C(x, y, 7, '#FFF9C4', 0) + Lc(`M${x - 7} ${y}h14M${x} ${y - 7}v14`, '#FBC02D', 1.5)).join('')
      + Lc('M80 104c-6-10 6-16 0-26M120 98c-6-10 6-16 0-26M160 104c-6-10 6-16 0-26', '#CFD8DC', 4) + face(120, 172, 0.36)),
];

export default {
  places: {
    'jp-nagasaki': { country: 'jp', wave: 3, name: nm('นางาซากิ', 'Nagasaki'), tz: 'Asia/Tokyo', ll: [32.75, 129.88], alias: ['nagasaki', 'นางาซากิ', '長崎', 'NGS', 'dejima', 'เดจิมะ', 'glover garden', 'สวนโกลเวอร์', 'gunkanjima', 'กุนคันจิมะ', 'hashima island', 'sasebo', 'ซาเซโบะ', 'hirado', 'ฮิราโดะ', 'shimabara', 'ชิมาบาระ', 'unzen', 'อุนเซ็น'], colors: NG },
  },
  items,
};
