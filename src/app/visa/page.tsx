"use client";

import { useState } from "react";
import SeoContent from "@/components/SeoContent";
import RelatedTools from "@/components/RelatedTools";

const visaData: Record<string, { days: number; visa_required: boolean; notes: string }> = {
  "España": { days: 90, visa_required: false, notes: "Entrada sin visa hasta 90 dias. Pasaporte con vigencia restante minima de 6 meses." },
  "Mexico": { days: 90, visa_required: false, notes: "Exento de visa hasta 90 dias. Se recomienda tener seguro de viaje." },
  "Argentina": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "Colombia": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "Chile": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "Peru": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "Brasil": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "Estados Unidos": { days: 90, visa_required: true, notes: "Necesita visa B1/B2. Tramitar en la embajada. ESTA no aplica para Japon." },
  "Canada": { days: 90, visa_required: true, notes: "Necesita visa de turista. Tramitar en la embajada de Japon." },
  "Reino Unido": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "Alemania": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "Francia": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "Italia": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "Australia": { days: 90, visa_required: false, notes: "Sin visa, pero necesita registrar datos biométricos online antes del viaje." },
  "China": { days: 15, visa_required: true, notes: "Necesita visa. Permiso de viaje short-term disponible para tour groups." },
  "Corea del Sur": { days: 90, visa_required: false, notes: "Sin visa para estancias hasta 90 dias." },
  "India": { days: 90, visa_required: true, notes: "Necesita visa de turista. Tramitar en la embajada." },
};

const countries = Object.keys(visaData).sort();

export default function VisaPage() {
  const [selected, setSelected] = useState("");

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🛂 Info de Visa</h1>
      <p className="text-gray-600 mb-8">Requisitos de entrada por pais de origen</p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona tu pais</label>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button key={country} onClick={() => setSelected(country)} className={`px-4 py-2 rounded-full font-medium transition-all ${selected === country ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
              {country}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold">{selected}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${visaData[selected].visa_required ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {visaData[selected].visa_required ? "Visa requerida" : "Sin visa"}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-medium">Estancia maxima sin visa:</span>
              <span>{visaData[selected].days} dias</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
              {visaData[selected].notes}
            </div>
          </div>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <strong>Importante:</strong> Los requisitos pueden cambiar. Verifica siempre en la embajada o consulado de Japon mas cercano antes de viajar.
          </div>
        </div>
      )}

      {!selected && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">🛂</div>
          <p>Selecciona tu pais para ver los requisitos de visa</p>
        </div>
      )}

      <SeoContent
        title="Requisitos para entrar en Japón"
        paragraphs={[
          "Japón mantiene un sistema de exención de visado muy favorable: los ciudadanos de España, México, Argentina, Chile, Perú, Colombia, Brasil, Reino Unido, Alemania, Francia, Italia y Australia pueden entrar sin visado para estancias de hasta 90 días, siempre que el pasaporte tenga al menos 6 meses de vigencia restante y el propósito sea turismo, visita a familiares o negocios de corta duración.",
          "Al llegar, el control de inmigración suele ser rápido y ordenado. Las autoridades pueden pedir la reserva de hotel y el billete de vuelta, así que conviene llevarlos a mano (en el móvil vale). También se registran las huellas dactilares y una foto en la entrada, un trámite estándar que dura un par de minutos.",
          "Para los ciudadanos de países que sí necesitan visa (como China o India en ciertos casos), el trámite se hace en la embajada o consulado de Japón de su país y conviene iniciarlo con 1-2 meses de antelación. Los requisitos pueden cambiar sin previo aviso, así que verifica siempre en el sitio oficial del Ministerio de Exteriores de Japón antes de viajar.",
        ]}
        faqs={[
          { q: "¿Cuánto tiempo puedo estar en Japón sin visado?", a: "La mayoría de los países exentos permiten estancias de hasta 90 días consecutivos. Si quieres quedarte más tiempo, necesitarás un visado y motivos que lo justifiquen (trabajo, estudios, etc.)." },
          { q: "¿Necesito visado de tránsito para pasar por Japón?", a: "Si solo haces escala y no sales de la zona internacional del aeropuerto, normalmente no necesitas visa. Si sales del aeropuerto aunque sea unas horas, entras en régimen de turista y aplica la exención o el visado según tu país." },
          { q: "¿Qué pasa si me quedo más de 90 días?", a: "Quedarse más tiempo del permitido se considera estancia ilegal y puede acarrear multa, prohibición de entrada o deportación. Si necesitas prolongar tu estancia, tramita la extensión en la oficina de inmigración antes de que expire el plazo." },
        ]}
      />

      <RelatedTools currentTool="visa" />
    </div>
  );
}
