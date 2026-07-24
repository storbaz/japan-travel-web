"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { API_URL } from "@/lib/api";

const RouteMap = dynamic(() => import("./RouteMap"), { ssr: false });

interface DayActivity {
  name: string;
  cost: "free" | "low" | "mid" | "high";
  link?: string;
  linkLabel?: string;
  provider?: "klook" | "gyg" | "maps" | "booking" | "wifi";
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
const JW = "https://www.japan-wireless.com/?via=antonio";

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

const budgetStatsFallback = [
  { source: "JNTO 2024", label: "Gasto medio turista", value: "~148€/día", detail: "Incluye alojamiento, comida, transporte, compras" },
  { source: "JNTO 2024", label: "Gasto en comida", value: "~46€/día", detail: "31% del presupuesto total" },
  { source: "JNTO 2024", label: "Gasto en alojamiento", value: "~55€/día", detail: "37% del presupuesto total" },
  { source: "JNTO 2024", label: "Estancia media", value: "7.2 noches", detail: "Turistas internacionales" },
  { source: "JNTO 2024", label: "Visitantes totales", value: "36.9M", detail: "Récord histórico en 2024" },
];

const arrivalOptions = [
  { id: "tokyo-narita", city: "tokyo", label: "Tokio (Narita NRT)", emoji: "✈️", desc: "Aeropuerto internacional principal" },
  { id: "tokyo-haneda", city: "tokyo", label: "Tokio (Haneda HND)", emoji: "✈️", desc: "Más cerca del centro, vuelos domésticos" },
  { id: "osaka-kansai", city: "osaka", label: "Osaka (Kansai KIX)", emoji: "✈️", desc: "Puerta de entrada al oeste de Japón" },
  { id: "nagoya-chubu", city: "nagoya", label: "Nagoya (Chubu NGO)", emoji: "✈️", desc: "Opción central, menos turistas" },
  { id: "fukuoka", city: "fukuoka", label: "Fukuoka (FUK)", emoji: "✈️", desc: "Directo al sur de Japón" },
];

const departureOptions = [
  { id: "tokyo-narita", city: "tokyo", label: "Tokio (Narita NRT)", emoji: "✈️" },
  { id: "tokyo-haneda", city: "tokyo", label: "Tokio (Haneda HND)", emoji: "✈️" },
  { id: "osaka-kansai", city: "osaka", label: "Osaka (Kansai KIX)", emoji: "✈️" },
  { id: "nagoya-chubu", city: "nagoya", label: "Nagoya (Chubu NGO)", emoji: "✈️" },
  { id: "fukuoka", city: "fukuoka", label: "Fukuoka (FUK)", emoji: "✈️" },
];

const cityCoords: Record<string, [number, number, string, string]> = {
  tokyo: [35.6762, 139.6503, "Tokio", "🚄 0h (Narita)"],
  kyoto: [35.0116, 135.7681, "Kioto", "🚄 2h15 Shinkansen"],
  osaka: [34.6937, 135.5023, "Osaka", "🚄 2h30 Shinkansen"],
  nara: [34.6851, 135.8048, "Nara", "🚃 45min desde Kioto"],
  hiroshima: [34.3853, 132.4553, "Hiroshima", "🚄 4h Shinkansen"],
  kanazawa: [36.5613, 136.6562, "Kanazawa", "🚄 2h30 Thunderbird"],
  nagoya: [35.1815, 136.9066, "Nagoya", "🚄 1h40 Shinkansen"],
  hakone: [35.2330, 139.1067, "Hakone", "🚃 1h30 Romancecar"],
  fukuoka: [33.5904, 130.4017, "Fukuoka", "🚄 5h Shinkansen"],
};

const tokyoDays: DayBlock[] = [
  {
    tag: "core", city: "Tokio",
    activities: [
      { name: "Llegada + check-in", cost: "free", link: `${JW}`, linkLabel: "WiFi Japan Wireless", provider: "wifi" },
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
      { name: "Pirate ship (Lake Ashi)", cost: "mid", link: `${GYG}/hakone-l1875/?q=hakone+free+pass&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "hakone", gygQuery: "hakone free pass lake ashi cruise" },
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
  {
    tag: "food", city: "Hiroshima",
    activities: [
      "Okonomimura (edificio 5 pisos de okonomiyaki)",
      { name: "Hondori Shopping Street", cost: "free", link: `${GM}Hondori+Shopping+Street+Hiroshima`, linkLabel: "Google Maps", provider: "maps" },
      "Hiroshima Beer Garden (cerveza artesanal)",
    ],
    food: "Hiroshima-style okonomiyaki en Okonomimura",
    tip: "Okonomimura: 24 restaurantes de okonomiyaki en un edificio",
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
  {
    tag: "food", city: "Osaka",
    activities: [
      "Shinsekai (barrio retro + Tsutenkaku)",
      { name: "Janjan Yokocho (calle gastronómica)", cost: "free", link: `${GM}Janjan+Yokocho+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      "Cerveza artesanal en Shinsekai Beer Hall",
    ],
    food: "Kushikatsu (palitos empanizados) en Daruma",
    tip: "Shinsekai: barrio más auténtico que Dotonbori. Menos turistas",
  },
  {
    tag: "culture", city: "Osaka",
    activities: [
      { name: "Sumiyoshi Taisha (santuario más antiguo)", cost: "free", link: `${GM}Sumiyoshi+Taisha+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Cerro Umeda (vistas 360°)", cost: "low", link: `${GM}Umeda+Sky+Building+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      "Nakanoshima (isla cultural + museum hopping)",
    ],
    food: "Udon en la zona de Tenma",
    tip: "Sumiyoshi Taisha: fundado en el siglo III. Puente en arco icónico",
  },
  {
    tag: "relax", city: "Osaka",
    activities: [
      "Spa World (onsen gigante con temáticas)",
      { name: "Tennoji Park + Zoo", cost: "low", link: `${GM}Tennoji+Park+Osaka`, linkLabel: "Google Maps", provider: "maps" },
      "Paseo por el río Dotonbori al atardecer",
    ],
    food: "Cena relajada en Dotonbori",
    tip: "Spa World: piscinas temáticas de todo el mundo. 2700¥",
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
  {
    tag: "food", city: "Kanazawa",
    activities: [
      { name: "Omicho Market (desayuno)", cost: "free", link: `${GM}Omicho+Market+Kanazawa`, linkLabel: "Google Maps", provider: "maps" },
      "Degusta kaisendon, langostinos y uni",
      { name: "Barrio de sake (Fushimi sake street)", cost: "low", link: `${GM}Fushimi+Sake+District+Kanazawa`, linkLabel: "Google Maps", provider: "maps" },
    ],
    food: "Kaisendon de Omicho Market (el más fresco de Japón)",
    tip: "Omicho Market: 200+ tiendas. Prueba el kaisendon gigante",
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

const hakoneDays: DayBlock[] = [
  {
    tag: "core", city: "Hakone",
    activities: [
      "Romancecar desde Shinjuku (1.5h)",
      { name: "Hakone Open Air Museum", cost: "low", link: `${GM}Hakone+Open+Air+Museum`, linkLabel: "Google Maps", provider: "maps" },
      { name: "Lake Ashi cruise (pirate ship)", cost: "mid", link: `${GYG}/hakone-l1875/?q=hakone+free+pass&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg", gygCity: "hakone", gygQuery: "hakone free pass lake ashi cruise" },
      "Onsen con vista al Monte Fuji",
    ],
    food: "Hoto noodles (especialidad de Hakone)",
    tip: "Hakone Free Pass: transporte ilimitado 2-3 días desde Shinjuku",
  },
  {
    tag: "relax", city: "Hakone",
    activities: [
      "Onsen ryokan (baño termal tradicional)",
      "Paseo en teleférico Owakudani (volcanes humeantes)",
      "Spiral (art museum + café)",
    ],
    food: "Cena kaiseki en ryokan",
    tip: "Onsen: sin tatuajes en baños públicos. Ryokan privado: ~15000¥",
  },
];

const fukuokaDays: DayBlock[] = [
  {
    tag: "core", city: "Fukuoka",
    activities: [
      "Shinkansen a Fukuoka",
      { name: "Fukuoka Castle Ruins + Ohori Park", cost: "free", link: `${GM}Fukuoka+Castle+Ruins+Fukuoka`, linkLabel: "Google Maps", provider: "maps" },
      "Yatai (puestos de street food a orillas del río)",
      "Canal City Hakata (centro comercial)",
    ],
    food: "Hakata ramen (tonkotsu) en yatai",
    tip: "Yatai: puestos abiertos solo de noche. Experiencia imprescindible",
  },
  {
    tag: "food", city: "Fukuoka",
    activities: [
      "Yatai de Nakasu (20+ puestos a orillas del río)",
      { name: "Mercado de Yanagibashi", cost: "free", link: `${GM}Yanagibashi+Rengo+Market+Fukuoka`, linkLabel: "Google Maps", provider: "maps" },
      "Motsunabe (intestinos, especialidad local)",
    ],
    food: "Hakata ramen + gyoza + motsunabe",
    tip: "Fukuoka = la capital del ramen. Prueba el tonkotsu cremoso",
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
  hakone: hakoneDays,
  fukuoka: fukuokaDays,
};

function getRouteExplanation(arrival: string, departure: string, interests: InterestId[]): string {
  const arrCity = arrivalOptions.find((o) => o.id === arrival)?.city || "tokyo";
  const depCity = departureOptions.find((o) => o.id === departure)?.city || "tokyo";

  if (arrCity === depCity) {
    return `Llegas y sales por ${arrCity === "tokyo" ? "Tokio" : arrCity === "osaka" ? "Osaka" : arrCity === "nagoya" ? "Nagoya" : "Fukuoka"}. La ruta es un circuito que recorre las ciudades principales sin repetir caminos.`;
  }

  const reasons: string[] = [];
  if (arrCity === "tokyo" && depCity === "osaka") {
    reasons.push("Ruta clásica este→oeste: llegas por Tokio y vuelves desde Osaka/Kansai");
    reasons.push("Aprovechas elJR Pass al máximo viajando en línea recta");
  } else if (arrCity === "osaka" && depCity === "tokyo") {
    reasons.push("Ruta oeste→este: llegas por Kansai y terminas en Tokio");
    reasons.push("Evitas volumen de equipaje al final del viaje");
  } else if (arrCity === "tokyo" && depCity === "fukuoka") {
    reasons.push("Recorrido completo norte→sur de Honshu hasta Kyushu");
    reasons.push("Experiencia diversa: desde metropolis hasta naturaleza");
  } else if (arrCity === "fukuoka" && depCity === "tokyo") {
    reasons.push("Recorrido sur→norte: empiezas en Kyushu y terminas en Tokio");
  } else {
    reasons.push(`Llegas por ${arrCity} y sales por ${depCity}: ruta optimizada para no retroceder`);
  }

  if (interests.includes("food")) reasons.push("Priorizamos ciudades gastronómicas: Osaka, Kanazawa, Fukuoka");
  if (interests.includes("anime")) reasons.push("Incluimos Akihabara (Tokio) y Den Den Town (Osaka)");
  if (interests.includes("relax")) reasons.push("Añadimos Hakone para onsen con vistas al Fuji");

  return reasons.join(". ") + ".";
}

function getCityRoute(days: number, interests: InterestId[], arrival: string, departure: string): string[] {
  const arrCity = arrivalOptions.find((o) => o.id === arrival)?.city || "tokyo";
  const depCity = departureOptions.find((o) => o.id === departure)?.city || "tokyo";

  const pcts: Record<string, number> = {};
  if (interests.includes("anime")) {
    pcts.tokyo = 0.35; pcts.kyoto = 0.15; pcts.osaka = 0.15;
    pcts.nara = 0.08; pcts.kanazawa = 0.08; pcts.hiroshima = 0.07;
    pcts.hakone = 0.06; pcts.nagoya = 0.06; pcts.fukuoka = 0.05;
  } else if (interests.includes("food")) {
    pcts.osaka = 0.22; pcts.tokyo = 0.22; pcts.kanazawa = 0.12;
    pcts.kyoto = 0.12; pcts.fukuoka = 0.1; pcts.hiroshima = 0.08;
    pcts.nara = 0.06; pcts.hakone = 0.05; pcts.nagoya = 0.05;
  } else if (interests.includes("relax")) {
    pcts.tokyo = 0.22; pcts.kyoto = 0.18; pcts.hakone = 0.14;
    pcts.kanazawa = 0.12; pcts.osaka = 0.1; pcts.nara = 0.08;
    pcts.hiroshima = 0.08; pcts.fukuoka = 0.05; pcts.nagoya = 0.05;
  } else {
    pcts.tokyo = 0.28; pcts.kyoto = 0.16; pcts.osaka = 0.14;
    pcts.nara = 0.08; pcts.hiroshima = 0.08; pcts.kanazawa = 0.08;
    pcts.hakone = 0.06; pcts.nagoya = 0.06; pcts.fukuoka = 0.06;
  }

  const alloc: Record<string, number> = {};
  let total = 0;
  for (const [city, pct] of Object.entries(pcts)) {
    alloc[city] = Math.floor(pct * days);
    total += alloc[city];
  }
  let remaining = days - total;
  const byPct = Object.entries(pcts).sort((a, b) => b[1] - a[1]);
  for (const [city] of byPct) {
    if (remaining <= 0) break;
    alloc[city]++;
    remaining--;
  }

  if (arrCity === depCity) {
    const loopPaths: Record<string, string[]> = {
      tokyo: ["tokyo", "hakone", "kyoto", "kanazawa", "nara", "hiroshima", "osaka", "nagoya"],
      osaka: ["osaka", "kyoto", "nara", "kanazawa", "hiroshima", "hakone", "tokyo", "nagoya"],
      nagoya: ["nagoya", "kanazawa", "kyoto", "nara", "osaka", "tokyo", "hakone", "fukuoka"],
      fukuoka: ["fukuoka", "hiroshima", "osaka", "kyoto", "nara", "kanazawa", "tokyo", "hakone"],
    };
    const path = loopPaths[arrCity] || loopPaths.tokyo;
    const route: string[] = [];
    for (const city of path) {
      const n = alloc[city] || 0;
      for (let i = 0; i < n; i++) route.push(city);
    }
    const loopCities = [arrCity, "osaka", "kyoto"];
    let li = 0;
    while (route.length < days) {
      route.push(loopCities[li % loopCities.length]);
      li++;
    }
    return route.slice(0, days);
  }

  const orderMap: Record<string, number> = {
    fukuoka: 0, hiroshima: 1, osaka: 2, kyoto: 3, nara: 3.5,
    nagoya: 4, kanazawa: 5, hakone: 6, tokyo: 7,
  };

  const startOrder = orderMap[arrCity] ?? 7;
  const endOrder = orderMap[depCity] ?? 0;
  const goingEast = startOrder < endOrder;

  const allCities = ["fukuoka", "hiroshima", "osaka", "kyoto", "nara", "nagoya", "kanazawa", "hakone", "tokyo"];
  const sorted = goingEast
    ? [...allCities].sort((a, b) => (orderMap[a] ?? 0) - (orderMap[b] ?? 0))
    : [...allCities].sort((a, b) => (orderMap[b] ?? 0) - (orderMap[a] ?? 0));

  const filtered = sorted.filter((c) => c !== arrCity && c !== depCity);
  const ordered = goingEast
    ? [arrCity, ...filtered.filter((c) => (orderMap[c] ?? 0) > startOrder && (orderMap[c] ?? 0) < endOrder), ...filtered.filter((c) => (orderMap[c] ?? 0) <= startOrder || (orderMap[c] ?? 0) >= endOrder).slice(0, 2), depCity]
    : [arrCity, ...filtered.filter((c) => (orderMap[c] ?? 0) < startOrder && (orderMap[c] ?? 0) > endOrder), ...filtered.filter((c) => (orderMap[c] ?? 0) >= startOrder || (orderMap[c] ?? 0) <= endOrder).slice(0, 2), depCity];

  const uniqueOrdered = [...new Set(ordered)];

  const route: string[] = [];
  for (const city of uniqueOrdered) {
    const n = alloc[city] || (city === arrCity || city === depCity ? Math.max(1, Math.floor(days * 0.15)) : 0);
    for (let i = 0; i < n; i++) route.push(city);
  }

  while (route.length < days) {
    const mid = uniqueOrdered[Math.floor(uniqueOrdered.length / 2)];
    route.push(mid || "tokyo");
  }

  return route.slice(0, days);
}

function getItinerary(days: number, selectedInterests: InterestId[], budget: string, arrival: string, departure: string): DayPlan[] {
  const route = getCityRoute(days, selectedInterests, arrival, departure);
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
  const [arrival, setArrival] = useState("tokyo-narita");
  const [departure, setDeparture] = useState("tokyo-narita");
  const [routeOrder, setRouteOrder] = useState<string[]>([]);
  const [showStats, setShowStats] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [liveStats, setLiveStats] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/stats`)
      .then((r) => r.json())
      .then(setLiveStats)
      .catch(() => {});
  }, []);

  const statsDisplay = useMemo(() => {
    if (!liveStats) return budgetStatsFallback;
    const s = liveStats as Record<string, unknown>;
    const spending = s.spending as Record<string, unknown> | undefined;
    const visitors = s.visitors as Record<string, unknown> | undefined;
    const duration = s.duration as Record<string, unknown> | undefined;
    return [
      { source: s.source || "JNTO", label: "Gasto medio turista", value: `~${spending?.avg_daily_per_tourist || 148}€/día`, detail: "Incluye alojamiento, comida, transporte, compras" },
      { source: s.source || "JNTO", label: "Gasto en comida", value: `~${spending?.avg_daily_food || 46}€/día`, detail: `${Math.round(((spending?.avg_daily_food as number) || 46) / ((spending?.avg_daily_per_tourist as number) || 148) * 100)}% del presupuesto total` },
      { source: s.source || "JNTO", label: "Gasto en alojamiento", value: `~${spending?.avg_daily_accommodation || 55}€/día`, detail: `${Math.round(((spending?.avg_daily_accommodation as number) || 55) / ((spending?.avg_daily_per_tourist as number) || 148) * 100)}% del presupuesto total` },
      { source: s.source || "JNTO", label: "Estancia media", value: `${duration?.avg_nights || 7.2} noches`, detail: "Turistas internacionales" },
      { source: s.source || "JNTO", label: "Visitantes totales", value: `${((visitors?.total_2024 as number) || 36870000) / 1000000}M`, detail: `Récord histórico en ${visitors?.record_year || 2024}` },
    ];
  }, [liveStats]);

  const toggleInterest = (id: InterestId) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    const route = getCityRoute(days, selectedInterests, arrival, departure);
    setRouteOrder([...new Set(route)]);
    setShowPlan(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const itinerary = useMemo(() =>
    showPlan ? getItinerary(days, selectedInterests, budget, arrival, departure) : [],
    [showPlan, days, selectedInterests, budget, arrival, departure]
  );

  const uniqueRoute = useMemo(() => {
    if (!itinerary.length) return [];
    const seen = new Set<string>();
    return itinerary.filter((d) => {
      const key = d.city;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map((d) => ({
      city: d.city,
      days: itinerary.filter((dd) => dd.city === d.city).length,
    }));
  }, [itinerary]);

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
          <h2 className="text-lg font-bold text-gray-900 mb-2">✈️ ¿Dónde llegas a Japón?</h2>
          <p className="text-sm text-gray-500 mb-3">Selecciona tu aeropuerto de entrada. Esto define el punto de inicio de tu ruta.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {arrivalOptions.map((opt) => (
              <button key={opt.id} onClick={() => setArrival(opt.id)}
                className={`p-3 rounded-xl text-left transition-all ${arrival === opt.id ? "bg-blue-50 border-2 border-blue-500 text-blue-700" : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"}`}>
                <div className="font-medium text-sm">{opt.emoji} {opt.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">✈️ ¿Dónde sales de Japón?</h2>
          <p className="text-sm text-gray-500 mb-3">Puede ser diferente a tu llegada para no retroceder camino.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {departureOptions.map((opt) => (
              <button key={opt.id} onClick={() => setDeparture(opt.id)}
                className={`p-3 rounded-xl text-left transition-all ${departure === opt.id ? "bg-purple-50 border-2 border-purple-500 text-purple-700" : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"}`}>
                <div className="font-medium text-sm">{opt.emoji} {opt.label}</div>
              </button>
            ))}
          </div>
          {arrival !== departure && (
            <p className="mt-2 text-xs text-green-600 font-medium">
              ✅ Ruta en línea: no retrocedes. Ahorrarás tiempo y dinero en transporte.
            </p>
          )}
        </div>

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
              {showStats ? "▼ Ocultar estadísticas reales" : "▶ Ver estadísticas de gasto real"}
            </button>
            {showStats && (
              <div className="mt-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs text-blue-600 mb-3 font-medium">Fuente: {String(liveStats?.source || "JNTO")} — {liveStats?.last_updated ? `Actualizado: ${String(liveStats.last_updated)}` : "Datos 2024"}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {statsDisplay.map((stat, i) => (
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

          <div className="bg-blue-50 rounded-2xl p-5 mb-6 border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2">🧭 ¿Por qué esta ruta?</h3>
            <p className="text-sm text-blue-700">{getRouteExplanation(arrival, departure, selectedInterests)}</p>
            {routeOrder.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1">
                {routeOrder.map((city, i) => (
                  <span key={i} className="flex items-center">
                    <span className="text-xs bg-white px-2 py-1 rounded-full border border-blue-200 font-medium text-blue-800">
                      {cityCoords[city]?.[2] || city}
                    </span>
                    {i < routeOrder.length - 1 && <span className="text-blue-300 mx-1">→</span>}
                  </span>
                ))}
              </div>
            )}
          </div>

          {uniqueRoute.length >= 1 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">🗺️ Tu recorrido</h3>
              <RouteMap route={uniqueRoute} />
            </div>
          )}

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
                                    const gygSlugs: Record<string, string> = { tokyo: "tokyo-l193", osaka: "osaka-l1204", kyoto: "kyoto-l96826", hiroshima: "hiroshima-l32662", nara: "nara-l1707", kanazawa: "kanazawa-l32537", nagoya: "nagoya-l32669", hakone: "hakone-l1875" };
                                    const href = a.provider === "gyg" && a.gygCity && a.gygQuery
                                      ? `${GYG}/${gygSlugs[a.gygCity] || "tokyo-l193"}/?q=${encodeURIComponent(a.gygQuery)}&partner_id=NRWCY1R`
                                      : a.link;
                                    return (
                                      <a href={href} target="_blank" rel="noopener noreferrer"
                                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded transition ${
                                          a.provider === "klook" ? "bg-red-50 text-red-600 hover:bg-red-100" :
                                          a.provider === "gyg" ? "bg-orange-50 text-orange-600 hover:bg-orange-100" :
                                          a.provider === "booking" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" :
                                          a.provider === "wifi" ? "bg-cyan-50 text-cyan-600 hover:bg-cyan-100" :
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
