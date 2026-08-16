"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import SeoContent from "@/components/SeoContent";

interface WeatherData {
  city: string;
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  wind: number;
  forecast: { date: string; temp_min: number; temp_max: number; description: string; icon: string }[];
}

const JAPAN_CITIES = [
  { id: "tokyo", name: "Tokio" },
  { id: "osaka", name: "Osaka" },
  { id: "kyoto", name: "Kioto" },
  { id: "hiroshima", name: "Hiroshima" },
  { id: "sapporo", name: "Sapporo" },
  { id: "fukuoka", name: "Fukuoka" },
  { id: "nagoya", name: "Nagoya" },
  { id: "naha", name: "Naha (Okinawa)" },
  { id: "nara", name: "Nara" },
  { id: "kobe", name: "Kobe" },
  { id: "yokohama", name: "Yokohama" },
  { id: "hakone", name: "Hakone" },
  { id: "kanazawa", name: "Kanazawa" },
  { id: "takayama", name: "Takayama" },
  { id: "nikko", name: "Nikko" },
];

const WEATHER_ICONS: Record<string, string> = {
  "☀️": "Despejado", "🌤️": "Parcialmente nublado", "⛅": "Nublado",
  "☁️": "Muy nuboso", "🌧️": "Lluvia", "🌦️": "Llovizna",
  "⛈️": "Tormenta", "❄️": "Nieve", "🌨️": "Nevadas",
  "🌫️": "Niebla",
};

const CITY_TIPS: Record<string, { icon: string; text: string }[]> = {
  tokyo: [
    { icon: "🗼", text: "Tokio es enorme — revisa el clima por barrio (Shibuya vs Shinjuku pueden diferir)" },
    { icon: "🚃", text: "Con lluvia, usa los pasos subterráneos (地下街) para moverte cubierto" },
  ],
  kyoto: [
    { icon: "⛩️", text: "Kioto es mejor con cielos nublados — los templos se ven más místicos" },
    { icon: "🍵", text: "Día lluvioso = día perfecto para una ceremonia del té cubierta" },
  ],
  osaka: [
    { icon: "🏮", text: "Dotonbori es igual de impresionante bajo la lluvia (menos gente)" },
    { icon: "🍜", text: "Osaka es la capital del food crawl — el clima no para a los locales" },
  ],
  sapporo: [
    { icon: "❄️", text: "Sapporo en invierno: calzado impermeable obligatorio" },
    { icon: "🍜", text: "El ramen de miso de Sapporo es el mejor en días fríos" },
  ],
};

function getEmoji(desc: string): string {
  const d = desc.toLowerCase();
  if (d.includes("tormenta") || d.includes("trueno")) return "⛈️";
  if (d.includes("nieve") || d.includes("snow") || d.includes("nevada")) return d.includes("lluvia") || d.includes("rain") ? "🌨️" : "❄️";
  if (d.includes("lluvia") || d.includes("rain") || d.includes("drizzle") || d.includes("llovizna")) return "🌧️";
  if (d.includes("despej") || d.includes("clear")) return "☀️";
  if (d.includes("nublado") || d.includes("cloud") || d.includes("nube")) return d.includes("muy nuboso") || d.includes("overcast") ? "☁️" : "🌤️";
  if (d.includes("niebla") || d.includes("fog")) return "🌫️";
  return "🌤️";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
}

function getClothingSuggestion(temp: number): string {
  if (temp >= 30) return "🩳 Camiseta, shorts, abanico, mucha agua";
  if (temp >= 25) return "👕 Camiseta, pantalón ligero, protección solar";
  if (temp >= 20) return "👚 Camiseta + chaqueta ligera";
  if (temp >= 15) return "🧥 Jersey o sudadera, chaqueta";
  if (temp >= 5) return "🧥 Abrigo, bufanda, guantes";
  return "🧤 Abrigo grueso, gorro, bufanda, guantes";
}

export default function MeteorologoPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("tokyo");
  const [loading, setLoading] = useState(true);
  const [userCity, setUserCity] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/v1/weather/${city}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.city) setWeather(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [city]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=10`)
            .then((r) => r.json())
            .then((data) => {
              const name = data.address?.city || data.address?.town || data.address?.village || "";
              if (name) setUserCity(name);
              const normalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              const match = JAPAN_CITIES.find((c) => normalized.includes(c.id));
              if (match) setCity(match.id);
            })
            .catch(() => {});
        },
        () => {},
        { enableHighAccuracy: false, timeout: 8000 }
      );
    }
  }, []);

  const tip = weather ? CITY_TIPS[weather.city?.toLowerCase()] : null;
  const sunriseHour = 5;
  const sunsetHour = 18;
  const isDaytime = weather ? new Date().getHours() >= sunriseHour && new Date().getHours() < sunsetHour : true;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🌤️ Meteorólogo local</h1>
      <p className="text-gray-600 mb-6">Clima actual y previsión para ciudades de Japón.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:border-red-400 focus:outline-none">
          {JAPAN_CITIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {userCity && <span className="text-xs text-gray-400 self-center">📍 Detectada: {userCity}</span>}
      </div>

      {loading && <p className="text-gray-500">Cargando...</p>}

      {weather && !loading && (
        <>
          <div className={`rounded-2xl p-6 mb-6 border ${isDaytime ? "bg-gradient-to-br from-amber-50 to-blue-50 border-amber-200" : "bg-gradient-to-br from-indigo-900 to-slate-800 border-slate-600"}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className={`text-xs font-bold uppercase mb-1 ${isDaytime ? "text-amber-600" : "text-blue-300"}`}>{isDaytime ? "☀️ Ahora" : "🌙 Ahora"}</div>
                <div className={`text-5xl font-bold ${isDaytime ? "text-gray-900" : "text-white"}`}>{Math.round(weather.temp)}°C</div>
                <div className={`text-base capitalize mt-1 ${isDaytime ? "text-gray-600" : "text-blue-200"}`}>{getEmoji(weather.description)} {weather.description}</div>
              </div>
              <div className="text-7xl">{getEmoji(weather.description)}</div>
            </div>

            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${isDaytime ? "text-gray-700" : "text-blue-200"}`}>
              <div className={`rounded-xl p-3 text-center ${isDaytime ? "bg-white/70" : "bg-white/10"}`}>
                <div className="text-lg mb-1">🌡️</div>
                <div className="text-xs">Sensación</div>
                <div className="font-bold">{Math.round(weather.feels_like)}°C</div>
              </div>
              <div className={`rounded-xl p-3 text-center ${isDaytime ? "bg-white/70" : "bg-white/10"}`}>
                <div className="text-lg mb-1">💧</div>
                <div className="text-xs">Humedad</div>
                <div className="font-bold">{weather.humidity}%</div>
              </div>
              <div className={`rounded-xl p-3 text-center ${isDaytime ? "bg-white/70" : "bg-white/10"}`}>
                <div className="text-lg mb-1">💨</div>
                <div className="text-xs">Viento</div>
                <div className="font-bold">{weather.wind} m/s</div>
              </div>
              <div className={`rounded-xl p-3 text-center ${isDaytime ? "bg-white/70" : "bg-white/10"}`}>
                <div className="text-lg mb-1">👕</div>
                <div className="text-xs">Ropa recomendada</div>
                <div className="font-bold text-xs">{getClothingSuggestion(weather.temp)}</div>
              </div>
            </div>
          </div>

          {tip && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100 mb-6">
              <h3 className="font-bold text-blue-900 mb-2">📍 Tips para {JAPAN_CITIES.find((c) => c.id === city)?.name}</h3>
              <div className="space-y-2">
                {tip.map((t, i) => <p key={i} className="text-sm text-blue-800 flex items-start gap-2"><span>{t.icon}</span><span>{t.text}</span></p>)}
              </div>
            </div>
          )}

          {weather.forecast && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">📅 Previsión {weather.forecast.length} días</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {weather.forecast.map((day, i) => (
                  <div key={i} className={`rounded-xl p-3 text-center ${i === 0 ? "bg-red-50 border border-red-100" : "bg-gray-50"}`}>
                    <div className="text-xs font-bold text-gray-700 mb-1">{formatDate(day.date)}</div>
                    <div className="text-3xl mb-1">{getEmoji(day.description)}</div>
                    <div className="text-xs text-gray-500 capitalize mb-1">{day.description}</div>
                    <div className="flex justify-center gap-2 text-sm">
                      <span className="font-bold text-gray-900">{Math.round(day.temp_max)}°</span>
                      <span className="text-gray-400">{Math.round(day.temp_min)}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100 mt-6">
            <h3 className="font-bold text-green-900 mb-2">💡 Qué hacer con este clima</h3>
            <div className="space-y-1 text-sm text-green-800">
              {weather.temp >= 30 && <p>🔥 Mucho calor — evita el sol de 12-15h, lleva agua, usa sombrilla</p>}
              {weather.temp >= 25 && weather.temp < 30 && <p>🌤️ Calor agradable — ideal para pasear todo el día</p>}
              {weather.temp >= 15 && weather.temp < 25 && <p>🍂 Temperatura perfecta — día ideal para explorar</p>}
              {weather.temp < 15 && <p>🧥 Fresco — buen día para onsen, ramen y museos</p>}
              {weather.description.toLowerCase().includes("lluvia") && <p>🌧️ Lleva paraguas (los konbini venden transparentes por 300¥)</p>}
              {weather.description.toLowerCase().includes("nube") && <p>☁️ Sin sol directo = mejor para caminar largas distancias</p>}
              {weather.humidity > 75 && <p>💧 Alta humedad — ropa transpirable, el calor se siente más</p>}
            </div>
          </div>
        </>
      )}

      <SeoContent
        title="Cómo vestir según el clima en Japón"
        paragraphs={[
          "El meteorólogo local te dice la temperatura, pero la sensación térmica en Japón engaña por dos motivos: la humedad en verano (que hace que 30 grados se sientan como 38) y el viento seco en invierno (que enfría los paseos junto al mar). Por eso, más que la temperatura exacta, conviene fijarse en la humedad y la sensación térmica que muestra esta herramienta, junto con la sugerencia de ropa que se actualiza automáticamente.",
          "La primavera y el otoño son de capas: un jersey fino y una chaqueta que puedas quitarte a mediodía. En verano, lo mejor es ropa técnica transpirable, sombrilla y mucha agua; los japoneses usan abanicos y ventiladores portátiles, y los konbini venden bebidas frías a 130-150 yenes. En invierno, calzado cerrado e impermeable, abrigo y bufanda son obligatorios si tu ruta incluye Sapporo o los Alpes.",
          "Otra utilidad de este meteorólogo es planificar las visitas: los templos y jardines de Kioto se disfrutan mucho con cielo nublado, los miradores (Skytree, Shibuya Sky) exigen día despejado, y un día de lluvia es la excusa perfecta para onsen, museos y comida de callejón. Consulta la previsión por la mañana y reorganiza el plan del día en consecuencia.",
        ]}
        faqs={[
          { q: "¿Cuántos grados hay en Tokio en agosto?", a: "Las máximas rondan los 30-35 grados con humedad muy alta. La sensación térmica supera fácilmente los 35 grados. Lleva ropa ligera, gorra y mucha agua, y planifica las visitas al aire libre por la mañana." },
          { q: "¿Llueve mucho en Japón?", a: "La temporada de lluvias (tsuyu) va de junio a mediados de julio, sobre todo en el sur y centro. El resto del año la lluvia es moderada, aunque los tifones pueden traer aguaceros entre agosto y septiembre. Un paraguas plegable nunca sobra." },
          { q: "¿Qué ropa recomiendas para visitar templos en invierno?", a: "Abrigo, bufanda y calzado cerrado. Ten en cuenta que en algunos templos y casas de té te descalzas, así que lleva calcetines gruesos o dos pares si hace mucho frío." },
        ]}
      />
    </div>
  );
}
