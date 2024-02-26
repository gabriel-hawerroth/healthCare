package br.spin.crud.services;

import br.spin.crud.models.Unidade;
import br.spin.crud.repository.UnidadeRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UnidadeService {

    private final UnidadeRepository unidadeRepository;

    private static final String unitNotFound = "Unidade não encontrada";

    public List<Unidade> listaUnidadesQuery(long userId) {
        return unidadeRepository.findByUserId(userId);
    }

    public Unidade getById(long id){
        return unidadeRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, unitNotFound));
    }

    public ResponseEntity<Unidade> criarUnidade(Unidade unidade) {
        unidade.setDt_criacao(LocalDate.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(unidadeRepository.save(unidade));
    }

    public ResponseEntity<Unidade> salvarUnidade(Unidade unidade) {
        final Unidade uni = unidadeRepository.findById(unidade.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, unitNotFound));

        unidade.setDt_criacao(uni.getDt_criacao());
        return ResponseEntity.status(HttpStatus.OK).body(unidadeRepository.save(unidade));
    }

    public ResponseEntity<Void> excluirUnidade(long id) {
        try {
            unidadeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, unitNotFound);
        }
    }
}
