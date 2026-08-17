package com.vfitdiary.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Denormalized day-level activity marker. Powers the GitHub-style
 * heatmap and streak calculations without scanning workout_logs.
 */
@Entity
@Table(name = "workout_calendar",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "activity_date"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "activity_date", nullable = false)
    private LocalDate activityDate;

    @Column(name = "workout_count", nullable = false)
    @Builder.Default
    private Integer workoutCount = 1;

    @Column(name = "total_volume_kg")
    private BigDecimal totalVolumeKg;
}
