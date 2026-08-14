import type { Metadata } from "next";
import CityPage, { CityData } from "@/components/cities/CityPage";

export const metadata: Metadata = {
  title: "Guia de Tokio - Que hacer, ver y comer",
  description: "Guia completa de Tokio: barrios, restaurantes, templos, transporte y consejos prácticos para tu viaje a la capital de Japon.",
  keywords: "tokio, guia tokio, que hacer en tokio, restaurantes tokio, templos tokio, barrios tokio",
  openGraph: { title: "Guia de Tokio | ViajApp", description: "Todo lo que necesitas saber para visitar Tokio", url: "https://www.viajapp.app/tokyo" },
  alternates: { canonical: "https://www.viajapp.app/tokyo" },
  robots: { index: true, follow: true },
};

const tokyo: CityData = {
  name: "Tokio",
  slug: "tokyo-l193",
  description: "La capital de Japon: tradicion y vanguardia en perfecta armonia. Desde templos ancestrales hasta rascacielos futuristas.",
  emoji: "🗼",
  population: "14M",
  bestTime: "Mar-May",
  avgCost: "€80-150",
  gygQuery: "tokyo+tour",
  bookingSearch: "Tokyo",
  tiqetsUrl: "https://www.tiqets.com/en/tokyo-attractions-c72181/?partner=viajaapp-188875",
  mustSee: [
    { name: "Sensoji (Asakusa)", description: "El templo mas antiguo de Tokio. Entrada gratuita, espectacular de noche.", free: true },
    { name: "Shibuya Sky", description: "Mirador panoramico en el techo del Shibuya Scramble Square. Vistas 360°.", free: false },
    { name: "Meiji Jingu", description: "Santuario dedicado al Emperador Meiji. Bosque tranquilo en el corazon de la ciudad.", free: true },
    { name: "Tokyo Skytree", description: "La torre mas alta del mundo (634m). Vistas increibles y tiendas.", free: false },
    { name: "Mercado de Tsukiji", description: "El mercado de pescado mas famoso. Degusta sushi fresco al amanecer.", free: true },
    { name: "Akihabara", description: "El barrio del anime, manga y electronica. Tiendas de pisos y maid cafes.", free: true },
    { name: "Jardin Imperial", description: "Jardines historicos del palacio imperial. Entrada gratuita.", free: true },
    { name: "Odaiba", description: "Isla artificial con tiendas, museos y vistas al Puente Rainbow.", free: true },
  ],
  food: [
    { name: "Ramen en Ichiran", description: "Ramen tonkotsu en cabinas individuales. Experiencia unica.", price: "~¥1,000" },
    { name: "Sushi en Tsukiji", description: "Sushi fresco en el mercado exterior. Calidad excepcional.", price: "~¥2,000" },
    { name: "Tempura en Daikokuya", description: "La mejor tempura de Tokio desde 1887. Cola常见e.", price: "~¥1,500" },
    { name: "Wagyu en Yakiniku", description: "Carne wagyu a la parrilla. Experiencia gastronomica top.", price: "~¥5,000" },
    { name: "Tonkatsu en Maisen", description: "Katsu curry y tonkatsu premium en Omotesando.", price: "~¥1,800" },
    { name: "Konbini (7-Eleven)", description: "Bento, onigiri y snacks baratos. Perfecto para ahorrar.", price: "~¥500" },
  ],
  neighborhoods: [
    { name: "Shibuya", description: "El cruce mas famoso del mundo. Moda, vida nocturna y el iconic Hachiko." },
    { name: "Shinjuku", description: "Estacion mas grande del mundo. Kabukicho, Golden Gai, Omoide Yokocho." },
    { name: "Asakusa", description: "Barrio tradicional con el templo Sensoji y la calle Nakamise." },
    { name: "Harajuku", description: "Takeshita Street para moda juvenil, Meiji Jingu para espiritu." },
    { name: "Ginza", description: "Zona de lujo: tiendas de alta costura, restaurantes premium." },
    { name: "Roppongi", description: "Vida nocturna y museos: Mori Art Museum y TeamLab." },
  ],
  gettingAround: [
    "Compra una tarjeta Suica o Pasmo en la estacion. Sirve para metro, trenes y konbini.",
    "El metro es limpio, puntual y seguro. Ultimo tren ~ midnight.",
    "El JR Yamanote Line conecta los barrios principales en circular.",
    "Evita taxis: son caros. Usa el transporte publico.",
    "Google Maps funciona perfecto para planificar rutas en Tokio.",
    "Pasalo Tokio Metro: 24h (~¥600), 48h (~¥900), 72h (~¥1,000).",
  ],
  faq: [
    { question: "Cuantos dias necesito en Tokio?", answer: "Minimo 3-4 dias para ver lo esencial. Idealmente 5-7 dias para explorar bien sin prisa." },
    { question: "Es Tokio caro?", answer: "Puede serlo o no. Un dia basico cuesta €50-80 (hostal + comida + transporte). Con presupuesto ajustado se puede con €30-40." },
    { question: "Que barrio me alojo?", answer: "Shinjuku y Shibuya son ideales para primera visita: bien conectados y con vida nocturna. Asakusa si buscas algo mas tranquilo y tradicional." },
    { question: "Cuando son los cerezos en Tokio?", answer: "Normalmente entre finales de marzo y mediados de abril. Los mejores lugares: Ueno Park, Chidorigafuchi, Meguro River." },
    { question: "Necesito JR Pass para Tokio?", answer: "No, el JR Pass es para viajes entre ciudades. Dentro de Tokio usa Suica/Pasmo." },
  ],
};

export default function TokyoPage() {
  return <CityPage city={tokyo} />;
}
