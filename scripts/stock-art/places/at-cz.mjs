// Austria (Vienna, Hallstatt) and Czechia (Prague) — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const AT = { k1: '#C62828', k2: '#6D4C41', k3: '#FFEBEE' };
const CZ = { k1: '#11457E', k2: '#D7141A', k3: '#E3F2FD' };

const items = [
  // ---------- Austria
  { id: 'at.stamp', cat: 'stamp', file: 'at/stamp.v1.svg', name: nm('ตราประทับออสเตรีย', 'Austria stamp'), kw: ['austria', 'ออสเตรีย', 'österreich'],
    // a violin with a treble clef floating beside it (the land of Mozart)
    svg: countryStamp({ name: 'ÖSTERREICH', ...AT, emblem: g(92, 98, 1, P('M0-46c14 0 18 12 12 22 12 6 14 24 4 34 8 10 6 30-16 32-22-2-24-22-16-32-10-10-8-28 4-34-6-10-2-22 12-22z', '#B5713E', 3) + Lc('M0-46v-24', INK, 4) + Lc('M-4 0h8M-4 14h8', INK, 2.5), -20)
      + P('M128 120c-10 0-14-10-8-16 8-6 18 0 16 12-2 14-18 20-26 10-10-14 10-38 20-46 8-8 8-20 0-22-8 0-10 14-6 30l10 50', 'none', 3.5) }) },
  { id: 'at.flag', ch: '🇦🇹', cat: 'flag', file: 'at/flag.v1.svg', name: nm('ธงออสเตรีย', 'Flag of Austria'), kw: ['austria', 'ออสเตรีย', 'flag', 'ธง'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF') + P('M44 38c40-12 84 12 126 0s28-4 42 0v37c-14-4 0-12-42 0s-86-12-126 0z', '#ED2939') + P('M44 112c40-12 84 12 126 0s28-4 42 0v38c-14-4 0-12-42 0s-86-12-126 0z', '#ED2939')) },
  { id: 'at.hello', cat: 'hello', file: 'at/hello.v1.svg', name: nm('กรึสก็อท สวัสดี', 'Grüß Gott, hello'), kw: ['gruss gott', 'grüß gott', 'servus', 'hello', 'สวัสดี', 'dirndl', 'เดิร์นเดิล', 'sound of music'],
    // a child in a dirndl: a full skirt with a pink apron, a laced bodice, a white blouse with puffed sleeves, flower braids
    svg: free(P('M66 214c4-50 22-80 54-80s50 30 54 80z', '#43A047') + P('M96 140h48l10 74H86z', '#F48FB1') + P('M90 150c0-20 12-30 30-30s30 10 30 30z', '#1B5E20') + Lc('M110 128l20 16M130 128l-20 16', '#FFFFFF', 3)
      + [[82, 128], [158, 128]].map(([x, y]) => C(x, y, 16, '#FFFFFF')).join('') + C(120, 90, 32, '#FFE0BD') + P('M88 84c0-26 16-38 32-38s32 12 32 38c-6-10-18-16-32-16s-26 6-32 16z', '#FFCA28')
      + [[84, 110], [156, 110]].map(([x, y]) => Lc(`M${x} ${y - 24}v30`, '#FFCA28', 9) + C(x, y + 8, 5, '#E53935', 2.5)).join('') + face(120, 96, 0.6)) },
  { id: 'at.food.sachertorte', cat: 'food', file: 'at/food-sachertorte.v1.svg', name: nm('ซาเคอร์ทอร์เต', 'Sachertorte'), kw: ['sachertorte', 'ซาเคอร์ทอร์เต', 'chocolate cake', 'เค้กช็อกโกแลต', 'cafe', 'คาเฟ่', 'hotel sacher'], colour: true,
    // a glossy chocolate cake slice with its thin apricot-jam layer, a chocolate seal on top, a cloud of whipped cream beside
    svg: free(E(120, 196, 100, 18, '#FFFFFF') + P('M40 180l120-30v-60L40 120z', '#4E342E') + P('M40 120l120-30 30 14-120 30z', '#3E2723') + P('M160 90l30 14v60l-30-14z', '#3E2723') + Lc('M40 150l120-30', '#FFB300', 5)
      + E(110, 110, 14, 6, '#5D4037', 3) + P('M170 180c0-20 40-20 40 0 10 6 4 18-6 16-10 8-30 8-34-4-8-2-8-12 0-12z', '#FFFFFF') + face(96, 152, 0.5)) },
  { id: 'at.food.strudel', cat: 'food', file: 'at/food-strudel.v1.svg', name: nm('แอปเปิลชตรูเดิล', 'Apple strudel'), kw: ['apfelstrudel', 'apple strudel', 'แอปเปิลชตรูเดิล', 'strudel', 'ชตรูเดิล', 'vanilla sauce'], colour: true,
    // a flaky rolled pastry slice showing its spiral of apple and raisins, dusted with sugar, in a pool of vanilla sauce
    svg: free(E(120, 180, 104, 28, '#FFFFFF') + E(120, 176, 80, 18, '#FFF59D') + P('M40 150c0-40 20-60 80-60s80 20 80 60c0 20-160 20-160 0z', '#F4C47C') + E(164, 134, 26, 30, '#FFE082')
      + P('M164 134m-14 0a14 16 0 1 1 14 16 8 9 0 1 1-8-9', 'none', 4) + [[150, 120], [176, 148]].map(([x, y]) => C(x, y, 3.5, '#6D4C41', 0)).join('') + Lc('M70 110l10 6M100 104l10 6M130 104l10 6', '#FFFFFF', 4) + face(96, 140, 0.55)) },
  { id: 'at.food.schnitzel', cat: 'food', file: 'at/food-schnitzel.v1.svg', name: nm('ชนิทเซล', 'Wiener schnitzel'), kw: ['schnitzel', 'ชนิทเซล', 'wiener schnitzel', 'figlmuller', 'figlmüller', 'escalope'], colour: true,
    // a huge thin golden schnitzel hanging over the edge of the plate, a lemon slice and a little potato salad
    svg: free(E(120, 160, 106, 40, '#FFFFFF') + P('M24 150c10-50 70-70 120-60s76 30 72 56c-6 30-60 40-110 36-50-4-86-12-82-32z', '#E9A64C') + [[60, 130], [100, 112], [150, 116], [180, 140], [120, 150]].map(([x, y]) => C(x, y, 4, '#C8862F', 0)).join('')
      + C(150, 140, 16, '#FFF176') + Lc('M150 124v32M136 140h28', '#FFFFFF', 3) + E(60, 186, 22, 10, '#FFF8E1') + face(100, 136, 0.65)) },
  { id: 'at.animal.lipizzaner', cat: 'animal', file: 'at/animal-lipizzaner.v1.svg', name: nm('ม้าขาวลิปิซซาเนอร์', 'Lipizzaner horse'), kw: ['lipizzaner', 'ลิปิซซาเนอร์', 'white horse', 'ม้าขาว', 'spanish riding school', 'โรงเรียนขี่ม้าสเปน', 'horse', 'ม้า'], colour: true,
    // a pure white dancing horse lifting a front hoof, a braided mane with a red ribbon, a gold-trimmed saddle cloth
    svg: free(E(130, 140, 70, 40, '#FAFAFA') + [[90, 170, 0], [170, 170, 0]].map(([x, y]) => R(x - 9, y, 18, 46, '#FAFAFA', 6)).join('') + g(98, 166, 1, R(-9, 0, 18, 30, '#FAFAFA', 6), -40) + P('M196 120c20 0 30 20 24 40-10-10-16-24-24-24z', '#ECEFF1')
      + P('M70 130c-10-40 0-80 26-90 20 10 24 40 14 70z', '#FAFAFA') + E(76, 50, 26, 18, '#FAFAFA') + P('M66 40l-4-16 12 10z', '#FAFAFA') + Lc('M90 46c6 20 6 40 0 60', '#E0E0E0', 6) + [60, 80, 100].map((y) => C(92, y, 3.5, '#E53935', 2)).join('')
      + R(110, 112, 60, 30, '#C62828', 4) + Lc('M110 142h60', '#FFD54A', 4) + face(70, 50, 0.45)) },
  { id: 'at.transport.fiaker', cat: 'transport', file: 'at/transport-fiaker.v1.svg', name: nm('รถม้าเฟียกเกอร์', 'Fiaker horse carriage'), kw: ['fiaker', 'เฟียกเกอร์', 'horse carriage', 'รถม้า', 'carriage ride', 'นั่งรถม้า', 'stephansplatz'], colour: true,
    // a black open carriage with big red-spoked wheels pulled by a brown horse, the coachman in a bowler hat
    svg: free(P('M110 120h100v40H110z', INK) + P('M120 120c0-20 20-30 40-30h40v30z', INK) + [[130, 176, 22], [196, 170, 28]].map(([x, y, r]) => C(x, y, r, 'none') + C(x, y, r - 4, 'none', 3) + Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return Lc(`M${x} ${y}l${(Math.cos(a) * (r - 4)).toFixed(1)} ${(Math.sin(a) * (r - 4)).toFixed(1)}`, '#C62828', 3); }).join('')).join('')
      + Lc('M110 140H70', INK, 4) + E(54, 140, 34, 22, '#8D6E63') + [[34, 162], [72, 162]].map(([x, y]) => R(x - 5, y, 10, 40, '#8D6E63', 3)).join('') + P('M24 130c-10-20-6-40 10-46 10 6 12 24 4 40z', '#8D6E63') + C(150, 76, 12, '#FFE0BD', 3) + R(140, 58, 20, 12, INK, 2, 3) + E(150, 70, 16, 4, INK, 3) + face(30, 96, 0.35) + face(150, 78, 0.25, 'none')) },
  { id: 'at.culture.mozartkugel', cat: 'culture', file: 'at/culture-mozartkugel.v1.svg', name: nm('ช็อกโกแลตกลมโมซาร์ท', 'Mozart chocolate balls'), kw: ['mozartkugel', 'mozart', 'โมซาร์ท', 'chocolate', 'ช็อกโกแลต', 'salzburg', 'ซาลซ์บวร์ก', 'souvenir', 'ของฝาก'],
    // three round chocolates wrapped in silver and red foil, one unwrapped showing the green pistachio middle
    svg: free([[70, 150, '#ECEFF1'], [170, 150, '#E53935']].map(([x, y, c]) => C(x, y, 40, c) + Lc(`M${x - 30} ${y - 26}l60 52M${x + 30} ${y - 26}l-60 52`, c === '#E53935' ? '#B71C1C' : '#B0BEC5', 3) + C(x, y, 14, '#FFD54A', 3)).join('')
      + C(120, 100, 42, '#5D4037') + C(120, 100, 30, '#C5E1A5') + C(120, 100, 16, '#D7A86E') + face(120, 132, 0.5)) },
  { id: 'at.culture.waltz', cat: 'culture', file: 'at/culture-waltz.v1.svg', name: nm('เพลงวอลทซ์และเครื่องสาย', 'The waltz and its violin'), kw: ['waltz', 'วอลทซ์', 'violin', 'ไวโอลิน', 'strauss', 'concert', 'คอนเสิร์ต', 'opera', 'โอเปร่า'], colour: true,
    // a violin and its bow with notes dancing out of it in a swirl
    svg: free(g(100, 140, 1, P('M0-80c22 0 28 20 18 36 20 10 24 40 6 56 12 16 10 50-24 52-34-2-36-36-24-52-18-16-14-46 6-56-10-16-4-36 18-36z', '#B5713E') + Lc('M-6-20c4 4 4 8 0 12M6-20c-4 4-4 8 0 12', INK, 3) + R(-4, -110, 8, 34, '#3E2723', 3) + Lc('M-2-76v120M2-76v120', '#FFF8E1', 1.5), -24)
      + Lc('M40 210L200 40', '#8D6E63', 4) + [[160, 120], [190, 90], [180, 160]].map(([x, y]) => E(x, y, 9, 7, INK) + Lc(`M${x + 8} ${y}v-28`, INK, 3)).join('') + face(96, 150, 0.5)) },
  // Vienna
  { id: 'at-vienna.stamp', cat: 'stamp', file: 'at/vienna/stamp.v1.svg', name: nm('ตราประทับเวียนนา', 'Vienna stamp'), kw: ['vienna', 'wien', 'เวียนนา'],
    // the old giant Ferris wheel of the Prater with its red cabins
    svg: cityStamp('avi-st', { name: 'WIEN', sub: 'ÖSTERREICH', ...AT, emblem: C(100, 92, 36, 'none') + Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; const x = 100 + Math.cos(a) * 36, y = 92 + Math.sin(a) * 36; return Lc(`M100 92L${x.toFixed(1)} ${y.toFixed(1)}`, INK, 1.5) + R(x - 5, y - 4, 10, 8, '#C62828', 1, 2); }).join('') + Lc('M84 140l16-48 16 48', INK, 3) }) },
  { id: 'at-vienna.day.schonbrunn', cat: 'day', file: 'at/vienna/day-schonbrunn.v1.svg', name: nm('พระราชวังเชินบรุนน์', 'Schönbrunn Palace'), kw: ['schonbrunn', 'schönbrunn', 'เชินบรุนน์', 'palace', 'พระราชวัง', 'gloriette', 'gardens', 'สวน', 'zoo'],
    // the long yellow palace with its green shutters, the parterre gardens in patterns, the Gloriette on the hill
    svg: scene('avi-d1', '#E3F2FD', P('M-4 70c60-20 180-20 248 0v20H-4z', '#7CB342') + R(96, 46, 48, 22, '#FFFFFF') + Lc('M100 46c4-8 36-8 40 0', INK, 3)
      + R(-4, 92, 248, 50, '#FFD54A') + P('M-4 94h248l-6-10H2z', '#E57373') + Array.from({ length: 11 }, (_, i) => R(4 + i * 22, 104, 10, 18, '#43A047', 2, 3)).join('') + R(104, 70, 32, 72, '#FFD54A') + P('M100 72l20-14 20 14z', '#E57373')
      + P('M-4 142h248v108H-4z', '#AED581') + [[60, 180], [180, 180], [120, 210]].map(([x, y]) => E(x, y, 34, 14, '#E57373', 3) + E(x, y, 20, 8, '#FFF59D', 3)).join('')) },
  { id: 'at-vienna.landmark.riesenrad', cat: 'landmark', file: 'at/vienna/landmark-riesenrad.v1.svg', name: nm('ชิงช้าสวรรค์ยักษ์แห่งปราเทอร์', 'The Prater giant wheel'), kw: ['riesenrad', 'ชิงช้าสวรรค์', 'prater', 'ปราเทอร์', 'giant ferris wheel', 'amusement park', 'สวนสนุก'], colour: true, spot: nm('หาชิงช้าสวรรค์ที่มีกระเช้าเป็นบ้านสีแดง', 'Find the big wheel with little red houses'),
    // the old iron wheel: spokes like a bicycle, tied with crossing cables, little red wagon-cabins hanging on it
    svg: free(C(120, 104, 86, 'none') + C(120, 104, 70, 'none', 3) + Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8; return Lc(`M120 104L${(120 + Math.cos(a) * 86).toFixed(1)} ${(104 + Math.sin(a) * 86).toFixed(1)}`, '#5D4037', 2); }).join('')
      + Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4 + 0.2; const x = 120 + Math.cos(a) * 86, y = 104 + Math.sin(a) * 86; return R(x - 12, y, 24, 18, '#C62828', 3, 3.5) + R(x - 8, y + 4, 16, 6, '#FFE082', 1, 2); }).join('')
      + Lc('M60 222L120 104L180 222M80 222l40-60 40 60', INK, 5) + C(120, 104, 12, '#5D4037') + face(120, 104, 0.35, 'none')) },
  { id: 'at-vienna.landmark.stephansdom', cat: 'landmark', file: 'at/vienna/landmark-stephansdom.v1.svg', name: nm('มหาวิหารสเตฟาน', 'St Stephen\'s Cathedral'), kw: ['stephansdom', 'สเตฟานส์โดม', 'st stephens', 'มหาวิหารสเตฟาน', 'stephansplatz', 'cathedral', 'zigzag roof'], colour: true, spot: nm('หาหลังคากระเบื้องลายซิกแซกสีสด', 'Find the roof with the bright zigzag tiles'),
    // the steep roof of glazed tiles in green, yellow and white zigzags, the one tall needle spire beside it
    svg: free(R(60, 140, 140, 80, '#E8DCC6') + P('M50 144l80-70 80 70z', '#FFFFFF') + Array.from({ length: 4 }, (_, j) => Lc(`M${66 + j * 6} ${132 - j * 14}l${16 - j * 1} -12 ${16 - j} 12 ${16 - j} -12 ${16 - j} 12 ${16 - j} -12 ${16 - j} 12 ${16 - j} -12 ${16 - j} 12`, ['#43A047', '#FFCA28', '#43A047', '#FFCA28'][j], 5)).join('')
      + P('M24 220V110l14-90 14 90v110z', '#D7C9AE') + Lc('M28 120h20M30 150h16M30 180h16', '#B8A47A', 3) + Lc('M38 20V4', INK, 3) + P('M114 220v-40c0-20 32-20 32 0v40z', '#5D4037') + face(130, 196, 0.45)) },
  { id: 'at-vienna.landmark.opera', cat: 'landmark', file: 'at/vienna/landmark-opera.v1.svg', name: nm('โรงอุปรากรแห่งรัฐเวียนนา', 'Vienna State Opera'), kw: ['state opera', 'โรงอุปรากร', 'staatsoper', 'opera', 'โอเปร่า', 'ringstrasse', 'concert'], colour: true, spot: nm('หาตึกที่มีซุ้มโค้งและม้าบินบนหลังคา', 'Find the building with arches and winged horses on top'),
    // the stone opera house: a loggia of five arches, a green copper roof, two winged horses rearing on the corners
    svg: free(R(20, 110, 200, 110, '#E8DCC6') + Array.from({ length: 5 }, (_, i) => P(`M${44 + i * 38} 180v-40c0-20 30-20 30 0v40z`, '#8D6E63')).join('') + R(20, 96, 200, 16, '#D7C9AE', 2) + P('M40 96c0-40 160-40 160 0z', '#4DB6AC')
      + [[30, 82], [210, 82]].map(([x, y]) => P(`M${x - 12} ${y + 14}c0-14 10-24 24-20-4 10-6 14-6 20z`, '#4DB6AC', 3) + P(`M${x - 4} ${y}c-6-10-2-18 8-20 0 8-2 14-8 20z`, '#FFD54A', 3)).join('') + R(20, 200, 200, 20, '#BCAAA4') + face(120, 150, 0.45)) },
  // Hallstatt
  { id: 'at-hallstatt.stamp', cat: 'stamp', file: 'at/hallstatt/stamp.v1.svg', name: nm('ตราประทับฮัลล์สตัทท์', 'Hallstatt stamp'), kw: ['hallstatt', 'ฮัลล์สตัทท์'],
    // the white church spire on the lakeshore with a swan
    svg: cityStamp('aha-st', { name: 'HALLSTATT', sub: 'ÖSTERREICH', ...AT, emblem: P('M50 120l30-60 20 20 20-30 30 70z', '#78909C') + R(94, 74, 12, 46, '#FFFFFF') + P('M92 76l8-24 8 24z', '#5D4037') + Lc('M50 126c16-6 32-6 48 0s32 6 50 0', '#4FC3F7', 4) + E(128, 132, 10, 5, '#FFFFFF', 2.5) + Lc('M134 130c4-8 0-12-4-12', INK, 2) }) },
  { id: 'at-hallstatt.day.lake', cat: 'day', file: 'at/hallstatt/day-lake.v1.svg', name: nm('หมู่บ้านริมทะเลสาบฮัลล์สตัทท์', 'Hallstatt by the lake'), kw: ['hallstatt', 'ฮัลล์สตัทท์', 'hallstatter see', 'lake', 'ทะเลสาบ', 'swan', 'หงส์', 'postcard view'],
    // the postcard: pastel houses stacked up the steep mountainside, the white spire, its reflection in the still lake, swans
    svg: scene('aha-d1', '#E3F2FD', P('M-4 150V40l80 30 60-50 108 70v60z', '#607D8B') + P('M-4 150c40-60 120-80 160-80l88 40v40z', '#43A047')
      + [[30, 120, '#FFF59D'], [60, 110, '#F8BBD0'], [100, 104, '#FFFFFF'], [150, 112, '#B3E5FC'], [190, 120, '#FFE0B2']].map(([x, y, c]) => R(x, y, 26, 30, c, 0, 3.5) + P(`M${x - 4} ${y + 2}l17-14 17 14z`, '#5D4037', 3.5)).join('') + R(126, 80, 12, 70, '#FFFFFF', 0, 3.5) + P('M122 82l10-30 10 30z', '#5D4037', 3.5)
      + P('M-4 150h248v100H-4z', '#4FC3F7') + Lc('M128 160v40M40 170v20M170 172v24', '#B3E5FC', 6) + [[70, 216], [190, 226]].map(([x, y]) => E(x, y, 14, 7, '#FFFFFF', 3) + Lc(`M${x + 10} ${y - 4}c6-12 0-18-6-18`, INK, 3)).join('')) },
  { id: 'at-hallstatt.landmark.church', cat: 'landmark', file: 'at/hallstatt/landmark-church.v1.svg', name: nm('โบสถ์ยอดแหลมริมทะเลสาบฮัลล์สตัทท์', 'Hallstatt\'s lakeside church'), kw: ['hallstatt church', 'โบสถ์ฮัลล์สตัทท์', 'evangelische kirche', 'spire', 'ยอดแหลม', 'lakeside'], colour: true, spot: nm('หาโบสถ์ยอดแหลมริมน้ำ', 'Find the pointy church by the water'),
    // the slim white church with its tall dark needle spire on the water's edge, a wooden boat tied up
    svg: free(R(70, 120, 90, 80, '#FFFFFF') + P('M62 124l53-34 53 34z', '#5D4037') + R(124, 40, 30, 160, '#FFFFFF') + P('M118 42l21-40 21 40z', '#455A64') + C(139, 70, 8, '#FFF59D', 3) + [90, 140].map((x) => P(`M${x - 6} 170v-24c0-10 12-10 12 0v24z`, '#BBDEFB', 3)).join('')
      + P('M10 200h220v24H10z', '#4FC3F7') + P('M30 196h60l-8 10H38z', '#A1673F') + face(115, 160, 0.45)) },
  { id: 'at-hallstatt.landmark.saltmine', cat: 'landmark', file: 'at/hallstatt/landmark-saltmine.v1.svg', name: nm('สไลด์ไม้ในเหมืองเกลือ', 'The salt mine slide'), kw: ['salt mine', 'เหมืองเกลือ', 'salzwelten', 'slide', 'สไลเดอร์', 'miners slide', 'funicular'], colour: true, spot: nm('หาสไลเดอร์ไม้ของคนงานเหมือง', 'Find the miners\' wooden slide'),
    // a long polished wooden miners' slide dropping into a lit tunnel, a child in white miner's overalls whooshing down
    svg: free(P('M10 220V40h220v180z', '#8D6E63') + P('M40 220V80c0-20 160-20 160 0v140z', '#4E342E') + [[60, 90], [180, 90]].map(([x, y]) => C(x, y, 7, '#FFEB3B', 3)).join('') + Lc('M50 100L190 210', '#C8A26B', 14) + Lc('M50 92L190 202M50 108L190 218', INK, 3)
      + g(100, 140, 1, P('M-20 0c0-16 10-24 20-24s20 8 20 24z', '#FAFAFA') + C(0, -32, 11, '#FFE0BD', 3) + face(0, -32, 0.3), 38) + Lc('M40 60c10-6 20-6 30 0M170 60c10-6 20-6 30 0', '#ECEFF1', 4)) },
  // ---------- Czechia
  { id: 'cz.stamp', cat: 'stamp', file: 'cz/stamp.v1.svg', name: nm('ตราประทับเช็กเกีย', 'Czechia stamp'), kw: ['czechia', 'czech republic', 'เช็กเกีย', 'สาธารณรัฐเช็ก', 'cesko'],
    // the Bohemian lion: silver, crowned in gold, standing up on its back legs with its famous two tails
    svg: countryStamp({ name: 'ČESKO', ...CZ, emblem: Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return C(98 + Math.cos(a) * 16, 76 + Math.sin(a) * 16, 8, '#CFD8DC', 2.5); }).join('') + P('M84 136l4-30c-10-6-14-18-8-30 6-10 18-12 26-6l10-8 4 12c8 6 8 18 2 26l-6 8 4 28z', '#ECEFF1', 3) + P('M80 60l4-12 6 8 6-10 6 10 6-8 4 12z', '#FFD54A', 2.5)
      + Lc('M110 116c16-4 24-20 18-34M112 122c20 0 30-14 30-30', INK, 3) + C(124, 82, 4, '#ECEFF1', 2) + C(142, 92, 4, '#ECEFF1', 2) + Lc('M96 136v6M110 136v6', INK, 3) + face(98, 74, 0.25, 'none') }) },
  { id: 'cz.flag', ch: '🇨🇿', cat: 'flag', file: 'cz/flag.v1.svg', name: nm('ธงเช็กเกีย', 'Flag of Czechia'), kw: ['czechia', 'เช็กเกีย', 'czech', 'flag', 'ธง'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF') + P('M44 94c40-12 84 12 126 0s28-4 42 0v56c-14-4 0-12-42 0s-86-12-126 0z', '#D7141A') + P('M44 38l70 56-70 56z', '#11457E')) },
  { id: 'cz.food.trdelnik', cat: 'food', file: 'cz/food-trdelnik.v1.svg', name: nm('ขนมเตรเดลนิก', 'Trdelník chimney cake'), kw: ['trdelnik', 'trdelník', 'เตรเดลนิก', 'chimney cake', 'ขนมปล่องไฟ', 'old town square'], colour: true,
    // a hollow spiral pastry tube rolled in sugar and nuts, filled with ice cream and strawberries at the top
    svg: free(P('M80 70h80l-10 150H90z', '#E9A64C') + Array.from({ length: 6 }, (_, i) => Lc(`M${82 + i * 1.6} ${92 + i * 22}l${76 - i * 3} -14`, '#C8862F', 4)).join('') + [[96, 110], [130, 130], [110, 170], [140, 186]].map(([x, y]) => C(x, y, 3, '#FFF8E1', 0)).join('')
      + P('M78 72c0-30 84-30 84 0z', '#FFF8E1') + [[100, 50], [130, 46]].map(([x, y]) => P(`M${x - 10} ${y}c0-14 20-14 20 0-4 12-16 12-20 0z`, '#E53935', 3.5)).join('') + face(120, 140, 0.6)) },
  { id: 'cz.animal.lynx', cat: 'animal', file: 'cz/animal-lynx.v1.svg', name: nm('แมวป่าลิงซ์', 'Eurasian lynx'), kw: ['lynx', 'ลิงซ์', 'sumava', 'šumava', 'ชูมาวา', 'forest', 'ป่า', 'wild cat'], colour: true,
    // a big spotted forest cat with black ear tufts, a ruff of cheek fur and a stubby black-tipped tail
    svg: free(E(140, 164, 66, 38, '#D7A86E') + [[100, 186], [176, 186]].map(([x, y]) => R(x - 10, y, 20, 28, '#D7A86E', 8)).join('') + P('M200 150c14-4 22 4 20 14-8 2-16 0-20-14z', INK, 3)
      + [[130, 150], [150, 170], [170, 150], [118, 172]].map(([x, y]) => C(x, y, 4, '#8D6E63', 0)).join('') + P('M50 78l6-40 20 30zM126 78l-6-40-20 30z', '#D7A86E') + Lc('M56 38v-14M120 38v-14', INK, 4)
      + C(88, 104, 42, '#D7A86E') + P('M46 110l-10 24 24-10zM130 110l10 24-24-10z', '#F3E0C7') + E(88, 126, 18, 12, '#F3E0C7') + E(88, 120, 6, 4, INK) + face(88, 104, 0.6, 'w')) },
  { id: 'cz.transport.tram', cat: 'transport', file: 'cz/transport-tram.v1.svg', name: nm('รถรางปราก', 'Prague tram'), kw: ['tram', 'รถราง', 'prague tram', 'tramvaj', 'route 22', 'transport'], colour: true,
    // a red-and-cream tram with a pantograph on the roof, round headlights, gliding on rails over cobbles
    svg: free(Lc('M20 30l200 0', INK, 3) + Lc('M100 30l20 30 20-30', INK, 3) + R(30, 60, 180, 120, '#FFF8E1', 18) + R(30, 130, 180, 50, '#D7141A', 0) + Lc('M30 130h180', INK, 4) + [0, 1, 2].map((i) => R(48 + i * 52, 76, 40, 40, '#B3E5FC', 6, 3.5)).join('')
      + [[60, 158], [180, 158]].map(([x, y]) => C(x, y, 8, '#FFF59D', 3)).join('') + Lc('M10 196h220M10 212h220', '#90A4AE', 5) + face(120, 158, 0.55)) },
  { id: 'cz.culture.marionette', cat: 'culture', file: 'cz/culture-marionette.v1.svg', name: nm('หุ่นชักไม้', 'Wooden marionette'), kw: ['marionette', 'หุ่นชัก', 'puppet', 'หุ่น', 'puppet theatre', 'ละครหุ่น', 'souvenir'], colour: true,
    // a jointed wooden marionette of a smiling witch-free jester: red hat with a bell, strings to a wooden cross
    svg: free(R(70, 14, 100, 10, '#8D6E63', 3) + R(115, 4, 10, 30, '#8D6E63', 3) + Lc('M76 24l-10 120M164 24l10 120M120 34v44M96 24l-6 160M144 24l6 160', INK, 1.5)
      + C(120, 92, 24, '#FFE0BD') + P('M96 82l24-30 24 30z', '#D7141A') + C(120, 50, 5, '#FFD54A', 3) + R(98, 116, 44, 54, '#11457E', 6) + Lc('M98 140h44', '#FFD54A', 4)
      + [[66, 150], [174, 150]].map(([x, y]) => C(x, y, 8, '#FFE0BD', 3)).join('') + Lc('M98 126l-30 20M142 126l30 20M108 170l-16 20M132 170l16 20', '#11457E', 7) + face(120, 94, 0.45)) },
  // Prague
  { id: 'cz-prague.stamp', cat: 'stamp', file: 'cz/prague/stamp.v1.svg', name: nm('ตราประทับปราก', 'Prague stamp'), kw: ['prague', 'praha', 'ปราก'],
    // the astronomical clock's dial with its zodiac ring and the sun hand
    svg: cityStamp('cpr-st', { name: 'PRAHA', sub: 'ČESKO', ...CZ, emblem: C(100, 96, 34, '#64B5F6') + P('M66 96a34 34 0 0 1 68 0z', '#FFB74D', 0).replace('stroke-width="0"', 'stroke="none"') + C(100, 96, 34, 'none', 3) + C(100, 90, 20, 'none', 2.5) + Lc('M100 96l18-18', '#FFD54A', 4) + C(118, 78, 4, '#FFD54A', 2) + C(100, 96, 4, INK, 0) }) },
  { id: 'cz-prague.day.charlesbridge', cat: 'day', file: 'cz/prague/day-charlesbridge.v1.svg', name: nm('สะพานชาร์ลส์กับปราสาทปราก', 'Charles Bridge and Prague Castle'), kw: ['charles bridge', 'สะพานชาร์ลส์', 'karluv most', 'prague castle', 'ปราสาทปราก', 'vltava', 'แม่น้ำวัลตาวา'],
    // the stone bridge's arches marching across the Vltava, its gothic gate tower, the castle and cathedral spires on the hill
    svg: scene('cpr-d1', '#FFE0B2', P('M-4 110c40-30 100-40 150-30s70 20 98 10v40H-4z', '#7CB342') + R(80, 60, 110, 40, '#ECEFF1') + [96, 130, 164].map((x) => R(x - 4, 64, 8, 16, '#90A4AE', 2, 2.5)).join('') + [[150, 30], [164, 26]].map(([x, y]) => P(`M${x - 6} ${y + 40}v-${40 - 0}l6-20 6 20v40z`, '#546E7A', 3)).join('')
      + R(-4, 140, 248, 14, '#A1887F') + Array.from({ length: 5 }, (_, i) => P(`M${10 + i * 50} 196v-42h40v42c0-22-40-22-40 0z`, '#A1887F')).join('') + R(184, 96, 32, 58, '#5D4037') + P('M178 98l22-26 22 26z', '#37474F')
      + P('M-4 196h248v60H-4z', '#5C7A99') + [50, 90, 130].map((x) => Lc(`M${x} 140v-14`, INK, 3) + C(x, 122, 4, INK, 0)).join('')) },
  { id: 'cz-prague.landmark.orloj', cat: 'landmark', file: 'cz/prague/landmark-orloj.v1.svg', name: nm('นาฬิกาดาราศาสตร์ปราก', 'Prague Astronomical Clock'), kw: ['astronomical clock', 'นาฬิกาดาราศาสตร์', 'orloj', 'old town hall', 'ศาลาว่าการเมืองเก่า', 'old town square', 'apostles'], colour: true, spot: nm('หานาฬิกาที่มีหน้าปัดเป็นวงกลมซ้อนกัน', 'Find the clock with circles inside circles'),
    // the gothic tower face with the big blue-and-gold astronomical dial, the calendar wheel below, two little windows above
    svg: free(R(50, 20, 140, 200, '#B0A08A') + P('M44 24l76-20 76 20z', '#5D4037') + [100, 140].map((x) => R(x - 8, 34, 16, 20, '#FFE082', 3, 3)).join('')
      + C(120, 104, 46, '#64B5F6') + P('M74 104a46 46 0 0 1 92 0z', '#FFB74D') + C(120, 104, 46, 'none') + C(120, 96, 26, 'none', 3) + Lc('M120 104l28-26M120 104l-6 34', '#FFD54A', 5) + C(148, 78, 6, '#FFD54A', 3)
      + C(120, 186, 26, '#FFF8E1') + Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return Lc(`M${(120 + Math.cos(a) * 14).toFixed(1)} ${(186 + Math.sin(a) * 14).toFixed(1)}L${(120 + Math.cos(a) * 26).toFixed(1)} ${(186 + Math.sin(a) * 26).toFixed(1)}`, '#B0A08A', 2); }).join('') + face(120, 186, 0.4)) },
  { id: 'cz-prague.landmark.castle', cat: 'landmark', file: 'cz/prague/landmark-castle.v1.svg', name: nm('ปราสาทปรากกับมหาวิหารเซนต์วิตุส', 'Prague Castle and St Vitus'), kw: ['prague castle', 'ปราสาทปราก', 'st vitus', 'มหาวิหารเซนต์วิตุส', 'hradcany', 'hradčany', 'golden lane'], colour: true, spot: nm('หามหาวิหารยอดแหลมบนเนินปราสาท', 'Find the spiky cathedral above the castle walls'),
    // the long pale castle wall along the hilltop, the spiky gothic cathedral rising out of the middle with its green-capped tower
    svg: free(P('M10 220c20-40 80-60 110-60s90 20 110 60z', '#7CB342') + R(14, 140, 212, 40, '#ECEFF1') + Array.from({ length: 9 }, (_, i) => R(24 + i * 22, 150, 10, 16, '#90A4AE', 2, 2.5)).join('')
      + R(80, 60, 70, 80, '#9E9E9E') + [84, 100, 116, 132, 146].map((x) => P(`M${x - 4} 62l4-24 4 24z`, '#757575', 2.5)).join('') + R(150, 40, 30, 100, '#9E9E9E') + P('M146 42c0-30 38-30 38 0z', '#4DB6AC') + C(115, 92, 12, '#CE93D8', 3) + face(115, 120, 0.45)) },
  { id: 'cz-prague.landmark.roofs', cat: 'landmark', file: 'cz/prague/landmark-roofs.v1.svg', name: nm('หลังคาสีส้มของเมืองเก่า', 'The red roofs of the old town'), kw: ['red roofs', 'หลังคาสีส้ม', 'old town', 'เมืองเก่า', 'tyn church', 'โบสถ์ทีน', 'staromestske namesti', 'view'], colour: true, spot: nm('หาโบสถ์หอคู่ยอดแหลมเหนือหลังคาสีส้ม', 'Find the twin spiky towers over the orange roofs'),
    // a jumble of steep orange-tiled roofs and chimneys, the dark twin towers of Týn church bristling with little spires
    svg: free([[20, 160], [70, 150], [150, 156], [196, 164]].map(([x, y]) => R(x - 2, y, 46, 220 - y, '#FFF3E0') + P(`M${x - 6} ${y + 4}l26-30 26 30z`, '#E64A19') + R(x + 28, y - 30, 6, 16, '#8D6E63', 0, 3) + R(x + 10, y + 20, 14, 14, '#90CAF9', 2, 3)).join('')
      + [98, 136].map((x) => R(x - 14, 50, 28, 120, '#424242') + P(`M${x - 16} 52l16-46 16 46z`, '#424242') + [-12, 12].map((dx) => P(`M${x + dx - 3} 54l3-14 3 14z`, '#424242', 2.5)).join('') + C(x, 6, 3.5, '#FFD54A', 2)).join('') + face(117, 140, 0.45)) },
];
export default {
  places: {
    at: { country: 'at', wave: 1, name: nm('ออสเตรีย', 'Austria'), tz: 'Europe/Vienna', alias: ['austria', 'ออสเตรีย', 'österreich', 'osterreich'], colors: AT },
    'at-vienna': { country: 'at', wave: 1, name: nm('เวียนนา', 'Vienna'), tz: 'Europe/Vienna', ll: [48.21, 16.37], alias: ['vienna', 'wien', 'เวียนนา', 'schönbrunn', 'schonbrunn', 'เชินบรุนน์', 'prater', 'ปราเทอร์', 'stephansplatz', 'belvedere', 'ringstrasse', 'naschmarkt'], colors: AT },
    'at-hallstatt': { country: 'at', wave: 1, name: nm('ฮัลล์สตัทท์', 'Hallstatt'), tz: 'Europe/Vienna', ll: [47.56, 13.65], alias: ['hallstatt', 'ฮัลล์สตัทท์', 'salzkammergut', 'ซาลซ์คัมเมอร์กุท', 'dachstein', 'obertraun', 'gosau', 'st wolfgang'], colors: AT },
    cz: { country: 'cz', wave: 1, name: nm('เช็กเกีย', 'Czechia'), tz: 'Europe/Prague', alias: ['czechia', 'czech republic', 'เช็กเกีย', 'สาธารณรัฐเช็ก', 'česko', 'cesko'], colors: CZ },
    'cz-prague': { country: 'cz', wave: 1, name: nm('ปราก', 'Prague'), tz: 'Europe/Prague', ll: [50.09, 14.42], alias: ['prague', 'praha', 'ปราก', 'charles bridge', 'สะพานชาร์ลส์', 'old town square', 'mala strana', 'malá strana', 'vltava', 'วัลตาวา', 'petrin'], colors: CZ },
  },
  items,
};
