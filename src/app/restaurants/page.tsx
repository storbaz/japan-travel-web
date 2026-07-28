"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import { useExchangeRate, yenToEur } from "@/hooks/useExchangeRate";

interface Restaurant {
  name: string;
  type: string;
  area: string;
  price: string;
  avg_price_jpy: number;
  rating: number;
  description: string;
  must_try: string;
  hours: string;
  tip: string;
  city?: string;
}

const priceEmoji: Record<string, string> = { "bajo": "💰", "medio": "💰💰", "alto": "💰💰💰", "$": "💰", "$$": "💰💰", "$$$": "💰💰💰", "$$$$": "💰💰💰💰" };

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { rate } = useExchangeRate();

  useEffect(() => {
    setLoading(true);
    const url = selectedCity ? `${API_URL}/v1/restaurants/guide/${selectedCity}` : `${API_URL}/v1/restaurants/guide`;
    fetch(url)
      .then((res) => res.json())
      .then((d) => {
        if (d.restaurants) {
          setRestaurants(d.restaurants);
          setCities(d.cities || []);
        } else if (Array.isArray(d.restaurants)) {
          setRestaurants(d.restaurants);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCity]);

  useEffect(() => {
    fetch(`${API_URL}/v1/restaurants/types`)
      .then((res) => res.json())
      .then((d) => setTypes(d.types || []))
      .catch(() => {});
  }, []);

  const filtered = selectedType ? restaurants.filter((r) => r.type === selectedType) : restaurants;

  const typeLabels: Record<string, string> = {
    "ramen": "🍜 Ramen",
    "sushi": "🍣 Sushi",
    "izakaya": "🍶 Izakaya",
    "street-food": "🍡 Street Food",
    "okonomiyaki": "🥞 Okonomiyaki",
    "kushikatsu": "🍢 Kushikatsu",
    "tempura": "🍤 Tempura",
    "kaiseki": "🎎 Kaiseki",
    "curry": "🍛 Curry",
    "gyukatsu": "🥩 Gyukatsu",
    "udon": "🍜 Udon",
    "cangrejo": "🦀 Cangrejo",
    "panaderia": "🥐 Panadería",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🍽️ Restaurantes</h1>
      <p className="text-gray-600 mb-8">Los mejores restaurantes seleccionados por ciudad y tipo de comida.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setSelectedCity(null)} className={`px-4 py-2 rounded-full font-medium transition-all ${!selectedCity ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
          Todas las ciudades
        </button>
        {cities.map((city) => (
          <button key={city} onClick={() => setSelectedCity(city)} className={`px-4 py-2 rounded-full font-medium transition-all capitalize ${selectedCity === city ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {city}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {types.map((type) => (
          <button key={type} onClick={() => setSelectedType(selectedType === type ? null : type)} className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedType === type ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-700 hover:bg-orange-100"}`}>
            {typeLabels[type] || type}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((r, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-orange-200 transition-all">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{r.name}</h3>
                  <div className="text-sm text-gray-500">
                    {r.city && <span className="capitalize">{r.city}</span>}
                    {r.city && " · "}
                    {r.area} · {typeLabels[r.type] || r.type}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm">{priceEmoji[r.price] || r.price}</div>
                  <div className="text-xs text-gray-500">~{r.avg_price_jpy.toLocaleString()}¥ <span className="text-gray-400">({yenToEur(r.avg_price_jpy, rate)})</span></div>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{r.description}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded-lg">⭐ {r.rating}</span>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">🔥 {r.must_try}</span>
                <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-lg">🕐 {r.hours}</span>
              </div>
              <div className="mt-3 text-sm text-green-700 bg-green-50 rounded-lg p-2">💡 {r.tip}</div>
              <div className="flex flex-wrap gap-2 mt-3">
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + " " + (r.city || "") + " " + r.area + " Japan")}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition">
                  📍 Ver en Google Maps
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + " " + (r.city || "") + " Japan")}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 transition">
                  🍽️ Haz tu reserva
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
