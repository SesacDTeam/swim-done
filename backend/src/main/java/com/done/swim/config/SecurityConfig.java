package com.done.swim.config;

import com.done.swim.global.security.handler.OAuth2LoginFailureHandler;
import com.done.swim.global.security.handler.OAuth2LoginSuccessHandler;
import com.done.swim.global.security.jwt.JwtAuthenticationFilter;
import com.done.swim.global.jwt.JwtAuthenticationFilter;
import com.done.swim.global.security.handler.CustomAccessDeniedHandler;
import com.done.swim.global.security.handler.JwtAuthenticationEntryPoint;
import com.done.swim.sociallogin.CustomOAuth2UserService;
import com.done.swim.sociallogin.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
    private final OAuth2LoginSuccessHandler successHandler;
    private final OAuth2LoginFailureHandler failureHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // REST API 방식이므로 CSRF 비활성화
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/login/**").permitAll() // 인증 없이 접근 가능
                .anyRequest().authenticated() // 그 외 요청은 인증 필요
            )
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService)) // 사용자 정보 처리
                .successHandler(successHandler) // 로그인 성공 핸들러 적용
                .failureHandler(failureHandler) // 로그인 실패 핸들러 적용
            )
            .addFilterBefore(jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class); // JWT 필터 등록

    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Value("${origin}")
    private String origin;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/verify").authenticated()
                        .requestMatchers("/auth/**", "/error", "/images/**").permitAll()
                        .requestMatchers("/", "/login/**").permitAll()
                        .requestMatchers("/oauth2/**", "/login/oauth2/code/**").permitAll() //OAuth2 요청 허용
                        .requestMatchers("/login/oauth2/").permitAll() //OAuth2 요청 허용
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login")  // 추가
                        .authorizationEndpoint(endpoint ->
                                endpoint.baseUri("/oauth2/authorization")
                        )
                        .redirectionEndpoint(endpoint ->
                                endpoint.baseUri("/login/oauth2/code/*")
                        )
                        .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception -> exception
                        .accessDeniedHandler(accessDeniedHandler)
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin(origin);
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
