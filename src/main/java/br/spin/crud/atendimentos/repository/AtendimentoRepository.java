package br.spin.crud.atendimentos.repository;

import br.spin.crud.atendimentos.models.Atendimento;
import br.spin.crud.atendimentos.models.InterfacesJPA.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Integer> {

    @Query(value =
            "select a.id id_atendimento, " +
            "date_format(a.dt_atendimento, '%d/%m/%Y') dt_atendimento, " +
            "b.ds_nome nome_unidade " +
            "from atendimento a " +
            "left join unidade b on a.id_unidade = b.id " +
            "where ((a.id_paciente = :id) " +
            "or (a.id_paciente = :idDois) " +
            "or (a.id_paciente = :idTres))",
            nativeQuery = true
    )
    public List<AtendimentosPaciente> atendimentosPacinte(Integer id, Integer idDois, Integer idTres);

    @Query(value =
            "select a.id id, date_format(a.dt_atendimento,  '%d/%m/%Y') dt_atendimento, b.ds_nome nome_paciente, " +
            "a.ds_medico nome_medico, c.ds_nome nome_unidade, a.status_atend " +
            "from atendimento a " +
            "left join paciente b on a.id_paciente = b.id " +
            "left join unidade c on a.id_unidade = c.id " +
            "where a.dt_atendimento >= ?",
            nativeQuery = true
    )
    public List<RetornoAtendimentoSQLNativo> atendimentosData(LocalDate data);
}
