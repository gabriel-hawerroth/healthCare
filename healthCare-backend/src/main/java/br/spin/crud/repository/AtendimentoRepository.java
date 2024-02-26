package br.spin.crud.repository;

import br.spin.crud.models.Atendimento;
import br.spin.crud.models.InterfacesSQL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Integer> {

    List<Atendimento> findAllByUserId(Long userId);

    @Query(value =
            """
            SELECT
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
               a.dt_criacao,
               a.user_id
            FROM
               atendimento a
               JOIN paciente p ON a.id_paciente = p.id
               JOIN unidade u ON a.id_unidade = u.id
            WHERE
               a.user_id = :userId
            """, nativeQuery = true)
    List<InterfacesSQL.AtendsPerson> listAtends(Long userId);
}
