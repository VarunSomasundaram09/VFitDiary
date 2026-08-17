package com.vfitdiary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanDayResponse {
    private Long id;
    private String dayLabel;
    private Integer dayOrder;
    private List<PlanExerciseResponse> exercises;
}
