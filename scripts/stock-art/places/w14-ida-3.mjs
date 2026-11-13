// Wave 14, Indonesia 3: Lombok and the Gili islands — the stamp, two day scenes and landmarks.
// No swing in the sea (Bali has the jungle swing), no turtles, no rice barns (Toraja), no weaving or pottery, no surf (Kuta),
// no pink beach (Komodo), no waterfalls, no monkeys, no satay, no pearls, no seahorses; the mosques only as buildings.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const LB = { k1: '#00897B', k2: '#E65100', k3: '#E0F2F1' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `id-lombok.landmark.${slug}`, cat: 'landmark', file: `id/lombok/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a cidomo: a little pony in a red harness with a pom-pom, pulling a two-wheeled cart with a bench under a striped canopy
const cidomo = (x, y, s) => g(x, y, s, Lc('M-6-34l40 6', '#8D6E63', 4)
  + P('M-74-30h66v-30h-66z', '#29B6F6') + P('M-80-62c10-10 68-10 78 0z', '#FFCA28') + Lc('M-70-62v32M-12-62v32', '#8D6E63', 4) + R(-80, -32, 74, 16, '#E53935', 3) + C(-42, -10, 16, INK, 0) + C(-42, -10, 6, '#BDBDBD', 0)
  + E(46, -34, 22, 13, '#A1887F') + Lc('M32-24v26M60-24v26', '#8D6E63', 6) + P('M62-40c6-10 10-22 18-24 6 2 8 8 4 14-6 4-10 10-12 14z', '#A1887F') + P('M64-62c-4-6-2-10 4-8', '#5D4037', 3)
  + Lc('M40-46l12-4 12 6', '#E53935', 4) + C(72, -66, 5, '#FF4081', 2) + C(76, -54, 2.5, INK, 0) + Lc('M26-36c-8 2-12 8-12 14', '#5D4037', 4));

const items = [
  { id: 'id-lombok.stamp', cat: 'stamp', file: 'id/lombok/stamp.v1.svg', name: nm('ตราประทับลอมบอกและหมู่เกาะกีลี', 'Lombok and the Gili islands stamp'), kw: ['lombok', 'ลอมบอก', 'gili islands', 'หมู่เกาะกีลี', 'rinjani', 'รินจานี', 'cidomo', 'ชีโดโม'],
    // the broad cone of Rinjani with a blue crater lake on its shoulder, three tiny palm islands in the sea in front
    svg: cityStamp('lmb-st', { name: 'LOMBOK', sub: 'GILI ISLANDS', ...LB, emblem: P('M52 120l34-50c8-8 20-8 28 0l34 50z', '#8D6E63', 3) + P('M86 76c8 6 20 6 28 0', '#4FC3F7', 3) + R(48, 120, 104, 26, '#4DD0E1', 0, 0)
      + [[70, 132], [100, 136], [130, 132]].map(([x, y]) => E(x, y, 11, 4, '#FFF3D6', 2) + Lc(`M${x} ${y - 2}v-12`, '#8D6E63', 2.5) + P(`M${x} ${y - 14}c-6-2-10 0-12 4M${x} ${y - 14}c6-2 10 0 12 4`, 'none').replace('fill="none"', 'fill="none" stroke="#43A047" stroke-width="3"')).join('') + face(100, 98, 0.26) }) },
  { id: 'id-lombok.day.gili', cat: 'day', file: 'id/lombok/day-gili.v1.svg', name: nm('เกาะกีลีตราวังงันที่ไม่มีรถยนต์', 'Gili Trawangan, the island with no cars'), kw: ['gili trawangan', 'กีลีตราวังงัน', 'gili air', 'กีลีแอร์', 'gili meno', 'กีลีเมโน', 'no cars', 'ไม่มีรถยนต์', 'sandy lane', 'ทางทราย', 'cycling', 'ปั่นจักรยาน', 'turquoise sea', 'ทะเลสีฟ้า'],
    // a sandy lane between palms along a turquoise sea, a pony cart trotting by, a bicycle leaning on a palm, little thatched beach huts and the island hill behind
    svg: scene('lmb-d1', '#B3E5FC', E(60, 50, 22, 8, '#FFFFFF', 0) + P('M140 104c20-30 50-40 104-20v20z', '#7CB342') + P('M-4 100h248v50H-4z', '#26C6DA', 0) + Lc('M10 116c20-6 40 6 60 0s40-6 60 0 40 6 60 0', '#B2EBF2', 3)
      + P('M-4 146c60-10 180-10 248 0v104H-4z', '#FFF3D6', 0) + [[30, 140], [210, 138]].map(([x, y]) => R(x - 14, y - 14, 28, 18, '#D7A86E', 0, 3) + P(`M${x - 20} ${y - 14}l20-14 20 14z`, '#A1887F', 3)).join('')
      + [[60, 210], [178, 206]].map(([x, y]) => Lc(`M${x} ${y}c-4-30 4-60 0-90`, '#8D6E63', 7) + P(`M${x} ${y - 90}c-20-10-36-2-40 10 14-8 26-8 40-10zM${x} ${y - 90}c20-10 36-2 40 10-14-8-26-8-40-10zM${x} ${y - 90}c-8-18 0-30 12-32-6 10-10 20-12 32z`, '#43A047', 3)).join('')
      + cidomo(110, 214, 0.62) + g(196, 214, 0.55, C(-20, 0, 12, 'none', 4) + C(20, 0, 12, 'none', 4) + Lc('M-20 0l12-20h20l8 20M-8-20l8 20M12-20l-4-8h-6', '#E53935', 4)) + face(96, 192, 0.2)) },
  { id: 'id-lombok.day.rinjani', cat: 'day', file: 'id/lombok/day-rinjani.v1.svg', name: nm('ทะเลสาบเซอการาอานักในปล่องรินจานี', 'Segara Anak, the lake in Rinjani\'s crater'), kw: ['rinjani', 'รินจานี', 'segara anak', 'เซอการาอานัก', 'crater lake', 'ทะเลสาบปากปล่อง', 'volcano trek', 'เดินป่าภูเขาไฟ', 'crater rim', 'ขอบปากปล่อง', 'barujari', 'บารูจารี'],
    // looking over the crater rim: steep brown walls ringing a big blue crescent lake, a small dark cone smoking in the lake, the tall summit peak beyond and clouds below the rim
    svg: scene('lmb-d2', '#FFE0B2', P('M150 92l34-60c4-6 8-6 12 0l40 60z', '#8D6E63') + Lc('M180 40l10 10', '#D7CCC8', 3) + P('M-4 96c40-10 80-14 124-10s90 4 124 10v40H-4z', '#A1887F')
      + P('M10 150c10-30 60-46 110-46s100 16 110 46c-30 22-190 22-220 0z', '#4FC3F7') + Lc('M40 150c30 10 130 10 160 0', '#B3E5FC', 3)
      + P('M90 150c4-18 14-28 24-28s20 10 24 28c-14 6-34 6-48 0z', '#5D4037') + P('M112 120c-8-10 0-18 8-14 4-8 16-4 12 4', '#ECEFF1', 3)
      + P('M-4 176c30-10 60-10 90-2s50 10 70 6 60-14 88-6v76H-4z', '#8D6E63') + Lc('M20 200l30-10M150 210l40-12', '#6D4C41', 3) + E(30, 120, 30, 10, '#FFFFFF', 0) + E(214, 128, 26, 9, '#FFFFFF', 0) + face(120, 152, 0.3)) },

  L('cidomo', 'ชีโดโม รถม้าเล็กบนเกาะกีลี', 'A cidomo, the pony cart of the Gilis', ['cidomo', 'ชีโดโม', 'pony cart', 'รถม้าเล็ก', 'gili transport', 'การเดินทางบนเกาะกีลี', 'no cars island', 'เกาะไม่มีรถยนต์', 'bells and pom-poms', 'กระดิ่งกับพู่'], 'หาพู่สีชมพูบนหัวม้าตัวน้อย', 'Find the pink pom-pom on the little pony\'s head',
    // a small brown pony with a red harness and a pink pom-pom trotting along, pulling a two-wheeled cart with a red bench, blue sides and a yellow canopy on a sandy track
    E(120, 200, 96, 10, '#FFE0B2', 0) + cidomo(112, 192, 1.4) + face(52, 130, 0.42)),
  L('taliwang', 'อายัมตาลีวัง ไก่ย่างพริกลอมบอก', 'Ayam taliwang, Lombok\'s chilli-grilled chicken', ['ayam taliwang', 'อายัมตาลีวัง', 'grilled chicken', 'ไก่ย่าง', 'red chilli paste', 'พริกแดง', 'spicy', 'เผ็ด', 'lime', 'มะนาว', 'lombok food', 'อาหารลอมบอก'], 'หาซีกมะนาวที่วางข้างไก่', 'Find the lime half next to the chicken',
    // a whole flattened small chicken grilled red-orange with dark char stripes on a banana leaf on a plate, a lime half and a little bowl of red sambal beside it, a whiff of smoke
    E(120, 168, 96, 40, '#FFFFFF') + E(120, 164, 80, 30, '#66BB6A', 3) + Lc('M100 70c-8-10 8-16 0-26M130 66c-8-10 8-16 0-26', '#CFD8DC', 4)
      + P('M74 160c-6-26 14-50 46-50s52 24 46 50c-4 16-26 24-46 24s-42-8-46-24z', '#E8572A') + P('M64 168c-14-4-20 4-16 12 8 2 16-2 20-6zM176 168c14-4 20 4 16 12-8 2-16-2-20-6z', '#E8572A', 3.5)
      + Lc('M92 130l-8 14M112 122l-8 18M134 122l-6 18M154 130l-6 14M98 160l-6 10M140 160l-6 10', '#8B2B0E', 4) + C(186, 124, 16, '#C6E377') + C(186, 124, 11, '#E8F5C8', 2) + Lc('M186 113v22M175 124h22', '#C6E377', 2)
      + E(48, 128, 18, 10, '#FFFFFF') + E(48, 126, 13, 6, '#D32F2F', 0) + face(120, 146, 0.42).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('plecing', 'เปลอจิงกังกุง ผักบุ้งราดน้ำพริก', 'Plecing kangkung, water spinach with tomato sambal', ['plecing kangkung', 'เปลอจิงกังกุง', 'water spinach', 'ผักบุ้ง', 'tomato chilli sambal', 'น้ำพริกมะเขือเทศ', 'bean sprouts', 'ถั่วงอก', 'peanuts', 'ถั่วลิสง', 'lombok salad', 'ยำลอมบอก'], 'หาน้ำพริกสีแดงที่ราดบนผักสีเขียว', 'Find the red sambal spooned on top of the greens',
    // a plate piled with long green water-spinach stalks and arrow leaves, bean sprouts, a big spoon of bright red tomato sambal on top, peanuts and a lime wedge round the edge
    E(120, 170, 96, 36, '#FFFFFF') + E(120, 166, 80, 26, '#F5F5F5', 0)
      + [[-30, '#7CB342'], [-14, '#558B2F'], [0, '#8BC34A'], [16, '#689F38'], [30, '#7CB342']].map(([d, c]) => Lc(`M${80 + d} 176c10-30 40-50 70-60`, c, 6)).join('') + [[96, 120], [128, 110], [150, 130], [76, 140]].map(([x, y]) => P(`M${x} ${y}l14-8-2 14z`, '#43A047', 2.5)).join('')
      + [[70, 160], [160, 168], [176, 154], [64, 176]].map(([x, y]) => Lc(`M${x} ${y}q6-6 12 0`, '#FFF8E1', 3)).join('') + P('M92 136c4-16 26-22 42-14s14 26-6 30-38-2-36-16z', '#E53935', 3.5) + [[104, 136], [120, 132], [116, 146]].map(([x, y]) => C(x, y, 3, '#FFCDD2', 0)).join('')
      + [[150, 186], [162, 180], [86, 188], [98, 192]].map(([x, y]) => E(x, y, 5, 3.5, '#C98A3A', 2)).join('') + P('M180 178l16-8 0 14z', '#C6E377', 3) + face(114, 136, 0.3).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('baunyale', 'เทศกาลจับหนอนทะเลบาวญาเล', 'Bau Nyale, catching the sea worms at dawn', ['bau nyale', 'บาวญาเล', 'sea worm festival', 'เทศกาลจับหนอนทะเล', 'nyale worms', 'หนอนญาเล', 'dawn on the beach', 'รุ่งเช้าที่ชายหาด', 'scoop net', 'สวิง', 'seger beach', 'หาดเซอเกอร์'], 'หาหนอนทะเลสีเขียวที่ลอยอยู่ในน้ำ', 'Find the green sea worm wiggling in the water',
    // a purple-pink dawn over the sea, a child knee-deep holding a scoop net and a torch, colourful wiggly sea worms in green, red and purple squiggling in the shallow water
    bg('#CE93D8') + C(180, 70, 16, '#FFE082', 0) + low(110, '#4DB6AC') + Lc('M30 126c20-6 40 6 60 0M140 136c20-6 40 6 60 0', '#B2DFDB', 3) + frame
      + [[60, 176, '#8BC34A'], [96, 200, '#E53935'], [150, 186, '#AB47BC'], [184, 206, '#8BC34A'], [44, 206, '#FFCA28']].map(([x, y, c]) => Lc(`M${x - 16} ${y}c4-8 8-8 12 0s8 8 12 0 8-8 12 0`, c, 6) + C(x + 20, y - 2, 3.5, c, 0)).join('')
      + g(118, 150, 1, R(-12, -10, 24, 30, '#FFCA28', 6, 3) + C(0, -24, 13, '#F2C29B', 3) + Lc('M12 0l34 20', '#8D6E63', 4) + E(56, 26, 16, 10, '#FFFFFF', 3) + Lc('M44 20l24 12M48 32l16-14', '#B0BEC5', 1.5) + Lc('M-12 0l-14 6', '#F2C29B', 5) + R(-34, 2, 12, 8, '#455A64', 2, 2.5) + P('M-34 6l-18-8v16z', '#FFF59D', 0))
      + face(118, 126, 0.28)),
  L('sade', 'บ้านซาซักหลังคาหญ้าที่หมู่บ้านซาเด', 'The thatched Sasak houses of Sade village', ['sade village', 'หมู่บ้านซาเด', 'sasak house', 'บ้านชาวซาซัก', 'bale tani', 'บาเลตานี', 'thatched roof', 'หลังคาหญ้า', 'woven bamboo walls', 'ผนังไม้ไผ่สาน', 'traditional village', 'หมู่บ้านดั้งเดิม'], 'หาผนังไม้ไผ่สานลายตาราง', 'Find the woven bamboo wall with its criss-cross pattern',
    // two low houses with huge shaggy thatched roofs sweeping almost to the ground, short walls of criss-cross woven bamboo, a raised earth step at the doorway, a dusty path between
    bg('#C5E1A5') + low(170, '#E6C99A') + frame
      + [[70, 150, 0.8], [150, 176, 1.05]].map(([x, y, s]) => g(x, y, s, R(-44, -30, 88, 34, '#E8D3A8') + Array.from({ length: 5 }, (_, k) => Lc(`M${-40 + k * 20} -30l12 34M${-28 + k * 20} -30l-12 34`, '#C9A877', 2)).join('') + R(-10, -26, 20, 30, '#5D4037', 2, 3)
        + P('M-66-24c10-30 40-60 66-70 26 10 56 40 66 70-20 6-112 6-132 0z', '#B79B6B') + Lc('M-50-36c30-6 70-6 100 0M-36-56c20-6 52-6 72 0', '#9A7E52', 3) + R(-20, 4, 40, 10, '#C8A16E', 2, 3))).join('')
      + face(150, 128, 0.4)),
  L('agung', 'พระอาทิตย์ตกหลังภูเขาอากุงจากเกาะกีลี', 'Sunset behind Mount Agung from the Gilis', ['sunset point', 'จุดชมพระอาทิตย์ตก', 'mount agung', 'ภูเขาอากุง', 'gili trawangan', 'กีลีตราวังงัน', 'across the sea to bali', 'มองข้ามทะเลไปบาหลี', 'beach evening', 'ชายหาดยามเย็น'], 'หาภูเขารูปกรวยไกลๆ ที่อยู่ข้ามทะเล', 'Find the cone mountain far away across the sea',
    // a glowing orange sky, the sun sinking beside the big blue cone of Mount Agung across the water, the sea striped with gold, a leaning palm and a beach mat on the sand in front
    bg('#FFAB91') + Lc('M30 50c40-8 80 8 120 0', '#F8BBD0', 6) + C(150, 104, 22, '#FFE082', 0) + P('M40 122l50-56c6-6 12-6 18 0l56 56z', '#5C6BC0', 0) + low(122, '#7E57C2') + Lc('M120 134h60M130 146h40M140 158h20', '#FFE082', 4)
      + P('M16 178c40-10 140-12 208-4v20a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#FFE0B2', 0) + frame
      + Lc('M44 214c4-40 20-80 44-110', '#6D4C41', 7) + P('M88 104c-24-6-40 4-44 18 16-10 30-12 44-18zM88 104c20-14 40-10 48 2-18-4-32-4-48-2zM88 104c-2-20 10-32 24-32-10 10-18 20-24 32z', '#2E7D32', 3)
      + P('M120 200l60-8 10 14-60 8z', '#E53935', 3) + Lc('M130 202l52-6', '#FFFFFF', 3) + face(150, 102, 0.36)),
  L('nasibalap', 'นาซีบาลัปปูยุง ข้าวไก่ฉีกเผ็ด', 'Nasi balap puyung, rice with fiery shredded chicken', ['nasi balap puyung', 'นาซีบาลัปปูยุง', 'shredded chicken', 'ไก่ฉีก', 'spicy rice', 'ข้าวรสเผ็ด', 'fried soybeans', 'ถั่วเหลืองทอด', 'banana leaf parcel', 'ห่อใบตอง', 'lombok breakfast', 'อาหารเช้าลอมบอก'], 'หาไก่ฉีกสีแดงบนกองข้าว', 'Find the red shredded chicken on the rice',
    // an open banana-leaf parcel holding a dome of white rice, a heap of red-orange shredded chicken on one side, crunchy golden soybeans and a slice of cucumber
    P('M20 176c20-50 180-50 200 0-30 26-170 26-200 0z', '#66BB6A') + Lc('M30 176h180', '#388E3C', 2) + P('M50 160c-10-30 20-46 40-60l10 20z', '#81C784', 3)
      + P('M60 168c0-34 20-52 50-52s50 18 50 52z', '#FFFFFF') + P('M120 168c4-26 20-40 40-40s28 18 28 40z', '#E8572A') + Array.from({ length: 10 }, (_, k) => Lc(`M${132 + (k % 5) * 10} ${150 + Math.floor(k / 5) * 10}l${k % 2 ? 6 : -6} -6`, '#B5361A', 2.5)).join('')
      + [[76, 176], [86, 182], [98, 178], [70, 186], [108, 186]].map(([x, y]) => C(x, y, 4, '#E6A85A', 2)).join('') + E(180, 186, 12, 6, '#C5E1A5', 2.5) + face(96, 146, 0.4)),
  L('cukli', 'กล่องไม้ฝังเปลือกหอยมุกจูกลี', 'A cukli box inlaid with mother-of-pearl', ['cukli', 'จูกลี', 'mother-of-pearl inlay', 'ฝังมุก', 'wooden box', 'กล่องไม้', 'shell craft', 'งานเปลือกหอย', 'lombok handicraft', 'หัตถกรรมลอมบอก', 'souvenir', 'ของฝาก'], 'หาลายเกลียวสีขาวมันวาวบนกล่อง', 'Find the shiny white swirl on the box',
    // a dark wooden box with its lid tipped open, the front and lid set with white shimmering shell pieces in swirls, dots and a flower, a pearly shell lying beside it
    P('M46 108l20-56h108l20 56z', '#5D4037') + Lc('M120 64c-14 0-20 14-10 20s18-4 12-10', '#F3F0FF', 4) + [[84, 72], [156, 72], [94, 96], [146, 96]].map(([x, y]) => C(x, y, 4, '#F3F0FF', 2)).join('')
      + R(40, 108, 160, 90, '#4E342E', 8) + R(40, 108, 160, 12, '#3E2723', 4, 3) + g(120, 160, 1, [0, 72, 144, 216, 288].map((a) => E(0, -16, 8, 14, '#F3F0FF', 2).replace('<ellipse', `<ellipse transform="rotate(${a})"`)).join('') + C(0, 0, 7, '#E1F5FE', 2))
      + [62, 178].map((x) => Lc(`M${x} 140c10 6 10 18 0 24s-10 18 0 24`, '#F3F0FF', 4)).join('') + P('M196 214c-6-20 6-34 20-34s18 18 8 34z', '#E1F5FE', 3.5) + Lc('M206 212l4-26M214 212v-28', '#B3E5FC', 2) + face(210, 200, 0.22)),
  L('bebalung', 'เบอบาลุง ต้มซี่โครงวัว', 'Bebalung, beef rib soup', ['bebalung', 'เบอบาลุง', 'beef rib soup', 'ต้มซี่โครงวัว', 'big bones', 'กระดูกชิ้นใหญ่', 'clear broth', 'น้ำซุปใส', 'sasak food', 'อาหารซาซัก', 'with rice', 'กินกับข้าว'], 'หากระดูกที่โผล่ขึ้นมาจากชาม', 'Find the bones sticking up out of the bowl',
    // a black clay pot of golden broth with two big rib bones sticking up out of it, chunks of beef, red chilli and green onion floating, a little bowl of rice beside
    E(120, 196, 88, 12, '#D7CCC8', 0) + Lc('M92 60c-8-12 8-18 0-30', '#B0BEC5', 4) + P('M100 112l14-60c2-8 10-8 12-2l-6 62zM132 112l18-54c4-8 12-6 12 2l-14 54z', '#FFF8E1')
      + C(116, 48, 7, '#FFF8E1', 3) + C(124, 46, 6, '#FFF8E1', 3) + C(156, 54, 7, '#FFF8E1', 3) + C(164, 58, 6, '#FFF8E1', 3)
      + P('M40 114h150c0 46-32 78-75 78s-75-32-75-78z', '#37474F') + Lc('M52 146c30 10 92 10 122 0', '#546E7A', 4) + E(115, 114, 76, 16, '#F6C453')
      + [[80, 112], [104, 118], [150, 116]].map(([x, y]) => R(x - 9, y - 6, 18, 11, '#8D5A33', 3, 2.5)).join('') + [[68, 116], [174, 112]].map(([x, y]) => E(x, y, 6, 3, '#E53935', 2)).join('') + [[128, 110], [92, 120], [160, 122]].map(([x, y]) => C(x, y, 3.5, '#7CB342', 1.5)).join('')
      + E(200, 186, 22, 12, '#FFFFFF') + E(200, 180, 16, 7, '#F5F5F5', 2) + face(115, 156, 0.4).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('merese', 'เนินหญ้าเบอเรเซเหนืออ่าวสองฝั่ง', 'The grassy hill of Bukit Merese above two bays', ['bukit merese', 'บูกิตเมอเรเซ', 'grassy hill', 'เนินหญ้า', 'tanjung aan', 'ตันจุงอัน', 'two bays', 'อ่าวสองฝั่ง', 'sunset walk', 'เดินชมพระอาทิตย์ตก', 'mandalika', 'มันดาลิกา'], 'หาเด็กที่ยืนบนยอดเนินหญ้า', 'Find the child standing on top of the grassy hill',
    // a smooth green grassy hill with soft rounded humps rising out of the sea, a curved bay of pale sand curling each side, a child with arms up on the top, a pink evening sky
    bg('#F8BBD0') + C(60, 60, 14, '#FFE082', 0) + low(120, '#26C6DA') + P('M16 150c20-6 40-4 50 4 10 10 30 10 40 0M140 152c14 10 40 10 50 0 10-8 24-10 34-6', 'none').replace('fill="none"', 'fill="none" stroke="#FFF3D6" stroke-width="10"')
      + P('M16 194c20-60 60-110 104-110s70 40 90 70c6 10 10 24 14 40v0a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#8BC34A') + Lc('M40 186c30-30 60-50 90-50M70 200c30-20 70-30 110-20', '#7CB342', 4) + frame
      + g(120, 76, 1, C(0, -10, 7, '#F2C29B', 2.5) + R(-7, -2, 14, 14, '#E53935', 3, 2.5) + Lc('M-7 0l-8-12M7 0l8-12', '#F2C29B', 4)) + face(120, 140, 0.44)),
  L('rinjanisummit', 'ยอดภูเขาไฟรินจานียามรุ่งอรุณ', 'Rinjani\'s summit at dawn', ['rinjani summit', 'ยอดรินจานี', 'volcano climb', 'ปีนภูเขาไฟ', 'dawn', 'รุ่งอรุณ', 'scree ridge', 'สันเขาหินกรวด', 'sea of clouds', 'ทะเลหมอก', 'second highest volcano', 'ภูเขาไฟสูงอันดับสอง'], 'หาไฟฉายคาดหัวของนักปีนเขา', 'Find the climbers\' head torches',
    // a sharp grey scree peak against a pink-gold dawn, a narrow ridge path climbing to the top with three little climbers wearing glowing head torches, clouds far below
    bg('#FFCCBC') + C(186, 70, 16, '#FFE082', 0) + Lc('M30 50c30-6 60 6 90 0', '#F8BBD0', 6) + low(150, '#FFFFFF') + E(60, 160, 40, 12, '#ECEFF1', 0) + E(190, 156, 30, 10, '#ECEFF1', 0)
      + P('M40 224l70-170c6-10 14-10 20 0l70 170z', '#78909C', 0) + P('M110 54l-20 60 30-30 10 40 10-70c-6-10-14-10-20 0z', '#90A4AE', 0) + frame + Lc('M140 224l-22-60 10-40-8-50', '#CFD8DC', 6)
      + [[130, 196], [124, 152], [122, 98]].map(([x, y]) => C(x, y - 10, 6, '#F2C29B', 2.5) + R(x - 6, y - 4, 12, 12, '#FF7043', 3, 2.5) + C(x + 4, y - 15, 3, '#FFF59D', 1.5) + P(`M${x + 6} ${y - 15}l16-6v12z`, '#FFF59D', 0)).join('') + face(84, 190, 0.38)),
  L('gendangbeleq', 'กลองยักษ์เก็นดังเบอเลก', 'Gendang beleq, the giant Sasak drum', ['gendang beleq', 'เก็นดังเบอเลก', 'giant drum', 'กลองยักษ์', 'sasak music', 'ดนตรีซาซัก', 'parade', 'ขบวนแห่', 'drum band', 'วงกลอง', 'festival', 'งานเทศกาล'], 'หากลองยาวที่ใหญ่กว่าตัวเด็ก', 'Find the long drum that is bigger than the child',
    // a smiling boy in a black headcloth and red sash carrying a huge long barrel drum slung across his body on a strap, hitting one end with a stick
    P('M90 222c0-30 12-44 30-44s30 14 30 44z', '#212121') + R(98, 186, 44, 10, '#E53935', 3, 3) + C(120, 84, 30, '#C68B5B') + P('M88 76c4-28 60-28 64 0-14-6-50-6-64 0z', '#212121') + P('M148 70l14-8-2 14z', '#212121', 3) + face(120, 92, 0.48)
      + Lc('M96 120l60 54', '#8D6E63', 4) + g(120, 150, 1, R(-84, -22, 168, 44, '#C8A06A', 20) + E(-84, 0, 10, 22, '#FFF3D6') + E(84, 0, 10, 22, '#FFF3D6') + Lc('M-60-20l20 40M-30-22l20 44M0-22l20 44M30-22l20 44M60-20l14 30', '#E53935', 3) + Lc('M-84-22h168M-84 22h168', '#8D6E63', 3), -8)
      + Lc('M196 118l16-30', '#8D6E63', 6) + C(214, 84, 6, '#FFCA28', 3)),
  L('islamiccenter', 'หอสูงอิสลามิกเซ็นเตอร์มาตารัม', 'The tall tower of Mataram\'s Islamic Center', ['islamic center', 'อิสลามิกเซ็นเตอร์', 'mataram', 'มาตารัม', 'tall tower', 'หอสูง', 'green domes', 'โดมสีเขียว', 'city landmark', 'จุดสังเกตเมือง', 'island of a thousand mosques', 'เกาะพันมัสยิด'], 'หาโดมสีเขียวหลายลูก', 'Find the green domes',
    // a white building with a big green dome and four small green domes at its corners, beside it a very tall slim white tower with balconies and a pointed green tip, as a building only
    R(30, 140, 130, 70, '#FFFFFF') + [52, 82, 108, 138].map((x) => P(`M${x - 8} 210v-26c0-12 16-12 16 0v26z`, '#80CBC4', 3)).join('')
      + P('M58 140c0-40 18-60 37-60s37 20 37 60z', '#26A69A') + Lc('M95 80V66', '#FFCA28', 3) + C(95, 62, 4, '#FFCA28', 2) + [[34, 140], [156, 140]].map(([x, y]) => P(`M${x - 12} ${y}c0-16 6-22 12-22s12 6 12 22z`, '#26A69A', 3)).join('')
      + R(176, 60, 22, 150, '#FFFFFF') + [96, 140].map((y) => R(170, y, 34, 8, '#B2DFDB', 2, 3)).join('') + R(172, 52, 30, 10, '#FFFFFF', 2, 3) + P('M178 52l9-34 9 34z', '#26A69A') + R(20, 208, 196, 10, '#D7CCC8', 3)
      + face(95, 116, 0.36).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('bayanbeleq', 'มัสยิดโบราณบายันเบอเลกหลังคาหญ้า', 'The old thatched mosque of Bayan Beleq', ['bayan beleq', 'บายันเบอเลก', 'old mosque building', 'มัสยิดโบราณ', 'bamboo walls', 'ผนังไม้ไผ่', 'thatched pyramid roof', 'หลังคาหญ้าทรงพีระมิด', 'stone platform', 'ฐานหิน', 'north lombok', 'ลอมบอกเหนือ'], 'หาหลังคาหญ้าที่ซ้อนกันสองชั้น', 'Find the thatched roof stacked in two layers',
    // a small square building of woven bamboo walls on a stone-walled platform, a steep two-layered thatched pyramid roof on top, green grass and a stone path in front
    bg('#C8E6C9') + low(180, '#9CCC65') + frame + P('M30 194h180l-10-30H40z', '#9E9E9E') + Array.from({ length: 8 }, (_, k) => C(48 + k * 21, 182, 6, '#BDBDBD', 2)).join('')
      + R(64, 112, 112, 52, '#E8D3A8') + Array.from({ length: 6 }, (_, k) => Lc(`M${68 + k * 18} 112l12 52M${80 + k * 18} 112l-12 52`, '#C9A877', 2)).join('') + R(108, 128, 24, 36, '#6D4C41', 2, 3)
      + P('M40 118l40-36h80l40 36z', '#A68B5B') + P('M78 84l42-46 42 46z', '#B79B6B') + Lc('M54 108h132M96 64h48', '#8C7148', 3) + P('M100 214l8-20h24l8 20z', '#D7CCC8', 3) + face(120, 70, 0.32)),
  L('cerorot', 'จาเจเชอโรรต ขนมกรวยใบมะพร้าว', 'Cerorot, sweet cakes in spiral palm-leaf cones', ['cerorot', 'เชอโรรต', 'palm leaf cone', 'กรวยใบมะพร้าว', 'rice flour cake', 'ขนมแป้งข้าว', 'palm sugar', 'น้ำตาลมะพร้าว', 'sasak sweets', 'ขนมซาซัก', 'steamed snack', 'ขนมนึ่ง'], 'หาขนมที่โผล่ออกมาจากปลายกรวย', 'Find the brown sweet poking out of the end of the cone',
    // a tray of long pale-green coconut-leaf cones wound in a spiral, each with soft brown palm-sugar cake peeking out of its wide end, one standing up with a smile
    E(120, 196, 92, 16, '#D7A86E') + E(120, 192, 84, 11, '#E6C08C', 3)
      + [[70, 176, -20], [120, 184, 5], [166, 174, 22]].map(([x, y, r]) => g(x, y, 1, P('M-48 0l80-14v28z', '#C5E1A5', 3.5) + Lc('M-30-3l6 6M-14-6l8 12M2-9l8 18M18-12l8 24', '#8BC34A', 2.5) + E(34, 0, 7, 14, '#8D5A33', 3), r)).join('')
      + g(120, 110, 1, P('M0 60l-16-90h32z', '#C5E1A5', 3.5) + Lc('M-12-14l24 8M-10 6l20 8M-6 26l12 6M-14-30l28 6', '#8BC34A', 2.5) + E(0, -30, 16, 7, '#8D5A33', 3)) + face(120, 98, 0.34)),
  L('scopsowl', 'นกเค้ากู่รินจานี', 'The Rinjani scops owl', ['rinjani scops owl', 'นกเค้ากู่รินจานี', 'little owl', 'นกฮูกตัวเล็ก', 'only on lombok', 'มีแค่ที่ลอมบอก', 'ear tufts', 'ขนหูตั้ง', 'night forest', 'ป่ายามค่ำ', 'birdwatching', 'ดูนก'], 'หาขนสองแหลมที่ตั้งอยู่บนหัวนกฮูก', 'Find the two pointy ear tufts on the owl\'s head',
    // a small round brown owl with two pointy ear tufts, big golden eyes and a spotted chest, sitting on a mossy branch under a crescent moon in the night forest
    bg('#3949AB') + P('M196 46a14 14 0 1 1-12-16 10 10 0 0 0 12 16z', '#FFF59D', 3) + [[40, 50], [70, 34], [170, 80]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('') + frame
      + Lc('M16 176c60-10 140-14 208-4', '#6D4C41', 14) + Lc('M40 170c10-4 20-4 30 0M150 168c10-4 20-4 30 0', '#7CB342', 5)
      + P('M80 172c-10-40 0-80 40-84 40 4 50 44 40 84z', '#A1774A') + P('M84 92l-4-30 22 22zM156 92l4-30-22 22z', '#8D6E63') + P('M96 172c-4-24 6-44 24-46 18 2 28 22 24 46z', '#E6C89C', 3)
      + [[108, 146], [126, 150], [116, 162], [134, 136], [104, 132]].map(([x, y]) => P(`M${x - 4} ${y}l4 4 4-4`, 'none').replace('fill="none"', 'fill="none" stroke="#8D6E63" stroke-width="2.5"')).join('')
      + C(104, 108, 14, '#FFCA28', 3) + C(136, 108, 14, '#FFCA28', 3) + C(104, 108, 6, INK, 0) + C(136, 108, 6, INK, 0) + C(106, 105, 2, '#FFFFFF', 0) + C(138, 105, 2, '#FFFFFF', 0) + P('M114 120l6 8 6-8z', '#FFB74D', 2.5)
      + E(94, 122, 7, 4.5, '#FF8FA3', 0) + E(146, 122, 7, 4.5, '#FF8FA3', 0) + Lc('M100 176v8M112 176v8M128 176v8M140 176v8', '#FFB74D', 4)),
  L('ares', 'อาเรส แกงแกนกล้วยกะทิ', 'Ares, banana-stem curry in coconut milk', ['ares', 'อาเรส', 'banana stem curry', 'แกงหยวกกล้วย', 'coconut milk', 'กะทิ', 'sasak feast', 'งานเลี้ยงซาซัก', 'yellow curry', 'แกงสีเหลือง', 'festive food', 'อาหารงานบุญ'], 'หาท่อนหยวกกล้วยที่ตัดเห็นวงข้างใน', 'Find the banana trunk cut to show the rings inside',
    // a fat cut piece of banana-tree trunk showing its pale rings, beside it a bowl of creamy yellow curry full of white banana-stem slices and chicken pieces
    g(58, 150, 1, R(-30, -40, 60, 80, '#9CCC65', 10) + E(0, -40, 30, 14, '#F1F8E2') + E(0, -40, 20, 9, 'none', 2.5) + E(0, -40, 10, 4.5, '#E6EE9C', 2) + Lc('M-20-24v58M0-26v64M20-24v58', '#7CB342', 2.5))
      + E(150, 196, 74, 10, '#D7CCC8', 0) + P('M84 128h132c0 40-28 66-66 66s-66-26-66-66z', '#FFFFFF') + Lc('M96 156c26 10 82 10 108 0', '#FF8A65', 4) + E(150, 128, 66, 15, '#FFD54F')
      + [[118, 124], [140, 130], [164, 122], [186, 130]].map(([x, y]) => E(x, y, 9, 5, '#FFFDE7', 2.5) + E(x, y, 4, 2, 'none', 1.5)).join('') + [[130, 120], [176, 120]].map(([x, y]) => R(x - 6, y - 5, 12, 9, '#E6A85A', 2, 2)).join('')
      + face(150, 170, 0.34).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
];

export default {
  places: {
    'id-lombok': { country: 'id', wave: 3, name: nm('ลอมบอกและหมู่เกาะกีลี', 'Lombok and the Gili islands'), tz: 'Asia/Makassar', ll: [-8.58, 116.12], alias: ['lombok', 'ลอมบอก', 'LOP', 'gili trawangan', 'กีลีตราวังงัน', 'gili air', 'กีลีแอร์', 'gili meno', 'กีลีเมโน', 'gili islands', 'หมู่เกาะกีลี', 'rinjani', 'รินจานี', 'senggigi', 'เซงกิกิ', 'selong belanak', 'tanjung aan'], colors: LB },
  },
  items,
};
