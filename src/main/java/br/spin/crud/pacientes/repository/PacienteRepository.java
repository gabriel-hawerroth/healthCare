package br.spin.crud.pacientes.repository;

import br.spin.crud.pacientes.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
}
