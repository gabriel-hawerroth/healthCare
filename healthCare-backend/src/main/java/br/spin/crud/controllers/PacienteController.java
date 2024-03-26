package br.spin.crud.controllers;

import br.spin.crud.models.Paciente;
import br.spin.crud.services.PacienteService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("patient")
public class PacienteController {

    private final PacienteService pacienteService;

    @GetMapping
    private List<Paciente> listPatients(@RequestParam long userId) {
        return pacienteService.listPatients(userId);
    }

    @GetMapping("/{id}")
    private Paciente getById(@PathVariable long id){
        return pacienteService.getById(id);
    }

    @PostMapping
    private ResponseEntity<Paciente> savePatient(@RequestBody Paciente paciente) {
        return pacienteService.savePatient(paciente);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> excluirPaciente(@PathVariable long id) {
        return pacienteService.excluirPaciente(id);
    }
}
