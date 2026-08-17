package com.vfitdiary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseResponse {
    private Long id;
    private String name;
    private String targetMuscle;
    private String secondaryMuscles;
    private String equipment;
    private String difficulty;
    private String instructions;
}
