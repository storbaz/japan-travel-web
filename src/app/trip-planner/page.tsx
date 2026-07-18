"use client";

import { useState } from "react";

interface DayPlan {
  day: number;
  city: string;
  activities: string[];
  food: string;
  tip: string;
}

const interests = [
  { id: "food", label: "🍣 Comida", icon: "🍜" },
  { id: "culture", label: "⛩️ Cultura", icon: "🏯" },
  { id: "nature", label: "🌿 Naturaleza", icon: "🗻" },
  { id: "shopping", label: "🛍️ Compras", icon: "💳" },
  { id: "anime", label: "🎮 Anime/Otaku", icon: "🎌" },
  { id: "history", label: "📜 Historia", icon: "⚔️" },
  { id: "relax", label: "♨️ Relax/Onsen", icon: "💆" },
  { id: "nightlife", label: "🌃 Vida nocturna", icon: "🍸" },
];

const budgetLevels = [
  { id: "budget", label: "Low Budget", desc: "<10,000€/persona", icon: "💰" },
  { id: "mid", label: "Medio", desc: "10,000-15,000€/persona", icon: "💎" },
  { id: "high", label: "Premium", desc: "15,000€+/persona", icon: "👑" },
];

const itineraries: Record<string, Record<string, DayPlan[]>> = {
  "5-7": {
    default: [
      {
        day: 1,
        city: "Tokio",
        activities: ["Llegada, check-in", "Shibuya Crossing", "Shibuya Sky (vistas)", "Cena en Izakaya"],
        food: "Ramen en Ichiran o Fuunji",
        tip: "Compra un Suica/Pasmo para transportes",
      },
      {
        day: 2,
        city: "Tokio",
        activities: ["Tsukiji Outer Market (desayuno)", "Senso-ji (Asakusa)", "Tokyo Skytree", "Akihabara (tarde)"],
        food: "Sushi en Tsukiji, takoyaki",
        tip: "Los templos cierran temprano (~17:00)",
      },
      {
        day: 3,
        city: "Tokio",
        activities: ["Harajuku (Takeshita St)", "Meiji Shrine", "Omotesando", "Shinjuku Golden Gai (noche)"],
        food: "Curry japonés o tonkatsu",
        tip: "Golden Gai: bares tiny, reserva o ve temprano",
      },
      {
        day: 4,
        city: "Tokio → Hakone",
        activities: ["Tren a Hakone (1.5h)", "Lake Ashi cruise", "Hakone Open Air Museum", "Onsen con vista al Fuji"],
        food: "Onsen tamago (huevo cocido en aguas termales)",
        tip: "Compra Hakone Free Pass (infinite transport)",
      },
      {
        day: 5,
        city: "Hakone → Kioto",
        activities: ["Shinkansen a Kioto (2h)", "Fushimi Inari (torii naranjas)", "Gion (barrio geisha)", "Pontocho (cena)"],
        food: "Yudofu (tofu caliente) o kaiseki",
        tip: "Fushimi Inari: ve a las 6am para evitar multitudes",
      },
      {
        day: 6,
        city: "Kioto",
        activities: ["Arashiyama Bamboo Grove", "Monkey Park", "Kinkaku-ji (Pabellón Dorado)", "Nishiki Market"],
        food: "Matcha y dulces en Arashiyama",
        tip: "Arashiyama: ve temprano, a las 7-8am",
      },
      {
        day: 7,
        city: "Kioto → Osaka → vuelta",
        activities: ["Tren a Osaka (30min)", "Osaka Castle", "Dotonbori (street food)", "Vuelta al aeropuerto"],
        food: "Takoyaki, okonomiyaki en Dotonbori",
        tip: "Dotonbori de noche es espectacular",
      },
    ],
  },
  "10-14": {
    default: [
      {
        day: 1,
        city: "Tokio",
        activities: ["Llegada", "Shibuya Crossing", "Cena en izakaya"],
        food: "Ramen de noche",
        tip: "Activa el roaming o compra SIM en aeropuerto",
      },
      {
        day: 2,
        city: "Tokio",
        activities: ["Tsukiji Market", "Senso-ji", "Akihabara", "Tokyo Skytree"],
        food: "Sushi temprano en Tsukiji",
        tip: "Akihabara: presupuesto 2-3h mínimo",
      },
      {
        day: 3,
        city: "Tokio",
        activities: ["TeamLab Borderless", "Odaiba", "Gundam statue", "Shopping en Aqua City"],
        food: "Cena con vista al Rainbow Bridge",
        tip: "TeamLab: reserva online con antelación",
      },
      {
        day: 4,
        city: "Tokio",
        activities: ["Harajuku", "Meiji Shrine", "Omotesando", "Shinjuku Golden Gai"],
        food: "Maid café o themed café",
        tip: "Golden Gai: 500-1000 yenes entrada por bar",
      },
      {
        day: 5,
        city: "Tokio → Nikko",
        activities: ["Tren a Nikko (2h)", "Toshogu Shrine", "Shinkyo Bridge", "Lago Chuzenji"],
        food: "Yuba ( piel de tofu, especialidad de Nikko)",
        tip: "Nikko: combine bien con Nature Pass",
      },
      {
        day: 6,
        city: "Tokio → Hakone",
        activities: ["Hakone Free Pass", "Pirate ship", "Open Air Museum", "Onsen"],
        food: "Hoto noodles (especialidad)",
        tip: "Onsen: sin tatuajes visibles (regla tradicional)",
      },
      {
        day: 7,
        city: "Hakone → Kioto",
        activities: ["Shinkansen a Kioto", "Fushimi Inari", "Gion evening walk"],
        food: "Kaiseki (cena tradicional)",
        tip: "Fushimi Inari: gratis, abierto 24h",
      },
      {
        day: 8,
        city: "Kioto",
        activities: ["Arashiyama Bamboo", "Monkey Park", "Kinkaku-ji", "Nishiki Market"],
        food: "Matcha everything",
        tip: "Arashiyama: alquiler de bici recomendado",
      },
      {
        day: 9,
        city: "Kioto → Nara",
        activities: ["Tren a Nara (45min)", "Todai-ji (Buda gigante)", "Nara Park (ciervos)", "Kasuga Taisha"],
        food: "Kakinoha sushi (envuelto en hoja)",
        tip: "Los ciervos muerden: compra galletas con cuidado",
      },
      {
        day: 10,
        city: "Kioto → Hiroshima",
        activities: ["Shinkansen a Hiroshima (1.5h)", "Peace Memorial Park", "Museo de la Paz", "Okonomiyaki"],
        food: "Okonomiyaki estilo Hiroshima",
        tip: "Hiroshima: museo muy emotivo, reserve 2-3h",
      },
      {
        day: 11,
        city: "Hiroshima → Miyajima → Osaka",
        activities: ["Ferry a Miyajima (1h)", "Itsukushima Shrine (torii flotante)", "Momiji manju", "Tren a Osaka"],
        food: "Ostiones gigantes a la parrilla",
        tip: "Miyajima: ver torii con marea alta Y baja",
      },
      {
        day: 12,
        city: "Osaka",
        activities: ["Osaka Castle", "Dotonbori", "Shinsekai", "Tsutenkaku Tower"],
        food: "Takoyaki, kushikatsu, okonomiyaki",
        tip: "Osaka: la ciudad de la comida de Japón",
      },
      {
        day: 13,
        city: "Osaka",
        activities: ["Universal Studios Japan (todo el día)", "Super Nintendo World", "Harry Potter World"],
        food: "Comida temática del parque",
        tip: "USJ: compra Express Pass para evitar colas",
      },
      {
        day: 14,
        city: "Osaka → Vuelta",
        activities: ["Últimas compras", "Envío de equipaje (Yamato)", "Vuelta al aeropuerto"],
        food: "Último konbini breakfast",
        tip: "Kansai Airport: hay cajas de cartón en la terminal",
      },
    ],
  },
  "15+": {
    default: [
      {
        day: 1,
        city: "Tokio",
        activities: ["Llegada", "Shibuya", "Cena izakaya"],
        food: "Ramen",
        tip: "Activa roaming o compra SIM",
      },
      {
        day: 2,
        city: "Tokio",
        activities: ["Tsukiji", "Senso-ji", "Akihabara"],
        food: "Sushi",
        tip: "Akihabara: 2-3h mínimo",
      },
      {
        day: 3,
        city: "Tokio",
        activities: ["TeamLab", "Odaiba", "Gundam"],
        food: "Cena con vistas",
        tip: "TeamLab: reserva online",
      },
      {
        day: 4,
        city: "Tokio",
        activities: ["Harajuku", "Meiji Shrine", "Shinjuku"],
        food: "Maid café",
        tip: "Golden Gai: ve temprano",
      },
      {
        day: 5,
        city: "Nikko",
        activities: ["Toshogu Shrine", "Lago Chuzenji", "Cascadas"],
        food: "Yuba",
        tip: "Nature Pass recomendado",
      },
      {
        day: 6,
        city: "Hakone",
        activities: ["Pirate ship", "Open Air Museum", "Onsen"],
        food: "Hoto noodles",
        tip: "Onsen sin tatuajes visibles",
      },
      {
        day: 7,
        city: "Kioto",
        activities: ["Shinkansen", "Fushimi Inari", "Gion"],
        food: "Kaiseki",
        tip: "Fushimi Inari: gratis 24h",
      },
      {
        day: 8,
        city: "Kioto",
        activities: ["Arashiyama", "Kinkaku-ji", "Nishiki"],
        food: "Matcha",
        tip: "Alquila bici en Arashiyama",
      },
      {
        day: 9,
        city: "Nara",
        activities: ["Todai-ji", "Nara Park", "Ciervos"],
        food: "Kakinoha sushi",
        tip: "Galletas para ciervos: 200 yenes",
      },
      {
        day: 10,
        city: "Hiroshima",
        activities: ["Peace Park", "Museo de la Paz"],
        food: "Okonomiyaki",
        tip: "Museo: reserve 2-3h",
      },
      {
        day: 11,
        city: "Miyajima",
        activities: ["Itsukushima Shrine", "Torii flotante"],
        food: "Ostiones",
        tip: "Ver torii con marea alta y baja",
      },
      {
        day: 12,
        city: "Osaka",
        activities: ["Osaka Castle", "Dotonbori", "Shinsekai"],
        food: "Takoyaki, kushikatsu",
        tip: "Osaka = comida",
      },
      {
        day: 13,
        city: "Osaka → Kumano",
        activities: ["Tren a Kumano", "Kumano Kodo pilgrimage", "Onsen rural"],
        food: "Basashi (caballo crudo)",
        tip: "Kumano Kodo: senderismo sagrado",
      },
      {
        day: 14,
        city: "Kumano → Nagoya",
        activities: ["Tren a Nagoya", "Atsuta Shrine", "Osu Shopping"],
        food: "Hitsumabushi (anguila)",
        tip: "Nagoya: ciudad subestimada",
      },
      {
        day: 15,
        city: "Nagoya → Kanazawa",
        activities: ["Tren a Kanazawa (2h)", "Kenroku-en Garden", "Higashi Chaya"],
        food: "Kaisendon (arroz con marisco)",
        tip: "Kanazawa: el Kioto del norte, menos turistas",
      },
      {
        day: 16,
        city: "Kanazawa → Tokio",
        activities: ["Tren de vuelta", "Últimas compras en Ginza", "Cena de despedida"],
        food: "Wagyu o sushi premium",
        tip: "Ginza: tiendas duty-free",
      },
    ],
  },
};

function getItinerary(days: number, selectedInterests: string[]): DayPlan[] {
  let key = "5-7";
  if (days >= 15) key = "15+";
  else if (days >= 10) key = "10-14";

  const base = itineraries[key]?.default || itineraries["5-7"].default;

  // Filter or reorder based on interests
  if (selectedInterests.includes("food")) {
    // Prioritize food-related cities
    return base;
  }
  if (selectedInterests.includes("anime")) {
    // Add more Akihabara time
    return base.map((day) => {
      if (day.city.includes("Tokio") && day.activities.some((a) => a.includes("Akihabara"))) {
        return { ...day, tip: "Akihabara: dedica toda la tarde, hay tiendas escondidas" };
      }
      return day;
    });
  }
  if (selectedInterests.includes("nature")) {
    // Suggest more nature spots
    return base.map((day) => {
      if (day.city.includes("Nikko") || day.city.includes("Hakone")) {
        return { ...day, tip: day.tip + " ¡No te pierdas los senderos!" };
      }
      return day;
    });
  }

  return base;
}

export default function TripPlannerPage() {
  const [days, setDays] = useState(7);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState("mid");
  const [showPlan, setShowPlan] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const itinerary = showPlan ? getItinerary(days, selectedInterests) : [];

  const totalBudget = budget === "budget" ? days * 800 : budget === "mid" ? days * 1200 : days * 2000;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🗾 Organiza tu Viaje
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Selecciona tus días, intereses y presupuesto. Te damos un itinerario
          personalizado para aprovechar al máximo tu viaje.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
        {/* Days selector */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📅 ¿Cuántos días viajas?</h2>
          <div className="flex flex-wrap gap-3">
            {[5, 7, 10, 14, 15, 21].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  days === d
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {d} días
              </button>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-500">
            O usa el slider:{" "}
            <input
              type="range"
              min="3"
              max="30"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-48 ml-2"
            />
            <span className="ml-2 font-medium text-gray-700">{days} días</span>
          </div>
        </div>

        {/* Interests */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🎯 ¿Qué te interesa?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedInterests.includes(interest.id)
                    ? "bg-red-50 border-2 border-red-500 text-red-700"
                    : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                }`}
              >
                <div className="text-2xl mb-1">{interest.icon}</div>
                <div className="text-sm font-medium">{interest.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">💰 Presupuesto por persona</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {budgetLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setBudget(level.id)}
                className={`p-4 rounded-xl text-left transition-all ${
                  budget === level.id
                    ? "bg-green-50 border-2 border-green-500"
                    : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                }`}
              >
                <div className="text-2xl mb-1">{level.icon}</div>
                <div className="font-bold">{level.label}</div>
                <div className="text-sm text-gray-500">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={() => setShowPlan(true)}
          className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition"
        >
          Generar Itinerario →
        </button>
      </div>

      {/* Itinerary */}
      {showPlan && (
        <div>
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 mb-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">
              Tu itinerario de {days} días en Japón
            </h2>
            <p className="opacity-90">
              Presupuesto estimado: ~{totalBudget.toLocaleString()}€ por persona (vuelos incluidos)
            </p>
          </div>

          <div className="space-y-6">
            {itinerary.map((day) => (
              <div
                key={day.day}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{day.city}</h3>
                    <p className="text-sm text-gray-500">Día {day.day} de {days}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">📍 Actividades</h4>
                    <ul className="space-y-1">
                      {day.activities.map((activity, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          {activity}
                        </li>
                      ))}
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

          {/* Summary */}
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
                <div className="text-sm text-gray-500">Estimado por persona</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-1">🚄</div>
                <div className="font-bold">JR Pass 7/14d</div>
                <div className="text-sm text-gray-500">
                  {days <= 7 ? "~230€" : days <= 14 ? "~370€" : "Sin pass"}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a
              href="https://japan-travel-web-lime.vercel.app/flights"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition mr-4"
            >
              ✈️ Ver vuelos
            </a>
            <a
              href="https://japan-travel-web-lime.vercel.app/budget"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition"
            >
              💰 Calcular presupuesto
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
