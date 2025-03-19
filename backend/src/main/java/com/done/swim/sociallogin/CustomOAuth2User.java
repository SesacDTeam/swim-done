package com.done.swim.sociallogin;

import com.done.swim.domain.user.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
public class CustomOAuth2User implements OAuth2User {

    // 실제 사용자 정보
    @Getter
    private final User user;
    // 소셜 로그인에서 받은 사용자 정보
    private final Map<String, Object> attributes;

    public CustomOAuth2User(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    // OAuth2User 인터페이스 구현: 인증된 사용자의 추가 속성들을 반환
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getName() {
        return user.getNickname();
    }

}
