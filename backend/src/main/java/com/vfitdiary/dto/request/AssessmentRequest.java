package com.vfitdiary.dto.request;

import com.vfitdiary.entity.Profile;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AssessmentRequest {

    @NotNull(message = "Age is required")
    @Min(value = 13, message = "Age must be at least 13")
    @Max(value = 100, message = "Age must be realistic")
    private Integer age;

    @NotNull(message = "Gender is required")
    private Profile.Gender gender;

    @NotNull(message = "Height is required")
    @DecimalMin(value = "100.0", message = "Height must be at least 100 cm")
    @DecimalMax(value = "250.0", message = "Height must be realistic")
    private BigDecimal heightCm;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "30.0", message = "Weight must be at least 30 kg")
    @DecimalMax(value = "300.0", message = "Weight must be realistic")
    private BigDecimal weightKg;

    @DecimalMin(value = "30.0", message = "Goal weight must be at least 30 kg")
    @DecimalMax(value = "300.0", message = "Goal weight must be realistic")
    private BigDecimal goalWeightKg;

    @NotNull(message = "Activity level is required")
    private Profile.ActivityLevel activityLevel;

    @NotNull(message = "Fitness goal is required")
    private Profile.FitnessGoal fitnessGoal;

    @NotNull(message = "Body fat percentage is required")
    @DecimalMin(value = "3.0", message = "Body fat percentage must be realistic")
    @DecimalMax(value = "60.0", message = "Body fat percentage must be realistic")
    private BigDecimal bodyFatPercentage;
}
