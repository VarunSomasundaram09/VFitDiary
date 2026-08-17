package com.vfitdiary.service;

import com.vfitdiary.dto.request.GeneratePlanRequest;
import com.vfitdiary.dto.response.PlanDayResponse;
import com.vfitdiary.dto.response.PlanExerciseResponse;
import com.vfitdiary.dto.response.WorkoutPlanResponse;
import com.vfitdiary.entity.*;
import com.vfitdiary.exception.ResourceNotFoundException;
import com.vfitdiary.repository.ExerciseRepository;
import com.vfitdiary.repository.UserRepository;
import com.vfitdiary.repository.WorkoutPlanRepository;
import com.vfitdiary.util.WorkoutPlanGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class WorkoutPlanService {

    private static final int MAX_EXERCISES_PER_DAY = 5;

    private final WorkoutPlanRepository workoutPlanRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    @Transactional
    public WorkoutPlanResponse generatePlan(Long userId, GeneratePlanRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Only one active plan at a time — deactivate any existing ones.
        workoutPlanRepository.findByUserIdAndActiveTrue(userId)
                .forEach(plan -> plan.setActive(false));

        List<WorkoutPlanGenerator.PlannedDay> plannedDays =
                WorkoutPlanGenerator.planDays(request.getSplitType(), request.getDaysPerWeek());

        WorkoutPlanGenerator.Prescription prescription =
                WorkoutPlanGenerator.prescriptionFor(request.getExperienceLevel());

        WorkoutPlan plan = WorkoutPlan.builder()
                .user(user)
                .name(planName(request.getSplitType(), request.getDaysPerWeek()))
                .splitType(request.getSplitType())
                .experienceLevel(request.getExperienceLevel())
                .daysPerWeek(request.getDaysPerWeek())
                .active(true)
                .build();

        List<WorkoutPlanDay> days = new ArrayList<>();
        int dayOrder = 1;
        for (WorkoutPlanGenerator.PlannedDay plannedDay : plannedDays) {
            WorkoutPlanDay day = WorkoutPlanDay.builder()
                    .workoutPlan(plan)
                    .dayLabel(plannedDay.label())
                    .dayOrder(dayOrder++)
                    .build();

            List<Exercise> selected = selectExercises(plannedDay.muscleGroups(), request.getExperienceLevel());

            List<WorkoutPlanExercise> planExercises = new ArrayList<>();
            int exerciseOrder = 1;
            for (Exercise exercise : selected) {
                planExercises.add(WorkoutPlanExercise.builder()
                        .workoutPlanDay(day)
                        .exercise(exercise)
                        .exerciseOrder(exerciseOrder++)
                        .prescribedSets(prescription.sets())
                        .prescribedReps(prescription.reps())
                        .restSeconds(prescription.restSeconds())
                        .build());
            }
            day.setExercises(planExercises);
            days.add(day);
        }
        plan.setDays(days);

        plan = workoutPlanRepository.save(plan);
        return toResponse(plan);
    }

    @Transactional(readOnly = true)
    public WorkoutPlanResponse getActivePlan(Long userId) {
        return workoutPlanRepository.findByUserIdAndActiveTrue(userId).stream()
                .findFirst()
                .map(this::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No active workout plan yet. Generate one to get started."));
    }

    @Transactional(readOnly = true)
    public List<WorkoutPlanResponse> getAllPlans(Long userId) {
        return workoutPlanRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Picks up to MAX_EXERCISES_PER_DAY exercises covering the day's muscle
     * groups, filtered to the user's experience level and below (a beginner
     * plan only pulls beginner exercises; an advanced plan can pull from
     * the full library).
     */
    private List<Exercise> selectExercises(List<String> muscleGroups, Exercise.Difficulty experienceLevel) {
        List<Exercise> candidates = exerciseRepository.findByTargetMuscleIn(muscleGroups).stream()
                .filter(ex -> ex.getDifficulty().ordinal() <= experienceLevel.ordinal())
                .toList();

        // Prefer covering every muscle group at least once before filling remaining slots.
        Set<Exercise> selected = new LinkedHashSet<>();
        for (String muscle : muscleGroups) {
            candidates.stream()
                    .filter(ex -> ex.getTargetMuscle().equalsIgnoreCase(muscle))
                    .filter(ex -> !selected.contains(ex))
                    .findFirst()
                    .ifPresent(selected::add);
            if (selected.size() >= MAX_EXERCISES_PER_DAY) break;
        }
        for (Exercise ex : candidates) {
            if (selected.size() >= MAX_EXERCISES_PER_DAY) break;
            selected.add(ex);
        }
        return new ArrayList<>(selected);
    }

    private String planName(WorkoutPlan.SplitType splitType, int daysPerWeek) {
        String splitLabel = switch (splitType) {
            case PUSH_PULL_LEGS -> "Push/Pull/Legs";
            case UPPER_LOWER -> "Upper/Lower";
            case FULL_BODY -> "Full Body";
            case CUSTOM -> "Custom";
        };
        return splitLabel + " — " + daysPerWeek + " days/week";
    }

    private WorkoutPlanResponse toResponse(WorkoutPlan plan) {
        List<PlanDayResponse> dayResponses = plan.getDays().stream()
                .map(day -> PlanDayResponse.builder()
                        .id(day.getId())
                        .dayLabel(day.getDayLabel())
                        .dayOrder(day.getDayOrder())
                        .exercises(day.getExercises().stream()
                                .map(pe -> PlanExerciseResponse.builder()
                                        .id(pe.getId())
                                        .exerciseId(pe.getExercise().getId())
                                        .exerciseName(pe.getExercise().getName())
                                        .targetMuscle(pe.getExercise().getTargetMuscle())
                                        .prescribedSets(pe.getPrescribedSets())
                                        .prescribedReps(pe.getPrescribedReps())
                                        .restSeconds(pe.getRestSeconds())
                                        .build())
                                .toList())
                        .build())
                .toList();

        return WorkoutPlanResponse.builder()
                .id(plan.getId())
                .name(plan.getName())
                .splitType(plan.getSplitType().name())
                .experienceLevel(plan.getExperienceLevel().name())
                .daysPerWeek(plan.getDaysPerWeek())
                .active(plan.isActive())
                .days(dayResponses)
                .createdAt(plan.getCreatedAt())
                .build();
    }
}
