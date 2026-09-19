# CONTEXT.md — Estado y Visión Técnica del Proyecto

> **Propósito:** Centralizar el estado, visión técnica, arquitectura y decisiones del proyecto para que cualquier agente o colaborador (humano o IA) pueda operar sobre el repositorio con el contexto completo sin supuestos.
>
> **Mantenimiento:** Lo actualiza el Tech Leader ante cualquier cambio de arquitectura, contrato, dependencia crítica o roadmap. Toda tarea que amplíe este documento requiere commit convencional `docs:`.
>
> **Última revisión:** 2026-09-19

---

## 1. Visión General del Producto

### Qué es
Portafolio web SPA de un estudio de arquitectura — **"Stoico · Estudio de Arquitectura"** (Isla de Margarita, Venezuela) — que muestra obras (fichas técnicas, planos interactivos, comparativas obra gris vs acabado), el perfil del director y permite solicitar consultas y presupuestos estimados por metro cuadrado.

### Identidad de marca
- **Nombre:** Stoico. **Subtítulo:** Estudio de Arquitectura.
- **Territorio:** Isla de Margarita (La Asunción · Pampatar · Playa El Ángel).
- **Estética:** masculina, sobria y luminosa; paleta "**gris piedra + arena**" con bronce como acento; tipografía display **Archivo** (título) + **Inter** (cuerpo).
- **Posicionamiento:** diseño de baja voz, materiales honestos y arquitectura que resiste el tiempo; el estudio reutiliza la identidad previa (Cristina Vargas) como antecedente de obra internacional (ADR-007).

### Objetivos de negocio
- Posicionar el portafolio del arquitecto y generar leads de consultoría y cotización de obra.
- Diferenciar por calidad editorial del contenido y experiencia de usuario (animaciones cinematográficas, interactividad de planos, transparencia de precios).
- Convertir visitantes en solicitudes de contacto con fricción mínima (estimador en línea + formulario).

### Público objetivo
- Clientes potenciales de arquitectura residencial, comercial y paisajismo (proyectos de medio a alto presupuesto).
- Inversores y desarrolladores que buscan estudios con experiencia en rehabilitación y reutilización adaptativa.
- Otros profesionales (constructores, ingenieros) en busca de colaboración.

### Mercado / Alcance
- Mercado local de la Isla de Margarita + obra internacional (la identidad previa conserva proyecto en México como antecedente, ADR-007).
- Proyectos locales de tamaño medio-alto: vivienda costera 150–480 m², desarrollos comerciales 180–12 440 m², paisajismo hasta 4 200 m².

---

## 2. Stack Tecnológico Base

| Capa | Tecnología | Versión | Notas |
|------|-----------|---------|-------|
| **Lenguaje** | TypeScript | ~6.0.2 | Strict, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noEmit` |
| **Frontend** | React | 19.2.8 | Function components + StrictMode |
| **Build** | Vite | 8.2.2 | Plugin React (Oxc) + Tailwind plugin; code-splitting manualChunks |
| **Estilos** | Tailwind CSS | 4.3.3 | Config CSS-first vía `@theme` en `src/index.css` |
| **Routing** | react-router-dom | 7.18.3 | SPA client-side routing, rutas lazy via React.lazy |
| **Animación** | framer-motion | 13.2.0 | Transiciones de página, scroll-reveal, tilt 3D, leyout animations |
| **Linting** | oxlint | ^1.79.0 | Plugins react + typescript + oxc (`.oxlintrc.json`) |
| **Backend** | N/A | — | Proyecto actualmente es solo frontend/SPA |
| **Base de Datos** | N/A | — | Datos estáticos en el data layer (`projects/data/projects.ts`, `studio/data/profile.ts`, `contact/pricing.ts`) |
| **Infraestructura** | N/A | — | Sin CI/CD ni hosting configurado aún |

### Fuente de verdad de versiones
`package.json` es la fuente autoritativa de dependencias exactas. **Nueva dependencia = ADR + coordinación con Tech Leader.**

### Entorno local
- **Node:** v24.x (npm 11.x)
- **Comandos:**

| Comando | Función | Departamento |
|---------|---------|--------------|
| `npm install` | Instalar dependencias | Todas |
| `npm run dev` | Servidor de desarrollo Vite | Frontend |
| `npm run build` | `tsc -b && vite build` (typecheck + bundle) | Devops (gate) |
| `npm run lint` | oxlint | QA/Devops (gate) |
| `npm run preview` | Previsualizar build de producción | QA |

### Gestión de versiones (Git) — política vigente
- **Remote:** `origin` → `https://github.com/crisxtxt/Portafolio.git`.
- **Rama por defecto:** `master`.
- **Identidad de commit del repo:** `crisxtxt <crisxtxt@users.noreply.github.com>`.
- **Modelo de trabajo actual:** repo de un solo desarrollador → trabajo directo sobre `master`. En repos colaborativos se usaría Trunk-based con feature branches (`feat/<scope>-<slug>`).
- **Commit & Push automático:** el agente **git-devops** está configurado para commitear (`Conventional Commits`) y hacer `push` a `origin` al cierre de cada funcionalidad, tras pasar `npm run lint` + `npx tsc -b`.
- **Ignorados obligatorios:** `.opencode/`, `node_modules/`, `dist/`, `.env*`, `*.local`.
- Sin CI/CD, husky, lint-staged ni commitlint configurados todavía (responsabilidad de git-devops).

---

## 3. Mapa de Dominios y Arquitectura del Sistema

### Arquitectura de alto nivel
**SPA de página única (frontend-only)** organizada por **Screaming Architecture**: la estructura de carpetas expresa el *dominio* (proyectos, planos, estudio, contacto) y no abstracciones técnicas genéricas.

```
src/
├── main.tsx                 → Punto de entrada (StrictMode + App)
├── App.tsx                  → Router (BrowserRouter) + rutas lazy por página
├── index.css                → Design tokens (Tailwind @theme)
├── home/                    → Feature: landing / dashboard del portafolio
│   └── HomePage.tsx         → Hero, destacados, disciplinas, servicios, CTA
├── projects/                → Feature: catálogo de proyectos
│   ├── data/                → Data layer (projects.ts, 11 registros + selectores)
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
│   ├── components/          → BudgetEstimator (slider de superficie + pasarela onEstimate)
│   └── ContactPage.tsx      → Formulario ConsultationRequest + WhatsApp + agendamiento
├── pages/                   → NotFoundPage (404)
└── shared/                  → Núcleo reutilizable (design system + dominio)
    ├── components/          → Button, Icon, Reveal, Section, PageHero, TiltCard
    │   └── layout/          → AppShell, Navbar, Footer, ScrollToTop
    └── types/               → Contratos de dominio (portfolio.ts)

public/
├── images/                  → 65 assets SVG procedimentales (escenas, galerías, planos, retratos, estudio)
scripts/                     → Generadores PowerShell de assets (generate-images.ps1, generate-galleries.ps1)
.opencode/
├── agents/                  → Perfiles de agentes (frontend-developer, git-devops, qa-engineer, tech-leader)
context.md                   → Este documento
rules.md                     → Reglas de desarrollo vinculantes
```

### Rutas del SPA (`src/App.tsx`)
| Ruta | Página | Lazy |
|------|--------|------|
| `/` | `home/HomePage` | ✅ |
| `/proyectos` (+ `?categoria=`) | `projects/ProjectsPage` | ✅ |
| `/proyectos/:slug` | `projects/ProjectDetailPage` | ✅ |
| `/estudio` | `studio/StudioPage` | ✅ |
| `/contacto` | `contact/ContactPage` | ✅ |
| `*` | `pages/NotFoundPage` | ✅ |

### Capas y sus reglas
| Capa | Contenido | Regla de dependencia |
|------|-----------|----------------------|
| **Domain / Types** | `shared/types/portfolio.ts` | Sin dependencias; define contratos |
| **Data layer** | `projects/data/projects.ts`, `studio/data/profile.ts`, `contact/pricing.ts` | Depende solo del dominio |
| **Presentation** | `shared/components/*`, páginas por feature | Consume data layer + dominio; nunca contiene datos de negocio |
| **Infrastructure** | `vite.config.ts`, tsconfig, tooling | Configuración de build/entorno |

### Principios de arquitectura
- **Data-driven:** contenido centralizado en el data layer; los componentes son presentacionales.
- **Design tokens:** todo el estilo deriva de `@theme` en `index.css`. Prohibido inventar colores en componentes.
- **Componentes desacoplados:** `shared/components` son puros, sin lógica de negocio ni fetching interno.
- **SOLID / DRY / KISS / YAGNI:** cualquier abstracción se justifica por uso real (2+ usos) o contrato externo.
- **Alta perdurabilidad (`noEmit`):** el TS se usa solo para typecheck; Vite (rolldown) transpila vía plugins.

### Design tokens (paleta vigente en `src/index.css`)
| Token | Valor | Uso típico |
|-------|-------|-----------|
| `--color-ink` | `#2b2926` | Texto principal / fondo oscuro de acento |
| `--color-ink-soft` | `#6b665e` | Texto secundario |
| `--color-paper` | `#faf8f3` | Fondo claro / tarjetas |
| `--color-paper-deep` | `#f2efe7` | Fondo de sección / tarjetas |
| `--color-line` | `#e2dcd0` | Bordes / separadores |
| `--color-clay` | `#9f7d3f` | Bronce / CTA / acento de marca |
| `--color-clay-dark` | `#7c6130` | Hover de marca |
| `--color-sand` | `#d8c6a2` | Acentos arena / señales |
| `--color-stone` | `#87817a` | Acentos neutros gris piedra |
| `--color-sage` | `#7a8b6f` | Acentos paisaje / éxito |
| `--color-concrete` | `#6b7480` | Acentos neutros |
| `--shadow-soft` / `--shadow-card` | — | Sombras en `rgba(43,41,38,…)` |
| `--font-display` | Archivo | Titulares (display, sobrio) |
| `--font-sans` | Inter | Cuerpo de texto |

---

## 4. Modelado de Datos y Contratos Clave

### Fuente autoritativa
`src/shared/types/portfolio.ts` — **única** fuente de contratos de dominio. Está prohibido redefinir contratos inline en componentes.

### Tipos base
```ts
type Id = string
type Category = 'residencial' | 'comercial' | 'paisajismo'
type ProjectStatus = 'construido' | 'en-construccion' | 'conceptual'

interface GeoPoint { lat: number; lng: number }
```

### `MaterialSpec`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `Id` | Identificador |
| `name` | `string` | Nombre del material |
| `surface` | `string` | Superficie/área donde se aplica |
| `finish` | `string` | Acabado |
| `sustainability` | `string` | Criterio de sustentabilidad |

### `Milestone`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `Id` | Identificador |
| `date` | `string` | Fecha (texto, ej. "Mar 2023") |
| `title` | `string` | Título del hito |
| `description` | `string` | Descripción |

### `ProjectPhase`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `Id` | Identificador |
| `date` | `string` | Periodo (ej. "2023") |
| `title` | `string` | Nombre de la fase |
| `status` | `'completada' \| 'en-curso' \| 'pendiente'` | Estado |

### `Project` — Entidad central
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `Id` | ID de negocio (ej. `P-001`) |
| `slug` | `string` | ID de ruta (deep-linking `/proyectos/:slug`) |
| `title` | `string` | Título del proyecto |
| `location` | `string` | Ubicación (texto) |
| `year` | `number` | Año |
| `category` | `Category` | Categoría |
| `status` | `ProjectStatus` | Estado de construcción |
| `areaM2` | `number` | Superficie m² |
| `budget` | `string` | Rango de presupuesto (texto) |
| `client` | `string` | Cliente |
| `summary` | `string` | Resumen (hero/cards) |
| `description` | `string` | Descripción larga (párrafos separados por `\n`) |
| `heroImage` | `string` | URL de imagen hero |
| `gallery` | `string[]` | Galería (variantes g1/g2/g3) |
| `beforeImage` / `afterImage` | `string` (opcional) | Comparativa obra gris / acabado |
| `hasBlueprintComparison` | `boolean` | Controla la renderización del slider |
| `blueprintImage` | `string` (opcional) | Imagen de plano técnico |
| `features` | `string[]` | Características clave |
| `materials` | `MaterialSpec[]` | Especificaciones de materiales |
| `milestones` | `Milestone[]` | Hitos de obra |
| `phases` | `ProjectPhase[]` | Fases con estado |
| `architects` | `string[]` | Arquitectos responsables |
| `coordinate` | `GeoPoint` | Coordenadas `{ lat, lng }` (mapas) |

### `Recognition`
`id: Id`, `title: string`, `issuer: string`, `year: number`, `description: string`

### `TeamMember`
`id: Id`, `name: string`, `role: string`, `discipline: string`, `bio: string`, `image: string`

### `ArchitectProfile`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `Id` | ID (ej. `ARQ-001`) |
| `fullName` | `string` | Nombre |
| `title` | `string` | Rol |
| `bio` / `philosophy` | `string` | Textos biográficos |
| `portrait` | `string` | URL de retrato |
| `yearsExperience` | `number` | Años de experiencia |
| `education` | `string[]` | Formación académica |
| `recognitions` | `Recognition[]` | Reconocimientos |
| `team` | `TeamMember[]` | Equipo |

### `ConsultationRequest` — forma de contacto
```ts
type ConsultationType = 'cotizacion' | 'consultoria' | 'seguimiento-obra'
```
Campos: `type`, `name`, `email`, `phone`, `category: Category`, `areaM2: number`, `location`, `budgetRange`, `message`, `preferredDate`, `preferredTime`. Envío client-side (payload + éxito simulado); **backend pendiente** (el formulario no envía aún a ningún servicio real). Pasarela de baja fricción: el `BudgetEstimator` precarga categoría/área/`type=cotizacion` en el formulario vía su callback `onEstimate` (scroll suave al form); también hay acceso directo por WhatsApp (`wa.me/584121234567`).

### `UnitPrice` y pricing (`src/contact/pricing.ts`)
- `unitPrices`: residencial $900–1600 USD/m² · comercial $1100–1900 USD/m² · paisajismo $120–350 USD/m².
- `budgetRanges`: `$100k–$250k`, `$250k–$500k`, `$500k–$1M`, `$1M–$2M`, `Más de $2M`.
- Helpers puros (testeables): `formatArea(areaM2)` y `estimateBudget(areaM2, category)` → `{ low, high }` (USD).

### Catálogo de proyectos (`src/projects/data/projects.ts`)
11 proyectos tipados:
| ID | Slug | Título | Categoría | Estado |
|----|------|--------|-----------|--------|
| P-001 | `casa-luz` | Casa Luz | residencial | construido |
| P-002 | `loft-montanez` | Loft Montañez | comercial | construido |
| P-003 | `torre-aurora` | Torre Aurora | comercial | en-construccion |
| P-004 | `villa-pazo` | Villa Pazo | residencial | construido |
| P-005 | `jardin-del-lago` | Jardín del Lago | paisajismo | construido |
| P-006 | `casa-del-bosque` | Casa del Bosque | residencial | construido |
| P-007 | `rehab-loft-corner` | REHAB Loft Corner | comercial | en-construccion |
| P-008 | `refugio-del-mar` | Refugio del Mar | residencial | conceptual |
| P-009 | `casa-playa-angel` | Casa Playa El Ángel | residencial | construido |
| P-010 | `malecon-pampatar` | Malecón de Pampatar | paisajismo | construido |
| P-011 | `paseo-la-asuncion` | Paseo La Asunción | comercial | en-construccion |

Helpers disponibles:
- `projects` — array completo
- `getProjectBySlug(slug)` — lookup para rutas dinámicas
- `featuredProjects` — filtro `status === 'construido'`, top 3 (para home)

### Convenciones de datos
- Nombres de imagen = slug del proyecto (`/images/casa-luz.svg`, `casa-luz-before.svg`, `casa-luz-blueprint.svg`, galerías `casa-luz-g1/g2/g3.svg`).
- Todo dato estático vive en el data layer, nunca en componentes.
- Moneda: USD; formato de área/localización en locale `es`.
- Imágenes: distinctas por proyecto (foto), comparativas (`-before/-after`) y planos (`-blueprint`) solo en proyectos que lo declaran.

---

## 5. Dependencias Críticas y Servicios de Terceros

### Dependencias de producción
| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `react` / `react-dom` | 19.2.8 | UI |
| `react-router-dom` | 7.18.3 | Routing SPA |
| `framer-motion` | 13.2.0 | Animaciones |
| `tailwindcss` | 4.3.3 | Styling (config CSS-first) |
| `@tailwindcss/vite` | 4.3.3 | Plugin Tailwind para Vite |

### Dependencias de desarrollo
| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `vite` | 8.2.2 | Build/dev server |
| `typescript` | ~6.0.2 | Typecheck (`tsc -b`) |
| `@vitejs/plugin-react` | 6.1.0 | React refresh (Oxc) |
| `oxlint` | ^1.79.0 | Linter |
| `@types/node`, `@types/react`, `@types/react-dom` | — | Tipos |

### Servicios de terceros (externos)
| Servicio | Uso | Estado |
|----------|-----|--------|
| **Google Fonts** | Archivo + Inter (`index.html`) | Activo (CDN) |
| **GitHub** | Repositorio remoto `crisxtxt/Portafolio` | Activo |
| Hosting | — | Pendiente |
| Backend / API | — | Pendiente |
| Form backend | Envío real del formulario de contacto | Pendiente |

> **Nota de seguridad:** No existe `.env`. Si se añade envío de formulario o servicios externos con secretos, registrar aquí y garantizar `.env*.local` en `.gitignore`. Prohibido commite rear secretos.

---

## 6. Estado Actual del Desarrollo y Mapa de Rutas Técnico

### Estado actual (checklist)
- [x] Inicialización del proyecto (Vite + React + TS + Tailwind v4)
- [x] Design tokens / sistema de estilos (`src/index.css`)
- [x] Sistema de diseño base (`shared/components`: Button, Icon, Reveal, Section, PageHero, TiltCard)
- [x] Contratos de dominio (`shared/types/portfolio.ts`)
- [x] Data layer de proyectos (11 registros + selectores) y perfil del estudio
- [x] Lógica de presupuestos (`contact/pricing.ts`)
- [x] Pasarela de baja fricción `BudgetEstimator → onEstimate → formulario` (prefill) + contacto por WhatsApp
- [x] Generación de assets SVG (`public/images/` = 65 assets + scripts PowerShell)
- [x] Shell de la app / enrutado (`App.tsx`, AppShell, Navbar, Footer, ScrollToTop)
- [x] Páginas del portfolio (Home, catálogo, detalle de obra, estudio, contacto, 404)
- [x] Rutas lazy por página (`React.lazy`) + lazy de BlueprintComparison/BlueprintViewer
- [x] Comparador "obra gris vs acabado" y visor de planos con zoom/pan
- [x] Filtros por categoría del catálogo (URL-driven: `?categoria=`)
- [x] Formulario de consulta funcional (validación y estado de éxito client-side; envío a backend pendiente)
- [x] README del proyecto
- [x] Primer commit + push a `origin/master` (`crisxtxt/Portafolio`)
- [ ] Tests (unitarios/integración/e2e)
- [ ] CI/CD (validate → test → deploy estático SPA)
- [ ] Husky + lint-staged + commitlint
- [ ] Hosting y deep-linking SPA en producción
- [ ] Backend para envío real del formulario

### Mapa de rutas técnico (roadmap)
#### Fase 1 — Fundación de la app ✅
- [x] Router (`react-router-dom`), shell de layout y rutas lazy.
- [x] Limpieza del boilerplate (App.css, react.svg, icons.svg).
- [x] `npm run dev` / `npm run build` verdes (typecheck + lint sin warnings).

#### Fase 2 — Vistas core ✅
- [x] Home: hero + proyectos destacados (`featuredProjects`).
- [x] Página de proyecto (`/proyectos/:slug` vía `getProjectBySlug`): galería, comparativa before/after, blueprint, materiales, hitos.
- [x] Página "Estudio" (perfil `ArchitectProfile`).
- [x] Página de contacto + formulario (`ConsultationRequest`, presupuestos).

#### Fase 3 — Calidad y robustez (prioridad media)
- [ ] Estados de carga/error/empty en vistas asíncronas (hoy SPA es 100% sincrono; aplicará al migrar a API).
- [ ] Tests unitarios de lógica pura (pricing, selectores de proyectos, validación de `ConsultationRequest` con DTO).
- [ ] Tests de integración de rutas y layout.
- [ ] e2e del flujo usuario (catálogo → detalle → contacto).

#### Fase 4 — Despliegue y gobernanza (prioridad media)
- [ ] Husky + lint-staged + commitlint.
- [ ] CI/CD (validate → test → deploy estático SPA, con SPA-fallback).
- [ ] Configurar hosting y deep-linking SPA.
- [ ] Modelo de errores tipado centralizado (regla `rules.md` §3).

#### Futuro / Ponderado (cuando el dominio lo exija)
- [ ] Migrar data layer estático a CMS/API tipada (misma contratos de dominio, `<img>` debe adaptarse para imágenes remotas y `lazy`/responsive).
- [ ] Backend para envío real del formulario + DTOs de validación estrictos.
- [ ] i18n (es/en).
- [ ] Añadir modelo de errores tipado y estados de carga si se introduce fetching.

---

## 7. Decisiones de Arquitectura (ADR) — Log

> Formato: **Título / Contexto / Decisión / Consecuencias.**

| # | Fecha | Decisión | Estado |
|---|-------|----------|--------|
| ADR-001 | 2026-09-05 | **Screaming Architecture por dominios** — Contexto: se exige que la estructura exprese el negocio. Decisión: `src/projects|blueprint-viewer|studio|contact|home` en lugar de `components/|hooks/|pages/` genéricos; `shared/` solo para reutilizable transversal. Consecuencias: navegación por feature más evidente; el código transversal (UI atómica) sigue en `shared/`. | Vigente |
| ADR-002 | 2026-09-05 | **Tailwind CSS v4 con config CSS-first** — Decisión: design tokens en `@theme` dentro de `src/index.css` (sin `tailwind.config.js`), paleta restringida a 9 colores. Consecuencias: estilos declarativos, prohibido inventar colores; la paleta se amplía en `@theme`, no en componentes. | Vigente |
| ADR-003 | 2026-09-05 | **Code-splitting por ruta + manualChunks** — Decisión: páginas y visualizadores pesados (`BlueprintComparison`, `BlueprintViewer`) vía `React.lazy`; `manualChunks` agrupa `framer-motion`, `react-router`, `react-vendor`. Consecuencias: carga inicial menor; el viewport propio de detalle muestra skeleton. | Vigente |
| ADR-004 | 2026-09-05 | **Filtros de catálogo URL-driven** — Decisión: el estado del filtro vive en `?categoria=` (fuente de verdad), no en estado local, para deep-linking y compartir vistas. Consecuencias: sin efecto sincronizador (sin setState en effect); back/forward del navegador funciona. | Vigente |
| ADR-005 | 2026-09-05 | **SPA con data layer estático (único frontend)** — Decisión: sin backend/DB; contenido tipado en data layer. Consecuencias: cero operaciones server; el paso a API/CMS debe preservar los contratos de `portfolio.ts` (DIP). | Vigente |
| ADR-006 | 2026-09-05 | **Repo personal single-developer: trabajo directo sobre `master`** — Decisión: el git-devops commitea y hace push automático por funcionalidad a `origin/master`; sin PR obligatorios en este repo. Consecuencias: historial lineal simple; si el repo se vuelve colaborativo, se adopta trunk-based + feature branches. | Vigente |
| ADR-007 | 2026-09-19 | **Rebranding "Stoico · Estudio de Arquitectura" (Isla de Margarita)** — Contexto: se reposiciona el portafolio en el mercado local de Nueva Esparta con estética masculina, sobria y luminosa. Decisión: paleta "gris piedra + arena" (sustituye el óxido previo; `clay` pasa a bronce `#9f7d3f`, se añaden `sand`/`stone`), tipografía display **Archivo**; director nuevo `Segundo Suarez` (18 años); 3 proyectos locales de ejemplo (P-009 a P-011, incluido Malecón de Pampatar con comparativa/plano); superficies a tema claro con `Reveal once:false` (animación al bajar y subir); pasarela estimador→formulario + WhatsApp. El legado internacional (México/CDMX, identidad Cristina Vargas) se conserva en el catálogo P-001 a P-008 como antecedente de obra exterior. Consecuencias: reescritura parcial de `profile.ts`, `Navbar`/`Footer`/`HomePage` y revisión del tema claro en `ProjectDetailPage`/`ContactPage`/`BudgetEstimator`; cambios de contenido en `context.md`/`features.md` (docs:) + nuevo retrato y escenas procedimentales en `public/images/` (65 assets). | Vigente |

---

## 8. Convenciones y Glosario

### Convenciones generales
- Identificadores de código: **inglés** (camelCase funciones/variables, PascalCase componentes/tipos, `kebab-case` slugs).
- Textos de UI / contenido: **español** (locale del producto `es`).
- Fechas/números: formato locale `es` (ej. superficie con `toLocaleString('es')`).
- Componentes de páginas: `<PascalCase>.tsx` dentro de su feature (`src/<feature>/<PascalCase>.tsx`).
- Cada feature agrupa su data layer (`data/`), lógica (`pricing.ts`) y presentación en su directorio.
- Comunicación del equipo de agentes: español; código e identif icadores en inglés.

### Glosario
| Término | Significado |
|---------|-------------|
| Data layer | Capa que centraliza el contenido estático del dominio (proyectos, perfil, pricing) |
| Design token | Variable de estilo definida en `@theme` (paleta + tipografías) |
| Presentational component | Componente puro sin lógica de negocio/fetching |
| before/after | Comparativa visual "obra gris vs acabado" (slider interactivo) |
| blueprint | Plano arquitectónico con viewer de zoom/pan |
| Screaming Architecture | Organización de carpetas por dominio de negocio, no por tipo técnico |
| URL-driven filter | Filtro cuyo estado vive en la query string (`?categoria=`) |
| manualChunks | Código de Vite/Rolldown para agrupar dependencias comunes en chunks estables |

---

## 9. Cómo Operar sobre Este Documento

- **Lectura obligatoria:** el **Tech Leader** y todo agente lo leen antes de empezar cualquier tarea, junto con `rules.md` (el QUÉ está aquí; el CÓMO está en `rules.md`) y `features.md` (el QUÉ DEBE CUMPLIRSE: inventario de funcionalidades y criterios de aceptación).
- **Jerarquía de documentos:**
  1. `rules.md` — reglas intransigentes (cómo operar).
  2. `context.md` — estado/visión/contratos (este documento).
  3. `features.md` — inventario por funcionalidad (ID F-XX) + criterios de aceptación (Dado/Cuando/Entonces y specs técnicas); documentación "viva" mantenida por el skill `acceptance-criteria`.
  4. `.opencode/agents/*.md` — perfiles y responsabilidades de cada agente.
  5. `README.md` — presentación del repositorio para audiencia externa.
- **Skill autogenerativo (`acceptance-criteria`):** ante código nuevo o requisitos sin criterios de aceptación (o documentación incompleta), el agente activa `.opencode/skills/acceptance-criteria/SKILL.md` (Protocolo de Extensión Dinámica): infiere y propone AC basados en la lógica del código, actualiza `features.md` en tiempo real y refleja en `context.md` cualquier impacto de arquitectura/contratos/roadmap.
- **Actualización:** cada tarea que cambie arquitectura, contratos, dependencias, git/pipeline o roadmap DEBE reflejarse aquí por el Tech Leader con commit `docs:`.
- **ADR:** toda decisión con trade-off se registra en la tabla de la sección 7 antes de implementarse.
- **Versionado:** este documento viaja commiteado con el repositorio; los cambios se hacen en PR revisada (o en directo sobre `master` en este repo personal, conforme ADR-006).