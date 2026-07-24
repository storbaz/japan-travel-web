"use client";

import { useMemo } from "react";
import { survivalPOIs } from "@/lib/survival-kit-data";
import { CATEGORIES, getCategoryConfig, POICategory } from "@/lib/survival-kit-types";

interface SurvivalKitUIProps {
  routeCities: string[];
  activeCategories: Set<POICategory>;
  onToggleCategory: (cat: POICategory) => void;
}

export default function SurvivalKitUI({ routeCities, activeCategories, onToggleCategory }: SurvivalKitUIProps) {
  const countsByCategory = useMemo(() => {
    const citySet = new Set(routeCities);
    const counts: Record<string, number> = {};
    survivalPOIs.forEach((poi) => {
      if (citySet.has(poi.city)) {
        counts[poi.category] = (counts[poi.category] || 0) + 1;
      }
    });
    return counts;
  }, [routeCities]);

  const filteredPOIs = useMemo(() => {
    const citySet = new Set(routeCities);
    return survivalPOIs.filter((poi) => citySet.has(poi.city) && activeCategories.has(poi.category));
  }, [routeCities, activeCategories]);

  return (
    <>
      {/* Toggle buttons */}
      <div className="flex flex-wrap gap-2 mt-3">
        {CATEGORIES.map((cat) => {
          const active = activeCategories.has(cat.id);
          const count = countsByCategory[cat.id] || 0;
          return (
            <button
              key={cat.id}
              onClick={() => onToggleCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border"
              style={{
                background: active ? cat.bgColor : "white",
                borderColor: active ? cat.color : "#e5e7eb",
                color: active ? cat.color : "#6b7280",
                boxShadow: active ? `0 0 0 1px ${cat.color}` : "none",
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* POI list */}
      {activeCategories.size > 0 && filteredPOIs.length > 0 && (
        <div className="mt-3 bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            📍 {filteredPOIs.length} puntos en tu ruta
          </h4>
          <div className="max-h-[200px] overflow-y-auto space-y-1.5">
            {filteredPOIs.map((poi) => {
              const config = getCategoryConfig(poi.category);
              return (
                <div key={poi.id} className="flex items-center gap-2 p-2 rounded-lg">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: config.bgColor, color: config.color }}
                  >
                    {config.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{poi.name}</div>
                    {poi.description && (
                      <div className="text-xs text-gray-500 truncate">{poi.description}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeCategories.size > 0 && filteredPOIs.length === 0 && (
        <div className="mt-3 bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">No hay puntos en las ciudades de tu ruta para esta categoría.</p>
        </div>
      )}
    </>
  );
}
