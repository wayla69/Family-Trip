// Hong Kong and Macau — no flags (docs/STOCK-ART.md §8), each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const HK = { k1: '#C62828', k2: '#1565C0', k3: '#FFEBEE' };
const HC = { k1: '#AD1457', k2: '#283593', k3: '#FCE4EC' };
const MO = { k1: '#2E7D32', k2: '#F9A825', k3: '#E8F5E9' };
const MC = { k1: '#00838F', k2: '#E65100', k3: '#E0F7FA' };

const items = [
  // ---------- Hong Kong
  { id: 'hk.stamp', cat: 'stamp', file: 'hk/stamp.v1.svg', name: nm('ตราประทับฮ่องกง', 'Hong Kong stamp'), kw: ['hong kong', 'ฮ่องกง', '香港'],
    // a wooden junk boat with three red batwing sails
    svg: countryStamp({ name: 'HONG KONG', ...HK, emblem: P('M52 124h96l-12 18H66z', '#8D6E63', 3) + [[72, 50, 26], [100, 40, 32], [128, 56, 22]].map(([x, top, w]) => P(`M${x} ${top}c${w * 0.6} 20 ${w * 0.6} 50 0 74h-4V${top}z`, '#E53935', 3) + Lc(`M${x} ${top + 18}h${w * 0.4}M${x} ${top + 40}h${w * 0.5}`, '#B71C1C', 2)).join('') + Lc('M40 148c20-6 40 6 60 0s40 6 60 0', '#1E88E5', 4) }) },
  { id: 'hk.hello', cat: 'hello', file: 'hk/hello.v1.svg', name: nm('เหน่ยโหว สวัสดี', 'Nei hou, hello'), kw: ['nei hou', 'néih hóu', 'เหน่ยโหว', 'hello', 'สวัสดี', 'cantonese', 'กวางตุ้ง', 'lion dance'],
    // a child holding up a little lion-dance head with big eyes and a fluffy fringe, a red ribbon trailing
    svg: free(P('M80 214c0-36 16-54 40-54s40 18 40 54z', '#FFCA28') + Lc('M120 164v50', '#F9A825', 3) + C(120, 122, 30, '#FFE0BD') + P('M90 116c0-24 14-36 30-36s30 12 30 36c-8-8-18-12-30-12s-22 4-30 12z', INK)
      + g(178, 84, 1, P('M-34 10c0-30 14-44 34-44s34 14 34 44c-10 10-58 10-68 0z', '#E53935') + Lc('M-30-20c10-12 50-12 60 0', '#FFCA28', 6) + [[-14, -6], [14, -6]].map(([x, y]) => C(x, y, 9, '#FFFFFF', 3) + C(x, y, 4, INK, 0)).join('') + R(-12, 4, 24, 8, '#FFFFFF', 3, 2.5), -10)
      + Lc('M150 150c10-20 16-34 18-46', '#FFE0BD', 12) + Lc('M210 104c10 30 0 60 14 90', '#E53935', 5) + face(120, 128, 0.55)) },
  { id: 'hk.food.eggwaffle', cat: 'food', file: 'hk/food-eggwaffle.v1.svg', name: nm('ขนมไข่ฮ่องกง', 'Egg waffle'), kw: ['egg waffle', 'gai daan jai', 'ขนมไข่', 'ขนมไข่ฮ่องกง', '雞蛋仔', 'street snack', 'ของว่างข้างทาง'], colour: true,
    // a golden sheet of bubbly egg waffle rolled into a cone, sticking out of a paper bag
    svg: free(P('M70 120h100l-14 100H84z', '#FFFFFF') + Lc('M86 140h68', '#E53935', 5) + g(120, 90, 1, P('M-50 40c-10-40 10-80 50-90 40 10 60 50 50 90z', '#F4B33E') + Array.from({ length: 14 }, (_, k) => C(-36 + (k % 4) * 24, -30 + Math.floor(k / 4) * 22, 10, '#F9C75E', 2.5)).join(''), -6) + face(120, 180, 0.5)) },
  { id: 'hk.food.pineapplebun', cat: 'food', file: 'hk/food-pineapplebun.v1.svg', name: nm('ขนมปังสับปะรด', 'Pineapple bun'), kw: ['pineapple bun', 'bolo bao', 'ขนมปังสับปะรด', '菠蘿包', 'cha chaan teng', 'ร้านชาฮ่องกง', 'butter'], colour: true,
    // a round bun with a crackly golden sugar top in a criss-cross pattern, a thick slab of butter tucked in the middle
    svg: free(E(120, 170, 90, 36, '#ECEFF1') + P('M40 150c0-60 160-60 160 0 0 20-160 20-160 0z', '#E9A64C') + P('M48 130c10-40 134-40 144 0-20 10-124 10-144 0z', '#F6C04E', 3)
      + Lc('M70 100l40 40M100 94l50 46M140 96l36 36M80 132l40-40M120 136l40-44M160 134l24-28', '#D68A1F', 3) + R(82, 146, 76, 14, '#FFF59D', 3, 3) + face(120, 168, 0.5)) },
  { id: 'hk.food.milktea', cat: 'food', file: 'hk/food-milktea.v1.svg', name: nm('ชานมฮ่องกง', 'Hong Kong milk tea'), kw: ['milk tea', 'ชานม', 'ชานมฮ่องกง', '奶茶', 'cha chaan teng', 'ร้านชาฮ่องกง', 'silk stocking tea'], colour: true,
    // a thick white diner cup on a saucer, smooth caramel-brown tea, a little steam, a teapot with a cloth strainer behind
    svg: free(P('M140 40h60v20c0 30-20 40-30 40s-30-10-30-40z', '#FFFFFF') + P('M150 100c4 20 36 20 40 0', '#ECEFF1', 3) + Lc('M150 104c-2 10 0 30 10 40M190 104c2 10 0 30-10 40', '#BCAAA4', 3)
      + E(100, 206, 70, 14, '#FFFFFF') + P('M50 120h100l-10 76c-2 8-6 12-14 12H74c-8 0-12-4-14-12z', '#FFFFFF') + E(100, 120, 50, 10, '#C88A55') + Lc('M150 140c24 0 24 34 0 34', INK, 6) + Lc('M84 104c-6-12 6-16 0-28M112 104c-6-12 6-16 0-28', '#BDBDBD', 3) + face(100, 160, 0.55)) },
  { id: 'hk.food.fishballs', cat: 'food', file: 'hk/food-fishballs.v1.svg', name: nm('ลูกชิ้นปลาแกงกะหรี่', 'Curry fish balls'), kw: ['fish balls', 'ลูกชิ้นปลา', 'curry fish balls', 'ลูกชิ้นปลาแกงกะหรี่', '咖喱魚蛋', 'street food', 'mong kok', 'มงก๊ก'], colour: true,
    // five golden fish balls on a bamboo skewer dripping with orange curry sauce, a paper cup beside
    svg: free(Lc('M50 220L190 30', '#D7A86E', 6) + [[70, 192], [92, 162], [114, 132], [136, 102], [158, 72]].map(([x, y]) => C(x, y, 18, '#F6B73C')).join('') + [[78, 206], [122, 146], [166, 86]].map(([x, y]) => P(`M${x - 4} ${y}c0 8 8 8 8 0l-4-10z`, '#FB8C00', 2.5)).join('')
      + P('M170 160h50l-8 60h-34z', '#FFFFFF') + Lc('M174 176h42', '#FB8C00', 4) + face(114, 132, 0.4)) },
  { id: 'hk.animal.dolphin', cat: 'animal', file: 'hk/animal-dolphin.v1.svg', name: nm('โลมาสีชมพู', 'Pink dolphin'), kw: ['pink dolphin', 'โลมาสีชมพู', 'chinese white dolphin', 'tai o', 'ไทโอ', 'lantau', 'ลันเตา', 'dolphin watching'], colour: true,
    // a soft-pink dolphin arcing out of the water with a long beak, a splash and a few drops
    svg: free(P('M-4 190c40-10 80 6 120 0s80-10 128 0v40H-4z', '#4FC3F7') + P('M40 170c10-70 80-110 140-90l30-10-12 24c20 20 20 50 8 70-30-30-80-20-110 14z', '#F8BBD0') + P('M150 80l14-26 8 30z', '#F48FB1', 3) + P('M120 150c10 10 30 14 46 6', 'none', 4)
      + P('M184 100c20 0 34-6 44-14-6 14-20 22-40 24z', '#F8BBD0', 3) + [[40, 180], [60, 174], [26, 168]].map(([x, y]) => C(x, y, 5, '#E1F5FE', 2.5)).join('') + face(176, 108, 0.5)) },
  { id: 'hk.transport.tram', ch: '🚋', cat: 'transport', file: 'hk/transport-tram.v1.svg', name: nm('รถรางติ๊งติ๊ง', 'Ding Ding tram'), kw: ['ding ding', 'ติ๊งติ๊ง', 'tram', 'รถราง', 'hong kong tramways', 'double-decker tram', 'รถรางสองชั้น', 'causeway bay', 'central'], colour: true,
    // a tall narrow green double-decker tram, two rows of windows, a pole up to the wire, little wheels on the track
    svg: free(Lc('M10 30h220', INK, 3) + Lc('M140 34l-10 30', INK, 4) + R(70, 60, 100, 140, '#2E7D32', 10) + R(66, 56, 108, 12, '#1B5E20', 6) + [76, 106, 136].map((x) => R(x, 76, 24, 30, '#FFF8E1', 3, 3) + R(x, 130, 24, 30, '#FFF8E1', 3, 3)).join('')
      + R(70, 116, 100, 8, '#FFCA28', 0, 3) + R(70, 168, 100, 10, '#FFCA28', 0, 3) + [[94, 204], [146, 204]].map(([x, y]) => C(x, y, 9, INK)).join('') + Lc('M10 214h220', '#9E9E9E', 5) + face(120, 186, 0.4)) },
  { id: 'hk.transport.starferry', ch: '⛴️', cat: 'transport', file: 'hk/transport-starferry.v1.svg', name: nm('เรือสตาร์เฟอร์รี', 'Star Ferry'), kw: ['star ferry', 'สตาร์เฟอร์รี', 'ferry', 'เรือข้ามฟาก', 'victoria harbour', 'อ่าววิกตอเรีย', 'tsim sha tsui', 'จิมซาจุ่ย', 'wan chai'], colour: true,
    // a little two-deck ferry, green below and white above, a round wheelhouse at each end, ripples in the harbour
    svg: free(P('M-4 176c40-6 200-6 248 0v50H-4z', '#4FC3F7') + Lc('M20 196c20-6 40 6 60 0M150 200c20-6 40 6 60 0', '#FFFFFF', 3) + P('M20 150h200c-6 20-20 30-36 30H56c-16 0-30-10-36-30z', '#2E7D32')
      + R(36, 110, 168, 40, '#FFFFFF', 6) + [52, 80, 108, 136, 164].map((x) => R(x, 120, 20, 16, '#B3E5FC', 3, 3)).join('') + R(30, 102, 180, 10, '#2E7D32', 4) + [[40, 96], [200, 96]].map(([x, y]) => C(x, y, 10, '#FFFFFF', 3)).join('') + star(120, 88, 12, '#FFCA28', 3) + face(120, 162, 0.4)) },
  { id: 'hk.culture.neon', cat: 'culture', file: 'hk/culture-neon.v1.svg', name: nm('ป้ายไฟนีออน', 'Neon signs'), kw: ['neon', 'นีออน', 'neon signs', 'ป้ายไฟ', 'mong kok', 'มงก๊ก', 'temple street', 'ถนนเทมเปิล', 'night market', 'ตลาดกลางคืน'], colour: true,
    // a dark street with glowing signs hanging out over it: a pink fish, a blue bowl of noodles, a yellow star, no letters
    svg: free(R(10, 20, 60, 200, '#37474F', 4) + R(170, 20, 60, 200, '#37474F', 4) + Lc('M70 50h40M170 80h-40M70 140h30', '#B0BEC5', 4)
      + P('M110 30c20-20 50-20 60 0-10 20-40 20-60 0zM110 30l-14-12v24z', 'none', 0) + Lc('M112 50c20-20 50-20 60 0-10 20-40 20-60 0zM112 50l-14-12v24z', '#FF4081', 6) + C(158, 48, 3, '#FF4081', 0)
      + Lc('M90 110h60c0 20-14 30-30 30s-30-10-30-30zM104 96l10-10M126 96l10-10', '#40C4FF', 6) + star(86, 170, 20, 'none', 6).replace('fill="none"', 'fill="none" stroke="#FFD740"') + face(120, 122, 0.4)) },
  // the city
  { id: 'hk-hongkong.stamp', cat: 'stamp', file: 'hk/hongkong/stamp.v1.svg', name: nm('ตราประทับเกาะฮ่องกง', 'Hong Kong city stamp'), kw: ['hong kong', 'ฮ่องกง', 'kowloon', 'เกาลูน', 'victoria peak'],
    // a round bamboo dim sum steamer with its lid tipped open, three pleated see-through shrimp dumplings inside, a curl of steam
    svg: cityStamp('hhk-st', { name: 'HONG KONG', sub: 'DIM SUM', ...HC, emblem: P('M50 108h100v24c0 10-22 16-50 16s-50-6-50-16z', '#D7A86E', 3) + Lc('M50 120h100', '#A1673F', 2.5) + E(100, 108, 50, 12, '#E9C48A', 3) + [[78, 102], [100, 98], [122, 102]].map(([x, y]) => P(`M${x - 13} ${y + 4}c0-14 26-14 26 0z`, '#FFF8F0', 2.5) + E(x, y - 2, 6, 4, '#FFAB91', 0) + Lc(`M${x - 6} ${y - 6}l3 4M${x} ${y - 8}v4M${x + 6} ${y - 6}l-3 4`, '#BCAAA4', 1.5)).join('') + g(140, 70, 1, E(0, 0, 32, 10, '#D7A86E', 3), -24) + Lc('M84 84c-6-8 6-12 0-20M112 82c-6-8 6-12 0-20', '#BDBDBD', 2.5) }) },
  { id: 'hk-hongkong.day.harbour', cat: 'day', file: 'hk/hongkong/day-harbour.v1.svg', name: nm('อ่าววิกตอเรียยามค่ำ', 'Victoria Harbour at night'), kw: ['victoria harbour', 'อ่าววิกตอเรีย', 'symphony of lights', 'ซิมโฟนีออฟไลต์', 'skyline', 'avenue of stars', 'tsim sha tsui', 'จิมซาจุ่ย', 'night view', 'วิวกลางคืน'],
    // a navy night sky, the tall tower skyline lit up with coloured beams sweeping across, green hills behind, reflections in the harbour
    svg: scene('hhk-d1', '#1A237E', [[60, 40], [180, 30], [140, 60]].map(([x, y]) => C(x, y, 2, '#FFFFFF', 0)).join('') + P('M-4 120c40-40 80-50 120-30s80-30 128 10v40H-4z', '#1B5E20') + Lc('M60 120L20 30M150 110l60-80M110 100l10-80', '#FF80AB', 3)
      + [[20, 90, 20], [44, 70, 18], [66, 96, 22], [90, 50, 20], [114, 80, 18], [134, 40, 22], [160, 76, 22], [184, 66, 18], [206, 92, 22]].map(([x, top, w]) => R(x, top, w, 150 - top, '#3949AB') + Array.from({ length: 3 }, (_, k) => R(x + 5, top + 12 + k * 18, w - 10, 6, ['#FFF59D', '#80DEEA', '#F8BBD0'][(x + k) % 3], 1, 2)).join('')).join('')
      + P('M-4 150h248v100H-4z', '#283593') + [30, 80, 130, 180, 214].map((x, k) => Lc(`M${x} 160v${20 + (k % 2) * 16}`, ['#FFF59D', '#80DEEA', '#F8BBD0'][k % 3], 4)).join('') + P('M140 200h50l-6 8h-38z', '#2E7D32', 3) + R(146, 190, 38, 10, '#FFFFFF', 2, 3)) },
  { id: 'hk-hongkong.landmark.peaktram', cat: 'landmark', file: 'hk/hongkong/landmark-peaktram.v1.svg', name: nm('รถรางพีคแทรม', 'The Peak Tram'), kw: ['peak tram', 'พีคแทรม', 'victoria peak', 'วิคตอเรียพีค', 'the peak', 'เดอะพีค', 'sky terrace', 'lookout'], colour: true, spot: nm('หารถรางที่ไต่ขึ้นเขาชันมาก', 'Find the tram climbing the very steep hill'),
    // a red tram car tilted up a steep green hillside on its track, tall towers below it, the curved lookout building at the top
    svg: free(P('M-4 230L200 50l44 0v180z', '#66BB6A') + P('M178 54h60l-6-14h-48z', '#ECEFF1') + R(184, 30, 48, 12, '#ECEFF1', 3) + Lc('M-4 222L196 50', '#8D6E63', 6)
      + [[20, 150], [44, 130], [68, 160]].map(([x, top]) => R(x, top, 20, 230 - top, '#90A4AE') + Lc(`M${x + 5} ${top + 10}v${190 - top}`, '#FFF59D', 3)).join('')
      + g(120, 120, 1, R(-44, -22, 88, 36, '#C62828', 6) + [-34, -12, 10].map((x) => R(x, -14, 18, 14, '#FFF8E1', 2, 2.5)).join('') + R(-44, 10, 88, 8, '#7F0000', 2), -41) + face(118, 122, 0.4)) },
  { id: 'hk-hongkong.landmark.clocktower', cat: 'landmark', file: 'hk/hongkong/landmark-clocktower.v1.svg', name: nm('หอนาฬิกาจิมซาจุ่ย', 'The Tsim Sha Tsui clock tower'), kw: ['clock tower', 'หอนาฬิกา', 'tsim sha tsui', 'จิมซาจุ่ย', 'harbour city', 'avenue of stars', 'star ferry pier', 'waterfront'], colour: true, spot: nm('หาหอนาฬิกาอิฐแดงริมน้ำ', 'Find the red-brick clock tower by the water'),
    // a slim red-brick-and-granite tower with white stone bands, a clock face near the top, a little domed cupola and a lightning rod, palms beside
    svg: free(R(92, 70, 56, 150, '#D84315') + [100, 130, 160, 190].map((y) => R(92, y, 56, 6, '#FFF3E0', 0, 2.5)).join('') + R(86, 214, 68, 8, '#BCAAA4', 2) + R(88, 54, 64, 18, '#FFF3E0', 3)
      + P('M98 54c0-20 44-20 44 0z', '#BCAAA4') + Lc('M120 34V10', INK, 3) + C(120, 96, 16, '#FFFFFF', 4) + Lc('M120 96v-10M120 96l8 4', INK, 3) + R(110, 180, 20, 34, '#5D4037', 6)
      + [[40, 220], [196, 220]].map(([x, y]) => Lc(`M${x} ${y}c-2-40 2-70 8-90`, '#8D6E63', 6) + P(`M${x + 8} ${y - 90}c-20-10-30 0-36 10 14-6 24-6 36-10zM${x + 8} ${y - 90}c20-10 30 0 36 10-14-6-24-6-36-10z`, '#43A047', 3)).join('') + face(120, 150, 0.4)) },
  { id: 'hk-hongkong.landmark.ngongping', cat: 'landmark', file: 'hk/hongkong/landmark-ngongping.v1.svg', name: nm('กระเช้านองปิง', 'The Ngong Ping cable car'), kw: ['ngong ping', 'นองปิง', 'ngong ping 360', 'cable car', 'กระเช้า', 'lantau', 'ลันเตา', 'crystal cabin', 'glass-bottom', 'tung chung', 'ตุงชุง'], colour: true, spot: nm('หากระเช้าที่พื้นเป็นกระจกใส', 'Find the cable car with a glass floor'),
    // a rounded cable-car cabin with a see-through glass floor dangling high over the green island peaks and the blue sea, an airport plane taking off far below
    svg: free(P('M-4 230c20-80 60-120 90-110s50 50 80 30 50-40 78-10v90z', '#43A047') + P('M-4 230h248v-30c-40-6-80 0-120 0s-80-10-128 0z', '#4FC3F7') + Lc('M-4 30l248 40', INK, 4) + Lc('M120 50v24', INK, 4)
      + R(84, 74, 72, 56, '#E53935', 14) + R(92, 82, 56, 30, '#E1F5FE', 6, 3) + P('M90 120h60c0 10-6 16-14 16h-32c-8 0-14-6-14-16z', '#B3E5FC') + Lc('M98 128l10 4M120 126l10 6', '#FFFFFF', 2)
      + g(40, 196, 1, P('M-16 0h30l6-4h4l-4 6h-36z', '#FFFFFF', 2.5) + Lc('M0-2l-6-6', INK, 2.5), -12) + face(120, 98, 0.45)) },
  { id: 'hk-hongkong.landmark.taio', cat: 'landmark', file: 'hk/hongkong/landmark-taio.v1.svg', name: nm('บ้านใต้ถุนสูงไทโอ', 'The stilt houses of Tai O'), kw: ['tai o', 'ไทโอ', 'fishing village', 'หมู่บ้านชาวประมง', 'stilt houses', 'บ้านใต้ถุนสูง', 'lantau', 'ลันเตา', 'dried seafood'], colour: true, spot: nm('หาบ้านที่ยืนบนขาไม้กลางน้ำ', 'Find the houses standing on wooden legs in the water'),
    // tin-roofed huts of patched colours standing on wooden stilts over a creek, a little sampan, dried fish on a line
    svg: free(P('M-4 176h248v50H-4z', '#4DB6AC') + [[50, 110, '#90A4AE', '#FFCC80'], [120, 100, '#B0BEC5', '#80DEEA'], [190, 116, '#78909C', '#F8BBD0']].map(([x, y, roof, wall]) => R(x - 30, y, 60, 50, wall) + P(`M${x - 36} ${y + 4}l36-24 36 24z`, roof) + R(x - 8, y + 22, 16, 28, '#8D6E63', 2) + [x - 24, x - 4, x + 16].map((sx) => Lc(`M${sx} ${y + 50}v${200 - y - 50}`, '#6D4C41', 5)).join('')).join('')
      + Lc('M10 70l60 10', INK, 2) + [24, 40, 56].map((x) => P(`M${x} ${72 + (x - 10) / 6}c-4 6-4 14 0 18 4-4 4-12 0-18z`, '#BCAAA4', 2.5)).join('') + P('M150 196h60l-8 10h-44z', '#A1673F', 3) + Lc('M168 196c4-10 12-14 20-14', INK, 3) + face(120, 130, 0.4)) },
  // ---------- Macau
  { id: 'mo.stamp', cat: 'stamp', file: 'mo/stamp.v1.svg', name: nm('ตราประทับมาเก๊า', 'Macau stamp'), kw: ['macau', 'macao', 'มาเก๊า', '澳門'],
    // a Portuguese egg tart with a caramel-spotted top
    svg: countryStamp({ name: 'MACAU', ...MO, emblem: P('M54 106c0 24 20 38 46 38s46-14 46-38z', '#E9A64C', 3) + Lc('M58 112l8 26M80 118l2 24M100 120v24M120 118l-2 24M142 112l-8 26', '#C8862F', 2.5) + E(100, 104, 44, 14, '#FFE082', 3) + [[84, 102], [104, 98], [118, 106], [94, 108]].map(([x, y]) => E(x, y, 6, 3, '#8D5524', 0)).join('') }) },
  { id: 'mo.hello', cat: 'hello', file: 'mo/hello.v1.svg', name: nm('เหน่ยโหว โอลา สวัสดี', 'Nei hou, olá, hello'), kw: ['nei hou', 'olá', 'ola', 'โอลา', 'hello', 'สวัสดี', 'cantonese', 'portuguese', 'โปรตุเกส'],
    // a child skipping along the black-and-white wave pavement holding a paper bag of almond cookies
    svg: free(P('M10 210c20-10 40 10 60 0s40 10 60 0 40 10 60 0 30 6 40 0v20H10z', INK) + Lc('M10 220c20-10 40 10 60 0s40 10 60 0 40 10 60 0', '#FFFFFF', 3)
      + P('M88 196l8-40h48l8 40z', '#26A69A') + Lc('M100 196l-6 14M140 196l6 14', '#FFE0BD', 8) + C(120, 112, 30, '#FFE0BD') + P('M90 108c0-24 14-36 30-36s30 12 30 36c-4-14-16-20-30-20s-26 6-30 20z', '#3E2723')
      + P('M150 160c10-6 18-10 26-10', 'none', 0) + Lc('M144 162l26-10', '#FFE0BD', 10) + R(168, 136, 34, 40, '#D7A86E', 3) + [[178, 132], [192, 130]].map(([x, y]) => C(x, y, 7, '#F6C04E', 2.5)).join('') + face(120, 118, 0.55)) },
  { id: 'mo.food.porkchopbun', cat: 'food', file: 'mo/food-porkchopbun.v1.svg', name: nm('ขนมปังหมูชอป', 'Pork chop bun'), kw: ['pork chop bun', 'ขนมปังหมูชอป', '豬扒包', 'taipa', 'ไทปา', 'rua do cunha', 'street food'], colour: true,
    // a crusty round bun split open around a thick golden pork chop with a little bone poking out, wrapped in paper
    svg: free(P('M40 170h160l-20 50H60z', '#FFFFFF') + Lc('M60 186h120', '#2E7D32', 4) + P('M40 150c0-50 160-50 160 0z', '#E9A64C') + Lc('M80 124l10 10M120 116l6 10M160 124l-8 10', '#C8862F', 3)
      + P('M30 156c20-14 160-14 180 0-4 10-176 10-180 0z', '#B5651D') + Lc('M196 150l24-10', '#FFF8E1', 7) + C(222, 138, 5, '#FFF8E1', 3) + P('M40 168c0 14 160 14 160 0z', '#F4C27A') + face(120, 140, 0.5)) },
  { id: 'mo.food.almondcookie', cat: 'food', file: 'mo/food-almondcookie.v1.svg', name: nm('คุกกี้อัลมอนด์มาเก๊า', 'Macau almond cookies'), kw: ['almond cookies', 'คุกกี้อัลมอนด์', '杏仁餅', 'souvenir', 'ของฝาก', 'senado square', 'jerky street'], colour: true,
    // a stack of round crumbly almond cookies, a whole almond pressed in the top one, a little tin box beside
    svg: free(R(140, 110, 80, 100, '#E53935', 8) + R(140, 100, 80, 18, '#C62828', 6) + C(180, 160, 18, '#FFCA28', 3)
      + [0, 1, 2, 3].map((k) => E(80, 200 - k * 26, 56, 18, '#E0B07A')).join('') + E(80, 118, 56, 16, '#EBC48F') + P('M70 114c4-12 16-12 20 0-4 8-16 8-20 0z', '#A1673F', 3) + [[56, 120], [104, 116]].map(([x, y]) => C(x, y, 2.5, '#C8862F', 0)).join('') + face(80, 176, 0.5)) },
  { id: 'mo.culture.calcada', cat: 'culture', file: 'mo/culture-calcada.v1.svg', name: nm('ทางเดินลายคลื่น', 'Wave-pattern pavement'), kw: ['calçada', 'calcada', 'portuguese pavement', 'ทางเดินลายคลื่น', 'wave pavement', 'senado square', 'จัตุรัสเซนาโด', 'mosaic'], colour: true,
    // a square of little cobblestone tiles in black and white curling waves, a yellow shell set in the middle
    svg: free(R(20, 20, 200, 200, '#FFFFFF', 12) + [60, 100, 140, 180].map((y) => P(`M20 ${y}c30-24 50 24 80 0s50 24 80 0 30-12 40 0v14c-10-12-20 12-40 0s-50 24-80 0-50 24-80 0z`, INK, 0)).join('') + R(20, 20, 200, 200, 'none', 12)
      + P('M120 100c-20 0-26 26-20 40h40c6-14 0-40-20-40z', '#FFCA28', 3) + Lc('M110 104l4 36M120 100v40M130 104l-4 36', '#F9A825', 2) + face(120, 124, 0.4)) },
  // the city
  { id: 'mo-macau.stamp', cat: 'stamp', file: 'mo/macau/stamp.v1.svg', name: nm('ตราประทับเมืองมาเก๊า', 'Macau city stamp'), kw: ['macau', 'มาเก๊า', 'macau peninsula', 'cotai', 'โคไท', 'taipa', 'ไทปา'],
    // the slim Macau Tower with its round deck, a bungee line dropping from it
    svg: cityStamp('mmc-st', { name: 'MACAU', sub: 'MACAO', ...MC, emblem: P('M94 150l4-80h4l4 80z', '#B0BEC5', 3) + E(100, 70, 22, 8, '#26C6DA', 3) + R(84, 58, 32, 8, '#B0BEC5', 2, 2.5) + Lc('M100 58V36', INK, 3) + Lc('M122 70v40', '#E65100', 2) + C(122, 114, 4, '#E65100', 2) + Lc('M66 150h68', '#4DB6AC', 4) }) },
  { id: 'mo-macau.day.senado', cat: 'day', file: 'mo/macau/day-senado.v1.svg', name: nm('จัตุรัสเซนาโด', 'Senado Square'), kw: ['senado square', 'จัตุรัสเซนาโด', 'largo do senado', 'old town', 'เมืองเก่า', 'historic centre', 'ย่านมรดกโลก', 'walking'],
    // pastel yellow and pink colonial buildings with white arches and green shutters round a square paved in black-and-white waves, a fountain
    svg: scene('mmc-d1', '#E1F5FE', [[-4, 70, 60, '#FFE082'], [56, 60, 70, '#F8BBD0'], [126, 66, 60, '#FFE082'], [186, 74, 60, '#C5E1A5']].map(([x, top, w, c]) => R(x, top, w, 160 - top, c) + R(x - 2, top - 6, w + 4, 8, '#FFFFFF', 2) + Array.from({ length: Math.floor(w / 20) }, (_, k) => P(`M${x + 6 + k * 20} 160v-22c0-10 12-10 12 0v22z`, '#FFFFFF', 3) + R(x + 6 + k * 20, top + 14, 12, 18, '#43A047', 1, 2.5)).join('')).join('')
      + P('M-4 160h248v90H-4z', '#FFFFFF') + [178, 202, 226].map((y) => P(`M-4 ${y}c30-14 50 14 80 0s50 14 80 0 50 14 88 0v8c-38 14-58-14-88 0s-50-14-80 0-50-14-80 0z`, INK, 0)).join('')
      + E(120, 186, 28, 10, '#80DEEA') + R(114, 160, 12, 26, '#ECEFF1', 2) + C(120, 156, 8, '#80DEEA', 3)) },
  { id: 'mo-macau.landmark.stpauls', cat: 'landmark', file: 'mo/macau/landmark-stpauls.v1.svg', name: nm('ซากโบสถ์เซนต์ปอล', 'The Ruins of St Paul\'s'), kw: ['ruins of st pauls', 'ruins of st paul\'s', 'ซากโบสถ์เซนต์ปอล', 'st paul\'s', 'เซนต์ปอล', '大三巴', 'senado', 'world heritage', 'มรดกโลก'], colour: true, spot: nm('หาผนังโบสถ์ที่เหลือแค่ด้านหน้าบนบันได', 'Find the church wall with only its front left, at the top of the stairs'),
    // the tall stone front wall standing alone, stepping in four tiers to a triangle top, rows of arched niches (empty), three doors, the wide staircase below
    svg: free(P('M30 220l20-40h140l20 40z', '#BCAAA4') + Lc('M44 206h152M56 192h128', '#8D6E63', 3) + R(50, 110, 140, 70, '#D7B99A') + R(64, 70, 112, 40, '#D7B99A') + R(84, 44, 72, 26, '#D7B99A') + P('M96 44l24-24 24 24z', '#D7B99A')
      + [70, 105, 140].map((x) => P(`M${x} 180v-34c0-14 30-14 30 0v34z`, '#8D6E63')).join('') + [76, 104, 132, 160].map((x) => P(`M${x - 4} 102v-18c0-8 16-8 16 0v18z`, '#A1887F', 3)).join('') + [100, 140].map((x) => P(`M${x - 6} 66v-12c0-8 12-8 12 0v12z`, '#A1887F', 3)).join('')
      + Lc('M50 110h140M64 70h112M84 44h72', '#FFF3E0', 4) + face(120, 32, 0.3)) },
  { id: 'mo-macau.landmark.amatemple', cat: 'landmark', file: 'mo/macau/landmark-amatemple.v1.svg', name: nm('วัดอาม่า', 'A-Ma Temple'), kw: ['a-ma temple', 'วัดอาม่า', 'ama temple', '媽閣廟', 'barra', 'บาร์รา', 'incense coils', 'ขดธูป', 'old temple'], colour: true, spot: nm('หาขดธูปใหญ่ที่ห้อยจากหลังคา', 'Find the big incense coils hanging from the roof'),
    // the old stone gate with curled-up tiled roof corners on a rocky hillside, round red lanterns, big spiral incense coils hanging under the eaves (no statues)
    svg: free(P('M-4 220c20-40 60-60 100-60h60c40 0 70 20 88 60z', '#A1887F') + R(60, 110, 120, 70, '#FFF3E0') + P('M40 112c20-6 40-30 80-30s60 24 80 30c-4-10-8-14-14-16H54c-6 2-10 6-14 16z', '#43A047') + Lc('M40 112c-2-8 0-14 6-16M200 112c2-8 0-14-6-16', '#2E7D32', 5)
      + P('M100 180v-40c0-14 40-14 40 0v40z', '#8D6E63') + [[74, 134], [166, 134]].map(([x, y]) => E(x, y, 12, 14, '#E53935') + Lc(`M${x} ${y + 14}v8`, '#FFCA28', 3)).join('')
      + [[90, 112], [150, 112]].map(([x, y]) => Lc(`M${x} ${y}v8`, INK, 2) + P(`M${x - 10} ${y + 16}c0 20 20 20 20 0`, 'none', 0) + Lc(`M${x - 12} ${y + 16}c0 16 24 16 24 0s-18-10-18 0 10 8 12 0`, '#8D6E63', 3)).join('') + face(120, 156, 0.35)) },
  { id: 'mo-macau.landmark.tower', cat: 'landmark', file: 'mo/macau/landmark-tower.v1.svg', name: nm('มาเก๊าทาวเวอร์', 'Macau Tower'), kw: ['macau tower', 'มาเก๊าทาวเวอร์', 'skywalk', 'observation deck', 'จุดชมวิว', 'bungee', 'บันจี้จัมป์', 'nam van lake', 'night view'], colour: true, spot: nm('หาหอคอยผอมสูงที่มีวงกลมบนยอด', 'Find the thin tall tower with a ring near the top'),
    // a tall slender white tower with three tapering legs at the foot, a round glass deck near the top, a long needle, a tiny jumper on a rope
    svg: free(P('M90 220l20-60v-110h20v110l20 60z', '#ECEFF1') + Lc('M110 160l-14 60M130 160l14 60', '#B0BEC5', 3) + E(120, 58, 40, 14, '#4FC3F7') + R(84, 40, 72, 14, '#ECEFF1', 6) + E(120, 76, 30, 8, '#ECEFF1') + Lc('M120 40V4', INK, 4)
      + Lc('M156 64c6 20 4 40 0 60', '#FF7043', 2) + C(156, 130, 6, '#FFE0BD', 2.5) + Lc('M156 136v10M150 140h12', INK, 2.5) + P('M-4 224c60-10 180-10 248 0v6H-4z', '#4DB6AC') + face(120, 120, 0.35)) },
];
// a five-point star centred on x,y
function star(x, y, r, fill, sw) { return P(`M${x} ${y - r}` + Array.from({ length: 9 }, (_, i) => { const a = Math.PI / 2 + ((i + 1) * Math.PI) / 5, rr = i % 2 ? r : r * 0.45; return `L${(x + Math.cos(a) * rr).toFixed(1)} ${(y - Math.sin(a) * rr).toFixed(1)}`; }).join('') + 'z', fill, sw); }
export default {
  places: {
    hk: { country: 'hk', wave: 1, name: nm('ฮ่องกง', 'Hong Kong'), tz: 'Asia/Hong_Kong', alias: ['hong kong', 'ฮ่องกง', '香港', 'hk', 'hkg'], colors: HK },
    'hk-hongkong': { country: 'hk', wave: 1, name: nm('ฮ่องกง', 'Hong Kong'), tz: 'Asia/Hong_Kong', ll: [22.3, 114.17], alias: ['hong kong', 'ฮ่องกง', '香港', 'kowloon', 'เกาลูน', 'tsim sha tsui', 'จิมซาจุ่ย', 'mong kok', 'มงก๊ก', 'causeway bay', 'คอสเวย์เบย์', 'lantau', 'ลันเตา', 'victoria peak', 'tai o', 'ngong ping'], colors: HC },
    mo: { country: 'mo', wave: 1, name: nm('มาเก๊า', 'Macau'), tz: 'Asia/Macau', alias: ['macau', 'macao', 'มาเก๊า', '澳門'], colors: MO },
    'mo-macau': { country: 'mo', wave: 1, name: nm('มาเก๊า', 'Macau'), tz: 'Asia/Macau', ll: [22.19, 113.54], alias: ['macau', 'macao', 'มาเก๊า', '澳門', 'taipa', 'ไทปา', 'cotai', 'โคไท', 'coloane', 'โคโลอาน', 'senado', 'เซนาโด', 'st paul', 'เซนต์ปอล'], colors: MC },
  },
  items,
};
