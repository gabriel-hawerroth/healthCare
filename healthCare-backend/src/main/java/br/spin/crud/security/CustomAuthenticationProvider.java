package br.spin.crud.security;

import br.spin.crud.models.AccessLog;
import br.spin.crud.models.User;
import br.spin.crud.repository.AccessLogRepository;
import br.spin.crud.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Primary
@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationManager {

    private final UserRepository userRepository;
    private final AccessLogRepository accessLogRepository;
    private final BCryptPasswordEncoder encoder;

    @Override
    public Authentication authenticate(Authentication sendedCredentials) throws AuthenticationException {
        Authentication authentication = this.fazerLogin(
                sendedCredentials.getPrincipal().toString(),
                sendedCredentials.getCredentials().toString()
        );

        ((AbstractAuthenticationToken) authentication).setDetails(authentication.getDetails());

        return authentication;
    }

    private Authentication fazerLogin(String username, String password) {
        final User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new BadCredentialsException("Bad credentials"));

        if (!encoder.matches(password, user.getSenha()))
            throw new BadCredentialsException("Bad credentials");

        AccessLog log = new AccessLog(user.getId(), user.getEmail(), LocalDateTime.now());
        accessLogRepository.save(log);

        return new UsernamePasswordAuthenticationToken(user, null, null);
    }

}
