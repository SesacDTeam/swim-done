package com.done.swim.oauth2.handler;

import com.done.swim.domain.user.entity.User;
import com.done.swim.global.jwt.JwtTokenProvider;
import com.done.swim.oauth2.CustomOAuth2User;
import com.done.swim.oauth2.OAuth2TokenService;
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

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException {

        String authorizationCode = request.getParameter("code");
        System.out.println("✅ [인가 코드] 받은 Authorization Code: " + authorizationCode);

        // authentication에서 principal을 가져옴
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // User 객체 가져오기
        User user = oAuth2User.getUser();

        // 액세스 토큰 & 리프레시 토큰 발급
        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);

        // 콘솔 로그 추가
        System.out.println(" 로그인 성공!");
        System.out.println(" 사용자 ID: " + user.getId());
        System.out.println(" 액세스 토큰: " + accessToken);
        System.out.println(" 리프레시 토큰: " + refreshToken);

        // 리프레시 토큰을 redis에 저장
        oAuth2TokenService.saveRefreshToken(user.getId(), refreshToken);

        // 리프레시 토큰을 HttpOnly 쿠키에 저장
        addRefreshTokenCookie(response, refreshToken);

        // 엑세스 토큰을 프론트엔드에 전달 (응답 헤더로)
        // 리다이렉트 시키기 때문에 헤더에 넣는 게 불필요함
//        response.addHeader("Authorization", "Bearer " + accessToken);

        // 리다이렉트
        getRedirectStrategy().sendRedirect(request, response,
            "http://localhost:5173" + "/login-success?token=" + accessToken);
    }

    // 리프레시 토큰을 HttpOnly 쿠키에 저장 (함수로 따로 뺌)
    private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        // TODO : 배포 환경에서 수정 필요 =>  .domain("실제도메인") / .secure(true) / .sameSite("NONE")

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
            .domain("localhost")
            .path("/")
            .httpOnly(true)
            .secure(secure) // HTTPS가 아닌 환경에서도 쿠키 설정 가능
            .maxAge(30 * 24 * 60 * 60)
            .sameSite(sameSite)
            .build();

        // 응답 헤더에 추가
        response.addHeader("Set-Cookie", cookie.toString());

    }
}
