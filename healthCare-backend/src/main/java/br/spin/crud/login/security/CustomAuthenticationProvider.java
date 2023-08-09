package br.spin.crud.login.security;

import br.spin.crud.login.models.Usuario;
import br.spin.crud.login.repository.UsuarioRepository;
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

@Primary
@Component
public class CustomAuthenticationProvider implements AuthenticationManager {

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private UsuarioRepository loginRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getPrincipal().toString();
        String password = authentication.getCredentials().toString();

        Authentication usuario = this.fazerLogin(username, password);
        if (usuario == null) {
            throw new BadCredentialsException("Bad credentials");
        }

        ((AbstractAuthenticationToken) usuario).setDetails(authentication.getDetails());

        return usuario;
    }

    private Authentication fazerLogin(String username, String password) {
        Usuario loginExistente = loginRepository.findByUsuario(username);
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
