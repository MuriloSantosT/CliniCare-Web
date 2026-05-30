package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.model.Evolution;
import com.CliniCare.CiliniCareApi.repository.AppointmentRepository;
import com.CliniCare.CiliniCareApi.repository.EvolutionRepository;
import com.CliniCare.CiliniCareApi.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EvolutionService {

    private final EvolutionRepository evolutionRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    public EvolutionService(EvolutionRepository evolutionRepository,
                            PatientRepository patientRepository,
                            AppointmentRepository appointmentRepository) {
        this.evolutionRepository = evolutionRepository;
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public Evolution save(Evolution evolution) {
        evolution.setCreatedAt(LocalDateTime.now());

        if (evolution.getPatientIdInput() != null) {
            patientRepository.findById(evolution.getPatientIdInput())
                    .ifPresent(evolution::setPatient);
        }

        Evolution saved = evolutionRepository.save(evolution);

        if (evolution.getAppointmentIdInput() != null) {
            appointmentRepository.findById(evolution.getAppointmentIdInput())
                    .ifPresent(apt -> {
                        apt.setStatus("Realizado");
                        apt.setUpdatedAt(LocalDateTime.now());
                        appointmentRepository.save(apt);
                    });
        }

        return saved;
    }

    public Evolution findById(Long id) {
        return evolutionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evolução não encontrada: " + id));
    }

    public List<Evolution> listByPatient(Long patientId) {
        return evolutionRepository.findByPatientId(patientId);
    }

    public List<Evolution> listByUser(Long userId) {
        return evolutionRepository.findByUserId(userId);
    }

    public Evolution update(Long id, Evolution updated) {
        return evolutionRepository.findById(id).map(existing -> {
            existing.setTitulo(updated.getTitulo());
            existing.setTexto(updated.getTexto());
            existing.setPlanoProximaSessao(updated.getPlanoProximaSessao());
            if (updated.getData() != null) existing.setData(updated.getData());
            return evolutionRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Evolução não encontrada: " + id));
    }

    public void delete(Long id) {
        evolutionRepository.deleteById(id);
    }
}
