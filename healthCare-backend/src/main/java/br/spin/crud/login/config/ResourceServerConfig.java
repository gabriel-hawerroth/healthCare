package br.spin.crud.login.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
//                .antMatchers("/login/cadastrarUsuario").permitAll()
//                .antMatchers("/passwordRecovery/**").permitAll()
                .antMatchers("/login/**").permitAll()
                .antMatchers("/passwordRecovery/**").permitAll()
                .antMatchers("/atendimentos/**").permitAll()
                .antMatchers("/pacientes/**").permitAll()
                .antMatchers("/unidades/**").permitAll()
                .anyRequest().authenticated();
    }

}
