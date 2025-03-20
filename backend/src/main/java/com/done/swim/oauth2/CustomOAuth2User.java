package com.done.swim.oauth2;

import com.done.swim.domain.user.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter
public class CustomOAuth2User implements OAuth2User {

    @Getter
    private final User user;
    private final OAuth2User oAuth2User;

    public CustomOAuth2User(User user, OAuth2User oAuth2User) {
        this.user = user;
        this.oAuth2User = oAuth2User;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oAuth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oAuth2User.getAuthorities();
    }

    @Override
    public String getName() {
        return user.getEmail();
    }
}
