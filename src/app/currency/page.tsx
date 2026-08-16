"use client";

import { useState } from "react";
import SeoContent from "@/components/SeoContent";

const currencies = [
  { code: "JPY", symbol: "¥", name: "Yen Japones" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "Dolar Americano" },
  { code: "GBP", symbol: "£", name: "Libra Esterlina" },
  { code: "MXN", symbol: "$", name: "Peso Mexicano" },
  { code: "COP", symbol: "$", name: "Peso Colombiano" },
  { code: "ARS", symbol: "$", name: "Peso Argentino" },
  { code: "CLP", symbol: "$", name: "Peso Chileno" },
  { code: "BRL", symbol: "R$", name: "Real Brasileño" },
  { code: "PEN", symbol: "S/", name: "Sol Peruano" },
];

// Rates relative to JPY (1 JPY = X currency) - Actualizado Jul 2026
const rates: Record<string, number> = {
  JPY: 1,
  EUR: 0.0058,
  USD: 0.0064,
  GBP: 0.0050,
  MXN: 0.11,
  COP: 26.0,
  ARS: 6.5,
  CLP: 6.0,
  BRL: 0.032,
  PEN: 0.024,
};

const commonConversions = [
  { item: "Cafe konbini", jpy: 150, emoji: "☕" },
  { item: "Ramen", jpy: 900, emoji: "🍜" },
  { item: "Bento konbini", jpy: 500, emoji: "🍱" },
  { item: "Ticket metro (2 zones)", jpy: 250, emoji: "🚇" },
  { item: "JR Pass 7 dias", jpy: 50000, emoji: "🚄" },
  { item: "Cerveza izakaya", jpy: 500, emoji: "🍺" },
  { item: "Onsen entrada", jpy: 800, emoji: "♨️" },
  { item: "Souvenir basico", jpy: 1000, emoji: "🎁" },
  { item: "Taxi corto", jpy: 1500, emoji: "🚕" },
  { item: "Hotel economico (por noche)", jpy: 8000, emoji: "🏨" },
];

export default function CurrencyPage() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("JPY");
  const [toCurrency, setToCurrency] = useState("EUR");

  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;

  const jpyAmount = parseFloat(amount) / fromRate;
  const converted = jpyAmount * toRate;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">💱 Convertidor de Moneda</h1>
      <p className="text-gray-600 mb-8">Sabe cuanto vale todo en tu moneda</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-3xl font-bold border border-gray-300 rounded-xl px-4 py-3"
              placeholder="0"
            />
          </div>
          <div className="text-center text-2xl text-gray-400 pb-2">→</div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resultado</label>
            <div className="w-full text-3xl font-bold bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700">
              {converted < 0.01 && converted > 0 ? converted.toExponential(2) : converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg font-medium">
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">A</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg font-medium">
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          1 JPY ≈ {(rates.EUR * 100).toFixed(1)} centavos EUR | 1 EUR ≈ {Math.round(1 / rates.EUR)} JPY
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">🏷️ Precios Comunes en Japon</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {commonConversions.map((item, i) => {
          const value = item.jpy * (rates[toCurrency] / rates.JPY);
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition cursor-pointer" onClick={() => { setAmount(item.jpy.toString()); setFromCurrency("JPY"); }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div className="font-medium">{item.item}</div>
                  <div className="text-sm text-gray-500">¥{item.jpy.toLocaleString()}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">
                  {currencies.find((c) => c.code === toCurrency)?.symbol}{value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-gray-400">{toCurrency}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
        <strong>Nota:</strong> Los tipos de cambio son aproximados y se actualizan periodicamente. Para cambios oficiales consulta tu banco o XE.com.
      </div>

      <SeoContent
        title="El yen japonés y el dinero en el viaje"
        paragraphs={[
          "La moneda de Japón es el yen (円, símbolo ¥). En 2026, un euro se cambia aproximadamente por 150-160 yenes, lo que convierte a Japón en un destino más asequible que hace una década. Los billetes van desde 1.000 hasta 10.000 yenes (el billete de 10.000 equivale a unos 65-70 euros) y las monedas van desde 1 hasta 500 yenes. Para hacerte una idea rápida: 1.000 yenes son unos 6-7 euros.",
          "Japón sigue siendo una economía muy orientada al efectivo. En las grandes ciudades podrás pagar con tarjeta en cadenas, hoteles y centros comerciales, pero en los pueblos, mercados, templos y restaurantes de barrio el efectivo es obligatorio. La buena noticia: sacar dinero es fácil en los cajeros de 7-Eleven y Japan Post, que aceptan tarjetas extranjeras (con comisión del banco emisor).",
          "Antes de viajar conviene convertir mentalmente los precios y no dejarse llevar por números grandes: ver 10.000 yenes por una cena impresiona, pero son unos 65 euros. Los precios en Japón casi siempre se muestran sin impuestos (sin IVA, que es del 10%, y del 8% para comida básica). Con este conversor podrás comparar precios al instante mientras paseas o compras.",
        ]}
        faqs={[
          { q: "¿Cuánto vale un yen en euros?", a: "En 2026, 1 yen equivale a unos 0,0065-0,0070 euros, es decir, 1 euro son aproximadamente 150-160 yenes. Usa el conversor para valores exactos en tiempo real." },
          { q: "¿Debo llevar efectivo o usar tarjeta en Japón?", a: "Lleva siempre algo de efectivo y combina con tarjeta. Para pagar con tarjeta en Japón, asegúrate de que no tenga comisión por cambio de divisa y avisa a tu banco del viaje." },
          { q: "¿Dónde saco yenes en Japón?", a: "En los cajeros de 7-Eleven (ATMs internacionales) y Japan Post. Algunos bancos japoneses no aceptan tarjetas extranjeras; los de 7-Eleven y JP Bank son la opción más fiable." },
        ]}
      />
    </div>
  );
}
