package com.vfitdiary.controller;

import com.vfitdiary.dto.request.GeneratePlanRequest;
import com.vfitdiary.dto.response.WorkoutPlanResponse;
import com.vfitdiary.security.UserPrincipal;
import com.vfitdiary.service.WorkoutPlanService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout-plans")
@RequiredArgsConstructor
@Tag(name = "Workout Plans", description = "Generate and retrieve workout split plans")
public class WorkoutPlanController {

    private final WorkoutPlanService workoutPlanService;

    @PostMapping("/generate")
    public ResponseEntity<WorkoutPlanResponse> generate(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody GeneratePlanRequest request
    ) {
        WorkoutPlanResponse response = workoutPlanService.generatePlan(principal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/active")
    public ResponseEntity<WorkoutPlanResponse> getActive(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(workoutPlanService.getActivePlan(principal.getId()));
    }

    @GetMapping
    public ResponseEntity<List<WorkoutPlanResponse>> getAll(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(workoutPlanService.getAllPlans(principal.getId()));
    }
}
