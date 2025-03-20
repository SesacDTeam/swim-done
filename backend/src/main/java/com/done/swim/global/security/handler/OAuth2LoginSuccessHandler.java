package com.done.swim.global.security.handler;

import com.done.swim.global.security.jwt.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    public OAuth2LoginSuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

        // 인가 코드 로그 출력 (인가 코드는 request의 "code" 파라미터에 있을 가능성이 있음)
//        String authorizationCode = request.getParameter("code");
//        System.out.println(" 받은 인가 코드: " + authorizationCode);

        //  JWT 생성
        String jwtToken = jwtTokenProvider.generateToken(authentication);

        //  JWT 생성 확인 로그 추가
        log.info("🔑 JWT Token: {}", jwtToken);

        //  로그인 성공 후 리디렉트할 URL 설정 (프론트엔드 페이지로 보낼 수도 있음)
        response.sendRedirect("http://localhost:5173/");

    }
}