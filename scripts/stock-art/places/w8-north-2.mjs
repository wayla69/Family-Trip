// Wave 8, the north (part 2): Tromsø, Bergen and the fjords, Iceland, Reykjavík, Denmark, Copenhagen
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (no/tromso/landmark-kingcrab.v1.svg → no-tromso.landmark.kingcrab)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const X = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const pine = (x, y, s, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18H-18l11-18h-7z', c, 2.5) + R(-3, 0, 6, 8, '#6D4C41', 0, 2));

const items = [
  // ---------- Tromsø
  L('no/tromso/landmark-kingcrab.v1.svg', 'ล่องเรือจับปูยักษ์คิงแครบ', 'A king crab safari in the fjord', ['king crab safari', 'ซาฟารีปูยักษ์', 'red king crab', 'ปูคิงแครบ', 'crab pot', 'ลอบดักปู', 'fjord boat', 'เรือในฟยอร์ด', 'arctic seafood', 'giant crab'], 'หาขาปูที่ยาวกว่าแขนเด็ก', 'Find the crab legs longer than a child’s arm',
    // a huge spiky red king crab held up over the side of a small boat by a grown-up's gloved hands, its long jointed legs dangling, a crab pot on deck and snowy mountains round the fjord
    sky('#E1F5FE') + P('M-4 120l40-40 30 26 40-46 50 50 40-30 48 40v24H-4z', '#FFFFFF', 3) + P('M-4 140h248v104H-4z', '#1E88E5', 0)
    + P('M10 180h220l-20 50H30z', '#ECEFF1', 3.5) + Lc('M14 190h212', '#E53935', 5) + g(186, 166, 1, R(-22, -18, 44, 30, '#FFCA28', 4, 3) + Lc('M-22-6h44M-22 4h44M-10-18v30M2-18v30', '#F57F17', 1.5))
    + g(100, 112, 1, [-1, 1].map((d) => [0, 1, 2].map((k) => Lc(`M${d * 22} ${-4 + k * 10}l${d * 30} ${-6 + k * 10}l${d * 8} ${24}`, INK, 9) + Lc(`M${d * 22} ${-4 + k * 10}l${d * 30} ${-6 + k * 10}l${d * 8} ${24}`, '#E64A19', 5)).join('')).join('')
      + E(0, 0, 32, 24, '#E64A19', 3.5) + [[-14, -10], [0, -14], [14, -10], [-8, 4], [10, 4]].map(([x, y]) => P(`M${x - 3} ${y + 3}l3-6 3 6z`, '#FF8A65', 1.5)).join('') + face(0, 0, 0.35)
      + Lc('M-20-18l-10-14M20-18l10-14', '#FFCCBC', 9) + Lc('M-20-18l-10-14M20-18l10-14', INK, 1.5))
    + kid(56, 180, '#FFCA28', 0.9) + kid(150, 180, '#43A047', 0.9)),
  L('no/tromso/landmark-polarmuseum.v1.svg', 'พิพิธภัณฑ์ขั้วโลกในโกดังไม้ริมท่า', 'The Polar Museum in an old wooden wharf house', ['polar museum', 'พิพิธภัณฑ์ขั้วโลก', 'polarmuseet', 'โพลาร์มูเซเอ', 'arctic explorers', 'นักสำรวจขั้วโลก', 'trapper hut', 'กระท่อมนักล่าสัตว์', 'old wharf house', 'skis and sledges'], 'หาเลื่อนไม้กับสกีโบราณหน้าโกดัง', 'Find the old wooden sledge and skis outside the warehouse',
    // a mustard-yellow old wooden warehouse on the quay with a steep roof and a hoist beam under the gable, an old wooden sledge, long skis and a tent bundle outside it, the harbour water in front
    sky('#B3E5FC') + P('M-4 190h248v54H-4z', '#1E88E5', 0) + R(-4, 178, 248, 14, '#8D6E63', 0, 3) + [20, 70, 120, 170, 220].map((x) => R(x - 4, 190, 8, 20, '#6D4C41', 0, 2)).join('')
    + R(40, 92, 140, 86, '#F2C14E', 2, 3.5) + Array.from({ length: 8 }, (_, k) => Lc(`M${54 + k * 16} 96v80`, '#D4A12E', 2)).join('') + P('M32 96l78-60 78 60z', '#5D4037', 3.5)
    + R(98, 60, 24, 26, '#6D4C41', 2, 2.5) + Lc('M110 52v-10h24', INK, 3) + Lc('M130 42v20', INK, 1.5) + R(56, 120, 22, 22, '#FFFFFF', 2, 2.5) + R(142, 120, 22, 22, '#FFFFFF', 2, 2.5) + R(98, 130, 26, 48, '#5D4037', 2, 3)
    + Lc('M196 178c10-50 14-60 18-80M208 178c10-50 14-60 18-80', '#A1673F', 5) + g(214, 168, 1, P('M-36 0h60l8-8', 'none', 4) + R(-34, -14, 52, 10, '#A1673F', 2, 2.5) + Lc('M-30-4v8M10-4v8', '#6D4C41', 3))
    + face(110, 112, 0.35)),
  L('no/tromso/landmark-arcticbotanic.v1.svg', 'สวนพฤกษศาสตร์อาร์กติก-แอลป์กับดอกป๊อปปี้สีฟ้า', 'The Arctic–Alpine Botanic Garden and its blue poppies', ['arctic alpine botanic garden', 'สวนพฤกษศาสตร์อาร์กติก', 'blue poppy', 'ดอกป๊อปปี้สีฟ้า', 'rock garden', 'สวนหิน', 'northernmost garden', 'สวนเหนือสุดของโลก', 'midnight sun flowers', 'mountain flowers'], 'หาดอกไม้สีฟ้าที่มีเกสรเหลืองตรงกลาง', 'Find the sky-blue flowers with yellow middles',
    // a sunny rock garden of grey boulders with tiny alpine flowers tucked between them and a clump of big sky-blue poppies with golden centres, a little stream and a snowy peak behind
    sky('#E1F5FE') + P('M120 30l50 70H70z', '#FFFFFF', 3) + P('M-4 120c60-30 160-30 248 0v124H-4z', '#81C784', 0)
    + [[40, 150, 30], [180, 140, 34], [110, 210, 26], [30, 210, 22], [210, 206, 24]].map(([x, y, r]) => E(x, y, r, r * 0.7, '#B0BEC5', 3) + E(x - r * 0.3, y - r * 0.3, r * 0.3, r * 0.15, '#CFD8DC', 0)).join('')
    + Lc('M90 120c-10 30 20 40 0 70s10 30 0 60', '#4FC3F7', 8)
    + [[132, 140], [158, 160], [120, 172], [146, 120], [168, 196]].map(([x, y], i) => Lc(`M${x} ${y + 30}V${y}`, '#43A047', 3) + g(x, y, 1, [0, 90, 180, 270].map((a) => E(0, -9, 9, 10, '#64B5F6', 2).replace('<ellipse', `<ellipse transform="rotate(${a})"`)).join('') + C(0, 0, 5, '#FFCA28', 2))).join('')
    + [[30, 180, '#F06292'], [60, 186, '#FFF176'], [196, 176, '#BA68C8'], [76, 226, '#FFFFFF'], [160, 230, '#F06292']].map(([x, y, c]) => C(x, y, 4, c, 1.5)).join('')
    + face(180, 142, 0.35)),
  L('no/tromso/landmark-rorbu.v1.svg', 'กระท่อมชาวประมงสีแดงบนเสาริมน้ำ', 'Red fishermen’s cabins on stilts', ['rorbu', 'รอร์บู', 'fishermens cabins', 'กระท่อมชาวประมง', 'red cabins on stilts', 'บ้านแดงบนเสา', 'lofoten', 'ลอโฟเทน', 'senja fishing village', 'hamn'], 'หาเสาไม้ที่ยกบ้านขึ้นเหนือน้ำ', 'Find the wooden poles holding the cabins above the water',
    // a row of three little red wooden cabins with white window frames standing on tall wooden poles over green sea water, a steep pointy mountain rising straight behind, a small rowing boat tied up
    sky('#E3F2FD') + P('M40 120L100 20l40 50 30-30 70 80z', '#78909C', 3) + P('M100 20l-14 24 14-6 10 12z', '#FFFFFF', 2) + P('M-4 120h248v124H-4z', '#26A69A', 0) + Lc('M14 210h40M150 226h60', '#B2DFDB', 3)
    + R(-4, 112, 60, 18, '#8D6E63', 0, 3)
    + [[50, 90], [110, 96], [170, 90]].map(([x, y]) => [-16, 0, 16].map((d) => Lc(`M${x + d} ${y + 48}v${172 - y - 48}`, '#5D4037', 5)).join('') + R(x - 26, y, 52, 48, '#C62828', 2, 3) + P(`M${x - 30} ${y}l30-26 30 26z`, '#37474F', 3) + R(x - 16, y + 14, 12, 12, '#FFFFFF', 1, 2) + R(x + 4, y + 14, 12, 12, '#FFFFFF', 1, 2) + Lc(`M${x - 26} ${y + 46}h52`, '#FFFFFF', 3)).join('')
    + g(180, 200, 1, P('M-24-4h48l-8 12h-32z', '#FFFFFF', 2.5) + Lc('M-20-4c-10-20-20-40-30-62', '#5D4037', 1.5)) + face(110, 120, 0.35)),
  L('no/tromso/landmark-segla.v1.svg', 'ภูเขาเซกลารูปใบเรือที่เกาะเซนยา', 'Segla, the sail-shaped peak on Senja', ['segla', 'ภูเขาเซกลา', 'senja', 'เกาะเซนยา', 'sail mountain', 'ภูเขารูปใบเรือ', 'mefjord', 'เมฟยอร์ด', 'arctic hike', 'steep peak'], 'หาภูเขาที่โค้งเหมือนใบเรือพองลม', 'Find the mountain curved like a sail full of wind',
    // a steep dark peak curved like a sail full of wind rising straight out of a deep blue fjord, a gentler green ridge beside it with a hiker on the path, little white boats far below
    sky('#FFE0B2') + C(56, 52, 18, '#FFCA28', 2.5) + P('M-4 170h248v74H-4z', '#1565C0', 0) + Lc('M30 200h40M150 214h60', '#90CAF9', 3)
    + P('M90 170c10-60 30-120 70-150 6 40 6 100-10 150z', '#546E7A', 3.5) + P('M160 20c6 40 6 100-10 150h-14c14-50 18-110 24-150z', '#37474F', 0) + P('M160 20c-6 10-12 22-18 30l14-4z', '#FFFFFF', 2) + P('M90 170c10-60 30-120 70-150 6 40 6 100-10 150z', 'none', 3.5)
    + P('M-4 170c30-50 60-70 100-60 30 10 60 40 70 60z', '#66BB6A', 3) + Lc('M20 160c20-20 40-34 64-40', '#C5E1A5', 2.5) + kid(70, 124, '#E53935', 0.8)
    + P('M190 196h20l-4 6h-12z', '#FFFFFF', 2) + P('M40 222h16l-3 5h-10z', '#FFFFFF', 2) + face(130, 120, 0.4)),

  // ---------- Bergen and the fjords
  L('no/bergen/landmark-stegastein.v1.svg', 'จุดชมวิวสเตกาสไตน์ยื่นเหนือฟยอร์ด', 'Stegastein, the viewing deck that leaps over the fjord', ['stegastein', 'สเตกาสไตน์', 'viewing platform', 'จุดชมวิว', 'aurlandsfjord', 'ออร์ลันด์ฟยอร์ด', 'aurland', 'เอาร์ลันด์', 'glass end', 'ปลายกระจก'], 'หาสะพานไม้ที่ยื่นออกไปแล้วหักโค้งลง', 'Find the wooden walkway that sticks out and bends down at the end',
    // a long wooden walkway jutting out from a steep green mountainside high above a long blue fjord, bending down at its tip behind a clear glass end, children peeking over, mountains across the water
    sky('#E1F5FE') + P('M-4 110l50-40 40 30 60-50 50 40 48-20v40H-4z', '#78909C', 3) + P('M-4 120h248v124H-4z', '#1E88E5', 0) + P('M60 150c40-6 120-6 184 0v10H60z', '#43A047', 0) + Lc('M90 200h30M160 220h50', '#90CAF9', 3)
    + P('M-4 60c40 10 70 40 80 100l10 84H-4z', '#4CAF50', 3.5) + P('M-4 90c30 10 50 30 60 60', 'none', 2)
    + P('M60 100l120-16c14-2 20 10 20 26l-6 24', 'none', 0) + P('M60 92l124-18c12 0 18 8 18 20l-4 30h-12l2-24c0-6-4-10-10-10L60 104z', '#C08A55', 3.5) + Lc('M70 98l110-14', '#A1673F', 2) + P('M196 96l10 2-4 32-10-2z', '#B3E5FC', 2.5)
    + Lc('M90 104v40M130 98v40', '#8D6E63', 4) + kid(160, 82, '#FFCA28', 0.8) + kid(180, 80, '#E53935', 0.8) + face(30, 150, 0.4)),
  L('no/bergen/landmark-kjeragbolten.v1.svg', 'หินคเยรากโบลเทินที่ติดอยู่ระหว่างหน้าผา', 'Kjeragbolten, the boulder stuck between two cliffs', ['kjeragbolten', 'หินคเยรากโบลเทิน', 'kjerag', 'เขาคเยราก', 'stuck boulder', 'หินติดซอกผา', 'lysefjord', 'ลีเซฟยอร์ด', 'big hike', 'boulder in a crack'], 'หาก้อนหินกลมๆ ที่ติดค้างกลางซอกผา', 'Find the round rock stuck in the gap between the cliffs',
    // two tall grey cliff walls with a deep narrow gap between them and a big round boulder wedged in the gap high above the fjord far below, a cloud drifting through
    sky('#E3F2FD') + P('M-4 220h248v24H-4z', '#1E88E5', 0) + P('M-4 40h100l10 40-8 50 6 110H-4z', '#90A4AE', 3.5) + P('M244 40H140l-8 40 10 50-8 110h110z', '#78909C', 3.5)
    + Lc('M30 80l20 30M50 160l20 20M190 90l20 30M180 170l24 20', '#607D8B', 2.5) + E(60, 220, 24, 8, '#FFFFFF', 2)
    + C(119, 66, 22, '#A1887F', 3.5) + E(112, 58, 8, 5, '#BCAAA4', 0) + face(119, 66, 0.32)
    + P('M-4 40h100M244 40H140', 'none', 4) + kid(60, 40, '#E53935', 0.8) + kid(180, 40, '#FFCA28', 0.8)),
  L('no/bergen/landmark-hardangerbridge.v1.svg', 'สะพานแขวนฮาร์ดังเงอร์ข้ามฟยอร์ด', 'The Hardanger Bridge hung across the fjord', ['hardanger bridge', 'สะพานฮาร์ดังเงอร์', 'hardangerbrua', 'ฮาร์ดังเงอร์บรูอา', 'suspension bridge', 'สะพานแขวน', 'eidfjord', 'ไอด์ฟยอร์ด', 'fjord crossing', 'tunnel to bridge'], 'หาสายเคเบิลโค้งยาวที่แขวนถนนไว้', 'Find the long curved cables that hold the road',
    // two tall slim concrete towers rising from steep mountainsides with long sagging cables between them and a thin road hanging under, deep blue fjord water far below and tunnel mouths in the rock at each end
    sky('#FFF3E0') + P('M-4 210h248v34H-4z', '#1E88E5', 0) + P('M-4 70c30 0 40 20 46 140H-4zM244 70c-30 0-40 20-46 140h46z', '#66BB6A', 3.5)
    + R(36, 40, 12, 120, '#ECEFF1', 2, 3) + R(192, 40, 12, 120, '#ECEFF1', 2, 3) + Lc('M42 44c40 90 116 90 156 0', INK, 4) + Array.from({ length: 11 }, (_, k) => { const x = 54 + k * 13; const y = 44 + 90 * (1 - ((x - 120) / 78) ** 2) * 0.75; return Lc(`M${x} ${y}V120`, '#90A4AE', 1.5); }).join('')
    + R(-4, 118, 248, 8, '#FFCA28', 1, 3) + P('M-4 112c4-10 18-10 22 0z', '#37474F', 2.5) + P('M244 112c-4-10-18-10-22 0z', '#37474F', 2.5)
    + g(100, 112, 1, R(-14, -10, 28, 12, '#E53935', 3, 2) + C(-7, 2, 3, INK, 0) + C(7, 2, 3, INK, 0)) + face(120, 170, 0.4)),
  L('no/bergen/landmark-alesund.v1.svg', 'บ้านอาร์ตนูโวหอคอยแหลมที่ออเลซุนด์', 'The fairytale art nouveau towers of Ålesund', ['ålesund', 'ออเลซุนด์', 'art nouveau town', 'เมืองอาร์ตนูโว', 'jugendstil', 'ยูเกนด์สติล', 'aksla viewpoint', 'จุดชมวิวอักสลา', 'brosundet', 'turret houses'], 'หาหอคอยเล็กๆ หลังคาแหลมบนบ้านแต่ละหลัง', 'Find the little pointed turrets on top of the houses',
    // a row of pastel stone houses along a narrow harbour channel, each with fancy curly gables and little pointed turrets with spires, their reflections wobbling in the water
    sky('#E1F5FE') + P('M-4 160h248v84H-4z', '#4FC3F7', 0)
    + [[24, 80, '#FFCC80'], [74, 70, '#F8BBD0'], [124, 84, '#C5E1A5'], [174, 66, '#B3E5FC'], [222, 86, '#FFF59D']].map(([x, y, c], i) => R(x - 24, y, 48, 160 - y, c, 2, 3) + (i % 2 ? R(x + 6, y - 24, 16, 26, c, 2, 2.5) + P(`M${x + 4} ${y - 24}l10-22 10 22z`, '#37474F', 2.5) + P(`M${x - 24} ${y}c6-20 22-20 30 0z`, c, 2.5) : P(`M${x - 24} ${y}c0-14 8-8 12-20 4 12 12 6 12-10 4 16 12 22 12 10 4 10 12 6 12 20z`, c, 2.5))
      + R(x - 16, y + 16, 10, 14, '#FFFFFF', 4, 2) + R(x + 6, y + 16, 10, 14, '#FFFFFF', 4, 2) + R(x - 16, y + 44, 10, 14, '#FFFFFF', 4, 2) + R(x + 6, y + 44, 10, 14, '#FFFFFF', 4, 2)
      + Lc(`M${x - 18} ${180 + (i % 2) * 6}h36`, c, 5)).join('')
    + face(124, 132, 0.35) + g(124, 196, 1, P('M-22-4h44l-6 10h-32z', '#FFFFFF', 2.5) + kid(0, -4, '#E53935', 0.7))),
  L('no/bergen/landmark-lysoen.v1.svg', 'วิลลาโดมหัวหอมบนเกาะลีเซอเอิน', 'The onion-domed villa on Lysøen island', ['lysøen', 'เกาะลีเซอเอิน', 'villa on an island', 'วิลลาบนเกาะ', 'onion dome villa', 'วิลลาโดมหัวหอม', 'fairytale house', 'บ้านเทพนิยาย', 'island boat trip', 'gingerbread trim'], 'หาโดมรูปหัวหอมบนหลังคาบ้านไม้', 'Find the onion-shaped dome on the wooden house roof',
    // a white and pale-yellow wooden villa covered in lacy carved trim with an onion dome on a little tower, standing among pine trees on a small rocky island in the sea, a little boat at its jetty
    sky('#E1F5FE') + P('M-4 170h248v74H-4z', '#1E88E5', 0) + P('M20 180c20-40 180-40 200 0z', '#90A4AE', 3) + P('M30 172c20-24 160-24 180 0z', '#66BB6A', 0)
    + pine(40, 160, 0.9) + pine(200, 160, 1)
    + R(70, 108, 100, 60, '#FFF59D', 2, 3.5) + P('M64 108l56-30 56 30z', '#E53935', 3) + Lc('M70 116c8 6 16 6 24 0s16-6 24 0 16 6 24 0 16-6 24 0', '#FFFFFF', 3)
    + R(132, 60, 26, 48, '#FFFFFF', 2, 3) + P('M130 60c-6-16 10-24 15-34 5 10 21 18 15 34z', '#43A047', 3) + Lc('M145 26v-10', INK, 2)
    + [[84, 126], [104, 126], [150, 126]].map(([x, y]) => R(x, y, 12, 18, '#90CAF9', 5, 2)).join('') + R(118, 140, 16, 28, '#8D6E63', 6, 2.5)
    + R(170, 176, 50, 6, '#8D6E63', 0, 2) + g(212, 198, 1, P('M-16-4h32l-6 10h-20z', '#FFFFFF', 2.5)) + face(98, 156, 0.28)),

  // ---------- Iceland
  X('is', 'animal', 'puffin', 'นกพัฟฟินจะงอยปากสีสด', 'A puffin with a beak full of fish', ['puffin', 'นกพัฟฟิน', 'atlantic puffin', 'นกพัฟฟินแอตแลนติก', 'lundi', 'ลุนดิ', 'seabird', 'นกทะเล', 'colourful beak', 'cliff bird'],
    // a round black-and-white puffin with orange feet and a big striped orange, yellow and grey beak holding a row of little silver fish, standing on a grassy clifftop tuft
    E(120, 204, 70, 14, '#7CB342', 3) + Lc('M70 200c4-10 10-14 14-10M150 202c4-10 10-12 12-8', '#43A047', 3)
    + g(120, 130, 1, E(0, 10, 44, 56, '#263238', 3.5) + E(4, 26, 30, 38, '#FFFFFF', 3) + C(0, -40, 34, '#263238', 3.5) + E(-2, -38, 24, 20, '#ECEFF1', 2.5)
      + P('M18-46c22-8 40 0 40 14-10 10-28 10-40 4z', '#FF7043', 3) + Lc('M30-48c4 6 4 14 0 20', '#FFCA28', 4) + Lc('M22-46c2 6 2 12 0 18', '#90A4AE', 3)
      + [-30, -24, -18].map((y) => E(46, y, 14, 3.5, '#CFD8DC', 1.5)).join('') + face(-6, -40, 0.32) + E(-36, 6, 12, 26, '#37474F', 2.5)
      + P('M-18 62l-14 10h20zM14 62l-6 10h20z', '#FF7043', 2.5))),
  X('is', 'food', 'rugbraud', 'ขนมปังไรย์อบใต้ดินร้อน', 'Hot-spring rye bread baked in the ground', ['hverabrauð', 'ขนมปังแควราเบรอด', 'geothermal bread', 'ขนมปังอบใต้ดินร้อน', 'lava bread', 'ขนมปังลาวา', 'rúgbrauð', 'รูกเบรอด', 'icelandic rye bread', 'bread dug from the ground'],
    // a lidded metal pot being dug out of steaming black ground with a little shovel, beside it a dark brown rye loaf turned out on a board with a slice and a pat of butter
    P('M10 170c40-20 180-20 220 0v24H10z', '#5D4037', 3) + Lc('M50 160c-8-12 6-18-2-32M80 154c-8-12 6-18-2-32', '#FFFFFF', 5) + Lc('M50 160c-8-12 6-18-2-32M80 154c-8-12 6-18-2-32', '#B0BEC5', 1.5)
    + g(68, 156, 1, R(-26, -26, 52, 40, '#B0BEC5', 6, 3) + E(0, -26, 28, 7, '#CFD8DC', 3) + Lc('M-6-34h12', INK, 4)) + g(28, 126, 1, Lc('M0 0l20 30', '#8D6E63', 5) + P('M14 26l14 22 10-8-14-22z', '#90A4AE', 2.5))
    + R(118, 168, 108, 14, '#C8A165', 4, 3) + g(166, 140, 1, P('M-42 28v-36c0-24 84-24 84 0v36z', '#5D3A1E', 3.5) + E(0, -8, 38, 10, '#7B4A26', 0) + face(0, 8, 0.38))
    + g(216, 150, 1, R(-8, -14, 16, 32, '#6D4C2E', 3, 2.5) + R(-6, -18, 12, 8, '#FFF59D', 2, 2))),
  X('is', 'culture', 'yulecat', 'แมวคริสต์มาสยักษ์ของไอซ์แลนด์', 'The Yule Cat peeking over the roofs', ['yule cat', 'แมวคริสต์มาส', 'jólakötturinn', 'โยลาเคิตตูรินน์', 'icelandic folklore', 'นิทานไอซ์แลนด์', 'new clothes for christmas', 'เสื้อผ้าใหม่วันคริสต์มาส', 'giant cat', 'christmas tale'],
    // a giant fluffy black cat with big yellow eyes peeking over a row of little snowy houses with warm lit windows, one paw on a roof, a child below proudly wearing a brand-new red woolly sweater
    P('M20 120c-6-60 30-90 100-90s106 30 100 90z', '#263238', 3.5) + P('M40 70l-10-46 36 24zM200 70l10-46-36 24z', '#263238', 3.5) + P('M44 56l-6-22 18 14zM196 56l6-22-18 14z', '#F48FB1', 0)
    + E(84, 80, 16, 14, '#FFEB3B', 3) + E(156, 80, 16, 14, '#FFEB3B', 3) + E(84, 80, 5, 10, INK, 0) + E(156, 80, 5, 10, INK, 0) + C(87, 75, 2.5, '#FFFFFF', 0) + C(159, 75, 2.5, '#FFFFFF', 0)
    + P('M114 100h12l-6 7z', '#F48FB1', 2) + Lc('M120 107c-4 6-10 6-14 2M120 107c4 6 10 6 14 2', INK, 2.5) + Lc('M70 104l-30-4M70 110l-30 6M170 104l30-4M170 110l30 6', '#ECEFF1', 2) + E(64, 98, 8, 5, '#FF8FA3', 0) + E(176, 98, 8, 5, '#FF8FA3', 0)
    + [[50, 140], [120, 132], [190, 140]].map(([x, y]) => R(x - 30, y, 60, 70, '#ECEFF1', 2, 3) + P(`M${x - 36} ${y}l36-28 36 28z`, '#FFFFFF', 3) + R(x - 10, y + 16, 20, 18, '#FFCA28', 2, 2.5)).join('')
    + E(172, 112, 20, 12, '#263238', 3) + Lc('M162 116v6M172 118v6M182 116v6', '#455A64', 2)
    + g(120, 222, 1, C(0, -26, 10, '#FFE0BD', 2.5) + P('M-14 6v-22c0-6 28-6 28 0v22z', '#E53935', 2.5) + Lc('M-12-8h24', '#FFFFFF', 2) + face(0, -24, 0.26))),
  X('is', 'culture', 'elfhouse', 'บ้านเอลฟ์จิ๋วในก้อนหินลาวา', 'Tiny elf houses in a lava rock', ['elf house', 'บ้านเอลฟ์', 'álfhóll', 'อัลฟ์โฮตล์', 'hidden people', 'ชาวซ่อนเร้น', 'huldufólk', 'ฮุลดูโฟล์ก', 'icelandic folklore', 'tiny doors'],
    // a big mossy lava rock with three tiny painted wooden houses tucked into it, little red and blue doors, a tiny ladder and lantern, a child crouching to peek at them
    E(120, 196, 100, 16, '#8BC34A', 3) + P('M30 196c-10-60 30-110 90-110s104 50 90 110z', '#616161', 3.5) + P('M40 150c20-50 120-70 160-20', 'none', 0) + P('M36 150c20-40 60-64 90-60', '#7CB342', 0) + P('M140 96c30 6 56 26 64 60-20-30-40-40-64-40z', '#7CB342', 0) + P('M30 196c-10-60 30-110 90-110s104 50 90 110z', 'none', 3.5)
    + [[80, 156, '#E53935'], [130, 136, '#1E88E5'], [168, 168, '#FFCA28']].map(([x, y, c]) => R(x - 14, y, 28, 24, '#FFFFFF', 1, 2.5) + P(`M${x - 18} ${y}l18-14 18 14z`, c, 2.5) + R(x - 5, y + 10, 10, 14, c, 4, 2) + C(x + 3, y + 17, 1.2, INK, 0)).join('')
    + Lc('M100 196l8-30M108 196l8-30', '#8D6E63', 2.5) + Lc('M102 186h8M104 176h8', '#8D6E63', 2) + face(120, 108, 0.35) + kid(212, 196, '#E91E63', 0.9)),

  // ---------- Reykjavík
  L('is/reykjavik/landmark-rainbowstreet.v1.svg', 'ถนนสีรุ้งในใจกลางเมือง', 'The rainbow-painted street', ['rainbow street', 'ถนนสีรุ้ง', 'skólavörðustígur', 'สโกลาเวอร์ดุสติกูร์', 'painted road', 'ถนนทาสี', 'laugavegur', 'เลาการ์เวกูร์', 'colourful shops', 'downtown walk'], 'หาแถบสีรุ้งที่ทาบนถนน', 'Find the rainbow stripes painted on the road',
    // a sloping street painted in wide rainbow stripes running up the hill between little corrugated-roof shops in bright colours, children walking on the stripes
    sky('#E1F5FE') + [[0, '#FFCC80'], [176, '#B39DDB']].map(([x, c]) => R(x, 60, 64, 140, c, 2, 3) + P(`M${x - 4} 60l36-24 36 24z`, '#E53935', 3) + R(x + 12, 90, 16, 20, '#FFFFFF', 2, 2) + R(x + 36, 90, 16, 20, '#FFFFFF', 2, 2) + R(x + 12, 140, 16, 20, '#FFFFFF', 2, 2) + R(x + 36, 140, 16, 60, '#5D4037', 2, 2)).join('')
    + P('M64 200L104 70h32l40 130z', '#ECEFF1', 3) + ['#E53935', '#FB8C00', '#FDD835', '#43A047', '#1E88E5', '#8E24AA'].map((c, k) => { const a = 104 + k * 5.33, b = 64 + k * 18.66; return P(`M${b} 200L${a} 70h5.3L${b + 18.66} 200z`, c, 0); }).join('') + P('M64 200L104 70h32l40 130z', 'none', 3)
    + R(-4, 200, 248, 44, '#90A4AE', 0, 3) + face(120, 160, 0.38) + kid(100, 196, '#FFFFFF', 0.9) + kid(140, 180, '#FFCA28', 0.75)),
  L('is/reykjavik/landmark-kirkjufell.v1.svg', 'ภูเขาเคิร์กจูเฟตล์รูปหัวลูกศร', 'Kirkjufell, the arrowhead mountain', ['kirkjufell', 'ภูเขาเคิร์กจูเฟตล์', 'arrowhead mountain', 'ภูเขารูปหัวลูกศร', 'snæfellsnes', 'สไนเฟลส์เนส', 'grundarfjörður', 'กรุนดาร์ฟยอร์ดูร์', 'most photographed mountain', 'striped mountain'], 'หาลายทางสีเขียวที่พาดรอบภูเขา', 'Find the green stripes wrapped round the mountain',
    // a steep cone of a mountain leaning like an arrowhead, wrapped in horizontal green and brown bands, standing alone by a calm bay that mirrors it, a pink evening sky
    sky('#F8BBD0') + C(190, 50, 14, '#FFE082', 2) + P('M-4 160h248v84H-4z', '#5C6BC0', 0)
    + P('M40 160c20-40 50-110 80-130 20 20 50 60 80 130z', '#6D4C41', 3.5) + [70, 100, 130].map((y) => Lc(`M${44 + (160 - y) * 0.5} ${y}c30 6 ${80 - (160 - y) * 0.6} 6 ${120 - (160 - y) * 0.9} 0`, '#7CB342', 7)).join('') + P('M120 30c-6 4-10 10-12 18 6-2 12 0 18 4 2-10-2-18-6-22z', '#FFFFFF', 2) + P('M40 160c20-40 50-110 80-130 20 20 50 60 80 130z', 'none', 3.5)
    + P('M40 160c20 30 50 60 80 70 20-10 50-30 80-70z', '#7986CB', 0) + Lc('M60 176h120M80 192h80', '#9FA8DA', 3) + P('M-4 160c20-10 40-10 44 0M244 160c-20-10-40-10-44 0', '#8BC34A', 2.5)
    + face(116, 120, 0.4) + kid(220, 160, '#FFCA28', 0.8)),
  L('is/reykjavik/landmark-settlement.v1.svg', 'ซากบ้านยาวไวกิ้งใต้เมือง', 'The Viking longhouse ruin under the city', ['settlement exhibition', 'นิทรรศการการตั้งถิ่นฐาน', 'reykjavík 871±2', 'เรคยาวิก 871', 'viking longhouse ruin', 'ซากบ้านยาวไวกิ้ง', 'turf walls', 'กำแพงดิน', 'underground museum', 'first settlers'], 'หาเตาไฟตรงกลางบ้านยาวโบราณ', 'Find the fire pit in the middle of the old longhouse',
    // an oval ring of low turf-and-stone walls seen from above in a dim museum hall, a long stone fire pit in the middle, a glowing glass rail round it and children looking down
    sky('#37474F') + P('M-4 200h248v44H-4z', '#455A64', 0) + E(120, 124, 104, 70, '#8D6E63', 0)
    + E(120, 124, 92, 56, '#6D4C41', 3) + E(120, 124, 76, 42, '#A1887F', 3) + Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2; return C(120 + 84 * Math.cos(a), 124 + 49 * Math.sin(a), 5, '#9E9E9E', 1.5); }).join('')
    + R(80, 116, 80, 16, '#757575', 6, 2.5) + P('M108 124c-2-10 6-16 6-22 4 6 10 10 8 22z', '#FF7043', 2) + P('M124 124c-2-8 4-12 4-18 4 6 8 8 6 18z', '#FFCA28', 2)
    + E(120, 124, 110, 76, 'none', 0) + Lc('M14 124c0-48 212-48 212 0', '#81D4FA', 3) + face(120, 150, 0.32)
    + kid(30, 220, '#FFCA28', 1) + kid(210, 220, '#E53935', 1) + kid(120, 230, '#66BB6A', 0.9)),
  L('is/reykjavik/landmark-insidevolcano.v1.svg', 'ลงลิฟต์ไปในปล่องภูเขาไฟทรีห์นูคากีกูร์', 'Riding a lift down inside the Þríhnúkagígur volcano', ['inside the volcano', 'ในปล่องภูเขาไฟ', 'þríhnúkagígur', 'ทรีห์นูคากีกูร์', 'magma chamber', 'โพรงแมกมา', 'open lift', 'ลิฟต์เปิด', 'dormant volcano', 'colourful cave walls'], 'หากระเช้าลิฟต์สีเหลืองที่ห้อยลงในปล่อง', 'Find the yellow lift basket hanging down into the crater',
    // a huge bottle-shaped cave inside a sleeping volcano, its walls striped in red, orange, yellow and purple rock, a small open yellow lift basket with children hanging on cables from the bright hole at the top
    sky('#4E342E') + P('M100 0h40c0 30 10 40 60 70 40 30 50 90 40 170H0c-10-80 0-140 40-170 50-30 60-40 60-70z', '#8D4E2A', 0)
    + Lc('M30 120c40-20 140-20 180 0', '#E64A19', 10) + Lc('M16 160c60-20 150-20 210 0', '#FFB300', 9) + Lc('M10 200c60-20 160-20 220 0', '#7E57C2', 9) + Lc('M50 86c30-14 110-14 140 0', '#FFCA28', 6)
    + P('M100 0h40c0 30 10 40 60 70 40 30 50 90 40 170H0c-10-80 0-140 40-170 50-30 60-40 60-70z', 'none', 4) + P('M100-4h40v14h-40z', '#FFF9C4', 0)
    + Lc('M110 0v86M130 0v86', INK, 2) + g(120, 104, 1, R(-30, -16, 60, 30, '#FFCA28', 3, 3) + Lc('M-30-4h60', '#F57F17', 2) + kid(-14, -14, '#E53935', 0.8) + kid(14, -14, '#1E88E5', 0.8))
    + P('M-4 228c60-10 190-10 248 0v16H-4z', '#3E2723', 0) + face(60, 180, 0.32)),
  L('is/reykjavik/landmark-lavamoss.v1.svg', 'ทุ่งลาวาคลุมมอสนุ่มสีเขียว', 'The soft green moss on the lava fields', ['lava field moss', 'มอสบนทุ่งลาวา', 'eldhraun', 'เอลด์ฮรอยน์', 'woolly fringe moss', 'มอสขนปุย', 'lava field', 'ทุ่งลาวา', 'please do not step', 'soft green humps'], 'หาก้อนลาวาที่ใส่เสื้อมอสนุ่มปุย', 'Find the lava lumps wearing fluffy moss coats',
    // a rolling field of round lava lumps all covered in thick fluffy pale-green moss like pillows, a wooden boardwalk along the edge with a child kneeling to touch it gently, misty mountains behind
    sky('#ECEFF1') + P('M-4 100l40-24 30 16 40-30 50 26 40-16 48 20v30H-4z', '#B0BEC5', 3)
    + [[20, 140, 40], [80, 130, 44], [150, 136, 40], [210, 140, 40], [50, 176, 44], [120, 172, 46], [190, 180, 44]].map(([x, y, r], i) => E(x, y, r, r * 0.6, '#9CCC65', 3) + E(x - r * 0.3, y - r * 0.25, r * 0.4, r * 0.2, '#C5E1A5', 0) + [[-10, 4], [8, -2], [16, 8]].map(([a, b]) => C(x + a, y + b, 2, '#7CB342', 0)).join('') + (i === 5 ? face(x, y, 0.4) : '')).join('')
    + R(-4, 206, 248, 14, '#A1673F', 2, 3) + [20, 70, 120, 170, 220].map((x) => Lc(`M${x} 206v14`, '#6D4C41', 2)).join('') + kid(80, 206, '#E53935', 0.9)),

  // ---------- Denmark
  X('dk', 'food', 'flodebolle', 'โฟลเดอบอลเลอ มาร์ชเมลโลว์เคลือบช็อกโกแลต', 'Flødeboller, chocolate-coated marshmallow domes', ['flødebolle', 'โฟลเดอบอลเลอ', 'chocolate marshmallow', 'มาร์ชเมลโลว์ช็อกโกแลต', 'cream bun', 'ขนมโดมช็อกโกแลต', 'marzipan base', 'ฐานมาร์ซิแพน', 'danish sweet', 'birthday treat'],
    // three shiny dark chocolate domes on round wafer bases, one bitten to show fluffy white marshmallow inside, another sprinkled with coconut, on a small plate
    E(120, 186, 104, 22, '#FFFFFF', 3) + E(120, 184, 88, 14, '#E1F5FE', 0)
    + [[64, 170, 0], [176, 170, 1], [120, 158, 2]].map(([x, y, t]) => g(x, y, 1, E(0, 6, 34, 8, '#E9C27A', 3) + P('M-30 4c0-50 60-50 60 0z', '#4E342E', 3.5) + E(-10, -24, 8, 5, '#8D6E63', 0)
      + (t === 1 ? [[-14, -16], [0, -26], [12, -14], [-4, -8], [16, -2], [-20, -2]].map(([a, b]) => R(a, b, 4, 2, '#FFFFFF', 1, 0)).join('') : '')
      + (t === 0 ? P('M10-34c6 0 12 4 14 10-6 2-6 8-2 12-6 2-8 8-4 12h-12z', '#FFFFFF', 2.5) : '') + (t === 2 ? face(0, -14, 0.35) : ''))).join('')),
  X('dk', 'culture', 'fastelavn', 'ฟาสเตลาวน์ ตีถังขนมแตก', 'Fastelavn: hitting the sweet barrel', ['fastelavn', 'ฟาสเตลาวน์', 'hit the barrel', 'ตีถังขนม', 'slå katten af tønden', 'ถังลูกกวาด', 'costumes', 'ชุดแฟนซี', 'cat king', 'carnival for kids'],
    // a wooden barrel painted with a smiling face hanging from a rope, sweets tumbling out of a broken slat, a child in a crown and costume with a little bat and more sweets already on the grass
    Lc('M40 20h160', '#8D6E63', 6) + Lc('M110 20v24', INK, 2.5)
    + g(110, 88, 1, P('M-34-44h68c8 30 8 58 0 88h-68c-8-30-8-58 0-88z', '#C08A55', 3.5) + Lc('M-38-24h76M-38 24h76', '#5D4037', 5) + Lc('M-14-44v88M14-44v88', '#A1673F', 2) + face(0, 0, 0.45))
    + [[96, 148, '#E53935'], [120, 160, '#FFCA28'], [110, 176, '#1E88E5'], [134, 140, '#66BB6A'], [88, 168, '#F06292']].map(([x, y, c]) => E(x, y, 7, 5, c, 2) + P(`M${x - 7} ${y}l-5-4v8zM${x + 7} ${y}l5-4v8z`, c, 1.5)).join('')
    + g(186, 196, 1, C(0, -40, 12, '#FFE0BD', 2.5) + P('M-10-52l4-10 6 8 6-8 4 10z', '#FFCA28', 2) + P('M-14 4v-26c0-8 28-8 28 0v26z', '#7E57C2', 2.5) + Lc('M-12-14l-22-30', '#A1673F', 5) + face(0, -38, 0.28))
    + [[40, 206], [64, 214]].map(([x, y]) => E(x, y, 7, 5, '#FFCA28', 2)).join('')),
  X('dk', 'food', 'risalamande', 'ริซาลามองด์ พุดดิ้งข้าวซ่อนอัลมอนด์', 'Risalamande, rice pudding with a hidden almond', ['risalamande', 'ริซาลามองด์', 'christmas rice pudding', 'พุดดิ้งข้าวคริสต์มาส', 'cherry sauce', 'ซอสเชอร์รี', 'hidden almond', 'อัลมอนด์ที่ซ่อนอยู่', 'almond present', 'danish christmas dessert'],
    // a glass bowl of creamy white rice pudding swirled with warm red cherry sauce, a spoon lifting out a whole almond, and beside it the prize: a little pink marzipan pig with a bow
    E(100, 180, 80, 14, '#FFFFFF', 3) + P('M30 110h140c0 50-30 74-70 74s-70-24-70-74z', '#E1F5FE', 3.5) + E(100, 110, 70, 14, '#FFFDF5', 3)
    + [[-40, 2], [-20, -4], [0, 4], [20, -2], [40, 4]].map(([x, y]) => E(100 + x, 110 + y, 4, 2, '#FFF3E0', 1)).join('') + P('M60 108c20-10 40 10 60-4s30 0 36 4c-20 8-40 6-56 10s-30 0-40-10z', '#C62828', 2.5)
    + g(132, 76, 1, Lc('M-34 32l30-30', '#B0BEC5', 6) + Lc('M-34 32l30-30', INK, 1) + E(4, -6, 14, 10, '#ECEFF1', 2.5) + E(4, -8, 6, 4, '#D7A35F', 2))
    + face(100, 146, 0.4)
    + g(196, 172, 1, E(0, 0, 26, 18, '#F8BBD0', 3) + C(22, -4, 12, '#F8BBD0', 3) + P('M24-18l4-8 6 8z', '#F48FB1', 2) + C(30, -2, 3, '#F48FB1', 1.5) + Lc('M-26 0c-8-4-8-12 0-12', '#F48FB1', 2.5) + Lc('M-14 16v6M12 16v6', '#F48FB1', 4) + P('M4-18l-8-8v16zM4-18l8-8v16z', '#E53935', 2) + face(20, -6, 0.2))),
  X('dk', 'culture', 'grenen', 'กรีเนิน ปลายแหลมที่สองทะเลมาเจอกัน', 'Grenen, where two seas meet', ['grenen', 'กรีเนิน', 'skagen', 'สแกเกิน', 'where two seas meet', 'สองทะเลบรรจบกัน', 'skagerrak and kattegat', 'สแกเกอร์รักกับคัตเตกัต', 'sand spit', 'tip of denmark'],
    // a long pointed sandy spit seen from above with waves crashing in from both sides and meeting in a line of white foam at the tip, a child standing with one foot in each sea
    C(120, 120, 104, '#4FC3F7', 3.5) + P('M120 16a104 104 0 0 1 0 208z', '#1E88E5', 0) + C(120, 120, 104, 'none', 3.5)
    + P('M70 224c10-60 30-120 50-150 20 30 40 90 50 150z', '#FFE0B2', 3.5) + Lc('M120 74c-4-20 0-40 0-58', '#FFFFFF', 7) + Lc('M120 74c-4-20 0-40 0-58', '#B3E5FC', 2)
    + Lc('M30 80c10 6 20 6 30 0M40 120c10 6 20 6 30 0M170 90c10 6 20 6 30 0M180 140c10 6 20 6 30 0', '#FFFFFF', 3)
    + g(120, 100, 1, Lc('M-4 0l-8 14M4 0l8 14', '#FFE0BD', 5) + R(-8, -24, 16, 24, '#E53935', 4, 2.5) + C(0, -32, 9, '#FFE0BD', 2.5) + face(0, -30, 0.24))
    + face(120, 170, 0.4)),

  // ---------- Copenhagen
  L('dk/copenhagen/landmark-kronborg.v1.svg', 'ปราสาทโครนบอร์กยอดทองแดงเขียวริมทะเล', 'Kronborg Castle and its green copper spires', ['kronborg castle', 'ปราสาทโครนบอร์ก', 'helsingør', 'เฮลซิงเงอร์', 'hamlets castle', 'ปราสาทแฮมเลต', 'green copper spires', 'ยอดทองแดงเขียว', 'øresund', 'renaissance castle'], 'หายอดหอคอยสีเขียวที่สูงไม่เท่ากัน', 'Find the green spires that are all different heights',
    // a big square sandstone castle with copper-green roofs and four towers of different heights topped with green onion-and-needle spires, star-shaped grassy ramparts and the sea in front
    sky('#E1F5FE') + P('M-4 190h248v54H-4z', '#1E88E5', 0) + P('M10 196l20-30h180l20 30z', '#8BC34A', 3)
    + R(40, 100, 160, 70, '#E8DCC0', 2, 3.5) + P('M36 100l20-24h128l20 24z', '#4DB6AC', 3) + Array.from({ length: 2 }, (_, r) => Array.from({ length: 7 }, (_, k) => R(52 + k * 21, 112 + r * 28, 10, 16, '#90A4AE', 4, 1.5)).join('')).join('')
    + [[48, 70, 56], [96, 64, 40], [150, 56, 30], [192, 76, 62]].map(([x, w, top], i) => R(x - 12, top + 40, 24, 170 - top - 40, '#E8DCC0', 2, 3) + P(`M${x - 14} ${top + 40}c0-12 28-12 28 0z`, '#4DB6AC', 2.5) + R(x - 6, top + 22, 12, 14, '#4DB6AC', 2, 2) + P(`M${x - 8} ${top + 22}c-2-10 8-14 8-20 0 6 10 10 8 20z`, '#4DB6AC', 2.5) + Lc(`M${x} ${top + 2}V${top - 16 - i * 4}`, INK, 2.5) + C(x, top - 16 - i * 4, 2.5, '#FFCA28', 1.2)).join('')
    + face(120, 150, 0.38)),
  L('dk/copenhagen/landmark-grundtvig.v1.svg', 'โบสถ์กรุนท์วิกส์หน้าตาเหมือนออร์แกนยักษ์', 'Grundtvig’s Church with its organ-pipe front', ['grundtvigs church', 'โบสถ์กรุนท์วิกส์', 'grundtvigs kirke', 'กรุนท์วิกส์เคียร์เกอ', 'organ pipe facade', 'ด้านหน้าเหมือนท่อออร์แกน', 'yellow brick', 'อิฐเหลือง', 'bispebjerg', 'expressionist building'], 'หาแท่งอิฐที่สูงขึ้นเป็นขั้นบันไดเหมือนท่อออร์แกน', 'Find the brick ribs that rise in steps like organ pipes',
    // a tall pale-yellow brick front that rises in a sharp stepped gable made of many thin vertical ribs like the pipes of a giant organ, a small arched door at its foot and little houses beside it
    sky('#E3F2FD') + R(-4, 150, 60, 60, '#EF9A9A', 2, 3) + R(184, 150, 60, 60, '#EF9A9A', 2, 3) + P('M-8 150l34-24 34 24zM180 150l34-24 34 24z', '#8D6E63', 3)
    + (() => { let d = 'M50 210V150'; const n = 13; for (let k = 0; k < n; k++) { const x = 50 + k * 10.77, h = 150 - 110 * (1 - Math.abs(k - 6) / 7); d += `L${x.toFixed(1)} ${h.toFixed(1)}H${(x + 10.77).toFixed(1)}`; } return P(d + 'V210z', '#F3D99A', 3.5) + Array.from({ length: 12 }, (_, k) => Lc(`M${(60.8 + k * 10.77).toFixed(1)} 206V${(150 - 110 * (1 - Math.abs(k + 0.5 - 6) / 7) + 8).toFixed(1)}`, '#D9B86A', 2.5)).join(''); })()
    + R(50, 170, 140, 40, '#F3D99A', 0, 3) + P('M106 210v-26c0-18 28-18 28 0v26z', '#6D4C41', 3) + Lc('M50 170h140', '#D9B86A', 3)
    + R(-4, 210, 248, 34, '#B0BEC5', 0, 3) + face(120, 120, 0.4) + kid(40, 230, '#1E88E5', 0.9)),
  L('dk/copenhagen/landmark-kastellet.v1.svg', 'ป้อมรูปดาวคาสเตลเลต์กับกังหันลม', 'Kastellet, the star-shaped fortress', ['kastellet', 'ป้อมคาสเตลเลต์', 'star fortress', 'ป้อมรูปดาว', 'red barracks', 'โรงทหารสีแดง', 'ramparts walk', 'เดินบนกำแพงดิน', 'windmill on the ramparts', 'moat'], 'หากังหันลมที่ยืนอยู่บนกำแพงป้อม', 'Find the windmill standing on the fort’s green wall',
    // a five-pointed grassy star fortress seen from above inside a star-shaped moat, long red barrack houses in rows in the middle and a little black windmill on one point
    C(120, 120, 108, '#4FC3F7', 3.5)
    + (() => { const pt = (r1, r2) => Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + (k * Math.PI) / 5, r = k % 2 ? r2 : r1; return `${(120 + r * Math.cos(a)).toFixed(1)} ${(120 + r * Math.sin(a)).toFixed(1)}`; }).join('L'); return P(`M${pt(98, 58)}z`, '#7CB342', 3.5) + P(`M${pt(74, 46)}z`, '#AED581', 2.5); })()
    + [104, 122, 140].map((y) => R(86, y - 6, 68, 12, '#E53935', 2, 2.5) + Lc(`M90 ${y - 6}h60`, '#B71C1C', 2)).join('')
    + g(120, 32, 1, P('M-8 10l4-22h8l4 22z', '#37474F', 2.5) + Lc('M0-10l-16-16M0-10l16-16M0-10l-16 14M0-10l16 14', '#8D6E63', 4) + C(0, -10, 3, INK, 0))
    + C(120, 120, 108, 'none', 3.5) + face(120, 162, 0.3)),
  L('dk/copenhagen/landmark-blackdiamond.v1.svg', 'ห้องสมุดเพชรดำริมท่าเรือ', 'The Black Diamond library on the harbour', ['black diamond', 'แบล็กไดมอนด์', 'den sorte diamant', 'เดนโซร์เตดิอามันต์', 'royal library', 'ห้องสมุดหลวง', 'black glass building', 'ตึกกระจกดำ', 'harbour front', 'slanted building'], 'หาตึกสีดำเอียงที่สะท้อนน้ำ', 'Find the slanted black building that reflects the water',
    // a sharp, leaning block of shiny black granite and dark glass on the harbour edge, split by a tall glass cut in the middle, the water mirroring it and a harbour bus sliding past
    sky('#E1F5FE') + P('M-4 170h248v74H-4z', '#4FC3F7', 0)
    + P('M40 170L56 70 120 56 184 70 204 170z', '#263238', 3.5) + P('M112 58l4 112h12l-4-112z', '#B3E5FC', 2.5) + Lc('M60 80l50-10M60 110l50-8M60 140l52-6M132 68l48 10M132 100l50 8M132 132l54 8', '#546E7A', 2) + P('M56 70L120 56 184 70', 'none', 3.5)
    + P('M40 170L56 214 120 226 184 214 204 170z', '#455A64', 0) + Lc('M60 186h120M70 202h100', '#4FC3F7', 3)
    + g(196, 200, 1, P('M-30-8h60l-8 14h-44z', '#FFCA28', 2.5) + R(-16, -18, 24, 10, '#FFCA28', 2, 2)) + face(84, 116, 0.38)),
  L('dk/copenhagen/landmark-superkilen.v1.svg', 'สวนซูเปอร์คีเลินลายทางขาวดำกับสไลเดอร์ปลาหมึก', 'Superkilen park with its swirly stripes and octopus slide', ['superkilen', 'สวนซูเปอร์คีเลิน', 'striped park', 'สวนลายทาง', 'black square', 'ลานลายเส้น', 'octopus slide', 'สไลเดอร์ปลาหมึก', 'nørrebro', 'playground'], 'หาปลาหมึกยักษ์ที่เป็นสไลเดอร์', 'Find the giant octopus that is a slide',
    // a black square crossed by wavy white stripes that bend round little hills, a big pink octopus-shaped slide with tentacle slides curling down, a red patch of ground and children playing
    sky('#E1F5FE') + P('M-4 120h248v124H-4z', '#263238', 0) + [0, 1, 2, 3, 4, 5, 6].map((k) => Lc(`M-4 ${132 + k * 16}c60 ${k % 2 ? 20 : -20} 120 ${k % 2 ? -20 : 20} 248 0`, '#FFFFFF', 4)).join('') + P('M-4 120h70v40H-4z', '#E53935', 0)
    + g(140, 150, 1, P('M-40 30c-6-60 10-90 40-90s46 30 40 90z', '#F48FB1', 3.5) + [[-36, 30, -60, 70], [-12, 30, -24, 76], [12, 30, 24, 76], [36, 30, 60, 70]].map(([a, b, c, d]) => Lc(`M${a} ${b}C${a} ${b + 30} ${c} ${d - 10} ${c} ${d}`, INK, 15) + Lc(`M${a} ${b}C${a} ${b + 30} ${c} ${d - 10} ${c} ${d}`, '#F48FB1', 10)).join('') + face(0, -24, 0.55) + [[-20, 0], [0, 6], [20, 0]].map(([x, y]) => C(x, y, 4, '#F8BBD0', 1.5)).join(''))
    + kid(40, 210, '#FFCA28', 1) + kid(204, 222, '#4FC3F7', 0.9)),
];

export default { places: {}, items };
