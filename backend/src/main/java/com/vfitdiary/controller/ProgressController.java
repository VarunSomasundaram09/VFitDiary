package com.vfitdiary.controller;

import com.vfitdiary.dto.request.LogWeightRequest;
import com.vfitdiary.dto.response.ProgressEntryResponse;
import com.vfitdiary.dto.response.VolumeHistoryPoint;
import com.vfitdiary.security.UserPrincipal;
import com.vfitdiary.service.ProgressService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
@Tag(name = "Progress", description = "Weight tracking and workout volume history")
public class ProgressController {

    private final ProgressService progressService;

    @PostMapping("/weight")
    public ResponseEntity<ProgressEntryResponse> logWeight(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody LogWeightRequest request
    ) {
        ProgressEntryResponse response = progressService.logWeight(principal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/weight-history")
    public ResponseEntity<List<ProgressEntryResponse>> getWeightHistory(
            @AuthenticationPrincipal UserPrincipal principal
    ) {
        return ResponseEntity.ok(progressService.getWeightHistory(principal.getId()));
    }

    @GetMapping("/volume-history")
    public ResponseEntity<List<VolumeHistoryPoint>> getVolumeHistory(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "90") int days
    ) {
        return ResponseEntity.ok(progressService.getVolumeHistory(principal.getId(), days));
    }
}
