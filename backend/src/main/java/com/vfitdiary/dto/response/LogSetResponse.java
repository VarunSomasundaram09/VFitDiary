package com.vfitdiary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LogSetResponse {
    private Long id;
    private Long exerciseId;
    private String exerciseName;
    private Integer setNumber;
    private BigDecimal weightKg;
    private Integer reps;
    private BigDecimal rpe;
    private BigDecimal estimated1rm;
    private String notes;
    private boolean isPersonalRecord;
}
