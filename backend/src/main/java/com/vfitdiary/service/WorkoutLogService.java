package com.vfitdiary.service;

import com.vfitdiary.dto.request.CreateWorkoutLogRequest;
import com.vfitdiary.dto.request.LogSetRequest;
import com.vfitdiary.dto.response.LogSetResponse;
import com.vfitdiary.dto.response.PreviousSetResponse;
import com.vfitdiary.dto.response.WorkoutLogResponse;
import com.vfitdiary.entity.*;
import com.vfitdiary.exception.ResourceNotFoundException;
import com.vfitdiary.repository.*;
import com.vfitdiary.util.TrainingCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WorkoutLogService {

    private final WorkoutLogRepository workoutLogRepository;
    private final WorkoutLogSetRepository workoutLogSetRepository;
    private final ExerciseRepository exerciseRepository;
    private final PersonalRecordRepository personalRecordRepository;
    private final WorkoutCalendarRepository workoutCalendarRepository;
    private final WorkoutPlanDayRepository workoutPlanDayRepository;
    private final UserRepository userRepository;

    @Transactional
    public WorkoutLogResponse createLog(Long userId, CreateWorkoutLogRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        WorkoutPlanDay planDay = null;
        if (request.getWorkoutPlanDayId() != null) {
            planDay = workoutPlanDayRepository.findById(request.getWorkoutPlanDayId())
                    .orElseThrow(() -> new ResourceNotFoundException("Workout plan day not found"));
        }

        WorkoutLog log = WorkoutLog.builder()
                .user(user)
                .workoutPlanDay(planDay)
                .logDate(request.getLogDate())
                .durationMinutes(request.getDurationMinutes())
                .notes(request.getNotes())
                .build();

        // Cache exercises fetched during this request to avoid duplicate lookups.
        Map<Long, Exercise> exerciseCache = new java.util.HashMap<>();

        List<WorkoutLogSet> sets = new ArrayList<>();
        List<Boolean> personalRecordFlags = new ArrayList<>();
        BigDecimal totalVolume = BigDecimal.ZERO;

        for (LogSetRequest setRequest : request.getSets()) {
            Exercise exercise = exerciseCache.computeIfAbsent(setRequest.getExerciseId(), id ->
                    exerciseRepository.findById(id)
                            .orElseThrow(() -> new ResourceNotFoundException("Exercise not found: " + id)));

            BigDecimal estimated1rm = TrainingCalculator.estimateOneRepMax(setRequest.getWeightKg(), setRequest.getReps());

            WorkoutLogSet set = WorkoutLogSet.builder()
                    .workoutLog(log)
                    .exercise(exercise)
                    .setNumber(setRequest.getSetNumber())
                    .weightKg(setRequest.getWeightKg())
                    .reps(setRequest.getReps())
                    .rpe(setRequest.getRpe())
                    .estimated1rm(estimated1rm)
                    .notes(setRequest.getNotes())
                    .build();
            sets.add(set);

            totalVolume = totalVolume.add(setRequest.getWeightKg().multiply(BigDecimal.valueOf(setRequest.getReps())));
        }

        log.setSets(sets);
        log.setTotalVolumeKg(totalVolume);
        log = workoutLogRepository.save(log);

        // Update personal records after the log (and its sets) has an ID.
        for (WorkoutLogSet set : log.getSets()) {
            personalRecordFlags.add(updatePersonalRecordIfBetter(user, set));
        }

        updateCalendar(user, request.getLogDate(), totalVolume);

        return toResponse(log, personalRecordFlags);
    }

    @Transactional(readOnly = true)
    public List<WorkoutLogResponse> getRecentLogs(Long userId) {
        return workoutLogRepository.findTop20ByUserIdOrderByLogDateDesc(userId).stream()
                .map(l -> toResponse(l, null))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<WorkoutLogResponse> getLogsOnDate(Long userId, LocalDate date) {
        return workoutLogRepository.findByUserIdAndLogDate(userId, date).stream()
                .map(l -> toResponse(l, null))
                .toList();
    }

    @Transactional(readOnly = true)
    public PreviousSetResponse getPreviousSet(Long userId, Long exerciseId) {
        List<WorkoutLogSet> recent = workoutLogSetRepository
                .findTop10ByWorkoutLog_User_IdAndExercise_IdOrderByWorkoutLog_LogDateDesc(userId, exerciseId);

        if (recent.isEmpty()) {
            return PreviousSetResponse.builder().hasPrevious(false).build();
        }

        WorkoutLogSet mostRecent = recent.get(0);
        return PreviousSetResponse.builder()
                .hasPrevious(true)
                .weightKg(mostRecent.getWeightKg())
                .reps(mostRecent.getReps())
                .loggedOn(mostRecent.getWorkoutLog().getLogDate())
                .build();
    }

    private boolean updatePersonalRecordIfBetter(User user, WorkoutLogSet set) {
        PersonalRecord existing = personalRecordRepository
                .findByUserIdAndExerciseId(user.getId(), set.getExercise().getId())
                .orElse(null);

        if (existing == null || set.getEstimated1rm().compareTo(existing.getEstimated1rm()) > 0) {
            PersonalRecord record = existing != null ? existing : PersonalRecord.builder()
                    .user(user)
                    .exercise(set.getExercise())
                    .build();

            record.setBestWeightKg(set.getWeightKg());
            record.setBestReps(set.getReps());
            record.setEstimated1rm(set.getEstimated1rm());
            record.setAchievedAt(set.getWorkoutLog().getLogDate());
            record.setWorkoutLogSet(set);

            personalRecordRepository.save(record);
            return true;
        }
        return false;
    }

    private void updateCalendar(User user, LocalDate date, BigDecimal volume) {
        WorkoutCalendar entry = workoutCalendarRepository.findByUserIdAndActivityDate(user.getId(), date)
                .orElseGet(() -> WorkoutCalendar.builder()
                        .user(user)
                        .activityDate(date)
                        .workoutCount(0)
                        .totalVolumeKg(BigDecimal.ZERO)
                        .build());

        entry.setWorkoutCount(entry.getWorkoutCount() + 1);
        entry.setTotalVolumeKg(
                (entry.getTotalVolumeKg() != null ? entry.getTotalVolumeKg() : BigDecimal.ZERO).add(volume));

        workoutCalendarRepository.save(entry);
    }

    private WorkoutLogResponse toResponse(WorkoutLog log, List<Boolean> personalRecordFlags) {
        List<LogSetResponse> setResponses = new ArrayList<>();
        List<WorkoutLogSet> sets = log.getSets();
        for (int i = 0; i < sets.size(); i++) {
            WorkoutLogSet set = sets.get(i);
            boolean isPr = personalRecordFlags != null && i < personalRecordFlags.size() && personalRecordFlags.get(i);
            setResponses.add(LogSetResponse.builder()
                    .id(set.getId())
                    .exerciseId(set.getExercise().getId())
                    .exerciseName(set.getExercise().getName())
                    .setNumber(set.getSetNumber())
                    .weightKg(set.getWeightKg())
                    .reps(set.getReps())
                    .rpe(set.getRpe())
                    .estimated1rm(set.getEstimated1rm())
                    .notes(set.getNotes())
                    .isPersonalRecord(isPr)
                    .build());
        }

        return WorkoutLogResponse.builder()
                .id(log.getId())
                .logDate(log.getLogDate())
                .durationMinutes(log.getDurationMinutes())
                .notes(log.getNotes())
                .totalVolumeKg(log.getTotalVolumeKg())
                .sets(setResponses)
                .build();
    }
}
