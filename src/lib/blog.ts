export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "guia-completa-viajar-japon",
    title: "Guia Completa para Viajar a Japon: Todo lo que Necesitas Saber",
    description: "La guia definitiva para viajar a Japon por primera vez: cuando ir, presupuesto, visado, transporte, itinerario de 14 dias, comida, alojamiento y consejos practicos.",
    category: "Guias",
    readTime: "15 min",
    date: "2026-08-01",
    tags: ["viajar a japon", "guia viajar japon", "como viajar a japon", "primer viaje a japon", "planificar viaje japon", "itinerario japon", "consejos viajar japon", "viaje japon blog"],
    content: `
Viajar a Japon es una experiencia que cambia la vida: templos milenarios, ciudades futuristas, comida increible y una cultura que sorprende en cada esquina. Pero tambien es un destino que exige planificacion. Esta guia completa para viajar a Japon reune todo lo que necesitas saber antes de comprar el billete.

## Cuando viajar a Japon: la mejor epoca

Japon tiene cuatro estaciones bien diferenciadas y cada una ofrece algo distinto:

- **Primavera (marzo-mayo):** la temporada de los cerezos en flor (sakura). Es la epoca mas popular y bonita, pero tambien la mas cara. Los precios de hoteles se disparan.
- **Verano (junio-agosto):** calor y humedad intensos, pero hay festivales espectaculares y fuegos artificiales. Junio es temporada de lluvias.
- **Otono (septiembre-noviembre):** las hojas rojas (koyo) pintan Kioto y Nikko. Clima agradable y paisajes increibles. Mi recomendacion personal.
- **Invierno (diciembre-febrero):** ideal para onsen en los Alpes japoneses, esqui y evitar aglomeraciones. Japon iluminado en Navidad es magico.

**Si puedes elegir, ve en otono o primavera.** Evita la Golden Week (finales de abril-principios de mayo), cuando todo Japon esta de vacaciones.

## Cuanto cuesta viajar a Japon

Japon ya no es el pais caro que era. Con el yen debil, viajar a Japon es mas barato que nunca. Un presupuesto realista:

- **Viaje economico:** 60-90 euros/dia (hostales, konbini, transporte publico)
- **Viaje medio:** 120-180 euros/dia (hoteles de 3 estrellas, restaurantes normales)
- **Viaje premium:** 250+ euros/dia (hoteles de lujo, cenas en restaurantes de renombre)

El billete de avion desde Espana cuesta entre 500 y 900 euros ida y vuelta. El alojamiento en Tokio ronda los 50-150 euros la noche. **Lleva efectivo:** Japon sigue siendo un pais muy de efectivo, aunque aceptan tarjeta en cadenas grandes.

## Visado y documentacion para viajar a Japon

Los espanoles no necesitan visado para estancias turisticas de hasta 90 dias. Solo necesitas:

- **Pasaporte** valido con al menos 6 meses de vigencia
- **Billete de vuelta** (pueden pedirtelo en inmigracion)
- **Confirmacion de alojamiento** (aunque no siempre lo piden)

A la llegada al aeropuerto rellenaras un formulario de inmigracion y uno de aduanas. Ahora tambien puedes hacerlo online en Visit Japan Web para ahorrar tiempo.

## Vuelos a Japon y como llegar

Los vuelos directos desde Madrid y Barcelona tardan unas 13-14 horas. Las principales aeropuertos de llegada son:

- **Narita (NRT):** el mas comun para vuelos internacionales, a 1 hora de Tokio
- **Haneda (HND):** mas cercano a Tokio, cada vez con mas rutas internacionales
- **Kansai (KIX):** puerta de entrada a Kioto y Osaka

Para llegar al centro desde el aeropuerto usa el Narita Express o la Skyliner (desde Narita) o el monorrail y la linea Keikyu (desde Haneda). No cojas taxi a menos que sea emergencia: es carisimo.

## Transporte en Japon: JR Pass, Suica y el Shinkansen

### La tarjeta IC (Suica o Pasmo)

Es tu mejor amiga en Japon. Se compra en cualquier estacion, se recarga con efectivo y sirve para:

- Metro y trenes urbanos
- Autobuses
- Konbini (7-Eleven, Lawson, FamilyMart)
- Maquinas expendedoras y taquillas

### El Japan Rail Pass (JR Pass)

El JR Pass te da acceso ilimitado a la red de JR, incluido el **Shinkansen** (tren bala). Vale la pena si vas a moverte entre ciudades. Recuerda:

- **7 dias:** unos 50,000 yenes (~320 euros)
- **14 dias:** ~80,000 yenes
- **21 dias:** ~100,000 yenes

Antes de comprarlo, calcula si te sale rentable. Si solo haces Tokio-Kioto-Osaka, un billete de ida en shinkansen cuesta ~13,000 yenes, asi que un JR Pass de 7 dias solo se amortiza con al menos 3-4 viajes largos. Puedes usar la calculadora gratuita de ViajApp para comprobarlo.

### El Shinkansen (tren bala)

El tren mas famoso del mundo. Es puntual (hasta el segundo), comodo y rapido:

- Tokio-Kioto: ~2h 20min
- Tokio-Osaka: ~2h 30min
- Tokio-Hiroshima: ~4h

Reserva asiento en los trenes Nozomi y Mizuho con el JR Pass solo si pagas suplemento; los trenes Hikari y Sakura si estan incluidos.

## Itinerario de 14 dias para viajar a Japon (ideal para primera vez)

### Dias 1-4: Tokio
El gigante futurista. Imprescindibles: Shibuya Crossing, Shinjuku, templo Sensoji en Asakusa, Akihabara, Harajuku, y el mercado de Toyosu. Dedica un dia a Nikko o Kamakura si tienes tiempo.

### Dias 5-6: Hakone o Fuji
El monte Fuji y sus onsen. Un ryokan (posada tradicional) con baños termales es una experiencia imprescindible. Ver el lago Ashi y el cablecar.

### Dias 7-9: Kioto
La capital cultural de Japon. El santuario Fushimi Inari con sus miles de torii rojos, el bosque de bambu de Arashiyama, el barrio de Gion, y el templo dorado Kinkaku-ji.

### Dias 10-11: Nara
A 45 minutos de Kioto. Los ciervos libres del parque y el Gran Buda del templo Todai-ji. Media jornada basta.

### Dias 12-13: Osaka
La capital gastronomica. Dotonbori con sus luces de neon, el castillo de Osaka, y un dia en el parque de atracciones Universal Studios si te apetece.

### Dia 14: Osaka y vuelta a casa
Aprovecha para comprar souvenirs en Shinsaibashi y toma el vuelo desde Kansai.

Este itinerario es relajado y combina ciudad, naturaleza y cultura. Si tienes mas dias, anade Hiroshima (la bomba atomica y el santuario de Miyajima) o Kanazawa.

## Alojamiento en Japon: donde dormir

- **Ryokan:** posadas tradicionales con futon, tatami y onsen. La experiencia mas japonesa (80-300 euros/noche)
- **Hotel capsula:** barato y curioso, ideal para 1-2 noches (30-60 euros)
- **Hostal:** perfecto para presupuesto ajustado (25-50 euros/noche)
- **Business hotel:** el equilibrio ideal, pequeños pero comodos (50-100 euros)
- **Hotel occidental:** lo que esperas de un hotel clasico (100-250 euros)

**Reserva con antelacion.** En temporada de cerezos y otono los hoteles de Kioto se llenan meses antes.

## Comida en Japon: que probar

Japon es un paraiso gastronomico. Imprescindibles:

- **Ramen:** el plato de fideos mas reconfortante
- **Sushi y sashimi:** fresco, delicioso y asequible en los kaitenzushi (sushi rotativo)
- **Tempura:** fritura ligera de marisco y verduras
- **Okonomiyaki:** crepe-salvaje con repollo, especialidad de Osaka
- **Takoyaki:** bolas de pulpo, el street food rey
- **Kaiseki:** la alta cocina japonesa tradicional (si el presupuesto lo permite)
- **Convenience stores:** los onigiri, bentos y postres de 7-Eleven son adictivos y baratisimos

**Tip:** en las konbini los bento se descuentan 20-30% a partir de las 20:00.

## Apps imprescindibles para viajar a Japon

- **Google Maps:** funciona perfectamente para transporte
- **Google Translate:** con camara para menus y senales
- **Hyperdia o Jorudan:** para consultar horarios de tren
- **ViajApp:** la app gratis con planificador de viajes con mapa, calculadora de JR Pass, traductor de frases, conversor de moneda y guia de presupuesto

## Etiqueta: 10 reglas para no meter la pata

1. **No hables alto** en transporte publico; pon el telefono en silencio
2. **No comas caminando**; en Japon se come sentado
3. **Quitate los zapatos** en casas, ryokan y algunos restaurantes
4. **No des propina**; en Japon se considera de mal gusto
5. **Lleva pañuelo** para limpiarte las manos (no hay jabon en muchos banos)
6. **Recicla y separa la basura**; en la calle hay casi no hay papeleras
7. **No te pongas el abanico/paraguas de otros**... en realidad: no uses el movil en el tren ni hables por el
8. **Salta la linea en el metro** (los pasajeros se forman en orden)
9. **El lado izquierdo de las escaleras** para subir, el derecho para bajar (en Tokio)
10. **Sonrie y di "arigato"** siempre: te abrira puertas

## Preguntas frecuentes sobre viajar a Japon

### Es seguro viajar a Japon?
Japon es uno de los paises mas seguros del mundo. La delincuencia es minimisima y puedes caminar de noche sin problema.

### Necesito saber japones?
No. En Tokio y zonas turisticas mucha gente habla ingles basico, y las senales del transporte son bilingues. Aun asi, aprender 10 frases basicas (arigato, sumimasen, kudasai) cambia por completo la experiencia.

### Japones habla ingles?
Menos de lo que piensas, pero el turismo ha mejorado mucho. Ten a mano un traductor y los carteles del metro tienen nombres en ingles.

### Cuantos dias son recomendables para la primera vez?
De 10 a 14 dias es lo ideal. Con menos te quedaras corto; con mas, puedes explorar Japon mas profundo.

### Que epoca es mejor para evitar lluvia?
Otono (octubre-noviembre) y primavera (abril) son las menos lluviosas. Junio y septiembre son los meses mas humedos.

### Puedo beber agua del grifo?
Si, el agua del grifo en Japon es potable y de excelente calidad. Lleva una botella reutilizable.

## Resumen: viajar a Japon paso a paso

1. Decide la fecha (primavera u otono idealmente)
2. Compra el vuelo con 2-4 meses de antelacion
3. Reserva hoteles pronto, sobre todo en Kioto
4. Evalua si te conviene el JR Pass con una calculadora
5. Prepara la tarjeta Suica o compra una en el aeropuerto
6. Lleva efectivo (30-50% de tus pagos seran en cash)
7. Descarga ViajApp con el mapa interactivo y el traductor
8. Disfruta sin prisa y respeta las costumbres

Viajar a Japon no es un viaje mas: es una experiencia que cambia tu forma de ver el mundo. Con esta guia estas preparado para disfrutarlo al maximo. Si quieres planificar tu ruta con mapa, presupuesto y frases utiles, prueba la guia de viaje gratuita de [ViajApp](https://viajapp.app) y conviertelo en el viaje de tu vida.

[cta:presupuesto]
    `,
  },
  {
    slug: "viajapp-todo-necesitas-viajar-japon",
    title: "ViajApp: Todo lo que Necesitas para Viajar a Japon en 2026",
    description: "Descubre todas las herramientas gratuitas de ViajApp: Kit de Supervivencia interactivo, planificador de viajes, calculadora JR Pass, traductor y mas.",
    category: "Guias",
    readTime: "7 min",
    date: "2026-07-25",
    tags: ["app japon", "viajapp", "herramientas japon", "planificar viaje japon", "guia japon 2026"],
    content: `
Viajar a Japon puede ser abrumador: idioma diferente, transporte complejo, costumbres desconocidas. **ViajApp** nacio para resolver exactamente eso. Aqui te contamos todo lo que puedes hacer con ella.

## 1. Kit de Supervivencia Interactivo

El corazon de ViajApp es un mapa interactivo con **+100 puntos de interes** en 9 ciudades japonesas. Divide en 10 categorias:

- **💧 Agua** - Fuentes publicas para rellenar tu botella
- **🚻 Baños** - Baños limpios (incluye occidentales)
- **💴 ATM** - Cajeros que aceptan tarjetas extranjeras
- **🔒 Taquillas** - Para dejar equipaje en estaciones
- **📶 WiFi** - Zonas con conexion gratuita
- **🏪 24h** - Konbini abiertas toda la noche
- **🗑️ Papelera** - Contenedores de reciclaje
- **💊 Farmacia** - Matsumoto Kiyoshi, Tomod's
- **🚬 Fumar** - Zonas designadas (prohibido en la calle)
- **ℹ️ Info** - Oficinas de turismo multilingue

Filtra por ciudad y categoria. Los puntos aparecen en el mapa de tu ruta de viaje.

## 2. Planificador de Viajes con Mapa

Selecciona tus ciudades de destino, duracion del viaje e intereses (comida, cultura, naturaleza, anime...). ViajApp genera:

- **Itinerario dia por dia** con actividades recomendadas
- **Mapa interactivo** con la ruta optimizada y marcadores numerados
- **Survival Kit integrado** - ves los POIs mas cercanos a tu ruta
- **Costes estimados** de cada actividad
- **Links directos** a GetYourGuide y Klook para reservar

## 3. Calculadora de JR Pass

El Japan Rail Pass es una inversion importante (50,000 yenes por 7 dias). Nuestra calculadora:

- Introduce las ciudades que vas a visitar
- Analiza si el JR Pass te conviene en funcion de tu ruta
- Muestra el desglose en euros
- Incluye alternativas: tarjeta IC (Suica/Pasmo) vs JR Pass

## 4. Traductor Japones-Espanol

+120 frases traducidas organizadas por categorias: transporte, restaurantes, compras, emergencias. Funciona con deteccion automatica del idioma de entrada.

Frases como "Donde esta la estacion mas cercana?" o "Esto es vegetariano?" al alcance de un click.

## 5. Buscador de Vuelos

Comparador con 45+ ciudades de origen (Espa~na, Latinoamerica, Europa, EE.UU.). Busca por ciudad o introduce codigo IATA directamente.

## 6. Blog con Contenido Automatico

Sistema de generacion automatica de articulos sobre cultura japonesa, guias de ciudades, gastronomia y consejos practicos. Nuevo contenido cada pocos dias sin depender de IA.

## 7. Paginas de Ciudades Detalladas

Tokio, Kioto, Osaka, Hiroshima, Nara, Kanazawa, Hakone y Fukuoka. Cada ciudad con:

- Lugares imprescindibles
- Comida recomendada
- Transporte local
- Links de afiliado a Booking, GetYourGuide y Amazon

## Proximamente

- **Shopping List** - Lista de productos y tiendas con sharing
- **Cash vs Card Map** - Donde pagar con tarjeta vs efectivo
- **Food Allergy Card** - Tarjeta traducida para alergias alimentarias

---

**ViajApp es 100% gratis.** Sin registro obligatorio. Sin ads invasivos. Creada por viajeros, para viajeros.

> [Visita ViajApp](https://viajapp.app) y empieza a planificar tu viaje a Japon.

[cta:itinerario]
    `,
  },
  {
    slug: "10-consumidor-ahorrar-dinero-japon",
    title: "10 Formas de Ahorrar Dinero en Japon en 2026",
    description: "Descubre como viajar a Japon gastando menos. Tips reales de ahorradores: konbini, JR Pass, alojamiento barato y mas.",
    category: "Ahorro",
    readTime: "5 min",
    date: "2026-07-15",
    tags: ["ahorrar dinero japón", "viajar barato japon", "tips japon economicos", "presupuesto japon"],
    content: `
## 1. Come en Konbini (tiendas de conveniencia)

Las konbini como 7-Eleven, Lawson y FamilyMart tienen comida deliciosa y barata. Un bento cuesta entre 300-600 yenes (2-4 euros). Los onigiri cuestan apenas 120-150 yenes.

**Pro tip:** Los bento se descuentan 20-30% despues de las 8pm.

## 2. Usa el JR Pass sabiamente

El JR Pass de 7 dias cuesta ~50,000 yenes. Si planeas hacer Tokyo-Kioto-Osaka, se paga solo. Compralo por adelantado en linea.

## 3. Alojamiento en hostales y capsule hotels

Los hostales cuestan 2,000-4,000 yenes/noche. Los capsule hotels 3,000-5,000. Mucho mas barato que un hotel (8,000+).

## 4. Agua del grifo es potable

No compres botellas. Lleva una botella reutilizable y rellena en estaciones de tren que tienen fuentes gratuitas.

## 5. Usa transporte publico, no taxis

Un taxi corto cuesta 1,500+ yenes. El metro cuesta 170-300 yenes por viaje. Compra una Suica o Pasmo card.

## 6. Aprovecha los 100-yen shops

Daiso, Seria y Can Do tienen de todo por 100 yenes. Souvenirs, utensilios de cocina, accesorios.

## 7. Templos gratuitos

Muchos templos y santuarios son gratuitos. Meiji Jingu, Sensoji, Fushimi Inari no cuestan nada.

## 8. Almuerzo en vez de cena

Los restaurantes ofrecen "lunch sets" mucho mas baratos que los platos de la noche. Un lunch puede costar 800-1,200 yenes vs 2,000+ en la noche.

## 9. Evita el roaming

Compra un eSIM antes de viajar. Datos ilimitados por 15-20 euros/mes. Mucho mas barato que el roaming.

## 10. Descarga ViajApp

Nuestra app tiene conversor de moneda, guias de restaurantes y mapa interactivo. Todo gratis para ayudarte a gastar menos.

[cta:presupuesto]
    `,
  },
  {
    slug: "guia-completa-tokio-primerizo",
    title: "Guia Completa de Tokio para Primerizos",
    description: "Todo lo que necesitas saber para tu primer viaje a Tokio: transporte, barrios que visitar, comida recomendada y consejos practicos.",
    category: "Guias",
    readTime: "8 min",
    date: "2026-07-10",
    tags: ["guia tokio", "tokio primerizo", "que hacer en tokio", "tokio japon"],
    content: `
## Los barrios imprescindibles

### Shibuya
El cruce mas famoso del mundo. Visita el Hachiko statue y el Shibuya Sky para vistas panoramicas.

### Shinjuku
Estacion mas grande del mundo. Kabukicho para vida nocturna, Golden Gai para bares pequeños, Omoide Yokocho para ramen.

### Asakusa
El templo Sensoji es imprescindible. La calle Nakamise tiene souvenirs tradicionales.

### Akihabara
El barrio de los animes, manga y electronica. Tiendas de pisos y maid cafes.

### Harajuku
Takeshita Street para moda juvenil, Meiji Jingu para un santuario tranquilo.

## Transporte en Tokio

Compra una tarjeta Suica o Pasmo en la estacion. Sirve para metro, trenes y hasta konbini. El metro es limpio, puntual y seguro.

## Comida que debes probar

- **Ramen** en Ichiran o Fuunji
- **Sushi** en un kaitenzushi (sushi rotativo) por 100 yenes/plato
- **Tempura** en un tempura-ya
- **Wagyu** en un yakiniku (parrilla japonesa)

## Consejos importantes

- No comas caminando. En Japon se come sentado.
- Descarga un traductor offline. Muy util para menus.
- Los cajeros 7-Eleven aceptan tarjetas extranjeras.

[cta:itinerario]
    `,
  },
  {
    slug: "mejores-estaciones-para-viajar-japon",
    title: "Las Mejores Estaciones para Viajar a Japon",
    description: "Cada estacion en Japon tiene algo especial: cerezos en primavera, festivales en verano, hojas rojas en otono y nieve en invierno.",
    category: "Planificacion",
    readTime: "6 min",
    date: "2026-07-05",
    tags: ["mejor epoca japon", "cuando viajar japon", "cerezos japon", "hojas rojas japon"],
    content: `
## Primavera (Marzo-Mayo): Los cerezos

La estacion mas popular. Los sakura florecen entre finales de marzo y abril. Los mejores lugares para verlos: Ueno Park (Tokio), Maruyama Park (Kioto), Osaka Castle.

**Consejo:** Reserva alojamiento con 3 meses de antelacion. Los precios suben 50%.

## Verano (Junio-Agosto): Festivales y fuegos artificiales

Junio-Julio es temporada de lluvias (tsuyu). Agosto es caluroso pero lleno de festivales (matsuri). Los fuegos artificiales (hanabi) son espectaculares.

**Consejo:** Lleva un abanico y mantente hidratado.

## Otono (Septiembre-Noviembre): Hojas rojas

Los momiji (hojas rojas) pintan los templos de rojo y naranja. Los mejores lugares: Nikko, Kioto (Tofukuji), Hakone.

**Consejo:** Noviembre es la mejor平衡 entre buen clima y belleza natural.

## Invierno (Diciembre-Febrero): Nieve y onsen

Hokkaido y las montanas de Nagano tienen nieve perfecta para esquiar. Los onsen (baños termales) son especialmente disfrutables con nieve.

**Consejo:** Diciembre tiene buenos precios excepto Año Nuevo.

[cta:meteorologo]
    `,
  },
  {
    slug: "frases-esenciales-japones-viajeros",
    title: "30 Frases en Japones que Todo Viajero Debe Conocer",
    description: "No necesitas hablar japones perfectamente. Estas 30 frases te ayudaran a comunicarte, ser cortes y disfrutar mas de tu viaje.",
    category: "Idioma",
    readTime: "4 min",
    date: "2026-06-28",
    tags: ["frases japones", "japones basico", "aprender japones", "comunicarse japon"],
    content: `
## Saludos y cortesia

1. **Konnichiwa** (Hola) - Para el dia
2. **Ohayou gozaimasu** (Buenos dias) - Antes de las 10am
3. **Konbanwa** (Buenas tardes/noches) - Despues de las 5pm
4. **Arigatou gozaimasu** (Muchas gracias) - Formal
5. **Sumimasen** (Disculpe/Perdon) - El mas util de todos

## En restaurantes

6. **Kudasai** (Por favor) - Cuando pidas algo
7. **Oishii** (Delicioso) - Para elogiar la comida
8. **Okaikei onegaishimasu** (La cuenta, por favor)
9. **Tabemasen** (No como eso) - Para restricciones alimentarias
10. **Biiru hitotsu** (Una cerveza, por favor)

## En transporte

11. **Doko desu ka?** (Donde esta?)
12. **Eki wa doko desu ka?** (Donde esta la estacion?)
13. **Kippu** (Boleto)
14. **Tasukete** (Ayuda) - En emergencia

## Compras

15. **Ikura desu ka?** (Cuanto cuesta?)
16. **Takai** (Caro)
17. **Yasui** (Barato)
18. **Kore wo kudasai** (Este, por favor) - Señalando
19. **Cardo wa?** (Aceptan tarjeta?)

## Cortesia diaria

20. **Otsukaresama desu** (Gracias por tu trabajo)
21. **Itadakimasu** (Antes de comer)
22. **Gochisousama** (Despues de comer)
23. **Shitsurei shimasu** (Perdon por molestar)
24. **Douzo** (Adelante/Por favor)

## Emergencias

25. **Tasukete kudasai** (Ayudeme, por favor)
26. **Byouin wa doko?** (Donde esta el hospital?)
27. **Keisatsu** (Policia)
28. **Benjo** (Bano) - Muy util!
29. **Wakarimasen** (No entiendo)
30. **Eigo wa?** (Habla ingles?)

**Tip:** Descarga ViajApp para tener un traductor con audio siempre a mano.

[cta:frases]
    `,
  },
  {
    slug: "que-comer-japon-guia-gastronomica",
    title: "Que Comer en Japon: Guia Gastronomica Completa",
    description: "Desde ramen y sushi hasta wagyu y matcha. Descubre la mejor gastronomia de Japon con precios recomendados y donde encontrarla.",
    category: "Comida",
    readTime: "7 min",
    date: "2026-06-20",
    tags: ["comida japonesa", "gastronomia japon", "ramen japon", "sushi japon", "wagyu"],
    content: `
## Los must-try de la gastronomia japonesa

### Ramen
Cada region tiene su estilo: tonkotsu (Okinawa), miso (Sapporo), shoyu (Tokio). Precios: 800-1,200 yenes.

**Donde probar:** Ichiran (cadena), Fuunji (Shinjuku), Afuri (ramen de limon).

### Sushi
Desde kaitenzushi (sushi rotativo) por 100 yenes/plato hasta sushi premium en el Mercado de Tsukiji.

### Tempura
Mariscos y verduras rebozadas y fritas. Un plato de tempura cuesta 1,000-2,000 yenes.

### Yakitori
Brochetas de pollo a la parrilla. Perfectas con cerveza. 100-200 yenes por brocheta.

### Wagyu
La mejor carne del mundo. Un plato de wagyu cuesta 3,000-15,000 yenes. En yakiniku o como steak.

### Udon
Fideos gruesos en caldo. Sencillo y delicioso. 500-800 yenes.

### Okonomiyaki
Tortilla salada japonesa. Osaka y Hiroshima tienen los mejores.

### Matcha
Helado, tartas, dulces. El sabor mas unico de Japon.

## Comida de konbini (barata y buena)

- Bento: 300-600 yenes
- Onigiri: 120-150 yenes
- Ramen instantaneo: 200-300 yenes
- Pan: 150-300 yenes

## Propina: NO se da en Japon

En Japon no hay propina. Incluso se considera grosero. El precio es el precio.

[cta:comida]
    `,
  },
  {
    slug: "error-comunes-viajar-japon",
    title: "10 Errores Comunes al Viajar a Japon (y Como Evitarlos)",
    description: "No cometas estos errores que hacen los turistas por primera vez en Japon. Aprende de los errores de otros para tener un viaje perfecto.",
    category: "Consejos",
    readTime: "5 min",
    date: "2026-06-15",
    tags: ["errores japon", "consejos japon", "tips viaje japon", "turista japon"],
    content: `
## 1. No reservar con suficiente antelacion

Los hoteles y vuelos se llenan rapido en temporada alta (abril y octubre). Reserva con 3-6 meses de antelacion.

## 2. No traer efectivo suficiente

Japon sigue siendo una sociedad de efectivo. Muchos restaurantes y tiendas pequenas no aceptan tarjeta. Lleva al menos 10,000 yenes en efectivo.

## 3. No respetar las reglas del tren

No comas en el tren (excepto trenes bala). No hables por telefono. No reserves asientos que no vas a usar.

## 4. Comprar souvenirs en el aeropuerto

Los precios en el aeropuerto son 2-3 veces mas caros. Compra en los 100-yen shops o en los souvenirs de los templos.

## 5. No aprender frases basicas

Inglés es limitado fuera de Tokyo. Aprende 10-15 frases basicas en japones. La gente lo apreciara mucho.

## 6. No probar la comida local

Los turistas comen en McDonald's porque "no saben que es". Pide recomendaciones o usa ViajApp para encontrar restaurantes.

## 7. No traer calzado comodo

Caminaras 15,000-25,000 pasos al dia. Trae zapatillas comodos y calcetines extra.

## 8. No usar el luggage forwarding

Takkyubin envia tu equipaje de hotel en hotel por ~2,000 yenes. No arrastres maletas por el metro.

## 9. Ignorar los onsen

Los baños termales son una experiencia unica. No tengas verguenza, todos estan desnudos.

## 10. No descarga apps utiles

Descarga: Google Maps, ViajApp, Google Translate (con japon offline), una app de trenes.

[cta:transporte]
    `,
  },
  {
    slug: "nuevas-herramientas-viajapp-2026",
    title: "Nuevas Herramientas de ViajApp: Tu Viaje a Japon Ahora es Mas Facil que Nunca",
    description: "Descubre las nuevas funciones de ViajApp: mapa interactivo del planificador de viajes, gastos compartidos, consejos de la comunidad y mucho mas.",
    category: "Novedades",
    readTime: "4 min",
    date: "2026-07-22",
    tags: ["viajapp", "nuevas funciones", "herramientas viaje japon", "planificador viaje"],
    content: `
## Mapa Interactivo del Planificador de Viajes

El generador de itinerarios ahora incluye un **mapa interactivo** que muestra tu recorrido por Japon con OpenStreetMap. Puedes ver las ciudades que visitaras, la ruta que seguiras y cuantos dias pasaras en cada lugar.

El mapa se genera automaticamente cuando creas un itinerario. Los marcadores numerados muestran el orden de las ciudades, y una linea punteada conecta todos los puntos del recorrido.

## Gastos Compartidos

ViajApp ahora permite crear **grupos de gastos compartidos** para viajar con amigos o familia. Puedes:

- Crear un grupo con tus companeros de viaje
- Anadir gastos y dividirlos entre los miembros
- Ver balances pendientes (quien le debe a quien)
- Eliminar gastos que ya estan pagados

Perfecto para grupos que viajan juntos y no quieren llevar cuentas complicadas.

## Consejos de la Comunidad

La seccion de **consejos de la comunidad** permite a los viajeros compartir sus mejores tips. Cada consejo puede tener likes y categorias, y los usuarios pueden filtrar por ciudades o temas de interes.

## 8 Paginas de Ciudades

ViajApp ahora tiene paginas dedicadas para las 8 ciudades mas importantes de Japon:

- **Tokio** - Shibuya, Shinjuku, Asakusa, Akihabara
- **Kioto** - Templos, geishas, arroz
- **Osaka** - Street food, vida nocturna
- **Hiroshima** - Memorial de la paz, Miyajima
- **Nara** - Ciervos, templos antiguos
- **Fukuoka** - Ramen, mercados
- **Hakone** - Onsen, vistas del Fuji
- **Kanazawa** - Jardines, artesania

Cada pagina incluye que ver, donde comer, barrios recomendados y enlaces para reservar actividades.

## Pagina de Herramientas

Si no sabes que herramienta usar, la nueva **pagina de herramientas** muestra todas las funcionalidades disponibles: calculadora de JR Pass, generador de viajes, traductor con camara, cartera digital y mas.

## Blog con Respaldo Local

El blog de ViajApp ahora funciona con **respaldo local**. Si el servidor no esta disponible, los articulos se cargan directamente desde la cache del navegador. Nunca te pierdes contenido.

---

Prueba todas las herramientas en [viajapp.app](https://www.viajapp.app) y descubre como ViajApp puede hacer tu viaje a Japon mas facil y organizado.

[cta:itinerario]
    `,
  },
];
