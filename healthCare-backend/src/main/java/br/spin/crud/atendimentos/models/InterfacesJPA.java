package br.spin.crud.atendimentos.models;

public class InterfacesJPA {

    public interface RetornoAtendimentoSQLNativo {

        Integer getId();
        String getDt_atendimento();
        String getNome_paciente();
        String getNome_medico();
        String getNome_unidade();
        String getStatus_atend();

    }

    public interface AtendimentosPaciente {
        Integer getId_atendimento();
        String getDt_atendimento();
        String getNome_unidade();
    }

}
