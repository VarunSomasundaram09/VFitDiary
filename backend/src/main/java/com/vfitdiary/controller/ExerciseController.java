package com.vfitdiary.controller;

import com.vfitdiary.dto.response.ExerciseResponse;
import com.vfitdiary.entity.Exercise;
import com.vfitdiary.repository.ExerciseRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
@Tag(name = "Exercises", description = "The seeded exercise library")
public class ExerciseController {

    private final ExerciseRepository exerciseRepository;

    @GetMapping
    public ResponseEntity<List<ExerciseResponse>> getAll() {
        List<ExerciseResponse> exercises = exerciseRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(exercises);
    }

    private ExerciseResponse toResponse(Exercise exercise) {
        return ExerciseResponse.builder()
                .id(exercise.getId())
                .name(exercise.getName())
                .targetMuscle(exercise.getTargetMuscle())
                .secondaryMuscles(exercise.getSecondaryMuscles())
                .equipment(exercise.getEquipment())
                .difficulty(exercise.getDifficulty().name())
                .instructions(exercise.getInstructions())
                .build();
    }
}
