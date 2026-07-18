"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";
import { SkeletonCards } from "@/components/Skeleton";

export default function ItinerariesPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [shareId, setShareId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { router.push("/login"); return; }
    apiFetch("/v1/itineraries")
      .then((data) => { setItineraries(data.itineraries || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token, router]);

  const createItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiFetch("/v1/itineraries", {
        method: "POST",
        body: JSON.stringify({ title, description, start_date: startDate, end_date: endDate }),
      });
      setItineraries([data, ...itineraries]);
      setShowForm(false);
      setTitle(""); setDescription(""); setStartDate(""); setEndDate("");
    } catch (err: any) { setError(err.message); }
  };

  const deleteItinerary = async (id: string) => {
    try {
      await apiFetch(`/v1/itineraries/${id}`, { method: "DELETE" });
      setItineraries(itineraries.filter((i) => i.id !== id));
    } catch {}
  };

  const shareItinerary = (id: string) => {
    const url = `${window.location.origin}/itineraries/shared/${id}`;
    navigator.clipboard.writeText(url).then(() => setShareId(id));
    setTimeout(() => setShareId(null), 2000);
  };

  if (!user) return <div className="max-w-5xl mx-auto px-4 py-12"><SkeletonCards count={3} /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 Mis Itinerarios</h1>
          <p className="text-gray-600">Planifica tu viaje dia por dia</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
          {showForm ? "Cancelar" : "+ Nuevo"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={createItinerary} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 space-y-4">
          {error && <div className="bg-red-50 text-red-700 rounded-lg p-3 text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Mi viaje a Tokio" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Viaje de 7 dias..." className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
          </div>
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">Crear itinerario</button>
        </form>
      )}

      {loading ? (
        <SkeletonCards count={3} />
      ) : itineraries.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Sin itinerarios</h2>
          <p className="text-gray-500">Crea tu primer itinerario para planificar tu viaje</p>
        </div>
      ) : (
        <div className="space-y-4">
          {itineraries.map((itin) => (
            <div key={itin.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{itin.title}</h2>
                  {itin.description && <p className="text-gray-600 mt-1">{itin.description}</p>}
                  <div className="text-sm text-gray-500 mt-2">📅 {itin.start_date} → {itin.end_date}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => shareItinerary(itin.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${shareId === itin.id ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}>
                    {shareId === itin.id ? "✓ Copiado" : "🔗 Compartir"}
                  </button>
                  <button onClick={() => deleteItinerary(itin.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
