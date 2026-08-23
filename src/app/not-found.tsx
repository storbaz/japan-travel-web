import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🏯</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Página no encontrada</h1>
      <p className="text-gray-600 mb-8 max-w-lg mx-auto">
        Esta página no existe o ha sido movida. Pero hay mucho más en ViajApp para planificar tu viaje a Japón:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 max-w-xl mx-auto">
        <Link href="/" className="block bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition border border-gray-100 text-center">
          <div className="text-2xl mb-1">🏠</div>
          <div className="text-sm font-medium text-gray-800">Inicio</div>
        </Link>
        <Link href="/blog" className="block bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition border border-gray-100 text-center">
          <div className="text-2xl mb-1">📝</div>
          <div className="text-sm font-medium text-gray-800">Blog</div>
        </Link>
        <Link href="/budget" className="block bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition border border-gray-100 text-center">
          <div className="text-2xl mb-1">💰</div>
          <div className="text-sm font-medium text-gray-800">Presupuesto</div>
        </Link>
        <Link href="/trip-planner" className="block bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition border border-gray-100 text-center">
          <div className="text-2xl mb-1">🗺️</div>
          <div className="text-sm font-medium text-gray-800">Planificador</div>
        </Link>
      </div>
    </div>
  );
}
