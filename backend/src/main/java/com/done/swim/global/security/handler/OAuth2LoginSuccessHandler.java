package com.done.swim.global.security.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

        // 인가 코드 로그 출력 (인가 코드는 request의 "code" 파라미터에 있을 가능성이 있음)
        String authorizationCode = request.getParameter("code");
        System.out.println(" 받은 인가 코드: " + authorizationCode);

        //  로그인 성공 후 리디렉트할 URL 설정 (프론트엔드 페이지로 보낼 수도 있음)
        response.sendRedirect("http://localhost:5173/");

        //  JWT 토큰 발급 등의 추가 로직을 여기에 구현 가능
    }
}