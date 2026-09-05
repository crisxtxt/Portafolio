# CONTEXT.md — Estado y Visión Técnica del Proyecto

> **Propósito:** Centralizar el estado, visión técnica, arquitectura y decisiones del proyecto para que cualquier agente o colaborador (humano o IA) pueda operar sobre el repositorio con el contexto completo sin supuestos.
>
> **Mantenimiento:** Lo actualiza el Tech Leader ante cualquier cambio de arquitectura, contrato, dependencia crítica o roadmap. Última revisión: **[fecha]**

---

## 1. Visión General del Producto

### Qué es
**[Una frase que define el producto. Ej: Portafolio web SPA de un estudio de arquitectura — "Cristina Arquitectura" — que muestra obras, perfil profesional y permite solicitar consultas/presupuestos.]**

### Objetivos de negocio
- **[Objetivo 1. Ej: Posicionar el portafolio del arquitecto y generar leads de consultoría.]**
- **[Objetivo 2. Ej: Diferenciar por calidad editorial del contenido y experiencia de usuario.]**

### Público objetivo
- **[Quién lo usa. Ej: Clientes potenciales de arquitectura residencial/comercial/paisajismo; inversores; otros profesionales.]**

### Mercado / Alcance
- **[Ej: Mercado local/regional, proyectos de tamaño medio-alto.]**

---

## 2. Stack Tecnológico Base

| Capa | Tecnología | Versión | Notas |
|------|-----------|---------|-------|
| **Lenguaje** | TypeScript | 6.0.3 | Strict, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noEmit` |
| **Frontend** | React | 19.2.8 | Function components + StrictMode |
| **Build** | Vite | 8.2.2 | Plugin React (Oxc) + Tailwind plugin; code-splitting manualChunks |
| **Estilos** | Tailwind CSS | 4.3.3 | Config CSS-first vía `@theme` en `src/index.css` |
| **Routing** | react-router-dom | 7.18.3 | SPA client-side routing |
| **Animación** | framer-motion | 13.2.0 | Scroll-reveal (`shared/components/Reveal.tsx`) |
| **Linting** | oxlint | 1.81.0 | Plugins react + typescript + oxc |
| **Backend** | *[Pendiente / N/A]* | — | Proyecto actualmente es solo frontend/SPA |
| **Base de Datos** | *[Pendiente / N/A]* | — | Datos estáticos en `src/projects/data/projects.ts` |
| **Infraestructura** | *[Pendiente]* | — | Sin CI/CD ni hosting configurado aún |

### Entorno local
- **Node:** v24.x (npm 11.x)
- **Comandos:**
  - `npm run dev` — servidor de desarrollo Vite
  - `npm run build` — `tsc -b && vite build` (typecheck + bundle)
  - `npm run lint` — oxlint
  - `npm run preview` — previsualizar build de producción

---

## 3. Mapa de Dominios y Arquitectura del Sistema

### Arquitectura de alto nivel
**SPA de página única (frontend-only)** organizada por **features** con capas separadas:

```
src/
├── main.tsx                 → Punto de entrada (StrictMode + App)
├── App.tsx                  → Router (BrowserRouter) + rutas lazy por página
├── index.css                → Design tokens (Tailwind @theme)
├── home/                    → Feature: landing / dashboard del portafolio
│   └── HomePage.tsx         → Hero, destacados, disciplinas, servicios, CTA
├── projects/                → Feature: catálogo de proyectos
│   ├── data/                → Data layer (projects.ts, 8 registros + selectores)
│   ├── components/          → ProjectCard (TiltCard), CategoryBadge
│   ├── shared/              → categoryMeta / labels + iconos por categoría
│   ├── ProjectsPage.tsx     → Catálogo con filtros por categoría (URL-driven)
│   └── ProjectDetailPage.tsx → Ficha: specs, materiales, hitos, fases, galería
├── blueprint-viewer/        → Feature: visualización de planos y comparativas
│   └── components/          → BlueprintComparison (slider gris/acabado), BlueprintViewer (zoom/pan), BlueprintViewerLazy
├── studio/                  → Feature: perfil del arquitecto
│   ├── data/                → profile.ts (ArchitectProfile)
│   └── StudioPage.tsx       → Filosofía, biografía, reconocimientos, equipo
├── contact/                 → Feature: consultas / presupuestos
│   ├── pricing.ts           → Lógica de negocio (estimación por m², rangos)
│   ├── components/          → BudgetEstimator (slider de superficie)
│   └── ContactPage.tsx      → Formulario ConsultationRequest + agendamiento
├── pages/                   → NotFoundPage (404)
├── shared/                  → Núcleo reutilizable (design system + dominio)
│   ├── components/          → Button, Icon, Reveal, Section, PageHero, TiltCard
│   │   └── layout/          → AppShell, Navbar, Footer, ScrollToTop
│   └── types/               → Contratos de dominio (portfolio.ts)
public/
├── images/                  → 49 assets SVG procedimentales (escenas, galerías, planos, retratos)
scripts/                     → Generadores PowerShell de assets
```

### Capas y sus reglas
| Capa | Contenido | Regla de dependencia |
|------|-----------|----------------------|
| **Domain / Types** | `shared/types/portfolio.ts` | Sin dependencias; define contratos |
| **Data layer** | `projects/data/projects.ts`, `contact/pricing.ts` | Depende solo del dominio |
| **Presentation** | `shared/components/*`, páginas | Consume data layer + dominio; nunca contiene datos de negocio |
| **Infrastructure** | `vite.config.ts`, tsconfig, tooling | Configuración de build/entorno |

### Principios de arquitectura
- **Data-driven:** Contenido centralizado en el data layer; los componentes son presentacionales.
- **Design tokens:** Toda el estilo deriva de `@theme` en `index.css` (paleta: ink, paper, clay, sage, concrete). Prohibido inventar colores en componentes.
- **Componentes desacoplados:** `shared/components` son puros, sin lógica de negocio ni fetching interno.
- **SOLID / DRY / KISS / YAGNI:** cualquier abstracción debe justificarse por uso real.

---

## 4. Modelado de Datos y Contratos Clave

### Contratos de dominio (fuente: `src/shared/types/portfolio.ts`)

#### `Category`
```ts
type Category = 'residencial' | 'comercial' | 'paisajismo'
```

#### `ProjectStatus`
```ts
type ProjectStatus = 'construido' | 'en-construccion' | 'conceptual'
```

#### `Project` — Entidad central
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `slug` | `string` | ID de ruta (deep-linking) |
| `title` | `string` | Título del proyecto |
| `location` | `string` | Ubicación (texto) |
| `coordinates` | `GeoPoint { lat, lng }` | Coordenadas para mapas |
| `year` | `number` | Año |
| `category` | `Category` | Categoría |
| `status` | `ProjectStatus` | Estado de construcción |
| `areaM2` | `number` | Superficie m² |
| `budget` | `string` | Rango de presupuesto (texto) |
| `client` | `string` | Cliente |
| `summary` / `description` | `string` | Textos |
| `heroImage` | `string` | URL de imagen hero |
| `gallery` | `string[]` | Galería (variantes g1/g2/g3) |
| `beforeImage` / `afterImage` | `string` | Comparativa antes/después |
| `hasBlueprintComparison` | `boolean` | ¿Tiene plano comparativo? |
| `blueprintImage` | `string` | Imagen de plano |
| `features` | `string[]` | Características clave |
| `materials` | `MaterialSpec[]` | Especificaciones de materiales |
| `milestones` | `Milestone[]` | Hitos con fechas |
| `phases` | `ProjectPhase[]` | Fases con estado |
| `architects` | `string[]` | Arquitectos responsables |

#### `ArchitectProfile`
`fullName`, `bio`, `philosophy`, `portrait`, `education[]`, `recognitions[]`, `team[]`

#### `ConsultationRequest`
Forma del formulario de contacto: `type` (`'cotizacion' | 'consultoria' | 'seguimiento-obra'`), `budgetRange`, `preferredDate/Time`, etc.

#### `UnitPrice` y pricing
- `unitPrices`: residencial $900–1600/m², comercial $1100–1900/m², paisajismo $120–350/m² (USD).
- Helpers: `formatArea()`, `estimateBudget(areaM2, category)` → estimación `{ low, high }`.

### Catálogo de proyectos (`src/projects/data/projects.ts`)
8 proyectos tipados:
`P-001 Casa Luz`, `P-002 Loft Montañez`, `P-003 Torre Aurora`, `P-004 Villa Pazo`, `P-005 Jardín del Lago`, `P-006 Casa del Bosque`, `P-007 REHAB Loft Corner`, `P-008 Refugio del Mar`.

Helpers disponibles:
- `projects` — array completo
- `getProjectBySlug(slug)` — lookup (para rutas dinámicas)
- `featuredProjects` — filtro `status === 'construido'`, top 3 (para home)

### Convenciones de datos
- Nombres de archivo de imágenes = slug del proyecto (`/images/casa-luz.svg`, `casa-luz-before.svg`, `casa-luz-blueprint.svg`, galerías `casa-luz-g1/g2/g3.svg`).
- Todo dato estático vive en el data layer, nunca en componentes.
- Moneda: USD; formato de área/localización en locale `es`.

---

## 5. Dependencias Críticas y Servicios de Terceros

### Dependencias de producción
| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `react` / `react-dom` | 19.2.8 | UI |
| `react-router-dom` | 7.18.3 | Routing SPA |
| `framer-motion` | 13.2.0 | Animaciones |
| `tailwindcss` | 4.3.3 | Styling |
| `@tailwindcss/vite` | 4.3.3 | Plugin Tailwind |

### Dependencias de desarrollo
| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `vite` | 8.2.2 | Build/dev server |
| `typescript` | 6.0.3 | Typecheck |
| `@vitejs/plugin-react` | 6.1.0 | React refresh (Oxc) |
| `oxlint` | 1.81.0 | Linter |
| `@types/node`, `@types/react`, `@types/react-dom` | — | Tipos |

### Servicios de terceros (externos)
| Servicio | Uso | Estado |
|----------|-----|--------|
| **Google Fonts** | Cormorant Garamond + Inter (`index.html`) | Activo |
| *[Hosting]* | *[Pendiente]* | — |
| *[Backend/API]* | *[Pendiente]* | — |
| *[Form backend]* | *[Pendiente — para enviar formulario de contacto]* | — |

> **Nota de seguridad:** No hay `.env` todavía. Si se añade envío de formulario o servicios externos con secretos, registrar aquí y garantizar `.env*.local` en `.gitignore`.

---

## 6. Estado Actual del Desarrollo y Mapa de Rutas Técnico

### Estado actual (checklist de lo completado)
- [x] Inicialización del proyecto (Vite + React + TS + Tailwind v4)
- [x] Design tokens / sistema de estilos (`src/index.css`)
- [x] Sistema de diseño base (`shared/components`: Button, Icon, Reveal)
- [x] Contratos de dominio (`shared/types/portfolio.ts`)
- [x] Data layer de proyectos (8 registros + helpers de selección)
- [x] Lógica de presupuestos (`contact/pricing.ts`)
- [x] Generación de assets SVG (`public/images/` + scripts PowerShell)
- [x] Shell de la app / enrutado (`App.tsx` con `BrowserRouter` + `AppShell`, Navbar, Footer, ScrollToTop)
- [x] Páginas del portfolio (Home, catálogo, detalle de obra, estudio, contacto, 404)
- [x] Rutas lazy por página (`React.lazy`) + lazy de BlueprintComparison/BlueprintViewer
- [x] Comparador "obra gris vs acabado" y visor de planos con zoom/pan
- [x] Filtros por categoría del catálogo (URL-driven: `?categoria=`)
- [x] Formulario de consulta funcional (validación y estado de éxito client-side; envío a backend pendiente)
- [ ] Tests
- [ ] CI/CD
- [ ] Contenido README del proyecto
- [ ] Primer commit / estrategia de ramas

### Mapa de rutas técnico (roadmap)
#### Fase 1 — Fundación de la app (prioridad alta) ✅
- [x] Reescribir `App.tsx`: instanciar router (`react-router-dom`), definir rutas y shell de layout.
- [x] Crear `src/pages/` con las vistas enrutadas.
- [x] Limpieza del boilerplate (App.css, react.svg, icons.svg).
- [x] `npm run dev` / `npm run build` verdes (typecheck + lint sin warnings).

#### Fase 2 — Vistas core (prioridad alta) ✅
- [x] Home: hero + proyectos destacados (`featuredProjects`).
- [x] Página de proyecto (ruta dinámica `/proyectos/:slug` vía `getProjectBySlug`): galería, comparativa before/after, blueprint, materiales, hitos.
- [x] Página "Sobre" (perfil `ArchitectProfile`).
- [x] Página de contacto + formulario (`ConsultationRequest`, presupuestos).

#### Fase 3 — Calidad y robustez (prioridad media)
- [ ] Estados de carga/error/empty en vistas asíncronas.
- [ ] Tests unitarios de lógica pura (pricing, selectores de proyectos).
- [ ] Tests de integración.
- [ ] e2e del flujo usuario (catálogo → detalle → contacto).

#### Fase 4 — Despliegue y gobernanza (prioridad media)
- [ ] README del proyecto.
- [ ] Husky + lint-staged + commitlint.
- [ ] CI/CD (validate → test → deploy estático SPA, con SPA-fallback).
- [ ] Primer commit + política de ramas.
- [ ] Configurar hosting y deep-linking SPA.

#### Futuro / Ponderado (cuando el dominio lo exija)
- [ ] Migrar data layer estático a CMS/API tipada.
- [ ] Backend para envío real del formulario de contacto.
- [ ] i18n (es/en).
- [ ] Lazy-loading por ruta (React.lazy) si el bundle lo justifica.

---

## 7. Decisiones de Arquitectura (ADR) — Log

> Registro de decisiones con trade-offs. Formato: Título / Contexto / Decisión / Consecuencias. Se agregan aquí conforme el Tech Leader las documente.

| # | Fecha | Decisión | Estado |
|---|-------|----------|--------|
| *(vacío)* | | | |

---

## 8. Convenciones y Glosario

### Convenciones generales
- Identificadores de código: **inglés** (camelCase funciones/variables, PascalCase componentes/tipos).
- Textos de UI / contenido: **español** (locale del producto).
- Fechas/números: formato locale `es` (ej. superficie con `es-ES`).
- Componentes de páginas: `src/pages/<PascalCase>.tsx`.
- Cada feature agrupa su data layer y lógica en su propio directorio bajo `src/`.

### Glosario
| Término | Significado |
|---------|-------------|
| Data layer | Capa que centraliza el contenido estático del dominio |
| Design token | Variable de estilo definida en `@theme` |
| Presentational component | Componente puro sin lógica de negocio/fetching |
| before/after | Comparativa visual "obra gris vs acabado" |
| blueprint | Plano arquitectónico comparativo |

---

## 9. Cómo Operar sobre Este Documento

- **Lectura obligatoria:** Todo agente y colaborador lo lee antes de empezar cualquier tarea.
- **Actualización:** Cada tarea que cambie arquitectura, decisiones, dependencias o roadmap DEBE reflejarse aquí por el Tech Leader.
- **Versionado:** Va commiteado con el repositorio; los cambios se hacen en PR revisada como cualquier código.
- **Sincronización con `rules.md`:** Este documento describe el QUÉ (estado/visión); `rules.md` define el CÓMO (reglas de desarrollo intransigentes).
