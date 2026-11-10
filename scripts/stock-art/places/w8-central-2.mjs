// Wave 8 (central Europe, part 2): Czechia, Prague, Hungary, Budapest, Berlin, Rothenburg and Nuremberg
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const F = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const wins = (x, y, n, dx, w, h, fill = '#B3E5FC') => Array.from({ length: n }, (_, k) => R(x + k * dx, y, w, h, fill, 1, 1.5)).join('');
const fir = (x, y, s = 1, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', c, 2) + R(-3, 0, 6, 6, '#6D4C41', 0, 1.5));
const tree = (x, y, s = 1, c = '#43A047') => g(x, y, s, C(0, -16, 16, c, 2.5) + R(-3, 0, 6, 10, '#6D4C41', 0, 2));

const items = [
  // ---------- Czechia
  F('cz', 'food', 'smazenysyr', 'ชีสทอดสมาเชนี ซีร์ กับซอสทาร์ทาร์', 'Smažený sýr, fried cheese with tartar sauce', ['smažený sýr', 'smazeny syr', 'สมาเชนี ซีร์', 'fried cheese', 'ชีสทอด', 'breaded cheese', 'ชีสชุบเกล็ดขนมปัง', 'tartar sauce', 'ซอสทาร์ทาร์', 'czech fast food'],
    // a thick golden breaded slab of cheese cut open with melted cheese oozing out, a dollop of white tartar sauce with green herbs, a few fries and a lemon wedge on a plate
    E(120, 160, 100, 44, '#FFFFFF', 3) + E(120, 158, 86, 34, '#ECEFF1', 2)
      + P('M48 150l12-40h70l10 40z', '#FFB300', 3) + Array.from({ length: 8 }, (_, k) => C(62 + (k * 13) % 64, 120 + (k * 7) % 24, 2, '#E65100', 0)).join('') + P('M136 150c10 6 20 14 18 22-8 2-16-6-22-18z', '#FFF59D', 2.5)
      + P('M150 128c0-16 40-16 40 0s-40 16-40 0z', '#FFFFFF', 2.5) + [[162, 126], [172, 130], [180, 124]].map(([x, y]) => C(x, y, 2, '#43A047', 0)).join('')
      + [[60, 178, -10], [74, 182, 6], [90, 180, -4]].map(([x, y, r]) => g(x, y, 1, R(-4, -14, 8, 28, '#FFD54F', 2, 2), r)).join('') + P('M180 168l22 4-14 14z', '#FFEB3B', 2) + face(94, 132, 0.35)),
  F('cz', 'culture', 'trailmarks', 'เครื่องหมายทางเดินป่าสามแถบของเช็ก', 'The Czech hiking marks painted on trees', ['czech trail marks', 'เครื่องหมายทางเดินป่าเช็ก', 'turistické značení', 'hiking trail sign', 'ป้ายทางเดินป่า', 'red white stripes', 'แถบแดงขาว', 'signpost', 'เสาบอกทาง', 'hiking in czechia'],
    // a tree trunk painted with the white-red-white stripe mark, a yellow wooden signpost with arrow boards and little coloured stripe flags beside it, a forest path, a child with a backpack walking
    R(-4, 196, 248, 44, '#A5D6A7', 0, 2.5) + P('M90 240c10-20 30-30 60-44', '#D7CCC8', 0) + Lc('M90 240c10-20 30-30 60-44', '#D7CCC8', 14)
      + R(40, 30, 40, 186, '#8D6E63', 4, 3) + Lc('M50 60v40M66 120v50', '#6D4C41', 2) + R(40, 80, 40, 10, '#FFFFFF', 0, 2) + R(40, 90, 40, 10, '#E53935', 0, 2) + R(40, 100, 40, 10, '#FFFFFF', 0, 2)
      + C(60, 24, 40, '#43A047', 3)
      + R(150, 70, 8, 146, '#FFCA28', 2, 2.5) + P('M158 80h52l10 10-10 10h-52z', '#FFF59D', 2.5) + P('M150 106h-42l-10 10 10 10h42z', '#FFF59D', 2.5)
      + R(166, 84, 12, 8, '#E53935', 0, 1.5) + R(116, 110, 12, 8, '#1E88E5', 0, 1.5) + R(166, 140, 52, 16, '#FFF59D', 2, 2.5) + R(172, 144, 12, 8, '#43A047', 0, 1.5)
      + g(120, 214, 1, C(0, -24, 9, '#FFE0BD', 2) + P('M-9 6v-20h18v20z', '#7E57C2', 2) + R(4, -18, 10, 16, '#FB8C00', 3, 2) + face(0, -22, 0.24)) + face(60, 140, 0.35)),
  F('cz', 'culture', 'mushrooms', 'การเก็บเห็ดในป่าแบบชาวเช็ก', 'Mushroom hunting in a Czech forest', ['mushroom picking', 'เก็บเห็ด', 'houbaření', 'houbareni', 'mushroom hunting', 'ล่าเห็ด', 'porcini', 'เห็ดพอร์ชินี', 'wicker basket', 'ตะกร้าหวาย'],
    // a wicker basket full of fat brown-capped porcini mushrooms on the mossy forest floor, more mushrooms peeking out of the moss beside a fern, a little knife, fir trunks behind
    R(20, 20, 18, 170, '#6D4C41', 0, 2.5) + R(200, 10, 20, 180, '#6D4C41', 0, 2.5) + P('M-4 180c40-14 200-14 248 0v40H-4z', '#7CB342', 3)
      + P('M60 140h120l-12 60H72z', '#D7A86E', 3) + Array.from({ length: 4 }, (_, k) => Lc(`M64 ${150 + k * 12}h112`, '#A1673F', 2)).join('') + P('M66 140c0-60 108-60 108 0', 'none', 6)
      + [[86, 134, 16], [118, 128, 20], [150, 134, 16]].map(([x, y, r]) => R(x - r / 2.4, y, r / 1.2, 14, '#FFF8E1', 4, 2) + P(`M${x - r} ${y + 2}c0-${r * 1.2} ${2 * r}-${r * 1.2} ${2 * r} 0z`, '#8D5524', 2.5)).join('')
      + [[30, 206, 12], [206, 204, 10]].map(([x, y, r]) => R(x - 4, y - 10, 8, 14, '#FFF8E1', 3, 2) + P(`M${x - r} ${y - 8}c0-${r * 1.2} ${2 * r}-${r * 1.2} ${2 * r} 0z`, '#A1673F', 2)).join('')
      + g(186, 184, 1, P('M0 0c-4-14-2-26 6-30M0 0c6-12 14-18 22-18', 'none', 0) + Lc('M0 0c-4-14-2-26 6-30M0 0c6-12 14-18 22-18M0 0c-10-8-14-18-14-26', '#2E7D32', 4)) + face(118, 114, 0.35)),
  F('cz', 'culture', 'applestar', 'ผ่าแอปเปิลหาดาวในคืนคริสต์มาสอีฟของเช็ก', 'Cutting an apple to find a star on Czech Christmas Eve', ['czech christmas eve', 'คริสต์มาสอีฟเช็ก', 'apple star', 'ดาวในแอปเปิล', 'cutting an apple', 'ผ่าแอปเปิล', 'christmas custom', 'ประเพณีคริสต์มาส', 'štědrý den', 'good luck star'],
    // a red apple cut across in two halves, the pale inside showing a five-pointed star of seeds in the middle, sparkles round it, a little candle and a sprig of fir behind
    g(76, 132, 1, C(0, 0, 52, '#E53935', 3) + C(0, 0, 44, '#FFF8E1', 2.5) + P('M0-24l7 15 17 2-12 11 3 17-15-8-15 8 3-17-12-11 17-2z', '#FFE082', 2) + [[0, -14], [10, -4], [6, 10], [-6, 10], [-10, -4]].map(([x, y]) => E(x, y, 2.5, 4, '#5D4037', 0)).join(''))
      + g(170, 132, 1, C(0, 0, 50, '#E53935', 3) + C(0, 0, 42, '#FFF8E1', 2.5) + P('M0-22l6 14 16 2-12 10 3 16-13-8-13 8 3-16-12-10 16-2z', '#FFE082', 2) + face(0, 26, 0.3))
      + Lc('M120 60l-6-24M114 36c8-4 14 0 16 6', '#43A047', 3) + [[120, 40], [36, 64], [214, 70], [120, 200]].map(([x, y]) => P(`M${x} ${y - 8}l2 6 6 2-6 2-2 6-2-6-6-2 6-2z`, '#FFC107', 1.5)).join('')
      + R(194, 180, 12, 30, '#FFFFFF', 2, 2) + P('M200 180c-6-8 0-16 0-16s6 8 0 16z', '#FFB300', 1.5)),

  // ---------- Prague
  L('cz/prague/landmark-goldenlane.v1.svg', 'ตรอกทองคำกับบ้านจิ๋วหลากสีในปราสาทปราก', 'Golden Lane and its tiny coloured houses', ['golden lane', 'ตรอกทองคำ', 'zlatá ulička', 'zlata ulicka', 'tiny houses', 'บ้านจิ๋ว', 'prague castle lane', 'ตรอกในปราสาทปราก', 'colourful cottages', 'castle wall houses'], 'หาบ้านหลังเล็กที่สุดที่ประตูเตี้ยกว่าผู้ใหญ่', 'Find the tiniest house with a door lower than a grown-up',
    // a cobbled lane of tiny crooked cottages in yellow, blue, pink and green tucked against the castle wall, little chimneys, low doors, a child standing taller than one door
    sky('#E3F2FD') + R(-4, 30, 248, 40, '#B0BEC5', 0, 3) + Array.from({ length: 8 }, (_, k) => R(4 + k * 30, 20, 16, 12, '#B0BEC5', 0, 2.5)).join('') + P('M-4 200h248v44H-4z', '#BDBDBD', 3) + [[20, 214], [60, 226], [100, 212], [150, 224], [200, 214]].map(([x, y]) => E(x, y, 10, 5, '#9E9E9E', 1.5)).join('')
      + [[0, 46, '#FFEB3B', 120], [46, 50, '#81D4FA', 104], [96, 40, '#F48FB1', 126], [136, 48, '#A5D6A7', 110], [184, 56, '#FFCC80', 118]].map(([x, w, c, top]) => R(x, top, w, 200 - top, c, 0, 3) + P(`M${x - 3} ${top}l${w / 2 + 3}-18 ${w / 2 + 3} 18z`, '#D84315', 2.5) + R(x + w / 2 - 8, top + 14, 14, 12, '#E1F5FE', 1, 2) + P(`M${x + 8} 200v-26c0-8 16-8 16 0v26z`, '#6D4C41', 2) + R(x + w - 12, top - 26, 7, 14, '#8D6E63', 0, 2)).join('')
      + kid(108, 206, '#1E88E5', 1.1) + face(160, 150, 0.3)),
  L('cz/prague/landmark-municipalhouse.v1.svg', 'อาคารเทศบาลปรากแบบอาร์ตนูโวกับภาพโมเสกโค้ง', 'The Municipal House with its golden mosaic arch', ['municipal house', 'อาคารเทศบาลปราก', 'obecní dům', 'obecni dum', 'art nouveau', 'อาร์ตนูโว', 'mosaic arch', 'โมเสกรูปโค้ง', 'smetana hall', 'concert hall'], 'หาภาพโมเสกสีทองครึ่งวงกลมเหนือประตู', 'Find the golden half-circle mosaic over the entrance',
    // a grand cream building with a green-grey dome, a huge half-moon mosaic in gold, blue and red above a glass canopy, statues-free decorations, round windows and balconies; a red tram passing
    sky('#E1F5FE') + P('M70 70c0-44 100-44 100 0z', '#80CBC4', 3) + C(120, 22, 6, '#FFC107', 2) + R(20, 70, 200, 146, '#FFF3E0', 0, 3) + R(14, 64, 212, 10, '#FFE0B2', 2, 2.5)
      + P('M54 150c0-64 132-64 132 0z', '#FFC107', 3) + P('M68 150c0-48 104-48 104 0z', '#42A5F5', 2.5) + Array.from({ length: 7 }, (_, k) => g(120, 150, 1, Lc('M0-14v-34', '#E53935', 3), -72 + k * 24)).join('') + C(120, 150, 14, '#FFF59D', 2)
      + P('M60 160h120l-10 12H70z', '#B2EBF2', 2.5) + R(96, 172, 48, 44, '#8D6E63', 2, 2.5) + [[34, 96], [190, 96]].map(([x, y]) => C(x + 8, y, 10, '#B3E5FC', 2.5) + R(x, y + 24, 16, 30, '#B3E5FC', 2, 2)).join('')
      + P('M-4 216h248v28H-4z', '#9E9E9E', 3) + face(120, 110, 0.35)),
  L('cz/prague/landmark-karlstejn.v1.svg', 'ปราสาทคาร์ลชไตน์บนเนินป่า', 'Karlštejn Castle on its wooded hill', ['karlštejn', 'karlstejn', 'คาร์ลชไตน์', 'karlstejn castle', 'ปราสาทคาร์ลชไตน์', 'gothic castle', 'ปราสาทโกธิก', 'great tower', 'หอคอยใหญ่', 'day trip from prague'], 'หาหอคอยสี่เหลี่ยมใหญ่ที่สูงที่สุดบนยอดเนิน', 'Find the big square tower standing highest on the hill',
    // a gothic castle climbing a forested hill in steps: a lower palace with a tall pointed roof, a middle tower, and on top the great square tower with a hipped roof; red-roofed village houses at the foot
    sky('#FFF8E1') + P('M-4 244V150c40-20 70-60 120-90 50 30 80 70 124 90v94z', '#558B2F', 3) + [[20, 184], [52, 160], [190, 166], [220, 186]].map(([x, y]) => C(x, y, 18, '#689F38', 2.5)).join('')
      + R(54, 120, 50, 50, '#EFEBE9', 0, 3) + P('M50 120l29-36 29 36z', '#5D4037', 3) + wins(62, 132, 3, 14, 7, 12)
      + R(96, 90, 30, 50, '#EFEBE9', 0, 3) + P('M92 90l15-22 15 22z', '#5D4037', 3)
      + R(126, 44, 52, 90, '#EFEBE9', 0, 3) + P('M120 44l32-28 32 28z', '#6D4C41', 3) + wins(134, 60, 3, 13, 8, 14) + wins(134, 92, 3, 13, 8, 14) + Lc('M120 134h60', INK, 3)
      + [[30, 224, '#E53935'], [80, 230, '#FF7043'], [170, 228, '#E53935'], [210, 222, '#FF7043']].map(([x, y, c]) => R(x - 12, y - 12, 24, 16, '#FFFFFF', 0, 2) + P(`M${x - 15} ${y - 12}l15-12 15 12z`, c, 2)).join('') + face(152, 112, 0.35)),
  L('cz/prague/landmark-hanavsky.v1.svg', 'ศาลาฮานาฟสกี้เหล็กหล่อบนเนินเลตนา', 'The cast-iron Hanavský Pavilion on Letná', ['hanavský pavilion', 'hanavsky pavilion', 'ศาลาฮานาฟสกี้', 'letná', 'letna', 'เนินเลตนา', 'cast iron pavilion', 'ศาลาเหล็กหล่อ', 'bridges view', 'วิวสะพานปราก'], 'หาศาลาเล็กที่มองลงไปเห็นสะพานเรียงกันหลายสะพาน', 'Find the little pavilion looking down on a row of bridges',
    // a lacy neo-baroque pavilion of cast iron painted cream and green, with a little onion top and arched windows, on a green hill edge; far below, the river crossed by a row of arched bridges
    sky('#E3F2FD') + P('M-4 160h248v84H-4z', '#4FC3F7', 0) + [190, 214, 236].map((y, k) => Lc(`M${-4 + k * 20} ${y - 20}h${248 - k * 40}`, '#B0BEC5', 6) + Array.from({ length: 6 }, (_, j) => P(`M${10 + k * 20 + j * 34} ${y - 17}c0 10 24 10 24 0`, 'none', 2)).join('')).join('')
      + P('M-4 150c20-20 40-30 80-30h50c10 20 10 30 0 40H-4z', '#7CB342', 3)
      + R(28, 70, 70, 60, '#FFF8E1', 2, 3) + [36, 58, 80].map((x) => P(`M${x} 126v-36c0-10 14-10 14 0v36z`, '#B3E5FC', 2)).join('') + P('M22 70l41-26 41 26z', '#4DB6AC', 3) + P('M54 44c0-16 18-16 18 0z', '#4DB6AC', 2.5) + Lc('M63 28v-10', INK, 2.5)
      + Lc('M28 84h70M28 110h70', '#43A047', 3) + kid(120, 150, '#FB8C00') + face(63, 64, 0.25)),
  L('cz/prague/landmark-sgraffito.v1.svg', 'บ้านลายสกราฟฟิโต "ดุม อู มินุตี" ขาวดำทั้งหลัง', 'The House at the Minute, covered in black-and-white scratched pictures', ['house at the minute', 'บ้านอูมินุตี', 'dům u minuty', 'dum u minuty', 'sgraffito', 'สกราฟฟิโต', 'scratched pictures', 'ภาพขูดขาวดำ', 'old town square', 'renaissance house'], 'หาภาพเด็กกับสัตว์ที่ขูดเป็นลายขาวดำบนผนัง', 'Find the scratched black-and-white pictures of children and animals on the wall',
    // a tall renaissance house with an arcade at street level, its whole front covered in black-and-white sgraffito panels of little figures, animals and patterns, a stepped gable on top
    sky('#FFF3E0') + P('M50 60l14-20h20l10-16h52l10 16h20l14 20z', '#EFEBE9', 3) + R(50, 60, 140, 156, '#ECEFF1', 0, 3)
      + Array.from({ length: 3 }, (_, r) => Array.from({ length: 4 }, (_, c) => R(58 + c * 33, 70 + r * 36, 28, 30, '#37474F', 2, 2) + g(72 + c * 33, 86 + r * 36, 1, (r + c) % 3 === 0 ? C(0, -6, 4, '#FFFFFF', 0) + R(-4, -2, 8, 10, '#FFFFFF', 0, 0) : (r + c) % 3 === 1 ? E(0, 2, 8, 5, '#FFFFFF', 0) + C(8, -3, 3, '#FFFFFF', 0) : Lc('M-8 6l4-8 4 8 4-8 4 8', '#FFFFFF', 2))).join('')).join('')
      + [58, 106, 154].map((x) => P(`M${x} 216v-22c0-14 28-14 28 0v22z`, '#5D4037', 2.5)).join('') + P('M-4 216h248v28H-4z', '#BDBDBD', 3) + kid(200, 236, '#E53935') + face(120, 40, 0.25)),

  // ---------- Hungary
  F('hu', 'food', 'dobos', 'เค้กโดโบชหน้าคาราเมลชิ้นสามเหลี่ยม', 'Dobos torte with its caramel top', ['dobos torte', 'dobos torta', 'เค้กโดโบช', 'caramel top', 'หน้าคาราเมล', 'chocolate buttercream', 'ครีมช็อกโกแลต', 'hungarian cake', 'เค้กฮังการี', 'sponge layers'],
    // a round cake of thin sponge layers striped with chocolate cream, topped with shiny amber caramel wedges standing up at an angle like a fan; one slice on a plate in front
    E(110, 186, 96, 22, '#FFFFFF', 3) + R(30, 104, 140, 74, '#FFE0B2', 0, 3) + E(100, 178, 70, 12, '#FFE0B2', 0) + Array.from({ length: 5 }, (_, k) => Lc(`M30 ${118 + k * 12}h140`, '#6D4C41', 4)).join('') + E(100, 104, 70, 14, '#5D4037', 3)
      + Array.from({ length: 7 }, (_, k) => g(48 + k * 16, 100, 1, P('M-8 0l10-26 10 4-6 24z', '#FFB300', 2.5), -10 + k * 2)).join('')
      + g(180, 172, 1, P('M-24 6l24-36 24 36z', '#FFE0B2', 2.5) + Array.from({ length: 4 }, (_, k) => Lc(`M${-18 + k * 3} ${-2 - k * 6}h${36 - k * 6}`, '#6D4C41', 3)).join('') + P('M-6-30l8-22 12 6-8 18z', '#FFB300', 2.5)) + face(100, 146, 0.4)),
  F('hu', 'animal', 'mangalica', 'หมูมังกาลิตซาขนหยิกเหมือนแกะ', 'A Mangalica, the curly-haired pig', ['mangalica', 'มังกาลิตซา', 'woolly pig', 'หมูขนหยิก', 'curly haired pig', 'หมูขนฟู', 'hungarian pig', 'หมูฮังการี', 'piglets', 'farm animal'],
    // a round pig covered all over in thick curly blonde wool like a sheep, a pink snout and floppy ears peeking out, a striped piglet beside her on the grass
    P('M-4 196c60-10 180-10 248 0v40H-4z', '#9CCC65', 2.5) + g(110, 140, 1, E(0, 0, 70, 46, '#FFE0B2', 3) + Array.from({ length: 16 }, (_, k) => C(-56 + (k % 8) * 16, -26 + Math.floor(k / 8) * 24, 9, '#FFCC80', 2)).join('')
      + R(-48, 34, 14, 26, '#FFCC80', 4, 2.5) + R(-16, 38, 14, 22, '#FFCC80', 4, 2.5) + R(20, 38, 14, 22, '#FFCC80', 4, 2.5) + R(46, 34, 14, 26, '#FFCC80', 4, 2.5)
      + C(68, -10, 30, '#FFE0B2', 3) + E(94, 0, 12, 10, '#F48FB1', 2.5) + C(90, 0, 2, INK, 0) + C(98, 0, 2, INK, 0) + P('M54-36c-10-14 0-24 14-14z', '#FFCC80', 2.5) + P('M78-38c4-16 18-12 16 4z', '#FFCC80', 2.5) + face(66, -10, 0.4, 'none') + Lc('M-72-4c-10-6-8-16 0-14', INK, 2.5))
      + g(196, 200, 1, E(0, 0, 22, 14, '#BCAAA4', 2.5) + Lc('M-16-6h30M-16 4h30', '#8D6E63', 3) + C(20, -6, 10, '#BCAAA4', 2.5) + E(28, -4, 5, 4, '#F48FB1', 2) + C(18, -8, 1.5, INK, 0))),
  F('hu', 'animal', 'bustard', 'นกอัสสาจักรใหญ่แห่งทุ่งหญ้าปุสตา', 'A great bustard on the puszta grassland', ['great bustard', 'นกอัสสาจักรใหญ่', 'túzok', 'tuzok', 'puszta', 'ทุ่งหญ้าปุสตา', 'heaviest flying bird', 'นกบินได้ที่หนักที่สุด', 'hungarian grassland', 'display feathers'],
    // a big stout bird with a grey head and long white whiskers, a ginger barred back, puffed up in its display with white feathers fluffed out like a foamy ball, standing in tall golden grass
    P('M-4 180c60-6 180-6 248 0v60H-4z', '#DCE775', 2.5) + Array.from({ length: 12 }, (_, k) => Lc(`M${10 + k * 20} 200l-4-24M${16 + k * 20} 202l6-22`, '#C0CA33', 3)).join('')
      + g(120, 130, 1, C(-10, 6, 52, '#FFFFFF', 3) + Array.from({ length: 10 }, (_, k) => g(-10, 6, 1, C(0, -48, 10, '#FFFFFF', 2), k * 36)).join('') + P('M-40-10c10-30 50-36 70-10-10 20-50 30-70 10z', '#D7A86E', 3) + Lc('M-30-14l10 8M-14-20l10 10M4-22l8 12', '#8D5524', 3)
        + Lc('M28-20c6-20 10-36 8-50', '#90A4AE', 12) + C(36, -74, 14, '#90A4AE', 3) + P('M48-74l14 4-14 4z', '#FFCA28', 2) + C(40, -78, 2.5, INK, 0) + Lc('M30-64l-18 6M32-62l-14 12', '#FFFFFF', 2.5) + R(-16, 56, 6, 22, '#8D6E63', 0, 2) + R(4, 56, 6, 22, '#8D6E63', 0, 2)) + face(108, 150, 0.35)),
  F('hu', 'culture', 'palochouse', 'บ้านชาวปาลอตส์ผนังขาวระเบียงไม้ที่ฮอลโลเกอ', 'A Palóc house with a carved wooden porch in Hollókő', ['hollókő', 'holloko', 'ฮอลโลเกอ', 'palóc house', 'palotz', 'บ้านชาวปาลอตส์', 'whitewashed house', 'บ้านผนังขาว', 'wooden porch', 'ระเบียงไม้แกะสลัก'],
    // a little whitewashed village house with a steep shingle roof whose gable end is carved wood, a long wooden porch along the side on carved posts, red geraniums, a woven fence and a cobbled lane
    sky('#E3F2FD') + P('M-4 196h248v48H-4z', '#BCAAA4', 3) + R(40, 106, 150, 90, '#FFFFFF', 0, 3) + P('M30 108l68-74 68 74z', '#6D4C41', 3) + P('M58 106l40-44 40 44z', '#A1673F', 2.5) + Lc('M70 96h56M82 82h32M98 62v44', '#6D4C41', 2.5) + C(98, 88, 5, '#FFFFFF', 2)
      + P('M166 108l-68-74h40l72 74z', '#8D6E63', 3) + R(150, 114, 50, 82, '#FFF8E1', 0, 2.5) + [156, 176, 196].map((x) => R(x - 3, 114, 6, 82, '#A1673F', 0, 2)).join('') + Lc('M150 140h50', '#A1673F', 3)
      + [[58, 132], [114, 132]].map(([x, y]) => R(x, y, 26, 26, '#42A5F5', 1, 2.5) + Lc(`M${x + 13} ${y}v26M${x} ${y + 13}h26`, '#FFFFFF', 2) + R(x - 2, y + 26, 30, 8, '#8D6E63', 0, 2) + [x + 4, x + 13, x + 22].map((c) => C(c, y + 24, 4, '#E53935', 1.5)).join('')).join('')
      + Array.from({ length: 6 }, (_, k) => Lc(`M${2 + k * 6} 200v-30`, '#A1673F', 3)).join('') + Lc('M0 178h40M0 190h40', '#8D6E63', 3) + face(98, 170, 0.35)),

  // ---------- Budapest
  L('hu/budapest/landmark-turul.v1.svg', 'รูปปั้นนกทูรุลยักษ์ที่ปราสาทบูดา', 'The great Turul bird at Buda Castle', ['turul', 'ทูรุล', 'turul bird', 'นกทูรุล', 'mythical bird', 'นกในตำนาน', 'buda castle', 'ปราสาทบูดา', 'bronze bird', 'castle gate'], 'หานกยักษ์ที่กางปีกถือดาบอยู่บนเสา', 'Find the giant bird spreading its wings on top of the gate pillar',
    // a huge bronze-green bird with wide spread wings and a hooked beak perched on a stone pillar beside a fancy iron gate, the city and the river far below
    sky('#FFF8E1') + P('M-4 170h248v74H-4z', '#81D4FA', 0) + Lc('M10 200h50M150 216h60', '#E1F5FE', 3) + [[20, 168], [60, 160], [180, 164], [220, 170]].map(([x, y]) => R(x - 10, y - 20, 20, 20, '#FFE0B2', 0, 2) + P(`M${x - 12} ${y - 20}l12-10 12 10z`, '#D84315', 2)).join('')
      + R(96, 120, 48, 120, '#EFEBE9', 0, 3) + R(90, 112, 60, 12, '#D7CCC8', 2, 2.5) + Lc('M100 150h40M100 190h40', '#BCAAA4', 2)
      + R(150, 150, 70, 90, 'none', 0, 0) + Array.from({ length: 6 }, (_, k) => Lc(`M${156 + k * 12} 240v-80`, '#37474F', 3) + C(156 + k * 12, 156, 3, '#FFC107', 1)).join('') + Lc('M150 180h70', '#37474F', 3)
      + g(120, 90, 1, P('M0-6c-30-30-70-30-104-20 30 4 46 18 60 34z', '#558B78', 3) + P('M0-6c30-30 70-30 104-20-30 4-46 18-60 34z', '#558B78', 3) + Lc('M-90-20l20 12M-70-26l14 18M90-20l-20 12M70-26l-14 18', '#3E6B5C', 3)
        + E(0, 6, 18, 22, '#558B78', 3) + C(0, -20, 12, '#558B78', 3) + P('M8-22l12 4-10 6z', '#FFC107', 2) + C(4, -24, 2.5, INK, 0)) + face(120, 170, 0.3)),
  L('hu/budapest/landmark-budacastle.v1.svg', 'พระราชวังบูดาโดมเขียวบนเนินปราสาท', 'Buda Castle palace and its green dome', ['buda castle', 'ปราสาทบูดา', 'buda royal palace', 'พระราชวังบูดา', 'budavári palota', 'castle hill', 'เนินปราสาท', 'hungarian national gallery', 'green dome'], 'หาโดมสีเขียวที่อยู่กลางพระราชวังยาว', 'Find the green dome in the middle of the long palace',
    // a very long neo-baroque palace along the top of a green hill, a big green copper dome with a lantern in the middle, many windows, terraced stone walls and steps down the slope, the river at the foot
    sky('#E3F2FD') + P('M-4 244V160c40-10 200-10 248 0v84z', '#7CB342', 3) + P('M-4 216h248v28H-4z', '#4FC3F7', 3) + Lc('M30 228h40M150 232h50', '#E1F5FE', 3)
      + Array.from({ length: 4 }, (_, k) => R(30 + k * 12, 150 + k * 10, 180 - k * 24, 8, '#E0E0E0', 0, 2)).join('')
      + R(10, 100, 220, 52, '#FFF8E1', 0, 3) + wins(18, 110, 14, 15, 8, 12) + wins(18, 130, 14, 15, 8, 12) + Lc('M10 106h220', '#D7CCC8', 3)
      + R(92, 80, 56, 30, '#FFF8E1', 0, 3) + [100, 112, 128, 140].map((x) => R(x - 2, 84, 4, 24, '#FFFFFF', 0, 1.5)).join('') + P('M90 80c0-40 60-40 60 0z', '#4DB6AC', 3) + R(112, 30, 16, 14, '#4DB6AC', 0, 2.5) + P('M110 30l10-12 10 12z', '#4DB6AC', 2) + face(120, 64, 0.3)),
  L('hu/budapest/landmark-somloi.v1.svg', 'ขนมโชมโลยี กาลุชการาดช็อกโกแลต', 'Somlói galuska, sponge pudding with chocolate sauce', ['somlói galuska', 'somloi galuska', 'โชมโลยี กาลุชกา', 'sponge pudding', 'พุดดิ้งสปันจ์', 'chocolate sauce', 'ซอสช็อกโกแลต', 'whipped cream', 'วิปครีม', 'hungarian dessert'], 'หาลูกเกดกับวอลนัตที่โผล่ออกมาจากครีม', 'Find the raisins and walnuts peeking out of the cream',
    // a glass bowl with rough scoops of yellow, white and chocolate sponge, a cloud of whipped cream on top, dark chocolate sauce poured over, raisins and walnut pieces, a long spoon
    P('M50 130h140c-6 50-30 76-70 76s-64-26-70-76z', '#E1F5FE', 3) + E(120, 210, 30, 6, '#B3E5FC', 2.5) + R(114, 196, 12, 12, '#B3E5FC', 0, 2)
      + [[80, 140, '#FFE082'], [116, 148, '#795548'], [150, 138, '#FFF8E1'], [100, 168, '#FFF8E1'], [138, 168, '#FFE082']].map(([x, y, c]) => C(x, y, 20, c, 2.5)).join('')
      + P('M70 120c-14-10 0-28 16-22 0-20 34-24 40-6 14-12 36 0 30 18 14 6 6 26-10 22H82c-14 0-18-6-12-12z', '#FFFFFF', 3) + P('M86 110c10 10 20-4 30 6s20-4 30 6 6 18 0 22c-10-6-14 6-22 0s-14 6-22-2-16 0-16-12z', '#4E342E', 2.5)
      + [[96, 100], [140, 98], [118, 126]].map(([x, y]) => E(x, y, 4, 3, '#311B92', 1)).join('') + [[78, 132], [160, 128]].map(([x, y]) => P(`M${x - 6} ${y}c0-8 12-8 12 0s-12 8-12 0z`, '#A1673F', 1.5)).join('')
      + Lc('M160 104l40-60', '#B0BEC5', 6) + face(120, 172, 0.3)),
  L('hu/budapest/landmark-pinball.v1.svg', 'พิพิธภัณฑ์พินบอลที่เล่นได้ทุกเครื่องในบูดาเปสต์', 'The Budapest pinball museum where every machine can be played', ['pinball museum', 'พิพิธภัณฑ์พินบอล', 'flippermúzeum', 'flippermuzeum', 'pinball machines', 'เครื่องพินบอล', 'arcade games', 'เกมตู้', 'flashing lights', 'ไฟกะพริบ'], 'หาลูกบอลเงินที่กำลังเด้งอยู่ในเครื่อง', 'Find the silver ball bouncing round inside the machine',
    // a big pinball machine with a tall lit-up back box of stars and rockets, a slanted glass table with round bumpers, flippers and a silver ball, a child on tiptoe pressing the buttons; lights flashing
    sky('#311B92') + Array.from({ length: 8 }, (_, k) => C(14 + k * 30, 14 + (k % 2) * 10, 3, ['#FFEB3B', '#F06292', '#4FC3F7'][k % 3], 0)).join('')
      + R(70, 24, 100, 70, '#7B1FA2', 6, 3) + R(80, 34, 80, 50, '#FFF59D', 3, 2.5) + P('M120 40l6 12 14 2-10 10 2 14-12-6-12 6 2-14-10-10 14-2z', '#FF7043', 2) + g(146, 72, 1, P('M-4 6l4-18 4 18z', '#42A5F5', 1.5))
      + P('M60 94h120l20 90H40z', '#4A148C', 3) + P('M68 100h104l16 76H52z', '#81D4FA', 2.5)
      + [[96, 124, '#F06292'], [144, 124, '#FFEB3B'], [120, 144, '#66BB6A']].map(([x, y, c]) => C(x, y, 11, c, 2.5) + C(x, y, 4, '#FFFFFF', 0)).join('') + C(110, 162, 5, '#ECEFF1', 2)
      + Lc('M88 170l20 6M152 170l-20 6', '#E53935', 6) + R(48, 184, 144, 12, '#6A1B9A', 2, 3) + R(56, 196, 10, 40, '#4A148C', 0, 2.5) + R(174, 196, 10, 40, '#4A148C', 0, 2.5)
      + kid(212, 230, '#FFCA28') + face(120, 56, 0.3)),

  // ---------- Berlin and Potsdam
  L('de/berlin/landmark-sanssouci.v1.svg', 'พระราชวังซองซูซีบนขั้นบันไดสวนที่พ็อทซ์ดัม', 'Sanssouci Palace on its terraced steps in Potsdam', ['sanssouci', 'ซองซูซี', 'sanssouci palace', 'พระราชวังซองซูซี', 'potsdam', 'พ็อทซ์ดัม', 'terraced garden', 'สวนขั้นบันได', 'glass niches', 'summer palace'], 'หาขั้นบันไดหกชั้นที่มีกระจกโค้งเรียงกันอยู่', 'Find the six terraced steps lined with curved glass windows',
    // a long low yellow palace with a little green dome on top of a hill, below it six wide curved terraces with rows of arched glass niches, a grand staircase down the middle, a round fountain at the bottom
    sky('#E3F2FD') + R(50, 34, 140, 30, '#FFE082', 0, 3) + P('M104 34c0-24 32-24 32 0z', '#4DB6AC', 3) + wins(58, 42, 7, 18, 8, 14, '#FFFFFF')
      + Array.from({ length: 6 }, (_, k) => P(`M${30 - k * 6} ${64 + k * 22}h${180 + k * 12}v20H${30 - k * 6}z`, '#9CCC65', 2.5) + Array.from({ length: 6 + k }, (_, j) => P(`M${36 - k * 6 + j * (168 + k * 12) / (6 + k)} ${82 + k * 22}v-10c0-8 12-8 12 0v10z`, '#E1F5FE', 1.5)).join('')).join('')
      + R(108, 64, 24, 132, '#EFEBE9', 0, 2.5) + Array.from({ length: 12 }, (_, k) => Lc(`M108 ${72 + k * 11}h24`, '#BCAAA4', 1.5)).join('')
      + P('M-4 196h248v48H-4z', '#7CB342', 3) + E(120, 216, 40, 12, '#81D4FA', 3) + Lc('M120 214v-14', '#B3E5FC', 4) + face(120, 52, 0.3)),
  L('de/berlin/landmark-mauerpark.v1.svg', 'คาราโอเกะวันอาทิตย์ในอัฒจันทร์เมาเออร์พาร์ค', 'Sunday karaoke in the Mauerpark amphitheatre', ['mauerpark', 'เมาเออร์พาร์ค', 'mauerpark karaoke', 'คาราโอเกะเมาเออร์พาร์ค', 'bearpit karaoke', 'open air karaoke', 'คาราโอเกะกลางแจ้ง', 'stone amphitheatre', 'อัฒจันทร์หิน', 'sunday in berlin'], 'หาเด็กที่ถือไมโครโฟนร้องเพลงอยู่กลางลาน', 'Find the child singing with a microphone in the middle',
    // curved stone seating rows climbing a grassy slope, crowds of little round heads clapping, at the bottom a child with a microphone singing next to a speaker on a cargo bike, music notes floating
    sky('#E1F5FE') + Array.from({ length: 5 }, (_, k) => P(`M${-4} ${60 + k * 26}c60 30 188 30 248 0v20c-60 30-188 30-248 0z`, '#CFD8DC', 2.5)).join('')
      + Array.from({ length: 18 }, (_, k) => C(14 + (k % 6) * 42 + Math.floor(k / 6) * 10, 70 + Math.floor(k / 6) * 26 + (k % 6 === 0 || k % 6 === 5 ? -4 : 6), 7, ['#FFE0BD', '#D7A86E', '#FFCC80'][k % 3], 2)).join('')
      + P('M-4 196c60 20 188 20 248 0v48H-4z', '#A5D6A7', 3)
      + g(110, 226, 1, C(0, -26, 10, '#FFE0BD', 2.5) + P('M-10 6v-22h20v22z', '#E53935', 2.5) + Lc('M8-14l8-12', '#FFE0BD', 4) + C(18, -30, 5, '#37474F', 2) + face(0, -24, 0.26, 'o'))
      + g(166, 222, 1, R(-14, -36, 28, 30, '#37474F', 3, 2.5) + C(0, -26, 8, '#90A4AE', 2) + C(0, -12, 4, '#90A4AE', 1.5) + R(-20, -6, 40, 8, '#FB8C00', 2, 2) + C(-14, 6, 7, 'none', 2.5) + C(14, 6, 7, 'none', 2.5))
      + [[136, 180], [150, 166], [80, 176]].map(([x, y], k) => g(x, y, 1, E(0, 0, 5, 4, k % 2 ? '#7E57C2' : '#EC407A', 1.5) + Lc('M4 0v-14', INK, 2))).join('')),
  L('de/berlin/landmark-spreewald.v1.svg', 'ถังแตงกวาดองชเปรวัลด์ริมคลองในป่า', 'A barrel of Spreewald gherkins by a forest canal', ['spreewald', 'ชเปรวัลด์', 'spreewald gherkins', 'แตงกวาดองชเปรวัลด์', 'pickled cucumbers', 'แตงกวาดอง', 'punt boat', 'เรือถ่อ', 'lübbenau', 'forest canals'], 'หาแตงกวาดองที่มีหน้ายิ้มโผล่ขึ้นจากถัง', 'Find the smiling gherkin popping up out of the barrel',
    // a wooden barrel brimming with green knobbly gherkins and dill, one big gherkin with a face standing up, on a little wooden jetty by a quiet green canal with a long flat punt boat and alder trees
    sky('#E8F5E9') + [[20, 90], [70, 80], [180, 84], [224, 92]].map(([x, y]) => g(x, y, 1, C(0, -20, 22, '#43A047', 2.5) + R(-3, 0, 6, 30, '#6D4C41', 0, 2))).join('') + P('M-4 130h248v114H-4z', '#4DB6AC', 3) + Lc('M20 150h50M160 160h60', '#B2DFDB', 3)
      + g(70, 160, 1, P('M-60 0h120l-10 12H-50z', '#8D6E63', 2.5) + Lc('M60-4l20-60', '#6D4C41', 3) + C(30, -10, 7, '#FFE0BD', 2) + P('M24-4h12v-6h-12z', '#1E88E5', 2))
      + R(110, 184, 130, 12, '#A1673F', 0, 2.5) + R(128, 196, 8, 48, '#6D4C41', 0, 2) + R(214, 196, 8, 48, '#6D4C41', 0, 2)
      + P('M138 184c-4-30-4-50 6-70h52c10 20 10 40 6 70z', '#A1673F', 3) + Lc('M136 136h68M136 168h68', '#5D4037', 4)
      + [[150, 114, -10], [190, 112, 14], [164, 106, 4]].map(([x, y, r]) => g(x, y, 1, E(0, -12, 8, 18, '#689F38', 2) + C(-3, -16, 1.5, '#AED581', 0) + C(3, -6, 1.5, '#AED581', 0), r)).join('')
      + g(176, 90, 1, E(0, 0, 13, 28, '#7CB342', 3) + C(-5, 12, 2, '#AED581', 0) + C(6, 16, 2, '#AED581', 0) + face(0, -6, 0.3)) + Lc('M200 104l12-14M204 98l-2-10', '#33691E', 2)),
  L('de/berlin/landmark-weltzeituhr.v1.svg', 'นาฬิกาโลกที่อเล็กซานเดอร์พลัทซ์', 'The World Clock on Alexanderplatz', ['world clock', 'นาฬิกาโลก', 'weltzeituhr', 'ไวลท์ไซท์อูร์', 'alexanderplatz', 'อเล็กซานเดอร์พลัทซ์', 'time zones', 'เขตเวลา', 'spinning planets', 'meeting point'], 'หาดาวเคราะห์ที่ลอยหมุนอยู่บนยอดนาฬิกา', 'Find the little planets circling on top of the clock',
    // a round drum of 24 bright panels for the world's time zones on a single thick column, a little ring of wire planets circling on top round a sun, a paved square, a child looking up
    sky('#E3F2FD') + P('M-4 196h248v48H-4z', '#BDBDBD', 3) + Lc('M40 196l-20 48M120 196v48M200 196l20 48', '#9E9E9E', 2) + R(110, 120, 20, 76, '#B0BEC5', 0, 3) + E(120, 196, 30, 6, '#90A4AE', 2.5)
      + P('M50 84h140v40H50z', '#ECEFF1', 3) + Array.from({ length: 10 }, (_, k) => R(54 + k * 13.5, 88, 11, 32, ['#E53935', '#FFCA28', '#43A047', '#1E88E5', '#AB47BC'][k % 5], 1, 1.5)).join('') + P('M44 84h152l-8-8H52z', '#CFD8DC', 2.5) + P('M44 124h152l-8 8H52z', '#CFD8DC', 2.5)
      + Lc('M120 76V40', INK, 3) + C(120, 36, 8, '#FFC107', 2.5) + E(120, 36, 50, 12, 'none', 0) + Lc('M70 36c0-8 100-8 100 0s-100 8-100 0', '#90A4AE', 2) + [[72, 38, 5, '#42A5F5'], [100, 26, 4, '#E53935'], [150, 46, 6, '#FB8C00'], [166, 32, 4, '#66BB6A']].map(([x, y, r, c]) => C(x, y, r, c, 1.5)).join('')
      + kid(60, 232, '#E53935')),
  L('de/berlin/landmark-strandkorb.v1.svg', 'เก้าอี้ตะกร้าชายหาดชตรันด์คอร์บที่วันน์เซ', 'Strandkorb beach baskets at the Wannsee lido', ['strandkorb', 'ชตรันด์คอร์บ', 'beach basket chair', 'เก้าอี้ตะกร้าชายหาด', 'wannsee', 'วันน์เซ', 'strandbad wannsee', 'lake beach', 'หาดทะเลสาบ', 'striped hood'], 'หาเก้าอี้ตะกร้าที่มีหลังคาลายทางคลุมไว้', 'Find the wicker beach chair with a striped hood',
    // two hooded wicker beach chairs with blue-and-white and red-and-white striped cushions on pale sand by a lake, a child dozing in one with a sun hat, a sailing boat on the water
    sky('#E1F5FE') + P('M-4 110h248v40H-4z', '#4FC3F7', 3) + g(196, 104, 1, P('M-14 0h28l-4 6h-20z', '#FFFFFF', 2) + Lc('M0 0v-26', INK, 2) + P('M2-24l14 22H2z', '#FFFFFF', 2)) + P('M-4 150h248v94H-4z', '#FFE0B2', 3)
      + [[70, '#1E88E5'], [160, '#E53935']].map(([x, c]) => g(x, 0, 1, P('M-36 220v-90c0-30 72-30 72 0v90z', '#D7A86E', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M-34 ${140 + k * 13}h68`, '#A1673F', 2)).join('') + P('M-28 220v-74c0-20 56-20 56 0v74z', '#FFFFFF', 2.5) + Lc('M-16 150v70M0 146v74M16 150v70', c, 6) + R(-40, 196, 80, 12, '#A1673F', 2, 2.5))).join('')
      + g(70, 188, 1, C(0, -10, 10, '#FFE0BD', 2.5) + E(0, -20, 18, 5, '#FFEB3B', 2) + P('M-8-22c0-12 16-12 16 0', '#FFEB3B', 2) + face(0, -8, 0.24, 'none') + Lc('M-6-8h4M2-8h4', INK, 2)) + face(160, 176, 0.3)),

  // ---------- Rothenburg, the Tauber valley and Nuremberg
  L('de/rothenburg/landmark-doppelbruecke.v1.svg', 'สะพานสองชั้นข้ามหุบเขาเทาเบอร์', 'The double bridge over the Tauber valley', ['doppelbrücke', 'doppelbruecke', 'สะพานสองชั้น', 'double bridge', 'two-tier bridge', 'tauber valley', 'หุบเขาเทาเบอร์', 'tauber river', 'แม่น้ำเทาเบอร์', 'stone arches'], 'หาซุ้มโค้งแถวบนที่วางซ้อนบนซุ้มโค้งแถวล่าง', 'Find the row of arches stacked on top of another row of arches',
    // an old stone bridge with two storeys of round arches, small on top of big, crossing a little green river in a meadow valley, the walled town's towers on the hill behind
    sky('#FFF8E1') + P('M-4 100c40-20 80-30 120-26s90 14 128 30v20H-4z', '#7CB342', 3) + [[150, 70], [176, 64], [200, 72]].map(([x, y]) => R(x - 7, y, 14, 30, '#FFE0B2', 0, 2) + P(`M${x - 9} ${y}l9-14 9 14z`, '#D84315', 2)).join('')
      + P('M-4 120h248v124H-4z', '#9CCC65', 0) + P('M-4 206c60-6 180-6 248 0v38H-4z', '#4FC3F7', 3)
      + R(10, 114, 220, 96, '#D7CCC8', 0, 3) + Array.from({ length: 4 }, (_, k) => P(`M${20 + k * 54} 210v-34c0-24 40-24 40 0v34z`, '#4FC3F7', 3)).join('') + Array.from({ length: 8 }, (_, k) => P(`M${18 + k * 27} 160v-20c0-12 18-12 18 0v20z`, '#FFF8E1', 2.5)).join('')
      + Lc('M10 118h220', '#A1887F', 4) + Lc('M10 168h220', '#A1887F', 3)),
  L('de/rothenburg/landmark-prunepeople.v1.svg', 'ตุ๊กตาลูกพรุนซเวทช์เกินแมนน์ลาแห่งนูเรมเบิร์ก', 'Zwetschgenmännla, Nuremberg\'s prune people', ['zwetschgenmännla', 'zwetschgenmaennla', 'ตุ๊กตาลูกพรุน', 'prune people', 'prune figures', 'nuremberg', 'นูเรมเบิร์ก', 'nuremberg christmas', 'dried fruit dolls', 'ตุ๊กตาผลไม้แห้ง'], 'หาตุ๊กตาที่ตัวทำจากลูกพรุนสีดำเรียงกัน', 'Find the little dolls with bodies made of black prunes',
    // three little dolls made of dark prunes threaded on wire with a walnut head and painted faces, wearing tiny felt hats, an apron and a scarf, holding a broom and a basket, standing on wooden bases
    R(14, 200, 212, 18, '#A1673F', 4, 3)
      + [[56, '#E53935', 'hat'], [120, '#1E88E5', 'scarf'], [184, '#43A047', 'apron']].map(([x, c, t], i) => g(x, 200, 1, R(-22, -4, 44, 8, '#8D6E63', 2, 2) + [-14, 0, 14].map((d) => E(d * 0.4, -26 - (d + 14) * 1.7, 14, 12, '#3E2723', 2.5)).join('') + E(-14, -46, 6, 14, '#3E2723', 2) + E(14, -46, 6, 14, '#3E2723', 2)
        + C(0, -98, 16, '#A1673F', 3) + Lc('M-8-104c4-4 8-4 12 0M-6-92c4-2 8-2 12 0', '#8D5524', 1.5) + face(0, -96, 0.3)
        + (i === 0 ? P('M-18-110h36l-6-16h-24z', c, 2.5) + R(-24, -112, 48, 6, c, 2, 2.5) : i === 1 ? Lc('M-14-80c8 6 20 6 28 0', c, 7) + Lc('M22-40v-50M18-40h8', '#FFCA28', 3) : P('M-12-70h24l4 40h-32z', '#FFFFFF', 2) + P('M-18-114c4-14 32-14 36 0z', c, 2.5)))).join('')),
  L('de/rothenburg/landmark-gerlachschmiede.v1.svg', 'โรงตีเหล็กเกอร์ลัคชมีเดอ บ้านโครงไม้หลังคาสูงชัน', 'The Gerlachschmiede, the old smithy house', ['gerlachschmiede', 'เกอร์ลัคชมีเดอ', 'old smithy', 'โรงตีเหล็กเก่า', 'blacksmith house', 'บ้านช่างตีเหล็ก', 'half-timbered house', 'บ้านโครงไม้', 'rödertor', 'rothenburg postcard'], 'หาเกือกม้าที่แขวนอยู่เหนือประตูโรงตีเหล็ก', 'Find the horseshoe hanging over the smithy door',
    // a tall half-timbered house with a very steep stepped gable full of dark beams in criss-cross patterns, red geraniums, a big arched smithy door with a horseshoe above, a gate tower beside it
    sky('#E3F2FD') + R(176, 40, 46, 170, '#FFE0B2', 0, 3) + P('M170 40l29-34 29 34z', '#D84315', 3) + R(186, 160, 26, 50, '#6D4C41', 0, 2.5) + R(190, 70, 16, 20, '#B3E5FC', 1, 2)
      + P('M30 210V90l64-80 64 80v120z', '#FFF8E1', 3) + P('M30 90l64-80 64 80', 'none', 4)
      + Lc('M30 130h128M30 170h128M46 70h96M62 50h64M94 10v200M62 50v160M126 50v160M46 70v140M142 70v140', '#5D4037', 3) + Lc('M30 130l32 40M62 130l-32 40M126 130l32 40M158 130l-32 40M62 90l32 40M94 90l32 40M126 90l-32 40', '#5D4037', 2.5)
      + [[72, 144], [104, 144], [76, 104], [108, 104], [94, 64]].map(([x, y]) => R(x - 7, y - 7, 14, 14, '#B3E5FC', 1, 2)).join('') + [[72, 156], [104, 156]].map(([x, y]) => R(x - 9, y, 18, 6, '#8D6E63', 0, 1.5) + C(x - 4, y, 3, '#E53935', 1) + C(x + 4, y, 3, '#E53935', 1)).join('')
      + P('M74 210v-24c0-14 40-14 40 0v24z', '#5D4037', 3) + P('M86 178c0 10 16 10 16 0', 'none', 0) + Lc('M88 172c0 10 12 10 12 0', '#90A4AE', 4)
      + P('M-4 210h248v34H-4z', '#BDBDBD', 3) + face(94, 30, 0.2)),
  L('de/rothenburg/landmark-schaeufele.v1.svg', 'ชอยเฟเลอ ไหล่หมูอบหนังกรอบแบบฟรังโคเนีย', 'Schäufele, crackling roast pork shoulder from Franconia', ['schäufele', 'schaeufele', 'ชอยเฟเลอ', 'roast pork shoulder', 'ไหล่หมูอบ', 'crackling', 'หนังกรอบ', 'potato dumpling', 'เกี๊ยวมันฝรั่ง', 'franconian food'], 'หากระดูกแบนๆ ที่ยื่นออกมาจากเนื้อเหมือนพลั่ว', 'Find the flat bone sticking out of the meat like a little shovel',
    // a plate with a roast pork shoulder with crisp diamond-scored brown crackling and a flat shovel-shaped bone sticking out, a round fluffy potato dumpling and gravy, a little heap of red cabbage
    E(120, 160, 104, 46, '#FFFFFF', 3) + E(120, 158, 90, 36, '#ECEFF1', 2) + P('M40 160c10 14 150 14 160 0', '#8D5524', 0)
      + P('M50 160c-6-30 20-50 56-48 20 2 36 14 36 36 0 14-30 22-56 22s-34-2-36-10z', '#BF6A2E', 3) + Lc('M66 130l40 30M80 122l40 30M60 146l20 14M86 120l-26 30M106 124l-30 34M124 132l-26 30', '#8D4A1E', 2)
      + P('M136 132l40-30c8-6 18 4 10 12l-36 30z', '#FFF8E1', 3)
      + C(160, 168, 22, '#FFF3E0', 3) + C(156, 162, 4, '#FFE0B2', 0) + P('M140 186c10 6 30 6 40 0', 'none', 0)
      + [[70, 186], [84, 190], [96, 186]].map(([x, y]) => E(x, y, 8, 5, '#8E24AA', 2)).join('') + face(96, 144, 0.35)),
  L('de/rothenburg/landmark-spitalbastei.v1.svg', 'ป้อมชปีทาลบาสไตกับประตูเจ็ดบาน', 'The Spitalbastei bastion and its seven gates', ['spitalbastei', 'ชปีทาลบาสไต', 'hospital bastion', 'ป้อมปราการ', 'seven gates', 'ประตูเจ็ดบาน', 'figure eight bastion', 'old town gate', 'ประตูเมืองเก่า', 'medieval fortification'], 'หาประตูโค้งที่ซ้อนกันเป็นแถวลึกเข้าไป', 'Find the arched gates lined up one behind the other',
    // a chunky round-cornered stone bastion with a tall tower with a pointed red roof, an arched gateway through which more arched gates are seen one behind another, a little gatekeeper's window, cobbles
    sky('#E3F2FD') + R(146, 20, 54, 110, '#FFE0B2', 0, 3) + P('M140 20l33-26 33 26z', '#D84315', 3) + R(166, 40, 14, 18, '#B3E5FC', 1, 2) + R(166, 76, 14, 18, '#B3E5FC', 1, 2)
      + P('M10 210V110c0-20 20-30 40-30h140c20 0 40 10 40 30v100z', '#D7CCC8', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M10 ${126 + k * 14}h220`, '#BCAAA4', 1.5)).join('') + Array.from({ length: 9 }, (_, k) => R(16 + k * 24, 70, 14, 12, '#D7CCC8', 0, 2.5)).join('')
      + [[72, 66], [62, 54], [52, 42], [44, 32]].map(([w, h], k) => P(`M${120 - w / 2} 210v-${h + 50}c0-${w / 2} ${w} -${w / 2} ${w} 0v${h + 50}z`, ['#5D4037', '#FFF8E1', '#5D4037', '#FFF8E1'][k], 3)).join('')
      + R(36, 140, 20, 16, '#B3E5FC', 1, 2) + P('M-4 210h248v34H-4z', '#BDBDBD', 3) + [[30, 224], [80, 232], [170, 226], [214, 234]].map(([x, y]) => E(x, y, 10, 5, '#9E9E9E', 1.5)).join('') + face(173, 112, 0.25)),
];

export default { places: {}, items };
