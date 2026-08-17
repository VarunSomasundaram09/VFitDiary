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
public class PreviousSetResponse {
    private boolean hasPrevious;
    private BigDecimal weightKg;
    private Integer reps;
    private LocalDate loggedOn;
}
