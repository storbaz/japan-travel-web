"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

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

export default function EventsPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [filter, setFilter] = useState("todos");
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">⛩️ Eventos y Festivales</h1>
      <p className="text-gray-600 mb-8">Descubre que pasa en Japon durante tu visita</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {[{ id: "todos", label: "Todos" }, { id: "primavera", label: "🌸 Primavera" }, { id: "verano", label: "☀️ Verano" }, { id: "otono", label: "🍂 Otoño" }, { id: "invierno", label: "❄️ Invierno" }].map((s) => (
          <button key={s.id} onClick={() => setFilter(s.id)} className={`px-4 py-2 rounded-full font-medium transition-all ${filter === s.id ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando eventos...</div>
      ) : (
        <div className="space-y-6">
          {festivals.map((festival, i) => (
            <div key={i} className={`rounded-xl border-2 p-6 ${seasonColors[festival.season] || "bg-white border-gray-200"}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{seasonEmojis[festival.season]} {festival.name}</h2>
                  <div className="text-gray-600">{festival.name_jp}</div>
                </div>
                <span className="text-sm bg-white/70 rounded-full px-3 py-1">{festival.dates_2026}</span>
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
          ))}
        </div>
      )}
    </div>
  );
}
