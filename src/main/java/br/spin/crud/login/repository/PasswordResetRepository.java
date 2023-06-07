package br.spin.crud.login.repository;

import br.spin.crud.login.models.Login;
import br.spin.crud.login.models.PasswordReset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Long> {

    public Optional<PasswordReset> findByToken(String token);
}
