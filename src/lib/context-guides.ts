export interface ContextGuide {
  category: string;
  title: string;
  icon: string;
  color: string;
  rules: { title: string; content: string; important?: boolean }[];
  phrases: { jp: string; romaji: string; es: string }[];
}

export const CONTEXT_GUIDES: ContextGuide[] = [
  {
    category: "konbini",
    title: "Guía del Konbini",
    icon: "🏪",
    color: "#4f46e5",
    rules: [
      { title: "Ticket machine", content: "En algunos konbini (especialmente para comida caliente), usa la maquina de tickets. Selecciona el articulo, paga, y entrega el ticket al cajero.", important: true },
      { title: "Onigiri", content: "Los onigiri tienen una etiqueta doble. Primero retira la capa exterior, luego la segunda capa para que el nori (alga) este crujiente.", important: true },
      { title: "Oden", content: "El oden esta en la barra de comida caliente junto a la caja. Sirvete con la taza que hay al lado. Paga en caja.", important: false },
      { title: "Basura", content: "No hay papeleras en la calle. Guarda tu basura y tirela en el konbini (contenedor adecuado) o en tu hotel.", important: true },
      { title: "Baños", content: "Los baños del konbini son gratuitos y limpios. Puedes usarlos sin comprar nada.", important: false },
    ],
    phrases: [
      { jp: "お弁当をください", romaji: "Obentou wo kudasai", es: "Quiero un bentou" },
      { jp: "電子レンジでお願いします", romaji: "Denshi renji de onegaishimasu", es: "Por favor, calientalo en el microondas" },
      { jp: "袋はいりません", romaji: "Fukuro wa irimasen", es: "No necesito bolsa" },
    ],
  },
  {
    category: "toilet",
    title: "Baños Japoneses",
    icon: "🚻",
    color: "#7c3aed",
    rules: [
      { title: "Botones del wc", content: "El boton grande (大) es para aguas grandes. El boton pequeño (小) es para aguas pequeñas. Algunos tienen boton de STOP.", important: true },
      { title: "Bidet electronico", content: "Los baños japoneses tienen bidet electronico. Botones: Oshiri (lavado trasero), Bidet (lavado femenino), Stop (parar).", important: true },
      { title: "Calefaccion", content: "El asiento suele tener calefaccion. Busca el boton con el icono de sol ☀️.", important: false },
      { title: "Ruido", content: "Algunos baños tienen un boton de 'ruido' para cubrir sonidos mientras los usas.", important: false },
      { title: "Zapatos", content: "En algunos baños tradicionales, hay que quitarse los zapatos y usar las zapatillas del banco.", important: true },
    ],
    phrases: [
      { jp: "トイレはどこですか？", romaji: "Toire wa doko desu ka?", es: "¿Dónde está el baño?" },
      { jp: "トイレの紙はどこに捨てますか？", romaji: "Toire no kami wa doko ni sutemasu ka?", es: "¿Dónde tiro el papel del baño?" },
    ],
  },
  {
    category: "atm",
    title: "Cómo usar el ATM",
    icon: "💴",
    color: "#059669",
    rules: [
      { title: "Horario", content: "Los ATM de 7-Eleven y FamilyMart estan 24/7. Los de Japan Post suelen cerrar por la noche y fines de semana.", important: true },
      { title: "Tarjetas extranjeras", content: "7-Eleven acepta Visa, Mastercard, JCB, y UnionPay. JP Post acepta Visa y Mastercard.", important: true },
      { title: "Comision", content: "Puede haber comision de 110-220 yen por transaccion. Consulta con tu banco.", important: false },
      { title: "Idioma", content: "Los ATM tienen opcion de ingles. Busca el boton 'English' o la bandera del Reino Unido.", important: false },
      { title: "Limite", content: "El limite diario suele ser de 100,000 yen. Algunos bancos tienen limites mas bajos.", important: false },
    ],
    phrases: [
      { jp: "ATMはありますか？", romaji: "ATM wa arimasu ka?", es: "¿Hay un ATM?" },
      { jp: "カードが使えますか？", romaji: "Kaado ga tsukaemasu ka?", es: "¿Puedo usar tarjeta?" },
    ],
  },
  {
    category: "pharmacy",
    title: "Farmacia Japonesa",
    icon: "💊",
    color: "#e11d48",
    rules: [
      { title: "Tipos de farmacia", content: "Matsumoto Kiyoshi y Tsuruha Drug son las mas grandes. Suelen tener productos importados.", important: false },
      { title: "Medicinas sin receta", content: "Puedes comprar analgesicos (Loxonin), antidiarreicos, vitaminas, y remedios para el resfriado sin receta.", important: true },
      { title: "Tax-free", content: "Si gastas mas de 5,000 yen en una farmacia, puedes pedir tax-free mostrando tu pasaporte.", important: false },
      { title: "Idioma", content: "Pocos empleados hablan ingles. Usa la tarjeta de alergias si necesitas medicina.", important: true },
      { title: "Horario", content: "La mayoria cierra a las 22:00. Algunas estan abiertas 24h.", important: false },
    ],
    phrases: [
      { jp: "頭が痛いです", romaji: "Atama ga itai desu", es: "Me duele la cabeza" },
      { jp: "お腹が痛いです", romaji: "Onaka ga itai desu", es: "Me duele el estómago" },
      { jp: "風邪薬はありますか？", romaji: "Kazegusuri wa arimasu ka?", es: "¿Tiene medicina para el resfriado?" },
      { jp: "アレルギーがあります", romaji: "Arerugii ga arimasu", es: "Tengo alergias" },
    ],
  },
  {
    category: "tourist_info",
    title: "Templos y Santuarios",
    icon: "⛩️",
    color: "#0369a1",
    rules: [
      { title: "Zapatos", content: "En la entrada principal, quitate los zapatos y guardalos en las estanterias. Deja las zapatillas que te den.", important: true },
      { title: "Foto", content: "En la mayoria de templos se puede hacer fotos, pero NO dentro del sancta sanctorum (el edificio principal cerrado).", important: true },
      { title: "Ofrenda", content: "Pon una moneda (5 o 10 yen) en la caja, junta las manos, y reza. No es obligatorio.", important: false },
      { title: "Agua purificadora", content: "En la entrada suele haber un jizo con agua. Sumerge las manos y enjuagate la boca (no bebas).", important: false },
      { title: "Amuletos", content: "Los omamori (amuletos) se compran en el templo. Cada uno tiene un proposito (salud, amor, estudios).", important: false },
    ],
    phrases: [
      { jp: "写真を撮ってもいいですか？", romaji: "Shashin wo tottemo ii desu ka?", es: "¿Puedo hacer fotos?" },
      { jp: "お守りを買いたいです", romaji: "Omamori wo kaitai desu", es: "Quiero comprar un amuleto" },
    ],
  },
  {
    category: "battery",
    title: "Cargar tu movil",
    icon: "🔋",
    color: "#ea580c",
    rules: [
      { title: "CHARGE SPOT", content: "Alquiler de baterias portatiles. Alquiler: 150 yen/30min. Busca el logo naranja en konbini y tiendas.", important: true },
      { title: "Konbini", content: "Los konbini tienen enchufes en los baños y cerca de las cajas. Puedes cargar tu movil.", important: false },
      { title: "Estaciones", content: "Algunas estaciones tienen puntos de carga gratuitos en las salas de espera.", important: false },
      { title: "Cafes", content: "Los cafes (Starbucks, Doutor) suelen tener enchufes en algunas mesas.", important: false },
      { title: "Adaptador", content: "Japon usa enchufes tipo A (dos patas planas). Necesitas adaptador si vienes de Europa.", important: true },
    ],
    phrases: [
      { jp: "充電器はありますか？", romaji: "Juudenki wa arimasu ka?", es: "¿Tiene cargador?" },
      { jp: "WiFiはありますか？", romaji: "WiFi wa arimasu ka?", es: "¿Hay WiFi?" },
    ],
  },
];
