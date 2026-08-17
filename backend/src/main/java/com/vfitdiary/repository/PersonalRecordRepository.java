package com.vfitdiary.repository;

import com.vfitdiary.entity.PersonalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonalRecordRepository extends JpaRepository<PersonalRecord, Long> {
    List<PersonalRecord> findByUserIdOrderByEstimated1rmDesc(Long userId);
    Optional<PersonalRecord> findByUserIdAndExerciseId(Long userId, Long exerciseId);
}
