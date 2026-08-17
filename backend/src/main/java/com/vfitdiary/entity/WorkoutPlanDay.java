package com.vfitdiary.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "workout_plan_days")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutPlanDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_plan_id", nullable = false)
    private WorkoutPlan workoutPlan;

    @Column(name = "day_label", nullable = false, length = 100)
    private String dayLabel;

    @Column(name = "day_order", nullable = false)
    private Integer dayOrder;

    @OneToMany(mappedBy = "workoutPlanDay", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("exerciseOrder ASC")
    @Builder.Default
    private List<WorkoutPlanExercise> exercises = new ArrayList<>();
}
