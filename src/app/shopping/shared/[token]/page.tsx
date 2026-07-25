"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

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

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  store: string;
  quantity: number;
  checked: boolean;
}

export default function SharedShoppingPage() {
  const params = useParams();
  const token = params.token as string;
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002"}/v1/shopping/shared/${token}`)
      .then((r) => { if (!r.ok) throw new Error("Lista no encontrada"); return r.json(); })
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-12"><div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-pulse h-48" /></div>;

  if (error) return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <p className="text-gray-600">{error}</p>
    </div>
  );

  const itemsByCategory = (items: ShoppingItem[]) => {
    const grouped: Record<string, ShoppingItem[]> = {};
    items.forEach((item) => {
      const cat = item.category || "general";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });
    return grouped;
  };

  const checkedCount = (list.items || []).filter((i: ShoppingItem) => i.checked).length;
  const total = (list.items || []).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900">{list.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{checkedCount}/{total} comprados</p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${total > 0 ? (checkedCount / total) * 100 : 0}%` }} />
        </div>

        {list.items && list.items.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(itemsByCategory(list.items)).map(([cat, items]) => {
              const catConfig = CATEGORIES.find((c) => c.id === cat) || { label: cat, icon: "📦" };
              return (
                <div key={cat}>
                  <div className="text-sm font-medium text-gray-500 mb-2">{catConfig.icon} {catConfig.label}</div>
                  {items.map((item: ShoppingItem) => (
                    <div key={item.id} className={`flex items-center gap-3 p-2 rounded-lg transition ${item.checked ? "bg-green-50" : ""}`}>
                      <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${item.checked ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}>
                        {item.checked && <span className="text-xs">✓</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm ${item.checked ? "line-through text-gray-400" : "text-gray-900"}`}>{item.name}</div>
                        {item.store && <div className="text-xs text-gray-400">📍 {item.store}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">Esta lista esta vacia.</p>
        )}

        <div className="text-center mt-8 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Compartido desde ViajApp · <a href="/" className="text-red-500 hover:text-red-600">viajapp.app</a></p>
        </div>
      </div>
    </div>
  );
}
