"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch, API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Expense {
  id: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  date: string;
}

const categories = [
  { id: "comida", label: "Comida", emoji: "🍜" },
  { id: "transporte", label: "Transporte", emoji: "🚄" },
  { id: "alojamiento", label: "Alojamiento", emoji: "🏨" },
  { id: "actividades", label: "Actividades", emoji: "⛩️" },
  { id: "compras", label: "Compras", emoji: "🛍️" },
  { id: "otro", label: "Otro", emoji: "📦" },
];

export default function ExpensesPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("JPY");
  const [category, setCategory] = useState("comida");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) { router.push("/login"); return; }
    const saved = localStorage.getItem("expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, [token, router]);

  const saveExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  };

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!amount || parseFloat(amount) <= 0) { setError("Ingresa un monto valido"); return; }
    const expense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      currency,
      category,
      description,
      date,
    };
    saveExpenses([expense, ...expenses]);
    setAmount(""); setDescription("");
    setShowForm(false);
  };

  const removeExpense = (id: string) => {
    saveExpenses(expenses.filter((e) => e.id !== id));
  };

  const totalJPY = expenses.filter((e) => e.currency === "JPY").reduce((sum, e) => sum + e.amount, 0);
  const totalEUR = expenses.filter((e) => e.currency === "EUR").reduce((sum, e) => sum + e.amount, 0);
  const byCategory = categories.map((cat) => ({
    ...cat,
    total: expenses.filter((e) => e.category === cat.id && e.currency === "JPY").reduce((sum, e) => sum + e.amount, 0),
  })).filter((c) => c.total > 0).sort((a, b) => b.total - a.total);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">💸 Mis Gastos</h1>
          <p className="text-gray-600">Registra y controla tus gastos del viaje</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
          {showForm ? "Cancelar" : "+ Gasto"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addExpense} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 space-y-4">
          {error && <div className="bg-red-50 text-red-700 rounded-lg p-3 text-sm">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
              <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="1500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option value="JPY">¥ JPY</option>
                <option value="EUR">€ EUR</option>
                <option value="USD">$ USD</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.emoji} {cat.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion (opcional)</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ramen en Shinjuku" />
          </div>
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">Agregar</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-red-600">¥{totalJPY.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total en Yenes</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-green-600">€{totalEUR.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total en Euros</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-blue-600">{expenses.length}</div>
          <div className="text-sm text-gray-600">Gastos registrados</div>
        </div>
      </div>

      {byCategory.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <h3 className="font-bold mb-3">Por Categoria</h3>
          <div className="space-y-2">
            {byCategory.map((cat) => (
              <div key={cat.id} className="flex items-center gap-3">
                <span className="text-lg">{cat.emoji}</span>
                <span className="flex-1 text-sm">{cat.label}</span>
                <span className="font-medium">¥{cat.total.toLocaleString()}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(cat.total / totalJPY) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {expenses.map((expense) => {
          const cat = categories.find((c) => c.id === expense.category);
          return (
            <div key={expense.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat?.emoji}</span>
                <div>
                  <div className="font-medium">{expense.description || cat?.label}</div>
                  <div className="text-sm text-gray-500">{expense.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{expense.currency === "JPY" ? "¥" : expense.currency === "EUR" ? "€" : "$"}{expense.amount.toLocaleString()}</span>
                <button onClick={() => removeExpense(expense.id)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
              </div>
            </div>
          );
        })}
      </div>

      {expenses.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-5xl mb-4">💸</div>
          <p>No hay gastos registrados</p>
        </div>
      )}
    </div>
  );
}
