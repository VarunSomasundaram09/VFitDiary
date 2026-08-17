package com.vfitdiary.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "personal_records",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "exercise_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "best_weight_kg", nullable = false)
    private BigDecimal bestWeightKg;

    @Column(name = "best_reps", nullable = false)
    private Integer bestReps;

    @Column(name = "estimated_1rm", nullable = false)
    private BigDecimal estimated1rm;

    @Column(name = "achieved_at", nullable = false)
    private LocalDate achievedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_log_set_id")
    private WorkoutLogSet workoutLogSet;
}
