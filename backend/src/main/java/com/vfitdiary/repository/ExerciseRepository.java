package com.vfitdiary.repository;

import com.vfitdiary.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByTargetMuscleIgnoreCase(String targetMuscle);
    List<Exercise> findByDifficulty(Exercise.Difficulty difficulty);
    List<Exercise> findByTargetMuscleIn(List<String> targetMuscles);
}
