# vfitdiary — Frontend

React + TypeScript + Vite + Tailwind CSS.

## Tech Stack
- React 18, TypeScript, Vite
- Tailwind CSS (custom design tokens matching the brand palette)
- Framer Motion (animations)
- React Router
- React Hook Form + Zod (forms & validation — wired in as modules land)
- TanStack Query + Axios (data fetching — wired in as modules land)
- Chart.js / react-chartjs-2 (Progress page charts)
- Lucide React (icons)

## Setup

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173`. Point it at the backend
(`http://localhost:8080` by default) — see `backend/README.md`.

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

## What's built so far

- **Landing page** (`/`) — full marketing page: navbar, hero with an
  animated streak-heatmap product mockup, features grid, how-it-works,
  stylized product screenshots, FAQ accordion, CTA banner, footer.
- **Authentication** (`/login`, `/signup`) — split-screen branded layout,
  React Hook Form + Zod validation, password strength meter, visibility
  toggle, wired to the backend's JWT auth endpoints with auto-refresh
  on 401 and a hand-built toast notification system.
- **Dashboard** (`/dashboard`, protected) — sidebar + topbar shell shared
  by all authenticated pages (light/dark/system theme toggle, mobile
  drawer nav), welcome card with rotating motivational quote, animated
  stat cards (weight, goal, streak, calories), weekly volume chart
  (Chart.js), upcoming workout card, quick actions. Data currently comes
  from a mocked service (`services/dashboardService.ts`) shaped to match
  the real aggregated endpoint that lands once the Assessment/Tracker/
  Progress backend modules are built — swapping it for a live `api.get`
  call is the only change needed.
- **Body Assessment** (`/assessment`) — 3-step flow: basics (age, height,
  weight, activity level, goal-card picker), a body-fat range picker using
  abstract illustrative silhouettes (not photos — keeps it tasteful and
  copyright-clean) that scale visual "definition" with the selected
  range, then results (BMI, BMR, lean/fat mass doughnut chart, cut/
  maintain/bulk calorie targets). Fully wired to the real backend
  (`POST /api/assessments`) — this is the first module using a live API
  call rather than mocked data.
- **Workout Generator** (`/workouts`) — pick a split (Push/Pull/Legs,
  Upper/Lower, Full Body), experience level, and days/week; generates a
  full plan via the real backend and displays it as day-by-day exercise
  cards (sets, reps, rest, target muscle). Shows the active plan on
  return visits, with a "Generate new plan" option that replaces it.
- **Workout Tracker** (`/tracker`) — pick an exercise (grouped by muscle
  group), see your last-time weight/reps, log one or more sets, save.
  Results show estimated 1RM per set and a trophy badge on any set that
  set a new personal record — both computed live by the backend.
- **Progress** (`/progress`) — weight trend line chart with an inline
  quick-log field, 90-day training volume bar chart (both empty-state
  aware for new users), and a Personal Records tracker that highlights
  Bench Press / Squat / Deadlift as hero cards (matched by name against
  whatever the user has actually logged) with the rest of their PRs
  listed below.
- **Calendar** (`/calendar`) — current/longest streak cards, a full-year
  GitHub-style activity heatmap, and a month calendar grid; clicking any
  day shows exactly what was logged (exercises, weight × reps). All
  three views share the same `WorkoutCalendar` data the Tracker module
  populates — no mock data.
- **Settings** (`/settings`) — appearance (light/dark/system, larger
  cards than the topbar's compact switcher), profile (edit display name,
  live-updates `AuthContext` on save), a read-only physical-stats summary
  pulled from the latest Body Assessment, and logout.

All 10 modules are now built end-to-end. Routes are code-split with
`React.lazy` — each page ships as its own chunk loaded on demand, which
resolved the "chunk larger than 500kB" warning that showed up around
Module 4 (no single chunk exceeds ~400kB now).

Core UI primitives (`components/ui/Button.tsx`, `Card.tsx`, `Skeleton.tsx`)
are in the shadcn pattern — hand-authored against our token system.

## Design tokens

Defined in `tailwind.config.js`:

| Token | Value |
|---|---|
| `primary` | `#4F46E5` |
| `secondary` | `#7C3AED` |
| `success` | `#22C55E` |
| `danger` | `#EF4444` |
| `warning` | `#F59E0B` |
| `surface.dark` | `#0F172A` |
| `surface.card` | `#1E293B` |
| `surface.light` | `#F8FAFC` |

Type: `font-display` (Space Grotesk, headlines only), `font-body`
(Inter, everything else), `font-mono` (JetBrains Mono, stats/numbers).

## Folder structure

```
src/
├── components/
│   ├── ui/          Reusable primitives (Button, Card, ...)
│   ├── layout/       Page-section components (Navbar, Hero, Footer, ...)
│   ├── charts/       Chart.js wrappers (added with Progress module)
│   ├── forms/        Form components (added with Auth module)
│   └── common/        Shared widgets (StreakHeatmap, ...)
├── pages/            One folder per route/module
├── layouts/          Shared page shells (added with Dashboard module)
├── hooks/            Custom hooks
├── services/         API client + endpoint wrappers (Axios)
├── contexts/         React context providers (auth, theme)
├── types/            Shared TypeScript types
└── utils/            Helpers (cn, formatters, calculators)
```
