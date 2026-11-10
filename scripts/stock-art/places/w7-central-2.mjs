// Wave 7 (central Europe, part 2): Český Krumlov and Karlovy Vary, Hungary, Budapest, Berlin and Potsdam, Rothenburg and Nuremberg, Heidelberg, Frankfurt and the Black Forest
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (cz/krumlov/landmark-cloakbridge.v1.svg → cz-krumlov.landmark.cloakbridge)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture)
const F = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const wins = (x, y, n, dx, w, h, fill = '#B3E5FC') => Array.from({ length: n }, (_, k) => R(x + k * dx, y, w, h, fill, 1, 1.5)).join('');
const tree = (x, y, s = 1, c = '#43A047') => g(x, y, s, C(0, -16, 16, c, 2.5) + R(-3, 0, 6, 10, '#6D4C41', 0, 2));
const fir = (x, y, s = 1, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', c, 2) + R(-3, 0, 6, 6, '#6D4C41', 0, 1.5));
// a side-on horse (head to the right), standing at 0 0 on its hooves
const horse = (c, mane) => E(0, -34, 30, 14, c) + Lc('M-22-24v24M-12-22v22M14-22v22M24-24v24', c, 7) + P('M22-42l12-22c4-6 14-6 18 0l2 8-14 4-6 16z', c) + Lc('M24-50l10-18', mane, 5) + Lc('M-30-38c-10 4-12 14-8 22', mane, 5) + C(44, -60, 1.8, INK, 0);

const items = [
  // ---------- Český Krumlov and Karlovy Vary
  L('cz/krumlov/landmark-cloakbridge.v1.svg', 'สะพานคลุมหลายชั้นของปราสาทครุมลอฟ', 'The Cloak Bridge, the castle\'s three-storey bridge', ['cloak bridge', 'สะพานคลุม', 'plášťový most', 'plastovy most', 'castle bridge', 'สะพานปราสาท', 'covered corridor', 'ทางเดินมีหลังคา', 'stone arches', 'deep moat'], 'หาสะพานที่มีซุ้มโค้งซ้อนกันสามชั้น', 'Find the bridge with three rows of arches stacked on top of each other',
    // a tall bridge of three stacked rows of stone arches across a deep wooded ravine, a covered corridor with little windows running along the top to the castle, the painted round tower peeking behind
    sky('#E3F2FD') + R(176, 10, 26, 60, '#F8BBD0', 0, 3) + P('M172 10c6-16 28-16 34 0z', '#4DB6AC', 3) + R(184, 24, 10, 12, '#FFFFFF', 1, 2)
      + P('M-4 244V100l30 10v134zM244 244V90l-30 14v140z', '#8D8D7A', 3) + [[10, 170], [230, 160]].map(([x, y]) => fir(x, y, 0.9, '#33691E')).join('')
      + R(26, 60, 188, 30, '#FFF8E1', 0, 3) + P('M22 60l10-14h176l10 14z', '#E64A19', 3) + wins(38, 68, 9, 20, 10, 12, '#90CAF9')
      + R(26, 90, 188, 154, '#E0D6C8', 0, 3)
      + [[94, 5, 40], [138, 4, 46], [188, 3, 56]].map(([y, n, h]) => Array.from({ length: n }, (_, k) => { const w = 188 / n; const x = 26 + k * w; return P(`M${x + 7} ${y + h}v-${(h - w / 2 + 4).toFixed(1)}c0-${(w / 1.6).toFixed(1)} ${(w - 14).toFixed(1)}-${(w / 1.6).toFixed(1)} ${(w - 14).toFixed(1)} 0v${(h - w / 2 + 4).toFixed(1)}z`, '#E3F2FD', 2.5); }).join('')).join('')
      + P('M26 244c20-24 50-30 94-30s74 6 94 30z', '#558B2F', 3) + Lc('M70 236c30-8 70-8 100 0', '#4FC3F7', 5) + [[50, 236], [196, 238]].map(([x, y]) => fir(x, y, 0.7, '#33691E')).join('')
      + kid(100, 86, '#E53935', 0.55) + kid(140, 86, '#1E88E5', 0.55)),
  L('cz/krumlov/landmark-revolvingtheatre.v1.svg', 'โรงละครกลางแจ้งที่อัฒจันทร์หมุนได้', 'The revolving open-air theatre in the castle garden', ['revolving theatre', 'โรงละครหมุน', 'otáčivé hlediště', 'open-air theatre', 'โรงละครกลางแจ้ง', 'castle garden', 'สวนปราสาท', 'bellarie', 'summer play', 'ละครฤดูร้อน'], 'หาอัฒจันทร์ทรงกลมที่หมุนไปหาเวทีได้', 'Find the round seating that turns around to face the stage',
    // a round tiered stand of seats on a big turntable among tall trees, curved arrows showing it spinning, children sitting in it, a little garden summerhouse as the stage behind
    sky('#E8F5E9') + [[20, 120], [60, 100], [180, 100], [222, 120]].map(([x, y]) => tree(x, y, 1.5, '#388E3C')).join('') + P('M-4 120h248v124H-4z', '#9CCC65', 0)
      + R(96, 70, 48, 34, '#FFF8E1', 0, 3) + P('M90 70l30-20 30 20z', '#E64A19', 3) + P('M112 104v-16c0-10 16-10 16 0v16z', '#8D6E63', 2.5) + R(70, 104, 100, 10, '#D7CCC8', 0, 2.5)
      + E(120, 200, 100, 30, '#8D6E63', 3) + E(120, 190, 96, 26, '#A1887F', 3) + P('M44 186c0-30 152-30 152 0l-10 10H54z', '#455A64', 3)
      + [[60, 170], [80, 160], [100, 156], [120, 156], [140, 156], [160, 160], [180, 170]].map(([x, y], k) => kid(x, y + 12, ['#E53935', '#FFCA28', '#1E88E5', '#43A047'][k % 4], 0.8)).join('')
      + Lc('M30 214c10 14 30 20 50 22', '#E53935', 4) + P('M78 240l8-4-6-6z', '#E53935', 2) + Lc('M210 214c-10 14-30 20-50 22', '#E53935', 4) + P('M162 240l-8-4 6-6z', '#E53935', 2) + face(120, 86, 0.3)),
  L('cz/krumlov/landmark-rosefestival.v1.svg', 'เทศกาลกุหลาบห้ากลีบแห่งครุมลอฟ', 'The Festival of the Five-Petalled Rose', ['five-petalled rose festival', 'เทศกาลกุหลาบห้ากลีบ', 'slavnosti pětilisté růže', 'medieval festival', 'เทศกาลยุคกลาง', 'juggler', 'นักโยนลูกบอล', 'costume parade', 'ขบวนแต่งกายย้อนยุค', 'june in krumlov'], 'หากุหลาบแดงห้ากลีบบนป้ายใหญ่', 'Find the big red rose with five petals on the banner',
    // a child dressed in a medieval tunic and feathered cap juggling coloured balls, in front of a hanging banner with a big red five-petalled rose, bunting strung across the street
    sky('#FFF8E1') + Lc('M-4 30c60 30 180 30 248 0', INK, 2) + Array.from({ length: 9 }, (_, k) => P(`M${10 + k * 26} ${36 + Math.sin(k / 8 * Math.PI) * 18}l8 14 8-14z`, ['#E53935', '#FFFFFF', '#FFCA28'][k % 3], 2)).join('')
      + R(130, 50, 90, 110, '#FFFFFF', 2, 3) + P('M130 160l15 14 15-14 15 14 15-14 15 14 15-14', 'none', 3) + Lc('M126 50h98', '#8D6E63', 5)
      + g(175, 104, 1, Array.from({ length: 5 }, (_, k) => g(0, 0, 1, C(0, -20, 15, '#E53935', 2.5), k * 72)).join('') + C(0, 0, 13, '#FFCA28', 2.5) + Array.from({ length: 5 }, (_, k) => g(0, 0, 1, P('M0-32l3 6h-6z', '#43A047', 1.5), k * 72 + 36)).join(''))
      + P('M-4 220h248v24H-4z', '#BCAAA4', 3)
      + g(70, 220, 1, P('M-22 0l6-44h32l6 44z', '#1E88E5') + P('M-16-44h32l-4 18h-24z', '#FFCA28', 2.5) + C(0, -62, 14, '#FFE0BD') + P('M-16-70c4-12 28-12 32 0z', '#2E7D32') + Lc('M12-74c8-8 16-8 22-4', '#E53935', 4) + Lc('M-16-36l-20-24M16-36l20-24', '#FFE0BD', 6) + face(0, -60, 0.32))
      + [[24, 120, '#E53935'], [70, 92, '#FFCA28'], [116, 120, '#43A047']].map(([x, y, c]) => C(x, y, 9, c, 2.5)).join('') + Lc('M30 106c10-14 28-18 36-14M76 96c16-4 30 4 36 14', INK, 1.5)),
  L('cz/krumlov/landmark-cascade.v1.svg', 'น้ำพุขั้นบันไดในสวนปราสาทครุมลอฟ', 'The cascade fountain in the castle garden', ['cascade fountain', 'น้ำพุขั้นบันได', 'kaskádová fontána', 'castle garden', 'สวนปราสาท', 'water steps', 'น้ำตกขั้นบันไดในสวน', 'baroque garden', 'สวนบาโรก', 'krumlov castle'], 'หาน้ำที่ไหลลงทีละขั้นเหมือนบันได', 'Find the water tumbling down step by step like a staircase',
    // a wide baroque fountain of stepped stone ledges with sheets of water sliding down each step into a curved pool, stone vases on the sides, clipped hedges and a child dipping a hand
    sky('#E3F2FD') + P('M-4 70h248v40H-4z', '#2E7D32', 3) + Array.from({ length: 6 }, (_, k) => C(10 + k * 44, 70, 18, '#388E3C', 3)).join('') + P('M-4 110h248v134H-4z', '#D7CCC8', 0)
      + [[60, 92, 120], [52, 116, 136], [44, 140, 152], [36, 164, 168]].map(([x, y, w]) => R(x, y, w, 14, '#E0E0E0', 1, 3) + R(x + 6, y + 14, w - 12, 10, '#4FC3F7', 0, 2) + Array.from({ length: Math.floor(w / 16) }, (_, k) => Lc(`M${x + 12 + k * 16} ${y + 15}v8`, '#E1F5FE', 2)).join('')).join('')
      + P('M20 190h200c0 26-40 40-100 40S20 216 20 190z', '#4FC3F7', 3) + E(120, 190, 100, 10, '#81D4FA', 3) + Lc('M60 210c20 6 40 6 60 0', '#E1F5FE', 3)
      + [[30, 150], [210, 150]].map(([x, y]) => R(x - 10, y, 20, 40, '#BDBDBD', 1, 2.5) + P(`M${x - 14} ${y}c0-20 28-20 28 0z`, '#BDBDBD', 2.5) + C(x, y - 18, 6, '#E53935', 2)).join('')
      + kid(196, 236, '#AB47BC') + face(120, 98, 0.3)),
  L('cz/krumlov/landmark-colonnade.v1.svg', 'ระเบียงเสาโรงสีที่คาร์โลวีวารี', 'The Mill Colonnade in Karlovy Vary', ['mill colonnade', 'ระเบียงเสาโรงสี', 'mlýnská kolonáda', 'karlovy vary', 'คาร์โลวีวารี', 'spa cup', 'ถ้วยจิบน้ำแร่', 'mineral spring', 'น้ำแร่', 'spa town'], 'หาถ้วยจิบน้ำแร่ที่มีหลอดในตัวตรงหูจับ', 'Find the little sipping cup with a spout in its handle',
    // a long row of tall pale classical columns holding a roof with a balustrade, a stone spout of spring water in front, a child holding a little porcelain spa cup with a spout in its handle
    sky('#E1F5FE') + R(-4, 50, 248, 20, '#FFF8E1', 0, 3) + Array.from({ length: 16 }, (_, k) => R(-2 + k * 16, 40, 8, 10, '#FFF8E1', 2, 2)).join('') + R(-4, 70, 248, 10, '#E0D6C8', 0, 3)
      + R(-4, 80, 248, 120, '#ECEFF1', 0, 0) + Array.from({ length: 8 }, (_, k) => R(4 + k * 32, 80, 14, 120, '#FFFFFF', 1, 2.5) + R(1 + k * 32, 80, 20, 6, '#E0D6C8', 0, 2) + R(1 + k * 32, 194, 20, 6, '#E0D6C8', 0, 2)).join('')
      + P('M-4 200h248v44H-4z', '#BDBDBD', 3) + R(30, 160, 26, 40, '#BCAAA4', 2, 2.5) + Lc('M43 168c10 0 14 6 14 16', '#4FC3F7', 4)
      + g(150, 230, 1, C(0, -40, 13, '#FFE0BD', 2.5) + P('M-14 0v-30h28v30z', '#EC407A', 2.5) + face(0, -38, 0.3))
      + g(186, 178, 1, P('M-16-14h28l-2 26c0 6-24 6-24 0z', '#FFFFFF', 2.5) + Lc('M-12-4h20M-12 4h20', '#1E88E5', 2) + P('M12-10c12-4 14 14 2 14', 'none', 3) + Lc('M14 4l10-22', '#FFFFFF', 4) + face(-2, -2, 0.25)) + Lc('M162 196h16', '#FFE0BD', 5)),

  // ---------- Hungary
  F('hu', 'food', 'langos', 'ลางโกช แป้งทอดราดครีมเปรี้ยวกับชีส', 'Lángos with sour cream and cheese', ['langos', 'lángos', 'ลางโกช', 'fried dough', 'แป้งทอด', 'sour cream', 'ครีมเปรี้ยว', 'grated cheese', 'ชีสขูด', 'hungarian street food'],
    // a big round puffy golden fried flatbread spread with white sour cream and piled with grated yellow cheese, on a paper plate, steam rising
    E(120, 150, 100, 50, '#FFFFFF') + Lc('M30 150c20 40 160 40 180 0', '#E0E0E0', 2) + P('M28 140c0-50 50-70 92-70s92 20 92 66c0 30-40 46-92 46s-92-14-92-42z', '#F0A848')
      + P('M50 136c0-36 40-50 70-50s72 14 72 46c0 22-30 34-72 34s-70-8-70-30z', '#FFFDF5', 2.5)
      + Array.from({ length: 22 }, (_, k) => Lc(`M${66 + (k * 23) % 110} ${100 + ((k * 13) % 46)}l${k % 2 ? 8 : 6} ${k % 2 ? -3 : 4}`, '#FFC107', 3)).join('')
      + [[150, 112], [86, 140]].map(([x, y]) => C(x, y, 2, '#8BC34A', 0)).join('') + Lc('M80 50c-6-10 6-14 0-24M120 46c-6-10 6-14 0-24M160 50c-6-10 6-14 0-24', '#BDBDBD', 3) + face(120, 172, 0.4)),
  F('hu', 'food', 'paprika', 'พวงพริกปาปริกาแดงตากแห้งข้างบ้าน', 'Strings of red paprika drying on a wall', ['paprika', 'ปาปริกา', 'paprika strings', 'พวงพริกแห้ง', 'red peppers', 'พริกแดง', 'kalocsa', 'คาโลชา', 'szeged', 'hungarian spice'],
    // three long strings of shiny red paprika peppers hanging from a wooden beam under the eaves of a white house, a little bowl of red paprika powder below
    R(20, 30, 200, 190, '#FFFDF5', 6) + P('M10 40l110-30 110 30z', '#8D6E63') + Lc('M20 46h200', '#6D4C41', 7)
      + [[60, 0], [120, 1], [180, 0]].map(([x, k]) => Lc(`M${x} 46v${130 + k * 10}`, '#A1887F', 2) + Array.from({ length: 7 + k }, (_, j) => g(x + (j % 2 ? 7 : -7), 64 + j * 18, 1, P('M-4-8c8-2 12 4 10 14-2 10-6 14-10 14 2-8-2-20 0-28z', '#E53935', 2) + Lc('M-2-8l2-6', '#558B2F', 3), j % 2 ? 20 : -20)).join('')).join('')
      + P('M84 200h72c-2 18-16 26-36 26s-34-8-36-26z', '#FFFFFF') + E(120, 200, 36, 8, '#D84315') + face(120, 212, 0.3)),
  F('hu', 'culture', 'csikos', 'ชิโกช นักขี่ม้ายืนบนหลังม้าแห่งทุ่งปุสตา', 'A csikós horseman standing on two horses', ['csikos', 'csikós', 'ชิโกช', 'puszta horse show', 'โชว์ม้าทุ่งปุสตา', 'hortobágy', 'hungarian horseman', 'นักขี่ม้าฮังการี', 'standing on horses', 'great plain'],
    // a Hungarian horseman in a blue shirt, wide white trousers and a round hat with a feather standing up on the backs of two galloping horses side by side, holding the reins, on the flat grassland
    P('M-4 200c80-8 160-8 248 0v44H-4z', '#C5E1A5') + g(96, 222, 1.35, horse('#6D4C41', '#3E2723')) + g(126, 210, 1.35, horse('#A1673F', '#5D4037'))
      + g(116, 162, 1, Lc('M-8 0v-32M8 0v-32', '#FFFFFF', 9) + P('M-12-32h24l-2-30h-20z', '#1E88E5') + C(0, -74, 11, '#FFE0BD') + E(0, -84, 18, 4, '#212121') + P('M-10-84c0-10 20-10 20 0z', '#212121') + Lc('M10-88c8-10 14-14 20-12', '#FFC107', 3) + Lc('M-10-54l-14 14M10-54l20 10', '#1E88E5', 6) + Lc('M30-44l20 8M-24-40l-4 10', '#5D4037', 2) + face(0, -72, 0.28))
      + Lc('M30 230c20-4 40 0 50-4M170 226c20-4 30 0 40-4', '#AED581', 3)),

  // ---------- Budapest
  L('hu/budapest/landmark-childrensrailway.v1.svg', 'รถไฟเด็กแห่งบูดาเปสต์ที่เด็กๆ เป็นพนักงาน', 'The Children\'s Railway run by children', ['children\'s railway', 'รถไฟเด็ก', 'gyermekvasút', 'gyermekvasut', 'buda hills', 'เนินเขาบูดา', 'child conductor', 'พนักงานรถไฟตัวน้อย', 'forest train', 'narrow gauge'], 'หาเด็กพนักงานรถไฟที่ยกป้ายสัญญาณ', 'Find the child railway worker holding up the signal paddle',
    // a small blue-and-cream train with open carriages coming through the forest of the Buda hills, a child railway worker in a navy uniform and red-topped cap holding up a round signal paddle beside the track
    sky('#E8F5E9') + [[20, 110], [70, 100], [170, 104], [220, 112]].map(([x, y]) => tree(x, y, 1.6, '#388E3C')).join('') + P('M-4 120h248v124H-4z', '#9CCC65', 0)
      + Lc('M-4 196h248', '#6D4C41', 4) + Array.from({ length: 13 }, (_, k) => Lc(`M${k * 20} 190v12`, '#8D6E63', 4)).join('')
      + R(10, 140, 58, 44, '#1E88E5', 4, 3) + R(16, 148, 20, 16, '#E1F5FE', 2, 2) + R(40, 122, 22, 18, '#1E88E5', 2, 3) + R(36, 116, 30, 8, '#263238', 2, 2.5) + R(66, 160, 14, 24, '#1E88E5', 2, 3)
      + [84, 140].map((x) => R(x, 150, 50, 34, '#FFF8E1', 3, 3) + R(x + 4, 140, 42, 10, '#1E88E5', 2, 2.5) + kid(x + 16, 162, '#FFCA28', 0.7) + kid(x + 34, 162, '#E53935', 0.7)).join('')
      + [24, 54, 96, 120, 152, 176].map((x) => C(x, 188, 7, '#37474F', 2.5)).join('')
      + g(212, 226, 1.3, C(0, -24, 9, '#FFE0BD', 2) + P('M-9-30c0-8 18-8 18 0z', '#E53935', 2) + R(-10, -32, 20, 4, '#263238', 1, 1.5) + P('M-9 6v-20h18v20z', '#1A237E', 2) + Lc('M-9-6l-12-14', '#1A237E', 4) + Lc('M-22-20v-12', INK, 2) + C(-22, -38, 7, '#E53935', 2) + C(-22, -38, 3, '#FFFFFF', 0) + face(0, -22, 0.22))),
  L('hu/budapest/landmark-vajdahunyad.v1.svg', 'ปราสาทไวดาฮุนยาดในสวนสาธารณะเมือง', 'Vajdahunyad Castle in City Park', ['vajdahunyad castle', 'ปราสาทไวดาฮุนยาด', 'városliget', 'varosliget', 'city park', 'สวนสาธารณะเมือง', 'castle by the lake', 'ปราสาทริมทะเลสาบ', 'storybook castle', 'gothic tower'], 'หาสะพานหินที่พาข้ามน้ำไปยังประตูปราสาท', 'Find the stone bridge leading over the water to the castle gate',
    // a storybook castle mixing a tall gothic tower with a pointed roof, round turrets and a gatehouse, reached by a little stone bridge over a lake, ducks on the water
    sky('#FFF3E0') + [[16, 130], [228, 128]].map(([x, y]) => tree(x, y, 1.4, '#558B2F')).join('')
      + R(40, 90, 70, 70, '#D7CCC8', 0, 3) + P('M34 90l41-30 41 30z', '#5D4037', 3) + wins(50, 104, 3, 18, 8, 14, '#455A64')
      + R(110, 40, 34, 120, '#BCAAA4', 0, 3) + P('M104 40l23-34 23 34z', '#455A64', 3) + R(120, 60, 14, 18, '#455A64', 6, 2) + R(120, 96, 14, 18, '#455A64', 6, 2)
      + R(144, 96, 58, 64, '#D7CCC8', 0, 3) + [[144, 96], [202, 96]].map(([x, y]) => R(x - 8, y - 20, 16, 84, '#BCAAA4', 0, 3) + P(`M${x - 10} ${y - 20}l10-18 10 18z`, '#E64A19', 2.5)).join('') + P('M160 160v-24c0-14 26-14 26 0v24z', '#6D4C41', 3)
      + P('M-4 160h248v84H-4z', '#4FC3F7', 3) + P('M140 160h54l14 40H126z', '#BDBDBD', 3) + P('M144 200c4-14 16-20 24-20s20 6 24 20', '#4FC3F7', 3)
      + [[50, 206], [80, 220]].map(([x, y]) => E(x, y, 10, 6, '#FFFFFF', 2) + C(x + 8, y - 6, 4, '#2E7D32', 1.5) + P(`M${x + 12} ${y - 6}l4 1-4 2z`, '#FFA000', 1)).join('') + face(127, 132, 0.3)),
  L('hu/budapest/landmark-bringohinto.v1.svg', 'รถถีบสี่ล้อบนเกาะมาร์กาเรต', 'A four-seat pedal cart on Margaret Island', ['bringóhintó', 'bringohinto', 'รถถีบสี่ล้อ', 'pedal cart', 'จักรยานสี่ล้อ', 'margaret island', 'เกาะมาร์กาเรต', 'margitsziget', 'water tower', 'family ride'], 'หารถถีบสี่ล้อที่มีหลังคาลายทาง', 'Find the four-wheeled pedal cart with the striped roof',
    // a family pedal car with four wheels and a red-and-white striped canopy roof, two children pedalling, rolling along a park path under plane trees, the tall octagonal water tower behind
    sky('#E3F2FD') + R(176, 30, 30, 120, '#E0D6C8', 0, 3) + P('M172 30l18-16 18 16z', '#BF360C', 3) + R(184, 48, 14, 10, '#90CAF9', 1, 2) + R(184, 80, 14, 10, '#90CAF9', 1, 2) + R(170, 116, 42, 6, '#BCAAA4', 0, 2)
      + [[30, 120], [130, 110]].map(([x, y]) => tree(x, y, 1.8, '#689F38')).join('') + P('M-4 150h248v94H-4z', '#9CCC65', 0) + P('M-4 190h248v30H-4z', '#D7CCC8', 3)
      + R(54, 128, 132, 10, '#E53935', 2, 3) + Array.from({ length: 6 }, (_, k) => R(58 + k * 22, 128, 11, 10, '#FFFFFF', 0, 0)).join('') + R(54, 128, 132, 10, 'none', 2, 3) + Lc('M62 138v40M178 138v40', '#455A64', 3)
      + R(56, 168, 128, 18, '#FFCA28', 3, 3) + kid(90, 168, '#1E88E5') + kid(150, 168, '#EC407A')
      + [70, 170].map((x) => C(x, 196, 13, '#37474F', 3) + C(x, 196, 4, '#B0BEC5', 1.5)).join('')),
  L('hu/budapest/landmark-synagogue.v1.svg', 'โบสถ์ยิวถนนโดฮาญ', 'The Dohány Street Synagogue', ['dohány street synagogue', 'dohany street synagogue', 'โบสถ์ยิวถนนโดฮาญ', 'great synagogue', 'โบสถ์ยิวใหญ่', 'onion towers', 'หอยอดหัวหอม', 'striped brick', 'อิฐลายทาง', 'jewish quarter'], 'หาหอคอยคู่ที่มียอดกลมสีทองเหมือนหัวหอม', 'Find the twin towers with round golden onion tops',
    // a grand building of red and yellow striped brick with a big round rose window in the middle, two tall slim towers on either side topped by golden onion domes
    sky('#E1F5FE') + R(60, 80, 120, 130, '#FFE082', 0, 3) + Array.from({ length: 8 }, (_, k) => Lc(`M60 ${92 + k * 15}h120`, '#E57373', 4)).join('')
      + C(120, 120, 22, '#90CAF9', 3) + Array.from({ length: 8 }, (_, k) => g(120, 120, 1, Lc('M0 0v-20', '#1E88E5', 2), k * 45)).join('') + C(120, 120, 6, '#FFC107', 2)
      + P('M96 210v-36c0-16 48-16 48 0v36z', '#6D4C41', 3) + P('M56 80l64-26 64 26z', '#E57373', 3)
      + [[44], [196]].map(([x]) => R(x - 16, 60, 32, 150, '#FFE082', 0, 3) + Array.from({ length: 9 }, (_, k) => Lc(`M${x - 16} ${72 + k * 15}h32`, '#E57373', 4)).join('') + R(x - 6, 100, 12, 22, '#455A64', 6, 2) + R(x - 20, 52, 40, 10, '#E57373', 1, 2.5)
        + P(`M${x - 18} 52c-6-20 6-34 18-40 12 6 24 20 18 40z`, '#FFC107', 3) + Lc(`M${x} 12v-10`, INK, 3) + C(x, 2, 3, '#FFC107', 2)).join('')
      + P('M-4 210h248v34H-4z', '#BDBDBD', 3) + face(120, 162, 0.3)),

  // ---------- Berlin and Potsdam
  L('de/berlin/landmark-reichstag.v1.svg', 'โดมแก้วบนตึกไรชส์ทาค', 'The glass dome on the Reichstag', ['reichstag', 'ไรชส์ทาค', 'reichstag dome', 'โดมแก้วไรชส์ทาค', 'glass dome', 'โดมแก้ว', 'spiral ramp', 'ทางเดินวนในโดม', 'bundestag building', 'rooftop view'], 'หาทางเดินวนขึ้นข้างในโดมแก้ว', 'Find the ramp spiralling up inside the glass dome',
    // a wide stone building with corner towers and a columned front, on its roof a big round glass dome with a ramp spiralling up inside and tiny people walking up it
    sky('#E3F2FD') + P('M60 96c0-80 120-80 120 0z', '#E1F5FE', 3) + Array.from({ length: 5 }, (_, k) => Lc(`M${66 + k * 2} ${88 - k * 14}c${30 - k * 2} 8 ${78 - k * 6} 8 ${108 - k * 10} 0`, '#78909C', 3)).join('') + Array.from({ length: 6 }, (_, k) => Lc(`M${70 + k * 20} 96c${(k - 2.5) * 4}-40 ${(k - 2.5) * 2}-60 ${50 - k * 20 + (k - 2.5) * 6}-74`, '#B0BEC5', 1.5)).join('')
      + [[86, 80], [122, 66], [148, 52]].map(([x, y]) => C(x, y, 4, '#FF7043', 1.5)).join('')
      + R(10, 96, 220, 110, '#E0D6C8', 0, 3) + [[10, 34], [196, 34]].map(([x, w]) => R(x, 80, w, 126, '#D7CCC8', 0, 3)).join('')
      + P('M80 120l40-22 40 22z', '#E0D6C8', 3) + [86, 102, 118, 134, 150].map((x) => R(x, 122, 8, 60, '#FFFFFF', 0, 2)).join('') + R(76, 182, 88, 10, '#BCAAA4', 0, 2.5)
      + wins(18, 100, 2, 12, 7, 14, '#90A4AE') + wins(204, 100, 2, 12, 7, 14, '#90A4AE') + wins(50, 140, 2, 12, 7, 14, '#90A4AE') + wins(170, 140, 2, 12, 7, 14, '#90A4AE')
      + P('M-4 206h248v38H-4z', '#9CCC65', 3)),
  L('de/berlin/landmark-elephantgate.v1.svg', 'ประตูช้างของสวนสัตว์เบอร์ลิน', 'The Elephant Gate of Berlin Zoo', ['elephant gate', 'ประตูช้าง', 'elefantentor', 'berlin zoo', 'สวนสัตว์เบอร์ลิน', 'zoologischer garten', 'stone elephants', 'ช้างหิน', 'pagoda roof', 'zoo entrance'], 'หาช้างหินสองตัวที่แบกเสาประตู', 'Find the two stone elephants holding up the gate pillars',
    // a zoo gate with a colourful curved pagoda-style roof on two red pillars, each pillar resting on the back of a kneeling grey stone elephant, a child walking through
    sky('#FFF8E1') + P('M-4 200h248v44H-4z', '#D7CCC8', 3)
      + P('M30 70c30 6 150 6 180 0l-14-20c-30 6-122 6-152 0z', '#2E7D32', 3) + P('M44 50c20 4 132 4 152 0l-18-22H62z', '#E53935', 3) + P('M96 28l24-18 24 18z', '#FFC107', 3) + Lc('M40 76h160', '#FFC107', 5)
      + Array.from({ length: 8 }, (_, k) => Lc(`M${62 + k * 16} 30l-4 20`, '#B71C1C', 2)).join('')
      + [[60, 1], [180, -1]].map(([x, d]) => R(x - 9, 76, 18, 60, '#C62828', 0, 3) + g(x, 170, 1, E(0, 0, 30, 22, '#9E9E9E') + E(-d * 26, -6, 16, 18, '#9E9E9E') + Lc(`M${-d * 34} 0c${-d * 4} 12 ${-d * 2} 22 ${d * 4} 28`, '#9E9E9E', 8) + P(`M${-d * 18}-14c${-d * 8}-4 ${-d * 14} 4 ${-d * 10} 14z`, '#BDBDBD', 2) + R(-26, 14, 14, 16, '#9E9E9E', 3) + R(10, 14, 14, 16, '#9E9E9E', 3) + face(-d * 26, -6, 0.22, 'none'))).join('')
      + kid(120, 220, '#FFCA28') + face(120, 46, 0.25)),
  L('de/berlin/landmark-oberbaum.v1.svg', 'สะพานโอเบอร์เบาม์กับรถไฟใต้ดินสีเหลือง', 'The Oberbaum Bridge and its yellow train', ['oberbaum bridge', 'oberbaumbrücke', 'สะพานโอเบอร์เบาม์', 'red brick bridge', 'สะพานอิฐแดง', 'yellow u-bahn', 'รถไฟสีเหลือง', 'spree river', 'แม่น้ำชเปร', 'kreuzberg'], 'หารถไฟสีเหลืองที่วิ่งอยู่บนชั้นบนของสะพาน', 'Find the yellow train running along the top deck of the bridge',
    // a red-brick bridge of many low arches over the river with two tall pointed towers in the middle, a yellow train rolling along its upper deck of arches, the river below
    sky('#E1F5FE') + P('M-4 170h248v74H-4z', '#4FC3F7', 3) + Lc('M20 210h50M150 220h60', '#E1F5FE', 3)
      + R(-4, 130, 248, 40, '#C0573E', 0, 3) + Array.from({ length: 7 }, (_, k) => P(`M${4 + k * 36} 170v-14c0-14 28-14 28 0v14z`, '#4FC3F7', 2.5)).join('')
      + R(-4, 112, 248, 18, '#D2785F', 0, 3) + Array.from({ length: 16 }, (_, k) => P(`M${k * 16} 130v-6c0-6 10-6 10 0v6z`, '#8D3B2B', 1.5)).join('')
      + [[98], [142]].map(([x]) => R(x - 12, 40, 24, 90, '#C0573E', 0, 3) + P(`M${x - 14} 40l14-24 14 24z`, '#455A64', 3) + R(x - 4, 56, 8, 14, '#455A64', 4, 1.5) + Lc(`M${x - 12} 80h24`, '#FFE0B2', 2)).join('')
      + R(4, 92, 80, 20, '#FFCA28', 5, 3) + wins(10, 96, 6, 12, 8, 8, '#E1F5FE') + R(156, 92, 84, 20, '#FFCA28', 5, 3) + wins(162, 96, 6, 12, 8, 8, '#E1F5FE')),
  L('de/berlin/landmark-tempelhof.v1.svg', 'สนามบินเก่าเทมเพิลโฮฟที่กลายเป็นสวน', 'Tempelhof Field, the old airport turned park', ['tempelhof field', 'tempelhofer feld', 'สนามบินเก่าเทมเพิลโฮฟ', 'old airport park', 'สวนบนรันเวย์', 'runway', 'รันเวย์', 'kite skating', 'สเก็ตลากว่าว', 'picnic'], 'หาเด็กที่ปั่นจักรยานไปตามเส้นรันเวย์', 'Find the child riding a bike along the painted runway lines',
    // a huge flat green field with a wide grey runway and its white dashes running into the distance, a child on a bike, a skater pulled by a big kite, the long curved terminal building far away
    sky('#E3F2FD') + R(-4, 100, 248, 16, '#BCAAA4', 0, 2.5) + Array.from({ length: 12 }, (_, k) => R(4 + k * 20, 104, 10, 6, '#90A4AE', 0, 1)).join('') + P('M-4 116h248v128H-4z', '#AED581', 0)
      + P('M96 116h48l70 128H26z', '#90A4AE', 3) + Array.from({ length: 4 }, (_, k) => R(117 - k, 124 + k * 30, 6 + k * 2, 14 + k * 4, '#FFFFFF', 0, 0)).join('')
      + g(166, 200, 1, C(-14, 10, 11, 'none', 3) + C(14, 10, 11, 'none', 3) + Lc('M-14 10l10-16h14l6 16M-4-6l-4-6', '#E53935', 3) + C(0, -26, 8, '#FFE0BD', 2) + P('M-6-18l8 2 4 14', '#1E88E5', 5) + face(0, -24, 0.22))
      + P('M40 30c20-16 40-14 50 2-16 8-36 6-50-2z', '#FF7043', 3) + Lc('M64 38c-6 40-16 60-24 80', INK, 1.5) + g(40, 160, 1, C(0, -26, 8, '#FFE0BD', 2) + P('M-6 4v-20h12v20z', '#AB47BC', 2) + Lc('M0-14l2-30', INK, 1.5) + R(-10, 4, 20, 4, '#455A64', 2, 1.5) + face(0, -24, 0.22))),
  L('de/berlin/landmark-bodemuseum.v1.svg', 'พิพิธภัณฑ์โบเดอปลายเกาะพิพิธภัณฑ์', 'The Bode Museum on the tip of Museum Island', ['museum island', 'เกาะพิพิธภัณฑ์', 'museumsinsel', 'bode museum', 'พิพิธภัณฑ์โบเดอ', 'spree river', 'แม่น้ำชเปร', 'domed museum', 'island tip', 'unesco'], 'หาตึกโดมที่ตั้งอยู่ตรงปลายเกาะแหลมกลางแม่น้ำ', 'Find the domed building sitting on the pointed tip of the island',
    // a grand curved building with a big rounded dome standing right on the pointed tip of an island, river water on both sides meeting in front, little bridges on the left and right
    sky('#FFF3E0') + P('M-4 150h248v94H-4z', '#4FC3F7', 0) + P('M30 150h180l-90 60z', '#BDBDBD', 3)
      + R(40, 96, 160, 54, '#E0D6C8', 0, 3) + wins(50, 106, 9, 16, 8, 14, '#90A4AE') + wins(50, 128, 9, 16, 8, 14, '#90A4AE')
      + P('M86 96c0-50 68-50 68 0z', '#78909C', 3) + R(110, 40, 20, 14, '#E0D6C8', 0, 2.5) + P('M108 40c0-12 24-12 24 0z', '#78909C', 2.5) + R(84, 92, 72, 8, '#E0D6C8', 0, 2.5)
      + P('M100 150v-26c0-14 40-14 40 0v26z', '#BCAAA4', 3) + [[-4, 132, 50], [194, 132, 50]].map(([x, y, w]) => R(x, y, w, 10, '#A1887F', 0, 2.5) + P(`M${x + 8} ${y + 10}v20c0-10 34-10 34 0v-20`, 'none', 2.5)).join('')
      + Lc('M40 200c20 6 40 6 50 0M150 200c20 6 40 6 50 0', '#E1F5FE', 3) + face(120, 72, 0.3)),
  L('de/berlin/landmark-charlottenburg.v1.svg', 'พระราชวังชาร์ลอตเทนบวร์ก', 'Charlottenburg Palace and its green dome', ['charlottenburg palace', 'พระราชวังชาร์ลอตเทนบวร์ก', 'schloss charlottenburg', 'green dome', 'โดมสีเขียว', 'baroque garden', 'สวนบาโรก', 'carp pond', 'palace gardens', 'golden ball'], 'หาโดมสีเขียวสูงกลางวังที่มีลูกบอลทองบนยอด', 'Find the tall green dome in the middle with a golden ball on top',
    // a long yellow baroque palace with white window frames, a tall slender green dome with a lantern and a golden ball in the middle, patterned flower beds in front
    sky('#E3F2FD') + R(-4, 110, 248, 70, '#FFE082', 0, 3) + P('M-8 110l12-14h232l12 14z', '#8D6E63', 3) + wins(4, 124, 14, 17, 8, 16, '#FFFFFF') + wins(4, 150, 14, 17, 8, 16, '#FFFFFF')
      + R(94, 80, 52, 100, '#FFE082', 0, 3) + P('M102 80c0-40 36-40 36 0z', '#4DB6AC', 3) + R(112, 30, 16, 14, '#4DB6AC', 0, 2.5) + P('M110 30c0-10 20-10 20 0z', '#4DB6AC', 2.5) + C(120, 14, 5, '#FFC107', 2.5) + Lc('M120 14v6', INK, 2) + R(98, 76, 44, 8, '#FFE082', 0, 2.5)
      + P('M108 180v-26c0-12 24-12 24 0v26z', '#6D4C41', 3)
      + P('M-4 180h248v64H-4z', '#9CCC65', 3) + [[40, 210], [120, 214], [200, 210]].map(([x, y]) => E(x, y, 30, 10, '#AED581', 2.5) + Lc(`M${x - 20} ${y}c10-8 30-8 40 0`, '#E57373', 3)).join('') + face(120, 112, 0.3)),

  // ---------- Rothenburg, Nuremberg and the Romantic Road
  L('de/rothenburg/landmark-schneeballen.v1.svg', 'ขนมชเนบัลเลน ก้อนหิมะแห่งโรเทนบวร์ก', 'Schneeballen, Rothenburg\'s snowball pastries', ['schneeballen', 'ชเนบัลเลน', 'snowball pastry', 'ขนมก้อนหิมะ', 'bakery window', 'หน้าร้านเบเกอรี่', 'powdered sugar', 'น้ำตาลไอซิ่ง', 'chocolate snowball', 'rothenburg sweets'], 'หาขนมกลมที่ม้วนจากเส้นแป้งแล้วโรยน้ำตาลเหมือนหิมะ', 'Find the round balls of pastry strips dusted white like snow',
    // three round pastry balls made of tangled crispy dough strips, one dusted white with sugar, one dipped in chocolate, one with pink icing, sitting on paper doilies, sugar falling like snow
    E(120, 200, 100, 14, '#ECEFF1')
      + [[64, 160, '#FFF8E1', '#F4C27A'], [176, 160, '#6D4C41', '#4E342E'], [120, 126, '#FFFFFF', '#E8C27A']].map(([x, y, top, line]) => E(x, y + 34, 40, 8, '#FFFFFF', 2) + C(x, y, 38, top) + Array.from({ length: 6 }, (_, k) => P(`M${x - 30 + k * 4} ${y - 20 + k * 6}c${20 - k * 2} -10 ${44 - k * 6} 0 ${56 - k * 8} 10`, 'none', 2) + Lc(`M${x - 28 + k * 4} ${y - 18 + k * 6}c${20 - k * 2} -10 ${42 - k * 6} 0 ${54 - k * 8} 10`, line, 2)).join('')).join('')
      + P('M156 140c8 4 16 4 24-2 4 6 10 6 16 0', '#F48FB1', 2) + [[40, 70], [90, 50], [150, 60], [200, 80], [70, 100], [180, 110]].map(([x, y]) => C(x, y, 3, '#FFFFFF', 1.5)).join('') + face(120, 130, 0.4)),
  L('de/rothenburg/landmark-rathausturm.v1.svg', 'หอคอยศาลากลางโรเทนบวร์ก', 'The Town Hall tower of Rothenburg', ['town hall tower', 'หอคอยศาลากลาง', 'rathausturm', 'rathaus rothenburg', 'ศาลากลางโรเทนบวร์ก', 'tower climb', 'ปีนหอคอย', 'view over the roofs', 'วิวหลังคาเมือง', 'market square'], 'หาระเบียงเล็กบนยอดหอคอยที่คนโผล่หน้ามองวิว', 'Find the tiny balcony at the top of the tower where people peek out at the view',
    // a tall slim white gothic town hall with a steep stepped gable and a very tall narrow tower with a pointed roof and a little open gallery near the top where two children wave, red roofs around
    sky('#E1F5FE') + R(40, 110, 110, 110, '#FFFFFF', 0, 3) + P('M40 110h110l-14-14h-8v-14h-10v-14h-10v-14h-26v14h-10v14h-10v14h-8z', '#FFFFFF', 3) + wins(52, 124, 5, 18, 10, 16, '#90A4AE') + wins(52, 156, 5, 18, 10, 16, '#90A4AE') + P('M84 220v-24c0-10 20-10 20 0v24z', '#6D4C41', 3)
      + R(150, 40, 30, 180, '#FFFFFF', 0, 3) + R(144, 50, 42, 8, '#BDBDBD', 0, 2.5) + Array.from({ length: 4 }, (_, k) => Lc(`M${148 + k * 11} 58v-12`, INK, 2)).join('') + P('M148 46l17-36 17 36z', '#455A64', 3) + R(158, 90, 14, 20, '#90A4AE', 6, 2)
      + kid(156, 50, '#E53935', 0.6) + kid(174, 50, '#FFCA28', 0.6)
      + [[-4, 150, 40], [190, 140, 54]].map(([x, y, w]) => R(x, y, w, 70, '#FFE0B2', 0, 3) + P(`M${x - 4} ${y}l${w / 2 + 4}-30 ${w / 2 + 4} 30z`, '#E64A19', 3)).join('') + P('M-4 220h248v24H-4z', '#BDBDBD', 3)),
  L('de/rothenburg/landmark-toppler.v1.svg', 'บ้านหอคอยท็อปเลอร์ในหุบเขาเทาเบอร์', 'The Topplerschlösschen, a tower house in the Tauber valley', ['topplerschlösschen', 'toppler castle', 'บ้านหอคอยท็อปเลอร์', 'tower house', 'บ้านบนหอคอย', 'tauber valley', 'หุบเขาเทาเบอร์', 'tiny castle', 'ปราสาทจิ๋ว', 'walk below the town'], 'หาบ้านที่ส่วนบนกว้างกว่าส่วนล่างเหมือนตั้งอยู่บนเสา', 'Find the little house that is wider at the top than at the bottom',
    // a funny little tower house: a narrow stone base with a wider half-timbered house sitting on top of it under a hipped roof, in green meadows by the river, the walled town on the hill behind
    sky('#E3F2FD') + P('M-4 100c40-20 100-30 140-26s80 10 108 22v20H-4z', '#9CCC65', 3) + [[150, 70], [176, 66], [200, 72]].map(([x, y]) => R(x, y, 18, 26, '#FFE0B2', 0, 2) + P(`M${x - 2} ${y}l11-12 11 12z`, '#E64A19', 2)).join('') + R(196, 40, 10, 36, '#FFE0B2', 0, 2) + P('M194 40l7-12 7 12z', '#455A64', 2)
      + P('M-4 244V120c80-10 160-10 248 0v124z', '#8BC34A', 3) + P('M-4 220c60-10 120-4 248-14v38H-4z', '#4FC3F7', 3)
      + R(98, 120, 44, 80, '#BCAAA4', 0, 3) + Array.from({ length: 5 }, (_, k) => Lc(`M98 ${134 + k * 14}h44`, '#A1887F', 2)).join('') + P('M112 200v-16c0-8 16-8 16 0v16z', '#6D4C41', 2.5)
      + P('M70 120l28-14h44l28 14z', '#A1887F', 3) + R(70, 60, 100, 50, '#FFF8E1', 0, 3) + Lc('M70 60l100 50M170 60L70 110M120 60v50M95 60v50M145 60v50', '#8D6E63', 3) + R(84, 74, 14, 14, '#90CAF9', 1, 2) + R(142, 74, 14, 14, '#90CAF9', 1, 2)
      + P('M62 60l58-36 58 36z', '#E64A19', 3) + [[30, 170], [210, 170]].map(([x, y]) => tree(x, y, 1.1)).join('') + face(120, 80, 0.3)),
  L('de/rothenburg/landmark-schaefertanz.v1.svg', 'การเต้นรำของคนเลี้ยงแกะบนลานตลาด', 'The shepherds\' dance on the market square', ['shepherds dance', 'การเต้นรำของคนเลี้ยงแกะ', 'schäfertanz', 'schafertanz', 'folk dance', 'การเต้นรำพื้นบ้าน', 'market square', 'ลานตลาด', 'traditional costume', 'ชุดพื้นเมือง'], 'หาคู่เต้นรำที่จับมือหมุนตัวในชุดพื้นเมือง', 'Find the dancers holding hands and spinning in their folk costumes',
    // a boy in a green waistcoat and black hat and a girl in a red dress with a white apron dancing hand in hand on the cobbled square, ribbons flying, a fiddler's music notes, half-timbered fronts behind
    sky('#FFF8E1') + [[-4, 60, '#FFE0B2'], [56, 64, '#FFFFFF'], [120, 60, '#FFCCBC'], [180, 64, '#FFF8E1']].map(([x, w, c], k) => R(x, 50 + (k % 2) * 10, w, 120, c, 0, 3) + P(`M${x - 4} ${50 + (k % 2) * 10}l${w / 2 + 4}-34 ${w / 2 + 4} 34z`, '#E64A19', 3) + Lc(`M${x} ${90 + (k % 2) * 10}h${w}M${x + w / 2} ${50 + (k % 2) * 10}v120`, '#8D6E63', 3) + R(x + 10, 110, 14, 14, '#90CAF9', 1, 2)).join('')
      + P('M-4 170h248v74H-4z', '#BDBDBD', 3) + Array.from({ length: 10 }, (_, k) => E(12 + k * 24, 214 + (k % 2) * 8, 9, 5, '#9E9E9E', 1.5)).join('')
      + g(90, 214, 1, P('M-14 0l4-40h20l4 40z', '#212121') + R(-12, -60, 24, 22, '#2E7D32', 2) + C(0, -72, 12, '#FFE0BD') + E(0, -82, 18, 4, '#212121') + P('M-9-82c0-9 18-9 18 0z', '#212121') + Lc('M12-54l22 4', '#FFE0BD', 6) + face(0, -70, 0.28))
      + g(150, 214, 1, P('M-26 0c4-30 10-40 26-46 16 6 22 16 26 46z', '#E53935') + P('M-10-6l4-36h12l4 36z', '#FFFFFF', 2) + R(-11, -64, 22, 22, '#E53935', 2) + C(0, -76, 12, '#FFE0BD') + P('M-12-80c0-12 24-12 24 0', '#6D4C41', 2.5) + Lc('M-12-56l-16 6', '#FFE0BD', 6) + Lc('M14-80c10 6 14 18 12 28', '#FFCA28', 3) + face(0, -74, 0.28))
      + Lc('M34 120l6-2v14M200 112l6-2v14', INK, 2.5) + C(38, 134, 3, INK, 0) + C(204, 126, 3, INK, 0)),
  L('de/rothenburg/landmark-schonerbrunnen.v1.svg', 'น้ำพุโชเนอร์บรุนเนินและห่วงนำโชคที่นูเรมเบิร์ก', 'Nuremberg\'s Beautiful Fountain and its lucky ring', ['schöner brunnen', 'schoner brunnen', 'beautiful fountain', 'น้ำพุโชเนอร์บรุนเนิน', 'lucky ring', 'ห่วงนำโชค', 'turn the ring', 'nuremberg', 'นูเรมเบิร์ก', 'hauptmarkt'], 'หาห่วงทองเล็กๆ บนรั้วที่หมุนแล้วขอพรได้', 'Find the little golden ring in the railing that you turn to make a wish',
    // a tall pointed gothic spire fountain painted gold, red and green rising from an octagonal basin, surrounded by a wrought-iron railing with one shiny brass ring that a child is turning
    sky('#E3F2FD') + P('M-4 200h248v44H-4z', '#BDBDBD', 3)
      + P('M70 190h100l-6-26H76z', '#BCAAA4', 3) + P('M96 164l6-90h36l6 90z', '#2E7D32', 3) + Array.from({ length: 4 }, (_, k) => R(101 + k * 10, 92, 6, 60, ['#FFC107', '#E53935'][k % 2], 3, 2)).join('')
      + P('M102 74l18-62 18 62z', '#FFC107', 3) + Array.from({ length: 5 }, (_, k) => Lc(`M${106 + k * 7} ${66 - Math.abs(k - 2) * 10}l-3-6`, INK, 2)).join('') + Lc('M120 12V2', INK, 3)
      + R(36, 150, 168, 6, '#455A64', 1, 2.5) + Array.from({ length: 12 }, (_, k) => Lc(`M${40 + k * 14} 156v44`, '#455A64', 3) + P(`M${40 + k * 14} 168c4-6 10-6 14 0`, 'none', 2)).join('') + Lc('M36 200h168', '#455A64', 3)
      + C(166, 176, 7, 'none', 4) + '<g stroke="#FFC107" stroke-width="3.5" fill="none"><circle cx="166" cy="176" r="7"/></g>' + kid(192, 214, '#E53935', 1.2) + Lc('M184 196l-12-14', '#FFE0BD', 4) + face(120, 132, 0.3)),
  L('de/rothenburg/landmark-kaiserburg.v1.svg', 'ปราสาทไกเซอร์บวร์กบนผาหินแห่งนูเรมเบิร์ก', 'Nuremberg\'s Imperial Castle on its rock', ['kaiserburg', 'ไกเซอร์บวร์ก', 'imperial castle', 'ปราสาทจักรพรรดิ', 'nuremberg castle', 'ปราสาทนูเรมเบิร์ก', 'sinwell tower', 'หอกลมซินเวล', 'sandstone rock', 'old town view'], 'หาหอคอยกลมที่มีหลังคาทรงกรวยบนยอดผาหิน', 'Find the round tower with the cone-shaped roof on top of the rock',
    // a castle of red sandstone walls and pointed roofs on a craggy sandstone rock, a fat round tower with a tall pointed cone roof and a little half-timbered top, red-roofed houses at the foot
    sky('#FFF3E0') + P('M20 180c0-40 20-80 60-90s100 0 120 30 30 50 30 60z', '#C67B5C', 3) + Lc('M60 150l20-10M150 130l20 14M100 170l14-8', '#A0583E', 3)
      + R(48, 70, 70, 40, '#D9906F', 0, 3) + P('M42 70l41-24 41 24z', '#8D3B2B', 3) + wins(56, 80, 4, 16, 8, 12, '#FFF8E1')
      + R(124, 50, 40, 60, '#D9906F', 0, 3) + R(120, 30, 48, 20, '#FFF8E1', 0, 3) + Lc('M120 40h48M132 30v20M156 30v20', '#8D6E63', 2.5) + P('M118 30l26-28 26 28z', '#8D3B2B', 3)
      + R(168, 76, 42, 34, '#D9906F', 0, 3) + P('M164 76l25-16 25 16z', '#8D3B2B', 3)
      + [[-4, 180, 50], [44, 186, 46], [168, 182, 80]].map(([x, y, w]) => R(x, y, w, 60, '#FFE0B2', 0, 3) + P(`M${x - 4} ${y}l${w / 2 + 4}-26 ${w / 2 + 4} 26z`, '#E64A19', 3) + R(x + 10, y + 14, 10, 12, '#90CAF9', 1, 1.5)).join('')
      + R(90, 196, 80, 48, '#FFF8E1', 0, 3) + P('M86 196l44-24 44 24z', '#E64A19', 3) + face(144, 76, 0.3)),

  // ---------- Heidelberg, Frankfurt, Freiburg and the Black Forest
  L('de/heidelberg/landmark-elisabethgate.v1.svg', 'ประตูเอลิซาเบธในสวนปราสาทไฮเดลแบร์ก', 'The Elisabeth Gate in Heidelberg Castle garden', ['elisabeth gate', 'ประตูเอลิซาเบธ', 'elisabethentor', 'heidelberg castle garden', 'สวนปราสาทไฮเดลแบร์ก', 'birthday gate', 'ประตูวันเกิด', 'red sandstone', 'หินทรายแดง', 'built in one night'], 'หาประตูโค้งที่มีเสาเป็นรูปลำต้นไม้พันเถาวัลย์', 'Find the archway whose pillars are carved like tree trunks wrapped in vines',
    // a red sandstone garden archway whose two pillars are carved like knobbly tree trunks wrapped in leafy vines, a carved garland across the top, the ruined castle wall behind, a child skipping through
    sky('#E8F5E9') + R(-4, 40, 248, 120, '#B5654A', 0, 3) + Array.from({ length: 4 }, (_, k) => P(`M${10 + k * 64} 120v-40c0-16 28-16 28 0v40z`, '#5D4037', 2.5)).join('') + P('M-4 40l20-14 10 10 20-12 30 16 40-10 30 14 40-12 30 12 28-6V40z', '#B5654A', 3)
      + P('M-4 160h248v84H-4z', '#9CCC65', 3)
      + [[66], [174]].map(([x]) => P(`M${x - 14} 222c4-30-6-60 0-110 2-10 22-10 26 0 6 50-4 80 0 110z`, '#C0573E', 3) + Lc(`M${x - 8} 140c4 6 8 6 12 0M${x - 6} 180c4 6 8 6 12 0`, '#8D3B2B', 2)
        + [[-8, 130], [8, 160], [-8, 190], [8, 210]].map(([dx, y]) => P(`M${x + dx} ${y}c-8-4-10-12-4-16 6 2 8 10 4 16z`, '#43A047', 2)).join('')).join('')
      + P('M54 116c10-80 122-80 132 0', 'none', 0) + P('M48 116c0-74 144-74 144 0h-20c0-50-104-50-104 0z', '#D2785F', 3) + Array.from({ length: 7 }, (_, k) => C(70 + k * 17, 70 - Math.sin(k / 6 * Math.PI) * 18, 7, ['#E53935', '#43A047', '#FFCA28'][k % 3], 2)).join('')
      + kid(120, 214, '#1E88E5', 1.2) + face(120, 92, 0.3)),
  L('de/heidelberg/landmark-bollenhut.v1.svg', 'หมวกบอลเลินฮูทพู่แดงแห่งป่าดำ', 'The Bollenhut, the Black Forest pom-pom hat', ['bollenhut', 'บอลเลินฮูท', 'pom-pom hat', 'หมวกพู่แดง', 'black forest costume', 'ชุดพื้นเมืองป่าดำ', 'gutach', 'กูทาค', 'red wool balls', 'traditional hat'], 'หาหมวกฟางที่มีลูกพู่ขนแกะสีแดงก้อนใหญ่', 'Find the straw hat covered in big red woolly pom-poms',
    // a smiling girl wearing a flat white straw hat topped with big round red woolly pom-poms in a cross pattern, a black dress with a white collar, Black Forest firs behind
    [[30, 210], [210, 210]].map(([x, y]) => fir(x, y, 1.6)).join('') + P('M70 230c0-40 20-60 50-60s50 20 50 60z', '#212121') + P('M96 172l24 20 24-20z', '#FFFFFF', 2.5) + C(120, 140, 30, '#FFE0BD')
      + P('M90 130c0-20 60-20 60 0', '#3E2723') + E(120, 112, 80, 14, '#FFF8E1') + R(84, 92, 72, 20, '#FFF8E1', 6)
      + [[78, 92], [102, 84], [138, 84], [162, 92], [120, 70], [90, 66], [150, 66], [120, 96], [104, 50], [136, 50], [120, 34]].map(([x, y]) => C(x, y, 15, '#E53935') + P(`M${x - 6} ${y - 6}c4-4 10-4 12 0`, 'none', 2)).join('')
      + face(120, 142, 0.5)),
  L('de/heidelberg/landmark-bachle.v1.svg', 'ร่องน้ำเบ็คเลอในถนนเมืองไฟรบวร์ก', 'The little Bächle streams in Freiburg\'s streets', ['bächle', 'baechle', 'เบ็คเลอ', 'freiburg', 'ไฟรบวร์ก', 'street streams', 'ร่องน้ำในถนน', 'toy boat', 'เรือของเล่น', 'cobbled street'], 'หาเรือไม้ของเล่นที่ลอยไปตามร่องน้ำเล็กๆ ข้างถนน', 'Find the toy boat floating along the little stream beside the street',
    // a narrow channel of clear running water set into a cobbled street between old houses, a child pulling a little wooden toy boat along it on a string, a tall red sandstone church spire far behind
    sky('#E3F2FD') + R(108, 20, 22, 70, '#C67B5C', 0, 3) + P('M106 20l13-18 13 18z', '#C67B5C', 2.5) + Lc('M112 40h14M112 60h14', '#8D3B2B', 2)
      + [[-4, 70, '#FFF59D'], [178, 66, '#B3E5FC']].map(([x, w, c]) => R(x, 60, w, 120, c, 0, 3) + P(`M${x - 4} 60l${w / 2 + 4}-30 ${w / 2 + 4} 30z`, '#E64A19', 3) + wins(x + 10, 80, 3, 18, 10, 14, '#FFFFFF') + wins(x + 10, 116, 3, 18, 10, 14, '#FFFFFF')).join('') + R(66, 90, 112, 90, '#FFE0B2', 0, 3)
      + P('M-4 180h248v64H-4z', '#BDBDBD', 3) + Array.from({ length: 14 }, (_, k) => E(8 + (k * 41) % 230, 196 + (k % 4) * 12, 8, 4, '#9E9E9E', 1.5)).join('')
      + P('M-4 206l248-14v16L-4 224z', '#4FC3F7', 3) + Lc('M20 214l40-2M120 206l40-2', '#E1F5FE', 2)
      + g(80, 208, 1, P('M-14-2h28l-6 8h-16z', '#A1673F', 2.5) + Lc('M0-2v-20', INK, 2) + P('M0-20l12 14H0z', '#FFFFFF', 2) + face(0, 2, 0.15)) + Lc('M94 210c20-10 40-20 60-30', INK, 1.5) + kid(162, 192, '#43A047', 1.2) + face(120, 130, 0.3)),
  L('de/heidelberg/landmark-barefoot.v1.svg', 'ทางเดินเท้าเปล่าในป่าดำ', 'A barefoot trail in the Black Forest', ['barefoot trail', 'ทางเดินเท้าเปล่า', 'barfußpfad', 'barefoot park', 'สวนเดินเท้าเปล่า', 'black forest', 'ป่าดำ', 'pine cones', 'ลูกสน', 'mud and pebbles'], 'หารองเท้าที่ถอดวางไว้ก่อนเดินเท้าเปล่า', 'Find the shoes left behind at the start of the barefoot trail',
    // a winding trail made of squares of different things to walk on barefoot: pebbles, pine cones, logs, sand and squishy mud, a child walking it with bare feet, a pair of shoes left at the start, fir trees
    sky('#E8F5E9') + [[20, 110], [60, 96], [180, 98], [224, 112]].map(([x, y]) => fir(x, y, 1.6)).join('') + P('M-4 110h248v134H-4z', '#8BC34A', 0) + Lc('M20 200l50-4 50-20 50-20 30-32', '#BCAAA4', 34)
      + [[20, 200, '#BDBDBD', 'peb'], [70, 196, '#A1673F', 'cone'], [120, 176, '#D7CCC8', 'log'], [170, 156, '#FFE082', 'sand'], [200, 124, '#6D4C41', 'mud']].map(([x, y, c, t]) => R(x - 24, y - 16, 48, 32, c, 4, 3)
        + (t === 'peb' ? [[-12, -6], [4, -8], [-4, 6], [12, 6]].map(([dx, dy]) => C(x + dx, y + dy, 5, '#ECEFF1', 1.5)).join('')
          : t === 'cone' ? [[-10, 0], [10, 0]].map(([dx]) => E(x + dx, y, 6, 9, '#8D5524', 1.5) + Lc(`M${x + dx - 5} ${y - 2}h10M${x + dx - 5} ${y + 3}h10`, '#5D4037', 1.5)).join('')
            : t === 'log' ? Lc(`M${x - 22} ${y - 8}h44M${x - 22} ${y}h44M${x - 22} ${y + 8}h44`, '#8D6E63', 3)
              : t === 'sand' ? C(x - 8, y, 1.5, '#C8A04E', 0) + C(x + 6, y - 6, 1.5, '#C8A04E', 0) + C(x + 10, y + 6, 1.5, '#C8A04E', 0)
                : P(`M${x - 14} ${y + 4}c4-4 8-4 12 0s8 4 12 0`, 'none', 2))).join('')
      + g(28, 228, 1, E(-8, 0, 10, 5, '#E53935', 2) + E(10, 0, 10, 5, '#E53935', 2)) + kid(120, 168, '#FFCA28', 1.3) + E(114, 174, 4, 2.5, '#FFE0BD', 1.5) + E(126, 174, 4, 2.5, '#FFE0BD', 1.5)),
  L('de/heidelberg/landmark-romer.v1.svg', 'ศาลากลางเรอเมอร์แห่งแฟรงก์เฟิร์ต', 'The Römer, Frankfurt\'s old town hall', ['römer', 'romer', 'เรอเมอร์', 'römerberg', 'frankfurt town hall', 'ศาลากลางแฟรงก์เฟิร์ต', 'stepped gables', 'หน้าจั่วขั้นบันได', 'frankfurt', 'แฟรงก์เฟิร์ต'], 'หาหลังคาจั่วสามหลังที่เป็นขั้นบันไดเรียงกัน', 'Find the three roofs side by side with stair-step edges',
    // three tall joined town houses with stepped gables, pink-red stone and arched windows and a little balcony, glass skyscrapers rising behind them
    sky('#E1F5FE') + [[10, 30, 30, '#90CAF9'], [44, 10, 26, '#B0BEC5'], [176, 20, 30, '#80DEEA'], [208, 40, 26, '#90CAF9']].map(([x, y, w, c]) => R(x, y, w, 120, c, 0, 2.5) + Array.from({ length: 6 }, (_, k) => Lc(`M${x} ${y + 14 + k * 16}h${w}`, '#E1F5FE', 1.5)).join('')).join('')
      + [[30, '#E57373'], [90, '#EF9A9A'], [150, '#E57373']].map(([x, c]) => P(`M${x} 210V84h8v-12h8v-12h8v-12h12v12h8v12h8v12h8v126z`, c, 3) + R(x + 12, 90, 36, 22, '#FFFFFF', 0, 2) + [0, 1].map((k) => P(`M${x + 14 + k * 18} 110v-12c0-6 14-6 14 0v12z`, '#90CAF9', 1.5)).join('') + R(x + 8, 120, 44, 20, '#FFFFFF', 0, 2) + [0, 1, 2].map((k) => R(x + 12 + k * 13, 124, 10, 12, '#90CAF9', 1, 1.5)).join('')).join('')
      + R(96, 146, 48, 8, '#FFC107', 1, 2.5) + Lc('M96 146v-6M144 146v-6M96 140h48', '#455A64', 2) + [[42], [102], [162]].map(([x]) => P(`M${x} 210v-30c0-16 36-16 36 0v30z`, '#8D6E63', 2.5)).join('')
      + P('M-4 210h248v34H-4z', '#BDBDBD', 3) + face(120, 168, 0.3)),
  L('de/heidelberg/landmark-treetop.v1.svg', 'ทางเดินยอดไม้และหอคอยเกลียวในป่าดำ', 'The treetop walk and its spiral tower in the Black Forest', ['treetop walk', 'ทางเดินยอดไม้', 'baumwipfelpfad', 'bad wildbad', 'บาดวิลด์บาด', 'wooden spiral tower', 'หอคอยไม้เกลียว', 'tube slide', 'สไลเดอร์ท่อ', 'black forest'], 'หาสไลเดอร์ท่อที่วนลงมาจากกลางหอคอยไม้', 'Find the tube slide twisting down through the middle of the wooden tower',
    // a tall round wooden lattice tower shaped like an hourglass rising above dark fir treetops, a wooden walkway on stilts leading to it, a silver tube slide spiralling down inside
    sky('#E3F2FD') + Array.from({ length: 7 }, (_, k) => fir(10 + k * 38, 210 - (k % 2) * 10, 2, k % 2 ? '#1B5E20' : '#2E7D32')).join('')
      + P('M126 40c30 0 44 4 44 4-8 40-8 80 0 120 0 0-14 4-44 4s-44-4-44-4c8-40 8-80 0-120 0 0 14-4 44-4z', '#D7A86E', 3)
      + Array.from({ length: 8 }, (_, k) => Lc(`M${88 + k * 10} 46c10 40 10 80 0 116`, '#A1673F', 2)).join('') + Array.from({ length: 6 }, (_, k) => Lc(`M${86 + Math.abs(k - 2.5) * 4} ${60 + k * 20}h${80 - Math.abs(k - 2.5) * 8}`, '#A1673F', 2)).join('')
      + Lc('M110 54c30 6 34 20 0 30s-30 24 0 30 30 24 0 30', '#B0BEC5', 8) + E(126, 42, 46, 8, '#D7A86E', 3)
      + R(-4, 120, 90, 8, '#D7A86E', 0, 3) + Lc('M10 128v90M40 128v90M70 128v90', '#8D6E63', 3) + kid(30, 120, '#E53935', 0.8) + kid(60, 120, '#FFCA28', 0.8) + face(126, 94, 0.3)),
];

export default { places: {}, items };
