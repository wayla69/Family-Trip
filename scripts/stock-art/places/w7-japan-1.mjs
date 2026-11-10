// Wave 7, Japan part 1: Osaka, Kyoto, Hokkaido, Fukuoka, Okinawa, Takayama & Nagoya, Hiroshima & Kobe, Kanazawa — new landmarks
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (jp/osaka/landmark-sorihashi.v1.svg → jp-osaka.landmark.sorihashi)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const f1 = (v) => +v.toFixed(1);
// a star (or a leaf with n points): outer radius ro, inner ri
const star = (cx, cy, ro, ri, n = 5, rot = -90) => 'M' + Array.from({ length: n * 2 }, (_, k) => { const a = (rot + k * 180 / n) * Math.PI / 180, r = k % 2 ? ri : ro; return `${f1(cx + r * Math.cos(a))} ${f1(cy + r * Math.sin(a))}`; }).join('L') + 'z';
// a point on a cubic bezier
const bz = (p0, p1, p2, p3, t) => { const u = 1 - t; return [0, 1].map((i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]); };
const rabbit = (x, y, c, s = 1, flip = 1) => g(x, y, s, E(-6 * flip, -40, 6, 18, c, 2.5) + E(6 * flip, -42, 6, 18, c, 2.5) + E(-6 * flip, -40, 2.5, 11, '#FFB3C1', 0) + E(6 * flip, -42, 2.5, 11, '#FFB3C1', 0) + E(4 * flip, 0, 26, 18, c, 3) + C(-22 * flip, 8, 6, '#FFFFFF', 2) + C(0, -18, 16, c, 3) + face(0, -18, 0.32, 'w'));

const items = [
  // ---------- Osaka
  L('jp/osaka/landmark-sorihashi.v1.svg', 'สะพานโค้งโซริฮาชิ ศาลเจ้าซูมิโยชิ', 'The steep Sorihashi bridge at Sumiyoshi Taisha', ['sorihashi', 'โซริฮาชิ', 'sumiyoshi taisha', 'ศาลเจ้าซูมิโยชิไทชะ', 'sumiyoshi', 'arched bridge', 'สะพานโค้ง', 'drum bridge', 'red bridge', 'สะพานแดง'], 'หาสะพานแดงที่โค้งสูงจนเกือบเป็นครึ่งวงกลม', 'Find the red bridge that curves up almost into a half circle',
    // a steep red half-moon bridge over a pond, its railing posts along the curve, its red reflection in the water, a child climbing up, a round pine at the side
    E(120, 196, 112, 28, '#4FC3F7') + Lc('M44 198Q120 236 196 198', '#EF9A9A', 6) + Lc('M70 212h30M140 214h26', '#E1F5FE', 3)
      + g(208, 120, 1, R(-4, 0, 8, 66, '#6D4C41', 2, 2.5) + E(0, -6, 28, 20, '#388E3C') + E(-12, 12, 18, 12, '#43A047'))
      + P('M20 190C50 40 190 40 220 190h-24C170 76 70 76 44 190z', '#E53935')
      + Array.from({ length: 9 }, (_, k) => { const [x, y] = bz([20, 190], [50, 40], [190, 40], [220, 190], 0.1 + k * 0.1); return Lc(`M${f1(x)} ${f1(y)}v-18`, '#C62828', 4); }).join('')
      + Lc('M18 172C48 22 192 22 222 172', '#C62828', 5) + R(8, 184, 40, 14, '#B0BEC5', 3) + R(192, 184, 40, 14, '#B0BEC5', 3)
      + kid(74, 112, '#FFCA28', 0.9) + face(120, 92, 0.42)),
  L('jp/osaka/landmark-kushikatsu.v1.svg', 'คุชิคัตสึ ของทอดเสียบไม้ย่านชินเซไก', 'Kushikatsu skewers in Shinsekai', ['kushikatsu', 'คุชิคัตสึ', 'kushiage', 'คุชิอาเกะ', 'shinsekai', 'ชินเซไก', 'fried skewers', 'ของทอดเสียบไม้', 'dipping sauce', 'ซอสจิ้ม'], 'หาหม้อซอสสีเงินที่มีไม้ทอดจุ่มอยู่', 'Find the silver sauce pot with a skewer dipped in it',
    // a wooden tray of golden breaded skewers on cabbage leaves, a square steel pot of dark sauce with one skewer standing in it
    R(16, 160, 208, 50, '#A1673F', 12) + Lc('M30 176h180', '#8D5524', 3)
      + P('M24 168c10-30 40-34 60-20 14-16 40-10 44 12z', '#AED581') + Lc('M50 160l14-8M80 158l12-10', '#7CB342', 3)
      + [[-18, 74, 150], [-10, 82, 184]].map(([r, x, y]) => g(x, y, 1, Lc('M-62 0h118', '#E6C27A', 6) + R(-42, -16, 40, 32, '#F4B942', 14) + R(2, -16, 40, 32, '#EFA83A', 14) + [[-30, -6], [-16, 6], [14, -4], [28, 8], [-22, 2], [22, 2]].map(([a, b]) => C(a, b, 2.4, '#C77B22', 0)).join(''), r)).join('')
      + R(140, 86, 76, 88, '#B0BEC5', 10) + R(146, 92, 64, 16, '#4E342E', 5, 2.5) + Lc('M150 120h56', '#ECEFF1', 3)
      + g(166, 70, 1, Lc('M0-40v50', '#E6C27A', 5) + R(-10, -34, 20, 24, '#F4B942', 9) + C(-3, -24, 2.2, '#C77B22', 0) + C(4, -16, 2.2, '#C77B22', 0), 8)
      + face(178, 144, 0.5)),
  // ---------- Kyoto
  L('jp/kyoto/landmark-ryoanji.v1.svg', 'สวนหินเรียวอันจิ', 'The rock garden of Ryōan-ji', ['ryoanji', 'ryōan-ji', 'เรียวอันจิ', 'rock garden', 'สวนหิน', 'zen garden', 'สวนเซน', 'raked gravel', 'กรวดคราดเป็นลาย', 'karesansui'], 'หาเส้นวงกลมที่คราดไว้รอบก้อนหินบนลานกรวดขาว', 'Find the circles raked round the rocks in the white gravel',
    // a low ochre earth wall with a grey tiled top, a field of white gravel raked into straight lines with rings round three mossy rocks, a wooden veranda in front where a child sits
    R(12, 46, 216, 50, '#D9A55B') + P('M8 50h224l-12-16H20z', '#546E7A') + Lc('M30 40h180', '#78909C', 3) + E(60, 74, 18, 8, '#E2B46E', 0) + E(170, 66, 22, 9, '#CF9A50', 0)
      + R(12, 96, 216, 96, '#F5F5F5') + Array.from({ length: 7 }, (_, k) => Lc(`M16 ${106 + k * 12}h208`, '#CFD8DC', 2.5)).join('')
      + [[66, 128, 1.1], [160, 152, 0.9], [196, 112, 0.7]].map(([x, y, s]) => g(x, y, s, E(0, 4, 42, 18, '#F5F5F5', 0) + E(0, 4, 40, 17, 'none', 0) + Lc('M-40 4a40 17 0 1 0 80 0a40 17 0 1 0-80 0', '#CFD8DC', 2.5) + Lc('M-30 4a30 12 0 1 0 60 0a30 12 0 1 0-60 0', '#CFD8DC', 2.5) + E(0, 6, 22, 8, '#7CB342', 2.5) + P('M-16 4c-2-14 8-22 18-20 12 2 16 10 14 20z', '#78909C', 3))).join('')
      + R(6, 190, 228, 24, '#8D6E63', 3) + Lc('M60 192v20M120 192v20M180 192v20', '#6D4C41', 2) + kid(150, 196, '#29B6F6') + face(66, 122, 0.28)),
  // ---------- Hokkaido
  L('jp/hokkaido/landmark-goryokaku.v1.svg', 'ป้อมดาวห้าแฉกโกเรียวกากุ', 'Goryōkaku, the star-shaped fort', ['goryokaku', 'goryōkaku', 'โกเรียวกากุ', 'star fort', 'ป้อมรูปดาว', 'hakodate', 'ฮาโกดาเตะ', 'moat', 'คูน้ำ', 'cherry blossom'], 'นับแฉกของป้อมรูปดาวให้ครบห้าแฉก', 'Count the five points of the star-shaped fort',
    // a five-pointed star fort seen from above: a blue moat round a green star of grass lined with pink cherry trees, a little bridge over the moat, a white office building in the middle
    P(star(120, 126, 112, 66), '#4FC3F7') + P(star(120, 126, 92, 52), '#8BC34A')
      + Array.from({ length: 10 }, (_, k) => { const a = (-90 + k * 36) * Math.PI / 180, r = k % 2 ? 46 : 70; return C(120 + r * Math.cos(a), 126 + r * Math.sin(a), 9, '#F8BBD0', 2) + C(120 + r * Math.cos(a) + 5, 126 + r * Math.sin(a) - 4, 2.5, '#F06292', 0); }).join('')
      + g(120, 126, 1, R(-6, 50, 12, 26, '#BCAAA4', 2.5), 36) + R(98, 116, 44, 26, '#FFF8E1', 2) + P('M94 118l26-14 26 14z', '#455A64') + face(120, 132, 0.32)),
  L('jp/hokkaido/landmark-jingisukan.v1.svg', 'เจงกิสข่าน ปิ้งเนื้อแกะบนเตาโดม', 'Jingisukan lamb barbecue on a dome grill', ['jingisukan', 'genghis khan', 'เจงกิสข่าน', 'lamb barbecue', 'ปิ้งย่างเนื้อแกะ', 'dome grill', 'เตาโดม', 'grilled vegetables', 'ผักย่าง', 'hokkaido food'], 'หาเตาโดมที่มีเนื้อแกะย่างอยู่บนยอด', 'Find the dome grill with the lamb sizzling on top',
    // a ridged dome-shaped iron grill on a little burner, slices of lamb on the dome, onion rings, pumpkin and bean sprouts round its brim, steam rising
    R(70, 188, 100, 26, '#455A64', 6) + P('M84 188l8-12h56l8 12', '#FF7043') + E(120, 176, 104, 20, '#90A4AE')
      + P('M30 172C30 92 210 92 210 172z', '#78909C') + Array.from({ length: 7 }, (_, k) => Lc(`M120 112L${48 + k * 24} 170`, '#546E7A', 2.5)).join('')
      + [[-30, 92, 128], [10, 124, 116], [30, 150, 134], [-10, 108, 150]].map(([r, x, y]) => g(x, y, 1, E(0, 0, 18, 9, '#C9705E', 2.5) + Lc('M-10 -2c6 4 14 4 20 0', '#F2C6B4', 2), r)).join('')
      + [[38, 180], [196, 178]].map(([x, y]) => C(x, y, 10, '#FFFFFF', 2.5) + C(x, y, 5, '#FFFFFF', 2)).join('') + P('M62 186a14 9 0 0 1 28 0z', '#FFA726', 2.5) + P('M150 186a14 9 0 0 1 28 0z', '#FFA726', 2.5) + Lc('M100 190c4-6 8-6 12 0M118 190c4-6 8-6 12 0', '#FFF8E1', 3)
      + Lc('M90 84c-6-10 6-14 0-26M120 76c-6-10 6-14 0-26M150 84c-6-10 6-14 0-26', '#B0BEC5', 3) + face(120, 156, 0.4)),
  // ---------- Fukuoka
  L('jp/fukuoka/landmark-mentaiko.v1.svg', 'เมนไทโกะ ไข่ปลาค็อดเผ็ดของฮากาตะ', 'Hakata mentaiko, spicy cod roe', ['mentaiko', 'เมนไทโกะ', 'karashi mentaiko', 'spicy cod roe', 'ไข่ปลาค็อดรสเผ็ด', 'hakata', 'ฮากาตะ', 'rice bowl', 'ข้าวสวย', 'onigiri filling'], 'หาไข่ปลาสีชมพูแดงสองลูกที่วางคู่กันบนใบชิโสะ', 'Find the two pink-red roe sacs lying side by side on a shiso leaf',
    // a pair of plump pink-red roe sacs dotted with tiny eggs on a green shiso leaf on a white plate, a bowl of steaming rice behind
    P('M150 92h70c0 34-14 50-35 50s-35-16-35-50z', '#3949AB') + P('M148 94c4-20 16-24 22-16 6-12 22-12 26 0 8-8 22-4 24 16z', '#FFFFFF') + Lc('M172 70c-4-8 4-12 0-20M196 70c-4-8 4-12 0-20', '#B0BEC5', 3)
      + E(116, 176, 104, 32, '#FFFFFF') + Lc('M24 182c40 22 144 22 184 0', '#90CAF9', 3) + P('M38 170c20-40 100-50 150-14-40 30-110 36-150 14z', '#66BB6A') + Lc('M44 168c40-6 90-10 136-10', '#388E3C', 2)
      + g(98, 150, 1, E(0, 0, 54, 17, '#E8505B'), -8) + g(110, 172, 1, E(0, 0, 54, 17, '#EF5A6F'), 6)
      + Array.from({ length: 16 }, (_, k) => C(66 + (k % 8) * 9, 150 + Math.floor(k / 8) * 22 + (k % 3), 2, '#FF9AA2', 0)).join('') + face(112, 168, 0.4)),
  L('jp/fukuoka/landmark-futamigaura.v1.svg', 'หินคู่ซากุไรฟุตามิงาอุระ', 'The wedded rocks of Sakurai Futamigaura', ['futamigaura', 'ฟุตามิงาอุระ', 'sakurai futamigaura', 'wedded rocks', 'หินสามีภรรยา', 'meoto iwa', 'white torii', 'โทริอิสีขาว', 'itoshima', 'อิโตชิมะ'], 'หาเชือกเส้นใหญ่ที่ผูกหินสองก้อนไว้ด้วยกัน', 'Find the thick rope tying the two rocks together',
    // two rocks in the sea tied together by a thick straw rope with white paper zigzags, the sun setting between them, a white torii standing in the shallow water in front
    sky('#FFE0B2') + C(122, 118, 26, '#FF8A65', 0) + R(-4, 124, 248, 120, '#4FC3F7', 0, 0) + Lc('M20 150h40M170 146h50M90 160h60', '#E1F5FE', 3)
      + P('M34 136c-6-40 10-66 40-66s46 26 40 66z', '#8D6E63') + P('M40 92c10-24 56-26 68 0-20-6-48-6-68 0z', '#558B2F') + P('M144 136c-4-30 8-48 28-48s32 18 28 48z', '#A1887F') + P('M150 102c8-18 40-18 46 0-14-4-32-4-46 0z', '#689F38')
      + Lc('M108 104q20 12 40 2', '#E6C27A', 8) + Lc('M108 104q20 12 40 2', '#C8A060', 2) + [[116, 110], [128, 113], [140, 110]].map(([x, y]) => Lc(`M${x} ${y}l3 6-4 4 3 6`, '#FFFFFF', 3)).join('')
      + g(120, 190, 1, R(-30, -40, 6, 52, '#FFFFFF', 0, 2.5) + R(24, -40, 6, 52, '#FFFFFF', 0, 2.5) + P('M-42-44q42 6 84 0l-2 8q-40 4-80 0z', '#FFFFFF', 2.5) + R(-30, -30, 60, 6, '#FFFFFF', 0, 2.5))
      + P('M-4 212c80-10 160-10 248 0v32H-4z', '#FFE082') + face(74, 112, 0.36) + face(172, 116, 0.3)),
  L('jp/fukuoka/landmark-yanagawa.v1.svg', 'ล่องเรือถ่อในคลองยานากาวะ', 'A punt boat on the Yanagawa canals', ['yanagawa', 'ยานากาวะ', 'kawakudari', 'canal boat', 'เรือถ่อ', 'donkobune', 'punting', 'willow trees', 'ต้นหลิว', 'canal cruise'], 'หาคนถ่อเรือที่ใส่หมวกฟางยืนอยู่ท้ายเรือ', 'Find the boatman in a straw hat standing at the back of the boat',
    // a long flat wooden boat on a green canal between stone banks, children sitting in it, a boatman in a straw hat pushing a long pole, a willow tree hanging over the water
    sky('#E8F5E9') + R(-4, 120, 248, 124, '#4DB6AC', 0, 0) + P('M-4 120h248v-14H-4z', '#BCAAA4') + Array.from({ length: 6 }, (_, k) => R(4 + k * 40, 108, 34, 10, '#D7CCC8', 2, 1.5)).join('')
      + Lc('M30 30c10 20 0 50 4 80', '#6D4C41', 7) + Array.from({ length: 8 }, (_, k) => Lc(`M${20 + k * 12} ${24 + (k % 3) * 4}c-4 30 4 50 0 ${60 + (k % 2) * 16}`, '#7CB342', 3)).join('')
      + P('M24 176h192l-14 18H40z', '#8D6E63') + Lc('M30 182h178', '#6D4C41', 2) + kid(80, 176, '#EF5350', 0.9) + kid(116, 176, '#FFCA28', 0.9) + kid(152, 176, '#42A5F5', 0.9)
      + g(196, 150, 1, R(-7, 0, 14, 26, '#3949AB', 3) + C(0, -8, 9, '#FFE0BD', 2.5) + P('M-20-12l20-12 20 12z', '#E6C27A', 2.5) + Lc('M8 6l26 70', '#A1673F', 4))
      + Lc('M40 214c20-4 40 4 60 0M140 220c20-4 40 4 60 0', '#B2DFDB', 3) + face(120, 186, 0.3, 'none')),
  L('jp/fukuoka/landmark-wisteria.v1.svg', 'อุโมงค์ดอกฟูจิที่คาวาจิฟูจิเอ็น', 'The wisteria tunnel of Kawachi Fujien', ['wisteria', 'ดอกฟูจิ', 'วิสทีเรีย', 'kawachi fujien', 'คาวาจิฟูจิเอ็น', 'flower tunnel', 'อุโมงค์ดอกไม้', 'kitakyushu', 'คิตะคิวชู', 'purple flowers'], 'หาพวงดอกไม้สีม่วงที่ห้อยลงมาเหมือนสายฝน', 'Find the purple flower bunches hanging down like rain',
    // a tunnel of wooden arches seen from inside, long bunches of purple, pink and white wisteria hanging from every arch, a path leading to the light, a child walking in
    sky('#F3E5F5') + P('M96 244l14-120h20l14 120z', '#D7CCC8', 0) + C(120, 116, 14, '#FFFDE7', 0)
      + [100, 76, 54, 34].map((r, k) => Lc(`M${120 - r} 244V${130 - r * 0.3}a${r} ${r * 0.9} 0 0 1 ${r * 2} 0V244`, '#8D6E63', 6 - k)).join('')
      + [100, 76, 54].map((r, k) => Array.from({ length: 7 }, (_, j) => { const a = Math.PI * (j + 0.5) / 7, x = 120 - r * Math.cos(a), y = 130 - r * 0.3 - r * 0.9 * Math.sin(a); return E(x, y + 18 - k * 4, 6 - k, 20 - k * 4, ['#9575CD', '#CE93D8', '#F8F8FF', '#B39DDB'][(j + k) % 4], k ? 1.5 : 2.5); }).join('')).join('')
      + kid(120, 226, '#FFCA28', 1.1) + face(120, 80, 0.3, 'none')),
  L('jp/fukuoka/landmark-umegaemochi.v1.svg', 'อุเมงาเอะโมจิ ขนมย่างลายดอกบ๊วยที่ดาไซฟุ', 'Umegae mochi, the plum-blossom rice cakes of Dazaifu', ['umegae mochi', 'อุเมงาเอะโมจิ', 'dazaifu', 'ดาไซฟุ', 'grilled rice cake', 'ขนมโมจิย่าง', 'red bean', 'ถั่วแดง', 'plum blossom', 'ดอกบ๊วย'], 'หาลายดอกบ๊วยห้ากลีบบนขนมย่าง', 'Find the five-petal plum flower pressed into the grilled cakes',
    // three round flat rice cakes toasted brown on a black iron mould, each stamped with a five-petal plum flower, a pink plum branch above
    R(24, 150, 192, 50, '#455A64', 10) + Lc('M36 186h168', '#37474F', 3)
      + [[66, 148], [174, 148], [120, 136]].map(([x, y]) => C(x, y, 36, '#F3D9A4', 3.5) + [[-14, -14], [16, 10], [-12, 16], [18, -12]].map(([a, b]) => C(x + a, y + b, 5, '#D9A15A', 0)).join('') + Array.from({ length: 5 }, (_, j) => { const a = (-90 + j * 72) * Math.PI / 180; return C(x + 9 * Math.cos(a), y + 9 * Math.sin(a), 6, 'none', 2); }).join('') + C(x, y, 2.5, INK, 0)).join('')
      + Lc('M20 40c40 10 70 0 100 20', '#6D4C41', 5) + [[48, 40], [80, 46], [108, 56]].map(([x, y]) => Array.from({ length: 5 }, (_, j) => { const a = (-90 + j * 72) * Math.PI / 180; return C(x + 6 * Math.cos(a), y + 6 * Math.sin(a), 5, '#F8BBD0', 1.5); }).join('') + C(x, y, 2.5, '#F06292', 0)).join('')
      + face(120, 158, 0.38)),
  // ---------- Okinawa
  L('jp/okinawa/landmark-sanshin.v1.svg', 'ซันชิน พิณสามสายของโอกินาว่า', 'The sanshin, Okinawa\'s three-string lute', ['sanshin', 'ซันชิน', 'three-string lute', 'พิณสามสาย', 'snakeskin drum', 'okinawan music', 'ดนตรีโอกินาว่า', 'shamisen', 'ryukyu', 'ริวกิว'], 'หาลายเกล็ดงูบนหน้ากลองของพิณ', 'Find the snakeskin scales on the lute\'s round face',
    // a sanshin with a long black lacquered neck and three white strings, a rounded body covered in python skin, three tuning pegs and a red and gold cord, musical notes floating
    g(124, 124, 1, R(-7, -112, 14, 150, '#3E2723', 4) + P('M-8-112c0-12 4-20 12-22l4 22z', '#3E2723') + [[-16, -96], [16, -86], [-16, -76]].map(([x, y]) => R(x < 0 ? x : 7, y, 9, 6, '#FFF3E0', 2, 2)).join('')
      + R(-40, 20, 80, 76, '#5D4037', 22) + R(-33, 27, 66, 62, '#E0D3B8', 18, 2.5) + Array.from({ length: 12 }, (_, k) => E(-20 + (k % 4) * 13, 38 + Math.floor(k / 4) * 16 + (k % 2) * 4, 5, 3.5, '#A08F6E', 0)).join('')
      + Lc('M-4-100V80M0-100V80M4-100V80', '#FFFFFF', 1.5) + R(-12, 70, 24, 6, '#FFF3E0', 2, 2) + Lc('M30 96c10 20 16 30 26 40', '#E53935', 4) + C(58, 138, 6, '#FFC107', 2), -28)
      + [[184, 50], [206, 84]].map(([x, y]) => C(x, y, 7, INK, 0) + Lc(`M${x + 6} ${y}v-24l10 4`, INK, 3)).join('') + face(104, 186, 0.36)),
  L('jp/okinawa/landmark-goyachampuru.v1.svg', 'โกยาจัมปุรุ ผัดมะระโอกินาว่า', 'Gōyā champurū, Okinawa\'s bitter melon stir-fry', ['goya champuru', 'gōyā champurū', 'โกยาจัมปุรุ', 'bitter melon', 'มะระ', 'stir-fry', 'ผัดผัก', 'okinawan food', 'อาหารโอกินาว่า', 'tofu'], 'หามะระลูกยาวผิวขรุขระที่วางข้างจาน', 'Find the long bumpy bitter melon beside the plate',
    // a white plate of stir-fried green bitter melon half-moons with yellow scrambled egg and white tofu cubes, a whole bumpy bitter melon with a smile lying in front
    E(112, 118, 100, 52, '#FFFFFF') + Lc('M24 126c30 40 146 40 176 0', '#4FC3F7', 3)
      + [[70, 108], [110, 96], [150, 110], [92, 132], [134, 132], [170, 128], [56, 128]].map(([x, y], k) => g(x, y, 1, P('M-14 0a14 12 0 0 0 28 0z', '#7CB342', 2.5) + P('M-8 0a8 6 0 0 0 16 0z', '#F1F8E9', 1.5), k * 25 - 60)).join('')
      + [[88, 112], [126, 116], [160, 98], [64, 96]].map(([x, y]) => P(`M${x - 10} ${y}c0-10 8-12 12-8 4-6 12-2 10 6-2 8-18 10-22 2z`, '#FFD54F', 2)).join('') + [[108, 120], [142, 96], [76, 120]].map(([x, y]) => R(x, y, 13, 13, '#FFF8E1', 2, 2)).join('')
      + g(130, 196, 1, E(0, 0, 80, 22, '#8BC34A') + Array.from({ length: 13 }, (_, k) => C(-66 + k * 11, -14 + (k % 2) * 4, 5, '#9CCC65', 1.5)).join('') + P('M78 -6c8-4 14-2 18 4', '#558B2F', 3), -4) + face(126, 196, 0.42)),
  L('jp/okinawa/landmark-heartrock.v1.svg', 'หินรูปหัวใจที่เกาะโคอุริ', 'The heart rock of Kouri Island', ['heart rock', 'หินหัวใจ', 'kouri island', 'เกาะโคอุริ', 'tinu beach', 'kouri bridge', 'สะพานโคอุริ', 'turquoise sea', 'ทะเลสีฟ้าใส', 'nakijin'], 'หาช่องรูปหัวใจในก้อนหินกลางทะเล', 'Find the heart-shaped hole in the rock in the sea',
    // a big round brown rock standing in turquoise shallow water with a heart-shaped gap through it, green bushes on top, the long low Kouri bridge on the horizon
    sky('#B3E5FC') + R(-4, 92, 248, 152, '#26C6DA', 0, 0) + Lc('M-4 84h248', '#ECEFF1', 6) + Array.from({ length: 9 }, (_, k) => Lc(`M${6 + k * 28} 86v10`, '#B0BEC5', 3)).join('') + R(-4, 160, 248, 84, '#80DEEA', 0, 0)
      + P('M50 200c-10-50 0-110 30-130 20-12 60-12 80 0 30 20 40 80 30 130z', '#A1887F') + P('M64 82c10-24 100-24 112 0-30-10-82-10-112 0z', '#689F38') + E(84, 76, 16, 10, '#7CB342') + E(150, 74, 18, 10, '#7CB342')
      + P('M120 186c-40-24-50-60-30-72 12-8 24-2 30 10 6-12 18-18 30-10 20 12 10 48-30 72z', '#B2EBF2', 3.5) + Lc('M106 172c8 4 20 4 28 0', '#80DEEA', 3)
      + Lc('M20 214c20-4 40 4 60 0M160 220c20-4 40 4 60 0', '#E0F7FA', 3) + face(120, 104, 0.3)),
  L('jp/okinawa/landmark-manzamo.v1.svg', 'แหลมมันซาโมะ หน้าผางวงช้าง', 'Cape Manzamo, the elephant-trunk cliff', ['manzamo', 'มันซาโมะ', 'cape manzamo', 'แหลมมันซาโมะ', 'elephant trunk rock', 'หน้าผางวงช้าง', 'sea cliff', 'หน้าผาริมทะเล', 'onna', 'ออนนะ'], 'หาหน้าผาที่มีงวงช้างจุ่มลงไปในทะเล', 'Find the cliff that dips its elephant trunk into the sea',
    // a grassy cliff shaped like an elephant's head, its trunk curving down into the deep blue sea and leaving an arch, waves splashing at its foot
    sky('#E1F5FE') + R(-4, 160, 248, 84, '#1E88E5', 0, 0) + Lc('M10 172h40M40 186h30', '#90CAF9', 3)
      + P('M244 64H128c-26 0-44 18-44 42 0 34-10 64-26 94h40c6-24 14-46 34-46s30 22 34 46h78z', '#A1887F') + Lc('M110 120c10 10 10 30 4 50', '#8D6E63', 3) + Lc('M190 100c10 20 14 50 10 80', '#8D6E63', 3)
      + P('M128 64H244v16H136c-14 0-30 6-44 20 6-22 18-36 36-36z', '#7CB342') + R(-4, 196, 248, 48, '#1E88E5', 0, 0) + P('M50 198c8-8 18-8 26 0 8-8 18-8 26 0M130 198c8-8 18-8 26 0 8-8 18-8 26 0', '#FFFFFF', 2.5)
      + Lc('M20 222c20-4 40 4 60 0M140 226c20-4 40 4 60 0', '#64B5F6', 3) + face(158, 100, 0.42)),
  // ---------- Takayama, Shirakawa-go and Nagoya
  L('jp/takayama/landmark-yatai.v1.svg', 'รถแห่ยาไตงานเทศกาลทากายามะ', 'A Takayama festival float', ['takayama festival', 'เทศกาลทากายามะ', 'yatai', 'ยาไต', 'festival float', 'รถแห่', 'sanno matsuri', 'hachiman matsuri', 'karakuri', 'ornate wagon'], 'หาล้อไม้ใหญ่สองล้อใต้รถแห่สีแดงทอง', 'Find the two big wooden wheels under the red and gold float',
    // a tall ornate festival wagon: big black wheels, a red base, a golden middle with blue embroidered curtains, a red upper deck, a curved black roof with tassels at its corners
    [[72, 204], [168, 204]].map(([x, y]) => C(x, y, 22, '#4E342E') + C(x, y, 6, '#FFC107', 2) + Lc(`M${x - 18} ${y}h36M${x} ${y - 18}v36`, '#6D4C41', 3)).join('')
      + R(44, 168, 152, 28, '#C62828', 4) + Lc('M50 182h140', '#FFC107', 3) + R(60, 112, 120, 56, '#FFD54F', 4) + P('M66 118h108v36c-18 8-36-6-54 0s-36 8-54 0z', '#1565C0', 2.5) + [[84, 132], [112, 138], [140, 128], [160, 140]].map(([x, y]) => C(x, y, 3, '#FFD54F', 0)).join('')
      + R(76, 72, 88, 40, '#C62828', 4) + R(84, 80, 72, 24, '#FFE082', 3, 2.5) + P('M48 78c26-4 48-26 72-36 24 10 46 32 72 36l-6 8c-24-4-44-20-66-30-22 10-42 26-66 30z', '#37474F')
      + Lc('M112 40l8-16 8 16', '#FFC107', 4) + [[48, 84], [192, 84]].map(([x, y]) => Lc(`M${x} ${y}v24`, '#8E24AA', 3) + C(x, y + 28, 5, '#FB8C00', 2)).join('') + face(120, 92, 0.32)),
  L('jp/takayama/landmark-hobamiso.v1.svg', 'โฮบะมิโสะ มิโสะย่างบนใบแมกโนเลีย', 'Hoba miso grilled on a magnolia leaf', ['hoba miso', 'โฮบะมิโสะ', 'magnolia leaf', 'ใบแมกโนเลีย', 'grilled miso', 'มิโสะย่าง', 'hida', 'ฮิดะ', 'shiitake', 'charcoal brazier'], 'หาใบไม้สีน้ำตาลใหญ่ที่วางอยู่บนเตาถ่านเล็ก', 'Find the big brown leaf lying on the little charcoal stove',
    // a big dry magnolia leaf on a small clay charcoal stove, a mound of brown miso bubbling on it with green spring onion rings and shiitake slices, steam curling up
    R(56, 154, 128, 60, '#BCAAA4', 10) + R(70, 166, 100, 16, '#FF7043', 4, 2.5) + Lc('M80 174h80', '#FFCA28', 3) + Lc('M60 196h120', '#A1887F', 3)
      + P('M14 140C40 100 120 90 226 124 170 158 80 168 14 140z', '#C8A060') + Lc('M24 138c60-6 130-12 196-14', '#8D6E63', 3) + Array.from({ length: 5 }, (_, k) => Lc(`M${60 + k * 30} ${134 - k * 1}l${10} ${k % 2 ? 12 : -12}`, '#8D6E63', 2)).join('')
      + P('M80 132c4-24 76-26 84-2-20 10-62 12-84 2z', '#8D5524') + [[96, 120], [124, 116], [148, 124]].map(([x, y]) => C(x, y, 5, '#9CCC65', 2) + C(x, y, 2, '#F1F8E9', 0)).join('') + [[112, 128], [140, 116]].map(([x, y]) => P(`M${x - 8} ${y}a8 6 0 0 1 16 0z`, '#795548', 2)).join('')
      + Lc('M100 96c-6-10 6-14 0-24M128 92c-6-10 6-14 0-24M156 98c-6-10 6-14 0-24', '#B0BEC5', 3) + face(120, 186, 0.34)),
  L('jp/takayama/landmark-hitsumabushi.v1.svg', 'ฮิตสึมาบุชิ ข้าวหน้าปลาไหลของนาโกย่า', 'Hitsumabushi, Nagoya\'s eel rice', ['hitsumabushi', 'ฮิตสึมาบุชิ', 'grilled eel', 'ปลาไหลย่าง', 'unagi', 'อุนางิ', 'eel rice', 'ข้าวหน้าปลาไหล', 'nagoya food', 'อาหารนาโกย่า'], 'หาถังไม้กลมที่มีปลาไหลย่างหั่นเป็นชิ้นเล็กๆ', 'Find the round wooden tub of chopped grilled eel',
    // a round wooden rice tub with copper bands, full of rice covered in shiny chopped grilled eel, a small empty bowl and a small teapot of broth beside it
    P('M28 104h184v62c0 24-40 38-92 38s-92-14-92-38z', '#A1673F') + Lc('M30 134c40 18 140 18 180 0M30 158c40 18 140 18 180 0', '#E0A458', 4) + E(120, 104, 92, 26, '#5D4037') + E(120, 104, 84, 22, '#FFF8E1')
      + Array.from({ length: 12 }, (_, k) => R(52 + (k % 4) * 34, 88 + Math.floor(k / 4) * 11, 30, 10, '#A0522D', 3, 2)).join('') + Array.from({ length: 4 }, (_, k) => Lc(`M${60 + k * 34} 90l12 30`, '#5D2A12', 1.5)).join('') + [[96, 92], [150, 108]].map(([x, y]) => C(x, y, 3, '#7CB342', 1.5)).join('')
      + P('M14 194h46c0 18-10 26-23 26s-23-8-23-26z', '#E53935') + E(37, 194, 23, 5, '#FFF8E1', 2) + E(204, 206, 26, 18, '#455A64') + Lc('M178 200l-16-6', '#455A64', 5) + R(198, 182, 12, 8, '#455A64', 2, 2)
      + face(120, 172, 0.42)),
  L('jp/takayama/landmark-scienceball.v1.svg', 'ลูกบอลเงินยักษ์ของพิพิธภัณฑ์วิทยาศาสตร์นาโกย่า', 'The giant silver ball of the Nagoya City Science Museum', ['nagoya city science museum', 'พิพิธภัณฑ์วิทยาศาสตร์นาโกย่า', 'planetarium', 'ท้องฟ้าจำลอง', 'giant sphere', 'ลูกบอลยักษ์', 'silver dome', 'science museum', 'stars', 'ดวงดาว'], 'หาลูกบอลสีเงินยักษ์ที่ลอยอยู่ระหว่างตึกสองหลัง', 'Find the giant silver ball floating between two buildings',
    // a huge shiny silver sphere held between two museum buildings, a few stars twinkling on it, a child looking up at it from the ground
    R(10, 100, 70, 116, '#90A4AE') + R(160, 92, 70, 124, '#B0BEC5') + Array.from({ length: 6 }, (_, k) => R(20 + (k % 2) * 30, 112 + Math.floor(k / 2) * 30, 20, 16, '#B3E5FC', 2, 2) + R(170 + (k % 2) * 30, 104 + Math.floor(k / 2) * 32, 20, 16, '#B3E5FC', 2, 2)).join('')
      + C(120, 104, 70, '#E0E6EA') + P('M70 140a70 70 0 0 0 110 10c-40 12-80 6-110-10z', '#B0BEC5', 0) + E(92, 70, 18, 10, '#FFFFFF', 0) + [[146, 70], [160, 100], [138, 52]].map(([x, y]) => P(`M${x} ${y - 6}l2 4 4 2-4 2-2 4-2-4-4-2 4-2z`, '#FFC107', 1.5)).join('')
      + R(-4, 214, 248, 30, '#BDBDBD', 0, 0) + kid(120, 222, '#EF5350') + Lc('M128 196l10-14', '#FFE0BD', 3) + face(120, 116, 0.5)),
  L('jp/takayama/landmark-fakefood.v1.svg', 'อาหารจำลองของกุโจฮาจิมัง', 'Gujō Hachiman\'s plastic food models', ['food samples', 'อาหารจำลอง', 'plastic food', 'อาหารพลาสติก', 'sampuru', 'ซัมปุรุ', 'gujo hachiman', 'กุโจฮาจิมัง', 'restaurant window', 'make your own'], 'หาตะเกียบที่ลอยคีบเส้นอยู่กลางอากาศ', 'Find the chopsticks floating in the air, lifting noodles',
    // a shop display window of food models: a bowl of noodles with chopsticks floating in mid-air lifting a strand, a yellow omelette rice with a red ketchup zigzag, a tall parfait
    R(14, 30, 212, 184, '#E3F2FD', 12) + R(14, 30, 212, 184, 'none', 12, 6) + Lc('M22 170h196', '#8D6E63', 6) + Lc('M30 48l30 30', '#FFFFFF', 4)
      + P('M28 132h72c0 26-16 38-36 38s-36-12-36-38z', '#E53935') + E(64, 132, 36, 8, '#FFE082') + Lc('M42 60l40 16M46 52l40 16', '#8D5524', 4) + Lc('M56 72c-6 20 6 40-2 60M64 74c-4 20 8 40 0 58M72 76c-6 20 4 38 0 56', '#FFD54F', 3)
      + E(128, 156, 32, 10, '#FFFFFF') + P('M100 152c0-24 56-24 56 0z', '#FFCA28') + Lc('M108 142l8-6 8 6 8-6 8 6 8-6', '#E53935', 3) + C(118, 158, 4, '#7CB342', 1.5)
      + P('M176 168h28l-4-8h-20z', '#FFFFFF') + Lc('M190 160v-12', '#B0BEC5', 3) + P('M174 148l4-66h24l4 66z', '#E1F5FE') + R(178, 124, 24, 20, '#F8BBD0', 0, 0) + R(178, 104, 24, 20, '#FFF3E0', 0, 0) + C(190, 76, 12, '#FFFFFF') + C(190, 64, 6, '#E53935', 2) + P('M174 148l4-66h24l4 66z', 'none', 3)
      + face(128, 138, 0.3)),
  // ---------- Hiroshima, Miyajima and Kobe
  L('jp/hiroshima/landmark-momijimanju.v1.svg', 'โมมิจิมันจู ขนมรูปใบเมเปิลของมิยาจิมะ', 'Momiji manjū, Miyajima\'s maple-leaf cakes', ['momiji manju', 'momiji manjū', 'โมมิจิมันจู', 'maple leaf cake', 'ขนมรูปใบเมเปิล', 'red bean paste', 'ไส้ถั่วแดง', 'miyajima', 'มิยาจิมะ', 'omotesando'], 'หาขนมใบเมเปิลชิ้นที่ถูกกัดจนเห็นไส้', 'Find the maple-leaf cake with a bite showing its filling',
    // golden maple-leaf shaped cakes on a wooden tray, one bitten to show its dark red bean filling, real red maple leaves falling round them
    R(20, 160, 200, 40, '#8D6E63', 10) + Lc('M30 176h180', '#6D4C41', 3)
      + [[66, 140, 0], [174, 140, 14], [120, 120, -8]].map(([x, y, r], k) => g(x, y, 1, P(star(0, 0, 38, 20, 7, -90), '#E0A458', 3.5) + Lc('M0 30V-26M0 6l-18-14M0 6l18-14', '#C77B22', 2.5) + (k === 1 ? C(26, -18, 16, '#E0A458', 0) + P('M14-10c4-8 12-12 20-8', '#5D2A2A', 4) : ''), r)).join('')
      + [[30, 50, 12], [206, 46, -20], [140, 36, 30], [36, 100, 40]].map(([x, y, r]) => g(x, y, 1, P(star(0, 0, 14, 7, 7, -90), '#E53935', 2), r)).join('')
      + face(120, 124, 0.42)),
  L('jp/hiroshima/landmark-shamoji.v1.svg', 'ทัพพีข้าวยักษ์แห่งมิยาจิมะ', 'The giant rice scoop of Miyajima', ['giant shamoji', 'ชาโมจิยักษ์', 'rice scoop', 'ทัพพีตักข้าว', 'rice paddle', 'ไม้พายข้าว', 'miyajima', 'มิยาจิมะ', 'omotesando', 'wooden spoon'], 'หาทัพพีไม้ที่ใหญ่กว่าเด็กหลายเท่า', 'Find the wooden rice scoop many times bigger than the child',
    // an enormous wooden rice scoop standing on a low wooden stand, wood grain on its blade, a child beside it for scale, red maple leaves at its foot
    R(52, 196, 136, 18, '#6D4C41', 4) + R(62, 180, 16, 20, '#6D4C41', 2, 2.5) + R(162, 180, 16, 20, '#6D4C41', 2, 2.5)
      + R(108, 120, 24, 70, '#D9A55B', 8) + E(120, 74, 52, 62, '#E8C07A') + Lc('M100 30c-10 30-10 70 0 100M140 30c10 30 10 70 0 100M120 18v112', '#D9A55B', 3) + Lc('M112 140v40M128 140v40', '#C8913E', 2)
      + kid(206, 208, '#42A5F5') + [[40, 206], [24, 196]].map(([x, y]) => P(star(x, y, 9, 4.5, 7, -90), '#E53935', 1.5)).join('') + face(120, 84, 0.6)),
  L('jp/hiroshima/landmark-rabbitisland.v1.svg', 'เกาะกระต่ายโอคุโนะชิมะ', 'Ōkunoshima, the rabbit island', ['okunoshima', 'ōkunoshima', 'โอคุโนะชิมะ', 'rabbit island', 'เกาะกระต่าย', 'usagi shima', 'feeding rabbits', 'ให้อาหารกระต่าย', 'bunnies', 'seto inland sea'], 'นับกระต่ายที่มารุมเด็กให้ครบ', 'Count the rabbits gathering round the child',
    // a green lawn by the calm sea, a child crouching with a leaf of cabbage, white, brown and grey rabbits hopping up from every side
    sky('#E1F5FE') + R(-4, 70, 248, 40, '#4FC3F7', 0, 0) + P('M140 74c20-20 50-24 80-4z', '#81C784') + P('M-4 100c80-14 160-14 248 0v144H-4z', '#9CCC65') + Lc('M40 140l4-8M180 130l4-8M120 210l4-8', '#7CB342', 3)
      + kid(120, 160, '#FB8C00', 1.3) + P('M130 166c6-10 20-10 22 2-6 8-18 8-22-2z', '#C5E1A5', 2.5)
      + rabbit(54, 168, '#FFFFFF', 1) + rabbit(186, 172, '#BCAAA4', 0.95, -1) + rabbit(80, 222, '#90A4AE', 0.8) + rabbit(170, 226, '#FFFFFF', 0.75, -1) + rabbit(36, 112, '#A1887F', 0.6)),
  L('jp/hiroshima/landmark-himeji.v1.svg', 'ปราสาทฮิเมจิ ปราสาทนกกระสาขาว', 'Himeji Castle, the white heron castle', ['himeji castle', 'ปราสาทฮิเมจิ', 'himeji', 'ฮิเมจิ', 'white heron castle', 'ปราสาทนกกระสาขาว', 'shirasagi-jo', 'castle keep', 'world heritage', 'มรดกโลก'], 'หาหน้าจั่วสามเหลี่ยมเล็กๆ บนหลังคาปราสาทสีขาว', 'Find the little triangle gables on the white castle\'s roofs',
    // a tall brilliant-white castle keep with grey curved roofs on five levels, little triangle and curved gables, on a sloping grey stone base
    P('M30 214l14-46h152l14 46z', '#B0BEC5') + Lc('M40 196h160M48 180h144', '#90A4AE', 2.5)
      + [[44, 152, 152, 18], [58, 120, 124, 34], [72, 92, 96, 28], [84, 66, 72, 26], [96, 44, 48, 22]].map(([x, y, w, h]) => R(x + 6, y, w - 12, h + 4, '#FFFFFF') + P(`M${x - 8} ${y + 4}q${w / 2 + 8} -12 ${w + 16} 0l-8-12h${-w}z`, '#78909C')).join('')
      + [[90, 120], [150, 120], [120, 92]].map(([x, y]) => P(`M${x - 12} ${y}l12-14 12 14z`, '#78909C') + P(`M${x - 8} ${y}l8-9 8 9z`, '#FFFFFF', 2)).join('') + P('M106 66q14-14 28 0z', '#78909C')
      + [[78, 160], [100, 160], [140, 160], [162, 160], [104, 132], [136, 132]].map(([x, y]) => R(x - 3, y - 4, 6, 8, INK, 1, 0)).join('') + [[94, 32], [146, 32]].map(([x, y]) => Lc(`M${x} ${y}c-4-6 0-10 4-10`, '#FFC107', 3)).join('') + face(120, 108, 0.36)),
  L('jp/hiroshima/landmark-weathercock.v1.svg', 'บ้านไก่ตั้งลมย่านคิตาโนะ โกเบ', 'The Weathercock House in Kobe\'s Kitano', ['weathercock house', 'บ้านไก่ตั้งลม', 'kazamidori no yakata', 'คาซามิโดริ', 'kitano ijinkan', 'คิตาโนะอิจินคัง', 'kitano', 'western houses', 'บ้านฝรั่งเก่า', 'red brick house'], 'หาไก่สีทองบนยอดแหลมของบ้าน', 'Find the golden rooster on top of the house\'s spire',
    // a red-brick western house with a slate roof and a tall pointed spire, a golden rooster weathervane on top, white-framed windows, a green hedge in front
    R(38, 116, 164, 92, '#C0503A') + Array.from({ length: 5 }, (_, k) => Lc(`M40 ${132 + k * 16}h160`, '#A8402E', 2)).join('') + P('M30 120l30-34h120l30 34z', '#546E7A')
      + R(50, 86, 40, 122, '#C0503A') + P('M44 90l26-56 26 56z', '#455A64') + Lc('M70 34V20', INK, 3) + Lc('M58 28h24', INK, 2.5) + g(68, 12, 1.2, P('M-8 0c-10-6-8-14-2-14 2 6 6 8 6 10z', '#FFC107', 2) + E(0, 2, 10, 7, '#FFC107', 2) + C(8, -4, 5, '#FFC107', 2) + P('M5-8l2-4 2 3 2-3 1 5z', '#E53935', 1.2) + P('M13-4l5 2-5 1z', '#FB8C00', 1) + Lc('M0 9v4', INK, 2))
      + [[58, 112], [110, 140], [150, 140], [58, 150]].map(([x, y]) => R(x, y, 24, 30, '#B3E5FC', 3, 3) + Lc(`M${x + 12} ${y}v30M${x} ${y + 15}h24`, '#FFFFFF', 2.5)).join('') + R(178, 160, 18, 48, '#6D4C41', 2, 2.5)
      + P('M24 214c0-14 10-18 20-14 6-10 20-10 26 0 8-8 22-6 24 4l124 0c4-10 18-10 22 0v10H24z', '#558B2F') + face(150, 190, 0.32)),
  L('jp/hiroshima/landmark-kintaikyo.v1.svg', 'สะพานไม้ห้าโค้งคินไตเคียว', 'Kintaikyō, the five wooden arches', ['kintaikyo', 'kintaikyō', 'คินไตเคียว', 'kintai bridge', 'สะพานคินไต', 'iwakuni', 'อิวาคุนิ', 'wooden arch bridge', 'สะพานไม้โค้ง', 'nishiki river'], 'นับโค้งของสะพานไม้ให้ครบห้าโค้ง', 'Count the five wooden arches of the bridge',
    // a wooden bridge of five humped arches on grey stone piers across a wide clear river, the three middle arches the highest, a small white castle on the green hill behind
    sky('#E3F2FD') + P('M140 90c20-40 60-50 104-30v40H140z', '#66BB6A') + R(180, 50, 22, 16, '#FFFFFF', 0, 2.5) + P('M176 52l15-10 15 10z', '#546E7A', 2.5)
      + R(-4, 128, 248, 116, '#4FC3F7', 0, 0) + Lc('M20 200h40M100 214h50M180 200h40', '#E1F5FE', 3)
      + [[-4, 44, 12], [44, 92, 30], [92, 148, 34], [148, 196, 30], [196, 244, 12]].map(([a, b, h]) => P(`M${a} 128q${(b - a) / 2} ${-h * 2} ${b - a} 0v8q${-(b - a) / 2} ${-h * 2 + 10} ${-(b - a)} 0z`, '#A1673F') + Array.from({ length: 4 }, (_, j) => Lc(`M${a + (j + 1) * (b - a) / 5} ${128 - h * (1 - Math.pow(2 * (j + 1) / 5 - 1, 2)) * 1}v16`, '#6D4C41', 2)).join('')).join('')
      + [44, 92, 148, 196].map((x) => P(`M${x - 10} 150l4-22h12l4 22z`, '#B0BEC5')).join('') + face(120, 100, 0.3)),
  // ---------- Kanazawa
  L('jp/kanazawa/landmark-tsuzumimon.v1.svg', 'ประตูกลองสึซึมิ สถานีคานาซาวะ', 'The Tsuzumi drum gate at Kanazawa Station', ['tsuzumi gate', 'tsuzumi-mon', 'ประตูสึซึมิ', 'kanazawa station', 'สถานีคานาซาวะ', 'hand drum', 'กลองสึซึมิ', 'motenashi dome', 'โดมแก้ว', 'wooden gate'], 'หาเสาไม้บิดเกลียวที่เป็นรูปกลองมือ', 'Find the twisted wooden pillars shaped like hand drums',
    // two huge twisted wooden pillars shaped like hourglass hand drums holding up a wide wooden beam, a glass dome with a lattice of white bars behind
    P('M-4 150C20 40 220 40 244 150z', '#B3E5FC') + Array.from({ length: 6 }, (_, k) => Lc(`M${10 + k * 44} 150C${30 + k * 30} 80 ${60 + k * 24} 60 ${120} 50`, '#FFFFFF', 2.5)).join('') + Lc('M20 110c60-20 140-20 200 0', '#FFFFFF', 2.5)
      + R(-4, 210, 248, 34, '#CFD8DC', 0, 0) + R(28, 50, 184, 28, '#8D6E63', 4) + Lc('M34 64h172', '#6D4C41', 2.5)
      + [70, 170].map((x) => P(`M${x - 26} 78h52l-18 66 18 66h-52l18-66z`, '#A1673F') + Array.from({ length: 4 }, (_, k) => Lc(`M${x - 22 + k * 12} 80l${18 - k * 6} 128`, '#8D5524', 2.5)).join('')).join('')
      + kid(120, 206, '#EC407A') + face(120, 64, 0.32)),
  L('jp/kanazawa/landmark-nagamachi.v1.svg', 'กำแพงดินหุ้มเสื่อฟางย่านซามูไรนางามาจิ', 'Nagamachi\'s samurai walls wrapped in straw for winter', ['nagamachi', 'นางามาจิ', 'samurai district', 'ย่านซามูไร', 'earthen walls', 'กำแพงดิน', 'komo straw mats', 'เสื่อฟาง', 'samurai house', 'บ้านซามูไร'], 'หาเสื่อฟางที่ห่มกำแพงไว้กันหิมะ', 'Find the straw mats keeping the walls warm in the snow',
    // a long ochre earthen wall with a grey tiled top under snow, its lower half wrapped in golden straw mats tied with rope, a dark wooden gate, a little stream in front, snowflakes falling
    sky('#ECEFF1') + R(-4, 90, 248, 100, '#D7B377', 0, 0) + P('M-4 96h248l-8-18H4z', '#546E7A') + P('M-4 80c40-8 80 4 124-2s84-6 124 2l-4-10H0z', '#FFFFFF')
      + R(94, 100, 52, 90, '#5D4037', 2) + Lc('M120 100v90', '#3E2723', 3) + P('M86 104l34-16 34 16z', '#455A64')
      + [[-4, 98], [146, 98]].map(([x, w]) => R(x, 130, w, 60, '#E6C27A', 0, 3) + Array.from({ length: 9 }, (_, k) => Lc(`M${x + 6 + k * 11} 132v56`, '#C8A060', 2)).join('') + Lc(`M${x} 146h${w}M${x} 172h${w}`, '#6D4C41', 3)).join('')
      + R(-4, 190, 248, 16, '#9E9E9E', 0, 3) + R(-4, 206, 248, 38, '#4FC3F7', 0, 0) + Lc('M20 222h40M140 226h50', '#E1F5FE', 3)
      + [[30, 30], [80, 50], [150, 24], [210, 46], [180, 66]].map(([x, y]) => C(x, y, 4, '#FFFFFF', 1.5)).join('') + face(48, 112, 0.3)),
  L('jp/kanazawa/landmark-yuzen.v1.svg', 'ล้างผ้าไหมย้อมคางะยูเซ็นในลำธาร', 'Rinsing Kaga Yūzen silk in the river', ['kaga yuzen', 'คางะยูเซ็น', 'yuzen silk', 'ผ้าไหมยูเซ็น', 'silk dyeing', 'ย้อมผ้าไหม', 'yuzen nagashi', 'kimono silk', 'ผ้าไหมกิโมโน', 'asano river'], 'หาผ้าไหมลายดอกไม้ยาวๆ ที่ลอยอยู่ในน้ำ', 'Find the long flowery silk cloths floating in the water',
    // long strips of brightly dyed silk with flower patterns floating and rippling in a clear shallow river between stony banks
    sky('#E8F5E9') + P('M-4 40c80 10 160 0 248 10v150c-80-10-160 0-248-10z', '#81D4FA') + Array.from({ length: 10 }, (_, k) => C(10 + (k * 53) % 230, 30 + (k % 2) * 186 + (k % 3) * 4, 8, '#BDBDBD', 2)).join('')
      + [['#E53935', 70], ['#1E88E5', 110], ['#FDD835', 150]].map(([c, y], k) => P(`M-4 ${y - 10}c40-14 80 14 120 0s80-14 128 0v18c-48-14-88 14-128 0s-80-14-120 0z`, c) + Array.from({ length: 4 }, (_, j) => C(20 + j * 56 + k * 10, y + (j % 2 ? 2 : -2), 4, '#FFFFFF', 1.5) + C(20 + j * 56 + k * 10, y + (j % 2 ? 2 : -2), 1.5, k === 2 ? '#E53935' : '#FDD835', 0)).join('')).join('')
      + Lc('M30 186c20-4 40 4 60 0M150 182c20-4 40 4 60 0', '#E1F5FE', 3) + face(120, 112, 0.34)),
  L('jp/kanazawa/landmark-kutani.v1.svg', 'จานกระเบื้องคุทานิห้าสี', 'A five-colour Kutani porcelain plate', ['kutani ware', 'kutani-yaki', 'คุทานิ', 'porcelain plate', 'จานกระเบื้อง', 'five colours', 'ห้าสี', 'ishikawa crafts', 'งานฝีมือ', 'painted bird'], 'หานกตัวเล็กบนจานที่ระบายสีเขียว เหลือง ม่วง', 'Find the little bird on the plate painted green, yellow and purple',
    // a big round plate on a small wooden stand, painted in the bold Kutani colours: a green and yellow ground, a big red peony, a little blue bird on a purple branch
    R(70, 202, 100, 14, '#6D4C41', 4) + Lc('M120 202l-20-24M120 202l20-24', '#6D4C41', 4)
      + C(120, 114, 92, '#FFFFFF') + C(120, 114, 80, '#43A047', 3) + P('M44 140c30-20 70-10 90 10s50 26 66 6c-6 30-40 50-80 50-36 0-66-30-76-66z', '#FDD835', 3)
      + Lc('M60 84c30 10 50 30 60 60', '#7B1FA2', 6) + g(150, 92, 1, Array.from({ length: 6 }, (_, j) => g(0, 0, 1, E(0, -16, 10, 16, '#E53935', 2.5), j * 60)).join('') + C(0, 0, 8, '#FDD835', 2.5))
      + g(82, 92, 1, E(0, 0, 16, 10, '#1E88E5', 2.5) + C(-14, -6, 7, '#1E88E5', 2.5) + P('M-21-6l-7 2 7 2z', '#FB8C00', 1.5) + P('M14-2l14-8-4 12z', '#1E88E5', 2) + C(-15, -7, 1.6, INK, 0))
      + Array.from({ length: 10 }, (_, k) => { const a = k * 36 * Math.PI / 180; return C(120 + 86 * Math.cos(a), 114 + 86 * Math.sin(a), 3, '#1565C0', 0); }).join('') + face(110, 168, 0.38)),
  L('jp/kanazawa/landmark-chirihama.v1.svg', 'ขับรถบนหาดทรายชิริฮามะ', 'Driving along the sand at Chirihama Beach', ['chirihama', 'ชิริฮามะ', 'chirihama nagisa driveway', 'beach driveway', 'ขับรถบนชายหาด', 'drive on the sand', 'ถนนชายหาด', 'hakui', 'ฮาคุอิ', 'sea of japan'], 'หารอยล้อรถที่ลากยาวอยู่บนหาดทราย', 'Find the tyre tracks stretching along the sand',
    // a little red car driving along hard wet sand right beside the waves, two long tyre tracks behind it, the sea of Japan and an orange evening sky
    sky('#FFE0B2') + C(190, 64, 22, '#FF8A65', 0) + R(-4, 92, 248, 50, '#4FC3F7', 0, 0) + P('M-4 140c30-8 50 6 80-2s50-8 80 0 50 8 88-2v14H-4z', '#FFFFFF') + R(-4, 150, 248, 94, '#E0C9A6', 0, 0)
      + Lc('M-4 200C40 196 80 186 120 176', '#C8A882', 5) + Lc('M-4 222C40 216 90 204 130 192', '#C8A882', 5)
      + g(160, 176, 1, P('M-46 10v-18c0-8 6-12 14-12l14-18h44l16 18c10 0 14 6 14 14v16z', '#EF5350') + P('M-14-34l-10 14h24v-14zM6-34v14h22l-12-14z', '#B3E5FC', 2.5) + C(-26, 12, 11, '#37474F') + C(30, 12, 11, '#37474F') + C(-26, 12, 4, '#ECEFF1', 2) + C(30, 12, 4, '#ECEFF1', 2) + face(2, -6, 0.3))
      + Lc('M30 120h30M120 108h40', '#E1F5FE', 3)),
];

export default { places: {}, items };
