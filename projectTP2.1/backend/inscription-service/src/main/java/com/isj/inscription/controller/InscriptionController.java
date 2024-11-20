package com.isj.inscription.controller;

import com.isj.inscription.model.Inscription;
import com.isj.inscription.service.InscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inscriptions")
@RequiredArgsConstructor
public class InscriptionController {
    private final InscriptionService inscriptionService;

    @GetMapping
    public ResponseEntity<List<Inscription>> getAllInscriptions() {
        return ResponseEntity.ok(inscriptionService.getAllInscriptions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscription> getInscriptionById(@PathVariable Long id) {
        return ResponseEntity.ok(inscriptionService.getInscriptionById(id));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Inscription>> getInscriptionsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(inscriptionService.getInscriptionsByStudentId(studentId));
    }

    @PostMapping
    public ResponseEntity<Inscription> createInscription(@Valid @RequestBody Inscription inscription) {
        return new ResponseEntity<>(inscriptionService.createInscription(inscription), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inscription> updateInscription(
            @PathVariable Long id, 
            @Valid @RequestBody Inscription inscription) {
        return ResponseEntity.ok(inscriptionService.updateInscription(id, inscription));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInscription(@PathVariable Long id) {
        inscriptionService.deleteInscription(id);
        return ResponseEntity.noContent().build();
    }
}