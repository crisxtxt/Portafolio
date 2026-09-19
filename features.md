# FEATURES.md — Inventario de Funcionalidades y Criterios de Aceptación

> **Propósito:** Documentación técnica "viva" del proyecto. Registro modular de todas las funcionalidades del sistema (módulos, componentes, servicios/lógica) con su estado actual y criterios de aceptación medibles orientados a comportamiento.
>
> **Consumidores:** QA Engineer (veredictos APROBADO/RECHAZADO), frontend-developer (criterios a cumplir), Tech Leader (validación de arquitectura/contratos), git-devops (gates de commit).
>
> **Mantenimiento:** el Tech Leader lo actualiza ante cualquier cambio de comportamiento. El skill `acceptance-criteria` (`.opencode/skills/acceptance-criteria/SKILL.md`) lo amplía de forma autogenerativa cuando detecta código o requisitos sin criterios definidos. Toda actualización con capacidad de objetivo implica commit convencional `docs:`.
>
> **Última revisión:** 2026-09-19
>
> **Jerarquía de documentos:** `rules.md` (cómo operar) → `context.md` (estado/visión/contratos) → `features.md` (qué debe cumplirse) → `.opencode/agents/*.md` (perfiles).

---

## 0. Leyenda de estados

| Estado | Significado |
|--------|-------------|
| **Planeado** | Requisito/deseo definido, sin implementación ni AC verificables aún. |
| **En desarrollo** | Implementación parcial: el flujo principal funciona pero hay partes pendientes (validación de gates sin terminar). |
| **Producción** | Implementado, integrado y verificado con los gates vigentes (`npm run lint` + `npx tsc -b` + `npm run build`); cumple sus criterios de aceptación. |

> Para cada funcionalidad, el **QA Engineer** emite veredicto contra estos AC. Un AC no cumplido = funcionalidad no declarable como Producción.

---

## 1. Matriz de inventario

| ID | Funcionalidad | Módulo (ruta) | Estado | # AC |
|----|---------------|---------------|--------|------|
| F-01 | Sistema de diseño base | `src/shared/components/` | Producción | 4 |
| F-02 | Shell de layout y navegación | `src/shared/components/layout/` | Producción | 3 |
| F-03 | Routing SPA con lazy loading | `src/App.tsx` | Producción | 3 |
| F-04 | Home / landing | `src/home/HomePage.tsx` | Producción | 3 |
| F-05 | Catálogo con filtros URL-driven | `src/projects/ProjectsPage.tsx` | Producción | 4 |
| F-06 | Detalle de proyecto | `src/projects/ProjectDetailPage.tsx` | Producción | 5 |
| F-07 | Comparador obra gris vs acabado | `src/blueprint-viewer/components/BlueprintComparison.tsx` | Producción | 3 |
| F-08 | Visor de planos (zoom/pan) | `src/blueprint-viewer/components/BlueprintViewer.tsx` | Producción | 4 |
| F-09 | Estudio / perfil del arquitecto | `src/studio/StudioPage.tsx` | Producción | 3 |
| F-10 | Estimador de presupuesto | `src/contact/components/BudgetEstimator.tsx` | Producción | 3 |
| F-11 | Formulario de consulta | `src/contact/ContactPage.tsx` | En desarrollo | 5 |
| F-12 | Pricing (lógica de negocio) | `src/contact/pricing.ts` | Producción | 3 |
| F-13 | Data layer y selectores | `src/projects/data/projects.ts`, `src/studio/data/profile.ts` | Producción | 3 |
| F-14 | Generación de assets SVG | `public/images/`, `scripts/*.ps1` | Producción | 3 |
| F-15 | Gates de calidad (build/lint) | tooling (vite/tsconfig/.oxlintrc) | Producción | 2 |
| F-16 | Sistema de tests | — | Planeado | — |
| F-17 | CI/CD | — | Planeado | — |
| F-18 | Husky + lint-staged + commitlint | — | Planeado | — |
| F-19 | Hosting + deep-linking SPA | — | Planeado | — |
| F-20 | Backend envío formulario + DTOs | — | Planeado | — |
| F-21 | Estados async (carga/error/empty) | — | Planeado | — |
| F-22 | i18n (es/en) | — | Planeado | — |

---

## 2. Funcionalidades por dominio

### F-01 — Sistema de diseño base — Producción

- **Módulo:** `src/shared/components/` (Button, Icon, Reveal, Section, PageHero, TiltCard).
- **Descripción:** primitivas UI atómicas, presentacionales, puras, sin lógica de negocio ni fetching.

**Criterios de aceptación**

1. Dado un componente del sistema de diseño, Cuando se consume en una página, Entonces renderiza sin estado interno de negocio (solo props) y respeta `@theme` (prohibido inventar colores/fuentes).
2. Dado `Button` con prop `variant` y `as`/enlace, Cuando se renderiza como link o botón, Entonces `href` es accesible (`<a>`) y cada variante aplica los tokens definidos.
3. Dado `Icon`, Cuando se solicita un icono no registrado en el registry, Entonces no rompe el render (devuelve no-op o el icono por defecto) y el tipo lo tipa como unión.
4. Dado `TiltCard`, Cuando el cursor entra a la tarjeta, Entonces el tilt 3D es suave (framer-motion) y se resetea al salir.

### F-02 — Shell de layout y navegación — Producción

- **Módulo:** `src/shared/components/layout/` (AppShell, Navbar, Footer, ScrollToTop).
- **Descripción:** orbita de la app: barra de navegación, pie, scroll-to-top y composición de página.

**Criterios de aceptación**

1. Dado cualquier ruta, Cuando la app monta, Entonces la Navbar marca como activa la ruta visitada (Home, Proyectos, Estudio, Contacto) y el Footer expone marca + navegación.
2. Dado un cambio de ruta con scroll previo no-cero, Cuando se navega, Entonces `ScrollToTop` devuelve el scroll al inicio (sin interrumpir el cambio de página).
3. Dado el viewport móvil, Cuando se abre el menú, Entonces se muestra la navegación colapsada/expandible sin desbordar el contenido principal.

### F-03 — Routing SPA con lazy loading — Producción

- **Módulo:** `src/App.tsx` (BrowserRouter + `React.lazy` por ruta).
- **Rutas:** `/`, `/proyectos`, `/proyectos/:slug`, `/estudio`, `/contacto`, `*`.

**Criterios de aceptación**

1. Dado un request de la SPA, Cuando se accede a cualquier ruta declarada, Entonces se carga el chunk de esa página vía `React.lazy` con Suspense fallback (skeleton), sin romper la navegación client-side (no recarga completa).
2. Dado `/proyectos/:slug` con slug inexistente, Cuando se resuelve el lookup, Entonces se renderiza la vista 404 (NotFoundPage).
3. Dado `/proyectos/:slug` inexistente en un deploy estático (hosting), Cuando el servidor recibe la ruta, Entonces devuelve `index.html` (SPA fallback) — ver F-19.

### F-04 — Home / landing — Producción

- **Módulo:** `src/home/HomePage.tsx`.
- **Descripción:** hero, proyectos destacados, disciplinas, servicios y CTA final.

**Criterios de aceptación**

1. Dado un visitante en `/`, Cuando la home carga, Entonces muestra hero del estudio con CTA y exactamente 3 proyectos destacados (`featuredProjects` = primeras 3 obras `construido`).
2. Dado el bloque de disciplinas (residencial/comercial/paisajismo), Cuando el usuario selecciona una, Entonces navega a `/proyectos?categoria=<categoria>` y el catálogo llega pre-filtrado.
3. Dado el CTA final, Cuando el usuario interactúa, Entonces redirige a `/contacto` (estimador + formulario).

### F-05 — Catálogo con filtros URL-driven — Producción

- **Módulo:** `src/projects/ProjectsPage.tsx` (filtros con `useSearchParams`).
- **Contenido:** 11 obras (residencial 5 · comercial 4 · paisajismo 2).

**Criterios de aceptación**

1. Dado `/proyectos`, Cuando se carga, Entonces muestra las 11 obras sin filtro y el contador de resultados coincide con la selección.
2. Dado el usuario en el catálogo, Cuando selecciona una categoría, Entonces la URL pasa a contener `?categoria=<categoria>` (única fuente de verdad) y el grid se anima mostrando solo las obras de esa categoría (residencial=5, comercial=4, paisajismo=2).
3. Dado un deep-link `/proyectos?categoria=comercial`, Cuando se carga, Entonces el tab activo es "comercial" y el grid filtra correctamente sin parpadeo ni efecto sincronizador.
4. Dada la navegación back/forward del navegador, Cuando se cambia la query string, Entonces el filtro se actualiza en el mismo render (sin setState en efecto, sin estados divergentes).

### F-06 — Detalle de proyecto — Producción

- **Módulo:** `src/projects/ProjectDetailPage.tsx` + data layer.
- **Contenido:** 11 fichas; specs, galería (g1/g2/g3), materiales, hitos, fases, arquitectos, mapa, comparativa y plano solo si lo declara el registro.

**Criterios de aceptación**

1. Dado `/proyectos/:slug` válido, Cuando se resuelve vía `getProjectBySlug`, Entonces muestra hero, specs (área, año, ubicación, presupuesto, categoría, estado, cliente) y descripción sin datos de otro proyecto.
2. Dado un proyecto con `hasBlueprintComparison = true` (P-001 a P-004 y P-010), Cuando se renderiza la ficha, Entonces aparecen el comparador y el visor de planos (lazy, con skeleton); Dado un proyecto con `false` (resto del catálogo), Entonces NO se renderizan y el layout no deja espacios vacíos.
3. Dado un proyecto con `beforeImage`/`afterImage` (P-001 a P-003 y P-010), Cuando se muestra la comparativa, Entonces las imágenes corresponden al slug (convención `-before`/`-after`).
4. Dado el footer de la ficha, Cuando el usuario navega al proyecto siguiente, Entonces se carga `next` definido por el data layer (sin dead-ends).
5. Dado el estado "en-construccion" o "conceptual" en un proyecto, Cuando se muestra la ficha, Entonces el badge/categoría refleja el estado sin inconsistencia con `projects.ts`.

### F-07 — Comparador obra gris vs acabado — Producción

- **Módulo:** `src/blueprint-viewer/components/BlueprintComparison.tsx` + `BlueprintViewerLazy`.
- **Descripción:** slider interactivo que revela la imagen "acabado" sobre la "obra gris".

**Criterios de aceptación**

1. Dado el comparador visible, Cuando el usuario arrastra el handle (pointer/mouse/touch), Entonces la posición del divisor es proporcional al arrastre y se recorta a un rango **0–100** (clamp), sin salirse del contenedor.
2. Dado el comparador, Cuando se carga, Entonces muestra etiquetas identificables ("Obra gris" / "Acabado") y ambos assets tienen `alt`/función semántica definida.
3. Dado `hasBlueprintComparison = false`, Cuando se intenta montar la feature, Entonces el componente no se instancia (el control está en el data layer, no en el view).

### F-08 — Visor de planos (blueprint) — Producción

- **Módulo:** `src/blueprint-viewer/components/BlueprintViewer.tsx`.
- **Descripción:** zoom/pan sobre plano técnico; lazy para no cargar peso en el bundle inicial.

**Criterios de aceptación**

1. Dado el blueprint, Cuando el usuario hace scroll/wheel, Entonces el zoom cambia y se recorta al rango **mínimo 1×, máximo 3×** (clamp, sin zoom negativo).
2. Dado un zoom > 1, Cuando el usuario arrastra, Entonces el plano se desplaza (pan) solo dentro de sus límites visibles; Dado zoom = 1, Entonces no hay pan colgante.
3. Dado el usuario con zoom activo, Cuando hace doble clic o usa los botones +/−/reset, Entonces el zoom se centra/togglea o vuelve a 1×/posición inicial.
4. Dado el visor en una ficha (lazy), Cuando se monta vía `Suspense`, Entonces muestra un fallback mientras carga y no bloquea el primer paint de la página.

### F-09 — Estudio / perfil del arquitecto — Producción

- **Módulo:** `src/studio/StudioPage.tsx` + `src/studio/data/profile.ts`.
- **Descripción:** filosofía, biografía, formación, reconocimientos, equipo y stats tipados.

**Criterios de aceptación**

1. Dado `/estudio`, Cuando se carga, Entonces todas las secciones (filosofía/bio/educación/reconocimientos/equipo) se pueblan desde `profile.ts` (contrato `ArchitectProfile`), sin textos hardcodeados en el componente.
2. Dado el retrato e imágenes del equipo, Cuando se renderizan, Entonces usan los assets de `public/images/` declarados en el data layer.
3. Dado un reconocimiento/equipo con año o disciplina, Cuando se muestra, Entonces el formato numérico usa locale `es` y los campos opcionales no generan contenido vacío visible.

### F-10 — Estimador de presupuesto — Producción

- **Módulo:** `src/contact/components/BudgetEstimator.tsx`.
- **Descripción:** slider de superficie + selector de categoría → rango de presupuesto estimado.

**Criterios de aceptación**

1. Dado el estimador, Cuando el usuario ajusta el slider de superficie, Entonces el valor se limita al rango **20–20 000 m²** (clamp) y el área se formatea en locale `es` (ej. `1,500 m²`).
2. Dado el usuario, Cuando cambia de categoría, Entonces el rango de presupuesto se recalcula al instante con `estimateBudget(areaM2, category)` y se muestran `{low, high}` en USD (formato `es`).
3. Dado el estimador, Cuando el usuario presiona **"Usar esta estimación en mi cotización"**, Entonces la selección (categoría + área) se transfiere al formulario vía el callback `onEstimate` (F-11 AC 4) y el resultado es consistente con `pricing.ts` (mismas unidades/múltiplos).

### F-11 — Formulario de consulta — En desarrollo

- **Módulo:** `src/contact/ContactPage.tsx` (estado + validación + éxito client-side).
- **Pendiente:** envío real a backend/F-20. El flujo actual es **simulado** (payload + éxito).

**Criterios de aceptación**

1. Dado el formulario con `name` y `email` en blanco, Cuando el usuario intenta enviar, Entonces se muestran errores de validación y NO se genera envío ni estado de éxito.
2. Dado campos requeridos válidos (name + email con formato `type=email`), Cuando el usuario envía, Entonces se muestra el estado de éxito con un folio de referencia y la confirmación de contacto en 48 h hábiles.
3. Dado el submit exitoso, Cuando el estado cambia, Entonces el formulario no persiste en ningún servicio externo (el envío es simulado hasta F-20) y no se registran datos sensibles en logs.
4. Dado el flujo desde el estimador, Cuando un presupuesto es calculado, Entonces ese valor llega al formulario (área/categoría pre-completadas + `type=cotizacion`, scroll suave al form) para reducir fricción.
5. Dado el panel de contacto rápido, Cuando el usuario elige WhatsApp, Entonces se abre `wa.me/584121234567` con mensaje precargado de cotización y el enlace se marca como `external` (`target="_blank" rel="noopener"`).

### F-12 — Pricing (lógica de negocio) — Producción

- **Módulo:** `src/contact/pricing.ts`.
- **Fuente de verdad por m² (USD):** residencial 900–1600 · comercial 1100–1900 · paisajismo 120–350.

**Criterios de aceptación (spec técnica verificable)**

1. Dado `estimateBudget(areaM2, category)`, Cuando `category` es válida, Entonces retorna `{ low: round(areaM2 * low), high: round(areaM2 * high) }` con los multiplicadores de `unitPrices` (`estimateBudget(500, 'residencial')` → `{ low: 450000, high: 800000 }`).
2. Dado `estimateBudget` con categoría desconocida, Cuando se invoca, Entonces usa fallback `residencial` (nunca lanza) y el resultado es determinista.
3. Dado `formatArea(areaM2)`, Cuando `areaM2` es un número ≥ 0, Entonces retorna `${areaM2.toLocaleString('es')} m²` sin decimales espurios (`formatArea(1500)` → `1500 m²`) y rechaza valores negativos o NaN en la frontera (F-21).

### F-13 — Data layer y selectores — Producción

- **Módulo:** `src/projects/data/projects.ts`, `src/studio/data/profile.ts`.
- **Contenido:** 11 proyectos tipados (5 comparativas, 4 before/after, 5 planos) + helpers.

**Criterios de aceptación**

1. Dado el data layer, Cuando se compila, Entonces cada registro cumple el contrato `Project`/`ArchitectProfile` de `portfolio.ts` sin `any` ni campos sueltos (rule `rules.md` §2, bloqueante).
2. Dado `getProjectBySlug(slug)`, Cuando `slug` existe, Entonces devuelve el proyecto exacto; Cuando no existe, Entonces devuelve `undefined` (la página gestiona el 404, F-03).
3. Dado `featuredProjects`, Cuando se consume, Entonces devuelve exactamente 3 obras con `status === 'construido'` en orden de catálogo (casa-luz, loft-montanez, villa-pazo) al momento de esta revisión.

### F-14 — Generación de assets SVG — Producción

- **Módulo:** `public/images/` (65 assets) + `scripts/generate-images.ps1`, `scripts/generate-galleries.ps1`.
- **Descripción:** assets procedimentales deterministas; al regenerar, las imágenes no cambian salvo alteración del script.

**Criterios de aceptación**

1. Dado un script de generación, Cuando se ejecuta, Entonces produce los assets referenciados por el data layer (slug exacto, `-before/-after/-blueprint`, `-g1/g2/g3`) sin romper convención de nombres.
2. Dado un asset SVG, Cuando se regenera con el mismo script, Entonces el diff es determinista (misma semilla/inputs → mismos archivos).
3. Dado un asset con acentos/ñ en texto (`generate-galleries`), Cuando se escribe, Entonces el archivo se guarda en UTF-8 con BOM (requisito de los scripts PowerShell en Windows).

### F-15 — Gates de calidad (build/lint) — Producción

- **Módulo:** `vite.config.ts`, `tsconfig*.json`, `.oxlintrc.json`, `package.json`.
- **Descripción:** cualquier cambio debe pasar los gates antes de commitear (git-devops).

**Criterios de aceptación**

1. Dado `npm run build`, Cuando se ejecuta, Entonces termina en 0 (typecheck `tsc -b` + bundle Vite), sin errores y sin salida de `any`/`@ts-ignore`.
2. Dado `npm run lint`, Cuando se ejecuta, Entonces oxlint pasa sin errores ni warnings (0 warnings).

### F-16 — Sistema de tests — Planeado

- **Alcance:** unitarios de lógica pura (F-12 pricing, F-13 selectores, validación DTO del formulario), integración de rutas/layout, e2e del flujo catálogo → detalle → contacto.
- **Criterios de aceptación (objetivo, pendientes de implementar):**
  1. Dado un test unitario de `estimateBudget`/`formatArea`/selectores, Cuando se ejecuta, Entonces cubre los casos de la F-12/F-13 (límites, fallback, borde) con cobertura mínima acordada.
  2. Dado un test de integración, Cuando se navega por las 6 rutas, Entonces no hay 404 no esperados y el filtro URL-driven cambia el grid (F-05).
  3. Dado el e2e del flujo de conversión, Cuando el usuario va catálogo → detalle → contacto, Entonces el formulario llega a estado de éxito simulado (F-11).

### F-17 — CI/CD — Planeado

- **Alcance:** pipeline validate → test → deploy estático con SPA-fallback.
- **Criterios de aceptación (objetivo):**
  1. Dado un push a `master`, Cuando el pipeline corre, Entonces ejecuta lint + build + tests y solo despliega si los tres son verdes.
  2. Dado el deploy estático, Cuando se accede a `/proyectos/:slug` directo, Entonces sirve `index.html` (deep-linking funcional, F-03/F-19).

### F-18 — Husky + lint-staged + commitlint — Planeado

- **Alcance:** validación de Conventional Commits y pre-commit.
- **Criterios de aceptación (objetivo):** Dado un commit, Cuando el hook corre, Entonces verifica mensaje `<tipo>(<scope>): <desc>` y solo presenta los archivos staged tras pasar lint.

### F-19 — Hosting + deep-linking SPA — Planeado

- **Criterios de aceptación (objetivo):** Dado el sitio en producción, Cuando un usuario comparte una URL interna (`/proyectos/casa-luz`), Entonces el hosting responde con `index.html` y la app resuelve la ruta (sin 404 de servidor); HTTPS activo y assets cacheables con hash estable (manualChunks).

### F-20 — Backend envío formulario + DTOs — Planeado

- **Criterios de aceptación (objetivo):**
  1. Dado `ConsultationRequest`, Cuando se envía al backend, Entonces se valida con DTO estricto en la frontera (tipos, rangos, email, fechas coherentes; `rules.md` §3) antes de entrar al dominio.
  2. Dado el envío, Cuando el servidor responde éxito/error, Entonces la UI traduce el estado tipado a mensajes legibles y no se registran datos sensibles (sin logs de email/teléfono/mensaje).

### F-21 — Estados async (carga/error/empty) — Planeado

- **Criterios de aceptación (objetivo):** Dado contenido remoto (migración a CMS/API), Cuando la vista está cargando, en error o sin datos, Entonces muestra estados idle/loading/success/error/empty definidos y consistentes en todas las vistas (hoy SPA 100 % síncrono, sin fetching).

### F-22 — i18n (es/en) — Planeado

- **Criterios de aceptación (objetivo):** Dado el selector de idioma, Cuando cambia a `en`, Entonces todos los textos de UI se traducen manteniendo contenido de datos (proyectos, pricing) en su forma canónica y el locale numérico/fechas es coherente.

---

## 3. Notas del autogenerador (protocolo activo)

- Si un nuevo módulo/componente/servicio entra al código sin criterios de aceptación, el skill `acceptance-criteria` debe proponerlos en esta matriz (nuevo bloque `F-XX`) con estado inicial **En desarrollo** y moverlo a **Producción** solo cuando sus AC se verifiquen con los gates.
- Si una funcionalidad cambia de comportamiento, sus AC se actualizan **en el mismo ciclo** del cambio (nunca después), manteniendo "viva" esta documentación.
- Al añadir una F-XX: actualizar la matriz §1 y el entramado de dependencias en `context.md` si afecta a contratos/roadmap.