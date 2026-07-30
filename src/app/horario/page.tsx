"use client";

import { useState, useEffect } from "react";

function getSpainOffset(): number {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const es = new Date(utc + 3600000 * (d.getTimezoneOffset() > -120 ? 1 : 2));
  return d.getTimezoneOffset() > -120 ? 1 : 2;
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
}

function getJapanTime(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 9);
}

function getSpainTime(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * getSpainOffset());
}

type Advice = { msg: string; color: string; emoji: string };

function getCallAdvice(spainHour: number, japanHour: number): Advice {
  if (spainHour >= 0 && spainHour < 7) return { msg: "😴 España está durmiendo — NO llames", color: "text-red-600 bg-red-50", emoji: "🔴" };
  if (spainHour >= 7 && spainHour < 9) return { msg: "🌅 Mañana en España — llamada temprana", color: "text-amber-600 bg-amber-50", emoji: "🟡" };
  if (spainHour >= 9 && spainHour < 14) return { msg: "☀️ Mañana en España — buen momento", color: "text-green-600 bg-green-50", emoji: "🟢" };
  if (spainHour >= 14 && spainHour < 17) return { msg: "🍽️ Hora de comer en España — espera un poco", color: "text-amber-600 bg-amber-50", emoji: "🟡" };
  if (spainHour >= 17 && spainHour < 22) return { msg: "🌆 Tarde en España — buen momento", color: "text-green-600 bg-green-50", emoji: "🟢" };
  if (spainHour >= 22 && spainHour < 24) return { msg: "🌙 Noche en España — llama si es urgente", color: "text-amber-600 bg-amber-50", emoji: "🟡" };
  return { msg: "❓", color: "", emoji: "⚪" };
}

export default function HorarioPage() {
  const [now, setNow] = useState(new Date());
  const [alarmHour, setAlarmHour] = useState(9);
  const [alarmMin, setAlarmMin] = useState(0);
  const [alarmMsg, setAlarmMsg] = useState("");
  const [alarmId, setAlarmId] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const japan = getJapanTime();
  const spain = getSpainTime();
  const jpHour = japan.getHours();
  const esHour = spain.getHours();
  const advice = getCallAdvice(esHour, jpHour);
  const diff = 9 - getSpainOffset();
  const spainWhenJapan12 = (12 - diff + 24) % 24;

  const setAlarm = () => {
    if (alarmId !== null) window.clearInterval(alarmId);
    const id = window.setInterval(() => {
      const n = new Date();
      if (n.getHours() === alarmHour && n.getMinutes() === alarmMin) {
        setAlarmMsg(`⏰ ¡Recordatorio! Son las ${alarmHour}:${alarmMin.toString().padStart(2, "0")} en España`);
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = 880;
          gain.gain.value = 0.3;
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          setTimeout(() => { osc.stop(); ctx.close(); }, 1000);
        } catch {};
        window.clearInterval(id);
        setAlarmId(null);
      }
    }, 1000);
    setAlarmId(id);
    setAlarmMsg(`🔔 Alarma puesta a las ${alarmHour}:${alarmMin.toString().padStart(2, "0")} (hora España)`);
  };

  const cancelAlarm = () => {
    if (alarmId !== null) window.clearInterval(alarmId);
    setAlarmId(null);
    setAlarmMsg("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🕐 Diferencia horaria</h1>
      <p className="text-gray-600 mb-8">Japón va {diff >= 0 ? `${diff}h adelantado` : `${Math.abs(diff)}h atrasado`} respecto a España.</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-5xl mb-2">🇯🇵</div>
          <div className="text-4xl font-bold text-gray-900 font-mono">{formatTime(japan)}</div>
          <div className="text-gray-500 mt-1 capitalize">{formatDate(japan)}</div>
          <div className="text-sm text-gray-400 mt-1">Japón (JST, UTC+9)</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-5xl mb-2">🇪🇸</div>
          <div className="text-4xl font-bold text-gray-900 font-mono">{formatTime(spain)}</div>
          <div className="text-gray-500 mt-1 capitalize">{formatDate(spain)}</div>
          <div className="text-sm text-gray-400 mt-1">España (CET/CEST)</div>
        </div>
      </div>

      <div className={`rounded-2xl p-5 mb-6 font-bold text-center text-lg ${advice.color}`}>
        {advice.emoji} {advice.msg}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">⏰ Recordatorio para llamar</h2>
        <p className="text-sm text-gray-500 mb-4">Pon una alarma para llamar a casa en un horario adecuado (hora España).</p>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-700">A las</span>
          <select value={alarmHour} onChange={e => setAlarmHour(Number(e.target.value))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            {Array.from({ length: 24 }, (_, i) => <option key={i} value={i}>{i}h</option>)}
          </select>
          <select value={alarmMin} onChange={e => setAlarmMin(Number(e.target.value))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            {Array.from({ length: 60 }, (_, i) => i).map(m => <option key={m} value={m}>{m.toString().padStart(2, "0")}</option>)}
          </select>
          {alarmId === null ? (
            <button onClick={setAlarm} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">Poner alarma</button>
          ) : (
            <button onClick={cancelAlarm} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition">Cancelar</button>
          )}
        </div>
        {alarmMsg && <div className="text-sm font-medium text-gray-700">{alarmMsg}</div>}
      </div>

      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-2">💡 Tips de horario</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <strong>Mejor hora para llamar a España:</strong> 9:00-14:00 y 17:00-22:00 (hora española)</li>
          <li>• <strong>Evita llamar:</strong> entre 0:00 y 7:00 (hora España) — están durmiendo</li>
          <li>• <strong>Horario laboral Japón:</strong> 9:00-18:00. No llames a empresas después de las 17:00</li>
          <li>• <strong>Diferencia:</strong> cuando en Japón son las 12:00, en España son las {spainWhenJapan12}:00</li>
        </ul>
      </div>
    </div>
  );
}
