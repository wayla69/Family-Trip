// Wave 16: Beppu and Yufuin (Ōita) — the steaming hot-spring town on the bay and the quiet onsen village under the twin peaks:
// the coloured "hells" (the cobalt Sea Hell, the red Blood Pond, the milky White Pond, the Cooking Pot Hell), steam over Kannawa,
// jigoku-mushi steam cooking and its pudding, toriten, dango-jiru, yaseuma, kabosu, Lake Kinrin's morning mist, the green
// Yufuin no Mori train, the lion jungle bus of the African Safari, Takegawara's old bathhouse, the yunohana huts of Myōban, Yunotsubo street and Kijima's wooden roller coaster.
// Skipped as repeats or bans: the bubbling grey mud of Oniishibōzu (Yellowstone's mud pots), the Tatsumaki geyser (Iceland and
// Old Faithful), black eggs and onsen manjū (Hakone), an outdoor bath (Hakone's ryokan, Banff), Takasakiyama's monkeys (the snow
// monkey), Oniyama's crocodiles (Florida's alligator), the Beppu ropeway (cable cars everywhere), Usuki's stone Buddhas (a religious
// image), the oni on the Cooking Pot Hell (left out, the pot only), Beppu reimen (Busan milmyeon), bamboo baskets (many already).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const BP = { k1: '#0277BD', k2: '#D84315', k3: '#E0F7FA' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `jp-beppu.landmark.${slug}`, cat: 'landmark', file: `jp/beppu/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// a plume of steam: puffs growing as they rise (s = size, n = how many puffs)
const plume = (x, y, s = 1, n = 3, c = '#FFFFFF') => Array.from({ length: n }, (_, k) => C(x + (k % 2 ? 5 : -4) * s, y - k * 13 * s, (7 + k * 2.6) * s, c, 3)).join('');
// a little house: cream wall, coloured roof
const hut = (x, y, c, s = 1) => g(x, y, s, R(-7, -5, 14, 10, '#FFF8E1', 0, 2.5) + P('M-9-5l9-7 9 7z', c, 2.5));
// a stone of the pond's edge
const stone = (x, y, rx, ry, c = '#BDBDBD') => E(x, y, rx, ry, c, 3);

const items = [
  { id: 'jp-beppu.stamp', cat: 'stamp', file: 'jp/beppu/stamp.v1.svg', name: nm('ตราประทับเบปปุ', 'Beppu stamp'), kw: ['beppu', 'เบปปุ', 'yufuin', 'ยูฟุอิน', 'oita', 'โออิตะ', 'hot spring town', 'เมืองน้ำพุร้อน', 'steam', 'ไอน้ำ', 'kyushu', 'คิวชู'],
    // a cobalt-blue hot-spring pond with a sleepy smile, three plumes of white steam rising from little roofs on the green hill behind
    svg: cityStamp('jbp-st', { name: 'BEPPU', sub: 'JAPAN', ...BP, emblem: P('M48 112c8-26 30-40 52-40s44 14 52 40z', '#A5D6A7', 0)
      + hut(74, 104, '#E53935', 0.9) + hut(100, 96, '#1E88E5', 0.9) + hut(126, 104, '#FFB300', 0.9)
      + plume(74, 90, 0.7) + plume(100, 82, 0.75) + plume(126, 90, 0.7)
      + E(100, 130, 44, 16, '#29B6F6') + E(100, 127, 32, 9, '#81D4FA', 0) + face(100, 128, 0.3) }) },
  { id: 'jp-beppu.day.steamtown', cat: 'day', file: 'jp/beppu/day-steamtown.v1.svg', name: nm('ไอน้ำพวยพุ่งเหนือหลังคาบ้านคันนาวะ', 'Steam rising over the roofs of Kannawa'), kw: ['beppu', 'เบปปุ', 'kannawa', 'คันนาวะ', 'yukemuri', 'ยุเคมุริ', 'steam over the town', 'ไอน้ำเหนือเมือง', 'hot spring town', 'เมืองน้ำพุร้อน', 'beppu bay', 'อ่าวเบปปุ', 'mount tsurumi', 'ภูเขาซึรูมิ'],
    // a hillside town of little colourful roofs with many tall white plumes of steam rising between them, green Mount Tsurumi behind, the blue bay below
    svg: scene('jbp-d1', '#FFE0B2', C(52, 52, 16, '#FFF59D', 0) + P('M-4 120c40-50 90-76 130-70 40 6 80 34 124 66v60H-4z', '#81C784') + P('M110 64c20-6 40 2 52 16', 'none', 3)
      + P('M-4 132c60-18 140-22 248-4v120H-4z', '#C5E1A5') + P('M-4 196c80-10 170-8 248 4v50H-4z', '#4FC3F7')
      + [[20, 150, '#E53935'], [46, 144, '#1E88E5'], [72, 152, '#FFB300'], [100, 142, '#8E24AA'], [128, 150, '#E53935'], [156, 144, '#1E88E5'], [182, 152, '#FFB300'], [210, 146, '#43A047'],
        [34, 172, '#FFB300'], [62, 176, '#E53935'], [92, 170, '#43A047'], [122, 178, '#1E88E5'], [150, 172, '#8E24AA'], [178, 178, '#E53935'], [206, 172, '#1E88E5']].map(([x, y, c]) => hut(x, y, c, 1.15)).join('')
      + plume(34, 136, 0.7, 4) + plume(88, 130, 0.8, 4) + plume(142, 134, 0.7, 4) + plume(198, 132, 0.75, 4) + plume(62, 162, 0.55, 3) + plume(168, 162, 0.55, 3)
      + face(86, 84, 0.3, 'none') + Lc('M40 214c10-5 20 5 30 0M150 212c10-5 20 5 30 0', '#E1F5FE', 4)) },
  { id: 'jp-beppu.day.yufudake', cat: 'day', file: 'jp/beppu/day-yufudake.v1.svg', name: nm('ภูเขายูฟุสองยอดเหนือทุ่งนายูฟุอิน', 'Mount Yufu’s twin peaks over the fields of Yufuin'), kw: ['yufuin', 'ยูฟุอิน', 'yufudake', 'ยูฟุดาเกะ', 'mount yufu', 'ภูเขายูฟุ', 'twin peaks', 'ภูเขาสองยอด', 'rice fields', 'ทุ่งนา', 'onsen village', 'หมู่บ้านน้ำพุร้อน', 'morning mist', 'หมอกยามเช้า'],
    // a big green-brown mountain with two pointed peaks side by side, a white band of morning mist at its foot, striped rice fields, farmhouses with dark roofs
    svg: scene('jbp-d2', '#E1F5FE', C(190, 54, 14, '#FFF59D', 0) + P('M-4 150L70 82l18 12 14-30 16 18 18-6 L244 150v40H-4z', '#8D9F6B') + P('M70 82l18 12 14-30 16 18', 'none', 3)
      + P('M88 94l14-30 16 18 18-6-10 30-14-8-12 12z', '#A5B57F', 0) + face(102, 112, 0.42)
      + E(40, 150, 46, 10, '#FFFFFF', 0) + E(120, 154, 60, 10, '#FFFFFF', 0) + E(206, 150, 44, 10, '#FFFFFF', 0)
      + P('M-4 158h248v90H-4z', '#C5E1A5') + Lc('M-4 178h248M-4 198h248M-4 218h248', '#9CCC65', 3) + Lc('M60 158l-20 90M140 158l10 90', '#9CCC65', 3)
      + [[40, 170], [176, 170], [204, 186]].map(([x, y]) => g(x, y, 1.3, R(-8, -5, 16, 10, '#FFF8E1', 0, 2.5) + P('M-11-5l11-8 11 8z', '#5D4037', 2.5))).join('')
      + Lc('M100 236c8-60 30-70 40-80', '#D7CCC8', 6)) },

  L('umijigoku', 'อุมิจิโกกุ บ่อน้ำร้อนสีฟ้าคราม', 'Umi Jigoku, the cobalt-blue Sea Hell', ['umi jigoku', 'อุมิจิโกกุ', 'sea hell', 'บ่อนรกทะเล', 'blue hot spring', 'บ่อน้ำร้อนสีฟ้า', 'beppu hells', 'บ่อนรกเบปปุ', 'jigoku meguri', 'ทัวร์บ่อนรก', 'giant lotus leaves', 'ใบบัวยักษ์'], 'หาใบบัวยักษ์ที่ลอยอยู่ข้างบ่อ', 'Find the giant round lily pads beside the pond',
    // a round pond of bright cobalt-blue water ringed by grey stones, thick white steam billowing up, a little pond of giant round lily pads with turned-up rims beside it
    bg('#E8F5E9') + low(150, '#A5D6A7') + frame + plume(96, 122, 1.2, 4) + plume(140, 116, 1.1, 4)
      + E(112, 158, 74, 30, '#1565C0') + E(112, 156, 60, 21, '#29B6F6', 0) + E(98, 152, 22, 6, '#81D4FA', 0)
      + [[44, 158, 10, 7], [56, 178, 12, 8], [84, 188, 12, 7], [120, 190, 14, 7], [154, 184, 12, 8], [178, 166, 10, 7], [170, 136, 10, 6], [56, 136, 10, 6]].map(([x, y, rx, ry]) => stone(x, y, rx, ry)).join('')
      + E(196, 196, 26, 12, '#4FC3F7', 0) + E(186, 194, 14, 6, '#66BB6A', 3) + E(206, 202, 12, 5, '#81C784', 3) + Lc('M174 194a12 6 0 0 0 24 0', '#C62828', 2.5)
      + face(112, 160, 0.46)),
  L('chinoike', 'ชิโนะอิเกะจิโกกุ บ่อน้ำร้อนสีแดง', 'Chinoike Jigoku, the red Blood Pond Hell', ['chinoike jigoku', 'ชิโนะอิเกะจิโกกุ', 'blood pond hell', 'บ่อนรกสระเลือด', 'red hot spring', 'บ่อน้ำร้อนสีแดง', 'red mud', 'โคลนแดง', 'beppu hells', 'บ่อนรกเบปปุ', 'oldest natural hell', 'บ่อนรกธรรมชาติ'], 'หาไอน้ำสีชมพูเหนือบ่อแดง', 'Find the pink steam over the red pond',
    // a wide pond of rusty red water steaming pink in a rocky dip, a wooden fence and lookout deck along the front, a little pine on the rocks
    bg('#FFF3E0') + low(120, '#BCAAA4') + frame + plume(84, 108, 1.15, 4, '#FCE4EC') + plume(150, 104, 1.2, 4, '#FCE4EC')
      + P('M34 140c16-14 50-20 86-20s70 6 86 20c-8 26-46 40-86 40s-78-14-86-40z', '#C62828') + P('M54 140c14-8 40-12 66-12s52 4 66 12c-10 14-36 22-66 22s-56-8-66-22z', '#E53935', 0)
      + E(100, 138, 18, 5, '#EF9A9A', 0) + face(120, 146, 0.44)
      + R(26, 190, 188, 10, '#A1887F', 3) + Lc('M40 186v26M76 186v26M112 186v26M148 186v26M184 186v26', '#6D4C41', 6) + R(26, 176, 188, 8, '#8D6E63', 3)
      + Lc('M198 116c4-14 2-26 6-36', '#6D4C41', 5) + C(200, 82, 10, '#43A047', 3) + C(190, 92, 8, '#388E3C', 3) + C(210, 94, 8, '#388E3C', 3)),
  L('shiraike', 'ชิไรเกะจิโกกุ บ่อน้ำร้อนสีขาวขุ่น', 'Shiraike Jigoku, the milky White Pond Hell', ['shiraike jigoku', 'ชิไรเกะจิโกกุ', 'white pond hell', 'บ่อนรกสระขาว', 'milky blue hot spring', 'บ่อน้ำร้อนสีขาวขุ่น', 'japanese garden', 'สวนญี่ปุ่น', 'fish tanks', 'ตู้ปลา', 'beppu hells', 'บ่อนรกเบปปุ'], 'หาปลาตัวเล็กในตู้กระจกข้างบ่อ', 'Find the little fish in the glass tank by the pond',
    // a calm milky pale-blue pond in a tidy garden with clipped round shrubs and a bent pine, gentle steam, and a round glass tank on the side with a smiling orange fish
    bg('#E3F2FD') + low(132, '#AED581') + frame + plume(110, 122, 1, 4, '#FAFAFA')
      + E(108, 160, 70, 26, '#B3E5FC') + E(108, 158, 54, 17, '#E1F5FE', 0) + face(108, 160, 0.4)
      + C(36, 136, 13, '#66BB6A', 3) + C(58, 128, 10, '#81C784', 3) + C(180, 126, 11, '#66BB6A', 3)
      + Lc('M48 120c10-14 26-20 44-18', '#6D4C41', 6) + E(80, 96, 22, 8, '#388E3C', 3) + E(50, 106, 16, 7, '#43A047', 3)
      + R(160, 154, 50, 44, '#E1F5FE', 8) + R(160, 154, 50, 10, '#B0BEC5', 4) + Lc('M168 192c8-6 14 0 22-4', '#81C784', 3)
      + P('M174 178c6-10 18-10 24 0-6 10-18 10-24 0zM198 178l8-6v12z', '#FF8A65', 3) + C(182, 176, 2, INK, 0)
      + [[40, 186, 9, 6], [70, 190, 11, 6], [150, 190, 10, 6]].map(([x, y, rx, ry]) => stone(x, y, rx, ry)).join('')),
  L('kamado', 'คามาโดะจิโกกุ หม้อต้มยักษ์พ่นไอน้ำ', 'Kamado Jigoku, the Cooking Pot Hell', ['kamado jigoku', 'คามาโดะจิโกกุ', 'cooking pot hell', 'บ่อนรกหม้อหุงข้าว', 'giant pot', 'หม้อยักษ์', 'steam', 'ไอน้ำ', 'stone stove', 'เตาหิน', 'beppu hells', 'บ่อนรกเบปปุ'], 'หาฝาหม้อที่ไอน้ำดันจนเปิดขึ้น', 'Find the lid lifted up by the steam',
    // a giant black cooking pot with a wide rim sitting on an old stone stove with a glowing orange fire hole, its wooden lid tipped up and steam pouring out
    bg('#FFF8E1') + low(198, '#D7CCC8') + frame + plume(108, 100, 1.1, 4) + plume(150, 80, 0.95, 3)
      + R(52, 150, 136, 48, '#BDBDBD') + Lc('M52 166h136M52 182h136M86 150v16M130 150v16M160 150v16M72 166v16M108 166v16M150 166v16M180 166v16', '#9E9E9E', 2.5)
      + P('M96 198v-18q24-20 48 0v18z', '#FF7043') + P('M106 198v-10q14-10 28 0v10z', '#FFCA28', 0)
      + P('M58 116h124c0 26-24 40-62 40s-62-14-62-40z', '#455A64') + R(48, 106, 144, 14, '#546E7A', 7) + Lc('M70 136c16 8 40 10 60 6', '#78909C', 3)
      + g(150, 92, 1, E(0, 0, 40, 9, '#A1887F') + R(-6, -14, 12, 8, '#8D6E63', 3), -18) + face(120, 132, 0.4)),
  L('jigokumushi', 'จิโกกุมุชิ นึ่งอาหารด้วยไอน้ำร้อนจากใต้ดิน', 'Jigoku-mushi, cooking in the hot-spring steam', ['jigoku mushi', 'จิโกกุมุชิ', 'steam cooking', 'นึ่งด้วยไอน้ำร้อน', 'hell steamed', 'นึ่งไอน้ำนรก', 'steamed corn', 'ข้าวโพดนึ่ง', 'sweet potato', 'มันหวาน', 'steamed egg', 'ไข่นึ่ง', 'kannawa', 'คันนาวะ'], 'หาข้าวโพดสีเหลืองในตะกร้านึ่ง', 'Find the yellow corn cob in the steaming basket',
    // a square stone steam box with its wooden lid set aside, a bamboo steaming basket lifted out holding a corn cob, a purple sweet potato, an egg and a pink prawn, steam curling up
    plume(70, 80, 1.1, 4) + plume(170, 76, 1, 4) + R(40, 150, 160, 52, '#BDBDBD', 6) + Lc('M40 170h160M80 150v20M120 150v20M160 150v20M60 170v32M100 170v32M140 170v32M180 170v32', '#9E9E9E', 2.5)
      + E(120, 150, 80, 12, '#9E9E9E') + E(120, 150, 70, 7, '#E0E0E0', 0)
      + E(120, 124, 74, 22, '#E8C88E') + Lc('M54 124c22 10 110 10 132 0M60 134c20 8 100 8 120 0', '#C99A50', 3)
      + g(86, 112, 1, E(0, 0, 26, 10, '#FFD54F') + Lc('M-16-4v8M-8-5v10M0-5v10M8-5v10M16-4v8', '#FFB300', 2.5) + P('M22-4c10-4 16 0 20 6-8 0-14-2-20-6z', '#AED581', 2.5), -10)
      + E(146, 116, 22, 11, '#8E24AA') + E(140, 112, 6, 3, '#CE93D8', 0) + E(118, 108, 11, 13, '#FFFFFF') + ol('M164 104a10 10 0 1 1 10 10', '#FF8A65', 6)
      + face(118, 110, 0.26)),
  L('purin', 'พุดดิ้งนึ่งไอน้ำร้อนของเบปปุ', 'Beppu’s hot-spring steamed custard pudding', ['jigoku mushi purin', 'พุดดิ้งจิโกกุมุชิ', 'steamed pudding', 'พุดดิ้งนึ่ง', 'custard pudding', 'คัสตาร์ดพุดดิ้ง', 'purin', 'ปุริน', 'caramel', 'คาราเมล', 'beppu sweets', 'ขนมเบปปุ'], 'หาคาราเมลสีน้ำตาลที่ไหลลงข้างพุดดิ้ง', 'Find the brown caramel running down the pudding',
    // a wobbly yellow custard pudding on a little blue plate with dark brown caramel on top dripping down its sides, a dab of cream and a cherry, a small wooden spoon beside it
    E(116, 192, 86, 16, '#90CAF9') + E(116, 190, 72, 10, '#BBDEFB', 0)
      + P('M66 186l14-92h72l14 92z', '#FFE082') + Lc('M74 176c20 6 64 6 84 0', '#FFCA28', 3)
      + P('M78 104l2-10h72l2 10c-6 0-6 14-12 14s-4-14-12-14-6 22-14 22-4-22-12-22-6 12-12 12-6-12-14-12z', '#6D4C41') + E(116, 94, 36, 7, '#8D6E63', 3)
      + P('M100 92c0-12 10-18 16-14 6-8 20-4 18 8z', '#FFFFFF') + C(124, 72, 8, '#E53935') + Lc('M124 64c2-8 6-12 12-14', '#6D4C41', 3)
      + ol('M186 200l20-60', '#C8A165', 5) + E(208, 134, 7, 10, '#C8A165', 3) + face(116, 148, 0.48)),
  L('toriten', 'โทริเท็น เทมปุระไก่ของโออิตะ', 'Toriten, Ōita’s chicken tempura', ['toriten', 'โทริเท็น', 'chicken tempura', 'เทมปุระไก่', 'oita soul food', 'อาหารขึ้นชื่อโออิตะ', 'ponzu', 'พอนซึ', 'karashi mustard', 'มัสตาร์ดคาราชิ', 'kabosu', 'คาโบสุ'], 'หาถ้วยซอสพอนซึกับมัสตาร์ดสีเหลือง', 'Find the little bowl of ponzu with yellow mustard',
    // a white plate piled with fluffy pale-golden chicken tempura pieces, shredded cabbage and half a green kabosu, a small bowl of brown ponzu with a dab of yellow mustard
    E(108, 154, 92, 46, '#FFFFFF') + E(108, 154, 78, 36, '#F5F5F5', 3)
      + Lc('M52 160c10-8 18 4 26-4s16 6 24-2M58 172c10-6 18 4 26-2', '#C5E1A5', 3)
      + [[84, 140, 26, 16, -12], [120, 132, 28, 17, 8], [150, 150, 24, 15, 20], [110, 160, 26, 15, -4]].map(([x, y, rx, ry, a]) => g(x, y, 1, E(0, 0, rx, ry, '#FFE0A0') + P(`M${-rx + 6} -4q6-8 12 0t12 0`, 'none', 2.5) + C(-8, 6, 2.5, '#F0C060', 0) + C(8, 2, 2.5, '#F0C060', 0), a)).join('')
      + g(64, 162, 1, P('M-18 0a18 18 0 0 1 36 0z', '#66BB6A') + P('M-13 0a13 13 0 0 1 26 0z', '#F0F4C3', 0) + Lc('M0 0v-12M0 0l-9-8M0 0l9-8', '#C0CA33', 2), -8)
      + E(194, 96, 26, 10, '#FFFFFF') + P('M168 96h52c0 18-12 28-26 28s-26-10-26-28z', '#FFFFFF') + E(194, 98, 20, 6, '#8D6E63', 0) + C(206, 96, 5, '#FDD835', 2)
      + face(120, 132, 0.34)),
  L('dangojiru', 'ดังโกะจิรุ ซุปมิโสะเส้นแบนยาวของโออิตะ', 'Dango-jiru, Ōita’s miso soup with long flat noodles', ['dango jiru', 'ดังโกะจิรุ', 'dangojiru', 'flat noodle soup', 'ซุปเส้นแบน', 'miso soup', 'ซุปมิโสะ', 'hand-pulled noodles', 'เส้นดึงมือ', 'taro', 'เผือก', 'oita home cooking', 'อาหารบ้านโออิตะ'], 'หาเส้นแบนยาวที่ตะเกียบดึงขึ้นมา', 'Find the long flat noodle lifted by the chopsticks',
    // a big dark lacquer bowl of light brown miso soup with taro, carrot, shiitake and green onion, chopsticks lifting one very long wide flat noodle high above it
    P('M34 132h172c0 46-38 74-86 74s-86-28-86-74z', '#5D4037') + Lc('M50 160c40 14 100 14 140 0', '#8D6E63', 3) + E(120, 132, 86, 18, '#D7A86E')
      + C(80, 128, 11, '#ECEFF1', 3) + C(160, 130, 10, '#ECEFF1', 3) + P('M100 136l14-10 14 10-14 6z', '#FF8A65', 2.5) + g(144, 124, 1, P('M-10 0a10 7 0 0 1 20 0z', '#6D4C41', 2.5) + R(-3, 0, 6, 6, '#D7CCC8', 0, 2))
      + [[96, 124], [176, 136], [64, 138]].map(([x, y]) => C(x, y, 3.5, '#7CB342', 2)).join('')
      + P('M104 128c-6-30 4-60-2-96h16c6 36-4 66 2 96z', '#FFF8E1') + Lc('M106 64h12M104 92h14', '#EFE6D0', 2)
      + ol('M90 36l70-14', '#C8A165', 5) + ol('M92 46l70-10', '#C8A165', 5) + face(120, 168, 0.38)),
  L('yaseuma', 'ยาเซอุมะ เส้นแบนคลุกผงถั่วเหลืองหวาน', 'Yaseuma, flat noodles under sweet soybean flour', ['yaseuma', 'ยาเซอุมะ', 'kinako', 'คินาโกะ', 'soybean flour', 'ผงถั่วเหลือง', 'sweet noodles', 'เส้นหวาน', 'flat noodles', 'เส้นแบน', 'oita dessert', 'ขนมโออิตะ'], 'หาถ้วยผงคินาโกะสีเหลืองข้างจาน', 'Find the little bowl of yellow kinako by the plate',
    // a long pale-green plate with wide white flat noodles laid in soft waves, heaped with golden-brown kinako soybean flour and sugar, a little bowl of kinako with a spoon
    E(110, 160, 92, 36, '#C8E6C9') + E(110, 158, 80, 28, '#E8F5E9', 3)
      + [-26, -8, 10, 28].map((dy, k) => Lc(`M44 ${150 + dy / 2}c16-12 30 12 46 0s30 12 46 0 30 12 44 0`, INK, 15) + Lc(`M44 ${150 + dy / 2}c16-12 30 12 46 0s30 12 46 0 30 12 44 0`, k % 2 ? '#FFFDF5' : '#FFFFFF', 11)).join('')
      + P('M74 150c8-12 22-16 36-16s28 4 36 16c-22 6-50 6-72 0z', '#E6B866') + [-26, 10].map((dy) => Lc(`M50 ${150 + dy / 2}c16-12 30 12 46 0s30 12 46 0 30 12 40 0`, '#E6B866', 4)).join('') + [[86, 144], [100, 140], [118, 138], [132, 142], [110, 146], [60, 138], [160, 154]].map(([x, y]) => C(x, y, 2, '#FFFFFF', 0)).join('')
      + P('M172 92h44c0 16-10 26-22 26s-22-10-22-26z', '#FFFFFF') + E(194, 92, 22, 7, '#E6B866') + ol('M194 90l10-34', '#C8A165', 4)
      + face(110, 168, 0.38)),
  L('kabosu', 'ส้มคาโบสุสีเขียวของโออิตะ', 'Kabosu, Ōita’s green citrus', ['kabosu', 'คาโบสุ', 'green citrus', 'ส้มสีเขียว', 'sour citrus', 'ส้มรสเปรี้ยว', 'citrus juice', 'น้ำส้มคั้น', 'oita fruit', 'ผลไม้โออิตะ', 'autumn fruit', 'ผลไม้ฤดูใบไม้ร่วง'], 'หาลูกที่ผ่าครึ่งแล้วเห็นเนื้อสีเหลือง', 'Find the cut one showing its pale yellow inside',
    // a branch with glossy leaves holding two big round dark-green kabosu with dimpled peel, the middle one smiling, one cut in half in front showing its pale yellow segments, a drop of juice
    Lc('M30 50c40 6 70 20 90 46', '#6D4C41', 6) + P('M40 52c8-22 34-36 62-34-10 22-36 34-62 34z', '#2E7D32') + P('M100 74c26-18 62-18 90-4-26 16-62 16-90 4z', '#388E3C') + Lc('M46 50c20-12 36-20 52-26M104 74h80', '#81C784', 2)
      + C(92, 118, 30, '#43A047') + C(146, 112, 26, '#388E3C') + [[80, 108], [96, 132], [108, 112], [138, 100], [154, 124], [160, 106]].map(([x, y]) => C(x, y, 1.8, '#2E7D32', 0)).join('')
      + E(124, 92, 4, 8, '#558B2F', 2.5) + C(118, 186, 34, '#66BB6A') + C(118, 186, 28, '#F0F4C3', 0)
      + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => Lc(`M118 186l${(Math.cos(a * Math.PI / 180) * 26).toFixed(1)} ${(Math.sin(a * Math.PI / 180) * 26).toFixed(1)}`, '#C0CA33', 2)).join('') + C(118, 186, 4, '#FFFDE7', 2)
      + P('M184 170c6 10 8 16 0 20-8-4-6-10 0-20z', '#B3E5FC', 3) + face(92, 120, 0.4)),
  L('kinrinko', 'ทะเลสาบคินรินโกะในหมอกยามเช้า', 'Lake Kinrin in the morning mist', ['lake kinrin', 'ทะเลสาบคินริน', 'kinrinko', 'คินรินโกะ', 'morning mist', 'หมอกยามเช้า', 'warm lake', 'ทะเลสาบน้ำอุ่น', 'autumn leaves', 'ใบไม้เปลี่ยนสี', 'yufuin', 'ยูฟุอิน', 'ducks', 'เป็ด'], 'หาเป็ดสองตัวที่ว่ายอยู่ในหมอก', 'Find the two ducks swimming in the mist',
    // a small lake with white mist rising off the warm water in soft bands, red and orange autumn trees on the far shore and their reflections, a little thatched teahouse, two ducks
    bg('#FFF3E0') + P('M16 124h208v34H16z', '#81C784', 0) + low(140, '#4FC3F7') + frame
      + C(46, 112, 18, '#EF5350', 3) + C(78, 104, 20, '#FF8A65', 3) + C(168, 106, 18, '#FFB74D', 3) + C(200, 116, 16, '#EF5350', 3) + Lc('M46 128v12M78 124v16M168 124v16M200 132v8', '#6D4C41', 4)
      + E(46, 156, 16, 7, '#EF9A9A', 0) + E(78, 158, 18, 7, '#FFCCBC', 0) + E(168, 158, 16, 7, '#FFE0B2', 0)
      + R(108, 116, 34, 22, '#FFF8E1', 0, 3) + P('M100 118l25-22 25 22z', '#BCAAA4') + R(120, 124, 10, 14, '#8D6E63', 0, 2.5)
      + Lc('M24 150c30-10 60 8 90 0s60-10 90 0', '#FFFFFF', 9) + Lc('M30 172c30-10 60 8 90 0s60-10 90 0', '#FFFFFF', 7) + Lc('M40 198c30-8 60 6 90 0s50-8 70 0', '#FFFFFF', 6)
      + g(78, 186, 1, E(0, 0, 14, 8, '#FFFFFF') + C(10, -8, 6, '#43A047', 2.5) + P('M16-8l6 2-6 2z', '#FFB300', 2)) + g(150, 190, 0.85, E(0, 0, 14, 8, '#A1887F') + C(10, -8, 6, '#8D6E63', 2.5) + P('M16-8l6 2-6 2z', '#FFB300', 2))
      + face(122, 168, 0.34, 'none')),
  L('yufuinnomori', 'รถไฟยูฟุอินโนะโมริสีเขียว', 'The green Yufuin no Mori train', ['yufuin no mori', 'ยูฟุอินโนะโมริ', 'forest of yufuin train', 'รถไฟป่ายูฟุอิน', 'green retro train', 'รถไฟย้อนยุคสีเขียว', 'limited express', 'รถไฟด่วนพิเศษ', 'hakata to yufuin', 'ฮากาตะไปยูฟุอิน', 'high-deck train', 'รถไฟชั้นสูง'], 'หาเส้นสีทองที่คาดข้างรถไฟ', 'Find the gold stripe along the side of the train',
    // a retro deep-green train with a rounded cream-framed front window up high and a gold stripe, two carriages with big windows, running along a little bridge between green trees
    bg('#E3F2FD') + low(186, '#A5D6A7') + frame + C(36, 120, 18, '#66BB6A', 3) + C(206, 112, 20, '#81C784', 3) + C(190, 132, 14, '#66BB6A', 3)
      + R(16, 180, 208, 8, '#8D6E63', 0, 3) + Lc('M40 188v22M100 188v22M160 188v22M210 188v22', '#6D4C41', 5)
      + P('M110 176V112h86c16 0 24 18 24 40v24z', '#2E7D32') + P('M30 176V112h76v64z', '#2E7D32')
      + P('M184 118h12c10 0 16 10 18 24h-30z', '#FFF8E1') + P('M188 122h8c6 0 10 6 11 16h-19z', '#90CAF9', 2.5)
      + [40, 62, 84].map((x) => R(x, 122, 16, 20, '#90CAF9', 3, 3)).join('') + [120, 142, 164].map((x) => R(x, 122, 14, 20, '#90CAF9', 3, 3)).join('')
      + Lc('M30 152h190', '#FFCA28', 5) + R(106, 112, 4, 64, '#1B5E20', 0, 0) + C(60, 178, 7, '#455A64', 3) + C(90, 178, 7, '#455A64', 3) + C(140, 178, 7, '#455A64', 3) + C(190, 178, 7, '#455A64', 3)
      + C(212, 164, 4, '#FFF59D', 2) + face(200, 160, 0.3)),
  L('safaribus', 'รถบัสจังเกิลหน้าสิงโตในแอฟริกันซาฟารี', 'The lion jungle bus at the African Safari', ['african safari', 'แอฟริกันซาฟารี', 'kyushu natural animal park', 'สวนสัตว์ธรรมชาติคิวชู', 'jungle bus', 'รถบัสจังเกิล', 'lion bus', 'รถบัสสิงโต', 'feeding animals', 'ให้อาหารสัตว์', 'safari park', 'สวนซาฟารี'], 'หายีราฟที่ชะโงกหน้ามาดูรถบัส', 'Find the giraffe peeking at the bus',
    // a chunky yellow bus whose front is a big friendly lion face with a shaggy orange mane, mesh-covered windows, a tall giraffe leaning its long neck down to the roof
    bg('#FFF8E1') + low(176, '#DCE775') + frame
      + Lc('M204 176V98c0-24-10-40-26-50', INK, 14) + Lc('M204 176V98c0-24-10-40-26-50', '#FFD54F', 9) + [[202, 150], [206, 120], [194, 76]].map(([x, y]) => C(x, y, 3.5, '#A1887F', 0)).join('')
      + g(170, 46, 1, E(0, 0, 16, 10, '#FFD54F') + Lc('M-4-10l-2-8M6-10l2-8', '#A1887F', 3) + C(-8, -2, 2.5, INK, 0) + E(-15, 4, 3, 2, '#A1887F', 0), -20)
      + R(48, 98, 140, 70, '#FFCA28', 16) + R(48, 98, 140, 70, 'none', 16)
      + [72, 104, 136].map((x) => R(x, 110, 26, 26, '#E3F2FD', 4, 3) + Lc(`M${x + 6} 110v26M${x + 13} 110v26M${x + 20} 110v26M${x} 117h26M${x} 124h26M${x} 131h26`, '#90A4AE', 1.5)).join('')
      + C(76, 172, 11, '#455A64', 4) + C(158, 172, 11, '#455A64', 4)
      + [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => C(62 + 26 * Math.cos(a * Math.PI / 180), 128 + 26 * Math.sin(a * Math.PI / 180), 10, '#FB8C00', 3)).join('')
      + C(62, 128, 22, '#FFB74D') + E(62, 138, 9, 6, '#FFE0B2', 2.5) + P('M58 134h8l-4 4z', INK, 0) + face(62, 126, 0.4, 'w')),
  L('takegawara', 'โรงอาบน้ำทาเคงาวาระ อาคารไม้เก่าแก่', 'Takegawara, the old wooden bathhouse', ['takegawara onsen', 'ทาเคงาวาระออนเซ็น', 'takegawara', 'ทาเคงาวาระ', 'old bathhouse', 'โรงอาบน้ำเก่า', 'wooden building', 'อาคารไม้', 'curved gable roof', 'หลังคาจั่วโค้ง', 'sand bath', 'อาบทราย'], 'หาหลังคาโค้งเป็นคลื่นเหนือประตู', 'Find the wavy curved roof over the entrance',
    // an old dark wooden bathhouse with a wide grey tiled roof, a big wavy cusped gable over the entrance, a dark blue curtain in the doorway, lattice windows, a wisp of steam from the roof
    bg('#E8EAF6') + low(194, '#D7CCC8') + frame + plume(66, 64, 0.8, 3) + plume(176, 60, 0.8, 3)
      + R(36, 112, 168, 82, '#A1887F') + Lc('M36 130h168', '#8D6E63', 3) + P('M24 116l22-34h148l22 34z', '#78909C') + Lc('M38 98h164', '#90A4AE', 3)
      + [44, 70, 158, 184].map((x) => R(x, 140, 16, 26, '#FFE0B2', 0, 3) + Lc(`M${x + 8} 140v26M${x} 153h16`, '#8D6E63', 2)).join('')
      + R(92, 132, 56, 62, '#6D4C41') + P('M80 136c10 0 14-10 20-24 6-12 14-16 20-16s14 4 20 16c6 14 10 24 20 24z', '#607D8B') + Lc('M96 128c6-10 10-18 24-20 14 2 18 10 24 20', '#90A4AE', 3)
      + R(98, 150, 44, 26, '#1A3A6E', 0, 3) + Lc('M112 150v26M128 150v26', '#3F6AA8', 2) + C(120, 162, 4, '#FFFFFF', 0)
      + R(86, 190, 68, 6, '#BCAAA4', 0, 3) + face(120, 112, 0.24, 'none')),
  L('yunohana', 'กระท่อมฟางทำยุโนะฮานะที่เมียวบัง', 'The yunohana huts of Myōban', ['yunohana', 'ยุโนะฮานะ', 'myoban', 'เมียวบัง', 'yunohana huts', 'กระท่อมยุโนะฮานะ', 'bath salts', 'เกลือแช่น้ำร้อน', 'thatched huts', 'กระท่อมมุงฟาง', 'hot spring flowers', 'ดอกไม้น้ำพุร้อน'], 'หาโหลผงยุโนะฮานะสีเหลืองอ่อน', 'Find the jar of pale yellow hot-spring flowers',
    // a row of triangle huts thatched with straw down to the ground on a hillside, thin steam seeping from their tops, and a little glass jar of pale yellow yunohana crystals in front
    bg('#E1F5FE') + P('M16 110c60-30 140-30 208-6v120H16z', '#C5E1A5', 0) + low(190, '#BCAAA4') + frame
      + [[60, 150, 1], [114, 138, 1.15], [172, 150, 1]].map(([x, y, s]) => g(x, y, s, P('M-32 30L0-28l32 58z', '#E8C88E') + Lc('M-22 12l22-10 22 10M-14-4l14-8 14 8', '#C99A50', 2.5) + P('M-8 30v-14h16v14z', '#6D4C41', 2.5)) + Lc(`M${x} ${y - 30 * s}c-4-8 4-12 0-20`, '#FFFFFF', 4)).join('')
      + R(148, 176, 40, 38, '#E1F5FE', 6) + R(146, 170, 44, 9, '#90A4AE', 3) + P('M152 192c8-4 26-4 32 0v16h-32z', '#FFF59D', 2.5) + [[160, 198], [170, 194], [178, 202]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('')
      + face(168, 190, 0.24) + face(114, 150, 0.28, 'none')),
  L('yunotsubo', 'ถนนยุโนะสึโบะไปทางภูเขายูฟุ', 'Yunotsubo street, looking up to Mount Yufu', ['yunotsubo kaido', 'ถนนยุโนะสึโบะ', 'yunotsubo', 'ยุโนะสึโบะ', 'yufuin shopping street', 'ถนนช็อปปิ้งยูฟุอิน', 'little shops', 'ร้านเล็กๆ', 'snack stalls', 'ร้านขนม', 'mount yufu', 'ภูเขายูฟุ'], 'หาภูเขาสองยอดที่ปลายถนน', 'Find the twin-peaked mountain at the end of the street',
    // a gentle lane of little shops with white walls, dark wooden fronts and cloth shop curtains on both sides, flower pots, the twin peaks of Mount Yufu at the far end of the street
    bg('#FFF8E1') + P('M60 120l30-40 12 8 12-20 14 14 12-4 30 42z', '#8D9F6B') + face(110, 104, 0.24, 'none') + low(132, '#E0E0E0') + frame
      + P('M90 224l22-92h16l22 92z', '#D7CCC8') + Lc('M100 200h40M106 176h28M110 156h20', '#BCAAA4', 2.5)
      + P('M16 120l74 12v92H16z', '#FFFFFF') + P('M16 112l80 16-6 6-74-10z', '#455A64') + R(26, 150, 26, 50, '#8D6E63', 0, 3) + R(58, 156, 22, 46, '#8D6E63', 0, 3) + R(26, 150, 26, 14, '#E57373', 0, 2.5) + R(58, 156, 22, 13, '#4FC3F7', 0, 2.5)
      + P('M224 120l-74 12v92h74z', '#FFFFFF') + P('M224 112l-80 16 6 6 74-10z', '#455A64') + R(188, 150, 26, 50, '#8D6E63', 0, 3) + R(160, 156, 22, 46, '#8D6E63', 0, 3) + R(188, 150, 26, 14, '#FFB74D', 0, 2.5) + R(160, 156, 22, 13, '#81C784', 0, 2.5)
      + [[86, 212, '#F48FB1'], [154, 212, '#FFD54F']].map(([x, y, c]) => R(x - 7, y, 14, 12, '#A1887F', 2, 2.5) + C(x, y - 4, 7, c, 2.5)).join('')),
  L('kijimacoaster', 'รถไฟเหาะไม้บนที่ราบสูงคิจิมะ', 'The wooden roller coaster on the Kijima highland', ['kijima kogen', 'คิจิมะโคเง็น', 'kijima highland park', 'สวนสนุกคิจิมะ', 'wooden roller coaster', 'รถไฟเหาะไม้', 'jupiter coaster', 'รถไฟเหาะจูปิเตอร์', 'amusement park', 'สวนสนุก', 'highland', 'ที่ราบสูง'], 'หาโครงไม้ไขว้กันใต้รางรถไฟเหาะ', 'Find the criss-cross wooden frame under the track',
    // a big hump of wooden roller coaster track held up by a criss-cross wooden lattice, a little red coaster car with a smiling front cresting the top, green highland and soft hills behind
    bg('#E1F5FE') + P('M16 140c40-26 80-30 110-16 30-18 70-20 98-4v80H16z', '#A5D6A7', 0) + low(186, '#C5E1A5') + frame
      + [52, 76, 100, 124, 148, 172, 196].map((x) => { const y = 186 - 110 * Math.sin(Math.PI * (x - 30) / 180); return Lc(`M${x} 186V${y.toFixed(1)}`, '#A1887F', 4); }).join('')
      + Lc('M52 186L100 92M76 186l48-118M100 186l48-112M124 186l48-94M148 186l48-64M100 92l48 94M76 120l48 66M124 68l48 118M148 74l48 112', '#BCAAA4', 2.5)
      + ol('M30 186C60 150 80 76 120 76S180 150 210 186', '#8D6E63', 7) + Lc('M30 186C60 150 80 76 120 76S180 150 210 186', '#D7CCC8', 2)
      + g(120, 64, 1, R(-24, -14, 48, 22, '#E53935', 8) + R(-16, -20, 32, 8, '#FFCA28', 4, 3) + C(-14, 10, 5, '#455A64', 2.5) + C(14, 10, 5, '#455A64', 2.5)) + face(120, 56, 0.34)),
];

export default {
  places: {
    'jp-beppu': { country: 'jp', wave: 3, name: nm('เบปปุและยูฟุอิน', 'Beppu and Yufuin'), tz: 'Asia/Tokyo', ll: [33.28, 131.49], alias: ['beppu', 'เบปปุ', '別府', 'yufuin', 'yufu-in', 'ยูฟุอิน', '由布院', '湯布院', 'oita', 'โออิตะ', '大分', 'OIT', 'kannawa', 'คันนาวะ', 'jigoku meguri', 'beppu hells', 'umi jigoku', 'lake kinrin', 'kinrinko', 'yufudake', 'ยูฟุดาเกะ'], colors: BP },
  },
  items,
};
