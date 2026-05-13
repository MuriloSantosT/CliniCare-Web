package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.model.Guardian;
import com.CliniCare.CiliniCareApi.model.Patient;
import com.CliniCare.CiliniCareApi.model.User;
import com.CliniCare.CiliniCareApi.repository.PatientRepository;
import com.CliniCare.CiliniCareApi.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientService(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // GET ALL
    // =========================
    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    public List<Patient> listByUser(Long userId) {
        return patientRepository.findByUserId(userId);
    }

    // =========================
    // GET BY ID
    // =========================
    public Patient getById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com ID: " + id));
    }

    // =========================
    // CREATE
    // =========================
    public Patient save(Patient patient) {
        try {
            patient.setCreatedAt(LocalDateTime.now());
            patient.setUpdatedAt(LocalDateTime.now());

            if (patient.getUserIdInput() != null) {
                User user = userRepository.findById(patient.getUserIdInput())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Usuário não encontrado: " + patient.getUserIdInput()));
                patient.setUser(user);
            }

            if (patient.getResponsaveis() != null) {
                for (Guardian guardian : patient.getResponsaveis()) {
                    guardian.setPatient(patient);
                }
            }

            return patientRepository.save(patient);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar paciente: " + e.getMessage(), e);
        }
    }

    // =========================
    // UPDATE BY ID
    // =========================
    public Patient updateById(Long id, Patient updatedPatient) {

        Patient existingPatient = getById(id);

        // =========================
        // Dados pessoais
        // =========================
        existingPatient.setNome(updatedPatient.getNome());
        existingPatient.setCpf(updatedPatient.getCpf());
        existingPatient.setDataNascimento(updatedPatient.getDataNascimento());
        existingPatient.setSexo(updatedPatient.getSexo());
        existingPatient.setAlergias(updatedPatient.getAlergias());
        existingPatient.setConvenio(updatedPatient.getConvenio());
        existingPatient.setTelefoneEmergencia(updatedPatient.getTelefoneEmergencia());
        existingPatient.setObservacoesGerais(updatedPatient.getObservacoesGerais());

        // =========================
        // Escola
        // =========================
        existingPatient.setNomeEscola(updatedPatient.getNomeEscola());
        existingPatient.setTelefoneEscola(updatedPatient.getTelefoneEscola());
        existingPatient.setAno(updatedPatient.getAno());
        existingPatient.setPeriodo(updatedPatient.getPeriodo());

        // =========================
        // Endereço
        // =========================
        existingPatient.setRua(updatedPatient.getRua());
        existingPatient.setNumero(updatedPatient.getNumero());
        existingPatient.setBairro(updatedPatient.getBairro());
        existingPatient.setCidade(updatedPatient.getCidade());
        existingPatient.setEstado(updatedPatient.getEstado());
        existingPatient.setCep(updatedPatient.getCep());
        existingPatient.setComplemento(updatedPatient.getComplemento());

        // =========================
        // Atualização dos responsáveis
        // =========================
        if (updatedPatient.getResponsaveis() != null) {

            // Remove todos os antigos (orphanRemoval = true cuida do delete)
            existingPatient.getResponsaveis().clear();

            for (Guardian guardian : updatedPatient.getResponsaveis()) {
                guardian.setPatient(existingPatient);
                existingPatient.getResponsaveis().add(guardian);
            }
        }

        // Atualiza timestamp
        existingPatient.setUpdatedAt(LocalDateTime.now());

        return patientRepository.save(existingPatient);
    }

    // =========================
    // DELETE BY ID
    // =========================
    public void deleteById(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Paciente não encontrado com ID: " + id);
        }
        patientRepository.deleteById(id);
    }
}