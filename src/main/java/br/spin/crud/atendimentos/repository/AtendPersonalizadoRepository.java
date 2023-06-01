package br.spin.crud.atendimentos.repository;

import br.spin.crud.atendimentos.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AtendPersonalizadoRepository extends JpaRepository<AtendimentoPersonalizado, Integer> {
}
