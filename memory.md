# memory.md — Preferencias del Usuario

## Idioma

- Responder **siempre en español**.
- Si el usuario escribe en español, responder en español.
- El contenido del sitio web está en español (no traducir contenido existente).

## Flujo de trabajo

- **Explicar los cambios antes de aplicarlos** — No editar archivos sin confirmar primero.
- **No generar archivos .md innecesarios** — Solo crear documentación cuando el usuario lo pida.
- **Verificar información externa** antes de hardcodearla (slugs, URLs, IDs de afiliados).
- **Prefiere ediciones quirúrgicas** sobre reescrituras completas.
- **Ejecutar lint** después de cada cambio (`npm run lint`).

## Preferencias técnicas

- No introducir dependencias nuevas sin preguntar.
- No cambiar la configuración de build o deploy sin confirmar.
- Mantener la coherencia con el código existente.
- Los slugs de GetYourGuide y otros afiliados deben verificarse contra las URLs reales.

## Sobre el proyecto

- ViajApp es un proyecto personal del usuario.
- Está en producción y se usa activamente.
- El usuario es developer full-stack y entiende de código.
- La API backend (FastAPI) está en un repositorio separado: `japan-travel-api`.
