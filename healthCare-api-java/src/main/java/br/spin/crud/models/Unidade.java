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

    private String ds_nome;

    private String cnpj;

    private String nr_telefone;

    private String email;

    private String nr_cep;

    private String estado;

    private String cidade;

    private String bairro;

    private String endereco;

    private Integer nr_endereco;

    private String complemento;

    private String como_chegar;

    private Integer capacidade_atendimento;

    private String horario_funcionamento;

    private String especialidades_oferecidas;

    private String tipo;

    private String ie_situacao;

    private LocalDate dt_criacao;

    private long user_id;
}
