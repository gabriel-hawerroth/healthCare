package br.spin.crud.services;

import br.spin.crud.enums.EmailType;
import br.spin.crud.models.EmailDTO;
import br.spin.crud.models.Token;
import br.spin.crud.models.User;
import br.spin.crud.repository.TokenRepository;
import br.spin.crud.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import javax.mail.MessagingException;
import java.net.URI;
import java.util.List;

import static br.spin.crud.services.UtilsService.calculateHash;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final BCryptPasswordEncoder bcrypt;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;

    public List<User> listaUsuarios() {
        return userRepository.findAll();
    }

    public User findById(long id) {
        return userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado"));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }

    public User novoUsuario(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "User already exists");

        user.setSenha(bcrypt.encode(user.getSenha()));
        return userRepository.save(user);
    }

    public User editUser(User user) {
        final User existentUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found"));

        if (user.getSenha().isEmpty()) {
            user.setSenha(existentUser.getSenha());
        } else {
            user.setSenha(bcrypt.encode(user.getSenha()));
        }
        return userRepository.save(user);
    }

    public ResponseEntity<Void> excluirUsuario(long id) {
        try {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
    }

    public void activateAccount(long userId) {
        final Token tok = tokenRepository.findByUserId(userId);
        final User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        final Token token = new Token();
        if (tok != null) token.setId(tok.getId());
        token.setUserId(user.getId());
        token.setToken(calculateHash(user.getEmail()));
        tokenRepository.save(token);

        sendActivateAccountEmail(token);
    }

    public ResponseEntity<Void> activaUser(long userId, String token) {
        final String savedToken = tokenRepository.findByUserId(userId).getToken();
        final User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Conta inexistente"));

        if (savedToken.equals(token)) {
            user.setSituacao("A");
            userRepository.save(user);
        }

        final String redirectUrl = UriComponentsBuilder
                .fromUriString("http://hawetec.com.br/healthcare/ativacao-da-conta").build().toUriString();

        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create(redirectUrl))
                .build();
    }

    public void requestPermissionToChangePassword(long userId) {
        final Token tok = tokenRepository.findByUserId(userId);
        final User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        final Token token = new Token();
        if (tok != null) token.setId(tok.getId());
        token.setUserId(user.getId());
        token.setToken(calculateHash(user.getEmail()));
        tokenRepository.save(token);

        sendChangePasswordEmail(user, token.getToken());
    }

    public ResponseEntity<Void> permitChangePassword(long userId, String token) {
        final String savedToken = tokenRepository.findByUserId(userId).getToken();
        final User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "user not found"));

        if (savedToken.equals(token)) {
            user.setCanChangePassword(true);
            userRepository.save(user);
        }

        final String redirectUrl = UriComponentsBuilder
                .fromUriString("http://hawetec.com.br/healthcare/recuperacao-da-senha/" + user.getId())
                .build().toUriString();

        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create(redirectUrl))
                .build();
    }

    public ResponseEntity<User> changePassword(long userId, String newPassword) {
        final User user = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        if (!user.isCanChangePassword()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sem permissão para alterar a senha");
        }

        user.setSenha(bcrypt.encode(newPassword));
        user.setCanChangePassword(false);

        return ResponseEntity.status(HttpStatus.OK).body(userRepository.save(user));
    }

    private void sendActivateAccountEmail(Token token) {
        try {
            final User user = userRepository.findById(token.getUserId()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

            emailService.enviarEmail(
                    new EmailDTO(
                            user.getEmail(),
                            "Ativação da conta HealthCare",
                            emailService.buildEmailTemplate(EmailType.ACTIVATE_ACCOUNT, user.getId(), token.getToken())
                    )
            );
        } catch (MessagingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void sendChangePasswordEmail(User user, String token) {
        try {
            emailService.enviarEmail(
                    new EmailDTO(
                            user.getEmail(),
                            "Alteração da senha HealthCare",
                            emailService.buildEmailTemplate(EmailType.CHANGE_PASSWORD, user.getId(), token)
                    )
            );
        } catch (MessagingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
