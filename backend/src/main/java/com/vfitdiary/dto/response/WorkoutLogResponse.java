package com.vfitdiary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutLogResponse {
    private Long id;
    private LocalDate logDate;
    private Integer durationMinutes;
    private String notes;
    private BigDecimal totalVolumeKg;
    private List<LogSetResponse> sets;
}
