"use client";

import { useState, useEffect, useCallback } from "react";
import { API_URL } from "@/lib/api";
import { SkeletonCards } from "@/components/Skeleton";

interface Festival {
  name: string;
  name_jp: string;
  season: string;
  months: string[];
  description: string;
  best_cities: string | string[];
  dates_2026: string;
  tips: string[];
}

const seasonColors: Record<string, string> = {
  primavera: "bg-pink-100 border-pink-200",
  verano: "bg-yellow-100 border-yellow-200",
  otono: "bg-orange-100 border-orange-200",
  invierno: "bg-blue-100 border-blue-200",
};

const seasonEmojis: Record<string, string> = {
  primavera: "🌸",
  verano: "☀️",
  otono: "🍂",
  invierno: "❄️",
};

const cityCoords: Record<string, { lat: number; lon: number }> = {
  tokyo: { lat: 35.6762, lon: 139.6503 },
  osaka: { lat: 34.6937, lon: 135.5023 },
  kyoto: { lat: 35.0116, lon: 135.7681 },
  hiroshima: { lat: 34.3853, lon: 132.4553 },
  nagoya: { lat: 35.1815, lon: 136.9066 },
  fukuoka: { lat: 33.5904, lon: 130.4017 },
  nara: { lat: 34.6851, lon: 135.8048 },
  sapporo: { lat: 43.0618, lon: 141.3545 },
  kanazawa: { lat: 36.5613, lon: 136.6562 },
  yokohama: { lat: 35.4437, lon: 139.638 },
};

function getNotifPrefs(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("viajapp_event_notifs") || "{}");
  } catch {
    return {};
  }
}

function saveNotifPrefs(prefs: Record<string, boolean>) {
  localStorage.setItem("viajapp_event_notifs", JSON.stringify(prefs));
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestCity(lat: number, lon: number): string | null {
  let nearest = null;
  let minDist = Infinity;
  for (const [city, coords] of Object.entries(cityCoords)) {
    const dist = getDistance(lat, lon, coords.lat, coords.lon);
    if (dist < minDist) {
      minDist = dist;
      nearest = city;
    }
  }
  return minDist < 200 ? nearest : null;
}

const cityNames: Record<string, string> = {
  tokyo: "Tokio", osaka: "Osaka", kyoto: "Kioto", hiroshima: "Hiroshima",
  nagoya: "Nagoya", fukuoka: "Fukuoka", nara: "Nara", sapporo: "Sapporo",
  kanazawa: "Kanazawa", yokohama: "Yokohama",
};

export default function EventsPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [filter, setFilter] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [userCity, setUserCity] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>({});
  const [locationError, setLocationError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNotifPrefs(getNotifPrefs());
  }, []);

  useEffect(() => {
    const url = filter === "todos" ? `${API_URL}/v1/events/festivals` : `${API_URL}/v1/events/festivals?season=${filter}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFestivals(data.festivals || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  const detectCity = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Tu navegador no soporta geolocalización");
      return;
    }
    setGeoLoading(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const city = findNearestCity(pos.coords.latitude, pos.coords.longitude);
        setUserCity(city);
        setGeoLoading(false);
        if (!city) setLocationError("No se detectó una ciudad de Japón cercana");
      },
      () => {
        setLocationError("No se pudo acceder a tu ubicación. Activa los permisos.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  const toggleNotif = (festivalName: string) => {
    const updated = { ...notifPrefs, [festivalName]: !notifPrefs[festivalName] };
    setNotifPrefs(updated);
    saveNotifPrefs(updated);
    if (updated[festivalName] && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const nearbyEvents = userCity
    ? festivals.filter((f) => {
        const cities = Array.isArray(f.best_cities) ? f.best_cities : [f.best_cities];
        return cities.some((c) => c.toLowerCase().includes(userCity.toLowerCase()));
      })
    : [];

  const isFestivalActive = (festival: Festival) => {
    const currentMonth = new Date().toLocaleString("es-ES", { month: "long" }).toLowerCase();
    return festival.months.some((m) => m.toLowerCase().includes(currentMonth));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">⛩️ Eventos y Festivales</h1>
      <p className="text-gray-600 mb-8">Descubre que pasa en Japon durante tu visita</p>

      {mounted && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900">📍 Eventos cerca de ti</h2>
            <button onClick={detectCity} disabled={geoLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50">
              {geoLoading ? "🔍 Detectando..." : "📍 Detectar mi ubicación"}
            </button>
          </div>
          {locationError && <p className="text-sm text-red-600 mb-2">{locationError}</p>}
          {userCity && (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Estás en <strong>{cityNames[userCity] || userCity}</strong>. Estos son los eventos en tu zona:
              </p>
              {nearbyEvents.length > 0 ? (
                <div className="space-y-2">
                  {nearbyEvents.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3">
                      <span className="text-lg">{seasonEmojis[f.season]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate">{f.name}</div>
                        <div className="text-xs text-gray-500">{f.dates_2026}</div>
                      </div>
                      <button onClick={() => toggleNotif(f.name)}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition ${notifPrefs[f.name] ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                        {notifPrefs[f.name] ? "🔔 Activo" : "🔕 Notificar"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No hay eventos programados en {cityNames[userCity]} este momento.</p>
              )}
            </div>
          )}
          {!userCity && !locationError && !geoLoading && (
            <p className="text-sm text-gray-500">Haz clic en "Detectar mi ubicación" para ver eventos cercanos con notificaciones.</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {[{ id: "todos", label: "Todos" }, { id: "primavera", label: "🌸 Primavera" }, { id: "verano", label: "☀️ Verano" }, { id: "otono", label: "🍂 Otoño" }, { id: "invierno", label: "❄️ Invierno" }].map((s) => (
          <button key={s.id} onClick={() => setFilter(s.id)} className={`px-4 py-2 rounded-full font-medium transition-all ${filter === s.id ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <SkeletonCards count={4} />
      ) : (
        <div className="space-y-6">
          {festivals.map((festival, i) => {
            const active = isFestivalActive(festival);
            const cities = Array.isArray(festival.best_cities) ? festival.best_cities : [festival.best_cities];
            const isNearby = userCity && cities.some((c) => c.toLowerCase().includes(userCity.toLowerCase()));

            return (
              <div key={i} className={`rounded-xl border-2 p-6 transition ${seasonColors[festival.season] || "bg-white border-gray-200"} ${active ? "ring-2 ring-green-400" : ""}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-900">{seasonEmojis[festival.season]} {festival.name}</h2>
                      {active && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-medium">AHORA</span>}
                      {isNearby && <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full font-medium">📍 CERCA</span>}
                    </div>
                    <div className="text-gray-600">{festival.name_jp}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm bg-white/70 rounded-full px-3 py-1">{festival.dates_2026}</span>
                    {mounted && (
                      <button onClick={() => toggleNotif(festival.name)}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition ${notifPrefs[festival.name] ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200"}`}>
                        {notifPrefs[festival.name] ? "🔔" : "🔕"}
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{festival.description}</p>
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-600">Mejores ciudades: </span>
                  <span className="text-sm text-gray-800">{Array.isArray(festival.best_cities) ? festival.best_cities.join(", ") : festival.best_cities}</span>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-600 mb-1">Consejos:</div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {festival.tips.map((tip, j) => <li key={j}>• {tip}</li>)}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
