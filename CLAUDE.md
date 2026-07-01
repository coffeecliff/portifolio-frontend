# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server (http://localhost:5173)
npm run build    # type-check (tsc --noEmit) + production build to dist/
npm run preview  # serve the production build locally
```

There is no lint script and no test suite configured in this repo. `npm run build` is the closest thing to a CI gate — it runs the TypeScript compiler in strict mode (`noUnusedLocals`, `noUnusedParameters` are on) before bundling with Vite.

## Architecture

This is a single-page React + TypeScript + Vite portfolio site, refactored from a static Claude Design prototype (the original `Tech Portfolio.dc.html`, `support.js`, `image-slot.js` are preserved under `design-reference/` purely as reference — they are not part of the build and should not be imported from).

The codebase is organized in three layers, and code should generally only depend "downward":

- `src/design-system/` — reusable, content-agnostic primitives (`GlassPanel`, `Button`, `SectionLabel`, `Tag`, `ImageSlot`) plus `tokens/` (a JS mirror of color/font values for code that can't read CSS custom properties, e.g. canvas drawing). Everything is re-exported through the barrel `src/design-system/index.ts`, and consumers should import from `@/design-system` rather than reaching into individual component files.
- `src/components/` — layout-level building blocks tied to this specific page (`Nav`, `Hero` + `GlassCube` + `WaveCanvas`).
- `src/sections/` — the actual page sections composed in `App.tsx` (`Team`, `Projects`, `TechStack`, `Timeline`, `Footer`). Each section pulls its copy/list data from `src/data/` and its primitives from `@/design-system`, and should not hardcode strings that belong in `data/`.

Other conventions to preserve:

- **Content/presentation split**: text and list data live in `src/data/*.ts` (e.g. `team.ts`, `projects.ts`, `stack.ts`, `milestones.ts`, `navigation.ts`), typed with an exported interface. Editing copy should not require touching JSX.
- **Design tokens**: `src/styles/tokens.css` is the single source of truth for the visual language (CSS custom properties — color, spacing, type). `src/design-system/tokens/index.ts` is a parallel JS copy needed only where CSS vars aren't accessible (canvas-based components like the Hero wave/cube); keep the two in sync if either changes.
- **CSS Modules**: every component/section has a co-located `*.module.css` for locally-scoped styles — no global className collisions.
- **Path alias**: `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).
- **Interactivity config**: page-level interactive settings (e.g. `motionEnabled`, `waveDensity`) are centralized in the `settings` object at the top of `src/App.tsx` rather than passed around as scattered props/flags — this mirrors where these values used to live as component props in the original Claude Design prototype.
