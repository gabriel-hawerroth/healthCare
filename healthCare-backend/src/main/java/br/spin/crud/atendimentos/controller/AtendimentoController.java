package br.spin.crud.atendimentos.controller;

import br.spin.crud.atendimentos.models.*;
import br.spin.crud.atendimentos.repository.*;
import br.spin.crud.pacientes.models.Paciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("atendimentos")
public class AtendimentoController {

    @Autowired
    private AtendimentoRepository atendimentoRepository;
    @Autowired
    private AtendPersonRepository atendPersonRepository;

    @PersistenceContext
    private EntityManager manager;

    @GetMapping
    private List<Atendimento> listaAtendimentos() {
        return atendimentoRepository.findAll();
    }

    @GetMapping("/atendsPerson")
    private List<AtendPerson> listaAtendsPerson() {
        return atendPersonRepository.findAll();
    }

    @GetMapping("/{id}")
    private Atendimento listaAtendimentos(@PathVariable(name = "id") Integer id){
        return atendimentoRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Atendimento não encontrado: " + id)
        );
    }

    @PostMapping
    private ResponseEntity<Atendimento> criarAtendimento(@RequestBody Atendimento atendimento) {
        atendimento.setDt_criacao(LocalDate.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(atendimentoRepository.save(atendimento));
    }

    @PutMapping
    private ResponseEntity<Atendimento> editarAtendimento(@RequestBody Atendimento atendimento) {
        Optional<Atendimento> optAtendimento = atendimentoRepository.findById(atendimento.getId());
        optAtendimento.ifPresent(value -> atendimento.setDt_criacao(value.getDt_criacao()));
        return ResponseEntity.status(HttpStatus.OK).body(atendimentoRepository.save(atendimento));
    }

    @DeleteMapping("/{id}")
    private void excluirAtendimento(@PathVariable(name = "id") Integer id) {
        atendimentoRepository.deleteById(id);
    }

}
