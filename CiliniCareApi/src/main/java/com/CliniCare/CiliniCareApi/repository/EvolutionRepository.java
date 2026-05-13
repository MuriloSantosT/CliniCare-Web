package com.CliniCare.CiliniCareApi.repository;

import com.CliniCare.CiliniCareApi.model.Evolution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvolutionRepository extends JpaRepository<Evolution, Long> {
    List<Evolution> findByPatientId(Long patientId);

    List<Evolution> findByUserId(Long userId);

    long countByUserId(Long userId);
}
