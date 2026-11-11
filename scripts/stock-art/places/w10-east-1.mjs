// Wave 10, group east: one or two new pictures for each place of Japan, Korea, China, Vietnam, the Philippines,
// Singapore, Bali, Penang, India's golden triangle, Bhutan and Sri Lanka's hills. The Lotus Temple stands as a building only,
// with no face on a house of prayer; no flags, no brands, no letters.
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (jp/tokyo/landmark-edokiriko.v1.svg → jp-tokyo.landmark.edokiriko)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));

const items = [
  // ---------- Tokyo
  L('jp/tokyo/landmark-edokiriko.v1.svg', 'แก้วเจียระไนเอโดะคิริโกะ สีน้ำเงินและสีแดง', 'Edo kiriko, Tokyo’s cut-glass cups in blue and red', ['edo kiriko', 'เอโดะคิริโกะ', 'cut glass', 'แก้วเจียระไน', 'glass cutting workshop', 'เวิร์กช็อปเจียแก้ว', 'koto ward', 'เขตโคโต', 'sumida craft', 'งานฝีมือสุมิดะ', 'star pattern cup', 'แก้วลายดาว'], 'หาลายดาวที่ก้นแก้ว', 'Find the star cut into the bottom of the glass',
    // a tall cobalt-blue tumbler and a short red one, both cut through to clear glass in rows of little diamonds and a fan of lines, a star cut at the base, sparkles, the blue cup smiling
    E(120, 206, 96, 12, '#CFD8DC', 0)
      + P('M42 62h96l-10 140h-76z', '#1E5BD8', 4) + E(90, 62, 48, 9, '#BBDEFB', 3.5)
      + ring(3, (r) => ring(5 - (r === 2 ? 1 : 0), (k) => g(58 + k * 16 + (r === 2 ? 8 : 0), 92 + r * 18, 1, P('M0-7l6 7-6 7-6-7z', '#E3F2FD', 2))))
      + Lc('M56 150l34 22 34-22', '#E3F2FD', 4) + Lc('M60 162l30 20 30-20', '#E3F2FD', 3)
      + g(90, 194, 1, P('M0-6l3 4 6 0-4 4 2 6-7-3-7 3 2-6-4-4 6 0z', '#E3F2FD', 0))
      + g(90, 128, 1, face(0, 0, 0.42))
      + P('M150 118h64l-7 82h-50z', '#E53935', 4) + E(182, 118, 32, 7, '#FFCDD2', 3)
      + ring(4, (k) => Lc(`M${160 + k * 14} 132l8 26-8 26`, '#FFEBEE', 3)) + Lc('M156 140h52', '#FFEBEE', 3)
      + ring(3, (k) => g([28, 222, 140][k], [40, 90, 30][k], 1, P('M0-9l2 7 7 2-7 2-2 7-2-7-7-2 7-2z', '#FFF59D', 2)))),

  // ---------- Takayama and Nagoya
  L('jp/takayama/landmark-kishimen.v1.svg', 'คิชิเมง อุด้งเส้นแบนของนาโกย่าโรยปลาโอแห้ง', 'Kishimen, Nagoya’s flat noodles under dancing bonito flakes', ['kishimen', 'คิชิเมง', 'flat udon', 'อุด้งเส้นแบน', 'bonito flakes', 'ปลาโอแห้งโรยหน้า', 'atsuta', 'อัตสึตะ', 'station platform noodles', 'ร้านเส้นบนชานชาลา', 'wide white noodles', 'เส้นแบนสีขาว'], 'หาแผ่นปลาโอที่บิดตัวเหมือนกำลังเต้น', 'Find the bonito flakes curling as if they dance',
    // a deep black-and-red lacquer bowl of light brown broth, wide flat white ribbon noodles folding over the rim, green komatsuna leaves, a slice of fried tofu, a heap of pale pink bonito flakes curling up in the steam, chopsticks lifting a ribbon
    Lc('M92 40c-8-10 8-18 0-28M120 36c-8-10 8-18 0-28M148 40c-8-10 8-18 0-28', '#B0BEC5', 3)
      + P('M24 112h192c-6 60-46 96-96 96s-90-36-96-96z', '#C62828', 4) + P('M40 150c20 40 140 40 160 0', 'none', 0) + Lc('M44 156c30 34 122 34 152 0', '#212121', 8)
      + E(120, 112, 96, 20, '#D7A86E', 4)
      + ring(5, (k) => P(`M${44 + k * 32} 108c10-8 18 6 28-2l2 10c-10 8-18-6-28 2z`, '#FFFDF5', 2.5))
      + P('M60 104c4-10 18-12 24-4-6 6-18 8-24 4z', '#558B2F', 2.5) + P('M150 98h30l4 14h-32z', '#F9A825', 2.5)
      + ring(7, (k) => g(104 + (k % 4) * 10, 92 - Math.floor(k / 4) * 10, 1, P('M-7 0c2-6 8-8 12-4-4 0-8 2-10 8z', '#F8BBD0', 2), k * 40))
      + Lc('M168 20l-40 84M182 24l-40 82', '#8D6E63', 5) + Lc('M136 88c-4 10 6 16 0 26', '#FFFDF5', 9) + Lc('M136 88c-4 10 6 16 0 26', INK, 0)
      + g(120, 170, 1, face(0, 0, 0.5))),

  // ---------- Hanoi
  L('vn/hanoi/landmark-bunthang.v1.svg', 'บุ๋นทาง ก๋วยเตี๋ยวน้ำใสโรยไข่ฝอยเส้นเหลืองของฮานอย', 'Bún thang, Hanoi’s clear noodle soup with ribbons of egg', ['bún thang', 'บุ๋นทาง', 'bun thang', 'egg ribbons', 'ไข่ฝอยเส้นเหลือง', 'shredded chicken', 'ไก่ฉีก', 'giò lụa strips', 'หมูยออบเส้น', 'clear chicken broth', 'น้ำซุปไก่ใส', 'old quarter breakfast', 'อาหารเช้าย่านเมืองเก่า'], 'หาไข่ฝอยเส้นสีเหลืองบนชาม', 'Find the thin yellow egg ribbons on top',
    // a white bowl with a green rim of clear golden broth, thin white rice noodles, neat little piles on top: yellow egg ribbons, pale shredded chicken, pink pork-roll strips, dark mushroom slivers, green herbs and a sprinkle of dried shrimp, a small dish of shrimp paste and a lime wedge beside, the bowl smiling
    Lc('M96 40c-8-10 8-18 0-28M124 36c-8-10 8-18 0-28M152 40c-8-10 8-18 0-28', '#B0BEC5', 3)
      + P('M22 100h196c-6 62-46 98-98 98S28 162 22 100z', '#FFFFFF', 4) + Lc('M28 126c30 10 154 10 184 0', '#43A047', 5)
      + E(120, 100, 98, 22, '#FFE9A8', 4) + ring(5, (k) => Lc(`M${42 + k * 34} 106c8-4 16 4 24 0`, '#FFFFFF', 3))
      + ring(6, (k) => Lc(`M${52 + k * 6} 92l14 -8`, '#FFD54F', 3.5))
      + ring(5, (k) => Lc(`M${92 + k * 5} 84l-2 14`, '#FFF8E1', 4)) + ring(5, (k) => Lc(`M${92 + k * 5} 84l-2 14`, '#D7CCC8', 1))
      + ring(4, (k) => R(124 + k * 8, 82, 5, 16, '#F8BBD0', 1.5, 2))
      + ring(4, (k) => P(`M${162 + k * 7} 86c2-4 6-4 6 0l-2 10h-2z`, '#5D4037', 1.5))
      + P('M176 98c-6-10 4-18 10-12 2 8-4 12-10 12z', '#43A047', 2) + ring(5, (k) => C(70 + k * 24, 110, 2.5, '#FF8A65', 0))
      + g(120, 154, 1, face(0, 0, 0.5))
      + g(206, 196, 1, E(0, 0, 18, 9, '#ECEFF1', 3) + E(0, -1, 12, 5, '#B39DDB', 0))
      + g(36, 194, 1, P('M-14 6c0-16 28-16 28 0z', '#C5E1A5', 3) + Lc('M-10 4c6-6 14-6 20 0', '#7CB342', 2))),

  // ---------- Bohol
  L('ph/bohol/landmark-danggit.v1.svg', 'ปลาดังกิตตากแห้งทอดกรอบกับข้าวผัดกระเทียม อาหารเช้าของเซบู', 'Crispy danggit, Cebu’s dried fish, with garlic rice for breakfast', ['danggit', 'ดังกิต', 'dried rabbitfish', 'ปลาตากแห้ง', 'crispy fried fish', 'ปลาทอดกรอบ', 'garlic rice', 'ข้าวผัดกระเทียม', 'vinegar dip', 'น้ำส้มสายชูจิ้ม', 'pasalubong', 'ของฝากเซบู', 'taboan', 'ตาโบอัน'], 'หาถ้วยน้ำจิ้มที่มีพริกลอยอยู่', 'Find the little dip bowl with chilli floating in it',
    // a woven rattan plate on a banana leaf: three flat golden-brown split dried fish fanned out, crispy and see-through at the fins, a dome of garlic rice dotted with toasted garlic, a sunny-side egg, a small bowl of vinegar with red chilli and onion, one fish smiling
    P('M14 150c20-70 190-90 212-20-30 70-180 84-212 20z', '#7CB342', 3.5) + Lc('M30 150c60-20 130-30 186-24', '#9CCC65', 3)
      + E(120, 150, 96, 60, '#E8D2A6', 4) + E(120, 150, 82, 50, '#F5E6C8', 2.5)
      + ring(3, (k) => g(80 + k * 24, 142 - k * 6, 1, P('M-30 0c10-22 40-26 60-8l14-10v36l-14-10c-20 18-50 14-60-8z', k === 1 ? '#E0A030' : '#D4892A', 3.5) + ring(4, (j) => Lc(`M${-16 + j * 9} -8v16`, '#B26A1A', 2)), -20 + k * 14))
      + g(104, 136, 1, face(0, 0, 0.26))
      + P('M148 168c0-26 18-36 30-36s30 10 30 36z', '#FFFDF5', 3.5) + ring(6, (k) => C(160 + (k % 3) * 10, 150 + Math.floor(k / 3) * 8, 2.5, '#D4A373', 0))
      + E(168, 112, 20, 14, '#FFFFFF', 3) + C(168, 112, 7, '#FFB300', 2.5)
      + g(52, 196, 1, E(0, 0, 22, 12, '#ECEFF1', 3.5) + E(0, -2, 16, 7, '#FFF8E1', 0) + C(-6, -2, 3, '#E53935', 0) + C(5, -1, 3, '#E53935', 0) + C(0, -4, 2.5, '#CE93D8', 0))),

  // ---------- Phu Quoc
  L('vn/phuquoc/landmark-bunken.v1.svg', 'บุ๋นแก๊น ขนมจีนน้ำแกงปลากะทิของฟูก๊วก', 'Bún kèn, Phú Quốc’s noodles in coconut fish curry', ['bún kèn', 'บุ๋นแก๊น', 'bun ken', 'fish curry noodles', 'ขนมจีนน้ำแกงปลา', 'coconut milk broth', 'น้ำแกงกะทิ', 'green papaya shreds', 'มะละกอดิบซอย', 'duong dong breakfast', 'อาหารเช้าเซืองดง', 'rice vermicelli', 'เส้นหมี่ขาว'], 'หาเส้นมะละกอสีเขียวบนชาม', 'Find the green papaya shreds on top',
    // a white bowl with a blue rim, round white rice noodles under a creamy yellow-orange coconut fish curry, flakes of fish, a heap of green papaya and banana-flower shreds, mint leaves, a lime wedge and red chilli rings, the bowl smiling
    Lc('M96 40c-8-10 8-18 0-28M124 36c-8-10 8-18 0-28', '#B0BEC5', 3)
      + P('M20 104h200c-6 64-48 104-100 104S26 168 20 104z', '#FFFFFF', 4) + Lc('M26 132c30 8 158 8 188 0', '#1E88E5', 5)
      + E(120, 104, 100, 22, '#FFB74D', 4) + Lc('M40 104c20-6 40 6 60 0s40-6 60 0 30 4 40 0', '#FFE0B2', 3)
      + ring(6, (k) => Lc(`M${44 + k * 26} 96c6 4 10 4 16 0`, '#FFFFFF', 4))
      + ring(4, (k) => P(`M${54 + k * 20} 112c4-8 12-8 14 0-4 4-10 4-14 0z`, '#FFF8E1', 2))
      + ring(9, (k) => Lc(`M${136 + (k % 5) * 8} ${88 + Math.floor(k / 5) * 8}l14 ${k % 2 ? 6 : -6}`, '#9CCC65', 3))
      + P('M178 98c6-14 22-14 24 0z', '#AED581', 2.5) + P('M100 86c-6-10 4-18 10-12 2 8-4 12-10 12z', '#43A047', 2)
      + ring(3, (k) => C(64 + k * 14, 92, 4, 'none', 2) + C(64 + k * 14, 92, 4, '#E53935', 0) + C(64 + k * 14, 92, 1.5, '#FFF59D', 0))
      + g(120, 168, 1, face(0, 0, 0.5))),
  L('vn/phuquoc/landmark-mantisshrimp.v1.svg', 'กั้งตั๊กแตนสีรุ้งใต้ทะเลฟูก๊วก', 'A rainbow mantis shrimp under the sea of Phú Quốc', ['mantis shrimp', 'กั้งตั๊กแตน', 'tôm tít', 'ต๋อมติ๊ต', 'bề bề', 'เบ๋เบ๋', 'colourful sea creature', 'สัตว์ทะเลหลากสี', 'snorkelling trip', 'ดำน้ำตื้น', 'seafood dinner', 'มื้อซีฟู้ด'], 'หาตาโปนสองข้างที่อยู่บนก้านยาว', 'Find the two big eyes sitting on long stalks',
    // turquoise water and sand with a little coral, a chunky mantis shrimp seen from the side: a green segmented body with blue edges, orange feet, a fan-shaped red and blue tail, two folded pink punching arms, round eyes on stalks, a happy face
    sky('#4DD0E1') + R(-4, 186, 248, 58, '#FFE0B2', 0, 0) + Lc('M-4 186c40-6 80 6 120 0s80-6 124 0', '#FFCC80', 3)
      + g(214, 186, 1, P('M0 0c-4-20 4-30 0-46M0-24c8-4 12-14 10-22M0-14c-8-2-14-10-14-18', 'none', 0) + Lc('M0 0c-4-20 4-30 0-46M0-24c8-4 12-14 10-22M0-14c-8-2-14-10-14-18', '#FF8A80', 7))
      + ring(5, (k) => C(30 + k * 14, 30 + (k % 2) * 16, 4, '#E0F7FA', 1.5))
      + ring(5, (k) => Lc(`M${84 + k * 18} 160l-4 18`, '#FF7043', 4))
      + P('M196 128c10-6 24 0 26 12-8-2-12 6-22 4 4 10-6 18-14 12z', '#E53935', 3.5) + Lc('M206 132l8 10', '#42A5F5', 3)
      + ring(5, (k) => P(`M${64 + k * 26} 118c6-14 22-14 28 0v32c-6 8-22 8-28 0z`, k % 2 ? '#66BB6A' : '#43A047', 3.5) + Lc(`M${66 + k * 26} 120c6-10 18-10 24 0`, '#29B6F6', 3))
      + P('M30 112c4-22 24-30 40-22v52c-18 6-38-6-40-30z', '#7CB342', 3.5)
      + P('M46 136c-22 6-30 30-14 40 12 6 22-6 18-18z', '#F48FB1', 3.5) + P('M34 150c-10 8-12 24 0 30 4-8 2-20 0-30z', '#F06292', 3) + C(38, 158, 4, '#42A5F5', 0)
      + Lc('M40 92l-8-22M54 90l4-24', '#7CB342', 4) + C(32, 66, 9, '#FFFFFF', 3) + C(58, 62, 9, '#FFFFFF', 3) + C(33, 67, 4, INK, 0) + C(59, 63, 4, INK, 0)
      + Lc('M30 98l-20-10M34 96l-14-20', '#FFB74D', 2.5) + g(50, 116, 1, face(0, 0, 0.28, 'none')) + P('M44 126q6 5 12 0', 'none', 2.5)),

  // ---------- Hiroshima and Miyajima
  L('jp/hiroshima/landmark-hassakudaifuku.v1.svg', 'ฮัสซากุไดฟุกุ โมจิไส้ส้มฮัสซากุของเกาะอินโนะชิมะ', 'Hassaku daifuku, Innoshima’s mochi with a juicy citrus segment', ['hassaku daifuku', 'ฮัสซากุไดฟุกุ', 'innoshima', 'เกาะอินโนะชิมะ', 'citrus mochi', 'โมจิไส้ส้ม', 'white bean paste', 'ถั่วขาวกวน', 'seto inland sea islands', 'หมู่เกาะทะเลเซโตะใน', 'hassaku orange', 'ส้มฮัสซากุ'], 'หากลีบส้มที่ซ่อนอยู่ในโมจิ', 'Find the orange segment hiding inside the mochi',
    // a small lacquer plate with two round soft white mochi dusted with flour, one cut in half to show creamy white bean paste and a juicy orange citrus segment inside, a big knobbly yellow-orange hassaku with a leaf behind, a little wooden pick, one mochi smiling
    g(176, 76, 1, C(0, 0, 40, '#FFB74D', 4) + ring(6, (k) => C(-18 + (k % 3) * 18, -14 + Math.floor(k / 3) * 22, 2.5, '#F57C00', 0)) + Lc('M0-40v-10', '#6D4C41', 4) + P('M2-46c10-14 30-12 34 0-12 6-24 6-34 0z', '#7CB342', 3))
      + E(110, 182, 100, 26, '#B71C1C', 4) + E(110, 178, 88, 18, '#D32F2F', 0)
      + g(62, 156, 1, P('M-36 14c-4-30 14-46 36-46s40 16 36 46c-20 8-52 8-72 0z', '#FFFDF5', 4) + C(-14, -18, 2, '#FFFFFF', 0) + face(0, -4, 0.38))
      + g(150, 158, 1, P('M-34 12c-2-26 14-42 34-42v54c-14 2-26 0-34-12z', '#FFFDF5', 4) + P('M0-30c20 0 36 16 34 42-8 12-20 14-34 12z', '#FFFDF5', 4)
        + E(-4, -2, 22, 22, '#F5EEDC', 2.5) + P('M-18 2c0-14 10-22 20-22 8 6 8 22-2 30-10 2-18-2-18-8z', '#FFA726', 3) + Lc('M-12 -4l10 6M-8-12l8 10', '#FFE0B2', 2))
      + Lc('M208 150l-26 30', '#A1887F', 4)),

  // ---------- Seoul
  L('kr/seoul/landmark-kkultarae.v1.svg', 'กุลทาเร ขนมไหมน้ำผึ้งที่ดึงเป็นหมื่นเส้นที่อินซาดง', 'Kkultarae, honey thread candy pulled into thousands of strands in Insadong', ['kkultarae', 'กุลทาเร', 'honey thread candy', 'ขนมเส้นไหมน้ำผึ้ง', 'dragon’s beard candy', 'ขนมหนวดมังกร', 'insadong street show', 'การแสดงกลางถนนอินซาดง', 'pulled honey', 'น้ำผึ้งดึงเส้น', 'nut filling', 'ไส้ถั่ว'], 'หาวงน้ำผึ้งที่ถูกดึงจนเป็นเส้นบางๆ', 'Find the ring of honey stretched into fine threads',
    // two hands in white gloves stretching a big ring of honey into a cloud of fine white threads over a tray of cornstarch, a row of little white cocoon candies on a black lacquer box beside them, one cocoon cut open to show chopped nuts, a candy smiling
    R(-4, 168, 248, 76, '#8D6E63', 0, 0) + R(20, 150, 200, 30, '#FFFFFF', 6, 3.5) + Lc('M30 162h180', '#ECEFF1', 3)
      + E(120, 96, 76, 52, 'none', 0) + ring(8, (k) => Lc(`M${50 + k * 2} ${96 + k}c30-${50 - k * 3} 110-${50 - k * 3} 140 0c-30 ${50 - k * 3}-110 ${50 - k * 3}-140 0`, k % 2 ? '#E8C77A' : '#D7A86E', 2.5))
      + E(120, 96, 72, 46, 'none', 3)
      + g(46, 96, 1, P('M-14-14h22l6 28h-22z', '#FFFFFF', 3.5) + R(-26, 4, 18, 14, '#FFE0BD', 4, 3))
      + g(194, 96, 1, P('M14-14h-22l-6 28h22z', '#FFFFFF', 3.5) + R(8, 4, 18, 14, '#FFE0BD', 4, 3))
      + R(36, 192, 168, 34, '#263238', 6, 3.5) + Lc('M36 200h168', '#C62828', 3)
      + ring(4, (k) => E(62 + k * 34, 192, 15, 10, '#FFFDF5', 3) + Lc(`M${52 + k * 34} 190c6-4 14-4 20 0`, '#ECEFF1', 2))
      + g(174, 192, 1, E(0, 0, 15, 10, '#FFFDF5', 3) + E(0, 0, 9, 5, '#D7A86E', 0) + C(-3, -1, 2, '#8D6E63', 0) + C(4, 1, 2, '#8D6E63', 0))
      + g(96, 190, 1, face(0, 0, 0.2, 'none'))),

  // ---------- Jeju
  L('kr/jeju/landmark-gogiguksu.v1.svg', 'โกกีกุกซู ก๋วยเตี๋ยวน้ำซุปกระดูกหมูของเชจู', 'Gogi guksu, Jeju’s noodles in pork bone broth', ['gogi guksu', 'โกกีกุกซู', 'pork noodle soup', 'ก๋วยเตี๋ยวหมูน้ำซุปขุ่น', 'pork bone broth', 'น้ำซุปกระดูกหมู', 'guksu street', 'ถนนกุกซู', 'thick wheat noodles', 'เส้นแป้งสาลีเส้นใหญ่', 'sliced pork on top', 'หมูสไลซ์โปะหน้า'], 'หาหมูสไลซ์สามชิ้นที่วางเรียงบนเส้น', 'Find the three slices of pork lined up on the noodles',
    // a big brass bowl of milky white broth, thick round noodles peeking out, three slices of boiled pork fanned on top, green onion, red chilli threads and sesame seeds, a long spoon and chopsticks on a wooden tray, the bowl smiling
    R(14, 176, 212, 44, '#D7B98E', 8, 4) + Lc('M14 196h212', '#C9A97A', 3)
      + Lc('M92 40c-8-10 8-18 0-28M120 36c-8-10 8-18 0-28M148 40c-8-10 8-18 0-28', '#B0BEC5', 3)
      + P('M28 100h184c-6 56-44 84-92 84s-86-28-92-84z', '#E0B864', 4) + Lc('M40 132c40 16 120 16 160 0', '#C9A04A', 4)
      + E(120, 100, 92, 22, '#FAF6EE', 4)
      + ring(6, (k) => Lc(`M${48 + k * 26} 98c6 6 12 6 18 0`, '#FFF3D6', 5))
      + ring(3, (k) => g(98 + k * 22, 94, 1, P('M-16 4c0-14 32-14 32 0l-4 6h-24z', '#F8BBD0', 3) + Lc('M-12 2c6-4 18-4 24 0', '#FFFFFF', 2.5), -10 + k * 10))
      + ring(6, (k) => C(64 + k * 10, 104 - (k % 2) * 4, 3, '#66BB6A', 0)) + Lc('M162 92c6 4 14 0 20 4M166 100c6 2 10-2 16 0', '#E53935', 2)
      + g(120, 150, 1, face(0, 0, 0.5))
      + Lc('M190 210l40-36M200 214l40-36', '#8D6E63', 4)),

  // ---------- Beijing
  L('cn/beijing/landmark-cctv.v1.svg', 'ตึกซีซีทีวีที่เป็นวงห่วงเอียงๆ ในย่านธุรกิจปักกิ่ง', 'The CCTV Headquarters, the leaning loop of a tower', ['cctv headquarters', 'ตึกซีซีทีวี', 'big pants building', 'ตึกกางเกงตัวใหญ่', 'loop tower', 'ตึกรูปห่วง', 'central business district', 'ย่านธุรกิจซีบีดี', 'guomao', 'กั๋วเม่า', 'leaning glass towers', 'ตึกกระจกเอียง'], 'หาช่องว่างใหญ่ตรงกลางตึก', 'Find the big empty hole in the middle of the building',
    // a pale blue sky, two leaning glass towers joined at the top by a bent overhang and at the bottom by a wide base, making a loop with a big hole in the middle, a diagonal grid on the glass, little trees and one cloud
    sky('#E1F5FE') + E(60, 40, 30, 12, '#FFFFFF', 0) + R(-4, 200, 248, 44, '#C5E1A5', 0, 0)
      + P('M40 200l10-120h56l-10 120zM120 200l14-124h56l-6 124z', '#78909C', 4)
      + P('M50 80l14-50h126l-6 46h-56l-6 30H50z', '#90A4AE', 4)
      + P('M40 200h150v-24H40z', '#90A4AE', 4)
      + P('M106 176l8-70h20l-8 70z', '#E1F5FE', 3)
      + ring(5, (k) => Lc(`M${54 + k * 12} 196l12-110`, '#B0BEC5', 2)) + ring(4, (k) => Lc(`M${138 + k * 12} 196l6-110`, '#B0BEC5', 2))
      + ring(4, (k) => Lc(`M${70 + k * 30} 36l-20 40`, '#CFD8DC', 2))
      + g(120, 54, 1, face(0, 0, 0.36))
      + ring(4, (k) => g(24 + k * 64, 214, 1, C(0, -10, 10, '#66BB6A', 2.5) + Lc('M0 0v8', '#6D4C41', 3)))),

  // ---------- Harbin
  L('cn/harbin/landmark-niandoubao.v1.svg', 'เหนียนโต้วเปา ซาลาเปาข้าวเหนียวไส้ถั่วแดงที่แช่แข็งไว้นอกบ้าน', 'Nian dou bao, sticky bean buns frozen outside for winter', ['nian dou bao', 'เหนียนโต้วเปา', 'sticky bean buns', 'ซาลาเปาข้าวเหนียวถั่วแดง', 'frozen on the windowsill', 'แช่แข็งริมหน้าต่าง', 'yellow millet dough', 'แป้งข้าวฟ่างสีเหลือง', 'northeast winter food', 'อาหารหน้าหนาวภาคอีสานจีน', 'bamboo steamer', 'เข่งนึ่งไม้ไผ่'], 'หาซาลาเปาลูกที่โดนแบ่งครึ่งจนเห็นถั่วแดง', 'Find the bun cut in half to show the red beans',
    // a wooden board on a snowy windowsill with rows of round yellow millet buns, frost on them, one cut open to show dark red bean paste, snowflakes falling, a steaming bamboo steamer on the warm side of the window, a bun smiling
    sky('#B3E5FC') + R(-4, 16, 120, 140, '#FFE0B2', 0, 3) + Lc('M56 16v140M-4 86h120', '#8D6E63', 6)
      + g(60, 130, 1, R(-36, -10, 72, 26, '#D7B98E', 6, 3.5) + E(0, -10, 36, 8, '#E8D2A6', 3) + Lc('M-30 -18c-6-10 6-16 0-24M0 -22c-6-10 6-16 0-24M28 -18c-6-10 6-16 0-24', '#FFFFFF', 3))
      + R(-4, 156, 248, 20, '#8D6E63', 0, 4) + R(-4, 176, 248, 68, '#ECEFF1', 0, 0)
      + R(118, 140, 122, 16, '#FFFFFF', 6, 3) + R(110, 148, 130, 10, '#A1887F', 2, 3)
      + ring(3, (k) => C(136 + k * 26, 134, 12, '#FFD54F', 3) + C(132 + k * 26, 128, 3, '#FFFFFF', 0))
      + ring(2, (k) => C(150 + k * 26, 112, 12, '#FFD54F', 3))
      + g(222, 134, 0.72, C(-14, 0, 16, '#FFD54F', 3.5) + P('M2-16a16 16 0 0 1 0 32z', '#FFD54F', 3.5) + C(-14, 0, 8, '#6D2C2C', 0) + C(4, 0, 8, '#6D2C2C', 0))
      + g(150, 112, 1, face(0, 0, 0.22))
      + ring(6, (k) => g([132, 200, 220, 160, 30, 90][k], [30, 50, 90, 70, 200, 220][k], 1, P('M0-7v14M-6-3l12 6M-6 3l12-6', 'none', 2.5)))),

  // ---------- Singapore, the country
  K('sg.food.kuehtutu', 'ขนมกุ้ยตูตู ขนมแป้งนึ่งรูปดอกไม้ไส้ถั่วบนใบเตย', 'Kueh tutu, little flower-shaped steamed cakes on pandan leaves', ['kueh tutu', 'กุ้ยตูตู', 'steamed rice flour cakes', 'ขนมแป้งข้าวนึ่ง', 'peanut filling', 'ไส้ถั่วลิสง', 'grated coconut filling', 'ไส้มะพร้าวขูด', 'pandan leaf', 'ใบเตย', 'wooden flower moulds', 'พิมพ์ไม้รูปดอกไม้'],
    // a tray lined with green pandan leaves holding round white scalloped steamed cakes, one broken open to show brown peanut filling and one with pink coconut, a small wooden flower-shaped mould and a little steaming pot behind, one cake smiling
    g(178, 64, 1, R(-30, -6, 60, 40, '#B0BEC5', 6, 3.5) + E(0, -6, 30, 8, '#CFD8DC', 3) + Lc('M-12-18c-6-10 6-16 0-24M12-18c-6-10 6-16 0-24', '#B0BEC5', 3))
      + R(20, 110, 200, 96, '#D7B98E', 10, 4)
      + ring(5, (k) => P(`M${30 + k * 38} 194c-6-30 6-62 18-74 12 12 24 44 18 74z`, k % 2 ? '#7CB342' : '#8BC34A', 2.5))
      + ring(4, (k) => { const x = 58 + (k % 2) * 62 + (k > 1 ? 30 : 0), y = 140 + (k > 1 ? 34 : 0); return g(x, y, 1, ring(8, (p) => C(Math.cos(p * 0.785) * 18, Math.sin(p * 0.785) * 12, 8, '#FFFDF5', 0)) + E(0, 0, 24, 16, '#FFFDF5', 3.5) + Lc('M-14-6c8-4 20-4 28 0', '#FFFFFF', 3)); })
      + g(58, 140, 1, face(0, 2, 0.26))
      + g(150, 174, 1, E(0, 0, 13, 8, '#A1887F', 0) + ring(4, (p) => C(-6 + p * 4, -1 + (p % 2) * 3, 2, '#5D4037', 0)))
      + g(60, 70, 1, C(0, 0, 24, '#A1887F', 3.5) + ring(6, (p) => C(Math.cos(p * 1.05) * 9, Math.sin(p * 1.05) * 9, 6, '#8D6E63', 2)) + C(0, 0, 4, '#6D4C41', 0))),

  // ---------- Bali
  L('id/bali/landmark-betutu.v1.svg', 'เบเบ็กเบตูตู เป็ดอบเครื่องแกงห่อใบตองของบาหลี', 'Bebek betutu, Bali’s spiced duck slow-cooked in leaves', ['bebek betutu', 'เบเบ็กเบตูตู', 'ayam betutu', 'อายัมเบตูตู', 'slow-cooked duck', 'เป็ดอบช้า', 'basa genep spice paste', 'เครื่องแกงบาซาเกอเนป', 'banana leaf parcel', 'ห่อใบตอง', 'gilimanuk', 'กีลีมานุก'], 'หาห่อใบไม้ที่แกะออกแล้ว', 'Find the leaf parcel opened up',
    // a woven bamboo plate, a big parcel of browned banana leaves tied with string unwrapped to show a golden-yellow spiced duck, a little mound of white rice, a bowl of chopped red shallot sambal, long beans, the parcel smiling
    E(120, 170, 108, 52, '#D7B98E', 4) + E(120, 170, 94, 42, '#E8D2A6', 2.5) + ring(8, (k) => Lc(`M${40 + k * 22} 140l-8 60`, '#C9A97A', 2))
      + P('M40 160c-20-40 0-70 30-80 10 30 20 60 40 76z', '#7CB342', 3.5) + P('M200 160c20-40 0-70-30-80-10 30-20 60-40 76z', '#689F38', 3.5)
      + P('M70 82l-6-24M170 82l6-24', 'none', 0) + Lc('M70 82c10 10 20 20 26 30M170 82c-10 10-20 20-26 30', '#8D6E63', 3)
      + P('M76 158c-6-36 18-60 44-60s50 24 44 60c-26 10-62 10-88 0z', '#F9A825', 4) + ring(6, (k) => C(90 + (k % 3) * 20, 120 + Math.floor(k / 3) * 18, 3.5, '#E65100', 0))
      + P('M88 102c-8-12-4-24 8-22', 'none', 0) + g(120, 128, 1, face(0, 0, 0.42))
      + g(54, 188, 1, E(0, 0, 22, 12, '#FFFFFF', 3))
      + g(186, 188, 1, E(0, 2, 20, 10, '#FFFFFF', 3) + ring(5, (k) => C(-10 + k * 5, -1 + (k % 2) * 3, 3, '#E53935', 0)))
      + Lc('M90 206c20 6 40 6 60 0', '#43A047', 4)),

  // ---------- Penang
  L('my/penang/landmark-paitee.v1.svg', 'ไพตี ขนมหมวกทรงสูงกรอบไส้มันแกวของย่าหยาปีนัง', 'Pie tee, the crispy top hats of Penang’s Nyonya kitchens', ['pie tee', 'ไพตี', 'kuih pie tee', 'ขนมหมวกทรงสูง', 'top hats', 'ถ้วยแป้งกรอบ', 'jicama filling', 'ไส้มันแกว', 'brass mould', 'พิมพ์ทองเหลือง', 'nyonya appetiser', 'อาหารว่างย่าหยา'], 'หาพิมพ์ทองเหลืองที่ใช้ทอดหมวก', 'Find the brass mould that makes the hats',
    // a pale blue plate with four crispy golden fluted cups shaped like little top hats, each piled with shredded jicama, a pink prawn, red chilli and a sprig of coriander, a long-handled brass mould at the side, one hat smiling
    E(110, 168, 100, 46, '#E3F2FD', 4) + E(110, 168, 84, 36, '#BBDEFB', 2)
      + ring(4, (k) => { const x = 50 + k * 40, y = 160 - (k % 2) * 16; return g(x, y, 1, E(0, 14, 20, 6, '#E0A030', 3) + P('M-14 14l2-30h24l2 30z', '#F6B93B', 3.5) + ring(4, (j) => Lc(`M${-8 + j * 5} 10v-22`, '#E0A030', 2)) + E(0, -16, 14, 6, '#FFF8E1', 3) + ring(4, (j) => Lc(`M${-8 + j * 5} -18l3-6`, '#FFFDE7', 3)) + P('M-4-24c2-8 10-8 12-2-4 4-8 4-12 2z', '#FF8A80', 2) + C(-6, -22, 2.5, '#E53935', 0) + P('M2-26c2-6 6-6 6-2', '#66BB6A', 2)); })
      + g(90, 154, 1, face(0, 0, 0.24))
      + g(204, 94, 1, Lc('M0 0l-34-66', '#8D6E63', 6) + P('M-10 0l2 24h18l2-24z', '#FFC107', 3.5) + ring(3, (j) => Lc(`M${-4 + j * 5} 4v16`, '#FFA000', 2)), -10)),

  // ---------- Delhi, Agra and Jaipur
  L('in/golden/landmark-kachori.v1.svg', 'ปยาซกะโชรี ขนมแป้งทอดไส้หัวหอมของชัยปุระ', 'Pyaaz kachori, Jaipur’s puffy fried pastry stuffed with onion', ['pyaaz kachori', 'ปยาซกะโชรี', 'onion kachori', 'กะโชรีไส้หัวหอม', 'fried pastry', 'แป้งทอดพอง', 'tamarind chutney', 'ซอสมะขาม', 'leaf bowl', 'ถ้วยใบไม้', 'morning snack queue', 'แถวรอซื้อของว่างตอนเช้า'], 'หากะโชรีที่หักครึ่งเห็นไส้ข้างใน', 'Find the kachori broken open to show its filling',
    // a round leaf plate stitched from big leaves, two puffy golden round kachoris with flaky crusts, one broken open to show a spicy onion filling, a pool of brown tamarind chutney and green mint chutney, a big black kadai of oil behind with more kachoris bobbing, one smiling
    g(170, 70, 1, E(0, 0, 54, 18, '#37474F', 4) + E(0, -4, 46, 10, '#FFB300', 0) + ring(3, (k) => C(-20 + k * 20, -6, 9, '#E0A030', 2.5)) + Lc('M-54 0l-10-6M54 0l10-6', INK, 4))
      + E(110, 160, 100, 56, '#9CCC65', 4) + ring(8, (k) => Lc(`M${110 + Math.cos(k * 0.785) * 30} ${160 + Math.sin(k * 0.785) * 17}L${110 + Math.cos(k * 0.785) * 96} ${160 + Math.sin(k * 0.785) * 53}`, '#7CB342', 2))
      + E(146, 182, 30, 12, '#795548', 3) + E(70, 186, 22, 9, '#66BB6A', 3)
      + g(84, 146, 1, P('M-36 8c-4-26 16-40 36-40s40 14 36 40c-20 12-52 12-72 0z', '#F6B93B', 4) + Lc('M-24-10c8-6 16-6 22 0M2-14c8-6 16-6 22 0', '#E0A030', 3) + face(0, -2, 0.36))
      + g(160, 140, 1, P('M-30 10c-4-22 8-34 22-36l6 14-4 22z', '#F6B93B', 3.5) + P('M8 10c4-22-4-34-12-36l-2 14 4 22z', '#F6B93B', 3.5) + E(-2, 0, 9, 12, '#C67C3A', 0) + C(-4, -4, 2, '#8BC34A', 0) + C(1, 3, 2, '#E53935', 0))),

  // ---------- Bhutan, the country
  K('bt.culture.degor', 'เดอกอร์ เกมทอยหินแบนกลมให้ใกล้หมุดเป้า', 'Degor, throwing flat round stones at a peg', ['degor', 'เดอกอร์', 'stone discs', 'หินแบนกลม', 'throwing game', 'เกมทอยหิน', 'target peg', 'หมุดเป้า', 'village sport', 'กีฬาหมู่บ้านภูฏาน', 'meadow game', 'เกมกลางทุ่ง'],
    // a grassy meadow with blue mountains behind, a short wooden peg standing in the ground with a little ribbon, two flat round grey stones landed near it, a big flat stone in front with a smiling face, swoosh lines showing its throw
    P('M-4 120l50-50 40 34 50-60 54 50 54-30v80H-4z', '#90A4AE', 0) + P('M140 44l12 12h-24zM34 82l12 10h-22z', '#FFFFFF', 0)
      + E(120, 176, 116, 50, '#9CCC65', 4)
      + g(170, 140, 1, Lc('M0 0v-40', '#8D6E63', 6) + P('M0-40l18 6-18 6z', '#FFCA28', 2.5) + E(0, 2, 8, 3, '#7CB342', 0))
      + E(148, 152, 16, 6, '#B0BEC5', 3) + E(196, 158, 14, 5, '#9E9E9E', 3)
      + Lc('M150 60c-30-10-70 10-90 50', '#FFFFFF', 4) + Lc('M150 72c-26-6-60 12-76 46', '#FFFFFF', 3)
      + g(74, 186, 1, E(0, 6, 46, 14, '#78909C', 4) + E(0, 0, 46, 14, '#B0BEC5', 4) + face(0, -2, 0.42))),

  // ---------- Kandy, Ella and Sigiriya
  L('lk/hills/landmark-hornedlizard.v1.svg', 'กิ้งก่าเขาแรดในป่าเมฆบนที่สูงของศรีลังกา', 'The rhino-horned lizard of the misty hill forests', ['rhino-horned lizard', 'กิ้งก่าเขาแรด', 'horned lizard', 'กิ้งก่ามีเขา', 'cloud forest', 'ป่าเมฆ', 'endemic lizard', 'กิ้งก่าเฉพาะถิ่น', 'hakgala', 'ฮักกาลา', 'nature walk in the mist', 'เดินป่าในหมอก'], 'หาเขาเล็กๆ ที่ปลายจมูก', 'Find the little horn on the tip of its nose',
    // a misty green forest, a mossy branch across the picture, a plump green and brown lizard clinging to it with a short horn on the tip of its snout, a little crest of spines on its back, a curling tail, a happy face, ferns below and wisps of mist
    sky('#C8E6C9') + ring(3, (k) => Lc(`M${20 + k * 80} -4v248`, '#A5D6A7', 18)) + Lc('M-4 60c40 10 80-10 120 0M110 40c40 10 80-6 134 0', '#FFFFFF', 6)
      + P('M-4 172c60-20 160-30 248-10v18c-90-20-180-10-248 10z', '#8D6E63', 4) + ring(6, (k) => E(20 + k * 40, 164 - (k % 3) * 3, 14, 5, '#7CB342', 0))
      + P('M190 140c30 4 40 30 20 40-14 6-20-6-12-12', 'none', 0) + Lc('M184 142c34 4 46 34 22 42-14 4-20-8-10-14', '#689F38', 9) + Lc('M184 142c34 4 46 34 22 42-14 4-20-8-10-14', INK, 0)
      + P('M58 140c10-30 50-38 90-30 20 4 36 14 40 30-40 12-90 12-130 0z', '#7CB342', 4) + ring(5, (k) => P(`M${84 + k * 18} 112l6-12 6 12`, '#558B2F', 2.5))
      + ring(5, (k) => C(96 + k * 16, 128, 4, '#AED581', 0))
      + Lc('M84 146l-6 20M106 148l2 18M150 148l-4 20M172 144l6 18', '#689F38', 6)
      + P('M24 134c0-18 20-30 40-24s16 34-4 38c-14 2-30-2-36-14z', '#8BC34A', 4) + P('M26 124l-12-12 6-2 12 6z', '#FFB300', 3)
      + g(46, 130, 1, face(0, 0, 0.36))
      + ring(4, (k) => g(30 + k * 60, 230, 1, P('M0 0c-6-16-20-20-28-18 8 4 16 10 28 18zM0 0c6-16 20-20 28-18-8 4-16 10-28 18z', '#66BB6A', 2.5)))),
];

export default { places: {}, items };
