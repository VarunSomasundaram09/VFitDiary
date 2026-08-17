package com.vfitdiary.service;

import com.vfitdiary.dto.request.LogWeightRequest;
import com.vfitdiary.dto.response.ProgressEntryResponse;
import com.vfitdiary.dto.response.VolumeHistoryPoint;
import com.vfitdiary.entity.ProgressEntry;
import com.vfitdiary.entity.User;
import com.vfitdiary.entity.WorkoutCalendar;
import com.vfitdiary.exception.ResourceNotFoundException;
import com.vfitdiary.repository.ProgressEntryRepository;
import com.vfitdiary.repository.UserRepository;
import com.vfitdiary.repository.WorkoutCalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final ProgressEntryRepository progressEntryRepository;
    private final WorkoutCalendarRepository workoutCalendarRepository;
    private final UserRepository userRepository;

    @Transactional
    public ProgressEntryResponse logWeight(Long userId, LogWeightRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        LocalDate entryDate = request.getEntryDate() != null ? request.getEntryDate() : LocalDate.now();

        ProgressEntry entry = progressEntryRepository.findByUserIdAndEntryDate(userId, entryDate)
                .orElseGet(() -> ProgressEntry.builder().user(user).entryDate(entryDate).build());

        entry.setWeightKg(request.getWeightKg());
        entry.setBodyFatPercentage(request.getBodyFatPercentage());
        entry.setNotes(request.getNotes());

        entry = progressEntryRepository.save(entry);
        return toResponse(entry);
    }

    @Transactional(readOnly = true)
    public List<ProgressEntryResponse> getWeightHistory(Long userId) {
        return progressEntryRepository.findByUserIdOrderByEntryDateAsc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<VolumeHistoryPoint> getVolumeHistory(Long userId, int days) {
        LocalDate start = LocalDate.now().minusDays(days);
        LocalDate end = LocalDate.now();

        return workoutCalendarRepository
                .findByUserIdAndActivityDateBetweenOrderByActivityDateAsc(userId, start, end)
                .stream()
                .map(this::toVolumePoint)
                .toList();
    }

    private ProgressEntryResponse toResponse(ProgressEntry entry) {
        return ProgressEntryResponse.builder()
                .id(entry.getId())
                .entryDate(entry.getEntryDate())
                .weightKg(entry.getWeightKg())
                .bodyFatPercentage(entry.getBodyFatPercentage())
                .notes(entry.getNotes())
                .build();
    }

    private VolumeHistoryPoint toVolumePoint(WorkoutCalendar entry) {
        return VolumeHistoryPoint.builder()
                .date(entry.getActivityDate())
                .totalVolumeKg(entry.getTotalVolumeKg())
                .workoutCount(entry.getWorkoutCount())
                .build();
    }
}
