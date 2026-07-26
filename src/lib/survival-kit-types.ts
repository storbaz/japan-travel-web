export type POICategory = "water" | "toilet" | "atm" | "locker" | "wifi" | "konbini" | "trash" | "pharmacy" | "smoking" | "tourist_info" | "battery";

export interface SurvivalPOI {
  id: string;
  name: string;
  category: POICategory;
  city: string;
  lat: number;
  lng: number;
  description?: string;
  tags?: string[];
}

export interface CategoryConfig {
  id: POICategory;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const CATEGORIES: CategoryConfig[] = [
  { id: "water", label: "Agua", icon: "💧", color: "#0284c7", bgColor: "#e0f2fe", borderColor: "#bae6fd" },
  { id: "toilet", label: "Baños", icon: "🚻", color: "#7c3aed", bgColor: "#ede9fe", borderColor: "#ddd6fe" },
  { id: "atm", label: "ATM", icon: "💴", color: "#059669", bgColor: "#d1fae5", borderColor: "#a7f3d0" },
  { id: "locker", label: "Taquillas", icon: "🔒", color: "#d97706", bgColor: "#fef3c7", borderColor: "#fde68a" },
  { id: "wifi", label: "WiFi", icon: "📶", color: "#dc2626", bgColor: "#fee2e2", borderColor: "#fecaca" },
  { id: "konbini", label: "24h", icon: "🏪", color: "#4f46e5", bgColor: "#e0e7ff", borderColor: "#c7d2fe" },
  { id: "trash", label: "Papelera", icon: "🗑️", color: "#78716c", bgColor: "#f5f5f4", borderColor: "#e7e5e4" },
  { id: "pharmacy", label: "Farmacia", icon: "💊", color: "#e11d48", bgColor: "#ffe4e6", borderColor: "#fecdd3" },
  { id: "smoking", label: "Fumar", icon: "🚬", color: "#92400e", bgColor: "#fef3c7", borderColor: "#fde68a" },
  { id: "tourist_info", label: "Info", icon: "ℹ️", color: "#0369a1", bgColor: "#e0f2fe", borderColor: "#bae6fd" },
  { id: "battery", label: "Bateria", icon: "🔋", color: "#ea580c", bgColor: "#fff7ed", borderColor: "#fed7aa" },
];

export function getCategoryConfig(category: POICategory): CategoryConfig {
  return CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
}
