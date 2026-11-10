// Wave 8, the north (part 1): the United Kingdom, London, the Netherlands, Amsterdam, Finland, Lapland, Norway
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SCOPE = { 'fi-lapland': 'p-lapland' };
// the id follows the file name (fi/lapland/landmark-arktikum.v1.svg → p-lapland.landmark.arktikum)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): no background, its own halo
const X = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const snowPine = (x, y, s) => g(x, y, s, P('M0-40l14 22h-7l11 18H-18l11-18h-7z', '#2E7D32', 2.5) + P('M0-40l7 11h-7l-7-1zM-7-18h14l3 5h-20z', '#FFFFFF', 0) + R(-3, 0, 6, 8, '#6D4C41', 0, 2));
// the gherkin's spiral: dark bands winding round an egg-shaped tower (half-width from the ellipse at each height)
const hw = (y) => 46 * Math.sqrt(Math.max(0, 1 - ((y - 120) / 96) ** 2));
const spiral = (off) => { let d = ''; for (let k = 0; k < 9; k++) { const y1 = 40 + k * 20, y2 = y1 + 20; const a1 = Math.sin(off + k * 0.5), a2 = Math.sin(off + k * 0.5 + 0.5); d += `M${(120 + hw(y1) * a1).toFixed(1)} ${y1}L${(120 + hw(y2) * a2).toFixed(1)} ${y2}`; } return d; };

const items = [
  // ---------- United Kingdom
  X('gb', 'food', 'crumpets', 'ครัมเปตทาเนยร้อนๆ', 'Hot buttered crumpets', ['crumpet', 'ครัมเปต', 'crumpets with butter', 'ครัมเปตทาเนย', 'toasted crumpet', 'ขนมปังรูพรุน', 'british breakfast', 'อาหารเช้าอังกฤษ', 'teatime', 'tea and toast'],
    // two thick round crumpets stacked on a blue-rimmed plate, their spongy tops full of little holes, a pat of butter melting and dripping down the side
    E(120, 182, 100, 24, '#FFFFFF', 3) + E(120, 180, 84, 16, '#E3F2FD', 0)
    + [[120, 170], [120, 132]].map(([x, y]) => g(x, y, 1, P('M-62 0v-20h124v20c0 12-124 12-124 0z', '#E0A458', 3) + E(0, -20, 62, 16, '#F6CB86', 3)
      + [[-40, -22], [-24, -16], [-6, -26], [10, -18], [28, -24], [44, -18], [-14, -10], [20, -10], [-34, -28], [4, -32], [36, -30], [-48, -16]].map(([a, b]) => C(a, b, 2.6, '#B4733A', 0)).join(''))).join('')
    + g(126, 112, 1, P('M-20 0l4-16h32l4 16c-6 4-10 4-12 0-4 10-8 12-10 2-6 4-12 2-18-2z', '#FFF176', 2.5) + R(-12, -12, 18, 4, '#FFFDE7', 1, 0))
    + face(120, 168, 0.38)),
  X('gb', 'culture', 'cricket', 'คริกเกต ไม้ตีกับลูกบอลแดง', 'Cricket: bat, red ball and stumps', ['cricket', 'คริกเกต', 'cricket bat', 'ไม้คริกเกต', 'wicket', 'วิคเก็ต', 'stumps and bails', 'หลักวิคเก็ต', 'red leather ball', 'village green'],
    // three wooden stumps topped with two little bails, a flat willow bat leaning beside them and a shiny red ball with a white stitched seam rolling on the grass
    E(120, 200, 104, 18, '#8BC34A', 3)
    + [80, 100, 120].map((x) => R(x - 5, 76, 10, 120, '#F3D9A4', 4, 3)).join('') + R(74, 68, 26, 8, '#E9C27A', 3, 2.5) + R(98, 68, 26, 8, '#E9C27A', 3, 2.5)
    + g(170, 130, 1, R(-14, -20, 28, 82, '#F5E1B8', 10, 3) + Lc('M0-14v70', '#E2C48F', 3) + R(-5, -62, 10, 44, '#5D4037', 4, 3) + Lc('M-5-56h10M-5-48h10M-5-40h10M-5-32h10', '#8D6E63', 2), 14)
    + g(70, 184, 1, C(0, 0, 20, '#D32F2F', 3) + Lc('M-12-16c8 10 8 22 0 32', '#FFFFFF', 2.5) + Lc('M-6-18c8 10 8 26 0 36', '#FFFFFF', 1.2) + E(-8, -8, 5, 3, '#EF9A9A', 0) + face(4, 2, 0.28))),
  // ---------- London
  L('gb/london/landmark-shard.v1.svg', 'ตึกเดอะชาร์ด ปิรามิดแก้วริมเทมส์', 'The Shard, the glass splinter by the Thames', ['the shard', 'เดอะชาร์ด', 'glass pyramid tower', 'ตึกแก้วทรงปิรามิด', 'tallest building', 'ตึกที่สูงที่สุด', 'london bridge station', 'ลอนดอนบริดจ์', 'view from the shard', 'southwark'], 'หาปลายตึกที่แตกเป็นแผ่นแก้วแหลมๆ', 'Find the top where the glass splits into sharp pieces',
    // a tall thin glass pyramid of pale blue panes rising from the river bank, its tip broken into jagged glass splinters, a little red bus and the river in front
    sky('#FFF3E0') + P('M-4 206h248v38H-4z', '#4FC3F7', 0) + Lc('M30 222h40M150 230h50', '#E1F5FE', 3) + R(-4, 192, 248, 14, '#B0BEC5', 0, 3)
    + P('M70 192L112 40h16L170 192z', '#B3E5FC', 3.5) + P('M120 40L120 192', 'none', 2) + P('M112 40l-6-20 8 14 2-24 6 26 4-22 2 22 6-16-4 20z', '#E1F5FE', 2.5)
    + [70, 96, 122, 148, 174].map((y) => Lc(`M${120 - (y - 40) * 0.33} ${y}H${120 + (y - 40) * 0.33}`, '#81D4FA', 2)).join('') + P('M120 40L150 192h20L128 40z', '#81D4FA', 0) + P('M70 192L112 40h16L170 192z', 'none', 3.5)
    + face(120, 150, 0.45) + g(40, 184, 1, R(-20, -12, 40, 18, '#E53935', 3, 2.5) + R(-16, -8, 10, 6, '#E1F5FE', 1, 1.5) + R(-2, -8, 10, 6, '#E1F5FE', 1, 1.5) + C(-10, 7, 4, INK, 0) + C(10, 7, 4, INK, 0)) + kid(206, 192, '#AB47BC', 0.9)),
  L('gb/london/landmark-gherkin.v1.svg', 'ตึกแตงกวาดองเดอะเกอร์คิน', 'The Gherkin, the pickle-shaped tower', ['the gherkin', 'ตึกเดอะเกอร์คิน', '30 st mary axe', 'เซนต์แมรีแอกซ์', 'pickle tower', 'ตึกแตงกวาดอง', 'city of london', 'ย่านการเงิน', 'spiral glass', 'กระจกลายเกลียว'], 'หาลายเกลียวสีเขียวเข้มที่วนรอบตึก', 'Find the dark green stripes spiralling round the tower',
    // a rounded bullet-shaped tower of green glass with dark green bands winding round it like a pickle, a little lens at the top, among small square office blocks
    sky('#E8F5E9') + R(14, 150, 46, 80, '#CFD8DC', 2, 3) + R(184, 130, 44, 100, '#B0BEC5', 2, 3) + [[24, 162], [40, 162], [24, 182], [40, 182], [194, 144], [210, 144], [194, 166], [210, 166], [194, 188], [210, 188]].map(([x, y]) => R(x, y, 10, 10, '#E3F2FD', 1, 1.5)).join('')
    + E(120, 120, 46, 96, '#A5D6A7', 3.5) + Lc(spiral(0), '#2E7D32', 7) + Lc(spiral(2.1), '#2E7D32', 7) + Lc(spiral(4.2), '#2E7D32', 7)
    + [60, 90, 120, 150, 180].map((y) => Lc(`M${120 - hw(y)} ${y}H${120 + hw(y)}`, '#C8E6C9', 1.5)).join('') + E(120, 32, 10, 6, '#E1F5FE', 2.5) + E(120, 120, 46, 96, 'none', 3.5)
    + R(-4, 212, 248, 32, '#90A4AE', 0, 3) + face(120, 130, 0.45) + kid(78, 230, '#FFCA28', 0.9) + kid(160, 230, '#E53935', 0.9)),
  L('gb/london/landmark-stpauls.v1.svg', 'โดมใหญ่ของมหาวิหารเซนต์พอล', 'The great dome of St Paul’s Cathedral', ['st pauls cathedral', 'มหาวิหารเซนต์พอล', 'great dome', 'โดมใหญ่', 'whispering gallery', 'ระเบียงกระซิบ', 'ludgate hill', 'ลัดเกตฮิลล์', 'golden ball', 'ลูกบอลทอง'], 'หาลูกบอลสีทองบนยอดโดม', 'Find the golden ball on top of the dome',
    // a huge grey-blue dome on a ring of columns, a small lantern and golden ball on top, two little bell towers in front either side of a columned porch with wide steps
    sky('#FFF8E1') + R(70, 104, 100, 36, '#ECEFF1', 2, 3) + [78, 92, 106, 120, 134, 148, 162].map((x) => R(x - 3, 110, 6, 26, '#FFFFFF', 1, 1.5)).join('')
    + P('M66 104c0-64 108-64 108 0z', '#90A4AE', 3.5) + [86, 103, 120, 137, 154].map((x) => Lc(`M${x} 104C${x + (x - 120) * 0.1} 70 ${120 + (x - 120) * 0.4} 52 120 50`, '#78909C', 2)).join('') + R(110, 30, 20, 20, '#ECEFF1', 2, 2.5) + P('M108 30l12-10 12 10z', '#B0BEC5', 2) + C(120, 14, 7, '#FFCA28', 2.5)
    + R(30, 140, 180, 70, '#ECEFF1', 2, 3) + [[30, 90], [176, 90]].map(([x, y]) => R(x, y, 34, 50, '#ECEFF1', 2, 3) + P(`M${x - 2} ${y}c4-18 34-18 38 0z`, '#B0BEC5', 2.5) + C(x + 17, y + 20, 6, '#FFCA28', 2)).join('')
    + P('M84 160l36-20 36 20z', '#FFFFFF', 3) + [92, 106, 120, 134, 148].map((x) => R(x - 3, 160, 6, 40, '#FFFFFF', 1, 1.5)).join('') + R(20, 210, 200, 8, '#CFD8DC', 0, 2.5) + R(10, 218, 220, 8, '#B0BEC5', 0, 2.5)
    + face(120, 84, 0.4) + kid(48, 210, '#43A047', 0.85) + kid(196, 210, '#FB8C00', 0.85)),
  L('gb/london/landmark-meridian.v1.svg', 'ยืนคร่อมเส้นเมริเดียนที่กรีนิช', 'Standing on the Prime Meridian at Greenwich', ['greenwich', 'กรีนิช', 'prime meridian', 'เส้นเมริเดียนแรก', 'royal observatory', 'หอดูดาวหลวง', 'time ball', 'ลูกบอลบอกเวลา', 'east and west', 'ซีกโลกตะวันออกตะวันตก'], 'หาเด็กที่ยืนเท้าหนึ่งตะวันออกอีกเท้าตะวันตก', 'Find the child with one foot in the east and one in the west',
    // a shining brass line running across the cobbles, a child standing astride it with arms wide, behind them the red-brick observatory with a small dome and a red ball on a mast at the top
    sky('#E1F5FE') + P('M-4 150h248v94H-4z', '#CFD8DC', 0) + [[20, 170], [60, 186], [190, 176], [210, 210], [40, 222], [170, 228]].map(([x, y]) => E(x, y, 12, 6, '#B0BEC5', 2)).join('')
    + R(30, 70, 120, 80, '#C0603A', 2, 3) + [[46, 92], [80, 92], [114, 92]].map(([x, y]) => R(x, y, 20, 26, '#FFF8E1', 6, 2.5)).join('') + Lc('M30 126h120', '#FFF8E1', 4) + R(150, 92, 60, 58, '#C0603A', 2, 3) + P('M150 92c0-36 60-36 60 0z', '#90A4AE', 3)
    + Lc('M90 70V22', INK, 3) + C(90, 24, 10, '#E53935', 3) + R(84, 60, 12, 10, '#FFF8E1', 1, 2)
    + P('M114 150l-8 94h12l6-94z', '#FFCA28', 2.5) + Lc('M116 160l-6 80', '#FFF59D', 2)
    + g(116, 216, 1, Lc('M-6 -8l-18 22M6-8l18 22', '#1E88E5', 7) + Lc('M-6-8l-18 22M6-8l18 22', INK, 1.5) + R(-12, -40, 24, 34, '#FFCA28', 5, 2.5) + Lc('M-12-34l-24-14M12-34l24-14', '#FFE0BD', 5) + C(0, -54, 13, '#FFE0BD', 2.5) + P('M-13-58c0-14 26-14 26 0z', '#6D4C41', 2) + face(0, -52, 0.32) + E(-26, 16, 8, 4, '#E53935', 2) + E(26, 16, 8, 4, '#E53935', 2))
    + face(80, 136, 0.3)),

  // ---------- Netherlands
  X('nl', 'food', 'hagelslag', 'ขนมปังทาเนยโรยช็อกโกแลตเม็ด', 'Bread with chocolate sprinkles', ['hagelslag', 'ฮาเคิลสลัค', 'chocolate sprinkles', 'ช็อกโกแลตเม็ด', 'sprinkles on bread', 'ขนมปังโรยช็อกโกแลต', 'dutch breakfast', 'อาหารเช้าดัตช์', 'buttered bread', 'muisjes'],
    // a slice of soft white bread with a golden crust, spread with butter and covered in a thick layer of dark chocolate sprinkles, a few rolling off onto the plate, a knife with butter beside it
    E(120, 188, 104, 24, '#FFFFFF', 3) + E(120, 186, 88, 16, '#FCE4EC', 0)
    + P('M48 180V96c-22-6-22-44 12-48 26-4 44 10 60 10s34-14 60-10c34 4 34 42 12 48v84z', '#E9B872', 3.5) + P('M58 172V100c-18-8-14-34 6-36 24-2 40 10 56 10s32-12 56-10c20 2 24 28 6 36v72z', '#FFF6DE', 2.5)
    + Array.from({ length: 70 }, (_, k) => { const x = 66 + (k * 37) % 108, y = 76 + ((k * 53) % 94); return Lc(`M${x} ${y}l${(k % 3) - 1 + 3} ${(k % 2) * 2 - 1}`, k % 9 === 0 ? '#F48FB1' : '#4E342E', 3); }).join('')
    + [[40, 196], [196, 194], [176, 204]].map(([x, y]) => Lc(`M${x} ${y}l4 1`, '#4E342E', 3)).join('')
    + g(198, 120, 1, R(-4, -40, 8, 46, '#CFD8DC', 3, 2.5) + R(-5, 6, 10, 30, '#5D4037', 4, 2.5) + R(-4, -40, 8, 14, '#FFF59D', 3, 0), 12) + face(120, 150, 0.45)),
  X('nl', 'food', 'bitterballen', 'บิตเทอร์บาลเลนลูกกลมทอดกับมัสตาร์ด', 'Bitterballen with mustard', ['bitterballen', 'บิตเทอร์บาลเลน', 'crispy meatballs', 'ลูกชิ้นทอดกรอบ', 'mustard dip', 'จิ้มมัสตาร์ด', 'dutch snack', 'ของว่างดัตช์', 'borrel', 'cocktail sticks'],
    // a little round board of crisp golden-brown fried balls with crumb speckles, cocktail sticks in two of them, a small pot of yellow mustard with a dab on one ball
    E(120, 180, 104, 30, '#C8A165', 3) + E(120, 176, 92, 22, '#D7B47E', 0)
    + [[70, 158], [110, 168], [150, 160], [90, 132], [134, 134], [176, 140]].map(([x, y], i) => g(x, y, 1, C(0, 0, 22, '#C27C2C', 3) + C(-6, -6, 10, '#D99A48', 0) + [[-8, 6], [6, -10], [10, 8], [-12, -4], [2, 12], [12, -2]].map(([a, b]) => C(a, b, 1.6, '#8D4E1A', 0)).join('') + (i === 4 ? face(0, 2, 0.32) : ''))).join('')
    + Lc('M90 132l-6-40M176 140l10-38', '#F5DEB3', 4) + Lc('M90 132l-6-40M176 140l10-38', INK, 1)
    + g(48, 110, 1, P('M-22-10h44l-4 30h-36z', '#FFFFFF', 3) + E(0, -10, 22, 7, '#FDD835', 2.5) + Lc('M8-12l18-24', '#BCAAA4', 4)) + P('M126 124c4-6 12-6 14 0', 'none', 0) + E(134, 116, 7, 3, '#FDD835', 2)),
  X('nl', 'culture', 'delftblue', 'กระเบื้องและแจกันเดลฟต์สีน้ำเงินขาว', 'Delft Blue tile and vase', ['delft blue', 'เดลฟต์บลู', 'delftware', 'เครื่องปั้นเดลฟต์', 'blue and white pottery', 'เครื่องเคลือบขาวน้ำเงิน', 'painted tile', 'กระเบื้องวาดลาย', 'delft', 'royal delft pottery'],
    // a white glazed tile hand-painted in cobalt blue with a little windmill and corner curls, beside a round-bellied white vase painted with blue tulips
    g(84, 128, 1, R(-56, -56, 112, 112, '#FFFFFF', 6, 3.5) + R(-48, -48, 96, 96, 'none', 2, 1.5).replace('fill="none"', 'fill="none" stroke="#1E5BB8"')
      + [[-44, -44, 1, 1], [44, -44, -1, 1], [-44, 44, 1, -1], [44, 44, -1, -1]].map(([x, y, a, b]) => Lc(`M${x} ${y}c${a * 10} 0 ${a * 12} ${b * 10} ${a * 4} ${b * 12}`, '#1E5BB8', 2.5)).join('')
      + P('M-10 30l4-30h12l4 30z', '#5B8DEF', 2) + Lc('M0-4l-22-18M0-4l22 14M0-4l18-22M0-4l-14 22', '#1E5BB8', 4) + C(0, -4, 3, '#1E5BB8', 0) + Lc('M-30 32h60', '#1E5BB8', 3) + face(0, 14, 0.2))
    + g(178, 140, 1, P('M-14-60h28v12c34 12 36 72 14 88h-56c-22-16-20-76 14-88z', '#FFFFFF', 3.5) + Lc('M-14-50h28', '#1E5BB8', 3)
      + [[-16, 6], [0, -4], [16, 6]].map(([x, y]) => Lc(`M${x} ${y + 26}V${y}`, '#1E5BB8', 2.5) + P(`M${x - 7} ${y}c0-8 4-12 7-6 3-6 7-2 7 6-4 6-10 6-14 0z`, '#5B8DEF', 2)).join('') + Lc('M-30 34c20 6 40 6 60 0', '#1E5BB8', 2.5) + face(0, 10, 0.3))),
  X('nl', 'food', 'haring', 'ปลาเฮร์ริงดิบกินแบบห้อยหาง', 'Dutch herring eaten by the tail', ['hollandse nieuwe', 'ฮอลลันด์เซอนีเวอ', 'raw herring', 'ปลาเฮร์ริงดิบ', 'herring stand', 'ซุ้มขายปลาเฮร์ริง', 'chopped onions', 'หัวหอมสับ', 'pickles', 'eat it by the tail'],
    // a silver-blue herring held up high by its tail above an open mouth, chopped white onion bits falling off it, a little paper tray of onions and pickle slices below
    g(120, 186, 1, P('M-60-10h120l-10 26h-100z', '#FFFFFF', 3) + Lc('M-50-4h100', '#90CAF9', 3) + [[-34, -16], [-18, -18], [-2, -14], [14, -18], [30, -14]].map(([x, y]) => R(x, y, 8, 7, '#FFFFFF', 2, 2)).join('') + [[-44, -14], [40, -14]].map(([x, y]) => E(x, y, 10, 6, '#9CCC65', 2)).join(''))
    + g(124, 88, 1, P('M-50 0c20-24 72-26 98 0-26 24-78 22-98 0z', '#B0BEC5', 3.5) + P('M-46-4c24-16 66-18 90-2-28-6-60-6-90 2z', '#546E7A', 0) + P('M-48 0l-24-18 7 18-7 18z', '#90A4AE', 3) + Lc('M22-14c6 8 6 20 0 28', '#78909C', 2.5)
      + C(36, -4, 3.5, INK, 0) + [[-20, 2], [-6, -4], [8, 4], [-30, -2]].map(([x, y]) => R(x, y, 6, 5, '#FFFFFF', 1.5, 1.5)).join('') + face(0, 4, 0.28), 62)
    + g(94, 20, 1, P('M-8 4c-6-10 2-18 10-14 8-6 18 2 12 12z', '#FFE0BD', 2.5))
    + [[112, 150], [140, 142], [124, 160]].map(([x, y]) => R(x, y, 6, 6, '#FFFFFF', 1, 1.5)).join('')),

  // ---------- Amsterdam
  L('nl/amsterdam/landmark-eyefilm.v1.svg', 'พิพิธภัณฑ์ภาพยนตร์อายสีขาวริมน้ำ', 'The white EYE Film Museum across the IJ', ['eye film museum', 'พิพิธภัณฑ์ภาพยนตร์อาย', 'eye filmmuseum', 'พิพิธภัณฑ์หนัง', 'ij river', 'แม่น้ำไอ', 'amsterdam noord', 'อัมสเตอร์ดัมนอร์ด', 'free ferry', 'white angular building'], 'หาตึกสีขาวที่เหมือนกระดาษพับโค้งไปทางน้ำ', 'Find the white building that leans over the water like folded paper',
    // a gleaming white building of sharp folded planes leaning out over the wide river like a bird about to fly, a glass strip along its base, small waves and a little free ferry in front
    sky('#E3F2FD') + P('M-4 170h248v74H-4z', '#4FC3F7', 0) + Lc('M14 200h40M120 214h60M180 190h40', '#E1F5FE', 3)
    + P('M20 170L40 118 120 64 214 96 230 170z', '#FFFFFF', 3.5) + P('M120 64l-16 106M120 64l94 32-40 74M40 118l64 52', 'none', 2.5) + P('M120 64L214 96 174 170H104z', '#ECEFF1', 0) + P('M120 64l-16 106M120 64l94 32-40 74M40 118l64 52', 'none', 2.5) + P('M20 170L40 118 120 64 214 96 230 170z', 'none', 3.5)
    + R(24, 160, 202, 10, '#81D4FA', 2, 2.5) + face(150, 124, 0.45)
    + g(70, 204, 1, P('M-34-6h68l-8 14h-52z', '#FFFFFF', 2.5) + R(-20, -18, 30, 12, '#1E88E5', 2, 2) + kid(18, -6, '#E53935', 0.7) + kid(-26, -6, '#FFCA28', 0.7))),
  L('nl/amsterdam/landmark-centraal.v1.svg', 'สถานีกลางอัมสเตอร์ดัมอิฐแดงหอคู่', 'Amsterdam Centraal, the red-brick station with two towers', ['amsterdam centraal', 'สถานีกลางอัมสเตอร์ดัม', 'central station', 'สถานีรถไฟกลาง', 'red brick station', 'สถานีอิฐแดง', 'two towers', 'หอคอยคู่', 'trains', 'wind dial'], 'หาหน้าปัดบนหอคอยสองข้างที่ไม่เหมือนกัน', 'Find the two tower dials that are not the same',
    // a long red-brick palace of a station with cream stripes and many arched windows, two tall towers with gold dials (a clock on one, a wind pointer on the other), a big arched glass roof peeking behind
    sky('#E1F5FE') + P('M60 96c0-40 120-40 120 0z', '#B3E5FC', 3) + Lc('M80 96c0-26 80-26 80 0', '#E1F5FE', 2)
    + R(4, 96, 232, 96, '#C0603A', 2, 3.5) + Lc('M4 120h232M4 150h232', '#FFE0B2', 4) + Array.from({ length: 9 }, (_, k) => R(14 + k * 25, 126, 14, 20, '#FFF8E1', 7, 2)).join('') + Array.from({ length: 9 }, (_, k) => R(14 + k * 25, 158, 14, 22, '#FFF8E1', 7, 2)).join('')
    + [[76, 'clock'], [164, 'wind']].map(([x, t]) => R(x - 16, 36, 32, 70, '#C0603A', 2, 3) + P(`M${x - 18} 36l18-24 18 24z`, '#455A64', 3) + C(x, 58, 11, '#FFCA28', 2.5) + (t === 'clock' ? Lc(`M${x} 58v-7M${x} 58l5 3`, INK, 2) : Lc(`M${x - 7} 62l14-8`, INK, 2.5) + P(`M${x + 7} 54l-5 0 3 4z`, INK, 1)) + Lc(`M${x - 16} 80h32`, '#FFE0B2', 3)).join('')
    + P('M100 192v-30c0-14 40-14 40 0v30z', '#FFF8E1', 3) + R(-4, 192, 248, 52, '#90A4AE', 0, 3) + face(120, 110, 0.4) + kid(60, 226, '#1E88E5', 0.9) + kid(186, 226, '#F06292', 0.9)),
  L('nl/amsterdam/landmark-dampalace.v1.svg', 'พระราชวังบนจัตุรัสดัมกับเรือทองบนโดม', 'The Royal Palace on Dam Square and its golden ship', ['royal palace amsterdam', 'พระราชวังอัมสเตอร์ดัม', 'dam square', 'จัตุรัสดัม', 'koninklijk paleis', 'โคนิงก์ลิกปาเลส', 'golden ship weather vane', 'เรือทองบนยอด', 'pigeons', 'old town hall'], 'หาเรือสีทองเล็กๆ บนยอดโดม', 'Find the little golden ship on top of the dome',
    // a wide square sandstone palace with rows of windows and a triangular carved gable, a round green-domed tower on top crowned by a little golden sailing ship, pigeons on the square
    sky('#FFF8E1') + R(14, 96, 212, 110, '#E8DCC0', 2, 3.5) + Array.from({ length: 3 }, (_, r) => Array.from({ length: 9 }, (_, k) => R(22 + k * 23, 106 + r * 30, 12, 18, '#90A4AE', 1, 1.5)).join('')).join('')
    + P('M70 96l50-24 50 24z', '#E8DCC0', 3) + C(120, 86, 6, '#FFCA28', 2)
    + R(104, 40, 32, 34, '#E8DCC0', 2, 3) + [110, 120, 130].map((x) => R(x - 2, 46, 4, 20, '#FFF8E1', 1, 1)).join('') + P('M100 40c0-24 40-24 40 0z', '#66BB6A', 3) + Lc('M120 22V10', INK, 2.5)
    + g(120, 8, 1, P('M-10 0h20l-4 5h-12z', '#FFCA28', 1.8) + P('M-1-1v-10l8 8z', '#FFCA28', 1.5))
    + P('M104 206v-28c0-12 32-12 32 0v28z', '#6D4C41', 3) + R(-4, 206, 248, 38, '#BCAAA4', 0, 3)
    + [[40, 222], [64, 230], [180, 226], [200, 232]].map(([x, y]) => g(x, y, 1, E(0, 0, 9, 6, '#90A4AE', 2) + C(7, -5, 4, '#90A4AE', 2) + P('M10-5l4 1-4 1z', '#FFA726', 1))).join('')
    + kid(150, 236, '#E53935', 0.9) + face(120, 140, 0.4)),
  L('nl/amsterdam/landmark-volendam.v1.svg', 'ชุดพื้นเมืองหมวกปีกแหลมที่โฟเลนดัม', 'The winged lace cap of Volendam', ['volendam', 'โฟเลนดัม', 'traditional costume', 'ชุดพื้นเมือง', 'lace cap', 'หมวกลูกไม้', 'fishing village', 'หมู่บ้านชาวประมง', 'costume photo', 'ถ่ายรูปชุดพื้นเมือง'], 'หาหมวกลูกไม้สีขาวที่ปลายแหลมเหมือนปีก', 'Find the white lace cap with pointed wings',
    // a smiling child in Volendam dress: a tall white lace cap with two pointed wings, a coral bead necklace, a striped skirt and black apron, little green wooden houses and a harbour boat behind
    sky('#E1F5FE') + P('M-4 150h248v94H-4z', '#4FC3F7', 0) + [[20, 64], [64, 54], [180, 60]].map(([x, y]) => R(x, y + 40, 40, 56, '#2E7D32', 2, 2.5) + P(`M${x - 2} ${y + 40}l22-26 22 26z`, '#1B5E20', 2.5) + R(x + 12, y + 60, 14, 16, '#FFFFFF', 1, 2)).join('')
    + g(200, 168, 1, P('M-30 0h60l-8 14h-44z', '#6D4C41', 2.5) + Lc('M0 0v-40', INK, 2.5) + P('M2-38l20 30H2z', '#E53935', 2))
    + g(110, 150, 1, P('M-38 94l8-70h60l8 70z', '#1565C0', 3) + [0, 1, 2, 3].map((k) => Lc(`M${-34 + k * 2} ${44 + k * 14}h${68 - k * 4}`, '#E53935', 3)).join('') + P('M-18 30h36l4 60h-44z', '#212121', 2.5)
      + R(-24, -2, 48, 34, '#7B1FA2', 6, 3) + [[-14, 4], [-6, 8], [2, 8], [10, 4]].map(([x, y]) => C(x, y, 3, '#E53935', 1.2)).join('')
      + C(0, -30, 26, '#FFE0BD', 3) + P('M-26-34c0-30 52-30 52 0l20-36c-14 4-22 4-28 8-8-14-28-14-36 0-6-4-14-4-28-8z', '#FFFFFF', 3) + Lc('M-20-44c10-8 30-8 40 0', '#E0E0E0', 2) + face(0, -26, 0.4))),
  L('nl/amsterdam/landmark-muiderslot.v1.svg', 'ปราสาทมุยเดอร์สลอทกลางคูน้ำ', 'Muiderslot, the moated red-brick castle', ['muiderslot', 'ปราสาทมุยเดอร์สลอท', 'moated castle', 'ปราสาทคูน้ำ', 'red brick castle', 'ปราสาทอิฐแดง', 'muiden', 'มุยเดิน', 'knights', 'castle with round towers'], 'หาสะพานไม้ที่ข้ามคูน้ำเข้าประตูปราสาท', 'Find the wooden bridge across the moat to the castle gate',
    // a square red-brick castle with round corner towers under pointed dark caps, a gatehouse with a little bridge across the green moat that wraps round it, a swan-free duck paddling
    sky('#E3F2FD') + P('M-4 160h248v84H-4z', '#4DB6AC', 0) + Lc('M14 210h40M160 222h50', '#B2DFDB', 3) + R(-4, 150, 248, 12, '#8BC34A', 0, 0)
    + R(46, 92, 148, 74, '#C0603A', 2, 3.5) + Array.from({ length: 9 }, (_, k) => R(48 + k * 16, 84, 10, 10, '#C0603A', 1, 2)).join('')
    + [[40, 76], [200, 76]].map(([x, y]) => R(x - 16, y, 32, 90, '#B5532E', 4, 3) + P(`M${x - 20} ${y}l20-34 20 34z`, '#37474F', 3) + R(x - 4, y + 26, 8, 14, '#263238', 4, 1.5)).join('')
    + R(100, 60, 40, 106, '#C0603A', 2, 3) + P('M96 60l24-30 24 30z', '#37474F', 3) + P('M108 166v-34c0-16 24-16 24 0v34z', '#4E342E', 3) + R(104, 166, 32, 30, '#A1887F', 0, 2.5) + Lc('M104 176h32M104 186h32', '#6D4C41', 1.5)
    + face(120, 98, 0.35) + g(184, 208, 1, E(0, 0, 14, 8, '#FFF59D', 2) + C(10, -8, 6, '#FFF59D', 2) + P('M15-8l6 2-6 2z', '#FFA726', 1))),

  // ---------- Finland
  X('fi', 'food', 'salmiakki', 'ซัลเมียกกี ลูกอมชะเอมเค็มสีดำ', 'Salmiakki, salty black liquorice', ['salmiakki', 'ซัลเมียกกี', 'salty liquorice', 'ชะเอมเค็ม', 'black liquorice', 'ลูกอมชะเอมดำ', 'diamond sweets', 'ลูกอมทรงข้าวหลามตัด', 'finnish sweets', 'ขนมฟินแลนด์'],
    // a pile of shiny black diamond-shaped liquorice sweets spilling from a little striped paper bag, one of them smiling, a few white salty dots on them
    g(80, 110, 1, P('M-34-50h68l-10 100h-48z', '#FFFFFF', 3) + [-24, -8, 8, 24].map((x) => Lc(`M${x} -48l${x * -0.1} 96`, '#E53935', 5)).join('') + P('M-34-50h68l-10 100h-48z', 'none', 3) + P('M-34-50l10 8 8-8 8 8 8-8 8 8 8-8 8 8 10-8', 'none', 2.5), -14)
    + [[120, 168, 0], [158, 176, 20], [196, 168, -10], [140, 140, 30], [178, 142, 0], [100, 190, -20], [210, 196, 10], [160, 204, 40]].map(([x, y, r], i) => g(x, y, 1, P('M0-20l16 20-16 20-16-20z', '#263238', 3) + P('M0-14l6 8-6 4z', '#546E7A', 0) + [[-4, 4], [4, 8], [0, 10]].map(([a, b]) => C(a, b, 1.4, '#FFFFFF', 0)).join('') + (i === 4 ? face(0, -2, 0.25) : ''), r)).join('')),
  X('fi', 'food', 'leipajuusto', 'เลย์ปายูสโต ชีสอบเสียงดังเอี๊ยดอ๊าด', 'Leipäjuusto, the squeaky baked cheese', ['leipäjuusto', 'เลย์ปายูสโต', 'squeaky cheese', 'ชีสเอี๊ยดอ๊าด', 'bread cheese', 'ชีสขนมปัง', 'finnish cheese', 'ชีสฟินแลนด์', 'baked cheese with jam', 'juustoleipä'],
    // a flat round pale cheese with toasty brown baked spots on a wooden board, a wedge cut out and lifted on a fork, a spoonful of bright berry jam on top, squeak lines around it
    E(120, 178, 104, 30, '#C8A165', 3) + Lc('M30 182h180', '#A1673F', 2)
    + g(112, 150, 1, P('M-70 0v12c0 14 140 14 140 0V0z', '#FFF3C4', 3) + E(0, 0, 70, 22, '#FFF8E1', 3) + P('M0 0l70 0c0 8-20 18-40 20z', '#FFE082', 2.5)
      + [[-44, -6], [-20, 6], [-8, -10], [20, -12], [-34, 10], [10, 6]].map(([x, y]) => E(x, y, 7, 4, '#C27C2C', 0)).join('') + face(-20, -2, 0.35))
    + g(184, 120, 1, P('M0 0l30 2-4 14-28-2z', '#FFF8E1', 2.5) + E(10, -4, 10, 5, '#FF7043', 2) + Lc('M-6 8l-30 40', '#B0BEC5', 5) + Lc('M-6 8l-30 40', INK, 1))
    + Lc('M196 92l8-8M210 102l10-4M178 88l2-10', '#90A4AE', 3)),
  X('fi', 'culture', 'kantele', 'คันเทเล พิณไม้ของฟินแลนด์', 'The kantele, Finland’s wooden harp', ['kantele', 'คันเทเล', 'finnish zither', 'พิณฟินแลนด์', 'plucked strings', 'เครื่องสายดีด', 'folk music', 'ดนตรีพื้นเมือง', 'wooden instrument', 'kalevala'],
    // a wing-shaped wooden box zither lying on a cloth, five shining strings fanned across it to a row of tuning pegs, a little curl at its tip and two fingers about to pluck
    E(120, 190, 104, 18, '#E1BEE7', 3)
    + g(116, 128, 1, P('M-90 30L60-40c20-6 34 6 32 22L80 48c-4 8-10 10-20 10H-80c-12 0-16-16-10-28z', '#D7A35F', 3.5) + P('M-80 34L60-30c12-2 20 4 20 14L72 40c-2 4-6 6-12 6H-74c-8 0-10-8-6-12z', '#E9C27A', 0)
      + C(20, 18, 9, '#8D5524', 2.5) + [0, 1, 2, 3, 4].map((k) => Lc(`M${-78 + k * 4} ${38 - k * 6}L${70 - k * 2} ${-28 + k * 14}`, '#FFF59D', 2) + C(70 - k * 2, -28 + k * 14, 3.2, '#5D4037', 1.5)).join('') + Lc('M-84 36l-4-8', INK, 3) + face(-30, 26, 0.35))
    + g(150, 82, 1, P('M-6 0c0-14 14-14 14 0v10h-14z', '#FFE0BD', 2.5) + P('M10 2c0-12 12-12 12 0v10h-12z', '#FFE0BD', 2.5)) + Lc('M60 70c6-6 12-6 18 0M180 64c4-6 10-6 14 0', '#7E57C2', 3)),
  X('fi', 'animal', 'capercaillie', 'ไก่ป่าเมตโซรำแพนหาง', 'A capercaillie showing off its tail', ['capercaillie', 'ไก่ป่าคาเปอร์เคลลี', 'metso', 'เมตโซ', 'wood grouse', 'ไก่ป่าดำ', 'fanned tail', 'หางแพน', 'pine forest bird', 'นกป่าสน'],
    // a big black forest bird with a bright red eyebrow, a pale hooked bill and a shaggy beard, its round tail fanned up behind like a dark comb with white spots, standing on mossy ground
    E(120, 206, 90, 14, '#7CB342', 3) + P('M150 150c-10-60 0-104 40-110 30 20 30 70 10 110z', '#37474F', 3.5) + [[170, 70], [180, 96], [184, 124], [160, 110], [190, 60]].map(([x, y]) => C(x, y, 3, '#FFFFFF', 0)).join('') + Lc('M160 60l6 80M178 52l2 90M196 64l-6 80', '#263238', 2)
    + E(120, 156, 52, 40, '#455A64', 3.5) + E(110, 168, 30, 22, '#2E7D32', 0) + P('M78 112c-4-30 8-48 28-48 18 0 24 18 20 36 0 14-6 26-16 34z', '#37474F', 3)
    + P('M78 86c-12-2-18 4-20 10 8 2 16 0 20-4z', '#ECEFF1', 2.5) + Lc('M80 100c-4 8-2 14 2 18M86 104c-2 6 0 12 2 14', '#263238', 3) + P('M92 74c4-6 14-6 18 0-6 4-12 4-18 0z', '#E53935', 2)
    + Lc('M110 194v10M130 194v10', '#5D4037', 4) + face(100, 84, 0.3) + E(132, 142, 18, 10, '#78909C', 0)),

  // ---------- Lapland
  L('fi/lapland/landmark-arktikum.v1.svg', 'อาร์กติกุม พิพิธภัณฑ์อุโมงค์แก้วริมแม่น้ำ', 'Arktikum, the glass-tunnel Arctic museum', ['arktikum', 'อาร์กติกุม', 'arctic museum', 'พิพิธภัณฑ์อาร์กติก', 'glass tunnel', 'อุโมงค์แก้ว', 'ounasjoki river', 'แม่น้ำโอวนัส', 'rovaniemi science centre', 'arctic science'], 'หาอุโมงค์แก้วยาวที่ยื่นออกไปหาแม่น้ำ', 'Find the long glass tunnel stretching towards the river',
    // a long arched glass tube of a building reaching out of a snowy bank towards a frozen river, a low copper-roofed hall dug into the slope, snowy pines and a pale winter sun
    sky('#E3F2FD') + C(200, 44, 16, '#FFE082', 2.5) + P('M-4 120c60-14 120-6 248 10v114H-4z', '#FFFFFF', 3) + P('M-4 200c80-12 160-12 248 0v44H-4z', '#B3E5FC', 3)
    + P('M10 152l40-34h50l10 34z', '#B87333', 3) + R(18, 152, 90, 26, '#ECEFF1', 2, 3)
    + P('M90 178V150c0-24 132-24 132 0v28z', '#B3E5FC', 3.5) + [104, 122, 140, 158, 176, 194, 210].map((x) => Lc(`M${x} 178v-${30 - Math.abs(x - 156) * 0.08}`, '#FFFFFF', 2.5)).join('') + Lc('M92 156c40-14 90-14 128 0', '#FFFFFF', 2) + R(88, 176, 136, 6, '#90A4AE', 1, 2)
    + snowPine(30, 116, 0.8) + snowPine(60, 108, 0.6) + face(160, 156, 0.4) + kid(130, 172, '#E53935', 0.7)),
  L('fi/lapland/landmark-kuksa.v1.svg', 'ถ้วยไม้คุกซาแกะมือกับน้ำเบอร์รีอุ่น', 'A carved wooden kuksa cup of warm berry juice', ['kuksa', 'คุกซา', 'wooden cup', 'ถ้วยไม้แกะ', 'birch burl cup', 'ถ้วยปุ่มไม้เบิร์ช', 'warm berry juice', 'น้ำเบอร์รีอุ่น', 'campfire drink', 'lappish handicraft'], 'หาหูถ้วยที่มีรูให้ร้อยเชือก', 'Find the handle with a hole for the string',
    // a chunky hand-carved wooden cup with wavy grain and a handle with a hole and a leather loop, filled with steaming red berry juice, by a small campfire in the snow
    E(120, 204, 100, 16, '#FFFFFF', 3) + g(56, 186, 1, Lc('M-16 6l32-12M-16-6l32 12', '#6D4C41', 6) + P('M-10 0c-4-14 6-24 10-30 2 10 12 14 10 30z', '#FF7043', 2.5) + P('M-4 0c-2-8 4-14 4-18 2 6 6 10 4 18z', '#FFCA28', 0))
    + g(132, 140, 1, P('M-50-30h96c0 50-14 74-48 74s-48-24-48-74z', '#B07A44', 3.5) + Lc('M-40-14c20 8 50 8 76 0M-36 6c20 6 40 6 64 0M-26 24c16 4 30 4 42 0', '#8D5524', 2) + E(-2, -30, 48, 10, '#C2185B', 3)
      + P('M46-26c26-4 34 22 10 34l-10 2', '#B07A44', 3.5) + C(54, -8, 5, '#FFFFFF', 2.5) + Lc('M58-6c14 14 10 30 0 40', '#5D4037', 3) + face(-4, 6, 0.4))
    + Lc('M112 96c-6-10 6-16 0-28M140 92c-6-10 6-16 0-28', '#FFFFFF', 5) + Lc('M112 96c-6-10 6-16 0-28M140 92c-6-10 6-16 0-28', '#B0BEC5', 1.5)),
  L('fi/lapland/landmark-jatkankynttila.v1.svg', 'สะพานเทียนคนตัดไม้ที่โรวาเนียมิ', 'The Lumberjack’s Candle Bridge in Rovaniemi', ['lumberjacks candle bridge', 'สะพานเทียนคนตัดไม้', 'jätkänkynttilä', 'แยตกันคึนติลา', 'kemijoki river', 'แม่น้ำเกมิ', 'bridge with a flame', 'สะพานมีเปลวไฟ', 'rovaniemi bridge', 'cable bridge'], 'หาเปลวไฟสีส้มบนยอดเสาสะพาน', 'Find the orange flame on top of the bridge tower',
    // a long low bridge over an icy river hung from one tall white tower that ends in a glowing orange flame like a giant candle, its cables fanning down to the deck, snowy banks and a dark blue winter sky
    sky('#283593') + [[30, 30], [70, 50], [200, 28], [216, 70], [150, 20]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('') + P('M-4 170h248v74H-4z', '#B3E5FC', 0) + Lc('M20 200h50M140 214h60', '#FFFFFF', 3)
    + P('M-4 150c30-10 50-6 70 4v16H-4zM244 150c-30-10-50-6-70 4v16h70z', '#FFFFFF', 3)
    + R(-4, 150, 248, 10, '#ECEFF1', 2, 3) + Lc('M-4 164h248', '#90A4AE', 3) + [40, 200].map((x) => R(x - 5, 160, 10, 14, '#ECEFF1', 1, 2.5)).join('')
    + R(112, 50, 16, 110, '#FFFFFF', 3, 3) + [10, 40, 70, 170, 200, 230].map((x) => Lc(`M120 ${x < 120 ? 64 : 64}L${x} 150`, '#FFFFFF', 1.8)).join('')
    + g(120, 44, 1, P('M-12 6c-6-18 8-32 12-44 4 12 18 26 12 44z', '#FF7043', 3) + P('M-6 4c-2-10 4-18 6-26 2 8 8 16 6 26z', '#FFCA28', 0) + R(-10, 4, 20, 8, '#B0BEC5', 2, 2.5))
    + face(120, 110, 0.3)),
  L('fi/lapland/landmark-icekarting.v1.svg', 'ขับโกคาร์ตบนลานน้ำแข็ง', 'Ice karting on a frozen track', ['ice karting', 'โกคาร์ตบนน้ำแข็ง', 'go kart on ice', 'รถโกคาร์ต', 'ice track', 'สนามน้ำแข็ง', 'frozen lake track', 'ทะเลสาบน้ำแข็ง', 'helmet', 'winter driving'], 'หากองหิมะที่กั้นเป็นขอบสนามน้ำแข็ง', 'Find the snow banks that make the edges of the ice track',
    // a little red go-kart sliding sideways on a shiny blue-white ice track, a child in a big helmet at the wheel, snow banks curving round the track, sparkles flying from the wheels
    sky('#E3F2FD') + snowPine(26, 92, 0.7) + snowPine(210, 88, 0.8) + P('M-4 100h248v144H-4z', '#FFFFFF', 0)
    + P('M-4 130c80-30 180-30 248 0v80c-80 30-180 30-248 0z', '#B3E5FC', 3) + Lc('M30 150c50-12 120-14 180 0M30 190c50 12 120 14 180 0', '#E1F5FE', 3) + P('M-4 128c80-30 180-30 248 0', 'none', 6) + P('M-4 212c80 30 180 30 248 0', 'none', 6)
    + g(120, 172, 1, P('M-46 14l6-24h76l14 24z', '#E53935', 3) + R(-54, 12, 104, 8, '#37474F', 3, 2.5) + [[-38, 22], [34, 22]].map(([x, y]) => R(x - 9, y - 4, 18, 14, '#263238', 4, 2.5)).join('') + R(-20, -18, 30, 12, '#FFCA28', 3, 2.5)
      + C(-4, -30, 14, '#1E88E5', 3) + P('M-14-30h18v10h-18z', '#B3E5FC', 2) + Lc('M14-16l12-10', INK, 3) + C(26, -26, 7, 'none', 2.5) + face(-6, -26, 0.22))
    + Lc('M60 196l-14 6M70 204l-12 12M184 196l14 6', '#FFFFFF', 3) + Lc('M60 196l-14 6M70 204l-12 12M184 196l14 6', '#81D4FA', 1.2)),
  L('fi/lapland/landmark-korvatunturi.v1.svg', 'ภูเขาคอร์วาตุนตูรีรูปหู บ้านของซานตา', 'Korvatunturi, the ear-shaped fell where Santa listens', ['korvatunturi', 'ภูเขาคอร์วาตุนตูรี', 'ear fell', 'ภูเขารูปหู', 'santas home mountain', 'ภูเขาบ้านซานตา', 'savukoski', 'ซาวูโกสกี', 'listening for wishes', 'ฟังคำขอพร'], 'หาภูเขาที่หน้าตาเหมือนหูกำลังฟัง', 'Find the mountain shaped like a listening ear',
    // a big snowy fell shaped like a giant ear with a swirl in its middle, little hearts and letters-shaped stars floating up into it from the forest, a starry polar sky
    sky('#3949AB') + [[20, 30], [60, 18], [216, 26], [190, 60], [30, 76]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('')
    + P('M40 190c-10-90 30-150 90-150 50 0 80 40 70 90-6 30-30 40-40 60-6 14-4 30-10 40z', '#ECEFF1', 3.5) + P('M90 150c-10-46 10-80 46-80 30 0 44 26 36 52-6 20-26 22-34 36', 'none', 4) + P('M118 130c-2-20 10-30 22-26 10 4 8 18 0 24', 'none', 3.5)
    + P('M-4 180c60-14 180-14 248 0v64H-4z', '#FFFFFF', 3) + snowPine(30, 196, 0.7) + snowPine(200, 200, 0.8) + snowPine(226, 192, 0.6) + snowPine(14, 210, 0.5)
    + [[80, 210], [110, 200], [150, 206]].map(([x, y]) => P(`M${x} ${y}c-8-8 0-14 6-8 6-6 14 0 6 8l-6 6z`, '#F06292', 2)).join('') + Lc('M100 196c6-16 14-24 20-40', '#FFF59D', 2) + face(150, 160, 0.38)),

  // ---------- Norway
  X('no', 'culture', 'bunad', 'บูนาด ชุดประจำชาติปักลายดอกไม้', 'A bunad, Norway’s embroidered costume', ['bunad', 'บูนาด', 'national costume', 'ชุดประจำชาติ', 'embroidered dress', 'ชุดปักลาย', 'silver brooch', 'เข็มกลัดเงิน', 'syttende mai', 'norwegian costume'],
    // a dark red woollen dress with a black bodice on a hanger, its hem and bodice embroidered with bright flowers, a white blouse with a shining round silver brooch at the collar
    Lc('M120 22v14', INK, 3) + P('M114 22c0-10 12-10 12 0', 'none', 3) + Lc('M70 46l50-12 50 12', '#8D6E63', 6)
    + P('M90 44h60l8 20h-76z', '#FFFFFF', 3) + C(120, 52, 9, '#CFD8DC', 2.5) + C(120, 52, 4, '#ECEFF1', 1.5) + [[110, 62], [130, 62], [120, 66]].map(([x, y]) => C(x, y, 3, '#CFD8DC', 1.5)).join('')
    + P('M84 64h72l6 54H78z', '#263238', 3.5) + [[96, 82], [144, 82], [120, 100]].map(([x, y]) => C(x, y, 6, '#E53935', 2) + C(x, y, 2, '#FFEB3B', 0)).join('') + Lc('M100 96l8-8M140 96l-8-8', '#43A047', 3)
    + P('M78 118h84l26 96H52z', '#B71C1C', 3.5) + Lc('M56 196h128', '#263238', 14) + [70, 94, 120, 146, 170].map((x) => C(x, 196, 5, '#FFCA28', 1.8) + Lc(`M${x - 10} 196h-3M${x + 10} 196h3`, '#66BB6A', 3)).join('') + face(120, 150, 0.45)),
  X('no', 'culture', 'rosemaling', 'จานไม้วาดลายดอกไม้โรสมาลิ่ง', 'A rosemaling painted wooden bowl', ['rosemaling', 'โรสมาลิ่ง', 'rose painting', 'ลายดอกไม้วาดมือ', 'painted bowl', 'ชามไม้วาดลาย', 'folk art', 'ศิลปะพื้นบ้าน', 'scroll flowers', 'telemark painting'],
    // a wide shallow wooden bowl painted deep blue inside with swirling C-scrolls, red and yellow folk flowers and leaves winding round, a bright orange rim
    E(120, 182, 98, 18, '#B07A44', 3) + E(120, 128, 104, 54, '#FF8F00', 3.5) + E(120, 128, 92, 44, '#1E4A8C', 3)
    + Lc('M60 130c0-20 24-26 34-14s-4 26-14 18', '#FFF59D', 3) + Lc('M180 130c0-20-24-26-34-14s4 26 14 18', '#FFF59D', 3) + Lc('M80 150c20 14 60 14 80 0', '#81C784', 3)
    + g(120, 118, 1, [0, 72, 144, 216, 288].map((a) => E(0, -12, 7, 12, '#E53935', 2).replace('<ellipse', `<ellipse transform="rotate(${a})"`)).join('') + C(0, 0, 7, '#FFCA28', 2))
    + [[72, 112], [168, 112]].map(([x, y]) => C(x, y, 8, '#FF7043', 2) + C(x, y, 3, '#FFF59D', 0)).join('') + [[100, 150], [140, 150], [120, 160]].map(([x, y]) => E(x, y, 6, 3, '#66BB6A', 1.5)).join('')
    + P('M24 128c0 34 40 60 96 60s96-26 96-60', 'none', 3.5) + face(120, 142, 0.3)),
  X('no', 'culture', 'hardingfele', 'ไวโอลินฮาร์ดังเงอร์ลายวิจิตร', 'The Hardanger fiddle with its painted swirls', ['hardanger fiddle', 'ไวโอลินฮาร์ดังเงอร์', 'hardingfele', 'ฮาร์ดิงเฟเล', 'folk fiddle', 'ซอพื้นเมือง', 'mother of pearl', 'มุกฝัง', 'norwegian folk music', 'dragon head scroll'],
    // a honey-brown fiddle covered in black ink swirls, little white pearl dots round its edge and a carved animal head at the top of its neck, a bow lying across
    g(112, 128, 1, P('M0-34c-22 0-30 14-24 30-14 6-16 34 0 46 12 10 36 10 48 0 16-12 14-40 0-46 6-16-2-30-24-30z', '#C27C2C', 3.5) + [[-14, 10], [14, 10], [-10, -18], [10, -18], [0, 34]].map(([x, y]) => Lc(`M${x} ${y}c${x > 0 ? 6 : -6} -6 ${x > 0 ? 4 : -4} -12 0 -12`, '#3E2723', 2)).join('')
      + Array.from({ length: 14 }, (_, k) => { const a = (k / 14) * Math.PI * 2; return C(26 * Math.sin(a), 6 + 36 * Math.cos(a), 1.6, '#FFFFFF', 0); }).join('') + Lc('M-6-6c0-8 0-8 0 0M6-6c0-8 0-8 0 0', INK, 2)
      + R(-5, -96, 10, 64, '#3E2723', 3, 2.5) + P('M-6-96c-12-6-10-24 4-24 10 0 14 8 8 14l6 6-8 2z', '#8D5524', 2.5) + C(-2, -110, 2, INK, 0) + Lc('M-2-92v116M2-92v116', '#FFF59D', 1) + R(-12, 30, 24, 4, '#3E2723', 1, 2) + face(0, 14, 0.3), -14)
    + Lc('M40 210L200 70', INK, 6) + Lc('M40 210L200 70', '#A1673F', 3) + Lc('M44 202L198 68', '#FFFDE7', 1.2) + R(36, 200, 14, 10, '#3E2723', 2, 2)),
  X('no', 'food', 'verdensbeste', 'เค้กที่ดีที่สุดในโลก เมอแรงก์อัลมอนด์', 'Verdens beste, the world’s best cake', ['verdens beste', 'แวร์เดนส์เบสเต', 'worlds best cake', 'เค้กที่ดีที่สุดในโลก', 'kvæfjord cake', 'เค้กควาฟยอร์ด', 'meringue cake', 'เค้กเมอแรงก์', 'almonds and custard', 'national cake'],
    // a square slice of cake on a plate: a thin yellow sponge, a thick layer of vanilla custard cream, another sponge and a crisp golden meringue top scattered with toasted almond flakes
    E(120, 188, 100, 20, '#FFFFFF', 3) + E(120, 186, 84, 13, '#FFF3E0', 0)
    + P('M50 178V100l60-24 80 30v72z', '#FFF59D', 0) + P('M110 76v102', 'none', 0)
    + R(50, 160, 140, 18, '#FFD54F', 2, 3) + R(50, 124, 140, 36, '#FFFDE7', 2, 3) + R(50, 108, 140, 16, '#FFD54F', 2, 3) + P('M50 108c10-16 20-4 30-14s20 6 30-6 20 8 30-4 20 8 30-2 20 8 20 8v18H50z', '#F2C27B', 3)
    + [[66, 100], [90, 96], [116, 92], [140, 94], [162, 96], [180, 100], [78, 104], [128, 102], [104, 104]].map(([x, y], i) => E(x, y, 6, 3, '#FFF8E1', 1.5).replace('<ellipse', `<ellipse transform="rotate(${(i * 37) % 60 - 30} ${x} ${y})"`)).join('')
    + face(120, 140, 0.45) + Lc('M200 120l14-8M204 136h14', '#FFCA28', 3)),
];

export default { places: {}, items };
