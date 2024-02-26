package br.spin.crud.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
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
}
