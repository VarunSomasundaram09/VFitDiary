package com.vfitdiary.controller;

import com.vfitdiary.dto.request.AssessmentRequest;
import com.vfitdiary.dto.response.AssessmentResponse;
import com.vfitdiary.security.UserPrincipal;
import com.vfitdiary.service.BodyAssessmentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
@Tag(name = "Body Assessment", description = "BMI/BMR/calorie calculations and assessment history")
public class BodyAssessmentController {

    private final BodyAssessmentService bodyAssessmentService;

    @PostMapping
    public ResponseEntity<AssessmentResponse> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AssessmentRequest request
    ) {
        AssessmentResponse response = bodyAssessmentService.createAssessment(principal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/latest")
    public ResponseEntity<AssessmentResponse> getLatest(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(bodyAssessmentService.getLatestAssessment(principal.getId()));
    }

    @GetMapping("/history")
    public ResponseEntity<List<AssessmentResponse>> getHistory(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(bodyAssessmentService.getAssessmentHistory(principal.getId()));
    }
}
