package com.isj.inscription.service;

import com.isj.inscription.model.Inscription;
import com.isj.inscription.repository.InscriptionRepository;
import com.isj.inscription.exception.InscriptionNotFoundException;
import com.isj.inscription.exception.DuplicateInscriptionException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InscriptionService {
    private final InscriptionRepository inscriptionRepository;

    public List<Inscription> getAllInscriptions() {
        return inscriptionRepository.findAll();
    }

    public Inscription getInscriptionById(Long id) {
        return inscriptionRepository.findById(id)
            .orElseThrow(() -> new InscriptionNotFoundException("Inscription not found with id: " + id));
    }

    public List<Inscription> getInscriptionsByStudentId(Long studentId) {
        return inscriptionRepository.findByStudentId(studentId);
    }

    @Transactional
    public Inscription createInscription(Inscription inscription) {
        if (inscriptionRepository.existsByStudentIdAndAcademicYear(
                inscription.getStudentId(), 
                inscription.getAcademicYear())) {
            throw new DuplicateInscriptionException(
                "Student already registered for academic year: " + inscription.getAcademicYear());
        }
        return inscriptionRepository.save(inscription);
    }

    @Transactional
    public Inscription updateInscription(Long id, Inscription inscriptionDetails) {
        Inscription inscription = getInscriptionById(id);
        
        inscription.setLevel(inscriptionDetails.getLevel());
        inscription.setStatus(inscriptionDetails.getStatus());
        
        return inscriptionRepository.save(inscription);
    }

    @Transactional
    public void deleteInscription(Long id) {
        if (!inscriptionRepository.existsById(id)) {
            throw new InscriptionNotFoundException("Inscription not found with id: " + id);
        }
        inscriptionRepository.deleteById(id);
    }
}