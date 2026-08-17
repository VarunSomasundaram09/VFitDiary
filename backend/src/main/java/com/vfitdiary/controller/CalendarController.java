package com.vfitdiary.controller;

import com.vfitdiary.dto.response.StreakResponse;
import com.vfitdiary.dto.response.VolumeHistoryPoint;
import com.vfitdiary.security.UserPrincipal;
import com.vfitdiary.service.CalendarService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
@Tag(name = "Calendar", description = "Workout streak heatmap and streak counts")
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/heatmap")
    public ResponseEntity<List<VolumeHistoryPoint>> getHeatmap(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "365") int days
    ) {
        return ResponseEntity.ok(calendarService.getHeatmap(principal.getId(), days));
    }

    @GetMapping("/streaks")
    public ResponseEntity<StreakResponse> getStreaks(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(calendarService.getStreaks(principal.getId()));
    }
}
