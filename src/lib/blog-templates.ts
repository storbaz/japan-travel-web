export interface BlogTemplate {
  id: string;
  category: string;
  titlePattern: string;
  descriptionPattern: string;
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
    descriptionPattern: "Todo lo que necesitas saber para visitar {city}: mejores barrios, comida recomendada, transporte y consejos practicos.",
    sections: [
      { heading: "Los barrios imprescindibles de {city}", content: "{neighborhoods}" },
      { heading: "Comida que debes probar", content: "{foodList}" },
      { heading: "Transporte en {city}", content: "{transport}" },
      { heading: "Consejos importantes", content: "{tips}" },
    ],
    tags: ["guia {city}", "{city} {year}", "que hacer en {city}", "viajar a {city}"],
    readTime: "8 min",
    cta: "itinerario",
  },
  // === COMIDA ===
  {
    id: "food-guide",
    category: "Comida",
    titlePattern: "{foodType} en Japon: Guia Completa {year}",
    descriptionPattern: "Descubre todo sobre {foodType} en Japon: donde encontrarlo, precios recomendados y consejos de expertos.",
    sections: [
      { heading: "Que es {foodType}", content: "{foodDescription}" },
      { heading: "Los mejores sitios para probarlo", content: "{bestPlaces}" },
      { heading: "Precios orientativos", content: "{prices}" },
      { heading: "Consejos de experto", content: "{expertTips}" },
    ],
    tags: ["{foodType} japon", "comida japonesa", "gastronomia japon", "donde comer en japon"],
    readTime: "6 min",
    cta: "comida",
  },
  // === CONSEJOS PRACTICOS ===
  {
    id: "practical-tips",
    category: "Consejos",
    titlePattern: "{tipTopic}: {year} Guia Practica",
    descriptionPattern: "Consejos practicos sobre {tipTopic} para viajar a Japon. Ahorra tiempo y dinero con estos tips.",
    sections: [
      { heading: "Por que importa {tipTopic}", content: "{importance}" },
      { heading: "Lo que debes saber", content: "{essentialInfo}" },
      { heading: "Errores comunes", content: "{commonMistakes}" },
      { heading: "Nuestros tips", content: "{ourTips}" },
    ],
    tags: ["{tipTopic} japon", "consejos japon", "tips viaje japon", "como {tipTopic} en japon"],
    readTime: "5 min",
    cta: "presupuesto",
  },
  // === CULTURA ===
  {
    id: "culture",
    category: "Cultura",
    titlePattern: "{culturalTopic} en Japon: Tradicion y Significado",
    descriptionPattern: "Descubre la historia y significado de {culturalTopic} en Japon. Una guia para entender esta tradicion.",
    sections: [
      { heading: "Historia de {culturalTopic}", content: "{history}" },
      { heading: "Como se vive hoy", content: "{modernLife}" },
      { heading: "Donde experimentarlo", content: "{whereToExperience}" },
      { heading: "Datos curiosos", content: "{funFacts}" },
    ],
    tags: ["{culturalTopic} japon", "cultura japonesa", "tradiciones japon", "historia japon"],
    readTime: "7 min",
    cta: "eventos",
  },
  // === TEMPORADA ===
  {
    id: "seasonal",
    category: "Planificacion",
    titlePattern: "{season} en Japon {year}: Guia Completa",
    descriptionPattern: "Todo sobre {season} en Japon {year}: que esperar, que hacer y como disfrutar al maximo.",
    sections: [
      { heading: "Clima y temperaturas", content: "{weather}" },
      { heading: "Eventos destacados", content: "{events}" },
      { heading: "Que llevar en la maleta", content: "{packing}" },
      { heading: "Consejos para {season}", content: "{seasonTips}" },
    ],
    tags: ["{season} japon", "cuando viajar japon", "clima japon {year}", "eventos {season} japon"],
    readTime: "6 min",
    cta: "meteorologo",
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

export const cityData: Record<string, { neighborhoods: string; foodList: string; transport: string; tips: string }> = {
  tokyo: {
    neighborhoods: "Shibuya (cruce famoso, Shibuya Sky), Shinjuku (Golden Gai, Kabukicho), Asakusa (Sensoji, Nakamise), Akihabara (anime, electronica), Harajuku (Takeshita Street, Meiji Jingu), Roppongi (arte, vida nocturna)",
    foodList: "Ramen en Ichiran, sushi en kaitenzushi (100¥/plato), tempura en tempura-ya, wagyu en yakiniku, takoyaki callejero, matcha en cafeterias tematicas",
    transport: "Compra una tarjeta Suica o Pasmo en la estacion. Sirve para metro, trenes y konbini. El metro es limpio, puntual y seguro. Coste: 170-300¥ por viaje.",
    tips: "No comas caminando. Descarga traductor offline. Los cajeros 7-Eleven aceptan tarjetas extranjeras. Llega 10 min antes a citas.",
  },
  kyoto: {
    neighborhoods: "Gion (geishas, Pontocho), Higashiyama (templos, Philosopher's Path), Arashiyama (bambu, Monkey Park), Nishiki Market (comida cubierta), Fushimi (santuario Inari)",
    foodList: "Kaiseki (cena tradicional), yudofu (tofu hervido), matcha y wagashi, ramen en Ramen Street, sake en Fushimi, dulces tradicionales",
    transport: "Bus turistico ilimitado (700¥/dia). Bicicleta alquilada para Higashiyama. Tren a Arashiyama (15min desde Kyoto Station).",
    tips: "Ve a los templos temprano (7-8am). Viste kimono para fotos. Gion de noche para ver geishas. Reserva kaiseki con antelacion.",
  },
  osaka: {
    neighborhoods: "Dotonbori (street food, Glico Man), Shinsekai (retro, Tsutenkaku), Namba (compras, vida nocturna), Kuromon Market (marisco), Umeda (moderno, Umeda Sky)",
    foodList: "Takoyaki (Wanaka, Creo-Ru), okonomiyaki estilo Osaka, kushikatsu en Daruma, gyoza, udon, ramen en Ramen Yokocho",
    transport: "Tarjeta ICOCA para trenes y konbini. Metro economico (230-360¥). Osaka Amazing Pass (2800¥/dia = trenes + entradas gratis).",
    tips: "Osaka es la capital de la comida. Dotonbori de noche es espectacular. Prueba el takoyaki en al menos 3 sitios. Kuromon Market para desayuno.",
  },
  hiroshima: {
    neighborhoods: "Peace Memorial Park (Atomic Bomb Dome, Museo), Miyajima (Itsukushima, Monte Misen), Hondori (compras), Okonomimura (edificio de okonomiyaki)",
    foodList: "Okonomiyaki estilo Hiroshima (capas), ostiones gigantes en Miyajima, momiji manju (pastel de arce), ostras frescas",
    transport: "Shinkansen desde Tokio (4h) o Osaka (1.5h). Ferry a Miyajima (10min, 180¥). Tranvia local economico.",
    tips: "Peace Memorial Museum: muy emotivo, reserva 2-3h. Miyajima: ve el torii con marea alta Y baja. Okonomimura: 24 restaurantes en un edificio.",
  },
  nara: {
    neighborhoods: "Nara Park (ciervos, templos), Todai-ji (Buda gigante), Kasuga Taisha (linternas), Naramachi (barrio antiguo), Isuien Garden",
    foodList: "Kakinoha sushi (envuelto en hoja de kaki), mochi fresco, manju (pastel japonés), sake local",
    transport: "Tren desde Kioto (45min, 720¥). Desde Osaka (35min, 820¥). Caminable una vez en Nara.",
    tips: "Los ciervos muerden: compra galletas (200¥) y guárdalas bien. Ve temprano para evitar multitudes. Monte Wakakusa para vistas panoramicas.",
  },
  kanazawa: {
    neighborhoods: "Kenroku-en (jardin top-3), Higashi Chaya (barrio geisha), Omicho Market (200+ tiendas), Nagamachi (barrio samurai), 21st Century Museum",
    foodList: "Kaisendon (arroz con marisco fresco), gold leaf ice cream, sake local, jaibos (cangrejo), soba artesanal",
    transport: "Shinkansen desde Tokio (2.5h). Bus turistico_LOOP (500¥/dia). Bicicleta recomendada para moverse.",
    tips: "Kanazawa = el Kioto del norte, menos turistas y mas barato. Kenroku-en: uno de los 3 jardines mas bellos de Japon. Omicho Market para desayuno.",
  },
  fukuoka: {
    neighborhoods: "Nakasu (yatai, vida nocturna), Tenjin (compras, subterraneo), Hakata (ramen, templos), Canal City (centro comercial), Ohori Park",
    foodList: "Hakata ramen (tonkotsu) en yatai, motsunabe (intestinos), mentaiko (pescado picante), gyoza, motsunabe",
    transport: "Subterráneo economico (260¥ maximo). Bus turistico. Tren a Beppu (2h) para onsen.",
    tips: "Fukuoka = la capital del ramen. Yatai: puestos abiertos solo de noche a orillas del rio. Prueba el tonkotsu cremoso. Barrio mas autentico que Tokio.",
  },
  nagoya: {
    neighborhoods: "Sakae (centro, Underground Mall), Osu (electronica, ropa), Atsuta (santuario), Nagoya Castle, Komatsu Yokocho",
    foodList: "Hitsumabushi (anguila a la parrilla, 3 formas), miso katsu, tebasaki (alitas), kishimen (fideos anchos), ogura toast",
    transport: "Shinkansen desde Tokio (1h40). Metro economico. Bicicleta recomendada para la zona central.",
    tips: "Nagoya es ciudad subestimada. Hitsumabushi es INCREIBLE. Osu es el Akihabara de Nagoya. Atsuta Shrine: uno de los mas importantes de Japon.",
  },
  hakone: {
    neighborhoods: "Hakone-Yumoto (onsen, estacion), Gora (jardin, cable car), Owakudani (volcanes), Lake Ashi (cruise), Motohakone (torii)",
    foodList: "Hoto noodles (especialidad), kuro-tamago (huevo negro volcanico), onsen tamago, ryokan kaiseki",
    transport: "Romancecar desde Shinjuku (1.5h, 2330¥). Hakone Free Pass: transporte ilimitado 2-3 dias desde Shinjuku.",
    tips: "Hakone Free Pass vale la pena si visitas 2+ sitios. Onsen: sin tatuajes en banos publicos. Ryokan privado: ~15000¥. Owakudani: prueba el huevo negro.",
  },
};

export const foodTypes = [
  { type: "Ramen", description: "Sopa de fideos japonesa. Cada region tiene su estilo: tonkotsu (Okinawa), miso (Sapporo), shoyu (Tokio).", prices: "800-1,200 yen (5-8€)", bestPlaces: "Ichiran (cadena), Fuunji (Shinjuku), Afuri (ramen de limon), Ippudo", expertTips: "Sopla los fideos fuerte. Bebe el caldo directamente del tazon. No dejes fideos en el caldo." },
  { type: "Sushi", description: "Arroz con pescado fresco. Desde kaitenzushi (rotativo) hasta sushi premium.", prices: "Kaitenzushi: 100¥/plato. Normal: 2,000-5,000¥. Premium: 10,000¥+", bestPlaces: "Kaitenzushi Sushiro, Genki Sushi, Tsukiji Outer Market, Omotesando", expertTips: "Come el sushi en 2 bocados. No pongas mucho wasabi. El pescado va primero, no el arroz." },
  { type: "Tempura", description: "Mariscos y verduras rebozadas y fritas. Crujiente por fuera, tierno por dentro.", prices: "1,000-2,000¥ (6-12€)", bestPlaces: "Tsunahachi (Shinjuku), Tenpura Tsunahachi, Daikokuya", expertTips: "Come caliente. El tentsuyu (salsa) es mejor con ralladura de rabano. No lo dejes enfriar." },
  { type: "Wagyu", description: "La mejor carne del mundo. Terneza, veteado y sabor incomparable.", prices: "3,000-15,000¥ (20-100€)", bestPlaces: "Yakiniku (parrilla), sukiyaki, shabu-shabu, steakhouse", expertTips: "Cocina poco: 30 segundos por lado. La grasa se derrite a 25°C. No pedir mas de medium." },
  { type: "Okonomiyaki", description: "Tortilla salada japonesa. Estilo Osaka (mezclada) vs Hiroshima (capas).", prices: "800-1,500¥ (5-10€)", bestPlaces: "Mizuno (Osaka), Chibo, Okonomimura (Hiroshima)", expertTips: "En Osaka se mezcla todo. En Hiroshima van capas. Pide bonito flakes encima." },
  { type: "Yakitori", description: "Brochetas de pollo a la parrilla. Perfectas con cerveza.", prices: "100-200¥ por brocheta", bestPlaces: "Torikizoku, Toriki, bares en Omoide Yokocho", expertTips: "Pide 'tare' (salsa dulce) o 'shio' (sal). Los muslos son mas jugosos que las pechugas." },
];

export const tipTopics = [
  { topic: "Transporte en Japon", importance: "El transporte es caro si no sabes como usarlo. UnJR Pass puede ahorrarte cientos de euros.", essentialInfo: "JR Pass: 50,000¥/7 dias. Suica/Pasmo: tarjeta recargable. Shinkansen: 120-240km/h.", commonMistakes: "No comprar JR Pass si solo vas a Tokio. No reservar asientos en Shinkansen. Comer en el tren.", ourTips: "Compra Suica en el aeropuerto. Usa Google Maps para rutas. El JR Pass vale la pena para Tokyo-Kyoto-Osaka." },
  { topic: "Presupuesto para Japon", importance: "Japon puede ser barato o caro dependiendo de como viajes.", essentialInfo: "Low budget: 80€/dia. Comfort: 160€/dia. Premium: 350€/dia.", commonMistakes: "No traer efectivo suficiente. Comer solo en restaurantes caros. No usar konbini.", ourTips: "Come en konbini (bento 300-600¥). Usa transporte publico, no taxis. Alojamiento en hostales (2,000-4,000¥/noche)." },
  { topic: "Equipaje para Japon", importance: "Llevar demasiado es un error comun. Japon tiene konbini y 100-yen shops.", essentialInfo: "Ropa ligera, calzado comodo, adaptador de enchufe (tipo A/B), botella reutilizable.", commonMistakes: "Llevar太多 ropa. No traer calzado comodo. Olvidar el adaptador.", ourTips: "Lava ropa en konbini (300¥). Los 100-yen shops tienen de todo. Mochila pequeña + maleta."},
  { topic: "Frases Utiles en Japones", importance: "El ingles es limitado fuera de Tokio. 10 frases basicas te salvan.", essentialInfo: "Sumimasen (disculpe), Arigatou (gracias), Doko desu ka (donde esta?), Ikura (cuanto cuesta?).", commonMistakes: "No aprender frases basicas. Hablar muy alto. No decir itadakimasu antes de comer.", ourTips: "Descarga Google Translate con japon offline. Usa el traductor de ViajApp. Sonrie al hablar." },
  { topic: "Conexion a Internet en Japon", importance: "Sin internet estas perdido. Google Maps es tu mejor amigo.", essentialInfo: "eSIM: 15-20€/mes. Pocket WiFi: 5-10€/dia. WiFi gratis en konbini y estaciones.", commonMistakes: "Usar roaming (carisimo). No traer power bank. Depender solo de WiFi publico.", ourTips: "Compra eSIM antes de viajar. Lleva power bank. WiFi gratis en 7-Eleven, McDonald's, estaciones." },
  { topic: "Costumbres y Etiqueta en Japon", importance: "Respetar las costumbres te ganara simpatia y evitara situaciones incomodas.", essentialInfo: "No propina. No comas caminando. Quítate los zapatos donde pidan. Silencio en trenes.", commonMistakes: "Dar propina (es grosero). Comer en el tren. Hablar por telefono en transporte.", ourTips: "Dice 'itadakimasu' antes de comer. Dice 'gochisousama' despues. No toques a las geishas." },
];

export const culturalTopics = [
  { topic: "Ceremonia del Te (Chado)", history: "Origina en el siglo XVI. Influencia zen. Simplicidad y respeto.", modernLife: "Se practica en escuelas de te. Experiencias para turistas en Kioto.", whereToExperience: "Camellia Garden (Kioto), Jotokuji Temple, escuelas privadas.", funFacts: "Un Bowl de te puede costar 1,000¥ o 10,000¥ dependiendo de la escuela." },
  { topic: "Geishas", history: "Artistas tradicionales desde el siglo XVIII. Musica, danza, conversacion.", modernLife: "Menos de 1,000 geishas en todo Japon. mayoria en Kioto (Gion).", whereToExperience: "Gion (Kioto), paseos por la noche, espectaculos de Gion Corner.", funFacts: "Las maiko (aprendizas) llevan 3-5 anos de formacion. No son prostitutas." },
  { topic: "Onsen (Banos Termales)", history: "Tradicion de 1,000+ anos. Agua natural caliente con propiedades curativas.", modernLife: "Hay 3,000+ onsen en Japon. Algunos permiten tatuajes, la mayoria no.", whereToExperience: "Hakone, Beppu, Kinosaki, Noboribetsu, Kusatsu.", funFacts: "El agua debe tener minerales. Si no, es solo un bano caliente (noto onsen)." },
  { topic: "Festivales (Matsuri)", history: "Cada santuario tiene su festival. Algunos tienen 1,000+ anos de historia.", modernLife: "Hay 300,000+ festivales al ano. Los mas grandes: Gion Matsuri, Nebuta, Takayama.", whereToExperience: "Julio: Gion Matsuri (Kioto). Agosto: Nebuta (Aomori). Octubre: Takayama.", funFacts: "Los mikoshi (santuarios portatiles) pesan hasta 1 tonelada y se cargan entre 40 personas." },
  { topic: "Sakura (Cerezos)", history: "Simbolo de Japon desde el siglo VIII. Representan la transitoriedad de la vida.", modernLife: "Hanami (ver cerezos) es tradicion nacional. Millones de personas salen a picnic.", whereToExperience: "Tokio: Ueno Park. Kioto: Maruyama Park. Osaka: Osaka Castle.", funFacts: "El sakura front se mueve de sur a norte. Se publica forecast cada ano en marzo." },
  { topic: "Templos y Santuarios", history: "80,000+ templos budistas y 80,000+ santuarios sintoistas en Japon.", modernLife: "Siguen activos. Los japoneses van a pedir suerte, salud, examenes.", whereToExperience: "Senso-ji (Tokio), Fushimi Inari (Kioto), Meiji Jingu (Tokio), Itsukushima (Hiroshima).", funFacts: "Los torii marcan la entrada al mundo espiritual. El rojo ahuyenta a los malos espiritus." },
];

export const seasonData: Record<string, { weather: string; events: string; packing: string; seasonTips: string }> = {
  primavera: {
    weather: "10-20°C. Dias soleados. Lluvias ocasionales en abril. Cerezos en flor de marzo a abril.",
    events: "Hanami (picnic bajo cerezos), Sakura Matsuri (festivales), Golden Week (semana festiva abril-mayo).",
    packing: "Capas ligeras, chaqueta impermeable, paraguas compacto, calzado comodo.",
    seasonTips: "Reserva alojamiento con 3 meses de antelacion. Precios suben 50%. Los parques se llenan por la tarde.",
  },
  verano: {
    weather: "25-35°C. Muy caluroso y humedo. Temporada de lluvias (tsuyu) en junio-julio.",
    events: "Hanabi (fuegos artificiales), Matsuri (festivales), Obon (festivo agosto).",
    packing: "Ropa ligera, protector solar, abanico, toalla, botella reutilizable.",
    seasonTips: "Bebe mucha agua. Usa aire acondicionado. Los festivales son de noche. Agosto es el mes mas caluroso.",
  },
  otono: {
    weather: "10-20°C. Dias claros. Hojas rojas (koyo) de octubre a noviembre.",
    events: "Koyo (hojas rojas), Halloween, festivals de cosecha, iluminaciones.",
    packing: "Chaqueta ligera, sudadera, calzado comodo, bufanda ligera.",
    seasonTips: "Noviembre es la mejor epoca: buen clima + hojas rojas. Nikko y Kioto son los mejores lugares para koyo.",
  },
  invierno: {
    weather: "-5-10°C. Nieve en el norte (Hokkaido, Nagano). Calido en el sur (Okinawa).",
    events: "Nieve y esqui, onsen, Iluminaciones de Navidad, Año Nuevo (_hatsumode_).",
    packing: "Abrigo, bufanda, guantes, calzado impermeable, calcetines termicos.",
    seasonTips: "Diciembre es barato excepto Navidad. Enero: templos llenos de gente. Hokkaido: nieve perfecta para esquiar.",
  },
};

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
