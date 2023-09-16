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
    private String activaUser(@PathVariable Long userId, @PathVariable String token) {
        String savedToken = tokenRepository.findByUserId(userId).getToken();

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Conta inexistente")
        );

        if (user.getSituacao().equals("A")) return "Essa conta já está ativa";

        if (token.equals(savedToken)) {
            user.setSituacao("A");
            userRepository.save(user);
            return "Conta ativada com sucesso";
        } else {
            return "Token inválido, entre em contato com nosso suporte";
        }
    }

    @PostMapping("/requestPermissionToChangePassword")
    private void requestPermissionToChangePassword(@RequestParam Long userId) throws MessagingException {
        userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "user not found")
        );

        sendRequetPermissionMail(userId);
    }

    @GetMapping("/permitChangePassword/{userId}")
    private String permitChangePassword(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "user not found")
        );

        user.setCanChangePassword(true);
        userRepository.save(user);

        return "Permissão concedida";
    }

    private void sendActivateAccountEmail(Token token) throws MessagingException {
        EmailDTO email = new EmailDTO();
        User user = userRepository.findById(token.getUserId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST)
        );

        email.setDestinatario(user.getEmail());
        email.setAssunto("Ativação da conta HealthCare");
        email.setConteudo("Clique no link a seguir para ativar sua conta: "
                + "http://3.144.152.77:8080/healthcare/login/activateAccount/"
                + token.getUserId() + "/" + token.getToken()
                + ".\n\n Agradeço pelo seu tempo dedicado ao teste do sistema, sinta-se a vontade"
                + " para enviar um email com sugestões de melhoria, dúvidas ou qualquer outro assunto.");
        emailService.enviarEmail(email);
    }

    private void sendRequetPermissionMail(Long userId) throws MessagingException {
        EmailDTO email = new EmailDTO();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST)
        );

        email.setDestinatario(user.getEmail());
        email.setAssunto("Permissão para alterar senha HealthCare");
        email.setConteudo("Clique no link a seguir para permitir a alteração de senha:"
                + "http://3.144.152.77:8080/healthcare/login/permitChangePassword/" + userId
                + ".\n\n Agradeço pelo seu tempo dedicado ao teste do sistema, sinta-se a vontade"
                + " para enviar um email com sugestões de melhoria, dúvidas ou qualquer outro assunto.");

        emailService.enviarEmail(email);
    }

    private static String calculateHash(String input, String algorithm) throws NoSuchAlgorithmException {
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
