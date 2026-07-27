"use client";

export default function OfflinePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">📡</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Sin conexión a internet</h1>
      <p className="text-gray-600 mb-8">
        No tienes conexión a internet. Algunas funciones de ViajApp están disponibles offline.
      </p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 text-left">
        <h2 className="font-bold text-gray-900 mb-4">✅ Disponible offline:</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Frases japonesas del traductor</div>
          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Guía de presupuesto diario</div>
          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Información de eventos y festivales</div>
          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Guía de comida y restaurantes</div>
          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Información de transporte</div>
          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Números de emergencia</div>
          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Mapas cacheados del Survival Kit</div>
          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Tarjeta de alergias</div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-8 text-left">
        <h2 className="font-bold text-amber-800 mb-2">💡 Consejo</h2>
        <p className="text-sm text-amber-700">
          Conectate a WiFi o datos移动les para acceder a todas las funciones. 
          Los mapas y el traductor con cámara necesitan internet.
        </p>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
      >
        🔄 Reintentar conexión
      </button>
    </div>
  );
}
