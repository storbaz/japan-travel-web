import Link from "next/link";

const TOOLS: Record<string, { href: string; label: string; emoji: string }[]> = {
  budget: [
    { href: "/currency", label: "Convertidor de Yen", emoji: "💱" },
    { href: "/jr-pass", label: "Calculadora JR Pass", emoji: "🚄" },
    { href: "/tips", label: "Tips de Ahorro", emoji: "💡" },
    { href: "/restaurants", label: "Restaurantes", emoji: "🍜" },
  ],
  weather: [
    { href: "/meteorologo", label: "Meteorólogo Local", emoji: "🌤️" },
    { href: "/packing", label: "Lista de Equipaje", emoji: "🧳" },
    { href: "/jr-pass", label: "Calculadora JR Pass", emoji: "🚄" },
    { href: "/distancia", label: "Calculadora Distancia", emoji: "📏" },
  ],
  meteorologo: [
    { href: "/weather", label: "Clima por Ciudad", emoji: "🌤️" },
    { href: "/packing", label: "Lista de Equipaje", emoji: "🧳" },
    { href: "/distancia", label: "Calculadora Distancia", emoji: "📏" },
    { href: "/tips", label: "Tips de Ahorro", emoji: "💡" },
  ],
  visa: [
    { href: "/jr-pass", label: "Calculadora JR Pass", emoji: "🚄" },
    { href: "/budget", label: "Presupuesto", emoji: "💰" },
    { href: "/phrases", label: "Frases en Japonés", emoji: "🗣️" },
    { href: "/packing", label: "Lista de Equipaje", emoji: "🧳" },
  ],
  "jr-pass": [
    { href: "/visa", label: "Visa Japón", emoji: "🛂" },
    { href: "/budget", label: "Presupuesto", emoji: "💰" },
    { href: "/weather", label: "Clima por Ciudad", emoji: "🌤️" },
    { href: "/distancia", label: "Calculadora Distancia", emoji: "📏" },
  ],
  lockers: [
    { href: "/packing", label: "Lista de Equipaje", emoji: "🧳" },
    { href: "/budget", label: "Presupuesto", emoji: "💰" },
    { href: "/distancia", label: "Calculadora Distancia", emoji: "📏" },
    { href: "/tips", label: "Tips de Ahorro", emoji: "💡" },
  ],
  tips: [
    { href: "/budget", label: "Presupuesto", emoji: "💰" },
    { href: "/currency", label: "Convertidor de Yen", emoji: "💱" },
    { href: "/restaurants", label: "Restaurantes", emoji: "🍜" },
    { href: "/packing", label: "Lista de Equipaje", emoji: "🧳" },
  ],
  phrases: [
    { href: "/emergency", label: "Emergencias", emoji: "🚨" },
    { href: "/visa", label: "Visa Japón", emoji: "🛂" },
    { href: "/restaurants", label: "Restaurantes", emoji: "🍜" },
    { href: "/jr-pass", label: "Calculadora JR Pass", emoji: "🚄" },
  ],
  emergency: [
    { href: "/phrases", label: "Frases en Japonés", emoji: "🗣️" },
    { href: "/visa", label: "Visa Japón", emoji: "🛂" },
    { href: "/weather", label: "Clima por Ciudad", emoji: "🌤️" },
    { href: "/distancia", label: "Calculadora Distancia", emoji: "📏" },
  ],
  restaurants: [
    { href: "/budget", label: "Presupuesto", emoji: "💰" },
    { href: "/tips", label: "Tips de Ahorro", emoji: "💡" },
    { href: "/currency", label: "Convertidor de Yen", emoji: "💱" },
    { href: "/search", label: "Buscador de Lugares", emoji: "🔍" },
  ],
  search: [
    { href: "/distancia", label: "Calculadora Distancia", emoji: "📏" },
    { href: "/restaurants", label: "Restaurantes", emoji: "🍜" },
    { href: "/budget", label: "Presupuesto", emoji: "💰" },
    { href: "/tips", label: "Tips de Ahorro", emoji: "💡" },
  ],
  currency: [
    { href: "/budget", label: "Presupuesto", emoji: "💰" },
    { href: "/tips", label: "Tips de Ahorro", emoji: "💡" },
    { href: "/jr-pass", label: "Calculadora JR Pass", emoji: "🚄" },
    { href: "/restaurants", label: "Restaurantes", emoji: "🍜" },
  ],
  packing: [
    { href: "/weather", label: "Clima por Ciudad", emoji: "🌤️" },
    { href: "/lockers", label: "Temporizador Lockers", emoji: "🔒" },
    { href: "/visa", label: "Visa Japón", emoji: "🛂" },
    { href: "/budget", label: "Presupuesto", emoji: "💰" },
  ],
  distancia: [
    { href: "/jr-pass", label: "Calculadora JR Pass", emoji: "🚄" },
    { href: "/search", label: "Buscador de Lugares", emoji: "🔍" },
    { href: "/weather", label: "Clima por Ciudad", emoji: "🌤️" },
    { href: "/budget", label: "Presupuesto", emoji: "💰" },
  ],
};

interface RelatedToolsProps {
  currentTool: string;
}

export default function RelatedTools({ currentTool }: RelatedToolsProps) {
  const related = TOOLS[currentTool];
  if (!related) return null;

  return (
    <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Herramientas relacionadas</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {related.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 hover:border-red-300 hover:shadow-md transition text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            <span className="text-lg">{tool.emoji}</span>
            {tool.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
