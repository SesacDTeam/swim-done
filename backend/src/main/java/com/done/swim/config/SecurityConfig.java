package com.done.swim.config;


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
        .requestMatchers("/oauth2/**", "/login/oauth2/code/**").permitAll()
        .requestMatchers("/login/oauth2/", "/oauth2/authorization/**").permitAll()
        .requestMatchers("/api/sections").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/pools/**").permitAll()
        .requestMatchers("/login-success").permitAll()
        .anyRequest().authenticated()
      )
      .oauth2Login(oauth2 -> oauth2
        .loginPage("/login-success")  // 추가
        .authorizationEndpoint(endpoint ->
          endpoint.baseUri("/oauth2/authorization")
        )
        .redirectionEndpoint(endpoint ->
          endpoint.baseUri("/login/oauth2/code/*")
        )
        .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
        .successHandler(oAuth2LoginSuccessHandler)
        .failureHandler(oAuth2LoginFailureHandler)
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