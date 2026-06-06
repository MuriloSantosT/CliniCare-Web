package com.CliniCare.CiliniCareApi.controller;

import com.CliniCare.CiliniCareApi.model.Anamnese;
import com.CliniCare.CiliniCareApi.service.AnamneseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/anamnese")
public class AnamneseController {

    private final AnamneseService anamneseService;

    public AnamneseController(AnamneseService anamneseService) {this.anamneseService = anamneseService;}

    @GetMapping("/listarTodos")
    public List<Anamnese> getAll(){return anamneseService.getAll();}

    @GetMapping("/paciente/{patientId}")
    public List<Anamnese> listByPatient(@PathVariable Long patientId) {
        return anamneseService.listByPacient(patientId);
    }

    @PostMapping("/criar")
    public Anamnese create(@RequestBody Anamnese anamnese) {return anamneseService.save(anamnese);}

    @PutMapping("/{id}")
    public Anamnese atualizar(@PathVariable Long id, @RequestBody Anamnese anamnese) {
        return anamneseService.update(id, anamnese);
    }

    @DeleteMapping("/delete")
    public void deletar(@RequestParam Long id) {
        anamneseService.delete(id);
    }
}
