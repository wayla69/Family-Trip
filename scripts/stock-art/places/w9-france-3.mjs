// Wave 9, group france (3/3): Zurich, Geneva and Lake Léman, Luxembourg, Luxembourg City and Vianden, Provence,
// Chamonix and Annecy, Lyon
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const water = (y, c = '#4FC3F7') => R(-4, y, 248, 248 - y, c, 0, 3) + Lc(`M20 ${y + 16}c10-4 20 4 30 0M150 ${y + 26}c10-4 20 4 30 0`, '#E1F5FE', 3);
const plate = (c = '#FFFFFF', in_ = '#E3F2FD') => E(120, 180, 104, 32, c, 3) + E(120, 176, 86, 22, in_, 0);
const tree = (x, y, c = '#43A047', r = 16) => Lc(`M${x} ${y}v12`, '#6D4C41', 3) + C(x, y - r + 2, r, c, 2.5);

const items = [
  // ---------- Zurich
  L('ch/zurich/landmark-holzsteg.v1.svg', 'สะพานไม้ยาวข้ามทะเลสาบที่ราพเพอร์สวิล', 'The long wooden footbridge across the lake at Rapperswil', ['rapperswil', 'ราพเพอร์สวิล', 'holzsteg', 'สะพานไม้ทะเลสาบ', 'wooden footbridge', 'สะพานไม้ยาว', 'lake zurich', 'ทะเลสาบซูริก', 'town of roses', 'pilgrim path bridge'], 'หาเสาไม้ที่ปักลงในน้ำใต้สะพาน', 'Find the wooden posts standing in the water under the bridge',
    // a very long low wooden footbridge on rows of posts stretching across a calm blue lake towards a little hill town with a castle and roses, reeds in the water, a family walking along it
    sky('#E3F2FD') + P('M150 90c20-30 60-34 94-20v40h-94z', '#A5D6A7', 3) + R(176, 50, 30, 30, '#E0C9A0', 0, 3) + P('M172 52l19-16 19 16z', '#D84315', 3) + R(206, 62, 16, 22, '#E0C9A0', 0, 2.5) + P('M204 64l10-12 10 12z', '#D84315', 2.5)
      + [[160, 96], [230, 92]].map(([x, y]) => C(x, y, 5, '#EC407A', 1.5)).join('') + water(100, '#64B5F6')
      + P('M-4 190L240 110v8L-4 202z', '#C6974F', 3) + Array.from({ length: 12 }, (_, k) => Lc(`M${k * 22} ${193 - k * 7.2}v${20 - k * 0.8}`, '#8D6E63', 3)).join('') + Lc('M-4 182L240 104', '#8D6E63', 3)
      + kid(60, 170, '#EF5350', 1) + kid(84, 162, '#FFCA28', 0.9) + face(150, 160, 0.3)
      + Array.from({ length: 7 }, (_, k) => Lc(`M${12 + k * 8} 236v-${20 + (k % 3) * 8}`, '#7CB342', 3)).join('')),
  L('ch/zurich/landmark-planetweg.v1.svg', 'เส้นทางดาวเคราะห์บนเขาอูเอทลิแบร์ก', 'The planet trail along the Uetliberg ridge', ['planetenweg', 'เส้นทางดาวเคราะห์', 'planet trail', 'เดินชมดาวเคราะห์', 'uetliberg to felsenegg', 'อูเอทลิแบร์ก', 'model planets', 'โมเดลดาวเคราะห์', 'solar system walk', 'ระบบสุริยะ'], 'หาดาวเสาร์ที่มีวงแหวน', 'Find Saturn with its ring',
    // a forest path along a ridge with little planet models on posts beside it, a big golden sun model at the start, a ringed Saturn, a red Mars and a blue Earth, a kid running between them, beech trees
    sky('#E8F5E9') + [[20, 90], [80, 70], [150, 80], [216, 90]].map(([x, y]) => tree(x, y + 40, '#66BB6A', 26)).join('') + R(-4, 150, 248, 94, '#AED581', 0, 3)
      + P('M-4 220c60-40 140-60 248-70v20c-100 10-180 30-248 70z', '#E6D3A0', 3)
      + g(40, 168, 1, Lc('M0 30v-20', '#8D6E63', 5) + C(0, -10, 24, '#FFC107', 3) + Array.from({ length: 8 }, (_, k) => g(0, -10, 1, Lc('M0-28v-8', '#FFB300', 3), k * 45)).join('') + face(0, -10, 0.4))
      + [[100, 168, 7, '#E53935', 0], [146, 154, 9, '#1E88E5', 0], [200, 132, 14, '#FFCC80', 1]].map(([x, y, r, c, ring]) => Lc(`M${x} ${y + 26}v-${20}`, '#8D6E63', 4) + C(x, y, r, c, 2.5) + (ring ? E(x, y, r + 12, 4, 'none', 3) + Lc(`M${x - r - 12} ${y}a${r + 12} 4 0 0 0 ${2 * r + 24} 0`, '#A1887F', 3) : '') + (c === '#1E88E5' ? P(`M${x - 4} ${y - 4}c2-2 6-2 6 2-2 2-4 2-6-2z`, '#66BB6A', 0) : '')).join('')
      + kid(124, 214, '#7E57C2', 1)),
  L('ch/zurich/landmark-rietberg.v1.svg', 'พิพิธภัณฑ์รีทแบร์กกับศาลาแก้วสีมรกต', 'The Rietberg Museum and its emerald glass pavilion', ['museum rietberg', 'พิพิธภัณฑ์รีทแบร์ก', 'emerald pavilion', 'ศาลาแก้วมรกต', 'villa wesendonck', 'วิลลาเวเซินดองก์', 'rieterpark', 'สวนรีเทอร์', 'world art museum', 'green glass box'], 'หากล่องแก้วสีเขียวมรกต', 'Find the emerald-green glass box',
    // a pale classical villa with a columned porch on a grassy park slope, beside it a low glass box glowing emerald green with a leafy pattern on its glass, big old trees and a path with kids
    sky('#E3F2FD') + R(-4, 150, 248, 94, '#9CCC65', 0, 3) + tree(20, 130, '#2E7D32', 28) + tree(222, 130, '#388E3C', 26)
      + R(40, 70, 110, 80, '#FFF8E1', 0, 3) + P('M34 72l61-26 61 26z', '#FFF8E1', 3) + R(70, 90, 50, 60, '#FFF3E0', 0, 2.5) + [76, 92, 108].map((x) => R(x, 96, 6, 54, '#FFFFFF', 0, 2)).join('')
      + [48, 128].map((x) => R(x, 88, 14, 22, '#81D4FA', 2, 2)).join('') + C(95, 62, 6, '#81D4FA', 2)
      + R(150, 130, 70, 40, '#00C853', 2, 3) + Array.from({ length: 6 }, (_, k) => P(`M${156 + k * 11} ${164 - (k % 2) * 10}c2-10 8-12 8-20`, 'none', 2)).join('') + Lc('M150 140h70', '#B9F6CA', 3) + face(185, 152, 0.3)
      + P('M80 244c10-40 40-60 80-74', 'none', 10) + Lc('M80 244c10-40 40-60 80-74', '#E6D3A0', 8) + kid(110, 214, '#EF5350', 0.9) + kid(140, 196, '#FFCA28', 0.8)),
  L('ch/zurich/landmark-eth.v1.svg', 'อาคารโดมของมหาวิทยาลัยอีทีเอชกับระเบียงชมวิว', 'The domed ETH building and its view terrace', ['eth zurich', 'มหาวิทยาลัยอีทีเอช', 'polyterrasse', 'ระเบียงโพลี', 'university dome', 'โดมมหาวิทยาลัย', 'view over zurich', 'วิวเมืองซูริก', 'einstein\'s university', 'hochschulquartier'], 'หาโดมสีเขียวบนหลังคา', 'Find the green dome on the roof',
    // a long grand pale building with rows of tall windows and a big green copper dome in the middle, a wide terrace with a stone balustrade in front where kids look down over the old town roofs and the river
    sky('#E1F5FE') + R(20, 70, 200, 80, '#F5E6C8', 0, 3) + Array.from({ length: 10 }, (_, k) => R(28 + k * 19, 90, 10, 24, '#81D4FA', 2, 2) + R(28 + k * 19, 122, 10, 18, '#81D4FA', 2, 2)).join('')
      + P('M84 72c0-50 72-50 72 0z', '#4DB6AC', 3) + Lc('M100 70c0-30 40-30 40 0', '#80CBC4', 3) + C(120, 20, 6, '#4DB6AC', 2.5) + R(84, 70, 72, 8, '#E0C9A0', 0, 2.5) + face(120, 54, 0.32)
      + R(-4, 150, 248, 20, '#E0E0E0', 0, 3) + Array.from({ length: 16 }, (_, k) => R(2 + k * 15, 156, 6, 14, '#BDBDBD', 2, 1.5)).join('') + Lc('M-4 156h248', '#9E9E9E', 3)
      + R(-4, 170, 248, 74, '#B3E5FC', 0, 0) + Array.from({ length: 7 }, (_, k) => R(4 + k * 34, 190 + (k % 2) * 8, 28, 22, ['#FFE0B2', '#FFCCBC', '#FFF9C4'][k % 3], 0, 2) + P(`M${2 + k * 34} ${190 + (k % 2) * 8}l16-12 16 12z`, '#BF360C', 2)).join('')
      + Lc('M-4 236c40-6 80 6 120 0s80 6 128 0', '#4FC3F7', 6) + kid(60, 156, '#EF5350', 0.9) + kid(180, 156, '#7E57C2', 0.9)),
  L('ch/zurich/landmark-hueppen.v1.svg', 'ฮึพเพิน เวเฟอร์ม้วนไส้ครีมช็อกโกแลตของซูริก', 'Hüppen, Zurich\'s rolled wafers with chocolate cream', ['huppen', 'ฮึพเพิน', 'zurcher huppen', 'rolled wafers', 'เวเฟอร์ม้วน', 'chocolate cream', 'ครีมช็อกโกแลต', 'confiserie', 'ร้านขนมสวิส', 'crispy rolls'], 'หาไส้ครีมช็อกโกแลตที่ปลายเวเฟอร์', 'Find the chocolate cream at the end of the wafer',
    // a glass jar holding a bunch of thin golden wafer rolls standing upright, their ends filled with swirls of chocolate cream, two more lying on a plate, one snapped showing its spiral and crumbs
    plate('#FFFFFF', '#FCE4EC') + P('M60 70h80v100c0 10-80 10-80 0z', '#E3F2FD', 3) + E(100, 70, 40, 8, '#BBDEFB', 2.5)
      + [70, 86, 102, 118, 132].map((x, k) => g(x, 92 - (k % 2) * 10, 1, R(-6, -40, 12, 120, '#E8B25F', 6, 2.5) + Lc('M-6-24l12-6M-6 0l12-6M-6 24l12-6', '#C98A3C', 2) + E(0, -40, 6, 4, '#5D4037', 2))).join('')
      + P('M60 70h80v100c0 10-80 10-80 0z', 'none', 3) + face(100, 150, 0.36)
      + g(178, 176, 1, R(-36, -7, 72, 14, '#E8B25F', 7, 2.5) + E(36, 0, 4, 7, '#5D4037', 2) + Lc('M-24-7l-6 14M-6-7l-6 14M12-7l-6 14', '#C98A3C', 2), -14)
      + g(170, 206, 1, R(-20, -6, 40, 12, '#E8B25F', 6, 2.5) + C(20, 0, 6, '#F3D9A4', 2) + P('M16 0c2-2 4 0 2 2', 'none', 1.5)) + [[200, 210], [206, 202]].map(([x, y]) => C(x, y, 2, '#E8B25F', 1)).join('')),

  // ---------- Geneva and Lake Léman
  L('ch/geneva/landmark-treille.v1.svg', 'ม้านั่งที่ยาวที่สุดในโลกบนลานเทรย์', 'The world\'s longest bench on the Promenade de la Treille', ['promenade de la treille', 'ลานเทรย์', 'longest bench', 'ม้านั่งยาวที่สุด', 'green bench', 'ม้านั่งสีเขียว', 'chestnut trees', 'ต้นเกาลัด', 'old town terrace', 'official chestnut tree'], 'หาเด็กที่นั่งอยู่ปลายม้านั่ง', 'Find the child sitting at the very end of the bench',
    // a very long green wooden bench stretching across the picture and out of sight, under a row of big horse-chestnut trees with spiky conkers, a stone balustrade behind it, a row of kids and grown-ups sitting along it
    sky('#E8F5E9') + Array.from({ length: 4 }, (_, k) => tree(30 + k * 60, 80, '#66BB6A', 34)).join('') + [[40, 50], [110, 40], [160, 56], [210, 44]].map(([x, y]) => C(x, y, 5, '#8D6E63', 1.5) + Lc(`M${x - 6} ${y}h12M${x} ${y - 6}v12`, '#AED581', 1.5)).join('')
      + R(-4, 120, 248, 24, '#E0D2B4', 0, 3) + Array.from({ length: 12 }, (_, k) => R(4 + k * 21, 124, 8, 18, '#F5E6C8', 3, 1.5)).join('') + R(-4, 144, 248, 100, '#D7CCC8', 0, 3)
      + R(-4, 160, 248, 8, '#2E7D32', 0, 2.5) + R(-4, 172, 248, 8, '#2E7D32', 0, 2.5) + R(-4, 184, 248, 10, '#388E3C', 0, 2.5) + Array.from({ length: 8 }, (_, k) => Lc(`M${10 + k * 32} 194v20`, '#1B5E20', 4)).join('')
      + [[24, '#EF5350'], [60, '#FFCA28'], [100, '#7E57C2'], [140, '#26A69A'], [180, '#FF7043'], [216, '#42A5F5']].map(([x, c]) => kid(x, 184, c, 1)).join('') + face(120, 220, 0.3)),
  L('ch/geneva/landmark-niton.v1.svg', 'หินนิตงสองก้อนโผล่กลางทะเลสาบเจนีวา', 'The Pierres du Niton, two big rocks peeking out of the lake', ['pierres du niton', 'หินนิตง', 'rocks in the lake', 'ก้อนหินกลางทะเลสาบ', 'lake geneva', 'ทะเลสาบเจนีวา', 'glacier boulders', 'หินที่ธารน้ำแข็งพามา', 'height marker', 'quai gustave-ador'], 'หาหมุดทองเล็กๆ บนหินก้อนใหญ่', 'Find the tiny brass marker on the bigger rock',
    // two rounded grey granite boulders poking out of clear blue water near the lakeside promenade, a tiny shiny brass marker on top of the bigger one, ducks paddling, sailing boats and far snowy mountains
    sky('#E3F2FD') + P('M-4 90l40-24 30 16 40-30 40 26 30-18 68 30z', '#B0BEC5', 3) + P('M108 52l8-6 8 10-8-2z', '#FFFFFF', 0) + water(90, '#4FC3F7')
      + [[50, 120], [190, 110]].map(([x, y]) => P(`M${x} ${y}h30l-14-30z`, '#FFFFFF', 2.5) + Lc(`M${x + 16} ${y}v-34`, INK, 2) + P(`M${x - 4} ${y}h38l-6 8h-26z`, '#E53935', 2.5)).join('')
      + P('M70 200c-4-40 30-60 60-56 30 4 40 30 34 56z', '#9E9E9E', 3) + P('M150 204c0-20 20-30 40-26 16 4 20 16 18 26z', '#BDBDBD', 3) + Lc('M90 170c10-6 30-6 40 0', '#BDBDBD', 2.5)
      + C(118, 148, 4, '#FFC107', 2) + face(116, 178, 0.42)
      + [[40, 220], [214, 222]].map(([x, y]) => E(x, y, 12, 7, '#8D6E63', 2) + C(x + 10, y - 8, 6, '#2E7D32', 2) + P(`M${x + 15} ${y - 8}l6 2-6 2z`, '#FFB300', 1.5)).join('') + R(-4, 232, 248, 12, '#E0E0E0', 0, 3)),
  L('ch/geneva/landmark-ariana.v1.svg', 'พิพิธภัณฑ์เครื่องเคลือบอาริอานาใต้โดม', 'The Ariana Museum of ceramics and glass under its dome', ['musee ariana', 'พิพิธภัณฑ์อาริอานา', 'ceramics museum', 'พิพิธภัณฑ์เครื่องเคลือบ', 'porcelain', 'เครื่องลายคราม', 'glass museum', 'พิพิธภัณฑ์แก้ว', 'blue and white vase', 'ariana park'], 'หาแจกันลายครามสีน้ำเงินขาว', 'Find the blue-and-white vase',
    // a pale ornate museum with a central dome and two wings of arched windows on a lawn, a giant blue-and-white painted vase and a teacup in front as if they had walked out of the museum
    sky('#E8EAF6') + R(-4, 160, 248, 84, '#AED581', 0, 3) + R(20, 90, 200, 70, '#FFF8E1', 0, 3) + Array.from({ length: 8 }, (_, k) => P(`M${30 + k * 24} 140v-26c0-10 12-10 12 0v26z`, '#81D4FA', 2)).join('')
      + R(90, 70, 60, 90, '#FFF3E0', 0, 3) + P('M86 72c0-44 68-44 68 0z', '#90A4AE', 3) + Lc('M96 70c0-28 48-28 48 0', '#B0BEC5', 2) + C(120, 30, 6, '#FFC107', 2.5) + P('M106 160v-34c0-14 28-14 28 0v34z', '#81D4FA', 2.5)
      + g(60, 200, 1, P('M-14-40h28c-4 8-4 12 6 22 10 14 6 40-6 48h-28c-12-8-16-34-6-48 10-10 10-14 6-22z', '#FFFFFF', 3) + P('M-12-6c6 6 18 6 24 0M-14 10c8 6 20 6 28 0', 'none', 2) + Lc('M-12-6c6 6 18 6 24 0', '#1E88E5', 4) + Lc('M-14 14c8 6 20 6 28 0', '#1E88E5', 4) + C(0, 2, 5, '#1E88E5', 1.5) + face(0, -22, 0.24))
      + g(176, 210, 1, P('M-22-20h44c0 22-10 30-22 30s-22-8-22-30z', '#FFFFFF', 3) + P('M22-14c12 0 12 16-2 16', 'none', 3) + Lc('M-16-10c8 4 24 4 32 0', '#1E88E5', 3) + E(0, 12, 30, 6, '#FFFFFF', 2.5))),
  L('ch/geneva/landmark-escaliers.v1.svg', 'บันไดไม้มีหลังคาเอสกาลิเยดูมาร์เชที่โลซาน', 'The covered wooden Market Stairs in Lausanne', ['escaliers du marche', 'บันไดตลาดโลซาน', 'covered staircase', 'บันไดมีหลังคา', 'lausanne old town', 'เมืองเก่าโลซาน', 'wooden stairs', 'บันไดไม้', 'cite hill', 'steep lausanne'], 'หาหลังคาไม้ที่คลุมบันไดยาว', 'Find the wooden roof covering the long staircase',
    // a long flight of worn stone and wooden steps climbing steeply up a hill under a narrow wooden roof on posts, old houses with shutters along one side, a cathedral tower peeking at the top, kids climbing
    sky('#E3F2FD') + R(176, 10, 34, 50, '#E0D2B4', 0, 3) + P('M172 12l21-18 21 18z', '#78909C', 3)
      + R(-4, 30, 70, 214, '#FFE0B2', 0, 3) + [[10, 60], [36, 60], [10, 120], [36, 120], [10, 180], [36, 180]].map(([x, y]) => R(x, y, 16, 22, '#81D4FA', 1, 2) + R(x - 6, y, 5, 22, '#43A047', 0, 1.5) + R(x + 17, y, 5, 22, '#43A047', 0, 1.5)).join('')
      + P('M66 240L210 70v20L66 244z', '#BCAAA4', 3) + Array.from({ length: 12 }, (_, k) => Lc(`M${70 + k * 12} ${238 - k * 14}h12v-6`, '#8D6E63', 2.5)).join('')
      + P('M60 190L200 34l14 8L74 200z', '#A1673F', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${70 + k * 24} ${196 - k * 27}v${36}`, '#6D4C41', 4)).join('') + Lc('M60 190L200 34', '#8D5A2B', 3)
      + face(144, 120, 0.3) + kid(112, 186, '#EF5350', 0.85) + kid(146, 150, '#FFCA28', 0.85) + R(220, 120, 24, 124, '#FFCCBC', 0, 3)),
  L('ch/geneva/landmark-malakoff.v1.svg', 'มาลาคอฟ ลูกชีสทอดของแคว้นโว', 'Malakoffs, the golden fried cheese puffs of Vaud', ['malakoff', 'มาลาคอฟ', 'fried cheese', 'ชีสทอด', 'cheese fritters', 'ชีสชุบแป้งทอด', 'vaud', 'แคว้นโว', 'lake geneva shore', 'gherkins'], 'หามาลาคอฟลูกที่ชีสยืดออกมา', 'Find the cheese puff with cheese stretching out',
    // three tall puffy golden domes of fried cheese each sitting on a round slice of bread on a plate, one broken open with melted cheese stretching out in strings, little pickled gherkins and onions beside them
    plate() + [[72, 156], [120, 146], [168, 160]].map(([x, y], k) => g(x, y, 1, E(0, 14, 26, 8, '#F3D9A4', 2.5) + P('M-22 12c-6-30 6-46 22-46s28 16 22 46z', '#E2A04A', 3) + E(-6, -18, 8, 5, '#F2C27B', 0)
      + (k === 2 ? P('M10-10c14-4 24 4 26 14', 'none', 4) + Lc('M10-10c14-4 24 4 26 14', '#FFF59D', 3) + P('M6-14c6 0 10 6 10 14l-8 4z', '#FFF59D', 2) : '') + (k === 1 ? face(0, -6, 0.32) : ''))).join('')
      + [[40, 196, '#7CB342'], [56, 206, '#8BC34A'], [196, 200, '#FAFAFA'], [210, 190, '#FAFAFA']].map(([x, y, c]) => E(x, y, c === '#FAFAFA' ? 6 : 12, 6, c, 2)).join('')),

  // ---------- Luxembourg
  K('lu', 'food', 'traipen', 'ไทรเพิน ไส้กรอกเลือดกับซอสแอปเปิล', 'Träipen, black pudding with apple sauce', ['traipen', 'ไทรเพิน', 'black pudding', 'ไส้กรอกเลือด', 'apple sauce', 'ซอสแอปเปิล', 'christmas eve dish', 'อาหารคืนคริสต์มาส', 'mashed potato', 'luxembourg winter food'],
    // two round crispy slices of dark black pudding on a plate beside a fluffy mound of mashed potato and a heap of pale apple sauce, a whole apple behind, a happy face on the mash
    plate('#FFFFFF', '#FFF8E1') + [[76, 164], [112, 176]].map(([x, y]) => E(x, y, 24, 18, '#3E2723', 3) + E(x, y - 2, 18, 12, '#5D4037', 0) + Array.from({ length: 4 }, (_, k) => C(x - 8 + k * 5, y - 2 + (k % 2) * 4, 1.5, '#FFF3E0', 0)).join('')).join('')
      + P('M126 168c-6-30 20-40 34-36 18 4 28 20 24 36z', '#FFF8DC', 3) + Lc('M140 146c6-4 14-4 20 0', '#F3E5AB', 2.5) + face(156, 156, 0.36)
      + P('M168 180c-4-14 10-18 24-14 12 4 14 14 10 18z', '#F0E2A8', 3) + Lc('M176 176c6-4 14-4 18 0', '#E3CF7A', 2)
      + g(176, 98, 1, C(0, 0, 22, '#E53935', 3) + Lc('M0-22l2-10', '#6D4C41', 3) + P('M2-28c8-8 18-6 18 0-8 4-14 4-18 0z', '#7CB342', 2) + E(-8, -6, 5, 7, '#EF9A9A', 0))),
  K('lu', 'transport', 'minetrain', 'รถไฟเหมืองแร่จิ๋วที่ฟง-เดอ-กรา', 'The little mine train at Fond-de-Gras', ['fond-de-gras', 'ฟง-เดอ-กรา', 'minieresbunn', 'รถไฟเหมือง', 'mine train', 'รถไฟเหมืองแร่', 'iron ore', 'แร่เหล็ก', 'red rock tunnel', 'mining museum'],
    // a tiny green mine locomotive pulling open wagons full of kids in hard hats out of a tunnel in a reddish rocky hillside, rusty-red stones in the last wagon, a narrow track through the woods
    sky('#E8F5E9') + P('M-4 150c20-90 100-130 160-110s90 60 88 110z', '#C1673E', 3) + Lc('M30 110c20-6 30 4 50-4M120 70c20 0 30 10 50 4', '#A14E2A', 3) + Array.from({ length: 4 }, (_, k) => C(20 + k * 60, 54 + (k % 2) * 10, 16, '#43A047', 2.5)).join('')
      + P('M150 160v-46c0-26 50-26 50 0v46z', '#3E2723', 3) + P('M144 160v-46c0-34 62-34 62 0v46', 'none', 6) + R(-4, 160, 248, 84, '#A5D6A7', 0, 3)
      + Lc('M-4 200h248M-4 212h248', '#6D4C41', 3) + Array.from({ length: 12 }, (_, k) => Lc(`M${4 + k * 22} 196v20`, '#8D6E63', 4)).join('')
      + g(150, 184, 1, R(-30, -36, 50, 30, '#2E7D32', 4, 3) + R(-10, -52, 22, 18, '#2E7D32', 3, 3) + R(-6, -48, 14, 10, '#B3E5FC', 2, 2) + C(-22, -2, 9, '#424242', 2.5) + C(8, -2, 9, '#424242', 2.5) + C(-30, -24, 5, '#FFEB3B', 2) + face(-6, -22, 0.3))
      + [[86, '#FFB300'], [30, '#1E88E5']].map(([x, c], k) => R(x - 26, 154, 48, 26, '#8D6E63', 2, 3) + C(x - 14, 184, 7, '#424242', 2) + C(x + 10, 184, 7, '#424242', 2) + (k === 1 ? [0, 1, 2].map((j) => C(x - 14 + j * 12, 150, 7, '#C1673E', 2)).join('') : kid(x - 4, 156, c, 0.8) + P(`M${x - 12} ${136}c0-8 16-8 16 0z`, '#FFEB3B', 2))).join('')
      + Lc('M58 166h20M112 166h10', INK, 3)),
  K('lu', 'culture', 'genet', 'เทศกาลดอกบรูมสีเหลืองที่วิลทซ์', 'The Broom Flower Festival in Wiltz', ['genzefest', 'เทศกาลดอกบรูม', 'broom flowers', 'ดอกบรูมสีเหลือง', 'wiltz', 'วิลทซ์', 'flower parade', 'ขบวนดอกไม้', 'ardennes spring', 'whit monday'],
    // hillsides covered in bright yellow broom bushes, a little parade float shaped like a giant flower basket covered in yellow blossoms, a girl in a flower crown on top waving, kids carrying yellow garlands
    sky('#FFFDE7') + P('M-4 120c40-40 90-50 130-30s90-20 118 0v40H-4z', '#9CCC65', 3) + Array.from({ length: 12 }, (_, k) => E(10 + k * 20, 104 - Math.sin(k / 11 * Math.PI) * 16, 10, 8, '#FDD835', 2)).join('')
      + R(-4, 130, 248, 114, '#C5E1A5', 0, 3) + R(-4, 190, 248, 54, '#BDBDBD', 0, 3)
      + P('M60 190l-10-50h140l-10 50z', '#FFEB3B', 3) + Array.from({ length: 14 }, (_, k) => C(60 + (k % 7) * 20, 150 + Math.floor(k / 7) * 18, 7, k % 2 ? '#FDD835' : '#FFF176', 1.5)).join('') + P('M50 140c20-30 120-30 140 0', 'none', 6) + Lc('M50 140c20-30 120-30 140 0', '#7CB342', 4)
      + [[80, 204], [160, 204]].map(([x, y]) => C(x, y, 12, '#424242', 3) + C(x, y, 4, '#BDBDBD', 0)).join('') + face(120, 170, 0.34)
      + g(120, 136, 1, C(0, -24, 10, '#FFE0BD', 2.5) + P('M-12-12h24l6 26h-36z', '#FFFFFF', 2.5) + [-8, 0, 8].map((x) => C(x, -34, 4, '#FDD835', 1.5)).join('') + Lc('M12-8l12-14', '#FFE0BD', 5) + face(0, -22, 0.24))
      + [[24, 228], [214, 230]].map(([x, y]) => kid(x, y, '#EF5350', 1) + Lc(`M${x - 14} ${y - 12}c8 8 20 8 28 0`, '#FDD835', 5)).join('')),
  K('lu', 'animal', 'wildcat', 'แมวป่ายุโรปในป่าอาร์เดน', 'A European wildcat in the Ardennes forest', ['wildcat', 'แมวป่า', 'european wildcat', 'แมวป่ายุโรป', 'ardennes forest', 'ป่าอาร์เดน', 'bushy striped tail', 'หางลายปล้องหนา', 'shy forest animal', 'oesling'],
    // a stocky grey-brown wildcat with faint tabby stripes and a very thick bushy tail ringed with black bands ending in a blunt black tip, sitting on a mossy log among ferns, a few beech leaves falling
    E(120, 200, 100, 14, '#A5D6A7', 0) + R(30, 180, 180, 26, '#8D6E63', 12, 3) + E(206, 193, 6, 12, '#BCAAA4', 2.5) + Lc('M50 186c30-4 60 2 90-2', '#6D4C41', 2) + P('M40 180c10-8 30-8 40 0z', '#7CB342', 2)
      + P('M150 178c30 4 60-10 60-40 0-20-14-30-24-24 8 10 6 30-14 40-10 6-20 6-28 8z', '#9E8E7E', 3) + [176, 190, 202].map((x, k) => Lc(`M${x} ${172 - k * 14}l8 ${4 + k * 2}`, INK, 4)).join('') + P('M196 118c6-4 14-2 14 6l-6 6z', INK, 2)
      + P('M80 178c-10-40 4-80 40-80s50 40 40 80z', '#A1887F', 3) + Lc('M96 120l8 10M136 120l-8 10M90 150h14M146 150h-14', '#6D4C41', 3)
      + C(120, 76, 30, '#A1887F', 3) + P('M94 58l-4-26 20 14zM146 58l4-26-20 14z', '#A1887F', 3) + P('M96 52l-2-12 8 6zM144 52l2-12-8 6z', '#F8BBD0', 0)
      + Lc('M110 54l4 10M130 54l-4 10M120 50v10', '#6D4C41', 2.5) + face(120, 78, 0.6, 'w') + Lc('M90 84h-16M90 90h-16M150 84h16M150 90h16', INK, 1.5)
      + [[30, 60], [210, 40], [50, 120]].map(([x, y]) => P(`M${x} ${y}c6-8 14-6 14 2-6 6-12 4-14-2z`, '#FFB300', 2)).join('')),

  // ---------- Luxembourg City and Vianden
  L('lu/luxembourg/landmark-corniche.v1.svg', 'ทางเดินกอร์นิชริมกำแพงเมือง ระเบียงที่สวยที่สุดในยุโรป', 'The Chemin de la Corniche along the old city wall', ['chemin de la corniche', 'ทางเดินกอร์นิช', 'most beautiful balcony', 'ระเบียงที่สวยที่สุด', 'city wall walk', 'เดินบนกำแพงเมือง', 'view over the grund', 'วิวย่านกรุนด์', 'alzette valley', 'old ramparts'], 'หาเด็กที่ชะโงกดูหมู่บ้านข้างล่าง', 'Find the child peering down at the village below',
    // a cobbled walkway with an iron railing running along the top of a tall old stone wall, tall houses with slate roofs on the inner side, a deep green valley far below with a tiny river and little roofs, kids leaning over the railing
    sky('#E3F2FD') + R(140, 20, 104, 120, '#FFF8E1', 0, 3) + [150, 184, 216].map((x) => R(x, 50, 18, 24, '#81D4FA', 2, 2) + R(x, 92, 18, 24, '#81D4FA', 2, 2)).join('') + P('M136 22l54-18 54 18z', '#546E7A', 3)
      + P('M-4 150c20-20 60-10 80-30 20 10 40 4 60 0v124H-4z', '#81C784', 3) + Lc('M-4 200c30-10 60 4 90-10s40 10 50 0', '#4FC3F7', 6)
      + Array.from({ length: 5 }, (_, k) => R(4 + k * 26, 170 + (k % 2) * 10, 20, 14, '#FFF3E0', 0, 2) + P(`M${2 + k * 26} ${170 + (k % 2) * 10}l12-8 12 8z`, '#607D8B', 2)).join('')
      + P('M136 140h108v104h-90z', '#D7CCC8', 3) + Array.from({ length: 5 }, (_, k) => Lc(`M${140 + k * 4} ${156 + k * 18}h${100 - k * 4}`, '#BCAAA4', 2)).join('')
      + R(136, 132, 108, 10, '#BDBDBD', 0, 3) + Lc('M136 108h108', '#424242', 3) + Array.from({ length: 10 }, (_, k) => Lc(`M${140 + k * 11} 108v24`, '#424242', 2)).join('')
      + kid(160, 132, '#EF5350', 1) + kid(196, 132, '#7E57C2', 1) + face(190, 186, 0.36)),
  L('lu/luxembourg/landmark-bourscheid.v1.svg', 'ซากปราสาทบูร์ไชด์บนเนินเหนือแม่น้ำซือร์', 'Bourscheid Castle ruins above a loop of the River Sûre', ['bourscheid castle', 'ปราสาทบูร์ไชด์', 'castle ruins', 'ซากปราสาท', 'river sure', 'แม่น้ำซือร์', 'oesling hills', 'เนินเขาเอิสลิง', 'medieval castle', 'river loop'], 'หาหอคอยสูงที่ยังเหลืออยู่', 'Find the tall tower still standing',
    // the jagged broken walls and tall square keep of a ruined castle on top of a round wooded hill, the river curling in a horseshoe loop around the foot of the hill, a little footbridge and campers' tents by the water
    sky('#FFF8E1') + P('M-4 120c40-10 70-60 124-60s90 50 128 60v124H-4z', '#7CB342', 3) + Array.from({ length: 9 }, (_, k) => C(10 + k * 28, 128 - Math.sin(k / 8 * Math.PI) * 40, 12, '#558B2F', 2)).join('')
      + P('M60 70h120v20H60z', '#BCAAA4', 3) + P('M60 70v-14l10 6 8-10 10 8 6-10v20zM150 70l4-16 8 6 6-12 6 8 6-6v20z', '#BCAAA4', 3) + R(104, 20, 32, 70, '#BCAAA4', 0, 3) + P('M104 20h8v-8h8v8h8v-8h8v8', 'none', 3)
      + R(114, 40, 10, 14, '#5D4037', 4, 2) + [72, 160].map((x) => R(x, 76, 8, 10, '#5D4037', 3, 2)).join('') + face(120, 66, 0.3)
      + P('M-4 220c30-40 90-40 120-20s80 40 128-10v54H-4z', '#4FC3F7', 3) + P('M30 210c30-30 70-30 90-10s50 20 80 0', 'none', 2) + Lc('M90 206c10-6 20-6 30 0', '#E1F5FE', 3)
      + [[40, 176, '#FF7043'], [190, 182, '#42A5F5']].map(([x, y, c]) => P(`M${x - 14} ${y}l14-18 14 18z`, c, 2.5)).join('')),
  L('lu/luxembourg/landmark-spanishturret.v1.svg', 'ป้อมยามสเปนเล็กๆ บนกำแพงเมือง', 'A little Spanish Turret on the old city wall', ['spanish turret', 'ป้อมยามสเปน', 'tourelle espagnole', 'watchtower', 'หอสังเกตการณ์', 'wenzel wall', 'กำแพงเวนเซิล', 'fortress walk', 'เดินชมป้อม', 'pointy slate roof'], 'หาหน้าต่างช่องแคบบนป้อม', 'Find the narrow slit window in the turret',
    // a small round stone watchtower with a pointed slate cap and a little weathervane perched on the corner of a tall rock-and-stone wall, sticking out over the green valley, ivy creeping up, birds flying
    sky('#E1F5FE') + P('M-4 244V120l90-10 10 134z', '#BCAAA4', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M-4 ${130 + k * 20}h${92 + k * 1.5}`, '#A1887F', 2)).join('') + P('M86 110c20 30 30 80 40 134h118V160c-40 0-90-20-158-50z', '#81C784', 3)
      + P('M60 110c0-10 10-16 20-16h40c10 0 20 6 20 16l-6 20H66z', '#9E9E9E', 3) + R(68, 50, 64, 64, '#D7CCC8', 8, 3) + Lc('M68 72h64M68 92h64', '#BCAAA4', 2)
      + P('M60 54l40-46 40 46z', '#546E7A', 3) + Lc('M100 8v-6', INK, 2.5) + P('M100 2l12 4-12 4z', '#FFC107', 2) + R(96, 64, 8, 22, '#3E2723', 4, 2) + face(100, 98, 0.3)
      + Array.from({ length: 6 }, (_, k) => P(`M${20 + (k % 3) * 18} ${150 + Math.floor(k / 3) * 30}c6-6 12-6 12 0-4 4-8 4-12 0z`, '#43A047', 1.5)).join('')
      + [[170, 40], [196, 60]].map(([x, y]) => Lc(`M${x - 8} ${y}q4-6 8 0q4-6 8 0`, INK, 2.5)).join('')),
  L('lu/luxembourg/landmark-schengen.v1.svg', 'หมู่บ้านเชงเกนริมแม่น้ำโมเซล ที่สามประเทศมาพบกัน', 'Schengen on the Moselle, where three countries meet', ['schengen', 'เชงเกน', 'three countries', 'สามประเทศ', 'moselle river', 'แม่น้ำโมเซล', 'tripoint', 'จุดบรรจบสามประเทศ', 'open borders', 'european village'], 'หาเสาสามต้นที่ยืนเรียงกัน', 'Find the three steel pillars standing in a row',
    // a quiet riverside village with a little castle tower, three tall steel slabs standing side by side on the riverbank promenade, the Moselle river with a boat, and green hills on the far bank with neat rows of crops
    sky('#E3F2FD') + P('M-4 100c40-20 90-20 130-6s80 10 118-6v40H-4z', '#9CCC65', 3) + Array.from({ length: 8 }, (_, k) => Lc(`M${10 + k * 28} 112l10-16`, '#7CB342', 3)).join('')
      + water(126, '#4FC3F7') + g(60, 150, 0.8, P('M-40 0h80l-8 12h-64z', '#FFFFFF', 3) + R(-24, -12, 40, 12, '#E53935', 2, 2.5))
      + R(-4, 176, 248, 68, '#BCAAA4', 0, 3) + R(150, 80, 40, 96, '#FFF8E1', 0, 3) + P('M146 82l24-24 24 24z', '#5D4037', 3) + R(162, 100, 16, 22, '#81D4FA', 3, 2) + R(196, 120, 50, 56, '#FFE0B2', 0, 3) + P('M192 122l27-18 27 18z', '#607D8B', 3)
      + [70, 96, 122].map((x, k) => R(x - 8, 154 - k * 0, 16, 56, '#B0BEC5', 1, 3) + Lc(`M${x - 4} 162v40`, '#ECEFF1', 2)).join('') + face(96, 186, 0.28)
      + Array.from({ length: 12 }, (_, k) => C(20 + k * 4.5, 196 + Math.sin(k) * 4, 2.5, '#FFCA28', 1)).join('') + kid(36, 226, '#1E88E5', 1) + kid(150, 228, '#EC407A', 1)),
  L('lu/luxembourg/landmark-coque.v1.svg', 'ศูนย์กีฬาโคกหลังคารูปคลื่นที่เคียร์ชแบร์ก', 'D\'Coque, the sports centre with a wave-shaped roof in Kirchberg', ['d\'coque', 'ศูนย์กีฬาโคก', 'la coque', 'wave roof', 'หลังคารูปคลื่น', 'kirchberg', 'เคียร์ชแบร์ก', 'national sports centre', 'ศูนย์กีฬาแห่งชาติ', 'shell-shaped building'], 'หาหลังคาที่โค้งเหมือนเปลือกหอย', 'Find the roof curved like a seashell',
    // a long low glassy building under a huge silvery roof that swoops up and down like a shell or a wave, a big glass front, a plaza with kids playing ball and riding scooters, slim trees in a row
    sky('#E1F5FE') + R(-4, 170, 248, 74, '#E0E0E0', 0, 3) + Array.from({ length: 6 }, (_, k) => tree(14 + k * 44, 170, '#81C784', 10)).join('')
      + P('M10 150c20-80 60-110 110-110 40 0 80 30 110 110z', '#B0BEC5', 3) + Array.from({ length: 7 }, (_, k) => Lc(`M${30 + k * 28} 150c${4 - k}-${50 + Math.sin(k / 6 * Math.PI) * 40} ${10}-${60 + Math.sin(k / 6 * Math.PI) * 40} ${12}-${70}`, '#CFD8DC', 2)).join('')
      + P('M10 150c20-80 60-110 110-110 40 0 80 30 110 110', 'none', 3) + R(40, 130, 160, 30, '#81D4FA', 2, 3) + Array.from({ length: 7 }, (_, k) => Lc(`M${60 + k * 20} 130v30`, '#E1F5FE', 2)).join('')
      + face(120, 100, 0.4) + kid(60, 214, '#EF5350', 1) + C(84, 220, 7, '#FFCA28', 2) + kid(170, 212, '#26A69A', 1) + Lc('M176 214l12 6M180 222h12', INK, 3) + C(180, 226, 3, INK, 0) + C(194, 226, 3, INK, 0)),

  // ---------- Provence
  L('fr/provence/landmark-moustiers.v1.svg', 'ดาวทองแขวนโซ่ระหว่างหน้าผาเหนือมูสตีเย', 'The golden star hanging on a chain above Moustiers', ['moustiers-sainte-marie', 'มูสตีเย-แซ็งต์-มารี', 'golden star', 'ดาวทอง', 'star on a chain', 'ดาวแขวนโซ่', 'cliff village', 'หมู่บ้านหน้าผา', 'faience', 'verdon'], 'หาดาวสีทองที่ห้อยกลางอากาศ', 'Find the golden star hanging in the air',
    // two tall pale cliffs either side of a narrow gap, a long iron chain sagging between their tops with a shiny gold star hanging from the middle, a stone village with pink roofs tucked below and a little stream
    sky('#E1F5FE') + P('M-4 244V30c20-10 40-4 60 10 10 40 6 100 10 204z', '#E6D3B3', 3) + P('M244 244V40c-20-14-46-10-62 6-6 40-4 100-10 198z', '#E6D3B3', 3)
      + Lc('M20 60c20 10 30 40 30 80M220 70c-20 16-26 40-26 70', '#D4BE98', 3)
      + P('M54 44c30 50 104 50 130 0', 'none', 4) + Array.from({ length: 12 }, (_, k) => { const t = k / 11; const x = 54 + t * 130; const y = 44 + 4 * t * (1 - t) * 37; return E(x, y, 4, 2.5, 'none', 2); }).join('')
      + Lc('M118 82v14', INK, 2.5) + P('M118 92l6 14 15 1-11 10 4 15-14-8-14 8 4-15-11-10 15-1z', '#FFC107', 3) + face(118, 114, 0.26)
      + Array.from({ length: 6 }, (_, k) => R(64 + k * 20, 180 - (k % 2) * 12, 18, 24, ['#FFF3E0', '#FFE0B2', '#FFF8E1'][k % 3], 0, 2) + P(`M${62 + k * 20} ${180 - (k % 2) * 12}l11-8 11 8z`, '#E57373', 2)).join('')
      + Lc('M40 236c30-10 60 0 90-10s60 0 90-8', '#4FC3F7', 6)),
  L('fr/provence/landmark-bories.v1.svg', 'กระท่อมหินโบรีทรงรังผึ้งที่กอร์ด', 'The beehive-shaped stone huts of the Village des Bories', ['village des bories', 'หมู่บ้านโบรี', 'bories', 'กระท่อมหินโบรี', 'dry stone huts', 'กระท่อมหินเรียง', 'beehive huts', 'กระท่อมทรงรังผึ้ง', 'gordes', 'shepherds huts'], 'หาประตูเล็กๆ ของกระท่อมหิน', 'Find the tiny doorway of the stone hut',
    // two round domed huts built of flat grey stones stacked without mortar, like big beehives, with tiny dark doorways, a low dry-stone wall, little oak bushes and thyme, a kid peeking in
    sky('#FFF8E1') + R(-4, 160, 248, 84, '#E6D3A0', 0, 3)
      + [[80, 170, 60, 80], [176, 172, 40, 56]].map(([x, y, w, h]) => P(`M${x - w} ${y}c0-${h * 1.2} ${w * 2}-${h * 1.2} ${w * 2} 0z`, '#BDBDBD', 3)
        + Array.from({ length: 6 }, (_, k) => Lc(`M${x - w + k * w / 7} ${y - k * h / 6.5}h${2 * w - k * w / 3.5}`, '#9E9E9E', 2)).join('') + P(`M${x - 8} ${y}v-${h / 3}c0-8 16-8 16 0v${h / 3}z`, '#424242', 2.5)).join('') + face(80, 124, 0.45)
      + R(-4, 186, 248, 18, '#BDBDBD', 0, 3) + Array.from({ length: 12 }, (_, k) => Lc(`M${k * 21} 186v18`, '#9E9E9E', 2)).join('')
      + [[20, 150], [226, 148]].map(([x, y]) => C(x, y, 14, '#7CB342', 2.5)).join('') + Array.from({ length: 6 }, (_, k) => C(140 + k * 10, 222 + (k % 2) * 6, 3, '#CE93D8', 1)).join('') + kid(36, 228, '#EF5350', 1)),
  L('fr/provence/landmark-tropezienne.v1.svg', 'ทาร์ตโทรเปเซียน บริยอชไส้ครีมแห่งแซ็งโทรเป', 'Tarte tropézienne, the cream-filled brioche of Saint-Tropez', ['tarte tropezienne', 'ทาร์ตโทรเปเซียน', 'saint-tropez', 'แซ็งโทรเป', 'cream brioche', 'บริยอชไส้ครีม', 'pearl sugar', 'น้ำตาลเม็ด', 'riviera cake', 'cream cake'], 'หาชั้นครีมสีขาวหนาๆ ตรงกลาง', 'Find the thick layer of cream in the middle',
    // a big round flat brioche cut in half and filled with a thick layer of white cream, its top scattered with crunchy pearl sugar, a wedge cut out showing the cream, on a striped paper doily
    E(120, 180, 104, 30, '#FFFFFF', 3) + Array.from({ length: 10 }, (_, k) => R(28 + k * 18, 172, 8, 18, '#FFCDD2', 0, 0)).join('') + E(120, 180, 104, 30, 'none', 3)
      + P('M30 160c0 26 180 26 180 0v-14H30z', '#E2A04A', 3) + P('M30 146c0 14 180 14 180 0v-14H30z', '#FFFDF5', 3) + E(120, 118, 92, 26, '#E2A04A', 3) + E(120, 112, 80, 18, '#F2C27B', 0)
      + Array.from({ length: 20 }, (_, k) => R(52 + (k * 37) % 136, 104 + (k * 7) % 18, 6, 5, '#FFFFFF', 1.5, 1.5)).join('') + face(80, 150, 0.36)
      + P('M150 118l60-6v34l-60 8z', '#FFFFFF', 0) + P('M150 118l60-6', 'none', 3) + P('M150 120v40l60-4v-40z', '#FFFDF5', 3) + P('M150 120l60-6v12l-60 8z', '#E2A04A', 2.5) + P('M150 146l60-4v12l-60 6z', '#E2A04A', 2.5)),
  L('fr/provence/landmark-mucem.v1.svg', 'พิพิธภัณฑ์มูเซมลายตาข่ายหินที่มาร์แซย์', 'The lace-wrapped MuCEM museum in Marseille', ['mucem', 'มูเซม', 'museum of mediterranean civilisations', 'พิพิธภัณฑ์อารยธรรมเมดิเตอร์เรเนียน', 'lace concrete', 'ตาข่ายคอนกรีต', 'fort saint-jean', 'ป้อมแซ็งฌ็อง', 'footbridge', 'marseille harbour'], 'หาสะพานเดินบางๆ ที่ข้ามไปที่ป้อมเก่า', 'Find the thin footbridge over to the old fort',
    // a big square building wrapped in a dark lace-like net of curving concrete with holes letting light through, a long thin footbridge running from its roof to an old stone fort, the blue sea in front
    sky('#E1F5FE') + water(170, '#29B6F6') + R(20, 70, 120, 100, '#90A4AE', 0, 3)
      + Array.from({ length: 24 }, (_, k) => E(32 + (k % 6) * 19, 82 + Math.floor(k / 6) * 22, 7, 8, '#E1F5FE', 2)).join('') + R(20, 70, 120, 100, 'none', 0, 3) + face(80, 150, 0.34)
      + R(170, 90, 70, 80, '#E6D3B3', 0, 3) + P('M170 90h10v-8h10v8h10v-8h10v8h10v-8h10v8h10', 'none', 3) + R(200, 50, 24, 40, '#E6D3B3', 0, 3) + R(208, 66, 8, 12, '#5D4037', 3, 2)
      + Lc('M140 84h40', '#ECEFF1', 6) + Lc('M140 84h40', INK, 1.5) + Lc('M140 88h40', INK, 1.5) + kid(156, 84, '#FFCA28', 0.7)
      + g(60, 196, 0.7, P('M-40 0h80l-8 12h-64z', '#FFFFFF', 3) + Lc('M0 0v-40', INK, 2) + P('M2-36l26 30H2z', '#FFFFFF', 2.5))),
  L('fr/provence/landmark-maisoncarree.v1.svg', 'วิหารโรมันเมซงการ์เรที่นีม', 'The Maison Carrée, a Roman temple in Nîmes', ['maison carree', 'เมซงการ์เร', 'nimes', 'นีม', 'roman temple', 'วิหารโรมัน', 'columns', 'เสาหิน', 'roman provence', 'ancient building'], 'หาบันไดหน้าวิหารที่ขึ้นไปหาเสา', 'Find the steps leading up to the columns',
    // a neat rectangular stone temple standing on a high base, six tall columns with curly tops across its front porch under a triangular roof, a flight of steps, a sunny square with a palm-free row of plane trees and pigeons
    sky('#FFF8E1') + R(-4, 200, 248, 44, '#E0D2B4', 0, 3) + tree(16, 150, '#7CB342', 22) + tree(224, 150, '#7CB342', 22)
      + R(40, 150, 160, 30, '#F5E6C8', 0, 3) + Array.from({ length: 5 }, (_, k) => R(70 + k * 4, 180 + k * 4, 100 - k * 8, 4, '#E6D3B3', 0, 1.5)).join('')
      + P('M44 76l76-40 76 40z', '#F5E6C8', 3) + R(44, 76, 152, 12, '#EFE2C6', 0, 3) + P('M70 70l50-24 50 24z', 'none', 2)
      + Array.from({ length: 6 }, (_, k) => R(52 + k * 26, 88, 12, 62, '#FFF8E1', 0, 2.5) + P(`M${48 + k * 26} 92c0-6 6-6 6 0M${60 + k * 26} 92c0-6 6-6 6 0`, 'none', 2)).join('')
      + R(80, 100, 80, 50, '#E6D3B3', 0, 0) + Array.from({ length: 6 }, (_, k) => R(52 + k * 26, 88, 12, 62, '#FFF8E1', 0, 2.5)).join('') + face(120, 64, 0.32)
      + [[60, 220], [176, 226]].map(([x, y]) => E(x, y, 9, 6, '#B0BEC5', 2) + C(x + 8, y - 6, 4, '#B0BEC5', 2) + P(`M${x + 12} ${y - 6}l4 1-4 2z`, '#FFB300', 1)).join('')),
  L('fr/provence/landmark-carrieres.v1.svg', 'การ์ริแยร์เดลูมิแยร์ ภาพเรืองแสงในเหมืองหินเลโบ', 'The Carrières des Lumières, pictures of light in the Les Baux quarry', ['carrieres des lumieres', 'การ์ริแยร์เดลูมิแยร์', 'les baux-de-provence', 'เลโบเดอโพรวองซ์', 'light show', 'โชว์แสง', 'old quarry', 'เหมืองหินเก่า', 'art projected on walls', 'ภาพฉายบนผนังหิน'], 'หาดวงดาวที่วนเป็นก้นหอยบนผนังหิน', 'Find the swirling stars on the stone walls',
    // inside a vast old limestone quarry with huge square pillars, the walls and floor glowing with giant projected colours: a swirling starry sky, big sunflowers and blue waves, kids' dark silhouettes sitting on the floor watching
    sky('#1A237E') + R(-4, -4, 248, 248, '#283593', 0, 0) + [[-4, 60], [184, 60]].map(([x, w]) => R(x, -4, w, 248, '#3949AB', 0, 3)).join('')
      + R(56, -4, 128, 210, '#1E3A8A', 0, 3) + Array.from({ length: 3 }, (_, k) => P(`M${70 + k * 40} ${40 + (k % 2) * 20}c10-14 30-10 30 4s-20 18-24 6`, 'none', 4) + Lc(`M${70 + k * 40} ${40 + (k % 2) * 20}c10-14 30-10 30 4s-20 18-24 6`, '#FFEB3B', 3)).join('')
      + [[86, 30], [150, 50], [110, 90], [170, 20]].map(([x, y]) => C(x, y, 5, '#FFF59D', 1.5)).join('') + face(120, 140, 0.36)
      + [[20, 120], [210, 110]].map(([x, y]) => C(x, y, 16, '#FFB300', 2.5) + C(x, y, 7, '#6D4C41', 1.5) + Lc(`M${x} ${y + 16}v40`, '#7CB342', 4)).join('') + Lc('M-4 190c30-10 50 10 80 0s50 10 80 0 50 10 88 0', '#4FC3F7', 6)
      + R(-4, 206, 248, 38, '#5C6BC0', 0, 3) + Lc('M0 220c30-6 60 6 90 0s60 6 150 0', '#FFEB3B', 3)
      + [[70, 224], [100, 228], [150, 224]].map(([x, y]) => g(x, y, 1, C(0, -16, 8, '#0D1442', 0) + P('M-10-6c0-8 20-8 20 0v10h-20z', '#0D1442', 0))).join('')),

  // ---------- Chamonix and Annecy
  L('fr/alps/landmark-yvoire.v1.svg', 'หมู่บ้านยุคกลางอีวัวร์เต็มไปด้วยดอกไม้ริมทะเลสาบ', 'Yvoire, the medieval flower village on Lake Geneva', ['yvoire', 'อีวัวร์', 'medieval village', 'หมู่บ้านยุคกลาง', 'village of flowers', 'หมู่บ้านดอกไม้', 'lake geneva shore', 'ริมทะเลสาบเจนีวา', 'garden of five senses', 'stone gate'], 'หากระถางดอกไม้ที่ห้อยจากประตูหิน', 'Find the flower baskets hanging from the stone gate',
    // a chunky stone town gate with a pointed arch and a little tower, covered in hanging baskets and window boxes overflowing with red geraniums and purple petunias, a cobbled lane through it leading to a blue lake with a sail
    sky('#E1F5FE') + water(150, '#4FC3F7') + P('M180 150h40l-20-36z', '#FFFFFF', 2.5) + Lc('M200 150v-40', INK, 2)
      + R(30, 50, 140, 150, '#D7CCC8', 0, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M30 ${70 + k * 22}h140`, '#BCAAA4', 2)).join('') + R(70, 14, 60, 40, '#D7CCC8', 0, 3) + P('M66 16l34-20 34 20z', '#8D6E63', 3)
      + P('M70 200v-70c0-34 60-34 60 0v70z', '#E1F5FE', 3) + P('M86 200l6-50h16l6 50z', '#BDBDBD', 2)
      + [[50, 80], [150, 80], [50, 130], [150, 130], [100, 46]].map(([x, y]) => R(x - 16, y, 32, 10, '#8D6E63', 2, 2) + [[-10, '#E53935'], [0, '#AB47BC'], [10, '#E53935']].map(([dx, c]) => C(x + dx, y - 2, 6, c, 1.5)).join('') + Lc(`M${x - 8} ${y + 10}c0 8 4 10 2 16M${x + 8} ${y + 10}c0 8-4 10-2 16`, '#43A047', 3)).join('')
      + face(100, 120, 0.34) + R(-4, 200, 248, 44, '#BCAAA4', 0, 3) + Array.from({ length: 10 }, (_, k) => E(10 + k * 24, 214 + (k % 2) * 12, 8, 5, '#D7CCC8', 1.5)).join('') + kid(110, 222, '#26A69A', 1)),
  L('fr/alps/landmark-rissoles.v1.svg', 'ริสโซลซาวัว ขนมพายไส้ลูกแพร์รูปพระจันทร์ครึ่งดวง', 'Rissoles savoyardes, half-moon pear pastries', ['rissoles', 'ริสโซล', 'rissoles savoyardes', 'pear turnover', 'พายไส้ลูกแพร์', 'savoy pastry', 'ขนมซาวัว', 'half-moon pastry', 'ขนมรูปพระจันทร์ครึ่งดวง', 'christmas in savoy'], 'หาไส้ลูกแพร์ที่โผล่ออกมาจากรอยกัด', 'Find the pear filling peeping out of the bite',
    // three golden half-moon pastries with pinched crinkly edges on a wooden board, one with a bite out of it showing the soft pear filling, a ripe yellow pear and a pear slice beside them
    R(14, 150, 212, 42, '#C6974F', 14, 3) + C(30, 170, 4, '#8D6E63', 0)
      + [[70, 150, -10], [140, 160, 8], [100, 122, 0]].map(([x, y, r], k) => g(x, y, 1, P('M-36 8c0-30 18-44 36-44s36 14 36 44z', '#E2A04A', 3) + Array.from({ length: 9 }, (_, j) => C(-32 + j * 8, 8, 3.5, '#C98A3C', 1.5)).join('') + E(-8, -16, 10, 5, '#F2C27B', 0)
        + Lc('M-10-6l6-4M4-8l6 4', '#C98A3C', 2) + (k === 2 ? face(0, -6, 0.34) : '') + (k === 1 ? P('M20-24c8 4 12 12 14 22-8 0-12-4-14-10-4 0-6-6 0-12z', '#FFF59D', 2.5) : ''), r)).join('')
      + g(200, 100, 1, P('M0-30c-8 0-10 12-10 20-10 8-12 20-8 30 6 12 30 12 36 0 4-10 2-22-8-30 0-8-2-20-10-20z', '#D4E157', 3) + Lc('M0-30l2-10', '#6D4C41', 3) + P('M2-36c6-8 16-6 16 0-6 4-12 2-16 0z', '#7CB342', 2))),
  L('fr/alps/landmark-avoriaz.v1.svg', 'อาวอเรียซ เมืองสกีไม่มีรถที่ตึกไม้ดูเหมือนหิน', 'Avoriaz, the car-free ski village of wooden rock-like towers', ['avoriaz', 'อาวอเรียซ', 'car-free ski resort', 'เมืองสกีไม่มีรถ', 'wooden towers', 'ตึกไม้', 'portes du soleil', 'ปอร์ตดูโซเลย', 'ski in ski out', 'snow village'], 'หาเด็กที่สกีลงมาถึงหน้าประตูตึก', 'Find the child skiing right up to the building\'s door',
    // jagged tall buildings clad in brown wooden shingles with sharp sloping roofs piled up on a snowy cliff edge like a group of rocks, snow on every ledge, a snowy street with kids on skis and no cars
    sky('#E1F5FE') + P('M-4 200c40-20 90-20 130-10s80 10 118 0v54H-4z', '#FAFAFA', 3)
      + [[30, 80, 50, 120], [90, 50, 60, 150], [160, 70, 54, 130], [206, 100, 40, 100]].map(([x, y, w, h]) => P(`M${x} ${y + h}V${y + 20}l${w * 0.6}-${30}l${w * 0.4} ${40}V${y + h}z`, '#8D6E63', 3)
        + Array.from({ length: Math.floor(h / 16) }, (_, k) => Lc(`M${x} ${y + 30 + k * 16}h${w}`, '#6D4C41', 2)).join('') + P(`M${x} ${y + 20}l${w * 0.6}-30l${w * 0.4} 40`, 'none', 7) + Lc(`M${x} ${y + 20}l${w * 0.6}-30l${w * 0.4} 40`, '#FFFFFF', 5)
        + Array.from({ length: 3 }, (_, k) => R(x + 8 + k * (w / 3.4), y + 50 + (k % 2) * 30, 10, 12, '#FFE082', 1, 2)).join('')).join('') + face(120, 140, 0.4)
      + [[60, 220, '#EF5350'], [170, 226, '#7E57C2']].map(([x, y, c]) => kid(x, y, c, 1) + Lc(`M${x - 18} ${y + 6}l36-4`, '#1E88E5', 4)).join('')
      + Array.from({ length: 8 }, (_, k) => C((k * 37) % 230 + 6, (k * 23) % 40 + 10, 3, '#FFFFFF', 1.5)).join('')),
  L('fr/alps/landmark-bellfoundry.v1.svg', 'โรงหล่อระฆังที่อานซี', 'The bell foundry of Annecy', ['bell foundry', 'โรงหล่อระฆัง', 'fonderie paccard', 'โรงหล่อปาการ์', 'bronze bells', 'ระฆังทองสัมฤทธิ์', 'casting a bell', 'หล่อระฆัง', 'bell museum', 'carillon bells'], 'หาระฆังใบเล็กที่สุด', 'Find the smallest bell',
    // inside a workshop: a huge shiny bronze bell hanging from a chain and a wooden beam, a row of smaller bells lined up by size on the floor, a glowing ladle of molten metal pouring into a mould, a kid tapping a bell with a little hammer
    sky('#FFF3E0') + R(-4, 200, 248, 44, '#8D6E63', 0, 3) + R(10, 16, 220, 12, '#6D4C41', 0, 3) + Lc('M110 28v26', '#757575', 4)
      + P('M80 140c0-50 10-86 30-86s30 36 30 86h10v10h-80v-10z', '#D4A537', 3) + P('M92 130c0-40 8-66 18-66', 'none', 4) + Lc('M92 130c0-40 8-66 18-66', '#F5D76E', 4) + Lc('M76 150h68', '#B8860B', 3) + C(110, 156, 8, '#B8860B', 2.5) + face(110, 104, 0.42)
      + [[30, 200, 22], [64, 200, 16], [176, 200, 18], [206, 200, 12]].map(([x, y, s]) => P(`M${x - s * 0.7} ${y}c0-${s * 1.2} ${s * 0.2}-${s * 1.6} ${s * 0.7}-${s * 1.6}s${s * 0.7} ${s * 0.4} ${s * 0.7} ${s * 1.6}h${s * 0.2}v4h-${s * 1.8}v-4z`, '#E0B44C', 2.5)).join('')
      + g(184, 120, 1, P('M-16-10h32l-6 20h-20z', '#616161', 3) + Lc('M16-6l24-10', '#757575', 4) + Lc('M-2 10c-2 12 2 18 0 30', '#FF7043', 5) + C(-2, 44, 8, '#FFB74D', 2))
      + g(146, 226, 1, kid(0, 0, '#1E88E5', 1) + Lc('M8-14l14-10', '#8D6E63', 3) + R(18, -30, 10, 7, '#9E9E9E', 1.5, 1.5))),
  L('fr/alps/landmark-dahu.v1.svg', 'ตัวดาฮูในตำนาน สัตว์ขาสั้นข้างเดียวบนเนินเขาซาวัว', 'The dahu, the Savoy legend animal with shorter legs on one side', ['dahu', 'ดาฮู', 'mountain legend', 'ตำนานภูเขา', 'savoy folklore', 'นิทานพื้นบ้านซาวัว', 'dahu hunt', 'ล่าตัวดาฮู', 'animal on the slope', 'joke for children'], 'หาขาข้างที่สั้นกว่าของตัวดาฮู', 'Find the dahu\'s shorter legs on one side',
    // a round woolly goat-like creature with small curly horns standing happily sideways on a steep grassy slope, its two uphill legs clearly shorter than its two downhill legs so it stands level, wildflowers, peaks behind, a grinning kid with a sack
    sky('#E3F2FD') + P('M-4 90l50-50 30 24 40-40 40 40 30-20 58 46z', '#B0BEC5', 3) + P('M112 40l6-8 8 10-6-2z', '#FFFFFF', 0)
      + P('M-4 220L244 90v154H-4z', '#9CCC65', 3) + Array.from({ length: 8 }, (_, k) => C(14 + k * 30, 222 - k * 16 + 14, 4, ['#FFEB3B', '#E91E63', '#FFFFFF'][k % 3], 1.5)).join('')
      + g(120, 128, 1, Lc('M-24 20l-2 46M-8 22l0 38', '#6D4C41', 7) + Lc('M14 18v26M28 14v22', '#6D4C41', 7)
        + E(0, 6, 44, 26, '#EFEBE9', 3) + Array.from({ length: 6 }, (_, k) => C(-30 + k * 12, -14 + (k % 2) * 4, 9, '#EFEBE9', 0)).join('') + E(0, 6, 44, 26, 'none', 3)
        + C(44, -14, 18, '#D7CCC8', 3) + P('M36-30c-6-12 4-18 8-8M52-30c6-12-4-18-8-8', 'none', 4) + Lc('M36-30c-6-12 4-18 8-8M52-30c6-12-4-18-8-8', '#8D6E63', 3) + face(46, -14, 0.34) + P('M-44 0c-10 0-12-8-6-12', 'none', 4))
      + g(50, 200, 1, kid(0, 0, '#FF7043', 1.1) + P('M12-16h16v24h-16z', '#C6974F', 2.5) + Lc('M14-16l6-6 6 6', INK, 2))),

  // ---------- Lyon
  L('fr/lyon/landmark-perouges.v1.svg', 'กาแล็ตแห่งเปรูจ ขนมแป้งบางโรยน้ำตาลกับหมู่บ้านยุคกลาง', 'Galette de Pérouges, the sugar tart of the medieval village', ['galette de perouges', 'กาแล็ตเดอเปรูจ', 'perouges', 'เปรูจ', 'sugar tart', 'ทาร์ตน้ำตาล', 'medieval village', 'หมู่บ้านยุคกลาง', 'thin crispy galette', 'lemon zest'], 'หาขอบขนมที่กรอบเป็นสีน้ำตาล', 'Find the crispy browned edge of the tart',
    // a big round thin golden tart, its top crackled with caramelised sugar and butter, cut into wedges with one lifted, on a wooden board, the stone houses and cobbled lane of a hill village behind
    sky('#FFF8E1') + Array.from({ length: 5 }, (_, k) => R(-4 + k * 50, 40 + (k % 2) * 10, 46, 70, ['#E6D3B3', '#D7CCC8', '#E0C9A0'][k % 3], 0, 3) + P(`M${-6 + k * 50} ${40 + (k % 2) * 10}l25-14 25 14z`, '#A1887F', 3) + R(10 + k * 50, 66 + (k % 2) * 10, 14, 18, '#5D4037', 2, 2)).join('')
      + R(-4, 110, 248, 134, '#BCAAA4', 0, 3) + Array.from({ length: 8 }, (_, k) => E(16 + k * 30, 124, 10, 5, '#D7CCC8', 1.5)).join('')
      + R(14, 150, 212, 50, '#C6974F', 16, 3) + E(110, 170, 86, 28, '#C17A2B', 3) + E(110, 168, 76, 22, '#F2C27B', 0)
      + Array.from({ length: 12 }, (_, k) => C(50 + (k * 23) % 120, 160 + (k * 7) % 16, 3, '#FFF3C4', 0)).join('') + Lc('M110 168l-76 0M110 168l40-20M110 168l40 18', '#C98A3C', 2) + face(80, 172, 0.36)
      + g(196, 138, 1, P('M-24 10l40-26 12 22z', '#F2C27B', 3) + P('M-24 10l40-26', '#C17A2B', 4) + C(4, 0, 2.5, '#FFF3C4', 0)) + g(196, 120, 0.6, P('M0 0c8-8 20-4 20 4-10 6-16 4-20-4z', '#FFEB3B', 2))),
  L('fr/lyon/landmark-papillotes.v1.svg', 'ปาปิโยต ช็อกโกแลตห่อกระดาษพู่ของลียง', 'Papillotes, Lyon\'s fringed-paper Christmas chocolates', ['papillotes', 'ปาปิโยต', 'christmas chocolates', 'ช็อกโกแลตคริสต์มาส', 'fringed wrappers', 'กระดาษห่อมีพู่', 'riddle papers', 'กระดาษคำทาย', 'lyon sweets', 'shiny foil'], 'หาช็อกโกแลตที่แกะกระดาษออกแล้ว', 'Find the chocolate that has been unwrapped',
    // a glass bowl heaped with chocolates wrapped in shiny foil with long fringed paper ends twisted like sweets, in gold, red, blue and green, one unwrapped dark chocolate showing with a little folded paper slip beside it
    E(110, 190, 90, 18, '#B3E5FC', 3) + P('M24 130c0 50 40 66 86 66s86-16 86-66z', '#E1F5FE', 3)
      + [[60, 126, '#FFC107', -20], [100, 116, '#E53935', 10], [146, 124, '#1E88E5', -10], [80, 146, '#43A047', 15], [130, 148, '#AB47BC', -5], [110, 96, '#FF7043', 0]].map(([x, y, c, r], k) => g(x, y, 1, E(0, 0, 16, 11, c, 2.5) + E(-4, -4, 6, 3, '#FFFFFF', 0)
        + P('M-14 0l-20-12v24zM14 0l20-12v24z', c, 2.5) + Lc('M-28-8l-6-4M-28 8l-6 4M-28 0h-8M28-8l6-4M28 8l6 4M28 0h8', '#FFFFFF', 1.5) + (k === 5 ? face(0, -2, 0.24) : ''), r)).join('')
      + P('M24 130c0 50 40 66 86 66s86-16 86-66', 'none', 3)
      + g(206, 196, 1, R(-14, -10, 28, 20, '#4E342E', 4, 2.5) + Lc('M-8-4h16M-8 4h16', '#6D4C41', 1.5)) + g(206, 156, 1, R(-14, -8, 28, 16, '#FFFFFF', 1, 2) + Lc('M-8-2h16M-8 3h10', '#BDBDBD', 1.5), 12)),
  L('fr/lyon/landmark-tourcrayon.v1.svg', 'ตึกปาร์ดีเยอรูปดินสอของลียง', 'The Part-Dieu tower, Lyon\'s "pencil"', ['tour part-dieu', 'ตึกปาร์ดีเยอ', 'le crayon', 'ตึกดินสอ', 'pencil tower', 'part-dieu', 'ย่านปาร์ดีเยอ', 'skyscraper', 'ตึกระฟ้า'], 'หายอดตึกทรงพีระมิดเหมือนปลายดินสอ', 'Find the pyramid top like the tip of a pencil',
    // a tall round reddish-pink tower standing over the city like a pencil with a sharpened pointed top, a glass tower behind it, a train in the station at its foot, a giant pencil-style eraser band near the top
    sky('#E1F5FE') + R(150, 50, 40, 160, '#90CAF9', 0, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M150 ${70 + k * 24}h40`, '#E3F2FD', 2)).join('')
      + R(84, 50, 52, 170, '#E57373', 0, 3) + Array.from({ length: 12 }, (_, k) => Lc(`M84 ${64 + k * 13}h52`, '#EF9A9A', 2)).join('') + Lc('M100 50v170M120 50v170', '#C62828', 2)
      + R(82, 42, 56, 12, '#BDBDBD', 0, 3) + P('M84 42l26-34 26 34z', '#F5D9A8', 3) + P('M104 16l6-8 6 8z', INK, 2) + face(110, 100, 0.42)
      + Array.from({ length: 4 }, (_, k) => R(-4 + k * 22, 160 - (k % 2) * 16, 20, 60 + (k % 2) * 16, ['#FFE0B2', '#FFCCBC'][k % 2], 0, 2.5)).join('') + R(200, 150, 44, 70, '#FFF9C4', 0, 2.5)
      + R(-4, 220, 248, 24, '#9E9E9E', 0, 3) + R(20, 204, 200, 18, '#ECEFF1', 6, 3) + Array.from({ length: 8 }, (_, k) => R(28 + k * 24, 208, 14, 8, '#81D4FA', 2, 1.5)).join('') + Lc('M20 216h200', '#E53935', 3)),
];

export default { places: {}, items };
