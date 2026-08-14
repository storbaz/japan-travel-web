import Link from "next/link";

export interface CityData {
  name: string;
  slug: string;
  description: string;
  emoji: string;
  population: string;
  bestTime: string;
  avgCost: string;
  mustSee: { name: string; description: string; free: boolean }[];
  food: { name: string; description: string; price: string }[];
  neighborhoods: { name: string; description: string }[];
  gettingAround: string[];
  faq: { question: string; answer: string }[];
  gygQuery: string;
  bookingSearch: string;
  tiqetsUrl?: string;
}

export default function CityPage({ city }: { city: CityData }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-red-600 hover:text-red-700 text-sm font-medium">← Inicio</Link>
      </div>

      <div className="text-center mb-12">
        <span className="text-6xl mb-4 block">{city.emoji}</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">{city.name}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{city.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{city.population}</div>
          <div className="text-sm text-gray-600">Habitantes</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{city.bestTime}</div>
          <div className="text-sm text-gray-600">Mejor epoca</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{city.avgCost}</div>
          <div className="text-sm text-gray-600">Coste medio/dia</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{city.mustSee.length}+</div>
          <div className="text-sm text-gray-600">Lugares</div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Que ver en {city.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {city.mustSee.map((place, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-gray-900">{place.name}</h3>
                {place.free && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Gratis</span>}
              </div>
              <p className="text-sm text-gray-600 mt-1">{place.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Barrios que visitar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {city.neighborhoods.map((barrio, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900">{barrio.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{barrio.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Donde comer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {city.food.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <span className="text-sm font-medium text-red-600">{item.price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como moverse</h2>
        <ul className="space-y-2">
          {city.gettingAround.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="text-red-500 mt-0.5">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <a href={`https://www.getyourguide.com/${city.slug}/?q=${city.gygQuery}&partner_id=NRWCY1R`} target="_blank" rel="noopener noreferrer sponsored" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="font-bold text-gray-900">Experiencias en {city.name}</div>
          <div className="text-sm text-gray-600 mt-1">Tours y actividades con GetYourGuide</div>
          <div className="text-xs text-blue-600 mt-2">Explorar ↗</div>
        </a>
        <a href={`https://www.booking.com/searchresults.html?ss=${city.bookingSearch}&aid=3049503`} target="_blank" rel="noopener noreferrer sponsored" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
          <div className="text-3xl mb-2">🏨</div>
          <div className="font-bold text-gray-900">Hoteles en {city.name}</div>
          <div className="text-sm text-gray-600 mt-1">Los mejores precios en Booking.com</div>
          <div className="text-xs text-blue-600 mt-2">Ver ofertas ↗</div>
        </a>
        <a href={`https://www.amazon.es/s?k=${encodeURIComponent("guia de viaje " + city.name + " japon")}&tag=viajapp-21`} target="_blank" rel="noopener noreferrer sponsored" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
          <div className="text-3xl mb-2">📦</div>
          <div className="font-bold text-gray-900">Guías y mapa de {city.name}</div>
          <div className="text-sm text-gray-600 mt-1">Productos para tu viaje en Amazon.es</div>
          <div className="text-xs text-red-600 mt-2">Ver productos ↗</div>
        </a>
        <a href={city.tiqetsUrl || "https://www.tiqets.com/en/japan-attractions-z50113/?partner=viajaapp-188875"} target="_blank" rel="noopener noreferrer sponsored" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
          <div className="text-3xl mb-2">🎟️</div>
          <div className="font-bold text-gray-900">Entradas en {city.name}</div>
          <div className="text-sm text-gray-600 mt-1">Atracciones sin colas con Tiqets</div>
          <div className="text-xs text-purple-600 mt-2">Ver entradas ↗</div>
        </a>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes sobre {city.name}</h2>
        <div className="space-y-4">
          {city.faq.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-2">{item.question}</h3>
              <p className="text-gray-600 text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
