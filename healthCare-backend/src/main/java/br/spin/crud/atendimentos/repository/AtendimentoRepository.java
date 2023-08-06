package br.spin.crud.atendimentos.repository;

import br.spin.crud.atendimentos.models.AtendPerson;
import br.spin.crud.atendimentos.models.Atendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Integer> {
}
