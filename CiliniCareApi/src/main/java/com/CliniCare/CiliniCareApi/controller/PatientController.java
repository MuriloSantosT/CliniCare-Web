package com.CliniCare.CiliniCareApi.controller;

import com.CliniCare.CiliniCareApi.model.Patient;
import com.CliniCare.CiliniCareApi.service.PatientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/listar")
    public List<Patient> getAll() {return patientService.getAll();}

    @GetMapping("/listar/{userId}")
    public List<Patient> getByUser(@PathVariable Long userId) {
        return patientService.listByUser(userId);
    }

    @GetMapping("/fast")
    public String fast() {
        return "ok";
    }

    @GetMapping("/{id}")
    public Patient getById(@PathVariable Long id) {
        return patientService.getById(id);
    }

    @PostMapping("/criar")
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.save(patient);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @RequestParam Long userId, @RequestBody Patient patient) {
        return patientService.updateById(id, patient, userId);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id, @RequestParam Long userId) {
        patientService.deleteById(id, userId);
    }
}
