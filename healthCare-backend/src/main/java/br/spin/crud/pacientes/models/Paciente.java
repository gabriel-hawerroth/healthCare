package br.spin.crud.pacientes.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "paciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ds_nome;

    private String nr_rg;

    private String nr_cpf;

    private LocalDate dt_nascimento;

    private String nr_celular;

    private String status;

    private String nome_mae;

    private String nome_pai;

    private String genero;

    private String estado_civil;

    private String nacionalidade;

    private String etnia;

    private String religiao;

    private int peso_kg;

    private int altura_cm;

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

    private int idade_min;

    private int idade_max;

    private String obs_preferencias;

    private String nr_cep;

    private String estado;

    private String cidade;

    private String bairro;

    private String endereco;

    private String nr_endereco;

    private String complemento;

    private String como_chegar;

    private String ie_situacao;

    private LocalDate dt_criacao;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDs_nome() {
        return ds_nome;
    }

    public void setDs_nome(String ds_nome) {
        this.ds_nome = ds_nome;
    }

    public String getNr_rg() {
        return nr_rg;
    }

    public void setNr_rg(String nr_rg) {
        this.nr_rg = nr_rg;
    }

    public String getNr_cpf() {
        return nr_cpf;
    }

    public void setNr_cpf(String nr_cpf) {
        this.nr_cpf = nr_cpf;
    }

    public LocalDate getDt_nascimento() {
        return dt_nascimento;
    }

    public void setDt_nascimento(LocalDate dt_nascimento) {
        this.dt_nascimento = dt_nascimento;
    }

    public String getNr_celular() {
        return nr_celular;
    }

    public void setNr_celular(String nr_celular) {
        this.nr_celular = nr_celular;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNome_mae() {
        return nome_mae;
    }

    public void setNome_mae(String nome_mae) {
        this.nome_mae = nome_mae;
    }

    public String getNome_pai() {
        return nome_pai;
    }

    public void setNome_pai(String nome_pai) {
        this.nome_pai = nome_pai;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getEstado_civil() {
        return estado_civil;
    }

    public void setEstado_civil(String estado_civil) {
        this.estado_civil = estado_civil;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getEtnia() {
        return etnia;
    }

    public void setEtnia(String etnia) {
        this.etnia = etnia;
    }

    public String getReligiao() {
        return religiao;
    }

    public void setReligiao(String religiao) {
        this.religiao = religiao;
    }

    public int getPeso_kg() {
        return peso_kg;
    }

    public void setPeso_kg(int peso_kg) {
        this.peso_kg = peso_kg;
    }

    public int getAltura_cm() {
        return altura_cm;
    }

    public void setAltura_cm(int altura_cm) {
        this.altura_cm = altura_cm;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAlergias() {
        return alergias;
    }

    public void setAlergias(String alergias) {
        this.alergias = alergias;
    }

    public String getDependencia() {
        return dependencia;
    }

    public void setDependencia(String dependencia) {
        this.dependencia = dependencia;
    }

    public Boolean getPermite_atend_online() {
        return permite_atend_online;
    }

    public void setPermite_atend_online(Boolean permite_atend_online) {
        this.permite_atend_online = permite_atend_online;
    }

    public String getObs_diagnostico() {
        return obs_diagnostico;
    }

    public void setObs_diagnostico(String obs_diagnostico) {
        this.obs_diagnostico = obs_diagnostico;
    }

    public LocalDate getDt_inicio_atend() {
        return dt_inicio_atend;
    }

    public void setDt_inicio_atend(LocalDate dt_inicio_atend) {
        this.dt_inicio_atend = dt_inicio_atend;
    }

    public LocalDate getDt_fim_atend() {
        return dt_fim_atend;
    }

    public void setDt_fim_atend(LocalDate dt_fim_atend) {
        this.dt_fim_atend = dt_fim_atend;
    }

    public Boolean getEstoque_empenhado() {
        return estoque_empenhado;
    }

    public void setEstoque_empenhado(Boolean estoque_empenhado) {
        this.estoque_empenhado = estoque_empenhado;
    }

    public Boolean getGuarda_compartilhada() {
        return guarda_compartilhada;
    }

    public void setGuarda_compartilhada(Boolean guarda_compartilhada) {
        this.guarda_compartilhada = guarda_compartilhada;
    }

    public String getGenero_pref() {
        return genero_pref;
    }

    public void setGenero_pref(String genero_pref) {
        this.genero_pref = genero_pref;
    }

    public int getIdade_min() {
        return idade_min;
    }

    public void setIdade_min(int idade_min) {
        this.idade_min = idade_min;
    }

    public int getIdade_max() {
        return idade_max;
    }

    public void setIdade_max(int idade_max) {
        this.idade_max = idade_max;
    }

    public String getObs_preferencias() {
        return obs_preferencias;
    }

    public void setObs_preferencias(String obs_preferencias) {
        this.obs_preferencias = obs_preferencias;
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

    public String getIe_situacao() {
        return ie_situacao;
    }

    public void setIe_situacao(String ie_situacao) {
        this.ie_situacao = ie_situacao;
    }

    public LocalDate getDt_criacao() {
        return dt_criacao;
    }

    public void setDt_criacao(LocalDate dt_criacao) {
        this.dt_criacao = dt_criacao;
    }
}
