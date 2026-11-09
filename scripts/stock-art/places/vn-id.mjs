// Vietnam (Da Nang & Hoi An) and Indonesia (Bali) — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const VN = { k1: '#DA251D', k2: '#C9A227', k3: '#FFF8E1' };
const ID = { k1: '#CE1126', k2: '#00897B', k3: '#E0F2F1' };
const star5 = (x, y, r, fill) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r; d += `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`; } return `<path d="${d}z" fill="${fill}" stroke="none"/>`; };
// the lotus (Vietnam's flower): pointed pink petals rising from a pad
const lotus = (x, y, s) => g(x, y, s, E(0, 10, 34, 8, '#66BB6A', 3) + P('M0 6c-26-4-34-24-30-36 14 6 24 18 30 36z', '#F48FB1', 3) + P('M0 6c26-4 34-24 30-36-14 6-24 18-30 36z', '#F48FB1', 3) + P('M0 6c-12-14-12-36 0-48 12 12 12 34 0 48z', '#F8BBD0', 3));
// the frangipani (Bali): five rounded petals, white with a yellow heart, a little twisted
const frangi = (x, y, s) => g(x, y, s, [0, 72, 144, 216, 288].map((a) => `<g transform="rotate(${a})">${P('M0 0c-14-6-18-26-4-32 12 4 12 20 4 32z', '#FFFFFF', 3)}</g>`).join('') + C(0, 0, 8, '#FFD54A', 3));

const items = [
  // ---------- Vietnam
  { id: 'vn.stamp', cat: 'stamp', file: 'vn/stamp.v1.svg', name: nm('ตราประทับเวียดนาม', 'Vietnam stamp'), kw: ['vietnam', 'เวียดนาม'],
    svg: countryStamp({ name: 'VIETNAM', ...VN, emblem: lotus(100, 104, 1.3) }) },
  { id: 'vn.flag', ch: '🇻🇳', cat: 'flag', file: 'vn/flag.v1.svg', name: nm('ธงเวียดนาม', 'Flag of Vietnam'), kw: ['vietnam', 'เวียดนาม', 'flag', 'ธง'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#DA251D') + star5(128, 94, 34, '#FFDD00')) },
  { id: 'vn.hello', cat: 'hello', file: 'vn/hello.v1.svg', name: nm('ซินจ่าว สวัสดี', 'Xin chào, hello'), kw: ['xin chao', 'ซินจ่าว', 'hello', 'สวัสดี', 'ao dai', 'อ๊าวหญ่าย', 'non la', 'งอบ'],
    // a child in an áo dài (long side-split tunic over trousers) and a conical nón lá hat
    svg: free(P('M98 214v-40h44v40z', '#FFFFFF') + P('M84 200c0-60 12-90 36-90s36 30 36 90l-14-8-22 10-22-10z', '#4FC3F7') + Lc('M120 112v50', '#0288D1', 3) + C(120, 88, 32, '#FFE0BD')
      + P('M60 72l60-46 60 46z', '#F4D58D') + Lc('M80 58h80M94 46h52', '#C8A26B', 3) + Lc('M100 100c4 14 36 14 40 0', '#C8A26B', 2.5)
      + P('M158 150c14-16 18-38 12-54l14-4c8 22 2 46-14 64z', '#FFE0BD') + C(178, 88, 11, '#FFE0BD') + face(120, 92, 0.6)) },
  { id: 'vn.food.pho', cat: 'food', file: 'vn/food-pho.v1.svg', name: nm('เฝอ', 'Phở'), kw: ['pho', 'phở', 'เฝอ', 'noodle soup', 'ก๋วยเตี๋ยวเวียดนาม', 'beef'], colour: true,
    // a white bowl with the blue rim pattern, flat noodles, sliced beef, herbs, a lime wedge and chopsticks across
    svg: free(P('M30 104h180c0 56-40 96-90 96s-90-40-90-96z', '#FFFFFF') + Lc('M40 130c20 10 40-10 60 0s40-10 60 0 30-10 40 0', '#1E88E5', 4) + E(120, 104, 90, 20, '#FFF3E0')
      + Lc('M60 100c20-8 40 8 60 0s40 8 60 0', '#FFFDF7', 6) + [[80, 96], [110, 92], [140, 98]].map(([x, y]) => E(x, y, 14, 7, '#A1887F', 3)).join('') + P('M150 88c10-10 24-6 24 6-10 6-18 4-24-6z', '#66BB6A', 3) + P('M168 100l20-12 4 12z', '#C5E1A5', 3)
      + Lc('M40 70l170 30M44 60l168 32', '#C8A26B', 5) + face(120, 156, 0.8)) },
  { id: 'vn.food.banhmi', cat: 'food', file: 'vn/food-banhmi.v1.svg', name: nm('ขนมปังบั๋นหมี่', 'Bánh mì'), kw: ['banh mi', 'bánh mì', 'บั๋นหมี่', 'ขนมปังเวียดนาม', 'sandwich', 'แซนด์วิช'], colour: true,
    // a crusty baguette split open, packed with pickled carrot, cucumber, coriander and a chilli
    svg: free(g(120, 120, 1, P('M-100 10c0-30 40-46 100-46s100 16 100 46c0 16-40 24-100 24s-100-8-100-24z', '#E9A64C') + Lc('M-60-26l10 14M-20-32l10 14M20-32l10 14M60-26l10 14', '#C8862F', 4)
      + P('M-90 10h180c-10 16-170 16-180 0z', '#FFF8E1') + Lc('M-70 8l12 8M-40 8l12 8M-10 8l12 8M20 8l12 8M50 8l12 8', '#FF8A65', 5) + Lc('M-56 6h16M4 6h16M60 6h16', '#81C784', 6) + P('M70 0c14-10 24-6 26 2z', '#E53935', 3) + face(-10, -8, 0.6), -10)) },
  { id: 'vn.food.goicuon', cat: 'food', file: 'vn/food-goicuon.v1.svg', name: nm('ปอเปี๊ยะสดเวียดนาม', 'Fresh spring rolls'), kw: ['goi cuon', 'gỏi cuốn', 'spring roll', 'ปอเปี๊ยะสด', 'แหนมเนือง', 'rice paper'], colour: true,
    // two see-through rice-paper rolls showing pink prawns and green herbs, a little bowl of peanut dip
    svg: free([[90, 110, -12], [140, 140, -12]].map(([x, y, r]) => g(x, y, 1, R(-70, -26, 140, 52, '#F1F8E9', 26) + [-40, -10, 20].map((dx) => P(`M${dx - 10} -6c4-12 22-12 24 0-6 8-18 8-24 0z`, '#FF8A80', 3)).join('') + Lc('M-56 10h112', '#81C784', 7) + Lc('M-56 18h112', '#FFFFFF', 4), r)).join('')
      + P('M150 190h70c0 20-14 30-35 30s-35-10-35-30z', '#FFFFFF') + E(185, 190, 35, 8, '#A1673F') + face(90, 116, 0.55)) },
  { id: 'vn.animal.buffalo', ch: '🐃', cat: 'animal', file: 'vn/animal-buffalo.v1.svg', name: nm('ควายเวียดนาม', 'Water buffalo'), kw: ['buffalo', 'ควาย', 'rice field', 'นาข้าว', 'countryside', 'ชนบท'], colour: true,
    // a grey water buffalo with big swept-back horns, a little bird sitting on its back
    svg: free(E(130, 150, 80, 44, '#78909C') + R(70, 170, 20, 44, '#78909C', 8) + R(170, 170, 20, 44, '#78909C', 8) + P('M30 70c-20-10-26 20-6 30 20 6 34-6 40-14zM130 70c20-10 26 20 6 30-20 6-34-6-40-14z', '#ECEFF1')
      + C(80, 110, 40, '#78909C') + E(80, 136, 26, 18, '#90A4AE') + E(72, 132, 4, 5, INK) + E(88, 132, 4, 5, INK) + P('M168 100c6-14 20-14 22 0-8 6-16 6-22 0z', '#FFD54A', 3) + face(80, 108, 0.6)) },
  { id: 'vn.transport.basketboat', cat: 'transport', file: 'vn/transport-basketboat.v1.svg', name: nm('เรือกระด้ง', 'Basket boat'), kw: ['basket boat', 'เรือกระด้ง', 'thung chai', 'coconut forest', 'ป่ามะพร้าว', 'cam thanh', 'hoi an'], colour: true,
    // a round woven bamboo boat spinning on the water, a paddle sticking out, a nón lá on the rim
    svg: free(P('M10 190c30-8 60-8 90 0s60 8 90 0 40-6 40 0', 'none', 5).replace('fill="none"', 'fill="none" stroke="#4FC3F7"') + E(120, 150, 96, 40, '#A1673F') + E(120, 140, 86, 28, '#C8A26B')
      + [-60, -30, 0, 30, 60].map((dx) => Lc(`M${120 + dx} 114c-6 20-6 40 0 64`, '#8D6E63', 3)).join('') + Lc('M40 150c50 10 110 10 160 0', '#8D6E63', 3) + Lc('M190 120l30-70', '#8D6E63', 6) + P('M210 40l20 0-6 24z', '#8D6E63') + P('M60 128l20-20 20 20z', '#F4D58D', 3.5) + face(120, 156, 0.7)) },
  { id: 'vn.culture.waterpuppet', cat: 'culture', file: 'vn/culture-waterpuppet.v1.svg', name: nm('หุ่นกระบอกน้ำ', 'Water puppet'), kw: ['water puppet', 'หุ่นกระบอกน้ำ', 'mua roi nuoc', 'puppet show', 'โชว์หุ่น', 'thang long'], colour: true,
    // a lacquered wooden farmer puppet waist-deep in the water, a red sash, a bright conical hat and a fish under its arm
    svg: free(P('M10 190c30-8 60-8 90 0s60 8 90 0 40-6 40 0v30H10z', '#26A69A') + P('M70 190c0-50 20-80 50-80s50 30 50 80z', '#FFCA28') + Lc('M74 160h92', '#E53935', 8) + C(120, 92, 30, '#FFE0BD')
      + P('M74 80l46-36 46 36z', '#E53935') + P('M150 150c10-14 30-14 40 0-10 14-30 14-40 0zM190 150l14-10v20z', '#FF8A65', 3.5) + face(120, 96, 0.6)) },
  // Da Nang & Hoi An
  { id: 'vn-danang.stamp', cat: 'stamp', file: 'vn/danang/stamp.v1.svg', name: nm('ตราประทับดานัง ฮอยอัน', 'Da Nang & Hoi An stamp'), kw: ['da nang', 'ดานัง', 'hoi an', 'ฮอยอัน'],
    svg: cityStamp('vdn-st', { name: 'DA NANG', sub: 'HOI AN', ...VN, emblem: Lc('M50 92c30-14 70-14 100 0', '#FFD54A', 9) + Lc('M50 92c30-14 70-14 100 0', INK, 2.5) + [72, 128].map((x) => P(`M${x - 16} 146c-2-20 0-34 2-42l-4-16c0-4 4-6 6-2l3 10-1-14c0-5 6-5 7 0l1 13 1-15c0-5 7-5 7 0v15l2-12c1-5 7-4 6 1l-2 17c2 14 3 28 1 46z`, '#B0BEC5')).join('') }) },
  { id: 'vn-danang.day.hoian', cat: 'day', file: 'vn/danang/day-hoian.v1.svg', name: nm('ฮอยอันยามค่ำ', 'Hoi An by night'), kw: ['hoi an', 'ฮอยอัน', 'old town', 'เมืองเก่า', 'thu bon', 'แม่น้ำทูโบน', 'lantern boat', 'flower candles', 'ลอยกระทง'],
    // yellow shophouses along the Thu Bồn river at night, silk lanterns on strings, a boat with floating candles
    svg: scene('vdn-d1', '#283593', R(-4, 70, 120, 90, '#FFCA28') + R(116, 80, 128, 80, '#FFB300') + P('M-10 74l66-24 66 24zM110 84l66-22 66 22z', '#6D4C41') + [20, 70, 150, 200].map((x) => R(x, 100, 22, 28, '#5D4037', 3, 3.5)).join('')
      + Lc('M-4 66c60 16 160 16 248 0', INK, 3) + [[30, 76, '#E53935'], [80, 80, '#AB47BC'], [130, 80, '#FFEB3B'], [180, 76, '#26C6DA'], [220, 70, '#FF7043']].map(([x, y, c]) => E(x, y, 9, 11, c, 3)).join('')
      + P('M-4 160h248v90H-4z', '#1A237E') + P('M60 186h100l-14 14H74z', '#8D6E63') + [[40, 210], [180, 214], [120, 224]].map(([x, y]) => P(`M${x - 8} ${y}c0-8 16-8 16 0z`, '#F48FB1', 3) + C(x, y - 6, 2.5, '#FFEB3B', 0)).join('')) },
  { id: 'vn-danang.day.dragonbridge', cat: 'day', file: 'vn/danang/day-dragonbridge.v1.svg', name: nm('สะพานมังกรพ่นไฟ', 'The fire-breathing Dragon Bridge'), kw: ['dragon bridge', 'สะพานมังกร', 'cau rong', 'han river', 'แม่น้ำฮาน', 'fire show', 'พ่นไฟ', 'da nang'],
    // the golden dragon's back rolling over the Hàn river in loops, its head breathing a puff of fire, night sky
    svg: scene('vdn-d2', '#1A237E', [[40, 40], [100, 30], [200, 50]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('') + R(-4, 150, 248, 12, '#90A4AE')
      + Lc('M-4 150c20-50 50-50 70 0s50 50 70 0 50-50 70 0', '#FFC107', 14) + Lc('M-4 150c20-50 50-50 70 0s50 50 70 0 50-50 70 0', INK, 3) + P('M196 150c10-30 30-40 44-30-4 14-20 26-44 30z', '#FFC107')
      + P('M236 118c10-10 10-20 4-28 10 4 14 16 10 28zM230 108c4-8 4-16-2-22 8 4 10 12 8 20z', '#FF5722', 3) + P('M-4 162h248v90H-4z', '#283593') + Lc('M30 184h30M120 196h40M190 182h24', '#FFC107', 4)) },
  { id: 'vn-danang.landmark.goldenbridge', cat: 'landmark', file: 'vn/danang/landmark-goldenbridge.v1.svg', name: nm('สะพานมือยักษ์ บานาฮิลล์', 'Golden Bridge, Ba Na Hills'), kw: ['golden bridge', 'สะพานมือยักษ์', 'cau vang', 'ba na hills', 'บานาฮิลล์', 'giant hands'], colour: true, spot: nm('หามือยักษ์ที่ถือสะพาน', 'Find the giant hands holding the bridge'),
    // two huge mossy stone hands rising out of the cloud forest, holding up the curving gold walkway
    svg: free(P('M10 120c50 30 170 30 220 0', '#FFD54A', 0).replace('stroke-width="0"', 'stroke="none"') + Lc('M10 116c50 30 170 30 220 0', '#FFD54A', 14) + Lc('M10 116c50 30 170 30 220 0', INK, 4) + Lc('M10 106c50 30 170 30 220 0', INK, 3)
      + [70, 170].map((x) => P(`M${x - 34} 220c-4-40 0-70 4-90l-8-34c-2-8 8-12 12-4l6 20-2-28c0-10 12-10 14 0l2 26 2-30c0-10 14-10 14 0v30l4-24c2-10 14-8 12 2l-4 34c4 30 6 60 2 98z`, '#B0BEC5')).join('')
      + [[60, 180], [178, 170]].map(([x, y]) => P(`M${x} ${y}c6-6 14-4 14 4-6 4-12 2-14-4z`, '#81C784', 3)).join('') + face(70, 190, 0.5) + face(170, 190, 0.5)) },
  { id: 'vn-danang.landmark.coveredbridge', cat: 'landmark', file: 'vn/danang/landmark-coveredbridge.v1.svg', name: nm('สะพานญี่ปุ่น ฮอยอัน', 'Japanese Covered Bridge, Hoi An'), kw: ['japanese covered bridge', 'สะพานญี่ปุ่น', 'chua cau', 'hoi an', 'ฮอยอัน', 'covered bridge'], colour: true, spot: nm('หาสะพานที่มีหลังคา', 'Find the bridge with a roof'),
    // a little arched wooden bridge with a tiled roof over it, red pillars, a canal under it
    svg: free(P('M10 200c40-10 60-10 100 0s60 10 120 0v24H10z', '#4FC3F7') + P('M20 190c40-60 160-60 200 0', '#FFCA28', 0).replace('stroke-width="0"', 'stroke="none"') + P('M20 196c40-60 160-60 200 0h-20c-30-40-130-40-160 0z', '#A1673F')
      + R(50, 100, 140, 54, '#FFE0B2') + [60, 100, 140, 180].map((x) => R(x - 5, 100, 10, 54, '#C62828', 0, 3.5)).join('') + P('M30 104q90-40 180 0l-12 10H42z', '#5D4037') + R(104, 66, 32, 26, '#5D4037') + P('M96 70q24-16 48 0l-6 6h-36z', '#5D4037') + face(120, 126, 0.5)) },
  { id: 'vn-danang.landmark.shophouse', cat: 'landmark', file: 'vn/danang/landmark-shophouse.v1.svg', name: nm('บ้านเหลืองฮอยอันกับดอกเฟื่องฟ้า', 'Hoi An yellow house'), kw: ['yellow house', 'บ้านเหลือง', 'hoi an old town', 'เมืองเก่าฮอยอัน', 'bougainvillea', 'เฟื่องฟ้า', 'shophouse'], colour: true, spot: nm('หาบ้านสีเหลืองที่มีดอกไม้สีชมพู', 'Find the yellow house with pink flowers'),
    // a mustard-yellow old shophouse with blue shutters, a tiled roof, pink bougainvillea pouring over the wall, a bicycle
    svg: free(R(40, 70, 160, 150, '#FDD835') + P('M26 74l94-40 94 40z', '#6D4C41') + [[60, 90], [140, 90]].map(([x, y]) => R(x, y, 40, 40, '#1E88E5', 3) + Lc(`M${x + 20} ${y}v40`, INK, 3)).join('') + R(100, 160, 40, 60, '#1E88E5', 3)
      + [[46, 80], [60, 70], [76, 76], [52, 96], [190, 110], [200, 124], [186, 136]].map(([x, y]) => C(x, y, 10, '#EC407A', 3)).join('') + face(120, 140, 0.5)) },
  { id: 'vn-danang.landmark.marble', cat: 'landmark', file: 'vn/danang/landmark-marble.v1.svg', name: nm('ภูเขาหินอ่อนห้าลูก', 'Marble Mountains'), kw: ['marble mountains', 'ภูเขาหินอ่อน', 'ngu hanh son', 'cave', 'ถ้ำ'], colour: true, spot: nm('หาประตูถ้ำในภูเขา', 'Find the cave door in the mountain'),
    // round grey limestone hills crowned with trees, a cave mouth and a stone stair winding up
    svg: free(P('M10 220c0-60 20-110 60-110s50 40 50 50c10-40 30-70 60-70s50 40 50 130z', '#B0BEC5') + [[60, 108], [80, 100], [170, 82], [190, 90]].map(([x, y]) => C(x, y, 14, '#66BB6A')).join('')
      + P('M150 220v-40c0-24 40-24 40 0v40z', '#455A64') + Lc('M70 220l14-20 -10-16 14-18', '#ECEFF1', 6) + face(110, 180, 0.6)) },
  // ---------- Indonesia (Bali)
  { id: 'id.stamp', cat: 'stamp', file: 'id/stamp.v1.svg', name: nm('ตราประทับอินโดนีเซีย', 'Indonesia stamp'), kw: ['indonesia', 'อินโดนีเซีย'],
    svg: countryStamp({ name: 'INDONESIA', ...ID, emblem: frangi(100, 90, 1.25) }) },
  { id: 'id.flag', ch: '🇮🇩', cat: 'flag', file: 'id/flag.v1.svg', name: nm('ธงอินโดนีเซีย', 'Flag of Indonesia'), kw: ['indonesia', 'อินโดนีเซีย', 'flag', 'ธง', 'merah putih'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF') + P('M44 38c40-12 84 12 126 0s28-4 42 0v56c-14-4 0-12-42 0s-86-12-126 0z', '#CE1126')) },
  { id: 'id.hello', cat: 'hello', file: 'id/hello.v1.svg', name: nm('สลามัตเซียง สวัสดี', 'Selamat siang, hello'), kw: ['selamat', 'สลามัต', 'hello', 'สวัสดี', 'bali', 'บาหลี', 'kebaya', 'sarong'],
    // a child in a Balinese lace kebaya and a sash, a frangipani behind one ear, a sarong in a batik check
    svg: free(P('M80 214c0-30 10-50 20-56h40c10 6 20 26 20 56z', '#7E57C2') + Lc('M84 186h72M86 202h68', '#FFD54A', 4) + P('M78 170c0-34 18-54 42-54s42 20 42 54z', '#FFFFFF') + Lc('M80 150h80', '#EC407A', 9)
      + C(120, 84, 36, '#E0A877') + P('M84 80c0-30 18-42 36-42s36 12 36 42c-6-10-18-18-36-18s-30 8-36 18z', '#2E1A12') + frangi(152, 66, 0.55)
      + P('M70 150c-14-16-18-38-12-54l-14-4c-8 22-2 46 14 64z', '#E0A877') + C(52, 88, 11, '#E0A877') + face(120, 90, 0.65)) },
  { id: 'id.food.nasigoreng', cat: 'food', file: 'id/food-nasigoreng.v1.svg', name: nm('ข้าวผัดนาซิโกเร็ง', 'Nasi goreng'), kw: ['nasi goreng', 'นาซิโกเร็ง', 'fried rice', 'ข้าวผัด', 'krupuk', 'กรุปุก'], colour: true,
    // a mound of dark sweet-soy fried rice with a fried egg on top, prawn crackers leaning on the side, cucumber
    svg: free(E(120, 172, 106, 34, '#FFFFFF') + P('M40 168c0-50 40-80 80-80s80 30 80 80z', '#B9774A') + [[80, 140], [110, 120], [140, 132], [160, 150], [96, 156]].map(([x, y]) => C(x, y, 3, '#7B4A2A', 0)).join('')
      + P('M80 100c10-30 70-30 80 0 0 14-80 14-80 0z', '#FFFFFF') + C(122, 96, 14, '#FFB300') + P('M180 160c10-30 30-40 44-30-4 20-24 30-44 30z', '#FFF8E1') + E(54, 178, 12, 7, '#C5E1A5', 3) + face(120, 146, 0.7)) },
  { id: 'id.food.satay', cat: 'food', file: 'id/food-satay.v1.svg', name: nm('สะเต๊ะบนใบตอง', 'Satay on a banana leaf'), kw: ['satay', 'sate', 'สะเต๊ะ', 'peanut sauce', 'น้ำจิ้มถั่ว', 'grill'], colour: true,
    // three skewers of grilled meat across a banana leaf, a pool of peanut sauce, little rice cakes
    svg: free(P('M10 180c40-70 180-90 220-40-30 50-180 70-220 40z', '#66BB6A') + Lc('M30 160c60-20 120-40 190-60', '#388E3C', 3)
      + [0, 1, 2].map((i) => g(120, 120 + i * 18, 1, Lc('M-90 0h180', '#C8A26B', 4) + [-50, -20, 10, 40].map((dx) => R(dx - 13, -10, 26, 20, '#8D4A2B', 7, 4)).join(''), -14)).join('')
      + E(176, 168, 26, 14, '#C68642') + [[60, 176], [84, 186]].map(([x, y]) => R(x - 10, y - 8, 20, 16, '#F1F8E9', 4, 3)).join('') + face(110, 138, 0.5)) },
  { id: 'id.food.coconut', ch: '🥥', cat: 'food', file: 'id/food-coconut.v1.svg', name: nm('มะพร้าวอ่อน', 'Young coconut'), kw: ['young coconut', 'มะพร้าวอ่อน', 'es kelapa', 'coconut', 'มะพร้าว', 'beach', 'drink'], colour: true,
    // a green young coconut with its top cut off, a striped straw and a tiny paper umbrella
    svg: free(P('M50 120c0-50 30-80 70-80s70 30 70 80-30 90-70 90-70-40-70-90z', '#7CB342') + E(120, 54, 44, 14, '#FFFDF7') + Lc('M136 54l30-50', '#F48FB1', 8) + P('M150 30l40-10-20 34z', '#FFCA28', 3.5) + Lc('M162 30l6 22', INK, 3)
      + face(120, 132)) },
  { id: 'id.animal.komodo', cat: 'animal', file: 'id/animal-komodo.v1.svg', name: nm('มังกรโคโมโด', 'Komodo dragon'), kw: ['komodo', 'โคโมโด', 'dragon', 'มังกร', 'lizard', 'กิ้งก่า', 'flores'], colour: true,
    // a big friendly monitor lizard: long heavy tail, bumpy grey-brown skin, a forked tongue flicking
    svg: free(P('M200 170c20 10 34 0 34-14-20 0-30 4-40 6', '#8D7B68') + E(140, 156, 70, 30, '#8D7B68') + P('M90 160c-30 0-60-10-70-30 20-14 60-14 80 0z', '#8D7B68') + [[96, 176], [176, 176], [120, 180], [156, 180]].map(([x, y]) => R(x - 8, y, 16, 28, '#8D7B68', 6)).join('')
      + [[130, 140], [150, 148], [170, 140], [116, 152]].map(([x, y]) => C(x, y, 4, '#6D5D4B', 0)).join('') + Lc('M20 132l-14-4M20 132l-12 6', '#E53935', 3) + face(60, 132, 0.45)) },
  { id: 'id.animal.starling', cat: 'animal', file: 'id/animal-starling.v1.svg', name: nm('นกเอี้ยงบาหลี', 'Bali starling'), kw: ['bali starling', 'นกเอี้ยงบาหลี', 'jalak bali', 'bird', 'นก', 'white bird'], colour: true,
    // a snow-white bird with a bright blue mask round each eye, a crest and black wing tips
    svg: free(E(130, 140, 64, 50, '#FFFFFF') + P('M150 130c30 0 60 20 70 40-30 10-60 0-70-40z', '#FFFFFF') + P('M200 156l20 14-20 4z', INK) + C(84, 96, 34, '#FFFFFF') + P('M70 64c0-20 20-26 26-10 4-16 20-14 18 4z', '#FFFFFF')
      + E(72, 96, 14, 11, '#29B6F6', 3) + E(98, 96, 14, 11, '#29B6F6', 3) + P('M52 104l-16 4 16 6z', '#BCAAA4') + Lc('M110 188l-4 22M140 188l4 22', '#90A4AE', 4) + face(84, 96, 0.55)) },
  { id: 'id.transport.jukung', cat: 'transport', file: 'id/transport-jukung.v1.svg', name: nm('เรือจูกุงบาหลี', 'Balinese jukung boat'), kw: ['jukung', 'จูกุง', 'outrigger', 'fishing boat', 'เรือประมง', 'sanur', 'ซานูร์', 'amed'], colour: true,
    // a slim painted outrigger canoe with a swordfish nose, bamboo floats on both sides, a striped triangle sail
    svg: free(P('M10 196c30-8 60-8 90 0s60 8 90 0 40-6 40 0', 'none', 5).replace('fill="none"', 'fill="none" stroke="#4FC3F7"') + P('M20 160h170c20 0 30-6 40-20l-10 34H40z', '#FFFFFF') + Lc('M30 168h160', '#E53935', 6) + Lc('M30 176h150', '#1E88E5', 4)
      + Lc('M40 150l-20 30M180 150l20 30', '#A1673F', 4) + Lc('M10 184h60M170 184h60', '#C8A26B', 7) + Lc('M110 160V40', '#8D6E63', 5) + P('M112 44l70 100h-70z', '#FFCA28') + Lc('M120 70l20 30M120 100l30 40', '#E53935', 5) + face(70, 150, 0.5)) },
  { id: 'id.culture.kite', cat: 'culture', file: 'id/culture-kite.v1.svg', name: nm('ว่าวบาหลี', 'Balinese kite'), kw: ['kite', 'ว่าว', 'layang-layang', 'kite festival', 'เทศกาลว่าว', 'sanur'], colour: true,
    // a big bird-shaped festival kite (a bebean fish-bird) with a long ribbon tail, high in the sky
    svg: free(P('M120 40c40 20 90 30 110 60-40 10-80 4-110-20-30 24-70 30-110 20 20-30 70-40 110-60z', '#E53935') + P('M120 60c20 30 20 70 0 100-20-30-20-70 0-100z', '#FFCA28')
      + Lc('M120 160c-10 20 10 30 0 50s10 20 0 30', '#1E88E5', 6) + Lc('M40 100c20 0 30-10 40-20M200 100c-20 0-30-10-40-20', INK, 3) + face(120, 104, 0.5)) },
  { id: 'id.culture.gamelan', cat: 'culture', file: 'id/culture-gamelan.v1.svg', name: nm('ระนาดกาเมลัน', 'Gamelan'), kw: ['gamelan', 'กาเมลัน', 'music', 'ดนตรี', 'metallophone', 'ระนาด', 'dance'], colour: true,
    // a carved red-and-gold wooden frame holding bronze bars, a little round-headed mallet
    svg: free(P('M20 180h200l-10-60H30z', '#C62828') + Lc('M30 134h180', '#FFD54A', 5) + [0, 1, 2, 3, 4, 5, 6].map((i) => R(40 + i * 24, 110 - i * 2, 18, 40 + i * 2, '#D4A93C', 3, 3.5)).join('') + R(30, 180, 16, 30, '#C62828', 3) + R(194, 180, 16, 30, '#C62828', 3)
      + Lc('M150 70l50-40', '#8D6E63', 5) + C(148, 72, 9, '#FFD54A') + face(120, 194, 0.55)) },
  // Bali
  { id: 'id-bali.stamp', cat: 'stamp', file: 'id/bali/stamp.v1.svg', name: nm('ตราประทับบาหลี', 'Bali stamp'), kw: ['bali', 'บาหลี'],
    // Tanah Lot: a little roofed shrine on a rock in the waves at sunset
    svg: cityStamp('ibl-st', { name: 'BALI', sub: 'INDONESIA', ...ID, emblem: C(124, 80, 12, '#FFB74D') + P('M66 140c4-20 14-30 34-34 20 4 30 14 34 34z', '#8D6E63') + [0, 1, 2].map((i) => P(`M${88 + i * 4} ${104 - i * 10}h${24 - i * 8}l-4-8h-${16 - i * 8}z`, '#3E2723')).join('') + Lc('M56 142c14-6 28-6 42 0s28 6 46 0', '#4FC3F7', 4) }) },
  { id: 'id-bali.day.terraces', cat: 'day', file: 'id/bali/day-terraces.v1.svg', name: nm('นาขั้นบันไดเตกัลลาลัง', 'Tegallalang rice terraces'), kw: ['tegallalang', 'เตกัลลาลัง', 'rice terraces', 'นาขั้นบันได', 'ubud', 'อูบุด', 'jungle swing', 'ชิงช้า'],
    // curving green terraces stepping down the valley, palm trees, a giant swing out over the edge
    svg: scene('ibl-d1', '#E1F5FE', [0, 1, 2, 3, 4].map((i) => P(`M-4 ${100 + i * 30}c50-24 110 10 160-10s70 10 90 0v${36}H-4z`, ['#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342'][i])).join('')
      + [[40, 96], [196, 80]].map(([x, y]) => Lc(`M${x} ${y + 40}c-2-20 2-34 6-40`, '#8D6E63', 6) + P(`M${x + 6} ${y}c-14-8-28-2-32 6M${x + 6} ${y}c14-8 28-2 32 6`, 'none', 6).replace('fill="none"', 'fill="none" stroke="#43A047"')).join('')
      + Lc('M150 20l-30 90M150 20l30 90', INK, 3) + R(116, 108, 68, 8, '#A1673F', 3) + C(150, 98, 9, '#E0A877', 3)) },
  { id: 'id-bali.day.uluwatu', cat: 'day', file: 'id/bali/day-uluwatu.v1.svg', name: nm('พระอาทิตย์ตกหน้าผาอูลูวาตู', 'Sunset at Uluwatu'), kw: ['uluwatu', 'อูลูวาตู', 'sunset', 'พระอาทิตย์ตก', 'cliff', 'หน้าผา', 'kecak', 'jimbaran', 'จิมบารัน'],
    // tall sea cliffs glowing at sunset, a tiny shrine roof on the edge, a sun sinking into the ocean, surfers' waves
    svg: scene('ibl-d2', '#FFAB91', C(120, 150, 34, '#FFCA28') + P('M-4 150h248v100H-4z', '#0288D1') + Lc('M20 170c20-8 40-8 60 0M140 184c20-8 40-8 60 0', '#E1F5FE', 4)
      + P('M-4 60c30-10 60 20 70 90v100H-4z', '#8D6E63') + P('M166 250V140c10-40 40-60 78-70v180z', '#795548') + [0, 1].map((i) => P(`M${196 + i * 4} ${66 - i * 10}h${24 - i * 8}l-4-8h-${16 - i * 8}z`, '#3E2723')).join('') + P('M-4 60c20-6 40 0 50 14', '#66BB6A')) },
  { id: 'id-bali.landmark.gate', cat: 'landmark', file: 'id/bali/landmark-gate.v1.svg', name: nm('ประตูสวรรค์ลempuyang', 'The split gate of Lempuyang'), kw: ['lempuyang', 'เลมปูยัง', 'gates of heaven', 'ประตูสวรรค์', 'split gate', 'candi bentar', 'mount agung', 'ภูเขาอากุง'], colour: true, spot: nm('หาประตูที่แยกเป็นสองซีก', 'Find the gate split in two'),
    // the carved split gate standing on steps, Mount Agung framed in the gap, a mirror-like floor
    svg: free(P('M100 120l20-80 20 80z', '#90A4AE') + P('M112 66l8-26 8 26-4 4-4-4-4 4z', '#FFFFFF', 3) + [-1, 1].map((sd) => P(`M${120 + sd * 22} 200V60${sd < 0 ? 'l-14 16v20l-10 10v20l-10 10v74z' : 'l14 16v20l10 10v20l10 10v74z'}`, '#6D4C41')).join('')
      + Lc('M80 100h18M142 100h18M76 140h22M142 140h22', '#A1887F', 3) + P('M40 200h160l12 20H28z', '#BCAAA4') + face(78, 170, 0.45) + face(162, 170, 0.45)) },
  { id: 'id-bali.landmark.tirtagangga', cat: 'landmark', file: 'id/bali/landmark-tirtagangga.v1.svg', name: nm('สวนน้ำเทิร์ตากังกา', 'Tirta Gangga water palace'), kw: ['tirta gangga', 'เทิร์ตากังกา', 'water palace', 'วังน้ำ', 'stepping stones', 'koi pond'], colour: true, spot: nm('หาหินที่เดินข้ามน้ำได้', 'Find the stones you can hop across'),
    // octagonal stepping stones across a fish pond, stone fish-statues spouting water, a tiered fountain
    svg: free(R(10, 120, 220, 100, '#4DD0E1', 10) + [[50, 150], [90, 170], [130, 150], [170, 170], [210, 150]].map(([x, y]) => E(x, y, 18, 10, '#B0BEC5')).join('')
      + R(100, 60, 40, 60, '#B0BEC5') + R(88, 50, 64, 14, '#90A4AE', 3) + R(104, 34, 32, 18, '#90A4AE', 3) + Lc('M100 76c-20 4-30 20-34 40M140 76c20 4 30 20 34 40', '#E1F5FE', 5)
      + P('M60 196c10-10 24-10 30 0-6 8-20 8-30 0z', '#FF8A65', 3) + P('M160 200c10-10 24-10 30 0-6 8-20 8-30 0z', '#FFFFFF', 3) + face(120, 90, 0.45)) },
  { id: 'id-bali.landmark.surf', cat: 'landmark', file: 'id/bali/landmark-surf.v1.svg', name: nm('หาดคูตากับกระดานโต้คลื่น', 'Kuta beach surf'), kw: ['kuta', 'คูตา', 'surf', 'โต้คลื่น', 'surfboard', 'กระดานโต้คลื่น', 'seminyak', 'legian', 'beach'], colour: true, spot: nm('หากระดานโต้คลื่นบนชายหาด', 'Find the surfboards on the beach'),
    // a curling turquoise wave, three bright surfboards stuck in the sand, a beach umbrella
    svg: free(P('M10 150c0-80 80-120 150-110-50 10-70 40-60 70 10 30 50 30 60 10 0 30-40 50-80 46-40-2-70-6-70-16z', '#26C6DA') + Lc('M20 140c10-60 70-90 120-90', '#E0F7FA', 5)
      + P('M10 190h220v30H10z', '#FFE082') + [[150, '#E53935'], [176, '#FFCA28'], [202, '#1E88E5']].map(([x, c]) => P(`M${x - 12} 200c0-60 6-90 12-96 6 6 12 36 12 96z`, c)).join('')
      + Lc('M60 200v-70', INK, 4) + P('M20 132c20-30 60-30 80 0z', '#F48FB1') + face(176, 160, 0.4)) },
  { id: 'id-bali.landmark.ubudpalace', cat: 'landmark', file: 'id/bali/landmark-ubudpalace.v1.svg', name: nm('วังอูบุดและสระบัว', 'Ubud palace and lotus pond'), kw: ['ubud palace', 'วังอูบุด', 'puri saren', 'ubud', 'อูบุด', 'lotus pond', 'สระบัว', 'legong'], colour: true, spot: nm('หาประตูแกะสลักสีแดงทอง', 'Find the carved red-and-gold door'),
    // the brick-and-stone palace gate with a red-and-gold carved door, frangipani trees, a lotus pond in front
    svg: free(R(50, 60, 140, 120, '#D84315') + Lc('M50 90h140M50 120h140M50 150h140', '#BF360C', 3) + P('M40 64l80-36 80 36z', '#5D4037') + R(96, 110, 48, 70, '#C62828', 4) + Lc('M100 120h40M120 110v70', '#FFD54A', 4)
      + P('M10 180h220v40H10z', '#4FC3F7') + [[40, 196], [200, 200]].map(([x, y]) => E(x, y, 16, 6, '#66BB6A', 3)).join('') + P('M74 196c-6-12-2-22 6-24 8 2 12 12 6 24z', '#F48FB1', 3) + frangi(30, 70, 0.5) + frangi(210, 70, 0.5) + face(120, 92, 0.5)) },
];
export default {
  places: {
    vn: { country: 'vn', wave: 1, name: nm('เวียดนาม', 'Vietnam'), tz: 'Asia/Ho_Chi_Minh', alias: ['vietnam', 'เวียดนาม', 'việt nam'], colors: VN },
    'vn-danang': { country: 'vn', wave: 1, name: nm('ดานังและฮอยอัน', 'Da Nang & Hoi An'), tz: 'Asia/Ho_Chi_Minh', ll: [16.05, 108.2], alias: ['da nang', 'danang', 'ดานัง', 'đà nẵng', 'hoi an', 'hội an', 'ฮอยอัน', 'ba na', 'bana hills', 'บานาฮิลล์', 'my khe', 'son tra', 'marble mountains'], colors: VN },
    id: { country: 'id', wave: 1, name: nm('อินโดนีเซีย', 'Indonesia'), tz: 'Asia/Makassar', alias: ['indonesia', 'อินโดนีเซีย'], colors: ID },
    'id-bali': { country: 'id', wave: 1, name: nm('บาหลี', 'Bali'), tz: 'Asia/Makassar', ll: [-8.65, 115.22], alias: ['bali', 'บาหลี', 'ubud', 'อูบุด', 'kuta', 'คูตา', 'seminyak', 'เซมินยัค', 'uluwatu', 'อูลูวาตู', 'nusa dua', 'นูซาดูอา', 'sanur', 'jimbaran', 'canggu', 'denpasar'], colors: ID },
  },
  items,
};
