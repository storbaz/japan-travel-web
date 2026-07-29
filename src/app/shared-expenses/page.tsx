"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";

interface ExpenseGroup {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface Expense {
  id: string;
  amount: number;
  currency: string;
  description: string;
  paid_by: string;
  split_with: string[];
  created_at: string;
  users?: { name: string };
}

interface Member {
  id: string;
  name: string;
}

interface GroupDetail extends ExpenseGroup {
  members: Member[];
  expenses: Expense[];
}

export default function SharedExpensesPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [groups, setGroups] = useState<ExpenseGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<GroupDetail | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expAmount, setExpAmount] = useState("");
  const [expDesc, setExpDesc] = useState("");
  const [expPaidBy, setExpPaidBy] = useState("");
  const [expSplitWith, setExpSplitWith] = useState<string[]>([]);

  const [newMemberName, setNewMemberName] = useState("");
  const [balances, setBalances] = useState<Record<string, number>>({});

  const loadGroups = async () => {
    try {
      const data = await apiFetch("/v1/shared-expenses/groups");
      setGroups(data.groups || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    if (!token) { router.push("/login"); return; }
    loadGroups();
  }, [token, router]);

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch("/v1/shared-expenses/groups", {
        method: "POST",
        body: JSON.stringify({ name: groupName, description: groupDesc }),
      });
      setGroupName(""); setGroupDesc(""); setShowCreate(false);
      loadGroups();
    } catch {}
  };

  const openGroup = async (groupId: string) => {
    try {
      const data = await apiFetch(`/v1/shared-expenses/groups/${groupId}`);
      setSelectedGroup(data);
      const balData = await apiFetch(`/v1/shared-expenses/groups/${groupId}/balance`);
      setBalances(balData.balances || {});
    } catch {}
  };

  const addMember = async () => {
    if (!newMemberName || !selectedGroup) return;
    try {
      await apiFetch(`/v1/shared-expenses/groups/${selectedGroup.id}/members?name=${encodeURIComponent(newMemberName)}`, { method: "POST" });
      setNewMemberName("");
      openGroup(selectedGroup.id);
    } catch {}
  };

  const addExpense = async () => {
    if (!expAmount || !expDesc || !selectedGroup) return;
    try {
      await apiFetch("/v1/shared-expenses/expenses", {
        method: "POST",
        body: JSON.stringify({
          group_id: selectedGroup.id,
          amount: parseFloat(expAmount),
          currency: "JPY",
          description: expDesc,
          paid_by: expPaidBy,
          split_with: expSplitWith,
        }),
      });
      setExpAmount(""); setExpDesc(""); setExpPaidBy(""); setExpSplitWith([]); setShowAddExpense(false);
      openGroup(selectedGroup.id);
    } catch {}
  };

  const deleteExpense = async (expenseId: string) => {
    if (!selectedGroup) return;
    try {
      await apiFetch(`/v1/shared-expenses/expenses/${expenseId}`, { method: "DELETE" });
      openGroup(selectedGroup.id);
    } catch {}
  };

  if (!user) return null;

  if (selectedGroup) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <button onClick={() => setSelectedGroup(null)} className="text-red-600 hover:text-red-700 text-sm font-medium mb-6">← Volver a grupos</button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{selectedGroup.name}</h1>
            {selectedGroup.description && <p className="text-gray-600 mt-1">{selectedGroup.description}</p>}
          </div>
          <button onClick={() => setShowAddExpense(!showAddExpense)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
            {showAddExpense ? "Cancelar" : "+ Gasto"}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
          <h2 className="font-bold text-gray-900 mb-3">Miembros</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedGroup.members.map((m) => (
              <span key={m.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{m.name}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} placeholder="Nombre del companero" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm" />
            <button onClick={addMember} className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition">Anadir</button>
          </div>
        </div>

        {Object.keys(balances).length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5 mb-6">
            <h2 className="font-bold text-gray-900 mb-3">Balances</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(balances).map(([name, amount]) => (
                <div key={name} className="text-center">
                  <div className={`text-lg font-bold ${amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {amount >= 0 ? "+" : ""}{Math.round(amount)} JPY
                  </div>
                  <div className="text-sm text-gray-600">{name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showAddExpense && (
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Cantidad (JPY)</label>
                <input type="number" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm" placeholder="5000" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Pagado por</label>
                <select value={expPaidBy} onChange={(e) => setExpPaidBy(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
                  <option value="">Seleccionar...</option>
                  {selectedGroup.members.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Descripcion</label>
              <input type="text" value={expDesc} onChange={(e) => setExpDesc(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm" placeholder="Cena, transporte, hotel..." />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Dividir con</label>
              <div className="flex flex-wrap gap-2">
                {selectedGroup.members.map((m) => (
                  <button key={m.id} onClick={() => setExpSplitWith(expSplitWith.includes(m.name) ? expSplitWith.filter((n) => n !== m.name) : [...expSplitWith, m.name])} className={`px-3 py-1 rounded-full text-sm transition ${expSplitWith.includes(m.name) ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={addExpense} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition">Guardar gasto</button>
          </div>
        )}

        <div>
          <h2 className="font-bold text-gray-900 mb-3">Gastos ({selectedGroup.expenses.length})</h2>
          {selectedGroup.expenses.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay gastos aun.</p>
          ) : (
            <div className="space-y-2">
              {selectedGroup.expenses.map((exp) => (
                <div key={exp.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{exp.description}</span>
                    <span className="text-sm text-gray-500 ml-2">por {exp.paid_by || "Desconocido"}</span>
                    {exp.split_with.length > 0 && <span className="text-xs text-gray-400 ml-2">→ {exp.split_with.join(", ")}</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-red-600">{exp.amount.toLocaleString()} JPY</span>
                    <button onClick={() => deleteExpense(exp.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">💸 Gastos Compartidos</h1>
          <p className="text-gray-600">Divide gastos con tus companeros de viaje</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
          {showCreate ? "Cancelar" : "+ Grupo"}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={createGroup} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del grupo</label>
            <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} required placeholder="Viaje a Tokio 2026" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
            <input type="text" value={groupDesc} onChange={(e) => setGroupDesc(e.target.value)} placeholder="Grupo de amigos..." className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">Crear grupo</button>
        </form>
      )}

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="bg-gray-100 rounded-xl h-24"></div>)}
        </div>
      ) : groups.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💸</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Sin grupos</h2>
          <p className="text-gray-500">Crea un grupo para empezar a dividir gastos</p>
        </div>
      ) : (
        <div className="space-y-3">
          {groups.map((g) => (
            <button key={g.id} onClick={() => openGroup(g.id)} className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-left hover:border-red-200 hover:shadow-md transition-all">
              <h2 className="font-bold text-gray-900">{g.name}</h2>
              {g.description && <p className="text-sm text-gray-600 mt-1">{g.description}</p>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
