"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

interface Tip {
  id: string;
  category: string;
  title: string;
  description: string;
  savings: string;
  icon: string;
}

export default function TipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = activeCategory ? `${API_URL}/v1/tips/savings?category=${activeCategory}` : `${API_URL}/v1/tips/savings`;
    fetch(url)
      .then((res) => res.json())
      .then((d) => { setTips(d.tips || []); setCategories(d.categories || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  const categoryLabels: Record<string, string> = {
    "transporte": "🚄 Transporte",
    "comida": "🍜 Comida",
    "alojamiento": "🛏️ Alojamiento",
    "compras": "🛒 Compras",
    "general": "💡 General",
    "actividades": "🎯 Actividades",
  };

  const totalSavings = tips.reduce((acc, tip) => {
    const match = tip.savings.match(/(\d+)/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 Tips de Ahorro</h1>
      <p className="text-gray-600 mb-8">Ahorra miles de yen siguiendo estos consejos de viajeros experimentados.</p>

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white">
        <div className="text-lg font-medium mb-1">Ahorro potencial total</div>
        <div className="text-4xl font-bold">~{totalSavings.toLocaleString()}+¥ por día</div>
        <div className="text-sm opacity-80 mt-1">Siguiendo todos los tips de esta categoría</div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-full font-medium transition-all ${!activeCategory ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
          Todos
        </button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full font-medium transition-all ${activeCategory === cat ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-green-200 transition-all">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{tip.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-lg text-gray-900">{tip.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                      Ahorra {tip.savings}
                    </span>
                  </div>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
