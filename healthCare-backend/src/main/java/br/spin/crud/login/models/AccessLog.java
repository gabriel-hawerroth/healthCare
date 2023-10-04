package br.spin.crud.login.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "access_log")
public class AccessLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long user_id;

    private String user_email;

    private LocalDateTime login_dt;

    public AccessLog(Long user_id, String user_email, LocalDateTime login_dt) {
        this.user_id = user_id;
        this.user_email = user_email;
        this.login_dt = login_dt;
    }

    public AccessLog() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public LocalDateTime getLogin_dt() {
        return login_dt;
    }

    public void setLogin_dt(LocalDateTime login_dt) {
        this.login_dt = login_dt;
    }
}
