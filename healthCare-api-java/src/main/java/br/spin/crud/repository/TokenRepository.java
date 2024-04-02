package br.spin.crud.repository;

import br.spin.crud.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Token findByUserId(long userId);
}
