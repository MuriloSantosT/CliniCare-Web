package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.model.Anamnese;
import com.CliniCare.CiliniCareApi.model.Patient;
import com.CliniCare.CiliniCareApi.model.User;
import com.CliniCare.CiliniCareApi.repository.AnamneseRepository;
import com.CliniCare.CiliniCareApi.repository.PatientRepository;
import com.CliniCare.CiliniCareApi.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnamneseService {

    private final AnamneseRepository anamneseRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public AnamneseService(AnamneseRepository anamneseRepository, PatientRepository patientRepository, UserRepository userRepository) {
        this.anamneseRepository = anamneseRepository;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    // Listar
    public List<Anamnese> getAll() {return anamneseRepository.findAll();}

    public List<Anamnese> listByPacient(Long patientId) {
        return anamneseRepository.findByPatientId(patientId);
    }

    public List<Anamnese> listByUser(Long userId) {
        return anamneseRepository.findByUserId(userId);
    }

    // Criar
    public Anamnese save(Anamnese anamnese) {
        if (anamnese.getPatientIdInput() != null) {
            Patient patient = patientRepository.findById(anamnese.getPatientIdInput())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Paciente não encontrado: " + anamnese.getPatientIdInput()));
            anamnese.setPatient(patient);
        }
        if (anamnese.getUserIdInput() != null) {
            User user = userRepository.findById(anamnese.getUserIdInput())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Usuário não encontrado: " + anamnese.getUserIdInput()));
            anamnese.setUser(user);
        }
        anamnese.setCreatedAt(LocalDateTime.now());
        return anamneseRepository.save(anamnese);
    }

    // Deletar
    public void delete(Long id) {anamneseRepository.deleteById(id);}
}
