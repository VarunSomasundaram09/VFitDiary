-- =====================================================================
-- vfitdiary — MySQL Database Schema
-- Version 1.0
-- =====================================================================

CREATE DATABASE IF NOT EXISTS vfitdiary
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vfitdiary;

-- =====================================================================
-- 1. USERS
-- Core authentication table
-- =====================================================================
CREATE TABLE users (
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name         VARCHAR(120)        NOT NULL,
    email             VARCHAR(255)        NOT NULL UNIQUE,
    password_hash     VARCHAR(255)        NOT NULL,
    role              ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    is_enabled        BOOLEAN             NOT NULL DEFAULT TRUE,
    created_at        DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
                                            ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email)
) ENGINE=InnoDB;

-- =====================================================================
-- 2. PROFILES
-- Extended body/assessment data — 1:1 with users
-- =====================================================================
CREATE TABLE profiles (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT              NOT NULL UNIQUE,
    age                 INT                 NULL,
    gender              ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    height_cm           DECIMAL(5,2)        NULL,
    current_weight_kg   DECIMAL(5,2)        NULL,
    goal_weight_kg      DECIMAL(5,2)        NULL,
    activity_level      ENUM('SEDENTARY','LIGHT','MODERATE','ACTIVE','VERY_ACTIVE') NULL,
    fitness_goal        ENUM('CUT','MAINTAIN','BULK') NULL,
    body_fat_percentage DECIMAL(4,1)        NULL,  -- selected from body-fat image cards
    profile_image_url   VARCHAR(500)        NULL,
    theme_preference    ENUM('LIGHT','DARK','SYSTEM') NOT NULL DEFAULT 'SYSTEM',
    created_at          DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
                                              ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_profiles_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- 3. BODY_ASSESSMENTS
-- Historical log of every assessment/calculation snapshot
-- (keeps profiles as "current state", this as "history over time")
-- =====================================================================
CREATE TABLE body_assessments (
    id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id               BIGINT           NOT NULL,
    age                   INT              NOT NULL,
    gender                ENUM('MALE','FEMALE','OTHER') NOT NULL,
    height_cm             DECIMAL(5,2)     NOT NULL,
    weight_kg             DECIMAL(5,2)     NOT NULL,
    activity_level        ENUM('SEDENTARY','LIGHT','MODERATE','ACTIVE','VERY_ACTIVE') NOT NULL,
    body_fat_percentage   DECIMAL(4,1)     NOT NULL,
    bmi                   DECIMAL(4,1)     NOT NULL,
    bmr                   DECIMAL(6,1)     NOT NULL,
    maintenance_calories  DECIMAL(6,1)     NOT NULL,
    cut_calories          DECIMAL(6,1)     NOT NULL,
    bulk_calories         DECIMAL(6,1)     NOT NULL,
    lean_body_mass_kg     DECIMAL(5,2)     NOT NULL,
    fat_mass_kg           DECIMAL(5,2)     NOT NULL,
    assessed_at           DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_assessments_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_assessments_user_date (user_id, assessed_at)
) ENGINE=InnoDB;

-- =====================================================================
-- 4. EXERCISES
-- Master exercise library (seeded, reused across workout plans)
-- =====================================================================
CREATE TABLE exercises (
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    name              VARCHAR(150)     NOT NULL,
    target_muscle     VARCHAR(100)     NOT NULL,
    secondary_muscles VARCHAR(255)     NULL,
    equipment         VARCHAR(100)     NULL,
    difficulty        ENUM('BEGINNER','INTERMEDIATE','ADVANCED') NOT NULL,
    instructions      TEXT             NULL,
    video_url         VARCHAR(500)     NULL,
    created_at        DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_exercises_muscle (target_muscle),
    INDEX idx_exercises_difficulty (difficulty)
) ENGINE=InnoDB;

-- =====================================================================
-- 5. WORKOUT_PLANS
-- Generated or custom workout plans (Push/Pull/Legs, Upper/Lower, etc.)
-- =====================================================================
CREATE TABLE workout_plans (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT           NOT NULL,
    name            VARCHAR(150)     NOT NULL,
    split_type      ENUM('PUSH_PULL_LEGS','UPPER_LOWER','FULL_BODY','CUSTOM') NOT NULL,
    experience_level ENUM('BEGINNER','INTERMEDIATE','ADVANCED') NOT NULL,
    days_per_week   INT              NOT NULL,
    is_active        BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at        DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                       ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_plans_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_plans_user (user_id)
) ENGINE=InnoDB;

-- =====================================================================
-- 6. WORKOUT_PLAN_DAYS
-- Individual days within a plan (e.g. "Push Day A")
-- =====================================================================
CREATE TABLE workout_plan_days (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    workout_plan_id BIGINT           NOT NULL,
    day_label       VARCHAR(100)     NOT NULL,   -- e.g. "Push Day", "Day 1"
    day_order       INT              NOT NULL,
    CONSTRAINT fk_plandays_plan
        FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE,
    INDEX idx_plandays_plan (workout_plan_id)
) ENGINE=InnoDB;

-- =====================================================================
-- 7. WORKOUT_PLAN_EXERCISES
-- Exercises assigned within a plan day, with prescribed sets/reps
-- =====================================================================
CREATE TABLE workout_plan_exercises (
    id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
    workout_plan_day_id   BIGINT       NOT NULL,
    exercise_id           BIGINT       NOT NULL,
    exercise_order        INT          NOT NULL,
    prescribed_sets       INT          NOT NULL,
    prescribed_reps       VARCHAR(20)  NOT NULL,  -- e.g. "8-12"
    rest_seconds          INT          NOT NULL,
    CONSTRAINT fk_planexercises_day
        FOREIGN KEY (workout_plan_day_id) REFERENCES workout_plan_days(id) ON DELETE CASCADE,
    CONSTRAINT fk_planexercises_exercise
        FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE RESTRICT,
    INDEX idx_planexercises_day (workout_plan_day_id)
) ENGINE=InnoDB;

-- =====================================================================
-- 8. WORKOUT_LOGS
-- A completed workout session (header record)
-- =====================================================================
CREATE TABLE workout_logs (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT       NOT NULL,
    workout_plan_day_id BIGINT       NULL,        -- nullable: freeform sessions allowed
    log_date            DATE         NOT NULL,
    duration_minutes    INT          NULL,
    notes               TEXT         NULL,
    total_volume_kg     DECIMAL(10,2) NULL,        -- computed: sum(weight*reps)
    created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_logs_planday
        FOREIGN KEY (workout_plan_day_id) REFERENCES workout_plan_days(id) ON DELETE SET NULL,
    INDEX idx_logs_user_date (user_id, log_date)
) ENGINE=InnoDB;

-- =====================================================================
-- 9. WORKOUT_LOG_SETS
-- Individual sets logged within a workout log (exercise-level detail)
-- =====================================================================
CREATE TABLE workout_log_sets (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    workout_log_id  BIGINT         NOT NULL,
    exercise_id     BIGINT         NOT NULL,
    set_number      INT            NOT NULL,
    weight_kg       DECIMAL(6,2)   NOT NULL,
    reps            INT            NOT NULL,
    rpe             DECIMAL(3,1)   NULL,           -- optional rate of perceived exertion
    estimated_1rm   DECIMAL(6,2)   NULL,           -- computed via Epley formula
    notes           VARCHAR(255)   NULL,
    CONSTRAINT fk_logsets_log
        FOREIGN KEY (workout_log_id) REFERENCES workout_logs(id) ON DELETE CASCADE,
    CONSTRAINT fk_logsets_exercise
        FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE RESTRICT,
    INDEX idx_logsets_log (workout_log_id),
    INDEX idx_logsets_exercise (exercise_id)
) ENGINE=InnoDB;

-- =====================================================================
-- 10. PERSONAL_RECORDS
-- Best lift ever recorded per user per exercise (denormalized for speed,
-- kept in sync via service-layer logic when new sets are logged)
-- =====================================================================
CREATE TABLE personal_records (
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id           BIGINT         NOT NULL,
    exercise_id       BIGINT         NOT NULL,
    best_weight_kg    DECIMAL(6,2)   NOT NULL,
    best_reps         INT            NOT NULL,
    estimated_1rm     DECIMAL(6,2)   NOT NULL,
    achieved_at       DATE           NOT NULL,
    workout_log_set_id BIGINT        NULL,
    CONSTRAINT fk_pr_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_pr_exercise
        FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    CONSTRAINT fk_pr_logset
        FOREIGN KEY (workout_log_set_id) REFERENCES workout_log_sets(id) ON DELETE SET NULL,
    UNIQUE KEY uq_pr_user_exercise (user_id, exercise_id),
    INDEX idx_pr_user (user_id)
) ENGINE=InnoDB;

-- =====================================================================
-- 11. PROGRESS_ENTRIES
-- Weight/body-metric tracking over time (for progress graphs)
-- =====================================================================
CREATE TABLE progress_entries (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT         NOT NULL,
    entry_date      DATE           NOT NULL,
    weight_kg       DECIMAL(5,2)   NULL,
    body_fat_percentage DECIMAL(4,1) NULL,
    notes           VARCHAR(255)   NULL,
    photo_url       VARCHAR(500)   NULL,
    created_at      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_progress_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_progress_user_date (user_id, entry_date),
    INDEX idx_progress_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- =====================================================================
-- 12. WORKOUT_CALENDAR
-- Denormalized day-level activity marker — powers the heatmap/streaks
-- efficiently without scanning workout_logs every render
-- =====================================================================
CREATE TABLE workout_calendar (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT         NOT NULL,
    activity_date   DATE           NOT NULL,
    workout_count   INT            NOT NULL DEFAULT 1,
    total_volume_kg DECIMAL(10,2)  NULL,
    CONSTRAINT fk_calendar_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_calendar_user_date (user_id, activity_date),
    INDEX idx_calendar_user_date (user_id, activity_date)
) ENGINE=InnoDB;

-- =====================================================================
-- 13. MOTIVATIONAL_QUOTES
-- Rotating quotes shown on dashboard
-- =====================================================================
CREATE TABLE motivational_quotes (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    quote_text  VARCHAR(500)   NOT NULL,
    author      VARCHAR(150)   NULL,
    category    ENUM('DISCIPLINE','STRENGTH','CONSISTENCY','MINDSET','GENERAL')
                 NOT NULL DEFAULT 'GENERAL',
    is_active   BOOLEAN        NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =====================================================================
-- 14. REFRESH_TOKENS
-- JWT refresh token tracking (supports logout / rotation / revocation)
-- =====================================================================
CREATE TABLE refresh_tokens (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT         NOT NULL,
    token        VARCHAR(500)   NOT NULL UNIQUE,
    expires_at   DATETIME       NOT NULL,
    revoked      BOOLEAN        NOT NULL DEFAULT FALSE,
    created_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_refresh_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_refresh_user (user_id)
) ENGINE=InnoDB;

-- =====================================================================
-- SEED DATA — Motivational Quotes
-- =====================================================================
INSERT INTO motivational_quotes (quote_text, author, category) VALUES
('The only bad workout is the one that didn''t happen.', NULL, 'CONSISTENCY'),
('Discipline is choosing between what you want now and what you want most.', 'Abraham Lincoln', 'DISCIPLINE'),
('Strength does not come from winning. Your struggles develop your strengths.', 'Arnold Schwarzenegger', 'STRENGTH'),
('The body achieves what the mind believes.', NULL, 'MINDSET'),
('Small steps every day lead to big changes.', NULL, 'CONSISTENCY'),
('You don''t have to be extreme, just consistent.', NULL, 'CONSISTENCY'),
('Success starts with self-discipline.', NULL, 'DISCIPLINE'),
('Every workout is progress, even on the hard days.', NULL, 'GENERAL');

-- =====================================================================
-- SEED DATA — Core Exercise Library
-- =====================================================================
INSERT INTO exercises (name, target_muscle, secondary_muscles, equipment, difficulty, instructions) VALUES
('Barbell Bench Press', 'Chest', 'Triceps, Shoulders', 'Barbell', 'INTERMEDIATE', 'Lie on a flat bench, lower the bar to mid-chest, press up.'),
('Incline Dumbbell Press', 'Chest', 'Shoulders, Triceps', 'Dumbbells', 'BEGINNER', 'Press dumbbells upward on an inclined bench.'),
('Overhead Press', 'Shoulders', 'Triceps, Core', 'Barbell', 'INTERMEDIATE', 'Press the bar overhead from shoulder height.'),
('Lateral Raise', 'Shoulders', NULL, 'Dumbbells', 'BEGINNER', 'Raise dumbbells to the sides until shoulder height.'),
('Triceps Pushdown', 'Triceps', NULL, 'Cable Machine', 'BEGINNER', 'Push the cable attachment down, extending the elbows.'),
('Barbell Row', 'Back', 'Biceps, Rear Delts', 'Barbell', 'INTERMEDIATE', 'Hinge at hips, row the bar to the lower chest.'),
('Pull-Up', 'Back', 'Biceps', 'Bodyweight', 'INTERMEDIATE', 'Pull chin above the bar from a dead hang.'),
('Lat Pulldown', 'Back', 'Biceps', 'Cable Machine', 'BEGINNER', 'Pull the bar down to upper chest, squeeze the lats.'),
('Barbell Curl', 'Biceps', NULL, 'Barbell', 'BEGINNER', 'Curl the bar up while keeping elbows fixed.'),
('Face Pull', 'Rear Delts', 'Upper Back', 'Cable Machine', 'BEGINNER', 'Pull rope towards the face, elbows high.'),
('Back Squat', 'Quadriceps', 'Glutes, Hamstrings', 'Barbell', 'ADVANCED', 'Squat down keeping chest up, drive through heels.'),
('Romanian Deadlift', 'Hamstrings', 'Glutes, Lower Back', 'Barbell', 'INTERMEDIATE', 'Hinge at hips with a slight knee bend, lower the bar.'),
('Leg Press', 'Quadriceps', 'Glutes', 'Machine', 'BEGINNER', 'Press the platform away using your legs.'),
('Walking Lunge', 'Quadriceps', 'Glutes, Hamstrings', 'Dumbbells', 'BEGINNER', 'Step forward into a lunge, alternating legs.'),
('Standing Calf Raise', 'Calves', NULL, 'Machine', 'BEGINNER', 'Raise heels off the ground, squeeze calves.'),
('Deadlift', 'Back', 'Hamstrings, Glutes', 'Barbell', 'ADVANCED', 'Lift the bar from the floor by extending hips and knees.'),
('Plank', 'Core', NULL, 'Bodyweight', 'BEGINNER', 'Hold a straight-body position on forearms and toes.'),
('Hanging Leg Raise', 'Core', NULL, 'Pull-up Bar', 'INTERMEDIATE', 'Raise legs to hip height while hanging from a bar.');
