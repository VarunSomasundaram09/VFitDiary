# vfitdiary — Backend

Spring Boot REST API for the vfitdiary fitness tracking platform.

## Tech Stack
- Spring Boot 3.3
- Spring Security + JWT (jjwt)
- Spring Data JPA / Hibernate
- MySQL 8
- Maven

## Prerequisites
- Java 17+
- Maven 3.9+
- MySQL 8 running locally (or update `application.yml` to point elsewhere)

## Setup

1. **Create the database and load the schema:**
   ```bash
   mysql -u root -p < ../database/schema.sql
   ```
   This creates the `vfitdiary` database, all tables, and seed data
   (motivational quotes + a starter exercise library).

2. **Set environment variables** (or edit `application.yml` directly):
   ```bash
   export DB_USERNAME=root
   export DB_PASSWORD=your_mysql_password
   export JWT_SECRET=replace-with-a-long-random-256-bit-secret
   export CORS_ORIGINS=http://localhost:5173
   ```

3. **Run the app:**
   ```bash
   ./mvnw spring-boot:run
   ```
   The API starts on `http://localhost:8080`.

4. **API docs (Swagger UI):**
   `http://localhost:8080/swagger-ui.html`

## Notes on schema management

`spring.jpa.hibernate.ddl-auto` is set to `validate` — Hibernate will
check that your entities match the database schema but will never
alter it. `database/schema.sql` is the single source of truth for the
schema; run it manually (or via your migration tool of choice) whenever
it changes. This mirrors how most production teams manage schema
changes (e.g. with Flyway/Liquibase) rather than trusting Hibernate's
auto-DDL, which is unsafe for production databases.

## Authentication flow

- `POST /api/auth/signup` — create an account, returns access + refresh tokens
- `POST /api/auth/login` — authenticate, returns access + refresh tokens
- `POST /api/auth/refresh` — exchange a valid refresh token for a new pair (rotates the token)
- `POST /api/auth/logout` — revokes all refresh tokens for the current user (requires Bearer token)

Access tokens expire in 15 minutes by default; refresh tokens in 7 days.
Send the access token as `Authorization: Bearer <token>` on all
protected endpoints.

## Body Assessment / Profile

- `POST /api/assessments` — submit age/gender/height/weight/activity/goal
  + body-fat percentage; calculates and persists BMI, BMR (Katch-McArdle,
  since we have real body-fat%), maintenance/cut/bulk calories, lean mass,
  and fat mass. Also upserts the user's `Profile` (current weight, goal
  weight, etc.) so other modules (Dashboard, Progress) can read it.
- `GET /api/assessments/latest` — most recent assessment (404 if none yet)
- `GET /api/assessments/history` — full assessment history, newest first
- `GET /api/profile` — current profile snapshot (empty shell if the user
  hasn't completed an assessment yet, not a 404 — makes prefilling the
  frontend form simpler)

Calculation formulas live in `util/BodyCompositionCalculator.java`,
kept separate from the service layer so they're easy to unit test.

## Workout Generator

- `POST /api/workout-plans/generate` — generates a full split (Push/Pull/
  Legs, Upper/Lower, or Full Body) for the requested experience level and
  days/week. Deactivates any previous active plan first (only one active
  plan per user at a time). Exercise selection pulls from the seeded
  library, filtered to the user's experience level and below, trying to
  cover every muscle group in a day before filling remaining slots.
- `GET /api/workout-plans/active` — the current active plan (404 if none)
- `GET /api/workout-plans` — full plan history, newest first
- `GET /api/exercises` — the full seeded exercise library

Split/day-pattern logic lives in `util/WorkoutPlanGenerator.java` — also
kept pure and separate from the service layer for testability.

## Workout Tracker

- `POST /api/workout-logs` — logs a session (date + a list of sets, each
  with exercise/weight/reps). For every set: computes estimated 1RM via
  the Epley formula (`util/TrainingCalculator.java`), checks it against
  the user's `PersonalRecord` for that exercise and updates it if it's a
  new best, sums total session volume, and upserts the `WorkoutCalendar`
  day entry (which powers the streak heatmap in the Calendar module).
- `GET /api/workout-logs/recent` — last 20 sessions
- `GET /api/workout-logs/exercises/{exerciseId}/previous` — the most
  recently logged weight/reps for an exercise, used for the tracker's
  "last time" display

## Progress & Personal Records

- `POST /api/progress/weight` — logs (or updates, if one already exists
  for that date) a weight entry; powers the Progress page's weight trend
- `GET /api/progress/weight-history` — full weight history, oldest first
- `GET /api/progress/volume-history?days=90` — daily training volume from
  `WorkoutCalendar` (populated by the Tracker module), oldest first
- `GET /api/personal-records` — every PR the user has, best-1RM first

## Calendar

- `GET /api/calendar/heatmap?days=365` — daily activity from `WorkoutCalendar`
  (same data source as the Progress volume chart), used for the GitHub-style
  heatmap and the month calendar view
- `GET /api/calendar/streaks` — current and longest streak, computed by
  `util/CalendarStreakCalculator.java` (pure logic, testable in isolation —
  same pattern as the other calculators)
- `GET /api/workout-logs/on/{date}` — the exercises/sets logged on a
  specific day, for the calendar's day-detail view

## Settings

- `GET /api/users/me` — current user's account basics (name, email, role)
- `PUT /api/users/me` — update display name (email changes aren't
  supported yet — would need re-verification, out of scope for now)

Note: `GET /api/users/me` returns account basics (name/email); `GET
/api/profile` (see Body Assessment above) returns body/preferences data.
Two separate endpoints because they're two separate concerns — the
Settings page's "Profile" card uses the former, its "Physical stats"
card uses the latter.

## Project structure

```
src/main/java/com/vfitdiary/
├── controller/     REST endpoints
├── service/        Business logic
├── repository/     Spring Data JPA interfaces
├── entity/         JPA entities (map 1:1 to database/schema.sql tables)
├── dto/
│   ├── request/     Inbound request bodies (validated)
│   └── response/    Outbound response shapes
├── config/         Security, CORS, OpenAPI beans
├── security/       JWT provider, filter, UserDetails
└── exception/      Custom exceptions + global handler
```
