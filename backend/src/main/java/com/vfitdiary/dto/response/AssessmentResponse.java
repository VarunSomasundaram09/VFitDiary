package com.vfitdiary.dto.response;

import com.vfitdiary.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentResponse {
    private Long id;
    private Integer age;
    private Profile.Gender gender;
    private BigDecimal heightCm;
    private BigDecimal weightKg;
    private BigDecimal goalWeightKg;
    private Profile.ActivityLevel activityLevel;
    private Profile.FitnessGoal fitnessGoal;
    private BigDecimal bodyFatPercentage;

    private BigDecimal bmi;
    private String bmiCategory;
    private BigDecimal bmr;
    private BigDecimal maintenanceCalories;
    private BigDecimal cutCalories;
    private BigDecimal bulkCalories;
    private BigDecimal leanBodyMassKg;
    private BigDecimal fatMassKg;

    private LocalDateTime assessedAt;
}
