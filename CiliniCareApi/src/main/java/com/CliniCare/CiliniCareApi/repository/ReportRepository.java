package com.CliniCare.CiliniCareApi.repository;

import com.CliniCare.CiliniCareApi.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByPatientId(Long patientId);

    List<Report> findByUserId(Long userId);

    List<Report> findByPatientIdOrderByDataDesc(Long patientId);

    long countByUserId(Long userId);
}
