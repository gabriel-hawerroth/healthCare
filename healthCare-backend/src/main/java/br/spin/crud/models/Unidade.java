package br.spin.crud.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "unidade")
public class Unidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ds_nome")
    private String dsNome;

    private String cnpj;

    private String nr_telefone;

    private String email;

    @Column(name = "ie_situacao")
    private String ieSituacao;

    private String capacidade_atendimento;

    private String horario_funcionamento;

    private String tipo;

    private String especialidades_oferecidas;

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
