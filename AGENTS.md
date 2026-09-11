# AGENTS.md — kori

## Stack & Entrypoints
- Vite 8 + React 19 + TypeScript 6 + `react-router-dom` 7 + Tailwind CSS 4 (`@tailwindcss/vite`) + `lucide-react`.
- Entry: `src/main.tsx` wraps `<BrowserRouter><App /></BrowserRouter>` → `src/App.tsx:26` defines routes.
- Styling: single `@import "tailwindcss"` in `src/index.css:1`; `vite.config.ts:1` registers `tailwindcss()` then `react()`. No `tailwind.config.*`.
- `mongodb` 7.6 is installed but unused — never import it client-side (Vite bundles for browser; DB must be server-side).

## Commands (verified in `package.json:6`)
- `npm run dev` — Vite dev server (also `yarn dev`; both lockfiles present — `package-lock.json` + `yarn.lock` — prefer `npm` to avoid drift).
- `npm run build` — `tsc -b && vite build` (typecheck via project references, then bundle).
- `npm run lint` — `eslint .` (flat config `eslint.config.js:8` — ignores `dist/`).
- `npm run preview` — serve `dist/`.
- No test runner configured. Verify with `build` + `lint`.

## Project Structure
- `src/components/` — all UI: `Navbar.tsx`, `Hero.tsx`, `Craftcategories.tsx`, `ProductsGrid.tsx`, `ArticansCart.tsx`, `TrustSection.tsx`, `JoinMaker.tsx`, `Login.tsx`, `Signup.tsx`, `Footer.tsx`.
- `src/lib/` and `src/features/` — empty placeholders for future auth/utils and feature slices; use them instead of scattering logic in `components/`.
- `src/App.tsx:13` — `HomePage` composes Hero → CraftCategories → ProductGrid → ArtisanCards → TrustSection → JoinMakerBanner. `App` itself is layout shell (sticky Navbar, gradient main, Footer).
- `public/` — `favicon.svg`, `icons.svg`.

## Routes
- `/` → `HomePage`, `/login` → `Login`, `/signup` → `Signup` (`src/App.tsx:33`). Add new routes there; ensure `BrowserRouter` stays in `main.tsx:9`.

## TypeScript
- Project references: `tsconfig.json` → `tsconfig.app.json` (target `es2023`, `bundler` resolution, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noEmit:true`) + `tsconfig.node.json` (includes only `vite.config.ts`). Build uses `tsc -b`; don't run bare `tsc --noEmit` without `-b`.
- `allowImportingTsExtensions:true` — don't add manual `*.js` rewrites.
- `verbatimModuleSyntax` + `erasableSyntaxOnly` are strict — `Login.tsx:1` / `Signup.tsx:1` currently fail `tsc -b` with `TS1484: 'FormEvent' is a type and must be imported using a type-only import`. Fix is `import { type FormEvent, useState }`.

## Conventions & Gotchas
- **Auth is stubbed:** `Login.tsx:17` / `Signup.tsx:28` use local `useState` + optional `onSubmit` prop. Comments say "Wire up to Better Auth". `Signup.tsx:15` has `UserRole = "buyer" | "artisan"` role toggle. No actual auth wiring exists.
- **Routing bug to fix:** `src/components/Navbar.tsx:138` uses `<Link href={...}>` — react-router-dom API is `to`, not `href`. Same file mixes `<a href>` for internal nav (`/login`, `/signup`, `/`) which causes full reloads — replace with `<Link to>`.
- **Tailwind colors are inline arbitrary hex** (e.g. `bg-[#16120e]`) — no theme config; keep same pattern when adding UI.
- **Icons** always from `lucide-react` per existing components.
- **`.gitignore:14` does NOT ignore `.env`** — do not commit secrets. Add `.env` to `.gitignore` if adding real credentials.
- Both `yarn.lock` and `package-lock.json` committed — after adding deps run `npm install` (current `package-lock.json` is source of truth per `node_modules`); delete `yarn.lock` or sync it if switching to yarn.

## Env
- Current ` .env:1` is `Mongodb_URI=mongodb+srv://...` (uppercase key, no `VITE_` prefix). Vite only exposes `VITE_*` to client code — this var is invisible in `import.meta.env` and would leak credentials if exposed. For any future server/API layer, move it to a server process and rename to `MONGODB_URI` or `VITE_` only if truly public.
- No `.env.example`. Document required vars there when adding Better Auth.

## Better Auth (planned)
- No Better Auth dependency yet. When adding it, introduce a server layer (Vite alone cannot hold session/secrets) — either Vite API route, Express, or migrate to Next — and keep `mongodb` usage server-side only. Reference user's prior implementation pattern before scaffolding.
