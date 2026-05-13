package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.model.Report;
import com.CliniCare.CiliniCareApi.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public Report save(Report report) {

        report.setCreatedAt(LocalDateTime.now());

        return reportRepository.save(report);
    }

    public List<Report> listBtPatient(Long patientId) {
        return reportRepository.findByPatientIdOrderByDataDesc(patientId);
    }

    public List<Report> listByUser(Long userId) {
        return reportRepository.findByUserId(userId);
    }

    public void delete(Long id) {
        reportRepository.deleteById(id);
    }
}
