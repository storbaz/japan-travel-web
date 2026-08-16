"use client";

import { useState, useEffect, useRef } from "react";
import { API_URL } from "@/lib/api";
import SeoContent from "@/components/SeoContent";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (speaking === id) {
      setSpeaking(null);
      return;
    }
    const audio = new Audio(`${API_URL}/v1/translator/tts?text=${encodeURIComponent(text)}&lang=ja`);
    audioRef.current = audio;
    setSpeaking(id);
    audio.onended = () => setSpeaking(null);
    audio.onerror = () => setSpeaking(null);
    audio.play().catch(() => setSpeaking(null));
  };

  const showFullscreen = (phrase: Phrase) => {
    setFullscreen(phrase);
    speak(phrase.japanese, "fullscreen");
  };

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 cursor-pointer" onClick={() => setFullscreen(null)}>
        <div className="text-center max-w-2xl">
          <div className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">{fullscreen.japanese}</div>
          <div className="text-2xl text-gray-500 italic mb-4">{fullscreen.romaji}</div>
          <div className="text-3xl text-gray-700 mb-6">{fullscreen.translation}</div>
          {fullscreen.pronunciation_tip && (
            <div className="text-lg text-blue-600">{fullscreen.pronunciation_tip}</div>
          )}
          <div className="mt-8 text-gray-400 text-sm">Toca en cualquier lugar para cerrar</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🗣️ Frases Utiles</h1>
      <p className="text-gray-600 mb-8">Aprende japones basico para tu viaje. Toca una frase para verla en pantalla completa.</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full font-medium transition-all ${activeCategory === cat.id ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {phrases.map((phrase, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-red-200 transition-all cursor-pointer" onClick={() => showFullscreen(phrase)}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{phrase.japanese}</div>
                  <div className="text-sm text-gray-500 italic mb-2">{phrase.romaji}</div>
                  <div className="text-lg text-gray-700">{phrase.translation}</div>
                  {phrase.pronunciation_tip && (
                    <div className="text-sm text-blue-600 mt-1">💡 {phrase.pronunciation_tip}</div>
                  )}
                </div>
                <button onClick={(e) => { e.stopPropagation(); speak(phrase.japanese, `phrase-${idx}`); }} className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${speaking === `phrase-${idx}` ? "bg-red-600 text-white animate-pulse" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <SeoContent
        title="Japonés básico para viajar"
        paragraphs={[
          "Aunque en Tokio, Kioto y Osaka encontrarás señalización en inglés en el transporte, el japonés hablado brilla por su ausencia. Aprender diez frases básicas marca una diferencia enorme: los japoneses responden con una sonrisa y el trato mejora en restaurantes, tiendas y trenes. Las más útiles son 'sumimasen' (disculpe/perdón), 'arigatou gozaimasu' (muchas gracias), 'onegai shimasu' (por favor) y 'wakarimasen' (no entiendo).",
          "En los restaurantes necesitarás 'menyuu kudasai' (la carta, por favor), 'omizu o kudasai' (agua, por favor) y 'gochisousama deshita' (gracias por la comida) al terminar. En las tiendas, 'kore o kudasai' (esto, por favor) y 'kaado wa tsukaemasu ka?' (¿aceptan tarjeta?) resuelven casi todo. Para pedir ayuda, 'tasukete' (ayúdame) y 'michi o oshiete kudasai' (¿me enseña el camino?) son imprescindibles.",
          "Una curiosidad: los japoneses agradecen que intentes hablar su idioma aunque cometas errores, porque entienden que es difícil. Las frases tienen un orden muy distinto al español, así que no intentes traducir palabra por palabra. Esta herramienta incluye audio real para que escuches la pronunciación antes de usarla en el viaje; escuchar cada frase un par de veces es el mejor método para fijarla.",
        ]}
        faqs={[
          { q: "¿Se puede viajar por Japón solo en inglés?", a: "Sí, en las grandes ciudades. En el campo y los pueblos pequeños, mucho menos. Un traductor con frases básicas como esta herramienta y la app de traducción de Google cubren el resto." },
          { q: "¿Cómo se dice gracias en japonés?", a: "'Arigatou' es el gracias informal y 'arigatou gozaimasu' el formal, que debes usar con desconocidos y empleados. Al salir de un restaurante, di 'gochisousama deshita'." },
          { q: "¿Es de mala educación hablar en voz alta en el tren?", a: "Sí, en el transporte público se guarda silencio y se habla por lo bajini. Las llamadas de teléfono están mal vistas. Sigue el ejemplo de los locales y pon el móvil en silencio." },
        ]}
      />
    </div>
  );
}
