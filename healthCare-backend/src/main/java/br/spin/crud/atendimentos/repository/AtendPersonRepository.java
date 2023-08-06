package br.spin.crud.atendimentos.repository;

import br.spin.crud.atendimentos.models.AtendPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AtendPersonRepository extends JpaRepository<AtendPerson, Integer> {

    @Query(value =
            "select\n" +
                    " a.id,\n" +
                    " p.ds_nome ds_paciente,\n" +
                    " u.ds_nome ds_unidade,\n" +
                    " a.dt_atendimento,\n" +
                    " a.status_atend,\n" +
                    " a.medico_responsavel,\n" +
                    " a.hora_inicio,\n" +
                    " a.hora_fim,\n" +
                    " a.especialidade,\n" +
                    " a.tipo_atendimento,\n" +
                    " a.valor_atendimento,\n" +
                    " a.forma_pagamento,\n" +
                    " a.convenio,\n" +
                    " a.nr_carteirinha_convenio,\n" +
                    " a.dt_criacao\n" +
            "from\n" +
                    " atendimento a\n" +
                    " left join paciente p on a.id_paciente = p.id\n" +
                    " left join unidade u on a.id_unidade = u.id",
            nativeQuery = true
    )
    List<AtendPerson> atendimentosPerson();

}
