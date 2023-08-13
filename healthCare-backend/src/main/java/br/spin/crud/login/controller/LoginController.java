package br.spin.crud.login.controller;

import br.spin.crud.login.models.PasswordReset;
import br.spin.crud.login.repository.UsuarioRepository;
import br.spin.crud.login.models.Usuario;
import br.spin.crud.login.repository.PasswordResetRepository;
import br.spin.crud.unidades.models.Unidade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private BCryptPasswordEncoder bcrypt;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordResetRepository passwordResetRepository;

    @GetMapping("/logar")
    private Usuario login(
            @RequestParam String usuario,
            @RequestParam String senha
    ) {
        Usuario user = usuarioRepository.findByUsuario(usuario);
        if (user != null && bcrypt.matches(senha, user.getSenha())) {
            return user;
        } else {
            throw new IllegalArgumentException("Bad Credentials");
        }
    }

    @GetMapping
    private List<Usuario> listaUsuarios(
            @RequestParam String usuario,
            @RequestParam String situacao,
            @RequestParam String acesso
    ) {
        return usuarioRepository.findByUsuarioContainingAndSituacaoContainingAndAcessoContaining(usuario, situacao, acesso);
    }

    @GetMapping("/{id}")
    private Usuario findById(@PathVariable(name = "id") Long id) {
        return usuarioRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado")
        );
    }

    @PostMapping
    private Usuario criarUsuario(@RequestBody Usuario login) {
        Usuario user = usuarioRepository.findById(login.getId()).get();
        if (login.getSenha() == null || login.getSenha().equals("")) {
            login.setSenha(user.getSenha());
        } else {
            login.setSenha(bcrypt.encode(login.getSenha()));
        }
        return usuarioRepository.save(login);
    }

    @DeleteMapping("/{id}")
    private void excluirUnidade(@PathVariable(name = "id") Long id) {
        Usuario user = usuarioRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado")
        );
        usuarioRepository.deleteById(id);
    }

}
