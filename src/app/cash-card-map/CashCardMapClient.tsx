"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { CashCardPOI, PAYMENT_CONFIG, PaymentType } from "@/lib/cash-card-data";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconIconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function FlyTo({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.flyTo(position, 15, { duration: 1.5 }); }, [map, position]);
  return null;
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) { map.setView([36.5, 137.5], 6); return; }
    if (points.length === 1) { map.setView(points[0], 10); return; }
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
  }, [map, points]);
  return null;
}

function createPaymentIcon(type: PaymentType) {
  const config = PAYMENT_CONFIG[type];
  return L.divIcon({
    className: "",
    html: `<div style="width:32px;height:32px;border-radius:50%;background:${config.color};color:white;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">${config.icon}</div>`,
    iconSize: [32, 32], iconAnchor: [16, 16],
  });
}

const userIcon = L.divIcon({
  className: "",
  html: `<div style="width:20px;height:20px;border-radius:50%;background:#2563eb;border:3px solid white;box-shadow:0 0 0 2px #2563eb, 0 2px 8px rgba(0,0,0,0.3);"></div>`,
  iconSize: [20, 20], iconAnchor: [10, 10],
});

const cityNames: Record<string, string> = {
  tokyo: "Tokio", kyoto: "Kioto", osaka: "Osaka", nara: "Nara",
  hiroshima: "Hiroshima", kanazawa: "Kanazawa", nagoya: "Nagoya",
  hakone: "Hakone", fukuoka: "Fukuoka",
};

interface Props {
  pois: CashCardPOI[];
  selectedCity: string;
  cityCoords: Record<string, [number, number]>;
}

interface POIDistance extends CashCardPOI {
  distance: number;
}

export default function CashCardMapClient({ pois, selectedCity, cityCoords }: Props) {
  const [mounted, setMounted] = useState(false);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);

  useEffect(() => setMounted(true), []);

  const sortedPOIs = useMemo(() => {
    if (!userPos) return [];
    return pois
      .map((poi) => ({ ...poi, distance: haversineDistance(userPos[0], userPos[1], poi.lat, poi.lng) }))
      .sort((a, b) => a.distance - b.distance);
  }, [pois, userPos]);

  const nearbyPOIs = useMemo(() => sortedPOIs.slice(0, 8), [sortedPOIs]);

  const locate = useCallback(() => {
    if (!navigator.geolocation) { setLocError("Tu navegador no soporta geolocalizacion"); return; }
    setLocating(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => { setUserPos([pos.coords.latitude, pos.coords.longitude]); setLocating(false); },
      () => { setLocError("No se pudo obtener tu ubicacion"); setLocating(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const navigateTo = useCallback((lat: number, lng: number) => {
    setFlyTarget([lat, lng]);
    setTimeout(() => setFlyTarget(null), 2000);
  }, []);

  if (!mounted) return <div className="h-[500px] bg-gray-100 rounded-xl animate-pulse" />;

  const center: [number, number] = userPos || (selectedCity !== "all" && cityCoords[selectedCity]) || [36.5, 137.5];
  const zoom = userPos ? 13 : selectedCity !== "all" ? 12 : 6;

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
        <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
          <button onClick={locate}
            className="bg-white rounded-lg shadow-md px-3 py-2 text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition border border-gray-200">
            {locating ? <><span className="animate-spin">⏳</span> Buscando...</> : userPos ? <>📍 Mi ubicacion</> : <>📍 Dónde estoy</>}
          </button>
          {userPos && (
            <button onClick={() => { setUserPos(null); setFlyTarget(null); }}
              className="bg-white rounded-lg shadow-md px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition border border-gray-200">
              Quitar ubicacion
            </button>
          )}
        </div>

        {locError && (
          <div className="absolute top-3 left-3 z-[1000] bg-red-50 text-red-700 rounded-lg px-3 py-2 text-sm border border-red-200 shadow-md max-w-[250px]">
            {locError}
          </div>
        )}

        <MapContainer center={center} zoom={zoom} style={{ height: "500px", width: "100%" }} scrollWheelZoom={true} className="z-0">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {!userPos && <FitBounds points={pois.map((p) => [p.lat, p.lng] as [number, number])} />}
          {flyTarget && <FlyTo position={flyTarget} />}
          {userPos && (
            <>
              <Marker position={userPos} icon={userIcon}>
                <Popup><div style={{ fontFamily: "system-ui" }}><strong>Mi ubicacion</strong></div></Popup>
              </Marker>
              <Circle center={userPos} radius={500} pathOptions={{ color: "#2563eb", fillColor: "#2563eb", fillOpacity: 0.08, weight: 1 }} />
            </>
          )}
          {pois.map((poi) => (
            <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={createPaymentIcon(poi.type)}>
              <Popup>
                <div style={{ fontFamily: "system-ui", minWidth: "220px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>
                    {PAYMENT_CONFIG[poi.type].icon} {poi.name}
                  </div>
                  <div style={{ fontSize: "12px", color: PAYMENT_CONFIG[poi.type].color, fontWeight: 600, marginBottom: "4px" }}>
                    {PAYMENT_CONFIG[poi.type].label}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>{poi.description}</div>
                  <div style={{ fontSize: "11px", color: "#999", marginBottom: "4px" }}>{cityNames[poi.city] || poi.city}</div>
                  {poi.tip && (
                    <div style={{ fontSize: "11px", color: "#d97706", background: "#fef3c7", padding: "4px 8px", borderRadius: "6px", marginBottom: "6px" }}>
                      💡 {poi.tip}
                    </div>
                  )}
                  {userPos && (
                    <div style={{ fontSize: "11px", color: "#2563eb", marginBottom: "6px" }}>
                      📏 {haversineDistance(userPos[0], userPos[1], poi.lat, poi.lng).toFixed(1)} km de ti
                    </div>
                  )}
                  <a href={`https://www.google.com/maps/dir/?api=1&origin=${userPos ? `${userPos[0]},${userPos[1]}` : ""}&destination=${poi.lat},${poi.lng}&travelmode=walking`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                    🧭 Cómo llegar
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {userPos && nearbyPOIs.length > 0 && (
        <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-bold text-gray-900 mb-3">📍 Puntos mas cercanos a ti</h4>
          <div className="space-y-2">
            {nearbyPOIs.map((poi) => {
              const config = PAYMENT_CONFIG[poi.type];
              return (
                <div key={poi.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => navigateTo(poi.lat, poi.lng)}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: config.bgColor, color: config.color }}>{config.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800">{poi.name}</div>
                    <div className="text-xs text-gray-500">{poi.description}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-bold text-blue-600">{poi.distance.toFixed(1)} km</div>
                    <a href={`https://www.google.com/maps/dir/?api=1&origin=${userPos[0]},${userPos[1]}&destination=${poi.lat},${poi.lng}&travelmode=walking`}
                      target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      className="text-[10px] text-blue-500 hover:underline">Abrir en Maps</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!userPos && (
        <div className="mt-4 bg-blue-50 rounded-xl border border-blue-200 p-4 text-center">
          <p className="text-sm text-blue-800">
            <strong>Toca "Dónde estoy"</strong> para ver los puntos mas cercanos y obtener direcciones.
          </p>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-2">{pois.length} puntos en el mapa</p>
    </div>
  );
}
