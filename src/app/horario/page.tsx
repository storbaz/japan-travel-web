"use client";

import { useState, useEffect } from "react";

const countries = [
  { id: "es", flag: "🇪🇸", name: "España", tz: "Europe/Madrid" },
  { id: "ar", flag: "🇦🇷", name: "Argentina", tz: "America/Argentina/Buenos_Aires" },
  { id: "mx", flag: "🇲🇽", name: "México", tz: "America/Mexico_City" },
  { id: "co", flag: "🇨🇴", name: "Colombia", tz: "America/Bogota" },
  { id: "cl", flag: "🇨🇱", name: "Chile", tz: "America/Santiago" },
  { id: "pe", flag: "🇵🇪", name: "Perú", tz: "America/Lima" },
  { id: "ec", flag: "🇪🇨", name: "Ecuador", tz: "America/Guayaquil" },
  { id: "ve", flag: "🇻🇪", name: "Venezuela", tz: "America/Caracas" },
  { id: "uy", flag: "🇺🇾", name: "Uruguay", tz: "America/Montevideo" },
  { id: "cu", flag: "🇨🇺", name: "Cuba", tz: "America/Havana" },
  { id: "do", flag: "🇩🇴", name: "Rep. Dominicana", tz: "America/Santo_Domingo" },
  { id: "cr", flag: "🇨🇷", name: "Costa Rica", tz: "America/Costa_Rica" },
  { id: "gt", flag: "🇬🇹", name: "Guatemala", tz: "America/Guatemala" },
  { id: "pa", flag: "🇵🇦", name: "Panamá", tz: "America/Panama" },
  { id: "bo", flag: "🇧🇴", name: "Bolivia", tz: "America/La_Paz" },
  { id: "py", flag: "🇵🇾", name: "Paraguay", tz: "America/Asuncion" },
  { id: "hn", flag: "🇭🇳", name: "Honduras", tz: "America/Tegucigalpa" },
  { id: "sv", flag: "🇸🇻", name: "El Salvador", tz: "America/El_Salvador" },
  { id: "ni", flag: "🇳🇮", name: "Nicaragua", tz: "America/Managua" },
  { id: "us", flag: "🇺🇸", name: "EE.UU. (Nueva York)", tz: "America/New_York" },
  { id: "gb", flag: "🇬🇧", name: "Reino Unido", tz: "Europe/London" },
  { id: "kr", flag: "🇰🇷", name: "Corea del Sur", tz: "Asia/Seoul" },
  { id: "cn", flag: "🇨🇳", name: "China", tz: "Asia/Shanghai" },
  { id: "au", flag: "🇦🇺", name: "Australia (Sídney)", tz: "Australia/Sydney" },
  { id: "in", flag: "🇮🇳", name: "India", tz: "Asia/Kolkata" },
  { id: "th", flag: "🇹🇭", name: "Tailandia", tz: "Asia/Bangkok" },
  { id: "ph", flag: "🇵🇭", name: "Filipinas", tz: "Asia/Manila" },
];

function formatTime(tz: string): string {
  return new Date().toLocaleTimeString("es-ES", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function formatDate(tz: string): string {
  return new Date().toLocaleDateString("es-ES", { timeZone: tz, weekday: "long", day: "numeric", month: "long" });
}

function getTzAbbr(tz: string): string {
  try {
    return new Intl.DateTimeFormat("es-ES", { timeZone: tz, timeZoneName: "short" }).formatToParts(new Date()).find(p => p.type === "timeZoneName")?.value || tz;
  } catch {
    return tz;
  }
}

type Advice = { msg: string; color: string };

function getCallAdvice(countryName: string, hour: number): Advice {
  if (hour >= 0 && hour < 7) return { msg: `😴 ${countryName} está durmiendo — NO llames`, color: "text-red-600 bg-red-50" };
  if (hour >= 7 && hour < 9) return { msg: `🌅 Mañana en ${countryName} — llamada temprana`, color: "text-amber-600 bg-amber-50" };
  if (hour >= 9 && hour < 14) return { msg: `☀️ Mañana en ${countryName} — buen momento`, color: "text-green-600 bg-green-50" };
  if (hour >= 14 && hour < 17) return { msg: `🍽️ Hora de comer en ${countryName} — espera un poco`, color: "text-amber-600 bg-amber-50" };
  if (hour >= 17 && hour < 22) return { msg: `🌆 Tarde en ${countryName} — buen momento`, color: "text-green-600 bg-green-50" };
  if (hour >= 22 && hour < 24) return { msg: `🌙 Noche en ${countryName} — llama si es urgente`, color: "text-amber-600 bg-amber-50" };
  return { msg: "❓", color: "" };
}

export default function HorarioPage() {
  const [now, setNow] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("es");
  const [alarmHour, setAlarmHour] = useState(9);
  const [alarmMin, setAlarmMin] = useState(0);
  const [alarmMsg, setAlarmMsg] = useState("");
  const [alarmId, setAlarmId] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const country = countries.find((c) => c.id === selectedCountry) || countries[0];
  const jpAbbr = getTzAbbr("Asia/Tokyo");
  const countryAbbr = getTzAbbr(country.tz);
  const jpHour = parseInt(new Date().toLocaleString("es-ES", { timeZone: "Asia/Tokyo", hour: "numeric", hour12: false }));
  const lcHour = parseInt(new Date().toLocaleString("es-ES", { timeZone: country.tz, hour: "numeric", hour12: false }));
  const advice = getCallAdvice(country.name, lcHour);

  const setAlarm = () => {
    if (alarmId !== null) window.clearInterval(alarmId);
    const id = window.setInterval(() => {
      const n = new Date();
      if (n.getHours() === alarmHour && n.getMinutes() === alarmMin) {
        setAlarmMsg(`⏰ ¡Recordatorio! Son las ${alarmHour}:${alarmMin.toString().padStart(2, "0")} (hora local)`);
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
    setAlarmMsg(`🔔 Alarma puesta a las ${alarmHour}:${alarmMin.toString().padStart(2, "0")} (hora local)`);
  };

  const cancelAlarm = () => {
    if (alarmId !== null) window.clearInterval(alarmId);
    setAlarmId(null);
    setAlarmMsg("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🕐 Diferencia horaria</h1>
      <p className="text-gray-600 mb-8">Compara la hora de Japón con cualquier país del mundo.</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-5xl mb-2">🇯🇵</div>
          <div className="text-4xl font-bold text-gray-900 font-mono">{formatTime("Asia/Tokyo")}</div>
          <div className="text-gray-500 mt-1 capitalize">{formatDate("Asia/Tokyo")}</div>
          <div className="text-sm text-gray-400 mt-1">Japón (JST, {jpAbbr})</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-5xl mb-2">{country.flag}</div>
          <div className="text-4xl font-bold text-gray-900 font-mono">{formatTime(country.tz)}</div>
          <div className="text-gray-500 mt-1 capitalize">{formatDate(country.tz)}</div>
          <div className="text-sm text-gray-400 mt-1">{country.name} ({countryAbbr})</div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Selecciona un país para comparar:</label>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium bg-white shadow-sm">
          {countries.map((c) => (
            <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
          ))}
        </select>
      </div>

      <div className={`rounded-2xl p-5 mb-6 font-bold text-center text-lg ${advice.color}`}>
        {advice.msg}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">⏰ Recordatorio para llamar</h2>
        <p className="text-sm text-gray-500 mb-4">Pon una alarma para un momento concreto (hora local de tu dispositivo).</p>
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
          <li>• <strong>Horario laboral Japón:</strong> 9:00-18:00. No llames a empresas después de las 17:00 (hora japonesa)</li>
          <li>• <strong>Mejor momento para llamar a {country.name}:</strong> entre las 9:00 y 14:00 o 17:00 y 22:00 (hora local)</li>
          <li>• <strong>Diferencia actual:</strong> cuando en Japón son las 12:00, en {country.name} son las {(12 - (jpHour - lcHour) + 24) % 24}:00</li>
        </ul>
      </div>
    </div>
  );
}
