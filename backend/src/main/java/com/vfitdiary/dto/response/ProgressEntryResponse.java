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
public class ProgressEntryResponse {
    private Long id;
    private LocalDate entryDate;
    private BigDecimal weightKg;
    private BigDecimal bodyFatPercentage;
    private String notes;
}
