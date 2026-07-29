"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

interface Airport {
  name: string;
  city: string;
  code: string;
  distance_to_city: string;
  transport_to_city: { name: string; duration: string; price: number; covered_by_jrpass: boolean }[];
  tips: string;
}

const AIRPORT_COORDS: Record<string, { lat: number; lng: number }> = {
  NRT: { lat: 35.7647, lng: 140.3864 },
  HND: { lat: 35.5494, lng: 139.7798 },
  KIX: { lat: 34.4320, lng: 135.2304 },
  CTS: { lat: 42.7752, lng: 141.6923 },
  OKA: { lat: 26.1958, lng: 127.6457 },
  FUK: { lat: 33.5857, lng: 130.4506 },
};

interface HotelResult {
  name: string;
  lat: number;
  lng: number;
  airports: {
    airport: Airport;
    drivingDistance: number;
    drivingDuration: number;
    taxiCost: number;
  }[];
}

async function geocode(query: string): Promise<{ lat: number; lng: number; displayName: string } | null> {
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ", Japón")}&limit=3`);
    const data = await r.json();
    if (data[0]) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), displayName: data[0].display_name.split(",")[0] };
    return null;
  } catch { return null; }
}

async function osrmDistance(lng1: number, lat1: number, lng2: number, lat2: number): Promise<{ distance: number; duration: number } | null> {
  try {
    const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=false`);
    const data = await r.json();
    if (data.code === "Ok" && data.routes[0]) return { distance: data.routes[0].distance, duration: data.routes[0].duration };
    return null;
  } catch { return null; }
}

function formatDuration(m: number): string {
  const h = Math.floor(m / 60);
  const min = Math.round(m % 60);
  if (h > 0) return `${h}h ${min}min`;
  return `${min} min`;
}

function estimateTaxi(meters: number): number {
  return Math.round(600 + Math.max(0, meters - 1000) / 1000 * 350);
}

export default function AlojamientoPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HotelResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [airports, setAirports] = useState<Airport[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    if (airports.length === 0) {
      try {
        const r = await fetch(`${API_URL}/v1/transport/airports`);
        const d = await r.json();
        setAirports(d.airports || []);
      } catch { /* will use hardcoded list */ }
    }

    const geo = await geocode(query);
    if (!geo) {
      setError("No pude encontrar ese alojamiento. Sé más específico (ej: 'Hotel Gracery Shinjuku').");
      setLoading(false);
      return;
    }

    const airportList = airports.length > 0 ? airports : [];
    const results = await Promise.all(
      airportList.map(async (apt) => {
        const coords = AIRPORT_COORDS[apt.code];
        if (!coords) return null;
        const route = await osrmDistance(coords.lng, coords.lat, geo.lng, geo.lat);
        if (!route) return null;
        return { airport: apt, drivingDistance: route.distance, drivingDuration: route.duration, taxiCost: estimateTaxi(route.distance) };
      })
    );

    const validResults = results.filter((r): r is NonNullable<typeof r> => r !== null).sort((a, b) => a.drivingDistance - b.drivingDistance);

    if (validResults.length === 0) {
      setError("No pude calcular rutas desde los aeropuertos. Intenta de nuevo.");
      setLoading(false);
      return;
    }

    setResult({ name: geo.displayName, lat: geo.lat, lng: geo.lng, airports: validResults });
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🏨 ¿Dónde está mi alojamiento?</h1>
      <p className="text-gray-600 mb-6">Cómo llegar desde los aeropuertos hasta tu hotel en Japón.</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🏨</span>
          <span className="font-bold text-gray-900">Nombre de tu alojamiento</span>
        </div>
        <input
          value={query} onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Ej: Hotel Gracery Shinjuku, capsule hotel Akihabara, ryokan en Kioto..."
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-red-400 focus:outline-none mb-4"
        />
        <button onClick={handleSearch} disabled={loading || !query.trim()} className="w-full bg-red-600 text-white rounded-xl py-3 font-bold hover:bg-red-700 transition disabled:opacity-50">
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6">{error}</div>}

      {result && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
          <h2 className="font-bold text-gray-900 mb-1">📍 {result.name}</h2>
          <p className="text-xs text-gray-500 mb-4">Coordenadas: {result.lat.toFixed(4)}, {result.lng.toFixed(4)}</p>
        </div>
      )}

      {result && result.airports.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✈️</span>
                <h3 className="font-bold text-gray-900">{item.airport.name}</h3>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{item.airport.code}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{item.airport.city} · {item.airport.distance_to_city} del centro</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">{formatDuration(item.drivingDuration / 60)}</div>
              <div className="text-xs text-gray-500">en coche</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🚕</span>
            <span className="text-sm text-gray-600">Taxi: <strong className="text-red-600">~{item.taxiCost.toLocaleString()} ¥</strong></span>
            <span className="text-xs text-gray-400">({(item.drivingDistance / 1000).toFixed(1)} km)</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-700 uppercase">🚃 Transporte público</p>
            {item.airport.transport_to_city.map((t, j) => (
              <div key={j} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{t.covered_by_jrpass ? "✅" : "🚃"}</span>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{t.name}</span>
                    {t.covered_by_jrpass && <span className="text-xs text-green-600 ml-1">(cubre JR Pass)</span>}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{t.duration}</span>
                  <span className="text-sm text-gray-500 ml-2">{t.price.toLocaleString()}¥</span>
                </div>
              </div>
            ))}
          </div>

          {item.airport.tips && <p className="text-xs text-gray-500 mt-3">💡 {item.airport.tips}</p>}
        </div>
      ))}

      {result && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100">
          <h3 className="font-bold text-blue-900 mb-2">📌 Enlaces útiles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${result.lat},${result.lng}`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-3 text-sm text-blue-700 hover:shadow transition block">
              🗺️ Abrir en Google Maps
            </a>
            <a href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(result.name)}&aid=3049503`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-3 text-sm text-blue-700 hover:shadow transition block">
              🏨 Buscar en Booking.com
            </a>
            <a href="https://www.japan-experience.com/plan-your-trip/airport-transfers" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-3 text-sm text-blue-700 hover:shadow transition block">
              🚌 Reservar airport transfer
            </a>
            <a href="https://www.japan-wireless.com/?via=antonio" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-3 text-sm text-blue-700 hover:shadow transition block">
              📱 eSIM con Japan Wireless
            </a>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mt-6">
        <h3 className="font-bold text-gray-900 mb-2">💡 Tips de llegada</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p>🛄 El trámite de inmigración puede tardar 30-90 min en Narita/Haneda</p>
          <p>📱 Saca el eSIM antes de volar para tener datos al llegar</p>
          <p>💴 Cambia dinero o saca de cajero 7-Bank en el aeropuerto (mejor tipo de cambio)</p>
          <p>🚃 Si llegas a Narita con JR Pass, activa el pass y usa Narita Express</p>
          <p>🌙 Si llegas de noche (22:00-5:00), el tren puede no estar disponible — considera taxi o bus nocturno</p>
        </div>
      </div>
    </div>
  );
}
