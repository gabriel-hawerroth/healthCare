package br.spin.crud.login.controller;

import br.spin.crud.login.models.EmailDTO;
import br.spin.crud.login.models.Token;
import br.spin.crud.login.repository.TokenRepository;
import br.spin.crud.login.repository.UserRepository;
import br.spin.crud.login.models.User;
import br.spin.crud.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Random;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    public LoginController(EmailService emailService) {
        this.emailService = emailService;
    }
    @Autowired
    private BCryptPasswordEncoder bcrypt;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenRepository tokenRepository;

    Random random = new Random();
    private final EmailService emailService;

    @GetMapping
    private List<User> listaUsuarios(
            @RequestParam String usuario,
            @RequestParam String situacao,
            @RequestParam String acesso
    ) {
        return userRepository.findByUsuarioContainingAndSituacaoContainingAndAcessoContaining(usuario, situacao, acesso);
    }

    @GetMapping("/{id}")
    private User findById(@PathVariable(name = "id") Long id) {
        return userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado")
        );
    }

    @GetMapping("/getByEmail")
    private User findByUsuario(@RequestParam String email) {
        return userRepository.findByUsuario(email);
    }

    @PostMapping("/new-user")
    private User novoUsuario(@RequestBody User user) {
        user.setSenha(bcrypt.encode(user.getSenha()));
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    private void excluirUsuario(@PathVariable(name = "id") Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado")
        );
        userRepository.deleteById(id);
    }

    @PostMapping("/sendToken")
    private void gerarToken(@RequestParam String user) throws MessagingException {
        Token tok = tokenRepository.findByUser(user);

        Token token = new Token();
        if (tok != null) token.setId(tok.getId());
        token.setUser(user);
        token.setToken(String.valueOf(random.nextInt(900000) + 100000));
        tokenRepository.save(token);

        enviarEmail(token);
    }

    private void enviarEmail(Token token) throws MessagingException {
        EmailDTO email = new EmailDTO();

        email.setDestinatario(token.getUser());
        email.setAssunto("Token HealthCare");
        email.setConteudo("Seu token de confirmação é " + token.getToken()
                + ". Agradeço pelo seu tempo dedicado ao teste do sistema, sinta-se a vontade"
                + " para enviar um email com sugestões de melhoria, dúvidas ou qualquer outro assunto.");
        emailService.enviarEmail(email.getDestinatario(), email.getAssunto(), email.getConteudo());
    }

    @GetMapping("/checkToken")
    private Token checkToken(@RequestParam String user) {
        return tokenRepository.findByUser(user);
    }

//    @PutMapping("/")
}
