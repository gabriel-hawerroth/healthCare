package br.spin.crud.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "atendimento")
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    private Integer id_paciente;

    private Integer id_unidade;

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

    @Column(name = "user_id")
    private Long userId;
}
