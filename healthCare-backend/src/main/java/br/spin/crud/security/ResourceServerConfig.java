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
                .antMatchers("/login/activate-account/{userId}/{token}").permitAll()
                .antMatchers("/login/permit-change-password/{userId}/{token}").permitAll()
                .antMatchers("/login/sendChangePasswordEmail").permitAll()
                .antMatchers("/login/sendActivateAccountEmail").permitAll()
                .antMatchers("/login/getByEmail").permitAll()
                .antMatchers("/login/new-user").permitAll()
                .antMatchers("/login/changePassword").permitAll()
                .antMatchers("/login/{id}").permitAll()
                .anyRequest().authenticated();
    }
}
