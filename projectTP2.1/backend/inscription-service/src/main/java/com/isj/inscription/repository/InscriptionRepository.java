package com.isj.inscription.repository;

import com.isj.inscription.model.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InscriptionRepository extends JpaRepository<Inscription, Long> {
    List<Inscription> findByStudentId(Long studentId);
    List<Inscription> findByAcademicYear(String academicYear);
    boolean existsByStudentIdAndAcademicYear(Long studentId, String academicYear);
}