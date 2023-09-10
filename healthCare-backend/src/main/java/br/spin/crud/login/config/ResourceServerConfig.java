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
        http.authorizeRequests()
                .antMatchers("/login/getByEmail").permitAll()
                .antMatchers("/login/new-user").permitAll()
                .antMatchers("/login/checkToken").permitAll()
                .antMatchers("/login/sendToken").permitAll()
                .antMatchers("/passwordRecovery/**").permitAll()
                .anyRequest().authenticated();
    }
}
