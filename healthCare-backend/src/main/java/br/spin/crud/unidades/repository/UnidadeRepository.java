package br.spin.crud.unidades.repository;

import br.spin.crud.unidades.models.Unidade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnidadeRepository extends JpaRepository<Unidade, Long> {
}
