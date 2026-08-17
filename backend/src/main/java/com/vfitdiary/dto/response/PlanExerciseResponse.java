package com.vfitdiary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanExerciseResponse {
    private Long id;
    private Long exerciseId;
    private String exerciseName;
    private String targetMuscle;
    private Integer prescribedSets;
    private String prescribedReps;
    private Integer restSeconds;
}
