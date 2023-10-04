package br.spin.crud.login.controller;

import br.spin.crud.login.models.EmailDTO;
import br.spin.crud.login.models.Token;
import br.spin.crud.login.repository.TokenRepository;
import br.spin.crud.login.repository.UserRepository;
import br.spin.crud.login.models.User;
import br.spin.crud.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Optional;
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

    private final EmailService emailService;

    @GetMapping
    private List<User> listaUsuarios() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    private User findById(@PathVariable(name = "id") Long id) {
        return userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado")
        );
    }

    @GetMapping("/getByEmail")
    private User findByEmail(@RequestParam String email) {
        return userRepository.findByEmail(email);
    }

    @PostMapping("/new-user")
    private User novoUsuario(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "User already exists");
        }
        user.setSenha(bcrypt.encode(user.getSenha()));
        return userRepository.save(user);
    }

    @PostMapping("/createUser")
    private User createUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "User already exists");
        }
        user.setSenha(bcrypt.encode(user.getSenha()));
        return userRepository.save(user);
    }

    @PutMapping("/editUser")
    private User editUser(@RequestBody User user) {
        Optional<User> existentUser = userRepository.findById(user.getId());

        if (user.getSenha().isEmpty()) {
            if (existentUser.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "the password is required");
            }
            user.setSenha(existentUser.get().getSenha());
        } else {
            user.setSenha(bcrypt.encode(user.getSenha()));
        }
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    private void excluirUsuario(@PathVariable(name = "id") Long id) {
        userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado")
        );
        userRepository.deleteById(id);
    }

    @PostMapping("/sendActivateAccountEmail")
    private void activateAccount(@RequestParam Long userId) throws MessagingException, NoSuchAlgorithmException {
        Token tok = tokenRepository.findByUserId(userId);
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST)
        );

        Token token = new Token();
        if (tok != null) token.setId(tok.getId());
        token.setUserId(user.getId());
        token.setToken(calculateHash(user.getEmail(), "SHA-256"));
        tokenRepository.save(token);

        sendActivateAccountEmail(token);
    }

    @GetMapping("/activateAccount/{userId}/{token}")
    private ResponseEntity<Void> activaUser(@PathVariable Long userId, @PathVariable String token) {
        String savedToken = tokenRepository.findByUserId(userId).getToken();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Conta inexistente")
        );

        if (savedToken.equals(token)) {
            user.setSituacao("A");
            userRepository.save(user);
        };

        String url = "http://hawerroth.dev.br/healthcare/ativacao-da-conta";

        UriComponentsBuilder redirectUriBuilder = UriComponentsBuilder
                .fromUriString(url);

        String redirectUrl = redirectUriBuilder.build().toUriString();

        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create(redirectUrl))
                .build();
    }

    @PostMapping("/sendChangePasswordEmail")
    private void requestPermissionToChangePassword(@RequestParam Long userId) throws MessagingException {
        Token tok = tokenRepository.findByUserId(userId);
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST)
        );

        Token token = new Token();
        if (tok != null) token.setId(tok.getId());
        token.setUserId(user.getId());
        token.setToken(calculateHash(user.getEmail(), "SHA-256"));
        tokenRepository.save(token);

        sendChangePasswordEmail(user, token.getToken());
    }

    @GetMapping("/permitChangePassword/{userId}/{token}")
    private ResponseEntity<Void> permitChangePassword(@PathVariable Long userId, @PathVariable String token) {
        String savedToken = tokenRepository.findByUserId(userId).getToken();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "user not found")
        );

        if (savedToken.equals(token)) {
            user.setCanChangePassword(true);
            userRepository.save(user);
        };

        String url = "http://hawerroth.dev.br/healthcare/recuperacao-da-senha/" + user.getId();

        UriComponentsBuilder redirectUriBuilder = UriComponentsBuilder
                .fromUriString(url);

        String redirectUrl = redirectUriBuilder.build().toUriString();

        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create(redirectUrl))
                .build();
    }

    @PutMapping("/changePassword")
    private ResponseEntity<User> changePassword(@RequestParam Long userId, @RequestParam String newPassword) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST)
        );

        if (!user.getCanChangePassword()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sem permissão para alterar a senha");
        }

        user.setSenha(bcrypt.encode(newPassword));
        user.setCanChangePassword(false);

        return ResponseEntity.status(HttpStatus.OK).body(userRepository.save(user));
    }

    private void sendActivateAccountEmail(Token token) throws MessagingException {
        EmailDTO email = new EmailDTO();
        User user = userRepository.findById(token.getUserId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST)
        );

        email.setDestinatario(user.getEmail());
        email.setAssunto("Ativação da conta HealthCare");
        email.setConteudo("Clique <a href='http://3.144.152.77:8080/healthcare/login/activateAccount/"
                + token.getUserId() + "/" + token.getToken() + "'>aqui</a> para ativar sua conta.<br><br>"
                + "Obrigado pelo tempo dedicado ao teste do sistema, sinta-se a vontade "
                + "para enviar um email com sugestões de melhoria, dúvidas ou qualquer outro assunto.");
        emailService.enviarEmail(email);
    }

    private void sendChangePasswordEmail(User user, String token) throws MessagingException {
        EmailDTO email = new EmailDTO();

        email.setDestinatario(user.getEmail());
        email.setAssunto("Alteração da senha HealthCare");
        email.setConteudo(
                "Clique <a href='http://3.144.152.77:8080/healthcare/login/permitChangePassword/" + user.getId()
                + "/" + token + "'>aqui</a> redefinir sua senha HealthCare.<br><br>"
                + "Obrigado pelo tempo dedicado ao teste do sistema, sinta-se a vontade "
                + "para enviar um email com sugestões de melhoria, dúvidas ou qualquer outro assunto.");

        emailService.enviarEmail(email);
    }

    private static String calculateHash(String input, String algorithm) {
        try {
            MessageDigest digest = MessageDigest.getInstance(algorithm);
            byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));

            // Converter bytes em representação hexadecimal
            StringBuilder hexStringBuilder = new StringBuilder();
            for (byte b : hashBytes) {
                hexStringBuilder.append(String.format("%02x", b));
            }

            return hexStringBuilder.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
