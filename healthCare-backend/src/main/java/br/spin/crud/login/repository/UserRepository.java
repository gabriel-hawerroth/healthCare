package br.spin.crud.login.repository;

import br.spin.crud.login.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsuario(String usuario);

    List<User> findByUsuarioContainingAndSituacaoContainingAndAcessoContaining(String dsNome, String situacao, String acesso);

}
