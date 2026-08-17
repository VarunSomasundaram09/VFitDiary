package com.vfitdiary.util;

import com.vfitdiary.entity.Exercise;
import com.vfitdiary.entity.WorkoutPlan;

import java.util.List;
import java.util.Map;

/**
 * Pure planning logic: given a split type and days-per-week, decides the
 * day pattern (e.g. Push/Pull/Legs) and which muscle groups belong to each
 * day. Actual exercise selection (querying the library) stays in the
 * service layer, since that needs the repository.
 */
public final class WorkoutPlanGenerator {

    private WorkoutPlanGenerator() {}

    private static final List<String> PUSH_MUSCLES = List.of("Chest", "Shoulders", "Triceps");
    private static final List<String> PULL_MUSCLES = List.of("Back", "Biceps", "Rear Delts");
    private static final List<String> LEGS_MUSCLES = List.of("Quadriceps", "Hamstrings", "Glutes", "Calves");
    private static final List<String> UPPER_MUSCLES =
            List.of("Chest", "Back", "Shoulders", "Biceps", "Triceps", "Rear Delts");
    private static final List<String> LOWER_MUSCLES = List.of("Quadriceps", "Hamstrings", "Glutes", "Calves");
    private static final List<String> FULL_BODY_MUSCLES =
            List.of("Chest", "Back", "Quadriceps", "Shoulders", "Hamstrings", "Core");

    public record PlannedDay(String label, List<String> muscleGroups) {}

    public static List<PlannedDay> planDays(WorkoutPlan.SplitType splitType, int daysPerWeek) {
        return switch (splitType) {
            case PUSH_PULL_LEGS -> cyclePattern(
                    List.of(
                            new PlannedDay("Push Day", PUSH_MUSCLES),
                            new PlannedDay("Pull Day", PULL_MUSCLES),
                            new PlannedDay("Leg Day", LEGS_MUSCLES)
                    ),
                    daysPerWeek
            );
            case UPPER_LOWER -> cyclePattern(
                    List.of(
                            new PlannedDay("Upper Body", UPPER_MUSCLES),
                            new PlannedDay("Lower Body", LOWER_MUSCLES)
                    ),
                    daysPerWeek
            );
            case FULL_BODY -> cyclePattern(
                    List.of(
                            new PlannedDay("Full Body A", FULL_BODY_MUSCLES),
                            new PlannedDay("Full Body B", FULL_BODY_MUSCLES),
                            new PlannedDay("Full Body C", FULL_BODY_MUSCLES)
                    ),
                    daysPerWeek
            );
            case CUSTOM -> List.of();
        };
    }

    /** Repeats the base pattern to fill the requested number of days, labeling repeats (e.g. "Push Day II"). */
    private static List<PlannedDay> cyclePattern(List<PlannedDay> basePattern, int daysPerWeek) {
        return java.util.stream.IntStream.range(0, daysPerWeek)
                .mapToObj(i -> {
                    PlannedDay base = basePattern.get(i % basePattern.size());
                    int cycle = i / basePattern.size();
                    String label = cycle == 0 ? base.label() : base.label() + " " + toRoman(cycle + 1);
                    return new PlannedDay(label, base.muscleGroups());
                })
                .toList();
    }

    private static String toRoman(int number) {
        Map<Integer, String> romanMap = Map.of(1, "I", 2, "II", 3, "III", 4, "IV");
        return romanMap.getOrDefault(number, String.valueOf(number));
    }

    /** Prescribed sets/reps/rest by experience level — applied uniformly across a plan for simplicity. */
    public record Prescription(int sets, String reps, int restSeconds) {}

    public static Prescription prescriptionFor(Exercise.Difficulty experienceLevel) {
        return switch (experienceLevel) {
            case BEGINNER -> new Prescription(3, "10-12", 60);
            case INTERMEDIATE -> new Prescription(4, "8-10", 75);
            case ADVANCED -> new Prescription(4, "6-8", 90);
        };
    }
}
