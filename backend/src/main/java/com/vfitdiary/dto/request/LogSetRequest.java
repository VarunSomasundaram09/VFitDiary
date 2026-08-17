package com.vfitdiary.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class LogSetRequest {

    @NotNull(message = "Exercise is required")
    private Long exerciseId;

    @NotNull(message = "Set number is required")
    @Min(value = 1, message = "Set number must be at least 1")
    private Integer setNumber;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Weight must be greater than 0")
    @DecimalMax(value = "500.0", message = "Enter a realistic weight")
    private BigDecimal weightKg;

    @NotNull(message = "Reps is required")
    @Min(value = 1, message = "Reps must be at least 1")
    @Max(value = 100, message = "Enter a realistic rep count")
    private Integer reps;

    @DecimalMin(value = "1.0", message = "RPE must be between 1 and 10")
    @DecimalMax(value = "10.0", message = "RPE must be between 1 and 10")
    private BigDecimal rpe;

    @Size(max = 255, message = "Notes must be under 255 characters")
    private String notes;
}
