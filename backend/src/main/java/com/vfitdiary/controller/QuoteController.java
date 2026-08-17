package com.vfitdiary.controller;

import com.vfitdiary.dto.response.QuoteResponse;
import com.vfitdiary.entity.MotivationalQuote;
import com.vfitdiary.repository.MotivationalQuoteRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
@Tag(name = "Quotes", description = "Motivational quotes for the dashboard")
public class QuoteController {

    private final MotivationalQuoteRepository motivationalQuoteRepository;

    @GetMapping("/random")
    public ResponseEntity<QuoteResponse> getRandom() {
        List<MotivationalQuote> quotes = motivationalQuoteRepository.findByActiveTrue();

        if (quotes.isEmpty()) {
            return ResponseEntity.ok(
                    QuoteResponse.builder()
                            .text("Small steps every day lead to big changes.")
                            .author(null)
                            .build()
            );
        }

        MotivationalQuote picked = quotes.get(ThreadLocalRandom.current().nextInt(quotes.size()));
        return ResponseEntity.ok(
                QuoteResponse.builder()
                        .text(picked.getQuoteText())
                        .author(picked.getAuthor())
                        .build()
        );
    }
}
