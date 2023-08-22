package br.spin.crud.atendimentos.repository;

import br.spin.crud.atendimentos.models.AtendPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface AtendPersonRepository extends JpaRepository<AtendPerson, Integer> {

    @Query(value =
            """
                    select
                        a.id,
                        p.ds_nome ds_paciente,
                        u.ds_nome ds_unidade,
                        a.dt_atendimento,
                        a.status_atend,
                        a.medico_responsavel,
                        a.hora_inicio,
                        a.hora_fim,
                        a.especialidade,
                        a.tipo_atendimento,
                        a.valor_atendimento,
                        a.forma_pagamento,
                        a.convenio,
                        a.nr_carteirinha_convenio,
                        a.dt_criacao
                    from
                        atendimento a
                        left join paciente p on a.id_paciente = p.id
                        left join unidade u on a.id_unidade = u.id
                    where
                        p.ds_nome like CONCAT('%', :nm_paciente, '%')
                        and u.ds_nome like CONCAT('%', :nm_unidade, '%')
                        and ((a.dt_atendimento >= :dt_inicial) or (:dt_inicial is null))
                        and ((a.dt_atendimento <= :dt_final) or (:dt_final is null))
                    """, nativeQuery = true)
    List<AtendPerson> listAtends(String nm_paciente, String nm_unidade, Date dt_inicial, Date dt_final);

}
