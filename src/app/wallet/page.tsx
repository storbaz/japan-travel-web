"use client";

import { useState, useEffect, useRef } from "react";

interface WalletItem {
  id: string;
  type: "ticket" | "pass" | "qr" | "reservation" | "boarding" | "reminder" | "other";
  title: string;
  subtitle?: string;
  code: string;
  date?: string;
  time?: string;
  remindBefore?: number;
  notes?: string;
  color: string;
  addedAt: string;
}

const TYPE_CONFIG: Record<string, { icon: string; label: string; gradient: string }> = {
  ticket: { icon: "🎫", label: "Ticket", gradient: "from-blue-500 to-blue-600" },
  pass: { icon: "🚄", label: "Pase", gradient: "from-green-500 to-green-600" },
  qr: { icon: "📱", label: "QR Code", gradient: "from-purple-500 to-purple-600" },
  reservation: { icon: "📋", label: "Reserva", gradient: "from-orange-500 to-orange-600" },
  boarding: { icon: "✈️", label: "Embarque", gradient: "from-sky-500 to-sky-600" },
  reminder: { icon: "⏰", label: "Recordatorio", gradient: "from-amber-500 to-amber-600" },
  other: { icon: "📄", label: "Otro", gradient: "from-gray-500 to-gray-600" },
};

const CARD_COLORS = [
  "from-red-400 to-pink-500",
  "from-blue-400 to-indigo-500",
  "from-green-400 to-emerald-500",
  "from-purple-400 to-violet-500",
  "from-orange-400 to-amber-500",
  "from-cyan-400 to-teal-500",
  "from-rose-400 to-fuchsia-500",
];

function getWallet(): WalletItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("viajapp_wallet") || "[]");
  } catch {
    return [];
  }
}

function saveWallet(items: WalletItem[]) {
  localStorage.setItem("viajapp_wallet", JSON.stringify(items));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function QRCodeSVG({ value, size = 200 }: { value: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    // Simple QR-like visual representation (not a real QR encoder)
    // In production, use a library like `qrcode` or `qr-code-styling`
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    const cellSize = Math.floor(size / 25);
    const margin = Math.floor((size - cellSize * 25) / 2);

    // Generate deterministic pattern from string
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    }

    ctx.fillStyle = "#000000";

    // Position detection patterns (corners)
    const drawFinder = (x: number, y: number) => {
      ctx.fillRect(margin + x * cellSize, margin + y * cellSize, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(margin + (x + 1) * cellSize, margin + (y + 1) * cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = "#000000";
      ctx.fillRect(margin + (x + 2) * cellSize, margin + (y + 2) * cellSize, 3 * cellSize, 3 * cellSize);
    };

    drawFinder(0, 0);
    drawFinder(18, 0);
    drawFinder(0, 18);

    // Fill data area with seeded pattern
    const seed = Math.abs(hash);
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        // Skip finder patterns
        if ((row < 8 && col < 8) || (row < 8 && col > 16) || (row > 16 && col < 8)) continue;
        if (row === 6 || col === 6) continue; // Timing patterns

        const val = ((seed * (row * 25 + col + 1) * 2654435761) >>> 0) % 3;
        if (val === 0) {
          ctx.fillRect(margin + col * cellSize, margin + row * cellSize, cellSize, cellSize);
        }
      }
    }
  }, [value, size]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="rounded-lg" style={{ width: size, height: size }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg px-3 py-1 shadow-sm border">
          <span className="text-xs font-bold text-gray-700">VIAJAPP</span>
        </div>
      </div>
    </div>
  );
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<WalletItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    type: "ticket" as WalletItem["type"],
    title: "",
    subtitle: "",
    code: "",
    date: "",
    time: "",
    remindBefore: 15,
    notes: "",
    color: CARD_COLORS[0],
  });

  useEffect(() => {
    setMounted(true);
    setWallet(getWallet());
  }, []);

  const openForm = (item?: WalletItem) => {
    if (item) {
      setEditingId(item.id);
      setForm({
        type: item.type,
        title: item.title,
        subtitle: item.subtitle || "",
        code: item.code,
        date: item.date || "",
        time: item.time || "",
        remindBefore: item.remindBefore || 15,
        notes: item.notes || "",
        color: item.color,
      });
    } else {
      setEditingId(null);
      setForm({
        type: "ticket",
        title: "",
        subtitle: "",
        code: "",
        date: "",
        time: "",
        remindBefore: 15,
        notes: "",
        color: CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)],
      });
    }
    setShowForm(true);
  };

  const saveItem = () => {
    if (!form.title || !form.code) return;
    const items = [...wallet];
    if (editingId) {
      const idx = items.findIndex((i) => i.id === editingId);
      if (idx >= 0) {
        items[idx] = { ...items[idx], ...form };
      }
    } else {
      items.unshift({
        id: generateId(),
        ...form,
        addedAt: new Date().toISOString(),
      });
    }
    setWallet(items);
    saveWallet(items);
    setShowForm(false);
    setSelectedItem(null);

    // Schedule notification for reminders
    if (form.type === "reminder" && form.date && form.time && "Notification" in window) {
      const eventTime = new Date(`${form.date}T${form.time}`);
      const remindTime = new Date(eventTime.getTime() - (form.remindBefore || 15) * 60 * 1000);
      const now = new Date();
      const delay = remindTime.getTime() - now.getTime();

      if (delay > 0) {
        // Request permission if not granted
        if (Notification.permission === "default") {
          Notification.requestPermission();
        }

        setTimeout(() => {
          if (Notification.permission === "granted") {
            new Notification(`⏰ ${form.title}`, {
              body: `Empieza en ${form.remindBefore} minutos. ${form.subtitle || ""}`,
              icon: "/favicon.ico",
              tag: `reminder-${form.title}`,
            });
          }
        }, delay);

        // Also store scheduled reminder
        const scheduled = JSON.parse(localStorage.getItem("viajapp_reminders") || "[]");
        scheduled.push({
          id: form.title,
          title: form.title,
          subtitle: form.subtitle,
          date: form.date,
          time: form.time,
          remindBefore: form.remindBefore,
          scheduledFor: remindTime.toISOString(),
        });
        localStorage.setItem("viajapp_reminders", JSON.stringify(scheduled));
      }
    }
  };

  const deleteItem = (id: string) => {
    if (!confirm("¿Eliminar este elemento de la wallet?")) return;
    const items = wallet.filter((i) => i.id !== id);
    setWallet(items);
    saveWallet(items);
    setSelectedItem(null);
  };

  const upcomingItems = wallet.filter((i) => {
    if (!i.date) return false;
    return new Date(i.date) >= new Date();
  }).sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

  const pastItems = wallet.filter((i) => {
    if (!i.date) return true;
    return new Date(i.date) < new Date();
  });

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">💳 Mi Wallet</h1>
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">💳 Mi Wallet</h1>
          <p className="text-gray-600">Tus tickets, QR codes y pases en un solo lugar</p>
        </div>
        <button onClick={() => openForm()}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
          + Añadir
        </button>
      </div>

      {wallet.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💳</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Tu wallet está vacía</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Guarda tickets de atracciones, códigos QR de entrada, pases de tren, reservas de hotel y más. Todo junto para cuando lo necesites.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto mb-6">
            {Object.entries(TYPE_CONFIG).map(([key, config]) => (
              <button key={key} onClick={() => { setForm({ ...form, type: key as WalletItem["type"] }); setShowForm(true); }}
                className="p-3 bg-white rounded-xl border border-gray-100 hover:shadow-md transition text-center">
                <div className="text-2xl mb-1">{config.icon}</div>
                <div className="text-xs font-medium text-gray-700">{config.label}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {upcomingItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">📅 Próximos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {upcomingItems.map((item) => {
                  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.other;
                  return (
                    <div key={item.id} onClick={() => setSelectedItem(item)}
                      className={`bg-gradient-to-br ${item.color} rounded-2xl p-5 text-white cursor-pointer hover:shadow-lg transition transform hover:scale-[1.02]`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-sm opacity-80">{config.icon} {config.label}</div>
                          <div className="text-lg font-bold">{item.title}</div>
                          {item.subtitle && <div className="text-sm opacity-90">{item.subtitle}</div>}
                        </div>
                        {item.date && (
                          <div className="text-right text-xs opacity-80">
                            <div>{new Date(item.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}</div>
                          </div>
                        )}
                      </div>
                      <div className="bg-white/20 rounded-lg px-3 py-2 text-center">
                        <QRCodeSVG value={item.code} size={120} />
                      </div>
                      <div className="text-center text-xs mt-2 opacity-80 font-mono">{item.code}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {pastItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">📦 Usados / Sin fecha</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pastItems.map((item) => {
                  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.other;
                  return (
                    <div key={item.id} onClick={() => setSelectedItem(item)}
                      className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:shadow-md transition">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{config.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 truncate">{item.title}</div>
                          <div className="text-sm text-gray-500 truncate">{item.subtitle || config.label}</div>
                        </div>
                        <div className="text-gray-300">→</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Detail modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className={`bg-gradient-to-br ${selectedItem.color} p-6 text-white rounded-t-2xl`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm opacity-80">{TYPE_CONFIG[selectedItem.type]?.icon} {TYPE_CONFIG[selectedItem.type]?.label}</span>
                <button onClick={() => setSelectedItem(null)} className="text-white/80 hover:text-white text-xl">✕</button>
              </div>
              <h2 className="text-2xl font-bold mb-1">{selectedItem.title}</h2>
              {selectedItem.subtitle && <p className="opacity-90">{selectedItem.subtitle}</p>}
              {selectedItem.date && (
                <p className="text-sm opacity-80 mt-2">📅 {new Date(selectedItem.date).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <QRCodeSVG value={selectedItem.code} size={200} />
              </div>
              <div className="text-center mb-4">
                <div className="text-xs text-gray-500 mb-1">Código</div>
                <div className="font-mono text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{selectedItem.code}</div>
              </div>
              {selectedItem.notes && (
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Notas</div>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{selectedItem.notes}</p>
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => { setSelectedItem(null); openForm(selectedItem); }}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
                  ✏️ Editar
                </button>
                <button onClick={() => deleteItem(selectedItem.id)}
                  className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{editingId ? "✏️ Editar" : "➕ Añadir a Wallet"}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(TYPE_CONFIG).map(([key, config]) => (
                      <button key={key} onClick={() => setForm({ ...form, type: key as WalletItem["type"] })}
                        className={`p-2 rounded-xl text-center text-sm font-medium transition border-2 ${form.type === key ? "border-blue-500 bg-blue-50" : "border-gray-100 hover:border-gray-200"}`}>
                        <div className="text-lg">{config.icon}</div>
                        <div>{config.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Ej: JR Pass 7 días"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                  <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    placeholder="Ej: Tokyo → Osaka → Kyoto"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código / QR *</label>
                  <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
                    placeholder="Código de barras, booking ID, etc."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
                  <p className="text-xs text-gray-400 mt-1">Se generará un código visual con este valor</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {form.type === "reminder" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                      <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Avisarme con antelación</label>
                      <div className="flex gap-2">
                        {[5, 10, 15, 30, 60].map((mins) => (
                          <button key={mins} onClick={() => setForm({ ...form, remindBefore: mins })}
                            className={`flex-1 py-2 rounded-lg text-xs font-medium transition ${form.remindBefore === mins ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                            {mins}min
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Recibirás una notificación antes del evento</p>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Información adicional..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex gap-2">
                    {CARD_COLORS.map((color) => (
                      <button key={color} onClick={() => setForm({ ...form, color })}
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} transition ${form.color === color ? "ring-2 ring-offset-2 ring-blue-500 scale-110" : "hover:scale-105"}`} />
                    ))}
                  </div>
                </div>

                <button onClick={saveItem} disabled={!form.title || !form.code}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {editingId ? "Guardar cambios" : "Añadir a Wallet"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-3">💡 Tip: Tipos de elementos que puedes guardar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
          <div>🎫 <strong>Tickets</strong> — Atracciones, museos, shows</div>
          <div>🚄 <strong>Pases</strong> — JR Pass, IC Card, day passes</div>
          <div>📱 <strong>QR Codes</strong> — Entradas digitales, códigos de acceso</div>
          <div>📋 <strong>Reservas</strong> — Hoteles, restaurantes, experiences</div>
          <div>✈️ <strong>Embarque</strong> — Boarding passes de vuelos</div>
          <div>⏰ <strong>Recordatorios</strong> — Con notificación antes del evento</div>
        </div>
      </div>
    </div>
  );
}
