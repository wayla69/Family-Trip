// Wave 16: Wellington (Te Whanganui-a-Tara, + Petone and Lyall Bay) — the windy harbour capital at the foot of the North Island:
// the Beehive, the red cable car up to Kelburn, Te Papa and its colossal squid, the Cuba Street bucket fountain, Zealandia's kākā,
// the fur seals of Red Rocks, the little blue penguins of the south coast, the waterfront jumping platform, planes over Lyall Bay.
// Skipped as repeats or bans: the kiwi and the silver fern (New Zealand's own), the tūī, tuatara, takahē and kākāpō (drawn already),
// the Carter Fountain in Oriental Bay (Geneva's jet), the wind blowing an umbrella inside out (Cape Town's Cape Doctor),
// the Interislander ferry (a brand, and ferries are drawn), Wētā Workshop and the film sets (brands), the City to Sea bridge's
// carvings (sacred objects), the Cenotaph (war), Martinborough's vineyards (wine), a mince-and-cheese pie (Australia's meat pie).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const WG = { k1: '#B71C1C', k2: '#006064', k3: '#FFF3E0' };
const T = 'nz/wellington/';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `nz-wellington.landmark.${slug}`, cat: 'landmark', file: `${T}landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// little sea ripples
const rip = (pts, c = '#E1F5FE') => Lc(pts.map(([x, y]) => `M${x} ${y}c8-4 16 4 24 0`).join(''), c, 3.5);
// a little house on the hills: white wall, coloured roof
const hut = (x, y, c, s = 1) => g(x, y, s, R(-7, -5, 14, 10, '#FFFFFF', 0, 2.5) + P('M-9-5l9-7 9 7z', c, 2.5));
// the red cable car (centre x, y; tilted on its slope)
const car = (x, y, s, rot, fc) => g(x, y, s, R(-34, -22, 68, 40, '#E53935', 7) + R(-30, -30, 60, 10, '#7F1D1D', 4) + R(-26, -14, 14, 14, '#FFFFFF', 2, 3) + R(-7, -14, 14, 14, '#FFFFFF', 2, 3) + R(12, -14, 14, 14, '#FFFFFF', 2, 3)
  + Lc('M-30 10h60', '#FFCDD2', 3) + C(-20, 20, 6, '#455A64', 3) + C(20, 20, 6, '#455A64', 3) + (fc ? face(0, 4, 0.26, 'none') : ''), rot);

// one bucket of the fountain: a tapered pail with a rim and a wire handle (upright before rotation)
const BK = (c) => Lc('M-20-12c0-22 40-22 40 0', '#78909C', 3) + P('M-20-12h40l-6 30h-28z', c) + E(0, -12, 20, 5, '#B3E5FC', 3) + Lc('M-16 4h32', '#FFFFFF', 3);

const items = [
  { id: 'nz-wellington.stamp', cat: 'stamp', file: T + 'stamp.v1.svg', name: nm('ตราประทับเวลลิงตัน', 'Wellington stamp'), kw: ['wellington', 'เวลลิงตัน', 'the beehive', 'บีไฮฟ์', 'capital of new zealand', 'เมืองหลวงของนิวซีแลนด์', 'windy wellington', 'เมืองลมแรง', 'harbour', 'อ่าว'],
    // the round, tiered Beehive building with its domed top in front of the green hills, the harbour water below
    svg: cityStamp('wlg-st', { name: 'WELLINGTON', sub: 'NEW ZEALAND', ...WG, emblem: P('M48 104c14-26 30-34 52-30 20-12 40-4 52 30z', '#A5D6A7', 0) + hut(62, 92, '#E53935', 0.8) + hut(140, 90, '#1E88E5', 0.8)
      + P('M48 120h104a52 52 0 0 1-104 0z', '#90CAF9', 0) + R(66, 110, 68, 12, '#D7CCC8', 3) + R(72, 98, 56, 12, '#FFFFFF', 4) + Lc('M76 104h48', '#6D4C41', 4) + R(78, 86, 44, 12, '#FFFFFF', 4) + Lc('M82 92h36', '#6D4C41', 3.5)
      + R(84, 76, 32, 10, '#FFFFFF', 3) + P('M86 76q14-18 28 0z', '#B0BEC5') + Lc('M60 134h14M124 140h16', '#E3F2FD', 2.5) + face(100, 115, 0.26, 'none') }) },
  { id: 'nz-wellington.day.harbour', cat: 'day', file: T + 'day-harbour.v1.svg', name: nm('อ่าวเวลลิงตันมองจากภูเขาวิกตอเรีย', 'Wellington Harbour from Mount Victoria'), kw: ['wellington', 'เวลลิงตัน', 'wellington harbour', 'อ่าวเวลลิงตัน', 'mount victoria', 'ภูเขาวิกตอเรีย', 'lookout', 'จุดชมวิว', 'city by the sea', 'เมืองริมทะเล', 'houses on the hills', 'บ้านบนเนินเขา', 'waterfront', 'ริมน้ำ'],
    // seen from the lookout on Mount Victoria: a round blue harbour ringed by green hills dotted with little houses, the city's towers on the shore, a boat crossing, the sun over the far hills
    svg: scene('wlg-d1', '#BBDEFB', C(60, 54, 16, '#FFE082', 0) + P('M-4 96c30-22 70-26 104-12 34-20 90-22 148 0v40H-4z', '#81C784') + P('M-4 120c60-14 190-14 248 0v54H-4z', '#4FC3F7')
      + [[20, 104, '#E53935'], [44, 96, '#1E88E5'], [190, 96, '#FFB300'], [214, 104, '#8E24AA'], [168, 102, '#E53935']].map(([x, y, c]) => hut(x, y, c, 1)).join('')
      + [[34, 150, 20, 30, '#B0BEC5'], [56, 140, 16, 40, '#CFD8DC'], [74, 130, 18, 50, '#90A4AE'], [94, 146, 14, 34, '#ECEFF1'], [110, 138, 16, 42, '#B0BEC5']].map(([x, y, w, h, c]) => R(x, y, w, h, c, 2, 3)).join('')
      + Lc('M38 158h12M60 150h8M60 162h8M78 142h10M78 156h10M114 150h8', '#ECEFF1', 2.5) + R(130, 164, 22, 16, '#FFFFFF', 3, 3) + P('M132 164q9-12 18 0z', '#B0BEC5', 3)
      + P('M146 132h40l-6 10h-30z', '#FFFFFF', 3) + R(156, 124, 16, 8, '#FFCA28', 2, 3) + rip([[176, 150], [20, 128], [196, 132]])
      + P('M-4 180c50-12 100-6 140 6s80 10 108 0v70H-4z', '#66BB6A') + Lc('M120 196h84M128 196v14M150 196v14M174 196v14M198 196v14', '#8D6E63', 4) + face(70, 214, 0.36)) },
  { id: 'nz-wellington.day.cablecar', cat: 'day', file: T + 'day-cablecar.v1.svg', name: nm('รถรางเคเบิลสีแดงขึ้นเนินไปเคลเบิร์น', 'The red cable car climbing to Kelburn'), kw: ['wellington cable car', 'รถรางเคเบิลเวลลิงตัน', 'cable car', 'รถรางเคเบิล', 'kelburn', 'เคลเบิร์น', 'lambton quay', 'แลมบ์ตันคีย์', 'botanic garden', 'สวนพฤกษศาสตร์', 'steep hill', 'เนินชัน', 'wellington', 'เวลลิงตัน'],
    // a steep green hill rising to the right with a straight track up it, the little red cable car smiling halfway up, trees and houses beside it, the city's towers and the harbour far below on the left
    svg: scene('wlg-d2', '#E3F2FD', C(196, 50, 14, '#FFF59D', 0) + P('M-4 150h120v100H-4z', '#4FC3F7') + [[8, 120, 16, 34], [28, 108, 18, 46], [50, 124, 14, 30], [68, 114, 16, 40]].map(([x, y, w, h]) => R(x, y, w, h, '#B0BEC5', 2, 3)).join('')
      + P('M-4 250L-4 214 244 64v186z', '#81C784') + Lc('M10 230L244 88', '#6D4C41', 5) + Lc('M22 240L244 104', '#6D4C41', 5) + Lc('M60 214l8 12M100 190l8 12M140 166l8 12M180 142l8 12M220 118l8 12', '#8D6E63', 3)
      + car(128, 164, 1, -31, true) + C(196, 168, 16, '#43A047') + C(214, 186, 12, '#388E3C') + C(70, 236, 14, '#43A047') + hut(208, 128, '#FFB300', 1.1) + hut(176, 206, '#1E88E5', 1.1) + hut(228, 160, '#E53935', 1)
      + rip([[10, 176], [50, 196], [20, 214]])) },

  L('beehive', 'ตึกบีไฮฟ์ รัฐสภาของนิวซีแลนด์', 'The Beehive, New Zealand’s round parliament building', ['the beehive', 'ตึกบีไฮฟ์', 'parliament', 'รัฐสภา', 'parliament buildings', 'อาคารรัฐสภา', 'round building', 'ตึกทรงกลม', 'beehive shape', 'รูปรังผึ้ง', 'capital city', 'เมืองหลวง'], 'หาโดมเล็กๆ บนยอดตึกที่เหมือนรังผึ้ง', 'Find the little dome on top of the beehive building',
    // a round building of stacked white rings that get smaller towards the top, a dark band of windows round each ring, a grey dome on top, steps in front and two round trees
    bg('#E3F2FD') + low(188, '#A5D6A7') + frame + C(40, 158, 18, '#66BB6A') + C(200, 158, 18, '#66BB6A') + R(36, 172, 168, 18, '#D7CCC8', 4) + Lc('M48 180h144', '#BCAAA4', 3)
      + R(50, 140, 140, 32, '#FAFAFA', 6) + Lc('M58 156h124', '#5D4037', 8) + Lc('M70 151v10M90 151v10M110 151v10M130 151v10M150 151v10M170 151v10', '#A1887F', 2)
      + R(62, 112, 116, 28, '#FFFFFF', 6) + Lc('M70 126h100', '#5D4037', 7) + R(74, 88, 92, 24, '#FFFFFF', 6) + Lc('M82 100h76', '#5D4037', 6)
      + R(86, 68, 68, 20, '#FFFFFF', 5) + Lc('M94 78h52', '#5D4037', 5) + P('M90 68q30-34 60 0z', '#B0BEC5') + Lc('M120 34v-8', INK, 3) + face(120, 178, 0.34)),
  L('tepapa', 'พิพิธภัณฑ์เตปาปาริมอ่าว', 'Te Papa, the national museum on the waterfront', ['te papa', 'เตปาปา', 'te papa tongarewa', 'เตปาปาทงกาเรวา', 'national museum', 'พิพิธภัณฑ์แห่งชาติ', 'museum of new zealand', 'พิพิธภัณฑ์นิวซีแลนด์', 'waterfront', 'ริมน้ำ'], 'หากำแพงหินสีน้ำตาลที่เอียงอยู่ข้างตึก', 'Find the sloping brown stone wall on the side',
    // a big modern museum by the water: a long grey block, a blue glass wing with a grid of panes, a tall sloping wall of brown stone at the end, a boardwalk with railings over the harbour
    bg('#E1F5FE') + low(172, '#4FC3F7') + frame + R(30, 74, 110, 22, '#CFD8DC', 3) + R(26, 94, 140, 70, '#ECEFF1')
      + R(36, 104, 72, 52, '#81D4FA', 2) + Lc('M54 104v52M72 104v52M90 104v52M36 122h72M36 140h72', '#E1F5FE', 2.5)
      + P('M140 164l22-118h48v118z', '#A1887F') + Lc('M158 70h46M154 92h50M150 114h54M146 136h58', '#8D6E63', 3) + R(118, 128, 22, 36, '#5D4037', 2, 3)
      + R(20, 164, 200, 10, '#BCAAA4', 0, 3) + Lc('M30 164v-10M60 164v-10M90 164v-10M30 154h70', '#8D6E63', 3) + rip([[40, 196], [150, 202], [96, 214]]) + face(184, 104, 0.4)),
  L('colossalsquid', 'หมึกยักษ์โคลอสซัลที่พิพิธภัณฑ์เตปาปา', 'The colossal squid at Te Papa', ['colossal squid', 'หมึกยักษ์โคลอสซัล', 'giant squid', 'หมึกยักษ์', 'te papa', 'เตปาปา', 'deep sea', 'ทะเลลึก', 'museum tank', 'ตู้กระจกในพิพิธภัณฑ์', 'sea creature', 'สัตว์ทะเล'], 'หาหนวดยาวสองเส้นที่ยาวกว่าเส้นอื่น', 'Find the two arms that are longer than the rest',
    // a huge friendly pink squid floating in a tall glass tank of pale blue water, big fins on its head, eight curly arms and two long ones reaching to the floor, bubbles rising
    R(30, 30, 180, 166, '#B3E5FC', 14) + Lc('M44 60v100', '#E1F5FE', 4) + R(22, 192, 196, 18, '#90A4AE', 5)
      + P('M84 56l-22 18 24 8zM156 56l22 18-24 8z', '#F48FB1') + P('M120 40c24 0 36 30 36 62v28H84v-28c0-32 12-62 36-62z', '#EF9A9A')
      + ol('M92 130c-18 14-24 30-10 44', '#EF9A9A', 7) + ol('M104 132c-8 18-8 32 4 40', '#EF9A9A', 7) + ol('M136 132c8 18 8 32-4 40', '#EF9A9A', 7) + ol('M148 130c18 14 24 30 10 44', '#EF9A9A', 7)
      + ol('M114 132c-4 24-14 40-34 58', '#F48FB1', 5) + ol('M126 132c4 24 14 40 34 58', '#F48FB1', 5)
      + [[52, 90, 5], [190, 70, 6], [182, 130, 4], [60, 150, 4]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2.5)).join('') + face(120, 106, 0.52)),
  L('bucketfountain', 'น้ำพุถังน้ำบนถนนคิวบา', 'The bucket fountain on Cuba Street', ['bucket fountain', 'น้ำพุถังน้ำ', 'cuba street', 'ถนนคิวบา', 'cuba mall', 'คิวบามอลล์', 'splashing buckets', 'ถังน้ำเทน้ำ', 'kinetic sculpture', 'ประติมากรรมเคลื่อนไหว', 'street art', 'ศิลปะริมถนน'], 'หาถังสีแดงที่กำลังเทน้ำลงมา', 'Find the red bucket tipping its water out',
    // a pole holding colourful buckets at different heights, each tipping water into the one below and the last one splashing into a round pool, drops flying everywhere
    E(120, 204, 86, 18, '#BDBDBD') + E(120, 198, 76, 12, '#4FC3F7') + Lc('M120 198V36', INK, 10) + Lc('M120 198V36', '#78909C', 5)
      + ol('M100 72c-4 14-2 28 4 40', '#81D4FA', 5) + ol('M146 100c4 14 2 28-6 42', '#81D4FA', 5) + ol('M96 132c-2 16 4 36 14 56', '#81D4FA', 5)
      + g(94, 58, 1, BK('#FFCA28'), -24) + g(148, 90, 1, BK('#EF5350'), 26) + g(92, 124, 1, BK('#66BB6A'), -20) + g(146, 156, 1.1, BK('#42A5F5'), 16)
      + [[72, 186], [168, 184], [86, 172], [154, 176], [60, 196], [180, 200]].map(([x, y]) => C(x, y, 4, '#B3E5FC', 2)).join('') + face(148, 90, 0.3)),
  L('kaka', 'นกแก้วกาก้าที่ซีแลนเดีย', 'A kākā parrot at Zealandia', ['kaka', 'นกแก้วกาก้า', 'kākā', 'zealandia', 'ซีแลนเดีย', 'ecosanctuary', 'เขตอนุรักษ์ธรรมชาติ', 'native parrot', 'นกแก้วพื้นเมือง', 'forest bird', 'นกป่า', 'orange feathers', 'ขนสีส้ม'], 'หาขนสีส้มใต้ปีกของนกแก้ว', 'Find the orange feathers under the parrot’s wing',
    // a chubby olive-brown forest parrot on a branch with a pale grey cap, a big curved grey beak, orange cheeks and an orange-red belly, one wing lifted to show orange underneath, green leaves around
    Lc('M24 196c50-10 120-14 196-4', '#6D4C41', 10) + P('M40 194c-10-18-4-34 10-40 4 14 0 28-10 40zM200 190c12-16 10-32-2-40-6 12-4 28 2 40z', '#43A047', 3)
      + P('M104 200l-10 18 22-6z', '#5D4037') + P('M116 96c30 4 44 30 40 64-4 26-20 38-40 38s-38-16-38-46c0-34 12-58 38-56z', '#8D7B4A')
      + P('M88 150c6 24 18 38 32 40 14-2 24-14 26-34-14 6-36 4-58-6z', '#E65100') + P('M150 112c22 0 40 18 44 44-18-4-34-14-44-30z', '#FF7043')
      + C(112, 84, 30, '#8D7B4A') + P('M84 78c4-20 18-30 30-30 16 0 28 12 28 26-18-8-38-6-58 4z', '#CFD8DC') + E(100, 98, 8, 5, '#FF8A65', 0)
      + P('M86 88c-18-2-26 10-22 26 6-8 12-10 20-8z', '#616161') + C(96, 196, 5, '#5D4037', 2.5) + C(130, 196, 5, '#5D4037', 2.5) + face(114, 86, 0.38, 'none')),
  L('redrocks', 'แมวน้ำขนที่หาดเรดร็อกส์', 'Fur seals resting at Red Rocks', ['red rocks', 'เรดร็อกส์', 'pariwhero', 'ปาริฟีโร', 'fur seal', 'แมวน้ำขน', 'kekeno', 'เคเคโน', 'south coast', 'ชายฝั่งทางใต้', 'coastal walk', 'ทางเดินเลียบชายฝั่ง', 'sea lion rocks', 'โขดหินริมทะเล'], 'หาแมวน้ำที่ยกครีบขึ้นมาโบกมือ', 'Find the seal waving a flipper',
    // two plump brown fur seals lying on rust-red rocks by the sea, one lifting a flipper to wave, waves breaking white around the rocks
    bg('#E1F5FE') + low(130, '#4FC3F7') + frame + P('M16 170c20-26 50-34 80-22 26-18 64-20 92-4 18 4 32 14 36 26v24a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#C0563F')
      + P('M40 160c16-10 30-12 44-6M150 146c14-6 30-6 44 2', 'none', 3) + Lc('M60 200c10-8 24-8 36 0M150 196c12-8 26-6 36 2', '#E07B5F', 4)
      + E(84, 146, 40, 16, '#8D7B6E') + C(54, 132, 15, '#9E8C7E') + E(42, 136, 6, 4, '#6D5D52', 2.5) + P('M108 152l20 6-18 6z', '#6D5D52', 3)
      + E(164, 136, 36, 15, '#7E6B5E') + C(192, 122, 14, '#8D7B6E') + P('M150 126c-8-18-2-30 10-34-2 12-4 22-10 34z', '#6D5D52', 3)
      + Lc('M24 128c8-6 16-6 24 0M110 126c8-6 16-6 24 0', '#FFFFFF', 4) + face(56, 130, 0.3) + face(190, 120, 0.28)),
  L('korora', 'นกเพนกวินน้อยสีฟ้ากับบ้านไม้ริมฝั่ง', 'A little blue penguin and its nest box by the shore', ['little blue penguin', 'นกเพนกวินน้อยสีฟ้า', 'korora', 'โคโรรา', 'kororā', 'smallest penguin', 'เพนกวินที่ตัวเล็กที่สุด', 'nest box', 'บ้านรังไม้', 'south coast', 'ชายฝั่งทางใต้', 'seashore', 'ชายหาด'], 'หาประตูกลมของบ้านไม้ของเพนกวิน', 'Find the round door of the penguin’s wooden house',
    // a tiny penguin with a slate-blue back and a white tummy standing on the sand, flippers out, beside a little wooden nest box with a pointed roof and a round doorway, tussock grass and shells
    bg('#E8F5E9') + low(176, '#FFE0B2') + frame + R(130, 116, 74, 60, '#BCAAA4', 3) + P('M124 118l43-34 43 34z', '#8D6E63') + C(167, 148, 14, '#4E342E') + Lc('M136 128h62', '#A1887F', 2.5)
      + P('M30 176c4-20 8-30 12-36M40 176c0-18 6-28 10-32M50 176c2-16 0-24-2-30', 'none', 3) + Lc('M30 176c4-20 8-30 12-36M40 176c0-18 6-28 10-32M50 176c2-16 0-24-2-30', '#9CCC65', 3)
      + E(86, 146, 30, 42, '#5C8DC9') + E(90, 154, 20, 32, '#FFFFFF') + C(86, 100, 22, '#5C8DC9') + P('M64 136c-14 8-18 20-14 30 8-6 12-14 14-22zM110 136c14 8 18 20 14 30-8-6-12-14-14-22z', '#4A75AE', 3)
      + P('M100 104l14 4-14 4z', '#424242', 2.5) + E(76, 188, 9, 4, '#F8BBD0', 2.5) + E(98, 188, 9, 4, '#F8BBD0', 2.5) + E(190, 196, 8, 5, '#FFFFFF', 2.5) + face(86, 98, 0.34, 'none')),
  L('jumpplatform', 'แท่นกระโดดน้ำริมท่าเรือ', 'The jumping platform on the waterfront', ['jumping platform', 'แท่นกระโดดน้ำ', 'taranaki street wharf', 'ท่าเรือถนนทารานากิ', 'jump into the harbour', 'กระโดดลงอ่าว', 'diving steps', 'ขั้นบันไดกระโดดน้ำ', 'summer swim', 'ว่ายน้ำหน้าร้อน', 'waterfront', 'ริมน้ำ'], 'หาเด็กที่กำลังลอยกลางอากาศ', 'Find the child flying through the air',
    // a stepped grey platform of three levels on the edge of a wooden wharf, a child leaping off the top with arms up towards the blue harbour, a big splash below, a gull overhead
    bg('#E1F5FE') + low(154, '#29B6F6') + frame + R(16, 144, 64, 16, '#A1887F', 0, 4) + Lc('M30 160v34M60 160v34', '#6D4C41', 5)
      + P('M68 154V126h26V104h24V80h18v74z', '#CFD8DC') + Lc('M68 126h26M94 104h24M118 80h18', '#ECEFF1', 3) + Lc('M126 80V58', INK, 3) + R(120, 50, 16, 10, '#FFCA28', 2, 2.5)
      + ol('M162 80l-8-16M178 80l8-16', '#F1C9A5', 4) + C(170, 62, 10, '#F1C9A5') + R(160, 74, 20, 22, '#FF7043', 6) + ol('M164 96l-6 16M176 96l6 16', '#F1C9A5', 4) + face(170, 62, 0.22)
      + P('M150 168c4-14 10-18 14-8 4-14 10-14 14 0 4-10 10-8 12 6z', '#FFFFFF') + [[146, 152], [192, 150], [170, 142]].map(([x, y]) => C(x, y, 4, '#E1F5FE', 2)).join('')
      + Lc('M190 34q8-8 14 0q6-8 14 0', INK, 3) + rip([[30, 200], [100, 212], [176, 200]])),
  L('lyallbay', 'เครื่องบินบินลงเหนือหาดไลออลเบย์', 'A plane coming in to land over Lyall Bay', ['lyall bay', 'ไลออลเบย์', 'plane landing', 'เครื่องบินกำลังลงจอด', 'wellington airport', 'สนามบินเวลลิงตัน', 'surf beach', 'หาดโต้คลื่น', 'surfing', 'โต้คลื่น', 'plane spotting', 'ดูเครื่องบิน'], 'หาล้อเครื่องบินที่กางออกมาแล้ว', 'Find the plane’s wheels already down',
    // a smiling white plane with a blue tail gliding low over the beach with its wheels down, a curling blue wave with a child on a yellow surfboard below, the sand at the front
    bg('#BBDEFB') + low(132, '#4FC3F7') + low(192, '#FFE0B2') + frame
      + g(124, 74, 1, P('M-10 0l-26 30h16l30-26zM-10-4l-26-22h14l26 18z', '#90CAF9') + E(0, 0, 66, 14, '#FFFFFF') + P('M-56-4l-14-28h14l16 24z', '#1E88E5') + P('M60-4c6 2 8 6 6 10l-10-2z', '#90CAF9')
        + Lc('M-30-3h4M-18-3h4M-6-3h4M6-3h4M18-3h4', '#1E88E5', 3) + Lc('M14 14v8M-16 14v8', INK, 3) + C(14, 24, 4, '#455A64', 2) + C(-16, 24, 4, '#455A64', 2) + face(40, 2, 0.24, 'none'), -6)
      + P('M30 176c10-30 40-46 70-40 22 4 30 20 24 34-8-12-20-16-30-10 14 4 18 14 16 22z', '#29B6F6') + Lc('M44 160c12-16 34-24 54-20', '#FFFFFF', 4)
      + g(150, 166, 1, E(0, 10, 30, 6, '#FFCA28') + C(0, -14, 8, '#F1C9A5') + R(-8, -6, 16, 14, '#E53935', 5) + ol('M-6 2l-14 6M6 2l14-6', '#F1C9A5', 3) + face(0, -14, 0.18), -8)
      + rip([[170, 140], [190, 160]], '#FFFFFF')),
  L('spaceplace', 'โดมดูดาวของหอดูดาวคาร์เตอร์', 'The star-watching dome of Carter Observatory', ['space place', 'สเปซเพลซ', 'carter observatory', 'หอดูดาวคาร์เตอร์', 'telescope', 'กล้องโทรทรรศน์', 'stargazing', 'ดูดาว', 'night sky', 'ท้องฟ้ายามค่ำคืน', 'planetarium', 'ท้องฟ้าจำลอง'], 'หากล้องโทรทรรศน์ที่โผล่ออกมาจากโดม', 'Find the telescope peeking out of the dome',
    // at night in the botanic garden: a white round dome with an open slit and a telescope pointing out at the stars, a low white building under it, dark trees, a crescent moon and twinkling stars
    bg('#283593') + low(176, '#2E7D32') + frame + P('M190 52a16 16 0 1 0 12 26 14 14 0 1 1-12-26z', '#FFF59D', 3)
      + [[44, 50], [76, 34], [150, 40], [60, 80], [200, 110], [34, 110], [120, 26]].map(([x, y], k) => C(x, y, k % 2 ? 3 : 4.5, '#FFF59D', 0)).join('')
      + C(40, 160, 20, '#1B5E20') + C(204, 158, 18, '#1B5E20') + R(56, 136, 128, 42, '#ECEFF1', 4) + R(100, 152, 40, 26, '#5D4037', 3, 3) + R(68, 148, 20, 14, '#FFF59D', 2, 3) + R(152, 148, 20, 14, '#FFF59D', 2, 3)
      + P('M72 136a48 48 0 0 1 96 0z', '#FFFFFF') + P('M112 90h16l4 46h-24z', '#37474F', 3) + g(122, 104, 1, R(-6, -30, 12, 34, '#90A4AE', 3) + R(-8, -36, 16, 8, '#607D8B', 2), 28)
      + face(120, 122, 0.3)),
  L('oldgovt', 'อาคารรัฐบาลเก่า ตึกไม้หลังใหญ่', 'The Old Government Buildings, all made of wood', ['old government buildings', 'อาคารรัฐบาลเก่า', 'wooden building', 'อาคารไม้', 'big timber building', 'ตึกไม้หลังใหญ่', 'lambton quay', 'แลมบ์ตันคีย์', 'historic building', 'อาคารประวัติศาสตร์', 'weatherboards', 'ผนังไม้ซ้อน'], 'หาจั่วสามเหลี่ยมตรงกลางหลังคา', 'Find the triangle gable in the middle of the roof',
    // a long two-storey cream building of wooden boards that looks like stone, rows of tall windows, columns at the porch, a triangle gable in the middle and a red-brown roof, a lawn in front
    bg('#E3F2FD') + low(190, '#A5D6A7') + frame + P('M20 100l20-22h160l20 22z', '#8D6E63') + P('M96 80l24-24 24 24z', '#F5E6C8') + C(120, 70, 5, '#FFFFFF', 2.5)
      + R(26, 100, 188, 86, '#F5E6C8') + Lc('M26 128h188M26 156h188', '#E0CBA0', 2.5)
      + [36, 54, 72, 150, 168, 186].map((x) => R(x, 108, 12, 16, '#90CAF9', 1, 2.5) + R(x, 134, 12, 18, '#90CAF9', 1, 2.5)).join('')
      + R(94, 100, 52, 86, '#FFF8E1') + Lc('M100 100v86M140 100v86', '#E0CBA0', 4) + P('M110 186v-26q10-14 20 0v26z', '#6D4C41') + face(120, 126, 0.34)),
  L('petone', 'ท่าเทียบเรือไม้ยาวที่พีโทนี', 'The long wooden wharf at Petone', ['petone wharf', 'ท่าเทียบเรือพีโทนี', 'petone', 'พีโทนี', 'petone beach', 'หาดพีโทนี', 'fishing off the wharf', 'ตกปลาบนท่าเรือ', 'wooden pier', 'สะพานไม้ยื่นลงทะเล', 'seagull', 'นกนางนวล'], 'หาทุ่นสีแดงที่ลอยอยู่ปลายสายเบ็ด', 'Find the red float at the end of the fishing line',
    // a long wooden wharf on thin posts running out over calm water with a little shelter at its end, a child sitting on the edge with a fishing rod, a red float bobbing, the city's hills across the harbour, a gull
    bg('#FFF3E0') + C(184, 54, 18, '#FFCC80', 0) + P('M16 130c30-16 70-22 110-14 40-12 76-10 98 2v12H16z', '#90A4AE', 0) + low(130, '#4FC3F7') + frame
      + R(16, 140, 200, 12, '#A1887F', 0, 4) + Lc('M36 152v40M76 152v36M116 152v32M156 152v28M196 152v24', '#6D4C41', 5) + R(180, 112, 30, 28, '#FFFFFF', 0, 3) + P('M176 114l19-14 19 14z', '#E53935', 3)
      + C(82, 108, 10, '#F1C9A5') + R(72, 118, 20, 22, '#1E88E5', 6) + ol('M84 124l10 10', '#F1C9A5', 4) + ol('M76 140v14M88 140v14', '#1E88E5', 5) + face(82, 108, 0.22)
      + ol('M94 132l46-50', '#6D4C41', 3) + Lc('M140 82c4 30 6 60 4 92', '#90A4AE', 1.5) + C(144, 176, 6, '#E53935', 2.5) + Lc('M140 176h-12M150 176h12', '#E1F5FE', 3)
      + Lc('M40 64q8-8 14 0q6-8 14 0', INK, 3) + rip([[40, 204], [130, 198], [86, 214]])),
  L('kereru', 'นกเขาเคเรรูสีเขียวเหลือบม่วง', 'A kererū, the big green wood pigeon', ['kereru', 'นกเขาเคเรรู', 'kererū', 'wood pigeon', 'นกพิราบป่า', 'new zealand pigeon', 'นกพิราบนิวซีแลนด์', 'botanic garden', 'สวนพฤกษศาสตร์', 'forest bird', 'นกป่า', 'berries', 'ผลเบอร์รี'], 'หาลูกเบอร์รีสีส้มบนกิ่งไม้', 'Find the orange berries on the branch',
    // a plump pigeon with a shiny green head and back, a purple-bronze neck, a big round white tummy and a red beak and feet, perched on a branch with bunches of orange berries
    Lc('M20 186c60-8 130-10 200-2', '#6D4C41', 10) + [[44, 196], [56, 200], [50, 208], [188, 196], [200, 202], [194, 210]].map(([x, y]) => C(x, y, 7, '#FF9800', 2.5)).join('')
      + P('M100 176l-26 30 34-14z', '#2E7D32') + E(120, 132, 52, 56, '#FFFFFF') + P('M68 128c-2-40 20-64 46-66 20-2 34 10 38 26-30-6-58 10-84 40z', '#7E57C2')
      + C(118, 72, 26, '#43A047') + P('M68 120c10 30 26 50 46 58-30 2-50-18-46-58z', '#388E3C') + P('M144 66l18 6-18 8z', '#E53935', 3)
      + Lc('M108 184v10M132 184v10', '#E53935', 5) + face(122, 70, 0.4, 'none')),
  L('fluffy', 'ฟลัฟฟี นมฟองนุ่มกับมาร์ชเมลโลว์', 'A fluffy, warm milk froth with marshmallows', ['fluffy', 'ฟลัฟฟี', 'babyccino', 'เบบี้ชิโน', 'milk froth', 'ฟองนม', 'marshmallows', 'มาร์ชเมลโลว์', 'cafe', 'คาเฟ่', 'cafe city', 'เมืองคาเฟ่', 'kids drink', 'เครื่องดื่มของเด็ก'], 'หามาร์ชเมลโลว์สีชมพูบนจานรอง', 'Find the pink marshmallow on the saucer',
    // a little cup of white milk froth piled into a soft cloud and dusted with chocolate, on a saucer with a pink and a white marshmallow and a tiny spoon
    E(120, 196, 84, 16, '#FFFFFF') + E(120, 194, 62, 10, '#E1F5FE', 0) + P('M70 116h100l-12 74H82z', '#FFFFFF') + Lc('M76 142h88', '#4FC3F7', 5) + ol('M168 130c22 0 22 30 0 30', '#FFFFFF', 6)
      + P('M66 118c-6-16 10-28 22-20 2-16 26-20 32-6 10-12 32-6 32 8 14-2 22 12 14 18z', '#FFFDF5') + [[90, 106], [110, 100], [130, 104], [150, 110], [100, 114], [138, 116]].map(([x, y]) => C(x, y, 2.5, '#6D4C41', 0)).join('')
      + R(44, 182, 22, 16, '#F8BBD0', 6) + R(172, 182, 22, 16, '#FFFFFF', 6) + Lc('M150 200l34-6', '#B0BEC5', 4) + face(120, 162, 0.36)),
  L('chocolatefish', 'ปลาช็อกโกแลตไส้มาร์ชเมลโลว์', 'A chocolate fish, marshmallow dipped in chocolate', ['chocolate fish', 'ปลาช็อกโกแลต', 'marshmallow fish', 'ปลามาร์ชเมลโลว์', 'kiwi treat', 'ขนมของชาวกีวี', 'reward', 'รางวัลเด็กดี', 'pink marshmallow', 'มาร์ชเมลโลว์สีชมพู', 'sweet', 'ขนมหวาน'], 'หาไส้สีชมพูในชิ้นที่หักครึ่ง', 'Find the pink inside of the broken half',
    // a plump fish made of chocolate with wavy ripples along its back and a little tail, smiling, and a broken half in front showing the soft pink marshmallow inside
    P('M30 110c16-34 70-50 116-28l40-26-8 46 10 46-42-24c-46 22-100 8-116-14z', '#6D4C41') + Lc('M60 96c10-6 20 6 30 0s20 6 30 0 20 6 26 2', '#8D6E63', 4)
      + Lc('M150 84c-4 16-4 30 0 44', '#5D4037', 3) + P('M70 140c16 6 40 6 56 0', 'none', 3)
      + g(144, 178, 1, P('M-30-16c18-6 38-4 50 6l22-14-4 26 6 26-24-14c-14 10-32 10-50 4z', '#6D4C41') + P('M-30-16l7 6-7 6 7 6-7 6 7 6-7 6c-6-2-10-10-10-18s4-16 10-18z', '#F8BBD0')
        + Lc('M-14-6c6-4 12 4 18 0', '#8D6E63', 3), -6) + face(76, 108, 0.4)),
  L('pikelets', 'พิกเลต แพนเค้กชิ้นเล็กกับแยมและครีม', 'Pikelets, little pancakes with jam and cream', ['pikelets', 'พิกเลต', 'little pancakes', 'แพนเค้กชิ้นเล็ก', 'jam and cream', 'แยมและครีม', 'morning tea', 'ของว่างยามสาย', 'kiwi baking', 'ขนมอบของชาวกีวี', 'afternoon tea', 'น้ำชายามบ่าย'], 'หาแยมสีแดงบนแพนเค้กชิ้นบนสุด', 'Find the red jam on the top pancake',
    // a stack of three small golden pancakes on a blue plate, a blob of whipped cream and red jam on top, two more pikelets beside it, one with a pat of butter
    E(120, 190, 96, 22, '#90CAF9') + E(120, 186, 80, 16, '#E3F2FD', 0) + E(74, 176, 26, 9, '#E8A94E') + E(70, 172, 22, 7, '#F6C26B', 0) + R(64, 164, 14, 8, '#FFF59D', 2, 2.5)
      + E(176, 178, 26, 9, '#E8A94E') + E(172, 174, 22, 7, '#F6C26B', 0)
      + E(120, 168, 40, 12, '#E8A94E') + E(120, 150, 40, 12, '#EDB45A') + E(120, 132, 40, 12, '#F2BE65') + E(120, 128, 34, 8, '#F8CF82', 0)
      + P('M98 124c-2-14 10-20 18-14 6-10 22-6 22 6 6 4 4 10-2 12z', '#FFFDF5') + P('M110 112c0-10 10-16 18-10 4 6 0 12-6 12z', '#E53935') + face(120, 150, 0.3)),
  L('afghan', 'คุกกี้อัฟกันช็อกโกแลตหน้าวอลนัต', 'An Afghan biscuit with chocolate icing and a walnut', ['afghan biscuit', 'คุกกี้อัฟกัน', 'chocolate biscuit', 'คุกกี้ช็อกโกแลต', 'cornflakes', 'คอร์นเฟลก', 'walnut', 'วอลนัต', 'kiwi baking', 'ขนมอบของชาวกีวี', 'cafe treat', 'ขนมในคาเฟ่'], 'หาวอลนัตครึ่งซีกบนหน้าคุกกี้', 'Find the walnut half on top of the biscuit',
    // a big round crunchy chocolate biscuit with cornflake bumps round its edge, a thick glossy cap of chocolate icing and half a walnut on top, crumbs beside it
    E(120, 200, 78, 12, '#ECEFF1', 0) + C(120, 140, 66, '#A1704A')
      + Array.from({ length: 14 }, (_, k) => { const a = k * Math.PI / 7; return C(120 + 62 * Math.cos(a), 140 + 62 * Math.sin(a), 8, '#C08B5C', 3); }).join('')
      + P('M70 130c0-30 24-46 50-46s52 16 50 46c-4 16-26 22-50 22s-48-6-50-22z', '#6D4C41') + Lc('M84 110c10-12 24-16 36-16', '#A1887F', 4)
      + E(122, 92, 22, 14, '#C8A165') + Lc('M104 92c6-4 12 4 18 0s12 4 18 0M122 80v24', '#A1887F', 2.5) + C(46, 204, 4, '#8D6E63', 2) + C(196, 202, 5, '#8D6E63', 2) + face(120, 126, 0.4)),
];

export default {
  places: {
    // 'wellington' is kept out of the first two names on purpose: "beef Wellington", "Wellington Arch" and "wellingtons" (boots) are
    // not this city, so plain "wellington" counts only in a book that names New Zealand or this place itself
    'nz-wellington': { country: 'nz', wave: 3, name: nm('เวลลิงตัน', 'Wellington'), tz: 'Pacific/Auckland', ll: [-41.29, 174.78], alias: ['te whanganui-a-tara', 'WLG', 'wellington', 'เวลลิงตัน', '惠灵顿', 'te papa', 'เตปาปา', 'zealandia', 'ซีแลนเดีย', 'cuba street', 'ถนนคิวบา', 'lambton quay', 'แลมบ์ตันคีย์', 'oriental bay', 'ออเรียนทัลเบย์', 'lyall bay', 'ไลออลเบย์', 'petone', 'พีโทนี', 'kelburn', 'เคลเบิร์น'], colors: WG },
  },
  items,
};
