// Wave 16: Takamatsu and the Seto Inland Sea islands (Kagawa, Shikoku) — Ritsurin Garden, the red glass lighthouse,
// Takamatsu Castle's sea-water moat, Sanuki udon, Marugame's chicken and round fans, Shōdoshima, Ogijima and Mitoyo's mirror beach.
// Skipped as repeats or bans: the art islands' famous artworks (Naoshima's dotted pumpkin and its museums — someone's work,
// never copied; Naoshima is the ferry day instead), Kotohira-gū's shrine and the Kompira dog (a shrine), Kanamaru-za (Tokyo's
// Kabukiza is a kabuki theatre already), Shōdoshima's Greek windmill (Santorini's windmill), olive picking (Waiheke), the
// Kankakei ropeway (many cable cars), Naoshima by bicycle (many bike rides), wasanbon sugar sweets (Kanazawa's rakugan),
// kitsune udon (Osaka), Megijima's ogre caves (a scary cave for little ones).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const TK = { k1: '#0277BD', k2: '#689F38', k3: '#E1F5FE' };
const CITY = 'jp-takamatsu', DIR = 'jp/takamatsu';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
const waves = (d) => Lc(d, '#E1F5FE', 4);
// a cloud-pruned garden pine: a crooked trunk and flat green cushions
const pine = (x, y, s = 1) => g(x, y, s, Lc('M0 0c4-14-8-22 2-40', '#6D4C41', 6) + E(-10, -40, 20, 8, '#2E7D32') + E(12, -52, 17, 7, '#388E3C') + E(4, -26, 15, 6, '#2E7D32'));

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับทาคามัตสึ', 'Takamatsu stamp'), kw: ['takamatsu', 'ทาคามัตสึ', 'kagawa', 'คางาวะ', 'udon prefecture', 'เมืองอุด้ง', 'seto inland sea', 'ทะเลเซโตะใน', 'shikoku', 'ชิโกกุ'],
    // a smiling white bowl of thick udon with chopsticks lifting a noodle, the little green islands of the inland sea behind it
    svg: cityStamp('tk-st', { name: 'TAKAMATSU', sub: 'KAGAWA · JAPAN', ...TK, emblem: R(48, 92, 104, 18, '#81D4FA', 0, 0) + P('M52 96c6-16 16-22 26-22s20 8 24 22z', '#81C784', 2.5) + P('M108 96c6-10 14-14 20-14s14 4 18 14z', '#AED581', 2.5)
      + P('M60 108h80c0 22-18 38-40 38s-40-16-40-38z', '#FFFFFF') + E(100, 108, 40, 7, '#FFF3C4') + Lc('M70 106c6-4 10 4 16 0s10 4 16 0 10 4 16 0 10 4 14 0', '#FFFDE7', 3)
      + Lc('M112 106c0-12 2-20 4-28', '#FFFDE7', 3.5) + ol('M108 62l14 34M120 60l8 36', '#C8A165', 2.5) + C(86, 107, 3, '#8BC34A', 1.5) + C(94, 105, 3, '#8BC34A', 1.5) + face(100, 124, 0.32) }) },

  D('ritsurin', 'สะพานโค้งเอ็นเก็ตสึเคียวในสวนริตสึริน', 'The arched moon bridge of Ritsurin Garden', ['ritsurin garden', 'สวนริตสึริน', 'ritsurin', 'ริตสึริน', 'engetsukyo', 'เอ็นเก็ตสึเคียว', 'moon bridge', 'สะพานโค้ง', 'pine trees', 'ต้นสน', 'boat ride', 'นั่งเรือ', 'japanese garden', 'สวนญี่ปุ่น', 'takamatsu', 'ทาคามัตสึ'],
    // a wooded green hill behind a pond, a round wooden bridge whose arch and reflection make a full moon, cloud-pruned pines, a little boat with a red umbrella
    scene('tk-d1', '#E3F2FD', P('M-4 116c30-56 90-74 132-62 42-22 94-4 120 34v40H-4z', '#66BB6A') + C(70, 80, 14, '#43A047', 0) + C(170, 70, 16, '#43A047', 0) + C(206, 92, 12, '#388E3C', 0)
      + R(-4, 130, 248, 120, '#4FC3F7') + E(30, 132, 40, 8, '#A5D6A7', 0) + E(220, 134, 36, 8, '#A5D6A7', 0)
      + Lc('M126 142q40 34 80 0', '#B3E5FC', 5) + P('M112 140q54-50 108 0h-14q-40-34-80 0z', '#A1887F') + Lc('M114 132q52-48 104 0', '#8D6E63', 3) + Lc('M136 120v-8M166 108v-8M196 120v-8', '#8D6E63', 3)
      + pine(36, 134, 1.1) + pine(222, 136, 0.9)
      + P('M46 186h66l-10 12H56z', '#8D6E63') + Lc('M78 186v-18', INK, 3) + P('M60 170q18-18 36 0z', '#E53935')
      + E(150, 200, 12, 5, '#81C784', 3) + E(190, 214, 10, 4, '#81C784', 3) + waves('M30 214c10-5 20 5 30 0M120 228c10-5 20 5 30 0') + face(166, 128, 0.3, 'none'))),
  D('islandferry', 'นั่งเรือเฟอร์รีไปเกาะนาโอชิมะในทะเลเซโตะใน', 'The ferry to Naoshima across the Seto Inland Sea', ['naoshima', 'นาโอชิมะ', 'ferry', 'เรือเฟอร์รี', 'island hopping', 'นั่งเรือเที่ยวเกาะ', 'seto inland sea', 'ทะเลเซโตะใน', 'art islands', 'เกาะศิลปะ', 'teshima', 'เทชิมะ', 'calm sea', 'ทะเลสงบ', 'takamatsu port', 'ท่าเรือทาคามัตสึ'],
    // an orange evening sky, many soft green islands one behind another on the calm sea, a smiling white ferry with a blue stripe, gulls
    scene('tk-d2', '#FFE0B2', C(150, 86, 22, '#FFB74D', 0) + P('M-4 118c20-16 40-18 60-6 16-14 34-12 46 4v20H-4z', '#C5E1A5', 0) + P('M128 120c18-22 44-26 64-10 14-8 34-6 52 8v14H128z', '#AED581', 0)
      + R(-4, 128, 248, 124, '#4FC3F7') + P('M-4 134c24-22 56-24 80-4v8H-4z', '#81C784') + P('M170 134c16-16 40-18 74-2v8h-74z', '#66BB6A') + P('M96 134c10-10 22-10 30 0z', '#9CCC65')
      + Lc('M120 92l8 6 8-6M54 74l7 5 7-5', INK, 3)
      + P('M58 172h126l-14 24H74z', '#FFFFFF') + Lc('M66 182h112', '#1E88E5', 5) + R(84, 152, 70, 20, '#FFFFFF', 4) + R(100, 138, 36, 14, '#FFFFFF', 3) + R(126, 126, 10, 12, '#1E88E5', 0, 3)
      + Lc('M92 162h8M108 162h8M124 162h8M140 162h8', '#90CAF9', 4) + face(120, 186, 0.24, 'none')
      + Lc('M186 186c14 4 30 0 44 6', '#FFFFFF', 4) + waves('M20 210c10-5 20 5 30 0M90 222c10-5 20 5 30 0M180 214c10-5 20 5 30 0'))),

  L('kamaage', 'คามาอาเงะอุด้งในถังไม้', 'Kamaage udon straight from the pot in a wooden tub', ['kamaage udon', 'คามาอาเงะอุด้ง', 'sanuki udon', 'อุด้งซานุกิ', 'udon', 'อุด้ง', 'wooden tub', 'ถังไม้', 'dipping sauce', 'น้ำจิ้ม', 'udon shop', 'ร้านอุด้ง', 'kagawa', 'คางาวะ'], 'หาถ้วยน้ำจิ้มที่มีต้นหอมซอยลอยอยู่', 'Find the dipping cup with chopped spring onion floating in it',
    // a round wooden tub with bamboo hoops full of hot water and soft white noodles, a small cup of brown dipping sauce with green onion beside it, steam
    P('M24 132v26c0 26 40 46 90 46s90-20 90-46v-26z', '#D7A86E') + Lc('M24 150c0 24 40 42 90 42s90-18 90-42', '#8D6E63', 4) + E(114, 132, 90, 30, '#E8C08A') + E(114, 130, 78, 23, '#E1F5FE')
      + Lc('M50 128c10-10 20 10 30 0s20 10 30 0 20 10 30 0 20 10 30 0M56 140c10-8 20 8 30 0s20 8 30 0 20 8 30 0 18 8 26 0M66 118c10-8 20 8 30 0s20 8 30 0 20 8 30 0', '#FFFFFF', 6)
      + Lc('M50 128c10-10 20 10 30 0s20 10 30 0 20 10 30 0 20 10 30 0', '#FFF8E1', 2) + face(114, 170, 0.46)
      + P('M168 70h50c0 22-10 34-25 34s-25-12-25-34z', '#FFFFFF') + E(193, 70, 25, 7, '#8D5524') + C(184, 69, 3, '#7CB342', 1.5) + C(196, 71, 3, '#7CB342', 1.5) + C(204, 68, 3, '#7CB342', 1.5)
      + Lc('M80 90c-6-10 6-16 0-26M112 84c-6-10 6-16 0-26M144 90c-6-10 6-16 0-26', '#CFD8DC', 4)),
  L('udonmaking', 'นวดแป้งและตัดเส้นอุด้งซานุกิเอง', 'Making Sanuki udon by hand', ['udon making', 'ทำเส้นอุด้งเอง', 'udon school', 'โรงเรียนอุด้ง', 'hand-made noodles', 'เส้นทำมือ', 'rolling pin', 'ไม้คลึงแป้ง', 'noodle knife', 'มีดตัดเส้น', 'cooking class', 'คลาสทำอาหาร', 'sanuki udon', 'อุด้งซานุกิ'], 'หาไม้คลึงแป้งยาวบนแผ่นแป้ง', 'Find the long rolling pin on the dough',
    // a wooden board with a big smiling sheet of white dough, a long rolling pin across it, a square udon knife cutting neat strips on the right, a bag of flour
    R(22, 120, 196, 84, '#D7A86E', 10) + Lc('M30 196h180', '#B98A52', 3) + P('M36 132h108l6 58H30z', '#FFF8E1') + Lc('M40 150c30-4 60 4 100-2', '#F5E6C8', 3)
      + ol('M24 128l130-22', '#E8C08A', 10) + C(22, 129, 6, '#C8A165', 3) + C(158, 105, 6, '#C8A165', 3)
      + [0, 1, 2, 3, 4].map((k) => R(156 + k * 9, 140, 6, 52, '#FFFDE7', 2, 2.5)).join('')
      + P('M150 84h52v34h-52z', '#ECEFF1') + R(160, 64, 32, 20, '#8D6E63', 4) + Lc('M150 118h52', '#90A4AE', 3)
      + P('M42 68c0-18 10-28 26-28s26 10 26 28l-4 30H46z', '#FFFFFF') + Lc('M46 54h44', '#90CAF9', 4) + E(68, 40, 14, 5, '#FFF8E1', 3)
      + face(88, 166, 0.42)),
  L('honetsukidori', 'โฮเนะสึกิโดริ น่องไก่ย่างทั้งกระดูกของมารุกาเมะ', 'Honetsuki-dori, Marugame’s roast chicken leg on the bone', ['honetsuki-dori', 'โฮเนะสึกิโดริ', 'honetsukidori', 'roast chicken leg', 'น่องไก่ย่าง', 'chicken on the bone', 'ไก่ทั้งกระดูก', 'peppery', 'พริกไทย', 'cabbage', 'กะหล่ำปลี', 'marugame', 'มารุกาเมะ'], 'หาปลายกระดูกที่ห่อกระดาษไว้', 'Find the end of the bone wrapped in paper',
    // a round silver tin plate, a big glossy roasted chicken leg sprinkled with pepper, shredded cabbage beside it, a paper frill on the bone end, a little dish of its juice
    E(118, 148, 100, 54, '#CFD8DC') + E(118, 146, 86, 44, '#ECEFF1', 3)
      + Lc('M150 162c8-6 16 6 24 0s16 6 24 0M146 172c8-6 16 6 24 0s16 6 22 0M156 152c8-6 16 6 22 0', '#C5E1A5', 5)
      + P('M48 150c-6-30 22-50 52-44 26 6 40 22 40 40 0 20-22 34-50 32-24-2-40-12-42-28z', '#C9772E') + Lc('M62 132c12-10 30-12 46-6', '#E89A4E', 4)
      + Lc('M134 140l30-30', INK, 14) + Lc('M134 140l30-30', '#FFF8E1', 8) + C(168, 104, 8, '#FFF8E1') + C(162, 98, 7, '#FFF8E1')
      + P('M138 128l12 12 12-14-12-10z', '#FFFFFF', 3) + Lc('M140 134l6 6M148 126l6 6', '#E53935', 2)
      + [[70, 128], [84, 122], [100, 126], [74, 160], [92, 168], [112, 156], [62, 146], [122, 138]].map(([x, y]) => C(x, y, 2, INK, 0)).join('')
      + E(54, 98, 18, 8, '#FFFFFF') + E(54, 97, 13, 5, '#E0A040', 0) + face(92, 146, 0.4)),
  L('setoohashi', 'สะพานเซโตะโอฮาชิกับรถไฟวิ่งชั้นล่าง', 'The Seto Ōhashi bridges with a train on the lower deck', ['seto ohashi', 'เซโตะโอฮาชิ', 'seto ōhashi bridge', 'สะพานเซโตะโอฮาชิ', 'double-deck bridge', 'สะพานสองชั้น', 'train over the sea', 'รถไฟข้ามทะเล', 'marine liner', 'มารีนไลเนอร์', 'sakaide', 'ซาไกเดะ', 'suspension bridge', 'สะพานแขวน'], 'หารถไฟที่วิ่งอยู่ใต้ถนนบนสะพาน', 'Find the train running under the road on the bridge',
    // a white suspension bridge hopping between two little green islands, cars on the top deck, a smiling train in the lattice of the lower deck, the sea below
    bg('#E1F5FE') + low(170, '#4FC3F7') + frame + P('M16 170c8-18 20-24 32-24s24 6 30 24z', '#81C784') + P('M168 170c10-20 24-26 36-24 10 2 18 10 20 24z', '#66BB6A')
      + R(70, 70, 10, 100, '#ECEFF1') + R(160, 70, 10, 100, '#ECEFF1') + Lc('M75 72q45 56 90 0M16 116q30-10 59-44M165 72q30 34 59 44', '#B0BEC5', 3)
      + Lc('M90 104v14M105 116v4M135 116v4M150 104v14', '#B0BEC5', 2)
      + R(16, 120, 208, 8, '#FFFFFF') + R(16, 128, 208, 22, '#ECEFF1') + Lc('M16 128l12 22 12-22 12 22 12-22 12 22 12-22 12 22 12-22 12 22 12-22 12 22 12-22 12 22 12-22 12 22 12-22 12 22', '#B0BEC5', 2.5) + R(16, 150, 208, 6, '#FFFFFF')
      + R(40, 112, 14, 8, '#E53935', 3, 2.5) + R(176, 112, 14, 8, '#FFCA28', 3, 2.5)
      + R(92, 132, 62, 16, '#FFFFFF', 6, 3) + Lc('M100 138h8M114 138h8M128 138h8', '#1E88E5', 4) + Lc('M94 145h58', '#1E88E5', 2.5) + face(146, 140, 0.18, 'none')
      + waves('M40 196c10-5 20 5 30 0M140 204c10-5 20 5 30 0')),
  L('zenigata', 'เซนิงาตะซูนาเอะ เหรียญยักษ์บนผืนทราย', 'Zenigata Sunae, the giant coin drawn in the sand', ['zenigata sunae', 'เซนิงาตะซูนาเอะ', 'zenigata', 'เซนิงาตะ', 'sand coin', 'เหรียญบนผืนทราย', 'kanonji', 'คันอนจิ', 'kotohiki park', 'สวนโคโตฮิกิ', 'view from the hill', 'มองจากเนินเขา', 'lucky coin', 'เหรียญนำโชค'], 'หาช่องสี่เหลี่ยมตรงกลางเหรียญทราย', 'Find the square hole in the middle of the sand coin',
    // seen from the pine-covered hill: a huge oval coin drawn in the beach sand with a ring and a square hole, pine trees around it, the sea beyond
    bg('#B3E5FC') + P('M16 66h208v40H16z', '#4FC3F7', 0) + low(96, '#F5E6C8') + frame
      + E(120, 150, 82, 42, '#FFE7B0') + E(120, 150, 82, 42, 'none') + E(120, 150, 66, 32, 'none') + R(104, 140, 32, 20, '#FFF8E1', 2)
      + Lc('M86 144c6-6 10 0 14 0M150 144c6-6 10 0 14 0M118 124h4M118 176h4', '#C9A86A', 4)
      + C(34, 206, 16, '#2E7D32') + C(56, 214, 14, '#388E3C') + C(206, 204, 16, '#2E7D32') + C(184, 214, 13, '#388E3C') + C(30, 104, 10, '#388E3C') + C(212, 104, 10, '#2E7D32')
      + waves('M40 82c10-5 20 5 30 0M150 80c10-5 20 5 30 0') + face(120, 150, 0.3, 'none')),
  L('angelroad', 'แองเจิลโรด ทางทรายตอนน้ำลงที่เกาะโชโดชิมะ', 'Angel Road, the sandbar walk of Shōdoshima at low tide', ['angel road', 'แองเจิลโรด', 'shodoshima', 'โชโดชิมะ', 'shōdoshima', 'sandbar', 'สันทราย', 'low tide', 'น้ำลง', 'walk to the island', 'เดินไปเกาะ', 'tide pools', 'แอ่งน้ำทะเล'], 'หาทางทรายที่พาเดินไปเกาะเล็ก', 'Find the sandy path leading out to the little island',
    // the shore in front, a winding pale sand path across the blue sea to a small pine island and on to a second one, shells on the sand, a heart drawn in it
    bg('#E1F5FE') + low(80, '#4FC3F7') + frame
      + P('M70 224c10-30 40-40 44-70s20-40 30-56c8-10 16-16 24-20l10 8c-8 4-16 12-22 22-10 18-20 30-24 56s-24 44-30 60z', '#FFE7B0')
      + P('M140 104c4-22 20-34 38-34s30 14 30 34z', '#8D6E63') + C(162, 74, 12, '#2E7D32') + C(184, 68, 13, '#388E3C') + C(196, 82, 9, '#2E7D32')
      + P('M178 60c2-12 10-18 18-18s16 6 16 18z', '#A1887F') + C(196, 42, 8, '#43A047')
      + P('M16 196h52c-10 8-14 20-14 28H46a30 30 0 0 1-30-28z', '#F5E6C8', 0)
      + P('M96 190c-6-8-18-4-12 6l12 10 12-10c6-10-6-14-12-6z', '#F48FB1', 3) + E(80, 214, 7, 5, '#FFFFFF', 2.5) + E(124, 210, 6, 4, '#FFCCBC', 2.5)
      + waves('M40 120c10-5 20 5 30 0M70 160c10-5 20 5 30 0M180 150c10-5 20 5 30 0M180 190c10-5 20 5 30 0') + face(170, 94, 0.3)),
  L('shoyubarrel', 'ถังไม้ยักษ์หมักโชยุบนเกาะโชโดชิมะ', 'The giant wooden soy sauce barrels of Shōdoshima', ['soy sauce', 'โชยุ', 'shoyu', 'ซีอิ๊วญี่ปุ่น', 'wooden barrel', 'ถังไม้', 'kioke', 'คิโอเกะ', 'soy sauce brewery', 'โรงหมักโชยุ', 'shodoshima', 'โชโดชิมะ', 'shoyu soft serve', 'ไอศกรีมโชยุ'], 'หาบันไดไม้ที่พิงถังยักษ์', 'Find the wooden ladder leaning on the giant barrel',
    // inside a dark wooden storehouse: a huge round barrel taller than the door with plaited bamboo hoops, a ladder against it, a little soy sauce bottle and a soft-serve cone in front
    bg('#5D4037') + R(16, 176, 208, 48, '#8D6E63', 0, 0) + frame + Lc('M16 60h208M60 16v44M180 16v44', '#4E342E', 4)
      + P('M48 70h120l8 116H40z', '#D7A86E') + E(108, 70, 60, 10, '#B98A52') + E(108, 70, 50, 7, '#4E342E', 0)
      + Lc('M70 70l-6 116M96 70l-2 116M122 70l2 116M148 70l6 116', '#B98A52', 2.5)
      + R(42, 92, 132, 10, '#C8B068', 3, 3) + R(38, 140, 140, 10, '#C8B068', 3, 3) + Lc('M50 97h116M46 145h124', '#A0884A', 2)
      + ol('M178 186l18-128M206 186l-6-128', '#C8A165', 4) + Lc('M184 150h18M188 120h14M192 90h10', '#C8A165', 4)
      + R(64, 196, 22, 26, '#4E342E', 4) + R(68, 186, 14, 10, '#E53935', 2, 2.5) + R(66, 204, 18, 10, '#FFFFFF', 0, 2)
      + P('M140 196l10 26 10-26z', '#E8B76A') + P('M138 196c0-10 8-16 12-22 4 6 12 12 12 22z', '#D7B99A') + face(108, 120, 0.5)),
  L('kotoden', 'รถไฟโคโตเด็นสีเหลืองวิ่งผ่านนาข้าว', 'The little yellow Kotoden train through the rice fields', ['kotoden', 'โคโตเด็น', 'kotohira line', 'สายโคโตฮิระ', 'local train', 'รถไฟท้องถิ่น', 'yellow train', 'รถไฟสีเหลือง', 'rice fields', 'นาข้าว', 'kotohira', 'โคโตฮิระ', 'train ride', 'นั่งรถไฟ'], 'หาไฟกลมสองดวงหน้ารถไฟ', 'Find the two round lights on the front of the train',
    // a one-car train painted yellow and white rolling on a track between green rice fields, its round face, a tiny wooden station platform, hills behind
    bg('#E3F2FD') + P('M16 104c40-30 80-30 110-10 30-18 70-20 98 2v20H16z', '#A5D6A7', 0) + low(150, '#9CCC65') + frame
      + Lc('M16 168c20 0 40 2 60 0M150 172c20-2 40 0 74 0M16 196c30 2 60 0 80 2M150 200c24 0 50-2 74 0', '#7CB342', 3)
      + R(16, 176, 208, 6, '#8D6E63', 0, 3) + Lc('M30 182v8M60 182v8M90 182v8M120 182v8M150 182v8M180 182v8M210 182v8', '#8D6E63', 3)
      + R(160, 150, 56, 12, '#BCAAA4', 0, 3) + R(186, 118, 6, 32, '#8D6E63', 0, 3) + P('M170 118h44l-6-10h-32z', '#E57373')
      + R(40, 106, 112, 64, '#FFEE58', 14) + R(40, 140, 112, 30, '#FFFFFF', 0, 0) + R(40, 106, 112, 64, 'none', 14)
      + R(52, 116, 22, 18, '#B3E5FC', 3, 3) + R(80, 116, 22, 18, '#B3E5FC', 3, 3) + R(108, 116, 34, 18, '#B3E5FC', 3, 3) + Lc('M60 100h20l8-10', INK, 3)
      + C(54, 162, 6, '#FFF59D', 2.5) + C(140, 162, 6, '#FFF59D', 2.5) + C(66, 174, 6, '#546E7A', 2.5) + C(128, 174, 6, '#546E7A', 2.5) + face(97, 152, 0.36)),
  L('ogijimacats', 'แมวบนบันไดหมู่บ้านเกาะโองิจิมะ', 'The cats of Ogijima on the village steps', ['ogijima', 'โองิจิมะ', 'cat island', 'เกาะแมว', 'cats', 'แมว', 'hillside village', 'หมู่บ้านบนเนินเขา', 'stone steps', 'บันไดหิน', 'island ferry', 'เรือข้ามเกาะ', 'seto inland sea', 'ทะเลเซโตะใน'], 'นับแมวที่นอนเล่นบนบันไดให้ครบ', 'Count the cats lazing on the steps',
    // a narrow stone stairway climbing between little houses with dark tiled roofs on a steep island, three cats sitting and curled on the steps, the blue sea at the bottom
    bg('#E1F5FE') + low(186, '#4FC3F7') + frame + P('M16 186V80c40-40 120-52 208-24v130z', '#C5E1A5', 0)
      + R(30, 92, 40, 30, '#FFFFFF') + P('M24 94l26-18 26 18z', '#546E7A') + R(40, 102, 10, 10, '#90CAF9', 0, 2.5)
      + R(164, 84, 44, 30, '#FFFFFF') + P('M158 86l28-18 28 18z', '#546E7A') + R(182, 94, 10, 10, '#90CAF9', 0, 2.5)
      + R(24, 140, 44, 30, '#FFF8E1') + P('M18 142l26-18 26 18z', '#455A64') + R(172, 138, 40, 30, '#FFF8E1') + P('M166 140l26-18 26 18z', '#455A64')
      + P('M96 186l10-110h28l10 110z', '#D7CCC8') + Lc('M100 168h40M102 150h36M104 132h32M105 114h30M106 96h28', '#A1887F', 3)
      + g(120, 160, 1, P('M-14 4c0-14 6-20 14-20s14 6 14 20z', '#FFB74D') + P('M-10-12l2-10 6 6zM10-12l-2-10-6 6z', '#FFB74D', 3) + Lc('M14 2c8 0 10-8 6-12', '#FFB74D', 4)) + face(120, 150, 0.2, 'w')
      + g(118, 122, 1, E(0, 0, 14, 8, '#FFFFFF') + P('M4-6l4-8 4 6zM10-4l6-6 1 7z', '#FFFFFF', 3)) + face(126, 120, 0.14, 'none')
      + g(186, 180, 1, P('M-12 4c0-12 5-18 12-18s12 6 12 18z', '#616161') + P('M-9-10l2-9 5 5zM9-10l-2-9-5 5z', '#616161', 3)) + C(181, 171, 2, '#FFF59D', 0) + C(191, 171, 2, '#FFF59D', 0)
      + waves('M40 208c10-5 20 5 30 0M150 212c10-5 20 5 30 0')),
  L('redlighthouse', 'ประภาคารแก้วสีแดงที่ท่าเรือทาคามัตสึ', 'The red glass lighthouse of Takamatsu port', ['red lighthouse', 'ประภาคารสีแดง', 'glass lighthouse', 'ประภาคารแก้ว', 'setoshirube', 'เซโตะชิรุเบะ', 'breakwater', 'เขื่อนกันคลื่น', 'sunport takamatsu', 'ซันพอร์ตทาคามัตสึ', 'harbour walk', 'เดินเล่นริมท่าเรือ', 'takamatsu port', 'ท่าเรือทาคามัตสึ'], 'หาประภาคารสีแดงใสที่ปลายเขื่อนยาว', 'Find the see-through red lighthouse at the end of the long breakwater',
    // a long stone breakwater stretching into the sea with a slim tower of red glass blocks at its end glowing, rays of light, a ferry far away
    bg('#E3F2FD') + low(120, '#4FC3F7') + frame + P('M16 170l130-40h22l-6 14L24 196H16z', '#CFD8DC') + Lc('M30 182l120-40', '#B0BEC5', 3)
      + P('M146 132l6-92h16l6 92z', '#E53935') + Lc('M150 116h20M151 100h18M152 84h16M153 68h14M154 54h12', '#EF9A9A', 3) + Lc('M156 130l2-86M164 130l-2-86', '#FFCDD2', 2)
      + P('M150 40h20l-4-12h-12z', '#C62828') + C(160, 24, 4, '#FFF59D', 2.5) + Lc('M140 22l-22-6M180 22l22-6M146 32l-18 6M174 32l18 6', '#FFE082', 4)
      + P('M40 112h34l-6 8H46z', '#FFFFFF', 3) + R(48, 104, 18, 8, '#FFFFFF', 0, 2.5)
      + waves('M30 140c10-5 20 5 30 0M170 156c10-5 20 5 30 0M110 200c10-5 20 5 30 0M180 196c10-5 20 5 30 0') + face(160, 112, 0.24)),
  L('tamamomoat', 'ให้อาหารปลาไทในคูน้ำทะเลของปราสาททาคามัตสึ', 'Feeding sea bream in Takamatsu Castle’s sea-water moat', ['takamatsu castle', 'ปราสาททาคามัตสึ', 'tamamo park', 'สวนทามาโมะ', 'sea water moat', 'คูน้ำทะเล', 'sea bream', 'ปลาไท', 'feeding fish', 'ให้อาหารปลา', 'tsukimi yagura', 'หอสึกิมิยางุระ', 'castle ruins', 'ซากปราสาท'], 'หาปลาไทสีแดงที่อ้าปากรออาหาร', 'Find the red sea bream opening its mouth for food',
    // a white castle turret with three dark tiled roofs on a stone wall above green-blue water, red sea bream with wide mouths popping up for little food pellets
    bg('#E3F2FD') + low(140, '#4DB6AC') + frame
      + P('M40 144l10-46h140l10 46z', '#BDBDBD') + Lc('M46 130h148M50 112h140M80 98v14M120 98v14M160 98v14M64 112v18M104 112v18M144 112v18M180 112v18', '#9E9E9E', 2.5)
      + R(86, 74, 68, 24, '#FFFFFF') + P('M76 76h88l-10-10h-68z', '#455A64') + R(94, 52, 52, 16, '#FFFFFF') + P('M86 54h68l-10-10h-48z', '#455A64') + R(102, 34, 36, 12, '#FFFFFF') + P('M96 36h48l-8-10h-32z', '#455A64')
      + R(112, 82, 6, 8, INK, 0, 0) + R(122, 82, 6, 8, INK, 0, 0)
      + [[70, 176, 1, 8], [128, 186, 1.1, -6], [180, 172, 0.9, 10]].map(([x, y, s, r]) => g(x, y, s, P('M-22 0c6-12 18-16 28-12l8-6v8c4 4 4 10 0 14v8l-8-6c-10 4-22 0-28-12z', '#EF5350') + P('M18-6l10-8v28l-10-8z', '#E53935', 3) + E(-20, 0, 5, 6, '#B71C1C', 2.5) + C(-12, -4, 2, INK, 0), r)).join('')
      + [[100, 160], [150, 164], [92, 196], [206, 190], [52, 200]].map(([x, y]) => C(x, y, 3, '#A1887F', 1.5)).join('') + face(120, 84, 0.2, 'none')),
  L('kawarake', 'โยนจานดินเผาจากผาที่ราบสูงยาชิมะ', 'Throwing little clay discs from the Yashima plateau', ['yashima', 'ยาชิมะ', 'kawarake throwing', 'โยนจานดินเผา', 'kawarake', 'คาวาราเกะ', 'clay discs', 'จานดินเผาใบเล็ก', 'plateau view', 'จุดชมวิวบนที่ราบสูง', 'sea view', 'วิวทะเล', 'make a wish', 'อธิษฐาน'], 'หาจานดินเผาใบเล็กที่ลอยอยู่กลางฟ้า', 'Find the little clay discs flying in the sky',
    // the edge of a flat-topped hill with a wooden fence, a basket of small round clay plates, three discs flying in a curve over the sea and the islands far below
    bg('#BBDEFB') + P('M16 150h208v40H16z', '#4FC3F7', 0) + P('M30 150c10-10 20-12 30 0zM90 152c14-14 30-14 40 0zM170 150c10-8 22-8 30 0z', '#81C784', 2.5) + low(170, '#9CCC65') + frame
      + R(28, 160, 184, 6, '#A1887F', 0, 3) + Lc('M40 160v30M80 160v30M120 160v30M160 160v30M200 160v30', '#8D6E63', 4)
      + P('M140 200h60l-6 22h-48z', '#D7A86E') + Lc('M146 210h48', '#B98A52', 3) + E(160, 200, 10, 4, '#E8C3A0', 2.5) + E(180, 198, 10, 4, '#E8C3A0', 2.5)
      + `<path d="M60 150C70 80 140 40 190 70" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="6 8"/>`
      + g(80, 98, 1, E(0, 0, 14, 6, '#E8C3A0', 3) + E(0, -1, 8, 3, '#D7A07A', 0), -20) + g(132, 58, 1, E(0, 0, 14, 6, '#E8C3A0', 3) + E(0, -1, 8, 3, '#D7A07A', 0), 8)
      + g(180, 66, 1.4, E(0, 0, 14, 6, '#E8C3A0', 3) + E(0, -1, 8, 3, '#D7A07A', 0), 20) + face(182, 66, 0.2, 'none')
      + C(50, 46, 12, '#FFF59D', 3)),
  L('vinebridge', 'สะพานเถาวัลย์ที่หมู่บ้านชิโกกุมูระ', 'The vine bridge at the Shikoku Mura village museum', ['vine bridge', 'สะพานเถาวัลย์', 'kazurabashi', 'คาซูระบาชิ', 'shikoku mura', 'ชิโกกุมูระ', 'open-air museum', 'พิพิธภัณฑ์กลางแจ้ง', 'old farmhouses', 'บ้านไร่โบราณ', 'swaying bridge', 'สะพานโยก', 'yashima', 'ยาชิมะ'], 'หาช่องห่างระหว่างไม้ที่มองเห็นน้ำข้างล่าง', 'Find the gaps between the planks where you see the water below',
    // a sagging bridge of thick twisted brown vines across a green ravine, wooden slats with gaps, vine handrails and netting, clear green water far below, trees on both banks
    bg('#E8F5E9') + P('M16 60c20 20 30 60 30 164H16z', '#66BB6A', 0) + P('M224 60c-20 20-30 60-30 164h30z', '#66BB6A', 0) + P('M46 224c0-40 10-50 20-60h108c10 10 20 20 20 60z', '#4DB6AC', 0) + frame
      + Lc('M166 196c10-4 20 4 30 0M70 204c10-4 20 4 30 0', '#E0F2F1', 4)
      + ol('M36 104q84 70 168 0', '#8D6E63', 6) + ol('M40 70q80 64 160 0', '#8D6E63', 6)
      + [48, 64, 80, 96, 112, 128, 144, 160, 176, 192].map((x) => { const t = (x - 36) / 168; const y = 104 + 140 * t * (1 - t) * 0.5 * 2; const y2 = 70 + 128 * ((x - 40) / 160) * (1 - (x - 40) / 160); return Lc(`M${x} ${y2.toFixed(1)}L${x} ${y.toFixed(1)}`, '#A1887F', 2.5) + R(x - 5, y - 2, 10, 6, '#D7A86E', 1, 2); }).join('')
      + C(36, 54, 16, '#2E7D32') + C(204, 54, 16, '#388E3C') + C(26, 80, 10, '#43A047') + C(214, 82, 10, '#2E7D32') + face(120, 150, 0.22, 'none')),
  L('oiri', 'โออิริ ขนมข้าวพองเม็ดกลมหลากสี', 'Oiri, tiny round rice puffs in pastel colours', ['oiri', 'โออิริ', 'rice puffs', 'ขนมข้าวพอง', 'pastel sweets', 'ขนมสีพาสเทล', 'wedding sweet', 'ขนมงานแต่ง', 'western kagawa', 'คางาวะตะวันตก', 'souvenir', 'ของฝาก', 'crunchy snack', 'ขนมกรอบ'], 'หาเม็ดขนมสีเขียวที่ยิ้มอยู่', 'Find the smiling green puff',
    // a little wooden box tipped over with a pile of pea-sized round puffs in pink, yellow, green and white spilling out, two of them smiling
    P('M28 98l90-22 22 70-90 22z', '#D7A86E') + P('M50 168l90-22 10 16-90 22z', '#B98A52') + P('M40 112l70-18 16 50-70 18z', '#8D6E63', 0)
      + [[70, 150, '#F8BBD0'], [88, 142, '#FFF59D'], [104, 150, '#C5E1A5'], [120, 144, '#FFFFFF'], [84, 160, '#FFFFFF'], [100, 166, '#F8BBD0'], [118, 160, '#FFF59D'],
        [136, 156, '#C5E1A5'], [132, 172, '#F8BBD0'], [150, 168, '#FFFFFF'], [168, 176, '#FFF59D'], [148, 186, '#C5E1A5'], [166, 194, '#F8BBD0'], [186, 188, '#FFFFFF'], [114, 180, '#C5E1A5'], [196, 204, '#FFF59D'], [176, 210, '#C5E1A5'], [130, 196, '#FFF59D'], [204, 182, '#F8BBD0']]
        .map(([x, y, c]) => C(x, y, 9, c, 3)).join('')
      + C(150, 120, 22, '#C5E1A5') + face(150, 120, 0.36) + C(200, 140, 17, '#F8BBD0') + face(200, 140, 0.28, 'o')),
  L('anmochizoni', 'อันโมจิโซนิ ซุปมิโซะขาวใส่โมจิไส้ถั่วแดง', 'An-mochi zōni, white miso soup with bean-filled mochi', ['an-mochi zoni', 'อันโมจิโซนิ', 'zoni', 'โซนิ', 'new year soup', 'ซุปปีใหม่', 'white miso', 'มิโซะขาว', 'mochi with red bean', 'โมจิไส้ถั่วแดง', 'carrot and daikon', 'แครอทกับหัวไชเท้า', 'kagawa', 'คางาวะ'], 'หาไส้ถั่วแดงในโมจิที่แบ่งครึ่ง', 'Find the red bean filling inside the cut mochi',
    // a black-and-red lacquer bowl of creamy white miso soup with round white mochi, one cut open showing dark red bean paste, red carrot and white radish rounds, green leaves
    P('M30 112h180c0 54-40 88-90 88s-90-34-90-88z', '#212121') + Lc('M40 140c20 30 50 50 80 50s60-20 80-50', '#C62828', 5) + E(120, 112, 90, 22, '#B71C1C') + E(120, 112, 80, 18, '#FFF8E1')
      + C(92, 108, 20, '#FFFFFF') + face(92, 108, 0.36) + P('M134 116a18 18 0 0 1 36 0z', '#FFFFFF') + P('M140 116a12 10 0 0 1 24 0z', '#6D2E2E', 2.5)
      + C(56, 112, 9, '#FF7043', 3) + C(56, 112, 4, '#FFAB91', 0) + C(186, 110, 9, '#FFFFFF', 3) + C(186, 110, 4, '#F5F5F5', 0) + P('M116 96c6-10 16-12 22-6-8 4-14 6-22 6z', '#66BB6A', 2.5)
      + Lc('M92 72c-6-10 6-16 0-26M150 76c-6-10 6-16 0-26', '#CFD8DC', 4)),
  L('uchiwa', 'พัดกลมอุจิวะของมารุกาเมะ', 'Marugame’s round uchiwa fans', ['uchiwa', 'อุจิวะ', 'round fan', 'พัดกลม', 'paper fan', 'พัดกระดาษ', 'bamboo ribs', 'ซี่ไม้ไผ่', 'marugame', 'มารุกาเมะ', 'summer festival', 'เทศกาลหน้าร้อน', 'handicraft', 'งานฝีมือ'], 'หาซี่ไม้ไผ่ที่กางออกเป็นรูปพัด', 'Find the bamboo ribs fanning out inside the fan',
    // three round paper fans on bamboo handles fanned out together: a wave pattern, a sunny orange one with a smile, a pink one with flowers; the ribs show at their foot
    ol('M70 196l22-56', '#C8A165', 6) + ol('M120 206v-62', '#C8A165', 6) + ol('M170 196l-22-56', '#C8A165', 6)
      + g(70, 112, 1, C(0, 0, 40, '#90CAF9') + Lc('M-34 10c8-6 16 6 24 0s16 6 24 0 16 6 22 0M-30 -8c8-6 16 6 24 0s16 6 24 0 14 6 20 0', '#FFFFFF', 4), -20)
      + g(170, 112, 1, C(0, 0, 40, '#F8BBD0') + C(-12, -8, 7, '#FFFFFF', 2.5) + C(12, 6, 7, '#FFFFFF', 2.5) + C(-6, 18, 5, '#FFFFFF', 2.5) + C(-12, -8, 2.5, '#FFD54F', 0) + C(12, 6, 2.5, '#FFD54F', 0), 20)
      + C(120, 100, 44, '#FFB74D') + Lc('M120 144l-20-30M120 144l-8-34M120 144v-36M120 144l8-34M120 144l20-30', '#FFE0B2', 2) + face(120, 92, 0.5)),
  L('chichibugahama', 'หาดชิชิบุกาฮามะ กระจกเงาทะเลยามเย็น', 'Chichibugahama, the beach that mirrors the sunset', ['chichibugahama', 'ชิชิบุกาฮามะ', 'mirror beach', 'หาดกระจกเงา', 'sky mirror', 'ภาพสะท้อนท้องฟ้า', 'sunset', 'พระอาทิตย์ตก', 'low tide pools', 'แอ่งน้ำตอนน้ำลง', 'mitoyo', 'มิโตโยะ', 'photo spot', 'จุดถ่ายรูป'], 'หาพระอาทิตย์ดวงที่สองที่สะท้อนอยู่บนหาด', 'Find the second sun reflected on the beach',
    // an orange-pink sunset sky with clouds above a thin island on the horizon, the wet sand below shining like a mirror with the sun, clouds and a crab reflected
    bg('#FFCCBC') + P('M16 120h208v104H16z', '#FFE0D6', 0) + frame
      + Lc('M16 120h208', '#FF8A65', 3) + P('M150 120c8-10 18-12 26-6 6-4 14-4 20 6z', '#8D6E63', 2.5) + P('M150 122c8 6 18 7 26 4 6 3 14 3 20-4z', '#E8C9BE', 0)
      + C(90, 92, 22, '#FFB74D') + C(90, 148, 22, '#FFD8B0') + E(150, 66, 26, 10, '#FFFFFF') + E(150, 174, 26, 10, '#FFF3EE', 3)
      + Lc('M40 140h40M110 160h60M60 200h80M170 196h40', '#FFFFFF', 3)
      + g(176, 194, 1, Lc('M-12 2l-10-8M12 2l10-8M-10 6q-6 6-10 6M10 6q6 6 10 6', '#EF5350', 4) + E(0, 0, 14, 9, '#EF5350') + C(-5, -9, 3, '#FFFFFF', 2) + C(5, -9, 3, '#FFFFFF', 2)) + face(90, 90, 0.36)),
];

export default {
  places: {
    'jp-takamatsu': { country: 'jp', wave: 3, name: nm('ทาคามัตสึ', 'Takamatsu'), tz: 'Asia/Tokyo', ll: [34.34, 134.05], alias: ['takamatsu', 'ทาคามัตสึ', '高松', 'kagawa', 'คางาวะ', '香川', 'naoshima', 'นาโอชิมะ', '直島', 'shodoshima', 'shōdoshima', 'โชโดชิมะ', '小豆島', 'teshima', 'เทชิมะ', 'ogijima', 'โองิจิมะ', 'megijima', 'เมงิจิมะ', 'ritsurin', 'ริตสึริน', 'kotohira', 'โคโตฮิระ', 'konpira', 'kompira', 'คมปิระ', 'yashima', 'ยาชิมะ', 'chichibugahama', 'ชิชิบุกาฮามะ', 'angel road', 'แองเจิลโรด'], colors: TK },
  },
  items,
};
