"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";

export interface CountryInfo {
  code: string;
  name: string;
  emoji: string;
  locale: string;
  currency: string;
  currencySymbol: string;
}

const COUNTRIES: CountryInfo[] = [
  { code: "ES", name: "España", emoji: "🇪🇸", locale: "es-ES", currency: "EUR", currencySymbol: "€" },
  { code: "MX", name: "México", emoji: "🇲🇽", locale: "es-MX", currency: "MXN", currencySymbol: "MX$" },
  { code: "AR", name: "Argentina", emoji: "🇦🇷", locale: "es-AR", currency: "ARS", currencySymbol: "AR$" },
  { code: "CO", name: "Colombia", emoji: "🇨🇴", locale: "es-CO", currency: "COP", currencySymbol: "COL$" },
  { code: "CL", name: "Chile", emoji: "🇨🇱", locale: "es-CL", currency: "CLP", currencySymbol: "CL$" },
  { code: "PE", name: "Perú", emoji: "🇵🇪", locale: "es-PE", currency: "PEN", currencySymbol: "S/" },
  { code: "VE", name: "Venezuela", emoji: "🇻🇪", locale: "es-VE", currency: "VES", currencySymbol: "Bs" },
  { code: "UY", name: "Uruguay", emoji: "🇺🇾", locale: "es-UY", currency: "UYU", currencySymbol: "UY$" },
  { code: "CR", name: "Costa Rica", emoji: "🇨🇷", locale: "es-CR", currency: "CRC", currencySymbol: "₡" },
  { code: "PA", name: "Panamá", emoji: "🇵🇦", locale: "es-PA", currency: "PAB", currencySymbol: "B/." },
  { code: "DO", name: "Rep. Dominicana", emoji: "🇩🇴", locale: "es-DO", currency: "DOP", currencySymbol: "RD$" },
  { code: "GT", name: "Guatemala", emoji: "🇬🇹", locale: "es-GT", currency: "GTQ", currencySymbol: "Q" },
  { code: "EC", name: "Ecuador", emoji: "🇪🇨", locale: "es-EC", currency: "USD", currencySymbol: "$" },
  { code: "BO", name: "Bolivia", emoji: "🇧🇴", locale: "es-BO", currency: "BOB", currencySymbol: "Bs" },
  { code: "HN", name: "Honduras", emoji: "🇭🇳", locale: "es-HN", currency: "HNL", currencySymbol: "L" },
  { code: "PY", name: "Paraguay", emoji: "🇵🇾", locale: "es-PY", currency: "PYG", currencySymbol: "Gs" },
  { code: "SV", name: "El Salvador", emoji: "🇸🇻", locale: "es-SV", currency: "USD", currencySymbol: "$" },
  { code: "NI", name: "Nicaragua", emoji: "🇳🇮", locale: "es-NI", currency: "NIO", currencySymbol: "C$" },
  { code: "CU", name: "Cuba", emoji: "🇨🇺", locale: "es-CU", currency: "CUP", currencySymbol: "₱" },
];

const JP_COUNTRY: CountryInfo = { code: "JP", name: "Japón", emoji: "🇯🇵", locale: "ja-JP", currency: "JPY", currencySymbol: "¥" };

interface CountryContextType {
  country: CountryInfo;
  setCountry: (code: string) => void;
  countries: CountryInfo[];
  japan: CountryInfo;
}

const CountryContext = createContext<CountryContextType>({
  country: COUNTRIES[0],
  setCountry: () => {},
  countries: COUNTRIES,
  japan: JP_COUNTRY,
});

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryInfo>(COUNTRIES[0]);

  useEffect(() => {
    const saved = localStorage.getItem("viajapp_country");
    if (saved) {
      const found = COUNTRIES.find((c) => c.code === saved);
      if (found) setCountryState(found);
    }
  }, []);

  const setCountry = useCallback((code: string) => {
    const found = COUNTRIES.find((c) => c.code === code);
    if (found) {
      setCountryState(found);
      localStorage.setItem("viajapp_country", code);
    }
  }, []);

  const value = useMemo(() => ({ country, setCountry, countries: COUNTRIES, japan: JP_COUNTRY }), [country, setCountry]);

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
