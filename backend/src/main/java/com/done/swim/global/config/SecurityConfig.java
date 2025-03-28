package com.done.swim.global.config;


import com.done.swim.global.jwt.JwtAuthenticationFilter;
import com.done.swim.global.security.handler.CustomAccessDeniedHandler;
import com.done.swim.global.security.handler.JwtAuthenticationEntryPoint;
import com.done.swim.oauth2.CustomOAuth2UserService;
import com.done.swim.oauth2.handler.OAuth2LoginFailureHandler;
import com.done.swim.oauth2.handler.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;

    @Value("${spring.security.cors.allowed.origin}")
    private String CORS_ALLOWED_ORIGIN;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 관리 설정 (stateless)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/images").authenticated()
                        .requestMatchers("/login", "/oauth2/**", "/login-success", "/logout").permitAll() // 로그인, OAuth2, 로그아웃 엔드포인트 허용
                        .requestMatchers("/api/auth/**").permitAll() // API 관련 엔드포인트 허용
                        .requestMatchers(HttpMethod.GET, "/api/pools/**", "/api/sections/**").permitAll() // GET 요청 허용
                        .requestMatchers("/api/swimmingtimes/**").permitAll()
                        .requestMatchers("/withdraw").authenticated() // 🔥 회원 탈퇴는 인증된 사용자만 가능
                        .anyRequest().authenticated() // 그 외의 모든 요청은 인증된 사용자만 접근
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login-success")  // OAuth2 로그인 성공 페이지
                        .authorizationEndpoint(endpoint ->
                                endpoint.baseUri("/oauth2/authorization"))  // OAuth2 인증 엔드포인트
                        .redirectionEndpoint(endpoint ->
                                endpoint.baseUri("/login/oauth2/code/*")) // OAuth2 리디렉션 엔드포인트
                        .userInfoEndpoint(
                                userInfo -> userInfo.userService(customOAuth2UserService)) // 사용자 정보 처리
                        .successHandler(oAuth2LoginSuccessHandler) // 로그인 성공 핸들러
                        .failureHandler(oAuth2LoginFailureHandler) // 로그인 실패 핸들러
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")  // 로그아웃 엔드포인트
                        .deleteCookies("JSESSIONID", "refreshToken")  // 쿠키 삭제
                        .clearAuthentication(true)  // 인증 정보 초기화
                        .invalidateHttpSession(true)  // 세션 무효화
                        .logoutSuccessUrl("/")  // 로그아웃 후 리다이렉트 URL
                )
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class) // JWT 필터 추가
                .exceptionHandling(exception -> exception
                        .accessDeniedHandler(accessDeniedHandler)  // 접근 거부 핸들러
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint) // 인증 오류 핸들러
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin(CORS_ALLOWED_ORIGIN);
        configuration.addAllowedOrigin("http://localhost:5173"); // ✅ 프론트엔드 로컬 개발 환경 추가
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.addExposedHeader("Authorization");

        // ✅ 로그아웃 후 쿠키 삭제가 적용되도록 `Set-Cookie` 노출
        configuration.addExposedHeader("Set-Cookie");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}