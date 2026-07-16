"use client";

import { useState, useEffect } from "react";

const API_URL = "http://localhost:8002";

interface Phrase {
  japanese: string;
  romaji: string;
  translation: string;
  context: string;
  pronunciation_tip?: string;
}

const categories = [
  { id: "basico", label: "Basico", emoji: "👋" },
  { id: "restaurante", label: "Restaurante", emoji: "🍜" },
  { id: "compras", label: "Compras", emoji: "🛒" },
  { id: "transporte", label: "Transporte", emoji: "🚄" },
  { id: "hotel", label: "Hotel", emoji: "🏨" },
  { id: "emergencia", label: "Emergencia", emoji: "🚨" },
];

export default function PhrasesPage() {
  const [activeCategory, setActiveCategory] = useState("basico");
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/v1/culture/phrases?category=${activeCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setPhrases(data.phrases || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🗣️ Frases Utiles</h1>
      <p className="text-gray-600 mb-8">Aprende las frases esenciales para tu viaje a Japon</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-red-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando frases...</div>
      ) : (
        <div className="space-y-4">
          {phrases.map((phrase, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{phrase.japanese}</div>
                  <div className="text-lg text-red-600 font-medium mb-2">{phrase.romaji}</div>
                  <div className="text-gray-700">{phrase.translation}</div>
                </div>
                <div className="md:text-right">
                  <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">{phrase.context}</div>
                  {phrase.pronunciation_tip && (
                    <div className="text-sm text-blue-600 mt-2">🔊 {phrase.pronunciation_tip}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
