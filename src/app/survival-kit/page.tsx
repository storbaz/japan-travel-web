"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { survivalPOIs } from "@/lib/survival-kit-data";
import { CATEGORIES, getCategoryConfig, POICategory } from "@/lib/survival-kit-types";
import ContextGuidePanel from "@/components/ContextGuidePanel";
import NinjaBanners from "@/components/NinjaBanners";
import TiqetsWidget from "@/components/TiqetsWidget";

const SurvivalKitMap = dynamic(() => import("./SurvivalKitMap"), { ssr: false });

const CITIES = [
  { id: "all", name: "Todas las ciudades" },
  { id: "tokyo", name: "Tokio" },
  { id: "kyoto", name: "Kioto" },
  { id: "osaka", name: "Osaka" },
  { id: "nara", name: "Nara" },
  { id: "hiroshima", name: "Hiroshima" },
  { id: "kanazawa", name: "Kanazawa" },
  { id: "nagoya", name: "Nagoya" },
  { id: "hakone", name: "Hakone" },
  { id: "fukuoka", name: "Fukuoka" },
];

const cityNames: Record<string, string> = {
  tokyo: "Tokio", kyoto: "Kioto", osaka: "Osaka", nara: "Nara",
  hiroshima: "Hiroshima", kanazawa: "Kanazawa", nagoya: "Nagoya",
  hakone: "Hakone", fukuoka: "Fukuoka",
};

export default function SurvivalKitPage() {
  const [activeCategories, setActiveCategories] = useState<Set<POICategory>>(new Set());
  const [selectedCity, setSelectedCity] = useState("all");
  const [showList, setShowList] = useState(false);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      () => {},
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  const toggleCategory = (cat: POICategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const toggleAll = () => {
    if (activeCategories.size === CATEGORIES.length) setActiveCategories(new Set());
    else setActiveCategories(new Set(CATEGORIES.map((c) => c.id)));
  };

  const filteredPOIs = useMemo(() => {
    return survivalPOIs.filter((poi) => {
      const catMatch = activeCategories.size === 0 || activeCategories.has(poi.category);
      const cityMatch = selectedCity === "all" || poi.city === selectedCity;
      return catMatch && cityMatch;
    });
  }, [activeCategories, selectedCity]);

  const countsByCity = useMemo(() => {
    const counts: Record<string, number> = {};
    survivalPOIs.forEach((poi) => {
      counts[poi.city] = (counts[poi.city] || 0) + 1;
    });
    return counts;
  }, []);

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    const cityFiltered = survivalPOIs.filter((poi) => selectedCity === "all" || poi.city === selectedCity);
    cityFiltered.forEach((poi) => {
      counts[poi.category] = (counts[poi.category] || 0) + 1;
    });
    return counts;
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Kit de Supervivencia</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Encuentra baños, cajeros, taquillas, farmacias y todo lo que necesitas en Japon. Usa el mapa interactivo para planificar tu ruta.</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}{c.id !== "all" ? ` (${countsByCity[c.id] || 0})` : ""}</option>
              ))}
            </select>
            <button onClick={toggleAll}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">
              {activeCategories.size === CATEGORIES.length ? "Limpiar todo" : "Mostrar todo"}
            </button>
          </div>
          <button onClick={() => setShowList(!showList)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition flex items-center gap-1">
            {showList ? "Ocultar lista" : `Ver lista (${filteredPOIs.length})`}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => {
            const active = activeCategories.has(cat.id);
            const count = countsByCategory[cat.id] || 0;
            return (
              <button key={cat.id} onClick={() => toggleCategory(cat.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border"
                style={{
                  background: active ? cat.bgColor : "white",
                  borderColor: active ? cat.color : "#e5e7eb",
                  color: active ? cat.color : "#6b7280",
                  boxShadow: active ? `0 0 0 1px ${cat.color}` : "none",
                }}>
                <span>{cat.icon}</span><span>{cat.label}</span><span className="text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        <SurvivalKitMap activeCategories={activeCategories} selectedCity={selectedCity} />

        {showList && (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">📍 {filteredPOIs.length} puntos de interes</h3>
            <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
              {filteredPOIs.map((poi) => {
                const config = getCategoryConfig(poi.category);
                return (
                  <div key={poi.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: config.bgColor, color: config.color }}>{config.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800">{poi.name}</div>
                      <div className="text-xs text-gray-500">{poi.description}</div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{cityNames[poi.city] || poi.city}</span>
                  </div>
                );
              })}
              {filteredPOIs.length === 0 && (
                <p className="text-gray-400 text-center py-8">No hay puntos para esta combinacion de filtros.</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Consejos para sobrevivir en Japon</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-start gap-2"><span className="mt-0.5">🚻</span><div><strong>Baños:</strong> Japon tiene los baños publicos mas limpios del mundo. Estan en estaciones, parques y centros comerciales.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5">🏧</span><div><strong>ATM:</strong> 7-Eleven y Japan Post aceptan tarjetas extranjeras. Otros bancos pueden rechazarlas.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5">🔒</span><div><strong>Taquillas:</strong> En todas las estaciones. Precio: 400-800 yen segun tamano. Pago con monedas o IC card.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5">🗑️</span><div><strong>Papeles:</strong> No hay papeleras en la calle. Lleva una bolsa basura. En Japon se recicla todo.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5">💧</span><div><strong>Agua:</strong> El agua del grifo es potable en todo Japon. Lleva tu botella reutilizable.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5">🏪</span><div><strong>Konbini:</strong> 7-Eleven, FamilyMart, Lawson estan en cada cuadra. Son tu mejor amigo: comida, ATM, baño, impresoras.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5">🔋</span><div><strong>Bateria:</strong> CHARGE SPOT alquila power banks por ¥150/30min. Escanea QR, coge la bateria, devuelvela en cualquier estacion.</div></div>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-xl border border-red-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">🌏 Terremotos en Japón — Guía de actuación</h3>
          <p className="text-sm text-gray-600 mb-4">Japón tiene más de 1,500 terremotos al año. La mayoría son imperceptibles. Si sientes uno, mantén la calma y sigue estas pautas:</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-start gap-2"><span className="mt-0.5 text-red-500">🛡️</span><div><strong>Durante el terremoto:</strong> Agáchate, cúbrete la cabeza y sujétate. Aléjate de ventanas y objetos que puedan caer. Métete bajo una mesa o escritorio resistente.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-red-500">🚪</span><div><strong>No corras:</strong> No salgas corriendo. Las salidas pueden estar bloqueadas. Espera a que deje de temblar para moverte con cuidado.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-red-500">🔥</span><div><strong>Fuego:</strong> Si hay gas o fuego, corta el gas y apágalo. Después del terremoto, los incendios son la mayor causa de daños.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-red-500">📱</span><div><strong>Alerta en el móvil:</strong> Todos los móviles en Japón reciben alertas J-ALERT automáticas. No las ignores aunque estén en japonés.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-red-500">🏃</span><div><strong>Evacuación:</strong> Dirígete a un parque o espacio abierto grande. Lleva pasaporte, dinero y tu teléfono. Sigue las indicaciones de las autoridades.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-red-500">🎒</span><div><strong>Kit de emergencia:</strong> Los japoneses tienen una mochila con: agua, linterna, radio, silbato, botiquín, dinero en efectivo, copia del pasaporte. Prepárate una tú también.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-red-500">🌊</span><div><strong>Tsunami:</strong> Si estás cerca de la costa y el terremoto es fuerte, sube a terreno elevado inmediatamente. No esperes instrucciones.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-red-500">🗾</span><div><strong>Apps útiles:</strong> Safety tips (app oficial de turismo), NHK World (noticias en inglés), Japan Shelter (mapa de refugios). Instálalas antes del viaje.</div></div>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-xl border border-cyan-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">📶 Internet en Japón — NINJA WiFi</h3>
          <p className="text-sm text-gray-600 mb-4">Llegar a Japón y no tener internet es el error nº1. Reserva un Pocket WiFi o eSIM antes de viajar y recógelo en el aeropuerto al llegar.</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-start gap-2"><span className="mt-0.5 text-cyan-500">📶</span><div><strong>Pocket WiFi:</strong> Hasta 5 dispositivos a la vez, velocidad 4G LTE, batería para todo el día. Recoge en cualquier aeropuerto o recíbelo en tu hotel. <a href="https://ninjawifi.com?pr_vmaf=mU1dqNuNqM" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-medium hover:underline">Reservar NINJA WiFi →</a></div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-cyan-500">📱</span><div><strong>eSIM / SIM Física:</strong> Si viajas solo, una eSIM o SIM es más barata. Datos ilimitados, activación inmediata. <a href="https://ninjawifi.com?pr_vmaf=mU1dqNuNqM" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-medium hover:underline">Ver planes SIM →</a></div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-cyan-500">🎒</span><div><strong>Recogida en aeropuerto:</strong> Narita, Haneda, Kansai, Chubu, Naha, Fukuoka, New Chitose. Mostradores NINJA WiFi en llegadas.</div></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 text-cyan-500">💰</span><div><strong>Descuento viajero:</strong> Usa el enlace de ViajApp para obtener un 10% de descuento en tu reserva. +10% para ti, +10% para nosotros. <a href="https://ninjawifi.com?pr_vmaf=mU1dqNuNqM" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-medium hover:underline">Reservar con descuento →</a></div></div>
          </div>
          <NinjaBanners />
        </div>
        <div className="mt-6 bg-white rounded-xl border border-purple-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">🎟️ Entradas a atracciones — Tiqets</h3>
          <p className="text-sm text-gray-600 mb-4">Sáltate las colas en TeamLab, la Tokyo Skytree, el acuario de Osaka o los templos de Kioto. Entradas con confirmación inmediata y cambio gratuito en muchas atracciones.</p>
          <div className="grid md:grid-cols-4 gap-3 text-sm">
            <a href="https://www.tiqets.com/en/tokyo-attractions-c72181/?partner=viajaapp-188875" target="_blank" rel="noopener noreferrer sponsored" className="rounded-xl border border-purple-100 p-4 text-center hover:shadow-md transition">
              <div className="text-2xl mb-1">🗼</div>
              <div className="font-bold text-gray-900">Tokio</div>
              <div className="text-xs text-gray-500 mt-1">TeamLab, Skytree, Tokyo Tower</div>
            </a>
            <a href="https://www.tiqets.com/en/kyoto-attractions-c72420/?partner=viajaapp-188875" target="_blank" rel="noopener noreferrer sponsored" className="rounded-xl border border-purple-100 p-4 text-center hover:shadow-md transition">
              <div className="text-2xl mb-1">⛩️</div>
              <div className="font-bold text-gray-900">Kioto</div>
              <div className="text-xs text-gray-500 mt-1">Templos y experiencias culturales</div>
            </a>
            <a href="https://www.tiqets.com/en/osaka-attractions-c28/?partner=viajaapp-188875" target="_blank" rel="noopener noreferrer sponsored" className="rounded-xl border border-purple-100 p-4 text-center hover:shadow-md transition">
              <div className="text-2xl mb-1">🎢</div>
              <div className="font-bold text-gray-900">Osaka</div>
              <div className="text-xs text-gray-500 mt-1">Universal, acuario Kaiyukan</div>
            </a>
            <a href="https://www.tiqets.com/en/japan-attractions-z50113/?partner=viajaapp-188875" target="_blank" rel="noopener noreferrer sponsored" className="rounded-xl border border-purple-100 p-4 text-center hover:shadow-md transition">
              <div className="text-2xl mb-1">🗾</div>
              <div className="font-bold text-gray-900">Todo Japón</div>
              <div className="text-xs text-gray-500 mt-1">Explora todas las atracciones</div>
            </a>
          </div>
          <TiqetsWidget itemCount={4} title="Las más reservadas en Japón" />
        </div>
        <div className="mt-6 bg-white rounded-xl border border-orange-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">🔋 Cargar tu movil en Japon</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-orange-700 mb-2">CHARGE SPOT - Alquiler de Power Banks</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">•</span><div><strong>Precio:</strong> ¥150 por 30 minutos o ¥400 por uso completo (hasta agotar).</div></li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">•</span><div><strong>Como funciona:</strong> Descarga la app CHARGE SPOT (iOS/Android), escanea el QR de la estacion, coge el power bank.</div></li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">•</span><div><strong>Devolver:</strong> Metelo en cualquier estacion CHARGE SPOT. No tienes que devolverlo en la misma.</div></li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">•</span><div><strong>Disponibilidad:</strong> Estaciones en konbini, estaciones de tren, centros comerciales y zonas turisticas.</div></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-700 mb-2">Otras opciones para cargar</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">•</span><div><strong>Konbini:</strong> Algunos 7-Eleven tienen cargadores USB gratuitos.</div></li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">•</span><div><strong>Estaciones de tren:</strong> Enchufes junto a los asientos de espera (Shinkansen y trenes locales).</div></li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">•</span><div><strong>Hoteles:</strong> Siempre hay enchufes. Pide prestado un cargador en recepcion.</div></li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">•</span><div><strong>Tip:</strong> Lleva un power bank propio de 10,000mAh+. En Japon las baterias se agotan rapido por el uso del GPS y mapa.</div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ContextGuidePanel userPos={userPos} visible={showGuide} onClose={() => setShowGuide(false)} />

      {userPos && !showGuide && (
        <button
          onClick={() => setShowGuide(true)}
          className="fixed bottom-6 left-6 z-40 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium text-sm"
        >
          📋 Guia contextual
        </button>
      )}
    </div>
  );
}
