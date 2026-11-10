// Wave 8, Asia part 1: Singapore, Indonesia and Bali, Malaysia (the country, Kuala Lumpur, Penang) and the Maldives.
// Mosques and temples appear only as buildings, with no face on them and no figures (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (sg/singapore/landmark-esplanade.v1.svg → sg-singapore.landmark.esplanade)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
// n copies of a shape, joined
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const palm = (x, y, h, lean = 1) => Lc(`M${x} ${y}c${4 * lean} -${h / 2} ${-2 * lean} -${h * 0.8} ${8 * lean} -${h}`, '#6D4C41', 5)
  + [-30, -14, 0, 14, 30].map((dx) => Lc(`M${x + 8 * lean} ${y - h}q${dx / 2} -12 ${dx} ${Math.abs(dx) < 10 ? -14 : 6}`, '#2E7D32', 5)).join('');
const fish = (x, y, s, c, flip = 1) => g(x, y, s, P(`M${-12 * flip} 0c${8 * flip}-10 ${22 * flip}-10 ${26 * flip} 0-${18 * flip} 10-${26 * flip} 0zM${-12 * flip} 0l-${8 * flip}-7v14z`, c, 2) + C(8 * flip, -2, 1.6, INK, 0));

const items = [
  // ---------- Singapore (the country)
  K('sg.food.bakkutteh', 'บักกุ๊ดเต๋ซุปซี่โครงหมูพริกไทย', 'Bak kut teh, peppery pork rib soup', ['bak kut teh', 'บักกุ๊ดเต๋', 'pork rib soup', 'ซุปซี่โครงหมู', 'peppery soup', 'ซุปพริกไทย', 'you tiao', 'ปาท่องโก๋', 'claypot', 'garlic'],
    // a round clay pot of clear peppery soup with pork ribs poking out and whole garlic cloves, a happy face on the pot; beside it two golden dough sticks and a little dish of dark soy with red chilli
    P('M30 112c0 56 34 84 84 84s84-28 84-84z', '#B5653A') + E(114, 112, 84, 22, '#F3DDB0') + ring(3, (k) => Lc(`M${84 + k * 30} 82c-8-10 8-16 0-28`, '#B0BEC5', 3))
      + [[80, 108, -12], [124, 102, 8], [156, 114, -4]].map(([x, y, r]) => g(x, y, 1, R(-22, -7, 44, 14, '#A1673F', 7, 2.5) + C(-24, 0, 6, '#FFF8E1', 2.5) + C(24, 0, 6, '#FFF8E1', 2.5), r)).join('')
      + [[102, 118], [140, 124], [64, 120]].map(([x, y]) => E(x, y, 7, 5, '#FFFDE7', 2)).join('') + ring(9, (k) => C(50 + k * 16, 112 + (k % 3) * 5, 1.6, INK, 0))
      + face(114, 150, 0.8) + g(46, 214, 1, R(-36, -8, 72, 14, '#F2B544', 7, 2.5) + R(-36, 2, 72, 14, '#E8A33A', 7, 2.5), -8)
      + E(196, 210, 30, 11, '#FFFFFF') + E(196, 208, 20, 6, '#4E342E', 0) + ring(3, (k) => C(188 + k * 8, 207, 3, '#E53935', 1.5))),
  K('sg.animal.mudskipper', 'ปลาตีนบนโคลนป่าชายเลน', 'A mudskipper on the mangrove mud', ['mudskipper', 'ปลาตีน', 'sungei buloh', 'ซุงเกบูโลห์', 'mangrove', 'ป่าชายเลน', 'wetland reserve', 'เขตอนุรักษ์พื้นที่ชุ่มน้ำ', 'mudflat', 'หาดโคลน'],
    // a chubby brown-spotted fish propped up on its two front fins on wet mud, big bulging eyes on top of its head, a tall sail fin with blue spots, mangrove roots arching behind
    ring(4, (k) => Lc(`M${20 + k * 50} 196c4-40 20-60 34-70`, '#6D4C41', 4)) + E(120, 200, 112, 24, '#8D6E63') + E(70, 204, 24, 6, '#90CAF9', 0)
      + P('M84 146c8-40 40-50 58-26l6 26z', '#90CAF9') + ring(4, (k) => C(100 + k * 12, 126 + (k % 2) * 8, 3, '#1E88E5', 0))
      + P('M28 178c14-24 54-34 100-34 34 0 64 10 76 28-8 18-40 24-80 24-44 0-80-4-96-18z', '#C9A27A') + P('M28 178l-16-16v30z', '#C9A27A') + ring(6, (k) => C(64 + k * 18, 166 + (k % 2) * 8, 3.5, '#8D6E63', 0))
      + P('M150 192l-6 16 22-2z', '#C9A27A', 2.5) + P('M110 192l-10 14 22-2z', '#C9A27A', 2.5)
      + C(166, 138, 13, '#FFFFFF') + C(190, 140, 13, '#FFFFFF') + C(168, 138, 6, INK, 0) + C(192, 140, 6, INK, 0)
      + E(162, 168, 7, 4.5, '#FF8FA3', 0) + E(202, 170, 7, 4.5, '#FF8FA3', 0) + Lc('M176 172q8 6 16 0', INK, 3)),
  K('sg.culture.fivestones', 'ห้าหินเกมเด็กสิงคโปร์', 'Five stones, the little cloth pouches game', ['five stones', 'เกมห้าหิน', 'batu seremban', 'บาตูเซอเรมบัน', 'kampong games', 'เกมเด็กสมัยก่อน', 'cloth pouches', 'ถุงผ้าใส่ทราย', 'toss and catch', 'โยนรับ'],
    // five plump triangle pouches sewn from bright patterned cloth, four lying on a woven mat and one tossed high in the air with motion arcs, two pouches with happy faces
    P('M20 170h200l-14 46H34z', '#E6C27A') + ring(6, (k) => Lc(`M${34 + k * 34} 172l-6 42`, '#C9A04F', 2.5)) + Lc('M28 192h184', '#C9A04F', 2.5)
      + [[60, 176, '#E91E63', -8, 1], [106, 186, '#29B6F6', 6, 0], [150, 174, '#FFCA28', -4, 1], [192, 190, '#66BB6A', 10, 0]].map(([x, y, c, r, f]) => g(x, y, 1, P('M-24 10c-4 0-6-4-4-8L-4-24c2-4 6-4 8 0l24 26c2 4 0 8-4 8z', c) + Lc('M0-22v30', '#FFFFFF', 2) + C(-10, 0, 2.5, '#FFFFFF', 0) + C(12, 0, 2.5, '#FFFFFF', 0) + (f ? face(0, -2, 0.3) : ''), r)).join('')
      + g(120, 70, 1.2, P('M-24 10c-4 0-6-4-4-8L-4-24c2-4 6-4 8 0l24 26c2 4 0 8-4 8z', '#AB47BC') + Lc('M0-22v30', '#FFFFFF', 2) + face(0, -2, 0.32, 'o'), 14)
      + Lc('M70 110c10-30 20-40 30-44M168 110c-8-30-18-40-28-44', '#B39DDB', 3)),

  // ---------- Singapore (the city)
  L('sg/singapore/landmark-esplanade.v1.svg', 'โรงละครเอสพลานาดหลังคาหนามเหมือนทุเรียน', 'Esplanade theatres, the two spiky domes by the bay', ['esplanade', 'เอสพลานาด', 'theatres on the bay', 'โรงละครริมอ่าว', 'durian domes', 'โดมทุเรียน', 'spiky roof', 'หลังคาหนาม', 'concert hall', 'ฮอลล์ดนตรี'], 'หาโดมหนามสองหลังริมน้ำ', 'Find the two spiky domes by the water',
    // two big rounded domes covered in rows of little pointed sunshades, like two durians, sitting at the edge of the bay; calm blue water in front and a child on the waterfront path
    sky('#FFE0B2') + P('M-4 172h248v72H-4z', '#4FC3F7', 0) + Lc('M20 196h50M150 210h60M90 222h40', '#B3E5FC', 3)
      + P('M14 172c0-78 40-110 84-110s84 32 84 110z', '#CFD8DC', 3.5) + P('M150 172c0-48 24-70 50-70s50 22 50 70z', '#CFD8DC', 3.5)
      + ring(30, (k) => { const a = 0.18 + (k % 6) * 0.13, f = 0.32 + Math.floor(k / 6) * 0.15, x = 98 + Math.cos(a * Math.PI) * 76 * f * (k % 2 ? 1 : -1), y = 172 - Math.sin(a * Math.PI) * 100 * f - 6; return P(`M${x.toFixed(1)} ${y.toFixed(1)}m-5 4l5-9 5 9z`, '#78909C', 0); })
      + ring(10, (k) => { const a = 0.2 + (k % 5) * 0.15, f = 0.45 + Math.floor(k / 5) * 0.3, x = 200 + Math.cos(a * Math.PI) * 44 * f * (k % 2 ? 1 : -1), y = 172 - Math.sin(a * Math.PI) * 62 * f - 4; return P(`M${x.toFixed(1)} ${y.toFixed(1)}m-4 3l4-7 4 7z`, '#78909C', 0); })
      + Lc('M-4 172h248', INK, 3) + face(98, 140, 0.55) + kid(40, 236, '#EF5350')),
  L('sg/singapore/landmark-tantengniah.v1.svg', 'บ้านตันเต็งเนี๊ยะหลากสีในลิตเติลอินเดีย', 'The rainbow villa of Tan Teng Niah in Little India', ['tan teng niah', 'บ้านตันเต็งเนี๊ยะ', 'little india', 'ลิตเติลอินเดีย', 'rainbow house', 'บ้านสีรุ้ง', 'colourful shutters', 'บานเกล็ดหลากสี', 'villa', 'serangoon road'], 'หาบานหน้าต่างทุกบานที่สีไม่ซ้ำกัน', 'Find the windows that are all different colours',
    // a two-storey villa painted in rainbow stripes, every shutter and pillar a different bright colour, a red-tiled roof with upturned ends, a child in front taking a photo
    sky('#E1F5FE') + P('M-4 206h248v38H-4z', '#BDBDBD', 0) + Lc('M-4 206h248', INK, 3)
      + R(26, 84, 188, 122, '#FFF59D', 0, 3) + P('M14 86l18-30h176l18 30z', '#E53935', 3) + Lc('M14 86q-6-2-8-10M226 86q6-2 8-10', INK, 3) + Lc('M34 70h172', '#B71C1C', 2.5)
      + Lc('M26 144h188', INK, 3) + ring(5, (k) => { const c = ['#E91E63', '#29B6F6', '#66BB6A', '#FF9800', '#AB47BC'][k]; return R(36 + k * 36, 98, 28, 36, c, 4, 2.5) + Lc(`M${50 + k * 36} 98v36`, '#FFFFFF', 2) + R(36 + k * 36, 158, 28, 48, ['#FFCA28', '#EF5350', '#26A69A', '#7E57C2', '#42A5F5'][k], 4, 2.5); })
      + ring(6, (k) => R(28 + k * 36, 144, 6, 62, ['#F06292', '#4FC3F7', '#AED581', '#FFB74D', '#BA68C8', '#4DD0E1'][k], 0, 2))
      + g(200, 236, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#26A69A', 2) + R(-18, -26, 12, 9, '#37474F', 2, 1.5) + face(0, -18, 0.22))),
  L('sg/singapore/landmark-hendersonwaves.v1.svg', 'สะพานเฮนเดอร์สันเวฟส์ทางเดินลอนคลื่นบนยอดไม้', 'Henderson Waves, the wavy wooden bridge above the trees', ['henderson waves', 'สะพานเฮนเดอร์สันเวฟส์', 'southern ridges', 'เซาเทิร์นริดจ์', 'mount faber', 'เมาท์เฟเบอร์', 'wave bridge', 'สะพานลอนคลื่น', 'treetop walk', 'เดินบนยอดไม้'], 'หาลอนคลื่นไม้ที่โค้งขึ้นลงเหนือทางเดิน', 'Find the wooden waves rising over the walkway',
    // a long pedestrian bridge whose wooden slats curve up and down in waves above the deck, standing on tall grey legs over the green treetops; a child walking along it
    sky('#B3E5FC') + ring(7, (k) => C(10 + k * 38, 216 + (k % 2) * 8, 30, ['#43A047', '#66BB6A'][k % 2], 3)) + ring(3, (k) => Lc(`M${40 + k * 80} 160v54`, '#90A4AE', 7))
      + ring(22, (k) => { const x = 8 + k * 10.6, h = Math.max(0, Math.sin((k / 21) * Math.PI * 5)) * 52; return h > 2 ? Lc(`M${x.toFixed(1)} 150v-${h.toFixed(1)}`, '#A1673F', 4) : ''; })
      + Lc(ring(22, (k) => { const x = 8 + k * 10.6, h = Math.max(0, Math.sin((k / 21) * Math.PI * 5)) * 52; return `${k ? 'L' : 'M'}${x.toFixed(1)} ${(150 - h).toFixed(1)}`; }), '#6D4C41', 4)
      + R(2, 148, 236, 12, '#8D6E63', 3, 3) + Lc('M2 154h236', '#D7A86E', 2) + kid(120, 148, '#FFCA28') + face(44, 170, 0.35)),
  L('sg/singapore/landmark-artscience.v1.svg', 'พิพิธภัณฑ์อาร์ตไซน์รูปดอกบัวบาน', 'The ArtScience Museum shaped like an open lotus', ['artscience museum', 'พิพิธภัณฑ์อาร์ตไซน์', 'lotus building', 'ตึกรูปดอกบัว', 'welcoming hand', 'มือต้อนรับ', 'marina bay', 'มารีน่าเบย์', 'lily pond', 'บ่อบัว'], 'หากลีบสีขาวที่บานออกเหมือนนิ้วมือ', 'Find the white petals spreading like fingers',
    // a white building of ten curved petal-fingers of different heights opening upwards from a round base, a lily pond with pink water lilies in front, a child on the edge
    sky('#E3F2FD') + P('M-4 184h248v60H-4z', '#4DB6AC', 0) + Lc('M-4 184h248', INK, 3)
      + [[-58, 0.7], [58, 0.72], [-40, 0.85], [40, 0.88], [-20, 1], [20, 1.02], [0, 1.08]].map(([r, s]) => g(120, 176, 1, P(`M-15 0c-8-${50 * s} 0-${96 * s} 15-${110 * s} 15 ${14 * s} 23 ${60 * s} 15 ${110 * s}z`, r % 40 ? '#FAFAFA' : '#ECEFF1', 3) + Lc(`M0-8v-${80 * s}`, '#CFD8DC', 2), r)).join('')
      + P('M60 186c0-14 120-14 120 0z', '#B0BEC5', 3) + face(120, 120, 0.42)
      + [[40, 206], [200, 214], [150, 226]].map(([x, y]) => E(x, y, 18, 6, '#66BB6A', 2) + g(x + 4, y - 4, 1, P('M0 0l-8-10 8 4 8-4z', '#F48FB1', 2))).join('') + kid(84, 236, '#5C6BC0')),
  L('sg/singapore/landmark-orchidgarden.v1.svg', 'ซุ้มกล้วยไม้ในสวนกล้วยไม้แห่งชาติ', 'The orchid arch in the National Orchid Garden', ['national orchid garden', 'สวนกล้วยไม้แห่งชาติ', 'orchids', 'กล้วยไม้', 'botanic gardens', 'สวนพฤกษศาสตร์', 'flower arch', 'ซุ้มดอกไม้', 'vanda miss joaquim', 'แวนดามิสโจคิม'], 'หาดอกกล้วยไม้ดอกใหญ่ที่มีหน้ายิ้ม', 'Find the big orchid with a smiling face',
    // a tunnel arch completely covered in purple, pink and yellow orchid sprays over a garden path, a child walking under it, one huge purple-and-white orchid flower with a smiling face in front
    sky('#F1F8E9') + P('M-4 196h248v48H-4z', '#9CCC65', 0) + P('M84 244l16-48h40l16 48z', '#E0C9A6', 0) + Lc('M-4 196h248', INK, 3)
      + Lc('M38 200V110c0-70 164-70 164 0v90', '#6D4C41', 8) + Lc('M38 200V110c0-70 164-70 164 0v90', '#8D6E63', 4)
      + ring(18, (k) => { const a = Math.PI - (k / 17) * Math.PI, x = 120 + Math.cos(a) * 82, y = 110 - Math.sin(a) * 58; const c = ['#AB47BC', '#F06292', '#FFD54F'][k % 3]; return C(x, y, 9, c, 2) + C(x, y, 3, '#FFFFFF', 0); })
      + ring(6, (k) => { const x = k < 3 ? 38 : 202, y = 130 + (k % 3) * 24; return C(x, y, 8, ['#CE93D8', '#F48FB1', '#FFE082'][k % 3], 2); })
      + kid(120, 204, '#29B6F6', 1.1)
      + g(190, 206, 1, E(-20, -16, 16, 22, '#CE93D8', 2.5) + E(20, -16, 16, 22, '#CE93D8', 2.5) + E(0, -34, 12, 18, '#E1BEE7', 2.5) + E(-16, 8, 10, 16, '#E1BEE7', 2.5) + E(16, 8, 10, 16, '#E1BEE7', 2.5) + P('M-12-4c0 22 24 22 24 0z', '#7B1FA2', 2.5) + face(0, -14, 0.32))),

  // ---------- Indonesia (the country)
  K('id.food.klepon', 'เกอลปงขนมแป้งเขียวไส้น้ำตาลมะพร้าว', 'Klepon, green rice balls with palm sugar inside', ['klepon', 'เกอลปง', 'pandan rice balls', 'ขนมใบเตย', 'palm sugar', 'น้ำตาลมะพร้าว', 'grated coconut', 'มะพร้าวขูด', 'jajan pasar', 'ขนมพื้นเมือง'],
    // a big banana leaf with four bright green round rice cakes rolled in white grated coconut; one bitten open with dark palm-sugar syrup oozing out; faces on two
    P('M10 170c30-50 120-80 220-60-20 50-110 90-220 60z', '#66BB6A') + Lc('M16 168c60-24 130-40 208-56', '#2E7D32', 2.5) + ring(5, (k) => Lc(`M${50 + k * 34} ${160 - k * 8}l16 ${14 - k}`, '#2E7D32', 1.8))
      + [[64, 146, 1], [112, 126, 0], [160, 138, 1]].map(([x, y, f]) => C(x, y, 24, '#7CB342') + ring(7, (k) => R(x - 14 + (k * 9) % 26, y - 16 + Math.floor(k / 2) * 9, 5, 2.5, '#FFFFFF', 1, 0)) + (f ? face(x, y + 2, 0.4) : '')).join('')
      + C(200, 150, 22, '#7CB342') + E(206, 144, 13, 11, '#FFF8E1', 2.5) + C(207, 145, 7, '#6D4C41', 0) + P('M206 152c4 10 2 22-6 30 6 4 12 2 12-6 0-10-2-16-6-24z', '#6D4C41', 2)),
  K('id.culture.angklung', 'อังกะลุงเครื่องดนตรีไม้ไผ่ของชวาตะวันตก', 'An angklung, the shaking bamboo instrument', ['angklung', 'อังกะลุง', 'bamboo instrument', 'เครื่องดนตรีไม้ไผ่', 'sundanese music', 'ดนตรีซุนดา', 'west java', 'ชวาตะวันตก', 'saung angklung', 'shake to play'],
    // two angklungs: a bamboo frame holding two cut bamboo tubes of different heights that rattle in a slotted base tube, the big one with a smiling face, shake lines and music notes around them
    g(96, 120, 1, Lc('M-46 80V-80M46 80V-80', '#D4A055', 9) + Lc('M-46 80V-80M46 80V-80', '#A1673F', 3) + Lc('M-46-70h92M-46-10h92', '#A1673F', 5)
      + P('M-34 60V-50c0-8 6-12 10-6l4 6v110z', '#F2C46D', 3) + Lc('M-34 0h14', '#C9A04F', 2.5) + P('M6 60V-20c0-8 6-12 10-6l4 6v80z', '#F2C46D', 3) + Lc('M6 20h14', '#C9A04F', 2.5)
      + R(-54, 58, 108, 22, '#D4A055', 11, 3) + Lc('M-30 66h18M14 66h18', INK, 3) + face(-2, -40, 0.4))
      + g(196, 170, 0.55, Lc('M-46 80V-80M46 80V-80', '#A1673F', 9) + Lc('M-46-70h92', '#A1673F', 5) + P('M-30 60V-40c0-8 6-12 10-6l4 6v100z', '#F2C46D', 3) + P('M8 60V0c0-8 6-12 10-6l4 6v60z', '#F2C46D', 3) + R(-54, 58, 108, 22, '#D4A055', 11, 3))
      + Lc('M30 50c-6 10-6 20 0 30M30 150c-6 10-6 20 0 30M162 40c6 10 6 20 0 30', '#FF7043', 3)
      + [[176, 70], [204, 96]].map(([x, y]) => C(x, y, 7, '#7E57C2', 2) + Lc(`M${x + 6} ${y}v-24l10 4`, INK, 3)).join('')),
  K('id.animal.babirusa', 'บาบิรูซาหมูเขี้ยวโค้งแห่งสุลาเวสี', 'A babirusa, the curly-tusked pig of Sulawesi', ['babirusa', 'บาบิรูซา', 'pig deer', 'หมูกวาง', 'sulawesi', 'สุลาเวสี', 'curly tusks', 'เขี้ยวโค้ง', 'wildlife', 'สัตว์ป่าหายาก'],
    // a round grey-brown wild pig with thin legs and almost bare wrinkly skin, a big pink snout and two pairs of tusks curling up and back over its forehead, a little curly tail, a happy face
    E(120, 216, 90, 10, '#C5E1A5', 0) + ring(4, (k) => R(58 + k * 32 + (k > 1 ? 18 : 0), 172, 12, 42, '#8D7B6F', 5, 3))
      + E(110, 148, 74, 46, '#A1887F') + Lc('M70 128c6 10 6 30 0 40M96 120c6 14 6 40 0 54', '#8D6E63', 2.5) + Lc('M38 140c-12-4-14-18-4-18 8 0 4 10-2 8', INK, 3)
      + C(176, 132, 34, '#A1887F') + P('M160 104l-4-16 14 10z', '#8D6E63', 2.5) + E(208, 146, 14, 12, '#F8BBD0') + C(204, 144, 2.5, INK, 0) + C(212, 146, 2.5, INK, 0)
      + Lc('M196 132c4-22-6-40-24-44', '#FFF8E1', 6) + Lc('M196 132c4-22-6-40-24-44', INK, 1.5) + Lc('M212 138c12-20 6-44-14-56', '#FFF8E1', 6) + Lc('M212 138c12-20 6-44-14-56', INK, 1.5)
      + face(176, 134, 0.5)),

  // ---------- Bali
  L('id/bali/landmark-ulundanu.v1.svg', 'วัดอุลุนดานูบราตันบนทะเลสาบ', 'Ulun Danu Beratan, the tiered shrines on the lake', ['ulun danu beratan', 'อุลุนดานูบราตัน', 'lake temple', 'วัดริมทะเลสาบ', 'lake beratan', 'ทะเลสาบบราตัน', 'bedugul', 'เบดูกุล', 'tiered roofs', 'หลังคาซ้อนชั้น'], 'หาหลังคามุงสีดำที่ซ้อนกันสูงๆ', 'Find the tall stack of black thatched roofs',
    // a tall shrine tower of eleven black thatched roofs getting smaller towards the top and a smaller three-roofed one beside it, both on little stone islands in a misty mountain lake (buildings only)
    sky('#E0F2F1') + P('M-4 120l50-40 40 24 50-50 60 50 48-20v60H-4z', '#80CBC4', 0) + P('M-4 132h248v112H-4z', '#4FC3F7', 0) + Lc('M-4 132h248', INK, 3) + Lc('M20 210h40M170 226h50M120 196h30', '#B3E5FC', 3)
      + E(104, 184, 46, 10, '#A1887F') + R(92, 156, 24, 28, '#BCAAA4', 0, 3) + R(98, 164, 12, 20, '#5D4037', 0, 2)
      + ring(11, (k) => { const w = 60 - k * 4.4, y = 156 - k * 9.5; return P(`M${104 - w / 2} ${y}h${w}l-${w * 0.18} -8h-${w * 0.64}z`, '#37474F', 2.5) + (k < 10 ? R(102, y - 10, 4, 3, '#8D6E63', 0, 0) : ''); }) + Lc('M104 50v-10', INK, 3)
      + E(180, 184, 30, 8, '#A1887F') + R(170, 162, 20, 22, '#BCAAA4', 0, 3) + ring(3, (k) => { const w = 44 - k * 9, y = 162 - k * 10; return P(`M${180 - w / 2} ${y}h${w}l-${w * 0.18} -9h-${w * 0.64}z`, '#37474F', 2.5); })
      + Lc('M-4 112c40-6 80 2 120-2s80-8 128 0', '#FFFFFF', 4) + kid(36, 236, '#FF7043')),
  L('id/bali/landmark-brokenbeach.v1.svg', 'โบรเคนบีชซุ้มหินโค้งบนเกาะนูซาเปอนีดา', 'Broken Beach, the rock arch on Nusa Penida', ['broken beach', 'โบรเคนบีช', 'pasih uug', 'ปาซีห์อุก', 'nusa penida', 'นูซาเปอนีดา', 'rock arch', 'ซุ้มหินโค้ง', 'round cove', 'อ่าววงกลม'], 'หาซุ้มประตูหินที่ทะเลลอดเข้ามา', 'Find the stone arch the sea swims through',
    // a round cove of turquoise water ringed by tall honey-coloured cliffs with green grass on top; at the far side the cliff makes a big arch with the deep blue sea and white foam pushing through; a child on the clifftop
    sky('#B3E5FC') + P('M-4 96h248v30H-4z', '#1565C0', 0)
      + P('M-4 120c40-10 80-14 120-14s90 4 128 14v124H-4z', '#D9A55B', 3.5) + P('M-4 118c40-10 80-14 120-14s90 4 128 14l0 8c-40-8-80-12-128-12s-80 4-120 12z', '#7CB342', 3)
      + P('M90 152c0-34 60-34 60 0v20H90z', '#1E88E5', 3) + Lc('M96 170c8-6 16 4 24-2s16 4 24-2', '#FFFFFF', 3)
      + E(120, 200, 80, 34, '#26C6DA', 3) + E(120, 198, 56, 20, '#80DEEA', 0) + Lc('M70 192c12 4 24-4 36 0M134 206c12 4 24-4 36 0', '#FFFFFF', 3)
      + Lc('M20 150c10 10 10 30 0 40M220 150c-10 10-10 30 0 40', '#B9873E', 2.5) + face(40, 150, 0.35) + kid(204, 112, '#FFCA28')),
  L('id/bali/landmark-penglipuran.v1.svg', 'หมู่บ้านเปงลีปูรันถนนหินกับประตูหลังคาไม้ไผ่', 'Penglipuran, the tidy village of bamboo-roofed gates', ['penglipuran', 'เปงลีปูรัน', 'traditional village', 'หมู่บ้านดั้งเดิม', 'bamboo roof', 'หลังคาไม้ไผ่', 'stone path', 'ทางเดินหิน', 'bangli', 'บังลี'], 'หาประตูบ้านที่หน้าตาเหมือนกันเรียงเป็นแถว', 'Find the matching gates lined up the hill',
    // a neat stone-paved street climbing straight up a gentle hill, on each side a row of identical little earth-coloured gateways with thick brown bamboo-shingle roofs, flower pots and green hedges, a child walking up the middle
    sky('#E8F5E9') + P('M-4 92c60-20 180-20 248 0v20H-4z', '#81C784', 0)
      + P('M96 100h48l70 144H26z', '#BDBDBD', 3) + ring(6, (k) => Lc(`M${92 - k * 12} ${112 + k * 24}h${56 + k * 24}`, '#9E9E9E', 2))
      + [[-1, 0], [1, 0], [-1, 1], [1, 1], [-1, 2], [1, 2]].map(([sd, k]) => { const s = 0.55 + k * 0.28, x = 120 + sd * (40 + k * 34), y = 122 + k * 46; return g(x, y, s, R(-22, -30, 44, 40, '#C9A27A', 0, 3) + R(-8, -18, 16, 28, '#5D4037', 0, 2.5) + P('M-34-28h68l-12-24h-44z', '#8D6E63', 3) + Lc('M-30-34h60M-26-42h52', '#6D4C41', 2) + E(sd * 34, 6, 10, 8, '#43A047', 2.5) + C(sd * 34, 0, 3, '#F06292', 0)); }).join('')
      + kid(120, 220, '#AB47BC', 1.1)),
  L('id/bali/landmark-campuhan.v1.svg', 'ทางเดินสันเขาจัมปูฮันในอูบุด', 'The Campuhan Ridge Walk in Ubud', ['campuhan ridge walk', 'ทางเดินสันเขาจัมปูฮัน', 'ubud', 'อูบุด', 'ridge path', 'ทางเดินบนสันเขา', 'tall grass', 'หญ้าสูง', 'morning walk', 'เดินเล่นตอนเช้า'], 'หาทางเดินที่วิ่งไปตามสันเขาเขียว', 'Find the path running along the green ridge',
    // a long rounded green ridge between two misty jungle valleys, a pale paved path snaking along its spine through tall feathery grass, coconut palms on the slopes, the morning sun, two children walking
    sky('#FFF3E0') + C(190, 60, 22, '#FFCA28', 0) + P('M-4 140c40-20 60-8 80-24s50-16 70 0 60 10 98 0v128H-4z', '#A5D6A7', 0)
      + P('M-4 244c30-40 60-90 110-118 30-16 70-14 138 2v116z', '#7CB342', 3.5) + P('M60 244c20-40 50-80 84-104 18-10 40-12 62-8', '#E6D3A3', 0) + Lc('M60 244c20-40 50-80 84-104 18-10 40-12 62-8', '#C9A27A', 2)
      + ring(10, (k) => { const x = 20 + k * 22, y = 236 - k * 10; return Lc(`M${x} ${y}q-4-16 2-24M${x + 6} ${y}q2-14 8-20`, '#C5E1A5', 2.5); })
      + palm(24, 214, 70, 1) + palm(214, 150, 60, -1) + Lc('M-4 150c60 10 120 0 248-14', '#FFFFFF', 3) + kid(120, 168, '#29B6F6') + kid(96, 196, '#FF7043', 0.9)),
  L('id/bali/landmark-devilstear.v1.svg', 'หินน้ำตาปีศาจคลื่นพ่นฟองบนเกาะนูซาเลิมบองัน', "Devil's Tear, the waves that burst up on Nusa Lembongan", ["devil's tear", 'หินน้ำตาปีศาจ', 'nusa lembongan', 'นูซาเลิมบองัน', 'sea spray', 'ละอองคลื่น', 'wave splash', 'คลื่นซัดสาดสูง', 'rocky coast', 'ชายฝั่งหิน'], 'หาสายรุ้งเล็กๆ ในละอองคลื่น', 'Find the little rainbow in the spray',
    // a dark rocky ledge over a deep blue cove, a huge white fountain of wave spray bursting up out of a gap in the rocks with a little rainbow in the mist; a child standing well back on the ledge
    sky('#B3E5FC') + P('M-4 150h248v94H-4z', '#1565C0', 0) + Lc('M160 176h60M14 200h40', '#64B5F6', 3)
      + P('M60 152c-10-30-30-60-20-90 10 10 14 20 20 24 0-20 4-50 22-70 8 20 6 40 10 56 6-20 20-40 34-50 0 30-6 50 2 66 10-10 24-16 36-14-14 20-22 50-40 78z', '#FFFFFF', 3) + ring(10, (k) => C(40 + k * 18, 30 + (k % 3) * 18, 3 + (k % 2) * 2, '#E1F5FE', 1.5))
      + ['#EF5350', '#FFCA28', '#66BB6A', '#42A5F5'].map((c, k) => Lc(`M${70 + k * 5} 120c10-40 70-40 90 0`, c, 3.5)).join('')
      + P('M-4 170c20-14 40-10 60-6l20 10 30-10 20 20c40-6 60 0 118-4v64H-4z', '#455A64', 3.5) + Lc('M20 196l14 10M110 200l10-8M180 206l16 6', '#263238', 2.5)
      + face(110, 90, 0.45) + kid(208, 186, '#EF5350')),

  // ---------- Malaysia (the country)
  K('my.food.apambalik', 'อาปัมบาลิกแพนเค้กพับไส้ถั่ว', 'Apam balik, the folded peanut pancake', ['apam balik', 'อาปัมบาลิก', 'peanut pancake', 'แพนเค้กถั่ว', 'martabak manis', 'มาร์ตาบักมานิส', 'sweet corn', 'ข้าวโพดหวาน', 'street snack', 'ขนมข้างทาง'],
    // a thick golden pancake folded into a half moon on a paper sheet, the cut side showing a crunchy filling of crushed peanuts, sugar and yellow sweetcorn, a happy face on the crust
    P('M24 200l192-6-10 20H34z', '#FFF8E1') + P('M28 182c0-80 184-80 184 0z', '#E3A04A') + ring(8, (k) => C(56 + k * 18, 140 + (k % 2) * 10, 3, '#C77A2A', 0))
      + R(28, 176, 184, 22, '#F7D79A', 6, 3) + ring(16, (k) => C(38 + k * 11, 184 + (k % 3) * 4, k % 3 ? 3.5 : 4, k % 4 ? '#C9A27A' : '#FFD54F', 1.5)) + face(120, 140, 0.55)),
  K('my.food.lemang', 'เลอมังข้าวเหนียวเผาในกระบอกไม้ไผ่', 'Lemang, sticky rice cooked in bamboo', ['lemang', 'เลอมัง', 'bamboo rice', 'ข้าวหลาม', 'glutinous rice', 'ข้าวเหนียว', 'hari raya', 'ฮารีรายา', 'cooked over fire', 'ย่างบนไฟ'],
    // three green bamboo tubes leaning on a rail over glowing coals with little flames; in front a few cut slices of white sticky rice, each rolled in a banana-leaf ring, the big slice smiling
    Lc('M30 70h180', '#6D4C41', 6) + R(30, 150, 180, 20, '#5D4037', 6, 3) + ring(8, (k) => C(44 + k * 22, 148, 7, ['#FF7043', '#FFCA28'][k % 2], 2))
      + ring(3, (k) => g(70 + k * 52, 110, 1, R(-11, -60, 22, 104, '#7CB342', 6, 3) + Lc('M-11-20h22M-11 20h22', '#558B2F', 2.5) + E(0, -60, 11, 4, '#FFFFFF', 2), 12))
      + ring(3, (k) => P(`M${48 + k * 70} 146c-4-10 4-14 0-24 8 6 12 14 6 24z`, '#FF9800', 2))
      + [[80, 204, 0.8], [164, 208, 0.8], [122, 200, 1.1]].map(([x, y, s]) => g(x, y, s, E(0, 0, 26, 24, '#558B2F') + E(0, 0, 19, 17, '#FFFFFF', 2.5) + (s > 1 ? face(0, 0, 0.32) : ''))).join('')),
  K('my.culture.sepaktakraw', 'เซปักตะกร้อลูกหวาย', 'Sepak takraw, the rattan kick-ball game', ['sepak takraw', 'เซปักตะกร้อ', 'rattan ball', 'ลูกตะกร้อหวาย', 'kick volleyball', 'วอลเลย์บอลเท้า', 'net game', 'กีฬาข้ามตาข่าย', 'bicycle kick', 'เตะลังกา'],
    // a woven rattan ball with round holes and a happy face flying high over a net, with a sporty shoe swinging up from below to kick it and swoosh lines
    Lc('M10 196h220', INK, 4) + ring(2, (k) => Lc(`M10 ${172 + k * 12}h220`, '#90A4AE', 2)) + ring(11, (k) => Lc(`M${14 + k * 21} 166v30`, '#90A4AE', 2)) + Lc('M10 162v40M230 162v40', INK, 5)
      + C(110, 80, 50, '#E6B865') + ring(6, (k) => C(110 + Math.cos(k * 1.047) * 30, 80 + Math.sin(k * 1.047) * 30, 9, '#FFF8E1', 2.5)) + C(110, 80, 9, '#FFF8E1', 2.5)
      + ring(3, (k) => Lc(`M${66 + k * 4} ${46 + k * 14}c20-10 40-6 60 4`, '#C9963E', 2)) + face(110, 90, 0.6)
      + g(190, 140, 1, P('M-24 10l22-34 14 8-14 30z', '#29B6F6', 3) + P('M-10-26c2-14 20-18 30-10 8 6 4 16-6 18l-20 2z', '#FFFFFF', 3) + Lc('M-6-22l20-2', '#E53935', 3), -10)
      + Lc('M170 116c-10-16-24-26-42-30M196 104c-6-20-20-34-40-42', '#FF7043', 3)),
  K('my.animal.atlasmoth', 'ผีเสื้อกลางคืนแอตลาสตัวยักษ์', 'The giant Atlas moth', ['atlas moth', 'ผีเสื้อแอตลาส', 'giant moth', 'ผีเสื้อกลางคืนยักษ์', 'rainforest insect', 'แมลงป่าฝน', 'snake head wings', 'ปลายปีกหัวงู', 'cameron highlands', 'คาเมรอนไฮแลนด์'],
    // a huge moth with four orange-brown wings banded in white and black, little see-through triangle windows on each wing, curling wing tips like a snake's head, feathery antennae and a fluffy body with a happy face
    [[-1], [1]].map(([d]) => P(`M120 110c${d * -20}-40 ${d * -70}-80 ${d * -100}-70 ${d * -10} 6 ${d * -4} 20 ${d * -8} 30 ${d * -6} 20 ${d * 10} 40 ${d * 40} 50z`, '#D2691E')
      + P(`M${120 + d * -80} 46c${d * -14} 2 ${d * -18} 14 ${d * -8} 22 ${d * 8} 4 ${d * 12}-6 ${d * 8}-14`, '#FFCA28', 2.5) + C(120 + d * -86, 54, 2.5, INK, 0)
      + P(`M120 120c${d * -40} 0 ${d * -80} 20 ${d * -76} 60 ${d * 4} 20 ${d * 40} 20 ${d * 60}-10z`, '#C0561C')
      + Lc(`M${120 + d * -24} 92c${d * -20} 4 ${d * -46} 18 ${d * -64} 40M${120 + d * -20} 140c${d * -20} 6 ${d * -40} 20 ${d * -52} 40`, '#FFF3E0', 3)
      + P(`M${120 + d * -50} 90l${d * -10} 12h${d * 18}z`, '#FFFDE7', 2) + P(`M${120 + d * -40} 156l${d * -8} 10h${d * 14}z`, '#FFFDE7', 2)).join('')
      + E(120, 132, 13, 40, '#8D4A1E') + ring(4, (k) => Lc(`M108 ${110 + k * 14}h24`, '#6D3A16', 2)) + C(120, 94, 14, '#A0522D')
      + Lc('M114 82c-10-20-26-30-36-30M126 82c10-20 26-30 36-30', INK, 3) + ring(4, (k) => Lc(`M${100 - k * 6} ${64 - k * 2}l-4-8M${140 + k * 6} ${64 - k * 2}l4-8`, INK, 2)) + face(120, 96, 0.38)),

  // ---------- Kuala Lumpur
  L('my/kualalumpur/landmark-pasarseni.v1.svg', 'ตลาดกลางปาซาร์เซนีตึกอาร์ตเดโคสีฟ้า', 'Central Market, the blue art deco hall', ['central market', 'ตลาดกลาง', 'pasar seni', 'ปาซาร์เซนี', 'art deco', 'อาร์ตเดโค', 'handicrafts', 'งานหัตถกรรม', 'batik shops', 'ร้านผ้าบาติก'], 'หาเส้นตั้งสีขาวบนตึกสีฟ้า', 'Find the white stripes on the pale blue building',
    // a long low pale-blue and white art deco hall with a stepped tower front in the middle, tall thin white fins, round porthole windows and a wide entrance with an awning, a child on the pavement
    sky('#FFF8E1') + P('M-4 200h248v44H-4z', '#BDBDBD', 0) + Lc('M-4 200h248', INK, 3)
      + R(10, 120, 220, 80, '#81D4FA', 0, 3) + Lc('M10 132h220', '#FFFFFF', 4) + ring(9, (k) => R(20 + k * 24, 142, 12, 34, '#E1F5FE', 0, 2))
      + R(76, 70, 88, 130, '#4FC3F7', 0, 3) + R(90, 50, 60, 22, '#4FC3F7', 0, 3) + R(104, 36, 32, 16, '#29B6F6', 0, 3)
      + ring(5, (k) => R(88 + k * 14, 76, 6, 70, '#FFFFFF', 0, 2)) + C(120, 62, 7, '#FFFFFF', 2.5) + R(94, 166, 52, 34, '#0277BD', 0, 3) + P('M86 166h68l-6-10H92z', '#FFCA28', 2.5)
      + face(120, 112, 0.38) + kid(200, 236, '#EF5350')),
  L('my/kualalumpur/landmark-saloma.v1.svg', 'สะพานซาโลมาที่ส่องแสงสีรุ้งยามค่ำ', 'The Saloma Link bridge glowing at night', ['saloma link', 'สะพานซาโลมา', 'light bridge', 'สะพานไฟ', 'kampung baru', 'กัมปงบารู', 'pedestrian bridge', 'สะพานคนเดิน', 'night walk', 'เดินเล่นตอนค่ำ'], 'หาซุ้มโค้งที่เปลี่ยนสีไปเรื่อยๆ', 'Find the arches that glow in every colour',
    // a curving footbridge at night crossing a dark river and highway, a row of leaf-shaped arches over the deck each glowing a different rainbow colour, city towers lit behind, a child on the bridge
    sky('#1A237E') + ring(6, (k) => C(20 + k * 42, 24 + (k % 3) * 12, 2, '#FFF59D', 0)) + ring(5, (k) => R(10 + k * 48, 80 - (k % 2) * 30, 30, 120, '#3949AB', 0, 2.5) + ring(3, (j) => R(18 + k * 48, 92 - (k % 2) * 30 + j * 26, 6, 8, '#FFE082', 0, 0)))
      + P('M-4 196h248v48H-4z', '#0D47A1', 0) + Lc('M10 222h50M150 230h70', '#5C6BC0', 3)
      + ring(9, (k) => { const x = 14 + k * 26, y = 168 - Math.sin((k / 8) * Math.PI) * 26; return P(`M${x - 12} ${y}c0-30 6-46 12-52 6 6 12 22 12 52`, 'none', 0) + Lc(`M${x - 12} ${y}c0-30 6-46 12-52 6 6 12 22 12 52`, ['#FF5252', '#FF9800', '#FFEB3B', '#69F0AE', '#40C4FF', '#7C4DFF', '#FF4081', '#FFEB3B', '#69F0AE'][k], 5); })
      + Lc(ring(9, (k) => `${k ? 'L' : 'M'}${2 + k * 26.5} ${(168 - Math.sin((k / 8) * Math.PI) * 26).toFixed(1)}`), '#ECEFF1', 6) + Lc('M60 170v30M180 170v30', '#78909C', 6)
      + kid(118, 140, '#FFCA28')),
  L('my/kualalumpur/landmark-istananegara.v1.svg', 'อิสตานาเนอการาพระราชวังโดมทอง', 'Istana Negara, the palace of golden domes', ['istana negara', 'อิสตานาเนอการา', 'national palace', 'พระราชวังแห่งชาติ', 'golden domes', 'โดมทอง', 'palace gates', 'ประตูพระราชวัง', 'jalan duta', 'ชาลันดูตา'], 'หาโดมสีทองสามลูกบนหลังคา', 'Find the three golden domes on the roof',
    // a wide cream palace with a big golden onion dome in the middle and smaller golden domes either side, and in front a tall ornate golden gate with a crest arch and two little sentry boxes, green lawn
    sky('#E3F2FD') + P('M-4 196h248v48H-4z', '#81C784', 0) + Lc('M-4 196h248', INK, 3)
      + R(20, 96, 200, 60, '#FFF3E0', 0, 3) + ring(8, (k) => R(32 + k * 24, 108, 10, 30, '#BCAAA4', 4, 2)) + R(84, 70, 72, 30, '#FFF3E0', 0, 3)
      + P('M90 72c0-30 18-46 30-50 12 4 30 20 30 50z', '#FFC107', 3) + Lc('M120 22v-12', INK, 3) + C(120, 8, 3, '#FFC107', 2)
      + [[44, 96], [196, 96]].map(([x, y]) => P(`M${x - 16} ${y}c0-20 10-30 16-32 6 2 16 12 16 32z`, '#FFC107', 3)).join('')
      + Lc('M40 156v40M200 156v40', '#FFB300', 8) + Lc('M40 156v40M200 156v40', INK, 2) + ring(13, (k) => Lc(`M${52 + k * 11} 196v-36`, '#FFB300', 3))
      + P('M84 162c0-30 72-30 72 0', 'none', 0) + Lc('M84 162c0-30 72-30 72 0', '#FFB300', 5) + C(120, 140, 10, '#FFC107', 2.5)
      + [[18, 196], [222, 196]].map(([x, y]) => R(x - 9, y - 30, 18, 30, '#ECEFF1', 0, 2.5) + P(`M${x - 12} ${y - 30}l12-10 12 10z`, '#E53935', 2.5)).join('')),
  L('my/kualalumpur/landmark-kampungbaru.v1.svg', 'บ้านไม้มลายูในกัมปงบารูกับตึกสูงข้างหลัง', 'A wooden Malay house in Kampung Baru under the towers', ['kampung baru', 'กัมปงบารู', 'malay house', 'บ้านมลายู', 'wooden stilt house', 'บ้านไม้ใต้ถุนสูง', 'old village', 'หมู่บ้านเก่า', 'nasi lemak stalls', 'ร้านนาซิเลอมัก'], 'หาบ้านไม้หลังเล็กหน้าตึกสูง', 'Find the little wooden house in front of the tall towers',
    // a little wooden Malay house on stilts with a steep two-tier roof, carved fretwork under the gable, wooden steps up to the porch and potted plants, with shiny glass towers rising close behind it
    sky('#E1F5FE') + [[30, 30, 40, '#90CAF9'], [80, 10, 36, '#64B5F6'], [176, 20, 44, '#4FC3F7'], [216, 50, 30, '#90CAF9']].map(([x, y, w, c]) => R(x - w / 2, y, w, 220, c, 0, 3) + ring(Math.floor((200 - y) / 26), (k) => Lc(`M${x - w / 2 + 4} ${y + 14 + k * 26}h${w - 8}`, '#E3F2FD', 2))).join('')
      + P('M-4 206h248v38H-4z', '#8BC34A', 0) + Lc('M-4 206h248', INK, 3)
      + ring(5, (k) => R(52 + k * 34, 168, 8, 40, '#6D4C41', 0, 2.5)) + R(46, 120, 148, 50, '#C68B59', 0, 3) + ring(8, (k) => Lc(`M${56 + k * 18} 124v42`, '#A86B3C', 2))
      + R(70, 132, 22, 24, '#FFF8E1', 0, 2.5) + R(148, 132, 22, 24, '#FFF8E1', 0, 2.5) + Lc('M81 132v24M159 132v24', INK, 2)
      + P('M30 122l90-60 90 60z', '#8D4A2B', 3.5) + P('M78 96l42-28 42 28z', '#D7A86E', 2.5) + ring(5, (k) => C(102 + k * 9, 88, 3, '#FFF8E1', 1.5))
      + ring(4, (k) => Lc(`M${104 + k * 6} ${170 + k * 9}h22`, '#6D4C41', 4)) + E(30, 202, 12, 10, '#43A047', 2.5) + C(30, 196, 3, '#E91E63', 0) + kid(214, 236, '#FF7043')),
  L('my/kualalumpur/landmark-birdpark.v1.svg', 'สวนนกกัวลาลัมเปอร์ใต้ตาข่ายยักษ์', 'KL Bird Park under its giant net', ['kl bird park', 'สวนนกกัวลาลัมเปอร์', 'free-flight aviary', 'กรงนกบินอิสระ', 'lorikeets', 'นกแก้วโนรี', 'bird feeding', 'ให้อาหารนก', 'perdana botanical garden', 'สวนเปอร์ดานา'], 'หานกแก้วสีรุ้งที่เกาะแขนเด็ก', 'Find the rainbow parrot sitting on the child’s arm',
    // inside a huge walk-in net dome over tropical trees, colourful lorikeets flying and one rainbow lorikeet sitting on a child's arm sipping from a little nectar cup, a big pink-and-red parrot on a branch
    sky('#E8F5E9') + ring(7, (k) => Lc(`M${-4 + k * 42} 0c10 30 20 60 0 90`, '#B0BEC5', 1.5)) + Lc('M-4 40c80-30 168-30 248 0M-4 80c80-30 168-30 248 0', '#B0BEC5', 1.5)
      + C(40, 150, 40, '#66BB6A', 3) + C(210, 140, 36, '#81C784', 3) + P('M-4 206h248v38H-4z', '#A1887F', 0) + Lc('M-4 206h248', INK, 3) + Lc('M170 150c20 0 40 4 70-6', '#6D4C41', 6)
      + g(206, 132, 1, E(0, 0, 12, 18, '#E53935', 2.5) + C(0, -16, 10, '#E53935', 2.5) + P('M8-18l10 4-8 6z', '#FFF8E1', 2) + P('M-6 14l-6 24 12-8z', '#1E88E5', 2) + C(2, -18, 2, INK, 0))
      + [[60, 50, -20], [150, 40, 15], [100, 90, 0]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 12, 6, '#43A047', 2) + C(10, -2, 6, '#3F51B5', 2) + P('M-4-4l-10-12 16 6z', '#FFCA28', 2) + P('M-4 4l-10 10 14-4z', '#FF7043', 2), r)).join('')
      + g(110, 236, 1.6, C(0, -20, 9, '#FFE0BD', 2) + P('M-10 6v-18h20v18z', '#FFCA28', 2) + face(0, -18, 0.24, 'o') + Lc('M10-6l22-8', '#FFE0BD', 4) + R(30, -20, 8, 8, '#FFFFFF', 2, 1.5))
      + g(160, 200, 1, E(0, 0, 10, 14, '#43A047', 2.5) + C(0, -14, 9, '#3F51B5', 2.5) + E(0, -2, 7, 5, '#FF7043', 0) + P('M-8-16l-6 4 6 2z', '#FF7043', 2) + C(-3, -16, 2, INK, 0) + P('M0 12l-4 14 8 0z', '#43A047', 2))),

  // ---------- The Maldives (the country)
  K('mv.food.garudhiya', 'การุธิยาซุปปลาทูน่าใสกับข้าว', 'Garudhiya, clear tuna broth with rice', ['garudhiya', 'การุธิยา', 'fish broth', 'ซุปปลา', 'tuna soup', 'ซุปทูน่า', 'rice and lime', 'ข้าวกับมะนาว', 'maldivian lunch', 'อาหารกลางวันมัลดีฟส์'],
    // a deep bowl of clear golden fish broth with chunks of tuna, a smiling face on the bowl; on the plate beside it a mound of white rice, a half lime, red chillies and sliced onion
    E(120, 196, 108, 30, '#ECEFF1') + E(64, 182, 40, 18, '#FFFFFF', 2.5) + ring(6, (k) => C(44 + k * 8, 176 + (k % 2) * 6, 4, '#FAFAFA', 1.5))
      + g(42, 206, 1, P('M-14 0a14 14 0 0 1 28 0z', '#9CCC65') + P('M-10 0a10 10 0 0 1 20 0z', '#DCEDC8', 0) + Lc('M0 0v-9M0 0l-7-6M0 0l7-6', '#9CCC65', 1.5))
      + [[200, 196, -20], [214, 182, 10]].map(([x, y, r]) => g(x, y, 1, P('M-14 0c4-6 20-6 26 0-6 4-20 4-26 0zM12 0l5-2', '#E53935', 2), r)).join('') + E(98, 214, 10, 5, '#F3E5F5', 2)
      + P('M100 120c0 50 26 70 60 70s60-20 60-70z', '#80CBC4') + E(160, 120, 60, 16, '#FFE082') + ring(4, (k) => R(124 + k * 18, 112 + (k % 2) * 6, 14, 10, '#BCAAA4', 3, 2)) + Lc('M140 100c-6-10 6-14 0-24M176 100c-6-10 6-14 0-24', '#B0BEC5', 3) + face(160, 154, 0.55)),
  K('mv.animal.parrotfish', 'ปลานกแก้วที่กินปะการังแล้วถ่ายเป็นทราย', 'A parrotfish that turns coral into sand', ['parrotfish', 'ปลานกแก้ว', 'coral nibbler', 'กินปะการัง', 'white sand', 'ทรายขาว', 'beak teeth', 'ฟันจะงอย', 'reef fish', 'ปลาแนวปะการัง'],
    // a big round turquoise-and-pink parrotfish with scale patterns and a parrot-like beak nibbling a lump of coral, a little cloud of white sand puffing out behind its tail, bubbles above
    P('M40 210c10-30 20-40 40-50 10 10 6 30 20 30s10-30 24-36c10 16 10 46 6 56z', '#FF8A65') + ring(4, (k) => C(60 + k * 18, 196 + (k % 2) * 6, 3, '#FFCCBC', 0))
      + P('M196 110l30-24c4 20 4 40 0 60z', '#4DD0E1') + P('M196 110l30-24c4 20 4 40 0 60z', '#4DD0E1')
      + E(130, 112, 72, 52, '#4DD0E1') + ring(10, (k) => P(`M${100 + (k % 5) * 18} ${92 + Math.floor(k / 5) * 26}q8 8 0 16`, 'none', 0) + Lc(`M${100 + (k % 5) * 18} ${92 + Math.floor(k / 5) * 26}q8 8 0 16`, '#F48FB1', 3)) + P('M110 64c20-10 50-10 70 4l-10 10c-14-6-36-8-52-4z', '#F48FB1', 2.5)
      + P('M62 96c-12 6-14 22-2 30l14-4c-4-6-4-16 2-22z', '#FFF8E1', 3) + Lc('M60 112h14', INK, 2) + P('M120 148c6 14 20 18 30 12l-10-14z', '#F48FB1', 2.5)
      + ring(5, (k) => C(214 + (k % 2) * 10, 160 + k * 10, 5 - k * 0.6, '#FFFDE7', 1.5)) + ring(3, (k) => C(84 + k * 10, 50 - k * 14, 4, '#E1F5FE', 2)) + face(108, 104, 0.5)),
  K('mv.animal.whitetern', 'นกนางนวลแกลบขาวกับไข่บนกิ่งไม้', 'A white fairy tern and its egg on a bare branch', ['white tern', 'นกนางนวลแกลบขาว', 'fairy tern', 'นกแฟรีเทิร์น', 'addu atoll', 'อะทอลล์อัดดู', 'egg on a branch', 'ไข่บนกิ่งไม้', 'seabird', 'นกทะเล'],
    // a snow-white seabird with big dark eyes and a blue-black beak perched on a bare grey branch, its one speckled egg balanced on the branch in front of it, a little heart floating up
    Lc('M10 170c40-10 80-6 120-4 40 2 70-4 100-16', '#8D6E63', 9) + Lc('M150 166c10-14 24-20 40-22', '#8D6E63', 6)
      + E(70, 156, 12, 15, '#FFF8E1', 2.5) + ring(4, (k) => C(64 + (k % 2) * 10, 150 + Math.floor(k / 2) * 10, 2, '#A1887F', 0))
      + P('M110 160c-6-30 10-60 40-62 26-2 46 20 44 44-20 10-50 18-84 18z', '#FFFFFF') + P('M140 120c20 10 50 30 80 30-20 10-50 8-70 0z', '#ECEFF1', 3)
      + P('M196 108l34 2-32 8z', '#283593', 2.5) + C(178, 104, 6, INK, 0) + C(176, 102, 2, '#FFFFFF', 0) + E(166, 116, 6, 4, '#FF8FA3', 0) + Lc('M168 122q6 4 12 0', INK, 2.5)
      + Lc('M136 160l-4 12M152 160l2 12', INK, 3) + P('M100 72c-6-8-18-2-12 8l12 10 12-10c6-10-6-16-12-8z', '#FF8FA3', 2.5)),
  K('mv.culture.joali', 'โจอาลีเก้าอี้ตาข่ายเชือกริมหาด', 'A joali, the Maldivian rope-net seat', ['joali', 'โจอาลี', 'rope seat', 'เก้าอี้เชือก', 'net chair', 'เก้าอี้ตาข่าย', 'beach lounging', 'นั่งเล่นริมหาด', 'coir rope', 'เชือกใยมะพร้าว'],
    // a wooden frame on four legs holding a deep sagging seat of woven coconut rope net, a striped cushion on it, standing on white sand by a little palm frond, a smiling face on the frame
    E(120, 214, 104, 14, '#FFF3C4', 0) + Lc('M40 210l20-110M200 210l-20-110M70 210l10-80M170 210l-10-80', '#8D6E63', 7) + Lc('M50 104h140', '#8D6E63', 8)
      + P('M56 106c10 70 118 70 128 0z', '#E6C27A') + ring(5, (k) => Lc(`M${66 + k * 24} 108c0 30 0 50 4 64`, '#A1673F', 2)) + ring(3, (k) => Lc(`M${62 + k * 4} ${120 + k * 16}c30 ${12 - k * 2} 90 ${12 - k * 2} ${116 - k * 8} 0`, '#A1673F', 2))
      + g(120, 150, 1, R(-30, -10, 60, 20, '#29B6F6', 10, 2.5) + Lc('M-14-10v20M2-10v20M18-10v20', '#FFFFFF', 3), -6)
      + face(120, 86, 0.4) + Lc('M210 210c4-30 10-50 20-60M214 180c-10-6-20-6-26 0M220 160c8-8 14-8 20-6', '#43A047', 4)),

  // ---------- The Maldives atolls
  L('mv/atolls/landmark-atollring.v1.svg', 'วงแหวนอะทอลล์มองจากหน้าต่างเครื่องบิน', 'An atoll ring seen from the plane window', ['atoll from the air', 'อะทอลล์จากมุมสูง', 'plane window', 'หน้าต่างเครื่องบิน', 'ring of islands', 'วงแหวนเกาะ', 'turquoise lagoon', 'ลากูนสีฟ้าคราม', 'flying in', 'บินเข้ามัลดีฟส์'], 'หาเกาะเล็กๆ ที่เรียงกันเป็นวงกลม', 'Find the little islands in a circle',
    // a rounded airplane window frame looking down on deep blue ocean with a big ring-shaped reef of pale turquoise, little sandy islands with palms along the ring and a calm lagoon in the middle, a wing tip at the corner
    R(4, 4, 232, 232, '#ECEFF1', 60, 3.5) + R(26, 22, 188, 196, '#1565C0', 50, 3) + E(120, 120, 74, 64, '#4DD0E1', 3) + E(120, 120, 52, 44, '#80DEEA', 2.5)
      + ring(8, (k) => { const a = (k / 8) * Math.PI * 2, x = 120 + Math.cos(a) * 63, y = 120 + Math.sin(a) * 54; return E(x, y, 9, 6, '#FFF3C4', 2) + C(x, y - 2, 4, '#43A047', 1.5); })
      + ring(3, (k) => Lc(`M${50 + k * 50} ${200 - k * 4}c10-4 20 4 30 0`, '#64B5F6', 2.5)) + P('M150 210l64-44v18l-50 34z', '#B0BEC5', 3) + Lc('M214 166v18', '#E53935', 4)
      + face(120, 118, 0.42) + R(100, 10, 40, 6, '#B0BEC5', 3, 2)),
  L('mv/atolls/landmark-coralgarden.v1.svg', 'โครงปลูกปะการังใต้ทะเล', 'Planting baby corals on reef frames', ['coral planting', 'ปลูกปะการัง', 'reef restoration', 'ฟื้นฟูแนวปะการัง', 'coral frames', 'โครงปะการัง', 'marine biologist', 'นักชีววิทยาทางทะเล', 'adopt a coral', 'รับเลี้ยงปะการัง'], 'หาปะการังเด็กที่เกาะอยู่บนโครงเหล็ก', 'Find the baby corals growing on the frames',
    // under turquoise water, dome-shaped metal frames on the sandy floor with little bright coral pieces tied all over them, small fish around, a snorkelling child above holding a baby coral
    sky('#4DD0E1') + ring(4, (k) => Lc(`M${k * 70} 0l40 120`, '#80DEEA', 8)) + P('M-4 196c60-10 180-10 248 0v48H-4z', '#FFF3C4', 0)
      + [[70, 200, 1], [170, 206, 0.8]].map(([x, y, s]) => g(x, y, s, P('M-50 0c0-60 100-60 100 0', 'none', 0) + Lc('M-50 0c0-60 100-60 100 0M-25 0c0-56 50-56 50 0M-48-18h96M-36-36h72', '#78909C', 4)
        + [[-40, -14, '#FF7043'], [-20, -36, '#F06292'], [6, -44, '#FFCA28'], [30, -30, '#AB47BC'], [42, -10, '#66BB6A'], [-6, -18, '#29B6F6']].map(([x2, y2, c]) => g(x2, y2, 1, Lc('M0 0v-10M0-6l-6-6M0-6l6-6', c, 4))).join('') + face(0, -10, 0.3))).join('')
      + fish(190, 120, 1.2, '#FFCA28') + fish(36, 120, 1, '#FF7043', -1)
      + g(130, 60, 1.3, E(0, 0, 26, 9, '#FFE0BD', 2) + C(-26, -2, 9, '#FFE0BD', 2) + R(-34, -8, 12, 7, '#29B6F6', 3, 1.5) + Lc('M-22-8l4-14', '#FF7043', 3) + R(-2, -2, 20, 9, '#E91E63', 3, 1.5) + Lc('M-12 8v14', '#FFE0BD', 3.5) + Lc('M-16 24l-2 6 6 2', '#F06292', 3), 8)),
  L('mv/atolls/landmark-shipwreck.v1.svg', 'ซากเรือจมใต้น้ำที่ฝูงปลามาอาศัย', 'An old shipwreck where the fish live now', ['shipwreck', 'ซากเรือจม', 'wreck snorkel', 'ดำน้ำดูซากเรือ', 'artificial reef', 'แนวปะการังเทียม', 'fish school', 'ฝูงปลา', 'underwater', 'ใต้น้ำ'], 'หาปลาที่ว่ายลอดหน้าต่างเรือ', 'Find the fish swimming through the ship’s window',
    // an old wooden boat lying tilted on the sandy sea floor, its mast leaning, soft corals and sea fans growing on it, a school of yellow fish swimming through round portholes, a snorkelling child at the top
    sky('#26C6DA') + ring(3, (k) => Lc(`M${20 + k * 80} 0l30 100`, '#80DEEA', 10)) + P('M-4 200c60-12 180-12 248 0v44H-4z', '#FFE0A3', 0)
      + g(116, 176, 1, P('M-90-10h170l-20 40H-70z', '#8D6E63', 3.5) + ring(4, (k) => Lc(`M-80 ${k * 8}h150`, '#6D4C41', 2)) + ring(3, (k) => C(-46 + k * 40, 6, 8, '#1565C0', 2.5)) + Lc('M-10-10l40-90', '#6D4C41', 6) + Lc('M14-60h-30', '#6D4C41', 4), -8)
      + P('M50 168c-6-20 4-30 0-44M58 166c6-14 14-20 12-36', '#F06292', 4) + P('M170 150c0-20 20-30 30-26-6 10-20 18-30 26z', '#AB47BC', 2.5)
      + ring(6, (k) => fish(60 + k * 20, 172 - (k % 2) * 10, 0.7, '#FFEB3B')) + face(120, 196, 0.35)
      + g(150, 40, 1.2, E(0, 0, 26, 9, '#FFE0BD', 2) + C(-26, -2, 9, '#FFE0BD', 2) + R(-34, -8, 12, 7, '#FFCA28', 3, 1.5) + Lc('M-22-8l4-14', '#29B6F6', 3) + R(-2, -2, 20, 9, '#26A69A', 3, 1.5))),
  L('mv/atolls/landmark-floatingbreakfast.v1.svg', 'อาหารเช้าลอยน้ำในสระวิลล่า', 'A floating breakfast in the villa pool', ['floating breakfast', 'อาหารเช้าลอยน้ำ', 'villa pool', 'สระวิลล่า', 'breakfast tray', 'ถาดอาหารเช้า', 'tropical fruit', 'ผลไม้เมืองร้อน', 'resort morning', 'เช้าที่รีสอร์ต'], 'หาถาดอาหารที่ลอยอยู่ในสระ', 'Find the breakfast tray floating in the pool',
    // a turquoise villa pool on a wooden deck by the lagoon, a big round woven tray floating on the water loaded with pancakes, a fruit plate, a coconut with a straw and a flower, a child swimming up to it in a ring
    sky('#FFF8E1') + P('M-4 70h248v40H-4z', '#4FC3F7', 0) + R(-4, 106, 248, 138, '#D7A86E', 0, 0) + ring(5, (k) => Lc(`M-4 ${120 + k * 28}h248`, '#B9873E', 2))
      + R(14, 124, 212, 110, '#4DD0E1', 16, 3.5) + ring(3, (k) => Lc(`M${30 + k * 64} ${150 + (k % 2) * 60}c10-6 20 6 30 0`, '#B2EBF2', 3))
      + E(124, 170, 60, 30, '#C9A04F', 3) + E(124, 166, 52, 24, '#E6C27A', 2.5)
      + ring(3, (k) => E(98, 168 - k * 5, 18, 6, '#F2B544', 2)) + P('M86 152c4-4 20-4 24 0', '#8D4A2B', 2) + E(134, 172, 16, 9, '#FFFFFF', 2) + C(128, 170, 5, '#FF7043', 1.5) + C(140, 172, 5, '#AED581', 1.5) + C(134, 166, 4, '#FFEB3B', 1.5)
      + C(158, 156, 13, '#8D6E63', 2.5) + C(158, 156, 8, '#FFFFFF', 0) + Lc('M162 150l10-16', '#E91E63', 3) + C(118, 152, 6, '#F06292', 2) + face(124, 186, 0.35)
      + g(56, 212, 1.2, C(0, 0, 14, '#FF7043', 3) + C(0, 0, 7, '#4DD0E1', 2) + C(0, -16, 9, '#FFE0BD', 2) + face(0, -14, 0.24))),
  L('mv/atolls/landmark-thoddoo.v1.svg', 'ไร่แตงโมบนเกาะโธดดู', 'The watermelon farms of Thoddoo island', ['thoddoo', 'เกาะโธดดู', 'watermelon farm', 'ไร่แตงโม', 'local island', 'เกาะชาวบ้าน', 'island farm', 'ไร่บนเกาะ', 'papaya', 'มะละกอ'], 'หาแตงโมลูกใหญ่ที่ยิ้มอยู่ในไร่', 'Find the big smiling watermelon in the field',
    // a sandy green farm field on a tropical island with rows of striped watermelons on curly vines, papaya trees and coconut palms at the edge, turquoise sea behind, a child holding a big red slice
    sky('#E1F5FE') + P('M-4 96h248v24H-4z', '#4DD0E1', 0) + P('M-4 116h248v128H-4z', '#E6D3A3', 0) + Lc('M-4 116h248', INK, 3)
      + palm(20, 140, 50, 1) + palm(220, 136, 44, -1) + g(184, 132, 1, Lc('M0 0v-34', '#8D6E63', 4) + ring(4, (k) => Lc(`M0-34l${-16 + k * 10} -${8 - (k % 2) * 6}`, '#43A047', 4)) + C(-4, -26, 4, '#FFA000', 1.5) + C(4, -24, 4, '#FFA000', 1.5))
      + ring(3, (k) => Lc(`M${-4} ${150 + k * 30}c40-8 80 8 120 0s80-8 128 0`, '#66BB6A', 3))
      + [[40, 152, 0.6], [100, 150, 0.6], [160, 156, 0.6], [60, 186, 0.8], [180, 192, 0.8]].map(([x, y, s]) => g(x, y, s, E(0, 0, 24, 17, '#43A047') + Lc('M-14-12q-4 12 0 24M0-16v32M14-12q4 12 0 24', '#1B5E20', 3))).join('')
      + g(110, 210, 1.4, E(0, 0, 24, 17, '#43A047') + Lc('M-14-12q-4 12 0 24M0-16v32M14-12q4 12 0 24', '#1B5E20', 3) + face(0, 0, 0.36))
      + g(36, 236, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#29B6F6', 2) + face(0, -18, 0.22) + P('M8-14l20-6 0 16z', '#EF5350', 2) + Lc('M8-14l20 10', '#43A047', 2.5))),

  // ---------- Penang
  L('my/penang/landmark-charkwayteow.v1.svg', 'ผัดก๋วยเตี๋ยวชาร์ก๋วยเตี๋ยวปีนังในกระทะไฟลุก', 'Penang char kway teow tossed in a flaming wok', ['char kway teow', 'ชาร์ก๋วยเตี๋ยว', 'fried flat noodles', 'ก๋วยเตี๋ยวผัด', 'wok hei', 'กลิ่นกระทะ', 'prawns and cockles', 'กุ้งกับหอยแครง', 'hawker stall', 'แผงขายอาหาร'], 'หาไฟที่ลุกพรึ่บใต้กระทะ', 'Find the big flame under the wok',
    // a big black wok over leaping orange flames, flat brown rice noodles flying up from it with prawns, cockles, bean sprouts and green chives, a smiling face on the wok and a long-handled ladle
    sky('#FFF3E0') + ring(5, (k) => P(`M${70 + k * 25} 220c-10-20 4-30 0-50 14 10 22 30 10 50z`, ['#FF7043', '#FFCA28'][k % 2], 2.5))
      + P('M30 140c0 50 40 70 90 70s90-20 90-70z', '#37474F', 3.5) + Lc('M210 146l26-6', '#6D4C41', 7) + E(120, 140, 90, 18, '#8D6E63', 3)
      + ring(7, (k) => Lc(`M${60 + k * 20} 140c-4-30 10-40 4-${60 + (k % 3) * 10}`, '#B07A4A', 6)) + ring(7, (k) => Lc(`M${60 + k * 20} 140c-4-30 10-40 4-${60 + (k % 3) * 10}`, '#D9A066', 2.5))
      + [[70, 96], [150, 86], [118, 66]].map(([x, y]) => P(`M${x} ${y}c-10-12 6-20 16-12 6 6 0 14-8 12`, '#FF8A65', 2.5)).join('') + [[96, 110], [174, 112]].map(([x, y]) => E(x, y, 8, 6, '#A1887F', 2)).join('')
      + ring(6, (k) => Lc(`M${80 + k * 14} ${120 - (k % 2) * 20}l4 10`, '#FFFDE7', 3)) + ring(4, (k) => Lc(`M${84 + k * 22} ${100 + (k % 2) * 12}l8-6`, '#43A047', 3))
      + face(120, 172, 0.55) + Lc('M190 40l-40 80', '#90A4AE', 4) + E(146, 124, 10, 6, '#B0BEC5', 2)),
  L('my/penang/landmark-cendol.v1.svg', 'เจ็นดลน้ำแข็งไสกะทิของถนนปีนัง', 'A bowl of Penang Road cendol', ['cendol', 'เจ็นดล', 'penang road', 'ถนนปีนัง', 'green jelly', 'วุ้นเส้นเขียว', 'gula melaka', 'น้ำตาลโตนด', 'coconut milk', 'น้ำกะทิ'], 'หาเส้นวุ้นสีเขียวในชาม', 'Find the wiggly green jelly in the bowl',
    // a glass bowl full of coconut milk and shaved ice heaped up, wiggly green pandan jelly strands, red beans and dark brown palm-sugar syrup trickling down; a spoon in it and a stall cart roof stripe behind
    sky('#FFF8E1') + P('M-4 -4h248v40H-4z', '#E53935', 0) + ring(6, (k) => P(`M${-4 + k * 44} 36c0 16 44 16 44 0`, ['#FFFFFF', '#E53935'][k % 2], 2.5))
      + E(120, 214, 70, 10, '#BCAAA4', 0) + P('M40 140c0 50 30 70 80 70s80-20 80-70z', '#E0F7FA', 3.5) + P('M48 150c4 36 30 52 72 52s68-16 72-52z', '#FFF8E1', 0)
      + ring(9, (k) => Lc(`M${58 + k * 16} 160c6 10-6 16 0 26`, '#66BB6A', 5)) + ring(6, (k) => C(66 + k * 22, 192 - (k % 2) * 6, 4.5, '#8D2F2F', 1.5))
      + P('M44 140c10-50 50-70 76-70s66 20 76 70z', '#FFFFFF', 3.5) + P('M90 84c10 10 4 30 12 40s0 30 6 40M130 80c-6 16 8 30 0 46', '#6D3A16', 0) + Lc('M100 80c10 14 0 30 10 44M134 78c-6 18 8 32 0 50M74 104c6 10 0 20 6 30', '#6D3A16', 6)
      + Lc('M168 70l-20 70', '#B0BEC5', 6) + Lc('M168 70l-20 70', INK, 2) + face(120, 172, 0.5)),
  L('my/penang/landmark-spicegarden.v1.svg', 'สวนเครื่องเทศเขตร้อนกับลูกจันทน์เทศ', 'The Tropical Spice Garden and its nutmegs', ['tropical spice garden', 'สวนเครื่องเทศเขตร้อน', 'nutmeg', 'ลูกจันทน์เทศ', 'mace', 'ดอกจันทน์', 'spice trail', 'เส้นทางเครื่องเทศ', 'teluk bahang', 'เตอลุกบาฮัง'], 'หาลูกจันทน์เทศที่แตกออกเห็นเยื่อสีแดง', 'Find the nutmeg that split open to show the red lace',
    // a leafy garden path of stepping stones winding under a nutmeg tree; hanging from its branch big pale-yellow fruits, the front one split open to show a brown seed wrapped in red lacy mace; a child looking up
    sky('#F1F8E9') + P('M-4 190h248v54H-4z', '#7CB342', 0) + Lc('M-4 190h248', INK, 3) + ring(5, (k) => E(60 + k * 30 - k * k * 2, 236 - k * 12, 16 - k * 2, 6 - k * 0.6, '#BDBDBD', 2.5))
      + Lc('M30 190V90', '#6D4C41', 9) + C(60, 70, 50, '#388E3C', 3) + C(130, 50, 44, '#43A047', 3) + C(200, 76, 40, '#388E3C', 3) + Lc('M30 100c50 0 100-10 160 0', '#6D4C41', 6)
      + ring(5, (k) => P(`M${40 + k * 36} ${70 - (k % 2) * 20}c-14 0-14-14 0-20 14 6 14 20 0 20z`, '#81C784', 2))
      + [[80, 116], [178, 116]].map(([x, y]) => Lc(`M${x} 100v${y - 108}`, INK, 2.5) + C(x, y, 13, '#FFF59D', 2.5)).join('')
      + Lc('M130 100v14', INK, 2.5) + P('M106 140c0-26 48-26 48 0 0 22-48 22-48 0z', '#FFF59D', 3) + E(130, 142, 14, 16, '#6D4C41', 2.5) + Lc('M120 130c6 8-6 16 4 24M134 128c-6 10 8 18 0 28M142 134c-6 6 4 14-2 18', '#E53935', 3)
      + face(130, 162, 0.3) + kid(184, 236, '#FF7043', 1.1)),
  L('my/penang/landmark-cityhall.v1.svg', 'ศาลาว่าการเมืองปีนังสีขาวริมสนามปาดัง', 'Penang City Hall on the Esplanade', ['penang city hall', 'ศาลาว่าการเมืองปีนัง', 'dewan bandaraya', 'เดวันบันดารายา', 'esplanade', 'เอสพลานาด', 'padang kota lama', 'ปาดังโกตาลามา', 'colonial building', 'ตึกยุคอาณานิคม'], 'หาโดมเล็กๆ สีเขียวบนมุมตึก', 'Find the little green domes on the corners',
    // a grand white colonial hall with rows of columns and arched windows on two floors, a pediment in the middle and small green-copper domes on the corner towers, a wide green field in front with a child flying a little kite
    sky('#B3E5FC') + P('M-4 190h248v54H-4z', '#81C784', 0) + Lc('M-4 190h248', INK, 3)
      + R(20, 90, 200, 100, '#FFFFFF', 0, 3) + Lc('M20 140h200', '#CFD8DC', 4) + ring(9, (k) => R(30 + k * 21, 100, 9, 34, '#B3E5FC', 4, 2) + R(30 + k * 21, 150, 9, 36, '#B3E5FC', 4, 2))
      + ring(6, (k) => R(88 + k * 12, 140, 6, 50, '#ECEFF1', 0, 2)) + P('M80 92l40-26 40 26z', '#FFFFFF', 3) + C(120, 82, 6, '#FFCA28', 2)
      + [[30, 90], [210, 90]].map(([x, y]) => R(x - 14, y - 30, 28, 30, '#FFFFFF', 0, 3) + P(`M${x - 14} ${y - 30}c0-24 28-24 28 0z`, '#4DB6AC', 3) + Lc(`M${x} ${y - 52}v-8`, INK, 2.5)).join('')
      + g(176, 236, 1, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#AB47BC', 2) + face(0, -18, 0.22)) + Lc('M184 222l26-62', INK, 1.5) + P('M204 150l12-10 8 14-12 8z', '#FFCA28', 2) + face(120, 160, 0.3)),
  L('my/penang/landmark-nasikandar.v1.svg', 'ข้าวนาซิกันดาร์ราดแกงหลายอย่าง', 'A plate of nasi kandar flooded with curries', ['nasi kandar', 'นาซิกันดาร์', 'rice and curries', 'ข้าวราดแกง', 'kuah campur', 'แกงรวม', 'fried chicken', 'ไก่ทอด', 'mamak stall', 'ร้านมามัก'], 'หาแกงสามสีที่ไหลรวมกันบนข้าว', 'Find the three curries mixing on the rice',
    // a big plate with a mound of white rice flooded with three curries (yellow, red, brown), a fried chicken drumstick, a halved boiled egg in sambal and okra; behind, a row of steel curry trays on the counter
    sky('#FFF3E0') + R(-4, 40, 248, 60, '#B0BEC5', 0, 3) + ring(4, (k) => R(8 + k * 58, 48, 50, 36, ['#FFB300', '#D84315', '#8D6E63', '#7CB342'][k], 6, 3))
      + E(120, 172, 106, 52, '#FFFFFF', 3.5) + E(120, 170, 90, 42, '#ECEFF1', 0)
      + P('M70 176c-4-40 30-56 50-56s54 16 50 56z', '#FFFFFF', 3) + ring(8, (k) => C(84 + k * 10, 150 + (k % 2) * 8, 2.5, '#E0E0E0', 0))
      + P('M60 180c10-14 30-10 40 0s40 10 46 0 30-10 44 2c-10 20-50 26-70 26s-50-10-60-28z', '#FFB300', 2.5) + P('M60 180c6 10 20 18 34 20 0-10-14-24-34-20z', '#D84315', 2) + P('M146 182c14 2 30 4 44 0-4 10-20 18-38 18z', '#8D6E63', 2)
      + g(176, 140, 1, E(0, 0, 22, 16, '#C77A2A', 3) + Lc('M16 10l16 12', '#FFF8E1', 6) + Lc('M16 10l16 12', INK, 1.5), -20) + g(66, 144, 1, E(0, 0, 14, 12, '#FFFFFF', 2.5) + C(0, 0, 7, '#FFCA28', 0)) + Lc('M98 210l20-6M128 212l20-6', '#558B2F', 6)
      + face(120, 156, 0.4)),
];

export default { places: {}, items };
