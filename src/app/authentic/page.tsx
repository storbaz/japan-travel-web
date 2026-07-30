"use client";

import { useState } from "react";

const GM = "https://www.google.com/maps/search/?api=1&query=";
const GYG = "https://www.getyourguide.com";

const CATEGORIES = [
  { id: "mercados", label: "🏪 Mercados Locales", color: "bg-orange-50 border-orange-200 text-orange-800" },
  { id: "onsen", label: "♨️ Onsen Auténticos", color: "bg-blue-50 border-blue-200 text-blue-800" },
  { id: "barrio", label: "🏘️ Festivales de Barrio", color: "bg-pink-50 border-pink-200 text-pink-800" },
  { id: "comida", label: "🍱 Comida de Todos los Días", color: "bg-green-50 border-green-200 text-green-800" },
  { id: "actividades", label: "🎌 Actividades Cotidianas", color: "bg-purple-50 border-purple-200 text-purple-800" },
  { id: "lugares", label: "📍 Lugares Off-the-Beaten-Path", color: "bg-amber-50 border-amber-200 text-amber-800" },
  { id: "comportamiento", label: "🎎 Comportamiento Local", color: "bg-teal-50 border-teal-200 text-teal-800" },
];

interface Experience {
  title: string;
  titleJp?: string;
  description: string;
  whyLocal: string;
  where?: string;
  mapQuery?: string;
  gygQuery?: string;
  gygCity?: string;
  tips: string[];
  difficulty: "facil" | "medio" | "avanzado";
}

const EXPERIENCES: Record<string, Experience[]> = {
  mercados: [
    {
      title: "Mercado de Tsukiji (inner market)",
      titleJp: "築地場内市場",
      description: "Aunque el mercado mayorista se movió a Toyosu, el mercado interior de Tsukiji sigue vivo. Los japoneses van a comprar pescado fresco, algas, y comida callejera de calidad.",
      whyLocal: "Los turistas van a Toyosu o al outer market. Los locales van al inner market para comprar ingredientes frescos y desayunar en los small stalls que solo abren temprano.",
      where: "Tokyo - Tsukiji",
      mapQuery: "Tsukiji Inner Market Tokyo",
      gygQuery: "tsukiji+market+tour",
      gygCity: "tokyo",
      tips: [
        "Ve antes de las 8am para evitar colas",
        "Prueba el tamagoyaki (tortilla japonesa) en los stalls",
        "No toques los pescados sin preguntar",
        "Los martes y domingos muchos stalls están cerrados"
      ],
      difficulty: "facil",
    },
    {
      title: "Mercado de Nishiki",
      titleJp: "錦市場",
      description: "El 'cocina de Kioto'. 400 años de historia. Los kiotoanos van a comprar ingredientes para la cocina kaiseki y los bocadillos de tsukemono (encurtidos).",
      whyLocal: "Los turistas van a la zona principal. Los locales conocen los stalls del fondo donde los precios son mejores y la calidad igual.",
      where: "Kyoto - Nishiki",
      mapQuery: "Nishiki Market Kyoto",
      gygQuery: "kyoto+food+tour",
      gygCity: "kyoto",
      tips: [
        "Los stalls del fondo son más baratos",
        "Prueba el yuba (piel de tofu) fresco",
        "Pide 'mottainai' si quieres llevar comida para llevar",
        "Evita comer caminando, es considered mala educación"
      ],
      difficulty: "facil",
    },
    {
      title: "Mercado de Kuromon",
      titleJp: "黒門市場",
      description: "El mercado de Osaka, conocido como 'la cocina de Osaka'. Aquí los osakenses compran mariscos, wagyu, y street food de calidad.",
      whyLocal: "Los turistas van a Dotonbori. Los locales van a Kuromon para comprar ingredientes frescos y comer en los stalls de mariscos donde el atún se corta delante.",
      where: "Osaka - Kuromon",
      mapQuery: "Kuromon Market Osaka",
      gygQuery: "osaka+food+market+tour",
      gygCity: "osaka",
      tips: [
        "El otoro (atún rojo) es más barato aquí que en restaurantes",
        "Puedes pedir que te lo prepares en el momento",
        "Los martes hay menos gente",
        "Prueba el uni (erizo de mar) fresco"
      ],
      difficulty: "facil",
    },
    {
      title: "Mercado de Yanaka",
      titleJp: "谷中銀座",
      description: "Un mercado retro en Tokyo que sobrevivió a la guerra. Los vecinos del barrio van a comprar verduras, pescado, y cosas del día a día.",
      whyLocal: "Casi ningún turista viene aquí. Es un mercado de barrio real donde los ancianos compran y los gatos caminan libres.",
      where: "Tokyo - Yanaka",
      mapQuery: "Yanaka Ginza Tokyo",
      tips: [
        "Prueba el yakitori de pollo en los stalls",
        "Los domingos hay más ambiente",
        "Los gatos son los verdaderos dueños del barrio",
        "Compra snacks japoneses que no encuentras en konbini"
      ],
      difficulty: "facil",
    },
  ],
  onsen: [
    {
      title: "Onsen de barrio (sento)",
      titleJp: "銭湯",
      description: "Los sentos son baños públicos de barrio. Cuesta 500¥ y son la experiencia más auténtica que puedes tener. Los japoneses van todos los días después del trabajo.",
      whyLocal: "Los turistas van a los onsen turísticos como Hakone. Los locales van al sento de su barrio, donde conocen a los vecinos y relajan después del trabajo.",
      where: "Cualquier ciudad",
      mapQuery: "sento near me Tokyo",
      tips: [
        "Lávate SIEMPRE antes de entrar al agua",
        "No lleves toalla al agua, ponla sobre la cabeza",
        "Los tatuajes pueden ser problema en algunos sentos",
        "Ve en hora baja (temprano o antes de cerrar)",
        "Los domingos suelen estar más llenos"
      ],
      difficulty: "medio",
    },
    {
      title: "Onsen natural gratuito (rotenburo)",
      titleJp: "露天風呂",
      description: "Hay rotenburos gratuitos por toda Japón, especialmente en zonas rurales. Los locales van los fines de semana sin reservar ni pagar.",
      whyLocal: "Los turistas reservan los ryokan caros. Los locales conocen los rotenburos gratuitos en los ríos y montañas que no aparecen en Google Maps.",
      where: "Zonas rurales",
      mapQuery: "free rotenburo Japan",
      tips: [
        "Busca 'free onsen' o '無料温泉' en Google Maps",
        "Lleva tu propia toalla y bolsa de plástico",
        "Respeto el entorno: no dejes basura",
        "Los de madrugada son los mejores (nadie allí)"
      ],
      difficulty: "avanzado",
    },
  ],
  barrio: [
    {
      title: "Matsuri de barrio (chi-matsuri)",
      titleJp: "地祭り",
      description: "Los festivales de barrio son donde la magia real ocurre. Los vecinos organizan todo: comida, música, danzas. No hay turistas, solo comunidad.",
      whyLocal: "Los turistas van a los grandes matsuri de Kyoto o Tokio. Los barrios pequeños tienen sus propios festivales donde puedes participar de verdad.",
      where: "Cualquier barrio",
      mapQuery: "matsuri festival Tokyo neighborhood",
      tips: [
        "Pregunta en el konbini del barrio cuándo es el matsuri",
        "Los yukata se pueden alquilar en tiendas de barrio",
        "Los niños llevan mikoshi (portátil de santuario) por las calles",
        "Prueba las takoyaki y yakisoba del matsuri"
      ],
      difficulty: "medio",
    },
    {
      title: "Obon en un pueblo",
      titleJp: "お盆",
      description: "Obon es cuando los espíritus de los ancestros vuelven. Los pueblos hacen bon odori (danzas) y los familiares regresan a casa. Es el Año Nuevo japonés pero en verano.",
      whyLocal: "Los turistas no saben que Obon existe. Es la semana más importante del año para los japoneses y la más auténtica.",
      where: "Pueblos",
      tips: [
        "Es mediados de agosto (13-16 agosto normalmente)",
        "Muchos negocios cierran toda la semana",
        "Si te invitan a un bon odori, ve vestido con yukata",
        "Los panteños se limpian y se visitan"
      ],
      difficulty: "avanzado",
    },
  ],
  comida: [
    {
      title: "Desayuno en konbini",
      titleJp: "コンビニ朝ごはん",
      description: "El desayuno japonés en konbini es una experiencia cultural. Onigiri, melón pan, café con leche, egg sandwich... todo por menos de 500¥.",
      whyLocal: "Los turistas buscan restaurantes para desayunar. Los japoneses van al 7-Eleven, Lawson, o FamilyMart de su casa. Es rápido, barato, y delicioso.",
      where: "Cualquier konbini",
      mapQuery: "7-Eleven near me Tokyo",
      tips: [
        "Prueba el onigiri de salmón (三文魚) - el más vendido",
        "El egg sandwich del 7-Eleven es legendario",
        "El café de máquinas konbini es mejor que parecería",
        "Los onigiri se calientan si preguntas 'atatamete kudasai'"
      ],
      difficulty: "facil",
    },
    {
      title: "Almuerzo en un kissaten",
      titleJp: "喫茶店",
      description: "Los kissaten son cafeterías retro de los 60-70. Tienen set lunches, curry, sándwiches de tocino, y el mejor café drip que probarás.",
      whyLocal: "Los turistas van a Starbucks. Los japoneses van al kissaten de siempre donde el anciano hace café desde hace 40 años.",
      where: "Cualquier ciudad",
      mapQuery: "kissaten retro cafe Tokyo",
      tips: [
        "Busca '喫茶' en Google Maps",
        "El set lunch (ランチセット) es la mejor opción",
        "El curry rice del kissaten es diferente al del convenience store",
        "Algunos solo aceptan efectivo"
      ],
      difficulty: "facil",
    },
    {
      title: "Cena en un izakaya de barrio",
      titleJp: "居酒屋",
      description: "No los izakaya de cadena como Torikizoku. Los de barrio, con 10 asientos, donde el patrón conoce a todos. La comida es mejor y los precios más bajos.",
      whyLocal: "Los turistas van a los izakaya grandes de Shinjuku. Los locales van al izakaya del barrio donde el tío te pone sake gratis si vas seguido.",
      where: "Cualquier barrio residencial",
      mapQuery: "izakaya local neighborhood Tokyo",
      tips: [
        "Los de noche con farolillo rojo suelen ser los buenos",
        "Pide 'otoshi' (aperitivo de cortesía) sin preguntar",
        "El nomihodai (drinks ilimitados) cuesta 1500-2000¥",
        "Los martes suelen tener ofertas en pollo"
      ],
      difficulty: "medio",
    },
    {
      title: "Compra en supermercado japonés",
      titleJp: "スーパー",
      description: "Los supermercados japoneses son un mundo. Bentos desde 300¥, pescado fresco, verduras cortadas, y comida preparada que no encontrarás en ningún restaurante.",
      whyLocal: "Los turistas comen en restaurantes. Los japoneses compran en el supermercado y comen en casa. Es la forma real de comer en Japón.",
      where: "Cualquier ciudad",
      mapQuery: "supermarket Japan Seiyu Life",
      tips: [
        "Después de las 7pm, los bentos y sushi tienen 20-50% descuento",
        "El 'しゅうまい' (wonton frito) es el snack perfecto",
        "Prueba los bento de konbini: son hechos por chefs reales",
        "Los huevos japoneses se comen crudos sin problema"
      ],
      difficulty: "facil",
    },
  ],
  actividades: [
    {
      title: "Pachinko",
      titleJp: "パチンコ",
      description: "Los locales van al pachinko a relajarse. Es como un casino de pinball. Ruidoso, brillante, y adictivo. Cuesta 1000¥ para empezar.",
      whyLocal: "Los turistas piensan que es solo un juego. Los japoneses van a relajarse, socializar, y ganar algo de dinero (o perderlo).",
      where: "Cualquier ciudad",
      mapQuery: "pachinko parlor Shinjuku",
      tips: [
        "Los machines automáticos son los más fáciles para empezar",
        "Pide 'tehoda' si quieres que te expliquen cómo jugar",
        "Las ganancias se canjean por tokens que cambias en un shop de al lado",
        "Los no-smoking floors están disponibles en algunos"
      ],
      difficulty: "medio",
    },
    {
      title: "Karaoke de barrio",
      titleJp: "カラオケ",
      description: "No el Karaoke Kan de Shibuya (turista). Los de barrio donde los japoneses van después del trabajo. 300¥/hora, sin límite de canciones.",
      whyLocal: "Los turistas van a los karaoke de cadena en Shinjuku. Los locales van al karaoke del barrio donde conocen al dueño y tienen su canción favorita.",
      where: "Cualquier barrio",
      mapQuery: "karaoke local neighborhood Tokyo",
      tips: [
        "Los big echo y echo danon son las cadencias más populares",
        "El nomihodai (ilimitado) es la mejor opción",
        "Pide 'champagne call' si alguien cumple años",
        "Las canciones japonesas son las que más se cantan"
      ],
      difficulty: "facil",
    },
    {
      title: "Visita a un santuario local",
      titleJp: "神社参り",
      description: "No los grandes santuarios turísticos. Los pequeños santuarios de barrio donde los vecinos van a rezar y dejar offering. A veces solo hay un torii y un edificio.",
      whyLocal: "Los turistas van a Meiji Shrine o Fushimi Inari. Los locales van al santuario de su barrio donde hay un festival cada mes.",
      where: "Cualquier barrio",
      mapQuery: "small shrine local Tokyo",
      tips: [
        "Los domingos por la mañana es cuando más gente va",
        "Si ves a alguien rezando, espera tu turno",
        "El ema (tablilla de madera) cuesta 500¥",
        "Los goshuin (carátula del santuario) son souvenirs perfectos"
      ],
      difficulty: "facil",
    },
    {
      title: "Hanami en un parque local",
      titleJp: "花見",
      description: "Los japoneses hacen hanami (ver cerezos) en parques locales, no en los turísticos. Llevan bento, sake, y pasan la tarde con amigos y familia.",
      whyLocal: "Los turistas van a Ueno Park o Meguro River. Los locales van al parque pequeño de su barrio donde hay 3 cerezos y nadie molesta.",
      where: "Parques locales",
      mapQuery: "cherry blossom park local Tokyo",
      tips: [
        "Llega temprano para reservar sitio (sí, se hace así)",
        "El hanami es en abril pero los locals van a cualquier parque con sombra",
        "Lleva bento y sake (el alcohol es legal en parques)",
        "Los baños públicos suelen estar cerca"
      ],
      difficulty: "facil",
    },
  ],
  lugares: [
    {
      title: "Yanaka (Tokyo)",
      titleJp: "谷中",
      description: "El barrio que sobrevivió a la guerra. Calles estrechas, tiendas de barrio, gatos por todas partes. Es como viajar al Tokyo de los 80.",
      whyLocal: "Los turistas van a Asakusa. Los locales van a Yanaka para pasear, comprar cosas de barrio, y tomar café en kissaten retro.",
      where: "Tokyo - Yanaka",
      mapQuery: "Yanaka Tokyo",
      tips: [
        "Yanaka Ginza es la calle principal",
        "Los gatos son la atracción real",
        "El cementerio de Yanaka es impresionante al atardecer",
        "Hay un bar de jazz escondido que solo los locales conocen"
      ],
      difficulty: "facil",
    },
    {
      title: "Kagurazaka (Tokyo)",
      titleJp: "神楽坂",
      description: "El barrio francés de Tokyo. Calles empedradas, restaurantes franceses junto a izakayas japoneses. Los locales van a cenar aquí los viernes.",
      whyLocal: "Los turistas van a Shibuya. Los locales van a Kagurazaka para cenar bien y barato en restaurantes escondidos.",
      where: "Tokyo - Kagurazaka",
      mapQuery: "Kagurazaka Tokyo",
      tips: [
        "Los callejones (yokochō) esconden los mejores restaurantes",
        "Los viernes hay ambiente de fiesta",
        "El festival de Kagurazaka es en julio",
        "Hay un templo budista escondido en un callejón"
      ],
      difficulty: "facil",
    },
    {
      title: "Pueblo de pescadores (Enoshima)",
      titleJp: "江ノ島",
      description: "Una isla-pueblo donde los pescadores viven del mar. Los Tokyoanos van los fines de semana para comer pescado fresco y ver el atardecer.",
      whyLocal: "Los turistas van a Kamakura. Los locales van a Enoshima para comer shirasu (whitebait) y ver el mar sin agobios.",
      where: "Kanagawa - Enoshima",
      mapQuery: "Enoshima Japan",
      tips: [
        "El shirasu (whitebait) se come crudo sobre arroz",
        "El shrine de Enoshima tiene cuevas marinas",
        "El sunset desde el faro es espectacular",
        "El Enoshima-Kamakura Free Pass vale la pena"
      ],
      difficulty: "facil",
    },
  ],
  comportamiento: [
    {
      title: "Quitar los zapatos",
      titleJp: "靴を脱ぐ",
      description: "En casas, ryokan, algunos restaurantes, templos, y escuelas. Si ves un escalón elevado o un tatami, probablemente haya que quitarse los zapatos.",
      whyLocal: "Los turistas no se dan cuenta y entran con zapatos. Los japoneses lo hacen automáticamente. Es respeto por el espacio limpio.",
      where: "Todos",
      tips: [
        "Si hay un escalón, quítate los zapatos",
        "Los wc tienen zapatillas separadas",
        "Los calcetines deben estar limpios (no rotos)",
        "Si no estás seguro, mira a otros o pregunta"
      ],
      difficulty: "facil",
    },
    {
      title: "No comer caminando",
      titleJp: "歩き食いはしない",
      description: "En Japón no se come caminando. Si compras algo, comes donde lo compraste o en el puesto. Es de mala educación comer y caminar.",
      whyLocal: "Los turistas compran takoyaki y caminan. Los japoneses se quedan a comer en el puesto o compran para llevar y comen en casa.",
      where: "Todos",
      tips: [
        "Excepción: en festivales y mercados es aceptable",
        "Los konbini tienen mesas pequeñas para comer",
        "Los bento se comen en el tren o en casa",
        "Si compras un onigiri, cómetelo en el konbini"
      ],
      difficulty: "facil",
    },
    {
      title: "Hacer fila en silencio",
      titleJp: "列に並ぶ",
      description: "Los japoneses hacen fila para todo: tren, restaurante, tienda. Y en silencio. No se habla alto, no se empuja, se espera pacientemente.",
      whyLocal: "Los turistas no entienden por qué hay una cola enorme para un restaurante que parece vacío. Los japoneses respetan la fila y el turno.",
      where: "Todos",
      tips: [
        "Si hay una cola, únete al final",
        "No hables alto en la cola",
        "Los trenes se llenan: espera a que la gente salga",
        "En los restaurantes, many tienen sistema de tickets"
      ],
      difficulty: "facil",
    },
    {
      title: "Dar y recibir con ambas manos",
      titleJp: "両手で渡す",
      description: "Cuando te dan algo (tarjeta, dinero, regalo) lo recibes con ambas manos y una ligera inclinación. Es respeto.",
      whyLocal: "Los turistas dan la mano o reciben con una mano. Los japoneses siempre usan ambas manos para dar y recibir.",
      where: "Todos",
      tips: [
        "Las tarjetas de presentación se reciben con ambas manos",
        "Los regalos se dan envueltos (wrap siempre)",
        "El dinero se da en un sobre especial",
        "Siempre agradece con 'arigatou gozaimasu'"
      ],
      difficulty: "facil",
    },
  ],
};

const difficultyColors = {
  facil: "bg-green-100 text-green-700",
  medio: "bg-yellow-100 text-yellow-700",
  avanzado: "bg-red-100 text-red-700",
};

export default function AuthenticPage() {
  const [selectedCategory, setSelectedCategory] = useState("mercados");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const experiences = EXPERIENCES[selectedCategory] || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🎌 Lo Auténtico</h1>
        <p className="text-gray-600 max-w-2xl">
          Lo que hacen los japoneses de verdad. No turismo de masas, sino la vida real de Japón. Mercados de barrio, onsen gratuitos, comida de konbini, y costumbres que solo los locales conocen.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setExpandedIdx(null); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedCategory === cat.id ? cat.color + " shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="p-5 cursor-pointer" onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                    {exp.titleJp && <span className="text-sm text-gray-400">{exp.titleJp}</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[exp.difficulty]}`}>
                      {exp.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{exp.description}</p>
                </div>
                <span className="text-gray-300 text-xl transition-transform" style={{ transform: expandedIdx === idx ? "rotate(180deg)" : "" }}>▾</span>
              </div>
            </div>

            {expandedIdx === idx && (
              <div className="px-5 pb-5 border-t border-gray-50">
                <div className="bg-amber-50 rounded-xl p-4 mb-4 border border-amber-100">
                  <div className="text-xs font-bold text-amber-700 mb-1">🎌 ¿Por qué es auténtico?</div>
                  <p className="text-sm text-amber-800">{exp.whyLocal}</p>
                </div>

                {exp.where && (
                  <div className="text-sm text-gray-600 mb-3">📍 <strong>{exp.where}</strong></div>
                )}

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Consejos:</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {exp.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.mapQuery && (
                    <a href={`${GM}${encodeURIComponent(exp.mapQuery)}`} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition">
                      📍 Ver en Google Maps
                    </a>
                  )}
                  {exp.gygQuery && exp.gygCity && (
                    <a href={`${GYG}/${exp.gygCity === "tokyo" ? "tokyo-l193" : exp.gygCity === "osaka" ? "osaka-l1204" : exp.gygCity === "kyoto" ? "kyoto-l96826" : "tokyo-l193"}/?q=${encodeURIComponent(exp.gygQuery)}&partner_id=NRWCY1R`}
                      target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition">
                      🎯 Buscar experiencia en GYG
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
        <h3 className="font-bold text-red-900 mb-3">🎌 La regla de oro para viajeros experimentados</h3>
        <p className="text-sm text-red-800 mb-4">
          La mejor experiencia en Japón no es ver cosas, sino <strong>vivir como local</strong>. Ve al konbini, come en supermercados, pasea por barrios residenciales, y habla con la gente (aunque sea con gestos).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🏪</div>
            <div className="font-bold text-gray-900">Konbini Life</div>
            <div className="text-gray-600">Desayuno, almuerzo, cena. Todo en konbini.</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🚶</div>
            <div className="font-bold text-gray-900">Piérdete</div>
            <div className="text-gray-600">Los mejores descubrimientos son sin mapa.</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🗣️</div>
            <div className="font-bold text-gray-900">Habla</div>
            <div className="text-gray-600">Los japoneses son tímidos pero encantadores.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
