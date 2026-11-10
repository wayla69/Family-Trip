// Wave 9, Japan part 2: Takayama & Nagoya, Hiroshima & Kobe, Kanazawa, Hakone, Tohoku — new landmarks
// Shrines and halls appear only as buildings, with no figures (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +v.toFixed(1);
const tree = (x, y, r, c) => Lc(`M${x} ${y}v${r}`, '#6D4C41', 4) + C(x, y, r, c, 2.5);
// a castle roof tier: a dark sloping roof from x0 to x1 at height y
const roof = (x0, x1, y, c = '#37474F') => P(`M${x0} ${y}l10-12h${x1 - x0 - 20}l10 12z`, c);

const items = [
  // ---------- Takayama, Shirakawa-go and Nagoya
  L('jp/takayama/landmark-inuyama.v1.svg', 'ปราสาทอินุยามะเหนือแม่น้ำคิโซะ', 'Inuyama Castle above the Kiso River', ['inuyama castle', 'ปราสาทอินุยามะ', 'inuyama', 'อินุยามะ', 'kiso river', 'แม่น้ำคิโซะ', 'hakuteijo', 'ฮาคุเทโจ', 'original castle keep', 'หอปราสาทดั้งเดิม'], 'หาระเบียงไม้สีแดงรอบชั้นบนสุด', 'Find the red railed balcony around the top floor',
    // a small old castle keep with white walls and dark roofs on a wooded cliff, a red-railed balcony round its top floor, a wide river curving below
    sky('#E3F2FD') + P('M-4 200c60-20 180-30 248-10v54H-4z', '#4FC3F7') + Lc('M20 214h40M150 224h50', '#B3E5FC', 3)
      + P('M10 200c10-40 40-70 110-76s100 40 110 76z', '#689F38') + ring(5, (k) => C(30 + k * 44, 170 - (k % 2) * 10, 18, '#558B2F', 2.5))
      + R(84, 112, 72, 26, '#FFFFFF') + roof(76, 164, 112) + R(92, 84, 56, 22, '#FFFFFF') + roof(84, 156, 84) + R(100, 56, 40, 22, '#FFFFFF')
      + R(92, 72, 56, 6, '#C62828', 0, 2.5) + ring(5, (k) => Lc(`M${96 + k * 12} 72v-6`, '#C62828', 2)) + P('M90 58l12-16h36l12 16z', '#37474F') + P('M114 42l6-8 6 8z', '#37474F', 2)
      + ring(3, (k) => R(104 + k * 12, 60, 6, 8, '#37474F', 1, 1.5)) + face(120, 122, 0.32)),
  L('jp/takayama/landmark-kokiriko.v1.svg', 'บินซาซาระ เครื่องดนตรีแผ่นไม้ของเพลงโคคิริโกะ โกคายามะ', 'The bin-sasara clapper of Gokayama\'s Kokiriko song', ['kokiriko', 'โคคิริโกะ', 'bin-sasara', 'บินซาซาระ', 'gokayama', 'โกคายามะ', 'kokiriko festival', 'เทศกาลโคคิริโกะ', 'folk song', 'เพลงพื้นบ้าน', 'wooden clapper'], 'หาแผ่นไม้เล็กๆ เรียงกันเป็นโค้งที่ร้อยด้วยเชือก', 'Find the row of little wooden boards strung into an arc',
    // a curved arc of many thin wooden boards threaded on a cord, held by two handles, clacking with little motion marks, two short red-tasselled sticks and music notes
    R(-4, 200, 248, 44, '#D7CCC8', 0, 0)
      + ring(22, (k) => { const a = (200 + k * 6.6) * Math.PI / 180; const x = 120 + 90 * Math.cos(a), y = 190 + 90 * Math.sin(a); return g(f1(x), f1(y), 1, R(-4, -14, 8, 28, k % 2 ? '#D7A86E' : '#C68642', 2, 2), f1(110 + k * 6.6)); })
      + Lc('M34 166c30-60 140-60 172 0', '#C62828', 3) + [[30, 180], [210, 180]].map(([x, y]) => R(x - 8, y - 6, 16, 28, '#5D4037', 4) + C(x, y + 28, 6, '#E53935', 2)).join('')
      + Lc('M64 110l-10-10M120 88v-14M176 110l10-10', '#FF8A65', 3) + face(120, 150, 0.46)
      + g(70, 210, 1, Lc('M0 0l40-10', '#8D5524', 5) + Lc('M60 0l40-10', '#8D5524', 5) + C(-4, 2, 4, '#E53935', 1.5) + C(56, 2, 4, '#E53935', 1.5))
      + [[40, 60], [200, 54]].map(([x, y]) => C(x, y, 6, '#5C6BC0', 2) + Lc(`M${x + 5} ${y}v-20l10 5`, '#5C6BC0', 3)).join('')),
  L('jp/takayama/landmark-misonikomi.v1.svg', 'มิโซะนิโคมิอุด้งในหม้อดินแบบนาโกย่า', 'Miso nikomi udon in a clay pot, Nagoya style', ['miso nikomi udon', 'มิโซะนิโคมิอุด้ง', 'misonikomi', 'มิโซะนิโคมิ', 'hatcho miso', 'มิโซะฮัตโจ', 'clay pot', 'หม้อดิน', 'nagoya meshi', 'อาหารนาโกย่า', 'red miso broth'], 'หาไข่ดิบสีเหลืองที่อยู่กลางหม้อ', 'Find the yellow egg yolk in the middle of the pot',
    // a brown clay pot with two little handles bubbling with dark red miso broth, thick noodles, a raw egg yolk in the middle, green onion and a piece of fried chicken, the lid tilted beside it as a plate
    E(170, 70, 56, 18, '#A1673F') + C(170, 56, 8, '#8D5524', 2.5) + E(170, 76, 48, 10, '#8D5524', 0)
      + P('M24 120h170c0 56-30 90-85 90s-85-34-85-90z', '#A1673F') + Lc('M24 120h-12M194 120h12', '#8D5524', 8) + E(109, 120, 85, 22, '#6D2E2E') + E(109, 120, 76, 17, '#8E3A2A', 0)
      + ring(5, (k) => Lc(`M${48 + k * 26} 116c6 6 14-4 20 2`, '#F3E2B3', 6)) + C(108, 120, 10, '#FFFFFF') + C(108, 120, 6, '#FFB300', 0)
      + g(150, 112, 1, P('M-14-6c4-10 24-10 28 0 2 8-6 14-14 14s-16-6-14-14z', '#D9952E') + Lc('M-8-2l4 4M2-4l4 4', '#B26A36', 2)) + ring(5, (k) => C(64 + k * 8, 110 - (k % 2) * 4, 3.5, '#8BC34A', 1.5))
      + Lc('M76 96q-6-12 0-24M140 94q-6-12 0-24', '#B0BEC5', 4) + face(108, 170, 0.46)),
  L('jp/takayama/landmark-udatsu.v1.svg', 'บ้านหลังคามีกำแพงกันไฟอุดัตสึที่เมืองมิโนะ', 'The udatsu firewall roofs of Mino', ['udatsu', 'อุดัตสึ', 'mino', 'มิโนะ', 'udatsu street', 'ถนนอุดัตสึ', 'mino washi', 'กระดาษมิโนะ', 'firewall roofs', 'หลังคากันไฟ', 'old merchant town'], 'หากำแพงเล็กๆ ที่มีหลังคาของตัวเองยื่นขึ้นมาระหว่างบ้าน', 'Find the little wall with its own tiny roof rising between the houses',
    // a row of dark wooden merchant houses with tiled roofs, between them white plastered firewalls rising above the eaves and capped with their own little tiled roofs, paper lamps over the doors
    sky('#FFF8E1') + R(-4, 200, 248, 44, '#D7CCC8', 0, 0)
      + ring(3, (k) => { const x = 8 + k * 78; return R(x, 120, 72, 80, '#6D4C41') + ring(4, (j) => Lc(`M${x + 8 + j * 16} 140v56`, '#4E342E', 3)) + R(x + 20, 156, 32, 44, '#3E2723', 0, 2.5) + P(`M${x - 4} 124l8-20h64l8 20z`, '#455A64'); })
      + [80, 158].map((x) => R(x - 8, 82, 16, 60, '#FFFFFF') + P(`M${x - 14} 86l6-12h16l6 12z`, '#37474F') + C(x, 74, 3, '#FFD54F', 2)).join('')
      + ring(3, (k) => g(44 + k * 78, 146, 1, R(-8, -10, 16, 18, '#FFF8E1', 4, 2.5) + Lc('M-8-2h16', '#E0E0E0', 1.5))) + face(122, 100, 0.26)),
  // ---------- Hiroshima, Miyajima and Kobe
  L('jp/hiroshima/landmark-hiroshimacastle.v1.svg', 'ปราสาทฮิโรชิม่า ปราสาทปลาคาร์ป', 'Hiroshima Castle, the Carp Castle', ['hiroshima castle', 'ปราสาทฮิโรชิม่า', 'carp castle', 'ปราสาทปลาคาร์ป', 'rijo', 'ริโจ', 'castle moat', 'คูเมือง', 'black castle', 'ปราสาทสีดำ'], 'หาปลาคาร์ปที่ว่ายอยู่ในคูน้ำหน้าปราสาท', 'Find the carp swimming in the moat in front of the castle',
    // a five-tier castle with dark wooden walls and white upper bands on a high stone base, a green moat in front with an orange carp swimming
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#80CBC4', 0, 0) + Lc('M20 214h40M160 226h40', '#B2DFDB', 3)
      + P('M50 196l12-44h116l12 44z', '#9E9E9E') + ring(5, (k) => Lc(`M${66 + k * 26} 156l-4 36`, '#757575', 2))
      + R(70, 124, 100, 28, '#4E342E') + roof(62, 178, 126) + R(78, 98, 84, 22, '#4E342E') + R(78, 98, 84, 8, '#FFFFFF', 0, 2) + roof(70, 170, 100)
      + R(88, 74, 64, 22, '#4E342E') + R(88, 74, 64, 8, '#FFFFFF', 0, 2) + roof(80, 160, 76) + R(98, 50, 44, 22, '#4E342E') + R(98, 50, 44, 8, '#FFFFFF', 0, 2) + P('M86 52l14-16h40l14 16z', '#37474F')
      + ring(4, (k) => R(78 + k * 22, 132, 10, 12, '#212121', 1, 1.5)) + face(120, 108, 0.32)
      + g(150, 222, 1, E(0, 0, 18, 8, '#FF7043') + P('M18 0l12-8v16z', '#FF7043', 2) + C(-10, -2, 2, '#22213A', 0) + C(-2, 2, 3, '#FFFFFF', 0))),
  L('jp/hiroshima/landmark-shukkeien.v1.svg', 'สวนชุคเคเอ็น สวนย่อส่วนของฮิโรชิม่า', 'Shukkeien, Hiroshima\'s miniature landscape garden', ['shukkeien', 'ชุคเคเอ็น', 'shukkei-en garden', 'สวนชุคเคเอ็น', 'kokokyo bridge', 'สะพานโคโคเคียว', 'japanese garden', 'สวนญี่ปุ่น', 'pond garden', 'สวนบึงน้ำ', 'tea house', 'เรือนน้ำชา'], 'หาสะพานหินโค้งสูงกลางสระ', 'Find the high arched stone bridge in the middle of the pond',
    // a calm pond with a tall steep stone arch bridge across it, little islands with pines, a thatched tea house on the bank, koi ripples and a grey heron
    sky('#F1F8E9') + P('M-4 90c40-20 80-10 120 0s80-20 128 0v20H-4z', '#81C784') + R(-4, 108, 248, 136, '#80DEEA', 0, 0)
      + P('M50 170c10-50 60-70 70-70s60 20 70 70h-12c-8-34-40-56-58-56s-50 22-58 56z', '#B0BEC5') + Lc('M66 150c16-26 36-38 54-38s38 12 54 38', '#90A4AE', 3)
      + E(40, 210, 30, 10, '#8D6E63', 2.5) + C(40, 196, 12, '#2E7D32', 2.5) + E(200, 214, 24, 8, '#8D6E63', 2.5) + C(204, 202, 10, '#388E3C', 2.5)
      + g(196, 96, 1, P('M-30 0l30-24 30 24z', '#C8A16B') + R(-22, 0, 44, 18, '#FFF8E1', 0, 2.5))
      + Lc('M110 200q10-6 20 0M140 222q10-6 20 0', '#E0F7FA', 3) + E(126, 204, 7, 3, '#FF7043', 1.5) + face(120, 140, 0.3)),
  L('jp/hiroshima/landmark-sobameshi.v1.svg', 'โซบะเมชิ ข้าวผัดบะหมี่บนเตาเหล็กของโกเบ', 'Sobameshi, Kobe\'s fried noodles and rice on the griddle', ['sobameshi', 'โซบะเมชิ', 'kobe sobameshi', 'โซบะเมชิโกเบ', 'noodles and rice', 'ข้าวผัดบะหมี่', 'nagata', 'นางาตะ', 'teppan griddle', 'เตาเหล็ก', 'kobe street food'], 'หาไม้พายเหล็กสองอันที่สับเส้นกับข้าว', 'Find the two metal spatulas chopping the noodles into the rice',
    // a black iron griddle with a mound of brown sauce-fried rice mixed with chopped noodles and cabbage, two metal spatulas chopping it, pink pickled ginger, a squiggle of sauce on top
    R(10, 90, 220, 120, '#37474F', 14) + R(20, 100, 200, 100, '#455A64', 8, 3)
      + P('M54 170c0-36 30-50 66-50s66 14 66 50z', '#8D5524') + ring(14, (k) => C(64 + (k % 7) * 18, 148 + Math.floor(k / 7) * 12, 3, '#F3E2B3', 0)) + ring(6, (k) => Lc(`M${68 + k * 18} 138c6-4 10 4 16 0`, '#C68642', 3))
      + ring(4, (k) => P(`M${76 + k * 22} 134l6-6 6 6-6 4z`, '#AED581', 1.5)) + Lc('M70 128c10-6 20 6 30 0s20 6 30 0 20 6 30 0', '#3E2723', 3) + P('M150 118l8-8 8 8-8 4z', '#F48FB1', 2)
      + g(46, 120, 1, R(-14, -6, 28, 10, '#B0BEC5', 2, 2.5) + Lc('M0-6l-10-34', '#5D4037', 5), -20) + g(196, 124, 1, R(-14, -6, 28, 10, '#B0BEC5', 2, 2.5) + Lc('M0-6l10-34', '#5D4037', 5), 20)
      + face(120, 156, 0.4)),
  L('jp/hiroshima/landmark-maritimemuseum.v1.svg', 'พิพิธภัณฑ์การเดินเรือโกเบ หลังคาเหมือนใบเรือ', 'The Kobe Maritime Museum and its white sail roof', ['kobe maritime museum', 'พิพิธภัณฑ์การเดินเรือโกเบ', 'meriken park', 'สวนเมริเก็น', 'sail roof', 'หลังคาใบเรือ', 'kobe harbour', 'ท่าเรือโกเบ', 'white frame roof', 'หลังคาโครงสีขาว'], 'หาโครงเหล็กสีขาวที่โค้งเหมือนใบเรือโดนลม', 'Find the white frame curving like sails in the wind',
    // a low glass building on the waterfront under a big open white steel frame curving up like billowing sails, the harbour water and a little boat in front
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#29B6F6', 0, 0) + Lc('M30 210h40M150 224h40', '#B3E5FC', 3) + R(-4, 176, 248, 16, '#BDBDBD', 0, 2.5)
      + R(40, 140, 160, 38, '#B3E5FC') + ring(7, (k) => Lc(`M${52 + k * 22} 144v30`, '#E1F5FE', 3))
      + ring(5, (k) => Lc(`M${40 + k * 10} 140C${50 + k * 14} ${70 - k * 6} ${130 + k * 8} ${40 + k * 4} ${200 - k * 4} 140`, '#FFFFFF', 4)) + Lc('M40 140C60 70 140 40 200 140', '#B0BEC5', 2)
      + ring(6, (k) => Lc(`M${64 + k * 22} 140l${8 - k * 2}-${60 - Math.abs(k - 3) * 14}`, '#ECEFF1', 2.5)) + face(120, 158, 0.3)
      + g(70, 214, 1, P('M-20 0h40l-6 8h-28z', '#FF7043') + Lc('M0 0v-20', '#5D4037', 2.5) + P('M0-20l14 16H0z', '#FFFFFF', 2))),
  L('jp/hiroshima/landmark-senjokaku.v1.svg', 'เซ็นโจคาคุ ห้องโถงพันเสื่อบนเกาะมิยาจิมะ', 'Senjōkaku, the hall of a thousand mats on Miyajima', ['senjokaku', 'เซ็นโจคาคุ', 'hall of a thousand mats', 'โถงพันเสื่อ', 'toyokuni shrine', 'ศาลเจ้าโทโยคุนิ', 'miyajima hill', 'เนินมิยาจิมะ', 'unpainted wooden hall', 'โถงไม้ไม่ทาสี'], 'หาเสาไม้มากมายที่ค้ำห้องโถงไว้บนเนิน', 'Find the many wooden posts holding the hall up on the slope',
    // a huge plain wooden hall with a wide grey tiled roof, open sides with rows of posts, propped on tall stilts on a sloping hillside, a maple tree and a resting deer-free path of stone steps
    sky('#FFF8E1') + P('M-4 220c60-20 120-60 248-90v114H-4z', '#A1887F')
      + R(30, 92, 190, 54, '#D7A86E') + ring(9, (k) => R(36 + k * 22, 98, 6, 48, '#A1673F', 0, 2)) + R(30, 140, 190, 8, '#8D5524', 0, 2.5)
      + ring(9, (k) => Lc(`M${39 + k * 22} 148v${f1(70 - k * 9)}`, '#8D5524', 5)) + Lc('M30 180h190', '#8D5524', 3)
      + P('M10 96c40-16 60-40 115-44 55 4 75 28 115 44z', '#78909C') + Lc('M30 82c30-10 60-22 95-24s65 14 95 24', '#90A4AE', 3)
      + C(200, 180, 22, '#E53935') + C(214, 166, 16, '#EF6C00') + Lc('M206 196v30', '#6D4C41', 5) + ring(4, (k) => R(10 + k * 18, 222 - k * 10, 18, 6, '#BDBDBD', 1, 2)) + face(125, 118, 0.34)),

  // ---------- Kanazawa
  L('jp/kanazawa/landmark-kanazawacastle.v1.svg', 'ประตูอิชิกาวะของปราสาทคานาซาวะ', 'The Ishikawa Gate of Kanazawa Castle', ['kanazawa castle', 'ปราสาทคานาซาวะ', 'ishikawa gate', 'ประตูอิชิกาวะ', 'ishikawa-mon', 'อิชิกาวะมง', 'namako walls', 'กำแพงนามาโกะ', 'lead roof tiles', 'กระเบื้องตะกั่ว'], 'หาลายตารางเฉียงสีขาวบนกำแพงสีเทา', 'Find the white criss-cross pattern on the grey walls',
    // a castle gatehouse with pale silvery-white roofs, white upper walls and lower walls tiled in grey squares with raised white diagonal joints, a big wooden gate below
    sky('#E3F2FD') + R(-4, 206, 248, 38, '#BCAAA4', 0, 0)
      + R(20, 120, 200, 86, '#78909C') + ring(10, (k) => Lc(`M${20 + k * 20} 120l20 20M${20 + k * 20} 140l20 20M${20 + k * 20} 160l20 20M${20 + k * 20} 180l20 20`, '#FFFFFF', 2.5)) + ring(10, (k) => Lc(`M${40 + k * 20} 120l-20 20M${40 + k * 20} 140l-20 20M${40 + k * 20} 160l-20 20M${40 + k * 20} 180l-20 20`, '#FFFFFF', 2.5))
      + R(84, 148, 72, 58, '#5D4037', 0, 3) + Lc('M120 148v58', '#3E2723', 3) + ring(4, (k) => C(96 + k * 16, 170, 3, '#212121', 0))
      + R(36, 72, 168, 44, '#FFFFFF') + ring(4, (k) => R(52 + k * 40, 84, 16, 16, '#5D4037', 1, 2)) + P('M10 124l18-10h184l18 10z', '#CFD8DC') + P('M20 76l22-24h156l22 24z', '#CFD8DC') + Lc('M42 52h156', '#B0BEC5', 3)
      + P('M50 54l-6-12 10 4zM190 54l6-12-10 4z', '#B0BEC5', 2) + face(120, 98, 0.32)),
  L('jp/kanazawa/landmark-mizuhiki.v1.svg', 'มิซึฮิกิ เชือกกระดาษผูกเป็นปมสวยของคางะ', 'Mizuhiki, Kaga\'s knotted paper cords', ['mizuhiki', 'มิซึฮิกิ', 'kaga mizuhiki', 'คางะมิซึฮิกิ', 'paper cord', 'เชือกกระดาษ', 'decorative knots', 'ปมประดิษฐ์', 'gift envelope', 'ซองของขวัญ'], 'หาปมที่ผูกเป็นรูปดอกบ๊วยห้ากลีบ', 'Find the knot tied into a five-petal plum flower',
    // a white gift envelope tied with red and gold paper cords in a big looping knot, and beside it a round five-petal plum flower knotted from pink cords
    g(96, 130, 1, R(-56, -80, 112, 160, '#FFFFFF', 6) + Lc('M-56-10h112', '#E53935', 4) + Lc('M-56-4h112', '#FFD54F', 4) + Lc('M-56 2h112', '#E53935', 4)
      + Lc('M0-4c-30-30-40 10-10 6 20-4 30-30 10-6-10 10-30 30 0 30', '#E53935', 4) + Lc('M0-4c30-30 40 10 10 6', '#FFD54F', 4) + Lc('M-6 8l-14 50M6 8l14 50', '#E53935', 4) + face(0, 40, 0.38), -6)
      + g(186, 96, 1, ring(5, (k) => { const a = (k * 72 - 90) * Math.PI / 180; return C(f1(18 * Math.cos(a)), f1(18 * Math.sin(a)), 13, 'none', 0) + Lc(`M${f1(10 * Math.cos(a))} ${f1(10 * Math.sin(a))}a13 13 0 1 1 0.1 0`, '#F06292', 4); }) + C(0, 0, 7, '#FFD54F', 2.5))
      + g(196, 184, 1, Lc('M-20 0c10-20 30-20 40 0s-30 20-40 0', '#1E88E5', 4) + Lc('M-20 0c10 20 30 20 40 0', '#FFD54F', 3))),
  L('jp/kanazawa/landmark-kaburazushi.v1.svg', 'คาบุระซูชิ ปลาหางเหลืองประกบหัวผักกาด', 'Kabura-zushi, yellowtail pressed between turnip slices', ['kabura-zushi', 'kaburazushi', 'คาบุระซูชิ', 'turnip sushi', 'ซูชิหัวผักกาด', 'buri', 'ปลาบุริ', 'yellowtail', 'ปลาหางเหลือง', 'winter pickle', 'ของดองฤดูหนาว'], 'หาเส้นแครอทสีส้มเล็กๆ ที่แทรกอยู่', 'Find the thin orange carrot strips tucked in',
    // round white turnip slices sandwiching a pink slice of yellowtail, with thin orange carrot strips and a bit of kelp, on a black lacquer plate, a whole turnip with leaves beside
    E(110, 170, 96, 34, '#212121') + E(110, 166, 86, 28, '#3E2723', 0)
      + ring(3, (k) => g(60 + k * 50, 156 - (k % 2) * 6, 1, E(0, 8, 26, 12, '#FFFFFF') + E(0, 2, 24, 8, '#F8BBD0') + Lc('M-18 2l36 0', '#F48FB1', 2) + E(0, -6, 26, 12, '#FFFFFF') + Lc('M-10-6l6 4M2-8l6 4M10-4l-6 2', '#FF7043', 2.5)))
      + face(110, 150, 0.3)
      + g(196, 90, 1, C(0, 10, 26, '#FFFFFF') + P('M-4 36l4 12 4-12', '#FFFFFF', 2) + Lc('M-8-12c-10-30-20-40-30-40M0-14c0-30 4-40 10-50M8-12c12-26 24-34 34-30', '#43A047', 6) + face(0, 12, 0.3))),
  L('jp/kanazawa/landmark-kanazawaoden.v1.svg', 'โอเด้งคานาซาวะกับปูทั้งกระดองคานิเม็ง', 'Kanazawa oden with a crab in its shell', ['kanazawa oden', 'โอเด้งคานาซาวะ', 'oden', 'โอเด้ง', 'kanimen', 'คานิเม็ง', 'crab shell', 'กระดองปู', 'daikon', 'หัวไชเท้า', 'kuruma-fu'], 'หากระดองปูสีแดงที่ลอยอยู่ในหม้อ', 'Find the red crab shell bobbing in the pot',
    // a square metal pot divided into compartments of light broth with a radish round, a boiled egg, a fish-cake ball and a whole red crab shell filled with crab meat, steam rising
    R(20, 100, 200, 120, '#B0BEC5', 8) + R(28, 108, 184, 104, '#F6D08A', 4, 3) + Lc('M120 108v104M28 160h184', '#90A4AE', 4)
      + g(74, 134, 1, C(0, 0, 18, '#FFF8E1') + C(0, 0, 12, 'none', 2) + face(0, 0, 0.28))
      + g(166, 132, 1, P('M-36 6c0-26 72-26 72 0 0 14-72 14-72 0z', '#E53935') + P('M-24 2c4-8 44-8 48 0-4 6-44 6-48 0z', '#FFE0B2', 2) + Lc('M-36 4l-10-10M36 4l10-10', '#E53935', 4) + C(-10, -8, 3, '#22213A', 0) + C(10, -8, 3, '#22213A', 0))
      + g(74, 186, 1, E(0, 0, 18, 14, '#FFFFFF') + C(0, 2, 7, '#FFC107', 0)) + g(166, 186, 1, C(0, 0, 16, '#D7A86E') + Lc('M-8-4h16M-8 4h16', '#B07A3E', 2))
      + Lc('M80 90q-8-12 0-24M160 86q-8-12 0-24', '#B0BEC5', 4)),
  L('jp/kanazawa/landmark-rakugan.v1.svg', 'ราคุกัน ขนมน้ำตาลอัดพิมพ์ไม้', 'Rakugan, sugar sweets pressed in carved wooden moulds', ['rakugan', 'ราคุกัน', 'wagashi', 'วากาชิ', 'wooden mould', 'พิมพ์ไม้', 'pressed sugar', 'น้ำตาลอัด', 'tea sweets', 'ขนมคู่ชา', 'morihachi'], 'หาพิมพ์ไม้ที่แกะเป็นรูปดอกบ๊วยและใบเมเปิล', 'Find the wooden mould carved with a plum flower and a maple leaf',
    // a long carved wooden mould with plum, maple and wave shaped hollows, and beside it little pressed pastel sweets in the same shapes on a dark lacquer tray, a cup of tea
    R(16, 54, 208, 60, '#C68642', 8) + R(16, 54, 208, 14, '#A1673F', 4, 2.5)
      + g(56, 90, 1, ring(5, (k) => { const a = (k * 72 - 90) * Math.PI / 180; return C(f1(10 * Math.cos(a)), f1(10 * Math.sin(a)), 8, '#8D5524', 2); }))
      + g(120, 90, 1, P('M0-16l4 8 8-3-2 9 8 2-7 6 3 7-9-3-5 8-5-8-9 3 3-7-7-6 8-2-2-9 8 3z', '#8D5524', 2))
      + g(184, 90, 1, P('M-16 8c0-14 12-20 22-14-8 0-12 6-8 12 6 6 16 0 18-6 2 12-10 20-20 18-8-2-12-6-12-10z', '#8D5524', 2))
      + R(20, 140, 200, 86, '#3E2723', 10) + R(28, 148, 184, 70, '#4E342E', 6, 0)
      + g(66, 182, 1, ring(5, (k) => { const a = (k * 72 - 90) * Math.PI / 180; return C(f1(12 * Math.cos(a)), f1(12 * Math.sin(a)), 10, '#F8BBD0', 2); }) + C(0, 0, 5, '#FFF59D', 0))
      + g(120, 182, 1.2, P('M0-16l4 8 8-3-2 9 8 2-7 6 3 7-9-3-5 8-5-8-9 3 3-7-7-6 8-2-2-9 8 3z', '#FFAB91', 2))
      + g(178, 184, 1, P('M-18 8c0-16 14-22 24-16-8 0-12 6-8 12 6 6 18 0 20-6 2 14-12 22-22 20-10-2-14-6-14-10z', '#B3E5FC', 2)) + face(120, 196, 0.24)),

  // ---------- Hakone
  L('jp/hakone/landmark-uiro.v1.svg', 'อุยโร ขนมนึ่งเหนียวนุ่มของโอดาวาระ', 'Uirō, Odawara\'s soft steamed rice cakes', ['uiro', 'uirō', 'อุยโร', 'odawara uiro', 'อุยโรโอดาวาระ', 'steamed rice cake', 'ขนมนึ่ง', 'brown sugar', 'น้ำตาลทรายแดง', 'odawara sweets', 'ขนมโอดาวาระ'], 'หาแท่งขนมสีเขียวที่ถูกตัดเป็นชิ้น', 'Find the green bar cut into slices',
    // soft glossy bars of steamed rice cake in white, brown, green and pink lying on a bamboo leaf, the green one sliced into pieces, a bamboo pick
    P('M14 170c40-60 170-70 212-20-40 40-170 50-212 20z', '#7CB342') + Lc('M30 166c60-30 140-40 180-18', '#558B2F', 3)
      + [[60, 130, '#FFFFFF'], [96, 124, '#8D5524'], [132, 120, '#F8BBD0']].map(([x, y, c]) => g(x, y, 1, R(-14, -40, 28, 80, c, 12) + E(-4, -26, 4, 10, '#FFFFFF', 0), -14)).join('')
      + ring(3, (k) => g(162 + k * 18, 134 + k * 4, 1, R(-9, -16, 18, 32, '#A5D6A7', 6), -14)) + face(96, 128, 0.34)
      + Lc('M188 80l-14 50', '#D7A86E', 4)),
  L('jp/hakone/landmark-mossgarden.v1.svg', 'สวนมอสของพิพิธภัณฑ์ศิลปะฮาโกเนะ', 'The moss garden of the Hakone Museum of Art', ['moss garden', 'สวนมอส', 'hakone museum of art', 'พิพิธภัณฑ์ศิลปะฮาโกเนะ', 'gora', 'โกระ', 'shinsenkyo tea house', 'เรือนน้ำชาชินเซ็นเคียว', 'maple garden', 'สวนเมเปิล'], 'หาทางเดินหินที่วางเป็นจุดๆ บนพรมมอส', 'Find the stepping stones on the carpet of moss',
    // soft rolling mounds of bright green moss under slender maple trees with red leaves, a path of round stepping stones and a small thatched tea house at the back
    sky('#F1F8E9') + g(180, 92, 1, P('M-30 0l30-22 30 22z', '#C8A16B') + R(-22, 0, 44, 22, '#FFF8E1', 0, 2.5) + Lc('M0 0v22', '#8D6E63', 2.5))
      + [[40, 40], [110, 30], [210, 50]].map(([x, y]) => Lc(`M${x} ${y + 90}v-70`, '#5D4037', 4) + C(x - 14, y + 10, 18, '#E53935', 2) + C(x + 14, y + 16, 16, '#EF5350', 2) + C(x, y, 16, '#FF7043', 2)).join('')
      + P('M-4 150c30-30 60-30 90-10s50-30 90-20 40 20 68 10v114H-4z', '#7CB342') + P('M-4 190c40-20 80-10 120 0s80-20 128-10v64H-4z', '#8BC34A')
      + ring(6, (k) => E(40 + k * 32, 230 - k * 14, 12, 6, '#BDBDBD')) + face(80, 200, 0.34)),
  L('jp/hakone/landmark-onshipark.v1.svg', 'อาคารโชโยคังในสวนอนชิฮาโกเนะ', 'The Shōyōkan lookout in Onshi-Hakone Park', ['onshi-hakone park', 'สวนอนชิฮาโกเนะ', 'shoyokan', 'โชโยคัง', 'lake ashi view', 'วิวทะเลสาบอาชิ', 'tonogashima', 'โทโนกาชิมะ', 'lakeside lookout', 'จุดชมวิวริมทะเลสาบ'], 'หาบ้านสีขาวหลังเล็กบนแหลมที่ยื่นลงไปในทะเลสาบ', 'Find the little white house on the point sticking out into the lake',
    // a small white western-style house with a green roof and arched windows standing on a pine-covered point jutting into a blue lake, forested hills across the water
    sky('#E3F2FD') + P('M-4 100c40-30 90-30 130-10s80-20 118-10v30H-4z', '#558B2F') + R(-4, 110, 248, 134, '#42A5F5', 0, 0) + Lc('M150 150h50M170 170h40M40 200h40', '#BBDEFB', 3)
      + P('M-4 160c30-10 70-30 110-30s30 30 10 50-60 20-120 24z', '#689F38')
      + [[16, 156], [92, 140]].map(([x, y]) => P(`M${x - 12} ${y}h24l-12-30z`, '#2E7D32', 2.5)).join('')
      + R(36, 104, 56, 34, '#FFFFFF') + P('M30 106l34-20 34 20z', '#43A047') + ring(3, (k) => P(`M${44 + k * 16} 132v-14c0-8 10-8 10 0v14z`, '#90CAF9', 2)) + face(64, 120, 0.22)
      + kid(140, 226, '#FF7043', 0.8)),
  L('jp/hakone/landmark-komagatake.v1.svg', 'ยอดเขาโคมางาตาเกะ', 'The summit of Mount Komagatake', ['komagatake', 'โคมางาตาเกะ', 'mount komagatake', 'ภูเขาโคมางาตาเกะ', 'hakone mototsumiya', 'ฮาโกเนะโมโตะสึมิยะ', 'summit meadow', 'ทุ่งหญ้าบนยอดเขา', 'mountain top view', 'วิวบนยอดเขา'], 'หาศาลเจ้าหลังเล็กๆ บนยอดเขาโล่งๆ', 'Find the tiny shrine on the bare round summit',
    // a wide bare grassy dome of a summit with a tiny wooden shrine house and a stone path, the blue lake and rolling hills far below, a child pointing at the view
    sky('#E1F5FE') + P('M-4 150c40-20 80-14 120-6s80-20 128-10v110H-4z', '#81C784') + E(170, 160, 50, 12, '#42A5F5', 2.5) + P('M-4 180c60-80 190-80 248 0v64H-4z', '#C5E1A5')
      + ring(8, (k) => Lc(`M${30 + k * 26} ${170 - Math.abs(k - 3.5) * -4}l4-8`, '#9CCC65', 2.5))
      + g(120, 118, 1, P('M-24 0l24-16 24 16z', '#8D6E63') + R(-16, 0, 32, 22, '#D7A86E', 0, 2.5) + R(-6, 6, 12, 16, '#6D4C41', 0, 2)) + Lc('M120 140c-10 30 10 60-6 104', '#E0E0E0', 8)
      + face(80, 190, 0.32) + kid(180, 206, '#5C6BC0', 0.9) + Lc('M190 186l14-10', '#FFE0BD', 4)),
  L('jp/hakone/landmark-yubadon.v1.svg', 'ยูบะด้ง ข้าวหน้าฟองเต้าหู้ของฮาโกเนะ', 'Yuba-don, Hakone\'s tofu-skin rice bowl', ['yuba don', 'ยูบะด้ง', 'yuba', 'ยูบะ', 'tofu skin', 'ฟองเต้าหู้', 'hakone yuba', 'ยูบะฮาโกเนะ', 'egg rice bowl', 'ข้าวหน้าไข่'], 'หาแผ่นฟองเต้าหู้ย่นๆ สีครีมบนข้าว', 'Find the wrinkly cream sheets of tofu skin on the rice',
    // a lacquer bowl of rice topped with soft wrinkled sheets of tofu skin in a thin golden egg-and-broth sauce, a sprig of green mitsuba leaves, a little dish of pickles
    P('M30 116h170c0 60-36 90-85 90s-85-30-85-90z', '#B71C1C') + P('M40 150c10 40 40 54 75 54s65-14 75-54', '#212121', 0) + E(115, 116, 85, 22, '#212121') + E(115, 116, 76, 17, '#FFE082', 3)
      + ring(3, (k) => P(`M${62 + k * 34} 116c4-14 20-18 30-10 6-8 18-2 14 8-4 10-40 12-44 2z`, '#FFF3E0', 2.5) + Lc(`M${68 + k * 34} 110c6 2 10-2 16 0`, '#E6C27A', 2))
      + P('M138 98c4-10 14-12 20-6-6 2-10 6-12 10z', '#43A047', 2) + Lc('M146 100l-8 12', '#43A047', 2) + face(115, 160, 0.42)
      + g(206, 196, 1, E(0, 0, 22, 8, '#FFFFFF') + ring(3, (k) => R(-12 + k * 9, -8, 7, 7, '#FDD835', 1, 1.5)))),

  // ---------- Tohoku
  L('jp/tohoku/landmark-hirosaki.v1.svg', 'ปราสาทฮิโรซากิและกลีบซากุระบนคูเมือง', 'Hirosaki Castle and its petal-covered moat', ['hirosaki castle', 'ปราสาทฮิโรซากิ', 'hirosaki park', 'สวนฮิโรซากิ', 'hanaikada', 'ฮานะอิคาดะ', 'petal carpet', 'พรมกลีบซากุระ', 'sakura moat', 'คูเมืองซากุระ'], 'หาคูน้ำที่มีกลีบดอกสีชมพูปูเต็มผิวน้ำ', 'Find the moat covered in pink petals',
    // a small three-tier white castle on stone walls behind a moat completely covered by a carpet of pink cherry petals, a red wooden bridge and cherry trees in bloom
    sky('#FCE4EC') + P('M60 120l10-30h100l10 30z', '#9E9E9E') + R(84, 74, 72, 18, '#FFFFFF') + roof(76, 164, 76) + R(92, 56, 56, 16, '#FFFFFF') + roof(84, 156, 58) + R(100, 40, 40, 14, '#FFFFFF') + P('M92 42l10-12h36l10 12z', '#37474F') + face(120, 84, 0.26)
      + [[24, 90], [216, 96], [60, 100]].map(([x, y]) => Lc(`M${x} ${y + 20}v26`, '#6D4C41', 5) + C(x, y, 26, '#F8BBD0') + C(x + 12, y + 10, 16, '#F48FB1', 2)).join('')
      + R(-4, 140, 248, 104, '#F48FB1', 0, 0) + ring(20, (k) => C(8 + (k * 47) % 236, 152 + Math.floor(k / 5) * 22 + (k % 2) * 6, 4, '#FCE4EC', 0))
      + P('M60 196c20-30 100-30 120 0', 'none') + Lc('M56 200c20-34 108-34 128 0', '#E53935', 8) + ring(5, (k) => Lc(`M${78 + k * 21} ${190 - (k === 2 ? 12 : k % 4 ? 8 : 2)}v-12`, '#E53935', 3))),
  L('jp/tohoku/landmark-oirase.v1.svg', 'ลำธารโออิราเสะ', 'The Oirase Stream', ['oirase', 'โออิราเสะ', 'oirase stream', 'ลำธารโออิราเสะ', 'oirase gorge', 'หุบเขาโออิราเสะ', 'towada', 'โทวาดะ', 'mossy rocks', 'หินมอส'], 'หาก้อนหินที่มีมอสสีเขียวคลุมอยู่กลางลำธาร', 'Find the moss-covered rocks in the middle of the stream',
    // a clear stream tumbling over little rapids between mossy boulders, beech trees in yellow and orange autumn leaves on both banks, a wooden walking path along the side
    sky('#FFF8E1') + [[20, 60, '#FFB300'], [70, 40, '#FF7043'], [180, 50, '#FDD835'], [226, 70, '#EF6C00']].map(([x, y, c]) => Lc(`M${x} ${y}v100`, '#8D6E63', 5) + C(x, y, 26, c, 2.5)).join('')
      + P('M-4 140h248v104H-4z', '#7CB342') + P('M90 140c-10 30 -40 60-60 104h160c-10-40-20-74-40-104z', '#4DD0E1')
      + ring(4, (k) => Lc(`M${80 + k * 18} ${170 + k * 14}q8-6 16 0`, '#FFFFFF', 3))
      + [[86, 190, 16], [150, 172, 12], [124, 224, 14]].map(([x, y, r]) => E(x, y, r + 4, r, '#78909C') + P(`M${x - r} ${y - 2}c4-${r} ${r * 2 - 8}-${r} ${r * 2} 0`, '#689F38', 2)).join('')
      + Lc('M190 244l30-100', '#A1673F', 8) + face(150, 172, 0.24)),
  L('jp/tohoku/landmark-ouchijuku.v1.svg', 'โออุจิจูกุ เมืองพักม้าหลังคามุงจาก กับโซบะกินด้วยต้นหอม', 'Ōuchi-juku and its soba eaten with a leek', ['ouchi-juku', 'ouchijuku', 'โออุจิจูกุ', 'negi soba', 'เนงิโซบะ', 'leek chopstick', 'ต้นหอมแทนตะเกียบ', 'post town', 'เมืองพักม้า', 'thatched roofs', 'หลังคามุงจาก'], 'หาต้นหอมยาวๆ ที่ใช้แทนตะเกียบ', 'Find the long leek used instead of chopsticks',
    // a straight dirt street lined with thick thatched-roof houses, and in front a bowl of cold soba with a whole long green leek lifting the noodles in place of chopsticks
    sky('#E3F2FD') + P('M100 110h40l60 134H40z', '#D7CCC8')
      + [[-4, 100], [178, 100]].map(([x, y]) => P(`M${x} ${y + 10}l34-40 34 40z`, '#A1887F') + R(x + 6, y + 10, 56, 30, '#8D6E63', 0, 2.5)).join('') + P('M30 108l24-30 24 30z', '#BCAAA4') + P('M162 108l24-30 24 30z', '#BCAAA4')
      + P('M40 190h140c0 30-30 44-70 44s-70-14-70-44z', '#455A64') + E(110, 190, 70, 14, '#5D4037') + ring(5, (k) => Lc(`M${60 + k * 22} 188c6-6 12 6 18 0`, '#A1887F', 4))
      + Lc('M120 186c10-40 30-80 70-150', '#FFFFFF', 9) + Lc('M150 120c10-24 24-50 40-84', '#7CB342', 9) + Lc('M120 186c6-30 0-50-14-60', '#A1887F', 3) + face(110, 210, 0.32)),
  L('jp/tohoku/landmark-sakuranbo.v1.svg', 'เชอร์รีซาโตนิชิกิแห่งยามากาตะ', 'Yamagata\'s Satōnishiki cherries', ['sakuranbo', 'ซากุรัมโบ', 'yamagata cherries', 'เชอร์รียามากาตะ', 'satonishiki', 'ซาโตนิชิกิ', 'cherry picking', 'เก็บเชอร์รี', 'higashine', 'ฮิงาชิเนะ'], 'หาเชอร์รีคู่ที่ก้านติดกัน', 'Find the pair of cherries joined at the stem',
    // a shallow wooden gift box with shiny red-and-yellow cherries lined up in neat rows, and a pair of cherries on joined stems with a leaf in front
    R(20, 70, 200, 110, '#D7A86E', 8) + R(30, 80, 180, 90, '#FFFFFF', 4, 2.5)
      + ring(18, (k) => { const x = 46 + (k % 6) * 30, y = 98 + Math.floor(k / 6) * 26; return C(x, y, 11, '#E53935', 2) + E(x - 4, y - 3, 4, 3, '#FFCDD2', 0); })
      + g(120, 196, 1, Lc('M-20 10c4-30 14-46 20-50M20 10c-2-30-12-46-20-50', '#558B2F', 3) + C(-22, 16, 18, '#E53935') + C(22, 16, 18, '#D32F2F') + E(-28, 10, 5, 4, '#FFCDD2', 0) + E(16, 10, 5, 4, '#FFCDD2', 0) + face(-22, 18, 0.3) + face(22, 18, 0.3) + P('M0-40c10-12 26-12 30-4-12 4-22 6-30 4z', '#7CB342', 2))),
  L('jp/tohoku/landmark-imoni.v1.svg', 'เทศกาลอิโมนิ หม้อยักษ์ริมแม่น้ำที่ยามากาตะ', 'The giant imoni pot by the river in Yamagata', ['imoni', 'อิโมนิ', 'imonikai', 'อิโมนิไค', 'imoni festival', 'เทศกาลอิโมนิ', 'giant pot', 'หม้อยักษ์', 'mamigasaki river', 'แม่น้ำมามิกาซากิ', 'riverside stew'], 'หาที่ตักดินของรถขุดที่ใช้คนหม้อ', 'Find the digger\'s bucket stirring the pot',
    // an enormous iron pot over a wood fire on a riverbank, full of stew with potatoes, beef and leeks, a yellow digger's long arm dipping its bucket in to stir, steam rising
    sky('#E3F2FD') + R(-4, 200, 248, 44, '#4FC3F7', 0, 0) + R(-4, 186, 248, 16, '#BCAAA4', 0, 0)
      + ring(5, (k) => P(`M${46 + k * 30} 190l10-26 10 26z`, k % 2 ? '#FFB300' : '#FF7043', 2)) + Lc('M30 186h170', '#5D4037', 6)
      + P('M24 110h180c0 50-40 76-90 76s-90-26-90-76z', '#455A64') + E(114, 110, 90, 22, '#37474F') + E(114, 110, 82, 17, '#A1673F', 0)
      + ring(6, (k) => C(54 + k * 22, 108 + (k % 2) * 4, 7, k % 2 ? '#F3E2B3' : '#E8D5A0', 2)) + ring(4, (k) => Lc(`M${66 + k * 30} 104l12 4`, '#7CB342', 4))
      + g(206, 40, 1, Lc('M20 120L10 30L-50 30', '#FBC02D', 10) + P('M-60 30l-20 30 20 14 14-30z', '#F9A825', 3) + R(4, 120, 40, 24, '#FBC02D', 4) + C(10, 150, 6, '#455A64', 2) + C(38, 150, 6, '#455A64', 2))
      + Lc('M70 84q-8-12 0-24M110 80q-8-12 0-24', '#ECEFF1', 4) + face(114, 150, 0.42)),
];

export default { places: {}, items };
