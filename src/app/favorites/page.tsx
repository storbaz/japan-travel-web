"use client";

import { useState, useEffect } from "react";

interface Favorite {
  id: string;
  type: "restaurant" | "place" | "event" | "phrase";
  name: string;
  city: string;
  description?: string;
  link?: string;
  addedAt: string;
}

const GM = "https://www.google.com/maps/search/?api=1&query=";

function getFavorites(): Favorite[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("viajapp_favorites") || "[]");
  } catch {
    return [];
  }
}

function saveFavorites(favs: Favorite[]) {
  localStorage.setItem("viajapp_favorites", JSON.stringify(favs));
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "restaurant" as Favorite["type"], name: "", city: "", description: "", link: "" });

  useEffect(() => {
    setMounted(true);
    setFavorites(getFavorites());
  }, []);

  const addManual = () => {
    if (!form.name.trim()) return;
    const fav: Favorite = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type: form.type,
      name: form.name.trim(),
      city: form.city.trim() || "Sin ciudad",
      description: form.description.trim() || undefined,
      link: form.link.trim() || undefined,
      addedAt: new Date().toISOString(),
    };
    const updated = [fav, ...favorites];
    setFavorites(updated);
    saveFavorites(updated);
    setForm({ type: "restaurant", name: "", city: "", description: "", link: "" });
    setShowForm(false);
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    saveFavorites(updated);
  };

  const clearAll = () => {
    if (confirm("¿Eliminar todos los favoritos?")) {
      setFavorites([]);
      saveFavorites([]);
    }
  };

  const filtered = filter === "all" ? favorites : favorites.filter((f) => f.type === filter);
  const counts = {
    all: favorites.length,
    restaurant: favorites.filter((f) => f.type === "restaurant").length,
    place: favorites.filter((f) => f.type === "place").length,
    event: favorites.filter((f) => f.type === "event").length,
    phrase: favorites.filter((f) => f.type === "phrase").length,
  };

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">❤️ Mis Favoritos</h1>
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">❤️ Mis Favoritos</h1>
          <p className="text-gray-600">{favorites.length} {favorites.length === 1 ? "elemento guardado" : "elementos guardados"}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowForm(!showForm)} className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
            ✚ Añadir manual
          </button>
          {favorites.length > 0 && (
            <button onClick={clearAll} className="text-sm text-red-500 hover:text-red-700 font-medium">
              🗑️ Limpiar todo
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          <h3 className="font-bold text-gray-900">✚ Nuevo favorito</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Favorite["type"] })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="restaurant">🍽️ Restaurante</option>
                <option value="place">📍 Lugar</option>
                <option value="event">⛩️ Evento</option>
                <option value="phrase">🗣️ Frase</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ciudad</label>
              <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Tokio, Kioto..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre del lugar" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="¿Qué tiene de especial?" rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Enlace (Google Maps, web...)</label>
            <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-2">
            <button onClick={addManual} disabled={!form.name.trim()} className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 transition disabled:opacity-50">Guardar</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-200 transition">Cancelar</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "restaurant", "place", "event", "phrase"] as const).map((type) => (
          <button key={type} onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === type ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {type === "all" ? "📋 Todos" : type === "restaurant" ? "🍽️ Restaurantes" : type === "place" ? "📍 Lugares" : type === "event" ? "⛩️ Eventos" : "🗣️ Frases"}
            {counts[type] > 0 && <span className="ml-1">({counts[type]})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">{favorites.length === 0 ? "💔" : "🔍"}</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {favorites.length === 0 ? "No tienes favoritos aún" : "No hay en esta categoría"}
          </h2>
          <p className="text-gray-500 mb-6">
            {favorites.length === 0
              ? "Guarda restaurantes, lugares y eventos desde las páginas de la app."
              : "Prueba con otra categoría."}
          </p>
          {favorites.length === 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/restaurants" className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition">
                🍽️ Ver restaurantes
              </a>
              <a href="/map" className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">
                🗺️ Explorar mapa
              </a>
              <a href="/events" className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition">
                ⛩️ Ver eventos
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((fav) => (
            <div key={fav.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0
                  ${fav.type === 'restaurant' ? 'bg-orange-100' : fav.type === 'place' ? 'bg-blue-100' : fav.type === 'event' ? 'bg-purple-100' : 'bg-green-100'}">
                  {fav.type === "restaurant" ? "🍽️" : fav.type === "place" ? "📍" : fav.type === "event" ? "⛩️" : "🗣️"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 truncate">{fav.name}</h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">en {fav.city}</span>
                  </div>
                  {fav.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{fav.description}</p>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {fav.link && (
                      <a href={fav.link} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] font-medium px-2 py-1 rounded bg-green-50 text-green-600 hover:bg-green-100 transition">
                        📍 Ver en mapa →
                      </a>
                    )}
                    <span className="text-[11px] text-gray-400">
                      Guardado {new Date(fav.addedAt).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                </div>
                <button onClick={() => removeFavorite(fav.id)}
                  className="text-gray-400 hover:text-red-500 text-lg flex-shrink-0" title="Eliminar">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-8 bg-blue-50 rounded-xl p-5 border border-blue-100">
          <h3 className="font-bold text-blue-900 mb-2">💡 Tip</h3>
          <p className="text-sm text-blue-800">
            Tus favoritos se guardan en este dispositivo. Para sincronizar entre dispositivos, inicia sesión y pronto tendremos sincronización en la nube.
          </p>
        </div>
      )}
    </div>
  );
}
