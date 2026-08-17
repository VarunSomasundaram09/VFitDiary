package com.vfitdiary.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Pure training-metric calculations, kept separate from the service layer
 * for testability — same pattern as BodyCompositionCalculator.
 */
public final class TrainingCalculator {

    private TrainingCalculator() {}

    /**
     * Epley formula: 1RM = weight * (1 + reps / 30).
     * At reps == 1, this returns the weight itself (no extrapolation needed).
     */
    public static BigDecimal estimateOneRepMax(BigDecimal weightKg, int reps) {
        if (reps <= 1) {
            return weightKg.setScale(2, RoundingMode.HALF_UP);
        }
        BigDecimal repFactor = BigDecimal.ONE.add(
                BigDecimal.valueOf(reps).divide(BigDecimal.valueOf(30), 6, RoundingMode.HALF_UP));
        return weightKg.multiply(repFactor).setScale(2, RoundingMode.HALF_UP);
    }
}
