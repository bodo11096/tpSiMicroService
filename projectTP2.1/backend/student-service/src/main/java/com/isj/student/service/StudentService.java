package com.isj.student.service;

import com.isj.student.model.Student;
import com.isj.student.repository.StudentRepository;
import com.isj.student.exception.StudentNotFoundException;
import com.isj.student.exception.StudentAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException("Student not found with id: " + id));
    }

    public Student getStudentByMatricule(String matricule) {
        return studentRepository.findByMatricule(matricule)
            .orElseThrow(() -> new StudentNotFoundException("Student not found with matricule: " + matricule));
    }

    @Transactional
    public Student createStudent(Student student) {
        if (studentRepository.existsByMatricule(student.getMatricule())) {
            throw new StudentAlreadyExistsException("Student already exists with matricule: " + student.getMatricule());
        }
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new StudentAlreadyExistsException("Student already exists with email: " + student.getEmail());
        }
        return studentRepository.save(student);
    }

    @Transactional
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);
        
        if (!student.getEmail().equals(studentDetails.getEmail()) && 
            studentRepository.existsByEmail(studentDetails.getEmail())) {
            throw new StudentAlreadyExistsException("Email already in use: " + studentDetails.getEmail());
        }

        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setEmail(studentDetails.getEmail());
        student.setDateOfBirth(studentDetails.getDateOfBirth());
        student.setPhoneNumber(studentDetails.getPhoneNumber());
        student.setDepartment(studentDetails.getDepartment());

        return studentRepository.save(student);
    }

    @Transactional
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new StudentNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }
}