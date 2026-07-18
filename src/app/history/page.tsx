"use client";

const historicalPeriods = [
  {
    name: "Período Jomon",
    period: "14,000 - 300 a.C.",
    icon: "🏺",
    desc: "Los primeros habitantes de Japón. Cerámica, caza y pesca. Sociedad sin escritura.",
    highlights: ["Cerámica más antigua del mundo", "Herramientas de piedra", "Asentamientos costeros"],
    places: ["Sapporo: Jomon Museum", "Towada: ruinas jomon"],
  },
  {
    name: "Período Yamato / Kofun",
    period: "300 - 710 d.C.",
    icon: "⚔️",
    desc: "Los clanes Yamato unifican Japón. Aparecen los emperadores. Entierros en túmulos (kofun).",
    highlights: ["Kofun (túmulos gigantes)", "Introducción del budismo", "Primeros templos"],
    places: ["Nara: Tumulus Imperial", "Osaka: templo Shiteno-ji"],
  },
  {
    name: "Período Nara",
    period: "710 - 794",
    icon: "🏛️",
    desc: "Primera capital en Nara. El budismo florece. Se construyen templos gigantes.",
    highlights: ["Todai-ji (Buda gigante)", "Shosoin (tesoro imperial)", "Primeros escritos"],
    places: ["Nara: Todai-ji", "Nara: Kasuga Taisha", "Nara: Shosoin"],
  },
  {
    name: "Período Heian",
    period: "794 - 1185",
    icon: "👑",
    desc: "Capital en Kioto. Época de elegance y cultura. Los emperadores reinan pero no gobiernan.",
    highlights: ["Cultura Heian", "Lady Murasaki (Genji)", "Geisha y cortesanas", "Castillos de madera"],
    places: ["Kioto: Palacio Imperial", "Kioto: Kinkaku-ji", "Uji: templos"],
  },
  {
    name: "Período Kamakura",
    period: "1185 - 1333",
    icon: "🗡️",
    desc: "Los samuráis toman el poder. Shogunato. Era de guerreros y templos zen.",
    highlights: ["Primer shogunato", "Guerras Genpei", "Templos zen", "Buda de Kamakura"],
    places: ["Kamakura: Great Buddha", "Kamakura: Tsurugaoka Hachimangu", "Nikko: templos"],
  },
  {
    name: "Período Muromachi",
    period: "1336 - 1573",
    icon: "🏯",
    desc: "Época de los daimyo (señores feudales). Guerras civiles, pero gran arte y cultura.",
    highlights: ["Arte zen", "Ceremonia del té", "Ikebana", "Castillos de madera"],
    places: ["Kioto: Ginkaku-ji", "Kamakura: Engaku-ji", "Matsumoto: castillo"],
  },
  {
    name: "Período Azuchi-Momoyama",
    period: "1573 - 1603",
    icon: "🏰",
    desc: "Oda Nobunaga, Toyotomi Hideyoshi y Tokugawa Ieyasu unifican Japón.",
    highlights: ["Unificación de Japón", "Castillos enormes", "Comercio con Occidente", "Armaduras espectaculares"],
    places: ["Osaka: Osaka Castle", "Nagoya: Nagoya Castle", "Himeji: Himeji Castle"],
  },
  {
    name: "Período Edo",
    period: "1603 - 1868",
    icon: "🌸",
    desc: "250 años de paz bajo los Tokugawa. Japón se cierra al mundo. Florece el arte y la cultura popular.",
    highlights: ["Ukiyo-e (grabados)", "Kabuki", "Geisha", "Shogunato Tokugawa"],
    places: ["Tokio: Edo-Tokyo Museum", "Kanazawa: Higashi Chaya", "Kyoto: Gion"],
  },
  {
    name: "Período Meiji",
    period: "1868 - 1912",
    icon: "🚄",
    desc: "Japón se abre al mundo. Industrialización rápida. De feudal a moderno en una generación.",
    highlights: ["Revolución Meiji", "Tren, telégrafo, escuelas", "Fin del samurái", "Constitución moderna"],
    places: ["Tokio: Meiji Shrine", "Nikko: Toshogu (tumba Tokugawa)", "Hakone: opened by Meiji"],
  },
  {
    name: "Período Showa",
    period: "1926 - 1989",
    icon: "💣",
    desc: "Guerra, destrucción y el milagro económico japonés. De las cenizas a la 2ª economía mundial.",
    highlights: ["WWII", "Bombas atómicas", "Milagro económico", "Tokyo Olympics 1964"],
    places: ["Hiroshima: Peace Memorial", "Nagasaki: Peace Park", "Tokio: Olympic Stadium"],
  },
  {
    name: "Japón Moderno",
    period: "1989 - Presente",
    icon: "🗼",
    desc: "Era de la tecnología, anime y cultura pop. Japón como potencia cultural global.",
    highlights: ["Anime y manga", "Tecnología", "Turismo masivo", "Olimpiadas 2020"],
    places: ["Tokio: Shibuya Sky", "Akihabara", "Okinawa: resort"],
  },
];

const castles = [
  { name: "Himeji Castle", desc: "El castillo blanco más bello de Japón. Patrimonio UNESCO. Nunca fue destruido.", location: "Himeji", hours: "9:00-16:00", price: "1,000 yenes" },
  { name: "Matsumoto Castle", desc: "El castillo del cuervo negro. Uno de los más antiguos (1594).", location: "Matsumoto", hours: "8:30-16:30", price: "700 yenes" },
  { name: "Osaka Castle", desc: "El castillo más famoso. Museo del interior, parque enorme.", location: "Osaka", hours: "9:00-17:00", price: "600 yenes" },
  { name: "Nagoya Castle", desc: "Castillo con los tigres dorados (shachihoko) más grandes.", location: "Nagoya", hours: "9:00-16:30", price: "500 yenes" },
  { name: "Kumamoto Castle", desc: "Dañado por terremoto en 2016, pero reconstruido. Impresionante.", location: "Kumamoto", hours: "8:30-18:00", price: "800 yenes" },
  { name: "Nijo Castle", desc: "Palacio del shogun en Kioto. Suelas que crujen (para espías).", location: "Kioto", hours: "8:45-16:00", price: "1,030 yenes" },
];

export default function HistoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📜 Historia de Japón
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Desde los primeros habitantes hasta la tecnología moderna.
          Japón tiene 14,000 años de historia fascinante.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mb-16">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <div className="space-y-8">
          {historicalPeriods.map((period, index) => (
            <div
              key={period.name}
              className={`relative flex items-start gap-4 md:gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm -ml-4 md:-ml-4 z-10">
                {index + 1}
              </div>

              <div className="ml-12 md:ml-0 md:w-1/2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{period.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{period.name}</h3>
                      <p className="text-sm text-red-500 font-medium">{period.period}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{period.desc}</p>
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-600 mb-1">Destacados:</h4>
                    <div className="flex flex-wrap gap-1">
                      {period.highlights.map((h, i) => (
                        <span key={i} className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 mb-1">📍 Lugares para visitar:</h4>
                    <p className="text-xs text-gray-500">{period.places.join(" · ")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Castles */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          🏯 Castillos que Debes Visitar
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {castles.map((castle) => (
            <div
              key={castle.name}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-2">{castle.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{castle.desc}</p>
              <div className="space-y-1 text-xs text-gray-500">
                <div>📍 {castle.location}</div>
                <div>🕐 {castle.hours}</div>
                <div>💰 {castle.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🗾 Organiza tu viaje histórico
        </h2>
        <p className="text-gray-600 mb-6">
          Usa nuestro planificador para crear un itinerario que incluya todos los lugares históricos.
        </p>
        <a
          href="https://japan-travel-web-lime.vercel.app/trip-planner"
          className="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition"
        >
          Planificar mi viaje →
        </a>
      </div>
    </div>
  );
}
