package com.vfitdiary.service;

import com.vfitdiary.dto.response.StreakResponse;
import com.vfitdiary.dto.response.VolumeHistoryPoint;
import com.vfitdiary.entity.WorkoutCalendar;
import com.vfitdiary.repository.WorkoutCalendarRepository;
import com.vfitdiary.util.CalendarStreakCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final WorkoutCalendarRepository workoutCalendarRepository;

    @Transactional(readOnly = true)
    public List<VolumeHistoryPoint> getHeatmap(Long userId, int days) {
        LocalDate start = LocalDate.now().minusDays(days);
        LocalDate end = LocalDate.now();

        return workoutCalendarRepository
                .findByUserIdAndActivityDateBetweenOrderByActivityDateAsc(userId, start, end)
                .stream()
                .map(this::toPoint)
                .toList();
    }

    @Transactional(readOnly = true)
    public StreakResponse getStreaks(Long userId) {
        List<LocalDate> activityDates = workoutCalendarRepository.findByUserIdOrderByActivityDateDesc(userId)
                .stream()
                .map(WorkoutCalendar::getActivityDate)
                .sorted()
                .toList();

        CalendarStreakCalculator.Streaks streaks =
                CalendarStreakCalculator.calculate(activityDates, LocalDate.now());

        return StreakResponse.builder()
                .currentStreak(streaks.currentStreak())
                .longestStreak(streaks.longestStreak())
                .build();
    }

    private VolumeHistoryPoint toPoint(WorkoutCalendar entry) {
        return VolumeHistoryPoint.builder()
                .date(entry.getActivityDate())
                .totalVolumeKg(entry.getTotalVolumeKg())
                .workoutCount(entry.getWorkoutCount())
                .build();
    }
}
