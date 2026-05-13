package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.model.Appointment;
import com.CliniCare.CiliniCareApi.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment save(Appointment appointment) {

        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> listByPacient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> listByUser(Long userId) {
        return appointmentRepository.findByUserId(userId);
    }

    public List<Appointment> listByTime(Long userId, LocalDateTime inicio, LocalDateTime fim) {
        return appointmentRepository.findByUserIdAndDataInicioBetween(userId, inicio, fim);
    }

    public Appointment updateStatus(Long id, String status) {
        Appointment apt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found: " + id));
        apt.setStatus(status);
        apt.setUpdatedAt(LocalDateTime.now());
        return appointmentRepository.save(apt);
    }

    public void delete(Long id) {
        appointmentRepository.deleteById(id);
    }
}
