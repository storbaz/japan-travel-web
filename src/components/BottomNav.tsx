"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/today", label: "Hoy", icon: "📅" },
  { href: "/reservations", label: "Reservas", icon: "📋" },
  { href: "/culture", label: "Cultura", icon: "🎭" },
  { href: "/tools", label: "Más", icon: "⚙️" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden safe-area-bottom">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="flex items-center justify-around px-2 py-1">
          {TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center min-h-[56px] min-w-[64px] px-2 py-1.5 rounded-xl transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <span className={`text-xl transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                  {tab.icon}
                </span>
                <span className={`text-[10px] font-medium mt-0.5 leading-tight ${isActive ? "font-bold" : ""}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-5 h-0.5 bg-red-500 dark:bg-red-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
