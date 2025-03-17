package com.done.swim.global.security.handler;

// 사용시 주석을 풀어주세요

// Security 의존성 필요한 클래스
//@Component
//public class CustomAccessDeniedHandler implements AccessDeniedHandler {
//
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    @Override
//    public void handle(HttpServletRequest request,
//                       HttpServletResponse response,
//                       AccessDeniedException accessDeniedException) throws IOException {
//
//        response.setContentType("application/json;charset=UTF-8");
//        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//
//
//        ApiResponse<Void> errorResponse = ApiResponse.error("접근 권한이 없습니다.", "FORBIDDEN");
//        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
//    }
//}