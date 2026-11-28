// Wave 17: Niigata and Echigo-Yuzawa — the snow country (GALA Yuzawa, the Joetsu shinkansen in snow, snow play), the rice
// country (koshihikari fields and rice balls, hegisoba, sasa-dango, senbei, La France pears, tulips), the port (Bandai bridge,
// Pia Bandai market, Marine Pia dolphins, Murakami salmon), Sado island (tarai tub boats, the gold mine, the toki) and the
// Nagaoka fireworks.
// Skipped as repeats or bans: sake and the sake museum's tasting (alcohol; the rice bag stands for the station's museum shop),
// snow huts (Tohoku), ropeways (Hakone, Nagano), a plain dolphin (HK) — here it is the Marine Pia pool with its hoop.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NG = { k1: '#1E88A8', k2: '#E8A317', k3: '#E1F5FE' };
const CITY = 'jp-niigata', DIR = 'jp/niigata';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw: kw.slice(0, 12), colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw: kw.slice(0, 12), svg });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a snowy fir
const fir = (x, y, s = 1) => g(x, y, s, P('M0-34l14 18h-8l12 16h-10l10 14h-36l10-14h-10l12-16h-8z', '#2E7D32') + R(-3, 0, 6, 8, '#6D4C41', 0, 2.5) + P('M0-34l7 9h-14zM-9-16h18l-4 6h-10z', '#FFFFFF', 0));
// a round rice ball (onigiri) with a nori band
const ball = (x, y, s = 1) => g(x, y, s, P('M0-26c10 0 28 30 28 40 0 10-12 14-28 14S-28 24-28 14C-28 4-10-26 0-26z', '#FFFFFF') + R(-15, 6, 30, 22, '#263238', 3, 3));

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับนีงาตะ', 'Niigata stamp'), kw: ['niigata', 'นีงาตะ', 'echigo-yuzawa', 'เอจิโกะยูซาวะ', 'snow country', 'ดินแดนหิมะ', 'koshihikari', 'ข้าวโคชิฮิคาริ', 'rice ball', 'ข้าวปั้น', '新潟', '越後湯沢'],
    // a smiling white rice ball with a dark nori band standing in a golden rice field, a snowy blue mountain behind it with two small firs
    svg: cityStamp('ng-st', { name: 'NIIGATA', sub: 'SNOW & RICE · JAPAN', ...NG, emblem: P('M52 110l30-34 20 16 24-30 30 48z', '#90CAF9', 3) + P('M82 76l8 10-6 4-6-8zM106 70l10 12-8 6-6-10z', '#FFFFFF', 0)
      + P('M52 126c30-8 66-8 96 0v14H52z', '#F6C945', 0) + Lc('M60 130l4-12M80 128l4-12M116 128l4-12M136 130l4-12', '#D99A00', 2.5)
      + g(100, 118, 0.55, P('M0-26c10 0 28 30 28 40 0 10-12 14-28 14S-28 24-28 14C-28 4-10-26 0-26z', '#FFFFFF') + R(-15, 6, 30, 22, '#263238', 3, 3) + face(0, -2, 0.55, 'smile')) }) },

  D('gala', 'สกีรีสอร์ท GALA ยูซาวะที่ลงจากชินคันเซ็นก็ถึง', 'GALA Yuzawa, the ski resort right at the shinkansen station', ['gala yuzawa', 'กาล่ายูซาวะ', 'ski resort', 'สกีรีสอร์ท', 'gondola', 'กอนโดลา', 'echigo-yuzawa', 'เอจิโกะยูซาวะ', 'skiing', 'เล่นสกี', 'snow', 'หิมะ', '湯沢'],
    // a snowy mountain slope with a pale ski run between fir trees, a little red gondola cabin rising on its cable, the shinkansen station building at the foot with a white train beside it, a smiling snowman at the bottom
    scene('ng-d1', '#E3F2FD', P('M-4 110L70 40l60 50 50-40 70 70v110H-4z', '#BBDEFB') + P('M70 40l-18 22 14-6 8 12 10-14 12 10zM180 50l-20 18 14-4 10 10 16-12z', '#FFFFFF', 0)
      + P('M-4 180c40-30 90-50 140-80 30-18 60-10 108 10v100H-4z', '#FFFFFF') + fir(40, 150, 1.1) + fir(200, 130, 1) + fir(214, 170, 1.2)
      + Lc('M30 100l150 74', '#455A64', 2.5) + g(96, 128, 1, Lc('M0-16v14', '#455A64', 3) + R(-14, -4, 28, 24, '#E53935', 7) + R(-9, 1, 18, 9, '#B3E5FC', 3, 2.5))
      + R(20, 190, 90, 22, '#ECEFF1', 3) + R(30, 180, 70, 12, '#90A4AE', 3) + R(120, 196, 100, 16, '#FFFFFF', 7) + R(120, 202, 100, 5, '#1E88E5', 0) + C(138, 214, 5, '#455A64', 2.5) + C(204, 214, 5, '#455A64', 2.5)
      + C(110, 176, 14, '#FFFFFF') + C(110, 196, 18, '#FFFFFF') + face(110, 196, 0.34))),
  D('snowtrain', 'ชินคันเซ็นโจเอ็ตสึวิ่งผ่านทุ่งหิมะ', 'The Joetsu shinkansen racing through the snow', ['joetsu shinkansen', 'ชินคันเซ็นโจเอ็ตสึ', 'shinkansen', 'ชินคันเซ็น', 'bullet train', 'รถไฟหัวกระสุน', 'snow', 'หิมะ', 'tunnel', 'อุโมงค์', 'tokyo to niigata', 'โตเกียวไปนีงาตะ', '上越新幹線'],
    // a long white bullet train with a blue-and-pink stripe and a long smiling nose gliding over a white snow field, snow-laden firs and a dark mountain tunnel mouth on the left, big snowflakes falling
    scene('ng-d2', '#CFD8DC', P('M-4 120L60 70l70 50 40-30 74 40v100H-4z', '#90A4AE') + P('M60 70l-12 16 10-4 6 10 8-12zM170 90l-10 12 10-3 8 8z', '#FFFFFF', 0)
      + P('M-4 150c60-10 160-14 248 0v110H-4z', '#FFFFFF') + R(-4, 176, 248, 8, '#B0BEC5', 0) + R(-4, 204, 248, 5, '#90A4AE', 0, 0)
      + P('M-4 130c10-30 40-34 52-8l2 40H-4z', '#546E7A') + fir(206, 160, 1.2) + fir(176, 150, 0.8)
      + P('M30 168h150c20 0 40 4 54 12v18H30c-10 0-16-6-16-14s6-16 16-16z', '#FFFFFF') + R(26, 186, 208, 6, '#1E88E5', 0) + R(26, 192, 208, 3, '#F48FB1', 0)
      + R(60, 174, 18, 9, '#B3E5FC', 3, 2.5) + R(92, 174, 18, 9, '#B3E5FC', 3, 2.5) + R(124, 174, 18, 9, '#B3E5FC', 3, 2.5) + face(186, 184, 0.3)
      + [[40, 50], [90, 36], [150, 56], [200, 44], [120, 96]].map(([x, y]) => Lc(`M${x - 4} ${y}h8M${x} ${y - 4}v8`, '#FFFFFF', 2.5)).join(''))),
  D('ricefield', 'ทุ่งนาข้าวโคชิฮิคาริสีทองใต้ภูเขา', 'The golden koshihikari rice fields under the mountains', ['koshihikari', 'โคชิฮิคาริ', 'rice field', 'ทุ่งนา', 'rice paddy', 'นาข้าว', 'uonuma', 'อุโอะนุมะ', 'echigo plain', 'ที่ราบเอจิโกะ', 'harvest', 'เกี่ยวข้าว', 'niigata rice', 'ข้าวนีงาตะ'],
    // rows of golden rice with bowing ears curving across the foreground, a wooden drying rack of bundled rice on the right, a blue snow-capped range behind, a straw-hatted scarecrow with a smiling face
    scene('ng-d3', '#E1F5FE', P('M-4 110l40-34 30 24 44-44 50 50 36-26 50 34v70H-4z', '#7FA7E3') + P('M70 56l-10 14 8-4 6 10 6-12zM156 66l-8 10 8-2 6 6z', '#FFFFFF', 0)
      + P('M-4 108h248v20H-4z', '#81C784', 0) + [['#F6C945', 124], ['#E8B02A', 148], ['#F2BE3A', 174], ['#D99A00', 200]].map(([c, y], k) => P(`M-4 ${y}c40 ${k % 2 ? 12 : -10} 80 ${k % 2 ? -10 : 12} 124 0s80 ${k % 2 ? 12 : -10} 124 0v50H-4z`, c)).join('')
      + [[40, 150], [90, 170], [170, 160], [60, 200]].map(([x, y]) => Lc(`M${x} ${y}c6-14 16-14 20-4M${x + 6} ${y + 2}c6-12 14-12 18-2`, '#A66F00', 2.5)).join('')
      + R(182, 118, 4, 50, '#8D6E63', 0, 2.5) + R(214, 118, 4, 50, '#8D6E63', 0, 2.5) + Lc('M178 130h44M178 144h44', '#8D6E63', 3.5) + [190, 200, 210].map((x) => P(`M${x - 5} 120h10l-2 24h-6z`, '#F2BE3A', 2.5)).join('')
      + R(94, 100, 5, 40, '#8D6E63', 0, 2.5) + Lc('M82 112h30', '#8D6E63', 4) + C(96, 98, 12, '#FFE0B2') + P('M80 96h32l-16-14z', '#D7B26A') + face(96, 100, 0.3))),
  D('bandai', 'สะพานบันไดยามค่ำริมแม่น้ำชินาโนะ', 'Bandai Bridge at dusk over the Shinano river', ['bandai bridge', 'สะพานบันได', 'shinano river', 'แม่น้ำชินาโนะ', 'niigata city', 'เมืองนีงาตะ', 'arch bridge', 'สะพานโค้ง', 'riverside', 'ริมแม่น้ำ', 'dusk', 'ยามค่ำ', '萬代橋', 'bandaibashi'],
    // a long stone bridge of six low grey arches across a wide river at sunset, a round smiling sun sinking behind it, lamp posts glowing, reflections of orange on the water and a tiny passing ferry
    scene('ng-d4', '#FFE0B2', C(120, 100, 34, '#FF8A65', 3) + face(120, 100, 0.4) + P('M-4 130h248v30H-4z', '#FFCCBC', 0) + P('M-4 150h248v100H-4z', '#5C8FD6')
      + Lc('M20 170h40M100 184h60M170 168h50M40 200h50M140 208h60', '#FFCC80', 4)
      + R(-4, 118, 248, 12, '#B0BEC5', 3) + [0, 1, 2, 3, 4, 5].map((i) => P(`M${i * 40 - 8} 150a24 24 0 0 1 48 0v0z`, '#78909C', 3) + P(`M${i * 40 - 8} 150a24 24 0 0 1 48 0`, '#5C8FD6', 0)).join('') + R(-4, 130, 248, 20, '#B0BEC5', 3)
      + [20, 100, 180, 224].map((x) => Lc(`M${x} 118v-20`, '#455A64', 3.5) + C(x, 94, 5, '#FFF59D', 3)).join('')
      + g(176, 190, 1, P('M-26 0h52l-8 12h-36z', '#FFFFFF') + R(-10, -10, 20, 10, '#E53935', 3, 2.5)))),

  L('snowplay', 'สวนเล่นหิมะ เลื่อนหิมะลงเนิน', 'The snow-play park and its sledge slope', ['snow play', 'เล่นหิมะ', 'sledge', 'เลื่อนหิมะ', 'sled', 'snow park', 'สวนหิมะ', 'yuzawa', 'ยูซาวะ', 'snowball', 'ปั้นก้อนหิมะ', 'winter fun', 'ฤดูหนาว'],
    'หาเลื่อนสีแดงที่แล่นลงเนินหิมะ', 'Find the little red sledge sliding down the snow hill',
    // a white snow hill with a smiling red plastic sledge speeding down it, a round snowman with a carrot nose and a bucket hat at the bottom, a blue sky and falling flakes
    bg('#E3F2FD') + P('M16 150c50-70 120-90 208-70v114a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#FFFFFF') + Lc('M74 112c20 20 46 36 78 46', '#BBDEFB', 4)
      + g(112, 140, 1, P('M-26 0c0-10 10-14 24-14h40c12 0 18 6 14 14z', '#E53935') + Lc('M-20 12h58', '#B71C1C', 3) + face(6, -2, 0.3), 24)
      + C(176, 176, 18, '#FFFFFF') + C(176, 150, 13, '#FFFFFF') + P('M168 138h16l-2-12h-12z', '#1E88E5') + P('M176 152l12 2-12 3z', '#FF8F00', 2) + face(176, 150, 0.28, 'none') + Lc('M50 50l8 0M130 40h8M190 60h8', '#BBDEFB', 3) + frame),
  L('riceball', 'ข้าวปั้นโคชิฮิคาริห่อสาหร่าย', 'A koshihikari rice ball in its seaweed coat', ['onigiri', 'โอนิกิริ', 'rice ball', 'ข้าวปั้น', 'koshihikari', 'โคชิฮิคาริ', 'niigata rice', 'ข้าวนีงาตะ', 'nori', 'สาหร่าย', 'uonuma', 'อุโอะนุมะ', 'umeboshi', 'บ๊วยดอง'],
    'หาข้าวปั้นที่ยิ้มอยู่', 'Find the smiling rice ball',
    // two plump white triangular rice balls, the front one with a dark nori band and a red pickled plum on top, a few single grains scattered round and a small bamboo leaf under them
    P('M40 190c20-20 140-20 160 0-30 16-130 16-160 0z', '#81C784') + ball(86, 134, 1.1) + g(86, 134, 1.1, C(0, -4, 6, '#E53935', 3) + face(0, 14, 0.4))
      + g(160, 150, 0.8, P('M0-26c10 0 28 30 28 40 0 10-12 14-28 14S-28 24-28 14C-28 4-10-26 0-26z', '#FFFFFF') + R(-15, 4, 30, 22, '#263238', 3, 3) + face(0, -4, 0.45))
      + [[50, 80], [190, 100], [40, 160], [200, 176]].map(([x, y]) => E(x, y, 5, 3, '#FFFFFF', 2.5)).join('')),
  L('ricebag', 'ถุงข้าวนีงาตะที่ร้านข้าวในสถานีเอจิโกะยูซาวะ', 'The rice bag from the station’s rice shop', ['rice shop', 'ร้านข้าว', 'rice bag', 'ถุงข้าว', 'echigo-yuzawa station', 'สถานีเอจิโกะยูซาวะ', 'ponshukan', 'ปงชูกัน', 'rice paddle', 'ทัพพีข้าว', 'rice bowl', 'ชามข้าว', 'souvenir', 'ของฝาก'],
    'หาถุงข้าวที่มีหน้ายิ้ม', 'Find the rice bag with a smiling face',
    // a fat cream paper rice sack tied at the neck with red string and a green ear-of-rice label, a white bowl heaped with steaming rice and a wooden paddle leaning on it
    P('M70 80c-10 40-20 80-6 110h110c14-30 4-70-6-110z', '#F3E3C0') + P('M84 80l10-18h38l10 18z', '#E8D0A0') + Lc('M84 80c20 8 44 8 64 0', '#E53935', 4) + R(92, 118, 56, 44, '#FFFFFF', 8, 3)
      + Lc('M120 150v-24M112 146l4-14M128 146l-4-14', '#F6C945', 3) + C(120, 126, 3, '#F6C945', 0) + face(120, 176, 0.3)
      + P('M172 130h50c0 24-14 40-25 40s-25-16-25-40z', '#FFFFFF') + E(197, 130, 25, 8, '#FFFFFF') + E(197, 124, 20, 8, '#FFFFFF', 3) + Lc('M190 110c-4-8 4-10 0-18M204 108c-4-8 4-10 0-18', '#CFD8DC', 3)
      + Lc('M24 190l36-60', '#C69C6D', 7) + E(62, 126, 8, 14, '#C69C6D', 3)),
  L('dolphin', 'โลมากระโดดห่วงที่มารีนเปียนิฮงไก', 'A dolphin jumping through a hoop at Marine Pia Nihonkai', ['marine pia nihonkai', 'มารีนเปียนิฮงไก', 'aquarium', 'พิพิธภัณฑ์สัตว์น้ำ', 'dolphin show', 'โชว์โลมา', 'hoop', 'ห่วง', 'sea of japan', 'ทะเลญี่ปุ่น', 'niigata aquarium', 'โลมา'],
    'หาห่วงสีแดงที่โลมากำลังกระโดดผ่าน', 'Find the red hoop the dolphin is jumping through',
    // a blue pool with a smiling grey dolphin arching high through a red hoop held on a pole, water splashing, a round viewing window of the aquarium behind with a little fish, a beach ball floating
    bg('#E1F5FE') + P('M16 150h208v44a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#4FC3F7', 0) + Lc('M40 164c10-6 20 6 30 0M150 176c10-6 20 6 30 0', '#B3E5FC', 4) + C(190, 168, 10, '#FFFFFF', 3) + P('M184 168h12', '#E53935', 3)
      + Lc('M64 56v100', '#8D6E63', 5) + ol2(120, 78) + g(120, 80, 1, P('M-46 40c10-40 40-52 74-44 14 4 24 14 26 24-8-4-18-2-26 6-20 24-60 28-74 14z', '#90A4AE') + P('M-40 40l-16 10 4-18z', '#90A4AE', 3) + P('M-6-6l8-16 8 18z', '#90A4AE', 3) + P('M30 30c10 6 18 4 22-2-4 8-14 12-22 8z', '#CFD8DC', 2.5) + face(10, 6, 0.28))
      + Lc('M70 150l-6 12M80 154l4 10M100 156l-2 12', '#E1F5FE', 3.5)),
  L('taraibune', 'เรือถังไม้ทาไรบูเนะของเกาะซาโดะ', 'The round tarai tub boat of Sado island', ['sado island', 'เกาะซาโดะ', 'tarai bune', 'ทาไรบูเนะ', 'tub boat', 'เรือถัง', 'ogi', 'โอกิ', 'sazae', 'หอยเทอร์บัน', 'wooden tub', 'ถังไม้', 'sea of japan', '佐渡', 'たらい舟'],
    'หาเรือที่เหมือนถังไม้ใบกลม', 'Find the boat that looks like a round wooden tub',
    // a wide round wooden tub boat with bamboo hoops floating on turquoise water, a smiling woman-free scene: a little round boatman-less boat with a single long oar and a turban shell on its rim, rock island with a twisted pine behind
    bg('#E1F5FE') + P('M16 130h208v64a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#26C6DA', 0) + P('M150 130c10-30 40-40 74-30v30z', '#78909C') + Lc('M178 112v-14M176 100c-8-4-14 0-16 6M178 98c8-6 16-2 18 4', '#2E7D32', 4)
      + E(110, 168, 84, 18, '#B3E5FC', 0) + P('M40 150c-4 28 30 40 70 40s74-12 70-40z', '#C69C6D') + E(110, 150, 70, 14, '#D7B38A') + E(110, 150, 58, 9, '#8D6E63', 0) + Lc('M54 170c30 10 98 10 128 0M50 160c30 10 106 10 136 0', '#8D6E63', 3.5)
      + Lc('M100 154l70-70', '#6D4C41', 5) + P('M166 74l16 16-12 10-14-14z', '#A1887F', 3) + g(80, 142, 1, P('M0 0c0-16 20-22 26-8 4 10-10 20-22 16z', '#FFB74D') + C(14, -2, 2, INK, 0)) + face(120, 172, 0.34)
      + Lc('M30 202c10-5 20 5 30 0M150 208c10-5 20 5 30 0', '#E1F5FE', 4)),
  L('hegisoba', 'เฮกิโซบะ เส้นโซบะเรียงบนถาดไม้', 'Hegisoba, buckwheat noodles laid on a wooden tray', ['hegisoba', 'เฮกิโซบะ', 'soba', 'โซบะ', 'buckwheat noodles', 'เส้นบัควีท', 'wooden tray', 'ถาดไม้', 'funori', 'สาหร่ายฟุโนริ', 'uonuma', 'tsunan', 'へぎそば'],
    'หาถาดไม้สี่เหลี่ยมที่ใส่เส้นโซบะ', 'Find the square wooden tray holding the noodles',
    // a shallow square wooden tray with a pale grey-green bundle of noodles folded in neat hand-sized nests, a small dipping cup of dark sauce with a green onion, a pair of chopsticks, the tray smiling
    R(28, 96, 184, 92, '#C69C6D', 12) + R(40, 106, 160, 72, '#D7B38A', 8, 3) + Lc('M30 108h180M30 176h180', '#A1785A', 3)
      + [[72, 138], [120, 138], [168, 138]].map(([x, y]) => E(x, y, 22, 24, '#CFD8C0') + Lc(`M${x - 16} ${y - 10}c10 6 22 6 32 0M${x - 16} ${y}c10 6 22 6 32 0M${x - 14} ${y + 10}c10 6 22 6 28 0`, '#9FB096', 3)).join('')
      + R(168, 62, 36, 28, '#FFFFFF', 6) + E(186, 62, 18, 6, '#4E342E') + Lc('M178 56l10-12M186 54l12-10', '#66BB6A', 3.5)
      + Lc('M40 70l90 20M48 60l90 22', '#8D6E63', 4) + face(120, 168, 0.34, 'none')),
  L('sasadango', 'ซาซะดังโงะ ขนมห่อใบไผ่', 'Sasa-dango, sweet dumplings wrapped in bamboo leaves', ['sasa dango', 'ซาซะดังโงะ', 'bamboo leaf', 'ใบไผ่', 'dumpling', 'ขนมแป้ง', 'mugwort', 'โยโมงิ', 'red bean', 'ถั่วแดง', 'wagashi', 'ขนมญี่ปุ่น', 'ささだんご'],
    'หาห่อใบไผ่สีเขียวที่มัดเป็นพวง', 'Find the green bamboo-leaf bundle tied in a bunch',
    // a bunch of three long green bamboo-leaf parcels folded into points and tied with straw string in a bundle, one opened to show a round green mugwort dumpling with red-bean paste, a bamboo leaf sprig behind
    Lc('M40 70c30 20 60 30 110 30M60 50c26 26 60 40 100 44', '#66BB6A', 6)
      + [[84, 140, -20], [120, 144, 0], [156, 140, 20]].map(([x, y, r]) => g(x, y, 1, P('M0-48l20 40c4 16 0 40-20 50-20-10-24-34-20-50z', '#43A047') + Lc('M0-40v84', '#2E7D32', 3), r)).join('')
      + Lc('M104 138h32M106 150h28', '#E8C97A', 5) + face(120, 126, 0.3)
      + E(190, 190, 22, 16, '#8BC34A') + P('M172 188c6-12 30-12 36 0z', '#6D3B2E', 3) + C(190, 196, 3, INK, 0)),
  L('fishmarket', 'ตลาดปลาท่าเรือที่ปิอาบันไดมีปูและปลาสด', 'The harbour fish market at Pia Bandai with crab and fresh fish', ['pia bandai', 'ปิอาบันได', 'fish market', 'ตลาดปลา', 'crab', 'ปู', 'snow crab', 'ปูหิมะ', 'sea bream', 'ปลาทะเล', 'niigata port', 'ท่าเรือนีงาตะ', 'seafood', 'อาหารทะเล', 'ピア万代'],
    'หาปูตัวแดงที่โบกก้ามอยู่', 'Find the red crab waving its claws',
    // a striped market awning over a crate of crushed ice holding a big smiling red crab with raised claws, two silver fish and a squid, a hanging price tag, a blue harbour with a little boat behind
    P('M30 70h180l12 26H18z', '#1E88E5', 3) + P('M30 70h30l-6 26H18zM90 70h30l-2 26H78zM150 70h30l2 26h-34z', '#FFFFFF', 3) + R(36, 96, 6, 90, '#8D6E63', 0, 2.5) + R(198, 96, 6, 90, '#8D6E63', 0, 2.5)
      + R(40, 150, 160, 40, '#A1887F', 8) + E(120, 150, 78, 14, '#E1F5FE') + [[60, 146], [92, 150], [150, 144], [180, 150]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 2.5)).join('')
      + g(120, 128, 1, E(0, 0, 30, 20, '#E53935') + P('M-30-6c-20-6-24-22-12-26 10 0 14 10 18 18zM30-6c20-6 24-22 12-26-10 0-14 10-18 18z', '#E53935') + Lc('M-22 14l-10 8M-12 18l-6 10M22 14l10 8M12 18l6 10', '#E53935', 4) + face(0, -4, 0.36))
      + g(60, 130, 0.7, E(0, 0, 18, 8, '#B0BEC5', 3) + P('M16 0l12-8v16z', '#B0BEC5', 3) + C(-9, -1, 2, INK, 0), -10) + g(188, 134, 0.7, E(0, 0, 18, 8, '#B0BEC5', 3) + P('M-16 0l-12-8v16z', '#B0BEC5', 3) + C(9, -1, 2, INK, 0), 12)),
  L('sanshaku', 'ดอกไม้ไฟลูกยักษ์ซันชากุดามะที่นางาโอกะ', 'The giant sanshakudama firework of Nagaoka', ['nagaoka fireworks', 'ดอกไม้ไฟนางาโอกะ', 'sanshakudama', 'ซันชากุดามะ', 'fireworks', 'ดอกไม้ไฟ', 'nagaoka', 'นางาโอกะ', 'shinano river', 'summer festival', 'เทศกาลฤดูร้อน', '長岡花火', 'phoenix'],
    'หาดอกไม้ไฟลูกใหญ่ที่สุดบนท้องฟ้า', 'Find the biggest firework in the sky',
    // a huge round firework in the night sky, a golden core ringed by long red, pink and gold streaks that curl down into sparkling tails, a smiling little yellow spark in the middle, the dark river with tiny glowing reflections below
    R(16, 16, 208, 208, '#283593', 30) + P('M16 180h208v14a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#1A237E', 0) + Lc('M40 192h30M120 200h50M170 190h30', '#FFD54F', 3)
      + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => { const a = k * Math.PI / 6, c = ['#FF7043', '#F48FB1', '#FFD54F'][k % 3]; return Lc(`M${(120 + Math.cos(a) * 20).toFixed(1)} ${(92 + Math.sin(a) * 20).toFixed(1)}L${(120 + Math.cos(a) * 62).toFixed(1)} ${(92 + Math.sin(a) * 62).toFixed(1)}`, c, 7) + C(120 + Math.cos(a) * 68, 92 + Math.sin(a) * 68 + 6, 4, c, 0); }).join('')
      + C(120, 92, 24, '#FFD54F') + face(120, 90, 0.4) + frame),
  L('toki', 'นกโทกิหัวแดงแห่งเกาะซาโดะ', 'The Sado toki, the crested ibis with its red face', ['toki', 'โทกิ', 'crested ibis', 'นกไอบิสหงอน', 'sado island', 'เกาะซาโดะ', 'rice field bird', 'นกในนาข้าว', 'toki no mori park', 'สวนโทกิโนะโมริ', 'rare bird', 'นกหายาก', 'トキ'],
    'หานกขาวขาแดงที่ยืนอยู่ในนา', 'Find the white bird with red legs standing in the rice field',
    // a white-and-peachy ibis with a long down-curved dark beak, a red face patch and red legs, standing in a flooded rice paddy with young green shoots, small ripples around its feet
    P('M16 160h208v34a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#80DEEA', 0) + Lc('M40 176c10-5 20 5 30 0M150 190c10-5 20 5 30 0', '#E0F7FA', 4) + Lc('M36 170l4-16M48 172l4-18M184 170l4-16M196 172l4-18', '#66BB6A', 3.5)
      + Lc('M112 152v26M130 152v26', '#E53935', 5) + P('M108 178h-10M126 178h-10', '#E53935', 3) + E(120, 122, 40, 34, '#FFFFFF') + P('M150 120c20 4 30 20 22 34-12-4-20-14-22-34z', '#FFE0D4') + P('M90 112c-20-10-36-6-44 6 14-2 30 4 44 6z', '#FFFFFF', 3)
      + C(100, 82, 24, '#FFFFFF') + P('M84 74a20 20 0 0 1 24-8l-4 18z', '#EF5350', 2.5) + P('M82 86c-14 4-30 14-40 30 6 2 10 0 14-4 12-2 22-8 30-14z', '#455A64') + face(104, 92, 0.24, 'none')),
  L('goldmine', 'เหมืองทองซาโดะกับรถเข็นแร่และก้อนทอง', 'The Sado gold mine, its ore cart and golden nuggets', ['sado gold mine', 'เหมืองทองซาโดะ', 'sado kinzan', 'ซาโดะคินซัง', 'gold mine', 'เหมืองทอง', 'mine cart', 'รถเข็นแร่', 'gold nugget', 'ก้อนทอง', 'tunnel', 'อุโมงค์', 'aikawa', '佐渡金山'],
    'หารถเข็นสีฟ้าที่เต็มไปด้วยก้อนทอง', 'Find the blue cart full of gold nuggets',
    // a dark rock tunnel mouth held by two wooden beams with a glowing lantern, a short rail track leading out, a smiling little blue mine cart heaped with shiny gold nuggets, a pickaxe leaning on the rock
    P('M30 196V110c0-50 40-70 90-70s90 20 90 70v86z', '#78909C') + P('M62 196V122c0-30 24-44 58-44s58 14 58 44v74z', '#37474F') + R(54, 112, 12, 84, '#A1887F', 3) + R(174, 112, 12, 84, '#A1887F', 3) + R(54, 106, 132, 12, '#8D6E63', 4)
      + Lc('M120 106v10', INK, 3) + C(120, 122, 7, '#FFD54F', 3) + Lc('M84 202l-26 20M156 202l26 20M70 212h100', '#6D4C41', 4)
      + R(88, 156, 64, 36, '#1E88E5', 8) + [[98, 154], [114, 148], [130, 150], [144, 156]].map(([x, y]) => C(x, y, 8, '#FFC107', 3)).join('') + C(106, 214, 7, '#455A64', 3) + C(138, 214, 7, '#455A64', 3) + face(120, 174, 0.3)
      + Lc('M196 150l12 40', '#8D6E63', 5) + P('M188 146c10-8 22-6 28 4l-8 2c-6-4-12-4-20 0z', '#546E7A', 2.5)),
  L('lafrance', 'ลูกแพร์ลาฟรองซ์ผลโต หอมหวานของนีงาตะ', 'Niigata’s La France pears, big and sweet', ['la france pear', 'แพร์ลาฟรองซ์', 'pear', 'แพร์', 'niigata fruit', 'ผลไม้นีงาตะ', 'orchard', 'สวนผลไม้', 'western pear', 'แพร์ฝรั่ง', 'autumn fruit', 'ผลไม้ฤดูใบไม้ร่วง', 'ル レクチエ', 'le lectier'],
    'หาลูกแพร์ที่ยิ้มอยู่บนกิ่ง', 'Find the pear smiling on its branch',
    // two plump yellow-green pears with brown stalks and two green leaves hanging from a branch, the front one smiling with a little shine mark, a wooden fruit crate with a third pear below
    Lc('M24 56c50 6 130 6 192-6', '#8D6E63', 8) + P('M84 62c10-16 30-14 34-2z', '#66BB6A', 3) + P('M170 56c10-14 28-12 32 0z', '#66BB6A', 3)
      + g(100, 112, 1, Lc('M0-34v-16', '#6D4C41', 5) + P('M0-34c18 0 22 20 20 34 26 14 30 52-20 58s-46-44-20-58c-2-14 2-34 20-34z', '#CDDC39') + Lc('M-18 20c-4-10-2-20 4-26', '#F0F4C3', 3) + face(0, 20, 0.34))
      + g(176, 114, 0.8, Lc('M0-34v-14', '#6D4C41', 5) + P('M0-34c18 0 22 20 20 34 26 14 30 52-20 58s-46-44-20-58c-2-14 2-34 20-34z', '#D4E157') + face(0, 20, 0.4))
      + R(70, 180, 110, 34, '#C69C6D', 6) + Lc('M70 192h110M70 204h110', '#A1785A', 3) + E(125, 180, 26, 12, '#CDDC39')),
  L('senbei', 'ข้าวเกรียบคากิโนะทาเนะรูปพระจันทร์เสี้ยวกับถั่วลิสง', 'Kakinotane crescent rice crackers with peanuts', ['kakinotane', 'คากิโนะทาเนะ', 'rice cracker', 'ข้าวเกรียบญี่ปุ่น', 'senbei', 'เซมเบ้', 'arare', 'อาราเระ', 'peanuts', 'ถั่วลิสง', 'niigata snack', 'ขนมนีงาตะ', 'kameda', 'crescent', '柿の種'],
    'หาข้าวเกรียบรูปเสี้ยวพระจันทร์สีส้มที่ยิ้มอยู่', 'Find the orange crescent-shaped cracker that is smiling',
    // a small red snack packet with a window showing orange crescent crackers and round peanuts, a few crackers and peanuts spilled in front, one big smiling crescent
    P('M64 56h112l6 130H58z', '#E53935') + R(76, 96, 88, 56, '#FFF3E0', 8, 3) + Lc('M64 66h112', '#FFFFFF', 3) + Lc('M60 186h122', '#B71C1C', 4)
      + [[96, 118, 20], [136, 112, -30], [118, 138, 70]].map(([x, y, r]) => g(x, y, 1, P('M-16 0c4-14 22-14 32 0-8-6-24-6-32 0z', '#FF8F00', 3.5), r)).join('') + C(150, 138, 5, '#D7A86E', 2.5) + C(86, 140, 5, '#D7A86E', 2.5)
      + g(180, 206, 1, P('M-20 0c4-18 26-18 38 0-10-8-28-8-38 0z', '#FB8C00') + face(0, 4, 0.3, 'none')) + C(60, 210, 5, '#D7A86E', 2.5) + C(86, 214, 5, '#D7A86E', 2.5) + C(120, 218, 5, '#D7A86E', 2.5)),
  L('murakamisalmon', 'ปลาแซลมอนแขวนใต้ชายคาที่เมืองมุราคามิ', 'The salmon hung under the eaves of Murakami', ['murakami', 'มุราคามิ', 'salmon', 'แซลมอน', 'hanging salmon', 'ปลาแขวน', 'old townhouse', 'บ้านเก่า', 'miomote river', 'แม่น้ำมิโอโมเตะ', 'salted salmon', 'แซลมอนเค็ม', '村上', 'sake no machi'],
    'หาปลาแซลมอนตัวยิ้มที่แขวนห้อยอยู่', 'Find the smiling salmon hanging up',
    // an old townhouse front with dark wooden slats and a tiled roof, a row of silvery-pink salmon hanging by their tails under the eave, the middle one with a smiling face, a cloth noren curtain in the doorway
    P('M16 92l104-44 104 44v18H16z', '#546E7A') + Lc('M20 100h200', '#37474F', 3) + R(30, 110, 180, 90, '#8D6E63', 6) + [52, 74, 96, 118, 140, 162, 184].map((x) => Lc(`M${x} 112v86`, '#6D4C41', 3)).join('')
      + Lc('M44 126h152', '#A1785A', 5) + [[64, 0], [98, 8], [142, 6], [176, 0]].map(([x, y]) => Lc(`M${x} 126v10`, '#8D6E63', 3) + P(`M${x - 8} ${136 + y}c0 16 4 36 8 44 4-8 8-28 8-44z`, '#F4A28C', 3)).join('')
      + g(120, 128, 1, P('M-11 0c0 22 5 48 11 56 6-8 11-34 11-56z', '#F7B5A0') + P('M0 56l-8 14h16z', '#F4A28C', 3) + face(0, 20, 0.32))
      + R(104, 168, 32, 32, '#1E88E5', 3) + Lc('M120 168v32', '#FFFFFF', 3)),
  L('tulip', 'ทุ่งทิวลิปหลากสีที่เมืองโชเระ', 'The rows of tulips in the Seirō fields', ['tulip', 'ทิวลิป', 'tulip field', 'ทุ่งทิวลิป', 'seiro', 'เซโระ', 'niigata tulips', 'ทิวลิปนีงาตะ', 'spring flowers', 'ดอกไม้ฤดูใบไม้ผลิ', 'tulip fair', 'งานทิวลิป', 'チューリップ', 'windmill'],
    'หาทิวลิปสีแดงที่ยิ้มอยู่หน้าสุด', 'Find the smiling red tulip at the front',
    // rows of red, yellow, pink and white tulips in stripes across a green field leading to a small white windmill, one big red tulip in front smiling, snowy mountain far behind
    bg('#E3F2FD') + P('M16 90l50-24 36 20 40-30 50 34 32-16v32H16z', '#90CAF9') + P('M102 56l-8 10 6-2 4 8 6-10z', '#FFFFFF', 0) + low(100, '#8BC34A')
      + [['#E53935', 116], ['#FFD54F', 134], ['#F48FB1', 152], ['#FFFFFF', 168]].map(([c, y]) => [34, 64, 94, 124, 154, 184].map((x) => P(`M${x - 6} ${y}c0 8 4 12 6 12s6-4 6-12l-3 3-3-5-3 5z`, c, 2.5)).join('')).join('')
      + R(168, 74, 18, 34, '#FFFFFF', 3) + P('M164 76l22-6-4-16z', '#E53935', 3) + Lc('M177 84l-18-20M177 84l22-14M177 84l16 24M177 84l-20 14', '#8D6E63', 3)
      + g(100, 190, 1, Lc('M0 0v30', '#43A047', 5) + P('M-26 0c0-24 8-34 26-34s26 10 26 34c-8-8-12-8-18-4-4-6-10-6-16 0-4-4-10-4-18 4z', '#E53935') + face(0, -10, 0.34))),
];

// a round hoop on its pole for the dolphin (ink-outlined red ring)
function ol2(cx, cy) { return Lc(`M${cx - 4} ${cy}a30 30 0 1 0 60 0a30 30 0 1 0-60 0`, INK, 12) + Lc(`M${cx - 4} ${cy}a30 30 0 1 0 60 0a30 30 0 1 0-60 0`, '#E53935', 7); }

export default {
  places: {
    'jp-niigata': { country: 'jp', wave: 3, name: nm('นีงาตะและเอจิโกะยูซาวะ', 'Niigata and Echigo-Yuzawa'), tz: 'Asia/Tokyo', ll: [37.92, 139.04],
      alias: ['niigata', 'นีงาตะ', '新潟', 'echigo-yuzawa', 'echigo yuzawa', 'เอจิโกะยูซาวะ', '越後湯沢', 'yuzawa town', 'gala yuzawa', 'กาล่ายูซาวะ', 'nagaoka', 'นางาโอกะ', '長岡', 'sado island', 'sado', 'เกาะซาโดะ', '佐渡',
        'murakami', 'มุราคามิ', 'uonuma', 'อุโอะนุมะ', 'bandai bridge', 'สะพานบันได', 'pia bandai', 'marine pia nihonkai', 'มารีนเปียนิฮงไก', 'niigata city', 'joetsu shinkansen', 'ชินคันเซ็นโจเอ็ตสึ', 'tsunan', 'minamiuonuma'],
      colors: NG },
  },
  items,
};
