package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.model.Appointment;
import com.CliniCare.CiliniCareApi.repository.AppointmentRepository;
import com.CliniCare.CiliniCareApi.repository.PatientRepository;
import com.CliniCare.CiliniCareApi.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    public Appointment save(Appointment appointment) {
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());

        if (appointment.getPatient() != null && appointment.getPatient().getId() != null) {
            patientRepository.findById(appointment.getPatient().getId())
                    .ifPresent(appointment::setPatient);
        }

        if (appointment.getUser() != null && appointment.getUser().getId() != null) {
            userRepository.findById(appointment.getUser().getId())
                    .ifPresent(appointment::setUser);
        }

        if (appointment.getUser() != null && appointment.getUser().getId() != null
                && appointment.getDataInicio() != null && appointment.getDataFim() != null) {
            List<Appointment> conflicts = appointmentRepository.findConflicting(
                    appointment.getUser().getId(),
                    appointment.getDataInicio(),
                    appointment.getDataFim()
            );
            if (!conflicts.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Já existe um compromisso neste horário.");
            }
        }

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
