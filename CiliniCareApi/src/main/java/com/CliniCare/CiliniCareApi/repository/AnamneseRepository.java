package com.CliniCare.CiliniCareApi.repository;

import com.CliniCare.CiliniCareApi.model.Anamnese;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnamneseRepository extends JpaRepository<Anamnese, Long> {

    List<Anamnese> findByPatientId(Long patientId);

    List<Anamnese> findByUserId(Long userId);

    long countByUserId(Long userId);
}
