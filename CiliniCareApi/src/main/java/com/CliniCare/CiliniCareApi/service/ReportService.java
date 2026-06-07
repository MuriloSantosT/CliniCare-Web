package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.model.Report;
import com.CliniCare.CiliniCareApi.repository.PatientRepository;
import com.CliniCare.CiliniCareApi.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final PatientRepository patientRepository;

    public ReportService(ReportRepository reportRepository, PatientRepository patientRepository) {
        this.reportRepository = reportRepository;
        this.patientRepository = patientRepository;
    }

    public Report save(Report report) {
        report.setCreatedAt(LocalDateTime.now());

        if (report.getPatientIdInput() != null) {
            patientRepository.findById(report.getPatientIdInput())
                    .ifPresent(report::setPatient);
        }

        return reportRepository.save(report);
    }

    public List<Report> listByPatient(Long patientId) {
        return reportRepository.findByPatientIdOrderByDataDesc(patientId);
    }

    public List<Report> listByUser(Long userId) {
        return reportRepository.findByUserId(userId);
    }

    public Report update(Long id, Report updated) {
        return reportRepository.findById(id).map(existing -> {
            existing.setTitulo(updated.getTitulo());
            existing.setDescricao(updated.getDescricao());
            if (updated.getData() != null) existing.setData(updated.getData());
            return reportRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Relatório não encontrado: " + id));
    }

    public void delete(Long id) {
        reportRepository.deleteById(id);
    }
}
