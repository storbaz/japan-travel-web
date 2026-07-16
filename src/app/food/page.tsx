"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

export default function FoodPage() {
  const [tab, setTab] = useState("guide");
  const [data, setData] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState("tokyo");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = "";
    if (tab === "guide") url = `${API_URL}/v1/food/guide`;
    else if (tab === "konbini") url = `${API_URL}/v1/food/konbini`;
    else if (tab === "dietary") url = `${API_URL}/v1/food/dietary`;
    else if (tab === "etiquette") url = `${API_URL}/v1/food/etiquette`;

    fetch(url)
      .then((res) => res.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [tab]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🍜 Comida</h1>
      <p className="text-gray-600 mb-8">Guia gastronomica completa de Japon</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {[{ id: "guide", label: "Restaurantes" }, { id: "konbini", label: "🏪 Konbini" }, { id: "dietary", label: "🥗 Dietas" }, { id: "etiquette", label: " Etiqueta" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-full font-medium transition-all ${tab === t.id ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando...</div>
      ) : tab === "guide" && data ? (
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {(data.cities || []).map((city: string) => (
              <button key={city} onClick={() => setSelectedCity(city)} className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedCity === city ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {city}
              </button>
            ))}
          </div>
          {data.guide?.[selectedCity] && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold mb-4">{data.guide[selectedCity].city}</h2>
              <div className="space-y-4">
                {data.guide[selectedCity].specialties.map((dish: any, i: number) => (
                  <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-lg">{dish.name}</h3>
                      <span className="text-sm bg-gray-100 rounded-full px-2 py-1">{dish.price_range}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{dish.description}</p>
                    <div className="text-sm text-gray-500">📍 {Array.isArray(dish.where) ? dish.where.join(", ") : dish.where}</div>
                    <div className="text-sm text-blue-600 mt-1">💡 {dish.tip}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : tab === "konbini" && data ? (
        <div className="space-y-6">
          <p className="text-gray-700 bg-yellow-50 rounded-xl p-4 border border-yellow-100">{data.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.chains?.map((chain: any, i: number) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-lg mb-2">{chain.name}</h3>
                <div className="text-sm text-gray-600 mb-2">Especialidades: {chain.specialties.join(", ")}</div>
                <div className="text-sm text-blue-600">💡 {chain.tip}</div>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold mt-6">Mejores Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.best_items?.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-lg border border-gray-100 p-4">
                <div className="font-bold">{item.name}</div>
                <div className="text-sm text-red-600 font-medium">{item.price}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      ) : tab === "dietary" && data ? (
        <div className="space-y-8">
          {Object.entries(data).map(([key, value]: [string, any]) => (
            <div key={key}>
              <h2 className="text-2xl font-bold mb-4 capitalize">{key === "vegan" ? "🥗 Opciones Veganas" : "🌾 Sin Gluten"}</h2>
              <p className="text-gray-600 mb-4">{value.description}</p>
              <div className="space-y-3 mb-4">
                {value.options?.map((opt: any, i: number) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-100 p-4">
                    <div className="font-bold">{opt.name}</div>
                    <div className="text-sm text-gray-600">{opt.description}</div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="font-medium text-blue-800 mb-2">Consejos:</div>
                <ul className="text-sm text-blue-700 space-y-1">
                  {value.tips?.map((tip: string, i: number) => <li key={i}>• {tip}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : tab === "etiquette" && data ? (
        <div className="space-y-4">
          {data.rules?.map((rule: any, i: number) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold">{rule.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${rule.importance === "alta" ? "bg-red-100 text-red-700" : rule.importance === "media" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                  {rule.importance}
                </span>
              </div>
              <p className="text-gray-600">{rule.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
