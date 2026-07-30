"use client";

import { useExchangeRate, formatPriceWithEur } from "@/hooks/useExchangeRate";

const natureSpots = [
  {
    name: "Monte Fuji",
    icon: "🗻",
    desc: "El volcán más famoso de Japón. 3,776m. Patrimonio de la Humanidad. Visible desde Tokio en días claros.",
    bestSeason: "Julio-Septiembre (para subir)",
    location: "Entre Tokio y Kioto",
    difficulty: "Moderada (subida nocturna recomendada)",
    price: "Gratis (pero necesitas equipo)",
    tips: [
      "Subida nocturna para ver el amanecer (goraiko)",
      "Estación V: el punto de partida (coche/bus)",
      "Temporada de ascenso: julio-septiembre",
      "Trae ropa de abrigo (frío en la cima)",
      "Evita fin de semana (multitudes)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/mt-fuji-day-tour-with-kawaguchiko-lake-and-gotemba-outlets-t173031/?partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/en-US/activity/2675-mount-fuji-classic-route-day-tour-tokyo/?aid=128948" },
    ],
  },
  {
    name: "Bosque de bambú de Arashiyama",
    icon: "🎋",
    desc: "Un bosque de bambú gigantes que parece de película. La luz que se filtra es mágica.",
    bestSeason: "Todo el año (mejor temprano en la mañana)",
    location: "Kioto",
    difficulty: "Fácil (paseo a pie)",
    price: "Gratis",
    tips: [
      "Ve a las 7-8am para evitar multitudes",
      "Alquila bici para explorar la zona",
      "Cercano: Monkey Park y templos",
      "No toques los bambús (están protegidos)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/kyoto-l96826/kyoto-arashiyama-and-bamboo-forest-tour-t904583/?partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/en-US/activity/92976-arashiyama-bamboo-forest-tenryu-ji-temple-okochi-sanso-garden-join-half-day-walking-tour/?aid=128948" },
    ],
  },
  {
    name: "Yakushima",
    icon: "🌿",
    desc: "Isla con bosques de cedros de 1,000 años. Inspiración de Princess Mononoke. Lluvia constante.",
    bestSeason: "Abril-Noviembre",
    location: "Sur de Kyushu",
    difficulty: "Moderada-Alta",
    price: "Ferry o avión desde Kagoshima",
    tips: [
      "Jomon Sugi: el árbol más antiguo (3,000-7,000 años)",
      "Necesitas 1-2 días para subir al Jomon Sugi",
      "Bosque de niebla constante",
      "Lleva ropa impermeable (llueve mucho)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/yakushima-l45945/yakushima-1-day-jomon-cedar-hike-t1347962/?partner_id=NRWCY1R" },
    ],
  },
  {
    name: "Camino del Nakasendo",
    icon: "🛤️",
    desc: "La ruta que usaban los samuráis para ir de Tokio a Kioto. Pueblos con encabo de madera intactos.",
    bestSeason: "Primavera y Otoño",
    location: "Entre Magome y Tsumago",
    difficulty: "Fácil-Moderada (senderismo tranquilo)",
    price: "Gratis",
    tips: [
      "Magome → Tsumago: la sección más bonita (8km)",
      "Puedes dejar equipaje en el punto de inicio",
      "Pueblos preservados del siglo XIX",
      "Pausa para comer soba en los pueblos",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/nagoya-l1228/?q=nakasendo+trail&partner_id=NRWCY1R" },
    ],
  },
  {
    name: "Parque Nacional de Nikko",
    icon: "🌲",
    desc: "Templos rodeados de bosques centenarios, cascadas y lagos. Naturaleza y cultura juntas.",
    bestSeason: "Otoño (koyo espectacular)",
    location: "2h desde Tokio",
    difficulty: "Fácil-Moderada",
    price: "Entrada a templos: 300-1,600 yenes",
    tips: [
      "Kegon Falls: una de las cascadas más altas de Japón",
      "Lago Chuzenji: vistas increíbles",
      "Toshogu: el templo más decorado de Japón",
      "Autobús gratuito desde estación",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/from-tokyo-nikko-world-heritage-day-tour-with-guide-t1278661/?partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/en-US/activity/74672-nikko-day-bus-tour/?aid=128948" },
    ],
  },
  {
    name: "Isla de Miyajima",
    icon: "⛩️",
    desc: "El torii flotante más famoso de Japón. Ciervos, templos y vistas espectaculares.",
    bestSeason: "Todo el año",
    location: "Cerca de Hiroshima",
    difficulty: "Fácil",
    price: "Ferry: 180 yenes (con JR Pass gratis)",
    tips: [
      "Torii flotante: ver con marea alta Y baja",
      "Monto Misen: cable car + senderismo",
      "Momiji manju: pastel de arce (recuerdo típico)",
      "Ciervos por toda la isla",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/hiroshima-l430/miyajima-and-hiroshima-day-tour-from-hiroshima-t203529/?partner_id=NRWCY1R" },
    ],
  },
  {
    name: "Valle de Kamikochi",
    icon: "🏔️",
    desc: "El Valle Suizo de Japón. Ríos cristalinos, montañas nevadas y aire puro. Paraíso de senderistas.",
    bestSeason: "Abril-Noviembre",
    location: "Nagano",
    difficulty: "Fácil-Moderada",
    price: "Autobús desde Matsumoto",
    tips: [
      "Solo se puede llegar en bus (no coche privado)",
      "Senderos planos junto al río",
      "Kappa Bridge: el punto más fotogénico",
      "En otoño: koyo impresionante",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/matsumoto-l134797/?q=kamikochi&partner_id=NRWCY1R" },
    ],
  },
  {
    name: "Playas de Okinawa",
    icon: "🏖️",
    desc: "Agua tropical, arrecifes de coral y playas de arena blanca. El Caribe de Japón.",
    bestSeason: "Marzo-Septiembre",
    location: "Okinawa",
    difficulty: "Fácil (relax)",
    price: "Variable",
    tips: [
      "Playa Kerama: snorkel con tortugas",
      "Naminoue Beach: la más céntrica de Naha",
      "Ishigaki: la isla más bonita",
      "Buceo: aguas cristalinas con 30m+ visibilidad",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/okinawa-l9564/?partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/en-US/activity/280-island-snorkeling-okinawa/?aid=128948" },
    ],
  },
  {
    name: "Bosque de niebla de Kumano",
    icon: "🌫️",
    desc: "Sendero de peregrinación entre bosques ancestrales y cascadas. Patrimonio de la Humanidad.",
    bestSeason: "Primavera y Otoño",
    location: "Kii Peninsula",
    difficulty: "Moderada-Alta (varios días)",
    price: "Gratis (senderos públicos)",
    tips: [
      "Kumano Kodo: 2-4 días de senderismo",
      "Doble peregrinación: Kumano + Camino de Santiago",
      "Dōsojin: piedras sagradas en el camino",
      "Onsen al final del día",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/osaka-l204/?q=kumano+kodo&partner_id=NRWCY1R" },
    ],
  },
];

export default function NaturePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🌿 Naturaleza en Japón
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Japón es 73% montañas. Bosques ancestrales, playas tropicales,
          volcanes activos y cascadas escondidas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {natureSpots.map((spot) => (
          <div
            key={spot.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{spot.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{spot.name}</h3>
                <p className="text-sm text-gray-500">{spot.location}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{spot.desc}</p>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="font-semibold">Mejor época:</span> {spot.bestSeason}
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="font-semibold">Dificultad:</span> {spot.difficulty}
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <h4 className="text-xs font-semibold text-green-600 mb-2">💡 Tips:</h4>
              <ul className="space-y-1">
                {spot.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-gray-600">• {tip}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {spot.affiliate.map((a, i) => (
                <a
                  key={i}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  {a.name} →
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
