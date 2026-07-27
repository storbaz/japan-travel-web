"use client";

import { useState, useEffect, useMemo } from "react";

const countryToAirport: Record<string, { code: string; label: string; emoji: string }> = {
  ES: { code: "mad", label: "Madrid", emoji: "🇪🇸" },
  GB: { code: "lhr", label: "Londres", emoji: "🇬🇧" },
  FR: { code: "cdg", label: "París", emoji: "🇫🇷" },
  DE: { code: "fra", label: "Fráncfort", emoji: "🇩🇪" },
  IT: { code: "fco", label: "Roma", emoji: "🇮🇹" },
  PT: { code: "lis", label: "Lisboa", emoji: "🇵🇹" },
  NL: { code: "ams", label: "Ámsterdam", emoji: "🇳🇱" },
  US: { code: "jfk", label: "Nueva York", emoji: "🇺🇸" },
  MX: { code: "mex", label: "Ciudad de México", emoji: "🇲🇽" },
  AR: { code: "eze", label: "Buenos Aires", emoji: "🇦🇷" },
  BR: { code: "gru", label: "São Paulo", emoji: "🇧🇷" },
  CO: { code: "bog", label: "Bogotá", emoji: "🇨🇴" },
  CL: { code: "scl", label: "Santiago", emoji: "🇨🇱" },
  PE: { code: "lim", label: "Lima", emoji: "🇵🇪" },
  CA: { code: "yyz", label: "Toronto", emoji: "🇨🇦" },
  AU: { code: "syd", label: "Sídney", emoji: "🇦🇺" },
  CN: { code: "pek", label: "Pekín", emoji: "🇨🇳" },
  KR: { code: "icn", label: "Seúl", emoji: "🇰🇷" },
  IN: { code: "del", label: "Nueva Delhi", emoji: "🇮🇳" },
  JP: { code: "tyoa", label: "Japón (doméstico)", emoji: "🇯🇵" },
  CR: { code: "sjo", label: "San José", emoji: "🇨🇷" },
  PA: { code: "pty", label: "Ciudad de Panamá", emoji: "🇵🇦" },
  EC: { code: "uio", label: "Quito", emoji: "🇪🇨" },
  VE: { code: "ccs", label: "Caracas", emoji: "🇻🇪" },
  NI: { code: "mga", label: "Managua", emoji: "🇳🇮" },
  HN: { code: "tgu", label: "Tegucigalpa", emoji: "🇭🇳" },
  GT: { code: "gua", label: "Ciudad de Guatemala", emoji: "🇬🇹" },
  UY: { code: "mvd", label: "Montevideo", emoji: "🇺🇾" },
  PY: { code: "asu", label: "Asunción", emoji: "🇵🇾" },
  DO: { code: "sdq", label: "Santo Domingo", emoji: "🇩🇴" },
  CU: { code: "hav", label: "La Habana", emoji: "🇨🇺" },
};

const fallbackAirports = [
  { code: "mad", label: "Madrid", emoji: "🇪🇸" },
  { code: "bcn", label: "Barcelona", emoji: "🇪🇸" },
  { code: "agp", label: "Málaga", emoji: "🇪🇸" },
  { code: "svq", label: "Sevilla", emoji: "🇪🇸" },
  { code: "vlc", label: "Valencia", emoji: "🇪🇸" },
  { code: "bio", label: "Bilbao", emoji: "🇪🇸" },
  { code: "pmi", label: "Palma de Mallorca", emoji: "🇪🇸" },
  { code: "alc", label: "Alicante", emoji: "🇪🇸" },
  { code: "tfn", label: "Tenerife", emoji: "🇪🇸" },
  { code: "lpa", label: "Gran Canaria", emoji: "🇪🇸" },
  { code: "scq", label: "Santiago de Compostela", emoji: "🇪🇸" },
  { code: "zgz", label: "Zaragoza", emoji: "🇪🇸" },
  { code: "vgo", label: "Vigo", emoji: "🇪🇸" },
  { code: "ace", label: "Lanzarote", emoji: "🇪🇸" },
  { code: "fue", label: "Fuerteventura", emoji: "🇪🇸" },
  { code: "lhr", label: "Londres", emoji: "🇬🇧" },
  { code: "cdg", label: "París", emoji: "🇫🇷" },
  { code: "fra", label: "Fráncfort", emoji: "🇩🇪" },
  { code: "ams", label: "Ámsterdam", emoji: "🇳🇱" },
  { code: "fco", label: "Roma", emoji: "🇮🇹" },
  { code: "lis", label: "Lisboa", emoji: "🇵🇹" },
  { code: "jfk", label: "Nueva York", emoji: "🇺🇸" },
  { code: "mia", label: "Miami", emoji: "🇺🇸" },
  { code: "lax", label: "Los Ángeles", emoji: "🇺🇸" },
  { code: "ord", label: "Chicago", emoji: "🇺🇸" },
  { code: "mex", label: "Ciudad de México", emoji: "🇲🇽" },
  { code: "gdl", label: "Guadalajara", emoji: "🇲🇽" },
  { code: "cun", label: "Cancún", emoji: "🇲🇽" },
  { code: "mty", label: "Monterrey", emoji: "🇲🇽" },
  { code: "bog", label: "Bogotá", emoji: "🇨🇴" },
  { code: "mde", label: "Medellín", emoji: "🇨🇴" },
  { code: "lim", label: "Lima", emoji: "🇵🇪" },
  { code: "eze", label: "Buenos Aires", emoji: "🇦🇷" },
  { code: "scl", label: "Santiago de Chile", emoji: "🇨🇱" },
  { code: "gru", label: "São Paulo", emoji: "🇧🇷" },
  { code: "gig", label: "Río de Janeiro", emoji: "🇧🇷" },
  { code: "sjo", label: "San José (Costa Rica)", emoji: "🇨🇷" },
  { code: "pty", label: "Ciudad de Panamá", emoji: "🇵🇦" },
  { code: "uio", label: "Quito", emoji: "🇪🇨" },
  { code: "gye", label: "Guayaquil", emoji: "🇪🇨" },
  { code: "ccs", label: "Caracas", emoji: "🇻🇪" },
  { code: "mga", label: "Managua", emoji: "🇳🇮" },
  { code: "tgu", label: "Tegucigalpa", emoji: "🇭🇳" },
  { code: "sjd", label: "San José del Cabo", emoji: "🇲🇽" },
];

const airlines = [
  {
    name: "Iberia",
    logo: "✈️",
    route: "Madrid → Tokio (Narita/Haneda)",
    duration: "13-14h (directo)",
    price: "600-1,200€ ida/vuelta",
    luggage: "1 maleta 23kg + 1 equipaje de mano 10kg",
    baggageUrl: "https://www.iberia.com/es/equipaje/",
    bookUrl: "https://www.skyscanner.net/transporte/vuelos/mad/tyoa/",
  },
  {
    name: "Japan Airlines (JAL)",
    logo: "🇯🇵",
    route: "Madrid → Tokio (Narita)",
    duration: "14-15h (directo)",
    price: "700-1,400€ ida/vuelta",
    luggage: "2 maletas 23kg + 1 equipaje de mano 10kg",
    baggageUrl: "https://www.jal.co.jp/en/e/",
    bookUrl: "https://www.skyscanner.net/transporte/vuelos/mad/tyoa/",
  },
  {
    name: "ANA (All Nippon Airways)",
    logo: "🛫",
    route: "Madrid → Tokio (Haneda)",
    duration: "14-15h (directo)",
    price: "750-1,500€ ida/vuelta",
    luggage: "2 maletas 23kg + 1 equipaje de mano 10kg",
    baggageUrl: "https://www.ana.co.jp/en/us/",
    bookUrl: "https://www.skyscanner.net/transporte/vuelos/mad/tyoa/",
  },
  {
    name: "KLM + partner",
    logo: "🔵",
    route: "Madrid → Ámsterdam → Tokio",
    duration: "16-18h (1 escala)",
    price: "500-900€ ida/vuelta",
    luggage: "1 maleta 23kg + 1 equipaje de mano 12kg",
    baggageUrl: "https://www.klm.es/en",
    bookUrl: "https://www.skyscanner.net/transporte/vuelos/mad/tyoa/",
  },
  {
    name: "Turkish Airlines",
    logo: "🔴",
    route: "Madrid → Estambul → Tokio",
    duration: "17-19h (1 escala)",
    price: "450-800€ ida/vuelta",
    luggage: "1 maleta 23kg + 1 equipaje de mano 8kg",
    baggageUrl: "https://www.turkishairlines.com",
    bookUrl: "https://www.skyscanner.net/transporte/vuelos/mad/tyoa/",
  },
  {
    name: "Qatar Airways",
    logo: "🟤",
    route: "Madrid → Doha → Tokio",
    duration: "18-20h (1 escala)",
    price: "500-900€ ida/vuelta",
    luggage: "1 maleta 23kg + 1 equipaje de mano 7kg",
    baggageUrl: "https://www.qatarairways.com",
    bookUrl: "https://www.skyscanner.net/transporte/vuelos/mad/tyoa/",
  },
];

const luggageLimits = [
  {
    airline: "Iberia",
    carryOn: "10kg (55x40x20cm)",
    checked1: "23kg",
    checked2: "23kg (clase turista Premium)",
    extraBag: "~60€ por maleta extra",
    sportsEquipment: "Gratuito si cabe en la cuota",
  },
  {
    airline: "Japan Airlines",
    carryOn: "10kg (55x40x20cm)",
    checked1: "23kg",
    checked2: "23kg",
    extraBag: "~70€ por maleta extra",
    sportsEquipment: "Gratuito con restricciones",
  },
  {
    airline: "ANA",
    carryOn: "10kg (55x40x20cm)",
    checked1: "23kg",
    checked2: "23kg",
    extraBag: "~75€ por maleta extra",
    sportsEquipment: "Gratuito (equipo deportivo)",
  },
  {
    airline: "Vueling/Ryanair",
    carryOn: "10kg (55x40x20cm)",
    checked1: "20kg (extra)",
    checked2: "N/A",
    extraBag: "~30-50€ por maleta",
    sportsEquipment: "No permitido o extra",
  },
];

const shippingOptions = [
  {
    name: "Yamato Transport (クロネコヤマト)",
    icon: "🐱",
    description: "El servicio de envío más popular de Japón. Envía cajas desde cualquier konbini o tienda Yamato.",
    price: "1,000-3,000 yenes por caja (dentro de Japón)",
    international: "Envío internacional disponible desde 5,000 yenes",
    website: "https://www.kuronekoyamato.co.jp",
    tips: [
      "Compra cajas de cartón en 100-yen shops (Daiso, Seria)",
      "Puedes enviar desde konbini (7-Eleven, FamilyMart)",
      "Servicio 'Takkyubin' para enviar entre hoteles",
      "Guarda los recibos para reclamar impuestos",
    ],
  },
  {
    name: "Sagawa Express",
    icon: "📦",
    description: "Alternativa a Yamato. Más barato para paquetes grandes.",
    price: "800-2,500 yenes por caja",
    international: "Envío internacional limitado",
    website: "https://www.sagawa-exp.co.jp",
    tips: [
      "Mejor para envíos grandes o pesados",
      "Pide en tu hotel que llamen a Sagawa",
      "Recogida gratuita en hostales",
    ],
  },
  {
    name: "Japan Post (EMS)",
    icon: "🏤",
    description: "El servicio postal japonés. Envía desde cualquier oficina de correos.",
    price: "2,000-8,000 yenes (según peso y destino)",
    international: "EMS internacional a 120+ países",
    website: "https://www.post.japanpost.jp/int/index.html",
    tips: [
      "EMS es rápido (3-5 días a Europa)",
      "SAL es barato pero lento (2-3 semanas)",
      "Envío de cajas grandes (hasta 30kg)",
      "Oficinas de correos en casi todas las estaciones",
    ],
  },
  {
    name: "DHL/FedEx/UPS",
    icon: "✈️",
    description: "Envío exprés internacional. Rápido pero caro.",
    price: "10,000-30,000 yenes (según peso)",
    international: "Mundial, 1-3 días",
    website: "https://www.dhl.com",
    tips: [
      "Usa solo para artículos caros o urgentes",
      "Piden declaración de aduanas",
      "Puede haber costes de importación en destino",
    ],
  },
];

const tipsForBuyingLuggage = [
  {
    title: "Comprar maletas en Japón",
    icon: "🛒",
    items: [
      {
        place: "Don Quijote (ドン・キホーテ)",
        desc: "Maletas desde 3,000 yenes. Calidad decente para viaje. Abierto 24h.",
        price: "3,000-15,000 yenes",
      },
      {
        place: "Uniqlo (ユニクロ)",
        desc: "Maletas de diseño limpio. Buenos precios en=temporada.",
        price: "5,000-20,000 yenes",
      },
      {
        place: "Yodobashi Camera",
        desc: "Maletas Samsonite, Delsey a precios duty-free.",
        price: "10,000-40,000 yenes",
      },
      {
        place: "Airport Limousine Bus Shop",
        desc: "Maletas en aeropuerto. Última oportunidad.",
        price: "8,000-30,000 yenes",
      },
    ],
  },
  {
    title: "Enviar cosas a casa",
    icon: "📮",
    items: [
      {
        place: "Yamato Transport",
        desc: "Envía desde konbini. Cajas de cartón en Daiso (100 yenes).",
        price: "1,000-3,000 yenes internas",
      },
      {
        place: "Japan Post EMS",
        desc: "Envío internacional rápido. 3-5 días a España.",
        price: "5,000-15,000 yenes",
      },
      {
        place: "Envío desde hotel",
        desc: "Muchos hoteles te ayudan a empaquetar y enviar.",
        price: "Gratis (servicio del hotel)",
      },
    ],
  },
];

const packingTips = [
  { tip: "Deja 5-8kg de espacio libre en la maleta para compras", icon: "📐" },
  { tip: "Compra una maleta plegable en Don Quijote para la vuelta", icon: "🎒" },
  { tip: "Usa bolsas de vacío para comprimir la ropa", icon: "🗜️" },
  { tip: "Envía cosas pesadas por Yamato (desde konbini)", icon: "📦" },
  { tip: "Las konbini tienen cajas de cartón gratis o baratas", icon: "🏪" },
  { tip: "Pide en el hotel que te guarden cajas vacías", icon: "🏨" },
  { tip: "Los 100-yen shops venden bolsas y cajas de envío", icon: "💴" },
  { tip: "Si compras mucho, envía por DHL/EMS directo al aeropuerto", icon: "✈️" },
];

export default function FlightsPage() {
  const [activeTab, setActiveTab] = useState<"flights" | "luggage" | "shipping" | "tips">("flights");
  const [departureCity, setDepartureCity] = useState("mad");
  const [detecting, setDetecting] = useState(true);
  const [citySearch, setCitySearch] = useState("");
  const [customIata, setCustomIata] = useState("");

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(5000) });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const airport = countryToAirport[data.country_code];
        if (airport) {
          setDepartureCity(airport.code);
          return;
        }
      } catch {}

      try {
        const res = await fetch("https://ip-api.com/json/", { signal: AbortSignal.timeout(5000) });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const airport = countryToAirport[data.countryCode];
        if (airport) {
          setDepartureCity(airport.code);
        }
      } catch {}
    };

    detectLocation().finally(() => setDetecting(false));
  }, []);

  const filteredAirports = useMemo(() => {
    if (!citySearch.trim()) return fallbackAirports;
    const q = citySearch.toLowerCase();
    return fallbackAirports.filter(
      (c) => c.label.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [citySearch]);

  const selectedCityLabel = fallbackAirports.find(c => c.code === departureCity)?.label || customIata || "tu ciudad";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ✈️ Vuelos, Equipaje y Envíos
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Todo lo que necesitas saber para llegar a Japón, cuánto equipaje traer
          y cómo traer tus compras a casa.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          { id: "flights" as const, label: "✈️ Vuelos", },
          { id: "luggage" as const, label: "🧳 Equipaje", },
          { id: "shipping" as const, label: "📮 Envíos", },
          { id: "tips" as const, label: "💡 Consejos", },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === tab.id
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Flights Tab */}
      {activeTab === "flights" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vuelos desde {selectedCityLabel} a Japón</h2>

          {/* Departure city selector */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-2">
              {detecting ? "🔍 Detectando tu ubicación..." : "¿Desde dónde vuelas?"}
            </p>
            <div className="mb-3">
              <input
                type="text"
                placeholder="🔍 Busca tu ciudad o escribe el código IATA (ej: MIA, BOG, SCL)..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            {citySearch && filteredAirports.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 max-h-40 overflow-y-auto">
                {filteredAirports.slice(0, 12).map((city) => (
                  <button
                    key={`${city.code}-${city.label}`}
                    onClick={() => { setDepartureCity(city.code); setCustomIata(""); setCitySearch(""); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      departureCity === city.code
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {city.emoji} {city.label} ({city.code.toUpperCase()})
                  </button>
                ))}
              </div>
            )}
            {citySearch && filteredAirports.length === 0 && (
              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-2">No encontré "{citySearch}" en la lista. Puedes escribir el código IATA directamente:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código IATA (ej: MIA)"
                    maxLength={3}
                    value={customIata}
                    onChange={(e) => setCustomIata(e.target.value.toUpperCase())}
                    className="w-32 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm uppercase"
                  />
                  <button
                    onClick={() => { if (customIata.length === 3) setDepartureCity(customIata.toLowerCase()); }}
                    disabled={customIata.length !== 3}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Usar {customIata || "___"}
                  </button>
                </div>
              </div>
            )}
            {!citySearch && (
              <div className="flex flex-wrap gap-2">
                {fallbackAirports.filter(c => ["mad","bcn","agp","svq","vlc","jfk","mia","mex","bog","lim","gru","lhr","cdg","scl"].includes(c.code)).map((city) => (
                  <button
                    key={`${city.code}-${city.label}`}
                    onClick={() => { setDepartureCity(city.code); setCustomIata(""); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      departureCity === city.code
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {city.emoji} {city.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search CTA */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">🔍 Busca el mejor precio</h3>
            <p className="mb-4 opacity-90">Compara precios en Skyscanner y encuentra los vuelos más baratos</p>
            <a
              href={`https://www.skyscanner.net/transporte/vuelos/${departureCity}/tyoa/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition"
            >
              Buscar vuelos en Skyscanner →
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airlines.map((airline) => (
              <div
                key={airline.name}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{airline.logo}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{airline.name}</h3>
                    <p className="text-sm text-gray-500">{selectedCityLabel} → Tokio</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duración:</span>
                    <span className="font-medium">{airline.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Precio:</span>
                    <span className="font-bold text-green-600">{airline.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Equipaje:</span>
                    <span className="text-xs">{airline.luggage}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <a
                    href={`https://www.skyscanner.net/transporte/vuelos/${departureCity}/tyoa/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Ver vuelos
                  </a>
                  <a
                    href={airline.baggageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm font-medium px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    Equipaje
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="font-bold text-gray-900 mb-3">💡 Consejos para encontrar vuelos baratos</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Reserva con 2-3 meses de antelación</strong> para mejores precios</li>
              <li>• <strong>Usa Skyscanner con alertas de precio</strong> para detectar ofertas</li>
              <li>• <strong>Volando entre semana</strong> (martes/jueves) suele ser más barato</li>
              <li>• <strong>Temporada baja</strong>: Enero-Marzo y Septiembre-Noviembre</li>
              <li>• <strong>Temporada alta</strong>: Abril (sakura), Julio-Agosto, Diciembre</li>
              <li>• <strong>Haneda es mejor que Narita</strong>: más céntrico, 20 min al centro</li>
              <li>• <strong>Las aerolíneas low-cost</strong> (Peach, Jetstar) vuelan entre ciudades japonesas</li>
            </ul>
          </div>
        </div>
      )}

      {/* Luggage Tab */}
      {activeTab === "luggage" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Límites de Equipaje por Aerolínea</h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aerolínea</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Mano</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">1ª Maleta</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">2ª Maleta</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Extra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {luggageLimits.map((item) => (
                  <tr key={item.airline} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.airline}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.carryOn}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.checked1}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.checked2}</td>
                    <td className="px-4 py-3 text-sm text-red-600">{item.extraBag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Packing recommendations */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">📐 ¿Cuánto espacio necesitas?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">5-7 días</div>
                <div className="text-sm text-gray-600">1 maleta 23kg</div>
                <div className="text-xs text-gray-400">Ropa ligera, lavar en konbini</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">10-14 días</div>
                <div className="text-sm text-gray-600">1 maleta 23kg + 1 carry-on</div>
                <div className="text-xs text-gray-400">Espacio para compras</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">2-3 semanas</div>
                <div className="text-sm text-gray-600">2 maletas 23kg</div>
                <div className="text-xs text-gray-400">Para compradores serios</div>
              </div>
            </div>
          </div>

          {/* What to pack */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-bold text-gray-900 mb-4">✅ Lista rápida de equipaje</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Imprescindible</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Pasaporte (mínimo 6 meses validez)</li>
                  <li>• Seguro de viaje</li>
                  <li>• Adaptador de corriente (Japón usa tipo A/B)</li>
                  <li>• Ropa por capas (clima cambia rápido)</li>
                  <li>• Zapatos cómodos (caminarás mucho)</li>
                  <li>• Traje de baño (onsen)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Útil pero compra allí</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Toallitas húmedas (en konbini)</li>
                  <li>• Paraguas (en konbini, 500 yenes)</li>
                  <li>• Mascarillas (en konbini)</li>
                  <li>• Bolsas de vacío (en Daiso, 100 yenes)</li>
                  <li>• Power bank (en Bic Camera)</li>
                  <li>• Bolsa impermeable (en Uniqlo)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Tab */}
      {activeTab === "shipping" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Enviar Compras a Casa</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {shippingOptions.map((option) => (
              <div
                key={option.name}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{option.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{option.name}</h3>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Precio Japón:</span>
                    <span className="font-medium">{option.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Internacional:</span>
                    <span className="font-medium text-blue-600">{option.international}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">CONSEJOS:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {option.tips.map((tip, i) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={option.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm font-medium px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Visitar web →
                </a>
              </div>
            ))}
          </div>

          {/* Where to buy luggage in Japan */}
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-bold text-gray-900 mb-4">🛒 ¿Dónde comprar maletas en Japón?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {tipsForBuyingLuggage[0].items.map((item) => (
                <div key={item.place} className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{item.place}</h4>
                  <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                  <span className="text-sm font-bold text-green-600">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tips Tab */}
      {activeTab === "tips" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Consejos de Equipaje</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {packingTips.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start gap-3"
              >
                <span className="text-2xl mt-1">{item.icon}</span>
                <p className="text-sm text-gray-700">{item.tip}</p>
              </div>
            ))}
          </div>

          {/* Laundromat info */}
          <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="font-bold text-gray-900 mb-4">🧺 Lavanderías en Japón (no traigas mucha ropa)</h3>
            <p className="text-sm text-gray-600 mb-4">
              Japón tiene lavanderías (コイン laundry) en cada barrio. Puedes lavar y secar por 300-500 yenes.
              No necesitas traer mucha ropa.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🫧</div>
                <div className="font-medium">Lavado</div>
                <div className="text-gray-500">200-300 yenes</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🔥</div>
                <div className="font-medium">Lavado + Secado</div>
                <div className="text-gray-500">300-500 yenes</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="font-medium">Duración total</div>
                <div className="text-gray-500">~1 hora</div>
              </div>
            </div>
          </div>

          {/* Affiliate services */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
            <h3 className="font-bold text-gray-900 mb-4">📱 Prepara tu viaje</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://www.japan-wireless.com/esim?via=antonio" target="_blank" rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-green-600 transition">eSIM Japan Wireless</div>
                    <div className="text-sm text-gray-600">Datos ilimitados. Sin cambiar de SIM. ~15-20€/mes.</div>
                  </div>
                </div>
              </a>
              <a href="https://www.japan-bullettrain.com/?via=antonio-perez-cortes" target="_blank" rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚄</span>
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-green-600 transition">JR Pass / Bullet Train</div>
                    <div className="text-sm text-gray-600">Billetes de Shinkansen al mejor precio.</div>
                  </div>
                </div>
              </a>
              <a href="https://www.airport-taxi.tokyo/en?via=antonio" target="_blank" rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚕</span>
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-green-600 transition">Airport Taxi Tokyo</div>
                    <div className="text-sm text-gray-600">Taxi privado del aeropuerto al hotel.</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
