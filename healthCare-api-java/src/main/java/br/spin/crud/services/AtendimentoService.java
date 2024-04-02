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

    public List<InterfacesSQL.AtendsPerson> listaAtendsPerson(long userId) {
        return atendimentoRepository.listAtends(userId);
    }

    public Atendimento getById(long id) {
        return atendimentoRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, serviceNotFound));
    }

    public ResponseEntity<Atendimento> saveAttendance(Atendimento attendance) {
        final boolean isNew = attendance.getId() != null;

        if (isNew)
            attendance.setDt_criacao(LocalDate.now());

        return ResponseEntity
                .status(isNew ? HttpStatus.CREATED : HttpStatus.OK)
                .body(atendimentoRepository.save(attendance));
    }

    public ResponseEntity<Void> excluirAtendimento(long id) {
        try {
            atendimentoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, serviceNotFound);
        }
    }
}
