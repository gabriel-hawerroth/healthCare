package br.spin.crud.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "paciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ds_nome;

    private String nr_cpf;

    private LocalDate dt_nascimento;

    private String nr_celular;

    private String status;

    private String ie_situacao;

    private String nome_mae;

    private String nome_pai;

    private String genero;

    private String estado_civil;

    private String nacionalidade;

    private String etnia;

    private String religiao;

    private Integer peso_kg;

    private Integer altura_cm;

    private String email;

    private String alergias;

    private String dependencia;

    private boolean permite_atend_online;

    private String obs_diagnostico;

    private LocalDate dt_inicio_atend;

    private LocalDate dt_fim_atend;

    private boolean estoque_empenhado;

    private boolean guarda_compartilhada;

    private String genero_pref;

    private Integer idade_min;

    private Integer idade_max;

    private String obs_preferencias;

    private String nr_cep;

    private String estado;

    private String cidade;

    private String bairro;

    private String endereco;

    private Integer nr_endereco;

    private String complemento;

    private String como_chegar;

    private LocalDate dt_criacao;

    private long user_id;
}
