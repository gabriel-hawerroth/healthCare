package br.spin.crud.login.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "resetpassword")
public class PasswordReset {

    @Id
    private Long id_usuario;

    private String token;

    private LocalDate dt_solicitacao;

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDate getDt_solicitacao() {
        return dt_solicitacao;
    }

    public void setDt_solicitacao(LocalDate dt_reset) {
        this.dt_solicitacao = dt_reset;
    }
}
