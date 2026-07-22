"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useExchangeRate, yenToEur } from "@/hooks/useExchangeRate";

const places: Record<string, {
  name: string;
  city: string;
  type: string;
  description: string;
  address: string;
  hours: string;
  price: string;
  tips: string[];
  mapQuery: string;
  gygLink?: string;
  bookingLink?: string;
}> = {
  "senso-ji": {
    name: "Senso-ji",
    city: "Tokio",
    type: "Templo",
    description: "El templo mas antiguo de Tokio, fundado en 645 d.C. El torii Kaminarimon y la calle Nakamise son iconicos.",
    address: "2-3-1 Asakusa, Taito-ku, Tokio",
    hours: "Templo: 24h. Recinto principal: 6:00-17:00",
    price: "Gratis",
    tips: ["Ve temprano (antes de 8am) para evitar multitudes", "Los souvenirs de Nakamise son caros: busca en calles laterales", "El templo iluminado de noche es espectacular"],
    mapQuery: "Senso-ji Temple Tokyo",
  },
  "fushimi-inari": {
    name: "Fushimi Inari Taisha",
    city: "Kioto",
    type: "Santuario",
    description: "Mas de 10,000 torii naranjas que cubren un sendero de montaña. El hike completo dura 2-3 horas.",
    address: "68 Fukakusa Yabunouchicho, Fushimi-ku, Kioto",
    hours: "24h (recinto principal hasta 18:00)",
    price: "Gratis",
    tips: ["El recorrido completo tarda 2-3 horas", "La mitad del camino ya es impresionante", "Los ramen del pie de la montana son excelentes"],
    mapQuery: "Fushimi Inari Taisha Kyoto",
  },
  "shibuya-crossing": {
    name: "Shibuya Crossing",
    city: "Tokio",
    type: "Atraccion",
    description: "El cruce peatonal mas famoso del mundo. Hasta 3,000 personas cruzan a la vez.",
    address: "Shibuya, Tokio",
    hours: "24h",
    price: "Gratis",
    tips: ["Ve al Starbucks del Shibuya Sky para ver desde arriba", "Shibuya Sky (mirador) vale la pena", "La estatua de Hachiko esta al lado"],
    mapQuery: "Shibuya Crossing Tokyo",
  },
  "arashiyama-bamboo": {
    name: "Bosque de Bambu de Arashiyama",
    city: "Kioto",
    type: "Naturaleza",
    description: "Un sendero entre bambues gigantes que crean un efecto hipnotico. Imprescindible en Kioto.",
    address: "Sagaogurayama Tabuchiyamacho, Ukyo-ku, Kioto",
    hours: "24h",
    price: "Gratis",
    tips: ["Ve antes de las 8am para evitar multitudes", "El mejor momento es cuando sopla el viento", "Combina con el Puente Togetsukyo y el Monkey Park"],
    mapQuery: "Arashiyama Bamboo Grove Kyoto",
  },
  "dotonbori": {
    name: "Dotonbori",
    city: "Osaka",
    type: "Barrio",
    description: "La calle mas famosa de Osaka: neones gigantes, el Glico Man y la mejor street food de Japon.",
    address: "Dotonbori, Chuo-ku, Osaka",
    hours: "24h (restaurantes hasta tarde)",
    price: "Gratis (comida desde ¥500)",
    tips: ["Prueba takoyaki en Wanaka o Kukuru", "El Glico Man es mejor de noche", "Evita los restaurantes con colas enormes: hay alternativas igual de buenas"],
    mapQuery: "Dotonbori Osaka",
  },
};

export default function PlacePage() {
  const { slug } = useParams();
  const { rate } = useExchangeRate();
  const place = places[slug as string];

  if (!place) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lugar no encontrado</h1>
        <p className="text-gray-600 mb-6">Este lugar no esta disponible aun.</p>
        <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-red-600 hover:text-red-700 text-sm font-medium mb-6 inline-block">← Inicio</Link>

      <article>
        <div className="mb-6">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-700">{place.type}</span>
          <span className="text-xs text-gray-400 ml-3">{place.city}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{place.name}</h1>
        <p className="text-gray-600 text-lg mb-8">{place.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-1">Direccion</h3>
            <p className="text-sm text-gray-600">{place.address}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-1">Horario</h3>
            <p className="text-sm text-gray-600">{place.hours}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-1">Precio</h3>
            <p className="text-sm text-gray-600">{place.price}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-1">Ubicacion</h3>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Ver en Google Maps ↗</a>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Consejos</h2>
          <ul className="space-y-2">
            {place.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-500 mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
            <div className="text-3xl mb-2">🗺️</div>
            <div className="font-bold text-gray-900">Google Maps</div>
            <div className="text-xs text-blue-600 mt-1">Abrir ↗</div>
          </a>
          {place.gygLink && (
            <a href={place.gygLink} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-bold text-gray-900">Experiencias</div>
              <div className="text-xs text-blue-600 mt-1">GetYourGuide ↗</div>
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
