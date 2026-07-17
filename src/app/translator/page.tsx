"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

interface Translation {
  japanese: string;
  romaji: string;
  spanish: string;
  pronunciation: string;
}

export default function TranslatorPage() {
  const [category, setCategory] = useState("básico");
  const [phrases, setPhrases] = useState<Translation[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [speakIdx, setSpeakIdx] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/v1/translator/translate?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((d) => { setPhrases(d.phrases || []); setCategories(d.categories || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    fetch(`${API_URL}/v1/translator/categories`)
      .then((res) => res.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => {});
  }, []);

  const speak = (text: string, idx: number) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.8;
    setSpeakIdx(idx);
    u.onend = () => setSpeakIdx(null);
    window.speechSynthesis.speak(u);
  };

  const categoryLabels: Record<string, string> = {
    "básico": "🗣️ Básico",
    "restaurantes": "🍜 Restaurantes",
    "transporte": "🚄 Transporte",
    "compras": "🛒 Compras",
    "emergencias": "🆘 Emergencias",
    "hotel": "🏨 Hotel",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🌐 Traductor</h1>
      <p className="text-gray-600 mb-8">Frases japonesas para cada situación. Toca para escuchar la pronunciación.</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full font-medium transition-all ${category === cat ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {phrases.map((phrase, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-red-200 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{phrase.japanese}</div>
                  <div className="text-sm text-gray-500 italic mb-2">{phrase.romaji}</div>
                  <div className="text-lg text-gray-700">{phrase.spanish}</div>
                </div>
                <button onClick={() => speak(phrase.japanese, idx)} className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${speakIdx === idx ? "bg-red-600 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-400">🔊 {phrase.pronunciation}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
