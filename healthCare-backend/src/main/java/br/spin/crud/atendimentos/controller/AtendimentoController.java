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
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
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
    private List<AtendPerson> listaAtendsPerson(
            @RequestParam String nm_paciente,
            @RequestParam String nm_unidade,
            @RequestParam String dt_inicial,
            @RequestParam String dt_final
    ) {
        DateTimeFormatter isoFormatter = DateTimeFormatter.ISO_INSTANT;
        Date dtInicial = null;
        Date dtFinal = null;

        if (dt_inicial != null && !dt_inicial.equals("null")) {
            Instant instant = Instant.from(isoFormatter.parse(dt_inicial));
            dtInicial = Date.from(instant);
        }
        if (dt_final != null && !dt_final.equals("null")) {
            Instant secondInstant = Instant.from(isoFormatter.parse(dt_final));
            dtFinal = Date.from(secondInstant);
        }

        return atendPersonRepository.listAtends(nm_paciente, nm_unidade, dtInicial, dtFinal);
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
        Atendimento atend = atendimentoRepository.findById(atendimento.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Atendimento não encontrado: " + atendimento.getId())
        );
        atendimento.setDt_criacao(atend.getDt_criacao());
        return ResponseEntity.status(HttpStatus.OK).body(atendimentoRepository.save(atendimento));
    }

    @DeleteMapping("/{id}")
    private void excluirAtendimento(@PathVariable(name = "id") Integer id) {
        Atendimento atend = atendimentoRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Atendimento não encontrado: " + id)
        );
        atendimentoRepository.deleteById(id);
    }
}
