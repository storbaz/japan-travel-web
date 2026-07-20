"use client";

import { useState, useRef, useMemo } from "react";

interface DayActivity {
  name: string;
  cost: "free" | "low" | "mid" | "high";
  link?: string;
  linkLabel?: string;
  provider?: "klook" | "gyg" | "maps" | "booking";
  gygCity?: string;
  gygQuery?: string;
}

interface DayPlan {
  day: number;
  city: string;
  activities: (string | DayActivity)[];
  food: string;
  tip: string;
}

type InterestId = "food" | "culture" | "nature" | "shopping" | "anime" | "history" | "relax" | "nightlife";

interface DayBlock {
  tag: InterestId | "core";
  city: string;
  activities: (string | DayActivity)[];
  food: string;
  tip: string;
}

const GYG = "https://www.getyourguide.com";
const KLK = "https://www.klook.com/en-US/activity";
const GM = "https://www.google.com/maps/search/?api=1&query=";

const interests = [
  { id: "food" as InterestId, label: "Comida", icon: "🍜" },
  { id: "culture" as InterestId, label: "Cultura", icon: "🏯" },
  { id: "nature" as InterestId, label: "Naturaleza", icon: "🗻" },
  { id: "shopping" as InterestId, label: "Compras", icon: "💳" },
  { id: "anime" as InterestId, label: "Anime/Otaku", icon: "🎌" },
  { id: "history" as InterestId, label: "Historia", icon: "⚔️" },
  { id: "relax" as InterestId, label: "Relax/Onsen", icon: "💆" },
  { id: "nightlife" as InterestId, label: "Vida nocturna", icon: "🍸" },
];

const budgetLevels = [
  { id: "budget", label: "Low Budget", desc: "Hostales, konbini, transporte público", price: "~80€/día", icon: "💰" },
  { id: "mid", label: "Comfort", desc: "Hoteles 3★, restaurantes mixtos, JR Pass", price: "~160€/día", icon: "💎" },
  { id: "high", label: "Premium", desc: "Ryokan, wagyu, JR Green Car, spas", price: "~350€/día", icon: "👑" },
];

const budgetStats = [
  { source: "JNTO 2024", label: "Gasto medio turista", value: "~148€/día", detail: "Incluye alojamiento, comida, transporte, compras" },
  { source: "JNTO 2024", label: "Gasto en comida", value: "~46€/día", detail: "31% del presupuesto total" },
  { source: "JNTO 2024", label: "Gasto en alojamiento", value: "~55€/día", detail: "37% del presupuesto total" },
  { source: "JNTO 2024", label: "Estancia media", value: "7.2 noches", detail: "Turistas internacionales" },
  { source: "JNTO 2024", label: "Visitantes totales", value: "36.9M", detail: "Récord histórico en 2024" },
];

const tokyoDays: DayBlock[] = [
  {
    tag: "core", city: "Tokio",
    activities: [
      "Llegada + check-in",
      { name: "Shibuya Crossing", cost: "free", link: `${GM}Shibuya+Crossing+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Shibuya Sky (vistas 360°)", cost: "high", link: `${KLK}/70672-shibuya-sky-tokyo/`, linkLabel: "Reservar en Klook", provider: "klook" },
    ],
    food: "Ramen en Ichiran o Fuunji (Shinjuku)",
    tip: "Compra un Suica/Pasmo para transportes (500¥ depósito)",
  },
  {
    tag: "core", city: "Tokio",
    activities: [
      { name: "Tsukiji Outer Market", cost: "free", link: `${GM}Tsukiji+Outer+Market+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Senso-ji (Asakusa)", cost: "free", link: `${GM}Senso-ji+Temple+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Tokyo Skytree", cost: "mid", link: `${KLK}/41352-tokyo-skytree/`, linkLabel: "Reservar en Klook", provider: "klook" },
    ],
    food: "Sushi en Tsukiji, takoyaki callejero",
    tip: "Los templos cierran temprano (~17:00)",
  },
  {
    tag: "core", city: "Tokio",
    activities: [
      "Harajuku (Takeshita St)",
      "Meiji Shrine",
      "Omotesando",
      { name: "Shinjuku Golden Gai (noche)", cost: "low", link: `${GM}Golden+Gai+Shinjuku+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
    ],
    food: "Curry japonés o tonkatsu",
    tip: "Golden Gai: bares tiny (6-10 personas), 500-1000¥ entrada",
  },
  {
    tag: "food", city: "Tokio",
    activities: [
      { name: "Toyosu Market (subasta de atún)", cost: "free", link: `${GM}Toyosu+Market+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      "Ruta de ramen: Fuunji → Nakiryu → Ichiran",
      { name: "Depachika (sótano gourmet Isetan)", cost: "free", link: `${GM}Isetan+Shinjuku+Depachika`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Cooking class japonés", cost: "mid", link: `${GYG}/tokyo-l193/?q=cooking+class&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "tokyo", gygQuery: "cooking class japanese food" },
    ],
    food: "Degusta ramen, sushi y wagashi en depachika",
    tip: "Toyosu: subasta de atún a las 5:30am (mirador público gratis)",
  },
  {
    tag: "culture", city: "Tokio",
    activities: [
      { name: "TeamLab Borderless", cost: "high", link: `${GYG}/tokyo-l193/?q=teamlab+borderless&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "tokyo", gygQuery: "teamlab borderless tokyo art" },
      "Odaiba + Gundam statue",
      { name: "Museo Edo-Tokyo", cost: "low", link: `${GM}Edo-Tokyo+Museum`, linkLabel: "Google Maps", provider: "maps" },
    ],
    food: "Cena con vista al Rainbow Bridge",
    tip: "TeamLab: reserva online con antelación (se agota)",
  },
  {
    tag: "anime", city: "Tokio",
    activities: [
      { name: "Akihabara (Electric Town)", cost: "free", link: `${GM}Akihabara+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Mandarake Complex (manga/figuras)", cost: "free", link: `${GM}Mandarake+Complex+Akihabara`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Maid Café", cost: "low", link: `${GYG}/tokyo-l193/?q=maid+cafe&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "tokyo", gygQuery: "maid cafe akihabara experience" },
      { name: "Gundam Base Tokyo (Odaiba)", cost: "free", link: `${GM}Gundam+Base+Tokyo+Odaiba`, linkLabel: "Google Maps", provider: "maps" },
    ],
    food: "Comida temática en maid café",
    tip: "Akihabara: dedica toda la tarde, hay tiendas escondidas en pisos superiores",
  },
  {
    tag: "shopping", city: "Tokio",
    activities: [
      { name: "Ginza (lujo + duty-free)", cost: "free", link: `${GM}Ginza+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Don Quijote (tax-free)", cost: "free", link: `${GM}Don+Quijote+Shibuya+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Uniqlo Flagship Ginza", cost: "free", link: `${GM}Uniqlo+Ginza+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Nakamise Shopping Street", cost: "free", link: `${GM}Nakamise+dori+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
    ],
    food: "Bento de konbini (7-Eleven, Lawson)",
    tip: "Don Quijote: compra tax-free con pasaporte. ¡Precios bajísimos!",
  },
  {
    tag: "nightlife", city: "Tokio",
    activities: [
      { name: "Golden Gai + Omoide Yokocho", cost: "low", link: `${GM}Omoide+Yokocho+Shinjuku+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Roppongi clubs", cost: "mid", link: `${GM}Roppongi+Nightlife+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      "Shibuya crossing de noche (espectacular)",
    ],
    food: "Yakitori en Omoide Yokocho (Memory Lane)",
    tip: "Los bares cierran a las 2-4am. El metro también cierra ~midnight",
  },
  {
    tag: "history", city: "Tokio",
    activities: [
      { name: "Samurai Museum", cost: "mid", link: `${GYG}/tokyo-l193/?q=samurai+museum&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "tokyo", gygQuery: "samurai museum tokyo experience" },
      { name: "Imperial Palace East Gardens", cost: "free", link: `${GM}Imperial+Palace+East+Gardens+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
      "Yanaka (barrio antiguo que sobrevivió WWII)",
    ],
    food: "Soba artesanal en Yanaka",
    tip: "Yanaka: uno de los pocos barrios que sobrevivió los bombardeos",
  },
  {
    tag: "relax", city: "Tokio → Hakone",
    activities: [
      "Tren a Hakone (1.5h con Hakone Free Pass)",
      { name: "Pirate ship (Lake Ashi)", cost: "mid", link: `${GYG}/hakone-l845/?q=hakone+free+pass&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "hakone", gygQuery: "hakone free pass lake ashi cruise" },
      { name: "Hakone Open Air Museum", cost: "low", link: `${GM}Hakone+Open+Air+Museum`, linkLabel: "Google Maps", provider: "maps" },
      "Onsen con vista al Monte Fuji",
    ],
    food: "Hoto noodles (especialidad de Hakone)",
    tip: "Hakone Free Pass: transporte ilimitado 2-3 días desde Shinjuku",
  },
];

const kyotoDays: DayBlock[] = [
  {
    tag: "core", city: "Kioto",
    activities: [
      "Shinkansen a Kioto",
      { name: "Fushimi Inari (torii naranjas)", cost: "free", link: `${GM}Fushimi+Inari+Taisha+Kyoto`, linkLabel: "Google Maps", provider: "maps" },
      "Gion (barrio geisha)",
      "Pontocho (cena ribereña)",
    ],
    food: "Yudofu (tofu caliente) o kaiseki",
    tip: "Fushimi Inari: ve a las 6am para evitar multitudes. Gratis, abierto 24h",
  },
  {
    tag: "core", city: "Kioto",
    activities: [
      { name: "Arashiyama Bamboo Grove", cost: "free", link: `${GM}Arashiyama+Bamboo+Grove+Kyoto`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Monkey Park Iwatayama", cost: "low", link: `${GM}Iwatayama+Monkey+Park+Kyoto`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Kinkaku-ji (Pabellón Dorado)", cost: "low", link: `${GM}Kinkaku-ji+Temple+Kyoto`, linkLabel: "Google Maps", provider: "maps" },
    ],
    food: "Matcha y dulces en Arashiyama",
    tip: "Arashiyama: ve a las 7-8am. Alquila bici para explorar la zona",
  },
  {
    tag: "food", city: "Kioto",
    activities: [
      "Nishiki Market (mercado cubierto 400m)",
      { name: "Sake tasting en Fushimi", cost: "low", link: `${GM}Fushimi+Sake+Brewery+Kyoto`, linkLabel: "Google Maps", provider: "maps" },
      "Ramen street en estación Kyoto",
    ],
    food: "Degusta: tsukemono, yuba, mochi, sake artesanal",
    tip: "Nishiki Market: 5 bloques de comida. Ve temprano (10am)",
  },
  {
    tag: "culture", city: "Kioto",
    activities: [
      { name: "Ceremonia del té (Chado)", cost: "mid", link: `${GYG}/kyoto-l96826/?q=tea+ceremony&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "kyoto", gygQuery: "tea ceremony kyoto traditional" },
      { name: "Kimono Rental", cost: "mid", link: `${KLK}/en-US/activity/kyoto-kimono-rental`, linkLabel: "Reservar en Klook", provider: "klook" },
      { name: "Caligrafía (Shodo)", cost: "low", link: `${GYG}/kyoto-l96826/?q=calligraphy+workshop&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "kyoto", gygQuery: "calligraphy shodo workshop kyoto" },
    ],
    food: "Matcha parfait en Ninenzaka",
    tip: "Viste kimono y pasea por Gion. Las fotos con templo de fondo son increíbles",
  },
  {
    tag: "nature", city: "Kioto",
    activities: [
      { name: "Philosopher's Path", cost: "free", link: `${GM}Philosopher's+Path+Kyoto`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Ginkaku-ji (Pabellón Plateado)", cost: "low", link: `${GM}Ginkaku-ji+Temple+Kyoto`, linkLabel: "Google Maps", provider: "maps" },
      "Higashiyama (sendero entre templos)",
    ],
    food: "Yudofu cerca de Ginkaku-ji",
    tip: "Philosopher's Path: precioso en otoño (koyo) y primavera (sakura)",
  },
  {
    tag: "nightlife", city: "Kioto",
    activities: [
      "Pontocho (calle ribereña con restaurantes)",
      { name: "Kiyamachi Street (bares)", cost: "low", link: `${GM}Kiyamachi+Street+Kyoto`, linkLabel: "Google Maps", provider: "maps" },
      "Gion de noche (posibilidad de ver geishas)",
    ],
    food: "Izakaya en Pontocho",
    tip: "Kiyamachi: bares a orillas del canal. Pontocho: terraza flotante en verano",
  },
  {
    tag: "shopping", city: "Kioto",
    activities: [
      "Nishiki Market (souvenirs y comida)",
      "Teramachi & Shinkyogoku (arcades cubiertas)",
      { name: "Tiendas de artesanía Gion", cost: "free", link: `${GM}Gion+District+Kyoto`, linkLabel: "Google Maps", provider: "maps" },
    ],
    food: "Dulces tradicionales (wagashi)",
    tip: "Los kimonos de segunda mano en Kioto son baratos y de calidad",
  },
];

const naraDays: DayBlock[] = [
  {
    tag: "core", city: "Nara",
    activities: [
      "Tren desde Kioto (45min)",
      { name: "Todai-ji (Buda gigante)", cost: "low", link: `${GM}Todai-ji+Temple+Nara`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Nara Park (ciervos)", cost: "free", link: `${GM}Nara+Park+Nara`, linkLabel: "Google Maps", provider: "maps" },
      "Kasuga Taisha (linternas de piedra)",
    ],
    food: "Kakinoha sushi (envuelto en hoja de kaki)",
    tip: "Los ciervos muerden: compra galletas (200¥) y guárdalas bien",
  },
  {
    tag: "nature", city: "Nara",
    activities: [
      { name: "Nara Park al amanecer", cost: "free", link: `${GM}Nara+Park+Nara`, linkLabel: "Google Maps", provider: "maps" },
      "Isuien Garden (jardín japonés)",
      "Monte Wakakusa (senderismo + vistas)",
    ],
    food: "Mochi fresco en la zona del templo",
    tip: "Monte Wakakusa: subida fácil con vistas panorámicas de Nara",
  },
];

const hiroshimaDays: DayBlock[] = [
  {
    tag: "core", city: "Hiroshima",
    activities: [
      "Shinkansen a Hiroshima",
      { name: "Peace Memorial Park", cost: "free", link: `${GM}Peace+Memorial+Park+Hiroshima`, linkLabel: "Google Maps", provider: "maps" },
      "Museo de la Paz",
      { name: "Itsukushima Shrine (Miyajima)", cost: "low", link: `${KLK}/140942-day-trip-to-hiroshima-and-miyajima-with-ferry-ride/`, linkLabel: "Reservar en Klook", provider: "klook" },
    ],
    food: "Okonomiyaki estilo Hiroshima (capas)",
    tip: "Hiroshima → Miyajima: ferry 10min. Ver torii con marea alta Y baja",
  },
  {
    tag: "history", city: "Hiroshima",
    activities: [
      { name: "Peace Memorial Museum", cost: "low", link: `${GM}Hiroshima+Peace+Memorial+Museum`, linkLabel: "Google Maps", provider: "maps" },
      "Genbaku Dome (Cúpula de la bomba)",
      "Children's Peace Monument",
    ],
    food: "Okonomiyaki en Okonomimura",
    tip: "Museo: muy emotivo, reserve 2-3h. Entrada: 200¥",
  },
  {
    tag: "nature", city: "Miyajima",
    activities: [
      "Ferry a Miyajima (10min desde Hiroshima)",
      { name: "Torii flotante (Itsukushima)", cost: "low", link: `${GM}Itsukushima+Shrine+Miyajima`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Monte Misen (cable car + senderismo)", cost: "mid", link: `${GM}Mount+Misen+Miyajima`, linkLabel: "Google Maps", provider: "maps" },
      "Momiji manju (pastel de arce)",
    ],
    food: "Ostiones gigantes a la parrilla + ostras frescas",
    tip: "Monte Misen: cable car + 30min senderismo. Vistas espectaculares",
  },
];

const osakaDays: DayBlock[] = [
  {
    tag: "core", city: "Osaka",
    activities: [
      "Tren a Osaka",
      { name: "Osaka Castle", cost: "low", link: `${GM}Osaka+Castle`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Dotonbori (street food capital)", cost: "low", link: `${GM}Dotonbori+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      "Shinsekai + Tsutenkaku Tower",
    ],
    food: "Takoyaki, okonomiyaki, kushikatsu",
    tip: "Osaka = comida de Japón. Dotonbori de noche es espectacular",
  },
  {
    tag: "food", city: "Osaka",
    activities: [
      { name: "Kuromon Market ('la cocina de Osaka')", cost: "free", link: `${GM}Kuromon+Market+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      "Ruta takoyaki: Wanaka → Creo-Ru → Kukuru",
      { name: "Shinsaibashi (compras + comida)", cost: "free", link: `${GM}Shinsaibashi+Osaka`, linkLabel: "Google Maps", provider: "maps" },
    ],
    food: "Degusta takoyaki, okonomiyaki, kushikatsu, gyoza",
    tip: "Kuromon: prueba el atún fresco y el uni (erizo)",
  },
  {
    tag: "anime", city: "Osaka",
    activities: [
      { name: "Universal Studios Japan", cost: "high", link: `${GYG}/osaka-l1204/?q=universal+studios+japan&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "osaka", gygQuery: "universal studios japan tickets osaka" },
      "Super Nintendo World",
      "Harry Potter World",
    ],
    food: "Comida temática del parque",
    tip: "USJ: Express Pass para evitar colas de 2-3h",
  },
  {
    tag: "nightlife", city: "Osaka",
    activities: [
      { name: "Dotonbori de noche", cost: "free", link: `${GM}Dotonbori+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Amerikamura (barrios young)", cost: "free", link: `${GM}Amerikamura+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      "Ura-Namba (bares escondidos)",
    ],
    food: "Street food a medianoche en Dotonbori",
    tip: "Osaka es más relajada que Tokio. Bares abren tarde y cierran tarde",
  },
  {
    tag: "shopping", city: "Osaka",
    activities: [
      { name: "Shinsaibashi-suji (arcade 600m)", cost: "free", link: `${GM}Shinsaibashi+suji+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Don Quijote Dotonbori", cost: "free", link: `${GM}Don+Quijote+Dotonbori+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      "Namba Parks (centro comercial)",
    ],
    food: "Kushikatsu en Shinsekai",
    tip: "Shinsaibashi: ropa, electrónica, souvenirs. Todo tax-free",
  },
];

const kanazawaDays: DayBlock[] = [
  {
    tag: "core", city: "Kanazawa",
    activities: [
      "Tren desde Osaka/Nagoya (2h)",
      { name: "Kenroku-en (jardín top-3 de Japón)", cost: "low", link: `${GM}Kenroku-en+Garden+Kanazawa`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Higashi Chaya (barrio geisha)", cost: "free", link: `${GM}Higashi+Chaya+District+Kanazawa`, linkLabel: "Google Maps", provider: "maps" },
      "Omicho Market",
    ],
    food: "Kaisendon (arroz con marisco fresco)",
    tip: "Kanazawa = el Kioto del norte, menos turistas y más barato",
  },
  {
    tag: "nature", city: "Kanazawa",
    activities: [
      { name: "Kenroku-en al amanecer", cost: "low", link: `${GM}Kenroku-en+Garden+Kanazawa`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Jardín del Castillo de Kanazawa", cost: "low", link: `${GM}Kanazawa+Castle+Park`, linkLabel: "Google Maps", provider: "maps" },
      "21st Century Museum of Contemporary Art",
    ],
    food: "Helado de matcha en el museo",
    tip: "Kenroku-en: uno de los 3 jardines más bellos de Japón. Entrada: 320¥",
  },
];

const nagoyaDays: DayBlock[] = [
  {
    tag: "core", city: "Nagoya",
    activities: [
      "Tren a Nagoya",
      { name: "Atsuta Shrine (uno de los más importantes)", cost: "free", link: `${GM}Atsuta+Shrine+Nagoya`, linkLabel: "Google Maps", provider: "maps" },
      "Osu Shopping (electrónica + ropa)",
      "Nagoya Castle",
    ],
    food: "Hitsumabushi (anguila a la parrilla, 3 formas de comerla)",
    tip: "Nagoya: ciudad subestimada. Hitsumabushi es INCREÍBLE",
  },
  {
    tag: "shopping", city: "Nagoya",
    activities: [
      "Osu Shopping District (electrónica barata)",
      { name: "Komatsu Yokocho (antiguo mercado)", cost: "free", link: `${GM}Komatsu+Yokocho+Nagoya`, linkLabel: "Google Maps", provider: "maps" },
      "Sakae (centro commercial + Underground Mall)",
    ],
    food: "Miso katsu en Sakae",
    tip: "Osu: el Akihabara de Nagoya. Precios más bajos que Tokio",
  },
];

const allCityBlocks: Record<string, DayBlock[]> = {
  tokyo: tokyoDays,
  kyoto: kyotoDays,
  nara: naraDays,
  hiroshima: hiroshimaDays,
  osaka: osakaDays,
  kanazawa: kanazawaDays,
  nagoya: nagoyaDays,
};

function getCityRoute(days: number, interests: InterestId[]): string[] {
  if (days <= 5) {
    if (interests.includes("anime")) return ["tokyo", "tokyo", "kyoto", "tokyo", "osaka"];
    if (interests.includes("food")) return ["tokyo", "osaka", "kyoto", "kanazawa", "nara"];
    if (interests.includes("relax")) return ["tokyo", "tokyo", "kyoto", "osaka", "nara"];
    return ["tokyo", "tokyo", "kyoto", "osaka", "nara"];
  }
  if (days <= 7) {
    if (interests.includes("anime")) return ["tokyo", "tokyo", "tokyo", "kyoto", "osaka", "nara", "tokyo"];
    if (interests.includes("food")) return ["tokyo", "osaka", "kanazawa", "kyoto", "nara", "hiroshima", "osaka"];
    if (interests.includes("relax")) return ["tokyo", "tokyo", "kyoto", "osaka", "kanazawa", "nara", "tokyo"];
    return ["tokyo", "tokyo", "kyoto", "kyoto", "osaka", "nara", "kanazawa"];
  }
  if (days <= 10) {
    if (interests.includes("anime")) return ["tokyo", "tokyo", "tokyo", "tokyo", "kyoto", "osaka", "nara", "tokyo", "tokyo", "kanazawa"];
    if (interests.includes("food")) return ["tokyo", "osaka", "kanazawa", "kyoto", "nara", "hiroshima", "osaka", "nagoya", "tokyo", "kanazawa"];
    if (interests.includes("relax")) return ["tokyo", "tokyo", "kyoto", "kanazawa", "osaka", "nara", "hiroshima", "nagoya", "tokyo", "tokyo"];
    return ["tokyo", "tokyo", "kyoto", "nara", "hiroshima", "osaka", "kanazawa", "nagoya", "tokyo", "tokyo"];
  }
  if (days <= 14) {
    if (interests.includes("anime")) return ["tokyo", "tokyo", "tokyo", "tokyo", "tokyo", "kyoto", "osaka", "nara", "tokyo", "tokyo", "kanazawa", "nagoya", "tokyo", "tokyo"];
    if (interests.includes("food")) return ["tokyo", "osaka", "kanazawa", "kyoto", "nara", "hiroshima", "osaka", "kanazawa", "nagoya", "tokyo", "kyoto", "osaka", "kanazawa", "nagoya"];
    if (interests.includes("relax")) return ["tokyo", "tokyo", "kyoto", "kanazawa", "osaka", "nara", "hiroshima", "nagoya", "tokyo", "tokyo", "kyoto", "kanazawa", "osaka", "nara"];
    return ["tokyo", "tokyo", "kyoto", "kyoto", "nara", "hiroshima", "osaka", "osaka", "kanazawa", "kanazawa", "nagoya", "nagoya", "tokyo", "tokyo"];
  }
  if (days <= 18) {
    return ["tokyo", "tokyo", "tokyo", "kyoto", "kyoto", "nara", "hiroshima", "hiroshima", "osaka", "osaka", "kanazawa", "kanazawa", "nagoya", "nagoya", "tokyo", "tokyo", "kyoto", "osaka"];
  }
  return ["tokyo", "tokyo", "tokyo", "tokyo", "kyoto", "kyoto", "kyoto", "nara", "hiroshima", "hiroshima", "hiroshima", "osaka", "osaka", "osaka", "kanazawa", "kanazawa", "nagoya", "nagoya", "tokyo", "tokyo", "kyoto", "osaka", "kanazawa", "nagoya", "tokyo", "tokyo", "nara", "hiroshima", "osaka", "tokyo"];
}

function getItinerary(days: number, selectedInterests: InterestId[], budget: string): DayPlan[] {
  const route = getCityRoute(days, selectedInterests);
  const result: DayPlan[] = [];
  const usedBlocksByCity: Record<string, number> = {};
  const usedBlockKeys = new Set<string>();

  const allBlocksFlat = Object.values(allCityBlocks).flat();

  for (let i = 0; i < days; i++) {
    const cityKey = route[i % route.length];
    const blocks = allCityBlocks[cityKey];
    if (!blocks) continue;

    const usedCount = usedBlocksByCity[cityKey] || 0;
    const coreBlocks = blocks.filter((b) => b.tag === "core");
    const interestBlocks = blocks.filter((b) => b.tag !== "core");

    const blockKey = (b: DayBlock) => `${b.city}:${b.tag}:${b.food}`;

    let chosen: DayBlock | null = null;

    if (selectedInterests.length > 0) {
      const matching = interestBlocks.filter((b) => selectedInterests.includes(b.tag as InterestId));

      if (usedCount < coreBlocks.length && (matching.length === 0 || usedCount < 1)) {
        const candidate = coreBlocks[usedCount];
        if (!usedBlockKeys.has(blockKey(candidate))) {
          chosen = candidate;
        }
      }

      if (!chosen && matching.length > 0) {
        for (let attempt = 0; attempt < matching.length; attempt++) {
          const matchIdx = Math.max(0, usedCount - 1) + attempt;
          const candidate = matching[matchIdx % matching.length];
          if (!usedBlockKeys.has(blockKey(candidate))) {
            chosen = candidate;
            break;
          }
        }
      }

      if (!chosen) {
        const available = allBlocksFlat.filter((b) => !usedBlockKeys.has(blockKey(b)));
        chosen = available[0] || coreBlocks[0];
      }
    } else {
      if (usedCount < coreBlocks.length) {
        const candidate = coreBlocks[usedCount];
        if (!usedBlockKeys.has(blockKey(candidate))) {
          chosen = candidate;
        }
      }

      if (!chosen) {
        for (let attempt = 0; attempt < interestBlocks.length; attempt++) {
          const candidate = interestBlocks[(usedCount - coreBlocks.length + attempt) % interestBlocks.length];
          if (!usedBlockKeys.has(blockKey(candidate))) {
            chosen = candidate;
            break;
          }
        }
      }

      if (!chosen) {
        const available = allBlocksFlat.filter((b) => !usedBlockKeys.has(blockKey(b)));
        chosen = available[0] || coreBlocks[coreBlocks.length - 1];
      }
    }

    usedBlocksByCity[cityKey] = usedCount + 1;
    usedBlockKeys.add(blockKey(chosen));

    let adaptedActivities = [...chosen.activities];

    if (budget === "budget") {
      adaptedActivities = adaptedActivities.filter((a) =>
        typeof a === "string" || a.cost === "free" || a.cost === "low"
      );
      if (adaptedActivities.length < 2) adaptedActivities = chosen.activities.slice(0, 3);
    } else if (budget === "high") {
      const premiumAdditions: Record<string, (string | DayActivity)[]> = {
        "Kioto": [
          { name: "Ryokan premium (noche)", cost: "high", link: `https://www.booking.com/searchresults.html?ss=Kyoto`, linkLabel: "Reservar en Booking", provider: "booking" },
        ],
        "Tokio": [
          { name: "Wagyu omakase", cost: "high", link: `${GM}Wagyu+Restaurant+Tokyo`, linkLabel: "Google Maps", provider: "maps" },
        ],
        "Osaka": [
          { name: "Michelin restaurant", cost: "high", link: `${GM}Michelin+Restaurant+Osaka`, linkLabel: "Google Maps", provider: "maps" },
        ],
      };
      for (const [city, additions] of Object.entries(premiumAdditions)) {
        if (chosen.city.includes(city)) {
          adaptedActivities.push(...additions);
        }
      }
    }

    result.push({
      day: i + 1,
      city: chosen.city,
      activities: adaptedActivities,
      food: chosen.food,
      tip: chosen.tip,
    });
  }

  return result;
}

export default function TripPlannerPage() {
  const [days, setDays] = useState(7);
  const [selectedInterests, setSelectedInterests] = useState<InterestId[]>([]);
  const [budget, setBudget] = useState("mid");
  const [customBudget, setCustomBudget] = useState<number | "">("");
  const [showPlan, setShowPlan] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const toggleInterest = (id: InterestId) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setShowPlan(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const itinerary = useMemo(() =>
    showPlan ? getItinerary(days, selectedInterests, budget) : [],
    [showPlan, days, selectedInterests, budget]
  );

  const totalBudget = customBudget !== ""
    ? Number(customBudget)
    : budget === "budget" ? days * 80 : budget === "mid" ? days * 160 : days * 350;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🗾 Generador de Viaje
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Selecciona días, intereses y presupuesto. Recibe un itinerario personalizado con precios reales, enlaces para reservar y alternativas para cada nivel.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📅 ¿Cuántos días viajas?</h2>
          <div className="flex flex-wrap gap-3">
            {[3, 5, 7, 10, 14, 21, 30].map((d) => (
              <button key={d} onClick={() => setDays(d)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${days === d ? "bg-red-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {d} días
              </button>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-500">
            <input type="range" min="3" max="30" value={days}
              onChange={(e) => setDays(parseInt(e.target.value))} className="w-48 ml-2" />
            <span className="ml-2 font-medium text-gray-700">{days} días</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🎯 ¿Qué te interesa?</h2>
          <p className="text-sm text-gray-500 mb-3">Selecciona tus intereses para personalizar las actividades de cada día</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interests.map((interest) => (
              <button key={interest.id} onClick={() => toggleInterest(interest.id)}
                className={`p-4 rounded-xl text-left transition-all ${selectedInterests.includes(interest.id) ? "bg-red-50 border-2 border-red-500 text-red-700" : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"}`}>
                <div className="text-2xl mb-1">{interest.icon}</div>
                <div className="text-sm font-medium">{interest.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">💰 ¿Cuánto quieres gastar por persona?</h2>
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            {budgetLevels.map((level) => (
              <button key={level.id} onClick={() => { setBudget(level.id); setCustomBudget(""); }}
                className={`p-4 rounded-xl text-left transition-all ${budget === level.id && customBudget === "" ? "bg-green-50 border-2 border-green-500" : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"}`}>
                <div className="text-2xl mb-1">{level.icon}</div>
                <div className="font-bold">{level.label}</div>
                <div className="text-sm text-gray-500">{level.desc}</div>
                <div className="text-xs text-green-600 mt-1">{level.price} → {level.price === "~80€/día" ? `${days * 80}€ total` : level.price === "~160€/día" ? `${days * 160}€ total` : `${days * 350}€ total`}</div>
              </button>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">O introduce tu propio presupuesto total:</label>
            <div className="flex items-center gap-3">
              <input type="number" placeholder="Ej: 2000" value={customBudget}
                onChange={(e) => { const val = e.target.value; setCustomBudget(val === "" ? "" : Number(val)); setBudget(""); }}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg font-medium" />
              <span className="text-gray-500 font-medium">€ total / persona</span>
            </div>
            <input type="range" min="500" max="30000" step="100"
              value={customBudget || (budget === "budget" ? days * 80 : budget === "mid" ? days * 160 : days * 350)}
              onChange={(e) => { setCustomBudget(Number(e.target.value)); setBudget(""); }}
              className="w-full mt-3" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>500€</span><span>30,000€</span></div>
          </div>

          <div className="mt-4">
            <button onClick={() => setShowStats(!showStats)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              {showStats ? "▼ Ocultar estadísticas reales" : "▶ Ver estadísticas de gasto real (JNTO 2024)"}
            </button>
            {showStats && (
              <div className="mt-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs text-blue-600 mb-3 font-medium">Fuente: Japan National Tourism Organization (JNTO) — Encuesta a turistas internacionales 2024</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {budgetStats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                      <div className="text-xs text-gray-400">{stat.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={handleGenerate}
          className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition">
          Generar Itinerario →
        </button>
      </div>

      {showPlan && (
        <div ref={resultRef}>
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 mb-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Tu itinerario de {days} días en Japón</h2>
            <p className="opacity-90">
              Presupuesto estimado: <strong>~{totalBudget.toLocaleString()}€</strong> por persona (~{Math.round(totalBudget / 0.0062).toLocaleString()} yenes)
            </p>
            {selectedInterests.length > 0 && (
              <p className="text-xs opacity-80 mt-1">
                Intereses: {selectedInterests.map((id) => interests.find((i) => i.id === id)?.label).join(", ")}
              </p>
            )}
            <p className="text-xs opacity-70 mt-1">Sin vuelos. Tasa: 1€ ≈ 161 JPY</p>
          </div>

          <div className="space-y-6">
            {itinerary.map((day) => (
              <div key={day.day} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg">{day.day}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{day.city}</h3>
                    <p className="text-sm text-gray-500">Día {day.day} de {days}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">📍 Actividades</h4>
                    <ul className="space-y-2">
                      {day.activities.map((activity, i) => {
                        const isObj = typeof activity === "object" && activity !== null;
                        const a = isObj ? activity as DayActivity : null;
                        const costColor = a ? (a.cost === "free" ? "bg-green-100 text-green-700" : a.cost === "low" ? "bg-blue-100 text-blue-700" : a.cost === "mid" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700") : "";
                        const costLabel = a ? (a.cost === "free" ? "Gratis" : a.cost === "low" ? "<500¥" : a.cost === "mid" ? "~2000¥" : "5000¥+") : "";
                        return (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span>
                            <div className="flex-1">
                              <span className="text-sm text-gray-700">{isObj ? a!.name : (activity as string)}</span>
                              {a && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${costColor}`}>{costLabel}</span>
                                  {a.link && (() => {
                                    const gygSlugs: Record<string, string> = { tokyo: "tokyo-l193", osaka: "osaka-l1204", kyoto: "kyoto-l96826", hiroshima: "hiroshima-l32662", nara: "nara-l839", kanazawa: "kanazawa-l848", nagoya: "nagoya-l148", hakone: "hakone-l845" };
                                    const href = a.provider === "gyg" && a.gygCity && a.gygQuery
                                      ? `${GYG}/${gygSlugs[a.gygCity] || "tokyo-l193"}/?q=${encodeURIComponent(a.gygQuery)}&partner_id=NRWCY1R`
                                      : a.link;
                                    return (
                                      <a href={href} target="_blank" rel="noopener noreferrer"
                                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded transition ${
                                          a.provider === "klook" ? "bg-red-50 text-red-600 hover:bg-red-100" :
                                          a.provider === "gyg" ? "bg-orange-50 text-orange-600 hover:bg-orange-100" :
                                          a.provider === "booking" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" :
                                          "bg-green-50 text-green-600 hover:bg-green-100"
                                        }`}>
                                        {a.linkLabel || "Ver"} →
                                      </a>
                                    );
                                  })()}
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-orange-50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-orange-600 mb-1">🍽️ Comida</h4>
                      <p className="text-sm text-gray-700">{day.food}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-blue-600 mb-1">💡 Tip</h4>
                      <p className="text-sm text-gray-700">{day.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">📊 Resumen del viaje</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-1">📅</div>
                <div className="font-bold">{days} días</div>
                <div className="text-sm text-gray-500">Duración</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-1">🗾</div>
                <div className="font-bold">{new Set(itinerary.map((d) => d.city)).size} ciudades</div>
                <div className="text-sm text-gray-500">Recorrido</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-1">💰</div>
                <div className="font-bold">~{totalBudget.toLocaleString()}€</div>
                <div className="text-xs text-gray-400">~{Math.round(totalBudget / 0.0062).toLocaleString()} ¥</div>
                <div className="text-sm text-gray-500">Estimado por persona</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-1">🚄</div>
                <div className="font-bold">JR Pass {days <= 7 ? "7d" : days <= 14 ? "14d" : "Sin pass"}</div>
                <div className="text-sm text-gray-500">
                  {days <= 7 ? "~230€" : days <= 14 ? "~370€" : "Compra billetes sueltos"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/flights"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition">
                ✈️ Ver vuelos
              </a>
              <a href="/budget"
                className="inline-block px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition">
                💰 Calcular presupuesto
              </a>
              <a href="/reservations"
                className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition">
                📋 Guía de reservas
              </a>
            </div>
            <p className="text-sm text-gray-500">Usa los enlaces en cada actividad para reservar al mejor precio</p>
          </div>
        </div>
      )}
    </div>
  );
}
