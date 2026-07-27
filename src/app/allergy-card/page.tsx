"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

function speakJapanese(text: string) {
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.7;
    speechSynthesis.speak(u);
  }
}

interface Allergen {
  id: string;
  japanese: string;
  romaji: string;
}

interface Phrase {
  japanese: string;
  romaji: string;
  translation: string;
  context: string;
  template?: boolean;
}

export default function AllergyCardPage() {
  const [allergens, setAllergens] = useState<Allergen[]>([]);
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/v1/culture/allergies`)
      .then((r) => r.json())
      .then((data) => {
        setAllergens(data.allergens || []);
        setPhrases(data.phrases || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getSelectedAllergens = () => {
    return selected
      .map((id) => allergens.find((a) => a.id === id))
      .filter(Boolean) as Allergen[];
  };

  const buildMainPhrase = () => {
    const all = getSelectedAllergens();
    if (all.length === 0) return "";
    if (all.length === 1) {
      return `${all[0].japanese}にアレルギーがあります`;
    }
    const jpList = all.map((a) => a.japanese).join("と");
    return `${jpList}にアレルギーがあります`;
  };

  const buildMainRomaji = () => {
    const all = getSelectedAllergens();
    if (all.length === 0) return "";
    if (all.length === 1) {
      return `${all[0].romaji} ni arerugii ga arimasu`;
    }
    const romajiList = all.map((a) => a.romaji).join(" to ");
    return `${romajiList} ni arerugii ga arimasu`;
  };

  const buildMainTranslation = () => {
    const all = getSelectedAllergens();
    if (all.length === 0) return "";
    if (all.length === 1) {
      return `Soy alergico/a a ${all[0].id}`;
    }
    const esList = all.map((a) => a.id).join(", ");
    return `Soy alergico/a a ${esList}`;
  };

  const copyCardText = () => {
    const jp = buildMainPhrase();
    const romaji = buildMainRomaji();
    const es = buildMainTranslation();
    const text = `⚠️ ALERGIA ALIMENTARIA ⚠️\n\n${jp}\n${romaji}\n${es}\n\n⚠️ ALERGIA ALIMENTARIA ⚠️`;
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-80"></div>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">🍽️</span>
        <h1 className="text-4xl font-bold text-gray-900">Tarjeta de Alergias</h1>
      </div>
      <p className="text-gray-600 mb-8">
        Selecciona tus alergenos y genera una tarjeta en japones para mostrar al camarero
      </p>

      <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6 mb-8">
        <h2 className="font-bold text-orange-800 mb-4">⚠️ ¿Por que es importante?</h2>
        <ul className="text-sm text-orange-700 space-y-2">
          <li>• En Japón, el <strong>dashi</strong> (caldo de pescado) esta en casi todo, incluso en platos que parecen vegetarianos</li>
          <li>• Muchos camareros no hablan ingles — una tarjeta en japones es la forma mas segura de comunicarse</li>
          <li>• Los alergenos en japones pueden ser diferentes a los que conoces</li>
          <li>• Guarda la tarjeta en tu movil y muestrala al pedir</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Selecciona tus alergenos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {allergens.map((a) => (
          <button
            key={a.id}
            onClick={() => toggle(a.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selected.includes(a.id)
                ? "border-red-500 bg-red-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="font-bold text-gray-900 capitalize">{a.id.replace(/_/g, " ")}</div>
            <div className="text-lg text-gray-700 mt-1">{a.japanese}</div>
            <div className="text-xs text-gray-400 italic">{a.romaji}</div>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="space-y-6">
          <div className="bg-red-50 rounded-2xl border-2 border-red-300 p-8">
            <div className="text-center mb-6">
              <div className="text-sm font-medium text-red-600 mb-2">TARJETA DE ALERGIA</div>
              <div className="text-xs text-gray-500">Muestra esta tarjeta al camarero</div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-red-200 shadow-inner">
              <div className="text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <div className="text-xs font-bold text-red-600 tracking-widest mb-4">
                  アレルギー情報 — ALERGIA ALIMENTARIA
                </div>

                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {buildMainPhrase()}
                </div>
                <div className="text-sm text-gray-500 italic mb-4">
                  {buildMainRomaji()}
                </div>
                <div className="text-lg text-gray-700 mb-6">
                  {buildMainTranslation()}
                </div>

                <div className="border-t pt-4">
                  <div className="text-xs text-gray-500 mb-3">ALERGENOS ESPECIFICOS:</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {getSelectedAllergens().map((a) => (
                      <span
                        key={a.id}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {a.japanese} ({a.id.replace(/_/g, " ")})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-xs text-gray-400">
                  No puedo comer estos ingredientes. Por favor, verifique los ingredientes.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => speakJapanese(buildMainPhrase())}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition flex items-center gap-2"
            >
              🔊 Decir en japones
            </button>
            <button
              onClick={copyCardText}
              className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition flex items-center gap-2"
            >
              📋 Copiar texto
            </button>
            <button
              onClick={() => setShowCard(!showCard)}
              className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition flex items-center gap-2"
            >
              📱 Pantalla completa
            </button>
          </div>

          {showCard && (
            <div
              className="fixed inset-0 bg-white z-50 flex items-center justify-center p-8 cursor-pointer"
              onClick={() => setShowCard(false)}
            >
              <div className="text-center max-w-lg">
                <div className="text-6xl mb-6">⚠️</div>
                <div className="text-lg font-bold text-red-600 tracking-widest mb-6">
                  アレルギー情報
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  {buildMainPhrase()}
                </div>
                <div className="text-xl text-gray-500 italic mb-6">
                  {buildMainRomaji()}
                </div>
                <div className="text-2xl text-gray-700 mb-8">
                  {buildMainTranslation()}
                </div>
                <div className="text-sm text-gray-400">Toca para cerrar</div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">🗣️ Frases adicionales utiles</h3>
            <div className="space-y-3">
              {phrases
                .filter((p) => !p.template)
                .map((phrase, i) => (
                  <button
                    key={i}
                    onClick={() => speakJapanese(phrase.japanese)}
                    className="w-full text-left bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition"
                  >
                    <div className="font-bold text-gray-900">{phrase.japanese}</div>
                    <div className="text-sm text-gray-500 italic">{phrase.romaji}</div>
                    <div className="text-gray-700">{phrase.translation}</div>
                    <div className="text-xs text-gray-400 mt-1">📍 {phrase.context}</div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
