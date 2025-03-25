package com.done.swim.oauth2.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;


@Component
public class OAuth2LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException exception) throws IOException, ServletException {

        // 요청 정보 출력
        System.out.println("=== 요청 정보 ===");
        System.out.println("요청 URL: " + request.getRequestURL());
        System.out.println("요청 메서드: " + request.getMethod());
        System.out.println("요청 파라미터:");
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String paramName = parameterNames.nextElement();
            System.out.println(" - " + paramName + ": " + request.getParameter(paramName));
        }

        // 예외 정보 출력
        System.out.println("=== 예외 정보 ===");
        System.out.println("예외 메시지: " + exception.getMessage());
        System.out.println("예외 클래스: " + exception.getClass().getName());

        // 응답 상태 코드 설정 및 리디렉션
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // 로그인 실패 시 리디렉트할 URL 설정
        getRedirectStrategy().sendRedirect(request, response, "/login");
//        //  로그인 실패 시 리디렉트할 URL 설정
//        response.sendRedirect("/loginFailure");

        //  에러 로그 출력 가능
        System.out.println("로그인 실패: " + exception.getMessage());
    }
}
