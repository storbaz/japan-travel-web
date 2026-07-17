"use client";

import { useState, useEffect, useRef } from "react";
import { API_URL } from "@/lib/api";

interface Place {
  place_id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviews_count: number;
  coordinates: { lat: number; lng: number } | null;
  hours: Record<string, string> | null;
  price_level: string;
  thumbnail_url: string;
  google_maps_url: string;
}

interface Review {
  author: string;
  rating: number;
  text: string;
  time: string;
  profile_image: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("tokyo");
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/v1/places/cities`)
      .then((res) => res.json())
      .then((d) => setCities(d.cities || []))
      .catch(() => {});
  }, []);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`${API_URL}/v1/places/search?q=${encodeURIComponent(query)}&city=${city}&limit=20`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async (place: Place) => {
    setSelectedPlace(place);
    setLoadingReviews(true);
    setReviews([]);
    try {
      const res = await fetch(`${API_URL}/v1/places/reviews?place_id=${place.place_id}&lang=en`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") search();
  };

  const getOpenStatus = (hours: Record<string, string> | null): string => {
    if (!hours) return "";
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const today = new Date().getDay();
    const dayName = days[(today + 6) % 7];
    return hours[dayName] || "";
  };

  const quickSearches = [
    { label: "🍜 Ramen", q: "ramen" },
    { label: "🍣 Sushi", q: "sushi restaurant" },
    { label: "🏨 Hoteles", q: "hotel" },
    { label: "☕ Cafes", q: "coffee shop" },
    { label: "🛒 Konbini", q: "convenience store" },
    { label: "⛩️ Templos", q: "temple" },
    { label: "🎌 Izakaya", q: "izakaya" },
    { label: "💆 Onsen", q: "onsen hot spring" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🔍 Buscar Lugares</h1>
      <p className="text-gray-600 mb-8">Encuentra restaurantes, hoteles y lugares reales en Japón con datos de Google Maps</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar... (ej: ramen, hotel, templo)"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={search}
            disabled={loading || !query.trim()}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickSearches.map((qs) => (
            <button
              key={qs.q}
              onClick={() => { setQuery(qs.q); }}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700 transition"
            >
              {qs.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <div className="text-sm text-gray-500">{results.length} resultados encontrados</div>
          {results.map((place) => (
            <div key={place.place_id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-red-200 transition-all">
              <div className="flex items-start gap-4">
                {place.thumbnail_url && (
                  <img src={place.thumbnail_url} alt={place.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{place.name}</h3>
                    {place.rating && (
                      <span className="text-sm bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                        ⭐ {place.rating} ({place.reviews_count?.toLocaleString() || 0})
                      </span>
                    )}
                    {place.price_level && (
                      <span className="text-sm text-gray-500">{place.price_level}</span>
                    )}
                  </div>
                  {place.category && <div className="text-sm text-gray-500 mb-1">{place.category}</div>}
                  {place.address && <div className="text-sm text-gray-600 mb-1">📍 {place.address}</div>}
                  <div className="flex flex-wrap gap-3 text-sm mt-2">
                    {place.phone && <span className="text-gray-600">📞 {place.phone}</span>}
                    {place.website && (
                      <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        🌐 Web
                      </a>
                    )}
                    {place.google_maps_url && (
                      <a href={place.google_maps_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        🗺️ Google Maps
                      </a>
                    )}
                  </div>
                  {place.hours && (
                    <div className="text-sm text-gray-500 mt-1">🕐 Hoy: {getOpenStatus(place.hours)}</div>
                  )}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => loadReviews(place)}
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                    >
                      💬 Ver reseñas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : searched ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <div>No se encontraron resultados. Prueba con otra búsqueda.</div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <div className="text-5xl mb-4">🗾</div>
          <div className="text-lg">Escribe algo para buscar lugares reales en Japón</div>
          <div className="text-sm mt-2">Powered by Google Maps</div>
        </div>
      )}

      {selectedPlace && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlace(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedPlace.name}</h2>
              <button onClick={() => setSelectedPlace(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            {selectedPlace.rating && (
              <div className="text-sm text-gray-600 mb-3">⭐ {selectedPlace.rating} · {selectedPlace.reviews_count} reseñas</div>
            )}
            {loadingReviews ? (
              <div className="text-center py-6 text-gray-500">Cargando reseñas...</div>
            ) : reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      {r.profile_image && <img src={r.profile_image} alt="" className="w-6 h-6 rounded-full" />}
                      <span className="font-medium text-sm">{r.author}</span>
                      {r.rating && <span className="text-sm text-yellow-600">⭐ {r.rating}</span>}
                      {r.time && <span className="text-xs text-gray-400">{r.time}</span>}
                    </div>
                    <p className="text-sm text-gray-600">{r.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">No hay reseñas disponibles</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
