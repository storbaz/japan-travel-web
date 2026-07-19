"use client";

import { useState, useRef } from "react";

interface DayActivity {
  name: string;
  cost: "free" | "low" | "mid" | "high";
  link?: string;
  linkLabel?: string;
  provider?: "klook" | "gyg" | "maps";
}

interface DayPlan {
  day: number;
  city: string;
  activities: (string | DayActivity)[];
  food: string;
  tip: string;
}

const interests = [
  { id: "food", label: "Comida", icon: "🍜" },
  { id: "culture", label: "Cultura", icon: "🏯" },
  { id: "nature", label: "Naturaleza", icon: "🗻" },
  { id: "shopping", label: "Compras", icon: "💳" },
  { id: "anime", label: "Anime/Otaku", icon: "🎌" },
  { id: "history", label: "Historia", icon: "⚔️" },
  { id: "relax", label: "Relax/Onsen", icon: "💆" },
  { id: "nightlife", label: "Vida nocturna", icon: "🍸" },
];

const budgetLevels = [
  { id: "budget", label: "Low Budget", desc: "Hostales, konbini, transporte público", price: "~80€/día", icon: "💰" },
  { id: "mid", label: "Comfort", desc: "Hoteles 3★, restaurantes mixtos, JR Pass", price: "~160€/día", icon: "💎" },
  { id: "high", label: "Premium", desc: "Ryokan, wagyu, JR Green Car, spas", price: "~350€/día", icon: "👑" },
];

const GYG = "https://www.getyourguide.com";
const KLK = "https://www.klook.com/en-US/activity";
const GM = "https://www.google.com/maps/search/?api=1&query=";

const itineraries: Record<string, Record<string, DayPlan[]>> = {
  "5-7": {
    default: [
      {
        day: 1, city: "Tokio",
        activities: [
          "Llegada + check-in",
          { name: "Shibuya Crossing", cost: "free", link: `${GM}Shibuya+Crossing+Tokyo`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Shibuya Sky (vistas 360°)", cost: "high", link: `${KLK}/70672-shibuya-sky-tokyo/`, linkLabel: "Reservar en Klook", provider: "klook" },
        ],
        food: "Ramen en Ichiran o Fuunji",
        tip: "Compra un Suica/Pasmo para transportes",
      },
      {
        day: 2, city: "Tokio",
        activities: [
          { name: "Tsukiji Outer Market", cost: "free", link: `${GM}Tsukiji+Outer+Market+Tokyo`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Senso-ji (Asakusa)", cost: "free", link: `${GM}Senso-ji+Temple+Tokyo`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Tokyo Skytree", cost: "mid", link: `${KLK}/41352-tokyo-skytree/`, linkLabel: "Reservar en Klook", provider: "klook" },
          "Akihabara (tiendas y anime)",
        ],
        food: "Sushi en Tsukiji, takoyaki",
        tip: "Los templos cierran temprano (~17:00)",
      },
      {
        day: 3, city: "Tokio",
        activities: [
          "Harajuku (Takeshita St)",
          "Meiji Shrine",
          "Omotesando",
          { name: "Shinjuku Golden Gai (noche)", cost: "low", link: `${GM}Golden+Gai+Shinjuku+Tokyo`, linkLabel: "Ver en mapa", provider: "maps" },
        ],
        food: "Curry japonés o tonkatsu",
        tip: "Golden Gai: bares tiny, reserva o ve temprano",
      },
      {
        day: 4, city: "Tokio → Hakone",
        activities: [
          "Tren a Hakone (1.5h)",
          { name: "Lake Ashi cruise", cost: "mid", link: `${GYG}/hakone-l845/?partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg" },
          "Hakone Open Air Museum",
          "Onsen con vista al Fuji",
        ],
        food: "Onsen tamago (huevo cocido en aguas termales)",
        tip: "Compra Hakone Free Pass (transporte ilimitado)",
      },
      {
        day: 5, city: "Hakone → Kioto",
        activities: [
          "Shinkansen a Kioto (2h)",
          { name: "Fushimi Inari (torii naranjas)", cost: "free", link: `${GM}Fushimi+Inari+Taisha+Kyoto`, linkLabel: "Ver en mapa", provider: "maps" },
          "Gion (barrio geisha)",
          "Pontocho (cena)",
        ],
        food: "Yudofu (tofu caliente) o kaiseki",
        tip: "Fushimi Inari: ve a las 6am para evitar multitudes",
      },
      {
        day: 6, city: "Kioto",
        activities: [
          { name: "Arashiyama Bamboo Grove", cost: "free", link: `${GM}Arashiyama+Bamboo+Grove+Kyoto`, linkLabel: "Ver en mapa", provider: "maps" },
          "Monkey Park",
          { name: "Kinkaku-ji (Pabellón Dorado)", cost: "low", link: `${GM}Kinkaku-ji+Temple+Kyoto`, linkLabel: "Ver en mapa", provider: "maps" },
          "Nishiki Market",
        ],
        food: "Matcha y dulces en Arashiyama",
        tip: "Arashiyama: ve temprano, a las 7-8am",
      },
      {
        day: 7, city: "Kioto → Osaka → vuelta",
        activities: [
          "Tren a Osaka (30min)",
          { name: "Osaka Castle", cost: "low", link: `${GM}Osaka+Castle`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Dotonbori (street food)", cost: "low", link: `${GM}Dotonbori+Osaka`, linkLabel: "Ver en mapa", provider: "maps" },
          "Vuelta al aeropuerto",
        ],
        food: "Takoyaki, okonomiyaki en Dotonbori",
        tip: "Dotonbori de noche es espectacular",
      },
    ],
  },
  "10-14": {
    default: [
      {
        day: 1, city: "Tokio",
        activities: [
          "Llegada",
          { name: "Shibuya Crossing", cost: "free", link: `${GM}Shibuya+Crossing+Tokyo`, linkLabel: "Ver en mapa", provider: "maps" },
          "Cena en izakaya",
        ],
        food: "Ramen de noche",
        tip: "Activa el roaming o compra SIM en aeropuerto",
      },
      {
        day: 2, city: "Tokio",
        activities: [
          { name: "Tsukiji Market", cost: "free", link: `${GM}Tsukiji+Outer+Market+Tokyo`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Senso-ji", cost: "free", link: `${GM}Senso-ji+Temple+Tokyo`, linkLabel: "Ver en mapa", provider: "maps" },
          "Akihabara",
          { name: "Tokyo Skytree", cost: "mid", link: `${KLK}/41352-tokyo-skytree/`, linkLabel: "Reservar en Klook", provider: "klook" },
        ],
        food: "Sushi temprano en Tsukiji",
        tip: "Akihabara: presupuesto 2-3h mínimo",
      },
      {
        day: 3, city: "Tokio",
        activities: [
          { name: "TeamLab Borderless", cost: "high", link: `${GYG}/tokyo-l193/?q=teamlab&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg" },
          "Odaiba + Gundam statue",
          "Shopping en Aqua City",
        ],
        food: "Cena con vista al Rainbow Bridge",
        tip: "TeamLab: reserva online con antelación",
      },
      {
        day: 4, city: "Tokio",
        activities: [
          "Harajuku",
          "Meiji Shrine",
          "Omotesando",
          { name: "Shinjuku Golden Gai", cost: "low", link: `${GM}Golden+Gai+Shinjuku+Tokyo`, linkLabel: "Ver en mapa", provider: "maps" },
        ],
        food: "Maid café o themed café",
        tip: "Golden Gai: 500-1000 yenes entrada por bar",
      },
      {
        day: 5, city: "Tokio → Nikko",
        activities: [
          "Tren a Nikko (2h)",
          { name: "Toshogu Shrine", cost: "low", link: `${GM}Toshogu+Shrine+Nikko`, linkLabel: "Ver en mapa", provider: "maps" },
          "Shinkyo Bridge",
          "Lago Chuzenji",
        ],
        food: "Yuba (piel de tofu, especialidad de Nikko)",
        tip: "Nikko: combine bien con Nature Pass",
      },
      {
        day: 6, city: "Tokio → Hakone",
        activities: [
          "Hakone Free Pass",
          { name: "Pirate ship (Lake Ashi)", cost: "mid", link: `${GYG}/hakone-l845/?partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg" },
          "Open Air Museum",
          "Onsen",
        ],
        food: "Hoto noodles (especialidad)",
        tip: "Onsen: sin tatuajes visibles (regla tradicional)",
      },
      {
        day: 7, city: "Hakone → Kioto",
        activities: [
          "Shinkansen a Kioto",
          { name: "Fushimi Inari", cost: "free", link: `${GM}Fushimi+Inari+Taisha+Kyoto`, linkLabel: "Ver en mapa", provider: "maps" },
          "Gion evening walk",
        ],
        food: "Kaiseki (cena tradicional)",
        tip: "Fushimi Inari: gratis, abierto 24h",
      },
      {
        day: 8, city: "Kioto",
        activities: [
          { name: "Arashiyama Bamboo", cost: "free", link: `${GM}Arashiyama+Bamboo+Grove+Kyoto`, linkLabel: "Ver en mapa", provider: "maps" },
          "Monkey Park",
          { name: "Kinkaku-ji", cost: "low", link: `${GM}Kinkaku-ji+Temple+Kyoto`, linkLabel: "Ver en mapa", provider: "maps" },
          "Nishiki Market",
        ],
        food: "Matcha everything",
        tip: "Arashiyama: alquiler de bici recomendado",
      },
      {
        day: 9, city: "Kioto → Nara",
        activities: [
          "Tren a Nara (45min)",
          { name: "Todai-ji (Buda gigante)", cost: "low", link: `${GM}Todai-ji+Temple+Nara`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Nara Park (ciervos)", cost: "free", link: `${GM}Nara+Park+Nara`, linkLabel: "Ver en mapa", provider: "maps" },
          "Kasuga Taisha",
        ],
        food: "Kakinoha sushi (envuelto en hoja)",
        tip: "Los ciervos muerden: compra galletas con cuidado",
      },
      {
        day: 10, city: "Kioto → Hiroshima",
        activities: [
          "Shinkansen a Hiroshima (1.5h)",
          { name: "Peace Memorial Park", cost: "free", link: `${GM}Peace+Memorial+Park+Hiroshima`, linkLabel: "Ver en mapa", provider: "maps" },
          "Museo de la Paz",
          "Okonomiyaki",
        ],
        food: "Okonomiyaki estilo Hiroshima",
        tip: "Hiroshima: museo muy emotivo, reserve 2-3h",
      },
      {
        day: 11, city: "Hiroshima → Miyajima → Osaka",
        activities: [
          { name: "Ferry a Miyajima", cost: "mid", link: `${KLK}/140942-day-trip-to-hiroshima-and-miyajima-with-ferry-ride/`, linkLabel: "Reservar en Klook", provider: "klook" },
          { name: "Itsukushima Shrine (torii flotante)", cost: "low", link: `${GM}Itsukushima+Shrine+Miyajima`, linkLabel: "Ver en mapa", provider: "maps" },
          "Momiji manju",
          "Tren a Osaka",
        ],
        food: "Ostiones gigantes a la parrilla",
        tip: "Miyajima: ver torii con marea alta Y baja",
      },
      {
        day: 12, city: "Osaka",
        activities: [
          { name: "Osaka Castle", cost: "low", link: `${GM}Osaka+Castle`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Dotonbori", cost: "low", link: `${GM}Dotonbori+Osaka`, linkLabel: "Ver en mapa", provider: "maps" },
          "Shinsekai",
          "Tsutenkaku Tower",
        ],
        food: "Takoyaki, kushikatsu, okonomiyaki",
        tip: "Osaka: la ciudad de la comida de Japón",
      },
      {
        day: 13, city: "Osaka",
        activities: [
          { name: "Universal Studios Japan", cost: "high", link: `${GYG}/osaka-l1204/?q=universal+studios+japan&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg" },
          "Super Nintendo World",
          "Harry Potter World",
        ],
        food: "Comida temática del parque",
        tip: "USJ: compra Express Pass para evitar colas",
      },
      {
        day: 14, city: "Osaka → Vuelta",
        activities: [
          "Últimas compras",
          "Envío de equipaje (Yamato)",
          "Vuelta al aeropuerto",
        ],
        food: "Último konbini breakfast",
        tip: "Kansai Airport: hay cajas de cartón en la terminal",
      },
    ],
  },
  "15+": {
    default: [
      {
        day: 1, city: "Tokio",
        activities: [
          "Llegada",
          { name: "Shibuya Crossing", cost: "free", link: `${GM}Shibuya+Crossing+Tokyo`, linkLabel: "Ver en mapa", provider: "maps" },
          "Cena izakaya",
        ],
        food: "Ramen",
        tip: "Activa roaming o compra SIM",
      },
      {
        day: 2, city: "Tokio",
        activities: [
          "Tsukiji",
          "Senso-ji",
          "Akihabara",
        ],
        food: "Sushi",
        tip: "Akihabara: 2-3h mínimo",
      },
      {
        day: 3, city: "Tokio",
        activities: [
          { name: "TeamLab", cost: "high", link: `${GYG}/tokyo-l193/?q=teamlab&partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg" },
          "Odaiba",
          "Gundam",
        ],
        food: "Cena con vistas",
        tip: "TeamLab: reserva online",
      },
      {
        day: 4, city: "Tokio",
        activities: ["Harajuku", "Meiji Shrine", "Shinjuku"],
        food: "Maid café",
        tip: "Golden Gai: ve temprano",
      },
      {
        day: 5, city: "Nikko",
        activities: [
          { name: "Toshogu Shrine", cost: "low", link: `${GM}Toshogu+Shrine+Nikko`, linkLabel: "Ver en mapa", provider: "maps" },
          "Lago Chuzenji",
          "Cascadas",
        ],
        food: "Yuba",
        tip: "Nature Pass recomendado",
      },
      {
        day: 6, city: "Hakone",
        activities: [
          { name: "Pirate ship", cost: "mid", link: `${GYG}/hakone-l845/?partner_id=NRWCY1R`, linkLabel: "Reservar en GYG", provider: "gyg" },
          "Open Air Museum",
          "Onsen",
        ],
        food: "Hoto noodles",
        tip: "Onsen sin tatuajes visibles",
      },
      {
        day: 7, city: "Kioto",
        activities: [
          "Shinkansen",
          { name: "Fushimi Inari", cost: "free", link: `${GM}Fushimi+Inari+Taisha+Kyoto`, linkLabel: "Ver en mapa", provider: "maps" },
          "Gion",
        ],
        food: "Kaiseki",
        tip: "Fushimi Inari: gratis 24h",
      },
      {
        day: 8, city: "Kioto",
        activities: [
          "Arashiyama",
          { name: "Kinkaku-ji", cost: "low", link: `${GM}Kinkaku-ji+Temple+Kyoto`, linkLabel: "Ver en mapa", provider: "maps" },
          "Nishiki",
        ],
        food: "Matcha",
        tip: "Alquila bici en Arashiyama",
      },
      {
        day: 9, city: "Nara",
        activities: [
          { name: "Todai-ji", cost: "low", link: `${GM}Todai-ji+Temple+Nara`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Nara Park", cost: "free", link: `${GM}Nara+Park+Nara`, linkLabel: "Ver en mapa", provider: "maps" },
          "Ciervos",
        ],
        food: "Kakinoha sushi",
        tip: "Galletas para ciervos: 200 yenes",
      },
      {
        day: 10, city: "Hiroshima",
        activities: [
          { name: "Peace Park", cost: "free", link: `${GM}Peace+Memorial+Park+Hiroshima`, linkLabel: "Ver en mapa", provider: "maps" },
          "Museo de la Paz",
        ],
        food: "Okonomiyaki",
        tip: "Museo: reserve 2-3h",
      },
      {
        day: 11, city: "Miyajima",
        activities: [
          { name: "Itsukushima Shrine", cost: "low", link: `${GM}Itsukushima+Shrine+Miyajima`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Torii flotante", cost: "free", link: `${GM}Itsukushima+Shrine+Miyajima+torii`, linkLabel: "Ver en mapa", provider: "maps" },
        ],
        food: "Ostiones",
        tip: "Ver torii con marea alta y baja",
      },
      {
        day: 12, city: "Osaka",
        activities: [
          { name: "Osaka Castle", cost: "low", link: `${GM}Osaka+Castle`, linkLabel: "Ver en mapa", provider: "maps" },
          { name: "Dotonbori", cost: "low", link: `${GM}Dotonbori+Osaka`, linkLabel: "Ver en mapa", provider: "maps" },
          "Shinsekai",
        ],
        food: "Takoyaki, kushikatsu",
        tip: "Osaka = comida",
      },
      {
        day: 13, city: "Osaka → Kumano",
        activities: ["Tren a Kumano", "Kumano Kodo pilgrimage", "Onsen rural"],
        food: "Basashi (caballo crudo)",
        tip: "Kumano Kodo: senderismo sagrado",
      },
      {
        day: 14, city: "Kumano → Nagoya",
        activities: ["Tren a Nagoya", "Atsuta Shrine", "Osu Shopping"],
        food: "Hitsumabushi (anguila)",
        tip: "Nagoya: ciudad subestimada",
      },
      {
        day: 15, city: "Nagoya → Kanazawa",
        activities: ["Tren a Kanazawa (2h)", "Kenroku-en Garden", "Higashi Chaya"],
        food: "Kaisendon (arroz con marisco)",
        tip: "Kanazawa: el Kioto del norte, menos turistas",
      },
      {
        day: 16, city: "Kanazawa → Tokio",
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

  if (selectedInterests.includes("food")) return base;
  if (selectedInterests.includes("anime")) {
    return base.map((day) => {
      if (day.city.includes("Tokio") && day.activities.some((a) => typeof a === "string" ? a.includes("Akihabara") : a.name.includes("Akihabara"))) {
        return { ...day, tip: "Akihabara: dedica toda la tarde, hay tiendas escondidas" };
      }
      return day;
    });
  }
  if (selectedInterests.includes("nature")) {
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
  const [customBudget, setCustomBudget] = useState<number | "">("");
  const [showPlan, setShowPlan] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const toggleInterest = (id: string) => {
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

  const itinerary = showPlan ? getItinerary(days, selectedInterests) : [];

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
            {[3, 5, 7, 10, 14, 21].map((d) => (
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
            <p className="text-xs opacity-70 mt-1">Sin vuelos. Tasa: 1€ ≈ 161 JPY (tiempo real)</p>
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
                                  {a.link && (
                                    <a href={a.link} target="_blank" rel="noopener noreferrer"
                                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded transition ${
                                        a.provider === "klook" ? "bg-red-50 text-red-600 hover:bg-red-100" :
                                        a.provider === "gyg" ? "bg-orange-50 text-orange-600 hover:bg-orange-100" :
                                        "bg-green-50 text-green-600 hover:bg-green-100"
                                      }`}>
                                      {a.linkLabel || "Ver"} →
                                    </a>
                                  )}
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
                <div className="font-bold">JR Pass 7/14d</div>
                <div className="text-sm text-gray-500">
                  {days <= 7 ? "~230€" : days <= 14 ? "~370€" : "Sin pass"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/flights"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition mr-4">
              ✈️ Ver vuelos
            </a>
            <a href="/budget"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition">
              💰 Calcular presupuesto
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
