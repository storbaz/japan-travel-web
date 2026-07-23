# TODO.md — Próximos Pasos

## Alta prioridad

- [ ] Centralizar los slugs de GetYourGuide en un archivo `src/lib/gyg.ts` para evitar duplicación y facilitar mantenimiento
- [ ] Verificar si Fukuoka tiene slug GYG y añadirlo al trip-planner
- [ ] Revisar que los links de afiliados funcionan correctamente en todas las páginas

## Media prioridad

- [ ] Añadir más posts al blog (SEO: 10+ posts recomendado)
- [ ] Optimizar imágenes (no hay imágenes optimizadas actualmente)
- [ ] Añadir meta tags de imagen por página (OpenGraph images específicas)
- [ ] Revisar rendimiento — Lighthouse audit
- [ ] Añadir PWA completa (manifest.json + service worker)

## Baja prioridad

- [ ] Añadir más ciudades: Kobe, Nagasaki, Sapporo, Takayama
- [ ] Integrar más providers de afiliados (Viator, GuruWalk)
- [ ] Añadir test stories / experiencia de usuario
- [ ] Internacionalización (i18n) — contenido en inglés
- [ ] Dashboard de analytics propio (no depender solo de Vercel Analytics)

## Completado

- [x] Corregir slug Nagoya GYG (`nagoya-l148` → `nagoya-l32669`)
- [x] Verificar todos los slugs GYG de ciudades
- [x] 58+ páginas funcionales
- [x] Trip planner con mapa Leaflet
- [x] Auth con Google login
- [x] Blog con fallback local
- [x] Modo oscuro/claro
- [x] Tema estacional (navbar + partículas)
