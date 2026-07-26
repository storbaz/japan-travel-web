"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

function speakJapanese(text: string) {
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  }
}

export default function EmergencyPage() {
  const [contacts, setContacts] = useState<any>(null);
  const [phrases, setPhrases] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<Record<string, any[]>>({});
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"numbers" | "phrases" | "hospitals" | "embassies" | "tips">("numbers");
  const [userCity, setUserCity] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/v1/emergency/contacts`).then((r) => r.json()),
      fetch(`${API_URL}/v1/emergency/phrases`).then((r) => r.json()),
      fetch(`${API_URL}/v1/emergency/hospitals`).then((r) => r.json()),
      fetch(`${API_URL}/v1/emergency/tips`).then((r) => r.json()),
    ]).then(([c, p, h, t]) => {
      setContacts(c);
      setPhrases(p.phrases || []);
      setHospitals(h.hospitals || {});
      setTips(t.tips || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const cityMap: Record<string, [number, number][]> = {
            tokyo: [[35.65, 35.80], [139.65, 139.95]],
            osaka: [[34.55, 34.80], [135.40, 135.60]],
            kyoto: [[34.95, 35.10], [135.70, 135.85]],
          };
          for (const [city, bounds] of Object.entries(cityMap)) {
            if (lat >= bounds[0][0] && lat <= bounds[0][1] && lng >= bounds[1][0] && lng <= bounds[1][1]) {
              setUserCity(city);
              break;
            }
          }
        },
        () => {},
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-64"></div>
          <div className="h-6 bg-gray-200 rounded w-96"></div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "numbers" as const, label: "📞 Números", icon: "📞" },
    { id: "phrases" as const, label: "🗣️ Frases", icon: "🗣️" },
    { id: "hospitals" as const, label: "🏥 Hospitales", icon: "🏥" },
    { id: "embassies" as const, label: "🏛️ Embajadas", icon: "🏛️" },
    { id: "tips" as const, label: "💊 Salud", icon: "💊" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">🏥</span>
        <h1 className="text-4xl font-bold text-gray-900">Emergencias</h1>
      </div>
      <p className="text-gray-600 mb-6">Numeros de emergencia, frases utiles, hospitales y embajadas</p>

      {userCity && (
        <div className="bg-green-50 rounded-xl border border-green-200 p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">📍</span>
          <div>
            <div className="font-bold text-green-800">Ciudad detectada: {userCity.charAt(0).toUpperCase() + userCity.slice(1)}</div>
            <div className="text-sm text-green-600">Mostrando hospitales de esta zona</div>
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl font-medium transition text-sm ${
              activeTab === tab.id
                ? "bg-red-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "numbers" && (
        <div className="space-y-6">
          <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
            <h2 className="text-xl font-bold text-red-800 mb-4">🚨 Emergencias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contacts?.general && Object.entries(contacts.general).map(([key, val]: [string, any]) => (
                <a
                  key={key}
                  href={`tel:${val.number.replace(/[^0-9+#]/g, "")}`}
                  className="bg-white rounded-xl p-4 border border-red-100 hover:shadow-lg hover:border-red-300 transition group flex items-center gap-4"
                >
                  <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition">
                    {val.number}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{val.description}</div>
                    <div className="text-sm text-gray-500">Toca para llamar</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">📞 Ayuda para Turistas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contacts?.tourist_help && Object.entries(contacts.tourist_help).map(([key, val]: [string, any]) => (
                <a
                  key={key}
                  href={`tel:${val.number.replace(/[^0-9+#]/g, "")}`}
                  className="bg-white rounded-xl p-4 border border-blue-100 hover:shadow-lg hover:border-blue-300 transition group flex items-center gap-4"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition text-center leading-tight">
                    {val.number.split("-").pop()}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{val.description}</div>
                    <div className="text-xs text-blue-600 font-mono">{val.number}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "phrases" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500 mb-4">Toca el boton de audio para escuchar la pronunciacion</p>
          {phrases.map((phrase, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{phrase.japanese}</div>
                  <div className="text-red-600 font-medium italic">{phrase.romaji}</div>
                  <div className="text-gray-700 mt-1">{phrase.translation}</div>
                  <div className="text-xs text-gray-400 mt-2 bg-gray-50 inline-block px-2 py-1 rounded">
                    📍 {phrase.context}
                  </div>
                </div>
                <button
                  onClick={() => speakJapanese(phrase.japanese)}
                  className="shrink-0 w-12 h-12 bg-red-50 hover:bg-red-100 rounded-xl flex items-center justify-center text-2xl transition hover:scale-110"
                  title="Escuchar"
                >
                  🔊
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "hospitals" && (
        <div className="space-y-4">
          {Object.entries(hospitals).map(([city, cityHospitals]) => (
            <div key={city} className={`rounded-2xl border p-6 ${city === userCity ? "bg-green-50 border-green-200" : "bg-white border-gray-100"}`}>
              <h3 className="font-bold text-lg text-gray-900 mb-3 capitalize">
                {city} {city === userCity && <span className="text-sm text-green-600">(tu ciudad)</span>}
              </h3>
              <div className="space-y-3">
                {cityHospitals.map((hospital: any, i: number) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-bold text-gray-900">{hospital.name}</div>
                        <div className="text-sm text-gray-600 mt-1">📍 {hospital.address}</div>
                        <div className="flex items-center gap-2 mt-2">
                          {hospital.english_available && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                              🗣️ Ingles disponible
                            </span>
                          )}
                          {hospital.specialties?.map((s: string) => (
                            <span key={s} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a
                        href={`tel:${hospital.phone.replace(/[^0-9+#]/g, "")}`}
                        className="shrink-0 bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-700 transition"
                      >
                        {hospital.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "embassies" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts?.embassies && Object.entries(contacts.embassies).map(([key, val]: [string, any]) => (
            <div key={key} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">
                  {key === "spain" ? "🇪🇸" : key === "mexico" ? "🇲🇽" : key === "argentina" ? "🇦🇷" : key === "colombia" ? "🇨🇴" : key === "usa" ? "🇺🇸" : "🇬🇧"}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{val.name}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <a href={`tel:${val.phone.replace(/[^0-9+#]/g, "")}`} className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition">
                  📞 <span className="font-mono">{val.phone}</span>
                </a>
                <div className="flex items-start gap-2 text-gray-600">
                  📍 <span>{val.address}</span>
                </div>
                <a href={val.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
                  🌐 <span>Sitio web</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "tips" && (
        <div className="space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className={`rounded-xl p-5 border ${
              tip.importance === "critica" ? "bg-red-50 border-red-200" :
              tip.importance === "alta" ? "bg-orange-50 border-orange-200" :
              "bg-gray-50 border-gray-200"
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {tip.importance === "critica" ? "🔴" : tip.importance === "alta" ? "🟠" : "ℹ️"}
                </span>
                <div>
                  <div className="font-bold text-gray-900">{tip.title}</div>
                  <div className="text-sm text-gray-700 mt-1">{tip.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
