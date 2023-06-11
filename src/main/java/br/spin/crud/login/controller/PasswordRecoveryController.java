package br.spin.crud.login.controller;

import br.spin.crud.login.models.EmailDTO;
import br.spin.crud.login.models.Login;
import br.spin.crud.login.models.PasswordReset;
import br.spin.crud.login.repository.LoginRepository;
import br.spin.crud.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import br.spin.crud.login.repository.PasswordResetRepository;

import javax.mail.MessagingException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("passwordRecovery")
public class PasswordRecoveryController {
    private final EmailService emailService;

    @Autowired
    public PasswordRecoveryController(EmailService emailService) {
        this.emailService = emailService;
    }
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private PasswordResetRepository passwordResetRepository;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    Random random = new Random();
    String encriptedPassword = "";


    @PostMapping("/gerarToken/{nomeUsuario}") //método que solicita o usuário, gera um token e salva no banco
    private void gerarToken(@PathVariable(name = "nomeUsuario") String Usuario) throws MessagingException {
        if (loginRepository.findByUsuarioEmail(Usuario) == null) {
            throw new BadCredentialsException("Usuario inexistente!");
        } else {
            PasswordReset reset = new PasswordReset();
            reset.setId_usuario(loginRepository.findByUsuarioEmail(Usuario).getId());
            reset.setToken(String.valueOf(random.nextInt(900000) + 100000));
            reset.setDt_solicitacao(LocalDate.now());
            passwordResetRepository.save(reset);
            enviarEmail(reset);
        }
    }

    private void enviarEmail(PasswordReset reset) throws MessagingException {
        Login login = loginRepository.findById(reset.getId_usuario()).get();
        EmailDTO email = new EmailDTO();
        email.setDestinatario(login.getUsuarioEmail());
        email.setAssunto("Token para recuperação de senha HealthCare");
        email.setConteudo("O Token para recuperação da senha é " + reset.getToken());
        emailService.enviarEmail(email.getDestinatario(), email.getAssunto(), email.getConteudo());
    }

    @PostMapping("/trocarSenha")
    private String redefinirSenha(
            @RequestParam(name = "token") String token,
            @RequestParam(name = "novaSenha") String novaSenha
    ) {
        Optional<PasswordReset> passwordResetOpt = passwordResetRepository.findByToken(token);
        if (passwordResetOpt.isPresent()) {
            PasswordReset passwordReset = passwordResetOpt.get();
            if (token.equals(passwordReset.getToken())) {
                Optional<Login> loginOpt = loginRepository.findById(passwordReset.getId_usuario());
                if (loginOpt.isPresent()) {
                    Login login = loginOpt.get();
                    encriptedPassword = encoder.encode(novaSenha);
                    login.setSenha(encriptedPassword);
                    loginRepository.save(login);
                    return "Senha alterada com sucesso";
                } else {
                    return "Erro, usuário inexistente";
                }
            }
        } else {
            return "Token inválido";
        }
        return "";
    }

}
