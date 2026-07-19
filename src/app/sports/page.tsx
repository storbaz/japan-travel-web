"use client";

import { useExchangeRate, formatPriceWithEur } from "@/hooks/useExchangeRate";

const sports = [
  {
    name: "Esquí y Snowboard",
    icon: "⛷️",
    season: "Diciembre - Abril",
    locations: ["Niseko (Hokkaido)", "Hakuba (Nagano)", "Nozawa Onsen", "Furano", "Myoko"],
    desc: "Japón tiene la nieve polvo más fina del mundo (powder snow). Los resorts son modernos y con poca multitud comparado con Europa.",
    price: "6,000-10,000 yenes/día (skipass)",
    level: "Todos los niveles",
    tips: [
      "Niseko: la mejor nieve del mundo,国际化 ski resort",
      "Hakuba: usó los JJuegos Olímpicos 1998",
      "Nozawa Onsen: ski + onsen gratis al final del día",
      "Alquila equipado allí (no traigas de casa)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=ski+japan&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=japan+ski+pass" },
    ],
  },
  {
    name: "Surf",
    icon: "🏄",
    season: "Todo el año (mejor: Mar-Nov)",
    locations: ["Shonan (cerca de Tokio)", "Kamakura", "Chiba", "Okinawa", "Miyazaki"],
    desc: "Japón tiene olas para todos los niveles. Okinawa tiene agua tropical y arrecifes. Shonan es el surf spot más famoso de Tokio.",
    price: "Alquiler tabla: 3,000-5,000 yenes/día",
    level: "Todos los niveles",
    tips: [
      "Shonan: 1h desde Tokio, olas suaves para principiantes",
      "Okinawa: agua tibia todo el año, arrecifes de coral",
      "Septiembre-Octubre: mejor época (olos grandes + agua caliente)",
      "Trae neopreno en invierno (agua fría en Tokio)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=surf+japan&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=surf+lesson+japan" },
    ],
  },
  {
    name: "Senderismo",
    icon: "🥾",
    season: "Octubre - Noviembre (koyo), Mayo - Junio",
    locations: ["Kumano Kodo", "Monte Fuji", "Nakasendo Trail", "Yakushima", "Kamikochi"],
    desc: "Japón tiene senderos ancestrales, bosques milenarios y montañas sagradas. El Kumano Kodo es Patrimonio de la Humanidad.",
    price: "Gratis (senderos públicos)",
    level: "Todos los niveles",
    tips: [
      "Kumano Kodo: 2-4 días, sendero de peregrinación",
      "Monte Fuji: solo de julio a septiembre, nocturna recomendada",
      "Yakushima: bosque de cedros de 1,000 años (inspiración de Princess Mononoke)",
      "Nakasendo Trail: caminos de samuráis entre ciudades",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=kumano+kodo+tour&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=mt+fuji+hiking" },
    ],
  },
  {
    artName: "Escalada",
    icon: "🧗",
    season: "Octubre - Mayo",
    locations: ["Yosemite japonés (Ogawayama)", "Takachiho Gorge", "Monte Mitake"],
    desc: "Japón tiene paredes de granito excelentes. Menos conocido que otras actividades, pero los escaladores lo adoran.",
    price: "Alquiler equipo: 5,000-8,000 yenes/día",
    level: "Intermedio-Avanzado",
    tips: [
      "Ogawayama: el Yosemite japonés, granito perfecto",
      "Monte Mitake: fácil acceso desde Tokio",
      "Alquila equipo en tiendas de montaña (Mont Bell)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=climbing+japan&partner_id=NRWCY1R" },
    ],
  },
  {
    name: "Buceo y Snorkel",
    icon: "🤿",
    season: "Mayo - Octubre",
    locations: ["Okinawa", "Izu Peninsula", "Kagosima"],
    desc: "Okinawa tiene arrecifes de coral, tortugas marinas y peces tropicales. El agua es cristalina.",
    price: "Buceo: 10,000-15,000 yenes (2 inmersiones)",
    level: "Todos los niveles",
    tips: [
      "Okinawa: el mejor buceo de Japón",
      "Cape Maeda: snorkel gratis (equipo en tiendas)",
      "Tortugas marinas: en Kerama Islands",
      "Certificación PADI: disponible en inglés",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=diving+okinawa&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=snorkeling+okinawa" },
    ],
  },
  {
    name: "Ciclismo",
    icon: "🚴",
    season: "Marzo - Noviembre",
    locations: ["Kioto", "Nara", "Shimanami Kaido", "Tokio"],
    desc: "Alquilar bici es la mejor forma de explorar Kioto y ciudades pequeñas. El Shimanami Kaido es una ruta costera espectacular.",
    price: "Alquiler: 1,000-2,000 yenes/día",
    level: "Todos los niveles",
    tips: [
      "Kioto: alquila bici para visitar templos (más rápido que bus)",
      "Shimanami Kaido: ruta de 60km entre islas",
      "Yakushima: bici para explorar la isla",
      "Estaciones de bicis públicas en Tokio (Docomo)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=cycling+japan&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=bike+rental+japan" },
    ],
  },
  {
    name: "Golf",
    icon: "⛳",
    season: "Todo el año",
    locations: ["Cerca de Tokio", "Osaka", "Fukuoka"],
    desc: "Los campos de golf japoneses son caros pero increíblemente bien cuidados. Experiencia premium.",
    price: "30,000-80,000 yenes/ronda",
    level: "Todos los niveles",
    tips: [
      "Los campos son caros pero la calidad es insuperable",
      "Incluye servicio de lacayos y comida",
      "Algunos campos tienen night golf (iluminados)",
      "Reserva con antelación en temporada alta",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=golf+japan&partner_id=NRWCY1R" },
    ],
  },
  {
    name: "Artes Marciales",
    icon: "🥋",
    season: "Todo el año",
    locations: ["Tokio", "Kioto", "Osaka"],
    desc: "Puedes probar judo, karate, kendo o aikido en escuelas reales. Algunas ofrecen clases para turistas.",
    price: "3,000-10,000 yenes/clase",
    level: "Todos los niveles",
    tips: [
      "Judo: en el Kodokan (Tokio, sede mundial)",
      "Karate: en Okinawa (cuna del karate)",
      "Kendo: espada japonesa, muy emocionante",
      "Aikido: arte marcial defensivo, relajado",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=martial+arts+japan&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=judo+experience+tokyo" },
    ],
  },
  {
    name: "Kayak y Paddle Board",
    icon: "🛶",
    season: "Abril - Octubre",
    locations: ["Hakone", "Lake Kawaguchi", "Okinawa", "Yakushima"],
    desc: "Kayak entre islas, ríos y lagos con vistas al Fuji. Paddle board en Okinawa sobre agua cristalina.",
    price: "3,000-6,000 yenes/día",
    level: "Todos los niveles",
    tips: [
      "Lake Kawaguchi: kayak con vista al Fuji",
      "Okinawa: paddle board sobre arrecifes",
      "Yakaku: kayak entre bosques milenarios",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=kayak+japan&partner_id=NRWCY1R" },
    ],
  },
  {
    name: "Parapente",
    icon: "🪂",
    season: "Abril - Noviembre",
    locations: ["Nagano", "Tochigi", "Shizuoka"],
    desc: "Volar sobre montañas y valles con vistas espectaculares. Experiencia única con guías certificados.",
    price: "10,000-15,000 yenes/vuelo",
    level: "Principiante (tandem)",
    tips: [
      "Nagano: vuelo con vistas al Japón Alpino",
      "No se necesita experiencia (vuelo tandem)",
      "Reserva con buen tiempo",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=paragliding+japan&partner_id=NRWCY1R" },
    ],
  },
];

export default function SportsPage() {
  const { rate } = useExchangeRate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🏆 Deportes y Aventura
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Japón no es solo cultura y comida. Hay deportes para todos los niveles:
          esquí en la mejor nieve del mundo, surf en Okinawa, senderismo por bosques milenarios.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sports.map((sport) => (
          <div
            key={sport.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{sport.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{sport.name}</h3>
                <p className="text-sm text-gray-500">{sport.season}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{sport.desc}</p>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="font-semibold">Precio:</span> {formatPriceWithEur(sport.price, rate)}
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="font-semibold">Nivel:</span> {sport.level}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 mb-2">📍 Dónde:</h4>
              <div className="flex flex-wrap gap-1">
                {sport.locations.map((loc, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 mb-4">
              <h4 className="text-xs font-semibold text-amber-600 mb-2">💡 Tips:</h4>
              <ul className="space-y-1">
                {sport.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-gray-600">• {tip}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {sport.affiliate.map((a, i) => (
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
