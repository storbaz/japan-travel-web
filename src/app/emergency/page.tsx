"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

export default function EmergencyPage() {
  const [contacts, setContacts] = useState<any>(null);
  const [phrases, setPhrases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/v1/emergency/contacts`).then((r) => r.json()),
      fetch(`${API_URL}/v1/emergency/phrases`).then((r) => r.json()),
    ]).then(([c, p]) => {
      setContacts(c);
      setPhrases(p.phrases || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-500">Cargando...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🏥 Emergencias</h1>
      <p className="text-gray-600 mb-8">Numeros de emergencia, frases utiles y embajadas</p>

      <div className="bg-red-50 rounded-xl border border-red-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-red-800 mb-4">🚨 Numeros de Emergencia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts?.general && Object.entries(contacts.general).map(([key, val]: [string, any]) => (
            <div key={key} className="bg-white rounded-lg p-4 border border-red-100">
              <div className="font-bold text-lg text-red-600">{val.number}</div>
              <div className="text-sm text-gray-600">{val.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">📞 Ayuda para Turistas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts?.tourist_help && Object.entries(contacts.tourist_help).map(([key, val]: [string, any]) => (
            <div key={key} className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="font-bold text-blue-600">{val.number}</div>
              <div className="text-sm text-gray-600">{val.description}</div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">🗣️ Frases de Emergencia</h2>
      <div className="space-y-3 mb-8">
        {phrases.map((phrase, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="text-xl font-bold text-gray-900">{phrase.japanese}</div>
            <div className="text-red-600 font-medium">{phrase.romaji}</div>
            <div className="text-gray-700">{phrase.translation}</div>
            <div className="text-sm text-gray-500 mt-1">📍 {phrase.context}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">🏛️ Embajadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts?.embassies && Object.entries(contacts.embassies).map(([key, val]: [string, any]) => (
          <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-lg mb-2">{val.name}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>📞 {val.phone}</div>
              <div>📍 {val.address}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
