package com.vfitdiary.service;

import com.vfitdiary.dto.response.PersonalRecordResponse;
import com.vfitdiary.entity.PersonalRecord;
import com.vfitdiary.repository.PersonalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonalRecordService {

    private final PersonalRecordRepository personalRecordRepository;

    @Transactional(readOnly = true)
    public List<PersonalRecordResponse> getAll(Long userId) {
        return personalRecordRepository.findByUserIdOrderByEstimated1rmDesc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    private PersonalRecordResponse toResponse(PersonalRecord record) {
        return PersonalRecordResponse.builder()
                .id(record.getId())
                .exerciseId(record.getExercise().getId())
                .exerciseName(record.getExercise().getName())
                .targetMuscle(record.getExercise().getTargetMuscle())
                .bestWeightKg(record.getBestWeightKg())
                .bestReps(record.getBestReps())
                .estimated1rm(record.getEstimated1rm())
                .achievedAt(record.getAchievedAt())
                .build();
    }
}
