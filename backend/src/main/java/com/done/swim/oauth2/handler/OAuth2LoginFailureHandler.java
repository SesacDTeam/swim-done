package com.done.swim.oauth2.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Enumeration;


@Component
public class OAuth2LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {

        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String paramName = parameterNames.nextElement();
        }

        // 응답 상태 코드 설정 및 리디렉션
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // 로그인 실패 시 리디렉트할 URL 설정
        getRedirectStrategy().sendRedirect(request, response, "/login");
//        //  로그인 실패 시 리디렉트할 URL 설정
//        response.sendRedirect("/loginFailure");

    }
}
