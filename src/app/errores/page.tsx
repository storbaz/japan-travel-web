"use client";

import { useState } from "react";

interface ErrorTip {
  id: string;
  title: string;
  problem: string;
  solution: string;
  category: string;
  emoji: string;
}

const ERRORS: ErrorTip[] = [
  { id: "walking", title: "Caminar por la derecha", problem: "En Japón se camina por la izquierda en escaleras y pasillos. Los turistas van por la derecha por costumbre y chocan con todos.", solution: "Escaleras y pasillos: mantente siempre a la izquierda. En escaleras mecánicas, la izquierda es para quietos y la derecha para adelantar (en Osaka es al revés).", category: "transporte", emoji: "🚶" },
  { id: "propina", title: "Dejar propina", problem: "Dejas propina en un restaurante y el camarero sale corriendo detrás de ti para devolvértela.", solution: "En Japón NO se deja propina. El servicio está incluido. Si quieres agradecer, di 'gochisousama deshita' (gracias por la comida).", category: "comida", emoji: "💵" },
  { id: "comer-calle", title: "Comer caminando", problem: "Compras un takoyaki en la calle y te lo comes mientras caminas. La gente te mira mal.", solution: "En Japón no se come caminando. Cómetelo junto al puesto o siéntate en un banco. Tampoco se bebe mientras se camina.", category: "comida", emoji: "🍡" },
  { id: "palo-vertical", title: "Clavar los palillos verticales", problem: "Clavas los palillos en el arroz para sujetarlos. Los japoneses se quedan en shock.", solution: "Nunca claves los palillos verticales en la comida. Solo se hace en funerales (ofrenda a los muertos). Déjalos en el soporte o cruzados sobre el cuenco.", category: "comida", emoji: "🥢" },
  { id: "pasar-palillos", title: "Pasar comida de palillo a palillo", problem: "Le pasas un trozo de comida a tu amigo con tus palillos a los suyos.", solution: "Pasar comida de palillo a palillo es otro ritual funerario. Usa platos o vueltas para compartir.", category: "comida", emoji: "🥢" },
  { id: "sonarse", title: "Sonarse la nariz en público", problem: "Te suenas los mocos en el tren. La gente se aparta.", solution: "Suénate en el baño o en privado. Sonarse en público se considera muy grosero. Si tienes mocos, aguanta o ve al baño.", category: "cultura", emoji: "🤧" },
  { id: "volumen-tren", title: "Hablar por teléfono en el tren", problem: "Hablas por el móvil en el tren. Todos se callan y te miran.", solution: "En el tren, pon el móvil en silencio y no hables por teléfono. Si es urgente, ve al vestíbulo entre vagones.", category: "transporte", emoji: "📱" },
  { id: "zapatos", title: "Entrar con zapatos en casa", problem: "Entras a una casa o ryokan con zapatos. El anfitrión no sabe cómo decírtelo.", solution: "Quítate los zapatos en el genkan (entrada). Ponlos mirando hacia fuera. Usa las zapatillas de interior si te las dan.", category: "cultura", emoji: "👞" },
  { id: "zapatos-tatami", title: "Pisar el tatami con zapatillas", problem: "Entras a una habitación de tatami con las zapatillas de interior.", solution: "En tatami, quítate las zapatillas. El tatami se pisa solo con calcetines o descalzo.", category: "cultura", emoji: "🧦" },
  { id: "factura", title: "Sacar dinero delante del vendedor", problem: "Pagas en efectivo y pones el dinero en el mostrador. El vendedor lo coge incómodo.", solution: "Pon el dinero en la bandeja pequeña que hay en el mostrador. Nunca entregues dinero directamente de mano a mano.", category: "general", emoji: "💴" },
  { id: "selfies-templo", title: "Hacerse selfies en templos", problem: "Te haces una selfie delante de un altar o estatua sagrada.", solution: "En templos y santuarios, no hagas fotos donde esté prohibido (suele estar señalizado). En general, no fotos a los altares ni estatuas principales.", category: "cultura", emoji: "📸" },
  { id: "baño-termal", title: "Entrar al onsen con bañador", problem: "Te metes en el onsen con bañador. Los japoneses se sorprenden.", solution: "En los onsens se entra desnudo. Lávate bien en las duchas antes de meterte. No metas la toalla en el agua.", category: "cultura", emoji: "♨️" },
  { id: "tattoos-onsen", title: "Ocultar tatuajes en el onsen", problem: "Tienes tatuajes y te metes al onsen sin avisar. Te echan.", solution: "Muchos onsens no permiten tatuajes. Busca onsens con 'tattoo friendly' o tápate con parches especiales. Los sento (baños públicos) suelen ser más estrictos.", category: "cultura", emoji: "🖌️" },
  { id: "regalo", title: "Abrir un regalo delante de quien te lo da", problem: "Te dan un regalo y lo abres inmediatamente. El que te lo dio se siente incómodo.", solution: "En Japón los regalos no se abren en presencia de quien los da. Da las gracias y ábrelo después en privado.", category: "cultura", emoji: "🎁" },
  { id: "nombre-san", title: "Llamar a alguien solo por su nombre", problem: "Llamas a tu jefe japonés 'Tanaka' a secas. Él no sabe cómo reaccionar.", solution: "Usa siempre '-san' después del apellido (ej. Tanaka-san). Nunca uses '-chan' o '-kun' con desconocidos o superiores.", category: "general", emoji: "👤" },
  { id: "cola", title: "Saltarse la cola", problem: "Te pones en la cola un poco adelantado porque 'es solo una persona'.", solution: "En Japón las colas se respetan rigurosamente. Ponte al final siempre, aunque solo haya una persona.", category: "general", emoji: "🚶" },
  { id: "basura", title: "Tirar basura en la calle", problem: "No encuentras papelera y dejas la basura en un banco o esquina.", solution: "En Japón casi no hay papeleras en la calle. Lleva una bolsa pequeña para tu basura y tírala en casa/ hotel o en los konbini (tienen papeleras).", category: "general", emoji: "🗑️" },
  { id: "taxi-puerta", title: "Abrir la puerta del taxi", problem: "Sales del taxi e intentas abrir la puerta tú mismo.", solution: "Las puertas traseras de los taxis japoneses se abren y cierran automáticamente. No toques la puerta, espera a que el conductor la abra.", category: "transporte", emoji: "🚕" },
  { id: "foto-geisha", title: "Perseguir a una geisha para fotografiarla", problem: "Ves una geisha en Gion y corres detrás de ella para hacerle una foto.", solution: "Las geishas y maikos no son atracciones turísticas. No las bloquees, no les grites y no les hagas fotos sin permiso. Es acoso.", category: "cultura", emoji: "👘" },
  { id: "sake", title: "Servirse sake a uno mismo", problem: "Te sirves sake a ti mismo en una reunión.", solution: "Nunca te sirvas tu propia bebida. Espera a que alguien te sirva y tú sirve a los demás. Observa quién se queda sin bebida y ofrécete a servirle.", category: "comida", emoji: "🍶" },
];

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "cultura", label: "Cultura" },
  { id: "comida", label: "Comida" },
  { id: "transporte", label: "Transporte" },
  { id: "general", label: "General" },
];

export default function ErroresPage() {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? ERRORS : ERRORS.filter(e => e.category === cat);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">⚠️ Errores de turista en Japón</h1>
      <p className="text-gray-600 mb-8">Errores comunes que cometen los turistas (y cómo evitarlos).</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} className={`px-4 py-2 rounded-full font-medium text-sm transition ${cat === c.id ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"}`}>{c.label}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(e => (
          <details key={e.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
            <summary className="p-4 cursor-pointer hover:bg-gray-50 transition flex items-center gap-3 list-none">
              <span className="text-2xl">{e.emoji}</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{e.title}</h3>
                <p className="text-sm text-gray-500">{e.problem}</p>
              </div>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-4 pb-4 pt-0">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">✅ {e.solution}</div>
            </div>
          </details>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 mt-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 La regla de oro</h3>
        <p className="text-sm text-blue-800">Cuando dudes: <strong>observa lo que hacen los japoneses y haz lo mismo</strong>. Ellos no esperan que sepas todas las reglas, pero aprecian que lo intentes. Una sonrisa y un &quot;sumimasen&quot; solucionan casi cualquier error.</p>
      </div>
    </div>
  );
}
