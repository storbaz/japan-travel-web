import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🔍</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Artículo no encontrado</h1>
      <p className="text-gray-600 mb-8 max-w-lg mx-auto">
        Este artículo ya no existe o ha sido movido. Quizá buscabas alguna de estas guías:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-xl mx-auto">
        <Link href="/blog/guia-completa-viajar-japon" className="block bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition border border-gray-100">
          <div className="font-bold text-gray-900">Guía Completa para Viajar a Japón</div>
          <div className="text-sm text-gray-500 mt-1">Todo lo que necesitas saber antes de comprar el billete</div>
        </Link>
        <Link href="/blog" className="block bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition border border-gray-100">
          <div className="font-bold text-gray-900">Ver todos los artículos</div>
          <div className="text-sm text-gray-500 mt-1">Explora el blog completo de ViajApp</div>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/budget" className="text-sm font-medium px-4 py-2 rounded-full bg-red-50 text-red-700 hover:bg-red-100 transition">
          💰 Presupuesto
        </Link>
        <Link href="/jr-pass" className="text-sm font-medium px-4 py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition">
          🚄 JR Pass
        </Link>
        <Link href="/phrases" className="text-sm font-medium px-4 py-2 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition">
          🗣️ Frases
        </Link>
        <Link href="/weather" className="text-sm font-medium px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition">
          🌤️ Clima
        </Link>
      </div>
    </div>
  );
}
