package br.spin.crud.atendimentos.models;

import javax.persistence.*;
import java.time.LocalDate;
import br.spin.crud.pacientes.models.*;
import br.spin.crud.unidades.models.*;

@Entity
@Table(name = "atendimento")
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    private LocalDate dt_atendimento;

    private String hora_inicio;

    private String hora_fim;

    @ManyToOne
    @JoinColumn(name = "id_paciente")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_unidade")
    private Unidade unidade;

    private String medico_responsavel;

    private String especialidade;

    private String tipo_atendimento;

    private String valor_atendimento;

    private String convenio;

    private String nr_carteirinha_convenio;

    private String status_atend;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDt_atendimento() {
        return dt_atendimento;
    }

    public void setDt_atendimento(LocalDate dt_atendimento) {
        this.dt_atendimento = dt_atendimento;
    }

    public String getHora_inicio() {
        return hora_inicio;
    }

    public void setHora_inicio(String hora_inicio) {
        this.hora_inicio = hora_inicio;
    }

    public String getHora_fim() {
        return hora_fim;
    }

    public void setHora_fim(String hora_fim) {
        this.hora_fim = hora_fim;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public void setUnidade(Unidade unidade) {
        this.unidade = unidade;
    }

    public String getMedico_responsavel() {
        return medico_responsavel;
    }

    public void setMedico_responsavel(String medico_responsavel) {
        this.medico_responsavel = medico_responsavel;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getTipo_atendimento() {
        return tipo_atendimento;
    }

    public void setTipo_atendimento(String tipo_atendimento) {
        this.tipo_atendimento = tipo_atendimento;
    }

    public String getValor_atendimento() {
        return valor_atendimento;
    }

    public void setValor_atendimento(String valor_atendimento) {
        this.valor_atendimento = valor_atendimento;
    }

    public String getConvenio() {
        return convenio;
    }

    public void setConvenio(String convenio) {
        this.convenio = convenio;
    }

    public String getNr_carteirinha_convenio() {
        return nr_carteirinha_convenio;
    }

    public void setNr_carteirinha_convenio(String nr_carteirinha_convenio) {
        this.nr_carteirinha_convenio = nr_carteirinha_convenio;
    }

    public String getStatus_atend() {
        return status_atend;
    }

    public void setStatus_atend(String status_atend) {
        this.status_atend = status_atend;
    }
}
