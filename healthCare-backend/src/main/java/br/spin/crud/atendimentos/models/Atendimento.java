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

    private String ds_medico;

    private String status_atend;

    @ManyToOne
    @JoinColumn(name = "id_paciente")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_unidade")
    private Unidade unidade;

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

    public String getDs_medico() {
        return ds_medico;
    }

    public void setDs_medico(String ds_medico) {
        this.ds_medico = ds_medico;
    }

    public String getStatus_atend() {
        return status_atend;
    }

    public void setStatus_atend(String status_atend) {
        this.status_atend = status_atend;
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

}
