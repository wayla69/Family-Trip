# The library of things to do — the built-in list

Phase E2 of `docs/PLACES-ECOSYSTEM.md`. Code: `server/sightlib.js`, table `sight_lib`, files `server/sights/<cc>-<n>.json`,
lint `npm run sights:lint`.

**Owner's rule (19 Nov 2026): every built-in sight is checked on the web before it enters the library.** A row ships only with `ok`
(the month a search confirmed it is open and what it costs) and `src` (the page that showed it). Nothing from memory alone.

## File format

```json
{
  "cc": "jp",
  "towns": [
    {
      "place": "jp-tokyo",
      "sights": [
        {
          "name": { "en": "Ueno Zoo", "th": "สวนสัตว์อุเอโนะ" },
          "local": "恩賜上野動物園",
          "kind": "zoo",
          "area": { "en": "Ueno", "th": "อุเอโนะ" },
          "what": { "en": "Japan's oldest zoo: giant pandas, gorillas and a monorail-free walk between two halves", "th": "สวนสัตว์ที่เก่าที่สุดของญี่ปุ่น มีแพนด้ายักษ์และกอริลลา" },
          "why": { "en": "Flat paths, shade and many benches; the pandas come first for small children", "th": "ทางเรียบ มีร่มและม้านั่งเยอะ เด็กเล็กชอบดูแพนด้า" },
          "tip": { "en": "Go at opening time for the panda queue; closed on Mondays", "th": "ไปตอนเปิดเพื่อเลี่ยงคิวแพนด้า ปิดวันจันทร์" },
          "ages": [2, 2, 2, 1],
          "hrs": 3,
          "io": "out",
          "pram": "yes",
          "price": { "en": "≈ ¥600 adults · under 12 free", "th": "≈ ¥600 ผู้ใหญ่ · เด็กต่ำกว่า 12 ปีฟรี" },
          "book": "none",
          "q": "Ueno Zoo, Taito City, Tokyo",
          "ok": "2026-11",
          "src": "https://www.tokyo-zoo.net/english/ueno/"
        }
      ]
    }
  ]
}
```

| Field | Rule |
|---|---|
| `place` | a city id of `public/stock/index.json` (`jp-tokyo`, `p-orlando`, …) |
| `name` | `{en, th}`; Thai transliterated, never translated word by word (docs/STYLE.md) |
| `local` | optional: the name in the local script, as on the sign |
| `kind` | one of `themepark zoo aquarium museumkid museum park play beach nature views culture oldtown market show farm onsen ride shop` |
| `area` | `{en, th}`: district or neighbourhood |
| `what` / `why` / `tip` | `{en, th}`, one sentence each, ≤ 220 letters; `why` = why it suits small children (or what to know if it suits them less) |
| `ages` | four numbers for ages 0–2, 3–5, 6–9, 10+: `0` not for them · `1` fine · `2` great |
| `hrs` | how long a family usually stays, in hours (0.5 – 10) |
| `io` | `in` · `out` · `both` (a rain plan needs `in` or `both`) |
| `pram` | `yes` (step-free) · `part` · `no` |
| `price` | `{en, th}` with `≈`, local currency, adult · child · free under N; `"Free"` / `"ฟรี"` when free |
| `book` | `none` · `rec` (recommended) · `req` (required / timed tickets) |
| `q` | a map query: name, district, city |
| `ok` | `YYYY-MM`: the month the web check confirmed it trading and its price |
| `src` | `https://…`: the page that confirmed it (the official site first, else the tourism office, else a dated 2025–2026 listing) |

Prices and hours change; the card still says "check before you go". British spelling in English, no ค่ะ/ครับ in Thai, `เช็ก`.

**Ages, not left out** (owner, 20 Nov 2026): a place that suits only older children (real mummies, a long steep walk, a 12+ science centre) goes in with its `ages` saying so (0 for the bands it does not suit); `#/explore/<town>` groups the list by the youngest band each place suits best. Still left out whatever the age: adults-only places, casinos, nightlife, riding animals, religious sites that ask visitors to keep away.

## What a city should hold

15–20 sights a city (10 or more for one resort, a place id `p-…`, such as Disneyland Paris — never padded with what could not be checked), mixed kinds, chosen for a family with children 1–8:
- the city's big ones;
- at least three that are indoors or both, for a rain plan;
- at least two free ones;
- a playground or park, and a food market or street.

A small or remote town where an honest web check finds fewer than 15 places it can confirm (a current page showing it open and its
price) carries `"thin": true` on the town: it needs 4 or more and the rainy-day rule does not apply. Never pad a town to reach 15.

Left out: anything closed, under renovation for the coming year, adults-only or with no web page newer than 2025. Also left out: casinos,
nightlife, and religious sites that ask visitors to keep away.

## Passes

- **Nov 2026, E2:** 29 towns, 459 sights (Japan, Korea, Taiwan, Hong Kong, Macau, Singapore, Thailand, Vietnam, Malaysia, Indonesia, Australia, New Zealand, Switzerland, Paris, London).
- **19 Nov 2026, E6:** 8 more towns, 128 sights — Okinawa 16, Jeju 15, Ho Chi Minh City 15, Phu Quoc 16, Penang 16, Koh Samui 16, Dubai 17, Shanghai 16 (37 towns, 587 sights). Every row was confirmed by a web search that session, but the official sites themselves could not be opened from the session's network, so most `src` are dated 2025–2026 guides, tourism offices or news pages the search showed. Weakest prices, kept with "≈" and a "check" note: Eco Land (Jeju, sources ₩14,000–21,000), Aqua Planet Jeju (online prices lower), Dubai Safari Park (new season's price not out), the Shanghai Science and Technology and Natural History museums (adult price on the booking page only), ESCAPE Penang, Paradise Park Farm (Samui). Left out for want of a current, dated source: Nago Pineapple Park, Bios no Oka, JUNGLIA, Ryukyu Mura (Okinawa); Teddy Bear Museum, Camellia Hill (Jeju); VinWonders Grand Park, tiNiWorld, Saigon Skydeck, the city museums (Ho Chi Minh City); Tropical Spice Garden (Penang); Coco Splash, the Samui Aquarium, Butterfly Hill (closed), Secret Buddha Garden (Samui); Haichang Ocean Park (Shanghai). The twice-yearly re-check (1 January, 1 July) now covers this list too.
- **19 Nov 2026, E2 round 3:** 8 more towns — Disneyland Paris 10 (a resort: 10 or more), Rome 16, Barcelona 15, Munich 15, Amsterdam 15, New York 16, California 15, Orlando 15. Checked the same way (web search, official sites not reachable from the session). Softer prices to re-check first: Disneyland Paris (the gate price only; less online by date); Rome — the Zoology Museum (€7 or €7.50), Casina di Raffaello (a spring 2026 notice); Barcelona — Park Güell (official tables disagree), Tibidabo's winter days, the Aquarium's adult price; Munich — SEA LIFE, BMW Museum, Bavaria Filmstadt (2026 listings), Deutsches Museum single tickets; Amsterdam — the Maritime Museum's child price, the Blue Boat adult fare, Ridammerhoeve (free or €3.25); New York — the Natural History Museum's out-of-state price; California — Universal's child price; Orlando — the Disney World ranges, Epic Universe "from". Left out: La Brea Tar Pits (reported closed for work), Brooklyn Children's Museum (no 2026 price), the Olympic Tower (Munich, closed until 2027), Technotown (Rome, 12+), Davy Crockett's Adventure and Aqua Mundo (no price).
- **19 Nov 2026, every town ("ทำข้อ 1 ให้ครบเลย"):** the remaining 170 towns, about 2,000 sights (207 towns, 2,600 in all), written by
  Sonnet agents three at a time (the web search allowance is shared by every agent; twenty at once spent it in minutes). Rules learned on
  the way and now in the agents' brief: a seasonal place stays in with its season in `tip`; a price no page showed is "Check the price"
  (never a guess, a currency conversion, a group rate or an "older guides say"); one named place per row; a town that honest searching
  cannot fill is `"thin": true` (4 or more). 99 towns are thin — mostly small Thai towns, remote regions (the Gobi, Uluru, the Atacama,
  Plitvice) and places whose official sites never appeared in search results. Most `src` are tourism offices, dated guides and ticket
  sellers: the official sites could not be opened from the session's network.
  **Review:** four reviewers read every new row (no searches) and six spot-checked 336 rows on the web (two a town). Every finding was
  checked before fixing: temples, cathedrals, pagodas and a mosque made the subject of a row were taken out (Giant Wild Goose Pagoda,
  Chongsheng, Cologne and Strasbourg cathedrals, Wat Phra That Lampang Luang, Wat Phumin, Wat Si Chum, Phra Mahathat Kaen Nakhon,
  Islamic Center NTB); riding animals out (Tromsø reindeer sledding, a Bruges carriage, Farm Chokchai's pony rides); the National
  Museum of Finland (closed until April 2027) and a Yellowstone booklet out; prices the web check corrected (Terracotta Army ¥120,
  Nymphenburg €16, Arctic Snow Hotel €35/€17 from 15 December, Gullfoss free, Lake Braies 2026 parking); 75 prices that rested on old
  or undated pages became "Check the price". Most "wrong town" flags were false: the library's towns are regions (Heidelberg and the
  Black Forest, Buenos Aires and Iguazú, Toronto and Niagara, Santiago and Valparaíso, Seville and Granada, Paro–Thimphu–Punakha).
- **20 Nov 2026, thin towns round 1** (owner: "เติมที่เที่ยวให้ 97 เมืองที่ยังบาง"): 25 towns of Japan, Korea, Taiwan, Vietnam, Malaysia and Thailand, +36 sights; Suwon, Tainan–Kaohsiung (tw-south) and Da Lat reach 15 and are no longer thin (94 left). The session could not open most sites (its network allows few hosts), so every row rests on search results; prices no result showed are "Check the price".
- **20 Nov 2026, thin towns round 2:** with the session's network opened, the pages were read with curl (WebFetch could not resolve hosts): 40 towns of Japan, Korea, Taiwan, Vietnam, Malaysia, Cambodia, Laos, the Philippines, Indonesia and Thailand, +167 sights (2,806 in all). No longer thin: Nagano, Nagasaki, Gangwon, Nha Trang, Langkawi, Borneo, Siem Reap, Luang Prabang, Yogyakarta, Ayutthaya, Hat Yai, Lampang, Chanthaburi, Loei, Ubon, Udon (78 thin left; Koh Chang holds 15 but too few for a rainy day). Softer sources to re-check first: thaiholidayguide.com pages for the Thai towns (dated June–July 2026), Grab/TrueID/KTC listings for Udon, Ubon, Loei, Koh Chang and Satun (no prices: "Check the price"), helloangkor.com for Siem Reap.
- **20 Nov 2026, thin towns round 3:** +71 sights in 25 towns (2,877 in all): Beijing, Chengdu, Chongqing, Guilin, Xi'an, Kumamoto, Nikko, Gyeongju, Jeonju, Taichung (tw-central), Khao Yai, Khon Kaen, Korat, Sukhothai, Koh Lipe/Satun, Nan, Surat Thani reach 15; Koh Chang gains its rainy-day rows; four Pai sights went to Chiang Mai (the library files Pai there). 60 towns are still thin — mostly outside Asia — plus Khao Kho, Mae Hong Son, Nakhon Si Thammarat, Trang, Rayong and Hualien. Prices found current on the web were applied to Beijing Zoo and the Three Gorges Museum; the Wakuwakuza row says it is closed after the July 2026 earthquake until December.
- **20 Nov 2026, thin towns round 4** (owner: "ทำต่อ"): the 60 towns left, all regions, +155 sights (3,032 in all). Now at 15 or more: Abu Dhabi, Almaty, Tashkent, Cairo, Cape Town, Marrakech, Geneva, Zermatt, Cologne, Rothenburg, Bruges, Český Krumlov, Nice, Bled, Porto, Helsinki, Tromsø, Boston, Seattle, the Golden Triangle, Bohol, Hualien, Mae Hong Son, Nakhon Si Thammarat, Rayong. 35 stay thin, honestly: places a web check could not fill (Myanmar, the Maldives, the Gobi, Ulaanbaatar, Plitvice, Uluru, the Atacama, Kruger, Petra, Paro) and towns one or a few short. Many new rows say "Check the price" because the pages showed none.
- **20 Nov 2026, thin towns round 5** (owner: "ทำหมดเลย"): the towns one to three short, +21 sights (3,053 in all). Now at 15: Buenos Aires, Patagonia, Rio, Fes, Lapland, Bratislava, Trang, the Masai Mara, Rotorua, Pamukkale (Lombok holds 15 but still too few for a rainy day); Khao Kho has its rainy-day rows (two museums in Lom Sak and Phetchabun town, on the way). Luxor reaches 15 too: the owner's rule since 20 Nov 2026 is to put a place in and let its `ages` say who it is for ("ใส่ให้ครบได้ แต่แบ่งกลุ่มตามอายุเด็ก") — the Mummification Museum is `[0, 0, 1, 2]`, and the town page groups its things to do by the youngest age they suit best. 23 stay thin, among them Boracay and Lombok. Left out again: the Kantang museum (no current source). Softer sources: Lombok's beaches and night market rest on one 2026 blog guide, Pamukkale's three on a Yolcu360 guide; MIJU (Buenos Aires) and the Rio Planetarium on search results (the official pages refused curl).
- **20 Nov 2026, brought back** (owner: "มีหลายอย่างไหมที่โดนเอาออกเพราะเกณฑ์เก่า เอากลับมาได้"): the places earlier rounds left out under rules now relaxed were checked again with their pages read now, +25 sights (3,079 in all). Temples and cathedrals that welcome visitors are rows again, each with its dress code in `tip`: Cologne Cathedral (and its tower), Strasbourg Cathedral (the astronomical clock, the platform climb), the Giant Wild Goose Pagoda, Chongsheng Temple and the Three Pagodas, Wat Si Chum (Sukhothai), Phra Mahathat Kaen Nakhon, the Islamic Center NTB (Wat Phra That Lampang Luang and Wat Phumin were already rows). For older children, with their ages: Technotown (Rome, 12+), the War Remnants Museum. Pages that could not be opened before: JUNGLIA, Bios no Oka, Nago Pineapple Park, Ryukyu Mura, Teddy Bear Museum, Camellia Hill, VinWonders Grand Park, tiNiWorld, the Ho Chi Minh City Museum of History, Tropical Spice Garden, Coco Splash, Secret Buddha Garden, Haichang Ocean Park, Brooklyn Children's Museum, Aqua Mundo (Villages Nature, near Disneyland Paris). Still out: La Brea Tar Pits (closed for renovation until about 2028), the Olympic Tower (closed until early 2027), Davy Crockett's Adventure (no page shows day visits), Saigon Skydeck and the Samui Aquarium (no reliable current page), Pura Lingsar (only an undated page). Softer sources to re-check first: Aqua Mundo (a booking site), Coco Splash (a 2026 roundup), the Ho Chi Minh City Museum of History (its closing day).
- **20 Nov 2026, thin towns round 6** (owner: "ทำหมดเลย 1-4"): the search allowance ran out early, +51 sights in 12 towns (3,130 in all, 20 thin): Yunnan (Dali Museum, the Yan Compound, Mu's Residence, the Jiuxiang caves…), Tbilisi and Cappadocia reach 15; Zhangjiajie, Harbin, Astana, Uluru (Ayers Rock Resort's own experiences), Petra (Aqaba, the Dead Sea Panorama Museum, Shobak, Dana), Kruger (the Panorama Route), Atacama, Fiji and Plitvice gained a few. Prices no page showed (or only a promotion, or two figures) are "Check the price". Fixes: Coco Splash (Samui) out — no current page; Aqua Mundo's source is now Center Parcs' own day-ticket page; the Ho Chi Minh City Museum of History says closed on Mondays (two dated 2025–2026 news pages). The rest of the thin towns and the library's growth (big cities 60, others 35, small 22) went to the owner's Gemini Deep Research brief.
- **20 Nov 2026, Gemini Deep Research round 1** (the owner ran our brief in Gemini and sent the share link): every row it gave was opened here before it went in; kept: the Gallery of Central Australia (Uluru reaches 15), Zhangjiajie Museum and the Tujia Folk Customs Park; left out: Maruku Arts (inside the Cultural Centre, already a row), Zhangjiajie's ice and snow park (no dated page), Atameken (its link was another place's page), Boracay's Keyhole (only reached on a land-tour package). In the care files: four museum and tower nursing rooms in Korea (Korea Tourism Organization accessible-tourism pages, Gyeongju's tourism page) and Gyeongju's late-opening Neulbom Pharmacy (the city's 2025 notice); the Venice pharmacies were left out (the health-board list is from 2021), and pages that refused to open here (Busan, Chuncheon, Suwon, Florence's pharmacy list, Venice's Baby Pit Stop) wait for another check.
