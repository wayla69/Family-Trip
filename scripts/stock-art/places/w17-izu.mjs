// Wave 17: Izu and Atami (Atami, Ito, Kawazu, Shimoda, Jogasaki, Dogashima, Shuzenji, Mount Omuro) —
// the seaside hot-spring peninsula's own things: Atami's hill castle and bay fireworks, the Kawazu early cherry blossom along its
// river, the Jogasaki lava coast and its swinging bridge, the Black Ships of Shimoda, the capybaras' hot bath at the Shaboten
// zoo, Ito's tub-boat race, Nakaizu wasabi, kinmedai, the Odoriko train, a foot bath, Atami's drying fish, onsen manju,
// Mount Omuro's grass cone and chairlift, Atami's plum garden, Shuzenji's bamboo path, Dogashima's rock arch.
// Skipped as repeats or bans: Atami's beach palms as a separate picture (they stand in the Atami day scene), Izu Granpal Park
// (no distinct subject), the Fuji view from Suruga Bay (Fuji pictures), the Atami ropeway (a ropeway exists elsewhere in the
// library), Shirahama beach (jp-shirahama is another town).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const IZ = { k1: '#00897B', k2: '#E64A19', k3: '#E0F7FA' };
const CITY = 'jp-izu', DIR = 'jp/izu';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const bloom = (x, y, r, c = '#F8BBD0') => C(x, y, r, c, 3) + C(x - r * 0.7, y + r * 0.35, r * 0.7, c, 3) + C(x + r * 0.7, y + r * 0.35, r * 0.7, c, 3);
// a firework burst: rays and dots round a centre
const burst = (x, y, r, c) => Lc([0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const t = a * Math.PI / 180, f = (v) => v.toFixed(1); return `M${f(x + Math.cos(t) * r * 0.35)} ${f(y + Math.sin(t) * r * 0.35)}L${f(x + Math.cos(t) * r)} ${f(y + Math.sin(t) * r)}`; }).join(''), c, 3.5) + C(x, y, 4, c, 0);
// a three-tier white castle on a stone base (cx = middle, by = foot of the base, s = scale)
const castle = (cx, by, s) => g(cx, by, s, R(-26, -22, 52, 22, '#B0BEC5', 0, 3) + R(-20, -48, 40, 26, '#FFFFFF', 0, 3) + P('M-28 -48l28-20 28 20z', '#43A047', 3) + R(-13, -72, 26, 20, '#FFFFFF', 0, 3) + P('M-19 -72l19-16 19 16z', '#43A047', 3) + P('M-9 -88l9-12 9 12z', '#FFD54F', 2.5) + R(-4, -42, 8, 12, '#795548', 0, 0));

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับอิซุและอาตามิ', 'Izu and Atami stamp'), kw: ['izu', 'อิซุ', 'atami', 'อาตามิ', 'shizuoka', 'ชิซูโอกะ', 'hot spring town', 'เมืองออนเซ็น', 'atami castle', 'ปราสาทอาตามิ', 'fireworks', 'ดอกไม้ไฟ'],
    // a smiling white castle on a green hill above the blue bay, a pink firework bursting over it and a little orange sun
    svg: cityStamp('iz-st', { name: 'IZU', sub: 'ATAMI · JAPAN', ...IZ, emblem: R(50, 110, 100, 26, '#4FC3F7', 0, 0) + Lc('M60 122h14M118 126h16', '#E1F5FE', 2.5) + P('M50 128c20-26 60-30 100-8v16H50z', '#81C784', 0)
      + castle(98, 118, 0.62) + burst(138, 66, 18, '#F06292') + C(62, 70, 9, '#FFB74D', 2.5) + face(98, 98, 0.26, 'smile') }) },

  D('atami', 'หาดอาตามิกับปราสาทและดอกไม้ไฟกลางอ่าว', 'Atami beach, the castle and the fireworks over the bay', ['atami', 'อาตามิ', 'atami sun beach', 'หาดซันบีช', 'atami fireworks', 'ดอกไม้ไฟอาตามิ', 'atami castle', 'ปราสาทอาตามิ', 'sagami bay', 'อ่าวซากามิ', 'palm trees', 'ต้นปาล์ม'],
    // a night sky over the dark bay with three big firework bursts in pink, gold and green, Atami Castle white on its hill, a curve of beach with two palm trees, boats with lanterns on the water
    scene('iz-d1', '#1A237E', C(54, 50, 2, '#FFFFFF', 0) + C(196, 40, 2, '#FFFFFF', 0) + C(110, 30, 2, '#FFFFFF', 0) + burst(70, 66, 30, '#F06292') + burst(150, 50, 34, '#FFD54F') + burst(196, 92, 24, '#81C784')
      + P('M-4 128h248v130H-4z', '#1565C0', 0) + Lc('M20 150h30M120 160h40M190 146h30', '#64B5F6', 3) + P('M-4 128c30-16 60-40 100-44s70 18 80 44z', '#2E7D32') + castle(76, 104, 0.7) + face(76, 70, 0.3)
      + P('M-4 190c60-26 150-22 248 6v60H-4z', '#FFE0B2') + [[40, 206], [190, 204]].map(([x, y]) => Lc(`M${x} ${y}c2-24 4-36 0-52`, '#6D4C41', 5) + P(`M${x} ${y - 52}c-18-4-26 4-30 12 12-6 20-6 30-4zM${x} ${y - 52}c18-4 26 4 30 12-12-6-20-6-30-4zM${x} ${y - 52}c-4-14 0-22 8-26-2 10-4 18-8 26z`, '#43A047', 2.5)).join('')
      + [[120, 172], [150, 166]].map(([x, y]) => P(`M${x - 12} ${y}h24l-5 8h-14z`, '#FFFFFF', 2.5) + C(x, y - 6, 4, '#FFB300', 2)).join(''))),
  D('kawazu', 'ซากุระคาวาซุบานเร็วริมแม่น้ำ', 'The early Kawazu cherry blossom along the river', ['kawazu', 'คาวาซุ', 'kawazu cherry blossom', 'ซากุระคาวาซุ', 'kawazu zakura', 'early cherry blossom', 'ซากุระบานเร็ว', 'rapeseed flowers', 'ดอกผักกาดเหลือง', 'river bank', 'ริมแม่น้ำ', 'stalls', 'ร้านรวง'],
    // a pale blue sky over a river running down the middle, both banks lined with deep pink cherry trees in full bloom, yellow rapeseed flowers on the grass, red festival lanterns hanging, a small stone bridge
    scene('iz-d2', '#E3F2FD', P('M-4 96h248v160H-4z', '#AED581', 0) + P('M100 100c-6 40 20 60 -10 156h70c20-90 -10-110 -20-156z', '#4FC3F7') + Lc('M110 140c4 8 12 12 8 24M130 180c4 10 14 14 10 30', '#E1F5FE', 3)
      + [[20, 110], [56, 124], [30, 160], [196, 112], [214, 150], [176, 132]].map(([x, y]) => R(x - 3, y, 6, 36, '#6D4C41', 0, 2.5) + bloom(x, y - 4, 22, '#F06292')).join('')
      + [[14, 214], [40, 226], [196, 220], [220, 206]].map(([x, y]) => Lc(`M${x} ${y}v-14`, '#43A047', 3) + C(x, y - 18, 6, '#FDD835', 2.5)).join('')
      + P('M78 168q42-24 84 0v10H78z', '#BDBDBD') + Lc('M78 178q42-24 84 0', INK, 3) + R(112, 130, 16, 20, '#E53935') + Lc('M120 112v18', INK, 2.5) + face(120, 142, 0.26)
      + C(120, 54, 20, '#FFE082') + face(120, 52, 0.4))),
  D('jogasaki', 'ชายฝั่งหินลาวาโจงาซากิกับประภาคาร', 'The Jogasaki lava coast and its lighthouse', ['jogasaki', 'โจงาซากิ', 'jogasaki coast', 'ชายฝั่งโจงาซากิ', 'lava cliff', 'หน้าผาลาวา', 'izu lighthouse', 'ประภาคาร', 'mount omuro lava', 'ภูเขาไฟโอมุโระ', 'ito', 'อิโตะ', 'sea cliff', 'หน้าผาริมทะเล'],
    // dark brown lava cliffs full of cracks jutting into a deep blue sea, a white lighthouse with a red top on the point, a green pine tree on the cliff, white waves around the rocks, a gull
    scene('iz-d3', '#E1F5FE', R(-4, 120, 248, 140, '#0288D1', 0) + Lc('M10 150h40M170 140h50M90 170h50M196 190h30', '#B3E5FC', 3)
      + P('M-4 98c30-14 70-8 96 6 12 14 8 40 20 56 10 16-4 30 4 40H-4z', '#6D4C41') + Lc('M30 112l10 22 8-8M70 120l-6 24M54 150l14 20M20 170l12-10', '#4E342E', 2.5)
      + P('M130 150c20-8 60-18 114-4v30H130z', '#8D6E63') + R(184, 78, 20, 62, '#FFFFFF') + P('M180 78h28l-4-14h-20z', '#E53935') + C(194, 58, 7, '#FFD54F') + Lc('M194 44v-6', INK, 2.5) + face(194, 112, 0.28)
      + P('M26 108l20-30 20 30z', '#2E7D32') + R(44, 106, 5, 12, '#6D4C41', 0, 0) + [[100, 168], [150, 184], [60, 190]].map(([x, y]) => E(x, y, 22, 6, '#FFFFFF', 2.5)).join('')
      + Lc('M130 50q8-8 16 0q8-8 16 0', INK, 3))),
  D('shimoda', 'อ่าวชิโมดะกับเรือดำของเพอร์รี', 'Shimoda bay with the Black Ships', ['shimoda', 'ชิโมดะ', 'black ships', 'เรือดำ', 'perry', 'เพอร์รี', 'kurofune', 'shimoda harbour', 'ท่าเรือชิโมดะ', 'shimoda ropeway', 'beach', 'ชายหาด', 'lighthouse', 'ประภาคาร'],
    // a calm blue bay with two big black sailing ships with white stripes along their sides and puffs of smoke from their funnels, a small white lighthouse on a green headland, a yellow beach in front with a sandcastle
    scene('iz-d4', '#E1F5FE', R(-4, 112, 248, 150, '#29B6F6', 0) + Lc('M16 140h36M170 128h44M70 200h50', '#B3E5FC', 3) + P('M-4 108c20-14 50-14 70 4v10H-4z', '#66BB6A', 0) + R(18, 80, 12, 30, '#FFFFFF') + P('M16 80h16l-3-9H19z', '#E53935') + Lc('M24 71v-6', INK, 2.5)
      + g(150, 150, 1, P('M-62 -2h124l-14 30H-48z', '#37474F', 3) + R(-54, 6, 108, 5, '#FFFFFF', 0, 0) + Lc('M-6 -2v-70M-34 -2v-52M26 -2v-52', '#5D4037', 4) + P('M-6 -70h32v32H-6zM-34-52h24v26h-24z', '#FFF8E1', 2.5) + R(34, -22, 12, 20, '#212121', 0, 2.5) + C(40, -34, 8, '#CFD8DC', 0) + C(48, -44, 10, '#ECEFF1', 0) + face(0, 14, 0.28))
      + g(60, 132, 0.55, P('M-62 -2h124l-14 30H-48z', '#37474F', 3) + R(-54, 6, 108, 5, '#FFFFFF', 0, 0) + Lc('M-6 -2v-70M26 -2v-52', '#5D4037', 4) + P('M-6 -70h32v32H-6z', '#FFF8E1', 2.5))
      + P('M-4 196c60-20 170-20 248 0v60H-4z', '#FFE082') + P('M92 214l10-22 10 22zM112 214l10-22 10 22z', '#FFCC80', 2.5) + R(92, 212, 40, 12, '#FFCC80', 2, 2.5) + Lc('M112 192v-10', INK, 2.5) + P('M112 182l12 4-12 4z', '#E53935', 2) + face(112, 218, 0.2))),

  // a round brown capybara head with a smiling face poking out of a wooden hot-bath tub, steam curling up and two yellow yuzu fruits balanced on its head
  L('capybara', 'คาปิบาร่าแช่น้ำร้อนที่สวนสัตว์ชาโบเท็น', 'A capybara in a hot bath at Izu Shaboten Zoo', ['capybara', 'คาปิบาร่า', 'izu shaboten zoo', 'สวนสัตว์ชาโบเท็น', 'capybara hot bath', 'แช่น้ำร้อน', 'yuzu', 'ส้มยูซุ', 'ito', 'อิโตะ', 'animal zoo', 'สวนสัตว์'], 'หาส้มยูซุบนหัวคาปิบาร่า', 'Find the yuzu on the capybara’s head',
    E(120, 118, 46, 36, '#A1887F', 3) + C(80, 90, 10, '#8D6E63', 3) + C(160, 90, 10, '#8D6E63', 3) + E(120, 134, 18, 11, '#795548', 2.5) + C(112, 134, 2, INK, 0) + C(128, 134, 2, INK, 0)
      + C(108, 78, 11, '#FDD835', 3) + C(130, 76, 10, '#FBC02D', 3) + Lc('M104 74l8 2', '#F9A825', 2) + face(120, 112, 0.34, 'smile')
      + R(40, 140, 160, 64, '#C68E4E', 10, 3) + R(40, 150, 160, 10, '#4FC3F7', 0, 2.5) + Lc('M40 176h160M40 192h160', '#A9712F', 2.5)
      + Lc('M92 56c-6-10 6-14 0-26M122 50c-6-10 6-14 0-26M152 56c-6-10 6-14 0-26', '#B0BEC5', 4)),
  // a rope suspension bridge hung between two dark lava cliffs high over the sea with white waves below, a smiling stone on the left cliff
  L('jogasakibridge', 'สะพานแขวนคาโดวากิที่ชายฝั่งโจงาซากิ', 'The Kadowaki suspension bridge at Jogasaki', ['kadowaki suspension bridge', 'สะพานแขวนคาโดวากิ', 'jogasaki', 'โจงาซากิ', 'suspension bridge', 'สะพานแขวน', 'lava cliff', 'หน้าผาลาวา', 'ito', 'อิโตะ', 'sea', 'ทะเล'], 'หาก้อนหินยิ้มที่หน้าผา', 'Find the smiling rock on the cliff',
    P('M16 70c20-8 40-4 52 8v90H16z', '#6D4C41') + P('M224 70c-20-8-40-4-52 8v90h52z', '#6D4C41') + R(16, 168, 208, 52, '#0288D1', 0, 3) + Lc('M30 190h30M100 200h40M170 188h30', '#B3E5FC', 3) + E(120, 218, 70, 8, '#FFFFFF', 2.5)
      + R(62, 70, 10, 24, '#78909C', 0, 2.5) + R(168, 70, 10, 24, '#78909C', 0, 2.5) + Lc('M67 74q53 40 106 0', INK, 4) + Lc('M70 100h100', '#8D6E63', 6) + Lc('M80 100v-16M96 100v-26M112 100v-32M128 100v-32M144 100v-26M160 100v-16', '#8D6E63', 2.5)
      + C(40, 112, 16, '#8D6E63', 3) + face(40, 112, 0.3) + Lc('M26 78l-4-8M200 78l4-8', '#4E342E', 3)),
  // a black wooden Black Ship with white stripes, three masts and square sails, a flag and smoke from the funnel, with a smile on its hull, on blue waves
  L('blackship', 'เรือดำเพอร์รีที่ชิโมดะ', 'A Black Ship of Shimoda', ['black ship', 'เรือดำ', 'kurofune', 'perry', 'เพอร์รี', 'shimoda', 'ชิโมดะ', 'sailing ship', 'เรือใบ', 'steamship', 'เรือกลไฟ', 'history', 'ประวัติศาสตร์'], 'หาควันที่ลอยออกจากปล่องเรือ', 'Find the smoke from the funnel',
    Lc('M120 150v-110M80 150v-76M160 150v-76', '#5D4037', 5) + P('M96 46h48v36H96z', '#FFF8E1', 3) + P('M56 78h48v32H56z', '#FFF8E1', 3) + P('M136 78h48v32h-48z', '#FFF8E1', 3) + P('M144 40h26l-6 8 6 8h-26z', '#E53935', 2.5)
      + P('M30 150h180l-24 40H54z', '#37474F', 3) + R(44, 160, 152, 8, '#FFFFFF', 0, 2.5) + C(84, 180, 3, '#FFD54F', 0) + C(156, 180, 3, '#FFD54F', 0) + face(120, 178, 0.3)
      + R(188, 118, 14, 32, '#212121', 0, 2.5) + C(196, 106, 9, '#CFD8DC', 0) + C(208, 92, 12, '#ECEFF1', 0) + C(224, 74, 10, '#ECEFF1', 0)
      + P('M16 200c20-10 40-10 60 0s40 10 60 0 40-10 60 0 40 10 28 4v14H16z', '#29B6F6', 3)),
  // a round wooden washtub afloat on the water with two short wooden paddles stuck across it, splashes flying and a smiling face on the tub
  L('tarai', 'เรือถังไม้แข่งทาไรบุเนะที่อิโตะ', 'The tub boats of Ito', ['tarai', 'ทาไร', 'tub boat', 'เรือถังไม้', 'tub boat race', 'แข่งเรือถัง', 'ito', 'อิโตะ', 'wooden tub', 'ถังไม้', 'paddle', 'พาย', 'summer festival', 'เทศกาลหน้าร้อน'], 'หาไม้พายสองอันที่พาดบนถัง', 'Find the two paddles on the tub',
    P('M20 156c20-10 40-10 60 0s40 10 60 0 40-10 60 0 40 10 20 4v40H20z', '#29B6F6', 3) + E(120, 146, 64, 16, '#8D4A1E', 3) + P('M58 140h124l-10 54H68z', '#C68E4E', 3) + E(120, 140, 62, 14, '#E0B070', 3)
      + Lc('M80 160h80M76 178h88', '#8D4A1E', 3) + Lc('M82 136l-22-46M158 136l22-46', '#A9712F', 6) + E(56, 84, 8, 14, '#C68E4E', 3) + E(184, 84, 8, 14, '#C68E4E', 3) + face(120, 166, 0.34)
      + C(40, 112, 5, '#E1F5FE', 2.5) + C(204, 108, 6, '#E1F5FE', 2.5) + C(214, 130, 4, '#E1F5FE', 2.5) + C(30, 130, 4, '#E1F5FE', 2.5)),
  // a fresh green wasabi root with its leaves lying on a rough sharkskin grater, a mound of fine green paste at its foot, a smile on the root
  L('wasabi', 'วาซาบิสดจากนากาอิซุบนที่ขูด', 'Fresh wasabi from Nakaizu on its grater', ['wasabi', 'วาซาบิ', 'nakaizu', 'นากาอิซุ', 'sharkskin grater', 'ที่ขูดหนังฉลาม', 'izu wasabi', 'wasabi ice cream', 'ไอศกรีมวาซาบิ', 'green paste', 'ซอสสีเขียว', 'sushi', 'ซูชิ'], 'หาวาซาบิก้อนใหญ่สีเขียว', 'Find the big green wasabi root',
    P('M70 80h100l24 128H46z', '#D7CCC8', 3) + Lc('M90 104l10 12M120 100l8 14M150 104l-10 12M80 140l10 12M130 140l10 12M100 176l8 12M150 172l8 12', '#A1887F', 2.5)
      + P('M112 100c-36-4-52-30-40-46 14 6 30 16 40 46zM128 100c36-4 52-30 40-46-14 6-30 16-40 46zM120 98c-10-20-8-44 0-56 8 12 10 36 0 56z', '#66BB6A', 3)
      + P('M92 160c-2-30 8-58 28-58s30 28 28 58c-2 22-54 22-56 0z', '#8BC34A', 3) + Lc('M100 124h8M132 124h8M104 150h8M128 156h8', '#689F38', 2.5) + face(120, 142, 0.34)
      + E(172, 208, 34, 12, '#AED581', 3) + C(160, 198, 3, '#7CB342', 0) + C(176, 200, 3, '#7CB342', 0)),
  // a whole red kinmedai (golden eye snapper) with huge round golden eyes and spiky fins on a blue plate, ginger slices and a spring of green leaf, a smile
  L('kinmedai', 'ปลาคินเมได้ต้มซีอิ๊วเมืองชิโมดะ', 'Simmered kinmedai, the red snapper of Izu', ['kinmedai', 'คินเมได', 'golden eye snapper', 'ปลาตาทอง', 'red snapper', 'ปลากะพงแดง', 'simmered fish', 'ปลาต้มซีอิ๊ว', 'shimoda', 'ชิโมดะ', 'izu seafood', 'อาหารทะเลอิซุ', 'sushi', 'ซูชิ'], 'หาตากลมโตสีทองของปลา', 'Find the fish’s big golden eye',
    E(120, 140, 96, 62, '#E8EAF6', 3) + E(120, 140, 80, 48, '#C5CAE9', 0) + P('M52 140c16-34 56-46 92-34 12 4 24 14 32 24-8 10-20 20-32 24-36 12-76 0-92-14z', '#E53935', 3)
      + P('M170 130l26-22v64l-26-22z', '#C62828', 3) + P('M92 108l10-20 12 18zM118 104l10-18 8 20z', '#EF5350', 3) + C(80, 132, 15, '#FFD54F', 3) + C(80, 132, 6, INK, 0) + Lc('M60 150q10 10 24 8', INK, 3) + face(122, 150, 0.3, 'none')
      + P('M96 152c8 6 24 8 36 0', '#FFCDD2', 0) + R(150, 176, 22, 8, '#FFE082', 4, 2.5) + R(168, 164, 22, 8, '#FFE082', 4, 2.5) + P('M36 118c2-10 14-12 18-4-6 0-12 2-18 4z', '#66BB6A', 2.5)),
  // a white Odoriko express train with a blue stripe and a smiling round nose running by the seaside with a small bright sun
  L('odoriko', 'รถไฟด่วนโอโดริโกะสู่คาบสมุทรอิซุ', 'The Odoriko train to the Izu peninsula', ['odoriko', 'โอโดริโกะ', 'odoriko train', 'รถไฟโอโดริโกะ', 'limited express', 'รถไฟด่วนพิเศษ', 'izu railway', 'รถไฟอิซุ', 'train', 'รถไฟ', 'atami station', 'สถานีอาตามิ', 'shuzenji', 'ชูเซนจิ'], 'หาริ้วสีฟ้าตามข้างขบวนรถไฟ', 'Find the blue stripe along the train',
    C(190, 54, 20, '#FFB74D', 3) + R(10, 168, 220, 40, '#29B6F6', 0, 0) + Lc('M16 182h30M120 194h50', '#E1F5FE', 3) + Lc('M10 150h220', '#78909C', 5) + Lc('M10 160h220', '#78909C', 4)
      + P('M24 90h150c28 0 40 26 44 52v14H24z', '#FFFFFF', 3) + R(24, 130, 194, 10, '#1976D2', 0, 0) + [40, 72, 104, 136].map((x) => R(x, 100, 24, 24, '#81D4FA', 4, 2.5)).join('') + P('M172 100h18c10 4 18 16 22 28h-40z', '#81D4FA', 2.5)
      + C(60, 158, 12, '#455A64', 3) + C(130, 158, 12, '#455A64', 3) + C(196, 158, 12, '#455A64', 3) + face(196, 138, 0.26)),
  // two bare feet soaking in a hot-spring foot bath, a stone basin with steam rising and a wooden bench, a smiling face on the basin
  L('footbath', 'บ่อแช่เท้าออนเซ็นริมทางที่อาตามิ', 'A hot-spring foot bath in Atami', ['foot bath', 'บ่อแช่เท้า', 'ashiyu', 'อาชิยุ', 'onsen', 'ออนเซ็น', 'atami hot spring', 'ออนเซ็นอาตามิ', 'hot spring', 'น้ำพุร้อน', 'steam', 'ไอน้ำ', 'bench', 'ม้านั่ง'], 'หาเท้าสองข้างที่แช่น้ำอุ่น', 'Find the two feet in the warm water',
    R(30, 150, 180, 16, '#8D6E63', 4, 3) + R(40, 166, 10, 34, '#6D4C41', 0, 2.5) + R(190, 166, 10, 34, '#6D4C41', 0, 2.5)
      + P('M36 130h168l-16 72H52z', '#B0BEC5', 3) + E(120, 130, 84, 18, '#4DD0E1', 3) + E(120, 130, 66, 11, '#80DEEA', 0) + face(120, 178, 0.34)
      + [96, 138].map((x) => P(`M${x - 11} 70h22v40a11 8 0 0 1-22 0z`, '#FFCCBC', 3) + [-7, -2, 3, 8].map((d) => C(x + d, 70, 3.5, '#FFCCBC', 2)).join('')).join('')
      + Lc('M72 108c-8-12 8-16 0-30M170 110c-8-12 8-16 0-30', '#B0BEC5', 4)),
  // three flat dried horse mackerels pegged out on a wooden-framed drying net in the sun, one with a smiling face, a seagull perched on the frame
  L('himono', 'ปลาตากแห้งฮิโมโนะของอาตามิ', 'Drying fish, the himono of Atami', ['himono', 'ฮิโมโนะ', 'dried fish', 'ปลาตากแห้ง', 'atami himono', 'horse mackerel', 'ปลาทู', 'drying net', 'ตาข่ายตากปลา', 'atami market', 'ตลาดอาตามิ', 'fishing port', 'ท่าเรือประมง'], 'หาปลาตัวที่ยิ้มบนตาข่าย', 'Find the smiling fish on the net',
    C(200, 48, 20, '#FFB74D', 3) + R(24, 90, 192, 100, '#8D6E63', 4, 3) + R(34, 100, 172, 80, '#FFF8E1', 0, 2.5) + Lc('M34 120h172M34 140h172M34 160h172M60 100v80M90 100v80M120 100v80M150 100v80M180 100v80', '#D7CCC8', 1.5)
      + R(34, 190, 8, 30, '#6D4C41', 0, 2.5) + R(198, 190, 8, 30, '#6D4C41', 0, 2.5)
      + [[70, 128, 0], [122, 134, 6], [172, 126, -6]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 24, 11, '#CFB794', 3) + P('M22 0l14-10v20z', '#B8996C', 3) + C(-14, -2, 3, INK, 0) + Lc('M-4-8q8 8 0 16', '#A67C52', 2), r)).join('')
      + face(122, 136, 0.2) + E(60, 74, 16, 10, '#FFFFFF', 3) + C(48, 70, 5, '#FFFFFF', 2.5) + P('M44 70l-8 4 8 2z', '#FFB300', 2) + C(46, 69, 1.4, INK, 0)),
  // three round brown onsen manju buns steaming in a bamboo basket, one split open to show the sweet red-bean filling, smiling
  L('manju', 'ขนมโอมันจูนึ่งไอน้ำร้อนจากออนเซ็น', 'Onsen manju steamed in the hot-spring steam', ['onsen manju', 'ออนเซ็นมันจู', 'manju', 'มันจู', 'steamed bun', 'ซาลาเปา', 'red bean', 'ถั่วแดง', 'atami', 'อาตามิ', 'sweets', 'ขนมหวาน', 'bamboo steamer', 'xiao long steamer'], 'หามันจูที่แยกออกเห็นไส้ถั่วแดง', 'Find the manju split open with red bean inside',
    P('M30 130h180l-14 70H44z', '#E0B070', 3) + Lc('M40 150h160M44 172h152', '#B8864A', 2.5) + E(120, 130, 90, 16, '#F0CE92', 3)
      + C(76, 112, 28, '#8D4A1E', 3) + face(76, 114, 0.3) + C(162, 114, 26, '#8D4A1E', 3) + Lc('M162 90v48', INK, 2.5) + P('M148 100h28v28h-28z', '#7B1F3A', 0) + C(120, 84, 24, '#A0522D', 3) + Lc('M110 76q10-6 20 0', '#C98B5E', 3)
      + Lc('M62 70c-6-10 6-14 0-26M122 50c-6-10 6-14 0-26M180 74c-6-10 6-14 0-26', '#B0BEC5', 4)),
  // a perfectly round grass-covered cone of a mountain with a chairlift line up its side and a little chair, a smile on the mountain, a bright sky
  L('omuro', 'ภูเขาโอมุโระรูปกรวยหญ้ากับลิฟต์เก้าอี้', 'Mount Omuro, the grass cone, and its chairlift', ['mount omuro', 'ภูเขาโอมุโระ', 'omuroyama', 'omuro chairlift', 'ลิฟต์เก้าอี้', 'grass cone', 'ภูเขากรวยหญ้า', 'volcano', 'ภูเขาไฟ', 'ito', 'อิโตะ', 'izu highlands', 'ที่ราบสูงอิซุ'], 'หาเก้าอี้ลิฟต์ที่ลอยขึ้นเนิน', 'Find the chair riding up the hill',
    P('M10 210C40 130 90 50 120 50s80 80 110 160z', '#9CCC65', 3) + P('M96 80c18-8 30-8 48 0', '#7CB342', 0) + Lc('M76 130c30 12 70 12 90 0M54 170c40 16 100 16 134 0', '#7CB342', 3) + P('M108 52c8-6 16-6 24 0l-4 8h-16z', '#689F38', 3)
      + Lc('M64 196L120 52', INK, 2.5) + R(94, 120, 18, 12, '#E53935', 3, 2.5) + Lc('M103 120v-10', INK, 2.5) + face(150, 150, 0.4) + C(196, 52, 18, '#FFB74D', 3) + R(10, 208, 220, 14, '#689F38', 0, 3)),
  // a dark gnarled plum branch covered in white and pink blossom with a smiling round green bush warbler perched on it, blossoms drifting down
  L('plum', 'ดอกบ๊วยที่สวนบ๊วยอาตามิและนกอุกุยสุ', 'Plum blossom and a bush warbler at the Atami plum garden', ['atami plum garden', 'สวนบ๊วยอาตามิ', 'plum blossom', 'ดอกบ๊วย', 'ume', 'อุเมะ', 'bush warbler', 'นกอุกุยสุ', 'uguisu', 'plum festival', 'เทศกาลบ๊วย', 'winter flowers', 'ดอกไม้หน้าหนาว'], 'หานกสีเขียวตัวกลมบนกิ่งบ๊วย', 'Find the round green bird on the plum branch',
    Lc('M20 200c20-10 40-30 70-40s60-10 90-40 40-30 46-60', '#5D4037', 9) + Lc('M90 160c8-20 4-34 12-50M150 124c10 10 14 22 12 38', '#5D4037', 6)
      + [[56, 184], [90, 150], [124, 164], [160, 130], [186, 98], [110, 118], [200, 62], [76, 124]].map(([x, y], k) => C(x, y, 11, k % 2 ? '#F8BBD0' : '#FFFFFF', 3) + C(x, y, 3, '#FDD835', 0)).join('')
      + E(128, 104, 22, 18, '#9CCC65', 3) + C(144, 92, 12, '#9CCC65', 3) + P('M154 92l10 3-10 3z', '#FFB300', 2) + P('M108 108l-22 8 20 4z', '#7CB342', 2.5) + face(140, 100, 0.2, 'none') + C(146, 90, 2, INK, 0)
      + C(50, 70, 7, '#F8BBD0', 2.5) + C(30, 110, 6, '#FFFFFF', 2.5) + C(208, 150, 7, '#F8BBD0', 2.5)),
  // a grove of tall green bamboo stalks with their joints along a stone path, a small stone lantern with a smile in the middle
  L('bamboo', 'ทางเดินป่าไผ่ที่ชูเซนจิ', 'The bamboo path of Shuzenji', ['shuzenji', 'ชูเซนจิ', 'bamboo path', 'ทางเดินป่าไผ่', 'bamboo grove', 'ป่าไผ่', 'chikurin no komichi', 'stone lantern', 'โคมหิน', 'izu hot springs', 'ออนเซ็นอิซุ', 'izu', 'อิซุ'], 'หาโคมหินที่กลางทางเดิน', 'Find the stone lantern on the path',
    [28, 56, 84, 156, 184, 212].map((x, k) => R(x - 9, 14, 18, 190, k % 2 ? '#7CB342' : '#8BC34A', 6, 3) + [48, 90, 132, 174].map((y) => Lc(`M${x - 9} ${y + (k % 3) * 6}h18`, '#558B2F', 3)).join('')
      + P(`M${x + 9} ${60 + k * 6}l22-10-8 14z`, '#9CCC65', 2.5)).join('')
      + P('M70 220c10-30 20-60 50-70 30 10 40 40 50 70z', '#D7CCC8', 3) + Lc('M100 210l30-4M110 188l22 2', '#BCAAA4', 2.5)
      + R(104, 150, 32, 40, '#BDBDBD', 3, 3) + P('M92 150h56l-8-14h-40z', '#9E9E9E', 3) + R(112, 164, 16, 14, '#FFE082', 2, 2.5) + C(120, 130, 6, '#9E9E9E', 3) + face(120, 184, 0.22, 'none')),
  // a big rock with a round hole through it standing in a blue sea, white waves round its foot, a small tour boat passing through the arch, a smile on the rock
  L('dogashima', 'ถ้ำเรือหินโค้งที่โดงาชิมะ', 'The rock arch of Dogashima', ['dogashima', 'โดงาชิมะ', 'tensodo cave', 'ถ้ำเทนโซโด', 'rock arch', 'ซุ้มหิน', 'sea cave', 'ถ้ำทะเล', 'cruise boat', 'เรือท่องเที่ยว', 'nishi izu', 'นิชิอิซุ', 'sunset coast', 'ชายฝั่งพระอาทิตย์ตก'], 'หาเรือลำเล็กที่ลอดซุ้มหิน', 'Find the little boat going through the arch',
    R(12, 150, 216, 70, '#29B6F6', 0, 3) + P('M40 156C36 80 70 40 112 36s70 30 66 120c-20 4-30 4-44 0 0-30-4-52-22-52s-22 22-22 52c-14 4-26 4-50 0z', '#8D6E63', 3) + Lc('M60 100l14 12M150 80l-10 16M92 60l8 10', '#6D4C41', 2.5)
      + P('M70 52c10-12 30-14 44-10', '#689F38', 4) + face(78, 118, 0.3) + P('M98 176h40l-8 14H106z', '#FFFFFF', 3) + R(114, 160, 8, 16, '#E53935', 0, 2.5) + Lc('M118 160v-8', INK, 2.5)
      + E(60, 206, 34, 8, '#FFFFFF', 2.5) + E(176, 200, 36, 8, '#FFFFFF', 2.5) + Lc('M30 176h30M180 184h30', '#B3E5FC', 3) + C(196, 56, 16, '#FFB74D', 3)),
  // the Kawazu-Nanadaru loop bridge: a grey road that coils round a green valley on tall pillars, a little red car on it, a waterfall behind, a smile on the biggest pillar
  L('loopbridge', 'สะพานเกลียววงกลมคาวาซุนานาดารุ', 'The Kawazu-Nanadaru loop bridge', ['kawazu nanadaru loop bridge', 'สะพานเกลียวคาวาซุ', 'loop bridge', 'สะพานเกลียว', 'kawazu', 'คาวาซุ', 'kawazu seven waterfalls', 'น้ำตกเจ็ดสาย', 'spiral road', 'ถนนเกลียว', 'izu mountain road', 'ถนนภูเขาอิซุ'], 'หารถสีแดงคันเล็กบนสะพานเกลียว', 'Find the little red car on the loop bridge',
    P('M20 210C40 120 80 70 120 70s80 50 100 140z', '#81C784', 3) + R(150, 40, 18, 70, '#E1F5FE', 4, 2.5) + Lc('M156 44v62M162 44v62', '#4FC3F7', 3)
      + E(120, 176, 86, 18, '#9E9E9E', 3) + E(120, 144, 66, 14, '#9E9E9E', 3) + E(120, 114, 44, 10, '#9E9E9E', 3) + Lc('M34 176c10 20 60 24 90 12M54 144c10 14 40 18 70 10', '#616161', 3)
      + R(104, 118, 20, 62, '#BDBDBD', 3, 3) + R(52, 150, 12, 36, '#BDBDBD', 3, 2.5) + R(176, 150, 12, 36, '#BDBDBD', 3, 2.5) + face(114, 160, 0.22)
      + g(88, 172, 1, R(-9, -6, 18, 8, '#E53935', 3, 2) + R(-5, -11, 10, 6, '#FFFFFF', 2, 2) + C(-5, 3, 3, INK, 0) + C(5, 3, 3, INK, 0))),
];

export default {
  places: {
    'jp-izu': { country: 'jp', wave: 3, name: nm('อิซุและอาตามิ', 'Izu and Atami'), tz: 'Asia/Tokyo', ll: [34.97, 139.07],
      alias: ['izu', 'อิซุ', '伊豆', 'izu peninsula', 'คาบสมุทรอิซุ', 'atami', 'อาตามิ', '熱海', 'atami castle', 'ปราสาทอาตามิ', 'ito', 'อิโตะ', '伊東', 'kawazu', 'คาวาซุ', '河津',
        'shimoda', 'ชิโมดะ', '下田', 'jogasaki', 'โจงาซากิ', '城ヶ崎', 'dogashima', 'โดงาชิมะ', '堂ヶ島', 'shuzenji', '修善寺', 'izu shaboten zoo', 'สวนสัตว์ชาโบเท็น',
        'nakaizu', 'นากาอิซุ', 'mount omuro', 'omuroyama', 'izukogen', 'อิซุโคเก็น', 'atami sun beach', 'izu granpal park'],
      colors: IZ },
  },
  items,
};
