package com.vfitdiary.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class LogWeightRequest {

    private LocalDate entryDate;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "30.0", message = "Enter a realistic weight")
    @DecimalMax(value = "300.0", message = "Enter a realistic weight")
    private BigDecimal weightKg;

    @DecimalMin(value = "3.0", message = "Enter a realistic body fat percentage")
    @DecimalMax(value = "60.0", message = "Enter a realistic body fat percentage")
    private BigDecimal bodyFatPercentage;

    private String notes;
}
