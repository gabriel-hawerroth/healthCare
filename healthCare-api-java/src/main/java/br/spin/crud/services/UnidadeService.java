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

    public ResponseEntity<Unidade> saveUnit(Unidade unit) {
        final boolean isNewUnit = unit.getId() != null;

        if (isNewUnit)
            unit.setDt_criacao(LocalDate.now());

        return ResponseEntity
                .status(isNewUnit ? HttpStatus.CREATED : HttpStatus.OK)
                .body(unidadeRepository.save(unit));
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
