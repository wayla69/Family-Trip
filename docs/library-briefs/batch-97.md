# Research task: family places to eat and things to do (LifeBook travel app)

LifeBook is a travel app for Thai families with children aged 1–8. Your list is checked by a script.
The script opens every `src` link and looks for the `name` and the `quote` word for word.
It also looks for the page's date and any price you give.
A row that fails is thrown away, so accuracy matters more than count. Fewer honest rows beat a long list.

## The one rule
Every row must come from a web page you actually opened in this task.
- The page must be dated 2025 or 2026, or be the place's own official site.
- Write nothing from memory.
- If you did not read a fact on the page, leave the row out.

## For each town below, find
- **D: places to eat** that work for families with small children: restaurants, quick bites, cafés.
  - Prefer pages that say something about children: high chairs, a kids' menu, a play corner, room for a pram, mild food.
- **E: things to do** with small children: museums for kids, zoos, aquariums, parks, playgrounds, farms, beaches, nature, markets, shows, indoor places for a rainy day.
- Skip every place already listed under "already in the app" (under any name).

## Leave out
- Places that are closed, under renovation or "temporarily closed".
- Bars, nightlife, casinos and adults-only places.
- Riding animals (elephant, horse, camel, pony) and animal performances.
- A mall or a shop listed as a "thing to do". A play area inside a mall is fine.
- Places outside the town or area named below.

Temples and churches are fine: say the dress code in `tip`.

## Good sources
- Family travel blogs, tourism-board pages, local lifestyle or news lists and Wanderlog lists.
- They must show a 2025–2026 date.
- Cite the list page or article itself.
- Do not cite Google Maps, TripAdvisor, Instagram, TikTok, or any page with no date.
- Do not cite machine-written ranking sites (for example restaurantsforkings.com).

## Every field must come from the page
- `quote` is ONE sentence or phrase copied word for word from the page, at most 200 characters. It must contain the place's name, or sit right under its heading. Do not fix typos, translate or shorten words inside it.
- `name` is exactly as the page writes it.
- `price` is only an amount printed on the page, written with ≈ (e.g. "≈ ¥1,200"). If the page prints no amount, write exactly `Check the price`.
- `date` is the page's own date as YYYY-MM, or `official` for the place's own website.
- `kids` is only what the page says about children, else "".

## Output
For each town, give ONE JSON code block. Do not add comments inside the JSON. Use this shape:

```json
{"D": [
  {"place": "<place id>", "name": "...", "local": "<local-script name if the page shows it, else ''>",
   "kind": "restaurant|quick|cafe", "area": "<district or street the page gives>", "tag": "<cuisine or dish, 2–4 words>",
   "what": "<one sentence>", "why": "<one sentence: what the page says about children, else a plain reason>",
   "price": "<as printed with ≈, or 'Check the price'>", "kids": "<from the page, else ''>",
   "map": "<name, area, town>", "src": "<https page>", "date": "YYYY-MM", "quote": "<copied word for word>"}
 ],
 "E": [
  {"place": "<place id>", "name": "...", "local": "",
   "kind": "themepark|zoo|aquarium|museumkid|museum|park|play|beach|nature|views|culture|oldtown|market|show|farm|onsen|ride",
   "area": "...", "what": "...", "why": "<what children enjoy there>", "tip": "<closing day, dress code, best time: only from the page>",
   "ages": [0, 1, 2, 2], "hrs": 2, "io": "in|out|both", "pram": "yes|part|no",
   "price": "...", "book": "none|rec|req", "map": "...", "src": "...", "date": "YYYY-MM", "quote": "..."}
 ]}
```

Field notes:
- `ages` gives how well the place suits each age group, in this order: 0–2, 3–5, 6–9 and 10+. Each value is 0 (not suitable), 1 (fine) or 2 (great).
- `hrs` is how long a visit takes, in hours.

Aim for 8–15 places to eat and 8–15 things to do per town, if honest sources allow. After the JSON, write one line per town: searches used, pages opened, rows written.

---

## Towns for this task

### kr-jeju — Jeju (South Korea)
Area covered: Jeju (also known as / includes: jeju, jeju island, seogwipo, seongsan, hallasan)

Now in the app: 33 places to eat, 31 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Myeongjin Jeonbok / 명진전복; Ollae Guksu / 올래국수; Jamae Guksu / 자매국수; Samdae Guksu Hoegwan / 삼대국수회관 본점; Donsadon / 돈사돈 본점; Chunsimine / 춘심이네 본점; Ojo Haenyeo-ui Jip / 오조해녀의집; Deokseongwon / 덕성원; Gozip Dol Wooluck Jungmun / 고집돌우럭 중문점; Dongmun Traditional Market / 동문재래시장; Seogwipo Maeil Olle Market / 서귀포매일올레시장; Jeju Kimmanbok / 제주김만복 본점; Osulloc Tea Museum / 오설록 티뮤지엄; Cafe Bomnal / 봄날카페; Cafe Delmoondo / 카페 델문도; Hanmaeum Butcher Restaurant Jeju Ido Branch; Dambaek Hamdeok Branch; Gozip Dolureok Jungmun Branch; Jungmun Godeungeo Ssambap; Jeju Seafood Bowl; Munmunseon; Oedo339; Westground; Iolle Inforest; Myeonjumak (Jeju Main) / 면주막 제주본점; Samsin Halmang Bapsang / 삼신할망밥상; Dullegil (Jungmun Main) / 둘레길 서귀포 중문본점; Jeju Hanmyeonga / 제주한면가; Gozip Dol Wooluck (Hamdeok) / 고집돌우럭 함덕점; Jeju Dodori Meat Noodles / 제주 도도리고기국수; Gwangyuk / 광육; Suni Table / 수니테이블; Danso (Aewol) / 단소 제주애월본점

Already in the app — things to do: Aqua Planet Jeju / 아쿠아플라넷 제주; Seongsan Ilchulbong / 성산일출봉; Manjanggul Lava Tube / 만장굴; Hamdeok Beach / 함덕해수욕장; Hyeopjae Beach / 협재해수욕장; Hallim Park / 한림공원; Jeju Stone Park / 제주돌문화공원; Eco Land Theme Park / 에코랜드 테마파크; Snoopy Garden / 스누피가든; Jeju Aerospace Museum / 제주항공우주박물관; Jeju National Museum / 국립제주박물관; Jeju Folk Village / 제주민속촌; Cheonjiyeon Waterfall / 천지연폭포; Dongmun Market and Night Market / 동문재래시장; Seogwipo Maeil Olle Market / 서귀포매일올레시장; Teddy Bear Museum Jeju / 테디베어뮤지엄; Camellia Hill / 카멜리아힐; Hello Kitty Island; Jeju Clip 'N Climb; Bunker de Lumières / 빛의 벙커; Nexon Computer Museum / 넥슨컴퓨터박물관; Bonte Museum / 본태박물관; Maze Land / 메이즈랜드; Figure Museum Jeju / 피규어뮤지엄 제주; Fairy and Woodcutter Theme Park / 선녀와 나무꾼 테마공원; Yeomiji Botanical Garden / 여미지식물원; Hueree Nature Life Park / 휴애리 자연생활공원; Jeju Water World / 워터월드 제주; Jeju Tangerine Kart / 감귤카트; Tayo Kids Café (Yongdam) / 타요키즈카페 제주용담점; Kongsuni Kids Café (Jeju) / 콩순이키즈카페 제주점

### kh-siemreap — Siem Reap (Cambodia)
Area covered: Siem Reap (also known as / includes: siem reap, angkor, angkor wat, ta prohm, tonle sap, phnom penh)

Now in the app: 32 places to eat, 33 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Khmer Kitchen; The Sugar Palm; Chanrey Tree; Haven; Malis; Spoons; Pou Restaurant; Mahob Khmer Cuisine; Peace Cafe; Phsar Chas; Road 60 Night Market; Brown Coffee; Little Red Fox Espresso; Temple Coffee n Bakery; Sambo Khmer & Thai; Marum; Khmer Grill; Best Khmer (Golden Cafe); Madam Moch; Khmer Hidden Home; MAOM Khmer Cuisine; Mesa; Mealea Watbo; Lotus Dosa Corner; Curry King; Angkor Tacos; Elia Greek Kitchen; Chez Ali; Graines de Piaf; Ojas Vegan; Casa Meta; Peckish

Already in the app — things to do: Angkor Wat; Ta Prohm; Bayon and Angkor Thom; Angkor National Museum; Phare, the Cambodian Circus; Artisans Angkor workshops; Kampong Phluk stilt village; Banteay Srey Butterfly Centre; Cambodia Landmine Museum; Artisans Angkor Silk Farm; Nature Discovery Center of Cambodia; Angkor Wildlife and Aquarium; Angkor Wonder Garden; Preah Khan; Banteay Kdei and Srah Srang; Angkor Zipline; Angkor Wat Putt; Lotus Silk Farm (by Samatoa); Kit Playground; Kameng Leng / ក្មេងៗលេង; Flying Foxes; Public Play Center; Phare Circus; Apopo Centre; Landmine Museum; Angkor Botanical Garden; Phsar Leu Thom Tmey; Bayon; Neak Poan; Banteay Srei; Phnom Bakheng; Ta Nei; ArtBox Siem Reap

### pt-lisbon — Lisbon and Sintra (Portugal)
Area covered: Lisbon and Sintra (also known as / includes: lisbon, lisboa, alfama, belem, sintra, cascais)

Now in the app: 37 places to eat, 28 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Cervejaria Trindade; Bonjardim; Portugália Cervejaria Almirante Reis; Solar dos Presuntos; Laurentina, o Rei do Bacalhau; Casa da Índia; Tascantiga; Restaurante Tulhas; Time Out Market Lisboa; Mercado de Campo de Ourique; Pão Pão Queijo Queijo; Pastéis de Belém; Manteigaria; Santini; Casa Piriquita; Zé da Mouraria; Cantinho do Aziz; Mercado Oriental; O Pitéu da Graça; Restaurante A Muralha; Pastelaria Estrela da Graça; Confeitaria Nacional; O Careca; Califa; Pastelaria Aloma; Terrace at Martinhal Lisbon Oriente; Kiko Martins; Doca de Santo; APF Restaurant; Bonkers; Epic Sana (Sunday brunch); Luzzo; Ground Burger (Santa Apolónia); Green House; Mr. Zombie; Sheraton Lisboa (Sunday brunch); Plataforma

Already in the app — things to do: Lisbon Oceanarium / Oceanário de Lisboa; Lisbon Zoo / Jardim Zoológico de Lisboa; Pavilion of Knowledge / Pavilhão do Conhecimento; Castelo de São Jorge; Pena Palace / Palácio Nacional da Pena; Quinta da Regaleira; National Coach Museum / Museu Nacional dos Coches; Lisbon Cable Car / Telecabine Lisboa; Time Out Market Lisboa / Mercado da Ribeira; Navy Museum / Museu de Marinha; Vasco da Gama Aquarium / Aquário Vasco da Gama; Gulbenkian Garden / Jardim Gulbenkian; Puppet Museum / Museu da Marioneta; Eduardo VII Park / Parque Eduardo VII; Feira da Ladra flea market / Feira da Ladra; Hippotrip; Jardim do Torel; LU.CA; Marinha Planetarium; Passeio das Tágides; Quake - Lisbon Earthquake Museum; LX Factory; Tram 28; Jardim da Estrela; Alto da Serafina park / Parque Recreativo do Alto da Serafina; Bowling City; Praia das Maçãs; Moorish Castle / Castelo dos Mouros

### es-madrid — Madrid (Spain)
Area covered: Madrid (also known as / includes: madrid, retiro, plaza mayor, royal palace, toledo, segovia)

Now in the app: 37 places to eat, 29 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Sobrino de Botín; Casa Mingo; La Barraca; Malacatín; La Bola; Los Galayos; Posada de la Villa; Lateral Santa Ana; La Sanabresa; Mercado de San Miguel; La Campana; Museo del Jamón; Gourmet Experience Callao; Chocolatería San Ginés; La Mallorquina; Chocolatería Valor; Casa Benigna; Tripea; Tres Por Cuatro; La Tasquita de Enfrente; Chuka Ramen Bar; Toga; Cruz Blanca Vallecas; El Cisne Azul; Kuoco 360 Food; La Perejila; Mercado de San Antón; Comic Planet; Rubaiyat Madrid; La Excéntrica; New York Burger (Recoletos); Filandón; Restaurante San Francisco (El Pardo); Home Burger Bar (Silva); Kilómetros de Pizza (Bernabéu); Can Pizza (Chamberí); Storyland

Already in the app — things to do: Zoo Aquarium Madrid / Zoo Aquarium de Madrid; Parque de Atracciones de Madrid; Faunia; National Museum of Natural Sciences / Museo Nacional de Ciencias Naturales; Retiro Park and the boat lake / Parque del Retiro; Railway Museum / Museo del Ferrocarril; Madrid Planetarium / Planetario de Madrid; Royal Palace of Madrid / Palacio Real de Madrid; Santiago Bernabéu stadium tour / Tour Santiago Bernabéu; Parque Warner Madrid; San Miguel Market / Mercado de San Miguel; Casa de Campo lake / Lago de la Casa de Campo; Prado Museum / Museo del Prado; Templo de Debod; Thyssen-Bornemisza Museum / Museo Thyssen-Bornemisza; CaixaForum Madrid; Parque del Oeste; Parque Juan Carlos I; Madrid Río Park; Plaza de España; Museum of Illusions; Museum of Light / Museo de la Luz; OXO Video Game Museum / OXO Museo del Videojuego; Sweet Space Museum; IKONO Madrid; Naval Museum / Museo Naval; National Archaeological Museum / Museo Arqueológico Nacional; Legends: The Home of Football; Faro de Moncloa
