"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const cityCoords: Record<string, [number, number]> = {
  tokyo: [35.6762, 139.6503],
  kyoto: [35.0116, 135.7681],
  osaka: [34.6937, 135.5023],
  nara: [34.6851, 135.8048],
  hiroshima: [34.3853, 132.4553],
  kanazawa: [36.5613, 136.6562],
  nagoya: [35.1815, 136.9066],
  hakone: [35.2330, 139.1067],
  fukuoka: [33.5904, 130.4017],
};

const cityNames: Record<string, string> = {
  tokyo: "Tokio",
  kyoto: "Kioto",
  osaka: "Osaka",
  nara: "Nara",
  hiroshima: "Hiroshima",
  kanazawa: "Kanazawa",
  nagoya: "Nagoya",
  hakone: "Hakone",
  fukuoka: "Fukuoka",
};

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 8);
      return;
    }
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, points]);
  return null;
}

function createNumberIcon(n: number, isLast: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:28px;height:28px;border-radius:50%;
      background:${isLast ? "#16a34a" : "#dc2626"};
      color:white;display:flex;align-items:center;justify-content:center;
      font-size:13px;font-weight:bold;border:2px solid white;
      box-shadow:0 2px 6px rgba(0,0,0,0.3);
    ">${n}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

interface RouteMapProps {
  route: { city: string; days: number }[];
}

export default function RouteMap({ route }: RouteMapProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[350px] bg-gray-100 rounded-xl animate-pulse" />;

  const points: [number, number][] = route
    .map((r) => cityCoords[r.city])
    .filter(Boolean);

  if (points.length === 0) return null;

  const polyline = points.map((p) => p as [number, number]);

  let stopNumber = 0;

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <MapContainer
        center={points[0]}
        zoom={6}
        style={{ height: "350px", width: "100%" }}
        scrollWheelZoom={false}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        <Polyline
          positions={polyline}
          pathOptions={{ color: "#dc2626", weight: 3, opacity: 0.7, dashArray: "8 6" }}
        />
        {route.map((r, i) => {
          const coords = cityCoords[r.city];
          if (!coords) return null;
          stopNumber++;
          const isLast = i === route.length - 1;
          return (
            <Marker
              key={`${r.city}-${i}`}
              position={coords}
              icon={createNumberIcon(stopNumber, isLast)}
            >
              <Popup>
                <div style={{ textAlign: "center", fontFamily: "system-ui" }}>
                  <strong style={{ fontSize: "14px" }}>{cityNames[r.city] || r.city}</strong>
                  <br />
                  <span style={{ color: "#666", fontSize: "12px" }}>
                    {r.days} día{r.days > 1 ? "s" : ""}
                  </span>
                  {i > 0 && (
                    <>
                      <br />
                      <span style={{ color: "#999", fontSize: "11px" }}>
                        Stop {stopNumber} de {route.length}
                      </span>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
