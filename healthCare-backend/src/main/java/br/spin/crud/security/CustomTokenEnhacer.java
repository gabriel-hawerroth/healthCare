package br.spin.crud.security;

import br.spin.crud.models.User;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.HashMap;

@Primary
@Component
public class CustomTokenEnhacer extends JwtAccessTokenConverter {

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken acessToken,
                                     OAuth2Authentication authentication) {
        if (authentication.getOAuth2Request().getGrantType().equalsIgnoreCase("password")) {
            final Map<String, Object> additionalInfo = new HashMap<>();
            User user = (User) authentication.getUserAuthentication().getPrincipal();
            additionalInfo.put("username", user.getUsername());
            ((DefaultOAuth2AccessToken) acessToken).setAdditionalInformation(additionalInfo);
        }
        return acessToken;
    }
}
