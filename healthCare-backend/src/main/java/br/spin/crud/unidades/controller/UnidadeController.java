package br.spin.crud.unidades.controller;

import br.spin.crud.pacientes.models.Paciente;
import br.spin.crud.unidades.models.Unidade;
import br.spin.crud.unidades.repository.UnidadeRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.proxy.pojo.bytebuddy.ByteBuddyInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("unidades")
public class UnidadeController {

    @Autowired
    private UnidadeRepository unidadeRepository;

    @GetMapping
    private List<Unidade> listaUnidadesQuery(@RequestParam Long userId) {
        return unidadeRepository.findByUserId(userId);
    }

    @GetMapping("/{id}")
    private Unidade listaUnidade(@PathVariable(name = "id") Long id){
        return unidadeRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unidade não encontrada: " + id)
        );
    }

    @PostMapping
    private ResponseEntity<Unidade> criarUnidade(@RequestBody Unidade unidade) {
        unidade.setDt_criacao(LocalDate.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(unidadeRepository.save(unidade));
    }

    @PutMapping
    private ResponseEntity<Unidade> salvarPaciente(@RequestBody Unidade unidade) {
        Unidade uni = unidadeRepository.findById(unidade.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unidade não encontrada: " + unidade.getId())
        );
        unidade.setDt_criacao(uni.getDt_criacao());
        return ResponseEntity.status(HttpStatus.OK).body(unidadeRepository.save(unidade));
    }

    @DeleteMapping("/{id}")
    private void excluirUnidade(@PathVariable(name = "id") Long id) {
        Unidade uni = unidadeRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unidade não encontrada: " + id)
        );
        unidadeRepository.deleteById(id);
    }

}
