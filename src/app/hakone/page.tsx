import type { Metadata } from "next";
import CityPage, { CityData } from "@/components/cities/CityPage";

export const metadata: Metadata = {
  title: "Guia de Hakone - Onsen, Monte Fuji y naturaleza | ViajApp",
  description: "Guia completa de Hakone: aguas termales, vistas al Monte Fuji, Open Air Museum y el Lago Ashi.",
  keywords: "hakone, guia hakone, onsen, monte fuji, lago ashi",
  openGraph: { title: "Guia de Hakone | ViajApp", description: "El refugio termal de Tokio", url: "https://www.viajapp.app/hakone" },
  alternates: { canonical: "https://www.viajapp.app/hakone" },
  robots: { index: true, follow: true },
};

const hakone: CityData = {
  name: "Hakone",
  slug: "hakone-l845",
  description: "El destino termal mas famoso de Japon. Aguas termales, vistas al Monte Fuji, arte al aire libre y el Lago Ashi.",
  emoji: "♨️",
  population: "20K",
  bestTime: "Mar-May / Oct-Nov",
  avgCost: "€70-150",
  gygQuery: "hakone+day+trip",
  bookingSearch: "Hakone",
  mustSee: [
    { name: "Lago Ashi", description: "Lago volcanico con paseos en barco pirata y vistas al Monte Fuji.", free: false },
    { name: "Hakone Open Air Museum", description: "Museo de esculturas al aire libre con instalaciones de Picasso.", free: false },
    { name: "Owakudani", description: "Valle volcanico con aguas hirvientes y huevos negros (kuro-tamago).", free: true },
    { name: "Onsen (aguas termales)", description: "Cientos de baños termales. El Ryokan con onsen es la experiencia definitiva.", free: false },
    { name: "Hakone Shrine", description: "Santuario en el bosque con torii rojo a orillas del lago.", free: true },
    { name: "Circuit of Hakone", description: "Ruta circular: tren → teleferico → barco → autobus. Vistas de todo Hakone.", free: false },
  ],
  food: [
    { name: "Kuro-tamago (huevo negro)", description: "Huevos hervidos en aguas termales. Cada uno suma 7 anios de vida.", price: "~¥500" },
    { name: "Soba de Hakone", description: "Soba hecho con agua de manantial local. Fresco y autentico.", price: "~¥1,200" },
    { name: "Onsen tamago", description: "Huevos cocidos en la fuente termal. texture unica.", price: "~¥500/3" },
    { name: "Wagashi en ryokan", description: "Dulces tradicionales japoneses servidos con matcha.", price: "~¥800" },
  ],
  neighborhoods: [
    { name: "Gora", description: "El centro de Hakone: estacion, museo y principales onsen." },
    { name: "Hakone-Yumoto", description: "La entrada a Hakone. Estacion principal y ryokans economicos." },
    { name: "Tenzan", description: "Zona de onsen al aire libre entre arboles." },
    { name: "Lake Ashi", description: "Orillas del lago: santuario, barcos y vistas al Fuji." },
  ],
  gettingAround: [
    "Hakone Free Pass desde Shinjuku (~¥6,100/2 dias). Incluye tren, teleferico, barco y autobus.",
    "Desde Tokio: Romancecar (~85 min) o JR a Odawara + local.",
    "El circuito de Hakone toma un dia completo.",
    "El mejor momento para ver el Fuji es temprano por la manana.",
    "Muchos ryokans tienen shuttle desde la estacion.",
    "Se puede hacer como day trip o dormir en ryokan.",
  ],
  faq: [
    { question: "Hakone Free Pass vale la pena?", answer: "Si! Cubre transporte por 2-3 dias. Sin el pass, el circuito cuesta el doble." },
    { question: "Cuando se ve el Monte Fuji?", answer: "Fibra temprano por la manana. En invierno (dic-feb) es cuando mas claro se ve." },
    { question: "Un dia o dormir en ryokan?", answer: "Si puedes, duerme en ryokan con onsen. La experiencia es incomparable. Minimo 1 noche." },
    { question: "Onsen: que debo saber?", answer: "Entrar desnudo. No puedes ir si tienes tatuajes visibles (en la mayoria). Las toallas van en la cabeza." },
  ],
};

export default function HakonePage() {
  return <CityPage city={hakone} />;
}
