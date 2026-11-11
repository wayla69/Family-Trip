// Wave 11, Thailand (Isan) 2: Ubon Ratchathani, Khong Chiam and Pha Taem — Pha Taem as a landscape only (no rock
// paintings), Wat Phra That Nong Bua as a building only, no candles (Ubon's candle festival is already in the library)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const UB = { k1: '#E65100', k2: '#1565C0', k3: '#FFF3E0' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `th-ubon.landmark.${slug}`, cat: 'landmark', file: `th/ubon/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);

const items = [
  { id: 'th-ubon.stamp', cat: 'stamp', file: 'th/ubon/stamp.v1.svg', name: nm('ตราประทับอุบลราชธานี', 'Ubon Ratchathani stamp'), kw: ['ubon ratchathani', 'อุบลราชธานี', 'pha taem', 'ผาแต้ม', 'khong chiam', 'โขงเจียม', 'first sunrise', 'ตะวันแรก'],
    // the first sun of Thailand rising behind a layered sandstone cliff above the Mekong
    svg: cityStamp('tub-st', { name: 'UBON', sub: 'THAILAND', ...UB, emblem: C(116, 104, 24, '#FFB300') + Lc('M116 70v-10M90 80l-7-7M142 80l7-7', '#FFB300', 4) + P('M50 108h60l12 14v12H50z', '#C1694F') + Lc('M50 118h66M50 126h70', '#8D5524', 2.5) + P('M50 134h100v4H50z', '#4FC3F7', 0) + Lc('M60 140h30M110 140h30', '#4FC3F7', 4) }) },
  { id: 'th-ubon.day.phataem', cat: 'day', file: 'th/ubon/day-phataem.v1.svg', name: nm('ตะวันแรกที่ผาแต้ม', 'The first sunrise at Pha Taem'), kw: ['pha taem', 'ผาแต้ม', 'first sunrise in thailand', 'ตะวันขึ้นก่อนใครในสยาม', 'sunrise', 'พระอาทิตย์ขึ้น', 'mekong', 'แม่น้ำโขง', 'cliff', 'หน้าผา', 'ubon ratchathani', 'อุบลราชธานี', 'national park'],
    // a big orange sun coming up over the blue hills of Laos and the wide Mekong, the striped sandstone cliff edge in front with a few dry-forest trees
    svg: scene('tub-d1', '#FFCCBC', C(150, 104, 30, '#FFB74D', 0) + P('M-4 112c40-20 70-10 100-2 40-16 90-20 148-4v20H-4z', '#7986CB') + P('M-4 124h248v40H-4z', '#4DB6AC') + Lc('M120 132h40M140 144h30', '#FFE082', 4)
      + P('M-4 150c40-8 90-4 130 6l20 94H-4z', '#C1694F') + Lc('M-4 168c40-6 90-4 132 4M-4 190c40-6 90-4 136 4M-4 214c40-6 90-4 140 4', '#8D5524', 3)
      + [[30, 140], [80, 146]].map(([x, y]) => Lc(`M${x} ${y + 14}v-20`, '#6D4C41', 4) + C(x, y - 10, 14, '#7CB342')).join('')) },
  { id: 'th-ubon.day.munriver', cat: 'day', file: 'th/ubon/day-munriver.v1.svg', name: nm('เมืองอุบลริมแม่น้ำมูลยามค่ำ', 'Ubon by the Mun River at dusk'), kw: ['mun river', 'แม่น้ำมูล', 'ubon city', 'ตัวเมืองอุบล', 'ubon ratchathani', 'อุบลราชธานี', 'bridge', 'สะพานข้ามแม่น้ำมูล', 'riverside', 'ริมแม่น้ำ', 'evening', 'warin chamrap', 'วารินชำราบ'],
    // a long low bridge on round piers crossing the wide Mun river at dusk, its lamps glowing, the town's lights on the far bank, a purple sky with the first star
    svg: scene('tub-d2', '#B39DDB', C(60, 50, 4, '#FFF59D', 0) + C(180, 40, 3, '#FFF59D', 0) + [[30, 96, 30], [70, 84, 44], [110, 92, 36], [150, 80, 50], [194, 90, 40]].map(([x, y, h], k) => R(x - 16, y, 32, h + 30, ['#5C6BC0', '#7986CB', '#3F51B5'][k % 3], 2) + [0, 1].map((j) => R(x - 8 + j * 10, y + 10, 6, 7, '#FFE082', 1, 0)).join('')).join('')
      + P('M-4 128h248v130H-4z', '#5C6BC0') + Lc('M-4 124h248', INK, 5) + R(-4, 118, 252, 10, '#ECEFF1', 0) + [20, 80, 140, 200].map((x) => R(x - 6, 128, 12, 30, '#CFD8DC', 0)).join('') + [30, 90, 150, 210].map((x) => Lc(`M${x} 118v-14`, INK, 3) + C(x, 102, 4, '#FFE082', 2)).join('')
      + Lc('M30 176h50M140 186h60M70 206h80', '#FFE082', 4) + Lc('M40 192h30M150 170h30', '#9FA8DA', 3)) },

  L('samphanbok', 'สามพันโบก', 'Sam Phan Bok, the riverbed of three thousand holes', ['sam phan bok', 'สามพันโบก', 'grand canyon of thailand', 'แกรนด์แคนยอนเมืองไทย', 'sandstone riverbed', 'แก่งหิน', 'rock pools', 'แอ่งหิน', 'dry season', 'หน้าแล้ง', 'mekong'], 'หาก้อนหินทรายที่มีรูกลมๆ เต็มไปหมด', 'Find the sandstone rocks covered in round holes',
    // smooth pink-and-brown sandstone shelves of the dry-season riverbed, pitted all over with round holes of every size, some holding blue water, the Mekong beyond
    bg('#E3F2FD') + P('M16 70h208v30H16z', '#4FC3F7', 0) + Lc('M40 84h40M140 82h50', '#E1F5FE', 3)
      + P('M16 100c40-14 80-10 110 0s70 8 98-4v100a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#E0A47E', 0) + P('M16 150c50-10 120-12 208 2', '#C9805A', 3) + Lc('M16 186c60-8 140-8 208 4', '#C9805A', 3)
      + [[50, 124, 12, 1], [92, 120, 8, 0], [136, 128, 15, 1], [184, 120, 9, 0], [40, 168, 9, 0], [78, 168, 16, 1], [130, 172, 10, 0], [176, 166, 14, 1], [60, 204, 10, 1], [110, 206, 8, 0], [160, 204, 11, 0], [204, 196, 7, 1]].map(([x, y, r, w]) => E(x, y, r, r * 0.6, w ? '#4FC3F7' : '#8D5524', 3)).join('') + frame + face(136, 136, 0.32)),
  L('twocolour', 'แม่น้ำสองสีที่โขงเจียม', 'The two-coloured river at Khong Chiam', ['two-coloured river', 'แม่น้ำสองสี', 'khong chiam', 'โขงเจียม', 'mekong', 'แม่น้ำโขง', 'mun river', 'แม่น้ำมูล', 'where rivers meet', 'จุดบรรจบ'], 'หาแม่น้ำที่ฝั่งหนึ่งสีน้ำตาลอีกฝั่งสีฟ้า', 'Find the river that is brown on one side and blue on the other',
    // seen from above: a brown river from the left and a blue-green river from the right flow into one wide river, the two colours side by side with a clear line, a green point of land between them
    bg('#AED581') + P('M16 40c40 10 70 40 88 90h-50c-10-30-24-50-38-58z', '#B07A4F', 0) + P('M224 40c-40 10-70 40-88 90h50c10-30 24-50 38-58z', '#26A69A', 0)
      + P('M54 130h66v94H58c-8-30-6-64-4-94z', '#B07A4F', 0) + P('M120 130h66c2 30 4 64-4 94h-62z', '#26A69A', 0) + R(16, 16, 208, 208, 'none', 30)
      + Lc('M16 40c40 10 70 40 88 90M224 40c-40 10-70 40-88 90M54 130c-2 30-4 64 4 94M186 130c2 30 4 64-4 94', INK, 4) + Lc('M120 130v94', '#FFFFFF', 3)
      + P('M104 130c4-40 12-60 16-70 4 10 12 30 16 70z', '#9CCC65', 3) + C(120, 92, 10, '#43A047', 3) + C(46, 190, 14, '#43A047', 3) + C(200, 186, 12, '#43A047', 3)
      + Lc('M64 50c6 6 10 12 12 18M176 50c-6 6-10 12-12 18', '#D7A475', 3) + Lc('M84 160v30M156 160v30', '#80CBC4', 0) + face(86, 176, 0.36) + face(154, 176, 0.36)),
  L('nongbua', 'พระธาตุหนองบัว', 'The square white chedi of Wat Phra That Nong Bua', ['wat phra that nong bua', 'วัดพระธาตุหนองบัว', 'square chedi', 'เจดีย์สี่เหลี่ยม', 'white chedi', 'เจดีย์ขาว', 'temple building', 'วัด', 'ubon old town', 'ในเมืองอุบล'], 'หาเจดีย์สีขาวทรงสี่เหลี่ยมสูงที่มียอดเล็กๆ ล้อมรอบ', 'Find the tall square white tower with little towers at its corners',
    // a tall square white tower tapering upward with carved panels and a golden tip, four small matching towers at its corners, on a wide white base (building only)
    R(30, 190, 180, 22, '#ECEFF1') + Lc('M30 200h180', '#FFCA28', 3) + P('M90 190l8-130h44l8 130z', '#FFFFFF') + Array.from({ length: 5 }, (_, k) => Lc(`M${92 + k * 1.2} ${170 - k * 24}h${56 - k * 2.4}`, '#B0BEC5', 3)).join('') + [110, 130].map((x) => R(x - 4, 130, 8, 22, '#90CAF9', 2, 2)).join('')
      + P('M110 60l10-34 10 34z', '#FFCA28') + C(120, 24, 4, '#FFCA28', 2) + [[52, 1], [188, 1]].map(([x]) => P(`M${x - 14} 190l4-60h20l4 60z`, '#FFFFFF') + P(`M${x - 8} 130l8-22 8 22z`, '#FFCA28')).join('') + face(120, 172, 0.4)),
  L('saochaliang', 'เสาเฉลียง', 'Sao Chaliang, the mushroom rocks', ['sao chaliang', 'เสาเฉลียง', 'mushroom rocks', 'หินรูปเห็ด', 'rock pillars', 'เสาหิน', 'pha taem national park', 'อุทยานแห่งชาติผาแต้ม', 'sandstone', 'หินทราย'], 'หาเสาหินที่มีหมวกแบนๆ เหมือนดอกเห็ด', 'Find the rock pillars wearing flat caps like mushrooms',
    // three sandstone pillars with thin wobbly stems and wide flat stone caps like giant mushrooms on a pale rock plain, tufts of grass
    bg('#FFF3E0') + P('M16 176h208v18a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#E8C9A0', 0) + frame
      + [[66, 176, 60, 34], [126, 176, 84, 42], [186, 176, 46, 26]].map(([x, y, h, w], k) => P(`M${x - 10} ${y}c4-${h / 2} -6-${h * 0.7} 2-${h}h16c8 ${h * 0.3}-2 ${h / 2} 2 ${h}z`, '#D7A475') + E(x, y - h - 6, w, 14, '#A1673F') + Lc(`M${x - w + 6} ${y - h - 6}h${w * 2 - 12}`, '#8D5524', 2.5) + (k === 1 ? face(x, y - h + 24, 0.32) : '')).join('')
      + [[40, 190], [104, 196], [210, 188]].map(([x, y]) => Lc(`M${x - 6} ${y}l6-12 6 12`, '#7CB342', 3)).join('')),
  L('khaikata', 'ไข่กระทะ', 'Khai kata, eggs in a little pan', ['khai kata', 'ไข่กระทะ', 'breakfast', 'อาหารเช้า', 'eggs in a pan', 'ไข่ดาวในกระทะ', 'baguette', 'ขนมปัง', 'vietnamese breakfast', 'อาหารเวียดนาม', 'kuan'], 'หากระทะเล็กที่มีไข่ดาวสองฟองกับกุนเชียง', 'Find the little pan with two fried eggs and slices of sausage',
    // a small black one-handled pan with two sunny fried eggs, rounds of red Chinese sausage, minced pork and spring onion, a crusty roll beside it
    E(120, 196, 98, 18, '#ECEFF1') + Lc('M180 150l46-22', '#424242', 10) + E(110, 150, 74, 46, '#37474F') + E(110, 146, 64, 38, '#5D4037', 0)
      + [[86, 140], [130, 150]].map(([x, y]) => P(`M${x - 22} ${y}c0-16 14-22 24-20 16 0 22 10 20 20-2 14-16 18-26 16-12 0-18-6-18-16z`, '#FFFFFF', 3) + C(x + 2, y - 2, 9, '#FFB300', 2.5)).join('')
      + [[68, 164], [118, 128], [146, 132], [96, 170]].map(([x, y]) => C(x, y, 6, '#E53935', 2)).join('') + [[78, 124], [142, 170]].map(([x, y]) => Lc(`M${x} ${y}l6-4`, '#7CB342', 4)).join('') + face(88, 138, 0.25)
      + g(60, 198, 1, P('M-34 0c0-16 16-22 34-22s34 6 34 22c-10 8-58 8-68 0z', '#E3A857') + Lc('M-16-14l6 10M2-18l6 10M18-14l6 10', '#B9783A', 2.5), -8)),
  L('kaengtana', 'แก่งตะนะ', 'Kaeng Tana, the river of flat rocks', ['kaeng tana', 'แก่งตะนะ', 'mun river', 'แม่น้ำมูล', 'flat rocks', 'ลานหินกลางน้ำ', 'national park', 'อุทยานแห่งชาติแก่งตะนะ', 'river view', 'ชมวิวแม่น้ำ', 'picnic'], 'หาลานหินแบนๆ กลางแม่น้ำ', 'Find the flat rocks sitting in the middle of the river',
    // a wide green river winding between big flat grey rock slabs like stepping stones, forest on both banks under a clear sky
    bg('#E1F5FE') + P('M16 70h208v34c-60-8-140-8-208 0z', '#66BB6A', 0) + P('M16 104c60-8 148-8 208 0v90a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#4DB6AC', 0) + frame
      + [[60, 130, 36, 12], [150, 124, 44, 14], [100, 168, 54, 16], [190, 172, 30, 12], [50, 204, 36, 12], [160, 208, 40, 12]].map(([x, y, rx, ry]) => E(x, y, rx, ry, '#B0BEC5') + E(x - rx * 0.2, y - ry * 0.3, rx * 0.5, ry * 0.3, '#ECEFF1', 0)).join('')
      + Lc('M30 150c10-4 20 4 30 0M120 196c10-4 20 4 30 0', '#B2DFDB', 3) + face(100, 166, 0.36)),
  L('siamtulip', 'ทุ่งดอกกระเจียว', 'A field of Siam tulips', ['siam tulip', 'ดอกกระเจียว', 'krachiao', 'กระเจียว', 'pink flowers', 'ดอกไม้สีชมพู', 'rainy season', 'หน้าฝน', 'flower field', 'ทุ่งดอกไม้', 'forest meadow'], 'หาดอกไม้สีชมพูที่ยอดเหมือนดอกทิวลิป', 'Find the pink flowers whose tops look like little tulips',
    // a meadow under trees full of Siam tulips: tall stems topped by pink cups of petals over little green ones, one big flower in front smiling
    bg('#E8F5E9') + [[40, 70], [200, 60]].map(([x, y]) => C(x, y, 30, '#81C784', 0)).join('') + P('M16 150h208v44a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#9CCC65', 0) + frame
      + [[44, 150, 0.6], [84, 140, 0.7], [160, 140, 0.7], [200, 150, 0.6], [124, 196, 1.3]].map(([x, y, s]) => g(x, y, s, Lc('M0 0v-50', '#558B2F', 5) + P('M-8-46c-8-4-12-14-6-22 6 6 10 14 6 22zM8-46c8-4 12-14 6-22-6 6-10 14-6 22z', '#7CB342', 2.5) + P('M-14-60c-4-20 4-36 14-40 10 4 18 20 14 40-8 6-20 6-28 0z', '#F06292') + Lc('M0-96v30', '#EC407A', 2) + (s > 1 ? face(0, -72, 0.28) : ''))).join('')),
  L('brass', 'ทองเหลืองบ้านปะอาว', 'Ban Pa Ao brassware', ['ban pa ao', 'บ้านปะอาว', 'brass', 'ทองเหลือง', 'lost-wax casting', 'หล่อขี้ผึ้ง', 'brass bowl', 'ขันทองเหลือง', 'bell', 'กระดิ่ง', 'handicraft village'], 'หาขันทองเหลืองลายก้นหอยกับกระดิ่งใบเล็ก', 'Find the shiny brass bowl with spiral patterns and the little bell',
    // a shiny golden brass bowl covered in raised spirals, a little brass bell with a clapper and three bangles, all cast the old lost-wax way
    E(120, 200, 96, 14, '#ECEFF1') + P('M50 120h110c0 50-24 76-55 76S50 170 50 120z', '#F2B33D') + E(105, 120, 55, 12, '#FFD54F') + E(105, 120, 44, 8, '#C8862F', 0)
      + [[74, 150], [104, 160], [134, 150]].map(([x, y]) => P(`M${x} ${y}c0-4 6-6 8-2s-2 10-8 8-8-8-4-12 12-6 14 2`, 'none').replace('fill="none"', 'fill="none" stroke="#B26A00" stroke-width="2.5"')).join('') + face(105, 158, 0.3)
      + g(182, 150, 1, Lc('M0-50v-12', '#B26A00', 3) + P('M-20 10c0-30 6-50 20-50s20 20 20 50z', '#FFCA28') + Lc('M-22 10h44', '#B26A00', 4) + C(0, 18, 6, '#F2B33D', 2.5))
      + [0, 1, 2].map((k) => E(40 + k * 12, 196, 14, 6, 'none', 4).replace('fill="none"', 'fill="none" stroke="#F2B33D"')).join('')),
  L('sandbar', 'หาดทรายกลางแม่น้ำมูล', 'A sandbar beach on the Mun river', ['hat wat tai', 'หาดวัดใต้', 'river beach', 'หาดทรายริมน้ำ', 'sandbar', 'หาดทราย', 'dry season', 'หน้าแล้ง', 'swim ring', 'ห่วงยาง', 'mun river'], 'หาหาดทรายกลางแม่น้ำที่มีกระท่อมมุงจาก', 'Find the sandy island in the river with a thatched hut',
    // a golden sandbar in the middle of the blue river, a little bamboo hut with a thatched roof on it, a pink swim ring and a sand bucket
    bg('#B3E5FC') + P('M16 110h208v84a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#4FC3F7', 0) + frame + P('M30 168c20-30 160-30 180 0-30 20-150 20-180 0z', '#FFE082') + Lc('M30 120h40M160 124h40M40 210h40M150 206h50', '#E1F5FE', 3)
      + Lc('M84 168v-40M140 168v-40', '#A1673F', 4) + R(84, 148, 56, 6, '#A1673F', 0, 2.5) + P('M70 132l42-30 42 30z', '#C5A572') + Lc('M80 128l32-22 32 22', '#9E7E46', 2)
      + E(170, 168, 16, 10, '#F06292') + E(170, 166, 6, 3, '#4FC3F7', 0) + P('M54 160l4 14h12l4-14z', '#FFCA28', 2.5) + Lc('M54 160c2-8 18-8 20 0', INK, 2) + face(112, 136, 0.3)),
  L('kuayjap', 'ก๋วยจั๊บญวน', 'Kuay jap yuan, chewy noodle soup', ['kuay jap yuan', 'ก๋วยจั๊บญวน', 'noodle soup', 'ก๋วยเตี๋ยวน้ำใส', 'quail eggs', 'ไข่นกกระทา', 'vietnamese noodles', 'อาหารญวน', 'breakfast', 'อาหารเช้า', 'chewy noodles', 'เส้นเหนียวนุ่ม'], 'หาชามก๋วยจั๊บที่มีเส้นใสๆ กับไข่นกกระทา', 'Find the bowl of clear soup with slippery noodles and quail eggs',
    // a white bowl of clear soup with thick slippery see-through noodles, little quail eggs, crispy shallots and spring onion, a porcelain spoon resting in it
    E(120, 204, 90, 14, '#ECEFF1') + P('M30 120h180c0 50-40 82-90 82S30 170 30 120z', '#FFFFFF') + Lc('M42 150c40 12 116 12 156 0', '#1E88E5', 3) + E(120, 120, 90, 18, '#FFF3E0')
      + Array.from({ length: 7 }, (_, k) => Lc(`M${52 + k * 20} ${112 + (k % 2) * 6}c8-6 12 6 20 0`, '#F5F5F5', 5)).join('') + [[78, 118], [150, 122], [116, 112]].map(([x, y]) => E(x, y, 8, 6, '#FFFFFF', 2.5) + C(x, y, 3, '#FFB300', 0)).join('')
      + [[60, 126], [100, 128], [136, 128], [176, 116]].map(([x, y]) => C(x, y, 3, '#A1673F', 0)).join('') + [[92, 112], [168, 128]].map(([x, y]) => Lc(`M${x} ${y}l6-3`, '#7CB342', 4)).join('') + Lc('M180 112l30-40', '#FFFFFF', 8) + Lc('M180 112l30-40', '#B0BEC5', 2) + face(120, 166, 0.42)),
  L('mooyo', 'หมูยอ', 'Moo yo, a pork roll in banana leaf', ['moo yo', 'หมูยอ', 'pork roll', 'หมูยอใบตอง', 'banana leaf', 'ใบตอง', 'vietnamese sausage', 'ของฝากอุบล', 'souvenir food', 'ของฝาก'], 'หาแท่งหมูยอห่อใบตองที่หั่นเป็นแว่น', 'Find the pork roll wrapped in a banana leaf and cut into rounds',
    // a fat roll of pale pink pork wrapped in a green banana leaf tied with string, a few pale round slices fanned out in front with a chilli and garlic
    g(110, 110, 1, R(-70, -26, 130, 52, '#66BB6A', 22) + Lc('M-50-26v52M-10-26v52M30-26v52', '#E8F5E9', 4) + E(60, 0, 14, 26, '#F8E1D4') + face(-10, -4, 0.38), -10)
      + [[60, 186], [96, 192], [132, 192], [168, 186]].map(([x, y]) => E(x, y, 20, 14, '#F8E1D4') + C(x - 4, y - 2, 2, '#E0B6A4', 0) + C(x + 6, y + 3, 2, '#E0B6A4', 0)).join('') + g(204, 176, 1, P('M0 0c4-14 14-20 22-18-6 4-12 12-22 18z', '#E53935', 2.5), 30)),
  L('kingfisher', 'นกกระเต็นริมแม่น้ำมูล', 'A kingfisher by the Mun river', ['kingfisher', 'นกกระเต็น', 'white-throated kingfisher', 'นกกระเต็นอกขาว', 'birdwatching', 'ดูนก', 'riverbank', 'ริมแม่น้ำ', 'mun river', 'แม่น้ำมูล', 'bright blue bird'], 'หานกสีฟ้าสดปากแดงยาวที่เกาะกิ่งไม้เหนือน้ำ', 'Find the bright blue bird with a long red beak perched over the water',
    // a round white-throated kingfisher with a chocolate head, a white bib, bright turquoise wings and a long red beak, perched on a branch over rippling water with a little fish below
    E(120, 206, 96, 14, '#4FC3F7') + Lc('M50 204c10-4 20 4 30 0M150 208c10-4 20 4 30 0', '#E1F5FE', 3) + E(176, 200, 12, 6, '#B0BEC5', 2.5) + C(170, 199, 1.6, INK, 0)
      + Lc('M20 158c60-6 140-2 200 10', '#6D4C41', 8) + [[44, 150], [200, 164]].map(([x, y], k) => g(x, y, 1, P('M0 0c10-12 28-12 34-2-10 10-26 10-34 2z', '#66BB6A', 2.5), k ? 160 : -40)).join('')
      + P('M138 136l40 26-44-6z', '#00ACC1') + E(124, 120, 36, 38, '#8D4A2B') + P('M104 118c4 20 20 30 36 26-4-20-20-30-36-26z', '#FFFFFF', 0) + P('M128 104c22 4 34 24 26 50-18-6-28-26-26-50z', '#00ACC1') + Lc('M136 116l12 20M142 110l10 18', '#4DD0E1', 2.5)
      + P('M92 92l-56 8 56 10z', '#E53935') + C(110, 92, 26, '#8D4A2B') + Lc('M110 160l-4 8M126 160l2 8', '#E53935', 3) + face(110, 94, 0.3)),
  L('khaokriap', 'ข้าวเกรียบปากหม้อ', 'Khao kriap pak mo, steamed rice-skin dumplings', ['khao kriap pak mo', 'ข้าวเกรียบปากหม้อ', 'steamed dumplings', 'ขนมนึ่ง', 'rice skin', 'แป้งข้าว', 'peanut and pork', 'ไส้ถั่วหมู', 'street snack', 'ของว่าง'], 'หาหม้อที่ขึงผ้าไว้บนปากกับแผ่นแป้งบางๆ', 'Find the pot with a cloth stretched over its mouth and a thin rice sheet steaming on it',
    // a clay pot with a white cloth stretched tight over its mouth, a thin round rice sheet steaming on it, a bamboo stick lifting one off, a plate of folded dumplings
    P('M42 120c-14 44 6 80 53 80s67-36 53-80z', '#A1673F') + Lc('M40 150c30 8 80 8 110 0', '#8D5524', 3) + E(95, 120, 58, 12, '#FFFFFF') + E(95, 120, 40, 8, '#F5F5F5', 2) + Lc('M80 100c-6-10 6-16 0-26M108 100c-6-10 6-16 0-26', '#B0BEC5', 3)
      + Lc('M150 96l-60 18', '#D7B377', 5) + E(180, 196, 46, 12, '#FFFFFF', 3) + [[160, 184], [184, 186], [206, 182]].map(([x, y]) => P(`M${x - 14} ${y + 4}c0-14 28-14 28 0z`, '#F5F5F5', 2.5) + E(x, y, 4, 3, '#A1673F', 0)).join('') + face(95, 158, 0.42)),
  L('banhxeo', 'ขนมเบื้องญวน', 'Khanom bueang yuan, a crispy yellow pancake', ['khanom bueang yuan', 'ขนมเบื้องญวน', 'crispy pancake', 'แป้งกรอบ', 'banh xeo', 'bean sprouts', 'ถั่วงอก', 'lettuce wrap', 'ห่อผักกาด', 'vietnamese food'], 'หาแผ่นแป้งสีเหลืองกรอบที่พับเป็นครึ่งวงกลม', 'Find the crispy yellow pancake folded into a half moon',
    // a big golden half-moon pancake folded over bean sprouts and pink prawns peeking out, crisp lacy edges, a pile of lettuce leaves beside it on a plate
    E(120, 170, 100, 36, '#FFFFFF') + P('M40 160c0-50 40-80 90-80s86 30 90 80z', '#FFC107') + Array.from({ length: 9 }, (_, k) => C(48 + k * 20, 162, 4, '#FFA000', 0)).join('') + [[80, 120], [150, 110], [120, 140]].map(([x, y]) => C(x, y, 6, '#FFE082', 0)).join('')
      + Array.from({ length: 6 }, (_, k) => Lc(`M${60 + k * 22} 164c2 8 6 12 10 14`, '#FFFDE7', 4)).join('') + [[90, 170], [140, 172]].map(([x, y]) => P(`M${x - 10} ${y}c0-10 20-10 20 0z`, '#FF8A65', 2.5)).join('') + face(130, 128, 0.42)
      + g(40, 196, 1, P('M-20 0c-6-20 20-30 40-14-10 16-30 20-40 14z', '#9CCC65') + Lc('M-14-2c10-4 20-8 28-10', '#558B2F', 2), -10)),
  L('meadow', 'ดอกไม้จิ๋วบนลานหิน', 'Tiny wildflowers on the rock plain', ['wildflowers', 'ดอกไม้ป่า', 'rock plain', 'ลานหิน', 'dok soi suwanna', 'ดอกสร้อยสุวรรณา', 'dok duang', 'ดอกดุสิตา', 'pha taem', 'ผาแต้ม', 'rainy season flowers'], 'หาดอกไม้เล็กจิ๋วสีม่วงเหลืองขาวที่ขึ้นบนลานหิน', 'Find the tiny purple, yellow and white flowers growing on the flat rocks',
    // a flat sandstone plain after rain dotted with carpets of tiny purple, yellow and white wildflowers on thin stems, a little magnifying glass to look closer
    bg('#E3F2FD') + P('M16 120c60-10 140-10 208 0v74a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#D7B899', 0) + Lc('M16 160c60-6 140-6 208 2M16 196c60-6 140-6 208 2', '#B9926D', 3) + frame
      + Array.from({ length: 22 }, (_, k) => { const x = 30 + ((k * 37) % 180), y = 128 + ((k * 23) % 84), c = ['#9C27B0', '#FFCA28', '#FFFFFF', '#7E57C2'][k % 4]; return Lc(`M${x} ${y + 8}v-8`, '#7CB342', 2) + C(x, y - 2, 4.5, c, 2); }).join('')
      + g(170, 76, 1, C(0, 0, 26, '#E1F5FE', 5) + Lc('M18 18l22 22', '#8D6E63', 8) + C(-4, 4, 6, '#9C27B0', 2) + face(0, -2, 0.3))),
  L('pangolin', 'ตัวนิ่มในป่าพูจองนายอย', 'A pangolin in Phu Chong Na Yoi forest', ['pangolin', 'ตัวนิ่ม', 'phu chong na yoi', 'อุทยานแห่งชาติภูจองนายอย', 'wildlife', 'สัตว์ป่า', 'scales', 'เกล็ด', 'emerald triangle', 'สามเหลี่ยมมรกต', 'forest'], 'หาตัวนิ่มตัวน้อยที่มีเกล็ดเหมือนลูกสน', 'Find the little pangolin covered in scales like a pine cone',
    // a cute pangolin walking on its back legs, covered in rows of overlapping brown scales like a pine cone, a long curled tail, a pointed pink nose, dry leaves on the ground
    E(120, 206, 90, 12, '#C5A572') + P('M150 190c40 0 60-20 56-50-10 20-30 30-56 30z', '#A1673F') + E(120, 140, 46, 60, '#A1673F')
      + Array.from({ length: 5 }, (_, r) => Array.from({ length: 4 }, (_, c) => P(`M${88 + c * 18 + (r % 2) * 8} ${100 + r * 18}c4 10 14 10 18 0`, '#8D5524', 3)).join('')).join('')
      + E(116, 80, 26, 22, '#D7A86E') + P('M96 86c-20 6-30 4-36 0 8-6 20-10 36-8z', '#D7A86E') + C(62, 86, 4, '#F48FB1', 2) + Lc('M100 196v12M136 196v12', '#8D6E63', 6) + face(118, 78, 0.32)),
  L('yangtree', 'ต้นยางนายักษ์', 'A giant yang na forest tree', ['yang na tree', 'ต้นยางนา', 'giant tree', 'ต้นไม้ยักษ์', 'dipterocarp', 'ไม้วงศ์ยาง', 'winged seeds', 'ลูกยางปีกหมุน', 'forest walk', 'เดินป่า', 'buttress roots'], 'หาต้นไม้สูงลิ่วกับเมล็ดมีปีกที่หมุนลงมา', 'Find the very tall tree and its winged seeds spinning down',
    // a very tall straight pale trunk with wide fin-like buttress roots and a small leafy crown way up high, two-winged seeds twirling down like little helicopters
    C(120, 44, 36, '#43A047') + C(90, 54, 22, '#66BB6A') + C(152, 54, 22, '#66BB6A') + P('M108 210V60h24v150z', '#BCAAA4') + P('M108 210c-10-20-30-24-50-20 20-10 40-30 50-60zM132 210c10-20 30-24 50-20-20-10-40-30-50-60z', '#A1887F')
      + Lc('M116 80v120', '#8D6E63', 2.5) + [[60, 110, -30], [178, 130, 30], [70, 160, 20]].map(([x, y, r]) => g(x, y, 1, E(0, 6, 7, 7, '#8D6E63') + P('M-2 0c-6-16-6-30 0-40 4 10 4 26 0 40zM2 0c6-16 10-28 18-36-2 12-8 26-18 36z', '#FF8A65', 2.5), r)).join('') + face(120, 150, 0.36)),
];

export default {
  places: {
    'th-ubon': { country: 'th', wave: 3, home: true, name: nm('อุบลราชธานี', 'Ubon Ratchathani'), tz: 'Asia/Bangkok', ll: [15.24, 104.85], alias: ['ubon ratchathani', 'อุบลราชธานี', 'ubon', 'UBP', 'khong chiam', 'โขงเจียม', 'pha taem', 'ผาแต้ม', 'sam phan bok', 'สามพันโบก', 'kaeng tana', 'แก่งตะนะ', 'phu chong na yoi', 'ภูจองนายอย'], colors: UB },
  },
  items,
};
