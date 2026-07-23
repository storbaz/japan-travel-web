# AGENTS.md — Reglas para IA en ViajApp

## Sobre el proyecto

ViajApp es una plataforma web de viajes a Japón con 63+ páginas, desplegada en Vercel. El usuario principal habla español y espera respuestas en español.

## Reglas de comportamiento

- **Responde en español** siempre, salvo que el usuario pida otra cosa.
- **Explica los cambios antes de aplicarlos** — no edites archivos sin confirmar.
- **Respeta la arquitectura existente** — No introduzcas dependencias nuevas sin preguntar.
- **No comentes el código** a menos que se pida explícitamente.
- **Sigue el estilo existente** — componentes "use client", Tailwind CSS, App Router.
- **Prefiere editar archivos existentes** sobre crear nuevos.
- **Ejecuta `npm run lint`** después de cada cambio para verificar.

## Stack del proyecto

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- TypeScript 5
- Leaflet / react-leaflet (mapas)
- Vercel Analytics
- API: FastAPI backend (japan-travel-api) en puerto 8002
- Auth: JWT + Supabase

## Convenciones de código

- Componentes con `"use client"` al inicio (solo los que usan hooks/estado).
- Imports con alias `@/` (configurado en tsconfig).
- Interfaces definidas al inicio del archivo o en `src/lib/`.
- Sin comentarios en el código (a menos que el usuario lo pida).
- Tailwind classes en español no convencional — seguir el patrón existente.
- Archivos de páginas en `src/app/[pagina]/page.tsx`.

## Monetización (IDs de afiliados)

- Google AdSense: `ca-pub-3991602479547271`
- Amazon JP: `tag=viajapp-21`
- GetYourGuide: `partner_id=NRWCY1R`
- Booking.com: `aid=3049503`

## Estructura de archivos

```
src/
├── app/              # 58 páginas (App Router)
├── components/       # Componentes reutilizables
│   └── cities/       # CityPage.tsx (componente city pages)
├── hooks/            # useSeason, useExchangeRate
├── contexts/         # AuthContext, ThemeContext
└── lib/              # api.ts, blog.ts
```

## APIs externas usadas

- GetYourGuide (tours/actividades)
- Klook (actividades)
- Google Maps (búsqueda de lugares)
- Booking.com (hoteles)
- Exchangerate API (tipo de cambio JPY→EUR)
