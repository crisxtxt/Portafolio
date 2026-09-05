# RULES.md — Reglas de Desarrollo (Vinculantes)

> **Estas reglas son intransigentes y aplican a todos los colaboradores y agentes del proyecto, humanos y de IA. Su incumplimiento invalida una feature y debe corregirse antes de mergear.**
>
> El **QA Engineer** es el adversario que las aplica. El **Tech Leader** es la autoridad final en interpretación.
>
> Referencia de contexto: leer siempre junto a `context.md` (visión técnica del proyecto) y `AGENTS.md`/`.opencode/` (perfil de cada agente).

---

## 0. Fuente de Autoridad y Estructura de Severidad

Los incumplimientos se clasifican y bloquean así:

| Severidad | Efecto |
|-----------|--------|
| **BLOQUEANTE** | Invalida el merge. La feature no puede pasar a producción. Incumplimiento de seguridad, tipado débil en contratos, datos hardcodeados, fallo de criterios de aceptación. |
| **MAYOR** | Debe corregirse en la misma iteración antes del merge final. Deuda técnica que afecta mantenibilidad/rendimiento. |
| **MENOR** | Puede diferirse documentado, pero no debe acumularse sin seguimiento. |

---

## 1. Clean Code & Arquitectura

### PRINCIPIO — SOLID, DRY, KISS
- **S (SRP):** Cada componente, hook, función y módulo tiene **una única responsabilidad**. Si una función hace dos cosas, se divide.
- **O (OCP):** El código se extiende por composición/customización, no modificando el comportamiento existente. Preferir props/inyección sobre condicionales internos que se ramifican por tipo.
- **L (LSP):** Los componentes polimórficos (ej. `Button` que renderiza link o botón) deben ser sustitutos coherentes del tipo base sin romper contrato.
- **I (ISP):** No obligar a un componente a recibir props que no usa. Interfaces de dominio ajustadas al consumidor.
- **D (DIP):** Depender de abstracciones (contratos de dominio), no de implementaciones concretas dentro de componentes presentacionales.
- **DRY:** Prohibida la duplicación de lógica. Cualquier fragmento repetido se extrae a utilidad/hook/componente. Toda extracción debe estar **justificada por 2+ usos reales** o por contrato externo.
- **KISS:** La solución más simple que satisface el requisito de forma correcta y robusta. Prohibido el "over-engineering": abstracciones, HOCs, patrones por estética, sin necesidad real.
- **YAGNI:** No implementar nada que no se use aún ("por si acaso").

### REGLA — Early Returns
- Toda función/contenedor que maneje condiciones de salida (validación, datos ausentes, estados) usa **early returns** para resolver los casos límite/primeros y dejar el flujo principal sin anidamiento profundo.
- Prohibido el código con anidamiento profundo de `if/else` (máximo razonable: 2 niveles); se prefiere extraer a función o usar guard clauses.

### REGLA — Código muerto o duplicado (prohibición absoluta)
- **Prohibido** código muerto: variables, imports, componentes, funciones, rutas o snippets sin uso.
- **Prohibido** código comentado como "reserva". Si no se usa, se elimina (el historial de git lo preserva).
- **Prohibido** incluir snippets o librerías que reproduzcan lo que ya hace una utilidad interna o una dependencia existente.

### REGLA — Dependencias
- No añadir una dependencia nueva sin justificarla (trade-off), validar su contenido/tipado y coordinar con el Tech Leader.
- Preferir dependencias con tipos de primera clase (no `@types/*` sueltos frágiles si hay alternativa tipada).
- Mantener el árbol de dependencias limpio; revisar `package.json` para detectar dependencias sin uso.

---

## 2. Tipado & Lenguaje

### REGLA — Tipado estricto en entradas y salidas
- **Toda** función, componente y hook tiene tipos **explícitos** en parámetros y valor de retorno. No se infiere silenciosamente el contrato público.
- El typecheck es obligatorio: el proyecto compila con `tsc -b` sin errores.

### REGLA — Prohibición de tipos genéricos ambiguos
- **PROHIBIDO** el uso de `any` y `unknown` en contratos públicos (props, parámetros, retornos, tipos de dominio). Es incumplimiento BLOQUEANTE.
- `unknown` solo es admisible en fronteras de datos externos no confiables (parsing de entrada externa) y debe refinarse con guards antes de su uso.
- `as` (type assertion) está **prohibido** salvo en casos muy limitados y justificados frente al Tech Leader (p. ej. cruce de librerías sin tipos), nunca para eludir errores de tipado corregibles.
- `@ts-ignore` / `@ts-expect-error`: **prohibidos** salvo excepción documentada y aprobada.

### REGLA — Interfaces obligatorias para contratos
- Todo contrato de datos (entidades de dominio, props de datos, respuestas de API, formas de formulario) se define como **`interface` o `type`** declarado en el dominio (`src/shared/types/`), no inline en componentes.
- Los contratos expuestos reutilizan/son consistentes con los tipos de dominio en `portfolio.ts`.
- Nada de campos `string` sueltos sin significado tipado; usar unions (`'a' | 'b'`) o enums de dominio (`Category`, `ProjectStatus`) según el caso, respetando `erasableSyntaxOnly` (no usar `enum` TS si el compilador lo prohíbe; usar uniones).

### REGLA — Uniones/descartes exhaustivos
- Al consumir uniones con `switch`, cubrir todos los casos (el tsconfig tiene `noFallthroughCasesInSwitch`); agregar siempre un caso default que lance error tipado o no-op explícito cuando aplique.

---

## 3. Seguridad & Datos

### REGLA — Validación y sanitización en los bordes de entrada/salida
- Toda entrada externa (formularios, params de URL, respuesta de API, input de usuario) se **valida y sanitiza en la frontera** antes de entrar al dominio.
- Usar DTOs (Data Transfer Objects) con validadores estrictos para el formulario de consulta (`ConsultationRequest`): tipos esperados, rangos permitidos, longitudes, formato.
- El formulario de contacto debe validar: campos obligatorios, formato de email, rango de presupuesto/área (números no negativos, límites superiores razonables), fechas coherentes.
- Las URLs/valores crudos de la API o del data layer no son confiables per se para renderizado directo sin escapar.

### REGLA — Prohibición de logs con datos sensibles
- **PROHIBIDO** registrar (console, archivos, telemetría) datos personales o sensibles: emails, teléfonos, mensajes de consulta, datos de clientes.
- En desarrollo se documenta el flujo, no el contenido.
- Ningún dato sensible debe quedar expuesto en el DOM/attributos no necesarios.

### REGLA — Manejo centralizado de excepciones tipadas
- Las excepciones/errores se manejan de forma **centralizada y tipada**, no con `try/catch` dispersos ad-hoc en cada componente.
- Diseñar un modelo de errores tipado (p. ej. error de validación vs error de red vs no encontrado) y traducirlo a estados de UI (`error` con mensaje claro).
- Los errores que llegan al usuario final deben ser legibles y no filtrar detalles internos.

### REGLA — Datos de prueba
- Prohibido que datos de prueba contaminen el data layer de producción. Separar fixtures de testing del contenido real.

---

## 4. Bases de Datos & Persistencia

> Aplicable cuando exista persistencia (actualmente el proyecto es SPA con data layer estático). Estas reglas se activan y deben cumplirse en cuanto se introduzca backend/DB.

### REGLA — Normalización y contratos
- El modelo de datos se diseña normalizado (sin redundancia innecesaria) y con contratos tipados consistentes con el dominio.

### REGLA — Transacciones atómicas obligatorias en mutaciones compuestas
- Cualquier mutación que afecte a múltiples entidades/registros debe ejecutarse dentro de una **transacción atómica**. Prohibido un estado intermedio visible o persistido parcialmente.

### REGLA — Prohibición de queries ciegas
- **PROHIBIDO** `SELECT *` o proyecciones sin especificar campos. Toda query proyecta solo los campos que el contrato consume.

### REGLA — Mitigación preventiva de N+1
- Prohibido patrones N+1 (consultas en bucle). En consultas de listas con relaciones, usar estrategias de cargado eficiente (joins, eager loading, batch) y verificar el plan de queries.

### REGLA — Parámetros parametrizados
- Prohibida la interpolación de valores en queries. Uso obligatorio de queries parametrizadas/prepared statements para prevenir inyección SQL.

---

## 5. Flujo de Trabajo Operativo — Protocolo de 4 Fases

Todo trabajo (feature, bugfix, refactor) sigue **obligatoriamente** este protocolo secuencial:

### Fase 1 — Planificación
- Leer `context.md` y `rules.md` antes de tocar código.
- Describir el problema/requisito en una frase. Definir criterios de aceptación verificables.
- Identificar impacto (¿qué archivos/capas/contratos toca?).
- Si hay decision de arquitectura con trade-off: redactar ADR breve y esperar al Tech Leader.
- **Salida:** Entendimiento claro y plan antes de escribir código.

### Fase 2 — Modularidad atómica
- Dividir el trabajo en **unidades atómicas** pequeñas e independientes (cada una compilable, testeable y revisable por separado).
- Cada unidad respeta capas y límites de arquitectura (dominio / data layer / presentación).
- Una unidad = una responsabilidad (SRP). Se completa y valida antes de pasar a la siguiente.

### Fase 3 — Ámbito estricto
- **Prohibido** tocar código fuera del alcance de la tarea actual (prohibido "aprovechar para arreglar otra cosa" sin ticket separado).
- Prohibido refactors cosméticos en archivos no relacionados.
- Cualquier descubrimiento ajeno al ámbito se registra como nuevo ticket/deuda, no se desarrolla en el momento.

### Fase 4 — Validación / Confirmación
- **Verificación local obligatoria** antes de dar por hecho el trabajo:
  - `npm run lint` → sin errores.
  - `npm run build` → sin errores (typecheck + bundle).
  - Ejecución manual del flujo (si aplica) en breakpoints del dispositivo.
- **Criterios de dominio** cumplidos (estados loading/error/empty, edge cases).
- **QA** revisa y emite veredicto (APROBADO / APROBADO CON OBSERVACIONES / RECHAZADO).
- **Tech Leader** da el visto bueno final de arquitectura/contratos.
- Solo tras validación completa se grado de merge (devops se encarga del pipeline).

---

## 6. Git & Convenciones Operativas

### Conventional Commits (obligatorio)
Formato: `<tipo>(<scope>): <descripción>`
- Tipos: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `perf`, `style`, `ci`, `build`, `revert`.
- Descripción en imperativo, minúscula, sin punto final.
- `BREAKING CHANGE` marcado explícitamente en footer.
- Mensaje de commit validado automáticamente (commitlint).

### Estrategia de ramas
- Nunca commitear directamente a `main`. Ramas cortas por feature/bug/chore.
- Naming: `feat/<scope>-<slug>` / `fix/<scope>-<slug>` / `chore/<slug>`.
- Todo PR a `main` pasa validación completa (lint, build, test, QA, Tech Leader).

### Puertas de merge (checklist final)
- [ ] `npm run lint` verde
- [ ] `npm run build` verde
- [ ] Tests (cuando existan) verdes
- [ ] Sin `any`/`@ts-ignore`/datos hardcodeados
- [ ] Convención de commits seguida
- [ ] QA: APROBADO (o bloqueantes resueltos)
- [ ] Tech Leader: arquitectura/contratos aprobados
- [ ] Sin secretos ni datos sensibles commiteados
- [ ] `context.md` actualizado si hubo cambio de arquitectura/roadmap

---

## 7. Checklist de Cumplimiento Rápido (para el autor de código)

Antes de declarar una tarea terminada, autoverificar:

**Código**
- [ ] Una sola responsabilidad por función/componente
- [ ] Sin duplicación (DRY); sin abstracción sin uso real (sobre-ingeniería)
- [ ] Early returns; sin anidamiento profundo
- [ ] Sin código muerto, sin comentarios "reserva"
- [ ] Sin datos hardcodeados (todo del data layer)
- [ ] Tipado estricto, sin `any`/`unknown` en contratos, sin `@ts-ignore`
- [ ] Contratos definidos como types/interface en el dominio

**Calidad / Seguridad**
- [ ] Estados idle/loading/success/error/empty cubiertos
- [ ] Edge cases enumerados y manejados
- [ ] Entrada validada/sanitizada en bordes (formularios, params)
- [ ] Sin logs de datos sensibles
- [ ] Responsive y accesible

**Operativo**
- [ ] `npm run lint` verde
- [ ] `npm run build` verde
- [ ] Ámbito estricto respetado (solo lo de la tarea)
- [ ] Conventional commit correcto
- [ ] Sin secretos

---

## 8. Garantías de Aplicación

- El **QA** rechaza cualquier feature que viole estas reglas aunque "funcione".
- El **Tech Leader** no aprueba arquitectura que viole SOLID/DRY/KISS o contratos.
- El **DevOps** frena el merge/despliegue si el pipeline (lint/build/test) no es verde o si hay secretos.
- Un even incumplimiento MAYOR truncado sin corregir se refleja como deuda técnica documentada, no se silencia.
- Todas estas reglas son auditables vía CI (lint/build) y revisión humana/agentes en cada PR.

---

*Documento normativo. Revisión mantenida por el Tech Leader. Consistente con `context.md`.*
