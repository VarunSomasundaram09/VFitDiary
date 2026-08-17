# vfitdiary

**Track. Transform. Become.**

A full-stack fitness tracking SaaS: workout plans, session logging,
body-composition assessment, progress charts, and a streak calendar —
built with React/TypeScript on the frontend and Spring Boot on the
backend.

## Status: all 10 modules complete

| # | Module | Frontend | Backend |
|---|--------|----------|---------|
| 1 | Folder structure, DB schema, backend architecture | — | ✅ |
| 2 | Landing page | ✅ | — |
| 3 | Authentication (JWT, signup/login/refresh/logout) | ✅ | ✅ |
| 4 | Dashboard shell + overview | ✅ | (mocked, contract-accurate) |
| 5 | Body Assessment (BMI/BMR/calories, body-fat picker) | ✅ | ✅ |
| 6 | Workout Generator (PPL/Upper-Lower/Full Body) | ✅ | ✅ |
| 7 | Workout Tracker (sets, 1RM, auto PRs) | ✅ | ✅ |
| 8 | Progress (weight/volume charts, PR tracker) | ✅ | ✅ |
| 9 | Calendar (streak heatmap, month view) | ✅ | ✅ |
| 10 | Settings (theme, profile, logout) | ✅ | ✅ |

Every module was verified with a TypeScript compile (`tsc -b`) and a
production build (`vite build`) before moving to the next. The Dashboard
is the one screen still reading from a mocked service — its data
(current weight, streak, upcoming workout) is owned by modules 5–9,
which didn't exist yet when it was built; the mock is shaped exactly
like the real aggregated endpoint, so wiring it up is a follow-up, not
a rewrite.

## Getting started

1. **Database:** load `database/schema.sql` into MySQL 8 (creates the
   `vfitdiary` database, all 14 tables, and seed data).
2. **Backend:** see `backend/README.md` — Spring Boot 3.3 / Java 17,
   `./mvnw spring-boot:run`, runs on `:8080`.
3. **Frontend:** see `frontend/README.md` — `npm install && npm run dev`,
   runs on `:5173`.

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion,
  React Hook Form + Zod, TanStack Query, Chart.js, React Router
- **Backend:** Spring Boot 3.3, Spring Security + JWT, Hibernate/JPA,
  MySQL 8, Maven

## Design system

Primary `#4F46E5` · Secondary `#7C3AED` · Success `#22C55E` ·
Danger `#EF4444` · Warning `#F59E0B` · Dark bg `#0F172A` ·
Card `#1E293B` · Light bg `#F8FAFC`

Space Grotesk (display/headlines) · Inter (body) · JetBrains Mono
(stats and numbers).

## Notable implementation choices

- **Body-fat picker uses illustrative SVG silhouettes, not photos** —
  avoids both copyright and content-appropriateness concerns while
  still giving a real visual reference.
- **BMR via Katch-McArdle**, not Mifflin-St Jeor — chosen because the
  assessment already collects real body-fat%, which the Katch-McArdle
  formula uses directly for a more accurate result.
- **Estimated 1RM via the Epley formula**, recalculated on every set
  logged; personal records update automatically when a set beats the
  stored best.
- **`WorkoutCalendar` is a denormalized daily rollup**, updated by the
  Tracker whenever a session is logged — the Progress volume chart and
  the Calendar heatmap both read from it directly rather than
  aggregating raw logs on every request.
- **Route-level code-splitting** (`React.lazy`) — added once all pages
  existed, since that's when bundle size started to matter.
- Every list, chart, and card has a real loading skeleton, empty state,
  and error state — not just a happy-path render.
