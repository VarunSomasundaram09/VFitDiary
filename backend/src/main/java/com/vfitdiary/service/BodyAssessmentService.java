package com.vfitdiary.service;

import com.vfitdiary.dto.request.AssessmentRequest;
import com.vfitdiary.dto.response.AssessmentResponse;
import com.vfitdiary.entity.BodyAssessment;
import com.vfitdiary.entity.Profile;
import com.vfitdiary.entity.User;
import com.vfitdiary.exception.ResourceNotFoundException;
import com.vfitdiary.repository.BodyAssessmentRepository;
import com.vfitdiary.repository.ProfileRepository;
import com.vfitdiary.repository.UserRepository;
import com.vfitdiary.util.BodyCompositionCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BodyAssessmentService {

    private final BodyAssessmentRepository bodyAssessmentRepository;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Transactional
    public AssessmentResponse createAssessment(Long userId, AssessmentRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        BigDecimal bmi = BodyCompositionCalculator.calculateBmi(request.getWeightKg(), request.getHeightCm());
        BigDecimal leanBodyMass = BodyCompositionCalculator.calculateLeanBodyMass(
                request.getWeightKg(), request.getBodyFatPercentage());
        BigDecimal fatMass = BodyCompositionCalculator.calculateFatMass(
                request.getWeightKg(), request.getBodyFatPercentage());
        BigDecimal bmr = BodyCompositionCalculator.calculateBmr(leanBodyMass);
        BigDecimal maintenanceCalories = BodyCompositionCalculator.calculateMaintenanceCalories(
                bmr, request.getActivityLevel());
        BigDecimal cutCalories = BodyCompositionCalculator.calculateCutCalories(maintenanceCalories);
        BigDecimal bulkCalories = BodyCompositionCalculator.calculateBulkCalories(maintenanceCalories);

        BodyAssessment assessment = BodyAssessment.builder()
                .user(user)
                .age(request.getAge())
                .gender(request.getGender())
                .heightCm(request.getHeightCm())
                .weightKg(request.getWeightKg())
                .activityLevel(request.getActivityLevel())
                .bodyFatPercentage(request.getBodyFatPercentage())
                .bmi(bmi)
                .bmr(bmr)
                .maintenanceCalories(maintenanceCalories)
                .cutCalories(cutCalories)
                .bulkCalories(bulkCalories)
                .leanBodyMassKg(leanBodyMass)
                .fatMassKg(fatMass)
                .build();
        assessment = bodyAssessmentRepository.save(assessment);

        upsertProfile(user, request);

        return toResponse(assessment, request.getGoalWeightKg(), request.getFitnessGoal());
    }

    @Transactional(readOnly = true)
    public AssessmentResponse getLatestAssessment(Long userId) {
        BodyAssessment latest = bodyAssessmentRepository.findFirstByUserIdOrderByAssessedAtDesc(userId);
        if (latest == null) {
            throw new ResourceNotFoundException("No assessment found yet. Complete your first assessment.");
        }
        Profile profile = profileRepository.findByUserId(userId).orElse(null);
        BigDecimal goalWeight = profile != null ? profile.getGoalWeightKg() : null;
        Profile.FitnessGoal goal = profile != null ? profile.getFitnessGoal() : null;
        return toResponse(latest, goalWeight, goal);
    }

    @Transactional(readOnly = true)
    public List<AssessmentResponse> getAssessmentHistory(Long userId) {
        Profile profile = profileRepository.findByUserId(userId).orElse(null);
        BigDecimal goalWeight = profile != null ? profile.getGoalWeightKg() : null;
        Profile.FitnessGoal goal = profile != null ? profile.getFitnessGoal() : null;

        return bodyAssessmentRepository.findByUserIdOrderByAssessedAtDesc(userId).stream()
                .map(a -> toResponse(a, goalWeight, goal))
                .toList();
    }

    private void upsertProfile(User user, AssessmentRequest request) {
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseGet(() -> Profile.builder().user(user).build());

        profile.setAge(request.getAge());
        profile.setGender(request.getGender());
        profile.setHeightCm(request.getHeightCm());
        profile.setCurrentWeightKg(request.getWeightKg());
        profile.setGoalWeightKg(request.getGoalWeightKg());
        profile.setActivityLevel(request.getActivityLevel());
        profile.setFitnessGoal(request.getFitnessGoal());
        profile.setBodyFatPercentage(request.getBodyFatPercentage());

        profileRepository.save(profile);
    }

    private AssessmentResponse toResponse(BodyAssessment a, BigDecimal goalWeightKg, Profile.FitnessGoal fitnessGoal) {
        return AssessmentResponse.builder()
                .id(a.getId())
                .age(a.getAge())
                .gender(a.getGender())
                .heightCm(a.getHeightCm())
                .weightKg(a.getWeightKg())
                .goalWeightKg(goalWeightKg)
                .activityLevel(a.getActivityLevel())
                .fitnessGoal(fitnessGoal)
                .bodyFatPercentage(a.getBodyFatPercentage())
                .bmi(a.getBmi())
                .bmiCategory(bmiCategory(a.getBmi()))
                .bmr(a.getBmr())
                .maintenanceCalories(a.getMaintenanceCalories())
                .cutCalories(a.getCutCalories())
                .bulkCalories(a.getBulkCalories())
                .leanBodyMassKg(a.getLeanBodyMassKg())
                .fatMassKg(a.getFatMassKg())
                .assessedAt(a.getAssessedAt())
                .build();
    }

    private String bmiCategory(BigDecimal bmi) {
        double value = bmi.doubleValue();
        if (value < 18.5) return "Underweight";
        if (value < 25) return "Normal";
        if (value < 30) return "Overweight";
        return "Obese";
    }
}
