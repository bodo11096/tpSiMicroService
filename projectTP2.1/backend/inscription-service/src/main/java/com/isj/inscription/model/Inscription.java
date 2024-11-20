package com.isj.inscription.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "inscriptions")
public class Inscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long studentId;

    @NotBlank
    private String academicYear;

    @NotBlank
    private String level;

    @NotNull
    private LocalDate registrationDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    private InscriptionStatus status;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDate.now();
        updatedAt = LocalDate.now();
        if (registrationDate == null) {
            registrationDate = LocalDate.now();
        }
        if (status == null) {
            status = InscriptionStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDate.now();
    }
}

enum InscriptionStatus {
    PENDING,
    APPROVED,
    REJECTED
}