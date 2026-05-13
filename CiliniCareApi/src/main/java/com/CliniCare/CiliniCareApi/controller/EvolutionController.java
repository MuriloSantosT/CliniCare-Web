package com.CliniCare.CiliniCareApi.controller;

import com.CliniCare.CiliniCareApi.model.Evolution;
import com.CliniCare.CiliniCareApi.service.EvolutionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evolution")
public class EvolutionController {

    private final EvolutionService evolutionService;

    public EvolutionController(EvolutionService evolutionService) {
        this.evolutionService = evolutionService;
    }

    @PostMapping("/adicionar")
    public Evolution create(@RequestBody Evolution evolution) {
        return evolutionService.save(evolution);
    }

    @GetMapping("/patient/{patientId}")
    public List<Evolution> listByPatient(@PathVariable Long patientId) {
        return evolutionService.listByPatient(patientId);
    }

    @GetMapping("/user/{userId}")
    public List<Evolution> listByUser(@PathVariable Long userId) {
        return evolutionService.listByUser(userId);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        evolutionService.delete(id);
    }
}
