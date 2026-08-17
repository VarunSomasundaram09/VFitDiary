package com.vfitdiary.repository;

import com.vfitdiary.entity.BodyAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BodyAssessmentRepository extends JpaRepository<BodyAssessment, Long> {
    List<BodyAssessment> findByUserIdOrderByAssessedAtDesc(Long userId);
    BodyAssessment findFirstByUserIdOrderByAssessedAtDesc(Long userId);
}
