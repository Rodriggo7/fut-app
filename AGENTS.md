# AGENTS.md — Guía de Contexto y Reglas para Agentes de IA

## 1. Visión General del Proyecto
Este repositorio contiene la **App Armadora de Equipos de Fútbol**, una Single Page Application (SPA) de baja fricción diseñada para parsear listas de jugadores pegadas desde WhatsApp y dividirlas en dos equipos de forma aleatoria e imparcial.

- **Versión Actual:** v1.0 (MVP Client-Side)
- **Objetivo Principal:** Herramienta ultra rápida, utilitaria y pensada para uso en smartphones.
- **Metodología:** Desarrollo por fases documentadas (Análisis, Planificación, Diseño, Desarrollo, Pruebas y Despliegue).

---

## 2. Stack Tecnológico
- **Frontend Framework:** React (Vite)
- **Lenguaje:** JavaScript (ES6+) / TypeScript
- **Estilos:** Tailwind CSS (Mobile-First)
- **Hosting & CI/CD:** Vercel
- **Testing:** Vitest / Jest (para utilidades puras)

---

## 3. Reglas de Alcance y Restricciones (v1.0)
Al generar, refactorizar o proponer código para la **v1.0**, se deben respetar estrictamente los siguientes límites:

1. **PROHIBIDO Backend o Base de Datos:** Todo el procesamiento ocurre en memoria del cliente (`browser-side`). No agregar Supabase, Firebase, Node/Express ni PostgreSQL en esta versión.
2. **PROHIBIDO Autenticación:** No implementar login, registro ni perfiles de usuario.
3. **Focus Mobile-First:** La UI debe estar optimizada para pantallas táctiles de smartphones. Botones grandes, interacción con 1 clic y respuesta instantánea (< 100 ms).

---

## 4. Estructura de Módulos y Lógica Core
Toda la lógica de negocio debe implementarse mediante **funciones puras y desacopladas** dentro de `/src/utils`:

- `src/utils/parser.js`: Función `parsePlayerList(rawText)`. Limpia números (`1.`, `2-`), guiones, viñetas, espacios sobrantes y saltos de línea vacíos.
- `src/utils/shuffle.js`: Función `shuffleArray(array)`. Implementación pura del algoritmo **Fisher-Yates**.
- `src/utils/teams.js`: Función `divideTeams(playersArray)`. Divide la lista limpia en dos arreglos cuantitativamente equitativos (`teamA` y `teamB`).
- `src/utils/exporter.js`: Función `formatTeamsForClipboard(teamA, teamB)`. Formatea el resultado con emojis (👕/🎽) para copiar al portapapeles.

---

## 5. Convenciones de Código y Buenas Prácticas
- **Componentes React:** Usar componentes funcionales en `PascalCase` (ej: `ListInput.jsx`, `TeamCards.jsx`).
- **Manejo de Estado:** Hooks nativos (`useState`, `useCallback`, `useMemo`). Mantener el estado inmutable.
- **Formato de Commits:** Utilizar *Conventional Commits* (ej: `feat: implement parsePlayerList utility`, `test: add unit tests for Fisher-Yates shuffle`).
- **Pruebas Unitarias:** Cada utilidad dentro de `/src/utils` debe tener su archivo de pruebas unitarias `.test.js`.

---

## 6. Hoja de Ruta (Roadmap)
- **v1.0 (Actual):** SPA client-side, parsing de texto, Fisher-Yates, exportación a WhatsApp.
- **v2.0 (Próxima):** Backend API, base de datos PostgreSQL, CRUD de jugadores y balanceo por puntos de habilidad.
- **v3.0 (Futuro):** Carga de partidos, historial, marcadores y rating dinámico (Elo/TrueSkill).