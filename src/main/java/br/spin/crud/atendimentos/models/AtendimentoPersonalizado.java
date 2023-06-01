package br.spin.crud.atendimentos.models;

import br.spin.crud.atendimentos.repository.AtendimentoRepository;
import org.springframework.data.annotation.Immutable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Immutable
@Table(name = "atendimentos")
public class AtendimentoPersonalizado {

    @Id
    private Integer id;

    private String dtAtendimento;

    private String nomePaciente;

    private String dtNascimento;

    private String nomeUnidade;

    public AtendimentoPersonalizado(Integer id, String dtAtendimento, String nomePaciente, String dtNascimento, String nomeUnidade) {
        this.id = id;
        this.dtAtendimento = dtAtendimento;
        this.nomePaciente = nomePaciente;
        this.dtNascimento = dtNascimento;
        this.nomeUnidade = nomeUnidade;
    }

    public AtendimentoPersonalizado() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDtAtendimento() {
        return dtAtendimento;
    }

    public void setDtAtendimento(String dtAtendimento) {
        this.dtAtendimento = dtAtendimento;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }

    public void setNomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public String getDtNascimento() {
        return dtNascimento;
    }

    public void setDtNascimento(String dtNascimento) {
        this.dtNascimento = dtNascimento;
    }

    public String getNomeUnidade() {
        return nomeUnidade;
    }

    public void setNomeUnidade(String nomeUnidade) {
        this.nomeUnidade = nomeUnidade;
    }

//    • ID do atendimento
//    • Data do atendimento ( dd/mm/yyyy )
//    • Nome do paciente
//    • Data de nascimento do paciente ( dd/mm/yyyy )
//    • Nome da unidade

}
