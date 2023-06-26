package br.spin.crud.pacientes.repository;

import br.spin.crud.atendimentos.models.InterfacesJPA;
import br.spin.crud.pacientes.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

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
    public List<InterfacesJPA.AtendimentosPaciente> atendimentosPacinte(Integer id, Integer idDois, Integer idTres);

}
