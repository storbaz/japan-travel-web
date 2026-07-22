"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/lib/api";

interface Itinerary {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  user?: { name: string };
}

export default function SharedItineraryPage() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/v1/itineraries/shared/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Itinerario no encontrado");
        return res.json();
      })
      .then((data) => setItinerary(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-100 rounded-xl h-8 w-1/3"></div>
          <div className="bg-gray-100 rounded-xl h-40"></div>
        </div>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Itinerario no encontrado</h1>
        <p className="text-gray-600 mb-6">{error || "Este itinerario no existe o no esta disponible."}</p>
        <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const days = Math.ceil(
    (new Date(itinerary.end_date).getTime() - new Date(itinerary.start_date).getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-red-600 hover:text-red-700 text-sm font-medium mb-6 inline-block">
        ← Volver al inicio
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{itinerary.title}</h1>
        {itinerary.description && (
          <p className="text-gray-600 mb-4">{itinerary.description}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span>📅 {itinerary.start_date} → {itinerary.end_date}</span>
          <span>🕐 {days} dias</span>
          {itinerary.user && <span>👤 {itinerary.user.name}</span>}
        </div>

        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">📋</div>
          <h2 className="text-lg font-bold text-gray-700 mb-2">Itinerario compartido</h2>
          <p className="text-gray-500 text-sm">
            Crea tu propio itinerario con ViajApp y compartelo con tus companeros de viaje.
          </p>
          <Link href="/trip-planner" className="inline-block mt-4 bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">
            Planificar mi viaje
          </Link>
        </div>
      </div>
    </div>
  );
}
