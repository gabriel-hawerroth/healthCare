package br.spin.crud.unidades.repository;

import br.spin.crud.unidades.models.Unidade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnidadeRepository extends JpaRepository<Unidade, Long> {

    List<Unidade> findByDsNomeContainingAndIeSituacaoContaining(String dsNome, String ieSituacao);

}
