package com.vfitdiary.dto.request;

import com.vfitdiary.entity.Exercise;
import com.vfitdiary.entity.WorkoutPlan;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeneratePlanRequest {

    @NotNull(message = "Split type is required")
    private WorkoutPlan.SplitType splitType;

    @NotNull(message = "Experience level is required")
    private Exercise.Difficulty experienceLevel;

    @NotNull(message = "Days per week is required")
    @Min(value = 2, message = "Choose at least 2 days per week")
    @Max(value = 6, message = "Choose at most 6 days per week")
    private Integer daysPerWeek;
}
