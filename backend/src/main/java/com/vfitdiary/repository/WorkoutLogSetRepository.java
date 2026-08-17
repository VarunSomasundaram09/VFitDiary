package com.vfitdiary.repository;

import com.vfitdiary.entity.WorkoutLogSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutLogSetRepository extends JpaRepository<WorkoutLogSet, Long> {
    List<WorkoutLogSet> findByWorkoutLogId(Long workoutLogId);

    // Most recent sets logged for a given exercise by a given user — used to
    // show "previous weight / previous reps" in the tracker.
    List<WorkoutLogSet> findTop10ByWorkoutLog_User_IdAndExercise_IdOrderByWorkoutLog_LogDateDesc(
            Long userId, Long exerciseId);
}
