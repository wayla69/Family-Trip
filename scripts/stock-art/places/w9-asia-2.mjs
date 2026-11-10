// Wave 9, Asia part 2: Penang, Langkawi, India (the country and Delhi, Agra and Jaipur) and Nepal (the country and Kathmandu).
// Temples, shrines and tombs stand as buildings only, with no face on them; no deities, no painted eyes, no prayer flags, no letters.
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (my/penang/landmark-rojak.v1.svg → my-penang.landmark.rojak)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const table = (c = '#C68B59') => R(-4, 176, 248, 68, c, 0, 3) + Lc('M-4 206h248', '#A1673F', 2);
const prawn = (x, y, r = 0, s = 1) => g(x, y, s, P('M-22 0c0-18 18-26 34-18 8 4 10 14 4 20-6-8-16-10-24-4-6 4-6 10-2 14-8 2-12-4-12-12z', '#FF8A65', 2.5) + P('M-14 10l-10 8 2-12z', '#FF7043', 2) + Lc('M14-16l10-12M16-12l14-6', INK, 1.5) + C(8, -10, 2, INK, 0), r);

const items = [
  // ---------- Penang
  L('my/penang/landmark-prawnmee.v1.svg', 'หมี่กุ้งฮกเกี้ยนน้ำซุปสีส้มของปีนัง', 'Penang Hokkien prawn mee in its red broth', ['hokkien mee', 'หมี่ฮกเกี้ยน', 'prawn mee', 'หมี่กุ้ง', 'prawn broth', 'น้ำซุปกุ้ง', 'water spinach', 'ผักบุ้ง', 'sambal on the spoon', 'ซัมบัลบนช้อน', 'hawker stall', 'ร้านแผงลอย'], 'หากุ้งตัวโตสองตัวในชาม', 'Find the two big prawns in the bowl',
    // a hawker table, a big bowl of glowing red-orange prawn broth with yellow noodles and white rice vermicelli, two pink prawns, half a boiled egg, water spinach and crispy shallots, a spoon of red sambal on the side
    sky('#FFF8E1') + table() + P('M30 120h180c0 50-40 84-90 84s-90-34-90-84z', '#FFFFFF', 4) + Lc('M36 136h168', '#EF5350', 3) + E(120, 120, 90, 20, '#FF7043', 3.5)
      + Lc('M50 116c14-8 26 8 40 0s26 8 40 0 26 8 40 0', '#FFD54F', 4) + Lc('M60 126c14-6 26 6 40 0s26 6 40 0', '#FFF8E1', 3)
      + prawn(80, 108, -10) + prawn(160, 110, 10) + g(120, 104, 1, E(0, 0, 14, 10, '#FFFFFF', 2.5) + C(0, 0, 6, '#FFCA28', 0) + face(0, 2, 0.2))
      + ring(4, (k) => P(`M${54 + k * 40} 122c4-8 10-8 12 0z`, '#43A047', 1.5))
      + g(206, 196, 1, E(0, 0, 18, 8, '#FFFFFF', 3) + E(0, -2, 10, 4, '#C62828', 0) + Lc('M-14 4l-30 10', '#ECEFF1', 6))),
  L('my/penang/landmark-rojak.v1.svg', 'โรจักปีนัง ผลไม้คลุกซอสกะปิดำโรยถั่ว', 'Penang rojak, fruit tossed in thick black prawn-paste sauce', ['penang rojak', 'โรจักปีนัง', 'pineapple and mango', 'สับปะรดกับมะม่วง', 'black shrimp paste sauce', 'ซอสกะปิดำ', 'crushed peanuts', 'ถั่วลิสงป่น', 'fried dough bits', 'ปาท่องโก๋ชิ้น', 'gurney drive', 'เกอร์นีย์ไดรฟ์'], 'หาไม้จิ้มฟันที่ปักผลไม้อยู่', 'Find the toothpick stuck in a piece of fruit',
    // a paper-lined plate of chunky pieces of pineapple, green mango, cucumber, jicama and fried dough, all coated in a glossy thick black sauce and showered with crushed peanuts, two toothpicks, one pineapple chunk smiling
    sky('#E8F5E9') + table('#B0BEC5') + E(120, 160, 100, 42, '#FFFFFF', 4) + E(120, 156, 86, 32, '#FFF3E0', 2)
      + ring(9, (k) => R(52 + (k % 5) * 28, 126 + Math.floor(k / 5) * 24 + (k % 2) * 4, 22, 18, ['#FFD54F', '#AED581', '#FFF8E1', '#E0A040', '#C5E1A5'][k % 5], 4, 2.5))
      + P('M48 140c20-10 40 6 60-4s50 8 80-4c4 10-4 20-20 22-30 6-60 0-90 4-20-2-30-8-30-18z', '#3E2723', 2.5) + ring(14, (k) => C(56 + (k % 7) * 20, 136 + Math.floor(k / 7) * 14, 2.5, '#FFE0B2', 0))
      + g(110, 112, 1, R(-16, -12, 32, 24, '#FFD54F', 5, 3) + face(0, -2, 0.3)) + Lc('M110 100l-10-40M150 132l14-44', '#F5DEB3', 3)),
  L('my/penang/landmark-taosarpneah.v1.svg', 'ขนมเปี๊ยะถั่วเขียวของปีนัง ของฝากยอดนิยม', 'Tau sar pneah, Penang’s flaky mung bean pastries', ['tau sar pneah', 'เตาซาเปี๊ยะ', 'mung bean pastry', 'ขนมเปี๊ยะไส้ถั่วเขียว', 'flaky crust', 'แป้งพัฟร่วน', 'penang souvenir', 'ของฝากจากปีนัง', 'lebuh chulia', 'ถนนจูเลีย', 'red dot on top', 'จุดแดงบนหน้าขนม'], 'หาขนมชิ้นที่แบ่งครึ่งเห็นไส้เขียว', 'Find the pastry broken open to show its green filling',
    // an open paper box of round golden flaky pastries in neat rows, each with a little red dot on top, one broken in half in front showing the pale green mung bean filling, the front pastry smiling, a cup of tea beside
    sky('#FFF3E0') + table() + P('M30 100h150l10 90H20z', '#FFF8E1', 3.5) + P('M30 100l-14-30h170l-6 30z', '#FFCC80', 3)
      + ring(6, (k) => { const x = 54 + (k % 3) * 50, y = 124 + Math.floor(k / 3) * 34; return E(x, y, 22, 14, '#FFCA28', 3) + Lc(`M${x - 14} ${y - 4}c8-4 20-4 28 0`, '#FFE082', 2) + C(x, y - 6, 3, '#E53935', 0); })
      + g(104, 214, 1, E(0, 0, 26, 16, '#FFCA28', 3.5) + face(0, -2, 0.36) + C(0, -12, 3, '#E53935', 0))
      + g(160, 216, 1, P('M-24 0a24 14 0 0 1 24-14v28a24 14 0 0 1-24-14z', '#FFCA28', 3) + P('M0-14v28c-10 0-14-6-14-14s4-14 14-14z', '#C5E1A5', 2), 0)
      + g(206, 160, 1, P('M-16-10h32l-4 30h-24z', '#FFFFFF', 3) + E(0, -10, 16, 4, '#A1673F', 2))),
  L('my/penang/landmark-aistingkap.v1.svg', 'ไอส์ติงกัป น้ำแดงมะพร้าวจากร้านหน้าต่างที่โชว์ราสตา', 'Ais tingkap, the rose-syrup coconut drink sold through a window', ['ais tingkap', 'ไอส์ติงกัป', 'window drink', 'เครื่องดื่มหน้าต่าง', 'rose syrup', 'น้ำหวานกลิ่นกุหลาบ', 'coconut strips', 'เนื้อมะพร้าวเส้น', 'basil seeds', 'เม็ดแมงลัก', 'chowrasta', 'โชว์ราสตา'], 'หาหน้าต่างไม้ที่ยื่นแก้วน้ำออกมา', 'Find the wooden window passing out the drink',
    // a wooden shophouse window with green shutters open, a counter ledge, a tall glass of pink rose-syrup coconut water with white coconut strips, black basil seeds and ice, a smiling face on the glass, a hand-made straw
    sky('#FFF8E1') + R(20, 30, 200, 150, '#8D6E63', 0, 3.5) + R(40, 50, 160, 110, '#FFE0B2', 0, 3) + R(20, 30, 36, 150, '#43A047', 0, 3) + R(184, 30, 36, 150, '#43A047', 0, 3)
      + Lc('M38 50v110M202 50v110', '#2E7D32', 2) + R(10, 160, 220, 16, '#6D4C41', 0, 3.5) + R(-4, 176, 248, 68, '#BCAAA4', 0, 0)
      + P('M90 70h60l-8 90h-44z', '#F8BBD0', 3.5) + P('M92 80h56l-6 70h-44z', '#F06292', 0) + ring(4, (k) => Lc(`M${100 + k * 10} 92c4 10-4 20 2 34`, '#FFFFFF', 3))
      + ring(10, (k) => C(100 + (k % 5) * 10, 136 + Math.floor(k / 5) * 8, 1.8, INK, 0)) + ring(2, (k) => R(102 + k * 22, 80, 14, 12, '#E1F5FE', 2, 2))
      + Lc('M134 70l14-40', '#4CAF50', 5) + face(120, 112, 0.36)),

  // ---------- Langkawi
  L('my/langkawi/landmark-gunungraya.v1.svg', 'ยอดเขากูนุงรายา จุดที่สูงที่สุดของลังกาวี', 'Gunung Raya, the highest peak on Langkawi', ['gunung raya', 'กูนุงรายา', 'highest peak', 'ยอดเขาสูงสุด', 'mountain drive', 'ขับรถขึ้นเขา', 'cloud forest', 'ป่าเมฆ', 'view of the islands', 'วิวหมู่เกาะ', 'summit lookout', 'จุดชมวิวบนยอด'], 'หาเกาะเล็กๆ ในทะเลข้างล่าง', 'Find the little islands in the sea far below',
    // a big rounded jungle mountain with a ribbon of road curling gently up its side to a small white lookout platform on top, bands of white cloud wrapping it, a blue sea far below with a scatter of tiny islands
    sky('#E1F5FE') + R(-4, 170, 248, 74, '#4FC3F7', 0, 0) + ring(5, (k) => P(`M${10 + k * 52} 196c4-14 24-14 28 0z`, '#66BB6A', 2.5))
      + P('M-4 190c30-60 60-140 124-150 64 10 96 90 128 150z', '#388E3C', 3.5) + ring(8, (k) => C(40 + k * 22, 150 - Math.abs(k - 3.5) * 18, 12, '#43A047', 2))
      + Lc('M60 190c40-10 90-20 70-50s-40-30 10-60c20-12 0-24-10-32', '#FFF3E0', 5) + Lc('M60 190c40-10 90-20 70-50s-40-30 10-60c20-12 0-24-10-32', INK, 0)
      + R(100, 38, 40, 10, '#FFFFFF', 0, 3) + Lc('M106 48v-12h28v12', INK, 2.5) + kid(112, 34, '#EF5350', 0.6) + kid(128, 34, '#FFCA28', 0.6)
      + ring(3, (k) => g(30 + k * 90, 110 - (k % 2) * 30, 1, E(0, 0, 30, 9, '#FFFFFF', 2.5) + E(16, -6, 16, 8, '#FFFFFF', 0))) + face(180, 160, 0.4, 'none')),
  L('my/langkawi/landmark-charcoalkiln.v1.svg', 'เตาเผาถ่านโดมอิฐริมป่าชายเลน', 'The domed charcoal kilns beside the mangroves', ['charcoal kiln', 'เตาเผาถ่าน', 'mangrove charcoal', 'ถ่านไม้โกงกาง', 'brick domes', 'โดมอิฐ', 'river village', 'หมู่บ้านริมน้ำ', 'smoke curls', 'ควันลอยขึ้น', 'stacked logs', 'กองฟืน'], 'หาประตูเล็กๆ ของเตาเผาถ่าน', 'Find the little door of the charcoal kiln',
    // two big rounded brick-red kiln domes like giant upside-down bowls, each with a small arched door, wisps of grey smoke from the tops, neat stacks of mangrove logs, mangrove trees on stilt roots and a river behind, one dome smiling
    sky('#E0F2F1') + R(-4, 110, 248, 40, '#4DB6AC', 0, 0) + ring(6, (k) => g(10 + k * 46, 112, 1, C(0, -20, 18, '#43A047', 2.5) + Lc('M-10 0l6-14M10 0l-6-14M0 0v-14', '#6D4C41', 2.5)))
      + R(-4, 150, 248, 94, '#D7CCC8', 0, 0) + Lc('M-4 150h248', INK, 3)
      + ring(2, (k) => { const x = 70 + k * 100; return P(`M${x - 50} 214c0-60 20-90 50-90s50 30 50 90z`, '#D84315', 3.5) + ring(4, (j) => Lc(`M${x - 44 + j * 4} ${196 - j * 18}h${88 - j * 8}`, '#BF360C', 2)) + P(`M${x - 12} 214v-20c0-14 24-14 24 0v20z`, '#3E2723', 3) + Lc(`M${x} 124c-8-12 8-20 0-34`, '#BDBDBD', 6); })
      + face(70, 160, 0.45) + ring(3, (k) => g(196, 226 - k * 10, 1, ring(4, (j) => C(-24 + j * 16, 0, 6, '#8D6E63', 2))))),
  L('my/langkawi/landmark-telagaharbour.v1.svg', 'เรือใบจอดเรียงในอ่าวเตลากาฮาร์เบอร์', 'The sailboats of Telaga Harbour', ['telaga harbour', 'เตลากาฮาร์เบอร์', 'marina', 'มารีน่า', 'sailboats', 'เรือใบ', 'pantai kok', 'ปันไตโกะ', 'tall masts', 'เสากระโดงเรือ', 'dinner by the boats', 'มื้อเย็นริมท่าเรือ'], 'หาเรือใบที่มีใบสีแดง', 'Find the sailboat with the red sail',
    // a calm bay under green jungle mountains, a wooden pontoon, three white yachts with tall masts moored side by side, one with a red sail half up, colourful waterfront buildings with arches and their reflections
    sky('#B3E5FC') + P('M-4 100c40-60 80-70 120-40s60-50 128-20v60H-4z', '#43A047', 3.5) + ring(3, (k) => R(20 + k * 70, 80, 50, 34, ['#FFCC80', '#FFF8E1', '#F8BBD0'][k], 0, 3) + P(`M${30 + k * 70} 114v-12c0-10 14-10 14 0v12z`, '#FFFFFF', 2))
      + R(-4, 114, 248, 130, '#4FC3F7', 0, 0) + Lc('M-4 114h248', INK, 3) + R(-4, 200, 248, 12, '#A1887F', 0, 3)
      + ring(3, (k) => { const x = 50 + k * 70; return P(`M${x - 30} 180h60l-10 16h-40z`, '#FFFFFF', 3) + Lc(`M${x} 180v-${80 + k * 6}`, INK, 3) + (k === 1 ? P(`M${x} 108l34 66h-34z`, '#E53935', 3) : P(`M${x} 120l4 56h-4z`, '#ECEFF1', 2)) + Lc(`M${x - 20} 220c6-4 12 4 18 0`, '#B3E5FC', 2); })
      + face(50, 188, 0.25)),
  L('my/langkawi/landmark-rubbertapping.v1.svg', 'กรีดยางเก็บน้ำยางในสวนยางพารา', 'Tapping latex in a rubber plantation', ['rubber tapping', 'กรีดยาง', 'latex cup', 'ถ้วยรับน้ำยาง', 'rubber trees', 'ต้นยางพารา', 'white latex', 'น้ำยางสีขาว', 'village visit', 'เที่ยวหมู่บ้าน', 'rubber sheets', 'แผ่นยางตากแห้ง'], 'หาถ้วยเล็กที่รับน้ำยางสีขาว', 'Find the little cup catching the white latex',
    // rows of slim rubber trees in soft green light, one big trunk in front with a neat slanting cut spiralling round it, a white line of latex running down a spout into a small cup tied to the bark, a rubber sheet hung to dry
    sky('#DCEDC8') + ring(6, (k) => R(8 + k * 40, 20, 12, 200, '#A1887F', 0, 2.5) + C(14 + k * 40, 20, 24, '#7CB342', 2.5)) + R(-4, 210, 248, 34, '#A1887F', 0, 0)
      + R(90, -4, 50, 220, '#8D6E63', 0, 4) + Lc('M90 70l50 20M90 80l50 20', '#5D4037', 2.5) + Lc('M140 100l-36-14', '#FFFFFF', 3)
      + Lc('M104 86v40', '#FFFFFF', 3) + Lc('M100 126h10', '#90A4AE', 3) + Lc('M90 140h50', '#6D4C41', 2.5)
      + g(110, 152, 1, P('M-18-10h36l-6 26h-24z', '#ECEFF1', 3) + E(0, -10, 18, 5, '#FFFFFF', 2.5) + face(0, 4, 0.28))
      + Lc('M150 170h90', INK, 2) + R(170, 172, 40, 40, '#FFF3E0', 2, 2.5) + ring(4, (k) => Lc(`M${174 + k * 10} 176v32`, '#E0C9A6', 1.5))),
  L('my/langkawi/landmark-fiddlercrabs.v1.svg', 'ปูก้ามดาบโบกก้ามบนเลนป่าชายเลน', 'Fiddler crabs waving their big claws on the mangrove mud', ['fiddler crabs', 'ปูก้ามดาบ', 'one giant claw', 'ก้ามข้างเดียวโต', 'mangrove mud', 'เลนป่าชายเลน', 'kilim river', 'แม่น้ำคีลิม', 'low tide', 'ตอนน้ำลง', 'crab burrows', 'รูปู'], 'หาปูที่มีก้ามสีส้มข้างเดียว', 'Find the crab with one big orange claw',
    // shiny brown mud at low tide with burrow holes, mangrove stilt roots arching behind, three little blue fiddler crabs each waving one huge orange claw high, eyes on stalks, smiling
    sky('#E0F2F1') + ring(4, (k) => g(30 + k * 60, 110, 1, C(0, -40, 26, '#43A047', 2.5) + Lc('M0-20v20M0 0c-14 10-18 30-24 40M0 0c14 10 18 30 24 40M0 10c-4 10-6 20-6 30', '#6D4C41', 3)))
      + R(-4, 150, 248, 94, '#8D6E63', 0, 0) + Lc('M-4 150c40-6 80 6 120 0s80-6 128 0', INK, 3) + ring(5, (k) => E(20 + k * 52, 226 - (k % 2) * 30, 7, 3.5, '#4E342E', 0))
      + ring(3, (k) => g(52 + k * 68, 196 - (k % 2) * 14, 0.9 + (k === 1 ? 0.2 : 0), E(0, 0, 22, 14, '#4FC3F7', 3) + Lc('M-8-12v-10M8-12v-10', INK, 2.5) + C(-8, -24, 3.5, INK, 0) + C(8, -24, 3.5, INK, 0)
        + Lc('M-18 8l-10 10M-14 12l-6 10M18 8l10 10', INK, 2.5) + P('M16-6l14-30c10-4 18 4 14 14l-18 22z', '#FF7043', 3) + face(0, 2, 0.22, 'none')))),

  // ---------- India, the country
  K('in.food.chai', 'ชาไจเครื่องเทศในถ้วยดินเผากุลฮัด', 'Masala chai in a little clay kulhad cup', ['masala chai', 'ชาไจเครื่องเทศ', 'kulhad', 'ถ้วยดินเผากุลฮัด', 'chai wallah', 'คนขายชาไจ', 'spiced milk tea', 'ชานมใส่เครื่องเทศ', 'pouring from high', 'รินจากที่สูง', 'station tea', 'ชาที่สถานีรถไฟ'],
    // a dented steel kettle tipped high above, a long caramel stream of tea pouring down into a small round terracotta cup with a smiling face, frothy top, green cardamom pods, a cinnamon stick and a knob of ginger beside
    g(66, 62, 1, P('M-34-20h50c8 0 12 6 12 12v24c0 8-6 14-14 14h-42c-8 0-12-6-12-14v-24c0-6 4-12 6-12z', '#B0BEC5', 3.5) + P('M28 0l30 14-4 6-28-8z', '#B0BEC5', 3) + P('M-20-20c0-16 30-16 30 0', 'none', 3), 20)
      + Lc('M128 92c4 30 2 60 0 86', '#C68B59', 6) + Lc('M128 92c4 30 2 60 0 86', INK, 0)
      + P('M92 170h72l-8 54h-56z', '#D2691E', 3.5) + E(128, 170, 36, 9, '#E6B07E', 3) + E(128, 170, 28, 5, '#FFF3E0', 0) + face(128, 196, 0.42)
      + ring(3, (k) => g(186 + k * 14, 214 - (k % 2) * 8, 1, E(0, 0, 6, 9, '#8BC34A', 2), 20)) + g(36, 208, 1, R(-26, -5, 52, 10, '#8D6E63', 4, 2.5) + Lc('M-20 0h40', '#6D4C41', 1.5), -10)),
  K('in.food.cholebhature', 'โชเลบาตูเร ขนมปังพองลมกับแกงถั่วลูกไก่', 'Chole bhature, puffed-up fried bread with chickpea curry', ['chole bhature', 'โชเลบาตูเร', 'puffed bread', 'ขนมปังพองลม', 'chickpea curry', 'แกงถั่วลูกไก่', 'pickled onion', 'หอมดอง', 'green chilli', 'พริกเขียว', 'delhi breakfast', 'อาหารเช้าเดลี'],
    // a steel plate with a huge golden balloon of puffed fried bread swelling up like a pillow and smiling, a bowl of brown chickpea curry topped with sliced red onion and coriander, a green chilli and a lemon wedge
    E(120, 180, 108, 34, '#CFD8DC', 4) + E(120, 176, 94, 26, '#ECEFF1', 2)
      + P('M24 170c-10-40 10-90 60-96 50-6 80 30 76 80-2 20-30 30-70 30-40 0-62-6-66-14z', '#FFCA28', 4) + P('M50 110c10-14 30-20 46-16', 'none', 3) + ring(4, (k) => C(50 + k * 22, 140 + (k % 2) * 10, 3, '#FFB300', 0)) + face(92, 132, 0.55)
      + P('M150 170h70c0 20-14 30-35 30s-35-10-35-30z', '#FFFFFF', 3.5) + E(185, 170, 35, 9, '#A1673F', 3) + ring(7, (k) => C(164 + (k % 4) * 12, 168 + Math.floor(k / 4) * 4, 3.5, '#E6C38F', 1.5))
      + Lc('M172 164c4-4 8-4 12 0M190 166c4-4 8-4 12 0', '#AB47BC', 2.5)
      + g(200, 124, 1, Lc('M0 0c10 10 14 24 10 36', '#43A047', 7), 0) + g(214, 210, 1, P('M-12 0a12 12 0 0 1 24 0z', '#FFEB3B', 2.5))),
  K('in.animal.blackbuck', 'แอนทิโลปแบล็กบัคเขาเกลียวยาว', 'A blackbuck with long spiral horns', ['blackbuck', 'แบล็กบัค', 'indian antelope', 'แอนทิโลปอินเดีย', 'spiral horns', 'เขาเกลียว', 'open grassland', 'ทุ่งหญ้าโล่ง', 'speedy leaps', 'กระโดดเร็ว', 'velavadar', 'เวลาวาดาร์'],
    // a slender antelope standing in short grass, dark chocolate-black back, snow-white belly and white eye rings, two long corkscrew horns twisting up in a V, thin legs mid-step, a gentle smiling face
    ring(6, (k) => P(`M${20 + k * 36} 214l6-16 6 16z`, '#9CCC65', 2)) + Lc('M14 214h212', '#7CB342', 4)
      + P('M70 130c0-20 20-30 60-30s60 10 60 30c0 20-20 30-60 30s-60-10-60-30z', '#3E2723', 3.5) + P('M80 140c20 14 80 14 100 0-6 16-30 22-50 22s-44-6-50-22z', '#FFFFFF', 2.5)
      + Lc('M88 154v58M108 158v54M154 158l6 54M174 152l10 58', INK, 5) + Lc('M188 120l14-6', INK, 4)
      + P('M64 118c-16-6-26-24-20-38 10-4 30 4 36 18z', '#4E342E', 3.5) + E(54, 104, 8, 7, '#FFFFFF', 0) + face(58, 100, 0.32)
      + Lc('M62 84c-4-10 6-14 2-24s6-14 2-24M74 86c4-10 14-12 12-24s10-14 10-26', '#5D4037', 5) + Lc('M60 82l6-4M64 70l6-4M64 58l6-4M76 80l6 2M82 68l6 2M86 56l6 2', '#BCAAA4', 2)),
  K('in.culture.rangoli', 'รังโกลี ลายดอกไม้จากผงสีหน้าประตูบ้าน', 'Rangoli, coloured powder patterns on the doorstep', ['rangoli', 'รังโกลี', 'coloured powder', 'ผงสี', 'doorstep pattern', 'ลายหน้าประตูบ้าน', 'flower petals', 'กลีบดอกไม้', 'kolam', 'โกลัม', 'festival welcome', 'ลายต้อนรับวันเทศกาล'],
    // a big round floor pattern made of coloured powder: rings of pink, orange, yellow and green petals around a smiling centre flower, dotted borders, and three little bowls of bright powder at the edge
    C(120, 120, 100, '#FFF8E1', 3.5) + ring(16, (k) => g(120 + Math.cos(k * 0.3927) * 84, 120 + Math.sin(k * 0.3927) * 84, 1, C(0, 0, 8, k % 2 ? '#29B6F6' : '#AB47BC', 2)))
      + ring(12, (k) => g(120, 120, 1, P('M0-70c14 10 14 30 0 38-14-8-14-28 0-38z', k % 2 ? '#FF7043' : '#EC407A', 2.5), k * 30))
      + ring(8, (k) => g(120, 120, 1, P('M0-36c10 6 10 18 0 24-10-6-10-18 0-24z', '#FFCA28', 2.5), k * 45 + 22))
      + C(120, 120, 18, '#66BB6A', 3) + face(120, 118, 0.32)
      + ring(3, (k) => g(30 + k * 90, 222 - (k === 1 ? 0 : 6), 1, P('M-16-6h32c0 12-6 16-16 16s-16-4-16-16z', '#B0BEC5', 2.5) + E(0, -6, 16, 5, ['#E91E63', '#FFC107', '#29B6F6'][k], 2)))),
  K('in.culture.carrom', 'แคร์รอม เกมกระดานดีดหมากด้วยนิ้ว', 'Carrom, the flick-the-disc board game', ['carrom', 'แคร์รอม', 'board game', 'เกมกระดาน', 'striker', 'ตัวดีด', 'corner pockets', 'หลุมมุมกระดาน', 'flick with a finger', 'ดีดด้วยนิ้ว', 'family game', 'เกมครอบครัว'],
    // a square wooden board with a dark frame and round net pockets in the four corners, a ring in the middle with black and cream discs around a red queen that smiles, the big striker disc and a child's finger ready to flick
    R(16, 16, 208, 208, '#6D4C41', 14, 4) + R(36, 36, 168, 168, '#FFE0B2', 4, 3) + ring(4, (k) => C(k % 2 ? 190 : 50, k < 2 ? 50 : 190, 11, '#3E2723', 2.5))
      + C(120, 120, 34, 'none', 2.5) + Lc('M60 172h120M60 68h120', '#C62828', 2)
      + ring(8, (k) => C(120 + Math.cos(k * 0.785) * 22, 120 + Math.sin(k * 0.785) * 22, 8, k % 2 ? '#212121' : '#FFF8E1', 2.5)) + C(120, 120, 10, '#E53935', 2.5) + face(120, 119, 0.18)
      + C(150, 172, 12, '#FFFFFF', 3) + Lc('M152 190c4 10 10 22 18 30', '#FFE0BD', 10) + Lc('M152 190c4 10 10 22 18 30', INK, 0)),

  // ---------- Delhi, Agra and Jaipur
  L('in/golden/landmark-humayun.v1.svg', 'สุสานหุมายุน หินทรายแดงกับโดมขาวกลางสวน', 'Humayun’s Tomb, red stone and a white dome in a garden', ['humayuns tomb', 'สุสานหุมายุน', 'red sandstone', 'หินทรายแดง', 'white marble dome', 'โดมหินอ่อนขาว', 'charbagh garden', 'สวนสี่ส่วน', 'water channels', 'รางน้ำในสวน', 'nizamuddin', 'นิซามุดดิน'], 'หารางน้ำตรงที่พาไปหาอาคาร', 'Find the straight water channel leading to the building',
    // a wide red sandstone building on a high arched platform, white marble outlines, big arched alcoves, a round white double dome with a little golden tip, small domed kiosks on the roof corners, a straight water channel and lawns in front (the building only)
    sky('#FFF3E0') + R(-4, 184, 248, 60, '#9CCC65', 0, 0) + P('M108 244l6-60h12l6 60z', '#4FC3F7', 2.5)
      + R(16, 150, 208, 34, '#C0583A', 0, 3.5) + ring(7, (k) => P(`M${24 + k * 29} 184v-18c0-10 18-10 18 0v18z`, '#8D3B25', 2))
      + R(46, 90, 148, 60, '#D9704F', 0, 3.5) + Lc('M46 96h148', '#FFFFFF', 3) + P('M102 150v-38c0-20 36-20 36 0v38z', '#8D3B25', 3) + ring(2, (k) => P(`M${58 + k * 104} 140v-24c0-12 20-12 20 0v24z`, '#8D3B25', 2.5))
      + P('M80 90c0-56 80-56 80 0z', '#FFFFFF', 3.5) + R(80, 84, 80, 8, '#ECEFF1', 0, 2.5) + Lc('M120 34v-12', '#FFC107', 4) + C(120, 20, 4, '#FFC107', 2)
      + ring(2, (k) => g(52 + k * 136, 90, 1, Lc('M-8 0v-12M8 0v-12', INK, 2.5) + P('M-12-12h24c0-14-24-14-24 0z', '#FFFFFF', 2.5)))),
  L('in/golden/landmark-silverurns.v1.svg', 'โถเงินยักษ์ในพระราชวังซิตี้พาเลซชัยปุระ', 'The giant silver urns in Jaipur’s City Palace', ['silver urns', 'โถเงินยักษ์', 'gangajali', 'คงคาชลี', 'city palace jaipur', 'ซิตี้พาเลซชัยปุระ', 'biggest silver vessels', 'ภาชนะเงินใหญ่ที่สุด', 'diwan-e-khas', 'ดิวาน-อี-คาส', 'pink courtyard', 'ลานสีชมพู'], 'หาเด็กที่ตัวเล็กกว่าโถเงิน', 'Find the child who is smaller than the silver urn',
    // a pink sandstone hall with scalloped arches, two enormous shiny silver urns with round bellies, narrow necks and lids, taller than the children beside them, a sparkle on each
    sky('#F8BBD0') + R(-4, 200, 248, 44, '#FFE0B2', 0, 0) + Lc('M-4 200h248', INK, 3)
      + ring(3, (k) => P(`M${10 + k * 78} 200v-120c0-20 20-30 30-30s30 10 30 30v120z`, '#F48FB1', 3) + R(4 + k * 78, 70, 4, 130, '#EC407A', 0, 0))
      + ring(2, (k) => { const x = 74 + k * 92; return P(`M${x - 40} 150c0-40 20-60 40-60s40 20 40 60-18 50-40 50-40-10-40-50z`, '#CFD8DC', 3.5) + R(x - 12, 70, 24, 22, '#B0BEC5', 0, 3) + P(`M${x - 18} 70c0-14 36-14 36 0z`, '#ECEFF1', 3) + Lc(`M${x - 34} 150h68`, '#90A4AE', 2.5) + P(`M${x + 18} 112l3-8 3 8 8 3-8 3-3 8-3-8-8-3z`, '#FFFFFF', 1.5); })
      + face(74, 156, 0.5) + kid(120, 230, '#FFCA28', 0.9) + kid(212, 230, '#29B6F6', 0.9)),
  L('in/golden/landmark-marbleinlay.v1.svg', 'งานฝังหินสีบนหินอ่อนขาวของเมืองอัครา', 'Agra marble inlay, flowers of coloured stone set in white marble', ['marble inlay', 'งานฝังหินอ่อน', 'pietra dura', 'ปิเอตราดูรา', 'parchin kari', 'ปาร์ชินการี', 'coloured stones', 'หินสี', 'white marble plate', 'จานหินอ่อนขาว', 'agra workshop', 'โรงงานฝีมือในอัครา'], 'หาดอกไม้ที่ทำจากหินสีแดง', 'Find the flower made of red stones',
    // a craftsman's low wooden bench: a round white marble plate inlaid with a flower vine of red, green, blue and yellow stone pieces, a smiling face in the centre flower, tiny chips of coloured stone and a small bow-drill and file beside it
    sky('#EDE7F6') + R(-4, 170, 248, 74, '#A1673F', 0, 3) + Lc('M-4 200h248', '#8D5A33', 2)
      + C(110, 120, 84, '#FFFFFF', 4) + C(110, 120, 74, 'none', 2) + Lc('M110 120c30-20 40-50 70-50M110 120c-30 20-40 50-70 50M110 120c-30-20-40-50-70-50', '#4CAF50', 3)
      + ring(5, (k) => g(110, 120, 1, P('M0-12c8-12 22-6 18 8z', '#E53935', 2), k * 72)) + C(110, 120, 10, '#FFCA28', 2) + face(110, 118, 0.2, 'none')
      + ring(6, (k) => g(110 + Math.cos(k * 1.05 + 0.4) * 52, 120 + Math.sin(k * 1.05 + 0.4) * 52, 1, P('M0-8c8 0 10 12 0 16-10-4-8-16 0-16z', ['#43A047', '#1E88E5', '#FFB300'][k % 3], 2), k * 60))
      + ring(5, (k) => P(`M${180 + k * 10} ${208 - (k % 2) * 6}l5-6 5 6-5 4z`, ['#E53935', '#43A047', '#1E88E5', '#FFB300', '#AB47BC'][k], 1.5))
      + g(40, 210, 1, R(-24, -4, 48, 8, '#8D6E63', 2, 2.5) + Lc('M-20 0c10-14 30-14 40 0', INK, 1.5), -10)),
  L('in/golden/landmark-turban.v1.svg', 'ลองโพกผ้าโพกหัวสีสดแบบราชสถาน', 'Trying on a bright Rajasthani turban', ['rajasthani turban', 'ผ้าโพกหัวราชสถาน', 'pagri', 'ปากรี', 'safa', 'ซาฟา', 'leheriya tie-dye', 'ผ้ามัดย้อมเลเฮริยา', 'try one on', 'ลองโพกดู', 'johari bazaar', 'ตลาดโจฮารี'], 'หาชายผ้าที่ห้อยลงมาข้างหลัง', 'Find the long tail of cloth hanging down the back',
    // a smiling child in the middle wearing a huge round wrapped turban in orange, pink and yellow zigzag stripes with a long tail of cloth down the back, a shop shelf behind with folded turbans and a long rolled cloth in many colours
    sky('#FFF3E0') + R(-4, 60, 248, 10, '#8D6E63', 0, 3) + ring(4, (k) => R(10 + k * 58, 30, 46, 30, ['#E53935', '#FFC107', '#43A047', '#AB47BC'][k], 6, 2.5))
      + R(-4, 200, 248, 44, '#D7CCC8', 0, 0) + Lc('M160 120c20 30 30 60 20 90', '#FF7043', 12) + Lc('M160 120c20 30 30 60 20 90', INK, 0)
      + P('M84 230v-50c0-14 12-22 36-22s36 8 36 22v50z', '#FFFFFF', 3.5) + C(120, 140, 30, '#FFE0BD', 3.5) + face(120, 144, 0.5)
      + P('M76 126c0-40 20-58 44-58s50 20 46 58c-30-10-60-10-90 0z', '#FF7043', 3.5) + Lc('M82 110l10-12 10 12 10-12 10 12 10-12 10 12 10-12 10 12', '#FFEB3B', 3) + Lc('M84 94l8-10 8 10 8-10 8 10 8-10 8 10 8-10 8 10', '#EC407A', 3)
      + R(-4, 120, 30, 8, '#29B6F6', 0, 2) + ring(3, (k) => R(196, 130 + k * 20, 40, 14, ['#FFEB3B', '#26A69A', '#EF5350'][k], 4, 2.5))),

  // ---------- Nepal, the country
  K('np.food.yomari', 'โยมารี ขนมแป้งข้าวรูปหยดน้ำไส้น้ำตาลอ้อย', 'Yomari, pointed rice-flour dumplings filled with molasses', ['yomari', 'โยมารี', 'newari sweet', 'ขนมชาวเนวาร์', 'rice flour dumpling', 'ขนมแป้งข้าวนึ่ง', 'chaku molasses', 'น้ำตาลอ้อยชากู', 'sesame filling', 'ไส้งา', 'winter treat', 'ขนมหน้าหนาว'],
    // three plump white steamed dumplings shaped like fat teardrops with long pointed tails, on a leaf plate, the front one bitten to show dark brown molasses and sesame inside, the middle one smiling
    E(120, 182, 104, 30, '#7CB342', 3.5) + Lc('M30 182h180', '#558B2F', 2)
      + ring(2, (k) => g(64 + k * 112, 150, 0.8, P('M-30 10c0-30 20-44 30-44 4 0 6-24 22-40-4 24-2 40 8 46 10 10 4 38-30 40-20 2-30-6-30-2z', '#FFFDF7', 3.5), k ? 10 : -10))
      + g(120, 134, 1, P('M-34 16c0-34 22-50 34-50 4 0 6-28 26-46-4 28-2 46 8 52 12 12 4 44-34 46-24 2-34-6-34-2z', '#FFFFFF', 3.5) + face(-2, 6, 0.4))
      + g(64, 154, 0.8, E(-6, 8, 16, 10, '#6D4C41', 2.5) + ring(4, (k) => C(-14 + k * 6, 6 + (k % 2) * 4, 1.6, '#FFF8E1', 0)), -10)),
  K('np.food.samaybaji', 'สมัยบาจี สำรับเนวารีบนจานใบไม้', 'Samay baji, the Newari feast on a leaf plate', ['samay baji', 'สมัยบาจี', 'newari platter', 'สำรับเนวารี', 'beaten rice', 'ข้าวเม่า', 'black soybeans', 'ถั่วเหลืองดำคั่ว', 'boiled egg', 'ไข่ต้ม', 'leaf plate', 'จานใบไม้'],
    // a round plate stitched from green leaves, a heap of flat beaten rice in the middle, little piles around it: roasted black soybeans, a yellow potato salad, a red chutney, ginger slivers and a boiled egg that smiles
    C(120, 124, 100, '#8BC34A', 4) + ring(8, (k) => Lc(`M120 124L${(120 + Math.cos(k * 0.785) * 100).toFixed(1)} ${(124 + Math.sin(k * 0.785) * 100).toFixed(1)}`, '#689F38', 2)) + C(120, 124, 86, 'none', 2)
      + P('M80 130c0-30 20-40 40-40s40 10 40 40c-20 10-60 10-80 0z', '#FFF3E0', 3) + ring(12, (k) => Lc(`M${88 + (k % 6) * 12} ${108 + Math.floor(k / 6) * 12}l6-2`, '#E6C38F', 2))
      + E(64, 80, 22, 14, '#5D4037', 3) + ring(6, (k) => C(54 + (k % 3) * 10, 76 + Math.floor(k / 3) * 8, 3, '#3E2723', 0))
      + E(176, 80, 22, 14, '#FFD54F', 3) + E(60, 170, 20, 13, '#E53935', 3) + Lc('M156 176l14-8M162 182l14-8M168 188l14-8', '#FFE082', 3)
      + g(120, 186, 1, E(0, 0, 18, 13, '#FFFFFF', 3) + C(0, 0, 7, '#FFCA28', 0) + face(0, -2, 0.22))),
  K('np.culture.baghchal', 'บาฆจาล เกมกระดานเสือกับแพะ', 'Bagh chal, the board game of tigers and goats', ['bagh chal', 'บาฆจาล', 'tigers and goats', 'เสือกับแพะ', 'board game', 'เกมกระดาน', 'brass pieces', 'ตัวหมากทองเหลือง', 'strategy game', 'เกมวางแผน', 'played in the square', 'เล่นกันที่ลานเมือง'],
    // a square wooden board scored with a five-by-five grid and diagonal lines, four big orange striped tiger pieces in the corners and a cluster of small white round goat pieces, one tiger piece smiling
    R(20, 20, 200, 200, '#D7A86E', 12, 4) + ring(5, (k) => Lc(`M40 ${40 + k * 40}h160M${40 + k * 40} 40v160`, '#6D4C41', 2.5)) + Lc('M40 40l160 160M200 40l-160 160M120 40l80 80-80 80-80-80z', '#6D4C41', 2.5)
      + ring(4, (k) => g(k % 2 ? 200 : 40, k < 2 ? 40 : 200, 1, C(0, 0, 16, '#FF9800', 3) + Lc('M-8-12l4 8M8-12l-4 8M-14 2h6M14 2h-6', INK, 2.5) + (k === 0 ? face(0, 2, 0.24) : '')))
      + ring(6, (k) => C(100 + (k % 3) * 20, 120 + Math.floor(k / 3) * 40, 9, '#FFFDF7', 3))),
  K('np.culture.karuwa', 'การูวา กาน้ำทองเหลืองของเนปาล', 'A karuwa, the shiny brass water jug of Nepal', ['karuwa', 'การูวา', 'brass jug', 'กาน้ำทองเหลือง', 'water pot', 'หม้อใส่น้ำ', 'long spout', 'พวยยาว', 'patan metalwork', 'งานโลหะปาฏัน', 'gagri', 'หม้อกากรี'],
    // a round-bellied shiny brass jug on a little foot, a long curved spout and a small domed lid, engraved bands round its belly, a smiling face, and a fat copper water pot with a wide rim beside it
    g(96, 140, 1, P('M-46 0c0-36 20-56 46-56s46 20 46 56-20 50-46 50-46-14-46-50z', '#FFC107', 4) + R(-16, -76, 32, 22, '#FFB300', 0, 3.5) + P('M-20-76c0-16 40-16 40 0z', '#FFCA28', 3) + C(0, -94, 5, '#FFC107', 2.5)
      + Lc('M40-20c20-10 34-30 44-50', '#FFB300', 10) + Lc('M40-20c20-10 34-30 44-50', INK, 0) + R(-20, 48, 40, 12, '#FFB300', 0, 3)
      + Lc('M-42 14h84M-44 24h88', '#FF8F00', 2.5) + face(0, -6, 0.5) + P('M-26-34c6-8 14-10 20-10', 'none', 3))
      + g(190, 186, 1, P('M-30 0c0-24 14-34 30-34s30 10 30 34-14 30-30 30-30-6-30-30z', '#D84315', 3.5) + R(-14, -44, 28, 10, '#BF360C', 4, 3) + Lc('M-26 4h52', '#FFAB91', 2))),

  // ---------- Kathmandu
  L('np/kathmandu/landmark-thamel.v1.svg', 'ซอยแคบในย่านทาเมลกับสายไฟพันกันยุ่ง', 'A narrow lane in Thamel under a tangle of wires', ['thamel', 'ทาเมล', 'tangled wires', 'สายไฟพันกัน', 'trekking shops', 'ร้านอุปกรณ์เดินเขา', 'narrow lanes', 'ซอยแคบ', 'down jackets', 'เสื้อขนเป็ด', 'backpacker street', 'ถนนแบ็กแพ็กเกอร์'], 'หาก้อนสายไฟที่พันกันบนเสา', 'Find the knot of wires on the pole',
    // a narrow lane of tall brick buildings with carved wooden windows, blank colourful shop boards stacked up the walls, bright puffer jackets hanging outside a shop, a wooden pole holding a huge black knot of tangled wires looping across the lane, children walking below
    sky('#B3E5FC') + R(-4, -4, 80, 220, '#BF6F4A', 0, 3.5) + R(164, -4, 80, 220, '#A0522D', 0, 3.5) + R(76, 40, 88, 176, '#E0B98A', 0, 3) + R(-4, 210, 248, 34, '#9E9E9E', 0, 0) + Lc('M-4 210h248', INK, 3)
      + ring(3, (k) => R(10, 30 + k * 40, 50, 20, ['#FFEB3B', '#EF5350', '#29B6F6'][k], 3, 2.5)) + ring(2, (k) => R(176, 30 + k * 40, 56, 22, ['#66BB6A', '#FFA726'][k], 3, 2.5))
      + ring(2, (k) => R(92 + k * 34, 60, 24, 30, '#6D4C41', 0, 3) + Lc(`M${92 + k * 34} 75h24M${104 + k * 34} 60v30`, '#A1887F', 2))
      + ring(4, (k) => P(`M${176 + k * 14} 130h12v26c0 4-12 4-12 0z`, ['#E53935', '#1E88E5', '#FDD835', '#43A047'][k], 2.5)) + Lc('M170 128h64', INK, 2.5)
      + R(140, 96, 8, 120, '#8D6E63', 0, 3) + Lc('M-4 80c40 30 100 20 150 24M-4 92c50 20 110 10 150 14M148 104c30-10 60 0 96-14M148 110c30 4 60 0 96 6', INK, 2)
      + P('M126 96c10-20 30-20 34 0s-14 30-26 18-20-6-8-18z', 'none', 2.5) + C(144, 102, 12, '#424242', 2) + face(122, 150, 0.35)
      + kid(60, 236, '#EF5350', 0.8) + kid(106, 236, '#FFCA28', 0.8)),
  L('np/kathmandu/landmark-singingbowls.v1.svg', 'ร้านชามร้องเพลงในกาฐมาณฑุ', 'A singing-bowl shop in Kathmandu', ['singing bowls', 'ชามร้องเพลง', 'metal bowls', 'ชามโลหะ', 'rub the rim', 'ถูขอบชาม', 'humming sound', 'เสียงหึ่งๆ', 'bowl shop', 'ร้านขายชาม', 'handmade metal', 'โลหะทำมือ'], 'หาเด็กที่กำลังถูไม้รอบขอบชาม', 'Find the child rubbing the stick round the bowl’s rim',
    // a little shop with wooden shelves stacked with shiny golden-brown metal bowls of every size, on the counter in front a big bowl on a red cushion, a child circling a wooden stick round its rim, curved sound lines rising, the big bowl smiling
    sky('#FFF3E0') + R(-4, -4, 248, 150, '#A1673F', 0, 0) + ring(2, (k) => R(-4, 50 + k * 50, 248, 8, '#6D4C41', 0, 3))
      + ring(2, (j) => ring(6, (k) => { const w = 14 + ((k + j) % 3) * 6; return P(`M${20 + k * 38 - w} ${36 + j * 50}c0 18 ${w * 2} 18 ${w * 2} 0z`, ['#FFC107', '#D4A055', '#FFB300'][(k + j) % 3], 2.5); }))
      + R(-4, 150, 248, 94, '#8D6E63', 0, 3.5) + E(110, 172, 50, 14, '#E53935', 3)
      + P('M60 150c0 40 100 40 100 0z', '#FFC107', 4) + E(110, 150, 50, 10, '#FFE082', 3) + face(110, 172, 0.42)
      + Lc('M178 136c10 10 10 24 0 34M192 126c14 14 14 40 0 54M44 136c-10 10-10 24 0 34', '#FF8F00', 3)
      + kid(196, 228, '#29B6F6', 1.1) + Lc('M190 214l-40-56', '#6D4C41', 6) + Lc('M190 214l-40-56', INK, 0)),
  L('np/kathmandu/landmark-ranipokhari.v1.svg', 'สระรานีโปขรีกับศาลาสีขาวกลางน้ำ', 'Rani Pokhari, the queen’s pond with a white shrine in the middle', ['rani pokhari', 'รานีโปขรี', 'queens pond', 'สระของพระราชินี', 'white causeway', 'ทางเดินสีขาวกลางน้ำ', 'old kathmandu', 'กาฐมาณฑุเมืองเก่า', 'evening lights', 'ไฟยามเย็น', 'square pond', 'สระน้ำสี่เหลี่ยม'], 'หาทางเดินสีขาวที่พาไปกลางสระ', 'Find the white path leading to the middle of the pond',
    // a big square pond of green-blue water with a low white wall, a straight white causeway running across it to a small white domed shrine on a little island in the middle, ducks swimming, city houses beyond (the building only)
    sky('#FFF3E0') + ring(6, (k) => R(-4 + k * 42, 40 - (k % 2) * 10, 40, 40, ['#D7A86E', '#BF6F4A', '#E0B98A'][k % 3], 0, 2.5))
      + P('M10 80h220l14 160H-4z', '#FFFFFF', 3.5) + P('M22 92h196l10 136H12z', '#4DB6AC', 3)
      + P('M112 228l4-76h8l4 76z', '#FFFFFF', 3) + E(120, 150, 28, 12, '#FFFFFF', 3) + R(104, 118, 32, 32, '#FFFFFF', 0, 3) + P('M100 120c0-24 40-24 40 0z', '#FFFFFF', 3) + Lc('M120 96v-10', '#FFC107', 3) + P('M112 150v-14c0-8 16-8 16 0v14z', '#B2DFDB', 2)
      + Lc('M40 200c10-4 20 4 30 0M160 186c10-4 20 4 30 0', '#B2DFDB', 2.5)
      + ring(2, (k) => g(60 + k * 120, 130 + k * 30, 1, E(0, 0, 12, 7, '#FFFFFF', 2.5) + C(10, -8, 5, '#FFFFFF', 2.5) + P('M14-8l6 2-6 2z', '#FFA726', 1.5) + C(11, -9, 1.2, INK, 0)))),
  L('np/kathmandu/landmark-hiti.v1.svg', 'ฮิติ ก๊อกน้ำหินโบราณในลานลึกของปาฏัน', 'A hiti, the old stone water spouts in a sunken courtyard', ['hiti', 'ฮิติ', 'stone water spout', 'ก๊อกน้ำหิน', 'dhunge dhara', 'ธุงเงธารา', 'sunken courtyard', 'ลานลดระดับ', 'manga hiti', 'มังคาฮิติ', 'fetching water', 'ตักน้ำ'], 'หาน้ำที่ไหลออกจากปากหิน', 'Find the water pouring out of the stone spout',
    // a sunken stone courtyard with brick steps leading down, three carved stone spouts sticking out from the wall with curling snouts, streams of water splashing into a stone basin, a child filling a round brass pot, moss and ferns on the bricks
    sky('#FFF3E0') + R(-4, -4, 248, 60, '#BF6F4A', 0, 3) + ring(6, (k) => R(-4 + k * 42, 56 + k * 0, 40, 14, '#A0522D', 0, 2)) + R(20, 70, 200, 120, '#9E8F80', 0, 3.5)
      + ring(5, (k) => R(-4 + k * 10, 70 + k * 24, 26 - k * 2, 24, '#BCAAA4', 0, 2.5)) + ring(5, (k) => R(218 - k * 8, 70 + k * 24, 26, 24, '#BCAAA4', 0, 2.5))
      + ring(3, (k) => { const x = 70 + k * 50; return g(x, 108, 1, P('M-10-10h20l4 14c-2 10-10 14-18 12l-6-12z', '#9E9E9E', 3) + P('M-6 16c8 4 18-2 20-10', 'none', 2.5) + C(-2, -2, 2, INK, 0)) + Lc(`M${x + 6} 124c4 20 4 40 2 56`, '#4FC3F7', 5); })
      + R(30, 176, 180, 20, '#78909C', 0, 3) + E(120, 180, 84, 4, '#81D4FA', 0) + ring(4, (k) => C(32 + k * 60, 84, 6, '#7CB342', 2))
      + g(176, 228, 1, P('M-14-10c-4-16 32-16 28 0 4 12-4 20-14 20s-18-8-14-20z', '#FFC107', 3) + face(0, 0, 0.22)) + kid(150, 236, '#E53935', 0.9)),
  L('np/kathmandu/landmark-mountainmuseum.v1.svg', 'พิพิธภัณฑ์ภูเขานานาชาติที่โพขรา', 'The International Mountain Museum and its model peaks', ['international mountain museum', 'พิพิธภัณฑ์ภูเขานานาชาติ', 'model mountain', 'ภูเขาจำลอง', 'climbing gear', 'อุปกรณ์ปีนเขา', 'mountain people', 'ชาวภูเขา', 'snow peaks', 'ยอดเขาหิมะ', 'climbing wall', 'กำแพงปีนเขา'], 'หาภูเขาจำลองที่มีธงเล็กบนยอด', 'Find the model mountain with a tiny marker on top',
    // a museum building with three steep triangular roofs like snowy peaks, a real snowy range far behind, a big rocky model mountain in the garden in front with a tiny red marker on its summit, an ice axe and boots on display, children looking
    sky('#E3F2FD') + P('M-4 80l40-40 30 26 40-50 40 50 30-30 68 44v10H-4z', '#FFFFFF', 3)
      + R(-4, 190, 248, 54, '#AED581', 0, 0) + Lc('M-4 190h248', INK, 3)
      + R(30, 110, 180, 80, '#ECEFF1', 0, 3.5) + ring(3, (k) => P(`M${30 + k * 60} 112l30-44 30 44z`, '#78909C', 3.5) + P(`M${48 + k * 60} 86l12-18 12 18-6 4-6-4-6 4z`, '#FFFFFF', 2))
      + ring(3, (k) => R(48 + k * 60, 130, 24, 30, '#81D4FA', 0, 2.5)) + face(120, 172, 0.35)
      + P('M140 230l30-56 14 18 10-12 26 50z', '#9E9E9E', 3.5) + P('M164 186l6-12 6 8 6-2-8-14z', '#FFFFFF', 0) + Lc('M170 174v-14', INK, 2) + P('M170 160l10 4-10 4z', '#E53935', 1.5)
      + g(40, 226, 1, Lc('M0 0l20-40', '#8D6E63', 4) + P('M12-44h20l-4 6h-16z', '#90A4AE', 2.5)) + kid(100, 234, '#FFCA28', 0.8)),
];

export default { places: {}, items };
