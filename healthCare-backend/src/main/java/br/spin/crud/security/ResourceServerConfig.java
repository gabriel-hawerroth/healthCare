package br.spin.crud.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/login/permit-change-password/{userId}/{token}").permitAll()
                .antMatchers("/login/activate-account/{userId}/{token}").permitAll()
                .antMatchers("/login/send-activate-account-email").permitAll()
                .antMatchers("/login/send-change-password-email").permitAll()
                .antMatchers("/login/change-password").permitAll()
                .antMatchers("/user/get-by-email").permitAll()
                .antMatchers("/user/new-user").permitAll()
                .antMatchers("/user/{id}").permitAll()
                .anyRequest().authenticated();
    }
}
