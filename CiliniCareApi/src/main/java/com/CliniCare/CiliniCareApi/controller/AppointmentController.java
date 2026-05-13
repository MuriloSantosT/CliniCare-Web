package com.CliniCare.CiliniCareApi.controller;

import com.CliniCare.CiliniCareApi.model.Appointment;
import com.CliniCare.CiliniCareApi.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/adicionar")
    public Appointment create(@RequestBody Appointment appointment) {
        return appointmentService.save(appointment);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> listByPacient(@PathVariable Long patientId) {
        return appointmentService.listByPacient(patientId);
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> listByUser(@PathVariable Long userId) {
        return appointmentService.listByUser(userId);
    }

    @PatchMapping("/{id}/status")
    public Appointment updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return appointmentService.updateStatus(id, body.get("status"));
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        appointmentService.delete(id);
    }
}
