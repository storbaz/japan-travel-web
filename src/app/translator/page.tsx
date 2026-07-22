"use client";

import { useState, useRef, useCallback } from "react";
import { API_URL } from "@/lib/api";

const GYG = "https://www.getyourguide.com";
const GM = "https://www.google.com/maps/search/?api=1&query=";

const quickPhrases = [
  { jp: "すみません", romaji: "Sumimasen", es: "Disculpe" },
  { jp: "ありがとうございます", romaji: "Arigatou gozaimasu", es: "Muchas gracias" },
  { jp: "いくらですか？", romaji: "Ikura desu ka?", es: "¿Cuánto cuesta?" },
  { jp: "トイレはどこですか？", romaji: "Toire wa doko desu ka?", es: "¿Dónde está el baño?" },
  { jp: "駅はどこですか？", romaji: "Eki wa doko desu ka?", es: "¿Dónde está la estación?" },
  { jp: "Help!", romaji: "Tasukete!", es: "¡Ayuda!" },
  { jp: "このメニューをください", romaji: "Kono menuu wo kudasai", es: "Este menú, por favor" },
  { jp: "おすすめはありますか？", romaji: "Osusume wa arimasu ka?", es: "¿Tienen recomendaciones?" },
  { jp: "水をください", romaji: "Mizu wo kudasai", es: "Agua, por favor" },
  { jp: "お会計お願いします", romaji: "Okaikei onegai shimasu", es: "La cuenta, por favor" },
  { jp: "写真を撮ってもいいですか？", romaji: "Shashin wo tottemo ii desu ka?", es: "¿Puedo tomar una foto?" },
  { jp: "日本語がわかりません", romaji: "Nihongo ga wakarimasen", es: "No entiendo japonés" },
  { jp: "英語のメニューはありますか？", romaji: "Eigo no menuu wa arimasu ka?", es: "¿Tienen menú en inglés?" },
  { jp: "WiFiはありますか？", romaji: "Waifai wa arimasu ka?", es: "¿Tienen WiFi?" },
  { jp: "予約があります", romaji: "Yoyaku ga arimasu", es: "Tengo una reservación" },
  { jp: "Taxiを呼んでください", romaji: "Takushii wo yonde kudasai", es: "Llame un taxi, por favor" },
  { jp: "病院はどこですか？", romaji: "Byouin wa doko desu ka?", es: "¿Dónde está el hospital?" },
  { jp: "おすすめは何ですか？", romaji: "Osusume wa nan desu ka?", es: "¿Qué me recomienda?" },
  { jp: "辛いですか？", romaji: "Karai desu ka?", es: "¿Es picante?" },
  { jp: "アレルギーがあります", romaji: "Arerugii ga arimasu", es: "Tengo alergias" },
];

const categories = [
  { id: "all", label: "Todos", icon: "📋" },
  { id: "restaurant", label: "Restaurante", icon: "🍽️" },
  { id: "transport", label: "Transporte", icon: "🚄" },
  { id: "shopping", label: "Compras", icon: "🛍️" },
  { id: "emergency", label: "Emergencia", icon: "🚨" },
  { id: "hotel", label: "Hotel", icon: "🏨" },
];

function speak(text: string) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
}

export default function TranslatorPage() {
  const [inputText, setInputText] = useState("");
  const [translation, setTranslation] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isListening, setIsListening] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const translateText = async (text: string) => {
    if (!text.trim()) return;
    setIsTranslating(true);
    try {
      const res = await fetch(`${API_URL}/v1/translator/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, target_lang: "es" }),
      });
      const data = await res.json();
      setTranslation(data.translation || data.translated || "Traducción no disponible");
    } catch {
      setTranslation("Error al traducir. Inténtalo de nuevo.");
    }
    setIsTranslating(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      alert("No se pudo acceder a la cámara. Puedes escribir el texto directamente.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Tu navegador no soporta reconocimiento de voz. Prueba con Chrome.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setInputText(text);
      translateText(text);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    setIsListening(true);
  };

  const filteredPhrases = activeCategory === "all"
    ? quickPhrases
    : quickPhrases.filter((_, i) => {
        if (activeCategory === "restaurant") return [0, 2, 6, 7, 8, 9, 18, 19].includes(i);
        if (activeCategory === "transport") return [0, 4, 14, 15].includes(i);
        if (activeCategory === "shopping") return [2, 10].includes(i);
        if (activeCategory === "emergency") return [5, 16].includes(i);
        if (activeCategory === "hotel") return [0, 14].includes(i);
        return true;
      });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">🌐 Traductor + Cámara</h1>
        <p className="text-lg text-gray-600">Escribe, habla o escanea texto japonés. Traducción instantánea con audio.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Texto en japonés:</label>
          <div className="flex gap-2">
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe en japonés o pega texto aqui..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg resize-none h-24" />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <button onClick={() => translateText(inputText)} disabled={!inputText.trim() || isTranslating}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50">
              {isTranslating ? "Traduciendo..." : "🌐 Traducir"}
            </button>
            <button onClick={startListening}
              className={`px-4 py-2.5 rounded-lg font-medium transition ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              🎤 {isListening ? "Escuchando..." : "Hablar"}
            </button>
            <button onClick={() => speak(inputText)} disabled={!inputText.trim()}
              className="px-4 py-2.5 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition disabled:opacity-50">
              🔊 Escuchar
            </button>
            <button onClick={cameraActive ? stopCamera : startCamera}
              className={`px-4 py-2.5 rounded-lg font-medium transition ${cameraActive ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              📷 {cameraActive ? "Cerrar cámara" : "Abrir cámara"}
            </button>
          </div>
        </div>

        {cameraActive && (
          <div className="mt-4 relative rounded-xl overflow-hidden bg-black">
            <video ref={videoRef} autoPlay playsInline className="w-full max-h-96 object-cover" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <button onClick={captureImage}
                className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:bg-gray-100 transition">
                📸 Capturar
              </button>
            </div>
          </div>
        )}

        {capturedImage && !cameraActive && (
          <div className="mt-4">
            <img src={capturedImage} alt="Captura" className="w-full max-h-64 object-contain rounded-xl border" />
            <p className="text-sm text-gray-500 mt-2">Escribe el texto que ves en la imagen y tradúcelo.</p>
          </div>
        )}

        {translation && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-blue-900">Traducción:</h3>
              <button onClick={() => speak(translation)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                🔊 Escuchar traducción
              </button>
            </div>
            <p className="text-xl text-blue-800 font-medium">{translation}</p>
            <p className="text-sm text-blue-600 mt-2 italic">{inputText}</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🗣️ Frases rápidas</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${activeCategory === cat.id ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
        <div className="grid gap-3">
          {filteredPhrases.map((phrase, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => { setInputText(phrase.jp); translateText(phrase.jp); }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-xl font-bold text-gray-900 mb-1">{phrase.jp}</div>
                  <div className="text-sm text-gray-500 italic mb-1">{phrase.romaji}</div>
                  <div className="text-gray-700">{phrase.es}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); speak(phrase.jp); }}
                  className="text-blue-500 hover:text-blue-700 text-xl flex-shrink-0 mt-1" title="Escuchar">
                  🔊
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-bold text-gray-900 mb-3">🍳 ¿En un restaurante?</h3>
        <p className="text-sm text-gray-600 mb-3">Busca restaurantes cercanos y reserva online:</p>
        <div className="flex flex-wrap gap-3">
          <a href={`${GYG}/tokyo-l193/?q=food+tour&partner_id=NRWCY1R`} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition">
            🍜 Food tours en GYG →
          </a>
          <a href={`${GM}restaurant+near+me`} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition">
            📍 Restaurantes cercanos →
          </a>
          <a href="/restaurants"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition">
            🍽️ Guía de restaurantes →
          </a>
        </div>
      </div>
    </div>
  );
}
