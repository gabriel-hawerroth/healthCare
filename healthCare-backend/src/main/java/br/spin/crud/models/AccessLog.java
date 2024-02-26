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
    private long id;

    private long user_id;

    private LocalDateTime login_dt;

    public AccessLog(long user_id, LocalDateTime login_dt) {
        this.user_id = user_id;
        this.login_dt = login_dt;
    }
}
