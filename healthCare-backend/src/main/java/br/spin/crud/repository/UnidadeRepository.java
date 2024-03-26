package br.spin.crud.repository;

import br.spin.crud.models.Unidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UnidadeRepository extends JpaRepository<Unidade, Long> {

    @Query(value =
            """
            SELECT
                *
            FROM
                unidade u
            WHERE
                u.user_id = :user_id
            ORDER BY
                u.id ASC
            """, nativeQuery = true)
    List<Unidade> findByUserId(long user_id);
}
