package br.spin.crud.unidades.models;

import javax.persistence.*;
import java.time.LocalDate;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDs_nome() {
        return dsNome;
    }

    public void setDs_nome(String ds_nome) {
        this.dsNome = ds_nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNr_telefone() {
        return nr_telefone;
    }

    public void setNr_telefone(String nr_telefone) {
        this.nr_telefone = nr_telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIe_situacao() {
        return ieSituacao;
    }

    public void setIe_situacao(String ie_situacao) {
        this.ieSituacao = ie_situacao;
    }

    public String getCapacidade_atendimento() {
        return capacidade_atendimento;
    }

    public void setCapacidade_atendimento(String capacidade_atendimento) {
        this.capacidade_atendimento = capacidade_atendimento;
    }

    public String getHorario_funcionamento() {
        return horario_funcionamento;
    }

    public void setHorario_funcionamento(String horario_funcionamento) {
        this.horario_funcionamento = horario_funcionamento;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getEspecialidades_oferecidas() {
        return especialidades_oferecidas;
    }

    public void setEspecialidades_oferecidas(String especialidades_oferecidas) {
        this.especialidades_oferecidas = especialidades_oferecidas;
    }

    public String getNr_cep() {
        return nr_cep;
    }

    public void setNr_cep(String nr_cep) {
        this.nr_cep = nr_cep;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getNr_endereco() {
        return nr_endereco;
    }

    public void setNr_endereco(String nr_endereco) {
        this.nr_endereco = nr_endereco;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getComo_chegar() {
        return como_chegar;
    }

    public void setComo_chegar(String como_chegar) {
        this.como_chegar = como_chegar;
    }

    public LocalDate getDt_criacao() {
        return dt_criacao;
    }

    public void setDt_criacao(LocalDate dt_criacao) {
        this.dt_criacao = dt_criacao;
    }
}
