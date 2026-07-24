"use client";

import { useExchangeRate, formatPriceWithEur } from "@/hooks/useExchangeRate";

const cultureItems = [
  {
    name: "Ceremonia del Té (Chado)",
    icon: "🍵",
    desc: "Un ritual de siglos donde cada movimiento tiene significado. Preparar y beber matcha es meditación en行动.",
    where: "Kioto, Tokio",
    price: "2,000-5,000 yenes/clase",
    duration: "1-2 horas",
    whatYouLearn: [
      "Preparar matcha tradicional",
      "Movimientos y postura correcta",
      "Historia y filosofía del té",
      "Cómo servir y recibir",
    ],
    tips: [
      "Camaden (Kioto): la escuela más antigua de té",
      "Happo-en (Tokio): jardín japonés + té",
      "Viste kimono para la experiencia completa",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/kyoto-l96826/?q=tea+ceremony+japan&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=tea+ceremony+kyoto" },
    ],
  },
  {
    name: "Ikebana (Arte Floral)",
    icon: "💐",
    desc: "El arte japonés de arreglar flores. Cada rama, cada flor tiene un significado. Es meditación con flores.",
    where: "Kioto, Tokio",
    price: "3,000-6,000 yenes/clase",
    duration: "1.5-2 horas",
    whatYouLearn: [
      "Técnicas básicas de ikebana",
      "Uso de espacio y simetría",
      "Elección de flores y ramas",
      "Filosofía wabi-sabi",
    ],
    tips: [
      "Kioto: ikebana en templos tradicionales",
      "Tokio: ikebana en jardines modernos",
      "Trae tu creación a casa (te dan un envase)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/kyoto-l96826/?q=ikebana+workshop+japan&partner_id=NRWCY1R" },
    ],
  },
  {
    name: "Cerámica (Yakimono)",
    icon: "🏺",
    desc: "Moldear barro con las manos. Japón tiene siglos de tradición cerámica: Bizen, Hagi, Arita y más.",
    where: "Kioto, Bizen, Kanazawa",
    price: "3,000-8,000 yenes/clase",
    duration: "2-3 horas",
    whatYouLearn: [
      "Moldear con torno (teppiki)",
      "Técnicas de esmaltado",
      "Historia de la cerámica japonesa",
      "Crear tu propio plato o taza",
    ],
    tips: [
      "Kioto: cerámica Kiyomizu-yaki (famosa)",
      "Bizen: cerámica sin esmalte, natural",
      "Kanazawa: Kutani-yaki (colores vibrantes)",
      "Envíanlo a casa si es demasiado grande",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/kyoto-l96826/?q=pottery+workshop+japan&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=pottery+class+kyoto" },
    ],
  },
  {
    name: "Kimono Experience",
    icon: "👘",
    desc: "Vestir un kimono tradicional y pasear por templos. Hay kimono para todos los estilos: moderno, tradicional, yukata.",
    where: "Kioto, Tokio, Kamakura",
    price: "3,000-10,000 yenes/día",
    duration: "Todo el día",
    whatYouLearn: [
      "Cómo ponerte un kimono correctamente",
      "Diferencias entre kimono y yukata",
      "Accesorios y peinados tradicionales",
      "Foto con fondo de templo",
    ],
    tips: [
      "Kioto: alquila kimono y pasea por Gion",
      "Yukata es más ligera (verano)",
      "Reserva online para mejor precio",
      "Algunos incluyen peinado y maquillaje",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/kyoto-l96826/?q=kimono+rental+kyoto&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=kimono+experience+kyoto" },
    ],
  },
  {
    name: "Artes Marciales",
    icon: "🥋",
    desc: "Probar judo, karate, kendo o aikido en escuelas reales. Los japoneses llevan siglos perfeccionando estas artes.",
    where: "Tokio, Kioto, Okinawa",
    price: "3,000-10,000 yenes/clase",
    duration: "1-2 horas",
    whatYouLearn: [
      "Técnicas básicas de defensa",
      "Historia del arte marcial",
      "Filosofía y respeto",
      "Ejercicio físico intenso",
    ],
    tips: [
      "Kodokan (Tokio): sede mundial del judo",
      "Okinawa: cuna del karate",
      "Kendo: espada japonesa, muy espectacular",
      "Trae ropa deportiva (te dan el uniforme)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=martial+arts+experience+japan&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=judo+experience+tokyo" },
    ],
  },
  {
    name: "Caligrafía (Shodo)",
    icon: "🖌️",
    desc: "Escribir kanjis con pincel y tinta negra. Cada trazo tiene un orden y significado. Arte y meditación.",
    where: "Kioto, Tokio",
    price: "2,000-4,000 yenes/clase",
    duration: "1-1.5 horas",
    whatYouLearn: [
      "Trazos básicos de kanji",
      "Uso del pincel y tinta",
      "Crear tu propio scroll",
      "Significado de los kanjis",
    ],
    tips: [
      "Templos en Kioto ofrecen clases",
      "Trae tu creación a casa como recuerdo",
      "Fácil para principiantes",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/kyoto-l96826/?q=calligraphy+class+japan&partner_id=NRWCY1R" },
    ],
  },
  {
    name: "Samurai Experience",
    icon: "⚔️",
    desc: "Vestir armadura de samurái, aprender a manejar katana y conocer la historia de los guerreros.",
    where: "Tokio, Kioto",
    price: "5,000-15,000 yenes",
    duration: "1.5-2 horas",
    whatYouLearn: [
      "Historia de los samuráis",
      "Manejo de katana (con espada de práctica)",
      "Vestir armadura (yoroi)",
      "Código bushido",
    ],
    tips: [
      "Samurai Museum (Tokio): la más completa",
      "Kioto: experiencia en templo tradicional",
      "Algunos incluyen foto con armadura",
      "Manejo de katana real (con instructor)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=samurai+experience+tokyo&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=samurai+katana+tokyo" },
    ],
  },
  {
    name: "Sumo Wrestling",
    icon: "🤼",
    desc: "Asistir a un torneo de sumo o ver un entrenamiento de mañana. El deporte nacional de Japón.",
    where: "Tokio (3 torneos al año), Osaka, Nagoya, Fukuoka",
    price: "200-3,000 yenes (entrenamiento) / 3,000-50,000 yenes (torneo)",
    duration: "2-4 horas (torneo) / 2 horas (entrenamiento)",
    whatYouLearn: [
      "Reglas del sumo",
      "Rituales antes del combate",
      "Entrenamiento de los luchadores",
      "Comida chanko-nabe (de sumo)",
    ],
    tips: [
      "Torneo en Tokio: enero, mayo, septiembre",
      "Entrenamiento de mañana: en establos (heya)",
      "Compra entradas con antelación (se agotan)",
      "Chanko-nabe: la comida de los sumo",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=sumo+wrestling+tokyo&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=sumo+tournament+tokyo" },
    ],
  },
  {
    name: "Manga y Anime",
    icon: "📚",
    desc: "Crear tu propio manga, visitar estudios de anime o asistir a convenciones. El mundo otaku en vivo.",
    where: "Akihabara, Tokio",
    price: "1,000-5,000 yenes",
    duration: "2-4 horas",
    whatYouLearn: [
      "Dibujar personajes de manga",
      "Historia del manga y anime",
      "Visita a estudio de animación",
      "Cómo se crean los personajes",
    ],
    tips: [
      "Ghibli Museum: el mundo de Miyazaki",
      "Manga Art Hotel: dormir entre mangas",
      "Akihabara: tiendas de figuras y doujinshi",
      "Comiket: convención de manga (agosto/diciembre)",
    ],
    affiliate: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/tokyo-l193/?q=manga+class+tokyo&partner_id=NRWCY1R" },
      { name: "Klook", url: "https://www.klook.com/search/?q=ghibli+museum+tokyo" },
    ],
  },
];

export default function CulturePage() {
  const { rate } = useExchangeRate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎭 Cultura Japonesa
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          No solo ver la cultura: ¡vívela! Tómate un té, haz cerámica,
          viste un kimono o aprende a manejar katana.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cultureItems.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{item.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.where}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{item.desc}</p>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="font-semibold">Precio:</span> {formatPriceWithEur(item.price, rate)}
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="font-semibold">Duración:</span> {item.duration}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 mb-2">🎯 Aprenderás:</h4>
              <ul className="space-y-1">
                {item.whatYouLearn.map((learn, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    {learn}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 mb-4">
              <h4 className="text-xs font-semibold text-amber-600 mb-2">💡 Tips:</h4>
              <ul className="space-y-1">
                {item.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-gray-600">• {tip}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.affiliate.map((a, i) => (
                <a
                  key={i}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  {a.name} →
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
