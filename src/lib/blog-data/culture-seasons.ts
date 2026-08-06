export interface CultureData {
  topic: string;
  intro: string;
  history: string;
  modernLife: string;
  whereToExperience: string;
  howToExperience: string;
  funFacts: string;
  faq: { q: string; a: string }[];
}

export interface SeasonData {
  season: string;
  intro: string;
  weather: string;
  events: string;
  packing: string;
  planning: string;
  mistakes: string;
  faq: { q: string; a: string }[];
}

export const culturalTopics: CultureData[] = [
  {
    topic: "Ceremonia del Te (Chado)",
    intro: "La primera vez que entré a una sala de té me quedé sin aliento. Todo era silencio, tatami recién barrido y una luz suave filtrándose por el papel de las shoji. Cuando la maestra giró el cuenco de cerámica hacia mí con un gesto milimétrico, entendí que no estaba viendo un ritual: estaba viendo un idioma de dos siglos que se habla sin palabras. Los 15 minutos que duró la ceremonia se me hicieron eternos y cortos a la vez. Salí con las manos temblando y una paz que no me abandonó en todo el día.",
    history: "El chado nace en el siglo XVI de la mano del maestro Sen no Rikyu, que lo convirtió en un arte meditativo inspirado en el budismo zen. Rikyu estableció los principios de armonía, respeto, pureza y tranquilidad (wa, kei, sei, jaku) que hoy siguen siendo la base de la práctica. La ceremonia se popularizó entre los samuráis como un espacio de calma antes de la batalla, y pronto se extendió a comerciantes y artistas. Las escuelas Urasenke, Omotesenke y Mushakojisenke descienden directamente de su linaje y siguen formando maestros en todo el mundo.",
    modernLife: "Hoy el té matcha se bebe en bares modernos y en bollería de Tokio, pero el chado tradicional se mantiene vivo gracias a unas 100.000 personas que lo practican formalmente en Japón, muchas de ellas mujeres. Se imparte en escuelas, universidades y centros culturales, y es una de las asignaturas favoritas en las clases de novias antes de casarse. En 2020 el té matcha y la ceremonia entraron en el registro del patrimonio cultural inmaterial de la UNESCO, lo que ha disparado el interés internacional por aprenderla.",
    whereToExperience: "Si quieres vivirlo de verdad, tienes que ir a Kioto. En el distrito de Gion, la escuela Urasenke tiene su sede histórica y ofrece sesiones matinales con reserva previa. En el jardín del Templo de Ryoanji puedes tomar un té matcha frente al famoso jardín de rocas zen, un combo que no olvidarás. En Tokio, el centro de té del Parque de Shinjuku Gyoen organiza ceremonias los fines de semana con explicación en inglés. Y si viajas a Kanazawa, el barrio de Higashi Chaya, antiguo distrito de geishas, esconde casas de té donde aún se celebra la ceremonia como hace un siglo.",
    howToExperience: "Reserva con al menos una semana de antelación en las escuelas grandes de Kioto o Tokio; una sesión con explicación en inglés cuesta entre 3.000 y 5.000 yenes (18 a 30 euros). Llega cinco minutos antes, quítate los zapatos y no lleves perfume fuerte. Nunca bebas a sorbitos sin más: se gira el cuenco dos veces antes de beber y se limpia el borde tras cada sorbo. Cuando termines, gira el cuenco de nuevo para devolver el lado decorado hacia la maestra. Acepta el dulce wagashi que te ofrezcan, se toma antes del té para equilibrar su amargor. Y nunca hagas fotos sin pedir permiso.",
    funFacts: "Existen más de 100 tipos de té verde japones, pero el matcha usado en ceremonia se llama koicha y se prepara sin azúcar.\nEl cuenco de cerámica puede ser una obra de arte: los bowls de raku usados en la escuela Urasenke pueden superar los 10.000 euros.\nLa ceremonia completa incluye un kaiseki, una comida de varios platos que puede durar 4 horas.\nSen no Rikyu, el padre del chado, fue obligado a cometer seppuku por el señor Hideyoshi en 1591, aunque sus escuelas sobrevivieron.\nSe calcula que en Japón hay más de 40.000 maestros de té certificados.",
    faq: [
      {
        q: "¿Cuánto cuesta participar en una ceremonia del té en Japón?",
        a: "Las sesiones abiertas a turistas cuestan entre 3.000 y 6.000 yenes (18 a 36 euros), e incluyen el dulce wagashi y el té. Las ceremonias privadas en casas de té históricas de Gion pueden superar los 15.000 yenes (90 euros).",
      },
      {
        q: "¿Necesito saber japonés para disfrutarla?",
        a: "No, muchas escuelas de Kioto, Tokio y Kanazawa ofrecen sesiones con explicación en inglés. En lugares como el Templo de Ryoanji o el Centro de Té Urasenke el guion está traducido para extranjeros.",
      },
      {
        q: "¿Puedo asistir con cualquier ropa?",
        a: "Sí, con ropa cómoda y calcetines limpios. Evita minifaldas y zapatos que sean difíciles de quitar. Algunos centros ofrecen la opción de alquilar yukata para entrar en ambiente, con un suplemento de unos 3.000 yenes (18 euros).",
      },
    ],
  },
  {
    topic: "Geishas",
    intro: "La primera vez que vi a una geisha caminar por Gion tuve que pellizcarme. Iba envuelta en seda rosa y oro, con el cuello blanco como porcelana, y se deslizaba bajo los farolillos rojos sin tocar el suelo. Me quedé helado, incapaz de sacar el móvil. A los pocos metros se giró, me sonrió apenas y siguió su camino. En ese instante entendí que no es un disfraz ni un espectáculo: es un oficio de años de sacrificio, y que en todo Japón quedan apenas mil mujeres que lo ejercen.",
    history: "Las geishas nacen en el siglo XVIII en los barrios de placer de Kioto y Tokio, donde originalmente eran hombres, llamados taikomochi, quienes animaban las fiestas. Hacia 1800 las mujeres tomaron el relevo y el oficio se profesionalizó: música, baile, conversación y arte de la hospitalidad. Las aprendices se llaman maiko y comienzan su formación en torno a los 15 años en casas llamadas okiya. En su apogeo, en los años 20 del siglo pasado, había más de 80.000 geishas en el país. Hoy la cifra ha caído a menos de 1.000, la mayoría en Kioto.",
    modernLife: "Hoy quedan unas 1.000 geishas y maiko en todo Japón, y casi la mitad vive en el distrito de Gion de Kioto. El oficio sigue rigiéndose por normas estrictas: no pueden usar móvil en público, su horario se limita a la noche y deben residir en las casas de su okiya mientras se forman. Aun así, el sector se moderniza con la venta de experiencias abiertas a turistas y con nuevos canales de reserva online. La demanda ha crecido tras la pandemia y en 2024 el gobierno de Kioto relajó las restricciones de acceso a las calles de Gion ante la presión del turismo.",
    whereToExperience: "El mejor lugar es Gion, en Kioto, sobre todo las calles Hanamikoji y Shirakawa, donde puedes cruzarte con geishas reales camino de sus citas. El barrio de Pontocho, a orillas del río Kamo, es otra zona clave con casas de té históricas. Si quieres verlas actuar, el Gion Corner ofrece espectáculos de danza y música tradicional en inglés. Y una opción poco conocida: la ciudad de Kanazawa, con su distrito de Higashi Chaya, donde puedes disfrutar de un banquete privado con geiko local sin las multitudes de Kioto.",
    howToExperience: "La forma correcta de acercarse es reservando un banquete ozashiki, que cuesta entre 20.000 y 40.000 yenes por persona (120 a 240 euros) e incluye comida, juegos tradicionales y la conversación con la geisha. Si no quieres gastar tanto, asiste al espectáculo del Gion Corner por unos 3.150 yenes (19 euros). Nunca intentes tocar a una geisha, tirar de su kimono o preguntarle su nombre: en Gion existe una ordenanza municipal que prohíbe fotografiar a las geishas en la calle y puede multarse con hasta 10.000 yenes (60 euros). Si vas a fotografiarlas desde lejos, hazlo sin flash y sin bloquear el paso.",
    funFacts: "El maquillaje blanco de las geishas se llama oshiroi y cubre cara, cuello y escote, dejando dos franjas de piel visible en el cuello, un detalle que se consideraba sensual.\nEl kimono de una geisha puede costar entre 300.000 y 1 millón de yenes (1.800 a 6.000 euros), y el obi que lo cierra otras tantas veces más.\nEl aprendizaje completo dura 5 a 6 años antes de convertirse en geisha plena.\nLas maiko dejan caer los extremos del obi en forma de trenza larga, mientras que las geishas lo anudan por detrás como un moño.\nEl barrio de Gion tiene una calle, Hanamikoji, protegida por ley donde solo se permite el acceso de geishas y sus clientes después de las 18:00.",
    faq: [
      {
        q: "¿Cuál es la diferencia entre geisha y maiko?",
        a: "La maiko es la aprendiz, de entre 15 y 20 años, y se distingue por su maquillaje más blanco, el obi largo y los zuecos altos. La geisha ya es profesional, viste kimono más sobrio y ejerce la hospitalidad de forma autónoma. El paso de una a otra se marca con la ceremonia del erikae, en la que se cambia el cuello del kimono.",
      },
      {
        q: "¿Puedo ver a una geisha sin pagar un banquete?",
        a: "Sí, aunque es cuestión de suerte. Los mejores momentos son al anochecer en Hanamikoji y Pontocho, entre las 17:30 y las 19:00, cuando las geishas salen hacia sus citas. Ten presente que fotografiar en la calle está prohibido en Gion y se multa con hasta 10.000 yenes.",
      },
      {
        q: "¿Cuánto cuesta cenar con una geisha en Kioto?",
        a: "Un ozashiki tradicional cuesta entre 20.000 y 40.000 yenes por persona (120 a 240 euros), más la comida que puedes elegir. Si vas en grupo de cuatro o cinco personas, el precio por cabeza baja sensiblemente. Muchas casas de té exigen reserva a través de un cliente habitual o un hotel.",
      },
    ],
  },
  {
    topic: "Onsen (Banos Termales)",
    intro: "La primera vez que metí un pie en un onsen de Hakone me temblaron las piernas. El agua estaba a 42 grados y el vapor me cegaba, mientras el monte Fuji asomaba entre la niebla del otro lado del valle. Me quedé flotando media hora, la cabeza vacía y la piel ardiendo, escuchando solo el gorgoteo del manantial. Cuando salí, no era la misma persona. El cuerpo se me había quedado como de algodón y el estrés de tres semanas de viaje se escurría por el desagüe.",
    history: "El culto a los onsen nace en Japón hace más de 1.300 años, cuando los monjes budistas usaban las aguas termales para curar heridas y aliviar el cansancio. La primera referencia escrita aparece en el Nihon Shoki del año 720, que menciona las aguas de la región de Iyo. Durante el periodo Edo (1603-1868) el país construyó más de 600 balnearios y las termas se convirtieron en destinos de peregrinación turística. Los samuráis heridos en batalla eran enviados a recuperarse a los onsen de Kusatsu, que se consideraban los más potentes para curar todo tipo de males.",
    modernLife: "Hoy Japón cuenta con unos 30.000 onsen registrados y más de 3.000 instalaciones públicas. Se calcula que los japoneses hacen unos 130 millones de visitas anuales a las termas, tanto en ryokan tradicionales como en sento urbanos de barrio. El rotenburo, el baño al aire libre, es el formato estrella y muchas ciudades, como Beppu o Hakone, viven de la actividad termal. Tras el covid se reforzaron las normas de higiene, pero la esencia sigue siendo la misma: agua natural, silencio y naturaleza.",
    whereToExperience: "Hakone es la puerta de entrada perfecta: a 90 minutos de Tokio y con vistas al monte Fuji desde sus rotenburo. El onsen de Kinosaki, en la prefectura de Hyogo, tiene siete baños públicos y es uno de los pueblos termales mejor conservados de Japón. Si buscas tradición extrema, Kusatsu en Gunma presume de ser el manantial con mayor caudal natural del país, con más de 32.000 litros por minuto. Y para una experiencia remota, el valle de las aguas termales de Beppu en Kyushu, con más de 2.000 manantiales, es el mayor campo termal del planeta.",
    howToExperience: "Primero lávate a conciencia con el jabón y la ducha que hay junto a la bañera; nunca se entra sucio al agua. No uses bañador: en Japón se entra desnudo y la toalla pequeña va en la cabeza o doblada al borde. Lleva monedas para la taquilla (100 o 300 yenes) y jabón si no te lo proporcionan. Respeta el silencio y no metas la toalla al agua. Si llevas tatuajes, busca onsen con política tatoo-friendly o reserva baño privado, porque muchos aún los prohíben. Las entradas cuestan entre 500 y 1.500 yenes (3 a 9 euros); si te alojas en ryokan, suele estar incluido.",
    funFacts: "El agua de Kusatsu tiene un pH tan ácido que se dice que cura cualquier enfermedad menos el amor.\nJapón tiene más de 27.000 manantiales termales naturales, el país con mayor número del mundo.\nExisten onsen de arena en Ibusuki, en Kagoshima, donde te entierran vivos en arena calentada por vapor volcánico.\nEn los onsen de monos de Jigokudani, en Nagano, los macacos japoneses se bañan a diario en las termas, una imagen famosa en todo el mundo.\nLa temperatura media de los onsen japoneses ronda los 40 a 42 grados, aunque algunos manantiales superan los 50.",
    faq: [
      {
        q: "¿Puedo ir al onsen con tatuajes?",
        a: "Muchos onsen tradicionales prohíben los tatuajes, aunque cada vez hay más opciones tatoo-friendly. Puedes preguntar por teléfono, elegir establecimientos que los acepten, o reservar un baño privado (rotenburo reservado) que suele costar 3.000 a 5.000 yenes extra.",
      },
      {
        q: "¿Hay que bañarse desnudo?",
        a: "Sí, en los onsen japoneses no se usa bañador por higiene y tradición. La separación por sexos es estricta y la toalla pequeña se usa para cubrirse al caminar, pero nunca se mete al agua. Los onsen mixtos son muy escasos en la actualidad.",
      },
      {
        q: "¿Cuánto cuesta entrar a un onsen?",
        a: "Los baños públicos urbanos cuestan entre 500 y 1.500 yenes (3 a 9 euros). Los onsen dentro de ryokan con alojamiento y comida incluida oscilan entre 15.000 y 40.000 yenes por noche (90 a 240 euros) y suelen ofrecer acceso ilimitado al baño.",
      },
    ],
  },
  {
    topic: "Festivales (Matsuri)",
    intro: "La primera vez que estuve en un matsuri me arrastró la marea humana sin resistencia. Fue en Gion, en pleno julio, y de repente me vi rodeado de carrozas de madera de diez metros que crujían al girar, mientras miles de personas coreaban y repartían sake helado. El aire olía a incienso, a comida frita y a sudor feliz. Me separé de mis amigos y no me importó: en aquel caos ordenado me sentí más japonés en una hora que en dos semanas de museos.",
    history: "Los matsuri nacen hace más de mil años como rituales sintoístas para aplacar a los dioses (kami), pedir buenas cosechas o purificar el pueblo de epidemias. El Gion Matsuri de Kioto se celebra desde el año 869, cuando se organizaron procesiones para frenar una plaga. El Nebuta de Aomori, en cambio, surge en el siglo XVIII de la tradición de dormir poco en verano para espantar a los espíritus de la pereza. Cada pueblo guarda su propio festival, heredado de generación en generación, y muchos han sido declarados patrimonio cultural inmaterial de la UNESCO.",
    modernLife: "Hoy se celebran más de 300.000 matsuri al año en todo Japón, desde celebraciones rurales de una tarde hasta macrosfestivales urbanos como el Gion, que atrae a más de un millón de visitantes. Los festivales modernos combinan lo sagrado con lo festivo: puestos de takoyaki y yukata a juego, grupos de jóvenes que arrastran mikoshi y fuegos artificiales de producción millonaria. En las ciudades pequeñas el matsuri sigue siendo el gran evento del año, y muchas empresas dan el día libre a sus empleados para participar. Los ayuntamientos invierten millones de yenes anuales en mantenerlos vivos.",
    whereToExperience: "El Gion Matsuri de Kioto, en julio, es el más famoso: sus carrozas yamaboko se montan a mano y desfilan los días 17 y 24. El Nebuta Matsuri de Aomori, del 2 al 7 de agosto, deslumbra con carrozas gigantes iluminadas. El Tanabata de Sendai, del 6 al 8 de agosto, convierte las calles en bosques de guirnaldas de papel. Y si quieres algo espectacular sin multitudes, el Hadaka Matsuri de Saidai-ji, en Okayama, en febrero, donde miles de hombres en taparrabos luchan por un amuleto de la suerte.",
    howToExperience: "Consulta siempre las fechas exactas en la web oficial del ayuntamiento, porque los días de procesión cambian según el calendario lunar. Llega al menos dos horas antes a las calles principales si quieres buena vista; llevar tu propio asiento plegable o una manta se agradece. Viste yukata (lo puedes alquilar por 3.000 a 5.000 yenes, 18 a 30 euros) y calzado plano. Lleva efectivo en monedas de 100 y 500 yenes para los puestos y prueba el takoyaki o el yakisoba de los puestos callejeros. Y respeta las normas locales: no atravieses las filas de carrozas durante la procesión.",
    funFacts: "El Gion Matsuri de Kioto se celebra de forma ininterrumpida desde el año 869, más de 1.150 años.\nLas carrozas yamaboko del Gion pesan hasta 12 toneladas y se mueven a fuerza de hombres que las arrastran con cuerdas.\nEn el Nebuta de Aomori las carrozas miden hasta 9 metros de ancho y están iluminadas por más de 10.000 bombillas.\nAlgunos matsuri, como el Onbashira de Nagano, se celebran cada 6 años y los participantes deslizan troncos gigantes por cuestas.\nSe calcula que los japoneses participan en festivales locales unas 300.000 veces al año en todo el país.",
    faq: [
      {
        q: "¿Qué es un yukata y dónde lo consigo?",
        a: "El yukata es el kimono ligero de verano que se viste en los festivales. Puedes comprarlo desde 5.000 yenes (30 euros) en tiendas de Gion o Asakusa, o alquilarlo por unos 3.000 a 5.000 yenes, incluyendo vestirte y peinarte, en las tiendas de alquiler cerca de los festivales.",
      },
      {
        q: "¿Cuándo es el mejor momento para ir a un matsuri?",
        a: "El verano (julio y agosto) concentra los grandes festivales como Gion y Nebuta, pero también es la época de más calor y humedad. En invierno encontrarás festivales de nieve y fuego como el de Saidai-ji. Consulta el calendario oficial porque las fechas varían cada año.",
      },
      {
        q: "¿Cuánto cuesta asistir a un festival?",
        a: "La entrada es gratuita en la práctica totalidad de los matsuri, salvo gradas VIP en algunos eventos como el Tanabata de Sendai. El gasto real está en la comida de los puestos: una ración de takoyaki o yakisoba cuesta unos 500 a 1.000 yenes (3 a 6 euros).",
      },
    ],
  },
  {
    topic: "Sakura (Cerezos)",
    intro: "Nadie me había preparado para el sakura. Caminaba por el río Meguro de Tokio cuando el cielo se tiñó de rosa de golpe, como si alguien hubiera abierto un paraguas gigante sobre la ciudad. Los pétalos caían a cámara lenta y se posaban en los hombros de la gente que reía bajo los árboles. Me senté en una lona a compartir onigiri con unos oficinistas que me pasaron sake y me contaron, en un inglés rotoso, que el sakura es la prueba de que la belleza se va y hay que disfrutarla ya.",
    history: "El culto a los cerezos en flor lleva más de mil años en Japón. En el periodo Nara (710-794) se prefería el ciruelo, pero en Heian (794-1185) el sakura se impuso como símbolo de la primavera. Los samuráis lo adoptaron como metáfora de su propia vida: efímera y gloriosa. En el siglo XVII el shogun Yoshimune mandó plantar cerezos en todo Edo (hoy Tokio) para crear zonas de paseo populares. Los primeros mapas de hanami, la práctica de ver los cerezos, ya aparecían en los grabados ukiyo-e del periodo Edo.",
    modernLife: "El hanami sigue siendo la fiesta social más importante del año. Cada primavera la agencia meteorológica japonesa publica el frente del sakura, que avanza de Okinawa a Hokkaido de marzo a mayo, y los japoneses organizan hanami con empresas, familias y amigos. En Tokio, el parque de Ueno recibe más de 2 millones de visitantes en tres semanas. Los supermercados lanzan productos de sabor sakura y las empresas regalan botellas de sake de cerezo. El evento se ha vuelto global: ciudades como Nueva York o Madrid celebran su propio hanami cada abril.",
    whereToExperience: "En Tokio, el río Meguro, en Nakameguro, tiene un túnel de 800 cerezos sobre el agua, espectacular de noche. El Parque de Ueno concentra más de 1.000 árboles y la mayor fiesta popular de hanami. En Kioto, el Sendero del Filósofo (Tetsugaku no michi) es un paseo de dos kilómetros bordeado de cerezos junto a un canal. Y si puedes, ve al Castillo de Himeji: sus muros blancos con las flores rosas crean una de las imágenes más icónicas de Japón. En Osaka, el Parque de Kema Sakuranomiya tiene más de 5.000 cerezos a orillas del río.",
    howToExperience: "Consulta el pronóstico oficial del frente de sakura (sakura zensen) entre enero y mayo, porque la floración dura solo unos 7 a 10 días. Para el hanami en parque, llega a las 7 de la mañana con una lona azul para reservar sitio; la gente lo hace a diario. Lleva comida de picnic, saké o chu-hi, y no dejes basura. Si quieres verlos sin multitudes, ve a parques locales antes de las 9 o a lugares como Hirosaki (Aomori) o Yoshino (Nara), con 30.000 árboles. El acceso a los parques es gratuito, aunque algunos recintos como el jardín del castillo de Himeji cobran entrada.",
    funFacts: "El sakura más viejo de Japón, el Jindai-zakura en Yamanashi, tiene más de 2.000 años.\nEl período de floración plena (mankai) dura apenas 7 a 10 días antes de que caigan los pétalos.\nHay más de 600 especies de cerezos japoneses; el más común es el Somei Yoshino, que nace por clonación.\nLos japoneses dicen hanami dango que significa que prefieren los dulces a las flores.\nEn 1912 Japón regaló 3.000 cerezos a Estados Unidos, plantados en Washington D.C.",
    faq: [
      {
        q: "¿Cuándo florecen exactamente los cerezos en 2026?",
        a: "La fecha cambia cada año: en Tokio suele ser entre el 20 de marzo y el 5 de abril, en Kioto unos días después, y en Hokkaido a principios de mayo. La agencia meteorológica publica el pronóstico del frente de sakura en enero y lo actualiza semanalmente.",
      },
      {
        q: "¿Cuánto dura la temporada de sakura?",
        a: "La floración completa de cada árbol dura solo 7 a 10 días, pero la temporada nacional se extiende casi dos meses si sigues el frente de sur a norte, de Okinawa (enero) a Hokkaido (mayo). El momento pico en Tokio y Kioto dura unos 10 a 14 días.",
      },
      {
        q: "¿Hay que pagar para ver los cerezos?",
        a: "La mayoría de los parques y riberas con cerezos son de acceso gratuito, como Ueno o Meguro en Tokio. Algunos jardines y castillos cobran entrada, entre 500 y 1.000 yenes (3 a 6 euros), como el jardín del castillo de Himeji o el Shinjuku Gyoen.",
      },
    ],
  },
  {
    topic: "Templos y Santuarios",
    intro: "El primer santuario que visité en Japón fue el Fushimi Inari de Kioto, y entré riéndome y salí en silencio. Mil torii rojos se perdían montaña arriba entre la niebla, cada uno con un nombre de un donante grabado en la madera. Era como caminar por el interior de un sueño de otra época. En la cima, con las piernas temblando, me encontré con un sacerdote que me sonrió y me dijo en inglés: 'aquí todos suben buscando algo'. Y tenía razón. Dos horas después bajaba sin haber pedido nada, pero con una calma que aún me acompaña.",
    history: "El shintoismo, la religión nativa de Japón, adora a los kami, espíritus de la naturaleza, los antepasados y los lugares sagrados, y sus santuarios (jinja) se distinguen por el torii rojo y los guardianes de piedra. El budismo llegó de China y Corea en el siglo VI y trajo los templos (tera), con pagodas, jardines zen y estatuas de Buda. Durante el periodo Meiji (1868-1912) el gobierno intentó separar ambas religiones, pero hoy conviven: un japonés puede casarse en un santuario y tener el funeral en un templo. De los miles de años de historia quedan unos 80.000 templos y 90.000 santuarios en activo.",
    modernLife: "Hoy Japón tiene unos 80.000 templos budistas y 90.000 santuarios sintoístas, la mayoría gestionados por familias o instituciones religiosas. Miles de ellos están en ruinas por falta de financiación: se calcula que unos 30.000 templos de montaña pueden desaparecer en las próximas décadas. Muchos santuarios han innovado con sellos goshuin digitales, omamori con apps y eventos con personajes de anime. El turismo religioso es clave: el Fushimi Inari recibe más de 20 millones de visitas al año, y el Meiji Jingu de Tokio atrae a millones en sus celebraciones de Año Nuevo.",
    whereToExperience: "El Fushimi Inari Taisha de Kioto, con sus miles de torii rojos, es el santuario más espectacular de Japón y sube hasta la montaña Inari. El Templo Kinkaku-ji, el Pabellón Dorado de Kioto, es una joya de tres pisos recubierta de oro junto a un estanque. En Nara, el Templo Todai-ji alberga el Gran Buda de bronce de 15 metros dentro del edificio de madera más grande del mundo. Y en Tokio, el Senso-ji de Asakusa es el templo más antiguo de la ciudad, fundado en el año 628 y rodeado de su calle comercial Nakamise.",
    howToExperience: "Antes de entrar a un santuario, purifícate en el chozuya: lávate la mano izquierda, luego la derecha, enjuaga la boca y limpia el cucharón. En los templos budistas se golpea la campana y se hace una reverencia; en los santuarios sintoístas se lanza una moneda de 5 yenes (el número de la suerte), se dan dos reverencias, dos palmadas y una reverencia final. El omikuji es el papelito de la suerte que cuesta 100 a 200 yenes (1 euro) y si te toca mala suerte, átalo en las cuerdas del santuario para dejarla ahí. Los horarios varían: la mayoría abren de 6:00 a 17:00 y la entrada cuesta de 0 a 1.000 yenes (0 a 6 euros).",
    funFacts: "El Fushimi Inari tiene más de 10.000 torii rojos y cada uno se dona por un precio que parte de unos 175.000 yenes (1.050 euros).\nEl Todai-ji de Nara contiene la estructura de madera más grande del mundo, con 57 metros de largo.\nMuchos santuarios se especializan: hay uno para la buena suerte en los negocios (Fushimi Inari), otro para el arte y otro para curar el dolor de cabeza.\nLos omamori, amuletos de tela, venden unos 100 millones de unidades al año en Japón.\nEl Meiji Jingu de Tokio se construyó en 1920 en solo 3 años y hoy atrae más de 30 millones de visitas anuales.",
    faq: [
      {
        q: "¿Cuál es la diferencia entre templo y santuario?",
        a: "Los santuarios (jinja) son sintoístas y se identifican por el torii rojo y los torii; los templos (tera) son budistas y tienen pagodas, estatuas de Buda y un incienso permanente. El truco: el santuario tiene un arco a la entrada, el templo tiene una puerta con tejado.",
      },
      {
        q: "¿Puedo rezar aunque no sea japonés?",
        a: "Sí, el ritual es sencillo y universal. Se lanza una moneda, dos reverencias, dos palmadas, una oración mental y una reverencia final. Es un gesto de respeto a la cultura, no de conversión, y los japoneses agradecen que lo hagas con cuidado.",
      },
      {
        q: "¿Cuánto cuesta entrar a los templos y santuarios?",
        a: "La mayoría de los santuarios son gratuitos, mientras que los templos más turísticos cobran entre 400 y 1.000 yenes (2,5 a 6 euros). El acceso al pabellón del Kinkaku-ji cuesta 500 yenes (3 euros) y al Todai-ji 800 yenes (5 euros).",
      },
    ],
  },
];

export const seasonData: Record<string, SeasonData> = {
  primavera: {
    season: "Primavera",
    intro: "La primavera en Japón es una excusa perfecta para viajar. No hay estación que despierte tantas emociones: las calles se tiñen de rosa con los cerezos, las temperaturas son suaves y las terrazas se llenan de gente haciendo hanami. Recuerdo mi primer hanami en el Parque de Ueno como un despertar colectivo, con familias, oficinistas y estudiantes bajo los árboles. Si puedes elegir una sola época para descubrir Japón, la primavera, de finales de marzo a mediados de abril, es la más hermosa y la más cargada de vida.",
    weather: "En abril, Tokio y Kioto rondan los 12 a 19 grados de media, con días soleados y noches frescas. Osaka y Nagoya son un poco más cálidas, en torno a los 14 a 21 grados. En el norte, Hokkaido sigue frío: Sapporo está entre 1 y 10 grados, y la floración de los cerezos llega a principios de mayo. En Kyushu, por el sur, los termómetros suben a 14 a 20 grados. Llueve de forma intermitente, sobre todo en mayo, así que el paraguas es imprescindible. La humedad empieza a notarse en la segunda mitad de mayo.",
    events: "El Hanami es el gran evento: de finales de marzo a abril en Tokio y Kioto, con picnics bajo los cerezos. En Takayama, el Festival de Primavera (Takayama Matsuri) del 14 y 15 de abril, con sus carrozas de muelle, es uno de los mejores del país. En Kioto, la danza geisha Kamogawa Odori se celebra en todo abril en el teatro Pontocho. En Chichibu, cerca de Tokio, el Festival de los Peces de Acero Koinobori del 29 de abril llena el cielo de banderas con forma de carpa. Y en la isla de Okinawa las flores de sakura ya caen en enero, cuando aún hace frío en el resto del país.",
    packing: "Lleva ropa en capas: una camiseta ligera, un jersey fino y una chaqueta de entretiempo que te servirá de mañana a noche.\nUn paraguas compacto y resistente al viento, porque las lluvias de mayo son frecuentes.\nZapatillas cómodas para caminar y un par de zapatos cerrados más elegantes para cenas o teatro.\nEl adaptador de enchufe europeo (tipo A, 100 voltios) y una regleta.\nCrema solar y labial, que el sol de abril pica más de lo que parece.\nUna lona o mantita ligera para el hanami si vas a hacer picnic en parques.",
    planning: "Reserva los vuelos y hoteles entre 4 y 6 meses antes, porque la temporada de sakura es la más cara del año: un hotel de gama media en Tokio puede costar 20.000 yenes por noche (120 euros) en plena floración. Consulta el pronóstico del frente de sakura en enero para ajustar las fechas. Lleva la entrada a lugares como el castillo de Himeji o el Shinjuku Gyoen comprada con antelación para evitar colas. Las multitudes son enormes en Tokio y Kioto entre el 25 de marzo y el 10 de abril, así que reserva restaurantes y trenes bala con semanas de margen.",
    mistakes: "1. **Llegar sin consultar el pronóstico de floración:** la sakura dura 7 a 10 días y puede pillaros con los árboles en verde.\n2. **Reservar el hotel para una semana equivocada:** el pico de floración cambia cada año; sé flexible con las fechas.\n3. **Dejar las compras para el último momento:** el yukata, el omamori y el sake de sakura se agotan rápido en las tiendas turísticas.\n4. **Infravalorar el frío matinal:** en abril las mañanas en Kioto pueden bajar de 8 grados y una sola capa no basta.\n5. **Planificar sitios cerrados a última hora:** el Museo Ghibli y el teatro Kabuki se agotan semanas antes en temporada alta.",
    faq: [
      {
        q: "¿Es muy caro viajar a Japón en primavera?",
        a: "Es la época más cara del año junto al otoño. Un vuelo desde España puede costar entre 800 y 1.200 euros y un hotel de gama media en Tokio de 15.000 a 25.000 yenes por noche (90 a 150 euros). Reservar con 4 a 6 meses de margen reduce bastante la factura.",
      },
      {
        q: "¿Cuánto dura exactamente la floración de los cerezos?",
        a: "La floración plena de cada árbol dura unos 7 a 10 días, pero la temporada total en el país se alarga desde enero en Okinawa hasta mayo en Hokkaido. En Tokio y Kioto el pico se concentra entre el 25 de marzo y el 10 de abril.",
      },
      {
        q: "¿Necesito reservar el tren bala con mucha antelación?",
        a: "En temporada de sakura sí, especialmente en fines de semana. El shinkansen entre Tokio y Kioto se llena y las plazas con asiento reservado se agotan días antes. Reserva con el Japan Rail Pass o en la app oficial al menos una semana antes de viajar.",
      },
    ],
  },
  verano: {
    season: "Verano",
    intro: "El verano japonés no tiene término medio: es húmedo, caluroso y absolutamente electrizante. Las ciudades se llenan de festivales, fuegos artificiales y el sonido inconfundible de las chicharras al atardecer. Recuerdo caminar por Kioto en agosto con 35 grados y una humedad que hacía el aire sólido, solo para desembocar en un matsuri donde todo el mundo sudaba y reía por igual. Si aguantas el calor, te espera el Japón más festivo del año, el de las carrozas, los yukata y los hanabi que iluminan el cielo nocturno.",
    weather: "En julio y agosto, Tokio ronda los 26 a 34 grados con una humedad de hasta el 80%. Kioto y Osaka son aún más sofocantes, superando con facilidad los 35 grados en agosto. Hiroshima y Fukuoka viven temperaturas similares, con máximas de 33 a 36 grados. La costa del Mar de Japón y las islas del sur sufren el tifón de verano entre julio y septiembre. En Hokkaido, en cambio, el clima es una bendición: Sapporo no pasa de 25 a 28 grados, por lo que muchos japoneses escapan al norte en agosto.",
    events: "El Gion Matsuri de Kioto, del 1 al 31 de julio, con sus procesiones de carrozas los días 17 y 24, es el festival más famoso de Japón. En Aomori, el Nebuta Matsuri del 2 al 7 de agosto deslumbra con carrozas de luz de hasta 9 metros. El Tanabata Matsuri de Sendai, del 6 al 8 de agosto, cubre las calles con guirnaldas de papel de colores. El Día del Mar (Umi no Hi), el tercer lunes de julio, da inicio a la temporada de playas y fuegos artificiales. Y el Hanabi Taikai de Sumida, en Tokio, el último sábado de julio, lanza más de 20.000 fuegos artificiales sobre el río.",
    packing: "Ropa ligera de algodón o lino, preferiblemente clara, para el calor húmedo.\nUn yukata barato y cómodo para los festivales, o alquílalo por 3.000 a 5.000 yenes (18 a 30 euros).\nZapatillas transpirables y unas chanclas para las playas o las piscinas termales.\nProtector solar de alta protección, gorra y gafas de sol, porque el sol de julio es implacable.\nUn abanico (uchiwa) de mano, baratísimo y muy efectivo.\nEl adaptador de enchufe japonés (tipo A) y una botella de agua rellenable.\nUn paraguas compacto por los tifones de agosto y septiembre.",
    planning: "El verano es la temporada media: los precios bajan respecto a primavera y otoño, con hoteles de gama media en Tokio desde 12.000 yenes por noche (72 euros). Reserva los festivales grandes como el Gion Matsuri con semanas de antelación si quieres hotel en Kioto para esas fechas. Lleva agua, sales minerales y hielo: la deshidratación es el peligro número uno. Compra entradas a fuegos artificiales y gradas de festivales online, porque se agotan rápido. Si el calor te aprieta, organiza el itinerario con museos y tiendas climatizadas a mediodía y paseos por la mañana o al anochecer.",
    mistakes: "1. **Subestimar el calor y la humedad:** con 35 grados y humedad del 80%, caminar a mediodía es agotador; hidrátate cada hora.\n2. **Vestirte con ropa oscura y de tejidos sintéticos:** el negro absorbe el calor y el poliéster no transpira; apuesta por algodón claro y yukata.\n3. **No reservar los festivales con antelación:** los hoteles de Kioto y Aomori en fechas de matsuri se llenan meses antes.\n4. **Planificar trekking o senderismo a plena luz:** en verano, las rutas de montaña son peligrosas por calor y tormentas; hazlas al amanecer.\n5. **Ignorar los avisos de tifón:** si llega uno, los trenes se paran y los eventos se cancelan; revisa la app de meteorología cada mañana.",
    faq: [
      {
        q: "¿Es soportable visitar Japón en verano?",
        a: "Sí, si organizas bien el día. Los japoneses sobreviven con abanicos, bebidas frías y aires acondicionados potentísimos. Las horas de 11:00 a 15:00 son para museos, y los paseos, para la mañana y el atardecer. Hokkaido es la escapada perfecta para quien odie el calor.",
      },
      {
        q: "¿Cuál es el mejor festival de verano?",
        a: "Si solo puedes elegir uno, el Gion Matsuri de Kioto en julio por su historia y espectáculo de carrozas. El Nebuta de Aomori es el más visual para fotografiar, y el Tanabata de Sendai el más bonito para pasear. Los tres son gratuitos en la calle.",
      },
      {
        q: "¿Qué ropa debo llevar a un matsuri?",
        a: "Lo tradicional es el yukata, que puedes alquilar por unos 3.000 a 5.000 yenes (18 a 30 euros). Lleva calzado plano, porque se camina mucho, y una bolsa pequeña para las compras. Evita llevar demasiado equipaje: los festivales son multitudinarios y abarrotados.",
      },
    ],
  },
  otonno: {
    season: "Otono",
    intro: "Si el sakura es la primavera, el koyo es el otoño japonés, y para muchos es incluso más bonito. Los arces se encienden en rojos, naranjas y dorados que tiñen los templos y montañas de colores irreales. Recuerdo mi primer otoño en Kioto, caminando por el Templo de Tofuku-ji con los árboles ardiendo sobre un estanque negro como un espejo. El aire era fresco y limpio, el cielo azul intenso, y cada templo parecía un cuadro. Si el calor te da miedo y el sakura te parece caro, el otoño es tu estación.",
    weather: "En octubre, Tokio ronda los 15 a 23 grados; en noviembre baja a 9 a 16 grados. Kioto y Osaka marcan temperaturas similares, con máximas de 20 grados en octubre y 13 en noviembre. Nagano y los Alpes japoneses son más frescos, con mínimas que rozan 0 grados en noviembre. Hokkaido ya es frío, con Sapporo entre 3 y 10 grados y las primeras nevadas en octubre. La humedad desaparece respecto al verano y las lluvias son escasas, lo que convierte el otoño en la estación más estable y agradable del año.",
    events: "El Fuji Shibazakura de la prefectura de Yamanashi no es solo de primavera: en otoño, el pueblo de Kawaguchiko celebra el Festival de las Momiji con sus arces junto al monte Fuji en noviembre. En Tokio, el Festival de Otoño de Yoyogi, en noviembre, mezcla desfiles y artesanía. El Día del Deporte, el segundo lunes de octubre, abre la temporada de eventos escolares y parques animados. En Kioto, el Jidai Matsuri del 22 de octubre desfila con trajes históricos de 1.200 años, uno de los tres grandes festivales de la ciudad. Y en Nikko, el Festival de Otoño (Aki Matsuri) del 17 de octubre engalana las montañas de arces.",
    packing: "Una chaqueta de entretiempo o un plumífero fino, porque las mañanas de noviembre son frías.\nCapas ligeras: camiseta de manga larga, jersey y un cortavientos para el día.\nBotas o zapatillas cerradas con suela antideslizante para los caminos de montaña.\nUn paraguas compacto, aunque llueve poco en octubre y noviembre.\nEl adaptador de enchufe japonés (tipo A) y una power bank, porque los días son más cortos.\nGuantes finos y bufanda para las noches y los miradores de montaña.\nUna cámara o buen móvil con batería de repuesto: el koyo es el mejor telón de fondo del país.",
    planning: "El otoño es la segunda temporada alta, así que reserva hoteles y trenes con 3 a 5 meses de antelación si quieres ver el koyo en plenitud, sobre todo en Kioto y los Alpes japoneses. Los precios de los hoteles de gama media en Tokio rondan los 15.000 yenes por noche (90 euros). El pico de color en Kioto suele ser entre el 15 de noviembre y el 5 de diciembre, y en los Alpes unos 10 días antes. Reserva el tren bala a Kioto y las entradas a templos como el Kiyomizu-dera o el Tofuku-ji con antelación para evitar colas de una hora.",
    mistakes: "1. **Pensar que el otoño es temporada baja:** el koyo atrae a millones de turistas y los hoteles de Kioto se llenan igual que en primavera.\n2. **Ir a los miradores a mediodía:** la luz dorada del amanecer y el atardecer hace el koyo mucho más espectacular que al mediodía.\n3. **No vestir en capas:** los contrastes térmicos entre mañana y tarde pueden ser de 10 grados y el frío nocturno pilla a muchos desprevenidos.\n4. **Olvidar que las horas de luz son cortas:** en noviembre anochece sobre las 17:00, así que organiza los templos por la mañana.\n5. **Saltarse los parques locales:** el koyo de los grandes parques como Meiji Jingu o los jardines de Nara es igual de bonito y mucho más tranquilo que el de los templos famosos.",
    faq: [
      {
        q: "¿Cuándo es el pico del koyo en 2026?",
        a: "En Kioto y Tokio suele caer entre el 15 de noviembre y el 5 de diciembre, aunque depende del calor acumulado del año. En los Alpes japoneses y Nagano llega unos 10 días antes, y en Hokkaido a finales de octubre. Consulta los pronósticos de koyo desde octubre.",
      },
      {
        q: "¿Es el otoño mejor que la primavera?",
        a: "Es cuestión de gustos. El otoño tiene un clima más estable, menos lluvia y precios ligeramente inferiores, pero menos festivales. La primavera tiene el sakura y más ambiente festivo. Ambos son temporada alta y requieren reservas anticipadas.",
      },
      {
        q: "¿Dónde veo el mejor follaje otoñal?",
        a: "En Kioto, el Templo de Tofuku-ji, el Kiyomizu-dera y el jardín del Eikan-do son imprescindibles. En Tokio, el Parque de Shinjuku Gyoen y los jardines del Meiji Jingu. Fuera de las ciudades, el valle de Korankei y Nikko ofrecen montañas enteras en llamas.",
      },
    ],
  },
  invierno: {
    season: "Invierno",
    intro: "Viajar a Japón en invierno es descubrir su lado más cinematográfico. Las ciudades se llenan de luces de Navidad, las montañas se cubren de nieve y los onsen al aire libre humean contra el frío. Recuerdo mi primera noche en Sapporo durante el Festival de la Nieve, con esculturas de hielo más altas que casas y un viento que cortaba las mejillas. Nunca había sentido tanto frío ni tanta magia a la vez. Si aceptas la bajas temperaturas, Japón en invierno te recompensa con los mejores precios, las mejores vistas y los festivales más espectaculares del año.",
    weather: "En enero, Tokio ronda los 2 a 10 grados con días secos y muy luminosos; nieva rara vez en la ciudad. Kioto y Osaka están entre 1 y 9 grados, con alguna nevada ocasional. Sapporo, en Hokkaido, baja a -7 a -1 grados y acumula más de 6 metros de nieve al año. En el Mar de Japón, Niigata y Kanazawa sufren nevadas intensas, mientras Hiroshima y Fukuoka, en el sur, rondan los 3 a 10 grados. La costa de Okinawa se mantiene templada, entre 14 y 19 grados. El frío es seco, así que con ropa adecuada es muy llevadero.",
    events: "El Sapporo Snow Festival, del 4 al 11 de febrero, es el más famoso: más de 200 esculturas de nieve y hielo, algunas de 15 metros, en el Odori Park. En Hakodate, el Festival de la Nieve de los Canales, en febrero, ilumina 2.000 velas sobre el hielo. En Tokio, el illuminations de las iluminaciones navideñas, como el de Shibuya Blue Cave, de finales de noviembre a diciembre, viste las calles de luces azules. El Gion Matsuri de invierno no existe, pero el Arashiyama Hanatouro de Kioto, en diciembre, llena el bosque de bambú con 1.000 linternas. Y en Shikoku, el Festival de los Faroles de Nieve de Kaminoyama, en enero, enciende más de 3.000 velas.",
    packing: "Un abrigo grueso tipo plumífero y un jersey térmico de lana para el interior.\nRopa interior térmica de manga larga, el secreto para sobrevivir a Sapporo y a los Alpes.\nBotas impermeables con suela de goma antideslizante, porque el hielo está en todas partes.\nGuantes, bufanda, gorro y un cuello polar; en Hokkaido no se negocia el abrigo.\nUn paraguas y un adaptador de enchufe japonés (tipo A) con regleta.\nBolsa de tela para los zapatos húmedos y ropa de repuesto, porque en el onsen te mojarás las botas igual.\nCrema hidratante y bálsamo labial, porque el aire frío reseca la piel.",
    planning: "El invierno es temporada baja fuera de Navidad y Año Nuevo, así que encontrarás precios más bajos: un hotel de gama media en Tokio baja a unos 10.000 yenes por noche (60 euros). Los días de Navidad y el 1 al 3 de enero son caros y muy concurridos, porque los japoneses viajan en masa; evita el Año Nuevo salvo que quieras vivir el Hatsumode, la primera visita al santuario. Reserva el Sapporo Snow Festival con 3 meses de antelación: Sapporo se llena y los vuelos desde Tokio se disparan. Si esquías, los resorts de Niseko y Hakuba viven su pico en enero y febrero.",
    mistakes: "1. **Viajar de Año Nuevo sin reservar:** entre el 30 de diciembre y el 4 de enero todo está lleno y caro, con muchos restaurantes cerrados.\n2. **Ir al Sapporo Snow Festival sin antelación:** los hoteles de Sapporo se agotan en enero y los precios se triplican la semana del festival.\n3. **No llevar calzado antideslizante:** el hielo en las calles de Sapporo y los Alpes es traicionero y las caídas son la lesión más común.\n4. **Despreciar los onsen al aire libre:** parece una locura, pero bañarse en un rotenburo a -5 grados es la experiencia más reparadora del invierno japonés.\n5. **Subestimar las horas de luz:** en diciembre anochece a las 16:30 y muchos templos cierran a las 17:00; planifica con margen.",
    faq: [
      {
        q: "¿Merece la pena viajar a Japón en invierno?",
        a: "Sí, es la época con menos turistas, precios más bajos y la oportunidad de ver el norte nevado y los festivales de hielo. Los paisajes con nieve de Hokkaido y los Alpes son únicos, y los onsen al aire libre son mucho más placenteros con frío.",
      },
      {
        q: "¿Cuánto cuesta el Sapporo Snow Festival?",
        a: "La entrada al festival es gratuita; solo pagas el transporte y el alojamiento. Un vuelo Tokio-Sapporo cuesta de 100 a 300 euros ida y vuelta, y los hoteles de la ciudad se disparan en la semana del festival. Reserva con 3 meses de antelación.",
      },
      {
        q: "¿Qué ropa necesito para Hokkaido en invierno?",
        a: "Plumífero grueso, ropa interior térmica, botas impermeables y antideslizantes, gorro, guantes y bufanda. Las temperaturas en Sapporo bajan de -7 grados, y en las pistas de Niseko se alcanzan los -10. Las capas son la clave: dentro de los edificios hace mucho calor.",
      },
    ],
  },
};
