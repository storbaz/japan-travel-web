"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ItineraryMap = dynamic(() => import("@/components/ItineraryMap"), { ssr: false });

interface Place {
  id: string;
  name: string;
  name_jp: string;
  lat: number;
  lng: number;
  city: string;
  category: string;
  description: string;
  tips: string[];
  duration: string;
}

const places: Place[] = [
  { id: "senso-ji", name: "Templo Senso-ji", name_jp: "浅草寺", lat: 35.7148, lng: 139.7967, city: "Tokyo", category: "monumento", description: "Templo mas antiguo de Tokio. Entrada por el Raymon (trueno) con incienso.", tips: ["Visita temprano para evitar multitudes", "Tira una moneda para fortuna"], duration: "1-2h" },
  { id: "akihabara", name: "Akihabara (Barrio Electrico)", name_jp: "秋葉原", lat: 35.6984, lng: 139.7731, city: "Tokyo", category: "tienda", description: "Barrio de electronica, anime y manga. Tiendas de 8 pisos.", tips: ["Los mejores precios en Bic Camera", "Visita un maid cafe"], duration: "3-4h" },
  { id: "shibuya-crossing", name: "Cruce de Shibuya", name_jp: "渋谷スクランブル交差点", lat: 35.6595, lng: 139.7004, city: "Tokyo", category: "monumento", description: "El cruce peatonal mas famoso del mundo. 3000 personas cruzan a la vez.", tips: ["Vista desde el Starbucks del 2do piso", "Mejor de noche"], duration: "30min" },
  { id: "tsukiji", name: "Mercado Tsukiji", name_jp: "築地場外市場", lat: 35.6654, lng: 139.7707, city: "Tokyo", category: "restaurante", description: "Mercado de mariscos y comida callejera. El sushi mas fresco.", tips: ["Ve antes de las 9am", "Prueba el tamagoyaki"], duration: "2h" },
  { id: "meiji", name: "Santuario Meiji Jingu", name_jp: "明治神宮", lat: 35.6764, lng: 139.6993, city: "Tokyo", category: "monumento", description: "Santuario dedicado al Emperador Meiji. Bosque tranquilo en el centro.", tips: ["Gratis entrada", "Escribe un deseo en una ema"], duration: "1-2h" },
  { id: "teamlab", name: "teamLab Borderless", name_jp: "チームラボ", lat: 35.6264, lng: 139.7838, city: "Tokyo", category: "monumento", description: "Museo de arte digital inmersivo. Exhibiciones infinitas.", tips: ["Ropa oscura para fotos", "Reserva online"], duration: "3h" },
  { id: "dotonbori", name: "Dotonbori (Zona de Comida)", name_jp: "道頓堀", lat: 34.6687, lng: 135.5013, city: "Osaka", category: "restaurante", description: "Zona de comida y neones. El corazon nocturno de Osaka.", tips: ["Prueba takoyaki y okonomiyaki", "Foto con el Glico Man"], duration: "3h" },
  { id: "osaka-castle", name: "Castillo de Osaka", name_jp: "大阪城", lat: 34.6873, lng: 135.5262, city: "Osaka", category: "monumento", description: "Castillo historico con museo interior y vistas panoramicas.", tips: ["Visita en primavera (sakura)", "Sube al ultimo piso"], duration: "2h" },
  { id: "kuromon", name: "Mercado Kuromon", name_jp: "黒門市場", lat: 34.6651, lng: 135.5061, city: "Osaka", category: "restaurante", description: "La cocina de Osaka. Mariscos frescos y street food.", tips: ["Come ostras al grill", "Degusta langostinos"], duration: "1-2h" },
  { id: "kinkaku-ji", name: "Templo Pabellon Dorado", name_jp: "金閣寺", lat: 35.0394, lng: 135.7292, city: "Kyoto", category: "monumento", description: "Pabellon Dorado banado en oro. Patrimonio UNESCO.", tips: ["Reflejo perfecto en el estanque", "La mejor foto es temprano"], duration: "1h" },
  { id: "fushimi-inari", name: "Santuario Fushimi Inari", name_jp: "伏見稲荷大社", lat: 34.9671, lng: 135.7727, city: "Kyoto", category: "monumento", description: "10000 torii gates de color naranja. Sendero montana.", tips: ["Sube todo (2-3h)", "Menos gente al atardecer"], duration: "2-3h" },
  { id: "arashiyama", name: "Bosque de Bambu Arashiyama", name_jp: "嵐山竹林", lat: 35.0094, lng: 135.6672, city: "Kyoto", category: "monumento", description: "Bosque de bambu gigante. Sendero magico.", tips: ["Ve a las 7am para evitar turistas", "Combina con el templo Tenryu-ji"], duration: "1h" },
  { id: "gion", name: "Barrio de Gion (Geishas)", name_jp: "祇園", lat: 35.0036, lng: 135.7747, city: "Kyoto", category: "monumento", description: "Barrio de geishas. Arquitectura tradicional y casas de te.", tips: ["Atardecer en Hanamikoji", "Puedes ver geishas de noche"], duration: "2h" },
  { id: "atomic-dome", name: "Cupula de la Bomba Atomica", name_jp: "原爆ドーム", lat: 34.3955, lng: 132.4536, city: "Hiroshima", category: "monumento", description: "Ruinas del edificio mas cercano al epicentro. Patrimonio UNESCO.", tips: ["Visita el museo de la paz", "Momento de reflexion"], duration: "1-2h" },
  { id: "miyajima", name: "Isla Miyajima (Torii Flotante)", name_jp: "宮島", lat: 34.2961, lng: 132.3198, city: "Hiroshima", category: "monumento", description: "Isla sagrada con torii flotante. Ciervos caminan libremente.", tips: ["Torii iluminado al atardecer", "Prueba el momiji manju"], duration: "medio dia" },
  { id: "odori", name: "Parque Odori", name_jp: "大通公園", lat: 43.0593, lng: 141.3467, city: "Sapporo", category: "monumento", description: "Parque central de Sapporo. Festival de la nieve en febrero.", tips: ["Cerveza en el Beer Garden", "Snow Festival en febrero"], duration: "1h" },
  { id: "nara-deer", name: "Parque de Nara (Ciervos)", name_jp: "奈良公園", lat: 34.6851, lng: 135.8430, city: "Nara", category: "monumento", description: "Parque con 1200 ciervos salvajes. Comida para darles 200 yen.", tips: ["Compra shika senbei", "Los ciervos hacen reverencia"], duration: "2h" },
  { id: "chura-umi", name: "Acuario Churaumi", name_jp: "美ら海水族館", lat: 26.6939, lng: 127.8767, city: "Okinawa", category: "monumento", description: "Uno de los acuarios mas grandes del mundo. Tiburones ballena.", tips: ["Ve a la hora de alimentacion", "Reserva online"], duration: "3-4h" },
];

const categories = [
  { id: "todos", label: "Todos", emoji: "📍" },
  { id: "monumento", label: "Monumentos", emoji: "⛩️" },
  { id: "restaurante", label: "Restaurantes", emoji: "🍜" },
  { id: "tienda", label: "Tiendas", emoji: "🛍️" },
];

const cities = ["Todos", "Tokyo", "Osaka", "Kyoto", "Hiroshima", "Sapporo", "Nara", "Okinawa"];

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedCity, setSelectedCity] = useState("Todos");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filtered = places.filter((p) => {
    if (selectedCategory !== "todos" && p.category !== selectedCategory) return false;
    if (selectedCity !== "Todos" && p.city !== selectedCity) return false;
    return true;
  });

  const mapPlaces = filtered.map((p, i) => ({
    id: p.id,
    name: p.name,
    lat: p.lat,
    lng: p.lng,
    day: i + 1,
    time: "",
    category: p.category,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🗺️ Mapa de Japon</h1>
      <p className="text-gray-600 mb-8">Explora los lugares mas populares por ciudad</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.id ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {cities.map((city) => (
          <button key={city} onClick={() => setSelectedCity(city)} className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedCity === city ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"}`}>
            {city}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        <div>
          <ItineraryMap places={mapPlaces} />
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold text-gray-900 mb-1">Sin resultados</h3>
              <p className="text-sm text-gray-500">No hay lugares en {selectedCity !== "Todos" ? selectedCity : "esta categoría"}. Prueba con otra ciudad o categoría.</p>
            </div>
          )}
          {filtered.map((place, i) => (
            <div key={place.id} onClick={() => setSelectedPlace(place)} className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${selectedPlace?.id === place.id ? "border-red-400 shadow-md" : "border-gray-100 hover:border-red-200"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <h3 className="font-bold">{place.name}</h3>
                  </div>
                  <div className="text-sm text-gray-500 ml-8">{place.city} · {place.name_jp}</div>
                </div>
                <span className="text-xs bg-gray-100 rounded-full px-2 py-1">{place.duration}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 ml-8">{place.description}</p>
              {selectedPlace?.id === place.id && (
                <div className="mt-3 ml-8 space-y-2">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-blue-800 mb-1">Consejos:</div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {place.tips.map((tip, j) => <li key={j}>• {tip}</li>)}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition"
                      onClick={(e) => e.stopPropagation()}>
                      📍 Abrir en Google Maps
                    </a>
                    {place.category === "restaurante" && (
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.city + " Japan")}`} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 transition"
                        onClick={(e) => e.stopPropagation()}>
                        🍽️ Ver restaurantes
                      </a>
                    )}
                    {place.category === "tienda" && (
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.city + " Japan")}`} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition"
                        onClick={(e) => e.stopPropagation()}>
                        🛍️ Ver tiendas
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
