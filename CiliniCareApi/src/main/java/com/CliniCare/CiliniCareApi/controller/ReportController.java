package com.CliniCare.CiliniCareApi.controller;

import com.CliniCare.CiliniCareApi.model.Report;
import com.CliniCare.CiliniCareApi.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/adicionar")
    public Report create(@RequestBody Report report) {
        return reportService.save(report);
    }

    @GetMapping("/patient/{patientId}")
    public List<Report> listByPatient(@PathVariable Long patientId) {
        return reportService.listBtPatient(patientId);
    }

    @GetMapping("/user/{userId}")
    public List<Report> listByUser(@PathVariable Long userId) {
        return reportService.listByUser(userId);
    }

    @PutMapping("/atualizar/{id}")
    public Report update(@PathVariable Long id, @RequestBody Report report) {
        return reportService.update(id, report);
    }

    @DeleteMapping("/deletar/{id}")
    public void delete(@PathVariable Long id) {
        reportService.delete(id);
    }
}
