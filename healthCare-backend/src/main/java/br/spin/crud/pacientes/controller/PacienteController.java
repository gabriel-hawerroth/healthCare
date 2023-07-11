package br.spin.crud.pacientes.controller;

import br.spin.crud.pacientes.models.Paciente;
import br.spin.crud.pacientes.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    private List<Paciente> listaPacientes() {
        return pacienteRepository.findAll();
    }

    @GetMapping("/paginados")
    private List<Paciente> listaPacientesPaginados() {
        return pacienteRepository.findAll();
    }

    @PostMapping
    private ResponseEntity<Paciente> salvarPaciente(@RequestBody Paciente paciente) {
        paciente.setIe_situacao("A");
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteRepository.save(paciente));
    }

    @DeleteMapping("/excluir/{id}")
    private void excluirPaciente(@PathVariable(name = "id") Long id) {
        Paciente paci = pacienteRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paciente não encontrado: " + id)
        );
        paci.setIe_situacao("I");
        pacienteRepository.save(paci);
    }
}
