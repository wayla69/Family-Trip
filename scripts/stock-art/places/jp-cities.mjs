// Japan beyond Tokyo: Osaka, Kyoto (with Nara), Hokkaido — each picture its own (the country's stickers are in public/stock/jp)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const OS = { k1: '#F57C00', k2: '#2F5D8C', k3: '#FFF3E0' };
const KY = { k1: '#C62828', k2: '#6D4C41', k3: '#FCE4EC' };
const HK = { k1: '#7B1FA2', k2: '#1565C0', k3: '#EDE7F6' };

const items = [
  // ---------- Osaka
  { id: 'jp-osaka.stamp', cat: 'stamp', file: 'jp/osaka/stamp.v1.svg', name: nm('ตราประทับโอซาก้า', 'Osaka stamp'), kw: ['osaka', 'โอซาก้า'],
    svg: cityStamp('jos-st', { name: 'OSAKA', sub: 'JAPAN', ...OS, emblem: R(72, 116, 56, 24, '#ECEFF1') + P('M64 118q36-14 72 0l-6 6H70z', '#43A047') + R(80, 96, 40, 18, '#ECEFF1') + P('M72 98q28-12 56 0l-6 6H78z', '#43A047') + R(88, 80, 24, 14, '#ECEFF1') + P('M82 82q18-10 36 0l-4 5H86z', '#43A047') + C(100, 72, 4, '#FFD54A', 2.5) }) },
  { id: 'jp-osaka.day.dotonbori', cat: 'day', file: 'jp/osaka/day-dotonbori.v1.svg', name: nm('โดทงโบริยามค่ำ', 'Dotonbori at night'), kw: ['dotonbori', 'โดทงโบริ', 'namba', 'นัมบะ', 'neon', 'canal', 'คลอง', 'night'],
    // the canal at night: walls of neon signs, a giant crab waving on a shopfront, lights doubled in the water
    svg: scene('jos-d1', '#1A237E', [[10, 60, 50, 90], [64, 40, 44, 110], [188, 50, 52, 100]].map(([x, y, w, h], i) => R(x, y, w, h, ['#3949AB', '#5E35B1', '#3949AB'][i]) + R(x + 6, y + 10, w - 12, 18, ['#FF4081', '#FFEB3B', '#00E5FF'][i], 4, 3) + R(x + 6, y + 36, w - 12, 14, ['#76FF03', '#FF9100', '#FF4081'][i], 4, 3)).join('')
      + R(112, 96, 72, 54, '#FF7043') + P('M120 92c-8-20 8-30 18-20 4 8 0 16-8 20zM176 92c8-20-8-30-18-20-4 8 0 16 8 20z', '#E53935') + E(148, 104, 24, 14, '#E53935') + face(148, 102, 0.4)
      + R(-4, 150, 248, 12, '#5D4037') + P('M-4 162h248v80H-4z', '#283593') + Lc('M30 176h20M90 186h30M150 176h24M200 190h20', '#FF4081', 4) + Lc('M60 196h20M170 204h24', '#FFEB3B', 4)) },
  { id: 'jp-osaka.day.aquarium', cat: 'day', file: 'jp/osaka/day-aquarium.v1.svg', name: nm('พิพิธภัณฑ์สัตว์น้ำไคยูคัง', 'Kaiyukan aquarium'), kw: ['kaiyukan', 'ไคยูคัง', 'aquarium', 'พิพิธภัณฑ์สัตว์น้ำ', 'whale shark', 'ฉลามวาฬ', 'tempozan'],
    // a whale shark gliding past the big tank window, bubbles, a ray, two small fish, the kids' silhouettes watching
    svg: scene('jos-d2', '#0277BD', [[40, 50], [60, 80], [200, 60], [180, 100]].map(([x, y]) => C(x, y, 5, '#B3E5FC', 3)).join('')
      + P('M30 110c30-30 120-40 170-10l30-20-6 30 6 30-30-20c-50 30-140 20-170-10z', '#546E7A') + [[80, 100], [110, 92], [140, 100], [100, 116], [130, 118], [160, 112]].map(([x, y]) => C(x, y, 3, '#FFFFFF', 0)).join('') + face(56, 108, 0.45)
      + P('M150 150c20-14 40-14 50 0-10 10-30 14-50 0zM200 150l14 10', '#90A4AE', 4) + P('M40 160l16-8v16zM70 170l14-8v16z', '#FFB74D', 3)
      + C(70, 210, 14, '#263238') + P('M54 250c0-20 32-20 32 0z', '#263238') + C(110, 214, 11, '#263238') + P('M98 250c0-16 24-16 24 0z', '#263238')) },
  { id: 'jp-osaka.landmark.castle', cat: 'landmark', file: 'jp/osaka/landmark-castle.v1.svg', name: nm('ปราสาทโอซาก้า', 'Osaka Castle'), kw: ['osaka castle', 'ปราสาทโอซาก้า', 'osaka-jo', 'castle', 'ปราสาท', 'cherry blossom'], colour: true, spot: nm('หาปลาทองบนหลังคาปราสาท', 'Find the golden fish on the castle roof'),
    // the white keep with layered green roofs edged in gold, golden shachihoko fish on the top ridge, a stone base
    svg: free(P('M30 220l14-50h152l14 50z', '#BCAAA4') + Lc('M50 200h140M40 186h160', '#8D6E63', 3) + R(54, 140, 132, 30, '#FFFFFF') + P('M36 144q84-30 168 0l-8 8H44z', '#2E7D32')
      + R(70, 106, 100, 30, '#FFFFFF') + P('M54 110q66-26 132 0l-8 8H62z', '#2E7D32') + R(88, 74, 64, 28, '#FFFFFF') + P('M74 78q46-22 92 0l-6 8H80z', '#2E7D32')
      + Lc('M44 150q76-24 152 0M62 116q58-20 116 0', '#FFD54A', 3) + P('M82 58c-6-10 4-18 12-10l-2 12zM158 58c6-10-4-18-12-10l2 12z', '#FFD54A', 3.5) + face(120, 152, 0.45)) },
  { id: 'jp-osaka.landmark.crab', cat: 'landmark', file: 'jp/osaka/landmark-crab.v1.svg', name: nm('ปูยักษ์โดทงโบริ', 'The giant Dotonbori crab'), kw: ['crab', 'ปูยักษ์', 'dotonbori', 'โดทงโบริ', 'crab sign', 'kani'], colour: true, spot: nm('หาปูยักษ์ที่ขยับขาได้', 'Find the giant crab that moves its legs'),
    // a huge red crab on a shop sign: its two claws up, legs spread over the doorway
    svg: free(R(40, 140, 160, 80, '#FFE0B2') + R(96, 170, 48, 50, '#5D4037') + [-1, 1].map((sd) => [0, 1, 2].map((i) => Lc(`M${120 + sd * 50} ${110 + i * 10}l${sd * (36 + i * 6)} ${18 + i * 10}`, '#E53935', 8)).join('')).join('')
      + P('M58 70c-16-26 6-46 26-34 8 12 2 28-10 34zM182 70c16-26-6-46-26-34-8 12-2 28 10 34z', '#E53935') + E(120, 110, 60, 34, '#EF5350') + C(104, 80, 8, '#FFFFFF') + C(136, 80, 8, '#FFFFFF') + C(104, 80, 3, INK, 0) + C(136, 80, 3, INK, 0) + face(120, 112, 0.7)) },
  { id: 'jp-osaka.landmark.tsutenkaku', cat: 'landmark', file: 'jp/osaka/landmark-tsutenkaku.v1.svg', name: nm('หอคอยสึเท็นคาคุ', 'Tsutenkaku tower'), kw: ['tsutenkaku', 'สึเท็นคาคุ', 'shinsekai', 'ชินเซไก', 'kushikatsu', 'คุชิคัตสึ'], colour: true, spot: nm('หาหอคอยที่มีไฟบนยอด', 'Find the tower with the lights on top'),
    // the steel tower standing on four arched legs over the street, a square top with a light band, Shinsekai shops
    svg: free(P('M50 220l30-90h80l30 90h-30l-20-60h-40l-20 60z', '#B0BEC5') + R(84, 50, 72, 84, '#CFD8DC') + R(76, 34, 88, 22, '#ECEFF1') + R(80, 40, 80, 10, '#FFCA28', 3, 3)
      + Lc('M92 70h56M92 90h56M92 110h56', '#90A4AE', 4) + Lc('M120 34V10', INK, 5) + R(20, 196, 30, 24, '#FF7043', 3) + R(190, 196, 30, 24, '#4DB6AC', 3) + face(120, 98, 0.5)) },
  { id: 'jp-osaka.landmark.umedasky', cat: 'landmark', file: 'jp/osaka/landmark-umedasky.v1.svg', name: nm('อุเมดะสกายบิลดิ้ง', 'Umeda Sky Building'), kw: ['umeda sky', 'อุเมดะสกาย', 'umeda', 'อุเมดะ', 'floating garden', 'observatory'], colour: true, spot: nm('หาตึกแฝดที่มีวงแหวนเชื่อมด้านบน', 'Find the twin towers joined by a ring on top'),
    // two glass towers joined at the top by the round "floating garden" observatory, a little bridge lower down
    svg: free(R(46, 50, 56, 170, '#B3E5FC') + R(138, 50, 56, 170, '#B3E5FC') + R(102, 120, 36, 10, '#90A4AE', 2) + R(30, 26, 180, 30, '#CFD8DC', 6) + C(120, 40, 26, 'none')
      + C(120, 40, 18, '#E1F5FE') + [60, 80, 100, 120, 140, 160, 180, 200].map((y) => Lc(`M54 ${y}h40M146 ${y}h40`, '#81D4FA', 3)).join('') + face(120, 40, 0.4)) },
  // ---------- Kyoto (and Nara)
  { id: 'jp-kyoto.stamp', cat: 'stamp', file: 'jp/kyoto/stamp.v1.svg', name: nm('ตราประทับเกียวโต', 'Kyoto stamp'), kw: ['kyoto', 'เกียวโต'],
    // a fox (Inari's messenger) holding a key, sitting before a tiny torii
    svg: cityStamp('jky-st', { name: 'KYOTO', sub: 'JAPAN', ...KY, emblem: P('M70 76q30-8 60 0l-2 6H72z', '#C62828') + R(76, 84, 6, 56, '#C62828') + R(118, 84, 6, 56, '#C62828')
      + P('M86 140c0-30 6-46 14-50 8 4 14 20 14 50z', '#FFFDF7') + P('M90 94l2-14 6 10M110 94l-2-14-6 10', '#FFFDF7', 2.5) + C(100, 100, 10, '#FFFDF7') + Lc('M100 112v10', '#E53935', 3) }) },
  { id: 'jp-kyoto.day.inari', cat: 'day', file: 'jp/kyoto/day-inari.v1.svg', name: nm('อุโมงค์โทริอิฟูชิมิอินาริ', 'Fushimi Inari torii tunnel'), kw: ['fushimi inari', 'ฟูชิมิอินาริ', 'torii', 'โทริอิ', 'senbon torii', 'red gates', 'ประตูสีแดง', 'fox'],
    // a tunnel of orange torii shrinking into the hillside, the path running through, green forest round it
    svg: scene('jky-d1', '#C8E6C9', P('M-4 60h248v180H-4z', '#81C784') + [0, 1, 2, 3, 4].map((i) => { const w = 200 - i * 36, h = 170 - i * 28, x = 120 - w / 2, y = 220 - h; return R(x, y + 14, w, 10, '#E65100', 0, 4) + R(x + 6, y + 24, 12, h - 24, '#F4511E', 0, 4) + R(x + w - 18, y + 24, 12, h - 24, '#F4511E', 0, 4) + P(`M${x - 8} ${y + 14}q${w / 2 + 8}-${12 - i * 2} ${w + 16} 0l-4-10q-${w / 2 + 4} 8-${w + 8} 0z`, '#212121', 3.5); }).join('')
      + P('M70 250l40-120h20l40 120z', '#BCAAA4')) },
  { id: 'jp-kyoto.day.bamboo', cat: 'day', file: 'jp/kyoto/day-bamboo.v1.svg', name: nm('ป่าไผ่อาราชิยามะ', 'Arashiyama bamboo grove'), kw: ['arashiyama', 'อาราชิยามะ', 'bamboo', 'ป่าไผ่', 'sagano', 'ซางาโนะ', 'rickshaw', 'รถลาก'],
    // tall green bamboo on both sides of a path, a rickshaw rolling through, light falling in stripes
    svg: scene('jky-d2', '#F1F8E9', [14, 40, 64, 172, 198, 224].map((x, i) => R(x - 7, -4, 14, 250, ['#7CB342', '#689F38', '#8BC34A'][i % 3], 0, 4) + Lc(`M${x - 7} ${50 + i * 10}h14M${x - 7} ${120 + i * 6}h14`, '#33691E', 3)).join('')
      + P('M80 250l20-150h40l20 150z', '#D7CCC8') + C(108, 196, 18, 'none') + C(108, 196, 4, INK, 0) + P('M100 170h40l6-30h-36z', '#C62828') + Lc('M146 170l30 20', '#5D4037', 5) + C(132, 132, 9, '#FFE0BD', 3) + face(132, 132, 0.2, 'none')) },
  { id: 'jp-kyoto.landmark.kinkakuji', cat: 'landmark', file: 'jp/kyoto/landmark-kinkakuji.v1.svg', name: nm('วัดคินคะคุจิ ศาลาทอง', 'Kinkaku-ji, the Golden Pavilion'), kw: ['kinkakuji', 'kinkaku-ji', 'คินคะคุจิ', 'golden pavilion', 'ศาลาทอง', 'วัดทอง'], colour: true, spot: nm('หาศาลาสีทองริมน้ำ', 'Find the golden house by the pond'),
    // the three-storey golden pavilion on its pond, mirrored in the water, a phoenix on the roof
    svg: free(E(120, 200, 110, 22, '#4FC3F7') + R(56, 140, 128, 44, '#FFD54A') + P('M40 144q80-26 160 0l-8 8H48z', '#5D4037') + R(66, 104, 108, 34, '#FFCA28') + P('M52 108q68-22 136 0l-8 8H60z', '#5D4037')
      + R(84, 76, 72, 26, '#FFCA28') + P('M70 80q50-20 100 0l-6 8H76z', '#5D4037') + P('M114 62c-4-10 8-16 14-8l-4 12z', '#FFD54A', 3.5) + Lc('M70 210h100M86 218h68', '#FFE082', 4) + face(120, 158, 0.5)) },
  { id: 'jp-kyoto.landmark.kiyomizu', cat: 'landmark', file: 'jp/kyoto/landmark-kiyomizu.v1.svg', name: nm('วัดคิโยมิสึเดระ', 'Kiyomizu-dera'), kw: ['kiyomizu', 'kiyomizu-dera', 'คิโยมิสึ', 'wooden stage', 'เวทีไม้', 'higashiyama'], colour: true, spot: nm('หาระเบียงไม้ที่มีเสายาวๆ', 'Find the wooden balcony on tall stilts'),
    // the big wooden hall jutting out over the slope on a grid of tall pillars, an orange pagoda peeking behind
    svg: free(P('M150 30l10-20 10 20z', '#E64A19') + R(152, 30, 16, 30, '#FF7043') + P('M24 90q96-40 192 0l-12 10H36z', '#5D4037') + R(40, 96, 160, 34, '#D7A86E')
      + [52, 82, 112, 142, 172].map((x) => R(x, 130, 10, 90, '#A1673F', 0, 4)).join('') + Lc('M44 160h150M44 190h150', '#8D6E63', 5) + P('M190 220c10-40 30-60 50-70v70z', '#81C784') + face(120, 112, 0.5)) },
  { id: 'jp-kyoto.landmark.todaiji', cat: 'landmark', file: 'jp/kyoto/landmark-todaiji.v1.svg', name: nm('วัดโทไดจิ นารา', 'Todai-ji, Nara'), kw: ['todaiji', 'todai-ji', 'โทไดจิ', 'nara', 'นารา', 'great buddha hall', 'daibutsuden'], colour: true, spot: nm('หาวิหารไม้หลังใหญ่ที่สุด', 'Find the biggest wooden hall'),
    // the enormous wooden hall from outside: a wide swept roof with golden horns on the ridge, a deer at the gate
    svg: free(R(40, 120, 160, 80, '#FFF8E1') + [56, 88, 120, 152, 184].map((x) => R(x - 5, 120, 10, 80, '#A1673F', 0, 3.5)).join('') + P('M10 124q110-40 220 0l-12 12H22z', '#455A64') + R(70, 84, 100, 30, '#FFF8E1') + P('M40 88q80-34 160 0l-10 10H50z', '#455A64')
      + P('M50 66c-6-14 6-22 14-12zM190 66c6-14-6-22-14-12z', '#FFD54A', 3.5) + Lc('M50 66q70-20 140 0', '#455A64', 5) + P('M20 220h200', 'none') + C(204, 192, 9, '#C69C6D', 3.5) + Lc('M200 184l-4-10M208 184l4-10', '#8D6E63', 3) + face(120, 160, 0.5)) },
  { id: 'jp-kyoto.landmark.yasaka', cat: 'landmark', file: 'jp/kyoto/landmark-yasaka.v1.svg', name: nm('เจดีย์ยาซากะ กิอง', 'Yasaka Pagoda, Gion'), kw: ['yasaka pagoda', 'เจดีย์ยาซากะ', 'hokan-ji', 'gion', 'กิอง', 'ninenzaka', 'sannenzaka', 'kimono walk'], colour: true, spot: nm('หาเจดีย์ห้าชั้นปลายถนน', 'Find the five-roof pagoda at the end of the lane'),
    // the slim five-roofed pagoda rising at the top of a stone lane lined with dark wooden machiya
    svg: free([0, 1, 2, 3, 4].map((i) => R(102 + i * 2, 168 - i * 30, 36 - i * 4, 22, '#FFF8E1') + P(`M${76 + i * 5} ${168 - i * 30}q${44 - i * 5}-14 ${88 - i * 10} 0l-6 6h-${76 - i * 10}z`, '#37474F')).join('') + Lc('M120 30V6', INK, 5) + [10, 20, 30].map((y) => Lc(`M114 ${y}h12`, '#FFD54A', 3)).join('')
      + P('M10 220l30-60h40v60zM230 220l-30-60h-40v60z', '#5D4037') + Lc('M30 180h40M170 180h40', '#A1887F', 3) + P('M80 220l20-30h40l20 30z', '#BCAAA4') + face(120, 180, 0.4)) },
  // ---------- Hokkaido
  { id: 'jp-hokkaido.stamp', cat: 'stamp', file: 'jp/hokkaido/stamp.v1.svg', name: nm('ตราประทับฮอกไกโด', 'Hokkaido stamp'), kw: ['hokkaido', 'ฮอกไกโด', 'sapporo', 'ซัปโปโร'],
    // a snowflake over a field of lavender stripes
    svg: cityStamp('jhk-st', { name: 'HOKKAIDO', sub: 'SAPPORO', ...HK, emblem: [0, 1, 2, 3].map((i) => Lc(`M58 ${126 + i * 6}c20-6 64-6 84 0`, '#9575CD', 4)).join('') + [0, 60, 120].map((a) => g(100, 88, 1, Lc('M0-24V24M-8-16l8 6 8-6M-8 16l8-6 8 6', '#1E88E5', 4), a)).join('') }) },
  { id: 'jp-hokkaido.day.furano', cat: 'day', file: 'jp/hokkaido/day-furano.v1.svg', name: nm('ทุ่งลาเวนเดอร์ฟุราโนะ', 'Furano lavender fields'), kw: ['furano', 'ฟุราโนะ', 'lavender', 'ลาเวนเดอร์', 'farm tomita', 'flower fields', 'ทุ่งดอกไม้', 'biei', 'summer'],
    // rolling hills striped purple, red, white and yellow with flowers, a red-roofed farmhouse, a lone tree
    svg: scene('jhk-d1', '#E1F5FE', C(186, 60, 16, '#FFD54A') + P('M-4 120c60-30 120-30 248 0v130H-4z', '#AED581')
      + [['#9575CD', 130], ['#E57373', 150], ['#FFFFFF', 170], ['#9575CD', 190], ['#FFD54A', 210], ['#9575CD', 230]].map(([c, y]) => P(`M-4 ${y}c80-18 160-18 248 0v12c-80-18-168-18-248 0z`, c, 3)).join('')
      + R(150, 96, 40, 28, '#FFFDF7') + P('M144 98l26-18 26 18z', '#E53935') + Lc('M40 120V80', '#5D4037', 6) + C(40, 74, 18, '#43A047')) },
  { id: 'jp-hokkaido.day.snowfest', cat: 'day', file: 'jp/hokkaido/day-snowfest.v1.svg', name: nm('เทศกาลหิมะซัปโปโร', 'Sapporo Snow Festival'), kw: ['snow festival', 'เทศกาลหิมะ', 'yuki matsuri', 'odori park', 'โอโดริ', 'snow sculpture', 'winter', 'หิมะ'],
    // a giant snow castle sculpture in Odori Park, snow falling, a snowman and a little sledge in front
    svg: scene('jhk-d2', '#BBDEFB', [[30, 40], [70, 70], [110, 30], [170, 50], [200, 90], [50, 110]].map(([x, y]) => C(x, y, 4, '#FFFFFF', 2.5)).join('')
      + R(60, 90, 120, 100, '#F5F5F5') + [60, 100, 140].map((x) => R(x, 80, 40, 14, '#F5F5F5')).join('') + R(104, 50, 32, 50, '#FAFAFA') + P('M100 52l20-24 20 24z', '#E3F2FD') + P('M106 190v-30c0-18 28-18 28 0v30z', '#B3E5FC')
      + P('M-4 190c40-10 80-10 120 0s80 10 128 0v60H-4z', '#FFFFFF') + C(40, 196, 18, '#FFFFFF') + C(40, 170, 13, '#FFFFFF') + Lc('M30 160l20 0', '#E53935', 4) + face(40, 168, 0.3) + P('M180 200h40l-6 10h-34z', '#E53935')) },
  { id: 'jp-hokkaido.landmark.clocktower', cat: 'landmark', file: 'jp/hokkaido/landmark-clocktower.v1.svg', name: nm('หอนาฬิกาซัปโปโร', 'Sapporo Clock Tower'), kw: ['clock tower', 'หอนาฬิกา', 'sapporo clock tower', 'tokeidai', 'sapporo', 'ซัปโปโร'], colour: true, spot: nm('หาบ้านไม้สีขาวที่มีนาฬิกา', 'Find the white wooden house with a clock'),
    // the white clapboard hall with a red roof and the little clock tower with its star
    svg: free(R(30, 130, 180, 90, '#FFFFFF') + Lc('M30 150h180M30 170h180M30 190h180', '#ECEFF1', 3) + P('M20 134l100-40 100 40z', '#C62828') + R(96, 60, 48, 50, '#FFFFFF') + C(120, 82, 14, '#FFFDF7') + Lc('M120 82v-9M120 82l7 4', INK, 3)
      + P('M90 62l30-30 30 30z', '#C62828') + R(116, 16, 8, 18, '#FFFFFF', 0, 3.5) + [60, 90, 150, 180].map((x) => R(x - 10, 150, 20, 30, '#BFD9F2', 3, 3.5)).join('') + R(108, 180, 24, 40, '#8D6E63', 3) + face(120, 116, 0.4, 'none')) },
  { id: 'jp-hokkaido.landmark.otaru', cat: 'landmark', file: 'jp/hokkaido/landmark-otaru.v1.svg', name: nm('คลองโอตารุ', 'Otaru Canal'), kw: ['otaru', 'โอตารุ', 'canal', 'คลอง', 'music box', 'กล่องดนตรี', 'glass', 'warehouses'], colour: true, spot: nm('หาโคมไฟริมคลอง', 'Find the lamps along the canal'),
    // old stone warehouses along the canal, gas lamps on the path, the canal water
    svg: free(R(20, 80, 120, 80, '#A1887F') + P('M14 84l66-30 66 30z', '#4E342E') + R(140, 100, 80, 60, '#BCAAA4') + P('M134 104l46-24 46 24z', '#4E342E') + [40, 72, 104, 160, 192].map((x) => R(x, 110, 16, 22, '#FFE082', 3, 3.5)).join('')
      + R(10, 160, 220, 14, '#D7CCC8') + [50, 120, 190].map((x) => Lc(`M${x} 160v-40`, INK, 4) + C(x, 114, 9, '#FFF59D')).join('') + P('M10 174h220v46H10z', '#4FC3F7') + Lc('M30 194h30M100 204h40M170 194h30', '#E1F5FE', 4) + face(80, 132, 0.45, 'none')) },
  { id: 'jp-hokkaido.landmark.penguins', cat: 'landmark', file: 'jp/hokkaido/landmark-penguins.v1.svg', name: nm('ขบวนเพนกวินเดินเล่น อาซาฮิยามะ', 'Asahiyama penguin parade'), kw: ['asahiyama', 'อาซาฮิยามะ', 'penguin walk', 'เพนกวินเดิน', 'penguin', 'เพนกวิน', 'asahikawa', 'zoo', 'สวนสัตว์'], colour: true, spot: nm('นับเพนกวินที่เดินบนหิมะ', 'Count the penguins walking in the snow'),
    // three king penguins waddling in a line along a snowy path, orange neck patches, the last one a fluffy brown chick
    svg: free(P('M10 210c60-14 160-14 220 0v14H10z', '#FFFFFF') + [[60, 1], [120, 1], [180, 0.75]].map(([x, s], i) => g(x, 200, s, (i === 2 ? E(0, -54, 30, 50, '#8D6E63') : E(0, -60, 30, 56, INK) + E(4, -52, 20, 42, '#FFFFFF') + P('M-6-96c10 0 16 6 18 12-6 4-14 4-18-12z', '#FFA726', 3)) + P('M-20 0h16M4 0h16', 'none', 5).replace('fill="none"', 'fill="none" stroke="#FFA726"') + P('M22-80l14 4-14 4z', '#FFA726', 3) + face(6, i === 2 ? -78 : -88, 0.45).replace(i === 2 ? /x/ : /fill="#22213A" stroke="none"/g, i === 2 ? 'x' : 'fill="#FFFDF7" stroke="none"'))).join('')) },
  { id: 'jp-hokkaido.landmark.bluepond', cat: 'landmark', file: 'jp/hokkaido/landmark-bluepond.v1.svg', name: nm('สระน้ำสีฟ้าบิเอะ', 'The Blue Pond, Biei'), kw: ['blue pond', 'สระน้ำสีฟ้า', 'aoiike', 'อาโออิเกะ', 'biei', 'บิเอะ', 'shirogane'], colour: true, spot: nm('หาสระน้ำสีฟ้าที่มีต้นไม้ยืนอยู่ในน้ำ', 'Find the blue pond with trees standing in it'),
    // the milky turquoise pond with bare silver larches standing in the water, green forest at the back
    svg: free([40, 80, 160, 200].map((x) => P(`M${x - 22} 110l22-60 22 60z`, '#2E7D32')).join('') + E(120, 160, 110, 52, '#4DD0E1') + E(120, 164, 90, 36, '#80DEEA', 0)
      + [[80, 170, 80], [120, 160, 110], [160, 176, 70]].map(([x, y, h]) => Lc(`M${x} ${y}v-${h}M${x} ${y - h * 0.6}l-14-14M${x} ${y - h * 0.4}l12-12`, '#ECEFF1', 6) + Lc(`M${x} ${y}v-${h}`, INK, 2.5)).join('') + face(120, 186, 0.45)) },
];
export default {
  places: {
    'jp-osaka': { country: 'jp', wave: 1, name: nm('โอซาก้า', 'Osaka'), tz: 'Asia/Tokyo', ll: [34.69, 135.5], alias: ['osaka', 'โอซาก้า', '大阪', 'namba', 'นัมบะ', 'dotonbori', 'โดทงโบริ', 'umeda', 'อุเมดะ', 'shinsekai', 'kaiyukan', 'universal city', 'tennoji'], colors: OS },
    'jp-kyoto': { country: 'jp', wave: 1, name: nm('เกียวโต', 'Kyoto'), tz: 'Asia/Tokyo', ll: [35.01, 135.77], alias: ['kyoto', 'เกียวโต', '京都', 'gion', 'กิอง', 'arashiyama', 'อาราชิยามะ', 'fushimi', 'ฟูชิมิ', 'higashiyama', 'nara', 'นารา', 'uji', 'อุจิ'], colors: KY },
    'jp-hokkaido': { country: 'jp', wave: 1, name: nm('ฮอกไกโด', 'Hokkaido'), tz: 'Asia/Tokyo', ll: [43.06, 141.35], alias: ['hokkaido', 'ฮอกไกโด', '北海道', 'sapporo', 'ซัปโปโร', 'otaru', 'โอตารุ', 'furano', 'ฟุราโนะ', 'biei', 'บิเอะ', 'asahikawa', 'อาซาฮิกาวะ', 'niseko', 'นิเซโกะ', 'hakodate', 'ฮาโกดาเตะ', 'noboribetsu'], colors: HK },
  },
  items,
};
