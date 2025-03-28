package com.done.swim.global.security.handler;


import com.done.swim.common.ApiResponse;
import com.done.swim.global.exception.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);


        ApiResponse<Void> errorResponse = ApiResponse.error(ErrorCode.DEFAULT_FORBIDDEN.getMessage(), ErrorCode.DEFAULT_FORBIDDEN.getCode());
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}