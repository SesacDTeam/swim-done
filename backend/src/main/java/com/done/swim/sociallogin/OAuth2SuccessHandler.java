package com.done.swim.sociallogin;

import com.done.swim.domain.user.entity.User;
import com.done.swim.global.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    // OAuth2SuccessHandler : 로그인 성공 후 처리 로직 (리다이렉트 URL, 토큰 생성 등 담당)

    private final JwtTokenProvider jwtTokenProvider;

    @Value("${origin}")
    private String origin;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // authentication에서 principal을 가져옴
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // User 객체를 가져오기
        User user = oAuth2User.getUser();

        // JWT 생성
        String token = jwtTokenProvider.createToken(authentication, user); // User 객체를 함께 전달

        // JWT를 프론트엔드로 전달
        response.addHeader("Authorization", "Bearer " + token);
        getRedirectStrategy().sendRedirect(request, response, origin + "/naver/login-success?token=" + token);
    }
}
