package com.CliniCare.CiliniCareApi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "patientProfessional_table")
public class PatientProfessional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "professional_id")
    private ExternalProfessional professional;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public ExternalProfessional getProfessional() {
        return professional;
    }

    public void setProfessional(ExternalProfessional professional) {
        this.professional = professional;
    }
}
