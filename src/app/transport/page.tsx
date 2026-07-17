"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

export default function TransportPage() {
  const [tab, setTab] = useState("jrpass");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = "";
    if (tab === "jrpass") url = `${API_URL}/v1/transport/jrpass`;
    else if (tab === "connections") url = `${API_URL}/v1/transport/connections`;
    else if (tab === "airports") url = `${API_URL}/v1/transport/airports`;
    else if (tab === "car-rental") url = `${API_URL}/v1/transport/car-rental`;
    else if (tab === "tips") url = `${API_URL}/v1/transport/tips`;

    fetch(url)
      .then((res) => res.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [tab]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🚄 Transporte</h1>
      <p className="text-gray-600 mb-8">Trenes, aeropuertos, alquiler de coches y mas</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {[{ id: "jrpass", label: "JR Pass" }, { id: "connections", label: "Conexiones" }, { id: "airports", label: "✈️ Aeropuertos" }, { id: "car-rental", label: "🚗 Alquiler Coche" }, { id: "tips", label: "Consejos" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-full font-medium transition-all ${tab === t.id ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "jrpass" && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚄</div>
            <div>
              <h3 className="font-bold text-gray-900">Comprar JR Pass</h3>
              <p className="text-sm text-gray-600">Los mejores precios en JRPass.com. Envio a domicilio o recogida en aeropuerto.</p>
              <a href="https://www.jrpass.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Comprar JR Pass ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando...</div>
      ) : tab === "jrpass" && data ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
            <p className="text-gray-700 mb-4">{data.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.types?.map((type: any, i: number) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
                  <h3 className="font-bold text-lg mb-2">{type.name}</h3>
                  <div className="space-y-1 text-sm">
                    {Object.entries(type.prices).map(([key, val]: [string, any]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key.replace("_", " ")}:</span>
                        <span className="font-medium">¥{val.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">Incluye: {type.includes.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg mb-3">Consejos</h3>
            <ul className="space-y-2">{data.tips?.map((tip: string, i: number) => <li key={i} className="text-gray-700">• {tip}</li>)}</ul>
          </div>
        </div>
      ) : tab === "connections" && data ? (
        <div className="space-y-4">
          {data.connections?.map((conn: any, i: number) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-lg">{conn.from} → {conn.to}</div>
                <span className="text-sm bg-green-100 text-green-700 rounded-full px-3 py-1">¥{conn.price_jpy.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 mb-2">
                <div>🚄 {conn.train}</div>
                <div>⏱️ {conn.duration}</div>
                <div>🔄 {conn.frequency}</div>
                <div className="text-blue-600">💡 {conn.tips}</div>
              </div>
            </div>
          ))}
        </div>
      ) : tab === "airports" && data ? (
        <div className="space-y-6">
          {data.airports?.map((airport: any, i: number) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">{airport.name}</h3>
                <span className="text-sm bg-gray-100 rounded-full px-3 py-1">{airport.code}</span>
              </div>
              <div className="text-sm text-gray-600 mb-3">📍 {airport.city} • {airport.distance_to_city} del centro</div>
              <div className="space-y-2">
                {airport.transport_to_city?.map((t: any, j: number) => (
                  <div key={j} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span>{t.duration} • ¥{t.price}</span>
                    <span className={t.covered_by_jrpass ? "text-green-600 font-medium" : "text-gray-500"}>
                      {t.covered_by_jrpass ? "✅ JR Pass" : "❌ No cubierto"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-blue-600 mt-3">💡 {airport.tips}</div>
            </div>
          ))}
        </div>
      ) : tab === "car-rental" && data ? (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-3">Alquiler de Coches</h2>
            <p className="text-gray-600 mb-4">{data.description}</p>
            <h3 className="font-bold mb-2">Requisitos:</h3>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">{data.requirements?.map((r: string, i: number) => <li key={i}>• {r}</li>)}</ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.best_regions_for_driving?.map((region: any, i: number) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold">🚗 {region.region}</h3>
                <p className="text-sm text-gray-600">{region.reason}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold mb-3">Empresas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data.companies?.map((c: any, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="font-medium text-sm">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : tab === "tips" && data ? (
        <div className="space-y-4">
          {data.tips?.map((tip: any, i: number) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
              <p className="text-gray-600 mb-2">{tip.description}</p>
              <div className="text-sm text-blue-600">💡 {tip.tip}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
