package com.CliniCare.CiliniCareApi.repository;

import com.CliniCare.CiliniCareApi.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("SELECT a FROM Appointment a WHERE a.user.id = :userId " +
           "AND a.status != 'Cancelado' " +
           "AND a.dataInicio < :dataFim " +
           "AND a.dataFim > :dataInicio")
    List<Appointment> findConflicting(
            @Param("userId") Long userId,
            @Param("dataInicio") LocalDateTime dataInicio,
            @Param("dataFim") LocalDateTime dataFim
    );
}
