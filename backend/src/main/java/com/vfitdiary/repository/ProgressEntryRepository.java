package com.vfitdiary.repository;

import com.vfitdiary.entity.ProgressEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProgressEntryRepository extends JpaRepository<ProgressEntry, Long> {
    List<ProgressEntry> findByUserIdOrderByEntryDateAsc(Long userId);
    Optional<ProgressEntry> findByUserIdAndEntryDate(Long userId, LocalDate entryDate);
    List<ProgressEntry> findByUserIdAndEntryDateBetweenOrderByEntryDateAsc(
            Long userId, LocalDate start, LocalDate end);
}
