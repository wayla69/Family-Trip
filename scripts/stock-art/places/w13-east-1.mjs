// Wave 13, Thailand (east) 1: Rayong and Koh Samet — the island named after its paperbark samet tree, the half-moon bay,
// Ban Phe's dried seafood, the strombus snails and the little mackerel baskets of the eastern coast (no fish sauce jars:
// Phú Quốc has them; no turtles, mermaid or statues of real people)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const RY = { k1: '#00838F', k2: '#EF6C00', k3: '#E0F7FA' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `th-rayong.landmark.${slug}`, cat: 'landmark', file: `th/rayong/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const shrimp = (x, y, r) => g(x, y, 1, P('M-9 0a9 9 0 1 1 9 9', 'none') + Lc('M-9 0a9 9 0 1 1 9 9', '#FF8A65', 7) + C(0, 9, 2, INK, 0), r);

const items = [
  { id: 'th-rayong.stamp', cat: 'stamp', file: 'th/rayong/stamp.v1.svg', name: nm('ตราประทับระยองและเกาะเสม็ด', 'Rayong and Koh Samet stamp'), kw: ['rayong', 'ระยอง', 'koh samet', 'เกาะเสม็ด', 'white sand', 'หาดทรายขาว', 'samet tree', 'ต้นเสม็ด', 'eastern seaboard', 'ภาคตะวันออก'],
    // a little island: a white crescent of sand round a turquoise bay, a paperbark samet tree leaning over it and the sun above
    svg: cityStamp('try-st', { name: 'RAYONG', sub: 'KOH SAMET', ...RY, emblem: C(124, 72, 13, '#FFD54F') + P('M50 108h100v40H50z', '#4DD0E1', 0) + P('M54 112c22 22 70 22 92 0 0 14-20 28-46 28s-46-14-46-28z', '#FFFDE7') + Lc('M66 126c20 8 48 8 68 0', '#B2EBF2', 3)
      + P('M78 120c-2-16 2-34 10-44h7c-5 12-8 28-7 44z', '#F5F0E6') + Lc('M84 110l5-3M86 96l5-3', '#BCAAA4', 2) + E(94, 70, 20, 10, '#7CB342') + E(76, 78, 13, 8, '#9CCC65') + [84, 96, 106].map((x) => C(x, 64, 3, '#FFF8E1', 2)).join('') }) },
  { id: 'th-rayong.day.saikaew', cat: 'day', file: 'th/rayong/day-saikaew.v1.svg', name: nm('หาดทรายแก้วบนเกาะเสม็ด', 'Hat Sai Kaew, the white beach of Koh Samet'), kw: ['hat sai kaew', 'หาดทรายแก้ว', 'koh samet', 'เกาะเสม็ด', 'white sand beach', 'หาดทรายขาว', 'turquoise sea', 'ทะเลใส', 'swimming', 'เล่นน้ำทะเล', 'rayong', 'ระยอง', 'island day'],
    // a wide beach of very white powdery sand, turquoise water with gentle waves, two striped beach umbrellas, samet trees on the left and a little island on the horizon
    svg: scene('try-d1', '#B3E5FC', C(186, 52, 18, '#FFE082', 0) + P('M140 104c10-14 30-16 44 0z', '#81C784') + P('M-4 104h248v50H-4z', '#26C6DA') + Lc('M20 118c14-6 26 6 40 0M110 124c14-6 26 6 40 0M170 112c12-6 22 6 34 0', '#E0F7FA', 4)
      + P('M-4 150c60-14 170-14 248 0v94H-4z', '#FFFDF5') + Lc('M30 176c6 2 10 0 14-2M150 196c6 2 10 0 14-2M90 214c6 2 10 0 14-2', '#E0E0E0', 3)
      + [[96, 0], [158, 1]].map(([x, k]) => Lc(`M${x} 196v-46`, INK, 4) + P(`M${x - 34} 156c8-28 60-28 68 0z`, k ? '#FF7043' : '#FFCA28') + P(`M${x - 12} 156c2-22 22-22 24 0`, '#FFFFFF', 3)).join('')
      + P('M10 170c4-30 2-60 10-80h8c-6 24-4 50-6 80z', '#F5F0E6') + E(28, 84, 30, 14, '#7CB342') + E(4, 98, 20, 10, '#9CCC65') + face(124, 186, 0.36)) },
  { id: 'th-rayong.day.maephim', cat: 'day', file: 'th/rayong/day-maephim.v1.svg', name: nm('ชายฝั่งแหลมแม่พิมพ์กับเกาะมันนอกฝั่ง', 'The Laem Mae Phim coast and the Koh Man islands'), kw: ['laem mae phim', 'แหลมแม่พิมพ์', 'koh man', 'หมู่เกาะมัน', 'rayong coast', 'ชายทะเลระยอง', 'hat mae ramphueng', 'หาดแม่รำพึง', 'beach road', 'ถนนเลียบชายหาด', 'rayong', 'ระยอง'],
    // a long curving beach at golden late afternoon, three small green islands in a row offshore, a fishing boat between them, coconut palms along the seaside road
    svg: scene('try-d2', '#FFE0B2', C(70, 60, 20, '#FFB74D', 0) + P('M-4 108h248v60H-4z', '#4FC3F7') + [[60, 108, 30], [120, 106, 20], [170, 108, 26]].map(([x, y, r]) => P(`M${x - r} ${y}c${r * 0.4}-${r} ${r * 1.6}-${r} ${r * 2} 0z`, '#66BB6A')).join('')
      + g(96, 126, 1, P('M-18 0h36l-6 8h-24z', '#E53935') + R(-3, -14, 4, 14, '#FFFFFF', 0, 2)) + Lc('M20 140c16-5 30 5 46 0M150 146c16-5 30 5 46 0', '#E1F5FE', 4)
      + P('M-4 170c80-26 170-30 248-20v94H-4z', '#FFE082') + P('M-4 206c80-20 170-22 248-14v52H-4z', '#BDBDBD') + Lc('M-4 222c80-18 170-20 248-12', '#FFFFFF', 3)
      + [[180, 196], [214, 190]].map(([x, y]) => Lc(`M${x} ${y}c-4-24-2-44 6-62`, '#8D6E63', 6) + P(`M${x + 6} ${y - 62}c-20-6-34 2-40 12 14-6 28-6 40-12zM${x + 6} ${y - 62}c18-10 34-6 40 4-14-4-28-4-40-4zM${x + 6} ${y - 62}c-6-16 0-28 12-32-6 10-8 22-12 32z`, '#43A047', 3)).join('') + face(70, 60, 0.42)) },

  L('samettree', 'ต้นเสม็ดเปลือกกระดาษ', 'The paperbark samet tree that named the island', ['samet tree', 'ต้นเสม็ด', 'paperbark tree', 'เปลือกไม้เป็นแผ่นบางๆ', 'cajeput', 'melaleuca', 'koh samet name', 'ชื่อเกาะเสม็ด', 'white bark', 'ดอกเสม็ด'], 'หาต้นไม้ที่เปลือกลอกเป็นแผ่นกระดาษสีขาว', 'Find the tree whose white bark peels off like paper',
    // a leaning tree with a thick creamy-white trunk peeling in curly papery strips, a crown of narrow grey-green leaves dotted with cream bottlebrush flowers
    E(120, 214, 70, 10, '#E8DCC0') + P('M94 212c8-40 2-84 22-124h28c-14 40-12 84-18 124z', '#F7F2E8') + P('M104 170c6-4 12-2 14 4-6 0-10 0-14-4zM112 128c6-4 12-2 14 4-6 0-10 0-14-4zM118 192c6-3 10 0 12 4-6 0-9-1-12-4z', '#D7CCC8', 3)
      + Lc('M110 150c4 8 4 16 0 24M124 104c4 8 4 16 0 24', '#BCAAA4', 3) + E(128, 70, 66, 34, '#8BAE7A') + E(80, 88, 34, 18, '#9CBF85') + E(176, 90, 30, 16, '#9CBF85')
      + [[90, 60], [130, 48], [164, 66], [110, 82], [150, 86], [70, 86], [186, 88]].map(([x, y]) => C(x - 4, y, 5, '#FFFDE7', 2) + C(x + 4, y - 3, 5, '#FFFDE7', 2) + C(x + 2, y + 4, 5, '#FFFDE7', 2)).join('') + face(118, 140, 0.4)),
  L('wongduean', 'อ่าววงเดือน', 'Ao Wong Duean, the half-moon bay', ['ao wong duean', 'อ่าววงเดือน', 'half-moon bay', 'อ่าวรูปพระจันทร์', 'crescent beach', 'หาดโค้ง', 'koh samet', 'เกาะเสม็ด', 'calm water', 'น้ำทะเลนิ่ง'], 'หาอ่าวที่โค้งเหมือนพระจันทร์ครึ่งดวง', 'Find the bay curved like a half moon',
    // seen from above: a bay curved like a half moon, a thin white crescent of sand ringed by green hills, calm blue water inside, and a smiling crescent moon in the sky above
    bg('#4FC3F7') + P('M16 60c40 0 64 30 70 74s30 70 80 76c20 2 40-4 58-14v28H16z', '#66BB6A', 0) + P('M30 74c40 6 60 36 64 70s28 62 70 66', 'none') + Lc('M30 70c40 6 64 38 66 72s30 62 72 66', '#FFFDE7', 12)
      + [[40, 120], [60, 170], [110, 206], [30, 190]].map(([x, y]) => C(x, y, 14, '#43A047', 3)).join('') + Lc('M120 90c14-4 26 4 40 0M140 130c14-4 26 4 40 0', '#B3E5FC', 4) + frame
      + P('M196 32a26 26 0 1 0 14 46 20 20 0 1 1-14-46z', '#FFE082') + C(190, 58, 2.5, INK, 0) + P('M184 66q4 3 8 0', 'none', 2.5) + g(150, 158, 1, P('M-12 0h24l-4 6h-16z', '#FFFFFF', 3) + R(-1, -10, 2, 10, INK, 0, 2)) + face(104, 160, 0.32)),
  L('aoprao', 'พระอาทิตย์ตกที่อ่าวพร้าว', 'Sunset at Ao Prao on the island’s west side', ['ao prao', 'อ่าวพร้าว', 'sunset beach', 'ชมพระอาทิตย์ตก', 'west coast of samet', 'ฝั่งตะวันตกของเกาะเสม็ด', 'golden sea', 'ทะเลสีทอง', 'koh samet', 'evening'], 'หาดวงอาทิตย์สีส้มที่กำลังจมลงทะเล', 'Find the orange sun sinking into the sea',
    // a big orange sun with a face half sunk into a golden sea between two dark rocky points, a coconut palm leaning in from the left, streaks of light on the water
    bg('#FFCC80') + P('M16 60h208v50H16z', '#FFAB91', 0) + C(120, 118, 40, '#FF7043') + P('M16 118h208v106H16z', '#FFB74D', 0) + Lc('M90 136h60M100 150h40M108 164h24', '#FFF3E0', 4) + Lc('M16 118h208', INK, 4)
      + P('M16 140c20-16 40-20 56-6 10 10 2 24-10 28-20 6-34 4-46 2z', '#6D4C41') + P('M224 132c-24-14-46-12-58 4-8 12 4 22 18 24 18 2 30 0 40-4z', '#5D4037') + frame
      + Lc('M40 210c4-40 20-80 50-110', '#8D6E63', 7) + P('M90 100c-24-4-40 6-46 18 16-8 30-10 46-18zM90 100c4-22 20-32 36-30-14 8-26 18-36 30zM90 100c22-8 40 0 46 10-14-4-30-8-46-10z', '#43A047', 3) + face(120, 104, 0.5)),
  L('laemya', 'แหลมหญ้า', 'Khao Laem Ya, the green headland', ['khao laem ya', 'เขาแหลมหญ้า', 'headland', 'แหลม', 'viewpoint', 'จุดชมวิว', 'national park', 'อุทยานแห่งชาติเขาแหลมหญ้า-หมู่เกาะเสม็ด', 'rocky point', 'โขดหิน'], 'หาภูเขาเขียวที่ยื่นลงไปในทะเลจนสุดที่ก้อนหิน', 'Find the green hill that runs down into the sea and ends in rocks',
    // a long green hill sloping into the sea and ending in a heap of grey boulders with waves splashing, a little wooden lookout deck with a railing on top, gulls overhead
    bg('#B3E5FC') + P('M16 150h208v74H16z', '#29B6F6', 0) + P('M16 150c30-60 70-80 110-70 30 8 50 30 66 60H16z', '#7CB342') + P('M30 130c20-30 50-44 80-40', '#9CCC65', 3)
      + [[176, 150, 16], [198, 156, 12], [160, 160, 11], [214, 164, 8]].map(([x, y, r]) => E(x, y, r, r * 0.8, '#B0BEC5', 3)).join('') + Lc('M150 172c10-6 18 4 28 0M184 176c8-6 16 4 24 0', '#FFFFFF', 4)
      + R(94, 70, 40, 8, '#A1887F', 2) + Lc('M98 78v12M130 78v12M96 70v-12M132 70v-12M96 60h36', '#6D4C41', 4) + [[60, 108], [90, 100], [140, 112]].map(([x, y]) => C(x, y, 9, '#558B2F', 3)).join('')
      + Lc('M150 46q6-6 12 0q6-6 12 0M176 66q5-5 10 0q5-5 10 0', INK, 3) + frame + face(84, 128, 0.36)),
  L('plapluang', 'ปลาพลวงในลำธารเขาชะเมา', 'The big blue fish in Khao Chamao’s clear stream', ['soro brook carp', 'ปลาพลวง', 'khao chamao', 'เขาชะเมา', 'clear stream', 'ลำธารใส', 'feeding fish', 'ให้อาหารปลา', 'forest pools', 'อุทยานแห่งชาติเขาชะเมา-เขาวง'], 'หาปลาตัวโตสีฟ้าเงินที่ว่ายในน้ำใส', 'Find the big silver-blue fish in the clear water',
    // a clear stream seen from above: round pebbles of many colours under the water and four big silver-blue fish with dark fins swimming together, one turning to smile, a fern at the edge
    bg('#B2EBF2') + [[40, 50, 14, '#BCAAA4'], [190, 60, 16, '#D7CCC8'], [60, 196, 18, '#A1887F'], [180, 200, 14, '#BCAAA4'], [120, 210, 10, '#FFCCBC'], [30, 130, 10, '#D7CCC8'], [210, 130, 12, '#A1887F']].map(([x, y, r, c]) => E(x, y, r, r * 0.75, c, 3)).join('')
      + [[86, 80, 0.8, -20], [160, 110, 0.75, 200], [90, 156, 0.7, 10]].map(([x, y, s, r]) => g(x, y, s, E(0, 0, 36, 15, '#90A4AE') + P('M32 0l18-12v24z', '#546E7A') + P('M-6 -14l8-10 10 10z', '#546E7A') + Lc('M-20 -4q4 4 0 8M-6 -6q4 6 0 12M8 -6q4 6 0 12', '#CFD8DC', 2.5) + C(-24, -3, 3, INK, 0), r)).join('')
      + g(140, 60, 1, E(0, 0, 40, 18, '#B0BEC5') + P('M36 0l20-14v28z', '#546E7A') + Lc('M-4 -8q4 8 0 16M12 -8q4 8 0 16', '#ECEFF1', 2.5) + face(-16, -2, 0.3)) + Lc('M16 190c20-10 30-30 26-50', '#43A047', 4) + frame),
  L('driedshrimp', 'ร้านกุ้งแห้งที่บ้านเพ', 'Dried shrimp and dried squid at Ban Phe', ['dried shrimp', 'กุ้งแห้ง', 'dried squid', 'ปลาหมึกแห้ง', 'ban phe', 'ท่าเรือบ้านเพ', 'dried seafood shop', 'ร้านของฝากทะเล', 'souvenir from rayong', 'ของฝากระยอง'], 'หากระด้งที่มีกุ้งแห้งสีส้มเต็มไปหมด', 'Find the round basket heaped with little orange shrimp',
    // a big round woven basket heaped with little curled orange dried shrimp, flat dried squid hanging from a pole above it on strings
    Lc('M30 46h180', '#8D6E63', 7) + [60, 100, 140, 180].map((x) => Lc(`M${x} 46v8`, INK, 2.5) + P(`M${x - 10} 64l-10 10 10 2zM${x + 10} 64l10 10-10 2z`, '#FFCC80', 2.5) + P(`M${x} 54c8 4 11 12 11 22v18H${x - 11}V76c0-10 3-18 11-22z`, '#FFE0B2') + Lc(`M${x - 8} 94c-3 6 2 10-1 16M${x - 3} 94c-2 6 2 12 0 18M${x + 3} 94c2 6-2 12 0 18M${x + 8} 94c3 6-2 10 1 16`, '#FFB74D', 3) + C(x - 4, 86, 2, INK, 0) + C(x + 4, 86, 2, INK, 0)).join('')
      + E(120, 176, 92, 34, '#C8A165') + E(120, 168, 82, 26, '#D7B47A') + Lc('M44 172c40 12 112 12 152 0M50 184c40 10 100 10 140 0', '#A1887F', 2.5)
      + P('M54 166c20-30 112-30 132 0z', '#FFAB91', 3) + [[78, 156, 0], [104, 146, 40], [130, 148, -30], [156, 156, 80], [92, 162, 120], [142, 164, 200], [118, 160, 60]].map(([x, y, r]) => shrimp(x, y, r)).join('') + face(120, 192, 0.36)),
  L('tako', 'ขนมตะโก้ในกระทงใบเตย', 'Khanom tako in little pandan-leaf boxes', ['khanom tako', 'ขนมตะโก้', 'pandan leaf boxes', 'กระทงใบเตย', 'coconut cream topping', 'หน้ากะทิ', 'thai dessert', 'ขนมไทย', 'water chestnut', 'แห้ว', 'sweet from rayong'], 'หากล่องเล็กสีเขียวที่พับจากใบไม้มีหน้าขาวๆ', 'Find the little green leaf boxes with white tops',
    // a tray of small square boxes folded from bright green pandan leaves and pinned at the corners, each filled with a green jelly layer and a thick white coconut cream top, one with a bite taken
    R(26, 170, 188, 22, '#D7B47A', 6) + Lc('M30 181h180', '#A1887F', 2.5)
      + [[64, 132], [120, 128], [176, 132], [92, 160], [148, 160]].map(([x, y], k) => g(x, y, 1, P('M-24 -8l4 30h40l4-30z', '#43A047') + Lc('M-20 0l2 20M-8 -4v26M8 -4v26M20 0l-2 20', '#2E7D32', 2) + P('M-24 -8l-6-10 10 6zM24 -8l6-10-10 6z', '#66BB6A', 2.5)
        + E(0, -8, 24, 7, k === 3 ? '#AED581' : '#FFFDF7') + (k === 3 ? P('M6 -14c6 2 10 6 10 10-6 2-12 0-14-4z', '#AED581', 2.5) + E(-6, -8, 14, 4, '#FFFDF7', 2) : C(-6, -10, 2, '#FFFFFF', 0)) + (k === 1 ? face(0, 8, 0.3) : ''))).join('')
      + g(198, 70, 1, Lc('M0 30v-50', '#2E7D32', 4) + P('M0 -20c-10-20-4-40 6-46 4 16 0 32-6 46z', '#66BB6A', 3), 15)),
  L('beachdinner', 'โต๊ะอาหารริมหาดยามค่ำ', 'Dinner on the sand under the string lights', ['beach dinner', 'กินข้าวริมหาด', 'seafood dinner', 'ซีฟู้ดริมทะเล', 'low tables on the sand', 'โต๊ะบนผืนทราย', 'string lights', 'ไฟประดับ', 'evening on samet', 'มื้อค่ำเกาะเสม็ด'], 'หาโต๊ะเตี้ยๆ บนทรายใต้สายไฟดวงเล็กๆ', 'Find the low table on the sand under the little lights',
    // at night on the beach: a string of round glowing bulbs looping between two posts, a low wooden table on the sand with a grilled fish and a coconut on it, two fat floor cushions and the dark sea with a moon behind
    bg('#283593') + C(186, 44, 10, '#FFF59D', 0) + P('M16 120h208v30H16z', '#3949AB', 0) + Lc('M30 134h40M140 130h50', '#7986CB', 3) + P('M16 150h208v74H16z', '#FFE0B2', 0) + frame
      + Lc('M36 186V62M204 186V62', '#8D6E63', 6) + P('M36 66q42 40 84 6t84-6', 'none', 3) + [[54, 84], [78, 96], [102, 92], [126, 76], [150, 80], [174, 88], [192, 78]].map(([x, y]) => C(x, y, 6, '#FFEB3B', 2.5)).join('')
      + R(74, 160, 92, 12, '#A1887F', 4) + Lc('M84 172v18M156 172v18', '#6D4C41', 5) + E(104, 156, 18, 7, '#ECEFF1', 3) + g(104, 153, 1, E(0, 0, 13, 5, '#FF8A65', 2.5) + P('M12 0l7-5v10z', '#FF8A65', 2.5)) + C(140, 150, 10, '#8BC34A') + Lc('M140 140l4-8', INK, 2.5)
      + E(60, 200, 22, 10, '#E57373') + E(180, 200, 22, 10, '#4DB6AC') + face(60, 196, 0.24) + face(180, 196, 0.24)),
  L('nets', 'อวนเขียวบนสะพานปลา', 'Green fishing nets on the jetty', ['fishing nets', 'อวนจับปลา', 'mending nets', 'ซ่อมอวน', 'floats', 'ทุ่นลอย', 'fishing village', 'หมู่บ้านชาวประมง', 'jetty', 'สะพานปลา', 'rayong fishermen'], 'หากองอวนสีเขียวกับลูกทุ่นสีส้ม', 'Find the heap of green net with orange floats',
    // a soft heap of bright green fishing net on wooden jetty planks, a row of round orange floats along its edge, a wooden net needle lying beside it, the sea behind
    bg('#B3E5FC') + P('M16 100h208v40H16z', '#4FC3F7', 0) + Lc('M30 114h40M150 120h50', '#E1F5FE', 3) + P('M16 140h208v84H16z', '#BCAAA4', 0) + Lc('M16 162h208M16 186h208M16 210h208', '#8D6E63', 3) + frame
      + P('M40 194c-6-40 30-80 80-84 50 4 86 40 80 84z', '#66BB6A') + Array.from({ length: 6 }, (_, k) => Lc(`M${54 + k * 24} 190c-4-24 4-50 14-64`, '#2E7D32', 2)).join('') + Array.from({ length: 4 }, (_, k) => Lc(`M46 ${180 - k * 16}c40-8 110-8 150 0`, '#2E7D32', 2)).join('')
      + [52, 80, 108, 136, 164, 190].map((x, k) => C(x, 196 - (k % 2) * 4, 9, '#FF7043', 3)).join('') + g(196, 128, 1, P('M-6 -20l6-8 6 8v24h-12z', '#FFCC80', 3) + Lc('M0 -12v10', INK, 2), 30) + face(120, 156, 0.4)),
  L('kungobwoonsen', 'กุ้งอบวุ้นเส้น', 'Kung ob woon sen, prawns baked with glass noodles in a clay pot', ['kung ob woon sen', 'กุ้งอบวุ้นเส้น', 'baked prawns', 'กุ้งอบ', 'glass noodles', 'วุ้นเส้น', 'clay pot', 'หม้อดิน', 'seafood restaurant', 'ร้านอาหารทะเลระยอง'], 'หาหม้อดินที่มีกุ้งตัวโตสองตัวนอนบนเส้นใสๆ', 'Find the clay pot with two big prawns lying on clear noodles',
    // a squat brown clay pot with its lid tipped against it, heaped with shiny amber glass noodles, two big curled orange prawns with long feelers on top, coriander leaves, ginger slices and peppercorns
    E(120, 204, 86, 10, '#D7CCC8') + P('M40 130c0 46 30 70 80 70s80-24 80-70z', '#8D5524') + Lc('M52 160c40 14 96 14 136 0', '#6D3B1F', 3) + E(120, 130, 82, 18, '#6D3B1F') + E(120, 128, 74, 14, '#E8B86B', 3)
      + Array.from({ length: 7 }, (_, k) => Lc(`M${66 + k * 16} 132c6-8-6-12 2-20`, '#C98A3A', 2.5)).join('') + Lc('M34 130c-10 6-12 16-4 22M206 130c10 6 12 16 4 22', '#6D3B1F', 6)
      + [[92, 108, -10], [150, 110, 190]].map(([x, y, r]) => g(x, y, 1.4, P('M-22 6c-4-18 10-30 28-28 14 2 20 14 16 24l-10-4c2-8-4-12-10-12-12 0-18 10-14 20z', '#FF7043') + Lc('M-12 -6v10M-2 -12v12M8 -12v12', '#E64A19', 2) + P('M-22 6l-8 8 12-2z', '#FF7043', 2.5) + Lc('M22 2c14-4 24-14 28-28M20 -4c12-10 16-22 14-34', '#E64A19', 2), r)).join('')
      + [[120, 104], [70, 126], [170, 128]].map(([x, y]) => P(`M${x} ${y}c-8-8-4-16 4-14 2-8 12-6 10 2 8 0 8 10 0 12z`, '#66BB6A', 2.5)).join('') + [[108, 128], [138, 132]].map(([x, y]) => E(x, y, 6, 4, '#FFF3E0', 2)).join('') + [[84, 136], [156, 136], [124, 138]].map(([x, y]) => C(x, y, 2.5, INK, 0)).join('')
      + g(196, 84, 1, E(0, 0, 30, 10, '#8D5524') + C(0, -10, 6, '#6D3B1F', 3), 30) + face(120, 166, 0.4)),
  L('plakapong', 'ปลากะพงนึ่งมะนาว', 'Steamed sea bass in lime and chilli', ['pla kapong nueng manao', 'ปลากะพงนึ่งมะนาว', 'steamed sea bass', 'ปลานึ่ง', 'lime and chilli', 'มะนาวพริก', 'fish-shaped pot', 'ถาดรูปปลา', 'seafood restaurant', 'ร้านอาหารทะเล'], 'หาปลาที่นอนในถาดรูปปลาบนเตาไฟ', 'Find the fish lying in a fish-shaped tray over a little flame',
    // a fish-shaped steel tray on a stand with blue flames under it, a whole steamed fish in clear soup, lime slices, red chillies, chopped garlic and green coriander on top
    P('M60 196h120l-10 14H70z', '#B0BEC5') + [88, 120, 152].map((x) => P(`M${x - 6} 194c0-10 6-14 6-20 2 6 6 10 6 20z`, '#64B5F6', 2.5)).join('') + R(56, 176, 128, 10, '#90A4AE', 3)
      + P('M28 130c20-40 120-50 168-20l24-22v76l-24-22c-48 30-148 20-168-12z', '#CFD8DC') + P('M40 130c20-30 110-38 154-14l14-10v48l-14-10c-44 24-134 16-154-14z', '#E0F2F1', 3)
      + E(118, 132, 60, 18, '#ECEFF1') + P('M168 124l22-12v40l-22-12z', '#ECEFF1', 3) + Lc('M90 124c4 6 4 10 0 16M110 122c4 6 4 12 0 18M130 122c4 6 4 12 0 18', '#B0BEC5', 2.5)
      + [[86, 120], [140, 140]].map(([x, y]) => C(x, y, 9, '#C5E1A5') + Lc(`M${x - 6} ${y}h12M${x} ${y - 6}v12`, '#8BC34A', 2)).join('') + [[106, 140, 20], [150, 120, -30]].map(([x, y, r]) => g(x, y, 1, P('M-10 0c4-4 16-4 20 0-4 4-16 4-20 0z', '#E53935', 2.5), r)).join('')
      + [[120, 116], [160, 132], [70, 136]].map(([x, y]) => C(x, y, 3, '#FFF8E1', 2)).join('') + Lc('M96 112l-6-6M124 146l6 6', '#43A047', 3) + C(70, 128, 3, INK, 0) + face(118, 132, 0.28)),
  L('babin', 'ขนมบ้าบิ่น', 'Khanom ba-bin, crispy-edged coconut cakes', ['khanom ba-bin', 'ขนมบ้าบิ่น', 'coconut cake', 'ขนมมะพร้าว', 'crispy edges', 'ขอบกรอบ', 'thai dessert', 'ขนมไทย', 'banana leaf', 'ใบตอง'], 'หาขนมกลมสีทองที่ขอบไหม้กรอบนิดๆ', 'Find the round golden cakes with crispy brown edges',
    // a stack of round golden coconut cakes with toasty brown crinkled edges and flecks of white coconut, on a green banana leaf, one cut into a wedge
    P('M24 170c40-30 150-30 192 0-40 30-150 30-192 0z', '#66BB6A') + Lc('M30 170h180M60 160l20 10M100 156l10 14M150 158l-10 12M182 162l-18 8', '#388E3C', 2.5)
      + [[120, 160, 70], [120, 140, 64], [120, 120, 58]].map(([x, y, r], k) => E(x, y, r, r * 0.3, '#A1673F') + E(x, y - 4, r - 8, r * 0.26, k === 2 ? '#FFCA28' : '#FFB300')).join('')
      + P('M120 116l40 6c-8 8-24 10-40 6z', '#FFF8E1', 2.5) + [[94, 112], [108, 120], [132, 110], [146, 118], [84, 120]].map(([x, y]) => Lc(`M${x} ${y}l4-2`, '#FFFFFF', 2.5)).join('')
      + C(52, 120, 16, '#FFB300') + E(52, 120, 11, 11, '#FFCA28', 2.5) + face(110, 114, 0.3) + Lc('M40 92q6-8 12 0M58 86q6-8 12 0', '#BCAAA4', 3)),
  L('sanddollar', 'เหรียญทะเลบนหาดทราย', 'Sand dollars on the wet sand', ['sand dollar', 'เหรียญทะเล', 'flat sea urchin', 'อีแปะทะเล', 'wet sand', 'ทรายเปียก', 'low tide', 'น้ำลง', 'beach walk', 'เดินเล่นชายหาด'], 'หาวงกลมแบนๆ ที่มีลายดอกไม้ห้ากลีบ', 'Find the flat round shells with a five-petal flower on top',
    // wet golden sand with a frilly white wave edge at the top, three round flat pale sand dollars with five-petal flower patterns, little bubbles and a tiny crab track
    bg('#FFE0B2') + P('M16 16h208v40c-20 10-40-6-60 4s-40-6-60 4-40-6-60 4-20-6-28 0z', '#80DEEA', 0) + Lc('M16 56c20-8 30 6 50 0s30 6 50 0 30 6 50 0 30 6 58 0', '#FFFFFF', 5) + frame
      + [[80, 120, 40], [168, 104, 26], [156, 176, 30]].map(([x, y, r]) => C(x, y, r, '#F3E5D0') + Array.from({ length: 5 }, (_, k) => g(x, y, 1, E(0, -r * 0.42, r * 0.12, r * 0.3, '#D7B49E', 2.5), k * 72)).join('') + C(x, y, r * 0.08, '#D7B49E', 0)).join('')
      + [[48, 190], [60, 200], [72, 190], [84, 200]].map(([x, y]) => Lc(`M${x} ${y}l4 4`, '#BCAAA4', 2.5)).join('') + [[120, 76], [196, 150], [40, 140]].map(([x, y]) => C(x, y, 4, '#FFFFFF', 2)).join('') + face(80, 140, 0.32)),
  L('prawncrackers', 'ข้าวเกรียบกุ้ง', 'Khao kriap kung, puffy prawn crackers', ['prawn crackers', 'ข้าวเกรียบกุ้ง', 'shrimp chips', 'ข้าวเกรียบ', 'crunchy snack', 'ขนมกรุบกรอบ', 'souvenir', 'ของฝากระยอง', 'fried crackers', 'ทอดกรอบ'], 'หาแผ่นข้าวเกรียบพองๆ สีชมพูกับสีขาว', 'Find the puffy pink and white crackers',
    // a woven bowl overflowing with puffy wavy prawn crackers in pink and cream, a few hard flat uncooked discs beside it and a tiny curled prawn on the side
    E(120, 180, 84, 26, '#C8A165') + P('M36 176c4 30 40 44 84 44s80-14 84-44z', '#D7B47A') + Lc('M44 190c40 12 112 12 152 0M54 204c40 10 92 10 132 0', '#A1887F', 2.5)
      + [[60, 150, 0, '#F8BBD0'], [96, 134, 20, '#FFF8E1'], [138, 132, -20, '#F48FB1'], [176, 150, 10, '#FFF8E1'], [118, 158, 0, '#FCE4EC'], [80, 164, -10, '#FFF8E1'], [158, 166, 20, '#F8BBD0'], [118, 108, 10, '#F8BBD0']].map(([x, y, r, c]) => g(x, y, 1, P('M-24 0c4-14 12-18 16-8 4-12 12-12 16 0 4-10 12-8 16 4 2 10-6 16-24 16S-26 12-24 0z', c, 3), r)).join('')
      + [[196, 92], [208, 110]].map(([x, y]) => E(x, y, 12, 6, '#FFAB91', 2.5)).join('') + face(118, 156, 0.28)),
  L('shellchime', 'โมบายเปลือกหอย', 'A seashell wind chime', ['shell wind chime', 'โมบายเปลือกหอย', 'seashells', 'เปลือกหอย', 'souvenir shop', 'ร้านของที่ระลึก', 'tinkling in the breeze', 'เสียงกรุ๊งกริ๊ง', 'koh samet souvenir', 'driftwood'], 'หาเปลือกหอยที่ห้อยเป็นสายแกว่งไปมาตามลม', 'Find the shells hanging on strings and swinging in the wind',
    // a piece of driftwood hung from a loop, five strings below it threaded with little pearly shells, cowries and a starfish at the bottom of one, swinging in the breeze with sound marks
    Lc('M120 30v20', INK, 3) + P('M40 50c20-6 60-8 80-4s60 2 80 6l-4 10c-20-4-56-6-76-2s-60 6-80 2z', '#BCAAA4') + Lc('M60 56c10 2 20 2 30 0M140 58c10 2 20 2 30 0', '#8D6E63', 2.5)
      + [[60, 0], [90, 1], [120, 2], [150, 1], [180, 0]].map(([x, k]) => Lc(`M${x} 60v${100 + k * 20}`, INK, 2) + [0, 1, 2].map((j) => {
        const y = 90 + j * 34 + k * 6;
        return j % 2 ? E(x, y, 9, 12, '#FFF8E1', 2.5) + Lc(`M${x} ${y - 9}v18`, '#D7B49E', 2) : P(`M${x - 12} ${y + 6}c0-14 6-20 12-20s12 6 12 20c-8 4-16 4-24 0z`, j ? '#F8BBD0' : '#FFE0B2', 2.5) + Lc(`M${x - 6} ${y}l6-12 6 12`, '#D7B49E', 2);
      }).join('')).join('')
      + g(120, 200, 1, P('M0 -16l5 10 11 1-8 8 2 11-10-5-10 5 2-11-8-8 11-1z', '#FFAB91', 3)) + face(120, 197, 0.18) + Lc('M30 120q-8 10 0 20M210 120q8 10 0 20', '#4FC3F7', 3)),
  L('phraaphai', 'ปี่วิเศษของพระอภัยมณี', 'The magic pipe from the Phra Aphai Mani tale', ['phra aphai mani', 'พระอภัยมณี', 'magic pipe', 'ปี่วิเศษ', 'thai pipe', 'ปี่ไทย', 'thai poem', 'วรรณคดีไทย', 'koh samet legend', 'นิทานเกาะเสม็ด', 'music over the sea'], 'หาปี่ไม้ที่เป่าแล้วมีตัวโน้ตลอยไปบนทะเล', 'Find the wooden pipe sending music notes over the sea',
    // a long wooden Thai pipe with flared ends and a row of finger holes, lying across the frame, music notes and sparkles floating up out of it over curly waves and a small island
    bg('#E1F5FE') + P('M16 160c20-10 40 10 60 0s40 10 60 0 40 10 60 0 40 10 28 0v64H16z', '#4FC3F7', 0) + Lc('M16 160c20-10 40 10 60 0s40 10 60 0 40 10 60 0 20 6 28 0', '#FFFFFF', 4) + P('M156 160c6-20 30-22 40 0z', '#81C784') + frame
      + g(110, 130, 1, P('M-80 -6c-8-6-14-6-16 0v12c2 6 8 6 16 0zM80 -6c8-6 14-6 16 0v12c-2 6-8 6-16 0z', '#FFCA28') + R(-80, -9, 160, 18, '#A1673F', 9) + Lc('M-60 -9v18M60 -9v18', '#FFCA28', 4) + [-36, -18, 0, 18, 36].map((x) => C(x, 0, 3.5, INK, 0)).join(''), -18)
      + [[140, 70], [176, 50], [104, 52]].map(([x, y], k) => g(x, y, 1, E(0, 0, 8, 6, k === 1 ? '#EC407A' : '#7E57C2') + Lc(`M7 -1v-24${k === 0 ? 'l10 4' : ''}`, INK, 3), -15)).join('') + [[76, 70], [200, 92]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, '#FFD54F', 2)).join('') + face(120, 156, 0.28)),
  L('plathu', 'ปลาทูในเข่งไม้ไผ่', 'Little mackerel in bamboo baskets', ['pla thu', 'ปลาทู', 'mackerel', 'ปลาทูนึ่ง', 'bamboo baskets', 'เข่งปลาทู', 'fishing harbour', 'ท่าเรือประมง', 'thai fish', 'ปลาทูหน้างอ'], 'หาปลาตัวเล็กสองตัวที่นอนก้มหน้าในตะกร้ากลม', 'Find the two little fish lying head-bent in each round basket',
    // three small round shallow bamboo baskets stacked at a slant, each holding two little silver-blue mackerel bent head-down side by side, a pile of baskets behind
    [[70, 82], [150, 104], [94, 162]].map(([x, y], k) => g(x, y, 1, E(0, 0, 50, 26, '#D7B47A') + E(0, -2, 42, 20, '#E8CFA0', 3) + Lc('M-40 6c26 8 54 8 80 0M-44 -2l88 0', '#A1887F', 2)
      + [-12, 12].map((dx) => g(dx, -4, 1, P('M-8 -14c10-4 16 4 14 14l-2 8c-4 4-10 4-12-2z', '#90A4AE', 2.5) + P('M-6 12l8 6-10 2z', '#78909C', 2.5) + C(-2, -10, 2, INK, 0) + Lc('M-4 0c4 1 6 4 6 8', '#ECEFF1', 2), dx < 0 ? -8 : 8)).join('')
      + (k === 2 ? face(0, 10, 0.24) : ''))).join('')),
];

export default {
  places: {
    'th-rayong': { country: 'th', wave: 3, home: true, name: nm('ระยองและเกาะเสม็ด', 'Rayong and Koh Samet'), tz: 'Asia/Bangkok', ll: [12.68, 101.28], alias: ['rayong', 'ระยอง', 'koh samet', 'เกาะเสม็ด', 'ko samet', 'samet island', 'ban phe', 'ท่าเรือบ้านเพ', 'ao wong duean', 'อ่าววงเดือน', 'laem mae phim', 'แหลมแม่พิมพ์', 'mae ramphueng', 'หาดแม่รำพึง', 'khao chamao', 'เขาชะเมา'], colors: RY },
  },
  items,
};
