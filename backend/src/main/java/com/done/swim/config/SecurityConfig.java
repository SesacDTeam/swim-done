package com.done.swim.config;

import com.done.swim.domain.user.service.KakaoOauthService;
import com.done.swim.global.security.handler.OAuth2LoginFailureHandler;
import com.done.swim.global.security.handler.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final KakaoOauthService kakaoOauthService;
    private final OAuth2LoginSuccessHandler successHandler;
    private final OAuth2LoginFailureHandler failureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//        http
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/", "/login").permitAll()
//                .anyRequest().authenticated()
//            )
//            .oauth2Login(oauth2 -> oauth2
//                .userInfoEndpoint(userInfo -> userInfo
//                    .userService(kakaoOauthService)
//                )
//            );
//
//        return http.build();
//    }

        http

            .csrf(csrf -> csrf.disable()) //  REST API 방식이므로 CSRF 비활성화
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/oauth2/**", "/login/**").permitAll() //  인증 없이 접근 가능
                .anyRequest().authenticated() //  그 외 요청은 인증 필요
            )
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(kakaoOauthService)) //  사용자 정보 처리
                .successHandler(successHandler) //  로그인 성공 핸들러 적용
                .failureHandler(failureHandler) //  로그인 실패 핸들러 적용
            );

        return http.build();
    }
}



