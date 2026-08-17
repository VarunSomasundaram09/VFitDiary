package com.vfitdiary.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "motivational_quotes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MotivationalQuote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quote_text", nullable = false, length = 500)
    private String quoteText;

    @Column(length = 150)
    private String author;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private Category category = Category.GENERAL;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private boolean active = true;

    public enum Category { DISCIPLINE, STRENGTH, CONSISTENCY, MINDSET, GENERAL }
}
