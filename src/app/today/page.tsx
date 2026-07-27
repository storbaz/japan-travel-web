"use client";

import { useState, useEffect, useMemo } from "react";
import { API_URL } from "@/lib/api";

interface Festival {
  name: string;
  name_jp: string;
  season: string;
  months: string[];
  description: string;
  best_cities: string | string[];
  dates_2026: string;
  tips: string[];
}

interface WalletItem {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  code: string;
  date?: string;
}

interface Recommendation {
  icon: string;
  title: string;
  description: string;
  link: string;
  category: string;
  when: string;
}

const PHRASES_OF_THE_DAY = [
  { jp: "おはようございます", romaji: "Ohayou gozaimasu", es: "Buenos días (formal)" },
  { jp: "こんにちは", romaji: "Konnichiwa", es: "Hola (medio día)" },
  { jp: "こんばんは", romaji: "Konbanwa", es: "Buenas tardes/noche" },
  { jp: "ありがとうございます", romaji: "Arigatou gozaimasu", es: "Muchas gracias" },
  { jp: "すみません", romaji: "Sumimasen", es: "Perdón / Disculpe" },
  { jp: "いただきます", romaji: "Itadakimasu", es: "Antes de comer (gracias por la comida)" },
  { jp: "ごちそうさまでした", romaji: "Gochisousama deshita", es: "Después de comer (gracias por el banquete)" },
  { jp: "おやすみなさい", romaji: "Oyasumi nasai", es: "Buenas noches" },
  { jp: "元気ですか", romaji: "Genki desu ka", es: "¿Cómo estás?" },
  { jp: "はい、元気です", romaji: "Hai, genki desu", es: "Sí, estoy bien" },
  { jp: "いくらですか", romaji: "Ikura desu ka", es: "¿Cuánto cuesta?" },
  { jp: "どこですか", romaji: "Doko desu ka", es: "¿Dónde está?" },
  { jp: "トイレはどこですか", romaji: "Toire wa doko desu ka", es: "¿Dónde está el baño?" },
  { jp: "助けてください", romaji: "Tasukete kudasai", es: "Por favor, ayúdeme" },
  { jp: "水をください", romaji: "Mizu wo kudasai", es: "Agua, por favor" },
];

const TIME_RECOMMENDATIONS: { hours: number[]; recs: Recommendation[] }[] = [
  {
    hours: [5, 6, 7],
    recs: [
      { icon: "🌅", title: "Paseo matutino", description: "Los templos están vacíos al amanecer. Perfecto para fotos sin multitudes.", link: "/map", category: "Descubrir", when: "Mañana temprano" },
      { icon: "🏪", title: "Desayuno en konbini", description: "El onigiri y el café de konbini son el desayuno más japonés que existe.", link: "/authentic", category: "Comida", when: "6:00 - 8:00" },
      { icon: "🐟", title: "Mercado de pescado", description: "Los mercados abren temprano. Tsukiji inner market a las 5am.", link: "/authentic", category: "Comida", when: "5:00 - 10:00" },
    ],
  },
  {
    hours: [8, 9, 10, 11],
    recs: [
      { icon: "⛩️", title: "Templos sin colas", description: "Los templos populares se llenan a partir de las 10. Ve temprano.", link: "/map", category: "Descubrir", when: "8:00 - 10:00" },
      { icon: "🎫", title: "Actividades del día", description: "Reserva free tours y actividades para hoy o mañana.", link: "/free-tours", category: "Actividades", when: "Todo el día" },
      { icon: "🚃", title: "Transporte", description: "Evita las horas punta (7:30-9:30). Los trenes están llenísimos.", link: "/transport", category: "Transporte", when: "Evitar 7:30-9:30" },
    ],
  },
  {
    hours: [12, 13, 14],
    recs: [
      { icon: "🍱", title: "Almuerzo japonés", description: "Los set lunch (ランチ) son la mejor relación calidad-precio del día.", link: "/restaurants", category: "Comida", when: "11:30 - 14:00" },
      { icon: "☕", title: "Kissaten retro", description: "Descansa en un kissaten con curry rice y café drip.", link: "/authentic", category: "Descanso", when: "13:00 - 15:00" },
      { icon: "🛍️", title: "Compras", description: "Las tiendas abren a las 10. Los mejores descuentos son por la tarde.", link: "/shopping", category: "Compras", when: "10:00 - 20:00" },
    ],
  },
  {
    hours: [15, 16, 17],
    recs: [
      { icon: "🌸", title: "Paseo tranquilo", description: "La tarde es perfecta para pasear por barrios como Yanaka o Kagurazaka.", link: "/authentic", category: "Descubrir", when: "15:00 - 17:00" },
      { icon: "♨️", title: "Onsen de tarde", description: "Los sentos están vacíos por la tarde. Relax total por 500¥.", link: "/authentic", category: "Relax", when: "15:00 - 17:00" },
      { icon: "💳", title: "Revisa tu wallet", description: "¿Tienes tickets o reservas para esta noche? Revísalos aquí.", link: "/wallet", category: "Organización", when: "Ahora" },
    ],
  },
  {
    hours: [18, 19, 20],
    recs: [
      { icon: "🏮", title: "Cena en izakaya", description: "Los izakaya de barrio abren a las 17:00. Los mejores se llenan a las 19:00.", link: "/authentic", category: "Comida", when: "18:00 - 21:00" },
      { icon: "🎤", title: "Karaoke nocturno", description: "El nomihodai (ilimitado) de 2 horas cuesta 1500-2000¥.", link: "/authentic", category: "Noche", when: "19:00 - 23:00" },
      { icon: "🌙", title: "Paseo nocturno", description: "Los distritos de neón son impresionantes de noche. Shibuya, Dotonbori.", link: "/map", category: "Descubrir", when: "20:00 - 23:00" },
    ],
  },
  {
    hours: [21, 22, 23, 0, 1, 2, 3, 4],
    recs: [
      { icon: "🎰", title: "Pachinko", description: "Abierto 24h. Los locales van de noche a relajarse.", link: "/authentic", category: "Noche", when: "24 horas" },
      { icon: "🍜", title: "Ramen de madrugada", description: "Los ramen bars están llenos de trabajadores después del trabajo.", link: "/restaurants", category: "Comida", when: "22:00 - 2:00" },
      { icon: "🚃", title: "Último tren", description: "El último tren suele ser a la 0:00. ¡No lo pierdas!", link: "/transport", category: "Transporte", when: "~0:00" },
    ],
  },
];

const WEATHER_TIPS: Record<string, string[]> = {
  lluvia: ["Lleva paraguas transparente (los usan los japoneses)", "Los konbini venden paraguas baratos", "Visita museos o centros comerciales"],
  nieve: ["Calzado impermeable es imprescindible", "Los onsen son perfectos con nieve", "Cuidado al caminar, las calles resbalan"],
  caluroso: ["Bebe agua constantemente", "Usa protector solar", "Los konbini tienen bebidas heladas"],
  frio: ["Vístete en capas", "Los convenience store tienen calentadores descartables", "El caldo caliente reconforta"],
  ideal: ["Día perfecto para pasear", "Aprovecha para caminar mucho", "Lleva una chaqueta ligera por si refresca"],
};

const WEATHER_SUGGESTIONS: Record<string, { icon: string; title: string; description: string; link: string }[]> = {
  Rain: [
    { icon: "🏛️", title: "Museos y galerías", description: "Museo Nacional de Tokio, TeamLab, Ghibli Museum. Día perfecto para interior.", link: "/map" },
    { icon: "♨️", title: "Onsen bajo la lluvia", description: "Nada más relajante que un baño termal mientras llueve.", link: "/authentic" },
    { icon: "🛍️", title: "Compras cubierto", description: "Centros comerciales y地下街 (pasos subterráneos) conectados.", link: "/shopping" },
    { icon: "🍜", title: "Ramen day", description: "El día perfecto para un ramen caliente.", link: "/restaurants" },
  ],
  Clouds: [
    { icon: "🌸", title: "Paseo sin sol", description: "Nubes = sin calor excesivo. Ideal para caminar todo el día.", link: "/map" },
    { icon: "⛩️", title: "Templos sin multitud", description: "Los días nublados atraen menos turistas.", link: "/map" },
    { icon: "📸", title: "Fotografía suave", description: "La luz nublada es perfecta para fotos sin sombras duras.", link: "/map" },
  ],
  Clear: [
    { icon: "🗼", title: "Vistas panorámicas", description: "Tokyo Skytree, Mt. Fuji visible. Día perfecto para miradores.", link: "/map" },
    { icon: "🌸", title: "Paseo al aire libre", description: "Parques, jardines, caminar por barrios.", link: "/authentic" },
    { icon: "🌅", title: "Atardecer épico", description: "Sal a las 17:00 para ver el atardecer desde un puente o mirador.", link: "/map" },
  ],
  Snow: [
    { icon: "♨️", title: "Onsen con nieve", description: "Los ryokan con onsen al aire libre en nieve son mágicos.", link: "/authentic" },
    { icon: "⛄", title: "Paseo nevado", description: "Los templos cubiertos de nieve son espectaculares.", link: "/map" },
    { icon: "🍵", title: "Caliente en konbini", description: "Oden, café caliente, matcha. Reconfortante.", link: "/authentic" },
  ],
  Drizzle: [
    { icon: "☂️", title: "Paraguas y paseo", description: "Lluvia ligera = paraguas y a pasear. Los japoneses no paran por lluvia.", link: "/map" },
    { icon: "🏪", title: "Konbini hop", description: "Recorre konbini probando snacks diferentes.", link: "/authentic" },
  ],
};

export default function TodayPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [wallet, setWallet] = useState<WalletItem[]>([]);
  const [city, setCity] = useState("Tu ubicación");
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: number; description: string; main: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      setWallet(JSON.parse(localStorage.getItem("viajapp_wallet") || "[]"));
    } catch { /* empty */ }

    const detectCityAndWeather = (lat: number, lng: number) => {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`)
        .then((r) => r.json())
        .then((data) => {
          const cityName = data.address?.city || data.address?.town || data.address?.village || data.address?.state || "Tu ubicación";
          setCity(cityName);
          localStorage.setItem("viajapp_city", cityName);

          const apiCity = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const weatherCityMap: Record<string, string> = {
            "tokyo": "tokyo", "osaka": "osaka", "kyoto": "kyoto", "hiroshima": "hiroshima",
            "sapporo": "sapporo", "fukuoka": "fukuoka", "nagoya": "nagoya", "naha": "naha",
            "nara": "nara", "kobe": "kobe", "yokohama": "yokohama", "hakone": "hakone",
            "kanazawa": "kanazawa", "takayama": "takayama", "nikko": "nikko",
          };
          const weatherCity = weatherCityMap[apiCity] || "tokyo";
          fetch(`${API_URL}/v1/weather/${weatherCity}`)
            .then((r) => r.json())
            .then((d) => {
              if (d.current) setWeather({ temp: d.current.temp, description: d.current.description, main: d.current.main || d.current.description });
            })
            .catch(() => {});
        })
        .catch(() => {});
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => detectCityAndWeather(pos.coords.latitude, pos.coords.longitude),
        () => setCity(localStorage.getItem("viajapp_city") || "Tu ubicación"),
        { enableHighAccuracy: false, timeout: 8000 }
      );
    } else {
      setCity(localStorage.getItem("viajapp_city") || "Tu ubicación");
    }

    fetch(`${API_URL}/v1/events/festivals`)
      .then((r) => r.json())
      .then((d) => setFestivals(d.festivals || []))
      .catch(() => {});

    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = now.getHours();
  const dayPhrase = PHRASES_OF_THE_DAY[currentHour % PHRASES_OF_THE_DAY.length];

  const currentRecs = useMemo(() => {
    const block = TIME_RECOMMENDATIONS.find((b) => b.hours.includes(currentHour));
    return block?.recs || TIME_RECOMMENDATIONS[0].recs;
  }, [currentHour]);

  const activeFestivals = useMemo(() => {
    const month = now.toLocaleString("es-ES", { month: "long" }).toLowerCase();
    return festivals.filter((f) => f.months.some((m) => m.toLowerCase().includes(month)));
  }, [festivals]);

  const upcomingWallet = useMemo(() => {
    return wallet
      .filter((w) => w.date && new Date(w.date) >= new Date(now.toDateString()))
      .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
      .slice(0, 3);
  }, [wallet, now]);

  const getGreeting = () => {
    if (currentHour < 6) return "Buenas noches";
    if (currentHour < 12) return "Buenos días";
    if (currentHour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const getWeatherTip = () => {
    const h = currentHour;
    if (h >= 6 && h < 10) return WEATHER_TIPS.ideal;
    if (h >= 10 && h < 16) return WEATHER_TIPS.caluroso;
    if (h >= 16 && h < 20) return WEATHER_TIPS.ideal;
    return WEATHER_TIPS.frio;
  };

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📱 Hoy en Japón</h1>
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{getGreeting()} 👋</h1>
          <span className="text-sm text-gray-500">{now.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</span>
        </div>
        <p className="text-gray-600">Tu día en Japón — {city}</p>
      </div>

      {/* Phrase of the day */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 mb-6 border border-red-100">
        <div className="text-xs font-bold text-red-600 mb-2 uppercase">🗣️ Frase del momento ({currentHour}:00)</div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{dayPhrase.jp}</div>
        <div className="text-sm text-gray-500 mb-1">{dayPhrase.romaji}</div>
        <div className="text-sm text-gray-700">{dayPhrase.es}</div>
      </div>

      {/* Weather card */}
      {weather && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-bold text-blue-600 mb-1 uppercase">🌤️ Clima en {city}</div>
              <div className="text-3xl font-bold text-gray-900">{weather.temp}°C</div>
              <div className="text-sm text-gray-600 capitalize">{weather.description}</div>
            </div>
            <div className="text-5xl">
              {weather.main === "Rain" || weather.description.toLowerCase().includes("lluvia") ? "🌧️" :
               weather.main === "Clouds" || weather.description.toLowerCase().includes("nub") ? "☁️" :
               weather.main === "Clear" || weather.description.toLowerCase().includes("despej") ? "☀️" :
               weather.main === "Snow" || weather.description.toLowerCase().includes("nieve") ? "❄️" :
               weather.main === "Drizzle" ? "🌦️" : "🌤️"}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(WEATHER_SUGGESTIONS[weather.main] || WEATHER_SUGGESTIONS.Clouds).slice(0, 3).map((s, i) => (
              <a key={i} href={s.link} className="bg-white rounded-xl p-3 hover:shadow-md transition block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-bold text-sm text-gray-900">{s.title}</span>
                </div>
                <div className="text-xs text-gray-600">{s.description}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">⚡ Acceso rápido</h2>
          <div className="grid grid-cols-2 gap-2">
            <a href="/translator" className="p-3 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition">
              <div className="text-xl mb-1">🌐</div>
              <div className="text-xs font-medium text-blue-800">Traductor</div>
            </a>
            <a href="/map" className="p-3 bg-green-50 rounded-xl text-center hover:bg-green-100 transition">
              <div className="text-xl mb-1">🗺️</div>
              <div className="text-xs font-medium text-green-800">Mapa</div>
            </a>
            <a href="/wallet" className="p-3 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition">
              <div className="text-xl mb-1">💳</div>
              <div className="text-xs font-medium text-purple-800">Wallet</div>
            </a>
            <a href="/emergency" className="p-3 bg-red-50 rounded-xl text-center hover:bg-red-100 transition">
              <div className="text-xl mb-1">🚨</div>
              <div className="text-xs font-medium text-red-800">Emergencia</div>
            </a>
          </div>
        </div>

        {/* Today's tip */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">💡 Tip para ahora</h2>
          <ul className="space-y-2">
            {getWeatherTip().map((tip, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-3 text-lg">🎯 Qué hacer ahora ({currentHour}:00)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {currentRecs.map((rec, i) => (
            <a key={i} href={rec.link} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition block">
              <div className="text-2xl mb-2">{rec.icon}</div>
              <div className="font-bold text-gray-900 text-sm">{rec.title}</div>
              <div className="text-xs text-gray-500 mt-1">{rec.description}</div>
              <div className="text-[11px] text-blue-600 mt-2 font-medium">{rec.when} →</div>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Active festivals */}
        {activeFestivals.length > 0 && (
          <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-5 border border-pink-100">
            <h2 className="font-bold text-gray-900 mb-3">⛩️ Festivales activos</h2>
            <div className="space-y-2">
              {activeFestivals.slice(0, 3).map((f, i) => (
                <div key={i} className="bg-white rounded-lg p-3">
                  <div className="font-medium text-gray-900 text-sm">{f.name}</div>
                  <div className="text-xs text-gray-500">{f.dates_2026}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming wallet items */}
        {upcomingWallet.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
            <h2 className="font-bold text-gray-900 mb-3">💳 Próximos en tu wallet</h2>
            <div className="space-y-2">
              {upcomingWallet.map((w) => (
                <a key={w.id} href="/wallet" className="bg-white rounded-lg p-3 block hover:shadow-sm transition">
                  <div className="font-medium text-gray-900 text-sm">{w.title}</div>
                  <div className="text-xs text-gray-500">
                    {w.date && new Date(w.date).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })}
                    {w.subtitle && ` · ${w.subtitle}`}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Last minute */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100 mb-6">
        <h2 className="font-bold text-gray-900 mb-3">⚡ Último minuto — Disponible hoy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="https://www.getyourguide.com/tokyo-l193/?q=same+day&partner_id=NRWCY1R" target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-xl p-4 hover:shadow-md transition block">
            <div className="text-sm font-bold text-gray-900">🎯 Actividades disponibles hoy en Tokio</div>
            <div className="text-xs text-gray-500 mt-1">Tours y experiencias que puedes reservar ya</div>
            <div className="text-xs text-green-600 mt-2 font-medium">Explorar en GYG →</div>
          </a>
          <a href="https://www.getyourguide.com/osaka-l1204/?q=same+day&partner_id=NRWCY1R" target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-xl p-4 hover:shadow-md transition block">
            <div className="text-sm font-bold text-gray-900">🎯 Actividades disponibles hoy en Osaka</div>
            <div className="text-xs text-gray-500 mt-1">Reserva sin esperar, experencia instantánea</div>
            <div className="text-xs text-green-600 mt-2 font-medium">Explorar en GYG →</div>
          </a>
          <a href="/free-tours" className="bg-white rounded-xl p-4 hover:shadow-md transition block">
            <div className="text-sm font-bold text-gray-900">🆓 Free tours de hoy</div>
            <div className="text-xs text-gray-500 mt-1">Tours gratuitos con guías locales</div>
            <div className="text-xs text-blue-600 mt-2 font-medium">Ver free tours →</div>
          </a>
          <a href="/restaurants" className="bg-white rounded-xl p-4 hover:shadow-md transition block">
            <div className="text-sm font-bold text-gray-900">🍽️ Restaurantes cercanos</div>
            <div className="text-xs text-gray-500 mt-1">Busca por zona y tipo de comida</div>
            <div className="text-xs text-orange-600 mt-2 font-medium">Ver restaurantes →</div>
          </a>
        </div>
      </div>

      {/* Useful phrases quick access */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-3">🗣️ Frases útiles de hoy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {PHRASES_OF_THE_DAY.slice(0, 6).map((p, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3">
              <div className="font-bold text-gray-900 text-sm">{p.jp}</div>
              <div className="text-xs text-gray-500">{p.romaji}</div>
              <div className="text-xs text-gray-600">{p.es}</div>
            </div>
          ))}
        </div>
        <a href="/phrases" className="block text-center text-sm text-blue-600 font-medium mt-3 hover:underline">
          Ver todas las frases →
        </a>
      </div>
    </div>
  );
}
