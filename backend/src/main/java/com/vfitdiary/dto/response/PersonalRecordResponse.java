package com.vfitdiary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonalRecordResponse {
    private Long id;
    private Long exerciseId;
    private String exerciseName;
    private String targetMuscle;
    private BigDecimal bestWeightKg;
    private Integer bestReps;
    private BigDecimal estimated1rm;
    private LocalDate achievedAt;
}
