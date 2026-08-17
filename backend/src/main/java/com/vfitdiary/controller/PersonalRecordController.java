package com.vfitdiary.controller;

import com.vfitdiary.dto.response.PersonalRecordResponse;
import com.vfitdiary.security.UserPrincipal;
import com.vfitdiary.service.PersonalRecordService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/personal-records")
@RequiredArgsConstructor
@Tag(name = "Personal Records", description = "Best lifts per exercise")
public class PersonalRecordController {

    private final PersonalRecordService personalRecordService;

    @GetMapping
    public ResponseEntity<List<PersonalRecordResponse>> getAll(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(personalRecordService.getAll(principal.getId()));
    }
}
