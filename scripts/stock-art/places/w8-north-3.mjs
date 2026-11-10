// Wave 8, the north (part 3): Helsinki, Edinburgh and Scotland, the Cotswolds, Estonia, Tallinn
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (fi/helsinki/landmark-oodi.v1.svg → fi-helsinki.landmark.oodi)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const X = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const tree = (x, y, s, c = '#43A047') => g(x, y, s, Lc('M0 0v-14', '#6D4C41', 4) + C(0, -24, 14, c, 2.5));
// a honey-stone Cotswold cottage (for the model village)
const cot = (x, y, s) => g(x, y, s, R(-20, -24, 40, 24, '#F2CF8A', 1, 2.5) + P('M-24-24l24-18 24 18z', '#8D6E63', 2.5) + R(-12, -18, 8, 8, '#FFFFFF', 1, 1.5) + R(4, -14, 8, 14, '#5D4037', 1, 1.5));

const items = [
  // ---------- Helsinki
  L('fi/helsinki/landmark-oodi.v1.svg', 'ห้องสมุดโอดิ ตึกไม้โค้งเหมือนคลื่น', 'Oodi, the library with a wooden wave', ['oodi library', 'ห้องสมุดโอดิ', 'helsinki central library', 'ห้องสมุดกลาง', 'wooden wave', 'ไม้โค้งเป็นคลื่น', 'book heaven', 'ชั้นหนังสือ', 'citizens balcony', 'kansalaistori'], 'หาท้องตึกไม้ที่โค้งลงมาเหมือนคลื่น', 'Find the wooden underside that swoops down like a wave',
    // a long low building whose wooden lower half swoops up and down like a big wave, a band of glass on top with a white roof, a wide balcony at the end and people on the square in front
    sky('#E3F2FD') + R(-4, 186, 248, 58, '#CFD8DC', 0, 3)
    + R(10, 62, 220, 34, '#B3E5FC', 2, 3.5) + Lc('M40 64v30M80 64v30M120 64v30M160 64v30M200 64v30', '#E1F5FE', 2) + R(4, 54, 232, 10, '#FFFFFF', 2, 3)
    + P('M10 96h220v20c-30 50-50 70-70 70-30 0-30-60-80-60-30 0-40 60-70 60V96z', '#D49A5C', 3.5) + Lc('M10 108c40 0 50 0 80 10s40 24 70 20 40-30 70-34', '#B9783A', 2) + Lc('M10 124c30 0 50-4 80 6M160 160c20-10 40-30 60-50', '#B9783A', 2)
    + R(14, 150, 40, 36, '#B3E5FC', 2, 3) + face(140, 120, 0.42) + kid(60, 208, '#E53935', 0.9) + kid(196, 214, '#FFCA28', 0.9) + kid(110, 224, '#26A69A', 0.8)),
  L('fi/helsinki/landmark-amosrex.v1.svg', 'โดมหน้าต่างกลมบนลานอามอสเร็กซ์', 'The round-window domes of Amos Rex', ['amos rex', 'อามอสเร็กซ์', 'lasipalatsi', 'ลาซิปาลัตซี', 'domes on the square', 'โดมบนลาน', 'skylight domes', 'โดมหน้าต่างกลม', 'art museum underground', 'climb the domes'], 'หาเด็กที่ปีนขึ้นไปบนโดมที่มีหน้าต่างกลม', 'Find the child climbing a dome with a round window',
    // a paved square bubbling up into smooth grey domes, each with a round glass eye of a skylight, children climbing and sliding on them, a slim white tower with a clock-free top behind
    sky('#E1F5FE') + R(160, 30, 26, 110, '#FFFFFF', 2, 3) + R(156, 24, 34, 12, '#ECEFF1', 2, 2.5) + R(30, 96, 200, 44, '#FFFFFF', 2, 3) + Lc('M30 112h200', '#90A4AE', 2)
    + R(-4, 140, 248, 104, '#B0BEC5', 0, 3) + Lc('M-4 170h248M-4 200h248', '#CFD8DC', 1.5)
    + [[50, 196, 46], [150, 186, 56], [214, 214, 34], [90, 232, 28]].map(([x, y, r], i) => P(`M${x - r} ${y}c0-${r * 1.3} ${r * 2} -${r * 1.3} ${r * 2} 0z`, '#ECEFF1', 3.5) + C(x, y - r * 0.6, r * 0.28, '#4FC3F7', 3) + C(x - r * 0.08, y - r * 0.68, r * 0.08, '#FFFFFF', 0) + Lc(`M${x - r * 0.6} ${y - 4}c${r * 0.3} -${r * 0.6} ${r * 0.9} -${r * 0.6} ${r * 1.2} 0`, '#CFD8DC', 2) + (i === 1 ? face(x, y - 20, 0.42) : '')).join('')
    + kid(150, 126, '#E53935', 0.9) + kid(28, 170, '#FFCA28', 0.8) + kid(214, 182, '#7E57C2', 0.7)),
  L('fi/helsinki/landmark-finlandiahall.v1.svg', 'ฟินแลนเดียฮอลล์ตึกหินอ่อนขาวริมอ่าว', 'Finlandia Hall, the white marble hall by the bay', ['finlandia hall', 'ฟินแลนเดียฮอลล์', 'finlandia-talo', 'ฟินแลนเดียตาโล', 'white marble building', 'ตึกหินอ่อนขาว', 'töölönlahti bay', 'อ่าวเตอเลินลาห์ติ', 'concert hall', 'slanted tower'], 'หาหอสูงเอียงที่ยื่นขึ้นจากตึกสีขาว', 'Find the tall slanted tower rising from the white building',
    // a long bright white marble building with black stripes of windows, a tall wedge-shaped tower with a sloping top rising from it, standing by a calm bay with ducks and a birch tree
    sky('#E3F2FD') + P('M-4 176h248v68H-4z', '#4FC3F7', 0) + Lc('M30 206h40M150 220h50', '#E1F5FE', 3)
    + R(10, 110, 220, 66, '#FFFFFF', 2, 3.5) + Lc('M10 126h220M10 160h220', '#263238', 5) + Lc('M30 144h180', '#ECEFF1', 2)
    + P('M120 110V40l60 30v40z', '#FFFFFF', 3.5) + Lc('M130 50v60M142 56v54M154 62v48M166 68v42', '#ECEFF1', 2) + P('M120 40l60 30', 'none', 4)
    + g(30, 176, 1, Lc('M0 0v-70', '#FFFFFF', 7) + Lc('M0 0v-70', INK, 1.5) + Lc('M-3-20h6M-3-44h6', INK, 2) + C(0, -76, 18, '#AED581', 2.5))
    + [[180, 196], [206, 204]].map(([x, y]) => E(x, y, 9, 6, '#8D6E63', 2) + C(x + 7, y - 6, 4, '#2E7D32', 1.5)).join('') + face(80, 144, 0.38)),
  // ---------- Edinburgh and Scotland
  L('gb/edinburgh/landmark-cameraobscura.v1.svg', 'หอคอยกล้องออบสคิวรากับโลกแห่งภาพลวงตา', 'The Camera Obscura tower and its world of illusions', ['camera obscura', 'กล้องออบสคิวรา', 'world of illusions', 'โลกแห่งภาพลวงตา', 'castlehill', 'คาสเซิลฮิลล์', 'royal mile', 'รอยัลไมล์', 'mirror maze', 'periscope view'], 'หาโดมขาวดำบนยอดหอที่มีเลนส์ส่องเมือง', 'Find the black and white dome at the top with a lens that spies on the city',
    // a tall old stone house with a round tower on top crowned by a black-and-white striped dome and a little lens, inside a round white table shows the city upside-down-the-right-way to children
    sky('#E1F5FE') + R(50, 90, 120, 140, '#BCAAA4', 2, 3.5) + Array.from({ length: 3 }, (_, r) => [64, 94, 124, 150].map((x) => R(x, 104 + r * 32, 14, 20, '#90A4AE', 1, 2)).join('')).join('')
    + R(86, 40, 48, 50, '#D7CCC8', 2, 3) + P('M82 40c0-30 56-30 56 0z', '#FFFFFF', 3) + [92, 104, 116, 128].map((x) => Lc(`M${x} 40c0-14 ${120 - x > 0 ? 6 : -6}-24 ${(120 - x) / 2} -26`, '#263238', 4)).join('') + R(114, 4, 12, 10, '#FFCA28', 2, 2.5)
    + g(196, 170, 1, C(0, 0, 34, '#FFFFFF', 3) + E(0, 0, 28, 10, '#AED581', 2) + P('M-16 0l6-10h8l2-6 4 6h10l2 10z', '#BCAAA4', 1.8) + face(0, 18, 0.3)) + Lc('M150 106l34 34', '#FFF59D', 4)
    + face(110, 66, 0.3) + kid(30, 230, '#E53935', 0.9)),
  L('gb/edinburgh/landmark-greyfriarsbobby.v1.svg', 'รูปปั้นหมาน้อยเกรย์ไฟรเออร์สบ็อบบี้', 'Greyfriars Bobby, the loyal little dog statue', ['greyfriars bobby', 'เกรย์ไฟรเออร์สบ็อบบี้', 'loyal dog', 'หมาซื่อสัตย์', 'skye terrier', 'สกายเทอร์เรีย', 'candlemaker row', 'แคนเดิลเมกเกอร์โรว์', 'shiny nose', 'dog statue'], 'หาจมูกหมาที่เป็นมันวาวเพราะคนลูบ', 'Find the little dog’s shiny nose rubbed by visitors',
    // a small bronze shaggy terrier sitting proudly on top of a granite drinking-fountain column, its nose rubbed shiny gold, a low bowl at the bottom for dogs and a child reaching up
    sky('#E8EAF6') + R(-4, 200, 248, 44, '#B0BEC5', 0, 3)
    + R(96, 110, 48, 90, '#8D8D8D', 3, 3.5) + R(88, 100, 64, 14, '#9E9E9E', 3, 3) + R(88, 196, 64, 10, '#9E9E9E', 3, 3) + C(120, 150, 10, '#BDBDBD', 2.5) + E(120, 210, 30, 6, '#4FC3F7', 2.5)
    + g(120, 72, 1, P('M-24 30c-4-30 4-50 24-50s28 20 24 50z', '#6D5A40', 3) + [[-20, 0], [-14, 18], [16, 4], [20, 22], [0, -6]].map(([x, y]) => Lc(`M${x} ${y}l${x > 0 ? 4 : -4} 6`, '#4E3E2A', 2)).join('')
      + C(0, -26, 18, '#6D5A40', 3) + P('M-18-32c-10 0-12 14-4 18zM18-32c10 0 12 14 4 18z', '#4E3E2A', 2.5) + E(0, -18, 6, 4, '#FFCA28', 2) + face(0, -28, 0.28))
    + kid(60, 228, '#1E88E5', 1) + Lc('M70 210l20-20', '#FFE0BD', 4)),
  L('gb/edinburgh/landmark-eileandonan.v1.svg', 'ปราสาทเอเลินโดนันบนเกาะกลางทะเลสาบ', 'Eilean Donan, the island castle and its stone bridge', ['eilean donan castle', 'ปราสาทเอเลินโดนัน', 'island castle', 'ปราสาทบนเกาะ', 'arched stone bridge', 'สะพานหินโค้ง', 'loch duich', 'ทะเลสาบดุยค์', 'scottish highlands', 'kyle of lochalsh'], 'หาสะพานหินโค้งหลายช่องที่พาไปปราสาท', 'Find the arched stone bridge that leads to the castle',
    // a sturdy grey stone castle with a square keep and little turrets on a tiny rocky island, a long stone bridge of arches leading to it across still water, purple-green hills behind
    sky('#FFF3E0') + P('M-4 120l40-40 50 30 50-50 60 40 48-20v40H-4z', '#8E7CC3', 3) + P('M-4 140h248v104H-4z', '#5C9EAD', 0) + Lc('M20 200h40M160 214h50', '#B2EBF2', 3)
    + P('M120 160c10-16 100-16 110 0z', '#78909C', 3) + R(140, 90, 70, 66, '#9E9E9E', 2, 3.5) + Array.from({ length: 6 }, (_, k) => R(140 + k * 12, 82, 8, 10, '#9E9E9E', 1, 2)).join('') + R(196, 70, 18, 86, '#8D8D8D', 2, 3) + P('M194 70l11-14 11 14z', '#5D4037', 2.5)
    + [[156, 110], [176, 110], [164, 132]].map(([x, y]) => R(x, y, 8, 12, '#37474F', 3, 1.5)).join('')
    + P('M-4 150h144v10H-4z', '#9E9E9E', 3) + [10, 40, 70, 100].map((x) => P(`M${x} 160v24h22v-24c0-10-22-10-22 0z`, '#9E9E9E', 3)).join('') + Lc('M-4 150h144', '#757575', 2)
    + face(176, 140, 0.32) + kid(80, 150, '#E53935', 0.8)),
  L('gb/edinburgh/landmark-victoriastreet.v1.svg', 'ถนนวิกตอเรียโค้งร้านค้าหลากสี', 'Victoria Street, the curving rainbow of shops', ['victoria street', 'ถนนวิกตอเรีย', 'colourful shopfronts', 'หน้าร้านหลากสี', 'curving street', 'ถนนโค้ง', 'grassmarket', 'กราสมาร์เก็ต', 'victoria terrace', 'old town shops'], 'หาทางเดินชั้นบนที่อยู่เหนือร้านค้า', 'Find the upper walkway above the shopfronts',
    // a street curving downhill lined with shopfronts in red, blue, yellow, green and purple, a raised terrace walkway with railings running along above them, tall grey stone houses on top
    sky('#E1F5FE') + P('M-4 40h248v60H-4z', '#9E9E9E', 3) + Array.from({ length: 8 }, (_, k) => R(8 + k * 29, 54, 12, 18, '#ECEFF1', 1, 1.5)).join('')
    + P('M-4 100c80 10 170 10 248 0v20c-80 10-170 10-248 0z', '#BDBDBD', 3) + Array.from({ length: 13 }, (_, k) => Lc(`M${6 + k * 19} 100v-12`, INK, 2)).join('') + Lc('M-4 88c80 10 170 10 248 0', INK, 2.5)
    + ['#E53935', '#1E88E5', '#FDD835', '#43A047', '#8E24AA', '#FB8C00'].map((c, k) => { const x = -4 + k * 42; return P(`M${x} ${118 + (k % 3) * 2}h42v82h-42z`, c, 3) + R(x + 6, 132, 30, 30, '#E1F5FE', 2, 2) + R(x + 14, 168, 14, 32, '#FFFFFF', 2, 2); }).join('')
    + P('M-4 200c80 20 170 20 248 0v44H-4z', '#90A4AE', 3) + face(102, 146, 0.32) + kid(80, 222, '#FFCA28', 0.9) + kid(170, 220, '#26A69A', 0.9)),
  L('gb/edinburgh/landmark-dynamicearth.v1.svg', 'ไดนามิกเอิร์ธ หลังคาเต็นท์ขาวใต้หน้าผา', 'Dynamic Earth, the white tent under the crags', ['dynamic earth', 'ไดนามิกเอิร์ธ', 'earth science centre', 'ศูนย์วิทยาศาสตร์โลก', 'white tent roof', 'หลังคาเต็นท์ขาว', 'salisbury crags', 'หน้าผาซอลส์บรี', 'holyrood', 'journey through time'], 'หาหลังคาเต็นท์สีขาวที่มีเสาแหลม', 'Find the white tent roof held up by pointed masts',
    // a big white tent-like roof stretched over spiky masts, a curved stone wall wrapped round its base, a red cliff of crags rising behind it and children walking up to the entrance
    sky('#E3F2FD') + P('M-4 120c40-60 120-80 248-60v80H-4z', '#A1665E', 3) + Lc('M30 100l20 20M110 80l10 20M180 74l20 24', '#8D4E46', 2)
    + R(20, 160, 200, 40, '#D7CCC8', 20, 3.5) + Lc('M30 176h180', '#BCAAA4', 2)
    + P('M24 162l34-60 30 40 32-70 32 70 30-40 34 60z', '#FFFFFF', 3.5) + Lc('M58 102V70M120 72V40M182 102V70', INK, 3) + Lc('M58 102l30 40M120 72l32 70M182 102l-30 40', '#ECEFF1', 2)
    + R(-4, 200, 248, 44, '#B0BEC5', 0, 3) + P('M104 200v-24c0-12 32-12 32 0v24z', '#4FC3F7', 3) + face(120, 140, 0.32) + kid(70, 226, '#E53935', 0.9) + kid(170, 226, '#FFCA28', 0.9)),

  // ---------- The Cotswolds
  L('gb/cotswolds/landmark-modelvillage.v1.svg', 'หมู่บ้านจำลองที่เบอร์ตันออนเดอะวอเตอร์', 'The model village at Bourton-on-the-Water', ['model village', 'หมู่บ้านจำลอง', 'bourton on the water', 'เบอร์ตันออนเดอะวอเตอร์', 'tiny houses', 'บ้านจิ๋ว', 'giant for a day', 'ยักษ์ในเมืองจิ๋ว', 'river windrush', 'miniature village'], 'หาเด็กที่ตัวสูงกว่าบ้านทั้งหลัง', 'Find the child who is taller than a whole house',
    // a miniature honey-stone village of knee-high cottages and a little church tower beside a tiny stream with low stone bridges, a child standing over it like a friendly giant
    sky('#E8F5E9') + P('M-4 110h248v134H-4z', '#9CCC65', 0) + Lc('M-4 186c50-10 80 10 130 0s80-10 118 0', '#4FC3F7', 12) + Lc('M60 186h20M150 184h20', '#B0BEC5', 6)
    + cot(36, 150, 1) + cot(96, 140, 0.9) + cot(196, 150, 1.1) + cot(56, 226, 1) + cot(170, 230, 0.9)
    + g(140, 140, 1, R(-8, -40, 16, 40, '#F2CF8A', 1, 2.5) + Array.from({ length: 4 }, (_, k) => R(-8 + k * 4.4, -46, 3, 6, '#F2CF8A', 0, 1.5)).join('')) + tree(16, 120, 0.6) + tree(224, 118, 0.7)
    + g(120, 230, 1, Lc('M-8 0v-30M8 0v-30', '#1E88E5', 9) + R(-14, -76, 28, 48, '#FFCA28', 6, 3) + Lc('M-14-66l-14 22M14-66l14 22', '#FFE0BD', 6) + C(0, -90, 15, '#FFE0BD', 3) + P('M-15-94c0-16 30-16 30 0z', '#6D4C41', 2.5) + face(0, -88, 0.36))),
  L('gb/cotswolds/landmark-blenheim.v1.svg', 'พระราชวังเบลนิมกับทะเลสาบใหญ่', 'Blenheim Palace and its great lake', ['blenheim palace', 'พระราชวังเบลนิม', 'woodstock', 'วูดสต็อก', 'baroque palace', 'พระราชวังบาโรก', 'palace lake', 'ทะเลสาบพระราชวัง', 'grand bridge', 'palace maze'], 'หายอดหอคอยที่มีลูกบอลสีทองบนหลังคา', 'Find the golden balls on top of the palace towers',
    // a huge honey-coloured baroque palace with a columned porch and a triangular pediment, tall corner towers topped with golden balls, wide wings either side, a green lawn and a curving lake with a bridge in front
    sky('#E3F2FD') + P('M-4 180h248v64H-4z', '#8BC34A', 0) + P('M-4 206c60-14 180-14 248 0v38H-4z', '#4FC3F7', 3) + P('M90 212c10-14 50-14 60 0', '#E8D29A', 3)
    + R(4, 120, 232, 60, '#E8C77A', 2, 3.5) + Array.from({ length: 10 }, (_, k) => R(12 + k * 23, 136, 10, 18, '#FFF8E1', 2, 1.5)).join('')
    + [[40, 96], [200, 96]].map(([x, y]) => R(x - 18, y, 36, 84, '#E8C77A', 2, 3) + R(x - 22, y - 10, 44, 10, '#D9B060', 1, 2.5) + [-14, 0, 14].map((d) => C(x + d, y - 16, 5, '#FFCA28', 2)).join('') + R(x - 6, y + 14, 12, 20, '#FFF8E1', 2, 1.5)).join('')
    + P('M84 120l36-30 36 30z', '#E8C77A', 3) + R(84, 120, 72, 60, '#F2D58F', 0, 3) + [92, 106, 120, 134, 148].map((x) => R(x - 3, 124, 6, 56, '#FFF8E1', 1, 1.5)).join('') + C(120, 82, 6, '#FFCA28', 2)
    + face(120, 104, 0.25) + kid(60, 196, '#E53935', 0.9)),
  L('gb/cotswolds/landmark-whitehorse.v1.svg', 'ม้าขาวอัฟฟิงตันวาดด้วยชอล์กบนเนินเขา', 'The Uffington White Horse drawn in chalk on the hill', ['uffington white horse', 'ม้าขาวอัฟฟิงตัน', 'chalk horse', 'ม้าชอล์ก', 'hill figure', 'ภาพบนเนินเขา', 'white horse hill', 'เนินม้าขาว', 'dragon hill', 'ancient drawing'], 'หาม้าสีขาวเส้นยาวๆ ที่วาดบนเนิน', 'Find the long, stretchy white horse drawn on the hillside',
    // a big rolling green hill with a long, sleek, stretchy white horse made of a few flowing chalk lines across its slope, a little flat-topped mound beside it and a footpath with children
    sky('#E1F5FE') + P('M-4 100c40-40 160-50 248-20v164H-4z', '#7CB342', 3.5) + P('M-4 150c60-20 140-20 248 0v94H-4z', '#9CCC65', 0) + Lc('M20 210c40-30 120-40 200-30', '#E8D29A', 5)
    + g(110, 100, 1, Lc('M-70 10c30-14 70-18 110-10 14 2 20-6 30-14', '#FFFFFF', 9) + Lc('M40 -2l18-14 10 4-10 8', '#FFFFFF', 7) + Lc('M-60 14l-14 20M-30 10l-6 24M20 6l10 22M34 4l20 18', '#FFFFFF', 7) + Lc('M-70 10l-20-6', '#FFFFFF', 6) + C(60, -10, 2.5, INK, 0))
    + P('M180 140c4-14 40-14 44 0z', '#8BC34A', 3) + kid(60, 220, '#E53935', 0.9) + kid(160, 196, '#FFCA28', 0.8) + face(120, 160, 0.4)),
  L('gb/cotswolds/landmark-woolsack.v1.svg', 'แข่งแบกกระสอบขนแกะขึ้นเนินที่เท็ตเบอรี', 'The Woolsack Races up Gumstool Hill', ['woolsack races', 'แข่งแบกกระสอบขนแกะ', 'tetbury', 'เท็ตเบอรี', 'gumstool hill', 'เนินกัมสตูล', 'carry the woolsack', 'แบกกระสอบ', 'cotswold wool', 'steep hill race'], 'หาคนที่แบกกระสอบขนแกะวิ่งขึ้นเนินชัน', 'Find the runner carrying a woolsack up the steep hill',
    // a steep street rising between honey-stone cottages, a runner in a bright shirt charging uphill with a fat cream woolsack on their shoulders, bunting overhead and children cheering
    sky('#E3F2FD') + P('M-4 220L244 90v154H-4z', '#B0BEC5', 3.5) + [[20, 180], [70, 154], [200, 90]].map(([x, y]) => R(x - 22, y - 50, 44, 50, '#F2CF8A', 2, 3) + P(`M${x - 26} ${y - 50}l26-20 26 20z`, '#8D6E63', 3) + R(x - 10, y - 38, 10, 10, '#FFFFFF', 1, 1.5)).join('')
    + Lc('M-4 40c60 20 180 20 248 0', INK, 1.5) + [10, 40, 70, 100, 130, 160, 190, 220].map((x, k) => P(`M${x} ${48 + Math.sin(k) * 2}l8 16 8-16z`, ['#E53935', '#FFCA28', '#1E88E5', '#43A047'][k % 4], 1.5)).join('')
    + g(130, 170, 1, Lc('M-6 10l-14 20M6 10l12 18', '#37474F', 7) + R(-14, -24, 28, 34, '#E53935', 5, 3) + C(4, -34, 11, '#FFE0BD', 2.5) + face(4, -32, 0.26)
      + g(-6, -46, 1, E(0, 0, 32, 18, '#FFF8E1', 3.5) + Lc('M-22-4c6 4 12 4 18 0M2 4c6 4 12 4 18 0', '#E0D3B8', 2), -12) + Lc('M-12-18l-10-18M14-18l10-20', '#FFE0BD', 5))
    + kid(40, 230, '#FFCA28', 0.9) + kid(210, 194, '#7E57C2', 0.8)),
  L('gb/cotswolds/landmark-biburytrout.v1.svg', 'ให้อาหารปลาเทราต์ที่ฟาร์มบิบูรี', 'Feeding the trout at Bibury Trout Farm', ['bibury trout farm', 'ฟาร์มปลาเทราต์บิบูรี', 'feed the fish', 'ให้อาหารปลา', 'rainbow trout', 'ปลาเทราต์สายรุ้ง', 'river coln', 'แม่น้ำโคลน์', 'bibury', 'fish ponds'], 'หาปลาที่กระโดดขึ้นมากินอาหาร', 'Find the fish jumping up for food',
    // a clear stone-edged pond full of speckled trout with pink stripes, one leaping for a sprinkle of food pellets that a child throws from a little paper cup, reeds and a stone wall behind
    sky('#E8F5E9') + R(-4, 70, 248, 40, '#E8D29A', 0, 3) + Array.from({ length: 8 }, (_, k) => Lc(`M${k * 32} 70v40`, '#C8B080', 2)).join('') + Lc('M-4 90h248', '#C8B080', 2)
    + R(10, 110, 220, 120, '#4FC3F7', 14, 3.5) + Lc('M40 150h30M150 210h40M60 200h20', '#B3E5FC', 3)
    + [[60, 170, 10], [170, 160, -10], [110, 200, 0], [190, 210, 15]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 22, 8, '#8D9F7A', 2.5) + Lc('M-18 0h30', '#F48FB1', 3) + P('M-22 0l-10-7v14z', '#8D9F7A', 2) + C(14, -2, 1.5, INK, 0) + [[-8, -4], [0, -3], [6, 3]].map(([a, b]) => C(a, b, 1.2, '#4E5D3A', 0)).join(''), r)).join('')
    + g(120, 130, 1, P('M-24 10c0-20 16-34 34-34l10-6-2 10c8 8 6 22-6 30z', '#8D9F7A', 3) + Lc('M-20 6c10-16 22-24 34-26', '#F48FB1', 3) + face(4, -6, 0.26)) + Lc('M108 150c-4 6 8 6 4 12M132 150c4 6-8 6-4 12', '#B3E5FC', 2.5)
    + [[150, 96], [158, 104], [144, 106], [166, 96]].map(([x, y]) => C(x, y, 2, '#8D6E63', 0)).join('') + kid(190, 104, '#E53935', 1) + Lc('M184 92l-10 4', '#FFE0BD', 4) + R(168, 90, 8, 8, '#FFFFFF', 1, 1.5)
    + [20, 26, 220, 226].map((x) => Lc(`M${x} 110v-30`, '#7CB342', 3)).join('')),

  // ---------- Estonia
  X('ee', 'food', 'kama', 'คามา เครื่องดื่มแป้งธัญพืชกับคีเฟอร์', 'Kama, roasted grain flour stirred into kefir', ['kama', 'คามา', 'roasted grain flour', 'แป้งธัญพืชคั่ว', 'kefir', 'คีเฟอร์', 'estonian breakfast', 'อาหารเช้าเอสโตเนีย', 'kama with berries', 'healthy snack'],
    // a tall glass of creamy beige kama drink with a spoon, a few red berries and a drizzle of honey on top, beside it a little pile of brown flour powder with a wooden scoop
    E(120, 200, 100, 14, '#D7CCC8', 3) + g(150, 120, 1, P('M-34-64h68l-8 140h-52z', '#E3F2FD', 3.5) + P('M-31-40h62l-6 112h-50z', '#E6CFA6', 0) + Lc('M-30-20h60', '#D7B98A', 2) + P('M-34-64h68l-8 140h-52z', 'none', 3.5)
      + [[-12, -44], [4, -48], [16, -42]].map(([x, y]) => C(x, y, 5, '#E53935', 2)).join('') + Lc('M-20-40c10 4 24 4 40 0', '#FFB300', 3) + Lc('M18-80l-14 70', '#B0BEC5', 5) + Lc('M18-80l-14 70', INK, 1) + face(0, 20, 0.4))
    + g(66, 184, 1, P('M-40 10c10-30 70-30 80 0z', '#A1673F', 3) + [[-14, -2], [6, -6], [20, 2]].map(([x, y]) => C(x, y, 2, '#6D4C41', 0)).join('') + g(-24, -20, 1, P('M-12 0h24l-4 12h-16z', '#C8A165', 2.5) + Lc('M12 2l20-14', '#C8A165', 5), -20))),
  X('ee', 'culture', 'kiiking', 'คีคิง ชิงช้าที่แกว่งข้ามด้านบน', 'Kiiking, swinging right over the top', ['kiiking', 'คีคิง', 'extreme swing', 'ชิงช้าหมุนรอบ', 'swing over the bar', 'แกว่งข้ามคาน', 'estonian sport', 'กีฬาเอสโตเนีย', 'village swing', 'kiik'],
    // a tall wooden swing frame with two long straight steel arms instead of ropes, a swinger strapped in at the very top of the circle upside down, a dotted circle showing the full loop, cheering children below
    E(120, 214, 104, 14, '#8BC34A', 3) + C(120, 110, 84, 'none', 2).replace('stroke-width="2"', 'stroke="#90A4AE" stroke-width="2.5" stroke-dasharray="7 7"')
    + Lc('M54 214L116 110M186 214L124 110', '#8D6E63', 10) + Lc('M54 214L116 110M186 214L124 110', INK, 1.5) + C(120, 110, 8, '#5D4037', 3)
    + Lc('M112 110V34M128 110V34', '#B0BEC5', 6) + Lc('M112 110V34M128 110V34', INK, 1.2) + R(102, 22, 36, 10, '#A1673F', 2, 2.5)
    + g(120, 40, 1, R(-8, -10, 16, 22, '#E53935', 3, 2.5) + C(0, -20, 9, '#FFE0BD', 2.5) + face(0, -18, 0.24) + Lc('M-8-6l-6-14M8-6l6-14', '#FFE0BD', 4), 180)
    + Lc('M40 110c0-40 30-74 70-80', '#FFCA28', 3) + P('M110 30l-12-4 4 10z', '#FFCA28', 2)
    + kid(40, 214, '#1E88E5', 0.9) + kid(200, 214, '#FFCA28', 0.9)),
  X('ee', 'transport', 'iceroad', 'ขับรถบนถนนน้ำแข็งข้ามทะเลไปเกาะ', 'Driving the ice road across the sea to an island', ['ice road', 'ถนนน้ำแข็ง', 'jäätee', 'แยเต', 'frozen sea road', 'ถนนบนทะเลน้ำแข็ง', 'hiiumaa', 'ฮีอูมา', 'island drive', 'winter road'],
    // a small car driving on a long road across a frozen white-blue sea, marked out by little sticks with reflectors, a pine island waiting at the far end and a big pale winter sun
    C(120, 120, 104, '#E3F2FD', 3.5) + C(70, 70, 14, '#FFF59D', 2) + P('M120 16a104 104 0 0 1 104 104H16A104 104 0 0 1 120 16z', 'none', 0)
    + P('M16 120c60-6 150-6 208 0v4c-30 70-178 70-208 0z', '#B3E5FC', 0) + C(120, 120, 104, 'none', 3.5)
    + P('M150 108c10-14 50-14 60 0z', '#8D6E63', 2.5) + [[160, 104], [176, 98], [194, 104]].map(([x, y]) => P(`M${x} ${y - 20}l8 20h-16z`, '#2E7D32', 2)).join('')
    + P('M60 210L150 110h8L120 210z', '#E1F5FE', 2.5) + [[70, 196], [92, 172], [114, 148], [134, 126]].map(([x, y], k) => Lc(`M${x} ${y}v-${10 - k * 2}`, INK, 2) + C(x, y - 10 + k * 2, 2, '#FF7043', 0)).join('')
    + g(104, 182, 1, R(-22, -10, 44, 16, '#E53935', 6, 3) + P('M-14-10l6-12h18l8 12z', '#E53935', 3) + R(-8, -20, 10, 8, '#B3E5FC', 1, 1.5) + C(-12, 8, 6, INK, 0) + C(12, 8, 6, INK, 0) + face(0, -2, 0.22))),
  X('ee', 'food', 'kringel', 'คริงเงล ขนมปังเกลียวอบเชย', 'Kringel, the braided cinnamon wreath', ['kringel', 'คริงเงล', 'kringle', 'คริงเกิล', 'braided cinnamon bread', 'ขนมปังเกลียวอบเชย', 'birthday bread', 'ขนมปังวันเกิด', 'estonian pastry', 'cardamom'],
    // a big round golden wreath of twisted dough, the cut braid showing swirls of cinnamon filling, dusted with sugar, on a round board with a cinnamon stick
    E(120, 140, 104, 70, '#C8A165', 3) + E(120, 130, 80, 54, '#E0A458', 3.5) + E(120, 130, 40, 24, '#C8A165', 3)
    + Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return E(120 + 60 * Math.cos(a), 130 + 40 * Math.sin(a), 13, 9, k % 2 ? '#F6CB86' : '#E9B067', 2).replace('<ellipse', `<ellipse transform="rotate(${(a * 180) / Math.PI + 60} ${(120 + 60 * Math.cos(a)).toFixed(1)} ${(130 + 40 * Math.sin(a)).toFixed(1)})"`) + Lc(`M${(120 + 60 * Math.cos(a) - 4).toFixed(1)} ${(130 + 40 * Math.sin(a)).toFixed(1)}c3-4 6 0 3 4`, '#8D4E1A', 2); }).join('')
    + [[90, 100], [150, 100], [80, 150], [160, 154], [120, 172]].map(([x, y]) => C(x, y, 1.8, '#FFFFFF', 0)).join('') + face(120, 180, 0.38)
    + g(200, 196, 1, R(-24, -5, 48, 10, '#8D4E1A', 5, 2.5) + Lc('M-20 0h40', '#A0612A', 1.5), -14)),
  X('ee', 'culture', 'muhuslippers', 'รองเท้าแตะปักลายดอกไม้จากเกาะมูฮู', 'Embroidered slippers from Muhu island', ['muhu slippers', 'รองเท้าแตะมูฮู', 'muhu embroidery', 'ลายปักมูฮู', 'embroidered slippers', 'รองเท้าปักลาย', 'folk patterns', 'ลายพื้นเมือง', 'estonian handicraft', 'bright flowers'],
    // a pair of black felt slippers with pointed toes covered in bright embroidered flowers in red, orange, pink and green, little stitched leaves and a white cord trim round their edges
    [[78, 130, -12], [162, 138, 12]].map(([x, y, r]) => g(x, y, 1, P('M-28 60c-8-40-8-90 8-110 14-12 30-12 38 4 16 30 10 80 2 106-10 10-38 10-48 0z', '#263238', 3.5)
      + Lc('M-30 60c-10-40-8-88 10-108', '#FFFFFF', 2) + [[0, -18, '#E53935', 6], [-2, 14, '#FF8F00', 7], [4, 42, '#F06292', 6]].map(([a, b, c, r]) => C(a, b, r, c, 1.5) + C(a, b, r * 0.4, '#FFEB3B', 0)).join('')
      + [[-10, -6], [12, 12], [-12, 26], [14, 34]].map(([a, b]) => E(a, b, 4, 2, '#66BB6A', 1)).join('') + (x < 100 ? face(2, 50, 0.24) : ''), r)).join('')),

  // ---------- Tallinn
  L('ee/tallinn/landmark-tallhermann.v1.svg', 'หอคอยทอลล์แฮร์มันน์บนปราสาททูมเปีย', 'Tall Hermann tower on Toompea Castle', ['tall hermann', 'หอคอยทอลล์แฮร์มันน์', 'pikk hermann', 'ปิกก์แฮร์มันน์', 'toompea castle', 'ปราสาททูมเปีย', 'pink parliament building', 'ตึกรัฐสภาสีชมพู', 'castle wall', 'flag tower'], 'หาหอคอยหินสูงหลังตึกสีชมพู', 'Find the tall stone tower behind the pink building',
    // a tall square grey stone tower with a ring of battlements and a tiny lookout on top, rising from an old castle wall beside a pretty pink baroque building, a green slope below
    sky('#E1F5FE') + P('M-4 190c60-14 180-14 248 0v54H-4z', '#7CB342', 3)
    + R(140, 30, 54, 160, '#9E9E9E', 2, 3.5) + Array.from({ length: 5 }, (_, k) => R(140 + k * 11.5, 20, 8, 12, '#9E9E9E', 1, 2)).join('') + R(156, 4, 22, 18, '#BDBDBD', 2, 2.5) + Lc('M167 4v-6', INK, 2)
    + [[150, 60], [176, 60], [150, 100], [176, 100]].map(([x, y]) => R(x, y, 8, 14, '#37474F', 3, 1.5)).join('') + Lc('M146 140l40 0M150 160l30 0', '#8D8D8D', 2)
    + R(14, 100, 126, 90, '#F8BBD0', 2, 3.5) + P('M10 100l20-20h94l20 20z', '#8D6E63', 3) + Array.from({ length: 2 }, (_, r) => [26, 52, 78, 104].map((x) => R(x, 112 + r * 32, 14, 20, '#FFFFFF', 2, 2)).join('')).join('')
    + R(-4, 160, 18, 30, '#9E9E9E', 0, 3) + face(167, 130, 0.38) + kid(80, 214, '#1E88E5', 0.9)),
  L('ee/tallinn/landmark-linnahall.v1.svg', 'ลินนาฮอลล์ ปิรามิดบันไดคอนกรีตริมทะเล', 'Linnahall, the stepped concrete hall by the sea', ['linnahall', 'ลินนาฮอลล์', 'concrete steps', 'บันไดคอนกรีต', 'seaside terraces', 'ลานขั้นบันไดริมทะเล', 'tallinn bay', 'อ่าวทาลลินน์', 'climb to the roof', 'harbour view'], 'หาขั้นบันไดกว้างๆ ที่พาขึ้นไปบนหลังคา', 'Find the wide steps leading up onto the roof',
    // a long low building like a stepped grey pyramid with wide stairs climbing to a flat roof, grass and wild flowers growing in its cracks, children on the top looking at the sea and a ship
    sky('#E3F2FD') + P('M-4 160h248v84H-4z', '#1E88E5', 0) + Lc('M150 200h40M190 220h40', '#90CAF9', 3) + g(206, 156, 1, P('M-24 0h48l-6 10h-36z', '#FFFFFF', 2.5) + R(-10, -10, 20, 10, '#FFFFFF', 2, 2) + Lc('M0-10v-8', INK, 2))
    + P('M-4 200h160l-20-20H16l-20 20z', '#BDBDBD', 3) + P('M16 180h120l-16-18H36z', '#BDBDBD', 3) + P('M36 162h84l-14-16H50z', '#BDBDBD', 3) + R(-4, 200, 160, 44, '#9E9E9E', 0, 3)
    + Array.from({ length: 6 }, (_, k) => Lc(`M60 ${196 - k * 8}h40`, '#ECEFF1', 2)).join('') + [[20, 196], [130, 176], [44, 160]].map(([x, y]) => Lc(`M${x} ${y}l2-8M${x + 4} ${y}l4-6`, '#7CB342', 2.5) + C(x + 6, y - 7, 2, '#FFEB3B', 0)).join('')
    + face(80, 220, 0.4) + kid(70, 146, '#E53935', 0.8) + kid(96, 146, '#FFCA28', 0.8)),
  L('ee/tallinn/landmark-rotermann.v1.svg', 'ย่านโรเทอร์มันน์ ตึกใหม่หลังคาซิกแซก', 'The Rotermann Quarter and its zigzag roofs', ['rotermann quarter', 'ย่านโรเทอร์มันน์', 'rotermanni kvartal', 'โรเทอร์มันนีควาร์ตัล', 'old factories', 'โรงงานเก่า', 'zigzag roofs', 'หลังคาซิกแซก', 'modern architecture', 'limestone and glass'], 'หาหลังคาที่หยักขึ้นลงเหมือนฟันเลื่อย', 'Find the roof that goes up and down like a saw',
    // old grey limestone factory buildings with a tall brick chimney, a new building of glass and copper with a zigzag sawtooth roof perched on top of them, and a boxy one cantilevered out, children in the lane
    sky('#E1F5FE') + R(176, 40, 20, 120, '#C0603A', 2, 3) + Lc('M176 60h20M176 90h20', '#A1502E', 2)
    + R(10, 120, 120, 90, '#CFCFC4', 2, 3.5) + Array.from({ length: 4 }, (_, k) => R(22 + k * 28, 140, 14, 24, '#90A4AE', 6, 2)).join('') + R(130, 140, 100, 70, '#CFCFC4', 2, 3) + [146, 176, 206].map((x) => R(x, 156, 12, 20, '#90A4AE', 6, 2)).join('')
    + P('M10 120V80l24-24 24 24 24-24 24 24 24-24v64z', '#B87333', 3.5) + [34, 58, 82, 106].map((x) => R(x - 8, 82, 16, 24, '#B3E5FC', 1, 2)).join('')
    + P('M150 140v-30h86v30z', '#455A64', 3) + R(156, 116, 74, 16, '#B3E5FC', 1, 2) + R(-4, 210, 248, 34, '#B0BEC5', 0, 3) + face(70, 186, 0.4) + kid(150, 232, '#E53935', 0.9) + kid(190, 232, '#FFCA28', 0.9)),
  L('ee/tallinn/landmark-patkulisteps.v1.svg', 'บันไดไม้ปัตกูลีขึ้นเนินทูมเปีย', 'The wooden Patkuli steps up to Toompea', ['patkuli steps', 'บันไดปัตกูลี', 'patkuli trepp', 'ปัตกูลีเทรปป์', 'wooden stairs', 'บันไดไม้', 'climb toompea', 'ขึ้นเนินทูมเปีย', 'limestone cliff', 'old town steps'], 'หาบันไดไม้ที่ซิกแซกขึ้นหน้าผา', 'Find the wooden stairs zigzagging up the cliff',
    // a long wooden staircase zigzagging up a pale limestone cliff with leafy trees, old town wall and a round tower at the top, a child halfway up and another waving from the top
    sky('#E3F2FD') + P('M60 244V60h184v184z', '#E0DBC8', 3.5) + Lc('M80 100h30M150 80h40M120 140h50M90 190h40M180 200h40', '#C8C0A4', 2)
    + R(70, 40, 174, 22, '#BDBDBD', 1, 3) + Array.from({ length: 8 }, (_, k) => R(72 + k * 22, 30, 12, 12, '#BDBDBD', 1, 2)).join('') + R(200, 4, 36, 56, '#BDBDBD', 2, 3) + P('M196 4l22-20 22 20z', '#C0503A', 3)
    + Lc('M-4 236L120 176 40 116 140 60', '#A1673F', 12) + Lc('M-4 236L120 176 40 116 140 60', INK, 1.5) + Lc('M4 226L118 170M40 110l90-50', INK, 1.5)
    + Array.from({ length: 6 }, (_, k) => Lc(`M${10 + k * 20} ${232 - k * 10}v-14`, INK, 1.5)).join('')
    + g(30, 214, 1, Lc('M0 0v-20', '#6D4C41', 4) + C(0, -32, 18, '#66BB6A', 2.5)) + g(220, 210, 1, Lc('M0 0v-20', '#6D4C41', 4) + C(0, -32, 20, '#43A047', 2.5))
    + face(170, 130, 0.4) + kid(80, 196, '#E53935', 0.9) + kid(140, 56, '#FFCA28', 0.8)),
  L('ee/tallinn/landmark-kumu.v1.svg', 'พิพิธภัณฑ์ศิลปะคูมูทองแดงเขียวโค้งในหน้าผาหิน', 'Kumu, the curved art museum in the limestone bank', ['kumu art museum', 'พิพิธภัณฑ์ศิลปะคูมู', 'kumu', 'คูมู', 'curved copper wall', 'กำแพงทองแดงโค้ง', 'limestone bank', 'หน้าผาหินปูน', 'kadriorg park', 'art museum'], 'หากำแพงทองแดงเขียวที่โค้งเหมือนชิ้นแตงโม', 'Find the green copper wall curved like a slice of melon',
    // a modern museum building tucked into a limestone slope: a sweeping curved wall of green copper like a slice of melon, a wedge of pale stone and a glass entrance, park trees around
    sky('#E8F5E9') + P('M-4 100c80-20 170-20 248 0v144H-4z', '#81C784', 0) + P('M-4 150h248v94H-4z', '#CFCFC4', 3)
    + P('M20 150c20-70 140-90 200-60v60z', '#4DB6AC', 3.5) + Lc('M40 140c30-40 110-60 170-44M60 146c30-30 90-46 150-34', '#80CBC4', 2.5) + P('M150 150V96l70-6v60z', '#E0DBC8', 3)
    + R(90, 136, 60, 14, '#B3E5FC', 1, 2.5) + Lc('M100 136v14M120 136v14M140 136v14', '#E1F5FE', 2)
    + Array.from({ length: 3 }, (_, r) => Lc(`M-4 ${170 + r * 22}h248`, '#B8B09A', 2)).join('') + g(20, 110, 1, Lc('M0 0v-14', '#6D4C41', 4) + C(0, -24, 14, '#43A047', 2.5)) + g(226, 92, 1, Lc('M0 0v-14', '#6D4C41', 4) + C(0, -24, 14, '#66BB6A', 2.5))
    + face(90, 120, 0.4) + kid(120, 232, '#7E57C2', 0.9)),
];

export default { places: {}, items };
