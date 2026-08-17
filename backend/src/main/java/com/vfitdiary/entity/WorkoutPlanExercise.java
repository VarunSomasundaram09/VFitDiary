package com.vfitdiary.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workout_plan_exercises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutPlanExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_plan_day_id", nullable = false)
    private WorkoutPlanDay workoutPlanDay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "exercise_order", nullable = false)
    private Integer exerciseOrder;

    @Column(name = "prescribed_sets", nullable = false)
    private Integer prescribedSets;

    @Column(name = "prescribed_reps", nullable = false, length = 20)
    private String prescribedReps;

    @Column(name = "rest_seconds", nullable = false)
    private Integer restSeconds;
}
