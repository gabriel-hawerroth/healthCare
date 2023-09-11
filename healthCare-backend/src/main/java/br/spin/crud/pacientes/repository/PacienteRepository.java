package br.spin.crud.pacientes.repository;

import br.spin.crud.pacientes.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    List<Paciente> findByDsNomeContainingAndIeSituacaoContainingAndUserId(String dsNome, String ieSituacao, Long userId);

}
