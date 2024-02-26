package br.spin.crud.services;

import br.spin.crud.models.Atendimento;
import br.spin.crud.models.InterfacesSQL;
import br.spin.crud.repository.AtendimentoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AtendimentoService {

    private final AtendimentoRepository atendimentoRepository;

    private static final String serviceNotFound = "Atendimento não encontrado";

    public List<Atendimento> listaAtendimentos(Long userId) {
        return atendimentoRepository.findAllByUserId(userId);
    }

    public List<InterfacesSQL.AtendsPerson> listaAtendsPerson(Long userId) {
        return atendimentoRepository.listAtends(userId);
    }

    public Atendimento getById(Integer id) {
        return atendimentoRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, serviceNotFound));
    }

    public ResponseEntity<Atendimento> criarAtendimento(Atendimento atendimento) {
        atendimento.setDt_criacao(LocalDate.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(atendimentoRepository.save(atendimento));
    }

    public ResponseEntity<Atendimento> editarAtendimento(Atendimento atendimento) {
        final Atendimento atend = atendimentoRepository.findById(atendimento.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, serviceNotFound)
        );
        atendimento.setDt_criacao(atend.getDt_criacao());
        return ResponseEntity.status(HttpStatus.OK).body(atendimentoRepository.save(atendimento));
    }

    public ResponseEntity<Void> excluirAtendimento(Integer id) {
        try {
            atendimentoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, serviceNotFound);
        }
    }
}
