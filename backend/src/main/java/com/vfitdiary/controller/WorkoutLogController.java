package com.vfitdiary.controller;

import com.vfitdiary.dto.request.CreateWorkoutLogRequest;
import com.vfitdiary.dto.response.PreviousSetResponse;
import com.vfitdiary.dto.response.WorkoutLogResponse;
import com.vfitdiary.security.UserPrincipal;
import com.vfitdiary.service.WorkoutLogService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/workout-logs")
@RequiredArgsConstructor
@Tag(name = "Workout Tracker", description = "Log sets, track PRs, and view training history")
public class WorkoutLogController {

    private final WorkoutLogService workoutLogService;

    @PostMapping
    public ResponseEntity<WorkoutLogResponse> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateWorkoutLogRequest request
    ) {
        WorkoutLogResponse response = workoutLogService.createLog(principal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/on/{date}")
    public ResponseEntity<List<WorkoutLogResponse>> getOnDate(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(workoutLogService.getLogsOnDate(principal.getId(), date));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<WorkoutLogResponse>> getRecent(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(workoutLogService.getRecentLogs(principal.getId()));
    }

    @GetMapping("/exercises/{exerciseId}/previous")
    public ResponseEntity<PreviousSetResponse> getPreviousSet(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long exerciseId
    ) {
        return ResponseEntity.ok(workoutLogService.getPreviousSet(principal.getId(), exerciseId));
    }
}
