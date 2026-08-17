package com.vfitdiary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutPlanResponse {
    private Long id;
    private String name;
    private String splitType;
    private String experienceLevel;
    private Integer daysPerWeek;
    private boolean active;
    private List<PlanDayResponse> days;
    private LocalDateTime createdAt;
}
