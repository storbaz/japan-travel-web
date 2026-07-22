# ViajApp — Frontend

Plataforma completa de viajes a Japon: guias, presupuesto, eventos, comida, transporte, clima y mas.

**Produccion:** https://www.viajapp.app

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Estilos:** Tailwind CSS
- **Despliegue:** Vercel
- **API:** FastAPI (japan-travel-api)
- **Auth:** JWT + Supabase
- **Analytics:** Vercel Analytics
- **Ads:** Google AdSense (`ca-pub-3991602479547271`)

## Desarrollo Local

```bash
npm install
npm run dev
# http://localhost:3000
```

## Estructura

```
src/
├── app/                    # 63+ paginas (App Router)
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Layout global (navbar, footer, analytics)
│   ├── sitemap.ts          # Sitemap dinamico
│   ├── robots.ts           # Robots.txt
│   ├── [city]/             # City landing pages (tokyo, kyoto, osaka, etc.)
│   ├── blog/               # Blog con fallback a posts locales
│   ├── place/[slug]/       # Fichas estructuradas de lugares
│   ├── itineraries/        # Itinerarios + compartir + valoraciones
│   ├── shared-expenses/    # Gastos compartidos
│   ├── community/          # Consejos de usuarios
│   ├── tools/              # Hub de herramientas
│   ├── forgot-to-buy/      # Tiendas japonesas con affiliates
│   └── ...                 # 40+ paginas mas
├── components/
│   ├── Navbar.tsx          # Navbar con 3 dropdowns + "Hoy" button
│   ├── Footer.tsx          # Footer 4 columnas
│   ├── cities/CityPage.tsx # Componente reutilizable para city pages
│   └── ...                 # Seasonal, particles, mascots, etc.
├── hooks/
│   ├── useSeason.ts        # Deteccion de estacion + tema
│   └── useExchangeRate.ts  # Tipo de cambio JPY→EUR en tiempo real
├── contexts/
│   ├── AuthContext.tsx      # Autenticacion JWT
│   └── ThemeContext.tsx     # Modo oscuro/claro
└── lib/
    ├── api.ts              # API_URL + apiFetch con auth
    └── blog.ts             # Posts locales como fallback
```

## Paginas Principales (63)

### Planificacion
- `/trip-planner` — Planificador automatico con Leaflet map
- `/flights` — Buscador de vuelos
- `/jr-pass` — Calculadora JR Pass con 20+ rutas Shinkansen
- `/budget` — Calculadora de presupuesto
- `/visa` — Info de visa por pais
- `/packing` — Lista de equipaje personalizada
- `/seasons` — Estaciones del ano
- `/reservations` — Reservas populares
- `/tools` — Hub de herramientas

### Durante el viaje
- `/today` — Tu dia en Japon (geolocation + recomendaciones)
- `/map` — Mapa interactivo
- `/restaurants` — Restaurantes por ciudad
- `/food` — Guia gastronomica + FAQ
- `/free-tours` — 8 tours gratuitos en 6 ciudades
- `/transport` — Transporte + FAQ
- `/events` — Eventos y festivales
- `/weather` — Clima por ciudad
- `/translator` — Traductor con camara + TTS
- `/phrases` — 30 frases esenciales con audio
- `/emergency` — Emergencias
- `/wallet` — Wallet digital con QR
- `/shared-expenses` — Gastos compartidos
- `/favorites` — Favoritos

### Descubrir
- `/tokyo`, `/kyoto`, `/osaka`, `/hiroshima`, `/nara`, `/fukuoka`, `/hakone`, `/kanazawa` — 8 city pages con FAQ
- `/authentic` — 7 categorias de experiencias autenticas
- `/culture`, `/history`, `/nature`, `/sports` — Guias tematicas
- `/shopping`, `/forgot-to-buy` — Compras + tiendas online
- `/freaky` — Japan Freaky (45+ curiosidades)
- `/tips` — Tips de ahorro
- `/currency` — Conversor de moneda
- `/community` — Consejos de usuarios
- `/blog` — Blog con posts SEO

### Itinerarios
- `/itineraries` — Crear, gestionar, generar dias, compartir
- `/itineraries/shared/[id]` — Ver itinerarios compartidos + valoraciones

### Lugares
- `/place/[slug]` — Fichas estructuradas (JSON-LD ready)

## Monetizacion

- **Google AdSense:** `ca-pub-3991602479547271`
- **Amazon JP:** `tag=viajapp-21`
- **GetYourGuide:** `partner_id=NRWCY1R`
- **Booking.com:** `aid=3049503`
- **Klook, Viator, GuruWalk:** Links de afiliado en multiples paginas

## Deploy

```bash
npx vercel --yes --prod
```

Auto-deploy desde GitHub master branch.
