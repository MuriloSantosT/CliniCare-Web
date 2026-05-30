package com.CliniCare.CiliniCareApi.controller;

import com.CliniCare.CiliniCareApi.repository.AnamneseRepository;
import com.CliniCare.CiliniCareApi.repository.EvolutionRepository;
import com.CliniCare.CiliniCareApi.repository.ReportRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final AnamneseRepository anamneseRepository;
    private final EvolutionRepository evolutionRepository;
    private final ReportRepository reportRepository;

    public DashboardController(
            AnamneseRepository anamneseRepository,
            EvolutionRepository evolutionRepository,
            ReportRepository reportRepository) {
        this.anamneseRepository = anamneseRepository;
        this.evolutionRepository = evolutionRepository;
        this.reportRepository = reportRepository;
    }

    @GetMapping("/stats/{userId}")
    public Map<String, Long> getStats(@PathVariable Long userId) {
        long anamneses = anamneseRepository.countByUserId(userId);
        long evolucoes = evolutionRepository.countByUserId(userId);
        long relatorios = reportRepository.countByUserId(userId);

        return Map.of(
            "totalProntuarios", anamneses + evolucoes + relatorios,
            "totalEvolucoes", evolucoes
        );
    }
}
