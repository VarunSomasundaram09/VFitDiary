package com.vfitdiary.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "height_cm")
    private BigDecimal heightCm;

    @Column(name = "current_weight_kg")
    private BigDecimal currentWeightKg;

    @Column(name = "goal_weight_kg")
    private BigDecimal goalWeightKg;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level")
    private ActivityLevel activityLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "fitness_goal")
    private FitnessGoal fitnessGoal;

    @Column(name = "body_fat_percentage")
    private BigDecimal bodyFatPercentage;

    @Column(name = "profile_image_url", length = 500)
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme_preference", nullable = false)
    @Builder.Default
    private ThemePreference themePreference = ThemePreference.SYSTEM;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum Gender { MALE, FEMALE, OTHER }
    public enum ActivityLevel { SEDENTARY, LIGHT, MODERATE, ACTIVE, VERY_ACTIVE }
    public enum FitnessGoal { CUT, MAINTAIN, BULK }
    public enum ThemePreference { LIGHT, DARK, SYSTEM }
}
