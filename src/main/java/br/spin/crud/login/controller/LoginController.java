package br.spin.crud.login.controller;

import br.spin.crud.login.models.NomeUsuario;
import br.spin.crud.login.models.PasswordReset;
import br.spin.crud.login.repository.LoginRepository;
import br.spin.crud.login.models.Login;
import br.spin.crud.login.models.StaticLogin;
import br.spin.crud.login.repository.PasswordResetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/login")
public class LoginController {

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    Random random = new Random();
    String encriptedPassword = "";
    Long id_usuario = 2L;
    Integer tokenPasswordReset;
    LocalDate dt_solicitacao;

    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private PasswordResetRepository passwordResetRepository;

    @GetMapping
    private List<Login> listaLogins() {
        return loginRepository.findAll();
    }

    @PostMapping
    private Login salvarLogin(@RequestBody Login login) {
        encriptedPassword = encoder.encode(login.getSenha());
        login.setSenha(encriptedPassword);
        return loginRepository.save(login);
    }

    @PostMapping("/resetPassword")
    private void resetarSenha(@RequestBody NomeUsuario nomeUsuario){
        Login loginExistente = loginRepository.findByUsuario(nomeUsuario.getDs_usuario());
        if (loginExistente == null) {
            throw new BadCredentialsException("Usuario inexistente!");
        } else {
            tokenPasswordReset = random.nextInt(900000) + 100000;
            dt_solicitacao = LocalDate.now();
            PasswordReset reset = new PasswordReset();
            reset.setId_usuario(id_usuario);
            reset.setToken(String.valueOf(tokenPasswordReset));
            reset.setDt_solicitacao(dt_solicitacao);
            passwordResetRepository.save(reset);
        }

    }

}
