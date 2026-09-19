# Stoico · Estudio de Arquitectura

Portafolio digital SPA de **Stoico · Estudio de Arquitectura** (Isla de Margarita, Venezuela) — arquitectura residencial, comercial y paisajismo con estética sobria y luminosa ("gris piedra + arena"). Explora las obras con fichas técnicas completas, comparador interactivo "obra gris vs. acabado final", visor de planos con zoom y un estimador de presupuesto por metro cuadrado que alimenta el formulario de cotización.

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Lenguaje | TypeScript 6 (strict, sin `any`) |
| Frontend | React 19 + Vite 8 |
| Estilos | Tailwind CSS 4 (`@theme` design tokens) |
| Animación | Framer Motion (transiciones de página, scroll-reveal, tilt 3D) |
| Routing | react-router-dom 7 (rutas lazy por página) |

## Arquitectura (Screaming Architecture)

El código se organiza por **dominios de negocio**, no por capas técnicas genéricas:

```
src/
├── home/              → Landing / dashboard del portafolio
├── projects/          → Catálogo de obras, fichas técnicas y data layer
├── blueprint-viewer/  → Comparador antes/después y visor de planos (carga perezosa)
├── studio/            → Perfil del arquitecto: filosofía, reconocimientos, equipo
├── contact/           → Formulario de consulta y estimador de m²
├── pages/             → 404
└── shared/            → Sistema de diseño + contratos de dominio
```

## Requisitos

- Node.js v24.x y npm 11.x

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo
npm run build      # typecheck (tsc -b) + bundle de producción
npm run preview    # previsualizar el build
npm run lint       # oxlint
```

## Características

- [x] Catálogo de 11 obras tipadas con filtros por categoría (URL-driven).
- [x] Ficha de obra: specs, materiales, hitos, fases y galería.
- [x] Comparador "obra gris vs. acabado final" con arrastre.
- [x] Visor de planos con zoom, desplazamiento y reset.
- [x] Estimador de presupuesto por m² → pasarela que precarga el formulario de cotización.
- [x] Contacto directo por WhatsApp, correo y teléfono.
- [x] Transiciones de página cinematográficas y animaciones de scroll (bajar y subir).
- [x] Code-splitting: páginas, comparador y visor cargados con `React.lazy`.
- [x] Cero uso de tipos `any`.