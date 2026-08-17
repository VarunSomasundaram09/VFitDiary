package com.vfitdiary.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CreateWorkoutLogRequest {

    @NotNull(message = "Log date is required")
    private LocalDate logDate;

    private Long workoutPlanDayId;

    private Integer durationMinutes;

    private String notes;

    @NotEmpty(message = "At least one set is required")
    @Valid
    private List<LogSetRequest> sets;
}
