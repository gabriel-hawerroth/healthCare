package br.spin.crud.pacientes.controller;

import br.spin.crud.pacientes.models.Paciente;
import br.spin.crud.pacientes.repository.PacienteRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    private List<Paciente> listaPacientesQuery(
            @RequestParam String dsNome,
            @RequestParam String ieSituacao) {
        return pacienteRepository.findByDsNomeContainingAndIeSituacaoContaining(dsNome, ieSituacao);
    }

    @GetMapping("/paginados")
    private List<Paciente> listaPacientesPaginados() {
        return pacienteRepository.findAll();
    }

    @GetMapping("/{id}")
    private Paciente listaPaciente(@PathVariable(name = "id") Long id){
        return pacienteRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paciente não encontrado: " + id)
        );
    }

    @PostMapping
    private ResponseEntity<Paciente> criarPaciente(@RequestBody Paciente paciente) {
        paciente.setDt_criacao(LocalDate.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteRepository.save(paciente));
    }

    @PutMapping
    private ResponseEntity<Paciente> editarPaciente(@RequestBody Paciente paciente) {
        Paciente paci = pacienteRepository.findById(paciente.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paciente não encontrado: " + paciente.getId())
        );
        paciente.setDt_criacao(paci.getDt_criacao());
        return ResponseEntity.status(HttpStatus.OK).body(pacienteRepository.save(paciente));
    }

    @DeleteMapping("/{id}")
    private void excluirPaciente(@PathVariable(name = "id") Long id) {
        Paciente paci = pacienteRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paciente não encontrado: " + id)
        );
        pacienteRepository.deleteById(id);
    }
}
