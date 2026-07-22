"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";
import { SkeletonCards } from "@/components/Skeleton";

interface ItineraryItem {
  id: string;
  day_number: number;
  time: string;
  title: string;
  description: string;
  location: string;
  category: string;
}

interface Itinerary {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  items?: ItineraryItem[];
}

export default function ItinerariesPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [shareId, setShareId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [newItemDay, setNewItemDay] = useState<Record<string, number>>({});
  const [newItemTitle, setNewItemTitle] = useState<Record<string, string>>({});
  const [newItemTime, setNewItemTime] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!token) { router.push("/login"); return; }
    apiFetch("/v1/itineraries")
      .then((data) => { setItineraries(data.itineraries || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token, router]);

  const createItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (endDate && startDate && endDate < startDate) {
      setError("La fecha de fin debe ser igual o posterior a la fecha de inicio");
      return;
    }
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

  const shareItinerary = async (id: string) => {
    try {
      await apiFetch(`/v1/itineraries/${id}/share`, { method: "PUT" });
      const url = `${window.location.origin}/itineraries/shared/${id}`;
      navigator.clipboard.writeText(url).then(() => setShareId(id));
      setTimeout(() => setShareId(null), 2000);
    } catch {}
  };

  const generateDays = async (itin: Itinerary) => {
    setGeneratingId(itin.id);
    try {
      const start = new Date(itin.start_date);
      const end = new Date(itin.end_date);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const dayTemplates = [
        "Llegada y check-in",
        "Explorar la ciudad",
        "Templo/Santuario principal",
        "Barrio comercial y compras",
        "Experiencia cultural",
        "Comida local recomendada",
        "Paseo nocturno",
        "Ultimo dia: souvenirs y despedida",
      ];

      for (let d = 1; d <= Math.min(days, 8); d++) {
        await apiFetch(`/v1/itineraries/${itin.id}/items`, {
          method: "POST",
          body: JSON.stringify({
            day_number: d,
            time: "09:00",
            title: dayTemplates[d - 1] || `Dia ${d}`,
            description: "",
            location: "",
            category: "general",
          }),
        });
      }

      const updated = await apiFetch(`/v1/itineraries/${itin.id}`);
      setItineraries(itineraries.map((i) => i.id === itin.id ? { ...i, items: updated.items } : i));
      setExpandedId(itin.id);
    } catch {}
    setGeneratingId(null);
  };

  const addItem = async (itinId: string) => {
    const day = newItemDay[itinId] || 1;
    const itemTitle = newItemTitle[itinId] || "";
    const time = newItemTime[itinId] || "";
    if (!itemTitle) return;

    try {
      const item = await apiFetch(`/v1/itineraries/${itinId}/items`, {
        method: "POST",
        body: JSON.stringify({ day_number: day, time, title: itemTitle, description: "", location: "", category: "general" }),
      });
      setItineraries(itineraries.map((i) => {
        if (i.id === itinId) {
          return { ...i, items: [...(i.items || []), item] };
        }
        return i;
      }));
      setNewItemTitle({ ...newItemTitle, [itinId]: "" });
      setNewItemTime({ ...newItemTime, [itinId]: "" });
    } catch {}
  };

  const removeItem = async (itinId: string, itemId: string) => {
    try {
      await apiFetch(`/v1/itineraries/${itinId}/items/${itemId}`, { method: "DELETE" });
      setItineraries(itineraries.map((i) => {
        if (i.id === itinId) {
          return { ...i, items: (i.items || []).filter((item) => item.id !== itemId) };
        }
        return i;
      }));
    } catch {}
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
              <input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); if (endDate && e.target.value > endDate) setEndDate(""); }} required min={new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required min={startDate || new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
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
          {itineraries.map((itin) => {
            const days = Math.ceil(
              (new Date(itin.end_date).getTime() - new Date(itin.start_date).getTime()) / (1000 * 60 * 60 * 24)
            ) + 1;
            const items = itin.items || [];
            const grouped = items.reduce((acc: Record<number, ItineraryItem[]>, item) => {
              (acc[item.day_number] = acc[item.day_number] || []).push(item);
              return acc;
            }, {});
            const isExpanded = expandedId === itin.id;

            return (
              <div key={itin.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : itin.id)}>
                    <h2 className="text-xl font-bold">{itin.title}</h2>
                    {itin.description && <p className="text-gray-600 mt-1">{itin.description}</p>}
                    <div className="text-sm text-gray-500 mt-2">
                      📅 {itin.start_date} → {itin.end_date} · {days} dias · {items.length} actividades
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {items.length === 0 && (
                      <button
                        onClick={() => generateDays(itin)}
                        disabled={generatingId === itin.id}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-all disabled:opacity-50"
                      >
                        {generatingId === itin.id ? "⏳ Generando..." : "✨ Generar dias"}
                      </button>
                    )}
                    <button onClick={() => shareItinerary(itin.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${shareId === itin.id ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}>
                      {shareId === itin.id ? "✓ Copiado" : "🔗 Compartir"}
                    </button>
                    <button onClick={() => deleteItinerary(itin.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    {Object.keys(grouped).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(grouped).sort(([a], [b]) => Number(a) - Number(b)).map(([day, dayItems]) => (
                          <div key={day} className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-bold text-gray-800 mb-2">Dia {day}</h3>
                            <div className="space-y-2">
                              {dayItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 bg-white rounded-lg p-3">
                                  {item.time && <span className="text-xs text-gray-400 w-12">{item.time}</span>}
                                  <span className="flex-1 text-sm text-gray-700">{item.title}</span>
                                  <button onClick={() => removeItem(itin.id, item.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm text-center py-4">No hay actividades aun. Genera los dias o añade manualmente.</p>
                    )}

                    <div className="mt-4 flex gap-2 items-end">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Dia</label>
                        <select value={newItemDay[itin.id] || 1} onChange={(e) => setNewItemDay({ ...newItemDay, [itin.id]: Number(e.target.value) })} className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm">
                          {Array.from({ length: days }, (_, i) => (
                            <option key={i + 1} value={i + 1}>Dia {i + 1}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Hora</label>
                        <input type="time" value={newItemTime[itin.id] || ""} onChange={(e) => setNewItemTime({ ...newItemTime, [itin.id]: e.target.value })} className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm w-24" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Actividad</label>
                        <input type="text" value={newItemTitle[itin.id] || ""} onChange={(e) => setNewItemTitle({ ...newItemTitle, [itin.id]: e.target.value })} placeholder="Visitar Senso-ji..." className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm" />
                      </div>
                      <button onClick={() => addItem(itin.id)} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition">+</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
