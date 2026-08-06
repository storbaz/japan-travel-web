// Rich blog content data and templates for the auto-generated blog.
// The content data (cities, food, tips, culture, seasons) lives in ./blog-data/
// and is re-exported here for the generation script.

export interface BlogTemplate {
  id: string;
  category: string;
  titlePattern: string;
  descriptionPattern: string;
  introPattern?: string;
  sections: { heading: string; content: string }[];
  tags: string[];
  readTime: string;
  specialDate?: string;
  cta?: string;
}

export const blogTemplates: BlogTemplate[] = [
  // === CIUDADES ===
  {
    id: "city-guide",
    category: "Guias",
    titlePattern: "Guia Completa de {city} para {year}: Que Ver, Comer y Hacer",
    descriptionPattern: "Todo lo que necesitas saber para visitar {city}: mejores barrios, comida recomendada, transporte, itinerario dia a dia y presupuesto orientativo.",
    introPattern: "{intro}",
    sections: [
      { heading: "Los barrios imprescindibles de {city}", content: "{neighborhoods}" },
      { heading: "Comida que debes probar", content: "{foodList}" },
      { heading: "Transporte en {city}", content: "{transport}" },
      { heading: "Itinerario recomendado", content: "{itinerary}" },
      { heading: "Presupuesto orientativo", content: "{budget}" },
      { heading: "Errores comunes al visitar {city}", content: "{mistakes}" },
      { heading: "Preguntas frecuentes", content: "{faq}" },
    ],
    tags: ["guia {city}", "{city} {year}", "que hacer en {city}", "viajar a {city}"],
    readTime: "10 min",
    cta: "itinerario",
  },
  // === COMIDA ===
  {
    id: "food-guide",
    category: "Comida",
    titlePattern: "{foodType} en Japon: Guia Completa {year}",
    descriptionPattern: "Descubre todo sobre {foodType} en Japon: que es, su historia, los mejores sitios para probarlo, precios y como pedirlo como un local.",
    introPattern: "{intro}",
    sections: [
      { heading: "Que es {foodType}", content: "{description}" },
      { heading: "Historia de {foodType}", content: "{history}" },
      { heading: "Los mejores sitios para probarlo", content: "{bestPlaces}" },
      { heading: "Precios orientativos", content: "{prices}" },
      { heading: "Como pedir {foodType}", content: "{howToOrder}" },
      { heading: "Errores que debes evitar", content: "{mistakes}" },
      { heading: "Preguntas frecuentes", content: "{faq}" },
    ],
    tags: ["{foodType} japon", "comida japonesa", "gastronomia japon", "donde comer en japon"],
    readTime: "8 min",
    cta: "comida",
  },
  // === CONSEJOS PRACTICOS ===
  {
    id: "practical-tips",
    category: "Consejos",
    titlePattern: "{tipTopic}: {year} Guia Practica",
    descriptionPattern: "Consejos practicos sobre {tipTopic} para viajar a Japon: que debes saber, errores a evitar, casos reales y preguntas frecuentes.",
    introPattern: "{intro}",
    sections: [
      { heading: "Por que importa {tipTopic}", content: "{importance}" },
      { heading: "Lo que debes saber", content: "{essentialInfo}" },
      { heading: "Errores comunes", content: "{commonMistakes}" },
      { heading: "Nuestros tips", content: "{ourTips}" },
      { heading: "Casos reales", content: "{realCases}" },
      { heading: "Preguntas frecuentes", content: "{faq}" },
    ],
    tags: ["{tipTopic} japon", "consejos japon", "tips viaje japon", "como {tipTopic} en japon"],
    readTime: "7 min",
    cta: "presupuesto",
  },
  // === CULTURA ===
  {
    id: "culture",
    category: "Cultura",
    titlePattern: "{culturalTopic} en Japon: Tradicion y Significado",
    descriptionPattern: "Descubre la historia y el significado de {culturalTopic} en Japon, donde vivirlo y como disfrutarlo durante tu viaje.",
    introPattern: "{intro}",
    sections: [
      { heading: "Historia de {culturalTopic}", content: "{history}" },
      { heading: "Como se vive hoy", content: "{modernLife}" },
      { heading: "Donde experimentarlo", content: "{whereToExperience}" },
      { heading: "Como vivirlo en tu viaje", content: "{howToExperience}" },
      { heading: "Datos curiosos", content: "{funFacts}" },
      { heading: "Preguntas frecuentes", content: "{faq}" },
    ],
    tags: ["{culturalTopic} japon", "cultura japonesa", "tradiciones japon", "historia japon"],
    readTime: "9 min",
    cta: "eventos",
  },
  // === TEMPORADA ===
  {
    id: "seasonal",
    category: "Planificacion",
    titlePattern: "{season} en Japon {year}: Guia Completa",
    descriptionPattern: "Todo sobre {season} en Japon {year}: clima, eventos destacados, que llevar en la maleta y como planificar tu viaje.",
    introPattern: "{intro}",
    sections: [
      { heading: "Clima y temperaturas", content: "{weather}" },
      { heading: "Eventos destacados", content: "{events}" },
      { heading: "Que llevar en la maleta", content: "{packing}" },
      { heading: "Planificacion y reservas", content: "{planning}" },
      { heading: "Errores comunes", content: "{mistakes}" },
      { heading: "Preguntas frecuentes", content: "{faq}" },
    ],
    tags: ["{season} japon", "cuando viajar japon", "clima japon {year}", "eventos {season} japon"],
    readTime: "8 min",
    cta: "meteorologo",
  },
  // === FECHAS ESPECIALES ===
  {
    id: "special-date",
    category: "Eventos",
    titlePattern: "{topic} en Japon: Fecha, Tradiciones y Consejos",
    descriptionPattern: "{description} Todo lo que necesitas saber para vivirlo durante tu viaje a Japon.",
    introPattern: "{description}",
    sections: [
      { heading: "Que es {topic}", content: "{description}" },
      { heading: "Como vivirlo en tu viaje", content: "Para disfrutar de esta fecha, consulta el calendario japones, pregunta en tu hotel por las celebraciones locales y llega temprano a los lugares donde se concentra la gente. Muchos japoneses celebran estas fechas en familia o en los santuarios, asi que respeta las costumbres y aprovecha para vivir el Japon mas autentico." },
      { heading: "Preguntas frecuentes", content: "### ¿Se celebra en todo Japon?\n\nLas fechas tradicionales se celebran en todo el pais, aunque cada region tiene sus propias costumbres. Las grandes ciudades como Tokio y Kioto suelen reunir los actos mas multitudinarios.\n\n### ¿Que debo hacer para participar?\n\nLlega temprano, sigue las indicaciones de los organizadores y observa primero como se comporta la gente local antes de sumarte. Lleva calzado comodo y una bolsa pequeña con lo imprescindible." },
    ],
    tags: ["{topic} japon", "{topic} {year}", "eventos japon", "festividades japon"],
    readTime: "5 min",
    cta: "eventos",
  },
  // === NOVEDADES ===
  {
    id: "news",
    category: "Novedades",
    titlePattern: "{newsTopic} en Japon {year}: Todo lo que Cambia",
    descriptionPattern: "Novedades sobre {newsTopic} en Japon {year}: precios actualizados, nuevas opciones y cambios importantes.",
    sections: [
      { heading: "Que ha cambiado", content: "{changes}" },
      { heading: "Como afecta a los turistas", content: "{impact}" },
      { heading: "Que hacer ahora", content: "{actionItems}" },
      { heading: "Nuestros tips actualizados", content: "{updatedTips}" },
    ],
    tags: ["{newsTopic} japon {year}", "novedades japon", "cambios japon {year}", "actualizacion japon"],
    readTime: "5 min",
    cta: "transporte",
  },
];

// === CONTENIDO RICO ===
// Los datos detallados se mantienen en modulos separados por tema.
export type { CityData } from "./blog-data/cities";
export { cityData } from "./blog-data/cities";
export type { FoodData, TipData } from "./blog-data/food-tips";
export { foodTypes, tipTopics } from "./blog-data/food-tips";
export type { CultureData, SeasonData } from "./blog-data/culture-seasons";
export { culturalTopics, seasonData } from "./blog-data/culture-seasons";

export const specialDates = [
  { month: 1, day: 1, topic: "Hatsumode: El Primer Templo del Ano", description: "Los japoneses visitan templos para dar la bienvenida al nuevo ano." },
  { month: 2, day: 14, topic: "San Valentin en Japon: Solo Chocolate", description: "Las mujeres regalan chocolate a los hombres. Los hombres responden el 14 de marzo." },
  { month: 3, day: 20, topic: "Hanami: La Temporada de los Cerezos", description: "Guia completa para disfrutar los sakura en todo Japon." },
  { month: 4, day: 29, topic: "Golden Week: La Semana Mas Larga", description: "4 festivos seguidos. Japoneses viajan por todo el pais." },
  { month: 5, day: 5, topic: "Kodomo no Hi: El Dia de los Ninos", description: "Dia de celebrar a los niños. Carpas koinobore en los rios." },
  { month: 6, day: 14, topic: "Tsuyu: La Temporada de Lluvias", description: "Como sobrevivir y disfrutar la saison des pluies." },
  { month: 7, day: 7, topic: "Tanabata: El Festival de las Estrellas", description: "Escriben deseos en tanzaku y los cuelgan de bambu." },
  { month: 8, day: 16, topic: "Obon: El Regreso de los Ancestros", description: "Festival budista donde regresan los espiritus de los difuntos." },
  { month: 9, day: 23, topic: "Meijki no Hi: El Dia del Deporte", description: "Ferados nacional. Deportes y actividades al aire libre." },
  { month: 10, day: 31, topic: "Halloween en Japon: Cosplay y Calabazas", description: "Japon adopto Halloween con su toque: cosplay y fiestas en Shibuya." },
  { month: 11, day: 15, topic: "Shichi-Go-San: Los Ninos en el Templo", description: "Ninos de 3, 5 y 7 anos visitan templos vestidos con kimonos." },
  { month: 12, day: 31, topic: "Omisoka: La Nochevieja Japonesa", description: "Toshikoshi soba, campanadas de templos, y hatsumode." },
];
