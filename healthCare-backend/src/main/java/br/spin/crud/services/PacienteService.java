package br.spin.crud.services;

import br.spin.crud.models.Paciente;
import br.spin.crud.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    private static final String patientNotFound = "Paciente não encontrado";

    public List<Paciente> listPatients(Long userId) {
        return pacienteRepository.findByUserId(userId);
    }

    public Paciente getById(Long id){
        return pacienteRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, patientNotFound));
    }

    public ResponseEntity<Paciente> criarPaciente(Paciente paciente) {
        paciente.setDt_criacao(LocalDate.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteRepository.save(paciente));
    }

    public ResponseEntity<Paciente> editarPaciente(Paciente paciente) {
        final Paciente paci = pacienteRepository.findById(paciente.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, patientNotFound));

        paciente.setDt_criacao(paci.getDt_criacao());
        return ResponseEntity.status(HttpStatus.OK).body(pacienteRepository.save(paciente));
    }

    public ResponseEntity<Void> excluirPaciente(Long id) {
        try {
            pacienteRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, patientNotFound);
        }
    }
}
