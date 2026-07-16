"use client";

import { useState } from "react";

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
    </div>
  );
}
