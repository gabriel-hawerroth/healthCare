package br.spin.crud.login.repository;

import br.spin.crud.login.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByUsuario(String usuario);

    List<Usuario> findByUsuarioContainingAndSituacaoContainingAndAcessoContaining(String dsNome, String situacao, String acesso);

}
