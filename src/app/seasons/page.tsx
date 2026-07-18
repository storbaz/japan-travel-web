"use client";

const seasons = [
  {
    name: "Primavera",
    months: "Marzo - Mayo",
    icon: "🌸",
    color: "from-pink-400 to-rose-500",
    temp: "10-22°C",
    highlights: ["Sakura (cerezos en flor)", "Hanami (picnic bajo los cerezos)", "Festivales de primavera", "Temperatura perfecta"],
    events: [
      { name: "Sakura Season", when: "Marzo-Abril", where: "Todo Japón", desc: "Los cerezos florecen de sur a norte. Tokio: finales de marzo. Kioto: principio de abril." },
      { name: "Hanami", when: "Abril", where: "Parques de Tokio", desc: "Picnic tradicional bajo los cerezos. Comida, sake y amigos." },
      { name: "Takayama Spring Festival", when: "Abril", where: "Takayama", desc: "Uno de los festivales más bonitos de Japón. Carrozas decoradas." },
    ],
    bestFor: "Perfecta para primera visita. Temperatura agradable, cerezos, multitudes moderadas.",
    pros: ["Sakura espectacular", "Temperatura ideal", "Festivales bonitos"],
    cons: ["Más caro (temporada alta)", "Hoteles llenos", "Multitudes en Tokio"],
  },
  {
    name: "Verano",
    months: "Junio - Agosto",
    icon: "☀️",
    color: "from-yellow-400 to-orange-500",
    temp: "25-35°C",
    highlights: ["Fuegos artificiales (hanabi)", "Matsuri (festivales)", "Playas de Okinawa", "Montañas frescas"],
    events: [
      { name: "Hanabi Festivals", when: "Julio-Agosto", where: "Todo Japón", desc: "Fuegos artificiales espectaculares. Sumida River (Tokio), Atami, Nagaoka." },
      { name: "Gion Matsuri", when: "Julio", where: "Kioto", desc: "El festival más famoso de Kioto. carrozas gigantes, yukata, comida callejera." },
      { name: "Obon", when: "Agosto", where: "Todo Japón", desc: "Semana de vacaciones. Los japoneses vuelven a casa. Bon Odori (danzas)." },
    ],
    bestFor: "Ideal para festivales, playas y vida nocturna. Evita Tokio si no soportas el calor.",
    pros: ["Festivales increíbles", "Días largos", "Playas de Okinawa", "Vida nocturna"],
    cons: ["Calor extremo (35°C)", "Humedad alta", "Lluvia (tsuyu en junio)", "Multitudes en Obon"],
  },
  {
    name: "Otoño",
    months: "Septiembre - Noviembre",
    icon: "🍁",
    color: "from-red-400 to-orange-600",
    temp: "12-25°C",
    highlights: ["Koyo (hojas rojas)", "Temperatura perfecta", "Comida de temporada", "Menos multitudes que primavera"],
    events: [
      { name: "Koyo (Momijigari)", when: "Octubre-Noviembre", where: "Kioto, Nikko, Hakone", desc: "Las hojas cambian a rojo y dorado. Los templos parecen de cuento." },
      { name: "Jidai Matsuri", when: "Octubre", where: "Kioto", desc: "Festival histórico con 2,000 personas vestidas de época." },
      { name: "Shichi-Go-San", when: "Noviembre", where: "Templos", desc: "Niños vestidos de kimono visitan el templo. Muy fotogénico." },
    ],
    bestFor: "La mejor época para muchos viajeros. Koyo, comida, temperatura perfecta.",
    pros: ["Koyo espectacular", "Temperatura ideal", "Menos turistas", "Comida de temporada"],
    cons: ["Octubre puede ser lluvioso", "Algo más caro que invierno"],
  },
  {
    name: "Invierno",
    months: "Diciembre - Febrero",
    icon: "❄️",
    color: "from-blue-400 to-cyan-500",
    temp: "0-10°C",
    highlights: ["Nieve en Japón (esquí)", "Onsen calientes", "Iluminaciones navideñas", "Menos turistas"],
    events: [
      { name: "Sapporo Snow Festival", when: "Febrero", where: "Sapporo", desc: "Esculturas de nieve gigantes. Uno de los festivales más increíbles del mundo." },
      { name: "Iluminaciones Navideñas", when: "Diciembre", where: "Tokio, Osaka", desc: "Millones de luces LED. Marunouchi (Tokio), Midosuji (Osaka)." },
      { name: "Oshogatsu (Año Nuevo)", when: "31 Dic - 3 Ene", where: "Todo Japón", desc: "Los japoneses celebran en templos. Ceremonia de la campana (joya-no-kane)." },
    ],
    bestFor: "Ideal para esquí, onsen y ahorrar dinero. Menos turistas, precios bajos.",
    pros: ["Esquí espectacular (Niseko, Hakuba)", "Onsen mejor en invierno", "Barato", "Poca multitud"],
    cons: ["Frío (0-10°C)", "Algunos templos cerrados", "Días cortos", "28-30 Dic muchos negocios cerrados"],
  },
];

const monthlyTemps: Record<string, { tokio: string; osaka: string; sapporo: string; okinawa: string }> = {
  Enero: { tokio: "5-10°C", osaka: "4-9°C", sapporo: "-6-(-1)°C", okinawa: "17-21°C" },
  Febrero: { tokio: "5-10°C", osaka: "4-10°C", sapporo: "-5-1°C", okinawa: "17-21°C" },
  Marzo: { tokio: "9-14°C", osaka: "8-14°C", sapporo: "-1-5°C", okinawa: "19-22°C" },
  Abril: { tokio: "14-19°C", osaka: "13-19°C", sapporo: "4-11°C", okinawa: "21-24°C" },
  Mayo: { tokio: "18-23°C", osaka: "18-24°C", sapporo: "9-16°C", okinawa: "23-26°C" },
  Junio: { tokio: "21-25°C", osaka: "22-27°C", sapporo: "13-19°C", okinawa: "25-28°C" },
  Julio: { tokio: "25-30°C", osaka: "25-32°C", sapporo: "17-24°C", okinawa: "28-32°C" },
  Agosto: { tokio: "26-31°C", osaka: "26-33°C", sapporo: "18-25°C", okinawa: "28-31°C" },
  Septiembre: { tokio: "22-27°C", osaka: "22-28°C", sapporo: "14-20°C", okinawa: "26-29°C" },
  Octubre: { tokio: "17-22°C", osaka: "16-22°C", sapporo: "8-14°C", okinawa: "24-27°C" },
  Noviembre: { tokio: "12-17°C", osaka: "11-17°C", sapporo: "2-7°C", okinawa: "21-24°C" },
  Diciembre: { tokio: "7-12°C", osaka: "6-11°C", sapporo: "-3-2°C", okinawa: "18-22°C" },
};

export default function SeasonsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🌸 Estaciones en Japón
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Japón tiene 4 estaciones muy definidas. Cada una ofrece algo único.
          Descubre cuál es la mejor época para tu viaje.
        </p>
      </div>

      {/* Seasons */}
      <div className="space-y-8 mb-12">
        {seasons.map((season) => (
          <div
            key={season.name}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${season.color} p-6 text-white`}>
              <div className="flex items-center gap-4">
                <span className="text-5xl">{season.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{season.name}</h2>
                  <p className="opacity-90">{season.months} · {season.temp}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Highlights */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">✨ Lo mejor</h3>
                  <ul className="space-y-2">
                    {season.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pros/Cons */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">👍👎 Pros y Contras</h3>
                  <div className="space-y-1">
                    {season.pros.map((p, i) => (
                      <div key={i} className="text-sm text-green-600">+ {p}</div>
                    ))}
                    {season.cons.map((c, i) => (
                      <div key={i} className="text-sm text-red-500">- {c}</div>
                    ))}
                  </div>
                </div>

                {/* Best for */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 mb-2">🎯 Ideal para</h3>
                  <p className="text-sm text-gray-600">{season.bestFor}</p>
                </div>
              </div>

              {/* Events */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">🎉 Eventos destacados</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {season.events.map((event, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-sm text-gray-900">{event.name}</div>
                      <div className="text-xs text-gray-500">{event.when} · {event.where}</div>
                      <p className="text-xs text-gray-600 mt-1">{event.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Temperature table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🌡️ Temperaturas por mes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Mes</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Tokio</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Osaka</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Sapporo</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Okinawa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.entries(monthlyTemps).map(([month, temps]) => (
                <tr key={month} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-900">{month}</td>
                  <td className="px-4 py-2 text-gray-600">{temps.tokio}</td>
                  <td className="px-4 py-2 text-gray-600">{temps.osaka}</td>
                  <td className="px-4 py-2 text-gray-600">{temps.sapporo}</td>
                  <td className="px-4 py-2 text-gray-600">{temps.okinawa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick recommendation */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cuándo viajar?</h2>
        <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-4">
            <div className="text-3xl mb-2">🌸</div>
            <div className="font-bold text-sm">Primavera</div>
            <div className="text-xs text-gray-500">Mar-Abr</div>
            <div className="text-xs text-gray-400">Sakura</div>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div className="text-3xl mb-2">🍁</div>
            <div className="font-bold text-sm">Otoño</div>
            <div className="text-xs text-gray-500">Oct-Nov</div>
            <div className="text-xs text-gray-400">Koyo</div>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div className="text-3xl mb-2">❄️</div>
            <div className="font-bold text-sm">Invierno</div>
            <div className="text-xs text-gray-500">Ene-Feb</div>
            <div className="text-xs text-gray-400">Esquí + Barato</div>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div className="text-3xl mb-2">☀️</div>
            <div className="font-bold text-sm">Verano</div>
            <div className="text-xs text-gray-500">Jul-Ago</div>
            <div className="text-xs text-gray-400">Festivales</div>
          </div>
        </div>
      </div>
    </div>
  );
}
