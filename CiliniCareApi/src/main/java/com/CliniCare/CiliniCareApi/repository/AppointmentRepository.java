package com.CliniCare.CiliniCareApi.repository;

import com.CliniCare.CiliniCareApi.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByUserId(Long userId);

    List<Appointment> findByUserIdAndDataInicioBetween(
            Long userId,
            LocalDateTime inicio,
            LocalDateTime fim
    );
}
