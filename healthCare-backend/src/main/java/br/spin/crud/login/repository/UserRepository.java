package br.spin.crud.login.repository;

import br.spin.crud.login.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String usuario);

    List<User> findByEmailContainingAndSituacaoContainingAndAcessoContaining(String email, String situacao, String acesso);

}
