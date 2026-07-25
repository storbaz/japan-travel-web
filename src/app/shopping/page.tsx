"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";
import { SkeletonCards } from "@/components/Skeleton";

const CATEGORIES = [
  { id: "electronics", label: "Electronica", icon: "🔌" },
  { id: "cosmetics", label: "Cosmetica", icon: "💄" },
  { id: "snacks", label: "Snacks", icon: "🍫" },
  { id: "pharmacy", label: "Farmacia", icon: "💊" },
  { id: "clothing", label: "Ropa", icon: "👕" },
  { id: "souvenirs", label: "Souvenirs", icon: "🎎" },
  { id: "100yen", label: "100 Yen Shop", icon: "💰" },
  { id: "general", label: "Otros", icon: "📦" },
];

const STORES = [
  "Don Quijote", "Matsumoto Kiyoshi", "Uniqlo", "Tokyu Hands",
  "Daiso", "Seria", "Can Do", "Bic Camera", "Yodobashi",
  "Muji", "Loft", "Nitori", "ABC Mart", "3 Coins",
  "Hard Off", "Book Off", "Mercari", "Amazon Japan",
];

const SUGGESTIONS: Record<string, string[]> = {
  electronics: ["Cargador universal", "Adaptador enchufe", "Power bank", "Auriculares", "Cable USB-C", "Tarjeta SD"],
  cosmetics: ["Crema solar UV", "Mascarilla facial", "Balsamo labial", "Tinte labial Japones", "Somin Care", "Jabon Shiseido"],
  snacks: ["Kit Kat sabores", "Pocky", "Matcha", "Mochi", "Hi-Chew", "Tokyo Banana", "Melon Pan", "Rice Crackers"],
  pharmacy: ["Ibuprofeno", "Vitamina C", "Balsamo muscular (Salonpas)", "Pastillas garganta", "Protector solar", "Antihistaminico"],
  clothing: ["Calcetines Japan", "Bufanda", "Gorra", "Camiseta Uniqlo", "Poncho lluvia", "Zapatillas"],
  souvenirs: ["Llavero torii", "Taza matcha", "Abanico", "Kimono miniatura", "Figura anime", "Sello personalizado"],
  "100yen": ["Botella reutilizable", "Tenedor portatil", "Mascara facial", "Boligrafo", "Cuaderno", "Bolsa zip", "Esponja"],
  general: ["Paraguas", "Protector solar", "Repelente", "Toallitas humedas", "Bolsa lavable"],
};

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  store: string;
  quantity: number;
  checked: boolean;
  notes: string;
}

interface ShoppingList {
  id: string;
  title: string;
  share_token: string;
  items?: ShoppingItem[];
}

export default function ShoppingPage() {
  const { user, token } = useAuth();
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("general");
  const [newItemStore, setNewItemStore] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) { window.location.href = "/login"; return; }
    apiFetch("/v1/shopping").then((data) => {
      setLists(data.lists || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);

  const createList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const data = await apiFetch("/v1/shopping", {
        method: "POST",
        body: JSON.stringify({ title: title.trim() }),
      });
      setLists([data, ...lists]);
      setSelectedId(data.id);
      setTitle("");
      setShowForm(false);
    } catch (err: any) { setError(err.message); }
  };

  const deleteList = async (id: string) => {
    if (!confirm("Eliminar esta lista?")) return;
    try {
      await apiFetch(`/v1/shopping/${id}`, { method: "DELETE" });
      setLists(lists.filter((l) => l.id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch {}
  };

  const addItem = async (name: string) => {
    if (!selectedId || !name.trim()) return;
    try {
      const item = await apiFetch(`/v1/shopping/${selectedId}/items`, {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          category: newItemCategory,
          store: newItemStore,
        }),
      });
      setLists(lists.map((l) => l.id === selectedId ? { ...l, items: [...(l.items || []), item] } : l));
      setNewItemName("");
    } catch {}
  };

  const toggleItem = async (listId: string, itemId: string, checked: boolean) => {
    try {
      await apiFetch(`/v1/shopping/${listId}/items/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({ checked: !checked }),
      });
      setLists(lists.map((l) => l.id === listId ? {
        ...l,
        items: (l.items || []).map((it) => it.id === itemId ? { ...it, checked: !checked } : it),
      } : l));
    } catch {}
  };

  const removeItem = async (listId: string, itemId: string) => {
    try {
      await apiFetch(`/v1/shopping/${listId}/items/${itemId}`, { method: "DELETE" });
      setLists(lists.map((l) => l.id === listId ? {
        ...l,
        items: (l.items || []).filter((it) => it.id !== itemId),
      } : l));
    } catch {}
  };

  const shareList = (token: string) => {
    const url = `${window.location.origin}/shopping/shared/${token}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    });
  };

  const selectedList = lists.find((l) => l.id === selectedId);

  const itemsByCategory = (items: ShoppingItem[]) => {
    const grouped: Record<string, ShoppingItem[]> = {};
    items.forEach((item) => {
      const cat = item.category || "general";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });
    return grouped;
  };

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12"><SkeletonCards count={3} /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🛒 Lista de Compras</h1>
          <p className="text-gray-600">Organiza lo que necesitas comprar en Japon</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
          {showForm ? "Cancelar" : "+ Nueva Lista"}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>}

      {showForm && (
        <form onSubmit={createList} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la lista</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Ej: Compras Osaka 2026" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">Crear</button>
        </form>
      )}

      {lists.length === 0 && !loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-600 mb-4">No tienes listas de compras aun.</p>
          <p className="text-sm text-gray-400">Crea una lista para organizar tus compras en Japon.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar - Lists */}
        <div className="md:col-span-1 space-y-3">
          {lists.map((list) => (
            <div key={list.id} className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedId === list.id ? "bg-red-50 border-red-200 shadow-sm" : "bg-white border-gray-100 hover:shadow-sm"}`} onClick={() => setSelectedId(list.id)}>
              <div className="flex items-center justify-between">
                <div className="font-bold text-gray-900">{list.title}</div>
                <div className="flex gap-1">
                  <button onClick={(e) => { e.stopPropagation(); shareList(list.share_token); }} className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded" title="Compartir link">
                    {copiedToken === list.share_token ? "✅" : "🔗"}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteList(list.id); }} className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded" title="Eliminar">
                    🗑️
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">{(list.items || []).filter((i) => i.checked).length}/{(list.items || []).length} comprados</div>
            </div>
          ))}
        </div>

        {/* Main - Items */}
        <div className="md:col-span-2">
          {selectedList ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedList.title}</h2>

              {/* Add item */}
              <div className="flex gap-2 mb-4">
                <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(newItemName); } }} placeholder="Anadir producto..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                <select value={newItemCategory} onChange={(e) => setNewItemCategory(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-2 text-sm">
                  {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                </select>
                <select value={newItemStore} onChange={(e) => setNewItemStore(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-2 text-sm hidden md:block">
                  <option value="">Tienda...</option>
                  {STORES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => addItem(newItemName)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition">+</button>
              </div>

              {/* Suggestions */}
              <div className="mb-4">
                <button onClick={() => setShowSuggestions(!showSuggestions)} className="text-sm text-gray-500 hover:text-gray-700">
                  {showSuggestions ? "Ocultar sugerencias" : "💡 Sugerencias rapidas"}
                </button>
                {showSuggestions && (
                  <div className="mt-2 space-y-2">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.id}>
                        <div className="text-xs font-medium text-gray-500 mb-1">{cat.icon} {cat.label}</div>
                        <div className="flex flex-wrap gap-1">
                          {(SUGGESTIONS[cat.id] || []).map((s) => (
                            <button key={s} onClick={() => { setNewItemCategory(cat.id); addItem(s); }} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition">{s}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Items by category */}
              {selectedList.items && selectedList.items.length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(itemsByCategory(selectedList.items)).map(([cat, items]) => {
                    const catConfig = CATEGORIES.find((c) => c.id === cat) || { label: cat, icon: "📦" };
                    return (
                      <div key={cat}>
                        <div className="text-sm font-medium text-gray-500 mb-2">{catConfig.icon} {catConfig.label}</div>
                        {items.map((item) => (
                          <div key={item.id} className={`flex items-center gap-3 p-2 rounded-lg transition ${item.checked ? "bg-green-50" : "hover:bg-gray-50"}`}>
                            <button onClick={() => toggleItem(selectedList.id, item.id, item.checked)} className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition ${item.checked ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}>
                              {item.checked && <span className="text-xs">✓</span>}
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm ${item.checked ? "line-through text-gray-400" : "text-gray-900"}`}>{item.name}</div>
                              {item.store && <div className="text-xs text-gray-400">📍 {item.store}</div>}
                            </div>
                            <button onClick={() => removeItem(selectedList.id, item.id)} className="text-gray-400 hover:text-red-500 text-sm">✕</button>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-8">Anade productos a tu lista</p>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-gray-500">Selecciona una lista o crea una nueva.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
