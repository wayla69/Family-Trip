// Wave 9, East Asia part 1: Korea (the country layer, Seoul, Busan, Jeju, Gangwon, Gyeongju)
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (kr/busan/landmark-beomeosa.v1.svg → kr-busan.landmark.beomeosa)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture: kr/food-japchae.v1.svg → kr.food.japchae
const K = (file, th, en, kw, svg) => { const [cc, base] = file.split('/'); const [cat, ...rest] = base.replace(/\.v\d+\.svg$/, '').split('-'); return { id: `${cc}.${cat}.${rest.join('-')}`, cat, file, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const range = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
// a Korean tiled roof, curling up at both ends
const kroof = (x, y, w, c = '#455A64') => P(`M${x - w / 2 - 12} ${y - 10}c10 8 20 10 30 10h${w - 36}c10 0 20-2 30-10l-8 18H${x - w / 2 - 4}z`, c, 3) + P(`M${x - w / 2 + 10} ${y}c8-14 ${w - 20}-14 ${w - 20} 0`, c, 3);

const items = [
  // ---------- Korea, the country layer
  K('kr/food-japchae.v1.svg', 'จับแชวุ้นเส้นผัดเกาหลี', 'Japchae, glossy glass noodles', ['japchae', 'จับแช', 'glass noodles', 'วุ้นเส้นผัด', 'sweet potato noodles', 'วุ้นเส้นมันเทศ', 'stir-fried noodles', 'ผัดวุ้นเส้นเกาหลี', 'party dish', 'งานเลี้ยงเกาหลี'],
    // a white platter piled with shiny grey-brown glass noodles, strips of carrot, spinach, yellow egg, mushroom slices and sesame seeds, a pair of flat steel chopsticks
    E(120, 150, 100, 42, '#FFFFFF', 4) + E(120, 146, 84, 32, '#F5F5F5', 2) + P('M48 146c10-40 134-40 144 0c-20 18-124 18-144 0z', '#BCAAA4', 3)
      + range(9, (k) => Lc(`M${56 + k * 14} ${142 + (k % 3) * 3}c6-14 14-14 ${10 + k % 3 * 4}-28`, '#8D6E63', 2)) + range(5, (k) => Lc(`M${66 + k * 24} ${128 + (k % 2) * 10}l${12 - k * 3} -8`, '#FB8C00', 4)) + range(4, (k) => Lc(`M${80 + k * 22} ${118 + (k % 2) * 14}l10 6`, '#43A047', 5))
      + range(3, (k) => R(92 + k * 26, 128 - (k % 2) * 12, 14, 5, '#FFD54F', 1, 2)) + E(150, 122, 8, 5, '#6D4C41', 2) + E(98, 136, 8, 5, '#6D4C41', 2) + range(8, (k) => E(70 + k * 13, 116 + (k * 7) % 22, 1.8, 1.2, '#FFF8E1', 0))
      + Lc('M196 96l34-56M206 100l32-52', '#B0BEC5', 5) + face(120, 172, 0.45)),
  K('kr/food-dalgona.v1.svg', 'ขนมน้ำตาลทัลโกนาแกะลาย', 'Dalgona sugar candy with a shape to cut out', ['dalgona', 'ทัลโกนา', 'ppopgi', 'ปปบกี', 'sugar candy', 'ขนมน้ำตาลเคี่ยว', 'honeycomb candy', 'แกะลายดาว', 'star shape', 'needle game'],
    // a round flat golden candy pressed with a star shape, a little ladle of bubbling brown sugar over a tiny burner beside it, a pin for picking out the star
    C(104, 128, 70, '#E0A040', 4) + C(104, 128, 60, '#F0BE5A', 0) + range(10, (k) => C(64 + (k * 23) % 80, 92 + (k * 17) % 74, 3, '#E9AE48', 0))
      + P('M104 92l10 22 24 2-18 16 6 24-22-12-22 12 6-24-18-16 24-2z', '#FFD180', 3) + face(104, 130, 0.45)
      + R(178, 176, 40, 26, '#90A4AE', 4, 3) + Lc('M186 172c-4-8 4-12 0-20M206 172c-4-8 4-12 0-20', '#FF7043', 3) + E(196, 140, 22, 12, '#B0BEC5', 3) + E(196, 138, 16, 7, '#8D4E1A', 0) + Lc('M216 136l20-16', '#8D6E63', 6)
      + Lc('M40 212l46-30', '#90A4AE', 3) + C(38, 213, 4, '#E53935', 2)),
  K('kr/culture-bojagi.v1.svg', 'ผ้าห่อของปะต่อลายโพจากี', 'Bojagi, the patchwork wrapping cloth', ['bojagi', 'โพจากี', 'wrapping cloth', 'ผ้าห่อของ', 'patchwork', 'ผ้าปะต่อ', 'jogakbo', 'โชกักโบ', 'gift wrapping', 'ห่อของขวัญเกาหลี'],
    // a square cloth sewn from bright patches of every colour, its corners tied up in a knot over a gift box, the stitched seams showing
    P('M30 196l18-88h144l18 88z', '#E1BEE7', 4) + P('M48 108l40 88M120 108v88M192 108l-40 88M38 152h164', 'none', 3)
      + P('M50 110l36 0 2 40-46 2z', '#FF8A80', 2.5) + P('M124 112h64l4 38h-68z', '#80DEEA', 2.5) + P('M90 154h28v40H70z', '#FFF59D', 2.5) + P('M124 154h40l26 40h-66z', '#A5D6A7', 2.5)
      + P('M84 112c10-30 22-48 36-52 14 4 26 22 36 52z', '#F48FB1', 4) + P('M100 112c6-18 14-30 20-34', 'none', 2.5) + C(120, 62, 14, '#CE93D8', 4) + P('M106 58c-20-12-34-4-30 8 10 4 22 0 30-8zM134 58c20-12 34-4 30 8-10 4-22 0-30-8z', '#BA68C8', 3)
      + range(6, (k) => Lc(`M${56 + k * 26} 186h10`, '#FFFFFF', 2)) + face(120, 172, 0.45)),
  K('kr/food-bungeoppang.v1.svg', 'ขนมปลาบุงออปังไส้ถั่วแดง', 'Bungeoppang, the fish-shaped bread with red beans', ['bungeoppang', 'บุงออปัง', 'fish bread', 'ขนมรูปปลา', 'red bean', 'ไส้ถั่วแดง', 'winter street snack', 'ขนมข้างทางหน้าหนาว', 'fish mould', 'พิมพ์รูปปลา'],
    // two golden fish-shaped cakes with scales and fins, one bitten so the red bean filling shows, steam rising, in a paper bag, the iron fish mould behind
    R(30, 40, 180, 54, '#546E7A', 10, 4) + range(3, (k) => g(66 + k * 54, 67, 1, P('M-22 0c6-14 26-14 32 0-6 14-26 14-32 0zM10 0l12-10v20z', '#37474F', 2.5))) + Lc('M210 66h26', '#8D6E63', 8)
      + P('M54 214l12-92h108l12 92z', '#FFE0B2', 4) + Lc('M66 150h108', '#FFAB91', 3)
      + g(100, 132, 1, P('M-38 0c10-24 46-26 62 0-16 26-52 24-62 0zM24 0l20-16v32z', '#E0A040', 3.5) + range(6, (k) => P(`M${-24 + k * 8} -6q4 6 0 12`, 'none', 2)) + C(-26, -4, 3, INK, 0), -20)
      + g(146, 140, 1, P('M-34 0c10-24 46-26 58 0-12 26-48 24-58 0zM24 0l20-16v32z', '#E8A848', 3.5) + P('M-34 0c4-12 10-16 16-12-2 6-2 18 0 24-6 4-12 0-16-12z', '#8E2B2B', 2.5) + C(14, -4, 3, INK, 0), 14)
      + Lc('M120 98c-4-10 4-14 0-24M150 104c-4-10 4-14 0-24', '#ECEFF1', 3) + face(120, 180, 0.45)),

  // ---------- Seoul
  L('kr/seoul/landmark-sungnyemun.v1.svg', 'ประตูซุงนเยมุน ประตูเมืองทางใต้', 'Sungnyemun, the great south gate', ['sungnyemun', 'ซุงนเยมุน', 'namdaemun', 'นัมแดมุน', 'great south gate', 'ประตูเมืองทิศใต้', 'old city gate', 'ประตูเมืองเก่า', 'stone gate', 'two-storey gate tower'], 'หาซุ้มประตูโค้งที่ลอดผ่านกำแพงหินด้านล่าง', 'Find the round arch you walk through in the stone base',
    // a big stone base with one round arch, a two-storey wooden gate tower above with two layers of curling grey tiled roofs and red-green painted beams, little trees around
    sky('#E3F2FD') + R(-4, 210, 248, 34, '#C5E1A5', 0, 3) + P('M28 210l12-70h160l12 70z', '#BDBDBD', 4) + range(4, (k) => Lc(`M${36 + k * 2} ${196 - k * 16}h${168 - k * 4}`, '#9E9E9E', 2)) + P('M98 210v-34c0-30 44-30 44 0v34z', '#455A64', 4)
      + R(58, 108, 124, 32, '#C62828', 0, 3) + range(5, (k) => R(66 + k * 24, 112, 14, 24, '#2E7D32', 1, 2)) + kroof(120, 104, 150)
      + R(74, 62, 92, 26, '#C62828', 0, 3) + range(4, (k) => R(80 + k * 22, 66, 12, 18, '#2E7D32', 1, 2)) + kroof(120, 58, 116)
      + C(14, 196, 16, '#66BB6A', 3) + C(226, 196, 16, '#66BB6A', 3) + face(120, 120, 0.4)),
  L('kr/seoul/landmark-huwon.v1.svg', 'ศาลาพูยงจองในสวนลับชังด็อกกุง', 'Buyongjeong pavilion in the Secret Garden of Changdeokgung', ['secret garden', 'สวนลับ', 'huwon', 'ฮูวอน', 'changdeokgung', 'ชังด็อกกุง', 'buyongjeong', 'ศาลาพูยงจอง', 'square pond', 'royal garden'], 'หาศาลาที่ยื่นขาสองข้างลงไปยืนในสระน้ำสี่เหลี่ยม', 'Find the pavilion standing with two legs in the square pond',
    // a square lotus pond with a round island and a pine on it, a cross-shaped painted pavilion with two stone pillars standing in the water, maple trees in autumn red behind
    sky('#FFF3E0') + range(4, (k) => C(20 + k * 64, 70, 30, ['#EF6C00', '#E53935', '#FBC02D', '#D84315'][k], 3)) + R(-4, 92, 248, 152, '#AED581', 0, 0)
      + P('M14 144h212v84H14z', '#4FC3F7', 4) + C(170, 188, 18, '#8BC34A', 3) + Lc('M170 186v-20', '#6D4C41', 4) + P('M154 170c4-14 28-14 32 0z', '#2E7D32', 2.5)
      + R(52, 132, 6, 34, '#9E9E9E', 0, 2.5) + R(92, 132, 6, 34, '#9E9E9E', 0, 2.5) + R(40, 104, 70, 30, '#C62828', 0, 3) + range(3, (k) => R(48 + k * 20, 108, 14, 20, '#2E7D32', 1, 2)) + kroof(75, 100, 86)
      + Lc('M20 190c14-4 20 4 34 0M90 210c14-4 20 4 34 0', '#E1F5FE', 3) + range(3, (k) => C(110 + k * 20, 214 - k * 4, 6, '#F48FB1', 2)) + face(75, 118, 0.3)),
  L('kr/seoul/landmark-peacegate.v1.svg', 'ประตูสันติภาพในสวนโอลิมปิกโซล', 'The World Peace Gate in Olympic Park', ['world peace gate', 'ประตูสันติภาพโลก', 'olympic park', 'สวนโอลิมปิก', 'olympic park seoul', 'jamsil', 'ชัมชิล', 'winged gate', 'ประตูปีก', 'kite flying lawn'], 'หาปีกใหญ่สองข้างที่กางอยู่บนเสาประตู', 'Find the two huge wings spread out on top of the gate',
    // a huge gate of two great curved concrete wings spreading out on four columns, the underside painted with bright patterned stripes, a wide plaza with children running
    sky('#E1F5FE') + R(-4, 190, 248, 54, '#EEEEEE', 0, 3) + Lc('M-4 214h248', '#BDBDBD', 2)
      + P('M120 96C80 70 30 60-2 66l8 22c34-6 74 4 114 24z', '#ECEFF1', 4) + P('M120 96c40-26 90-36 122-30l-8 22c-34-6-74 4-114 24z', '#ECEFF1', 4)
      + P('M10 88c34-6 74 4 110 24 36-20 76-30 110-24l-4 12c-34-4-70 6-106 24-36-18-72-28-106-24z', '#E57373', 3) + range(8, (k) => C(24 + k * 27, 100 + Math.abs(k - 3.5) * -3 + 4, 4, ['#FFD54F', '#4FC3F7', '#81C784'][k % 3], 1.5))
      + range(4, (k) => R(44 + k * 46, 120, 14, 70, '#CFD8DC', 2, 3)) + kid(70, 214, '#FFCA28') + kid(176, 216, '#7E57C2') + face(120, 150, 0.4)),
  L('kr/seoul/landmark-bukhansan.v1.svg', 'ยอดหินแกรนิตแพกุนแดบนเขาพุกฮันซัน', 'The granite top of Baegundae on Bukhansan', ['bukhansan', 'พุกฮันซัน', 'baegundae', 'แพกุนแด', 'granite peak', 'ยอดหินแกรนิต', 'hiking in seoul', 'เดินป่าในโซล', 'national park', 'mountain flag'], 'หาคนตัวจิ๋วที่จับราวเหล็กปีนขึ้นหินก้อนใหญ่', 'Find the tiny climbers holding the rail up the big rock',
    // a huge bare round granite dome with a steel handrail zigzagging up it, tiny hikers in bright jackets, pine trees and the city far below in the haze
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#B0BEC5', 0, 0) + range(9, (k) => R(4 + k * 27, 200 - (k % 3) * 10, 18, 40, '#ECEFF1', 1, 2))
      + P('M10 210c10-80 40-150 110-160 60 6 100 80 110 160z', '#E0E0E0', 4) + P('M70 120c20-20 40-30 60-30', 'none', 3) + P('M150 150c12-6 24-6 34 4', 'none', 3)
      + Lc('M60 196l30-40 30-30 18-40 10-30', '#78909C', 3) + range(5, (k) => Lc(`M${[60, 90, 120, 138, 148][k]} ${[196, 156, 126, 86, 56][k]}v-12`, '#78909C', 3))
      + kid(96, 152, '#E53935', 0.7) + kid(130, 104, '#FFCA28', 0.7) + range(3, (k) => P(`M${20 + k * 180 / 2} 210l14-40 14 40z`, '#2E7D32', 3)) + face(170, 172, 0.4)),

  // ---------- Busan
  L('kr/busan/landmark-taejongdae.v1.svg', 'หน้าผาแทจงแดและหินชินซอนบาวี', 'The Taejongdae cliffs and the Sinseon rock', ['taejongdae', 'แทจงแด', 'sinseonbawi', 'หินชินซอนบาวี', 'yeongdo', 'ยองโด', 'danubi train', 'รถไฟดานูบี', 'sea cliffs', 'pine cliffs'], 'หารถไฟเล็กสีเหลืองที่วิ่งบนยอดหน้าผา', 'Find the little yellow road train driving along the cliff top',
    // tall layered rock cliffs dropping into a deep blue sea, a flat rock ledge at the bottom with waves splashing, pines on top, a little yellow road train on the cliff road
    sky('#E1F5FE') + P('M-4 170h248v74H-4z', '#1565C0', 0) + Lc('M150 196c14-4 22 4 36 0M20 220c14-4 22 4 36 0', '#90CAF9', 3)
      + P('M-4 60c40-6 90-4 140 10l20 100H-4z', '#8D6E63', 4) + range(5, (k) => Lc(`M-4 ${84 + k * 18}c50 ${-4 + k} 100 4 ${146 + k * 2} 10`, '#6D4C41', 2.5))
      + P('M90 170h96l10 12H80z', '#A1887F', 3) + Lc('M184 166c6-10 14-10 20 0M196 160c6-12 16-12 22 0', '#FFFFFF', 3)
      + range(4, (k) => C(14 + k * 34, 54 - (k % 2) * 6, 14, '#388E3C', 3)) + g(70, 44, 1, R(-26, -16, 22, 18, '#FFCA28', 4, 2.5) + R(0, -16, 22, 18, '#FFCA28', 4, 2.5) + C(-20, 4, 4, INK, 0) + C(16, 4, 4, INK, 0) + R(-22, -12, 12, 8, '#E1F5FE', 1, 1.5))
      + face(60, 120, 0.4)),
  L('kr/busan/landmark-anchovynets.v1.svg', 'ชาวประมงสะบัดตาข่ายปลากะตักที่คีจัง', 'Shaking anchovies out of the nets at Gijang', ['gijang anchovy', 'ปลากะตักคีจัง', 'myeolchi', 'มยอลชี', 'daebyeon port', 'ท่าเรือแทบยอน', 'shaking nets', 'สะบัดตาข่าย', 'anchovy festival', 'fishing song'], 'หาปลาตัวเล็กสีเงินที่ลอยกระเด็นออกจากตาข่าย', 'Find the little silver fish flying out of the net',
    // a row of fishermen in yellow oilskins holding a long green net between them and flicking it, a spray of tiny silver fish flying up in the air, a boat at the quay behind
    sky('#FFF8E1') + P('M-4 100h248v40H-4z', '#4FC3F7', 0) + P('M150 80h80l-10 24h-62z', '#1E88E5', 3) + R(176, 60, 22, 20, '#FFFFFF', 2, 2.5) + R(-4, 140, 248, 104, '#BDBDBD', 0, 3)
      + P('M30 160c40 30 140 30 180 0', 'none', 0) + P('M26 158c40 36 148 36 188 0l-6 14c-40 30-136 30-176 0z', '#66BB6A', 3) + range(9, (k) => Lc(`M${40 + k * 20} 168v${16 - Math.abs(k - 4) * 2}`, '#2E7D32', 2))
      + range(4, (k) => g(30 + k * 60, 196, 1, C(0, -40, 12, '#FFE0BD', 3) + P('M-12-52h24l-4-8h-16z', '#FFCA28', 2.5) + P('M-16 30v-56c0-8 32-8 32 0v56z', '#FDD835', 3) + face(0, -40, 0.3)))
      + range(14, (k) => g(40 + (k * 13) % 160, 60 + (k * 19) % 80, 1, E(0, 0, 7, 2.5, '#CFD8DC', 1.5) + P('M6 0l5-4v8z', '#CFD8DC', 1.5), (k * 40) % 180))),
  L('kr/busan/landmark-choryangmonorail.v1.svg', 'โมโนเรลลิฟต์ขึ้นบันได 168 ขั้นที่โชรยัง', 'The little monorail lift up the 168 stairs at Choryang', ['168 stairs', 'บันได 168 ขั้น', 'choryang ibagu-gil', 'ถนนอีบากูโชรยัง', 'monorail', 'โมโนเรลขึ้นเขา', 'steep stairs', 'บันไดชัน', 'hillside lane', 'ibagu'], 'หาตู้โมโนเรลเล็กๆ ที่ไต่ขึ้นข้างบันไดชัน', 'Find the small monorail car climbing beside the steep steps',
    // a very steep long stairway climbing a hill between little houses, a single rail beside it with a small glass monorail car going up, a child climbing the steps
    sky('#E8F5E9') + P('M-4 244V200L200 10h44v234z', '#A5D6A7', 0) + P('M20 236L196 40h22L44 236z', '#ECEFF1', 3) + range(16, (k) => Lc(`M${24 + k * 11} ${232 - k * 12.2}h20`, '#9E9E9E', 2))
      + Lc('M56 236L228 44', '#607D8B', 5) + range(6, (k) => Lc(`M${66 + k * 28} ${224 - k * 31}v14`, '#607D8B', 3)) + g(150, 124, 1, R(-18, -32, 36, 32, '#4FC3F7', 6, 3.5) + R(-12, -26, 24, 14, '#E1F5FE', 2, 2) + face(0, -10, 0.3), -0)
      + range(3, (k) => R(130 + k * 34, 190 - k * 10, 28, 30, ['#FFCC80', '#F8BBD0', '#B3E5FC'][k], 2, 2.5)) + range(3, (k) => R(4 + k * 26, 40 + k * 30, 26, 26, ['#FFF59D', '#CE93D8', '#FFAB91'][k], 2, 2.5)) + kid(70, 182, '#E53935', 0.8)),
  L('kr/busan/landmark-ggomjangeo.v1.svg', 'ปลาไหลทะเลย่างคมจังออที่คีจัง', 'Ggomjangeo, Busan grilled hagfish over coals', ['ggomjangeo', 'คมจังออ', 'grilled eel', 'ปลาไหลย่าง', 'hagfish', 'ปลาไหลทะเล', 'gijang', 'คีจัง', 'straw fire grill', 'ย่างเตาถ่าน'], 'หาชิ้นปลาที่ขดม้วนบนตะแกรงเหนือถ่านแดง', 'Find the curly pieces of fish curling up on the grill over the red coals',
    // a round charcoal grill with a wire rack, short curly pieces of grilled fish in red spicy sauce curling on it, a plate of lettuce and garlic, tongs and scissors
    E(120, 170, 96, 26, '#455A64', 4) + P('M24 170v18c0 18 192 18 192 0v-18', '#37474F', 4) + E(120, 160, 84, 20, '#E64A19', 3) + range(6, (k) => C(64 + k * 22, 160, 6, '#FFAB40', 0))
      + range(7, (k) => Lc(`M${44 + k * 26} 148l${10 - k * 3} 22`, '#90A4AE', 2)) + Lc('M40 154h160M44 166h152', '#90A4AE', 2)
      + range(5, (k) => g(66 + k * 26, 150 - (k % 2) * 6, 1, P('M-12 0c0-10 20-10 20 0s-14 8-14 0', '#C62828', 3), k * 30)) + Lc('M70 128c-4-10 4-14 0-24M130 124c-4-10 4-14 0-24', '#CFD8DC', 3)
      + E(196, 98, 30, 14, '#FFFFFF', 3) + range(3, (k) => E(180 + k * 14, 94, 9, 6, '#7CB342', 2)) + Lc('M28 70l40 50M36 66l38 52', '#B0BEC5', 4) + face(120, 196, 0.4)),
  L('kr/busan/landmark-beomeosa.v1.svg', 'ประตูหน้าวัดพอมอซาบนเขาคึมจองซัน', 'The gate halls of Beomeosa on Geumjeongsan', ['beomeosa', 'วัดพอมอซา', 'geumjeongsan', 'เขาคึมจองซัน', 'one-pillar gate', 'ประตูเสาเดียว', 'mountain temple', 'วัดบนเขา', 'wisteria', 'stone steps'], 'หาประตูที่ยืนอยู่บนเสาเรียงแถวเดียว', 'Find the gate that stands on just one row of pillars',
    // a temple gate with a heavy painted roof standing on a single row of round stone-and-wood pillars, stone steps leading up, wisteria vines and green mountain behind
    sky('#E8F5E9') + P('M-4 120c60-60 180-80 248-30v154H-4z', '#81C784', 0) + R(-4, 200, 248, 44, '#D7CCC8', 0, 3) + range(4, (k) => R(60 + k * 4, 200 - k * 10, 120 - k * 8, 10, '#BDBDBD', 1, 2))
      + range(4, (k) => R(66 + k * 34, 114, 10, 50, '#8D6E63', 0, 3) + R(62 + k * 34, 154, 18, 12, '#BDBDBD', 1, 2)) + R(56, 92, 128, 22, '#2E7D32', 0, 3) + range(4, (k) => R(62 + k * 30, 96, 22, 14, '#E53935', 1, 2)) + kroof(120, 88, 150, '#37474F')
      + range(5, (k) => Lc(`M${12 + k * 8} 40c4 20-4 40 0 60`, '#9575CD', 4)) + P('M-4 36c20-6 40-6 60 4', 'none', 4) + face(120, 140, 0.35)),

  // ---------- Jeju
  L('kr/jeju/landmark-omegitteok.v1.svg', 'ขนมโอเมกีต็อกข้าวฟ่างเชจู', 'Omegi tteok, Jeju millet rice cakes', ['omegi tteok', 'โอเมกีต็อก', 'millet rice cake', 'ขนมข้าวฟ่าง', 'red bean coating', 'คลุกถั่วแดง', 'jeju market', 'ตลาดโอเมกี', 'mugwort', 'jeju dessert'], 'หาขนมก้อนกลมเขียวที่คลุกถั่วแดงกับถั่วทอง', 'Find the round green cakes rolled in red beans and golden nuts',
    // a box of round green mugwort millet rice cakes, some rolled in dark red bean paste, some in yellow bean powder with a nut on top, a toothpick in one
    R(24, 90, 192, 120, '#FFF3E0', 8, 4) + R(32, 98, 176, 104, '#FFE0B2', 4, 2)
      + range(8, (k) => { const x = 58 + (k % 4) * 42, y = 126 + Math.floor(k / 4) * 50, red = k % 2 === 0; return C(x, y, 19, red ? '#5D2E2E' : '#E6C35C', 3) + C(x, y, 11, '#7CB342', 2) + (red ? range(4, (j) => C(x - 8 + j * 5, y - 12 + (j % 2) * 3, 2, '#8E3B3B', 0)) : C(x, y - 4, 4, '#FFF8E1', 1.5)); })
      + Lc('M162 170l30-62', '#D7B88A', 4) + face(120, 60, 0.5)),
  L('kr/jeju/landmark-chogahouse.v1.svg', 'บ้านหลังคาฟางผูกเชือกตาข่ายของเชจู', 'A Jeju thatched house with its roped roof and three-pole gate', ['jeju choga house', 'บ้านชกาเชจู', 'thatched roof', 'หลังคาฟาง', 'rope net roof', 'หลังคามัดเชือก', 'jeongnang gate', 'ประตูจองนัง', 'seongeup folk village', 'หมู่บ้านซองอึบ'], 'หาไม้สามท่อนพาดประตูที่บอกว่าเจ้าของไม่อยู่บ้าน', 'Find the three poles across the gate that say nobody is home',
    // a low house of black lava stone walls with a round thatched roof tied down with a criss-cross rope net, a gate of two stone posts with three wooden poles across it, a tangerine tree
    sky('#E1F5FE') + R(-4, 196, 248, 48, '#AED581', 0, 0) + R(30, 120, 140, 76, '#424242', 4, 4) + range(10, (k) => C(40 + (k % 5) * 28, 140 + Math.floor(k / 5) * 30, 7, '#616161', 1.5))
      + P('M18 124c10-50 154-50 164 0z', '#D4B26A', 4) + range(6, (k) => Lc(`M${34 + k * 26} 120l${-8 + k * 3}-38`, '#8D6E63', 2)) + range(3, (k) => Lc(`M24 ${110 - k * 12}c40 ${-6 + k * 2} 112 ${-6 + k * 2} 152 0`, '#8D6E63', 2))
      + R(84, 150, 30, 46, '#8D6E63', 2, 3) + R(184, 140, 18, 60, '#616161', 4, 3) + R(226, 140, 18, 60, '#616161', 4, 3) + range(3, (k) => R(176, 154 + k * 12, 72, 6, '#A1887F', 2, 2))
      + C(214, 96, 20, '#558B2F', 3) + range(3, (k) => C(204 + k * 10, 90 + (k % 2) * 10, 5, '#FB8C00', 1.5)) + face(100, 168, 0.3)),
  L('kr/jeju/landmark-bijarim.v1.svg', 'ป่าต้นบีจาโบราณบีจาริม', 'Bijarim, the old nutmeg-yew forest', ['bijarim forest', 'ป่าบีจาริม', 'nutmeg yew', 'ต้นบีจา', 'torreya', 'ป่าโบราณ', 'forest walk', 'เดินป่า', 'red volcanic path', 'ทางหินภูเขาไฟสีแดง'], 'หาต้นไม้แก่ที่มีลำต้นสองต้นพันกันเป็นคู่', 'Find the two old trunks twisted round each other like a pair',
    // a shady forest of old wide evergreen trees with twisted mossy trunks, two trunks twined together in the middle, a path of red volcanic gravel winding through ferns
    sky('#C8E6C9') + range(5, (k) => C(10 + k * 55, 50 + (k % 2) * 16, 40, ['#2E7D32', '#388E3C', '#1B5E20', '#43A047', '#2E7D32'][k], 3)) + R(-4, 180, 248, 64, '#81C784', 0, 0)
      + P('M90 240c20-40 30-80 40-110', 'none', 0) + P('M84 244c16-50 50-60 52-160h14c-2 100-30 110-46 160z', '#6D4C41', 3.5) + P('M150 244c-16-50-50-60-52-160h14c2 100 30 110 46 160z', '#8D6E63', 3.5)
      + P('M20 244c4-50 6-90 2-140h14c4 50 2 90 6 140zM196 244c4-50 4-90 0-140h14c4 50 4 90 8 140z', '#795548', 3) + range(6, (k) => E(30 + k * 36, 116 + (k % 3) * 20, 7, 4, '#9CCC65', 0))
      + P('M96 244c10-20 40-24 30-60h18c10 30-10 44-16 60z', '#C1663E', 0) + range(4, (k) => P(`M${14 + k * 66} 220c4-14 14-16 18-4`, '#558B2F', 2.5)) + face(124, 140, 0.35)),
  L('kr/jeju/landmark-sangumburi.v1.svg', 'ปล่องภูเขาไฟซานกุมบูรีที่เต็มไปด้วยหญ้าเงิน', 'Sangumburi, the grassy crater full of silver grass', ['sangumburi crater', 'ปล่องซานกุมบูรี', 'silver grass', 'หญ้าเงินออกซัง', 'eulalia', 'ออกซัง', 'volcanic crater', 'ปล่องภูเขาไฟ', 'oreum', 'โอรึม'], 'หาพุ่มหญ้าสีเงินที่โบกไหวอยู่ริมปล่อง', 'Find the silver grass plumes waving at the crater edge',
    // a huge round bowl-shaped crater seen from its rim, its sides covered in green forest, silver grass plumes waving in the front, a wooden boardwalk with a child
    sky('#FFF8E1') + P('M-4 90c60-10 188-10 248 0v154H-4z', '#9CCC65', 0) + E(120, 120, 110, 40, '#558B2F', 4) + E(120, 126, 84, 26, '#33691E', 3) + range(8, (k) => C(48 + k * 20, 124 + (k % 2) * 6, 8, '#2E7D32', 2))
      + P('M-4 190h248v54H-4z', '#D7CCC8', 3) + range(8, (k) => Lc(`M${k * 32} 190v54`, '#A1887F', 2))
      + range(9, (k) => g(10 + k * 27, 190, 1, Lc('M0 0c0-20 4-40 8-56', '#BCAAA4', 2.5) + P('M8-56c-8 10-6 22-2 30 6-8 10-20 2-30z', '#ECEFF1', 2), -6 + (k % 3) * 6)) + kid(140, 222, '#FB8C00') + face(120, 152, 0.3)),

  // ---------- Gangwon
  L('kr/gangwon/landmark-makguksu.v1.svg', 'บะหมี่โซบะมักกุกซูชุนชอน', 'Chuncheon makguksu, buckwheat noodles', ['makguksu', 'มักกุกซู', 'buckwheat noodles', 'บะหมี่บักวีต', 'chuncheon', 'ชุนชอน', 'cold spicy noodles', 'บะหมี่เย็นรสเผ็ด', 'kimchi broth', 'noodle festival'], 'หาเส้นสีน้ำตาลเทาที่ขดอยู่ใต้ไข่ต้มครึ่งซีก', 'Find the grey-brown noodles curled under the half egg',
    // a big brass bowl of grey-brown buckwheat noodles in a red sauce, topped with shredded cabbage, cucumber, half an egg and seaweed strips, a jug of cold broth pouring in
    E(120, 140, 92, 22, '#F9A825', 4) + P('M28 140c0 50 40 74 92 74s92-24 92-74', '#FBC02D', 4) + E(120, 140, 82, 16, '#8D6E63', 2)
      + range(9, (k) => Lc(`M${60 + k * 13} 142c4-16-4-22 4-36`, '#A1887F', 3)) + P('M90 120c10-20 52-20 60 0z', '#E53935', 2.5) + P('M108 104c-2-14 26-14 24 0z', '#FFFFFF', 2.5) + C(120, 100, 6, '#FFB300', 1.5)
      + range(4, (k) => Lc(`M${84 + k * 8} 128l-14-10`, '#7CB342', 3)) + range(4, (k) => Lc(`M${142 + k * 6} 124l10-12`, '#263238', 2.5)) + range(3, (k) => Lc(`M${100 + k * 18} 132l6-8`, '#FFF9C4', 3))
      + g(196, 72, 1, P('M-16-20h28l4 40h-36z', '#B3E5FC', 3) + Lc('M-12 20l-14 18', '#FFAB91', 4), 30) + face(120, 178, 0.45)),
  L('kr/gangwon/landmark-naksansa.v1.svg', 'ศาลาอึยซังแดบนหน้าผาวัดนักซันซา', 'Uisangdae pavilion on the sea cliff at Naksansa', ['naksansa', 'วัดนักซันซา', 'uisangdae', 'ศาลาอึยซังแด', 'yangyang', 'ยังยัง', 'cliff pavilion', 'ศาลาริมหน้าผา', 'east sea sunrise', 'old pine'], 'หาศาลาหกเหลี่ยมเล็กๆ ที่ยืนบนหินเหนือทะเล', 'Find the little six-sided pavilion standing on the rock above the sea',
    // a small six-sided painted pavilion on top of a rocky cliff, a crooked old pine leaning over it, the sun rising over the blue sea with waves breaking on the rocks below
    sky('#FFE0B2') + C(196, 110, 26, '#FFB74D', 3) + P('M-4 120h248v124H-4z', '#1E88E5', 0) + Lc('M150 140c14-4 22 4 36 0M170 170c14-4 22 4 36 0', '#90CAF9', 3)
      + P('M-4 244V140c20-10 50-10 70-6 30 4 50 20 60 40l20 70z', '#8D6E63', 4) + Lc('M140 220c8-8 16-8 22 0', '#FFFFFF', 3)
      + range(3, (k) => R(32 + k * 22, 104, 7, 34, '#C62828', 0, 2.5)) + R(26, 98, 62, 8, '#2E7D32', 0, 2.5) + P('M14 98c10-6 18-8 26-20h36c8 12 16 14 26 20z', '#455A64', 3) + C(58, 74, 5, '#FFD54F', 2)
      + P('M90 140c10-30 30-50 60-64', 'none', 6) + E(150, 70, 30, 12, '#2E7D32', 3) + E(120, 92, 24, 10, '#388E3C', 3) + face(58, 120, 0.25)),
  L('kr/gangwon/landmark-ojukheon.v1.svg', 'บ้านโอจุกฮอนกับดงไผ่ลำดำ', 'Ojukheon, the old house in the black bamboo', ['ojukheon', 'โอจุกฮอน', 'black bamboo', 'ไผ่ลำดำ', 'gangneung', 'คังนึง', 'hanok house', 'บ้านฮันอก', 'crape myrtle', 'old wooden house'], 'หาต้นไผ่ที่ลำต้นเป็นสีดำ', 'Find the bamboo with black stems',
    // a small old hanok house with a grey tiled roof and wooden lattice doors on a stone base, a grove of bamboo with black stems beside it, a pink crape myrtle tree in front
    sky('#F1F8E9') + R(-4, 196, 248, 48, '#D7CCC8', 0, 3) + R(30, 168, 140, 28, '#BDBDBD', 2, 3) + R(40, 120, 120, 48, '#FFF8E1', 0, 3)
      + range(4, (k) => R(48 + k * 28, 126, 22, 36, '#D7B88A', 1, 2) + Lc(`M${48 + k * 28} 144h22M${59 + k * 28} 126v36`, '#8D6E63', 1.5)) + kroof(100, 118, 140)
      + range(5, (k) => Lc(`M${180 + k * 12} 196c-2-60 2-110 0-170`, '#263238', 5) + range(4, (j) => Lc(`M${180 + k * 12} ${180 - j * 40}h2`, '#90A4AE', 2))) + range(6, (k) => E(178 + (k % 3) * 22, 40 + Math.floor(k / 3) * 50, 14, 5, '#558B2F', 2))
      + Lc('M20 196v-40', '#6D4C41', 5) + C(20, 146, 18, '#F48FB1', 3) + C(32, 136, 10, '#F06292', 2) + face(100, 186, 0.3)),
  L('kr/gangwon/landmark-ginkgoforest.v1.svg', 'ป่าแปะก๊วยสีทองที่ฮงชอน', 'The golden ginkgo forest of Hongcheon', ['hongcheon ginkgo forest', 'ป่าแปะก๊วยฮงชอน', 'ginkgo trees', 'ต้นแปะก๊วย', 'autumn leaves', 'ใบไม้เปลี่ยนสี', 'golden leaves', 'ใบไม้สีทอง', 'fan-shaped leaves', 'october only'], 'หาใบไม้รูปพัดเล็กๆ ที่ปลิวลงมา', 'Find the little fan-shaped leaves falling down',
    // rows of tall ginkgo trees with bright yellow crowns, the ground covered in a carpet of yellow leaves, big fan-shaped leaves drifting down, a child throwing leaves up
    sky('#FFF8E1') + R(-4, 170, 248, 74, '#FFD54F', 0, 0) + range(5, (k) => Lc(`M${20 + k * 50} 200v-120`, '#6D4C41', 6) + E(20 + k * 50, 80, 26, 60, '#FBC02D', 3) + E(20 + k * 50, 70, 16, 34, '#FFEB3B', 0))
      + range(6, (k) => g(30 + k * 36, 120 + (k % 3) * 24, 1, P('M0 0l-12-14c6-6 18-6 24 0z', '#FFCA28', 2.5) + Lc('M0 0v8', '#8D6E63', 2), -30 + k * 14))
      + range(10, (k) => E(10 + k * 24, 210 + (k % 3) * 8, 8, 3, '#F9A825', 0)) + kid(130, 220, '#E53935', 1.1) + face(120, 70, 0.3)),
  L('kr/gangwon/landmark-suncruise.v1.svg', 'โรงแรมรูปเรือบนหน้าผาช็องดงจิน', 'The ship-shaped hotel on the cliff at Jeongdongjin', ['ship on the cliff', 'เรือบนหน้าผา', 'jeongdongjin', 'ช็องดงจิน', 'cruise ship hotel', 'โรงแรมรูปเรือ', 'east sea', 'ทะเลตะวันออก', 'sunrise park', 'ship on a hill'], 'หาเรือลำใหญ่ที่จอดอยู่บนยอดเขาแทนที่จะอยู่ในทะเล', 'Find the big ship parked on top of the hill instead of in the sea',
    // a big white cruise ship with rows of windows sitting on top of a green cliff, the blue sea below and the sun rising, a little child pointing up
    sky('#FFF3E0') + C(40, 60, 18, '#FFB74D', 3) + P('M-4 160h248v84H-4z', '#1E88E5', 0) + P('M-4 244V180c40-10 70-60 140-66 50 2 80 20 108 30v100z', '#7CB342', 4)
      + P('M50 116h164l-16 30H66z', '#FFFFFF', 4) + R(76, 90, 112, 26, '#FFFFFF', 3, 3.5) + R(100, 70, 70, 20, '#FFFFFF', 3, 3) + R(144, 50, 14, 20, '#E53935', 1, 3)
      + range(8, (k) => C(70 + k * 18, 130, 3.5, '#4FC3F7', 1.5)) + range(5, (k) => R(84 + k * 20, 98, 12, 9, '#4FC3F7', 1, 1.5)) + Lc('M50 116h164', '#1E88E5', 4)
      + Lc('M30 194c14-4 22 4 36 0', '#90CAF9', 3) + kid(200, 200, '#7E57C2') + face(130, 102, 0.3)),

  // ---------- Gyeongju
  L('kr/gyeongju/landmark-bunhwangsa.v1.svg', 'เจดีย์หินอิฐเจดีย์พุนฮวังซา', 'The stone-brick pagoda of Bunhwangsa', ['bunhwangsa', 'วัดพุนฮวังซา', 'brick pagoda', 'เจดีย์อิฐหิน', 'oldest pagoda', 'เจดีย์เก่าแก่', 'silla', 'ชิลลา', 'stone blocks', 'gyeongju fields'], 'หาสิงโตหินตัวเล็กที่นั่งเฝ้าอยู่ตรงมุมฐาน', 'Find the little stone lions sitting on the corners of the base',
    // a squat square pagoda built of small dark stone bricks in three stepped storeys, a doorway with two carved guardians shown as plain panels, little stone lions on the base corners, autumn field around
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#C5E1A5', 0, 0) + R(36, 180, 168, 18, '#BDBDBD', 1, 3)
      + [[56, 120, 128, 60], [66, 78, 108, 34], [76, 46, 88, 24]].map(([x, y, w, h]) => R(x, y, w, h, '#8D8D8D', 0, 3.5) + range(Math.floor(h / 10), (r) => Lc(`M${x} ${y + 10 + r * 10}h${w}`, '#616161', 1.5)) + P(`M${x - 8} ${y}h${w + 16}l-8-8h${-w}z`, '#757575', 3)).join('')
      + R(104, 140, 32, 40, '#4E342E', 2, 3) + R(84, 144, 14, 30, '#A1887F', 2, 2) + R(142, 144, 14, 30, '#A1887F', 2, 2)
      + [44, 196].map((x) => g(x, 176, 1, E(0, 0, 12, 8, '#BDBDBD', 2.5) + C(0, -10, 8, '#BDBDBD', 2.5) + face(0, -11, 0.2))).join('') + face(120, 100, 0.35)),
  L('kr/gyeongju/landmark-gyerim.v1.svg', 'ป่าคเยริมกับกล่องทองบนกิ่งไม้', 'Gyerim forest and the golden box in the tree', ['gyerim forest', 'ป่าคเยริม', 'golden box legend', 'ตำนานกล่องทอง', 'white rooster', 'ไก่ขาว', 'old zelkova trees', 'ต้นไม้โบราณ', 'silla legend', 'gyeongju woods'], 'หาไก่ขาวที่ขันอยู่ใต้กล่องทองบนต้นไม้', 'Find the white rooster crowing under the golden box in the tree',
    // a grove of old twisted trees, a little golden box hanging on a branch in a beam of light, a white rooster crowing on the ground beneath it
    sky('#E8F5E9') + R(-4, 190, 248, 54, '#AED581', 0, 0) + range(4, (k) => P(`M${20 + k * 64} 200c-4-40 6-80-4-130h16c4 50-4 90 4 130z`, '#795548', 3) + C(28 + k * 64, 58, 34, ['#66BB6A', '#43A047', '#7CB342', '#388E3C'][k], 3))
      + P('M84 30l40 160h-10L74 30z', '#FFF9C4', 0) + Lc('M60 96c30 0 50 4 70 10', '#6D4C41', 6) + Lc('M110 104v10', '#6D4C41', 2) + R(98, 114, 24, 18, '#FFC107', 3, 3) + Lc('M98 122h24', '#FF8F00', 2)
      + g(116, 186, 1, E(0, 0, 20, 16, '#FFFFFF', 3) + C(16, -18, 10, '#FFFFFF', 3) + P('M12-28l4-8 4 6 4-6 2 10z', '#E53935', 2) + P('M26-18l8 2-8 4z', '#FFB300', 2) + P('M-18-4c-10-10-10-20-4-24 4 6 6 14 4 24z', '#FFFFFF', 2.5) + Lc('M-4 16v10M6 16v10', '#FFB300', 3) + C(18, -20, 2, INK, 0))),
  L('kr/gyeongju/landmark-seochulji.v1.svg', 'สระซอชุลจีกับดอกเสลาสีชมพู', 'Seochulji pond and its pink crape myrtles', ['seochulji', 'สระซอชุลจี', 'crape myrtle', 'ดอกเสลาเกาหลี', 'lotus pond', 'สระบัว', 'igyojeong pavilion', 'ศาลาอีโยจอง', 'namsan', 'summer flowers'], 'หาศาลาที่ยื่นขาลงไปยืนในน้ำหลังพุ่มดอกไม้สีชมพู', 'Find the pavilion with its feet in the water behind the pink flowers',
    // a calm pond with a long wooden L-shaped pavilion whose front stands on stone legs in the water, old crape myrtle trees covered in bright pink blossom leaning over the water
    sky('#E1F5FE') + R(-4, 150, 248, 94, '#4FC3F7', 0, 0) + Lc('M20 200c14-4 22 4 36 0M160 214c14-4 22 4 36 0', '#B3E5FC', 3)
      + R(96, 94, 120, 40, '#FFF8E1', 0, 3) + range(4, (k) => R(104 + k * 28, 100, 20, 28, '#BCAAA4', 1, 2)) + range(3, (k) => R(108 + k * 40, 134, 6, 26, '#9E9E9E', 0, 2.5)) + kroof(156, 90, 128)
      + E(156, 172, 64, 6, '#29B6F6', 0) + range(3, (k) => P(`M${20 + k * 40} 160c0-30-8-60 6-90`, 'none', 6)) + range(7, (k) => C(16 + (k % 4) * 34, 58 + Math.floor(k / 4) * 36 + (k % 2) * 8, 20, k % 2 ? '#F06292' : '#EC407A', 3))
      + range(4, (k) => C(40 + k * 50, 190 + (k % 2) * 16, 7, '#FFFFFF', 2) + C(40 + k * 50, 190 + (k % 2) * 16, 3, '#F48FB1', 0)) + face(156, 114, 0.3)),
  L('kr/gyeongju/landmark-horserider.v1.svg', 'เหยือกดินเผาคนขี่ม้าแห่งชิลลา', 'The Silla pottery horse rider jug', ['horse rider pottery', 'เหยือกคนขี่ม้า', 'mounted figure vessel', 'ภาชนะดินเผารูปคนขี่ม้า', 'gyeongju national museum', 'พิพิธภัณฑ์แห่งชาติคย็องจู', 'silla pottery', 'เครื่องปั้นชิลลา', 'spout', 'geumnyeongchong'], 'หาพวยกาที่ยื่นออกมาจากหน้าอกม้า', 'Find the spout poking out of the horse’s chest',
    // a grey clay jug shaped like a little horse with a rider in a pointed hat, a funnel cup on the horse's back and a spout at its chest, on a square stand in a glass museum case
    R(30, 30, 180, 180, '#E3F2FD', 6, 3) + R(30, 190, 180, 20, '#90A4AE', 0, 3) + R(70, 172, 100, 18, '#795548', 2, 3)
      + g(120, 124, 1, P('M-50 0c0-20 10-30 30-30h50c16 0 22 10 22 24l14 4-2 10-14-2c-4 14-18 16-30 16h-40c-20 0-30-8-30-22z', '#90A4AE', 4) + Lc('M-34 22v26M-14 22v26M14 22v26M34 22v26', '#78909C', 6)
        + P('M50-6l14-24 8 6-10 22z', '#90A4AE', 3) + C(64, -26, 7, '#90A4AE', 3) + P('M-4-30c0-16 6-26 14-26s12 10 12 26z', '#B0BEC5', 3) + C(10, -64, 9, '#B0BEC5', 3) + P('M2-70l8-18 8 18z', '#78909C', 2.5) + face(10, -64, 0.2)
        + P('M-44-30l-6-20h24l-4 20z', '#B0BEC5', 3) + P('M60 4l18 6', 'none', 4) + C(-20, 0, 3, INK, 0))),
  L('kr/gyeongju/landmark-daewangam.v1.svg', 'หินแทวังอัมกลางทะเลที่ชายหาดบงกิล', 'Daewangam, the king’s rock in the sea off Bonggil beach', ['daewangam', 'แทวังอัม', 'underwater royal tomb', 'สุสานใต้ทะเล', 'bonggil beach', 'หาดบงกิล', 'rocky islet', 'เกาะหินกลางทะเล', 'sea rocks', 'east sea'], 'หาสระน้ำรูปกากบาทตรงกลางเกาะหิน', 'Find the cross-shaped pool in the middle of the rocky islet',
    // a small rocky islet a little way off a pebble beach, waves washing round it, a cross-shaped channel of water in its middle, the sun low over the sea
    sky('#FFF3E0') + C(196, 50, 20, '#FFCC80', 3) + P('M-4 90h248v110H-4z', '#1976D2', 0) + Lc('M20 120c14-4 22 4 36 0M180 130c14-4 22 4 36 0', '#90CAF9', 3)
      + P('M50 140c0-24 30-40 70-40s70 16 70 40c-10 16-40 24-70 24s-60-8-70-24z', '#757575', 4) + P('M112 114c4-2 10-2 14 0l2 14c6-2 12-2 16 2-4 4-10 6-16 6l-2 12c-4 2-10 2-14 0l-2-12c-6 0-12-2-16-6 4-4 10-4 16-2z', '#26A69A', 2.5) + range(5, (k) => C(76 + k * 22, 120 + (k % 2) * 14, 5, '#616161', 1.5)) + Lc('M40 156c20 12 40 8 60 12M140 168c20-4 40-4 60-14', '#FFFFFF', 3)
      + P('M-4 200c40-10 200-10 248 0v44H-4z', '#BDBDBD', 3) + range(12, (k) => E(10 + k * 20, 214 + (k % 3) * 8, 7, 5, ['#9E9E9E', '#757575', '#E0E0E0'][k % 3], 1.5)) + face(150, 128, 0.3)),
];

export default { places: {}, items };
