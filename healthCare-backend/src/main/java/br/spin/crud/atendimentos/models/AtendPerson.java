package br.spin.crud.atendimentos.models;

import org.hibernate.annotations.Immutable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Immutable
@Table(name = "atends_person")
public class AtendPerson {

    @Id
    public Integer id;

    private String ds_paciente;

    private String ds_unidade;

    private LocalDate dt_atendimento;

    private String status_atend;

    private String medico_responsavel;

    private String hora_inicio;

    private String hora_fim;

    private String especialidade;

    private String tipo_atendimento;

    private Integer valor_atendimento;

    private String forma_pagamento;

    private String convenio;

    private String nr_carteirinha_convenio;

    private LocalDate dt_criacao;

    public Integer getId() {
        return id;
    }

    public String getDs_paciente() {
        return ds_paciente;
    }

    public String getDs_unidade() {
        return ds_unidade;
    }

    public LocalDate getDt_atendimento() {
        return dt_atendimento;
    }

    public String getStatus_atend() {
        return status_atend;
    }

    public String getMedico_responsavel() {
        return medico_responsavel;
    }

    public String getHora_inicio() {
        return hora_inicio;
    }

    public String getHora_fim() {
        return hora_fim;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public String getTipo_atendimento() {
        return tipo_atendimento;
    }

    public Integer getValor_atendimento() {
        return valor_atendimento;
    }

    public String getForma_pagamento() {
        return forma_pagamento;
    }

    public String getConvenio() {
        return convenio;
    }

    public String getNr_carteirinha_convenio() {
        return nr_carteirinha_convenio;
    }

    public LocalDate getDt_criacao() {
        return dt_criacao;
    }
}
