"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

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
  const [fullscreen, setFullscreen] = useState<Phrase | null>(null);
  const [speaking, setSpeaking] = useState<string | null>(null);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

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

  const speak = (text: string, id: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.8;

    const voices = window.speechSynthesis.getVoices();
    const jpVoice = voices.find((v) => v.lang.startsWith("ja")) || null;
    if (jpVoice) utterance.voice = jpVoice;

    utterance.onstart = () => setSpeaking(id);
    utterance.onend = () => setSpeaking(null);
    utterance.onerror = () => setSpeaking(null);
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  };

  const showFullscreen = (phrase: Phrase) => {
    setFullscreen(phrase);
    speak(phrase.japanese, "fullscreen");
  };

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 cursor-pointer" onClick={() => setFullscreen(null)}>
        <div className="text-center max-w-2xl">
          <div className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">{fullscreen.japanese}</div>
          <div className="text-2xl md:text-3xl text-red-600 font-medium mb-4">{fullscreen.romaji}</div>
          <div className="text-xl md:text-2xl text-gray-700 mb-6">{fullscreen.translation}</div>
          <div className="text-gray-400 text-sm">Toca para cerrar</div>
        </div>
      </div>
    );
  }

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
                <div className="flex gap-2 md:flex-col">
                  <button onClick={() => speak(phrase.japanese, `${i}`)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${speaking === `${i}` ? "bg-red-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}>
                    🔊 Escuchar
                  </button>
                  <button onClick={() => showFullscreen(phrase)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all">
                    📱 Mostrar
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-1">{phrase.context}</div>
                {phrase.pronunciation_tip && (
                  <div className="text-sm text-blue-600">🔊 {phrase.pronunciation_tip}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
