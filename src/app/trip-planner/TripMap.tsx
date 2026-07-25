"use client";

import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { survivalPOIs } from "@/lib/survival-kit-data";
import { CATEGORIES, getCategoryConfig, POICategory } from "@/lib/survival-kit-types";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const cityCoords: Record<string, [number, number]> = {
  tokyo: [35.6762, 139.6503], kyoto: [35.0116, 135.7681],
  osaka: [34.6937, 135.5023], nara: [34.6851, 135.8048],
  hiroshima: [34.3853, 132.4553], kanazawa: [36.5613, 136.6562],
  nagoya: [35.1815, 136.9066], hakone: [35.2330, 139.1067],
  fukuoka: [33.5904, 130.4017],
};

const cityNames: Record<string, string> = {
  tokyo: "Tokio", kyoto: "Kioto", osaka: "Osaka", nara: "Nara",
  hiroshima: "Hiroshima", kanazawa: "Kanazawa", nagoya: "Nagoya",
  hakone: "Hakone", fukuoka: "Fukuoka",
};

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) { map.setView(points[0], 8); return; }
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
  }, [map, points]);
  return null;
}

function createNumberIcon(n: number, isLast: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${isLast ? "#16a34a" : "#dc2626"};color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:bold;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${n}</div>`,
    iconSize: [28, 28], iconAnchor: [14, 14],
  });
}

function createPOIIcon(category: POICategory) {
  const config = getCategoryConfig(category);
  return L.divIcon({
    className: "",
    html: `<div style="width:32px;height:32px;border-radius:50%;background:${config.color};color:white;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">${config.icon}</div>`,
    iconSize: [32, 32], iconAnchor: [16, 16],
  });
}

interface TripMapProps {
  route: { city: string; days: number }[];
  routeCities: string[];
  survivalCategories: Set<POICategory>;
  onToggleCategory: (cat: POICategory) => void;
}

export default function TripMap({ route, routeCities, survivalCategories, onToggleCategory }: TripMapProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const filteredPOIs = useMemo(() => {
    const citySet = new Set(routeCities);
    return survivalPOIs.filter((poi) => citySet.has(poi.city) && survivalCategories.has(poi.category));
  }, [routeCities, survivalCategories]);

  const countsByCategory = useMemo(() => {
    const citySet = new Set(routeCities);
    const counts: Record<string, number> = {};
    survivalPOIs.forEach((poi) => {
      if (citySet.has(poi.city)) counts[poi.category] = (counts[poi.category] || 0) + 1;
    });
    return counts;
  }, [routeCities]);

  if (!mounted) return <div className="h-[350px] bg-gray-100 rounded-xl animate-pulse" />;

  const points: [number, number][] = route.map((r) => cityCoords[r.city]).filter(Boolean);
  if (points.length === 0) return null;

  const polyline = points.map((p) => p as [number, number]);
  let stopNumber = 0;

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <MapContainer center={points[0]} zoom={6} style={{ height: "350px", width: "100%" }} scrollWheelZoom={false} className="z-0">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FitBounds points={points} />
          <Polyline positions={polyline} pathOptions={{ color: "#dc2626", weight: 3, opacity: 0.7, dashArray: "8 6" }} />
          {route.map((r, i) => {
            const coords = cityCoords[r.city];
            if (!coords) return null;
            stopNumber++;
            return (
              <Marker key={`${r.city}-${i}`} position={coords} icon={createNumberIcon(stopNumber, i === route.length - 1)}>
                <Popup>
                  <div style={{ textAlign: "center", fontFamily: "system-ui" }}>
                    <strong style={{ fontSize: "14px" }}>{cityNames[r.city] || r.city}</strong><br />
                    <span style={{ color: "#666", fontSize: "12px" }}>{r.days} día{r.days > 1 ? "s" : ""}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          {filteredPOIs.map((poi) => (
            <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={createPOIIcon(poi.category)}>
              <Popup>
                <div style={{ fontFamily: "system-ui", minWidth: "180px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>{getCategoryConfig(poi.category).icon} {poi.name}</div>
                  {poi.description && <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>{poi.description}</div>}
                  <div style={{ fontSize: "11px", color: "#999" }}>{poi.city.charAt(0).toUpperCase() + poi.city.slice(1)}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {CATEGORIES.map((cat) => {
          const active = survivalCategories.has(cat.id);
          const count = countsByCategory[cat.id] || 0;
          return (
            <button key={cat.id} onClick={() => onToggleCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border"
              style={{ background: active ? cat.bgColor : "white", borderColor: active ? cat.color : "#e5e7eb", color: active ? cat.color : "#6b7280", boxShadow: active ? `0 0 0 1px ${cat.color}` : "none" }}>
              <span>{cat.icon}</span><span>{cat.label}</span><span className="text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {survivalCategories.size > 0 && filteredPOIs.length > 0 && (
        <div className="mt-3 bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-bold text-gray-900 mb-2">📍 {filteredPOIs.length} puntos en tu ruta</h4>
          <div className="max-h-[200px] overflow-y-auto space-y-1.5">
            {filteredPOIs.map((poi) => {
              const config = getCategoryConfig(poi.category);
              return (
                <div key={poi.id} className="flex items-center gap-2 p-2 rounded-lg">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: config.bgColor, color: config.color }}>{config.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{poi.name}</div>
                    {poi.description && <div className="text-xs text-gray-500 truncate">{poi.description}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {survivalCategories.size > 0 && filteredPOIs.length === 0 && (
        <div className="mt-3 bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">No hay puntos en las ciudades de tu ruta para esta categoría.</p>
        </div>
      )}
    </div>
  );
}
