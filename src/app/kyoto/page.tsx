import type { Metadata } from "next";
import CityPage, { CityData } from "@/components/cities/CityPage";

export const metadata: Metadata = {
  title: "Guia de Kioto - Templos, geishas y tradicion",
  description: "Guia completa de Kioto: templos milenarios, barrio de geishas, jardines zen y la mejor gastronomia tradicional de Japon.",
  keywords: "kioto, guia kioto, templos kioto, geishas kioto, que hacer en kioto",
  openGraph: { title: "Guia de Kioto | ViajApp", description: "La capital cultural de Japon te espera", url: "https://www.viajapp.app/kyoto" },
  alternates: { canonical: "https://www.viajapp.app/kyoto" },
  robots: { index: true, follow: true },
};

const kyoto: CityData = {
  name: "Kioto",
  slug: "kyoto-l96826",
  description: "La antigua capital imperial. Mas de 2,000 templos y santuarios, geishas, jardines zen y la tradicion mas pura de Japon.",
  emoji: "⛩️",
  population: "1.5M",
  bestTime: "Mar-May / Oct-Nov",
  avgCost: "€70-130",
  gygQuery: "kyoto+temple+tour",
  bookingSearch: "Kyoto",
  tiqetsUrl: "https://www.tiqets.com/en/kyoto-attractions-c72420/?partner=viajaapp-188875",
  mustSee: [
    { name: "Fushimi Inari", description: "Los mas de 10,000 torii naranjas. Senderismo y fotos icónicas.", free: true },
    { name: "Kinkaku-ji (Pabellon Dorado)", description: "Templo cubierto de oro reflejado en un estanque. Impresionante.", free: false },
    { name: "Arashiyama Bamboo Grove", description: "Bosque de bambu gigante. Paseo etereo y fotografico.", free: true },
    { name: "Gion", description: "Barrio de geishas. Pasea por las calles de tarde para ver maikos.", free: true },
    { name: "Kiyomizu-dera", description: "Templo con terraza de madera con vistas a la ciudad. Patrimonio UNESCO.", free: false },
    { name: "Nijo Castle", description: "Castillo con suelo cantarin que alertaba de intrusos.", free: false },
    { name: "Santuario Heian", description: "Enorme santuario con jardines gratuitos espectaculares.", free: true },
    { name: "Kimono Forest", description: "600 pilares iluminados con patrones de kimono en Randen Demachiyanagi.", free: true },
  ],
  food: [
    { name: "Matcha y wagashi", description: "Té verde y dulces tradicionales en salas de té autenticas.", price: "~¥1,500" },
    { name: "Kaiseki en Pontocho", description: "Cena multi-plato tradicional japonesa en la calle Pontocho.", price: "~¥15,000" },
    { name: "Yudofu (tofu hervido)", description: "Plato tipico de Kioto: tofu suave en caldo. Simplicity y sabor.", price: "~¥2,000" },
    { name: "Nishiki Market", description: "El mercado de Kioto. 400+ tiendas de comida local y snacks.", price: "~¥1,000" },
    { name: "Ramen Ippudo", description: "Ramen tonkotsu en estacion Kyoto. Cadena popular y deliciosa.", price: "~¥900" },
  ],
  neighborhoods: [
    { name: "Gion", description: "El barrio de las geishas. Calles de madera, restaurantes tradicionales." },
    { name: "Higashiyama", description: "La zona de templos mas bonita. Kiyomizu-dera, Ninenzaka, Sannenzaka." },
    { name: "Arashiyama", description: "Bosque de bambu, templos, el famoso puente Togetsukyo." },
    { name: "Pontocho", description: "Calle estrecha llena de restaurantes. Ideal para cenar con vistas al rio." },
    { name: "Kyoto Station", description: "Estacion moderna con mirador gratuito en el顶上 Sky Garden." },
  ],
  gettingAround: [
    "Kioto es ideal en bicicleta. Alquiler ~¥1,000/dia. La ciudad es plana.",
    "Autobuses son la mejor forma de llegar a los templos. Billete ~¥230.",
    "Pase de autobus de 1 dia (~¥700) vale la pena si visitas 3+ templos.",
    "El tren es util para Arashiyama (linea JR Sagano) y Fushimi Inari.",
    "Evita ir en coche: las calles son estrechas y el parking caro.",
    "De mayo a octubre, muchos templos abren de noche para iluminacion especial.",
  ],
  faq: [
    { question: "Cuantos dias en Kioto?", answer: "Minimo 2-3 dias. Idealmente 4-5 para ver los principales templos sin agobiarse." },
    { question: "Como ver geishas reales?", answer: "Pasea por Gion al atardecer (5-7pm). En Pontocho y Shirakawa Lane tambien las ves. Respeta: no las toques ni bloquees su paso." },
    { question: "Es Kioto peor que Tokio?", answer: "Depende de la temporada. Noviembre (hojas rojas) y abril (cerezos) estan MUY llenos. Fuera de temporada es mas tranquilo." },
    { question: "Fushimi Inari: cuanto tarda?", answer: "El recorrido completo de ida y vuelta tarda 2-3 horas. Puedes ir solo hasta la mitad (45 min) que es lo mas bonito." },
  ],
};

export default function KyotoPage() {
  return <CityPage city={kyoto} />;
}
