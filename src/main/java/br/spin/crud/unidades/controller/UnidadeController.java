package br.spin.crud.unidades.controller;

import br.spin.crud.unidades.models.Unidade;
import br.spin.crud.unidades.repository.UnidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("unidades")
public class UnidadeController {

    @Autowired
    private UnidadeRepository unidadeRepository;

    @GetMapping("/lista")
    private List<Unidade> listaPessoas() {
        return unidadeRepository.findAll();
    }

    @PostMapping("/cadastro")
    private Unidade salvarUnidade(@RequestBody Unidade unidade) {
        return unidadeRepository.save(unidade);
    }

    @DeleteMapping("/excluir")
    private void excluirUnidade(@RequestParam(name = "id") Integer id) {
        unidadeRepository.findById(id);
        Unidade uni = unidadeRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unidade não encontrada: " + id)
        );
        uni.setSituacao("I");
        unidadeRepository.save(uni);
    }

}
