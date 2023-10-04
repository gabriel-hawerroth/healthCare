package br.spin.crud.login.security;

import br.spin.crud.login.models.AccessLog;
import br.spin.crud.login.models.User;
import br.spin.crud.login.repository.AccessLogRepository;
import br.spin.crud.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
public class CustomAuthenticationProvider implements AuthenticationManager {

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccessLogRepository accessLogRepository;

    @Override
    public Authentication authenticate(Authentication sendedCredentials) throws AuthenticationException {
        String username = sendedCredentials.getPrincipal().toString();
        String password = sendedCredentials.getCredentials().toString();

        Authentication authentication = this.fazerLogin(username, password);
        if (authentication == null) {
            throw new BadCredentialsException("Bad credentials");
        }

        ((AbstractAuthenticationToken) authentication).setDetails(authentication.getDetails());

        User user = userRepository.findByEmail(username);
        AccessLog log = new AccessLog(user.getId(), user.getEmail(), LocalDateTime.now());
        accessLogRepository.save(log);

        return authentication;
    }

    private Authentication fazerLogin(String username, String password) {
        User loginExistente = userRepository.findByEmail(username);
        if (loginExistente == null) {
            return null;
        }
        if (!encoder.matches(password, loginExistente.getSenha())){
            return null;
        }

        UserDetailsCustom userDetailsCustom = new UserDetailsCustom(username, password);
        return new UsernamePasswordAuthenticationToken(userDetailsCustom, null, null);
    }

}
