package com.vfitdiary.dto.response;

import com.vfitdiary.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {
    private Integer age;
    private Profile.Gender gender;
    private BigDecimal heightCm;
    private BigDecimal currentWeightKg;
    private BigDecimal goalWeightKg;
    private Profile.ActivityLevel activityLevel;
    private Profile.FitnessGoal fitnessGoal;
    private BigDecimal bodyFatPercentage;
    private Profile.ThemePreference themePreference;
}
