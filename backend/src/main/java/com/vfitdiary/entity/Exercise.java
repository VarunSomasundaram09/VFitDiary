package com.vfitdiary.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "exercises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "target_muscle", nullable = false, length = 100)
    private String targetMuscle;

    @Column(name = "secondary_muscles", length = 255)
    private String secondaryMuscles;

    @Column(length = 100)
    private String equipment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Difficulty difficulty;

    @Lob
    private String instructions;

    @Column(name = "video_url", length = 500)
    private String videoUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum Difficulty { BEGINNER, INTERMEDIATE, ADVANCED }
}
