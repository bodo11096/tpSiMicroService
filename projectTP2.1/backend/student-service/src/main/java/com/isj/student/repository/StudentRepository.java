package com.isj.student.repository;

import com.isj.student.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByMatricule(String matricule);
    Optional<Student> findByEmail(String email);
    boolean existsByMatricule(String matricule);
    boolean existsByEmail(String email);
}