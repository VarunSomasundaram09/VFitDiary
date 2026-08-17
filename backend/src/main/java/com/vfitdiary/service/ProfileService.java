package com.vfitdiary.service;

import com.vfitdiary.dto.response.ProfileResponse;
import com.vfitdiary.entity.Profile;
import com.vfitdiary.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    @Transactional(readOnly = true)
    public ProfileResponse getProfile(Long userId) {
        return profileRepository.findByUserId(userId)
                .map(this::toResponse)
                // No profile yet (user hasn't completed an assessment) — return an
                // empty shell rather than 404, so the frontend can render a blank form.
                .orElseGet(() -> ProfileResponse.builder().build());
    }

    private ProfileResponse toResponse(Profile profile) {
        return ProfileResponse.builder()
                .age(profile.getAge())
                .gender(profile.getGender())
                .heightCm(profile.getHeightCm())
                .currentWeightKg(profile.getCurrentWeightKg())
                .goalWeightKg(profile.getGoalWeightKg())
                .activityLevel(profile.getActivityLevel())
                .fitnessGoal(profile.getFitnessGoal())
                .bodyFatPercentage(profile.getBodyFatPercentage())
                .themePreference(profile.getThemePreference())
                .build();
    }
}
