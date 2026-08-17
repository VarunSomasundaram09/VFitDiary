package com.vfitdiary.repository;

import com.vfitdiary.entity.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {
    List<WorkoutLog> findByUserIdOrderByLogDateDesc(Long userId);
    List<WorkoutLog> findTop20ByUserIdOrderByLogDateDesc(Long userId);
    List<WorkoutLog> findByUserIdAndLogDateBetween(Long userId, LocalDate start, LocalDate end);
    List<WorkoutLog> findByUserIdAndLogDate(Long userId, LocalDate logDate);
}
