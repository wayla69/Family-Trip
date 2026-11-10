// Wave 9, the Americas (1): the United States (country layer), New York, California, Orlando, Hawaii, Canada (country layer) — one new idea per picture
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (us/newyork/landmark-oculus.v1.svg → us-newyork.landmark.oculus; us/orlando/… → p-orlando…)
const SCOPE = { 'us-orlando': 'p-orlando', 'us-yellowstone': 'p-yellowstone' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport): free-standing on a transparent ground
const K = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const steam = (x, y) => Lc(`M${x} ${y}c-6-8 6-14 0-22M${x + 14} ${y + 2}c-6-8 6-14 0-22`, '#B0BEC5', 3);
const palm = (x, y, h) => Lc(`M${x} ${y}c4-${h * 0.4}-2-${h * 0.7} 4-${h}`, '#6D4C41', 5) + [-26, -12, 0, 14, 28].map((dx) => Lc(`M${x + 4} ${y - h}q${dx * 0.6}-10 ${dx} ${8 - Math.abs(dx) * 0.1}`, '#2E7D32', 4)).join('');
const tree = (x, y, s, c = '#66BB6A') => g(x, y, s, Lc('M0 0v-20', '#6D4C41', 5) + C(0, -32, 18, c, 3));

const items = [
  // ---------- the United States (country layer)
  K('us', 'food', 'pbj', 'แซนด์วิชเนยถั่วกับแยม', 'A peanut butter and jelly sandwich', ['peanut butter and jelly', 'pb&j', 'แซนด์วิชเนยถั่ว', 'peanut butter', 'เนยถั่ว', 'grape jelly', 'แยมองุ่น', 'lunch box', 'กล่องข้าวกลางวัน', 'school lunch'],
    // a white sandwich cut corner to corner, each triangle showing a thick brown peanut butter layer and a purple grape jelly layer dripping over the crust, a jar of jelly behind, a smiling peanut in its shell beside it
    g(206, 150, 0.8, R(-26, -30, 52, 70, '#CE93D8', 10, 3.5) + R(-30, -42, 60, 16, '#8E24AA', 5, 3.5) + E(0, 6, 18, 14, '#F3E5F5', 0) + C(-6, 2, 4, '#8E24AA', 0) + C(6, 10, 4, '#8E24AA', 0) + C(8, -2, 4, '#8E24AA', 0))
      + P('M70 44h120v104z', '#E8B36A', 3.5) + P('M80 50h100v86z', '#FFFDF5', 0)
      + P('M140 74H30v104z', '#E8B36A', 3.5) + P('M128 80H38v90z', '#FFFDF5', 0)
      + [[0, 8, '#FFF8E1'], [8, 17, '#B07842'], [17, 25, '#8E24AA'], [25, 32, '#FFF8E1']].map(([a, b, c]) => P(`M140 ${74 + a}L30 ${178 + a}V${178 + b}L140 ${74 + b}z`, c, 2.5)).join('')
      + P('M62 174c0 12 8 12 8 0M100 138c0 14 8 14 8 0', '#8E24AA', 2.5) + face(58, 106, 0.42)
      + g(176, 212, 1, P('M-22-6c-4-14 10-22 22-12 12-10 26-2 22 12 4 14-10 22-22 12-12 10-26 2-22-12z', '#E0B07A', 3) + Lc('M-12-14c2 6 2 12 0 18M12-14c-2 6-2 12 0 18', '#B07842', 2) + face(0, -2, 0.28))),
  K('us', 'culture', 'mailbox', 'ตู้จดหมายหน้าบ้านชนบท', 'A country mailbox with its red flag up', ['mailbox', 'ตู้จดหมาย', 'rural mailbox', 'ตู้ไปรษณีย์หน้าบ้าน', 'red flag up', 'ธงแดง', 'letters', 'จดหมาย', 'countryside road', 'farm lane'],
    // a round-topped silver mailbox on a wooden post with its little red flag raised and its front door open showing envelopes, a bluebird sitting on top, sunflowers and grass at the foot of the post
    R(110, 120, 20, 100, '#A1673F', 3, 3.5) + P('M74 216c30-10 60-10 92 0', '#81C784', 3.5)
      + g(70, 196, 1, Lc('M0 20v-40', '#558B2F', 4) + C(0, -28, 14, '#FFCA28', 3) + C(0, -28, 6, '#6D4C41', 0)) + g(176, 200, 1, Lc('M0 16v-34', '#558B2F', 4) + C(0, -22, 11, '#FFCA28', 3) + C(0, -22, 5, '#6D4C41', 0))
      + P('M56 128V84c0-26 22-40 52-40h34v84z', '#B0BEC5', 3.5) + P('M142 44c26 0 44 14 44 40v44h-44z', '#CFD8DC', 3.5) + face(164, 90, 0.42)
      + P('M56 128l-26 10V96c0-22 14-34 26-38z', '#90A4AE', 3.5) + [[30, 108], [36, 98]].map(([x, y], k) => R(x + 6, y - 10 + k * 6, 30, 18, k ? '#FFF8E1' : '#E1F5FE', 2, 2.5) + P(`M${x + 6} ${y - 10 + k * 6}l15 10 15-10`, 'none', 2)).join('')
      + R(186, 66, 8, 40, '#E53935', 2, 3) + R(186, 54, 30, 18, '#E53935', 3, 3)
      + g(114, 36, 1, E(0, 0, 18, 12, '#42A5F5', 3) + C(14, -8, 9, '#42A5F5', 3) + P('M22-8l8 2-8 3z', '#FFB300', 2) + C(16, -10, 2, INK, 0) + E(-2, 4, 8, 5, '#FF8A65', 0) + Lc('M-18 2l-10 4', INK, 3))),
  K('us', 'culture', 'jackolantern', 'ฟักทองแกะหน้ายิ้มวันฮาโลวีน', 'A smiling jack-o\'-lantern in the pumpkin patch', ['jack-o-lantern', 'jack o lantern', 'ฟักทองแกะสลัก', 'halloween', 'ฮาโลวีน', 'pumpkin patch', 'ไร่ฟักทอง', 'trick or treat', 'หลอกหรือเลี้ยง', 'autumn hayride'],
    // a big round orange pumpkin with ribs and a curly green stem, carved with a friendly face (round eyes and a wide happy grin) glowing yellow inside, two little pumpkins and a hay bale beside it, a curling vine with leaves
    R(150, 150, 74, 46, '#F9D976', 6, 3.5) + Lc('M156 166h62M156 182h62', '#D4A82E', 2.5)
      + P('M30 214c40-8 140-8 190 0', 'none', 4) + Lc('M20 210c30-20 50 10 80-6', '#558B2F', 4) + P('M28 196c-14-6-12-22 4-20 8-10 22 0 14 12z', '#7CB342', 3)
      + g(108, 136, 1, E(-38, 8, 34, 58, '#FB8C00', 3.5) + E(38, 8, 34, 58, '#FB8C00', 3.5) + E(0, 8, 42, 62, '#FFA726', 3.5) + P('M-6-52c-2-16 4-26 14-30l6 6c-8 4-10 12-8 24z', '#558B2F', 3)
        + P('M8-60c14-12 30-6 30 6', 'none', 3) + C(-22, -6, 11, '#FFEB3B', 3) + C(22, -6, 11, '#FFEB3B', 3) + C(-22, -6, 4, '#E65100', 0) + C(22, -6, 4, '#E65100', 0)
        + P('M-34 18c14 28 54 28 68 0-10 6-20 4-24 2l-6 10-6-10-6 10-6-10c-6 2-14 4-20-2z', '#FFEB3B', 3) + E(-46, 18, 8, 5, '#FF8FA3', 0) + E(46, 18, 8, 5, '#FF8FA3', 0))
      + g(190, 202, 1, E(0, 0, 26, 18, '#FB8C00', 3) + Lc('M0-16v-8', '#558B2F', 4) + face(0, -2, 0.3)) + g(40, 208, 1, E(0, 0, 18, 13, '#FFB74D', 3) + Lc('M0-11v-6', '#558B2F', 4))),
  K('us', 'animal', 'prairiedog', 'แพรรีด็อกยืนเฝ้ารูบนทุ่งหญ้า', 'A prairie dog standing guard by its burrow', ['prairie dog', 'แพรรีด็อก', 'burrow', 'โพรงดิน', 'great plains', 'ทุ่งหญ้าแพรรี', 'badlands', 'แบดแลนด์', 'south dakota', 'standing on hind legs'],
    // a chubby tan prairie dog standing upright on a dirt mound with its little paws held to its chest, a second one peeking out of the burrow hole, tufts of prairie grass and a blue sky with a cloud
    E(120, 212, 100, 22, '#C8A27A', 3.5) + E(70, 206, 30, 9, '#4E342E', 3) + g(70, 196, 1, P('M-20 10c0-26 40-26 40 0z', '#D7A86E', 3) + C(-8, -2, 3, INK, 0) + C(8, -2, 3, INK, 0) + E(0, 4, 3, 2, INK, 0))
      + [[20, 200], [200, 196], [222, 206]].map(([x, y]) => Lc(`M${x} ${y}l-6-22M${x} ${y}l2-26M${x} ${y}l8-20`, '#7CB342', 3)).join('')
      + g(138, 120, 1, E(0, 40, 38, 52, '#D7A86E', 3.5) + E(0, 50, 22, 32, '#F1D9B5', 0) + C(0, -20, 30, '#D7A86E', 3.5) + E(-22, -44, 7, 6, '#C08850', 3) + E(22, -44, 7, 6, '#C08850', 3)
        + E(0, -8, 14, 10, '#F1D9B5', 0) + face(0, -24, 0.55, 'w') + C(0, -16, 3.5, '#6D4C41', 0)
        + P('M-14 20c-8 6-10 16-2 18 6 0 10-8 12-14M14 20c8 6 10 16 2 18-6 0-10-8-12-14', '#C08850', 3) + E(-18, 92, 12, 6, '#C08850', 3) + E(18, 92, 12, 6, '#C08850', 3) + P('M30 70c20 4 26 18 18 26', '#C08850', 3.5))),
  // ---------- New York
  L('us/newyork/landmark-parachutejump.v1.svg', 'หอพาราชูตจัมป์ที่โคนีย์ไอแลนด์', 'The red Parachute Jump tower at Coney Island', ['parachute jump', 'พาราชูตจัมป์', 'coney island', 'โคนีย์ไอแลนด์', 'riegelmann boardwalk', 'บอร์ดวอล์กริมทะเล', 'brooklyn beach', 'ชายหาดบรูคลิน', 'steel tower', 'old amusement park'], 'หาหอเหล็กสีแดงที่ข้างบนกางออกเหมือนร่ม', 'Find the red steel tower that opens out like an umbrella at the top',
    // a tall red steel lattice tower narrowing upwards, topped by a wide round crown of spokes like an open umbrella with little parachutes hanging from its tips, a wooden boardwalk and sandy beach with the sea below
    sky('#BBDEFB') + P('M-4 176h248v24H-4z', '#4FC3F7', 3) + P('M-4 196h248v48H-4z', '#FFE0A3', 3) + R(-4, 200, 248, 12, '#B5835A', 0, 3) + [20, 60, 100, 140, 180, 220].map((x) => Lc(`M${x} 200v12`, '#8D6E63', 2)).join('')
      + P('M92 202L112 66h16l20 136', 'none', 0) + Lc('M92 202L112 66M148 202L128 66', '#E53935', 7) + Lc('M92 202L112 66M148 202L128 66', INK, 1.5)
      + [80, 108, 136, 164].map((y, k) => { const w = 18 - k * 1; const xl = 92 + (202 - y) * 0.147, xr = 148 - (202 - y) * 0.147; return Lc(`M${xl} ${y}L${xr} ${y + 28}M${xr} ${y}L${xl} ${y + 28}`, '#EF5350', 3) + (w ? '' : ''); }).join('')
      + P('M50 60c30-20 110-20 140 0z', '#EF5350', 3.5) + [54, 76, 98, 120, 142, 164, 186].map((x) => Lc(`M120 44L${x} 60`, '#C62828', 2.5)).join('') + R(112, 36, 16, 10, '#E53935', 2, 3) + face(120, 52, 0.3, 'none')
      + [[54, 70, '#FFEB3B'], [186, 74, '#4FC3F7']].map(([x, y, c]) => Lc(`M${x} 60v${y - 60}`, INK, 1.5) + P(`M${x - 12} ${y + 10}c0-14 24-14 24 0z`, c, 2.5) + Lc(`M${x - 12} ${y + 10}l12 12 12-12`, INK, 1.5)).join('')
      + kid(46, 196, '#26A69A')),
  L('us/newyork/landmark-watertowers.v1.svg', 'ถังน้ำไม้บนหลังคาตึกนิวยอร์ก', 'Wooden water tanks on the rooftops', ['rooftop water tower', 'ถังน้ำบนหลังคา', 'wooden water tank', 'ถังน้ำไม้', 'manhattan rooftops', 'หลังคาตึกแมนฮัตตัน', 'brooklyn roofs', 'tenement building', 'ตึกแถวอิฐ', 'cedar barrel'], 'หาถังไม้หลังคาแหลมที่ยืนบนขาเหล็กบนดาดฟ้า', 'Find the wooden barrel with a pointy hat standing on iron legs on the roof',
    // two flat brick rooftops at different heights, each with a round wooden water tank of vertical staves with metal bands and a pointed conical roof standing on a little steel frame, a ladder up the side, tall towers in the distance, a smiling tank
    sky('#FFE0B2') + [[10, 60, 30], [44, 30, 26], [180, 50, 28], [210, 20, 30]].map(([x, h, w]) => R(x, 120 - h, w, 130, '#B0BEC5', 0, 2.5)).join('')
      + R(-4, 160, 130, 90, '#C0694E', 0, 3.5) + R(118, 186, 130, 60, '#A1887F', 0, 3.5) + [0, 1, 2].map((r) => [0, 1, 2].map((k) => R(14 + k * 36, 176 + r * 22, 16, 14, '#FFF59D', 2, 2)).join('')).join('') + R(-4, 156, 130, 8, '#8D4A36', 0, 3)
      + g(64, 128, 1, Lc('M-24 30v-8M24 30v-8M-24 22h48M-24 30l48-8', INK, 3) + R(-30, -30, 60, 52, '#C49A6C', 4, 3.5) + [-15, 0, 15].map((x) => Lc(`M${x} -28v48`, '#A0764A', 2)).join('') + Lc('M-30-14h60M-30 8h60', '#5D4037', 3) + P('M-34-30l34-30 34 30z', '#6D4C41', 3.5) + face(0, -8, 0.36) + Lc('M30-20v50M38-20v50M30-6h8M30 8h8M30 22h8', INK, 2))
      + g(188, 160, 0.78, Lc('M-24 30v-8M24 30v-8M-24 22h48', INK, 3) + R(-30, -30, 60, 52, '#B08A60', 4, 3.5) + [-15, 0, 15].map((x) => Lc(`M${x} -28v48`, '#8D6E4A', 2)).join('') + Lc('M-30-14h60M-30 8h60', '#5D4037', 3) + P('M-34-30l34-30 34 30z', '#5D4037', 3.5))),
  L('us/newyork/landmark-knish.v1.svg', 'คนิชขนมอบไส้มันฝรั่งของนิวยอร์ก', 'A warm New York potato knish', ['knish', 'คนิช', 'potato knish', 'ขนมอบไส้มันฝรั่ง', 'lower east side', 'โลเวอร์อีสต์ไซด์', 'street cart snack', 'ของกินรถเข็น', 'jewish bakery', 'baked dumpling'], 'หาก้อนแป้งอบสีทองที่ข้างในเป็นมันฝรั่งนุ่มๆ', 'Find the golden baked bun with soft mashed potato inside',
    // a big round golden-brown baked knish on a sheet of wax paper, its top twisted like a little knot, one knish cut in half showing creamy yellow mashed potato with flecks of onion, curls of steam, a smile on the whole one
    E(120, 196, 96, 24, '#FFF8E1', 3) + P('M30 196l20-14M200 194l-16-12', 'none', 2)
      + g(96, 140, 1, P('M-52 40c-12-40 8-74 52-74s64 34 52 74c-20 14-84 14-104 0z', '#D9963F', 3.5) + E(0, -32, 18, 9, '#B9762A', 3) + P('M-10-34c4-8 16-8 20 0', 'none', 2.5) + Lc('M-40 10c10 6 70 6 80 0', '#B9762A', 2.5) + face(0, 6, 0.5))
      + g(176, 166, 1, P('M-34 26c-6-26 4-48 34-48s40 22 34 48z', '#D9963F', 3.5) + P('M-26 22c-4-18 4-34 26-34s30 16 26 34z', '#FFE082', 2.5) + [[-10, 4], [8, -4], [2, 14], [14, 10]].map(([x, y]) => E(x, y, 3, 2, '#C5A35A', 0)).join(''))
      + steam(80, 80) + steam(170, 116)),
  L('us/newyork/landmark-oculus.v1.svg', 'โอคูลัสอาคารปีกขาวที่เวิลด์เทรดเซ็นเตอร์', 'The Oculus, the white winged station', ['oculus', 'โอคูลัส', 'world trade center station', 'สถานีเวิลด์เทรดเซ็นเตอร์', 'white ribs', 'โครงซี่ขาว', 'transportation hub', 'lower manhattan', 'ดาวน์ทาวน์แมนฮัตตัน', 'wings building'], 'หาตึกสีขาวที่มีซี่โครงยาวกางออกเหมือนปีกนก', 'Find the white building whose long ribs spread out like a bird\'s wings',
    // a long low white oval hall with a glass skylight spine, rows of white steel ribs curving up and outwards on both sides like a bird lifting its wings, glass towers rising behind, a plaza with little trees in front
    sky('#B3E5FC') + R(20, 30, 40, 180, '#90CAF9', 0, 3) + R(172, 10, 46, 200, '#64B5F6', 0, 3) + [50, 80, 110, 140, 170].map((y) => Lc(`M24 ${y}h32M176 ${y}h38`, '#E3F2FD', 2.5)).join('')
      + P('M-4 206h248v40H-4z', '#CFD8DC', 3) + E(120, 196, 84, 18, '#FAFAFA', 3.5) + Lc('M40 196h160', '#B0BEC5', 2)
      + [0, 1, 2, 3, 4, 5].map((k) => { const x = 66 + k * 9; const h = 70 + k * 18; return P(`M${x} 190c-10-${h * 0.4}-30-${h * 0.8}-${44 - k * 4}-${h}`, 'none', 0) + Lc(`M${x} 190c-10-${h * 0.4}-30-${h * 0.8}-${44 - k * 4}-${h}`, INK, 8) + Lc(`M${x} 190c-10-${h * 0.4}-30-${h * 0.8}-${44 - k * 4}-${h}`, '#FFFFFF', 4.5) + Lc(`M${240 - x} 190c10-${h * 0.4} 30-${h * 0.8} ${44 - k * 4}-${h}`, INK, 8) + Lc(`M${240 - x} 190c10-${h * 0.4} 30-${h * 0.8} ${44 - k * 4}-${h}`, '#FFFFFF', 4.5); }).join('')
      + face(120, 172, 0.36) + tree(30, 224, 0.5) + tree(210, 224, 0.5)),
  // ---------- California
  L('us/california/landmark-sailingstones.v1.svg', 'หินเคลื่อนที่ได้ที่เรซแทร็กเพลยา', 'The sliding stones of Racetrack Playa', ['racetrack playa', 'เรซแทร็กเพลยา', 'sailing stones', 'หินเคลื่อนที่ได้', 'death valley', 'เดธแวลลีย์', 'dry lake bed', 'ทะเลสาบแห้ง', 'cracked mud', 'stone trails'], 'หาก้อนหินที่ทิ้งรอยลากยาวไว้ข้างหลัง', 'Find the rocks that leave long trails behind them',
    // a flat pale dry lake bed cracked into little polygon tiles stretching to brown mountains, three round rocks each with a long wiggly groove trailing behind it across the mud, one rock with a smiling face
    sky('#FFE0B2') + P('M-4 96l40-30 30 18 40-34 40 30 34-20 64 36v30H-4z', '#A1887F', 3.5) + P('M-4 112h248v136H-4z', '#F3E5C8', 3.5)
      + [[20, 130, 40, 150, 30, 176, 60, 190], [90, 128, 120, 150, 100, 178], [160, 132, 196, 148, 180, 172, 220, 186], [40, 210, 80, 222], [140, 206, 176, 230]].map((pts) => Lc(`M${pts[0]} ${pts[1]}` + pts.slice(2).reduce((a, v, i) => a + (i % 2 ? `${v}` : ` L${v} `), ''), '#D7C29E', 2.5)).join('')
      + Lc('M40 134c20 20 10 40 40 60', '#8D7A5B', 4) + Lc('M150 130c-4 30 20 40 14 74', '#8D7A5B', 4) + Lc('M200 140c-10 12-6 24-20 36', '#8D7A5B', 4)
      + g(84, 198, 1, E(0, 0, 22, 14, '#795548', 3.5) + face(0, -2, 0.36)) + g(166, 208, 1, E(0, 0, 18, 11, '#8D6E63', 3.5)) + g(176, 180, 1, E(0, 0, 12, 8, '#6D4C41', 3))),
  L('us/california/landmark-hearstcastle.v1.svg', 'ปราสาทเฮิร์สต์และสระเนปจูน', 'Hearst Castle and its Neptune Pool', ['hearst castle', 'ปราสาทเฮิร์สต์', 'neptune pool', 'สระเนปจูน', 'san simeon', 'ซานซิมีออน', 'hilltop mansion', 'คฤหาสน์บนเขา', 'big sur coast', 'zebras on the hill'], 'หาตึกขาวที่มียอดหอคอยคู่กับสระน้ำสีฟ้ามีเสาล้อม', 'Find the white house with twin towers and a blue pool ringed by columns',
    // a white Spanish-style hilltop mansion with two tall ornate bell towers with tiled caps and a carved front, on a green hill with cypress trees, in front a long bright blue pool edged by white columns and a little temple front
    sky('#B3E5FC') + P('M-4 150c40-30 90-40 124-40s90 10 124 40v100H-4z', '#81C784', 3.5)
      + g(120, 92, 1, R(-46, -10, 92, 66, '#FAF3E6', 0, 3.5) + [-30, 30].map((x) => R(x - 14, -64, 28, 60, '#FAF3E6', 0, 3.5) + P(`M${x - 18} -64l18-24 18 24z`, '#4FC3F7', 3) + R(x - 7, -50, 14, 16, '#5D4037', 6, 2.5) + R(x - 5, -26, 10, 12, '#90A4AE', 3, 2)).join('')
        + P('M-14 56v-30c0-18 28-18 28 0v30z', '#8D6E63', 3) + P('M-46-10l46-20 46 20z', '#E57373', 3) + face(0, 4, 0.3))
      + Lc('M30 152c-4-30 4-50 0-60M210 150c4-30-4-50 0-60', '#2E7D32', 9)
      + P('M14 178h212v44H14z', '#E0E0E0', 3) + R(24, 186, 192, 30, '#29B6F6', 4, 3) + Lc('M40 200q20-6 40 0t40 0 40 0 40 0', '#B3E5FC', 3)
      + [28, 60, 180, 212].map((x) => R(x - 3, 150, 6, 32, '#FFFFFF', 0, 2.5)).join('') + P('M20 150h52M168 150h52', 'none', 3) + R(22, 146, 54, 6, '#FFFFFF', 1, 2.5) + R(164, 146, 54, 6, '#FFFFFF', 1, 2.5)
      + P('M100 178v-26h40v26z', '#FFFFFF', 3) + P('M96 152l24-14 24 14z', '#FFFFFF', 3)),
  L('us/california/landmark-missionbell.v1.svg', 'ระฆังริมทางเอลกามีโนเรอัล', 'An El Camino Real mission bell by the road', ['el camino real', 'เอลกามีโนเรอัล', 'mission bell', 'ระฆังมิชชัน', 'california missions', 'มิชชันแคลิฟอร์เนีย', 'royal road', 'highway 101', 'adobe arches', 'roadside marker'], 'หาระฆังที่ห้อยอยู่บนเสาโค้งเหมือนไม้เท้า', 'Find the bell hanging from a pole curved like a shepherd\'s crook',
    // a green post curving over at the top like a shepherd's crook with a bronze bell hanging from the hook, by a sunny road, behind it a white adobe mission building with a red tile roof and a row of round arches, orange poppies at the roadside
    sky('#FFF3E0') + P('M-4 120h248v130H-4z', '#E6C79C', 0) + R(-4, 96, 160, 74, '#FAF3E6', 0, 3.5) + P('M-8 98l84-26 84 26z', '#D84315', 3.5) + [10, 44, 78, 112].map((x) => P(`M${x} 170v-26c0-14 24-14 24 0v26z`, '#BCAAA4', 3)).join('') + P('M132 98v-30h22v30', '#FAF3E6', 3) + R(136, 74, 14, 14, '#5D4037', 6, 2.5)
      + P('M-4 190c80-10 170-10 248 0v60H-4z', '#9E9E9E', 3.5) + Lc('M-4 214c80-6 170-6 248 0', '#FFEE58', 4)
      + Lc('M186 186V56c0-28 -40-28 -40 0v8', '#2E7D32', 8) + Lc('M186 186V56c0-28 -40-28 -40 0v8', INK, 1.2)
      + g(146, 98, 1, P('M-26 24c0-30 8-44 26-44s26 14 26 44z', '#C68A3A', 3.5) + R(-30, 22, 60, 8, '#A86E22', 3, 3) + C(0, 34, 6, '#A86E22', 3) + face(0, 2, 0.36))
      + [[20, 182], [44, 186], [214, 180]].map(([x, y]) => Lc(`M${x} ${y + 10}v-12`, '#558B2F', 3) + C(x, y - 4, 7, '#FF7043', 2.5)).join('')),
  L('us/california/landmark-kelpforest.v1.svg', 'ป่าสาหร่ายเคลป์ใต้ทะเลมอนเทอเรย์', 'The underwater kelp forest of Monterey Bay', ['kelp forest', 'ป่าสาหร่ายเคลป์', 'monterey bay', 'อ่าวมอนเทอเรย์', 'giant kelp', 'สาหร่ายยักษ์', 'garibaldi fish', 'ปลาการิบัลดี', 'la jolla cove', 'sea urchin'], 'หาปลาสีส้มสดตัวเดียวที่ว่ายอยู่ระหว่างสาหร่ายสูง', 'Find the one bright orange fish swimming between the tall seaweed',
    // a blue-green underwater scene with sunbeams slanting down, tall wavy golden-brown kelp stalks with leaf blades and round floats rising from rocks, a bright orange garibaldi fish with a face, a purple sea urchin and a sea star on the rocky floor
    sky('#4DB6AC') + [30, 90, 150].map((x) => P(`M${x} -4l40 0-60 250h-20z`, '#80CBC4', 0)).join('')
      + [[30, 0], [80, 14], [196, 6], [220, 20]].map(([x, d]) => Lc(`M${x} 230c-14-40 14-70 0-110s14-70 0-${120 - d}`, '#8D6E3A', 6) + [60, 110, 160].map((y) => P(`M${x + (y % 100 ? 2 : -2)} ${y - d * 0.3}c14-6 22 2 24 10-12 2-20-2-24-10z`, '#B8913F', 2.5) + C(x, y + 14 - d * 0.3, 4, '#C9A44A', 2)).join('')).join('')
      + P('M-4 226c40-20 80-6 120-16s90-8 128 4v30H-4z', '#78909C', 3.5) + g(150, 216, 1, C(0, 0, 13, '#7E57C2', 3) + [0, 45, 90, 135, 180].map((a) => Lc(`M0 0l${Math.round(Math.cos(a * Math.PI / 180) * 22)} ${-Math.round(Math.sin(a * Math.PI / 180) * 22)}`, '#7E57C2', 3)).join(''))
      + g(56, 222, 1, P('M0-16l5 10 11 1-8 7 3 11-11-6-11 6 3-11-8-7 11-1z', '#FF8A65', 2.5))
      + g(126, 116, 1, P('M-36 0c10-26 50-30 66-6l18-14v40l-18-14c-16 24-56 20-66-6z', '#FF6F00', 3.5) + P('M-6-18c8-8 18-8 26 0', 'none', 2.5) + face(-12, -2, 0.36) + P('M-6 18l10 10 6-12', '#FF8F00', 2.5))),
  L('us/california/landmark-sourdoughcrab.v1.svg', 'ขนมปังซาวร์โดว์รูปปู', 'A crab-shaped sourdough loaf at the wharf', ['sourdough bread', 'ขนมปังซาวร์โดว์', 'crab-shaped bread', 'ขนมปังรูปปู', 'fisherman\'s wharf', 'ฟิชเชอร์แมนส์วาร์ฟ', 'bakery window', 'ร้านเบเกอรี', 'san francisco bakery', 'animal bread'], 'หาขนมปังที่มีก้ามและขาเหมือนปู', 'Find the bread with claws and legs like a crab',
    // a golden crusty loaf baked in the shape of a crab, a round domed body with flour-dusted slashes, two big pincer claws and four little legs each side, standing on a wooden board, a round sourdough loaf behind with a cross cut, the crab loaf smiling
    g(170, 92, 1, E(0, 0, 40, 30, '#D9963F', 3.5) + Lc('M-24-6l48 12M-24 6l48-12', '#F3E1B8', 3)) + R(16, 176, 208, 26, '#A1673F', 8, 3.5) + Lc('M30 189h180', '#8D5A33', 2)
      + g(116, 140, 1, [-1, 1].map((s) => [0, 1, 2, 3].map((k) => Lc(`M${s * 40} ${4 + k * 8}l${s * 22} ${8 + k * 2}l${s * 4} 10`, '#C88435', 7)).join('') + P(`M${s * 34}-18l${s * 24}-24c${s * 8}-12 ${s * 28}-10 ${s * 30} 4l${-s * 14} 4 ${s * 12} 6c${-s * 8} 12 ${-s * 26} 10 ${-s * 34}-4z`, '#D9963F', 3.5)).join('')
        + E(0, 6, 50, 34, '#E0A34C', 3.5) + Lc('M-30-10l12 10M-6-18l10 10M18-12l12 10', '#F7E6C2', 3.5) + face(0, 10, 0.45)
        + [-12, 12].map((x) => Lc(`M${x}-26l${x / 4}-12`, '#C88435', 4) + C(x + x / 4, -40, 4, '#E0A34C', 2.5)).join(''))),
  // ---------- Orlando
  L('us/orlando/landmark-shortcake.v1.svg', 'สตรอว์เบอร์รีชอร์ตเค้กจากเพลนต์ซิตี', 'A Plant City strawberry shortcake', ['strawberry shortcake', 'สตรอว์เบอร์รีชอร์ตเค้ก', 'plant city', 'เพลนต์ซิตี', 'florida strawberry festival', 'เทศกาลสตรอว์เบอร์รี', 'strawberry picking', 'เก็บสตรอว์เบอร์รี', 'whipped cream', 'winter strawberries'], 'หาขนมปังกรอบที่มีวิปครีมกับสตรอว์เบอร์รีหั่นอยู่ตรงกลาง', 'Find the split biscuit with whipped cream and strawberry slices in the middle',
    // a golden round biscuit split in two on a plate, the bottom half piled with sliced red strawberries and their juice, a fluffy cloud of whipped cream, the top half perched on it with a whole strawberry on top, more berries on the plate, a face on the biscuit
    E(120, 196, 98, 26, '#E1F5FE', 3.5) + E(120, 192, 80, 18, '#FFFFFF', 0)
      + g(120, 150, 1, P('M-60 30c-4-20 10-30 60-30s64 10 60 30c-20 10-100 10-120 0z', '#E8B36A', 3.5) + face(0, 18, 0.36)
        + [-44, -22, 0, 22, 44].map((x, k) => P(`M${x - 12} ${2 - (k % 2) * 4}c0-12 24-12 24 0l-12 10z`, '#E53935', 2.5)).join('')
        + P('M-56-4c-10-16 6-26 16-20 4-16 24-18 30-6 8-14 30-10 30 4 14-6 30 4 22 22z', '#FFFDE7', 3.5)
        + P('M-50-24c-4-20 14-34 50-34s54 14 50 34c-16 8-84 8-100 0z', '#EBBE7A', 3.5) + Lc('M-30-46c10-6 40-6 60 0', '#F7DEB0', 3))
      + g(122, 74, 1, P('M-14 4c-6-16 6-26 14-26s20 10 14 26c-4 10-24 10-28 0z', '#E53935', 3) + P('M-10-20l10 6 10-6-4 8h-12z', '#43A047', 2.5) + [[-6, -4], [4, 2], [-2, 8], [6, -8]].map(([x, y]) => C(x, y, 1.4, '#FFEB3B', 0)).join(''))
      + [[44, 200], [196, 202]].map(([x, y]) => g(x, y, 0.7, P('M-14 4c-6-16 6-26 14-26s20 10 14 26c-4 10-24 10-28 0z', '#E53935', 3) + P('M-10-20l10 6 10-6-4 8h-12z', '#43A047', 2.5))).join('')),
  L('us/orlando/landmark-spookhill.v1.svg', 'สปุกฮิลล์ เนินที่รถไหลขึ้นเอง', 'Spook Hill, where cars roll uphill', ['spook hill', 'สปุกฮิลล์', 'gravity hill', 'เนินแรงโน้มถ่วง', 'lake wales', 'เลกเวลส์', 'car rolls uphill', 'รถไหลขึ้นเนิน', 'optical illusion', 'ภาพลวงตา'], 'หารถที่ไหลถอยหลังขึ้นเนินโดยไม่ได้ติดเครื่อง', 'Find the car rolling backwards up the hill all by itself',
    // a country road dipping and rising through orange groves and moss-hung oaks, a little blue car rolling backwards up the slope with swoosh lines and a surprised face, a friendly little ghost peeking from behind a tree, a white road marker painted on the road
    sky('#E1F5FE') + P('M-4 140c40-10 80 0 120 10s90-30 128-50v150H-4z', '#9CCC65', 3.5)
      + g(30, 142, 1, Lc('M0 0v-30', '#6D4C41', 6) + E(0, -44, 30, 20, '#558B2F', 3) + Lc('M-14-34v18M8-32v14', '#B0BEC5', 2)) + [[200, 96], [218, 104]].map(([x, y]) => g(x, y, 0.5, Lc('M0 10v-14', '#6D4C41', 4) + C(0, -16, 14, '#43A047', 3) + C(-5, -18, 3, '#FB8C00', 0) + C(6, -12, 3, '#FB8C00', 0))).join('')
      + P('M-4 206c50-14 90-20 130-20s80-30 118-60v30c-38 30-78 54-118 56s-80 10-130 24z', '#78909C', 3.5) + Lc('M30 210l20-4M80 200l20-3', '#FFFFFF', 3)
      + g(150, 156, 1, P('M-30 4l4-16c2-6 6-8 12-8h22c6 0 10 2 14 8l8 14z', '#42A5F5', 3.5) + R(-34, 2, 72, 16, '#1E88E5', 6, 3.5) + P('M-18-8h12v10h-16zM2-8h12l6 10H2z', '#E1F5FE', 2) + C(-18, 20, 8, '#37474F', 3) + C(22, 16, 8, '#37474F', 3) + face(2, 8, 0.26, 'o'), -16)
      + Lc('M196 120l20-8M200 132l22-8M204 144l18-6', '#90A4AE', 3)
      + g(56, 150, 1, P('M-14 22v-30c0-20 28-20 28 0v30l-5-6-5 6-4-6-5 6z', '#FFFFFF', 3) + C(-5, -6, 2.5, INK, 0) + C(5, -6, 2.5, INK, 0) + E(0, 2, 3, 3.5, INK, 0))),
  L('us/orlando/landmark-astronauticecream.v1.svg', 'ไอศกรีมนักบินอวกาศแบบแห้ง', 'Freeze-dried astronaut ice cream', ['astronaut ice cream', 'ไอศกรีมนักบินอวกาศ', 'freeze-dried ice cream', 'ไอศกรีมแห้ง', 'kennedy space center', 'ศูนย์อวกาศเคนเนดี', 'space food', 'อาหารอวกาศ', 'space coast', 'neapolitan block'], 'หาก้อนไอศกรีมสามสีที่กรอบแห้งไม่ละลาย', 'Find the crunchy three-coloured ice cream block that never melts',
    // a silver foil pouch torn open, a crunchy block of freeze-dried ice cream sticking out in three stripes (pink strawberry, white vanilla, brown chocolate) with crumbs floating around it as if weightless, little stars and a ringed planet behind, a face on the block
    sky('#283593') + [[30, 40], [200, 30], [60, 200], [210, 190], [180, 110], [24, 130]].map(([x, y]) => P(`M${x} ${y - 7}l2 5 5 2-5 2-2 5-2-5-5-2 5-2z`, '#FFF59D', 0)).join('')
      + g(190, 60, 1, C(0, 0, 18, '#FFB74D', 3) + E(0, 0, 32, 7, 'none', 3) + Lc('M-30 2c10 6 50 6 60-4', '#FFE0B2', 2.5))
      + g(110, 140, 1, P('M-50 0l8 70h84l8-70-14 8-14-10-14 10-14-10-14 10-14-10z', '#CFD8DC', 3.5) + Lc('M-34 30l6 30M30 20l-4 40', '#ECEFF1', 3)
        + R(-36, -70, 24, 76, '#F48FB1', 3, 3.5) + R(-12, -70, 24, 76, '#FFF8E1', 0, 3.5) + R(12, -70, 24, 76, '#6D4C41', 3, 3.5) + [[-24, -50], [0, -30], [24, -56], [-28, -20]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('') + face(0, -36, 0.4))
      + [[40, 80, '#F48FB1'], [176, 120, '#6D4C41'], [56, 116, '#FFF8E1'], [168, 160, '#F48FB1']].map(([x, y, c]) => R(x, y, 10, 8, c, 2, 2.5)).join('')),
  L('us/orlando/landmark-boiledpeanuts.v1.svg', 'ถั่วลิสงต้มริมทางของฟลอริดา', 'A roadside pot of boiled peanuts', ['boiled peanuts', 'ถั่วลิสงต้ม', 'roadside stand', 'แผงขายริมทาง', 'southern snack', 'ของกินภาคใต้สหรัฐ', 'cajun peanuts', 'florida backroads', 'ถนนชนบทฟลอริดา', 'paper bag of peanuts'], 'หาหม้อใบใหญ่ที่มีถั่วลิสงทั้งเปลือกเดือดอยู่', 'Find the big pot bubbling with peanuts still in their shells',
    // a tin-roofed roadside stand with a sign board painted only with a big peanut, a large steel pot of steaming salty water full of peanuts in their shells over a flame, a paper cup brimming with wet peanuts at the front, the pot smiling
    sky('#FFE0B2') + P('M-4 196h248v48H-4z', '#C8A27A', 3) + P('M20 60h200l10 20H10z', '#B0BEC5', 3.5) + R(28, 80, 8, 116, '#8D6E63', 2, 3) + R(204, 80, 8, 116, '#8D6E63', 2, 3)
      + R(150, 90, 54, 36, '#FFF8E1', 4, 3) + g(177, 108, 1, P('M-16-4c-4-10 8-14 16-8 8-6 20-2 16 8 4 10-8 14-16 8-8 6-20 2-16-8z', '#E0B07A', 2.5))
      + g(96, 160, 1, P('M-12 34l-8 12M12 34l8 12M0 34v12', 'none', 3) + P('M-20 42c4-12 10-10 12-2 4-14 12-14 14 0 4-8 10-8 14 2z', '#FF7043', 2.5)
        + P('M-50-30h100l-6 64c-20 8-68 8-88 0z', '#B0BEC5', 3.5) + E(0, -30, 50, 12, '#8D9A7A', 3.5) + [[-30, -32], [-12, -28], [8, -34], [26, -28], [-2, -24]].map(([x, y]) => E(x, y, 8, 4.5, '#D6A66E', 2)).join('') + R(-58, -22, 10, 6, '#78909C', 2, 2.5) + R(48, -22, 10, 6, '#78909C', 2, 2.5) + face(0, 6, 0.42))
      + steam(78, 100) + steam(106, 96)
      + g(178, 190, 1, P('M-18-20h36l-6 38h-24z', '#FFFFFF', 3) + Lc('M-16-10h32', '#E53935', 3) + [[-8, -22], [6, -24], [-2, -28]].map(([x, y]) => E(x, y, 8, 5, '#C9955D', 2)).join(''))),
  L('us/orlando/landmark-swampbuggy.v1.svg', 'รถสแวมป์บักกีล้อยักษ์ลุยหนองน้ำ', 'A big-wheeled swamp buggy splashing through the marsh', ['swamp buggy', 'รถสแวมป์บักกี', 'giant tyres', 'ล้อยักษ์', 'florida swamp', 'หนองน้ำฟลอริดา', 'everglades ride', 'cypress swamp', 'ป่าไซเปรส', 'marsh safari'], 'หารถคันสูงที่มีล้อใหญ่กว่าคนลุยน้ำอยู่', 'Find the tall truck with wheels bigger than people driving through the water',
    // a tall open buggy with a platform of bench seats and a striped canopy perched on four huge knobbly tyres, ploughing through brown-green swamp water with splashes, cypress trees with knees and hanging moss behind, children on the seats, a face on the front
    sky('#DCEDC8') + [[24, 40], [70, 56], [206, 36]].map(([x, h]) => Lc(`M${x} 170v-${h + 60}`, '#6D4C41', 7) + E(x, 110 - h, 26, 14, '#689F38', 3) + Lc(`M${x - 10} ${116 - h}v18M${x + 8} ${116 - h}v14`, '#B0BEC5', 2)).join('')
      + P('M-4 176h248v68H-4z', '#7A8F5C', 3.5) + Lc('M10 196q12-6 24 0M190 206q12-6 24 0', '#A5B98A', 3)
      + g(120, 150, 1, P('M-66-60h132l-8-12H-58z', '#FFB300', 3) + [-52, -26, 0, 26].map((x) => R(x, -72, 13, 12, '#FFFFFF', 0, 0)).join('') + Lc('M-60-60v40M60-60v40', INK, 3)
        + kid(-28, -18, '#EF5350', 0.9) + kid(4, -18, '#42A5F5', 0.9) + kid(34, -18, '#AB47BC', 0.9)
        + R(-74, -20, 148, 26, '#2E7D32', 4, 3.5) + face(54, -8, 0.3)
        + [-50, 50].map((x) => C(x, 36, 30, '#37474F', 3.5) + C(x, 36, 12, '#90A4AE', 3) + [0, 60, 120, 180, 240, 300].map((a) => C(x + Math.round(Math.cos(a * Math.PI / 180) * 30), 36 + Math.round(Math.sin(a * Math.PI / 180) * 30), 4, '#37474F', 0)).join('')).join(''))
      + P('M30 214c-10-14 0-26 10-18 0-14 16-16 18-2M182 214c10-14 0-26-10-18 0-14-16-16-18-2', '#B3E5FC', 3)),
  // ---------- Hawaii
  L('us/hawaii/landmark-iolanipalace.v1.svg', 'พระราชวังอิโอลานี', 'ʻIolani Palace in Honolulu', ['iolani palace', 'พระราชวังอิโอลานี', 'royal palace', 'วังของกษัตริย์ฮาวาย', 'downtown honolulu', 'ใจกลางโฮโนลูลู', 'hawaiian kingdom', 'อาณาจักรฮาวาย', 'verandas', 'coronation pavilion'], 'หาวังสองชั้นที่มีระเบียงยาวและหอคอยตรงกลาง', 'Find the two-storey palace with long verandas and a tower in the middle',
    // a grand two-storey palace in cream and grey with long arched verandas on both floors, a taller square central tower and corner towers with dark curved roofs, wide front steps, a round domed pavilion on the lawn and two palm trees
    sky('#B3E5FC') + P('M-4 190h248v54H-4z', '#81C784', 3.5) + palm(16, 200, 120) + palm(212, 204, 110)
      + g(120, 128, 1, R(-84, -30, 168, 80, '#F5E6C8', 0, 3.5) + [-60, 60].map((x) => R(x - 18, -60, 36, 110, '#EFDDB8', 0, 3.5) + P(`M${x - 22} -60c4-18 40-18 44 0z`, '#546E7A', 3)).join('') + R(-20, -86, 40, 136, '#F5E6C8', 0, 3.5) + P('M-24-86c4-20 44-20 48 0z', '#546E7A', 3) + R(-6, -102, 12, 14, '#546E7A', 2, 2.5)
        + [-14, 26].map((y) => Lc(`M-84 ${y}h168`, '#BCA77F', 2.5)).join('') + [-74, -50, -34, 24, 40, 64].map((x) => P(`M${x} ${-6}v-16c0-8 10-8 10 0v16zM${x} ${36}v-16c0-8 10-8 10 0v16z`, '#90A4AE', 2)).join('')
        + P('M-14 50v-24c0-12 28-12 28 0v24z', '#8D6E63', 3) + face(0, -54, 0.3))
      + P('M90 190l6-12h48l6 12z', '#E0E0E0', 3)),
  L('us/hawaii/landmark-humuhumu.v1.svg', 'ปลาฮูมูฮูมูนูคูนูคูอาปัวอา', 'The humuhumunukunukuāpuaʻa reef fish', ['humuhumunukunukuapuaa', 'ฮูมูฮูมูนูคูนูคูอาปัวอา', 'reef triggerfish', 'ปลาวัวลายแนวปะการัง', 'hawaii state fish', 'ปลาประจำรัฐฮาวาย', 'coral reef', 'แนวปะการัง', 'snorkelling', 'long fish name'], 'หาปลาลายเส้นทแยงที่มีปากสีเหลืองและเส้นสีฟ้าที่ตา', 'Find the striped fish with yellow lips and blue lines by its eyes',
    // a diamond-shaped reef triggerfish with a pale body, bold black diagonal bands with a stripe of yellow, bright blue lines across its forehead, yellow lips, a little orange stripe to the pectoral fin, swimming over coral and sea grass with bubbles
    sky('#4FC3F7') + P('M-4 206c30-14 60-6 90-12s60-10 90 0 50 4 68 0v62H-4z', '#FFE0A3', 3)
      + g(40, 200, 1, Lc('M0 0c-6-20 6-30 0-50M14 0c4-16-4-28 6-40M-14 0c-4-14 2-24-4-34', '#EC407A', 6)) + g(196, 196, 1, C(0, 0, 18, '#BA68C8', 3) + C(-14, -10, 9, '#BA68C8', 3) + C(14, -12, 8, '#BA68C8', 3))
      + g(120, 112, 1, P('M-72 0c20-40 70-56 110-28l30-14-4 42 4 42-30-14c-40 28-90 12-110-28z', '#F5F0E1', 3.5)
        + P('M-10-46c20 10 30 40 30 76-14-6-24-26-30-46z', INK, 0) + P('M18-44c10 10 16 40 12 70', 'none', 0) + Lc('M4-40c8 20 10 50 4 70', '#FDD835', 5) + P('M30-30c6 14 8 36 2 52 4-20 2-38-2-52z', INK, 2)
        + Lc('M-56-18l20 10M-52-28l24 12M-46-36l22 12', '#29B6F6', 4) + E(-74, 4, 7, 5, '#FDD835', 2.5) + Lc('M-60 14l30 6', '#FF7043', 4)
        + C(-44, -6, 9, '#FFFFFF', 3) + C(-44, -6, 4.5, INK, 0) + E(-36, 10, 6, 4, '#FF8FA3', 0) + P('M-10-46l14-20 10 22z', '#B0BEC5', 2.5))
      + [[40, 60], [52, 40], [190, 70]].map(([x, y]) => C(x, y, 5, '#E1F5FE', 2)).join('')),
  L('us/hawaii/landmark-locomoco.v1.svg', 'โลโคโมโค ข้าวหน้าแฮมเบิร์กราดเกรวี', 'A loco moco plate lunch', ['loco moco', 'โลโคโมโค', 'plate lunch', 'ข้าวจานด่วนฮาวาย', 'hamburger patty', 'แฮมเบิร์กสเต๊ก', 'fried egg', 'ไข่ดาว', 'brown gravy', 'hilo comfort food'], 'หาไข่ดาวที่นั่งอยู่บนเนื้อและข้าวราดน้ำเกรวี', 'Find the fried egg sitting on the patty and rice with gravy',
    // a wide bowl holding a mound of white rice, a thick round hamburger patty on top swimming in shiny brown gravy, a sunny fried egg crowning it with a smiling yolk, a scoop of creamy macaroni salad and green onion sprinkles beside it
    E(120, 168, 100, 46, '#80DEEA', 3.5) + E(120, 154, 90, 34, '#FFFFFF', 3.5)
      + P('M50 154c0-30 30-46 70-46s70 16 70 46c-30 10-110 10-140 0z', '#FAFAFA', 3) + [[70, 146], [86, 136], [160, 140], [176, 150]].map(([x, y]) => E(x, y, 4, 2.5, '#E0E0E0', 0)).join('')
      + E(110, 132, 48, 18, '#6D4C41', 3.5) + P('M60 140c10 14 30 18 50 16s46-6 52-18c4 10-2 22-8 26-10 6-30 0-44 6-16-6-36 2-48-10-6-6-4-14-2-20z', '#8D5A33', 3)
      + P('M76 120c-6-18 14-30 34-26 18-8 40 2 34 22 6 14-14 22-34 18-20 6-42-2-34-14z', '#FFFFFF', 3) + C(110, 112, 16, '#FFB300', 3) + face(110, 108, 0.32)
      + g(186, 154, 1, E(0, 0, 24, 14, '#FFF3C4', 3) + [[-10, -2], [2, -6], [10, 2], [-2, 4]].map(([x, y]) => P(`M${x - 4} ${y}q4-6 8 0`, 'none', 2)).join(''))
      + [[96, 104], [126, 98], [140, 116], [80, 112]].map(([x, y]) => R(x, y, 5, 3, '#66BB6A', 1, 0)).join('')),
  L('us/hawaii/landmark-iiwi.v1.svg', 'นกอีวีสีแดงกับดอกเลฮัว', 'An ʻiʻiwi honeycreeper at a lehua blossom', ['iiwi', 'นกอีวี', 'hawaiian honeycreeper', 'นกฮันนีครีปเปอร์', 'lehua blossom', 'ดอกเลฮัว', 'ohia tree', 'ต้นโอฮีอา', 'hawaii volcanoes national park', 'rainforest bird'], 'หานกสีแดงสดที่มีจะงอยปากโค้งยาวสีชมพู', 'Find the bright red bird with a long curved pink beak',
    // a scarlet round-bodied bird with black wings and tail perched on a twig of an ʻōhiʻa tree, dipping its long curved salmon-pink beak into a fluffy red pom-pom lehua flower, grey-green leaves, mossy rainforest green behind
    sky('#C5E1A5') + E(30, 40, 50, 40, '#9CCC65', 0) + E(220, 220, 60, 40, '#9CCC65', 0)
      + Lc('M-4 196c60-20 120-30 200-90', '#6D4C41', 7) + [[60, 178, 0], [150, 130, -30], [190, 108, 20]].map(([x, y, r]) => g(x, y, 1, E(0, -14, 8, 16, '#8BA888', 2.5), r)).join('')
      + g(176, 82, 1, [0, 60, 120, 180, 240, 300].map((a) => Lc(`M0 0l${Math.round(Math.cos(a * Math.PI / 180) * 24)} ${Math.round(Math.sin(a * Math.PI / 180) * 24)}`, '#E53935', 3)).join('') + C(0, 0, 18, '#EF5350', 3) + [30, 90, 150, 210, 270, 330].map((a) => C(Math.round(Math.cos(a * Math.PI / 180) * 20), Math.round(Math.sin(a * Math.PI / 180) * 20), 3, '#FFD54F', 0)).join(''))
      + g(100, 132, 1, P('M30 14l40 26-10 6-36-20z', INK, 3) + E(0, 6, 36, 28, '#E53935', 3.5) + P('M-14 0c10-14 40-14 44 10-14 12-34 10-44-10z', INK, 3) + C(-26, -18, 20, '#E53935', 3.5)
        + P('M-44-20c-14-2-26 6-30 22', '#FF8A65', 5) + Lc('M-44-20c-14-2-26 6-30 22', '#FF8A65', 4) + Lc('M-44-20c-14-2-26 6-30 22', INK, 1)
        + C(-30, -22, 4, INK, 0) + C(-29, -23, 1.4, '#FFFFFF', 0) + E(-20, -12, 5, 3, '#FF8FA3', 0) + Lc('M-4 32l-2 10M8 32l2 10', INK, 3))),
  L('us/hawaii/landmark-blowhole.v1.svg', 'ช่องพ่นน้ำฮาโลนาบนชายฝั่งหินลาวา', 'The Hālona Blowhole spraying from the lava rocks', ['halona blowhole', 'ช่องพ่นน้ำฮาโลนา', 'blowhole', 'ช่องหินพ่นน้ำ', 'lava rock coast', 'ชายฝั่งหินลาวา', 'east oahu', 'โออาฮูฝั่งตะวันออก', 'sea spray', 'scenic lookout'], 'หาน้ำทะเลที่พุ่งขึ้นฟ้าจากรูในหิน', 'Find the sea water shooting up into the sky from a hole in the rock',
    // dark brown-black lava rock ledges stepping down into a bright blue sea, a tall white plume of spray shooting up from a hole in the rocks with droplets falling, waves crashing at the edge, a rocky headland and a lookout wall with a child watching
    sky('#B3E5FC') + P('M-4 120h248v130H-4z', '#29B6F6', 3) + P('M160 120l30-30 30 14 24-6v22z', '#795548', 3)
      + Lc('M-4 140q20-8 40 0t40 0', '#E1F5FE', 3)
      + P('M-4 250V170c30-10 60 0 90-10s60 0 100-10 40 0 58 4v96z', '#4E4440', 3.5) + P('M40 200c30-6 70-4 100-10s60-2 104 2', 'none', 3) + Lc('M30 214c20-4 40 0 60-4M150 220c20-4 40 0 60-2', '#6D625C', 3)
      + E(118, 168, 14, 5, '#212121', 3)
      + P('M110 168C104 128 70 92 72 58c-4-16 14-26 26-16 4-16 40-16 44 0 12-10 30 0 26 16 2 34-32 70-38 110z', '#FFFFFF', 3.5) + P('M96 70c-20-6-30 10-22 22M146 70c20-6 30 10 22 22M84 40c-14 0-16 18-4 22M156 40c14 0 16 18 4 22', '#FFFFFF', 3) + face(120, 92, 0.38, 'o')
      + [[70, 110], [168, 112], [60, 140], [182, 146]].map(([x, y]) => C(x, y, 4, '#E1F5FE', 2)).join('')
      + R(-4, 216, 70, 34, '#A1887F', 0, 3) + kid(36, 212, '#FFEB3B')),
  // ---------- Canada (country layer)
  K('ca', 'food', 'smokedmeat', 'แซนด์วิชเนื้อรมควันมอนทรีออล', 'A Montreal smoked meat sandwich', ['montreal smoked meat', 'เนื้อรมควันมอนทรีออล', 'smoked meat sandwich', 'แซนด์วิชเนื้อรมควัน', 'rye bread', 'ขนมปังไรย์', 'dill pickle', 'แตงกวาดอง', 'montreal deli', 'peppery brisket'],
    // a tall sandwich of two slices of rye bread with caraway seeds holding a thick stack of pink smoked meat with dark peppery edges, cut in half and leaning on each other on a plate, a big green dill pickle beside it and a smile on the bread
    E(120, 200, 100, 22, '#E0F2F1', 3.5)
      + g(92, 130, 1, R(-46, -66, 92, 18, '#C8935C', 8, 3.5) + [0, 1, 2, 3, 4, 5].map((k) => P(`M-50 ${-48 + k * 14}c20-6 80-6 100 0v14c-20-6-80-6-100 0z`, k % 2 ? '#EF9A9A' : '#F48FB1', 3) + Lc(`M-50 ${-46 + k * 14}v12M50 ${-46 + k * 14}v12`, '#5D4037', 4)).join('') + R(-46, 36, 92, 18, '#C8935C', 8, 3.5)
        + [[-30, -58], [-6, -60], [20, -56], [34, 44], [-20, 46]].map(([x, y]) => E(x, y, 2.5, 1.4, '#6D4C41', 0)).join('') + face(0, -58, 0.28))
      + g(178, 168, 1, P('M-30 20c-6-30 10-60 40-60 14 0 20 10 18 22-6 30-30 46-58 38z', '#7CB342', 3.5) + [[-14, 10], [-4, -6], [8, -22], [0, 8]].map(([x, y]) => C(x, y, 2.5, '#AED581', 0)).join(''))),
  K('ca', 'food', 'fiddleheads', 'ยอดเฟิร์นม้วนฟิดเดิลเฮด', 'Curly fiddlehead ferns in spring', ['fiddleheads', 'ฟิดเดิลเฮด', 'fiddlehead ferns', 'ยอดเฟิร์นม้วน', 'spring greens', 'ผักฤดูใบไม้ผลิ', 'new brunswick', 'นิวบรันสวิก', 'ostrich fern', 'foraging'],
    // a woven basket brimming with bright green fern shoots each coiled into a tight spiral like the top of a violin, three big curls in front, one with a smiling face, a lemon wedge and a knob of butter on the side
    P('M40 150h160l-14 64H54z', '#C49A6C', 3.5) + [0, 1, 2].map((k) => Lc(`M${48 + k * 2} ${170 + k * 16}h${144 - k * 4}`, '#A0764A', 3)).join('') + P('M40 150c0-60 160-60 160 0', 'none', 5)
      + [[70, 140, 18], [104, 128, 22], [142, 132, 20], [176, 142, 16]].map(([x, y, r]) => C(x, y, r, '#7CB342', 3.5) + P(`M${x} ${y}c${r * 0.4} 0 ${r * 0.4}-${r * 0.6} 0-${r * 0.6}s-${r * 0.8} ${r * 0.2}-${r * 0.6} ${r * 0.8}`, 'none', 3) + Lc(`M${x + r} ${y}c4 10 4 20 0 28`, '#558B2F', 5)).join('')
      + g(104, 128, 1, face(0, 4, 0.32))
      + g(204, 200, 1, P('M-20 0a20 20 0 0 1 40 0z', '#FFEE58', 3) + Lc('M-12-2l10-12M0-2v-16M12-2l-10-12', '#F9A825', 2)) + R(18, 190, 26, 18, '#FFF59D', 4, 3)),
  K('ca', 'animal', 'narwhal', 'นาร์วาฬ วาฬงาเกลียวแห่งอาร์กติก', 'A narwhal with its spiral tusk', ['narwhal', 'นาร์วาฬ', 'spiral tusk', 'งาเกลียว', 'arctic ocean', 'มหาสมุทรอาร์กติก', 'nunavut', 'นูนาวุต', 'sea ice', 'unicorn of the sea'],
    // a chubby grey-speckled narwhal with a long spiralling ivory tusk pointing up and forward, flippers and a fluked tail, swimming in dark blue water beneath white floating ice floes, little bubbles, a friendly face
    P('M10 60l40-8 20 10 30-6-6 18H18zM150 54l50-6 30 12-10 14h-60z', '#FFFFFF', 3.5) + Lc('M0 76h240', '#90CAF9', 3)
      + g(134, 156, 0.86, P('M-70 10c0-34 40-50 90-40 30 6 50 20 56 40-20 22-60 34-100 30-30-4-46-14-46-30z', '#90A4AE', 3.5) + P('M-60 20c20 14 70 18 112 4-10 14-50 22-80 18-20-2-30-10-32-22z', '#ECEFF1', 0)
        + P('M76 10l20-20c8-6 18 4 10 12l-12 14 12 14c8 8-2 18-10 12l-20-20z', '#90A4AE', 3.5) + P('M-6 26c4 14 20 22 30 16-6-10-18-16-30-16z', '#78909C', 3)
        + [[-30, -8], [-10, -14], [10, -8], [34, -6], [-20, 4]].map(([x, y]) => C(x, y, 3, '#607D8B', 0)).join('')
        + Lc('M-66-6l-56-50', INK, 11) + Lc('M-66-6l-56-50', '#FFF3D6', 6) + [0, 1, 2, 3, 4].map((k) => Lc(`M${-74 - k * 10} ${-14 - k * 9}l6-6`, '#BCAAA4', 2)).join('') + face(-46, 4, 0.4))
      + [[40, 110], [50, 96], [196, 120]].map(([x, y]) => C(x, y, 4, '#E3F2FD', 2)).join('')),
  K('ca', 'transport', 'schooner', 'เรือใบสคูนเนอร์จากโนวาสโกเชีย', 'A Nova Scotia fishing schooner under sail', ['schooner', 'เรือใบสคูนเนอร์', 'bluenose', 'บลูโนส', 'nova scotia', 'โนวาสโกเชีย', 'lunenburg harbour', 'ท่าเรือลูเนนเบิร์ก', 'tall ship', 'atlantic canada'],
    // a sleek black-hulled wooden schooner heeling in the wind with two tall masts, big cream gaff sails and triangular jibs at the bow, a thin red stripe at the waterline, rolling blue waves and a white wake, a face on the bow
    Lc('M90 40v130M150 52v118', '#8D6E63', 5) + P('M94 44c30 20 44 70 46 120H94z', '#FFF3D6', 3.5) + P('M154 56c26 20 36 60 38 108h-38z', '#FFF3D6', 3.5) + P('M86 50l-50 112h50z', '#FFF3D6', 3.5) + P('M84 70L52 160h32z', 'none', 2)
      + Lc('M94 80h40M94 120h44M154 90h30M154 128h34', '#E7D3A8', 2)
      + P('M20 168h196c-6 20-24 30-46 30H62c-22 0-38-10-42-30z', '#263238', 3.5) + Lc('M30 186c40 6 140 6 180-2', '#E53935', 4) + face(56, 178, 0.3)
      + P('M-4 196c30-10 50 10 80 0s50-10 80 0 50 10 88-4v52H-4z', '#1E88E5', 3.5) + Lc('M10 214q16-8 32 0M120 220q16-8 32 0M190 212q16-8 32 0', '#BBDEFB', 3)
      + P('M206 190c10-6 20-4 30 2', 'none', 3)),
];

export default { places: {}, items };
