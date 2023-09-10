package br.spin.crud.login.repository;

import br.spin.crud.login.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Token findByUser(String user);
}
