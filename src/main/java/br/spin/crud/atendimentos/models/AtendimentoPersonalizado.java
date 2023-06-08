package br.spin.crud.atendimentos.models;

import org.springframework.data.annotation.Immutable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Immutable
@Table(name = "atendimentos")
public class AtendimentoPersonalizado {

    @Id
    private Integer id;

    private String dt_atendimento;

    private String nome_paciente;

    private String nome_medico;

    private String nome_unidade;

    private String status_atend;

    public AtendimentoPersonalizado(Integer id, String dtAtendimento, String nomePaciente, String nomeMedico,
            String nomeUnidade, String statusAtend) {
        this.id = id;
        this.dt_atendimento = dtAtendimento;
        this.nome_paciente = nomePaciente;
        this.nome_medico = nomeMedico;
        this.nome_unidade = nomeUnidade;
        this.status_atend = statusAtend;
    }

    public AtendimentoPersonalizado() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDtAtendimento() {
        return dt_atendimento;
    }

    public void setDtAtendimento(String dtAtendimento) {
        this.dt_atendimento = dtAtendimento;
    }

    public String getNomePaciente() {
        return nome_paciente;
    }

    public void setNomePaciente(String nomePaciente) {
        this.nome_paciente = nomePaciente;
    }

    public String getNomeMedico() {
        return nome_medico;
    }

    public void setNomeMedico(String nomeMedico) {
        this.nome_medico = nomeMedico;
    }

    public String getNomeUnidade() {
        return nome_unidade;
    }

    public void setNomeUnidade(String nomeUnidade) {
        this.nome_unidade = nomeUnidade;
    }

    public String getStatusAtend() {
        return status_atend;
    }

    public void setStatusAtend(String statusAtend) {
        this.status_atend = statusAtend;
    }

    // • ID do atendimento
    // • Data do atendimento ( dd/mm/yyyy )
    // • Nome do paciente
    // • Nome do médico
    // • Nome da unidade
    // • Status do atendimento

}
