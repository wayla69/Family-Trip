// Wave 9, group france (2/3): Belgium, Brussels, Bruges (with Ghent and the coast), Mont-Saint-Michel (Normandy and Brittany),
// Nice and the Riviera, Strasbourg and Colmar
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const water = (y, c = '#4FC3F7') => R(-4, y, 248, 248 - y, c, 0, 3) + Lc(`M20 ${y + 16}c10-4 20 4 30 0M150 ${y + 26}c10-4 20 4 30 0`, '#E1F5FE', 3);
const plate = (c = '#FFFFFF', in_ = '#E3F2FD') => E(120, 180, 104, 32, c, 3) + E(120, 176, 86, 22, in_, 0);

const items = [
  // ---------- Belgium
  K('be', 'food', 'stoemp', 'สตุมป์ มันบดผสมผักแบบเบลเยียม', 'Stoemp, Belgian mash with vegetables', ['stoemp', 'สตุมป์', 'belgian mash', 'มันบดเบลเยียม', 'mashed potato', 'มันบด', 'carrots and leeks', 'แครอทกับต้นหอม', 'brussels home cooking', 'butter'],
    // a deep bowl heaped with fluffy mashed potato flecked with orange carrot and green leek, a pat of butter melting into a little hollow on top, a fork stuck in the side, a happy face in the mash
    E(120, 170, 92, 36, '#5C6BC0', 3) + P('M28 160c0 50 184 50 184 0z', '#5C6BC0', 3) + Lc('M40 184c50 20 110 20 160 0', '#7986CB', 4)
      + P('M36 160c-6-40 30-70 84-74 54 4 90 34 84 74z', '#FFF3C4', 3) + P('M60 120c10-6 20 4 30-2M130 104c10-4 20 4 28 0', 'none', 2.5)
      + Array.from({ length: 14 }, (_, k) => R(54 + (k * 31) % 130, 106 + (k * 17) % 46, 6, 6, k % 2 ? '#FB8C00' : '#7CB342', 1.5, 0)).join('')
      + E(120, 92, 18, 6, '#FFE082', 0) + R(110, 80, 20, 12, '#FFE082', 2, 2.5) + Lc('M112 92c-4 6-2 10 4 8', '#FFE082', 3) + face(112, 136, 0.5)
      + g(186, 100, 1, Lc('M0 0l24-50', '#B0BEC5', 6) + Lc('M22-46l-4-20M26-44l2-20M30-42l6-18', '#B0BEC5', 3))),
  K('be', 'culture', 'kattenstoet', 'ขบวนแห่แมวยักษ์ที่เมืองอีแปร์', 'The giant cat parade of Ypres', ['kattenstoet', 'คัตเทินสตุต', 'cat parade', 'ขบวนแห่แมว', 'ypres', 'อีแปร์', 'ieper', 'giant cats', 'แมวยักษ์', 'cat festival'],
    // two huge friendly cat figures, one ginger and one black-and-white, carried high over a street parade, children below wearing cat-ear headbands, a row of stepped gables behind and paper cats on strings
    sky('#E1F5FE') + Array.from({ length: 5 }, (_, k) => R(k * 50, 70, 50, 120, ['#FFCC80', '#BCAAA4', '#FFE082', '#EF9A9A', '#D7CCC8'][k], 0, 3) + P(`M${k * 50} 70l8-10h8v-10h18v10h8l8 10z`, ['#FFCC80', '#BCAAA4', '#FFE082', '#EF9A9A', '#D7CCC8'][k], 3) + R(k * 50 + 17, 100, 16, 22, '#81D4FA', 2, 2)).join('')
      + R(-4, 190, 248, 54, '#BDBDBD', 0, 3)
      + [[70, 110, '#FFA726', '#FFE0B2'], [170, 104, '#FAFAFA', '#424242']].map(([x, y, a, b]) => g(x, y, 1, P('M-34 50c-6-40 6-60 34-60s40 20 34 60z', a, 3) + C(0, -20, 30, a, 3) + P('M-26-38l-4-26 20 14zM26-38l4-26-20 14z', a, 3) + P('M-24-44l-2-12 10 8zM24-44l2-12-10 8z', '#F48FB1', 0)
        + (b === '#424242' ? P('M6-48c14 0 24 12 22 26-10-8-16-18-22-26z', b, 0) + P('M-30 20c10 10 20 12 30 12v18h-30z', b, 0) : Lc('M-20 20h40M-22 34h44', '#FB8C00', 3)) + face(0, -18, 0.7, 'w') + Lc('M-34-14h-14M-34-8h-14M34-14h14M34-8h14', INK, 2))).join('')
      + Lc('M70 160v40M170 154v46', '#8D6E63', 5)
      + [[30, 222, '#AB47BC'], [110, 226, '#43A047'], [210, 224, '#EF5350']].map(([x, y, c]) => kid(x, y, c, 1) + P(`M${x - 8} ${y - 26}l2-8 4 6zM${x + 8} ${y - 26}l-2-8-4 6z`, INK, 1.5)).join('')),
  K('be', 'food', 'tomatecrevette', 'มะเขือเทศยัดไส้กุ้งสีเทาแบบเบลเยียม', 'Tomate-crevettes, a tomato filled with grey shrimp', ['tomate crevettes', 'โตมาตเครเว็ต', 'tomaat garnaal', 'stuffed tomato', 'มะเขือเทศยัดไส้', 'grey shrimp', 'กุ้งสีเทา', 'north sea shrimp', 'กุ้งทะเลเหนือ', 'belgian starter'],
    // a big shiny red tomato with its lid lifted and leaning on it, overflowing with tiny pink curled shrimps in creamy dressing, sitting on a crisp lettuce leaf with a lemon wedge and parsley, a face on the tomato
    plate() + P('M30 180c20-30 60-30 90-20 30-14 70-10 90 20-40 16-140 16-180 0z', '#9CCC65', 3) + Lc('M50 174c30-8 50-4 70 2M130 172c20-6 40-4 56 4', '#C5E1A5', 2.5)
      + C(110, 140, 52, '#E53935', 3) + E(90, 124, 12, 8, '#EF9A9A', 0) + P('M62 112c10-10 86-10 96 0-10 8-86 8-96 0z', '#FFF8E1', 3)
      + Array.from({ length: 7 }, (_, k) => g(72 + k * 12, 102 - Math.sin(k / 6 * Math.PI) * 12, 1, P('M-6 4c-4-8 2-14 8-12 6 2 6 10 0 12', 'none', 5) + Lc('M-6 4c-4-8 2-14 8-12 6 2 6 10 0 12', '#FF8A80', 4), k * 30)).join('')
      + face(110, 150, 0.6) + g(186, 96, 1, E(0, 0, 32, 10, '#E53935', 3) + P('M-6-8l6-10 6 10z', '#43A047', 2.5), 30)
      + g(196, 178, 1, P('M-16 0a16 16 0 0 1 32 0z', '#FFEB3B', 3) + Lc('M-10-2l10-10 10 10', '#FBC02D', 2))),
  K('be', 'food', 'mattentaart', 'ทาร์ตนมบูดแมตเทินทาร์ตแห่งเคอราร์ดสแบร์เคิน', 'Mattentaart, the little curd tarts of Geraardsbergen', ['mattentaart', 'แมตเทินทาร์ต', 'geraardsbergen', 'เคอราร์ดสแบร์เคิน', 'curd tart', 'ทาร์ตนมบูด', 'puff pastry', 'แป้งพัฟ', 'belgian pastry', 'flemish bakery'],
    // a plate of small round puff-pastry tarts with golden, puffed and cracked tops, one broken in half showing the pale creamy curd filling and flaky layers, a glass of milk beside them
    plate('#FFFFFF', '#FFF3E0') + [[70, 160], [120, 168], [102, 128]].map(([x, y], k) => g(x, y, 1, E(0, 6, 30, 12, '#E2A04A', 3) + P('M-28 4c0-22 56-22 56 0z', '#F2B65C', 3) + P('M-14-6c6 4 10-2 14 2s10 0 14-4', 'none', 2.5) + E(0, -6, 10, 4, '#F7CB82', 0) + (k === 2 ? face(0, 4, 0.36) : ''))).join('')
      + g(170, 150, 1, P('M-24 10c0-20 4-30 14-30v40z', '#F2B65C', 3) + P('M-10-20c4 0 8 4 8 10v30h-8z', '#FFFDE7', 2.5) + Lc('M-22 0h12M-22 8h12', '#E2A04A', 2) + P('M6 10c0-20 4-30 14-30v40z', '#F2B65C', 3, ) + P('M6-20h4v40h-4z', '#FFFDE7', 2))
      + g(206, 120, 1, P('M-14-40h28l-4 70h-20z', '#E3F2FD', 3) + P('M-12-20h24l-3 50h-18z', '#FFFFFF', 0) + P('M-14-40h28l-4 70h-20z', 'none', 3))),

  // ---------- Brussels
  L('be/brussels/landmark-berlaymont.v1.svg', 'ตึกแบร์เลมงรูปกากบาทของสหภาพยุโรป', 'The cross-shaped Berlaymont building of the European Union', ['berlaymont', 'แบร์เลมง', 'european commission', 'คณะกรรมาธิการยุโรป', 'european quarter', 'ย่านยุโรป', 'eu building', 'ตึกสหภาพยุโรป', 'schuman', 'glass louvres'], 'หาปีกตึกที่กางออกเป็นรูปกากบาท', 'Find the wings spreading out in the shape of a cross',
    // the big glass building seen from the front: a wide curved middle wing and two wings bending back on each side like the arms of a cross, every floor striped with silver sun louvres, a ring of twelve yellow dots in the plaza, trees and tiny kids
    sky('#E8EAF6') + R(-4, 170, 248, 74, '#CFD8DC', 0, 3)
      + P('M10 70l50 14v86l-50-10z', '#B0BEC5', 3) + P('M230 70l-50 14v86l50-10z', '#B0BEC5', 3)
      + Array.from({ length: 8 }, (_, k) => Lc(`M12 ${80 + k * 10}l46 ${12 - k * 0.4}M228 ${80 + k * 10}l-46 ${12 - k * 0.4}`, '#ECEFF1', 3)).join('')
      + P('M60 84c40-14 80-14 120 0v86c-40-10-80-10-120 0z', '#90CAF9', 3) + Array.from({ length: 9 }, (_, k) => Lc(`M62 ${92 + k * 9}c40-12 76-12 116 0`, '#E3F2FD', 3)).join('')
      + P('M60 84c40-14 80-14 120 0', 'none', 3) + R(104, 150, 32, 22, '#5C6BC0', 2, 3) + face(120, 116, 0.36)
      + Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return C(120 + Math.cos(a) * 34, 206 + Math.sin(a) * 12, 3.5, '#FFCA28', 1.5); }).join('')
      + [[22, 196], [218, 200]].map(([x, y]) => E(x, y - 14, 16, 18, '#66BB6A', 2.5) + Lc(`M${x} ${y}v10`, '#6D4C41', 3)).join('') + kid(64, 230, '#1E88E5', 0.8) + kid(178, 232, '#FFB300', 0.8)),
  L('be/brussels/landmark-royalpalace.v1.svg', 'พระราชวังหลวงบรัสเซลส์กับสวนหน้าวัง', 'The Royal Palace of Brussels and the park in front', ['royal palace', 'พระราชวังหลวง', 'palais royal', 'parc de bruxelles', 'สวนบรัสเซลส์', 'palace open days', 'วันเปิดวัง', 'royal quarter', 'fountain', 'long facade'], 'หาน้ำพุกลมหน้าวัง', 'Find the round fountain in front of the palace',
    // a long pale palace with a central columned porch under a carved triangle and a low copper-green dome, rows of tall windows along both wings, a round fountain and clipped trees in the park in front
    sky('#E3F2FD') + R(-4, 150, 248, 94, '#AED581', 0, 3)
      + R(10, 70, 220, 80, '#F5E6C8', 0, 3) + Array.from({ length: 10 }, (_, k) => R(20 + k * 21 + (k > 4 ? 6 : 0), 92, 10, 22, '#81D4FA', 2, 2)).join('') + Lc('M10 122h220', '#E0C9A0', 3)
      + R(84, 56, 72, 94, '#FFF3E0', 0, 3) + P('M78 58l42-26 42 26z', '#FFF3E0', 3) + P('M100 34c0-18 40-18 40 0z', '#80CBC4', 3) + Lc('M120 16v-8', INK, 2.5)
      + [92, 108, 124, 140].map((x) => R(x - 3, 70, 8, 60, '#FFFFFF', 0, 2)).join('') + R(108, 128, 24, 22, '#8D6E63', 4, 2.5) + face(120, 44, 0.3)
      + E(120, 196, 46, 14, '#90A4AE', 3) + E(120, 192, 38, 10, '#4FC3F7', 2) + Lc('M120 190v-24', '#B3E5FC', 4) + Lc('M112 172c4-8 12-8 16 0', '#E1F5FE', 3)
      + [[30, 180], [210, 180], [50, 220], [190, 220]].map(([x, y]) => C(x, y - 12, 13, '#43A047', 2.5) + Lc(`M${x} ${y}v8`, '#6D4C41', 3)).join('')),
  L('be/brussels/landmark-smoutebollen.v1.svg', 'โดนัทกลมสมูตบอลเลินโรยน้ำตาลไอซิ่ง', 'Smoutebollen, sugared doughnut balls at the fair', ['smoutebollen', 'สมูตบอลเลิน', 'croustillons', 'ครูสตียง', 'doughnut balls', 'โดนัทกลม', 'foire du midi', 'งานวัดฟัวร์ดูมีดี', 'icing sugar', 'fairground snack'], 'หาโดนัทลูกที่ยิ้มอยู่บนสุด', 'Find the smiling doughnut ball on the very top',
    // a striped paper bag overflowing with puffy golden fried dough balls thickly dusted with powdered sugar, a little wooden fork stuck in, a cloud of sugar puffing out, a fairground booth's scalloped awning above
    sky('#FFF8E1') + P('M-4 -4h248v40H-4z', '#FFFFFF', 3) + Array.from({ length: 6 }, (_, k) => R(k * 42, -4, 21, 40, '#E53935', 0, 0)).join('') + Array.from({ length: 8 }, (_, k) => P(`M${-4 + k * 32} 36c0 14 32 14 32 0`, k % 2 ? '#E53935' : '#FFFFFF', 3)).join('')
      + P('M60 220l-16-110h152l-16 110z', '#FFFFFF', 3) + Array.from({ length: 5 }, (_, k) => P(`M${62 + k * 26} 110l6 110h12l-4-110z`, '#F48FB1', 0)).join('') + P('M60 220l-16-110h152l-16 110z', 'none', 3)
      + [[70, 110], [100, 100], [130, 98], [162, 104], [86, 82], [118, 76], [148, 82], [104, 58], [134, 60], [120, 40]].map(([x, y], k) => C(x, y, 17, '#E2A04A', 3) + P(`M${x - 13} ${y - 6}c6-8 20-10 26-2`, '#FFFFFF', 0) + C(x - 4, y - 8, 4, '#FFFFFF', 0) + (k === 9 ? face(x, y + 2, 0.28) : '')).join('')
      + Lc('M150 70l24-40', '#C69C6D', 4) + [[60, 50], [180, 40], [190, 70], [50, 80]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 1.5)).join('')),
  L('be/brussels/landmark-sprouts.v1.svg', 'กะหล่ำดาวบรัสเซลส์บนต้น', 'Brussels sprouts growing up their stalk', ['brussels sprouts', 'กะหล่ำดาว', 'sprouts', 'ผักกะหล่ำดาว', 'vegetable from brussels', 'ผักชื่อเมือง', 'sprout stalk', 'ต้นกะหล่ำดาว', 'green vegetables', 'farm'], 'หากะหล่ำดาวลูกที่หลุดออกมานั่งในชาม', 'Find the sprout that has jumped into the bowl',
    // a tall thick green stalk covered all the way up in little round sprouts, big floppy leaves at the top, a few smiling sprouts in a blue bowl at the foot, one cut in half showing its layered inside
    sky('#F1F8E9') + R(-4, 200, 248, 44, '#A1887F', 0, 3) + Lc('M100 210V60', '#9CCC65', 14) + Lc('M100 210V60', '#C5E1A5', 4)
      + P('M100 64c-30-30-70-20-74 6 30 6 50 0 74-6zM100 60c20-40 70-40 80-10-30 10-60 14-80 10zM100 60c-6-30 4-50 20-56 6 20 0 40-20 56z', '#7CB342', 3)
      + Array.from({ length: 12 }, (_, k) => C(k % 2 ? 114 : 86, 82 + k * 10, 10, '#8BC34A', 2.5) + Lc(`M${k % 2 ? 108 : 80} ${80 + k * 10}c4 4 8 4 12 0`, '#558B2F', 1.5)).join('')
      + g(176, 196, 1, P('M-40-10h80c0 26-18 36-40 36s-40-10-40-36z', '#42A5F5', 3) + [[-22, -14], [0, -18], [22, -14], [-10, -28], [12, -30]].map(([x, y]) => C(x, y, 11, '#8BC34A', 2.5)).join('') + face(0, -18, 0.24) + face(-22, -14, 0.2))
      + g(40, 210, 1, P('M-16 0a16 16 0 0 1 32 0z', '#C5E1A5', 2.5) + P('M-10 0a10 10 0 0 1 20 0M-5 0a5 5 0 0 1 10 0', 'none', 2))),
  L('be/brussels/landmark-painalagrecque.v1.svg', 'ขนมปังกรอบน้ำตาลแปงอาลาเกร็กของบรัสเซลส์', 'Pain à la grecque, Brussels\' sugar-crusted bread bar', ['pain a la grecque', 'แปงอาลาเกร็ก', 'sugar bread', 'ขนมปังน้ำตาล', 'pearl sugar', 'น้ำตาลเม็ด', 'cinnamon bread', 'อบเชย', 'old brussels bakery', 'crunchy biscuit bread'], 'หาเม็ดน้ำตาลวาวๆ ที่ติดบนขนม', 'Find the shiny lumps of sugar stuck on top',
    // two long flat bars of golden bread with a crunchy caramelised top covered in white pearl-sugar lumps, one snapped to show the airy inside, on brown bakery paper with a cinnamon stick beside it
    P('M20 120l200-24 10 100-200 24z', '#D7B98E', 3) + Lc('M40 130l170-20', '#C9A672', 2)
      + g(116, 140, 1, R(-90, -18, 170, 36, '#C9853A', 10, 3) + P('M-86-14c40-8 120-8 160 0', 'none', 2.5) + Array.from({ length: 16 }, (_, k) => R(-80 + k * 10, -14 + (k % 3) * 8, 6, 5, '#FFFFFF', 1.5, 1.5)).join('') + face(-40, 4, 0.4), -8)
      + g(134, 186, 1, R(-70, -14, 100, 28, '#C9853A', 10, 3) + P('M30-14c6 8 6 20 0 28h-6z', '#F3D9A4', 2.5) + [[34, -6], [36, 4]].map(([x, y]) => C(x, y, 2, '#E0B979', 0)).join('') + Array.from({ length: 9 }, (_, k) => R(-64 + k * 10, -10 + (k % 2) * 8, 6, 5, '#FFFFFF', 1.5, 1.5)).join(''), -8)
      + g(196, 72, 1, R(-36, -6, 72, 12, '#8D5A2B', 6, 2.5) + Lc('M-30 0h60', '#6D4C41', 1.5), 20)),

  // ---------- Bruges (with Ghent and the coast)
  L('be/bruges/landmark-kletskoppen.v1.svg', 'คุกกี้ลูกไม้คาราเมลอัลมอนด์ของบรูจส์', 'Kletskoppen, Bruges\' lacy caramel almond biscuits', ['kletskoppen', 'เคล็ตส์คอพเพิน', 'lace biscuits', 'คุกกี้ลูกไม้', 'caramel almond', 'คาราเมลอัลมอนด์', 'brugse kletskoppen', 'thin crispy biscuit', 'บิสกิตบางกรอบ', 'biscuit tin'], 'หารูเล็กๆ ในคุกกี้ที่เหมือนลูกไม้', 'Find the little holes that make the biscuit look like lace',
    // a round blue biscuit tin with its lid off, a stack of very thin golden-brown biscuits full of little holes like lace, one held up showing the light through its holes, flaked almonds scattered around
    E(110, 176, 90, 26, '#1565C0', 3) + R(20, 140, 180, 36, '#1E88E5', 0, 3) + E(110, 140, 90, 26, '#90CAF9', 3) + Lc('M20 160h180', '#BBDEFB', 3)
      + [130, 120, 110].map((y, k) => E(110, y, 72 - k * 4, 18, '#D48A2E', 3)).join('') + Array.from({ length: 14 }, (_, k) => E(70 + (k * 23) % 80, 104 + (k * 7) % 12, 3, 2, '#FFF3E0', 0)).join('') + face(110, 110, 0.4)
      + g(196, 76, 1, C(0, 0, 34, '#E2A04A', 3) + Array.from({ length: 16 }, (_, k) => C(Math.cos(k * 2.4) * (8 + (k % 4) * 6), Math.sin(k * 2.4) * (8 + (k % 4) * 6), 3.5, '#FFF8E1', 0)).join(''))
      + [[40, 210], [60, 224], [190, 216], [214, 200]].map(([x, y], k) => E(x, y, 8, 4, '#F3E0B5', 2, ) ).join('')),
  L('be/bruges/landmark-landyacht.v1.svg', 'เรือใบล้อแล่นบนชายหาดเดอปันเนอ', 'A land yacht sailing on the wide beach at De Panne', ['land yacht', 'เรือใบบก', 'sand yacht', 'เรือใบชายหาด', 'de panne', 'เดอปันเนอ', 'belgian coast', 'ชายฝั่งเบลเยียม', 'wide beach', 'windy day'], 'หาล้อสามล้อใต้เรือใบ', 'Find the three wheels under the sail',
    // a little three-wheeled cart with a tall striped sail racing across a huge flat sandy beach at low tide, a child in a helmet lying in the seat, sand flicking up, dunes with grass behind and the grey-blue sea far off
    sky('#E1F5FE') + P('M-4 90c40-16 80-10 120-2s90 4 128-6v30H-4z', '#E6D3A0', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${14 + k * 40} 90l4-14M${22 + k * 40} 92l8-10`, '#7CB342', 2.5)).join('')
      + R(-4, 108, 248, 16, '#90CAF9', 0, 3) + R(-4, 124, 248, 120, '#F3DFB2', 0, 3) + Lc('M10 150c40-6 80 4 120-2M100 200c30-6 70 4 120 0', '#E6CC94', 3)
      + Lc('M110 190V52', '#8D6E63', 5) + P('M114 56c40 30 50 80 40 120l-40-6z', '#FFFFFF', 3) + Lc('M118 80l38 6M118 110l44 6M118 140l42 6', '#E53935', 8) + P('M114 56c40 30 50 80 40 120l-40-6z', 'none', 3)
      + Lc('M50 196l130-6M110 192l-30-10', INK, 5) + [[50, 200], [180, 196], [96, 204]].map(([x, y]) => C(x, y, 12, '#424242', 3) + C(x, y, 4, '#BDBDBD', 0)).join('')
      + g(84, 186, 1, C(-14, -8, 9, '#FFE0BD', 2.5) + P('M-24-14c0-12 20-12 20 0z', '#FFCA28', 2.5) + R(-8, -10, 30, 12, '#26A69A', 5, 2.5) + face(-14, -6, 0.2)) + face(140, 120, 0.3)
      + [[30, 210], [24, 196], [40, 220]].map(([x, y]) => C(x, y, 3, '#E6CC94', 1.5)).join('')),
  L('be/bruges/landmark-floralies.v1.svg', 'งานดอกไม้ฟลอราลีส์แห่งเกนต์', 'The Ghent Floralies flower show', ['ghent floralies', 'งานดอกไม้เกนต์', 'floralien', 'ฟลอราลีส์', 'flower show', 'งานแสดงดอกไม้', 'azaleas', 'ดอกอะซาเลีย', 'begonias', 'flower displays'], 'หากองดอกอะซาเลียทรงพีระมิด', 'Find the pyramid of azalea flowers',
    // inside a big hall: a tall pyramid of pink and red azalea blooms, round mounds of orange begonias and a swirl of tulips in the floor bed, a little bridge over a pond, kids in sun hats admiring
    sky('#FFF8E1') + P('M-4 40c60-30 188-30 248 0', 'none', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${10 + k * 44} 30v20`, '#BDBDBD', 2)).join('') + R(-4, 160, 248, 84, '#A5D6A7', 0, 3)
      + P('M120 40l60 120H60z', '#2E7D32', 3) + Array.from({ length: 20 }, (_, k) => { const r = Math.floor(Math.sqrt(k * 2)); return C(120 + (k % (r + 1) - r / 2) * 18, 60 + r * 18, 8, k % 3 ? '#EC407A' : '#F8BBD0', 2); }).join('') + face(120, 132, 0.34)
      + [[30, 150, '#FF7043'], [210, 150, '#FFA726']].map(([x, y, c]) => E(x, y, 28, 20, '#43A047', 3) + Array.from({ length: 7 }, (_, k) => C(x - 18 + (k % 4) * 12, y - 8 + Math.floor(k / 4) * 12, 6, c, 1.5)).join('')).join('')
      + E(120, 208, 50, 14, '#4FC3F7', 3) + P('M86 206c10-20 58-20 68 0', 'none', 6) + Lc('M86 206c10-20 58-20 68 0', '#A1673F', 4)
      + Array.from({ length: 8 }, (_, k) => P(`M${20 + k * 8} ${200 + (k % 2) * 6}c-4-8 0-12 4-12s8 4 4 12z`, ['#FFEB3B', '#E53935'][k % 2], 1.5)).join('') + kid(196, 222, '#7E57C2', 1) + P('M184 196c0-8 24-8 24 0z', '#FFE082', 2)),
  L('be/bruges/landmark-provinciaalhof.v1.svg', 'อาคารพรอวินซีอาลโฮฟบนจัตุรัสมาร์คท์', 'The pointy Provincial Court on the Markt', ['provinciaal hof', 'พรอวินซีอาลโฮฟ', 'provincial court', 'อาคารศาลากลางจังหวัด', 'markt', 'จัตุรัสมาร์คท์', 'neo-gothic', 'นีโอโกธิก', 'market square', 'pointed pinnacles'], 'หายอดแหลมเล็กๆ ที่เรียงกันบนหลังคา', 'Find the row of little spikes along the roof',
    // a grand grey stone building with a long arcade of pointed arches at the bottom, tall pointed windows, a forest of slender spiky pinnacles and a steep blue-grey roof, a cobbled square with a horse-free bike stand in front
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#BCAAA4', 0, 3) + Array.from({ length: 10 }, (_, k) => Lc(`M${k * 26} 196l-6 48`, '#A1887F', 2)).join('')
      + P('M24 70l96-30 96 30z', '#607D8B', 3) + R(24, 70, 192, 120, '#CFD8DC', 0, 3)
      + Array.from({ length: 6 }, (_, k) => P(`M${34 + k * 30} 190v-30c0-16 20-16 20 0v30z`, '#78909C', 2.5)).join('') + Array.from({ length: 6 }, (_, k) => P(`M${38 + k * 30} 140v-34c0-12 12-12 12 0v34z`, '#81D4FA', 2)).join('')
      + Array.from({ length: 9 }, (_, k) => Lc(`M${24 + k * 24} 76v-30`, '#90A4AE', 4) + P(`M${20 + k * 24} 50l4-16 4 16z`, '#90A4AE', 2)).join('')
      + R(96, 30, 48, 50, '#B0BEC5', 0, 3) + P('M92 32l28-28 28 28z', '#607D8B', 3) + C(120, 52, 9, '#FFF8E1', 2.5) + face(120, 92, 0.34)
      + g(200, 218, 1, Lc('M-20 0h40M-20 0v-14M20 0v-14', '#424242', 3) + C(-8, 6, 7, 'none', 2.5) + C(10, 6, 7, 'none', 2.5) + Lc('M-8 6l8-12 10 12', '#43A047', 2.5)) + kid(40, 226, '#EF5350', 0.9)),
  L('be/bruges/landmark-vleeshuis.v1.svg', 'โรงเชือดเก่าเกนต์ที่มีแฮมห้อยจากคาน', 'The Great Butchers\' Hall of Ghent with hams hanging from the beams', ['groot vleeshuis', 'โกรตฟเลสเฮาส์', 'butchers hall', 'โรงขายเนื้อเก่า', 'ganda ham', 'แฮมกันดา', 'hanging hams', 'แฮมแขวน', 'ghent food', 'wooden roof beams'], 'หาแฮมที่ห้อยจากคานไม้', 'Find the hams hanging from the wooden beams',
    // inside a long old hall under a steep wooden roof of crossed beams, rows of hams hanging on hooks from the rafters, a long wooden counter with a cheese and bread board, a kid looking up in wonder
    sky('#5D4037') + P('M-4 60L120-4l124 64v184H-4z', '#FFF3E0', 0) + P('M-4 70L120 6l124 64', 'none', 8) + Lc('M-4 70L120 6l124 64', '#8D6E63', 6)
      + Array.from({ length: 6 }, (_, k) => Lc(`M${10 + k * 44} ${66 - Math.min(k, 5 - k) * 18}v-0M${120} 6l${-110 + k * 44} ${60}`, '#A1673F', 3)).join('') + Lc('M10 76h220', '#8D6E63', 7) + Lc('M30 110h180', '#8D6E63', 6)
      + [40, 72, 104, 136, 168, 200].map((x, k) => Lc(`M${x} 110v12`, INK, 2) + g(x, 142, 1, P('M-10-20c-6 10-8 30 0 40 6 6 14 6 20 0 8-10 6-30 0-40z', '#C0392B', 3) + E(0, 6, 8, 12, '#E57373', 0) + R(-4, -26, 8, 6, '#FFF3E0', 1, 2) + (k === 2 ? face(0, 4, 0.22) : ''))).join('')
      + R(-4, 190, 248, 54, '#A1887F', 0, 3) + R(30, 176, 180, 20, '#8D5A2B', 2, 3) + g(90, 172, 1, P('M-14 4l14-16 14 16z', '#FFD54F', 2.5)) + g(150, 170, 1, E(0, 0, 18, 8, '#E2A04A', 2.5))
      + kid(200, 228, '#1E88E5', 1.1)),
  L('be/bruges/landmark-stadshal.v1.svg', 'ศาลาเมืองเกนต์ หลังคาแหลมคู่บนขาไม้', 'The Ghent City Pavilion with its two pointed roofs', ['stadshal', 'ศาลาเมืองเกนต์', 'ghent market hall', 'ศาลาสแตดส์ฮัล', 'city pavilion', 'emile braunplein', 'pointed roofs', 'หลังคาแหลม', 'modern pavilion', 'shelter for events'], 'หาหลังคาแหลมสองยอดที่ยืนอยู่บนขาสี่ขา', 'Find the two pointed roofs standing on four legs',
    // a light modern open-sided pavilion of wood and glass with two steep pointed roofs like a pair of tents, standing on four concrete legs, its underside dotted with tiny holes of light, an old belfry and gables behind, kids playing under it
    sky('#E3F2FD') + R(16, 50, 26, 100, '#BCAAA4', 0, 3) + P('M12 52l17-30 17 30z', '#607D8B', 2.5) + R(190, 70, 50, 80, '#D7CCC8', 0, 3) + P('M190 70l8-10h8v-8h14v8h8l8 10z', '#D7CCC8', 3)
      + R(-4, 170, 248, 74, '#CFD8DC', 0, 3) + [56, 92, 148, 184].map((x) => R(x - 5, 110, 10, 64, '#ECEFF1', 0, 3)).join('')
      + P('M40 110l40-70 40 70z', '#A1887F', 3) + P('M120 110l40-70 40 70z', '#A1887F', 3) + P('M44 110l36-60 4 60zM124 110l36-60 4 60z', '#D7CCC8', 0) + Lc('M40 110h160', '#8D6E63', 5)
      + Array.from({ length: 10 }, (_, k) => C(52 + k * 15, 118, 2, '#FFF59D', 0)).join('') + Lc('M44 110l36-60M120 110l40-70', '#ECEFF1', 2) + face(120, 92, 0.32)
      + kid(78, 196, '#EF5350', 1) + kid(120, 200, '#FFCA28', 1) + kid(164, 194, '#26A69A', 1)),

  // ---------- Mont-Saint-Michel (Normandy and Brittany)
  L('fr/montstmichel/landmark-ploumanach.v1.svg', 'โขดหินแกรนิตสีชมพูที่ปลูมานัค', 'The giant pink granite rocks of Ploumanac\'h', ['ploumanac\'h', 'ปลูมานัค', 'pink granite coast', 'ชายฝั่งหินแกรนิตชมพู', 'cote de granit rose', 'โกตเดอกรานิตโรส', 'funny shaped rocks', 'โขดหินรูปร่างแปลก', 'customs path', 'brittany coast'], 'หาก้อนหินที่ดูเหมือนเต่า', 'Find the rock that looks like a tortoise',
    // a jumble of huge rounded pink-orange boulders piled on each other by a blue sea, one shaped like a tortoise with a little head, one balanced like a bottle on top, purple heather and a sandy footpath between them
    sky('#E1F5FE') + water(120, '#29B6F6') + R(-4, 170, 248, 74, '#E1C699', 0, 3)
      + P('M20 180c-10-50 30-80 70-70 30 10 30 60 10 76z', '#F4A68A', 3) + P('M100 186c-6-40 30-60 60-50 40-10 70 20 60 60z', '#F7B79C', 3) + Lc('M130 150c10 10 30 12 50 6', '#E58E70', 2.5)
      + P('M210 176c10-6 22-4 26 6-6 6-18 6-26 0z', '#F7B79C', 3) + C(230, 176, 2, INK, 0) + face(160, 168, 0.4)
      + E(60, 104, 30, 22, '#F7B79C', 3) + E(66, 78, 20, 14, '#F4A68A', 3) + Lc('M44 104c8 6 22 6 32 0', '#E58E70', 2)
      + Lc('M110 200c30 10 60 20 100 44', '#FFF3E0', 8) + Array.from({ length: 12 }, (_, k) => C(16 + (k * 19) % 90, 200 + (k * 7) % 36, 4, k % 2 ? '#AB47BC' : '#CE93D8', 1.5)).join('')
      + Array.from({ length: 6 }, (_, k) => C(190 + (k % 3) * 14, 210 + Math.floor(k / 3) * 14, 4, '#AB47BC', 1.5)).join('')),
  L('fr/montstmichel/landmark-groshorloge.v1.svg', 'นาฬิกาทองโกรออร์โลฌบนซุ้มโค้งที่รูอ็อง', 'The golden Gros-Horloge clock over the street in Rouen', ['gros-horloge', 'โกรออร์โลฌ', 'rouen', 'รูอ็อง', 'golden clock', 'นาฬิกาทอง', 'one-handed clock', 'นาฬิกาเข็มเดียว', 'renaissance arch', 'old town street'], 'หาเข็มเดียวของนาฬิกาที่มีรูปลูกแกะ', 'Find the clock\'s single hand',
    // a stone arch spanning a narrow street of half-timbered houses, a big blue clock face with a golden sun and rays and a single golden hand in the middle of the arch, a smaller round moon dial above, people walking under it
    sky('#E3F2FD') + [[-4, '#FFE0B2'], [196, '#FFCCBC']].map(([x, c]) => R(x, 40, 48, 200, c, 0, 3) + Lc(`M${x} 80h48M${x} 120h48M${x} 160h48M${x + 12} 40v200M${x + 36} 40v200`, '#6D4C41', 3)).join('')
      + R(44, 50, 152, 190, '#E6D3B3', 0, 3) + P('M74 240v-50c0-30 92-30 92 0v50z', '#B3E5FC', 3) + R(-4, 226, 248, 18, '#9E9E9E', 0, 3)
      + C(120, 116, 46, '#1565C0', 4) + C(120, 116, 38, '#1E88E5', 2) + Array.from({ length: 24 }, (_, k) => { const a = (k / 24) * Math.PI * 2; return Lc(`M${(120 + Math.cos(a) * 16).toFixed(1)} ${(116 + Math.sin(a) * 16).toFixed(1)}L${(120 + Math.cos(a) * 36).toFixed(1)} ${(116 + Math.sin(a) * 36).toFixed(1)}`, '#FFD54F', 2.5); }).join('')
      + C(120, 116, 14, '#FFC107', 2.5) + face(120, 116, 0.32) + Lc('M120 116l-6-38', '#FFC107', 6) + Lc('M120 116l-6-38', INK, 1.5)
      + C(120, 64, 12, '#FFF8E1', 2.5) + P('M116 58a8 8 0 1 0 8 12 6 6 0 1 1-8-12z', '#FFC107', 1.5) + kid(100, 232, '#EF5350', 0.85) + kid(140, 232, '#7E57C2', 0.85)),
  L('fr/montstmichel/landmark-farbreton.v1.svg', 'ขนมฟาร์เบรอตงคัสตาร์ดลูกพรุน', 'Far breton, Brittany\'s prune custard cake', ['far breton', 'ฟาร์เบรอตง', 'prune flan', 'คัสตาร์ดลูกพรุน', 'brittany cake', 'ขนมบริตตานี', 'baked custard', 'คัสตาร์ดอบ', 'prunes', 'ลูกพรุน'], 'หาลูกพรุนสีม่วงที่โผล่ในเนื้อขนม', 'Find the purple prune peeping out of the cake',
    // a square baking dish of thick wobbly custard cake with a dark golden-brown top, square pieces cut, one lifted out onto a plate showing its smooth yellow inside dotted with dark prunes, a little jug of milk
    P('M24 90h150l20 70H44z', '#E0E0E0', 3) + P('M34 96h134l14 56H50z', '#B5651D', 3) + Lc('M80 96l10 56M124 96l12 56M42 124h132', '#8D4A14', 3) + E(150, 112, 10, 6, '#C9853A', 0)
      + g(150, 196, 1, E(0, 6, 60, 18, '#FFFFFF', 3) + P('M-34-30h56l10 34h-56z', '#FFE082', 3) + P('M-34-30h56l10-8h-56z', '#B5651D', 3) + P('M22-30l10-8v34l-10 8z', '#F6CA5D', 3)
        + [[-20, -14], [4, -20], [10, -6]].map(([x, y]) => E(x, y, 6, 5, '#4A148C', 2)).join('') + face(-8, -10, 0.3))
      + g(48, 184, 1, P('M-16-24h28l4 40h-36z', '#E3F2FD', 3) + P('M12-16c10 0 10 14 0 14', 'none', 3) + P('M-12-12h24v6h-24z', '#FFFFFF', 0))),
  // ---------- Nice and the Riviera
  L('fr/nice/landmark-pissaladiere.v1.svg', 'พิสซาลาดิแยร์ ทาร์ตหอมใหญ่กับมะกอกดำของนีซ', 'Pissaladière, the onion and olive tart of Nice', ['pissaladiere', 'พิสซาลาดิแยร์', 'onion tart', 'ทาร์ตหอมใหญ่', 'black olives', 'มะกอกดำ', 'nice street food', 'อาหารริมทางนีซ', 'anchovies', 'bakery slice'], 'หามะกอกดำที่อยู่ในช่องตาราง', 'Find the black olive sitting in each little square',
    // a long rectangle of golden bread base piled with soft brown caramelised onions, thin dark anchovy strips making a criss-cross lattice with a black olive in each diamond, one square cut and lifted, on baking paper
    P('M14 80l212-10 6 110-212 10z', '#FFF3E0', 3) + g(118, 130, 1, R(-96, -42, 192, 84, '#E2A04A', 8, 3) + R(-88, -34, 176, 68, '#C98A3C', 4, 0)
      + Array.from({ length: 30 }, (_, k) => P(`M${-80 + (k * 29) % 160} ${-26 + (k * 13) % 52}c4-4 8-4 10 0`, 'none', 2)).join('')
      + Array.from({ length: 4 }, (_, k) => Lc(`M${-88 + k * 44}-34l44 68M${-44 + k * 44}-34l-44 68`, '#5D4037', 3)).join('')
      + Array.from({ length: 8 }, (_, k) => E(-66 + (k % 4) * 44, -14 + Math.floor(k / 4) * 32, 6, 5, '#263238', 2)).join('') + face(-22, 4, 0.4), -3)
      + g(196, 196, 1, R(-22, -16, 44, 32, '#E2A04A', 4, 3) + R(-18, -12, 36, 24, '#C98A3C', 2, 0) + Lc('M-18-12l36 24M18-12l-36 24', '#5D4037', 2.5) + E(0, 0, 5, 4, '#263238', 1.5))),
  L('fr/nice/landmark-farcis.v1.svg', 'ผักยัดไส้อบแบบนีซ', 'Petits farcis niçois, little stuffed vegetables', ['petits farcis', 'เปอตีฟาร์ซี', 'stuffed vegetables', 'ผักยัดไส้', 'stuffed tomatoes', 'มะเขือเทศยัดไส้อบ', 'round courgettes', 'ซูกินีลูกกลม', 'nice home cooking', 'baked vegetables'], 'หาพริกหวานสีเหลืองที่ยัดไส้', 'Find the stuffed yellow pepper',
    // a round baking tray of little vegetables hollowed and stuffed with golden crumbly filling, each with its own cap: red tomatoes, round green courgettes, a yellow pepper, a purple aubergine half and white onions, basil leaves
    E(120, 150, 108, 64, '#78909C', 3) + E(120, 146, 96, 54, '#ECEFF1', 2)
      + [[70, 126, '#E53935', 0], [120, 116, '#7CB342', 1], [170, 128, '#FFCA28', 2], [86, 170, '#7E57C2', 3], [150, 172, '#E53935', 0], [196, 160, '#FAFAFA', 4], [40, 156, '#FAFAFA', 4]].map(([x, y, c, t]) =>
        g(x, y, 1, (t === 3 ? E(0, 0, 26, 16, c, 3) + E(0, -2, 20, 10, '#E2A04A', 2) : C(0, 0, t === 4 ? 16 : 22, c, 3) + E(0, -6, t === 4 ? 10 : 15, 7, '#E2A04A', 2))
          + Array.from({ length: 4 }, (_, k) => C(-6 + k * 4, -7 + (k % 2) * 2, 1.5, '#A0602A', 0)).join('') + (t === 1 ? face(0, 8, 0.3) : '') + (t === 2 ? Lc('M0-14l2-10', '#43A047', 4) : '') + (t === 0 ? P('M-4-16l4-6 4 6z', '#43A047', 1.5) : ''))).join('')
      + [[110, 150], [130, 196], [60, 190]].map(([x, y]) => P(`M${x} ${y}c6-8 14-8 16 0-6 6-12 6-16 0z`, '#43A047', 2)).join('')),
  L('fr/nice/landmark-tourteblettes.v1.svg', 'ทูร์ตเดอเบล็ต พายผักชาร์ดหวานของนีซ', 'Tourte de blettes, Nice\'s sweet chard pie', ['tourte de blettes', 'ทูร์ตเดอเบล็ต', 'swiss chard pie', 'พายผักชาร์ด', 'sweet green pie', 'พายผักหวาน', 'pine nuts and raisins', 'ถั่วสนกับลูกเกด', 'nice speciality', 'icing sugar'], 'หาลูกเกดในไส้สีเขียว', 'Find the raisins in the green filling',
    // a round pie with a pale golden top dusted with icing sugar, one slice cut out to show the bright green chard filling dotted with pine nuts and raisins, a bunch of chard with red stems and a pine cone beside it
    plate('#FFFFFF', '#FFF8E1') + P('M30 140v20c0 22 160 22 160 0v-20z', '#E2A04A', 3) + E(110, 140, 80, 22, '#F7DCA4', 3)
      + Array.from({ length: 16 }, (_, k) => C(50 + (k * 37) % 120, 132 + (k * 11) % 18, 2, '#FFFFFF', 0)).join('') + P('M110 140l70-12c6 4 8 8 6 12z', '#43A047', 3) + face(80, 144, 0.42)
      + g(176, 118, 1, P('M-40 20l50-36 30 20v18l-50 36-30-20z', '#43A047', 3) + P('M-40 20l50-36 30 20-50 36z', '#F7DCA4', 3) + P('M-10 40v18l-30-20v-18z', '#2E7D32', 3)
        + [[-30, 32], [-20, 44]].map(([x, y]) => E(x, y, 3, 2, '#FFF8E1', 1)).join('') + C(-26, 42, 2.5, '#4A148C', 0))
      + g(40, 96, 1, [[-10, 10], [0, 0], [10, 8]].map(([x, r]) => g(x, 0, 1, Lc('M0 40v-40', '#E53935', 4) + P('M0-36c-18 0-20 30 0 40 20-10 18-40 0-40z', '#388E3C', 2.5), r)).join(''))
      + g(206, 198, 1, E(0, 0, 14, 18, '#A1673F', 3) + Lc('M-10-8h20M-12 2h24M-8 12h16', '#6D4C41', 2))),
  L('fr/nice/landmark-violettes.v1.svg', 'ดอกไวโอเล็ตเคลือบน้ำตาลแห่งตูแร็ต-ซูร์-ลู', 'Candied violets from Tourrettes-sur-Loup', ['candied violets', 'ไวโอเล็ตเคลือบน้ำตาล', 'tourrettes-sur-loup', 'ตูแร็ต-ซูร์-ลู', 'violet flowers', 'ดอกไวโอเล็ต', 'village of violets', 'หมู่บ้านไวโอเล็ต', 'sweet flowers', 'violet festival'], 'หาดอกไวโอเล็ตที่มีเกล็ดน้ำตาลวาวๆ', 'Find the violet with sparkly sugar crystals',
    // a little round tin open full of crystallised purple violet flowers glittering with sugar, a fresh bunch of violets with heart-shaped leaves tied with ribbon beside it, a stone hilltop village far behind
    sky('#F3E5F5') + P('M140 80c10-20 30-30 50-30s40 10 50 30v20h-100z', '#D7CCC8', 3) + [150, 172, 196, 220].map((x, k) => R(x, 66 - (k % 2) * 8, 16, 34, '#E6D3B3', 0, 2)).join('') + R(-4, 100, 248, 144, '#E1BEE7', 0, 0)
      + E(90, 176, 66, 22, '#B0BEC5', 3) + R(24, 144, 132, 32, '#CFD8DC', 0, 3) + E(90, 144, 66, 22, '#ECEFF1', 3)
      + [[60, 140], [86, 134], [112, 140], [74, 152], [100, 154], [126, 150], [52, 152]].map(([x, y]) => C(x - 4, y - 2, 4.5, '#7B1FA2', 1.5) + C(x + 4, y - 2, 4.5, '#7B1FA2', 1.5) + C(x, y + 4, 4.5, '#8E24AA', 1.5) + C(x, y, 2, '#FFEB3B', 0) + C(x + 5, y - 5, 1.2, '#FFFFFF', 0)).join('') + face(90, 168, 0.36)
      + g(190, 160, 1, [[-20, -4], [0, -14], [20, -2]].map(([x, y]) => Lc(`M0 50L${x} ${y}`, '#558B2F', 3) + C(x - 5, y - 3, 6, '#8E24AA', 2) + C(x + 5, y - 3, 6, '#8E24AA', 2) + C(x, y + 5, 6, '#7B1FA2', 2) + C(x, y, 2.5, '#FFEB3B', 0)).join('')
        + P('M-30 30c-10-14 4-24 14-14 6-12 22-4 14 10z', '#7CB342', 2.5) + P('M-6 40l12-6 12 6-12 6z', '#F48FB1', 2))),
  L('fr/nice/landmark-trainpignes.v1.svg', 'รถไฟแทรงเดปิญบนสะพานหินในหุบเขา', 'The little Pine Cone Train crossing a stone viaduct', ['train des pignes', 'รถไฟแทรงเดปิญ', 'pine cone train', 'รถไฟลูกสน', 'chemins de fer de provence', 'stone viaduct', 'สะพานหินโค้ง', 'mountain railway', 'รถไฟภูเขา', 'nice to digne'], 'หาลูกสนที่ตกอยู่ข้างราง', 'Find the pine cone lying beside the track',
    // a short cream-and-red railcar with round lamps crossing a tall stone viaduct of many arches over a green valley, umbrella pines and rocky hills around, a big pine cone in the front corner
    sky('#FFF8E1') + P('M-4 120c40-60 80-60 120-20s80-50 128-30v174H-4z', '#C5E1A5', 3) + R(-4, 210, 248, 34, '#81C784', 0, 3)
      + R(-4, 120, 248, 14, '#D7CCC8', 0, 3) + Array.from({ length: 5 }, (_, k) => P(`M${6 + k * 48} 134h36v76h-36z`, '#D7CCC8', 3) + P(`M${10 + k * 48} 210v-50c0-18 28-18 28 0v50z`, '#A5D6A7', 2.5)).join('').replace(/#A5D6A7/g, '#C5E1A5')
      + R(48, 84, 120, 36, '#FFF3E0', 8, 3) + R(48, 104, 120, 10, '#E53935', 0, 2.5) + [64, 92, 120].map((x) => R(x, 90, 20, 12, '#81D4FA', 3, 2)).join('') + C(162, 112, 5, '#FFEB3B', 2) + face(150, 96, 0.28)
      + [[72, 122], [146, 122]].map(([x, y]) => C(x, y, 6, '#424242', 2)).join('') + Lc('M-4 120h248', '#5D4037', 3)
      + [[24, 60], [210, 50]].map(([x, y]) => Lc(`M${x} ${y + 40}v-30`, '#6D4C41', 4) + E(x, y, 26, 12, '#2E7D32', 3)).join('')
      + g(204, 218, 1, E(0, 0, 16, 22, '#A1673F', 3) + Array.from({ length: 4 }, (_, k) => Lc(`M-12 ${-14 + k * 8}c4 4 20 4 24 0`, '#6D4C41', 2)).join(''), 30)),

  // ---------- Strasbourg and Colmar
  L('fr/strasbourg/landmark-munster.v1.svg', 'ชีสมุนสเตอร์เปลือกส้มกับยี่หร่า', 'Munster cheese with cumin and potatoes', ['munster cheese', 'ชีสมุนสเตอร์', 'munster', 'มุนสเตอร์', 'vosges cheese', 'ชีสโวสเจส', 'cumin seeds', 'เมล็ดยี่หร่า', 'jacket potatoes', 'cheese farm'], 'หาเมล็ดยี่หร่าเล็กๆ บนชีส', 'Find the tiny cumin seeds on the cheese',
    // a round cheese with a sticky orange rind on a wooden board, a wedge cut away showing the soft pale creamy inside, a little dish of cumin seeds, two potatoes in their jackets with a cross cut, a happy face on the cheese
    R(20, 160, 200, 30, '#C6974F', 12, 3) + C(36, 175, 4, '#8D6E63', 0)
      + P('M30 120v30c0 18 120 18 120 0v-30z', '#F57C00', 3) + E(90, 120, 60, 16, '#FB8C00', 3) + P('M90 120l56-6v30l-56 8z', '#FFF8E1', 3) + Lc('M100 128l40-6', '#FFE082', 2)
      + Array.from({ length: 10 }, (_, k) => E(52 + (k * 13) % 76, 114 + (k * 5) % 10, 2, 1, '#6D4C41', 0)).join('') + face(70, 138, 0.42)
      + [[176, 136], [204, 148]].map(([x, y]) => E(x, y, 22, 16, '#C69C6D', 3) + Lc(`M${x - 6} ${y - 8}l12 8M${x + 6} ${y - 8}l-12 8`, '#FFF3C4', 3) + C(x, y - 4, 4, '#FFF59D', 0)).join('')
      + g(60, 214, 1, E(0, 0, 22, 8, '#FFFFFF', 2.5) + Array.from({ length: 8 }, (_, k) => E(-12 + (k % 4) * 8, -2 + Math.floor(k / 4) * 4, 2.5, 1.2, '#8D6E63', 0)).join(''))),
  L('fr/strasbourg/landmark-deuxrives.v1.svg', 'สะพานคนเดินสองฝั่งข้ามแม่น้ำไรน์สู่เยอรมนี', 'The Two Banks Footbridge across the Rhine to Germany', ['passerelle des deux rives', 'สะพานสองฝั่ง', 'jardin des deux rives', 'สวนสองฝั่ง', 'footbridge to germany', 'เดินข้ามไปเยอรมนี', 'kehl', 'เคห์ล', 'rhine river', 'แม่น้ำไรน์'], 'หาสะพานสองเส้นที่โค้งไปคนละทาง', 'Find the two decks curving in different directions',
    // a slender white footbridge with two curving decks, one swooping high and one low, hung by fans of thin cables from a tall leaning white mast in the middle of the wide river, green parks on both banks, kids waving from each side
    sky('#E3F2FD') + water(150, '#4FC3F7') + P('M-4 140c20-6 34-4 44 10v94H-4zM244 140c-20-6-34-4-44 10v94h44z', '#8BC34A', 3)
      + Lc('M126 30l-10 150', '#FAFAFA', 9) + Lc('M126 30l-10 150', INK, 1.5) + Array.from({ length: 6 }, (_, k) => Lc(`M124 ${44 + k * 6}L${40 + k * 14} ${132 - k * 3}M124 ${44 + k * 6}L${200 - k * 14} ${132 - k * 3}`, '#B0BEC5', 1.5)).join('')
      + Lc('M30 140c40-40 140-40 180 0', '#FAFAFA', 8) + Lc('M30 140c40-40 140-40 180 0', INK, 1.5) + Lc('M30 144c50-6 130-6 180 0', '#FFFFFF', 8) + Lc('M30 144c50-6 130-6 180 0', INK, 1.5)
      + face(118, 160, 0.3) + kid(18, 140, '#EF5350', 0.9) + kid(224, 140, '#FFCA28', 0.9)
      + [[40, 200], [200, 200]].map(([x, y]) => E(x, y, 22, 14, '#43A047', 2.5)).join('')),
  L('fr/strasbourg/landmark-fleischschnacka.v1.svg', 'ไฟลช์ชนัคกา พาสต้าม้วนหอยทากไส้เนื้อ', 'Fleischschnacka, the meat-filled pasta snails of Alsace', ['fleischschnacka', 'ไฟลช์ชนัคกา', 'pasta snails', 'พาสต้าม้วนหอยทาก', 'meat rolls', 'ม้วนไส้เนื้อ', 'alsace dish', 'อาหารอาลซัส', 'pan fried', 'green salad'], 'หาม้วนที่วนเป็นก้นหอยเหมือนหอยทาก', 'Find the roll that curls round like a snail\'s shell',
    // a black pan of thick pasta slices rolled into spirals around a brown meat filling, crisp and golden on top like a row of snail shells, one with a little snail face, a bowl of green salad beside it
    E(110, 150, 94, 52, '#424242', 3) + E(110, 146, 84, 44, '#616161', 0) + Lc('M196 140l40-20', '#424242', 12)
      + [[70, 130], [110, 124], [150, 132], [86, 164], [128, 168]].map(([x, y], k) => g(x, y, 1, C(0, 0, 20, '#F2C27B', 3) + P('M0 0c0-4 6-4 6 0 0 8-12 8-12 0 0-12 18-12 18 0 0 16-24 16-24 0', 'none', 6) + Lc('M0 0c0-4 6-4 6 0 0 8-12 8-12 0 0-12 18-12 18 0 0 16-24 16-24 0', '#8D4A14', 4)
        + (k === 1 ? g(18, -18, 1, Lc('M0 0l4-10M6 2l8-8', INK, 2) + C(4, -10, 2, INK, 0) + C(14, -6, 2, INK, 0)) + face(0, 12, 0.22, 'none') : ''))).join('')
      + g(200, 200, 1, P('M-30-6h60c0 20-12 28-30 28s-30-8-30-28z', '#FFFFFF', 3) + [[-16, -12], [0, -16], [16, -12], [-6, -6], [10, -6]].map(([x, y]) => P(`M${x - 8} ${y}c4-10 12-10 16 0-6 6-10 6-16 0z`, '#7CB342', 2)).join(''))),
];

export default { places: {}, items };
