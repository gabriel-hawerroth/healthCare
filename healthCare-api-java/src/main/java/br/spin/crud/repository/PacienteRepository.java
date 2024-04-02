package br.spin.crud.repository;

import br.spin.crud.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    @Query(value =
            """
            SELECT
                *
            FROM
                paciente p
            WHERE
                p.user_id = :user_id
            ORDER BY
                p.id ASC
            """, nativeQuery = true)
    List<Paciente> findByUserId(long user_id);
}
