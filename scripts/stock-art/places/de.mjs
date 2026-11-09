// Germany: Munich and the Neuschwanstein day — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const DE = { k1: '#1565C0', k2: '#B71C1C', k3: '#E3F2FD' };
const NS = { k1: '#5E35B1', k2: '#1565C0', k3: '#EDE7F6' };
// the Bavarian lozenges: blue and white diamonds
const rauten = (x, y, w, h, n) => { let s = ''; const dw = w / n; for (let i = 0; i < n; i++) for (let j = 0; j < 3; j++) s += `<path d="M${x + i * dw + dw / 2} ${y + j * h / 3}l${dw / 2} ${h / 6} -${dw / 2} ${h / 6} -${dw / 2} -${h / 6}z" fill="${(i + j) % 2 ? '#FFFFFF' : '#64B5F6'}" stroke="none"/>`; return s; };

const items = [
  { id: 'de.stamp', cat: 'stamp', file: 'de/stamp.v1.svg', name: nm('ตราประทับเยอรมนี', 'Germany stamp'), kw: ['germany', 'เยอรมนี', 'deutschland'],
    // a gingerbread heart (Lebkuchenherz) on a ribbon, iced with a heart and dots
    svg: countryStamp({ name: 'DEUTSCHLAND', ...DE, emblem: Lc('M70 50c10 16 50 16 60 0', '#E53935', 4) + P('M100 140c-40-24-56-50-46-70 8-14 30-14 46 6 16-20 38-20 46-6 10 20-6 46-46 70z', '#B5713E') + Lc('M100 122c-24-16-34-32-28-42 6-8 18-6 28 6 10-12 22-14 28-6 6 10-4 26-28 42z', '#FFFFFF', 3) + [[84, 90], [100, 100], [116, 90]].map(([x, y]) => C(x, y, 3, '#F48FB1', 2)).join('') }) },
  { id: 'de.flag', ch: '🇩🇪', cat: 'flag', file: 'de/flag.v1.svg', name: nm('ธงเยอรมนี', 'Flag of Germany'), kw: ['germany', 'เยอรมนี', 'flag', 'ธง'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFCE00') + P('M44 38c40-12 84 12 126 0s28-4 42 0v37c-14-4 0-12-42 0s-86-12-126 0z', '#212121') + P('M44 75c40-12 84 12 126 0s28-4 42 0v38c-14-4 0-12-42 0s-86-12-126 0z', '#DD0000')) },
  { id: 'de.hello', cat: 'hello', file: 'de/hello.v1.svg', name: nm('ฮัลโล สวัสดี', 'Hallo, hello'), kw: ['hallo', 'ฮัลโล', 'hello', 'สวัสดี', 'lederhosen', 'เลเดอร์โฮเซน', 'dirndl', 'เดิร์นเดิล'],
    // a child in leather Lederhosen with edelweiss braces and a green felt hat with a feather
    svg: free(P('M88 214v-40h64v40z', '#FFE0BD') + R(84, 150, 72, 36, '#8D6E63', 8) + Lc('M100 186v28M140 186v28', '#6D4C41', 6) + P('M86 160c0-26 14-40 34-40s34 14 34 40z', '#FFFFFF') + Lc('M100 122v40M140 122v40M100 140h40', '#6D4C41', 6)
      + C(120, 92, 32, '#FFE0BD') + P('M90 74c0-24 60-24 60 0z', '#43A047') + E(120, 76, 44, 8, '#2E7D32') + P('M144 70c10-20 22-24 30-20-8 6-18 14-30 20z', '#FFFFFF', 3)
      + P('M156 150c14-16 18-38 12-54l14-4c8 22 2 46-14 64z', '#FFE0BD') + C(178, 88, 11, '#FFE0BD') + face(120, 96, 0.6)) },
  { id: 'de.food.pretzel', ch: '🥨', cat: 'food', file: 'de/food-pretzel.v1.svg', name: nm('เพรทเซล', 'Pretzel'), kw: ['pretzel', 'brezel', 'เพรทเซล', 'bakery', 'ร้านขนมปัง', 'oktoberfest', 'beer garden'], colour: true,
    // the knotted brown Bavarian pretzel, thick belly, thin crossed arms, white salt crystals
    svg: free(P('M120 196c-54-10-90-40-90-80 0-34 30-56 58-44 20 8 28 30 32 52 4-22 12-44 32-52 28-12 58 10 58 44 0 40-36 70-90 80z', 'none', 26).replace('fill="none"', 'fill="none" stroke="#A0522D"')
      + P('M120 196c-54-10-90-40-90-80 0-34 30-56 58-44 20 8 28 30 32 52 4-22 12-44 32-52 28-12 58 10 58 44 0 40-36 70-90 80z', 'none', 4) + Lc('M84 172l72-60M156 172l-72-60', '#A0522D', 22) + Lc('M84 172l72-60M156 172l-72-60', INK, 3)
      + [[60, 110], [180, 110], [120, 190], [70, 160], [170, 160]].map(([x, y]) => R(x - 3, y - 3, 6, 6, '#FFFFFF', 1, 2)).join('') + face(120, 196, 0.45)) },
  { id: 'de.food.sausage', ch: '🌭', cat: 'food', file: 'de/food-sausage.v1.svg', name: nm('ไส้กรอกขาวมิวนิก', 'Munich white sausage'), kw: ['weisswurst', 'weißwurst', 'ไส้กรอกขาว', 'sausage', 'ไส้กรอก', 'bratwurst', 'sweet mustard', 'มัสตาร์ด'], colour: true,
    // two plump white sausages floating in a little pot of hot water, a dollop of sweet brown mustard, a pretzel stick
    svg: free(P('M30 110h180c0 60-40 90-90 90s-90-30-90-90z', '#1E88E5') + E(120, 110, 90, 18, '#B3E5FC') + [[90, 100, -14], [150, 96, 10]].map(([x, y, r]) => g(x, y, 1, R(-40, -16, 80, 32, '#F5F0E6', 16) + Lc('M-30-4h4M-10 4h4M10-6h4', '#B0BEC5', 3), r)).join('')
      + Lc('M210 120h22', INK, 6) + E(54, 210, 22, 9, '#FFFFFF') + E(54, 206, 14, 6, '#A1673F') + face(120, 156, 0.7)) },
  { id: 'de.food.blackforest', cat: 'food', file: 'de/food-blackforest.v1.svg', name: nm('เค้กแบล็กฟอเรสต์', 'Black Forest cake'), kw: ['black forest cake', 'เค้กแบล็กฟอเรสต์', 'schwarzwalder', 'cake', 'เค้ก', 'cherry', 'เชอร์รี'], colour: true,
    // a tall slice of chocolate sponge layered with cream, chocolate curls and a cherry with a stem on top
    svg: free(P('M40 200l140-40v-80L40 120z', '#5D4037') + P('M40 120l140-40 20 10-140 40z', '#FFFFFF') + P('M180 80l20 10v80l-20-10z', '#4E342E') + Lc('M40 146l140-40M40 172l140-40', '#FFFFFF', 7) + Lc('M40 146l140-40M40 172l140-40', INK, 2)
      + [[80, 116], [110, 108], [140, 100]].map(([x, y]) => Lc(`M${x - 6} ${y}c4-6 8-6 12 0`, '#3E2723', 4)).join('') + C(150, 84, 12, '#C62828') + Lc('M150 72c4-14 12-20 20-20', '#43A047', 3) + face(100, 160, 0.55)) },
  { id: 'de.animal.squirrel', ch: '🐿', cat: 'animal', file: 'de/animal-squirrel.v1.svg', name: nm('กระรอกแดง', 'Red squirrel'), kw: ['squirrel', 'กระรอก', 'eichhornchen', 'eichhörnchen', 'forest', 'ป่า', 'park', 'สวนสาธารณะ'], colour: true,
    // a red squirrel with ear tufts and a huge bushy tail curled up behind, nibbling an acorn
    svg: free(P('M150 200c50-10 70-60 50-110-10-24-40-30-50-10 20 10 26 40 10 60-10 16-30 20-30 40z', '#E07A3F') + E(110, 160, 40, 46, '#E07A3F') + E(110, 170, 24, 30, '#FFE0B2')
      + C(100, 96, 34, '#E07A3F') + P('M78 70l-4-26 14 14zM120 66l6-26 8 18z', '#E07A3F') + E(84, 126, 10, 12, '#A1673F') + P('M76 116c4-8 16-8 18 0z', '#6D4C41') + face(100, 96, 0.55)) },
  { id: 'de.animal.stork', cat: 'animal', file: 'de/animal-stork.v1.svg', name: nm('นกกระสาขาว', 'White stork'), kw: ['stork', 'นกกระสา', 'storch', 'nest', 'รัง', 'bird', 'นก'], colour: true,
    // a white stork with black wing edges and long red legs and beak, standing in its big twiggy nest on a chimney
    svg: free(R(70, 180, 100, 40, '#B5543D') + Lc('M70 196h100', '#8D3B2F', 3) + E(120, 176, 70, 18, '#A1887F') + Lc('M60 172l20-6M90 182l30-8M140 172l30 6', '#6D4C41', 3)
      + Lc('M110 176l-6-40M130 176l6-40', '#E53935', 4) + E(120, 120, 34, 26, '#FFFFFF') + P('M120 104c20-6 40 0 50 20-20 6-40 2-50-20z', INK) + C(98, 82, 18, '#FFFFFF') + Lc('M84 84l-40 10', '#E53935', 6) + face(98, 80, 0.35)) },
  { id: 'de.transport.ice', cat: 'transport', file: 'de/transport-ice.v1.svg', name: nm('รถไฟ ICE', 'ICE train'), kw: ['ice', 'intercity express', 'รถไฟความเร็วสูง', 'deutsche bahn', 'db', 'hauptbahnhof', 'train'], colour: true,
    // the long white ICE with its flat sloped nose, a red stripe along the side, a dark band of windows
    svg: free(P('M10 176v-60c0-14 8-22 22-22h120c40 0 70 16 88 52l2 30z', '#FFFFFF') + P('M152 98c30 4 56 18 70 46h-70z', '#37474F') + R(20, 104, 130, 24, '#37474F', 6) + Lc('M10 156h230', '#E53935', 6)
      + Lc('M56 104v24M92 104v24M128 104v24', '#607D8B', 2.5) + P('M4 190h232') + C(54, 184, 9, '#5F6B7A') + C(168, 184, 9, '#5F6B7A') + face(200, 132, 0.4)) },
  { id: 'de.culture.nutcracker', cat: 'culture', file: 'de/culture-nutcracker.v1.svg', name: nm('ทหารแกะสลักทุบถั่ว', 'Nutcracker soldier'), kw: ['nutcracker', 'ทหารทุบถั่ว', 'nussknacker', 'christmas market', 'ตลาดคริสต์มาส', 'erzgebirge', 'toy', 'ของเล่น'],
    // a wooden nutcracker soldier: tall black hat with a gold band, white beard, red coat with gold buttons, black boots
    svg: free(R(90, 180, 24, 36, INK, 3) + R(126, 180, 24, 36, INK, 3) + R(84, 120, 72, 64, '#C62828', 6) + [136, 152, 168].map((y) => C(120, y, 4, '#FFD54A', 2.5)).join('') + Lc('M84 150h72', '#FFD54A', 4)
      + C(120, 96, 28, '#FFE0BD') + P('M96 104c0 20 10 28 24 28s24-8 24-28c-8 6-16 8-24 8s-16-2-24-8z', '#FFFFFF') + R(96, 40, 48, 44, INK, 4) + Lc('M96 72h48', '#FFD54A', 5) + C(120, 52, 6, '#FFD54A', 3) + face(120, 94, 0.5, 'none') + Lc('M110 106h20', INK, 3)) },
  { id: 'de.culture.christmasmarket', cat: 'culture', file: 'de/culture-christmasmarket.v1.svg', name: nm('ซุ้มตลาดคริสต์มาส', 'Christmas market stall'), kw: ['christmas market', 'ตลาดคริสต์มาส', 'weihnachtsmarkt', 'christkindlmarkt', 'gluhwein', 'winter', 'ฤดูหนาว'], colour: true,
    // a wooden market hut with a snowy roof, fairy lights, gingerbread hearts hanging, a little fir tree
    svg: free(R(40, 100, 140, 110, '#A1673F') + P('M24 106l86-56 86 56z', '#FFFFFF') + P('M24 106l86-56 86 56', 'none', 4) + R(54, 120, 112, 40, '#FFE0B2', 4) + Lc('M30 104c20 10 40 10 60 0s40-10 60 0 40 10 50 0', INK, 2.5)
      + [[44, 108], [80, 112], [116, 108], [152, 112], [186, 108]].map(([x, y], i) => C(x, y, 4, ['#FFEB3B', '#E53935', '#4FC3F7', '#FFEB3B', '#E53935'][i], 2)).join('') + [[78, 140], [110, 146], [142, 140]].map(([x, y]) => P(`M${x} ${y + 12}c-12-8-16-16-12-20 4-4 10-2 12 2 2-4 8-6 12-2 4 4 0 12-12 20z`, '#B5713E', 2.5)).join('')
      + P('M200 210l20-50 20 50z', '#2E7D32') + face(110, 186, 0.5)) },
  // ---------- Munich
  { id: 'de-munich.stamp', cat: 'stamp', file: 'de/munich/stamp.v1.svg', name: nm('ตราประทับมิวนิก', 'Munich stamp'), kw: ['munich', 'münchen', 'มิวนิก', 'bavaria', 'บาวาเรีย'],
    // the two onion domes of the Frauenkirche over a strip of Bavarian lozenges
    svg: cityStamp('dmu-st', { name: 'MÜNCHEN', sub: 'BAYERN', ...DE, emblem: rauten(56, 124, 88, 18, 8) + [84, 116].map((x) => R(x - 9, 66, 18, 58, '#B5543D') + P(`M${x - 10} 68c0-18 20-18 20 0z`, '#43A047')).join('') + R(94, 92, 12, 32, '#B5543D') }) },
  { id: 'de-munich.day.marienplatz', cat: 'day', file: 'de/munich/day-marienplatz.v1.svg', name: nm('จัตุรัสมาเรียนกับตุ๊กตาหมุน', 'Marienplatz and the Glockenspiel'), kw: ['marienplatz', 'มาเรียนพลัทซ์', 'glockenspiel', 'กล็อคเคนชปีล', 'rathaus', 'ศาลากลาง', 'old town'],
    // the neo-gothic town hall tower with the little dancing figures on its balconies, crowds looking up
    svg: scene('dmu-d1', '#E3F2FD', R(-4, 100, 248, 110, '#8D7B68') + [20, 60, 180, 220].map((x) => R(x - 10, 116, 20, 30, '#FFE082', 3, 3)).join('') + R(96, 30, 48, 180, '#8D7B68') + P('M92 32l28-34 28 34z', '#5D4037')
      + R(102, 70, 36, 22, '#FFF3E0', 3) + [110, 122, 134].map((x, i) => C(x, 84, 5, ['#E53935', '#1E88E5', '#FFCA28'][i], 2.5)).join('') + R(102, 100, 36, 22, '#FFF3E0', 3) + [110, 130].map((x) => C(x, 114, 5, '#43A047', 2.5)).join('')
      + P('M-4 210h248v40H-4z', '#BCAAA4') + [40, 70, 160, 190, 214].map((x) => C(x, 206, 9, '#FFE0BD', 3)).join('')) },
  { id: 'de-munich.day.beergarden', cat: 'day', file: 'de/munich/day-beergarden.v1.svg', name: nm('สวนเบียร์แบบครอบครัวใต้ต้นเกาลัด', 'A family beer garden under the chestnut trees'), kw: ['beer garden', 'สวนเบียร์', 'biergarten', 'english garden', 'อิงลิชการ์เดน', 'chinese tower', 'playground'],
    // long wooden tables under chestnut trees, a blue-and-white maypole, lemonade and a big pretzel on the table (no beer)
    svg: scene('dmu-d2', '#E8F5E9', [40, 200].map((x) => Lc(`M${x} 160V90`, '#6D4C41', 8) + C(x, 70, 40, '#43A047')).join('') + Lc('M120 200V20', '#FFFFFF', 8) + Array.from({ length: 6 }, (_, i) => Lc(`M116 ${30 + i * 28}l8 14`, '#1E88E5', 5)).join('') + P('M106 26l14-16 14 16z', '#FFCA28', 3)
      + R(20, 176, 200, 12, '#A1673F', 3) + Lc('M40 188v30M200 188v30', '#6D4C41', 6) + [[70, 160], [150, 160]].map(([x, y]) => R(x - 8, y, 16, 16, '#FFF59D', 3, 3)).join('') + E(110, 170, 14, 8, '#A0522D') + P('M-4 220h248v30H-4z', '#BCAAA4')) },
  { id: 'de-munich.landmark.frauenkirche', cat: 'landmark', file: 'de/munich/landmark-frauenkirche.v1.svg', name: nm('โบสถ์เฟราเอินเคียร์เชอ', 'Frauenkirche'), kw: ['frauenkirche', 'เฟราเอินเคียร์เชอ', 'cathedral', 'twin towers', 'หอคู่', 'onion domes', 'โดมหัวหอม'], colour: true, spot: nm('หาหอคอยคู่ที่ยอดเหมือนหัวหอมสีเขียว', 'Find the twin towers with green onion tops'),
    // the red-brick church with its two plain square towers capped by green onion domes
    svg: free(R(40, 120, 160, 100, '#B5543D') + P('M30 124l90-30 90 30z', '#8D3B2F') + [70, 170].map((x) => R(x - 22, 40, 44, 180, '#B5543D') + P(`M${x - 24} 44c0-40 48-40 48 0z`, '#43A047') + C(x, 6, 5, '#FFD54A', 3) + Lc(`M${x} 12v-6`, INK, 3) + R(x - 7, 70, 14, 30, '#FFE082', 3, 3)).join('')
      + R(104, 170, 32, 50, '#5D4037', 4) + face(120, 146, 0.45)) },
  { id: 'de-munich.landmark.olympic', cat: 'landmark', file: 'de/munich/landmark-olympic.v1.svg', name: nm('สวนโอลิมปิกกับหลังคาเต็นท์', 'The Olympic Park tent roof'), kw: ['olympic park', 'สวนโอลิมปิก', 'olympiapark', 'olympic tower', 'หอโอลิมปิก', 'tent roof', 'lake'], colour: true, spot: nm('หาหลังคาที่เหมือนใยแมงมุม', 'Find the roof that looks like a spider\'s web'),
    // the tall slim Olympic tower beside the swooping glass-net tent roof, a lake in front
    svg: free(R(150, 40, 14, 160, '#ECEFF1') + E(157, 70, 22, 12, '#B0BEC5') + Lc('M157 30v-20', INK, 3) + P('M10 190c30-60 60-80 90-80l40 30c20 10 40 30 60 50z', '#E1F5FE', 4)
      + Array.from({ length: 6 }, (_, i) => Lc(`M${20 + i * 30} 190l30-60`, '#81D4FA', 2.5)).join('') + Lc('M50 140l40-40M90 100v-30', INK, 4) + P('M10 196c40-6 80-6 110 0s70 6 110 0v24H10z', '#4FC3F7') + face(157, 120, 0.4)) },
  { id: 'de-munich.landmark.eisbach', cat: 'landmark', file: 'de/munich/landmark-eisbach.v1.svg', name: nm('นักโต้คลื่นแม่น้ำไอส์บัค', 'The Eisbach river surfers'), kw: ['eisbach', 'ไอส์บัค', 'river surfing', 'โต้คลื่นในแม่น้ำ', 'english garden', 'อิงลิชการ์เดน', 'englischer garten'], colour: true, spot: nm('หาคนโต้คลื่นในแม่น้ำกลางเมือง', 'Find someone surfing a river in the city'),
    // a standing wave in the Eisbach channel under a stone bridge, a surfer riding it, others waiting on the bank
    svg: free(R(10, 60, 220, 30, '#BCAAA4') + Lc('M10 90h220', INK, 4) + P('M10 150c30-40 60-50 110-50s80 10 110 50v70H10z', '#26C6DA') + Lc('M30 140c30-30 70-36 100-36', '#E0F7FA', 6)
      + g(130, 120, 1, R(-40, -6, 80, 12, '#FFCA28', 6) + Lc('M-6-6l-10-30M6-6l8-28M-16-36h30', INK, 5) + C(0, -48, 10, '#FFE0BD', 3) + P('M-16-40c0-10 32-10 32 0', '#212121', 3), -10) + [[30, 52], [200, 52]].map(([x, y]) => C(x, y, 7, '#FFE0BD', 3) + R(x - 7, y + 6, 14, 18, '#212121', 3, 3)).join('') + face(70, 170, 0.5)) },
  // ---------- the Neuschwanstein day
  { id: 'p-neuschwanstein.stamp', cat: 'stamp', file: 'de/neuschwanstein/stamp.v1.svg', name: nm('ตราประทับปราสาทนอยชวานสไตน์', 'Neuschwanstein stamp'), kw: ['neuschwanstein', 'นอยชวานสไตน์', 'castle', 'ปราสาท', 'fussen', 'füssen'],
    svg: cityStamp('pns-st', { name: 'NEUSCHWANSTEIN', sub: 'BAVARIA', ...NS, emblem: P('M54 142l26-40 20 10 26-28 22 58z', '#66BB6A') + R(86, 76, 30, 40, '#FFFFFF') + R(112, 60, 14, 56, '#FFFFFF') + P('M110 62l9-20 9 20z', '#1565C0') + P('M84 78l17-14 17 14z', '#1565C0') + R(76, 92, 12, 24, '#FFFFFF') + P('M74 94l8-12 8 12z', '#1565C0') }) },
  { id: 'p-neuschwanstein.day.view', cat: 'day', file: 'de/neuschwanstein/day-view.v1.svg', name: nm('ปราสาทนอยชวานสไตน์บนผา', 'Neuschwanstein on its crag'), kw: ['neuschwanstein', 'นอยชวานสไตน์', 'marienbrucke', 'marienbrücke', 'สะพานมารีน', 'hohenschwangau', 'alpsee', 'autumn'],
    // the white castle with slender blue-capped towers on a wooded crag, autumn trees, the Alps and a lake behind
    svg: scene('pns-d1', '#E3F2FD', P('M-4 110l60-50 40 30 50-50 60 60 38-20v30H-4z', '#B0BEC5') + E(200, 130, 50, 14, '#4FC3F7') + P('M20 250c10-80 40-110 80-110s60 40 80 110z', '#8D6E63')
      + R(80, 90, 60, 60, '#FFFFFF') + R(126, 60, 18, 90, '#FFFFFF') + P('M122 62l13-28 13 28z', '#1565C0') + R(66, 100, 16, 50, '#FFFFFF') + P('M62 102l12-18 12 18z', '#1565C0') + P('M78 92l32-22 32 22z', '#1565C0') + [92, 110].map((x) => R(x, 110, 10, 16, '#BBDEFB', 3, 3)).join('')
      + [[20, 200, '#FF7043'], [40, 216, '#FFB300'], [200, 210, '#E53935'], [220, 190, '#FF8F00']].map(([x, y, c]) => C(x, y, 18, c)).join('')) },
  { id: 'p-neuschwanstein.landmark.castle', cat: 'landmark', file: 'de/neuschwanstein/landmark-castle.v1.svg', name: nm('ปราสาทนอยชวานสไตน์', 'Neuschwanstein Castle'), kw: ['neuschwanstein', 'นอยชวานสไตน์', 'castle', 'ปราสาท', 'king ludwig', 'fairy-tale castle', 'ปราสาทเทพนิยาย'], colour: true, spot: nm('หาปราสาทสีขาวหอคอยแหลมสีน้ำเงิน', 'Find the white castle with pointy blue towers'),
    // the real one: pale stone, a tall square keep, a slim round tower with a pointed blue roof, many little turrets, a gatehouse in red brick
    svg: free(P('M20 220c20-30 50-40 100-40s80 10 100 40z', '#8D6E63') + R(40, 150, 50, 40, '#C0634A') + P('M36 152l29-20 29 20z', '#455A64') + R(84, 90, 80, 100, '#F5F5F5') + R(150, 40, 24, 150, '#F5F5F5') + P('M144 42l18-40 18 40z', '#1565C0')
      + [[96, 70], [124, 66]].map(([x, y]) => R(x - 8, y, 16, 26, '#F5F5F5') + P(`M${x - 11} ${y + 2}l11-20 11 20z`, '#1565C0')).join('') + P('M80 92l44-26 44 26z', '#455A64') + [100, 124, 148].map((x) => R(x - 6, 110, 12, 20, '#BBDEFB', 3, 3)).join('') + face(124, 150, 0.5)) },
];
export default {
  places: {
    de: { country: 'de', wave: 1, name: nm('เยอรมนี', 'Germany'), tz: 'Europe/Berlin', alias: ['germany', 'เยอรมนี', 'deutschland', 'german'], colors: DE },
    'de-munich': { country: 'de', wave: 1, name: nm('มิวนิก', 'Munich'), tz: 'Europe/Berlin', ll: [48.14, 11.58], alias: ['munich', 'münchen', 'muenchen', 'มิวนิก', 'marienplatz', 'มาเรียนพลัทซ์', 'english garden', 'olympiapark', 'nymphenburg', 'bavaria', 'บาวาเรีย'], colors: DE },
    'p-neuschwanstein': { country: 'de', wave: 1, name: nm('ปราสาทนอยชวานสไตน์', 'Neuschwanstein'), tz: 'Europe/Berlin', ll: [47.56, 10.75], alias: ['neuschwanstein', 'นอยชวานสไตน์', 'hohenschwangau', 'füssen', 'fussen', 'ฟุสเซน', 'marienbrücke', 'schwangau'], colors: NS },
  },
  items,
};
