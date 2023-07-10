package br.spin.crud.pacientes.repository;

import br.spin.crud.atendimentos.models.InterfacesJPA;
import br.spin.crud.pacientes.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}
