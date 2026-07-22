"use client";

import { useState } from "react";

const GURUWALK_BASE = "https://www.guruwalk.com";
const VIATOR_BASE = "https://www.viator.com";

interface FreeTour {
  city: string;
  cityJp: string;
  title: string;
  description: string;
  duration: string;
  rating: number;
  reviews: number;
  language: string;
  guruwalkUrl: string;
  viatorUrl: string;
  highlights: string[];
  bestTime: string;
  tips: string[];
}

const FREE_TOURS: FreeTour[] = [
  {
    city: "Tokyo",
    cityJp: "東京",
    title: "Tokyo Walking Tour — Shibuya, Harajuku & Meiji Shrine",
    description: "Recorre los barrios más icónicos de Tokyo con un guía local. Desde el cruce de Shibuya hasta el santuario Meiji, pasando por Harajuku.",
    duration: "3 horas",
    rating: 4.8,
    reviews: 2340,
    language: "Inglés / Español",
    guruwalkUrl: `${GURUWALK_BASE}/tokyo`,
    viatorUrl: `${VIATOR_BASE}/searchResults/all?text=tokyo+free+walking+tour`,
    highlights: ["Cruce de Shibuya", "Santuario Meiji", " Takeshita Street", "Centro de Shibuya"],
    bestTime: "Mañana (9-12) para evitar multitudes",
    tips: [
      "Llega 10 minutos antes del punto de encuentro",
      "La propina sugerida es 10-20€ por persona",
      "Lleva calzado cómodo (caminarás 5-6 km)",
      "Los guías locales conocen secretos que no encontrarás en guías"
    ],
  },
  {
    city: "Tokyo",
    cityJp: "東京",
    title: "Asakusa & Senso-ji Temple — Tour Histórico",
    description: "Descubre el Tokyo tradicional: el templo más antiguo de la ciudad, los comercios de Nakamise, y los callejones de Asakusa.",
    duration: "2.5 horas",
    rating: 4.7,
    reviews: 1890,
    language: "Inglés",
    guruwalkUrl: `${GURUWALK_BASE}/tokyo`,
    viatorUrl: `${VIATOR_BASE}/searchResults/all?text=asakusa+sensoji+tour`,
    highlights: ["Templo Sensō-ji", "Calle Nakamise", "Puerta Kaminarimon", "Barrio de Asakusa"],
    bestTime: "Temprano (8-10) para fotos sin turistas",
    tips: [
      "El templo abre a las 6am, antes de los tours",
      "Los stickers de los machines de Asakusa son geniales",
      "Prueba el age-manju (bollo frito) en Nakamise",
      "Puedes escribir tu deseo en un ema (tablilla)"
    ],
  },
  {
    city: "Kioto",
    cityJp: "京都",
    title: "Kyoto Traditional Walk — Temples & Geisha District",
    description: "Kioto es el Japón tradicional. Templos zen, el barrio de Gion, y la historia de los geishas. Un viaje al Japón antiguo.",
    duration: "3.5 horas",
    rating: 4.9,
    reviews: 1560,
    language: "Inglés / Español",
    guruwalkUrl: `${GURUWALK_BASE}/kyoto`,
    viatorUrl: `${VIATOR_BASE}/searchResults/all?text=kyoto+walking+tour`,
    highlights: ["Barrio de Gion", "Templo Kiyomizu-dera", "Calle Ninenzaka", "Callejones de geishas"],
    bestTime: "Tarde (15-18) para ver geishas en Gion",
    tips: [
      "Gion es mejor al atardecer cuando las geishas van a sus citas",
      "No persigas a las geishas, es considerado maleducado",
      "El té matcha en Ninenzaka es obligatorio",
      "Los templos cierran a las 17:00"
    ],
  },
  {
    city: "Kioto",
    cityJp: "京都",
    title: "Arashiyama Bamboo Grove & Monkey Park",
    description: "El bosque de bambú más famoso del mundo. Los monos del parque y los templos de Arashiyama. Perfecto para medio día.",
    duration: "4 horas",
    rating: 4.6,
    reviews: 980,
    language: "Inglés",
    guruwalkUrl: `${GURUWALK_BASE}/kyoto`,
    viatorUrl: `${VIATOR_BASE}/searchResults/all?text=arashiyama+bamboo+tour`,
    highlights: ["Bosque de bambú", "Monkey Park Iwatayama", "Templo Tenryu-ji", "Puente Togetsukyo"],
    bestTime: "Mañana temprano (7-9) para evitar colas",
    tips: [
      "El bosque de bambú a las 7am está vacío y mágico",
      "El Monkey Park cuesta 550¥ pero vale la pena",
      "El tren de Arashiyama es una experiencia en sí mismo",
      "Hay un jardín secreto detrás del Tenryu-ji"
    ],
  },
  {
    city: "Osaka",
    cityJp: "大阪",
    title: "Osaka Street Food Tour — Dotonbori & Shinsekai",
    description: "Osaka es la capital de la comida callejera de Japón. Takoyaki, okonomiyaki, y los sabores más auténticos de la ciudad.",
    duration: "3 horas",
    rating: 4.8,
    reviews: 2100,
    language: "Inglés / Español",
    guruwalkUrl: `${GURUWALK_BASE}/osaka`,
    viatorUrl: `${VIATOR_BASE}/searchResults/all?text=osaka+street+food+tour`,
    highlights: ["Dotonbori", "Shinsekai", "Takoyaki", "Okonomiyaki"],
    bestTime: "Noche (18-21) cuando Dotonbori brilla",
    tips: [
      "El takoyaki de Wanaka es el mejor (fila, pero vale)",
      "Shinsekai es más auténtico que Dotonbori",
      "El kushikatsu (palito frito) no se dobla en la salsa",
      "Los viernes hay más ambiente"
    ],
  },
  {
    city: "Hiroshima",
    cityJp: "広島",
    title: "Hiroshima Peace Memorial Tour",
    description: "Un tour emotivo por la historia de Hiroshima. El Parque de la Paz, el Museo, y la isla de Miyajima. Historia y esperanza.",
    duration: "5 horas",
    rating: 4.9,
    reviews: 870,
    language: "Inglés",
    guruwalkUrl: `${GURUWALK_BASE}/hiroshima`,
    viatorUrl: `${VIATOR_BASE}/searchResults/all?text=hiroshima+peace+memorial+tour`,
    highlights: ["Parque de la Paz", "Cúpula de la Bomba", "Museo", "Isla de Miyajima"],
    bestTime: "Mañana para todo el día",
    tips: [
      "El Museo de la Paz es imprescindible (2 horas mínimo)",
      "La isla de Miyajima merece medio día",
      "El cerdo de Hiroshima (momiji manju) es típico",
      "Los ciervos de Miyajima son amigables pero no los alimentes con comida humana"
    ],
  },
  {
    city: "Nara",
    cityJp: "奈良",
    title: "Nara Park — Temples & Sacred Deer",
    description: "El parque donde los ciervos son sagrados y caminan libres. Los templos más antiguos de Japón. Un día mágico.",
    duration: "3 horas",
    rating: 4.7,
    reviews: 1200,
    language: "Inglés",
    guruwalkUrl: `${GURUWALK_BASE}/nara`,
    viatorUrl: `${VIATOR_BASE}/searchResults/all?text=nara+park+tour`,
    highlights: ["Parque de Nara", "Todai-ji", "Ciervos sagrados", "Kasuga Taisha"],
    bestTime: "Mañana (9-12) para ver a los ciervos activos",
    tips: [
      "Compra shika-senbei (galletas para ciervos) por 200¥",
      "Los ciervos hacen reverencia cuando les das galletas",
      "El Todai-ji alberga el Buda más grande de madera del mundo",
      "Los ciervos pueden morder si no les das comida rápido"
    ],
  },
  {
    city: "Fukuoka",
    cityJp: "福岡",
    title: "Fukuoka Food & Culture Walk — Yatai & Hakata",
    description: "Fukuoka tiene los mejores yatai (puestos de comida callejera) de Japón. Ramen de cerdo, y la cultura de Kyushu.",
    duration: "3 horas",
    rating: 4.6,
    reviews: 650,
    language: "Inglés",
    guruwalkUrl: `${GURUWALK_BASE}/fukuoka`,
    viatorUrl: `${VIATOR_BASE}/searchResults/all?text=fukuoka+food+tour`,
    highlights: ["Yatai (puestos nocturnos)", "Ramen de Hakata", "Templo Tochoji", "Zona Tenjin"],
    bestTime: "Noche (19-22) cuando los yatai abren",
    tips: [
      "Los yatai solo abren de noche, en la orilla del río",
      "El ramen de Hakata se pide 'kaedama' (fideos extra) gratis",
      "Fukuoka es más relajada que Tokyo o Osaka",
      "El mercader de Nakasu tiene los mejores yatai"
    ],
  },
];

const cityColors: Record<string, string> = {
  Tokyo: "from-blue-400 to-blue-600",
  Kioto: "from-red-400 to-pink-500",
  Osaka: "from-orange-400 to-amber-500",
  Hiroshima: "from-green-400 to-emerald-500",
  Nara: "from-yellow-400 to-amber-500",
  Fukuoka: "from-purple-400 to-violet-500",
};

export default function FreeToursPage() {
  const [selectedCity, setSelectedCity] = useState("all");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const cities = [...new Set(FREE_TOURS.map((t) => t.city))];
  const filtered = selectedCity === "all" ? FREE_TOURS : FREE_TOURS.filter((t) => t.city === selectedCity);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🆓 Free Tours en Japón</h1>
        <p className="text-gray-600 max-w-2xl">
          Tours gratuitos con guías locales. No pagas nada por el tour — la propina es voluntaria (10-20€ recomendado). La mejor forma de conocer Japón con presupuesto.
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 mb-8 border border-green-100">
        <div className="flex items-start gap-3">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="font-bold text-green-900 mb-1">¿Cómo funcionan los free tours?</h3>
            <p className="text-sm text-green-800">
              El tour es <strong>gratuito</strong>. Al final, das la propina que consideres al guía (normalmente 10-20€). Si el tour no te gustó, no pagas. Es el modelo más justo para viajeros y guías.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setSelectedCity("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCity === "all" ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"}`}>
          Todos ({FREE_TOURS.length})
        </button>
        {cities.map((city) => (
          <button key={city} onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCity === city ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"}`}>
            {city}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((tour, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="p-5 cursor-pointer" onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cityColors[tour.city] || "from-gray-400 to-gray-500"} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
                  {tour.city[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 truncate">{tour.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
                    <span>📍 {tour.city} ({tour.cityJp})</span>
                    <span>⏱️ {tour.duration}</span>
                    <span>🌍 {tour.language}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">{'⭐'.repeat(Math.floor(tour.rating))}</span>
                    <span className="text-sm font-medium text-gray-700">{tour.rating}</span>
                    <span className="text-sm text-gray-400">({tour.reviews} reviews)</span>
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">GRATIS</span>
                  </div>
                </div>
                <span className="text-gray-300 text-xl transition-transform flex-shrink-0" style={{ transform: expandedIdx === idx ? "rotate(180deg)" : "" }}>▾</span>
              </div>
            </div>

            {expandedIdx === idx && (
              <div className="px-5 pb-5 border-t border-gray-50">
                <p className="text-sm text-gray-600 mt-4 mb-4">{tour.description}</p>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">✨ Highlights:</div>
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.map((h, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{h}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 bg-amber-50 rounded-lg p-3 border border-amber-100">
                  <div className="text-xs font-bold text-amber-700 mb-1">⏰ Mejor hora: {tour.bestTime}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">💡 Consejos:</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {tour.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={tour.guruwalkUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition text-center">
                    🚶 Reservar en GuruWalk
                  </a>
                  <a href={tour.viatorUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition text-center">
                    🎫 Ver en Viator
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <h3 className="font-bold text-purple-900 mb-3">🎌 Tips para free tours en Japón</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-purple-800">
          <div>💰 <strong>Propina:</strong> 10-20€ es lo estándar en Europa/Asia</div>
          <div>📱 <strong>Reserva online:</strong> Asegura tu plaza (son limitadas)</div>
          <div>👟 <strong>Calzado cómodo:</strong> Caminarás 5-6 km</div>
          <div>📷 <strong>Fotos:</strong> Pregunta al guía los mejores spots</div>
          <div>🗣️ <strong>Idioma:</strong> La mayoría son en inglés, algunos en español</div>
          <div>⏰ <strong>Puntualidad:</strong> Los japoneses valoran llegar 5 min antes</div>
        </div>
      </div>
    </div>
  );
}
