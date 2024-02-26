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

    @Column(name = "ds_nome")
    private String dsNome;

    private String nr_cpf;

    private LocalDate dt_nascimento;

    private String nr_celular;

    private String status;

    @Column(name = "ie_situacao")
    private String ieSituacao;

    private String nome_mae;

    private String nome_pai;

    private String genero;

    private String estado_civil;

    private String nacionalidade;

    private String etnia;

    private String religiao;

    private String peso_kg;

    private String altura_cm;

    private String email;

    private String alergias;

    private String dependencia;

    private Boolean permite_atend_online;

    private String obs_diagnostico;

    private LocalDate dt_inicio_atend;

    private LocalDate dt_fim_atend;

    private Boolean estoque_empenhado;

    private Boolean guarda_compartilhada;

    private String genero_pref;

    private String idade_min;

    private String idade_max;

    private String obs_preferencias;

    private String nr_cep;

    private String estado;

    private String cidade;

    private String bairro;

    private String endereco;

    private String nr_endereco;

    private String complemento;

    private String como_chegar;

    private LocalDate dt_criacao;

    @Column(name = "user_id")
    private Long userId;
}
