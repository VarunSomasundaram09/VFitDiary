package com.vfitdiary.util;

import com.vfitdiary.entity.Profile;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Pure calculation logic for body composition metrics. Kept separate from
 * the service layer so the formulas are easy to unit test in isolation.
 *
 * Formulas used:
 * - BMI = weight(kg) / height(m)^2
 * - Lean body mass = weight * (1 - bodyFat% / 100)
 * - Fat mass = weight * (bodyFat% / 100)
 * - BMR (Katch-McArdle, chosen because we already have body-fat% from the
 *   assessment, which is more accurate than Mifflin-St Jeor's height/weight
 *   estimate): BMR = 370 + (21.6 * leanBodyMassKg)
 * - Maintenance calories = BMR * activity multiplier
 * - Cut calories = maintenance - 20%
 * - Bulk calories = maintenance + 12%
 */
public final class BodyCompositionCalculator {

    private BodyCompositionCalculator() {}

    public static BigDecimal calculateBmi(BigDecimal weightKg, BigDecimal heightCm) {
        BigDecimal heightM = heightCm.divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
        BigDecimal heightSquared = heightM.multiply(heightM);
        return weightKg.divide(heightSquared, 1, RoundingMode.HALF_UP);
    }

    public static BigDecimal calculateLeanBodyMass(BigDecimal weightKg, BigDecimal bodyFatPercentage) {
        BigDecimal fatFraction = bodyFatPercentage.divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
        BigDecimal leanFraction = BigDecimal.ONE.subtract(fatFraction);
        return weightKg.multiply(leanFraction).setScale(2, RoundingMode.HALF_UP);
    }

    public static BigDecimal calculateFatMass(BigDecimal weightKg, BigDecimal bodyFatPercentage) {
        BigDecimal fatFraction = bodyFatPercentage.divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
        return weightKg.multiply(fatFraction).setScale(2, RoundingMode.HALF_UP);
    }

    public static BigDecimal calculateBmr(BigDecimal leanBodyMassKg) {
        // BMR = 370 + (21.6 * lean body mass in kg)
        return BigDecimal.valueOf(370)
                .add(BigDecimal.valueOf(21.6).multiply(leanBodyMassKg))
                .setScale(1, RoundingMode.HALF_UP);
    }

    public static BigDecimal activityMultiplier(Profile.ActivityLevel activityLevel) {
        return switch (activityLevel) {
            case SEDENTARY -> BigDecimal.valueOf(1.2);
            case LIGHT -> BigDecimal.valueOf(1.375);
            case MODERATE -> BigDecimal.valueOf(1.55);
            case ACTIVE -> BigDecimal.valueOf(1.725);
            case VERY_ACTIVE -> BigDecimal.valueOf(1.9);
        };
    }

    public static BigDecimal calculateMaintenanceCalories(BigDecimal bmr, Profile.ActivityLevel activityLevel) {
        return bmr.multiply(activityMultiplier(activityLevel)).setScale(1, RoundingMode.HALF_UP);
    }

    public static BigDecimal calculateCutCalories(BigDecimal maintenanceCalories) {
        // 20% deficit — a moderate, sustainable cut rate
        return maintenanceCalories.multiply(BigDecimal.valueOf(0.8)).setScale(1, RoundingMode.HALF_UP);
    }

    public static BigDecimal calculateBulkCalories(BigDecimal maintenanceCalories) {
        // 12% surplus — favors lean gain over excessive fat gain
        return maintenanceCalories.multiply(BigDecimal.valueOf(1.12)).setScale(1, RoundingMode.HALF_UP);
    }
}
