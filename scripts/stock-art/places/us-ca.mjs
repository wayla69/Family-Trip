// The United States (New York, California, an Orlando park day, Hawaii) and Canada (Vancouver, Banff) — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const US = { k1: '#1A237E', k2: '#C62828', k3: '#E8EAF6' };
const NY = { k1: '#00897B', k2: '#F9A825', k3: '#E0F2F1' };
const CA_ = { k1: '#E65100', k2: '#0277BD', k3: '#FFF3E0' };
const OR = { k1: '#7B1FA2', k2: '#FF6F00', k3: '#F3E5F5' };
const HI = { k1: '#D81B60', k2: '#00897B', k3: '#FCE4EC' };
const CA = { k1: '#C62828', k2: '#B71C1C', k3: '#FFEBEE' };
const VA = { k1: '#00695C', k2: '#1565C0', k3: '#E0F2F1' };
const BF = { k1: '#00838F', k2: '#2E7D32', k3: '#E0F7FA' };
// a five-point star centred on x,y
const star = (x, y, r, fill, sw) => P(`M${x} ${y - r}` + Array.from({ length: 9 }, (_, i) => { const a = Math.PI / 2 + ((i + 1) * Math.PI) / 5, rr = i % 2 ? r : r * 0.45; return `L${(x + Math.cos(a) * rr * (i % 2 ? 1 : 1)).toFixed(1)} ${(y - Math.sin(a) * rr).toFixed(1)}`; }).join('') + 'z', fill, sw);
// a maple leaf (11 points) centred on x,y, size s
const maple = (x, y, s, fill, sw) => g(x, y, s, P('M0-40l8 16 10-4-4 22 14-14 4 8 14-2-6 16 6 4-22 14 4 10-20-4-4 20h-4l-4-20-20 4 4-10-22-14 6-4-6-16 14 2 4-8 14 14-4-22 10 4z', fill, sw));

const items = [
  // ---------- the United States
  { id: 'us.stamp', cat: 'stamp', file: 'us/stamp.v1.svg', name: nm('ตราประทับอเมริกา', 'USA stamp'), kw: ['usa', 'united states', 'america', 'อเมริกา', 'สหรัฐอเมริกา', 'สหรัฐ'],
    // a bald eagle's white head and yellow beak, three stars over it
    svg: countryStamp({ name: 'U.S.A.', ...US, emblem: P('M70 136c0-36 14-60 34-60s30 14 30 30c0 10-6 18-14 22l-6 8z', '#FFFFFF', 3) + P('M118 96l26 6-10 14-18-4z', '#FFCA28', 3) + C(112, 96, 4, INK, 0) + P('M70 136c10 6 30 8 44 0l10 10H62z', '#6D4C41', 3) + [72, 100, 128].map((x) => star(x, 54, 9, '#C62828', 2)).join('') }) },
  { id: 'us.flag', ch: '🇺🇸', cat: 'flag', file: 'us/flag.v1.svg', name: nm('ธงอเมริกา', 'Flag of the United States'), kw: ['usa', 'america', 'อเมริกา', 'flag', 'ธง', 'stars and stripes'],
    // stripes in red and white, a blue canton with rows of little stars (fewer than fifty, drawn big enough to read)
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF')
      + [0, 2, 4, 6].map((k) => `<path d="M44 ${46 + k * 16}c40-12 84 12 126 0s28-4 42 0" stroke="#B22234" stroke-width="9" fill="none"/>`).join('') + P('M44 38c18-6 40-4 60 0v58c-20-4-42-6-60 0z', '#3C3B6E', 3)
      + [[56, 52], [74, 50], [92, 52], [64, 66], [84, 66], [56, 80], [74, 80], [92, 82]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#FFFFFF" stroke="none"/>`).join('') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', 'none')) },
  { id: 'us.hello', cat: 'hello', file: 'us/hello.v1.svg', name: nm('ไฮ สวัสดี', 'Hi, hello'), kw: ['hi', 'hello', 'ไฮ', 'สวัสดี', 'howdy', 'cowboy', 'คาวบอย', 'texas'],
    // a child in a big cowboy hat and checked shirt, waving a lasso loop over their head
    svg: free(P('M80 214c0-40 16-60 40-60s40 20 40 60z', '#E53935') + Lc('M100 160v54M120 156v58M140 160v54M84 184h72M82 204h76', '#B71C1C', 3) + C(120, 112, 32, '#FFE0BD') + E(120, 82, 58, 10, '#A1673F') + P('M92 82c0-30 10-40 28-40s28 10 28 40z', '#A1673F') + Lc('M94 74h52', '#5D4037', 5)
      + P('M150 150c12-16 20-36 18-54l14 2c2 22-6 44-20 58z', '#FFE0BD') + C(176, 92, 11, '#FFE0BD') + E(186, 48, 30, 12, 'none', 5) + Lc('M180 82l4-24', '#D7A86E', 4) + face(120, 116, 0.6)) },
  { id: 'us.food.hotdog', cat: 'food', file: 'us/food-hotdog.v1.svg', name: nm('ฮอตดอก', 'Hot dog'), kw: ['hot dog', 'ฮอตดอก', 'street cart', 'รถเข็น', 'ketchup', 'mustard', 'มัสตาร์ด', 'ballpark'], colour: true,
    // a long sausage in a soft bun, zigzags of yellow mustard and red ketchup, held in a paper tray
    svg: free(P('M30 150h180l-12 34H42z', '#FFFFFF') + Lc('M60 150l-6 34M100 150l-2 34M140 150l2 34M180 150l6 34', '#E53935', 4) + P('M26 140c0-26 188-26 188 0 0 18-188 18-188 0z', '#F4C27A') + R(20, 112, 200, 26, '#C0392B', 13)
      + Lc('M36 120l14 8 14-8 14 8 14-8 14 8 14-8 14 8 14-8 14 8 14-8 14 8', '#FFD600', 5) + Lc('M40 130l12-6 12 6 12-6', '#E53935', 4) + face(120, 164, 0.55)) },
  { id: 'us.food.pancakes', cat: 'food', file: 'us/food-pancakes.v1.svg', name: nm('แพนเค้กราดน้ำเชื่อม', 'Pancake stack'), kw: ['pancakes', 'แพนเค้ก', 'american breakfast', 'อาหารเช้าแบบอเมริกัน', 'diner', 'ไดเนอร์', 'syrup', 'blueberry pancakes'], colour: true,
    // five fluffy pancakes stacked on a plate, a pat of butter on top, syrup running down the side, blueberries round the plate
    svg: free(E(120, 200, 100, 22, '#ECEFF1') + [0, 1, 2, 3, 4].map((k) => E(120, 184 - k * 22, 72, 16, '#E9A64C')).join('') + R(104, 82, 32, 16, '#FFF176', 3, 3)
      + P('M80 96c-10 20 0 40-4 60-2 10 8 10 10 0 4-20-8-40 6-58z', '#A1521E', 3) + P('M160 96c14 16 6 34 10 52 2 10-8 12-10 2-4-18 6-34-6-50z', '#A1521E', 3) + [[40, 196], [52, 210], [190, 206], [200, 192]].map(([x, y]) => C(x, y, 6, '#3949AB', 2.5)).join('') + face(120, 160, 0.55)) },
  { id: 'us.food.shaveice', cat: 'food', file: 'us/food-shaveice.v1.svg', name: nm('น้ำแข็งไสฮาวาย', 'Hawaiian shave ice'), kw: ['shave ice', 'น้ำแข็งไส', 'hawaii', 'ฮาวาย', 'shaved ice', 'rainbow', 'สายรุ้ง', 'north shore', 'haleiwa'], colour: true,
    // a soft dome of shaved ice in rainbow stripes (red, yellow, blue) in a fluted paper cup, a little spoon-straw
    svg: free(P('M70 130h100l-16 88H86z', '#FFFFFF') + Lc('M90 136l6 80M120 136v80M150 136l-6 80', '#90CAF9', 3) + P('M60 132c0-60 120-60 120 0z', '#E53935') + P('M92 86c18-14 40-14 56 0l12 22c-16 10-64 10-80 0z', '#FFD600', 0) + P('M120 76c22 0 40 14 50 34-10 12-26 20-50 22z', '#1E88E5', 0) + P('M60 132c0-60 120-60 120 0z', 'none')
      + Lc('M150 70l14-40', '#F48FB1', 6) + face(120, 112, 0.55)) },
  { id: 'us.animal.eagle', cat: 'animal', file: 'us/animal-eagle.v1.svg', name: nm('นกอินทรีหัวขาว', 'Bald eagle'), kw: ['bald eagle', 'นกอินทรีหัวขาว', 'eagle', 'นกอินทรี', 'alaska', 'national bird'], colour: true,
    // a round brown bald eagle perched on a pine branch, a fluffy white head, a big yellow hooked beak and yellow feet
    svg: free(Lc('M10 200c60-10 160-6 220-20', '#6D4C41', 10) + [[40, 196], [200, 184]].map(([x, y]) => P(`M${x} ${y}l-14-18m14 18l4-22m-4 22l16-14`, 'none', 4)).join('') + E(120, 150, 54, 50, '#6D4C41') + P('M70 150c-10 20-6 44 14 52-6-20-6-36-14-52zM170 150c10 20 6 44-14 52 6-20 6-36 14-52z', '#5D4037')
      + C(120, 88, 38, '#FFFFFF') + P('M146 92l26 6c-2 14-14 20-26 14z', '#FFCA28') + Lc('M102 196l-4 10M114 196v12M130 196v12M142 196l4 10', '#FFCA28', 6) + face(118, 90, 0.6)) },
  { id: 'us.animal.honu', cat: 'animal', file: 'us/animal-honu.v1.svg', name: nm('เต่าทะเลฮอนู', 'Honu, the Hawaiian green sea turtle'), kw: ['honu', 'ฮอนู', 'sea turtle', 'เต่าทะเล', 'green turtle', 'hawaii', 'ฮาวาย', 'snorkel', 'ดำน้ำตื้น', 'turtle beach'], colour: true,
    // a green sea turtle gliding with front flippers wide, a patterned shell of honey plates, little bubbles
    svg: free(P('M66 120c-30-20-54-14-62 0 18 8 40 12 62 10zM174 120c30-20 54-14 62 0-18 8-40 12-62 10zM88 172c-14 12-22 30-14 40 12-6 22-18 26-32zM152 172c14 12 22 30 14 40-12-6-22-18-26-32z', '#7CB342')
      + E(120, 140, 62, 52, '#8D6E63') + [[120, 140, 18], [90, 124, 12], [150, 124, 12], [92, 160, 12], [148, 160, 12]].map(([x, y, r]) => C(x, y, r, '#C49A6C', 3)).join('') + C(120, 70, 24, '#9CCC65') + [[184, 60, 6], [200, 40, 4], [176, 34, 3]].map(([x, y, r]) => C(x, y, r, '#B3E5FC', 2.5)).join('') + face(120, 70, 0.5)) },
  { id: 'us.animal.gator', cat: 'animal', file: 'us/animal-gator.v1.svg', name: nm('จระเข้อัลลิเกเตอร์ฟลอริดา', 'Florida alligator'), kw: ['alligator', 'อัลลิเกเตอร์', 'gator', 'จระเข้', 'florida', 'ฟลอริดา', 'everglades', 'เอเวอร์เกลดส์', 'airboat'], colour: true,
    // a friendly alligator lying in a swamp with only its long bumpy back, round eyes on top and a wide snout above the water, a water lily beside
    svg: free(P('M-4 170c40-10 200-10 248 0v40H-4z', '#4DB6AC') + P('M20 168c20-30 160-36 200-6-40 10-160 14-200 6z', '#558B2F') + [60, 90, 120, 150, 180].map((x) => P(`M${x - 8} ${150 - (x % 30)}l8-12 8 12z`, '#33691E', 3)).join('')
      + P('M14 168c-6-16 0-34 24-38 18-2 40 6 50 22z', '#689F38') + [[40, 128], [60, 128]].map(([x, y]) => C(x, y, 10, '#FFFFFF', 3) + C(x + 2, y, 4, INK, 0)).join('') + Lc('M18 160c20 6 44 6 66 0', INK, 3)
      + E(196, 196, 22, 8, '#81C784') + P('M190 192c0-10 12-10 12 0z', '#F48FB1', 3) + face(50, 148, 0.4, 'none')) },
  { id: 'us.transport.schoolbus', ch: '🚌', alt: ['🚸'], cat: 'transport', file: 'us/transport-schoolbus.v1.svg', name: nm('รถโรงเรียนสีเหลือง', 'Yellow school bus'), kw: ['school bus', 'รถโรงเรียน', 'yellow bus', 'รถบัสเหลือง', 'american school', 'stop sign'], colour: true,
    // a long sunflower-yellow school bus with a short bonnet in front, a row of windows, black stripes, a red stop sign arm
    svg: free(P('M20 170V96c0-10 6-16 16-16h140c10 0 14 6 16 14l2 30h22c6 0 10 4 10 10v36z', '#FFC107') + [40, 72, 104, 136].map((x) => R(x, 92, 26, 26, '#B3E5FC', 3, 3.5)).join('') + R(170, 96, 18, 30, '#B3E5FC', 3, 3.5)
      + Lc('M20 138h216M20 152h216', INK, 3) + [[60, 174], [190, 174]].map(([x, y]) => C(x, y, 18, INK) + C(x, y, 7, '#B0BEC5', 0)).join('') + g(14, 120, 1, P('M-12-6l6-6h12l6 6v12l-6 6h-12l-6-6z', '#E53935', 3)) + C(228, 150, 5, '#FFF59D', 2.5) + face(150, 140, 0.4)) },
  { id: 'us.culture.baseball', ch: '⚾', cat: 'culture', file: 'us/culture-baseball.v1.svg', name: nm('เบสบอลกับถุงมือ', 'Baseball and glove'), kw: ['baseball', 'เบสบอล', 'ballpark', 'สนามเบสบอล', 'game', 'mitt', 'ถุงมือ'], colour: true,
    // a big tan leather glove with laced fingers holding a white ball with red stitches, a little wooden bat behind
    svg: free(g(170, 110, 1, R(-8, -90, 16, 170, '#D7A86E', 8) + R(-12, 70, 24, 14, '#8D6E63', 6), 30) + P('M50 200c-30-30-30-90-6-120 6-26 30-30 40-8 6-26 34-26 40 0 10-20 34-14 34 10 20-10 36 10 24 30-10 50-30 90-70 96z', '#C68642')
      + Lc('M84 76v40M124 74v42M160 90v36', '#8D5524', 4) + C(116, 150, 34, '#FFFFFF') + Lc('M92 128c10 10 10 34 0 44M140 128c-10 10-10 34 0 44', '#E53935', 3) + Lc('M92 134l6-2M94 148h6M92 162l6 2M140 134l-6-2M138 148h-6M140 162l-6 2', '#E53935', 2) + face(116, 152, 0.5)) },
  // New York
  { id: 'us-newyork.stamp', cat: 'stamp', file: 'us/newyork/stamp.v1.svg', name: nm('ตราประทับนิวยอร์ก', 'New York stamp'), kw: ['new york', 'นิวยอร์ก', 'nyc', 'manhattan'],
    // the Statue of Liberty's torch with its golden flame
    svg: cityStamp('uny-st', { name: 'NEW YORK', sub: 'U.S.A.', ...NY, emblem: P('M86 92h28l-4 14H90z', '#4DB6AC', 3) + R(92, 106, 16, 40, '#4DB6AC', 3, 3) + P('M100 52c-16 12-12 28 0 36 12-8 16-24 0-36z', '#FFCA28', 3) + P('M100 64c-6 6-4 14 0 18 4-4 6-12 0-18z', '#FF7043', 0) + Lc('M84 94h32', '#00695C', 3) }) },
  { id: 'us-newyork.day.centralpark', cat: 'day', file: 'us/newyork/day-centralpark.v1.svg', name: nm('เซ็นทรัลพาร์ก', 'Central Park'), kw: ['central park', 'เซ็นทรัลพาร์ก', 'park', 'สวน', 'bow bridge', 'skyline', 'manhattan', 'picnic', 'carousel'],
    // a ring of tall city towers behind green treetops, a lake with a curved cast-iron bridge and a rowing boat
    svg: scene('uny-d1', '#E1F5FE', [[20, 60, 30], [56, 40, 24], [86, 70, 28], [122, 30, 22], [150, 56, 30], [186, 46, 26], [216, 66, 30]].map(([x, top, w]) => R(x, top, w, 120, ['#90A4AE', '#B0BEC5', '#78909C'][x % 3]) + Array.from({ length: 4 }, (_, k) => Lc(`M${x + 6} ${top + 14 + k * 18}h${w - 12}`, '#ECEFF1', 3)).join('')).join('')
      + [20, 60, 100, 140, 180, 220].map((x) => C(x, 150, 24, '#66BB6A')).join('') + P('M-4 168h248v80H-4z', '#81D4FA') + P('M60 200c20-30 100-30 120 0', 'none', 0) + Lc('M60 200c20-30 100-30 120 0', '#ECEFF1', 8) + Lc('M60 200c20-30 100-30 120 0', INK, 2) + Lc('M80 188v12M100 180v20M120 178v22M140 180v20M160 188v12', INK, 2)
      + P('M150 224h40l-6 8h-28z', '#E53935', 3) + Lc('M162 222l-10-10M178 222l10-10', '#8D6E63', 3)) },
  { id: 'us-newyork.landmark.liberty', cat: 'landmark', file: 'us/newyork/landmark-liberty.v1.svg', name: nm('เทพีเสรีภาพ', 'The Statue of Liberty'), kw: ['statue of liberty', 'เทพีเสรีภาพ', 'liberty island', 'ellis island', 'staten island ferry', 'เรือเฟอร์รี'], colour: true, spot: nm('หาคุณป้าสีเขียวที่ชูคบเพลิง', 'Find the green lady holding up a torch'),
    // the copper-green statue on her star-shaped pedestal: the seven-point crown, the raised torch with a golden flame, the tablet in her arm
    svg: free(P('M80 220v-40h80v40z', '#D7CCC8') + P('M70 180l20-14h60l20 14z', '#BCAAA4') + P('M96 166c0-60 4-90 24-90s24 30 24 90z', '#4DB6AC') + Lc('M104 166c0-40 2-70 10-84M134 166c0-40-2-70-8-84', '#26A69A', 4)
      + P('M136 104c10-20 18-40 18-62h10c0 26-8 48-20 66z', '#4DB6AC') + R(150, 30, 18, 12, '#4DB6AC', 3) + P('M159 4c-12 10-8 22 0 26 8-4 12-16 0-26z', '#FFCA28') + R(90, 110, 18, 26, '#80CBC4', 3, 3)
      + C(120, 64, 18, '#4DB6AC') + [-60, -30, 0, 30, 60].map((a) => g(120, 56, 1, P('M-3 -16l3-14 3 14z', '#80CBC4', 2.5), a)).join('') + face(120, 66, 0.4)) },
  { id: 'us-newyork.landmark.empire', cat: 'landmark', file: 'us/newyork/landmark-empire.v1.svg', name: nm('ตึกเอ็มไพร์สเตต', 'The Empire State Building'), kw: ['empire state', 'empire state building', 'เอ็มไพร์สเตต', 'observation deck', 'จุดชมวิว', 'skyscraper', 'ตึกระฟ้า', 'midtown'], colour: true, spot: nm('หาตึกสูงที่มีเสาแหลมบนยอด', 'Find the tall tower with a needle on top'),
    // the stepped art-deco tower narrowing in tiers, a long antenna mast, lit windows in rows, a tiny airship drifting by
    svg: free(R(60, 160, 120, 60, '#B0BEC5') + R(76, 110, 88, 50, '#B0BEC5') + R(90, 70, 60, 40, '#CFD8DC') + R(102, 44, 36, 26, '#CFD8DC') + R(112, 30, 16, 14, '#ECEFF1') + Lc('M120 30V4', INK, 4)
      + [[72, 170], [88, 122], [100, 80]].map(([x, y]) => Array.from({ length: 3 }, (_, k) => Lc(`M${x + 6 + k * ((240 - 2 * x) / 3)} ${y}v${220 - y - 14}`, '#FFE082', 4)).join('')).join('')
      + E(196, 50, 26, 10, '#E0E0E0') + R(190, 58, 12, 6, '#90A4AE', 2, 2) + face(120, 136, 0.45)) },
  { id: 'us-newyork.landmark.brooklyn', cat: 'landmark', file: 'us/newyork/landmark-brooklyn.v1.svg', name: nm('สะพานบรุกลิน', 'The Brooklyn Bridge'), kw: ['brooklyn bridge', 'สะพานบรุกลิน', 'brooklyn', 'บรุกลิน', 'dumbo', 'east river', 'walk the bridge'], colour: true, spot: nm('หาสะพานหินที่มีประตูโค้งคู่', 'Find the stone bridge with two pointed arches'),
    // a stone tower with two tall pointed Gothic arches, a fan of cables sweeping down to the deck, the river below
    svg: free(P('M-4 196h248v30H-4z', '#4FC3F7') + R(-4, 160, 248, 12, '#8D6E63') + R(82, 40, 76, 156, '#D7B99A') + [[100, 120], [140, 120]].map(([x, y]) => P(`M${x - 11} 160v-${y - 60}l11-18 11 18v${y - 60}z`, '#4FC3F7')).join('') + R(76, 32, 88, 14, '#BCAAA4', 2)
      + Lc('M86 44C60 110 30 150-4 158M154 44c26 66 56 106 90 114', INK, 4) + [20, 40, 60].map((x) => Lc(`M${x} ${150 - x * 0.6}v${12 + x * 0.6}`, INK, 2)).join('') + [180, 200, 220].map((x) => Lc(`M${x} ${100 + (x - 160) * 0.6}v${60 - (x - 160) * 0.6}`, INK, 2)).join('') + face(120, 70, 0.4)) },
  { id: 'us-newyork.landmark.taxi', ch: '🚕', cat: 'landmark', file: 'us/newyork/landmark-taxi.v1.svg', name: nm('แท็กซี่เหลืองนิวยอร์ก', 'A New York yellow cab'), kw: ['yellow cab', 'แท็กซี่เหลือง', 'taxi', 'แท็กซี่', 'times square', 'ไทม์สแควร์', 'broadway', 'บรอดเวย์'], colour: true, spot: nm('นับแท็กซี่สีเหลืองบนถนน', 'Count the yellow taxis on the street'),
    // a chunky yellow sedan with a checkerboard stripe and a roof light, glowing signs of a busy square behind it
    svg: free([[20, 30, '#E040FB'], [70, 20, '#40C4FF'], [170, 26, '#FF5252']].map(([x, y, c]) => R(x, y, 50, 60, c, 4)).join('') + [[30, 44], [80, 34], [180, 40]].map(([x, y]) => R(x, y, 30, 8, '#FFFFFF', 2, 2)).join('')
      + P('M20 186v-30c0-10 8-14 20-16l26-30h96l28 30c14 2 30 6 30 18v28z', '#FFC107') + [80, 132].map((x) => R(x - 4, 116, 46, 24, '#B3E5FC', 3, 3)).join('') + Array.from({ length: 8 }, (_, k) => R(40 + k * 20, 160, 10, 8, k % 2 ? INK : '#FFFFFF', 0, 0)).join('') + R(104, 96, 32, 12, '#FFF59D', 3, 3)
      + [[66, 190], [176, 190]].map(([x, y]) => C(x, y, 18, INK) + C(x, y, 7, '#B0BEC5', 0)).join('') + face(212, 168, 0.35)) },
  // California
  { id: 'us-california.stamp', cat: 'stamp', file: 'us/california/stamp.v1.svg', name: nm('ตราประทับแคลิฟอร์เนีย', 'California stamp'), kw: ['california', 'แคลิฟอร์เนีย', 'los angeles', 'san francisco'],
    // a bright orange poppy under a sun
    svg: cityStamp('uca-st', { name: 'CALIFORNIA', sub: 'U.S.A.', ...CA_, emblem: C(130, 64, 14, '#FFD54A', 3) + [0, 72, 144, 216, 288].map((a) => g(96, 108, 1, P('M0 0c-14-10-14-30 0-34 14 4 14 24 0 34z', '#FF6D00', 3), a)).join('') + C(96, 108, 7, '#FFD600', 2.5) + Lc('M96 116c0 14-2 24-8 32', '#43A047', 4) }) },
  { id: 'us-california.day.pier', cat: 'day', file: 'us/california/day-pier.v1.svg', name: nm('ท่าเรือซานตาโมนิกา', 'Santa Monica pier'), kw: ['santa monica', 'ซานตาโมนิกา', 'pier', 'beach', 'ชายหาด', 'ferris wheel', 'ชิงช้าสวรรค์', 'venice beach', 'malibu', 'los angeles'],
    // a wide sandy beach with palm trees, a long pier on stilts holding a Ferris wheel and a little roller coaster, a sunset sky
    svg: scene('uca-d1', '#FFCCBC', C(60, 70, 26, '#FFE082') + P('M-4 150h248v40H-4z', '#4FC3F7') + R(80, 140, 170, 10, '#A1673F') + [96, 130, 164, 198, 232].map((x) => Lc(`M${x} 150v40`, '#6D4C41', 4)).join('')
      + C(170, 96, 40, 'none', 5) + Array.from({ length: 8 }, (_, k) => { const a = (k * Math.PI) / 4; return Lc(`M170 96l${(Math.cos(a) * 40).toFixed(1)} ${(Math.sin(a) * 40).toFixed(1)}`, INK, 2) + C(170 + Math.cos(a) * 40, 96 + Math.sin(a) * 40, 6, ['#E53935', '#FFCA28', '#1E88E5', '#43A047'][k % 4], 2); }).join('') + Lc('M150 140l20-44 20 44', INK, 3) + Lc('M100 140c10-30 20-30 30 0', '#E53935', 4)
      + P('M-4 186c60-10 180-10 248 0v70H-4z', '#FFE0B2') + [[30, 190], [220, 196]].map(([x, y]) => Lc(`M${x} ${y}c-2-30 2-50 8-70`, '#8D6E63', 6) + P(`M${x + 8} ${y - 70}c-20-10-30 0-36 10 14-6 24-6 36-10zM${x + 8} ${y - 70}c20-10 30 0 36 10-14-6-24-6-36-10zM${x + 8} ${y - 70}c-4-16 4-26 14-30-4 12-8 20-14 30z`, '#43A047', 3)).join('')) },
  { id: 'us-california.landmark.goldengate', cat: 'landmark', file: 'us/california/landmark-goldengate.v1.svg', name: nm('สะพานโกลเดนเกต', 'The Golden Gate Bridge'), kw: ['golden gate', 'golden gate bridge', 'โกลเดนเกต', 'san francisco', 'ซานฟรานซิสโก', 'fog', 'หมอก', 'presidio'], colour: true, spot: nm('หาสะพานสีส้มแดงที่โผล่จากหมอก', 'Find the orange-red bridge peeking out of the fog'),
    // two tall orange-red towers with stacked doorway frames, the long sagging main cables, puffs of fog rolling under, the bay below
    svg: free(P('M-4 190h248v36H-4z', '#4FC3F7') + R(-4, 160, 248, 10, '#E8562A') + [70, 170].map((x) => R(x - 9, 40, 18, 150, '#E8562A') + [60, 100, 140].map((y) => R(x - 6, y, 12, 22, '#4FC3F7', 0, 2)).join('')).join('')
      + Lc('M-4 150C30 150 60 80 70 44c20 70 80 70 100 0 10 36 40 106 74 106', '#E8562A', 5) + [90, 110, 130, 150].map((x) => Lc(`M${x} ${x < 120 ? 64 + (x - 70) * 0.3 : 64 + (170 - x) * 0.3}v${96 - (x < 120 ? (x - 70) * 0.3 : (170 - x) * 0.3)}`, '#E8562A', 2)).join('')
      + [[30, 180, 30], [120, 186, 36], [210, 180, 28]].map(([x, y, r]) => E(x, y, r, r * 0.4, '#FFFFFF', 3)).join('') + face(120, 186, 0.4)) },
  { id: 'us-california.landmark.cablecar', cat: 'landmark', file: 'us/california/landmark-cablecar.v1.svg', name: nm('รถรางเคเบิลซานฟรานซิสโก', 'A San Francisco cable car'), kw: ['cable car', 'รถรางเคเบิล', 'san francisco', 'ซานฟรานซิสโก', 'powell street', 'hyde street', 'lombard street', 'hills', 'เนินเขา'], colour: true, spot: nm('หารถรางไม้ที่ไต่ขึ้นเนินชัน', 'Find the wooden tram climbing the steep hill'),
    // a little red-and-cream wooden tram tipped on a steep street, open benches with poles, a brass bell, painted houses up the hill
    svg: free(P('M-4 230L244 120v110z', '#90A4AE') + Lc('M-4 222L244 112', '#FFE082', 3) + [[150, 108, '#F48FB1'], [190, 90, '#80DEEA'], [226, 74, '#FFF59D']].map(([x, y, c]) => R(x - 16, y - 50, 32, 50, c, 0) + P(`M${x - 20} ${y - 50}l20-16 20 16z`, '#8D6E63', 3)).join('')
      + g(100, 160, 1, R(-70, -50, 140, 60, '#C62828', 6) + R(-74, -66, 148, 18, '#FFF8E1', 6) + [-46, -14, 18, 50].map((x) => R(x - 10, -40, 20, 26, '#FFF8E1', 2, 3)).join('') + R(-70, 4, 140, 10, '#5D4037', 2) + C(-40, 22, 9, INK) + C(40, 22, 9, INK) + C(0, -76, 7, '#FFCA28', 3), -24) + face(96, 154, 0.4)) },
  { id: 'us-california.landmark.halfdome', cat: 'landmark', file: 'us/california/landmark-halfdome.v1.svg', name: nm('ฮาล์ฟโดม โยเซมิตี', 'Half Dome, Yosemite'), kw: ['yosemite', 'โยเซมิตี', 'half dome', 'ฮาล์ฟโดม', 'national park', 'อุทยานแห่งชาติ', 'waterfall', 'น้ำตก', 'giant sequoia', 'sequoia'], colour: true, spot: nm('หาภูเขาหินที่เหมือนถูกผ่าครึ่ง', 'Find the rock mountain cut in half'),
    // the granite dome sliced flat on one side, a ribbon waterfall down the cliff beside it, giant sequoia trees in front
    svg: free(P('M40 200c0-70 40-130 100-130 10 0 16 40 16 130z', '#B0BEC5') + Lc('M140 70v130', '#78909C', 5) + Lc('M70 140c20-30 40-40 60-46', '#CFD8DC', 4) + P('M170 200V90c20-10 40-10 60 0v110z', '#90A4AE') + Lc('M196 92v108', '#E1F5FE', 8) + E(196, 200, 16, 6, '#E1F5FE', 3)
      + [[30, 120], [210, 140]].map(([x, top]) => R(x - 8, top + 50, 16, 230 - top - 50, '#A0522D', 3) + P(`M${x} ${top}c-26 20-26 50 0 60 26-10 26-40 0-60z`, '#2E7D32')).join('') + face(110, 150, 0.45)) },
  // the Orlando park day
  { id: 'p-orlando.stamp', cat: 'stamp', file: 'us/orlando/stamp.v1.svg', name: nm('ตราประทับออร์แลนโด', 'Orlando stamp'), kw: ['orlando', 'ออร์แลนโด', 'florida', 'ฟลอริดา', 'theme park', 'สวนสนุก'],
    // an orange (Florida's fruit) on a leafy twig, a loop of roller-coaster track round it
    svg: cityStamp('por-st', { name: 'ORLANDO', sub: 'FLORIDA', ...OR, emblem: Lc('M54 128c0-60 92-60 92 0s-46 24-46 0', '#7B1FA2', 5) + C(100, 100, 24, '#FF9800', 3) + Lc('M90 92c4-4 10-6 14-4', '#FFE0B2', 3) + P('M100 76c4-14 20-18 28-10-8 8-18 12-28 10z', '#43A047', 2.5) }) },
  { id: 'p-orlando.day.parks', cat: 'day', file: 'us/orlando/day-parks.v1.svg', name: nm('วันเที่ยวสวนสนุก', 'A day at the theme parks'), kw: ['theme park', 'สวนสนุก', 'roller coaster', 'รถไฟเหาะ', 'rides', 'เครื่องเล่น', 'parade', 'ขบวนพาเหรด', 'fireworks', 'ดอกไม้ไฟ'],
    // a twisting roller coaster loop over palm trees, a spinning teacup ride, a bunch of balloons, fireworks in an evening sky
    svg: scene('por-d1', '#D1C4E9', [[60, 50, '#FF4081'], [190, 40, '#FFD740'], [120, 30, '#40C4FF']].map(([x, y, c]) => Array.from({ length: 8 }, (_, k) => { const a = (k * Math.PI) / 4; return Lc(`M${x} ${y}l${(Math.cos(a) * 16).toFixed(1)} ${(Math.sin(a) * 16).toFixed(1)}`, c, 3); }).join('')).join('')
      + Lc('M-4 170c40 0 50-80 90-80s40 40 20 40-20-40 20-40 50 80 120 80', '#7B1FA2', 7) + [30, 70, 110, 150, 190].map((x) => Lc(`M${x} 172v-${30 + (x % 40)}`, '#9575CD', 3)).join('')
      + [[60, 210, '#FF8A80'], [130, 214, '#80DEEA'], [196, 210, '#FFE57F']].map(([x, y, c]) => P(`M${x - 18} ${y - 14}h36c0 18-8 26-18 26s-18-8-18-26z`, c, 3) + Lc(`M${x + 18} ${y - 6}c8 0 8 10 0 10`, INK, 3)).join('') + P('M-4 228h248v24H-4z', '#81C784')
      + [[214, 110, '#E53935'], [226, 100, '#1E88E5'], [204, 98, '#FFCA28']].map(([x, y, c]) => E(x, y, 9, 11, c, 2.5) + Lc(`M${x} ${y + 11}l-6 40`, INK, 1.5)).join('')) },
  { id: 'p-orlando.landmark.rocket', cat: 'landmark', file: 'us/orlando/landmark-rocket.v1.svg', name: nm('จรวดศูนย์อวกาศเคนเนดี', 'A rocket at the Kennedy Space Center'), kw: ['kennedy space center', 'ศูนย์อวกาศเคนเนดี', 'space', 'อวกาศ', 'rocket', 'จรวด', 'nasa', 'cape canaveral', 'แหลมคานาเวอรัล', 'astronaut', 'นักบินอวกาศ', 'space shuttle'], colour: true, spot: nm('หาจรวดสูงที่ตั้งชี้ฟ้า', 'Find the tall rocket pointing at the sky'),
    // a tall white rocket on its launch tower, two side boosters, round windows, puffs of white smoke at the base, a little astronaut waving
    svg: free(R(170, 40, 16, 180, '#E53935', 0, 4) + [60, 90, 120, 150, 180].map((y) => Lc(`M170 ${y}l16 20M186 ${y}l-16 20`, INK, 2)).join('') + Lc('M170 70h-24M170 120h-20', INK, 4)
      + P('M104 180V60c0-30 32-30 32 0v120z', '#FFFFFF') + P('M104 60c0-30 32-30 32 0z', '#E53935') + [[90, 190], [150, 190]].map(([x]) => P(`M${x - 8} 190v-80c0-14 16-14 16 0v80z`, '#ECEFF1')).join('') + C(120, 90, 8, '#64B5F6', 3) + Lc('M104 150h32', '#1E88E5', 4)
      + [[70, 210, 20], [120, 216, 26], [176, 210, 22]].map(([x, y, r]) => C(x, y, r, '#FFFFFF', 3)).join('') + C(40, 150, 14, '#FFFFFF') + R(32, 140, 16, 10, '#90CAF9', 4, 2) + P('M28 164h24v24H28z', '#FFFFFF') + Lc('M54 166l12-14', INK, 4) + face(120, 130, 0.4)) },
  // Hawaii
  { id: 'us-hawaii.stamp', cat: 'stamp', file: 'us/hawaii/stamp.v1.svg', name: nm('ตราประทับฮาวาย', 'Hawaii stamp'), kw: ['hawaii', 'ฮาวาย', 'oahu', 'โออาฮู', 'honolulu', 'โฮโนลูลู', 'maui', 'เมาอิ'],
    // a pink hibiscus flower with a long stamen
    svg: cityStamp('uhi-st', { name: 'HAWAIʻI', sub: 'ALOHA', ...HI, emblem: [0, 72, 144, 216, 288].map((a) => g(100, 104, 1, P('M0 0c-20-10-24-36-4-42 6 0 10 4 12 8 6-6 14-4 16 4 4 18-10 28-24 30z', '#EC407A', 3), a)).join('') + C(100, 104, 8, '#AD1457', 0) + Lc('M100 104l20-24', '#FFCA28', 3) + C(122, 78, 4, '#FFCA28', 2) }) },
  { id: 'us-hawaii.day.waikiki', cat: 'day', file: 'us/hawaii/day-waikiki.v1.svg', name: nm('หาดไวกีกีกับไดมอนด์เฮด', 'Waikiki and Diamond Head'), kw: ['waikiki', 'ไวกีกี', 'diamond head', 'ไดมอนด์เฮด', 'beach', 'ชายหาด', 'surf', 'โต้คลื่น', 'honolulu', 'โฮโนลูลู', 'outrigger canoe'],
    // the green crater ridge of Diamond Head across a turquoise bay, a surfer on a little wave, an outrigger canoe, a beach umbrella and palms
    svg: scene('uhi-d1', '#B3E5FC', C(196, 54, 18, '#FFF59D') + P('M90 120c20-30 40-50 70-50s60 20 90 50z', '#8BC34A') + Lc('M110 104c20-14 40-20 60-20', '#689F38', 4) + P('M-4 120h248v80H-4z', '#26C6DA')
      + Lc('M20 150c20-10 40 10 60 0s40 10 60 0', '#FFFFFF', 4) + P('M150 146l40-4-4 6h-34z', '#FF7043', 3) + C(166, 132, 6, '#FFE0BD', 2.5) + Lc('M166 138v8', INK, 3) + P('M40 176h50l-6 6H44z', '#A1673F', 3) + Lc('M50 190c10 0 20-6 26-14', '#A1673F', 3)
      + P('M-4 196c60-10 180-10 248 0v60H-4z', '#FFE0B2') + Lc('M180 220l20-50', INK, 3) + P('M170 176c10-20 50-20 60 0z', '#E53935') + Lc('M30 230c-2-30 2-50 10-70', '#8D6E63', 6) + P('M40 160c-20-10-30 0-36 10 14-6 24-6 36-10zM40 160c20-10 30 0 36 10-14-6-24-6-36-10z', '#43A047', 3)) },
  { id: 'us-hawaii.landmark.volcano', cat: 'landmark', file: 'us/hawaii/landmark-volcano.v1.svg', name: nm('ภูเขาไฟคีเลาเวอา', 'Kīlauea volcano'), kw: ['volcano', 'ภูเขาไฟ', 'kilauea', 'kīlauea', 'คีเลาเวอา', 'big island', 'เกาะใหญ่', 'lava', 'ลาวา', 'volcanoes national park'], colour: true, spot: nm('หาภูเขาไฟที่มีควันพวยพุ่ง', 'Find the volcano puffing out steam'),
    // a wide black lava mountain with a glowing orange crater, puffs of steam, a ribbon of lava running to the sea, ferns at the foot
    svg: free(P('M10 210c30-60 60-110 80-120h60c20 10 50 60 80 120z', '#424242') + P('M90 92c10 8 50 8 60 0-6 12-54 12-60 0z', '#FF6D00', 3) + P('M118 96c-6 30 10 50 0 80s20 30 10 34h12c10-10-14-20-6-40s-8-50-4-74z', '#FF9800', 3)
      + [[106, 60, 14], [130, 44, 18], [150, 22, 12]].map(([x, y, r]) => C(x, y, r, '#ECEFF1', 3)).join('') + P('M-4 214h248v14H-4z', '#26C6DA') + [[40, 200], [200, 200]].map(([x, y]) => Lc(`M${x} ${y}c-10-14-16-30-12-44M${x} ${y}c10-14 16-30 12-44M${x} ${y}v-50`, '#43A047', 4)).join('') + face(120, 150, 0.45, 'o')) },
  { id: 'us-hawaii.landmark.luau', cat: 'landmark', file: 'us/hawaii/landmark-luau.v1.svg', name: nm('ลูเอาและอูคูเลเล่', 'A lūʻau with a ukulele'), kw: ['luau', 'lūʻau', 'ลูเอา', 'ukulele', 'อูคูเลเล่', 'hula', 'ฮูลา', 'lei', 'พวงมาลัยฮาวาย', 'polynesian cultural center', 'show'], colour: true, spot: nm('หาอูคูเลเล่ตัวเล็กกับพวงมาลัยดอกไม้', 'Find the little ukulele and the flower garland'),
    // a little honey-wood ukulele leaning on a tiki torch, a flower lei of pink, yellow and white blossoms round its neck, a grass skirt fringe below
    svg: free(Lc('M190 220V60', '#8D6E63', 8) + P('M180 60h20l-4-16h-12z', '#6D4C41', 3) + P('M190 44c-10-10-6-24 0-30 6 6 10 20 0 30z', '#FF9800', 3)
      + g(110, 120, 1, P('M0 10c20 0 28 16 20 30 16 6 18 34 0 44-10 6-30 6-40 0-18-10-16-38 0-44-8-14 0-30 20-30z', '#E9A64C') + C(0, 46, 10, INK) + R(-5, -80, 10, 90, '#6D4C41', 2) + R(-9, -98, 18, 22, '#6D4C41', 4) + Lc('M-2-80v150M2-80v150', '#ECEFF1', 1.2), -18)
      + Array.from({ length: 9 }, (_, k) => { const a = Math.PI * (0.15 + k * 0.09); return C(110 + Math.cos(a) * 36, 76 + Math.sin(a) * 30, 8, ['#F48FB1', '#FFF176', '#FFFFFF'][k % 3], 2.5); }).join('')
      + Array.from({ length: 12 }, (_, k) => Lc(`M${40 + k * 14} 200v${24 + (k % 3) * 4}`, '#8BC34A', 4)).join('') + face(110, 170, 0.45)) },
  // ---------- Canada
  { id: 'ca.stamp', cat: 'stamp', file: 'ca/stamp.v1.svg', name: nm('ตราประทับแคนาดา', 'Canada stamp'), kw: ['canada', 'แคนาดา'],
    // a red maple leaf on snow with two little pine trees
    svg: countryStamp({ name: 'CANADA', ...CA, emblem: maple(100, 96, 1.1, '#E53935', 3) + Lc('M100 128v20', '#8D6E63', 4) + [[56, 136], [144, 136]].map(([x, y]) => P(`M${x} ${y - 30}l-12 30h24z`, '#2E7D32', 2.5)).join('') }) },
  { id: 'ca.flag', ch: '🇨🇦', cat: 'flag', file: 'ca/flag.v1.svg', name: nm('ธงแคนาดา', 'Flag of Canada'), kw: ['canada', 'แคนาดา', 'flag', 'ธง', 'maple leaf'],
    // red, white, red, the red maple leaf in the middle
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF') + P('M44 38c14-4 26-4 40-2v114c-14-2-26-2-40 2z', '#D52B1E', 0) + P('M172 38c14-3 28-4 40 0v112c-12-4-26-3-40 0z', '#D52B1E', 0)
      + maple(128, 92, 0.85, '#D52B1E', 0) + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', 'none')) },
  { id: 'ca.hello', cat: 'hello', file: 'ca/hello.v1.svg', name: nm('เฮลโล บงชูร์ สวัสดี', 'Hello, bonjour'), kw: ['hello', 'bonjour', 'เฮลโล', 'บงชูร์', 'สวัสดี', 'toque', 'winter', 'skating', 'สเก็ตน้ำแข็ง'],
    // a child on ice skates in a red winter jacket and a striped toque with a pompom, mittens, arms out balancing
    svg: free(P('M80 180c0-40 16-56 40-56s40 16 40 56z', '#E53935') + Lc('M120 128v52', '#B71C1C', 3) + Lc('M80 150l-30-14M160 150l30-14', '#E53935', 14) + C(46, 134, 9, '#1E88E5', 3) + C(194, 134, 9, '#1E88E5', 3)
      + R(98, 180, 16, 26, '#37474F', 4) + R(126, 180, 16, 26, '#37474F', 4) + Lc('M88 214h32M120 214h32', '#B0BEC5', 4) + C(120, 92, 32, '#FFE0BD') + P('M88 84c0-30 64-30 64 0z', '#FFFFFF') + Lc('M90 74h60M92 64h56', '#E53935', 5) + C(120, 44, 10, '#E53935', 3) + face(120, 98, 0.6)) },
  { id: 'ca.food.poutine', cat: 'food', file: 'ca/food-poutine.v1.svg', name: nm('ปูตีน', 'Poutine'), kw: ['poutine', 'ปูตีน', 'fries', 'เฟรนช์ฟรายส์', 'gravy', 'น้ำเกรวี', 'cheese curds', 'quebec', 'ควิเบก'], colour: true,
    // a paper boat piled with chunky fries, white cheese curds and brown gravy dripping over the edge
    svg: free(P('M30 150h180l-20 60H50z', '#FFFFFF') + Lc('M30 150h180', '#E53935', 6) + Array.from({ length: 9 }, (_, k) => R(44 + k * 18, 100 + (k % 3) * 8, 14, 56, '#FFD54A', 3)).join('')
      + P('M44 120c20-20 50-10 76-16s60 0 80 14c-6 20-30 18-34 30-4 10-12 10-14 0-4-10-20-6-30 0-8 6-14 0-16-8-4-8-24-6-30 2-4 6-12 2-10-8 2-10-16-4-22-14z', '#8D5524', 3) + [[80, 112], [122, 106], [160, 116], [104, 128]].map(([x, y]) => R(x - 8, y - 7, 16, 14, '#FFF8E1', 5, 3)).join('') + face(120, 178, 0.55)) },
  { id: 'ca.food.maple', cat: 'food', file: 'ca/food-maple.v1.svg', name: nm('ลูกอมเมเปิลบนหิมะ', 'Maple taffy on snow'), kw: ['maple syrup', 'น้ำเชื่อมเมเปิล', 'maple taffy', 'tire sur la neige', 'sugar shack', 'cabane à sucre', 'ลูกอมเมเปิล', 'maple'], colour: true,
    // warm golden maple syrup poured in lines on a tray of snow and rolled up on wooden sticks, a little maple-leaf bottle beside
    svg: free(R(20, 140, 200, 70, '#E3F2FD', 10) + [40, 70, 100].map((x) => C(x, 150, 6, '#FFFFFF', 0)).join('') + [[60, 170], [110, 176], [160, 170]].map(([x, y]) => Lc(`M${x - 24} ${y}c10-8 30-8 48 0`, '#C77800', 8)).join('')
      + g(80, 110, 1, Lc('M0 0l40-70', '#D7A86E', 5) + E(6, -10, 14, 10, '#C77800'), 0) + P('M170 130v-50c0-10 6-14 10-20h12c4 6 10 10 10 20v50z', '#C77800') + R(178, 44, 16, 16, '#E53935', 3, 3) + maple(186, 100, 0.35, '#FFFFFF', 0) + face(110, 180, 0.5)) },
  { id: 'ca.animal.moose', cat: 'animal', file: 'ca/animal-moose.v1.svg', name: nm('กวางมูส', 'Moose'), kw: ['moose', 'กวางมูส', 'elk', 'wildlife', 'สัตว์ป่า', 'banff', 'jasper', 'algonquin'], colour: true,
    // a big gentle brown moose with wide flat paddle antlers, a droopy nose and a little beard, standing in tall grass
    svg: free(E(140, 150, 70, 40, '#6D4C41') + [[90, 180], [120, 184], [170, 184], [196, 180]].map(([x, y]) => R(x - 7, y, 14, 36, '#5D4037', 5)).join('') + P('M74 90c-10 30-6 60 14 74l26-30c-10-20-20-36-40-44z', '#795548')
      + P('M62 70c-30-6-44-26-40-44 8 10 14 6 16 0 6 12 14 8 16 0 4 14 14 14 18 6 4 16-2 30-10 38zM96 70c30-6 44-26 40-44-8 10-14 6-16 0-6 12-14 8-16 0-4 14-14 14-18 6-4 16 2 30 10 38z', '#D7B99A')
      + C(80, 96, 30, '#795548') + E(70, 124, 24, 18, '#8D6E63') + E(64, 126, 3, 4, INK) + E(78, 126, 3, 4, INK) + P('M76 140c0 14-4 20-10 22 6-8 6-14 4-22z', '#5D4037') + face(84, 92, 0.5)) },
  { id: 'ca.animal.beaver', cat: 'animal', file: 'ca/animal-beaver.v1.svg', name: nm('บีเวอร์', 'Beaver'), kw: ['beaver', 'บีเวอร์', 'dam', 'เขื่อนบีเวอร์', 'wildlife', 'สัตว์ป่า', 'lake', 'ทะเลสาบ'], colour: true,
    // a chubby brown beaver sitting up with a big flat criss-crossed tail, two buck teeth, holding a little twig, a pile of sticks behind
    svg: free([[150, 170, 20], [180, 160, -10], [170, 184, 6]].map(([x, y, r]) => g(x, y, 1, R(-40, -5, 80, 10, '#A1673F', 5, 3), r)).join('') + g(160, 190, 1, E(0, 0, 40, 18, '#5D4037') + Lc('M-30-6l60 12M-30 6l60-12M-14-14v28M14-14v28', '#4E342E', 2), -10)
      + E(100, 160, 46, 52, '#8D6E63') + E(100, 176, 28, 30, '#BCAAA4') + C(100, 92, 34, '#8D6E63') + [[74, 64], [126, 64]].map(([x, y]) => C(x, y, 9, '#795548', 3)).join('') + E(100, 108, 14, 10, '#BCAAA4') + E(100, 102, 6, 4, INK) + R(94, 112, 12, 12, '#FFFFFF', 2, 2.5) + Lc('M100 112v12', INK, 2)
      + Lc('M60 146l40 20', '#6D4C41', 5) + P('M58 144l-8-8M58 144l-10 4', 'none', 3) + face(100, 88, 0.5, 'none')) },
  { id: 'ca.animal.bear', cat: 'animal', file: 'ca/animal-bear.v1.svg', name: nm('หมีกริซลีแห่งเทือกเขาร็อกกี', 'Rocky Mountain grizzly'), kw: ['grizzly', 'หมีกริซลี', 'bear', 'หมี', 'rockies', 'เทือกเขาร็อกกี', 'banff', 'jasper', 'whistler', 'bear spotting'], colour: true,
    // a round golden-brown grizzly with a shoulder hump, sitting by a stream catching a fish in its paws, berries on a bush beside
    svg: free(P('M-4 200c60-10 180-10 248 0v30H-4z', '#81D4FA') + E(120, 150, 62, 52, '#A1673F') + P('M80 110c10-20 40-26 60-14z', '#8D5524') + C(120, 96, 36, '#A1673F') + [[90, 66], [150, 66]].map(([x, y]) => C(x, y, 11, '#8D5524', 3)).join('') + E(120, 112, 16, 12, '#D7B99A') + E(120, 106, 6, 4, INK)
      + E(120, 156, 26, 10, '#90A4AE') + P('M146 156l12-8v16z', '#90A4AE', 3) + C(102, 154, 2.5, INK, 0) + [[90, 160], [150, 160]].map(([x, y]) => C(x, y, 13, '#8D5524')).join('') + C(204, 160, 22, '#43A047') + [[196, 152], [210, 166], [214, 150]].map(([x, y]) => C(x, y, 4, '#3949AB', 2)).join('') + face(120, 92, 0.55)) },
  { id: 'ca.transport.canoe', cat: 'transport', file: 'ca/transport-canoe.v1.svg', name: nm('เรือแคนูสีแดง', 'Red canoe'), kw: ['canoe', 'แคนู', 'paddle', 'พายเรือ', 'lake louise', 'moraine lake', 'ทะเลสาบ', 'algonquin', 'boathouse'], colour: true,
    // a long red canoe with curled-up ends, wooden seats, a paddle across, ripples on the water
    svg: free(P('M-4 170c40-6 200-6 248 0v40H-4z', '#4DD0E1') + Lc('M30 186c20 6 40-6 60 0M150 190c20 6 40-6 60 0', '#FFFFFF', 3) + P('M14 140c40 30 172 30 212 0-10 26-50 40-106 40S24 166 14 140z', '#E53935') + Lc('M14 140c0-10 6-16 10-20M226 140c0-10-6-16-10-20', '#C62828', 6)
      + [80, 120, 160].map((x) => Lc(`M${x} 150v${x === 120 ? 22 : 18}`, '#A1673F', 5)).join('') + g(120, 140, 1, Lc('M-80 0h120', '#A1673F', 5) + E(56, 0, 20, 8, '#A1673F'), -14) + face(120, 162, 0.45)) },
  { id: 'ca.culture.hockey', ch: '🏒', cat: 'culture', file: 'ca/culture-hockey.v1.svg', name: nm('ไม้ฮอกกี้น้ำแข็ง', 'Ice hockey'), kw: ['ice hockey', 'ฮอกกี้น้ำแข็ง', 'hockey', 'ฮอกกี้', 'skating rink', 'ลานสเก็ต', 'puck', 'game'], colour: true,
    // a wooden hockey stick with black tape on the blade, a black puck sliding on blue ice with little speed lines, a red net behind
    svg: free(P('M140 60h70v80h-70z', '#FFFFFF') + Lc('M150 60v80M170 60v80M190 60v80M140 80h70M140 100h70M140 120h70', '#E53935', 2) + R(136, 54, 78, 10, '#E53935', 3) + P('M-4 170h248v50H-4z', '#B3E5FC')
      + Lc('M60 30l50 130', '#D7A86E', 12) + P('M104 150l10 22h60l-4-14z', '#D7A86E') + Lc('M120 168h46', INK, 6) + E(70, 190, 22, 8, INK) + E(70, 184, 22, 8, '#424242') + Lc('M20 184h20M24 196h16', '#FFFFFF', 3) + face(70, 186, 0.35)) },
  // Vancouver
  { id: 'ca-vancouver.stamp', cat: 'stamp', file: 'ca/vancouver/stamp.v1.svg', name: nm('ตราประทับแวนคูเวอร์', 'Vancouver stamp'), kw: ['vancouver', 'แวนคูเวอร์', 'british columbia', 'บริติชโคลัมเบีย'],
    // an orca leaping out of a wave
    svg: cityStamp('cva-st', { name: 'VANCOUVER', sub: 'CANADA', ...VA, emblem: P('M56 120c10-40 50-60 84-46l12-20 2 26c10 10 10 24 4 34-30-6-60 0-102 6z', INK, 3) + E(96, 96, 10, 5, '#FFFFFF', 0) + P('M70 116c20 6 50 4 80-4-10 12-60 16-80 4z', '#FFFFFF', 0) + Lc('M40 132c16-8 30 8 46 0s30 8 46 0 30 8 30 0', '#1E88E5', 4) }) },
  { id: 'ca-vancouver.day.stanleypark', cat: 'day', file: 'ca/vancouver/day-stanleypark.v1.svg', name: nm('สแตนลีย์พาร์กและซีวอลล์', 'Stanley Park seawall'), kw: ['stanley park', 'สแตนลีย์พาร์ก', 'seawall', 'ซีวอลล์', 'bike ride', 'ปั่นจักรยาน', 'english bay', 'aquarium', 'harbour'],
    // snowy blue mountains over the harbour, glassy towers on the shore, a tall forest edge and the seawall path with a family on bikes
    svg: scene('cva-d1', '#E1F5FE', P('M-4 110l50-50 30 26 40-50 50 50 30-24 50 48z', '#90A4AE') + P('M36 70l10-10 10 8zM116 36l10-8 14 12z', '#FFFFFF', 3)
      + [[130, 90, 18], [152, 80, 16], [172, 96, 20], [196, 86, 16]].map(([x, top, w]) => R(x, top, w, 110 - top + 20, '#80DEEA')).join('') + P('M-4 120h248v60H-4z', '#4FC3F7') + [10, 34, 58, 82].map((x) => P(`M${x} 124l14-44 14 44z`, '#2E7D32')).join('')
      + P('M-4 180h248v70H-4z', '#A5D6A7') + R(-4, 178, 248, 14, '#BDBDBD') + [[150, 186], [190, 186]].map(([x, y]) => C(x - 10, y, 7, 'none', 3) + C(x + 10, y, 7, 'none', 3) + Lc(`M${x - 10} ${y}l8-10h8l4 10M${x} ${y - 10}v-12`, INK, 2.5) + C(x, y - 26, 6, '#FFE0BD', 2.5)).join('')) },
  { id: 'ca-vancouver.landmark.capilano', cat: 'landmark', file: 'ca/vancouver/landmark-capilano.v1.svg', name: nm('สะพานแขวนคาพิลาโน', 'Capilano suspension bridge'), kw: ['capilano', 'คาพิลาโน', 'suspension bridge', 'สะพานแขวน', 'north vancouver', 'treetops', 'grouse mountain', 'เกราส์เมาน์เทน', 'rainforest'], colour: true, spot: nm('หาสะพานเชือกที่แกว่งเหนือหุบเขา', 'Find the swinging rope bridge over the canyon'),
    // a long rope-and-plank bridge sagging between giant fir trees over a deep canyon, a river far below, a tiny waving walker
    svg: free(P('M-4 220V80c20 0 30 40 40 140zM244 220V70c-20 0-30 40-40 150z', '#8D6E63') + Lc('M110 220c0-20 10-30 20-30s20 10 20 30', '#4FC3F7', 10)
      + [[20, 40], [220, 30]].map(([x, top]) => R(x - 6, top + 60, 12, 80, '#5D4037', 3) + P(`M${x} ${top}l-22 40h12l-16 30h52l-16-30h12z`, '#2E7D32', 3)).join('')
      + Lc('M30 120c60 60 120 60 180-10', '#A1673F', 6) + Lc('M30 100c60 60 120 60 180-10', '#A1673F', 3) + Array.from({ length: 9 }, (_, k) => { const x = 50 + k * 18, y = 120 + Math.sin((k + 1) / 10 * Math.PI) * 42; return Lc(`M${x} ${y.toFixed(1)}v-20`, '#A1673F', 2); }).join('')
      + C(120, 132, 6, '#FFE0BD', 2.5) + R(115, 138, 10, 14, '#FF7043', 2, 2) + Lc('M126 140l8-8', INK, 2.5) + face(220, 120, 0.4)) },
  { id: 'ca-vancouver.landmark.seaplane', cat: 'landmark', file: 'ca/vancouver/landmark-seaplane.v1.svg', name: nm('เครื่องบินทะเลแวนคูเวอร์', 'A Vancouver seaplane'), kw: ['seaplane', 'เครื่องบินทะเล', 'floatplane', 'harbour', 'coal harbour', 'flight to victoria', 'วิกตอเรีย', 'canada place'], colour: true, spot: nm('หาเครื่องบินที่มีทุ่นลอยน้ำแทนล้อ', 'Find the plane with floats instead of wheels'),
    // a little yellow-and-blue propeller plane with high wings, sitting on two long floats on the harbour water, white sails of the pier behind
    svg: free([[30, 110], [60, 100], [90, 110]].map(([x, y]) => P(`M${x - 16} ${y + 20}l16-40 16 40z`, '#FFFFFF', 3)).join('') + R(10, 128, 100, 10, '#B0BEC5', 2) + P('M-4 190h248v36H-4z', '#4FC3F7')
      + R(60, 70, 160, 14, '#1565C0', 6) + P('M80 116c0-20 10-30 30-30h70c16 0 30 10 36 30z', '#FFC107') + [118, 146, 174].map((x) => R(x, 92, 20, 16, '#B3E5FC', 3, 3)).join('') + P('M216 116l20-40h6v40z', '#1565C0') + R(64, 104, 16, 14, '#424242', 3) + Lc('M60 92v38', INK, 4)
      + Lc('M110 116l-6 50M180 116l6 50', INK, 3) + [[100, 176], [190, 176]].map(([x, y]) => P(`M${x - 70} ${y}h120c10 0 14 8 6 12H${x - 60}z`, '#ECEFF1')).join('') + face(150, 130, 0.35)) },
  // Banff
  { id: 'ca-banff.stamp', cat: 'stamp', file: 'ca/banff/stamp.v1.svg', name: nm('ตราประทับบานฟ์', 'Banff stamp'), kw: ['banff', 'บานฟ์', 'alberta', 'อัลเบอร์ตา', 'rockies', 'เทือกเขาร็อกกี'],
    // an elk in profile walking down the town's main street, branching antlers, a pale rump, a single peak behind
    svg: cityStamp('cbf-st', { name: 'BANFF', sub: 'ROCKIES', ...BF, emblem: P('M120 70l20-28 20 28z', '#B0BEC5', 2.5) + P('M134 50l6-8 6 8z', '#FFFFFF', 2) + E(98, 112, 32, 16, '#A1673F', 3) + E(126, 108, 8, 10, '#F5E6C8', 2.5) + [[76, 124], [90, 126], [108, 126], [120, 124]].map(([x, y]) => Lc(`M${x} ${y}v18`, '#6D4C41', 4)).join('') + P('M72 104c-6-12-8-24-4-30l10 2c0 10 2 18 6 24z', '#8D5524', 2.5) + E(66, 74, 10, 7, '#8D5524', 2.5) + Lc('M70 68c-4-12 0-24 8-30M72 56l-10-6M74 46l-8-8M76 40l6-10', '#6D4C41', 3) + Lc('M48 146h104', '#9E9E9E', 3) }) },
  { id: 'ca-banff.day.lakelouise', cat: 'day', file: 'ca/banff/day-lakelouise.v1.svg', name: nm('ทะเลสาบหลุยส์', 'Lake Louise'), kw: ['lake louise', 'ทะเลสาบหลุยส์', 'turquoise lake', 'ทะเลสาบสีเทอร์ควอยซ์', 'glacier', 'ธารน้ำแข็ง', 'canoe', 'แคนู', 'chateau'],
    // a glacier hanging between two dark mountains, the milky turquoise lake in front, red canoes on it, spruce trees down both shores
    svg: scene('cbf-d1', '#E1F5FE', P('M-4 140l60-90 30 40 30-50 40 60 30-40 60 80z', '#78909C') + P('M90 90c10-20 20-30 26-40l20 30c-10 10-30 14-46 10z', '#FFFFFF', 3) + P('M30 80l26-30 12 20z', '#FFFFFF', 3)
      + P('M-4 140h248v70H-4z', '#26C6DA') + Lc('M30 170h40M150 186h50', '#B2EBF2', 3) + [[90, 174], [130, 190], [168, 168]].map(([x, y]) => P(`M${x - 18} ${y}c10 6 26 6 36 0-6 6-30 6-36 0z`, '#E53935', 3)).join('')
      + [0, 22, 196, 222].map((x, k) => P(`M${x} 214l12-${50 + (k % 2) * 16} 12 ${50 + (k % 2) * 16}z`, '#1B5E20')).join('') + P('M-4 210h248v40H-4z', '#33691E')) },
  { id: 'ca-banff.landmark.moraine', cat: 'landmark', file: 'ca/banff/landmark-moraine.v1.svg', name: nm('ทะเลสาบโมเรน', 'Moraine Lake'), kw: ['moraine lake', 'ทะเลสาบโมเรน', 'valley of the ten peaks', 'หุบเขาสิบยอด', 'rockpile', 'canoe', 'sunrise'], colour: true, spot: nm('หายอดเขาเรียงกันเป็นแถวริมทะเลสาบสีฟ้า', 'Find the row of peaks beside the blue lake'),
    // a row of many jagged peaks in a line like teeth, a vivid blue lake, a heap of boulders and logs in front, a little spruce
    svg: free(P('M10 130' + Array.from({ length: 10 }, (_, k) => `l11-${36 + (k * 13) % 30}l11 ${36 + (k * 13) % 30}`).join('') + 'z', '#78909C') + Array.from({ length: 10 }, (_, k) => P(`M${21 + k * 22 - 4} ${130 - 36 - (k * 13) % 30 + 8}l4-8 4 8z`, '#FFFFFF', 2)).join('')
      + P('M10 130h220c0 30-20 50-110 50S10 160 10 130z', '#29B6F6') + [[50, 196, 20], [84, 200, 14], [180, 196, 18], [150, 204, 10]].map(([x, y, r]) => E(x, y, r, r * 0.7, '#BDBDBD')).join('') + Lc('M100 210l60-8M96 216l50 2', '#A1673F', 6)
      + P('M206 210l12-50 12 50z', '#1B5E20') + face(120, 150, 0.45)) },
  { id: 'ca-banff.landmark.gondola', cat: 'landmark', file: 'ca/banff/landmark-gondola.v1.svg', name: nm('กระเช้าบานฟ์', 'The Banff Gondola'), kw: ['banff gondola', 'กระเช้าบานฟ์', 'sulphur mountain', 'ซัลเฟอร์เมาน์เทน', 'gondola', 'กระเช้า', 'boardwalk', 'mountain top'], colour: true, spot: nm('หากระเช้าเล็กๆ ที่ไต่ขึ้นยอดเขา', 'Find the little cabins riding up the mountain'),
    // a steep forested mountain with a glass lodge on the summit, a cable running up with three little rounded cabins in different colours, a bighorn sheep on a rock
    svg: free(P('M-4 220L150 40l94 180z', '#90A4AE') + P('M150 40l-20 24 14-4 6 10 8-10 14 6z', '#FFFFFF', 3) + R(132, 44, 36, 14, '#B3E5FC', 3, 3) + Array.from({ length: 6 }, (_, k) => P(`M${20 + k * 24} ${220 - k * 8}l10-30 10 30z`, '#2E7D32', 3)).join('')
      + Lc('M10 200L150 54', INK, 3) + [[40, 168, '#E53935'], [78, 128, '#1E88E5'], [116, 90, '#FFCA28']].map(([x, y, c]) => Lc(`M${x} ${y - 14}v-8`, INK, 2.5) + R(x - 12, y - 14, 24, 24, c, 6) + R(x - 7, y - 9, 14, 9, '#E1F5FE', 2, 2)).join('')
      + E(200, 196, 20, 12, '#A1887F') + C(186, 182, 9, '#A1887F') + Lc('M180 176c-8 0-10 10-2 12', '#5D4037', 4) + R(190, 204, 4, 10, '#5D4037', 0, 2) + R(206, 204, 4, 10, '#5D4037', 0, 2) + face(78, 128, 0.3)) },
];
export default {
  places: {
    us: { country: 'us', wave: 1, name: nm('สหรัฐอเมริกา', 'The United States'), tz: 'America/New_York', alias: ['usa', 'u.s.a.', 'united states', 'america', 'อเมริกา', 'สหรัฐ', 'สหรัฐอเมริกา'], colors: US },
    'us-newyork': { country: 'us', wave: 1, name: nm('นิวยอร์ก', 'New York'), tz: 'America/New_York', ll: [40.71, -74.01], alias: ['new york', 'นิวยอร์ก', 'nyc', 'manhattan', 'แมนแฮตตัน', 'brooklyn', 'บรุกลิน', 'times square', 'ไทม์สแควร์', 'central park', 'เซ็นทรัลพาร์ก', 'jfk', 'statue of liberty'], colors: NY },
    'us-california': { country: 'us', wave: 1, name: nm('แคลิฟอร์เนีย', 'California'), tz: 'America/Los_Angeles', ll: [36.78, -119.42], alias: ['california', 'แคลิฟอร์เนีย', 'los angeles', 'ลอสแอนเจลิส', 'san francisco', 'ซานฟรานซิสโก', 'santa monica', 'ซานตาโมนิกา', 'san diego', 'ซานดิเอโก', 'yosemite', 'โยเซมิตี', 'lax', 'sfo', 'hollywood', 'ฮอลลีวูด', 'anaheim'], colors: CA_ },
    'p-orlando': { country: 'us', wave: 1, name: nm('ออร์แลนโด', 'Orlando'), tz: 'America/New_York', ll: [28.54, -81.38], alias: ['orlando', 'ออร์แลนโด', 'kissimmee', 'คิสซิมมี', 'kennedy space center', 'ศูนย์อวกาศเคนเนดี', 'cape canaveral', 'mco', 'theme parks'], colors: OR },
    'us-hawaii': { country: 'us', wave: 1, name: nm('ฮาวาย', 'Hawaii'), tz: 'Pacific/Honolulu', ll: [21.31, -157.86], alias: ['hawaii', 'ฮาวาย', 'hawaiʻi', 'honolulu', 'โฮโนลูลู', 'oahu', 'โออาฮู', 'waikiki', 'ไวกีกี', 'maui', 'เมาอิ', 'big island', 'kona', 'hilo', 'kauai', 'hnl'], colors: HI },
    ca: { country: 'ca', wave: 1, name: nm('แคนาดา', 'Canada'), tz: 'America/Toronto', alias: ['canada', 'แคนาดา'], colors: CA },
    'ca-vancouver': { country: 'ca', wave: 1, name: nm('แวนคูเวอร์', 'Vancouver'), tz: 'America/Vancouver', ll: [49.28, -123.12], alias: ['vancouver', 'แวนคูเวอร์', 'stanley park', 'สแตนลีย์พาร์ก', 'granville island', 'gastown', 'whistler', 'วิสต์เลอร์', 'capilano', 'victoria', 'yvr', 'british columbia'], colors: VA },
    'ca-banff': { country: 'ca', wave: 1, name: nm('บานฟ์', 'Banff'), tz: 'America/Edmonton', ll: [51.18, -115.57], alias: ['banff', 'บานฟ์', 'lake louise', 'ทะเลสาบหลุยส์', 'moraine lake', 'ทะเลสาบโมเรน', 'jasper', 'แจสเปอร์', 'icefields parkway', 'calgary', 'แคลกะรี', 'yyc', 'canmore', 'rockies'], colors: BF },
  },
  items,
};
