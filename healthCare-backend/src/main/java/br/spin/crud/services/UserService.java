package br.spin.crud.services;

import br.spin.crud.models.User;
import br.spin.crud.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bcrypt;

    public List<User> listaUsuarios() {
        return userRepository.findAll();
    }

    public ResponseEntity<User> findById(long id) {
        return ResponseEntity.ok().body(
                userRepository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found"))
        );
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }

    public ResponseEntity<User> saveUser(User user) {
        final boolean isNewUser = user.getId() == null;

        if (isNewUser && userRepository.findByEmail(user.getEmail()).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "User already exists");

        if (isNewUser || (user.getSenha() != null && !user.getSenha().isEmpty())) {
            user.setSenha(bcrypt.encode(user.getSenha()));
        } else {
            final String savedPass = userRepository.findById(user.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found"))
                    .getSenha();

            user.setSenha(savedPass);
        }

        return ResponseEntity
                .status(isNewUser ? HttpStatus.CREATED : HttpStatus.OK)
                .body(userRepository.save(user));
    }

    public ResponseEntity<Void> deleteUser(long id) {
        try {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
    }
}
