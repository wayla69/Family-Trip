// Wave 9, Japan part 1: Tokyo, Osaka, Kyoto, Hokkaido, Fukuoka, Okinawa — new landmarks
// Shrines, temples and gates appear only as buildings, with no figures (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (jp/tokyo/landmark-taiyaki.v1.svg → jp-tokyo.landmark.taiyaki)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +v.toFixed(1);
// a simple pine on a short trunk
const pine = (x, y, s = 1) => g(x, y, s, Lc('M0 0v-10', '#6D4C41', 4) + P('M-14-8h28l-14-26z', '#2E7D32', 2.5) + P('M-10-22h20l-10-18z', '#388E3C', 2));
// a daisy-like flower head
const bloom = (x, y, r, c) => ring(5, (k) => { const a = k * 2 * Math.PI / 5; return C(f1(x + r * Math.cos(a)), f1(y + r * Math.sin(a)), r * 0.7, c, 0); }) + C(x, y, r * 0.55, '#FFD54F', 0);

const items = [
  // ---------- Tokyo
  L('jp/tokyo/landmark-taiyaki.v1.svg', 'ไทยากิ ขนมรูปปลาไส้ถั่วแดง ย่านอาซาบุจูบัง', 'Taiyaki, the fish-shaped cake of Azabu-Jūban', ['taiyaki', 'ไทยากิ', 'fish-shaped cake', 'ขนมรูปปลา', 'anko', 'ไส้ถั่วแดง', 'azabu-juban', 'อาซาบุจูบัง', 'fish waffle', 'ขนมปลาญี่ปุ่น'], 'หาไส้ถั่วแดงที่โผล่ออกมาจากปากปลา', 'Find the red bean filling peeking out of the fish\'s mouth',
    // an open black iron mould with two fish-shaped hollows behind, and a big golden fish-shaped cake with scale marks, a paper sleeve round its tail and red bean paste peeping from its mouth
    g(150, 66, 1, R(-70, -30, 140, 56, '#455A64', 10) + ring(2, (k) => P(`M${-56 + k * 66} -2c4-14 22-20 40-14l10-8c2 8 2 16 0 24l-10-8c-18 6-36 0-40-12z`, '#37474F', 2)) + Lc('M-70 0h-30', '#6D4C41', 8), -6)
      + P('M30 140c4-34 50-56 104-46 14 3 26 8 36 16l26-24c6 26 6 52 0 78l-26-24c-10 8-22 13-36 16-54 10-100-8-104-16z', '#E0A44A')
      + ring(4, (k) => Lc(`M${96 + k * 16} 118q8 10 0 20M${96 + k * 16} 138q8 10 0 20`, '#C27F2A', 2.5)) + Lc('M68 104q-8 18 2 40', '#C27F2A', 3)
      + P('M30 140c6-8 18-8 24 2-6 8-18 8-24-2z', '#7B2D2D', 2.5) + C(52, 122, 5, '#5D4037', 0)
      + R(150, 90, 40, 98, '#FFF8E1', 4) + Lc('M156 106h28M156 172h28', '#E57373', 4) + face(100, 128, 0.42)
      + Lc('M80 70q-8-12 0-24M104 66q-8-12 0-24', '#B0BEC5', 4)),
  L('jp/tokyo/landmark-bigsight.v1.svg', 'โตเกียวบิ๊กไซต์ ตึกพีระมิดกลับหัว', 'Tokyo Big Sight and its upside-down pyramids', ['tokyo big sight', 'โตเกียวบิ๊กไซต์', 'big sight', 'บิ๊กไซต์', 'ariake', 'อาริอาเกะ', 'upside-down pyramids', 'พีระมิดกลับหัว', 'exhibition centre', 'ศูนย์แสดงสินค้า'], 'หาพีระมิดสี่อันที่ยืนกลับหัวอยู่บนขาเล็กๆ', 'Find the four pyramids standing upside down on thin legs',
    // a low glass hall with four grey pyramids balanced upside down on thin legs on top, two in front and two behind, a wide plaza with a child waving
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#CFD8DC', 0, 0)
      + [[92, 58, 0.8], [158, 58, 0.8]].map(([x, y, s]) => g(x, y, s, P('M-44 0h88l-44 62z', '#90A4AE') + Lc('M-22 0l22 62M22 0l-22 62', '#B0BEC5', 3))).join('')
      + Lc('M92 108v40M158 108v40', '#78909C', 5)
      + [[68, 70], [176, 70]].map(([x, y]) => g(x, y, 1, P('M-46 0h92l-46 66z', '#B0BEC5') + Lc('M-24 0l24 66M24 0l-24 66M-46 0h92', '#ECEFF1', 3) + R(-46, -6, 92, 8, '#78909C', 2, 2.5))).join('')
      + Lc('M68 136v14M176 136v14', '#78909C', 6) + R(20, 148, 200, 50, '#81D4FA') + ring(9, (k) => Lc(`M${36 + k * 21} 152v42`, '#E1F5FE', 3)) + R(100, 168, 40, 30, '#B3E5FC', 0, 2.5)
      + face(176, 92, 0.38) + kid(40, 230, '#7E57C2', 0.85)),
  L('jp/tokyo/landmark-ningyoyaki.v1.svg', 'นิงเงียวยากิ ขนมไข่รูปนกพิราบและเจดีย์ที่อาซากุสะ', 'Ningyō-yaki, the little shaped sponge cakes of Asakusa', ['ningyo-yaki', 'ningyoyaki', 'นิงเงียวยากิ', 'asakusa', 'อาซากุสะ', 'nakamise', 'นากามิเซะ', 'sponge cake', 'ขนมไข่ญี่ปุ่น', 'pigeon-shaped cake', 'ขนมรูปนกพิราบ'], 'หาขนมที่เป็นรูปนกพิราบ', 'Find the cake shaped like a pigeon',
    // a wooden tray of small golden sponge cakes: a pigeon, a five-roofed pagoda and a round drum, one broken open with dark red bean paste inside
    R(14, 150, 212, 60, '#A1673F', 10) + R(22, 156, 196, 46, '#C68642', 6, 3)
      + g(66, 122, 1, P('M-34 10c0-24 16-38 34-38 10 0 18 6 20 14l14 2-12 8c4 18-8 30-28 30-16 0-28-6-28-16z', '#E8A94E') + C(10, -16, 3.5, '#5D4037', 0) + Lc('M-20 0q10 10 22 0', '#C9832E', 3) + face(-8, 4, 0.3))
      + g(126, 110, 1, ring(4, (k) => P(`M${-22 + k * 4} ${30 - k * 18}h${44 - k * 8}l6 -8h${-56 + k * 8}z`, '#E8A94E', 2.5)) + R(-12, 32, 24, 18, '#E8A94E', 2, 2.5) + Lc('M0-50v-12', '#C9832E', 3) + face(0, 40, 0.24))
      + g(184, 128, 1, C(0, 0, 26, '#E8A94E') + C(0, 0, 18, 'none', 2.5) + ring(6, (k) => { const a = k * Math.PI / 3; return C(f1(22 * Math.cos(a)), f1(22 * Math.sin(a)), 2.2, '#C9832E', 0); }) + face(0, 0, 0.34))
      + g(120, 188, 1, P('M-28 0c0-12 12-18 28-18v36c-16 0-28-6-28-18z', '#E8A94E') + E(-8, 0, 10, 8, '#7B2D2D', 2) + P('M6 -18c14 0 24 6 24 18s-10 18-24 18z', '#E8A94E') + E(12, 0, 8, 7, '#7B2D2D', 2))),
  L('jp/tokyo/landmark-kabukiza.v1.svg', 'โรงละครคาบูกิซะ ย่านกินซ่า', 'The Kabukiza theatre in Ginza', ['kabukiza', 'kabuki-za', 'คาบูกิซะ', 'kabuki', 'คาบูกิ', 'kabuki theatre', 'โรงละครคาบูกิ', 'higashi-ginza', 'ฮิงาชิกินซ่า', 'ginza theatre'], 'หาหลังคาโค้งเป็นคลื่นตรงกลางด้านหน้าโรงละคร', 'Find the wavy curved roof over the middle of the front',
    // a cream theatre front under dark tiled roofs, a big wavy curved gable over the middle entrance, red-and-white banners hanging down, a tall glass tower rising behind
    sky('#FFF3E0') + R(130, 10, 70, 120, '#B3E5FC') + ring(4, (k) => Lc(`M${144 + k * 16} 16v108`, '#E1F5FE', 3)) + R(-4, 206, 248, 38, '#BDBDBD', 0, 0)
      + R(14, 120, 212, 88, '#FFF8E1') + P('M4 124l20-26h192l20 26z', '#455A64') + P('M24 98l18-14h156l18 14z', '#546E7A')
      + P('M70 124c0-28 18-46 50-46s50 18 50 46c-10-8-20-10-24-4-6-16-46-16-52 0-4-6-14-4-24 4z', '#37474F') + C(120, 96, 8, '#FFD54F', 2.5)
      + R(88, 150, 64, 58, '#B71C1C', 0, 3) + R(98, 160, 44, 48, '#5D4037', 0, 2.5)
      + [[30, '#E53935'], [52, '#FFFFFF'], [170, '#E53935'], [192, '#FFFFFF']].map(([x, c]) => R(x, 132, 16, 52, c, 2, 2.5) + Lc(`M${x + 4} 142h8M${x + 4} 152h8`, c === '#FFFFFF' ? '#E53935' : '#FFFFFF', 2)).join('')
      + face(120, 130, 0.34)),

  // ---------- Osaka
  L('jp/osaka/landmark-grandring.v1.svg', 'แกรนด์ริง วงแหวนไม้ยักษ์ที่ยูเมะชิมะ', 'The wooden Grand Ring at Yumeshima', ['grand ring', 'แกรนด์ริง', 'yumeshima', 'ยูเมะชิมะ', 'expo 2025', 'เอ็กซ์โป 2025', 'wooden ring', 'วงแหวนไม้', 'expo site', 'งานเอ็กซ์โป'], 'หาเสาไม้ที่ขัดกันเป็นตารางใต้วงแหวน', 'Find the criss-cross wooden posts under the ring',
    // a huge ring of wooden posts and beams seen from the side, a grassy walkway on top with tiny people, the sea glittering behind
    sky('#E1F5FE') + R(-4, 110, 248, 40, '#4FC3F7', 0, 0) + Lc('M20 124h30M180 132h40', '#B3E5FC', 3) + R(-4, 150, 248, 94, '#E0E0E0', 0, 0)
      + E(120, 130, 112, 36, 'none', 0) + P('M8 130c0-20 50-36 112-36s112 16 112 36v44c0-20-50-36-112-36S8 154 8 174z', '#D7A86E')
      + ring(12, (k) => Lc(`M${18 + k * 18.5} ${k < 6 ? 120 - k * 3 : 106 + (k - 6) * 3}v${50}`, '#A1673F', 3)) + Lc('M8 150c20-14 60-22 112-22s92 8 112 22', '#A1673F', 3)
      + P('M8 174c0-20 50-36 112-36s112 16 112 36v34c0 20-50 30-112 30S8 228 8 208z', '#C68642')
      + ring(13, (k) => Lc(`M${14 + k * 17.5} ${180 + Math.abs(k - 6) * -1}v${46 - Math.abs(k - 6) * 2}`, '#8D5524', 3.5)) + Lc('M8 196c30 14 70 18 112 18s82-4 112-18', '#8D5524', 3.5)
      + P('M8 130c0-20 50-36 112-36s112 16 112 36c-6-12-50-24-112-24S14 118 8 130z', '#8BC34A') + kid(70, 108, '#FF7043', 0.6) + kid(150, 104, '#29B6F6', 0.6) + face(120, 196, 0.42)),
  L('jp/osaka/landmark-nambayasaka.v1.svg', 'เวทีหัวสิงโตยักษ์ของศาลเจ้านัมบะยาซากะ', 'The giant lion-head stage of Namba Yasaka Shrine', ['namba yasaka', 'นัมบะยาซากะ', 'lion head stage', 'เวทีหัวสิงโต', 'shishiden', 'ชิชิเด็น', 'namba yasaka shrine', 'ศาลเจ้านัมบะยาซากะ', 'giant lion head', 'หัวสิงโตยักษ์'], 'หาปากกว้างๆ ของหัวสิงโตที่เป็นเวที', 'Find the lion\'s wide-open mouth that is a stage',
    // a building shaped like a huge green lion head under a little tiled roof, round gold eyes, white teeth round a wide red mouth with a tiny wooden stage inside, curly mane
    R(-4, 210, 248, 34, '#D7CCC8', 0, 0) + P('M40 52l80-26 80 26-10 10H50z', '#455A64')
      + P('M34 120c0-56 38-62 86-62s86 6 86 62v70c0 14-10 22-24 22H58c-14 0-24-8-24-22z', '#4CAF50')
      + ring(5, (k) => C(44 + k * 38, 64 + (k % 2) * 6, 14, '#2E7D32', 2.5))
      + [86, 154].map((x) => C(x, 98, 20, '#FFD54F') + C(x, 100, 9, '#22213A', 0) + C(x + 4, 95, 3, '#FFFFFF', 0)).join('') + Lc('M62 74q24-12 44 0M134 74q24-12 44 0', '#1B5E20', 5)
      + E(120, 128, 18, 10, '#2E7D32') + P('M56 150c20-10 108-10 128 0v50H56z', '#C62828') + R(80, 176, 80, 24, '#A1673F', 0, 2.5) + Lc('M84 186h72', '#8D5524', 2)
      + ring(6, (k) => P(`M${62 + k * 20} 150l8 12 8-12z`, '#FFFFFF', 2)) + ring(6, (k) => P(`M${62 + k * 20} 200l8-10 8 10z`, '#FFFFFF', 2))),
  L('jp/osaka/landmark-kitsuneudon.v1.svg', 'คิตสึเนะอุด้ง อุด้งเต้าหู้ทอดหวาน ต้นตำรับโอซาก้า', 'Kitsune udon, Osaka\'s noodles with sweet fried tofu', ['kitsune udon', 'คิตสึเนะอุด้ง', 'udon', 'อุด้ง', 'aburaage', 'อาบุระอาเกะ', 'sweet fried tofu', 'เต้าหู้ทอดหวาน', 'osaka udon', 'อุด้งโอซาก้า'], 'หาแผ่นเต้าหู้ทอดสีน้ำตาลทองที่ลอยอยู่บนเส้น', 'Find the golden fried tofu sheet floating on the noodles',
    // a deep black-and-red bowl of clear golden broth with thick white udon noodles, a big puffy golden sheet of fried tofu on top, a pink-swirl fish cake slice and green onions, chopsticks resting on the rim
    P('M20 120h200c0 60-40 96-100 96S20 180 20 120z', '#C62828') + P('M36 140c10 50 40 70 84 70s74-20 84-70', '#212121', 0) + E(120, 120, 100, 26, '#212121') + E(120, 120, 90, 20, '#F6C25B', 3)
      + ring(5, (k) => Lc(`M${48 + k * 30} 116c10 4 20-4 30 0`, '#FFF8E1', 6))
      + g(108, 112, 1, R(-38, -20, 76, 34, '#C9832E', 10) + R(-32, -15, 64, 24, '#E0A44A', 8, 0) + ring(5, (k) => C(-22 + k * 11, -4 + (k % 2) * 6, 2, '#B26A36', 0)) + face(0, -4, 0.34), -6)
      + g(172, 116, 1, C(0, 0, 14, '#FFFFFF') + Lc('M-6-2c0-6 10-6 10 0s-14 8-14 0 10-14 16-6', '#F06292', 3))
      + ring(5, (k) => C(150 + k * 9, 104 + (k % 2) * 6, 4, '#8BC34A', 1.5)) + Lc('M180 40l-60 76M196 46l-62 72', '#A1673F', 6)),
  L('jp/osaka/landmark-doguyasuji.v1.svg', 'โดกุยะซูจิ ถนนขายเครื่องครัวในเซ็นนิจิมาเอะ', 'Doguyasuji, Osaka\'s kitchen-tool street', ['doguyasuji', 'โดกุยะซูจิ', 'sennichimae', 'เซ็นนิจิมาเอะ', 'kitchen tools', 'เครื่องครัว', 'takoyaki pan', 'กระทะทาโกยากิ', 'kitchen street', 'ถนนเครื่องครัว'], 'หากระทะหลุมๆ สำหรับทำทาโกยากิ', 'Find the dimpled pan for making takoyaki',
    // a little shop front with a short blue curtain, ladles, sieves and pots hanging from a rail, a stack of black dimpled takoyaki pans and copper pots on the counter
    R(10, 30, 220, 180, '#FFF3E0', 6) + R(10, 30, 220, 26, '#5D4037', 4) + ring(5, (k) => P(`M${18 + k * 42} 56h40v24c-10 6-30 6-40 0z`, '#1E88E5', 2.5))
      + Lc('M20 92h200', '#8D6E63', 4) + ring(4, (k) => { const x = 40 + k * 50; return Lc(`M${x} 92v26`, '#B0BEC5', 3) + (k % 2 ? C(x, 128, 12, '#CFD8DC') + Lc(`M${x - 8} 124h16M${x - 8} 132h16`, '#90A4AE', 1.5) : E(x, 126, 12, 8, '#B0BEC5')); })
      + R(20, 168, 200, 42, '#A1673F', 4) + g(84, 158, 1, R(-44, -14, 88, 22, '#37474F', 6) + ring(8, (k) => C(-35 + (k % 4) * 23, -8 + Math.floor(k / 4) * 10, 4.5, '#212121', 0)) + Lc('M44-4h20', '#5D4037', 6))
      + g(170, 150, 1, P('M-26-16h52v26c0 8-8 12-26 12s-26-4-26-12z', '#D4874B') + Lc('M26-10h14M-26-10h-14', '#8D5524', 5) + face(0, -2, 0.36))),
  L('jp/osaka/landmark-kaitenzushi.v1.svg', 'ซูชิสายพาน ไอเดียที่เกิดในโอซาก้า', 'Conveyor-belt sushi, first served in Osaka', ['kaitenzushi', 'kaiten-zushi', 'ไคเท็นซูชิ', 'conveyor belt sushi', 'ซูชิสายพาน', 'sushi train', 'รถไฟซูชิ', 'higashi-osaka', 'ฮิงาชิโอซาก้า', 'colour plates', 'จานสี'], 'หาจานสีต่างๆ ที่วิ่งไปบนสายพาน', 'Find the coloured plates riding round on the belt',
    // a long curved conveyor belt carrying plates of different colours with sushi on them, a hot-water tap and a pile of empty plates at the counter
    R(-4, 160, 248, 84, '#D7B98E', 0, 0) + P('M-4 90h248v52H-4z', '#B0BEC5') + Lc('M-4 104h248M-4 128h248', '#78909C', 3)
      + [[22, '#E53935', 'tuna'], [74, '#FDD835', 'egg'], [126, '#43A047', 'cucumber'], [178, '#1E88E5', 'salmon']].map(([x, c, t]) => g(x + 10, 110, 1, E(0, 6, 22, 7, c) + (t === 'tuna' ? R(-14, -10, 28, 12, '#FFFFFF', 4, 2) + R(-16, -16, 32, 8, '#E57373', 3, 2)
        : t === 'egg' ? R(-14, -10, 28, 12, '#FFFFFF', 4, 2) + R(-16, -18, 32, 10, '#FFD54F', 3, 2) + Lc('M0-18v18', '#212121', 4)
        : t === 'cucumber' ? C(-8, -6, 8, '#212121', 2) + C(-8, -6, 4, '#8BC34A', 0) + C(9, -6, 8, '#212121', 2) + C(9, -6, 4, '#8BC34A', 0)
        : R(-14, -10, 28, 12, '#FFFFFF', 4, 2) + R(-16, -16, 32, 8, '#FFAB91', 3, 2) + Lc('M-10-14l4 6M0-14l4 6M10-14l4 6', '#FFFFFF', 1.5)))).join('')
      + face(84, 98, 0.24) + ring(4, (k) => E(196, 196 - k * 8, 22, 6, ['#E53935', '#FDD835', '#43A047', '#1E88E5'][k])) + g(40, 196, 1, R(-14, -20, 28, 30, '#78909C', 4) + Lc('M14-10h10v8', '#546E7A', 4)) + g(120, 206, 1, P('M-14-16h28l-4 26h-20z', '#ECEFF1') + Lc('M-10-6h20', '#4CAF50', 3))),

  // ---------- Kyoto
  L('jp/kyoto/landmark-nijo.v1.svg', 'ประตูคาระมงแห่งปราสาทนิโจ', 'The Karamon gate of Nijō Castle', ['nijo castle', 'nijō castle', 'ปราสาทนิโจ', 'karamon', 'คาระมง', 'ninomaru', 'นิโนะมารุ', 'nightingale floor', 'พื้นนกไนติงเกล', 'shogun palace', 'วังโชกุน'], 'หาลายดอกไม้สีทองบนหลังคาประตู', 'Find the gold flower patterns on the gate\'s roof',
    // an ornate gate with a curving cypress-bark roof, black beams covered in gold flower patterns, white plaster walls either side, a child tiptoeing on a wooden floor that sings with little notes
    sky('#FFF8E1') + R(-4, 200, 248, 44, '#D7CCC8', 0, 0) + R(-4, 120, 60, 80, '#FFFFFF') + R(184, 120, 60, 80, '#FFFFFF') + P('M-4 120l10-14h50l6 14zM184 120l6-14h54v14z', '#455A64')
      + R(64, 110, 112, 90, '#3E2723') + R(78, 130, 84, 70, '#5D4037', 0, 2.5) + Lc('M120 130v70', '#3E2723', 4)
      + P('M48 112c10-30 40-42 72-42s62 12 72 42c-14-6-30-8-44-2-6-20-50-20-56 0-14-6-30-4-44 2z', '#8D6E63') + Lc('M60 104c20-20 100-20 120 0', '#6D4C41', 3)
      + R(64, 112, 112, 14, '#212121', 0, 3) + ring(5, (k) => bloom(78 + k * 21, 119, 3.6, '#FFD54F')) + C(120, 84, 7, '#FFD54F', 2.5) + ring(2, (k) => bloom(96 + k * 48, 150, 5, '#FFD54F'))
      + face(120, 166, 0.4) + R(150, 216, 90, 10, '#A1673F', 2, 2.5) + kid(196, 214, '#29B6F6', 0.8) + g(222, 186, 1, C(0, 0, 5, '#5C6BC0', 2) + Lc('M5 0v-16l8 4', '#5C6BC0', 2.5))),
  L('jp/kyoto/landmark-kyototower.v1.svg', 'เกียวโตทาวเวอร์ หอคอยสีขาวหน้าสถานีเกียวโต', 'Kyoto Tower opposite Kyoto Station', ['kyoto tower', 'เกียวโตทาวเวอร์', 'kyoto station', 'สถานีเกียวโต', 'shiokoji', 'ชิโอโคจิ', 'observation deck', 'จุดชมวิว', 'white tower', 'หอคอยสีขาว'], 'หายอดเสาแหลมสีแดงขาวบนหอคอย', 'Find the red-and-white tip on top of the tower',
    // a slim white tower rising from the roof of a low building, a round red observation deck near the top, a pointed red-and-white tip, little old tiled roofs at its foot
    sky('#E3F2FD') + R(60, 150, 120, 60, '#ECEFF1') + ring(5, (k) => R(70 + k * 22, 160, 14, 12, '#90CAF9', 2, 2)) + R(60, 140, 120, 12, '#B0BEC5', 0, 3)
      + P('M106 140l6-90h16l6 90z', '#FFFFFF') + R(98, 40, 44, 20, '#E53935', 8) + R(102, 44, 36, 8, '#B3E5FC', 3, 2)
      + P('M110 40l10-30 10 30z', '#FFFFFF') + Lc('M115 26h10', '#E53935', 4) + Lc('M120 10v-8', '#E53935', 3) + face(120, 104, 0.32)
      + [[24, 212], [216, 212]].map(([x, y]) => P(`M${x - 26} ${y}l10-16h32l10 16z`, '#455A64') + R(x - 18, y, 36, 26, '#FFF8E1', 0, 2.5)).join('') + R(-4, 230, 248, 14, '#BDBDBD', 0, 0)),
  L('jp/kyoto/landmark-matchaparfait.v1.svg', 'พาร์เฟต์ชาเขียวมัทฉะแห่งอุจิ', 'An Uji matcha parfait', ['matcha parfait', 'พาร์เฟต์มัทฉะ', 'matcha', 'มัทฉะ', 'uji', 'อุจิ', 'green tea ice cream', 'ไอศกรีมชาเขียว', 'uji tea', 'ชาอุจิ'], 'หาดังโงะสามลูกที่เสียบอยู่บนยอดพาร์เฟต์', 'Find the three little dumplings on top of the parfait',
    // a tall glass with layers of green jelly, cream, crunchy flakes and red beans, a scoop of green ice cream on top with a skewer of three dango and a little leaf biscuit, a whisk beside it
    P('M74 90h92l-14 100h-64z', '#F1F8E9') + R(108, 190, 24, 18, '#F1F8E9', 0, 3) + E(120, 214, 34, 8, '#F1F8E9')
      + P('M80 150h80l-6 40H86z', '#7CB342', 0) + P('M78 128h84l-2 22H80z', '#FFF8E1', 0) + ring(6, (k) => C(86 + k * 13, 140, 4, '#E8B04B', 0)) + P('M76 106h88l-2 22H78z', '#6D2E2E', 0) + ring(6, (k) => C(84 + k * 14, 116, 4, '#8E3A3A', 0))
      + P('M74 90h92l-14 100h-64z', 'none') + C(120, 78, 30, '#9CCC65') + C(100, 66, 14, '#FFFFFF', 3) + face(120, 84, 0.42)
      + Lc('M150 30l-20 52', '#C8A16B', 3) + [36, 50, 64].map((d) => C(f1(150 - d * 0.38), f1(30 + d - 22), 8, '#F8BBD0', 2.5)).join('')
      + P('M70 60c-8-14 4-26 16-18-4 8-8 14-16 18z', '#43A047', 2.5)
      + g(196, 180, 1, P('M-12 0h24l-4-40h-16z', '#F5DEB3') + ring(5, (k) => Lc(`M${-8 + k * 4} -2l${-2 + k} -36`, '#D2B48C', 1.5)) + R(-14, 0, 28, 14, '#C8A16B', 3))),
  L('jp/kyoto/landmark-nanzenji.v1.svg', 'ประตูซันมงของวัดนันเซ็นจิ', 'The great Sanmon gate of Nanzen-ji', ['nanzenji', 'nanzen-ji', 'วัดนันเซ็นจิ', 'sanmon', 'ประตูซันมง', 'temple gate', 'ประตูวัด', 'okazaki', 'โอกาซากิ', 'two-storey gate', 'ประตูสองชั้น'], 'หาระเบียงชั้นบนที่ยื่นรอบประตู', 'Find the balcony running round the upper floor',
    // a huge two-storey wooden gate with deep curving tiled roofs, a railed balcony round the upper floor, thick round pillars and three openings below, autumn maples either side (the building only)
    sky('#FFF3E0') + R(-4, 210, 248, 34, '#BCAAA4', 0, 0)
      + [[16, 120], [224, 130]].map(([x, y]) => C(x, y, 30, '#EF6C00') + C(x + 10, y + 20, 22, '#E53935')).join('')
      + P('M24 132l24-22h144l24 22z', '#455A64') + R(50, 132, 140, 78, '#8D5524') + ring(4, (k) => R(54 + k * 42, 132, 10, 78, '#6D4C41', 0, 2.5)) + ring(3, (k) => R(72 + k * 42, 150, 22, 60, '#3E2723', 0, 2.5))
      + R(56, 82, 128, 30, '#A1673F') + R(42, 106, 156, 8, '#5D4037', 0, 3) + ring(9, (k) => Lc(`M${48 + k * 18} 106v-10`, '#5D4037', 2.5)) + Lc('M42 96h156', '#5D4037', 3)
      + P('M20 84c30-6 40-30 100-34 60 4 70 28 100 34z', '#37474F') + Lc('M40 70c20-6 50-18 80-18s60 12 80 18', '#546E7A', 3) + face(120, 92, 0.34)),
  L('jp/kyoto/landmark-amanohashidate.v1.svg', 'อามาโนะฮาชิดาเตะ สันทรายสะพานสวรรค์', 'Amanohashidate, the pine-covered sandbar to heaven', ['amanohashidate', 'อามาโนะฮาชิดาเตะ', 'miyazu', 'มิยาซุ', 'bridge to heaven', 'สะพานสวรรค์', 'pine sandbar', 'สันทรายต้นสน', 'matanozoki', 'มาตะโนะโซกิ'], 'หาเด็กที่ก้มมองลอดหว่างขา', 'Find the child peeking upside down between their legs',
    // a long thin sandbar lined with green pines curving across a blue bay between hills, seen from a lookout where a child bends over to look at it between their legs
    sky('#E1F5FE') + P('M-4 70c40-20 80-20 120-6s80 0 128-10v40H-4z', '#81C784') + R(-4, 92, 248, 110, '#4FC3F7', 0, 0)
      + P('M-4 150c50-10 90-40 140-56 30-10 60-8 108-12', 'none') + Lc('M-4 150c50-10 90-40 140-56 30-10 60-8 108-12', '#FFE0B2', 14)
      + ring(10, (k) => { const t = k / 9; return C(f1(4 + t * 230), f1(150 - t * 64 + (t > 0.6 ? (t - 0.6) * 60 : 0) - 8), 8, '#2E7D32', 2); })
      + P('M-4 200c60-16 180-16 248 0v44H-4z', '#8D6E63', 0) + R(-4, 196, 248, 8, '#A1887F', 0, 2.5)
      + g(150, 214, 1, P('M-14 0l8-22h14l8 22', 'none') + Lc('M-12 4l8-22M12 4l-6-22', '#5C6BC0', 7) + R(-12, -32, 26, 14, '#FFB300', 4, 2.5) + C(0, -8, 9, '#FFE0BD', 2.5) + face(0, -8, 0.2, 'o'))),

  // ---------- Hokkaido
  L('jp/hokkaido/landmark-driftice.v1.svg', 'เดินบนแพน้ำแข็งลอยที่ชิเรโตโกะ', 'Walking on the drift ice at Shiretoko', ['drift ice', 'น้ำแข็งลอย', 'ryuhyo', 'ริวเฮียว', 'shiretoko', 'ชิเรโตโกะ', 'abashiri', 'อาบาชิริ', 'sea of okhotsk', 'ทะเลโอค็อตสค์', 'drift ice walk', 'เดินบนน้ำแข็ง'], 'หาเด็กในชุดกันน้ำสีส้มที่ยืนบนแผ่นน้ำแข็ง', 'Find the child in the orange dry suit standing on the ice',
    // a sea packed with white floes of drift ice and dark gaps of water, snowy mountains behind, two walkers in puffy orange dry suits, one floating in a gap
    sky('#E3F2FD') + P('M-4 90l40-40 30 24 40-46 50 40 30-20 58 42z', '#FFFFFF') + Lc('M36 50l10 10M116 28l12 14', '#B0BEC5', 3) + R(-4, 90, 248, 154, '#1E3A5F', 0, 0)
      + [[30, 110, 40, 12], [120, 104, 56, 12], [210, 112, 36, 10], [60, 150, 60, 18], [176, 156, 50, 16], [110, 206, 90, 22], [10, 200, 36, 14], [220, 212, 30, 12]].map(([x, y, rx, ry]) => E(x, y, rx, ry, '#FFFFFF') + Lc(`M${x - rx + 8} ${y + 2}h${rx}`, '#E1F5FE', 2)).join('')
      + g(100, 196, 1, P('M-14 0c0-16 4-30 14-30s14 14 14 30z', '#FF6F00') + C(0, -40, 12, '#FF6F00') + C(0, -40, 8, '#FFE0BD', 2) + face(0, -40, 0.2) + Lc('M-12-18l-10 10M12-18l10 10', '#FF6F00', 7))
      + g(160, 182, 1, E(0, 0, 24, 8, '#1E3A5F', 0) + E(0, -2, 20, 8, '#FF6F00') + C(-18, -8, 8, '#FFE0BD', 2) + face(-18, -8, 0.16))),
  L('jp/hokkaido/landmark-marimo.v1.svg', 'มาริโมะ สาหร่ายลูกบอลแห่งทะเลสาบอากัง', 'Marimo, the green moss balls of Lake Akan', ['marimo', 'มาริโมะ', 'lake akan', 'ทะเลสาบอากัง', 'akanko', 'อากังโกะ', 'moss ball', 'สาหร่ายลูกบอล', 'green algae ball', 'ลูกบอลสีเขียว'], 'หาลูกบอลสีเขียวฟูๆ ที่อยู่ในขวดโหล', 'Find the fuzzy green ball in the jar',
    // round fuzzy green moss balls resting on the bottom of a clear lake with a volcano behind, and a little one in a glass jar with a cork in front
    sky('#E1F5FE') + P('M120 70l-40 40h80z', '#8D6E63') + P('M108 82l12-12 12 12-6 4-6-4-6 4z', '#FFFFFF', 2) + P('M-4 110h248v100H-4z', '#4DD0E1') + Lc('M20 124h40M160 130h50', '#B2EBF2', 3)
      + P('M-4 176c60-10 180-10 248 0v68H-4z', '#A1887F', 0)
      + [[40, 178, 16], [80, 182, 12], [206, 180, 14]].map(([x, y, r]) => C(x, y, r, '#558B2F') + ring(6, (k) => { const a = k * Math.PI / 3; return Lc(`M${f1(x + r * 0.5 * Math.cos(a))} ${f1(y + r * 0.5 * Math.sin(a))}l${f1(3 * Math.cos(a))} ${f1(3 * Math.sin(a))}`, '#8BC34A', 2); })).join('')
      + g(140, 196, 1, R(-30, -50, 60, 66, '#E1F5FE', 16) + R(-20, -62, 40, 14, '#C8A16B', 4) + R(-28, -6, 56, 20, '#80DEEA', 10, 0) + C(0, -18, 20, '#689F38') + ring(8, (k) => { const a = k * Math.PI / 4; return Lc(`M${f1(14 * Math.cos(a))} ${f1(-18 + 14 * Math.sin(a))}l${f1(5 * Math.cos(a))} ${f1(5 * Math.sin(a))}`, '#9CCC65', 2); }) + face(0, -18, 0.36))),
  L('jp/hokkaido/landmark-hakodatenight.v1.svg', 'วิวกลางคืนจากภูเขาฮาโกดาเตะ', 'The night view from Mount Hakodate', ['hakodate night view', 'วิวกลางคืนฮาโกดาเตะ', 'mount hakodate', 'ภูเขาฮาโกดาเตะ', 'hakodateyama', 'ฮาโกดาเตะยามะ', 'hourglass city', 'เมืองรูปนาฬิกาทราย', 'motomachi', 'โมโตมาจิ', 'city lights'], 'หาแผ่นดินแคบๆ ที่มีทะเลขนาบสองข้าง', 'Find the narrow strip of land with sea on both sides',
    // looking down at night from a mountain top: a town of twinkling lights on a strip of land pinched in the middle like an hourglass, dark sea on both sides, a railing and a child in front
    sky('#1A237E') + ring(6, (k) => C(20 + k * 40, 20 + (k % 2) * 14, 2.5, '#FFF59D', 0)) + C(206, 30, 12, '#FFF9C4', 2.5) + P('M-4 70c40 0 80-10 120-6s90 10 128 4v100H-4z', '#0D47A1', 0)
      + P('M70 66c40 10 60 40 46 70-6 14-6 24 2 40 14 30-10 64-40 70h90c-30-6-50-40-36-70 8-16 8-26 2-40-14-30 6-60 46-70z', '#37474F')
      + ring(26, (k) => { const y = 74 + Math.floor(k / 3) * 18, w = 50 - Math.abs(y - 150) * 0.05; return C(f1(120 + ((k % 3) - 1) * (y > 120 && y < 180 ? 10 : 26)), y, 3, ['#FFD54F', '#FFFFFF', '#FFAB40'][k % 3], 0) + (w > 0 ? '' : ''); })
      + R(-4, 212, 248, 32, '#4E342E', 0, 0) + Lc('M-4 206h248M20 206v20M80 206v20M160 206v20M220 206v20', '#8D6E63', 4) + kid(196, 200, '#E53935', 0.8) + face(120, 150, 0.3)),
  L('jp/hokkaido/landmark-kelp.v1.svg', 'สาหร่ายคมบุตากแดดบนเกาะริชิริ', 'Kombu kelp drying on Rishiri Island', ['kombu', 'konbu', 'คมบุ', 'kelp', 'สาหร่ายทะเล', 'rishiri', 'ริชิริ', 'rishiri island', 'เกาะริชิริ', 'dashi kelp', 'สาหร่ายทำน้ำซุป'], 'หาสาหร่ายยาวสีเขียวเข้มที่วางเรียงบนก้อนหิน', 'Find the long dark kelp laid out on the pebbles',
    // long ribbons of dark green-brown kelp laid side by side on a pebbly beach to dry, a cone-shaped snowy island mountain across the sea, a fisher's little boat
    sky('#E1F5FE') + P('M60 100l60-70 60 70z', '#78909C') + P('M104 50l16-20 16 20-8 4-8-6-8 6z', '#FFFFFF', 2.5) + R(-4, 98, 248, 40, '#4FC3F7', 0, 0) + g(200, 118, 1, P('M-22 0h44l-6 10h-32z', '#FFFFFF') + R(-6, -12, 12, 12, '#E53935', 1, 2))
      + R(-4, 136, 248, 108, '#BDBDBD', 0, 0) + ring(14, (k) => C(10 + k * 17, 230 + (k % 2) * 6, 7, '#9E9E9E', 0))
      + ring(5, (k) => P(`M${30 + k * 40} 146c-4 20 6 40 0 60 -2 8 4 14 10 14 6 0 12-6 10-14-6-20 4-40 0-60-6-4-14-4-20 0z`, ['#33691E', '#3E2723', '#33691E', '#4E342E', '#33691E'][k]))
      + face(120, 180, 0.3)),
  L('jp/hokkaido/landmark-robata.v1.svg', 'โรบาตะยากิ ปิ้งปลาริมเตาถ่านแบบคุชิโระ', 'Robatayaki, grilling by the hearth in Kushiro', ['robatayaki', 'robata', 'โรบาตะยากิ', 'kushiro', 'คุชิโระ', 'hokke', 'ปลาฮกเกะ', 'charcoal hearth', 'เตาถ่าน', 'wooden paddle', 'ไม้พายส่งอาหาร'], 'หาไม้พายยาวที่ยื่นจานมาให้', 'Find the long wooden paddle passing a plate',
    // a square sunken hearth of glowing charcoal with an open fish, prawns and corn grilling on a net, a long wooden paddle reaching out with a plate on it
    R(20, 120, 200, 100, '#8D6E63', 8) + R(36, 132, 168, 76, '#3E2723', 4, 3) + ring(10, (k) => C(48 + (k % 5) * 36, 150 + Math.floor(k / 5) * 34, 10, k % 3 ? '#FF7043' : '#FFB74D', 0))
      + Lc('M40 140h160M40 160h160M40 180h160M40 200h160M60 136v70M100 136v70M140 136v70M180 136v70', '#B0BEC5', 1.5)
      + g(92, 166, 1, P('M-38 0c0-14 20-22 40-22s36 8 36 22-16 22-36 22-40-8-40-22z', '#F2C14E') + P('M38 0l14-12v24z', '#F2C14E') + Lc('M-20-6h40M-20 6h40', '#C9832E', 2.5) + face(-14, 0, 0.3))
      + g(168, 160, 1, P('M-14 10c-8-14 4-30 18-26 10 4 8 16 0 20', '#FF8A65') + Lc('M-6-12l-10-8', '#E64A19', 2))
      + Lc('M232 30l-90 70', '#C68642', 8) + g(132, 106, 1, E(0, 0, 28, 8, '#FFFFFF') + E(0, -4, 14, 6, '#E57373', 2), -36)),

  // ---------- Fukuoka
  L('jp/fukuoka/landmark-nokonoshima.v1.svg', 'ทุ่งดอกไม้บนเกาะโนโคโนชิมะ', 'The flower hills of Nokonoshima Island', ['nokonoshima', 'โนโคโนชิมะ', 'nokonoshima island park', 'สวนเกาะโนโคโนชิมะ', 'cosmos', 'ดอกคอสมอส', 'nanohana', 'ดอกนาโนะฮานะ', 'flower hill', 'เนินดอกไม้'], 'หาเกาะเล็กๆ ในทะเลที่อยู่ไกลออกไป', 'Find the little island far out in the sea',
    // a rolling hillside covered in pink and white cosmos flowers sloping down to a blue sea, a small island and city towers far away, a child among the flowers
    sky('#E1F5FE') + R(-4, 70, 248, 60, '#4FC3F7', 0, 0) + E(60, 92, 26, 8, '#81C784', 2.5) + ring(5, (k) => R(150 + k * 14, 70 - (k % 3) * 10, 10, 22 + (k % 3) * 10, '#B0BEC5', 0, 2))
      + P('M-4 120c60-30 160-20 248 0v124H-4z', '#7CB342') + P('M-4 160c60-20 160-20 248-6v90H-4z', '#8BC34A', 0)
      + ring(10, (k) => bloom(14 + (k * 47) % 220, 146 + Math.floor(k / 4) * 36 + (k % 2) * 8, 7, ['#F48FB1', '#FFFFFF', '#EC407A'][k % 3]))
      + kid(120, 190, '#FFCA28', 1) + face(60, 92, 0.18)),
  L('jp/fukuoka/landmark-mojiko.v1.svg', 'สถานีโมจิโกะและพ่อค้ากล้วยแบบตบโต๊ะ', 'Mojikō Retro station and its banana sellers', ['mojiko', 'mojikō', 'โมจิโกะ', 'mojiko retro', 'โมจิโกะเรโทร', 'mojiko station', 'สถานีโมจิโกะ', 'banana tataki', 'ขายกล้วยตบโต๊ะ', 'kitakyushu', 'คิตะคิวชู'], 'หาหวีกล้วยสีเหลืองบนโต๊ะไม้', 'Find the bunch of yellow bananas on the wooden table',
    // an old cream-and-green wooden station with a triangle pediment and tall windows, a wooden table in front piled with bunches of bananas and a paper fan for slapping the table
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#BCAAA4', 0, 0)
      + R(30, 80, 180, 116, '#FFF3E0') + P('M90 80l30-28 30 28z', '#80CBC4') + R(30, 72, 180, 10, '#4DB6AC', 0, 3) + ring(7, (k) => R(42 + k * 24, 100, 12, 36, '#B3E5FC', 6, 2.5)) + R(104, 150, 32, 46, '#5D4037', 0, 2.5) + Lc('M30 140h180', '#4DB6AC', 4)
      + face(120, 70, 0.3) + R(20, 170, 120, 10, '#A1673F', 2, 2.5) + Lc('M30 180v26M130 180v26', '#8D5524', 5)
      + [[44, 160], [80, 156], [114, 162]].map(([x, y]) => ring(4, (k) => Lc(`M${x - 12 + k * 6} ${y}c-4-14 0-24 6-28`, '#FDD835', 7)) + Lc(`M${x - 6} ${y - 28}v-6`, '#6D4C41', 4)).join('')
      + g(176, 186, 1, R(-12, -22, 24, 28, '#E53935', 8) + Lc('M0 6v16', '#8D6E63', 4), 20)),
  L('jp/fukuoka/landmark-nemophila.v1.svg', 'ทุ่งดอกเนโมฟีลาสีฟ้าที่สวนอุมิโนะนากามิจิ', 'Blue nemophila hills at Uminonakamichi Seaside Park', ['nemophila', 'เนโมฟีลา', 'baby blue eyes', 'uminonakamichi', 'อุมิโนะนากามิจิ', 'uminonakamichi seaside park', 'สวนริมทะเลอุมิโนะนากามิจิ', 'blue flowers', 'ดอกไม้สีฟ้า', 'spring flowers'], 'หาดอกไม้ดอกใหญ่ที่มีกลีบสีฟ้าห้ากลีบ', 'Find the big flower with five sky-blue petals',
    // soft hills carpeted in tiny sky-blue flowers under a pale sky, one big five-petalled blue flower with a white middle in front, a bicycle path curving through
    sky('#F1F8FF') + P('M-4 110c50-30 120-30 160 0s60-10 88-6v140H-4z', '#90CAF9') + P('M-4 150c60-20 140-20 248-10v104H-4z', '#64B5F6', 0)
      + ring(30, (k) => C(6 + (k * 37) % 236, 120 + Math.floor(k / 6) * 22 + (k % 3) * 4, 3, '#FFFFFF', 0))
      + Lc('M-4 230c80-20 120-50 248-60', '#FFE0B2', 8)
      + g(110, 172, 1, ring(5, (k) => { const a = (k * 72 - 90) * Math.PI / 180; return E(f1(26 * Math.cos(a)), f1(26 * Math.sin(a)), 20, 16, '#42A5F5'); }) + C(0, 0, 16, '#FFFFFF') + ring(5, (k) => { const a = (k * 72 - 90) * Math.PI / 180; return C(f1(8 * Math.cos(a)), f1(8 * Math.sin(a)), 2, '#1565C0', 0); }) + face(0, 0, 0.3))),
  L('jp/fukuoka/landmark-kyuhaku.v1.svg', 'พิพิธภัณฑ์แห่งชาติคิวชู หลังคาเป็นลูกคลื่นสีฟ้า', 'The wave-roofed Kyushu National Museum', ['kyushu national museum', 'พิพิธภัณฑ์แห่งชาติคิวชู', 'kyuhaku', 'คิวฮากุ', 'dazaifu museum', 'พิพิธภัณฑ์ดาไซฟุ', 'glass wave roof', 'หลังคาคลื่น', 'rainbow tunnel', 'อุโมงค์สายรุ้ง'], 'หาอุโมงค์สีรุ้งที่พาขึ้นไปหาตึก', 'Find the rainbow tunnel leading up to the building',
    // a long building with a huge rolling blue glass roof like a wave, sitting in green wooded hills, a tunnel with rainbow stripes running up to it
    sky('#E1F5FE') + P('M-4 120c40-40 80-50 120-40s80-30 128-10v80H-4z', '#66BB6A') + ring(5, (k) => C(14 + k * 52, 98 - (k % 2) * 12, 16, '#43A047', 2.5))
      + P('M30 150c10-40 30-50 60-46s50-20 80-10 40 20 44 56z', '#4FC3F7') + ring(8, (k) => Lc(`M${44 + k * 20} ${148}c2-14 4-26 8-36`, '#B3E5FC', 3))
      + R(30, 148, 184, 30, '#ECEFF1') + ring(8, (k) => R(38 + k * 22, 154, 14, 18, '#90CAF9', 2, 2)) + face(120, 126, 0.4)
      + P('M-4 244l70-60h20l-60 60z', '#FFFFFF') + ring(6, (k) => Lc(`M${8 + k * 10} ${240 - k * 8}l14 ${-0}`, ['#E53935', '#FB8C00', '#FDD835', '#43A047', '#1E88E5', '#8E24AA'][k], 5)) + R(-4, 200, 248, 44, '#A5D6A7', 0, 0) + P('M30 244l40-50h28l-30 50z', '#ECEFF1', 3) + ring(5, (k) => Lc(`M${38 + k * 7} ${236 - k * 9}h18`, ['#E53935', '#FB8C00', '#FDD835', '#43A047', '#1E88E5'][k], 4))),
  L('jp/fukuoka/landmark-kokuracastle.v1.svg', 'ปราสาทโคคุระ', 'Kokura Castle in Kitakyushu', ['kokura castle', 'ปราสาทโคคุระ', 'kokura', 'โคคุระ', 'katsuyama park', 'สวนคัตสึยามะ', 'castle keep', 'หอปราสาท', 'karazukuri', 'คาระซึคุริ'], 'หาชั้นบนสุดที่ใหญ่กว่าชั้นล่าง', 'Find the top floor that is wider than the one below it',
    // a white castle keep on a high stone base with a moat, plain walls stacked in floors, the top floor wider than the one below it with no roof between, gold fish on the ridge
    sky('#E3F2FD') + R(-4, 200, 248, 44, '#4FC3F7', 0, 0) + P('M40 200l14-50h132l14 50z', '#9E9E9E') + ring(5, (k) => Lc(`M${52 + k * 30} 160l-4 36`, '#757575', 2))
      + R(66, 120, 108, 30, '#FFFFFF') + P('M58 124l10-12h104l10 12z', '#37474F') + R(76, 90, 88, 24, '#FFFFFF') + P('M70 94l8-10h84l8 10z', '#37474F')
      + R(86, 66, 68, 20, '#FFFFFF') + R(78, 38, 84, 28, '#FFFFFF') + Lc('M78 66h84', '#37474F', 3) + P('M70 40l14-16h72l14 16z', '#37474F')
      + ring(4, (k) => R(88 + k * 18, 46, 8, 12, '#37474F', 1, 2)) + ring(5, (k) => R(78 + k * 18, 128, 10, 14, '#37474F', 1, 2))
      + P('M84 24l-6-10 8 2zM156 24l6-10-8 2z', '#FFD54F', 2) + face(120, 98, 0.32) + P('M-4 150c20-20 40-20 50 0v50H-4zM244 150c-20-20-40-20-50 0v50h50z', '#81C784')),

  // ---------- Okinawa
  L('jp/okinawa/landmark-tacorice.v1.svg', 'ทาโก้ไรซ์ ข้าวหน้าทาโก้ของโอกินาว่า', 'Taco rice, Okinawa\'s taco on rice', ['taco rice', 'ทาโก้ไรซ์', 'kin town', 'เมืองคิน', 'okinawa taco rice', 'ข้าวหน้าทาโก้', 'minced meat', 'เนื้อสับ', 'salsa', 'ซัลซ่า', 'shredded cheese'], 'หาเส้นชีสสีเหลืองที่โรยอยู่บนข้าว', 'Find the yellow cheese strands sprinkled on the rice',
    // a plate of white rice topped with spiced minced meat, shredded lettuce, yellow cheese strands and chopped tomato, a little cup of red salsa and a spoon
    E(116, 158, 100, 40, '#FFFFFF') + E(116, 154, 84, 30, '#ECEFF1', 2.5) + P('M44 150c0-30 30-50 72-50s72 20 72 50z', '#FFFFFF', 3)
      + P('M56 140c10-24 40-34 60-34s50 10 60 34z', '#8D5524', 0) + ring(8, (k) => C(66 + k * 14, 126 + (k % 2) * 6, 4, '#6D4C41', 0))
      + ring(7, (k) => P(`M${64 + k * 15} 118l6-10 6 10-6 4z`, '#8BC34A', 2)) + ring(10, (k) => Lc(`M${62 + k * 12} ${112 + (k % 3) * 4}l8 4`, '#FFCA28', 3))
      + ring(5, (k) => R(78 + k * 16, 104 + (k % 2) * 6, 8, 8, '#E53935', 2, 1.5)) + face(116, 140, 0.36)
      + g(202, 104, 1, P('M-18-12h36l-4 26h-28z', '#FFFFFF') + E(0, -12, 18, 5, '#E53935')) + Lc('M30 210l50-30', '#B0BEC5', 6) + E(84, 178, 10, 7, '#B0BEC5', 2.5)),
  L('jp/okinawa/landmark-okinawasoba.v1.svg', 'โอกินาว่าโซบะ เส้นหนาใส่หมูสามชั้น', 'Okinawa soba with soft pork belly', ['okinawa soba', 'โอกินาว่าโซบะ', 'soki soba', 'โซกิโซบะ', 'sanmainiku', 'หมูสามชั้น', 'koregusu', 'โคเรกุสุ', 'okinawa noodles', 'ก๋วยเตี๋ยวโอกินาว่า'], 'หาขวดพริกดองโคเรกุสุข้างชาม', 'Find the little bottle of koregusu chilli beside the bowl',
    // a bowl with a blue swirl pattern holding thick flat yellow wheat noodles in clear broth, two big slabs of glazed pork belly, pink ginger and green onion, a small bottle of red chillies in liquid beside it
    P('M24 116h176c0 56-36 90-88 90S24 172 24 116z', '#FFFFFF') + ring(4, (k) => Lc(`M${44 + k * 38} ${150 + (k % 2) * 8}c8-8 18 0 12 8`, '#1E88E5', 3)) + E(112, 116, 88, 22, '#FFF8E1') + E(112, 116, 80, 17, '#F6D08A', 3)
      + ring(6, (k) => Lc(`M${44 + k * 22} 114c6 6 14-4 20 2`, '#FDD835', 7))
      + [[86, 106, -8], [130, 104, 10]].map(([x, y, r]) => g(x, y, 1, R(-22, -10, 44, 22, '#8D4A2B', 6) + Lc('M-20-2h40M-20 6h40', '#F6C25B', 3), r)).join('') + face(108, 118, 0.32)
      + P('M150 100l8-10 8 10-8 4z', '#F48FB1', 2) + ring(4, (k) => C(60 + k * 8, 104 - (k % 2) * 4, 3.5, '#8BC34A', 1.5))
      + g(212, 150, 1, R(-12, -30, 24, 46, '#E1F5FE', 6) + R(-6, -42, 12, 12, '#B0BEC5', 2) + ring(4, (k) => E(-4 + (k % 2) * 8, -16 + k * 7, 3, 6, '#E53935', 1.5)))),
  L('jp/okinawa/landmark-bingata.v1.svg', 'บิงงาตะ ผ้าย้อมลายสีสดของริวกิว', 'Bingata, Ryūkyū\'s bright stencil-dyed cloth', ['bingata', 'บิงงาตะ', 'ryukyu dyeing', 'ผ้าย้อมริวกิว', 'stencil dye', 'ย้อมด้วยแม่พิมพ์', 'katagami', 'คาตากามิ', 'okinawan textile', 'ผ้าโอกินาว่า'], 'หานกตัวเล็กสีชมพูบนผ้าสีเหลือง', 'Find the little pink bird on the yellow cloth',
    // a length of bright yellow cloth hanging on a bamboo pole, printed with red hibiscus, blue waves and a pink bird, a paper stencil and a round brush on the table below
    Lc('M10 30h220', '#C8A16B', 8) + P('M30 34h180v130l-20 10-20-10-20 10-20-10-20 10-20-10-20 10-20-10-20 10-20-10z', '#FFD54F')
      + [[70, 70], [170, 110], [90, 140]].map(([x, y]) => ring(5, (k) => { const a = k * 2 * Math.PI / 5; return E(f1(x + 10 * Math.cos(a)), f1(y + 10 * Math.sin(a)), 8, 6, '#E53935', 2); }) + C(x, y, 4, '#FFF59D', 0)).join('')
      + Lc('M110 60q10-10 20 0t20 0M40 112q10-10 20 0t20 0M150 150q10-10 20 0t20 0', '#1E88E5', 4)
      + g(140, 86, 1, E(0, 0, 14, 10, '#F48FB1') + C(12, -6, 7, '#F48FB1') + P('M18-6l8 2-8 3z', '#FF8F00', 1.5) + P('M-14 0l-10-6 2 10z', '#F48FB1', 2) + C(13, -7, 1.5, '#22213A', 0))
      + R(30, 196, 180, 40, '#A1673F', 6) + g(90, 206, 1, R(-36, -10, 72, 24, '#D7B98E', 2, 2.5) + P('M-20 4c4-8 10-8 14 0M4 4c4-8 10-8 14 0', 'none', 2)) + g(176, 210, 1, Lc('M0 0l26-18', '#6D4C41', 6) + C(-4, 4, 9, '#E53935', 2.5)) + face(120, 120, 0.3)),
  L('jp/okinawa/landmark-chinsuko.v1.svg', 'ชินสุโก คุกกี้ร่วนของโอกินาว่า', 'Chinsukō, Okinawa\'s crumbly shortbread', ['chinsuko', 'chinsukō', 'ชินสุโก', 'okinawa cookie', 'คุกกี้โอกินาว่า', 'shortbread', 'ขนมร่วน', 'ryukyu sweets', 'ขนมริวกิว', 'salt chinsuko', 'ชินสุโกเกลือ'], 'หาคุกกี้ที่มีลายเป็นร่องเป็นริ้ว', 'Find the cookie with grooves along its top',
    // long golden shortbread biscuits with ridged tops, two in a little paper packet, one broken in half showing its crumbly inside, crumbs around
    P('M30 150l40-50h120l20 50z', '#E1F5FE') + Lc('M54 128h150', '#4FC3F7', 3)
      + ring(3, (k) => g(80 + k * 44, 150 - k * 10, 1, R(-16, -40, 32, 70, '#E8B04B', 12) + ring(4, (j) => Lc(`M${-10 + j * 7} -32v54`, '#C9832E', 2.5)), -10 + k * 5))
      + g(120, 204, 1, R(-50, -14, 40, 28, '#E8B04B', 10) + P('M-10-14l6 8-4 6 6 6-8 8', 'none', 2) + R(4, -14, 40, 28, '#E8B04B', 10) + ring(5, (k) => C(-30 + k * 14, 0, 2, '#C9832E', 0)))
      + ring(6, (k) => C(30 + k * 36, 230 - (k % 2) * 6, 3, '#E8B04B', 1.5)) + face(124, 130, 0.36)),
  L('jp/okinawa/landmark-otsunahiki.v1.svg', 'ชักเย่อเชือกยักษ์แห่งนาฮะ', 'The giant tug-of-war rope of Naha', ['naha tug-of-war', 'ชักเย่อนาฮะ', 'otsunahiki', 'โอสึนะฮิกิ', 'naha otsunahiki', 'ชักเย่อยักษ์', 'giant rope', 'เชือกยักษ์', 'kokusai street', 'ถนนโคคุไซ'], 'หาไม้หลักใหญ่ที่เสียบเชื่อมเชือกสองเส้นเข้าด้วยกัน', 'Find the big wooden peg joining the two ropes',
    // two enormous straw ropes, each ending in a big loop, joined in the middle by a thick wooden peg, little side ropes branching off with children pulling them on a city street
    R(-4, 150, 248, 94, '#B0BEC5', 0, 0) + R(-4, 30, 248, 120, '#FFF8E1', 0, 0) + ring(6, (k) => R(4 + k * 40, 60, 32, 90, ['#FFCC80', '#B3E5FC', '#C5E1A5'][k % 3], 0, 2.5))
      + Lc('M-4 172h96', '#D7A86E', 30) + Lc('M148 172h96', '#D7A86E', 30) + ring(8, (k) => Lc(`M${4 + k * 11} 160l8 24`, '#A1673F', 2.5)) + ring(8, (k) => Lc(`M${154 + k * 11} 160l8 24`, '#A1673F', 2.5))
      + E(100, 172, 22, 34, 'none', 0) + Lc('M84 150c30-10 40 34 8 44', '#D7A86E', 14) + Lc('M156 150c-30-10-40 34-8 44', '#D7A86E', 14)
      + R(112, 130, 16, 86, '#8D5524', 4) + face(120, 172, 0.3)
      + Lc('M40 186l-10 40M200 186l10 40', '#D7A86E', 6) + kid(24, 236, '#E53935', 0.8) + kid(216, 236, '#1E88E5', 0.8)),
];

export default { places: {}, items };
