package br.spin.crud.repository;

import br.spin.crud.models.Unidade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnidadeRepository extends JpaRepository<Unidade, Long> {

    List<Unidade> findByUserId(Long userId);

}
