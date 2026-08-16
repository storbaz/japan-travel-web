"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import { SkeletonCards } from "@/components/Skeleton";
import SeoContent from "@/components/SeoContent";

const cities = [
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Osaka", lat: 34.6937, lon: 135.5023 },
  { name: "Kyoto", lat: 35.0116, lon: 135.7681 },
  { name: "Hiroshima", lat: 34.3853, lon: 132.4553 },
  { name: "Sapporo", lat: 43.0621, lon: 141.3544 },
  { name: "Fukuoka", lat: 33.5902, lon: 130.4017 },
  { name: "Nagoya", lat: 35.1815, lon: 136.9066 },
  { name: "Okinawa", lat: 26.3344, lon: 127.8056 },
  { name: "Nara", lat: 34.6851, lon: 135.8048 },
];

interface WeatherData {
  city: string;
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  wind: number;
  forecast: Array<{
    date: string;
    temp_min: number;
    temp_max: number;
    description: string;
    icon: string;
  }>;
}

export default function WeatherPage() {
  const [selectedCity, setSelectedCity] = useState("Tokyo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetch(`${API_URL}/v1/weather/${cityName.toLowerCase()}`).then((r) => r.json());
      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data);
      }
    } catch {
      setError("No se pudo obtener el clima");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🌤️ Clima</h1>
      <p className="text-gray-600 mb-8">Pronostico del tiempo por ciudad</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {cities.map((c) => (
          <button key={c.name} onClick={() => setSelectedCity(c.name)} className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCity === c.name ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {c.name}
          </button>
        ))}
      </div>

      {loading ? (
        <SkeletonCards count={3} />
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : weather ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">{weather.city}</h2>
                <div className="text-6xl font-bold mt-2">{Math.round(weather.temp)}°C</div>
                <div className="text-blue-100 mt-1">Sensacion: {Math.round(weather.feels_like)}°C</div>
              </div>
              <div className="text-right">
                <div className="text-7xl">{weather.icon}</div>
                <div className="text-lg mt-2 capitalize">{weather.description}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 text-blue-100">
              <div>💧 Humedad: {weather.humidity}%</div>
              <div>💨 Viento: {weather.wind} m/s</div>
            </div>
          </div>

          {weather.forecast && weather.forecast.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Proximos dias</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {weather.forecast.map((day, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                    <div className="text-sm text-gray-500">{day.date}</div>
                    <div className="text-3xl my-2">{day.icon}</div>
                    <div className="font-bold">{Math.round(day.temp_max)}°</div>
                    <div className="text-sm text-gray-500">{Math.round(day.temp_min)}°</div>
                    <div className="text-xs text-gray-600 mt-1 capitalize">{day.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      <SeoContent
        title="El clima en Japón por temporada"
        paragraphs={[
          "El clima de Japón tiene cuatro estaciones muy marcadas, y cada una cambia por completo la experiencia de viaje. La primavera (marzo-mayo) es la época favorita por los cerezos en flor y las temperaturas suaves de 15-22 grados, pero es también la más concurrida. El verano (junio-agosto) empieza con la temporada de lluvias (tsuyu) en junio y sigue con calor y humedad intensos en julio y agosto, con festivales como el Gion Matsuri de Kioto.",
          "El otoño (septiembre-noviembre) regala cielos despejados y los colores rojos de los arces entre mediados de octubre y finales de noviembre; es la mejor ventana si buscas clima seco y paisajes espectaculares. El invierno (diciembre-febrero) es frío y seco: en Tokio no suele nevar, pero Sapporo acumula varios metros y celebra su famoso festival de nieve en febrero. En los Alpes japoneses se puede esquiar de primera.",
          "Ten en cuenta también los tifones, que suelen afectar a la costa del Pacífico entre agosto y septiembre, y la diferencia entre Tokio (sujeta a tormentas) y Okinawa (subtropical, con veranos larguísimos). Esta herramienta te muestra la previsión real de cada ciudad para que elijas el momento ideal o ajustes tu equipaje. Recuerda que en otoño y primavera el truco es vestir por capas: los días cálidos dan paso a noches frescas.",
        ]}
        faqs={[
          { q: "¿Cuál es la mejor época para viajar a Japón?", a: "Finales de marzo a mediados de abril (sakura) y octubre-noviembre (otoño) son las mejores por clima. Si buscas precios bajos, mayo, septiembre y los primeros días de diciembre ofrecen buen tiempo con menos multitudes." },
          { q: "¿Es verdad que el verano en Japón es insoportable?", a: "Julio y agosto son húmedos y calurosos, con máximas de 30-35 grados en Tokio y Kioto. Los japoneses lo afrontan con ventiladores portátiles y bebidas frías de konbini. Aun así, es temporada de fuegos artificiales y festivales espectaculares." },
          { q: "¿Necesito ropa de invierno en diciembre?", a: "Sí. Tokio y Kioto rondan los 5-10 grados en enero, y Sapporo o Hakodate bajan de cero. Lleva abrigo, guantes y calzado cerrado. La ventaja es que en invierno hay menos turistas y los onsen se disfrutan al máximo." },
        ]}
      />
    </div>
  );
}
