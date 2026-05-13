package com.CliniCare.CiliniCareApi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "evolution_table")
public class Evolution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate data;
    private String titulo;
    private String texto;
    private String planoProximaSessao;
    private String docPath;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonIgnore
    private Patient patient;

    @Transient
    @JsonProperty("patientId")
    private Long patientIdInput;

    @Transient
    @JsonProperty("appointmentId")
    private Long appointmentIdInput;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    public String getPlanoProximaSessao() { return planoProximaSessao; }
    public void setPlanoProximaSessao(String planoProximaSessao) { this.planoProximaSessao = planoProximaSessao; }

    public String getDocPath() { return docPath; }
    public void setDocPath(String docPath) { this.docPath = docPath; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Long getPatientIdInput() { return patientIdInput; }
    public void setPatientIdInput(Long patientIdInput) { this.patientIdInput = patientIdInput; }

    public Long getAppointmentIdInput() { return appointmentIdInput; }
    public void setAppointmentIdInput(Long appointmentIdInput) { this.appointmentIdInput = appointmentIdInput; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
