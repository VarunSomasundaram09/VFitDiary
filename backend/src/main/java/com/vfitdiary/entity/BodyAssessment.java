package com.vfitdiary.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Historical snapshot of a body assessment calculation.
 * Profile holds "current state"; this table holds the full history
 * so the Progress page can chart BMI/BMR/calories trends over time.
 */
@Entity
@Table(name = "body_assessments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BodyAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Profile.Gender gender;

    @Column(name = "height_cm", nullable = false)
    private BigDecimal heightCm;

    @Column(name = "weight_kg", nullable = false)
    private BigDecimal weightKg;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level", nullable = false)
    private Profile.ActivityLevel activityLevel;

    @Column(name = "body_fat_percentage", nullable = false)
    private BigDecimal bodyFatPercentage;

    @Column(nullable = false)
    private BigDecimal bmi;

    @Column(nullable = false)
    private BigDecimal bmr;

    @Column(name = "maintenance_calories", nullable = false)
    private BigDecimal maintenanceCalories;

    @Column(name = "cut_calories", nullable = false)
    private BigDecimal cutCalories;

    @Column(name = "bulk_calories", nullable = false)
    private BigDecimal bulkCalories;

    @Column(name = "lean_body_mass_kg", nullable = false)
    private BigDecimal leanBodyMassKg;

    @Column(name = "fat_mass_kg", nullable = false)
    private BigDecimal fatMassKg;

    @Column(name = "assessed_at", nullable = false)
    @Builder.Default
    private LocalDateTime assessedAt = LocalDateTime.now();
}
