package com.vfitdiary.repository;

import com.vfitdiary.entity.WorkoutPlanExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutPlanExerciseRepository extends JpaRepository<WorkoutPlanExercise, Long> {
}
