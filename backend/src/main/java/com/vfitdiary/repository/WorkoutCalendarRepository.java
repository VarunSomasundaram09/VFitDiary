package com.vfitdiary.repository;

import com.vfitdiary.entity.WorkoutCalendar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WorkoutCalendarRepository extends JpaRepository<WorkoutCalendar, Long> {
    List<WorkoutCalendar> findByUserIdAndActivityDateBetweenOrderByActivityDateAsc(
            Long userId, LocalDate start, LocalDate end);
    Optional<WorkoutCalendar> findByUserIdAndActivityDate(Long userId, LocalDate date);
    List<WorkoutCalendar> findByUserIdOrderByActivityDateDesc(Long userId);
}
