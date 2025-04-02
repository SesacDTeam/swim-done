package com.done.swim.oauth2.handler;

import static org.springframework.boot.convert.Delimiter.NONE;

import com.done.swim.domain.user.entity.User;
import com.done.swim.global.jwt.JwtTokenProvider;
import com.done.swim.oauth2.provider.CustomOAuth2User;
import com.done.swim.oauth2.service.OAuth2TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    // OAuth2SuccessHandler : 로그인 성공 후 처리 로직 (리다이렉트 URL, 토큰 생성 등 담당)
    // 로그인 성공 시 JWT 발급하고 리프레시 토큰을 redis + 쿠키에 저장함
    private final JwtTokenProvider jwtTokenProvider;
    private final OAuth2TokenService oAuth2TokenService;

    @Value("${origin}")
    private String origin;

    @Value("${cookie.secure}")
    private boolean secure;

    @Value("${cookie.same-site}")
    private String sameSite;

    @Value("${SUCCESS_LOGIN}")
    private String successLogin;

    @Value("${COOKIE_DOMAIN}")
    private String cookieDomain;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException {

        // authentication에서 principal을 가져옴
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // User 객체 가져오기
        User user = oAuth2User.getUser();

        // 액세스 토큰 & 리프레시 토큰 발급
        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);

        // 리프레시 토큰을 redis에 저장
        oAuth2TokenService.saveRefreshToken(user.getId(), refreshToken);

        // 리프레시 토큰을 HttpOnly 쿠키에 저장
        addRefreshTokenCookie(response, refreshToken);

        // 리다이렉트
        getRedirectStrategy().sendRedirect(request, response,
            successLogin + "/login-success?token=" + accessToken + "&provider="
                + oAuth2User.getUser().getProvider());
    }

    // 리프레시 토큰을 HttpOnly 쿠키에 저장 (함수로 따로 뺌)
    private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        // TODO : 배포 환경에서 수정 필요 =>  .domain("실제도메인") / .secure(true) / .sameSite("NONE")

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
            .domain(cookieDomain)
            .path("/")
            .httpOnly(true)
            .secure(true) // HTTPS가 아닌 환경에서도 쿠키 설정 가능
            .maxAge(30 * 24 * 60 * 60)
            .sameSite(NONE)
            .build();

        // 응답 헤더에 추가
        response.addHeader("Set-Cookie", cookie.toString());


    }

}