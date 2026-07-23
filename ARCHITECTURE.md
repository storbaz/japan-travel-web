# ARCHITECTURE.md — Diseño Técnico de ViajApp

## Diagrama general

```
┌─────────────────────────────────────────┐
│           Vercel (Edge + SSR)           │
│         viajapp.app (producción)        │
├─────────────────────────────────────────┤
│         Next.js 16 (App Router)         │
│  React 19 · Tailwind CSS 4 · TS 5      │
├─────────────────────────────────────────┤
│   58 páginas · 14 componentes          │
│   2 hooks · 2 contexts · 2 lib files    │
├─────────────────────────────────────────┤
│              APIs externas              │
│  FastAPI · GetYourGuide · Klook ·       │
│  Booking · Google Maps · Exchangerate   │
└─────────────────────────────────────────┘
```

## Arquitectura de páginas

Las páginas son mayormente **standalone** (páginas estáticas con datos hardcodeados o fetch simple). Excepciones:

- **Trip Planner** (`/trip-planner`) — Genera itinerarios dinámicamente con IA en el backend
- **Map** (`/map`) — Leaflet con markers interactivos
- **Auth** (`/login`, `/register`) — JWT + Supabase
- **Blog** (`/blog`) — Fallback local si el backend no responde
- **Itineraries** (`/itineraries`) — CRUD con backend

## Componentes clave

| Componente | Ubicación | Función |
|---|---|---|
| `Navbar.tsx` | `src/components/` | 3 dropdowns + "Hoy" button + tema estacional |
| `Footer.tsx` | `src/components/` | 4 columnas con links |
| `CityPage.tsx` | `src/components/cities/` | Componente reutilizable para las 8 city pages |
| `SeasonalBackground.tsx` | `src/components/` | Fondo animado por estación |
| `SeasonalParticles.tsx` | `src/components/` | Partículas (sakura, fuegos, hojas, nieve) |
| `CharacterMascot.tsx` | `src/components/` | Mascota animada |
| `ClientShell.tsx` | `src/components/` | Wrapper client-side |
| `AffiliateLinks.tsx` | `src/components/` | Links de afiliados reutilizables |
| `AdBanner.tsx` | `src/components/` | Banner de AdSense |

## Hooks

| Hook | Archivo | Función |
|---|---|---|
| `useSeason()` | `src/hooks/useSeason.ts` | Detecta estación actual → tema visual |
| `useExchangeRate()` | `src/hooks/useExchangeRate.ts` | JPY→EUR con cache 1h + fallback |

## Contexts

| Context | Archivo | Función |
|---|---|---|
| `AuthContext` | `src/contexts/AuthContext.tsx` | JWT auth, login/register/logout, Google login |
| `ThemeContext` | `src/contexts/ThemeContext.tsx` | Modo oscuro/claro con persistencia |

## Flujo de autenticación

```
Login → POST /v1/auth/login → { access_token, user }
  ↓
localStorage: token + user
  ↓
apiFetch() lee token y envía Authorization: Bearer
  ↓
Si 401 → limpia localStorage → redirect /login
```

## Monetización

| Provider | ID | Dónde se usa |
|---|---|---|
| Google AdSense | `ca-pub-3991602479547271` | Múltiples páginas (AdBanner) |
| GetYourGuide | `partner_id=NRWCY1R` | Trip planner, city pages, food |
| Klook | — | Trip planner (actividades) |
| Booking.com | `aid=3049503` | City pages (hoteles) |
| Amazon JP | `tag=viajapp-21` | Forgot-to-buy, shopping |

## Slugs de GetYourGuide

Centralizados en `src/app/trip-planner/page.tsx:912`:

```typescript
const gygSlugs = {
  tokyo: "tokyo-l193",
  osaka: "osaka-l1204",
  kyoto: "kyoto-l96826",
  hiroshima: "hiroshima-l32662",
  nara: "nara-l1707",
  kanazawa: "kanazawa-l32537",
  nagoya: "nagoya-l32669",
  hakone: "hakone-l1875"
};
```

**Nota:** Estos slugs están hardcodeados en el componente. Pendiente de centralizar.

## Dependencias principales

```
next: 16.2.10
react: 19.2.4
react-dom: 19.2.4
leaflet: ^1.9.4
react-leaflet: ^5.0.0
@vercel/analytics: ^2.0.1
tailwindcss: ^4 (via @tailwindcss/postcss)
typescript: ^5
```

No hay otras dependencias. El proyecto es deliberadamente ligero.

## Deploy

```bash
npx vercel --yes --prod
```

Auto-deploy desde GitHub master branch. Configurado en Vercel dashboard.
