"use client";

import { useState } from "react";

interface Reservation {
  name: string;
  icon: string;
  mandatory: boolean;
  howFarAhead: string;
  difficulty: "Fácil" | "Media" | "Difícil" | "Muy difícil";
  platform: string;
  platformUrl: string;
  tips: string[];
  price: string;
  altBooking: string[];
}

const reservations: Reservation[] = [
  {
    name: "Museo Ghibli",
    icon: "🎬",
    mandatory: true,
    howFarAhead: "1-2 meses",
    difficulty: "Muy difícil",
    platform: "官方网站",
    platformUrl: "https://www.ghibli-museum.jp/ticket/",
    tips: [
      "Se venden el día 10 de cada mes a las 10:00 JST",
      "Se agotan en minutos. Entra a la web 5 min antes",
      "Solo se pueden comprar online, no en taquilla",
      "Lunes cerrado. No hay visitas individuales en alguns meses",
      "Si no consigues entrada, hay una tienda Ghibli en Tokyu Hands",
    ],
    price: "1,000 yenes (~6€)",
    altBooking: ["Klook (a veces tiene paquetes)", "Agencias de viaje"],
  },
  {
    name: "TeamLab Borderless / Planets",
    icon: "🎨",
    mandatory: true,
    howFarAhead: "2-4 semanas",
    difficulty: "Media",
    platform: "官方网站 / Klook",
    platformUrl: "https://www.klook.com/search/?aid=128948&q=teamlab+tokyo+tickets",
    tips: [
      "Reserva online con fecha y hora exacta",
      "Fines de semana se agotan antes",
      "Mejor entre semana por la mañana",
      "No puedes reentrar una vez sales",
      "Lleva ropa cómoda (te mojas un poco)",
    ],
    price: "2,200-3,800 yenes (~14-24€)",
    altBooking: ["GetYourGuide", "Klook"],
  },
  {
    name: "Restaurants con estrella Michelin",
    icon: "⭐",
    mandatory: true,
    howFarAhead: "1-3 meses",
    difficulty: "Muy difícil",
    platform: "Tabelog / OpenTable / Phone",
    platformUrl: "https://tabelog.com/en/tokyo/rstLst/?LstSitu=1&svd=20260801&svps=1",
    tips: [
      "Muchos solo aceptan reservas por teléfono en japonés",
      "Usa tu hotel para que llamen por ti",
      "Algunos usan apps como TableCheck o Omaka",
      "Reserva mínimo 1 mes antes para sushi de alto nivel",
      "Si no hay sitio, prueba al mediodía (menos lleno)",
    ],
    price: "Variable (10,000-50,000+ yenes)",
    altBooking: ["Hotel concierge", "TableAll (servicio de reservas)"],
  },
  {
    name: "Experiencia de Té (Chado)",
    icon: "🍵",
    mandatory: false,
    howFarAhead: "1-2 semanas",
    difficulty: "Fácil",
    platform: "GetYourGuide / Klook",
    platformUrl: "https://www.getyourguide.com/kyoto-l96826/?q=tea+ceremony&partner_id=NRWCY1R",
    tips: [
      "Reserva online en inglés sin problema",
      "Hay opciones en Kioto y Tokio",
      "Algunos templos aceptan walk-in",
      "Incluye normalmente el matcha y los dulces",
    ],
    price: "2,000-5,000 yenes (~12-30€)",
    altBooking: ["Klook", "Directamente en templos"],
  },
  {
    name: "Kimono Rental",
    icon: "👘",
    mandatory: false,
    howFarAhead: "1-2 días",
    difficulty: "Fácil",
    platform: "Klook / Walk-in",
    platformUrl: "https://www.klook.com/search/?aid=128948&q=kimono+rental+kyoto",
    tips: [
      "Puedes reservar online el día anterior",
      "Walk-in funciona fuera de temporada alta",
      "Incluye vestido, cinturón y accesorios",
      "Algunos incluyen peinado y maquillaje",
      "Devolver antes de las 17:00-18:00",
    ],
    price: "3,000-10,000 yenes (~18-60€)",
    altBooking: ["Walk-in", "Directamente en la tienda"],
  },
  {
    name: "Experiencia de Katana / Samurai",
    icon: "⚔️",
    mandatory: false,
    howFarAhead: "1 semana",
    difficulty: "Fácil",
    platform: "GetYourGuide",
    platformUrl: "https://www.getyourguide.com/tokyo-l193/?q=samurai+katana+tokyo&partner_id=NRWCY1R",
    tips: [
      "Reserva en inglés sin problema",
      "Incluye instructor y equipo",
      "Algunos tienen option de foto con armadura",
      "Dura 1.5-2 horas",
    ],
    price: "5,000-15,000 yenes (~30-90€)",
    altBooking: ["Klook", "Directamente en el museo"],
  },
  {
    name: "Sumo Wrestling (Torneo)",
    icon: "🤼",
    mandatory: true,
    howFarAhead: "1-2 meses",
    difficulty: "Difícil",
    platform: "Ticket Pia /官方网站",
    platformUrl: "https://sumo.pia.jp/en/",
    tips: [
      "Los torneos son enero, mayo, septiembre (Tokio), marzo (Osaka)",
      "Las entradas se agotan en horas",
      "Compra en Ticket Pia o en el venue el día anterior",
      "Entradas de pie (masu-seki) son las más baratas",
      "Hay sesiones de entrenamiento gratuitas (sumo heya)",
    ],
    price: "200-3,000 yenes (entrenamiento) / 3,000-50,000 (torneo)",
    altBooking: ["Ticket Pia (konbini)", "Entrenamiento de mañana (gratis)"],
  },
  {
    name: "JR Pass (Japan Rail Pass)",
    icon: "🚄",
    mandatory: false,
    howFarAhead: "1-2 semanas",
    difficulty: "Fácil",
    platform: "官方网站 / Agencias",
    platformUrl: "https://www.japan-bullettrain.com/?via=antonio-perez-cortes",
    tips: [
      "Compra online antes del viaje (más barato que en Japón)",
      "Actívalo en el aeropuerto al llegar",
      "7 días: ~50,000¥ | 14 días: ~80,000¥",
      "Solo vale la pena si haces Tokio-Kioto-Osaka",
      "No cubre todos los trenes (excluye Nozomi/Mizuho)",
    ],
    price: "50,000-140,000 yenes (~300-850€)",
    altBooking: ["JR官方网站", "Agencias de viaje"],
  },
  {
    name: "Universal Studios Japan",
    icon: "🎢",
    mandatory: true,
    howFarAhead: "1-2 semanas",
    difficulty: "Media",
    platform: "官方网站",
    platformUrl: "https://www.usj.co.jp/web/en/us/tickets",
    tips: [
      "Compra entrada + Express Pass por separado",
      "Express Pass: evitar colas de 2-3h → 30min",
      "Super Nintendo World necesita Express Pass o reserva",
      "Fines de semana: llenísimo, compra con antelación",
      "Descarga la app de USJ para mapa y tiempos",
    ],
    price: "8,600-15,400 yenes entrada + 7,800-13,800 Express",
    altBooking: ["Klook", "GetYourGuide"],
  },
  {
    name: "Disneyland / DisneySea",
    icon: "🏰",
    mandatory: true,
    howFarAhead: "1-2 meses",
    difficulty: "Difícil",
    platform: "官方网站",
    platformUrl: "https://www.tokyodisneyresort.jp/en/ticket/purchase.html",
    tips: [
      "DisneySea es el más exclusivo del mundo",
      "Compra entrada + Magic Access si quieres más de 1 día",
      "Las atracciones populares se llenan en minutos",
      "Usa el Premier Access para evitar colas (extra)",
      "Llega 1 hora antes de la apertura",
    ],
    price: "7,900-10,900 yenes entrada",
    altBooking: ["No hay alternativa, solo web oficial"],
  },
  {
    name: "Onsen / Ryokan Premium",
    icon: "♨️",
    mandatory: false,
    howFarAhead: "1-4 semanas",
    difficulty: "Media",
    platform: "Booking.com /官方网站",
    platformUrl: "https://www.booking.com/searchresults.html?ss=Ryokan+Japon&aid=3049503",
    tips: [
      "Los ryokan más famosos se llenan meses antes",
      "Temporada alta (sakura, otoño): reserva 2+ meses antes",
      "Algunos onsen no aceptan tatuajes",
      "Pregunta por onsen privados (kashikiri-buro)",
      "Incluye normalmente cena y desayuno (kaiseki)",
    ],
    price: "15,000-80,000+ yenes/noche (~90-480€)",
    altBooking: ["Agoda", "Jalan.net (en japonés)"],
  },
  {
    name: "Monte Fuji (Ascenso)",
    icon: "🗻",
    mandatory: false,
    howFarAhead: "No necesita reserva",
    difficulty: "Media",
    platform: "Sin reserva",
    platformUrl: "https://www.fujisan-climb.jp/",
    tips: [
      "Solo se puede subir julio-septiembre",
      "Estación V: punto de partida (coche/bus desde Tokio)",
      "Subida nocturna para ver el amanecer (goraiko)",
      "Necesitas ropa de abrigo (5°C en la cima)",
      "Hay refugios para dormir a mitad de camino",
      "Reserva refugio si quieres dormir arriba",
    ],
    price: "Gratis (refugio: 8,000-12,000 yenes)",
    altBooking: ["Refugios online", "Bus desde Tokio"],
  },
  {
    name: "Kumano Kodo (Senderismo)",
    icon: "🥾",
    mandatory: false,
    howFarAhead: "1-2 meses (alojamiento)",
    difficulty: "Media",
    platform: "Booking.com /官方网站",
    platformUrl: "https://www.booking.com/searchresults.html?ss=Kumano+Kodo&checkin=2026-01-01&checkout=2026-01-02&aid=3049503",
    tips: [
      "Los albergues se llenan en temporada (primavera/otoño)",
      "Reserva alojamiento por tramos",
      "Hay albergues públicos y privados",
      "Envía equipaje por Yamato (takkyubin)",
      "Niiro: el más famoso, reserve con antelación",
    ],
    price: "5,000-15,000 yenes/noche (albergue)",
    altBooking: ["Booking.com", "Japanican"],
  },
  {
    name: "Cerámica / Ikebana / Caligrafía",
    icon: "🏺",
    mandatory: false,
    howFarAhead: "1 semana",
    difficulty: "Fácil",
    platform: "GetYourGuide / Klook",
    platformUrl: "https://www.getyourguide.com/kyoto-l96826/?q=pottery+workshop&partner_id=NRWCY1R",
    tips: [
      "Reserva online en inglés",
      "Talleres en Kioto, Tokio y Kanazawa",
      "Algunos aceptan walk-in si hay sitio",
      "Incluye materiales y instructor",
    ],
    price: "3,000-8,000 yenes (~18-48€)",
    altBooking: ["Klook", "Walk-in en templos"],
  },
  {
    name: "Alquiler de Bici",
    icon: "🚴",
    mandatory: false,
    howFarAhead: "1-3 días",
    difficulty: "Fácil",
    platform: "Klook / Walk-in",
    platformUrl: "https://www.klook.com/search/?aid=128948&q=bike+rental+kyoto",
    tips: [
      "En Kioto es la mejor forma de moverse",
      "Reserva online para mejor precio",
      "Walk-in funciona fuera de temporada",
      "Incluye casco y candado",
      "Algunos tienen e-bikes",
    ],
    price: "1,000-2,000 yenes/día (~6-12€)",
    altBooking: ["Walk-in", "Tiendas locales"],
  },
  {
    name: "Palillos Personalizados (Hashi)",
    icon: "🥢",
    mandatory: false,
    howFarAhead: "1-2 semanas",
    difficulty: "Fácil",
    platform: "GetYourGuide / Tiendas especializadas",
    platformUrl: "https://www.getyourguide.com/kyoto-l96826/?q=chopsticks+custom&partner_id=NRWCY1R",
    tips: [
      "En Kioto hay tiendas donde tallan tu nombre en kanji en palillos de madera",
      "Algunos talleres te enseñan a hacer tus propios palillos",
      "Los palillos de bambú son los más ligeros, los de madera los más duraderos",
      "Perfecto regalo personalizado para llevar a casa",
      "Tiendas populares: Choppstick Art en Kioto, Hacoa en Tokio",
    ],
    price: "1,500-5,000 yenes (~9-30€)",
    altBooking: ["Walk-in en tiendas de artesanía", "Etsy Japan"],
  },
];

const difficultyColors = {
  "Fácil": "bg-green-100 text-green-700",
  "Media": "bg-yellow-100 text-yellow-700",
  "Difícil": "bg-orange-100 text-orange-700",
  "Muy difícil": "bg-red-100 text-red-700",
};

const bookingTimeline = [
  { when: "3+ meses antes", what: ["Ryokan premium", "Disney/USJ entrada+Express", "Restaurantes Michelin", "Ghibli Museum"] },
  { when: "1-2 meses antes", what: ["JR Pass", "Sumo torneos", "Albergues Kumano Kodo", "Kumano Kodo"] },
  { when: "2-4 semanas antes", what: ["TeamLab", "Hakone Free Pass", "Experiencias culturales"] },
  { when: "1 semana antes", what: ["Kimono rental", "Alquiler de bici", "Talleres (cerámica, té)", "Experiencias samurai"] },
  { when: "Sin reserva", what: ["Templos y santuarios", "Paseos por barrios", "Konbini food", "100-yen shops", "Transporte público"] },
];

export default function ReservationsPage() {
  const [filter, setFilter] = useState<"all" | "mandatory" | "optional">("all");

  const filtered = filter === "all"
    ? reservations
    : filter === "mandatory"
    ? reservations.filter((r) => r.mandatory)
    : reservations.filter((r) => !r.mandatory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📋 Reservas en Japón
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          En Japón, muchas experiencias requieren reserva con antelación.
          Algunas se agotan en minutos. Guía completa de qué reservar y cómo.
        </p>
      </div>

      {/* Booking Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📅 Calendario de Reservas</h2>
        <div className="space-y-4">
          {bookingTimeline.map((item) => (
            <div key={item.when} className="flex items-start gap-4">
              <div className="w-36 flex-shrink-0 text-right">
                <span className="text-sm font-bold text-red-600">{item.when}</span>
              </div>
              <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <div className="flex flex-wrap gap-2">
                {item.what.map((w) => (
                  <span key={w} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-center gap-3 mb-8">
        {[
          { id: "all" as const, label: "📋 Todas" },
          { id: "mandatory" as const, label: "🔴 Obligatorias" },
          { id: "optional" as const, label: "🟢 Opcionales" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === f.id
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Reservations */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((res) => (
          <div
            key={res.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{res.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{res.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {res.mandatory ? (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                      Obligatoria
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                      Opcional
                    </span>
                  )}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColors[res.difficulty]}`}>
                    {res.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="font-semibold">Reservar con:</span> {res.howFarAhead}
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="font-semibold">Precio:</span> {res.price}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 mb-2">🔗 Cómo reservar:</h4>
              <a
                href={res.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              >
                {res.platform} →
              </a>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 mb-4">
              <h4 className="text-xs font-semibold text-amber-600 mb-2">💡 Tips:</h4>
              <ul className="space-y-1">
                {res.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-gray-600">• {tip}</li>
                ))}
              </ul>
            </div>

            {res.altBooking.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-1">Alternativas:</h4>
                <div className="flex flex-wrap gap-1">
                  {res.altBooking.map((alt, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* General Tips */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🎯 Consejos Generales de Reservas
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700">✅ Qué reservar SIEMPRE</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span> Ghibli Museum (se agota en minutos)</li>
              <li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span> Disney/USJ con Express Pass</li>
              <li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span> Restaurantes Michelin</li>
              <li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span> TeamLab (fecha y hora exacta)</li>
              <li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span> Ryokan premium en temporada alta</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700">💡 Tips de booking</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Usa tu hotel como intermediario para reservas por teléfono</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Reserva por la mañana si es posible (menos lleno)</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> GetYourGuide y Klook aceptan cancelación gratuita</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Para restaurantes: pide al hotel que llamen</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Muchas reservas se pueden hacer en inglés online</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Transport affiliate links */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🎫 Reserva tu transporte</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="https://www.japan-bullettrain.com/?via=antonio-perez-cortes" target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition group">
            <div className="text-2xl mb-2">🚄</div>
            <div className="font-bold text-gray-900 group-hover:text-green-600 transition">JR Pass / Shinkansen</div>
            <div className="text-sm text-gray-600 mt-1">Billetes de tren bala al mejor precio.</div>
          </a>
          <a href="https://www.japan-bus-tickets.com/?via=antonio" target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition group">
            <div className="text-2xl mb-2">🚌</div>
            <div className="font-bold text-gray-900 group-hover:text-green-600 transition">Autobuses Japan</div>
            <div className="text-sm text-gray-600 mt-1">Willer Express. Nocturnos baratos y comodos.</div>
          </a>
          <a href="https://www.japan-wireless.com/esim?via=antonio" target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition group">
            <div className="text-2xl mb-2">📱</div>
            <div className="font-bold text-gray-900 group-hover:text-green-600 transition">eSIM Japan Wireless</div>
            <div className="text-sm text-gray-600 mt-1">Datos ilimitados en Japon.</div>
          </a>
          <a href="https://www.airport-taxi.tokyo/en?via=antonio" target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition group">
            <div className="text-2xl mb-2">🚕</div>
            <div className="font-bold text-gray-900 group-hover:text-green-600 transition">Airport Taxi Tokyo</div>
            <div className="text-sm text-gray-600 mt-1">Taxi privado del aeropuerto. Sin estrés con el tren.</div>
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <a
          href="/trip-planner"
          className="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition mr-4"
        >
          🗾 Planificar mi viaje
        </a>
        <a
          href="/events"
          className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition"
        >
          ⛩️ Ver eventos
        </a>
      </div>
    </div>
  );
}
