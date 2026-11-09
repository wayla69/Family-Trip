// Singapore — each picture drawn for its own subject
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const K = { k1: '#EF3340', k2: '#00838F', k3: '#F3E5F5' };
const nm = (th, en) => ({ th, en });
// Vanda Miss Joaquim, the national orchid: a wide purple lip, four pale petals
const orchid = (x, y, s) => g(x, y, s, P('M0 0c-30-6-40-30-26-40 12 10 20 24 26 40z', '#E1BEE7', 3) + P('M0 0c30-6 40-30 26-40-12 10-20 24-26 40z', '#E1BEE7', 3)
  + P('M0 0c-24 10-30 30-16 36 8-12 12-24 16-36z', '#CE93D8', 3) + P('M0 0c24 10 30 30 16 36-8-12-12-24-16-36z', '#CE93D8', 3) + P('M0-4c-22 10-22 44 0 50 22-6 22-40 0-50z', '#8E24AA', 3) + C(0, -2, 5, '#FFD54A', 2.5));

const items = [
  { id: 'sg.stamp', cat: 'stamp', file: 'sg/stamp.v1.svg', name: nm('ตราประทับสิงคโปร์', 'Singapore stamp'), kw: ['singapore', 'สิงคโปร์'],
    svg: countryStamp({ name: 'SINGAPORE', ...K, emblem: orchid(100, 84, 1.1) }) },
  { id: 'sg.flag', ch: '🇸🇬', cat: 'flag', file: 'sg/flag.v1.svg', name: nm('ธงสิงคโปร์', 'Flag of Singapore'), kw: ['singapore', 'สิงคโปร์', 'flag', 'ธง'],
    // red over white; a white crescent and five white stars in a ring, top left
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF') + P('M44 38c40-12 84 12 126 0s28-4 42 0v56c-14-4 0-12-42 0s-86-12-126 0z', '#EF3340')
      + P('M84 50a18 18 0 1 0 0 34 14 14 0 1 1 0-34z', '#FFFFFF', 0).replace('stroke-width="0"', 'stroke="none"')
      + [[100, 52], [110, 60], [106, 72], [94, 72], [90, 60]].map(([x, y]) => `<path d="M${x} ${y - 4}l1.2 3h3l-2.4 2 1 3-2.8-1.8-2.8 1.8 1-3-2.4-2h3z" fill="#FFFFFF" stroke="none"/>`).join('')) },
  { id: 'sg.hello', ch: '🤗', cat: 'hello', file: 'sg/hello.v1.svg', name: nm('สวัสดี สิงคโปร์', 'Hello, Singapore'), kw: ['hello', 'สวัสดี', 'peranakan', 'เปอรานากัน', 'kebaya', 'เคบายา'],
    // a child in a Peranakan kebaya top: a lacy edge, little flower embroidery, a batik sarong
    svg: free(P('M74 214c2-30 10-50 24-56h44c14 6 22 26 24 56z', '#5C6BC0') + [86, 110, 134, 158].map((x) => C(x, 196, 6, '#FFCA28', 3)).join('') + P('M76 168c0-30 18-50 44-50s44 20 44 50z', '#F8BBD0')
      + Lc('M80 166c8-6 16 6 24 0s16 6 24 0 16 6 24 0', '#FFFFFF', 4) + C(104, 140, 5, '#E53935', 3) + C(136, 140, 5, '#E53935', 3) + C(120, 82, 38, '#FFE0BD') + P('M82 80c0-30 18-42 38-42s38 12 38 42c-6-10-20-18-38-18s-32 8-38 18z', '#3E2723') + C(148, 50, 12, '#3E2723')
      + P('M70 150c-14-16-18-38-12-54l-14-4c-8 22-2 46 14 64z', '#FFE0BD') + C(52, 88, 12, '#FFE0BD') + face(120, 88, 0.7)) },
  { id: 'sg.food.chickenrice', cat: 'food', file: 'sg/food-chickenrice.v1.svg', name: nm('ข้าวมันไก่ไหหลำ', 'Hainanese chicken rice'), kw: ['chicken rice', 'ข้าวมันไก่', 'hainanese', 'ไหหลำ', 'hawker', 'ฮอว์กเกอร์'], colour: true,
    // a dome of rice, glossy sliced chicken fanned beside it, cucumber slices, a dish of red chilli
    svg: free(E(120, 160, 104, 40, '#FFFFFF') + P('M44 158c0-40 20-60 50-60s50 20 50 60z', '#FFFDF7') + [0, 1, 2, 3].map((i) => g(150 + i * 10, 150 - i * 6, 1, R(-14, -10, 28, 20, '#FFE0B2', 8, 4), -20 + i * 6)).join('')
      + [[60, 178], [82, 184]].map(([x, y]) => E(x, y, 12, 7, '#C5E1A5', 3.5)).join('') + E(186, 186, 20, 9, '#FFFFFF') + E(186, 184, 14, 6, '#E53935', 3) + face(94, 132, 0.6)) },
  { id: 'sg.food.chillicrab', ch: '🦀', cat: 'food', file: 'sg/food-chillicrab.v1.svg', name: nm('ปูผัดพริก', 'Chilli crab'), kw: ['chilli crab', 'ปูผัดพริก', 'crab', 'ปู', 'jumbo', 'seafood', 'ซีฟู้ด'], colour: true,
    // a smiling red crab sitting in a plate of chilli sauce with two fried buns (mantou)
    svg: free(E(120, 170, 106, 40, '#FFFFFF') + E(120, 168, 90, 30, '#EF6C00') + [-1, 1].map((sd) => Lc(`M${120 + sd * 50} 140l${sd * 30} 20M${120 + sd * 54} 130l${sd * 34} 8`, '#D32F2F', 7)).join('')
      + P('M60 86c-20-10-26-30-14-40 10 4 14 14 14 24 10-6 20-4 24 4-6 10-16 14-24 12z', '#D32F2F') + P('M180 86c20-10 26-30 14-40-10 4-14 14-14 24-10-6-20-4-24 4 6 10 16 14 24 12z', '#D32F2F')
      + E(120, 126, 56, 38, '#E53935') + E(44, 180, 18, 12, '#FFE082') + E(196, 180, 18, 12, '#FFE082') + face(120, 122, 0.8)) },
  { id: 'sg.food.kayatoast', cat: 'food', file: 'sg/food-kayatoast.v1.svg', name: nm('ขนมปังกายาไข่ลวก', 'Kaya toast and soft eggs'), kw: ['kaya toast', 'กายาโทสต์', 'kopi', 'โกปี๊', 'breakfast', 'อาหารเช้า', 'soft boiled egg', 'ไข่ลวก'], colour: true,
    // a toast sandwich with green kaya and a slab of butter; a little bowl of runny eggs
    svg: free(g(90, 110, 1, R(-60, -40, 120, 30, '#E9A64C', 8) + R(-56, -12, 112, 12, '#9CCC65', 4) + R(-24, -16, 40, 10, '#FFF59D', 2, 3) + R(-60, 0, 120, 30, '#E9A64C', 8), -8)
      + P('M140 164h80c0 30-20 46-40 46s-40-16-40-46z', '#FFFFFF') + E(180, 164, 40, 10, '#FFF8E1') + C(170, 162, 10, '#FFB300', 3) + Lc('M150 140c10-12 30-12 40 0', '#B0BEC5', 4) + face(90, 112, 0.6)) },
  { id: 'sg.food.icekacang', cat: 'food', file: 'sg/food-icekacang.v1.svg', name: nm('ไอซ์กาจัง', 'Ice kacang'), kw: ['ice kacang', 'ไอซ์กาจัง', 'shaved ice', 'น้ำแข็งไส', 'dessert', 'ของหวาน', 'hawker'], colour: true,
    // a tall cone of ice striped with rainbow syrups, a cherry on top, a sweetcorn sprinkle
    svg: free(P('M40 176h160l-16 30H56z', '#90CAF9') + P('M48 176l72-150 72 150z', '#FFFDF7') + P('M76 118l44-92 26 54z', '#F06292', 0).replace('stroke-width="0"', 'stroke="none"') + P('M146 80l46 96h-30z', '#81C784', 0).replace('stroke-width="0"', 'stroke="none"') + P('M48 176l28-58 30 58z', '#FFD54A', 0).replace('stroke-width="0"', 'stroke="none"')
      + P('M48 176l72-150 72 150z', 'none') + C(120, 24, 10, '#D32F2F') + Lc('M120 14l6-12', '#43A047', 3) + [[100, 150], [140, 140], [120, 164]].map(([x, y]) => C(x, y, 4, '#FFEB3B', 2.5)).join('') + face(120, 132, 0.6)) },
  { id: 'sg.animal.otter', ch: '🦦', cat: 'animal', file: 'sg/animal-otter.v1.svg', name: nm('ตัวนาก', 'Smooth-coated otter'), kw: ['otter', 'นาก', 'bishan', 'marina', 'river', 'แม่น้ำ'], colour: true,
    // a sleek brown otter floating on its back, paws together, a pebble on its tummy
    svg: free(P('M10 176c30-8 60-8 90 0s60 8 90 0 40-6 40 0', 'none', 5).replace('fill="none"', 'fill="none" stroke="#64B5F6"') + P('M30 150c10-40 120-50 170-20 12 8 10 26-6 30-60 14-150 20-164-10z', '#8D6E63')
      + P('M180 132c20-6 30 4 28 16', 'none', 10).replace('fill="none"', 'fill="none" stroke="#8D6E63"') + C(60, 128, 34, '#8D6E63') + E(60, 140, 20, 14, '#D7CCC8') + E(60, 134, 7, 5, INK) + C(36, 104, 8, '#8D6E63') + C(84, 104, 8, '#8D6E63')
      + E(120, 132, 14, 9, '#B0BEC5') + E(108, 120, 8, 6, '#8D6E63') + E(132, 120, 8, 6, '#8D6E63') + face(60, 122, 0.6)) },
  { id: 'sg.animal.hornbill', cat: 'animal', file: 'sg/animal-hornbill.v1.svg', name: nm('นกเงือก', 'Oriental pied hornbill'), kw: ['hornbill', 'นกเงือก', 'pulau ubin', 'bird', 'นก'], colour: true,
    // black and white, the huge pale-yellow beak topped with its casque
    svg: free(P('M140 120l70 70-12 10-74-60z', INK) + P('M200 182l14 14-8 8-14-14z', '#FFFFFF', 3) + E(120, 140, 56, 50, INK) + E(118, 158, 34, 26, '#FFFFFF') + C(96, 84, 32, INK)
      + P('M70 80c-30 0-54 10-62 24 20 4 44 0 62-8z', '#FFF59D') + P('M70 72c-20-14-40-10-48 2 12 4 30 6 48 4z', '#FFE082') + face(100, 80, 0.4).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFDF7" stroke="none"')) },
  { id: 'sg.transport.bumboat', cat: 'transport', file: 'sg/transport-bumboat.v1.svg', name: nm('เรือบัมโบ๊ทแม่น้ำสิงคโปร์', 'Singapore River bumboat'), kw: ['bumboat', 'บัมโบ๊ท', 'river cruise', 'ล่องเรือ', 'clarke quay', 'คลาร์กคีย์', 'boat quay'], colour: true,
    // a low wooden river boat with painted eyes on the bow, a striped canopy, lanterns
    svg: free(P('M10 196c30-8 60-8 90 0s60 8 90 0 40-6 50 0', 'none', 5).replace('fill="none"', 'fill="none" stroke="#4FC3F7"') + P('M20 160h196l-20 30H40z', '#A1673F') + Lc('M24 170h188', '#E53935', 6)
      + R(50, 110, 140, 50, '#FFF3E0') + P('M40 112h160l-12-24H52z', '#26A69A') + Lc('M60 112l-6-24M100 112v-24M140 112v-24M180 112l6-24', '#FFFFFF', 4)
      + E(200, 170, 10, 7, '#FFFFFF', 3) + C(202, 170, 3, INK, 0) + E(76, 134, 9, 12, '#E53935', 3.5) + E(164, 134, 9, 12, '#E53935', 3.5) + face(120, 132, 0.55)) },
  { id: 'sg.culture.slipper', cat: 'culture', file: 'sg/culture-slipper.v1.svg', name: nm('รองเท้าปักลูกปัดเปอรานากัน', 'Peranakan beaded slipper'), kw: ['peranakan', 'เปอรานากัน', 'kasut manek', 'beaded slipper', 'รองเท้าลูกปัด', 'katong'], colour: true,
    // a pointed slipper covered in tiny beads: a pink peony, green leaves
    svg: free(P('M20 170c0-30 40-50 100-60l80-10c20 0 30 20 20 40-10 30-60 50-120 50H40c-14 0-20-10-20-20z', '#FFFDF7') + P('M20 170c0-30 40-50 100-60l20 64H40c-14 0-20-4-20-4z', '#4DB6AC')
      + [[60, 140], [76, 152], [92, 140], [70, 128]].map(([x, y]) => C(x, y, 8, '#F48FB1', 3)).join('') + C(76, 140, 6, '#FFD54A', 3) + P('M100 150c10-10 22-8 24 2-8 6-18 6-24-2z', '#66BB6A', 3) + face(160, 140, 0.55)) },
  // ---------- the city
  { id: 'sg-singapore.stamp', cat: 'stamp', file: 'sg/singapore/stamp.v1.svg', name: nm('ตราประทับเมืองสิงคโปร์', 'Singapore city stamp'), kw: ['singapore', 'สิงคโปร์', 'merlion', 'เมอร์ไลออน'],
    svg: cityStamp('ssg-st', { name: 'SINGAPORE', sub: 'LION CITY', ...K, emblem: R(70, 128, 60, 14, '#B0BEC5', 3) + P('M86 128c-4-26 2-44 14-50 12 6 18 24 14 50z', '#ECEFF1') + C(100, 70, 16, '#ECEFF1') + P('M86 66c-6-10 2-20 12-18M114 66c6-10-2-20-12-18', 'none', 3) + Lc('M114 74c14 2 22 14 24 26', '#64B5F6', 4) }) },
  { id: 'sg-singapore.day.supertrees', cat: 'day', file: 'sg/singapore/day-supertrees.v1.svg', name: nm('ซูเปอร์ทรีที่การ์เดนส์บายเดอะเบย์', 'Supertrees, Gardens by the Bay'), kw: ['gardens by the bay', 'การ์เดนส์บายเดอะเบย์', 'supertree', 'ซูเปอร์ทรี', 'garden rhapsody', 'light show', 'โชว์แสงสี'],
    // the giant steel trees at night, glowing pink, purple and teal canopies, a skywalk between them
    svg: scene('ssg-d1', '#311B92', [[30, 40], [80, 26], [200, 50], [150, 30]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('')
      + [[60, 110, '#EC407A'], [120, 80, '#AB47BC'], [184, 104, '#26C6DA']].map(([x, top, c]) => P(`M${x - 10} 210l4-${210 - top - 20}h12l4 ${210 - top - 20}z`, '#7E57C2') + P(`M${x - 40} ${top}c10 20 70 20 80 0-10-10-70-10-80 0z`, c) + Lc(`M${x - 30} ${top + 6}l24 20M${x + 30} ${top + 6}l-24 20`, c, 4)).join('')
      + Lc('M60 150h124', '#FFFFFF', 5) + P('M-4 210h248v40H-4z', '#1B5E20')) },
  { id: 'sg-singapore.day.sentosa', cat: 'day', file: 'sg/singapore/day-sentosa.v1.svg', name: nm('เกาะเซ็นโตซ่า', 'Sentosa island'), kw: ['sentosa', 'เซ็นโตซ่า', 'beach', 'ชายหาด', 'siloso', 'palawan', 'cable car', 'กระเช้า'],
    // a cable car gliding over the sea to the island: palm trees, a beach, a suspension bridge to a tiny islet
    svg: scene('ssg-d2', '#B3E5FC', C(190, 54, 16, '#FFD54A') + Lc('M-4 40l250 50', INK, 4) + R(84, 62, 34, 30, '#E53935', 8) + Lc('M100 52v12', INK, 4) + R(90, 70, 22, 12, '#BFD9F2', 4, 3)
      + P('M-4 160c40-10 90-10 140 0v60H-4z', '#FFE082') + Lc('M40 170c0-30 4-50 12-60', '#8D6E63', 7) + P('M52 110c-18-10-34-4-40 6M52 110c18-10 34-4 40 6M52 110c-6-14-18-20-28-16', 'none', 6).replace('fill="none"', 'fill="none" stroke="#43A047"')
      + Lc('M140 168c20-12 40-12 60 0', '#8D6E63', 4) + E(210, 172, 22, 10, '#AED581') + P('M136 170h108v80H136z', '#4FC3F7')) },
  { id: 'sg-singapore.landmark.merlion', cat: 'landmark', file: 'sg/singapore/landmark-merlion.v1.svg', name: nm('เมอร์ไลออน', 'Merlion'), kw: ['merlion', 'เมอร์ไลออน', 'merlion park', 'marina bay', 'มารีน่าเบย์'], colour: true, spot: nm('หาสิงโตหางปลาที่พ่นน้ำ', 'Find the lion-fish spouting water'),
    // the lion's head on a fish body coiled on a rock, water arcing out of its mouth
    svg: free(P('M50 220c10-30 40-40 70-40s60 10 70 40z', '#B0BEC5') + P('M90 186c-20-30-10-70 20-80 30 10 40 50 20 80z', '#ECEFF1') + [0, 1, 2].map((i) => P(`M${100 + i * 8} ${170 - i * 18}q6-6 12 0`, 'none', 3)).join('')
      + P('M150 196c20 0 30-14 26-30', 'none', 6) + P('M174 160l10-10 6 14z', '#ECEFF1') + C(110, 84, 38, '#ECEFF1') + P('M72 80c-8-20 6-40 26-36M148 80c8-20-6-40-26-36M80 60c10-16 50-16 60 0', 'none', 5)
      + Lc('M140 96c40 0 70 30 80 80', '#64B5F6', 8) + Lc('M140 96c40 0 70 30 80 80', '#E1F5FE', 3) + face(110, 88, 0.7, 'o')) },
  { id: 'sg-singapore.landmark.mbs', cat: 'landmark', file: 'sg/singapore/landmark-mbs.v1.svg', name: nm('มารีน่าเบย์แซนด์ส', 'Marina Bay Sands'), kw: ['marina bay sands', 'มารีน่าเบย์แซนด์ส', 'mbs', 'skypark', 'marina bay', 'มารีน่าเบย์', 'spectra'], colour: true, spot: nm('หาเรือบนยอดตึกสามตึก', 'Find the ship on top of three towers'),
    // three slanted towers carrying the long sky-park "ship" on their tops, with a tiny pool and trees
    svg: free([60, 120, 180].map((x) => P(`M${x - 22} 220l8-170h28l8 170z`, '#CFD8DC') + Lc(`M${x - 10} 70v140M${x + 4} 70v140`, '#B0BEC5', 3)).join('')
      + P('M14 44c60-14 160-14 216 0l-10 14H24z', '#90A4AE') + R(70, 36, 50, 6, '#4FC3F7', 2, 3) + [150, 166, 182].map((x) => C(x, 34, 6, '#66BB6A', 3)).join('') + face(120, 120, 0.5)) },
  { id: 'sg-singapore.landmark.jewel', cat: 'landmark', file: 'sg/singapore/landmark-jewel.v1.svg', name: nm('น้ำตกในร่มจูเวลชางงี', 'Jewel Changi rain vortex'), kw: ['jewel', 'จูเวล', 'changi', 'ชางงี', 'rain vortex', 'น้ำตกในร่ม', 'airport', 'สนามบิน'], colour: true, spot: nm('หาน้ำตกในตึกแก้ว', 'Find the waterfall inside the glass dome'),
    // the glass doughnut dome with the waterfall pouring through its hole into a forest
    svg: free(P('M14 180c0-90 50-140 106-140s106 50 106 140z', '#E1F5FE') + [60, 100, 140, 180].map((x) => Lc(`M${x} ${x < 120 ? 60 + (120 - x) * 0.6 : 60 + (x - 120) * 0.6}v${180 - (x < 120 ? 60 + (120 - x) * 0.6 : 60 + (x - 120) * 0.6)}`, '#B3E5FC', 3)).join('')
      + E(120, 46, 22, 8, '#4FC3F7') + P('M104 50h32l-6 130h-20z', '#81D4FA') + Lc('M112 60v110M128 60v110', '#FFFFFF', 3)
      + [[40, 182], [70, 172], [170, 172], [200, 182], [56, 190], [184, 190]].map(([x, y]) => C(x, y, 16, '#66BB6A')).join('') + E(120, 184, 34, 10, '#4FC3F7') + face(120, 120, 0.5)) },
  { id: 'sg-singapore.landmark.dragon', cat: 'landmark', file: 'sg/singapore/landmark-dragon.v1.svg', name: nm('สนามเด็กเล่นมังกรโทอาปาโยห์', 'Toa Payoh dragon playground'), kw: ['dragon playground', 'สนามเด็กเล่นมังกร', 'toa payoh', 'โทอาปาโยห์', 'playground', 'สนามเด็กเล่น'], colour: true, spot: nm('หามังกรที่เป็นสนามเด็กเล่น', 'Find the dragon you can climb'),
    // the mosaic dragon: a big round-snouted head with a spiky mane and porthole windows, its body a row of red-and-white hoops on sand
    svg: free(E(120, 214, 112, 10, '#FFE082') + [138, 168, 198].map((x) => Lc(`M${x - 14} 214c0-40 28-40 28 0`, '#E53935', 9) + P(`M${x - 18} 214c0-46 36-46 36 0`, 'none', 4) + P(`M${x - 10} 214c0-34 20-34 20 0`, 'none', 4)).join('')
      + P('M70 60l10-24 12 20 12-22 10 24 12-18 6 26', '#E53935') + P('M30 214V120c0-40 26-60 56-60s50 20 50 60v94z', '#FFCA28') + P('M30 140c-20 0-26 20-14 30h28z', '#FFCA28')
      + [[54, 160], [96, 160], [54, 196], [96, 196]].map(([x, y]) => C(x, y, 10, '#FFF8E1')).join('') + [[60, 128], [100, 140], [78, 178]].map(([x, y]) => R(x - 5, y - 5, 10, 10, '#4DB6AC', 2, 3)).join('')
      + face(84, 100, 0.65)) },
  { id: 'sg-singapore.landmark.flyer', cat: 'landmark', file: 'sg/singapore/landmark-flyer.v1.svg', name: nm('ชิงช้าสวรรค์สิงคโปร์ฟลายเออร์', 'Singapore Flyer'), kw: ['singapore flyer', 'สิงคโปร์ฟลายเออร์', 'ferris wheel', 'ชิงช้าสวรรค์', 'marina'], colour: true, spot: nm('นับกระเช้าบนชิงช้าสวรรค์', 'Count the capsules on the big wheel'),
    // the huge white wheel standing on its long low terminal, with clear capsule pods around the rim
    svg: free(R(20, 196, 200, 24, '#B0BEC5', 6) + C(120, 104, 86, 'none') + C(120, 104, 78, 'none', 3)
      + Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; const x = 120 + Math.cos(a) * 86, y = 104 + Math.sin(a) * 86; return Lc(`M120 104L${x.toFixed(1)} ${y.toFixed(1)}`, '#CFD8DC', 2.5) + E(x, y, 9, 6, '#B3E5FC', 3); }).join('')
      + Lc('M90 196L120 104L150 196', INK, 6) + C(120, 104, 12, '#ECEFF1') + face(120, 104, 0.4, 'none')) },
];
export default {
  places: {
    sg: { country: 'sg', wave: 1, name: nm('สิงคโปร์', 'Singapore'), tz: 'Asia/Singapore', alias: ['singapore', 'สิงคโปร์'], colors: K },
    'sg-singapore': { country: 'sg', wave: 1, name: nm('สิงคโปร์', 'Singapore'), tz: 'Asia/Singapore', ll: [1.29, 103.85], alias: ['singapore', 'สิงคโปร์', 'marina bay', 'มารีน่าเบย์', 'sentosa', 'เซ็นโตซ่า', 'orchard', 'ออร์ชาร์ด', 'chinatown', 'little india', 'changi', 'ชางงี', 'clarke quay', 'bugis', 'jurong'], colors: K },
  },
  items,
};
