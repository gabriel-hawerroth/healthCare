package br.spin.crud.models;

import java.time.LocalDate;

@SuppressWarnings("unused")
public class InterfacesSQL {

    public interface AtendsPerson {
        long getId();
        String getDs_paciente();
        String getDs_unidade();
        LocalDate getDt_atendimento();
        String getStatus_atend();
        String getMedico_responsavel();
        String getHora_inicio();
        String getHora_fim();
        String getEspecialidade();
        String getTipo_atendimento();
        Integer getValor_atendimento();
        String getForma_pagamento();
        String getConvenio();
        String getNr_carteirinha_convenio();
        LocalDate getDt_criacao();
        long getUserId();
    }
}
