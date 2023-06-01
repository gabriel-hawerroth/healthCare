package br.spin.crud.pacientes.controller;

import br.spin.crud.pacientes.models.Paciente;
import br.spin.crud.pacientes.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping("/lista")
    private List<Paciente> listaPessoas() {
        return pacienteRepository.findAll();
    }

    @PostMapping("/cadastro")
    private Paciente salvarUnidade(@RequestBody Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    @DeleteMapping("/excluir")
    private void excluirPaciente(@RequestParam(name = "id") Integer id) {
        pacienteRepository.findById(id);
        Paciente paci = pacienteRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paciente não encontrado: " + id)
        );
        paci.setIe_situacao("I");
        pacienteRepository.save(paci);
    }

}
