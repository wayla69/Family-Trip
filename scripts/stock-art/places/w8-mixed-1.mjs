// Wave 8 (mixed group, part 1): Türkiye (Istanbul, Cappadocia, Pamukkale, İzmir and Kuşadası) and Georgia (Tbilisi, Kazbegi, Batumi)
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (tr/istanbul/landmark-kamondo.v1.svg → tr-istanbul.landmark.kamondo)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport): tr/culture-ebru.v1.svg → tr.culture.ebru
const K = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const tree = (x, y, s, c) => g(x, y, s, R(-3, 0, 6, 16, '#795548', 0, 2) + C(0, -8, 14, c, 2.5));
const cypress = (x, y, s) => g(x, y, s, P('M0-50c10 16 12 40 0 52-12-12-10-36 0-52z', '#2E7D32', 2.5));

const items = [
  // ---------- Türkiye
  K('tr', 'food', 'dondurma', 'ดอนดูร์มา ไอศกรีมยืดของตุรกี', 'Dondurma, the stretchy Turkish ice cream', ['dondurma', 'ดอนดูร์มา', 'maras ice cream', 'maraş dondurması', 'ไอศกรีมยืด', 'stretchy ice cream', 'ice cream trick', 'ไอศกรีมแกล้งลูกค้า', 'long paddle', 'pistachio'],
    // a smiling waffle cone held up while a long metal paddle lifts its big white scoop away, the ice cream stretching in a long chewy strand, green pistachio bits, a sprinkle of sparkles
    Lc('M40 40l120 66', '#90A4AE', 7) + Lc('M40 40l120 66', '#ECEFF1', 3) + R(26, 30, 22, 16, '#B0BEC5', 4, 2.5)
      + P('M150 92c18-14 44-8 50 10 8 20-18 32-38 26-20-6-26-24-12-36z', '#FFFDF7', 3.5) + [[166, 104], [184, 100], [176, 116]].map(([x, y]) => C(x, y, 3, '#9CCC65', 1.5)).join('')
      + P('M150 116c-20 10-34 26-40 48l14 4c6-18 18-32 30-40z', '#FFFDF7', 3) + Lc('M138 128c-8 8-14 18-16 30', '#ECEFF1', 3)
      + P('M88 158h64l-32 74z', '#E0A458', 3.5) + Lc('M98 172l34 34M116 166l24 22M142 172l-34 34M126 166l-24 22', '#B9783A', 2.5) + E(120, 160, 36, 10, '#FFFDF7', 3)
      + face(120, 186, 0.4) + Lc('M206 64l6-6M214 80h8M196 50l2-8', '#FFCA28', 3)),
  K('tr', 'culture', 'ebru', 'เอบรู ศิลปะวาดลายบนน้ำ', 'Ebru, painting on water', ['ebru', 'เอบรู', 'paper marbling', 'ศิลปะหินอ่อนบนน้ำ', 'turkish marbling', 'painting on water', 'วาดลายบนน้ำ', 'water art workshop', 'เวิร์กช็อปศิลปะ', 'swirls'],
    // a wide tray of water floating swirls of red, blue, yellow and green paint combed into waves, a tulip shape drawn in the middle, a horsehair brush dripping colour, a sheet of paper lifted at one corner showing the same pattern
    P('M24 104h192l-10 96H34z', '#8D6E63', 3.5) + P('M34 112h172l-8 80H42z', '#E3F2FD', 3)
      + Lc('M44 130c20-12 30 12 50 0s30 12 50 0 30 12 48 0', '#E53935', 5) + Lc('M44 150c20-12 30 12 50 0s30 12 50 0 30 12 48 0', '#1E88E5', 5) + Lc('M48 172c20-10 30 10 50 0s30 10 50 0 26 10 44 0', '#FDD835', 5)
      + P('M120 178c-14-10-16-26-8-34 4 6 6 8 8 8 2 0 4-2 8-8 8 8 6 24-8 34z', '#E91E63', 2.5) + Lc('M120 178v12', '#43A047', 3)
      + g(60, 52, 1, R(-4, -30, 8, 40, '#A1887F', 3, 2.5) + P('M-8 10h16l-4 18h-8z', '#FFF3C4', 2.5) + C(0, 40, 4, '#E53935', 0) + C(0, 52, 3, '#E53935', 0), -10)
      + P('M140 40h70v58l-70 6z', '#FFFDF7', 3) + Lc('M146 56c10-6 16 6 26 0s16 6 30 0M146 72c10-6 16 6 26 0s16 6 30 0', '#1E88E5', 3.5) + Lc('M146 88c10-6 16 6 26 0s16 6 30 0', '#E53935', 3.5) + face(175, 30, 0.3)),
  K('tr', 'culture', 'sandcoffee', 'กาแฟตุรกีต้มบนทรายร้อน', 'Turkish coffee bubbling in hot sand', ['turkish coffee', 'กาแฟตุรกี', 'kum kahvesi', 'sand coffee', 'กาแฟต้มทราย', 'cezve', 'เจซเว', 'copper pot', 'หม้อทองแดง', 'coffee foam'],
    // a wide copper pan of golden sand glowing over a flame, two little long-handled copper pots pushed into the sand with foam rising over the top, a small cup on a saucer with a cube of lokum beside it
    P('M50 150c-6-34 146-34 140 0z', '#FFB74D', 0) + Lc('M90 186c4-10 0-16 6-24M120 188c4-10 0-16 6-24M150 186c4-10 0-16 6-24', '#FF7043', 5)
      + P('M24 126h192c0 30-30 50-96 50S24 156 24 126z', '#C77B3E', 3.5) + E(120, 126, 96, 16, '#F2C66D', 3) + [[60, 124], [92, 132], [150, 130], [180, 122]].map(([x, y]) => C(x, y, 2, '#D9A441', 0)).join('')
      + [[86, 0], [150, 1]].map(([x, f]) => P(`M${x - 18} 126l4-38h28l4 38z`, '#D88447', 3) + E(x, 88, 16, 6, '#6D4C41', 2.5) + P(`M${x - 14} 86c4-10 24-10 28 0`, '#E8CFA0', 2.5) + Lc(`M${x + 16} 104l${f ? 44 : 34} -${f ? 18 : 30}`, '#8D6E63', 6) + face(x, 108, 0.25)).join('')
      + P('M24 210h46l-4 8H28z', '#ECEFF1', 2.5) + P('M32 186h30l-4 24H36z', '#FFFFFF', 3) + R(36, 186, 22, 5, '#5D4037', 0, 0) + R(196, 196, 22, 20, '#F48FB1', 4, 2.5) + C(202, 202, 1.5, '#FFF', 0) + C(212, 208, 1.5, '#FFF', 0)),
  K('tr', 'food', 'nar', 'น้ำทับทิมคั้นสด', 'Fresh pomegranate juice', ['pomegranate juice', 'น้ำทับทิม', 'nar suyu', 'pomegranate', 'ทับทิม', 'fresh juice', 'น้ำผลไม้คั้นสด', 'juice stand', 'street drink', 'ruby seeds'],
    // a big pomegranate cut in half showing shiny ruby seeds, a whole one with its little crown beside it, a tall glass of deep red juice with a straw, smiling
    C(70, 150, 52, '#C62828', 3.5) + C(70, 150, 40, '#FFE0E0', 3) + [[56, 136], [72, 130], [86, 140], [60, 156], [76, 150], [90, 160], [66, 172], [82, 172], [50, 148], [70, 116]].map(([x, y]) => C(x, y, 6, '#E53935', 1.5) + C(x - 2, y - 2, 1.5, '#FFFFFF', 0)).join('')
      + C(80, 72, 26, '#D32F2F', 3) + P('M74 48l2-10 4 6 4-6 2 10z', '#8E2424', 2.5) + face(80, 74, 0.3)
      + P('M140 62h56l-8 150h-40z', '#FFFFFF', 3.5) + P('M144 92h48l-6 116h-36z', '#B71C1C', 0) + Lc('M184 34l-14 120', '#4CAF50', 6) + face(168, 150, 0.4) + C(150, 80, 4, '#FFF', 0) + Lc('M150 106v60', '#EF9A9A', 3)),

  // ---------- Istanbul
  L('tr/istanbul/landmark-rumelihisari.v1.svg', 'ป้อมรูเมลีฮิซาร์ริมช่องแคบบอสฟอรัส', 'Rumeli Fortress by the Bosphorus', ['rumeli fortress', 'rumelihisarı', 'rumelihisari', 'ป้อมรูเมลีฮิซาร์', 'bosphorus castle', 'ปราสาทริมบอสฟอรัส', 'round towers', 'หอคอยกลม', 'bebek', 'sariyer'], 'หาหอคอยกลมใหญ่ที่สวมหลังคาแหลมสีเทา', 'Find the fat round tower wearing a pointed grey roof',
    // grey stone walls zigzagging up a green hill with three fat round towers, the biggest with a pointed lead roof, crenellations, blue water at the foot with a little boat
    sky('#E1F5FE') + P('M-4 120c60-60 160-80 248-70v194H-4z', '#81C784', 0) + P('M-4 196h248v48H-4z', '#4FC3F7', 0) + Lc('M20 214h40M150 222h50', '#B3E5FC', 3)
      + P('M40 190l50-60 60-20 50 30', 'none') + Lc('M40 186l50-58 62-22 52 30', '#B0A79C', 14) + Lc('M40 186l50-58 62-22 52 30', '#D7CCC8', 8)
      + [[40, 200, 26, 70, 0], [152, 120, 22, 60, 1], [210, 150, 18, 52, 0]].map(([x, y, r, h, roof]) => R(x - r, y - h, r * 2, h, '#BCAAA4', 0, 3) + Array.from({ length: 4 }, (_, k) => R(x - r + k * (r / 2) + 1, y - h - 8, r / 3, 9, '#BCAAA4', 0, 2)).join('') + (roof ? P(`M${x - r - 4} ${y - h - 2}L${x} ${y - h - 46}L${x + r + 4} ${y - h - 2}z`, '#78909C', 3) : '') + R(x - 4, y - h + 16, 8, 14, '#5D4037', 4, 2)).join('')
      + face(40, 166, 0.34) + g(110, 214, 1, P('M-20 0h40l-6 10h-28z', '#E53935', 2.5) + Lc('M0 0v-20', INK, 2.5) + P('M2-20l14 16H2z', '#FFFFFF', 2))),
  L('tr/istanbul/landmark-buyukada.v1.svg', 'บ้านไม้หลังใหญ่บนเกาะบือยุกอาดา', 'The wooden mansions of Büyükada', ['büyükada', 'buyukada', 'บือยุกอาดา', "princes' islands", 'adalar', 'หมู่เกาะเจ้าชาย', 'wooden mansion', 'คฤหาสน์ไม้', 'bicycle ride', 'ปั่นจักรยานรอบเกาะ'], 'หาเด็กที่ปั่นจักรยานผ่านหน้าบ้านไม้หลังใหญ่', 'Find the child riding a bike past the big wooden house',
    // a big pale pink wooden mansion with a pointed corner turret, white lacy trim and a deep veranda, pink bougainvillea, pine trees, the sea behind, a child on a bicycle on the lane
    sky('#B3E5FC') + P('M-4 120h248v20H-4z', '#4FC3F7', 0) + P('M-4 140h248v104H-4z', '#C5E1A5', 0) + P('M-4 206h248v38H-4z', '#E0D3C0', 0)
      + g(30, 140, 1, P('M-10 0l10-60 10 60z', '#388E3C', 2.5)) + g(218, 146, 1, P('M-12 0l12-66 12 66z', '#2E7D32', 2.5))
      + R(54, 96, 120, 100, '#F8BBD0', 0, 3.5) + P('M48 98l66-36 66 36z', '#8D6E63', 3) + R(150, 70, 36, 126, '#F48FB1', 0, 3) + P('M144 72l24-38 24 38z', '#6D4C41', 3)
      + [[70, 112], [100, 112], [130, 112], [160, 92], [160, 128]].map(([x, y]) => R(x - 8, y, 16, 22, '#E3F2FD', 2, 2.5)).join('') + Lc('M54 150h96M60 150v46M90 150v46M120 150v46M150 150v46', '#FFFFFF', 3) + R(52, 146, 100, 6, '#FFFFFF', 0, 2.5)
      + Lc('M56 100q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0', '#FFFFFF', 3) + [[48, 190], [176, 186], [190, 196]].map(([x, y]) => C(x, y, 10, '#EC407A', 2.5)).join('') + face(114, 176, 0.32)
      + g(110, 220, 1, C(-20, 6, 11, 'none', 3) + C(20, 6, 11, 'none', 3) + Lc('M-20 6l12-18h22l6 18M-8-12l8 18', '#1E88E5', 3.5)) + kid(112, 204, '#FDD835', 1)),
  L('tr/istanbul/landmark-haydarpasa.v1.svg', 'สถานีรถไฟไฮดาร์ปาชาริมทะเล', 'Haydarpaşa station on the water', ['haydarpaşa', 'haydarpasa', 'ไฮดาร์ปาชา', 'old railway station', 'สถานีรถไฟเก่า', 'station by the sea', 'สถานีริมทะเล', 'kadıköy', 'asian side', 'ฝั่งเอเชีย'], 'หาหอคอยหลังคาแหลมสองหลังที่มุมสถานีริมน้ำ', 'Find the two pointed turrets on the corners of the station by the water',
    // a big cream stone building standing right on the water, with a steep grey pitched roof and two round corner turrets with pointed cone tops, rows of arched windows, a jetty with steps and a ferry, gulls
    sky('#FFE0B2') + P('M-4 172h248v72H-4z', '#29B6F6', 0) + Lc('M14 196h40M150 206h50M70 226h40', '#B3E5FC', 3)
      + R(56, 82, 128, 90, '#F3E2C3', 0, 3.5) + P('M60 84l60-36 60 36z', '#78909C', 3) + R(96, 32, 48, 24, '#78909C', 0, 2.5)
      + [56, 184].map((x) => R(x - 16, 60, 32, 112, '#EAD7B4', 0, 3) + P(`M${x - 20} 62l20-44 20 44z`, '#546E7A', 3) + C(x, 18, 4, '#FFCA28', 2) + R(x - 6, 86, 12, 18, '#90CAF9', 6, 2) + R(x - 6, 124, 12, 18, '#90CAF9', 6, 2)).join('')
      + [86, 108, 132, 154].map((x) => R(x - 7, 104, 14, 22, '#90CAF9', 7, 2.5) + R(x - 7, 138, 14, 22, '#90CAF9', 7, 2.5)).join('') + R(108, 60, 24, 16, '#FFFFFF', 8, 2.5)
      + R(30, 172, 180, 8, '#BCAAA4', 0, 3) + Lc('M100 180v14M120 180v14M140 180v14', '#8D6E63', 4)
      + g(200, 212, 1, P('M-34 0h68l-8 14h-52z', '#FFFFFF', 3) + R(-20, -14, 40, 14, '#FFFFFF', 2, 2.5) + Lc('M-26 7h52', '#1E88E5', 3) + R(4, -24, 8, 10, '#FDD835', 0, 2)) + face(120, 70, 0.3)
      + Lc('M30 40q6-7 12 0q6-7 12 0M190 44q5-6 10 0q5-6 10 0', INK, 2.5)),
  L('tr/istanbul/landmark-miniaturk.v1.svg', 'มินีอาเตอร์ก สวนเมืองจิ๋ว', 'Miniatürk, the park of tiny buildings', ['miniatürk', 'miniaturk', 'มินีอาเตอร์ก', 'miniature park', 'สวนเมืองจิ๋ว', 'tiny models', 'โมเดลจิ๋ว', 'golden horn park', 'giant for a day', 'family day out'], 'หาเด็กตัวโตที่ยืนสูงกว่าสะพานจิ๋ว', 'Find the child standing taller than the tiny bridge',
    // a neat green lawn with tiny model buildings: a little domed building with two pencil towers, a small stone tower, a tiny suspension bridge over a strip of blue water and a little red train, a giant-looking child grinning beside them
    sky('#E8F5E9') + P('M-4 150h248v94H-4z', '#9CCC65', 0) + P('M-4 196c60-10 180 10 248-4v20c-80 10-180-6-248 4z', '#4FC3F7', 0)
      + g(58, 150, 1, R(-24, -20, 48, 20, '#ECEFF1', 0, 2.5) + P('M-16-20c0-22 32-22 32 0z', '#90A4AE', 2.5) + R(-32, -54, 6, 54, '#ECEFF1', 0, 2) + R(26, -54, 6, 54, '#ECEFF1', 0, 2) + P('M-33-54l4-10 4 10zM25-54l4-10 4 10z', '#90A4AE', 2) + face(0, -8, 0.2, 'none'))
      + g(124, 150, 1, R(-10, -50, 20, 50, '#D7CCC8', 0, 2.5) + P('M-14-50l14-22 14 22z', '#5D4037', 2.5))
      + Lc('M6 196q40-30 80 0', '#E53935', 2) + R(18, 180, 4, 18, '#B0BEC5', 0, 1.5) + R(70, 180, 4, 18, '#B0BEC5', 0, 1.5) + Lc('M0 196h96', '#B0BEC5', 4)
      + Lc('M100 230h120', '#8D6E63', 3) + g(160, 222, 1, R(-30, -14, 22, 14, '#E53935', 2, 2) + R(-6, -14, 20, 14, '#FDD835', 2, 2) + R(16, -14, 20, 14, '#1E88E5', 2, 2) + C(-24, 2, 3, INK, 0) + C(-10, 2, 3, INK, 0) + C(4, 2, 3, INK, 0) + C(26, 2, 3, INK, 0))
      + kid(196, 172, '#AB47BC', 2.4)),
  L('tr/istanbul/landmark-kamondo.v1.svg', 'บันไดคาโมนโดที่โค้งเป็นรูปตัวเอส', 'The curly Kamondo Stairs in Galata', ['kamondo stairs', 'camondo stairs', 'บันไดคาโมนโด', 'kamondo merdivenleri', 'curly staircase', 'บันไดโค้ง', 'karaköy', 'karakoy', 'galata steps', 'art nouveau'], 'หาบันไดที่โค้งไปมาเหมือนตัวเอส', 'Find the steps that curl back and forth like an S',
    // a stone staircase curling in two S-bends up between old buildings, black iron railings following each curve, a little terrace in the middle, a child climbing, a cat-free pigeonless sunny sky
    sky('#FFF8E1') + R(-4, 30, 54, 214, '#E6C8A8', 0, 3) + R(190, 30, 54, 214, '#D7B899', 0, 3) + [[10, 60], [10, 120], [204, 70], [204, 140]].map(([x, y]) => R(x, y, 24, 30, '#90CAF9', 2, 2.5)).join('')
      + P('M60 228c40 0 90-6 90-36s-80-24-80-56 60-40 100-40', 'none') + Lc('M60 228c40 0 90-6 90-36s-80-24-80-56 60-40 100-40', '#BCAAA4', 34) + Lc('M60 228c40 0 90-6 90-36s-80-24-80-56 60-40 100-40', '#E0D3C0', 26)
      + Lc('M64 214c34 0 70-4 72-22M92 210l0 10M120 204l2 10', '#A1887F', 2) + Lc('M60 210c40 0 74-4 74-22s-70-28-70-54 60-38 104-36', INK, 3) + Lc('M66 244c40 0 102-10 102-50s-84-26-84-58 52-36 92-36', INK, 3)
      + [[80, 210], [104, 206], [128, 196], [90, 150], [82, 130], [110, 112], [140, 104]].map(([x, y]) => Lc(`M${x} ${y}v14`, INK, 2)).join('') + kid(110, 156, '#26A69A', 1.1) + face(30, 200, 0.3)),

  // ---------- Cappadocia
  L('tr/cappadocia/landmark-ihlara.v1.svg', 'หุบเขาอึห์ลารา', 'A walk in the Ihlara Valley', ['ihlara valley', 'ihlara vadisi', 'หุบเขาอึห์ลารา', 'melendiz river', 'แม่น้ำเมเลนดิซ', 'canyon walk', 'เดินในหุบเขา', 'belisırma', 'stepping stones', 'poplar trees'], 'หาก้อนหินที่วางเป็นทางให้เดินข้ามลำธาร', 'Find the stepping stones across the stream',
    // a deep green canyon between tall cream cliffs dotted with little dark cave windows, a winding blue stream with stepping stones, tall thin poplar trees, a child hopping across
    sky('#B3E5FC') + P('M-4 20h70l10 224H-4z', '#E8D5B0', 3) + P('M244 20h-70l-14 224h84z', '#DCC39A', 3) + [[20, 60], [40, 100], [16, 140], [200, 70], [214, 120], [196, 160]].map(([x, y]) => R(x, y, 10, 14, '#5D4037', 5, 2)).join('')
      + P('M66 120h108l-14 124H76z', '#81C784', 0) + P('M110 120c-10 30 30 50 10 80s-40 30-30 44h44c-10-14 20-30 26-50s-30-50-30-74z', '#4FC3F7', 2.5)
      + [[104, 180], [124, 192], [112, 206]].map(([x, y]) => E(x, y, 10, 5, '#BDBDBD', 2.5)).join('') + [86, 156].map((x) => g(x, 160, 1, R(-2, 0, 4, 20, '#795548', 0, 1.5) + E(0, -20, 7, 24, '#9CCC65', 2.5))).join('')
      + kid(124, 186, '#EF5350', 1.1) + face(30, 190, 0.3)),
  L('tr/cappadocia/landmark-soganli.v1.svg', 'ตุ๊กตาผ้าแห่งหมู่บ้านโซอันลึ', 'The rag dolls of Soğanlı', ['soğanlı', 'soganli', 'โซอันลึ', 'rag dolls', 'ตุ๊กตาผ้า', 'handmade dolls', 'ตุ๊กตาทำมือ', 'village craft', 'ของที่ระลึก', 'soganli valley'], 'หาตุ๊กตาที่ใส่กระโปรงลายดอกสีชมพู', 'Find the doll in the pink flowery skirt',
    // three soft cloth dolls with round smiling faces, flowered headscarves and wide patchwork skirts, sitting in a row on a low stone wall, rock cones of the valley behind
    sky('#FFF3E0') + P('M10 160l20-80 20 80zM180 160l24-96 24 96z', '#E8C9A0', 3) + P('M-4 178h248v66H-4z', '#D7B899', 0) + R(14, 170, 212, 30, '#BCAAA4', 4, 3)
      + [[56, '#F48FB1', '#7E57C2'], [120, '#4FC3F7', '#E53935'], [184, '#FFD54F', '#43A047']].map(([x, sk, sc]) => g(x, 172, 1, P('M-32 0c0-30 12-46 32-46s32 16 32 46z', sk, 3) + [[-14, -14], [10, -24], [16, -6], [-4, -32]].map(([a, b]) => C(a, b, 4, '#FFFFFF', 1.5)).join('') + R(-14, -64, 28, 22, '#FFE0BD', 10, 2.5) + P('M-18-56c0-24 36-24 36 0l4 14h-8l-2-8h-24l-2 8h-8z', sc, 2.5) + face(0, -52, 0.3))).join('')),
  L('tr/cappadocia/landmark-selime.v1.svg', 'อารามเซลีเมที่เจาะเข้าไปในหน้าผา', 'Selime, the halls carved into the cliff', ['selime monastery', 'selime manastırı', 'อารามเซลีเม', 'rock-cut halls', 'ห้องเจาะในหิน', 'cliff carving', 'หน้าผาแกะสลัก', 'ihlara', 'rock cones', 'cave rooms'], 'หาประตูโค้งสูงที่เจาะเข้าไปในหิน', 'Find the tall arched doorway carved into the rock',
    // a tall pale cliff with pointed rock cones on top, carved into its face a tall hall with two arched doorways, a row of little arched windows and a carved chimney, steps leading up, a child on the path
    sky('#FFE0B2') + P('M10 244V90l20-50 20 40 20-60 24 50 20-40 22 46 24-56 22 60 20-30 24 60v154z', '#EBD7B5', 3.5)
      + R(70, 112, 100, 90, '#D9BE95', 6, 3) + [[94, 0], [146, 0]].map(([x]) => P(`M${x - 14} 202v-46a14 14 0 0 1 28 0v46z`, '#5D4037', 3)).join('') + [86, 106, 126, 146].map((x) => P(`M${x} 138v-8a6 6 0 0 1 12 0v8z`, '#6D4C41', 2.5)).join('')
      + P('M60 70l10-30 10 30z', '#5D4037', 2.5) + R(178, 150, 30, 40, '#6D4C41', 14, 2.5) + Lc('M70 230l20-28M90 236l20-34', '#BCAAA4', 3) + Lc('M60 244l30-42h60', '#C9AE88', 8) + kid(56, 238, '#1E88E5', 1) + face(196, 80, 0.3)),
  L('tr/cappadocia/landmark-manti.v1.svg', 'มันทึ เกี๊ยวจิ๋วราดโยเกิร์ต', 'Mantı, tiny dumplings with yoghurt', ['mantı', 'manti', 'มันทึ', 'kayseri mantı', 'tiny dumplings', 'เกี๊ยวจิ๋ว', 'yoghurt sauce', 'ซอสโยเกิร์ต', 'red pepper butter', 'kayseri'], 'หาเกี๊ยวจิ๋วที่โผล่ออกมาจากโยเกิร์ตขาว', 'Find the tiny dumplings peeking out of the white yoghurt',
    // a wide blue patterned plate of tiny pinched square dumplings under a pool of white yoghurt, drizzled with red pepper butter and sprinkled with green mint, a spoon with one dumpling, smiling
    E(120, 140, 104, 70, '#1E88E5', 3.5) + E(120, 140, 88, 58, '#FFFFFF', 3) + [[64, 128], [176, 128], [72, 160], [168, 162], [120, 96], [92, 100], [148, 100]].map(([x, y]) => C(x, y, 4, '#64B5F6', 0)).join('')
      + P('M60 140c0-34 120-34 120 0s-120 34-120 0z', '#FFFDF2', 3) + [[86, 130], [104, 122], [124, 128], [146, 124], [96, 148], [118, 146], [140, 150], [158, 138]].map(([x, y]) => g(x, y, 1, P('M-7-4h14v8h-14z', '#F3D9A0', 2) + P('M0-4l-3-4h6z', '#F3D9A0', 1.5))).join('')
      + Lc('M70 136c20 10 40-10 60 0s40-10 50 0M80 154c20 6 40-10 60 0', '#E64A19', 4) + [[90, 140], [130, 134], [154, 148], [108, 156]].map(([x, y]) => E(x, y, 3, 2, '#43A047', 0)).join('')
      + face(120, 178, 0.3) + g(200, 70, 1, E(0, 0, 14, 10, '#CFD8DC', 2.5) + Lc('M8 8l26 34', '#CFD8DC', 6) + P('M-6-3h12v6h-12z', '#F3D9A0', 2), 0)),
  L('tr/cappadocia/landmark-ortahisar.v1.svg', 'โกดังมะนาวในถ้ำหินออร์ทาฮิซาร์', 'The lemon caves of Ortahisar', ['ortahisar', 'ออร์ทาฮิซาร์', 'lemon caves', 'ถ้ำเก็บมะนาว', 'cave storage', 'โกดังในถ้ำ', 'lemons', 'มะนาวเหลือง', 'ortahisar castle', 'cool rock store'], 'หาลังไม้ที่เต็มไปด้วยมะนาวสีเหลืองในถ้ำ', 'Find the wooden crates full of yellow lemons inside the cave',
    // a soft rock hill with a big rounded cave door cut into it and a wooden door swung open, inside stacks of wooden crates full of bright yellow lemons, a few lemons rolled outside, the tall castle rock behind
    sky('#E3F2FD') + P('M150 120l20-90h30l20 90z', '#E0C59C', 3) + [[176, 60], [192, 80], [182, 100]].map(([x, y]) => R(x, y, 8, 10, '#6D4C41', 3, 2)).join('')
      + P('M-4 244V120c40-40 160-50 210-20 20 12 38 40 38 60v84z', '#EAD3AE', 3.5) + P('M50 244v-80a50 50 0 0 1 100 0v80z', '#4E342E', 3) + P('M150 244v-90l34-10v100z', '#8D6E63', 3) + C(160, 196, 3, '#FDD835', 1.5)
      + [[62, 214], [102, 214], [62, 186], [102, 186], [82, 158]].map(([x, y]) => R(x, y, 38, 26, '#A1887F', 0, 2.5) + [6, 16, 26].map((dx) => E(x + dx + 3, y + 2, 6, 5, '#FFEB3B', 1.5)).join('')).join('')
      + [[176, 234], [196, 228], [214, 238]].map(([x, y]) => E(x, y, 8, 6, '#FFEB3B', 2)).join('') + face(196, 228, 0.18) + face(100, 112, 0.3)),

  // ---------- Pamukkale, Ephesus, İzmir and Kuşadası
  L('tr/pamukkale/landmark-guvercinada.v1.svg', 'ป้อมเกาะกูเวอร์ชินอาดาที่คุชาดาซึ', 'The little island fortress of Kuşadası', ['güvercinada', 'guvercinada', 'กูเวอร์ชินอาดา', 'pigeon island', 'เกาะนกพิราบ', 'kuşadası castle', 'kusadasi fortress', 'ป้อมบนเกาะ', 'causeway', 'สะพานหินข้ามทะเล'], 'หาทางเดินหินยาวที่พาข้ามทะเลไปถึงเกาะ', 'Find the long stone path that crosses the sea to the island',
    // a small rocky island in a turquoise sea wrapped in battlemented stone walls with a tall square tower, two palm trees, a long stone causeway leading back to the shore, a sailing boat
    sky('#FFF3E0') + P('M-4 120h248v124H-4z', '#26C6DA', 0) + Lc('M20 210h30M180 220h40', '#B2EBF2', 3)
      + P('M-4 200c20-8 60-8 80 0v44H-4z', '#E0C99C', 3) + R(40, 180, 112, 12, '#BCAAA4', 2, 3) + Lc('M60 192v14M90 192v14M120 192v14', '#8D6E63', 3)
      + P('M140 196c0-30 20-50 50-50s50 20 50 50z', '#A1887F', 3) + R(146, 132, 88, 54, '#D7CCC8', 0, 3) + Array.from({ length: 7 }, (_, k) => R(146 + k * 13, 124, 8, 10, '#D7CCC8', 0, 2)).join('') + R(176, 78, 30, 58, '#CDBFB4', 0, 3) + [178, 190, 200].map((x) => R(x, 70, 6, 9, '#CDBFB4', 0, 2)).join('') + R(186, 92, 10, 14, '#5D4037', 5, 2)
      + [158, 222].map((x) => Lc(`M${x} 132v-30`, '#795548', 4) + P(`M${x} 102c-14-4-20 4-22 10M${x} 102c14-4 20 4 22 10M${x} 102c-6-10-14-12-20-8M${x} 102c6-10 14-12 20-8`, 'none') + Lc(`M${x} 102c-14-4-20 4-22 10M${x} 102c14-4 20 4 22 10M${x} 102c-6-10-14-12-20-8M${x} 102c6-10 14-12 20-8`, '#43A047', 5)).join('')
      + face(190, 160, 0.3) + g(76, 140, 1, P('M-20 0h40l-6 10h-28z', '#FFFFFF', 2.5) + Lc('M0 0v-34', INK, 2.5) + P('M2-34l16 28H2z', '#FFCA28', 2))),
  L('tr/pamukkale/landmark-asansor.v1.svg', 'อาซันเซอร์ หอลิฟต์อิฐเก่าของอิซมีร์', 'The old brick lift tower of İzmir', ['asansör', 'asansor', 'อาซันเซอร์', 'historic elevator', 'ลิฟต์โบราณ', 'karataş', 'karatas', 'brick tower', 'หออิฐ', 'izmir sea view'], 'หาสะพานเล็กที่เชื่อมยอดหอคอยกับถนนบนหน้าผา', 'Find the little bridge from the top of the tower to the street on the cliff',
    // a tall red brick tower with arched windows standing against a cliff, a little bridge from its top to houses on the clifftop, a lift car showing through a window, the blue bay of İzmir and palm trees below
    sky('#E1F5FE') + P('M150 40h94v204h-94z', '#C8A27A', 3) + R(160, 20, 30, 22, '#FFF3E0', 0, 2.5) + P('M156 22l19-14 19 14z', '#E57373', 2.5) + R(200, 14, 40, 28, '#FFE082', 0, 2.5) + P('M196 16l24-14 24 14z', '#E57373', 2.5)
      + R(84, 46, 48, 198, '#C0603A', 0, 3.5) + R(80, 30, 56, 18, '#A1482A', 0, 3) + Array.from({ length: 4 }, (_, k) => R(82 + k * 14, 22, 8, 9, '#A1482A', 0, 2)).join('') + R(132, 34, 20, 8, '#8D6E63', 0, 2.5)
      + [70, 110, 150, 190].map((y) => R(98, y, 20, 26, '#FFE0B2', 10, 2.5)).join('') + R(101, 116, 14, 16, '#FDD835', 2, 2) + face(108, 122, 0.12, 'none') + Lc('M84 90h48M84 130h48M84 170h48M84 210h48', '#A1482A', 2)
      + P('M-4 200h88v44H-4z', '#4FC3F7', 0) + Lc('M8 220h30M50 232h26', '#B3E5FC', 3) + g(40, 196, 1, Lc('M0 0v-40', '#795548', 4) + Lc('M0-40c-12-4-18 4-20 10M0-40c12-4 18 4 20 10M0-40c-6-10-12-12-18-8', '#43A047', 5)) + face(108, 100, 0.26)),
  L('tr/pamukkale/landmark-kaklik.v1.svg', 'ถ้ำคักลึก ปามุคคาเลในถ้ำ', 'Kaklık Cave, white terraces underground', ['kaklık cave', 'kaklik cave', 'ถ้ำคักลึก', 'kaklık mağarası', 'travertine cave', 'ถ้ำหินปูนขาว', 'underground pamukkale', 'ปามุคคาเลใต้ดิน', 'denizli', 'blue pools'], 'หาแอ่งน้ำสีฟ้าที่เรียงเป็นขั้นบันไดในถ้ำ', 'Find the blue pools stepping down inside the cave',
    // a dark rounded cave with a hole in the roof letting in a beam of sunlight, white travertine shelves stepping down inside it with little turquoise pools, a wooden walkway with a rail, a child looking in
    sky('#3E2723') + P('M-4 -4h248v60c-30-20-60 0-80-10s-60-10-90 4-50-10-78 6z', '#5D4037', 0) + C(130, 30, 22, '#FFF59D', 3) + P('M112 40l-30 150h100l-30-150z', '#FFF59D', 0) + P('M112 40l-30 150h100l-30-150z', '#FFF9C4', 0)
      + [[40, 130, 160], [56, 158, 128], [70, 186, 100]].map(([x, y, w]) => P(`M${x} ${y}h${w}c4 10-4 16-10 16H${x + 10}c-6 0-14-6-10-16z`, '#FAFAFA', 3) + E(x + w / 2, y + 2, w / 2 - 10, 5, '#4DD0E1', 2)).join('')
      + Lc('M70 202c4 10 6 14 4 20M110 204c2 8 0 14-2 20', '#E0F7FA', 3) + R(-4, 222, 248, 8, '#8D6E63', 0, 3) + Lc('M-4 206h248M20 206v16M80 206v16M160 206v16M220 206v16', '#6D4C41', 3) + kid(200, 220, '#FF7043', 1.2) + face(120, 168, 0.3)),
  L('tr/pamukkale/landmark-dilek.v1.svg', 'ม้าป่าริมอ่าวบนคาบสมุทรดิเลค', 'Wild horses in a Dilek Peninsula cove', ['dilek peninsula', 'dilek yarımadası', 'คาบสมุทรดิเลค', 'wild horses', 'ม้าป่า', 'national park', 'อุทยานแห่งชาติ', 'pebble cove', 'อ่าวกรวด', 'kuşadası beaches'], 'หาลูกม้าตัวเล็กที่ยืนข้างแม่บนชายหาดกรวด', 'Find the foal standing by its mother on the pebble beach',
    // a quiet pebble cove with clear turquoise water, steep green pine hills on each side, a brown wild horse with a dark mane and a little foal beside it on the beach
    sky('#E1F5FE') + P('M-4 70c40-20 60 0 80 30v80H-4z', '#558B2F', 3) + P('M244 60c-40-10-70 10-90 40v80h90z', '#689F38', 3) + P('M60 120h120v50H60z', '#26C6DA', 0) + P('M-4 160c80-14 180-14 248 0v84H-4z', '#E0D3C0', 0)
      + [[30, 200], [70, 214], [190, 206], [216, 226], [120, 230]].map(([x, y]) => E(x, y, 8, 5, '#BCAAA4', 2)).join('') + Lc('M70 160c30-6 70-6 100 0', '#FFFFFF', 3)
      + g(110, 190, 1, E(0, 0, 34, 16, '#8D5524', 3) + Lc('M-24 12v26M-12 14v24M14 14v24M26 12v26', '#6D3D14', 6) + P('M24-8l20-30 12 4-10 34z', '#8D5524', 3) + E(52, -36, 10, 14, '#8D5524', 3) + P('M30-12l20-30', 'none') + Lc('M28-14l20-28', '#3E2723', 6) + Lc('M-34-4c-10 6-12 18-8 26', '#3E2723', 6) + C(54, -40, 2.5, INK, 0) + P('M48-48l2-8 5 6z', '#8D5524', 2))
      + g(176, 204, 0.6, E(0, 0, 30, 14, '#C68642', 3) + Lc('M-20 12v28M-8 12v28M10 12v28M22 12v28', '#8D5524', 6) + P('M22-6l16-26 12 4-8 30z', '#C68642', 3) + E(46, -32, 10, 13, '#C68642', 3) + C(48, -34, 2.5, INK, 0))),
  L('tr/pamukkale/landmark-kumru.v1.svg', 'คุมรู แซนด์วิชงาของอิซมีร์', 'Kumru, İzmir\'s sesame sandwich', ['kumru', 'คุมรู', 'izmir sandwich', 'แซนด์วิชอิซมีร์', 'sesame bun', 'ขนมปังงา', 'melted cheese', 'ชีสยืด', 'çeşme', 'toasted sandwich'], 'หาชีสที่ยืดออกมาจากขนมปังงา', 'Find the cheese stretching out of the sesame bun',
    // a big round bun crusted all over with sesame seeds, toasted and pressed, cut open with melted cheese stretching out, slices of pink sausage, tomato and green pepper, smiling, on wax paper
    P('M30 196l90-30 90 30-90 30z', '#FFF8E1', 3) + P('M44 140c0-44 152-44 152 0z', '#D9963A', 3.5) + [[70, 118], [90, 108], [112, 104], [134, 106], [156, 112], [176, 124], [80, 130], [130, 122], [160, 130], [104, 124]].map(([x, y]) => E(x, y, 3, 1.6, '#FFF3C4', 1)).join('')
      + P('M40 142h160l-6 10H46z', '#FFCA28', 3) + Lc('M70 150c2 10-4 14 0 22M150 150c4 10-2 16 2 22', '#FFCA28', 5) + R(44, 150, 152, 8, '#F48FB1', 4, 2.5) + R(52, 156, 40, 7, '#E53935', 3, 2) + R(140, 156, 46, 7, '#7CB342', 3, 2)
      + P('M46 164h148c0 24-30 34-74 34s-74-10-74-34z', '#D9963A', 3.5) + face(120, 178, 0.35)),

  // ---------- Georgia
  K('ge', 'food', 'pkhali', 'ผักลี ก้อนผักบดกับวอลนัต', 'Pkhali, vegetable and walnut balls', ['pkhali', 'ผักลี', 'mkhali', 'walnut paste', 'วอลนัตบด', 'spinach balls', 'บีตรูต', 'beetroot', 'pomegranate seeds', 'georgian starter'],
    // a round plate of smooth balls in three colours, spinach green, beetroot purple and leek pale green, each pressed with a criss-cross pattern and topped with shiny red pomegranate seeds, walnut halves on the side
    E(120, 150, 100, 60, '#FFFFFF', 3.5) + E(120, 150, 86, 48, '#F1F8E9', 2.5)
      + [[70, 140, '#558B2F'], [120, 128, '#8E2459'], [170, 140, '#9CCC65'], [96, 168, '#8E2459'], [146, 168, '#558B2F']].map(([x, y, c]) => C(x, y, 24, c, 3) + Lc(`M${x - 12} ${y - 6}l24 12M${x - 12} ${y + 6}l24-12`, 'rgba(255,255,255,.5)', 2) + [[-4, -10], [6, -8], [0, -14]].map(([a, b]) => C(x + a, y + b, 3, '#E53935', 1.2)).join('')).join('')
      + face(120, 132, 0.25) + [[30, 84], [60, 70], [186, 70]].map(([x, y]) => g(x, y, 1, E(0, 0, 14, 10, '#C49A6C', 2.5) + Lc('M-8-2c4 6 12 6 16 0', '#8D6E63', 2))).join('')),
  K('ge', 'food', 'tklapi', 'ตกลาปี แผ่นผลไม้กวนตากแห้ง', 'Tklapi, fruit leather sheets', ['tklapi', 'ตกลาปี', 'fruit leather', 'ผลไม้กวนแผ่น', 'tkemali plum', 'พลัม', 'apricot', 'แอปริคอต', 'georgian sweets', 'market stall'],
    // big thin sheets of fruit leather in plum red, apricot orange and dark purple hanging over a line like washing, one rolled up into a tube, a few plums at the bottom
    Lc('M10 40c80 16 140 16 220 0', '#8D6E63', 4) + [[40, '#C62828', 0], [100, '#FB8C00', 1], [162, '#6A1B9A', 0]].map(([x, c, f]) => P(`M${x - 24} 46c16 4 32 4 48 0l4 120c-16 8-38 8-56 0z`, c, 3) + Lc(`M${x - 14} 70c6 4 10 4 18 0M${x - 10} 110c6 4 10 4 18 0`, 'rgba(255,255,255,.45)', 3) + (f ? face(x, 110, 0.32) : '') + C(x - 16, 48, 4, '#FFCA28', 1.5) + C(x + 16, 48, 4, '#FFCA28', 1.5)).join('')
      + g(170, 206, 1, R(-40, -12, 80, 24, '#EF5350', 12, 3) + E(40, 0, 6, 12, '#C62828', 2.5) + Lc('M-30-4h50', 'rgba(255,255,255,.5)', 2))
      + [[40, 210], [64, 218], [90, 208]].map(([x, y]) => C(x, y, 11, '#7B1FA2', 2.5) + Lc(`M${x} ${y - 10}l2-8`, '#558B2F', 2.5)).join('')),
  K('ge', 'culture', 'minankari', 'มินันการิ เครื่องประดับลงยาของจอร์เจีย', 'Minankari, Georgian enamel jewellery', ['minankari', 'มินันการิ', 'georgian enamel', 'เครื่องประดับลงยา', 'cloisonné', 'cloisonne', 'pendant', 'จี้', 'tbilisi craft', 'gold wire'],
    // a big round gold pendant filled with bright cloisonné enamel: a red-and-blue flower inside rings of turquoise and white set in gold wire, hanging from a gold chain, a pair of small matching earrings beside it
    Lc('M60 20c20 40 40 50 60 56 20-6 40-16 60-56', '#FFCA28', 4) + C(120, 76, 7, '#FFCA28', 2.5)
      + C(120, 146, 66, '#FFC107', 4) + C(120, 146, 56, '#26A69A', 3) + C(120, 146, 42, '#FFFFFF', 3) + Array.from({ length: 8 }, (_, k) => { const a = (k * Math.PI) / 4; return E(120 + Math.cos(a) * 26, 146 + Math.sin(a) * 26, 9, 9, k % 2 ? '#E53935' : '#1E88E5', 2.5); }).join('') + C(120, 146, 12, '#FDD835', 2.5) + face(120, 144, 0.22)
      + Array.from({ length: 12 }, (_, k) => { const a = (k * Math.PI) / 6; return C(120 + Math.cos(a) * 61, 146 + Math.sin(a) * 61, 2.5, '#FFF8E1', 0); }).join('')
      + [30, 210].map((x) => C(x, 166, 4, '#FFCA28', 2) + P(`M${x} 170l-12 20 12 16 12-16z`, '#1E88E5', 2.5) + C(x, 190, 4, '#E53935', 1.5)).join('')),
  K('ge', 'culture', 'felt', 'หมวกและรองเท้าสักหลาดของทูเชติ', 'Felt hats and slippers from Tusheti', ['tushetian felt', 'felt', 'สักหลาด', 'tusheti', 'ทูเชติ', 'felt hat', 'หมวกสักหลาด', 'felt slippers', 'รองเท้าสักหลาด', 'wool craft'],
    // a round white felt hat with a turned-up brim decorated with a red and black swirl pattern, a pair of colourful felted slippers with curly patterns below it, a fluffy ball of wool
    E(120, 104, 74, 18, '#F5F5F5', 3.5) + P('M68 102c0-50 104-50 104 0z', '#FAFAFA', 3.5) + Lc('M80 86c10-10 20 10 30 0s20 10 30 0 16 6 20 0', '#C62828', 4) + Lc('M76 104c14 6 30 6 44 0s30 6 44 0', INK, 3) + face(120, 64, 0.3)
      + [[74, 0], [166, 1]].map(([x]) => P(`M${x - 34} 196c0-22 10-36 34-36s36 14 36 30c0 14-10 20-36 20s-34-4-34-14z`, '#E53935', 3) + Lc(`M${x - 18} 186c6-10 16 0 22-6M${x - 4} 200c6-6 12 0 18-4`, '#FDD835', 3.5) + E(x + 14, 176, 10, 6, '#1E88E5', 2)).join('')
      + C(206, 64, 18, '#80CBC4', 3) + Lc('M194 56c8 4 18 4 24 0M192 68c10 4 20 4 28 0M200 46c-2 10 0 20 4 34', '#4DB6AC', 2.5) + Lc('M188 74c-14 10-22 20-26 30', '#80CBC4', 3)),

  // ---------- Tbilisi, Kazbegi and Batumi
  L('ge/tbilisi/landmark-uplistsikhe.v1.svg', 'อุปลิสต์ซิเค เมืองถ้ำโบราณ', 'Uplistsikhe, the old town cut into the rock', ['uplistsikhe', 'อุปลิสต์ซิเค', 'cave town', 'เมืองถ้ำ', 'rock-cut town', 'เมืองในหิน', 'gori', 'กอรี', 'mtkvari', 'ancient town'], 'หาซุ้มประตูที่มีเสาสองต้นแกะในหิน', 'Find the doorway with two columns carved in the rock',
    // a big sandy rock hill carved with rooms, dark doorways and steps, one hall with a wide arched front and two carved pillars, a tunnel-like path winding up, the green river valley below
    sky('#FFF3E0') + P('M-4 200c60-10 180-10 248 0v44H-4z', '#81C784', 0) + Lc('M-4 222c60 6 140-6 248 4', '#4FC3F7', 6)
      + P('M-4 200c10-60 40-120 110-130 50-6 100 20 138 60v70z', '#E5C79A', 3.5) + P('M60 118c30-14 80-20 120 0', 'none') + Lc('M40 170c30-8 40-30 70-34s50 6 70-6', '#C9A774', 8)
      + R(88, 100, 64, 44, '#C9A774', 4, 3) + P('M96 144v-24a24 24 0 0 1 48 0v24z', '#5D4037', 3) + R(100, 118, 8, 26, '#E5C79A', 0, 2.5) + R(132, 118, 8, 26, '#E5C79A', 0, 2.5)
      + [[30, 170], [60, 150], [176, 128], [204, 150], [190, 176]].map(([x, y]) => R(x, y, 14, 16, '#6D4C41', 4, 2.5)).join('') + Lc('M160 170l8-4 8 4 8-4M40 190l8-4 8 4', '#A1887F', 3)
      + face(64, 116, 0.3) + kid(200, 200, '#1E88E5', 1)),
  L('ge/tbilisi/landmark-gonio.v1.svg', 'ป้อมโกนิโอใกล้บาตูมี', 'Gonio Fortress near Batumi', ['gonio fortress', 'gonio', 'ป้อมโกนิโอ', 'apsaros', 'roman fortress', 'ป้อมโรมัน', 'square walls', 'กำแพงสี่เหลี่ยม', 'adjara', 'near batumi'], 'หาหอคอยสี่เหลี่ยมที่มุมกำแพง', 'Find the square towers on the corners of the walls',
    // a big square fortress seen from above at an angle: long stone walls with square towers on the corners and middles, a green lawn inside with trees, a gate in the front wall, misty green hills and the sea behind
    sky('#E0F7FA') + P('M-4 70c40-20 80-10 120 0s80-20 128-6v40H-4z', '#A5D6A7', 0) + P('M-4 100h248v144H-4z', '#C5E1A5', 0)
      + P('M30 140l90-36 90 36-90 46z', '#8BC34A', 3) + Lc('M30 140l90-36 90 36-90 46z', '#BCAAA4', 10) + Lc('M30 140l90-36 90 36-90 46z', '#D7CCC8', 5)
      + [[30, 140], [120, 104], [210, 140], [120, 186], [75, 122], [165, 122], [75, 163], [165, 163]].map(([x, y], k) => R(x - 10, y - (k < 4 ? 30 : 22), 20, k < 4 ? 34 : 26, '#CDBFB4', 0, 3) + R(x - 12, y - (k < 4 ? 34 : 26), 24, 6, '#BCAAA4', 0, 2.5)).join('')
      + P('M112 186v-14a8 8 0 0 1 16 0v14z', '#5D4037', 2.5) + [[100, 140], [140, 136], [120, 156]].map(([x, y]) => g(x, y, 0.8, R(-3, 0, 6, 12, '#795548', 0, 2) + C(0, -8, 11, '#43A047', 2.5))).join('')
      + face(30, 120, 0.22) + kid(200, 226, '#FF7043', 1)),
  L('ge/tbilisi/landmark-drybridge.v1.svg', 'ตลาดของเก่าที่สะพานแห้ง', 'The Dry Bridge flea market', ['dry bridge market', 'mshrali khidi', 'ตลาดสะพานแห้ง', 'flea market', 'ตลาดของเก่า', 'antiques', 'ของโบราณ', 'paintings for sale', 'ภาพวาด', 'soviet souvenirs'], 'หาแตรเครื่องเล่นแผ่นเสียงอันใหญ่บนผ้าปู', 'Find the big gramophone horn on the blanket',
    // a stone bridge railing hung with little framed paintings, below on a red patterned blanket old treasures for sale: a gramophone with a big flower-shaped horn, a teapot, an old camera, toy cars and a little clock
    sky('#FFF8E1') + R(-4, 40, 248, 70, '#CFD8DC', 0, 0) + R(-4, 98, 248, 12, '#B0BEC5', 0, 3) + Lc('M10 40v58M60 40v58M110 40v58M160 40v58M210 40v58', '#90A4AE', 3)
      + [[24, 54, '#FFCC80', '#4CAF50'], [74, 50, '#B3E5FC', '#FFCA28'], [124, 56, '#F8BBD0', '#E53935'], [174, 50, '#C5E1A5', '#1E88E5']].map(([x, y, bg, fg]) => R(x, y, 34, 30, '#8D6E63', 0, 2.5) + R(x + 4, y + 4, 26, 22, bg, 0, 1.5) + C(x + 17, y + 15, 6, fg, 0)).join('')
      + P('M-4 120h248v124H-4z', '#D7CCC8', 0) + P('M14 140h212l14 90H0z', '#C62828', 3) + Lc('M20 160h204M14 200h216', '#FFCA28', 3)
      + g(70, 196, 1, R(-22, -12, 44, 24, '#6D4C41', 2, 2.5) + Lc('M0-12l10-30', '#FFCA28', 3) + P('M6-40c-10-30 40-40 44-10z', '#FFC107', 3) + C(-8, 0, 3, '#FFCA28', 0))
      + g(150, 196, 1, P('M-16 10c-6-30 38-30 32 0z', '#4FC3F7', 2.5) + Lc('M16-2c10 0 10 10 0 10', '#4FC3F7', 3) + Lc('M-16 0l-10-10', '#4FC3F7', 4) + face(0, 0, 0.22))
      + g(200, 210, 1, R(-16, -10, 32, 20, '#37474F', 3, 2.5) + C(0, 0, 7, '#90A4AE', 2.5)) + g(112, 222, 1, R(-14, -6, 28, 10, '#1E88E5', 4, 2) + C(-8, 6, 4, INK, 0) + C(8, 6, 4, INK, 0)) + g(34, 222, 1, C(0, 0, 10, '#FFF3E0', 2.5) + Lc('M0 0v-6M0 0h5', INK, 2))),
  L('ge/tbilisi/landmark-chaukhi.v1.svg', 'ยอดเขาเชาคีเหนือหมู่บ้านจูตา', 'The jagged Chaukhi peaks above Juta', ['chaukhi', 'เชาคี', 'juta', 'จูตา', 'chaukhi pass', 'georgian dolomites', 'ภูเขายอดแหลม', 'wildflower meadow', 'ทุ่งดอกไม้', 'kazbegi hike'], 'หายอดเขาหินแหลมเหมือนฟันเลื่อยหลายยอด', 'Find the row of sharp rocky peaks like saw teeth',
    // a row of jagged dark grey rock spires like a crown with patches of snow, a green meadow full of purple and yellow wildflowers below, a little wooden hut, a child with a walking stick on the trail
    sky('#B3E5FC') + P('M-4 150l24-40 14 14 18-70 14 40 16-64 16 52 14-36 18 60 14-40 18 50 20-40 20 40 18-20 24 54z', '#78909C', 3.5)
      + P('M50 54l6 18-12 6zM82 46l8 20-14 2zM124 50l4 14-10 2zM176 74l4 14-10 2z', '#FFFFFF', 2) + P('M-4 150c60-14 180-14 248 0v94H-4z', '#9CCC65', 0)
      + [[20, 180], [44, 200], [70, 176], [150, 186], [180, 210], [210, 180], [100, 220], [30, 226]].map(([x, y], k) => C(x, y, 5, k % 2 ? '#AB47BC' : '#FDD835', 1.5)).join('')
      + R(160, 150, 40, 26, '#A1887F', 0, 3) + P('M154 152l26-18 26 18z', '#6D4C41', 3) + R(174, 160, 10, 16, '#4E342E', 0, 2)
      + Lc('M60 244c20-30 50-40 80-60', '#D7CCC8', 8) + kid(98, 214, '#E53935', 1.1) + Lc('M108 214l6-22', '#795548', 3) + face(120, 104, 0.3)),
  L('ge/tbilisi/landmark-sololaki.v1.svg', 'โถงบันไดวาดลายในย่านโซโลลากี', 'A painted stairwell in Sololaki', ['sololaki', 'โซโลลากี', 'painted entrance hall', 'โถงทางเข้าวาดลาย', 'old tbilisi houses', 'บ้านเก่าทบิลิซี', 'spiral staircase', 'บันไดวน', 'painted ceiling', 'stained glass'], 'หาดอกไม้ที่วาดอยู่บนเพดานเหนือบันไดวน', 'Find the flowers painted on the ceiling over the spiral stairs',
    // inside an old house entrance: walls painted in faded turquoise with gold and pink flower garlands, a wooden spiral staircase curling up with a carved rail, a painted ceiling of flowers, a little coloured-glass window
    sky('#B2DFDB') + P('M-4 -4h248v44H-4z', '#F8E1C4', 3) + [[40, 18], [100, 18], [160, 18], [220, 18]].map(([x, y]) => C(x, y, 9, '#F48FB1', 2) + C(x, y, 3, '#FFCA28', 0) + E(x - 14, y, 6, 3, '#81C784', 0) + E(x + 14, y, 6, 3, '#81C784', 0)).join('')
      + Lc('M-4 64c40 20 80-20 124 0s80-20 124 0', '#FFCA28', 4) + [[30, 70], [90, 60], [150, 70], [210, 60]].map(([x, y]) => C(x, y, 6, '#F06292', 1.5)).join('')
      + R(170, 90, 50, 70, '#FFFFFF', 25, 3) + [[180, 100, '#E53935'], [200, 100, '#1E88E5'], [180, 126, '#FDD835'], [200, 126, '#43A047']].map(([x, y, c]) => R(x, y, 16, 22, c, 0, 1.5)).join('')
      + P('M40 244c0-40 100-30 100-60s-80-20-80-50 60-30 70-50', 'none') + Lc('M40 244c0-40 100-30 100-60s-80-20-80-50 60-30 70-50', '#8D6E63', 26) + Lc('M40 244c0-40 100-30 100-60s-80-20-80-50 60-30 70-50', '#BCAAA4', 18)
      + Lc('M28 236c0-40 100-34 100-60s-80-24-80-54 60-30 70-50', '#5D4037', 4) + [[52, 220], [86, 206], [118, 190], [104, 156], [72, 140], [72, 116], [100, 100]].map(([x, y]) => Lc(`M${x} ${y}v14`, '#5D4037', 2.5)).join('') + face(196, 172, 0.3)),
];

export default { places: {}, items };
