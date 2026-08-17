package com.vfitdiary.repository;

import com.vfitdiary.entity.MotivationalQuote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MotivationalQuoteRepository extends JpaRepository<MotivationalQuote, Long> {
    List<MotivationalQuote> findByActiveTrue();
}
