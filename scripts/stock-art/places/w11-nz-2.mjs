// Wave 11, group nz (2 of 4): Auckland, the City of Sails — stamp, two day scenes and seventeen places of the city,
// its gulf islands (Waiheke, Rangitoto, Tiritiri Matangi) and the west-coast beach at Piha. No ferry, no aquarium, no brands.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (nz/auckland/landmark-skytower.v1.svg → nz-auckland.landmark.skytower)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#F1C9A5', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const sail = (x, y, s, c) => g(x, y, s, P('M-14 0h28l-4 6h-20z', '#FFFFFF', 2) + P('M0-2v-30l14 28z', c, 2) + P('M-2-2v-22l-10 20z', '#FFFFFF', 2));
const AK = { k1: '#0D47A1', k2: '#00897B', k3: '#E3F2FD' };
const T = 'nz/auckland/';

// the Sky Tower: a slim shaft on three legs, the pod of round decks, the spire (drawn at x, base y, scale s)
const tower = (x, y, s, fc) => g(x, y, s, P('M-10 0l4-150h12l4 150z', '#ECEFF1') + P('M-16 0l10-40M16 0l-10-40', 'none', 3) + Lc('M-2-140v130', '#CFD8DC', 3)
  + P('M-26-150c0-10 52-10 52 0l-6 14h-40z', '#B0BEC5') + R(-22, -172, 44, 22, '#ECEFF1', 6) + Lc('M-22-162h44', '#4FC3F7', 4) + P('M-16-172l4-10h24l4 10z', '#CFD8DC')
  + R(-4, -214, 8, 32, '#ECEFF1', 2) + Lc('M0-214v-26', INK, 2.5) + (fc ? face(0, -158, 0.32) : ''));

const items = [
  { id: 'nz-auckland.stamp', cat: 'stamp', file: T + 'stamp.v1.svg', name: nm('ตราประทับโอ๊คแลนด์', 'Auckland stamp'), kw: ['auckland', 'โอ๊คแลนด์', 'city of sails', 'เมืองแห่งเรือใบ', 'waitemata', 'sky tower'],
    // the Sky Tower rising over the harbour, a white sail beside it
    svg: cityStamp('akl-st', { name: 'AUCKLAND', sub: 'NEW ZEALAND', ...AK, emblem: tower(92, 136, 0.42) + R(52, 130, 96, 10, '#4FC3F7', 0, 2) + sail(124, 132, 0.8, '#FFFFFF') + ring(3, (k) => R(58 + k * 10, 116 - k * 4, 8, 14 + k * 4, '#90CAF9', 1, 2)) }) },
  { id: 'nz-auckland.day.harbour', cat: 'day', file: T + 'day-harbour.v1.svg', name: nm('อ่าวไวเตมาตาและเส้นขอบฟ้าโอ๊คแลนด์', 'Auckland’s skyline over the Waitematā Harbour'), kw: ['auckland', 'โอ๊คแลนด์', 'waitemata harbour', 'อ่าวไวเตมาตา', 'skyline', 'เส้นขอบฟ้า', 'city of sails', 'เมืองแห่งเรือใบ', 'viaduct', 'waterfront', 'ริมน้ำ'],
    // the city's towers on the shore at sunset with the slim Sky Tower above them all, the harbour bridge's hump at the side, a bay full of little white sails
    svg: scene('akl-d1', '#FFCC80', C(170, 80, 22, '#FFF59D', 0) + P('M-4 70c40 10 80 6 120-4s90-14 128-4v20H-4z', '#FFE0B2', 0)
      + ring(8, (k) => R(20 + k * 24, 140 - [30, 50, 40, 70, 56, 36, 60, 28][k], 20, [30, 50, 40, 70, 56, 36, 60, 28][k] + 4, ['#90A4AE', '#B0BEC5', '#78909C', '#CFD8DC'][k % 4], 1, 3)) + tower(118, 142, 0.62, true)
      + P('M188 140c10-24 30-24 40 0z', 'none', 4).replace('fill="none"', 'fill="none" stroke="#546E7A"') + Lc('M180 140h70', '#546E7A', 5)
      + R(-4, 140, 248, 110, '#29B6F6') + ring(4, (k) => Lc(`M${10 + k * 60} ${170 + (k % 2) * 30}c10-5 20 5 30 0`, '#E1F5FE', 3))
      + [[40, 186, 1], [92, 206, 1.2], [150, 182, 0.9], [196, 210, 1.1]].map(([x, y, s], k) => sail(x, y, s, ['#FFFFFF', '#FFCA28', '#FFFFFF', '#EF5350'][k])).join('')) },
  { id: 'nz-auckland.day.rangitoto', cat: 'day', file: T + 'day-rangitoto.v1.svg', name: nm('เกาะภูเขาไฟรังกิโตโตข้ามอ่าว', 'Rangitoto Island across the gulf'), kw: ['rangitoto', 'รังกิโตโต', 'rangitoto island', 'เกาะรังกิโตโต', 'volcanic island', 'เกาะภูเขาไฟ', 'hauraki gulf', 'อ่าวฮอราคี', 'takapuna beach', 'มิชชันเบย์', 'mission bay'],
    // the low, perfectly even cone of Rangitoto lying across blue water, seen from a city beach with a pōhutukawa tree, children paddling at the shore
    svg: scene('akl-d2', '#B3E5FC', P('M-4 128c40-6 70-30 104-44 10-4 30-4 40 0 34 14 64 38 108 44v20H-4z', '#558B2F') + P('M100 84c6-12 34-12 40 0-12-4-28-4-40 0z', '#33691E', 3) + ring(9, (k) => C(14 + k * 26, 122 - Math.sin((k / 8) * Math.PI) * 26, 8, '#689F38', 0))
      + R(-4, 130, 248, 60, '#0288D1') + ring(3, (k) => Lc(`M${30 + k * 70} ${150 + (k % 2) * 16}c10-5 20 5 30 0`, '#B3E5FC', 3))
      + P('M-4 190c60-10 140-14 248-6v70H-4z', '#FFE0B2') + Lc('M-4 190c60-10 140-14 248-6', '#FFFFFF', 4)
      + Lc('M40 250c0-40-6-60-24-80M40 210c10-14 26-22 40-24', '#6D4C41', 7) + P('M-10 170c0-20 30-30 50-20 16-12 40-6 44 10 10 10 0 26-20 24-24 6-60 6-74-14z', '#2E7D32')
      + ring(7, (k) => C(0 + k * 12, 160 + (k % 2) * 10, 5, '#E53935', 2)) + kid(150, 214, '#FF7043') + kid(176, 210, '#AB47BC', 0.9)) },
  L(T + 'landmark-skytower.v1.svg', 'สกายทาวเวอร์', 'The Sky Tower', ['sky tower', 'สกายทาวเวอร์', 'skywalk', 'tallest tower', 'หอคอยสูงที่สุด', 'observation deck', 'จุดชมวิว', 'glass floor', 'พื้นกระจก', 'city centre', 'ใจกลางเมือง'], 'หาหอคอยเรียวยาวที่มีห้องกลมๆ อยู่ข้างบน', 'Find the tall thin tower with a round pod near the top',
    // the slim white tower with its round pod of viewing decks and the long needle on top, little city blocks at its foot and a balloon floating by
    ring(5, (k) => R(20 + k * 42, 230 - [40, 60, 30, 70, 46][k], 34, [40, 60, 30, 70, 46][k], ['#B0BEC5', '#90CAF9', '#CFD8DC', '#B3E5FC', '#BCAAA4'][k], 3)) + tower(120, 228, 0.92, true)
      + g(196, 60, 1, C(0, 0, 14, '#FF8A80') + Lc('M0 14v22', INK, 1.5))),
  L(T + 'landmark-harbourbridge.v1.svg', 'สะพานฮาร์เบอร์บริดจ์โอ๊คแลนด์', 'The Auckland Harbour Bridge', ['auckland harbour bridge', 'สะพานฮาร์เบอร์บริดจ์', 'harbour bridge', 'bridge climb', 'ปีนสะพาน', 'westhaven', 'เวสต์เฮเวน', 'northcote', 'north shore', 'นอร์ทชอร์'], 'หาสะพานเหล็กโค้งนูนตรงกลางเหมือนหลังอูฐ', 'Find the steel bridge with a hump in the middle like a camel’s back',
    // the long steel girder bridge on tall concrete piers, a criss-cross truss humping up over the middle span so tall yachts can pass below, a sailboat under it
    R(-4, 176, 248, 50, '#29B6F6', 0, 0) + ring(4, (k) => Lc(`M${10 + k * 60} ${200 + (k % 2) * 14}c10-5 20 5 30 0`, '#E1F5FE', 3))
      + [24, 72, 168, 216].map((x) => R(x - 7, 100 + 40 * ((x - 120) / 120) ** 2, 14, 90, '#B0BEC5', 2)).join('')
      + (() => { const yd = (x) => +(96 + 40 * ((x - 120) / 120) ** 2).toFixed(1), yu = (x) => +(62 + 34 * ((x - 120) / 80) ** 2).toFixed(1);
        const xs = Array.from({ length: 11 }, (_, k) => 40 + k * 16);
        return P('M' + xs.map((x) => `${x} ${yu(x)}`).join('L') + 'L' + xs.slice().reverse().map((x) => `${x} ${yd(x)}`).join('L') + 'z', '#CFD8DC', 0)
          + Lc(xs.slice(0, -1).map((x, k) => `M${x} ${k % 2 ? yu(x) : yd(x)}L${x + 16} ${k % 2 ? yd(x + 16) : yu(x + 16)}`).join(''), '#607D8B', 3)
          + Lc('M' + xs.map((x) => `${x} ${yu(x)}`).join('L'), '#546E7A', 5) + P('M' + xs.map((x) => `${x} ${yu(x)}`).join('L'), 'none', 1.5)
          + P(`M0 ${yd(0)}` + Array.from({ length: 13 }, (_, k) => `L${k * 20} ${yd(k * 20)}`).join('') + `V${yd(240) + 12}` + Array.from({ length: 13 }, (_, k) => `L${240 - k * 20} ${yd(240 - k * 20) + 12}`).join('') + 'z', '#78909C')
          + [[14, '#EF5350'], [70, '#FFCA28'], [150, '#42A5F5'], [206, '#66BB6A']].map(([x, c]) => R(x, yd(x + 7) - 9, 16, 9, c, 2, 2)).join(''); })()
      + sail(120, 196, 1.3, '#FFFFFF') + face(120, 108, 0.38)),
  L(T + 'landmark-foilingyacht.v1.svg', 'เรือใบแข่งยกตัวบินเหนือน้ำ', 'A racing yacht flying on its foils', ['foiling yacht', 'เรือใบไฮโดรฟอยล์', 'americas cup', 'อเมริกาส์คัพ', 'racing yacht', 'เรือใบแข่ง', 'viaduct harbour', 'ท่าเรือไวอาดักต์', 'sailing', 'แล่นเรือใบ'], 'หาเรือใบที่ลอยขึ้นพ้นน้ำบนขาเรียวๆ', 'Find the racing yacht lifted right out of the water on its thin legs',
    // a sleek racing yacht skimming above the waves on two thin hydrofoil arms, its huge tall sail curved by the wind, spray flying behind
    R(-4, 180, 248, 46, '#0288D1', 0, 0) + ring(5, (k) => Lc(`M${6 + k * 48} ${196 + (k % 2) * 14}c8-5 16 5 24 0`, '#B3E5FC', 3))
      + Lc('M86 146l-14 44M86 190h-22', '#37474F', 5) + Lc('M158 146l10 46M168 192h20', '#37474F', 5) + Lc('M122 150v40', '#37474F', 4)
      + P('M40 140c20 10 120 14 170 4l-10 14c-50 8-130 4-150-6z', '#263238') + Lc('M60 150c40 6 100 6 140 0', '#FFFFFF', 3)
      + P('M126 136c-2-40 0-80 6-118 30 30 44 72 46 112z', '#ECEFF1') + P('M120 136c0-30-6-60-20-86-8 30-10 60-8 86z', '#B3E5FC') + Lc('M128 136V14', INK, 3)
      + ring(5, (k) => C(36 - k * 6, 186 - k * 6, 4 - k * 0.5, '#FFFFFF', 2)) + face(140, 80, 0.45)),
  L(T + 'landmark-lionrock.v1.svg', 'โขดหินสิงโตที่หาดพีฮา', 'Lion Rock at Piha', ['lion rock', 'โขดหินสิงโต', 'piha beach', 'หาดพีฮา', 'black sand', 'ทรายดำ', 'west coast', 'ชายฝั่งตะวันตก', 'surf beach', 'waves', 'คลื่น'], 'หาก้อนหินยักษ์รูปหัวสิงโตนอนหมอบริมทะเล', 'Find the giant rock shaped like a lion lying down by the sea',
    // a big dark rock on a black sand beach shaped like a lion resting, its head lifted toward the sea and a green mane of bushes, white waves rolling in
    R(-4, 150, 248, 40, '#0288D1', 0, 0) + ring(4, (k) => Lc(`M${10 + k * 60} ${160 + (k % 2) * 10}c12-6 24 6 36 0`, '#FFFFFF', 4))
      + P('M-4 186c60-14 160-14 248 0v40H-4z', '#424242') + ring(10, (k) => C(14 + k * 24, 200 + (k % 3) * 8, 1.8, '#9E9E9E', 0))
      + P('M40 186c-4-40 10-80 40-100 20-40 70-50 96-20 20 20 18 50 6 66 20 8 30 30 30 54z', '#6D4C41')
      + P('M84 84c10-30 50-44 80-24-10 6-20 4-30 10-14-4-36 2-50 14z', '#558B2F') + ring(6, (k) => C(70 + k * 18, 96 + (k % 2) * 8 - k * 2, 9, '#7CB342', 2))
      + P('M176 132c14 4 22 14 22 24-10-2-18-8-22-14z', '#5D4037', 2.5) + Lc('M60 150c20 10 50 12 80 6M70 176c30 4 70 4 100-2', '#4E342E', 3)
      + kid(212, 204, '#FFCA28', 0.8) + face(152, 116, 0.5)),
  L(T + 'landmark-takahe.v1.svg', 'นกทาคาเฮที่เกาะติริติริมาตางี', 'A takahē on Tiritiri Matangi', ['takahe', 'ทาคาเฮ', 'takahē', 'tiritiri matangi', 'ติริติริมาตางี', 'bird sanctuary', 'เกาะอนุรักษ์นก', 'rare bird', 'นกหายาก', 'island day trip'], 'หานกตัวกลมสีน้ำเงินเขียวปากแดงที่บินไม่ได้', 'Find the round blue-green bird with a big red beak that cannot fly',
    // a plump flightless takahē with shining blue head and green-teal back, a huge red beak, strong red legs, nibbling a tuft of grass on an island path
    E(120, 214, 100, 12, '#AED581', 0) + ring(5, (k) => Lc(`M${190 + k * 6} 214c-4-20-12-30-${14 - k * 2}-40`, '#9CCC65', 3))
      + P('M60 140c0-40 40-60 80-56 40 4 60 30 54 60-6 30-44 46-84 40-30-4-50-20-50-44z', '#00897B') + P('M150 96c20 4 36 20 40 40-14-8-30-12-44-14z', '#4DB6AC', 3)
      + ring(5, (k) => P(`M${100 + k * 16} ${120 + (k % 2) * 6}q8 8 16 0`, 'none', 2.5)).replace(/fill="none"/g, 'fill="none" stroke="#00695C"')
      + C(78, 104, 30, '#1E5BD8') + P('M48 108c-14 4-24 14-26 26 14 4 26 0 34-8z', '#E53935') + E(56, 96, 10, 14, '#E53935', 3)
      + [[110, 182], [146, 182]].map(([x, y]) => Lc(`M${x} ${y}v24M${x - 10} ${y + 30}l10-6 10 6`, '#E53935', 5)).join('') + face(82, 100, 0.48, 'none')),
  L(T + 'landmark-olivegrove.v1.svg', 'สวนมะกอกบนเกาะไวเฮกี', 'Olive picking on Waiheke Island', ['waiheke', 'ไวเฮกี', 'waiheke island', 'เกาะไวเฮกี', 'olive grove', 'สวนมะกอก', 'olive picking', 'เก็บมะกอก', 'olive oil', 'น้ำมันมะกอก', 'onetangi'], 'หาต้นมะกอกใบสีเงินที่มีตาข่ายรองลูกมะกอก', 'Find the silvery olive tree with a net spread underneath to catch the olives',
    // a silvery-green olive tree on a sunny hill over a blue bay, a net spread beneath it catching the falling olives, a crate of green and black olives and a little oil bottle
    R(-4, 40, 248, 60, '#4FC3F7', 0, 0) + P('M-4 96c60-30 160-30 248-10v140H-4z', '#C5E1A5')
      + Lc('M120 196c-4-30 0-60-10-80M116 150c-10-10-24-14-34-14M118 140c14-10 28-12 40-8', '#8D6E63', 9)
      + P('M50 110c-10-30 20-50 46-40 10-24 50-24 60 0 26-8 50 14 40 40 10 20-20 34-40 26-20 10-60 10-80 0-24 4-40-10-26-26z', '#A5B88F')
      + ring(14, (k) => E(66 + (k % 7) * 18, 84 + Math.floor(k / 7) * 26 + (k % 2) * 6, 4, 7, k % 3 ? '#689F38' : '#37474F', 1.5))
      + P('M30 200c30 10 150 10 180 0l-10 18c-40 8-120 8-160 0z', '#ECEFF1') + Lc('M40 206h160M70 200l-4 16M110 202v16M150 202l2 16', '#B0BEC5', 1.5)
      + R(170, 168, 50, 30, '#C8862F', 3) + ring(6, (k) => C(178 + (k % 3) * 14, 166 - Math.floor(k / 3) * 6, 5, k % 2 ? '#37474F' : '#7CB342', 1.5))
      + R(28, 160, 14, 30, '#CDDC39', 4) + R(31, 152, 8, 10, '#795548', 1, 2) + face(120, 98, 0.45)),
  L(T + 'landmark-onetreehill.v1.svg', 'เนินวันทรีฮิลล์กับเสาโอเบลิสก์', 'One Tree Hill and its obelisk', ['one tree hill', 'วันทรีฮิลล์', 'maungakiekie', 'เมานกาคีเอคี', 'cornwall park', 'คอร์นวอลล์พาร์ก', 'volcanic cone', 'เนินภูเขาไฟ', 'obelisk', 'picnic'], 'หาเสาหินแหลมยอดเนินเขาสีเขียวที่เป็นขั้นๆ', 'Find the pointy stone column on top of the green hill with steps cut round it',
    // a round green volcanic hill ringed with grassy terraces, a tall stone obelisk on its summit, a family picnic blanket and a kite-free sky with clouds
    P('M-4 220c40-20 70-110 124-120 54 10 84 100 124 120z', '#7CB342') + ring(4, (k) => { const x0 = 34 + k * 18, w = 172 - k * 36; return Lc(`M${x0} ${200 - k * 26}c${w / 6}-8 ${(w * 5) / 6}-8 ${w} 0`, '#558B2F', 3); })
      + P('M112 104l4-80h8l4 80z', '#ECEFF1') + P('M114 24l6-14 6 14z', '#CFD8DC') + R(104, 100, 32, 10, '#BDBDBD', 2)
      + R(150, 190, 40, 14, '#EF5350', 2) + Lc('M150 197h40M170 190v14', '#FFFFFF', 2) + kid(162, 186, '#42A5F5', 0.8) + kid(182, 186, '#FFCA28', 0.7)
      + [[46, 50], [190, 40]].map(([x, y]) => P(`M${x - 22} ${y + 8}c-8 0-8-12 2-12 2-8 14-10 18-2 6-8 22-4 20 6 8 0 8 8 0 8z`, '#FFFFFF', 3)).join('') + face(120, 66, 0.3)),
  L(T + 'landmark-lightpath.v1.svg', 'ทางจักรยานสีชมพูไลต์พาท', 'The pink Lightpath cycleway', ['lightpath', 'ไลต์พาท', 'te ara i whiti', 'pink cycleway', 'ทางจักรยานสีชมพู', 'cycling', 'ปั่นจักรยาน', 'scooter', 'สกูตเตอร์', 'nelson street'], 'หาทางจักรยานสีชมพูสดที่โค้งลอยไปมา', 'Find the bright pink bike path curving through the air',
    // a hot-pink path of a cycleway sweeping in a big curve on slim legs between city buildings, little lights along its edge, a child scooting along it
    ring(4, (k) => R(-4 + k * 66, 60 + (k % 2) * 20, 52, 170, ['#B0BEC5', '#CFD8DC', '#90A4AE', '#B0BEC5'][k], 2)) + ring(12, (k) => R(6 + (k % 4) * 66, 76 + Math.floor(k / 4) * 40 + (k % 2) * 20, 30, 12, '#E3F2FD', 1, 2))
      + [40, 110, 180].map((x) => R(x - 5, 150, 10, 76, '#ECEFF1', 2)).join('')
      + P('M-4 170c60-10 100-40 140-60s80-20 108-20v18c-30 0-66 2-102 20s-86 52-146 60z', '#FF4FA0') + Lc('M-4 170c60-10 100-40 140-60s80-20 108-20', '#FFFFFF', 3)
      + ring(10, (k) => C(6 + k * 24, 166 - k * 7.5 + (k > 5 ? (k - 5) * 3 : 0), 3, '#FFF59D', 1.5))
      + g(140, 108, 1, Lc('M-10 0h20M-8 0l-2-22M-10-22h6', INK, 3) + C(-10, 2, 4, '#FFFFFF', 2) + C(10, 2, 4, '#FFFFFF', 2)) + kid(140, 86, '#42A5F5', 0.9) + face(70, 160, 0.3)),
  L(T + 'landmark-silopark.v1.svg', 'ไซโลพาร์กริมอ่าว', 'Silo Park on the waterfront', ['silo park', 'ไซโลพาร์ก', 'wynyard quarter', 'วินยาร์ดควอเตอร์', 'outdoor movie', 'ดูหนังกลางแจ้ง', 'old silos', 'ไซโลเก่า', 'waterfront playground', 'สนามเด็กเล่นริมน้ำ'], 'หาถังไซโลกลมสูงสองใบกับจอหนังกลางแจ้ง', 'Find the two tall round silos and the outdoor movie screen',
    // two tall round old cement silos painted with bright stripes beside a big outdoor movie screen at dusk, children on bean bags on the grass watching
    R(-4, -4, 248, 248, '#3949AB', 0, 0) + ring(6, (k) => C(20 + k * 40, 20 + (k % 3) * 14, 2, '#FFF59D', 0))
      + [[36, '#FFCA28'], [84, '#4DD0E1']].map(([x, c]) => R(x - 22, 50, 44, 160, '#ECEFF1') + E(x, 50, 22, 7, '#CFD8DC') + Lc(`M${x - 22} 90h44M${x - 22} 130h44`, c, 8)).join('')
      + R(120, 70, 110, 70, '#FFFFFF') + R(126, 76, 98, 58, '#81D4FA', 0, 2) + P('M150 120l20-24 14 14 10-8 20 18z', '#66BB6A', 2) + C(200, 90, 7, '#FFF59D', 2) + Lc('M150 140l-6 70M200 140l6 70', '#90A4AE', 4)
      + R(-4, 206, 248, 40, '#66BB6A', 0) + [[120, '#EF5350'], [160, '#AB47BC'], [200, '#FFA726']].map(([x, c]) => E(x, 214, 16, 10, c, 2.5)).join('') + kid(120, 206, '#FFF59D', 0.7) + kid(160, 206, '#80DEEA', 0.7) + face(36, 160, 0.45)),
  L(T + 'landmark-bach.v1.svg', 'บ้านพักริมหาดแบบกีวี “บาช”', 'A Kiwi bach by the beach', ['bach', 'บาช', 'holiday home', 'บ้านพักตากอากาศ', 'beach house', 'บ้านริมหาด', 'waiheke', 'ไวเฮกี', 'kiwi summer', 'ซัมเมอร์แบบกีวี'], 'หาบ้านไม้หลังเล็กสีสดที่มีระเบียงกับกระดานโต้คลื่น', 'Find the little bright wooden holiday house with a deck and a surfboard',
    // a small old weatherboard holiday cottage painted sea-green with a red tin roof, a wooden deck with deck chairs, a surfboard leaning on the wall, bunting, a pōhutukawa beside it
    E(120, 214, 110, 14, '#FFE0B2', 0) + R(40, 110, 130, 90, '#4DB6AC') + ring(6, (k) => Lc(`M40 ${124 + k * 14}h130`, '#26A69A', 2))
      + P('M30 114l20-44h110l20 44z', '#E53935') + ring(6, (k) => Lc(`M${56 + k * 20} 74l-${8 + k * 2} 38`, '#C62828', 2)) + R(60, 140, 30, 60, '#FFF59D', 2) + R(110, 134, 40, 30, '#B3E5FC', 2, 3) + Lc('M130 134v30', INK, 2)
      + R(30, 196, 160, 10, '#A1887F', 0) + Lc('M30 206v10M100 206v10M180 206v10', '#8D6E63', 4)
      + g(186, 154, 1, E(0, 0, 10, 46, '#FFCA28') + Lc('M0-40v80', '#FF7043', 3), 8) + Lc('M40 104c40 10 80 10 120 0', INK, 1.5) + ring(6, (k) => P(`M${48 + k * 20} ${106 + Math.sin((k / 5) * Math.PI) * 6}l6 10 6-10z`, ['#EF5350', '#FFCA28', '#42A5F5'][k % 3], 1.5))
      + g(122, 186, 1, P('M-12 0l6-20h12l6 20z', '#FF8A65', 2.5)) + face(140, 172, 0.35)),
  L(T + 'landmark-moa.v1.svg', 'นกโมอายักษ์ในพิพิธภัณฑ์โอ๊คแลนด์', 'The giant moa at Auckland Museum', ['moa', 'นกโมอา', 'giant moa', 'นกโมอายักษ์', 'auckland museum', 'พิพิธภัณฑ์โอ๊คแลนด์', 'extinct bird', 'นกที่สูญพันธุ์', 'natural history', 'the domain'], 'หานกยักษ์คอยาวที่สูงกว่าคนเยอะเลย', 'Find the giant long-necked bird much taller than a grown-up',
    // a huge shaggy brown moa bird standing tall on a museum plinth, a long neck and a small head with a short beak, a small child looking up at it, a museum column behind
    R(10, 30, 30, 190, '#ECEFF1') + R(4, 22, 42, 12, '#E0E0E0') + R(4, 214, 42, 10, '#E0E0E0') + ring(3, (k) => Lc(`M${18 + k * 7} 36v176`, '#CFD8DC', 2))
      + R(70, 200, 130, 20, '#BCAAA4', 3) + P('M90 140c0-40 30-60 70-50 30 10 40 40 30 70-10 20-80 30-100-20z', '#8D6E63')
      + ring(9, (k) => Lc(`M${98 + k * 10} ${140 + (k % 2) * 6}l-4 22`, '#6D4C41', 3)) + Lc('M150 100c0-30-6-50 0-70', '#8D6E63', 18)
      + E(156, 30, 16, 12, '#8D6E63') + P('M170 30l14 4-14 4z', '#FFCC80', 2.5) + [[124, 166], [160, 166]].map(([x, y]) => Lc(`M${x} ${y}v34M${x - 10} ${y + 34}h20`, '#FFCC80', 6)).join('')
      + kid(56, 214, '#FFCA28', 1.1) + face(156, 28, 0.32, 'none')),
  L(T + 'landmark-panipopo.v1.svg', 'ขนมปังกะทิปานีโปโป', 'Panipopo coconut buns', ['panipopo', 'ปานีโปโป', 'coconut buns', 'ขนมปังกะทิ', 'samoan bakery', 'เบเกอรีซามัว', 'pacific food', 'อาหารแปซิฟิก', 'south auckland', 'pasifika'], 'หาขนมปังก้อนกลมนุ่มๆ ที่แช่ในซอสกะทิ', 'Find the soft round buns soaking in sweet coconut sauce',
    // a baking tray of soft golden pull-apart buns glazed with sticky sweet coconut sauce pooling round them, half a coconut beside it
    E(120, 196, 104, 16, '#CFD8DC') + R(24, 110, 192, 86, '#B0BEC5', 10) + R(32, 118, 176, 72, '#FFF8E1', 8, 0)
      + ring(8, (k) => { const x = 54 + (k % 4) * 44, y = 136 + Math.floor(k / 4) * 34; return C(x, y, 22, '#E9A64C') + P(`M${x - 14} ${y - 8}c6-8 22-8 28 0`, 'none', 3).replace('fill="none"', 'fill="none" stroke="#F8D49A"'); })
      + Lc('M40 186c40 4 120 4 160 0', '#FFFDE7', 4) + g(200, 84, 1, C(0, 0, 26, '#6D4C41') + C(0, 0, 18, '#FFFFFF', 3))
      + face(98, 136, 0.42)),
  L(T + 'landmark-devonport.v1.svg', 'บ้านวิลล่าไม้สมัยวิกตอเรียที่เดวอนพอร์ต', 'A wooden villa in Devonport', ['devonport villa', 'บ้านวิลล่าเดวอนพอร์ต', 'victorian villa', 'บ้านไม้สมัยวิกตอเรีย', 'veranda', 'ระเบียงลายลูกไม้', 'mount victoria', 'เมานต์วิกตอเรีย', 'picket fence', 'old town walk'], 'หาบ้านไม้สีขาวที่มีระเบียงลายลูกไม้เหล็ก', 'Find the white wooden house with a lacy iron veranda',
    // a pretty white wooden villa with a bay window and a peaked gable, a veranda trimmed with lacy iron fretwork, a white picket fence, a green volcanic hill behind
    P('M150 110c10-40 40-50 60-40 14 10 30 30 30 40z', '#7CB342') + R(30, 96, 150, 104, '#FFFFFF') + P('M24 100l60-50 60 50z', '#90A4AE') + P('M120 100l30-24 36 24z', '#90A4AE')
      + R(46, 110, 40, 50, '#B3E5FC', 2, 3) + Lc('M66 110v50M46 135h40', INK, 2) + R(120, 150, 26, 50, '#E57373', 2) + R(150, 140, 22, 28, '#B3E5FC', 2, 3)
      + R(100, 128, 80, 8, '#ECEFF1') + ring(8, (k) => P(`M${104 + k * 10} 136q5 8 10 0`, 'none', 2)) + Lc('M104 136v64M176 136v64', INK, 3)
      + Lc('M78 72c4-6 8-6 12 0', '#E57373', 3) + R(10, 196, 220, 6, '#FFFFFF') + ring(11, (k) => P(`M${14 + k * 20} 224v-34l5-6 5 6v34z`, '#FFFFFF', 2.5)) + face(150, 120, 0.3)),
  L(T + 'landmark-lollycake.v1.svg', 'เค้กลูกอมสีรุ้งแบบกีวี', 'Kiwi lolly cake', ['lolly cake', 'ลอลลี่เค้ก', 'fruit puffs', 'ลูกอมผลไม้', 'coconut', 'มะพร้าวขูด', 'cafe treat', 'ขนมร้านกาแฟ', 'kiwiana', 'no-bake slice'], 'หาเค้กแท่งกลมที่มีลูกอมสีๆ อยู่ข้างใน', 'Find the round slice of cake with bright coloured lollies inside',
    // a log of no-bake cake rolled in white coconut, sliced into rounds showing chunky pink, green, yellow and orange fruit-puff lollies inside, on a plate with a fork
    E(120, 196, 100, 18, '#ECEFF1') + g(76, 146, 1, R(-56, -32, 100, 64, '#F5F5F5', 14) + ring(10, (k) => C(-46 + (k % 5) * 20, -20 + Math.floor(k / 5) * 40, 2, '#BDBDBD', 0)) + E(44, 0, 14, 32, '#D7B98E') + [[-6, '#F48FB1'], [-18, '#AED581'], [8, '#FFF176'], [20, '#FFB74D']].map(([y, c], k) => R(40 + (k % 2) * 4, y - 4, 8, 8, c, 3, 1.5)).join(''))
      + g(152, 152, 1, C(0, 0, 40, '#F5F5F5') + C(0, 0, 32, '#D7B98E', 0) + [[-14, -14, '#F48FB1'], [12, -16, '#AED581'], [-16, 12, '#FFF176'], [14, 12, '#FFB74D'], [0, 0, '#F48FB1']].map(([x, y, c]) => R(x - 7, y - 6, 14, 12, c, 4, 2)).join(''))
      + Lc('M30 210l40-20', '#B0BEC5', 4) + face(66, 146, 0.48)),
  L(T + 'landmark-pclass.v1.svg', 'เรือใบลำจิ๋วของเด็กๆ หัดแล่นใบ', 'Little sailing dinghies of a kids’ sailing school', ['p class', 'พีคลาส', 'sailing school', 'โรงเรียนสอนแล่นเรือใบ', 'dinghy', 'เรือใบลำเล็ก', 'learn to sail', 'หัดแล่นเรือใบ', 'okahu bay', 'โอกาฮูเบย์'], 'หาเรือใบลำเล็กนิดเดียวที่มีเด็กนั่งบังคับ', 'Find the tiny sailboats each steered by one child',
    // three tiny one-sail dinghies bobbing on the bay, each with a child in a life jacket at the tiller, the sails bright red, yellow and blue, a coach in a dinghy waving
    R(-4, 90, 248, 140, '#4FC3F7', 0, 0) + ring(5, (k) => Lc(`M${6 + k * 48} ${120 + (k % 3) * 30}c8-5 16 5 24 0`, '#E1F5FE', 3))
      + [[56, 150, 1, '#EF5350'], [136, 120, 0.85, '#FFCA28'], [182, 176, 1.05, '#42A5F5']].map(([x, y, s, c]) => g(x, y, s, P('M-30 0h56c-4 12-14 16-28 16s-24-4-28-16z', '#FFFFFF') + Lc('M-4 0v-70', INK, 3) + P('M-2-68c20 10 30 40 26 62H-2z', c) + C(-18, -10, 7, '#F1C9A5', 2) + R(-24, -4, 12, 8, '#FF7043', 2, 2) + face(-18, -9, 0.2))).join('')
      + [[40, 60], [200, 50]].map(([x, y]) => P(`M${x - 18} ${y + 6}c-8 0-8-10 2-10 2-8 14-8 16 0 6-6 18-2 16 6 6 0 6 6 0 6z`, '#FFFFFF', 3)).join('')),
  L(T + 'landmark-artgallery.v1.svg', 'หอศิลป์โอ๊คแลนด์หลังคาต้นไม้', 'Auckland Art Gallery’s tree-canopy roof', ['auckland art gallery', 'หอศิลป์โอ๊คแลนด์', 'toi o tamaki', 'art gallery', 'หอศิลป์', 'albert park', 'อัลเบิร์ตพาร์ก', 'timber canopy', 'หลังคาไม้'], 'หาหลังคาไม้ที่มีเสาแตกกิ่งเหมือนต้นไม้', 'Find the wooden roof held up by columns that branch like trees',
    // a light timber roof that folds like a tree canopy, held up by tapering columns that spread out like branches, tall glass walls below with paintings inside
    R(30, 110, 180, 100, '#E1F5FE') + ring(4, (k) => R(44 + k * 42, 132, 26, 30, ['#FFCC80', '#CE93D8', '#A5D6A7', '#90CAF9'][k], 2, 2.5)) + Lc('M30 176h180', '#B3E5FC', 3)
      + P('M10 108c30-26 70-40 110-40s80 14 110 40l-14 10c-30-20-60-30-96-30s-66 10-96 30z', '#E6B97F') + Lc('M24 102c30-20 60-30 96-30s66 10 96 30', '#C8862F', 3)
      + [70, 170].map((x) => Lc(`M${x} 210V150M${x} 150l-20-40M${x} 150l20-40M${x} 150v-50`, '#D7A86E', 7)).join('')
      + R(20, 206, 200, 10, '#BDBDBD', 2) + kid(120, 204, '#EF5350', 0.9) + face(120, 92, 0.3)),
  L(T + 'landmark-kokako.v1.svg', 'นกโคคาโกเหนียงสีฟ้า', 'A kōkako with blue wattles', ['kokako', 'โคคาโก', 'kōkako', 'blue wattles', 'เหนียงสีฟ้า', 'hunua ranges', 'เทือกเขาฮูนูอา', 'birdsong', 'เสียงนกร้อง', 'native forest', 'ป่าพื้นเมือง'], 'หานกสีเทาที่มีเหนียงสีฟ้าสดห้อยใต้ปาก', 'Find the grey bird with bright blue wattles under its beak',
    // a soft blue-grey kōkako with a black eye-mask, two round bright blue wattles at the corners of its beak, perched on a branch and singing, music notes floating
    Lc('M10 190c60-10 140-14 220-30', '#6D4C41', 8) + ring(4, (k) => P(`M${40 + k * 50} ${186 - k * 6}c-10-10-6-24 6-26 4 12 2 20-6 26z`, '#66BB6A', 2.5))
      + P('M80 150c-10-40 20-74 60-70 34 4 50 34 44 64-6 30-40 40-70 36-20-4-32-14-34-30z', '#90A4AE') + P('M176 150l40 30-30-6z', '#78909C')
      + C(108, 96, 30, '#B0BEC5') + P('M80 92h50c-6 10-14 12-24 12s-20-4-26-12z', '#263238', 0) + P('M78 100l-22 4 20 6z', '#263238', 2.5)
      + C(84, 116, 8, '#2979FF', 2.5) + Lc('M126 176v14M146 174v16', '#37474F', 4)
      + [[40, 60], [62, 40]].map(([x, y]) => C(x, y, 5, INK, 0) + Lc(`M${x + 5} ${y}v-16l8 4`, INK, 2.5)).join('') + face(110, 96, 0.5, 'none').replace(/fill="#22213A"/g, 'fill="#FFFFFF"')),
];

export default {
  places: {
    'nz-auckland': { country: 'nz', wave: 3, name: nm('โอ๊คแลนด์', 'Auckland'), tz: 'Pacific/Auckland', ll: [-36.85, 174.76], alias: ['auckland', 'โอ๊คแลนด์', 'AKL', 'waiheke', 'ไวเฮกี', 'piha', 'พีฮา', 'rangitoto', 'รังกิโตโต', 'tiritiri matangi', 'ติริติริมาตางี', 'waitemata', 'ไวเตมาตา'], colors: AK },
  },
  items,
};
