"use client";

import { useState, useEffect, useCallback } from "react";

const TAXI_INITIAL = 600;
const TAXI_PER_KM = 350;
const WALKING_SPEED = 5;
const SUBWAY_COST = 180;

interface RouteResult {
  walking: { distance: number; duration: number } | null;
  driving: { distance: number; duration: number } | null;
  error: string | null;
}

async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ", Japón")}&limit=1`);
    const data = await r.json();
    if (data[0]) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    return null;
  } catch { return null; }
}

async function osrmRoute(lng1: number, lat1: number, lng2: number, lat2: number, profile: "driving" | "foot"): Promise<{ distance: number; duration: number } | null> {
  try {
    const r = await fetch(`https://router.project-osrm.org/route/v1/${profile}/${lng1},${lat1};${lng2},${lat2}?overview=false`);
    const data = await r.json();
    if (data.code === "Ok" && data.routes[0]) {
      return { distance: data.routes[0].distance, duration: data.routes[0].duration };
    }
    return null;
  } catch { return null; }
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m} min`;
}

function formatDistance(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${Math.round(meters)} m`;
}

function estimateTaxiCost(meters: number): number {
  const km = Math.max(0, meters - 1000) / 1000;
  return Math.round(TAXI_INITIAL + km * TAXI_PER_KM);
}

export default function DistanciaPage() {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [originCoords, setOriginCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [destCoords, setDestCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [result, setResult] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"calc" | "compare">("calc");

  const handleCalculate = useCallback(async () => {
    if (!origin.trim() || !dest.trim()) return;
    setLoading(true);
    setResult(null);

    const o = originCoords || await geocode(origin);
    const d = destCoords || await geocode(dest);
    if (!o || !d) {
      setResult({ walking: null, driving: null, error: "No pude encontrar una de las direcciones. Sé más específico." });
      setLoading(false);
      return;
    }

    const [walking, driving] = await Promise.all([osrmRoute(o.lng, o.lat, d.lng, d.lat, "foot"), osrmRoute(o.lng, o.lat, d.lng, d.lat, "driving")]);
    setResult({ walking, driving, error: null });
    setLoading(false);
  }, [origin, dest, originCoords, destCoords]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setOrigin("📍 Tu ubicación actual");
          setOriginCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {},
        { enableHighAccuracy: false, timeout: 8000 }
      );
    }
  }, []);

  const handleCalcClick = () => {
    if (originCoords && origin === "📍 Tu ubicación actual") setOrigin("");
    handleCalculate();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">📏 Distancia: andando vs taxi</h1>
      <p className="text-gray-600 mb-6">Compara tiempo y coste entre caminar, taxi y transporte público en Japón.</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">📍</span>
          <span className="font-bold text-gray-900">Origen</span>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            value={origin} onChange={(e) => { setOrigin(e.target.value); setOriginCoords(null); }}
            placeholder="Ej: Shibuya Crossing"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:border-red-400 focus:outline-none"
          />
          {originCoords && <button onClick={() => { setOrigin(""); setOriginCoords(null); }} className="text-xs text-gray-400 hover:text-red-500">✕</button>}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🏁</span>
          <span className="font-bold text-gray-900">Destino</span>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            value={dest} onChange={(e) => { setDest(e.target.value); setDestCoords(null); }}
            placeholder="Ej: Tokyo Skytree"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:border-red-400 focus:outline-none"
          />
          {destCoords && <button onClick={() => { setDest(""); setDestCoords(null); }} className="text-xs text-gray-400 hover:text-red-500">✕</button>}
        </div>

        <button onClick={handleCalcClick} disabled={loading || !origin.trim() || !dest.trim()} className="w-full bg-red-600 text-white rounded-xl py-3 font-bold hover:bg-red-700 transition disabled:opacity-50">
          {loading ? "Calculando..." : "Calcular distancia"}
        </button>
      </div>

      {result?.error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6">{result.error}</div>}

      {result && !result.error && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <div className="text-3xl mb-2">🚶</div>
              <h3 className="font-bold text-gray-900 mb-3">Andando</h3>
              {result.walking ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Distancia</span><span className="font-bold">{formatDistance(result.walking.distance)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Tiempo</span><span className="font-bold">{formatDuration(result.walking.duration)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Coste</span><span className="font-bold">0 ¥</span></div>
                  <div className={`mt-2 text-xs font-medium ${result.walking.duration > 1800 ? "text-red-600" : result.walking.duration > 900 ? "text-amber-600" : "text-green-600"}`}>
                    {result.walking.duration > 1800 ? "😰 Demasiado lejos para andar" : result.walking.duration > 900 ? "🙂 Caminable si tienes tiempo" : "✅ Perfecto para andar"}
                  </div>
                </div>
              ) : <p className="text-sm text-gray-500">No disponible</p>}
            </div>

            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <div className="text-3xl mb-2">🚕</div>
              <h3 className="font-bold text-gray-900 mb-3">Taxi</h3>
              {result.driving ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Distancia</span><span className="font-bold">{formatDistance(result.driving.distance)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Tiempo</span><span className="font-bold">{formatDuration(result.driving.duration)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Coste estimado</span><span className="font-bold text-red-600">~{estimateTaxiCost(result.driving.distance).toLocaleString()} ¥</span></div>
                  <div className="text-[11px] text-gray-500 mt-1">Tarifa inicial: {TAXI_INITIAL}¥ | {TAXI_PER_KM}¥/km extra</div>
                </div>
              ) : <p className="text-sm text-gray-500">No disponible</p>}
            </div>
          </div>

          {result.walking && result.driving && (
            <>
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <div className="text-3xl mb-2">🚃</div>
                <h3 className="font-bold text-gray-900 mb-3">Transporte público (aproximado)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Tiempo estimado</span><span className="font-bold">{formatDuration(result.driving.duration * 1.5)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Coste estimado</span><span className="font-bold">{Math.max(SUBWAY_COST, Math.round(result.driving.distance / 1000 * 150)).toLocaleString()} ¥</span></div>
                  <p className="text-xs text-gray-500 mt-1">* El tiempo real varía según rutas y horarios. Usa Hyperdia o Google Maps.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
                <h3 className="font-bold text-gray-900 mb-3">⚖️ Comparativa</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-20">Andando</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: `${Math.min(100, (result.walking.duration / (result.walking.duration + result.driving.duration)) * 100)}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-24 text-right">{formatDuration(result.walking.duration)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-20">Taxi</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div className="bg-amber-500 h-3 rounded-full" style={{ width: `${Math.min(100, (result.driving.duration / (result.walking.duration + result.driving.duration)) * 100)}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-24 text-right">{formatDuration(result.driving.duration)}</span>
                  </div>
                  <p className="text-xs text-gray-500">Ahorras <strong>{formatDuration(result.walking.duration - result.driving.duration)}</strong> en taxi vs andando</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mt-6">
        <h3 className="font-bold text-gray-900 mb-2">💰 Referencia de taxis en Japón</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p>🚕 Tarifa inicial: ~600¥ (primer km)</p>
          <p>📊 Tarifa por km: ~350¥</p>
          <p>🌙 Recargo nocturno (22:00-5:00): +20%</p>
          <p>🚖 Aplicaciones: GO, DiDi, Uber (limitado)</p>
          <p>💡 Los taxis son caros en Japón. Solo recomendados para trayectos cortos o con maletas.</p>
        </div>
      </div>
    </div>
  );
}
