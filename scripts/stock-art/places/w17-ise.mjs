// Wave 17: Ise and Shima (Mie) — Okage Yokocho's old street, Akafuku mochi, Ise udon, ise-ebi lobster, tekone-zushi, Hamayaki
// grilled shellfish, Toba Aquarium's dugong and sea otter, Mikimoto Pearl Island, the pearl oyster, an ama divers' hut,
// Shima Spain Village, Ago Bay's pearl rafts and the Spain-ship cruise, the Meoto Iwa wedded rocks, the Futami frog, the
// Shimakaze sightseeing train, the Uji Bridge and a cedar forest path.
// Skipped as repeats or bans: Ise Jingu's shrine buildings and torii (no gods or shrines as a subject), sea lions (California),
// a lighthouse at Cape Daiō (lighthouses elsewhere), oysters on ice (Dubrovnik), Matsusaka beef (Mie but not Ise), ninja (Iga),
// divers drawn as people (no real people: the huts and boats stand in for the ama).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const IS = { k1: '#00838F', k2: '#C2185B', k3: '#E0F7FA' };
const CITY = 'jp-ise', DIR = 'jp/ise';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a pearl: round, creamy, with a little shine
const pearl = (x, y, r) => C(x, y, r, '#FFF8F0', 3) + Lc(`M${x - r * 0.5} ${y - r * 0.2}q${r * 0.1} -${r * 0.5} ${r * 0.5} -${r * 0.5}`, '#F8BBD0', 2);
// a scalloped pearl oyster shell, open (cx, cy, half width)
const shell = (x, y, w) => P(`M${x - w} ${y}q${w * 0.2} -${w * 0.9} ${w} -${w * 0.9}q${w * 0.8} 0 ${w} ${w * 0.9}q-${w} ${w * 0.5} -${w * 2} 0z`, '#B0BEC5') + P(`M${x - w * 0.75} ${y - 2}q${w * 0.75} -${w * 0.7} ${w * 1.5} 0q-${w * 0.75} ${w * 0.35} -${w * 1.5} 0z`, '#E1BEE7', 2.5);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับอิเสะและชิมะ', 'Ise and Shima stamp'), kw: ['ise shima', 'อิเสะชิมะ', 'ise', 'อิเสะ', 'shima', 'ชิมะ', 'mie', 'มิเอะ', 'pearl', 'ไข่มุก', 'wedded rocks', 'หินคู่', 'toba', 'โทบะ'],
    // a smiling creamy pearl resting in an open shell on a blue wave, the two wedded rocks with their rope behind it, a little sun above
    svg: cityStamp('is-st', { name: 'ISE-SHIMA', sub: 'MIE · JAPAN', ...IS, emblem: C(100, 76, 9, '#FFCC80', 2.5)
      + P('M60 128c0-26 6-34 12-34s8 6 6 12 4 8 10 8v14z', '#78909C', 2.5) + P('M120 128c0-20 4-26 10-26s12 6 12 14 6 4 8 10v2z', '#78909C', 2.5) + Lc('M76 100q24 8 56 4', '#FFFFFF', 3)
      + shell(100, 126, 30) + C(100, 112, 11, '#FFF8F0', 2.5) + face(100, 111, 0.22, 'none') + P('M52 134q12 -6 24 0t24 0 24 0 24 0v8H52z', '#4FC3F7', 2.5) }) },

  D('ujibridge', 'สะพานอุจิกับป่าซีดาร์ริมแม่น้ำอิสุซุ', 'The Uji Bridge over the Isuzu River and the cedar forest', ['uji bridge', 'สะพานอุจิ', 'isuzu river', 'แม่น้ำอิสุซุ', 'wooden bridge', 'สะพานไม้', 'cedar forest', 'ป่าซีดาร์', 'ise jingu approach', 'ทางเข้าอิเสะจิงงู', '宇治橋', 'ise'],
    // a long arched wooden bridge with round gold-capped posts over a clear green river, tall cedar trees on both banks, little ducks swimming, a fish smiling in the water
    scene('is-d1', '#E8F5E9', P('M-4 110h248v140H-4z', '#A5D6A7', 0) + [10, 44, 190, 224].map((x, k) => R(x - 10, 20 + (k % 2) * 10, 20, 120, '#6D4C41', 4) + P(`M${x - 28} 90l28 -80 28 80zM${x - 34} 130l34 -70 34 70z`, '#2E7D32')).join('')
      + R(-4, 150, 248, 100, '#4DD0E1') + Lc('M30 180q20 6 40 0t40 0M130 206q20 6 40 0t40 0', '#E0F7FA', 3)
      + P('M20 126q100 -34 200 0v14H20z', '#8D6E63') + [28, 76, 120, 164, 212].map((x) => R(x - 3, 100 + Math.abs(x - 120) / 12, 6, 40, '#5D4037', 2) + C(x, 98 + Math.abs(x - 120) / 12, 5, '#FFD54F', 2.5)).join('')
      + R(20, 138, 200, 8, '#A1887F') + [[60, 176], [190, 196]].map(([x, y]) => E(x, y, 12, 8, '#FFF59D') + C(x + 9, y - 8, 6, '#FFF59D') + P(`M${x + 14} ${y - 8}l8 2 -8 3z`, '#FF8A65', 2)).join('')
      + g(130, 196, 1, E(0, 0, 16, 9, '#FFB74D', 3) + P('M16 0l12-9v18z', '#FFB74D', 3) + face(-2, -1, 0.3)))),
  D('okage', 'ถนนเก่าโอคาเงะโยโกะโจะ', 'Okage Yokochō, the old street by the shrine road', ['okage yokocho', 'โอคาเงะโยโกะโจะ', 'oharaimachi', 'old street', 'ถนนเก่า', 'edo-style street', 'ถนนสมัยเอโดะ', 'wooden shops', 'ร้านไม้', 'noren curtains', 'ผ้าม่านโนเร็น', 'おかげ横丁', 'ise'],
    // a cobbled lane lined with wooden shops with dark tile roofs and white noren curtains, red paper lanterns strung across, a street stall with steaming skewers, a smiling lucky cat in a doorway
    scene('is-d2', '#FFF3E0', P('M-4 80h86l-20 160H-4zM244 80h-86l20 160h64z', '#EFEBE9', 0) + P('M-4 70l92 -10v26H-4zM244 70l-92 -10v26h92z', '#455A64')
      + R(-4, 86, 82, 90, '#A1887F') + R(162, 86, 82, 90, '#A1887F') + [10, 40].map((x) => R(x, 100, 24, 52, '#FFF8E1', 2) + Lc(`M${x + 12} 100v52`, '#B0BEC5', 2)).join('') + [176, 206].map((x) => R(x, 100, 24, 52, '#FFF8E1', 2) + Lc(`M${x + 12} 100v52`, '#B0BEC5', 2)).join('')
      + P('M60 240l16 -150h88l16 150z', '#D7CCC8') + P('M-4 190h248v60H-4z', '#BCAAA4', 0) + Lc('M30 70q90 26 180 0', '#6D4C41', 3)
      + [58, 92, 120, 148, 182].map((x, k) => g(x, 80 + Math.sin(k * 1.3 + 2.2) * -3 + 14, 1, C(0, 0, 9, '#E53935', 3) + Lc('M-9 0h18', '#B71C1C', 1.5))).join('')
      + R(94, 150, 52, 30, '#8D6E63') + Lc('M100 150v-14M120 150v-14M140 150v-14', '#FFB74D', 3) + Lc('M110 130q-4 -8 0 -14M130 130q4 -8 0 -14', '#FFFFFF', 3)
      + g(120, 206, 1, E(0, 0, 18, 16, '#FFFFFF') + C(-11, -14, 6, '#FFFFFF') + C(11, -14, 6, '#FFFFFF') + P('M-14 8h28l-4 6h-20z', '#E53935', 2.5) + face(0, -2, 0.3)))),
  D('ago', 'แพไข่มุกกลางอ่าวอาโกะ', 'The pearl rafts of Ago Bay', ['ago bay', 'อ่าวอาโกะ', 'pearl raft', 'แพเลี้ยงไข่มุก', 'pearl farm', 'ฟาร์มไข่มุก', 'ria coast', 'ชายฝั่งหลายเกาะ', 'kashikojima', 'คาชิโกะจิมะ', 'shima', 'ชิมะ', '英虞湾', 'ise-shima national park'],
    // a calm blue bay dotted with green islands, rows of small floating pearl rafts with orange buoys, a little boat, the sun low over the water
    scene('is-d3', '#FFF8E1', C(176, 66, 22, '#FFCC80', 3) + P('M-4 110c30 -20 60 -22 80 0zM130 112c26 -26 54 -26 84 0zM176 112c16 -14 36 -14 70 0z', '#66BB6A') + P('M-4 106c30 -8 58 -8 84 4v-8z', '#2E7D32', 0)
      + R(-4, 108, 248, 150, '#4FC3F7') + [140, 164, 190, 214].map((y, k) => Lc(`M${10 + k * 4} ${y}q20 6 40 0t40 0 40 0 40 0`, '#E1F5FE', 3)).join('')
      + [[30, 150], [84, 150], [138, 150], [58, 190], [112, 190], [166, 190], [200, 154]].map(([x, y]) => R(x - 20, y, 40, 6, '#8D6E63', 2) + C(x - 14, y, 5, '#FF7043', 2) + C(x, y - 1, 5, '#FF7043', 2) + C(x + 14, y, 5, '#FF7043', 2)).join('')
      + g(176, 214, 1, P('M-24 0h48l-8 14h-32z', '#FFFFFF') + R(-14, -12, 18, 12, '#EF9A9A', 2) + Lc('M8 0v-18', INK, 3)) + g(30, 196, 1, pearl(0, 0, 9) + face(0, 0, 0.18, 'none')))),
  D('meoto', 'หินคู่เมโอโตะอิวะยามอาทิตย์ขึ้น', 'The wedded rocks, Meoto Iwa, at sunrise', ['meoto iwa', 'เมโอโตะอิวะ', 'wedded rocks', 'หินคู่', 'married rocks', 'futami okitama', 'ฟุตามิ', 'futami', 'sacred rope', 'เชือกศักดิ์สิทธิ์', 'sunrise', 'พระอาทิตย์ขึ้น', '夫婦岩', 'ise'],
    // two dark rocks standing in the sea, the tall one and the small one, joined by a thick straw rope with white paper strips, a big orange sun rising between them, soft waves
    scene('is-d4', '#FFE0B2', C(120, 100, 40, '#FF8A65', 3) + C(120, 100, 28, '#FFAB91', 0) + R(-4, 112, 248, 140, '#4DB6AC')
      + [[132, 6, 10], [150, 14, 6]].map(([y, k]) => '').join('') + Lc('M20 130q30 6 60 0t60 0 60 0 40 0', '#B2DFDB', 3) + Lc('M30 210q30 6 60 0t60 0 60 0', '#B2DFDB', 3)
      + P('M40 150c-6 -50 6 -80 22 -84 16 4 24 34 20 84z', '#546E7A') + P('M150 150c-4 -30 4 -46 16 -48 12 2 20 18 18 48z', '#607D8B') + Lc('M62 106q50 -4 104 -4', '#FFE082', 5) + Lc('M62 106q50 6 104 -2', '#FFCA28', 3)
      + [[84, 110], [100, 112], [116, 112], [132, 110], [148, 106]].map(([x, y]) => P(`M${x} ${y}l-3 12 3 -3 3 3z`, '#FFFFFF', 2)).join('') + face(61, 124, 0.4, 'none') + face(167, 126, 0.3, 'none'))),

  L('akafuku', 'โมจิอากาฟุกุ ถั่วแดงเป็นลูกคลื่นแม่น้ำอิสุซุ', 'Akafuku mochi, soft rice cake in a wave of red bean', ['akafuku', 'อากาฟุกุ', 'akafuku mochi', 'โมจิอากาฟุกุ', 'red bean mochi', 'โมจิถั่วแดง', 'ise sweets', 'ขนมอิเสะ', 'mochi', 'โมจิ', 'okage yokocho', 'โอคาเงะโยโกะโจะ'], 'หาคลื่นสามเส้นบนโมจิ', 'Find the three waves on the mochi',
    // a little red lacquer tray with three round white mochi each wearing a smooth dark red-bean wave with three ridges, a cup of green tea beside them, one mochi smiling
    R(26, 130, 188, 48, '#C62828', 10) + R(34, 136, 172, 36, '#E53935', 8)
      + [64, 120, 176].map((x, k) => E(x, 146, 26, 20, '#FFFFFF') + P(`M${x - 26} 144c6 -22 46 -22 52 0q-26 10 -52 0z`, '#6D2B3A') + Lc(`M${x - 16} 140q16 -4 32 0M${x - 14} 146q14 -4 28 0`, '#9C4A5C', 2) + (k === 1 ? face(x, 156, 0.28) : '')).join('')
      + R(168, 74, 40, 40, '#FFFFFF', 8) + R(172, 80, 32, 12, '#9CCC65', 0) + Lc('M208 86q16 0 16 12t-16 10', '#FFFFFF', 5) + Lc('M180 62q-6 -8 0 -14M194 62q6 -8 0 -14', '#B0BEC5', 3) + face(188, 104, 0.26, 'none')),
  L('iseudon', 'อุด้งอิเสะเส้นนุ่มจิ๊บในซอสโชยุเข้มข้น', 'Ise udon, fat soft noodles in dark sweet soy', ['ise udon', 'อุด้งอิเสะ', 'udon', 'อุด้ง', 'soft noodles', 'เส้นนุ่ม', 'dark soy sauce', 'ซอสโชยุเข้ม', 'tamari', 'ทามาริ', 'noodles', 'ก๋วยเตี๋ยวญี่ปุ่น', 'okage yokocho', 'โอคาเงะโยโกะโจะ'], 'หาไข่ดิบสีเหลืองกลางชาม', 'Find the yellow egg yolk in the bowl',
    // a wide white bowl of thick pale noodles curled in a glossy dark brown sauce, chopped green spring onion on top and a raw yellow egg yolk in the middle, chopsticks resting on the rim
    P('M26 118h188a94 82 0 0 1 -188 0z', '#FFFFFF') + E(120, 118, 94, 22, '#5D4037') + P('M44 118c20 -12 40 8 60 -6s40 8 60 -4 32 6 32 6c-30 14 -150 14 -152 4z', '#FFF3E0', 3)
      + Lc('M56 120q20 -10 40 0t40 0 40 0', '#FFFFFF', 7) + E(120, 114, 16, 10, '#FFC107', 3) + C(114, 111, 3, '#FFF59D', 0)
      + [[84, 114], [92, 120], [150, 118], [158, 112], [138, 124]].map(([x, y]) => R(x - 5, y - 2, 10, 4, '#7CB342', 1.5)).join('')
      + Lc('M176 46l-52 54M190 52l-50 52', '#6D4C41', 5) + face(120, 156, 0.36)),
  L('iseebi', 'กุ้งมังกรอิเสะเอบิสีแดงเจ้าหนวดยาว', 'The red ise-ebi spiny lobster with its long feelers', ['iseebi', 'อิเสะเอบิ', 'ise-ebi', 'ise ebi', 'spiny lobster', 'กุ้งมังกร', 'lobster', 'กุ้งล็อบสเตอร์', 'seafood', 'อาหารทะเล', 'shima', 'ชิมะ', 'sashimi', 'ซาชิมิ'], 'หาหนวดยาวสองเส้นของกุ้ง', 'Find the two long feelers',
    // a big red-orange spiny lobster seen from above, curved segmented tail, two very long curling antennae, small claw-less legs, big smiling face on the head shield, a lemon wedge beside it
    P('M120 76c-24 0 -34 16 -32 40 4 30 8 40 14 54l18 -2 18 2c6 -14 10 -24 14 -54 2 -24 -8 -40 -32 -40z', '#E64A19') + [100, 120, 140, 160, 180].map((y, k) => Lc(`M${100 + k * 2} ${y}q${20 - k * 2} 8 ${40 - k * 4} 0`, '#FFAB91', 3)).join('')
      + P('M102 190l18 20 18 -20z', '#BF360C') + Lc('M104 80q-20 -30 -44 -34t-30 10M136 80q20 -30 44 -34t30 10', '#E64A19', 5) + Lc('M96 112l-30 -4M92 130l-32 4M96 148l-28 14M144 112l30 -4M148 130l32 4M144 148l28 14', '#E64A19', 5)
      + C(106, 86, 4, '#FFFFFF', 2) + C(134, 86, 4, '#FFFFFF', 2) + face(120, 118, 0.42) + P('M186 196a22 22 0 0 1 36 -14z', '#FFF176', 3)),
  L('tekone', 'ข้าวหน้าปลาเทโกเนะซูชิแบบชาวประมง', 'Tekone-zushi, a fisherman’s bowl of marinated tuna on rice', ['tekone zushi', 'เทโกเนะซูชิ', 'tekone', 'marinated tuna', 'ปลาทูน่าหมักซอส', 'bonito rice bowl', 'ข้าวหน้าปลา', 'fisherman food', 'อาหารชาวประมง', 'sushi rice', 'ข้าวซูชิ', 'ise', 'shima'], 'หาใบชิโสะสีเขียวบนปลา', 'Find the green shiso leaf on the fish',
    // a round wooden bowl of white sushi rice covered by overlapping glossy deep red slices of marinated tuna, a green shiso leaf, white sesame and a thin slice of nori on top, wasabi dot
    P('M30 116h180a90 76 0 0 1 -180 0z', '#8D6E63') + E(120, 116, 90, 24, '#FFFFFF') + [[60, 118], [90, 112], [120, 108], [150, 112], [180, 118]].map(([x, y]) => P(`M${x - 22} ${y}q22 -20 44 0q-22 14 -44 0z`, '#B71C1C', 3) + Lc(`M${x - 12} ${y - 2}q12 -6 24 0`, '#EF9A9A', 2)).join('')
      + P('M96 98l22 -22 22 22q-22 12 -44 0z', '#43A047', 3) + R(104, 118, 30, 6, '#263238', 1) + C(140, 124, 5, '#AED581', 2) + [76, 100, 150, 164].map((x) => C(x, 106, 1.6, '#FFF8E1', 0)).join('') + face(120, 152, 0.34)),
  L('hamayaki', 'หอยและอาหารทะเลย่างบนเตาถ่านริมอ่าว', 'Hamayaki, shellfish grilled on a charcoal stove by the bay', ['hamayaki', 'ฮามายากิ', 'grilled shellfish', 'หอยย่าง', 'grilled seafood', 'อาหารทะเลย่าง', 'charcoal grill', 'เตาถ่าน', 'turban shell', 'หอยเทอร์บัน', 'abalone', 'เป๋าฮื้อ', 'toba', 'โทบะ'], 'หาควันขาวสามสายเหนือเตา', 'Find the three white smoke wisps over the stove',
    // a square clay charcoal stove glowing orange, a wire rack on top with a turban shell, a pink scallop shell and a halved lemon, three curls of smoke, a pair of long chopsticks leaning on the side
    R(52, 134, 136, 70, '#8D6E63', 8) + R(60, 140, 120, 22, '#3E2723', 4) + [72, 94, 116, 138, 160].map((x) => R(x, 144, 14, 12, '#FF7043', 3)).join('') + Lc('M44 124h152', '#455A64', 4) + Lc('M60 124v-8M120 124v-8M180 124v-8', '#455A64', 3)
      + g(90, 112, 1, P('M-22 12c0 -30 12 -42 22 -42s22 12 22 42z', '#A1887F') + Lc('M-14 4q14 -8 28 0M-10 -8q10 -6 20 0', '#6D4C41', 2.5) + face(0, 0, 0.26))
      + g(144, 114, 1, P('M-24 10q0 -30 24 -30t24 30q-24 -6 -48 0z', '#F8BBD0') + Lc('M-12 6v-20M0 6v-26M12 6v-20', '#E57373', 2.5)) + g(184, 118, 1, C(0, 0, 10, '#FFF176') + Lc('M-10 0h20M0 -10v20', '#FBC02D', 2))
      + Lc('M86 96q-8 -14 0 -26t0 -22M120 92q-8 -14 0 -26t0 -22M154 96q-8 -14 0 -26t0 -22', '#CFD8DC', 4)),
  L('dugong', 'พะยูนยิ้มเอียงที่พิพิธภัณฑ์สัตว์น้ำโทบะ', 'The smiling dugong of Toba Aquarium', ['toba aquarium', 'พิพิธภัณฑ์สัตว์น้ำโทบะ', 'dugong', 'พะยูน', 'sea cow', 'วัวทะเล', 'manatee', 'มานาที', 'toba', 'โทบะ', 'aquarium', 'สวนสัตว์น้ำ', '鳥羽水族館'], 'หาใบสาหร่ายที่พะยูนกินอยู่', 'Find the sea grass the dugong is eating',
    // a plump grey-blue dugong swimming sideways with a rounded whale-like tail fork, two little flippers, a wide snout with whiskers, tiny eyes, a bunch of green sea grass in its mouth, bubbles rising, blue water
    E(120, 126, 110, 98, '#B3E5FC', 0) + P('M30 130c0 -40 50 -52 100 -48 34 2 46 20 52 30l32 -26c4 14 0 36 -8 44 8 8 12 24 8 40l-32 -22c-10 22 -50 36 -100 28 -30 -6 -52 -20 -52 -46z', '#8FA4B5') + P('M96 104c16 -4 28 6 30 18 -16 -2 -26 -8 -30 -18z', '#78909C', 3)
      + E(52, 140, 22, 18, '#9FB3C4', 3) + Lc('M40 148q-8 4 -10 10M52 150q-4 6 -4 12', INK, 2) + Lc('M46 148q4 12 10 12', INK, 0) + C(60, 124, 3.4, INK, 0) + face(74, 134, 0.28, 'none') + P('M36 156q-12 4 -14 14 12 -2 20 -8z', '#66BB6A', 2.5)
      + [[92, 66, 6], [104, 50, 4], [86, 40, 3]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2)).join('') + Lc('M110 220v-30M130 220q-6 -16 0 -30', '#43A047', 4)),
  L('otter', 'นากทะเลลอยน้ำหงายท้องที่โทบะ', 'A sea otter floating on its back at Toba', ['sea otter', 'นากทะเล', 'otter', 'นาก', 'toba aquarium', 'พิพิธภัณฑ์สัตว์น้ำโทบะ', 'toba', 'โทบะ', 'floating', 'ลอยน้ำ', 'cute animal', 'สัตว์น่ารัก', 'aquarium', 'สวนสัตว์น้ำ'], 'หาหอยตัวเล็กที่นากถือไว้บนท้อง', 'Find the little shell on the otter’s tummy',
    // a round brown sea otter lying belly up on blue waves, cream-coloured face and chest, two tiny paws holding a small pink shell on its tummy, a thick tapered tail, little ears, water ripples
    P('M-4 150q20 -10 40 0t40 0 40 0 40 0 40 0 40 0v100H-4z', '#4FC3F7') + E(120, 140, 82, 38, '#8D6E63') + E(120, 140, 60, 26, '#A1887F', 0) + P('M196 150q30 4 34 20 -26 6 -44 -8z', '#6D4C41')
      + C(60, 120, 32, '#BCAAA4') + C(46, 94, 8, '#8D6E63', 3) + C(74, 94, 8, '#8D6E63', 3) + E(58, 128, 20, 14, '#EFEBE9', 3) + C(56, 126, 4, INK, 0) + face(60, 116, 0.34)
      + g(120, 134, 1, P('M-16 10q0 -22 16 -22t16 22q-16 6 -32 0z', '#F8BBD0') + Lc('M-8 6v-12M0 6v-16M8 6v-12', '#E57373', 2)) + C(104, 128, 7, '#6D4C41', 3) + C(138, 128, 7, '#6D4C41', 3)
      + Lc('M20 188q20 6 40 0t40 0 40 0 40 0', '#E1F5FE', 3)),
  L('pearl', 'หอยมุกอะโกยะกับไข่มุกที่กำลังเปล่งประกาย', 'An Akoya pearl oyster opening to show its shining pearl', ['akoya pearl', 'ไข่มุกอะโกยะ', 'pearl', 'ไข่มุก', 'pearl oyster', 'หอยมุก', 'mikimoto', 'มิกิโมโต', 'cultured pearl', 'ไข่มุกเลี้ยง', 'ago bay', 'อ่าวอาโกะ', 'jewel', 'เครื่องประดับ'], 'หาไข่มุกกลมวงขาวในเปลือก', 'Find the round white pearl in the shell',
    // a big grey-green ridged oyster shell open like a book, the inside shimmering pink-lilac mother of pearl, a large cream pearl with a shine and a smiling face in the middle, tiny sparkles all round
    shell(120, 196, 98) + P('M40 150q80 -14 160 0q-14 36 -80 42 -66 -6 -80 -42z', '#CE93D8', 3) + P('M54 152q66 -10 132 0q-12 26 -66 32 -54 -6 -66 -32z', '#F3E5F5', 0) + C(120, 130, 30, '#FFF8F0', 4)
      + Lc('M100 118q4 -14 22 -16', '#F8BBD0', 4) + face(120, 134, 0.46) + [[44, 70], [196, 66], [60, 118], [186, 116], [120, 52]].map(([x, y]) => P(`M${x} ${y - 9}l2.5 6.5 6.5 2.5 -6.5 2.5 -2.5 6.5 -2.5 -6.5 -6.5 -2.5 6.5 -2.5z`, '#FFF176', 2)).join('')),
  L('amahut', 'กระท่อมนักดำน้ำหญิงอามะริมทะเล', 'The ama divers’ hut by the sea, with its drying rack', ['ama diver', 'นักดำน้ำอามะ', 'ama hut', 'กระท่อมอามะ', 'ama', 'women divers', 'นักดำน้ำหญิง', 'diving hut', 'กระท่อมริมทะเล', 'toba', 'โทบะ', 'shima', 'ชิมะ', 'sea folk', 'ชาวประมง'], 'หาห่วงสีส้มบนที่ตากอวน', 'Find the orange buoys on the drying rack',
    // a small weathered wooden hut with a straw-thatched roof on the shore, a white diving suit and a hood hung on a pole beside it (no one wearing it), a wooden tub, orange buoys, nets, a smiling little crab at the door
    P('M-4 170q60 -10 120 0t128 0v90H-4z', '#FFE0B2', 0) + R(54, 100, 100, 70, '#A1887F', 3) + P('M40 104l66 -52 66 52z', '#F9A825') + Lc('M54 100l52 -40 52 40M70 112l36 -30 36 30', '#E65100', 2.5) + R(94, 130, 24, 40, '#5D4037', 3) + R(126, 118, 18, 18, '#90CAF9', 2) + Lc('M135 118v18M126 127h18', '#FFFFFF', 2)
      + Lc('M176 96v78M168 174h16', '#6D4C41', 6) + P('M156 104h40l-8 40h-24z', '#FFFFFF') + Lc('M156 104h40', '#6D4C41', 4) + C(176, 98, 10, '#FFFFFF') + [[170, 150], [184, 150], [177, 160]].map(([x, y]) => C(x, y, 4, '#FF7043', 2)).join('')
      + R(20, 150, 30, 20, '#8D6E63', 4) + C(206, 164, 8, '#FF7043', 2.5) + g(106, 178, 1, E(0, 0, 10, 7, '#EF5350') + Lc('M-10 0l-6 -6M10 0l6 -6', '#EF5350', 3) + face(0, -1, 0.2, 'none'))),
  L('mikimoto', 'เกาะไข่มุกมิกิโมโตะกับอาคารขาวริมทะเล', 'Mikimoto Pearl Island, the white pearl museum by the sea', ['mikimoto pearl island', 'เกาะไข่มุกมิกิโมโตะ', 'mikimoto', 'มิกิโมโต', 'pearl island', 'เกาะไข่มุก', 'pearl museum', 'พิพิธภัณฑ์ไข่มุก', 'toba', 'โทบะ', 'ama show', 'ชมนักดำน้ำ', '御木本真珠島'], 'หาไข่มุกลูกใหญ่บนหลังคา', 'Find the big pearl on the roof',
    // a small green island joined to the shore by a little bridge, a white museum with a curved blue-tiled roof topped by a huge cream pearl, a wooden ama boat and a pearl-shaped lantern beside it, blue sea
    P('M-4 150q30 -8 60 0t60 0 60 0 70 0v100H-4z', '#4FC3F7') + P('M40 156c0 -34 40 -40 80 -40s80 6 80 40z', '#81C784') + R(66, 100, 108, 56, '#FFFFFF', 4) + P('M56 104q64 -48 128 0z', '#42A5F5') + Lc('M72 96q48 -30 96 0', '#BBDEFB', 3) + C(120, 62, 17, '#FFF8F0', 4) + Lc('M110 54q4 -8 14 -8', '#F8BBD0', 3) + face(120, 66, 0.26, 'none')
      + [82, 106, 130, 154].map((x) => R(x, 120, 14, 22, '#90CAF9', 2)).join('') + P('M-4 160h64v8H-4z', '#8D6E63') + g(52, 196, 1, P('M-34 0q34 22 68 0l-6 -12h-56z', '#E65100') + R(-26, -16, 52, 6, '#FFFFFF', 2) + R(-4, -30, 8, 14, '#BCAAA4', 1)) + Lc('M184 190q20 6 40 0', '#E1F5FE', 3)),
  L('espana', 'กังหันลมและหอสเปนที่หมู่บ้านชิมะสเปน', 'The windmill and the red-roofed tower of Shima Spain Village', ['shima spain village', 'หมู่บ้านชิมะสเปน', 'parque espana', 'ปาร์เก้เอสปัญญา', 'spain village', 'หมู่บ้านสเปน', 'spanish windmill', 'กังหันลมสเปน', 'theme park', 'สวนสนุก', 'shima', 'ชิมะ', 'パルケエスパーニャ'], 'หาธงแดงเหลืองบนยอดหอ', 'Find the red and yellow flag on the tower',
    // a whitewashed windmill with four wooden sails beside a white Spanish tower with orange roof tiles and a red-and-yellow flag, a blue-and-yellow tile fountain between them, a smiling sun
    R(0, 190, 240, 50, '#FFCC80', 0) + P('M40 190l8 -76h34l8 76z', '#FFFFFF') + P('M36 118q28 -36 56 0z', '#F4511E') + Lc('M64 86v30', INK, 0) + R(58, 150, 12, 40, '#6D4C41', 3)
      + g(64, 108, 1, Lc('M0 0l-34 -34M0 0l34 34M0 0l34 -34M0 0l-34 34', '#8D6E63', 5) + [[-34, -34], [34, 34], [34, -34], [-34, 34]].map(([x, y]) => P(`M0 0l${x} ${y}l${y > 0 ? -10 : 10} ${x > 0 ? -10 : 10}z`, '#FFF8E1', 2)).join('') + C(0, 0, 6, '#6D4C41', 3)) + face(64, 164, 0.3, 'none')
      + R(150, 70, 44, 122, '#FFFFFF', 3) + P('M144 76l28 -34 28 34z', '#E64A19') + Lc('M172 42v-16', INK, 3) + P('M172 26l18 5 -18 5z', '#E53935', 2.5) + R(160, 100, 12, 22, '#42A5F5', 2) + R(178, 100, 12, 22, '#42A5F5', 2) + R(160, 140, 12, 22, '#FFC107', 2) + R(178, 140, 12, 22, '#FFC107', 2) + R(166, 168, 18, 24, '#5D4037', 6)
      + E(116, 204, 26, 8, '#42A5F5') + Lc('M116 196v-14q-8 -6 -14 -2M116 182q8 -6 14 -2', '#4FC3F7', 3)),
  L('frog', 'กบน้อยนำโชคที่หินคู่ฟุตามิ', 'The lucky stone frogs of Futami', ['futami frog', 'กบฟุตามิ', 'lucky frog', 'กบนำโชค', 'frog statue', 'รูปปั้นกบ', 'kaeru', 'กบ', 'futami okitama shrine', 'ฟุตามิโอกิทามะ', 'futami', 'ฟุตามิ', 'good luck charm', 'เครื่องรางนำโชค'], 'หากบตัวเล็กตัวเล็กบนหลังตัวใหญ่', 'Find the little frog on the big frog’s back',
    // a fat green stone frog statue sitting on a small round pedestal, a tiny baby frog on its head, wide smile, a pink fabric bib, stone lantern shapes in the background, a few green leaves
    R(86, 176, 68, 24, '#B0BEC5', 6) + E(120, 140, 56, 48, '#66BB6A') + E(120, 152, 36, 26, '#C5E1A5', 3) + C(90, 100, 18, '#66BB6A') + C(150, 100, 18, '#66BB6A') + C(90, 98, 8, '#FFFFFF', 2.5) + C(150, 98, 8, '#FFFFFF', 2.5) + C(90, 99, 3.5, INK, 0) + C(150, 99, 3.5, INK, 0)
      + face(120, 136, 0.44, 'smile') + P('M96 166q24 22 48 0l-8 20h-32z', '#F48FB1', 3) + g(120, 82, 1, E(0, 0, 14, 11, '#9CCC65') + C(-6, -9, 4, '#FFFFFF', 2) + C(6, -9, 4, '#FFFFFF', 2) + C(-6, -9, 1.5, INK, 0) + C(6, -9, 1.5, INK, 0) + Lc('M-4 0q4 3 8 0', INK, 2))
      + P('M40 200l8 -52h16l8 52zM172 200l8 -52h16l8 52z', '#CFD8DC', 3) + P('M38 150h34l-6 -12h-22zM170 150h34l-6 -12h-22z', '#90A4AE', 3)),
  L('shimakaze', 'รถไฟท่องเที่ยวชิมะคาเซะสีเขียวอมน้ำเงินกับหน้ารถโค้งมน', 'The Shimakaze sightseeing train with its rounded nose', ['shimakaze', 'ชิมะคาเซะ', 'sightseeing train', 'รถไฟท่องเที่ยว', 'kintetsu', 'คินเท็ตสึ', 'limited express', 'รถด่วนพิเศษ', 'train', 'รถไฟ', 'toba', 'โทบะ', 'kashikojima', 'คาชิโกะจิมะ', 'しまかぜ'], 'หากระจกหน้าต่างบานใหญ่ของรถไฟ', 'Find the big picture windows of the train',
    // a sleek white train with a deep blue stripe, a long rounded nose with a big front window that looks like a smiling face, big side windows, a gold emblem, rails and sleepers, a little bit of blue sea behind
    R(-4, 130, 248, 120, '#4FC3F7', 0) + Lc('M-4 170q30 6 60 0t60 0 60 0 70 0', '#E1F5FE', 3) + R(-4, 196, 248, 10, '#8D6E63') + Lc('M-4 190h248', '#78909C', 5) + [10, 50, 90, 130, 170, 210].map((x) => R(x, 198, 18, 8, '#5D4037', 1)).join('')
      + P('M16 192V124q0 -20 24 -20h130q36 0 52 36l10 26v26z', '#FFFFFF') + R(16, 156, 224, 14, '#1565C0', 0) + [44, 84, 124].map((x) => R(x, 118, 30, 28, '#B3E5FC', 6)).join('') + P('M168 114h26q20 4 30 24l-4 8h-52z', '#90CAF9', 3) + Lc('M16 176h224', '#FFC107', 3)
      + face(200, 134, 0.3) + C(66, 202, 9, '#455A64', 3) + C(160, 202, 9, '#455A64', 3)),
  L('espanaship', 'เรือสเปนเซ็นล่องอ่าวอาโกะรูปเรือใบสเปน', 'The Espana-sen, a Spanish galleon sailing Ago Bay', ['espana-sen', 'เรือเอสปัญญาเซ็น', 'spanish galleon', 'เรือใบสเปน', 'ago bay cruise', 'ล่องเรืออ่าวอาโกะ', 'galleon', 'เรือใบโบราณ', 'cruise', 'ล่องเรือ', 'kashikojima', 'คาชิโกะจิมะ', 'shima', 'ชิมะ', 'エスペランサ'], 'หาธงแดงบนเสากระโดงเรือ', 'Find the red flag on the mast',
    // an old-style wooden sailing ship with a high carved stern, three tall cream sails with red crosses, a red flag on the top mast, a row of little round windows, rolling blue waves, a smiling seagull on the bow
    R(-4, 164, 248, 96, '#4FC3F7', 0) + P('M30 150h180l-18 38q-72 14 -144 0z', '#8D6E63') + R(30, 142, 180, 10, '#6D4C41', 3) + [60, 90, 120, 150, 180].map((x) => C(x, 166, 4.5, '#FFE082', 2)).join('') + P('M26 150h14v-24H26z', '#5D4037')
      + Lc('M80 142V50M124 142V34M168 142V58', '#5D4037', 5) + [[80, 54, 56, 70], [124, 38, 70, 84], [168, 62, 44, 56]].map(([x, y, w, h]) => P(`M${x - w / 2} ${y}q${w / 2} -10 ${w} 0v${h}q-${w / 2} 10 -${w} 0z`, '#FFF8E1') + Lc(`M${x} ${y + 6}v${h - 6}M${x - w / 4} ${y + h / 2}h${w / 2}`, '#E53935', 3.5)).join('') + P('M124 34l22 6 -22 6z', '#E53935', 2.5)
      + g(214, 134, 1, E(0, 0, 11, 8, '#FFFFFF') + C(-8, -6, 5, '#FFFFFF') + P('M-12 -6l-8 2 8 3z', '#FFB300', 2) + C(-9, -7, 1.4, INK, 0)) + Lc('M10 200q30 -10 60 0t60 0 60 0 60 0', '#E1F5FE', 4)),
  L('cedarpath', 'ทางเดินป่าซีดาร์โบราณมีโคมหินและมอสเขียว', 'A path through the old cedar forest with a mossy stone lantern', ['cedar forest', 'ป่าซีดาร์', 'forest path', 'ทางเดินป่า', 'stone lantern', 'โคมหิน', 'moss', 'มอส', 'sacred forest', 'ป่าศักดิ์สิทธิ์', 'ancient trees', 'ต้นไม้โบราณ', 'ise jingu forest', 'ป่าอิเสะจิงงู', 'gravel path'], 'หากระรอกตัวเล็กบนลำต้น', 'Find the little squirrel on the tree',
    // two huge cedar trunks with rough bark rising out of the top of the picture, a pale gravel path winding between them, a moss-covered stone lantern beside the path, sunbeams through the leaves, a smiling squirrel on one trunk
    R(0, 190, 240, 50, '#C5E1A5', 0) + P('M20 240c40 -40 60 -70 100 -100 36 30 62 70 100 100z', '#E0D6C8') + R(26, 20, 40, 190, '#795548', 6) + R(172, 20, 40, 190, '#8D6E63', 6) + Lc('M38 30v170M52 24v176M184 30v170M198 24v176', '#5D4037', 3)
      + P('M26 20c-10 -10 20 -16 40 0z', '#2E7D32') + P('M172 20c-10 -10 20 -16 40 0z', '#2E7D32') + Lc('M90 20l-20 90M114 20l-8 80M138 20l14 80', '#FFF59D', 5)
      + R(98, 128, 44, 22, '#B0BEC5', 3) + R(104, 100, 32, 28, '#90A4AE', 4) + P('M96 100h48l-24 -20z', '#78909C', 3) + R(110, 108, 20, 14, '#FFE082', 2) + P('M100 150q20 -6 40 0v10h-40z', '#78909C', 3) + P('M98 126q12 -10 24 0 -10 6 -24 0zM126 100q8 -6 16 0', '#66BB6A', 2.5)
      + g(190, 130, 1, E(0, 0, 11, 14, '#BF6A30') + C(0, -16, 9, '#BF6A30') + C(-6, -24, 3.5, '#BF6A30', 2.5) + C(6, -24, 3.5, '#BF6A30', 2.5) + P('M10 10q22 -20 8 -42q-10 -6 -16 6q8 14 -8 32z', '#D88A4E', 3) + face(0, -16, 0.2, 'none'))),
];

export default {
  places: {
    'jp-ise': { country: 'jp', wave: 3, name: nm('อิเสะและชิมะ', 'Ise and Shima'), tz: 'Asia/Tokyo', ll: [34.49, 136.71],
      alias: ['ise-shima', 'ise shima', 'ise', 'อิเสะ', 'shima', 'ชิมะ', 'อิเสะชิมะ', '伊勢', '志摩', '伊勢志摩', 'ise jingu', 'อิเสะจิงงู', 'okage yokocho', 'โอคาเงะโยโกะโจะ', 'toba', 'โทบะ', '鳥羽',
        'toba aquarium', 'mikimoto pearl island', 'มิกิโมโตะ', 'meoto iwa', 'เมโอโตะอิวะ', 'futami', 'ฟุตามิ', 'ago bay', 'อ่าวอาโกะ', 'kashikojima', 'คาชิโกะจิมะ',
        'shima spain village', 'parque espana', 'หมู่บ้านชิมะสเปน', 'mie prefecture', 'มิเอะ', '三重', 'isuzu river', 'ise udon', 'akafuku'],
      colors: IS },
  },
  items,
};
