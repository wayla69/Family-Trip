// Wave 9, Japan group part 3: Vietnam (the country), Da Nang & Hoi An, Hanoi, Ho Chi Minh City, Phu Quoc, Đà Lạt
// Shrines appear only as buildings, with no figures (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free, scene } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country-layer picture: vn.food.bunbohue → vn/food-bunbohue.v1.svg
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +v.toFixed(1);
const palm = (x, y, h, d = 1) => Lc(`M${x} ${y}c${d * 4}-${h / 2} ${-d * 2}-${h * 0.8} ${d * 8}-${h}`, '#6D4C41', 5)
  + ring(5, (j) => Lc(`M${x + d * 8} ${y - h}l${(-24 + j * 12) * d} ${-4 + Math.abs(j - 2) * 7}`, '#43A047', 4));

const items = [
  // ---------- Vietnam (the country)
  K('vn.food.bunbohue', 'บุ๋นบ่อเว้ ก๋วยเตี๋ยวเนื้อรสจัดจากเมืองเว้', 'Bún bò Huế, the spicy beef noodle soup of Huế', ['bun bo hue', 'bún bò huế', 'บุ๋นบ่อเว้', 'hue noodles', 'ก๋วยเตี๋ยวเว้', 'spicy beef noodles', 'ก๋วยเตี๋ยวเนื้อเผ็ด', 'lemongrass broth', 'น้ำซุปตะไคร้', 'round rice noodles'],
    // a big bowl of red-orange broth with chilli oil drops, thick round white noodles, thin beef slices and a round slice of pork knuckle, a plate of shredded banana blossom and herbs beside it
    P('M20 116h170c0 60-36 92-85 92s-85-32-85-92z', '#FFFFFF') + Lc('M30 140h150', '#1E88E5', 3) + E(105, 116, 85, 22, '#FFFFFF') + E(105, 116, 77, 17, '#E8642C', 3)
      + ring(7, (k) => C(44 + k * 20, 112 + (k % 2) * 8, 2.5, '#C62828', 0)) + ring(4, (k) => Lc(`M${52 + k * 26} 118c6 4 12-4 18 0`, '#FFF8E1', 6))
      + [[78, 106, -10], [112, 104, 8]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 16, 8, '#8D4A2B') + Lc('M-10 0h20', '#B07A5B', 2), r)).join('')
      + g(142, 112, 1, C(0, 0, 12, '#F3D0B0') + C(0, 0, 5, '#E8A07A', 2)) + ring(4, (k) => C(64 + k * 10, 128 - (k % 2) * 4, 3.5, '#7CB342', 1.5)) + face(105, 160, 0.44)
      + g(204, 92, 1, E(0, 0, 28, 12, '#FFFFFF') + ring(5, (k) => Lc(`M${-16 + k * 8} 2l4-12`, '#B39DDB', 3)) + P('M8-6c6-10 16-10 18 0-6 2-12 2-18 0z', '#43A047', 2))),
  K('vn.animal.saola', 'ซาวลา สัตว์หายากแห่งเทือกเขาเจื่องเซิน', 'The saola, the rare forest ox of the Annamite mountains', ['saola', 'ซาวลา', 'asian unicorn', 'ยูนิคอร์นแห่งเอเชีย', 'annamite mountains', 'เทือกเขาเจื่องเซิน', 'truong son', 'เจื่องเซิน', 'rare animal', 'สัตว์หายาก'],
    // a shy dark-brown forest animal with two long straight horns sweeping back side by side, white patches on its face, standing among big jungle leaves
    P('M-4 200c40-30 80-30 120-10s80-20 128 0v54H-4z', '#7CB342') + [[24, 120], [214, 110], [40, 60]].map(([x, y]) => P(`M${x} ${y}c-20-20-10-40 10-40 10 20 6 34-10 40z`, '#43A047', 2.5)).join('')
      + g(120, 150, 1, E(10, 10, 52, 30, '#6D4C41') + ring(4, (k) => R(-26 + k * 22 + (k > 1 ? 6 : 0), 30, 9, 40, '#5D4037', 3, 2.5)) + P('M60 0c8 4 10 12 8 18', 'none', 3)
        + P('M-30-10c-16-6-34 0-40 14-4 10 4 18 14 18 10 0 26-10 34-22z', '#6D4C41') + Lc('M-44-14l40-50M-36-12l42-48', '#3E2723', 4)
        + E(-58, 12, 6, 4, '#FFFFFF', 0) + E(-42, 4, 7, 5, '#FFFFFF', 0) + E(-48, 22, 8, 4, '#FFFFFF', 0) + E(-30, -2, 8, 5, '#8D6E63', 2) + face(-50, 4, 0.28))),
  K('vn.culture.tohe', 'ตั่วเห่ ตุ๊กตาแป้งข้าวปั้นสีสดเสียบไม้', 'Tò he, colourful rice-dough figures on sticks', ['to he', 'tò he', 'ตั่วเห่', 'rice dough toys', 'ตุ๊กตาแป้งข้าว', 'xuan la', 'ซวนลา', 'dough figurines', 'ตุ๊กตาปั้น', 'folk toys', 'ของเล่นพื้นบ้าน'],
    // a straw bundle bristling with bamboo sticks, each topped with a tiny bright figure of rice dough: a buffalo, a fish, a flower and a little bird
    P('M90 230l10-80h40l10 80z', '#E6C27A') + ring(5, (k) => Lc(`M${98 + k * 10} 150l${-2 + k} 78`, '#C8A16B', 2))
      + [[60, 60, -30], [120, 40, 0], [176, 58, 28], [96, 86, -12], [150, 90, 14]].map(([x, y]) => Lc(`M${x} ${y + 14}L120 154`, '#D7A86E', 3)).join('')
      + g(60, 60, 1, E(0, 0, 20, 12, '#5D6D7E') + C(-18, -4, 9, '#5D6D7E') + Lc('M-24-10c-6-8-2-12 4-12M-14-12c4-8 10-8 12 0', '#ECEFF1', 3) + face(-18, -4, 0.2))
      + g(120, 38, 1, E(0, 0, 18, 10, '#FF7043') + P('M16 0l12-10v20z', '#FFB300', 2) + C(-8, -2, 2, '#22213A', 0))
      + g(176, 56, 1, ring(5, (k) => { const a = k * 2 * Math.PI / 5; return C(f1(9 * Math.cos(a)), f1(9 * Math.sin(a)), 7, '#EC407A', 2); }) + C(0, 0, 5, '#FFEB3B', 2))
      + g(96, 86, 1, E(0, 0, 12, 9, '#29B6F6') + C(10, -6, 6, '#29B6F6') + P('M16-6l6 2-6 2z', '#FFB300', 1.5) + P('M-12 0l-8-8v14z', '#AB47BC', 2))
      + g(150, 90, 1, R(-10, -10, 20, 20, '#66BB6A', 8) + face(0, 0, 0.24))),
  K('vn.culture.ngomon', 'ประตูโง้มอนแห่งพระราชวังเว้', 'The Ngọ Môn gate of the Huế Imperial City', ['ngo mon', 'ngọ môn', 'โง้มอน', 'hue imperial city', 'พระราชวังเว้', 'hue citadel', 'ป้อมปราการเว้', 'noon gate', 'ประตูเที่ยงวัน', 'five phoenix pavilion', 'หอห้าหงส์'],
    // a massive stone gate base with three arched openings, topped by a long two-storey wooden pavilion with golden-yellow roofs and red pillars, a lotus moat in front
    sky('#FFF8E1') + R(-4, 210, 248, 34, '#80CBC4', 0, 0) + ring(4, (k) => C(30 + k * 60, 222, 7, '#F48FB1', 2))
      + R(14, 130, 212, 80, '#A1887F') + ring(10, (k) => Lc(`M${14 + k * 22} 150h12M${24 + k * 22} 170h12M${14 + k * 22} 190h12`, '#8D6E63', 2)) + ring(3, (k) => P(`M${64 + k * 48} 210v-34c0-14 22-14 22 0v34z`, '#4E342E', 2.5))
      + R(40, 104, 160, 26, '#C62828') + ring(8, (k) => Lc(`M${48 + k * 21} 106v22`, '#8E1B1B', 3)) + P('M26 108l14-14h160l14 14z', '#F9A825')
      + R(70, 76, 100, 20, '#C62828') + P('M56 80l14-14h100l14 14z', '#F9A825') + P('M100 66l20-14 20 14z', '#F9A825', 2.5) + face(120, 116, 0.3)),
  K('vn.food.xoigac', 'โซยกั๊ก ข้าวเหนียวแดงจากผลฟักข้าว', 'Xôi gấc, red sticky rice coloured by gac fruit', ['xoi gac', 'xôi gấc', 'โซยกั๊ก', 'gac fruit', 'ฟักข้าว', 'red sticky rice', 'ข้าวเหนียวแดง', 'tet', 'เทศกาลเต็ด', 'lucky red', 'สีแดงนำโชค'],
    // a flower-shaped mound of glossy red sticky rice on a banana leaf, a spiky orange gac fruit cut open beside it showing deep red seeds
    P('M14 190c40-30 170-34 210-6-40 30-170 34-210 6z', '#7CB342') + Lc('M30 190c60-12 120-14 180-4', '#558B2F', 3)
      + g(90, 150, 1, ring(6, (k) => { const a = k * Math.PI / 3; return C(f1(26 * Math.cos(a)), f1(20 * Math.sin(a)), 22, '#D32F2F', 2.5); }) + C(0, 0, 26, '#E53935') + ring(10, (k) => E(-18 + (k % 5) * 9, -8 + Math.floor(k / 5) * 14, 3, 2, '#FF8A80', 0)) + face(0, 0, 0.4))
      + g(176, 136, 1, C(0, 0, 32, '#FF9800') + ring(10, (k) => { const a = k * Math.PI / 5; return P(`M${f1(30 * Math.cos(a))} ${f1(30 * Math.sin(a))}l${f1(6 * Math.cos(a + 0.4))} ${f1(6 * Math.sin(a + 0.4))}`, 'none', 2.5); }) + C(0, 0, 20, '#FFB74D', 2) + ring(6, (k) => { const a = k * Math.PI / 3; return E(f1(10 * Math.cos(a)), f1(10 * Math.sin(a)), 5, 4, '#B71C1C', 1.5); }))),

  // ---------- Da Nang & Hoi An
  L('vn/danang/landmark-miquang.v1.svg', 'หมี่กว๋าง ก๋วยเตี๋ยวเส้นเหลืองน้ำน้อยแห่งกว๋างนาม', 'Mì Quảng, the turmeric noodles of Quảng Nam', ['mi quang', 'mì quảng', 'หมี่กว๋าง', 'quang nam', 'กว๋างนาม', 'turmeric noodles', 'เส้นขมิ้น', 'sesame rice cracker', 'ข้าวเกรียบงา', 'quail eggs', 'ไข่นกกระทา'], 'หาข้าวเกรียบงาแผ่นกลมใหญ่ที่เสียบอยู่ในชาม', 'Find the big round sesame cracker stuck in the bowl',
    // a wide bowl with flat yellow turmeric noodles in a shallow golden broth, prawns, pork, quail eggs, peanuts and herbs, a big round sesame rice cracker standing up at the back
    g(160, 80, 1, C(0, 0, 44, '#F6D08A') + ring(14, (k) => C(-30 + (k % 7) * 10, -12 + Math.floor(k / 7) * 18 + (k % 2) * 4, 2, '#5D4037', 0)), 10)
      + P('M20 124h200c0 50-40 84-100 84S20 174 20 124z', '#FFFFFF') + E(120, 124, 100, 24, '#FFFFFF') + E(120, 124, 92, 19, '#FFC107', 3)
      + ring(5, (k) => Lc(`M${44 + k * 32} 120c8 6 16-4 24 2`, '#FFE082', 8))
      + g(80, 112, 1, P('M-14 4c-4-14 8-24 20-18 10 6 6 18-4 18', '#FF7043', 2.5) + Lc('M-6-6l-6-8', '#E64A19', 2))
      + ring(2, (k) => g(118 + k * 26, 114, 1, E(0, 0, 9, 7, '#FFFFFF', 2) + C(0, 1, 4, '#FFB300', 0))) + ring(6, (k) => E(56 + k * 22, 132 + (k % 2) * 4, 4, 3, '#D7A86E', 1.5))
      + ring(4, (k) => P(`M${160 + k * 8} 112c4-8 10-8 12 0-4 2-8 2-12 0z`, '#43A047', 1.5)) + face(120, 170, 0.44)),
  L('vn/danang/landmark-baichoi.v1.svg', 'บ่ายจ่อย เกมไพ่ร้องเพลงที่ฮอยอัน', 'Bài chòi, Hội An\'s singing card game', ['bai choi', 'bài chòi', 'บ่ายจ่อย', 'folk card game', 'เกมไพ่พื้นบ้าน', 'hoi an old town', 'เมืองเก่าฮอยอัน', 'bamboo huts', 'กระท่อมไม้ไผ่', 'singing game', 'เกมร้องเพลง'], 'หากระบอกไม้ไผ่ที่มีไม้ไพ่เสียบอยู่ข้างใน', 'Find the bamboo tube with the card sticks inside',
    // two little bamboo huts on stilts with red flags, and in front a tall bamboo tube holding long wooden card sticks, one card pulled out showing a painted pattern, music notes in the air
    sky('#FFF8E1') + R(-4, 206, 248, 38, '#D7CCC8', 0, 0)
      + [[40, 120], [200, 120]].map(([x, y]) => Lc(`M${x - 20} ${y + 30}v56M${x + 20} ${y + 30}v56`, '#A1673F', 5) + R(x - 26, y, 52, 32, '#E6C27A', 0, 2.5) + P(`M${x - 32} ${y + 2}l32-26 32 26z`, '#C8A16B') + Lc(`M${x} ${y - 24}v-20`, '#8D6E63', 3) + P(`M${x} ${y - 44}l18 6-18 6z`, '#E53935', 2)).join('')
      + g(120, 150, 1, R(-18, -10, 36, 70, '#9CCC65', 6) + Lc('M-18 20h36M-18 40h36', '#689F38', 2.5) + ring(5, (k) => R(-14 + k * 6, -46 + (k % 2) * 6, 5, 40, '#FFF3E0', 1, 1.5)) + face(0, 30, 0.3))
      + g(170, 92, 1, R(-14, -24, 28, 48, '#FFF3E0', 3) + C(0, -8, 8, '#E53935', 2) + Lc('M-8 8h16M-8 14h16', '#1E88E5', 2.5), 14)
      + [[70, 60], [96, 44]].map(([x, y]) => C(x, y, 6, '#5C6BC0', 2) + Lc(`M${x + 5} ${y}v-18l10 5`, '#5C6BC0', 3)).join('')),
  L('vn/danang/landmark-swingbridge.v1.svg', 'สะพานแม่น้ำฮั่นที่หมุนได้ตอนกลางคืน', 'The Hàn River swing bridge that turns at night', ['han river bridge', 'สะพานแม่น้ำฮั่น', 'cau song han', 'cầu sông hàn', 'swing bridge', 'สะพานหมุน', 'han river', 'แม่น้ำฮั่น', 'bridge turning at night', 'สะพานหมุนกลางคืน'], 'หาลูกศรที่บอกว่าสะพานกำลังหมุนเปิดทาง', 'Find the arrows showing the bridge turning open',
    // a night river with a cable-stayed bridge whose middle span has swung round to lie along the river, lit in purple and blue, curved arrows showing it turning, a ship passing through the gap
    sky('#283593') + ring(5, (k) => C(20 + k * 50, 24 + (k % 2) * 12, 2.5, '#FFF59D', 0)) + R(-4, 140, 248, 104, '#1A237E', 0, 0) + ring(4, (k) => Lc(`M${20 + k * 60} ${170 + (k % 2) * 20}h30`, '#7986CB', 3))
      + R(-4, 120, 70, 14, '#B39DDB') + R(174, 120, 70, 14, '#B39DDB')
      + g(120, 150, 1, R(-70, -8, 140, 14, '#CE93D8') + R(-4, -70, 8, 70, '#E1BEE7') + Lc('M0-66L-60-6M0-66L60-6M0-50L-40-6M0-50L40-6', '#F3E5F5', 2) + face(0, 2, 0.24), -30)
      + Lc('M44 92c20-30 60-34 80-24', '#FFEB3B', 4) + P('M124 68l-12-4 6 12z', '#FFEB3B', 2) + Lc('M196 210c-20 30-60 34-80 24', '#FFEB3B', 4) + P('M116 234l12 4-6-12z', '#FFEB3B', 2)
      + g(196, 186, 1, P('M-24 0h48l-8 12h-32z', '#FFFFFF') + R(-10, -10, 20, 10, '#FF7043', 2, 2))),
  L('vn/danang/landmark-chammuseum.v1.svg', 'พิพิธภัณฑ์ศิลปะจามแห่งดานัง', 'The Museum of Cham Sculpture in Đà Nẵng', ['museum of cham sculpture', 'พิพิธภัณฑ์ศิลปะจาม', 'cham museum', 'พิพิธภัณฑ์จาม', 'bach dang street', 'ถนนบั๊กดัง', 'yellow museum', 'ตึกสีเหลือง', 'cham art', 'ศิลปะจาม'], 'หายอดหลังคาที่เป็นรูปหอคอยเล็กๆ แบบจาม', 'Find the little Cham-style towers on the roof',
    // a pale yellow colonial building with tall arched windows and a deep porch, small stepped Cham-style brick towers along its roof, frangipani-free palm trees in the garden
    sky('#E1F5FE') + R(-4, 204, 248, 40, '#A5D6A7', 0, 0)
      + R(30, 110, 180, 94, '#FFE082') + R(30, 104, 180, 10, '#FFCA28', 0, 3) + ring(6, (k) => P(`M${42 + k * 28} 190v-48c0-12 18-12 18 0v48z`, '#FFF8E1', 2.5))
      + R(96, 150, 48, 54, '#FFB300', 0, 2.5) + R(108, 162, 24, 42, '#6D4C41', 0, 2)
      + [[52, 104], [120, 104], [188, 104]].map(([x, y]) => P(`M${x - 12} ${y}v-14h24v14zM${x - 8} ${y - 14}v-10h16v10zM${x - 4} ${y - 24}v-8h8v8z`, '#BF6B4E', 2)).join('')
      + palm(12, 204, 90, 1) + palm(228, 204, 80, -1) + face(120, 132, 0.32)),
  L('vn/danang/landmark-boateyes.v1.svg', 'เรือฮอยอันที่มีตาวาดไว้ที่หัวเรือ', 'A Hội An boat with eyes painted on its bow', ['boat eyes', 'ตาเรือ', 'mat thuyen', 'mắt thuyền', 'painted eyes', 'ตาวาดที่หัวเรือ', 'thu bon river', 'แม่น้ำทูโบน', 'hoi an boat', 'เรือฮอยอัน', 'wooden river boat'], 'หาดวงตาสีขาวดำที่วาดไว้ที่หัวเรือ', 'Find the black-and-white eye painted on the front of the boat',
    // a wooden river boat painted red, blue and green, a big round watchful eye painted on its curved bow, sitting on a calm river at dusk, a curved roof over the middle
    sky('#FFE0B2') + C(190, 60, 20, '#FFCC80', 2.5) + R(-4, 150, 248, 94, '#4DB6AC', 0, 0) + Lc('M20 200h40M150 216h60', '#B2DFDB', 3)
      + P('M14 140c20 30 40 40 100 40s90-10 116-46c-30 10-80 14-120 14s-80-4-96-8z', '#1565C0') + P('M14 140c30 10 70 14 110 14s80-4 106-20l-4 14c-30 12-70 16-102 16-40 0-80-6-106-14z', '#E53935', 2.5)
      + Lc('M30 162c30 8 60 10 90 10s60-4 90-12', '#43A047', 4)
      + g(204, 154, 1, E(0, 0, 14, 9, '#FFFFFF', 2.5) + C(2, 0, 6, '#212121', 0) + C(4, -2, 2, '#FFFFFF', 0) + Lc('M-14-6q14-10 28 0', '#212121', 2.5))
      + P('M70 140c10-30 70-30 80 0z', '#8D6E63') + Lc('M80 140v-10M140 140v-10', '#6D4C41', 3) + face(110, 166, 0.3)),

  // ---------- Hanoi and Halong Bay
  L('vn/hanoi/landmark-banhcuon.v1.svg', 'บั๊ญก๊วน แผ่นแป้งนึ่งม้วนไส้หมูสับ', 'Bánh cuốn, steamed rice rolls', ['banh cuon', 'bánh cuốn', 'บั๊ญก๊วน', 'steamed rice rolls', 'แผ่นแป้งนึ่งม้วน', 'thanh tri', 'ทันห์จี', 'fried shallots', 'หอมเจียว', 'cloth steamer', 'ผ้านึ่งแป้ง'], 'หาแผ่นแป้งบางใสที่ถูกยกขึ้นจากผ้านึ่งด้วยไม้', 'Find the thin see-through sheet being lifted off the cloth with a stick',
    // a pot of steam with a cloth stretched over the top, a thin silky rice sheet being lifted off with a flat bamboo stick, a plate of rolled rice sheets sprinkled with fried shallots and a bowl of dipping sauce
    g(70, 110, 1, P('M-50 0h100v50c0 10-20 16-50 16s-50-6-50-16z', '#90A4AE') + E(0, 0, 50, 12, '#FFFFFF') + E(0, 0, 40, 8, '#ECEFF1', 2) + Lc('M-30-20q-6-10 0-20M10-22q-6-10 0-20', '#ECEFF1', 4)
      + P('M-34-6c10-20 50-28 70-18l-6 6c-20-6-50 0-60 16z', '#FFFFFF', 2.5) + Lc('M20-30l40-30', '#D7A86E', 5))
      + E(150, 186, 80, 24, '#FFFFFF') + E(150, 182, 68, 18, '#E1F5FE', 2.5)
      + ring(4, (k) => g(110 + k * 26, 180, 1, R(-12, -8, 24, 18, '#FAFAFA', 8) + Lc('M-8-2c4-2 12-2 16 0', '#E0E0E0', 1.5))) + ring(8, (k) => C(110 + k * 10, 174 + (k % 2) * 6, 2.2, '#C9832E', 0))
      + face(150, 196, 0.3) + g(46, 206, 1, P('M-22-8h44c0 14-10 22-22 22s-22-8-22-22z', '#FFFFFF') + E(0, -8, 22, 6, '#F6C25B') + C(-6, -9, 2.5, '#E53935', 0))),
  L('vn/hanoi/landmark-bundau.v1.svg', 'บุ๋นเดิ่วหมั่มโตม เส้นหมี่กับเต้าหู้ทอดบนกระด้ง', 'Bún đậu mắm tôm, noodles and fried tofu on a bamboo tray', ['bun dau mam tom', 'bún đậu mắm tôm', 'บุ๋นเดิ่ว', 'fried tofu', 'เต้าหู้ทอด', 'rice noodle squares', 'เส้นหมี่อัดก้อน', 'bamboo tray', 'กระด้งไม้ไผ่', 'shrimp paste dip', 'กะปิเวียดนาม'], 'หาก้อนเต้าหู้ทอดสีเหลืองทองบนกระด้ง', 'Find the golden fried tofu cubes on the tray',
    // a round woven bamboo tray lined with a banana leaf, holding pressed squares of white rice noodles, golden fried tofu cubes, herbs, sliced cucumber and a little bowl of purple shrimp-paste dip
    C(120, 136, 100, '#D7A86E') + C(120, 136, 90, 'none', 2.5) + ring(8, (k) => Lc(`M${40 + k * 22} 56l0 160`, '#C8A16B', 1.5)) + C(120, 136, 80, '#7CB342', 2.5)
      + ring(4, (k) => g(72 + (k % 2) * 36, 110 + Math.floor(k / 2) * 34, 1, R(-16, -14, 32, 28, '#FFFFFF', 4) + Lc('M-12-6h24M-12 2h24M-12 10h24', '#ECEFF1', 2)))
      + ring(5, (k) => g(152 + (k % 3) * 22 - (k > 2 ? 10 : 0), 102 + Math.floor(k / 3) * 26, 1, R(-11, -11, 22, 22, '#E8A94E', 4) + R(-6, -6, 8, 8, '#F6C25B', 2, 0)))
      + g(150, 180, 1, P('M-22-8h44c0 14-10 22-22 22s-22-8-22-22z', '#FFFFFF') + E(0, -8, 22, 6, '#9575CD') + C(-6, -9, 2.5, '#E53935', 0))
      + ring(3, (k) => C(84 + k * 16, 186, 7, '#C5E1A5', 2)) + face(158, 116, 0.28)),
  L('vn/hanoi/landmark-tubehouse.v1.svg', 'บ้านทรงท่อ ตึกแถวแคบสูงในย่านเมืองเก่าฮานอย', 'The tall skinny tube houses of Hanoi\'s Old Quarter', ['tube house', 'บ้านทรงท่อ', 'nha ong', 'nhà ống', 'old quarter', 'ย่านเมืองเก่า', '36 streets', '36 ถนน', 'skinny houses', 'ตึกแถวแคบ', 'hoan kiem district'], 'หาบ้านที่แคบที่สุดซึ่งมีกระถางต้นไม้ที่ระเบียง', 'Find the skinniest house with plant pots on its balcony',
    // a row of very narrow, very tall houses squeezed side by side in yellow, pink, mint and blue, each with shutters and a little balcony, plants spilling over, a tangle of wires and a parked motorbike below
    sky('#E1F5FE') + R(-4, 210, 248, 34, '#BDBDBD', 0, 0)
      + [[6, 40, 34, '#FFE082'], [42, 20, 26, '#F8BBD0'], [70, 50, 40, '#B2DFDB'], [112, 10, 30, '#B3E5FC'], [144, 34, 44, '#FFCC80'], [190, 24, 26, '#E1BEE7'], [218, 46, 30, '#C5E1A5']].map(([x, y, w, c]) => R(x, y, w, 210 - y, c)
        + ring(Math.floor((180 - y) / 44), (k) => R(x + 5, y + 14 + k * 44, w - 10, 20, '#5D9C8A', 2, 2) + Lc(`M${x + w / 2} ${y + 14 + k * 44}v20`, '#2E5E52', 1.5) + Lc(`M${x + 2} ${y + 38 + k * 44}h${w - 4}`, '#5D4037', 2.5))
        + P(`M${x - 2} ${y}h${w + 4}l-4-8h${-w + 4}z`, '#BF6B4E', 2)).join('')
      + ring(3, (k) => C(118 + k * 9, 52, 5, '#43A047', 1.5)) + Lc('M-4 96c60 10 120 0 248 14M-4 104c80 16 160 6 248 18', '#37474F', 1.5) + face(127, 80, 0.24)
      + g(90, 222, 1, C(-14, 6, 7, '#37474F', 2.5) + C(14, 6, 7, '#37474F', 2.5) + P('M-16 0h28l6-10h-12z', '#E53935', 2))),
  L('vn/hanoi/landmark-mosaicwall.v1.svg', 'กำแพงโมเสกเซรามิกริมแม่น้ำแดง', 'The ceramic mosaic wall along the Red River dyke', ['ceramic mosaic road', 'ถนนโมเสกเซรามิก', 'hanoi mosaic wall', 'กำแพงโมเสก', 'red river dyke', 'คันกั้นแม่น้ำแดง', 'hong ha street', 'ถนนห่งห่า', 'ceramic road', 'ถนนเซรามิก', 'tile mural'], 'หาลายคลื่นสีฟ้าบนกำแพงกระเบื้อง', 'Find the blue wave pattern on the tiled wall',
    // a very long wall covered in panels of bright ceramic tiles: blue waves, yellow suns, green leaves and red circles, a tree-lined road in front with a child on a bicycle
    sky('#E3F2FD') + R(-4, 70, 248, 110, '#FFFFFF')
      + R(-4, 70, 60, 110, '#BBDEFB', 0, 2.5) + ring(4, (k) => Lc(`M-4 ${88 + k * 24}q10-10 20 0t20 0t20 0`, '#1E88E5', 4))
      + R(56, 70, 64, 110, '#FFF59D', 0, 2.5) + C(88, 126, 22, '#FFB300', 2.5) + ring(8, (k) => { const a = k * Math.PI / 4; return Lc(`M${f1(88 + 26 * Math.cos(a))} ${f1(126 + 26 * Math.sin(a))}l${f1(8 * Math.cos(a))} ${f1(8 * Math.sin(a))}`, '#FF8F00', 3); })
      + R(120, 70, 62, 110, '#C8E6C9', 0, 2.5) + ring(4, (k) => P(`M${132 + (k % 2) * 26} ${90 + Math.floor(k / 2) * 44}c10-12 26-12 30 0-10 12-26 12-30 0z`, '#43A047', 2))
      + R(182, 70, 62, 110, '#FFCDD2', 0, 2.5) + ring(4, (k) => C(198 + (k % 2) * 28, 98 + Math.floor(k / 2) * 46, 12, '#E53935', 2) + C(198 + (k % 2) * 28, 98 + Math.floor(k / 2) * 46, 5, '#FFFFFF', 0))
      + R(-4, 180, 248, 64, '#9E9E9E', 0, 0) + Lc('M-4 214h248', '#FFFFFF', 3) + face(88, 126, 0.3)
      + g(150, 224, 1, C(-16, 0, 10, 'none', 3) + C(16, 0, 10, 'none', 3) + Lc('M-16 0l12-16h18l2 16M-4-16l-4-6', '#E53935', 3) + kid(4, -16, '#FFCA28', 0.7))),

  // ---------- Ho Chi Minh City and the Mekong Delta
  L('vn/saigon/landmark-landmark81.v1.svg', 'ตึกแลนด์มาร์ก 81 ตึกที่สูงที่สุดในเวียดนาม', 'Landmark 81, Vietnam\'s tallest tower', ['landmark 81', 'แลนด์มาร์ก 81', 'binh thanh', 'บิ่ญทั้ญ', 'tallest building', 'ตึกที่สูงที่สุด', 'saigon river park', 'สวนริมแม่น้ำไซง่อน', 'skydeck 81', 'จุดชมวิวชั้น 81'], 'หาตึกที่ดูเหมือนมัดไม้ไผ่ซ้อนกันสูงขึ้นไป', 'Find the tower that looks like bundles of bamboo stacked higher and higher',
    // a very tall glass tower made of slim bundled blocks that step up in different heights like a bunch of bamboo stems, a river and a green park with trees at its foot
    sky('#E1F5FE') + R(-4, 200, 248, 44, '#4FC3F7', 0, 0) + R(-4, 186, 248, 16, '#81C784', 0, 0) + ring(5, (k) => C(20 + k * 50, 184, 10, '#43A047', 2))
      + [[84, 70, 18], [102, 30, 18], [120, 6, 18], [138, 40, 18], [156, 90, 16]].map(([x, y, w]) => R(x, y, w, 184 - y, '#90CAF9') + ring(Math.floor((184 - y) / 20), (k) => Lc(`M${x + 3} ${y + 10 + k * 20}h${w - 6}`, '#E3F2FD', 2))).join('')
      + Lc('M129 6v-4', '#37474F', 3) + face(120, 120, 0.34) + kid(210, 200, '#FFCA28', 0.8)),
  L('vn/saigon/landmark-mangthit.v1.svg', 'เตาเผาอิฐโดมแห่งหมั่งทิต', 'The dome-shaped brick kilns of Mang Thít', ['mang thit', 'măng thít', 'หมั่งทิต', 'brick kilns', 'เตาเผาอิฐ', 'vinh long', 'หวิญล็อง', 'kingdom of bricks', 'อาณาจักรอิฐ', 'red brick domes', 'โดมอิฐแดง'], 'หาควันที่ลอยออกจากปล่องบนโดมอิฐ', 'Find the smoke rising from the chimney on the brick dome',
    // big red-brick beehive-shaped kilns with small chimneys and arched doors along a canal, stacks of new bricks on a wooden boat in front, smoke curling up
    sky('#FFF3E0') + R(-4, 190, 248, 54, '#8D6E63', 0, 0) + Lc('M20 210h40M150 226h50', '#A1887F', 3)
      + [[60, 186, 52], [168, 186, 46]].map(([x, y, r]) => P(`M${x - r} ${y}c0-${r * 1.6} ${r * 2}-${r * 1.6} ${r * 2} 0z`, '#C1583F') + ring(4, (k) => Lc(`M${x - r + 8 + k * 2} ${y - 16 - k * 18}h${r * 2 - 16 - k * 4}`, '#A0472F', 2)) + P(`M${x - 10} ${y}v-18c0-12 20-12 20 0v18z`, '#3E2723', 2.5) + R(x + r * 0.3, y - r * 1.4, 10, 18, '#A0472F', 0, 2.5) + Lc(`M${x + r * 0.3 + 5} ${y - r * 1.4 - 4}q-8-12 0-24`, '#B0BEC5', 4)).join('')
      + face(60, 150, 0.36) + g(120, 214, 1, P('M-60 0h120l-12 16h-96z', '#6D4C41') + ring(6, (k) => R(-50 + k * 16, -14, 14, 14, '#E57357', 1, 2)))),
  L('vn/saigon/landmark-sadec.v1.svg', 'หมู่บ้านดอกไม้ซาแดก', 'The Sa Đéc flower village', ['sa dec', 'sa đéc', 'ซาแดก', 'flower village', 'หมู่บ้านดอกไม้', 'tan quy dong', 'ตันกวีดง', 'raised flower beds', 'แปลงดอกไม้ยกสูง', 'dong thap', 'ด่งท้าป'], 'หากระถางดอกไม้ที่วางบนชั้นไม้เหนือน้ำ', 'Find the flower pots standing on wooden racks above the water',
    // long raised wooden racks standing over shallow canal water, covered in rows of pots of yellow and pink flowers, a girl in a straw hat watering them
    sky('#E8F5E9') + R(-4, 150, 248, 94, '#80CBC4', 0, 0) + Lc('M20 220h40M150 230h40', '#B2DFDB', 3)
      + ring(2, (k) => { const y = 120 + k * 46; return R(-4, y, 248, 10, '#A1673F', 0, 2.5) + ring(6, (j) => Lc(`M${10 + j * 44} ${y + 10}v28`, '#8D5524', 4)) + ring(8, (j) => P(`M${6 + j * 30} ${y}l4-12h12l4 12z`, '#BF6B4E', 2) + C(16 + j * 30, y - 18, 8, j % 2 ? '#FDD835' : '#F06292', 2)); })
      + g(188, 110, 1, kid(0, 0, '#26A69A', 1) + P('M-14-30l14-10 14 10z', '#F3D9A4', 2) + Lc('M8-8l16 6', '#78909C', 4) + Lc('M26-2l8 6', '#81D4FA', 2)) + face(76, 102, 0.26)),
  L('vn/saigon/landmark-rambutan.v1.svg', 'สวนผลไม้ริมแม่น้ำโขง เงาะและลำไย', 'A Mekong fruit garden with rambutans and longans', ['rambutan', 'เงาะ', 'longan', 'ลำไย', 'mekong fruit garden', 'สวนผลไม้แม่น้ำโขง', 'cai be', 'ก๊ายเบ', 'vinh long', 'หวิญล็อง', 'fruit picking', 'เก็บผลไม้'], 'หาเงาะสีแดงที่มีขนสีเขียวรอบตัว', 'Find the red rambutan with green hairs all round it',
    // a fruit tree heavy with bunches of hairy red rambutans and small brown longans over a little canal, a woven basket full of fruit in front, one rambutan peeled showing white flesh
    sky('#F1F8E9') + R(-4, 150, 248, 40, '#80CBC4', 0, 0) + R(-4, 186, 248, 58, '#8BC34A', 0, 0)
      + Lc('M120 190V90', '#6D4C41', 8) + C(120, 70, 80, '#43A047', 2.5)
      + ring(6, (k) => { const x = 66 + (k % 3) * 52, y = 56 + Math.floor(k / 3) * 40; return C(x, y, 10, '#E53935', 2) + ring(6, (j) => { const a = j * Math.PI / 3; return Lc(`M${f1(x + 10 * Math.cos(a))} ${f1(y + 10 * Math.sin(a))}l${f1(5 * Math.cos(a + 0.5))} ${f1(5 * Math.sin(a + 0.5))}`, '#9CCC65', 2); }); })
      + ring(5, (k) => C(150 + (k % 3) * 9, 100 + Math.floor(k / 3) * 8, 5, '#C8A16B', 1.5))
      + g(80, 208, 1, P('M-36-16h72l-8 30h-56z', '#D7A86E') + Lc('M-30-6h60M-28 4h56', '#B07A3E', 2) + ring(4, (k) => C(-24 + k * 16, -20, 9, '#E53935', 2)))
      + g(170, 214, 1, C(0, 0, 14, '#E53935', 2.5) + E(4, -4, 10, 10, '#FAFAFA', 2) + face(-2, 4, 0.2))),
  L('vn/saigon/landmark-banhbonuong.v1.svg', 'บั๊ญโบ่เนื้อง ขนมเค้กใบเตยเนื้อรังผึ้ง', 'Bánh bò nướng, the green honeycomb cake', ['banh bo nuong', 'bánh bò nướng', 'บั๊ญโบ่เนื้อง', 'honeycomb cake', 'ขนมรังผึ้ง', 'pandan cake', 'เค้กใบเตย', 'coconut milk cake', 'เค้กกะทิ', 'southern vietnamese dessert', 'ขนมเวียดนามใต้'], 'หารูเล็กๆ เป็นเส้นยาวในเนื้อเค้กที่ถูกตัด', 'Find the long little tunnels inside the cut cake',
    // a round green cake with a browned top, a big wedge cut out and lying in front showing yellow-green insides full of long vertical air tunnels like honeycomb, a pandan leaf
    g(110, 120, 1, P('M-70 0c0-20 140-20 140 0v50c0 20-140 20-140 0z', '#7CB342') + E(0, 0, 70, 18, '#8D6E3B') + P('M0 0L60-12 70 0 70 50 0 62z', '#C5E1A5', 3) + ring(6, (k) => Lc(`M${10 + k * 9} ${-4 + k}v${50 - k * 2}`, '#9CCC65', 3)))
      + g(150, 196, 1, P('M-40-20L40-30 40 10-40 20z', '#C5E1A5') + P('M-40-20L40-30l-6-8-74 10z', '#8D6E3B') + ring(7, (k) => Lc(`M${-32 + k * 11} ${-18 - k * 1.4}v${32}`, '#9CCC65', 3)) + face(0, -4, 0.3))
      + P('M180 70c20-30 40-40 50-40-10 20-30 40-50 40z', '#43A047', 2.5) + face(80, 140, 0.36)),

  // ---------- Phu Quoc
  L('vn/phuquoc/landmark-seacucumber.v1.svg', 'ปลิงทะเลในหาดน้ำตื้นของฟูก๊วก', 'Sea cucumbers in Phú Quốc\'s shallows', ['sea cucumber', 'ปลิงทะเล', 'hai sam', 'hải sâm', 'shallow sea', 'ทะเลน้ำตื้น', 'seabed', 'พื้นทะเล', 'tide pool', 'แอ่งน้ำทะเล', 'sea creatures'], 'หาปลิงทะเลตัวอ้วนที่มีปุ่มเต็มตัว', 'Find the chubby sea cucumber covered in bumps',
    // a clear shallow sea floor of pale sand with two chubby bumpy sea cucumbers, one orange and one dark brown, little shells and ripples of light, a child's feet paddling at the edge
    sky('#B2EBF2') + ring(5, (k) => Lc(`M${10 + k * 50} ${30 + (k % 2) * 30}q20-10 40 0`, '#E0F7FA', 4)) + P('M-4 120c60-10 180-10 248 0v124H-4z', '#FFE0B2', 0) + ring(5, (k) => Lc(`M${20 + k * 44} ${150 + (k % 2) * 30}q14-8 28 0`, '#FFCC80', 3))
      + g(84, 170, 1, P('M-50 0c0-20 30-28 60-24s40 10 40 24-30 24-60 24-40-4-40-24z', '#FF8A65') + ring(8, (k) => C(-38 + k * 11, -10 + (k % 2) * 16, 4, '#FF7043', 2)) + face(-26, 0, 0.34) + ring(5, (k) => Lc(`M-50 ${-6 + k * 3}l-8 ${-4 + k * 2}`, '#FFAB91', 2)))
      + g(176, 112, 1, P('M-36 0c0-14 22-20 44-18s30 8 30 18-22 18-44 18-30-4-30-18z', '#5D4037') + ring(6, (k) => C(-26 + k * 10, -6 + (k % 2) * 12, 3, '#8D6E63', 1.5)) + face(-16, 0, 0.26))
      + [[30, 220], [214, 210]].map(([x, y]) => P(`M${x - 10} ${y}c0-10 20-10 20 0z`, '#FFF8E1', 2) + Lc(`M${x - 4} ${y - 6}v6M${x + 4} ${y - 6}v6`, '#FFCC80', 1.5)).join('')),
  L('vn/phuquoc/landmark-dugong.v1.svg', 'พะยูนแห่งทะเลฟูก๊วก', 'The dugong of Phú Quốc\'s seas', ['dugong', 'พะยูน', 'sea cow', 'วัวทะเล', 'bo bien', 'bò biển', 'seagrass meadow', 'ทุ่งหญ้าทะเล', 'marine reserve', 'เขตอนุรักษ์ทะเล', 'gentle sea animal'], 'หาหางรูปพระจันทร์เสี้ยวของพะยูน', 'Find the dugong\'s crescent-moon tail',
    // a big gentle grey dugong with a round snout and a whale-like crescent tail grazing on a meadow of green seagrass, small fish and bubbles around it
    sky('#4FC3F7') + ring(6, (k) => C(30 + k * 36, 30 + (k % 3) * 14, 4, '#B3E5FC', 2)) + P('M-4 200c60-10 180-10 248 0v44H-4z', '#FFE0B2', 0)
      + ring(14, (k) => Lc(`M${8 + k * 17} 214c${(k % 2 ? 6 : -6)}-20 0-34 ${k % 2 ? 8 : -6}-50`, '#43A047', 4))
      + g(118, 132, 1, P('M-80 10c0-30 40-50 90-46 40 4 64 24 70 40l20-24c4 18 4 36 0 56l-20-20c-10 16-40 30-80 30-50 0-80-12-80-36z', '#90A4AE')
        + E(-74, 18, 18, 14, '#B0BEC5') + Lc('M-82 20h16', '#78909C', 2) + P('M-30 30c-10 12-24 18-34 16 8-8 16-16 20-24z', '#78909C', 2.5) + face(-56, 2, 0.4))
      + [[200, 70, '#FFB300'], [40, 80, '#FF7043']].map(([x, y, c]) => E(x, y, 12, 7, c, 2.5) + P(`M${x + 12} ${y}l8-6v12z`, c, 2)).join('')),
  L('vn/phuquoc/landmark-hamninh.v1.svg', 'สะพานไม้ยาวของหมู่บ้านชาวประมงหามนิญ', 'The long jetty of Hàm Ninh fishing village', ['ham ninh', 'hàm ninh', 'หามนิญ', 'fishing village', 'หมู่บ้านชาวประมง', 'long wooden jetty', 'สะพานไม้ยื่นลงทะเล', 'east coast', 'ชายฝั่งตะวันออก', 'stilt houses', 'บ้านเสาสูง'], 'หาตะกร้าไม้ไผ่ที่วางอยู่ปลายสะพาน', 'Find the bamboo baskets at the end of the jetty',
    // a long narrow wooden jetty on thin posts running far out over calm green-blue water, little stilt houses with tin roofs along the shore, bamboo baskets and a fisherman's boat at the end
    sky('#FFF8E1') + R(-4, 110, 248, 134, '#4DB6AC', 0, 0) + Lc('M30 150h40M160 170h50', '#B2DFDB', 3)
      + ring(3, (k) => { const x = 10 + k * 34; return Lc(`M${x + 4} 130v20M${x + 24} 130v20`, '#6D4C41', 3) + R(x, 104, 28, 26, ['#FFCC80', '#B3E5FC', '#C5E1A5'][k], 0, 2.5) + P(`M${x - 4} 106l18-14 18 14z`, '#90A4AE', 2.5); })
      + P('M100 134l140 40v10L100 142z', '#A1673F') + ring(7, (k) => Lc(`M${108 + k * 20} ${139 + k * 5.7}v${30}`, '#6D4C41', 3))
      + ring(3, (k) => g(200 + k * 12, 168 + k * 2, 1, P('M-6-12h12l-2 12h-8z', '#D7A86E', 2)))
      + g(160, 210, 1, P('M-28 0h56c-6 10-14 14-28 14s-22-4-28-14z', '#1E88E5') + Lc('M-22 4h44', '#FFFFFF', 2)) + face(150, 156, 0.26)),
  { id: 'vn-phuquoc.day.islands', cat: 'day', file: 'vn/phuquoc/day-islands.v1.svg', name: nm('หมู่เกาะอันเทยทางใต้ของฟูก๊วก', 'The An Thới islands south of Phú Quốc'), kw: ['an thoi islands', 'หมู่เกาะอันเทย', 'island hopping', 'เที่ยวเกาะ', 'hon mong tay', 'ฮนม้องเตย', 'hon may rut', 'ฮนเมรุต', 'snorkelling', 'ดำน้ำตื้น', 'phu quoc', 'ฟูก๊วก'],
    // a turquoise sea dotted with small green islands rimmed by white sand, a wooden boat with a striped awning moored by the nearest one, a snorkeller's mask and fins floating
    svg: scene('vpq-d2', '#B3E5FC', R(0, 70, 240, 170, '#26C6DA') + Lc('M20 100h40M150 120h50M40 200h40M170 210h40', '#B2EBF2', 3)
      + [[60, 110, 34], [170, 92, 26], [190, 160, 20], [80, 178, 40]].map(([x, y, r]) => E(x, y, r + 8, r * 0.45 + 6, '#FFF8E1') + E(x, y - 4, r, r * 0.45, '#43A047') + C(x - r * 0.3, y - r * 0.4, r * 0.35, '#2E7D32', 2)).join('')
      + g(130, 150, 1, P('M-34 0h68c-6 10-16 14-34 14s-28-4-34-14z', '#8D5524') + R(-20, -16, 40, 6, '#E53935', 2, 2) + Lc('M-18-10v10M18-10v10', '#6D4C41', 2) + Lc('M-14-16h4M-2-16h4M10-16h4', '#FFFFFF', 3))
      + g(70, 132, 1, R(-10, -6, 20, 12, '#29B6F6', 6, 2) + C(0, 0, 4, '#E1F5FE', 0)) + face(80, 176, 0.3)) },

  // ---------- Đà Lạt
  L('vn/dalat/landmark-lamvien.v1.svg', 'จัตุรัสลัมเวียนกับอาคารกระจกรูปดอกไม้', 'Lâm Viên Square and its flower-shaped glass domes', ['lam vien square', 'quảng trường lâm viên', 'จัตุรัสลัมเวียน', 'artichoke dome', 'โดมอาร์ติโช้ค', 'wild sunflower dome', 'โดมดอกทานตะวันป่า', 'xuan huong lake', 'ทะเลสาบซวนเฮือง', 'glass domes', 'อาคารกระจก'], 'หาอาคารกระจกที่เป็นรูปดอกไม้สีเหลือง', 'Find the glass building shaped like a yellow flower',
    // a wide square by a lake with two giant glass buildings: a green one shaped like an artichoke bud and a yellow one shaped like a wild sunflower, pine trees on the hills behind
    sky('#E3F2FD') + ring(4, (k) => P(`M${10 + k * 64} 90l18-40 18 40z`, '#2E7D32', 2.5)) + R(-4, 86, 248, 30, '#4FC3F7', 0, 0) + R(-4, 160, 248, 84, '#E0E0E0', 0, 0)
      + g(76, 150, 1, ring(4, (k) => P(`M${-40 + k * 8} 0c0-${40 + k * 10} ${40 - k * 8}-${60 + k * 6} ${40 - k * 8}-${60 + k * 6}`, 'none') + '') + ring(4, (k) => P(`M${-36 + k * 6} 0c-4-30 ${16 - k * 2}-${54 + k * 8} ${36 - k * 6}-${64 + k * 6}c${20 - k * 6} ${10 - k * 2} ${36 - k * 6} ${34 + k * 8} ${36 - k * 6} ${64 + k * 6}z`, ['#2E7D32', '#43A047', '#66BB6A', '#81C784'][k], 2.5)) + face(0, -20, 0.32))
      + g(170, 140, 1, ring(10, (k) => { const a = k * Math.PI / 5; return E(f1(30 * Math.cos(a)), f1(-10 + 26 * Math.sin(a)), 14, 8, '#FFD54F', 2); }) + C(0, -10, 20, '#FFB300') + ring(5, (k) => R(-20 + k * 8, 10, 6, 14, '#B3E5FC', 1, 1.5)) + face(0, -10, 0.28))
      + kid(120, 220, '#EC407A', 0.8)),
  L('vn/dalat/landmark-cohong.v1.svg', 'เนินหญ้าสีชมพูของดาลัด', 'The pink grass hills of Đà Lạt', ['pink grass hill', 'đồi cỏ hồng', 'เนินหญ้าสีชมพู', 'pink grass', 'หญ้าสีชมพู', 'autumn hills', 'เนินเขาฤดูใบไม้ร่วง', 'lake tuyen lam', 'ทะเลสาบเตวียนลัม', 'pine hills', 'เนินสน'], 'หาต้นสนต้นเดียวที่ยืนอยู่บนเนินสีชมพู', 'Find the lone pine standing on the pink hill',
    // soft rolling hills covered in fluffy pink grass under a pale sky, a lone pine on top, a child running with a kite-free scarf flying, misty blue hills far away
    sky('#F3E5F5') + P('M-4 100c40-20 80-20 120-6s80-10 128-4v40H-4z', '#B39DDB') + P('M-4 140c50-50 120-50 160-10s60-10 88-10v124H-4z', '#F48FB1') + P('M-4 190c60-30 160-30 248-10v64H-4z', '#F8BBD0')
      + ring(16, (k) => Lc(`M${8 + (k * 31) % 232} ${150 + Math.floor(k / 4) * 22}c-2-10 2-16 6-20`, '#EC407A', 2.5))
      + g(132, 104, 1, Lc('M0 0v-10', '#6D4C41', 4) + P('M-16-8h32l-16-30z', '#2E7D32', 2.5) + P('M-12-24h24l-12-22z', '#388E3C', 2))
      + kid(70, 214, '#7E57C2', 1) + Lc('M78 196c14-4 24 2 34-6', '#FFCA28', 5) + face(180, 200, 0.3)),
  L('vn/dalat/landmark-langbiang.v1.svg', 'ภูเขาลางเบียงสองยอด', 'The twin peaks of Lang Biang mountain', ['lang biang', 'langbiang', 'ลางเบียง', 'lang biang mountain', 'ภูเขาลางเบียง', 'twin peaks', 'ยอดเขาคู่', 'lac duong', 'หลักเยือง', 'mountain lookout', 'จุดชมวิวบนเขา'], 'หายอดเขาสองยอดที่อยู่เคียงกัน', 'Find the two peaks standing side by side',
    // a big green mountain with two rounded peaks side by side, pine forests on its slopes, a winding red dirt road climbing up, little valley farms and a lake below
    sky('#E1F5FE') + E(60, 40, 26, 8, '#FFFFFF', 2.5)
      + P('M-4 180c30-60 50-110 80-120 20-6 30 20 44 20s24-40 50-30c30 10 50 80 74 130z', '#558B2F') + P('M70 64c8-6 14 0 18 10M164 54c8-4 16 4 20 14', 'none', 3)
      + ring(10, (k) => P(`M${20 + k * 22} ${170 - (k > 2 && k < 8 ? 40 : 10)}l8-18 8 18z`, '#1B5E20', 2))
      + Lc('M150 200c-20-20 20-40-10-60s10-40 0-60', '#D84315', 4) + P('M-4 190c60-10 180-10 248 0v54H-4z', '#9CCC65')
      + ring(4, (k) => R(14 + k * 54, 204 + (k % 2) * 10, 40, 14, ['#FFE082', '#C5E1A5', '#FFCC80', '#B2DFDB'][k], 2, 2)) + E(186, 230, 40, 10, '#4FC3F7', 2.5) + face(116, 120, 0.4)),
  L('vn/dalat/landmark-lyceeyersin.v1.svg', 'วิทยาลัยครูดาลัด ตึกโค้งยาวกับหอระฆัง', 'The old Lycée Yersin, Đà Lạt\'s curved school with its bell tower', ['dalat pedagogical college', 'วิทยาลัยครูดาลัด', 'lycee yersin', 'ลีเซเยอร์แซง', 'curved building', 'ตึกโค้ง', 'bell tower', 'หอระฆัง', 'yellow school', 'โรงเรียนสีเหลือง'], 'หาหอสูงที่มีหน้าต่างเล็กๆ เรียงขึ้นไป', 'Find the tall tower with little windows going up it',
    // a long curved pale-yellow school building with rows of windows and a red-brown roof bending round a lawn, a tall slim square tower rising from it with a little pointed roof
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#A5D6A7', 0, 0) + ring(3, (k) => P(`M${200 + k * 14} 190l8-30 8 30z`, '#2E7D32', 2))
      + P('M-4 120c60 30 180 30 248 0v66c-68 30-188 30-248 0z', '#FFE082') + P('M-4 120c60 30 180 30 248 0l-8-12c-60 26-172 26-232 0z', '#A0522D')
      + ring(9, (k) => R(6 + k * 26, 138 + Math.abs(k - 4) * -2 + (k === 0 || k === 8 ? -8 : 0), 12, 16, '#90CAF9', 2, 2)) + ring(9, (k) => R(6 + k * 26, 164 + Math.abs(k - 4) * -2 + (k === 0 || k === 8 ? -8 : 0), 12, 14, '#90CAF9', 2, 2))
      + R(104, 30, 32, 120, '#FFE082') + ring(4, (k) => R(114, 44 + k * 24, 12, 14, '#90CAF9', 2, 2)) + P('M98 32l22-24 22 24z', '#A0522D') + face(120, 150, 0.32)),
  L('vn/dalat/landmark-hoabattu.v1.svg', 'ดอกบ๊ัตตื๋อ ดอกไม้ไม่รู้โรยของดาลัด', 'Đà Lạt\'s everlasting strawflowers', ['strawflower', 'ดอกบ๊ัตตื๋อ', 'hoa bat tu', 'hoa bất tử', 'everlasting flower', 'ดอกไม้ไม่รู้โรย', 'dried flowers', 'ดอกไม้แห้ง', 'flower bouquet', 'ช่อดอกไม้'], 'หาดอกไม้กลีบแข็งๆ ที่มีหลายสีในช่อ', 'Find the crisp papery petals in many colours in the bunch',
    // a big bunch of papery strawflowers in red, yellow, pink, orange and white tied with twine and wrapped in brown paper, a few loose flowers in a basket on a bicycle
    P('M70 220l20-120h60l20 120z', '#C8A16B') + Lc('M90 200h60', '#8D6E63', 4) + ring(5, (k) => Lc(`M${104 + k * 8} 150l${-20 + k * 10}-60`, '#558B2F', 3))
      + [[80, 70, '#E53935'], [120, 56, '#FFD54F'], [160, 72, '#F48FB1'], [100, 98, '#FF9800'], [146, 100, '#FFFFFF'], [120, 82, '#AB47BC']].map(([x, y, c]) => ring(8, (j) => { const a = j * Math.PI / 4; return E(f1(x + 12 * Math.cos(a)), f1(y + 12 * Math.sin(a)), 8, 5, c, 2); }) + C(x, y, 7, '#FFB300', 2)).join('')
      + face(120, 170, 0.36) + g(206, 200, 1, C(-14, 14, 10, 'none', 3) + C(18, 14, 10, 'none', 3) + Lc('M-14 14l12-18h22l-2 18M-2-4h-10', '#29B6F6', 3) + R(-26, -14, 22, 12, '#D7A86E', 3, 2.5) + C(-16, -18, 5, '#E53935', 1.5) + C(-10, -16, 5, '#FFD54F', 1.5))),
];

export default { places: {}, items };
