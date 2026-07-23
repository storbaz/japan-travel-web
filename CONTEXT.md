# CONTEXT.md — Estado Actual del Proyecto

**Última actualización:** 2026-07-23

## Estado general

ViajApp está en producción en https://www.viajapp.app con 58+ páginas funcionales. El sitio está desplegado en Vercel con auto-deploy desde GitHub master.

## Lo que funciona actualmente

- **58 páginas** en App Router
- **6 ciudades** con landing pages: Tokyo, Kyoto, Osaka, Hiroshima, Nara, Kanazawa, Hakone (+ Fukuoka)
- **Trip Planner** — Generador automático de itinerarios con mapa Leaflet
- **Blog** con 7 posts y fallback local
- **Auth** — Login, registro, login con Google (JWT + Supabase)
- **Modo oscuro/claro** — Toggle en navbar
- **Tema estacional** — Navbar y partículas cambian con la estación
- **Monetización** — AdSense, GetYourGuide, Klook, Booking, Amazon JP, Japan Wireless
- **Analytics** — Vercel Analytics + Google Analytics 4 (G-23JCJRVCJJ)
- **Traductor** — Con cámara y TTS
- **Calculadora JR Pass** — 20+ rutas Shinkansen
- **Wallet digital** con QR
- **Gastos compartidos**
- **Mapa interactivo** con Leaflet
- **7 secciones del navbar** — Planificar, Durante el viaje, Descubrir, Itinerarios, etc.

## Cambios recientes (última sesión)

- **Corregido slug de Nagoya en GetYourGuide:** `nagoya-l148` → `nagoya-l32669`
- **Verificados todos los slugs GYG:** tokyo-l193, osaka-l1204, kyoto-l96826, hiroshima-l32662, nara-l1707, kanazawa-l32537, hakone-l1875 — todos correctos

## Archivos modificados recientemente

- `src/app/trip-planner/page.tsx` (línea 912) — gygSlugs de Nagoya corregido

## Afiliados (enlaces confirmados)

- **GetYourGuide:** `partner_id=NRWCY1R` (slugs: tokyo-l193, osaka-l1204, kyoto-l96826, hiroshima-l32662, nara-l1707, kanazawa-l32537, hakone-l1875, nagoya-l32669)
- **Booking:** `aid=3049503`
- **Amazon JP:** `tag=viajapp-21`
- **AdSense:** `ca-pub-3991602479547271`
- **Japan Wireless:** `https://www.japan-wireless.com/?via=antonio` — pendiente integrar en trip planner y página de connectivity
- **Impact.com:** Verificación pendiente (ticket #854417, manual review 1-3 días)

## Pendiente

- Ver slug de Fukuoka si se usa en trip-planner
- Revisar si hay otros archivos con slugs GYG incorrectos
- Considerar crear un archivo centralizado de slugs GYG
