// Wave 13, central Thailand 3: Nakhon Ratchasima (Korat), Phimai, Dan Kwian and Phanom Wan — the Khmer sanctuaries as
// buildings only (no images of gods, no Buddha images), the city gate without the statue in front of it, no Thao Suranari
// figure, no Pak Chong or Wang Nam Khiao (Khao Yai's), no petrified wood (Yellowstone, Patagonia), no wind turbines,
// no dinosaurs (Khon Kaen), no silk (Siem Reap, Lyon, Nan), no granary or kilns, no rock paintings, no giant trees, no cats, no sea life (already drawn elsewhere)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const KR = { k1: '#A0522D', k2: '#1565C0', k3: '#FBE9E7' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `th-korat.landmark.${slug}`, cat: 'landmark', file: `th/korat/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// the Phimai prang: a pale sandstone tower curving in like a corn cob, stacked rings, a lotus knob, a porch and doorway at its foot
const prang = (x, base, s, c = '#E8DCC4') => g(x, base, s, R(-40, -16, 80, 16, '#D7C6A6', 2) + R(-30, -66, 60, 50, c, 2) + R(-10, -48, 20, 32, '#5D4037', 8)
  + P('M-28-66c-4-30 4-60 28-84 24 24 32 54 28 84z', c) + [-78, -92, -106, -120, -134].map((y, k) => Lc(`M${-26 + k * 4} ${y}h${52 - k * 8}`, '#BCA984', 3)).join('') + C(0, -154, 6, c, 2.5)
  + R(-48, -40, 18, 24, c, 2) + R(30, -40, 18, 24, c, 2) + P('M-50-40l9-12 9 12zM32-40l9-12 9 12z', c, 2.5));

const items = [
  { id: 'th-korat.stamp', cat: 'stamp', file: 'th/korat/stamp.v1.svg', name: nm('ตราประทับนครราชสีมา', 'Nakhon Ratchasima stamp'), kw: ['nakhon ratchasima', 'นครราชสีมา', 'korat', 'โคราช', 'phimai', 'พิมาย', 'khmer sanctuary', 'ปราสาทหิน'],
    // the pale corn-cob tower of Prasat Phimai on its stepped base
    svg: cityStamp('tkr-st', { name: 'KORAT', sub: 'NAKHON RATCHASIMA', ...KR, emblem: prang(100, 150, 0.64) + face(100, 104, 0.26) }) },
  { id: 'th-korat.day.phimai', cat: 'day', file: 'th/korat/day-phimai.v1.svg', name: nm('ปราสาทหินพิมายยามเย็น', 'Phimai Historical Park at sunset'), kw: ['phimai historical park', 'อุทยานประวัติศาสตร์พิมาย', 'prasat hin phimai', 'ปราสาทหินพิมาย', 'khmer temple', 'ปราสาทขอม', 'sunset', 'พระอาทิตย์ตก', 'stone galleries', 'ระเบียงคด', 'lawn', 'สนามหญ้า'],
    // a golden sunset behind the pale main tower of Phimai, low sandstone galleries with window rows on either side, a stone walkway across the lawn, palms
    svg: scene('tkr-d1', '#FFCC80', C(176, 84, 24, '#FFF176', 0) + P('M-4 160h248v100H-4z', '#9CCC65') + R(-4, 140, 248, 24, '#D7C6A6', 0, 4) + Array.from({ length: 12 }, (_, k) => R(4 + k * 20, 146, 10, 12, '#8D6E63', 0, 2.5)).join('')
      + g(0, 0, 1, prang(120, 160, 0.95)) + face(120, 104, 0.32) + P('M100 250l10-90h20l10 90z', '#E8DCC4', 3)
      + [[24, 100], [216, 104]].map(([x, y]) => Lc(`M${x} 160v-${160 - y}`, '#795548', 4) + P(`M${x} ${y}c-14-4-20 4-22 10M${x} ${y}c14-4 20 4 22 10M${x} ${y}c-6-10-16-12-20-8M${x} ${y}c6-10 16-12 20-8`, 'none').replace('fill="none"', 'fill="none" stroke="#43A047" stroke-width="5"')).join('')) },
  { id: 'th-korat.day.citymoat', cat: 'day', file: 'th/korat/day-citymoat.v1.svg', name: nm('คูเมืองเก่าโคราชยามค่ำ', 'Korat\'s old city moat in the evening'), kw: ['korat city', 'เมืองโคราช', 'city moat', 'คูเมือง', 'old city gate', 'ประตูเมือง', 'fountain', 'น้ำพุ', 'evening', 'ยามค่ำ', 'nakhon ratchasima', 'นครราชสีมา'],
    // a purple evening over Korat: town buildings with lit windows behind a stretch of the old white wall, the green moat in front with fountains spraying and lamp posts along the bank
    svg: scene('tkr-d2', '#9575CD', C(46, 56, 12, '#FFF59D', 0) + [[60, 70, 30, 60], [96, 52, 26, 80], [130, 80, 34, 50], [170, 60, 28, 70], [204, 76, 30, 56]].map(([x, y, w, h], k) => R(x - w / 2, y, w, h, ['#5C6BC0', '#7986CB', '#3F51B5', '#5C6BC0', '#7986CB'][k], 2, 3) + Array.from({ length: 4 }, (_, j) => R(x - w / 2 + 6 + (j % 2) * (w / 2 - 2), y + 8 + Math.floor(j / 2) * 16, 7, 8, '#FFF59D', 1, 0)).join('')).join('')
      + R(-4, 120, 248, 36, '#FAFAFA', 0, 4) + Array.from({ length: 13 }, (_, k) => R(-2 + k * 20, 112, 12, 10, '#FAFAFA', 0, 3)).join('') + [[30, 124], [210, 122]].map(([x, y]) => C(x, y, 18, '#2E7D32')).join('')
      + P('M-4 156h248v100H-4z', '#26A69A') + [70, 120, 170].map((x) => Lc(`M${x} 190c-10-20-10-30 0-40M${x} 190c10-20 10-30 0-40M${x} 190v-46`, '#E0F7FA', 4)).join('') + Lc('M30 206h30M150 212h50', '#80CBC4', 3)
      + [16, 224].map((x) => Lc(`M${x} 156v-26`, INK, 3) + C(x, 126, 6, '#FFF59D', 2.5)).join('') + face(120, 136, 0.3)) },

  L('phimai', 'ปราสาทหินพิมาย', 'The sandstone tower of Prasat Phimai', ['prasat hin phimai', 'ปราสาทหินพิมาย', 'phimai', 'พิมาย', 'khmer sanctuary', 'ปราสาทขอม', 'sandstone tower', 'ปรางค์หินทราย', 'historical park', 'อุทยานประวัติศาสตร์', 'corn cob tower', 'ยอดทรงฝักข้าวโพด'], 'หาประตูเล็กๆ ที่ฐานของยอดปราสาท', 'Find the little doorway at the foot of the great tower',
    // the pale grey-cream main tower of Phimai curving up like a corn cob with stacked rings and a lotus knob, porches on both sides, steps on a grassy base
    bg('#E3F2FD') + low(196, '#AED581') + frame + prang(120, 198, 1.2) + face(120, 98, 0.42) + P('M96 224l6-26h36l6 26z', '#D7C6A6', 3)),
  L('dankwian', 'เครื่องปั้นดินเผาด่านเกวียน', 'Dan Kwian\'s rust-brown pottery', ['dan kwian pottery', 'เครื่องปั้นดินเผาด่านเกวียน', 'dan kwian', 'ด่านเกวียน', 'rust-brown clay', 'ดินสีสนิม', 'pottery village', 'หมู่บ้านปั้นหม้อ', 'clay vase', 'แจกันดินเผา', 'craft', 'งานฝีมือ'], 'หาแจกันสีน้ำตาลสนิมที่มีลายขูดเป็นเส้นๆ', 'Find the rusty-brown vase with scratched-in stripes',
    // a tall rust-brown unglazed vase with a dark metallic sheen and scratched-in wave patterns, a little round pot and a clay fish beside it on a wooden shelf
    bg('#FFF3E0') + R(24, 192, 192, 12, '#A1887F', 3) + Lc('M40 204v14M200 204v14', '#8D6E63', 5)
      + P('M92 192c-22-30-20-74 8-92v-22h40v22c28 18 30 62 8 92z', '#8B4513') + E(120, 78, 22, 6, '#5D2E0C') + P('M100 112c10 10 30 10 40 0', 'none') + Lc('M96 128c8 6 16-6 24 0s16-6 24 0M94 152c8 6 16-6 24 0s16-6 24 0', '#C0794A', 3) + Lc('M104 110c-6 20-6 50 2 70', '#B5652F', 3) + face(120, 136, 0.4)
      + g(186, 172, 1, P('M-20 20c-8-14-6-30 6-36v-6h28v6c12 6 14 22 6 36z', '#6D3510') + Lc('M-14-4h28', '#C0794A', 2.5))
      + g(52, 176, 1, P('M-22 0c10-12 30-12 38 0-8 12-28 12-38 0zM16 0l10-8v16z', '#A0522D') + C(-12, -2, 2.5, INK, 0) + Lc('M-4-6v12M4-6v12', '#6D3510', 2))),
  L('padmee', 'ผัดหมี่โคราช', 'Pad mee Korat, the orange stir-fried noodles', ['pad mee korat', 'ผัดหมี่โคราช', 'mee korat', 'หมี่โคราช', 'stir-fried noodles', 'เส้นหมี่ผัด', 'bean sprouts', 'ถั่วงอก', 'chives', 'กุยช่าย', 'local dish', 'อาหารประจำเมือง'], 'หาเส้นหมี่สีส้มกองโตบนใบตอง', 'Find the big orange heap of noodles on a banana leaf',
    // a plate lined with a banana leaf holding a curly heap of orange-red rice noodles with bean sprouts, chive pieces and tofu cubes, a wedge of lime and a fork beside
    bg('#F1F8E9') + E(120, 160, 96, 40, '#FFFFFF') + P('M40 160c20-30 140-36 166-6-20 30-146 36-166 6z', '#66BB6A', 3) + Lc('M50 160c40-8 100-10 146-4', '#388E3C', 2)
      + Array.from({ length: 16 }, (_, k) => Lc(`M${66 + (k % 8) * 14} ${136 + Math.floor(k / 8) * 14}c6-10 14-10 18 0s12 10 16 0`, k % 2 ? '#FF7043' : '#F4511E', 5)).join('')
      + [[82, 132], [130, 128], [156, 146], [100, 156]].map(([x, y]) => R(x, y, 10, 10, '#FFE082', 2, 2.5)).join('') + [[96, 124], [146, 136], [118, 150]].map(([x, y]) => Lc(`M${x} ${y}l10-3`, '#43A047', 4)).join('') + [[70, 150], [170, 134]].map(([x, y]) => Lc(`M${x} ${y}c4 4 8 4 10 10`, '#FFFDE7', 3)).join('')
      + P('M186 104l22 4-14 16z', '#C5E1A5', 3) + face(120, 124, 0.38)),
  L('kwailek', 'ควายเหล็กไถนา', 'A kwai lek, the iron buffalo walking tractor', ['kwai lek', 'ควายเหล็ก', 'walking tractor', 'รถไถเดินตาม', 'ploughing', 'ไถนา', 'muddy paddy', 'นาโคลน', 'rice planting season', 'ฤดูทำนา', 'isan farm', 'ไร่นาอีสาน'], 'หาล้อเหล็กที่มีซี่เป็นครีบๆ ในโคลน', 'Find the iron wheels with paddles turning in the mud',
    // a little red two-wheeled walking tractor with a chunky engine, long handlebars and iron paddle wheels churning a muddy flooded paddy, white egrets following behind
    bg('#E1F5FE') + low(150, '#8D9E5A') + frame + Lc('M30 170c30-4 60 4 90 0M120 196c30-4 60 4 90 0', '#B6C27A', 3)
      + g(110, 160, 1, Lc('M10-20l70-46M10-10l74-40', '#607D8B', 5) + Lc('M80-66l14-6M84-50l14-4', INK, 6) + R(-40, -52, 56, 34, '#E53935', 6) + R(-34, -66, 22, 14, '#424242', 3) + Lc('M-30-66v-14', '#424242', 5) + C(-30, -84, 4, '#B0BEC5', 0)
        + Lc('M10-40l12 20', '#212121', 4) + face(-12, -36, 0.3)
        + [[-34, 0], [12, 0]].map(([x, y]) => C(x, y, 20, 'none', 5) + Array.from({ length: 8 }, (_, k) => Lc(`M${x} ${y}l${(Math.cos(k * 0.785) * 22).toFixed(1)} ${(Math.sin(k * 0.785) * 22).toFixed(1)}`, '#455A64', 4)).join('')).join(''))
      + [[44, 132], [196, 140]].map(([x, y]) => g(x, y, 1, E(0, 0, 14, 9, '#FFFFFF') + Lc('M10-4c4-10 4-18 10-20', INK, 4) + P('M20-24l8 2-8 3z', '#FFCA28', 2) + Lc('M-2 8v12M4 8v12', '#FFCA28', 2.5))).join('')),
  L('thanonchira', 'ชุมทางถนนจิระ', 'Thanon Chira, the railway junction of Korat', ['thanon chira junction', 'ชุมทางถนนจิระ', 'railway junction', 'ทางแยกรถไฟ', 'semaphore signal', 'เสาสัญญาณรถไฟ', 'diesel train', 'รถไฟดีเซล', 'northeastern line', 'ทางรถไฟสายอีสาน', 'train ride', 'นั่งรถไฟ'], 'หาเสาสัญญาณที่มีแขนสีแดงขาวยกขึ้น', 'Find the signal post with its red-and-white arm raised',
    // two railway lines splitting apart like a Y over gravel, a tall semaphore signal post with a red-and-white striped arm raised, a blue-and-cream diesel train coming down the line, a little signal hut
    bg('#FFF8E1') + low(120, '#BCAAA4') + frame
      + Lc('M70 224l40-104M150 224l-20-104', '#6D4C41', 5) + Lc('M150 224l20-60 50-30M190 224l10-30 24-14', '#6D4C41', 5) + Array.from({ length: 6 }, (_, k) => Lc(`M${78 - k * 1} ${210 - k * 18}h${68 - k * 5}`, '#8D6E63', 4)).join('')
      + g(118, 108, 1, R(-30, -36, 60, 44, '#1E88E5', 6) + R(-30, -10, 60, 12, '#FFF8E1', 0, 0) + R(-20, -28, 16, 12, '#B3E5FC', 2, 2.5) + R(4, -28, 16, 12, '#B3E5FC', 2, 2.5) + C(-18, 2, 4, '#FFF59D', 2) + C(18, 2, 4, '#FFF59D', 2) + face(0, -4, 0.28, 'none'))
      + Lc('M40 200V50', '#546E7A', 6) + g(40, 62, 1, R(0, -6, 52, 12, '#FFFFFF', 3, 3) + R(12, -6, 12, 12, '#E53935', 0, 0) + R(36, -6, 12, 12, '#E53935', 0, 0), -30) + C(40, 92, 8, '#43A047', 3)
      + R(176, 66, 36, 30, '#FFE082', 2) + P('M172 66l22-16 22 16z', '#C62828') + R(186, 76, 14, 12, '#B3E5FC', 2, 2.5)),
  L('salaloi', 'วัดศาลาลอย โบสถ์รูปเรือสำเภา', 'Wat Sala Loi, the hall shaped like a junk ship', ['wat sala loi', 'วัดศาลาลอย', 'ship-shaped hall', 'โบสถ์รูปเรือสำเภา', 'dan kwian tiles', 'กระเบื้องด่านเกวียน', 'lam takhong river', 'ลำตะคอง', 'modern temple', 'สถาปัตยกรรมสมัยใหม่', 'korat city', 'เมืองโคราช'], 'หาหัวเรือที่ยื่นออกมาจากตัวโบสถ์', 'Find the ship\'s bow sticking out of the temple hall',
    // a modern white temple hall built like an old junk ship: a curved brown-tiled hull with a raised bow and stern, a steep pointed roof of rust-brown tiles like a sail, standing by a pond
    bg('#E1F5FE') + low(190, '#80CBC4') + frame + Lc('M50 206h40M150 210h40', '#E0F2F1', 3)
      + P('M24 150c20 2 40 4 50 10h92c10-6 30-8 50-10-8 24-24 44-56 44H80c-32 0-48-20-56-44z', '#8B4513') + Array.from({ length: 7 }, (_, k) => Lc(`M${60 + k * 20} 164v28`, '#C0794A', 3)).join('')
      + R(70, 118, 100, 42, '#FFFFFF', 2) + Array.from({ length: 4 }, (_, k) => R(80 + k * 22, 128, 14, 22, '#FFCA28', 7, 2.5)).join('')
      + P('M60 120l60-90 60 90z', '#A0522D') + Lc('M120 30v90M90 76h60M76 98h88', '#6D3510', 3) + P('M116 30l4-14 4 14z', '#FFCA28', 2.5) + face(120, 84, 0.36)),
  L('chumphon', 'ประตูชุมพล ประตูเมืองเก่าโคราช', 'Pratu Chumphon, the old city gate of Korat', ['pratu chumphon', 'ประตูชุมพล', 'city gate', 'ประตูเมือง', 'old city wall', 'กำแพงเมืองเก่า', 'korat moat', 'คูเมืองโคราช', 'historic gate', 'โบราณสถาน', 'nakhon ratchasima', 'นครราชสีมา'], 'หาประตูโค้งที่มีหลังคาทรงไทยอยู่ด้านบน', 'Find the arched gateway with a Thai roof on top',
    // the thick white city wall with notched battlements, an arched wooden gateway through it, a little red-tiled Thai pavilion roof on top with golden gable tips, the green moat in front
    bg('#FFF8E1') + low(190, '#26A69A') + frame + Lc('M40 206h40M150 210h40', '#80CBC4', 3)
      + R(16, 122, 208, 68, '#FAFAFA', 0) + Array.from({ length: 10 }, (_, k) => R(20 + k * 21, 110, 12, 14, '#FAFAFA', 0, 3)).join('') + R(80, 98, 80, 92, '#FFFFFF', 2)
      + P('M98 190v-46a22 22 0 0 1 44 0v46z', '#6D4C41') + Lc('M120 124v66', '#4E342E', 3) + C(112, 168, 2.5, '#FFCA28', 0) + C(128, 168, 2.5, '#FFCA28', 0)
      + P('M70 100l50-38 50 38z', '#C62828') + P('M90 74l30-24 30 24z', '#E53935') + R(96, 74, 48, 26, '#FFFFFF', 0, 3) + Lc('M70 100l-10-10M170 100l10-10M90 74l-8-8M150 74l8-8', '#FFCA28', 4) + face(120, 86, 0.3)),
  L('cuesta', 'เขาอีโต้ ภูเขารูปอีโต้ในอุทยานธรณีโคราช', 'A cuesta hill in the Khorat Geopark', ['khorat geopark', 'อุทยานธรณีโคราช', 'cuesta', 'เขารูปอีโต้', 'tilted rock layers', 'ชั้นหินเอียง', 'unesco geopark', 'อุทยานธรณีโลก', 'steep cliff', 'หน้าผาชัน', 'gentle slope', 'ลาดเขาเอียง'], 'หาด้านของภูเขาที่ชันเป็นหน้าผา', 'Find the side of the hill that drops like a cliff',
    // a long hill with one gentle forested slope and one sudden cliff face showing tilted stripes of red, cream and brown rock layers, a little road at its foot and fields
    bg('#E3F2FD') + low(176, '#C5E1A5') + frame + E(70, 56, 24, 8, '#FFFFFF', 0)
      + P('M24 176c40-30 90-60 140-84l20-8 8 92z', '#43A047') + P('M164 92l20-8 8 92h-30z', '#E07A4F') + [[166, 104, 190, 98], [166, 124, 192, 120], [166, 146, 194, 142], [166, 166, 196, 164]].map(([a, b, c, d], k) => Lc(`M${a} ${b}L${c} ${d}`, ['#FFF3E0', '#8D4E2A', '#FFF3E0', '#8D4E2A'][k], 4)).join('')
      + [[60, 160], [90, 142], [120, 124], [146, 108]].map(([x, y]) => C(x, y, 9, '#2E7D32', 2.5)).join('') + Lc('M16 196h208', '#78909C', 10) + Lc('M16 196h208', '#FFFFFF', 2).replace('stroke-width="2"', 'stroke-width="2" stroke-dasharray="8 6"') + face(110, 156, 0.4)),
  L('meephimai', 'ตากเส้นหมี่พิมาย', 'Phimai rice noodles drying in the sun', ['mee phimai', 'หมี่พิมาย', 'rice noodles', 'เส้นหมี่', 'drying racks', 'แผงตากเส้น', 'phimai', 'พิมาย', 'noodle making', 'ทำเส้นหมี่', 'sunshine', 'แดดจัด'], 'หาแผงไม้ไผ่ที่มีเส้นหมี่ขาวๆ ห้อยอยู่', 'Find the bamboo racks with white noodles hanging down',
    // rows of bamboo poles in bright sun with long white bundles of thin rice noodles draped over them to dry, round flat woven trays of noodle sheets leaning beside
    bg('#FFFDE7') + C(186, 50, 20, '#FFD54F', 0) + Lc('M186 20v-4M216 50h6M206 28l4-4', '#FFB300', 4) + low(186, '#E6C27A') + frame
      + [[56, 70], [140, 60]].map(([y0, h], k) => Lc(`M30 ${y0 + k * 10}h${180 - k * 20}`, '#C8A165', 6) + Array.from({ length: 6 - k }, (_, j) => P(`M${44 + j * 28} ${y0 + k * 10}c-6 30-6 ${h - 30} 0 ${h}h12c6-${h - 30} 6-${h} 0-${h}z`, '#FFFFFF', 3) + Lc(`M${48 + j * 28} ${y0 + k * 10 + 10}v${h - 20}M${52 + j * 28} ${y0 + k * 10 + 10}v${h - 20}`, '#ECEFF1', 2)).join('')).join('')
      + Lc('M30 50v140M210 50v140', '#8D6E63', 6) + g(194, 192, 1, E(0, 0, 22, 22, '#D4B26A') + C(0, 0, 14, '#FFFFFF', 2.5)) + face(100, 134, 0.36)),
  L('banprasat', 'หลุมขุดค้นโบราณคดีบ้านปราสาท', 'The Ban Prasat dig pit full of ancient pots', ['ban prasat', 'บ้านปราสาท', 'archaeological pit', 'หลุมขุดค้นโบราณคดี', 'ancient pots', 'ภาชนะดินเผาโบราณ', '3000 years old', 'อายุสามพันปี', 'village museum', 'พิพิธภัณฑ์หมู่บ้าน', 'non sung', 'โนนสูง'], 'หาไหดินเผาสีแดงที่โผล่ขึ้นมาจากดินในหลุม', 'Find the red clay pots peeking out of the earth in the pit',
    // a square excavation pit under a little open shelter roof, its earth walls in stripes, round red-and-cream ancient pots and bowls lying half-uncovered in the floor, a trowel and a brush on the edge, a wooden rail round it
    bg('#E8F5E9') + low(110, '#A5D6A7') + frame + P('M24 70h192l-16-26H40z', '#E57373') + Lc('M40 70v50M200 70v50', '#8D6E63', 5)
      + P('M36 118h168l-14 92H50z', '#D7A476') + Lc('M42 140h156M46 164h148', '#C08A5A', 4) + P('M54 186h132l-4 24H58z', '#B5794A', 0)
      + [[84, 196, 1], [124, 192, 1.2], [166, 198, 0.9]].map(([x, y, s]) => g(x, y, s, P('M-18 0c-6-18 4-30 18-30s24 12 18 30z', '#C0392B') + Lc('M-14-14c8 4 20 4 28 0', '#F3D9B1', 3) + E(0, -28, 9, 3, '#8E2C1F', 2))).join('')
      + g(104, 172, 1, P('M-14 0c0 8 6 12 14 12s14-4 14-12z', '#E8C08C')) + face(124, 180, 0.3)
      + Lc('M24 118h192', '#8D6E63', 5) + Lc('M30 118v-16M120 118v-16M210 118v-16M30 102h180', '#8D6E63', 4)
      + Lc('M168 112l22-18', '#90A4AE', 4) + P('M188 92l10-8 4 6-10 6z', '#B0BEC5', 2) + Lc('M60 112l-14-14', '#C8A165', 4) + R(40, 92, 10, 8, '#5D4037', 2, 2)),
  L('phanomwan', 'หน้าต่างลูกมะหวดปราสาทพนมวัน', 'The stone-baluster windows of Prasat Phanom Wan', ['prasat phanom wan', 'ปราสาทพนมวัน', 'stone balusters', 'ลูกมะหวด', 'khmer window', 'หน้าต่างแบบขอม', 'sandstone ruins', 'ซากปราสาทหินทราย', 'korat', 'โคราช', 'ancient temple', 'โบราณสถาน'], 'หาหน้าต่างที่มีลูกกรงหินกลมๆ เรียงกัน', 'Find the window with a row of round stone bars',
    // a weathered grey sandstone wall of an old Khmer sanctuary with a fallen block in the grass, a window filled with seven lathe-turned stone balusters, a doorway with a carved lintel beside, a small tree growing on top
    bg('#FFF3E0') + low(190, '#9CCC65') + frame + R(30, 70, 180, 120, '#B0A796', 2) + Array.from({ length: 10 }, (_, k) => Lc(`M30 ${82 + k * 12}h180`, '#9C9282', 2)).join('')
      + R(46, 96, 92, 66, '#4E342E', 2) + Array.from({ length: 7 }, (_, j) => g(56 + j * 12.5, 128, 1, R(-4, -30, 8, 60, '#C9BFAE', 3, 2) + E(0, -12, 6, 3.5, '#D7CDBC', 2) + E(0, 0, 6, 3.5, '#D7CDBC', 2) + E(0, 12, 6, 3.5, '#D7CDBC', 2))).join('')
      + R(154, 106, 40, 84, '#3E2723', 2) + R(148, 92, 52, 14, '#C9BFAE', 2) + Lc('M156 99h36', '#9C9282', 2.5)
      + R(140, 192, 30, 16, '#B0A796', 2, 3) + Lc('M60 70v-20', '#6D4C41', 4) + C(60, 44, 12, '#66BB6A') + face(92, 74, 0.32)),
  L('weaverbirds', 'นกกระจาบกับรังห้อยต้นตาล', 'Baya weaver birds and their hanging nests', ['baya weaver', 'นกกระจาบ', 'hanging nests', 'รังนกห้อย', 'woven nest', 'รังสาน', 'sugar palm', 'ต้นตาล', 'rice field birds', 'นกท้องนา', 'isan countryside', 'ชนบทอีสาน'], 'หารังนกที่มีทางเข้าเป็นท่อยาวๆ', 'Find the nest with a long tube for a doorway',
    // long woven grass nests like upside-down bottles hanging from a palm frond, each with a tube entrance at the bottom, a yellow-capped little weaver bird clinging to one
    bg('#E1F5FE') + P('M16 40c60 10 140 10 208-6', 'none').replace('fill="none"', 'fill="none" stroke="#558B2F" stroke-width="8"') + Array.from({ length: 9 }, (_, k) => Lc(`M${30 + k * 22} ${44 - (k % 3)}l${-6 + (k % 2) * 12} 24`, '#7CB342', 4)).join('')
      + [[66, 50, 1], [130, 52, 1.15], [186, 46, 0.9]].map(([x, y, s]) => g(x, y, s, Lc('M0 0v14', '#C8A165', 4) + P('M0 12c22 0 28 30 22 56-6 14-14 16-14 16v40h-14v-46c-12-6-20-24-16-42 4-16 10-24 22-24z', '#D4B26A') + Array.from({ length: 5 }, (_, k) => Lc(`M-14 ${30 + k * 10}c8 4 24 4 34 0`, '#B08C48', 2)).join(''))).join('')
      + g(160, 120, 1, E(0, 0, 16, 11, '#A1887F') + C(-12, -10, 9, '#FFEB3B', 3) + P('M-26-10l6-3v6z', '#8D6E63', 2) + C(-14, -11, 2, INK, 0) + P('M12 0l14 6-14 4z', '#8D6E63', 2.5) + Lc('M-4 10l-2 8M4 10l2 8', '#8D6E63', 2.5)) + face(130, 116, 0.32)),
  L('plara', 'ไหปลาร้า', 'A jar of pla ra, Isan fermented fish', ['pla ra', 'ปลาร้า', 'fermented fish', 'ปลาหมัก', 'clay jar', 'ไหดินเผา', 'isan flavour', 'รสชาติอีสาน', 'papaya salad seasoning', 'เครื่องปรุงส้มตำ', 'local food', 'อาหารพื้นบ้าน'], 'หาไหดินเผาที่มีหางปลาโผล่ออกมา', 'Find the clay jar with a little fish tail peeking out',
    // a round brown glazed clay jar tied at the neck with a cloth lid and string, a little fish tail peeking out from under the cloth, a small bowl of brown sauce with a spoon and some chillies beside
    bg('#FFF8E1') + E(120, 206, 90, 10, '#D7CCC8', 0)
      + P('M82 204c-30-20-30-80 4-98h68c34 18 34 78 4 98z', '#6D4C41') + E(120, 106, 34, 8, '#5D4037') + E(98, 140, 10, 26, '#8D6E63', 0)
      + P('M80 104c4-20 76-20 80 0-10 10-70 10-80 0z', '#FFF8E1') + Lc('M84 104c10 6 62 6 72 0', '#E53935', 4) + P('M150 92l18-14-2 18z', '#90A4AE', 2.5) + face(120, 156, 0.42)
      + E(192, 196, 22, 8, '#FFFFFF') + E(192, 192, 14, 4, '#8D6E63', 0) + Lc('M200 190l16-20', '#B0BEC5', 4) + [[34, 196], [46, 202]].map(([x, y]) => P(`M${x} ${y}c6-10 14-12 18-8-4 4-10 8-18 8z`, '#E53935', 2)).join('')),
  L('thanangsaphom', 'ท่านางสระผม ท่าน้ำศิลาแลงเมืองพิมาย', 'Tha Nang Sa Phom, Phimai\'s old laterite river landing', ['tha nang sa phom', 'ท่านางสระผม', 'laterite landing', 'ท่าน้ำศิลาแลง', 'phimai', 'พิมาย', 'river steps', 'บันไดลงน้ำ', 'khem river', 'ลำน้ำเค็ม', 'ancient pier', 'ท่าเรือโบราณ'], 'หาบันไดหินที่เดินลงไปถึงน้ำ', 'Find the stone steps walking right down into the water',
    // a broad old platform of red-brown pitted laterite blocks on a riverbank, wide stone steps going down into calm green water, reeds and a shady tree, lily pads floating
    bg('#FFF8E1') + low(150, '#80CBC4') + frame + Lc('M40 186h30M150 196h40', '#E0F2F1', 3) + [[48, 182], [74, 192], [176, 178]].map(([x, y]) => E(x, y, 9, 4, '#66BB6A', 2)).join('')
      + P('M50 96h150v20H50z', '#B5603A') + [0, 1, 2, 3].map((k) => R(60 + k * 10, 116 + k * 12, 130 - k * 20, 12, ['#A0522D', '#B5603A', '#A0522D', '#B5603A'][k], 1)).join('')
      + Array.from({ length: 18 }, (_, k) => C(62 + (k * 31) % 136, 100 + (k * 13) % 52, 1.8, '#6D3510', 0)).join('') + Lc('M80 96v20M110 96v20M140 96v20M170 96v20', '#7A3E1F', 2)
      + Lc('M196 96V40', '#6D4C41', 6) + C(196, 40, 22, '#43A047') + C(178, 52, 14, '#66BB6A') + [[30, 150], [38, 146], [214, 150]].map(([x, y]) => Lc(`M${x} ${y}v-30`, '#7CB342', 3) + E(x, y - 32, 3, 7, '#8D6E63', 0)).join('') + face(125, 104, 0.32)),
  L('cassava', 'มันสำปะหลังเมืองโคราช', 'Cassava roots from Korat\'s fields', ['cassava', 'มันสำปะหลัง', 'tapioca', 'สาคูมัน', 'cassava field', 'ไร่มันสำปะหลัง', 'harvest', 'ขุดมัน', 'tapioca dessert', 'ขนมมันสำปะหลัง', 'farm crop', 'พืชไร่'], 'หาหัวมันยาวๆ ที่ยังติดอยู่กับต้น', 'Find the long brown roots still joined to the plant',
    // a cassava plant pulled out of red earth: its tall knobbly stem and hand-shaped leaves on top, a bunch of long brown roots fanning out below, one root cut to show white inside, a bowl of tapioca dessert in coconut milk beside
    bg('#E8F5E9') + low(150, '#D2794A') + frame + Lc('M100 150V60', '#A1887F', 7) + Lc('M94 130h12M94 104h12M94 80h12', '#8D6E63', 3)
      + [[100, 56, -40], [100, 56, 0], [100, 56, 40], [100, 70, -70], [100, 70, 70]].map(([x, y, r]) => g(x, y, 1, P('M0 0c-8-10-6-30 0-38 6 8 8 28 0 38z', '#43A047', 2.5), r)).join('')
      + [[-50, 60], [-24, 70], [4, 72], [32, 64]].map(([dx, l]) => P(`M100 150c${dx * 0.3} 10 ${dx * 0.8} ${l * 0.5} ${dx} ${l}c-4 6-10 4-10-2 ${-dx * 0.2 + 4}-${l * 0.5} ${-dx * 0.4}-${l * 0.7} ${-dx * 0.6 + 10}-${l}z`, '#8D5524')).join('')
      + E(70, 210, 10, 7, '#FFFDE7', 2.5) + face(100, 176, 0.36)
      + g(182, 196, 1, P('M-28-6c0 18 12 26 28 26s28-8 28-26z', '#FFFFFF') + E(0, -6, 28, 8, '#FFF8E1') + [[-12, -6], [0, -8], [12, -5], [-4, -3]].map(([x, y]) => C(x, y, 4, '#FFE082', 1.5)).join(''))),
  L('ratchaphruek', 'ต้นราชพฤกษ์ออกดอกเหลือง', 'A golden shower tree in full yellow bloom', ['golden shower tree', 'ต้นราชพฤกษ์', 'dok khun', 'ดอกคูน', 'yellow flowers', 'ดอกไม้สีเหลือง', 'national flower', 'ดอกไม้ประจำชาติ', 'hot season', 'หน้าร้อน', 'roadside tree', 'ต้นไม้ริมทาง'], 'หาพวงดอกไม้สีเหลืองที่ห้อยระย้าลงมา', 'Find the long chains of yellow flowers hanging down',
    // a round tree with a grey trunk whose branches are hung all over with long dangling chains of bright yellow flowers, a few petals falling on the grass
    bg('#E3F2FD') + low(186, '#9CCC65') + frame + Lc('M120 196v-70M120 150l-30-26M120 140l34-24', '#8D8D8D', 9)
      + P('M40 110c-6-40 30-66 80-66s86 26 80 66c-20 12-140 12-160 0z', '#7CB342') + [[70, 70], [120, 56], [170, 72]].map(([x, y]) => C(x, y, 20, '#8BC34A', 3)).join('')
      + Array.from({ length: 9 }, (_, k) => { const x = 48 + k * 18, y = 92 + (k % 2) * 8; return Lc(`M${x} ${y}v${40 + (k % 3) * 10}`, '#9E9D24', 2) + Array.from({ length: 5 }, (_, j) => C(x + (j % 2 ? 3 : -3), y + 8 + j * 8 + (k % 3) * 2, 4.5, '#FFEB3B', 1.8)).join(''); }).join('')
      + face(120, 74, 0.38) + [[60, 200], [150, 206], [186, 196]].map(([x, y]) => C(x, y, 3.5, '#FFEB3B', 1.5)).join('')),
  L('pratuchai', 'ประตูชัยปราสาทหินพิมาย', 'The southern gate of Phimai', ['pratu chai', 'ประตูชัย', 'phimai gate', 'ประตูเมืองพิมาย', 'gopura', 'โคปุระ', 'laterite wall', 'กำแพงศิลาแลง', 'old town', 'เมืองเก่าพิมาย', 'phimai', 'พิมาย'], 'หาประตูหินที่มีทางเดินลอดผ่านตรงกลาง', 'Find the stone gate with a walkway passing right through it',
    // an old sandstone gatehouse with a cross-shaped stepped roof and a tall doorway in the middle of a red laterite wall, a dirt road leading through it and trees behind
    bg('#FFF8E1') + low(170, '#C5E1A5') + frame + [[40, 92], [200, 88]].map(([x, y]) => C(x, y, 24, '#43A047')).join('')
      + R(16, 120, 208, 50, '#B5603A', 0) + Array.from({ length: 16 }, (_, k) => C(24 + (k * 23) % 200, 128 + (k * 11) % 36, 2, '#7A3E1F', 0)).join('')
      + R(74, 96, 92, 74, '#D7C6A6', 2) + P('M68 98l52-34 52 34z', '#C9B48E') + P('M90 70l30-20 30 20z', '#D7C6A6') + C(120, 46, 5, '#D7C6A6', 2.5)
      + P('M104 170v-46c0-10 32-10 32 0v46z', '#5D4037') + R(80, 104, 14, 24, '#4E342E', 2, 2.5) + R(146, 104, 14, 24, '#4E342E', 2, 2.5)
      + P('M104 170l-24 54h80l-24-54z', '#E6C27A', 0) + face(120, 84, 0.3)),
];

export default {
  places: {
    'th-korat': { country: 'th', wave: 3, home: true, name: nm('นครราชสีมา (โคราช)', 'Nakhon Ratchasima (Korat)'), tz: 'Asia/Bangkok', ll: [14.97, 102.1], alias: ['nakhon ratchasima', 'นครราชสีมา', 'korat', 'khorat', 'โคราช', 'NAK', 'phimai', 'พิมาย', 'dan kwian', 'ด่านเกวียน', 'phanom wan', 'พนมวัน'], colors: KR },
  },
  items,
};
