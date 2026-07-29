"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { UTIL_POIS, UtilPOI } from "@/lib/mapa-util-data";

const UtilMap = dynamic(() => import("./UtilMap"), { ssr: false });

const CATEGORIES = [
  { id: "atm" as const, label: "Cajeros (0% comisión)", icon: "💴", color: "bg-green-500" },
  { id: "charging" as const, label: "Puertos de carga USB", icon: "🔌", color: "bg-blue-500" },
  { id: "sento" as const, label: "Baños públicos (Sento)", icon: "♨️", color: "bg-red-500" },
];

const CITIES = [
  { id: "all", name: "Todas" },
  { id: "tokyo", name: "Tokio" },
  { id: "kyoto", name: "Kioto" },
  { id: "osaka", name: "Osaka" },
  { id: "nara", name: "Nara" },
  { id: "hiroshima", name: "Hiroshima" },
  { id: "fukuoka", name: "Fukuoka" },
  { id: "kanazawa", name: "Kanazawa" },
  { id: "hakone", name: "Hakone" },
];

export default function MapaUtilPage() {
  const [activeCats, setActiveCats] = useState<Set<string>>(new Set(["atm", "charging", "sento"]));
  const [city, setCity] = useState("all");
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  useState(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        () => {},
        { enableHighAccuracy: false, timeout: 10000 }
      );
    }
  });

  const toggleCat = (id: string) => {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return UTIL_POIS.filter((p) => activeCats.has(p.category) && (city === "all" || p.city === city));
  }, [activeCats, city]);

  const grouped = useMemo(() => {
    const g: Record<string, UtilPOI[]> = { atm: [], charging: [], sento: [] };
    filtered.forEach((p) => g[p.category]?.push(p));
    return g;
  }, [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🗺️ Mapa útil de Japón</h1>
      <p className="text-gray-600 mb-6">Cajeros sin comisión, puertos USB para cargar y baños públicos (sento).</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => toggleCat(c.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition ${activeCats.has(c.id) ? `${c.color} text-white` : "bg-white text-gray-600 border border-gray-200"}`}>
            <span>{c.icon}</span>
            <span>{c.label}</span>
            <span className="text-xs opacity-70">({UTIL_POIS.filter((p) => p.category === c.id).length})</span>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:border-red-400 focus:outline-none">
          {CITIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <span className="text-xs text-gray-400 ml-2">{filtered.length} puntos</span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-6">
        <UtilMap pois={filtered} userPos={userPos} />
      </div>

      {CATEGORIES.map((cat) => {
        const items = grouped[cat.id];
        if (!items?.length) return null;
        return (
          <div key={cat.id} className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
              {cat.icon} {cat.label}
              <span className="text-sm font-normal text-gray-500">({items.length})</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {items.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-3 hover:shadow-sm transition">
                  <div className="font-bold text-sm text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{p.address}</div>
                  <div className="text-xs text-gray-600 mt-1">{p.notes}</div>
                  {p.hours && <div className="text-xs text-gray-400 mt-0.5">🕐 {p.hours}</div>}
                  {p.fee && <div className="text-xs text-gray-400">💰 {p.fee}</div>}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
